/**
 * Editor 事件响应
 */

import { IGraph, node } from "../../../interface/Graph/index.ts";
import { nextTick } from "../../../utils/index.ts";
import { contextmenuTemp } from "../../Template/index.ts";
import { Draw } from "../../Draw/index.ts";
import dayjs from "dayjs";
import { RegisterEvent } from "../Register/index.ts";
import { Command } from "../../Command/Command.ts";

export class EditorEvent {
  private draw: Draw;
  private editorBox!: HTMLDivElement;

  private st!: number; // 记录时间 Number(dayjs().format("mmssSSS")); 毫秒
  private mode!: "inside";

  // 定义框选的相关参数
  private move!: boolean; // 移动标志
  private sx!: number; // 起点坐标x
  private sy!: number; // 起点坐标y
  private ex!: number; // 终点坐标x
  private ey!: number; // 终点坐标x
  private registerEvent: RegisterEvent;
  private command: Command;
  private _contextmenu: (e: Event, graph?: IGraph) => void;
  private _mousedownHandle: (e: MouseEvent) => 0 | undefined;
  private _mousemoveHandle: (e: MouseEvent) => void;
  private _mouseupHandle: (e: MouseEvent) => Promise<void>;
  private _keydownHandle: (evt: KeyboardEvent) => void;
  private _scaleHandle: (evt: WheelEvent) => void;
  private _keyupHandle: (evt: KeyboardEvent) => void;
  /**
   * constructor EditorEvent 构造函数
   * @param draw
   */
  constructor(draw: Draw) {
    this.draw = draw;
    // 注册快捷键
    this.registerEvent = new RegisterEvent(draw);
    this.command = new Command(draw);
    const register = this.registerEvent;

    /**
     * 初始化事件映射，不然绑定了 this 不能 removeEventListener
     */
    this._contextmenu = this.contextmenu.bind(this);
    this._mousedownHandle = this.mousedownHandle.bind(this);
    this._mousemoveHandle = this.mousemoveHandle.bind(this);
    this._mouseupHandle = this.mouseupHandle.bind(this);
    this._keydownHandle = register.keydownHandle.bind(register);
    this._keyupHandle = register.keyupHandle.bind(register);
    this._scaleHandle = this.setScale.bind(this);
  }

  /**
   * editorBox 添加事件
   */
  public addEvent() {
    this.editorBox = this.draw.getEditorBox();
    // 这里使用mousedown与mousemove、mouseup 事件实现 框选 同时click也在该事件过程中，需要记录事件时长
    this.editorBox.addEventListener("contextmenu", this._contextmenu);
    this.editorBox.addEventListener("mousedown", this._mousedownHandle);
    this.editorBox.addEventListener("mousemove", this._mousemoveHandle);
    this.editorBox.addEventListener("mouseup", this._mouseupHandle);
    document.addEventListener("keydown", this._keydownHandle);
    document.addEventListener("keyup", this._keyupHandle);
    // 缩放事件
    document.addEventListener("wheel", this._scaleHandle, {
      passive: false,
    });
  }

  /**
   * 移除事件监听
   */
  public removeEvent() {
    const editorBox = this.draw.getEditorBox();
    editorBox.removeEventListener("contextmenu", this._contextmenu);
    editorBox.removeEventListener("mousedown", this._mousedownHandle);
    editorBox.removeEventListener("mousemove", this._mousemoveHandle);
    editorBox.removeEventListener("mouseup", this._mouseupHandle);
    document.removeEventListener("keydown", this._keydownHandle);
    document.removeEventListener("wheel", this._scaleHandle);
  }

  /**
   * 框选事件 mouse down
   * @param e
   * @returns
   */
  private mousedownHandle(e: MouseEvent) {
    const move = !!this.draw.getRoot().getAttribute("move");
    // editirBox 事件响应机制： 如果点击的不是 根节点，则不响应
    // @ts-ignore
    if (move || e.target.className !== "sf-editor-box-graphs" || e.button === 2)
      return (this.st = 0);

    // 记录点击的时间
    this.st = Number(dayjs().format("mmssSSS"));
    this.move = true;

    // 如果右键菜单存在，则取消右键菜单
    this.cancelContextmenu();

    // 取消形变锚点
    this.draw.getGraphDraw().cancelAllFormatPoint();

    // 记录初始位置
    const { offsetX, offsetY } = e;
    this.sx = offsetX;
    this.sy = offsetY;

    // 重置选区样式
    const selector = "div.sf-editor-box-selectmask";
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    mask.style.left = offsetX + "px";
    mask.style.top = offsetY + "px";
    mask.style.display = "block";

    // 元件禁止响应
    this.editorBox
      .querySelectorAll("div.sf-editor-box-graphs-main")
      .forEach((i) => ((i as HTMLDivElement).style.pointerEvents = "none"));
  }

