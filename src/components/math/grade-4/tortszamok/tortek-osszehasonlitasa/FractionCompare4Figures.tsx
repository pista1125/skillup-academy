import React from 'react';

// ---------------------------------------------------------------------------
// A törtrészek nevei – a tankönyv szavaival („1 harmad”, „3 negyed”, „fele”)
// A 4. osztályos tankönyv nem használ számlálót, nevezőt és törtvonalat:
// a törteket szóval írja (1 ketted, 2 harmad, 3 negyed, 4 tized).
// ---------------------------------------------------------------------------
export const PART_NAMES: Record<number, string> = {
  2: 'ketted',
  3: 'harmad',
  4: 'negyed',
  5: 'ötöd',
  6: 'hatod',
  8: 'nyolcad',
  10: 'tized',
  12: 'tizenketted',
  100: 'század'
};

/** Birtokos alak: „a pizza 1 harmada”, „a méter 3 negyede”. */
export const PART_OF: Record<number, string> = {
  2: 'kettede',
  3: 'harmada',
  4: 'negyede',
  5: 'ötöde',
  6: 'hatoda',
  8: 'nyolcada',
  10: 'tizede',
  12: 'tizenkettede',
  100: 'százada'
};

/** „3 negyed” */
export const fw = (n: number, d: number): string => `${n} ${PART_NAMES[d] ?? `${d}-ed`}`;
/** „3 negyede” */
export const fwOf = (n: number, d: number): string => `${n} ${PART_OF[d] ?? `${d}-ede`}`;

/** Két tört összehasonlítása (n1 d1-ed ? n2 d2-ed): '<', '=' vagy '>'. Egész számokkal, kerekítés nélkül. */
export const compareFractions = (n1: number, d1: number, n2: number, d2: number): '<' | '=' | '>' => {
  const a = n1 * d2;
  const b = n2 * d1;
  return a < b ? '<' : a > b ? '>' : '=';
};

// ---------------------------------------------------------------------------
// Újrahasznosítható SVG-elemek
// ---------------------------------------------------------------------------
const slicePath = (cx: number, cy: number, r: number, i: number, n: number): string => {
  const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
};

export interface PieProps {
  cx: number;
  cy: number;
  r: number;
  parts: number;
  /** ennyi szelet színes (az elsőtől, az óramutató járásával) */
  filled: number;
  color?: string;
  empty?: string;
  /** csak a színes szeleteket rajzolja (szelet a tányéron) */
  onlyFilled?: boolean;
  /** pizzás díszítés (szalámi pöttyök) */
  pizza?: boolean;
}

/** Kör (pizza, torta) egyenlő részekre vágva. */
export const PieG: React.FC<PieProps> = ({ cx, cy, r, parts, filled, color = '#fb923c', empty = '#fff7ed', onlyFilled = false, pizza = false }) => {
  const dots: React.ReactNode[] = [];
  if (pizza) {
    for (let i = 0; i < Math.min(filled, parts); i++) {
      const mid = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / parts;
      [0.45, 0.72].forEach((k, j) => {
        dots.push(
          <circle key={`d${i}-${j}`} cx={cx + r * k * Math.cos(mid + (j ? 0.12 : -0.1))} cy={cy + r * k * Math.sin(mid + (j ? 0.12 : -0.1))} r={r * 0.07} fill="#dc2626" opacity={0.85} />
        );
      });
    }
  }
  if (parts <= 1) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill={filled >= 1 ? color : empty} stroke="#9a3412" strokeWidth={2} />
        {dots}
      </g>
    );
  }
  return (
    <g>
      {!onlyFilled && <circle cx={cx} cy={cy} r={r} fill={empty} stroke="#cbd5e1" strokeWidth={1.5} />}
      {Array.from({ length: parts }, (_, i) => {
        const on = i < filled;
        if (onlyFilled && !on) return null;
        return <path key={i} d={slicePath(cx, cy, r, i, parts)} fill={on ? color : empty} stroke={on ? '#9a3412' : '#94a3b8'} strokeWidth={1.5} strokeLinejoin="round" />;
      })}
      {dots}
    </g>
  );
};

