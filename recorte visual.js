const moduloRecorte = {
  "seleccion activa": false,
  "inicio Horizontal": 0,
  "inicio Vertical": 0,
  "fin Horizontal": 0,
  "fin Vertical": 0,
  "recorte Listo": false,
  "imagen Base": null,
  "iniciar seleccion": function (lienzo, video) {
    const contexto = lienzo.getContext("2d");
    lienzo.width = video.videoWidth || 640;
    lienzo.height = video.videoHeight || 360;
    contexto.drawImage(video, 0, 0, lienzo.width, lienzo.height);
    moduloRecorte["imagen Base"] = contexto.getImageData(0, 0, lienzo.width, lienzo.height);

    lienzo.onmousedown = function (evento) {
      const rectangulo = lienzo.getBoundingClientRect();
      const escalaHorizontal = lienzo.width / rectangulo.width;
      const escalaVertical = lienzo.height / rectangulo.height;
      moduloRecorte["inicio Horizontal"] = (evento.clientX - rectangulo.left) * escalaHorizontal;
      moduloRecorte["inicio Vertical"] = (evento.clientY - rectangulo.top) * escalaVertical;
      moduloRecorte["seleccion activa"] = true;
    };

    lienzo.onmousemove = function (evento) {
      if (!moduloRecorte["seleccion activa"]) {
        return;
      }
      const rectangulo = lienzo.getBoundingClientRect();
      const escalaHorizontal = lienzo.width / rectangulo.width;
      const escalaVertical = lienzo.height / rectangulo.height;
      moduloRecorte["fin Horizontal"] = (evento.clientX - rectangulo.left) * escalaHorizontal;
      moduloRecorte["fin Vertical"] = (evento.clientY - rectangulo.top) * escalaVertical;

      contexto.putImageData(moduloRecorte["imagen Base"], 0, 0);

      const origenHorizontal = Math.min(moduloRecorte["inicio Horizontal"], moduloRecorte["fin Horizontal"]);
      const origenVertical = Math.min(moduloRecorte["inicio Vertical"], moduloRecorte["fin Vertical"]);
      const anchoZona = Math.abs(moduloRecorte["fin Horizontal"] - moduloRecorte["inicio Horizontal"]);
      const altoZona = Math.abs(moduloRecorte["fin Vertical"] - moduloRecorte["inicio Vertical"]);

      contexto.strokeStyle = "#38bdf8";
      contexto.lineWidth = 3;
      contexto.strokeRect(origenHorizontal, origenVertical, anchoZona, altoZona);
      contexto.fillStyle = "#38bdf833";
      contexto.fillRect(origenHorizontal, origenVertical, anchoZona, altoZona);
    };

    lienzo.onmouseup = function () {
      if (!moduloRecorte["seleccion activa"]) {
        return;
      }
      moduloRecorte["seleccion activa"] = false;
      moduloRecorte["recorte Listo"] = true;
      moduloInterfaz["mostrar campo pregunta"]();
      moduloInterfaz["mostrar estado"]("Recuadro seleccionado");
      moduloInterfaz["mostrar orientacion"]("Escriba su consulta sobre el recuadro elegido");
    };
  }
};
