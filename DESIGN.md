# Documento de Diseño y Arquitectura de Interfaz de Visor Desktop

Este documento detalla la estructura, organización y análisis exhaustivo de los componentes visuales definidos en el archivo index.html para la aplicación Visor Desktop. Su propósito es servir de guía técnica para evaluar la experiencia de usuario, optimizar la semántica del marcado y planificar mejoras en la presentación.

## 1. Visión General de la Interfaz

Visor Desktop fue concebido como una tarjeta flotante de asistencia visual e interacción por voz que se superpone a las tareas activas del usuario en su computador. El diseño persigue tres metas fundamentales:

* Mínima invasión: Ocupar un espacio reducido en pantalla con estética oscura y bordes redondeados, garantizando lectura cómoda sin estorbar el contenido de trabajo.
* Acceso directo a controles: Disponer de acciones inmediatas para iniciar la escucha continua, disparar capturas y copiar diagnósticos al portapapeles.
* Modularidad y adaptabilidad: Desplegar paneles auxiliares de calibración y ajustes de forma condicional para mantener limpia el área principal.

## 2. Desglose Estructural de index.html

El marcado del archivo index.html se organiza en bloques funcionales bien delimitados que representan la jerarquía visual de la tarjeta flotante.

### Bloque de Cabecera y Recursos Externos

El documento se define bajo el estándar de lenguaje de marcado moderno con idioma español. En la cabecera head se establecen los metadatos de juego de caracteres y escala de visualización, seguidos de las hojas de estilo:

* Enlace a hoja de estilos de Bootstrap desde red de distribución de contenidos para establecer la tipografía base y el restablecimiento de estilos nativos.
* Hoja de estilos principal ubicada en estilos/style.css, encargada de la paleta oscura, los paneles flotantes y las transiciones.

### Contenedor Principal del Visor

El cuerpo body posee la clase fondo aplicacion, configurado con un fondo oscuro y selección de texto deshabilitada para operar como una utilidad de escritorio. Dentro del cuerpo se aloja la tarjeta principal:

* Identificador visor principal con clase tarjeta flotante: Actúa como el lienzo contenedor con ancho máximo de quinientos píxeles, sombra pronunciada y borde sutil.

### Barra de Arrastre y Estado del Sistema

Ubicada en la parte superior con identificador barra arrastre y clase bloque cabecera. Cumple la doble función de zona de agarre para desplazar la ventana y barra de estado:

* Zona de estado: Agrupa cuatro indicadores visuales en forma de pastillas.
  * Identificador estado visor: Comunica en texto el estado operativo actual, por ejemplo si está listo para captura o procesando.
  * Etiqueta proteccion: Indica que la ventana se encuentra protegida contra capturas en transmisiones de pantalla.
  * Identificador indicador escucha: Muestra si el modo de diálogo con micrófono continuo está activo o apagado.
  * Etiqueta ciudad: Marcador regional establecido en Bogotá.
* Zona de controles: Contiene tres botones de acción rápida.
  * Identificador boton panel personalizacion: Alterna el despliegue del área de calibración de voz.
  * Identificador boton panel ajustes: Alterna el formulario de claves de inteligencia artificial.
  * Identificador boton cerrar ventana: Cierra el aplicativo de escritorio.

### Panel Desplegable de Personalización de Estilo de Habla

Sección identificada como area personalizacion con clase bloque ajustes. Este panel permanece oculto por defecto y se abre al pulsar el botón Mi estilo.

* Encabezado de sección y texto de ayuda que explica al usuario cómo entrenar el modelo respondiendo preguntas con su voz.
* Tres tarjetas de calibración con clase tarjeta pregunta estilo. Cada una contiene el texto de la pregunta, un botón de captura de audio y un párrafo de muestra donde se transcribe el audio registrado:
  * Primera pregunta: Orientada a la explicación de cobros y facturación en pesos.
  * Segunda pregunta: Enfocada en la descripción rápida de un incidente técnico a un compañero.
  * Tercera pregunta: Diseñada para capturar la forma habitual de argumentar e ir al grano.

### Panel Desplegable de Ajustes de Credenciales

Contenedor con identificador area ajustes y clase bloque ajustes. Permite ingresar las credenciales privadas requeridas para interactuar con los modelos en la nube:

