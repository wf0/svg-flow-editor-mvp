import { userBase } from "../Base64/index.ts";

// 右键菜单模板
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
			<i class="iconfont icon-shangyibu"></i>
			撤销
		</span>
		<span>Ctrl+Z</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item editor-item" command="redo">
		<span>
			<i class="iconfont icon-xiayibu"></i>
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
	<div class="sf-editor-box-contextmenu-main-line graph-item"></div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="lock">
		<span>
			<i class="iconfont icon-suo"></i>
			锁定
		</span>
		<span>Ctrl+A</span>
	</div>
	<div class="sf-editor-box-contextmenu-main-item graph-item" command="unlock">
		<span>
			<i class="iconfont icon-jiesuo"></i>
			取消锁定
		</span>
		<span>Ctrl+A</span>
	</div>
</div>
`;

// 底部显示模板
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
	<span>图形: <span  command="nums">0</span></span>

	<div class="line"></div>

	<!-- 加减视口大小 -->
	<i class="iconfont icon-jianhao" title="缩小" command="reduce"></i>
	<span class="pageScale" title="重置视口" command="resize">100%</span>
	<i class="iconfont icon-jiahao" title="放大" command="amplify"></i>

	<div class="line"></div>

	<!-- 模板 -->
	<i class="iconfont icon-moban" title="模板" command="template"></i>

	<!-- 全屏 -->
	<i class="iconfont icon-quanping1" title="全屏" command="fullscreen"></i>

	<!-- 退出全屏 -->
	<i class="iconfont icon-huanyuanhuabu" style="display:none" title="退出全屏" command="exitfullscreen"></i>

	<!-- 帮助 -->
	<i class="iconfont icon-bangzhu" style="cursor:help" title="帮助" command="help"></i>
</div>
`;

