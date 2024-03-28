# Svg-Flow-Editor-MVP

## 项目简介

​		svg flow editor 是一款自研流程图编辑器，提供了一系列流程图交互、编辑所必需的功能，计划支持前端研发自定义开发各种逻辑编排场景，如流程图、ER 图、BPMN 流程等。项目使用typescript与svg、canvas等技术进行搭建，脱离vue、react等框架的限制，使得用户更快、更轻松融合到自己的项目中，意在工作审批配置、机器人逻辑编排、无代码平台流程配置都有较好的应用。



## 开源说明

```javascript
本项目采用 Apache 2.0 开源策略
```



## 功能点

- 流程图基本元件
  - 矩形 rect  
  - 圆形 circle  
  - 椭圆 ellipse
  - 统计图 echarts
  - 自定义图片 image
  - 自定义图标 icon
- 元件基本操作
  - 创建、删除、移动、旋转、定位、属性修改、框选、多选（ctrl）、层级处理、文本显示等
- 直角折线
- 全局 API
- Command API
- 右键菜单（内部、自定义）
- 快捷键（内部、自定义）
- event Bus 、 listener 事件监听机制
- Canvas 实现背景网格、圆点、水印、辅助线
- catalog、operation、footer、echart 插件化



## 待开发 - TODO

- 拓展元件类型
  - 多边形 polygon
  - 三角形 triangle
  - 菱形 diamond
  - 线段 line
  - HTML html
- history 历史记录管理器（redo、undo、history）
- tool工具类： 一键美化、图片导出、组合/取消组合、锁定/取消锁定、
- network协同： 支持用户光标、用户操作、聊天通信



## 使用方式

```javascript
// 引入
import { SFEditor } from 'svg-flow-editor'

// 创建 editor 编辑器，需要传递编辑器 container，支持 css selector
const editor = new SFEditor(".flow-box");

// 创建矩形 Rect
const rect = editor.Rect(100, 70)

// 设置位置
rect.position(100, 100)

// SFEditor 所有的类、方法均支持链式调用，上诉代码等价于
new SFEditor(".flow-box").Rect(100, 70).position(100, 100)

// 示例：执行更换主题API
editor.command.executeSetTheme('colorful_theme2')

// 示例：通过 listener 监听事件
editor.listener.graphLoaded = ()=> { // your code... }

// 取消事件监听
editor.listener.graphLoaded = null

// 示例：通过 event Bus 监听事件
editor.eventBus.on('graphLoaded',()=> { // your code... })

// 取消事件监听
editor.eventBus.off('graphLoaded')

// 示例：注册快捷键
editor.register.shortcutList = [
  {
    key: "s",
    ctrl: true,
    callback: () => {
      console.log("点击了Ctrl S");
    },
  },
];

// 示例：注册右键菜单
editor.register.contextMenuList = [
  {
    title: "测试右键菜单",
    callback: () => {
      console.log("右键菜单点击事件");
    },
  },
];

// 示例：调用全局API
editor.global.destroy()

// 示例：加载元件库插件
editor.plugin("pluginName")

// 示例：使用 Echart
const echart = editor.plugin("echart");
// 定义echart 数据
var data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var option = {
    xAxis: { type: "category", data, },
 	// ... other options
  };

// 初始化统计图
const line = echart?.init(option);

// 监听统计图事件
line.event.on('click', params => {
  // your code...
})

```



## 架构设计

