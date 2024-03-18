// 绘制类相关事件
import { IGraph, node } from "../../interface/Graph/index.ts";
import { nextTick } from "../../utils/index.ts";
import { contextmenu } from "../Template/index.ts";
import { Draw } from "./index.ts";
import dayjs from "dayjs";

/**
 * graph 元件事件响应
 */
export class GraphEvent {
  private draw: Draw;
  private move!: boolean;
  private sx!: number;
  private sy!: number;
  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * graphBox 添加事件
   * @param ele
   */
  public addEvent(ele: HTMLDivElement, graph: IGraph) {
    ele.addEventListener("click", (e) => this.graphClickHandle(e, graph));
    ele.addEventListener("mousedown", this.mouseDownHandle.bind(this));
    ele.addEventListener("mousemove", (e) => this.mouseMoveHandle(e, graph));
    ele.addEventListener("mouseup", this.mouseUpHandle.bind(this));

    ele.addEventListener("dblclick", (e) => this.graphDblclickHandle(e, graph));
    ele.addEventListener("contextmenu", (e) => this.contextmenu(e, graph));
  }

  /**
   * removeEvent 移除事件
   */
  public removeEvent(ele: HTMLDivElement) {}

  /**
   * 元件单击事件
   * @param e
   */
  private graphClickHandle(e: Event, graph: IGraph) {
    console.log("## graphBox click");

    // 支持 ctrl 多选
    const { ctrlKey } = e as PointerEvent;
    const nodeID = graph.getID();

    // 1. 先看是否目前选中的就是当前节点，是的话，直接返回，防止频繁点击元素 执行dom操作
    const selected = this.getSelected();
    if (selected && selected.getAttribute("graphid") === nodeID) return;

    // 2. 添加 mainBox seleted
    if (!ctrlKey) this.draw.getGraphDraw().cancelFormatPoint();
    const mainBox = this.draw.getGraphDraw().getGraphMain(nodeID);
    mainBox.classList.add("selected");

    // 3. 取消右键菜单
    this.draw.getEditorEvent().cancelContextmenu();

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 元件双击事件
   * @param e
   */
  private graphDblclickHandle(e: Event, graph: IGraph) {
    const nodeID = graph.getID();
    const selector = 'div[class="sf-editor-box-graphs-main-contenteditable"]';

    const graphDraw = this.draw.getGraphDraw();

    // 1. 获取当前 main
    const graphBox = graphDraw.getGraphMain(nodeID);

    // 2. 创建 editorable
    graphDraw.createContentEditable(graph);

    // 3. 获取 editorable 的div
    const editor = graphBox.querySelector(selector) as HTMLDivElement;

    // 4. 通过 editor 找parent 找 svg
    const svg = editor.parentNode?.querySelector("svg") as SVGSVGElement;

    // 5. 通过 svg 找 text 节点
    const textNode = svg.querySelector("text");

    const input = editor.children[0] as HTMLDivElement;

    // 6. 如果本身节点存在，则取文字出来显示到 input 中，并且删除 text 节点
    if (textNode) {
      input.innerHTML = textNode.innerHTML;
      textNode.remove();
    }

    // 自动获取焦点
    input.focus();

    // 将光标移动到末尾
    var range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    var sel = window.getSelection() as Selection;
    sel.removeAllRanges();
    sel.addRange(range);

    input.addEventListener("blur", (e) => {
      // 删除编辑器
      editor.remove();

      // 获取用户输入
      const text = input.innerHTML;

      // 将该内容添加到 svg 上
      const st = this.draw.createSVGElement("text") as SVGTextElement;
      st.style.pointerEvents = "none"; // 不响应用户操作
      st.style.userSelect = "none"; // 无法实现选择复制
      st.setAttribute("x", "50%");
      st.setAttribute("y", "50%");
      st.setAttribute("text-anchor", "middle");
      st.innerHTML = text;
      svg.appendChild(st);
    });

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * graph mousedown 移动事件
   * @param e
   * @param graph
   */
  private mouseDownHandle(e: MouseEvent) {
    if (e.button === 2) return;

    // 记录点击的时间
    const { offsetX, offsetY } = e as MouseEvent;
    this.move = true;
    this.sx = offsetX;
    this.sy = offsetY;
  }

  private mouseMoveHandle(e: MouseEvent, graph: IGraph) {
    if (!this.move) return;

    // 这个是新的 offset，直接与旧的 offset 进行运算即可得到差值，与当前位置做计算即可
    const { offsetX, offsetY } = e;

    // 计算差值
    const diffX = offsetX - this.sx;
    const diffY = offsetY - this.sy;

    // 设置位置
    graph.position.call(graph, graph.getX() + diffX, graph.getY() + diffY);

    // 启用线程处理辅助线
    // this.workerEvent(graph);
  }

  /**
   * mouseup
   * @param e
   */
  private mouseUpHandle(e: MouseEvent) {
    // 获取终点坐标
    this.move = false;
    this.sx = 0;
    this.sy = 0;
  }

  /**
   * 元件右键菜单
   */
  private contextmenu(e: Event, graph?: IGraph) {
    console.log("## graphBox contextmenu => 主动调用 editorEvent 事件");
    const editorEvent = this.draw.getEditorEvent();
    editorEvent.contextmenu(e, graph);
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 获取当前选中的元素节点
   * @returns
   */
  private getAllSelected() {
    const selector = "sf-editor-box-graphs-main selected";
    return this.draw
      .getEditorBox()
      .querySelectorAll(selector + '[type="mainBox"]');
  }

  /**
   * 获取单个
   * @returns
   */
  private getSelected() {
    const selector = "sf-editor-box-graphs-main selected";
    return this.draw.getEditorBox().querySelector(selector);
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

    // 取消形变锚点
    this.draw.getGraphDraw().cancelFormatPoint();

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
      .querySelectorAll("div[class='sf-editor-box-graphs-main']")
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
  private async mouseupHandle(e: MouseEvent) {
    this.move = false;
    const selector = 'div[class="sf-editor-box-selectmask"]';
    const mask = this.editorBox.querySelector(selector) as HTMLDivElement;
    mask.style.left = "0";
    mask.style.top = "0";
    mask.style.width = "0";
    mask.style.height = "0";
    mask.style.display = "none";
    this.editorBox
      .querySelectorAll("div[class='sf-editor-box-graphs-main']")
      .forEach((i) => ((i as HTMLDivElement).style.pointerEvents = ""));
    // 正常情况下，单击左键的时间不会超过 120 毫秒，如果超过，则认为用户在框选
    const et = Number(dayjs().format("mmssSSS"));
    if (et - this.st <= 120) return this.clickHandle(e);
    const { offsetX, offsetY } = e;
    this.ex = offsetX;
    this.ey = offsetY;
    // 实现相关的框选逻辑
    await this.selected();
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
  private selected() {
    return new Promise<void>((resolve) => {
      let xrange = [Math.min(this.sx, this.ex), Math.max(this.sx, this.ex)];
      let yrange = [Math.min(this.sy, this.ey), Math.max(this.sy, this.ey)];
      // 定义被选中的元素数组
      let selected: string[] = [];
      const nodes = this.draw.getGraphDraw().getNodePosition() as node[];
      if (!nodes) return [];

      nodes.forEach(({ nodeID, width, height, x, y }) => {
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
          if (islt || isrt || isrb || islb) selected.push(nodeID);
        }

        function all() {
          if (islt && isrt && isrb && islb) selected.push(nodeID);
        }

        // this.mode === "inside" ? inside() : all();
        inside(); // 目前默认就是 inside 模式
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
   * editorBox 单击事件
   * @param e
   */
  private clickHandle(e: Event) {
    console.log("@@ editorBox click");
    // 取消右键菜单
    this.cancelContextmenu();

    // 取消形变锚点
    this.draw.getGraphDraw().cancelFormatPoint();
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
