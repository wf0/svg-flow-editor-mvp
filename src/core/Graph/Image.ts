import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class SVGImage extends GraphCommon {
  private image: SVGImageElement;

  constructor(draw: Draw, url: string) {
    super(draw);
    this.image = draw.createSVGElement("image") as SVGImageElement;
    this.image.setAttribute("width", "100%");
    this.image.setAttribute("height", "100%");
    this.image.setAttribute("href", url);

    // 将当前创建的元件添加到 svg 下
    super.addToEditor(this);
    this.analysis(url);
  }

  // 特有属性 - 设置 href 属性
  public setURL(url: string) {
    this.image.setAttribute("href", url);
  }

  // 特有属性 - 获取 href 属性
  public getURL() {
    return this.image.getAttribute("href");
  }

  // 解析图片宽高
  private analysis(url: string) {
    var img = new Image();
    img.onload = () => {
      // 这里可以拿到图片的原始尺寸， width height 在创建图片的时候有用
      // url this.toBlob(file, file.type)
      super.setWidth.call(this, img.width / 10);
      super.setHeight.call(this, img.height / 10);
      // width height 在创建图片的时候有用
    };
    // @ts-ignore
    img.src = url;
    // 设置宽高
  }

  public getElement() {
    return this.image;
  }
}
