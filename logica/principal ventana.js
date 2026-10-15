const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

function iniciarAplicacionEscritorio() {
  const rutaRaiz = app.getAppPath();
  const rutaHtml = path.join(rutaRaiz, "index.html");

  const ventanaPrincipal = new BrowserWindow({
    title: "Visor Desktop",
    width: 540,
    height: 740,
    center: true,
    show: true,
    backgroundColor: "#0f172a",
    frame: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  ventanaPrincipal.webContents.on("did-fail-load", function (evento, codigo, descripcion) {
    console.error("Falla al cargar pagina:", codigo, descripcion);
  });

  ventanaPrincipal.webContents.on("did-finish-load", function () {
    console.log("Pagina cargada con exito");
    ventanaPrincipal.show();
    ventanaPrincipal.focus();
  });

  ventanaPrincipal.webContents.on("console-message", function (evento, nivel, mensaje, linea) {
    console.log("Mensaje de consola:", mensaje, "linea:", linea);
  });

  ventanaPrincipal.loadFile(rutaHtml);

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
