# Rubik Solver — reglas del proyecto

Comunicación y comentarios de código **en español**.

## Estado y contexto
- **En qué voy / próximo paso:** [`ESTADO.md`](ESTADO.md) — léelo al **arrancar**,
  actualízalo al **cerrar** trabajo (convención del ecosistema: una verdad por capa).
- **Qué es y cómo se usa:** [`README.md`](README.md). Desplegado en vivo en Vercel.

## Notas clave
- React 19 + Vite + three.js. `src/utils/cubeEngine.js` es el núcleo: el cubo se modela
  como 54 stickers con posición 3D y normal; el **mismo metadata del movimiento**
  (eje, capas, ángulo) alimenta la lógica y la animación, así que giran en el mismo
  sentido físico. El estado se serializa en orden **F R U D L B** (lo que espera el solver).
- Detección de color de la cámara por **matiz (HSL)**, resistente a la iluminación.

## Antes de dar algo por hecho
`npm run build && npm run lint`. La UI la prueba Antonio en el navegador y reporta.
