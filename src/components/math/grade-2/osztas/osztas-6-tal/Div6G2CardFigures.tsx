import React from 'react';
import { DIV6_COLORS, DIV6_FONT, BOX_COLORS, EggBoxPart, PlatePart } from './Div6G2Parts';

// ---------------------------------------------------------------------------
// 5. Osztás 6-tal – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const Frame: React.FC<{ W: number; fill: string; children: React.ReactNode }> = ({ W, fill, children }) => (
  <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

const Egg: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <ellipse cx={cx} cy={cy} rx={r * 0.85} ry={r} fill="#fffbeb" stroke="#78350f" strokeWidth="1.5" />
);

/** Laza tojások (dobozolás előtt), max. 30. */
export const LooseCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const W = small ? 80 : 150;
  const perRow = small ? 6 : 10;
  const rows = Math.ceil(n / perRow);
  const step = Math.min((W - 16) / perRow, 64 / rows);
  const r = step * 0.38;
  const x0 = (W - (Math.min(n, perRow) - 1) * step) / 2;
  const y0 = (80 - (rows - 1) * step) / 2;
  return (
    <Frame W={W} fill="#fefce8">
      {Array.from({ length: n }, (_, i) => (
        <Egg key={i} cx={x0 + (i % perRow) * step} cy={y0 + Math.floor(i / perRow) * step} r={r} />
      ))}
    </Frame>
  );
};

/** Megtelt dobozok + kint maradt tojások. */
export const PackedCard: React.FC<{ boxes: number; rest?: number; small?: boolean }> = ({ boxes, rest = 0, small }) => {
  const W = small ? 80 : 150;
  const restW = rest > 0 ? (small ? 22 : 30) : 0;
  const perRow = small ? (boxes > 4 ? 3 : 2) : Math.min(boxes, 5);
  const rows = Math.ceil(boxes / perRow);
  const gap = 4;
  const w = Math.min((W - 14 - restW - (perRow - 1) * gap) / perRow, (66 - (rows - 1) * gap) / rows / 0.66, 40);
  const h = w * 0.66;
  const rowW = perRow * (w + gap) - gap;
  const totalW = rowW + restW;
  const x0 = (W - totalW) / 2;
  const y0 = (80 - (rows * h + (rows - 1) * gap)) / 2;
  const er = small ? 4 : 5.5;
  return (
    <Frame W={W} fill="#fffbeb">
      {Array.from({ length: boxes }, (_, i) => (
        <EggBoxPart key={i} x={x0 + (i % perRow) * (w + gap)} y={y0 + Math.floor(i / perRow) * (h + gap)} w={w} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
      {rest > 0 &&
        Array.from({ length: rest }, (_, i) => (
          <Egg key={`r${i}`} cx={x0 + rowW + restW / 2 + ((i % 2) - 0.5) * er * 2.2} cy={40 + (Math.floor(i / 2) - (Math.ceil(rest / 2) - 1) / 2) * er * 2.4} r={er} />
        ))}
    </Frame>
  );
};

/** 6 tányér, mindegyiken `each` süti; `q` = „?” a tányérokon. */
export const PlatesCard: React.FC<{ each?: number; q?: boolean; total?: number; small?: boolean }> = ({ each = 0, q, total, small }) => {
  const W = small ? 80 : 150;
  const r = small ? 11.5 : 16;
  const dx = small ? 25 : 34;
  const x0 = total !== undefined && !small ? 28 : W / 2 - dx;
  return (
    <Frame W={W} fill="#f0f9ff">
      {Array.from({ length: 6 }, (_, i) => (
        <PlatePart key={i} cx={x0 + (i % 3) * dx} cy={small ? 28 + Math.floor(i / 3) * 26 : 26 + Math.floor(i / 3) * 30} r={r} items={each} q={q} />
      ))}
      {total !== undefined && (
        <text x={small ? W / 2 : 130} y={small ? 76 : 48} textAnchor="middle" fontSize={small ? 10 : 18} fontWeight="900" fill="#0c4a6e">
          {total}
        </text>
      )}
    </Frame>
  );
};

/** Hatos ugrások a 0–60 számegyenesen. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string }> = ({ jumps, small, endLabel }) => {
  const W = small ? 80 : 150;
  const x0 = 8;
  const unit = (W - 18) / 60;
  const y = 52;
  const X = (v: number) => x0 + v * unit;
  return (
    <Frame W={W} fill="#faf5ff">
      <line x1={X(0)} y1={y} x2={X(60) + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(i * 6)} y1={y - 4} x2={X(i * 6)} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      {Array.from({ length: jumps }, (_, j) => {
        const a = X(j * 6);
        const b = X(j * 6 + 6);
        return <path key={j} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - (small ? 18 : 24)} ${b} ${y - 2}`} fill="none" stroke={DIV6_COLORS[j % DIV6_COLORS.length]} strokeWidth="3" />;
      })}
      <circle cx={X(0)} cy={y} r="3.5" fill="#0f172a" />
      <circle cx={X(jumps * 6)} cy={y} r="4.5" fill="#dc2626" />
      <text x={X(0)} y={y + 20} textAnchor="middle" fontSize="13" fontWeight="900" fill="#475569">0</text>
      {endLabel && (
        <text x={Math.min(X(jumps * 6), W - 16)} y={y + 20} textAnchor="middle" fontSize="15" fontWeight="900" fill="#dc2626">
          {endLabel}
        </text>
      )}
    </Frame>
  );
};

/** Nyíl a „hatoda” felirattal: nagy → kicsi. */
export const SixthCard: React.FC<{ big: string; small: string; mini?: boolean }> = ({ big, small, mini }) => {
  const W = mini ? 80 : 150;
  const bw = mini ? 28 : 38;
  const xa = 8;
  const xb = W - 8 - bw;
  const box = (x: number, t: string) => (
    <g>
      <rect x={x} y={36} width={bw} height="30" rx="7" fill={t === '?' ? '#fee2e2' : '#fff'} stroke={t === '?' ? '#dc2626' : '#be123c'} strokeWidth="2.5" />
      <text x={x + bw / 2} y={57} textAnchor="middle" fontSize={mini ? 15 : 18} fontWeight="900" fill={t === '?' ? '#dc2626' : '#0f172a'}>
        {t}
      </text>
    </g>
  );
  return (
    <Frame W={W} fill="#fff1f2">
      {box(xa, big)}
      {box(xb, small)}
      <path d={`M ${xa + bw / 2} 34 Q ${W / 2} 6 ${xb + bw / 2} 34`} fill="none" stroke="#dc2626" strokeWidth="2.6" />
      <path d={`M ${xb + bw / 2 - 8} 30 L ${xb + bw / 2} 34 L ${xb + bw / 2 - 3} 25`} fill="none" stroke="#dc2626" strokeWidth="2.6" />
      <text x={W / 2} y={mini ? 30 : 26} textAnchor="middle" fontSize={mini ? 10 : 13} fontWeight="900" fill="#b91c1c">
        hatoda
      </text>
    </Frame>
  );
};
