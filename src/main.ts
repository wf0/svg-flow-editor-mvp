import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  // editor.Rect(100, 100).position(200, 200).setText("999");
  // editor.Rect(100, 100).position(100, 100).setText("789");
  // editor.Rect(100, 100).position(100, 200).setText("129");
  // editor.Rect(100, 100).position(200, 100).setText("567");
  // editor.Table({ col: 3, row: 3, stripe: true }).position(200, 200);

  // 创建五角星
  editor.Polygon("star", 100, 100).position(100, 100).setText("666");

  // 加载插件
  editor.plugin("catalog");
  editor.plugin("footer");
  editor.plugin("operation");
  // editor.plugin("websocket", { socketurl: "ws://localhost:9999" });
});
