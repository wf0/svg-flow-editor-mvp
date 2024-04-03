import { ITableConfig } from "../../interface/Graph/index.ts";
import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

// 实现表格
export class GTable extends GraphCommon {
  private table: HTMLTableElement;
  private row: number; // 行
  private col: number; // 列

  constructor(draw: Draw, payload?: ITableConfig) {
    super(draw);
    this.table = draw.createHTMLElement("table") as HTMLTableElement;
    this.table.classList.add("sf-editor-table");

    // 默认四行三列
    this.row = payload?.row || 4;
    this.col = payload?.col || 3;

    if (payload?.stripe) this.table.classList.add("sf-editor-table--stripe");

    super.addToEditor(this);

    super.setWidth.call(this, this.col * 100);
    super.setHeight.call(this, this.row * 40);

    // 1. 创建头部
    this.createHead(draw);

    // 2. 创建 body
    this.createBody(draw);

    // 3. 添加事件
    this.initEvent();
  }

  // 创建头部 head
  private createHead(draw: Draw) {
    const thead = draw.createHTMLElement("thead");
    const tr = draw.createHTMLElement("tr");
    for (let i = 0; i < this.col; i++) {
      const th = draw.createHTMLElement("th");
      const div = draw.createHTMLElement("div");
      div.innerText = `标题${i + 1}`;
      th.appendChild(div);
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    this.table.appendChild(thead);
  }

  // 创建 tbody
  private createBody(draw: Draw) {
    const body = draw.createHTMLElement("tbody");
    for (let i = 0; i < this.row; i++) {
      const tr = draw.createHTMLElement("tr");
      for (let i = 0; i < this.col; i++) {
        const td = draw.createHTMLElement("td");
        const div = draw.createHTMLElement("div");
        td.appendChild(div);
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }
    this.table.appendChild(body);
  }

  // 将光标移动到末尾
  private setRange(div: Node) {
    var range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false);
    var sel = window.getSelection() as Selection;
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // 初始化 双击编辑事件
  private initEvent() {
    const divs = this.table.querySelectorAll("div");
    divs.forEach((item) => {
      item.addEventListener("dblclick", () => {
        item.setAttribute("contenteditable", "true");
        item.focus();
        this.setRange(item);
        item.addEventListener("blur", () =>
          divs.forEach((i) => i.removeAttribute("contenteditable"))
        );
      });
    });
  }

  // 获取Element
  public getElement() {
    return this.table;
  }
}
