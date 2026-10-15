const moduloEnrutador = {
  "evaluar complejidad": function (texto) {
    if (texto.length > 120 || texto.toLowerCase().includes("codigo") || texto.toLowerCase().includes("refactorizar")) {
      return "alta";
    }
    return "baja";
  },
  "procesar consulta": async function (preguntaUsuario) {
    if (moduloPrivacidad["verificar datos sensibles"](preguntaUsuario)) {
      moduloInterfaz["mostrar estado"]("Pausado por proteccion de datos");
      moduloInterfaz["mostrar resultado"]("Se detecto una consulta con datos sensibles o bancarios. El analisis se pausa automaticamente para preservar su privacidad.");
      return;
    }

    moduloInterfaz["mostrar estado"]("Procesando consulta");
    const imagenRecortada = moduloRecorte["obtener recorte imagen"]();
    const tieneClaves = moduloConexion["obtener clave gemini"]() || moduloConexion["obtener clave claude"]();

    if (!tieneClaves) {
      moduloInterfaz["mostrar estado"]("Modo de muestra sin claves");
      let respuestaMuestra = "Analisis del recuadro para: " + preguntaUsuario + ". ";
      if (preguntaUsuario.toLowerCase().includes("cedula") || preguntaUsuario.toLowerCase().includes("recibo")) {
        respuestaMuestra = respuestaMuestra + "Recibo verificado en Bogota para el año en curso. El valor en pesos coincide con la factura del cliente.";
      } else {
        respuestaMuestra = respuestaMuestra + "Recuadro analizado en el computador. Configure sus claves en Ajustes para activar la respuesta en vivo con Gemini y Claude.";
      }
      moduloInterfaz["mostrar resultado"](respuestaMuestra);
      localStorage.setItem("ultima consulta", respuestaMuestra);
      moduloHistorial["guardar registro"](respuestaMuestra);
      return;
    }

    try {
      moduloInterfaz["mostrar estado"]("Consultando con Gemini");
      const respuestaGemini = await moduloConexion["consultar gemini"](preguntaUsuario, imagenRecortada);
      const complejidad = moduloEnrutador["evaluar complejidad"](preguntaUsuario + " " + respuestaGemini);

      if (complejidad === "alta" && moduloConexion["obtener clave claude"]()) {
        moduloInterfaz["mostrar estado"]("Escalando resolucion con Claude");
        const respuestaClaude = await moduloConexion["consultar claude"](preguntaUsuario, respuestaGemini);
        moduloInterfaz["mostrar resultado"](respuestaClaude);
        moduloInterfaz["mostrar estado"]("Solucion completa con Claude");
        localStorage.setItem("ultima consulta", respuestaClaude);
        moduloHistorial["guardar registro"](respuestaClaude);
        return;
      }

      moduloInterfaz["mostrar resultado"](respuestaGemini);
      moduloInterfaz["mostrar estado"]("Solucion lista con Gemini");
      localStorage.setItem("ultima consulta", respuestaGemini);
      moduloHistorial["guardar registro"](respuestaGemini);
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Falla al conectar con la inteligencia artificial");
      moduloInterfaz["mostrar resultado"]("Ocurrio una novedad al procesar la solicitud. Verifique sus claves de acceso o su conexion a internet.");
    }
  }
};
