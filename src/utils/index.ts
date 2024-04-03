import { allTheme, messageInfo } from "../core/Config/index.ts";
import { IThemeOpt } from "../interface/Draw/index.ts";
import { graphInfo } from "../interface/Graph/index.ts";

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
  // 1. 先校验 theme 是否合法
  if (!allTheme[theme]) throw new Error(messageInfo.invalidParams);

  // 2. 删除原有的 style 标签
  const head = document.querySelector("head") as HTMLHeadElement;

  const oldTag = head.querySelector("#colorful_theme");

  oldTag && oldTag.remove();

  // 3. 根据入参解析样式
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
  // 添加主题色
  themeHTML += `--mainColor:#3080E9`;

  // 4. 创建新的 style

  const styleTag = document.createElement("style");

  // 给新增的 tag 一个id 应该先删除，再添加
  styleTag.setAttribute("id", "colorful_theme");
  styleTag.setAttribute("theme-name", theme);

  styleTag.innerHTML = `:root{${themeHTML}}`;

  head.appendChild(styleTag);
}

// 封装节点的类型与位置关系
// 类型1的获取点位方式
function type1(p: graphInfo, OFFSET: number) {
  const ox = p.x - OFFSET;
  const oy = p.y + p.h / 2;
  const x = p.x;
  const y = p.y + p.h / 2;
  return { ox, oy, x, y };
}
function type2(p: graphInfo, OFFSET: number) {
  const ox = p.x + p.w / 2;
  const oy = p.y - OFFSET;
  const x = p.x + p.w / 2;
  const y = p.y;
  return { ox, oy, x, y };
}
function type3(p: graphInfo, OFFSET: number) {
  const ox = p.x + p.w + OFFSET;
  const oy = p.y + p.h / 2;
  const x = p.x + p.w;
  const y = p.y + p.h / 2;
  return { ox, oy, x, y };
}
function type4(p: graphInfo, OFFSET: number) {
  const ox = p.x + p.w / 2;
  const oy = p.y + p.h + OFFSET;
  const x = p.x + p.w / 2;
  const y = p.y + p.h;
  return { ox, oy, x, y };
}

/**
 * 上传本地图片
 */
function uploadImage() {
  return new Promise<string>((resolve) => {
    const input = document.createElement("input");
    input.style.display = "none";
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", (e) => {
      var { files } = e.target as HTMLInputElement;
      const file = files && files[0];
      if (file && file.type.match("image.*")) {
        input.remove();
        resolve(toBlob(file, file.type) as string);
      }
    });
  });
}

/**
 * 将本地图片转成 blob 显示
 * @param file
 * @param type
 * @returns
 */
function toBlob(file: File, type: string) {
  let url = null;
  const blob = new Blob([file], { type });
  if (window.webkitURL !== undefined) {
    try {
      url = window.webkitURL.createObjectURL(blob);
    } catch (error) {}
  } else if (window.URL !== undefined) {
    try {
      url = window.URL.createObjectURL(blob);
    } catch (error) {}
  }
  return url;
}

//去左右空格;
function trim(s: string) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

export {
  nextTick,
  isMod,
  setTheme,
  type1,
  type2,
  type3,
  type4,
  toBlob,
  uploadImage,
  trim,
};
