// node websocket service
import { WebSocketServer } from "ws";
import http from "http";
import pako from "pako";

//创建服务对象
const server = http.createServer((request, response) => {
  response.end("Hello HTTP Server"); //设置响应体，结束响应
});

/**
 * @DESC pako 解压方法
 * @param { Uint8Array } data
 * @returns
 */
const unzip = (data) => {
  return JSON.parse(
    decodeURIComponent(
      String.fromCharCode.apply(null, new Uint16Array(pako.ungzip(data)))
    )
  );
};

//监听端口，启动服务
server.listen(9000, () => {
  //服务启动成功
  const wss = new WebSocketServer({ port: 9999 }); // ws server
  console.log("服务启动成功 ==> ws://localhost:9999");

  wss.on("connection", (conn, req) => {
    console.log("用户连接");
    conn.on("message", (data) => {
      // _this.websocket.send("rub"); 处理 rub 心跳包的数据
      try {
        // pako 解压的数据是供后台解析业务处理，回传给客户端的仍然是 Unit8Array => Blob
        const ungzipResult = unzip(data);
        console.log("解析的数据", ungzipResult);
        // wss.clients 所有的客户端
        wss.clients.forEach((conn) => conn.send(data));
      } catch (error) {
        console.log("error");
      }
    });
  });
});
