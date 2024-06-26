import { Draw } from "../Draw/index.ts";
import { GraphCommon } from "./Common.ts";

export class SVGImage extends GraphCommon {
  private image: SVGImageElement;

  constructor(draw: Draw, url: string, width?: number, height?: number) {
    super(draw);
    this.image = draw.createSVGElement("image") as SVGImageElement;
    this.image.setAttribute("width", "100%");
    this.image.setAttribute("height", "100%");
    this.image.setAttribute("href", url);
    // 一定先执行 addTo 不然会报找不到 Element 的错误
    super.addToEditor(this);

    // 将当前创建的元件添加到 svg 下
    if (width && height) {
      super.setWidth.call(this, width);
      super.setHeight.call(this, height);
    } else this.analysis(url, draw);
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
  private analysis(url: string, draw: Draw) {
    var img = new Image();
    img.onload = () => {
      var flag = false;
      if (img.width > 200 || img.height > 200) flag = true;
      super.setWidth.call(this, flag ? img.width / 10 : img.width);
      super.setHeight.call(this, flag ? img.height / 10 : img.height);

      // 需要重置锚点，不然图片加载是异步的，会导致宽高为0 的情况
      const graphDraw = draw.getGraphDraw();
      graphDraw.cancelLinkPoint(this);
      graphDraw.createLinkPoint(this);
      graphDraw.cancelFormatPoint(this);
      graphDraw.createFormatPoint(this);
    };
    img.src = url;
  }

  public getElement() {
    return this.image;
  }
}
