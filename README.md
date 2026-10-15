# Dominatus · Operación Imperator

Visor de la campaña para consultar el mapa planetario, sus fases, las alianzas y los personajes.

La web pública se despliega automáticamente en GitHub Pages al subir cambios a `main`. El proceso de publicación copia `index.html`, las imágenes, las alianzas y solo los archivos de fase cuyo campo `visible` no sea `false`. Por tanto, `fase-1.json` puede permanecer en el repositorio sin aparecer en la web publicada.

Para trabajar en local:

```powershell
npm.cmd start
```

Abre `http://localhost:4173`. Para publicar una fase nueva, cambia su campo `visible` a `true`, ejecuta `npm.cmd run sectors:index` y sube los cambios a `main`. El despliegue también regenera el índice de fases visibles.

## Personajes

Cada personaje tiene un archivo JSON en `characters/`. Añade el nombre del archivo a `characters/index.json` para mostrarlo en la pestaña **Personajes**. Los campos son `nombre`, `foto` (ruta desde la raíz de la web), `biografia`, `alianza` (`imperial` u `orka`), `faccion`, `rango` y `batallasImportantes` (lista de textos). La página agrupa las fichas por alianza y muestra la facción debajo del nombre; al abrir una tarjeta aparecen la biografía y las batallas. Si la lista de batallas está vacía, muestra «Aún no hay registros notorios en la campaña.». Guarda las imágenes en `characters/images/`.

El repositorio es público: aunque una fase no se publique en GitHub Pages, su JSON seguirá siendo legible desde el código de GitHub. No guardes secretos en los archivos del repositorio.
