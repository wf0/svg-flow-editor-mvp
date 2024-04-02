import { IBackground, IThemeOpt } from "../../interface/Draw/index.ts";
import { IGraph, IUpdateGraph, node } from "../../interface/Graph/index.ts";
import { nextTick, setTheme } from "../../utils/index.ts";
import {
  barOption,
  lineOption,
  messageInfo,
  pieOption,
} from "../Config/index.ts";
import { Draw } from "../Draw/index.ts";
import { Ellipse } from "../Graph/Ellipse.ts";
import { GEchart } from "../Graph/GEchart.ts";
import { SVGImage } from "../Graph/Image.ts";
import { Graph } from "../Graph/index.ts";
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
    if (gridline) canvas.gridLine(gridlineColor);
    else if (origin) canvas.origin(originColor);

    // 水印则是独立存在
    if (watermark) canvas.waterMark(watermarkText, watermarkColor);
  }

  /**
   * 添加元件 入参是元件的基本信息
   * @param payload
   */
  public addGraph(payload: node): IGraph {
    if (!payload) throw new Error(messageInfo.invalidParams);
    // 解析参数
    const { type, nodeID, width, height } = payload;
    const { x, y, stroke, fill, text, rotate, url } = payload;
    // 宽度或高度是必须的
    if (!width || !height) throw new Error(messageInfo.invalidWH);

    // 1. 根据 type 先构建出元件
    const graphMap: { [key: string]: () => IGraph } = {
      rect: () => new Rect(this.draw, width, height),
      ellipse: () => new Ellipse(this.draw, width / 2, height / 2),
      circle: () => new Ellipse(this.draw, width / 2, height / 2),
      image: () => new SVGImage(this.draw, url as string, width, height),
      line: () => new GEchart(this.draw, lineOption),
      bar: () => new GEchart(this.draw, barOption),
      // radar: () => new GEchart(this.draw, barOption),
      pie: () => new GEchart(this.draw, pieOption),
    };

    const graph = graphMap[type as string] && graphMap[type as string]();

    // 如果属性存在，则手动设置属性
    graph && nodeID && graph.setID(nodeID);
    graph && x && graph.setX(x);
    graph && y && graph.setY(y);
    graph && rotate && graph.setRotate(rotate);
    graph && stroke && graph.setStroke(stroke);
    graph && fill && graph.setFill(fill);
    graph && text && graph.setText(text);

    // 正在添加元件，广播给其他客户端-添加broadcast标志是防止进入死循环
    if (payload.broadcast !== false) {
      const value = { nodeID: graph.getID(), width, height, type, x, y };
      graph.broadcastGraph("addGraph", value);
    }

    // 返回元件 供链式调用
    return graph;
  }

  /**
   * 删除元件
   * @returns
   */
  public deleteGraph() {
    const selected = this.draw.getGraphEvent().getAllSelected();
    if (!selected.length) return;
    selected.forEach((i) => {
      const nodeID = i.getAttribute("graphid") as string;
      const graph = new Graph(this.draw, nodeID);
      // 广播
      graph.broadcastGraph("deleteGraph", { nodeID });
      i.remove();
    });
    // 执行回调
    nextTick(() => {
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const nums = this.draw.getGraphDraw().getNodesNumber();
      // 同步 footer number 元件数量
      const footerBox = this.draw.getRoot().querySelector(".sf-editor-footer");
      // 如果用户加载了 footer 插件，则同步更新数据
      if (footerBox) {
        const number = footerBox.querySelector(
          '[command="nums"]'
        ) as HTMLSpanElement;
        number.innerHTML = nums.toString();
      }
      const graphLoadedSubscribe = eventBus.isSubscribe("graphNumberChanged");
      graphLoadedSubscribe && eventBus.emit("graphNumberChanged", nums);
      listener.graphNumberChanged && listener.graphNumberChanged(nums);
    });
  }

  /**
   * 页面重置
   */
  public pageScaleRecovery() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Recovery");
  }

  /**
   * 页面缩小
   */
  public pageScaleMinus() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Minus");
  }

  /**
   * 页面放大
   */
  public pageScaleAdd() {
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Add");
  }

  /**
   *  设置页面缩放至指定值
   * @param scale 0.4 - 2
   * @returns
   */
  public setPageScale(scale: number) {
    if (!scale || typeof scale !== "number") return;
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.scalePage("Appoint", scale);
  }

  /**
   * 全屏
   */
  public fullScreen() {
    const root = this.draw.getRoot() as HTMLDivElement;
    root.requestFullscreen && root.requestFullscreen();
    // 回调中处理宽高问题
    const t = setTimeout(() => {
      this.draw.getCanvasDraw().resetCanvas(), clearTimeout(t);
    }, 100);
  }

  /**
   * 退出全屏
   */
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
  // 复制粘贴相关操作，使用 Clipboard API 实现 - https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API
  public paste() {
    console.log("commandAdapt - paste");
  }
  public copy() {
    console.log("commandAdapt - copy");
  }
  public cut() {
    console.log("commandAdapt - cut");
  }
  public undo() {
    console.log("commandAdapt - undo");
  }
  public redo() {
    console.log("commandAdapt - redo");
  }

  /**
   * 加粗
   */
  public bold() {
    const selected = this.draw.getGraphEvent().getAllSelected();
    if (!selected.length) return;
    // @ts-ignore需要实现单个元件的用户选择加粗
    const { anchorOffset, focusOffset, baseNode } =
      window.getSelection() as Selection;
    const text =
      baseNode &&
      baseNode.data &&
      baseNode.data.substring(anchorOffset, focusOffset);
    if (text) {
      // 如果用户选择文本存在，则不可能是多选，因此直接取第一个做处理即可
    }
    selected.forEach((item) => {
      const input = item
        .querySelector(".sf-editor-box-graphs-main-contenteditable")
        ?.querySelector("div") as HTMLDivElement;
      // const html = input.innerHTML;
    });
  }

  /**
   * 置于顶层
   * @returns
   */
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

  /**
   * 置于底层
   * @returns
   */
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

  /**
   * 上移一层
   * @returns
   */
  public holdup() {
    const isSelected = this.draw.getGraphEvent().getSelected();
    if (!isSelected) return;
    // 获取当前的层级 进行++
    const index = ~~isSelected.style.zIndex;
    isSelected.style.zIndex = (index + 1).toString();
  }

  /**
   * 下移一层
   * @returns
   */
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

  /**
   * 设置主题
   * @param theme
   */
  public setTheme(theme: string | IThemeOpt) {
    if (typeof theme === "string") setTheme(theme);
    // 如果用户传入的是自定义的配置项，则需要动态设置 :root 的颜色值
    else {
      // 这里应该取得是当前的主题
      const head = document.querySelector("head") as HTMLHeadElement;
      const themeTag = head.querySelector("#colorful_theme");
      const themeName = themeTag?.getAttribute("theme-name") as string;
      setTheme(themeName, theme);
    }
    console.warn(
      "【注意】样式有权重之分，如果手动设置了样式，则默认样式可能不生效！"
    );
  }
  // 顶部菜单功能
  public newFile() {
    console.log("commandAdapt -newFile");
  }
  public rename() {
    console.log("commandAdapt - rename");
  }
  public preview() {
    console.log("commandAdapt - preview");
  }
  public save() {
    console.log("commandAdapt - save");
    // 执行回调 触发 Save 事件
    nextTick(() => {
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const graphLoadedSubscribe = eventBus.isSubscribe("saved");
      graphLoadedSubscribe && eventBus.emit("saved");
      listener.saved && listener.saved();
    });
  }
  public saveas() {
    console.log("commandAdapt - saveas");
  }
  public share() {
    console.log("commandAdapt - share");
  }
  public release() {
    console.log("commandAdapt - release");
  }
  public history() {
    console.log("commandAdapt - history");
  }
  public print() {
    console.log("commandAdapt - print");
  }
  public close() {
    console.log("commandAdapt - close");
    // 执行回调 触发 close 事件
    nextTick(() => {
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const graphLoadedSubscribe = eventBus.isSubscribe("closed");
      graphLoadedSubscribe && eventBus.emit("closed");
      listener.closed && listener.closed();
    });
  }
  public beautify() {
    console.log("commandAdapt - beautify");
  }
  public lock() {
    console.log("commandAdapt - lock");
  }
  public unlock() {
    console.log("commandAdapt - unlock");
  }

  /**
   * 更新元件信息-dialog 中修改元件背景、边框、圆角等
   * @param payload
   * @returns
   */
  public updateGraph(payload: IUpdateGraph) {
    // rx 和 ry 来实现圆角
    const selected = this.draw.getGraphEvent().getAllSelected();
    if (!selected.length) return;
    const { stroke, fill, strokeWidth, radius, dasharray } = payload;
    selected.forEach((item) => {
      const graphid = item.getAttribute("graphid") as string;
      const graph = new Graph(this.draw, graphid);
      radius && graph.setRadius(radius);
      stroke && graph.setStroke(stroke);
      fill && graph.setFill(fill);
      strokeWidth && graph.setStrokeWidth(strokeWidth);
      dasharray &&
        graph.setStrokeDasharray(dasharray === "solid" ? "" : dasharray);
    });
  }

  /**
   * 设置画布大小
   * @param w
   * @param h
   * @returns
   */
  public setPageSize(w: number, h: number) {
    if (!w || !h) return;
    const editorBox = this.draw.getEditorBox();
    editorBox.style.width = w + "px";
    editorBox.style.height = h + "px";
  }

  /**
   * 搜索替换-支持用户传递参数
   * @param keyword
   */
  public searchReplace(keyword?: string) {
    // 1. 获取系统选区，如果有文本被选中，则直接将选中文本放置于搜索框
    // @ts-ignore 获取 Selection 对象 window.getSelection();
    const { anchorOffset, focusOffset, baseNode } =
      window.getSelection() as Selection;
    const userSelected =
      baseNode &&
      baseNode.data &&
      baseNode.data.substring(anchorOffset, focusOffset);
    // 2. 创建 搜索替换框
    this.draw.getDialogDraw().createSearchReplace(userSelected || keyword);
  }

  public searchPre() {
    const dialogDraw = this.draw.getDialogDraw();
    dialogDraw.searchPre();
  }
  public searchNext() {
    const dialogDraw = this.draw.getDialogDraw();
    dialogDraw.searchNext();
  }
  public replace(newWord: string) {
    const dialogDraw = this.draw.getDialogDraw();
    dialogDraw.replace(newWord);
  }
  public replaceAll(newWord: string) {
    const dialogDraw = this.draw.getDialogDraw();
    dialogDraw.replaceAll(newWord);
  }
}
