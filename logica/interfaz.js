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

  "limpiar campo consulta": function () {
    const campo = document.getElementById("campo consulta");
    campo.value = "";
  },

  "activar indicador escucha": function (activo) {
    const indicador = document.getElementById("indicador escucha");
    const boton = document.getElementById("boton alternar dialogo");
    if (activo) {
      indicador.className = "etiqueta escucha activa";
      indicador.textContent = "Escuchando en vivo";
      boton.textContent = "Pausar diálogo";
    } else {
      indicador.className = "etiqueta escucha";
      indicador.textContent = "Modo diálogo inactivo";
      boton.textContent = "Iniciar diálogo";
    }
  },

  "actualizar respuesta grabada": function (identificadorPregunta, texto) {
    const elemento = document.getElementById("muestra respuesta " + identificadorPregunta);
    if (elemento) {
      elemento.textContent = texto;
    }
  },

  "alternar panel ajustes": function () {
    const panel = document.getElementById("area ajustes");
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
      document.getElementById("campo clave gemini").value = moduloAlmacenamiento["obtener clave gemini"]();
      document.getElementById("campo clave claude").value = moduloAlmacenamiento["obtener clave claude"]();
    }
  },

  "alternar panel personalizacion": function () {
    const panel = document.getElementById("area personalizacion");
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  },

  "renderizar historial": function () {
    const contenedor = document.getElementById("listado historial");
    if (!contenedor) {
      return;
    }
    contenedor.innerHTML = "";
    const registros = moduloAlmacenamiento["obtener registros historial"]();
    for (const item of registros) {
      const fila = document.createElement("div");
      fila.className = "elemento historial";
      fila.textContent = item.fecha + " - " + item.detalle;
      fila.addEventListener("click", function () {
        moduloInterfaz["mostrar resultado"](item.detalle);
        moduloInterfaz["mostrar estado"]("Registro recuperado con éxito");
      });
      contenedor.appendChild(fila);
    }
  },

  "copiar solucion al portapapeles": function () {
    const caja = document.getElementById("texto prediccion");
    navigator.clipboard.writeText(caja.textContent);
    moduloInterfaz["mostrar estado"]("Copiado con éxito al portapapeles");
  }
};