export interface BarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  parts: number;
  filled: number;
  color?: string;
  empty?: string;
  stroke?: string;
}

/** Téglalap alakú csík (csokitábla, mérőszalag) egyenlő részekre osztva. */
export const BarG: React.FC<BarProps> = ({ x, y, w, h, parts, filled, color = '#3b82f6', empty = '#ffffff', stroke = '#334155' }) => {
  const cw = w / parts;
  return (
    <g>
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={x + i * cw} y={y} width={cw} height={h} fill={i < filled ? color : empty} stroke={stroke} strokeWidth={1.5} />
      ))}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={stroke} strokeWidth={2.2} rx={2} />
    </g>
  );
};

/** Kis zászló a pálya fölött. */
export const FlagG: React.FC<{ x: number; y: number; color: string; label?: string; labelY?: number }> = ({ x, y, color, label, labelY }) => (
  <g>
    <line x1={x} y1={y} x2={x} y2={y - 30} stroke="#334155" strokeWidth={2} />
    <path d={`M ${x} ${y - 30} L ${x + 16} ${y - 24} L ${x} ${y - 18} Z`} fill={color} stroke="#334155" strokeWidth={1} />
    {label && (
      <text x={x} y={labelY ?? y - 36} fontSize={11} fontWeight="bold" textAnchor="middle" fill="#0f172a">
        {label}
      </text>
    )}
  </g>
);

const Frame: React.FC<{ vb: string; className?: string; children: React.ReactNode }> = ({ vb, className, children }) => (
  <svg viewBox={vb} className={className ?? 'w-full h-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// 1. MF II/66, 1. b): 1-1 pizzaszelet a tányéron – melyik a nagyobb?
// ---------------------------------------------------------------------------
export const PizzaSlicesCompareSvg: React.FC<{ className?: string }> = ({ className }) => {
  const parts = [2, 3, 4, 5, 6];
  return (
    <Frame vb="0 0 520 170" className={className}>
      <rect x="1" y="1" width="518" height="168" rx="14" fill="#fffbeb" stroke="#fcd34d" />
      <text x="260" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#92400e">
        Mindegyik tányéron 1 szelet ugyanakkora pizzából
      </text>
      {parts.map((p, i) => {
        const cx = 56 + i * 102;
        return (
          <g key={p}>
            <circle cx={cx} cy={88} r={44} fill="#ffffff" stroke="#cbd5e1" strokeWidth={2} />
            <circle cx={cx} cy={88} r={36} fill="none" stroke="#e2e8f0" strokeWidth={1} />
            <PieG cx={cx} cy={88} r={36} parts={p} filled={1} onlyFilled pizza />
            <text x={cx} y={154} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#9a3412">
              {fw(1, p)}
            </text>
            {i < parts.length - 1 && (
              <text x={cx + 51} y={95} fontSize="24" fontWeight="bold" textAnchor="middle" fill="#dc2626">
                &gt;
              </text>
            )}
          </g>
        );
      })}
    </Frame>
  );
};

// ---------------------------------------------------------------------------
// 2. Ugyanolyan részek: 1 negyed < 2 negyed < 3 negyed < 4 negyed = 1 egész
// ---------------------------------------------------------------------------
export const QuarterBarsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 420 210" className={className}>
    <rect x="1" y="1" width="418" height="208" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="210" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
      Negyed részek: minél több részt színezünk, annál több
    </text>
    {[1, 2, 3, 4].map((n, i) => (
      <g key={n}>
        <BarG x={30} y={38 + i * 42} w={240} h={28} parts={4} filled={n} color="#3b82f6" />
        <text x={285} y={57 + i * 42} fontSize="15" fontWeight="bold" fill="#1e40af">
          {n === 4 ? '4 negyed = 1 egész' : fw(n, 4)}
        </text>
      </g>
    ))}
  </Frame>
);

// ---------------------------------------------------------------------------
// 3. Törtfal: 1 egész, ketted, harmad, negyed, ötöd, hatod, nyolcad, tized
// ---------------------------------------------------------------------------
export const FractionWallSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows: { p: number; c: string }[] = [
    { p: 1, c: '#ef4444' },
    { p: 2, c: '#f97316' },
    { p: 3, c: '#eab308' },
    { p: 4, c: '#22c55e' },
    { p: 5, c: '#14b8a6' },
    { p: 6, c: '#3b82f6' },
    { p: 8, c: '#8b5cf6' },
    { p: 10, c: '#ec4899' }
  ];
  return (
    <Frame vb="0 0 460 300" className={className}>
      <rect x="1" y="1" width="458" height="298" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="230" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#334155">
        Törtfal: ugyanakkora csíkok, egyre több részre vágva
      </text>
      {rows.map((r, i) => {
        const y = 36 + i * 32;
        return (
          <g key={r.p}>
            <text x={78} y={y + 18} fontSize="13" fontWeight="bold" textAnchor="end" fill="#334155">
              {r.p === 1 ? '1 egész' : fw(1, r.p)}
            </text>
            <BarG x={88} y={y} w={350} h={26} parts={r.p} filled={1} color={r.c} empty="#ffffff" />
          </g>
        );
      })}
    </Frame>
  );
};

