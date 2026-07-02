// The core-only monaco entry ships no .d.ts of its own; its exports are the
// same public API described by editor.api.
declare module 'monaco-editor/esm/vs/editor/edcore.main.js' {
  export * from 'monaco-editor/esm/vs/editor/editor.api';
}
