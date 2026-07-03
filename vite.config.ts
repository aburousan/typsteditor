import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },

  // The dev-server dep optimizer mangles monaco's core-only deep import
  // (esm/vs/editor/edcore.main.js); serve it as plain ESM instead. The
  // production build bundles it normally.
  optimizeDeps: {
    exclude: ['monaco-editor'],
  },

  build: {
    chunkSizeWarningLimit: 6000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Monaco is bundled locally (see src/monacoLocal.ts) so the editor
            // works with no internet; keep it in its own chunk.
            { name: 'monaco', test: /node_modules[\\/]monaco-editor/ },
            { name: 'pdfjs', test: /node_modules[\\/]pdfjs-dist/ },
          ],
        },
      },
    },
  },

  server: {
    hmr: {
      overlay: false
    }
  }
})
