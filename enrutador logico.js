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
    localStorage.setItem("ultima consulta", diagnostico);
  }
};
