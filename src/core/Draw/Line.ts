// 线条绘制类

import { Line } from "../Graph/Line.ts";
import { Draw } from "./index.ts";

export class LineDraw {
  private draw: Draw;
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * 创建线条的分组结构
   * @param line
   * @param sx div 的初始位置
   * @param sy div 的初始位置
   */
  public createLineGroup(line: Line, sx: number, sy: number) {
    const lineID = line.getID();
    const element = line.getElement();
    const lineBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    lineBox.classList.add("sf-editor-box-graphs-line");
    lineBox.setAttribute("lineid", lineID);
    lineBox.setAttribute("type", "line");
    lineBox.style.left = sx + "px";
    lineBox.style.top = sy + "px";

    // graphBox 内部装 svg
    const svg = this.draw.createSVGElement("svg") as SVGSVGElement;
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // svg 内部装 line
    element.setAttribute("lineid", lineID);
    element.setAttribute("type", "line");
    lineBox.appendChild(svg);
    svg.appendChild(element);

    const graphBox = this.draw
      .getEditorBox()
      .querySelector('[class="sf-editor-box-graphs"]') as HTMLDivElement;

    // 添加元素
    graphBox.appendChild(lineBox);

    return lineBox as HTMLDivElement;
  }
}
