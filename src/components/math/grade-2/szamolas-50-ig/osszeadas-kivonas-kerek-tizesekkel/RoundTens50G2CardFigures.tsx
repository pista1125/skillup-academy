import React from 'react';
import { RT_FONT, RT_UNK, ROD_BLUE, RodsPart, CoinPart, NumLine50Part, rodsWidth } from './RoundTens50G2Parts';

// Kártyaképek: Párosító ≈ 150 × 80, Csoportosító 80 × 80. Nem írják ki az eredményt.

const Card: React.FC<{ w: number; h?: number; children?: React.ReactNode }> = ({ w, h = 80, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
    <rect x="3" y="3" width={w - 6} height={h - 6} rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Kockák: a + b vagy a − b (áthúzott kockák) – „kistesó” művelet képe. */
export const CubesCard150: React.FC<{ a: number; b: number; op: '+' | '−' }> = ({ a, b, op }) => {
  const s = 14;
  const gap = 4;
  if (op === '+') {
    const total = a + b;
    const width = total * (s + gap) + 22;
    const x0 = (150 - width) / 2;
    return (
      <Card w={150}>
        {Array.from({ length: a }, (_, i) => (
          <rect key={`a${i}`} x={x0 + i * (s + gap)} y={33} width={s} height={s} rx="2" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />
        ))}
        <text x={x0 + a * (s + gap) + 6} y={46} fontSize="18" fontWeight="900" fill="#0f172a">+</text>
        {Array.from({ length: b }, (_, i) => (
          <rect key={`b${i}`} x={x0 + a * (s + gap) + 22 + i * (s + gap)} y={33} width={s} height={s} rx="2" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" />
        ))}
      </Card>
    );
  }
  const width = a * (s + gap) - gap;
  const x0 = (150 - width) / 2;
  return (
    <Card w={150}>
      {Array.from({ length: a }, (_, i) => {
        const x = x0 + i * (s + gap);
        const crossed = i >= a - b;
        return (
          <g key={i} opacity={crossed ? 0.6 : 1}>
            <rect x={x} y={33} width={s} height={s} rx="2" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />
            {crossed && <line x1={x - 3} y1={50} x2={x + s + 3} y2={30} stroke={RT_UNK} strokeWidth="3" strokeLinecap="round" />}
          </g>
        );
      })}
    </Card>
  );
};

/**
 * Tízesrudak + egyeskockák. `add` = kék (hozzáadott) rudak száma, `cross` = áthúzott rudak száma.
 */
export const RodsCard: React.FC<{ tens: number; ones?: number; add?: number; cross?: number; small?: boolean }> = ({
  tens,
  ones = 0,
  add = 0,
  cross = 0,
  small
}) => {
  const w = small ? 80 : 150;
  const groups = add > 0 ? [{ count: tens }, { count: add, ...ROD_BLUE }] : [{ count: tens }];
  const gg = small ? 5 : 10;
  const maxW = w - 14;
  let cell = small ? 5.2 : 5.8;
  while (cell > 2.6 && rodsWidth(groups, ones, cell, gg) > maxW) cell -= 0.2;
  const rw = rodsWidth(groups, ones, cell, gg);
  return (
    <Card w={w}>
      <RodsPart x={(w - rw) / 2} y={(80 - cell * 10) / 2} cell={cell} groups={groups} ones={ones} crossed={cross} groupGap={gg} />
    </Card>
  );
};

/** Érmék sora (10, 20, 50 Ft vagy „?”). */
export const CoinsCard: React.FC<{ coins: (number | '?')[]; small?: boolean; total?: number }> = ({ coins, small, total }) => {
  const w = small ? 80 : 150;
  if (small) {
    const r = coins.length > 2 ? 14 : 17;
    const pos =
      coins.length <= 2
        ? coins.map((_, i) => ({ x: coins.length === 1 ? 40 : 22 + i * 36, y: 40 }))
        : coins.map((_, i) => ({ x: 22 + (i % 2) * 36, y: 24 + Math.floor(i / 2) * 32 }));
    return (
      <Card w={w}>
        {coins.map((c, i) => (
          <CoinPart key={i} cx={pos[i].x} cy={pos[i].y} value={c} r={r} />
        ))}
      </Card>
    );
  }
  if (total !== undefined) {
    return (
      <Card w={w}>
        {coins.map((c, i) => (
          <CoinPart key={i} cx={20 + i * 30} cy={40} value={c} r={13} />
        ))}
        <text x="144" y="46" textAnchor="end" fontSize="14" fontWeight="900" fill="#0f172a">
          = {total} Ft
        </text>
      </Card>
    );
  }
  const r = 17;
  const step = 37;
  const x0 = 75 - ((coins.length - 1) * step) / 2;
  return (
    <Card w={w}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} r={r} />
      ))}
    </Card>
  );
};

/** Számegyenes-részlet tízes ugrásokkal: start, `count` darab ±10-es ugrás, a cél „?”. */
export const JumpTensCard: React.FC<{ start: number; count: number; dir: '+' | '−'; small?: boolean }> = ({
  start,
  count,
  dir,
  small
}) => {
  const end = dir === '+' ? start + 10 * count : start - 10 * count;
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  const from = Math.floor(lo / 10) * 10;
  const to = Math.ceil(hi / 10) * 10;
  const w = small ? 80 : 150;
  const jumps = Array.from({ length: count }, (_, i) => {
    const a = dir === '+' ? start + 10 * i : start - 10 * i;
    const b = dir === '+' ? a + 10 : a - 10;
    return { from: a, to: b, label: small ? undefined : dir === '+' ? '+10' : '−10' };
  });
  return (
    <Card w={w}>
      <NumLine50Part x0={12} x1={w - 18} y={52} from={from} to={to} jumps={jumps} minorTicks={false} hideLabels />
      <text x={12 + ((start - from) * (w - 30)) / (to - from)} y={73} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="900" fill="#1d4ed8">
        {start}
      </text>
      <text x={12 + ((end - from) * (w - 30)) / (to - from)} y={73} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill={RT_UNK}>
        ?
      </text>
    </Card>
  );
};

/** Ugrás a számegyenesen két ismert pont között, az ugrás nagysága „?”. */
export const JumpGapCard80: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <Card w={80}>
    <line x1="10" y1="52" x2="70" y2="52" stroke="#334155" strokeWidth="3" />
    <circle cx="16" cy="52" r="4" fill="#2563eb" />
    <circle cx="64" cy="52" r="4" fill="#166534" />
    <path d="M16 48 Q40 14 64 48" fill="none" stroke="#2563eb" strokeWidth="3" />
    <text x="40" y="30" textAnchor="middle" fontSize="15" fontWeight="900" fill={RT_UNK}>
      ?
    </text>
    <text x="16" y="72" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
      {from}
    </text>
    <text x="64" y="72" textAnchor="middle" fontSize="13" fontWeight="900" fill="#166534">
      {to}
    </text>
  </Card>
);
