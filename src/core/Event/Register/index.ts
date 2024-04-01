// 快捷键相关操作 - 也需要映射到 command API 操作

import { cbParams, IShortCut, KeyMap } from "../../../interface/Event/index.ts";
import { isMod } from "../../../utils/index.ts";
import { Command } from "../../Command/Command.ts";
import { Draw } from "../../Draw/index.ts";
import { Graph } from "../../Graph/index.ts";
import { Line } from "../../Graph/Line.ts";

export class RegisterEvent {
  private draw: Draw;
  private defaultEvent!: IShortCut[];
  private move!: boolean;
  private sx!: number;
  private sy!: number;
  private tx!: number; // 初始 transform
  private ty!: number; // 初始 transform
  private command: Command;

  private _spaceDown: (e: MouseEvent) => void;
  private _spaceMove: (e: MouseEvent) => void;
  private _spaceUp: (e: MouseEvent) => void;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);

    this._spaceDown = this.spaceDown.bind(this);
    this._spaceMove = this.spaceMove.bind(this);
    this._spaceUp = this.spaceUp.bind(this);

    // 左上右下 键盘的可见顺序
    const moveMap = [
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
    ];

    // 复制粘贴剪切相关事件
    const copyMap = [
      {
        key: KeyMap["C"], // Ctrl + C 复制
        ctrl: true,
        callback: this.command.executeCopy,
      },
      {
        key: KeyMap["V"], // Ctrl + V 粘贴
        ctrl: true,
        callback: this.command.executePaste,
      },
      {
        key: KeyMap["X"], // Ctrl + X 剪切
        ctrl: true,
        callback: this.command.executeCut,
      },
    ];

    // 删除相关事件
    const deleteMap = [
      {
        key: KeyMap["Backspace"], // backspace 删除键
        callback: this.command.executeDeleteGraph,
      },
      {
        key: KeyMap["Delete"], // Delete 删除键
        callback: this.command.executeDeleteGraph,
      },
    ];

    // 层级处理

    // 初始化默认事件
    this.defaultEvent = [
      ...moveMap,
      ...copyMap,
      // ...deleteMap,
      {
        key: KeyMap["A"], // Ctrl + A 全选
        ctrl: true,
        callback: this.selected.bind(this),
      },
      {
        key: KeyMap["P"], // Ctrl + P 打印
        ctrl: true,
        callback: this.print.bind(this),
      },
      {
        key: KeyMap["S"], // Ctrl +  S 保存
        ctrl: true,
        callback: this.save.bind(this),
      },
      {
        key: KeyMap["Z"], // Ctrl + Z 撤销 undo
        ctrl: true,
        callback: this.command.executeUndo,
      },
      {
        key: KeyMap["Y"], // Ctrl + Y 重做 redo
        ctrl: true,
        callback: this.command.executeRedo,
      },
      {
        key: KeyMap["Space"], // 空格事件
        callback: this.space.bind(this),
      },
      {
        key: KeyMap["S"], // Ctrl + Shift + S 进行另存为
        callback: this.saveAs.bind(this),
        ctrl: true,
        shift: true,
      },
      {
        key: KeyMap["F"], // Alt + Shift + F 快捷美化
        callback: this.beautify.bind(this),
        ctrl: true,
        shift: true,
      },
      {
        key: KeyMap["F"],
        ctrl: true,
        callback: () => this.command.executeSearchReplace(""),
      },
      {
        key: KeyMap["EQUAL"],
        callback: this.command.executePageScaleAdd,
        ctrl: true,
      },
      {
        key: KeyMap["MINUS"],
        callback: this.command.executePageScaleMinus,
        ctrl: true,
      },
    ];
  }

  /**
   * graph move 使用 上下左右实现元件的移动
   */
  private graphMoveHandle(payload?: cbParams) {
    console.log("graphMoveHandle");
    const selected = this.draw.getGraphEvent().getAllSelected();
    if (!selected.length) return;

    const step = 10,
      minstep = 2,
      rd = payload?.ctrl ? minstep : step; // 移动的距离 ctrl 实现精细移动

    // 实现上下左右移动
    selected.forEach((item) => {
      //  1. 构建 graph
      const nodeID = item.getAttribute("graphid") as string;
      const graph = new Graph(this.draw, nodeID);

      // 2. 获取初始位置
      const x = graph.getX();
      const y = graph.getY();

      // 3. 实现移动
      if (payload?.key == "ArrowLeft") graph.setX(x - rd);
      if (payload?.key == "ArrowUp") graph.setY(y - rd);
      if (payload?.key == "ArrowRight") graph.setX(x + rd);
      if (payload?.key == "ArrowDown") graph.setY(y + rd);

      // 4. 需要显示辅助线-暂未实现
      // 5. 还需要处理 line 的移动更新

      // graphid 可能是线的 sid 也可能是 eid
      var lines: SVGPolygonElement[] = [];
      this.draw
        .getEditorBox()
        .querySelectorAll("polyline")
        .forEach((line) => {
          const sid = line.getAttribute("sid");
          const eid = line.getAttribute("eid");
          if (sid === nodeID || eid === nodeID) lines.push(line);
        });
      // 1. 拿到line对象 - 需要拿到 lineid lineBox
      if (!lines.length) return;
      lines.forEach((line) => {
        const lineid = line.getAttribute("lineid") as string;
        const lineBox = line.parentNode?.parentNode as HTMLDivElement;
        const sid = line.getAttribute("sid") as string;
        const eid = line.getAttribute("eid") as string;
        const st = line.getAttribute("st") as string;
        const et = line.getAttribute("et") as string;
        const l = new Line(this.draw, 0, 0, lineid, lineBox);
        l.update(sid, eid, st, et);
      });
    });
  }

  // 全选
  private selected() {}

  // 保存
  private save() {}
  // 另存为
  private saveAs() {}
  // 一键美化
  private beautify() {}

  /**
   * 打印
   */
  private print() {}

  /**
   * 空格实现平移
   */
  private space() {
    // 1. 给根元素添加标志
    const root = this.draw.getRoot();
    if (root.getAttribute("move") === "true") return;
    root.setAttribute("move", "true");
    root.style.cursor = "grab";

    // 2. 所有div 不响应事件
    root
      .querySelectorAll("div")
      .forEach((i) => (i.style.pointerEvents = "none"));

    // 添加 down 与 move 事件
    root.addEventListener("mousedown", this._spaceDown);
    root.addEventListener("mousemove", this._spaceMove);
    root.addEventListener("mouseup", this._spaceUp);
  }

  /**
   * 空格左键单击记录初始位置
   */
  private spaceDown(e: MouseEvent) {
    if (e.buttons === 2) return;
    this.move = true;
    this.sx = e.offsetX;
    this.sy = e.offsetY;
    // 解析当前 transform
    const editorBox = this.draw.getEditorBox();
    const transform = editorBox.style.transform.split(" "); // ['scale(1)', 'translate(0px,', '0px)']

    // 解析当前的偏移量
    this.tx = Number(transform[1].replace(/translate\(|px|,/g, ""));
    this.ty = Number(transform[2].replace(/\)|px/g, ""));
  }

  /**
   * 空格移动位置
   */
  private spaceMove(e: MouseEvent) {
    if (!this.move) return;
    const { offsetX, offsetY } = e;
    const dx = offsetX - this.sx;
    const dy = offsetY - this.sy;

    // 解析当前 transform
    const editorBox = this.draw.getEditorBox();
    const transform = editorBox.style.transform.split(" "); // ['scale(1)', 'translate(0px,', '0px)']

    // 计算最终结果
    const result = `translate(${this.tx + dx}px, ${this.ty + dy}px)`;
    editorBox.style.transform = transform[0] + result;
  }

  /**
   * 抬起
   * @param e
   */
  private spaceUp(_e: MouseEvent) {
    if (!this.move) return;
    // 4. 初始化参数
    this.move = false;
    this.sx = 0;
    this.sy = 0;
  }

  /**
   * keydown handle 用于实现系统级快捷键 用户快捷键
   * @param e
   */
  public keydownHandle(evt: KeyboardEvent) {
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
      comEvent.forEach((i) => {
        i?.callback?.({
          tips: "参数仅供默认事件处理函数使用,无实际含义!",
          e: evt,
          ctrl: evt.ctrlKey,
          shift: evt.shiftKey,
          key: evt.key,
        });

        // 有事件响应就 阻止默认事件，没有就不阻止，不然连数字都输入不了
        evt.stopPropagation();
        evt.preventDefault();
      });
  }

  public keyupHandle(e: KeyboardEvent) {
    if (e.key !== " ") return;
    // 1. 清空root move 标志
    const root = this.draw.getRoot();
    root.setAttribute("move", "");
    root.style.cursor = "default";

    // 2. 恢复事件
    root.querySelectorAll("div").forEach((i) => (i.style.pointerEvents = ""));

    // 3. 移除事件监听
    root.removeEventListener("mousedown", this._spaceDown);
    root.removeEventListener("mousemove", this._spaceMove);
    root.removeEventListener("mouseup", this._spaceUp);

    // 阻止默认事件
    e.stopPropagation();
    e.preventDefault();
  }
}
