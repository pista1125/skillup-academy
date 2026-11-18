import React from 'react';

const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * 150 × 80-as 2 × 10-es korongrács (Párosítóhoz).
 * Nem ír ki eredményt, csak a piros és kék korongokat mutatja.
 */
export const FrameCard150: React.FC<{ first: number; second: number }> = ({ first, second }) => {
  const cols = 10;
  const stepX = 13;
  const x0 = 9;
  const rowY = [25, 55];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="144" height="68" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1="8" y1="40" x2="142" y2="40" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 3" />
      <line x1={x0 + 5 * stepX} y1="10" x2={x0 + 5 * stepX} y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
      {Array.from({ length: 20 }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = x0 + c * stepX + 6 + (c >= 5 ? 3 : 0);
        const cy = rowY[r];
        const isFirst = i < first;
        const isSecond = i >= first && i < first + second;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5.2"
            fill={isFirst ? '#ef4444' : isSecond ? '#3b82f6' : '#e2e8f0'}
            stroke={isFirst ? '#991b1b' : isSecond ? '#1e3a8a' : '#94a3b8'}
            strokeWidth="1.6"
          />
        );
      })}
    </svg>
  );
};

/**
 * 80 × 80-as „10 + korongok” kártya (Csoportosítóhoz).
 */
export const TenPlusCard80: React.FC<{ ones: number }> = ({ ones }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="6" width="72" height="28" rx="7" fill="#fee2e2" stroke="#b91c1c" strokeWidth="3" />
    <text x="40" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="#991b1b">
      10
    </text>
    {Array.from({ length: ones }, (_, i) => {
      const c = i % 5;
      const r = Math.floor(i / 5);
      return (
        <circle
          key={i}
          cx={12 + c * 14}
          cy={48 + r * 17}
          r="5.5"
          fill="#3b82f6"
          stroke="#1e3a8a"
          strokeWidth="2.5"
        />
      );
    })}
  </svg>
);

/**
 * Ugrás a számegyenesen: start -> +add -> ?
 */
export const JumpCard: React.FC<{ start: number; add: number; small?: boolean }> = ({
  start,
  add,
  small
}) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <line x1="6" y1="58" x2="74" y2="58" stroke="#334155" strokeWidth="3" />
        <path d="M 16 54 Q 40 18 64 50" fill="none" stroke="#2563eb" strokeWidth="3.5" />
        <path d="M 56 49 L 65 52 L 66 42" fill="none" stroke="#2563eb" strokeWidth="3" />
        <text x="40" y="26" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1d4ed8">
          +{add}
        </text>
        <text x="20" y="76" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
          {start}
        </text>
        <text x="64" y="76" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
          ?
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="10" y1="56" x2="140" y2="56" stroke="#334155" strokeWidth="3" />
      <circle cx="32" cy="56" r="4.5" fill="#0f172a" />
      <circle cx="118" cy="56" r="4.5" fill="#dc2626" />
      <path d="M 32 50 Q 75 10 115 48" fill="none" stroke="#2563eb" strokeWidth="3.5" />
      <path d="M 107 47 L 117 49 L 116 39" fill="none" stroke="#2563eb" strokeWidth="3" />
      <text x="75" y="25" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1d4ed8">
        +{add}
      </text>
      <text x="32" y="76" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
        {start}
      </text>
      <text x="118" y="76" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};

/**
 * Mini számpiramis: két alsó tégla + egy felső tégla (valamelyik '?').
 */
export const PyramidCard: React.FC<{
  left: string;
  right: string;
  top?: string;
  small?: boolean;
}> = ({ left, right, top = '?', small }) => {
  const W = small ? 80 : 150;
  const bw = small ? 36 : 56;
  const bh = 32;
  const xL = W / 2 - bw - 1;
  const xR = W / 2 + 1;
  const xT = W / 2 - bw / 2;
  const draw = (x: number, y: number, txt: string) => {
    const isQ = txt === '?';
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={bw}
          height={bh}
          rx="5"
          fill={isQ ? '#fee2e2' : '#fef3c7'}
          stroke={isQ ? '#dc2626' : '#b45309'}
          strokeWidth="3"
        />
        <text
          x={x + bw / 2}
          y={y + 24}
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill={isQ ? '#dc2626' : '#0f172a'}
        >
          {txt}
        </text>
      </g>
    );
  };
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {draw(xT, 6, top)}
      {draw(xL, 42, left)}
      {draw(xR, 42, right)}
    </svg>
  );
};

/**
 * Dobókockák (2 vagy 3 db) 80 × 80-as kártyán.
 */
const PIP_POS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.26, 0.26], [0.5, 0.5], [0.74, 0.74]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.26, 0.26], [0.74, 0.26], [0.5, 0.5], [0.26, 0.74], [0.74, 0.74]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]]
};

export const DiceCard80: React.FC<{ values: number[] }> = ({ values }) => {
  const two = values.length === 2;
  const s = two ? 34 : 30;
  const coords: [number, number][] = two
    ? [[4, 23], [42, 23]]
    : [[6, 6], [44, 6], [25, 43]];
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {values.slice(0, 3).map((v, i) => {
        const [x, y] = coords[i];
        const pips = PIP_POS[v] ?? [];
        return (
          <g key={i}>
            <rect x={x} y={y} width={s} height={s} rx="6" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            {pips.map(([px, py], j) => (
              <circle key={j} cx={x + px * s} cy={y + py * s} r={two ? 3.4 : 2.9} fill="#0f172a" />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Mérleg-kártya 150 × 80-as Párosítóhoz (pl. 11+5 | 12+?).
 */
export const BalanceCard150: React.FC<{ leftExpr: string; rightExpr: string }> = ({
  leftExpr,
  rightExpr
}) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <polygon points="75,48 64,74 86,74" fill="#475569" />
    <line x1="18" y1="48" x2="132" y2="48" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
    <rect x="4" y="10" width="64" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
    <text x="36" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e3a8a">
      {leftExpr}
    </text>
    <rect x="82" y="10" width="64" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="3" />
    <text x="114" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#b91c1c">
      {rightExpr}
    </text>
  </svg>
);
