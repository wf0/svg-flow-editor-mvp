/**
 * 直角折线
 *  1. 实现思路借鉴 logicFlow，并结合自身项目实际，提出下列直角折线实现算法
 *     https://site.logic-flow.cn/article/article03#%E7%9B%B4%E8%A7%92%E6%8A%98%E7%BA%BF
 *    1.1 找到所有相关、可能经过的点（中点，交点）
 *    1.2 需要提供判断点是否在矩形内部的辅助方法
 *    1.3 还需要判断 offset 是否相近
 *    1.4 找到当前点的 x y 相同的点作为可达点【并且可达距离均为1 直接计算曼哈顿距离即可】
 *    1.5 还需要判断当前两点的向量是否穿过矩形
 */

import { nanoid } from "nanoid";
import { Draw } from "../Draw/index.ts";
import { Graph } from "./index.ts";
import { LineKey } from "../../interface/Graph/index.ts";
import { type1, type2, type3, type4 } from "../../utils/index.ts";

const OFFSET = 50; // 定义折线的偏移量
type p = { x: number; y: number; cost?: number }; // 定义点的类型

export class Line {
  private ID: string;
  private line: SVGPolylineElement;
  private draw: Draw;
  private lineBox: HTMLDivElement;

  private Sgraph!: Graph;
  private Egraph!: Graph;
  private IOT!: boolean; // 是否可取 offset

  // 记录背景相关尺寸
  private lx!: number;
  private ly!: number;
  private lw!: number;
  private lh!: number;

  constructor(
    draw: Draw,
    sx: number,
    sy: number,
    lineid?: string,
    lineBox?: HTMLDivElement
  ) {
    this.ID = lineid || nanoid();
    this.draw = draw;
    this.IOT = true;
    // 需要兼容不是创建型，而是外部生成
    if (lineBox) {
      this.lineBox = lineBox;
      this.line = lineBox.querySelector("polyline") as SVGPolylineElement;
    } else {
      this.line = draw.createSVGElement("polyline") as SVGPolylineElement;
      this.line.setAttribute("fill", "transparent");
      this.line.setAttribute("stroke", "black");
      this.line.setAttribute("stroke-dasharray", "5,5");
      this.line.setAttribute("stroke-width", "2");
      // 1. 获取分组 - lineBox 是外层的 DIV,用于处理宽度高度 定位信息
      this.lineBox = draw.getLineDraw().createLineGroup(this, sx, sy);
    }
  }

  /**
   * move 过程中 update 线条位置
   */
  public move(sx: number, sy: number, ex: number, ey: number) {
    const dx = sx - ex;
    const dy = sy - ey;
    if (dx < 0 && dy < 0)
      this.line.setAttribute("points", `0 0,${Math.abs(dx)} ${Math.abs(dy)}`);
    if (dx > 0 && dy > 0)
      this.line.setAttribute("points", `0 0,${Math.abs(dx)} ${Math.abs(dy)}`);
    if (dx < 0 && dy > 0)
      this.line.setAttribute("points", `0 ${Math.abs(dy)},${Math.abs(dx)} 0`);
    if (dx > 0 && dy < 0)
      this.line.setAttribute("points", `0 ${Math.abs(dy)},${Math.abs(dx)} 0`);
    if (dx > 0) this.setX(ex);
    if (dy > 0) this.setY(ey);
    // 需要同步设置宽高，位置信息
    this.setWidth(Math.abs(dx));
    this.setHeight(Math.abs(dy));
    this.lineBox.style.zIndex = "99";
  }

  /**
   * 开始绘制直角折线 A* 算法 + 曼哈顿距离
   * @param payload
   */
  public drawLine(st: string, et: string) {
    console.log("### 绘制最终折线，根据框的宽高位置信息获取基础数据");
    const eid = this.line.getAttribute("eid") as string;
    const sid = this.line.getAttribute("sid") as string;
    if (!eid || !st || !et) return this.lineBox.remove();
    this.line.removeAttribute("stroke-dasharray");
    this.line.removeAttribute("points");
    this.line.setAttribute("st", st);
    this.line.setAttribute("et", et);
    // this.lineBox.style.backgroundColor = "rgba(0,0,0,0.1)";
    this.lineBox.style.zIndex = "-1";

    // 设置背景尺寸相关
    this.background(sid, eid);

    // 开始寻径
    this.routing(st, et);
  }

  /**
   * 移动过程中更新line的位置
   */
  public update(sid: string, eid: string, st: string, et: string) {
    // 1. 清空 circle
    this.lineBox.querySelectorAll("circle").forEach((i) => i.remove());
    this.background(sid, eid);
    this.routing(st, et);
  }

