// @ts-ignore
import * as echarts from "echarts";
import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";
import { messageInfo } from "../Config/index.ts";
import { EventBus } from "../Event/EventBus.ts";
import { EchartEventMap } from "../../interface/Event/index.ts";
const ob = (fn: ResizeObserverCallback) => new ResizeObserver(fn);

export class GEchart extends GraphCommon {
  private div: HTMLDivElement;
  private myChart: any;
  private option: {}; // 对象引用，地址相同，不需要重新传递
  public event: EventBus<EchartEventMap>;

  constructor(draw: Draw, option: object) {
    super(draw);
    this.event = new EventBus();

    this.div = draw.createHTMLElement("div") as HTMLDivElement;

    this.option = option;

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, 300);
    super.setHeight.call(this, 150);

    this.myChart = echarts.init(this.div);
    this.myChart.off("click"); // 图表渲染前销毁点击事件,防止点击图标多次触发
    this.myChart.off("mouseout"); // 图表渲染前销毁点击事件,防止点击图标多次触发
    this.myChart.off("mouseover"); // 图表渲染前销毁点击事件,防止点击图标多次触发

    // Echarts click
    this.myChart.on("click", (params: object) =>
      this.event.emit("click", params)
    );

    // Echarts 鼠标移出
    this.myChart.on("mouseout", (params: object) =>
      this.event.emit("mouseout", params)
    );

    // Echarts 鼠标移入
    this.myChart.on("mouseover", (params: object) =>
      this.event.emit("mouseover", params)
    );

    this.setOption();

    // 监听元素尺寸变化，重新渲染echart 使得宽高自适应
    ob(() => this.myChart.resize()).observe(this.div);
  }

  /**
   * 获取 Element
   * @returns
   */
  public getElement() {
    return this.div;
  }

  /**
   * 获取当前的 option
   * @returns
   */
  public getOption() {
    return this.option;
  }

  /**
   * 需要向外暴露 setOption 方法,供数据变化后重新渲染
   * @param option
   */
  public setOption(option?: object) {
    if (!this.option) throw new Error(messageInfo.optionError);
    option && (this.option = option);
    this.myChart.setOption(this.option);
    return this;
  }
}
