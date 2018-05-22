const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

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
