# Visor Desktop

Asistente visual ligero para computador que analiza la ventana activa y entrega soluciones inmediatas.

## Descripción

Visor Desktop es una herramienta diseñada para asistir al usuario mientras trabaja en su computador. Cuenta con una arquitectura modular que clasifica consultas, extrae texto de la pantalla y agiliza la toma de decisiones técnicas.

## Estructura del proyecto

El aplicativo se compone de los siguientes archivos:

- index.html: Interfaz del visor flotante con enlace oficial a Bootstrap.
- style.css: Hoja de estilos moderna, oscura y translúcida, empleando fuentes del sistema operativo.
- captura ventana.js: Módulo de captura visual de la ventana activa en el computador.
- enrutador logico.js: Módulo de evaluación de complejidad y triaje rápido.
- script.js: Orquestador de la interfaz, eventos de teclado y copiado de respuestas.
- readme.md: Documentación del proyecto.

## Uso del aplicativo

- Abrir el archivo index.html en cualquier navegador del computador.
- Dar clic en el botón Capturar pantalla o presionar Alt y Espacio para revisar la ventana activa.
- El visor evaluará la dificultad y mostrará la solución sugerida en pantalla.
- Dar clic en Copiar solución para pasar el texto al portapapeles del computador.
