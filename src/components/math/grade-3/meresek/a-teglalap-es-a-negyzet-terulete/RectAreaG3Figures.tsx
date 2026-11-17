import React from 'react';
import { FONT, INK, RectGrid, SideLabel, Pieces } from './RectAreaG3Parts';

type P = { className?: string };
const W = 'w-full h-auto';

const Frame: React.FC<{ h: number; className?: string; children?: React.ReactNode }> = ({ h, className = W, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const ROW_COLORS = ['#86efac', '#7dd3fc', '#fdba74'];

/** Soronként számolunk: 3 sor, egy sorban 5 négyzet. */
export const RectRowsSvg: React.FC<P> = ({ className }) => {
  const s = 22;
  const x = 64;
  const y = 30;
  return (
    <Frame h={150} className={className}>
      <SideLabel x1={x} y1={y - 8} x2={x + 5 * s} y2={y - 8} text="egy sorban 5" />
      <RectGrid rows={3} cols={5} x={x} y={y} s={s} pal="green" cellFill={(r) => ROW_COLORS[r]} />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <text x={x - 6} y={y + r * s + 15} textAnchor="end" fontSize="11" fill="#334155">
            {r + 1}. sor
          </text>
          <text x={x + 5 * s + 8} y={y + r * s + 15} fontSize="12" fontWeight="bold" fill={INK}>
            5
          </text>
        </g>
      ))}
      <text x="120" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
        5 + 5 + 5 = 15
      </text>
      <text x="120" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
        3 · 5 = 15 kis négyzet
      </text>
    </Frame>
  );
};

/** Elég az első sor és az első oszlop. */
export const RectPartialSvg: React.FC<P> = ({ className }) => {
  const s = 18;
  const x = 70;
  const y = 30;
  return (
    <Frame h={150} className={className}>
      <SideLabel x1={x} y1={y - 8} x2={x + 6 * s} y2={y - 8} text="egy sorban 6" />
      <SideLabel x1={x - 8} y1={y} x2={x - 8} y2={y + 4 * s} text="4 sor" side="left" />
      <RectGrid rows={4} cols={6} x={x} y={y} s={s} pal="yellow" mode="partial" />
      <text x="120" y="126" textAnchor="middle" fontSize="11" fill="#334155">
        A többi helyét gondold hozzá!
      </text>
      <text x="120" y="142" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
        4 · 6 = 24 lap kell
      </text>
    </Frame>
  );
};

/** Négyzetek: 1, 2, 3, 4 kis négyzet hosszú oldallal. */
export const RectSquaresSvg: React.FC<P> = ({ className }) => {
  const s = 12;
  const items = [
    { n: 1, x: 10, pal: 'red' as const },
    { n: 2, x: 32, pal: 'purple' as const },
    { n: 3, x: 66, pal: 'orange' as const },
    { n: 4, x: 112, pal: 'blue' as const },
    { n: 5, x: 170, pal: 'green' as const }
  ];
  return (
    <Frame h={130} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        Egyre nagyobb négyzetek
      </text>
      {items.map((it) => (
        <g key={it.n}>
          <RectGrid rows={it.n} cols={it.n} x={it.x} y={92 - it.n * s} s={s} pal={it.pal} outline={2} />
          <text x={it.x + (it.n * s) / 2} y="108" textAnchor="middle" fontSize="10" fill="#334155">
            {it.n} · {it.n}
          </text>
          <text x={it.x + (it.n * s) / 2} y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
            {it.n * it.n}
          </text>
        </g>
      ))}
    </Frame>
  );
};

/** Ugyanaz a terasz háromféle járólappal. */
export const RectTilesSvg: React.FC<P> = ({ className }) => {
  const s = 10;
  const dom = (c: number, r: number) =>
    [
      [c, r],
      [c + 2, r],
      [c + 2, r + 1],
      [c, r + 1]
    ] as [number, number][];
  const big = (c: number, r: number) =>
    [
      [c, r],
      [c + 2, r],
      [c + 2, r + 2],
      [c, r + 2]
    ] as [number, number][];
  const doms: [number, number][][] = [];
  const bigs: [number, number][][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c += 2) doms.push(dom(c, r));
  for (let r = 0; r < 4; r += 2) for (let c = 0; c < 6; c += 2) bigs.push(big(c, r));
  return (
    <Frame h={140} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        Ugyanaz a terasz, más járólap
      </text>
      <RectGrid rows={4} cols={6} x={14} y={56} s={s} pal="yellow" outline={2.2} />
      <Pieces polys={doms} x={92} y={56} s={s} pal="orange" inner={1.4} outline={2.2} />
      <Pieces polys={bigs} x={170} y={56} s={s} pal="purple" inner={1.4} outline={2.2} />
      <Pieces polys={[[[0, 0], [1, 0], [1, 1], [0, 1]]]} x={39} y={32} s={s} pal="yellow" inner={1.4} outline={2} />
      <Pieces polys={[dom(0, 0)]} x={112} y={32} s={s} pal="orange" inner={1.4} outline={2} />
      <Pieces polys={[big(0, 0)]} x={190} y={28} s={s} pal="purple" inner={1.4} outline={2} />
      <text x="44" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        24 lap
      </text>
      <text x="122" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        12 lap
      </text>
      <text x="200" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        6 lap
      </text>
      <text x="120" y="132" textAnchor="middle" fontSize="10" fill="#334155">
        Nagyobb lap → kevesebb darab kell
      </text>
    </Frame>
  );
};

/** Ugyanakkora terület, más kerület: 12 kis négyzet háromféleképpen. */
export const RectSame12Svg: React.FC<P> = ({ className }) => {
  const s = 13;
  return (
    <Frame h={150} className={className}>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        Mindegyik 12 kis négyzet
      </text>
      <RectGrid rows={1} cols={12} x={42} y={30} s={s} pal="blue" outline={2} />
      <RectGrid rows={2} cols={6} x={30} y={62} s={s} pal="pink" outline={2} />
      <RectGrid rows={3} cols={4} x={150} y={56} s={s} pal="green" outline={2} />
      <text x="36" y="40" textAnchor="end" fontSize="10" fill="#334155">
        1 · 12
      </text>
      <text x="69" y="102" textAnchor="middle" fontSize="10" fill="#334155">
        2 · 6
      </text>
      <text x="176" y="108" textAnchor="middle" fontSize="10" fill="#334155">
        3 · 4
      </text>
      <text x="120" y="126" textAnchor="middle" fontSize="11" fill={INK}>
        A területük egyenlő. A kerületük nem:
      </text>
      <text x="120" y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
        körben 26, 16 és 14 kis oldal
      </text>
    </Frame>
  );
};

/** Takaró: szélső és belső négyzetek. */
export const RectBorderSvg: React.FC<P> = ({ className }) => {
  const s = 18;
  const x = 66;
  const y = 22;
  return (
    <Frame h={150} className={className}>
      <RectGrid rows={4} cols={6} x={x} y={y} s={s} pal="red" cellFill={(r, c) => (r === 0 || c === 0 || r === 3 || c === 5 ? '#fca5a5' : '#fde047')} />
      <text x="120" y="112" textAnchor="middle" fontSize="12" fill={INK}>
        Összesen: 4 · 6 = 24
      </text>
      <text x="120" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">
        Belül: 2 · 4 = 8
      </text>
      <text x="120" y="144" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">
        A szélén: 24 − 8 = 16
      </text>
    </Frame>
  );
};
