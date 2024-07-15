import {app, BrowserWindow, dialog, ipcMain, shell} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import os from 'node:os'
import {update} from './update'
import fs from "fs";
import {
  CHANGE_DIRECTORY,
  GET_CUSTOMIZE_DIR,
  GET_CUSTOMIZE_SCRIPT_FILES,
  GET_SCRIPT_CONTENT,
  GET_SCRIPT_FILES,
  SET_CUSTOMIZE_DIR,
  SETUP_DIRECTORY
} from "../../constant/event";
import {getCustomizeDir, setCustomizeDir} from "./store";
import {CUSTOMIZE_SCRIPTS_DIR} from "../../constant/config";

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    minWidth: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 50,
      symbolColor: 'white'
    },
    webPreferences: {
      preload,
      nodeIntegration: true,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Auto update
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.handle(GET_SCRIPT_FILES, async () => {
  const scriptsPath = path.join(process.env.VITE_PUBLIC, 'scripts');
  const scriptFiles = fs.readdirSync(scriptsPath).filter(v => v.endsWith('.js'));
  return scriptFiles.map(v => v.replace('.js', ''));
});

ipcMain.handle(GET_CUSTOMIZE_SCRIPT_FILES, async (event, args) => {
  const scriptFiles = fs.readdirSync(args).filter(v => v.endsWith('.js'));
  return scriptFiles.map(v => v.replace('.js', ''));
});

ipcMain.handle(GET_SCRIPT_CONTENT, async (event, args: { type: 'customize' | 'base', name: string }) => {
  let scriptsPath: string = ''
  if(args.type === 'customize') {
    scriptsPath = getCustomizeDir(CUSTOMIZE_SCRIPTS_DIR) as string
  } else {
    scriptsPath = path.join(process.env.VITE_PUBLIC, 'scripts')
  }
  return fs.readFileSync(path.join(scriptsPath, args.name + '.js'), "utf8")
});

ipcMain.on(SETUP_DIRECTORY, async (event) => {
  const dir = dialog.showOpenDialogSync({
    properties: ['openDirectory'],
  });
  if (dir) {
    setCustomizeDir(CUSTOMIZE_SCRIPTS_DIR, dir[0]);
    event.sender.send(CHANGE_DIRECTORY, dir[0]);
  }
})

ipcMain.on(SET_CUSTOMIZE_DIR, async (event, key, val) => {
  setCustomizeDir(key, val);
  event.returnValue = true;
});

ipcMain.on(GET_CUSTOMIZE_DIR, async (event, val) => {
  if(CUSTOMIZE_SCRIPTS_DIR) {
    event.returnValue = getCustomizeDir(CUSTOMIZE_SCRIPTS_DIR);
  } else {
    event.returnValue = void 0;
  }
});