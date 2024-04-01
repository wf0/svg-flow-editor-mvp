import { IGraph, node } from "../../../interface/Graph/index.ts";
import { nextTick } from "../../../utils/index.ts";
import { Command } from "../../Command/Command.ts";
import { Draw } from "../../Draw/index.ts";
import { GEchart } from "../../Graph/GEchart.ts";
import { Line } from "../../Graph/Line.ts";
import { workerEvent } from "../../Worker/AuxiliaryLine.worker.ts";
// const worker = new Worker(
//   new URL("/src/core/Worker/AuxiliaryLine.worker.ts", import.meta.url),
//   {
//     type: "module",
//   }
// );

/**
 * graph 元件事件响应
 */
export class GraphEvent {
  private draw: Draw;
  private move!: boolean;
  private sx!: number;
  private sy!: number;
  private command: Command;
  private nodes!: node[];
  private textArray!: string[];

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);
    this.textArray = [];
  }

  /**
   * graphBox 添加事件
   * @param ele
   */
  public addEvent(ele: HTMLDivElement, graph: IGraph) {
    ele.addEventListener("click", (e) => this.graphClickHandle(e, graph));
    ele.addEventListener("mouseenter", (e) => this.mouseenterHandle(e, graph));
    ele.addEventListener("mousedown", this.mouseDownHandle.bind(this));
    ele.addEventListener("mousemove", (e) => this.mouseMoveHandle(e, graph));
    ele.addEventListener("mouseup", this.mouseUpHandle.bind(this));
    ele.addEventListener("mouseout", this.mouseUpHandle.bind(this));
    ele.addEventListener("dblclick", (e) => this.graphDblclickHandle(e, graph));
    ele.addEventListener("contextmenu", (e) => this.contextmenu(e, graph));
  }

  /**
   * removeEvent 移除事件
   */
  public removeEvent(_ele: HTMLDivElement) {}

  /**
   * 元件单击事件
   * @param e
   */
  private graphClickHandle(e: Event, graph: IGraph) {
    // 支持 ctrl 多选
    const { ctrlKey } = e as PointerEvent;
    const nodeID = graph.getID();

    // 1. 先看是否目前选中的就是当前节点，是的话，直接返回，防止频繁点击元素 执行dom操作
    const selected = this.getSelected();
    if (selected && selected.getAttribute("graphid") === nodeID) return;

    // 2. 添加 mainBox seleted
    if (!ctrlKey) this.draw.getGraphDraw().cancelAllFormatPoint();
    const mainBox = this.draw.getGraphDraw().getGraphMain(nodeID);
    mainBox.classList.add("selected");

    // 3. 取消右键菜单
    this.draw.getEditorEvent().cancelContextmenu();
    const format = mainBox.querySelector(".sf-editor-box-graphs-main-formats");

    // 4. 看有没有创建形变锚点
    !format && this.draw.getGraphDraw().createFormatPoint(graph);

    // 5. 显示dialog 配置元件信息 要区分是单击还是在拖动
    // this.openDialog();

    // 6. 用户单击，需要协同显示用户光标信息
    const websocket = this.draw.getWebsocket();
    if (websocket.connection) {
      // websocket.sendMessage({ operate: "graphClick", nodeID });
    }

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 元件双击事件
   * @param e
   */
  private graphDblclickHandle(e: Event, graph: IGraph) {
    // 支持双击文本编辑的容器
    const support = ["rect", "ellipse"];

    // @ts-ignore 统计图双击，则是打开配置弹窗
    if (e.target.tagName === "CANVAS")
      return this.draw.getEchartDraw().updateOption(graph as GEchart);

    // @ts-ignore 不支持其他类型的文本输入
    if (!support.includes(e.target.tagName)) return;

    // 1. 获取当前 main
    const selector = "div.sf-editor-box-graphs-main-contenteditable";
    const graphDraw = this.draw.getGraphDraw();
    const graphBox = graphDraw.getGraphMain(graph.getID());

    // 2. 获取 editorable 的div
    const editorable = graphBox.querySelector(selector) as HTMLDivElement;

    // 将光标移动到末尾
    const setRange = (input: HTMLDivElement) => {
      var range = document.createRange();
      range.selectNodeContents(input);
      range.collapse(false);
      var sel = window.getSelection() as Selection;
      sel.removeAllRanges();
      sel.addRange(range);
    };

    // 如果 editor 存在，则需要修改 userSelect point-event
    if (editorable) {
      editorable.style.pointerEvents = "";
      editorable.style.userSelect = "";
      const input = editorable.children[0] as HTMLDivElement;
      // 自动获取焦点
      input.focus();
      setRange(input);

      input.addEventListener("blur", () => {
        //  修改样式
        editorable.style.pointerEvents = "none";
        editorable.style.userSelect = "none";
      });
    } else {
      // 2. 创建 editorable
      this.createContentEditable(graph);

      const editor = graphBox.querySelector(selector) as HTMLDivElement;

      // 找 可编辑 div
      const input = editor.children[0] as HTMLDivElement;

      // 自动获取焦点
      input.focus();

      setRange(input);

      input.addEventListener("blur", () => {
        //  修改样式
        editor.style.pointerEvents = "none";
        editor.style.userSelect = "none";
      });
    }

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 鼠标移入，创建连接锚点
   * @param e
   * @param graph
   */
  private mouseenterHandle(e: MouseEvent, graph: IGraph) {
    const mainBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    const link = mainBox.querySelector(".sf-editor-box-graphs-main-links");
    !link && this.draw.getGraphDraw().createLinkPoint(graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 执行实际的 添加文本事件
   * @param text
   */
  public setGraphText(graph: IGraph, text: string) {
    // 1. 在当前元件的内部实现
    const graphBox = this.draw.getGraphDraw().getGraphMain(graph.getID());

    // 2. 看是否已经存在 editable
    const selector = "div.sf-editor-box-graphs-main-contenteditable";
    const editable = graphBox.querySelector(selector) as HTMLDivElement;

    if (editable) {
      const input = editable.querySelector("div") as HTMLDivElement;
      input.innerText = text;
    } else {
      // 执行创建动作
      const editor = this.createContentEditable(graph);
      editor.style.pointerEvents = "none";
      editor.style.userSelect = "none";
      const input = editor.querySelector("div") as HTMLDivElement;
      input.innerText = text;
    }
  }

  /**
   * 双击进行文本输入 - 实现原理： div.contenteditable
   * @param graph
   */
  public createContentEditable(graph: IGraph) {
    const graphMain = this.draw.getGraphDraw().getGraphMain(graph.getID());

    const editor = this.draw.createHTMLElement("div") as HTMLDivElement;
    editor.classList.add("sf-editor-box-graphs-main-contenteditable");

    const input = this.draw.createHTMLElement("div") as HTMLDivElement;
    input.setAttribute("contenteditable", "true");

    editor.appendChild(input);
    graphMain.appendChild(editor);
    return editor;
  }

  /**
   * graph mousedown 移动事件-偏移量会受旋转角度的影响【需要重新修订】
   * @param e
   * @param graph
   */
  private mouseDownHandle(e: MouseEvent) {
    if (e.button === 2) return;

    // 记录点击的时间
    const { offsetX, offsetY } = e as MouseEvent;
    this.move = true;
    this.sx = offsetX;
    this.sy = offsetY;
    // 启用 worker 计算位置(放置move频繁计算导致页面卡顿)
    this.nodes = this.draw.getGraphDraw().getNodeInfo() as node[];
  }

  /**
   * mouse move 移动中
   * @param e
   * @param graph
   * @returns
   */
  private mouseMoveHandle(e: MouseEvent, graph: IGraph) {
    if (!this.move) return;
    // 这个是新的 offset，直接与旧的 offset 进行运算即可得到差值，与当前位置做计算即可
    const { offsetX, offsetY } = e;

    // 计算差值
    const diffX = offsetX - this.sx;
    const diffY = offsetY - this.sy;

    // 设置位置
    graph.position.call(graph, graph.getX() + diffX, graph.getY() + diffY);

    // 启用线程处理辅助线
    this.workerEvent(graph);

    // 还需要处理 line 的移动更新
    const graphid = (e.target as SVGAElement).getAttribute("graphid");
    // graphid 可能是线的 sid 也可能是 eid
    var lines: SVGPolygonElement[] = [];
    this.draw
      .getEditorBox()
      .querySelectorAll("polyline")
      .forEach((line) => {
        const sid = line.getAttribute("sid");
        const eid = line.getAttribute("eid");
        if (sid === graphid || eid === graphid) lines.push(line);
      });
    // 1. 拿到line对象 - 需要拿到 lineid lineBox
    if (!lines.length) return;
    lines.forEach((line) => {
      const lineid = line.getAttribute("lineid") as string;
      const lineBox = line.parentNode?.parentNode as HTMLDivElement;
      const sid = line.getAttribute("sid") as string;
      const eid = line.getAttribute("eid") as string;
      const st = line.getAttribute("st") as string;
      const et = line.getAttribute("et") as string;
      const l = new Line(this.draw, 0, 0, lineid, lineBox);
      l.update(sid, eid, st, et);
    });
  }

  /**
   * mouseup 鼠标抬起
   * @param e
   */
  private mouseUpHandle(_e: MouseEvent) {
    // 获取终点坐标
    this.move = false;
    this.sx = 0;
    this.sy = 0;
    // 取消辅助线
    this.draw.getCanvasDraw().unDrawAuxiliaryLine();
  }

  /**
   * 处理 worker
   */
  private workerEvent(graph: IGraph) {
    // 获取当前正在移动的元件的参数信息
    const nodeID = graph.getID();
    const width = graph.getWidth();
    const height = graph.getHeight();
    const x = graph.getX();
    const y = graph.getY();
    const current: node = { nodeID, width, height, x, y };
    const data = workerEvent(current, this.nodes);
    // 清空所有的辅助线
    if (!data.length) return this.draw.getCanvasDraw().unDrawAuxiliaryLine();
    // 不然绘制辅助线
    this.draw.getCanvasDraw().drawAuxiliaryLine(data);
  }

  /**
   * 元件右键菜单-调用 editor右键事件
   */
  private contextmenu(e: Event, graph?: IGraph) {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.contextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 获取所有的 main 用于处理顶层、底层比较
   * @returns
   */
  public getAllGraphMain() {
    const selector = "[class='sf-editor-box-graphs-main']";
    return this.draw
      .getEditorBox()
      .querySelectorAll(selector) as NodeListOf<HTMLDivElement>;
  }

  /**
   * 获取所有选中的元件
   * @returns
   */
  public getAllSelected() {
    const selector = "[class='sf-editor-box-graphs-main selected']";
    return this.draw
      .getEditorBox()
      .querySelectorAll(selector) as NodeListOf<HTMLDivElement>;
  }

  /**
   * 获取单个
   * @returns
   */
  public getSelected() {
    const selector = "[class='sf-editor-box-graphs-main selected']";
    return this.draw.getEditorBox().querySelector(selector) as HTMLDivElement;
  }
}
