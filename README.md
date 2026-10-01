# UTI Seccional 11

Web responsive con video de portada, beneficios filtrables, notas, orientación gremial, obra social, turismo, calendario navegable con exportación .ics y mapa de Perú 1567, CABA.

## Desarrollo

Requiere Node.js 20.19+ o 22.12+.

```sh
npm install
npm run dev
npm run build
```

## Hostinger

Ejecutar `npm ci` y `npm run build`. Subir **el contenido de `dist`** a `public_html` mediante el administrador de archivos o FTP. El repositorio contiene el código fuente: copiarlo sin compilar no equivale a publicar la web. No requiere servidor Node en producción. Si se usa integración Git con ejecución de builds, configurar `npm ci && npm run build` y directorio de salida `dist`.

## Vercel

Importar `Ivosero/Web-de-la-UTI`, elegir Vite, comando `npm run build` y salida `dist`. La configuración está incluida en `vercel.json`.

## Editar contenidos

- `src/page-template.html`: identidad, dirección, contacto, secciones y enlaces.
- `src/main.js`: beneficios, detalles, novedades y eventos.
- `src/style.css`: colores, tipografía y distribución responsive.
- `public/assets`: logo, fotos y video `hero.mp4`; reemplazarlo por material institucional antes de lanzar.

Los datos de teléfono, correo y horario son ilustrativos. Las notas, eventos, destinos y condiciones de beneficios son de demostración, identificados en pantalla. No se anuncian montos ni descuentos oficiales sin confirmación. No existe envío de formularios ni captura de datos personales. Los enlaces de obra social deben incorporarse al confirmar el prestador y la cartilla oficial.

## Medios y referencias

Logo proporcionado por el usuario. Fotos ilustrativas descargadas de Unsplash (las URL se registran en `download-assets.cjs`). Video ilustrativo: https://samplelib.com/lib/preview/mp4/sample-20s.mp4 (sustituir por un video institucional con derechos verificados antes de producción). La descarga permite que las fotos y el video funcionen desde el hosting sin depender de sus CDN.

Transporte orientativo para el entorno de Parque Lezama; no representa una parada exacta ni información en tiempo real. Referencia GCBA: https://buenosaires.gob.ar/sites/default/files/media/document/2022/08/17/694513bc7addb3de09142fe05a5f2d1783002955.pdf. Planificar el viaje en https://recorridos.usig.buenosaires.gob.ar/.

Video silenciado en bucle, control de pausa, poster de respaldo y respeto de movimiento reducido y ahorro de datos. Mapa externo cargado de forma diferida. Fotografías con textos alternativos y controles accesibles con teclado.

## Muestra publicada

https://web-de-la-uti.vercel.app/

Repositorio: https://github.com/Ivosero/Web-de-la-UTI



## Páginas independientes

El inicio conserva el video y accesos a las secciones. Cada opción del menú abre una página propia: `seccional.html`, `beneficios.html`, `turismo.html`, `obra-social.html`, `info-gremial.html`, `novedades.html`, `agenda.html` y `contacto.html`.

La fuente compartida está en `src/page-template.html`. El generador `scripts/generate-pages.mjs` construye el inicio y las páginas; se ejecuta automáticamente con `npm run build`. Para modificar contenidos de las secciones, editar la plantilla y ejecutar `npm run pages` antes de usar el servidor de desarrollo. No editar los HTML generados directamente porque se regeneran al compilar.

El logo OSUTI se presenta en una versión vectorial preparada para mantener nitidez al escalar, basada en la identidad visual proporcionada. La fotografía de casamiento se reemplazó por una imagen ilustrativa clara de una decoración de ceremonia. El sitio no requiere reglas de redirección: los archivos HTML de cada página se incluyen en `dist` y en el ZIP para Hostinger.

## Inicio completo y menú de Beneficios

El inicio vuelve a mostrar las secciones completas, incluyendo beneficios por casamiento, nacimiento, gimnasio, estudiantes, turismo, novedades, calendario, obra social y contacto con mapa. Los enlaces del menú conservan páginas propias. Turismo y Obra social se agrupan en el submenú de Beneficios; la obra social se presenta separada de las tarjetas de beneficios.

## Menú e imágenes gremiales

El menú usa iluminación azul al pasar el mouse. Beneficios abre automáticamente su submenú en equipos con puntero y conserva apertura por toque y teclado. Fotografías de archivo de UTI y CGT incorporadas en Información gremial (inicio y página propia), con fuente visible: https://www.portalsur.com.ar/2025/10/31/tras-un-muy-fuerte-reclamo-pami-promete-convocar-a-paritarias/ y https://cgtoficial.org/. Archivos locales: `uti-gremial.jpg` y `cgt-encuentro.jpeg`.

La fotografía de UTI con otros gremios fue reemplazada por la identidad institucional de UTI Seccional 11 proporcionada por el usuario, tanto en la tarjeta como en el fondo. La imagen de archivo de CGT se conserva.
