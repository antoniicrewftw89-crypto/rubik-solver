import { useState } from 'react';
import { SOLVED_STATE, getValidationErrors } from './utils/cubeNotation';
import { scramble } from './utils/cubeEngine';
import { useCubeSolver } from './hooks/useCubeSolver';
import FaceNavigator from './components/FaceNavigator';
import CubeNet from './components/CubeNet';
import ColorCounter from './components/ColorCounter';
import CubeViewer from './components/CubeViewer';
import CameraScanner from './components/CameraScanner';
import SolutionScreen from './components/SolutionScreen';

function Brand({ subtitle }) {
  return (
    <div className="brand">
      <div className="brand-logo"><i /><i /><i /><i /></div>
      <div>
        <h1 className="brand-title">Rubik <b>Solver</b></h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [cubeState, setCubeState] = useState(SOLVED_STATE);
  const [inputMode, setInputMode] = useState('manual');
  const [cameraFaceIndex, setCameraFaceIndex] = useState(0);
  const [screen, setScreen] = useState('editor');
  const [showErrors, setShowErrors] = useState(false);
  const [activeFace, setActiveFace] = useState('F');
  const [selectedColor, setSelectedColor] = useState('f');
  const [autoRotate, setAutoRotate] = useState(true);
  const [solveSnapshot, setSolveSnapshot] = useState(SOLVED_STATE);

  const { solution, isLoading, error: solveError, solve, reset } = useCubeSolver();

  const validationErrors = getValidationErrors(cubeState);
  const isValid = validationErrors.length === 0;

  function handleCellPaint(face, cellIndex, color) {
    if (cellIndex === 4) return; // el centro es fijo
    setCubeState(prev => {
      const newFace = [...prev[face]];
      newFace[cellIndex] = color;
      return { ...prev, [face]: newFace };
    });
  }

  function handleReset() {
    setCubeState(SOLVED_STATE);
    setCameraFaceIndex(0);
    setActiveFace('F');
    setShowErrors(false);
    reset();
  }

  function handleScramble() {
    const { state } = scramble(25);
    setCubeState(state);
    setCameraFaceIndex(0);
    setActiveFace('F');
    setShowErrors(false);
    reset();
  }

  function handleFaceCaptured(face, colors) {
    setCubeState(prev => ({ ...prev, [face]: colors }));
    setCameraFaceIndex(i => i + 1);
  }

  async function handleSolve() {
    setShowErrors(true);
    if (!isValid) return;
    const result = await solve(cubeState);
    if (result?.success) {
      setSolveSnapshot(cubeState);
      setScreen('solution');
    }
  }

  function handleBack() {
    setScreen('editor');
    reset();
    setShowErrors(false);
  }

  // ── Pantalla de solución ─────────────────────────────────
  if (screen === 'solution') {
    return (
      <div className="app">
        <header className="app-header">
          <Brand subtitle="Solución paso a paso" />
          <button className="btn btn-ghost" onClick={handleBack}>← Volver al editor</button>
        </header>

        {solveError ? (
          <div className="note note-err">
            <p className="note-title">⚠ No se pudo resolver</p>
            <p className="note-msg">{solveError}</p>
          </div>
        ) : (
          <SolutionScreen initialState={solveSnapshot} solution={solution ?? []} />
        )}
      </div>
    );
  }

  // ── Pantalla de editor ───────────────────────────────────
  const cameraBlocked = inputMode === 'camera' && cameraFaceIndex < 6;

  return (
    <div className="app">
      <header className="app-header">
        <Brand subtitle="Arma tu cubo y obtén la solución óptima paso a paso" />
      </header>

      <main className="editor-layout">
        {/* Columna izquierda: entrada */}
        <div className="editor-col-left">
          <div className="seg">
            <button className={inputMode === 'manual' ? 'on' : ''} onClick={() => setInputMode('manual')}>
              ✏️ Manual
            </button>
            <button className={inputMode === 'camera' ? 'on' : ''} onClick={() => setInputMode('camera')}>
              📷 Cámara
            </button>
          </div>

          {inputMode === 'manual' ? (
            <FaceNavigator
              cubeState={cubeState}
              activeFace={activeFace}
              onSelectFace={setActiveFace}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onCellClick={handleCellPaint}
              validationErrors={showErrors ? validationErrors : []}
            />
          ) : (
            <div className="panel">
              <CameraScanner currentFaceIndex={cameraFaceIndex} onFaceCaptured={handleFaceCaptured} />
            </div>
          )}

          {/* Vista desplegada del cubo */}
          <div className="panel">
            <p className="panel-title">Mapa del cubo</p>
            <CubeNet cubeState={cubeState} activeFace={activeFace} onSelectFace={setActiveFace} />
          </div>

          {/* Conteo de stickers */}
          <div className="panel">
            <ColorCounter cubeState={cubeState} />
          </div>

          {/* Validación tras intentar resolver */}
          {showErrors && !isValid && (
            <div className="note note-warn">
              <p className="note-title">⚠ Corrige estos errores antes de resolver:</p>
              {validationErrors.map((e, i) => (
                <p key={i} className="note-line">• {e.msg}</p>
              ))}
            </div>
          )}

          {/* Acciones */}
          <div className="editor-actions">
            <button className="btn" onClick={handleScramble}>🎲 Mezclar</button>
            <button className="btn btn-danger" onClick={handleReset}>↺ Reiniciar</button>
          </div>

          <button
            className={`btn-solve ${isValid ? 'btn-solve-ready' : 'btn-solve-blocked'}`}
            onClick={handleSolve}
            disabled={isLoading || cameraBlocked}
          >
            {isLoading ? (<><span className="spinner" />Calculando…</>)
              : isValid ? '🧩 Resolver cubo'
              : '⚠ Resolver (hay errores)'}
          </button>

          {cameraBlocked && (
            <p className="hint-text">Captura las 6 caras antes de resolver ({cameraFaceIndex}/6)</p>
          )}
        </div>

        {/* Columna derecha: visor 3D */}
        <div className="editor-col-right">
          <p className="viewer-label">Vista previa 3D</p>
          <CubeViewer cubeState={cubeState} autoRotate={autoRotate} />
          <div className="viewer-controls">
            <button className="btn btn-ghost btn-sm" onClick={() => setAutoRotate(r => !r)}>
              {autoRotate ? '⏸ Pausar giro' : '▶ Girar'}
            </button>
            <span className="viewer-hint">Arrastra para rotar · scroll para zoom</span>
          </div>
        </div>
      </main>
    </div>
  );
}
