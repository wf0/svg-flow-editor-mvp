import { IBackground } from "../../interface/Draw/index.ts";
import { IUpdateGraph } from "../../interface/Graph/index.ts";
import { Command } from "../Command/Command.ts";
import {
  canvasSettingTemp,
  graphInfoTemp,
  searchReplaceTemp,
  themeTemp,
} from "../Template/index.ts";
import { Draw } from "./index.ts";

type dialogTemp =
  | "echartUpdateTemp"
  | "graphInfoTemp"
  | "canvasSettingTemp"
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
    };
    const main = this.dialogBox.querySelector(".main") as HTMLDivElement;
    main.innerHTML = map[temp];

    this.addEvent();
  }

  public closeDialog() {
    this.dialogBox.remove();
  }

  // 给当前 span 添加事件
  private addEvent() {
    // 获取dialog对象
    const dialog = this.draw.getDialogDraw();

    // 添加事件
    const dialogMain = this.draw.getRoot().querySelector(".sf-editor-dialog");

    // 给 span 添加事件
    dialogMain?.querySelectorAll("[command]").forEach((item) => {
      const command = item.getAttribute("command") as string;
      item.addEventListener("click", (e) => dialog.spanClickHandle(e, command));
    });

    // 给 input 绑定 change 事件
    dialogMain?.querySelectorAll("input").forEach((input) => {
      const id = input.getAttribute("id") as string;
      input.addEventListener("change", (e) => dialog.inputHandle(e, id));
    });
  }

  // 设置网格水印颜色相干方法
  private setColor(command: string, value: string) {
    // 1. 获取当前 canvas 绘制状态
    const canvasDraw = this.draw.getCanvasDraw();

    const oldVal = canvasDraw.getBackground();

    var payload: IBackground = {};
    if (command === "gridcolor")
      payload = Object.assign(oldVal, { gridlineColor: value });

    if (command === "origincolor")
      payload = Object.assign(oldVal, { originColor: value });

    if (command === "watercolor")
      payload = Object.assign(oldVal, { watermarkColor: value });

    this.command.executeBackground(payload);
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
    // if (key === "layer") { }

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
    if (["gridcolor", "origincolor", "watercolor"].find((i) => i === key))
      this.setColor(key, `#${value}`);

    e.stopPropagation();
    e.preventDefault();
  }

  // dialog 弹窗的 input 事件
  public inputHandle = (e: Event, id: string) => {
    console.log(id);
    const color = (e.target as HTMLInputElement).value;
    const updateGraph = (o: IUpdateGraph) => this.command.executeUpdateGraph(o);

    if (id === "color") updateGraph({ stroke: color });
    if (id === "background") updateGraph({ fill: color });
    if (id === "bgcolor") this.command.executeSetTheme({ background: color });
    if (id === "gridcolor") this.setColor(id, color);
    if (id === "origincolor") this.setColor(id, color);
    if (id === "watercolor") this.setColor(id, color);
    e.stopPropagation();
    e.preventDefault();
  };

  // 创建搜索替换框
  public createSearchReplace(text: string) {
    // 1. 关闭 抽屉
    this.closeDialog();
    const root = this.draw.getRoot();

    const searchBox = root.querySelector("div.sf-editor-search");
    if (searchBox) {
      // 如果存在，则需要修改属性即可
      // 5. 如果用户有文本，则添加到搜索框
      const input = searchBox.querySelector("input#search") as HTMLInputElement;
      input.value = text;

      // 6. 获取焦点
      input.focus();
    } else {
      // 2. 创建搜索替换框
      const box = this.draw.createHTMLElement("div") as HTMLDivElement;
      box.classList.add("sf-editor-search");

      // 3. 添加模板
      box.innerHTML = searchReplaceTemp;

      // 4. 添加到 root 下
      root.appendChild(box);
      box
        .querySelector(".icon-xgb")
        ?.addEventListener("click", () => box.remove());

      // 5. 如果用户有文本，则添加到搜索框
      const input = box.querySelector("input#search") as HTMLInputElement;
      input.value = text;

      // 6. 获取焦点
      input.focus();
    }
  }
}
