export interface IBackground {
  // 圆点
  origin?: boolean;
  originColor?: string;

  //   网格
  gridline?: boolean;
  gridlineColor?: string;

  //   水印
  watermark?: boolean;
  watermarkColor?: string;
  watermarkText?: string;
}

// 主题色
export type IThemeOpt = {
  background?: string; // 背景颜色
  stroke?: string; // 元件边框颜色
  fill?: string; // 元件填充颜色
  text?: string; // 文本颜色
  line?: string; // 线条颜色
  auxiliaryLine?: string; // 辅助线颜色
};

export type dialogTemp =
  | "echartUpdateTemp"
  | "graphInfoTemp"
  | "canvasSettingTemp"
  | "themeTemp";
