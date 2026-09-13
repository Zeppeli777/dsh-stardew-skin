// rc.1 protocol probe: opens remote.mux and tests stream payload shapes.
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire('C:/Users/86158/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/package.json');
const WebSocket = require('ws');

const cookie = process.env.DSH_COOKIE;

const sessionId = process.argv[2] || 'session-727f5d47-2137-4b3e-8a39-f446620765ba';

const ws = new WebSocket('ws://localhost:3087/api/remote.mux', {
  headers: { Cookie: cookie, Origin: 'http://localhost:3087' },
});

let sid = 0;
const open = (endpoint, payload) => {
  const streamId = `s${++sid}`;
  ws.send(JSON.stringify({ type: 'open', streamId, endpoint, payload }));
  return streamId;
};

ws.on('open', () => {
  console.log('== ws open');
  open('$events', { args: {} });
  open('session/follow', { args: { request: { address: { kind: 'session', sessionId }, maxMessages: 20 } } });
  open('workspace/follow', { args: {} });
});

let count = 0;
ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  count++;
  const s = JSON.stringify(msg);
  console.log(`<< [${msg.streamId}] ${msg.type}: ${s.length > 1500 ? s.slice(0, 1500) + '…' : s}`);
  if (count > 12) { ws.close(); process.exit(0); }
});

ws.on('close', (c, r) => { console.log('== closed', c, r.toString()); process.exit(0); });
ws.on('error', (e) => { console.log('== error', e.message); process.exit(1); });
setTimeout(() => { console.log('== timeout'); ws.close(); process.exit(0); }, 8000);
