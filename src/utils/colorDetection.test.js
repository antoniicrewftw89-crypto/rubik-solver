import { describe, it, expect } from 'vitest';
import { rgbToCubeFace, hslToCubeFace, sampleRegionColor } from './colorDetection';

// Convierte una imagen de un solo color en un ImageData falso (lo que espera
// sampleRegionColor: { width, data } con 4 bytes RGBA por píxel).
function imagenLisa(w, h, [r, g, b]) {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    data[i * 4] = r;
    data[i * 4 + 1] = g;
    data[i * 4 + 2] = b;
    data[i * 4 + 3] = 255;
  }
  return { width: w, height: h, data };
}

describe('rgbToCubeFace — colores estándar del cubo', () => {
  it('clasifica las 6 caras', () => {
    expect(rgbToCubeFace(255, 255, 255)).toBe('u'); // blanco
    expect(rgbToCubeFace(255, 255, 0)).toBe('d');   // amarillo
    expect(rgbToCubeFace(255, 0, 0)).toBe('r');     // rojo
    expect(rgbToCubeFace(255, 128, 0)).toBe('l');   // naranja
    expect(rgbToCubeFace(0, 0, 255)).toBe('b');     // azul
    expect(rgbToCubeFace(0, 200, 0)).toBe('f');     // verde
  });

  it('devuelve null en sombras/negros y grises ambiguos', () => {
    expect(rgbToCubeFace(0, 0, 0)).toBeNull();        // negro (muy oscuro)
    expect(rgbToCubeFace(20, 20, 20)).toBeNull();     // sombra
    expect(rgbToCubeFace(128, 128, 128)).toBeNull();  // gris: ni blanco ni color
  });
});

describe('hslToCubeFace — fronteras', () => {
  it('blanco necesita poca saturación y mucha luz', () => {
    expect(hslToCubeFace(0, 0, 100)).toBe('u');
    expect(hslToCubeFace(0, 0, 50)).toBeNull(); // gris medio, no blanco
  });

  it('un color saturado pero oscuro no se confunde con blanco', () => {
    expect(hslToCubeFace(0, 90, 10)).toBeNull();
  });
});

describe('sampleRegionColor', () => {
  it('promedia la región central y la clasifica', () => {
    const img = imagenLisa(10, 10, [255, 0, 0]);
    expect(sampleRegionColor(img, 0, 0, 10, 10)).toBe('r');
  });

  it('una región vacía (sin píxeles) devuelve null', () => {
    const img = imagenLisa(10, 10, [255, 0, 0]);
    // width/height 0 → el bucle no recorre nada → count 0
    expect(sampleRegionColor(img, 0, 0, 0, 0)).toBeNull();
  });
});
