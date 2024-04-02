import { node } from "../../interface/Graph/index.ts";
import { Command } from "../Command/Command.ts";
import { Draw } from "../Draw/index.ts";
import { SVGImage } from "../Graph/Image.ts";
import { logoBase, positionBase } from "../Base64/index.ts";
import { catalogTemp } from "../Template/index.ts";
import { uploadImage } from "../../utils/index.ts";

// 元件库
export class Catalog {
  private draw: Draw;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);

    const catalog = draw.createHTMLElement("div") as HTMLDivElement;
    catalog.classList.add("sf-editor-catalog");
    draw.getRoot().appendChild(catalog);
    catalog.innerHTML = catalogTemp;

    this.draw.resize();
    // 初始化事件
    this.initEvent();
  }

  private initEvent() {
    const catalogBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-catalog") as HTMLDivElement;

    // 菜单添加展开关闭事件
    catalogBox.querySelectorAll("[command]").forEach((item) => {
      const command = item.getAttribute("command") as string;
      item.addEventListener("click", this.click.bind(this, command));
    });

    // 还需要实现 dragStart dragEnd 事件
    catalogBox.querySelectorAll("[draggable]").forEach((item) => {
      const type = item.getAttribute("type");
      item.addEventListener("dragend", (e) => this.dragend(e, type));
    });

    // 实现upload
    catalogBox
      .querySelector('[type="upload"]')
      ?.addEventListener("click", this.upload.bind(this));
  }

  /**
   * 元件库标题点击事件
   * @param command
   */
  private click(command: string) {
    const catalogBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-catalog") as HTMLDivElement;

    // 互斥，隐藏所有的节点
    catalogBox.querySelectorAll("[adapt]").forEach((i) => {
      if (i.getAttribute("adapt") === command) return;
      // @ts-ignore
      i.style.display = "none";
    });

    // 1. 根据 command 获取 adapt
    const selector = `[adapt='${command}']`;
    const adapt = catalogBox.querySelector(selector) as HTMLDivElement;

    // 处理样式上的问题
    const { display } = getComputedStyle(adapt);

    // 2. 根据 command 获取 icon
    const icon = catalogBox
      .querySelector(`[command="${command}"]`)
      ?.querySelector("div");

    icon?.classList.remove("close");

    display === "none"
      ? (adapt.style.display = "flex")
      : ((adapt.style.display = "none"), icon?.classList.add("close"));
  }

  /**
   * 元件库拖动事件
   * @param e
   * @param type
   */
  private dragend(e: Event, type: string | null) {
    const catalogBox = this.draw
      .getRoot()
      .querySelector(".sf-editor-catalog") as HTMLDivElement;

    // 获取offset
    const { offsetX, offsetY } = e as DragEvent;

    const x = offsetX - catalogBox.clientWidth + 50;
    const y = offsetY + 100;

    const typeMap: { [key: string]: node } = {
      logo: {
        type: "image",
        width: 40,
        height: 50,
        url: logoBase,
        x,
        y,
      },
      position: {
        type: "image",
        url: positionBase,
        width: 40,
        height: 50,
        x,
        y,
      },
      rect: { type: "rect", width: 150, height: 80, x, y },
      circle: { type: "ellipse", width: 50, height: 50, x, y },
      ellipse: { type: "ellipse", width: 50, height: 30, x, y },
      line: { type: "line", width: 300, height: 150, x, y },
      bar: { type: "bar", width: 300, height: 150, x, y },
      radar: { type: "radar", width: 300, height: 150, x, y },
      pie: { type: "pie", width: 300, height: 150, x, y },
    };
    this.command.executeAddGraph(typeMap[type as string]);
  }

  /**
   * 上传本地图片
   */
  private async upload() {
    const url = await uploadImage();
    new SVGImage(this.draw, url);
  }
}
