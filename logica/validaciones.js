const moduloValidaciones = {
  "validar texto no vacio": function (texto) {
    if (!texto) {
      return false;
    }
    return texto.trim().length > 0;
  },
  "validar longitud consulta": function (textoConsulta) {
    if (!textoConsulta) {
      return false;
    }
    const textoLimpio = textoConsulta.trim();
    return textoLimpio.length >= 3;
  },
  "validar clave api": function (clave) {
    if (!clave) {
      return false;
    }
    return clave.trim().length > 10;
  }
};
