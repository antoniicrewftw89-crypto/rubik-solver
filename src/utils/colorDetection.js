// Convierte RGB a HSL (valores: H=0-360, S=0-100, L=0-100)
// Usamos HSL en vez de RGB porque es resistente a variaciones de iluminación:
// la matiz (H) no cambia aunque la luz sea más fuerte o más débil.
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

// Clasifica un color HSL en una de las 6 letras de cara del cubo
// Retorna null si no puede clasificarlo con certeza
export function hslToCubeFace(h, s, l) {
  if (s < 20 && l > 70) return 'u'; // blanco: poca saturación, muy claro
  if (l < 15) return null;           // muy oscuro, probablemente sombra
  if (h >= 50 && h <= 75 && s > 50) return 'd';               // amarillo
  if ((h < 15 || h > 345) && s > 55) return 'r';              // rojo
  if (h >= 15 && h <= 40 && s > 55) return 'l';               // naranja
  if (h >= 195 && h <= 255 && s > 40) return 'b';             // azul
  if (h >= 90 && h <= 165 && s > 40) return 'f';              // verde
  return null;
}

// Convierte un pixel RGB directamente a letra de cara
export function rgbToCubeFace(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  return hslToCubeFace(h, s, l);
}

// Muestrea el color promedio de una región rectangular en un ImageData
// Toma los píxeles del centro de la celda para evitar bordes del cubo
export function sampleRegionColor(imageData, x, y, width, height) {
  const padding = 0.25; // ignorar 25% del borde de cada celda
  const startX = Math.floor(x + width * padding);
  const startY = Math.floor(y + height * padding);
  const endX = Math.floor(x + width * (1 - padding));
  const endY = Math.floor(y + height * (1 - padding));

  let rSum = 0, gSum = 0, bSum = 0, count = 0;

  for (let py = startY; py < endY; py++) {
    for (let px = startX; px < endX; px++) {
      const idx = (py * imageData.width + px) * 4;
      rSum += imageData.data[idx];
      gSum += imageData.data[idx + 1];
      bSum += imageData.data[idx + 2];
      count++;
    }
  }

  if (count === 0) return null;
  return rgbToCubeFace(rSum / count, gSum / count, bSum / count);
}
