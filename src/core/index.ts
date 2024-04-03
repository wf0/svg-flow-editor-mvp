import { EventBusMap } from "../interface/Event/index.ts";
import { Command } from "./Command/Command.ts";
import { Draw } from "./Draw/index.ts";
import { Global } from "./Event/Global/Global.ts";
import { EventBus } from "./Event/EventBus.ts";
import { Listener } from "./Listener/index.ts";
import { Register } from "./Register/index.ts";
import { Rect } from "./Graph/Rect.ts";
import { Ellipse } from "./Graph/Ellipse.ts";
import { KeyMap } from "../interface/Event/index.ts";
import { SVGImage } from "./Graph/Image.ts";
import { Footer } from "./Plugin/Footer.ts";
import { Catalog } from "./Plugin/Catalog.ts";
import { Operation } from "./Plugin/Operation.ts";
import { SEchart } from "./Plugin/Echart.ts";
import { Text } from "./Graph/Text.ts";
import { IWebsocket } from "../interface/Websocket/index.ts";
import { messageInfo } from "./Config/index.ts";
import "../assets/font_4458457_4ftw0i6fgnl/iconfont.css";
import "../style/SFEditor.less";
import { GTable } from "./Graph/GTable.ts";
import { ITableConfig } from "../interface/Graph/index.ts";

// 定义插件类型
type pluginName = "catalog" | "footer" | "operation" | "echart" | "websocket";

class SFEditor {
  public listener: Listener;
  public eventBus: EventBus<EventBusMap>;
  public register: Register;
  public command: Command;
  public global: Global;
  private draw: Draw;

  /**
   * SFEditor 构造函数
   * @param selector css 选择器
   */
  constructor(selector: string) {
    this.listener = new Listener();
    this.eventBus = new EventBus();
    this.register = new Register();
    this.draw = new Draw(selector, this.listener, this.eventBus, this.register);
    this.global = new Global(this.draw);
    this.command = new Command(this.draw);
  }

  /**
   * 矩形
   * @param width 宽度
   * @param height 高度
   * @returns
   */
  public Rect(width: number, height: number): Rect {
    return new Rect(this.draw, width, height);
  }

  /**
   * 圆 - 为了使得在形变过程中容易操作，故而底层使用椭圆进行重构
   * @param radius 圆半径
   * @returns
   */
  public Circle(radius: number): Ellipse {
    return new Ellipse(this.draw, radius, radius);
  }

  /**
   * 椭圆
   * @param width 椭圆长轴长
   * @param height 椭圆短轴长
   * @returns
   */
  public Ellipse(width: number, height: number): Ellipse {
    return new Ellipse(this.draw, width, height);
  }

  /**
   * SVGImageElement
   * @param url 图片地址
   * @returns
   */
  public SVGImage(url: string): SVGImage {
    return new SVGImage(this.draw, url);
  }

  /**
   * 表格
   * @returns
   */
  public Table(payload?: ITableConfig) {
    return new GTable(this.draw, payload);
  }

  /**
   * SVGTextElement
   * @param text 显示文本
   * @returns
   */
  public Text(text: string) {
    return new Text(this.draw, text);
  }

  // 加载插件函数
  public plugin(name: pluginName, payload?: IWebsocket): SEchart | undefined {
    // name 是插件名称
    if (name === "footer") new Footer(this.draw);
    if (name === "operation") new Catalog(this.draw);
    if (name === "catalog") new Operation(this.draw);
    // echart 的插件需要向外提供操作对象，方法都在 Echart 对象中
    if (name === "echart") return new SEchart(this.draw);
    // 支持 websocket 协同插件
    if (name === "websocket") {
      const state = !payload || !payload.socketurl;
      if (state) throw new Error(messageInfo.websocket.url);
      else {
        const websocket = this.draw.getWebsocket();
        websocket.openWebSocket(payload);
      }
    }
  }
}

export { SFEditor, KeyMap, type pluginName };
