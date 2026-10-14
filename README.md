# Dominatus · Operación Imperator

Visor de la campaña para consultar el mapa planetario, sus fases y las alianzas.

La web pública se despliega automáticamente en GitHub Pages al subir cambios a `main`. El proceso de publicación copia `index.html`, las imágenes, las alianzas y solo los archivos de fase cuyo campo `visible` no sea `false`. Por tanto, `fase-1.json` puede permanecer en el repositorio sin aparecer en la web publicada.

Para trabajar en local:

```powershell
npm.cmd start
```

Abre `http://localhost:4173`. Para publicar una fase nueva, cambia su campo `visible` a `true`, ejecuta `npm.cmd run sectors:index` y sube los cambios a `main`. El despliegue también regenera el índice de fases visibles.

El repositorio es público: aunque una fase no se publique en GitHub Pages, su JSON seguirá siendo legible desde el código de GitHub. No guardes secretos en los archivos del repositorio.
