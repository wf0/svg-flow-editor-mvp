// 项目异常提示
export const messageInfo = {
  selectorEmpty: "The provided selector is empty.",
  // 选择器不可用，你可能需要等待DOM渲染完成。
  selectorError:
    "The selector is not Available.Maybe you need to wait for Dom rendering to completed.",
  invalidParams: "Invalid input parameter.",
  optionError: "The initialization Echarts parameter cannot be empty.",
  invalidWH: "Width or Height is necessary.",
  websocket: {
    url: "The WebSocket URL cannot be empty.",
    success: "WebSocket连接成功",
    refresh: "WebSocket连接发生错误, 请刷新页面！",
    wait: "WebSocket连接发生错误, 请耐心等待！",
    close: "WebSocket连接关闭",
    contact: "服务器通信发生错误，请刷新页面后再试，如若不行请联系管理员！",
    support: "当前浏览器不支持WebSocket",
  },
};
