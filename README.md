# svg flow editor

## 项目简介

svg flow editor 是一款自研流程图编辑器，提供了一系列流程图交互、编辑所必需的功能，计划支持前端研发自定义开发各种逻辑编排场景，如流程图、ER 图、BPMN 流程等。项目使用typescript与svg、canvas等技术进行搭建，脱离vue、react等框架的限制，使得用户更快、更轻松融合到自己的项目中，意在工作审批配置、机器人逻辑编排、无代码平台流程配置都有较好的应用。

## 开源说明

    本项目采用 Apache 2.0 开源策略

## 功能点

- 流程图基本元件
  - 矩形 rect 、 圆形 circle 、 椭圆 ellipse
- 元件基本操作
  - 创建、删除、移动、定位、属性修改、框选、多选等
- 文本
- global API
- Command API
- 右键菜单（内部、自定义）
- 快捷键（内部、自定义）
- event Bus 、 listener 事件监听机制
- 背景网格、圆点、水印
- 辅助线

## 待开发 TODO

- 拓展元件类型
  - 多边形 polygon
  - 三角形 triangle
  - 菱形 diamond
  - 线段 line
  - HTML html
- 元件旋转
- redo undo 操作记录
- tool 一键美化、图片导出、层级处理（置于顶层、置于底层）、组合/取消组合、锁定/取消锁定
- 协同编辑

## 使用方式

    ```javascript

    // 引入
    import { SFEditor } from 'svg-flow-editor'

    // 创建 editor 编辑器，需要传递编辑器 container，支持 selector、dom
    const editor = new SFEditor(".flow-box");

    // 创建矩形 Rect
    const rect = editor.Rect(100, 70)

    // 设置位置
    rect.position(100, 100)

    // SFEditor 所有的类、方法均支持链式调用，上诉代码等价于
    new SFEditor(".flow-box").Rect(100, 70).position(100, 100)

    // 示例：执行更换主题API
    editor.command.executeSetTheme('colorful_theme1')

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
  
    ```

## 架构设计

