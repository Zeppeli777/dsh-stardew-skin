# -*- coding: utf-8 -*-
"""把 web/index.html（Terraria 版）改造为星露谷版：换 CSS + 文案映射 + 结构插入。"""
import re, sys

path = 'web/index.html'
src = open(path, encoding='utf-8').read()
orig_len = len(src)

def rep(old, new, count=1, required=True):
    global src
    n = src.count(old)
    if required and n == 0:
        print('MISS:', old[:60]); sys.exit(1)
    src = src.replace(old, new, count if count else n)

# ---------- 1. 换整块 CSS ----------
css = open('scripts/stardew.css', encoding='utf-8').read()
a = src.index('<style>')
b = src.index('</style>')
src = src[:a + len('<style>')] + '\n' + css + '\n    ' + src[b:]

# ---------- 2. head / 标题屏 ----------
rep('<title>DeepSeek Harness · Terraria</title>', '<title>DeepSeek Harness · 星露谷物语</title>')
rep('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />', '<link rel="icon" type="image/png" href="/parsnip.png" />')
rep('<div class="title-logo">DeepSeek Harness</div>', '<img class="title-logo-img" src="/logo.png" alt="星露谷物语" />')
rep('— Cordis · 泰拉瑞亚主题 —', '— DeepSeek Harness · 星露谷物语主题 —')
rep('<button class="menu-item" data-action="new">新的会话</button>', '<button class="menu-item" data-action="new">新存档</button>')
rep('<button class="menu-item" data-action="continue">继续会话</button>', '<button class="menu-item" data-action="continue">加载存档</button>')
rep('<button class="menu-item" data-action="deskpet">人物桌宠</button>', '<button class="menu-item" data-action="deskpet">农场伙伴</button>')

# ---------- 3. 主屏 HTML ----------
rep('<div class="main-title" id="main-session-name">向导</div>', '<div class="main-title" id="main-session-name">祝尼魔</div>')
src = src.replace('/xiangdao.png', '/junimo.png')
rep('<img src="/junimo.png" alt="向导" id="npc-avatar" />', '<img src="/junimo.png" alt="祝尼魔" id="npc-avatar" />')
rep('<div class="dlg-npc-name" id="npc-name">向导</div>', '<div class="dlg-npc-name" id="npc-name">祝尼魔</div>')
rep('placeholder="向你的向导下达指令…（Enter 发送 / Shift+Enter 换行）"', 'placeholder="给祝尼魔安排今天的农活…（Enter 发送 / Shift+Enter 换行）"')
rep('点击「模型选择」更换武器。', '点击「模型选择」更换农具。')
rep('<div class="hud-title">任务清单</div>', '<div class="hud-title">任务日志</div>')
rep('<div class="hud-title">向导提示</div>', '<div class="hud-title">祝尼魔提示</div>')
rep('危险操作会弹出审批石板；红心是对话的印记，金币是账单。', '危险操作会贴上布告栏；红心是友谊的印记，金币是账单。')

# 能量条 HUD：插在 hud-key 之后
energy_html = '''<div class="hud-energy">
        <div class="energy-bar"><div class="energy-fill" id="energy-fill"></div><div class="energy-cap">E</div></div>
        <div class="energy-info"><div class="energy-label">上下文能量</div><div class="energy-pct" id="energy-pct">--</div></div>
      </div>
      '''
rep('</span><span id="hud-key-label">API 密钥：检查中</span></div>\n      </div>',
    '</span><span id="hud-key-label">API 密钥：检查中</span></div>\n      ' + energy_html + '</div>')

# ---------- 4. JS 常量与文案 ----------
rep("const PRESET_NAMES = { standard: '旅途', code: '软核', minimal: '中核', cordis: '硬核' }",
    "const PRESET_NAMES = { standard: '标准农场', code: '河边农场', minimal: '森林农场', cordis: '山顶农场' }")
rep("desc: '功能完整的编码 Agent：编辑、Shell、检索、技能、计划、子代理。' },",
    "desc: '耕地最多的经典地形——功能完整的编码 Agent：编辑、Shell、检索、技能、计划、子代理。' },")
rep("desc: '标准全部能力，并用 Code Mode SDK 以一个程序组合多步操作。' },",
    "desc: '水道纵横，适合钓鱼佬——标准全部能力，并用 Code Mode SDK 以一个程序组合多步操作。' },")
rep("desc: '仅持久 bash 与编辑器双工具的极简 Agent。' },",
    "desc: '浆果与木桩随手可采——仅持久 bash 与编辑器双工具的极简 Agent。' },")
rep("desc: '用于创建自定义 preset：标准全部能力 + 运行时检查与实验。' },",
    "desc: '矿点丰富但开垦费劲——用于创建自定义 preset：标准全部能力 + 运行时检查与实验。' },")

