import { Ellipse } from "../../core/Graph/Ellipse.ts";
import { Rect } from "../../core/Graph/Rect.ts";

export type IGraph = Rect | Ellipse;

// 单个节点的信息
export interface node {
  nodeID: string;
  width: number;
  height: number;
  x: number;
  y: number;
  stroke?: string;
  fill?: string;
}