// 顶部操作区模板
export const operationTemp = `
<div class="sf-editor-operation-top">
	<div class="left">
		<svg
			 t="1710474190025"
			 class="icon"
			 viewBox="0 0 1024 1024"
			 version="1.1"
			 xmlns="http://www.w3.org/2000/svg"
			 p-id="1436"
			 xmlns:xlink="http://www.w3.org/1999/xlink"
			 width="200"
			 height="200">
			<path
				  d="M824.4224 399.872A158.208 158.208 0 1 1 983.04 241.7664a158.3104 158.3104 0 0 1-158.6176 158.1056z m0-234.3936A76.288 76.288 0 1 0 901.12 241.7664a76.288 76.288 0 0 0-76.6976-76.288z"
				  fill="#3080E9"
				  p-id="1437"></path>
			<path
				  d="M629.248 823.1936h-306.176v-81.92h306.176a94.208 94.208 0 1 0 0-188.3136H372.1216a176.128 176.128 0 0 1 0-352.1536h316.5184v81.92H372.1216a94.208 94.208 0 0 0 0 188.3136h257.1264a176.128 176.128 0 1 1 0 352.1536z"
				  fill="#3080E9"
				  p-id="1438"></path>
			<path
				  d="M199.0656 940.3392a158.1056 158.1056 0 1 1 158.208-158.1056 158.3104 158.3104 0 0 1-158.208 158.1056z m0-234.2912a76.1856 76.1856 0 1 0 76.288 76.1856A76.288 76.288 0 0 0 199.0656 706.56z"
				  fill="#3080E9"
				  p-id="1439"></path>
		</svg>
		<span index="0">
			文件
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="newfile">
					<span>
						<i class="iconfont icon-jiahao"></i>新建
					</span>
				</div>
				<div class="sf-left-box-item" command="rename">
					<span>
						<i class="iconfont icon-bianji"></i>重命名
					</span>
				</div>
				<div class="sf-left-box-item" command="preview">
					<span>
						<i class="iconfont icon-preview"></i>预览
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="save">
					<span>
						<i class="iconfont icon-baocun2"></i>保存
					</span>
					<span class="shortcut">Ctrl + S</span>
				</div>
				<div class="sf-left-box-item" command="saveas">
					<span>
						<i class="iconfont icon-lingcun"></i>另存为
					</span>
					<span class="shortcut">Ctrl + Shift + S</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="share">
					<span>
						<i class="iconfont icon-fenxiang"></i>分享协作
					</span>
				</div>
				<div class="sf-left-box-item" command="release">
					<span>
						<i class="iconfont icon-fabu1"></i>发布
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="history">
					<span>
						<i class="iconfont icon-lishijilu"></i>历史记录
					</span>
				</div>
				<div class="sf-left-box-item" command="print">
					<span>
						<i class="iconfont icon-dayinji_o"></i>打印
					</span>
					<span>Ctrl + P</span>
				</div>
				<div class="sf-left-box-item" command="close">
					<span style="padding-left: 25px"> 关闭 </span>
				</div>
			</div>
		</span>
		<span index="1">
			编辑
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="revoke">
					<span>
						<i class="iconfont icon-shangyibu"></i>撤销
					</span>
					<span>Ctrl + Z</span>
				</div>
				<div class="sf-left-box-item" command="restore">
					<span>
						<i class="iconfont icon-xiayibu"></i>恢复
					</span>
					<span>Ctrl + Y</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="copy">
					<span>
						<i class="iconfont icon-fuzhi1"></i>复制
					</span>
					<span>Ctrl + C</span>
				</div>
				<div class="sf-left-box-item" command="paste">
					<span>
						<i class="iconfont icon-niantie1"></i>粘贴
					</span>
					<span>Ctrl + V</span>
				</div>
				<div class="sf-left-box-item" command="cut">
					<span>
						<i class="iconfont icon-jianqie"></i>剪切
					</span>
					<span>Ctrl + X</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="beautify">
					<span>
						<i class="iconfont icon-huabumeihua"></i>一键美化
					</span>
					<span>Ctrl + Shift + F</span>
				</div>
				<div class="sf-left-box-item" command="delete">
					<span>
						<i class="iconfont icon-shanchu"></i>删除
					</span>
					<span>Delete/BackSpace</span>
				</div>
			</div>
		</span>
		<span index="3">
			视图
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="add">
					<span>
						<i class="iconfont icon-jiahao"></i>放大
					</span>
					<span>Alt + (+)</span>
				</div>
				<div class="sf-left-box-item" command="minus">
					<span>
						<i class="iconfont icon-jianhao"></i>缩小
					</span>
					<span>Alt + ( - )</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="50">
					<span style="padding-left: 25px"> 50% </span>
				</div>
				<div class="sf-left-box-item" command="75">
					<span style="padding-left: 25px"> 75% </span>
				</div>
				<div class="sf-left-box-item" command="100">
					<span style="padding-left: 25px"> 100% </span>
				</div>
				<div class="sf-left-box-item" command="150">
					<span style="padding-left: 25px"> 150% </span>
				</div>
				<div class="sf-left-box-item" command="200">
					<span style="padding-left: 25px"> 200% </span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="resize">
					<span style="padding-left: 25px"> 重置缩放 </span>
				</div>
			</div>
		</span>
		<span index="4">
			插入
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="xxx">
					<span>
						<i class="iconfont icon-kaifazhong"></i>开发中
					</span>
				</div>
			</div>
		</span>
		<span index="5">
			画布
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="canvas">
					<span style="padding-left: 25px"> 画布设置 </span>
					<span>
						<i class="iconfont icon-you"></i>
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="grid">
					<span style="padding-left:24px"> 
						<i class="iconfont "></i>
						显示网格 
					</span>
				</div>
				<div class="sf-left-box-item" command="origin">
					<span style="padding-left:24px"> 
						<i class="iconfont "></i>
						显示圆点 
					</span>
				</div>
				<div class="sf-left-box-item" command="water">
					<span style="padding-left:24px"> 
						<i class="iconfont "></i>
						显示水印 
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="theme">
					<span style="padding-left: 25px"> 主题切换 </span>
					<span>
						<i class="iconfont icon-you"></i>
					</span>
				</div>
			</div>
		</span>
		<span index="6">
			排列
			<div class="sf-left-box">
				<div class="sf-left-box-item" command="top">
					<span>
						<i class="iconfont icon-zhiyudingceng"></i>置于顶层
					</span>
				</div>
				<div class="sf-left-box-item" command="bottom">
					<span>
						<i class="iconfont icon-zhiyudiceng"></i>置于底层
					</span>
				</div>
				<div class="sf-left-box-item" command="holdup">
					<span>
						<i class="iconfont icon-shangyiyiceng"></i>上移一层
					</span>
				</div>
				<div class="sf-left-box-item" command="putdown">
					<span>
						<i class="iconfont icon-xiayiyiceng"></i>下移一层
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="group">
					<span>
						<i class="iconfont icon-zuhe"></i>组合
					</span>
				</div>
				<div class="sf-left-box-item" command="ungroup">
					<span>
						<i class="iconfont icon-quxiaozuhe"></i>取消组合
					</span>
				</div>
				<div class="line"></div>
				<div class="sf-left-box-item" command="lock">
					<span>
						<i class="iconfont icon-suo"></i>锁定
					</span>
				</div>
				<div class="sf-left-box-item" command="unlock">
					<span>
						<i class="iconfont icon-jiesuo"></i>解锁
					</span>
				</div>
			</div>
		</span>
	</div>
	<div class="right">
		<div class="right-shear" command="share">分享协作</div>
		<i class="iconfont icon-xiazai" command="download"></i>
		<img src="${userBase}" alt="" />
	</div>
</div>
<div class="sf-editor-operation-bottom">
	<!-- 撤销 -->
	<i class="iconfont icon-shangyibu" command="revoke"></i>
	<!-- 重做 -->
	<i class="iconfont icon-xiayibu" command="restore"></i>
	<!-- 美化 -->
	<i class="iconfont icon-huabumeihua" command="beautify"></i>
	<div class="line"></div>
	<!-- 背景颜色 -->
	<i
	   class="iconfont icon-ibg"
	   command="backgroundcolor"
	   style="color: var(--background);border: solid #ccc 1px;padding: 1px"></i>
	<!-- 插入图片 -->
	<i class="iconfont icon-tupian" command="upload"></i>
	<div class="line"></div>
	<!-- 加粗 -->
	<i class="iconfont icon-jiacu" command="bold"></i>
	<!-- 斜体 -->
	<i class="iconfont icon-xieti" command="italic"></i>
	<!-- 下划线 -->
	<i class="iconfont icon-xiahuaxian" command="underline"></i>
	<!-- 字体颜色 -->
	<i class="iconfont icon-zitiyanse" command="color"></i>
	<!-- 填充 -->
	<i class="iconfont icon-beijingyanse" command="fill"></i>
	<div class="line"></div>
	<!-- 连线宽度 -->
	<i class="iconfont icon-xiantiaokuandu" command="strokeWidth"></i>
	<!-- 连线样式 -->
	<i class="iconfont icon-xiantiaoyangshi" command="dashed"></i>
</div>
`;

