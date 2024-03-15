import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Circle extends GraphCommon {
  private circle: SVGCircleElement;
  constructor(draw: Draw, radius: number) {
    super(draw);
    this.circle = draw.createSVGElement("circle") as SVGCircleElement;

    this.circle.setAttribute("cx", "50%");
    this.circle.setAttribute("cy", "50%");
    this.circle.setAttribute("r", "50%");

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, radius * 2);
    super.setHeight.call(this, radius * 2);
  }

  public getElement() {
    return this.circle;
  }
}
