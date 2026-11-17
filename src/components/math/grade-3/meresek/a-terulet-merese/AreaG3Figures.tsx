import React from 'react';
import { FONT, INK, Pieces, GridBg, shapePolys, cellPts, halfPts, rectCells, UnitTag, Cell, Half, Pt, HEX, RHOMB, BIGTRI } from './AreaG3Parts';

type P = { className?: string };
const W = 'w-full h-auto';

const Frame: React.FC<{ h: number; className?: string; children?: React.ReactNode }> = ({ h, className = W, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Mi a terület? Egy síkidom kis négyzetekkel lefedve, a négyzetek megszámozva. */
const WHAT: Cell[] = [
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2]
];
export const AreaWhatIsSvg: React.FC<P> = ({ className }) => (
  <Frame h={150} className={className}>
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      Hány kis négyzet fedi le?
    </text>
    <GridBg x={65} y={26} cols={6} rows={5} s={19} />
    <Pieces polys={shapePolys(WHAT.map(([c, r]) => [c + 1, r + 1] as Cell))} x={65} y={26} s={19} pal="green" nums numSize={11} />
    <UnitTag x={16} y={136} />
    <text x="150" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
      Területe: 7 kis négyzet
    </text>
  </Frame>
);

/** Ugyanaz a téglalap háromféle egységgel mérve. */
const domino = (c: number, r: number): Pt[] => [
  [c, r],
  [c + 2, r],
  [c + 2, r + 1],
  [c, r + 1]
];
export const AreaUnitsSvg: React.FC<P> = ({ className }) => {
  const s = 15;
  const sq = shapePolys(rectCells(2, 4));
  const dom = [domino(0, 0), domino(2, 0), domino(0, 1), domino(2, 1)];
  const tri: Pt[][] = [];
  rectCells(2, 4).forEach(([c, r]) => {
    tri.push(halfPts(c, r, 'bl'));
    tri.push(halfPts(c, r, 'tr'));
  });
  const panels = [
    { polys: sq, x: 14, pal: 'yellow' as const, unit: [cellPts(0, 0)], txt: '8 négyzet' },
    { polys: dom, x: 90, pal: 'orange' as const, unit: [domino(0, 0)], txt: '4 dominó' },
    { polys: tri, x: 166, pal: 'blue' as const, unit: [halfPts(0, 0, 'bl')], txt: '16 háromszög' }
  ];
  return (
    <Frame h={150} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        Ugyanaz a téglalap, más egység
      </text>
      {panels.map((p, i) => (
        <g key={i}>
          <text x={p.x + 30} y="42" textAnchor="middle" fontSize="10" fill="#334155">
            egység:
          </text>
          <Pieces polys={p.unit} x={p.x + 30 - (i === 1 ? s : s / 2)} y={50} s={s} pal={p.pal} inner={1} outline={1.8} />
          <Pieces polys={p.polys} x={p.x} y={78} s={s} pal={p.pal} inner={1} outline={2} />
          <text x={p.x + 30} y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
            {p.txt}
          </text>
        </g>
      ))}
      <text x="120" y="144" textAnchor="middle" fontSize="10" fill="#334155">
        Nagyobb egység → kevesebb darab
      </text>
    </Frame>
  );
};

/** Más alak, ugyanakkora terület. */
const SHAPE_A: Cell[] = rectCells(2, 4);
const SHAPE_B: Cell[] = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [3, 1],
  [3, 0]
];
export const AreaCompareSvg: React.FC<P> = ({ className }) => (
  <Frame h={140} className={className}>
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      Melyik nagyobb?
    </text>
    <GridBg x={12} y={30} cols={10} rows={4} s={21.6} />
    <text x="20" y="46" fontSize="12" fontWeight="bold" fill={INK}>
      A
    </text>
    <Pieces polys={shapePolys(SHAPE_A.map(([c, r]) => [c + 1, r + 1] as Cell))} x={12} y={30} s={21.6} pal="blue" nums numSize={10} />
    <text x="128" y="46" fontSize="12" fontWeight="bold" fill={INK}>
      B
    </text>
    <Pieces polys={shapePolys(SHAPE_B.map(([c, r]) => [c + 6, r + 1] as Cell))} x={12} y={30} s={21.6} pal="pink" nums numSize={10} />
    <text x="120" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      Mindkettő 8 kis négyzet: ugyanakkora!
    </text>
  </Frame>
);

