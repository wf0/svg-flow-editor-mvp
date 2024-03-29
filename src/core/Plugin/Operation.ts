import { IBackground } from "../../interface/Draw/index.ts";
import { nextTick } from "../../utils/index.ts";
import { Command } from "../Command/Command.ts";
import { Draw } from "../Draw/index.ts";
import { operationTemp } from "../Template/index.ts";

// 操作区
export class Operation {
  private draw: Draw;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);

    const operation = draw.createHTMLElement("div") as HTMLDivElement;
    operation.classList.add("sf-editor-operation");
    draw.getRoot().appendChild(operation);
    operation.innerHTML = operationTemp;
    // 添加事件
    draw.resize();

    // 初始化事件
    this.initEvent();
  }

  private initEvent() {
    const operationBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-operation") as HTMLDivElement;

    // 菜单顶部添加点击事件-实现关闭菜单项-需要在按钮点击时 阻止冒泡
    operationBox.addEventListener("click", this.maskHandle.bind(this));

    // 菜单顶部选择器
    const topSelector = ".sf-editor-operation-top";
    // 菜单底部选择器
    const bottomSelector = ".sf-editor-operation-bottom";
    const top = operationBox?.querySelector(topSelector);
    const bottom = operationBox?.querySelector(bottomSelector);

    // 1. 给顶部的span添加点击事件
    const spans = top?.querySelectorAll("span[index]");
    spans?.forEach((span) => {
      span.addEventListener("click", (e) => {
        this.clickHandle(e, span as HTMLSpanElement);
        this.addCommandEvent(e, span as HTMLSpanElement);
      });
    });

    // 2. 给 bottom 的icon 添加事件
    bottom?.querySelectorAll("[command]").forEach((item) => {
      const command = item.getAttribute("command");
      item.addEventListener("click", () => {
        console.log("点击事件-", command);
      });
    });
  }

  /**
   * 蒙版点击事件响应 - 关闭蒙版 关闭菜单项
   * @param e
   */
  private maskHandle(e: Event) {
    // 关闭蒙版
    const root = this.draw.getRoot();
    const mask = root.querySelector(".sf-editor-mask");
    mask && mask.remove();

    // 2. 关闭所有的菜单项
    this.closeAllSpan();
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 顶部菜单 click 事件机制-应该通过动态加载 蒙版实现菜单项，不然实现不了关闭
   */
  private clickHandle(e: Event, span: HTMLSpanElement) {
    // 1. 先创建蒙版
    const root = this.draw.getRoot();
    const mask = root.querySelector(".sf-editor-mask");
    !mask && this.createMask();

    // 2. 关闭所有的菜单项
    this.closeAllSpan();

    // 3. 获取当前点击 span 下的菜单
    const box = span.querySelector(".sf-left-box") as HTMLDivElement;
    box && (box.style.display = "block");

    // 4. 处理样式问题
    span.style.backgroundColor = "#dfe2e5";

    // 阻止事件冒泡
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 点击上面的菜单展开后，需要给子项添加事件
   * @param e
   * @param span
   */
  private addCommandEvent(e: Event, span: HTMLSpanElement) {
    // 获取 mask 点击时支持关闭
    const root = this.draw.getRoot();
    const mask = root.querySelector(".sf-editor-mask");

    // 事件映射
    const eventMap: { [key: string]: () => void } = {
      newfile: this.command.executeNewFile, // 新建文件
      rename: this.command.executeReName, // 重命名
      preview: this.command.executePreview, // 预览
      save: this.command.executeSave, // 保存
      saveas: this.command.executeSaveAs, // 另存为
      share: this.command.executeShare, // 分享协作
      release: this.command.executeRelease, // 发布
      history: this.command.executeHistory, // 历史记录
      print: this.command.executePrint, // 打印
      close: this.command.executeClose, // 关闭
      revoke: this.command.executeUndo, // 撤销
      restore: this.command.executeRedo, // 重做
      paste: this.command.executePaste, // 粘贴
      copy: this.command.executeCopy, // 复制
      cut: this.command.executeCut, // 剪切
      beautify: this.command.executeBeautify, // 一键美化
      delete: this.command.executeDeleteGraph, // 删除
      add: this.command.executePageScaleAdd, // 方法
      minus: this.command.executePageScaleMinus, // 缩小
      resize: this.command.executePageScaleRecovery, // 重置
      top: this.command.executeTop, // 置于顶层
      bottom: this.command.executeBottom, // 置于底层
      holdup: this.command.executeHoldUp, // 上移一层
      putdown: this.command.executePutDown, // 下移一层
      group: this.command.executeGroup, // 分组
      ungroup: this.command.executeUnGroup, // 取消分组
      lock: this.command.executeLock, // 锁定
      unlock: this.command.executeUnLock, // 解锁
      // download: this.command.executeCopy, // 下载
      // upload: this.command.executeCopy,
      // bold: this.command.executeCopy,
      // italic: this.command.executeCopy,
      // underline: this.command.executeCopy,
      // color: this.command.executeCopy,
      // fill: this.command.executeCopy,
    };

    // 所有子项的事件响应中心
    const eventHandle = (e: Event) => {
      // 1. 解析参数 这个只能通过parent获取属性，用户可能点击i span span div
      const target = e.target as HTMLElement;
      const cmd = target.getAttribute("command");
      const pcmd = (target.parentNode as HTMLElement).getAttribute("command");
      const command = cmd || pcmd;
      if (!command) return;

      console.log("operation menu command =>", command);

      // 获取 dialog 对象
      const dilaog = this.draw.getDialogDraw();

      // dialog 事件中心
      const dialogEvent = () => {
        // 获取 dialog html
        const main = this.draw.getRoot().querySelector(".sf-editor-dialog");

        // 2. 注册 span 事件
        main?.querySelectorAll("[command]").forEach((item) => {
          const command = item.getAttribute("command") as string;
          item.addEventListener("click", (e) =>
            dilaog.spanClickHandle(e, command)
          );
        });

        // 3. 注册 input 事件
        main?.querySelectorAll("input").forEach((item) => {
          const id = item.getAttribute("id") as string;
          item.addEventListener("change", (e) => dilaog.inputHandle(e, id));
        });
      };

      // 2. 响应事件
      switch (command) {
        case "50":
        case "75":
        case "100":
        case "150":
        case "200":
          this.command.setPageScale(Number(command) / 100);
          break;

        case "canvas":
          dilaog.openDialog("画布设置", "canvasSettingTemp"); // 1. 打开弹窗
          dialogEvent(); // 2. 注册事件
          break;

        case "grid":
        case "origin":
        case "warter":
          canvasHandle(command);
          break;

        case "theme":
          dilaog.openDialog("切换风格", "themeTemp");
          break;

        default:
          eventMap[command] && eventMap[command]();
          break;
      }

      // 3. 关闭当前的菜单
      const box = span.querySelector(".sf-left-box") as HTMLDivElement;
      box && (box.style.display = "none");
      span.style.backgroundColor = "";

      // 4. 移除事件监听-不然会重复实现
      span
        .querySelectorAll("[command]")
        .forEach((item) => item.removeEventListener("click", eventHandle));

      // 5. 关闭蒙版
      mask && mask.remove();

      // 6. 阻止默认事件
      e.stopPropagation();
      e.preventDefault();
    };

    // 网格、圆点、水印的菜单展开
    const backgroundHandle = (item: Element) => {
      const index = span.getAttribute("index");

      if (index !== "5") return;

      const command = item.getAttribute("command") as string;
      if (!["grid", "origin", "warter"].find((i) => i === command)) return;

      // item 是当前的div ，需要修改下面的 i 的状态 和 span 的style padding left 属性
      const spanItem = item.querySelector("span") as HTMLSpanElement;
      const i = item.querySelector("i") as HTMLElement;

      // 1. 获取当前 canvas 绘制状态
      const canvasDraw = this.draw.getCanvasDraw();

      const { origin, gridline, watermark } = canvasDraw.getBackground();

      spanItem.style.paddingLeft = "24px";
      i.classList.remove("icon-dagoucheck");

      // 是否开启网格
      if (gridline && command === "grid") {
        spanItem.style.paddingLeft = "";
        i.classList.add("icon-dagoucheck");
      }
      // 是否开启圆点
      else if (origin && command === "origin") {
        spanItem.style.paddingLeft = "";
        i.classList.add("icon-dagoucheck");
      }
      // 是否开启水印
      if (watermark && command === "warter") {
        spanItem.style.paddingLeft = "";
        i.classList.add("icon-dagoucheck");
      }
    };

    // 网格、圆点、水印的开启与关闭事件响应
    const canvasHandle = (command: string) => {
      // 1. 获取当前 canvas 绘制状态
      const canvasDraw = this.draw.getCanvasDraw();

      const oldVal = canvasDraw.getBackground();
      var payload: IBackground = {};
      if (command === "origin")
        payload = Object.assign(oldVal, {
          origin: !oldVal.origin,
          gridline: false,
        });
      if (command === "grid")
        payload = Object.assign(oldVal, {
          gridline: !oldVal.gridline,
          origin: false,
        });
      if (command === "warter")
        payload = Object.assign(oldVal, { watermark: !oldVal.watermark });

      this.command.executeBackground(payload);
    };

    // 添加事件
    span.querySelectorAll("[command]").forEach((item) => {
      item.addEventListener("click", eventHandle);
      backgroundHandle(item);
    });

    // 阻止默认事件
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 创建蒙版-实现点击外部关闭菜单项
   */
  private createMask() {
    const mask = this.draw.createHTMLElement("div");
    mask.classList.add("sf-editor-mask");
    this.draw.getRoot().append(mask);
    mask.addEventListener("click", this.maskHandle.bind(this));
    mask.addEventListener("contextmenu", this.maskHandle.bind(this));
  }

  /**
   * 关闭所有的 span 菜单项
   */
  private closeAllSpan() {
    const operationBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-operation");

    const topSelector = ".sf-editor-operation-top";
    const top = operationBox?.querySelector(topSelector) as HTMLDivElement;

    // 先隐藏其他的
    const allBox = top.querySelectorAll(".sf-left-box");
    // @ts-ignore
    allBox.forEach((i) => (i.style.display = "none"));

    // 处理样式
    top
      ?.querySelectorAll("span")
      .forEach((span) => (span.style.backgroundColor = ""));
  }
}
