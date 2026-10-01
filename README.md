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

- `index.html`: identidad, dirección, contacto, secciones y enlaces.
- `src/main.js`: beneficios, detalles, novedades y eventos.
- `src/style.css`: colores, tipografía y distribución responsive.
- `public/assets`: logo, fotos y video `hero.mp4`; reemplazarlo por material institucional antes de lanzar.

Los datos de teléfono, correo y horario son ilustrativos. Las notas, eventos, destinos y condiciones de beneficios son de demostración, identificados en pantalla. No se anuncian montos ni descuentos oficiales sin confirmación. No existe envío de formularios ni captura de datos personales. Los enlaces de obra social deben incorporarse al confirmar el prestador y la cartilla oficial.

## Medios y referencias

Logo proporcionado por el usuario. Fotos ilustrativas descargadas de Unsplash (las URL se registran en `download-assets.cjs`). Video ilustrativo: https://www.w3schools.com/howto/rain.mp4 (sustituir por un video institucional con derechos verificados antes de producción). La descarga permite que las fotos y el video funcionen desde el hosting sin depender de sus CDN.

Transporte orientativo para el entorno de Parque Lezama; no representa una parada exacta ni información en tiempo real. Referencia GCBA: https://buenosaires.gob.ar/sites/default/files/media/document/2022/08/17/694513bc7addb3de09142fe05a5f2d1783002955.pdf. Planificar el viaje en https://recorridos.usig.buenosaires.gob.ar/.

Video silenciado en bucle, control de pausa, poster de respaldo y respeto de movimiento reducido y ahorro de datos. Mapa externo cargado de forma diferida. Fotografías con textos alternativos y controles accesibles con teclado.

## Muestra publicada

https://web-de-la-uti.vercel.app/

Repositorio: https://github.com/Ivosero/Web-de-la-UTI

