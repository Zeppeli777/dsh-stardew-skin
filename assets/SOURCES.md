# 星露谷主题素材清单（dsh-theme-stardew）

> 素材来源：Stardew Valley 官方维基（stardewvalleywiki.com，MediaWiki API 直链）+ AI 生成兜底。
> 授权提示：游戏内素材版权归 ConcernedApe 所有，维基直链仅限粉丝向非商用用途；主题包发布时需在 README 标注「与 ConcernedApe 无关、资源请勿商用」。

## 已下载（assets/ 目录，✅ = 已验证可用）

| 文件 | 尺寸 | 用途 | 来源 |
|---|---|---|---|
| Main_Logo_ZH.png ✅ | 704×244 透明底 | **初始页标题 Logo**（官方中文木制字标，比你给的「新手指南」木牌更干净） | File:Main Logo ZH.png |
| Getting_Started_-_Wiki_ZH.png ✅ | 399×226 | 备选标题木牌（底部带「新手指南」字，用需裁掉） | File:Getting Started - Wiki ZH.png |
| EnergyBar.png ✅ | 36×215 | **上下文额度条**：竖直能量条 sprite，用 CSS clip 从上往下扣减表示 token 余量 | File:EnergyBar.png |
| Farm_Map_Selection.png ✅ | 912×696 | **模式选择弹窗的 1:1 复刻参考**（游戏内建人物+选农场界面） | File:Farm Map Selection.png |
| Standard/Forest/Hilltop/Riverland/Wilderness_Farm_Map_Icon.png ✅ | ~54×60 | 模式选择弹窗的农场选项图标（4 个 Agent 预设 ↔ 4 种农场） | File:* Farm Map Icon.png |
| Junimo_Plush.png ✅ | 96×96 | **助手头像**（祝尼魔，对应 Terraria 版的向导） | File:Junimo Plush.png |
| Junimo_Star.png ✅ | 96×192 | 祝尼魔举着星星（可用于欢迎/完成态装饰） | File:Junimo Star.png |
| DialogueBubbleLove.png ✅ | 48×48 | 对话气泡红心印记（友谊之心） | File:DialogueBubbleLove.png |
| White/Brown/Blue/Void_Chicken.png ✅ | 48×48 | 桌宠：小鸡们（白/棕/蓝/虚空鸡） | File:* Chicken.png |
| Green_Slime_Anim.gif ✅ | 64×64 动图 | 桌宠：绿色史莱姆（官方动画 gif） | File:Green Slime Anim.gif |
| ButterflyAnimated.gif ✅ | 67×51 动图 | 桌宠：蝴蝶（官方动画 gif） | File:ButterflyAnimated.gif |
| Cat.gif ✅ | 64×64 动图 | 桌宠：猫（官方动画 gif） | File:Cat.gif |
| Parsnip.png ✅ | 48×48 | favicon / 站点图标（防风草） | File:Parsnip.png |

## 已生成（web/ 目录）

| 文件 | 说明 |
|---|---|
| web/valley.png | **主页背景图**（维基上没有干净的标题屏全景图，只有 1200×675 的彩蛋合成图，不适合当壁纸）。已用 AI 生成 2048×1152 星露谷风像素山谷：农舍+作物田+远山+湖泊日落。发布前需压缩到 ≤1920px JPEG（当前 3.6MB）。主题自带壁纸更换功能，用户可随时换掉。 |
| web/fusion-pixel-12px.woff2 | 缝合像素字体（开源），沿用 Terraria 版同款 |

## 待解决 / 可行性说明

| 需求 | 结论 |
|---|---|
| **背景音乐**（SoundCloud: Spring - The Valley Comes Alive） | SoundCloud 不允许直接下载音源，且当前网络访问 soundcloud.com 失败（无法实测）。可行方案：① 用 SoundCloud 官方 iframe 播放器（`w.soundcloud.com/player/?url=…`）内嵌一个「播放示例 BGM」按钮，依赖用户网络能访问 SoundCloud；② 保留主题原有的自定义 BGM 上传（MP3/OGG ≤64MB 存 IndexedDB），用户可自行放入本地音乐。建议两个都做。 |
| **音效** | 维基不托管游戏音效文件；沿用 Terraria 版的 WebAudio 纯振荡器 8-bit 合成音效（零文件、零请求），音色调成更「田园」的听感。 |
| **行走小人 gif**（模式选择弹窗顶栏） | 维基无现成行走 gif；可用 Cat.gif / 小鸡图 + CSS 位移动画替代，或 PIL 自绘。 |

## 概念映射表（Terraria → 星露谷）

| 官方 UI 概念 | Terraria 版 | 星露谷版 |
|---|---|---|
| Agent 预设 | 旅途/软核/中核/硬核 | 标准/森林/河边/山顶农场（配地图图标） |
| 会话 | 旅途/冒险 | 存档/新的一天 |
| 助手 NPC | 向导 | 祝尼魔 |
| 用户 | 冒险者 | 农夫 |
| 工具审批 | 审批石板 | 布告栏委托 |
| 任务清单 | 任务 HUD | 任务日志 |
| 连接状态 | 已连接到向导世界 | 已连接到星露谷 |
| 中断生成 | 旅程被中断 | 农活被中断 |
| 桌宠 | Boss 五只 | 小鸡/史莱姆/猫/蝴蝶/虚空鸡 |
| token 用量 | 金币账单 | **能量条**（EnergyBar sprite，余量可视化） |
