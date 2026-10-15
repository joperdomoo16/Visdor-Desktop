const moduloInterfaz = {
  "mostrar estado": function (mensaje) {
    const etiqueta = document.getElementById("estado visor");
    etiqueta.textContent = mensaje;
  },
  "mostrar resultado": function (texto) {
    const caja = document.getElementById("texto prediccion");
    caja.textContent = texto;
  },
  "activar vista previa": function (flujo) {
    const area = document.getElementById("area visual");
    const video = document.getElementById("lienzo video");
    area.style.display = "block";
    video.srcObject = flujo;
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

botonCaptura.addEventListener("click", function () {
  moduloCaptura["capturar ventana"]();
});

botonCopiar.addEventListener("click", function () {
  moduloPortapapeles["copiar al sistema"]();
});

document.addEventListener("keydown", function (evento) {
  if (evento.code === "Space" && evento.altKey) {
    evento.preventDefault();
    moduloCaptura["capturar ventana"]();
  }
});
