import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Text extends GraphCommon {
  private text: SVGTextElement;

  constructor(draw: Draw, text: string) {
    super(draw);
    this.text = draw.createSVGElement("text") as SVGTextElement;
    this.text.innerHTML = text;
    this.text.setAttribute("x", "50%");
    this.text.setAttribute("y", "50%");
    this.text.setAttribute("text-anchor", "center");

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);
  }

  public getElement() {
    return this.text;
  }
}
