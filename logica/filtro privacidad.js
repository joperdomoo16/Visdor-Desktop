const moduloPrivacidad = {
  "verificar datos sensibles": function (textoPregunta) {
    const textoMinusculas = textoPregunta.toLowerCase();
    const listaTerminos = moduloDatosIniciales["terminos protegidos"];
    for (const termino of listaTerminos) {
      if (textoMinusculas.includes(termino)) {
        return true;
      }
    }
    return false;
  }
};
