const moduloEscucha = {
  "activo": false,
  "reconocedor": null,
  "iniciar escucha": function () {
    const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!ReconocimientoVoz) {
      moduloInterfaz["mostrar estado"]("Micrófono no compatible", "Su navegador o sistema no soporta el reconocimiento de voz.", "punto rojo");
      return;
    }

    moduloEscucha["reconocedor"] = new ReconocimientoVoz();
    moduloEscucha["reconocedor"].continuous = true;
    moduloEscucha["reconocedor"].interimResults = false;
    moduloEscucha["reconocedor"].lang = "es-CO";

    moduloEscucha["reconocedor"].onresult = function (evento) {
      const indiceUltimo = evento.results.length - 1;
      const textoHablado = evento.results[indiceUltimo][0].transcript.trim();

      if (textoHablado.length > 3) {
        const elementoRespuesta = moduloInterfaz["agregar mensaje vivo"](textoHablado, "voz", null, false);
        moduloCaptura["capturar fotograma instantaneo"](function () {
          moduloEnrutador["procesar consulta vivo"](textoHablado, elementoRespuesta);
        });
      }
    };

    moduloEscucha["reconocedor"].onerror = function () {
      if (moduloEscucha["activo"]) {
        moduloInterfaz["mostrar estado"]("Reanudando escucha", "Restableciendo micrófono en vivo.", "punto rojo");
      }
    };

    moduloEscucha["reconocedor"].onend = function () {
      if (moduloEscucha["activo"]) {
        try {
          moduloEscucha["reconocedor"].start();
        } catch (error) {
          // Reintento silencioso
        }
      }
    };

    try {
      moduloEscucha["reconocedor"].start();
      moduloEscucha["activo"] = true;
      moduloInterfaz["mostrar conversacion vivo"](true);
      moduloInterfaz["mostrar estado"]("Modo en vivo activo", "Cada pregunta detectada se transcribe y se responde con una imagen de la pantalla.", "punto rojo");
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Falla de micrófono", "No fue posible acceder al micrófono del computador.", "punto rojo");
    }
  },
  "detener escucha": function () {
    moduloEscucha["activo"] = false;
    if (moduloEscucha["reconocedor"]) {
      try {
        moduloEscucha["reconocedor"].stop();
      } catch (error) {
        // Cierre silencioso
      }
    }
    moduloInterfaz["mostrar conversacion vivo"](false);
    moduloInterfaz["mostrar estado"]("Listo", "Inicie un diálogo para preguntar en voz alta o capture una zona de la pantalla.", "punto verde");
  }
};
