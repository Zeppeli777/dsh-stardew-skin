import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const template = readFileSync(new URL('../scripts/client.template.js', import.meta.url), 'utf8')
const paletteSource = template.match(/var PALETTE = (\{[\s\S]*?\n\s*\});/)?.[1]
const css = template.match(/var CSS = `([\s\S]*?)`;/)?.[1]
assert.ok(paletteSource, 'PALETTE must remain readable by the regression tests')
assert.ok(css, 'CSS must remain readable by the regression tests')
const palette = vm.runInNewContext(`(${paletteSource})`)

function luminance(hex) {
  const channels = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

function assertTextContrast(token, backgrounds) {
  for (const background of backgrounds) {
    const ratio = contrast(palette[token], palette[background] ?? background)
    assert.ok(ratio >= 4.5, `${token} on ${background} must reach 4.5:1; got ${ratio.toFixed(2)}:1`)
  }
}

test('body text and small labels remain readable on every light surface', () => {
  const surfaces = ['--dsw-specific-sidebar-fill', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2']
  for (const token of [
    '--dsw-alias-label-primary',
    '--dsw-alias-label-primary-dimmed',
    '--dsw-alias-label-secondary',
    '--dsw-alias-label-tertiary',
    '--dsw-alias-label-caption',
    '--dsw-alias-label-dimmed',
  ]) assertTextContrast(token, surfaces)
})

test('accent labels and primary buttons meet text contrast requirements', () => {
  assertTextContrast('--dsw-alias-label-primary-bluish', ['--dsw-alias-bg-layer-2', '--dsw-alias-state-business-tertiary'])
  assertTextContrast('--dsw-alias-brand-text', ['--dsw-alias-bg-layer-2', '--dsw-alias-state-business-tertiary'])
  assertTextContrast('--dsw-alias-label-primary-foreground', ['--dsw-alias-button-primary-fill'])
  assertTextContrast('--dsw-alias-brand-primary-invert', ['--dsw-alias-brand-primary'])
})

test('pixel typography is scoped to display headings instead of every element', () => {
  assert.doesNotMatch(css, /body\s*,\s*body\s*\*/)
  assert.doesNotMatch(css, /body\s*\*:not\(/)
  assert.match(css, /\[class\*="_titleGroup"\]/)
  assert.match(css, /:where\(h1, h2, h3\)/)
})

test('homepage headline floats over wallpaper and the workspace selector uses a compact pill', () => {
  assert.match(css, /\[class\*="_composerHero"\] \[class\*="_headline"\] \{\s*background: transparent;\s*border: 0;\s*box-shadow: none;/)
  assert.match(css, /\[class\*="_heroWorkspaceRow"\] \{\s*width: fit-content;[\s\S]*?border-radius: 999px;/)
})

test('dark code blocks keep light foregrounds and readable banner controls', () => {
  assert.ok(contrast('#f3dfb0', palette['--dsw-alias-markdown-code-block']) >= 4.5)
  assert.ok(contrast('#b08d5e', palette['--dsw-alias-markdown-code-block']) >= 4.5)
  assert.ok(contrast('#e3b878', palette['--dsw-alias-markdown-code-block-banner']) >= 4.5)
  assert.match(css, /\[class\*="_bannerWrap"\] \[class\*="_header"\]/)
  assert.match(css, /\[class\*="_bannerWrap"\] \[class\*="_header"\] :where\(button, \[class\*="_language"\]\)/)
  assert.match(css, /pre\[class\*="_plain"\] \{\s*color: #f3dfb0 !important;/)
})

test('session surfaces keep the message paper at 90% opacity without leaking into code headers', () => {
  assert.match(css, /\[class\*="_viewArea"\] \{\s*background: rgba\(253, 240, 200, 0\.90\);/)
  assert.doesNotMatch(css, /\[class\*="_centerCol"\] \[class\*="_header"\]/)
  assert.match(css, /\[class\*="_centerCol"\] header\[class\*="_header"\]/)
  assert.match(css, /\[class\*="_dock"\]:has\(\[class\*="_pill"\]\)/)
})

test('permission list menus receive the same opaque paper and transparent material as model menus', () => {
  assert.match(css, /\[class\*="_surface"\]:is\(\[class\*="_menu"\], \[class\*="_list"\]\)/)
  assert.match(css, /\[class\*="_surface"\]:is\(\[class\*="_menu"\], \[class\*="_list"\]\) > \[class\*="_material"\]/)
})

test('generated browser bundle stays in sync with the template and assets', () => {
  const font = readFileSync(new URL('../assets/fusion-pixel-12px.woff2', import.meta.url)).toString('base64')
  const wallpaper = readFileSync(new URL('../assets/valley.jpg', import.meta.url)).toString('base64')
  const expected = template.replace('__FONT_B64__', font).replace('__WALLPAPER_B64__', wallpaper)
  const generated = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.equal(generated, expected, 'run node scripts/build-client.mjs after editing the template')
})