// 左侧元件库模板
export const catalogTemp = `
<!-- 我的图形 -->
<h3
	class="sf-editor-catalog-title"
	command="upload"
	style="margin-top: 10px">
	<div class="icon close"></div>
	我的图形
</h3>
<div class="sf-editor-catalog-item" adapt="upload">
	<div class="upload" type="upload">
		<i class="iconfont icon-jiahao"></i>
	</div>
</div>
<div class="line"></div>
<!-- 基础图形 -->
<h3
	class="sf-editor-catalog-title"
	command="base"
	style="margin-top: 10px">
	<div class="icon"></div>
	基础图形
</h3>
<div class="sf-editor-catalog-item" style="display:flex" adapt="base">
	<div draggable="true" class="graph" type="logo" title="logo">
		<i class="iconfont icon-icon__liuchengtu logo"></i>
	</div>
	<div draggable="true" class="graph" type="position" title="标记">
		<i class="iconfont icon-ditu-dibiao logo"></i>
	</div>
	<div draggable="true" class="graph" type="text" title="文本">
		<i class="iconfont icon-xingzhuang-wenzi"></i>
	</div>
	<div draggable="true" class="graph" type="rect" title="矩形">
		<i class="iconfont icon-xingzhuang-juxing"></i>
	</div>	
	<div draggable="true" class="graph" type="curve" title="曲线">
		<i class="iconfont icon-quxian"></i>
	</div>
	<div draggable="true" class="graph" type="circle" title="圆形">
		<i class="iconfont icon-xingzhuang-tuoyuanxing"></i>
	</div>
	<div draggable="true" class="graph" type="ellipse" title="椭圆">
		<i class="iconfont icon-tuoyuanxing"></i>
	</div>
	<div draggable="true" class="graph" type="triangle" title="三角形">
		<i class="iconfont icon-xingzhuang-sanjiaoxing"></i>
	</div>
	<div draggable="true" class="graph" type="star" title="五角星">
		<i class="iconfont icon-xingzhuang-xingxing"></i>
	</div>
	<div draggable="true" class="graph" type="arrow" title='箭头'>
		<i class="iconfont icon-xingzhuang-jianxing"></i>
	</div>
	<div draggable="true" class="graph" type="line" title="直线">
		<i class="iconfont icon-xian"></i>
	</div>
	<div draggable="true" class="graph" type="table" title="表格">
		<i class="iconfont icon-biaodanzujian-biaoge"></i>
	</div>
	<div draggable="true" class="graph" type="tab" title="便签">
		<i class="iconfont icon-bianqian"></i>
	</div>
</div>
<div class="line"></div>

<!-- Flowchart 流程图 -->
<h3 class="sf-editor-catalog-title" command="Flowchart">
	<div class="icon close"></div>
	Flowchart 流程图
</h3>
<div class="sf-editor-catalog-item" adapt="Flowchart">
	<div draggable="true" class="graph" type="xxx" title="开发中">
		<i class="iconfont icon-kaifazhong"> </i>
	</div>
</div>
<div class="line"></div>

<!-- 泳池/泳道 -->
<h3 class="sf-editor-catalog-title" command="pool">
	<div class="icon close"></div>
	泳池/泳道
</h3>
<div class="sf-editor-catalog-item" adapt="pool">
	<div draggable="true" class="graph" type="xxx" title="开发中">
		<i class="iconfont icon-kaifazhong"> </i>
	</div>
</div>
<div class="line"></div>

<!-- 统计图 -->
<h3 class="sf-editor-catalog-title" command="chart">
	<div class="icon close"></div>
	统计图
</h3>
<div class="sf-editor-catalog-item" adapt="chart">
	<div draggable="true" class="graph" type="line" title="折线图">
		<i class="iconfont icon-tubiao-zhexiantu"></i>
	</div>
	<div draggable="true" class="graph" type="bar" title="柱状图">
		<i class="iconfont icon-tubiao-zhuzhuangtu"></i>
	</div>
	<div draggable="true" class="graph" type="radar" title="雷达图">
		<i class="iconfont icon-gongyezujian-yibiaopan"></i>
	</div>
	<div draggable="true" class="graph" type="pie" title="饼图">
		<i class="iconfont icon-tubiao-bingtu"></i>
	</div>
</div>
<div class="line"></div>

<!-- 提示 -->
<div class="more">更多图形</div>
`;

