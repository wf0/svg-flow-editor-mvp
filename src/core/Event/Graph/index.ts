import { IGraph, IUpdateGraph, node } from "../../../interface/Graph/index.ts";
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

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);
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

    // @ts-ignore
    if (e.target.tagName === "CANVAS")
      return this.draw.getEchartDraw().updateOption(graph as GEchart);

    // @ts-ignore
    if (!support.includes(e.target.tagName)) return;
    const nodeID = graph.getID();
    const selector = "div.sf-editor-box-graphs-main-contenteditable";

    const graphDraw = this.draw.getGraphDraw();

    // 1. 获取当前 main
    const graphBox = graphDraw.getGraphMain(nodeID);

    // 2. 创建 editorable
    this.createContentEditable(graph);

    // 3. 获取 editorable 的div
    const editor = graphBox.querySelector(selector) as HTMLDivElement;

    // 4. 通过 editor 找parent 找 svg
    const svg = editor.parentNode?.querySelector("svg") as SVGSVGElement;

    // 5. 通过 svg 找 text 节点
    const textNode = svg.querySelector("text");

    const input = editor.children[0] as HTMLDivElement;

    // 6. 如果本身节点存在，则取文字出来显示到 input 中，并且删除 text 节点
    if (textNode) {
      input.innerHTML = textNode.innerHTML;
      textNode.remove();
    }

    // 自动获取焦点
    input.focus();

    // 将光标移动到末尾
    var range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    var sel = window.getSelection() as Selection;
    sel.removeAllRanges();
    sel.addRange(range);

    input.addEventListener("blur", () => {
      // 删除编辑器
      editor.remove();

      // 获取用户输入
      this.setGraphText(graph, input.innerHTML);
    });

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
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    // 4. 通过 editor 找parent 找 svg
    const svg = graphBox.querySelector("svg") as SVGSVGElement;

    const SVGtext = graphBox.querySelector("text");

    if (SVGtext) return (SVGtext.innerHTML = text);

    // 不然执行创建
    const st = this.draw.createSVGElement("text") as SVGTextElement;
    st.style.pointerEvents = "none"; // 不响应用户操作
    st.style.userSelect = "none"; // 无法实现选择复制
    st.setAttribute("x", "50%");
    st.setAttribute("y", "50%");
    st.setAttribute("text-anchor", "middle");
    st.innerHTML = text;
    svg.appendChild(st);
  }

  /**
   * 双击进行文本输入 - 实现原理： div.contenteditable
   * @param graph
   */
  public createContentEditable(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.draw.getGraphDraw().getGraphMain(nodeID);

    const editor = this.draw.createHTMLElement("div") as HTMLDivElement;
    editor.classList.add("sf-editor-box-graphs-main-contenteditable");

    const input = this.draw.createHTMLElement("div") as HTMLDivElement;
    input.setAttribute("contenteditable", "true");

    editor.appendChild(input);
    graphMain.appendChild(editor);
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
   * 元件点击事件-打开配置弹窗
   */
  private openDialog() {
    // 获取dialog对象
    const dialog = this.draw.getDialogDraw();

    // 打开弹窗
    dialog.openDialog("元件配置", "graphInfoTemp");

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
