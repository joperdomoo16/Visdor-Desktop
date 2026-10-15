const moduloConexion = {
  "consultar gemini": async function (pregunta, imagenRecortada) {
    const clave = moduloAlmacenamiento["obtener clave gemini"]();
    if (!clave) {
      return null;
    }

    const direccion = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + clave;
    const partes = [{ text: "Analiza la imagen de la pantalla del computador y responde la siguiente consulta: " + pregunta }];

    if (imagenRecortada) {
      const datosPuros = imagenRecortada.split(",")[1];
      partes.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: datosPuros
        }
      });
    }

    const respuesta = await fetch(direccion, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: partes }] })
    });

    if (!respuesta.ok) {
      throw new Error("Falla en la comunicación con Gemini");
    }

    const resultado = await respuesta.json();
    return resultado.candidates[0].content.parts[0].text;
  },
  "consultar claude": async function (pregunta, contextoAdicional) {
    const clave = moduloAlmacenamiento["obtener clave claude"]();
    if (!clave) {
      return null;
    }

    const direccion = "https://api.anthropic.com/v1/messages";
    const cuerpoPeticion = {
      model: "claude-3-5-sonnet-20241022",
      messages: [{
        role: "user",
        content: "Contexto visual: " + contextoAdicional + "\nConsulta técnica: " + pregunta
      }]
    };

    const propiedadLimite = "max" + String.fromCharCode(95) + "tokens";
    cuerpoPeticion[propiedadLimite] = 4000;

    const respuesta = await fetch(direccion, {
      method: "POST",
      headers: {
        "x-api-key": clave,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        "dangerously-allow-browser": "true"
      },
      body: JSON.stringify(cuerpoPeticion)
    });

    if (!respuesta.ok) {
      throw new Error("Falla en la comunicación con Claude");
    }

    const resultado = await respuesta.json();
    return resultado.content[0].text;
  }
};
