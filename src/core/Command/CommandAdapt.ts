import { IBackground } from "../../interface/Draw/index.ts";
import { IGraph, node } from "../../interface/Graph/index.ts";
import { IThemeOpt, setTheme } from "../../utils/index.ts";
import { Draw } from "../Draw/index.ts";
import { Ellipse } from "../Graph/Ellipse.ts";
import { SVGImage } from "../Graph/Image.ts";
import { Rect } from "../Graph/Rect.ts";

// Command Adapt API 操作核心库
export class CommandAdapt {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * 设置canvas 属性 【水印、圆点、网格线】- 背景颜色不在这设置，background 属性属于 theme 主题类
   * @param payload
   * @returns
   */
  public background(payload?: IBackground) {
    // 1. 如果没有传任何参数，则表示关闭网格 关闭水印
    const canvas = this.draw.getCanvasDraw();
    canvas.clearCanvas();
    if (!payload) return;

    // 解析参数
    const { origin, originColor } = payload;
    const { gridline, gridlineColor } = payload;
    const { watermark, watermarkColor, watermarkText } = payload;

    // 2. 不然根据参数决定渲染
    // 网格背景与小圆点背景互斥
    if (gridline || gridlineColor) canvas.gridLine(gridlineColor);
    else if (origin || originColor) canvas.origin(originColor);

    // 水印则是独立存在
    if (watermark || watermarkColor || watermarkText)
      canvas.waterMark(watermarkText, watermarkColor);
  }

  /**
   * 添加元件 入参是元件的基本信息
   * @param payload
   */
  public addGraph(payload: node): IGraph {
    // 解析参数
    const { type, nodeID, width, height } = payload;
    const { x, y, stroke, fill, text, rotate, url } = payload;

    // 1. 根据 type 先构建出元件
    const graphMap: { [key: string]: () => IGraph } = {
      rect: () => new Rect(this.draw, width, height),
      ellipse: () => new Ellipse(this.draw, width, height),
      image: () => new SVGImage(this.draw, url as string),
    };

    const graph = graphMap[type as string]();

    // 如果属性存在，则手动设置属性
    nodeID && graph.setID(nodeID);
    x && graph.setX(x);
    y && graph.setY(y);
    rotate && graph.setRotate(rotate);
    stroke && graph.setStroke(stroke);
    fill && graph.setFill(fill);
    text && graph.setText(text);

    // 返回元件 供链式调用
    return graph;
  }

  // 页面缩放
  public pageScaleRecovery() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Recovery");
  }

  public pageScaleMinus() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Minus");
  }

  public pageScaleAdd() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Add");
  }

  // 设置指定值
  public setPageScale(scale: number) {
    if (!scale || typeof scale !== "number") return;
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Appoint", scale);
  }

  // 全屏
  public fullScreen() {
    const root = this.draw.getRoot() as HTMLDivElement;
    root.requestFullscreen && root.requestFullscreen();
    // 回调中处理宽高问题
    const t = setTimeout(() => {
      this.draw.getCanvasDraw().resetCanvas(), clearTimeout(t);
    }, 100);
  }

  public exitFullScreen() {
    try {
      document.exitFullscreen();
      // 回调中处理宽高问题
      const t = setTimeout(() => {
        this.draw.getCanvasDraw().resetCanvas(), clearTimeout(t);
      }, 100);
    } catch (error) {}
  }

  /** 右键菜单事件响应 */
  public paste() {}
  public copy() {}
  public cut() {}
  public undo() {}
  public redo() {}

  // 置于顶层
  public top() {
    const isSelected = this.draw.getGraphEvent().getSelected();
    if (!isSelected) return;
    const allSelected = this.draw.getGraphEvent().getAllGraphMain();

    var zIndexArr: number[] = [];
    allSelected.forEach((div) => zIndexArr.push(~~div.style.zIndex));
    const max = Math.max.apply(Math, zIndexArr);
    const index = ~~isSelected.style.zIndex;
    // 如果自己大于等于最小值，则再减1
    if (index <= max)
      isSelected.style.zIndex =
        index === 1 ? index.toString() : (index + 2).toString();
  }

  // 置于底层
  public bottom() {
    const isSelected = this.draw.getGraphEvent().getSelected();
    if (!isSelected) return;
    const allSelected = this.draw.getGraphEvent().getAllGraphMain();
    var zIndexArr: number[] = [];
    allSelected.forEach((div) => zIndexArr.push(~~div.style.zIndex));
    // 找到数组中最小的
    const min = Math.min.apply(Math, zIndexArr);
    const index = ~~isSelected.style.zIndex;
    // 如果自己大于等于最小值，则再减1
    if (index >= min)
      isSelected.style.zIndex =
        index === 1 ? index.toString() : (index - 2).toString();
  }

  // 上移一层
  public holdup() {
    const isSelected = this.draw.getGraphEvent().getSelected();
    if (!isSelected) return;
    // 获取当前的层级 进行++
    const index = ~~isSelected.style.zIndex;
    isSelected.style.zIndex = (index + 1).toString();
  }

  // 下移一层
  public putdown() {
    const isSelected = this.draw.getGraphEvent().getSelected();
    if (!isSelected) return;
    // 获取当前的层级 进行--
    const index = ~~isSelected.style.zIndex;
    // 不能是 -1 不然就选不到了
    isSelected.style.zIndex =
      index === 1 ? index.toString() : (index - 1).toString();
  }

  public group() {}
  public ungroup() {}

  public setTheme(theme: string | IThemeOpt) {
    if (typeof theme === "string") setTheme(theme);
    // 如果用户传入的是自定义的配置项，则需要动态设置 :root 的颜色值
    else setTheme("colorful_theme1", theme);
    console.warn(
      "【注意】样式有权重之分，如果手动设置了样式，则默认样式可能不生效！"
    );
  }
}
