import fs from 'node:fs';
const template=fs.readFileSync('src/page-template.html','utf8');
const pages=[
['nosotros','seccional','La seccional','La fuerza de estar juntos.','Participación, representación y acompañamiento para nuestra comunidad.'],
['beneficios','beneficios','Beneficios','Más cerca, todos los días.','Bienestar, educación y acompañamiento para vos y tu familia.'],
['turismo','turismo','Turismo','Tu próximo descanso empieza acá.','Propuestas para descubrir, compartir y disfrutar.'],
['salud','obra-social','Obra social','Tu bienestar, nuestra prioridad.','Accesos al sitio oficial, cartilla y atención al afiliado de OSUTI.'],
['gremial','info-gremial','Información gremial','Tus derechos nos unen.','Orientación laboral, consultas y representación gremial.'],
['novedades','novedades','Novedades','La seccional en movimiento.','Un espacio para las noticias y propuestas de nuestra comunidad.'],
['agenda','agenda','Agenda','Un lugar para cada encuentro.','Consultá las actividades y guardá las fechas en tu calendario.'],
['contacto','contacto','Contacto','Estamos para escucharte.','Visitá nuestra sede en Perú 1567, Ciudad Autónoma de Buenos Aires.']
];
const sections=Object.fromEntries(pages.map(([id])=>[id,template.match(new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`))[0]]));

const header=template.slice(0,template.indexOf('<main'));
const tail=template.slice(template.indexOf('</main>'));
function links(html){
for(const [id,slug] of pages)html=html.replaceAll(`href="#${id}"`,`href="/${slug}.html"`);
return html.replaceAll('href="#"','href="/"').replace('>Volver arriba ↑</a>','>Volver al inicio ↗</a>');
}
const nav=`<nav id="nav" aria-label="Navegación principal"><a href="/">Inicio</a>${pages.map(([,slug,label])=>`<a href="/${slug}.html"${slug==='contacto'?' class="nav-contact"':''}>${label}${slug==='contacto'?' ↗':''}</a>`).join('')}</nav>`;
function shell(body,slug,title){let h=links(header).replace(/<nav id="nav">[\s\S]*?<\/nav>/,nav);h=h.replace(/<title>.*?<\/title>/,`<title>${title} · UTI Seccional 11</title>`).replace('<body>',`<body data-page="${slug}">`);h=h.replaceAll(`href="/${slug}.html"`,`href="/${slug}.html" aria-current="page"`);if(slug==='inicio')h=h.replace('<a href="/">Inicio</a>','<a href="/" aria-current="page">Inicio</a>');return h+`<main id="contenido">${links(body)}`+links(tail);}
const hero=template.match(/<section class="hero">[\s\S]*?<\/section>/)[0];
const shortcuts=`<div class="quick"><a href="/obra-social.html"><span>✚</span><div><b>Tu salud, primero</b><small>Obra social y orientación</small></div>↗</a><a href="/beneficios.html"><span>♡</span><div><b>Beneficios para vos</b><small>En cada etapa de tu vida</small></div>↗</a><a href="/info-gremial.html"><span>◎</span><div><b>Información gremial</b><small>Tus derechos y representación</small></div>↗</a><a href="/agenda.html"><span>▦</span><div><b>Lo que viene</b><small>Encuentros y actividades</small></div>↗</a></div>`;
const homeGrid=`<section class="section home-sections"><div class="section-head"><div><span class="eyebrow">TU GREMIO. TU COMUNIDAD.</span><h2>Todo lo que necesitás,<br><em>más cerca.</em></h2></div><p>Elegí una sección para conocer sus propuestas y encontrar la información que buscás.</p></div><div class="section-links">${[['beneficios','beneficios','Beneficios','sport.jpg','Bienestar, educación, casamiento y nacimiento.'],['salud','obra-social','Obra social OSUTI','salud.jpg','Cartilla, afiliación y atención al afiliado.'],['gremial','info-gremial','Información gremial','capacitacion.jpg','Orientación laboral y representación.'],['turismo','turismo','Turismo','turismo.jpg','Tu próximo descanso empieza acá.'],['novedades','novedades','Novedades','comunidad.jpg','Lo que pasa en nuestra comunidad.'],['agenda','agenda','Agenda UTI','estudiantes.jpg','Encuentros y actividades de la seccional.']].map(([,slug,label,img,desc])=>`<a class="section-link" href="/${slug}.html"><img src="/assets/${img}" alt="Imagen ilustrativa de ${label}" loading="lazy"><div><h3>${label}</h3><p>${desc}</p><span>Entrar a la sección ↗</span></div></a>`).join('')}</div></section>`;
const intro=`<section class="home-intro"><div><span class="eyebrow light">UTI · SECCIONAL 11 · NIVEL CENTRAL</span><h2>Un gremio se construye<br><em>con su gente.</em></h2><p>Defendemos tus derechos y acompañamos cada etapa de tu vida.</p><a href="/seccional.html" class="button white">Conocé la seccional ↗</a></div><a class="home-osuti" href="/obra-social.html"><span class="osuti-logo-frame"><img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social"></span><span>Conocé tu obra social ↗</span></a></section>`;
fs.writeFileSync('index.html',shell(hero+shortcuts+homeGrid+intro,'inicio','Inicio'));
for(const [id,slug,label,heading,desc] of pages){let content=sections[id].replaceAll('/assets/osuti-logo.png','/assets/osuti-logo.svg');if(id==='nosotros')content+=template.match(/<section class="section faq">[\s\S]*?<\/section>/)[0];if(id==='salud')content=content.replace('<img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social">','<span class="osuti-logo-frame"><img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social"></span>');const masthead=`<section class="page-heading"><div class="breadcrumb"><a href="/">Inicio</a><span>/</span><span>${label}</span></div><span class="eyebrow">UTI SECCIONAL 11</span><h1>${label}</h1><p>${desc}</p></section>`;fs.writeFileSync(`${slug}.html`,shell(masthead+content,slug,label));}
fs.writeFileSync('vite.config.js',`import { defineConfig } from 'vite';\nimport { resolve } from 'node:path';\nexport default defineConfig({build:{rollupOptions:{input:Object.fromEntries(${JSON.stringify(['index',...pages.map(p=>p[1])])}.map(page=>[page,resolve(process.cwd(),page+'.html')]))}}});\n`);
console.log('Generadas 9 páginas HTML independientes.');
