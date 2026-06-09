/**
 * Motor del cubo de Rubik.
 *
 * Modela el cubo como 54 stickers ubicados en posiciones 3D (x,y,z ∈ {-1,0,1})
 * con un vector normal hacia afuera. Aplicar un movimiento = rotar 90° los
 * stickers de la(s) capa(s) afectada(s). Reconstruir el estado de 6 caras a
 * partir de las nuevas posiciones/normales.
 *
 * La representación de 6 caras (F,R,U,D,L,B), cada una array de 9 leído "como un
 * libro" (fila 0 arriba, columna 0 a la izquierda), coincide con la orientación
 * que espera `rubiks-cube-solver` y con `stateToSolverString` en cubeNotation.js.
 *
 * El mismo metadata de movimiento (eje, capas, ángulo) se reutiliza en el visor
 * 3D para que la animación gire en el mismo sentido que la lógica.
 */

import { SOLVED_STATE } from './cubeNotation.js';

// Geometría de cada cara: normal (N) hacia afuera, y los vectores del plano de la
// cara que corresponden a "derecha" (rDir) y "arriba" (upDir) en la vista de lectura.
// Derivados de la orientación de lectura que pide el solver (ver README de la lib).
const FACE_GEOMETRY = {
  F: { N: [0, 0, 1],  rDir: [1, 0, 0],  upDir: [0, 1, 0] },
  B: { N: [0, 0, -1], rDir: [-1, 0, 0], upDir: [0, 1, 0] },
  R: { N: [1, 0, 0],  rDir: [0, 0, -1], upDir: [0, 1, 0] },
  L: { N: [-1, 0, 0], rDir: [0, 0, 1],  upDir: [0, 1, 0] },
  U: { N: [0, 1, 0],  rDir: [1, 0, 0],  upDir: [0, 0, -1] },
  D: { N: [0, -1, 0], rDir: [1, 0, 0],  upDir: [0, 0, 1] },
};

const FACES = ['F', 'R', 'U', 'D', 'L', 'B'];

// Posición 3D del sticker `index` (0-8) de una cara. index = fila*3 + col.
// fila 0 = arriba (+upDir), col 0 = izquierda (-rDir).
function stickerPos(face, index) {
  const { N, rDir, upDir } = FACE_GEOMETRY[face];
  const col = index % 3;
  const row = Math.floor(index / 3);
  return [
    N[0] + rDir[0] * (col - 1) + upDir[0] * (1 - row),
    N[1] + rDir[1] * (col - 1) + upDir[1] * (1 - row),
    N[2] + rDir[2] * (col - 1) + upDir[2] * (1 - row),
  ];
}

// Cara a la que pertenece una normal (vector entero unitario).
function faceFromNormal(n) {
  for (const f of FACES) {
    const N = FACE_GEOMETRY[f].N;
    if (N[0] === n[0] && N[1] === n[1] && N[2] === n[2]) return f;
  }
  return null;
}

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// (posición, normal) → índice 0-8 dentro de su cara.
function indexFromPosNormal(pos, normal) {
  const face = faceFromNormal(normal);
  const { N, rDir, upDir } = FACE_GEOMETRY[face];
  const local = [pos[0] - N[0], pos[1] - N[1], pos[2] - N[2]];
  const col = Math.round(dot(local, rDir)) + 1;
  const row = 1 - Math.round(dot(local, upDir));
  return { face, index: row * 3 + col };
}

// Rotación exacta de un vector entero alrededor de un eje canónico, en múltiplos de 90°.
function rotateVec(v, axis, deg) {
  const norm = ((deg % 360) + 360) % 360;
  const c = norm === 180 ? -1 : 0;
  const s = norm === 90 ? 1 : norm === 270 ? -1 : 0;
  let [x, y, z] = v;
  if (axis === 'x') return [x, Math.round(y * c - z * s), Math.round(y * s + z * c)];
  if (axis === 'y') return [Math.round(x * c + z * s), y, Math.round(-x * s + z * c)];
  return [Math.round(x * c - y * s), Math.round(x * s + y * c), z]; // z
}

const AXIS_INDEX = { x: 0, y: 1, z: 2 };

