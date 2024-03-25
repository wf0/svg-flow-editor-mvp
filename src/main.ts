import { KeyMap, SFEditor } from "./core/index.ts";
import { barOption } from "./demo/echart.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  editor.Rect(100, 100).position(100, 100);
  editor.Rect(100, 100).position(300, 300);
  const echart = editor.plugin("echart");
  const bar = echart?.init(barOption);
  bar?.event.on("click", (p) => {
    console.log(p);
  });
});