![架构设计](https://img-blog.csdnimg.cn/direct/4d0d8ea5c29343c89eaf834ee4f3b4d4.png)

项目对外暴露流程图操作对象 SFEditor，身上有用户操作的对象属性及方法，例如： svg 构造器（Rect、Circle、Ellipse）、command api操作、event事件中心以及全局api，通过暴露操作对象，实现对内部的数据访问、对象操作等。在核心模块中，需要考虑用户的使用习惯，封装完整的工具类，实现流程图的基本操作、拓展功能。底层依赖了svg对项目元件库的基础元件进行创作，同时使用了canvas对背景网格、水印等进行绘制，使用html进行页面布局，并且提供了typescript的全类型支持。 在API设计的设计上，采取了Command CommandAdapt 两个类实现，Command中不进行用户方法的直接处理，增加adapt类进行方法中转，防止用户通过API直接操作核心类。Command调用 adapt 的实例方法，在adapt 中获取draw、svg 等核心类进行用户的响应。

## graph APIS

1. position - 返回的是当前实例，支持链式调用
2. setWidth - 返回的是当前实例，支持链式调用
3. setHeight - 返回的是当前实例，支持链式调用
4. setStroke - 返回的是当前实例，支持链式调用
5. setFill - 返回的是当前实例，支持链式调用
6. getID
7. getX
8. getY
9. getWidth
10. getHeight
11. getStroke
12. getFill

## Command APIS

1. executeBackground 设置背景
2. executeAddGraph 添加元件
3. getAllNodeInfo 获取所有的Node信息
4. executeDeleteGraph 删除元件
5. executeSetTheme 设置主题

## 事件监听(listener)

## 事件监听(eventBus)

## 内部快捷键

## 自定义快捷键

## 内部右键菜单

## 自定义右键菜单

## 全局API

## 插件的使用

## 项目 HTML 结构说明

## 坐标系说明

项目使用div做graph元件的外层盒子，因此，位置坐标

## ------------------ 快捷键

向外暴露 register 操作对象，将用户的快捷键统一封装到 SFEditor 上，在注册事件的时候，统一进行事件处理。

- Ctrl + 左键 进行多选
  - ctrl + C 复制
  - Ctrl + V 粘贴
  - ctrl + F 进行文本搜索
  - Ctrl + A 全选
  - backspace、delete 进行删除
  - 上下左右 进行移动
  - Ctrl + Z 进行撤销 undo
  - Ctrl + Y 进行重做 redo
  - Ctrl + P 进行打印
  - Ctrl + Shift + S 进行另存为
  - Alt + Shift + F 快捷美化
  - ...

## 折线

正交连线 采用 最短路径算法 A*算法+中点转折实现

## 文本

背景网格/水印 canvas实现绘制

平移缩放旋转 - 使用 svg transform 实现

框选 -全选/反选

快捷键

redo undo 使用线性表 +指针实现

一键美化

模板工具

自定义icon

文件导出 图片

协同！

层级处理（置于顶层、置于底层）- 基于 html zIndex 实现层级处理

组合/取消组合

锁定/取消锁定

布局/文本属性

## 功能模块分类

background 背景
    网格-已完成
    水印-已完成

graph 图形本身
    属性设置-位置 颜色 边框 文本 宽度 高度
    hover - 显示连接锚点
    click - 显示形变锚点
    折线-未完成
    文本-未完成
    平移-未完成
    缩放-未完成
    旋转-未完成
    graph 图形分类
        - 矩形 rect
        - 圆形  circle
        - 椭圆  ellipse
        - 多边形 polygon
        - 三角形 triangle
        - 菱形 diamond
        - 文本 text
        - HTML html

network 协同 支持光标、用户操作、聊天通信，因此，需要在api 中进行预留触发接口

graphData 支持双向绑定数据【nodes 节点数据 lines 线数据】

tools 工具（导出图片、一键美化、模板工具、icon、层级、锁定、布局方式组合）

apis 高度封装的 API 支持向外导出一个对象，从而获取整个项目的api操作

event 事件 （注册快捷键、图形的事件响应处理、框选 -全选/反选）

history 历史记录管理器（redo、undo、history）

文本输入实现
    双击时，显示 div contenteditable,使用 tspan 进行显示，注意换行处理

处理 hover 的思路：
    所有的元素都由下结构构成
    1. g class svg-flow-node 该节点包括 元素box 文本 + 锚点 要比正常的元组大一点才可以实现hover out
       1. svg-flow-node-content
       2. svg-flow-none-text
       3. svg-flow-node-anchor 是连接锚点
       4. svg-flow-node-anchor 是连接锚点
       5. svg-flow-node-anchor 是连接锚点
       6. svg-flow-node-anchor 是连接锚点

层级处理上，只需要删除原来的  重新渲染 在最后面，就能在最上层

<!-- 分组的实现思路 clone Node -->
## 基本使用

    核心对象在 core/index.ts 中，向外暴露了 SFEditor 对象：

    ```javascript
        export const SFEditor = {
          listener, // 事件监听
          eventBus, // event Bus
          command, // 动作指令
          register, // 事件注册器（右键菜单+快捷键）
          global, // 全局API
          SVG, // svg 元件构造器
        };

    ```

1. svg 元件基于svg，因此需要先创建 svg 对象
   const svg = SFEditor.SVG().addTo(".flow-box");
   addTo 将svg添加到指定选择器或dom 上

2. svg
    .Rect(100, 100)
    .position(100, 100)
    .setID("123")
    .attr({ fill: "red" })
    .click(() => {
      console.log("自定义事件");
    });

    Rect 创建 100*100 的矩形
    position 设置矩形的位置
    setID 设置矩形的ID属性
    attr 设置矩形的其他属性 fill 填充样式 stroke 描边
    click 设置事件

## 全局指令

SFEditor.command.executeWatermark();

## 事件

// 监听内部事件
SFEditor.listener.graphLoaded = () => {
  console.log("graphLoaded被执行");
};

// eventBus
SFEditor.eventBus.on("graphLoaded", () => {
  console.log(" editor.eventBus.on");
});

## 全局事件

// 全局api
SFEditor.global.reset();

## 自定义右键菜单

## 打包后 worker 的路径问题

## 插件化

  项目提供 元件库、顶部菜单、元件配置抽屉等插件，

## npm 包

升级补丁版本号(修改bug)：npm version patch  // 1.0.x

升级次版本号(新增功能)：npm version minor  // 1.x.0

升级主版本号(较大改版)：npm version major  // x.0.0

再执行npm publish
