export interface IWebsocket {
  username?: string;
  socketurl: string;
}

export type socketInfo = {
  username: string;
  clientID: string;
};
// 定义消息类型
export type wsMessage = {
  operate: "graphClick" | "addGraph" | "updateGraph" | "deleteGraph"; // 操作类型
  value: any;
};
