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
      // 左上右下 键盘的可见顺序
      {
        key: KeyMap["Left"],
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Up"],
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Right"],
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Down"],
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Left"],
        ctrl: true,
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Up"],
        ctrl: true,
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Right"],
        ctrl: true,
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Down"],
        ctrl: true,
        callback: this.graphMoveHandle.bind(this),
      },
      {
        key: KeyMap["Backspace"], // backspace 删除键
        callback: this.deleteGraph.bind(this),
      },
      {
        key: KeyMap["Delete"], // Delete 删除键
        callback: this.deleteGraph.bind(this),
      },
      {
        key: KeyMap["C"], // Ctrl C
        ctrl: true,
        callback: this.copy.bind(this),
      },
      {
        key: KeyMap["V"], // Ctrl V
        ctrl: true,
        callback: this.paste.bind(this),
      },
      {
        key: KeyMap["X"], // Ctrl X
        ctrl: true,
        callback: this.cut.bind(this),
      },
      {
        key: KeyMap["P"], // Ctrl P
        ctrl: true,
        callback: this.print.bind(this),
      },
      {
        key: KeyMap["Z"], // Ctrl Z
        ctrl: true,
      },
      {
        key: KeyMap["Y"], // Ctrl Y
        ctrl: true,
      },
    ];
  }

  /**
   * graph move 使用 上下左右实现元件的移动
   */
  private graphMoveHandle() {}

  /**
   * 实现删除元件
   */
  private deleteGraph() {
    // 执行回调
    nextTick(() => {
      console.log("## 删除元件");
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const nums = this.draw.getGraphDraw().getNodesNumber();
      // 同步 footer number 元件数量
      const footerBox = this.draw
        .getRoot()
        .querySelector('[class="sf-editor-footer"]');
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
   * 复制粘贴元件 - 实现思路
   *  1. 复制的时候，将元件信息放置到粘贴板上
   *  2. 粘贴的时候，从粘贴板获取数据，并进行创建
   */
  private copy() {
    console.log("copy");
  }

  private paste() {
    console.log("paste");
  }

  private cut() {
    console.log("cut");
  }

  /**
   * 打印
   */
  private print() {}

  /**
   * keydown handle 用于实现系统级快捷键 用户快捷键
   * @param e
   */
  public keydownHandle(evt: KeyboardEvent) {
    // 处理事件
    nextTick(() => {
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
    });

    // 阻止默认事件
    evt.stopPropagation();
    evt.preventDefault();
  }
}
