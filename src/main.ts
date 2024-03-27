import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");

  // 加载插件
  editor.plugin("catalog");
  editor.plugin("footer");
  editor.plugin("operation");
});
