import { IGraph } from "../../interface/Graph/index.ts";
import { Draw } from "../Draw/index.ts";
import { nanoid } from "nanoid";

// svg 公共类
export class GraphCommon {
  private draw: Draw;
  private nodeID: string;
  public getID: () => string;

  constructor(draw: Draw) {
    this.draw = draw;
    this.nodeID = nanoid();

    /** getter */
    this.getID = () => this.nodeID;
  }

  /**
   * 获取X坐标
   * @returns
   */
  public getX() {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    return Number(graphBox.style.left.replace("px", ""));
  }

  /**
   * 获取Y坐标
   * @returns
   */
  public getY() {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    return Number(graphBox.style.top.replace("px", ""));
  }

  /**
   * 获取宽度
   * @returns
   */
  public getWidth() {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    return Number(graphBox.style.width.replace("px", ""));
  }

  /**
   * 获取高度
   * @returns
   */
  public getHeight() {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    return Number(graphBox.style.height.replace("px", ""));
  }

  /**
   * 设置X
   * @param x
   */
  public setX(x: number) {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    graphBox.style.left = x + "px";
  }

  /**
   * 设置Y
   * @param y
   */
  public setY(y: number) {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    graphBox.style.top = y + "px";
  }

  /**
   * 设置宽度
   * @param w
   */
  public setWidth(w: number) {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    graphBox.style.width = w + "px";
  }

  /**
   * 设置高度
   * @param h
   */
  public setHeight(h: number) {
    const graphBox = this.draw.getGraphDraw().getGraphBox(this.nodeID);
    graphBox.style.height = h + "px";
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
   * 设置边框 stroke
   * @param stroke
   */
  public setStroke(stroke: string) {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    element.setAttribute("stroke", stroke);
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
   * 设置填充 fill
   * @param fill
   */
  public setFill(fill: string) {
    const graph = this as unknown as IGraph;
    const element = graph.getElement();
    element.setAttribute("fill", fill);
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
  }

  protected addToEditor(graph: IGraph) {
    // 初始化默认样式
    this.setFill("var(--fill)");
    this.setStroke("var(--stroke)");
    // 获取 graphDraw
    const graphDraw = this.draw.getGraphDraw();
    // 添加到 editor
    graphDraw.addGraph(graph);
  }
}
