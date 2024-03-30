import { messageInfo } from "../Config/index.ts";
import { Command } from "../Command/Command.ts";
import { Graph } from "../Graph/index.ts";
import { Draw } from "../Draw/index.ts";
import { nanoid } from "nanoid";
import pako from "pako";
import {
  IWebsocket,
  socketInfo,
  wsMessage,
} from "../../interface/Websocket/index.ts";
import { YJS } from "./Yjs.ts";

/**
 * 协同编辑相关类 websocket
 *  1. 数据传输采用 pako 加密/解密形式
 *  2. 服务端 demo 在public/libs/service.js，采用 ws 搭建服务，可在服务端进行数据存储、业务处理
 *  3. 冲突处理采用 Yjs 实现，应用的方案是 【交换完整的文档结构以同步客户端数据】
 *     https://docs.yjs.dev/api/document-updates#example-sync-two-clients-by-exchanging-the-complete-document-structure
 *  4. 数据传输过程采用 js-base 进行 base64 编码传输，解析时再转换为 Unit8Array 以进行合并操作
 *  5. 在 websocket.onmessage 中的数据，需要取 Yjs 同步后的数据，以达到数据一致性目的
 */

export class Websocket extends YJS {
  private draw: Draw;
  private clientID: string; // 当前连接的唯一ID
  private username!: string; // 用户名
  private socketurl!: string; // 连接的 websocket 地址
  private websocket!: WebSocket; // websocket 对象
  private retryTimer!: number; // 心跳包定时器对象ID
  private retryCount!: number; // 重连次数
  private command: Command;
  public connection: boolean; // 记录连接状态

  constructor(draw: Draw) {
    super();
    this.draw = draw;
    this.clientID = nanoid();
    this.connection = false;
    this.command = new Command(draw);
  }

  /**
   * 连接 WebSocket
   * @param payload
   */
  public openWebSocket(payload: IWebsocket) {
    if ("WebSocket" in window) {
      // 记录信息
      const { socketurl, username } = payload;
      this.socketurl = socketurl; // URL 上可能需要进行参数校验
      this.username = username || `user_${this.clientID.slice(0, 4)}`;
      this.websocket = new WebSocket(this.socketurl);

      // 1. 连接建立时触发
      this.websocket.onopen = this.openHandle.bind(this);

      // 2. 通信发生错误时触发
      this.websocket.onerror = this.errorHandle.bind(this, payload);

      // 3. 连接关闭时触发
      this.websocket.onclose = this.closeHandle.bind(this);

      // 4. 接收到消息时触发
      this.websocket.onmessage = this.messageHandle.bind(this);
    } else {
      console.error(messageInfo.websocket.support);
    }
  }

  /**
   * 主动发送消息-通过计算差异同步两个客户端
   * @param message operate value
   * @returns
   */
  public sendMessage(message: wsMessage) {
    if (!this.connection) return;
    // 协同数据处理
    // 1. 进行本地映射
    this.setMap(message.operate, message.value);

    // 2. 获取本地数据
    const state = this.getState();

    // 3. 将本地结果同步到其他客户端
    this.websocket.send(this.gzip(message, state)); // string | ArrayBufferLike | Blob | ArrayBufferView
  }

  /**
   * 主动关闭事件
   */
  public closeWebSocket() {
    if ("WebSocket" in window) this.websocket.close();
    else console.error(messageInfo.websocket.support);
  }

  /**
   * pako 加密
   * @param { wsMessage } d
   * @param { string } state
   * @returns
   */
  private gzip(d: wsMessage, state: string) {
    const payload = Object.assign(d, {
      username: this.username,
      clientID: this.clientID,
      state,
    });
    const encode = encodeURIComponent(JSON.stringify(payload));
    return pako.gzip(encode);
  }

  /**
   * pako 解密 Blob
   * @param {Blob} data
   */
  private unzip(data: Blob): Promise<wsMessage & socketInfo> {
    return new Promise<wsMessage & socketInfo>((resolve) => {
      try {
        let reader = new FileReader();
        reader.onload = function () {
          const result = this.result as ArrayBuffer;
          const nums = pako.ungzip(result) as unknown as number[];
          const str = String.fromCharCode.apply(null, nums);
          const message = decodeURIComponent(str);
          resolve(JSON.parse(message));
        };
        reader.readAsArrayBuffer(data);
      } catch (error) {}
    });
  }

  /**
   * websocket onopen
   */
  private openHandle() {
    this.connection = true;
    this.retryCount = 0;
    console.info(messageInfo.websocket.success, "==>", this.username);
    // 1. 发送用户连接广播
    this.sendMessage({
      operate: "connect",
      value: {
        username: this.username,
        msg: `${this.username} 连接 websocket.`,
      },
    });
    // @ts-ignore 防止websocket长时间不发送消息导致断连
    this.retryTimer = setInterval(() => this.websocket.send("rub"), 60000);
  }

  /**
   * websocket onerror
   * @param { IWebsocket } payload
   */
  private errorHandle(payload: IWebsocket) {
    this.connection = false;
    this.retryCount++;
    if (this.retryCount > 3) console.error(messageInfo.websocket.refresh);
    // 不然就尝试重连
    else this.openWebSocket(payload);
  }

  /**
   * websocket onclose
   * @param { CloseEvent } e
   */
  private closeHandle(e: CloseEvent) {
    this.connection = false;
    console.log(messageInfo.websocket.close);
    // 正常关闭连接
    if (e.code === 1000) {
      // 清空定时器
      clearInterval(this.retryTimer);
      this.retryTimer = 0;
    } else {
      // 异常导致断开
      console.error(messageInfo.websocket.contact);
    }
  }

  /**
   * websocket 监听到消息的事件回调
   * @param { MessageEvent } result
   */
  private async messageHandle(result: MessageEvent) {
    const data = await this.unzip(result.data);
    const { operate, clientID, state, value } = data;
    if (clientID === this.clientID) return; // 同一个clientID表示当前用户发起的操作，不响应操作

    // 1. 收到远端数据后,需要进行本地合并
    this.mergeState(state);

    // 2. 获取合并后的数据操作
    // const  = this.getMap(operate);

    // 3. 根据合并后的数据,对其他客户端协同的操作做响应
    switch (operate) {
      case "connect":
        console.log(value.msg);
        break;

      case "addGraph":
        var { type, width, height, nodeID, x, y } = value;
        this.command.executeAddGraph({ type, width, height, nodeID, x, y }); // 用户添加元件，本地也同步添加元件
        break;

      case "updateGraph":
        var { width, height, x, y, nodeID } = value;
        // 用户更新
        var graph = new Graph(this.draw, nodeID);
        x && graph.setX(x);
        y && graph.setY(y);
        width && graph.setWidth(width);
        height && graph.setHeight(height);
        break;

      case "deleteGraph":
        var { nodeID } = value; // 获取 nodeID
        const mainBox = this.draw.getGraphDraw().getGraphMain(nodeID); // 找到 这个id 的main
        mainBox && mainBox.remove(); // 执行删除
        break;

      case "graphClick":
        // 用户单击元件，其他客户端需要同步显示 network 样式，并显示 xxx正在编辑
        // const mainBox = this.draw.getGraphDraw().getGraphBox(nodeID as string);
        // mainBox.classList.add("sf-editor-network");
        break;

      default:
        break;
    }
  }
}
