const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win

function createWindow () {
  win = new BrowserWindow({width: 600, height: 300});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    icon: __dirname + '/assets.icon.png',
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

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
