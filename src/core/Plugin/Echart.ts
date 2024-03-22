import { Draw } from "../Draw/index.ts";
import { GEchart } from "../Graph/GEchart.ts";

// echarts 插件 多一层的原因是构建新的实例
export class SEchart {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * 初始化 Echart
   * @param option
   * @returns
   */
  public init(option: object) {
    return new GEchart(this.draw, option);
  }
}
