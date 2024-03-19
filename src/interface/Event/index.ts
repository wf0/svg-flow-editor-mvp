import { IGraph } from "../Graph/index.ts";

// 实现SFEditor 事件监听
export type EventType = (payload?: unknown) => void;

// 实现SFEditor eventBus 事件监听，该类型参数与 listener 保持一致！
export interface EventBusMap {
  loaded: EventType;
  resized: EventType;
  destroyed: EventType;
  moved: EventType;
  graphNumberChanged: EventType;
  pageScale: EventType;
}

export enum KeyMap {
  Delete = "Delete",
  Backspace = "Backspace",
  Enter = "Enter",
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Up = "ArrowUp",
  Down = "ArrowDown",
  ESC = "Escape",
  TAB = "Tab",
  META = "Meta",
  LEFT_BRACKET = "[",
  RIGHT_BRACKET = "]",
  COMMA = ",",
  PERIOD = ".",
  LEFT_ANGLE_BRACKET = "<",
  RIGHT_ANGLE_BRACKET = ">",
  EQUAL = "=",
  MINUS = "-",
  PLUS = "+",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z",
  A_UPPERCASE = "A",
  B_UPPERCASE = "B",
  C_UPPERCASE = "C",
  D_UPPERCASE = "D",
  E_UPPERCASE = "E",
  F_UPPERCASE = "F",
  G_UPPERCASE = "G",
  H_UPPERCASE = "H",
  I_UPPERCASE = "I",
  J_UPPERCASE = "J",
  K_UPPERCASE = "K",
  L_UPPERCASE = "L",
  M_UPPERCASE = "M",
  N_UPPERCASE = "N",
  O_UPPERCASE = "O",
  P_UPPERCASE = "P",
  Q_UPPERCASE = "Q",
  R_UPPERCASE = "R",
  S_UPPERCASE = "S",
  T_UPPERCASE = "T",
  U_UPPERCASE = "U",
  V_UPPERCASE = "V",
  W_UPPERCASE = "W",
  X_UPPERCASE = "X",
  Y_UPPERCASE = "Y",
  Z_UPPERCASE = "Z",
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
}

export interface IContextmenu {
  command: string; // 需要给定command 进行事件绑定
  title: string;
  callback: (e: Event, graph?: IGraph) => void;
  isGraph?: boolean; // 是否处于元件身上才显示
  shortCut?: string; // 快捷键
  icon?: string;
  disable?: boolean; // 是否可用
  when?: boolean; // 条件显示 未实现
}

// 注册快捷键回传的参数
export type cbParams = {
  tips: string;
  ctrl?: boolean;
  shift?: boolean;
  key?: string;
};

// 注册快捷键事件类型
export interface IShortCut {
  key: KeyMap;
  ctrl?: boolean;
  meta?: boolean;
  mod?: boolean; // windows:ctrl || mac:command
  shift?: boolean;
  alt?: boolean; // windows:alt || mac:option
  isGlobal?: boolean;
  callback?: (payload?: cbParams) => void;
  disable?: boolean;
}
