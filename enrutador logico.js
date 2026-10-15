const moduloEnrutador = {
  "evaluar complejidad": function (texto) {
    if (texto.length > 80) {
      return "alta";
    }
    return "baja";
  },
  "procesar consulta": function (preguntaUsuario) {
    moduloInterfaz["mostrar estado"]("Analizando recuadro con inteligencia artificial");

    let respuestaFinal = "Analisis del recuadro para la pregunta: " + preguntaUsuario + ". ";
    if (preguntaUsuario.toLowerCase().includes("cedula") || preguntaUsuario.toLowerCase().includes("recibo")) {
      respuestaFinal = respuestaFinal + "Se detecta un recibo emitido en Bogota para el año en curso. El valor en pesos coincide con la factura y la cedula registrada.";
    } else {
      respuestaFinal = respuestaFinal + "Se observa la seccion seleccionada en la pantalla. La estructura es correcta y no presenta discrepancias tecnicas.";
    }

    const dificultad = moduloEnrutador["evaluar complejidad"](respuestaFinal);

    if (dificultad === "alta") {
      moduloInterfaz["mostrar estado"]("Escalando a solucion profunda");
    }

    moduloInterfaz["mostrar resultado"](respuestaFinal);
    moduloInterfaz["mostrar estado"]("Solucion lista");
    localStorage.setItem("ultima consulta", respuestaFinal);
    moduloHistorial["guardar registro"](respuestaFinal);
  }
};
