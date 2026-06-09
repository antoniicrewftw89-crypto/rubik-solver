import { useRef, useEffect } from 'react';
import { formatMove, explainMove } from '../utils/cubeNotation';

/**
 * Panel de control de la solución (presentacional). La reproducción y el estado
 * del cubo los maneja SolutionScreen; aquí solo se muestran los pasos y se
 * emiten eventos de navegación.
 */
export default function SolutionSteps({
  solution,
  stepIndex,
  isPlaying,
  speed,
  onFirst,
  onPrev,
  onPlayToggle,
  onNext,
  onLast,
  onJump,
  onSpeed,
}) {
  const chipRef = useRef(null);

  useEffect(() => {
    chipRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [stepIndex]);

  if (solution.length === 0) {
    return (
      <div className="solved-banner panel">
        <div className="solved-icon">🏆</div>
        <p className="solved-text">¡El cubo ya estaba resuelto!</p>
      </div>
    );
  }

  const total = solution.length;
  const done = stepIndex >= total;
  const currentMove = solution[Math.min(stepIndex, total - 1)];

  return (
    <div className="steps-wrap">
      {/* Movimiento actual */}
      <div className="move-display">
        {done ? (
          <>
            <div className="solved-icon">🏆</div>
            <div className="solved-text">¡Cubo resuelto!</div>
          </>
        ) : (
          <>
            <div className="move-glyph">{formatMove(currentMove)}</div>
            <div className="move-name">{explainMove(currentMove)}</div>
            <div className="move-counter">Movimiento {stepIndex + 1} de {total}</div>
          </>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="steps-progress-bar">
        <div className="steps-progress-fill" style={{ width: `${(stepIndex / total) * 100}%` }} />
      </div>

      {/* Controles de reproducción */}
      <div className="steps-nav">
        <button className="btn btn-ghost btn-sm" onClick={onFirst} disabled={stepIndex === 0} title="Inicio">⏮</button>
        <button className="btn btn-ghost btn-sm" onClick={onPrev} disabled={stepIndex === 0}>← Atrás</button>
        <button className="btn btn-primary" onClick={onPlayToggle} disabled={done}>
          {isPlaying ? '⏸ Pausar' : '▶ Reproducir'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onNext} disabled={done}>Adelante →</button>
        <button className="btn btn-ghost btn-sm" onClick={onLast} disabled={done} title="Final">⏭</button>
      </div>

      {/* Velocidad */}
      <div className="speed-control">
        <span className="hint-text">Velocidad</span>
        <input
          type="range"
          className="speed-slider"
          min="0.1"
          max="2"
          step="0.1"
          value={speed}
          onChange={e => onSpeed(Number(e.target.value))}
        />
        <span className="speed-value">{speed.toFixed(1)}×</span>
      </div>

      {/* Lista de movimientos */}
      <div className="moves-list panel">
        {solution.map((m, i) => (
          <button
            key={i}
            ref={i === stepIndex ? chipRef : null}
            className={`move-chip ${i === stepIndex ? 'chip-active' : ''} ${i < stepIndex ? 'chip-done' : ''}`}
            onClick={() => onJump(i)}
            title={explainMove(m)}
          >
            {formatMove(m)}
          </button>
        ))}
      </div>
    </div>
  );
}
