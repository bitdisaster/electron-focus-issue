const packager = require('electron-packager')


const bla = async () => {
  const appPaths = await packager({
    dir: "..\\",
    executableName: 'notificationTest',
    name: 'test',
    appVersion: '1.0.0',
    electronVersion: '16.0.7',
    win32metadata: {
      CompanyName: 'Cyberdyne'
    }
  });
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`)
}


bla();
console.log('###');