// Definición de la cara base de cada movimiento: eje y signo de su normal.
// El sentido horario visto desde afuera equivale a rotar -90°·signo alrededor del eje.
const BASE_MOVE = {
  R: { axis: 'x', sign: 1 },
  L: { axis: 'x', sign: -1 },
  U: { axis: 'y', sign: 1 },
  D: { axis: 'y', sign: -1 },
  F: { axis: 'z', sign: 1 },
  B: { axis: 'z', sign: -1 },
  // Slices: giran igual que la cara que les "marca el sentido" (M↔L, E↔D, S↔F).
  M: { axis: 'x', sign: -1 },
  E: { axis: 'y', sign: -1 },
  S: { axis: 'z', sign: 1 },
};

/**
 * Interpreta un movimiento en notación (admite "F", "F'", "Fprime", "F2",
 * minúsculas de doble capa "r", y slices "M"/"E"/"S") y devuelve su metadata:
 * { axis, layers (valores de coord. afectados), angleDeg (con signo) }.
 */
export function parseMove(rawMove) {
  const move = rawMove.replace('prime', "'").trim();
  if (!move) return null;

  const baseChar = move[0];
  const isDouble = /[frudlb]/.test(baseChar); // minúscula = doble capa
  const isSlice = /[MES]/.test(baseChar);
  const key = baseChar.toUpperCase();
  const base = BASE_MOVE[key];
  if (!base) return null;

  const suffix = move.slice(1);
  const turns = suffix.includes("'") ? -1 : suffix.includes('2') ? 2 : 1;

  // Ángulo base horario = -90·signo; prime invierte; 2 → 180.
  let angleDeg;
  if (turns === 2) angleDeg = 180;
  else angleDeg = -90 * base.sign * turns;

  // Capas afectadas (valores de la coordenada del eje).
  let layers;
  if (isSlice) layers = [0];
  else if (isDouble) layers = [base.sign, 0];
  else layers = [base.sign];

  return { axis: base.axis, layers, angleDeg };
}

/** Aplica un movimiento al estado y devuelve un estado nuevo. */
export function applyMove(state, rawMove) {
  const meta = parseMove(rawMove);
  if (!meta) return state;
  const { axis, layers, angleDeg } = meta;
  const ai = AXIS_INDEX[axis];

  const next = {};
  for (const f of FACES) next[f] = state[f].slice();

  for (const face of FACES) {
    for (let i = 0; i < 9; i++) {
      const pos = stickerPos(face, i);
      if (!layers.includes(Math.round(pos[ai]))) continue; // sticker fuera de la capa
      const color = state[face][i];
      const newPos = rotateVec(pos, axis, angleDeg);
      const newNormal = rotateVec(FACE_GEOMETRY[face].N, axis, angleDeg);
      const dst = indexFromPosNormal(newPos, newNormal);
      next[dst.face][dst.index] = color;
    }
  }
  return next;
}

/** Aplica una secuencia de movimientos. */
export function applyMoves(state, moves) {
  return moves.reduce((s, m) => applyMove(s, m), state);
}

const SCRAMBLE_FACES = ['U', 'D', 'L', 'R', 'F', 'B'];
const SCRAMBLE_SUFFIX = ['', "'", '2'];

/**
 * Genera una mezcla aleatoria físicamente válida (parte del cubo resuelto y
 * aplica movimientos de cara, sin repetir cara consecutiva).
 * Devuelve { state, moves }.
 */
export function scramble(count = 25) {
  const moves = [];
  let last = null;
  for (let i = 0; i < count; i++) {
    let face;
    do { face = SCRAMBLE_FACES[Math.floor(Math.random() * 6)]; } while (face === last);
    last = face;
    moves.push(face + SCRAMBLE_SUFFIX[Math.floor(Math.random() * 3)]);
  }
  return { state: applyMoves(SOLVED_STATE, moves), moves };
}

/**
 * Color (letra de cara) del sticker de un cubie en la posición `pos`
 * (coords ∈ {-1,0,1}) mirando en la dirección `dir` (vector normal unitario).
 * Devuelve null si ese cubie no tiene cara exterior en esa dirección.
 * Lo usa el visor 3D para pintar cada cubie según el estado.
 */
export function stickerColor(state, pos, dir) {
  const ai = dir.findIndex(v => v !== 0);
  if (Math.round(pos[ai]) !== dir[ai]) return null; // no es cara exterior
  const { face, index } = indexFromPosNormal(pos, dir);
  return state[face][index];
}

export { FACE_GEOMETRY, stickerPos };
