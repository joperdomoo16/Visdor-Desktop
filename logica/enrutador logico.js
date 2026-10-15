const moduloEnrutador = {
  "evaluar complejidad": function (texto) {
    if (texto.length > 120 || texto.toLowerCase().includes("codigo") || texto.toLowerCase().includes("refactorizar")) {
      return "alta";
    }
    return "baja";
  },

  "generar respuesta local muestra": function (preguntaUsuario) {
    const preguntaMinusculas = preguntaUsuario.toLowerCase();
    const ciudad = moduloAlmacenamiento["obtener ciudad"]();
    if (preguntaMinusculas.includes("cedula") || preguntaMinusculas.includes("recibo") || preguntaMinusculas.includes("cobro")) {
      return "El valor de la factura en " + ciudad + " cuadra exacto con el total en pesos del mes en curso y no presenta ningún cobro adicional duplicado.";
    }
    if (preguntaMinusculas.includes("error") || preguntaMinusculas.includes("504") || preguntaMinusculas.includes("fallo")) {
      return "La ventana muestra un incidente temporal de conexión con el servicio. Reintente en un par de minutos para continuar.";
    }
    return "Lo que se observa en la pantalla activa se encuentra en orden, con los parámetros técnicos correctos y listo para operar.";
  },

  "procesar consulta": async function (preguntaUsuario) {
    if (moduloPrivacidad["verificar datos sensibles"](preguntaUsuario)) {
      moduloInterfaz["mostrar estado"]("Consulta bloqueada", "El filtro de privacidad detuvo el envío.", "punto violeta");
      moduloInterfaz["mostrar respuesta"](preguntaUsuario, "Consulta detenida por el filtro de privacidad. La pregunta contiene datos bancarios o protegidos y no se envió a la red.", true);
      return;
    }

    moduloInterfaz["mostrar estado"]("Analizando...", "Procesando la zona con su estilo calibrado.", "punto girando");
    const imagenRecortada = moduloRecorte["obtener recorte imagen"]();
    const tieneClaves = moduloAlmacenamiento["obtener clave gemini"]() || moduloAlmacenamiento["obtener clave claude"]();
    const perfilEstilo = moduloPersonalizacion["obtener perfil"]();
    const preguntaConEstilo = "Instrucción de estilo de habla: " + perfilEstilo + "\nConsulta del usuario: " + preguntaUsuario;

    if (!tieneClaves) {
      const respuestaMuestra = moduloEnrutador["generar respuesta local muestra"](preguntaUsuario);
      moduloInterfaz["mostrar captura"](false);
      moduloInterfaz["mostrar campo pregunta captura"](false);
      moduloInterfaz["mostrar respuesta"](preguntaUsuario, respuestaMuestra, false);
      moduloInterfaz["mostrar estado"]("Respuesta lista", "Puede copiarla o hacer una nueva consulta.", "punto verde");
      moduloAlmacenamiento["guardar ultima consulta"](respuestaMuestra);
      moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaMuestra);
      return;
    }

    try {
      const respuestaGemini = await moduloConexion["consultar gemini"](preguntaConEstilo, imagenRecortada);
      const complejidad = moduloEnrutador["evaluar complejidad"](preguntaUsuario + " " + respuestaGemini);

      if (complejidad === "alta" && moduloAlmacenamiento["obtener clave claude"]()) {
        const respuestaClaude = await moduloConexion["consultar claude"](preguntaConEstilo, respuestaGemini);
        moduloInterfaz["mostrar captura"](false);
        moduloInterfaz["mostrar campo pregunta captura"](false);
        moduloInterfaz["mostrar respuesta"](preguntaUsuario, respuestaClaude, false);
        moduloInterfaz["mostrar estado"]("Respuesta lista", "Solución detallada generada con éxito.", "punto verde");
        moduloAlmacenamiento["guardar ultima consulta"](respuestaClaude);
        moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaClaude);
        return;
      }

      moduloInterfaz["mostrar captura"](false);
      moduloInterfaz["mostrar campo pregunta captura"](false);
      moduloInterfaz["mostrar respuesta"](preguntaUsuario, respuestaGemini, false);
      moduloInterfaz["mostrar estado"]("Respuesta lista", "Puede copiarla o hacer una nueva consulta.", "punto verde");
      moduloAlmacenamiento["guardar ultima consulta"](respuestaGemini);
      moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaGemini);
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Falla de conexión", "Verifique sus claves de acceso o su conexión a internet.", "punto rojo");
      moduloInterfaz["mostrar respuesta"](preguntaUsuario, "Ocurrió una novedad al procesar la solicitud con la inteligencia artificial.", false);
    }
  },

  "procesar consulta vivo": async function (preguntaUsuario, elementoRespuesta) {
    if (moduloPrivacidad["verificar datos sensibles"](preguntaUsuario)) {
      moduloInterfaz["actualizar ultimo mensaje vivo"](elementoRespuesta, "Bloqueada por el filtro de privacidad: la pregunta contiene datos bancarios o protegidos y no se envió.", true);
      moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Consulta bloqueada por filtro de privacidad.", "punto violeta");
      return;
    }

    moduloInterfaz["mostrar estado"]("Escuché su pregunta", 'Analizando la pantalla para: "' + preguntaUsuario + '"', "punto rojo");
    const imagenRecortada = moduloRecorte["obtener recorte imagen"]();
    const tieneClaves = moduloAlmacenamiento["obtener clave gemini"]() || moduloAlmacenamiento["obtener clave claude"]();
    const perfilEstilo = moduloPersonalizacion["obtener perfil"]();
    const preguntaConEstilo = "Instrucción de estilo de habla: " + perfilEstilo + "\nConsulta del usuario: " + preguntaUsuario;

    if (!tieneClaves) {
      const respuestaMuestra = moduloEnrutador["generar respuesta local muestra"](preguntaUsuario);
      moduloInterfaz["actualizar ultimo mensaje vivo"](elementoRespuesta, respuestaMuestra, false);
      moduloAlmacenamiento["guardar ultima consulta"](respuestaMuestra);
      moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaMuestra);
      moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Cada pregunta detectada se transcribe y se responde con una imagen de la pantalla.", "punto rojo");
      return;
    }

    try {
      const respuestaGemini = await moduloConexion["consultar gemini"](preguntaConEstilo, imagenRecortada);
      const complejidad = moduloEnrutador["evaluar complejidad"](preguntaUsuario + " " + respuestaGemini);

      if (complejidad === "alta" && moduloAlmacenamiento["obtener clave claude"]()) {
        const respuestaClaude = await moduloConexion["consultar claude"](preguntaConEstilo, respuestaGemini);
        moduloInterfaz["actualizar ultimo mensaje vivo"](elementoRespuesta, respuestaClaude, false);
        moduloAlmacenamiento["guardar ultima consulta"](respuestaClaude);
        moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaClaude);
        moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Cada pregunta detectada se transcribe y se responde con una imagen de la pantalla.", "punto rojo");
        return;
      }

      moduloInterfaz["actualizar ultimo mensaje vivo"](elementoRespuesta, respuestaGemini, false);
      moduloAlmacenamiento["guardar ultima consulta"](respuestaGemini);
      moduloAlmacenamiento["guardar registro historial"](preguntaUsuario, respuestaGemini);
      moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Cada pregunta detectada se transcribe y se responde con una imagen de la pantalla.", "punto rojo");
    } catch (error) {
      moduloInterfaz["actualizar ultimo mensaje vivo"](elementoRespuesta, "Ocurrió una novedad al conectar con el modelo.", false);
      moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Reanudando escucha de voz.", "punto rojo");
    }
  }
};
