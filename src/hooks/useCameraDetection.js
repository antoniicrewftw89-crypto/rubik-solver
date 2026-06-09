import { useState, useRef, useCallback } from 'react';
import { sampleRegionColor } from '../utils/colorDetection';

// Hook que maneja la cámara y la detección de colores del cubo
export function useCameraDetection() {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsActive(true);
      }
    } catch {
      setError('No se pudo acceder a la cámara. Revisa los permisos del navegador.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  // Captura los colores actuales de la cuadrícula 3x3 visible en el video
  // Retorna un array de 9 letras de cara (o null si no pudo clasificar alguna)
  const captureFace = useCallback((canvasRef) => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Dibujar el frame actual del video en el canvas (oculto)
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // La cuadrícula del cubo ocupa el 60% central del video
    const gridSize = Math.min(canvas.width, canvas.height) * 0.6;
    const offsetX = (canvas.width - gridSize) / 2;
    const offsetY = (canvas.height - gridSize) / 2;
    const cellSize = gridSize / 3;

    const colors = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = offsetX + col * cellSize;
        const y = offsetY + row * cellSize;
        const color = sampleRegionColor(imageData, x, y, cellSize, cellSize);
        colors.push(color);
      }
    }

    return colors;
  }, []);

  return { videoRef, isActive, error, startCamera, stopCamera, captureFace };
}
