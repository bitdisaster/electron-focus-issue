// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow;

const toastXML = `<toast launch="testNotif://bla" activationType="protocol">
<visual>
  <binding template="ToastGeneric">
    <text>My test app using protocol</text>
  </binding>
</visual>
</toast>`;

const prepNotifications = () => {
  const {shell} = require('electron')
  app.setAppUserModelId('slack.notification.test');
  const shortcutPath = app.getPath('appData') + "\\Microsoft\\Windows\\Start Menu\\Programs\\testNotif.lnk"
  shell.writeShortcutLink(shortcutPath, 'create', {target: app.getPath("exe"), appUserModelId: 'slack.notification.test' });
  app.setAsDefaultProtocolClient('testNotif');
}

const popNotification = () =>
{
  const { Notification } = require('electron');
  const notification = new Notification({ toastXml: toastXML });
  notification.show();
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.on('blur', () => {
    console.log('BLUR');
  });
  mainWindow.on('focus', () => {
    console.log('FOCUS')
  });


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const focusApp = () => {
  if (mainWindow) {
    // this should be enough to get focus
    mainWindow.focus();

    // even these  desperate attempts to focus the window fail
    const { exec } = require('child_process');
    const cp = exec('%windir%\\System32\\rundll32.exe shell32.dll,Control_RunDLL');
    cp.unref();
    mainWindow.setEnabled(false);
    mainWindow.setEnabled(true);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setAlwaysOnTop(false);
    mainWindow.focus();
    mainWindow.blur();
  }
}


if(app.requestSingleInstanceLock({}) === false){
  app.exit()
 } else {
 

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    prepNotifications();
    createWindow();
    popNotification();

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('second-instance', (session, argv, wdir, data) => {
    focusApp();
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
