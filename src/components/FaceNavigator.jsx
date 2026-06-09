import { FACE_COLORS, FACE_BORDER_COLORS, COLOR_NAMES, FACE_ORIENTATIONS } from '../utils/cubeNotation';

const FACES = ['F', 'R', 'U', 'D', 'L', 'B'];

// Color de fondo/texto de cada tab de cara.
const TAB_STYLES = {
  F: { bg: '#21c25e', text: '#06210f' },
  R: { bg: '#ef4444', text: '#fff' },
  U: { bg: '#f5f7fa', text: '#1e293b' },
  D: { bg: '#facc15', text: '#3a2e05' },
  L: { bg: '#fb923c', text: '#3a1e05' },
  B: { bg: '#3b82f6', text: '#fff' },
};

const FACE_NAMES_SHORT = { F: 'Frente', R: 'Derecha', U: 'Arriba', D: 'Abajo', L: 'Izquierda', B: 'Atrás' };

const COLOR_OPTIONS = [
  { key: 'f', label: 'Verde' },
  { key: 'r', label: 'Rojo' },
  { key: 'u', label: 'Blanco' },
  { key: 'd', label: 'Amarillo' },
  { key: 'l', label: 'Naranja' },
  { key: 'b', label: 'Azul' },
];

/**
 * Editor de una cara del cubo. La cara activa y el color seleccionado los
 * controla App (para sincronizar con la vista desplegada y el selector).
 */
export default function FaceNavigator({
  cubeState,
  activeFace,
  onSelectFace,
  selectedColor,
  onSelectColor,
  onCellClick,
  validationErrors,
}) {
  const faceIndex = FACES.indexOf(activeFace);
  const cells = cubeState[activeFace];
  const tabStyle = TAB_STYLES[activeFace];
  const faceErrors = validationErrors.filter(e => e.face === activeFace);

  const goPrev = () => faceIndex > 0 && onSelectFace(FACES[faceIndex - 1]);
  const goNext = () => faceIndex < 5 && onSelectFace(FACES[faceIndex + 1]);

  return (
    <div className="face-nav panel">
      {/* Tabs de cara */}
      <div className="face-tabs">
        {FACES.map(face => {
          const hasError = validationErrors.some(e => e.face === face);
          const s = TAB_STYLES[face];
          return (
            <button
              key={face}
              className={`face-tab ${activeFace === face ? 'face-tab-active' : ''}`}
              style={{ '--tbg': s.bg, '--ttxt': s.text }}
              onClick={() => onSelectFace(face)}
              title={FACE_NAMES_SHORT[face]}
            >
              {face}
              {hasError && <span className="tab-badge">!</span>}
            </button>
          );
        })}
      </div>

      {/* Encabezado de la cara activa */}
      <div className="face-header" style={{ borderLeftColor: tabStyle.bg }}>
        <span className="face-header-name" style={{ color: tabStyle.bg }}>
          Cara {FACE_NAMES_SHORT[activeFace]}
        </span>
        <span className="face-header-orient">{FACE_ORIENTATIONS[activeFace]}</span>
      </div>

      {/* Selector de color */}
      <div className="color-selector">
        <span className="color-selector-label">Pintar con:</span>
        <div className="color-swatches">
          {COLOR_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              title={label}
              aria-label={label}
              className={`swatch ${selectedColor === key ? 'swatch-on' : ''}`}
              style={{ backgroundColor: FACE_COLORS[key] }}
              onClick={() => onSelectColor(key)}
            />
          ))}
        </div>
      </div>

      {/* Grilla 3×3 */}
      <div className="cell-grid">
        {cells.map((colorKey, i) => {
          const isCenter = i === 4;
          return (
            <button
              key={i}
              className={`cell ${isCenter ? 'cell-locked' : 'cell-clickable'}`}
              style={{
                backgroundColor: FACE_COLORS[colorKey],
                borderColor: isCenter ? FACE_BORDER_COLORS[colorKey] : 'rgba(0,0,0,0.28)',
              }}
              onClick={() => !isCenter && onCellClick(activeFace, i, selectedColor)}
              disabled={isCenter}
              title={isCenter ? `Centro — siempre ${COLOR_NAMES[colorKey]}` : `Celda ${i + 1} — clic para pintar`}
            >
              {isCenter && (
                <svg viewBox="0 0 24 24" className="lock-icon" aria-hidden="true">
                  <path fill="currentColor" d="M12 1C9.24 1 7 3.24 7 6v2H5v14h14V8h-2V6c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Errores de la cara activa */}
      {faceErrors.length > 0 && (
        <div className="face-error-box">
          {faceErrors.map((e, i) => (
            <p key={i} className="face-error-line">⚠ {e.msg}</p>
          ))}
        </div>
      )}

      {/* Navegación entre caras */}
      <div className="face-nav-row">
        <button className="btn btn-ghost btn-sm" onClick={goPrev} disabled={faceIndex === 0}>← Anterior</button>
        <span className="face-nav-pos">{faceIndex + 1} / 6</span>
        <button className="btn btn-ghost btn-sm" onClick={goNext} disabled={faceIndex === 5}>Siguiente →</button>
      </div>
    </div>
  );
}