// 元素单击dialog更新元件信息
export const graphInfoTemp = `
<div class="sf-editor-graphBox">
	<div class="sf-editor-graphBox-item">
		<span>描边</span>
		<div>
			<span style="background-color:#e03131" command="stroke-e03131"></span>
			<span style="background-color:#2f9e44" command="stroke-2f9e44"></span>
			<span style="background-color:#1971c2" command="stroke-1971c2"></span>
			<span style="background-color:#f08c00" command="stroke-f08c00"></span>
			<span style="background-color:#A5D8FF" command="stroke-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="stroke-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="stroke-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="color" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>填充</span>
		<div>
			<span class="transparent" title="透明色" command='transparent'></span>
			<span style="background-color:#e03131" command='fill-e03131'></span>
			<span style="background-color:#1971c2" command='fill-1971c2'></span>
			<span style="background-color:#f08c00" command='fill-f08c00'></span>
			<span style="background-color:#A5D8FF" command='fill-A5D8FF'></span>
			<span style="background-color:#D0BFFF" command='fill-D0BFFF'></span>
			<span style="background-color:#FCC2D7" command='fill-FCC2D7'></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="background" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>线宽</span>
		<div>
			<span command="strokeWidth-1">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4.167 10h11.666" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</span>
			<span command="strokeWidth-4">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 10h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</span>
			<span command="strokeWidth-7">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 10h10" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</span>
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>圆角类型</span>
		<div>
			<span class="borderRadius-one borderRadius" command="radius-1"></span>
			<span class="borderRadius-two borderRadius" command="radius-14"></span>
			<span class="borderRadius-three borderRadius" command="radius-20"></span>
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>边框样式</span>
		<div>
			<span command="style-solid">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4.167 10h11.666" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</span>
			<span command="style-5,5">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<g stroke-width="2">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M5 12h2"></path>
						<path d="M17 12h2"></path>
						<path d="M11 12h2"></path>
					</g>
				</svg>
			</span>
			<span command="style-2,2">
				<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
					<g stroke-width="2">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M4 12v.01"></path>
						<path d="M8 12v.01"></path>
						<path d="M12 12v.01"></path>
						<path d="M16 12v.01"></path>
						<path d="M20 12v.01"></path>
					</g>
				</svg>
			</span>
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>图层</span>
		<div>
			<span class="icon" command="layer-top"><i class="iconfont icon-zhiyudingceng"></i></span>
			<span class="icon" command="layer-bottom"><i class="iconfont icon-zhiyudiceng"></i></span>
			<span class="icon" command="layer-holdup"><i class="iconfont icon-shangyiyiceng"></i></span>
			<span class="icon" command="layer-putdown"><i class="iconfont icon-xiayiyiceng"></i></span>
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>操作</span>
		<div>
			<span class="icon"><i class="iconfont icon-fuzhi"></i></span>
			<span class="icon"><i class="iconfont icon-shanchu"></i></span>
			<span class="icon"><i class="iconfont icon-suo"></i></span>
			<span class="icon"><i class="iconfont icon-jiesuo"></i></span>
		</div>
	</div>
</div>
`;

