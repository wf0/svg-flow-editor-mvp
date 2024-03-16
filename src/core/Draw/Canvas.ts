import { waterMarkText as defaultWaterMarkText } from "../Config/index.ts";
import { hex, keyword } from "color-convert";
import { Draw } from "./index.ts";

// canvas 相关绘制类
export class CanvasDraw {
  private canvas!: HTMLCanvasElement;
  private draw: Draw;
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * 初始化 canvas
   * @param width canvas 宽度
   * @param height canvas 高度
   * @returns
   */
  public initCanvas(width: number, height: number) {
    // 2. 创建 canvas
    const canvas = this.draw.createHTMLElement("canvas") as HTMLCanvasElement;
    // 3. 标记唯一属性id
    canvas.classList.add("sf-editor-box-canvas");
    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    return canvas;
  }

  /**
   * 绘制网格线
   * @param color 支持 rgb hsl hex
   * @returns
   */
  public gridLine(color?: string) {
    if (!this.canvas) return;

    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    // 定义画布大小和单位长度（每条水平或垂直线所表示的像素数）
    const { height, width } = this.canvas;

    var unitLength = 20; // 每条线段间隔 20px

    // 计算行列数量
    var rowCount = Math.floor(height / unitLength);

    var columnCount = Math.floor(width / unitLength);

    // 进行颜色转换
    var covercolor = "211, 211, 211";

    if (color) covercolor = this.handleColor(color);

    // 绘制水平线
    for (let i = 0; i <= rowCount; i++) {
      var y = i * unitLength;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(${covercolor}, ${i % 5 ? "0.4" : "1"})`; // 设置线条颜色
      ctx.stroke();
    }

    // 绘制垂直线
    for (let j = 0; j <= columnCount; j++) {
      var x = j * unitLength;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = `rgba(${covercolor}, ${j % 5 ? "0.4" : "1"})`; // 设置线条颜色
      ctx.stroke();
    }
  }

  /**
   * 网格背景-小圆点
   */
  public origin(color?: string) {
    if (!this.canvas) return;

    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    // 进行颜色转换
    var covercolor = "211, 211, 211";

    if (color) covercolor = this.handleColor(color);

    const { height, width } = this.canvas;

    var unitLength = 20; // 每条线段间隔 20px

    for (let i = 0; i < width; i = i + unitLength) {
      for (let j = 0; j < height; j = j + unitLength) {
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${covercolor})`;
        ctx.arc(i, j, 1, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }

  /**
   * 绘制水印
   * @param text 水印文本
   * @param color 水印颜色
   * @returns
   */
  public waterMark(waterMarkText?: string, color?: string) {
    if (!this.canvas) return;
    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    const text = waterMarkText || defaultWaterMarkText;

    // 定义画布大小和单位长度（每条水平或垂直线所表示的像素数）
    const { height, width } = this.canvas;

    // 重置字体大小，不然会出现第一个与第二次测量的字体宽度不一致问题
    ctx.font = "10px sans-serif";

    // 16 => 80  w=> x  x=80*()/16
    const defaultWidth = ctx.measureText(text).width;

    var covercolor = "211, 211, 211";

    if (color) covercolor = this.handleColor(color);

    var unitLength = (80 * defaultWidth) / 20;

    // 计算行列数量 -100 开始是为了铺满整个屏幕
    for (let i = -100; i < width; i = i + unitLength) {
      for (let j = 0; j < height; j = j + unitLength) {
        ctx.font = "48px serif";
        ctx.fillStyle = `rgba(${covercolor}, 0.3)`;
        // 设置旋转中心  不以 0 0 旋转
        ctx.translate(i, j);
        ctx.rotate(-(Math.PI / 180) * 45); // rotate
        ctx.fillText(text, i, j);
        ctx.rotate((Math.PI / 180) * 45); // rotate
        ctx.translate(-i, -j);
      }
    }
  }

  /**
   * 颜色转换-在处理水印 网格的颜色中，支持 rgb hsl hex 等颜色类型，均需要转换为 rgb 的形式
   * @param color
   * @returns
   */
  private handleColor(color: string) {
    var result = "";
    // 传入了参数要进行颜色类型转换
    if (color.includes("#")) {
      result = hex.rgb(color.replace("#", "")).toString().replace(/\[|\]/g, "");
    } else if (color.includes("hsl")) {
      // 暂未实现
    } else if (color.includes("rgb")) {
      result = color.replace(/rgb|\(|\)/g, "");
    } else
      result = keyword
        // @ts-ignore
        .rgb(color)
        .toString()
        .replace(/"\["|"\]"/g, "");
    return result;
  }

  /**
   * 清空整个画布  ctx.clearRect(0, 0, width, height);
   */
  public clearCanvas() {
    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const { height, width } = this.canvas;
    ctx.clearRect(0, 0, width, height);
  }
}
