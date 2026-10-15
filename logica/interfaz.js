const moduloInterfaz = {
  "mostrar estado": function (titulo, subtitulo, clasePunto) {
    const elementoTitulo = document.getElementById("titulo estado");
    const elementoSubtitulo = document.getElementById("subtitulo estado");
    const elementoPunto = document.getElementById("punto estado");

    if (elementoTitulo && titulo) {
      elementoTitulo.textContent = titulo;
    }
    if (elementoSubtitulo && subtitulo) {
      elementoSubtitulo.textContent = subtitulo;
    }
    if (elementoPunto && clasePunto) {
      elementoPunto.className = "punto indicador " + clasePunto;
    }
  },

  "alternar vista ajustes": function (mostrarAjustes) {
    const cabeceraPrincipal = document.getElementById("cabecera principal");
    const cabeceraAjustes = document.getElementById("cabecera ajustes");
    const vistaPrincipal = document.getElementById("vista principal");
    const vistaAjustes = document.getElementById("vista ajustes");

    if (mostrarAjustes) {
      cabeceraPrincipal.style.display = "none";
      cabeceraAjustes.style.display = "flex";
      vistaPrincipal.style.display = "none";
      vistaAjustes.style.display = "block";
      moduloInterfaz["cargar campos ajustes"]();
    } else {
      cabeceraPrincipal.style.display = "flex";
      cabeceraAjustes.style.display = "none";
      vistaPrincipal.style.display = "block";
      vistaAjustes.style.display = "none";
    }
  },

  "cambiar pestana": function (identificadorPestana) {
    const listaBotones = document.querySelectorAll(".boton.pestana");
    for (const boton of listaBotones) {
      if (boton.getAttribute("data-pestana") === identificadorPestana) {
        boton.className = "boton pestana pestana activa";
      } else {
        boton.className = "boton pestana";
      }
    }

    const listaPaneles = ["estilo", "claves", "historial", "general"];
    for (const nombrePanel of listaPaneles) {
      const panel = document.getElementById("panel " + nombrePanel);
      if (panel) {
        if (nombrePanel === identificadorPestana) {
          panel.className = "panel pestana";
        } else {
          panel.className = "panel pestana panel oculto";
        }
      }
    }

    if (identificadorPestana === "historial") {
      moduloInterfaz["renderizar historial"]();
    }
  },

  "cargar campos ajustes": function () {
    const campoGemini = document.getElementById("campo clave gemini");
    const campoClaude = document.getElementById("campo clave claude");
    const selectorCiudad = document.getElementById("selector ciudad");

    if (campoGemini) {
      campoGemini.value = moduloAlmacenamiento["obtener clave gemini"]();
    }
    if (campoClaude) {
      campoClaude.value = moduloAlmacenamiento["obtener clave claude"]();
    }
    if (selectorCiudad) {
      selectorCiudad.value = moduloAlmacenamiento["obtener ciudad"]();
    }

    moduloInterfaz["actualizar conmutador estilo"](moduloAlmacenamiento["obtener estilo activo"]());
    moduloInterfaz["actualizar conmutador proteccion"](moduloAlmacenamiento["obtener proteccion"]());
  },

  "actualizar conmutador estilo": function (activo) {
    const conmutador = document.getElementById("conmutador estilo");
    const subtitulo = document.getElementById("subtitulo estilo");
    if (conmutador) {
      conmutador.className = activo ? "boton interruptor interruptor activo" : "boton interruptor";
    }
    if (subtitulo) {
      subtitulo.textContent = activo ? "Las respuestas siguen su manera de hablar." : "Las respuestas usan un tono neutro.";
    }
  },

  "actualizar conmutador proteccion": function (activa) {
    const conmutador = document.getElementById("conmutador proteccion");
    const distintivo = document.getElementById("distintivo proteccion");
    if (conmutador) {
      conmutador.className = activa ? "boton interruptor interruptor activo violeta" : "boton interruptor";
    }
    if (distintivo) {
      distintivo.textContent = activa ? "Oculto en transmisión" : "Visible en transmisión";
    }
  },

  "mostrar captura": function (mostrar) {
    const bloque = document.getElementById("bloque captura");
    if (bloque) {
      bloque.style.display = mostrar ? "flex" : "none";
    }
  },

  "mostrar campo pregunta captura": function (mostrar) {
    const fila = document.getElementById("fila consulta captura");
    const campo = document.getElementById("campo consulta");
    if (fila) {
      fila.style.display = mostrar ? "flex" : "none";
      if (mostrar && campo) {
        campo.focus();
      }
    }
  },

  "limpiar campo consulta": function () {
    const campo = document.getElementById("campo consulta");
    if (campo) {
      campo.value = "";
    }
  },

  "mostrar conversacion vivo": function (mostrar) {
    const bloque = document.getElementById("bloque conversacion");
    const boton = document.getElementById("boton alternar dialogo");
    if (bloque) {
      bloque.style.display = mostrar ? "flex" : "none";
    }
    if (boton) {
      if (mostrar) {
        boton.textContent = "Detener modo en vivo";
        boton.className = "boton dialogo vivo boton dialogo activo";
      } else {
        boton.textContent = "Iniciar modo en vivo";
        boton.className = "boton dialogo vivo";
      }
    }
  },

  "agregar mensaje vivo": function (textoPregunta, fuentePregunta, textoRespuesta, esBloqueado) {
    const caja = document.getElementById("caja mensajes vivo");
    const vacio = document.getElementById("mensaje vacio vivo");
    if (vacio) {
      vacio.style.display = "none";
    }
    if (!caja) {
      return;
    }

    const item = document.createElement("div");
    item.className = "item mensaje";

    const meta = document.createElement("span");
    meta.className = "meta mensaje";
    const hora = new Date().toLocaleTimeString();
    meta.textContent = hora + " · " + (fuentePregunta === "voz" ? "pregunta detectada" : "pregunta escrita");

    const pregunta = document.createElement("div");
    pregunta.className = "texto pregunta";
    pregunta.textContent = textoPregunta;

    const respuesta = document.createElement("div");
    respuesta.className = esBloqueado ? "caja respuesta mensaje caja respuesta mensaje bloqueado" : "caja respuesta mensaje";
    respuesta.textContent = textoRespuesta || "Respondiendo...";

    item.appendChild(meta);
    item.appendChild(pregunta);
    item.appendChild(respuesta);
    caja.appendChild(item);

    caja.scrollTop = caja.scrollHeight;
    return respuesta;
  },

  "actualizar ultimo mensaje vivo": function (elementoRespuesta, textoFinal, esBloqueado) {
    if (elementoRespuesta) {
      elementoRespuesta.textContent = textoFinal;
      if (esBloqueado) {
        elementoRespuesta.className = "caja respuesta mensaje caja respuesta mensaje bloqueado";
      }
    }
    const caja = document.getElementById("caja mensajes vivo");
    if (caja) {
      caja.scrollTop = caja.scrollHeight;
    }
  },

  "mostrar respuesta": function (pregunta, textoSolucion, esBloqueado) {
    const bloque = document.getElementById("bloque respuesta");
    const contenedorPregunta = document.getElementById("contenedor pregunta previa");
    const textoPregunta = document.getElementById("texto pregunta previa");
    const cajaTexto = document.getElementById("caja texto solucion");
    const botonCopiar = document.getElementById("boton copiar");

    if (bloque) {
      bloque.style.display = "flex";
    }
    if (pregunta && textoPregunta && contenedorPregunta) {
      contenedorPregunta.style.display = "block";
      textoPregunta.textContent = pregunta;
    } else if (contenedorPregunta) {
      contenedorPregunta.style.display = "none";
    }
    if (cajaTexto) {
      cajaTexto.textContent = textoSolucion;
      cajaTexto.className = esBloqueado ? "caja texto solucion caja texto solucion bloqueado" : "caja texto solucion";
    }
    if (botonCopiar) {
      botonCopiar.textContent = "Copiar respuesta";
    }
  },

  "limpiar respuesta": function () {
    const bloque = document.getElementById("bloque respuesta");
    if (bloque) {
      bloque.style.display = "none";
    }
  },

  "actualizar respuesta grabada": function (identificadorPregunta, texto) {
    const muestra = document.getElementById("muestra respuesta " + identificadorPregunta);
    if (muestra) {
      muestra.textContent = texto;
    }
  },

  "mostrar alerta calibrado": function (mostrar) {
    const alerta = document.getElementById("alerta estilo calibrado");
    if (alerta) {
      alerta.style.display = mostrar ? "block" : "none";
    }
  },

  "renderizar historial": function () {
    const contenedor = document.getElementById("listado historial");
    const mensajeVacio = document.getElementById("historial vacio");
    const cabeceraLista = document.getElementById("cabecera historial lista");

    if (!contenedor) {
      return;
    }

    contenedor.innerHTML = "";
    const registros = moduloAlmacenamiento["obtener registros historial"]();

    if (registros.length === 0) {
      if (mensajeVacio) {
        mensajeVacio.style.display = "block";
      }
      if (cabeceraLista) {
        cabeceraLista.style.display = "none";
      }
      return;
    }

    if (mensajeVacio) {
      mensajeVacio.style.display = "none";
    }
    if (cabeceraLista) {
      cabeceraLista.style.display = "flex";
    }

    for (const item of registros) {
      const fila = document.createElement("button");
      fila.className = "item historial";

      const hora = document.createElement("span");
      hora.className = "hora historial";
      hora.textContent = item.fecha;

      const titulo = document.createElement("span");
      titulo.className = "resumen pregunta";
      titulo.textContent = item.pregunta || "Consulta técnica";

      const detalle = document.createElement("span");
      detalle.className = "resumen respuesta";
      detalle.textContent = item.detalle;

      fila.appendChild(hora);
      fila.appendChild(titulo);
      fila.appendChild(detalle);

      fila.addEventListener("click", function () {
        moduloInterfaz["alternar vista ajustes"](false);
        moduloInterfaz["mostrar estado"]("Respuesta lista", "Registro recuperado del historial local.", "punto verde");
        moduloInterfaz["mostrar respuesta"](item.pregunta, item.detalle, false);
      });

      contenedor.appendChild(fila);
    }
  },

  "mostrar confirmacion vaciar": function (mostrar) {
    const botonVaciar = document.getElementById("boton vaciar historial");
    const filaConfirmacion = document.getElementById("fila confirmacion vaciar");

    if (botonVaciar && filaConfirmacion) {
      if (mostrar) {
        botonVaciar.style.display = "none";
        filaConfirmacion.style.display = "flex";
      } else {
        botonVaciar.style.display = "block";
        filaConfirmacion.style.display = "none";
      }
    }
  },

  "copiar solucion al portapapeles": function () {
    const cajaTexto = document.getElementById("caja texto solucion");
    const boton = document.getElementById("boton copiar");
    if (cajaTexto) {
      navigator.clipboard.writeText(cajaTexto.textContent);
      if (boton) {
        boton.textContent = "Copiado";
      }
      moduloInterfaz["mostrar estado"]("Copiado con éxito", "La respuesta se encuentra disponible en su portapapeles.", "punto verde");
    }
  }
};
