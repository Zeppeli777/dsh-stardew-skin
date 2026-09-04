// 构建 lib/client.js：把 assets/ 下的字体与壁纸转成 base64 填入模板。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const font = readFileSync('assets/fusion-pixel-12px.woff2').toString('base64')
const wallpaper = readFileSync('assets/valley.jpg').toString('base64')

let tpl = readFileSync('scripts/client.template.js', 'utf8')
if (!tpl.includes('__FONT_B64__') || !tpl.includes('__WALLPAPER_B64__')) throw new Error('模板缺少占位符')
const out = tpl.replace('__FONT_B64__', font).replace('__WALLPAPER_B64__', wallpaper)
mkdirSync('lib', { recursive: true })
writeFileSync('lib/client.js', out)
console.log('lib/client.js written,', (out.length / 1024).toFixed(0), 'KB')
