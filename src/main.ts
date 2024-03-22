import { KeyMap, SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  Reflect.set(window, "editor", editor);
  // editor.Rect(100, 100);
  var data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var option = {
    xAxis: {
      type: "category",
      data,
    },
    grid: {
      top: 20,
      left: 30,
      bottom: 20,
      right: 20,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  const echart = editor.plugin("echart");
  const line = echart?.init(option);

  const line2 = echart?.init(option).position(200, 200);
});
