// 快捷键相关操作

import { IShortCut, KeyMap } from "../../../interface/Event/index.ts";
import { isMod, nextTick } from "../../../utils/index.ts";
import { Draw } from "../../Draw/index.ts";

export class RegisterEvent {
  private draw: Draw;
  private defaultEvent!: IShortCut[];

  constructor(draw: Draw) {
    this.draw = draw;
    // 初始化默认事件
    this.defaultEvent = [
      {
        key: KeyMap["P"],
        callback: () => {
          console.log("默认事件");
        },
      },
    ];
  }
  /**
   * keydown handle 用于实现系统级快捷键
   * @param e
   */
  public keydownHandle(e: KeyboardEvent) {
    // 处理事件
    nextTick(() => this._executeEvent(e));

    // 阻止默认事件
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 处理事件机制： 统一处理用户事件及默认事件
   * @param evt
   */
  private _executeEvent(evt: KeyboardEvent) {
    // 共同实现 用户与默认事件
    const userList = this.draw.getRegister().shortcutList;
    const eventList = [...this.defaultEvent, ...userList];
    // 批量处理多次事件
    const comEvent = eventList.filter(
      (i) =>
        (i.mod
          ? isMod(evt) === !!i.mod
          : evt.ctrlKey === !!i.ctrl && evt.metaKey === !!i.meta) &&
        evt.shiftKey === !!i.shift &&
        evt.altKey === !!i.alt &&
        evt.key === i.key
    );
    comEvent.length &&
      comEvent.forEach((i) =>
        i?.callback?.({
          tips: "参数仅供默认事件处理函数使用,无实际含义!",
          ctrl: evt.ctrlKey,
          shift: evt.shiftKey,
          key: evt.key,
        })
      );
  }
}
