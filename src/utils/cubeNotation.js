export const FACE_COLORS = {
  f: '#21c25e', // verde
  r: '#ef4444', // rojo
  u: '#f5f7fa', // blanco
  d: '#facc15', // amarillo
  l: '#fb923c', // naranja
  b: '#3b82f6', // azul
};

export const FACE_BORDER_COLORS = {
  f: '#15803d', r: '#b91c1c', u: '#cbd5e1',
  d: '#ca8a04', l: '#c2410c', b: '#1d4ed8',
};

export const FACE_LABELS = {
  F: 'Frontal (verde)', R: 'Derecha (roja)',
  U: 'Superior (blanca)', D: 'Inferior (amarilla)',
  L: 'Izquierda (naranja)', B: 'Trasera (azul)',
};

export const COLOR_NAMES = {
  f: 'Verde', r: 'Rojo', u: 'Blanco',
  d: 'Amarillo', l: 'Naranja', b: 'Azul',
};

// Instrucción de orientación para cada cara al introducir colores
export const FACE_ORIENTATIONS = {
  F: 'Cara verde frente a ti — blanco arriba',
  R: 'Cara roja frente a ti — blanco arriba',
  U: 'Cara blanca frente a ti — verde apuntando abajo',
  D: 'Cara amarilla frente a ti — verde apuntando arriba',
  L: 'Cara naranja frente a ti — blanco arriba',
  B: 'Cara azul frente a ti — blanco arriba',
};

export const SOLVED_STATE = {
  F: Array(9).fill('f'),
  R: Array(9).fill('r'),
  U: Array(9).fill('u'),
  D: Array(9).fill('d'),
  L: Array(9).fill('l'),
  B: Array(9).fill('b'),
};

// Orden: F(9) R(9) U(9) D(9) L(9) B(9) → 54 chars
export function stateToSolverString(state) {
  return [...state.F, ...state.R, ...state.U, ...state.D, ...state.L, ...state.B].join('');
}

export function formatMove(rawMove) {
  return rawMove.replace('prime', "'");
}

export function parseSolution(rawSolution) {
  if (!rawSolution || rawSolution.trim() === '') return [];
  return rawSolution.trim().split(/\s+/).filter(Boolean);
}

const FACE_NAMES = {
  F: 'Frontal', f: 'Frontal doble',
  R: 'Derecha', r: 'Derecha doble',
  U: 'Superior', u: 'Superior doble',
  D: 'Inferior', d: 'Inferior doble',
  L: 'Izquierda', l: 'Izquierda doble',
  B: 'Trasera', b: 'Trasera doble',
  M: 'Medio M', E: 'Ecuador', S: 'Lateral S',
};

export function explainMove(rawMove) {
  const move = formatMove(rawMove);
  const base = move[0];
  const name = FACE_NAMES[base] || base;
  if (move.endsWith("'")) return `${name} — antihorario`;
  if (move.endsWith('2')) return `${name} — 180°`;
  return `${name} — horario`;
}

// Retorna array de errores detallados. Array vacío = cubo válido.
export function getValidationErrors(state) {
  const errors = [];
  const str = stateToSolverString(state);
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;

  const faceColorMap = { F: 'f', R: 'r', U: 'u', D: 'd', L: 'l', B: 'b' };

  for (const [face, color] of Object.entries(faceColorMap)) {
    const count = counts[color] || 0;
    if (count !== 9) {
      const diff = 9 - count;
      errors.push({
        face,
        type: 'count',
        msg: `${COLOR_NAMES[color]}: tienes ${count} sticker${count !== 1 ? 's' : ''} — ${diff > 0 ? `faltan ${diff}` : `sobran ${Math.abs(diff)}`}`,
      });
    }
  }

  return errors;
}

// Para compatibilidad: devuelve solo el primer error como string
export function validateCubeState(state) {
  const errors = getValidationErrors(state);
  return errors.length > 0 ? errors[0].msg : null;
}
