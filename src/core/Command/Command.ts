// 暴露对外操作API 需要经过 Command Adapt的中转，防止用户直接通过 Command 获取到内部对象
import { Draw } from "../Draw/index.ts";
import { CommandAdapt } from "./CommandAdapt.ts";

export class Command {
  // 背景相关API 关闭/开启网格线 关闭/开启水印 公用一个canvas 因此不能拆分为细项
  public executeBackground: CommandAdapt["background"];

  // 添加元件

  // 切换的列表 - 未实现
  // 新建页  newpages - 未实现

  // 模板 template
  // 全屏 fullscreen
  public executeFullScreen: CommandAdapt["fullScreen"];
  public executeExitFullScreen: CommandAdapt["exitFullScreen"];

  // 帮助 help

  // 页面缩放
  public executePageScaleRecovery: CommandAdapt["pageScaleRecovery"]; // 重置 resize
  public executePageScaleMinus: CommandAdapt["pageScaleMinus"]; // 缩小 amplify
  public executePageScaleAdd: CommandAdapt["pageScaleAdd"]; // 放大 reduce
  public setPageScale: CommandAdapt["setPageScale"]; // 缩放至指定比例

  constructor(draw: Draw) {
    const adapt = new CommandAdapt(draw);
    // 背景相关
    this.executeBackground = adapt.background.bind(adapt);
    // 页面缩放相关
    this.executePageScaleRecovery = adapt.pageScaleRecovery.bind(adapt); // 重置
    this.executePageScaleMinus = adapt.pageScaleMinus.bind(adapt); // 缩小
    this.executePageScaleAdd = adapt.pageScaleAdd.bind(adapt); // 放大
    this.setPageScale = adapt.setPageScale.bind(adapt); // 指定缩放比例
    // 全屏相关
    this.executeFullScreen = adapt.fullScreen.bind(adapt);
    this.executeExitFullScreen = adapt.exitFullScreen.bind(adapt);
  }
}
