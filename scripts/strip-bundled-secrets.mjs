// Some dependencies (notably @excalidraw/excalidraw) ship their OWN public
// Firebase / Google web API keys inside their published npm package. Those keys
// get bundled into dist/ during `vite build`. They are third-party public client
// identifiers — not our secrets — but because the Tauri edition commits its built
// dist/, GitHub secret scanning would flag the `AIza…` string.
//
// This runs after the build and neutralizes any such key in the emitted bundle,
// so the committed UI never carries a third-party key. Safe: the app doesn't use
// Excalidraw's collaboration/cloud features (the whiteboard is fully local), so
// the key was dead weight anyway.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const assetsDir = join(process.cwd(), 'dist', 'assets');
const GOOGLE_API_KEY = /AIza[0-9A-Za-z_-]{35}/g;

let files = 0;
try {
  for (const name of readdirSync(assetsDir)) {
    if (!name.endsWith('.js')) continue;
    const path = join(assetsDir, name);
    const src = readFileSync(path, 'utf8');
    if (GOOGLE_API_KEY.test(src)) {
      writeFileSync(path, src.replace(GOOGLE_API_KEY, 'bundled-third-party-key-removed'));
      files++;
    }
  }
} catch (e) {
  console.warn('strip-bundled-secrets: skipped —', e.message);
  process.exit(0); // never fail the build over this
}
console.log(`strip-bundled-secrets: neutralized bundled Google API keys in ${files} file(s).`);
