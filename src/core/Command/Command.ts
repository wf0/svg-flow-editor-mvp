// 暴露对外操作API 需要经过 Command Adapt的中转，防止用户直接通过 Command 获取到内部对象
import { Draw } from "../Draw/index.ts";
import { CommandAdapt } from "./CommandAdapt.ts";

export class Command {
  // 背景相关API 关闭/开启网格线 关闭/开启水印 公用一个canvas 因此不能拆分为细项
  public executeBackground: CommandAdapt["background"];

  // 添加元件
  // 删除元件

  // 全屏 退出 API
  public executeFullScreen: CommandAdapt["fullScreen"];
  public executeExitFullScreen: CommandAdapt["exitFullScreen"];

  // 页面缩放 API
  public executePageScaleRecovery: CommandAdapt["pageScaleRecovery"]; // 重置 resize
  public executePageScaleMinus: CommandAdapt["pageScaleMinus"]; // 缩小 amplify
  public executePageScaleAdd: CommandAdapt["pageScaleAdd"]; // 放大 reduce
  public setPageScale: CommandAdapt["setPageScale"]; // 缩放至指定比例

  // 右键菜单相关API
  public executePaste: CommandAdapt["paste"];
  public executeCopy: CommandAdapt["copy"];
  public executeCut: CommandAdapt["cut"];
  public executeUndo: CommandAdapt["undo"];
  public executeRedo: CommandAdapt["redo"];
  public executeTop: CommandAdapt["top"];
  public executeBottom: CommandAdapt["bottom"];
  public executeHoldUp: CommandAdapt["holdup"];
  public executePutDown: CommandAdapt["putdown"];
  public executeGroup: CommandAdapt["group"];
  public executeUnGroup: CommandAdapt["ungroup"];

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

    // 右键菜单相关事件
    this.executePaste = adapt.paste.bind(adapt);
    this.executeCopy = adapt.copy.bind(adapt);
    this.executeCut = adapt.cut.bind(adapt);
    this.executeUndo = adapt.undo.bind(adapt);
    this.executeRedo = adapt.redo.bind(adapt);
    this.executeTop = adapt.top.bind(adapt);
    this.executeBottom = adapt.bottom.bind(adapt);
    this.executeHoldUp = adapt.holdup.bind(adapt);
    this.executePutDown = adapt.putdown.bind(adapt);
    this.executeGroup = adapt.group.bind(adapt);
    this.executeUnGroup = adapt.ungroup.bind(adapt);
  }
}
