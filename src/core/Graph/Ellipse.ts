import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Ellipse extends GraphCommon {
  private ellipse: SVGEllipseElement;

  constructor(draw: Draw, width: number, height: number) {
    super(draw);
    this.ellipse = draw.createSVGElement("ellipse") as SVGEllipseElement;

    this.ellipse.setAttribute("rx", "50%");
    this.ellipse.setAttribute("ry", "50%");

    this.ellipse.setAttribute("cx", "50%");
    this.ellipse.setAttribute("cy", "50%");

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, width * 2);
    super.setHeight.call(this, height * 2);
  }

  public getElement() {
    return this.ellipse;
  }
}