![架构设计](https://img-blog.csdnimg.cn/direct/4d0d8ea5c29343c89eaf834ee4f3b4d4.png)

​		项目对外暴露流程图操作对象 SFEditor，身上有用户操作的对象属性及方法，例如： svg 构造器（Rect、Circle、Ellipse）、command api操作、event事件中心以及全局api，通过暴露操作对象，实现对内部的数据访问、对象操作等。在核心模块中，需要考虑用户的使用习惯，封装完整的工具类，实现流程图的基本操作、拓展功能。底层依赖了svg对项目元件库的基础元件进行创作，同时使用了canvas对背景网格、水印等进行绘制，使用html进行页面布局，并且提供了typescript的全类型支持。 在API设计的设计上，采取了Command CommandAdapt 两个类实现，Command中不进行用户方法的直接处理，增加adapt类进行方法中转，防止用户通过API直接操作核心类。Command调用 adapt 的实例方法，在adapt 中获取draw、svg 等核心类进行用户的响应。



## Graph 实例属性方法

### graph.getElement()

- 方法说明：获取元件SVG结构；
- 返回值：SVGRectElement|SVGEllipseElement|HTMLDivElement；

### graph.getID()

- 方法说明：获取元件的ID属性；
- 返回值：string；

### graph.setID(nodeID: string)

- 方法说明：设置元件的ID属性；
- 返回值：graph实例；

### graph.getX()

- 方法说明：获取元件的x坐标（是graphBox的left属性）；
- 返回值：number；

### graph.setX(x: number)

- 方法说明：设置元件的x坐标；
- 返回值：graph实例；

### graph.getY()

- 方法说明：获取元件的y坐标（是graphBox的top属性）；
- 返回值：number；

### graph.setY(y: number)

- 方法说明：设置元件的y坐标；
- 返回值：graph实例；

### graph.getWidth()

- 方法说明：获取元件的宽度；
- 返回值：number；

### graph.setWidth(w: number)

- 方法说明：设置元件的宽度；
- 返回值：graph实例；

### graph.getHeight()

- 方法说明：获取元件的高度；
- 返回值：number；

### graph.setHeight(h: number)

- 方法说明：设置元件的高度；
- 返回值：graph实例；

### graph.getStroke()

- 方法说明：获取元件的边框；
- 返回值：string；

### graph.setStroke(stroke: string)

- 方法说明：设置元件的边框；
- 返回值：graph实例；

### graph.getFill()

- 方法说明：获取元件的填充样式；
- 返回值：string；

### graph.setFill(fill: string)

- 方法说明：设置元件的填充；
- 返回值：graph实例；

### graph.getRotate()

- 方法说明：获取元件的旋转角度；
- 返回值：number；

### graph.setRotate(rotate: number)

- 方法说明：设置元件旋转角度；
- 返回值：graph实例；

### graph.getText()

- 方法说明：获取元件的文本内容；
- 返回值：string；

### graph.setText(text: string)

- 方法说明：设置元件的文本内容；
- 返回值：graph实例；

### graph.position(x: number, y: number)

- 方法说明：复合属性，内部调用 setX()、setY() 实现；
- 返回值：graph实例；

### graph.getOption()

- 方法说明：**Echart 特有属性**，获取统计图的配置信息；
- 返回值：统计图配置信息；

### graph.setOption(option:object)

- 方法说明：**Echart 特有属性**，设置统计图配置信息；
- 返回值：graph示例；


## Command APIS

### executeBackground(payload?: IBackground)

- 方法说明：设置Canvas相关属性-网格、圆点、水印；
- 返回值：void；
- 参数说明：
  - **origin** boolean [可选] 是否显示圆点
  - **originColor** string [可选] 圆点的颜色
  - **gridline** boolean [可选] 是否显示网格线
  - **gridlineColor** string [可选] 网格线颜色
  - **watermark** boolean [可选] 是否显示水印
  - **watermarkColor** string [可选] 水印颜色
  - **watermarkText** string [可选] 水印显示文本
- 用法示例：

~~~javascript
1. 如果没有传任何参数，则表示关闭网格、关闭水印、关闭圆点
editor.command.executeBackground()

2. 只显示网格 
editor.command.executeBackground({gridline:true})
editor.command.executeBackground({gridlineColor:'red'})
editor.command.executeBackground({gridline:true,gridlineColor:'red'})

3. 只显示圆点 
editor.command.executeBackground({origin:true})
editor.command.executeBackground({originColor:'red'})
editor.command.executeBackground({origin:true,originColor:'red'})

4. 只显示网格 
editor.command.executeBackground({watermark:true})
editor.command.executeBackground({watermarkText:'水印文本'})
editor.command.executeBackground({watermarkColor:'red'})
... 以及上诉的组合都可以

5. 内部实现原理：
 // 网格背景与小圆点背景互斥
if (gridline || gridlineColor) canvas.gridLine(gridlineColor);
else if (origin || originColor) canvas.origin(originColor);
// 水印则是独立存在
if (watermark || watermarkColor || watermarkText) canvas.waterMark(watermarkText, watermarkColor);
~~~

### executeAddGraph(payload: node)

- 方法说明：设置Canvas相关属性-网格、圆点、水印；
- 返回值：添加的元件实例 IGraph；
- 参数说明：
  - **type** "rect" | "circle" | "ellipse" **[必传]** 添加元件类型
  - **width** number **[必传]** 元件的宽度
  - **height** number **[必传]** 元件的高度
  - **nodeID** string [可选] 元件的ID
  - **x** number [可选] 元件的x坐标
  - **y** number [可选] 元件的y坐标
  - **rotate** number [可选] 元件的旋转角度
  - **stroke** string [可选] 元件的边框颜色
  - **fill** string [可选] 元件的填充颜色
  - **text** string [可选] 元件文本
- 用法示例：

```javascript
1. 必传参数
editor.command.executeAddGraph({type:"rect",width:100,height:100})

2. 可选参数示例
editor.command.executeAddGraph({type:"rect",width:100,height:100,text:"demo"})

3. 圆形、椭圆参数说明
	** 圆形底层使用椭圆 Ellipse 实现，在宽高的设计上，使用短长轴设计：
    **  3.1. 想要半径50的圆，传入的宽高是半径的一半
    **  3.2. 想要椭圆类似，实际处理： setWidth(width*2) setHeight(height*2)
```

### executeFullScreen()

- 方法说明：进入全屏；
- 返回值：void；

### executeExitFullScreen()

- 方法说明：退出全屏；
- 返回值：void；

### executePageScaleRecovery()

- 方法说明：重置页面缩放；
- 返回值：void；

### executePageScaleMinus()

- 方法说明：缩小页面；
- 返回值：void；

### executePageScaleAdd()

- 方法说明：放大页面；
- 返回值：void；

### setPageScale(scale: number)

- 方法说明：缩放页面至指定倍率；
- 参数说明： **scale 支持 0.4 至 2 之间**（40% - 200%缩放比）
- 返回值：void；





## 事件监听(listener)

### loaded

- 方法说明：编辑器加载完成；
- 用法示例

~~~javascript
editor.listener.loaded = () => {
    // your code...
};
~~~

### graphResized

- 方法说明：元件重置大小；
- 回调参数说明：
  - **nodeID** string
  - **width ** number
  - **height **number
  - **x **number
  - **y **number
- 用法示例

~~~javascript
editor.listener.graphResized = (payload) => {
    // your code...
};
~~~

### destroyed

- 方法说明：编辑器销毁完成；
- 用法示例

~~~javascript
editor.listener.destroyed = () => {
    // your code...
};
~~~

### graphNumberChanged

- 方法说明：元件数量变化回调；
- 回调参数说明：
  - **number**目前编辑器上的元件数量
- 用法示例

~~~javascript
editor.listener.graphNumberChanged = (number) => {
    // your code...
};
~~~

### pageScale

- 方法说明：页面缩放；
- 回调参数说明：
  - **scale **缩放比 0.4 - 2之间
- 用法示例

~~~javascript
editor.listener.pageScale = (scale) => {
    // your code...
};
~~~





## 事件监听(eventBus)

### loaded

- 方法说明：编辑器加载完成；
- 用法示例

~~~javascript
editor.eventBus.on('loaded',()=>{
    // your code
})
~~~

### graphResized

- 方法说明：元件重置大小；
- 回调参数说明：
  - **nodeID **string
  - **width **number
  - **height **number
  - **x **number
  - **y **number
- 用法示例

~~~javascript
editor.eventBus.on('graphResized',(payload)=>{
    // your code...
});
~~~

### destroyed

- 方法说明：编辑器销毁完成；
- 用法示例

~~~javascript
editor.eventBus.on('destroyed',()=>{
    // your code...
});
~~~

### graphNumberChanged

- 方法说明：元件数量变化回调；
- 回调参数说明：
  - **number **目前编辑器上的元件数量
- 用法示例

~~~javascript
editor.eventBus.on('graphNumberChanged',(number)=>{
    // your code...
});
~~~

### pageScale

- 方法说明：页面缩放；
- 回调参数说明：
  - **scale **缩放比 0.4 - 2之间
- 用法示例

~~~javascript
editor.eventBus.on('pageScale',(scale)=>{
    // your code...
});
~~~



## 内部快捷键

- Ctrl + 左键 多选

- Ctrl + C 复制
- Ctrl + V 粘贴
- Ctrl + X 剪切
- Ctrl + A 全选
- backspace、delete 进行删除
- 上下左右 移动
- Ctrl + Z 撤销 undo
- Ctrl + Y 重做 redo
- Ctrl + P 打印
- Ctrl +  S 保存
- Ctrl + Shift + S 进行另存为
- Alt + Shift + F 快捷美化
- ...



## 自定义快捷键

~~~javascript
editor.register.shortcutList=[
    {
      key: KeyMap;
      ctrl?: boolean;
      meta?: boolean;
      mod?: boolean; // windows:ctrl || mac:command
      shift?: boolean;
      alt?: boolean;
      isGlobal?: boolean;
      callback?: (command: Command) => any;
      disable?: boolean;
    }
  ]
~~~



## 内部右键菜单

## 自定义右键菜单

## 全局API

## 插件的使用



