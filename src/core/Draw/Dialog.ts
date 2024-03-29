import { IUpdateGraph } from "../../interface/Graph/index.ts";
import { setTheme } from "../../utils/index.ts";
import { Command } from "../Command/Command.ts";
import {
  backgroundSettingTemp,
  canvasSettingTemp,
  graphInfoTemp,
  themeTemp,
} from "../Template/index.ts";
import { Draw } from "./index.ts";

type dialogTemp =
  | "echartUpdateTemp"
  | "graphInfoTemp"
  | "canvasSettingTemp"
  | "backgroundSettingTemp"
  | "themeTemp";

export class DialogDraw {
  private draw: Draw;
  private dialogBox: HTMLDivElement;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);

    // 1. 创建抽屉
    this.dialogBox = draw.createHTMLElement("div") as HTMLDivElement;
    this.dialogBox.classList.add("sf-editor-dialog");
  }

  // 打开弹窗
  public openDialog(title: string, temp: dialogTemp) {
    const root = this.draw.getRoot();
    const have = root.querySelector(".sf-editor-dialog");
    // 1. 封装公共结构
    const titleTemp = `
    <div class="title">
        <span>${title}</span>
        <i class="iconfont icon-guanbiclose"></i>
    </div>
    <div class="main sf-editor-overflow"></div>`;

    this.dialogBox.innerHTML = titleTemp;

    !have && root.appendChild(this.dialogBox);

    // 2. 注册关闭事件
    this.dialogBox
      .querySelector(".icon-guanbiclose")
      ?.addEventListener("click", this.closeDialog.bind(this));

    // 3. 获取主内容区，用户的模板放在 main 中
    const map: { [key: string]: string } = {
      themeTemp,
      graphInfoTemp,
      canvasSettingTemp,
      backgroundSettingTemp,
    };
    const main = this.dialogBox.querySelector(".main") as HTMLDivElement;
    main.innerHTML = map[temp];
  }

  public closeDialog() {
    this.dialogBox.remove();
  }

  // dialog 弹窗的 command span 事件
  public spanClickHandle(e: Event, command: string) {
    // 提取公共方法
    const updateGraph = (o: IUpdateGraph) => this.command.executeUpdateGraph(o);

    // 1. 解析参数
    const [key, value] = command.split("-");

    // 元件更新事件
    if (key === "stroke") updateGraph({ stroke: `#${value}` });
    if (key === "fill") updateGraph({ fill: `#${value}` });
    if (key === "transparent") updateGraph({ fill: "transparent" });
    if (key === "strokeWidth") updateGraph({ strokeWidth: Number(value) });
    if (key === "radius") updateGraph({ radius: Number(value) });
    if (key === "style") updateGraph({ dasharray: value || "" });
    if (key === "layer") {
      // value === "top";
      // value === "bottom";
      // value === "holdup";
      // value === "putdown";
    }

    // 画布大小事件
    if (key === "bgcolor")
      this.command.executeSetTheme({ background: `#${value}` });

    // 设置具体尺寸
    if (key === "size") {
      const sizeMap: { [key: string]: number[] } = {
        A3: [1500, 2100],
        A4: [1050, 1500],
        A5: [750, 1050],
      };
      const [w, h] = sizeMap[value];
      this.command.setPageSize(w, h);
    }

    e.stopPropagation();
    e.preventDefault();
  }

  // dialog 弹窗的 input 事件
  public inputHandle = (e: Event, id: string) => {
    const color = (e.target as HTMLInputElement).value;
    const updateGraph = (o: IUpdateGraph) => this.command.executeUpdateGraph(o);

    if (id === "color") updateGraph({ stroke: color });
    if (id === "background") updateGraph({ fill: color });
    if (id === "bgcolor") this.command.executeSetTheme({ background: color });
    e.stopPropagation();
    e.preventDefault();
  };
}
