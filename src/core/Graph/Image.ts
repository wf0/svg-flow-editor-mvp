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
      var flag = false;
      if (img.width > 200 || img.height > 200) flag = true;
      super.setWidth.call(this, flag ? img.width / 10 : img.width);
      super.setHeight.call(this, flag ? img.height / 10 : img.height);

      // 需要重置锚点，不然图片加载是异步的，会导致宽高为0 的情况
      super.updatePoint(this);
    };
    img.src = url;
  }

  public getElement() {
    return this.image;
  }
}
