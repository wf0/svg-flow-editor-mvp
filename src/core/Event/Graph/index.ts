import { IGraph, node } from "../../../interface/Graph/index.ts";
import { Draw } from "../../Draw/index.ts";
const worker = new Worker("/src/core/Worker/AuxiliaryLine.worker.ts", {
  type: "module",
});

/**
 * graph 元件事件响应
 */
export class GraphEvent {
  private draw: Draw;
  private move!: boolean;
  private sx!: number;
  private sy!: number;

  private nodes!: node[];
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * graphBox 添加事件
   * @param ele
   */
  public addEvent(ele: HTMLDivElement, graph: IGraph) {
    ele.addEventListener("click", (e) => this.graphClickHandle(e, graph));
    ele.addEventListener("mousedown", this.mouseDownHandle.bind(this));
    ele.addEventListener("mousemove", (e) => this.mouseMoveHandle(e, graph));
    ele.addEventListener("mouseup", this.mouseUpHandle.bind(this));
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

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 元件双击事件
   * @param e
   */
  private graphDblclickHandle(e: Event, graph: IGraph) {
    const nodeID = graph.getID();
    const selector = 'div[class="sf-editor-box-graphs-main-contenteditable"]';

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
      const text = input.innerHTML;

      // 将该内容添加到 svg 上
      const st = this.draw.createSVGElement("text") as SVGTextElement;
      st.style.pointerEvents = "none"; // 不响应用户操作
      st.style.userSelect = "none"; // 无法实现选择复制
      st.setAttribute("x", "50%");
      st.setAttribute("y", "50%");
      st.setAttribute("text-anchor", "middle");
      st.innerHTML = text;
      svg.appendChild(st);
    });

    e.stopPropagation();
    e.preventDefault();
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
   * graph mousedown 移动事件
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
  }

  /**
   * mouseup
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
    worker.postMessage({ current, nodes: this.nodes });
    worker.onmessage = ({ data }) => {
      // 清空所有的辅助线
      if (!data.length) return this.draw.getCanvasDraw().unDrawAuxiliaryLine();
      // 不然绘制辅助线
      this.draw.getCanvasDraw().drawAuxiliaryLine(data);
    };
  }

  /**
   * 元件右键菜单
   */
  private contextmenu(e: Event, graph?: IGraph) {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.contextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 获取当前选中的元素节点
   * @returns
   */
  // private getAllSelected() {
  //   const selector = "sf-editor-box-graphs-main selected";
  //   return this.draw.getEditorBox().querySelectorAll(selector);
  // }

  /**
   * 获取单个
   * @returns
   */
  private getSelected() {
    const selector = "sf-editor-box-graphs-main selected";
    return this.draw.getEditorBox().querySelector(selector);
  }
}
