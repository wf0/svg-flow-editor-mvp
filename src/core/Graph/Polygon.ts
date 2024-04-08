// 五角星

import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class Polygon extends GraphCommon {
  private polygon: SVGPolygonElement;
  constructor(
    draw: Draw,
    t: "triangle" | "star" | "arrow",
    width: number,
    height: number
  ) {
    super(draw);
    // 创建 五角星
    this.polygon = draw.createSVGElement("polygon") as SVGPolygonElement;

    // 标记tp类型
    this.polygon.setAttribute("tp", t);

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, width);
    super.setHeight.call(this, height);

    this.initPoints(t);
  }

  /**
   * 根据类型更新顶点位置 设置 public 是因因为 graph move 过程中，需要调用此函数
   * @param t
   */
  public initPoints(t: "triangle" | "star" | "arrow"): void {
    const width = this.getWidth();
    const height = this.getHeight();
    // 根据宽高自动解析points的位置

    switch (t) {
      case "triangle":
        this.polygon.setAttribute(
          "points",
          `${width / 2} ${0} ${width} ${height} ${0} ${height}`
        );

        break;
      case "star":
        const sp = this.calculateStarPoints(width, height);
        this.polygon.setAttribute("points", sp);
        break;
      case "arrow":
        // 横向柱 高度是 height的一半，并且居中对齐，宽度是 4/3 宽度，箭头独占 4/1 宽度
        const ap = `${0} ${height / 4} ${width * 0.75} ${height / 4} 
        ${width * 0.75} ${0} ${width} ${height / 2} ${width * 0.75} 
        ${height}  ${width * 0.75} ${height * 0.75} ${0} ${height * 0.75}`;
        // 根据宽高设置箭头的points
        this.polygon.setAttribute("points", ap);
        break;
    }
  }

  /**
   * 计算五角星位置坐标
   * @param width
   * @param height
   * @returns
   */
  private calculateStarPoints(width: number, height: number) {
    /**
     *     1
     * 3       2
     *   5   4
     */
    var points = "";
    // 1. 获取顶点的坐标
    const p1 = [width / 2, 0];

    // 2. 获取右边交点
    const p2 = [width, height * 0.35];

    // 3. 获取左边交点
    const p3 = [0, height * 0.35];

    // 4. 获取右下交点
    const p4 = [width * 0.84, height];

    // 5. 获取左下交点
    const p5 = [width * 0.16, height];

    // 获取顶点与右边的交点
    const p1423 = this.getIntersection(p1, p4, p2, p3);

    // 获取顶点与左边的交点
    const p1523 = this.getIntersection(p1, p5, p2, p3);

    // 获取3415交点
    const p3415 = this.getIntersection(p3, p4, p1, p5);

    // 获取1425交点
    const p1425 = this.getIntersection(p1, p4, p2, p5);

    // 获取3425交点
    const p3425 = this.getIntersection(p3, p4, p2, p5);

    // 根据上诉点位解析成points
    const list = [p1, p1423, p2, p1425, p4, p3425, p5, p3415, p3, p1523];
    list.forEach((item) => {
      points += `${item![0]},${item![1]} `;
    });

    return points;
  }

  // 获取两点的交点函数
  private getIntersection(
    p01: number[],
    p02: number[],
    p03: number[],
    p04: number[]
  ) {
    // 根据传入的点，解析成对象的形式
    const p0 = { x: p01[0], y: p01[1] };
    const p1 = { x: p02[0], y: p02[1] };
    const p2 = { x: p03[0], y: p03[1] };
    const p3 = { x: p04[0], y: p04[1] };

    // 线段P0P1和P2P3的交点
    var s1_x = p1.x - p0.x;
    var s1_y = p1.y - p0.y;
    var s2_x = p3.x - p2.x;
    var s2_y = p3.y - p2.y;

    var s =
      (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) /
      (-s2_x * s1_y + s1_x * s2_y);
    var t =
      (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) /
      (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
      // 交点在两线段范围内
      return [p0.x + t * s1_x, p0.y + t * s1_y];

    return null; // 没有交点
  }

  // 获取Element
  public getElement() {
    return this.polygon;
  }
}
