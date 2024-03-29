import { GEchart } from "../../core/Graph/GEchart.ts";
import { Ellipse } from "../../core/Graph/Ellipse.ts";
import { SVGImage } from "../../core/Graph/Image.ts";
import { Rect } from "../../core/Graph/Rect.ts";
import { Text } from "../../core/Graph/Text.ts";

export type IGraph = Rect | Ellipse | SVGImage | GEchart | Text;

// 单个节点的信息
export interface node {
  type?:
    | "rect"
    | "circle"
    | "ellipse"
    | "image"
    | "text"
    | "cLine"
    | "cBar"
    | "cRadar"
    | "cPie";
  nodeID?: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  rotate?: number; // 旋转角度
  zIndex?: number; // 层级
  stroke?: string;
  fill?: string;
  text?: string;
  url?: string;
}

// 线中应用的元件参数-宽高位置信息
export type graphInfo = {
  x: number;
  y: number;
  w: number;
  h: number;
};

// 节点类型 索引
export type LineKey = {
  [key: string]: (
    p: graphInfo,
    o: number
  ) => {
    ox: number;
    oy: number;
    x: number;
    y: number;
  };
};

export interface IUpdateGraph {
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  radius?: number;
  dasharray?: string;
}
