import { IGraph } from "../../interface/Graph/index.ts";
import { nextTick } from "../../utils/index.ts";
import { Draw } from "./index.ts";
const OFFSET = 10;

//  graph svg 元图相关绘制类
export class GraphDraw {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * new 元件的时候，均需要执行 addGraph 方法，创建分组后，才能添加到 editorBox 上
   *  每一个元件，都是由 div.mainBox => div.graphBox => svg => graph 构成，外层div 用于处理形变、链接锚点、层级问题
   *  每一个内部的元件 都设置为 100%
   *  圆形、椭圆 则 cx 50% cy 50% r 50%
   * @param graph
   */
  public addGraph(graph: IGraph) {
    const nodeID = graph.getID();
    const element = graph.getElement();

    // 最外层盒子，用于创建 形变、链接锚点、处理层级问题等
    const mainBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    mainBox.classList.add("sf-editor-box-graphs-main");
    mainBox.style.padding = OFFSET + "px"; // 设置偏移量
    mainBox.setAttribute("graphid", nodeID); // 设置ID属性
    mainBox.setAttribute("type", "mainBox"); // 设置ID属性

    // 创建 graphBox 元件盒子
    const graphBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    graphBox.classList.add("sf-editor-box-graphs-main-item");
    graphBox.setAttribute("type", "graphBox"); // 标记是 graph 的盒子 svg 的外层

    // graphBox 内部装 svg
    const svg = this.draw.createSVGElement("svg") as SVGSVGElement;
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // svg 内部装 rect circle ellipse 等基础元件
    element.setAttribute("graphid", nodeID);
    element.setAttribute("type", "graph");

    const editorBox = this.draw.getEditorBox();
    const graphsSelector = '[class="sf-editor-box-graphs"]';
    const graphs = editorBox.querySelector(graphsSelector) as HTMLDivElement;

    svg.appendChild(element);
    graphBox.appendChild(svg);
    mainBox.appendChild(graphBox);
    graphs.appendChild(mainBox);

    // 给元件添加事件
    const graphEvent = this.draw.getGraphEvent();
    graphEvent.addEvent(graphBox, graph);

    // 创建链接锚点【连接锚点的显示隐藏是以是否 hover 及 selected 决定，因此不需要单独提供取消事件】
    this.createLinkPoint(graph);

    // 创建形变锚点
    this.createFormatPoint(graph);

    // 创建 contenteditable 可编辑 DIV
    this.createContentEditable(graph);
  }

  /**
   * 创建链接锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  public createLinkPoint(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.getGraphMain(nodeID);

    // 1. 创建 link 链接锚点
    const link = this.draw.createHTMLElement("div") as HTMLDivElement;
    link.classList.add("sf-editor-box-graphs-main-links");

    graphMain.appendChild(link);

    // 2. 根据宽度 高度 绘制 4 个链接锚点
    nextTick(() => {
      const radius = 10; // 定义链接锚点半径
      const fill = "#fff"; // 定义链接锚点的样式
      const stroke = "#067bef";
      const points = [];
      const width = graph.getWidth();
      const height = graph.getHeight();
      points.push({ x: 0, y: height / 2 });
      points.push({ x: width / 2, y: 0 });
      points.push({ x: width, y: height / 2 });
      points.push({ x: width / 2, y: height });

      points.forEach(({ x, y }) => {
        const linkItem = this.draw.createHTMLElement("div") as HTMLDivElement;
        linkItem.style.width = radius + "px";
        linkItem.style.height = radius + "px";
        linkItem.style.position = "absolute";
        linkItem.style.left = x + radius / 2 + "px";
        linkItem.style.top = y + radius / 2 + "px";
        linkItem.style.backgroundColor = fill;
        linkItem.style.borderColor = stroke;
        linkItem.style.borderRadius = radius + "px";
        link.appendChild(linkItem);

        // 添加事件
        linkItem.addEventListener("mousedown", () => {
          console.log("链接锚点 mousedown");
        });
      });
    });
  }

  /**
   * 创建形变锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  public createFormatPoint(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.getGraphMain(nodeID);

    const format = this.draw.createHTMLElement("div") as HTMLDivElement;
    format.classList.add("sf-editor-box-graphs-main-formats");

    graphMain.appendChild(format);

    /**
     * 根据位置信息，计算形变锚点位置 顺序如下
     *   1   2   3
     *   8       4
     *   7   6   5
     */
    nextTick(() => {
      const wh = 10; // 定义形变锚点宽高
      const fill = "#fff"; // 定义链接锚点的样式
      const stroke = "#067bef";
      const points = [];
      const width = graph.getWidth();
      const height = graph.getHeight();
      points.push({ cursor: "nw-resize", x: 0, y: 0 });
      points.push({ cursor: "n-resize", x: width / 2, y: 0 });
      points.push({ cursor: "ne-resize", x: width, y: 0 });
      points.push({ cursor: "e-resize", x: width, y: height / 2 });
      points.push({ cursor: "se-resize", x: width, y: height });
      points.push({ cursor: "s-resize", x: width / 2, y: height });
      points.push({ cursor: "sw-resize", x: 0, y: height });
      points.push({ cursor: "w-resize", x: 0, y: height / 2 });

      points.forEach(({ cursor, x, y }) => {
        const formatItem = this.draw.createHTMLElement("div") as HTMLDivElement;
        formatItem.style.width = wh + "px";
        formatItem.style.height = wh + "px";
        formatItem.style.position = "absolute";
        formatItem.style.left = x + wh / 2 + "px";
        formatItem.style.top = y + wh / 2 + "px";
        formatItem.style.backgroundColor = fill;
        formatItem.style.borderColor = stroke;
        formatItem.style.cursor = cursor;
        format.appendChild(formatItem);

        // 添加事件
      });
    });
  }

  /**
   * 取消形变锚点
   */
  public cancelFormatPoint() {
    this.draw
      .getEditorBox()
      .querySelectorAll("div[class='sf-editor-box-graphs-main selected']")
      .forEach((i) => (i as HTMLDivElement).classList.remove("selected"));
  }

  /**
   * 双击进行文本输入 - 实现原理： div.contenteditable
   * @param graph
   */
  public createContentEditable(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.getGraphMain(nodeID);

    const editor = this.draw.createHTMLElement("div") as HTMLDivElement;
    editor.classList.add("sf-editor-box-graphs-main-contenteditable");

    const input = this.draw.createHTMLElement("div") as HTMLDivElement;
    input.setAttribute("contenteditable", "true");

    editor.appendChild(input);
    graphMain.appendChild(editor);
  }

  /**
   * 获取 graph Main 这个是位置相关
   * @param nodeID
   * @returns
   */
  public getGraphMain(nodeID: string) {
    const selector = `div[graphid="${nodeID}"][type="mainBox"]`;
    return this.draw.getEditorBox().querySelector(selector) as HTMLDivElement;
  }

  /**
   * 获取 graph Box 这个是宽度、高度相关的
   * @param nodeID
   * @returns
   */
  public getGraphBox(nodeID: string) {
    const graphMain = this.getGraphMain(nodeID);
    return graphMain.querySelector('[type="graphBox"]') as HTMLDivElement;
  }
}
