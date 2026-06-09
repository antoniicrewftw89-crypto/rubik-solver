import { useState, useCallback } from 'react';
import { stateToSolverString, parseSolution } from '../utils/cubeNotation';

export function useCubeSolver() {
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retorna { success: true/false } para que App sepa si cambiar pantalla
  const solve = useCallback(async (cubeState) => {
    setIsLoading(true);
    setError(null);
    setSolution(null);

    try {
      // El build para navegador (ESM) expone un objeto { default, Solver, ... }
      // mientras que el de Node expone la función directamente. Desempaquetamos
      // hasta dar con la función solver.
      const mod = await import('rubiks-cube-solver');
      let solver = mod.default ?? mod;
      if (typeof solver !== 'function' && typeof solver?.default === 'function') {
        solver = solver.default;
      }
      const stateStr = stateToSolverString(cubeState);
      const raw = solver(stateStr);
      setSolution(parseSolution(raw));
      return { success: true };
    } catch (e) {
      // Parity error: el estado del cubo no es físicamente posible
      const msg = e.message?.toLowerCase().includes('parity') || e.message?.toLowerCase().includes('cannot')
        ? 'Este estado no es físicamente posible. Puede que hayas cambiado piezas de lugar o introducido los colores incorrectamente.'
        : 'Error al resolver. Verifica que los colores sean exactos.';
      setError(msg);
      console.error(e);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSolution(null);
    setError(null);
  }, []);

  return { solution, isLoading, error, solve, reset };
}
