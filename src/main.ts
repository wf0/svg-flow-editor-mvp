import { KeyMap, SFEditor } from "./core/index.ts";
import { barOption } from "./mock/echart.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  editor.Rect(100, 100).position(100, 100);
  editor.Rect(100, 100).position(300, 300);
});
