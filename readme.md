# Visor Desktop

Asistente visual ligero para computador que analiza la ventana activa y entrega soluciones inmediatas.

## Descripción

Visor Desktop es una herramienta diseñada para asistir al usuario mientras trabaja en su computador. Integra conexión directa con los modelos de Gemini y Claude para analizar capturas por recuadro y resolver dudas técnicas al instante.

## Estructura del proyecto

El aplicativo se compone de los siguientes archivos:

- index.html: Interfaz del visor flotante con enlace oficial a Bootstrap y panel de ajustes.
- style.css: Hoja de estilos moderna, oscura y translúcida, empleando fuentes del sistema operativo.
- conexion modelos.js: Módulo de conexión directa con las interfaces de Gemini y Claude.
- recorte visual.js: Módulo de selección interactiva y recorte por recuadro sobre la pantalla.
- captura ventana.js: Módulo de captura visual en memoria de la ventana activa.
- enrutador logico.js: Módulo de evaluación de complejidad y atención de consultas en vivo.
- historial local.js: Módulo de registro y recuperación de análisis previos en el computador.
- script.js: Orquestador de la interfaz, eventos de teclado, cuadro de preguntas y portapapeles.
- readme.md: Documentación del proyecto.

## Uso del aplicativo

- Abrir el archivo index.html en cualquier navegador del computador.
- Dar clic en Ajustes para ingresar sus credenciales de Gemini y Claude.
- Dar clic en el botón Capturar pantalla o presionar Alt y Espacio para iniciar la toma visual.
- Arrastrar el ratón sobre la imagen para delimitar el recuadro que se desea consultar.
- Escribir la pregunta técnica en el cuadro de texto y presionar la tecla Enter o dar clic en Consultar.
- El visor procesará la consulta con Gemini y escalará a Claude cuando la complejidad sea alta.
- Dar clic en Copiar solución para pasar el texto al portapapeles del computador.
