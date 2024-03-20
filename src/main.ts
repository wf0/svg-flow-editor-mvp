import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  editor.Rect(200, 200).position(280, 280).setFill("green");
  editor.Ellipse(100, 80).position(300, 300).setFill("yellow");

  editor.Rect(200, 200).position(350, 350).setFill("red");
  // 加载插件
  editor.plugin("footer");
  editor.plugin("operation");
  editor.plugin("catalog");
});
