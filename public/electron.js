const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    maximizable: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/../build/index.html`);
  mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
