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
    try {
      const root = this.draw.getRoot();
      root.requestFullscreen();
      // 回调中处理宽高问题
      const t = setTimeout(() => {
        this.draw.getCanvasDraw().resetCanvas(), clearTimeout(t);
      }, 100);
    } catch (error) {}
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
}
