import { describe, it, expect } from 'vitest';
import { parseMove, applyMove, applyMoves, scramble } from './cubeEngine.js';
import { SOLVED_STATE } from './cubeNotation.js';

// ─── Helpers ────────────────────────────────────────────────────────────────

function deepClone(state) {
  return Object.fromEntries(Object.entries(state).map(([k, v]) => [k, [...v]]));
}

function colorCounts(state) {
  const counts = {};
  for (const stickers of Object.values(state)) {
    for (const c of stickers) counts[c] = (counts[c] || 0) + 1;
  }
  return counts;
}

// ─── parseMove ──────────────────────────────────────────────────────────────

describe('parseMove', () => {
  it('movimiento simple — F gira el eje Z capa 1 en -90°', () => {
    expect(parseMove('F')).toEqual({ axis: 'z', layers: [1], angleDeg: -90 });
  });

  it('movimiento prima — F\' invierte el ángulo', () => {
    expect(parseMove("F'")).toEqual({ axis: 'z', layers: [1], angleDeg: 90 });
  });

  it('notación alternativa prima — Fprime equivale a F\'', () => {
    expect(parseMove('Fprime')).toEqual(parseMove("F'"));
  });

  it('movimiento doble — F2 da 180°', () => {
    expect(parseMove('F2')).toEqual({ axis: 'z', layers: [1], angleDeg: 180 });
  });

  it('cara R — eje X capa 1', () => {
    const m = parseMove('R');
    expect(m.axis).toBe('x');
    expect(m.layers).toContain(1);
  });

  it('cara L — eje X capa -1', () => {
    const m = parseMove('L');
    expect(m.axis).toBe('x');
    expect(m.layers).toContain(-1);
  });

  it('cara U — eje Y', () => {
    expect(parseMove('U').axis).toBe('y');
  });

  it('slice M — solo afecta la capa 0', () => {
    expect(parseMove('M').layers).toEqual([0]);
  });

  it('minúscula r — doble capa (1 y 0)', () => {
    const m = parseMove('r');
    expect(m.layers).toContain(1);
    expect(m.layers).toContain(0);
  });

  it('movimiento desconocido devuelve null', () => {
    expect(parseMove('X')).toBeNull();
    expect(parseMove('')).toBeNull();
  });
});

// ─── applyMove ──────────────────────────────────────────────────────────────

describe('applyMove', () => {
  it('un movimiento cambia el estado', () => {
    const after = applyMove(SOLVED_STATE, 'F');
    expect(after).not.toEqual(SOLVED_STATE);
  });

  it('no muta el estado original', () => {
    const before = deepClone(SOLVED_STATE);
    applyMove(SOLVED_STATE, 'R');
    expect(SOLVED_STATE).toEqual(before);
  });

  it('movimiento + su inverso = estado original (F y F\')', () => {
    const after = applyMove(applyMove(SOLVED_STATE, 'F'), "F'");
    expect(after).toEqual(SOLVED_STATE);
  });

  it('movimiento + su inverso = estado original (R y R\')', () => {
    const after = applyMove(applyMove(SOLVED_STATE, 'R'), "R'");
    expect(after).toEqual(SOLVED_STATE);
  });

  it('movimiento + su inverso = estado original (U y U\')', () => {
    const after = applyMove(applyMove(SOLVED_STATE, 'U'), "U'");
    expect(after).toEqual(SOLVED_STATE);
  });

  it('cuatro giros seguidos de la misma cara = estado original', () => {
    let s = SOLVED_STATE;
    for (let i = 0; i < 4; i++) s = applyMove(s, 'R');
    expect(s).toEqual(SOLVED_STATE);
  });

  it('F2 aplicado dos veces = estado original', () => {
    const after = applyMove(applyMove(SOLVED_STATE, 'F2'), 'F2');
    expect(after).toEqual(SOLVED_STATE);
  });

  it('movimiento inválido devuelve el estado sin cambios', () => {
    expect(applyMove(SOLVED_STATE, 'X')).toEqual(SOLVED_STATE);
  });
});

// ─── applyMoves ─────────────────────────────────────────────────────────────

describe('applyMoves', () => {
  it('lista vacía no cambia el estado', () => {
    expect(applyMoves(SOLVED_STATE, [])).toEqual(SOLVED_STATE);
  });

  it('secuencia + su inversa = estado original', () => {
    const moves = ['R', 'U', 'F', 'L', 'D', 'B'];
    const inverse = ["B'", "D'", "L'", "F'", "U'", "R'"];
    const after = applyMoves(applyMoves(SOLVED_STATE, moves), inverse);
    expect(after).toEqual(SOLVED_STATE);
  });

  it('sexy move (R U R\' U\') × 6 = estado original', () => {
    const sexyMove = ['R', 'U', "R'", "U'"];
    let s = SOLVED_STATE;
    for (let i = 0; i < 6; i++) s = applyMoves(s, sexyMove);
    expect(s).toEqual(SOLVED_STATE);
  });

  it('cada cara conserva exactamente 9 stickers después de una secuencia', () => {
    const after = applyMoves(SOLVED_STATE, ['R', 'U', "F'", 'L2', 'D', "B'"]);
    const counts = colorCounts(after);
    for (const count of Object.values(counts)) {
      expect(count).toBe(9);
    }
  });
});

// ─── scramble ───────────────────────────────────────────────────────────────

describe('scramble', () => {
  it('devuelve un objeto con state y moves', () => {
    const result = scramble(10);
    expect(result).toHaveProperty('state');
    expect(result).toHaveProperty('moves');
  });

  it('moves tiene la longitud pedida', () => {
    expect(scramble(15).moves).toHaveLength(15);
    expect(scramble(25).moves).toHaveLength(25);
  });

  it('con count=0 el estado es el resuelto', () => {
    expect(scramble(0).state).toEqual(SOLVED_STATE);
  });

  it('el estado mezclado tiene exactamente 9 stickers de cada color', () => {
    const { state } = scramble(20);
    const counts = colorCounts(state);
    for (const count of Object.values(counts)) {
      expect(count).toBe(9);
    }
  });

  it('dos scrambles distintos no producen el mismo estado (muy improbable)', () => {
    const a = scramble(20).state;
    const b = scramble(20).state;
    expect(a).not.toEqual(b);
  });
});
