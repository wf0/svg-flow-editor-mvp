import { GEchart } from "../Graph/GEchart.ts";
import { echartUpdateTemp } from "../Template/index.ts";
import { Draw } from "./index.ts";

// 导出 echart 统计图的相关操作类
export class EchartDraw {
  private draw: Draw;
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * 更新统计图配置项
   */
  public updateOption(_graph: GEchart) {
    // 3. 解析当前的 option
    // const opt = graph.getOption();
    // 确认按钮
    // 取消按钮
    // graph.setOption(lineOption);
  }
}
