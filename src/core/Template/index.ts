export const contextmenuTemp = `
<div class="sf-editor-box-contextmenu-main">
	<!-- svg右键 -->
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="copy">
		<span>
			<i class="iconfont icon-fuzhi"></i>
			复制
		</span>
		<span>Ctrl+C</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="paste">
		<span>
			<i class="iconfont icon-niantie"></i>
			粘贴
		</span>
		<span>Ctrl+V</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="cut">
		<span>
			<i class="iconfont icon-jianqie"></i>
			剪切
		</span>
		<span>Ctrl+X</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-line editor-item"></div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="undo">
		<span>
			<i class="iconfont icon-chexiao"></i>
			撤销
		</span>
		<span>Ctrl+Z</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="redo">
		<span>
			<i class="iconfont icon-zhongzuo"></i>
			重做
		</span>
		<span>Ctrl+Y</span>
	</div>

	<!-- 图形右键 -->
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="top">
		<span>
			<i class="iconfont icon-zhiyudingceng"></i>
			置于顶层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="bottom">
		<span>
			<i class="iconfont icon-zhiyudiceng"></i>
			置于底层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="holdup">
		<span>
			<i class="iconfont icon-shangyiyiceng"></i>
			上移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="putdown">
		<span>
			<i class="iconfont icon-xiayiyiceng"></i>
			下移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="group">
		<span>
			<i class="iconfont icon-zuhe"></i>
			组合
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="ungroup">
		<span>
			<i class="iconfont icon-quxiaozuhe"></i>
			取消组合
		</span>
		<span>Ctrl+A</span>
	</div>
</div>
`;

export const footerTemp = `
<div class="sf-editor-footer-left">
	<!-- 多页 -->
	<i class="iconfont icon-duoye_nor" title="列表" command="list"></i>
	<!-- 当前画布名称 -->
	<span>画布1</span>
	<!-- 分割线 -->
	<div class="line"></div>
	<!-- 加页 -->
	<i class="iconfont icon-jiahao" title="新建画布" command="newpages"></i>
</div>
<div class="sf-editor-footer-right">
	<span>图形: <span  command="nums"></span></span>

	<div class="line"></div>

	<!-- 加减视口大小 -->
	<i class="iconfont icon-jianhao" title="缩小" command="reduce"></i>
	<span class="pageScale" title="重置视口" command="resize">100%</span>
	<i class="iconfont icon-jiahao" title="放大" command="amplify"></i>

	<div class="line"></div>

	<!-- 模板 -->
	<i class="iconfont icon-moban" title="模板" command="template"></i>

	<!-- 全屏 -->
	<i class="iconfont icon-quanping" title="全屏" command="fullscreen"></i>

	<!-- 退出全屏 -->
	<i class="iconfont icon-suoxiao" style="display:none" title="退出全屏" command="exitfullscreen"></i>

	<!-- 帮助 -->
	<i class="iconfont icon-bangzhu" title="帮助" command="help"></i>
</div>
`;

export const operationTemp = `
<div class="sf-editor-operation-top">
	<div class="left">
		<img src="/public/favor.svg" alt="" />
		<span>文件</span>
		<span>编辑</span>
		<span>选择</span>
		<span>视图</span>
		<span>插入</span>
		<span>画布</span>
		<span>排列</span>
	</div>
	<div class="right">
		<div class="right-shear">分享协作</div>
		<i class="iconfont icon-xiazai"></i>
		<img src="/public/user.png" alt="" />
	</div>
</div>
<div class="sf-editor-operation-bottom">
	<!-- 撤销 -->
	<i class="iconfont icon-chexiao"></i>
	<!-- 重做 -->
	<i class="iconfont icon-zhongzuo"></i>
	<!-- 美化 -->
	<i class="iconfont icon-huabumeihua"></i>
	<div class="line"></div>
	<!-- 背景颜色 -->
	<i class="iconfont icon-ibg"></i>
	<!-- 插入图片 -->
	<i class="iconfont icon-tupian"></i>
	<div class="line"></div>
	<!-- 加粗 -->
	<i class="iconfont icon-jiacu"></i>
	<!-- 斜体 -->
	<i class="iconfont icon-xieti"></i>
	<!-- 下划线 -->
	<i class="iconfont icon-xiahuaxian"></i>
	<!-- 字体颜色 -->
	<i class="iconfont icon-zitiyanse"></i>
	<!-- 填充 -->
	<i class="iconfont icon-beijingyanse"></i>
	<div class="line"></div>
	<!-- 连线宽度 -->
	<i class="iconfont icon-xiantiaokuandu"></i>
	<!-- 连线样式 -->
	<i class="iconfont icon-xiantiaoyangshi"></i>
	<!-- 图层 -->
	<i class="iconfont icon-zhiyudingceng"></i>
</div>
`;

export const catalogTemp = `
<!-- 基础图形 -->
<h3 class="sf-editor-catalog-title" command="base">
	<div class="icon close"></div>
	基础图形
</h3>
<div class="sf-editor-catalog-item" adapt="base">base</div>
<div class="line"></div>

<!-- Flowchart 流程图 -->
<h3 class="sf-editor-catalog-title" command="Flowchart">
	<div class="icon close"></div>
	Flowchart 流程图
</h3>
<div class="sf-editor-catalog-item" adapt="Flowchart">Flowchart</div>
<div class="line"></div>

<!-- 泳池/泳道 -->
<h3 class="sf-editor-catalog-title" command="pool">
	<div class="icon close"></div>
	泳池/泳道
</h3>
<div class="sf-editor-catalog-item" adapt="pool">pool</div>
<div class="line"></div>

<!-- 统计图 -->
<h3 class="sf-editor-catalog-title" command="chart">
	<div class="icon close"></div>
	统计图
</h3>
<div class="sf-editor-catalog-item" adapt="chart">chart</div>
<div class="line"></div>

<!-- 提示 -->
<div class="more">更多图形</div>
`;