// ---------------------------------------------------------------------------
// 4. MF II/83, 8. feladat: 1 ketted = 2 negyed = 4 nyolcad (+ 5 tized)
// ---------------------------------------------------------------------------
export const EqualHalvesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 420 220" className={className}>
    <rect x="1" y="1" width="418" height="218" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    {[
      { p: 2, n: 1 },
      { p: 4, n: 2 },
      { p: 8, n: 4 }
    ].map((c, i) => {
      const cx = 70 + i * 140;
      return (
        <g key={c.p}>
          <PieG cx={cx} cy={70} r={46} parts={c.p} filled={c.n} color="#22c55e" empty="#ffffff" />
          <text x={cx} y={136} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#166534">
            {fw(c.n, c.p)}
          </text>
          {i < 2 && (
            <text x={cx + 70} y={78} fontSize="26" fontWeight="bold" textAnchor="middle" fill="#15803d">
              =
            </text>
          )}
        </g>
      );
    })}
    <BarG x={60} y={160} w={300} h={26} parts={10} filled={5} color="#22c55e" />
    <text x={210} y={208} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#166534">
      5 tized is pont a fele: 1 ketted = 5 tized
    </text>
  </Frame>
);

// ---------------------------------------------------------------------------
// 5. MF II/70, 15. feladat: zászlók az 1 km-es versenypályán
// ---------------------------------------------------------------------------
export const TRACK_FLAGS: { n: number; d: number; m: number; color: string }[] = [
  { n: 1, d: 10, m: 100, color: '#f59e0b' },
  { n: 1, d: 5, m: 200, color: '#ef4444' },
  { n: 1, d: 4, m: 250, color: '#d946ef' },
  { n: 3, d: 10, m: 300, color: '#3b82f6' },
  { n: 3, d: 5, m: 600, color: '#22c55e' },
  { n: 3, d: 4, m: 750, color: '#78716c' },
  { n: 4, d: 5, m: 800, color: '#b91c1c' }
];

export const KmTrackSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 30;
  const x1 = 490;
  const y = 130;
  const X = (m: number) => x0 + ((x1 - x0) * m) / 1000;
  return (
    <Frame vb="0 0 520 190" className={className}>
      <rect x="1" y="1" width="518" height="188" rx="14" fill="#fefce8" stroke="#fde68a" />
      <line x1={x0} y1={y} x2={x1 + 14} y2={y} stroke="#334155" strokeWidth={2.5} />
      <path d={`M ${x1 + 14} ${y - 5} L ${x1 + 22} ${y} L ${x1 + 14} ${y + 5} Z`} fill="#334155" />
      {Array.from({ length: 21 }, (_, i) => (
        <line key={i} x1={X(i * 50)} y1={y - (i % 2 === 0 ? 7 : 4)} x2={X(i * 50)} y2={y + (i % 2 === 0 ? 7 : 4)} stroke="#334155" strokeWidth={i % 10 === 0 ? 2.5 : 1.5} />
      ))}
      {[0, 200, 400, 600, 800].map((m) => (
        <text key={m} x={X(m)} y={y + 24} fontSize="12" textAnchor="middle" fill="#334155">
          {m} m
        </text>
      ))}
      <text x={X(1000)} y={y + 24} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
        1 km
      </text>
      <text x={X(0)} y={y + 42} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#15803d">
        RAJT
      </text>
      <text x={X(1000)} y={y + 42} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
        CÉL
      </text>
      {TRACK_FLAGS.map((f, i) => (
        <FlagG key={i} x={X(f.m)} y={y - 8} color={f.color} label={`${fw(f.n, f.d)}`} labelY={i % 2 === 0 ? y - 46 : y - 62} />
      ))}
    </Frame>
  );
};

