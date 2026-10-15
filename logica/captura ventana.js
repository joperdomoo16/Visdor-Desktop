const moduloCaptura = {
  "flujoActivo": null,
  "capturar ventana": async function () {
    try {
      moduloInterfaz["mostrar estado"]("Seleccione una ventana", "Elija la pantalla o ventana del computador a capturar.", "punto azul");
      moduloCaptura["flujoActivo"] = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const video = document.getElementById("lienzo video");
      video.srcObject = moduloCaptura["flujoActivo"];
      video.onloadedmetadata = function () {
        video.play();
        const lienzo = document.getElementById("lienzo seleccion");
        moduloInterfaz["mostrar captura"](true);
        moduloRecorte["iniciar seleccion"](lienzo, video);
        moduloInterfaz["mostrar estado"]("Seleccione una zona", "Arrastre sobre la imagen para marcar el recuadro que quiere consultar.", "punto azul");
      };
    } catch (error) {
      moduloInterfaz["mostrar captura"](false);
      moduloInterfaz["mostrar estado"]("Listo", "Inicie un diálogo para preguntar en voz alta o capture una zona de la pantalla.", "punto verde");
    }
  },
  "cancelar captura": function () {
    moduloInterfaz["mostrar captura"](false);
    moduloInterfaz["mostrar campo pregunta captura"](false);
    moduloInterfaz["limpiar campo consulta"]();
    moduloRecorte["recorte Listo"] = false;
    moduloInterfaz["mostrar estado"]("Listo", "Inicie un diálogo para preguntar en voz alta o capture una zona de la pantalla.", "punto verde");
  },
  "capturar fotograma instantaneo": async function (alCompletar) {
    if (!moduloCaptura["flujoActivo"]) {
      try {
        moduloCaptura["flujoActivo"] = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        });
        const video = document.getElementById("lienzo video");
        video.srcObject = moduloCaptura["flujoActivo"];
        await video.play();
      } catch (error) {
        moduloInterfaz["mostrar estado"]("Permiso requerido", "Se requiere permiso de pantalla para analizar lo que se ve.", "punto rojo");
        return;
      }
    }

    const videoElemento = document.getElementById("lienzo video");
    const lienzoTemporal = document.createElement("canvas");
    lienzoTemporal.width = videoElemento.videoWidth || 640;
    lienzoTemporal.height = videoElemento.videoHeight || 360;
    const contexto = lienzoTemporal.getContext("2d");
    contexto.drawImage(videoElemento, 0, 0, lienzoTemporal.width, lienzoTemporal.height);
    moduloRecorte["imagen Base"] = contexto.getImageData(0, 0, lienzoTemporal.width, lienzoTemporal.height);
    moduloRecorte["recorte Listo"] = false;

    if (alCompletar) {
      alCompletar();
    }
  }
};
