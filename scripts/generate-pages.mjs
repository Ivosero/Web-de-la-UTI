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
const nav=`<nav id="nav" aria-label="Navegación principal"><a href="/">Inicio</a><a href="/seccional.html">La seccional</a><div class="nav-benefits"><div class="nav-benefits-heading"><a href="/beneficios.html">Beneficios</a><button id="benefits-toggle" type="button" aria-expanded="false" aria-controls="benefits-submenu" aria-label="Abrir opciones de Beneficios">⌄</button></div><div id="benefits-submenu" class="benefits-submenu" hidden><a href="/beneficios.html">Todos los beneficios</a><a href="/turismo.html">Turismo</a><a href="/obra-social.html">Obra social · OSUTI</a></div></div><a href="/info-gremial.html">Información gremial</a><a href="/novedades.html">Novedades</a><a href="/agenda.html">Agenda</a><a href="/contacto.html" class="nav-contact">Contacto ↗</a></nav>`;
function shell(body,slug,title){let h=links(header).replace(/<nav id="nav">[\s\S]*?<\/nav>/,nav);h=h.replace(/<title>.*?<\/title>/,`<title>${title} · UTI Seccional 11</title>`).replace('<body>',`<body data-page="${slug}">`);h=h.replaceAll(`href="/${slug}.html"`,`href="/${slug}.html" aria-current="page"`);if(slug==='inicio')h=h.replace('<a href="/">Inicio</a>','<a href="/" aria-current="page">Inicio</a>');return h+`<main id="contenido">${links(body)}`+links(tail);}
const hero=template.match(/<section class="hero">[\s\S]*?<\/section>/)[0];
const shortcuts=`<div class="quick"><a href="/obra-social.html"><span>✚</span><div><b>Tu salud, primero</b><small>Obra social y orientación</small></div>↗</a><a href="/beneficios.html"><span>♡</span><div><b>Beneficios para vos</b><small>En cada etapa de tu vida</small></div>↗</a><a href="/info-gremial.html"><span>◎</span><div><b>Información gremial</b><small>Tus derechos y representación</small></div>↗</a><a href="/agenda.html"><span>▦</span><div><b>Lo que viene</b><small>Encuentros y actividades</small></div>↗</a></div>`;
const homeSection=id=>{let section=sections[id].replaceAll('/assets/osuti-logo.png','/assets/osuti-logo.svg');if(id==='salud')section=section.replace('<img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social">','<span class="osuti-logo-frame"><img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social"></span>');return section;};
const homeFaq=template.match(/<section class="section faq">[\s\S]*?<\/section>/)[0];
const homeContent=hero+shortcuts+['beneficios','turismo','salud','gremial','novedades','agenda','nosotros'].map(homeSection).join('')+homeFaq+homeSection('contacto')+'<div class="closing"><p>La fuerza de estar juntos.</p><a href="/contacto.html">Contactanos ↗</a></div>';
fs.writeFileSync('index.html',shell(homeContent,'inicio','Inicio'));
for(const [id,slug,label,heading,desc] of pages){let content=sections[id].replaceAll('/assets/osuti-logo.png','/assets/osuti-logo.svg');if(id==='beneficios')content+=`<section class="benefits-health section"><div><span class="eyebrow">TU OBRA SOCIAL</span><h2>OSUTI, cerca tuyo.</h2><p>Cartilla, afiliación y atención al afiliado en su espacio propio.</p><a href="/obra-social.html" class="button blue">Conocé OSUTI ↗</a></div><a href="/obra-social.html" aria-label="Abrir la página de OSUTI"><span class="osuti-logo-frame"><img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social"></span></a></section>`;if(id==='nosotros')content+=template.match(/<section class="section faq">[\s\S]*?<\/section>/)[0];if(id==='salud')content=content.replace('<img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social">','<span class="osuti-logo-frame"><img src="/assets/osuti-logo.svg" alt="OSUTI Obra Social"></span>');const masthead=`<section class="page-heading"><div class="breadcrumb"><a href="/">Inicio</a><span>/</span><span>${label}</span></div><span class="eyebrow">UTI SECCIONAL 11</span><h1>${label}</h1><p>${desc}</p></section>`;fs.writeFileSync(`${slug}.html`,shell(masthead+content,slug,label));}
fs.writeFileSync('vite.config.js',`import { defineConfig } from 'vite';\nimport { resolve } from 'node:path';\nexport default defineConfig({build:{rollupOptions:{input:Object.fromEntries(${JSON.stringify(['index',...pages.map(p=>p[1])])}.map(page=>[page,resolve(process.cwd(),page+'.html')]))}}});\n`);
console.log('Generadas 9 páginas HTML independientes.');
