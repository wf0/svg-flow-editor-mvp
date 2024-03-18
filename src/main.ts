import { SFEditor } from "./core/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  const editor = new SFEditor(".box");
  editor.Rect(160, 80).position(20, 20);
  editor.Ellipse(100, 80).position(300, 300);
  // editor.register.contextMenuList = [
  //   {
  //     title: "测试",
  //     command: "demo",
  //     shortCut: "Ctrl+O",
  //     callback: () => {
  //       console.log("测试自定义菜单");
  //     },
  //   },
  //   {
  //     isGraph: true,
  //     title: "graph",
  //     command: "demo",
  //     shortCut: "Ctrl+O",
  //     callback: () => {
  //       console.log("测试自定义菜单");
  //     },
  //   },
  // ];

  // editor.listener.loaded = () => {
  //   console.log("loaded");
  // };
});
