import React from 'react';

// Kis rajzelemek (1-es és 10-es korongok, 0–20-as számegyenes) – a Figures, Theory és Quiz fájlok használják.
const FONT = 'system-ui, Segoe UI, sans-serif';

/** Zöld 1-es korong. */
export const OneDisc: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 11 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#86efac" stroke="#15803d" strokeWidth="1.8" />
    <text x={cx} y={cy + r * 0.36} textAnchor="middle" fontSize={r * 1.05} fontWeight="bold" fill="#14532d" fontFamily={FONT}>
      1
    </text>
  </g>
);

/** Lila 10-es korong. */
export const TenDisc: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 14 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#d8b4fe" stroke="#6b21a8" strokeWidth="2" />
    <text x={cx} y={cy + r * 0.34} textAnchor="middle" fontSize={r * 0.92} fontWeight="bold" fill="#4c1d95" fontFamily={FONT}>
      10
    </text>
  </g>
);

export interface NumberLineMark {
  value: number;
  label: string;
  color?: string;
  arrow?: boolean;
}

/** Újrahasznosítható 0–20-as számegyenes részlet vagy teljes skála. */
export const NumberLine0To20: React.FC<{
  lo?: number;
  hi?: number;
  x0?: number;
  x1?: number;
  y?: number;
  labels?: number[];
  marks?: NumberLineMark[];
}> = ({
  lo = 0,
  hi = 20,
  x0 = 22,
  x1 = 330,
  y = 66,
  labels = [0, 5, 10, 15, 20],
  marks = [],
}) => {
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const count = hi - lo;
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 8} y1={y} x2={x1 + 12} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x1 + 12} ${y - 4.5} L ${x1 + 20} ${y} L ${x1 + 12} ${y + 4.5} Z`} fill="#334155" />
      {Array.from({ length: count + 1 }, (_, i) => {
        const v = lo + i;
        const major = v % 10 === 0;
        const mid = v % 5 === 0;
        return (
          <line
            key={v}
            x1={X(v)}
            y1={major ? y - 9 : mid ? y - 7 : y - 4.5}
            x2={X(v)}
            y2={major ? y + 9 : mid ? y + 7 : y + 4.5}
            stroke="#334155"
            strokeWidth={major ? 2 : mid ? 1.5 : 1}
          />
        );
      })}
      {labels.map((v) => (
        <text key={v} x={X(v)} y={y + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
          {v}
        </text>
      ))}
      {marks.map((m, idx) =>
        m.arrow ? (
          <g key={idx}>
            <line x1={X(m.value)} y1={y - 34} x2={X(m.value)} y2={y - 12} stroke={m.color || '#dc2626'} strokeWidth="2" />
            <path
              d={`M ${X(m.value) - 4.5} ${y - 17} L ${X(m.value)} ${y - 10} L ${X(m.value) + 4.5} ${y - 17}`}
              fill="none"
              stroke={m.color || '#dc2626'}
              strokeWidth="2"
            />
            <text x={X(m.value)} y={y - 39} textAnchor="middle" fontSize="14" fontWeight="bold" fill={m.color || '#dc2626'}>
              {m.label}
            </text>
          </g>
        ) : (
          <g key={idx}>
            <circle cx={X(m.value)} cy={y} r="4.5" fill={m.color || '#dc2626'} />
            <text x={X(m.value)} y={y - 14} textAnchor="middle" fontSize="13" fontWeight="bold" fill={m.color || '#dc2626'}>
              {m.label}
            </text>
          </g>
        )
      )}
    </g>
  );
};
