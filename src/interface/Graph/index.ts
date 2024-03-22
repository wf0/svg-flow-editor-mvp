import { Ellipse } from "../../core/Graph/Ellipse.ts";
import { SVGImage } from "../../core/Graph/Image.ts";
import { Rect } from "../../core/Graph/Rect.ts";

export type IGraph = Rect | Ellipse | SVGImage;

// 单个节点的信息
export interface node {
  type?: "rect" | "circle" | "ellipse" | "image" | "text";
  nodeID?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotate?: number; // 旋转角度
  zIndex?: number; // 层级
  stroke?: string;
  fill?: string;
  text?: string;
  url?: string;
}