/** 2 fél négyzet = 1 egész; a ferde síkidom átrendezve téglalap. */
const PARA_H: Half[] = [
  [1, 0, 'br'],
  [5, 0, 'tl'],
  [0, 1, 'br'],
  [4, 1, 'tl']
];
const PARA_C: Cell[] = [
  [2, 0],
  [3, 0],
  [4, 0],
  [1, 1],
  [2, 1],
  [3, 1]
];
export const AreaHalvesSvg: React.FC<P> = ({ className }) => {
  const s = 18;
  return (
    <Frame h={150} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        2 fél négyzet = 1 egész négyzet
      </text>
      <Pieces polys={[halfPts(0, 0, 'bl')]} x={30} y={30} s={s} pal="purple" />
      <text x="56" y="44" fontSize="14" fontWeight="bold" fill={INK}>
        +
      </text>
      <Pieces polys={[halfPts(0, 0, 'tr')]} x={70} y={30} s={s} pal="purple" />
      <text x="96" y="44" fontSize="14" fontWeight="bold" fill={INK}>
        =
      </text>
      <Pieces polys={[halfPts(0, 0, 'bl'), halfPts(0, 0, 'tr')]} x={112} y={30} s={s} pal="purple" />
      <GridBg x={12} y={70} cols={6} rows={2} s={s} />
      <Pieces
        polys={shapePolys(PARA_C, PARA_H)}
        x={12}
        y={70}
        s={s}
        pal="green"
        fills={[undefined, undefined, undefined, undefined, undefined, undefined, '#fde047', '#fde047', '#fde047', '#fde047']}
      />
      <text x="138" y="96" fontSize="16" fontWeight="bold" fill="#c2410c">
        →
      </text>
      <GridBg x={158} y={70} cols={4} rows={2} s={s} />
      <Pieces polys={shapePolys(rectCells(2, 4))} x={158} y={70} s={s} pal="green" />
      <text x="66" y="128" textAnchor="middle" fontSize="11" fill="#334155">
        6 egész + 4 fél
      </text>
      <text x="194" y="128" textAnchor="middle" fontSize="11" fill="#334155">
        8 egész
      </text>
      <text x="120" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
        A 4 fél négyzetből 2 egész lesz: 6 + 2 = 8
      </text>
    </Frame>
  );
};

/** Szabályos kis háromszögekből kirakott síkidomok. */
export const AreaTrianglesSvg: React.FC<P> = ({ className }) => {
  const s = 30;
  return (
    <Frame h={150} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        Mérjünk kis háromszöggel!
      </text>
      <UnitTag x={70} y={36} kind="tri" s={14} pal="blue" />
      <Pieces polys={RHOMB} x={14} y={62} s={s} pal="yellow" />
      <Pieces polys={BIGTRI} x={60} y={62} s={s} pal="orange" />
      <Pieces polys={HEX} x={150} y={62} s={s} pal="green" />
      <text x="36" y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
        2 darab
      </text>
      <text x="105" y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
        4 darab
      </text>
      <text x="180" y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
        6 darab
      </text>
      <text x="120" y="144" textAnchor="middle" fontSize="10" fill="#334155">
        A hatszög területe 6 kis háromszög.
      </text>
    </Frame>
  );
};

/** Kerület vagy terület? */
export const AreaVsPerimeterSvg: React.FC<P> = ({ className }) => {
  const s = 18;
  const x1 = 26;
  const x2 = 146;
  const y = 44;
  return (
    <Frame h={150} className={className}>
      <text x="62" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">
        Kerület
      </text>
      <text x="182" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
        Terület
      </text>
      <line x1="120" y1="10" x2="120" y2="140" stroke="#e2e8f0" strokeWidth="2" />
      <GridBg x={x1 - s} y={y - s} cols={6} rows={4} s={s} />
      <rect x={x1} y={y} width={s * 4} height={s * 2} fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinejoin="round" />
      <GridBg x={x2 - s} y={y - s} cols={6} rows={4} s={s} />
      <Pieces polys={shapePolys(rectCells(2, 4))} x={x2} y={y} s={s} pal="green" />
      <text x="62" y="112" textAnchor="middle" fontSize="11" fill={INK}>
        a határ körben
      </text>
      <text x="62" y="128" textAnchor="middle" fontSize="11" fill={INK}>
        (vonalzóval mérjük)
      </text>
      <text x="182" y="112" textAnchor="middle" fontSize="11" fill={INK}>
        a belseje
      </text>
      <text x="182" y="128" textAnchor="middle" fontSize="11" fill={INK}>
        (lefedjük, számolunk)
      </text>
    </Frame>
  );
};
