// 暴露对外操作API 需要经过 Command Adapt的中转，防止用户直接通过 Command 获取到内部对象
import { Draw } from "../Draw/index.ts";
import { CommandAdapt } from "./CommandAdapt.ts";

export class Command {
  public executeBackground: CommandAdapt["background"]; // 背景相关API
  public executeAddGraph: CommandAdapt["addGraph"]; // 添加元件
  public executeDeleteGraph: CommandAdapt["deleteGraph"]; // 删除元件
  public executeFullScreen: CommandAdapt["fullScreen"]; // 全屏  API
  public executeExitFullScreen: CommandAdapt["exitFullScreen"]; // 退出 API
  public executePageScaleRecovery: CommandAdapt["pageScaleRecovery"]; // 重置 resize
  public executePageScaleMinus: CommandAdapt["pageScaleMinus"]; // 缩小 amplify
  public executePageScaleAdd: CommandAdapt["pageScaleAdd"]; // 放大 reduce
  public setPageScale: CommandAdapt["setPageScale"]; // 缩放至指定比例
  public executeSetTheme: CommandAdapt["setTheme"]; // 切换主题风格

  // 下列未标定
  // 下列未标定
  // 下列未标定
  // 下列未标定

  /** 右键菜单相关API */
  public executePaste: CommandAdapt["paste"];
  public executeCopy: CommandAdapt["copy"];
  public executeCut: CommandAdapt["cut"];
  // 撤销与重做
  public executeUndo: CommandAdapt["undo"];
  public executeRedo: CommandAdapt["redo"];
  // 层级处理
  public executeTop: CommandAdapt["top"];
  public executeBottom: CommandAdapt["bottom"];
  public executeHoldUp: CommandAdapt["holdup"];
  public executePutDown: CommandAdapt["putdown"];
  // 分组
  public executeGroup: CommandAdapt["group"];
  public executeUnGroup: CommandAdapt["ungroup"];

  /** operation 相关操作API */
  public executeNewFile: CommandAdapt["newFile"];
  public executeReName: CommandAdapt["rename"];
  public executePreview: CommandAdapt["preview"];
  public executeSave: CommandAdapt["save"];
  public executeSaveAs: CommandAdapt["saveas"];
  public executeShare: CommandAdapt["share"];
  public executeRelease: CommandAdapt["release"];
  public executePrint: CommandAdapt["print"];
  public executeHistory: CommandAdapt["history"];
  public executeClose: CommandAdapt["close"];
  public executeBeautify: CommandAdapt["beautify"];
  public executeLock: CommandAdapt["lock"];
  public executeUnLock: CommandAdapt["unlock"];

  constructor(draw: Draw) {
    const adapt = new CommandAdapt(draw);

    this.executeBackground = adapt.background.bind(adapt); // 背景相关
    this.executeAddGraph = adapt.addGraph.bind(adapt); // 添加元件
    this.executeDeleteGraph = adapt.deleteGraph.bind(adapt); // 删除元件
    this.executePageScaleRecovery = adapt.pageScaleRecovery.bind(adapt); // 重置
    this.executePageScaleMinus = adapt.pageScaleMinus.bind(adapt); // 缩小
    this.executePageScaleAdd = adapt.pageScaleAdd.bind(adapt); // 放大
    this.setPageScale = adapt.setPageScale.bind(adapt); // 指定缩放比例
    this.executeFullScreen = adapt.fullScreen.bind(adapt); // 进入全屏
    this.executeExitFullScreen = adapt.exitFullScreen.bind(adapt); // 退出全屏
    this.executeSetTheme = adapt.setTheme.bind(this); // 切换主题风格

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

    /** operation 相关操作API */
    this.executeNewFile = adapt.newFile.bind(adapt);
    this.executeReName = adapt.rename.bind(adapt);
    this.executePreview = adapt.preview.bind(adapt);
    this.executeSave = adapt.save.bind(adapt);
    this.executeSaveAs = adapt.saveas.bind(adapt);
    this.executeShare = adapt.share.bind(adapt);
    this.executeRelease = adapt.release.bind(adapt);
    this.executePrint = adapt.print.bind(adapt);
    this.executeHistory = adapt.history.bind(adapt);
    this.executeClose = adapt.close.bind(adapt);
    this.executeBeautify = adapt.beautify.bind(adapt);
    this.executeLock = adapt.lock.bind(adapt);
    this.executeUnLock = adapt.unlock.bind(adapt);
  }
}
