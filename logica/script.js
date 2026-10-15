const botonCaptura = document.getElementById("boton capturar");
const botonCopiar = document.getElementById("boton copiar");
const botonConsultar = document.getElementById("boton consultar");
const campoConsulta = document.getElementById("campo consulta");
const botonAjustes = document.getElementById("boton panel ajustes");
const botonPersonalizacion = document.getElementById("boton panel personalizacion");
const botonGuardarClaves = document.getElementById("boton guardar claves");
const botonCerrar = document.getElementById("boton cerrar ventana");
const botonAlternarDialogo = document.getElementById("boton alternar dialogo");

const botonVozPrimera = document.getElementById("boton voz primera");
const botonVozSegunda = document.getElementById("boton voz segunda");
const botonVozTercera = document.getElementById("boton voz tercera");

botonVozPrimera.addEventListener("click", function () {
  moduloPersonalizacion["grabar respuesta voz"]("primera");
});

botonVozSegunda.addEventListener("click", function () {
  moduloPersonalizacion["grabar respuesta voz"]("segunda");
});

botonVozTercera.addEventListener("click", function () {
  moduloPersonalizacion["grabar respuesta voz"]("tercera");
});

botonAlternarDialogo.addEventListener("click", function () {
  if (moduloEscucha["activo"]) {
    moduloEscucha["detener escucha"]();
  } else {
    moduloEscucha["iniciar escucha"]();
  }
});

botonCerrar.addEventListener("click", function () {
  window.close();
});

botonAjustes.addEventListener("click", function () {
  moduloInterfaz["alternar panel ajustes"]();
});

botonPersonalizacion.addEventListener("click", function () {
  moduloInterfaz["alternar panel personalizacion"]();
});

botonGuardarClaves.addEventListener("click", function () {
  const claveGemini = document.getElementById("campo clave gemini").value.trim();
  const claveClaude = document.getElementById("campo clave claude").value.trim();
  moduloAlmacenamiento["guardar claves"](claveGemini, claveClaude);
  moduloInterfaz["mostrar estado"]("Claves guardadas con éxito");
  moduloInterfaz["alternar panel ajustes"]();
});

botonCaptura.addEventListener("click", function () {
  moduloCaptura["capturar ventana"]();
});

botonCopiar.addEventListener("click", function () {
  moduloInterfaz["copiar solucion al portapapeles"]();
});

botonConsultar.addEventListener("click", function () {
  const pregunta = campoConsulta.value.trim();
  if (!moduloValidaciones["validar texto no vacio"](pregunta)) {
    moduloInterfaz["mostrar estado"]("Escriba una pregunta para continuar");
    return;
  }
  moduloEnrutador["procesar consulta"](pregunta);
  moduloInterfaz["limpiar campo consulta"]();
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

moduloInterfaz["renderizar historial"]();
