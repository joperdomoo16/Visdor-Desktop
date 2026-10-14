const moduloInterfaz = {
  "mostrar estado": function (mensaje) {
    const etiqueta = document.getElementById("estado visor");
    etiqueta.textContent = mensaje;
  },
  "mostrar resultado": function (texto) {
    const caja = document.getElementById("texto prediccion");
    caja.textContent = texto;
  }
};

const moduloPortapapeles = {
  "copiar al sistema": function () {
    const caja = document.getElementById("texto prediccion");
    navigator.clipboard.writeText(caja.textContent);
    moduloInterfaz["mostrar estado"]("Copiado con exito");
  }
};

const moduloEnrutador = {
  "evaluar complejidad": function (texto) {
    if (texto.length > 80) {
      return "alta";
    }
    return "baja";
  },
  "procesar consulta": function () {
    moduloInterfaz["mostrar estado"]("Analizando con modelo rapido");
    const diagnostico = "Recibo y cedula verificados en Bogota para el año en curso. El valor en pesos coincide con la factura del cliente.";
    const dificultad = moduloEnrutador["evaluar complejidad"](diagnostico);

    if (dificultad === "alta") {
      moduloInterfaz["mostrar estado"]("Escalando a solucion profunda");
    }

    moduloInterfaz["mostrar resultado"](diagnostico);
    moduloInterfaz["mostrar estado"]("Solucion lista");
  }
};

const moduloCaptura = {
  "capturar ventana": function () {
    moduloInterfaz["mostrar estado"]("Obteniendo ventana activa");
    moduloEnrutador["procesar consulta"]();
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
