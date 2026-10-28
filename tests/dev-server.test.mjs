import test from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

async function startPreview(args = []) {
  const child = spawn(process.execPath, ['scripts/dev-server.mjs', '--port', '0', ...args], {
    cwd: new URL('..', import.meta.url),
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let output = ''
  child.stdout.on('data', (chunk) => { output += chunk })
  child.stderr.on('data', (chunk) => { output += chunk })
  const url = await Promise.race([
    new Promise((resolve) => {
      child.stdout.on('data', (chunk) => {
        const match = chunk.toString().match(/http:\/\/[^\s]+/)
        if (match) resolve(match[0])
      })
    }),
    once(child, 'exit').then((code) => {
      throw new Error(`preview server exited with ${code}: ${output}`)
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error(`preview server timed out: ${output}`)), 3000)),
  ])
  return { child, url: new URL(url) }
}

test('preview server serves the generated theme and rejects unknown files', async (t) => {
  const { child, url } = await startPreview()
  t.after(() => child.kill('SIGTERM'))

  const page = await fetch(url)
  assert.equal(page.status, 200)
  assert.match(await page.text(), /<script src="\/lib\/client\.js"><\/script>/)

  const client = await fetch(new URL('/lib/client.js', url))
  assert.equal(client.status, 200)
  assert.match(await client.text(), /dsh-theme-stardew-valley/)

  const missing = await fetch(new URL('/package.json', url))
  assert.equal(missing.status, 404)
})

test('preview server forwards explicit host and port arguments', async (t) => {
  const { child, url } = await startPreview(['--host', '127.0.0.1', '--port', '0'])
  t.after(() => child.kill('SIGTERM'))
  assert.equal(url.hostname, '127.0.0.1')
  assert.ok(Number(url.port) > 0)
})

test('mobile preview uses shrinkable grid tracks and readable note surfaces', async (t) => {
  const { child, url } = await startPreview()
  t.after(() => child.kill('SIGTERM'))
  const html = await (await fetch(url)).text()
  const mobile = html.match(/@media \(max-width: 820px\) \{([\s\S]*?)\n    \}/)?.[1]
  assert.ok(mobile, 'mobile styles must exist')
  assert.match(mobile, /\.hero_composerHero, \.demo-grid \{ grid-template-columns: minmax\(0, 1fr\); \}/)
  assert.match(html, /\.conversation_viewArea \{ min-width: 0;/)
  assert.match(html, /\.compatibility, \.side-notes \{[^}]*background: var\(--dsw-alias-bg-layer-2/)
})