  /**
   * 框选事件 mousemove
   * @param e
   * @returns
   */
  private mousemoveHandle(e: MouseEvent) {
    if (!this.move) return;
    const { offsetX, offsetY } = e;
    const selector = "div.sf-editor-box-selectmask";
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    // 这里处理反向框选   x 往左边拖动，则拖动的位置始终是left的坐标
    if (offsetX - this.sx < 0) mask.style.left = `${offsetX}px`;
    if (offsetY - this.sy < 0) mask.style.top = `${offsetY}px`;
    mask.style.height = `${Math.abs(offsetY - this.sy)}px`;
    mask.style.width = `${Math.abs(offsetX - this.sx)}px`;
  }

  /**
   * 框选事件 mouseup
   * @param e
   * @returns
   */
  private async mouseupHandle(e: MouseEvent) {
    if (!this.move) return;
    this.move = false;
    const selector = "div.sf-editor-box-selectmask";
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    mask.style.left = "0";
    mask.style.top = "0";
    mask.style.width = "0";
    mask.style.height = "0";
    mask.style.display = "none";
    this.editorBox
      .querySelectorAll("div.sf-editor-box-graphs-main")
      .forEach((i) => ((i as HTMLDivElement).style.pointerEvents = ""));
    // 正常情况下，单击左键的时间不会超过 120 毫秒，如果超过，则认为用户在框选
    const et = Number(dayjs().format("mmssSSS"));
    if (et - this.st <= 120) return this.clickHandle(e);
    const { offsetX, offsetY } = e;
    this.ex = offsetX;
    this.ey = offsetY;
    // 实现相关的框选逻辑
    await this.computedSelected();
    // 重置参数
    this.st = 0;
    this.sx = 0;
    this.sy = 0;
    this.ex = 0;
    this.ey = 0;
  }

  /**
   * 根据框选开始结束，计算那些元素在选区内被选中
   * @returns string[] 返回 nodeID 构成的数组
   */
  private computedSelected() {
    return new Promise<void>((resolve) => {
      let xrange = [Math.min(this.sx, this.ex), Math.max(this.sx, this.ex)];
      let yrange = [Math.min(this.sy, this.ey), Math.max(this.sy, this.ey)];
      // 定义被选中的元素数组
      let selected: string[] = [];
      const nodes = this.draw.getGraphDraw().getNodeInfo() as node[];
      if (!nodes) return [];

      nodes.forEach(({ nodeID, width, height, x, y }) => {
        if (!x || !y) return;
        const lt = { x, y };
        const rt = { x: x + width, y };
        const lb = { x, y: y + height };
        const rb = { x: x + width, y: y + height };

        // 判断 4 个角是否处于框选范围内
        const islt = this.computedIsSelected(lt, xrange, yrange);
        const isrt = this.computedIsSelected(rt, xrange, yrange);
        const islb = this.computedIsSelected(lb, xrange, yrange);
        const isrb = this.computedIsSelected(rb, xrange, yrange);

        function inside() {
          if (islt || isrt || isrb || islb) selected.push(nodeID as string);
        }

        function all() {
          if (islt && isrt && isrb && islb) selected.push(nodeID as string);
        }

        this.mode === "inside" ? inside() : all();
      });

      if (!selected.length) resolve();
      // 然后将选中的节点设置 selected 样式
      selected.forEach((i) =>
        this.draw.getGraphDraw().getGraphMain(i).classList.add("selected")
      );
      resolve();
    });
  }

  /**
   * 框选结束后，判断点是否在范围内
   * @param current
   * @param x
   * @param y
   * @returns
   */
  private computedIsSelected(
    current: { x: number; y: number },
    x: number[],
    y: number[]
  ) {
    // 目前只考虑了点的情况，如果框选的是边 也要兼容 暂不考虑
    let isx = current.x >= x[0] && current.x <= x[1];
    let isy = current.y >= y[0] && current.y <= y[1];
    // 对同一个点来说 必须同时满足才算是在框选区
    return isx && isy;
  }

