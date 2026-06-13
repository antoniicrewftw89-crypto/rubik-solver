// Primer test del proyecto: la lógica pura de notación y validación del cubo.
import { describe, expect, it } from 'vitest';
import {
  SOLVED_STATE,
  explainMove,
  formatMove,
  getValidationErrors,
  parseSolution,
  stateToSolverString,
  validateCubeState,
} from './cubeNotation';

describe('stateToSolverString', () => {
  it('serializa las 6 caras en orden F R U D L B (54 chars)', () => {
    const str = stateToSolverString(SOLVED_STATE);
    expect(str).toHaveLength(54);
    expect(str).toBe('f'.repeat(9) + 'r'.repeat(9) + 'u'.repeat(9) + 'd'.repeat(9) + 'l'.repeat(9) + 'b'.repeat(9));
  });
});

describe('parseSolution', () => {
  it('divide la solución en movimientos', () => {
    expect(parseSolution("R U R' U'")).toEqual(['R', 'U', "R'", "U'"]);
  });
  it('vacío o espacios → []', () => {
    expect(parseSolution('')).toEqual([]);
    expect(parseSolution('   ')).toEqual([]);
    expect(parseSolution(null)).toEqual([]);
  });
});

describe('formatMove / explainMove', () => {
  it("convierte 'prime' a apóstrofe", () => {
    expect(formatMove('Rprime')).toBe("R'");
  });
  it('explica sentido horario, antihorario y 180°', () => {
    expect(explainMove('R')).toBe('Derecha — horario');
    expect(explainMove('Uprime')).toBe('Superior — antihorario');
    expect(explainMove('F2')).toBe('Frontal — 180°');
  });
});

describe('validación del estado', () => {
  it('el cubo resuelto es válido', () => {
    expect(getValidationErrors(SOLVED_STATE)).toEqual([]);
    expect(validateCubeState(SOLVED_STATE)).toBeNull();
  });

  it('detecta stickers de más y de menos por color', () => {
    const roto = { ...SOLVED_STATE, F: [...SOLVED_STATE.F] };
    roto.F[0] = 'r'; // un verde menos, un rojo más
    const errores = getValidationErrors(roto);
    expect(errores.length).toBeGreaterThanOrEqual(2);
    const caras = errores.map(e => e.face).sort();
    expect(caras).toContain('F');
    expect(caras).toContain('R');
    expect(validateCubeState(roto)).toMatch(/Verde|Rojo/);
  });
});
