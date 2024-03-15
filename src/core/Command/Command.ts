// 暴露对外操作API 需要经过 Command Adapt的中转，防止用户直接通过 Command 获取到内部对象
import { Draw } from "../Draw/index.ts";
import { CommandAdapt } from "./CommandAdapt.ts";

export class Command {
  // 添加线条
  constructor(draw: Draw) {
    const adapt = new CommandAdapt(draw);
  }
}
