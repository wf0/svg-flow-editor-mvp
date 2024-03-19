import { nextTick } from "../../../utils/index.ts";
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

  /**
   * 给 footer 添加事件
   */
  private initEvent() {
    nextTick(() => {
      const footerBox = this.draw
        .getRoot()
        .querySelector('[class="sf-editor-footer"]') as HTMLDivElement;

      // 定义事件映射
      const eventMap: { [key: string]: () => void } = {
        reduce: this.command.executePageScaleMinus,
        resize: this.command.executePageScaleRecovery,
        amplify: this.command.executePageScaleAdd,
        fullscreen: () => this.changeFullScreenIcon(true),
        exitfullscreen: () => this.changeFullScreenIcon(false),
      };

      footerBox.querySelectorAll("[command]").forEach((item) => {
        const command = item.getAttribute("command") as string;
        item.addEventListener("click", (e) => {
          eventMap[command] && eventMap[command]();
          e.stopPropagation();
          e.preventDefault();
        });
      });
    });
  }

  /**
   * 修改全屏的icon
   * @param full 是否进入全屏
   */
  public changeFullScreenIcon(full: boolean) {
    // 修改元件icon
    const footerBox = this.draw
      .getRoot()
      .querySelector('[class="sf-editor-footer"]') as HTMLDivElement;
    const fullScreen = footerBox.querySelector(
      '[command="fullscreen"]'
    ) as HTMLDivElement;
    const exit = footerBox.querySelector(
      '[command="exitfullscreen"]'
    ) as HTMLDivElement;

    full
      ? this.command.executeFullScreen()
      : this.command.executeExitFullScreen();

    fullScreen.style.display = full ? "none" : "block";
    exit.style.display = full ? "block" : "none";
  }
}
