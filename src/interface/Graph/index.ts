import { GEchart } from "../../core/Graph/GEchart.ts";
import { Ellipse } from "../../core/Graph/Ellipse.ts";
import { SVGImage } from "../../core/Graph/Image.ts";
import { Rect } from "../../core/Graph/Rect.ts";
import { Text } from "../../core/Graph/Text.ts";
import { Graph } from "../../core/Graph/index.ts";
import { GTable } from "../../core/Graph/GTable.ts";

export type IGraph =
  | GTable
  | Graph
  | Rect
  | Ellipse
  | SVGImage
  | GEchart
  | Text;

// 单个节点的信息
export interface node {
  type?:
    | "table" // 表格
    | "rect" // 矩形
    | "circle" // 圆
    | "ellipse" // 椭圆
    | "image" // 图片
    | "text" // 文本
    | "echart"; // 统计图 - 不做折线区分，直接与使用传入的 option 进行渲染即可
  row?: number; // table 的配置项
  col?: number; // table 的配置项
  stripe?: boolean; // table 的配置项
  option?: any;
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
  broadcast?: boolean; // 是否需要广播，用户不可控
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
  nodeID?: string[];
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  radius?: number;
  dasharray?: string;
}

// 表格控制
export interface ITableConfig {
  row?: number; // 行
  col?: number; // 列
  stripe?: boolean; // 是否开启斑马纹
}
