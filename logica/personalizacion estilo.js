const moduloPersonalizacion = {
  "respuestas": {
    "primera": "",
    "segunda": "",
    "tercera": ""
  },
  "obtener perfil": function () {
    return moduloAlmacenamiento["obtener perfil estilo"]();
  },
  "guardar perfil": function (perfilGenerado) {
    moduloAlmacenamiento["guardar perfil estilo"](perfilGenerado);
  },
  "grabar respuesta voz": function (identificadorPregunta) {
    const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!ReconocimientoVoz) {
      moduloInterfaz["mostrar estado"]("Micrófono no disponible en este navegador");
      return;
    }

    const recolector = new ReconocimientoVoz();
    recolector.lang = "es-CO";
    recolector.interimResults = false;

    moduloInterfaz["mostrar estado"]("Escuchando su respuesta de voz...");

    recolector.onresult = function (evento) {
      const textoVoz = evento.results[0][0].transcript;
      moduloPersonalizacion["respuestas"][identificadorPregunta] = textoVoz;
      moduloInterfaz["actualizar respuesta grabada"](identificadorPregunta, textoVoz);
      moduloInterfaz["mostrar estado"]("Respuesta de voz registrada con éxito");
      moduloPersonalizacion["evaluar finalizacion cuestionario"]();
    };

    recolector.start();
  },
  "evaluar finalizacion cuestionario": function () {
    const respuestas = moduloPersonalizacion["respuestas"];
    if (respuestas["primera"] && respuestas["segunda"] && respuestas["tercera"]) {
      const estiloConstruido = "Adopta el estilo exacto del usuario: habla directo y con lenguaje natural colombiano, argumenta con precisión y usa el tono que se refleja en sus respuestas: " + respuestas["primera"] + ". " + respuestas["segunda"] + ". " + respuestas["tercera"];
      moduloPersonalizacion["guardar perfil"](estiloConstruido);
      moduloInterfaz["mostrar estado"]("Perfil de estilo personalizado con éxito");
    }
  }
};
