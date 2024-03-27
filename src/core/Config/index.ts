// 项目异常提示
const messageInfo = {
  selectorEmpty: "The provided selector is empty.",
  // 选择器不可用，你可能需要等待DOM渲染完成。
  selectorError:
    "The selector is not Available.Maybe you need to wait for Dom rendering to completed.",
  invalidParams: "Invalid input parameter.",
  optionError: "The initialization Echarts parameter cannot be empty.",
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
// 饼图
export const pieOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

// 柱状图
export const barOption = {
  grid: {
    top: 10,
    left: 50,
    bottom: 20,
    right: 10,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};

// 折线图
export const lineOption = {
  grid: {
    top: 10,
    left: 50,
    bottom: 20,
    right: 10,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

// 散点图
export const scatterOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: "scatter",
    },
  ],
};

export { allTheme, waterMarkText, xmlns, messageInfo };
