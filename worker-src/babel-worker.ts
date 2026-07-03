// The same-origin Babel worker entry, now living in the package that owns the
// transform logic (R3-149 / SIMPLIFIED_DEPLOYMENT_SPEC §14). This is the exact
// body of what used to be sandbox's `babel-worker.ts`, moved here so the worker's
// bundled transpiler is *this* package's own `transformBabel` — the worker IS the
// transpiler version, so it can never drift from the sandbox iframe's transpiler
// (the gen-toolchain-hash / G2-8 parity anchor, PRETRANSPILED_ARTIFACTS_SPEC §4.4).
//
// It imports `transformBabel` from the *built* package's narrow Babel-only entry
// (`../dist/babel/worker-api.js`) rather than the package root, so the bytes Parcel
// bundles are the tsup-built `transformBabel` (byte-identical behaviour to the CLI's
// pre-transpiled artifacts and the sandbox iframe runtime) WITHOUT dragging in the
// root's `compileMdx` / unified tree, which the worker never invokes.
//
// The transport (WorkerMessageBus + the {type:'connect'} MessagePort handshake)
// comes from the leaf `@immediately-run/worker-transport` package, so this worker
// entry does not depend on `sandbox`.
//
// This worker is spawned **classic** by the parent page (`new Worker(url)`,
// `importScripts` async chunks — NOT a module worker); the Parcel target
// (`outputFormat: 'global'`, `context: web-worker`) preserves that shape. The parent
// transfers a `MessagePort` entangled with one handed into the sandboxed iframe so
// the iframe can drop `allow-same-origin` and transform requests flow directly.
import { bindWorkerMessageBus } from '@immediately-run/worker-transport';
// eslint-disable-next-line import/extensions
import { transformBabel, type ITransformData } from '../dist/babel/worker-api.js';

bindWorkerMessageBus(self, {
  channel: 'sandpack-babel',
  handleRequest: (method, data) => {
    switch (method) {
      case 'transform':
        return transformBabel(data as ITransformData);
      default:
        return Promise.reject(new Error('Unknown method'));
    }
  },
});
