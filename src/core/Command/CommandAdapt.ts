import { Draw } from "../Draw/index.ts";

// Command Adapt API 操作核心库
export class CommandAdapt {
  private draw: Draw;

  constructor(draw: Draw) {
    this.draw = draw;
  }

  public background() {
    console.log(this.draw);
  }
}
