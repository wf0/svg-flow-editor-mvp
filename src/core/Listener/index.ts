// 事件监听
import { EventType } from "../../interface/Event/index.ts";
export class Listener {
  public editorInited: EventType | null;
  public destroyed: EventType | null;
  public resize: EventType | null;

  constructor() {
    // editor编辑器初始化完成
    this.editorInited = null;
    // 节点重新渲染后：（包括position、attr、size等节点属性变化后）
    this.resize = null;
    // 销毁完成
    this.destroyed = null;
  }
}
