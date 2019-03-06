const electron = require('electron');
const app =  electron.app;
const BrowserWindow = electron.BrowserWindow;
// const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

//init win
let win;

function createWindow(){
	//create browser windows
	win = new BrowserWindow({with:800,height:600, icon:__dirname+'/img/icon.jpg'});
	//load index.html
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/html/index.html'),
		protocol: 'file',
		slashes: true
	}));

	//win.maximize();
	win.setFullScreen(true);
	//open devtools
	//win.webContents.openDevTools();

	win.on('closed',()=>{
		win = null;
	});

}

// run create window funtion
app.on('ready',createWindow);

app.on('window-all-closed',()=>{
	if(process.platform !== 'darwin'){
		app.quit();
	}
});
