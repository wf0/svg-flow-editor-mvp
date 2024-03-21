import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  const rect = editor.Rect(200, 200).position(100, 100).setFill("#ccc");
  editor.Rect(200, 200).position(350, 350).setFill("#ccc");
  // 加载插件
  editor.plugin("footer");
  editor.plugin("operation");
  editor.plugin("catalog");
});
