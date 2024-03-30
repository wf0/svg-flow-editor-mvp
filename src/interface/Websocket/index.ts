export interface IWebsocket {
  username?: string;
  socketurl: string;
}

export type socketInfo = {
  username: string;
  clientID: string;
  state: string; // 本地 doc 全量数据
};
// 定义消息类型
export type wsMessage = {
  operate:
    | "connect" // 用户连接通知
    | "graphClick" // 元件单击
    | "addGraph" // 添加元件
    | "updateGraph" // 更新元件
    | "deleteGraph"; // 删除元件
  value: any;
};
