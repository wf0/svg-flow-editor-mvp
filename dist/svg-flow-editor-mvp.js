var Hi = Object.defineProperty;
var Ii = (t, n, e) => n in t ? Hi(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var f = (t, n, e) => (Ii(t, typeof n != "symbol" ? n + "" : n, e), e);
class Mi {
  constructor(n) {
    f(this, "draw");
    this.draw = n;
  }
  background() {
    console.log(this.draw);
  }
  // 页面缩放
  pageScaleRecovery() {
    this.draw.getEditorEvent().scalePage("Recovery");
  }
  pageScaleMinus() {
    this.draw.getEditorEvent().scalePage("Minus");
  }
  pageScaleAdd() {
    this.draw.getEditorEvent().scalePage("Add");
  }
  // 设置指定值
  setPageScale(n) {
    if (!n || typeof n != "number")
      return;
    this.draw.getEditorEvent().scalePage("Appoint", n);
  }
  // 全屏
  fullScreen() {
    const n = this.draw.getRoot();
    n.requestFullscreen && n.requestFullscreen();
    const e = setTimeout(() => {
      this.draw.getCanvasDraw().resetCanvas(), clearTimeout(e);
    }, 100);
  }
  exitFullScreen() {
    try {
      document.exitFullscreen();
      const n = setTimeout(() => {
        this.draw.getCanvasDraw().resetCanvas(), clearTimeout(n);
      }, 100);
    } catch {
    }
  }
  /** 右键菜单事件响应 */
  paste() {
  }
  copy() {
  }
  cut() {
  }
  undo() {
  }
  redo() {
  }
  // 置于顶层
  top() {
    const n = this.draw.getGraphEvent().getSelected();
    if (!n)
      return;
    const e = this.draw.getGraphEvent().getAllGraphMain();
    var i = [];
    e.forEach((s) => i.push(~~s.style.zIndex));
    const a = Math.max.apply(Math, i), r = ~~n.style.zIndex;
    r <= a && (n.style.zIndex = r === 1 ? r.toString() : (r + 2).toString());
  }
  // 置于底层
  bottom() {
    const n = this.draw.getGraphEvent().getSelected();
    if (!n)
      return;
    const e = this.draw.getGraphEvent().getAllGraphMain();
    var i = [];
    e.forEach((s) => i.push(~~s.style.zIndex));
    const a = Math.min.apply(Math, i), r = ~~n.style.zIndex;
    r >= a && (n.style.zIndex = r === 1 ? r.toString() : (r - 2).toString());
  }
  // 上移一层
  holdup() {
    const n = this.draw.getGraphEvent().getSelected();
    if (!n)
      return;
    const e = ~~n.style.zIndex;
    n.style.zIndex = (e + 1).toString();
  }
  // 下移一层
  putdown() {
    const n = this.draw.getGraphEvent().getSelected();
    if (!n)
      return;
    const e = ~~n.style.zIndex;
    n.style.zIndex = e === 1 ? e.toString() : (e - 1).toString();
  }
  group() {
  }
  ungroup() {
  }
}
class te {
  constructor(n) {
    // 背景相关API 关闭/开启网格线 关闭/开启水印 公用一个canvas 因此不能拆分为细项
    f(this, "executeBackground");
    // 添加元件
    // 删除元件
    // 全屏 退出 API
    f(this, "executeFullScreen");
    f(this, "executeExitFullScreen");
    // 页面缩放 API
    f(this, "executePageScaleRecovery");
    // 重置 resize
    f(this, "executePageScaleMinus");
    // 缩小 amplify
    f(this, "executePageScaleAdd");
    // 放大 reduce
    f(this, "setPageScale");
    // 缩放至指定比例
    // 右键菜单相关API
    f(this, "executePaste");
    f(this, "executeCopy");
    f(this, "executeCut");
    f(this, "executeUndo");
    f(this, "executeRedo");
    f(this, "executeTop");
    f(this, "executeBottom");
    f(this, "executeHoldUp");
    f(this, "executePutDown");
    f(this, "executeGroup");
    f(this, "executeUnGroup");
    const e = new Mi(n);
    this.executeBackground = e.background.bind(e), this.executePageScaleRecovery = e.pageScaleRecovery.bind(e), this.executePageScaleMinus = e.pageScaleMinus.bind(e), this.executePageScaleAdd = e.pageScaleAdd.bind(e), this.setPageScale = e.setPageScale.bind(e), this.executeFullScreen = e.fullScreen.bind(e), this.executeExitFullScreen = e.exitFullScreen.bind(e), this.executePaste = e.paste.bind(e), this.executeCopy = e.copy.bind(e), this.executeCut = e.cut.bind(e), this.executeUndo = e.undo.bind(e), this.executeRedo = e.redo.bind(e), this.executeTop = e.top.bind(e), this.executeBottom = e.bottom.bind(e), this.executeHoldUp = e.holdup.bind(e), this.executePutDown = e.putdown.bind(e), this.executeGroup = e.group.bind(e), this.executeUnGroup = e.ungroup.bind(e);
  }
}
const en = {
  selectorEmpty: "The provided selector is empty.",
  // 选择器不可用，你可能需要等待DOM渲染完成。
  selectorError: "The selector is not Available.Maybe you need to wait for Dom rendering to completed."
}, Bi = "sfEditor", $i = "http://www.w3.org/2000/svg", Pi = {
  background: "#fff",
  // 背景颜色
  stroke: "#000",
  // 元件边框颜色
  fill: "#fff",
  // 元件填充颜色
  text: "#000",
  // 文本颜色
  line: "#000",
  // 线条颜色
  auxiliaryLine: "#000"
  // 辅助线颜色
}, Oi = {
  background: "#fff",
  // 背景颜色
  stroke: "#067bef",
  // 元件边框颜色
  fill: "#212930",
  // 元件填充颜色
  text: "#fff",
  // 文本颜色
  line: "#000",
  // 线条颜色
  auxiliaryLine: "#000"
  // 辅助线颜色
}, Ni = {
  background: "#fff",
  // 背景颜色
  stroke: "#067bef",
  // 元件边框颜色
  fill: "#FFFFEE",
  // 元件填充颜色
  text: "#000",
  // 文本颜色
  line: "#000",
  // 线条颜色
  auxiliaryLine: "#000"
  // 辅助线颜色
}, Fi = {
  background: "#fff",
  // 背景颜色
  stroke: "#067bef",
  // 元件边框颜色
  fill: "#D6D6D6",
  // 元件填充颜色
  text: "#000",
  // 文本颜色
  line: "#000",
  // 线条颜色
  auxiliaryLine: "#000"
  // 辅助线颜色
}, Ui = {
  background: "#363332",
  // 背景颜色
  stroke: "#067bef",
  // 元件边框颜色
  fill: "#F4B49D",
  // 元件填充颜色
  text: "#7f2f24",
  // 文本颜色
  line: "#8F493F",
  // 线条颜色
  auxiliaryLine: "#000"
  // 辅助线颜色
}, Zi = {
  colorful_theme1: Pi,
  colorful_theme2: Oi,
  colorful_theme3: Ni,
  colorful_theme4: Fi,
  colorful_theme5: Ui
};
function nt(t) {
  (window.requestIdleCallback || window.setTimeout)(() => {
    t();
  });
}
const Gi = typeof navigator < "u" && /Mac OS X/.test(navigator.userAgent);
function qi(t) {
  return Gi ? t.metaKey : t.ctrlKey;
}
function Yi(t, n) {
  const e = document.querySelector("head"), i = e.querySelector("#colorful_theme");
  i && i.remove();
  var a = "";
  const r = Object.assign(Zi[t], n);
  for (const o in r)
    if (Object.prototype.hasOwnProperty.call(r, o)) {
      const d = r[o];
      a += `--${o}:${d};`;
    }
  const s = document.createElement("style");
  s.setAttribute("id", "colorful_theme"), s.innerHTML = `:root{${a}}`, e.appendChild(s);
}
var ji = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Wi = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
const qt = Wi, Xn = {};
for (const t of Object.keys(qt))
  Xn[qt[t]] = t;
const y = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
var Wn = y;
for (const t of Object.keys(y)) {
  if (!("channels" in y[t]))
    throw new Error("missing channels property: " + t);
  if (!("labels" in y[t]))
    throw new Error("missing channel labels property: " + t);
  if (y[t].labels.length !== y[t].channels)
    throw new Error("channel and label counts mismatch: " + t);
  const { channels: n, labels: e } = y[t];
  delete y[t].channels, delete y[t].labels, Object.defineProperty(y[t], "channels", { value: n }), Object.defineProperty(y[t], "labels", { value: e });
}
y.rgb.hsl = function(t) {
  const n = t[0] / 255, e = t[1] / 255, i = t[2] / 255, a = Math.min(n, e, i), r = Math.max(n, e, i), s = r - a;
  let o, d;
  r === a ? o = 0 : n === r ? o = (e - i) / s : e === r ? o = 2 + (i - n) / s : i === r && (o = 4 + (n - e) / s), o = Math.min(o * 60, 360), o < 0 && (o += 360);
  const l = (a + r) / 2;
  return r === a ? d = 0 : l <= 0.5 ? d = s / (r + a) : d = s / (2 - r - a), [o, d * 100, l * 100];
};
y.rgb.hsv = function(t) {
  let n, e, i, a, r;
  const s = t[0] / 255, o = t[1] / 255, d = t[2] / 255, l = Math.max(s, o, d), c = l - Math.min(s, o, d), u = function(g) {
    return (l - g) / 6 / c + 1 / 2;
  };
  return c === 0 ? (a = 0, r = 0) : (r = c / l, n = u(s), e = u(o), i = u(d), s === l ? a = i - e : o === l ? a = 1 / 3 + n - i : d === l && (a = 2 / 3 + e - n), a < 0 ? a += 1 : a > 1 && (a -= 1)), [
    a * 360,
    r * 100,
    l * 100
  ];
};
y.rgb.hwb = function(t) {
  const n = t[0], e = t[1];
  let i = t[2];
  const a = y.rgb.hsl(t)[0], r = 1 / 255 * Math.min(n, Math.min(e, i));
  return i = 1 - 1 / 255 * Math.max(n, Math.max(e, i)), [a, r * 100, i * 100];
};
y.rgb.cmyk = function(t) {
  const n = t[0] / 255, e = t[1] / 255, i = t[2] / 255, a = Math.min(1 - n, 1 - e, 1 - i), r = (1 - n - a) / (1 - a) || 0, s = (1 - e - a) / (1 - a) || 0, o = (1 - i - a) / (1 - a) || 0;
  return [r * 100, s * 100, o * 100, a * 100];
};
function Vi(t, n) {
  return (t[0] - n[0]) ** 2 + (t[1] - n[1]) ** 2 + (t[2] - n[2]) ** 2;
}
y.rgb.keyword = function(t) {
  const n = Xn[t];
  if (n)
    return n;
  let e = 1 / 0, i;
  for (const a of Object.keys(qt)) {
    const r = qt[a], s = Vi(t, r);
    s < e && (e = s, i = a);
  }
  return i;
};
y.keyword.rgb = function(t) {
  return qt[t];
};
y.rgb.xyz = function(t) {
  let n = t[0] / 255, e = t[1] / 255, i = t[2] / 255;
  n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92, e = e > 0.04045 ? ((e + 0.055) / 1.055) ** 2.4 : e / 12.92, i = i > 0.04045 ? ((i + 0.055) / 1.055) ** 2.4 : i / 12.92;
  const a = n * 0.4124 + e * 0.3576 + i * 0.1805, r = n * 0.2126 + e * 0.7152 + i * 0.0722, s = n * 0.0193 + e * 0.1192 + i * 0.9505;
  return [a * 100, r * 100, s * 100];
};
y.rgb.lab = function(t) {
  const n = y.rgb.xyz(t);
  let e = n[0], i = n[1], a = n[2];
  e /= 95.047, i /= 100, a /= 108.883, e = e > 8856e-6 ? e ** (1 / 3) : 7.787 * e + 16 / 116, i = i > 8856e-6 ? i ** (1 / 3) : 7.787 * i + 16 / 116, a = a > 8856e-6 ? a ** (1 / 3) : 7.787 * a + 16 / 116;
  const r = 116 * i - 16, s = 500 * (e - i), o = 200 * (i - a);
  return [r, s, o];
};
y.hsl.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, i = t[2] / 100;
  let a, r, s;
  if (e === 0)
    return s = i * 255, [s, s, s];
  i < 0.5 ? a = i * (1 + e) : a = i + e - i * e;
  const o = 2 * i - a, d = [0, 0, 0];
  for (let l = 0; l < 3; l++)
    r = n + 1 / 3 * -(l - 1), r < 0 && r++, r > 1 && r--, 6 * r < 1 ? s = o + (a - o) * 6 * r : 2 * r < 1 ? s = a : 3 * r < 2 ? s = o + (a - o) * (2 / 3 - r) * 6 : s = o, d[l] = s * 255;
  return d;
};
y.hsl.hsv = function(t) {
  const n = t[0];
  let e = t[1] / 100, i = t[2] / 100, a = e;
  const r = Math.max(i, 0.01);
  i *= 2, e *= i <= 1 ? i : 2 - i, a *= r <= 1 ? r : 2 - r;
  const s = (i + e) / 2, o = i === 0 ? 2 * a / (r + a) : 2 * e / (i + e);
  return [n, o * 100, s * 100];
};
y.hsv.rgb = function(t) {
  const n = t[0] / 60, e = t[1] / 100;
  let i = t[2] / 100;
  const a = Math.floor(n) % 6, r = n - Math.floor(n), s = 255 * i * (1 - e), o = 255 * i * (1 - e * r), d = 255 * i * (1 - e * (1 - r));
  switch (i *= 255, a) {
    case 0:
      return [i, d, s];
    case 1:
      return [o, i, s];
    case 2:
      return [s, i, d];
    case 3:
      return [s, o, i];
    case 4:
      return [d, s, i];
    case 5:
      return [i, s, o];
  }
};
y.hsv.hsl = function(t) {
  const n = t[0], e = t[1] / 100, i = t[2] / 100, a = Math.max(i, 0.01);
  let r, s;
  s = (2 - e) * i;
  const o = (2 - e) * a;
  return r = e * a, r /= o <= 1 ? o : 2 - o, r = r || 0, s /= 2, [n, r * 100, s * 100];
};
y.hwb.rgb = function(t) {
  const n = t[0] / 360;
  let e = t[1] / 100, i = t[2] / 100;
  const a = e + i;
  let r;
  a > 1 && (e /= a, i /= a);
  const s = Math.floor(6 * n), o = 1 - i;
  r = 6 * n - s, s & 1 && (r = 1 - r);
  const d = e + r * (o - e);
  let l, c, u;
  switch (s) {
    default:
    case 6:
    case 0:
      l = o, c = d, u = e;
      break;
    case 1:
      l = d, c = o, u = e;
      break;
    case 2:
      l = e, c = o, u = d;
      break;
    case 3:
      l = e, c = d, u = o;
      break;
    case 4:
      l = d, c = e, u = o;
      break;
    case 5:
      l = o, c = e, u = d;
      break;
  }
  return [l * 255, c * 255, u * 255];
};
y.cmyk.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, i = t[2] / 100, a = t[3] / 100, r = 1 - Math.min(1, n * (1 - a) + a), s = 1 - Math.min(1, e * (1 - a) + a), o = 1 - Math.min(1, i * (1 - a) + a);
  return [r * 255, s * 255, o * 255];
};
y.xyz.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, i = t[2] / 100;
  let a, r, s;
  return a = n * 3.2406 + e * -1.5372 + i * -0.4986, r = n * -0.9689 + e * 1.8758 + i * 0.0415, s = n * 0.0557 + e * -0.204 + i * 1.057, a = a > 31308e-7 ? 1.055 * a ** (1 / 2.4) - 0.055 : a * 12.92, r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, a = Math.min(Math.max(0, a), 1), r = Math.min(Math.max(0, r), 1), s = Math.min(Math.max(0, s), 1), [a * 255, r * 255, s * 255];
};
y.xyz.lab = function(t) {
  let n = t[0], e = t[1], i = t[2];
  n /= 95.047, e /= 100, i /= 108.883, n = n > 8856e-6 ? n ** (1 / 3) : 7.787 * n + 16 / 116, e = e > 8856e-6 ? e ** (1 / 3) : 7.787 * e + 16 / 116, i = i > 8856e-6 ? i ** (1 / 3) : 7.787 * i + 16 / 116;
  const a = 116 * e - 16, r = 500 * (n - e), s = 200 * (e - i);
  return [a, r, s];
};
y.lab.xyz = function(t) {
  const n = t[0], e = t[1], i = t[2];
  let a, r, s;
  r = (n + 16) / 116, a = e / 500 + r, s = r - i / 200;
  const o = r ** 3, d = a ** 3, l = s ** 3;
  return r = o > 8856e-6 ? o : (r - 16 / 116) / 7.787, a = d > 8856e-6 ? d : (a - 16 / 116) / 7.787, s = l > 8856e-6 ? l : (s - 16 / 116) / 7.787, a *= 95.047, r *= 100, s *= 108.883, [a, r, s];
};
y.lab.lch = function(t) {
  const n = t[0], e = t[1], i = t[2];
  let a;
  a = Math.atan2(i, e) * 360 / 2 / Math.PI, a < 0 && (a += 360);
  const s = Math.sqrt(e * e + i * i);
  return [n, s, a];
};
y.lch.lab = function(t) {
  const n = t[0], e = t[1], a = t[2] / 360 * 2 * Math.PI, r = e * Math.cos(a), s = e * Math.sin(a);
  return [n, r, s];
};
y.rgb.ansi16 = function(t, n = null) {
  const [e, i, a] = t;
  let r = n === null ? y.rgb.hsv(t)[2] : n;
  if (r = Math.round(r / 50), r === 0)
    return 30;
  let s = 30 + (Math.round(a / 255) << 2 | Math.round(i / 255) << 1 | Math.round(e / 255));
  return r === 2 && (s += 60), s;
};
y.hsv.ansi16 = function(t) {
  return y.rgb.ansi16(y.hsv.rgb(t), t[2]);
};
y.rgb.ansi256 = function(t) {
  const n = t[0], e = t[1], i = t[2];
  return n === e && e === i ? n < 8 ? 16 : n > 248 ? 231 : Math.round((n - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(n / 255 * 5) + 6 * Math.round(e / 255 * 5) + Math.round(i / 255 * 5);
};
y.ansi16.rgb = function(t) {
  let n = t % 10;
  if (n === 0 || n === 7)
    return t > 50 && (n += 3.5), n = n / 10.5 * 255, [n, n, n];
  const e = (~~(t > 50) + 1) * 0.5, i = (n & 1) * e * 255, a = (n >> 1 & 1) * e * 255, r = (n >> 2 & 1) * e * 255;
  return [i, a, r];
};
y.ansi256.rgb = function(t) {
  if (t >= 232) {
    const r = (t - 232) * 10 + 8;
    return [r, r, r];
  }
  t -= 16;
  let n;
  const e = Math.floor(t / 36) / 5 * 255, i = Math.floor((n = t % 36) / 6) / 5 * 255, a = n % 6 / 5 * 255;
  return [e, i, a];
};
y.rgb.hex = function(t) {
  const e = (((Math.round(t[0]) & 255) << 16) + ((Math.round(t[1]) & 255) << 8) + (Math.round(t[2]) & 255)).toString(16).toUpperCase();
  return "000000".substring(e.length) + e;
};
y.hex.rgb = function(t) {
  const n = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!n)
    return [0, 0, 0];
  let e = n[0];
  n[0].length === 3 && (e = e.split("").map((o) => o + o).join(""));
  const i = parseInt(e, 16), a = i >> 16 & 255, r = i >> 8 & 255, s = i & 255;
  return [a, r, s];
};
y.rgb.hcg = function(t) {
  const n = t[0] / 255, e = t[1] / 255, i = t[2] / 255, a = Math.max(Math.max(n, e), i), r = Math.min(Math.min(n, e), i), s = a - r;
  let o, d;
  return s < 1 ? o = r / (1 - s) : o = 0, s <= 0 ? d = 0 : a === n ? d = (e - i) / s % 6 : a === e ? d = 2 + (i - n) / s : d = 4 + (n - e) / s, d /= 6, d %= 1, [d * 360, s * 100, o * 100];
};
y.hsl.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, i = e < 0.5 ? 2 * n * e : 2 * n * (1 - e);
  let a = 0;
  return i < 1 && (a = (e - 0.5 * i) / (1 - i)), [t[0], i * 100, a * 100];
};
y.hsv.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, i = n * e;
  let a = 0;
  return i < 1 && (a = (e - i) / (1 - i)), [t[0], i * 100, a * 100];
};
y.hcg.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, i = t[2] / 100;
  if (e === 0)
    return [i * 255, i * 255, i * 255];
  const a = [0, 0, 0], r = n % 1 * 6, s = r % 1, o = 1 - s;
  let d = 0;
  switch (Math.floor(r)) {
    case 0:
      a[0] = 1, a[1] = s, a[2] = 0;
      break;
    case 1:
      a[0] = o, a[1] = 1, a[2] = 0;
      break;
    case 2:
      a[0] = 0, a[1] = 1, a[2] = s;
      break;
    case 3:
      a[0] = 0, a[1] = o, a[2] = 1;
      break;
    case 4:
      a[0] = s, a[1] = 0, a[2] = 1;
      break;
    default:
      a[0] = 1, a[1] = 0, a[2] = o;
  }
  return d = (1 - e) * i, [
    (e * a[0] + d) * 255,
    (e * a[1] + d) * 255,
    (e * a[2] + d) * 255
  ];
};
y.hcg.hsv = function(t) {
  const n = t[1] / 100, e = t[2] / 100, i = n + e * (1 - n);
  let a = 0;
  return i > 0 && (a = n / i), [t[0], a * 100, i * 100];
};
y.hcg.hsl = function(t) {
  const n = t[1] / 100, i = t[2] / 100 * (1 - n) + 0.5 * n;
  let a = 0;
  return i > 0 && i < 0.5 ? a = n / (2 * i) : i >= 0.5 && i < 1 && (a = n / (2 * (1 - i))), [t[0], a * 100, i * 100];
};
y.hcg.hwb = function(t) {
  const n = t[1] / 100, e = t[2] / 100, i = n + e * (1 - n);
  return [t[0], (i - n) * 100, (1 - i) * 100];
};
y.hwb.hcg = function(t) {
  const n = t[1] / 100, i = 1 - t[2] / 100, a = i - n;
  let r = 0;
  return a < 1 && (r = (i - a) / (1 - a)), [t[0], a * 100, r * 100];
};
y.apple.rgb = function(t) {
  return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255];
};
y.rgb.apple = function(t) {
  return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535];
};
y.gray.rgb = function(t) {
  return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255];
};
y.gray.hsl = function(t) {
  return [0, 0, t[0]];
};
y.gray.hsv = y.gray.hsl;
y.gray.hwb = function(t) {
  return [0, 100, t[0]];
};
y.gray.cmyk = function(t) {
  return [0, 0, 0, t[0]];
};
y.gray.lab = function(t) {
  return [t[0], 0, 0];
};
y.gray.hex = function(t) {
  const n = Math.round(t[0] / 100 * 255) & 255, i = ((n << 16) + (n << 8) + n).toString(16).toUpperCase();
  return "000000".substring(i.length) + i;
};
y.rgb.gray = function(t) {
  return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
};
const fe = Wn;
function Ji() {
  const t = {}, n = Object.keys(fe);
  for (let e = n.length, i = 0; i < e; i++)
    t[n[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return t;
}
function Qi(t) {
  const n = Ji(), e = [t];
  for (n[t].distance = 0; e.length; ) {
    const i = e.pop(), a = Object.keys(fe[i]);
    for (let r = a.length, s = 0; s < r; s++) {
      const o = a[s], d = n[o];
      d.distance === -1 && (d.distance = n[i].distance + 1, d.parent = i, e.unshift(o));
    }
  }
  return n;
}
function Ki(t, n) {
  return function(e) {
    return n(t(e));
  };
}
function ta(t, n) {
  const e = [n[t].parent, t];
  let i = fe[n[t].parent][t], a = n[t].parent;
  for (; n[a].parent; )
    e.unshift(n[a].parent), i = Ki(fe[n[a].parent][a], i), a = n[a].parent;
  return i.conversion = e, i;
}
var ea = function(t) {
  const n = Qi(t), e = {}, i = Object.keys(n);
  for (let a = i.length, r = 0; r < a; r++) {
    const s = i[r];
    n[s].parent !== null && (e[s] = ta(s, n));
  }
  return e;
};
const $e = Wn, na = ea, Ct = {}, ia = Object.keys($e);
function aa(t) {
  const n = function(...e) {
    const i = e[0];
    return i == null ? i : (i.length > 1 && (e = i), t(e));
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
function ra(t) {
  const n = function(...e) {
    const i = e[0];
    if (i == null)
      return i;
    i.length > 1 && (e = i);
    const a = t(e);
    if (typeof a == "object")
      for (let r = a.length, s = 0; s < r; s++)
        a[s] = Math.round(a[s]);
    return a;
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
ia.forEach((t) => {
  Ct[t] = {}, Object.defineProperty(Ct[t], "channels", { value: $e[t].channels }), Object.defineProperty(Ct[t], "labels", { value: $e[t].labels });
  const n = na(t);
  Object.keys(n).forEach((i) => {
    const a = n[i];
    Ct[t][i] = ra(a), Ct[t][i].raw = aa(a);
  });
});
var nn = Ct;
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const sa = 4, an = 0, rn = 1, oa = 2;
function Ht(t) {
  let n = t.length;
  for (; --n >= 0; )
    t[n] = 0;
}
const la = 0, Vn = 1, ca = 2, da = 3, ha = 258, je = 29, ee = 256, Yt = ee + 1 + je, Tt = 30, Xe = 19, Jn = 2 * Yt + 1, wt = 15, be = 16, fa = 7, We = 256, Qn = 16, Kn = 17, ti = 18, Pe = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), he = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), ua = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), ei = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), ga = 512, lt = new Array((Yt + 2) * 2);
Ht(lt);
const Ut = new Array(Tt * 2);
Ht(Ut);
const jt = new Array(ga);
Ht(jt);
const Xt = new Array(ha - da + 1);
Ht(Xt);
const Ve = new Array(je);
Ht(Ve);
const ue = new Array(Tt);
Ht(ue);
function ve(t, n, e, i, a) {
  this.static_tree = t, this.extra_bits = n, this.extra_base = e, this.elems = i, this.max_length = a, this.has_stree = t && t.length;
}
let ni, ii, ai;
function xe(t, n) {
  this.dyn_tree = t, this.max_code = 0, this.stat_desc = n;
}
const ri = (t) => t < 256 ? jt[t] : jt[256 + (t >>> 7)], Wt = (t, n) => {
  t.pending_buf[t.pending++] = n & 255, t.pending_buf[t.pending++] = n >>> 8 & 255;
}, V = (t, n, e) => {
  t.bi_valid > be - e ? (t.bi_buf |= n << t.bi_valid & 65535, Wt(t, t.bi_buf), t.bi_buf = n >> be - t.bi_valid, t.bi_valid += e - be) : (t.bi_buf |= n << t.bi_valid & 65535, t.bi_valid += e);
}, at = (t, n, e) => {
  V(
    t,
    e[n * 2],
    e[n * 2 + 1]
    /*.Len*/
  );
}, si = (t, n) => {
  let e = 0;
  do
    e |= t & 1, t >>>= 1, e <<= 1;
  while (--n > 0);
  return e >>> 1;
}, _a = (t) => {
  t.bi_valid === 16 ? (Wt(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = t.bi_buf & 255, t.bi_buf >>= 8, t.bi_valid -= 8);
}, pa = (t, n) => {
  const e = n.dyn_tree, i = n.max_code, a = n.stat_desc.static_tree, r = n.stat_desc.has_stree, s = n.stat_desc.extra_bits, o = n.stat_desc.extra_base, d = n.stat_desc.max_length;
  let l, c, u, g, h, p, k = 0;
  for (g = 0; g <= wt; g++)
    t.bl_count[g] = 0;
  for (e[t.heap[t.heap_max] * 2 + 1] = 0, l = t.heap_max + 1; l < Jn; l++)
    c = t.heap[l], g = e[e[c * 2 + 1] * 2 + 1] + 1, g > d && (g = d, k++), e[c * 2 + 1] = g, !(c > i) && (t.bl_count[g]++, h = 0, c >= o && (h = s[c - o]), p = e[c * 2], t.opt_len += p * (g + h), r && (t.static_len += p * (a[c * 2 + 1] + h)));
  if (k !== 0) {
    do {
      for (g = d - 1; t.bl_count[g] === 0; )
        g--;
      t.bl_count[g]--, t.bl_count[g + 1] += 2, t.bl_count[d]--, k -= 2;
    } while (k > 0);
    for (g = d; g !== 0; g--)
      for (c = t.bl_count[g]; c !== 0; )
        u = t.heap[--l], !(u > i) && (e[u * 2 + 1] !== g && (t.opt_len += (g - e[u * 2 + 1]) * e[u * 2], e[u * 2 + 1] = g), c--);
  }
}, oi = (t, n, e) => {
  const i = new Array(wt + 1);
  let a = 0, r, s;
  for (r = 1; r <= wt; r++)
    a = a + e[r - 1] << 1, i[r] = a;
  for (s = 0; s <= n; s++) {
    let o = t[s * 2 + 1];
    o !== 0 && (t[s * 2] = si(i[o]++, o));
  }
}, ma = () => {
  let t, n, e, i, a;
  const r = new Array(wt + 1);
  for (e = 0, i = 0; i < je - 1; i++)
    for (Ve[i] = e, t = 0; t < 1 << Pe[i]; t++)
      Xt[e++] = i;
  for (Xt[e - 1] = i, a = 0, i = 0; i < 16; i++)
    for (ue[i] = a, t = 0; t < 1 << he[i]; t++)
      jt[a++] = i;
  for (a >>= 7; i < Tt; i++)
    for (ue[i] = a << 7, t = 0; t < 1 << he[i] - 7; t++)
      jt[256 + a++] = i;
  for (n = 0; n <= wt; n++)
    r[n] = 0;
  for (t = 0; t <= 143; )
    lt[t * 2 + 1] = 8, t++, r[8]++;
  for (; t <= 255; )
    lt[t * 2 + 1] = 9, t++, r[9]++;
  for (; t <= 279; )
    lt[t * 2 + 1] = 7, t++, r[7]++;
  for (; t <= 287; )
    lt[t * 2 + 1] = 8, t++, r[8]++;
  for (oi(lt, Yt + 1, r), t = 0; t < Tt; t++)
    Ut[t * 2 + 1] = 5, Ut[t * 2] = si(t, 5);
  ni = new ve(lt, Pe, ee + 1, Yt, wt), ii = new ve(Ut, he, 0, Tt, wt), ai = new ve(new Array(0), ua, 0, Xe, fa);
}, li = (t) => {
  let n;
  for (n = 0; n < Yt; n++)
    t.dyn_ltree[n * 2] = 0;
  for (n = 0; n < Tt; n++)
    t.dyn_dtree[n * 2] = 0;
  for (n = 0; n < Xe; n++)
    t.bl_tree[n * 2] = 0;
  t.dyn_ltree[We * 2] = 1, t.opt_len = t.static_len = 0, t.sym_next = t.matches = 0;
}, ci = (t) => {
  t.bi_valid > 8 ? Wt(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
}, sn = (t, n, e, i) => {
  const a = n * 2, r = e * 2;
  return t[a] < t[r] || t[a] === t[r] && i[n] <= i[e];
}, Ee = (t, n, e) => {
  const i = t.heap[e];
  let a = e << 1;
  for (; a <= t.heap_len && (a < t.heap_len && sn(n, t.heap[a + 1], t.heap[a], t.depth) && a++, !sn(n, i, t.heap[a], t.depth)); )
    t.heap[e] = t.heap[a], e = a, a <<= 1;
  t.heap[e] = i;
}, on = (t, n, e) => {
  let i, a, r = 0, s, o;
  if (t.sym_next !== 0)
    do
      i = t.pending_buf[t.sym_buf + r++] & 255, i += (t.pending_buf[t.sym_buf + r++] & 255) << 8, a = t.pending_buf[t.sym_buf + r++], i === 0 ? at(t, a, n) : (s = Xt[a], at(t, s + ee + 1, n), o = Pe[s], o !== 0 && (a -= Ve[s], V(t, a, o)), i--, s = ri(i), at(t, s, e), o = he[s], o !== 0 && (i -= ue[s], V(t, i, o)));
    while (r < t.sym_next);
  at(t, We, n);
}, Oe = (t, n) => {
  const e = n.dyn_tree, i = n.stat_desc.static_tree, a = n.stat_desc.has_stree, r = n.stat_desc.elems;
  let s, o, d = -1, l;
  for (t.heap_len = 0, t.heap_max = Jn, s = 0; s < r; s++)
    e[s * 2] !== 0 ? (t.heap[++t.heap_len] = d = s, t.depth[s] = 0) : e[s * 2 + 1] = 0;
  for (; t.heap_len < 2; )
    l = t.heap[++t.heap_len] = d < 2 ? ++d : 0, e[l * 2] = 1, t.depth[l] = 0, t.opt_len--, a && (t.static_len -= i[l * 2 + 1]);
  for (n.max_code = d, s = t.heap_len >> 1; s >= 1; s--)
    Ee(t, e, s);
  l = r;
  do
    s = t.heap[
      1
      /*SMALLEST*/
    ], t.heap[
      1
      /*SMALLEST*/
    ] = t.heap[t.heap_len--], Ee(
      t,
      e,
      1
      /*SMALLEST*/
    ), o = t.heap[
      1
      /*SMALLEST*/
    ], t.heap[--t.heap_max] = s, t.heap[--t.heap_max] = o, e[l * 2] = e[s * 2] + e[o * 2], t.depth[l] = (t.depth[s] >= t.depth[o] ? t.depth[s] : t.depth[o]) + 1, e[s * 2 + 1] = e[o * 2 + 1] = l, t.heap[
      1
      /*SMALLEST*/
    ] = l++, Ee(
      t,
      e,
      1
      /*SMALLEST*/
    );
  while (t.heap_len >= 2);
  t.heap[--t.heap_max] = t.heap[
    1
    /*SMALLEST*/
  ], pa(t, n), oi(e, d, t.bl_count);
}, ln = (t, n, e) => {
  let i, a = -1, r, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
  for (s === 0 && (d = 138, l = 3), n[(e + 1) * 2 + 1] = 65535, i = 0; i <= e; i++)
    r = s, s = n[(i + 1) * 2 + 1], !(++o < d && r === s) && (o < l ? t.bl_tree[r * 2] += o : r !== 0 ? (r !== a && t.bl_tree[r * 2]++, t.bl_tree[Qn * 2]++) : o <= 10 ? t.bl_tree[Kn * 2]++ : t.bl_tree[ti * 2]++, o = 0, a = r, s === 0 ? (d = 138, l = 3) : r === s ? (d = 6, l = 3) : (d = 7, l = 4));
}, cn = (t, n, e) => {
  let i, a = -1, r, s = n[0 * 2 + 1], o = 0, d = 7, l = 4;
  for (s === 0 && (d = 138, l = 3), i = 0; i <= e; i++)
    if (r = s, s = n[(i + 1) * 2 + 1], !(++o < d && r === s)) {
      if (o < l)
        do
          at(t, r, t.bl_tree);
        while (--o !== 0);
      else
        r !== 0 ? (r !== a && (at(t, r, t.bl_tree), o--), at(t, Qn, t.bl_tree), V(t, o - 3, 2)) : o <= 10 ? (at(t, Kn, t.bl_tree), V(t, o - 3, 3)) : (at(t, ti, t.bl_tree), V(t, o - 11, 7));
      o = 0, a = r, s === 0 ? (d = 138, l = 3) : r === s ? (d = 6, l = 3) : (d = 7, l = 4);
    }
}, wa = (t) => {
  let n;
  for (ln(t, t.dyn_ltree, t.l_desc.max_code), ln(t, t.dyn_dtree, t.d_desc.max_code), Oe(t, t.bl_desc), n = Xe - 1; n >= 3 && t.bl_tree[ei[n] * 2 + 1] === 0; n--)
    ;
  return t.opt_len += 3 * (n + 1) + 5 + 5 + 4, n;
}, ba = (t, n, e, i) => {
  let a;
  for (V(t, n - 257, 5), V(t, e - 1, 5), V(t, i - 4, 4), a = 0; a < i; a++)
    V(t, t.bl_tree[ei[a] * 2 + 1], 3);
  cn(t, t.dyn_ltree, n - 1), cn(t, t.dyn_dtree, e - 1);
}, va = (t) => {
  let n = 4093624447, e;
  for (e = 0; e <= 31; e++, n >>>= 1)
    if (n & 1 && t.dyn_ltree[e * 2] !== 0)
      return an;
  if (t.dyn_ltree[9 * 2] !== 0 || t.dyn_ltree[10 * 2] !== 0 || t.dyn_ltree[13 * 2] !== 0)
    return rn;
  for (e = 32; e < ee; e++)
    if (t.dyn_ltree[e * 2] !== 0)
      return rn;
  return an;
};
let dn = !1;
const xa = (t) => {
  dn || (ma(), dn = !0), t.l_desc = new xe(t.dyn_ltree, ni), t.d_desc = new xe(t.dyn_dtree, ii), t.bl_desc = new xe(t.bl_tree, ai), t.bi_buf = 0, t.bi_valid = 0, li(t);
}, di = (t, n, e, i) => {
  V(t, (la << 1) + (i ? 1 : 0), 3), ci(t), Wt(t, e), Wt(t, ~e), e && t.pending_buf.set(t.window.subarray(n, n + e), t.pending), t.pending += e;
}, Ea = (t) => {
  V(t, Vn << 1, 3), at(t, We, lt), _a(t);
}, ya = (t, n, e, i) => {
  let a, r, s = 0;
  t.level > 0 ? (t.strm.data_type === oa && (t.strm.data_type = va(t)), Oe(t, t.l_desc), Oe(t, t.d_desc), s = wa(t), a = t.opt_len + 3 + 7 >>> 3, r = t.static_len + 3 + 7 >>> 3, r <= a && (a = r)) : a = r = e + 5, e + 4 <= a && n !== -1 ? di(t, n, e, i) : t.strategy === sa || r === a ? (V(t, (Vn << 1) + (i ? 1 : 0), 3), on(t, lt, Ut)) : (V(t, (ca << 1) + (i ? 1 : 0), 3), ba(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1), on(t, t.dyn_ltree, t.dyn_dtree)), li(t), i && ci(t);
}, ka = (t, n, e) => (t.pending_buf[t.sym_buf + t.sym_next++] = n, t.pending_buf[t.sym_buf + t.sym_next++] = n >> 8, t.pending_buf[t.sym_buf + t.sym_next++] = e, n === 0 ? t.dyn_ltree[e * 2]++ : (t.matches++, n--, t.dyn_ltree[(Xt[e] + ee + 1) * 2]++, t.dyn_dtree[ri(n) * 2]++), t.sym_next === t.sym_end);
var Sa = xa, Da = di, Aa = ya, La = ka, Ca = Ea, Ta = {
  _tr_init: Sa,
  _tr_stored_block: Da,
  _tr_flush_block: Aa,
  _tr_tally: La,
  _tr_align: Ca
};
const za = (t, n, e, i) => {
  let a = t & 65535 | 0, r = t >>> 16 & 65535 | 0, s = 0;
  for (; e !== 0; ) {
    s = e > 2e3 ? 2e3 : e, e -= s;
    do
      a = a + n[i++] | 0, r = r + a | 0;
    while (--s);
    a %= 65521, r %= 65521;
  }
  return a | r << 16 | 0;
};
var Vt = za;
const Ra = () => {
  let t, n = [];
  for (var e = 0; e < 256; e++) {
    t = e;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    n[e] = t;
  }
  return n;
}, Ha = new Uint32Array(Ra()), Ia = (t, n, e, i) => {
  const a = Ha, r = i + e;
  t ^= -1;
  for (let s = i; s < r; s++)
    t = t >>> 8 ^ a[(t ^ n[s]) & 255];
  return t ^ -1;
};
var Z = Ia, xt = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, kt = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const { _tr_init: Ma, _tr_stored_block: Ne, _tr_flush_block: Ba, _tr_tally: ut, _tr_align: $a } = Ta, {
  Z_NO_FLUSH: gt,
  Z_PARTIAL_FLUSH: Pa,
  Z_FULL_FLUSH: Oa,
  Z_FINISH: tt,
  Z_BLOCK: hn,
  Z_OK: q,
  Z_STREAM_END: fn,
  Z_STREAM_ERROR: rt,
  Z_DATA_ERROR: Na,
  Z_BUF_ERROR: ye,
  Z_DEFAULT_COMPRESSION: Fa,
  Z_FILTERED: Ua,
  Z_HUFFMAN_ONLY: se,
  Z_RLE: Za,
  Z_FIXED: Ga,
  Z_DEFAULT_STRATEGY: qa,
  Z_UNKNOWN: Ya,
  Z_DEFLATED: pe
} = kt, ja = 9, Xa = 15, Wa = 8, Va = 29, Ja = 256, Fe = Ja + 1 + Va, Qa = 30, Ka = 19, tr = 2 * Fe + 1, er = 15, $ = 3, ft = 258, st = ft + $ + 1, nr = 32, zt = 42, Je = 57, Ue = 69, Ze = 73, Ge = 91, qe = 103, bt = 113, Nt = 666, j = 1, It = 2, Et = 3, Mt = 4, ir = 3, vt = (t, n) => (t.msg = xt[n], n), un = (t) => t * 2 - (t > 4 ? 9 : 0), ht = (t) => {
  let n = t.length;
  for (; --n >= 0; )
    t[n] = 0;
}, ar = (t) => {
  let n, e, i, a = t.w_size;
  n = t.hash_size, i = n;
  do
    e = t.head[--i], t.head[i] = e >= a ? e - a : 0;
  while (--n);
  n = a, i = n;
  do
    e = t.prev[--i], t.prev[i] = e >= a ? e - a : 0;
  while (--n);
};
let rr = (t, n, e) => (n << t.hash_shift ^ e) & t.hash_mask, _t = rr;
const J = (t) => {
  const n = t.state;
  let e = n.pending;
  e > t.avail_out && (e = t.avail_out), e !== 0 && (t.output.set(n.pending_buf.subarray(n.pending_out, n.pending_out + e), t.next_out), t.next_out += e, n.pending_out += e, t.total_out += e, t.avail_out -= e, n.pending -= e, n.pending === 0 && (n.pending_out = 0));
}, Q = (t, n) => {
  Ba(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, n), t.block_start = t.strstart, J(t.strm);
}, P = (t, n) => {
  t.pending_buf[t.pending++] = n;
}, Ot = (t, n) => {
  t.pending_buf[t.pending++] = n >>> 8 & 255, t.pending_buf[t.pending++] = n & 255;
}, Ye = (t, n, e, i) => {
  let a = t.avail_in;
  return a > i && (a = i), a === 0 ? 0 : (t.avail_in -= a, n.set(t.input.subarray(t.next_in, t.next_in + a), e), t.state.wrap === 1 ? t.adler = Vt(t.adler, n, a, e) : t.state.wrap === 2 && (t.adler = Z(t.adler, n, a, e)), t.next_in += a, t.total_in += a, a);
}, hi = (t, n) => {
  let e = t.max_chain_length, i = t.strstart, a, r, s = t.prev_length, o = t.nice_match;
  const d = t.strstart > t.w_size - st ? t.strstart - (t.w_size - st) : 0, l = t.window, c = t.w_mask, u = t.prev, g = t.strstart + ft;
  let h = l[i + s - 1], p = l[i + s];
  t.prev_length >= t.good_match && (e >>= 2), o > t.lookahead && (o = t.lookahead);
  do
    if (a = n, !(l[a + s] !== p || l[a + s - 1] !== h || l[a] !== l[i] || l[++a] !== l[i + 1])) {
      i += 2, a++;
      do
        ;
      while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < g);
      if (r = ft - (g - i), i = g - ft, r > s) {
        if (t.match_start = n, s = r, r >= o)
          break;
        h = l[i + s - 1], p = l[i + s];
      }
    }
  while ((n = u[n & c]) > d && --e !== 0);
  return s <= t.lookahead ? s : t.lookahead;
}, Rt = (t) => {
  const n = t.w_size;
  let e, i, a;
  do {
    if (i = t.window_size - t.lookahead - t.strstart, t.strstart >= n + (n - st) && (t.window.set(t.window.subarray(n, n + n - i), 0), t.match_start -= n, t.strstart -= n, t.block_start -= n, t.insert > t.strstart && (t.insert = t.strstart), ar(t), i += n), t.strm.avail_in === 0)
      break;
    if (e = Ye(t.strm, t.window, t.strstart + t.lookahead, i), t.lookahead += e, t.lookahead + t.insert >= $)
      for (a = t.strstart - t.insert, t.ins_h = t.window[a], t.ins_h = _t(t, t.ins_h, t.window[a + 1]); t.insert && (t.ins_h = _t(t, t.ins_h, t.window[a + $ - 1]), t.prev[a & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = a, a++, t.insert--, !(t.lookahead + t.insert < $)); )
        ;
  } while (t.lookahead < st && t.strm.avail_in !== 0);
}, fi = (t, n) => {
  let e = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, i, a, r, s = 0, o = t.strm.avail_in;
  do {
    if (i = 65535, r = t.bi_valid + 42 >> 3, t.strm.avail_out < r || (r = t.strm.avail_out - r, a = t.strstart - t.block_start, i > a + t.strm.avail_in && (i = a + t.strm.avail_in), i > r && (i = r), i < e && (i === 0 && n !== tt || n === gt || i !== a + t.strm.avail_in)))
      break;
    s = n === tt && i === a + t.strm.avail_in ? 1 : 0, Ne(t, 0, 0, s), t.pending_buf[t.pending - 4] = i, t.pending_buf[t.pending - 3] = i >> 8, t.pending_buf[t.pending - 2] = ~i, t.pending_buf[t.pending - 1] = ~i >> 8, J(t.strm), a && (a > i && (a = i), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + a), t.strm.next_out), t.strm.next_out += a, t.strm.avail_out -= a, t.strm.total_out += a, t.block_start += a, i -= a), i && (Ye(t.strm, t.strm.output, t.strm.next_out, i), t.strm.next_out += i, t.strm.avail_out -= i, t.strm.total_out += i);
  } while (s === 0);
  return o -= t.strm.avail_in, o && (o >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= o && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - o, t.strm.next_in), t.strstart), t.strstart += o, t.insert += o > t.w_size - t.insert ? t.w_size - t.insert : o), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), s ? Mt : n !== gt && n !== tt && t.strm.avail_in === 0 && t.strstart === t.block_start ? It : (r = t.window_size - t.strstart, t.strm.avail_in > r && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, r += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), r > t.strm.avail_in && (r = t.strm.avail_in), r && (Ye(t.strm, t.window, t.strstart, r), t.strstart += r, t.insert += r > t.w_size - t.insert ? t.w_size - t.insert : r), t.high_water < t.strstart && (t.high_water = t.strstart), r = t.bi_valid + 42 >> 3, r = t.pending_buf_size - r > 65535 ? 65535 : t.pending_buf_size - r, e = r > t.w_size ? t.w_size : r, a = t.strstart - t.block_start, (a >= e || (a || n === tt) && n !== gt && t.strm.avail_in === 0 && a <= r) && (i = a > r ? r : a, s = n === tt && t.strm.avail_in === 0 && i === a ? 1 : 0, Ne(t, t.block_start, i, s), t.block_start += i, J(t.strm)), s ? Et : j);
}, ke = (t, n) => {
  let e, i;
  for (; ; ) {
    if (t.lookahead < st) {
      if (Rt(t), t.lookahead < st && n === gt)
        return j;
      if (t.lookahead === 0)
        break;
    }
    if (e = 0, t.lookahead >= $ && (t.ins_h = _t(t, t.ins_h, t.window[t.strstart + $ - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), e !== 0 && t.strstart - e <= t.w_size - st && (t.match_length = hi(t, e)), t.match_length >= $)
      if (i = ut(t, t.strstart - t.match_start, t.match_length - $), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= $) {
        t.match_length--;
        do
          t.strstart++, t.ins_h = _t(t, t.ins_h, t.window[t.strstart + $ - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
        while (--t.match_length !== 0);
        t.strstart++;
      } else
        t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = _t(t, t.ins_h, t.window[t.strstart + 1]);
    else
      i = ut(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
    if (i && (Q(t, !1), t.strm.avail_out === 0))
      return j;
  }
  return t.insert = t.strstart < $ - 1 ? t.strstart : $ - 1, n === tt ? (Q(t, !0), t.strm.avail_out === 0 ? Et : Mt) : t.sym_next && (Q(t, !1), t.strm.avail_out === 0) ? j : It;
}, At = (t, n) => {
  let e, i, a;
  for (; ; ) {
    if (t.lookahead < st) {
      if (Rt(t), t.lookahead < st && n === gt)
        return j;
      if (t.lookahead === 0)
        break;
    }
    if (e = 0, t.lookahead >= $ && (t.ins_h = _t(t, t.ins_h, t.window[t.strstart + $ - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = $ - 1, e !== 0 && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - st && (t.match_length = hi(t, e), t.match_length <= 5 && (t.strategy === Ua || t.match_length === $ && t.strstart - t.match_start > 4096) && (t.match_length = $ - 1)), t.prev_length >= $ && t.match_length <= t.prev_length) {
      a = t.strstart + t.lookahead - $, i = ut(t, t.strstart - 1 - t.prev_match, t.prev_length - $), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
      do
        ++t.strstart <= a && (t.ins_h = _t(t, t.ins_h, t.window[t.strstart + $ - 1]), e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
      while (--t.prev_length !== 0);
      if (t.match_available = 0, t.match_length = $ - 1, t.strstart++, i && (Q(t, !1), t.strm.avail_out === 0))
        return j;
    } else if (t.match_available) {
      if (i = ut(t, 0, t.window[t.strstart - 1]), i && Q(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0)
        return j;
    } else
      t.match_available = 1, t.strstart++, t.lookahead--;
  }
  return t.match_available && (i = ut(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < $ - 1 ? t.strstart : $ - 1, n === tt ? (Q(t, !0), t.strm.avail_out === 0 ? Et : Mt) : t.sym_next && (Q(t, !1), t.strm.avail_out === 0) ? j : It;
}, sr = (t, n) => {
  let e, i, a, r;
  const s = t.window;
  for (; ; ) {
    if (t.lookahead <= ft) {
      if (Rt(t), t.lookahead <= ft && n === gt)
        return j;
      if (t.lookahead === 0)
        break;
    }
    if (t.match_length = 0, t.lookahead >= $ && t.strstart > 0 && (a = t.strstart - 1, i = s[a], i === s[++a] && i === s[++a] && i === s[++a])) {
      r = t.strstart + ft;
      do
        ;
      while (i === s[++a] && i === s[++a] && i === s[++a] && i === s[++a] && i === s[++a] && i === s[++a] && i === s[++a] && i === s[++a] && a < r);
      t.match_length = ft - (r - a), t.match_length > t.lookahead && (t.match_length = t.lookahead);
    }
    if (t.match_length >= $ ? (e = ut(t, 1, t.match_length - $), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = ut(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (Q(t, !1), t.strm.avail_out === 0))
      return j;
  }
  return t.insert = 0, n === tt ? (Q(t, !0), t.strm.avail_out === 0 ? Et : Mt) : t.sym_next && (Q(t, !1), t.strm.avail_out === 0) ? j : It;
}, or = (t, n) => {
  let e;
  for (; ; ) {
    if (t.lookahead === 0 && (Rt(t), t.lookahead === 0)) {
      if (n === gt)
        return j;
      break;
    }
    if (t.match_length = 0, e = ut(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (Q(t, !1), t.strm.avail_out === 0))
      return j;
  }
  return t.insert = 0, n === tt ? (Q(t, !0), t.strm.avail_out === 0 ? Et : Mt) : t.sym_next && (Q(t, !1), t.strm.avail_out === 0) ? j : It;
};
function it(t, n, e, i, a) {
  this.good_length = t, this.max_lazy = n, this.nice_length = e, this.max_chain = i, this.func = a;
}
const Ft = [
  /*      good lazy nice chain */
  new it(0, 0, 0, 0, fi),
  /* 0 store only */
  new it(4, 4, 8, 4, ke),
  /* 1 max speed, no lazy matches */
  new it(4, 5, 16, 8, ke),
  /* 2 */
  new it(4, 6, 32, 32, ke),
  /* 3 */
  new it(4, 4, 16, 16, At),
  /* 4 lazy matches */
  new it(8, 16, 32, 32, At),
  /* 5 */
  new it(8, 16, 128, 128, At),
  /* 6 */
  new it(8, 32, 128, 256, At),
  /* 7 */
  new it(32, 128, 258, 1024, At),
  /* 8 */
  new it(32, 258, 258, 4096, At)
  /* 9 max compression */
], lr = (t) => {
  t.window_size = 2 * t.w_size, ht(t.head), t.max_lazy_match = Ft[t.level].max_lazy, t.good_match = Ft[t.level].good_length, t.nice_match = Ft[t.level].nice_length, t.max_chain_length = Ft[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = $ - 1, t.match_available = 0, t.ins_h = 0;
};
function cr() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = pe, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(tr * 2), this.dyn_dtree = new Uint16Array((2 * Qa + 1) * 2), this.bl_tree = new Uint16Array((2 * Ka + 1) * 2), ht(this.dyn_ltree), ht(this.dyn_dtree), ht(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(er + 1), this.heap = new Uint16Array(2 * Fe + 1), ht(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * Fe + 1), ht(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const ne = (t) => {
  if (!t)
    return 1;
  const n = t.state;
  return !n || n.strm !== t || n.status !== zt && //#ifdef GZIP
  n.status !== Je && //#endif
  n.status !== Ue && n.status !== Ze && n.status !== Ge && n.status !== qe && n.status !== bt && n.status !== Nt ? 1 : 0;
}, ui = (t) => {
  if (ne(t))
    return vt(t, rt);
  t.total_in = t.total_out = 0, t.data_type = Ya;
  const n = t.state;
  return n.pending = 0, n.pending_out = 0, n.wrap < 0 && (n.wrap = -n.wrap), n.status = //#ifdef GZIP
  n.wrap === 2 ? Je : (
    //#endif
    n.wrap ? zt : bt
  ), t.adler = n.wrap === 2 ? 0 : 1, n.last_flush = -2, Ma(n), q;
}, gi = (t) => {
  const n = ui(t);
  return n === q && lr(t.state), n;
}, dr = (t, n) => ne(t) || t.state.wrap !== 2 ? rt : (t.state.gzhead = n, q), _i = (t, n, e, i, a, r) => {
  if (!t)
    return rt;
  let s = 1;
  if (n === Fa && (n = 6), i < 0 ? (s = 0, i = -i) : i > 15 && (s = 2, i -= 16), a < 1 || a > ja || e !== pe || i < 8 || i > 15 || n < 0 || n > 9 || r < 0 || r > Ga || i === 8 && s !== 1)
    return vt(t, rt);
  i === 8 && (i = 9);
  const o = new cr();
  return t.state = o, o.strm = t, o.status = zt, o.wrap = s, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = a + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + $ - 1) / $), o.window = new Uint8Array(o.w_size * 2), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << a + 6, o.pending_buf_size = o.lit_bufsize * 4, o.pending_buf = new Uint8Array(o.pending_buf_size), o.sym_buf = o.lit_bufsize, o.sym_end = (o.lit_bufsize - 1) * 3, o.level = n, o.strategy = r, o.method = e, gi(t);
}, hr = (t, n) => _i(t, n, pe, Xa, Wa, qa), fr = (t, n) => {
  if (ne(t) || n > hn || n < 0)
    return t ? vt(t, rt) : rt;
  const e = t.state;
  if (!t.output || t.avail_in !== 0 && !t.input || e.status === Nt && n !== tt)
    return vt(t, t.avail_out === 0 ? ye : rt);
  const i = e.last_flush;
  if (e.last_flush = n, e.pending !== 0) {
    if (J(t), t.avail_out === 0)
      return e.last_flush = -1, q;
  } else if (t.avail_in === 0 && un(n) <= un(i) && n !== tt)
    return vt(t, ye);
  if (e.status === Nt && t.avail_in !== 0)
    return vt(t, ye);
  if (e.status === zt && e.wrap === 0 && (e.status = bt), e.status === zt) {
    let a = pe + (e.w_bits - 8 << 4) << 8, r = -1;
    if (e.strategy >= se || e.level < 2 ? r = 0 : e.level < 6 ? r = 1 : e.level === 6 ? r = 2 : r = 3, a |= r << 6, e.strstart !== 0 && (a |= nr), a += 31 - a % 31, Ot(e, a), e.strstart !== 0 && (Ot(e, t.adler >>> 16), Ot(e, t.adler & 65535)), t.adler = 1, e.status = bt, J(t), e.pending !== 0)
      return e.last_flush = -1, q;
  }
  if (e.status === Je) {
    if (t.adler = 0, P(e, 31), P(e, 139), P(e, 8), e.gzhead)
      P(
        e,
        (e.gzhead.text ? 1 : 0) + (e.gzhead.hcrc ? 2 : 0) + (e.gzhead.extra ? 4 : 0) + (e.gzhead.name ? 8 : 0) + (e.gzhead.comment ? 16 : 0)
      ), P(e, e.gzhead.time & 255), P(e, e.gzhead.time >> 8 & 255), P(e, e.gzhead.time >> 16 & 255), P(e, e.gzhead.time >> 24 & 255), P(e, e.level === 9 ? 2 : e.strategy >= se || e.level < 2 ? 4 : 0), P(e, e.gzhead.os & 255), e.gzhead.extra && e.gzhead.extra.length && (P(e, e.gzhead.extra.length & 255), P(e, e.gzhead.extra.length >> 8 & 255)), e.gzhead.hcrc && (t.adler = Z(t.adler, e.pending_buf, e.pending, 0)), e.gzindex = 0, e.status = Ue;
    else if (P(e, 0), P(e, 0), P(e, 0), P(e, 0), P(e, 0), P(e, e.level === 9 ? 2 : e.strategy >= se || e.level < 2 ? 4 : 0), P(e, ir), e.status = bt, J(t), e.pending !== 0)
      return e.last_flush = -1, q;
  }
  if (e.status === Ue) {
    if (e.gzhead.extra) {
      let a = e.pending, r = (e.gzhead.extra.length & 65535) - e.gzindex;
      for (; e.pending + r > e.pending_buf_size; ) {
        let o = e.pending_buf_size - e.pending;
        if (e.pending_buf.set(e.gzhead.extra.subarray(e.gzindex, e.gzindex + o), e.pending), e.pending = e.pending_buf_size, e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a)), e.gzindex += o, J(t), e.pending !== 0)
          return e.last_flush = -1, q;
        a = 0, r -= o;
      }
      let s = new Uint8Array(e.gzhead.extra);
      e.pending_buf.set(s.subarray(e.gzindex, e.gzindex + r), e.pending), e.pending += r, e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a)), e.gzindex = 0;
    }
    e.status = Ze;
  }
  if (e.status === Ze) {
    if (e.gzhead.name) {
      let a = e.pending, r;
      do {
        if (e.pending === e.pending_buf_size) {
          if (e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a)), J(t), e.pending !== 0)
            return e.last_flush = -1, q;
          a = 0;
        }
        e.gzindex < e.gzhead.name.length ? r = e.gzhead.name.charCodeAt(e.gzindex++) & 255 : r = 0, P(e, r);
      } while (r !== 0);
      e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a)), e.gzindex = 0;
    }
    e.status = Ge;
  }
  if (e.status === Ge) {
    if (e.gzhead.comment) {
      let a = e.pending, r;
      do {
        if (e.pending === e.pending_buf_size) {
          if (e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a)), J(t), e.pending !== 0)
            return e.last_flush = -1, q;
          a = 0;
        }
        e.gzindex < e.gzhead.comment.length ? r = e.gzhead.comment.charCodeAt(e.gzindex++) & 255 : r = 0, P(e, r);
      } while (r !== 0);
      e.gzhead.hcrc && e.pending > a && (t.adler = Z(t.adler, e.pending_buf, e.pending - a, a));
    }
    e.status = qe;
  }
  if (e.status === qe) {
    if (e.gzhead.hcrc) {
      if (e.pending + 2 > e.pending_buf_size && (J(t), e.pending !== 0))
        return e.last_flush = -1, q;
      P(e, t.adler & 255), P(e, t.adler >> 8 & 255), t.adler = 0;
    }
    if (e.status = bt, J(t), e.pending !== 0)
      return e.last_flush = -1, q;
  }
  if (t.avail_in !== 0 || e.lookahead !== 0 || n !== gt && e.status !== Nt) {
    let a = e.level === 0 ? fi(e, n) : e.strategy === se ? or(e, n) : e.strategy === Za ? sr(e, n) : Ft[e.level].func(e, n);
    if ((a === Et || a === Mt) && (e.status = Nt), a === j || a === Et)
      return t.avail_out === 0 && (e.last_flush = -1), q;
    if (a === It && (n === Pa ? $a(e) : n !== hn && (Ne(e, 0, 0, !1), n === Oa && (ht(e.head), e.lookahead === 0 && (e.strstart = 0, e.block_start = 0, e.insert = 0))), J(t), t.avail_out === 0))
      return e.last_flush = -1, q;
  }
  return n !== tt ? q : e.wrap <= 0 ? fn : (e.wrap === 2 ? (P(e, t.adler & 255), P(e, t.adler >> 8 & 255), P(e, t.adler >> 16 & 255), P(e, t.adler >> 24 & 255), P(e, t.total_in & 255), P(e, t.total_in >> 8 & 255), P(e, t.total_in >> 16 & 255), P(e, t.total_in >> 24 & 255)) : (Ot(e, t.adler >>> 16), Ot(e, t.adler & 65535)), J(t), e.wrap > 0 && (e.wrap = -e.wrap), e.pending !== 0 ? q : fn);
}, ur = (t) => {
  if (ne(t))
    return rt;
  const n = t.state.status;
  return t.state = null, n === bt ? vt(t, Na) : q;
}, gr = (t, n) => {
  let e = n.length;
  if (ne(t))
    return rt;
  const i = t.state, a = i.wrap;
  if (a === 2 || a === 1 && i.status !== zt || i.lookahead)
    return rt;
  if (a === 1 && (t.adler = Vt(t.adler, n, e, 0)), i.wrap = 0, e >= i.w_size) {
    a === 0 && (ht(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0);
    let d = new Uint8Array(i.w_size);
    d.set(n.subarray(e - i.w_size, e), 0), n = d, e = i.w_size;
  }
  const r = t.avail_in, s = t.next_in, o = t.input;
  for (t.avail_in = e, t.next_in = 0, t.input = n, Rt(i); i.lookahead >= $; ) {
    let d = i.strstart, l = i.lookahead - ($ - 1);
    do
      i.ins_h = _t(i, i.ins_h, i.window[d + $ - 1]), i.prev[d & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = d, d++;
    while (--l);
    i.strstart = d, i.lookahead = $ - 1, Rt(i);
  }
  return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = $ - 1, i.match_available = 0, t.next_in = s, t.input = o, t.avail_in = r, i.wrap = a, q;
};
var _r = hr, pr = _i, mr = gi, wr = ui, br = dr, vr = fr, xr = ur, Er = gr, yr = "pako deflate (from Nodeca project)", Zt = {
  deflateInit: _r,
  deflateInit2: pr,
  deflateReset: mr,
  deflateResetKeep: wr,
  deflateSetHeader: br,
  deflate: vr,
  deflateEnd: xr,
  deflateSetDictionary: Er,
  deflateInfo: yr
};
const kr = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
var Sr = function(t) {
  const n = Array.prototype.slice.call(arguments, 1);
  for (; n.length; ) {
    const e = n.shift();
    if (e) {
      if (typeof e != "object")
        throw new TypeError(e + "must be non-object");
      for (const i in e)
        kr(e, i) && (t[i] = e[i]);
    }
  }
  return t;
}, Dr = (t) => {
  let n = 0;
  for (let i = 0, a = t.length; i < a; i++)
    n += t[i].length;
  const e = new Uint8Array(n);
  for (let i = 0, a = 0, r = t.length; i < r; i++) {
    let s = t[i];
    e.set(s, a), a += s.length;
  }
  return e;
}, me = {
  assign: Sr,
  flattenChunks: Dr
};
let pi = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  pi = !1;
}
const Jt = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  Jt[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
Jt[254] = Jt[254] = 1;
var Ar = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let n, e, i, a, r, s = t.length, o = 0;
  for (a = 0; a < s; a++)
    e = t.charCodeAt(a), (e & 64512) === 55296 && a + 1 < s && (i = t.charCodeAt(a + 1), (i & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (i - 56320), a++)), o += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
  for (n = new Uint8Array(o), r = 0, a = 0; r < o; a++)
    e = t.charCodeAt(a), (e & 64512) === 55296 && a + 1 < s && (i = t.charCodeAt(a + 1), (i & 64512) === 56320 && (e = 65536 + (e - 55296 << 10) + (i - 56320), a++)), e < 128 ? n[r++] = e : e < 2048 ? (n[r++] = 192 | e >>> 6, n[r++] = 128 | e & 63) : e < 65536 ? (n[r++] = 224 | e >>> 12, n[r++] = 128 | e >>> 6 & 63, n[r++] = 128 | e & 63) : (n[r++] = 240 | e >>> 18, n[r++] = 128 | e >>> 12 & 63, n[r++] = 128 | e >>> 6 & 63, n[r++] = 128 | e & 63);
  return n;
};
const Lr = (t, n) => {
  if (n < 65534 && t.subarray && pi)
    return String.fromCharCode.apply(null, t.length === n ? t : t.subarray(0, n));
  let e = "";
  for (let i = 0; i < n; i++)
    e += String.fromCharCode(t[i]);
  return e;
};
var Cr = (t, n) => {
  const e = n || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, n));
  let i, a;
  const r = new Array(e * 2);
  for (a = 0, i = 0; i < e; ) {
    let s = t[i++];
    if (s < 128) {
      r[a++] = s;
      continue;
    }
    let o = Jt[s];
    if (o > 4) {
      r[a++] = 65533, i += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && i < e; )
      s = s << 6 | t[i++] & 63, o--;
    if (o > 1) {
      r[a++] = 65533;
      continue;
    }
    s < 65536 ? r[a++] = s : (s -= 65536, r[a++] = 55296 | s >> 10 & 1023, r[a++] = 56320 | s & 1023);
  }
  return Lr(r, a);
}, Tr = (t, n) => {
  n = n || t.length, n > t.length && (n = t.length);
  let e = n - 1;
  for (; e >= 0 && (t[e] & 192) === 128; )
    e--;
  return e < 0 || e === 0 ? n : e + Jt[t[e]] > n ? e : n;
}, Qt = {
  string2buf: Ar,
  buf2string: Cr,
  utf8border: Tr
};
function zr() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var mi = zr;
const wi = Object.prototype.toString, {
  Z_NO_FLUSH: Rr,
  Z_SYNC_FLUSH: Hr,
  Z_FULL_FLUSH: Ir,
  Z_FINISH: Mr,
  Z_OK: ge,
  Z_STREAM_END: Br,
  Z_DEFAULT_COMPRESSION: $r,
  Z_DEFAULT_STRATEGY: Pr,
  Z_DEFLATED: Or
} = kt;
function ie(t) {
  this.options = me.assign({
    level: $r,
    method: Or,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Pr
  }, t || {});
  let n = this.options;
  n.raw && n.windowBits > 0 ? n.windowBits = -n.windowBits : n.gzip && n.windowBits > 0 && n.windowBits < 16 && (n.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new mi(), this.strm.avail_out = 0;
  let e = Zt.deflateInit2(
    this.strm,
    n.level,
    n.method,
    n.windowBits,
    n.memLevel,
    n.strategy
  );
  if (e !== ge)
    throw new Error(xt[e]);
  if (n.header && Zt.deflateSetHeader(this.strm, n.header), n.dictionary) {
    let i;
    if (typeof n.dictionary == "string" ? i = Qt.string2buf(n.dictionary) : wi.call(n.dictionary) === "[object ArrayBuffer]" ? i = new Uint8Array(n.dictionary) : i = n.dictionary, e = Zt.deflateSetDictionary(this.strm, i), e !== ge)
      throw new Error(xt[e]);
    this._dict_set = !0;
  }
}
ie.prototype.push = function(t, n) {
  const e = this.strm, i = this.options.chunkSize;
  let a, r;
  if (this.ended)
    return !1;
  for (n === ~~n ? r = n : r = n === !0 ? Mr : Rr, typeof t == "string" ? e.input = Qt.string2buf(t) : wi.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length; ; ) {
    if (e.avail_out === 0 && (e.output = new Uint8Array(i), e.next_out = 0, e.avail_out = i), (r === Hr || r === Ir) && e.avail_out <= 6) {
      this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
      continue;
    }
    if (a = Zt.deflate(e, r), a === Br)
      return e.next_out > 0 && this.onData(e.output.subarray(0, e.next_out)), a = Zt.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === ge;
    if (e.avail_out === 0) {
      this.onData(e.output);
      continue;
    }
    if (r > 0 && e.next_out > 0) {
      this.onData(e.output.subarray(0, e.next_out)), e.avail_out = 0;
      continue;
    }
    if (e.avail_in === 0)
      break;
  }
  return !0;
};
ie.prototype.onData = function(t) {
  this.chunks.push(t);
};
ie.prototype.onEnd = function(t) {
  t === ge && (this.result = me.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function Qe(t, n) {
  const e = new ie(n);
  if (e.push(t, !0), e.err)
    throw e.msg || xt[e.err];
  return e.result;
}
function Nr(t, n) {
  return n = n || {}, n.raw = !0, Qe(t, n);
}
function Fr(t, n) {
  return n = n || {}, n.gzip = !0, Qe(t, n);
}
var Ur = ie, Zr = Qe, Gr = Nr, qr = Fr, Yr = kt, jr = {
  Deflate: Ur,
  deflate: Zr,
  deflateRaw: Gr,
  gzip: qr,
  constants: Yr
};
const oe = 16209, Xr = 16191;
var Wr = function(n, e) {
  let i, a, r, s, o, d, l, c, u, g, h, p, k, S, L, z, A, _, C, R, v, B, H, x;
  const w = n.state;
  i = n.next_in, H = n.input, a = i + (n.avail_in - 5), r = n.next_out, x = n.output, s = r - (e - n.avail_out), o = r + (n.avail_out - 257), d = w.dmax, l = w.wsize, c = w.whave, u = w.wnext, g = w.window, h = w.hold, p = w.bits, k = w.lencode, S = w.distcode, L = (1 << w.lenbits) - 1, z = (1 << w.distbits) - 1;
  t:
    do {
      p < 15 && (h += H[i++] << p, p += 8, h += H[i++] << p, p += 8), A = k[h & L];
      e:
        for (; ; ) {
          if (_ = A >>> 24, h >>>= _, p -= _, _ = A >>> 16 & 255, _ === 0)
            x[r++] = A & 65535;
          else if (_ & 16) {
            C = A & 65535, _ &= 15, _ && (p < _ && (h += H[i++] << p, p += 8), C += h & (1 << _) - 1, h >>>= _, p -= _), p < 15 && (h += H[i++] << p, p += 8, h += H[i++] << p, p += 8), A = S[h & z];
            n:
              for (; ; ) {
                if (_ = A >>> 24, h >>>= _, p -= _, _ = A >>> 16 & 255, _ & 16) {
                  if (R = A & 65535, _ &= 15, p < _ && (h += H[i++] << p, p += 8, p < _ && (h += H[i++] << p, p += 8)), R += h & (1 << _) - 1, R > d) {
                    n.msg = "invalid distance too far back", w.mode = oe;
                    break t;
                  }
                  if (h >>>= _, p -= _, _ = r - s, R > _) {
                    if (_ = R - _, _ > c && w.sane) {
                      n.msg = "invalid distance too far back", w.mode = oe;
                      break t;
                    }
                    if (v = 0, B = g, u === 0) {
                      if (v += l - _, _ < C) {
                        C -= _;
                        do
                          x[r++] = g[v++];
                        while (--_);
                        v = r - R, B = x;
                      }
                    } else if (u < _) {
                      if (v += l + u - _, _ -= u, _ < C) {
                        C -= _;
                        do
                          x[r++] = g[v++];
                        while (--_);
                        if (v = 0, u < C) {
                          _ = u, C -= _;
                          do
                            x[r++] = g[v++];
                          while (--_);
                          v = r - R, B = x;
                        }
                      }
                    } else if (v += u - _, _ < C) {
                      C -= _;
                      do
                        x[r++] = g[v++];
                      while (--_);
                      v = r - R, B = x;
                    }
                    for (; C > 2; )
                      x[r++] = B[v++], x[r++] = B[v++], x[r++] = B[v++], C -= 3;
                    C && (x[r++] = B[v++], C > 1 && (x[r++] = B[v++]));
                  } else {
                    v = r - R;
                    do
                      x[r++] = x[v++], x[r++] = x[v++], x[r++] = x[v++], C -= 3;
                    while (C > 2);
                    C && (x[r++] = x[v++], C > 1 && (x[r++] = x[v++]));
                  }
                } else if (_ & 64) {
                  n.msg = "invalid distance code", w.mode = oe;
                  break t;
                } else {
                  A = S[(A & 65535) + (h & (1 << _) - 1)];
                  continue n;
                }
                break;
              }
          } else if (_ & 64)
            if (_ & 32) {
              w.mode = Xr;
              break t;
            } else {
              n.msg = "invalid literal/length code", w.mode = oe;
              break t;
            }
          else {
            A = k[(A & 65535) + (h & (1 << _) - 1)];
            continue e;
          }
          break;
        }
    } while (i < a && r < o);
  C = p >> 3, i -= C, p -= C << 3, h &= (1 << p) - 1, n.next_in = i, n.next_out = r, n.avail_in = i < a ? 5 + (a - i) : 5 - (i - a), n.avail_out = r < o ? 257 + (o - r) : 257 - (r - o), w.hold = h, w.bits = p;
};
const Lt = 15, gn = 852, _n = 592, pn = 0, Se = 1, mn = 2, Vr = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), Jr = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), Qr = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), Kr = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), ts = (t, n, e, i, a, r, s, o) => {
  const d = o.bits;
  let l = 0, c = 0, u = 0, g = 0, h = 0, p = 0, k = 0, S = 0, L = 0, z = 0, A, _, C, R, v, B = null, H;
  const x = new Uint16Array(Lt + 1), w = new Uint16Array(Lt + 1);
  let X = null, Bt, T, b;
  for (l = 0; l <= Lt; l++)
    x[l] = 0;
  for (c = 0; c < i; c++)
    x[n[e + c]]++;
  for (h = d, g = Lt; g >= 1 && x[g] === 0; g--)
    ;
  if (h > g && (h = g), g === 0)
    return a[r++] = 1 << 24 | 64 << 16 | 0, a[r++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (u = 1; u < g && x[u] === 0; u++)
    ;
  for (h < u && (h = u), S = 1, l = 1; l <= Lt; l++)
    if (S <<= 1, S -= x[l], S < 0)
      return -1;
  if (S > 0 && (t === pn || g !== 1))
    return -1;
  for (w[1] = 0, l = 1; l < Lt; l++)
    w[l + 1] = w[l] + x[l];
  for (c = 0; c < i; c++)
    n[e + c] !== 0 && (s[w[n[e + c]]++] = c);
  if (t === pn ? (B = X = s, H = 20) : t === Se ? (B = Vr, X = Jr, H = 257) : (B = Qr, X = Kr, H = 0), z = 0, c = 0, l = u, v = r, p = h, k = 0, C = -1, L = 1 << h, R = L - 1, t === Se && L > gn || t === mn && L > _n)
    return 1;
  for (; ; ) {
    Bt = l - k, s[c] + 1 < H ? (T = 0, b = s[c]) : s[c] >= H ? (T = X[s[c] - H], b = B[s[c] - H]) : (T = 32 + 64, b = 0), A = 1 << l - k, _ = 1 << p, u = _;
    do
      _ -= A, a[v + (z >> k) + _] = Bt << 24 | T << 16 | b | 0;
    while (_ !== 0);
    for (A = 1 << l - 1; z & A; )
      A >>= 1;
    if (A !== 0 ? (z &= A - 1, z += A) : z = 0, c++, --x[l] === 0) {
      if (l === g)
        break;
      l = n[e + s[c]];
    }
    if (l > h && (z & R) !== C) {
      for (k === 0 && (k = h), v += u, p = l - k, S = 1 << p; p + k < g && (S -= x[p + k], !(S <= 0)); )
        p++, S <<= 1;
      if (L += 1 << p, t === Se && L > gn || t === mn && L > _n)
        return 1;
      C = z & R, a[C] = h << 24 | p << 16 | v - r | 0;
    }
  }
  return z !== 0 && (a[v + z] = l - k << 24 | 64 << 16 | 0), o.bits = h, 0;
};
var Gt = ts;
const es = 0, bi = 1, vi = 2, {
  Z_FINISH: wn,
  Z_BLOCK: ns,
  Z_TREES: le,
  Z_OK: yt,
  Z_STREAM_END: is,
  Z_NEED_DICT: as,
  Z_STREAM_ERROR: et,
  Z_DATA_ERROR: xi,
  Z_MEM_ERROR: Ei,
  Z_BUF_ERROR: rs,
  Z_DEFLATED: bn
} = kt, we = 16180, vn = 16181, xn = 16182, En = 16183, yn = 16184, kn = 16185, Sn = 16186, Dn = 16187, An = 16188, Ln = 16189, _e = 16190, ot = 16191, De = 16192, Cn = 16193, Ae = 16194, Tn = 16195, zn = 16196, Rn = 16197, Hn = 16198, ce = 16199, de = 16200, In = 16201, Mn = 16202, Bn = 16203, $n = 16204, Pn = 16205, Le = 16206, On = 16207, Nn = 16208, N = 16209, yi = 16210, ki = 16211, ss = 852, os = 592, ls = 15, cs = ls, Fn = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function ds() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const St = (t) => {
  if (!t)
    return 1;
  const n = t.state;
  return !n || n.strm !== t || n.mode < we || n.mode > ki ? 1 : 0;
}, Si = (t) => {
  if (St(t))
    return et;
  const n = t.state;
  return t.total_in = t.total_out = n.total = 0, t.msg = "", n.wrap && (t.adler = n.wrap & 1), n.mode = we, n.last = 0, n.havedict = 0, n.flags = -1, n.dmax = 32768, n.head = null, n.hold = 0, n.bits = 0, n.lencode = n.lendyn = new Int32Array(ss), n.distcode = n.distdyn = new Int32Array(os), n.sane = 1, n.back = -1, yt;
}, Di = (t) => {
  if (St(t))
    return et;
  const n = t.state;
  return n.wsize = 0, n.whave = 0, n.wnext = 0, Si(t);
}, Ai = (t, n) => {
  let e;
  if (St(t))
    return et;
  const i = t.state;
  return n < 0 ? (e = 0, n = -n) : (e = (n >> 4) + 5, n < 48 && (n &= 15)), n && (n < 8 || n > 15) ? et : (i.window !== null && i.wbits !== n && (i.window = null), i.wrap = e, i.wbits = n, Di(t));
}, Li = (t, n) => {
  if (!t)
    return et;
  const e = new ds();
  t.state = e, e.strm = t, e.window = null, e.mode = we;
  const i = Ai(t, n);
  return i !== yt && (t.state = null), i;
}, hs = (t) => Li(t, cs);
let Un = !0, Ce, Te;
const fs = (t) => {
  if (Un) {
    Ce = new Int32Array(512), Te = new Int32Array(32);
    let n = 0;
    for (; n < 144; )
      t.lens[n++] = 8;
    for (; n < 256; )
      t.lens[n++] = 9;
    for (; n < 280; )
      t.lens[n++] = 7;
    for (; n < 288; )
      t.lens[n++] = 8;
    for (Gt(bi, t.lens, 0, 288, Ce, 0, t.work, { bits: 9 }), n = 0; n < 32; )
      t.lens[n++] = 5;
    Gt(vi, t.lens, 0, 32, Te, 0, t.work, { bits: 5 }), Un = !1;
  }
  t.lencode = Ce, t.lenbits = 9, t.distcode = Te, t.distbits = 5;
}, Ci = (t, n, e, i) => {
  let a;
  const r = t.state;
  return r.window === null && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new Uint8Array(r.wsize)), i >= r.wsize ? (r.window.set(n.subarray(e - r.wsize, e), 0), r.wnext = 0, r.whave = r.wsize) : (a = r.wsize - r.wnext, a > i && (a = i), r.window.set(n.subarray(e - i, e - i + a), r.wnext), i -= a, i ? (r.window.set(n.subarray(e - i, e), 0), r.wnext = i, r.whave = r.wsize) : (r.wnext += a, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += a))), 0;
}, us = (t, n) => {
  let e, i, a, r, s, o, d, l, c, u, g, h, p, k, S = 0, L, z, A, _, C, R, v, B;
  const H = new Uint8Array(4);
  let x, w;
  const X = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (St(t) || !t.output || !t.input && t.avail_in !== 0)
    return et;
  e = t.state, e.mode === ot && (e.mode = De), s = t.next_out, a = t.output, d = t.avail_out, r = t.next_in, i = t.input, o = t.avail_in, l = e.hold, c = e.bits, u = o, g = d, B = yt;
  t:
    for (; ; )
      switch (e.mode) {
        case we:
          if (e.wrap === 0) {
            e.mode = De;
            break;
          }
          for (; c < 16; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if (e.wrap & 2 && l === 35615) {
            e.wbits === 0 && (e.wbits = 15), e.check = 0, H[0] = l & 255, H[1] = l >>> 8 & 255, e.check = Z(e.check, H, 2, 0), l = 0, c = 0, e.mode = vn;
            break;
          }
          if (e.head && (e.head.done = !1), !(e.wrap & 1) || /* check if zlib header allowed */
          (((l & 255) << 8) + (l >> 8)) % 31) {
            t.msg = "incorrect header check", e.mode = N;
            break;
          }
          if ((l & 15) !== bn) {
            t.msg = "unknown compression method", e.mode = N;
            break;
          }
          if (l >>>= 4, c -= 4, v = (l & 15) + 8, e.wbits === 0 && (e.wbits = v), v > 15 || v > e.wbits) {
            t.msg = "invalid window size", e.mode = N;
            break;
          }
          e.dmax = 1 << e.wbits, e.flags = 0, t.adler = e.check = 1, e.mode = l & 512 ? Ln : ot, l = 0, c = 0;
          break;
        case vn:
          for (; c < 16; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if (e.flags = l, (e.flags & 255) !== bn) {
            t.msg = "unknown compression method", e.mode = N;
            break;
          }
          if (e.flags & 57344) {
            t.msg = "unknown header flags set", e.mode = N;
            break;
          }
          e.head && (e.head.text = l >> 8 & 1), e.flags & 512 && e.wrap & 4 && (H[0] = l & 255, H[1] = l >>> 8 & 255, e.check = Z(e.check, H, 2, 0)), l = 0, c = 0, e.mode = xn;
        case xn:
          for (; c < 32; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          e.head && (e.head.time = l), e.flags & 512 && e.wrap & 4 && (H[0] = l & 255, H[1] = l >>> 8 & 255, H[2] = l >>> 16 & 255, H[3] = l >>> 24 & 255, e.check = Z(e.check, H, 4, 0)), l = 0, c = 0, e.mode = En;
        case En:
          for (; c < 16; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          e.head && (e.head.xflags = l & 255, e.head.os = l >> 8), e.flags & 512 && e.wrap & 4 && (H[0] = l & 255, H[1] = l >>> 8 & 255, e.check = Z(e.check, H, 2, 0)), l = 0, c = 0, e.mode = yn;
        case yn:
          if (e.flags & 1024) {
            for (; c < 16; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            e.length = l, e.head && (e.head.extra_len = l), e.flags & 512 && e.wrap & 4 && (H[0] = l & 255, H[1] = l >>> 8 & 255, e.check = Z(e.check, H, 2, 0)), l = 0, c = 0;
          } else
            e.head && (e.head.extra = null);
          e.mode = kn;
        case kn:
          if (e.flags & 1024 && (h = e.length, h > o && (h = o), h && (e.head && (v = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Uint8Array(e.head.extra_len)), e.head.extra.set(
            i.subarray(
              r,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              r + h
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            v
          )), e.flags & 512 && e.wrap & 4 && (e.check = Z(e.check, i, h, r)), o -= h, r += h, e.length -= h), e.length))
            break t;
          e.length = 0, e.mode = Sn;
        case Sn:
          if (e.flags & 2048) {
            if (o === 0)
              break t;
            h = 0;
            do
              v = i[r + h++], e.head && v && e.length < 65536 && (e.head.name += String.fromCharCode(v));
            while (v && h < o);
            if (e.flags & 512 && e.wrap & 4 && (e.check = Z(e.check, i, h, r)), o -= h, r += h, v)
              break t;
          } else
            e.head && (e.head.name = null);
          e.length = 0, e.mode = Dn;
        case Dn:
          if (e.flags & 4096) {
            if (o === 0)
              break t;
            h = 0;
            do
              v = i[r + h++], e.head && v && e.length < 65536 && (e.head.comment += String.fromCharCode(v));
            while (v && h < o);
            if (e.flags & 512 && e.wrap & 4 && (e.check = Z(e.check, i, h, r)), o -= h, r += h, v)
              break t;
          } else
            e.head && (e.head.comment = null);
          e.mode = An;
        case An:
          if (e.flags & 512) {
            for (; c < 16; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            if (e.wrap & 4 && l !== (e.check & 65535)) {
              t.msg = "header crc mismatch", e.mode = N;
              break;
            }
            l = 0, c = 0;
          }
          e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), t.adler = e.check = 0, e.mode = ot;
          break;
        case Ln:
          for (; c < 32; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          t.adler = e.check = Fn(l), l = 0, c = 0, e.mode = _e;
        case _e:
          if (e.havedict === 0)
            return t.next_out = s, t.avail_out = d, t.next_in = r, t.avail_in = o, e.hold = l, e.bits = c, as;
          t.adler = e.check = 1, e.mode = ot;
        case ot:
          if (n === ns || n === le)
            break t;
        case De:
          if (e.last) {
            l >>>= c & 7, c -= c & 7, e.mode = Le;
            break;
          }
          for (; c < 3; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          switch (e.last = l & 1, l >>>= 1, c -= 1, l & 3) {
            case 0:
              e.mode = Cn;
              break;
            case 1:
              if (fs(e), e.mode = ce, n === le) {
                l >>>= 2, c -= 2;
                break t;
              }
              break;
            case 2:
              e.mode = zn;
              break;
            case 3:
              t.msg = "invalid block type", e.mode = N;
          }
          l >>>= 2, c -= 2;
          break;
        case Cn:
          for (l >>>= c & 7, c -= c & 7; c < 32; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if ((l & 65535) !== (l >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", e.mode = N;
            break;
          }
          if (e.length = l & 65535, l = 0, c = 0, e.mode = Ae, n === le)
            break t;
        case Ae:
          e.mode = Tn;
        case Tn:
          if (h = e.length, h) {
            if (h > o && (h = o), h > d && (h = d), h === 0)
              break t;
            a.set(i.subarray(r, r + h), s), o -= h, r += h, d -= h, s += h, e.length -= h;
            break;
          }
          e.mode = ot;
          break;
        case zn:
          for (; c < 14; ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if (e.nlen = (l & 31) + 257, l >>>= 5, c -= 5, e.ndist = (l & 31) + 1, l >>>= 5, c -= 5, e.ncode = (l & 15) + 4, l >>>= 4, c -= 4, e.nlen > 286 || e.ndist > 30) {
            t.msg = "too many length or distance symbols", e.mode = N;
            break;
          }
          e.have = 0, e.mode = Rn;
        case Rn:
          for (; e.have < e.ncode; ) {
            for (; c < 3; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            e.lens[X[e.have++]] = l & 7, l >>>= 3, c -= 3;
          }
          for (; e.have < 19; )
            e.lens[X[e.have++]] = 0;
          if (e.lencode = e.lendyn, e.lenbits = 7, x = { bits: e.lenbits }, B = Gt(es, e.lens, 0, 19, e.lencode, 0, e.work, x), e.lenbits = x.bits, B) {
            t.msg = "invalid code lengths set", e.mode = N;
            break;
          }
          e.have = 0, e.mode = Hn;
        case Hn:
          for (; e.have < e.nlen + e.ndist; ) {
            for (; S = e.lencode[l & (1 << e.lenbits) - 1], L = S >>> 24, z = S >>> 16 & 255, A = S & 65535, !(L <= c); ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            if (A < 16)
              l >>>= L, c -= L, e.lens[e.have++] = A;
            else {
              if (A === 16) {
                for (w = L + 2; c < w; ) {
                  if (o === 0)
                    break t;
                  o--, l += i[r++] << c, c += 8;
                }
                if (l >>>= L, c -= L, e.have === 0) {
                  t.msg = "invalid bit length repeat", e.mode = N;
                  break;
                }
                v = e.lens[e.have - 1], h = 3 + (l & 3), l >>>= 2, c -= 2;
              } else if (A === 17) {
                for (w = L + 3; c < w; ) {
                  if (o === 0)
                    break t;
                  o--, l += i[r++] << c, c += 8;
                }
                l >>>= L, c -= L, v = 0, h = 3 + (l & 7), l >>>= 3, c -= 3;
              } else {
                for (w = L + 7; c < w; ) {
                  if (o === 0)
                    break t;
                  o--, l += i[r++] << c, c += 8;
                }
                l >>>= L, c -= L, v = 0, h = 11 + (l & 127), l >>>= 7, c -= 7;
              }
              if (e.have + h > e.nlen + e.ndist) {
                t.msg = "invalid bit length repeat", e.mode = N;
                break;
              }
              for (; h--; )
                e.lens[e.have++] = v;
            }
          }
          if (e.mode === N)
            break;
          if (e.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", e.mode = N;
            break;
          }
          if (e.lenbits = 9, x = { bits: e.lenbits }, B = Gt(bi, e.lens, 0, e.nlen, e.lencode, 0, e.work, x), e.lenbits = x.bits, B) {
            t.msg = "invalid literal/lengths set", e.mode = N;
            break;
          }
          if (e.distbits = 6, e.distcode = e.distdyn, x = { bits: e.distbits }, B = Gt(vi, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, x), e.distbits = x.bits, B) {
            t.msg = "invalid distances set", e.mode = N;
            break;
          }
          if (e.mode = ce, n === le)
            break t;
        case ce:
          e.mode = de;
        case de:
          if (o >= 6 && d >= 258) {
            t.next_out = s, t.avail_out = d, t.next_in = r, t.avail_in = o, e.hold = l, e.bits = c, Wr(t, g), s = t.next_out, a = t.output, d = t.avail_out, r = t.next_in, i = t.input, o = t.avail_in, l = e.hold, c = e.bits, e.mode === ot && (e.back = -1);
            break;
          }
          for (e.back = 0; S = e.lencode[l & (1 << e.lenbits) - 1], L = S >>> 24, z = S >>> 16 & 255, A = S & 65535, !(L <= c); ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if (z && !(z & 240)) {
            for (_ = L, C = z, R = A; S = e.lencode[R + ((l & (1 << _ + C) - 1) >> _)], L = S >>> 24, z = S >>> 16 & 255, A = S & 65535, !(_ + L <= c); ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            l >>>= _, c -= _, e.back += _;
          }
          if (l >>>= L, c -= L, e.back += L, e.length = A, z === 0) {
            e.mode = Pn;
            break;
          }
          if (z & 32) {
            e.back = -1, e.mode = ot;
            break;
          }
          if (z & 64) {
            t.msg = "invalid literal/length code", e.mode = N;
            break;
          }
          e.extra = z & 15, e.mode = In;
        case In:
          if (e.extra) {
            for (w = e.extra; c < w; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            e.length += l & (1 << e.extra) - 1, l >>>= e.extra, c -= e.extra, e.back += e.extra;
          }
          e.was = e.length, e.mode = Mn;
        case Mn:
          for (; S = e.distcode[l & (1 << e.distbits) - 1], L = S >>> 24, z = S >>> 16 & 255, A = S & 65535, !(L <= c); ) {
            if (o === 0)
              break t;
            o--, l += i[r++] << c, c += 8;
          }
          if (!(z & 240)) {
            for (_ = L, C = z, R = A; S = e.distcode[R + ((l & (1 << _ + C) - 1) >> _)], L = S >>> 24, z = S >>> 16 & 255, A = S & 65535, !(_ + L <= c); ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            l >>>= _, c -= _, e.back += _;
          }
          if (l >>>= L, c -= L, e.back += L, z & 64) {
            t.msg = "invalid distance code", e.mode = N;
            break;
          }
          e.offset = A, e.extra = z & 15, e.mode = Bn;
        case Bn:
          if (e.extra) {
            for (w = e.extra; c < w; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            e.offset += l & (1 << e.extra) - 1, l >>>= e.extra, c -= e.extra, e.back += e.extra;
          }
          if (e.offset > e.dmax) {
            t.msg = "invalid distance too far back", e.mode = N;
            break;
          }
          e.mode = $n;
        case $n:
          if (d === 0)
            break t;
          if (h = g - d, e.offset > h) {
            if (h = e.offset - h, h > e.whave && e.sane) {
              t.msg = "invalid distance too far back", e.mode = N;
              break;
            }
            h > e.wnext ? (h -= e.wnext, p = e.wsize - h) : p = e.wnext - h, h > e.length && (h = e.length), k = e.window;
          } else
            k = a, p = s - e.offset, h = e.length;
          h > d && (h = d), d -= h, e.length -= h;
          do
            a[s++] = k[p++];
          while (--h);
          e.length === 0 && (e.mode = de);
          break;
        case Pn:
          if (d === 0)
            break t;
          a[s++] = e.length, d--, e.mode = de;
          break;
        case Le:
          if (e.wrap) {
            for (; c < 32; ) {
              if (o === 0)
                break t;
              o--, l |= i[r++] << c, c += 8;
            }
            if (g -= d, t.total_out += g, e.total += g, e.wrap & 4 && g && (t.adler = e.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            e.flags ? Z(e.check, a, g, s - g) : Vt(e.check, a, g, s - g)), g = d, e.wrap & 4 && (e.flags ? l : Fn(l)) !== e.check) {
              t.msg = "incorrect data check", e.mode = N;
              break;
            }
            l = 0, c = 0;
          }
          e.mode = On;
        case On:
          if (e.wrap && e.flags) {
            for (; c < 32; ) {
              if (o === 0)
                break t;
              o--, l += i[r++] << c, c += 8;
            }
            if (e.wrap & 4 && l !== (e.total & 4294967295)) {
              t.msg = "incorrect length check", e.mode = N;
              break;
            }
            l = 0, c = 0;
          }
          e.mode = Nn;
        case Nn:
          B = is;
          break t;
        case N:
          B = xi;
          break t;
        case yi:
          return Ei;
        case ki:
        default:
          return et;
      }
  return t.next_out = s, t.avail_out = d, t.next_in = r, t.avail_in = o, e.hold = l, e.bits = c, (e.wsize || g !== t.avail_out && e.mode < N && (e.mode < Le || n !== wn)) && Ci(t, t.output, t.next_out, g - t.avail_out), u -= t.avail_in, g -= t.avail_out, t.total_in += u, t.total_out += g, e.total += g, e.wrap & 4 && g && (t.adler = e.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  e.flags ? Z(e.check, a, g, t.next_out - g) : Vt(e.check, a, g, t.next_out - g)), t.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === ot ? 128 : 0) + (e.mode === ce || e.mode === Ae ? 256 : 0), (u === 0 && g === 0 || n === wn) && B === yt && (B = rs), B;
}, gs = (t) => {
  if (St(t))
    return et;
  let n = t.state;
  return n.window && (n.window = null), t.state = null, yt;
}, _s = (t, n) => {
  if (St(t))
    return et;
  const e = t.state;
  return e.wrap & 2 ? (e.head = n, n.done = !1, yt) : et;
}, ps = (t, n) => {
  const e = n.length;
  let i, a, r;
  return St(t) || (i = t.state, i.wrap !== 0 && i.mode !== _e) ? et : i.mode === _e && (a = 1, a = Vt(a, n, e, 0), a !== i.check) ? xi : (r = Ci(t, n, e, e), r ? (i.mode = yi, Ei) : (i.havedict = 1, yt));
};
var ms = Di, ws = Ai, bs = Si, vs = hs, xs = Li, Es = us, ys = gs, ks = _s, Ss = ps, Ds = "pako inflate (from Nodeca project)", ct = {
  inflateReset: ms,
  inflateReset2: ws,
  inflateResetKeep: bs,
  inflateInit: vs,
  inflateInit2: xs,
  inflate: Es,
  inflateEnd: ys,
  inflateGetHeader: ks,
  inflateSetDictionary: Ss,
  inflateInfo: Ds
};
function As() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Ls = As;
const Ti = Object.prototype.toString, {
  Z_NO_FLUSH: Cs,
  Z_FINISH: Ts,
  Z_OK: Kt,
  Z_STREAM_END: ze,
  Z_NEED_DICT: Re,
  Z_STREAM_ERROR: zs,
  Z_DATA_ERROR: Zn,
  Z_MEM_ERROR: Rs
} = kt;
function ae(t) {
  this.options = me.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const n = this.options;
  n.raw && n.windowBits >= 0 && n.windowBits < 16 && (n.windowBits = -n.windowBits, n.windowBits === 0 && (n.windowBits = -15)), n.windowBits >= 0 && n.windowBits < 16 && !(t && t.windowBits) && (n.windowBits += 32), n.windowBits > 15 && n.windowBits < 48 && (n.windowBits & 15 || (n.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new mi(), this.strm.avail_out = 0;
  let e = ct.inflateInit2(
    this.strm,
    n.windowBits
  );
  if (e !== Kt)
    throw new Error(xt[e]);
  if (this.header = new Ls(), ct.inflateGetHeader(this.strm, this.header), n.dictionary && (typeof n.dictionary == "string" ? n.dictionary = Qt.string2buf(n.dictionary) : Ti.call(n.dictionary) === "[object ArrayBuffer]" && (n.dictionary = new Uint8Array(n.dictionary)), n.raw && (e = ct.inflateSetDictionary(this.strm, n.dictionary), e !== Kt)))
    throw new Error(xt[e]);
}
ae.prototype.push = function(t, n) {
  const e = this.strm, i = this.options.chunkSize, a = this.options.dictionary;
  let r, s, o;
  if (this.ended)
    return !1;
  for (n === ~~n ? s = n : s = n === !0 ? Ts : Cs, Ti.call(t) === "[object ArrayBuffer]" ? e.input = new Uint8Array(t) : e.input = t, e.next_in = 0, e.avail_in = e.input.length; ; ) {
    for (e.avail_out === 0 && (e.output = new Uint8Array(i), e.next_out = 0, e.avail_out = i), r = ct.inflate(e, s), r === Re && a && (r = ct.inflateSetDictionary(e, a), r === Kt ? r = ct.inflate(e, s) : r === Zn && (r = Re)); e.avail_in > 0 && r === ze && e.state.wrap > 0 && t[e.next_in] !== 0; )
      ct.inflateReset(e), r = ct.inflate(e, s);
    switch (r) {
      case zs:
      case Zn:
      case Re:
      case Rs:
        return this.onEnd(r), this.ended = !0, !1;
    }
    if (o = e.avail_out, e.next_out && (e.avail_out === 0 || r === ze))
      if (this.options.to === "string") {
        let d = Qt.utf8border(e.output, e.next_out), l = e.next_out - d, c = Qt.buf2string(e.output, d);
        e.next_out = l, e.avail_out = i - l, l && e.output.set(e.output.subarray(d, d + l), 0), this.onData(c);
      } else
        this.onData(e.output.length === e.next_out ? e.output : e.output.subarray(0, e.next_out));
    if (!(r === Kt && o === 0)) {
      if (r === ze)
        return r = ct.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, !0;
      if (e.avail_in === 0)
        break;
    }
  }
  return !0;
};
ae.prototype.onData = function(t) {
  this.chunks.push(t);
};
ae.prototype.onEnd = function(t) {
  t === Kt && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = me.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function Ke(t, n) {
  const e = new ae(n);
  if (e.push(t), e.err)
    throw e.msg || xt[e.err];
  return e.result;
}
function Hs(t, n) {
  return n = n || {}, n.raw = !0, Ke(t, n);
}
var Is = ae, Ms = Ke, Bs = Hs, $s = Ke, Ps = kt, Os = {
  Inflate: Is,
  inflate: Ms,
  inflateRaw: Bs,
  ungzip: $s,
  constants: Ps
};
const { Deflate: Ns, deflate: Fs, deflateRaw: Us, gzip: Zs } = jr, { Inflate: Gs, inflate: qs, inflateRaw: Ys, ungzip: js } = Os;
var Xs = Ns, Ws = Fs, Vs = Us, Js = Zs, Qs = Gs, Ks = qs, to = Ys, eo = js, no = kt, Gn = {
  Deflate: Xs,
  deflate: Ws,
  deflateRaw: Vs,
  gzip: Js,
  Inflate: Qs,
  inflate: Ks,
  inflateRaw: to,
  ungzip: eo,
  constants: no
};
class io {
  constructor(n) {
    f(this, "canvas");
    f(this, "draw");
    f(this, "imageData");
    // canvas 像素数据，用于实现重置及绘制辅助线
    // 需要在这里实现用户background的信息记录，才可以实现重绘后完整复原用户配置
    f(this, "background");
    this.draw = n, this.background = {
      origin: !1,
      originColor: "",
      watermark: !1,
      watermarkColor: "",
      watermarkText: "",
      gridline: !1,
      gridlineColor: ""
    };
  }
  /**
   * 初始化 canvas
   * @param width canvas 宽度
   * @param height canvas 高度
   * @returns
   */
  initCanvas(n, e) {
    const i = this.draw.createHTMLElement("canvas");
    return i.classList.add("sf-editor-box-canvas"), this.canvas = i, this.setCanvasInfo(n, e), i;
  }
  /**
   * 设置 canvas 宽高
   * @param width
   * @param height
   */
  setCanvasInfo(n, e) {
    this.canvas.width = n, this.canvas.height = e;
  }
  /**
   * 绘制网格线
   * @param color 支持 rgb hsl hex
   * @returns
   */
  gridLine(n) {
    if (!this.canvas)
      return;
    this.background.gridline = !0, this.background.gridlineColor = n;
    var e = this.canvas.getContext("2d");
    const { height: i, width: a } = this.canvas;
    var r = 20, s = Math.floor(i / r), o = Math.floor(a / r), d = "211, 211, 211";
    n && (d = this.colorHandle(n));
    for (let u = 0; u <= s; u++) {
      var l = u * r;
      e.beginPath(), e.moveTo(0, l), e.lineTo(a, l), e.strokeStyle = `rgba(${d}, ${u % 5 ? "0.4" : "1"})`, e.stroke();
    }
    for (let u = 0; u <= o; u++) {
      var c = u * r;
      e.beginPath(), e.moveTo(c, 0), e.lineTo(c, i), e.strokeStyle = `rgba(${d}, ${u % 5 ? "0.4" : "1"})`, e.stroke();
    }
  }
  /**
   * 网格背景-小圆点
   */
  origin(n) {
    if (!this.canvas)
      return;
    this.background.origin = !0, this.background.originColor = n;
    var e = this.canvas.getContext("2d"), i = "211, 211, 211";
    n && (i = this.colorHandle(n));
    const { height: a, width: r } = this.canvas;
    var s = 20;
    for (let o = 0; o < r; o = o + s)
      for (let d = 0; d < a; d = d + s)
        e.beginPath(), e.strokeStyle = `rgb(${i})`, e.arc(o, d, 1, 0, 2 * Math.PI), e.stroke();
  }
  /**
   * 绘制水印
   * @param text 水印文本
   * @param color 水印颜色
   * @returns
   */
  waterMark(n, e) {
    if (!this.canvas)
      return;
    this.background.watermark = !0, this.background.watermarkColor = e, this.background.watermarkText = n;
    var i = this.canvas.getContext("2d");
    const a = n || Bi, { height: r, width: s } = this.canvas;
    i.font = "10px sans-serif";
    const o = i.measureText(a).width;
    var d = "211, 211, 211";
    e && (d = this.colorHandle(e));
    var l = 80 * o / 20;
    for (let c = -100; c < s; c = c + l)
      for (let u = 0; u < r; u = u + l)
        i.font = "48px serif", i.fillStyle = `rgba(${d}, 0.3)`, i.translate(c, u), i.rotate(-(Math.PI / 180) * 45), i.fillText(a, c, u), i.rotate(Math.PI / 180 * 45), i.translate(-c, -u);
  }
  /**
   * 颜色转换-在处理水印 网格的颜色中，支持 rgb hsl hex 等颜色类型，均需要转换为 rgb 的形式
   * @param color
   * @returns
   */
  colorHandle(n) {
    var e = "";
    return n.includes("#") ? e = nn.hex.rgb(n.replace("#", "")).toString().replace(/\[|\]/g, "") : n.includes("hsl") || (n.includes("rgb") ? e = n.replace(/rgb|\(|\)/g, "") : e = nn.keyword.rgb(n).toString().replace(/"\["|"\]"/g, "")), e;
  }
  /**
   * 绘制 辅助线
   * @param payload
   * @returns
   */
  drawAuxiliaryLine(n) {
    if (!this.canvas)
      return;
    this.unDrawAuxiliaryLine();
    var e = this.canvas.getContext("2d");
    const { width: i, height: a } = this.canvas, r = e.getImageData(0, 0, i, a);
    this.imageData = Gn.deflate(new Uint8Array(r.data)), n.forEach(({ num: s, type: o }) => {
      const d = s + 10;
      e.beginPath(), e.setLineDash([10, 10]), o === "h" ? e.moveTo(0, d) : e.moveTo(d, 0), o === "h" ? e.lineTo(i, d) : e.lineTo(d, a), e.strokeStyle = "rgb(79, 130, 232)", e.stroke();
    });
  }
  // 取消绘制
  unDrawAuxiliaryLine() {
    try {
      if (!this.canvas || !this.imageData)
        return;
      var n = this.canvas.getContext("2d");
      const { width: e, height: i } = this.canvas, a = Gn.inflate(this.imageData), r = new Uint8ClampedArray(a), s = new ImageData(r, e, i);
      n.putImageData(s, 0, 0), this.imageData = null;
    } catch {
      this.imageData = null;
    }
  }
  /**
   * 清空整个画布  ctx.clearRect(0, 0, width, height);
   */
  clearCanvas() {
    var n = this.canvas.getContext("2d");
    const { height: e, width: i } = this.canvas;
    n.clearRect(0, 0, i, e);
  }
  /**
   * 重置数据
   */
  resetCanvas() {
    this.clearCanvas();
    const n = this.draw.getEditorBox(), { clientWidth: e, clientHeight: i } = n;
    this.setCanvasInfo(e, i), this.background.gridline && this.gridLine(this.background.gridlineColor), this.background.watermark && this.waterMark(
      this.background.watermarkText,
      this.background.watermarkColor
    ), this.background.origin && this.origin(this.background.originColor);
  }
  /**
   * 销毁 canvas
   */
  removeCanvas() {
    this.canvas.remove();
  }
}
const qn = new Worker(
  new URL("/assets/AuxiliaryLine.worker-fcdb130f.js", self.location),
  {
    type: "module"
  }
);
class ao {
  constructor(n) {
    f(this, "draw");
    f(this, "move");
    f(this, "sx");
    f(this, "sy");
    f(this, "nodes");
    this.draw = n;
  }
  /**
   * graphBox 添加事件
   * @param ele
   */
  addEvent(n, e) {
    n.addEventListener("click", (i) => this.graphClickHandle(i, e)), n.addEventListener("mousedown", this.mouseDownHandle.bind(this)), n.addEventListener("mousemove", (i) => this.mouseMoveHandle(i, e)), n.addEventListener("mouseup", this.mouseUpHandle.bind(this)), n.addEventListener("mouseout", this.mouseUpHandle.bind(this)), n.addEventListener("dblclick", (i) => this.graphDblclickHandle(i, e)), n.addEventListener("contextmenu", (i) => this.contextmenu(i, e));
  }
  /**
   * removeEvent 移除事件
   */
  removeEvent(n) {
  }
  /**
   * 元件单击事件
   * @param e
   */
  graphClickHandle(n, e) {
    const { ctrlKey: i } = n, a = e.getID(), r = this.getSelected();
    if (r && r.getAttribute("graphid") === a)
      return;
    i || this.draw.getGraphDraw().cancelAllFormatPoint(), this.draw.getGraphDraw().getGraphMain(a).classList.add("selected"), this.draw.getEditorEvent().cancelContextmenu(), n.stopPropagation(), n.preventDefault();
  }
  /**
   * 元件双击事件
   * @param e
   */
  graphDblclickHandle(n, e) {
    var h;
    const i = e.getID(), a = 'div[class="sf-editor-box-graphs-main-contenteditable"]', s = this.draw.getGraphDraw().getGraphMain(i);
    this.createContentEditable(e);
    const o = s.querySelector(a), d = (h = o.parentNode) == null ? void 0 : h.querySelector("svg"), l = d.querySelector("text"), c = o.children[0];
    l && (c.innerHTML = l.innerHTML, l.remove()), c.focus();
    var u = document.createRange();
    u.selectNodeContents(c), u.collapse(!1);
    var g = window.getSelection();
    g.removeAllRanges(), g.addRange(u), c.addEventListener("blur", () => {
      o.remove();
      const p = c.innerHTML, k = this.draw.createSVGElement("text");
      k.style.pointerEvents = "none", k.style.userSelect = "none", k.setAttribute("x", "50%"), k.setAttribute("y", "50%"), k.setAttribute("text-anchor", "middle"), k.innerHTML = p, d.appendChild(k);
    }), n.stopPropagation(), n.preventDefault();
  }
  /**
   * 双击进行文本输入 - 实现原理： div.contenteditable
   * @param graph
   */
  createContentEditable(n) {
    const e = n.getID(), i = this.draw.getGraphDraw().getGraphMain(e), a = this.draw.createHTMLElement("div");
    a.classList.add("sf-editor-box-graphs-main-contenteditable");
    const r = this.draw.createHTMLElement("div");
    r.setAttribute("contenteditable", "true"), a.appendChild(r), i.appendChild(a);
  }
  /**
   * graph mousedown 移动事件-偏移量会受旋转角度的影响【需要重新修订】
   * @param e
   * @param graph
   */
  mouseDownHandle(n) {
    if (n.button === 2)
      return;
    const { offsetX: e, offsetY: i } = n;
    this.move = !0, this.sx = e, this.sy = i, this.nodes = this.draw.getGraphDraw().getNodeInfo();
  }
  /**
   * mouse move 移动中
   * @param e
   * @param graph
   * @returns
   */
  mouseMoveHandle(n, e) {
    if (!this.move)
      return;
    const { offsetX: i, offsetY: a } = n, r = i - this.sx, s = a - this.sy;
    e.position.call(e, e.getX() + r, e.getY() + s), this.workerEvent(e);
  }
  /**
   * mouseup 鼠标抬起
   * @param e
   */
  mouseUpHandle(n) {
    this.move = !1, this.sx = 0, this.sy = 0, this.draw.getCanvasDraw().unDrawAuxiliaryLine();
  }
  /**
   * 处理 worker
   */
  workerEvent(n) {
    const e = n.getID(), i = n.getWidth(), a = n.getHeight(), r = n.getX(), s = n.getY(), o = { nodeID: e, width: i, height: a, x: r, y: s };
    qn.postMessage({ current: o, nodes: this.nodes }), qn.onmessage = ({ data: d }) => {
      if (!d.length)
        return this.draw.getCanvasDraw().unDrawAuxiliaryLine();
      this.draw.getCanvasDraw().drawAuxiliaryLine(d);
    };
  }
  /**
   * 元件右键菜单
   */
  contextmenu(n, e) {
    this.draw.getEditorEvent().contextmenu(n, e), n.stopPropagation(), n.preventDefault();
  }
  /**
   * 获取所有的 main 用于处理顶层、底层比较
   * @returns
   */
  getAllGraphMain() {
    const n = "[class='sf-editor-box-graphs-main']";
    return this.draw.getEditorBox().querySelectorAll(n);
  }
  /**
   * 获取所有选中的元件
   * @returns
   */
  getAllSelected() {
    const n = "[class='sf-editor-box-graphs-main selected']";
    return this.draw.getEditorBox().querySelectorAll(n);
  }
  /**
   * 获取单个
   * @returns
   */
  getSelected() {
    const n = "[class='sf-editor-box-graphs-main selected']";
    return this.draw.getEditorBox().querySelector(n);
  }
}
const ro = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let so = (t = 21) => {
  let n = "", e = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; )
    n += ro[e[t] & 63];
  return n;
};
class tn {
  constructor(n) {
    f(this, "draw");
    f(this, "nodeID");
    f(this, "getID");
    this.draw = n, this.nodeID = so(), this.getID = () => this.nodeID;
  }
  /**
   * 获取X坐标
   * @returns
   */
  getX() {
    const n = this, e = this.draw.getGraphDraw().getGraphMain(n.getID());
    return Number(e.style.left.replace("px", ""));
  }
  /**
   * 获取Y坐标
   * @returns
   */
  getY() {
    const n = this, e = this.draw.getGraphDraw().getGraphMain(n.getID());
    return Number(e.style.top.replace("px", ""));
  }
  /**
   * 获取宽度
   * @returns
   */
  getWidth() {
    const n = this, e = this.draw.getGraphDraw().getGraphBox(n.getID());
    return Number(e.style.width.replace("px", ""));
  }
  /**
   * 获取高度
   * @returns
   */
  getHeight() {
    const n = this, e = this.draw.getGraphDraw().getGraphBox(n.getID());
    return Number(e.style.height.replace("px", ""));
  }
  /**
   * 获取 stroke 边框
   * @returns
   */
  getStroke() {
    return this.getElement().getAttribute("stroke");
  }
  /**
   * 获取 fill 填充
   * @returns
   */
  getFill() {
    return this.getElement().getAttribute("fill");
  }
  /** setter */
  /** setter */
  /** setter */
  /** setter */
  /**
   * 设置X
   * @param x
   */
  setX(n) {
    const e = this, i = this.draw.getGraphDraw().getGraphMain(e.getID());
    i.style.left = n + "px";
  }
  /**
   * 设置Y
   * @param y
   */
  setY(n) {
    const e = this, i = this.draw.getGraphDraw().getGraphMain(e.getID());
    i.style.top = n + "px";
  }
  /**
   * 设置宽度
   * @param w
   */
  setWidth(n) {
    const e = this, i = this.draw.getGraphDraw().getGraphBox(e.getID());
    return i.style.width = n + "px", e;
  }
  /**
   * 设置高度
   * @param h
   */
  setHeight(n) {
    const e = this, i = this.draw.getGraphDraw().getGraphBox(e.getID());
    return i.style.height = n + "px", e;
  }
  /**
   * 设置边框 stroke
   * @param stroke
   */
  setStroke(n) {
    const e = this;
    return e.getElement().setAttribute("stroke", n), e;
  }
  /**
   * 设置填充 fill
   * @param fill
   */
  setFill(n) {
    const e = this;
    return e.getElement().setAttribute("fill", n), e;
  }
  /**
   * 设置位置
   * @param x
   * @param y
   * @returns
   */
  position(n, e) {
    const i = this;
    return i.setX(n), i.setY(e), i;
  }
  /**
   * setRotate 设置旋转
   */
  setRotate(n) {
    const e = this, i = this.draw.getGraphDraw().getGraphMain(e.getID());
    return i.style.transform = `rotate(${n}deg)`, e;
  }
  addToEditor(n) {
    this.setFill("var(--fill)"), this.setStroke("var(--stroke)"), this.draw.getGraphDraw().addGraph(n);
  }
}
class zi extends tn {
  constructor(e, i) {
    super(e);
    f(this, "element");
    this.getID = () => i, this.element = e.getEditorBox().querySelector(`[graphid="${i}"][type="graph"]`);
  }
  getElement() {
    return this.element;
  }
}
const oo = 10, He = 50, Ie = 50, Me = 500, Be = 500;
class lo {
  constructor(n) {
    f(this, "draw");
    f(this, "move", !1);
    this.draw = n;
  }
  /**
   * new 元件的时候，均需要执行 addGraph 方法，创建分组后，才能添加到 editorBox 上
   *  每一个元件，都是由 div.mainBox => div.graphBox => svg => graph 构成，外层div 用于处理形变、链接锚点、层级问题
   *  每一个内部的元件 都设置为 100%
   *  圆形、椭圆 则 cx 50% cy 50% r 50%
   * @param graph
   */
  addGraph(n) {
    const e = n.getID(), i = n.getElement(), a = this.draw.createHTMLElement("div");
    a.classList.add("sf-editor-box-graphs-main"), a.style.padding = oo + "px", a.style.zIndex = "20", a.setAttribute("graphid", e), a.setAttribute("type", "mainBox");
    const r = this.draw.createHTMLElement("div");
    r.classList.add("sf-editor-box-graphs-main-item"), r.setAttribute("type", "graphBox");
    const s = this.draw.createSVGElement("svg");
    s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), i.setAttribute("graphid", e), i.setAttribute("type", "graph");
    const o = this.draw.getEditorBox(), d = '[class="sf-editor-box-graphs"]', l = o.querySelector(d);
    s.appendChild(i), r.appendChild(s), a.appendChild(r), l.appendChild(a), this.draw.getGraphEvent().addEvent(r, n), this.createLinkPoint(n), this.createFormatPoint(n), nt(() => {
      console.log("## 添加元件");
      const u = this.draw.getEventBus(), g = this.draw.getListener(), h = this.getNodesNumber(), p = this.draw.getRoot().querySelector('[class="sf-editor-footer"]');
      if (p) {
        const S = p.querySelector(
          '[command="nums"]'
        );
        S.innerHTML = h.toString();
      }
      u.isSubscribe("graphNumberChanged") && u.emit("graphNumberChanged", h), g.graphNumberChanged && g.graphNumberChanged(h);
    });
  }
  /**
   * 创建链接锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  createLinkPoint(n) {
    const e = n.getID(), i = this.getGraphMain(e), a = this.draw.createHTMLElement("div");
    a.classList.add("sf-editor-box-graphs-main-links"), i.appendChild(a), nt(() => {
      const s = "#fff", o = "#067bef", d = [], l = n.getWidth(), c = n.getHeight();
      d.push({ x: 0, y: c / 2 }), d.push({ x: l / 2, y: 0 }), d.push({ x: l, y: c / 2 }), d.push({ x: l / 2, y: c }), d.forEach(({ x: u, y: g }) => {
        const h = this.draw.createHTMLElement("div");
        h.style.width = "10px", h.style.height = "10px", h.style.position = "absolute", h.style.left = u + 10 / 2 + "px", h.style.top = g + 10 / 2 + "px", h.style.backgroundColor = s, h.style.borderColor = o, h.style.borderRadius = "10px", a.appendChild(h), h.addEventListener("mousedown", () => {
          console.log("链接锚点 mousedown");
        });
      });
    });
  }
  /**
   * 取消当前节点的连接锚点位置
   * @param graph
   */
  cancelLinkPoint(n) {
    var a;
    const e = n.getID();
    (a = this.getGraphMain(e).querySelector('[class="sf-editor-box-graphs-main-links"]')) == null || a.remove();
  }
  /**
   * 创建形变锚点 - 向 graphMain 添加锚点
   * @param graph
   */
  createFormatPoint(n) {
    const e = n.getID(), i = this.getGraphMain(e), a = this.draw.createHTMLElement("div");
    a.classList.add("sf-editor-box-graphs-main-formats"), i.appendChild(a), nt(() => {
      const s = "#fff", o = "#067bef", d = [], l = n.getWidth(), c = n.getHeight();
      d.push({ cursor: "nw-resize", x: 0, y: 0 }), d.push({ cursor: "n-resize", x: l / 2, y: 0 }), d.push({ cursor: "ne-resize", x: l, y: 0 }), d.push({ cursor: "e-resize", x: l, y: c / 2 }), d.push({ cursor: "se-resize", x: l, y: c }), d.push({ cursor: "s-resize", x: l / 2, y: c }), d.push({ cursor: "sw-resize", x: 0, y: c }), d.push({ cursor: "w-resize", x: 0, y: c / 2 }), d.forEach(({ cursor: g, x: h, y: p }) => {
        const k = this.draw.createHTMLElement("div");
        k.style.width = "10px", k.style.height = "10px", k.style.position = "absolute", k.style.left = h + 10 / 2 + "px", k.style.top = p + 10 / 2 + "px", k.style.backgroundColor = s, k.style.borderColor = o, k.style.cursor = g, a.appendChild(k), k.addEventListener("mousedown", (S) => {
          this.handleFormatMousedown(S, k, n), S.stopPropagation(), S.preventDefault();
        });
      });
      const u = this.draw.createHTMLElement("div");
      u.classList.add("rotate"), u.addEventListener(
        "mousedown",
        (g) => this.rotateHandle(g, u, n)
      ), a.appendChild(u);
    });
  }
  /**
   * 取消形变锚点
   */
  cancelFormatPoint(n) {
    var a;
    const e = n.getID();
    (a = this.getGraphMain(e).querySelector('[class="sf-editor-box-graphs-main-formats"]')) == null || a.remove();
  }
  /**
   * 取消所有的形变锚点-取消选中
   */
  cancelAllFormatPoint() {
    this.draw.getEditorBox().querySelectorAll("div[class='sf-editor-box-graphs-main selected']").forEach((n) => n.classList.remove("selected"));
  }
  /**
   * 形变节点具体的实现函数
   * @param e
   * @param div
   * @param graph
   */
  handleFormatMousedown(n, e, i) {
    this.move = !0;
    const a = i.getX(), r = i.getY();
    var s = i.getWidth(), o = i.getHeight();
    const { offsetLeft: d, offsetTop: l, offsetWidth: c, offsetHeight: u } = n.target, g = a + d - c / 2, h = r + l - u / 2;
    e.style.pointerEvents = "none";
    const p = e.parentNode;
    p.style.pointerEvents = "none";
    const k = p.parentNode;
    k.style.pointerEvents = "none", this.cancelLinkPoint(i), this.cancelFormatPoint(i);
    const S = () => {
      if (!this.move)
        return this.draw.getEditorBox().removeEventListener("mousemove", L), n.stopPropagation(), n.preventDefault(), !1;
      this.move = !1, e.style.pointerEvents = "", p.style.pointerEvents = "", k.style.pointerEvents = "", this.createLinkPoint(i), this.createFormatPoint(i), nt(() => {
        console.log("## Graph Resized.");
        const A = {
          nodeID: i.getID(),
          width: i.getWidth(),
          height: i.getHeight(),
          x: i.getX(),
          y: i.getY()
        }, _ = this.draw.getEventBus(), C = this.draw.getListener();
        _.isSubscribe("resized") && _.emit("resized", A), C.resized && C.resized(A);
      }), this.draw.getEditorBox().removeEventListener("mousemove", L), this.draw.getEditorBox().removeEventListener("mouseup", S), n.stopPropagation(), n.preventDefault();
    };
    this.draw.getEditorBox().addEventListener("mousemove", L), this.draw.getEditorBox().addEventListener("mouseup", S);
    function L(A) {
      const { offsetX: _, offsetY: C } = A, R = _ - g, v = C - h;
      ({
        "nw-resize": () => {
          var H = _, x = C, w = R < 0 ? Math.abs(R) + s : s - R, X = v < 0 ? Math.abs(v) + o : o - v;
          z({ w, h: X, x: H, y: x });
        },
        "n-resize": () => {
          var H = C, x = s, w = v < 0 ? Math.abs(v) + o : o - v;
          z({ y: H, w: x, h: w });
        },
        "ne-resize": () => {
          var H = C, x = R < 0 ? s + R : R + s, w = o - v;
          z({ y: H, w: x, h: w });
        },
        "e-resize": () => {
          z({ w: R < 0 ? s + R : R + s, h: o });
        },
        "se-resize": () => {
          z({ w: R + s, h: v + o });
        },
        "s-resize": () => {
          z({ w: s, h: o + v });
        },
        "sw-resize": () => {
          z({ x: _, w: s - R, h: o + v });
        },
        "w-resize": () => {
          z({ x: _, w: s - R, h: o });
        }
      })[e.style.cursor]();
    }
    function z({ x: A, y: _, w: C, h: R }) {
      var v = C, B = R;
      C >= He && C <= Me && A && i.setX(A), R >= Ie && R <= Be && _ && i.setY(_), C < He && (v = He), C > Me && (v = Me), R < Ie && (B = Ie), R > Be && (B = Be), i.setWidth(v), i.setHeight(B);
    }
  }
  /**
   * 旋转的核心事件
   * @param e
   * @param div
   * @param graph
   */
  rotateHandle(n, e, i) {
    const a = i.getX(), r = i.getY();
    var s = i.getWidth(), o = i.getHeight();
    e.style.pointerEvents = "none";
    const d = e.parentNode;
    d.style.pointerEvents = "none";
    const l = d.parentNode;
    l.style.pointerEvents = "none";
    const c = () => (e.style.pointerEvents = "", d.style.pointerEvents = "", l.style.pointerEvents = "", this.draw.getEditorBox().removeEventListener("mousemove", u), this.draw.getEditorBox().removeEventListener("mouseup", c), n.stopPropagation(), n.preventDefault(), !1);
    this.draw.getEditorBox().addEventListener("mousemove", u), this.draw.getEditorBox().addEventListener("mouseup", c);
    function u(g) {
      const h = a + s / 2, p = r + o / 2, k = g.offsetX, S = g.offsetY, L = k - h, z = S - p;
      let A = Math.atan2(z, L) * 180 / Math.PI;
      i.setRotate(A - 136 + 180);
    }
  }
  /**
   * 获取节点的位置信息，用于实现框线、辅助线
   */
  getNodeInfo() {
    const n = [];
    return this.draw.getEditorBox().querySelectorAll(
      'div[class="sf-editor-box-graphs-main"],div[class="sf-editor-box-graphs-main selected"]'
    ).forEach((e) => {
      const i = e.getAttribute("graphid"), a = new zi(this.draw, i), r = a.getWidth(), s = a.getHeight(), o = a.getX(), d = a.getY();
      n.push({ nodeID: i, width: r, height: s, x: o, y: d });
    }), n;
  }
  /**
   * 获取页面的元件数量
   */
  getNodesNumber() {
    return this.draw.getEditorBox().querySelectorAll('[type="mainBox"]').length;
  }
  /**
   * 获取 graph Main 这个是位置相关
   * @param nodeID
   * @returns
   */
  getGraphMain(n) {
    const e = `div[graphid="${n}"][type="mainBox"]`;
    return this.draw.getEditorBox().querySelector(e);
  }
  /**
   * 获取 graph Box 这个是宽度、高度相关的
   * @param nodeID
   * @returns
   */
  getGraphBox(n) {
    return this.getGraphMain(n).querySelector('[type="graphBox"]');
  }
}
const co = `
<div class="sf-editor-box-contextmenu-main">
	<!-- svg右键 -->
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="copy">
		<span>
			<i class="iconfont icon-fuzhi"></i>
			复制
		</span>
		<span>Ctrl+C</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="paste">
		<span>
			<i class="iconfont icon-niantie"></i>
			粘贴
		</span>
		<span>Ctrl+V</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="cut">
		<span>
			<i class="iconfont icon-jianqie"></i>
			剪切
		</span>
		<span>Ctrl+X</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-line editor-item"></div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="undo">
		<span>
			<i class="iconfont icon-chexiao"></i>
			撤销
		</span>
		<span>Ctrl+Z</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="redo">
		<span>
			<i class="iconfont icon-zhongzuo"></i>
			重做
		</span>
		<span>Ctrl+Y</span>
	</div>

	<!-- 图形右键 -->
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="top">
		<span>
			<i class="iconfont icon-zhiyudingceng"></i>
			置于顶层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="bottom">
		<span>
			<i class="iconfont icon-zhiyudiceng"></i>
			置于底层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="holdup">
		<span>
			<i class="iconfont icon-shangyiyiceng"></i>
			上移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="putdown">
		<span>
			<i class="iconfont icon-xiayiyiceng"></i>
			下移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="group">
		<span>
			<i class="iconfont icon-zuhe"></i>
			组合
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="ungroup">
		<span>
			<i class="iconfont icon-quxiaozuhe"></i>
			取消组合
		</span>
		<span>Ctrl+A</span>
	</div>
</div>
`, ho = `
<div class="sf-editor-footer-left">
	<!-- 多页 -->
	<i class="iconfont icon-duoye_nor" title="列表" command="list"></i>
	<!-- 当前画布名称 -->
	<span>画布1</span>
	<!-- 分割线 -->
	<div class="line"></div>
	<!-- 加页 -->
	<i class="iconfont icon-jiahao" title="新建画布" command="newpages"></i>
</div>
<div class="sf-editor-footer-right">
	<span>图形: <span  command="nums"></span></span>

	<div class="line"></div>

	<!-- 加减视口大小 -->
	<i class="iconfont icon-jianhao" title="缩小" command="reduce"></i>
	<span class="pageScale" title="重置视口" command="resize">100%</span>
	<i class="iconfont icon-jiahao" title="放大" command="amplify"></i>

	<div class="line"></div>

	<!-- 模板 -->
	<i class="iconfont icon-moban" title="模板" command="template"></i>

	<!-- 全屏 -->
	<i class="iconfont icon-quanping" title="全屏" command="fullscreen"></i>

	<!-- 退出全屏 -->
	<i class="iconfont icon-suoxiao" style="display:none" title="退出全屏" command="exitfullscreen"></i>

	<!-- 帮助 -->
	<i class="iconfont icon-bangzhu" title="帮助" command="help"></i>
</div>
`, fo = `
<div class="sf-editor-operation-top">
	<div class="left">
		<img src="/public/favor.svg" alt="" />
		<span>文件</span>
		<span>编辑</span>
		<span>选择</span>
		<span>视图</span>
		<span>插入</span>
		<span>画布</span>
		<span>排列</span>
	</div>
	<div class="right">
		<div class="right-shear">分享协作</div>
		<i class="iconfont icon-xiazai"></i>
		<img src="/public/user.png" alt="" />
	</div>
</div>
<div class="sf-editor-operation-bottom">
	<!-- 撤销 -->
	<i class="iconfont icon-chexiao"></i>
	<!-- 重做 -->
	<i class="iconfont icon-zhongzuo"></i>
	<!-- 美化 -->
	<i class="iconfont icon-huabumeihua"></i>
	<div class="line"></div>
	<!-- 背景颜色 -->
	<i class="iconfont icon-ibg"></i>
	<!-- 插入图片 -->
	<i class="iconfont icon-tupian"></i>
	<div class="line"></div>
	<!-- 加粗 -->
	<i class="iconfont icon-jiacu"></i>
	<!-- 斜体 -->
	<i class="iconfont icon-xieti"></i>
	<!-- 下划线 -->
	<i class="iconfont icon-xiahuaxian"></i>
	<!-- 字体颜色 -->
	<i class="iconfont icon-zitiyanse"></i>
	<!-- 填充 -->
	<i class="iconfont icon-beijingyanse"></i>
	<div class="line"></div>
	<!-- 连线宽度 -->
	<i class="iconfont icon-xiantiaokuandu"></i>
	<!-- 连线样式 -->
	<i class="iconfont icon-xiantiaoyangshi"></i>
	<!-- 图层 -->
	<i class="iconfont icon-zhiyudingceng"></i>
</div>
`, uo = `
<!-- 基础图形 -->
<h3 class="sf-editor-catalog-title" command="base">
	<div class="icon close"></div>
	基础图形
</h3>
<div class="sf-editor-catalog-item" adapt="base">base</div>
<div class="line"></div>

<!-- Flowchart 流程图 -->
<h3 class="sf-editor-catalog-title" command="Flowchart">
	<div class="icon close"></div>
	Flowchart 流程图
</h3>
<div class="sf-editor-catalog-item" adapt="Flowchart">Flowchart</div>
<div class="line"></div>

<!-- 泳池/泳道 -->
<h3 class="sf-editor-catalog-title" command="pool">
	<div class="icon close"></div>
	泳池/泳道
</h3>
<div class="sf-editor-catalog-item" adapt="pool">pool</div>
<div class="line"></div>

<!-- 统计图 -->
<h3 class="sf-editor-catalog-title" command="chart">
	<div class="icon close"></div>
	统计图
</h3>
<div class="sf-editor-catalog-item" adapt="chart">chart</div>
<div class="line"></div>

<!-- 提示 -->
<div class="more">更多图形</div>
`;
var Ri = { exports: {} };
(function(t, n) {
  (function(e, i) {
    t.exports = i();
  })(ji, function() {
    var e = 1e3, i = 6e4, a = 36e5, r = "millisecond", s = "second", o = "minute", d = "hour", l = "day", c = "week", u = "month", g = "quarter", h = "year", p = "date", k = "Invalid Date", S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, L = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, z = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(T) {
      var b = ["th", "st", "nd", "rd"], m = T % 100;
      return "[" + T + (b[(m - 20) % 10] || b[m] || b[0]) + "]";
    } }, A = function(T, b, m) {
      var D = String(T);
      return !D || D.length >= b ? T : "" + Array(b + 1 - D.length).join(m) + T;
    }, _ = { s: A, z: function(T) {
      var b = -T.utcOffset(), m = Math.abs(b), D = Math.floor(m / 60), E = m % 60;
      return (b <= 0 ? "+" : "-") + A(D, 2, "0") + ":" + A(E, 2, "0");
    }, m: function T(b, m) {
      if (b.date() < m.date())
        return -T(m, b);
      var D = 12 * (m.year() - b.year()) + (m.month() - b.month()), E = b.clone().add(D, u), I = m - E < 0, M = b.clone().add(D + (I ? -1 : 1), u);
      return +(-(D + (m - E) / (I ? E - M : M - E)) || 0);
    }, a: function(T) {
      return T < 0 ? Math.ceil(T) || 0 : Math.floor(T);
    }, p: function(T) {
      return { M: u, y: h, w: c, d: l, D: p, h: d, m: o, s, ms: r, Q: g }[T] || String(T || "").toLowerCase().replace(/s$/, "");
    }, u: function(T) {
      return T === void 0;
    } }, C = "en", R = {};
    R[C] = z;
    var v = "$isDayjsObject", B = function(T) {
      return T instanceof X || !(!T || !T[v]);
    }, H = function T(b, m, D) {
      var E;
      if (!b)
        return C;
      if (typeof b == "string") {
        var I = b.toLowerCase();
        R[I] && (E = I), m && (R[I] = m, E = I);
        var M = b.split("-");
        if (!E && M.length > 1)
          return T(M[0]);
      } else {
        var O = b.name;
        R[O] = b, E = O;
      }
      return !D && E && (C = E), E || !D && C;
    }, x = function(T, b) {
      if (B(T))
        return T.clone();
      var m = typeof b == "object" ? b : {};
      return m.date = T, m.args = arguments, new X(m);
    }, w = _;
    w.l = H, w.i = B, w.w = function(T, b) {
      return x(T, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
    };
    var X = function() {
      function T(m) {
        this.$L = H(m.locale, null, !0), this.parse(m), this.$x = this.$x || m.x || {}, this[v] = !0;
      }
      var b = T.prototype;
      return b.parse = function(m) {
        this.$d = function(D) {
          var E = D.date, I = D.utc;
          if (E === null)
            return /* @__PURE__ */ new Date(NaN);
          if (w.u(E))
            return /* @__PURE__ */ new Date();
          if (E instanceof Date)
            return new Date(E);
          if (typeof E == "string" && !/Z$/i.test(E)) {
            var M = E.match(S);
            if (M) {
              var O = M[2] - 1 || 0, F = (M[7] || "0").substring(0, 3);
              return I ? new Date(Date.UTC(M[1], O, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, F)) : new Date(M[1], O, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, F);
            }
          }
          return new Date(E);
        }(m), this.init();
      }, b.init = function() {
        var m = this.$d;
        this.$y = m.getFullYear(), this.$M = m.getMonth(), this.$D = m.getDate(), this.$W = m.getDay(), this.$H = m.getHours(), this.$m = m.getMinutes(), this.$s = m.getSeconds(), this.$ms = m.getMilliseconds();
      }, b.$utils = function() {
        return w;
      }, b.isValid = function() {
        return this.$d.toString() !== k;
      }, b.isSame = function(m, D) {
        var E = x(m);
        return this.startOf(D) <= E && E <= this.endOf(D);
      }, b.isAfter = function(m, D) {
        return x(m) < this.startOf(D);
      }, b.isBefore = function(m, D) {
        return this.endOf(D) < x(m);
      }, b.$g = function(m, D, E) {
        return w.u(m) ? this[D] : this.set(E, m);
      }, b.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, b.valueOf = function() {
        return this.$d.getTime();
      }, b.startOf = function(m, D) {
        var E = this, I = !!w.u(D) || D, M = w.p(m), O = function(mt, W) {
          var dt = w.w(E.$u ? Date.UTC(E.$y, W, mt) : new Date(E.$y, W, mt), E);
          return I ? dt : dt.endOf(l);
        }, F = function(mt, W) {
          return w.w(E.toDate()[mt].apply(E.toDate("s"), (I ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W)), E);
        }, U = this.$W, Y = this.$M, K = this.$D, Dt = "set" + (this.$u ? "UTC" : "");
        switch (M) {
          case h:
            return I ? O(1, 0) : O(31, 11);
          case u:
            return I ? O(1, Y) : O(0, Y + 1);
          case c:
            var pt = this.$locale().weekStart || 0, $t = (U < pt ? U + 7 : U) - pt;
            return O(I ? K - $t : K + (6 - $t), Y);
          case l:
          case p:
            return F(Dt + "Hours", 0);
          case d:
            return F(Dt + "Minutes", 1);
          case o:
            return F(Dt + "Seconds", 2);
          case s:
            return F(Dt + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, b.endOf = function(m) {
        return this.startOf(m, !1);
      }, b.$set = function(m, D) {
        var E, I = w.p(m), M = "set" + (this.$u ? "UTC" : ""), O = (E = {}, E[l] = M + "Date", E[p] = M + "Date", E[u] = M + "Month", E[h] = M + "FullYear", E[d] = M + "Hours", E[o] = M + "Minutes", E[s] = M + "Seconds", E[r] = M + "Milliseconds", E)[I], F = I === l ? this.$D + (D - this.$W) : D;
        if (I === u || I === h) {
          var U = this.clone().set(p, 1);
          U.$d[O](F), U.init(), this.$d = U.set(p, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          O && this.$d[O](F);
        return this.init(), this;
      }, b.set = function(m, D) {
        return this.clone().$set(m, D);
      }, b.get = function(m) {
        return this[w.p(m)]();
      }, b.add = function(m, D) {
        var E, I = this;
        m = Number(m);
        var M = w.p(D), O = function(Y) {
          var K = x(I);
          return w.w(K.date(K.date() + Math.round(Y * m)), I);
        };
        if (M === u)
          return this.set(u, this.$M + m);
        if (M === h)
          return this.set(h, this.$y + m);
        if (M === l)
          return O(1);
        if (M === c)
          return O(7);
        var F = (E = {}, E[o] = i, E[d] = a, E[s] = e, E)[M] || 1, U = this.$d.getTime() + m * F;
        return w.w(U, this);
      }, b.subtract = function(m, D) {
        return this.add(-1 * m, D);
      }, b.format = function(m) {
        var D = this, E = this.$locale();
        if (!this.isValid())
          return E.invalidDate || k;
        var I = m || "YYYY-MM-DDTHH:mm:ssZ", M = w.z(this), O = this.$H, F = this.$m, U = this.$M, Y = E.weekdays, K = E.months, Dt = E.meridiem, pt = function(W, dt, Pt, re) {
          return W && (W[dt] || W(D, I)) || Pt[dt].slice(0, re);
        }, $t = function(W) {
          return w.s(O % 12 || 12, W, "0");
        }, mt = Dt || function(W, dt, Pt) {
          var re = W < 12 ? "AM" : "PM";
          return Pt ? re.toLowerCase() : re;
        };
        return I.replace(L, function(W, dt) {
          return dt || function(Pt) {
            switch (Pt) {
              case "YY":
                return String(D.$y).slice(-2);
              case "YYYY":
                return w.s(D.$y, 4, "0");
              case "M":
                return U + 1;
              case "MM":
                return w.s(U + 1, 2, "0");
              case "MMM":
                return pt(E.monthsShort, U, K, 3);
              case "MMMM":
                return pt(K, U);
              case "D":
                return D.$D;
              case "DD":
                return w.s(D.$D, 2, "0");
              case "d":
                return String(D.$W);
              case "dd":
                return pt(E.weekdaysMin, D.$W, Y, 2);
              case "ddd":
                return pt(E.weekdaysShort, D.$W, Y, 3);
              case "dddd":
                return Y[D.$W];
              case "H":
                return String(O);
              case "HH":
                return w.s(O, 2, "0");
              case "h":
                return $t(1);
              case "hh":
                return $t(2);
              case "a":
                return mt(O, F, !0);
              case "A":
                return mt(O, F, !1);
              case "m":
                return String(F);
              case "mm":
                return w.s(F, 2, "0");
              case "s":
                return String(D.$s);
              case "ss":
                return w.s(D.$s, 2, "0");
              case "SSS":
                return w.s(D.$ms, 3, "0");
              case "Z":
                return M;
            }
            return null;
          }(W) || M.replace(":", "");
        });
      }, b.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, b.diff = function(m, D, E) {
        var I, M = this, O = w.p(D), F = x(m), U = (F.utcOffset() - this.utcOffset()) * i, Y = this - F, K = function() {
          return w.m(M, F);
        };
        switch (O) {
          case h:
            I = K() / 12;
            break;
          case u:
            I = K();
            break;
          case g:
            I = K() / 3;
            break;
          case c:
            I = (Y - U) / 6048e5;
            break;
          case l:
            I = (Y - U) / 864e5;
            break;
          case d:
            I = Y / a;
            break;
          case o:
            I = Y / i;
            break;
          case s:
            I = Y / e;
            break;
          default:
            I = Y;
        }
        return E ? I : w.a(I);
      }, b.daysInMonth = function() {
        return this.endOf(u).$D;
      }, b.$locale = function() {
        return R[this.$L];
      }, b.locale = function(m, D) {
        if (!m)
          return this.$L;
        var E = this.clone(), I = H(m, D, !0);
        return I && (E.$L = I), E;
      }, b.clone = function() {
        return w.w(this.$d, this);
      }, b.toDate = function() {
        return new Date(this.valueOf());
      }, b.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, b.toISOString = function() {
        return this.$d.toISOString();
      }, b.toString = function() {
        return this.$d.toUTCString();
      }, T;
    }(), Bt = X.prototype;
    return x.prototype = Bt, [["$ms", r], ["$s", s], ["$m", o], ["$H", d], ["$W", l], ["$M", u], ["$y", h], ["$D", p]].forEach(function(T) {
      Bt[T[1]] = function(b) {
        return this.$g(b, T[0], T[1]);
      };
    }), x.extend = function(T, b) {
      return T.$i || (T(b, X, x), T.$i = !0), x;
    }, x.locale = H, x.isDayjs = B, x.unix = function(T) {
      return x(1e3 * T);
    }, x.en = R[C], x.Ls = R, x.p = {}, x;
  });
})(Ri);
var go = Ri.exports;
const Yn = /* @__PURE__ */ Xi(go);
var G = /* @__PURE__ */ ((t) => (t.Space = " ", t.Delete = "Delete", t.Backspace = "Backspace", t.Enter = "Enter", t.Left = "ArrowLeft", t.Right = "ArrowRight", t.Up = "ArrowUp", t.Down = "ArrowDown", t.ESC = "Escape", t.TAB = "Tab", t.META = "Meta", t.LEFT_BRACKET = "[", t.RIGHT_BRACKET = "]", t.COMMA = ",", t.PERIOD = ".", t.LEFT_ANGLE_BRACKET = "<", t.RIGHT_ANGLE_BRACKET = ">", t.EQUAL = "=", t.MINUS = "-", t.PLUS = "+", t.A = "a", t.B = "b", t.C = "c", t.D = "d", t.E = "e", t.F = "f", t.G = "g", t.H = "h", t.I = "i", t.J = "j", t.K = "k", t.L = "l", t.M = "m", t.N = "n", t.O = "o", t.P = "p", t.Q = "q", t.R = "r", t.S = "s", t.T = "t", t.U = "u", t.V = "v", t.W = "w", t.X = "x", t.Y = "y", t.Z = "z", t.A_UPPERCASE = "A", t.B_UPPERCASE = "B", t.C_UPPERCASE = "C", t.D_UPPERCASE = "D", t.E_UPPERCASE = "E", t.F_UPPERCASE = "F", t.G_UPPERCASE = "G", t.H_UPPERCASE = "H", t.I_UPPERCASE = "I", t.J_UPPERCASE = "J", t.K_UPPERCASE = "K", t.L_UPPERCASE = "L", t.M_UPPERCASE = "M", t.N_UPPERCASE = "N", t.O_UPPERCASE = "O", t.P_UPPERCASE = "P", t.Q_UPPERCASE = "Q", t.R_UPPERCASE = "R", t.S_UPPERCASE = "S", t.T_UPPERCASE = "T", t.U_UPPERCASE = "U", t.V_UPPERCASE = "V", t.W_UPPERCASE = "W", t.X_UPPERCASE = "X", t.Y_UPPERCASE = "Y", t.Z_UPPERCASE = "Z", t.ZERO = "0", t.ONE = "1", t.TWO = "2", t.THREE = "3", t.FOUR = "4", t.FIVE = "5", t.SIX = "6", t.SEVEN = "7", t.EIGHT = "8", t.NINE = "9", t))(G || {});
class _o {
  constructor(n) {
    f(this, "draw");
    f(this, "defaultEvent");
    this.draw = n, this.defaultEvent = [
      // 左上右下 键盘的可见顺序
      {
        key: G.Left,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Up,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Right,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Down,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Left,
        ctrl: !0,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Up,
        ctrl: !0,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Right,
        ctrl: !0,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Down,
        ctrl: !0,
        callback: this.graphMoveHandle.bind(this)
      },
      {
        key: G.Backspace,
        // backspace 删除键
        callback: this.deleteGraph.bind(this)
      },
      {
        key: G.Delete,
        // Delete 删除键
        callback: this.deleteGraph.bind(this)
      },
      {
        key: G.C,
        // Ctrl C
        ctrl: !0,
        callback: this.copy.bind(this)
      },
      {
        key: G.V,
        // Ctrl V
        ctrl: !0,
        callback: this.paste.bind(this)
      },
      {
        key: G.X,
        // Ctrl X
        ctrl: !0,
        callback: this.cut.bind(this)
      },
      {
        key: G.P,
        // Ctrl P
        ctrl: !0,
        callback: this.print.bind(this)
      },
      {
        key: G.Z,
        // Ctrl Z
        ctrl: !0
      },
      {
        key: G.Y,
        // Ctrl Y
        ctrl: !0
      }
    ];
  }
  /**
   * graph move 使用 上下左右实现元件的移动
   */
  graphMoveHandle(n) {
    const e = this.draw.getGraphEvent().getAllSelected();
    if (!e.length)
      return;
    const i = 10, a = 2, r = n != null && n.ctrl ? a : i;
    e.forEach((s) => {
      const o = s.getAttribute("graphid"), d = new zi(this.draw, o), l = d.getX(), c = d.getY();
      (n == null ? void 0 : n.key) == "ArrowLeft" && d.setX(l - r), (n == null ? void 0 : n.key) == "ArrowUp" && d.setY(c - r), (n == null ? void 0 : n.key) == "ArrowRight" && d.setX(l + r), (n == null ? void 0 : n.key) == "ArrowDown" && d.setY(c + r);
    });
  }
  /**
   * 实现删除元件
   */
  deleteGraph() {
    const n = this.draw.getGraphEvent().getAllSelected();
    n.length && (n.forEach((e) => e.remove()), nt(() => {
      const e = this.draw.getEventBus(), i = this.draw.getListener(), a = this.draw.getGraphDraw().getNodesNumber(), r = this.draw.getRoot().querySelector('[class="sf-editor-footer"]');
      if (r) {
        const o = r.querySelector(
          '[command="nums"]'
        );
        o.innerHTML = a.toString();
      }
      e.isSubscribe("graphNumberChanged") && e.emit("graphNumberChanged", a), i.graphNumberChanged && i.graphNumberChanged(a);
    }));
  }
  /**
   * 复制粘贴元件 - 实现思路
   *  1. 复制的时候，将元件信息放置到粘贴板上
   *  2. 粘贴的时候，从粘贴板获取数据，并进行创建
   */
  copy() {
    console.log("copy");
  }
  paste() {
    console.log("paste");
  }
  cut() {
    console.log("cut");
  }
  /**
   * 打印
   */
  print() {
  }
  /**
   * keydown handle 用于实现系统级快捷键 用户快捷键
   * @param e
   */
  keydownHandle(n) {
    nt(() => {
      const e = this.draw.getRegister().shortcutList, a = [...this.defaultEvent, ...e].filter(
        (r) => (r.mod ? qi(n) === !!r.mod : n.ctrlKey === !!r.ctrl && n.metaKey === !!r.meta) && n.shiftKey === !!r.shift && n.altKey === !!r.alt && n.key === r.key
      );
      a.length && a.forEach(
        (r) => {
          var s;
          return (s = r == null ? void 0 : r.callback) == null ? void 0 : s.call(r, {
            tips: "参数仅供默认事件处理函数使用,无实际含义!",
            e: n,
            ctrl: n.ctrlKey,
            shift: n.shiftKey,
            key: n.key
          });
        }
      );
    }), n.stopPropagation(), n.preventDefault();
  }
}
class po {
  /**
   * constructor EditorEvent 构造函数
   * @param draw
   */
  constructor(n) {
    f(this, "draw");
    f(this, "editorBox");
    f(this, "st");
    // 记录时间 Number(dayjs().format("mmssSSS")); 毫秒
    f(this, "mode");
    // 定义框选的相关参数
    f(this, "move");
    // 移动标志
    f(this, "sx");
    // 起点坐标x
    f(this, "sy");
    // 起点坐标y
    f(this, "ex");
    // 终点坐标x
    f(this, "ey");
    // 终点坐标x
    f(this, "registerEvent");
    f(this, "command");
    f(this, "_contextmenu");
    f(this, "_mousedownHandle");
    f(this, "_mousemoveHandle");
    f(this, "_mouseupHandle");
    f(this, "_keydownHandle");
    f(this, "_scaleHandle");
    this.draw = n, this.registerEvent = new _o(n), this.command = new te(n);
    const e = this.registerEvent;
    this._contextmenu = this.contextmenu.bind(this), this._mousedownHandle = this.mousedownHandle.bind(this), this._mousemoveHandle = this.mousemoveHandle.bind(this), this._mouseupHandle = this.mouseupHandle.bind(this), this._keydownHandle = e.keydownHandle.bind(e), this._scaleHandle = this.setScale.bind(this);
  }
  /**
   * editorBox 添加事件
   */
  addEvent() {
    this.editorBox = this.draw.getEditorBox(), this.editorBox.addEventListener("contextmenu", this._contextmenu), this.editorBox.addEventListener("mousedown", this._mousedownHandle), this.editorBox.addEventListener("mousemove", this._mousemoveHandle), this.editorBox.addEventListener("mouseup", this._mouseupHandle), document.addEventListener("keydown", this._keydownHandle), document.addEventListener("wheel", this._scaleHandle, {
      passive: !1
    });
  }
  /**
   * 移除事件监听
   */
  removeEvent() {
    const n = this.draw.getEditorBox();
    n.removeEventListener("contextmenu", this._contextmenu), n.removeEventListener("mousedown", this._mousedownHandle), n.removeEventListener("mousemove", this._mousemoveHandle), n.removeEventListener("mouseup", this._mouseupHandle), document.removeEventListener("keydown", this._keydownHandle), document.removeEventListener("wheel", this._scaleHandle);
  }
  /**
   * 框选事件 mouse down
   * @param e
   * @returns
   */
  mousedownHandle(n) {
    if (!!this.draw.getRoot().getAttribute("move") || n.target.className !== "sf-editor-box-graphs" || n.button === 2)
      return this.st = 0;
    this.st = Number(Yn().format("mmssSSS")), this.move = !0, this.cancelContextmenu(), this.draw.getGraphDraw().cancelAllFormatPoint();
    const { offsetX: i, offsetY: a } = n;
    this.sx = i, this.sy = a;
    const r = 'div[class="sf-editor-box-selectmask"]', s = this.editorBox.querySelector(r);
    s.style.left = i + "px", s.style.top = a + "px", s.style.display = "block", this.editorBox.querySelectorAll("div[class='sf-editor-box-graphs-main']").forEach((o) => o.style.pointerEvents = "none");
  }
  /**
   * 框选事件 mousemove
   * @param e
   * @returns
   */
  mousemoveHandle(n) {
    if (!this.move)
      return;
    const { offsetX: e, offsetY: i } = n, a = 'div[class="sf-editor-box-selectmask"]', r = this.editorBox.querySelector(a);
    e - this.sx < 0 && (r.style.left = `${e}px`), i - this.sy < 0 && (r.style.top = `${i}px`), r.style.height = `${Math.abs(i - this.sy)}px`, r.style.width = `${Math.abs(e - this.sx)}px`;
  }
  /**
   * 框选事件 mouseup
   * @param e
   * @returns
   */
  async mouseupHandle(n) {
    if (!this.move)
      return;
    this.move = !1;
    const e = 'div[class="sf-editor-box-selectmask"]', i = this.editorBox.querySelector(e);
    if (i.style.left = "0", i.style.top = "0", i.style.width = "0", i.style.height = "0", i.style.display = "none", this.editorBox.querySelectorAll("div[class='sf-editor-box-graphs-main']").forEach((o) => o.style.pointerEvents = ""), Number(Yn().format("mmssSSS")) - this.st <= 120)
      return this.clickHandle(n);
    const { offsetX: r, offsetY: s } = n;
    this.ex = r, this.ey = s, await this.computedSelected(), this.st = 0, this.sx = 0, this.sy = 0, this.ex = 0, this.ey = 0;
  }
  /**
   * 根据框选开始结束，计算那些元素在选区内被选中
   * @returns string[] 返回 nodeID 构成的数组
   */
  computedSelected() {
    return new Promise((n) => {
      let e = [Math.min(this.sx, this.ex), Math.max(this.sx, this.ex)], i = [Math.min(this.sy, this.ey), Math.max(this.sy, this.ey)], a = [];
      const r = this.draw.getGraphDraw().getNodeInfo();
      if (!r)
        return [];
      r.forEach(({ nodeID: s, width: o, height: d, x: l, y: c }) => {
        const u = { x: l, y: c }, g = { x: l + o, y: c }, h = { x: l, y: c + d }, p = { x: l + o, y: c + d }, k = this.computedIsSelected(u, e, i), S = this.computedIsSelected(g, e, i), L = this.computedIsSelected(h, e, i), z = this.computedIsSelected(p, e, i);
        function A() {
          (k || S || z || L) && a.push(s);
        }
        function _() {
          k && S && z && L && a.push(s);
        }
        this.mode === "inside" ? A() : _();
      }), a.length || n(), a.forEach(
        (s) => this.draw.getGraphDraw().getGraphMain(s).classList.add("selected")
      ), n();
    });
  }
  /**
   * 框选结束后，判断点是否在范围内
   * @param current
   * @param x
   * @param y
   * @returns
   */
  computedIsSelected(n, e, i) {
    let a = n.x >= e[0] && n.x <= e[1], r = n.y >= i[0] && n.y <= i[1];
    return a && r;
  }
  /**
   * 滚轮缩放事件-按照等比例进行缩放即可，不需要关心实际的比例是多少
   * @param evt
   */
  setScale(n) {
    if (!n.ctrlKey)
      return;
    const e = n.deltaY < 0 ? "Add" : "Minus";
    this.scalePage(e), n.preventDefault();
  }
  /**
   * 实现缩放的关键方法 单独出来是为了供 command 实现调用
   * @param scale
   */
  scalePage(n, e) {
    var i = 0;
    const a = 0.2, r = this.draw.getEditorBox(), s = r.style.transform.split(" "), o = Number(s[0].replace(/\(|\)|scale/g, ""));
    n === "Add" && (i = o + a), n === "Minus" && (i = o - a), n === "Recovery" && (i = 1), n === "Appoint" && (i = e), i < 0.4 && (i = 0.4), i > 2 && (i = 2), r.style.transform = `scale(${i}) ${s[1]}${s[2]}`;
    const d = this.draw.getRoot().querySelector('[class="sf-editor-footer"]');
    if (d) {
      const l = d.querySelector(
        '[command="resize"]'
      );
      l.innerHTML = Math.floor(i * 100).toString() + "%";
    }
    nt(() => {
      const l = this.draw.getEventBus(), c = this.draw.getListener();
      l.isSubscribe("pageScale") && l.emit("pageScale", e), c.pageScale && c.pageScale(e);
    });
  }
  /**
   * editorBox 单击事件
   * @param e
   */
  clickHandle(n) {
    this.cancelContextmenu(), this.draw.getGraphDraw().cancelAllFormatPoint(), n.stopPropagation(), n.preventDefault();
  }
  /**
   * 右键菜单 contextmenu
   * @param e
   */
  contextmenu(n, e) {
    const i = 'div[class="sf-editor-box-contextmenu"]', a = this.editorBox.querySelector(i);
    e && (this.draw.getGraphDraw().cancelAllFormatPoint(), this.draw.getGraphDraw().getGraphMain(e.getID()).classList.add("selected")), a ? this.updateContentmenu(n, e) : this.createContextmenu(n, e), n.stopPropagation(), n.preventDefault();
  }
  /**
   * 更新右键菜单的位置
   */
  updateContentmenu(n, e) {
    const i = 'div[class="sf-editor-box-contextmenu"]', a = this.editorBox.querySelector(i), r = a.querySelector("div");
    r.classList.remove("graph"), r.classList.remove("editor"), r.classList.add(e ? "graph" : "editor"), this.correctContextMenuPosition(a, n);
  }
  /**
   * 创建右键菜单
   */
  createContextmenu(n, e) {
    var r;
    const i = this.draw.createHTMLElement("div");
    i.classList.add("sf-editor-box-contextmenu"), i.innerHTML = co, this.editorBox.append(i);
    const a = i.querySelector("div");
    a.classList.remove("graph"), a.classList.remove("editor"), a.classList.add(e ? "graph" : "editor"), this.correctContextMenuPosition(i, n), (r = this.editorBox.querySelector('div[class="sf-editor-box-contextmenu"]')) == null || r.querySelectorAll("[command]").forEach(
      (s) => s.addEventListener(
        "click",
        (o) => this.contextmenuClickHandle(o, s.getAttribute("command"))
      )
    ), nt(() => {
      const { contextMenuList: s } = this.draw.getRegister();
      if (!s.length)
        return;
      const o = this.draw.createHTMLElement("div");
      o.classList.add("sf-editor-box-contextmenu-main-line"), i.children[0].appendChild(o), s.forEach(
        ({ title: d, callback: l, command: c, isGraph: u, shortCut: g }) => {
          const h = this.draw.createHTMLElement("div");
          h.classList.add("sf-editor-box-contextmenu-main-item"), h.classList.add(u ? "graph-item" : "editor-item"), h.setAttribute("command", c);
          const p = this.draw.createHTMLElement("span");
          p.innerHTML = d, p.style.paddingLeft = "20px";
          const k = this.draw.createHTMLElement("span");
          k.innerHTML = g || "", h.appendChild(p), h.appendChild(k), i.children[0].appendChild(h), h.addEventListener("click", (S) => {
            l && l(S), this.clickHandle(S);
          });
        }
      );
    }), i.addEventListener(
      "contextmenu",
      (s) => (s.preventDefault(), s.stopPropagation())
    );
  }
  /**
   * 绑定右键菜单项的点击事件
   */
  contextmenuClickHandle(n, e) {
    const i = {
      paste: this.command.executePaste,
      top: this.command.executeTop,
      bottom: this.command.executeBottom,
      holdup: this.command.executeHoldUp,
      putdown: this.command.executePutDown
    };
    e && i[e] && i[e](), console.log(e), this.clickHandle(n);
  }
  /**
   * 右键菜单唤起事件需要矫正位置
   * @param div
   * @param e
   */
  correctContextMenuPosition(n, e) {
    const { clientHeight: i, clientWidth: a } = this.editorBox, r = n.clientWidth, s = n.clientHeight, { offsetX: o, offsetY: d } = e;
    var l = o, c = d;
    e.target;
    const u = e.target.getAttribute("graphid"), g = this.draw.getGraphDraw().getGraphMain(u);
    if (g) {
      var h = g.style.left.replace("px", ""), p = g.style.top.replace("px", "");
      l = Number(h + o), c = Number(p + d);
    }
    l + r > a && (l -= r), c + s > i && (c -= s), n.style.left = l + "px", n.style.top = c + "px";
  }
  // 取消右键菜单
  cancelContextmenu() {
    const n = 'div[class="sf-editor-box-contextmenu"]', e = this.editorBox.querySelector(n);
    e && e.remove();
  }
}
class mo {
  constructor(n) {
    f(this, "draw");
    f(this, "command");
    this.draw = n, this.command = new te(n), this.initEvent();
  }
  /**
   * 给 footer 添加事件
   */
  initEvent() {
    nt(() => {
      const n = this.draw.getRoot().querySelector('[class="sf-editor-footer"]'), e = {
        reduce: this.command.executePageScaleMinus,
        resize: this.command.executePageScaleRecovery,
        amplify: this.command.executePageScaleAdd,
        fullscreen: () => this.changeFullScreenIcon(!0),
        exitfullscreen: () => this.changeFullScreenIcon(!1)
      };
      n.querySelectorAll("[command]").forEach((i) => {
        const a = i.getAttribute("command");
        i.addEventListener("click", (r) => {
          e[a] && e[a](), r.stopPropagation(), r.preventDefault();
        });
      });
    });
  }
  /**
   * 修改全屏的icon
   * @param full 是否进入全屏
   */
  changeFullScreenIcon(n) {
    const e = this.draw.getRoot().querySelector('[class="sf-editor-footer"]'), i = e.querySelector(
      '[command="fullscreen"]'
    ), a = e.querySelector(
      '[command="exitfullscreen"]'
    );
    n ? this.command.executeFullScreen() : this.command.executeExitFullScreen(), i.style.display = n ? "none" : "block", a.style.display = n ? "block" : "none";
  }
}
class wo {
  constructor(n) {
    f(this, "draw");
    f(this, "command");
    this.draw = n, this.command = new te(n), this.initEvent();
  }
  initEvent() {
    console.log(this.draw, this.command);
  }
}
class bo {
  constructor(n) {
    f(this, "draw");
    f(this, "command");
    this.draw = n, this.command = new te(n), this.initEvent();
  }
  initEvent() {
    console.log(this.draw, this.command);
  }
}
class vo {
  // svg、canvas 操作区 sf-editor-box
  constructor(n, e, i, a) {
    f(this, "listener");
    f(this, "eventBus");
    f(this, "register");
    // 拓展的其他类
    f(this, "canvasDraw");
    f(this, "graphDraw");
    f(this, "graphEvent");
    f(this, "editorEvent");
    f(this, "footerEvent");
    // footer 插件事件
    f(this, "operationEvent");
    // operation 插件事件
    f(this, "catalogEvent");
    // catalog 插件事件
    f(this, "root");
    // 根节点 sf-editor 子节点有 box footer catalog operation
    f(this, "editorBox");
    /** getter */
    f(this, "getRoot", () => this.root);
    f(this, "getListener", () => this.listener);
    f(this, "getEventBus", () => this.eventBus);
    f(this, "getRegister", () => this.register);
    f(this, "getGraphDraw", () => this.graphDraw);
    f(this, "getEditorBox", () => this.editorBox);
    f(this, "getGraphEvent", () => this.graphEvent);
    f(this, "getEditorEvent", () => this.editorEvent);
    f(this, "getCanvasDraw", () => this.canvasDraw);
    f(this, "getFooterEvent", () => this.footerEvent);
    f(this, "getOperationEvent", () => this.operationEvent);
    f(this, "getCatalogEvent", () => this.catalogEvent);
    this.listener = e, this.eventBus = i, this.register = a, this.canvasDraw = new io(this), this.graphDraw = new lo(this), this.graphEvent = new ao(this), this.editorEvent = new po(this), Yi("colorful_theme1"), this.initEditor(n), this.editorEvent.addEvent(), this.initSelectMask(), nt(() => {
      console.log("## SFEditor 编辑器初始化完成。"), this.eventBus.isSubscribe("loaded") && this.eventBus.emit("loaded"), this.listener.loaded && this.listener.loaded();
    });
  }
  /**
   * 初始化编辑器
   */
  initEditor(n) {
    if (!n)
      throw new Error(en.selectorEmpty);
    const e = document.querySelector(n);
    if (!e)
      throw new Error(en.selectorError);
    this.root = this.createHTMLElement("div"), this.root.classList.add("sf-editor"), this.editorBox = this.createHTMLElement("div"), this.editorBox.classList.add("sf-editor-box"), this.editorBox.style.transform = "scale(1) translate(0, 0)";
    const i = this.createHTMLElement("div");
    i.classList.add("sf-editor-box-graphs"), this.editorBox.appendChild(i), this.root.appendChild(this.editorBox), e.appendChild(this.root);
    const { clientWidth: a, clientHeight: r } = this.editorBox, s = this.canvasDraw.initCanvas(a, r);
    this.editorBox.appendChild(s), this.canvasDraw.origin(), this.canvasDraw.waterMark();
  }
  /**
   * 初始化框选
   */
  initSelectMask() {
    const n = this.createHTMLElement("div");
    n.classList.add("sf-editor-box-selectmask"), this.editorBox.appendChild(n);
  }
  /**
   * 初始化 footer
   */
  initFooter() {
    const n = this.createHTMLElement("div");
    n.classList.add("sf-editor-footer"), this.root.appendChild(n), n.innerHTML = ho, this.footerEvent = new mo(this), this.resize();
  }
  /**
   * 初始化 operation 插件
   */
  initOperation() {
    const n = this.createHTMLElement("div");
    n.classList.add("sf-editor-operation"), this.root.appendChild(n), n.innerHTML = fo, this.operationEvent = new wo(this), this.resize();
  }
  /**
   * 元件库 catalog 插件
   */
  initCatalog() {
    const n = this.createHTMLElement("div");
    n.classList.add("sf-editor-catalog"), this.root.appendChild(n), n.innerHTML = uo, this.catalogEvent = new bo(this), this.resize();
  }
  /**
   * 重置宽高信息
   */
  resize() {
    const n = this.root.querySelector(
      '[class="sf-editor-footer"]'
    ), e = this.root.querySelector(
      '[class="sf-editor-operation"]'
    ), i = this.root.querySelector(
      '[class="sf-editor-catalog"]'
    );
    this.editorBox.style.height = `calc(100% - 
      ${n ? n.clientHeight + "px" : ""} -
      ${e ? e.clientHeight + "px" : ""}
      )`, e && (this.editorBox.style.top = e.clientHeight + "px", i && (i.style.top = e.clientHeight + "px", i.style.height = this.editorBox.style.height, this.editorBox.style.left = i.clientWidth + "px")), this.canvasDraw.resetCanvas();
  }
  /**
   * 创建 html 元素
   * @param tagName
   * @returns
   */
  createHTMLElement(n) {
    return document.createElement(n);
  }
  // 创建 svg 元素
  createSVGElement(n) {
    return document.createElementNS($i, n);
  }
  /**
   * SFEditor 销毁事件
   */
  destroy() {
    this.editorBox.remove(), this.canvasDraw.removeCanvas(), this.editorEvent.removeEvent(), nt(() => {
      this.eventBus.isSubscribe("destroyed") && this.eventBus.emit("destroyed"), this.listener.destroyed && this.listener.destroyed();
    });
  }
}
class xo {
  constructor(n) {
    f(this, "draw");
    this.draw = n;
  }
  // 销毁
  destroy() {
    this.draw.destroy();
  }
  // reset
  reset() {
    console.log("global api reset.");
  }
}
class Eo {
  constructor() {
    f(this, "eventHub");
    this.eventHub = /* @__PURE__ */ new Map();
  }
  on(n, e) {
    if (!n || typeof e != "function")
      return;
    const i = this.eventHub.get(n) || /* @__PURE__ */ new Set();
    i.add(e), this.eventHub.set(n, i);
  }
  emit(n, e) {
    if (!n)
      return;
    const i = this.eventHub.get(n);
    if (i) {
      if (i.size === 1)
        return [...i][0](e);
      i.forEach((a) => a(e));
    }
  }
  off(n, e) {
    if (!n || typeof e != "function")
      return;
    const i = this.eventHub.get(n);
    i && i.delete(e);
  }
  isSubscribe(n) {
    const e = this.eventHub.get(n);
    return !!e && e.size > 0;
  }
}
class yo {
  constructor() {
    // 实现SFEditor listener 事件监听，该类型参数与 event Bus 保持一致！
    f(this, "destroyed");
    f(this, "resized");
    f(this, "loaded");
    f(this, "moved");
    f(this, "graphNumberChanged");
    f(this, "pageScale");
    this.loaded = null, this.destroyed = null, this.resized = null, this.moved = null, this.graphNumberChanged = null, this.pageScale = null;
  }
}
class ko {
  // 快捷键
  // 执行两件事 contextmenuList shortCutList
  constructor() {
    f(this, "contextMenuList");
    // 右键菜单
    f(this, "shortcutList");
    this.contextMenuList = [], this.shortcutList = [];
  }
}
class So extends tn {
  constructor(e, i, a) {
    super(e);
    f(this, "rect");
    this.rect = e.createSVGElement("rect"), this.rect.setAttribute("width", "100%"), this.rect.setAttribute("height", "100%"), super.addToEditor(this), super.setWidth.call(this, i), super.setHeight.call(this, a);
  }
  getElement() {
    return this.rect;
  }
}
class jn extends tn {
  constructor(e, i, a) {
    super(e);
    f(this, "ellipse");
    this.ellipse = e.createSVGElement("ellipse"), this.ellipse.setAttribute("rx", "50%"), this.ellipse.setAttribute("ry", "50%"), this.ellipse.setAttribute("cx", "50%"), this.ellipse.setAttribute("cy", "50%"), super.addToEditor(this), super.setWidth.call(this, i * 2), super.setHeight.call(this, a * 2);
  }
  getElement() {
    return this.ellipse;
  }
}
class Ao {
  /**
   * SFEditor 构造函数
   * @param selector css 选择器
   */
  constructor(n) {
    f(this, "listener");
    f(this, "eventBus");
    f(this, "register");
    f(this, "command");
    f(this, "global");
    f(this, "draw");
    this.listener = new yo(), this.eventBus = new Eo(), this.register = new ko(), this.draw = new vo(n, this.listener, this.eventBus, this.register), this.global = new xo(this.draw), this.command = new te(this.draw);
  }
  /**
   * 矩形
   * @param width 宽度
   * @param height 高度
   * @returns
   */
  Rect(n, e) {
    return new So(this.draw, n, e);
  }
  /**
   * 圆 - 为了使得在形变过程中容易操作，故而底层使用椭圆进行重构
   * @param radius 圆半径
   * @returns
   */
  Circle(n) {
    return new jn(this.draw, n, n);
  }
  /**
   * 椭圆
   * @param width 椭圆长轴长
   * @param height 椭圆短轴长
   * @returns
   */
  Ellipse(n, e) {
    return new jn(this.draw, n, e);
  }
  // 加载插件函数
  plugin(n) {
    n === "footer" && this.draw.initFooter(), n === "operation" && this.draw.initOperation(), n === "catalog" && this.draw.initCatalog();
  }
}
export {
  G as KeyMap,
  Ao as SFEditor
};
