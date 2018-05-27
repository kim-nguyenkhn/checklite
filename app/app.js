const {app, BrowserWindow, Menu} = require('electron')
const log = require('electron-log')
const {autoUpdater} = require('electron-updater')
const path = require('path')
const url = require('url')

let window = null

// Electron Logging so it makes debugging easier
let updater
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

  // export this to MenuItem click callback
  function checkForUpdates(menuItem, focusedWindow, event) {
    updater = menuItem
    updater.enabled = false
    autoUpdater.checkForUpdates()
  }

  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
  })

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want to update now?',
      buttons: ['Sure', 'No']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
      else {
        updater.enabled = true
        updater = null
      }
    })
  })

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: 'No Updates',
      message: 'Current version is up-to-date.'
    })
    updater.enabled = true
    updater = null
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Install Updates',
      message: 'A new version has been downloaded, do you want to restart now?',
      buttons: ['Sure', 'No']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        setImmediate(() => autoUpdater.quitAndInstall())
      }
      else {
        updater.enabled = true
        updater = null
      }
    })
  })
  
  // Set up the menu
  const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'kim-trang-calendar GitHub',
          click () { require('electron').shell.openExternal('https://github.com/kim-nguyenkhn/kim-trang-calendar') }
        }
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    // OSX - add to the first column
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          label: 'Version ' + app.getVersion(),
          enabled: false
        },
        {
          label: 'Check for Updates',
          click(menuItem, browserWindow, event) { checkForUpdates(menuItem, browserWindow, event) }
        },
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })
  
    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )
  
    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  
  // TEMP: open dev tools
  window.webContents.openDevTools()

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.show()
    
    // Immediately downloads an update, and then installs when the app quits
    autoUpdater.checkForUpdatesAndNotify()
  })
})