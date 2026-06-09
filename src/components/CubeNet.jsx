import { FACE_COLORS } from '../utils/cubeNotation';

// Vista desplegada (mapa en cruz) del cubo: muestra las 6 caras de un vistazo.
const FACES = ['U', 'L', 'F', 'R', 'B', 'D'];
const FACE_NAMES = { F: 'Frente', R: 'Derecha', U: 'Arriba', D: 'Abajo', L: 'Izquierda', B: 'Atrás' };

export default function CubeNet({ cubeState, activeFace, onSelectFace }) {
  return (
    <div className="cube-net">
      {FACES.map(face => (
        <button
          key={face}
          type="button"
          className={`net-face net-pos-${face} ${face === activeFace ? 'is-active' : ''}`}
          onClick={() => onSelectFace?.(face)}
          title={`Editar cara ${FACE_NAMES[face]}`}
        >
          {cubeState[face].map((colorKey, i) => (
            <span key={i} className="net-cell" style={{ background: FACE_COLORS[colorKey] }} />
          ))}
        </button>
      ))}
    </div>
  );
}
