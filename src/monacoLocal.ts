// Serve Monaco from our own bundle instead of the jsdelivr CDN that
// @monaco-editor/react falls back to. Without this the editor pane needs an
// internet connection the first time it loads — unacceptable for an offline
// desktop app. Importing this module once (from main.tsx) is enough.
// The core-only entry: every editor feature (find, suggest, context menu, ...)
// but none of the TS/CSS/HTML/JSON language services or basic-languages packs —
// Typst is our own registered language, so those would be megabytes of dead
// weight (and dead worker bundles) in the app.
import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main.js';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { loader } from '@monaco-editor/react';

// Typst is a custom language, so the plain editor worker covers everything we
// use (no TS/CSS/HTML/JSON language services needed).
self.MonacoEnvironment = { getWorker: () => new editorWorker() };

loader.config({ monaco });
