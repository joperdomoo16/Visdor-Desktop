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

moduloHistorial["dibujar listado"]();
