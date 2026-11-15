import React from 'react';
import { MidpointPlane } from '../felezopont/MidpointFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const BLUE = '#2563eb';
const RED = '#dc2626';
const GREEN = '#059669';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

// 1. ábra: I/1. – ABCD paralelogramma a K középponttal
export const GroupParallelogramSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-7, 5]}
    y={[-5, 9]}
    unit={24}
    labels={2}
    className={className}
    polys={[{ pts: [[-4, -3], [3, -1], [2, 7], [-5, 5]], fill: 'rgba(37,99,235,0.07)', stroke: BLUE }]}
    segs={[
      { from: [-4, -3], to: [2, 7], color: AMBER, dashed: true, width: 1.5 },
      { from: [3, -1], to: [-5, 5], color: AMBER, dashed: true, width: 1.5 }
    ]}
    points={[
      { at: [-4, -3], label: 'A(−4; −3)', dx: -2, dy: 14 },
      { at: [3, -1], label: 'B(3; −1)', dx: 8, dy: 14 },
      { at: [2, 7], label: 'C(2; 7)', dx: 22, dy: 2, color: GREEN },
      { at: [-5, 5], label: 'D(−5; 5)', dx: -4, dy: -9, color: GREEN },
      { at: [-1, 2], label: 'K(−1; 2)', dx: 28, dy: 4, color: RED }
    ]}
  />
);

// 2. ábra: I/2. d) – az →a(6; −8), a ±90°-os elforgatottjai és −→a négyzetet határoznak meg
export const RotatedVectorsSquareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-10, 10]}
    y={[-10, 10]}
    unit={14}
    grid={2}
    labels={4}
    className={className}
    polys={[{ pts: [[6, -8], [8, 6], [-6, 8], [-8, -6]], fill: 'rgba(124,58,237,0.06)', stroke: PURPLE, dashed: true }]}
    vecs={[
      { from: [0, 0], to: [6, -8], color: BLUE, label: 'a', lx: 12, ly: 2 },
      { from: [0, 0], to: [8, 6], color: GREEN, width: 1.8 },
      { from: [0, 0], to: [-8, -6], color: AMBER, width: 1.8 },
      { from: [0, 0], to: [-6, 8], color: RED, width: 1.8 }
    ]}
    points={[
      { at: [6, -8], label: '(6; −8)', dx: 20, dy: 4, color: BLUE },
      { at: [8, 6], label: '+90°: (8; 6)', dx: -14, dy: -8, color: GREEN },
      { at: [-8, -6], label: '−90°: (−8; −6)', dx: 22, dy: 14, color: AMBER },
      { at: [-6, 8], label: '−a: (−6; 8)', dx: 18, dy: -8, color: RED }
    ]}
  />
);

// 3. ábra: II/1. – négyzet a K középpontból és az A csúcsból
export const SquareFromCenterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-8, 1]}
    y={[-7, 2]}
    unit={30}
    className={className}
    polys={[{ pts: [[-3, -5.5], [-1, -1.5], [-5, 0.5], [-7, -3.5]], fill: 'rgba(5,150,105,0.07)', stroke: GREEN }]}
    vecs={[
      { from: [-4, -2.5], to: [-3, -5.5], color: BLUE, width: 2 },
      { from: [-4, -2.5], to: [-1, -1.5], color: RED, width: 2 }
    ]}
    rightAngles={[{ at: [-4, -2.5], p: [-3, -5.5], q: [-1, -1.5], color: RED }]}
    points={[
      { at: [-3, -5.5], label: 'A(−3; −5,5)', dx: 34, dy: 4, color: BLUE },
      { at: [-1, -1.5], label: 'B(−1; −1,5)', dx: -4, dy: -9 },
      { at: [-5, 0.5], label: 'C(−5; 0,5)', dx: 4, dy: -8 },
      { at: [-7, -3.5], label: 'D(−7; −3,5)', dx: 4, dy: 15 },
      { at: [-4, -2.5], label: 'K', dx: -10, dy: -4, color: RED }
    ]}
    texts={[{ at: [-2.2, -3.4], text: '→KB: +90°', color: RED, size: 10, anchor: 'start' }]}
  />
);

