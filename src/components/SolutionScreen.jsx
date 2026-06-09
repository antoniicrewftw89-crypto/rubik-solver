import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import CubeViewer from './CubeViewer';
import SolutionSteps from './SolutionSteps';
import { applyMoves } from '../utils/cubeEngine';

/**
 * Pantalla de solución: reproduce los movimientos animando el cubo 3D.
 *
 * stepIndex = nº de movimientos ya aplicados. El cubo mostrado es el estado tras
 * aplicar solution[0..stepIndex). Al "avanzar", se anima solution[stepIndex] y,
 * al terminar la animación, se incrementa stepIndex.
 *
 * El encadenado del autoplay ocurre en handleAnimDone (callback del visor, no un
 * effect), apoyándose en refs para leer los valores actuales sin re-render.
 * `animId` fuerza el reinicio de la animación aunque dos movimientos seguidos
 * tengan la misma notación (p. ej. "R" y "R").
 */
export default function SolutionScreen({ initialState, solution }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [animMove, setAnimMove] = useState(null);
  const [animId, setAnimId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const total = solution.length;

  const stepRef = useRef(0);
  const playingRef = useRef(false);
  useEffect(() => { stepRef.current = stepIndex; }, [stepIndex]);
  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);

  // Estado del cubo ANTES del movimiento que se está animando.
  const displayState = useMemo(
    () => applyMoves(initialState, solution.slice(0, stepIndex)),
    [initialState, solution, stepIndex]
  );

  const animateMove = useCallback((idx) => {
    setAnimMove(solution[idx]);
    setAnimId(k => k + 1);
  }, [solution]);

  const stopPlaying = useCallback(() => { playingRef.current = false; setIsPlaying(false); }, []);

  const handleAnimDone = useCallback(() => {
    const ns = Math.min(total, stepRef.current + 1);
    stepRef.current = ns;
    setStepIndex(ns);
    if (playingRef.current && ns < total) {
      animateMove(ns); // encadena el siguiente movimiento
    } else {
      setAnimMove(null);
      if (ns >= total) stopPlaying();
    }
  }, [total, animateMove, stopPlaying]);

  const next = () => { if (!animMove && stepIndex < total) animateMove(stepIndex); };
  const togglePlay = () => {
    if (playingRef.current) { stopPlaying(); return; }
    playingRef.current = true;
    setIsPlaying(true);
    if (!animMove && stepIndex < total) animateMove(stepIndex);
  };
  const goTo = (i) => { if (animMove) return; stopPlaying(); stepRef.current = i; setStepIndex(i); setAnimMove(null); };
  const prev = () => { if (stepIndex > 0) goTo(stepIndex - 1); };
  const first = () => goTo(0);
  const last = () => goTo(total);

  return (
    <main className="solution-layout">
      <section className="solution-cube">
        <CubeViewer
          cubeState={displayState}
          animMove={animMove}
          animId={animId}
          onAnimDone={handleAnimDone}
          speed={speed}
          autoRotate={false}
          tall
        />
      </section>
      <section className="solution-steps-panel">
        <SolutionSteps
          solution={solution}
          stepIndex={stepIndex}
          isPlaying={isPlaying}
          speed={speed}
          onFirst={first}
          onPrev={prev}
          onPlayToggle={togglePlay}
          onNext={next}
          onLast={last}
          onJump={goTo}
          onSpeed={setSpeed}
        />
      </section>
    </main>
  );
}
