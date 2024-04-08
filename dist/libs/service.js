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
  const result = JSON.parse(
    decodeURIComponent(
      String.fromCharCode.apply(null, new Uint16Array(pako.ungzip(data)))
    )
  );
  delete result.state; // 过滤 Yjs 的全量数据
  return result;
};

/**
 * @DESC pako 压缩方法 Object => Unit8Array
 * @param {*} data
 * @returns
 */
const gzip = (data) => {
  // Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  const json = encodeURIComponent(JSON.stringify(data));
  return pako.gzip(json); // 返回 Unit8Array,采用相同的解析方法，即可解析出数据
};

//监听端口，启动服务
server.listen(9000, () => {
  //服务启动成功
  const wss = new WebSocketServer({ port: 9999 }); // ws server
  console.log("服务启动成功 ==> ws://localhost:9999");

  wss.on("connection", (conn, req) => {
    conn.on("close", () => {});

    conn.on("error", () => {});

    conn.on("open", () => {});

    conn.on("message", (result) => {
      try {
        // pako 解压的数据是供后台解析业务处理，回传给客户端的仍然是 Unit8Array => Blob
        const { operate } = unzip(result);

        // 处理新用户连接-只发送给当前的客户端，可以进行用户列表、editor 数据传输等场景
        if (operate === "connect") {
          return wss.clients.forEach(
            (client) =>
              client === conn && client.send(gzip({ operate, value: 123 }))
          );
        }

        // 直接将其他信息广播给所有的客户端
        wss.clients.forEach((client) => client !== conn && client.send(result));
      } catch (error) {
        console.log("rub"); // _this.websocket.send("rub");
      }
    });
  });
});
