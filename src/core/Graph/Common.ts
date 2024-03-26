import { IGraph } from "../../interface/Graph/index.ts";
import { Draw } from "../Draw/index.ts";
import { nanoid } from "nanoid";

/**
 * GraphCommon graph 公共类
 *   graphMain - 元件的最外层盒子，用于处理层级、链接、形变锚点、left top 位置信息
 *   graphBox - 元件的 宽度、高度
 */
export class GraphCommon {
  private draw: Draw;
  private nodeID: string;
  public getID: () => string;

  constructor(draw: Draw, nodeID?: string) {
    this.draw = draw;
    this.nodeID = nodeID || nanoid();

    /** getter */
    this.getID = () => this.nodeID;
  }

  /**
   * 获取X坐标
   * @returns
   */
  public getX() {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    return Number(graphBox.style.left.replace("px", ""));
  }

  /**
   * 获取Y坐标
   * @returns
   */
  public getY() {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    return Number(graphBox.style.top.replace("px", ""));
  }

  /**
   * 获取宽度
   * @returns
   */
  public getWidth() {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    return Number(graphBox.style.width.replace("px", ""));
  }

  /**
   * 获取高度
   * @returns
   */
  public getHeight() {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    return Number(graphBox.style.height.replace("px", ""));
  }

  /**
   * 获取 stroke 边框
   * @returns
   */
  public getStroke() {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    return element.getAttribute("stroke");
  }

  /**
   * 获取 fill 填充
   * @returns
   */
  public getFill() {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    return element.getAttribute("fill");
  }

  /**
   * 获取元素的旋转角度
   */
  public getRotate() {
    const graph = this as unknown as IGraph;
    const mainBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    const { transform } = mainBox.style; // . = `rotate(${rotate}deg)`;
    return Number(transform.replace(/rotate(|deg)/g, ""));
  }

  /**
   * 获取元件的文本
   */
  public getText() {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    const text = graphBox.querySelector("text");
    return text?.innerHTML;
  }

  /** setter */
  /** setter */
  /** setter */
  /** setter */

  /**
   * 设置ID属性
   * @param nodeID
   */
  public setID(nodeID: string) {
    const graph = this as unknown as IGraph;
    const oldID = graph.getID();
    graph.nodeID = nodeID;
    // 通过oldID 修改页面属性
    this.draw
      .getEditorBox()
      .querySelectorAll(`[graphid="${oldID}"]`)
      .forEach((i) => i.setAttribute("graphid", nodeID));

    return graph;
  }

  /**
   * 设置X
   * @param x
   */
  public setX(x: number) {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    graphBox.style.left = x + "px";
    return graph;
  }

  /**
   * 设置Y
   * @param y
   */
  public setY(y: number) {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    graphBox.style.top = y + "px";
  }

  /**
   * 设置宽度
   * @param w
   */
  public setWidth(w: number) {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    graphBox.style.width = w + "px";
    return graph;
  }

  /**
   * 设置高度
   * @param h
   */
  public setHeight(h: number) {
    const graph = this as unknown as IGraph;
    const graphBox = this.draw.getGraphDraw().getGraphBox(graph.getID());
    graphBox.style.height = h + "px";
    return graph;
  }

  /**
   * 设置边框 stroke
   * @param stroke
   */
  public setStroke(stroke: string) {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    element.setAttribute("stroke", stroke);
    return graph;
  }

  /**
   * 设置填充 fill
   * @param fill
   */
  public setFill(fill: string) {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    element.setAttribute("fill", fill);
    return graph;
  }

  /**
   * setRotate 设置旋转
   */
  public setRotate(rotate: number) {
    const graph = this as unknown as IGraph;
    const mainBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
    mainBox.style.transform = `rotate(${rotate}deg)`;
    return graph;
  }

  /**
   * 设置文本
   * @param text
   */
  public setText(text: string) {
    const graph = this as unknown as IGraph;
    this.draw.getGraphEvent().setGraphText(graph, text);
    return graph;
  }

  /**
   * 设置位置
   * @param x
   * @param y
   * @returns
   */
  public position(x: number, y: number) {
    const graph = this as unknown as IGraph;
    graph.setX(x);
    graph.setY(y);
    return graph;
  }

  /**
   * 将元件添加到 editor 编辑器上
   * @param graph
   */
  protected addToEditor(graph: IGraph) {
    // 获取 graphDraw
    const graphDraw = this.draw.getGraphDraw();
    // 添加到 editor
    graphDraw.addGraph(graph);
  }

  /**
   * 更新锚点
   * @param graph
   */
  protected updatePoint(graph: IGraph) {
    // 获取 graphDraw
    const graphDraw = this.draw.getGraphDraw();
    graphDraw.cancelLinkPoint(graph);
    graphDraw.createLinkPoint(graph);
    graphDraw.cancelFormatPoint(graph);
    graphDraw.createFormatPoint(graph);
  }
}