# 农场图标映射（插在 MODE_META 之后）
rep("""]

/** 桌宠清单""", """]
/** 模式选择弹窗中四个已知预设对应的农场地图图标。 */
const FARM_ICONS = { standard: '/farm-standard.png', code: '/farm-riverland.png', minimal: '/farm-forest.png', cordis: '/farm-hilltop.png' }

/** 桌宠清单""")

# 宠物清单
rep("""const PETS = [
  { id: 'eoc', name: '克鲁苏之眼', page: 'eoc_pet.html' },
  { id: 'slimeking', name: '史莱姆王', page: 'slimeking_pet.html' },
  { id: 'draedon', name: '嘉登', page: 'draedon_pet.html' },
  { id: 'dog', name: '神明吞噬者', page: 'dog_pet.html' },
  { id: 'cryogen', name: '极地之灵', page: 'cryogen_pet.html' },
]""",
"""const PETS = [
  { id: 'chicken', name: '小鸡', page: 'chicken_pet.html' },
  { id: 'voidchicken', name: '虚空鸡', page: 'voidchicken_pet.html' },
  { id: 'slime', name: '史莱姆', page: 'slime_pet.html' },
  { id: 'cat', name: '猫咪', page: 'cat_pet.html' },
  { id: 'butterfly', name: '蝴蝶', page: 'butterfly_pet.html' },
]""")

# 删除旧版单开关迁移块
rep("""// 旧版单开关 terraria.petOn 一次性迁移为克鲁苏之眼的独立键，迁移后删除旧键
if (localStorage.getItem('terraria.pet.eoc') === null && localStorage.getItem('terraria.petOn') !== null) {
  localStorage.setItem('terraria.pet.eoc', localStorage.getItem('terraria.petOn'))
  localStorage.removeItem('terraria.petOn')
}
""", "")

# localStorage / IndexedDB 键名
src = src.replace("'terraria-wallpaper'", "'stardew-wallpaper'")
src = src.replace('terraria.', 'stardew.')

# 人名与叙事文案
rep("npcName: localStorage.getItem('stardew.npcName') || '向导',", "npcName: localStorage.getItem('stardew.npcName') || '祝尼魔',")
rep("state.npcName = (name || '').trim() || '向导'", "state.npcName = (name || '').trim() || '祝尼魔'")
rep("name.textContent = '冒险者'", "name.textContent = '农夫'")
rep("appendSysLine('旅程被中断')", "appendSysLine('农活被中断')")
rep("openModal('审批石板', body, [", "openModal('布告栏委托', body, [")
rep("'已连接到向导世界'", "'已连接到星露谷'")
rep("appendSysLine('欢迎来到泰拉瑞亚！我是你的' + state.npcName + '。')", "appendSysLine('欢迎来到星露谷！我是你的' + state.npcName + '。')")
rep("'还没有可继续的会话。先「新的会话」开启旅途吧。'", "'还没有可继续的存档。先点「新存档」开始新的一天吧。'")
rep("'dsh-persona': '向导人格与系统提示词',", "'dsh-persona': '祝尼魔人格与系统提示词',")
rep("'dsh-tool-todo': '任务清单工具',", "'dsh-tool-todo': '任务日志工具',")
rep("控制向导使用工具前的审批方式", "控制祝尼魔使用工具前的审批方式")
rep("toast('已恢复默认森林壁纸', 'ok')", "toast('已恢复默认山谷壁纸', 'ok')")
rep("toast('人物头像已更换', 'ok')", "toast('伙伴头像已更换', 'ok')")
rep("toast('人物名字已保存', 'ok')", "toast('伙伴名字已保存', 'ok')")
rep("toast('已恢复默认人物桌宠', 'ok')", "toast('已恢复默认农场伙伴', 'ok')")
rep("openModal('人物桌宠', body, [", "openModal('农场伙伴', body, [")
rep("nameInput.placeholder = '人物名字（如：向导）'", "nameInput.placeholder = '伙伴名字（如：祝尼魔）'")
rep("applyNpcName('向导')", "applyNpcName('祝尼魔')")
rep("title.textContent = '模式选择'", "title.textContent = '选择农场'")
rep("avatar.src = '/Style_1_male_walking.gif'", "avatar.src = '/cat.gif'")
rep("avatar.alt = '冒险者'", "avatar.alt = '猫咪'")
rep("openModal('继续会话', body, [{ label: '关闭', onClick: () => { } }])", "openModal('加载存档', body, [{ label: '关闭', onClick: () => { } }])")
rep("`向你的${state.npcName}下达指令…（Enter 发送 / Shift+Enter 换行）`", "`给你的${state.npcName}安排农活…（Enter 发送 / Shift+Enter 换行）`")

