const moduloCaptura = {
  "flujoActivo": null,
  "capturar ventana": async function () {
    try {
      moduloInterfaz["mostrar estado"]("Seleccionando ventana del computador");
      moduloCaptura["flujoActivo"] = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const video = document.getElementById("lienzo video");
      video.srcObject = moduloCaptura["flujoActivo"];
      video.onloadedmetadata = function () {
        video.play();
        const area = document.getElementById("area visual");
        const lienzo = document.getElementById("lienzo seleccion");
        area.style.display = "block";
        moduloRecorte["iniciar seleccion"](lienzo, video);
        moduloInterfaz["mostrar orientacion"]("Arrastre el ratón sobre la imagen para seleccionar el recuadro");
      };
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Captura cancelada");
    }
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
        moduloInterfaz["mostrar estado"]("Se requiere permiso de pantalla para el modo diálogo");
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
