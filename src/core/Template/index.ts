export const contextmenu = `
<div class="svg-flow-contextmenu-svg">
	<!-- svg右键 -->
	<div class="svg-flow-contextmenu-item graph" command="copy">
		<span>
			<i class="iconfont icon-fuzhi"></i>
			复制
		</span>
		<span>Ctrl+C</span>
	</div>
	<div class="svg-flow-contextmenu-item svg" command="paste">
		<span>
			<i class="iconfont icon-niantie"></i>
			粘贴
		</span>
		<span>Ctrl+V</span>
	</div>
	<div class="svg-flow-contextmenu-item graph" command="cut">
		<span>
			<i class="iconfont icon-jianqie"></i>
			剪切
		</span>
		<span>Ctrl+X</span>
	</div>
	<div class="svg-flow-contextmenu-line svg"></div>
	<div class="svg-flow-contextmenu-item svg" command="undo">
		<span>
			<i class="iconfont icon-chexiao"></i>
			撤销
		</span>
		<span>Ctrl+Z</span>
	</div>
	<div class="svg-flow-contextmenu-item svg" command="redo">
		<span>
			<i class="iconfont icon-zhongzuo"></i>
			重做
		</span>
		<span>Ctrl+Y</span>
	</div>

	<!-- 图形右键 -->
	<div class="svg-flow-contextmenu-line graph"></div>
	<div class="svg-flow-contextmenu-item graph" command="top">
		<span>
			<i class="iconfont icon-zhiyudingceng"></i>
			置于顶层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="svg-flow-contextmenu-item graph" command="bottom">
		<span>
			<i class="iconfont icon-zhiyudiceng"></i>
			置于底层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="svg-flow-contextmenu-item graph" command="moveup">
		<span>
			<i class="iconfont icon-shangyiyiceng"></i>
			上移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="svg-flow-contextmenu-item graph" command="movedown">
		<span>
			<i class="iconfont icon-xiayiyiceng"></i>
			下移一层
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="svg-flow-contextmenu-line graph"></div>
	<div class="svg-flow-contextmenu-item graph" command="movedown">
		<span>
			<i class="iconfont icon-zuhe"></i>
			组合
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="svg-flow-contextmenu-item graph" command="movedown">
		<span>
			<i class="iconfont icon-quxiaozuhe"></i>
			取消组合
		</span>
		<span>Ctrl+A</span>
	</div>
</div>
`;
