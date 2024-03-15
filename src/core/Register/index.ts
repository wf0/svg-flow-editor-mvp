// 事件注册

import { IContextmenu, IShortCut } from "../../interface/Event/index.ts";

export class Register {
  public contextMenuList: IContextmenu[]; // 右键菜单
  public shortcutList: IShortCut[]; // 快捷键

  // 执行两件事 contextmenuList shortCutList
  constructor() {
    this.contextMenuList = [];
    this.shortcutList = [];
  }
}
