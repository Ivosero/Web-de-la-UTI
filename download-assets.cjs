const fs = require('node:fs');
const assets = {
'hero.jpg':'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
'turismo.jpg':'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
'sport.jpg':'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85',
'estudiantes.jpg':'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=85',
'casamiento.jpg':'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
'nacimiento.jpg':'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=85',
'comunidad.jpg':'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85',
'capacitacion.jpg':'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85',
'salud.jpg':'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85',
'hero.mp4':'https://samplelib.com/lib/preview/mp4/sample-20s.mp4'
};
Promise.all(Object.entries(assets).map(async ([name,url])=>{try{const r=await fetch(url);if(!r.ok)throw Error(r.status);const buffer=Buffer.from(await r.arrayBuffer());fs.writeFileSync('public/assets/'+name,buffer);console.log(name+': '+buffer.length);}catch(e){console.log(name+': ERROR '+e.message);process.exitCode=1;}}));


