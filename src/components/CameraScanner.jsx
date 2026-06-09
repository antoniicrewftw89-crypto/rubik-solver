import { useRef } from 'react';
import { useCameraDetection } from '../hooks/useCameraDetection';
import { FACE_LABELS } from '../utils/cubeNotation';

const FACE_ORDER = ['F', 'R', 'U', 'D', 'L', 'B'];

export default function CameraScanner({ currentFaceIndex, onFaceCaptured }) {
  const canvasRef = useRef(null);
  const { videoRef, isActive, error, startCamera, stopCamera, captureFace } = useCameraDetection();

  const currentFace = FACE_ORDER[currentFaceIndex];
  const isComplete = currentFaceIndex >= FACE_ORDER.length;

  function handleCapture() {
    const colors = captureFace(canvasRef);
    if (!colors) return;
    if (colors.some(c => c === null)) {
      alert('No pude detectar todos los colores. Asegúrate de tener buena iluminación y el cubo centrado.');
      return;
    }
    // El centro siempre es el color de esa cara (pieza fija).
    const centerColor = currentFace.toLowerCase();
    const corrected = colors.map((c, i) => (i === 4 ? centerColor : c));
    onFaceCaptured(currentFace, corrected);
  }

  if (isComplete) {
    return (
      <div className="scanner-complete">
        <p>✅ Las 6 caras capturadas. Ya puedes resolver el cubo.</p>
        <button className="btn" onClick={stopCamera}>Apagar cámara</button>
      </div>
    );
  }

  return (
    <div>
      {error && <p className="scanner-error">{error}</p>}

      {!isActive ? (
        <button className="btn btn-primary" onClick={startCamera}>📷 Activar cámara</button>
      ) : (
        <>
          {/* Progreso de caras */}
          <div className="scanner-progress">
            {FACE_ORDER.map((face, i) => (
              <span
                key={face}
                className={`progress-face ${i < currentFaceIndex ? 'done' : ''} ${i === currentFaceIndex ? 'active' : ''}`}
              >
                {face}
              </span>
            ))}
          </div>

          {/* Instrucción de orientación */}
          <p className="scanner-instruction">
            Muestra la cara <strong>{FACE_LABELS[currentFace]}</strong> a la cámara.
            {currentFace === 'U' && ' (con la cara verde mirando hacia abajo)'}
            {currentFace === 'D' && ' (con la cara verde mirando hacia arriba)'}
            {!['U', 'D'].includes(currentFace) && ' (con la cara blanca arriba)'}
          </p>

          {/* Video con cuadrícula guía */}
          <div className="scanner-video-wrapper">
            <video ref={videoRef} className="scanner-video" playsInline muted />
            <div className="scanner-overlay">
              {Array.from({ length: 9 }).map((_, i) => <div key={i} className="scanner-cell" />)}
            </div>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <div className="scanner-actions">
            <button className="btn btn-primary" onClick={handleCapture}>Capturar cara {currentFace}</button>
            <button className="btn btn-ghost" onClick={stopCamera}>Cancelar</button>
          </div>
        </>
      )}
    </div>
  );
}
