// Phase 01 exit harness (R3-149): the prebuilt classic Babel worker
// (`worker/babel-worker.js`), spawned as a classic worker, answers a `transform`
// request over the MessagePort transport with real compiled output.
//
// A classic Web Worker can't run under node:worker_threads directly (different API:
// `self`/`importScripts`/`MessagePort`), so we evaluate the bundle in a vm context
// that shims those globals, deliver the `{type:'connect'}` handshake with a
// node MessagePort, and speak the WorkerMessageBus wire protocol from the parent side.
//
// Run via `npm run test:worker` (which builds dist + the worker first). Not named
// `*.test.mjs` so it stays out of the golden `node --test test/*.test.mjs` run,
// which must not depend on a Parcel worker build.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { MessageChannel } from 'node:worker_threads';

const WORKER_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'worker');
const ENTRY = join(WORKER_DIR, 'babel-worker.js');
const CHANNEL = 'sandpack-babel';

function loadWorker() {
  const listeners = { message: [], error: [] };
  const context = {
    console,
    setTimeout,
    clearTimeout,
    queueMicrotask,
    TextEncoder,
    TextDecoder,
    URL,
    atob: (s) => Buffer.from(s, 'base64').toString('binary'),
    btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
    performance,
    process,
  };
  context.globalThis = context;
  context.self = context;
  context.window = context;
  context.global = context;
  context.importScripts = (...urls) => {
    for (const u of urls) {
      const p = resolve(WORKER_DIR, u.toString().replace(/^.*\//, ''));
      vm.runInContext(readFileSync(p, 'utf8'), context, { filename: p });
    }
  };
  context.addEventListener = (type, cb) => {
    (listeners[type] ||= []).push(cb);
  };
  context.removeEventListener = (type, cb) => {
    const a = listeners[type] || [];
    const i = a.indexOf(cb);
    if (i >= 0) a.splice(i, 1);
  };
  context.postMessage = () => {};
  vm.createContext(context);
  vm.runInContext(readFileSync(ENTRY, 'utf8'), context, { filename: ENTRY });
  return listeners;
}

function adapt(port) {
  return {
    postMessage: (msg) => port.postMessage(msg),
    addEventListener: (type, cb) => {
      if (type === 'message') port.on('message', (data) => cb({ data }));
      if (type === 'error') port.on('messageerror', (e) => cb(e));
    },
    removeEventListener: () => {},
    start: () => port.start(),
  };
}

test('prebuilt classic Babel worker compiles TS+JSX and collects deps over the MessagePort', async () => {
  assert.ok(
    existsSync(ENTRY),
    `worker bundle missing at ${ENTRY} — run "npm run build:worker" first`,
  );

  const listeners = loadWorker();
  const { port1: parentPort, port2: workerPort } = new MessageChannel();

  // deliver the one-time connect handshake carrying the worker's port
  for (const cb of listeners.message.slice()) {
    cb({ data: { type: 'connect' }, ports: [adapt(workerPort)] });
  }

  parentPort.start();
  let msgId = 0;
  const request = (method, ...params) =>
    new Promise((res, rej) => {
      const id = ++msgId;
      const to = setTimeout(() => rej(new Error('worker request timed out')), 20000);
      const onMsg = (data) => {
        if (data && data.channel === CHANNEL && data.id === id) {
          parentPort.off('message', onMsg);
          clearTimeout(to);
          if (data.error) rej(Object.assign(new Error(data.error.message), data.error));
          else res(data.result);
        }
      };
      parentPort.on('message', onMsg);
      parentPort.postMessage({ channel: CHANNEL, id, method, params });
    });

  const SRC = `import {useState} from 'react';
export const Counter = (props: {start: number}) => {
  const [n, setN] = useState<number>(props.start);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
};
`;
  const result = await request('transform', {
    code: SRC,
    filepath: '/app/Counter.tsx',
    config: { presets: ['react'], plugins: [] },
  });

  const code = result?.code ?? '';
  const deps = result?.dependencies;
  const depsArr = deps instanceof Set ? [...deps] : Array.isArray(deps) ? deps : [];

  assert.ok(code.length > 0, 'worker returned empty code');
  assert.doesNotMatch(code, /:\s*number/, 'TypeScript annotations were not stripped');
  assert.match(code, /createElement|_jsx/, 'JSX was not compiled');
  assert.ok(depsArr.includes('react'), `dep collection failed (got ${JSON.stringify(depsArr)})`);

  parentPort.close();
});
