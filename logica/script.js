const botonAbrirAjustes = document.getElementById("boton abrir ajustes");
const botonVolverPrincipal = document.getElementById("boton volver principal");
const botonCerrarVentana = document.getElementById("boton cerrar ventana");
const botonCerrarAjustes = document.getElementById("boton cerrar ajustes");

const botonPestanaEstilo = document.getElementById("pestana estilo");
const botonPestanaClaves = document.getElementById("pestana claves");
const botonPestanaHistorial = document.getElementById("pestana historial");
const botonPestanaGeneral = document.getElementById("pestana general");

const conmutadorEstilo = document.getElementById("conmutador estilo");
const conmutadorProteccion = document.getElementById("conmutador proteccion");
const selectorCiudad = document.getElementById("selector ciudad");

const botonVozPrimera = document.getElementById("boton voz primera");
const botonVozSegunda = document.getElementById("boton voz segunda");
const botonVozTercera = document.getElementById("boton voz tercera");

const botonGuardarClaves = document.getElementById("boton guardar claves");
const botonVaciarHistorial = document.getElementById("boton vaciar historial");
const botonCancelarVaciar = document.getElementById("boton cancelar vaciar");
const botonConfirmarVaciar = document.getElementById("boton confirmar vaciar");

const botonAlternarDialogo = document.getElementById("boton alternar dialogo");
const botonCapturar = document.getElementById("boton capturar");
const botonCancelarCaptura = document.getElementById("boton cancelar captura");

const botonConsultar = document.getElementById("boton consultar");
const campoConsulta = document.getElementById("campo consulta");

const botonEnviarVivo = document.getElementById("boton enviar vivo");
const campoEntradaVivo = document.getElementById("campo entrada vivo");

const botonCopiar = document.getElementById("boton copiar");
const botonDescartar = document.getElementById("boton descartar");

if (botonAbrirAjustes) {
  botonAbrirAjustes.addEventListener("click", function () {
    moduloInterfaz["alternar vista ajustes"](true);
  });
}

if (botonVolverPrincipal) {
  botonVolverPrincipal.addEventListener("click", function () {
    moduloInterfaz["alternar vista ajustes"](false);
  });
}

if (botonCerrarVentana) {
  botonCerrarVentana.addEventListener("click", function () {
    window.close();
  });
}

if (botonCerrarAjustes) {
  botonCerrarAjustes.addEventListener("click", function () {
    window.close();
  });
}

if (botonPestanaEstilo) {
  botonPestanaEstilo.addEventListener("click", function () {
    moduloInterfaz["cambiar pestana"]("estilo");
  });
}

if (botonPestanaClaves) {
  botonPestanaClaves.addEventListener("click", function () {
    moduloInterfaz["cambiar pestana"]("claves");
  });
}

if (botonPestanaHistorial) {
  botonPestanaHistorial.addEventListener("click", function () {
    moduloInterfaz["cambiar pestana"]("historial");
  });
}

if (botonPestanaGeneral) {
  botonPestanaGeneral.addEventListener("click", function () {
    moduloInterfaz["cambiar pestana"]("general");
  });
}

if (conmutadorEstilo) {
  conmutadorEstilo.addEventListener("click", function () {
    const estadoActual = moduloAlmacenamiento["obtener estilo activo"]();
    const nuevoEstado = !estadoActual;
    moduloAlmacenamiento["guardar estilo activo"](nuevoEstado);
    moduloInterfaz["actualizar conmutador estilo"](nuevoEstado);
  });
}

if (conmutadorProteccion) {
  conmutadorProteccion.addEventListener("click", function () {
    const estadoActual = moduloAlmacenamiento["obtener proteccion"]();
    const nuevoEstado = !estadoActual;
    moduloAlmacenamiento["guardar proteccion"](nuevoEstado);
    moduloInterfaz["actualizar conmutador proteccion"](nuevoEstado);
  });
}

if (selectorCiudad) {
  selectorCiudad.addEventListener("change", function () {
    moduloAlmacenamiento["guardar ciudad"](selectorCiudad.value);
  });
}

if (botonVozPrimera) {
  botonVozPrimera.addEventListener("click", function () {
    moduloPersonalizacion["alternar grabacion voz"]("primera");
  });
}

