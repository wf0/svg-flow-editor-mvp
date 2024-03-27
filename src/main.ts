import { barOption } from "./core/Config/index.ts";
import { KeyMap, SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  // editor.Rect(100, 100).position(100, 100);
  // editor.Rect(100, 100).position(300, 300);

  // editor.Text("测试文本");

  // 加载插件
  editor.plugin("catalog");
  editor.plugin("footer");
  editor.plugin("operation");

  // 绘制统计图
  // const echart = editor.plugin("echart");
  // echart?.init(barOption).position(200, 200);
});
