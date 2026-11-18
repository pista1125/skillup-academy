import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// Szabály: vastag vonalak (>= 3), nagy számok (>= 22), nincs ráírva a válasz!
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/** Két csoport korong + jellel elválasztva (összeadás 0–10). */
export const DiscAddCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const r = small ? 4.2 : 6.5;
  const colsA = a <= 2 ? a : a <= 4 ? 2 : 3;
  const colsB = b <= 2 ? Math.max(b, 1) : b <= 4 ? 2 : 3;
  const step = small ? 9.8 : 16;

  const renderDots = (count: number, cx0: number, cols: number, fill: string, stroke: string) => {
    const rows = Math.ceil(count / cols);
    const topY = H / 2 - ((rows - 1) * step) / 2;
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const inThisRow = row === rows - 1 ? count - row * cols : cols;
      const x = cx0 + (col - (inThisRow - 1) / 2) * step;
      const y = topY + row * step;
      return <circle key={i} cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth="2.2" />;
    });
  };

  const leftCx = small ? 18 : 40;
  const midCx = small ? 40 : 75;
  const rightCx = small ? 62 : 110;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {a > 0 ? (
        renderDots(a, leftCx, colsA, '#ef4444', '#991b1b')
      ) : (
        <rect
          x={leftCx - 8}
          y={H / 2 - 8}
          width="16"
          height="16"
          rx="4"
          fill="none"
          stroke="#64748b"
          strokeWidth="2.5"
          strokeDasharray="3 2"
        />
      )}
      <text x={midCx} y={H / 2 + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
        +
      </text>
      {b > 0 ? (
        renderDots(b, rightCx, colsB, '#3b82f6', '#1e3a8a')
      ) : (
        <rect
          x={rightCx - 8}
          y={H / 2 - 8}
          width="16"
          height="16"
          rx="4"
          fill="none"
          stroke="#64748b"
          strokeWidth="2.5"
          strokeDasharray="3 2"
        />
      )}
    </svg>
  );
};

/** 2×5-ös tízes keret kártya: `a` db zöld korong, a többi üres vagy piros `?` (10-es pótláshoz). */
export const TenFrameCard: React.FC<{
  a: number;
  b?: number;
  askMissing?: boolean;
  small?: boolean;
}> = ({ a, b = 0, askMissing = false, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const cell = small ? 13 : 24;
  const gx = (W - cell * 5) / 2;
  const gy = (H - cell * 2) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={gx} y={gy} width={cell * 5} height={cell * 2} rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
      {Array.from({ length: 10 }, (_, i) => {
        const r = Math.floor(i / 5);
        const c = i % 5;
        const x = gx + c * cell;
        const y = gy + r * cell;
        const cx = x + cell / 2;
        const cy = y + cell / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={cell} height={cell} fill="none" stroke="#64748b" strokeWidth="1.5" />
            {i < a && (
              <circle cx={cx} cy={cy} r={cell * 0.34} fill="#16a34a" stroke="#14532d" strokeWidth="2" />
            )}
            {i >= a && i < a + b && (
              <circle cx={cx} cy={cy} r={cell * 0.34} fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
            )}
            {askMissing && i >= a + b && (
              <text
                x={cx}
                y={cy + (small ? 4 : 7)}
                textAnchor="middle"
                fontSize={small ? 11 : 18}
                fontWeight="bold"
                fill="#dc2626"
              >
                ?
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Két dobókocka (1..6 pötty, összeg <= 10). */
const PIP_POS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]],
};

export const DicePairCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const s = small ? 30 : 44;
  const gap = small ? 8 : 18;
  const x1 = (W - (2 * s + gap)) / 2;
  const x2 = x1 + s + gap;
  const y = (H - s) / 2;
  const pr = small ? 2.8 : 4;

  const drawDie = (x: number, val: number, fill: string) => (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={small ? 6 : 8} fill={fill} stroke="#1e293b" strokeWidth="3" />
      {(PIP_POS[val] || []).map(([px, py], idx) => (
        <circle key={idx} cx={x + px * s} cy={y + py * s} r={pr} fill="#0f172a" />
      ))}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {drawDie(x1, a, '#fef9c3')}
      {drawDie(x2, b, '#e0f2fe')}
    </svg>
  );
};

/** Számegyenes-ugrás mini kártya (150 × 80): `start` + `jump` -> `?` */
export const JumpLineCard: React.FC<{ start: number; jump: number }> = ({ start, jump }) => {
  const x0 = 16;
  const x1 = 134;
  const X = (v: number) => x0 + ((x1 - x0) * v) / 10;
  const y = 52;
  const end = start + jump;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 4} y1={y} x2={x1 + 6} y2={y} stroke="#1e293b" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, v) => (
        <line
          key={v}
          x1={X(v)}
          y1={v % 5 === 0 ? y - 6 : y - 4}
          x2={X(v)}
          y2={v % 5 === 0 ? y + 6 : y + 4}
          stroke="#1e293b"
          strokeWidth={v % 5 === 0 ? 2.5 : 1.5}
        />
      ))}
      <circle cx={X(start)} cy={y} r="4.5" fill="#2563eb" />
      <text x={X(start)} y={y + 20} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2563eb">
        {start}
      </text>
      <path
        d={`M ${X(start)} ${y - 6} Q ${(X(start) + X(end)) / 2} 14 ${X(end)} ${y - 8}`}
        fill="none"
        stroke="#16a34a"
        strokeWidth="3"
      />
      <text
        x={(X(start) + X(end)) / 2}
        y="22"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="#15803d"
      >
        +{jump}
      </text>
      <circle cx={X(end)} cy={y} r="4.5" fill="#dc2626" />
      <text x={X(end)} y={y + 20} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};

/** Számbontás kártya (80 × 80 vagy 150 × 80): felül az összeg, alul az egyik tag és „?”. */
export const NumberBondCard: React.FC<{ total: number; part: number; small?: boolean }> = ({
  total,
  part,
  small,
}) => {
  const W = small ? 80 : 150;
  const H = 80;
  const cx = W / 2;
  const lx = small ? 21 : 46;
  const rx = small ? 59 : 104;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={cx} y1="26" x2={lx} y2="54" stroke="#334155" strokeWidth="3" />
      <line x1={cx} y1="26" x2={rx} y2="54" stroke="#334155" strokeWidth="3" />
      <circle cx={cx} cy="21" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
      <text x={cx} y="28" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
        {total}
      </text>
      <circle cx={lx} cy="58" r="15" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
      <text x={lx} y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
        {part}
      </text>
      <circle cx={rx} cy="58" r="15" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
      <text x={rx} y="66" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};
