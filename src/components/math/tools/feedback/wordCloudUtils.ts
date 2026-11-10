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
  svgPath: string; // viewBox="0 0 100 100"
  centroid: { x: number; y: number }; // 0..1 relative position
  watermarkColor: string;
}

export const WORD_CLOUD_SHAPES: ShapeConfig[] = [
  {
    id: 'cloud',
    name: 'Felhő',
    icon: '☁️',
    description: 'Természetes, organikus szófelhő elrendezés',
    svgPath: 'M 22,66 C 14,66 8,60 8,52 C 8,45 13,39 20,38 C 22,26 32,18 45,18 C 56,18 66,25 69,35 C 72,33 76,32 80,32 C 89,32 96,39 96,48 C 96,50 95,53 94,55 C 96,57 98,61 98,65 C 98,73 92,79 84,79 L 24,79 C 14,79 8,72 8,64 C 8,64 15,66 22,66 Z',
    centroid: { x: 0.5, y: 0.52 },
    watermarkColor: '#0284c7'
  },
  {
    id: 'heart',
    name: 'Szív',
    icon: '❤️',
    description: 'Hangulati, érzelmi és elégedettségi reflexiókhoz',
    svgPath: 'M 50,88 C 50,88 12,62 12,34 C 12,17 26,12 37,12 C 44,12 48,16 50,21 C 52,16 56,12 63,12 C 74,12 88,17 88,34 C 88,62 50,88 50,88 Z',
    centroid: { x: 0.5, y: 0.44 },
    watermarkColor: '#e11d48'
  },
  {
    id: 'circle',
    name: 'Kör',
    icon: '⭕',
    description: 'Kiegyensúlyozott, tiszta, modern körkörös forma',
    svgPath: 'M 50,8 A 42,42 0 1,0 50,92 A 42,42 0 1,0 50,8 Z',
    centroid: { x: 0.5, y: 0.5 },
    watermarkColor: '#0ea5e9'
  },
  {
    id: 'star',
    name: 'Csillag',
    icon: '⭐',
    description: 'Sikerélményekhez, dicsérethez és kiemelkedő feladatokhoz',
    svgPath: 'M 50,6 L 62,35 L 94,36 L 68,56 L 78,88 L 50,68 L 22,88 L 32,56 L 6,36 L 38,35 Z',
    centroid: { x: 0.5, y: 0.52 },
    watermarkColor: '#f59e0b'
  },
  {
    id: 'lightbulb',
    name: 'Izzó / Ötlet',
    icon: '💡',
    description: 'Új tanulságokhoz, „aha” élményekhez és kreatív ötletekhez',
    svgPath: 'M 32,62 C 22,54 16,42 16,30 C 16,13 31,4 50,4 C 69,4 84,13 84,30 C 84,42 78,54 68,62 L 66,74 L 34,74 Z M 36,80 L 64,80 L 62,88 L 38,88 Z M 42,92 L 58,92 L 54,96 L 46,96 Z',
    centroid: { x: 0.5, y: 0.38 },
    watermarkColor: '#eab308'
  },
  {
    id: 'pi',
    name: 'Matematika (π)',
    icon: '📐',
    description: 'Matematikai fogalmak, képletek és szakmai reflexiók',
    svgPath: 'M 12,28 C 20,24 28,24 38,24 L 84,24 C 88,24 92,26 92,30 C 92,34 88,36 82,36 L 74,36 L 74,70 C 74,78 80,82 86,82 C 88,82 90,81 90,86 C 90,90 85,92 78,92 C 67,92 64,83 64,72 L 64,36 L 44,36 L 40,70 C 38,79 33,83 26,83 C 24,83 20,82 20,77 C 20,73 24,72 26,71 C 30,69 32,64 33,56 L 36,36 L 16,36 C 12,36 8,33 8,30 C 8,27 10,28 12,28 Z',
    centroid: { x: 0.5, y: 0.5 },
    watermarkColor: '#8b5cf6'
  },
  {
    id: 'rectangle',
    name: 'Téglalap',
    icon: '▢',
    description: 'Klasszikus sűrű kitöltés sok kifejezés esetén',
    svgPath: 'M 6,10 L 94,10 L 94,90 L 6,90 Z',
    centroid: { x: 0.5, y: 0.5 },
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
  rotate: number; // 0 or 90
}

// Modern, vibrant palette inspired by SkillUp Academy's theme
export const WORD_CLOUD_PALETTE = [
  '#4f46e5', // Indigo 600
  '#0284c7', // Sky 600
  '#059669', // Emerald 600
  '#d97706', // Amber 600
  '#9333ea', // Purple 600
  '#e11d48', // Rose 600
  '#0d9488', // Teal 600
  '#2563eb', // Blue 600
  '#c026d3', // Fuchsia 600
  '#ea580c', // Orange 600
  '#16a34a', // Green 600
  '#7c3aed', // Violet 600
];

/**
 * Normalizes text for grouping: removes punctuation, trims, lowercases
 */
export function normalizeWord(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+|[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+$/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Capitalizes the first letter of each word in a short phrase or single word for nice display
 */
export function formatDisplayWord(text: string): string {
  const trimmed = text.trim().replace(/^[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+|[.,/#!$%^&*;:{}=\-_`~()?"'„”«»\s]+$/g, '');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Counts frequencies of words/phrases, filters out banned/hidden words
 */
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

// Internal cache for raster mask to maximize placement speed
const maskCache = new Map<string, Uint8ClampedArray>();

function getShapeMask(
  shape: WordCloudShape,
  maskW: number = 180,
  maskH: number = 120
): Uint8ClampedArray | null {
  if (shape === 'rectangle') return null;
  const cacheKey = `${shape}_${maskW}_${maskH}`;
  if (maskCache.has(cacheKey)) {
    return maskCache.get(cacheKey)!;
  }

  if (typeof document === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = maskW;
    canvas.height = maskH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const config = WORD_CLOUD_SHAPES.find(s => s.id === shape);
    if (!config) return null;

    ctx.clearRect(0, 0, maskW, maskH);
    ctx.save();
    // Scale 100x100 SVG path to maskW x maskH
    ctx.scale(maskW / 100, maskH / 100);

    if (typeof Path2D !== 'undefined') {
      const path2D = new Path2D(config.svgPath);
      ctx.fillStyle = '#000000';
      ctx.fill(path2D);
    }
    ctx.restore();

    const imgData = ctx.getImageData(0, 0, maskW, maskH);
    maskCache.set(cacheKey, imgData.data);
    return imgData.data;
  } catch (err) {
    console.error('Error generating shape mask:', err);
    return null;
  }
}

function isRectInsideMask(
  x: number,
  y: number,
  w: number,
  h: number,
  canvasW: number,
  canvasH: number,
  maskData: Uint8ClampedArray,
  maskW: number = 180,
  maskH: number = 120
): boolean {
  // Test 9 strategic points (corners, center, edges)
  const pad = 3;
  const points = [
    { px: x + pad, py: y + pad },
    { px: x + w - pad, py: y + pad },
    { px: x + pad, py: y + h - pad },
    { px: x + w - pad, py: y + h - pad },
    { px: x + w / 2, py: y + h / 2 },
    { px: x + w / 2, py: y + pad },
    { px: x + w / 2, py: y + h - pad },
    { px: x + pad, py: y + h / 2 },
    { px: x + w - pad, py: y + h / 2 }
  ];

  for (const pt of points) {
    if (pt.px < 0 || pt.px >= canvasW || pt.py < 0 || pt.py >= canvasH) return false;
    const mx = Math.floor((pt.px / canvasW) * maskW);
    const my = Math.floor((pt.py / canvasH) * maskH);
    if (mx < 0 || mx >= maskW || my < 0 || my >= maskH) return false;
    const alpha = maskData[(my * maskW + mx) * 4 + 3];
    if (alpha < 100) return false; // transparent = outside shape
  }

  return true;
}

/**
 * Places words on an Archimedean spiral tailored to the chosen shape
 */
export function layoutWordCloud(
  words: WordItem[],
  width: number,
  height: number,
  shape: WordCloudShape = 'cloud'
): PositionedWord[] {
  if (words.length === 0 || width <= 0 || height <= 0) return [];

  const maxCount = Math.max(...words.map(w => w.count), 1);
  const minCount = Math.min(...words.map(w => w.count), 1);

  // Shape configuration
  const shapeConfig = WORD_CLOUD_SHAPES.find(s => s.id === shape) || WORD_CLOUD_SHAPES[0];
  const maskW = 180;
  const maskH = Math.max(80, Math.round(180 * (height / width)));
  const maskData = getShapeMask(shape, maskW, maskH);

  // Responsive font size bounds
  const minFont = Math.max(13, Math.min(width, height) * 0.032);
  const maxFont = Math.max(minFont + 12, Math.min(width, height) * (shape === 'star' ? 0.1 : 0.12));

  const placedBoxes: Rect[] = [];
  const positioned: PositionedWord[] = [];

  // Start spiral from the shape's specific centroid
  const centerX = width * (shapeConfig.centroid?.x || 0.5);
  const centerY = height * (shapeConfig.centroid?.y || 0.5);

  let measureCtx: CanvasRenderingContext2D | null = null;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    measureCtx = canvas.getContext('2d');
  }

  words.forEach((item, index) => {
    const ratio = maxCount === minCount ? 0.6 : (item.count - minCount) / (maxCount - minCount);
    let fontSize = Math.round(minFont + Math.pow(ratio, 0.8) * (maxFont - minFont));

    const computeDimensions = (size: number) => {
      let tw = item.text.length * size * 0.62;
      if (measureCtx) {
        measureCtx.font = `bold ${size}px sans-serif`;
        tw = measureCtx.measureText(item.text).width;
      }
      const th = size * 1.15;
      const padding = 5;
      return { w: tw + padding * 2, h: th + padding * 2 };
    };

    let { w, h } = computeDimensions(fontSize);

    // Spiral search
    let angle = (index * 2.39);
    let radius = 0;
    const angleStep = 0.32;
    const radiusStep = 2.4;
    const maxRadius = Math.max(width, height);

    let placed = false;
    let finalX = centerX - w / 2;
    let finalY = centerY - h / 2;

    // Aspect ratio stretch for spiral
    const aspectCorrection = width / Math.max(height, 1) * 0.88;

    while (radius < maxRadius) {
      const curX = centerX + radius * Math.cos(angle) * aspectCorrection - w / 2;
      const curY = centerY + radius * Math.sin(angle) - h / 2;

      // 1. Boundary check
      if (curX >= 8 && curX + w <= width - 8 && curY >= 8 && curY + h <= height - 8) {
        // 2. Shape mask check (if shape has mask)
        const insideShape = maskData
          ? isRectInsideMask(curX, curY, w, h, width, height, maskData, maskW, maskH)
          : true;

        if (insideShape) {
          const candidateRect: Rect = { x: curX, y: curY, w, h };
          const hasOverlap = placedBoxes.some(box => checkCollision(candidateRect, box));

          if (!hasOverlap) {
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

    // Fallback: If shape is tight and word couldn't be placed, try slightly reduced font size
    if (!placed && fontSize > minFont + 4) {
      fontSize = Math.round(fontSize * 0.8);
      const scaled = computeDimensions(fontSize);
      w = scaled.w;
      h = scaled.h;

      let r2 = 0;
      let a2 = index * 1.7;
      while (r2 < maxRadius) {
        const curX = centerX + r2 * Math.cos(a2) * aspectCorrection - w / 2;
        const curY = centerY + r2 * Math.sin(a2) - h / 2;

        if (curX >= 8 && curX + w <= width - 8 && curY >= 8 && curY + h <= height - 8) {
          const insideShape = maskData
            ? isRectInsideMask(curX, curY, w, h, width, height, maskData, maskW, maskH)
            : true;

          if (insideShape) {
            const candidateRect: Rect = { x: curX, y: curY, w, h };
            if (!placedBoxes.some(box => checkCollision(candidateRect, box))) {
              finalX = curX;
              finalY = curY;
              placedBoxes.push(candidateRect);
              placed = true;
              break;
            }
          }
        }
        a2 += angleStep;
        r2 += radiusStep * (angleStep / (2 * Math.PI));
      }
    }

    if (!placed) {
      // Safe boundary fallback
      finalX = Math.max(10, Math.min(width - w - 10, centerX + (Math.random() - 0.5) * (width * 0.5) - w / 2));
      finalY = Math.max(10, Math.min(height - h - 10, centerY + (Math.random() - 0.5) * (height * 0.5) - h / 2));
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
