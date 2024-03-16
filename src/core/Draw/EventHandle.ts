// 绘制类相关事件
import { IGraph } from "../../interface/Graph/index.ts";
import { nextTick } from "../../utils/index.ts";
import { contextmenu } from "../Template/index.ts";
import { Draw } from "./index.ts";
import dayjs from "dayjs";

/**
 * graph 元件事件响应
 */
export class GraphEvent {
  private draw: Draw;
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * graphBox 添加事件
   * @param ele
   */
  public addEvent(ele: HTMLDivElement, graph: IGraph) {
    ele.addEventListener("click", this.graphClickHandle.bind(this));
    ele.addEventListener("dblclick", this.graphDblclickHandle.bind(this));
    ele.addEventListener("contextmenu", (e) => this.contextmenu(e, graph));
  }

  /**
   * removeEvent 移除事件
   */
  public removeEvent(ele: HTMLDivElement) {
    ele.removeEventListener("click", this.graphClickHandle.bind(this));
    ele.removeEventListener("dblclick", this.graphDblclickHandle);
    ele.removeEventListener("contextmenu", this.contextmenu);
  }

  /**
   * 元件单击事件
   * @param e
   */
  private graphClickHandle(e: Event) {
    console.log("## graphBox click", e.target);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 元件双击事件
   * @param e
   */
  private graphDblclickHandle(e: Event) {
    console.log("## graphBox dblclick");
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 元件右键菜单
   */
  private contextmenu(e: Event, graph?: IGraph) {
    console.log("## graphBox contextmenu");
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.contextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }
}

/**
 * Editor 事件响应
 */
export class EditorEvent {
  private draw: Draw;
  private editorBox!: HTMLDivElement;

  private st!: number; // 记录时间 Number(dayjs().format("mmssSSS")); 毫秒

  // 定义框选的相关参数
  private move!: boolean; // 移动标志
  private sx!: number; // 起点坐标x
  private sy!: number; // 起点坐标y
  private ex!: number; // 终点坐标x
  private ey!: number; // 终点坐标x

  /**
   * constructor EditorEvent 构造函数
   * @param draw
   */
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * editorBox 添加事件
   */
  public addEvent() {
    const editorBox = this.draw.getEditorBox();
    this.editorBox = editorBox;
    // 这里使用mousedown与mousemove、mouseup 事件实现 框选 同时click也在该事件过程中，需要记录事件时长
    editorBox.addEventListener("contextmenu", this.contextmenu.bind(this));
    editorBox.addEventListener("mousedown", this.mousedownHandle.bind(this));
    editorBox.addEventListener("mousemove", this.mousemoveHandle.bind(this));
    editorBox.addEventListener("mouseup", this.mouseupHandle.bind(this));
  }

  /**
   * 移除事件监听
   */
  public removeEvent() {
    const editorBox = this.draw.getEditorBox();
    editorBox.removeEventListener("contextmenu", this.contextmenu);
    editorBox.removeEventListener("mousedown", this.mousedownHandle);
    editorBox.removeEventListener("mousemove", this.mousemoveHandle);
    editorBox.removeEventListener("mouseup", this.mouseupHandle);
  }

  /**
   * 框选事件 mouse down
   * @param e
   * @returns
   */
  private mousedownHandle(e: MouseEvent) {
    // editirBox 事件响应机制： 如果点击的不是 根节点，则不响应
    // @ts-ignore
    if (e.target.className !== "sf-editor-box-graphs" || e.button === 2)
      return (this.st = 0);

    // 记录点击的时间
    this.st = Number(dayjs().format("mmssSSS"));
    this.move = true;

    // 如果右键菜单存在，则取消右键菜单
    this.cancelContextmenu();

    // 记录初始位置
    const { offsetX, offsetY } = e;
    this.sx = offsetX;
    this.sy = offsetY;

    // 重置选区样式
    const selector = 'div[class="sf-editor-box-selectmask"]';
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    mask.style.left = offsetX + "px";
    mask.style.top = offsetY + "px";
    mask.style.display = "block";

    // 元件禁止响应
    this.editorBox
      .querySelectorAll("div[class='sf-editor-box-graphs-item']")
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
    const selector = 'div[class="sf-editor-box-selectmask"]';
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
  private mouseupHandle(e: MouseEvent) {
    this.move = false;
    const selector = 'div[class="sf-editor-box-selectmask"]';
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    mask.style.left = "0";
    mask.style.top = "0";
    mask.style.width = "0";
    mask.style.height = "0";
    mask.style.display = "none";
    this.editorBox
      .querySelectorAll("div[class='sf-editor-box-graphs-item']")
      .forEach((i) => ((i as HTMLDivElement).style.pointerEvents = ""));
    // 正常情况下，单击左键的时间不会超过 120 毫秒，如果超过，则认为用户在框选
    const et = Number(dayjs().format("mmssSSS"));
    if (et - this.st <= 120) return this.clickHandle(e);
  }

  /**
   * editorBox 单击事件
   * @param e
   */
  private clickHandle(e: Event) {
    console.log("@@ editorBox click");
    this.cancelContextmenu();
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 右键菜单 contextmenu
   * @param e
   */
  public contextmenu(e: Event, graph?: IGraph) {
    console.log("editorBox contextmenu");
    // 1. 先看有没有菜单，有的话更新位置，没有再创建
    const menuselector = 'div[class="sf-editor-box-contextmenu"]';
    const menu = this.editorBox.querySelector(menuselector);
    menu ? this.updateContentmenu(e, graph) : this.createContextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 更新右键菜单的位置
   */
  private updateContentmenu(e: Event, graph?: IGraph) {
    const menuselector = 'div[class="sf-editor-box-contextmenu"]';
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

    contextmenuBox.innerHTML = contextmenu;

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
      .querySelector('div[class="sf-editor-box-contextmenu"]')
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
    // 菜单项单击事件
    console.log(command);
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
    const { offsetX, offsetY } = e as PointerEvent;
    var left = offsetX;
    var top = offsetY;
    // 如果 offsetX + width 超过父元素的宽度，则令left = offsetX-width
    if (offsetX + width > clientWidth) left = offsetX - width;
    if (offsetY + height > clientHeight) top = offsetY - height;

    div.style.left = left + "px";
    div.style.top = top + "px";
  }

  // 取消右键菜单
  public cancelContextmenu() {
    const menuselector = 'div[class="sf-editor-box-contextmenu"]';
    const menu = this.editorBox.querySelector(menuselector) as HTMLDivElement;
    menu && menu.remove();
  }
}
