// 路径
import { IPath, IPolygon } from "../../interface/Graph/index.ts";
import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Path extends GraphCommon {
  private gpath: SVGGElement;
  constructor(draw: Draw, t: IPath, width: number, height: number) {
    super(draw);
    // 创建 五角星
    this.gpath = draw.createSVGElement("g") as SVGGElement;

    // 标记tp类型
    this.gpath.setAttribute("tp", t);
    this.gpath.setAttribute("stroke-width", "2");

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, width);
    super.setHeight.call(this, height);

    // 设置 path
    this.initPath(t, draw);
  }

  /**
   * 根据类型更新顶点位置 设置 public 是因因为 graph move 过程中，需要调用此函数
   * @param t
   */
  public initPath(t: IPath | IPolygon, draw: Draw) {
    // 1. 清空 gpath 内部的所有元素
    this.gpath.innerHTML = "";
    const w = super.getWidth();
    const h = super.getHeight();
    // 定义圆角直径
    const R = 10;
    // 定义间距
    const O = 30;
    // 这里需要创建 path 路径，外层是 group，内层是 path
    switch (t) {
      case "note":
        // 1. 左侧直线 左下圆角 底部直线 右下圆角 右侧直线
        const p1 = draw.createSVGElement("path") as SVGPathElement;
        p1.setAttribute(
          "d",
          `M ${R} ${R} Q 0 ${R} 0 ${2 * R} 0 ${2 * R} 
           0 ${h - R} Q 0 ${h} ${R} ${h} ${R} ${h} 
           ${w - R} ${h} Q ${w} ${h} ${w} ${h - R} ${w} ${h - R} 
           ${w} ${2 * R} Q ${w} ${R} ${w - R} ${R}`
        );

        // 顶部两条竖线 + 中间横线
        const p2 = draw.createSVGElement("path") as SVGPathElement;
        p2.setAttribute(
          "d",
          `M ${R + O / 2} ${0}  ${R + O / 2} ${2 * R} 
           M ${w - R - O / 2} ${0}  ${w - R - O / 2} ${2 * R}
           M ${R + O} ${R}  ${w - R - O} ${R}`
        );

        this.gpath.appendChild(p1);

        this.gpath.appendChild(p2);
        break;

      default:
        break;
    }
  }

  // 获取Element
  public getElement() {
    return this.gpath;
  }
}
