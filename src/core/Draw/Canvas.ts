import { waterMarkText as defaultWaterMarkText } from "../Config/index.ts";
import { hex, keyword } from "color-convert";
import { Draw } from "./index.ts";
import pako from "pako"; // imageData 的解压缩

// canvas 相关绘制类
export class CanvasDraw {
  private canvas!: HTMLCanvasElement;
  private draw: Draw;
  private imageData!: Uint8Array | null; // canvas 像素数据，用于实现重置及绘制辅助线

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

    if (color) covercolor = this.colorHandle(color);

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

    if (color) covercolor = this.colorHandle(color);

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

    if (color) covercolor = this.colorHandle(color);

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
  private colorHandle(color: string) {
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
   * 绘制 辅助线
   * @param payload
   * @returns
   */
  public drawAuxiliaryLine(payload: { num: number; type: string }[]) {
    if (!this.canvas) return;
    this.unDrawAuxiliaryLine();
    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const { width, height } = this.canvas;

    // 1. 绘制之前一定先保存数据，才能实现恢复
    const imageData = ctx.getImageData(0, 0, width, height);
    this.imageData = pako.deflate(new Uint8Array(imageData.data)); // 压缩，减小存储开销
    // 2. 开始绘制
    payload.forEach(({ num, type }) => {
      const p = num + 10; // 注意 padding 距离
      ctx.beginPath();
      // 定义虚线模式：[线段长度, 间隔长度]
      ctx.setLineDash([10, 10]);
      type === "h" ? ctx.moveTo(0, p) : ctx.moveTo(p, 0);
      type === "h" ? ctx.lineTo(width, p) : ctx.lineTo(p, height);
      ctx.strokeStyle = `rgb(79, 130, 232)`; // 设置线条颜色
      ctx.stroke();
    });
  }

  // 取消绘制
  public unDrawAuxiliaryLine() {
    try {
      if (!this.canvas || !this.imageData) return;
      var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      const { width, height } = this.canvas;
      const decompressed = pako.inflate(this.imageData);
      const uint8ClampedArray = new Uint8ClampedArray(decompressed);
      const imageData = new ImageData(uint8ClampedArray, width, height);
      ctx.putImageData(imageData, 0, 0);
      this.imageData = null;
    } catch (error) {
      this.imageData = null;
    }
  }

  /**
   * 清空整个画布  ctx.clearRect(0, 0, width, height);
   */
  public clearCanvas() {
    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const { height, width } = this.canvas;
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * 重置数据
   */
  public resetCanvas() {
    // 1. 获取当前的数据
    var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const { width, height } = this.canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    this.imageData = pako.deflate(new Uint8Array(imageData.data)); // 压缩，减小存储开销

    // 2. 清空 canvas 内容
    this.clearCanvas();

    // 3. 重置 canvas 宽高
    const editorBox = this.draw.getEditorBox();
    const { clientWidth, clientHeight } = editorBox;
    const canvas = editorBox.querySelector("canvas") as HTMLCanvasElement;
    canvas.setAttribute("width", clientWidth.toString());
    canvas.setAttribute("height", clientHeight.toString());

    // 4. 重置 canvas 信息
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    // 5. 重新绘制之前的数据
    const decompressed = pako.inflate(this.imageData);
    const uint8ClampedArray = new Uint8ClampedArray(decompressed);
    const old = new ImageData(uint8ClampedArray, width, height);
    ctx.putImageData(old, 0, 0);
    this.imageData = null;
  }

  /**
   * 销毁 canvas
   */
  public removeCanvas() {
    this.canvas.remove();
  }
}
