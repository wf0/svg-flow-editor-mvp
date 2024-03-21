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
      item.addEventListener("click", (e) => {
        // 根据 command 获取 adapt
        // 1. 获取当前的状态
        const adapt = catalogBox.querySelector(
          `[adapt='${command}']`
        ) as HTMLDivElement;

        // 互斥，隐藏所有的节点
        catalogBox
          .querySelectorAll("[adapt]")
          // @ts-ignore
          .forEach((i) => (i.style.display = "none"));

        // 处理样式上的问题
        const { display } = getComputedStyle(adapt);
        const icon = item.querySelector("div");

        icon?.classList.remove("close");

        display === "none"
          ? (adapt.style.display = "flex")
          : ((adapt.style.display = "none"), icon?.classList.add("close"));

        // 阻止默认事件
        e.stopPropagation();
        e.preventDefault();
      });
    });

    // 还需要实现 dragStart dragEnd 事件
    catalogBox.querySelectorAll("[draggable]").forEach((item) => {
      // 获取 type
      const type = item.getAttribute("type");
      (item as HTMLDivElement).addEventListener("dragend", (e) =>
        this.dragend(e, type)
      );
    });
  }

  private dragend(e: DragEvent, type: string | null) {
    const catalogBox = this.draw
      .getRoot()
      .querySelector('[class="sf-editor-catalog"]') as HTMLDivElement;

    // 获取offset
    const { offsetX, offsetY } = e;
    this.command.executeAddGraph({
      type: "rect",
      width: 100,
      height: 100,
      x: offsetX - catalogBox.clientWidth,
      y: offsetY,
    });
  }
}
