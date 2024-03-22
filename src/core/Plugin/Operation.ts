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
      .querySelector('[class="sf-editor-operation"]') as HTMLDivElement;

    // 菜单顶部添加点击事件-实现关闭菜单项-需要在按钮点击时 阻止冒泡
    operationBox.addEventListener("click", this.maskHandle.bind(this));

    // 菜单顶部选择器
    const topSelector = '[class="sf-editor-operation-top"]';
    // 菜单底部选择器
    const bottomSelector = '[class="sf-editor-operation-bottom"]';
    const top = operationBox?.querySelector(topSelector);
    const bottom = operationBox?.querySelector(bottomSelector);

    // 1. 给顶部的span添加点击事件
    top
      ?.querySelectorAll("span")
      .forEach((span) =>
        span.addEventListener("click", (e) => this.clickHandle(e, span))
      );
  }

  private maskHandle(e: Event) {
    // 关闭蒙版
    const root = this.draw.getRoot();
    const mask = root.querySelector('[class="sf-editor-mask"]');
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
    const mask = root.querySelector('[class="sf-editor-mask"]');
    !mask && this.createMask();

    // 2. 关闭所有的菜单项
    this.closeAllSpan();

    // 3. 获取当前点击 span 下的菜单
    const box = span.querySelector('[class="sf-left-box"]') as HTMLDivElement;
    box && (box.style.display = "block");

    // 4. 处理样式问题
    span.style.backgroundColor = "#dfe2e5";

    // 阻止事件冒泡
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
      .querySelector('[class="sf-editor-operation"]');

    const topSelector = '[class="sf-editor-operation-top"]';
    const top = operationBox?.querySelector(topSelector) as HTMLDivElement;

    // 先隐藏其他的
    const allBox = top.querySelectorAll('[class="sf-left-box"]');
    // @ts-ignore
    allBox.forEach((i) => (i.style.display = "none"));

    // 处理样式
    top
      ?.querySelectorAll("span")
      .forEach((span) => (span.style.backgroundColor = ""));
  }
}
