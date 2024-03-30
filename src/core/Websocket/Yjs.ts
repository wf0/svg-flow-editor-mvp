import * as Y from "yjs";
import { fromUint8Array, toUint8Array } from "js-base64";

export class YJS {
  private doc: Y.Doc;
  private ymap: Y.Map<any>;

  constructor() {
    // 创建 doc
    this.doc = new Y.Doc();

    // 创建 map
    this.ymap = this.doc.getMap("SFEditor-yjs-demo");
  }

  // 添加 key
  protected setMap(key: string, value: any) {
    this.ymap.set(key, value);
  }

  // 获取 key 的 value 值
  protected getMap(key: string) {
    return this.ymap.get(key);
  }

  // 删除 key
  protected deleteMap(key: string) {
    this.ymap.delete(key);
  }

  // 获取本地doc全量数据
  protected getState(): string {
    return fromUint8Array(Y.encodeStateAsUpdate(this.doc));
  }

  // 应用更新
  protected mergeState(state: string) {
    const binaryEncoded = toUint8Array(state);
    Y.applyUpdate(this.doc, binaryEncoded);
  }
}
