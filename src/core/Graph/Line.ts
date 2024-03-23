// 直角折线 https://site.logic-flow.cn/article/article03#%E7%9B%B4%E8%A7%92%E6%8A%98%E7%BA%BF

import { nanoid } from "nanoid";
import { Draw } from "../Draw/index.ts";
import { Graph } from "./index.ts";

const OFFSET = 50; // 定义折线的偏移量

type line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startID?: string;
  startType?: string;
  endID?: string;
  endType?: string;
};

type graphInfo = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export class Line {
  private ID: string;
  private line: SVGPolylineElement;
  private draw: Draw;
  private lineBox: HTMLDivElement;

  constructor(draw: Draw, sx: number, sy: number) {
    this.ID = nanoid();
    this.draw = draw;

    this.line = draw.createSVGElement("polyline") as SVGPolylineElement;
    this.line.setAttribute("fill", "transparent");
    this.line.setAttribute("stroke", "black");
    this.line.setAttribute("stroke-dasharray", "5,5");
    this.line.setAttribute("stroke-width", "2");

    // 1. 获取分组
    this.lineBox = draw.getLineDraw().createLineGroup(this, sx, sy);
  }

  /**
   * move 过程中 update 线条位置
   */
  public update(sx: number, sy: number, ex: number, ey: number) {
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
  }

  /**
   * 线条绘制结束
   */
  public drawEnd(st: string, et: string) {
    console.log("### 绘制最终折线，根据框的宽高位置信息获取基础数据");
    const eid = this.line.getAttribute("eid") as string;
    const sid = this.line.getAttribute("sid") as string;
    if (!eid || !st || !et) return this.lineBox.remove();

    // 不然处理折线的寻径算法
    this.line.setAttribute("stroke-dasharray", "");

    // 1. 获取 sid eid 构建 graph
    const Sgraph = new Graph(this.draw, sid);
    const Egraph = new Graph(this.draw, eid);

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

    // 4. 需要知道哪个元件在最后 也就是 graph x 最大
    const maxGrapg = sx > ex ? Sgraph : Egraph;

    // 5. 构建 OFFSET 的矩形 --- 受padding的影响
    const lx = Math.min(sx, ex) - OFFSET + 10;
    const ly = Math.min(sy, ey) - OFFSET + 10;
    this.setX(lx);
    this.setY(ly);
    this.lineBox.style.backgroundColor = "rgba(0,0,0,0.1)";
    // 6. 取消直线
    this.line.setAttribute("points", "");

    // 7. 设置宽高
    const mw = maxGrapg.getWidth();
    const mh = maxGrapg.getHeight();
    const mx = maxGrapg.getX();
    const my = maxGrapg.getY();

    // 自此，整个线的宽高= lx -> mx + mw + OFFSET
    const lw = mx - lx + mw + OFFSET + 10;
    const lh = my - ly + mh + OFFSET + 10;
    this.setWidth(lw);
    this.setHeight(lh);

    // 点的坐标是以div为基准！不是以画布宽高！
    var points = [];

    const typeMap: {
      [key: string]: (p: graphInfo) => {
        ox: number;
        oy: number;
        x: number;
        y: number;
      };
    } = {
      "0": (p: graphInfo) => ({
        ox: p.x - OFFSET,
        oy: p.y + p.h / 2,
        x: p.x,
        y: p.y + p.h / 2,
      }),
      "1": (p: graphInfo) => ({
        ox: p.x + p.w / 2,
        oy: p.y - OFFSET,
        x: p.x + p.w / 2,
        y: p.y,
      }),
      "2": (p: graphInfo) => ({
        ox: p.x + p.w + OFFSET,
        oy: p.y + p.h / 2,
        x: p.x + p.w,
        y: p.y + p.h / 2,
      }),
      "3": (p: graphInfo) => ({
        ox: p.x + p.w / 2,
        oy: p.y + p.h + OFFSET,
        x: p.x + p.w / 2,
        y: p.y + p.h,
      }),
    };

    // 8. 计算点坐标
    console.log("## 开始计算点的坐标", st, et);
    // 左上角的点
    points.push({ x: 0, y: 0 });

    // 右上
    points.push({ x: 0 + lw, y: 0 });

    // 右下
    points.push({ x: 0 + lw, y: 0 + lh });

    // 左下
    points.push({ x: 0, y: 0 + lh });

    // 起点 st start point
    const sp = typeMap[st]({ x: sx, y: sy, w: sw, h: sh });
    points.push({ x: sp.x - lx + 10, y: sp.y - ly + 10 });
    // 起点 向外 offset
    const so = { x: sp.ox - lx + 10, y: sp.oy - ly + 10 };
    points.push(so);
    // 向外延申的点到边上的距离
    points.push({ x: 0, y: sp.oy - ly + 10 });
    points.push({ x: sp.ox - lx + 10, y: 0 });
    points.push({ x: lw, y: sp.oy - ly + 10 });
    points.push({ x: sp.ox - lx + 10, y: lh });

    // 终点 et
    const ep = typeMap[et]({ x: ex, y: ey, w: ew, h: eh });
    points.push({ x: ep.x - lx + 10, y: ep.y - ly + 10 });
    // 终点向外延申
    const eo = { x: ep.ox - lx + 10, y: ep.oy - ly + 10 };
    points.push(eo);
    // 向外延申的点到边上的距离
    points.push({ x: 0, y: ep.oy - ly + 10 });
    points.push({ x: lw, y: ep.oy - ly + 10 });
    points.push({ x: ep.ox - lx + 10, y: 0 });
    points.push({ x: ep.ox - lx + 10, y: lh });

    // 两个延伸点的中点
    const diffX = Math.abs(so.x - eo.x);
    const diffY = Math.abs(so.y - eo.y);
    const minX = Math.min(so.x, eo.x);
    const minY = Math.min(so.y, eo.y);
    points.push({ x: minX + diffX / 2, y: minY + diffY / 2 });

    // 中点的延伸点
    points.push({ x: 0, y: minY + diffY / 2 });
    points.push({ x: minX + diffX / 2, y: 0 });
    points.push({ x: lw, y: minY + diffY / 2 });
    points.push({ x: minX + diffX / 2, y: lh });

    // 绘制点
    points.forEach(({ x, y }) => {
      const rect = this.draw.createSVGElement("circle");
      rect.setAttribute("fill", "red");
      rect.setAttribute("r", "8");
      rect.setAttribute("cx", x.toString());
      rect.setAttribute("cy", y.toString());
      this.lineBox.querySelector("svg")?.appendChild(rect);
    });
  }

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