* Etiqueta y campo de tipo contraseña con identificador campo clave gemini para la llave de Google.
* Etiqueta y campo de tipo contraseña con identificador campo clave claude para la llave de Anthropic.
* Botón de confirmación con identificador boton guardar claves para almacenar los datos en el almacenamiento local seguro del computador.

### Bloque de Contenido Central y Zona Visual

Identificado como bloque contenido, constituye el núcleo de interacción del visor:

* Texto de orientación con identificador texto orientacion: Mensaje dinámico que guía al usuario según la etapa en la que se encuentre.
* Área visual con identificador area visual: Contiene dos elementos esenciales para la inspección de pantalla:
  * Elemento video con identificador lienzo video: Oculto a la vista directa, procesa el flujo de captura de la ventana activa.
  * Elemento canvas con identificador lienzo seleccion: Lienzo interactivo donde se proyecta la imagen capturada y se dibuja el recuadro delimitador mediante el ratón.

### Bloque de Entrada para Consultas Técnicas

Identificado como area pregunta con clase bloque pregunta. Aparece únicamente después de haber seleccionado un recuadro sobre el lienzo:

* Etiqueta orientativa para la consulta.
* Fila de entrada compuesta por un campo de texto con identificador campo consulta y un botón de acción con identificador boton consultar.

### Caja de Despliegue de Respuestas y Soluciones

Identificada como caja solucion con clase caja respuesta:

* Elemento de texto con identificador texto prediccion: Espacio dinámico donde se imprime la solución técnica, el código generado o el análisis descriptivo entregado por la inteligencia artificial.

### Historial Reciente de Consultas

Identificado como bloque historial:

* Etiqueta de sección de historial.
* Contenedor con identificador listado historial y clase caja historial: Lista desplazable que presenta las consultas previas guardadas en el equipo, permitiendo recuperarlas con un solo clic.

### Barra de Comandos y Acciones Rápidas

Bloque inferior con clase bloque acciones. Contiene tres botones de control primarios:

* Identificador boton alternar dialogo: Inicia o pausa el modo de diálogo en vivo con escucha activa por micrófono.
* Identificador boton capturar: Dispara la captura visual manual de la ventana seleccionada.
* Identificador boton copiar: Transfiere el contenido de la respuesta directamente al portapapeles del sistema.

### Secuencia de Inclusión de Scripts al Cierre del Cuerpo

Siguiendo el principio de separación estricta de responsabilidades y orden de interpretación secuencial, se cargan los doce archivos de lógica al final del documento:

* Capa de base y datos: Carga de datos inicial.js sin dependencias previas.
* Capa de servicios y reglas: Carga de almacenamiento.js, validaciones.js, filtro privacidad.js, conexion modelos.js, personalizacion estilo.js, captura ventana.js, recorte visual.js, escucha en vivo.js y enrutador logico.js.
* Capa de interfaz: Carga de interfaz.js para la gestión exclusiva del árbol de elementos.
* Capa de control: Carga de script.js para inicializar escuchas de eventos y coordinar los módulos.

## 3. Diagnóstico de Oportunidades y Mejoras

A partir del análisis detallado de la estructura de index.html, se identifican las siguientes oportunidades de optimización:

### Transición hacia Semántica Estructural

Actualmente la totalidad de los contenedores emplea divisiones div genéricas. Se recomienda evolucionar hacia elementos nativos como header para la barra superior, main para la zona central de contenido, section para los paneles desplegables y footer para la barra de botones de acción. Esto enriquece el valor estructural y facilita el mantenimiento.

### Renderizado Dinámico del Cuestionario de Voz

Las tres preguntas de calibración están escritas directamente dentro del marcado HTML. Conectar la creación de estas tarjetas con la lista definida en datos inicial.js mediante el módulo de interfaz permitiría agregar o modificar preguntas sin necesidad de alterar el archivo HTML principal.

### Accesibilidad y Experiencia con Teclado

Es conveniente incorporar atributos aria en los paneles colapsables para indicar su estado visible u oculto ante tecnologías de asistencia. Asimismo, conviene asignar roles específicos a la barra de arrastre y al área interactiva de recorte.

### Organización de Hojas de Estilo por Componente

Conforme crezca la complejidad visual, las reglas de los paneles desplegables y del lienzo de recorte pueden trasladarse a archivos CSS específicos por módulo dentro de la carpeta de estilos, manteniendo style.css enfocado en las variables globales y la distribución base.
