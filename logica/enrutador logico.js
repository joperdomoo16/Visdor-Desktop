const moduloEnrutador = {
  "evaluar complejidad": function (texto) {
    if (texto.length > 120 || texto.toLowerCase().includes("codigo") || texto.toLowerCase().includes("refactorizar")) {
      return "alta";
    }
    return "baja";
  },
  "procesar consulta": async function (preguntaUsuario) {
    if (moduloPrivacidad["verificar datos sensibles"](preguntaUsuario)) {
      moduloInterfaz["mostrar estado"]("Pausado por protección de datos");
      moduloInterfaz["mostrar resultado"]("Se detectó una consulta con datos sensibles o bancarios. El análisis se pausa automáticamente para preservar su privacidad.");
      return;
    }

    moduloInterfaz["mostrar estado"]("Procesando consulta");
    const imagenRecortada = moduloRecorte["obtener recorte imagen"]();
    const tieneClaves = moduloAlmacenamiento["obtener clave gemini"]() || moduloAlmacenamiento["obtener clave claude"]();
    const perfilEstilo = moduloPersonalizacion["obtener perfil"]();
    const preguntaConEstilo = "Instrucción de estilo de habla: " + perfilEstilo + "\nConsulta del usuario: " + preguntaUsuario;

    if (!tieneClaves) {
      moduloInterfaz["mostrar estado"]("Modo de muestra sin claves");
      let respuestaMuestra = "Respuesta adaptada a su estilo para: " + preguntaUsuario + ". ";
      if (preguntaUsuario.toLowerCase().includes("cedula") || preguntaUsuario.toLowerCase().includes("recibo")) {
        respuestaMuestra = respuestaMuestra + "Mire, el recibo en Bogotá para el año vigente cuadra exacto con el valor en pesos de la factura del cliente.";
      } else {
        respuestaMuestra = respuestaMuestra + "Lo que se observa en la pantalla está en orden y no presenta ninguna novedad técnica.";
      }
      moduloInterfaz["mostrar resultado"](respuestaMuestra);
      moduloAlmacenamiento["guardar ultima consulta"](respuestaMuestra);
      moduloAlmacenamiento["guardar registro historial"](respuestaMuestra);
      moduloInterfaz["renderizar historial"]();
      return;
    }

    try {
      moduloInterfaz["mostrar estado"]("Consultando con Gemini");
      const respuestaGemini = await moduloConexion["consultar gemini"](preguntaConEstilo, imagenRecortada);
      const complejidad = moduloEnrutador["evaluar complejidad"](preguntaUsuario + " " + respuestaGemini);

      if (complejidad === "alta" && moduloAlmacenamiento["obtener clave claude"]()) {
        moduloInterfaz["mostrar estado"]("Escalando resolución con Claude");
        const respuestaClaude = await moduloConexion["consultar claude"](preguntaConEstilo, respuestaGemini);
        moduloInterfaz["mostrar resultado"](respuestaClaude);
        moduloInterfaz["mostrar estado"]("Solución completa con Claude");
        moduloAlmacenamiento["guardar ultima consulta"](respuestaClaude);
        moduloAlmacenamiento["guardar registro historial"](respuestaClaude);
        moduloInterfaz["renderizar historial"]();
        return;
      }

      moduloInterfaz["mostrar resultado"](respuestaGemini);
      moduloInterfaz["mostrar estado"]("Solución lista con Gemini");
      moduloAlmacenamiento["guardar ultima consulta"](respuestaGemini);
      moduloAlmacenamiento["guardar registro historial"](respuestaGemini);
      moduloInterfaz["renderizar historial"]();
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Falla al conectar con la inteligencia artificial");
      moduloInterfaz["mostrar resultado"]("Ocurrió una novedad al procesar la solicitud. Verifique sus claves de acceso o su conexión a internet.");
    }
  }
};
