import { graphInfo } from "../Template/index.ts";
import { Draw } from "./index.ts";

export class DialogDraw {
  private draw: Draw;
  private dialogBox: HTMLDivElement;
  constructor(draw: Draw) {
    this.draw = draw;

    // 1. 创建抽屉
    this.dialogBox = draw.createHTMLElement("div") as HTMLDivElement;
    this.dialogBox.classList.add("sf-editor-dialog");
  }
  // 打开弹窗
  public openDialog(title: string, temp: "echartUpdateTemp" | "graphInfo") {
    const root = this.draw.getRoot();
    // 1. 封装公共结构
    const titleTemp = `
    <div class="title">
        <span>${title}</span>
        <i class="iconfont icon-guanbiclose"></i>
    </div>
    <div class="main sf-editor-overflow"></div>`;

    this.dialogBox.innerHTML = titleTemp;

    root.appendChild(this.dialogBox);

    // 2. 注册关闭事件
    this.dialogBox
      .querySelector(".icon-guanbiclose")
      ?.addEventListener("click", this.closeDialog.bind(this));

    // 3. 获取主内容区，用户的模板放在 main 中
    const map: { [key: string]: string } = {
      graphInfo,
    };
    const main = this.dialogBox.querySelector(".main") as HTMLDivElement;
    main.innerHTML = map[temp];
  }

  public closeDialog() {
    this.dialogBox.remove();
  }
}
