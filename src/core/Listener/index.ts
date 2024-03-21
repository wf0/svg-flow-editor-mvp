// 事件监听
import { EventType } from "../../interface/Event/index.ts";
// 实现SFEditor listener 事件监听，该类型参数与 event Bus 保持一致！
export class Listener {
  public destroyed: EventType | null;
  public graphResized: EventType | null;
  public loaded: EventType | null;
  public graphNumberChanged: EventType | null;
  public pageScale: EventType | null;

  constructor() {
    this.loaded = null; // 编辑器加载完成
    this.destroyed = null; // 销毁完成
    this.graphResized = null; // 重置大小
    this.graphNumberChanged = null; // 元件数量变化
    this.pageScale = null; // 页面缩放
  }
}
