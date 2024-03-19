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
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="moveup">
		<span>
			<i class="iconfont icon-shangyiyiceng"></i>
			上移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="movedown">
		<span>
			<i class="iconfont icon-xiayiyiceng"></i>
			下移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="movedown">
		<span>
			<i class="iconfont icon-zuhe"></i>
			组合
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="movedown">
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
