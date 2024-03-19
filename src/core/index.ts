import { EventBusMap } from "../interface/Event/index.ts";
import { Command } from "./Command/Command.ts";
import { Draw } from "./Draw/index.ts";
import { Global } from "./Global/Global.ts";
import { EventBus } from "./Event/EventBus.ts";
import { Listener } from "./Listener/index.ts";
import { Register } from "./Register/index.ts";
import { Rect } from "./Graph/Rect.ts";
import { Ellipse } from "./Graph/Ellipse.ts";
import { KeyMap } from "../interface/Event/index.ts";
import "../style/SFEditor.less";
import "../assets/font_4458457_qk4yl715zu/iconfont.css";

type pluginName = "catalog" | "footer" | "operation";

class SFEditor {
  public listener: Listener;
  public eventBus: EventBus<EventBusMap>;
  public register: Register;
  public command: Command;
  public global: Global;
  private draw: Draw;

  /**
   * SFEditor 构造函数
   * @param selector css 选择器
   */
  constructor(selector: string) {
    this.listener = new Listener();
    this.eventBus = new EventBus();
    this.register = new Register();
    this.draw = new Draw(selector, this.listener, this.eventBus, this.register);
    this.global = new Global(this.draw);
    this.command = new Command(this.draw);
  }

  /**
   * 矩形
   * @param width 宽度
   * @param height 高度
   * @returns
   */
  public Rect(width: number, height: number) {
    return new Rect(this.draw, width, height);
  }

  /**
   * 圆 - 为了使得在形变过程中容易操作，故而底层使用椭圆进行重构
   * @param radius 圆半径
   * @returns
   */
  public Circle(radius: number) {
    return new Ellipse(this.draw, radius, radius);
  }

  /**
   * 椭圆
   * @param width 椭圆长轴长
   * @param height 椭圆短轴长
   * @returns
   */
  public Ellipse(width: number, height: number) {
    return new Ellipse(this.draw, width, height);
  }

  // 加载插件函数
  public plugin(name: pluginName) {
    // name 是插件名称
    if (name === "footer") this.draw.initFooter();
    if (name === "operation") this.draw.initOperation();
  }
}

export { SFEditor, KeyMap, type pluginName };
