import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

type ISVG = SVGRectElement | SVGEllipseElement;

// 不再提供 svg 类，而是提供graph 构造类，传入 elemen 实现 创建 graph 对象
export class Graph extends GraphCommon {
  private element: ISVG;
  constructor(draw: Draw, nodeID: string) {
    super(draw);

    // 重写相关方法
    this.getID = () => nodeID;

    this.element = draw
      .getEditorBox()
      .querySelector(`[graphid="${nodeID}"][type="graph"]`) as ISVG;
  }

  public getElement() {
    return this.element;
  }
}
