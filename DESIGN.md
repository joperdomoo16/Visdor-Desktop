# Documento de Diseño y Arquitectura de Interfaz de Visor Desktop

Este documento detalla la estructura, organización y análisis exhaustivo de los componentes visuales definidos en el archivo index.html para la aplicación Visor Desktop. Su propósito es servir de guía técnica para evaluar la experiencia de usuario, optimizar la modularidad del marcado y documentar el modelo visual oficial adoptado en el proyecto.

## 1. Visión General del Modelo Visual

Visor Desktop opera como una tarjeta flotante de asistencia visual e interacción por voz que se superpone a las tareas activas del usuario en su computador. El diseño adopta un estándar de interfaz contemporáneo con las siguientes pautas centrales:

* Formato compacto: Tarjeta de cuatrocientos cuarenta píxeles de ancho con esquinas redondeadas de dieciséis píxeles, borde tenue y doble sombra perimetral profunda.
* Tipografía corporativa: Integración de fuentes del sistema IBM Plex Sans para textos legibles e IBM Plex Mono para marcas temporales, atajos y código.
* Paleta cromática de alto contraste: Fondo pizarra profundo, azul cerúleo para llamadas a la acción, verde esmeralda para estado disponible, rojo carmesí animado para micrófono activo y violeta suave para protección de transmisión.
* Ergonomía de estado: Indicador circular dinámico que alterna entre giro continuo durante procesamiento de inteligencia artificial y pulso expansivo durante la escucha de voz.

## 2. Desglose Estructural Modular de index.html

El documento index.html se organiza en módulos semánticos claramente diferenciados para garantizar un desacoplamiento efectivo entre la presentación y el comportamiento.

### Módulo de Cabecera y Navegación

Ubicado en el elemento header con clase bloque cabecera e identificador barra arrastre. Contiene dos estados de visualización mutuamente excluyentes:

* Cabecera principal:
  * Título Visor con tipografía de grosor medio.
  * Distintivo de protección con texto Oculto en transmisión.
  * Espaciador elástico que empuja los controles a la derecha.
  * Botón Ajustes para acceder a las opciones de configuración.
  * Botón de cierre veloz con glifo de cruz.
* Cabecera de ajustes:
  * Botón Volver con flecha de retorno a la pantalla principal.
  * Título de sección Ajustes.
  * Botón de cierre veloz de la ventana.

### Módulo de Estado Dinámico

Sección inicial del cuerpo principal que orienta al usuario en todo momento:

* Indicador de punto con clases semánticas para reflejar disponibilidad, procesamiento en curso, captura activa, diálogo por voz o bloqueo por privacidad.
* Título de estado con tipografía destacada de veinte píxeles.
* Subtítulo con instrucciones en lenguaje natural colombiano sobre el siguiente paso sugerido.

### Módulo de Captura e Inspección Visual

Contenedor colapsable con identificador bloque captura que se despliega al ordenar una captura de pantalla:

* Caja con proporción dieciséis a diez y fondo tramado con retícula que aloja el elemento video oculto y el lienzo interactivo canvas.
* Distintivo flotante con la leyenda captura de la ventana activa.
* Capa de selección con recuadro delimitador de color azul celeste.
* Fila de consulta que aparece al finalizar el trazo del ratón, con campo de texto y botón Consultar.
* Enlace inferior para cancelar la captura y retornar al estado inicial.

### Módulo de Conversación en Vivo

Bloque integrado con identificador bloque conversacion que se activa al iniciar el modo de diálogo continuo:

* Cabecera interna con el título Conversación en vivo y distintivo de micrófono activo.
* Caja de mensajes con desplazamiento vertical que acumula cronológicamente las intervenciones:
  * Mensaje vacío de cortesía cuando no hay intervenciones recientes.
  * Elementos de mensaje con hora, etiqueta de pregunta detectada por voz o escrita, texto formulado y tarjeta de respuesta entregada por los modelos.
* Fila de entrada complementaria con campo de texto de respaldo y botón Enviar para interactuar por teclado si el micrófono detecta interferencias de ruido.

### Módulo de Respuestas y Soluciones

Área con identificador bloque respuesta que proyecta diagnósticos generados a partir de recortes o preguntas manuales:

* Etiqueta con la pregunta previa consultada.
* Caja de texto preformateado con barra de desplazamiento para lectura cómoda de código o explicaciones.
* Botón para copiar la solución al portapapeles y botón para descartar el resultado.

### Botonera Principal de Comandos

Disposición en dos columnas simétricas para las acciones inmediatas:

* Botón izquierdo para alternar el modo de diálogo en vivo, con fondo verde esmeralda al estar apagado y contorno rojo carmesí al estar activo.
* Botón derecho para disparar la captura manual de la ventana activa.
* Pie inferior con recordatorio del atajo Alt más Barra espaciadora y respuestas por voz al instante.

### Módulo de Ajustes por Pestañas

Sección con identificador vista ajustes que reemplaza el cuerpo principal al ingresar a configuración:

* Barra de navegación con cuatro pestañas horizontales: Mi estilo, Claves, Historial y General.
* Panel Mi estilo:
  * Conmutador deslizante para activar o desactivar la respuesta con tono propio.
  * Párrafo explicativo del entrenamiento de voz.
  * Alerta de confirmación de estilo calibrado.
  * Tres tarjetas de calibración con preguntas sobre facturación en pesos, errores técnicos y argumentación directa, cada una con botón de grabación y transcripción en tiempo real.
* Panel Claves:
  * Explicación de almacenamiento local seguro.
  * Campos protegidos para claves privadas de Gemini y Claude.
  * Botón para registrar credenciales en el computador.
* Panel Historial:
  * Cabecera con botón de vaciado y diálogo de confirmación para evitar borrados accidentales.
  * Listado interactivo de consultas previas con fecha, resumen de pregunta y detalle de respuesta, recuperables con un clic.
  * Mensaje informativo cuando el historial se encuentra vacío.
* Panel General:
  * Conmutador para ocultar la ventana durante transmisiones de pantalla en Teams o Meet.
  * Selector desplegable de ciudad con opciones para Bogotá, Medellín, Cali y Barranquilla.
  * Recordatorio del atajo de captura de pantalla.
  * Resumen del filtro local contra datos bancarios y contraseñas.

## 3. Secuencia de Carga y Acoplamiento Modular

El documento preserva al cierre del cuerpo el orden estricto de carga por capas de responsabilidad:

* Base y datos: Carga de datos inicial.js sin dependencias previas.
* Servicios y reglas: Carga de almacenamiento.js, validaciones.js, filtro privacidad.js, conexion modelos.js, personalizacion estilo.js, captura ventana.js, recorte visual.js, escucha en vivo.js y enrutador logico.js.
* Presentación e interfaz: Carga de interfaz.js para la manipulación exclusiva de los elementos visuales.
* Controlador de eventos: Carga de script.js para registrar oyentes y coordinar el flujo operativo.