  /**
   * 计算背景位置
   */
  private background(sid: string, eid: string) {
    // 1. 获取 sid eid 构建 graph
    const Sgraph = new Graph(this.draw, sid);
    const Egraph = new Graph(this.draw, eid);
    this.Sgraph = Sgraph;
    this.Egraph = Egraph;

    // 2. 获取start的宽高 位置信息
    const sx = Sgraph.getX();
    const sy = Sgraph.getY();
    const sw = Sgraph.getWidth();
    const sh = Sgraph.getHeight();

    // 3. 获取 end 的宽高 位置信息
    const ex = Egraph.getX();
    const ey = Egraph.getY();
    const ew = Egraph.getWidth();
    const eh = Egraph.getHeight();

    // 5. 构建 OFFSET 的矩形 --- 受padding的影响
    const lx = Math.min(sx, ex) - OFFSET + 10;
    const ly = Math.min(sy, ey) - OFFSET + 10;
    this.setX(lx);
    this.setY(ly);

    //  宽高就看谁的大
    const mx = Math.max(sx + sw, ex + ew);
    const my = Math.max(sy + sh, ey + eh);
    const lw = mx - lx + OFFSET + 10;
    const lh = my - ly + OFFSET + 10;

    this.setWidth(lw);
    this.setHeight(lh);

    // 4. 需要知道哪个元件在最后 也就是 graph x 最大
    const maxGrapg = sx > ex ? Sgraph : Egraph;
    const minGraph = maxGrapg === Sgraph ? Egraph : Sgraph;
    const dx = maxGrapg.getX() - (minGraph.getX() + minGraph.getWidth());
    const dy = maxGrapg.getY() - (minGraph.getY() + minGraph.getHeight());
    if (dx < OFFSET && dy < OFFSET) this.IOT = false;
    else this.IOT = true;
    this.lx = lx;
    this.ly = ly;
    this.lw = lw;
    this.lh = lh;
  }

  /**
   * 寻径
   */
  private async routing(st: string, et: string) {
    var points = []; // 定义可能经过的点
    const OFT = this.IOT ? OFFSET : 4;

    const typeMap: LineKey = { "0": type1, "1": type2, "2": type3, "3": type4 }; // 定义类型映射

    // 【辅助函数】做点的纠正-因为 计算得到的是 基于背景的 而线的绘制基于新的 div 坐标，需要做处理 【并且受 padding 的影响】
    const getX = (x: number) => x - this.lx + 10;
    const getY = (y: number) => y - this.ly + 10;

    // 1.【起点】
    const [sx, sy, sw, sh] = this.analysisGraph(this.Sgraph);
    const startType = typeMap[st]({ x: sx, y: sy, w: sw, h: sh }, OFT);
    const startPoint = { x: getX(startType.x), y: getY(startType.y) };

    // 2. 【终点】
    const [ex, ey, ew, eh] = this.analysisGraph(this.Egraph);
    const endType = typeMap[et]({ x: ex, y: ey, w: ew, h: eh }, OFT);
    const endPoint = { x: getX(endType.x), y: getY(endType.y) };

    // 3. 【伪起点】
    const startOffsetPoint = { x: getX(startType.ox), y: getY(startType.oy) };
    points.push(startOffsetPoint);

    // 4. 【伪终点】
    const endOffsetPoint = { x: getX(endType.ox), y: getY(endType.oy) };
    points.push(endOffsetPoint);

    // 5. 【取线段方向的交点】
    const seg1 = [startPoint, startOffsetPoint];
    const seg2 = [endPoint, endOffsetPoint];
    const intersection = this.getIntersection(seg1, seg2);
    intersection && points.push(intersection);

    // 6. 【如果线段没有交点，则需要取垂线的水平方向交点】
    if (!intersection) {
      let p1 = this.getIntersection(
        [startPoint, startOffsetPoint], // 假设经过起点的垂直线是垂直的
        [endOffsetPoint, { x: endOffsetPoint.x + 10, y: endOffsetPoint.y }] // 那么就要计算经过伪终点的水平线。水平线上的点y坐标相同，所以x坐标随便加减多少数值都可以
      );
      p1 && points.push(p1);
      let p2 = this.getIntersection(
        [startPoint, startOffsetPoint], // 假设经过起点的垂直线是水平的
        [endOffsetPoint, { x: endOffsetPoint.x, y: endOffsetPoint.y + 10 }] // 那么就要计算经过伪终点的垂直线。
      );
      p2 && points.push(p2);
      // // 下面同上
      let p3 = this.getIntersection(
        [endPoint, endOffsetPoint],
        [
          startOffsetPoint,
          { x: startOffsetPoint.x + 10, y: startOffsetPoint.y },
        ]
      );
      p3 && points.push(p3);
      let p4 = this.getIntersection(
        [endPoint, endOffsetPoint],
        [
          startOffsetPoint,
          { x: startOffsetPoint.x, y: startOffsetPoint.y + 10 },
        ]
      );
      p4 && points.push(p4);
    }

    // 6. 【startOffset 的边距4个交点】
    const startOffsetBoundary = this.getBoundaryPoints(startOffsetPoint);
    startOffsetBoundary.length && points.push(...startOffsetBoundary);

    // 7. 【endOffset 的边距交点】
    const endOffsetBoundary = this.getBoundaryPoints(endOffsetPoint);
    endOffsetBoundary.length && points.push(...endOffsetBoundary);

    // 绘制直线
    const list: p[] = this.deduplication(points); // 去重后的最终结果
    // 结果供 demo 绘制
    // 结果供 demo 绘制
    // 结果供 demo 绘制
    // list.forEach((p) => this.drawPoint(p));
    // this.drawPoint(startPoint, "green");
    // this.drawPoint(endPoint, "green");

    // 进行 A* 算法查找
    const result = await this.search(list, startOffsetPoint, endOffsetPoint);

    // 最优结果绘制
    var ops = "";
    result.forEach(({ x, y }) => {
      ops += `,${x} ${y}`;
    });

    this.line.setAttribute(
      "points",
      `${startPoint.x} ${startPoint.y},${startOffsetPoint.x} ${startOffsetPoint.y} ${ops} ,
      ${endOffsetPoint.x} ${endOffsetPoint.y},${endPoint.x} ${endPoint.y}`
    );
  }

