import { SFEditor } from "./core/index.ts";
document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  editor.Rect(100, 80).position(100, 100);
  editor.Circle(50).position(200, 200);
  editor.Ellipse(100, 80).position(300, 300);
});
