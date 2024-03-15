import { Draw } from "../Draw/index.ts";

// 全局API
export class Global {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  // 销毁
  public destroy() {
    this.draw.destroy();
  }

  // reset
  public reset() {
    console.log("global api reset.");
  }
}
