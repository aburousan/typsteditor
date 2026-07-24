import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const source = await readFile(resolve('src/collabProtocol.ts'), 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const protocol = await import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`);

assert.equal(protocol.normalizeCollabServerUrl('10.20.30.40:3020'), 'ws://10.20.30.40:3020');
assert.equal(protocol.normalizeCollabServerUrl('wss://sync.example.edu/base/'), 'wss://sync.example.edu/base');
assert.equal(protocol.normalizeCollabServerUrl('https://sync.example.edu'), null);
assert.equal(protocol.normalizeCollabServerUrl('ws://user:pass@example.edu'), null);
assert.equal(protocol.normalizeCollabServerUrl('ws://example.edu/?token=secret'), null);

const first = protocol.newCollabSession();
const second = protocol.newCollabSession();
assert.match(first.room, /^[0-9a-f]{64}$/);
assert.match(first.key, /^[A-Za-z0-9_-]{43}$/);
assert.notEqual(first.room, second.room);
assert.notEqual(first.key, second.key);

const ticket = protocol.makeCollabTicket('ws://10.20.30.40:3020', first.room, first.key);
assert.deepEqual(protocol.parseCollabTicket(ticket), {
  url: 'ws://10.20.30.40:3020',
  room: first.room,
  key: first.key,
});
assert.equal(protocol.parseCollabTicket('hilbert-collab://old-room@ws://10.0.0.1:3020'), null);
assert.equal(protocol.parseCollabTicket(ticket.replace(first.key, 'short')), null);
assert.throws(() => protocol.encryptedWebSocketClass('short'), /Invalid collaboration key/);

console.log('collaboration protocol tests passed');
