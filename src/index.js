const { app, BrowserWindow, Menu, MenuItem, nativeTheme } = require('electron');
const path = require('node:path');

// Ventana principal
let mainWindow = {};

// Main Menu Templates
const templateMenu = [];

if (!app.isPackaged) {
	// Developer Tools in Development Environment
	templateMenu.push({
		label: "DevTools",
		submenu: [
			{
				label: "Show/Hide Dev Tools",
				accelerator: process.platform == "darwin" ? "Comand+D" : "Ctrl+D",
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: "reload"
			}
		]
	});
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 350,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Load icon
	mainWindow.setIcon(path.join(__dirname, '../assets/img/icon.png'));

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'app/index.html'));

    // Menu
	const mainMenu = Menu.buildFromTemplate(templateMenu);
	// Set The Menu to the Main Window
	Menu.setApplicationMenu(mainMenu);

	// ContextMenu
	const ctxMenu = new Menu();
	ctxMenu.append(new MenuItem({
		label: 'Copiar',
		role: 'copy',
		icon: path.join(__dirname, "../assets/img/copy_16.png"),
		click: () => {
			console.log('Copiado!')
		}
	}));
    // Set ContextMenu
	mainWindow.webContents.on('context-menu',(e, params) => {
	  ctxMenu.popup(mainWindow, params.x, params.y)
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