  /**
   * A* 算法
   */
  private search(li: p[], start: p, end: p) {
    const list: p[] = JSON.parse(JSON.stringify(li));
    return new Promise<p[]>((resolve) => {
      var optimal: p[] = []; // 最优解
      var prePoint = { x: Infinity, y: Infinity }; // 当前上一个节点
      var index = 0;

      // 计算距离权重
      const computedDistance = (p: p) => {
        if (prePoint.x === p.x && prePoint.y === p.y) {
          // 如果重复找同一个点，则删除该点
          const i = list.findIndex((i) => i.x === p.x && i.y === p.y);
          list.splice(i, 1);
        }
        prePoint = p;
        // 获取list中 x、y 相同的点，并计算最短路径
        const ps = list.filter((i) => i.x === p.x || i.y === p.y);

        // 循环当前可达的点，并计算距离
        ps.forEach((i: p) => {
          i.cost = Infinity; // 默认无穷大
          if (this.checkLineThroughElements(p, i)) return;
          // 计算曼哈顿距离
          i.cost = Math.abs(i.x - end.x) + Math.abs(i.y - end.y);
        });

        ps.sort((a, b) => (a.cost as number) - (b.cost as number));
        // this.drawPoint(ps[0], "blue");
        return ps[0];
      };

      // A* 算法核心
      const AStart = () => {
        index++;
        if (index > list.length * 2) return resolve([]);
        const point = optimal.length ? optimal[optimal.length - 1] : start; // 当前的最优解
        if (point.x === end.x && point.y === end.y) return resolve(optimal);
        const optimalPoint = computedDistance(point);
        optimal.push(optimalPoint);
        AStart();
      };
      AStart();
    });
  }

