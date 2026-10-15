# Visor Desktop

Asistente visual ligero para computador que analiza la ventana activa y entrega soluciones inmediatas.

## Descripción

Visor Desktop es una aplicación de escritorio diseñada para asistir al usuario mientras trabaja en su computador. Cuenta con modo de diálogo en vivo mediante escucha continua por voz, monitoreo de pantalla en tiempo real y personalización guiada de estilo para que la inteligencia artificial responda con su propia manera de hablar y argumentar.

## Estructura del proyecto

El aplicativo se organiza siguiendo una arquitectura modular con separación estricta de responsabilidades:

- index.html: Punto de entrada principal en la raíz con estructura base y enlaces de carga.
- DESIGN.md: Documento de arquitectura, desglose visual y análisis de oportunidades de mejora.
- .gitignore: Reglas de exclusión para dependencias locales y archivos temporales.
- package.json: Definición de comandos de ejecución y empaquetado del archivo ejecutable.
- readme.md: Documentación y guía del proyecto.
- estilos/style.css: Hoja de estilo global con colores, márgenes y diseño translúcido.
- recursos/: Carpeta para almacenamiento de imágenes, iconos y documentos estáticos.
- logica/datos inicial.js: Arreglos base, preguntas de calibración y registros de prueba iniciales.
- logica/almacenamiento.js: Módulo exclusivo para lectura y persistencia local sin acceso visual.
- logica/validaciones.js: Reglas de verificación de campos, formatos y longitud de consultas.
- logica/filtro privacidad.js: Módulo de protección local contra filtraciones de contraseñas y datos bancarios.
- logica/conexion modelos.js: Módulo de conexión directa con las interfaces de Gemini y Claude.
- logica/personalizacion estilo.js: Módulo de calibración de tono y argumentación a partir de respuestas de audio.
- logica/captura ventana.js: Módulo de captura visual en memoria y fotogramas automáticos por voz.
- logica/recorte visual.js: Módulo de selección interactiva y recorte por recuadro sobre la pantalla.
- logica/escucha en vivo.js: Módulo de detección de preguntas por voz mediante micrófono en vivo.
- logica/enrutador logico.js: Módulo de evaluación de complejidad y personalización de respuestas.
- logica/interfaz.js: Módulo de manipulación exclusiva del árbol de elementos y renderizado visual.
- logica/script.js: Controlador principal que inicializa la vista y conecta eventos de usuario.
- logica/principal ventana.js: Proceso de escritorio con ventana protegida contra capturas y atajo global de teclado.

## Uso del aplicativo

- Iniciar la aplicación de escritorio ejecutando el comando npm run iniciar.
- Dar clic en Mi estilo para responder con su voz las preguntas de calibración y ajustar su forma de argumentar.
- Dar clic en Iniciar diálogo para activar el monitoreo continuo con escucha en vivo.
- Al hacer una pregunta en voz alta, el visor tomará automáticamente lo que se ve en pantalla y responderá guiado por la imagen y con su tono personalizado.
- Dar clic en Ajustes para ingresar sus credenciales de Gemini y Claude.
- Para generar el archivo ejecutable portable para Windows, ejecutar el comando npm run compilar.
