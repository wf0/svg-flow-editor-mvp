import { SFEditor } from "./core/index.ts";
document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  editor.Rect(100, 80).position(100, 100);
  // editor.Circle(50).position(200, 200);
  // editor.Ellipse(100, 80).position(300, 300);
  editor.register.contextMenuList = [
    {
      title: "测试",
      command: "demo",
      callback: () => {
        console.log("测试自定义菜单");
      },
    },
  ];
});
