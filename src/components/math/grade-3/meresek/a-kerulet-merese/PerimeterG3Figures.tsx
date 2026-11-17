import React from 'react';
import { FONT, PolyShape, StickPolygon, GridShape, Ladybug, Pine, regularPts, SIDE_COLORS, Pt, Cell } from './PerimeterG3Parts';

// ---------------------------------------------------------------------------
// 5. A kerület mérése – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** A katica körbejárja a négyszöget: a kerület a határoló vonalak hossza. */
export const WalkAroundSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const pts: Pt[] = [[70, 40], [250, 52], [230, 150], [50, 140]];
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="188" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <PolyShape pts={pts} fill="#fef3c7" w={5} />
      {/* irány nyilak az oldalak közepén */}
      {pts.map((p, i) => {
        const q = pts[(i + 1) % pts.length];
        const mx = (p[0] + q[0]) / 2;
        const my = (p[1] + q[1]) / 2;
        const a = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
        return <polygon key={i} points="-7,-6 7,0 -7,6" fill={SIDE_COLORS[i]} transform={`translate(${mx},${my}) rotate(${a})`} />;
      })}
      <Ladybug cx={70} cy={40} r={11} rot={90} />
      <text x="280" y="70" fontSize="14" fontWeight="bold" fill="#0f172a">Körbejárom!</text>
      <text x="280" y="96" fontSize="13" fill="#334155">4 oldal,</text>
      <text x="280" y="116" fontSize="13" fill="#334155">mindet végig.</text>
      <text x="190" y="178" textAnchor="middle" fontSize="13" fill="#334155">Ahonnan elindultam, oda érkezem vissza.</text>
    </svg>
  );
};

/** A négyszög oldalait egy vonalba rakjuk: 4 + 5 + 7 + 4 = 20 cm. (Méretarányos: 1 cm = 14 px.) */
export const UnfoldSidesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const k = 14;
  const X = 40;
  const Y = 20;
  // D(0,0) C(4,0) B(7,4) A(0,4) cm-ben, az óramutató járása szerint
  const pts: Pt[] = [[X, Y], [X + 4 * k, Y], [X + 7 * k, Y + 4 * k], [X, Y + 4 * k]];
  const lens = [4, 5, 7, 4];
  let x = 40;
  return (
    <svg viewBox="0 0 380 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="208" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <PolyShape pts={pts} labels={['4 cm', '5 cm', '7 cm', '4 cm']} w={5} fill="#e0f2fe" />
      <text x="210" y="50" fontSize="13" fill="#334155">Kiegyenesítjük:</text>
      <text x="210" y="70" fontSize="13" fill="#334155">az oldalakat egymás</text>
      <text x="210" y="90" fontSize="13" fill="#334155">után rakjuk.</text>
      {lens.map((l, i) => {
        const a = x;
        x += l * k;
        return (
          <g key={i}>
            <line x1={a} y1={140} x2={x} y2={140} stroke={SIDE_COLORS[i]} strokeWidth="6" />
            <line x1={a} y1={132} x2={a} y2={148} stroke="#1e293b" strokeWidth="1.5" />
            <text x={(a + x) / 2} y={164} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{l} cm</text>
          </g>
        );
      })}
      <line x1={x} y1={132} x2={x} y2={148} stroke="#1e293b" strokeWidth="1.5" />
      <text x="190" y="196" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">4 + 5 + 7 + 4 = 20 cm a kerület</text>
    </svg>
  );
};

/** Kerület a négyzetrácson: a határ kis szakaszait számoljuk (L alak: 12 egység). */
export const GridPerimeterSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const L: Cell[] = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]];
  const R: Cell[] = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
  return (
    <svg viewBox="0 0 380 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="208" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <GridShape x={24} y={20} s={40} cols={4} rows={4} cells={L} numbers numSize={11} />
      <GridShape x={206} y={20} s={40} cols={4} rows={3} cells={R} numbers numSize={11} fill="#bbf7d0" stroke="#15803d" />
      <text x="84" y="198" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">12 egység</text>
      <text x="266" y="158" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">10 egység</text>
      <line x1="206" y1="185" x2="246" y2="185" stroke="#0f172a" strokeWidth="3" />
      <text x="252" y="190" fontSize="12" fill="#334155">= 1 egység</text>
    </svg>
  );
};

/** Pálcikákból kirakott síkidomok: 1 pálcika 5 cm. */
export const SticksShapesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const shapes: [number, number, string][] = [
    [3, 52, '3 · 5 = 15 cm'],
    [4, 140, '4 · 5 = 20 cm'],
    [5, 232, '5 · 5 = 25 cm'],
    [6, 326, '6 · 5 = 30 cm']
  ];
  return (
    <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="168" rx="14" fill="#fefce8" stroke="#fde68a" />
      <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Minden pálcika 5 cm hosszú.</text>
      {shapes.map(([n, cx, lab]) => {
        const side = 40;
        const r = side / (2 * Math.sin(Math.PI / n));
        const rot = n === 4 ? Math.PI / 4 : 0;
        return (
          <g key={n}>
            <StickPolygon pts={regularPts(n, cx, 82, r, rot)} />
            <text x={cx} y={150} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{lab}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** L alakú kert: körbe kerítjük. 30 + 15 + 18 + 6 + 12 + 9 = 90 m. (1 m = 6 px) */
export const GardenSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const k = 6;
  const X = 60;
  const Y = 30;
  // bal felső (0,0) → (18,0) → (18,6) → (30,6) → (30,15) → (0,15), óramutató szerint
  const raw: Pt[] = [[0, 0], [18, 0], [18, 6], [30, 6], [30, 15], [0, 15]];
  const pts = raw.map(([a, b]) => [X + a * k, Y + b * k] as Pt);
  return (
    <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="168" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <PolyShape pts={pts} labels={['18 m', '6 m', '12 m', '9 m', '30 m', '15 m']} colors={['#78350f']} fill="#d9f99d" w={4} off={11} inside={[2]} />
      {[[90, 60], [130, 70], [170, 100], [215, 108], [100, 105], [140, 112]].map(([x, y], i) => (
        <Pine key={i} x={x} y={y} />
      ))}
      <text x="255" y="40" fontSize="13" fill="#334155">Minden oldal kell!</text>
      <text x="255" y="140" fontSize="13" fontWeight="bold" fill="#0f172a">90 m kerítés</text>
    </svg>
  );
};
