import { dialogTemp, IBackground } from "../../interface/Draw/index.ts";
import { IUpdateGraph } from "../../interface/Graph/index.ts";
import { Command } from "../Command/Command.ts";
import {
  canvasSettingTemp,
  graphInfoTemp,
  searchReplaceTemp,
  themeTemp,
} from "../Template/index.ts";
import { Draw } from "./index.ts";

/**
 * 弹窗绘制类
 *  包含了 搜索替换、主题、画布设置、图信息、背景的配置、抽屉实现
 */

export class DialogDraw {
  private draw: Draw;
  private dialogBox: HTMLDivElement;
  private command: Command;

  private index: number; // 记录当前搜索索引 【索引从 0 开始的呀！！！】
  private all: number; // 记录当前搜索总数
  private conformList: HTMLDivElement[]; // 当前符合的数组
  private keyword!: string;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);
    this.index = 0;
    this.all = 0;
    this.conformList = [];

    // 1. 创建 dialog
    this.dialogBox = draw.createHTMLElement("div") as HTMLDivElement;
    this.dialogBox.classList.add("sf-editor-dialog");
  }

  // 打开弹窗
  public openDialog(title: string, temp: dialogTemp) {
    const root = this.draw.getRoot();
    const have = root.querySelector(".sf-editor-dialog");
    // 1. 封装公共结构
    const titleTemp = `
    <div class="title">
        <span>${title}</span>
        <i class="iconfont icon-guanbiclose"></i>
    </div>
    <div class="main sf-editor-overflow"></div>`;

    this.dialogBox.innerHTML = titleTemp;

    !have && root.appendChild(this.dialogBox);

    // 2. 注册关闭事件
    this.dialogBox
      .querySelector(".icon-guanbiclose")
      ?.addEventListener("click", this.closeDialog.bind(this));

    // 3. 获取主内容区，用户的模板放在 main 中
    const map: { [key: string]: string } = {
      themeTemp,
      graphInfoTemp,
      canvasSettingTemp,
    };
    const main = this.dialogBox.querySelector(".main") as HTMLDivElement;
    main.innerHTML = map[temp];

    this.addEvent();
  }

  // 关闭弹窗
  public closeDialog() {
    this.dialogBox.remove();
  }

  // 给当前 span 添加事件
  private addEvent() {
    // 获取dialog对象
    const dialog = this.draw.getDialogDraw();

    // 添加事件
    const dialogMain = this.draw.getRoot().querySelector(".sf-editor-dialog");

    // 给 span 添加事件
    dialogMain?.querySelectorAll("[command]").forEach((item) => {
      const command = item.getAttribute("command") as string;
      item.addEventListener("click", (e) => dialog.spanClickHandle(e, command));
    });

    // 给 input 绑定 change 事件
    dialogMain?.querySelectorAll("input").forEach((input) => {
      const id = input.getAttribute("id") as string;
      input.addEventListener("change", (e) => dialog.inputHandle(e, id));
    });
  }

  // 设置网格水印颜色相干方法
  public setColor(command: string, value: string) {
    // 1. 获取当前 canvas 绘制状态
    const canvasDraw = this.draw.getCanvasDraw();

    const oldVal = canvasDraw.getBackground();
    var payload: IBackground = {};
    if (command === "gridcolor")
      payload = Object.assign(oldVal, { gridlineColor: value });

    if (command === "origincolor")
      payload = Object.assign(oldVal, { originColor: value });

    if (command === "watercolor")
      payload = Object.assign(oldVal, { watermarkColor: value });

    this.command.executeBackground(payload);
  }

  /**
   * dialog 弹窗的 command span 事件
   * @param e
   * @param command
   */
  public spanClickHandle(e: Event, command: string) {
    // 1. 解析参数
    const [key, value] = command.split("-");

    // 找到目前页面上选中的
    var nodeID: string[] = [];
    const graphEvent = this.draw.getGraphEvent();
    graphEvent.getAllSelected().forEach((i) => {
      nodeID.push(i.getAttribute("graphid") as string);
    });

    // 元件更新事件
    this.findKeyEvent(key, value, nodeID);

    // 广播事件
    const websocket = this.draw.getWebsocket();
    websocket.sendMessage({
      operate: "dialogEvent",
      value: { key, val: value, nodeID },
    });

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * dialog 弹窗的 input 事件
   * @param e
   * @param id
   */
  public inputHandle = (e: Event, id: string) => {
    const value = (e.target as HTMLInputElement).value;

    // 找到目前页面上选中的
    var nodeID: string[] = [];
    const graphEvent = this.draw.getGraphEvent();
    graphEvent.getAllSelected().forEach((i) => {
      nodeID.push(i.getAttribute("graphid") as string);
    });

    this.findKeyEvent(id, value, nodeID);

    // 广播事件
    const websocket = this.draw.getWebsocket();
    websocket.sendMessage({
      operate: "dialogEvent",
      value: { key: id, val: value, nodeID },
    });
    e.stopPropagation();
    e.preventDefault();
  };

  /**
   * dialog 中，key 所对应的事件
   * @param key
   * @param value
   */
  public findKeyEvent(key: string, value: string, nodeID?: string[]) {
    // 更新元件信息
    const updateGraph = (o: IUpdateGraph) => this.command.executeUpdateGraph(o);

    // 设置水印
    const setWaterText = (watermarkText: string) => {
      const oldVal = this.draw.getCanvasDraw().getBackground();
      const payload = Object.assign(oldVal, { watermarkText });
      this.command.executeBackground(payload);
    };

    // 定义页面尺寸
    const sizeMap: { [key: string]: number[] } = {
      A3: [1500, 2100],
      A4: [1050, 1500],
      A5: [750, 1050],
    };

    switch (key) {
      case "color":
      case "stroke":
        const stroke = key === "color" ? value : `#${value}`;
        updateGraph({ stroke, nodeID });
        break;

      case "background":
      case "fill":
      case "transparent":
        const fill =
          key === "fill"
            ? `#${value}`
            : key === "transparent"
            ? "transparent"
            : value;
        updateGraph({ fill, nodeID });
        break;

      case "bgcolor":
        const background = value.includes("#") ? value : `#${value}`;
        this.command.setTheme({ background });
        break;

      case "watertext":
        setWaterText(value);
        break;

      case "strokeWidth":
        updateGraph({ strokeWidth: Number(value), nodeID });
        break;

      case "radius":
        updateGraph({ radius: Number(value), nodeID });
        break;

      case "style":
        updateGraph({ dasharray: value || "", nodeID });
        break;

      case "gridcolor":
      case "origincolor":
      case "watercolor":
        this.setColor(key, value.includes("#") ? value : `#${value}`);
        break;

      case "size":
        const [w, h] = sizeMap[value];
        this.command.setPageSize(w, h);
        break;

      case "textcolor":
      case "bold":
      case "italic":
      case "underline":
        // 文本颜色、填充、加粗、斜体、下划线 都指向同一个方法
        this.command.executeUpdateText(nodeID as string[], key, value);
        break;

      default:
        break;
    }
  }

  /**
   * 创建搜索替换框 - ctrl F 快捷键的响应
   * @param text
   */
  public createSearchReplace(text: string) {
    this.closeDialog();
    this.draw.getEditorEvent().clickHandle();
    const root = this.draw.getRoot();
    const searchBoxSelector = "div.sf-editor-search";
    const searchBox = root.querySelector(searchBoxSelector) as HTMLDivElement;
    const editorBox = this.draw.getEditorBox();

    // 关闭事件
    const closeHandle = () => {
      root.querySelector(searchBoxSelector)?.remove();
      // 恢复
      editorBox
        .querySelectorAll(".sf-editor-box-graphs-main-contenteditable")
        .forEach((item) => {
          const editor = item.querySelector("div") as HTMLDivElement;
          editor.innerHTML = editor.innerHTML.replace(/<|>|\/|b|span/g, "");
        });
    };

    // 搜索框用户输入
    const sinputHandle = (def?: string, e?: Event) => {
      // 输入框内容
      const text = (e?.target as HTMLInputElement)?.value;
      this.keyword = def || text;
      this.conformList = []; // 重置查找结果
      this.index = 0; // 重置 index
      this.all = 0; // 重置 all
      this.setSpanNumber(); // 重置 1/21

      // 全文查找文本
      editorBox
        .querySelectorAll(".sf-editor-box-graphs-main-contenteditable")
        .forEach((item) => {
          // item 是 contenteditableBox 里面的 div 才是内容
          const editor = item.querySelector("div") as HTMLDivElement;
          editor.innerHTML = editor.innerHTML.replace(/<|>|\/|b|span/g, "");
          const findFlag = editor.innerText.includes(this.keyword);
          findFlag &&
            this.keyword &&
            this.conformList.push(item as HTMLDivElement);
        });

      if (!this.conformList.length) return;

      // 赋值 all
      this.all = this.conformList.length;
      this.searchKeyWord();
      this.setSpanNumber();
    };

    // 如果搜索替换框已经存在，则直接使用该 DIV
    const useSearchBox = () => {
      const input = searchBox.querySelector("input#search") as HTMLInputElement;
      input.value = text;
      // 获取焦点
      input.focus();
      this.index = 0;
      this.all = 0;
      this.setSpanNumber();
    };

    // 如果不存在，则需要创建 searchBox
    const createSearchBox = () => {
      const box = this.draw.createHTMLElement("div") as HTMLDivElement;
      box.classList.add("sf-editor-search");

      box.innerHTML = searchReplaceTemp;
      root.appendChild(box);

      const sinput = box.querySelector("input#search") as HTMLInputElement; // 搜索
      const rinput = box.querySelector("input#replace") as HTMLInputElement; // 替换

      // 如果用户有文本，则添加到搜索框
      sinput.value = text;
      sinput.focus();
      sinputHandle(text);
      // 提供关闭按钮
      box.querySelector(".icon-xgb")?.addEventListener("click", closeHandle);

      // 提供搜索输入框监听事件
      sinput.addEventListener("input", (e) => sinputHandle("", e));

      // 提供上一处下一处事件
      const pre = box.querySelector("i.icon-xiangzuo");
      const next = box.querySelector("i.icon-xiangyou");
      pre?.addEventListener("click", this.command.executeSearchPre);
      next?.addEventListener("click", this.command.executeSearchNext);

      // 提供替换 全部 事件
      const replace = box.querySelector("i.icon-tihuan");
      const replaceAll = box.querySelector("i.icon-quanbutihuan");
      replace?.addEventListener("click", () =>
        this.command.executeReplace(rinput.value)
      );
      replaceAll?.addEventListener("click", () =>
        this.command.executeReplaceAll(rinput.value)
      );
    };

    searchBox ? useSearchBox() : createSearchBox();
  }

  /**
   * 设置 搜索结果 1/21
   * @returns
   */
  private setSpanNumber() {
    const root = this.draw.getRoot();
    const searchBoxSelector = "div.sf-editor-search";
    const searchBox = root.querySelector(searchBoxSelector) as HTMLDivElement;
    if (!searchBox) return;
    const span = searchBox.querySelector("span#num") as HTMLSpanElement;
    if (this.index + 1 && this.all)
      span.innerHTML = `${this.index + 1}/${this.all}`;
    else span.innerHTML = "";
  }

  /**
   * 进行关键字搜索
   * @returns
   */
  private searchKeyWord() {
    const text = this.keyword;
    if (!this.conformList.length) return;
    // 然后进行业务处理
    this.conformList.forEach((item, index) => {
      const editor = item.querySelector("div") as HTMLDivElement;
      editor.innerHTML = editor.innerHTML.replace(/<|>|\/|b|span/g, "");
      editor.innerHTML = editor.innerHTML.replace(
        text,
        index === this.index ? `<span>${text}</span>` : `<b>${text}</b>` // 【选中的用 span 不然用 b】
      );
    });
  }

  /**
   * 搜索上一处
   * @returns
   */
  public searchPre() {
    if (this.index <= 0) this.index = this.all - 1;
    else this.index--;
    this.setSpanNumber();
    this.searchKeyWord();
  }

  /**
   * 搜索下一处
   * @returns
   */
  public searchNext() {
    if (this.index >= this.all - 1) this.index = 0;
    else this.index++;
    this.setSpanNumber();
    this.searchKeyWord();
  }

  /**
   * 替换
   * @param newWord
   */
  public replace(newWord: string) {
    if (!this.conformList.length) return;
    this.conformList.forEach((item, index) => {
      if (index !== this.index) return;
      // 执行替换
      const editor = item.querySelector("div") as HTMLDivElement;
      editor.innerHTML = editor.innerHTML.replace(/<|>|\/|b|span|/g, "");
      editor.innerHTML = editor.innerHTML.replace(this.keyword, newWord);
      this.conformList.splice(index, 1);
    });
    this.index = 0;
    this.all = this.conformList.length;
    this.setSpanNumber();
    this.searchKeyWord();
  }

  /**
   * 全部替换
   * @param newWord
   */
  public replaceAll(newWord: string) {
    if (!this.conformList.length) return;
    this.conformList.forEach((item) => {
      const editor = item.querySelector("div") as HTMLDivElement;
      editor.innerHTML = editor.innerHTML.replace(/<|>|\/|b|span|/g, "");
      editor.innerHTML = editor.innerHTML.replace(this.keyword, newWord);
    });
    this.conformList = [];
    this.index = 0;
    this.all = 0;
    this.setSpanNumber();
    this.searchKeyWord();
  }
}
