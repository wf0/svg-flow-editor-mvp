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
  public setTheme: CommandAdapt["setTheme"]; // 切换主题风格
  public executeSearchReplace: CommandAdapt["searchReplace"]; // 搜索替换
  public executeSearchPre: CommandAdapt["searchPre"]; // 搜索上一处
  public executeSearchNext: CommandAdapt["searchNext"]; // 搜索下一处
  public executeReplace: CommandAdapt["replace"]; // 替换当前
  public executeReplaceAll: CommandAdapt["replaceAll"]; // 替换全部
  public executeUpdateGraph: CommandAdapt["updateGraph"]; /** 更新元件的信息-stroke、fill、线宽、圆角 */
  public executeTop: CommandAdapt["top"]; // 置于顶层
  public executeBottom: CommandAdapt["bottom"]; // 置于底层
  public executeHoldUp: CommandAdapt["holdup"]; // 上移一层
  public executePutDown: CommandAdapt["putdown"]; // 下移一层
  public executeUpdateText: CommandAdapt["updateText"]; // 页面对文本的调整
  public setPageSize: CommandAdapt["setPageSize"]; // 设置页面大小
  public executeScreenShot: CommandAdapt["screenShot"]; // 截图

  // 下列未标定
  // 下列未标定
  // 下列未标定
  // 下列未标定

  public executeOpenDialog: CommandAdapt["openDialog"]; // 打开弹窗
  // public executeCloseDialog: CommandAdapt["closeDialog"]; // 关闭弹窗

  // 设置用户头像
  public executeSetAvatar: CommandAdapt["setAvatar"];

  /** 右键菜单相关API */
  public executePaste: CommandAdapt["paste"];
  public executeCopy: CommandAdapt["copy"];
  public executeCut: CommandAdapt["cut"];
  // 撤销与重做
  public executeUndo: CommandAdapt["undo"];
  public executeRedo: CommandAdapt["redo"];

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

  // 锁定
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
    this.setTheme = adapt.setTheme.bind(this); // 切换主题风格
    this.executeSearchReplace = adapt.searchReplace.bind(adapt); // 搜索替换
    this.executeSearchPre = adapt.searchPre.bind(adapt); // 搜索上一处
    this.executeSearchNext = adapt.searchNext.bind(adapt); // 搜索下一处
    this.executeReplace = adapt.replace.bind(adapt); // 替换当前
    this.executeReplaceAll = adapt.replaceAll.bind(adapt); // 替换全部
    this.executeUpdateGraph = adapt.updateGraph.bind(adapt); // 更新元件信息
    this.executeTop = adapt.top.bind(adapt); // 置于顶层
    this.executeBottom = adapt.bottom.bind(adapt); // 置于底层
    this.executeHoldUp = adapt.holdup.bind(adapt); // 上移一层
    this.executePutDown = adapt.putdown.bind(adapt); // 下移一层
    this.executeUpdateText = adapt.updateText.bind(adapt); // 页面对文本的调整
    this.setPageSize = adapt.setPageSize.bind(adapt); // 设置页面大小
    this.executeOpenDialog = adapt.openDialog.bind(adapt); // 打开弹窗
    this.executeScreenShot = adapt.screenShot.bind(adapt); // 截图

    // 右键菜单相关事件
    this.executePaste = adapt.paste.bind(adapt);
    this.executeCopy = adapt.copy.bind(adapt);
    this.executeCut = adapt.cut.bind(adapt);
    this.executeUndo = adapt.undo.bind(adapt);
    this.executeRedo = adapt.redo.bind(adapt);
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

    this.executeSetAvatar = adapt.setAvatar.bind(adapt);
  }
}
