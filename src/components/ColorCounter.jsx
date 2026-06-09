import { FACE_COLORS, COLOR_NAMES } from '../utils/cubeNotation';

const COLOR_ORDER = ['f', 'r', 'u', 'd', 'l', 'b'];

// Conteo de los 54 stickers por color. Cada color debe sumar exactamente 9.
export default function ColorCounter({ cubeState }) {
  const counts = {};
  for (const face of Object.values(cubeState))
    for (const color of face) counts[color] = (counts[color] || 0) + 1;

  const allOk = COLOR_ORDER.every(c => (counts[c] || 0) === 9);

  return (
    <div>
      <div className="counter-header">
        <span className="panel-title" style={{ margin: 0 }}>Conteo de stickers</span>
        {allOk
          ? <span className="counter-status ok">✓ Cubo listo</span>
          : <span className="counter-status err">Corrige los colores</span>}
      </div>

      <div className="counter-bars">
        {COLOR_ORDER.map(color => {
          const count = counts[color] || 0;
          const ok = count === 9;
          const pct = Math.min(100, (count / 9) * 100);
          const diff = count - 9;
          return (
            <div key={color} className="counter-row">
              <span className="counter-dot" style={{ backgroundColor: FACE_COLORS[color] }} />
              <span className="counter-name">{COLOR_NAMES[color]}</span>
              <div className="counter-bar-bg">
                <div
                  className="counter-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: ok ? 'var(--ok)' : diff > 0 ? 'var(--warn)' : 'var(--err)' }}
                />
              </div>
              <span className="counter-num">{count}/9</span>
              {ok
                ? <span className="counter-check">✓</span>
                : <span className={`counter-diff ${diff > 0 ? 'over' : 'under'}`}>{diff > 0 ? `+${diff}` : diff}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