// ---------------------------------------------------------------------------
// 6. MF II/69, 11. feladat: ugróverseny a 2 m-es pályán
// ---------------------------------------------------------------------------
export const JUMPERS: { name: string; n: number; d: number; cm: number; color: string }[] = [
  { name: 'mókus', n: 3, d: 4, cm: 150, color: '#f97316' },
  { name: 'béka', n: 4, d: 10, cm: 80, color: '#22c55e' },
  { name: 'nyúl', n: 4, d: 5, cm: 160, color: '#a855f7' }
];

export const JumpContestSvg: React.FC<{ className?: string; showCm?: boolean }> = ({ className, showCm = true }) => (
  <Frame vb="0 0 460 210" className={className}>
    <rect x="1" y="1" width="458" height="208" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="230" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#6b21a8">
      Ugróverseny: a pálya 2 m = 200 cm
    </text>
    {JUMPERS.map((j, i) => {
      const y = 40 + i * 54;
      return (
        <g key={j.name}>
          <text x={14} y={y + 12} fontSize="13" fontWeight="bold" fill="#334155">
            {j.name}: a táv {fwOf(j.n, j.d)}
          </text>
          <BarG x={14} y={y + 18} w={340} h={20} parts={j.d} filled={j.n} color={j.color} />
          <text x={370} y={y + 33} fontSize="14" fontWeight="bold" fill={showCm ? '#0f172a' : '#dc2626'}>
            {showCm ? `${j.cm} cm` : '? cm'}
          </text>
        </g>
      );
    })}
  </Frame>
);

/** Szám + -val/-vel rag kiejtés szerint („4-gyel”, „10-zel”, „3-mal”). */
export const vel = (k: number): string => {
  const ones: Record<number, string> = { 1: 'gyel', 2: 'vel', 3: 'mal', 4: 'gyel', 5: 'tel', 6: 'tal', 7: 'tel', 8: 'cal', 9: 'cel' };
  const tens: Record<number, string> = { 1: 'zel', 2: 'szal', 3: 'cal', 4: 'nel', 5: 'nel', 6: 'nal', 7: 'nel', 8: 'nal', 9: 'nel' };
  if (k % 10 !== 0) return `${k}-${ones[k % 10]}`;
  if (k % 100 !== 0) return `${k}-${tens[(k / 10) % 10]}`;
  if (k % 1000 !== 0) return `${k}-zal`;
  return `${k}-rel`;
};

/** Szám + -nak/-nek rag kiejtés szerint („12-nek”, „300-nak”, „4000-nek”). */
export const nak = (k: number): string => {
  const ones: Record<number, string> = { 1: 'nek', 2: 'nek', 3: 'nak', 4: 'nek', 5: 'nek', 6: 'nak', 7: 'nek', 8: 'nak', 9: 'nek' };
  const tens: Record<number, string> = { 1: 'nek', 2: 'nak', 3: 'nak', 4: 'nek', 5: 'nek', 6: 'nak', 7: 'nek', 8: 'nak', 9: 'nek' };
  if (k % 10 !== 0) return `${k}-${ones[k % 10]}`;
  if (k % 100 !== 0) return `${k}-${tens[(k / 10) % 10]}`;
  if (k % 1000 !== 0) return `${k}-nak`;
  return `${k}-nek`;
};

/** Névelő szám előtt: „az 1 harmada”, „az 5 ötöde”, de „a 3 negyede”. */
export const az = (k: number): string => (k === 1 || (k >= 1000 && k < 2000) || String(k).startsWith('5') ? 'az' : 'a');
