import { nextTick } from "../../../utils/index.ts";
import { Command } from "../../Command/Command.ts";
import { Draw } from "../../Draw/index.ts";

export class CatalogEvent {
  private draw: Draw;
  private command: Command;

  constructor(draw: Draw) {
    this.draw = draw;
    this.command = new Command(draw);
    // 初始化事件
    this.initEvent();
  }

  private initEvent() {
    const catalogBox = this.draw
      .getRoot()
      .querySelector('[class="sf-editor-catalog"]') as HTMLDivElement;

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
      .querySelector('[class="sf-editor-catalog"]') as HTMLDivElement;

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
      .querySelector('[class="sf-editor-catalog"]') as HTMLDivElement;

    // 获取offset
    const { offsetX, offsetY } = e as DragEvent;
    this.command.executeAddGraph({
      type: "rect",
      width: 100,
      height: 100,
      x: offsetX - catalogBox.clientWidth,
      y: offsetY,
    });
  }

  /**
   * 上传本地图片
   */
  private upload() {
    const input = this.draw.createHTMLElement("input");
    input.style.display = "none";
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", (e) => {
      var { files } = e.target as HTMLInputElement;
      const file = files && files[0];
      if (file && file.type.match("image.*")) {
        var reader = new FileReader();
        reader.onload = (e) => {
          var img = new Image();
          img.onload = () => {
            // 这里可以拿到图片的原始尺寸， width height 在创建图片的时候有用
            // url this.toBlob(file, file.type)
            // width height 在创建图片的时候有用
            input.remove();
          };
          // @ts-ignore
          img.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    });
  }

  /**
   * 将本地图片转成 blob 显示
   * @param file
   * @param type
   * @returns
   */
  private toBlob(file: File, type: string) {
    let url = null;
    const blob = new Blob([file], { type });
    if (window.webkitURL !== undefined) {
      try {
        url = window.webkitURL.createObjectURL(blob);
      } catch (error) {}
    } else if (window.URL !== undefined) {
      try {
        url = window.URL.createObjectURL(blob);
      } catch (error) {}
    }
    return url;
  }
}
