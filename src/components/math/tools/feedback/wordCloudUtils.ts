export type WordCloudShape =
  | 'cloud'
  | 'heart'
  | 'circle'
  | 'star'
  | 'lightbulb'
  | 'pi'
  | 'rectangle';

export interface ShapeConfig {
  id: WordCloudShape;
  name: string;
  icon: string;
  description: string;
  svgPath: string; // Centered in viewBox="0 0 100 100"
  centroidOffset: { x: number; y: number }; // Relative offset from center (-0.5 .. 0.5)
  watermarkColor: string;
}

export const WORD_CLOUD_SHAPES: ShapeConfig[] = [
  {
    id: 'heart',
    name: 'Szív',
    icon: '❤️',
    description: 'Hangulati, érzelmi és elégedettségi reflexiókhoz',
    svgPath: 'M 50,86 C 20,62 12,42 12,28 C 12,16 22,10 33,10 C 41,10 47,14 50,20 C 53,14 59,10 67,10 C 78,10 88,16 88,28 C 88,42 80,62 50,86 Z',
    centroidOffset: { x: 0, y: -0.08 },
    watermarkColor: '#f43f5e'
  },
  {
    id: 'circle',
    name: 'Kör',
    icon: '⭕',
    description: 'Kiegyensúlyozott, tiszta, modern körkörös forma',
    svgPath: 'M 50,8 A 42,42 0 1,0 50,92 A 42,42 0 1,0 50,8 Z',
    centroidOffset: { x: 0, y: 0 },
    watermarkColor: '#0ea5e9'
  },
  {
    id: 'cloud',
    name: 'Felhő',
    icon: '☁️',
    description: 'Természetes, organikus 2D szófelhő',
    svgPath: 'M 22,68 C 14,68 8,62 8,54 C 8,46 14,40 21,39 C 23,26 34,18 47,18 C 58,18 68,25 71,36 C 74,34 78,33 82,33 C 90,33 97,40 97,49 C 97,51 96,54 95,56 C 97,58 98,62 98,65 C 98,72 92,78 84,78 L 22,78 C 14,78 8,72 8,68 Z',
    centroidOffset: { x: 0, y: 0 },
    watermarkColor: '#0284c7'
  },
  {
    id: 'star',
    name: 'Csillag',
    icon: '⭐',
    description: 'Sikerélményekhez, dicsérethez és kiemelkedő feladatokhoz',
    svgPath: 'M 50,6 L 62,35 L 94,36 L 68,56 L 78,88 L 50,68 L 22,88 L 32,56 L 6,36 L 38,35 Z',
    centroidOffset: { x: 0, y: 0.04 },
    watermarkColor: '#f59e0b'
  },
  {
    id: 'lightbulb',
    name: 'Izzó / Ötlet',
    icon: '💡',
    description: 'Új tanulságokhoz, „aha” élményekhez és ötletekhez',
    svgPath: 'M 32,62 C 22,54 16,42 16,28 C 16,12 31,4 50,4 C 69,4 84,12 84,28 C 84,42 78,54 68,62 L 66,74 L 34,74 Z M 36,80 L 64,80 L 62,88 L 38,88 Z M 42,92 L 58,92 L 54,96 L 46,96 Z',
    centroidOffset: { x: 0, y: -0.16 },
    watermarkColor: '#eab308'
  },
  {
    id: 'pi',
    name: 'Matematika (π)',
    icon: '📐',
    description: 'Matematikai fogalmak, képletek és szakmai reflexiók',
    svgPath: 'M 12,26 C 20,22 28,22 38,22 L 84,22 C 88,22 92,24 92,28 C 92,32 88,34 82,34 L 72,34 L 72,70 C 72,78 78,82 84,82 C 86,82 88,81 88,86 C 88,90 83,92 76,92 C 65,92 62,83 62,72 L 62,34 L 44,34 L 40,70 C 38,79 33,83 26,83 C 24,83 20,82 20,77 C 20,73 24,72 26,71 C 30,69 32,64 33,56 L 36,34 L 16,34 C 12,34 8,31 8,28 C 8,25 10,26 12,26 Z',
    centroidOffset: { x: 0, y: -0.42 },
    watermarkColor: '#8b5cf6'
  },
  {
    id: 'rectangle',
    name: 'Téglalap',
    icon: '▢',
    description: 'Klasszikus sűrű kitöltés sok kifejezés esetén',
    svgPath: 'M 8,12 L 92,12 L 92,88 L 8,88 Z',
    centroidOffset: { x: 0, y: 0 },
    watermarkColor: '#64748b'
  }
];

