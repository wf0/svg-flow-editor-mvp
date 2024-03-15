import { EventBusMap } from "../interface/Event/index.ts";
import { Command } from "./Command/Command.ts";
import { Draw } from "./Draw/index.ts";
import { Global } from "./Global/Global.ts";
import { EventBus } from "./EventBus/index.ts";
import { Listener } from "./Listener/index.ts";
import { Register } from "./Register/index.ts";
import { Rect } from "./Graph/Rect.ts";
import { Circle } from "./Graph/Circle.ts";

import "../style/SFEditor.less";
import { Ellipse } from "./Graph/Ellipse.ts";

export class SFEditor {
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

  public Rect(width: number, height: number) {
    return new Rect(this.draw, width, height);
  }

  public Circle(radius: number) {
    return new Circle(this.draw, radius);
  }

  public Ellipse(width: number, height: number) {
    return new Ellipse(this.draw, width, height);
  }
}