if (botonVozSegunda) {
  botonVozSegunda.addEventListener("click", function () {
    moduloPersonalizacion["alternar grabacion voz"]("segunda");
  });
}

if (botonVozTercera) {
  botonVozTercera.addEventListener("click", function () {
    moduloPersonalizacion["alternar grabacion voz"]("tercera");
  });
}

if (botonGuardarClaves) {
  botonGuardarClaves.addEventListener("click", function () {
    const claveGemini = document.getElementById("campo clave gemini").value.trim();
    const claveClaude = document.getElementById("campo clave claude").value.trim();
    moduloAlmacenamiento["guardar claves"](claveGemini, claveClaude);
    moduloInterfaz["mostrar estado"]("Claves guardadas", "Las credenciales han quedado registradas en este computador.", "punto verde");
    moduloInterfaz["alternar vista ajustes"](false);
  });
}

if (botonVaciarHistorial) {
  botonVaciarHistorial.addEventListener("click", function () {
    moduloInterfaz["mostrar confirmacion vaciar"](true);
  });
}

if (botonCancelarVaciar) {
  botonCancelarVaciar.addEventListener("click", function () {
    moduloInterfaz["mostrar confirmacion vaciar"](false);
  });
}

if (botonConfirmarVaciar) {
  botonConfirmarVaciar.addEventListener("click", function () {
    moduloAlmacenamiento["limpiar historial"]();
    moduloInterfaz["mostrar confirmacion vaciar"](false);
    moduloInterfaz["renderizar historial"]();
    moduloInterfaz["mostrar estado"]("Historial eliminado", "Todas las consultas previas fueron removidas.", "punto verde");
  });
}

if (botonAlternarDialogo) {
  botonAlternarDialogo.addEventListener("click", function () {
    if (moduloEscucha["activo"]) {
      moduloEscucha["detener escucha"]();
    } else {
      moduloEscucha["iniciar escucha"]();
    }
  });
}

if (botonCapturar) {
  botonCapturar.addEventListener("click", function () {
    if (moduloEscucha["activo"]) {
      moduloEscucha["detener escucha"]();
    }
    moduloCaptura["capturar ventana"]();
  });
}

if (botonCancelarCaptura) {
  botonCancelarCaptura.addEventListener("click", function () {
    moduloCaptura["cancelar captura"]();
  });
}

if (botonConsultar) {
  botonConsultar.addEventListener("click", function () {
    const pregunta = campoConsulta.value.trim();
    if (!moduloValidaciones["validar texto no vacio"](pregunta)) {
      moduloInterfaz["mostrar estado"]("Pregunta requerida", "Escriba una consulta para analizar la zona recortada.", "punto azul");
      return;
    }
    moduloEnrutador["procesar consulta"](pregunta);
    moduloInterfaz["limpiar campo consulta"]();
  });
}

if (campoConsulta) {
  campoConsulta.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      botonConsultar.click();
    }
  });
}

if (botonEnviarVivo) {
  botonEnviarVivo.addEventListener("click", function () {
    const texto = campoEntradaVivo.value.trim();
    if (!texto) {
      return;
    }
    campoEntradaVivo.value = "";
    const elementoRespuesta = moduloInterfaz["agregar mensaje vivo"](texto, "texto", null, false);
    moduloCaptura["capturar fotograma instantaneo"](function () {
      moduloEnrutador["procesar consulta vivo"](texto, elementoRespuesta);
    });
  });
}

if (campoEntradaVivo) {
  campoEntradaVivo.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      botonEnviarVivo.click();
    }
  });
}

if (botonCopiar) {
  botonCopiar.addEventListener("click", function () {
    moduloInterfaz["copiar solucion al portapapeles"]();
  });
}

if (botonDescartar) {
  botonDescartar.addEventListener("click", function () {
    moduloInterfaz["limpiar respuesta"]();
    moduloInterfaz["mostrar estado"]("Listo", "Inicie un diálogo para preguntar en voz alta o capture una zona de la pantalla.", "punto verde");
  });
}

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
moduloInterfaz["actualizar conmutador estilo"](moduloAlmacenamiento["obtener estilo activo"]());
moduloInterfaz["actualizar conmutador proteccion"](moduloAlmacenamiento["obtener proteccion"]());
