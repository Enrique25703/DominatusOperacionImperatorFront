# Dominatus · Operación Imperator

Visor de la campaña para consultar el mapa planetario, sus fases, las alianzas, los personajes, el Codex narrativo y la Armería.

La web pública se despliega automáticamente en GitHub Pages al subir cambios a `main`. El proceso de publicación copia `index.html`, las imágenes, las alianzas, los personajes, el Codex, la Armería y solo los archivos de fase cuyo campo `visible` no sea `false`. Por tanto, `fase-1.json` puede permanecer en el repositorio sin aparecer en la web publicada.

Para trabajar en local:

```powershell
npm.cmd start
```

Abre `http://localhost:4173`. Para publicar una fase nueva, cambia su campo `visible` a `true`, ejecuta `npm.cmd run sectors:index` y sube los cambios a `main`. El despliegue también regenera el índice de fases visibles.

## Personajes

Cada personaje tiene un archivo JSON en `characters/`. Añade el nombre del archivo a `characters/index.json` para mostrarlo en la pestaña **Personajes**. Los campos son `nombre`, `foto` (ruta desde la raíz de la web), `biografia`, `alianza` (`imperial` u `orka`), `faccion`, `rango` y `batallasImportantes` (lista de textos). La página agrupa las fichas por alianza y muestra la facción debajo del nombre; al abrir una tarjeta aparecen la biografía y las batallas. Si la lista de batallas está vacía, muestra «Aún no hay registros notorios en la campaña.». Guarda las imágenes en `characters/images/`.

## Codex

Las entradas narrativas se editan en `data/codex.json`. Cada objeto del array puede incluir `id`, `fase`, `titulo`, `subtitulo`, `categoria`, `fecha`, `imagen` y `contenido`. Los bloques de `contenido` se muestran en el orden del JSON y admiten los tipos `titulo`, `parrafo`, `destacado`, `separador`, `siguienteFase` e `imagen` (con `src` y `alt`). En los destacados, `**texto**` marca una parte en negrita. La página ordena las entradas por fase y después por fecha; `imagen: null` omite la ilustración de cabecera. Un bloque `imagen` con `src: null` se reserva para una ilustración futura y no muestra ningún espacio vacío. Añadir otra entrada al array no requiere modificar la página.

## Armería

Las 35 mejoras de Dominatus están en `data/armeria.json`, agrupadas en Battle Skills, Battle Honours y Relics. Cada carta contiene su destinatario, efectos y bonificación condicional cuando existe. El texto de las cartas está redactado en inglés y puede editarse directamente en ese archivo. La vista genera las tarjetas desde el JSON y enlaza con la fuente de las reglas.

El repositorio es público: aunque una fase no se publique en GitHub Pages, su JSON seguirá siendo legible desde el código de GitHub. No guardes secretos en los archivos del repositorio.