  /**
   * 滚轮缩放事件-按照等比例进行缩放即可，不需要关心实际的比例是多少
   * @param evt
   */
  private setScale(evt: WheelEvent) {
    if (!evt.ctrlKey) return;
    const type = evt.deltaY < 0 ? "Add" : "Minus";
    // 在这判断是缩小还是放大即可
    this.scalePage(type);
    evt.preventDefault();
  }

  /**
   * 实现缩放的关键方法 单独出来是为了供 command 实现调用
   * @param scale
   */
  public scalePage(
    type: "Appoint" | "Recovery" | "Minus" | "Add",
    scale?: number
  ) {
    var result = 0; // 定义最终的缩放比例
    const step = 0.2; // 自由增加步长
    // 当前的比例
    const editorBox = this.draw.getEditorBox() as HTMLDivElement;

    // 当前的缩放比例
    const transform = editorBox.style.transform.split(" ");
    const currentScale = Number(transform[0].replace(/\(|\)|scale/g, ""));

    // 到底取加还是减，取决于参数
    if (type === "Add") result = currentScale + step;
    if (type === "Minus") result = currentScale - step;
    if (type === "Recovery") result = 1;
    if (type === "Appoint") result = scale as number;

    // 进行边界处理 考虑临界值
    if (result < 0.4) result = 0.4;
    if (result > 2) result = 2;

    // 实现缩放 - 这里要考虑其他的 transform 不然会冲突
    editorBox.style.transform = `scale(${result}) ${transform[1]}${transform[2]}`;
    // 同时还需要考虑 footer 的缩放比例同步显示
    const footerBox = this.draw.getRoot().querySelector(".sf-editor-footer");

    if (footerBox) {
      // 修改缩放比例 command=resize
      const resize = footerBox.querySelector(
        '[command="resize"]'
      ) as HTMLSpanElement;
      resize.innerHTML = Math.floor(result * 100).toString() + "%";
    }
    // 执行 pageScale 回调
    nextTick(() => {
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const graphLoadedSubscribe = eventBus.isSubscribe("pageScale");
      graphLoadedSubscribe && eventBus.emit("pageScale", scale);
      listener.pageScale && listener.pageScale(scale);
    });
  }

  /**
   * editorBox 单击事件
   * @param e
   */
  public clickHandle(e?: Event) {
    // 取消右键菜单
    this.cancelContextmenu();

    // 取消形变锚点
    this.draw.getGraphDraw().cancelAllFormatPoint();

    // 取消dialog 显示
    this.draw.getDialogDraw().closeDialog();

    e && e.stopPropagation();
    e && e.preventDefault();
  }

