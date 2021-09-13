import { app, protocol, BrowserWindow, Menu, session, shell, screen, globalShortcut } from 'electron';
import { BrowserWindowConstructorOptions, MenuItemConstructorOptions } from 'electron/main';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as url from 'url';

/**
 * parse arguments
 */
const args = process.argv.slice(1);
const debug = args.includes('--debug');
const serve = args.includes('--serve');

let win: BrowserWindow;

function createMenu(): void {
    const template: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                { role: 'reload' },
                { label: 'Logout', click: async () => cleanStorage() },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'View',
            submenu: [{ role: 'togglefullscreen' }, { role: 'toggleDevTools' }]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Report Issue',
                    click: async () => openExternal('https://github.com/OpenSlides/OpenSlides/issues/new/choose')
                },
                {
                    label: 'OpenSlides',
                    click: async () => openExternal('https://openslides.com/de')
                },
                {
                    label: 'Electron',
                    click: async () => openExternal('https://electronjs.org')
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function createWindow(): void {
    createMenu();

    const size = screen.getPrimaryDisplay().workAreaSize;
    const windowProperties: BrowserWindowConstructorOptions = {
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            contextIsolation: false,
            webviewTag: true,
            nativeWindowOpen: true,
            webSecurity: !debug,
            allowRunningInsecureContent: debug
        }
    };

    win = new BrowserWindow(windowProperties);

    if (serve) {
        win.loadURL('http://localhost:4200');
    } else {
        const urlFormat = url.format({
            pathname: 'index.html',
            protocol: 'file',
            slashes: true
        });

        win.loadURL(urlFormat);
        win.webContents.on('did-fail-load', () => {
            win.loadURL(urlFormat);
        });
    }

    win.on('closed', () => {
        (win as any) = null;
    });
}

async function cleanStorage(): Promise<void> {
    await session.defaultSession.clearStorageData();
    win.webContents.goToIndex(0);
}

async function openExternal(link: string): Promise<void> {
    await shell.openExternal(link);
}

/**
 * Add custom global shortcuts
 */
function registerShortcuts(): void {
    globalShortcut.register('f12', () => {
        if (win) {
            win.webContents.toggleDevTools();
        }
    });
}

try {
    /**
     * On certificate error we disable default behavior (stop loading the page)
     * and we then say "it is all fine - true" to the callback.
     * This is necessary to develop against self signed certificates
     */
    app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
        if (debug) {
            event.preventDefault();
            callback(true);
        }
    });

    app.on('ready', () => {
        registerShortcuts();

        /**
         * Intercept the file protocol, so we can access the assets folder to
         * call css, js and json files.
         */
        protocol.interceptFileProtocol('file', (request, callback) => {
            /**
             * all urls start with 'file://'
             */
            const url = request.url.substr(7);
            callback({ path: path.normalize(`${__dirname}/dist/${url}`) });
        });

        autoUpdater.checkForUpdatesAndNotify();

        createWindow();
    });

    /**
     * open links in new tab, also works in web views
     */
    app.on('web-contents-created', (e, contents) => {
        contents.on('new-window', async (e, url) => {
            e.preventDefault();
            await openExternal(url);
        });
    });

    // on macOS, closing the window doesn't quit the app
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    console.error(e);
}
