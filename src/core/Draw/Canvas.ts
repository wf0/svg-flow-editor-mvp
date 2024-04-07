import { waterMarkText as defaultWaterMarkText } from "../Config/index.ts";
import { hex, keyword } from "color-convert";
import { Draw } from "./index.ts";
import pako from "pako"; // imageData 的解压缩
import { IBackground } from "../../interface/Draw/index.ts";
import html2canvas from "html2canvas";
import { nextTick, toBlob } from "../../utils/index.ts";
import { Graph } from "../Graph/index.ts";

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
    const text = waterMarkText || defaultWaterMarkText;

    this.background.watermark = true;
    this.background.watermarkColor = color;
    this.background.watermarkText = text;

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
   * 利用 html2canvas 截图
   *  1. ignoreElements 处理截图慢问题: (element) => false 与 root 进行位置比较
   *  2. x y width height 处理最佳宽高，不出现大量空白
   *  3. proxy、useCORS、allowTaint 处理跨域图片问题
   *  4. backgroundColor 支持透明、白色背景（设置null为透明）
   * @param filetype 保存的文件类型，支持 png svg jpg json
   */
  public async screenShot(filetype?: string) {
    this.draw.getEditorEvent().clickHandle();

    await nextTick();

    const box = this.draw.getEditorBox();

    this.draw.showLoading();
    // 处理x y height width - 相对于 editor box 的位置关系
    var minx = 0;
    var miny = 0;
    var maxx = 0;
    var maxy = 0;
    // 获取 editor box 的宽高
    const graphlist = this.draw.getGraphEvent().getAllGraphMain();
    if (graphlist.length) {
      const firstGraph = new Graph(
        this.draw,
        graphlist[0].getAttribute("graphid") as string
      );
      minx = firstGraph.getX();
      miny = firstGraph.getY();

      graphlist.forEach((item) => {
        // 需要得到最小和最大位置的graph
        const nodeID = item.getAttribute("graphid") as string;
        const graph = new Graph(this.draw, nodeID);
        minx = Math.min(minx, graph.getX());
        miny = Math.min(miny, graph.getY());
        maxx = Math.max(maxx, graph.getX() + graph.getWidth() + 20);
        maxy = Math.max(maxy, graph.getY() + graph.getHeight() + 20);
      });
    }

    const option = {
      x: minx,
      y: miny,
      width: maxx - minx,
      height: maxy - miny,
      ignoreElements: (ele: HTMLElement) => {
        // this.editorBox compareDocumentPosition
        // 1： 没有关系，这两个节点不属于同一个文档
        // 2： 第一节点（P1）位于第二个节点后（P2）
        // 4： 第一节点（P1）定位在第二节点（P2）前
        // 8： 第一节点（P1）位于第二节点内（P2）
        // 16：第二节点（P2）位于第一节点内（P1）
        // 还可能是上诉值的和！返回 20 意味着在 p2 在 p1 内部（16），并且 p1 在 p2 之前（4）
        const index = box.compareDocumentPosition(ele);
        if ([1, 2, 4].includes(index)) return false;
      },
    };

    // @ts-ignore
    const canvas = await html2canvas(this.draw.getEditorBox(), option);
    // base64 使用服务器存储方案  const base64 = canvas.toDataURL("image/png");

    canvas.toBlob((b: File) => {
      const url = toBlob(b, "image/png") as string;
      const a = this.draw.createHTMLElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", `SFEditor.${filetype}`);
      this.draw.hideLoading();
      // window.open(url);
      a.click(); // 触发下载
      a.remove();
    });
  }

  /**
   * 销毁 canvas
   */
  public removeCanvas() {
    this.canvas.remove();
  }
}
