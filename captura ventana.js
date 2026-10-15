const moduloCaptura = {
  "capturar ventana": async function () {
    try {
      moduloInterfaz["mostrar estado"]("Seleccionando ventana del computador");
      const flujoPantalla = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      moduloInterfaz["activar vista previa"](flujoPantalla);
      moduloEnrutador["procesar consulta"]();
    } catch (error) {
      moduloInterfaz["mostrar estado"]("Captura cancelada");
    }
  }
};
