import { waterMarkText as defaultWaterMarkText } from "../Config/index.ts";
import { hex, keyword } from "color-convert";
import { Draw } from "./index.ts";
import pako from "pako"; // imageData 的解压缩
import { IBackground } from "../../interface/Draw/index.ts";

// canvas 相关绘制类
export class CanvasDraw {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private draw: Draw;
  private imageData!: Uint8Array | null; // canvas 像素数据，用于实现重置及绘制辅助线
  // 需要在这里实现用户background的信息记录，才可以实现重绘后完整复原用户配置
  private background: IBackground;

  constructor(draw: Draw) {
    this.draw = draw;

    // 记录参数
    this.background = {
      origin: false,
      originColor: "",
      watermark: false,
      watermarkColor: "",
      watermarkText: "",
      gridline: false,
      gridlineColor: "",
    };
  }

  /**
   * 初始化 canvas
   * @param width canvas 宽度
   * @param height canvas 高度
   * @returns
   */
  public initCanvas(width: number, height: number) {
    // 1. 创建 canvas
    const canvas = this.draw.createHTMLElement("canvas") as HTMLCanvasElement;

    // 2. 创建上下文对象- 并标记会频繁操作
    this.ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;

    // 3. 标记唯一属性id
    canvas.classList.add("sf-editor-box-canvas");
    this.canvas = canvas;
    this.canvas.style.backgroundColor = "var(--background)";

    // 4. 设置宽高
    this.canvas.width = width;
    this.canvas.height = height;

    return canvas;
  }

  /**
   * 设置 canvas 宽高
   * @param width
   * @param height
   */

  /**
   * 绘制网格线
   * @param color 支持 rgb hsl hex
   * @returns
   */
  public gridLine(color?: string) {
    if (!this.canvas || !this.ctx) return;

    this.background.gridline = true;
    this.background.gridlineColor = color;

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
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.strokeStyle = `rgba(${covercolor}, ${i % 5 ? "0.4" : "1"})`; // 设置线条颜色
      this.ctx.stroke();
    }

    // 绘制垂直线
    for (let j = 0; j <= columnCount; j++) {
      var x = j * unitLength;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.strokeStyle = `rgba(${covercolor}, ${j % 5 ? "0.4" : "1"})`; // 设置线条颜色
      this.ctx.stroke();
    }
  }

  /**
   * 网格背景-小圆点
   */
  public origin(color?: string) {
    if (!this.canvas || !this.ctx) return;

    this.background.origin = true;
    this.background.originColor = color;

    // 进行颜色转换
    var covercolor = "211, 211, 211";

    if (color) covercolor = this.colorHandle(color);

    const { height, width } = this.canvas;

    var unitLength = 20; // 每条线段间隔 20px

    for (let i = 0; i < width; i = i + unitLength) {
      for (let j = 0; j < height; j = j + unitLength) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgb(${covercolor})`;
        this.ctx.arc(i, j, 1, 0, 2 * Math.PI);
        this.ctx.stroke();
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
    if (!this.canvas || !this.ctx) return;

    this.background.watermark = true;
    this.background.watermarkColor = color;
    this.background.watermarkText = waterMarkText;

    const text = waterMarkText || defaultWaterMarkText;

    // 定义画布大小和单位长度（每条水平或垂直线所表示的像素数）
    const { height, width } = this.canvas;

    // 重置字体大小，不然会出现第一个与第二次测量的字体宽度不一致问题
    this.ctx.font = "10px sans-serif";

    // 16 => 80  w=> x  x=80*()/16
    const defaultWidth = this.ctx.measureText(text).width;

    var covercolor = "211, 211, 211";

    if (color) covercolor = this.colorHandle(color);

    var unitLength = (80 * defaultWidth) / 20;

    // 计算行列数量 -100 开始是为了铺满整个屏幕
    for (let i = -100; i < width; i = i + unitLength) {
      for (let j = 0; j < height; j = j + unitLength) {
        this.ctx.font = "48px serif";
        this.ctx.fillStyle = `rgba(${covercolor}, 0.3)`;
        // 设置旋转中心  不以 0 0 旋转
        this.ctx.translate(i, j);
        this.ctx.rotate(-(Math.PI / 180) * 45); // rotate
        this.ctx.fillText(text, i, j);
        this.ctx.rotate((Math.PI / 180) * 45); // rotate
        this.ctx.translate(-i, -j);
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
    if (!this.canvas || !this.ctx) return;
    this.unDrawAuxiliaryLine();
    const { width, height } = this.canvas;

    // 1. 绘制之前一定先保存数据，才能实现恢复
    const imageData = this.ctx.getImageData(0, 0, width, height);
    this.imageData = pako.deflate(new Uint8Array(imageData.data)); // 压缩，减小存储开销
    // 2. 开始绘制
    payload.forEach(({ num, type }) => {
      const p = num + 10; // 注意 padding 距离
      this.ctx.beginPath();
      // 定义虚线模式：[线段长度, 间隔长度]
      this.ctx.setLineDash([10, 10]);
      type === "h" ? this.ctx.moveTo(0, p) : this.ctx.moveTo(p, 0);
      type === "h" ? this.ctx.lineTo(width, p) : this.ctx.lineTo(p, height);
      this.ctx.strokeStyle = `rgb(79, 130, 232)`; // 设置线条颜色
      this.ctx.stroke();
    });
  }

  // 取消绘制
  public unDrawAuxiliaryLine() {
    try {
      if (!this.canvas || !this.imageData || !this.ctx) return;
      const { width, height } = this.canvas;
      const decompressed = pako.inflate(this.imageData);
      const uint8ClampedArray = new Uint8ClampedArray(decompressed);
      const imageData = new ImageData(uint8ClampedArray, width, height);
      this.ctx.putImageData(imageData, 0, 0);
      this.imageData = null;
    } catch (error) {
      this.imageData = null;
    }
  }

  /**
   * 清空整个画布  ctx.clearRect(0, 0, width, height);
   */
  public clearCanvas() {
    const { height, width } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  /**
   * 重置数据
   */
  public resetCanvas() {
    // // 1. 清空画布
    this.clearCanvas();

    // 2. 重置 canvas 宽高
    const editorBox = this.draw.getEditorBox();
    const { clientWidth, clientHeight } = editorBox;

    // 设置宽高
    this.canvas.width = clientWidth;
    this.canvas.height = clientHeight;

    // 3. 重绘
    this.background.gridline && this.gridLine(this.background.gridlineColor);
    this.background.watermark &&
      this.waterMark(
        this.background.watermarkText,
        this.background.watermarkColor
      );
    this.background.origin && this.origin(this.background.originColor);
  }

  // 供顶部菜单展开时，决定显示谁已经勾选
  public getBackground = () => this.background;

  /**
   * 销毁 canvas
   */
  public removeCanvas() {
    this.canvas.remove();
  }
}
