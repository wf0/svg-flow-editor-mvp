import { node } from "../../interface/Graph/index.ts";

/**
 * WebWorker 实现辅助线位置关系计算
 * @param event {current, nodes} 当前元素与所有元素
 */
self.onmessage = (event) => {
  const { current, nodes } = event.data;
  const { v1, v2, v3, h1, h2, h3 } = computedLine(current);
  const varr = [v1, v2, v3];
  const harr = [h1, h2, h3];
  // 定义返回结果
  var result: { num: number; type: string }[] = [];
  // 循环
  nodes.forEach((node: node) => {
    if (node.nodeID === current.nodeID) return;
    const nodeLine = computedLine(node);

    if (varr.find((i) => i === nodeLine.v1))
      result.push({ num: nodeLine.v1, type: "v" });

    if (varr.find((i) => i === nodeLine.v2))
      result.push({ num: nodeLine.v2, type: "v" });

    if (varr.find((i) => i === nodeLine.v3))
      result.push({ num: nodeLine.v3, type: "v" });

    if (harr.find((i) => i === nodeLine.h1))
      result.push({ num: nodeLine.h1, type: "h" });

    if (harr.find((i) => i === nodeLine.h2))
      result.push({ num: nodeLine.h2, type: "h" });

    if (harr.find((i) => i === nodeLine.h3))
      result.push({ num: nodeLine.h3, type: "h" });
  });

  // 返回结果，确保每次移动只会返回一次结果，而不是循环返回多次，会导致某些线段无法渲染问题
  postMessage(result);
};

// 计算当前拖动元素的6条线的坐标
function computedLine(node: node) {
  var v1 = 0; // 垂直方向三条线
  var v2 = 0; // 垂直方向三条线
  var v3 = 0; // 垂直方向三条线
  var h1 = 0; // 水平方向三条线
  var h2 = 0; // 水平方向三条线
  var h3 = 0; // 水平方向三条线
  // 1. 解析宽度高度 x y
  const { x, y, width, height } = node;
  v1 = x; // 这里不再区分 rect 是因为在传数据的时候已经处理过了
  v2 = x + width / 2;
  v3 = x + width;
  h1 = y;
  h2 = y + height / 2;
  h3 = y + height;
  return { v1, v2, v3, h1, h2, h3 };
}
