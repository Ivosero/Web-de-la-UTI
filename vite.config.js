import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({build:{rollupOptions:{input:Object.fromEntries(["index","seccional","beneficios","turismo","obra-social","info-gremial","novedades","agenda","contacto"].map(page=>[page,resolve(process.cwd(),page+'.html')]))}}});
