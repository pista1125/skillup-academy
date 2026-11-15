import React from 'react';
import { MidpointPlane, CP } from '../felezopont/MidpointFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const BLUE = '#2563eb';
const RED = '#dc2626';
const GREEN = '#059669';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';
const SLATE = '#64748b';

/** Kör rajzolása a MidpointPlane render-propjával (középpont, sugár egységben). */
const circleChild =
  (center: CP, r: number, unit: number, color = PURPLE, dashed = false) =>
  (px: (p: CP) => { x: number; y: number }) => {
    const c = px(center);
    return (
      <circle
        cx={c.x}
        cy={c.y}
        r={r * unit}
        fill="rgba(124,58,237,0.04)"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? '6 4' : undefined}
      />
    );
  };

// 1. ábra: 1. feladat – az a, b, c, d, e, f vektorok az origóból
export const CoordPracticeVectorsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 11]}
    y={[-7, 5]}
    unit={20}
    labels={2}
    className={className}
    vecs={[
      { from: [0, 0], to: [2, -3], color: BLUE, label: 'a', lx: 10, ly: 2 },
      { from: [0, 0], to: [-2, 3], color: BLUE, label: 'b', lx: -10, ly: 0 },
      { from: [0, 0], to: [4, -6], color: '#1d4ed8', label: 'c', lx: 14, ly: 16 },
      { from: [0, 0], to: [6, 4], color: GREEN, label: 'd', lx: -6, ly: -8 },
      { from: [0, 0], to: [10, -2], color: AMBER, label: 'e', lx: 4, ly: 14 },
      { from: [0, 0], to: [-4, -1], color: RED, label: 'f', lx: 0, ly: 16 }
    ]}
    texts={[
      { at: [6.5, 4.6], text: 'd(6; 4) ⊥ a, b, c', color: GREEN, size: 10, bold: true },
      { at: [7, -5.5], text: 'e = c + d', color: AMBER, size: 10, bold: true }
    ]}
    rightAngles={[{ at: [0, 0], p: [2, -3], q: [6, 4], r: 13, color: GREEN }]}
  />
);

// 2. ábra: 2. feladat – az AB befogóhoz négy egyenlő szárú derékszögű háromszög tartozik
export const CoordPracticeIsoscelesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-1, 15]}
    y={[-6, 12]}
    unit={17}
    labels={2}
    className={className}
    polys={[
      { pts: [[4, 1], [10, 5], [0, 7]], fill: 'rgba(37,99,235,0.10)', stroke: BLUE },
      { pts: [[4, 1], [10, 5], [8, -5]], stroke: '#94a3b8', dashed: true },
      { pts: [[4, 1], [10, 5], [6, 11]], stroke: '#94a3b8', dashed: true },
      { pts: [[4, 1], [10, 5], [14, -1]], stroke: '#94a3b8', dashed: true }
    ]}
    segs={[{ from: [4, 1], to: [10, 5], color: '#0f172a', width: 2.6 }]}
    rightAngles={[{ at: [4, 1], p: [10, 5], q: [0, 7], r: 13, color: BLUE }]}
    points={[
      { at: [4, 1], label: 'A(4; 1)', dx: 22, dy: 12, color: '#0f172a' },
      { at: [10, 5], label: 'B(10; 5)', dx: 26, dy: 2, color: '#0f172a' },
      { at: [0, 7], label: 'C₁(0; 7)', dx: 4, dy: -9, color: BLUE },
      { at: [8, -5], label: 'C₂(8; −5)', dx: 30, dy: 3, color: SLATE },
      { at: [6, 11], label: 'C₃(6; 11)', dx: 30, dy: 3, color: SLATE },
      { at: [14, -1], label: 'C₄(14; −1)', dx: -8, dy: 15, color: SLATE }
    ]}
  />
);