// 画布设置
export const canvasSettingTemp = `
<div class="sf-editor-graphBox">
	<div class="sf-editor-graphBox-item">
		<span>背景颜色</span>
		<div>
			<span style="background-color:#e03131" command="bgcolor-e03131"></span>
			<span style="background-color:#2f9e44" command="bgcolor-2f9e44"></span>
			<span style="background-color:#1971c2" command="bgcolor-1971c2"></span>
			<span style="background-color:#f08c00" command="bgcolor-f08c00"></span>
			<span style="background-color:#A5D8FF" command="bgcolor-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="bgcolor-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="bgcolor-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="bgcolor" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item background">
		<span>常用尺寸</span>
		<div>
			<span command="size-A3">A3 尺寸 (1500px*2100px)</span>
			<span command="size-A4">A4 尺寸 (1050px*1500px)</span>
			<span command="size-A5">A5 尺寸 (750px*1050px)</span>
		</div>
	</div>
	<div class="sf-editor-graphBox-item background">
		<span>自定义尺寸</span>
		<div class="custom">
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>网格颜色</span>
		<div>
			<span style="background-color:#e03131" command="gridcolor-e03131"></span>
			<span style="background-color:#2f9e44" command="gridcolor-2f9e44"></span>
			<span style="background-color:#1971c2" command="gridcolor-1971c2"></span>
			<span style="background-color:#f08c00" command="gridcolor-f08c00"></span>
			<span style="background-color:#A5D8FF" command="gridcolor-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="gridcolor-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="gridcolor-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="gridcolor" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>圆点颜色</span>
		<div>
			<span style="background-color:#e03131" command="origincolor-e03131"></span>
			<span style="background-color:#2f9e44" command="origincolor-2f9e44"></span>
			<span style="background-color:#1971c2" command="origincolor-1971c2"></span>
			<span style="background-color:#f08c00" command="origincolor-f08c00"></span>
			<span style="background-color:#A5D8FF" command="origincolor-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="origincolor-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="origincolor-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="origincolor" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>水印颜色</span>
		<div>
			<span style="background-color:#e03131" command="watercolor-e03131"></span>
			<span style="background-color:#2f9e44" command="watercolor-2f9e44"></span>
			<span style="background-color:#1971c2" command="watercolor-1971c2"></span>
			<span style="background-color:#f08c00" command="watercolor-f08c00"></span>
			<span style="background-color:#A5D8FF" command="watercolor-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="watercolor-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="watercolor-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="watercolor" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>自定义水印文本</span>
		<div>
			<input />
		</div>
	</div>
</div
`;