// 4. ábra: II/2. – a paralelogramma negyedik csúcsa: három eset
export const ParallelogramThreeCasesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-7, 9]}
    y={[-22, 10]}
    unit={9}
    grid={2}
    labels={4}
    className={className}
    polys={[
      { pts: [[3, -10], [-3, -6], [1, 4], [7, 0]], stroke: BLUE, fill: 'rgba(37,99,235,0.05)' },
      { pts: [[3, -10], [1, 4], [-3, -6], [-1, -20]], stroke: GREEN, dashed: true },
      { pts: [[3, -10], [-3, -6], [-5, 8], [1, 4]], stroke: PURPLE, dashed: true }
    ]}
    points={[
      { at: [3, -10], label: 'A', dx: 9, dy: 4 },
      { at: [-3, -6], label: 'B', dx: -9, dy: 4 },
      { at: [1, 4], label: 'C', dx: 8, dy: -4 },
      { at: [7, 0], label: 'D₁(7; 0)', dx: -6, dy: -8, color: BLUE },
      { at: [-1, -20], label: 'D₂(−1; −20)', dx: 34, dy: 4, color: GREEN },
      { at: [-5, 8], label: 'D₃(−5; 8)', dx: 26, dy: -4, color: PURPLE }
    ]}
  />
);

// 5. ábra: II/4. – az oldalfelező pontok paralelogrammát alkotnak
export const VarignonSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 7]}
    y={[-1, 9]}
    unit={26}
    className={className}
    polys={[
      { pts: [[0, 0], [6, 0], [1, 8], [-4, 4]], fill: 'rgba(37,99,235,0.06)', stroke: BLUE },
      { pts: [[3, 0], [3.5, 4], [-1.5, 6], [-2, 2]], fill: 'rgba(220,38,38,0.07)', stroke: RED }
    ]}
    vecs={[
      { from: [-2, 2], to: [3, 0], color: AMBER, width: 2 },
      { from: [-1.5, 6], to: [3.5, 4], color: AMBER, width: 2 }
    ]}
    points={[
      { at: [0, 0], label: 'A', dx: -8, dy: 12 },
      { at: [6, 0], label: 'B(6; 0)', dx: 0, dy: 14 },
      { at: [1, 8], label: 'C(1; 8)', dx: 22, dy: 0 },
      { at: [-4, 4], label: 'D(−4; 4)', dx: -6, dy: -8 },
      { at: [3, 0], label: 'E', dx: 0, dy: 14, color: RED },
      { at: [3.5, 4], label: 'F', dx: 9, dy: 2, color: RED },
      { at: [-1.5, 6], label: 'G', dx: -6, dy: -7, color: RED },
      { at: [-2, 2], label: 'H', dx: -9, dy: 2, color: RED }
    ]}
  />
);

/** Szabályos nyolcszög: O(1; 3) középpont, A(4; −1) csúcs, pozitív körüljárás. */
const OCT = Array.from({ length: 8 }, (_, k) => {
  const a = (k * Math.PI) / 4;
  const vx = 3;
  const vy = -4;
  return [1 + vx * Math.cos(a) - vy * Math.sin(a), 3 + vx * Math.sin(a) + vy * Math.cos(a)] as [number, number];
});

// 6. ábra: Ráadás – a kút kávája szabályos nyolcszög
export const OctagonWellSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 7]}
    y={[-3, 9]}
    unit={24}
    className={className}
    polys={[
      { pts: OCT, fill: 'rgba(100,116,139,0.08)', stroke: '#475569' },
      { pts: [[1, 3], OCT[0], OCT[1], OCT[2]], stroke: PURPLE, dashed: true }
    ]}
    segs={[{ from: OCT[0], to: OCT[2], color: AMBER, width: 1.6 }]}
    vecs={[{ from: [1, 3], to: [4.5, 2.5], color: RED, width: 2 }]}
    points={[
      { at: [1, 3], label: 'O(1; 3)', dx: -10, dy: -8 },
      { at: OCT[0], label: 'A(4; −1)', dx: 26, dy: 6 },
      { at: OCT[1], label: 'B', dx: 10, dy: 4, color: PURPLE },
      { at: OCT[2], label: 'C', dx: 4, dy: -8, color: PURPLE },
      { at: [4.5, 2.5], label: 'F', dx: -8, dy: 14, color: RED }
    ]}
  />
);
