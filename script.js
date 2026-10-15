const moduloInterfaz = {
  "mostrar estado": function (mensaje) {
    const etiqueta = document.getElementById("estado visor");
    etiqueta.textContent = mensaje;
  },
  "mostrar resultado": function (texto) {
    const caja = document.getElementById("texto prediccion");
    caja.textContent = texto;
  },
  "mostrar orientacion": function (indicacion) {
    const elemento = document.getElementById("texto orientacion");
    elemento.textContent = indicacion;
  },
  "mostrar campo pregunta": function () {
    const bloque = document.getElementById("area pregunta");
    bloque.style.display = "block";
    const campo = document.getElementById("campo consulta");
    campo.focus();
  },
  "alternar panel ajustes": function () {
    const panel = document.getElementById("area ajustes");
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
      document.getElementById("campo clave gemini").value = moduloConexion["obtener clave gemini"]();
      document.getElementById("campo clave claude").value = moduloConexion["obtener clave claude"]();
    }
  }
};

const moduloPortapapeles = {
  "copiar al sistema": function () {
    const caja = document.getElementById("texto prediccion");
    navigator.clipboard.writeText(caja.textContent);
    moduloInterfaz["mostrar estado"]("Copiado con exito");
  }
};

const botonCaptura = document.getElementById("boton capturar");
const botonCopiar = document.getElementById("boton copiar");
const botonConsultar = document.getElementById("boton consultar");
const campoConsulta = document.getElementById("campo consulta");
const botonAjustes = document.getElementById("boton panel ajustes");
const botonGuardarClaves = document.getElementById("boton guardar claves");
const botonCerrar = document.getElementById("boton cerrar ventana");

botonCerrar.addEventListener("click", function () {
  window.close();
});

botonAjustes.addEventListener("click", function () {
  moduloInterfaz["alternar panel ajustes"]();
});

botonGuardarClaves.addEventListener("click", function () {
  const claveGemini = document.getElementById("campo clave gemini").value.trim();
  const claveClaude = document.getElementById("campo clave claude").value.trim();
  moduloConexion["guardar claves"](claveGemini, claveClaude);
  moduloInterfaz["mostrar estado"]("Claves guardadas con exito");
  moduloInterfaz["alternar panel ajustes"]();
});

botonCaptura.addEventListener("click", function () {
  moduloCaptura["capturar ventana"]();
});

botonCopiar.addEventListener("click", function () {
  moduloPortapapeles["copiar al sistema"]();
});

botonConsultar.addEventListener("click", function () {
  const pregunta = campoConsulta.value.trim();
  if (pregunta.length === 0) {
    moduloInterfaz["mostrar estado"]("Escriba una pregunta para continuar");
    return;
  }
  moduloEnrutador["procesar consulta"](pregunta);
  campoConsulta.value = "";
});

campoConsulta.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    botonConsultar.click();
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.code === "Space" && evento.altKey) {
    evento.preventDefault();
    moduloCaptura["capturar ventana"]();
  }
});

try {
  const electron = require("electron");
  electron.ipcRenderer.on("orden captura global", function () {
    moduloCaptura["capturar ventana"]();
  });
} catch (error) {
  // Entorno sin ipc activo
}

moduloHistorial["dibujar listado"]();
