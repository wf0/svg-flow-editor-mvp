import { Draw } from "../Draw/index.ts";

// Command Adapt API 操作核心库
export class CommandAdapt {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  public background() {
    console.log(this.draw);
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
}
