import React from 'react';

const FONT = 'system-ui, Segoe UI, sans-serif';

/** Egy színes korong (opcionálisan áthúzva a kivonás jelölésére). */
export const DiscG: React.FC<{
  cx: number;
  cy: number;
  r?: number;
  fill?: string;
  stroke?: string;
  crossed?: boolean;
}> = ({ cx, cy, r = 12, fill = '#38bdf8', stroke = '#0369a1', crossed = false }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={crossed ? '#e2e8f0' : fill}
      stroke={crossed ? '#94a3b8' : stroke}
      strokeWidth="2"
    />
    {crossed && (
      <g stroke="#dc2626" strokeWidth="2.8" strokeLinecap="round">
        <line x1={cx - r * 0.65} y1={cy - r * 0.65} x2={cx + r * 0.65} y2={cy + r * 0.65} />
        <line x1={cx + r * 0.65} y1={cy - r * 0.65} x2={cx - r * 0.65} y2={cy + r * 0.65} />
      </g>
    )}
  </g>
);

/** 0–10 számegyenes opcionális visszafelé ugrással. */
export const Line010G: React.FC<{
  from?: number;
  to?: number;
  jumpLabel?: string;
  markStart?: string;
  markEnd?: string;
  y?: number;
  x0?: number;
  x1?: number;
}> = ({
  from,
  to,
  jumpLabel,
  markStart,
  markEnd,
  y = 68,
  x0 = 22,
  x1 = 218
}) => {
  const X = (v: number) => x0 + ((x1 - x0) * v) / 10;
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 8} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: 11 }, (_, v) => {
        const big = v === 0 || v === 5 || v === 10;
        return (
          <g key={v}>
            <line
              x1={X(v)}
              y1={big ? y - 8 : y - 5}
              x2={X(v)}
              y2={big ? y + 8 : y + 5}
              stroke="#334155"
              strokeWidth={big ? 1.8 : 1.1}
            />
            <text
              x={X(v)}
              y={y + 22}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight={big ? 'bold' : 'normal'}
              fill="#1e293b"
            >
              {v}
            </text>
          </g>
        );
      })}
      {from !== undefined && to !== undefined && (
        <g>
          <path
            d={`M ${X(from)} ${y - 8} Q ${(X(from) + X(to)) / 2} ${y - 42} ${X(to) + 2} ${y - 11}`}
            fill="none"
            stroke="#e11d48"
            strokeWidth="2.2"
          />
          <path
            d={`M ${X(to) + 6} ${y - 17} L ${X(to) + 1} ${y - 9} L ${X(to) + 8} ${y - 10}`}
            fill="none"
            stroke="#e11d48"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {jumpLabel && (
            <text
              x={(X(from) + X(to)) / 2}
              y={y - 31}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#be123c"
            >
              {jumpLabel}
            </text>
          )}
          <circle cx={X(from)} cy={y} r="4.5" fill="#2563eb" />
          {markStart && (
            <text x={X(from)} y={y - 20} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">
              {markStart}
            </text>
          )}
          <circle cx={X(to)} cy={y} r="4.5" fill={markEnd === '?' ? '#dc2626' : '#16a34a'} />
          {markEnd && (
            <text
              x={X(to) - 2}
              y={y - 21}
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              fill={markEnd === '?' ? '#dc2626' : '#15803d'}
            >
              {markEnd}
            </text>
          )}
        </g>
      )}
    </g>
  );
};
