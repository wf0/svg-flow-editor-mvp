import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Rect extends GraphCommon {
  private rect: SVGRectElement;

  constructor(draw: Draw, width: number, height: number) {
    super(draw);
    this.rect = draw.createSVGElement("rect") as SVGRectElement;
    this.rect.setAttribute("width", "100%");
    this.rect.setAttribute("height", "100%");

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, width);
    super.setHeight.call(this, height);
  }

  public getElement() {
    return this.rect;
  }
}
