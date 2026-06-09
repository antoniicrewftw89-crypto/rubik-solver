# 🧩 Rubik Solver

Aplicación web que resuelve un cubo de Rubik 3×3 y **anima la solución paso a paso**
en un cubo 3D. Puedes introducir el cubo de dos formas: pintando las caras a mano o
escaneándolas con la cámara.

## Características

- **Visor 3D real** (three.js): 27 cubies con stickers, iluminación de estudio y
  sombras. Gira solo, se arrastra y hace zoom.
- **Solución animada**: el cubo ejecuta cada movimiento con controles de
  reproducir / pausar / paso a paso y velocidad ajustable.
- **Entrada manual**: editor por caras + vista desplegada (mapa en cruz) del cubo.
- **Escaneo por cámara**: detección de colores por matiz (HSL) resistente a la
  iluminación.
- **Validación**: conteo de stickers en vivo y mensajes claros si el estado no es
  físicamente posible.
- **Botón "Mezclar"**: genera una mezcla aleatoria válida para probar al instante.

## Stack

- React 19 + Vite
- three.js · @react-three/fiber · @react-three/drei
- [`rubiks-cube-solver`](https://www.npmjs.com/package/rubiks-cube-solver) (método Fridrich)

## Cómo funciona

`src/utils/cubeEngine.js` modela el cubo como 54 stickers con posición 3D y normal;
cada movimiento es una rotación exacta de 90° de la capa afectada. El mismo metadata
del movimiento (eje, capas, ángulo) alimenta tanto la lógica como la animación del
visor, así que ambos giran en el mismo sentido físico. El estado se serializa en el
orden **F R U D L B** que espera el solver.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción
npm run lint     # linter
```
