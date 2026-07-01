// Electron shell: runs the local backend (which also serves the built UI) and
// opens it in a native window. Build the UI first with `npm run build`.
const { app, BrowserWindow, shell, utilityProcess } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
// Keep user documents in a writable location outside the app bundle.
const WORKSPACE = path.join(app.getPath('documents'), 'TypstEditor');
fs.mkdirSync(WORKSPACE, { recursive: true });

let serverProc = null;

function startServer() {
  serverProc = utilityProcess.fork(path.join(ROOT, 'server.js'), [], {
    cwd: ROOT,
    stdio: 'inherit',
    env: {
      ...process.env,
      TYPST_WORKSPACE: WORKSPACE,
      TYPST_DIST: path.join(ROOT, 'dist'),
    },
  });
}

function waitForServer(cb, tries = 0) {
  http.get('http://127.0.0.1:3001/tools', () => cb())
    .on('error', () => (tries < 80 ? setTimeout(() => waitForServer(cb, tries + 1), 200) : cb()));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 920, minWidth: 900, minHeight: 600,
    title: 'Typst Editor',
    backgroundColor: '#0f172a',
    webPreferences: { contextIsolation: true },
  });
  win.loadURL('http://127.0.0.1:3001');
  // Open external links (mailto:, https:) in the real browser, not the app.
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => { startServer(); waitForServer(createWindow); });

app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
app.on('window-all-closed', () => { if (serverProc) serverProc.kill(); if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { if (serverProc) serverProc.kill(); });
