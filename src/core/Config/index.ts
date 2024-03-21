// 项目异常提示
const messageInfo = {
  selectorEmpty: "The provided selector is empty.",
  // 选择器不可用，你可能需要等待DOM渲染完成。
  selectorError:
    "The selector is not Available.Maybe you need to wait for Dom rendering to completed.",
  invalidParams: "Invalid input parameter.",
};

// 默认的水印
const waterMarkText = "sfEditor";

// 项目 svg xmlns
const xmlns = "http://www.w3.org/2000/svg";

const colorful_theme1 = {
  background: "#fff", // 背景颜色
  stroke: "#000", // 元件边框颜色
  fill: "#fff", // 元件填充颜色
  text: "#000", // 文本颜色
  line: "#000", // 线条颜色
  auxiliaryLine: "#000", // 辅助线颜色
};

const colorful_theme2 = {
  background: "#fff", // 背景颜色
  stroke: "#067bef", // 元件边框颜色
  fill: "#212930", // 元件填充颜色
  text: "#fff", // 文本颜色
  line: "#000", // 线条颜色
  auxiliaryLine: "#000", // 辅助线颜色
};

const colorful_theme3 = {
  background: "#fff", // 背景颜色
  stroke: "#067bef", // 元件边框颜色
  fill: "#FFFFEE", // 元件填充颜色
  text: "#000", // 文本颜色
  line: "#000", // 线条颜色
  auxiliaryLine: "#000", // 辅助线颜色
};
const colorful_theme4 = {
  background: "#fff", // 背景颜色
  stroke: "#067bef", // 元件边框颜色
  fill: "#D6D6D6", // 元件填充颜色
  text: "#000", // 文本颜色
  line: "#000", // 线条颜色
  auxiliaryLine: "#000", // 辅助线颜色
};
const colorful_theme5 = {
  background: "#363332", // 背景颜色
  stroke: "#067bef", // 元件边框颜色
  fill: "#F4B49D", // 元件填充颜色
  text: "#7f2f24", // 文本颜色
  line: "#8F493F", // 线条颜色
  auxiliaryLine: "#000", // 辅助线颜色
};

// 导出主题
const allTheme: { [key: string]: { [key: string]: string } } = {
  colorful_theme1,
  colorful_theme2,
  colorful_theme3,
  colorful_theme4,
  colorful_theme5,
};

export { allTheme, waterMarkText, xmlns, messageInfo };
