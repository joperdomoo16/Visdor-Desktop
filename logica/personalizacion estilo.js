const moduloPersonalizacion = {
  "respuestas": {
    "primera": "",
    "segunda": "",
    "tercera": ""
  },
  "recolectorActivo": null,
  "preguntaActiva": null,

  "obtener perfil": function () {
    const estiloActivo = moduloAlmacenamiento["obtener estilo activo"]();
    if (!estiloActivo) {
      return "Tono profesional neutro, conciso y directo.";
    }
    return moduloAlmacenamiento["obtener perfil estilo"]();
  },

  "guardar perfil": function (perfilGenerado) {
    moduloAlmacenamiento["guardar perfil estilo"](perfilGenerado);
  },

  "alternar grabacion voz": function (identificadorPregunta) {
    if (moduloPersonalizacion["preguntaActiva"] === identificadorPregunta) {
      moduloPersonalizacion["detener grabacion"]();
      return;
    }

    if (moduloPersonalizacion["recolectorActivo"]) {
      moduloPersonalizacion["detener grabacion"]();
    }

    const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!ReconocimientoVoz) {
      moduloInterfaz["mostrar estado"]("Micrófono no compatible", "Su sistema no tiene disponible el reconocimiento de voz.", "punto rojo");
      return;
    }

    const recolector = new ReconocimientoVoz();
    recolector.lang = "es-CO";
    recolector.interimResults = false;

    moduloPersonalizacion["recolectorActivo"] = recolector;
    moduloPersonalizacion["preguntaActiva"] = identificadorPregunta;

    const boton = document.getElementById("boton voz " + identificadorPregunta);
    if (boton) {
      boton.className = "boton microfono estilo boton grabando";
      boton.textContent = "Detener grabación";
    }

    moduloInterfaz["actualizar respuesta grabada"](identificadorPregunta, "Grabando... pulse Detener al terminar.");
    moduloInterfaz["mostrar estado"]("Grabando calibración", "Hable con naturalidad frente al computador.", "punto rojo");

    recolector.onresult = function (evento) {
      const textoVoz = evento.results[0][0].transcript;
      moduloPersonalizacion["respuestas"][identificadorPregunta] = textoVoz;
      moduloInterfaz["actualizar respuesta grabada"](identificadorPregunta, '"' + textoVoz + '"');
      moduloPersonalizacion["finalizar grabacion exitosa"](identificadorPregunta);
    };

    recolector.onerror = function () {
      moduloPersonalizacion["detener grabacion"]();
    };

    recolector.onend = function () {
      if (moduloPersonalizacion["preguntaActiva"] === identificadorPregunta) {
        moduloPersonalizacion["detener grabacion"]();
      }
    };

    try {
      recolector.start();
    } catch (error) {
      moduloPersonalizacion["detener grabacion"]();
    }
  },

  "finalizar grabacion exitosa": function (identificadorPregunta) {
    const boton = document.getElementById("boton voz " + identificadorPregunta);
    if (boton) {
      boton.className = "boton microfono estilo";
      boton.textContent = "Grabar de nuevo";
    }
    moduloPersonalizacion["recolectorActivo"] = null;
    moduloPersonalizacion["preguntaActiva"] = null;
    moduloPersonalizacion["evaluar finalizacion cuestionario"]();
  },

  "detener grabacion": function () {
    const identificador = moduloPersonalizacion["preguntaActiva"];
    if (identificador) {
      const boton = document.getElementById("boton voz " + identificador);
      const tieneTexto = !!moduloPersonalizacion["respuestas"][identificador];
      if (boton) {
        boton.className = "boton microfono estilo";
        boton.textContent = tieneTexto ? "Grabar de nuevo" : "Grabar respuesta";
      }
      if (!tieneTexto) {
        moduloInterfaz["actualizar respuesta grabada"](identificador, "Sin audio grabado aún.");
      }
    }
    if (moduloPersonalizacion["recolectorActivo"]) {
      try {
        moduloPersonalizacion["recolectorActivo"].stop();
      } catch (error) {
        // Cierre silencioso
      }
    }
    moduloPersonalizacion["recolectorActivo"] = null;
    moduloPersonalizacion["preguntaActiva"] = null;
    moduloInterfaz["mostrar estado"]("Listo", "Ajustes de calibración listos.", "punto verde");
  },

  "evaluar finalizacion cuestionario": function () {
    const respuestas = moduloPersonalizacion["respuestas"];
    if (respuestas["primera"] && respuestas["segunda"] && respuestas["tercera"]) {
      const estiloConstruido = "Adopta el estilo exacto del usuario: habla directo y con lenguaje natural colombiano, argumenta con precisión y usa el tono que se refleja en sus respuestas: " + respuestas["primera"] + ". " + respuestas["segunda"] + ". " + respuestas["tercera"];
      moduloPersonalizacion["guardar perfil"](estiloConstruido);
      moduloInterfaz["mostrar alerta calibrado"](true);
      moduloInterfaz["mostrar estado"]("Estilo calibrado", "El asistente responderá con su propia manera de hablar.", "punto verde");
    }
  }
};
