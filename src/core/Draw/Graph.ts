import { IGraph } from "../../interface/Graph/index.ts";
import { Draw } from "./index.ts";

//  graph svg 元图相关绘制类
export class GraphDraw {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * new 元件的时候，均需要执行addGraph 方法，创建分组后，才能添加到 editorBox上
   *  每一个元件，都是由 div => svg => graph 构成，外层div 用于处理 层级问题
   *  每一个内部的元件 都设置为 100%
   *  圆形、椭圆 则 cx 50% cy 50% r 50%
   * @param graph
   */
  public addGraph(graph: IGraph) {
    const nodeID = graph.getID();
    const element = graph.getElement();

    // 创建 graphBox 元件盒子 用于处理层级问题
    const graphBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    graphBox.classList.add("sf-editor-box-graph");
    graphBox.setAttribute("nodeID", nodeID); // 设置ID属性

    // graphBox 内部装 svg
    const svg = this.draw.createSVGElement("svg") as SVGSVGElement;
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // svg 内部装 rect circle ellipse 等基础元件
    svg.append(element);

    graphBox.append(svg);

    this.draw.getEditorBox().append(graphBox);
  }
}
