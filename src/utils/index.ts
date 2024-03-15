import { allTheme } from "../core/Config/index.ts";

type IThemeOpt = {
  [key: string]: string;
  background: string; // 背景颜色
  stroke: string; // 元件边框颜色
  fill: string; // 元件填充颜色
  text: string; // 文本颜色
  line: string; // 线条颜色
  auxiliaryLine: string; // 辅助线颜色
};

// 封装 nextTick()
function nextTick(fn: Function) {
  const callback = window.requestIdleCallback || window.setTimeout;
  callback(() => {
    fn();
  });
}

const isApple =
  typeof navigator !== "undefined" && /Mac OS X/.test(navigator.userAgent);

// const isIOS =
//   typeof navigator !== "undefined" && /iPad|iPhone/.test(navigator.userAgent);

function isMod(evt: KeyboardEvent | MouseEvent) {
  return isApple ? evt.metaKey : evt.ctrlKey;
}

// 封装主题变换
function setTheme(theme: string, option?: IThemeOpt) {
  // 方案二：应该使用 style标签实现更好，不然代码看起来冗余
  // 删除原有的 style 标签
  const head = document.querySelector("head") as HTMLHeadElement;

  const oldTag = head.querySelector("#colorful_theme");

  // 存在则删除该标签
  oldTag && oldTag.remove();

  var themeHTML = "";

  // 将用户的配置覆盖默认 theme1
  const opt = Object.assign(allTheme[theme], option);

  // 动态获取颜色
  for (const key in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, key)) {
      const value = opt[key];
      themeHTML += `--${key}:${value};`;
    }
  }

  const styleTag = document.createElement("style");

  // 给新增的 tag 一个id 应该先删除，再添加
  styleTag.setAttribute("id", "colorful_theme");

  styleTag.innerHTML = `:root{${themeHTML}}`;

  head.appendChild(styleTag);
}

export { nextTick, isMod, setTheme };
