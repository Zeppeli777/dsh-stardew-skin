import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PIXEL_ICONS, pixelSvg, buildIcons } from '../scripts/pixel-icons.mjs'

// 像素图标休眠资产回归：校验画作与生成器满足 0.2.2 icons API 的注册契约
// （官方 validateIcons 会拒绝缺 viewBox、带 <style>/<script> 或带游离元素
// id 的文档），并锁定「暂不进 bundle」的现状，上游补齐偏好持久化后接线。

// 与 dsh ui-primitives 对齐的已知 glyph（0.2.2-rc.1 ICON_ARTWORK 键的子集）
const KNOWN_GLYPHS = [
  'paper-plane-outline', 'new-chat-outline', 'settings-outline', 'search-outline',
  'close-outline', 'copy-outline', 'trash-outline', 'stop-fill', 'sparkle',
  'plugin-pinwheel-outline',
]

test('every pixel icon is a 16×16 grid with valid rows', () => {
  for (const [glyph, rows] of Object.entries(PIXEL_ICONS)) {
    assert.ok(KNOWN_GLYPHS.includes(glyph), `glyph ${glyph} is not a known ICON_ARTWORK key`)
    assert.equal(rows.length, 16, `${glyph}: grid must be 16 rows tall`)
    for (const row of rows) {
      assert.equal(row.length, 16, `${glyph}: row must be 16 columns wide`)
      assert.match(row, /^[#.]+$/, `${glyph}: rows may only contain # and .`)
    }
  }
})

test('generated SVG documents satisfy the theme icons contract', () => {
  const icons = buildIcons()
  for (const glyph of KNOWN_GLYPHS) {
    for (const weight of ['regular', 'medium']) {
      const id = `dsw-icon-${glyph}-${weight}`
      const svg = icons[id]
      assert.ok(svg, `${id}: missing from buildIcons() output`)
      assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 16 16"/, `${id}: namespaced root with viewBox`)
      assert.ok(!svg.includes('<style'), `${id}: no document-wide <style>`)
      assert.ok(!svg.includes('<script'), `${id}: no <script>`)
      assert.ok(!/\sid=/.test(svg), `${id}: no element ids (sprite requires symbol-prefixed ids)`)
      assert.match(svg, /fill="currentColor"/, `${id}: painted with currentColor`)
    }
  }
})

test('pixel icons stay dormant: template points to the module and ships no icons', () => {
  const template = readFileSync(new URL('../scripts/client.template.js', import.meta.url), 'utf8')
  const built = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.match(template, /scripts\/pixel-icons\.mjs/, 'template must reference the dormant module')
  assert.ok(!built.includes('dsw-icon-'), 'shipped bundle must not carry icon replacements yet')
})
