import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  editor
    .Rect(100, 100)
    .position(200, 200)
    .setText("123")
    .setText("999")
    .setText("123")
    .setText("999");
  // 加载插件
  editor.plugin("catalog");
  editor.plugin("footer");
  editor.plugin("operation");
  // editor.plugin("websocket", { socketurl: "ws://localhost:9999" });
});