export interface WordItem {
  text: string;
  count: number;
  normalized: string;
  percentage?: number;
  color?: string;
}

export interface PositionedWord extends WordItem {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  rotate: number;
}

export const WORD_CLOUD_PALETTE = [
  '#2563eb', // Blue 600
  '#4f46e5', // Indigo 600
  '#0284c7', // Sky 600
  '#059669', // Emerald 600
  '#d97706', // Amber 600
  '#e11d48', // Rose 600
  '#9333ea', // Purple 600
  '#0d9488', // Teal 600
  '#ea580c', // Orange 600
  '#c026d3', // Fuchsia 600
  '#16a34a', // Green 600
  '#7c3aed'  // Violet 600
];

export function normalizeWord(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+|[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+$/g, '')
    .replace(/\s+/g, ' ');
}

export function formatDisplayWord(text: string): string {
  const trimmed = text.trim().replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+|[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+$/g, '');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function aggregateWords(
  rawWords: string[],
  hiddenWords: string[] = []
): WordItem[] {
  const hiddenSet = new Set(hiddenWords.map(w => normalizeWord(w)));
  const counts = new Map<string, { display: string; count: number }>();

  for (const raw of rawWords) {
    const norm = normalizeWord(raw);
    if (!norm || norm.length < 1 || hiddenSet.has(norm)) continue;

    const display = formatDisplayWord(raw);
    const existing = counts.get(norm);
    if (existing) {
      existing.count += 1;
      if (raw.trim().length < existing.display.length) {
        existing.display = display;
      }
    } else {
      counts.set(norm, { display, count: 1 });
    }
  }

  const total = Array.from(counts.values()).reduce((sum, item) => sum + item.count, 0);

  const items: WordItem[] = Array.from(counts.entries()).map(([norm, val], idx) => {
    return {
      text: val.display,
      count: val.count,
      normalized: norm,
      percentage: total > 0 ? Math.round((val.count / total) * 100) : 0,
      color: WORD_CLOUD_PALETTE[idx % WORD_CLOUD_PALETTE.length]
    };
  });

  return items.sort((a, b) => b.count - a.count);
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function checkCollision(r1: Rect, r2: Rect): boolean {
  return !(
    r1.x + r1.w <= r2.x ||
    r1.x >= r2.x + r2.w ||
    r1.y + r1.h <= r2.y ||
    r1.y >= r2.y + r2.h
  );
}

function isPointInPolygon(px: number, py: number, polygon: { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * 2D mathematical shape boundary test.
 * u in [-1, 1], v in [-1, 1] relative to radius R.
 */
export function isPointIn2DShape(shape: WordCloudShape, u: number, v: number): boolean {
  switch (shape) {
    case 'circle': {
      return u * u + v * v <= 0.88;
    }

    case 'heart': {
      // Algebraic 2D heart curve
      const nx = u * 1.25;
      const ny = -(v - 0.12) * 1.25;
      const term = nx * nx + ny * ny - 1;
      return term * term * term - nx * nx * ny * ny * ny <= 0.08;
    }

    case 'cloud': {
      // 2D flat organic cloud
      if ((u / 0.82) * (u / 0.82) + ((v - 0.1) / 0.46) * ((v - 0.1) / 0.46) <= 1) return true;
      if (((u + 0.28) / 0.44) * ((u + 0.28) / 0.44) + ((v + 0.18) / 0.44) * ((v + 0.18) / 0.44) <= 1) return true;
      if (((u - 0.25) / 0.48) * ((u - 0.25) / 0.48) + ((v + 0.16) / 0.48) * ((v + 0.16) / 0.48) <= 1) return true;
      if (((u + 0.52) / 0.38) * ((u + 0.52) / 0.38) + ((v - 0.04) / 0.38) * ((v - 0.04) / 0.38) <= 1) return true;
      if (((u - 0.52) / 0.38) * ((u - 0.52) / 0.38) + ((v - 0.04) / 0.38) * ((v - 0.04) / 0.38) <= 1) return true;
      return false;
    }

    case 'star': {
      const dist = Math.sqrt(u * u + v * v);
      if (dist > 0.95) return false;
      if (dist < 0.36) return true;
      const starPts = [
        { x: 0, y: -0.92 },
        { x: 0.26, y: -0.32 },
        { x: 0.88, y: -0.3 },
        { x: 0.38, y: 0.12 },
        { x: 0.58, y: 0.82 },
        { x: 0, y: 0.38 },
        { x: -0.58, y: 0.82 },
        { x: -0.38, y: 0.12 },
        { x: -0.88, y: -0.3 },
        { x: -0.26, y: -0.32 }
      ];
      return isPointInPolygon(u, v, starPts);
    }

    case 'lightbulb': {
      if ((u / 0.74) * (u / 0.74) + ((v + 0.22) / 0.72) * ((v + 0.22) / 0.72) <= 1) return true;
      if (Math.abs(u) <= 0.36 && v >= 0.15 && v <= 0.84) return true;
      return false;
    }

    case 'pi': {
      if (Math.abs(u) <= 0.86 && v >= -0.65 && v <= -0.22) return true;
      if (u >= -0.62 && u <= -0.16 && v >= -0.22 && v <= 0.82) return true;
      if (u >= 0.16 && u <= 0.62 && v >= -0.22 && v <= 0.82) return true;
      return false;
    }

    case 'rectangle':
    default: {
      return Math.abs(u) <= 0.92 && Math.abs(v) <= 0.86;
    }
  }
}

/**
 * Checks if a word bounding box fits entirely inside the 2D shape.
 */
function isBoxInside2DShape(
  bx: number,
  by: number,
  bw: number,
  bh: number,
  shape: WordCloudShape,
  centerX: number,
  centerY: number,
  R: number
): boolean {
  if (shape === 'rectangle') {
    const u1 = Math.abs((bx - centerX) / R);
    const u2 = Math.abs((bx + bw - centerX) / R);
    const v1 = Math.abs((by - centerY) / R);
    const v2 = Math.abs((by + bh - centerY) / R);
    return Math.max(u1, u2) <= 0.94 && Math.max(v1, v2) <= 0.88;
  }

  // Check 5 strategic cross-points (center, left, right, top, bottom)
  const pad = 3;
  const samplePoints = [
    { px: bx + bw / 2, py: by + bh / 2 },
    { px: bx + pad, py: by + bh / 2 },
    { px: bx + bw - pad, py: by + bh / 2 },
    { px: bx + bw / 2, py: by + pad },
    { px: bx + bw / 2, py: by + bh - pad }
  ];

  for (const pt of samplePoints) {
    const u = (pt.px - centerX) / R;
    const v = (pt.py - centerY) / R;
    if (!isPointIn2DShape(shape, u, v)) {
      return false;
    }
  }

  return true;
}

/**
 * 2D Word Cloud layout algorithm.
 * Guarantees that all words stay strictly inside the 2D shape and are tightly packed.
 */
export function layoutWordCloud(
  words: WordItem[],
  width: number,
  height: number,
  shape: WordCloudShape = 'cloud'
): PositionedWord[] {
  if (words.length === 0 || width <= 0 || height <= 0) return [];

  const shapeConfig = WORD_CLOUD_SHAPES.find(s => s.id === shape) || WORD_CLOUD_SHAPES[0];

  // Natural 1:1 shape size centered within the canvas
  const shapeSize = Math.min(width * 0.88, height * 0.88);
  const R = shapeSize / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  // Center of mass where placement begins
  const startX = centerX + R * (shapeConfig.centroidOffset?.x || 0);
  const startY = centerY + R * (shapeConfig.centroidOffset?.y || 0);

  // Dynamic font sizing based on word count
  const maxCount = Math.max(...words.map(w => w.count), 1);
  const minCount = Math.min(...words.map(w => w.count), 1);

  let baseMaxFont = 44;
  let baseMinFont = 16;

  if (words.length === 1) {
    baseMaxFont = Math.min(R * 0.44, 56);
    baseMinFont = baseMaxFont;
  } else if (words.length <= 4) {
    baseMaxFont = Math.min(R * 0.38, 48);
    baseMinFont = Math.min(R * 0.28, 32);
  } else if (words.length <= 10) {
    baseMaxFont = Math.min(R * 0.32, 40);
    baseMinFont = Math.min(R * 0.16, 20);
  } else if (words.length <= 25) {
    baseMaxFont = Math.min(R * 0.26, 34);
    baseMinFont = Math.min(R * 0.12, 16);
  } else {
    baseMaxFont = Math.min(R * 0.22, 28);
    baseMinFont = Math.max(12, Math.min(R * 0.1, 14));
  }

  let measureCtx: CanvasRenderingContext2D | null = null;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    measureCtx = canvas.getContext('2d');
  }

  const computeDimensions = (text: string, size: number) => {
    let tw = text.length * size * 0.62;
    if (measureCtx) {
      measureCtx.font = `bold ${size}px sans-serif`;
      tw = measureCtx.measureText(text).width;
    }
    const th = size * 1.15;
    const pad = 4;
    return { w: tw + pad * 2, h: th + pad * 2 };
  };

  const placedBoxes: Rect[] = [];
  const positioned: PositionedWord[] = [];

  words.forEach((item, index) => {
    const ratio = maxCount === minCount ? 0.6 : (item.count - minCount) / (maxCount - minCount);
    let fontSize = Math.round(baseMinFont + Math.pow(ratio, 0.75) * (baseMaxFont - baseMinFont));

    let { w, h } = computeDimensions(item.text, fontSize);

    // Ensure word is not wider than the shape interior
    const maxAllowedWidth = R * 1.6;
    if (w > maxAllowedWidth) {
      const scaleDown = maxAllowedWidth / w;
      fontSize = Math.max(12, Math.round(fontSize * scaleDown));
      const adjusted = computeDimensions(item.text, fontSize);
      w = adjusted.w;
      h = adjusted.h;
    }

    let placed = false;
    let finalX = startX - w / 2;
    let finalY = startY - h / 2;

    // Try placement in up to 4 font reduction steps to guarantee tight fit inside the shape
    for (let attempt = 0; attempt < 4 && !placed; attempt++) {
      if (attempt > 0) {
        fontSize = Math.max(12, Math.round(fontSize * 0.82));
        const rescaled = computeDimensions(item.text, fontSize);
        w = rescaled.w;
        h = rescaled.h;
      }

      // Dense Archimedean spiral starting from centroid
      let angle = index * 2.399; // Golden angle variant
      let radius = 0;
      const angleStep = 0.16;
      const radiusStep = 1.25;
      const maxRadius = R * 1.05;

      while (radius < maxRadius) {
        const curX = startX + radius * Math.cos(angle) - w / 2;
        const curY = startY + radius * Math.sin(angle) * 0.88 - h / 2;

        // Check if inside canvas bounds
        if (curX >= 6 && curX + w <= width - 6 && curY >= 6 && curY + h <= height - 6) {
          // Check if strictly inside 2D shape
          if (isBoxInside2DShape(curX, curY, w, h, shape, centerX, centerY, R)) {
            const candidateRect: Rect = { x: curX, y: curY, w, h };
            const hasCollision = placedBoxes.some(box => checkCollision(candidateRect, box));

            if (!hasCollision) {
              finalX = curX;
              finalY = curY;
              placedBoxes.push(candidateRect);
              placed = true;
              break;
            }
          }
        }

        angle += angleStep;
        radius += radiusStep * (angleStep / (2 * Math.PI));
      }
    }

    // Safety fallback: If still unplaced, place at start centroid or closest interior point
    if (!placed) {
      finalX = Math.max(8, Math.min(width - w - 8, startX - w / 2 + (Math.random() - 0.5) * (R * 0.3)));
      finalY = Math.max(8, Math.min(height - h - 8, startY - h / 2 + (Math.random() - 0.5) * (R * 0.3)));
      placedBoxes.push({ x: finalX, y: finalY, w, h });
    }

    positioned.push({
      ...item,
      x: finalX,
      y: finalY,
      width: w,
      height: h,
      fontSize,
      rotate: 0
    });
  });

  return positioned;
}
