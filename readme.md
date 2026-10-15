# Visor Desktop

Asistente visual ligero para computador que analiza la ventana activa y entrega soluciones inmediatas.

## Descripción

Visor Desktop es una aplicación de escritorio diseñada para asistir al usuario mientras trabaja en su computador. Cuenta con protección activa para permanecer completamente invisible al compartir pantalla en llamadas de Teams, Zoom, Meet o cualquier otra aplicación, garantizando total privacidad.

## Estructura del proyecto

El aplicativo se compone de los siguientes archivos:

- principal ventana.js: Proceso de escritorio con ventana protegida contra capturas y atajo global de teclado.
- package.json: Definición de comandos de ejecución y empaquetado del archivo ejecutable.
- index.html: Interfaz del visor flotante con enlace oficial a Bootstrap, panel de ajustes e indicador de protección.
- style.css: Hoja de estilos moderna, oscura y translúcida, empleando fuentes del sistema operativo.
- conexion modelos.js: Módulo de conexión directa con las interfaces de Gemini y Claude.
- recorte visual.js: Módulo de selección interactiva y recorte por recuadro sobre la pantalla.
- captura ventana.js: Módulo de captura visual en memoria de la ventana activa.
- enrutador logico.js: Módulo de evaluación de complejidad y atención de consultas en vivo.
- historial local.js: Módulo de registro y recuperación de análisis previos en el computador.
- script.js: Orquestador de la interfaz, eventos de teclado, cuadro de preguntas y portapapeles.
- readme.md: Documentación del proyecto.

## Uso del aplicativo

- Iniciar la aplicación de escritorio ejecutando el comando npm run iniciar.
- La ventana flotará de forma permanente y permanecerá invisible si usted comparte pantalla en videollamadas.
- Dar clic en Ajustes para ingresar sus credenciales de Gemini y Claude.
- Presionar la combinación Alt y Espacio en cualquier programa para iniciar la captura de pantalla.
- Arrastrar el ratón sobre la imagen para delimitar el recuadro que se desea consultar.
- Escribir la pregunta técnica en el cuadro de texto y presionar la tecla Enter o dar clic en Consultar.
- El visor procesará la consulta con Gemini y escalará a Claude cuando la complejidad sea alta.
- Dar clic en Copiar solución para pasar el texto al portapapeles del computador.
- Para generar el archivo ejecutable portable para Windows, ejecutar el comando npm run compilar.
