import React from 'react';
import { MidpointPlane, MidpointArrow, MidpointVecLabel, CP } from '../felezopont/MidpointFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const BLUE = '#2563eb';
const RED = '#dc2626';
const GREEN = '#059669';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';
const SLATE = '#64748b';

type PX = (p: CP) => { x: number; y: number };

const circleAt = (center: CP, r: number, unit: number, color = PURPLE) => (px: PX) => {
  const c = px(center);
  return <circle cx={c.x} cy={c.y} r={r * unit} fill="rgba(124,58,237,0.05)" stroke={color} strokeWidth={2} />;
};

/** Szögív képpont-koordinátákban: V csúcs, két irányszög (fokban, matematikai irány), sugár. */
const angleArc = (V: { x: number; y: number }, fromDeg: number, toDeg: number, r: number, color: string, label?: string) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const p1 = { x: V.x + r * Math.cos(rad(fromDeg)), y: V.y - r * Math.sin(rad(fromDeg)) };
  const p2 = { x: V.x + r * Math.cos(rad(toDeg)), y: V.y - r * Math.sin(rad(toDeg)) };
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  const sweep = toDeg > fromDeg ? 0 : 1;
  const mid = rad((fromDeg + toDeg) / 2);
  return (
    <g>
      <path d={`M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} ${sweep} ${p2.x} ${p2.y}`} fill="none" stroke={color} strokeWidth={1.6} />
      {label && (
        <text x={V.x + (r + 10) * Math.cos(mid)} y={V.y - (r + 10) * Math.sin(mid) + 4} fontSize={10.5} fontWeight="bold" fill={color} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
};

// 1. ábra: Érettségi 2011 – e: 5x − 2y = −14,5 és f: 2x + 5y = 14,5 merőlegesek, metszéspont P(−1,5; 3,5)
export const CoordPracticeExamPerpLinesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 8]}
    y={[-2, 8]}
    unit={24}
    labels={2}
    className={className}
    lines={[
      { p: [-1.5, 3.5], d: [2, 5], color: BLUE, label: 'e', labelAt: 0.9, lx: 8, ly: 4 },
      { p: [-1.5, 3.5], d: [5, -2], color: RED, label: 'f', labelAt: 0.92, lx: -4, ly: -8 }
    ]}
    rightAngles={[{ at: [-1.5, 3.5], p: [-0.5, 6], q: [1, 2.5], r: 13, color: PURPLE }]}
    points={[{ at: [-1.5, 3.5], label: 'P(−1,5; 3,5)', dx: -38, dy: -2, color: PURPLE, r: 4 }]}
    texts={[{ at: [4.6, 6.6], text: 'm(e) · m(f) = 2,5 · (−0,4) = −1', color: '#0f172a', size: 9.5 }]}
  >
    {(px) => angleArc(px([-2.9, 0]), 0, 68.2, 18, AMBER, 'α ≈ 68,2°')}
  </MidpointPlane>
);

// 2. ábra: Érettségi 2012 – A(−2; −1), B(9; −3), C(−3; 6), a BC-vel párhuzamos középvonal, a C-nél lévő szög
export const CoordPracticeExamTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 11]}
    y={[-5, 8]}
    unit={21}
    labels={2}
    className={className}
    polys={[{ pts: [[-2, -1], [9, -3], [-3, 6]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    segs={[{ from: [3.5, -2], to: [-2.5, 2.5], color: RED, width: 2.4, dashed: true }]}
    points={[
      { at: [-2, -1], label: 'A(−2; −1)', dx: -26, dy: 6, color: BLUE },
      { at: [9, -3], label: 'B(9; −3)', dx: 0, dy: 15, color: BLUE },
      { at: [-3, 6], label: 'C(−3; 6)', dx: 30, dy: -2, color: BLUE },
      { at: [3.5, -2], label: 'F(AB)', dx: 4, dy: 15, color: RED, r: 2.8 },
      { at: [-2.5, 2.5], label: 'F(AC)', dx: -22, dy: 4, color: RED, r: 2.8 }
    ]}
    texts={[
      { at: [6.2, 3], text: 'BC: 3x + 4y = 15', color: BLUE, size: 10, bold: true },
      { at: [3.2, 0.6], text: 'középvonal = BC/2 = 7,5', color: RED, size: 9.5 }
    ]}
  >
    {(px) => {
      const V = px([-3, 6]);
      // CA iránya (1; −7), CB iránya (12; −9) → −81,9° és −36,9°
      const a1 = (Math.atan2(-7, 1) * 180) / Math.PI;
      const a2 = (Math.atan2(-9, 12) * 180) / Math.PI;
      return angleArc(V, a1, a2, 22, AMBER, 'γ = 45°');
    }}
  </MidpointPlane>
);

// 3. ábra: Érettségi 2010 – a kör az (1; 0) és (7; 0) pontban metszi az x tengelyt, középpontja az y = x egyenesen
export const CoordPracticeExamCircleAxisSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-2, 10]}
    y={[-2, 10]}
    unit={22}
    labels={2}
    className={className}
    lines={[
      { p: [0, 0], d: [1, 1], color: GREEN, label: 'y = x', labelAt: 0.92, lx: -40, ly: 0 },
      { p: [4, 0], d: [0, 1], color: SLATE, dashed: true, width: 1.2, label: 'x = 4', labelAt: 0.95, lx: 4, ly: 8 }
    ]}
    segs={[{ from: [4, 4], to: [7, 0], color: PURPLE, width: 1.6 }]}
    points={[
      { at: [1, 0], label: '(1; 0)', dx: -6, dy: 14, color: RED },
      { at: [7, 0], label: '(7; 0)', dx: 8, dy: 14, color: RED },
      { at: [4, 4], label: 'K(4; 4)', dx: -22, dy: -4, color: PURPLE, r: 4 }
    ]}
    texts={[{ at: [6.3, 2.4], text: 'r = 5', color: PURPLE, size: 10, bold: true }]}
  >
    {circleAt([4, 4], 5, 22)}
  </MidpointPlane>
);

