import { Command } from "../Command/Command.ts";
import { Draw } from "../Draw/index.ts";
import { footerTemp } from "../Template/index.ts";

// 页脚功能区
export class Footer {
  private draw: Draw;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);

    const footer = this.draw.createHTMLElement("div") as HTMLDivElement;
    footer.classList.add("sf-editor-footer");
    this.draw.getRoot().appendChild(footer);
    footer.innerHTML = footerTemp;

    // 需要重置画布的宽高信息
    this.draw.resize();
    // 初始化事件
    this.initEvent();
  }

  /**
   * 给 footer 添加事件
   */
  private initEvent() {
    const footerBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-footer") as HTMLDivElement;

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
  }

  /**
   * 修改全屏的icon
   * @param full 是否进入全屏
   */
  public changeFullScreenIcon(full: boolean) {
    // 修改元件icon
    const footerBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-footer") as HTMLDivElement;
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
