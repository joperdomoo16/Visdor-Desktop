const moduloPrivacidad = {
  "terminos protegidos": [
    "banco",
    "bancolombia",
    "davivienda",
    "bbva",
    "contraseña",
    "clave dinamica",
    "tarjeta de credito",
    "codigo de seguridad"
  ],
  "verificar datos sensibles": function (textoPregunta) {
    const textoMinusculas = textoPregunta.toLowerCase();
    const listaTerminos = moduloPrivacidad["terminos protegidos"];
    for (const termino of listaTerminos) {
      if (textoMinusculas.includes(termino)) {
        return true;
      }
    }
    return false;
  }
};
