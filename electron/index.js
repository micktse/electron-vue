const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
ipcMain.on('test', event => {
	event.sender.send('test', 'test ipc success')
})
let mainWindow
function createWindow() {
	let { screen } = require('electron')
	let width = parseInt(screen.getPrimaryDisplay().workArea.width * 0.8)
	let height = parseInt((width / 16) * 9)
	mainWindow = new BrowserWindow({
		width,
		height,
		title: 'Sureking',
		webPreferences: {
			nodeIntegration: true,
			javascript: true,
			preload: path.join(__dirname, './renderer.js')
		}
	})
	const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/app/index.html`
	mainWindow.loadURL(winURL)
	if (process.env.NODE_ENV === 'development') {
		BrowserWindow.addDevToolsExtension(`${__dirname}/vue-devtools`)
		mainWindow.webContents.openDevTools()
	}
	mainWindow.on('closed', function() {
		mainWindow = null
	})
}
app.on('ready', createWindow)

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function() {
	if (mainWindow === null) {
		createWindow()
	}
})
