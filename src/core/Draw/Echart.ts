import { IGraph } from "../../interface/Graph/index.ts";
import { lineOption } from "../Config/index.ts";
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
  public updateOption(graph: GEchart) {
    // 1. 创建抽屉
    const div = this.draw.createHTMLElement("div") as HTMLDivElement;
    div.classList.add("sf-editor-dialog");
    div.innerHTML = echartUpdateTemp;
    this.draw.getRoot().appendChild(div);

    // 2. 添加关闭事件
    const close = div.querySelector('i[class="iconfont icon-guanbiclose"]');
    close?.addEventListener("click", () => div.remove());

    // 3. 解析当前的 option
    const opt = graph.getOption();

    // 确认按钮

    // 取消按钮
    // graph.setOption(lineOption);
  }
}
