import React from 'react';

export const ADD20_FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * 2 × 10-es tízes keret (20-as keret).
 * Az első `firstCount` korong korallpiros, az utána következő `secondCount` korong kék.
 * A `splitLine` megjelöli a 10-es határt (az első sor végét).
 */
export const TwentyFramePart: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  firstCount: number;
  secondCount?: number;
  highlightTenRow?: boolean;
  questionMarkSlots?: number;
}> = ({
  x = 20,
  y = 18,
  cell = 26,
  firstCount,
  secondCount = 0,
  highlightTenRow = false,
  questionMarkSlots = 0
}) => {
  const gapAfter5 = 6;
  const colX = (c: number) => x + c * cell + (c >= 5 ? gapAfter5 : 0);
  const totalW = 10 * cell + gapAfter5;

  return (
    <g>
      {highlightTenRow && (
        <rect
          x={x - 3}
          y={y - 3}
          width={totalW + 6}
          height={cell + 6}
          rx="6"
          fill="#dcfce7"
          fillOpacity="0.45"
          stroke="#16a34a"
          strokeWidth="1.6"
          strokeDasharray="4 2"
        />
      )}
      {Array.from({ length: 20 }, (_, idx) => {
        const r = Math.floor(idx / 10);
        const c = idx % 10;
        const cx = colX(c) + cell / 2;
        const cy = y + r * cell + cell / 2;
        const isFirst = idx < firstCount;
        const isSecond = idx >= firstCount && idx < firstCount + secondCount;
        const isQuestion =
          !isFirst &&
          !isSecond &&
          questionMarkSlots > 0 &&
          idx >= firstCount &&
          idx < firstCount + secondCount + questionMarkSlots;
        const rad = cell * 0.34;
        return (
          <g key={idx}>
            <rect
              x={colX(c)}
              y={y + r * cell}
              width={cell}
              height={cell}
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {isFirst && (
              <circle cx={cx} cy={cy} r={rad} fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
            )}
            {isSecond && (
              <circle cx={cx} cy={cy} r={rad} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
            )}
            {isQuestion && (
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontSize={Math.round(cell * 0.52)}
                fontWeight="bold"
                fill="#dc2626"
                fontFamily={ADD20_FONT}
              >
                ?
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * Kétsoros golyós számoló (2 × 10 golyó, 5-ös színezéssel / két taggal).
 */
export const TwoRowBeadsPart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  topCount: number;
  bottomCount: number;
  topColor?: string;
  topStroke?: string;
  bottomColor?: string;
  bottomStroke?: string;
}> = ({
  x = 24,
  y = 22,
  w = 272,
  topCount,
  bottomCount,
  topColor = '#ef4444',
  topStroke = '#991b1b',
  bottomColor = '#3b82f6',
  bottomStroke = '#1e3a8a'
}) => {
  const step = w / 10;
  const r = Math.min(10, step * 0.38);
  const drawRow = (rowY: number, active: number, fill: string, stroke: string) => (
    <g>
      <line x1={x - 6} y1={rowY} x2={x + w + 6} y2={rowY} stroke="#475569" strokeWidth="2.5" />
      <line
        x1={x + 5 * step}
        y1={rowY - r - 3}
        x2={x + 5 * step}
        y2={rowY + r + 3}
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = x + i * step + step / 2;
        const on = i < active;
        return (
          <circle
            key={i}
            cx={cx}
            cy={rowY}
            r={r}
            fill={on ? fill : '#f1f5f9'}
            stroke={on ? stroke : '#cbd5e1'}
            strokeWidth="1.4"
          />
        );
      })}
    </g>
  );

  return (
    <g>
      <rect x={x - 10} y={y - 16} width="6" height="64" rx="3" fill="#334155" />
      <rect x={x + w + 4} y={y - 16} width="6" height="64" rx="3" fill="#334155" />
      {drawRow(y, topCount, topColor, topStroke)}
      {drawRow(y + 32, bottomCount, bottomColor, bottomStroke)}
    </g>
  );
};
