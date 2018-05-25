const {app, BrowserWindow, Menu} = require('electron')
const log = require('electron-log')
const {autoUpdater} = require('electron-updater')
const path = require('path')
const url = require('url')

let window = null

// Electron Logging so it makes debugging easier
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width
    width: 800,
    // Set the initial height
    height: 600,
    // set the title bar style
    titleBarStyle: 'hidden-inset',
    // set the background color to black
    backgroundColor: "#EEE",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  })
  
  // Set up the menu
  let template = []
  if (process.platform === 'darwin') {
    // OS X
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'Version ' + app.getVersion(),
          role: 'about'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        },
      ]
    })
  }
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  
  // TEMP: open dev tools
  // window.webContents.openDevTools()

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.show()
  })
})


// Auto updates
function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

// Immediately downloads an update, and then installs when the app quits
app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});