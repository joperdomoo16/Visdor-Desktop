const moduloAlmacenamiento = {
  "clave historial": "historial de consultas",
  "clave gemini": "clave privada gemini",
  "clave claude": "clave privada claude",
  "clave perfil": "perfil de estilo de dialogo",
  "clave ultima consulta": "ultima consulta",

  "obtener registros historial": function () {
    const clave = moduloAlmacenamiento["clave historial"];
    const guardado = localStorage.getItem(clave);
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (error) {
        return [];
      }
    }
    return moduloDatosIniciales["registros prueba"] || [];
  },

  "guardar registro historial": function (textoDiagnostico) {
    const clave = moduloAlmacenamiento["clave historial"];
    const registros = moduloAlmacenamiento["obtener registros historial"]();
    registros.unshift({
      fecha: new Date().toLocaleTimeString(),
      detalle: textoDiagnostico
    });
    if (registros.length > 5) {
      registros.pop();
    }
    localStorage.setItem(clave, JSON.stringify(registros));
    return registros;
  },

  "limpiar historial": function () {
    const clave = moduloAlmacenamiento["clave historial"];
    localStorage.removeItem(clave);
  },

  "obtener clave gemini": function () {
    const clave = moduloAlmacenamiento["clave gemini"];
    return localStorage.getItem(clave) || "";
  },

  "guardar clave gemini": function (valorClave) {
    const clave = moduloAlmacenamiento["clave gemini"];
    localStorage.setItem(clave, valorClave);
  },

  "obtener clave claude": function () {
    const clave = moduloAlmacenamiento["clave claude"];
    return localStorage.getItem(clave) || "";
  },

  "guardar clave claude": function (valorClave) {
    const clave = moduloAlmacenamiento["clave claude"];
    localStorage.setItem(clave, valorClave);
  },

  "guardar claves": function (claveGemini, claveClaude) {
    moduloAlmacenamiento["guardar clave gemini"](claveGemini);
    moduloAlmacenamiento["guardar clave claude"](claveClaude);
  },

  "obtener perfil estilo": function () {
    const clave = moduloAlmacenamiento["clave perfil"];
    return localStorage.getItem(clave) || moduloDatosIniciales["perfil predeterminado"];
  },

  "guardar perfil estilo": function (perfilGenerado) {
    const clave = moduloAlmacenamiento["clave perfil"];
    localStorage.setItem(clave, perfilGenerado);
  },

  "guardar ultima consulta": function (textoSolucion) {
    const clave = moduloAlmacenamiento["clave ultima consulta"];
    localStorage.setItem(clave, textoSolucion);
  },

  "obtener ultima consulta": function () {
    const clave = moduloAlmacenamiento["clave ultima consulta"];
    return localStorage.getItem(clave) || "";
  }
};