# ---------- 5. 模式选择弹窗：农场图标 ----------
rep("""    btn.className = 'char-mode ' + m.cls + (m.id === selected ? ' active' : '')
    btn.textContent = labelOf(m)""",
"""    btn.className = 'char-mode ' + m.cls + (m.id === selected ? ' active' : '')
    if (FARM_ICONS[m.id]) { const ic = document.createElement('img'); ic.src = FARM_ICONS[m.id]; ic.alt = ''; btn.appendChild(ic) }
    const labelSpan = document.createElement('span')
    labelSpan.textContent = labelOf(m)
    btn.appendChild(labelSpan)""")

# ---------- 6. 上下文能量条 ----------
rep("""const state = {
  sessionId: null,""",
"""const state = {
  sessionId: null,
  ctxCap: Number(localStorage.getItem('stardew.ctxCap')) || 128000,""")

rep("""  if (usage && (usage.totalTokens !== undefined)) {
    const u = document.createElement('div')
    u.className = 'msg-usage'
    u.textContent = 'tokens: ' + (usage.promptTokens ?? '?') + ' + ' + (usage.completionTokens ?? '?') + ' = ' + usage.totalTokens
    body.parentNode.appendChild(u)
  }""",
"""  if (usage && (usage.totalTokens !== undefined)) {
    const u = document.createElement('div')
    u.className = 'msg-usage'
    u.textContent = 'tokens: ' + (usage.promptTokens ?? '?') + ' + ' + (usage.completionTokens ?? '?') + ' = ' + usage.totalTokens
    body.parentNode.appendChild(u)
    updateEnergy(usage)
  }""")

rep("""  state.streamEl = null
  state.streamWrap = null
  scrollMsgs()
}

function appendToolBlock""",
"""  state.streamEl = null
  state.streamWrap = null
  scrollMsgs()
}

/* ---------- 上下文能量条：以最近一轮 promptTokens 估算上下文占用 ---------- */
function updateEnergy(usage) {
  const fill = $('#energy-fill')
  const pct = $('#energy-pct')
  if (!fill || !pct || !usage) return
  const used = Number(usage.promptTokens ?? usage.totalTokens)
  if (!Number.isFinite(used) || used <= 0) return
  const remain = Math.max(0, Math.min(1, 1 - used / state.ctxCap))
  fill.style.height = (remain * 100).toFixed(1) + '%'
  fill.style.background = remain > 0.5 ? 'var(--energy)' : (remain > 0.2 ? 'var(--gold)' : 'var(--barn-red)')
  pct.textContent = Math.round(remain * 100) + '%'
  pct.classList.toggle('low', remain <= 0.2)
  pct.title = '本轮回 prompt ' + used + ' / 标称上下文 ' + state.ctxCap + ' tokens（可用 stardew.ctxCap 调整）'
}

function appendToolBlock""")

# ---------- 7. SoundCloud 示例 BGM ----------
rep("""/* ---------- 人物桌宠""",
"""/* ---------- SoundCloud 示例 BGM（官方 iframe 播放器；需要能访问 soundcloud.com） ---------- */
const SC_EMBED = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent('https://soundcloud.com/concernedape/spring-the-valley-comes-alive') + '&auto_play=true&hide_related=true&show_comments=false&show_reposts=false&visual=false'
function toggleScPlayer() {
  let el = $('#sc-player')
  if (!el) {
    el = document.createElement('iframe')
    el.id = 'sc-player'
    el.title = 'SoundCloud 示例音乐'
    el.allow = 'autoplay'
    document.body.appendChild(el)
  }
  if (el.classList.contains('sc-on')) {
    el.classList.remove('sc-on')
    el.src = 'about:blank'
    toast('已收起示例音乐', 'ok')
    return
  }
  el.src = SC_EMBED
  el.classList.add('sc-on')
  toast('示例音乐加载中（需要能访问 SoundCloud）', 'ok')
}

/* ---------- 人物桌宠""")

rep("""  bgmRow.appendChild(bgmReset); bgmRow.appendChild(bgmFile)
""",
"""  bgmRow.appendChild(bgmReset); bgmRow.appendChild(bgmFile)
  const scBtn = document.createElement('button')
  scBtn.className = 'pixel-btn btn-sm'
  scBtn.id = 'set-sc-toggle'
  scBtn.textContent = '示例 BGM ♪'
  scBtn.title = 'ConcernedApe - Spring (The Valley Comes Alive)，SoundCloud 内嵌播放'
  scBtn.addEventListener('click', toggleScPlayer)
  bgmRow.appendChild(scBtn)
""")

open(path, 'w', encoding='utf-8', newline='\n').write(src)
print('OK', orig_len, '->', len(src))
