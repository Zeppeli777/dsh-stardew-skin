// dsh-theme-stardew-valley 浏览器端 bundle 模板（构建脚本填入 base64 素材后输出 lib/client.js）
// 模块格式：dsh-client-modules 的惰性 CJS factory（window.__ModuleLoader__.load）
window.__ModuleLoader__.load({
	id: "dsh-theme-stardew-valley",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		//#region 星露谷调色板（alias 层覆盖；light/dark 同值——这套皮肤无视系统明暗）
		var PALETTE = {
			// 表面
			"--dsw-alias-bg-base": "transparent",
			"--dsw-alias-bg-layer-1": "#eec788",
			"--dsw-alias-bg-layer-2": "#fbe4b0",
			"--dsw-alias-bg-layer-3": "#d9a75f",
			"--dsw-alias-bg-overlay": "#fbe4b0",
			"--dsw-alias-bg-mask-1": "rgba(74, 36, 8, 0.45)",
			"--dsw-alias-bg-mask-2": "rgba(74, 36, 8, 0.55)",
			"--dsw-alias-bg-mask-3": "rgba(74, 36, 8, 0.65)",
			"--dsw-alias-bg-mask-drop": "rgba(74, 36, 8, 0.55)",
			"--dsw-alias-bg-mask-photo": "rgba(74, 36, 8, 0.65)",
			"--dsw-alias-bg-skeleton": "#d9b072",
			"--dsw-alias-bg-module-platform": "#eec788",
			"--dsw-alias-bg-multi-select": "#e8c06a",
			// 描边
			"--dsw-alias-border-l1": "#8a4b1f",
			"--dsw-alias-border-l2": "#4a2408",
			"--dsw-alias-border-l2-darkmode-thin": "#4a2408",
			"--dsw-alias-border-l3": "#b56a2c",
			"--dsw-alias-border-l4": "#4a2408",
			"--dsw-alias-border-inverted": "#fbe4b0",
			"--dsw-alias-border-inverted2": "#eec788",
			// 品牌与按钮
			"--dsw-alias-brand-primary": "#2a6b2d",
			"--dsw-alias-brand-primary-invert": "#fbe4b0",
			"--dsw-alias-brand-primary-new-colorprimary-new-color": "#2a6b2d",
			"--dsw-alias-brand-text": "#1f4d23",
			"--dsw-alias-button-primary-fill": "#8a4b1f",
			"--dsw-alias-button-primary-hover": "#d98f4a",
			"--dsw-alias-button-primary-dimmed": "#d9b072",
			"--dsw-alias-button-contrast-fill": "#fbe4b0",
			"--dsw-alias-button-elevated-fill": "#eec788",
			"--dsw-alias-button-floating-fill": "#eec788",
			"--dsw-alias-button-floating-hover": "#d9a75f",
			"--dsw-alias-button-ghost-active-fill": "#d9a75f",
			"--dsw-alias-button-ghost-active-border": "#8a4b1f",
			"--dsw-alias-button-ghost-active-hover": "#e8c06a",
			"--dsw-alias-button-info-fill": "#1f4e78",
			"--dsw-alias-button-info-hover": "#245a8a",
			"--dsw-alias-button-tool-bar-fill": "#eec788",
			"--dsw-alias-button-tool-bar-hover": "#d9a75f",
			"--dsw-alias-button-tool-bar-fill-invisible": "transparent",
			// 交互底色
			"--dsw-alias-interactive-bg-hover": "#e8c06a",
			"--dsw-alias-interactive-bg-active": "#d9a75f",
			"--dsw-alias-interactive-bg-hover-accent": "#cfe3b8",
			"--dsw-alias-interactive-bg-hover-danger": "#e8a08a",
			"--dsw-alias-interactive-bg-hover-solid": "#d9a75f",
			// 文字（加深辅助文字；小字在奶油纸面与木质侧栏上均保持至少 4.5:1）
			"--dsw-alias-label-primary": "#33200a",
			"--dsw-alias-label-primary-dimmed": "#57371a",
			"--dsw-alias-label-primary-foreground": "#fff3d8",
			"--dsw-alias-label-primary-inverted": "#fbe4b0",
			"--dsw-alias-label-primary-bluish": "#1f4e78",
			"--dsw-alias-label-secondary": "#5a3516",
			"--dsw-alias-label-tertiary": "#603916",
			"--dsw-alias-label-caption": "#603916",
			"--dsw-alias-label-dimmed": "#603916",
			// Markdown
			"--dsw-alias-markdown-code-block": "#2a1a0e",
			"--dsw-alias-markdown-code-block-banner": "#4a3016",
			"--dsw-alias-markdown-inline-code": "#e3b878",
			"--dsw-alias-markdown-citation": "#1f4e78",
			"--dsw-alias-markdown-tag": "#e8c06a",
			"--dsw-alias-markdown-placeholder": "#a07a4a",
			"--dsw-alias-markdown-code-segment-selected": "#3d8c40",
			"--dsw-alias-markdown-code-segment-unselected": "#a07a4a",
			// 滚动条
			"--dsw-alias-scrollbar-bg-l1": "#8a4b1f",
			"--dsw-alias-scrollbar-hover-l1": "#b56a2c",
			"--dsw-alias-scrollbar-bg-l2": "#8a4b1f",
			"--dsw-alias-scrollbar-hover-l2": "#b56a2c",
			// 状态
			"--dsw-alias-state-error-primary": "#a8331c",
			"--dsw-alias-state-error-secondary": "#d45a3a",
			"--dsw-alias-state-success-primary": "#3d8c40",
			"--dsw-alias-state-success-secondary": "#6bb36e",
			"--dsw-alias-state-success-tertiary": "#dcebc8",
			"--dsw-alias-state-warn-primary": "#c77a1a",
			"--dsw-alias-state-warn-label": "#8a4b1f",
			"--dsw-alias-state-warn-secondary": "#d9a75f",
			"--dsw-alias-state-warn-tertiary": "#f3dfb0",
			"--dsw-alias-state-business-primary": "#1f4e78",
			"--dsw-alias-state-business-tertiary": "#cfe0f0",
			// 浮层
			"--dsw-alias-toast-bg": "#fbe4b0",
			"--dsw-alias-tooltip-bg": "#4a2408",
			// 部件级
			"--dsw-specific-sidebar-fill": "#d9a75f",
			"--dsw-specific-sidebar-nav-item-hover": "#e8c06a",
			"--dsw-specific-sidebar-nav-item-active": "#d9a75f",
			"--dsw-specific-sidebar-nav-item-active-accent": "#3d8c40",
			"--dsw-specific-bubble": "#fbe4b0",
			"--dsw-specific-bubble-highlight": "#e8c06a",
			"--dsw-specific-input-major": "#fbe4b0",
			"--dsw-specific-login-input": "#fbe4b0",
			"--dsw-specific-menu": "#fbe4b0",
			"--dsw-specific-selector": "#eec788",
			"--dsw-specific-tip": "#fbe4b0",
			// 形状：像素风小圆角
			"--dsw-corner-shape": "2px"
		};
		var TOKENS = {};
		for (var k in PALETTE) TOKENS[k] = { light: PALETTE[k], dark: PALETTE[k] };
		//#endregion

		//#region 注入样式：像素字体 + 山谷壁纸 + 选区色
		var CSS = `
@font-face {
  font-family: 'FusionPixel';
  src: url(data:font/woff2;base64,__FONT_B64__) format('woff2');
  font-display: swap;
}
body {
  background: #6db3f2 !important;
}
/* 壁纸移到伪元素上：轻微模糊 + 降饱和 + 提亮，让山谷退成「远景」不与文字抢对比 */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  background: url(data:image/jpeg;base64,__WALLPAPER_B64__) center / cover no-repeat;
  filter: blur(3px) saturate(0.82) brightness(1.07);
  pointer-events: none;
}
/* 再罩一层薄纱，进一步压掉壁纸的「杂」 */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background: rgba(253, 240, 200, 0.20);
  pointer-events: none;
}
/* 像素字体只用于展示性标题；正文、小字、快捷键与代码保留宿主排版。 */
body :where(h1, h2, h3),
body [class*="_titleGroup"],
body [class*="_brand"] {
  font-family: 'FusionPixel', 'Microsoft YaHei', sans-serif !important;
}
/* 标题直接浮在山谷上，用奶油色衬影保证识别，不再套一条横贯面板的纯色框。 */
[class*="_composerHero"] [class*="_headline"] {
  background: transparent;
  border: 0;
  box-shadow: none;
  width: fit-content;
  margin-inline: auto;
  padding: 2px 12px 6px;
  text-shadow: 0 2px 0 rgba(253, 240, 200, 0.95), 0 0 14px rgba(253, 240, 200, 0.95), 0 0 28px rgba(253, 240, 200, 0.75);
}
/* 工作区与模式选择收成居中的紧凑胶囊，保留轻纸面和背景层次。 */
[class*="_heroWorkspaceRow"] {
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 4px 10px;
  background: rgba(253, 240, 200, 0.78);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(74, 36, 8, 0.32);
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(74, 36, 8, 0.16);
}
/* 代码高亮（shiki）默认前景继承 label-primary——那是给奶油底配的深褐，
   落在同样深褐的代码块底上就成了「褐字褐底」。这里把代码文字换成奶油沙色，
   注释/标点也提亮一档；!important 保证压过官方 :root 定义，light/dark 都生效。 */
:root {
  --shiki-foreground: #f3dfb0 !important;
  --shiki-token-comment: #b08d5e !important;
  --shiki-token-punctuation: #d8c09a !important;
}
/* 无语言代码块不经过 Shiki，需单独覆盖其继承的深棕前景。 */
pre[class*="_plain"] {
  color: #f3dfb0 !important;
}
::selection { background: #a8331c; color: #fff3d8; }
/* 代码横幅只匹配代码块自己的头部，语言标签和操作按钮使用浅色前景。 */
[class*="_bannerWrap"] [class*="_header"] {
  background: var(--dsw-alias-markdown-code-block-banner) !important;
  color: #e3b878 !important;
}
[class*="_bannerWrap"] [class*="_header"] :where(button, [class*="_language"]) {
  color: #e3b878 !important;
}
/* 会话消息流垫 90% 不透明的奶油纸面，让壁纸约透出 10%，同时保持正文清晰。
   首页无 _viewArea 容器，不受此规则影响；类名后缀来自官方 CSS Modules，跨版本相对稳定。 */
[class*="_viewArea"] {
  background: rgba(253, 240, 200, 0.90);
  border: 2px solid rgba(74, 36, 8, 0.55);
  border-radius: 4px;
  box-shadow: 0 2px 0 rgba(74, 36, 8, 0.35);
}
/* 底部状态条（token 统计等）同样垫纸面；:has 限定为包含统计 pill 的输入框 dock。 */
[class*="_footArea"], [class*="_footerActions"], [class*="_dock"]:has([class*="_pill"]) {
  background: rgba(253, 240, 200, 0.92);
  border-radius: 4px;
}
[class*="_dock"]:has([class*="_pill"]) {
  padding: 6px 8px;
}
/* 会话语义化 HEADER 垫纸面；代码横幅是 DIV，不会被此规则误伤。 */
[class*="_centerCol"] header[class*="_header"] {
  background: rgba(253, 240, 200, 0.92);
  border-radius: 4px;
}
/* 模型与权限菜单使用近乎实心的纸面，避免文字直接落在半透明壁纸上。 */
[class*="_surface"]:is([class*="_menu"], [class*="_list"]) {
  background: rgba(251, 228, 176, 0.98) !important;
  border: 1px solid rgba(74, 36, 8, 0.45);
  border-radius: 4px;
}
/* 官方弹层还有一层默认半透明灰色 material，需移除才能露出上面的奶油纸面。 */
[class*="_surface"]:is([class*="_menu"], [class*="_list"]) > [class*="_material"] {
  background: transparent !important;
}
`;
		//#endregion

		var inject = ["theme"];

		/**
		 * 星露谷主题：在当前内置主题之上叠加 alias token 覆盖层（light/dark 同值，
		 * 强制农场奶油色系），并注入像素字体与山谷壁纸。卸载插件即还原。
		 */
		function apply(ctx) {
			var style = document.createElement("style");
			style.id = "dsh-theme-stardew-valley";
			style.textContent = CSS;
			document.head.appendChild(style);
			ctx.effect(function () {
				var dispose = ctx.theme.overrideTokens("dsh-theme-stardew-valley", TOKENS);
				return function () {
					dispose();
					style.remove();
				};
			}, "stardew-theme: token overrides + styles");
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