// 3. ábra: magasságvonal – A(−2; −2), B(7; 1), C(5; 5), a C-ből induló magasság talppontja T(6,4; 0,8)
export const CoordPracticeAltitudeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-3, 9]}
    y={[-3, 7]}
    unit={26}
    labels={2}
    className={className}
    polys={[{ pts: [[-2, -2], [7, 1], [5, 5]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    lines={[
      { p: [5, 5], d: [-1, 3], color: RED, label: 'mc: y = −3x + 20', labelAt: 0.12, lx: 8, ly: 4, width: 1.8 },
      { p: [-2, -2], d: [3, 1], color: '#94a3b8', dashed: true, width: 1.2 }
    ]}
    rightAngles={[{ at: [6.4, 0.8], p: [5, 5], q: [-2, -2], r: 12, color: RED }]}
    points={[
      { at: [-2, -2], label: 'A(−2; −2)', dx: 8, dy: 14, color: BLUE },
      { at: [7, 1], label: 'B(7; 1)', dx: 22, dy: 4, color: BLUE },
      { at: [5, 5], label: 'C(5; 5)', dx: -26, dy: -2, color: BLUE },
      { at: [6.4, 0.8], label: 'T', dx: -2, dy: 15, color: RED, r: 3 },
      { at: [6, 2], label: 'M', dx: -10, dy: -4, color: '#0f172a', r: 2.8 }
    ]}
    texts={[{ at: [1.4, -2.6], text: 'AB meredeksége 1/3 ⇒ mc meredeksége −3', color: SLATE, size: 9.5 }]}
  />
);

// 4. ábra: oldalfelező merőlegesek, körülírt kör – K(2; 1), r = 5
export const CoordPracticeCircumcircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-4, 8]}
    y={[-5, 7]}
    unit={22}
    labels={2}
    className={className}
    polys={[{ pts: [[-2, -2], [7, 1], [5, 5]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    lines={[
      { p: [2.5, -0.5], d: [-1, 3], color: GREEN, label: 'fAB', labelAt: 0.1, lx: 6, ly: 2, dashed: true, width: 1.6 },
      { p: [6, 3], d: [2, 1], color: AMBER, label: 'fBC', labelAt: 0.92, lx: -22, ly: -6, dashed: true, width: 1.6 }
    ]}
    rightAngles={[
      { at: [2.5, -0.5], p: [7, 1], q: [1.5, 2.5], r: 10, color: GREEN },
      { at: [6, 3], p: [5, 5], q: [4, 2], r: 10, color: AMBER }
    ]}
    points={[
      { at: [-2, -2], label: 'A', dx: -8, dy: 10, color: BLUE },
      { at: [7, 1], label: 'B', dx: 9, dy: 4, color: BLUE },
      { at: [5, 5], label: 'C', dx: 4, dy: -8, color: BLUE },
      { at: [2.5, -0.5], color: GREEN, r: 2.6 },
      { at: [6, 3], color: AMBER, r: 2.6 },
      { at: [2, 1], label: 'K(2; 1)', dx: -20, dy: -6, color: PURPLE, r: 3.8 }
    ]}
  >
    {circleChild([2, 1], 5, 22)}
  </MidpointPlane>
);

// 5. ábra: Ráadás – a PA² + PB² + PC² összeg a súlypontban a legkisebb
export const CoordPracticeCentroidMinSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-3, 7]}
    y={[-1, 12]}
    unit={22}
    labels={2}
    className={className}
    polys={[{ pts: [[2, 4], [5, 7], [-1, 10]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    segs={[
      { from: [2, 7], to: [2, 4], color: RED, dashed: true, width: 1.4 },
      { from: [2, 7], to: [5, 7], color: RED, dashed: true, width: 1.4 },
      { from: [2, 7], to: [-1, 10], color: RED, dashed: true, width: 1.4 }
    ]}
    points={[
      { at: [2, 4], label: 'A(2; 4)', dx: 24, dy: 8, color: BLUE },
      { at: [5, 7], label: 'B(5; 7)', dx: 4, dy: -8, color: BLUE },
      { at: [-1, 10], label: 'C(−1; 10)', dx: 8, dy: -9, color: BLUE },
      { at: [2, 7], label: 'P = S(2; 7)', dx: -30, dy: 4, color: RED, r: 4 }
    ]}
    texts={[
      { at: [2, 1.6], text: 'PA² + PB² + PC² = 3(x − 2)² + 3(y − 7)² + 36', color: '#0f172a', size: 9.5 },
      { at: [2, 0.6], text: 'legkisebb értéke 36, ha P(2; 7)', color: RED, size: 9.5, bold: true }
    ]}
  />
);

// 6. ábra: 5. feladat – párhuzamos, egybeeső és merőleges egyenesek
export const CoordPracticeLinesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 5]}
    y={[-5, 5]}
    unit={26}
    labels={1}
    className={className}
    lines={[
      { p: [0, -1.4], d: [5, 3], color: BLUE, label: 'e = h', labelAt: 0.9, lx: -30, ly: 16, width: 2.6 },
      { p: [0, 2 / 3], d: [5, 3], color: GREEN, label: 'g', labelAt: 0.82, lx: -12, ly: -6 },
      { p: [0, 7 / 3], d: [3, -5], color: RED, label: 'f', labelAt: 0.1, lx: 8, ly: 4 },
      { p: [0, -7 / 3], d: [3, -5], color: AMBER, label: 'i', labelAt: 0.12, lx: -16, ly: 4 }
    ]}
    rightAngles={[{ at: [56 / 34, -14 / 34], p: [4, 1], q: [0, 7 / 3], r: 12, color: RED }]}
    texts={[
      { at: [2.4, -4.3], text: 'e ∥ g, e ⊥ f, f ∥ i', color: '#0f172a', size: 10, bold: true }
    ]}
  />
);