  /**
   * 右键菜单 contextmenu
   * @param e
   */
  public contextmenu(e: Event, graph?: IGraph) {
    // 1. 先看有没有菜单，有的话更新位置，没有再创建
    const menuselector = "div.sf-editor-box-contextmenu";
    const menu = this.editorBox.querySelector(menuselector);
    // 添加selected 样式
    if (graph) {
      // 清空所有
      this.draw.getGraphDraw().cancelAllFormatPoint();
      const mainBox = this.draw.getGraphDraw().getGraphMain(graph.getID());
      mainBox.classList.add("selected");
    }
    menu ? this.updateContentmenu(e, graph) : this.createContextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 更新右键菜单的位置
   */
  private updateContentmenu(e: Event, graph?: IGraph) {
    const menuselector = "div.sf-editor-box-contextmenu";
    const menu = this.editorBox.querySelector(menuselector) as HTMLDivElement;
    // 控制元件的右键菜单显示隐藏
    const menuBox = menu.querySelector("div") as HTMLDivElement;
    menuBox.classList.remove("graph");
    menuBox.classList.remove("editor");
    menuBox.classList.add(graph ? "graph" : "editor");
    // 纠正位置
    this.correctContextMenuPosition(menu, e);
  }

  /**
   * 创建右键菜单
   */
  private createContextmenu(e: Event, graph?: IGraph) {
    const contextmenuBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    contextmenuBox.classList.add("sf-editor-box-contextmenu");

    contextmenuBox.innerHTML = contextmenuTemp;

    // 添加到editorbox
    this.editorBox.append(contextmenuBox);

    // 控制元件的右键菜单显示隐藏
    const menuBox = contextmenuBox.querySelector("div") as HTMLDivElement;
    menuBox.classList.remove("graph");
    menuBox.classList.remove("editor");
    menuBox.classList.add(graph ? "graph" : "editor");
    this.correctContextMenuPosition(contextmenuBox, e);

    // 添加事件
    this.editorBox
      .querySelector("div.sf-editor-box-contextmenu")
      ?.querySelectorAll("[command]")
      .forEach((i) =>
        i.addEventListener("click", (e) =>
          this.contextmenuClickHandle(e, i.getAttribute("command"))
        )
      );

    // 处理用户自定义右键菜单及添加事件
    nextTick(() => {
      const { contextMenuList } = this.draw.getRegister();
      if (!contextMenuList.length) return;
      // 将用户的自定义事件添加到 菜单中,用户有事件，则需要在末尾先添加分割线
      const line = this.draw.createHTMLElement("div") as HTMLDivElement;
      line.classList.add("sf-editor-box-contextmenu-main-line");
      contextmenuBox.children[0].appendChild(line);

      // 进而处理用户的事件
      contextMenuList.forEach(
        ({ title, callback, command, isGraph, shortCut }) => {
          // 创建用户菜单 div
          const item = this.draw.createHTMLElement("div") as HTMLDivElement;
          item.classList.add("sf-editor-box-contextmenu-main-item");
          item.classList.add(isGraph ? "graph-item" : "editor-item");
          item.setAttribute("command", command);

          // 创建 标题
          const titlespan = this.draw.createHTMLElement("span");
          titlespan.innerHTML = title;
          titlespan.style["paddingLeft"] = "20px";

          // 创建快捷键
          const shortCutSpan = this.draw.createHTMLElement("span");
          shortCutSpan.innerHTML = shortCut || "";

          // 将标题 快捷键 添加到 用户菜单 div
          item.appendChild(titlespan);
          item.appendChild(shortCutSpan);

          // 将菜单 div 放到 contextmenuBox 上
          contextmenuBox.children[0].appendChild(item);

          // 绑定事件
          item.addEventListener("click", (e) => {
            callback && callback(e);
            this.clickHandle(e);
          });
        }
      );
    });

    // 右键的右键不响应事件，不然会导致位置异常
    contextmenuBox.addEventListener(
      "contextmenu",
      (e) => (e.preventDefault(), e.stopPropagation())
    );
  }

  /**
   * 绑定右键菜单项的点击事件
   */
  private contextmenuClickHandle(e: Event, command: string | null) {
    // 层级处理上是需要传递当前选中的 nodeID
    const selected = this.draw.getGraphEvent().getSelected();
    const nodeID = selected.getAttribute("graphid") as string;
    const eventMap: { [key: string]: (i: string) => void } = {
      // paste: this.command.executePaste,
      top: this.command.executeTop,
      bottom: this.command.executeBottom,
      holdup: this.command.executeHoldUp,
      putdown: this.command.executePutDown,
    };

    command && eventMap[command] && eventMap[command](nodeID);
    console.log("contextmenu command =>", command);
    this.clickHandle(e);
  }

  /**
   * 右键菜单唤起事件需要矫正位置
   * @param div
   * @param e
   */
  private correctContextMenuPosition(div: HTMLDivElement, e: Event) {
    // 获取父元素的宽高 取 this.editorBox
    const { clientHeight, clientWidth } = this.editorBox;
    // 获取自身的宽高
    const width = div.clientWidth;
    const height = div.clientHeight;

    // 这里需要处理 graph 唤醒位置偏移问题
    const { offsetX, offsetY } = e as PointerEvent;

    var left = offsetX;
    var top = offsetY;

    // @ts-ignore 获取 nodeID 获取
    const nodeID = e.target.getAttribute("graphid");

    // 获取父元素的left top
    const mainBox = this.draw.getGraphDraw().getGraphMain(nodeID);
    if (mainBox) {
      var x = Number(mainBox.style.left.replace("px", ""));
      var y = Number(mainBox.style.top.replace("px", ""));
      left = x + offsetX;
      top = y + offsetY;
    }

    // 如果 offsetX + width 超过父元素的宽度，则令left = offsetX-width
    if (left + width > clientWidth) left -= width;
    if (top + height > clientHeight) top -= height;
    div.style.left = left + "px";
    div.style.top = top + "px";
  }

  // 取消右键菜单
  public cancelContextmenu() {
    const menuselector = "div.sf-editor-box-contextmenu";
    const menu = this.editorBox.querySelector(menuselector) as HTMLDivElement;
    menu && menu.remove();
  }
}
