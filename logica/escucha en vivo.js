const moduloEscucha = {
  "activo": false,
  "reconocedor": null,
  "iniciar escucha": function () {
    const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!ReconocimientoVoz) {
      moduloInterfaz["mostrar estado"]("Micrófono no compatible en este navegador");
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
        moduloInterfaz["mostrar estado"]("Pregunta detectada por voz: " + textoHablado);
        moduloCaptura["capturar fotograma instantaneo"](function () {
          moduloEnrutador["procesar consulta"](textoHablado);
        });
      }
    };

    moduloEscucha["reconocedor"].onerror = function () {
      moduloInterfaz["mostrar estado"]("Reanudando escucha de voz");
    };

    moduloEscucha["reconocedor"].onend = function () {
      if (moduloEscucha["activo"]) {
        try {
          moduloEscucha["reconocedor"].start();
        } catch (error) {
          // Reintento silencioso de conexion
        }
      }
    };

    try {
      moduloEscucha["reconocedor"].start();
      moduloEscucha["activo"] = true;
      moduloInterfaz["mostrar estado"]("Modo diálogo activo y escuchando");
      moduloInterfaz["activar indicador escucha"](true);
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Falla al encender micrófono");
    }
  },
  "detener escucha": function () {
    moduloEscucha["activo"] = false;
    if (moduloEscucha["reconocedor"]) {
      moduloEscucha["reconocedor"].stop();
    }
    moduloInterfaz["activar indicador escucha"](false);
    moduloInterfaz["mostrar estado"]("Modo diálogo pausado");
  }
};