  // 检查两个点组成的线段是否穿过起终点元素
  private checkLineThroughElements(p1: p, p2: p) {
    let rects = [this.Sgraph, this.Egraph];
    let minX = Math.min(p1.x, p2.x);
    let maxX = Math.max(p1.x, p2.x);
    let minY = Math.min(p1.y, p2.y);
    let maxY = Math.max(p1.y, p2.y);

    // 水平线
    if (p1.y === p2.y) {
      for (let i = 0; i < rects.length; i++) {
        let rect = rects[i];
        if (
          minY > rect.getY() - this.ly &&
          minY < rect.getY() + rect.getHeight() - this.ly &&
          minX < rect.getX() + rect.getWidth() - this.lx &&
          maxX > rect.getX() - this.lx
        ) {
          return true;
        }
      }
    } else if (p1.x === p2.x) {
      // 垂直线
      for (let i = 0; i < rects.length; i++) {
        let rect = rects[i];
        if (
          minX > rect.getX() - this.lx &&
          minX < rect.getX() + rect.getWidth() - this.lx &&
          minY < rect.getY() + rect.getHeight() - this.ly &&
          maxY > rect.getY() - this.ly
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * 计算两条线段的交点
   */
  private getIntersection(seg1: p[], seg2: p[]) {
    // 两条垂直线不会相交
    if (seg1[0].x === seg1[1].x && seg2[0].x === seg2[1].x) {
      return null;
    }
    // 两条水平线不会相交
    if (seg1[0].y === seg1[1].y && seg2[0].y === seg2[1].y) {
      return null;
    }
    // seg1是水平线、seg2是垂直线
    if (seg1[0].y === seg1[1].y && seg2[0].x === seg2[1].x) {
      return { x: seg2[0].x, y: seg1[0].y };
    }
    // seg1是垂直线、seg2是水平线
    if (seg1[0].x === seg1[1].x && seg2[0].y === seg2[1].y) {
      return { x: seg1[0].x, y: seg2[0].y };
    }
  }

  /**
   * 获取点与背景边界的交点
   * @param p
   * @returns
   */
  private getBoundaryPoints(p: p) {
    const { x, y } = p;
    const p1 = { x: 0, y };
    const p2 = { x: this.lw, y };
    const p3 = { x, y: 0 };
    const p4 = { x, y: this.lh };
    return [p1, p2, p3, p4].filter((i) => !this.inside(i));
  }

  // 【辅助函数】判断当前点是否在两个矩形之间
  private inside({ x, y }: p) {
    const [sx, sy, sw, sh] = this.analysisGraph(this.Sgraph);
    const [ex, ey, ew, eh] = this.analysisGraph(this.Egraph);

    // 非法范围
    const startX = [sx - this.lx, sx - this.lx + sw + 20];
    const startY = [sy - this.ly, sy - this.ly + sh + 20];
    const endX = [ex - this.lx, ex - this.ly + ew + 20];
    const endY = [ey - this.ly, ey - this.ly + eh + 20];
    const isInStart =
      x > startX[0] && x < startX[1] && y > startY[0] && y < startY[1];

    const isInEnd = x > endX[0] && x < endX[1] && y > endY[0] && y < endY[1];

    // 只有 x y 都在非法范围内，才是在矩形内部
    return isInStart || isInEnd;
  }

  /**
   * 去重
   * @param points
   * @returns
   */
  private deduplication(points: p[]) {
    let list: p[] = [];
    let map: { [key: string]: boolean } = {};
    points.forEach(({ x, y }) => {
      if (map[x + "-" + y]) return;
      map[x + "-" + y] = true;
      list.push({ x, y });
    });
    return JSON.parse(JSON.stringify(list)); // 深拷贝简单实现
  }

  /**
   * 解析 元件的四个属性
   */
  private analysisGraph(graph: Graph) {
    const x = graph.getX();
    const y = graph.getY();
    const w = graph.getWidth();
    const h = graph.getHeight();
    return [x, y, w, h];
  }

  /**
   * demodemo
   * @param p
   * @param color
   */
  // private drawPoint(p: p, color?: string) {
  //   const circle = this.draw.createSVGElement("circle");
  //   circle.setAttribute("r", "4");
  //   circle.setAttribute("cx", p.x.toString());
  //   circle.setAttribute("cy", p.y.toString());
  //   circle.setAttribute("fill", color || "red");
  //   // @ts-ignore
  //   this.lineBox.querySelector("svg")?.appendChild(circle);
  // }

  /**
   * 设置关联ID
   * @param type
   * @param id
   */
  public setGraphID(type: "sid" | "eid", id: string) {
    this.line.setAttribute(type, id);
  }

  /**
   * 设置宽度
   * @param w
   * @returns
   */
  private setWidth(w: number) {
    this.lineBox.style.width = w + "px";
    return this;
  }

  /**
   * 设置高度
   * @param h
   * @returns
   */
  private setHeight(h: number) {
    this.lineBox.style.height = h + "px";
    return this;
  }

  /**
   * 设置X
   * @param x
   * @returns
   */
  private setX(x: number) {
    this.lineBox.style.left = x + "px";
    return this;
  }

  /**
   * 设置Y
   * @param y
   * @returns
   */
  private setY(y: number) {
    this.lineBox.style.top = y + "px";
    return this;
  }

  /**
   * 提供 Element 获取
   * @returns
   */
  public getElement() {
    return this.line;
  }

  /**
   * 获取当前的 lineid
   * @returns
   */
  public getID() {
    return this.ID;
  }
}
