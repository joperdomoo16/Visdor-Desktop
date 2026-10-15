const { app, BrowserWindow, globalShortcut } = require("electron");

function iniciarAplicacionEscritorio() {
  const ventanaPrincipal = new BrowserWindow({
    width: 500,
    height: 680,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  ventanaPrincipal.setContentProtection(true);
  ventanaPrincipal.loadFile("index.html");

  globalShortcut.register("Alt+Space", function () {
    ventanaPrincipal.webContents.send("orden captura global");
  });
}

app.whenReady().then(function () {
  iniciarAplicacionEscritorio();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
