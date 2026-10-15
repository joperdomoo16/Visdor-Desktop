const moduloCaptura = {
  "capturar ventana": async function () {
    try {
      moduloInterfaz["mostrar estado"]("Seleccionando ventana del computador");
      const flujoPantalla = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const video = document.getElementById("lienzo video");
      video.srcObject = flujoPantalla;
      video.onloadedmetadata = function () {
        video.play();
        const area = document.getElementById("area visual");
        const lienzo = document.getElementById("lienzo seleccion");
        area.style.display = "block";
        moduloRecorte["iniciar seleccion"](lienzo, video);
        moduloInterfaz["mostrar orientacion"]("Arrastre el raton sobre la imagen para seleccionar el recuadro");
      };
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Captura cancelada");
    }
  }
};
