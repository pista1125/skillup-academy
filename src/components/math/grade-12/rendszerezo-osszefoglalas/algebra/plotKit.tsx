import React from 'react';

/** Belső koordináta-rendszer- és görbesegédek (nem exportáljuk az index.ts-ből). */

export const L_BLUE = '#2563eb';
export const L_RED = '#dc2626';
export const L_GREEN = '#059669';
export const L_PURPLE = '#7c3aed';
export const L_AMBER = '#d97706';
export const L_INK = '#0f172a';

export interface PlotBox {
  x0: number;
  y0: number;
  w: number;
  h: number;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}
export const mapX = (b: PlotBox, x: number) => b.x0 + ((x - b.xmin) / (b.xmax - b.xmin)) * b.w;
export const mapY = (b: PlotBox, y: number) => b.y0 + b.h - ((y - b.ymin) / (b.ymax - b.ymin)) * b.h;

/** Koordináta-tengelyek rácsvonalakkal. */
export const Axes: React.FC<{ b: PlotBox; stepX?: number; stepY?: number; labels?: boolean }> = ({ b, stepX = 1, stepY = 1, labels = true }) => {
  const xs: number[] = [];
  for (let x = Math.ceil(b.xmin / stepX) * stepX; x <= b.xmax + 1e-9; x += stepX) xs.push(Math.round(x * 1e6) / 1e6);
  const ys: number[] = [];
  for (let y = Math.ceil(b.ymin / stepY) * stepY; y <= b.ymax + 1e-9; y += stepY) ys.push(Math.round(y * 1e6) / 1e6);
  const X0 = mapX(b, 0);
  const Y0 = mapY(b, 0);
  return (
    <g>
      {xs.map((x) => (
        <line key={`gx${x}`} x1={mapX(b, x)} x2={mapX(b, x)} y1={b.y0} y2={b.y0 + b.h} stroke="#e2e8f0" />
      ))}
      {ys.map((y) => (
        <line key={`gy${y}`} x1={b.x0} x2={b.x0 + b.w} y1={mapY(b, y)} y2={mapY(b, y)} stroke="#e2e8f0" />
      ))}
      {b.ymin <= 0 && b.ymax >= 0 && <line x1={b.x0} x2={b.x0 + b.w} y1={Y0} y2={Y0} stroke={L_INK} strokeWidth="1.2" />}
      {b.xmin <= 0 && b.xmax >= 0 && <line x1={X0} x2={X0} y1={b.y0} y2={b.y0 + b.h} stroke={L_INK} strokeWidth="1.2" />}
      {labels &&
        xs
          .filter((x) => x !== 0)
          .map((x) => (
            <text key={`lx${x}`} x={mapX(b, x)} y={Math.min(Math.max(Y0 + 12, b.y0 + 10), b.y0 + b.h + 12)} fontSize="8.5" textAnchor="middle" fill="#64748b">
              {x < 0 ? `−${-x}` : x}
            </text>
          ))}
      {labels &&
        ys
          .filter((y) => y !== 0)
          .map((y) => (
            <text key={`ly${y}`} x={Math.max(Math.min(X0 - 4, b.x0 + b.w), b.x0 + 14)} y={mapY(b, y) + 3} fontSize="8.5" textAnchor="end" fill="#64748b">
              {y < 0 ? `−${-y}` : y}
            </text>
          ))}
    </g>
  );
};

/** Függvénygörbe path-ja (a dobozból kilógó részeket megszakítja). */
export const curvePath = (b: PlotBox, f: (x: number) => number, from = b.xmin, to = b.xmax, n = 240): string => {
  let d = '';
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y < b.ymin - (b.ymax - b.ymin) || y > b.ymax + (b.ymax - b.ymin)) {
      pen = false;
      continue;
    }
    const yy = Math.max(b.ymin - 0.5 * (b.ymax - b.ymin), Math.min(b.ymax + 0.5 * (b.ymax - b.ymin), y));
    d += `${pen ? 'L' : 'M'}${mapX(b, x).toFixed(1)},${mapY(b, yy).toFixed(1)} `;
    pen = true;
  }
  return d;
};

