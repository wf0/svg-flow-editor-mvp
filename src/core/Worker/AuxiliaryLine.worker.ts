import { INodeInfo } from "../../interface/Graph/index.ts";

/**
 * WebWorker 实现辅助线位置关系计算
 * @param event {current, allNode} 当前元素与所有元素
 */
self.onmessage = (event) => {
  const { current, allNode } = event.data;
  const list = allNode as INodeInfo[];
  const { v1, v2, v3, h1, h2, h3 } = computedLine(current);
  const varr = [v1, v2, v3];
  const harr = [h1, h2, h3];
  // 定义返回结果
  var result: { num: number; type: string }[] = [];
  // 循环
  list.forEach((node) => {
    if (node.ID === current.ID) return;
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
function computedLine(node: INodeInfo) {
  var v1 = 0; // 垂直方向三条线
  var v2 = 0; // 垂直方向三条线
  var v3 = 0; // 垂直方向三条线
  var h1 = 0; // 水平方向三条线
  var h2 = 0; // 水平方向三条线
  var h3 = 0; // 水平方向三条线
  // 1. 解析宽度高度 cx cy
  const { cx, cy, w, h } = node;
  v1 = cx - w / 2; // 这里不再区分 rect 是因为在传数据的时候已经处理过了
  v2 = cx;
  v3 = cx + w / 2;
  h1 = cy - h / 2;
  h2 = cy;
  h3 = cy + h / 2;
  return { v1, v2, v3, h1, h2, h3 };
}
