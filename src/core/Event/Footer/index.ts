import { Command } from "../../Command/Command.ts";
import { Draw } from "../../Draw/index.ts";

// 插件 footer 的事件，通过 API 调用，才能实现与项目脱离 通过调用 command 实现
export class FooterEvent {
  private draw: Draw;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);
    // 初始化事件
    this.initEvent();
  }

  private initEvent() {
    const footerBox = this.draw
      .getRoot()
      .querySelector('[class="sf-editor-footer"]') as HTMLDivElement;

    // 查看列表 list
    const list = footerBox.querySelector('[command="list"]');
    list?.addEventListener("click", () => this.command);
    // 切换的列表
    // 新建页  newpages
    // 缩小 reduce
    const reduce = footerBox.querySelector(
      '[command="reduce"]'
    ) as HTMLDivElement;
    reduce.addEventListener("click", this.command.executePageScaleMinus);
    // 重置 resize
    const resize = footerBox.querySelector(
      '[command="resize"]'
    ) as HTMLDivElement;
    resize.addEventListener("click", this.command.executePageScaleRecovery);
    // 放大 amplify
    const amplify = footerBox.querySelector(
      '[command="amplify"]'
    ) as HTMLDivElement;
    amplify.addEventListener("click", this.command.executePageScaleAdd);
    // 模板 template
    // 全屏 fullscreen
    // 帮助 help
  }
}