// 4. ábra: Érettségi 2015 – →AB és →AC 120°-os szöget zár be, hosszuk 5; összeg és különbség
export const CoordPracticeExamVectorSumSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 120, y: 170 };
  const L = 120;
  const B = { x: A.x + L, y: A.y };
  const C = { x: A.x + L * Math.cos((2 * Math.PI) / 3), y: A.y - L * Math.sin((2 * Math.PI) / 3) };
  const D = { x: B.x + C.x - A.x, y: B.y + C.y - A.y };
  return (
    <svg viewBox="0 0 320 200" className={className} role="img">
      <rect x={0} y={0} width={320} height={200} rx={10} fill="#ffffff" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`} fill="rgba(37,99,235,0.05)" stroke="#cbd5e1" strokeDasharray="4 3" />
      <MidpointArrow x1={A.x} y1={A.y} x2={B.x} y2={B.y} color={BLUE} />
      <MidpointArrow x1={A.x} y1={A.y} x2={C.x} y2={C.y} color={GREEN} />
      <MidpointArrow x1={A.x} y1={A.y} x2={D.x} y2={D.y} color={PURPLE} dashed />
      <MidpointArrow x1={C.x} y1={C.y} x2={B.x} y2={B.y} color={RED} dashed />
      {angleArc(A, 0, 120, 20, AMBER, '120°')}
      <text x={A.x - 6} y={A.y + 16} fontSize={11} fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 4} y={B.y + 14} fontSize={11} fontWeight="bold" fill="#0f172a">B</text>
      <text x={C.x - 14} y={C.y - 4} fontSize={11} fontWeight="bold" fill="#0f172a">C</text>
      <text x={(A.x + B.x) / 2} y={A.y + 16} fontSize={10} fill={BLUE} textAnchor="middle">5</text>
      <text x={(A.x + C.x) / 2 - 12} y={(A.y + C.y) / 2 + 4} fontSize={10} fill={GREEN} textAnchor="middle">5</text>
      <MidpointVecLabel x={(A.x + D.x) / 2 + 30} y={(A.y + D.y) / 2 + 6} text="AB + AC" color={PURPLE} size={10} />
      <MidpointVecLabel x={(C.x + B.x) / 2 + 34} y={(C.y + B.y) / 2 - 4} text="AB − AC" color={RED} size={10} />
    </svg>
  );
};

// 5. ábra: Érettségi 2015 – PRST rombusz, K(4; −3), T(7; 1), RT = PS/2
export const CoordPracticeExamRhombusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-5, 13]}
    y={[-10, 4]}
    unit={17}
    labels={2}
    className={className}
    polys={[{ pts: [[-4, 3], [1, -7], [12, -9], [7, 1]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    segs={[
      { from: [-4, 3], to: [12, -9], color: GREEN, dashed: true, width: 1.6 },
      { from: [1, -7], to: [7, 1], color: RED, dashed: true, width: 1.6 }
    ]}
    rightAngles={[{ at: [4, -3], p: [7, 1], q: [-4, 3], r: 11, color: PURPLE }]}
    points={[
      { at: [-4, 3], label: 'P(−4; 3)', dx: 8, dy: -8, color: BLUE },
      { at: [1, -7], label: 'R(1; −7)', dx: -6, dy: 15, color: BLUE },
      { at: [12, -9], label: 'S(12; −9)', dx: -10, dy: 15, color: BLUE },
      { at: [7, 1], label: 'T(7; 1)', dx: 12, dy: -6, color: BLUE },
      { at: [4, -3], label: 'K(4; −3)', dx: 28, dy: 4, color: PURPLE, r: 3.5 }
    ]}
    texts={[{ at: [4, 2.8], text: 'KT = 5, KP = 10', color: '#0f172a', size: 9.5 }]}
  />
);

// 6. ábra: Tudáspróba II/4 – derékszögű háromszög, A(−3; 7), B(5; 19), C(−1; 23), körülírt kör
export const CoordPracticeExamRightTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-11, 7]}
    y={[6, 24]}
    unit={15}
    labels={-1}
    className={className}
    polys={[{ pts: [[-3, 7], [5, 19], [-1, 23]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
    rightAngles={[{ at: [5, 19], p: [-3, 7], q: [-1, 23], r: 13, color: BLUE }]}
    segs={[{ from: [-3, 7], to: [-1, 23], color: RED, width: 1.4, dashed: true }]}
    points={[
      { at: [-3, 7], label: 'A(−3; 7)', dx: -8, dy: 15, color: BLUE },
      { at: [5, 19], label: 'B(5; 19)', dx: -8, dy: 15, color: BLUE },
      { at: [-1, 23], label: 'C(−1; 23)', dx: -30, dy: -2, color: BLUE },
      { at: [-2, 15], label: 'K(−2; 15)', dx: -30, dy: 4, color: PURPLE, r: 3.5 }
    ]}
    texts={[
      { at: [-6.5, 9], text: 'AB: 3x − 2y = −23', color: BLUE, size: 9.5 },
      { at: [-6.8, 21.5], text: 'r² = 65', color: PURPLE, size: 10, bold: true }
    ]}
  >
    {circleAt([-2, 15], Math.sqrt(65), 15)}
  </MidpointPlane>
);
