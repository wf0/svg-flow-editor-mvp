// 暴露对外操作API 需要经过 Command Adapt的中转，防止用户直接通过 Command 获取到内部对象
import { Draw } from "../Draw/index.ts";
import { CommandAdapt } from "./CommandAdapt.ts";

export class Command {
  // 背景相关API 关闭/开启网格线 关闭/开启水印 公用一个canvas 因此不能拆分为细项
  public executeBackground: CommandAdapt["background"];

  // 添加元件

  // 动态加载 footer 插件响应事件
  // 切换的列表 - 未实现
  // 新建页  newpages - 未实现
  // 放大 reduce
  // 重置 resize
  // 缩小 amplify
  // 模板 template
  // 全屏 fullscreen
  // 帮助 help

  constructor(draw: Draw) {
    const adapt = new CommandAdapt(draw);
    this.executeBackground = adapt.background.bind(adapt);
  }
}
