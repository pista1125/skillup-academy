import React from 'react';
import { MidpointPlane } from '../felezopont/MidpointFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const BLUE = '#2563eb';
const RED = '#dc2626';
const GREEN = '#059669';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

// 1. ábra: Bevezető – az a: y = 2, b: y = x és c: y = x + 5 egyenesek
export const IntroLinesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-9, 8]}
    y={[-5, 8]}
    unit={20}
    labels={2}
    className={className}
    lines={[
      { p: [0, 2], d: [1, 0], color: BLUE, label: 'a', labelAt: 0.02, lx: 2, ly: -6 },
      { p: [0, 0], d: [1, 1], color: GREEN, label: 'b', labelAt: 0.95, lx: -16, ly: 4 },
      { p: [0, 5], d: [1, 1], color: PURPLE, label: 'c', labelAt: 0.92, lx: -18, ly: 0 }
    ]}
    points={[
      { at: [-8, 2], label: '(−8; 2)', dx: 4, dy: -8, color: BLUE },
      { at: [-3, 2], label: '(−3; 2)', dx: -22, dy: 4, color: PURPLE },
      { at: [2, 2], label: '(2; 2)', dx: 20, dy: 12, color: GREEN },
      { at: [6, 6], label: '(6; 6)', dx: 20, dy: 4, color: GREEN },
      { at: [1, 6], label: '(1; 6)', dx: -20, dy: -4, color: PURPLE },
      { at: [-7, -2], label: '(−7; −2)', dx: 26, dy: 4, color: PURPLE },
      { at: [-3, -3], label: '(−3; −3)', dx: 26, dy: 6, color: GREEN }
    ]}
  />
);

// 2. ábra: Elmélet 1–2. – az x = a és az y = b egyenletű egyenes
export const AxisParallelLinesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-2, 8]}
    y={[-2, 7]}
    unit={26}
    grid={0}
    labels={-1}
    className={className}
    lines={[
      { p: [5, 0], d: [0, 1], color: BLUE, label: 'e: x = a', labelAt: 0.95, lx: 6, ly: 6 },
      { p: [0, 4], d: [1, 0], color: RED, label: 'f: y = b', labelAt: 0.98, lx: -52, ly: -6 }
    ]}
    points={[
      { at: [5, 0], label: 'a', dx: 8, dy: 13, color: BLUE },
      { at: [0, 4], label: 'b', dx: -9, dy: -4, color: RED },
      { at: [5, 1.5], color: BLUE, r: 2.6 },
      { at: [5, 6], color: BLUE, r: 2.6 },
      { at: [2, 4], color: RED, r: 2.6 },
      { at: [7, 4], color: RED, r: 2.6 }
    ]}
    texts={[
      { at: [5, 1.5], text: '(a; 1,5)', dx: 6, dy: 4, color: BLUE, anchor: 'start' },
      { at: [2, 4], text: '(2; b)', dy: 15, color: RED }
    ]}
  />
);

// 3. ábra: Elmélet 3. – az y = ax + b egyenletű g egyenes
export const GeneralLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-4, 6]}
    y={[-2, 7]}
    unit={26}
    grid={0}
    labels={-1}
    className={className}
    lines={[{ p: [0, 2], d: [1, 0.75], color: PURPLE, label: 'g: y = ax + b', labelAt: 0.82, lx: -96, ly: -4 }]}
    segs={[
      { from: [2, 3.5], to: [2, 0], color: '#94a3b8', dashed: true, width: 1.2 },
      { from: [2, 3.5], to: [0, 3.5], color: '#94a3b8', dashed: true, width: 1.2 }
    ]}
    points={[
      { at: [0, 2], label: 'b', dx: -9, dy: 2, color: PURPLE },
      { at: [2, 3.5], label: 'P(x; ax + b)', dx: 34, dy: 14, color: RED }
    ]}
    texts={[
      { at: [2, 0], text: 'x', dy: 14, color: '#475569' },
      { at: [0, 3.5], text: 'ax + b', dx: -5, dy: 4, color: '#475569', anchor: 'end' }
    ]}
  />
);

// 4. ábra: Bevezető – a c egyenes a b egyenes eltoltja a (0; 5) vektorral
export const TranslatedLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-7, 5]}
    y={[-4, 8]}
    unit={22}
    labels={2}
    className={className}
    lines={[
      { p: [0, 0], d: [1, 1], color: GREEN, label: 'b: y = x', labelAt: 0.9, lx: -2, ly: 14 },
      { p: [0, 5], d: [1, 1], color: PURPLE, label: 'c: y = x + 5', labelAt: 0.25, lx: -88, ly: 0 }
    ]}
    vecs={[
      { from: [-3, -3], to: [-3, 2], color: AMBER, width: 2, label: 'v', lx: -10, ly: 0 },
      { from: [1, 1], to: [1, 6], color: AMBER, width: 2 }
    ]}
    points={[
      { at: [-3, -3], color: GREEN },
      { at: [-3, 2], color: PURPLE },
      { at: [1, 1], color: GREEN },
      { at: [1, 6], color: PURPLE }
    ]}
    texts={[{ at: [2.6, -2.5], text: '→v = (0; 5)', color: AMBER, size: 11, bold: true }]}
  />
);

// 5. ábra: 3. feladat – rajta van-e a pont az y = −x + 1 egyenesen?
export const PointOnLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-6, 7]}
    y={[-6, 7]}
    unit={20}
    labels={2}
    className={className}
    lines={[{ p: [0, 1], d: [1, -1], color: BLUE, label: 'y = −x + 1', labelAt: 0.12, lx: 10, ly: 0 }]}
    points={[
      { at: [-4, 5], label: 'A(−4; 5) ✓', dx: 34, dy: -2, color: GREEN, r: 4 },
      { at: [-1, 3], label: 'B(−1; 3) ✗', dx: -6, dy: -8, color: RED, r: 4, hollow: true },
      { at: [2, 2], label: 'C(2; 2) ✗', dx: 28, dy: -4, color: RED, r: 4, hollow: true },
      { at: [5, -4], label: 'D(5; −4) ✓', dx: -6, dy: 15, color: GREEN, r: 4 }
    ]}
  />
);

// 6. ábra: Kitekintés – irányvektor és normálvektor
export const DirectionNormalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-3, 6]}
    y={[-2, 7]}
    unit={28}
    labels={0}
    className={className}
    lines={[{ p: [0, 1], d: [1, 1], color: PURPLE, label: 'y = x + 1', labelAt: 0.88, lx: -64, ly: 0 }]}
    vecs={[
      { from: [2, 3], to: [4, 5], color: BLUE, width: 2.6, label: 'v', lx: 12, ly: 4 },
      { from: [2, 3], to: [0, 5], color: RED, width: 2.6, label: 'n', lx: -6, ly: -4 }
    ]}
    segs={[
      { from: [2, 3], to: [4, 3], color: '#94a3b8', dashed: true, width: 1.2 },
      { from: [4, 3], to: [4, 5], color: '#94a3b8', dashed: true, width: 1.2 }
    ]}
    rightAngles={[{ at: [2, 3], p: [4, 5], q: [0, 5], color: RED }]}
    points={[{ at: [2, 3], label: 'P₀(2; 3)', dx: 24, dy: 14 }]}
    texts={[
      { at: [4.2, 2.3], text: '→v(2; 2)', color: BLUE, size: 11, bold: true, anchor: 'start' },
      { at: [-1.6, 5.8], text: '→n(−2; 2)', color: RED, size: 11, bold: true, anchor: 'start' }
    ]}
  />
);
