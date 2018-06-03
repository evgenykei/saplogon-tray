const { app, Menu, Tray, dialog, MenuItem, ipcRenderer } = require('electron');
var child_process = require('child_process');
var fs = require("fs");
const electron = require('electron');
//-----------------------------------------------------------------------------------
var vExecutablePath = "C:\\Program Files (x86)\\SAP\\FrontEnd\\SAPgui\\sapshcut.exe ";
var tray = null
//----------------------------------------------------------------------------------
app.on('ready', () => {
  tray = new Tray('./media/sap_logon_icon.png');
  const contextMenu = Menu.buildFromTemplate([
    { type: 'separator' },
    {
      label: 'Выход',
      click() {
        app.quit();
      }
    },
    {
      label: 'О программе',
      click() {
        electron.dialog.showMessageBox({
          title: "SAP Logon Tray",
          message: "SAP Logon in your tray. \nCopyright (c) 2018 Kalinogorskiy Evgeniy",
          buttons: ["Close"],
          icon: "./media/sap_logon_icon.png"
        }
        );
      }
    }
  ])
  var settingsdata = fs.readFileSync('./settings.json');
  const jsonContent = JSON.parse(settingsdata);
  for (let i = 0; i < jsonContent.length; i++) {
    console.log(jsonContent[i].parameters);
    contextMenu.insert(0, new MenuItem({
      label: jsonContent[i].label,
      click(MenuItem) {
        child_process.execFileSync(vExecutablePath, jsonContent[i].parameters);
      },
    }))
  }
  tray.setToolTip('SAP Logon Tray ');
  tray.setContextMenu(contextMenu);
})