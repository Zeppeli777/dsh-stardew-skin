import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const args = process.argv.slice(2)

function option(name, fallback) {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}

const host = option('--host', '127.0.0.1')
const port = Number(option('--port', '7100'))
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error(`Invalid port: ${option('--port', '7100')}`)
}

const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/lib/client.js', ['lib/client.js', 'text/javascript; charset=utf-8']],
])

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
  const route = request.method === 'GET' || request.method === 'HEAD' ? routes.get(pathname) : undefined
  if (!route) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found\n')
    return
  }

  const [relativePath, contentType] = route
  try {
    const filePath = new URL(relativePath, `file://${root}`).pathname
    const info = await stat(filePath)
    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': info.size,
      'Cache-Control': 'no-store',
    })
    if (request.method === 'HEAD') response.end()
    else createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found\n')
  }
})

server.listen(port, host, () => {
  const address = server.address()
  const actualPort = typeof address === 'object' && address ? address.port : port
  console.log(`Stardew preview: http://${host}:${actualPort}/`)
})
