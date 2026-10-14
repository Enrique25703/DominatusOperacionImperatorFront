# Fases y sectores

Cada archivo JSON de esta carpeta, excepto `index.json`, representa una fase de campaña.

- `fase`: número usado para ordenar las fases.
- `nombre`: texto mostrado en el desplegable.
- `visible`: escribe `false` para que una fase no aparezca en el selector. Con `true` (o sin este campo) se publica en el índice.
- `sectores`: lista de áreas del mapa.
- `control`: admite `imperiales` u `orkos`.
- `Activo`: solo el valor booleano `true` hace visible la ficha completa. Esa zona parpadea en naranja y muestra `Disputado`. Cualquier otro valor oculta todo salvo el nombre y muestra una pantalla de señal débil; tampoco se revela el control en el mapa.
- `nombre`: nombre completo de la región en la ficha. `etiqueta` es el rótulo del mapa.
- `informacion`: trasfondo de la región. El visor también acepta `descripcion` en fases antiguas.
- `reglasTerreno`: lista de reglas. Cada entrada puede ser un texto o un objeto con `nombre` y `regla`. Si está vacía, se indica que aún no hay reglas publicadas.
- `bonificacionVictoria`: texto si la misma bonificación corresponde a la alianza que controle la región; también admite un objeto con recompensas distintas para `imperiales` y `orkos`. Un texto vacío aparece como pendiente de definir.
- `enfrentamientos`: lista de enfrentamientos. Cada uno tiene `contendientes`, una lista de exactamente dos tarjetas. Si la lista está vacía, aparece el aviso de enfrentamientos menores.
- `puntos`: vértices `[x, y]` del polígono. Ambos valores van de `0` a `100`, tomando como referencia el ancho y el alto del mapa.

Ejemplo de los datos de una región (con un enfrentamiento):

```json
{
  "informacion": "Un antiguo paso de montaña convertido en frente de batalla.",
  "reglasTerreno": [
    { "nombre": "Cobertura densa", "regla": "Las ruinas ofrecen cobertura." },
    { "nombre": "Paso estrecho", "regla": "El paso limita el avance." }
  ],
  "bonificacionVictoria": "La alianza que controle la región obtiene una ventaja de campaña.",
  "enfrentamientos": [
    {
      "contendientes": [
        {
          "senorGuerra": "assets/senor-imperial.png",
          "ejercito": "256.ª de Cadia",
          "faccion": "Astra Militarum"
        },
        {
          "senorGuerra": "assets/senor-orko.png",
          "ejercito": "Waaagh! del Colmillo",
          "faccion": "Orkos"
        }
      ]
    }
  ]
}
```

`senorGuerra` es la ruta de la imagen del señor de la guerra, relativa a la raíz del proyecto. Guarda las imágenes en `assets/` y cambia los nombres del ejemplo por los archivos reales. Para una región sin combates registrados, escribe `"enfrentamientos": []`.

La pantalla de señal débil aparece también cuando no hay ninguna zona seleccionada. Usa `assets/Emblema holográfico del cráneo cibernético.png`. No hace falta añadir un campo de imagen a cada sector.

Esta ocultación es visual: en una web estática publicada con GitHub Pages, los archivos JSON siguen siendo accesibles directamente. No guardes en ellos secretos que deban ser inaccesibles para los jugadores.

Si cada alianza debe recibir una bonificación distinta, usa `"bonificacionVictoria": { "imperiales": "...", "orkos": "..." }` en lugar del texto común.

Para crear otra fase, duplica `fase-1.json`, cambia sus datos y ejecuta:

```powershell
npm.cmd run sectors:index
```

`npm.cmd start` también actualiza automáticamente `index.json`, incluyendo solo las fases visibles. Hay que guardar ese índice en GitHub junto con los archivos de fase para que GitHub Pages conozca las fases publicadas. Para mostrar la Fase 1, cambia su `visible` a `true` y vuelve a generar el índice.
