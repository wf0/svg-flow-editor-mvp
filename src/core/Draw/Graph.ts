import { IGraph, node } from "../../interface/Graph/index.ts";
import { nextTick } from "../../utils/index.ts";
import { Graph } from "../Graph/index.ts";
import { Line } from "../Graph/Line.ts";
import { Draw } from "./index.ts";
const OFFSET = 10;
const radius = 10; // 定义链接锚点半径
const wh = 10; // 定义形变锚点宽高
// 定义元件最值
const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

//  graph svg 元图相关绘制类
export class GraphDraw {
  private draw: Draw;
  private move = false;
  private _moveHandle!: (e: MouseEvent) => void;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  /**
   * new 元件的时候，均需要执行 addGraph 方法，创建分组后，才能添加到 editorBox 上
   *  每一个元件，都是由 div.mainBox => div.graphBox => svg => graph 构成，外层div 用于处理形变、链接锚点、层级问题
   *  每一个内部的元件 都设置为 100%
   *  圆形、椭圆 则 cx 50% cy 50% r 50%
   * @param graph
   */
  public addGraph(graph: IGraph) {
    const nodeID = graph.getID();
    const element = graph.getElement();

    // 最外层盒子，用于创建 形变、链接锚点、处理层级问题等
    const mainBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    mainBox.classList.add("sf-editor-box-graphs-main");
    mainBox.style.padding = OFFSET + "px"; // 设置偏移量
    mainBox.style.zIndex = "20"; // 设置zIndex 用于处理层级问题
    mainBox.setAttribute("graphid", nodeID); // 设置ID属性
    mainBox.setAttribute("type", "mainBox"); // 设置ID属性

    // 创建 graphBox 元件盒子
    const graphBox = this.draw.createHTMLElement("div") as HTMLDivElement;
    graphBox.classList.add("sf-editor-box-graphs-main-item");
    graphBox.setAttribute("type", "graphBox"); // 标记是 graph 的盒子 svg 的外层

    // graphBox 内部装 svg
    const svg = this.draw.createSVGElement("svg") as SVGSVGElement;
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // svg 内部装 rect circle ellipse 等基础元件
    element.setAttribute("graphid", nodeID);
    element.setAttribute("type", "graph");

    const editorBox = this.draw.getEditorBox();
    const graphsSelector = ".sf-editor-box-graphs";
    const graphs = editorBox.querySelector(graphsSelector) as HTMLDivElement;

    // 特殊处理 ==> 针对 echart、table 不需要 svg 包一层
    const special = ["DIV", "TABLE"];

    if (special.includes(element.tagName)) {
      graphBox.appendChild(element);
      element.style.height = "100%";
      element.style.width = "100%";
      element.style.backgroundColor = "var(--fill)";
      element.style.border = "solid 1px var(--stroke)";
    } else {
      // 初始化默认样式
      element.setAttribute("fill", "var(--fill)");
      element.setAttribute("stroke", "var(--stroke)");
      svg.appendChild(element);
      graphBox.appendChild(svg);
    }

    mainBox.appendChild(graphBox);
    graphs.appendChild(mainBox);

    // 给元件添加事件
    const graphEvent = this.draw.getGraphEvent();
    graphEvent.addEvent(graphBox, graph);

    // 创建链接锚点【连接锚点的显示隐藏是以是否 hover 及 selected 决定，因此不需要单独提供取消事件】
    this.createLinkPoint(graph);

    // 创建形变锚点
    this.createFormatPoint(graph);

    // 执行回调
    nextTick(() => {
      console.log("## 添加元件");
      const eventBus = this.draw.getEventBus();
      const listener = this.draw.getListener();
      const nums = this.getNodesNumber();
      // 同步 footer number 元件数量
      const footerBox = this.draw.getRoot().querySelector(".sf-editor-footer");
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
   * 创建链接锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  public createLinkPoint(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.getGraphMain(nodeID);

    // 1. 创建 link 链接锚点
    const link = this.draw.createHTMLElement("div") as HTMLDivElement;
    link.classList.add("sf-editor-box-graphs-main-links");

    graphMain.appendChild(link);

    // 2. 根据宽度 高度 绘制 4 个链接锚点
    nextTick(() => {
      const fill = "#fff"; // 定义链接锚点的样式
      const stroke = "#067bef";
      const points = [];
      const width = graph.getWidth();
      const height = graph.getHeight();
      // type 标记是哪个点，在连接线的时候，需要做处理
      points.push({ type: "0", x: 0, y: height / 2 });
      points.push({ type: "1", x: width / 2, y: 0 });
      points.push({ type: "2", x: width, y: height / 2 });
      points.push({ type: "3", x: width / 2, y: height });

      points.forEach((item) => {
        const linkItem = this.draw.createHTMLElement("div") as HTMLDivElement;
        linkItem.setAttribute("linktype", item.type);
        linkItem.style.width = radius + "px";
        linkItem.style.height = radius + "px";
        linkItem.style.position = "absolute";
        linkItem.style.left = item.x + radius / 2 + "px";
        linkItem.style.top = item.y + radius / 2 + "px";
        linkItem.style.backgroundColor = fill;
        linkItem.style.borderColor = stroke;
        linkItem.style.borderRadius = radius + "px";
        link.appendChild(linkItem);

        // 添加事件
        linkItem.addEventListener("mousedown", () =>
          this.linkPointMousedown(graph, item.type)
        );
      });
    });
  }

  /**
   * 连接节点鼠标按下事件
   * @param graph
   * @param type
   */
  private linkPointMousedown(graph: IGraph, type: string) {
    const editorBox = this.draw.getEditorBox();
    const sid = graph.getID();

    // 1. 获取当前元素的宽高位置信息
    const width = graph.getWidth();
    const height = graph.getHeight();
    const x = graph.getX();
    const y = graph.getY();

    // 2. 需要计算起点位置 -- 锚点位置受padding影响
    const typeMap: { [key: string]: { sx: number; sy: number } } = {
      "0": { sx: x, sy: y + height / 2 },
      "1": { sx: x + width / 2, sy: y },
      "2": { sx: x + width, sy: y + height / 2 },
      "3": { sx: x + width / 2, sy: y + height },
    };
    // 记录线条信息-起始点坐标
    const sx = typeMap[type].sx + 10;
    const sy = typeMap[type].sy + 10;
    var st = type;
    var et = "";
    var ex = 0;
    var ey = 0;

    // 3. 阻止事件响应
    const graphMain = this.draw.getGraphDraw().getGraphMain(sid);
    graphMain.style.pointerEvents = "none";
    // 所有的连接锚点-不支持连向自己
    const linkPoints = graphMain
      .querySelector(".sf-editor-box-graphs-main-links")
      ?.querySelectorAll("div");
    linkPoints?.forEach((i) => (i.style.pointerEvents = "none"));

    // 4. 创建线条对象 - 传入的是初始位置 left top
    const line = new Line(this.draw, sx, sy);

    // 5. 初始化 startid
    line.setGraphID("sid", sid);

    // 6. 移动的核心事件
    this._moveHandle = (e: MouseEvent) => {
      line.setGraphID("eid", "");
      et = "";
      const { offsetX, offsetY } = e;

      const target = e.target as HTMLDivElement;
      const { className, offsetLeft, offsetTop } = target;
      /**
       * 需要做位置矫正
       *  class='sf-editor-box-graphs' 正确
       *  class='sf-editor-box-graphs-main' 异常 偏移量加 offsetLeft offsetTop 值
       *  class='' 异常
       */
      if (className === "sf-editor-box-graphs") {
        ex = offsetX;
        ey = offsetY;
      } else if (className === "sf-editor-box-graphs-main") {
        ex = offsetLeft + offsetX;
        ey = offsetTop + offsetY;
      } else if (className === "") {
        try {
          const ctype = target.getAttribute("linktype") as string;
          et = ctype;
          const parentNode = target.parentNode?.parentNode as HTMLDivElement;
          const eid = parentNode.getAttribute("graphid") as string;
          const cg = new Graph(this.draw, eid);
          line.setGraphID("eid", eid);
          // 获取宽高位置信息
          var cw = cg.getWidth();
          var ch = cg.getHeight();
          var x = cg.getX();
          var y = cg.getY();
          const typeMap: { [key: string]: { cx: number; cy: number } } = {
            "0": { cx: x, cy: y + ch / 2 },
            "1": { cx: x + cw / 2, cy: y },
            "2": { cx: x + cw, cy: y + ch / 2 },
            "3": { cx: x + cw / 2, cy: y + ch },
          };
          const { cx, cy } = typeMap[ctype];
          ex = cx + radius;
          ey = cy + radius;
        } catch (error) {}
      } else {
        try {
          // 移动到 rect 元件是上 获取 graphid
          const gid = target.getAttribute("graphid") as string;
          const g = new Graph(this.draw, gid);
          const gx = g.getX();
          const gy = g.getY();
          ex = gx + offsetX + 10;
          ey = gy + offsetY + 10;
        } catch (error) {}
      }
      line.move(sx, sy, ex, ey);
    };

    // 7. 抬起结束绘制
    const mouseup = () => {
      line.drawLine(st, et);
      // 恢复当前的事件响应
      graphMain.style.pointerEvents = "";
      linkPoints?.forEach((i) => (i.style.pointerEvents = ""));

      // 移除事件监听
      editorBox.removeEventListener("mousemove", this._moveHandle);
      editorBox.removeEventListener("mouseup", mouseup);
    };

    // 8. 给editorBox 添加 move 事件-以实现流程拖动
    editorBox.addEventListener("mousemove", this._moveHandle);
    editorBox.addEventListener("mouseup", mouseup);
  }

  /**
   * 取消当前节点的连接锚点位置
   * @param graph
   */
  public cancelLinkPoint(graph: IGraph) {
    // 先清空所有的连接锚点，然后再创建
    const nodeID = graph.getID();
    const mainBox = this.getGraphMain(nodeID);
    mainBox.querySelector(".sf-editor-box-graphs-main-links")?.remove();
  }

  /**
   * 创建形变锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  public createFormatPoint(graph: IGraph) {
    const nodeID = graph.getID();
    const graphMain = this.getGraphMain(nodeID);

    const format = this.draw.createHTMLElement("div") as HTMLDivElement;
    format.classList.add("sf-editor-box-graphs-main-formats");

    graphMain.appendChild(format);

    /**
     * 根据位置信息，计算形变锚点位置 顺序如下
     *   1   2   3 9 - 9是旋转锚点
     *   8       4
     *   7   6   5
     */
    nextTick(() => {
      const fill = "#fff"; // 定义链接锚点的样式
      const stroke = "#067bef";
      const points = [];
      const width = graph.getWidth();
      const height = graph.getHeight();
      points.push({ cursor: "nw-resize", x: 0, y: 0 });
      points.push({ cursor: "n-resize", x: width / 2, y: 0 });
      points.push({ cursor: "ne-resize", x: width, y: 0 });
      points.push({ cursor: "e-resize", x: width, y: height / 2 });
      points.push({ cursor: "se-resize", x: width, y: height });
      points.push({ cursor: "s-resize", x: width / 2, y: height });
      points.push({ cursor: "sw-resize", x: 0, y: height });
      points.push({ cursor: "w-resize", x: 0, y: height / 2 });

      points.forEach(({ cursor, x, y }) => {
        const formatItem = this.draw.createHTMLElement("div") as HTMLDivElement;
        formatItem.style.width = wh + "px";
        formatItem.style.height = wh + "px";
        formatItem.style.position = "absolute";
        formatItem.style.left = x + wh / 2 + "px";
        formatItem.style.top = y + wh / 2 + "px";
        formatItem.style.backgroundColor = fill;
        formatItem.style.borderColor = stroke;
        formatItem.style.cursor = cursor;
        format.appendChild(formatItem);

        // 添加事件
        formatItem.addEventListener("mousedown", (e) => {
          this.handleFormatMousedown(e, formatItem, graph as IGraph);
          e.stopPropagation();
          e.preventDefault();
        });
      });

      // 处理旋转锚点
      // points.push({ cursor: "rotate", x: width + 10, y: 0 });
      const rotate = this.draw.createHTMLElement("div") as HTMLDivElement;
      rotate.classList.add("rotate");
      rotate.addEventListener("mousedown", (e) =>
        this.rotateHandle(e, rotate, graph)
      );
      format.appendChild(rotate);
    });
  }

  /**
   * 取消形变锚点
   */
  public cancelFormatPoint(graph: IGraph) {
    const nodeID = graph.getID();
    const mainBox = this.getGraphMain(nodeID);
    mainBox.querySelector(".sf-editor-box-graphs-main-formats")?.remove();
  }

  /**
   * 取消所有的形变锚点-取消选中
   */
  public cancelAllFormatPoint() {
    this.draw
      .getEditorBox()
      .querySelectorAll("div[class='sf-editor-box-graphs-main selected']")
      .forEach((i) => (i as HTMLDivElement).classList.remove("selected"));
  }

  /**
   * 形变节点具体的实现函数
   * @param e
   * @param div
   * @param graph
   */
  private handleFormatMousedown(
    e: MouseEvent,
    div: HTMLDivElement,
    graph: IGraph
  ) {
    this.move = true;
    const x = graph.getX();
    const y = graph.getY();
    var width = graph.getWidth(); // 初始宽度
    var height = graph.getHeight(); // 初始高度

    // 定义类型
    type nodeInfo = { w: number; h: number; x?: number; y?: number };

    // 计算初始位置 相对于 sf-editor-box-graphs
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
      e.target as HTMLDivElement;
    const sx = x + offsetLeft - offsetWidth / 2;
    const sy = y + offsetTop - offsetHeight / 2;

    // 1. 自身不响应实现
    div.style.pointerEvents = "none";

    // 2. 自身的根元素 sf-editor-box-graphs-main-formats
    const formatBox = div.parentNode as HTMLDivElement;
    formatBox.style.pointerEvents = "none";

    // 3. graph box 也不响应
    const mainBox = formatBox.parentNode as HTMLDivElement;
    mainBox.style.pointerEvents = "none";

    // 其他所有的 graphMain 都不响应
    this.draw
      .getRoot()
      .querySelectorAll('[type="mainBox"]')
      // @ts-ignore
      .forEach((i) => (i.style.pointerEvents = "none"));

    // 4. 取消当前节点的锚点
    this.cancelLinkPoint(graph);
    this.cancelFormatPoint(graph);

    const mouseupHandle = () => {
      if (!this.move) {
        this.draw.getEditorBox().removeEventListener("mousemove", boxmove);
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      this.move = false;
      // 最后恢复事件机制
      div.style.pointerEvents = "";
      formatBox.style.pointerEvents = "";
      mainBox.style.pointerEvents = "";

      // 其他所有的 graphMain
      this.draw
        .getRoot()
        .querySelectorAll('[type="mainBox"]')
        // @ts-ignore
        .forEach((i) => (i.style.pointerEvents = ""));

      // 创建锚点
      this.createLinkPoint(graph);
      this.createFormatPoint(graph);

      // 执行事件回调
      nextTick(() => {
        console.log("## Graph Resized.");
        // 回传参数：
        const params = {
          nodeID: graph.getID(),
          width: graph.getWidth(),
          height: graph.getHeight(),
          x: graph.getX(),
          y: graph.getY(),
        };
        // 广播更新
        graph.broadcastGraph("updateGraph", params);
        const eventBus = this.draw.getEventBus();
        const listener = this.draw.getListener();
        const graphLoadedSubscribe = eventBus.isSubscribe("graphResized");
        graphLoadedSubscribe && eventBus.emit("graphResized", params);
        listener.graphResized && listener.graphResized(params);
      });
      this.draw.getEditorBox().removeEventListener("mousemove", boxmove);
      this.draw.getEditorBox().removeEventListener("mouseup", mouseupHandle);
      e.stopPropagation();
      e.preventDefault();
    };

    // 通过父节点实现 move 从而流畅拖动
    this.draw.getEditorBox().addEventListener("mousemove", boxmove);
    this.draw.getEditorBox().addEventListener("mouseup", mouseupHandle);

    /**
     * 移动核心函数
     * 1. 通过 上面的 pointerEvents 操作，确保了 move(e.target) 永远是 sf-editor-box-graphs 在画布内，offset 是准确的
     * 2. 同时 startX startY 也是相对于 sf-editor-box-graphs 画布，这样的 差值才是宽高的变化量
     * @param e
     */
    function boxmove(e: MouseEvent) {
      // 取消形变锚点
      // 取消连接锚点
      const { offsetX, offsetY } = e;
      const dx = offsetX - sx;
      const dy = offsetY - sy;

      // 3. 区分不同的移动方向
      const cursorEventHandle: { [key: string]: () => void } = {
        "nw-resize": () => {
          var x = offsetX;
          var y = offsetY;
          var w = dx < 0 ? Math.abs(dx) + width : width - dx;
          var h = dy < 0 ? Math.abs(dy) + height : height - dy;
          updateGraphInfo({ w, h, x, y });
        },
        "n-resize": () => {
          var y = offsetY;
          var w = width;
          var h = dy < 0 ? Math.abs(dy) + height : height - dy;
          updateGraphInfo({ y, w, h });
        },
        "ne-resize": () => {
          var y = offsetY;
          var w = dx < 0 ? width + dx : dx + width;
          var h = height - dy;
          updateGraphInfo({ y, w, h });
        },
        "e-resize": () => {
          updateGraphInfo({ w: dx < 0 ? width + dx : dx + width, h: height });
        },
        "se-resize": () => {
          updateGraphInfo({ w: dx + width, h: dy + height });
        },
        "s-resize": () => {
          updateGraphInfo({ w: width, h: height + dy });
        },
        "sw-resize": () => {
          updateGraphInfo({ x: offsetX, w: width - dx, h: height + dy });
        },
        "w-resize": () => {
          updateGraphInfo({ x: offsetX, w: width - dx, h: height });
        },
      };

      cursorEventHandle[div.style.cursor]();
    }

    // 执行最终变化
    function updateGraphInfo({ x, y, w, h }: nodeInfo) {
      // 这里也需要判断当前宽高是否小于或大于最值，不然会一直移动圆心，这是不对的
      var width = w;
      var height = h;
      // 通过偏移量来确定圆心位置即可
      if (w >= MIN_WIDTH && w <= MAX_WIDTH) x && graph.setX(x);
      if (h >= MIN_HEIGHT && h <= MAX_HEIGHT) y && graph.setY(y);
      // 临界值处理
      if (w < MIN_WIDTH) width = MIN_WIDTH;
      if (w > MAX_WIDTH) width = MAX_WIDTH;
      if (h < MIN_HEIGHT) height = MIN_HEIGHT;
      if (h > MAX_HEIGHT) height = MAX_HEIGHT;

      // 设置宽高
      graph.setWidth(width);
      graph.setHeight(height);
    }
  }

  /**
   * 旋转的核心事件
   * @param e
   * @param div
   * @param graph
   */
  private rotateHandle(e: MouseEvent, div: HTMLDivElement, graph: IGraph) {
    const x = graph.getX();
    const y = graph.getY();
    var width = graph.getWidth(); // 初始宽度
    var height = graph.getHeight(); // 初始高度

    // 1. 自身不响应实现
    div.style.pointerEvents = "none";

    // 2. 自身的根元素 sf-editor-box-graphs-main-formats
    const formatBox = div.parentNode as HTMLDivElement;
    formatBox.style.pointerEvents = "none";

    // 3. graph box 也不响应
    const mainBox = formatBox.parentNode as HTMLDivElement;
    mainBox.style.pointerEvents = "none";

    // 4. 鼠标抬起，移除 move mouseup 事件！！切记，不然造成内存泄露
    const mouseupHandle = () => {
      div.style.pointerEvents = "";
      formatBox.style.pointerEvents = "";
      mainBox.style.pointerEvents = "";
      this.draw.getEditorBox().removeEventListener("mousemove", rotateHandle);
      this.draw.getEditorBox().removeEventListener("mouseup", mouseupHandle);
      e.stopPropagation();
      e.preventDefault();
      return false;
    };

    this.draw.getEditorBox().addEventListener("mousemove", rotateHandle);
    this.draw.getEditorBox().addEventListener("mouseup", mouseupHandle);

    // 执行旋转的关键函数
    function rotateHandle(e: MouseEvent) {
      // 需要通过计算得出旋转的角度
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      graph.setRotate(angle - 136 + 180);
    }
  }

  /**
   * 获取节点的位置信息，用于实现框线、辅助线
   */
  public getNodeInfo(): node[] {
    const nodes: node[] = [];

    this.draw
      .getEditorBox()
      .querySelectorAll(
        "div.sf-editor-box-graphs-main,div.sf-editor-box-graphs-main selected"
      )
      .forEach((mainBox) => {
        const nodeID = mainBox.getAttribute("graphid") as string;
        // 构造 graph 拿到 width height x y stroke fill
        const graph = new Graph(this.draw, nodeID);
        const width = graph.getWidth();
        const height = graph.getHeight();
        const x = graph.getX();
        const y = graph.getY();
        nodes.push({ nodeID, width, height, x, y });
      });
    return nodes;
  }

  /**
   * 获取页面的元件数量
   */
  public getNodesNumber() {
    return this.draw.getEditorBox().querySelectorAll('[type="mainBox"]').length;
  }

  /**
   * 获取 graph Main 这个是位置相关
   * @param nodeID
   * @returns
   */
  public getGraphMain(nodeID: string) {
    const selector = `div[graphid="${nodeID}"][type="mainBox"]`;
    return this.draw.getEditorBox().querySelector(selector) as HTMLDivElement;
  }

  /**
   * 获取 graph Box 这个是宽度、高度相关的
   * @param nodeID
   * @returns
   */
  public getGraphBox(nodeID: string) {
    const graphMain = this.getGraphMain(nodeID);
    return graphMain.querySelector('[type="graphBox"]') as HTMLDivElement;
  }
}
