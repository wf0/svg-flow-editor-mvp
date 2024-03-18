// 事件监听
import { EventType } from "../../interface/Event/index.ts";
export class Listener {
  // 实现SFEditor listener 事件监听，该类型参数与 event Bus 保持一致！
  public destroyed: EventType | null;
  public resized: EventType | null;
  public loaded: EventType | null;
  public moved: EventType | null;

  constructor() {
    // 编辑器加载完成
    this.loaded = null;
    // 销毁完成
    this.destroyed = null;
    // 重置大小
    this.resized = null;
    // 移动位置
    this.moved = null;
  }
}
