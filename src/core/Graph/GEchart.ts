// @ts-ignore
import * as echarts from "echarts";
import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";
import elementResizeDetectorMaker from "element-resize-detector";
import { messageInfo } from "../Config/index.ts";
var erd = elementResizeDetectorMaker();

export class GEchart extends GraphCommon {
  private div: HTMLDivElement;
  private myChart: any;
  private option: {}; // 对象引用，地址相同，不需要重新传递

  constructor(draw: Draw, option: object) {
    super(draw);
    this.div = draw.createHTMLElement("div") as HTMLDivElement;

    this.option = option;

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);

    // 设置宽高
    super.setWidth.call(this, 300);
    super.setHeight.call(this, 150);

    this.myChart = echarts.init(this.div);

    this.myChart.on("click", () => {
      console.log("echart click");
    });

    this.setOption();

    // 监听元素尺寸变化，重新渲染echart 使得宽高自适应
    erd.listenTo(this.div, () => this.myChart.resize());
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

  /**
   * 向外提供 update 方法，供用户在 option 变化后更新页面内容
   *  因 option 是引用地址，因此 可以不需要传递参数，从而实现数据更新
   * @returns
   */
  public update() {
    return this.setOption();
  }
}