// 主题切换
export const themeTemp = `
<div class="sf-editor-graphBox">
	<div class="sf-editor-graphBox-item">
		<span>主题切换</span>
		<div>
			<span style="background-color:#e03131" command="stroke-e03131"></span>
			<span style="background-color:#2f9e44" command="stroke-2f9e44"></span>
			<span style="background-color:#1971c2" command="stroke-1971c2"></span>
			<span style="background-color:#f08c00" command="stroke-f08c00"></span>
			<span style="background-color:#A5D8FF" command="stroke-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="stroke-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="stroke-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="color" />
		</div>
	</div>
	<div class="sf-editor-graphBox-item">
		<span>自定义主题</span>
		<div>
			<span style="background-color:#e03131" command="stroke-e03131"></span>
			<span style="background-color:#2f9e44" command="stroke-2f9e44"></span>
			<span style="background-color:#1971c2" command="stroke-1971c2"></span>
			<span style="background-color:#f08c00" command="stroke-f08c00"></span>
			<span style="background-color:#A5D8FF" command="stroke-A5D8FF"></span>
			<span style="background-color:#D0BFFF" command="stroke-D0BFFF"></span>
			<span style="background-color:#FCC2D7" command="stroke-FCC2D7"></span>
			<span class="line"></span>
			<input type="color" value="#E01515" id="color" />
		</div>
	</div>
</div
`;

// 搜索替换
export const searchReplaceTemp = `
<div class="sf-editor-search-top">
	<div>
		<input id="search" placeholder="Search" autocomplete="off" />
		<span id="num"></span>
	</div>
	<i class="iconfont icon-xiangzuo" title="上一处"></i>
	<i class="iconfont icon-xiangyou" title="下一处"></i>
	<i class="iconfont icon-xgb" title="关闭"></i>
</div>
<div class="sf-editor-search-bottom">
	<input id="search" placeholder="Replace" autocomplete="off" id="replace" />
	<i class="iconfont icon-tihuan" title="替换"></i>
	<i class="iconfont icon-quanbutihuan" title="全部替换"></i>
</div>
`;
