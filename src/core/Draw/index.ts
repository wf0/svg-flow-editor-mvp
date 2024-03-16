import { EventBusMap } from "../../interface/Event/index.ts";
import { nextTick, setTheme } from "../../utils/index.ts";
import { messageInfo, xmlns } from "../Config/index.ts";
import { EventBus } from "../EventBus/index.ts";
import { Listener } from "../Listener/index.ts";
import { Register } from "../Register/index.ts";
import { CanvasDraw } from "./Canvas.ts";
import { GraphEvent, EditorEvent } from "./EventHandle.ts";
import { GraphDraw } from "./Graph.ts";

// 重构 draw
export class Draw {
  private listener: Listener;
  private eventBus: EventBus<EventBusMap>;
  private register: Register;

  // 拓展的其他类
  private canvasDraw: CanvasDraw;
  private graphDraw: GraphDraw;
  private graphEvent: GraphEvent;
  private editorEvent: EditorEvent;

  private root!: HTMLDivElement; // 根节点 sf-editor
  private editorBox!: HTMLDivElement; // svg、canvas 操作区

  constructor(
    selector: string,
    listener: Listener,
    eventBus: EventBus<EventBusMap>,
    register: Register
  ) {
    this.listener = listener;
    this.eventBus = eventBus;
    this.register = register;

    // 1. 拓展其他绘制类
    this.canvasDraw = new CanvasDraw(this);
    this.graphDraw = new GraphDraw(this);
    this.graphEvent = new GraphEvent(this);
    this.editorEvent = new EditorEvent(this);

    // 2. 初始化样式
    setTheme("colorful_theme1");

    // 3. 初始化editor
    this.initEditor(selector);

    // 4. 初始化事件
    this.editorEvent.addEvent();

    // 5. 初始化框选
    this.initSelectMask();

    // 6. 发布事件
    nextTick(() => {
      console.log("## SFEditor 编辑器初始化完成。");
      const graphLoadedSubscribe = this.eventBus.isSubscribe("loaded");
      graphLoadedSubscribe && this.eventBus.emit("loaded");
      this.listener.loaded && this.listener.loaded();
    });
  }

  /**
   * 初始化编辑器
   */
  private initEditor(selector: string) {
    // 1. 选择器不能为空
    if (!selector) throw new Error(messageInfo.selectorEmpty);

    // 2. 判断 selector 是否可用
    const dom = document.querySelector(selector);
    if (!dom) throw new Error(messageInfo.selectorError);

    /**
     * 3. 进行编辑器初始化-构建html结构：
     *    div.sf-editor -- 编辑器
     *        div.sf-editor-box -- 编辑器盒子 svg、canvas 绘制区
     *            div.sf-editor-box-graphs 元件div
     *            canvas canvas图层
     *            div.sf-editor-box-selectmask 选区
     *            div.sf-editor-box-contextmenu 右键菜单
     *        div.sf-editor-catalog -- 元件库（插件配置式）
     *        div.sf-editor-footer -- 底部（插件配置式）
     *    在宽高的处理上，需要使用 style 动态设置，在创建 catalog menu footer 的时候，都需要动态调整，包括canva的宽高
     */

    // 3.1 div.sf-editor -- 编辑器
    this.root = this.createHTMLElement("div") as HTMLDivElement;
    this.root.classList.add("sf-editor");

    // 3.2 div.sf-editor-box -- 编辑器盒子 svg、canvas 绘制区
    this.editorBox = this.createHTMLElement("div") as HTMLDivElement;
    this.editorBox.classList.add("sf-editor-box");

    const graphsBox = this.createHTMLElement("div") as HTMLDivElement;
    graphsBox.classList.add("sf-editor-box-graphs");
    this.editorBox.appendChild(graphsBox);

    // 4. 根据上诉结构，添加到 dom 上
    this.root.appendChild(this.editorBox);
    dom.appendChild(this.root);

    // 5. 初始化 canvas （确保editor Box被添加到dom上，不然宽高获取失败）
    const { clientWidth, clientHeight } = this.root;
    const canvas = this.canvasDraw.initCanvas(clientWidth, clientHeight);
    this.editorBox.appendChild(canvas);

    // 6. 绘制canvas - 通过继承父类实现
    this.canvasDraw.origin(); // 绘制小圆点
    this.canvasDraw.waterMark(); // 绘制水印
  }

  /**
   * 初始化框选
   */
  private initSelectMask() {
    const div = this.createHTMLElement("div") as HTMLDivElement;
    div.classList.add("sf-editor-box-selectmask");
    this.editorBox.appendChild(div);
  }

  /**
   * 创建 html 元素
   * @param tagName
   * @returns
   */
  public createHTMLElement(tagName: string) {
    return document.createElement(tagName);
  }

  // 创建 svg 元素
  public createSVGElement(tagName: string) {
    return document.createElementNS(xmlns, tagName);
  }

  /**
   * SFEditor 销毁事件
   */
  public destroy() {
    // 销毁只需要将 this.rootDIV 下的svg 销毁即可
    this.editorBox.remove();
    // canvas 也需要销毁
    this.canvasDraw.removeCanvas();
    // 销毁事件
    this.editorEvent.removeEvent();
    // 执行回调
    nextTick(() => {
      // 定义返回参数
      const graphLoadedSubscribe = this.eventBus.isSubscribe("destroyed");
      graphLoadedSubscribe && this.eventBus.emit("destroyed");
      this.listener.destroyed && this.listener.destroyed();
    });
  }

  /** getter */
  public getListener = () => this.listener;
  public getEventBus = () => this.eventBus;
  public getRegister = () => this.register;
  public getGraphDraw = () => this.graphDraw;
  public getEditorBox = () => this.editorBox;
  public getGraphEvent = () => this.graphEvent;
  public getEditorEvent = () => this.editorEvent;
}
