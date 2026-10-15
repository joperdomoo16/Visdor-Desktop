# Visor Desktop

Asistente visual ligero para computador que analiza la ventana activa y entrega soluciones inmediatas.

## Descripción

Visor Desktop es una herramienta diseñada para asistir al usuario mientras trabaja en su computador. Permite seleccionar una zona específica de la pantalla mediante un recuadro interactivo y formular preguntas puntuales para obtener respuestas técnicas al instante.

## Estructura del proyecto

El aplicativo se compone de los siguientes archivos:

- index.html: Interfaz del visor flotante con enlace oficial a Bootstrap.
- style.css: Hoja de estilos moderna, oscura y translúcida, empleando fuentes del sistema operativo.
- recorte visual.js: Módulo de selección interactiva y recorte por recuadro sobre la pantalla.
- captura ventana.js: Módulo de captura visual en memoria de la ventana activa.
- enrutador logico.js: Módulo de evaluación de complejidad y atención de consultas personalizadas.
- historial local.js: Módulo de registro y recuperación de análisis previos en el computador.
- script.js: Orquestador de la interfaz, eventos de teclado, cuadro de preguntas y portapapeles.
- readme.md: Documentación del proyecto.

## Uso del aplicativo

- Abrir el archivo index.html en cualquier navegador del computador.
- Dar clic en el botón Capturar pantalla o presionar Alt y Espacio para iniciar la toma visual.
- Arrastrar el ratón sobre la imagen para delimitar el recuadro que se desea consultar.
- Escribir la pregunta técnica en el cuadro de texto y presionar la tecla Enter o dar clic en Consultar.
- El visor procesará la duda y mostrará la respuesta en pantalla.
- Dar clic en Copiar solución para pasar el texto al portapapeles del computador.
