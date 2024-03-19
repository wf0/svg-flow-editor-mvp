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

  private initEvent() {}
}
