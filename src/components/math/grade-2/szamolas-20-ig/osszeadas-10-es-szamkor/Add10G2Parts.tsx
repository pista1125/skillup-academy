import React from 'react';

// Közös kis SVG rajzelemek a 2. osztályos „Összeadás 10-es számkör” leckéhez.
export const ADD10_FONT = 'system-ui, Segoe UI, sans-serif';

/** Két csoport korong egy sorban, opcionális + jellel közöttük. */
export const DiscGroupSvg: React.FC<{
  a: number;
  b: number;
  cx?: number;
  cy?: number;
  r?: number;
  gap?: number;
  colorA?: string;
  strokeA?: string;
  colorB?: string;
  strokeB?: string;
  showPlus?: boolean;
}> = ({
  a,
  b,
  cx = 120,
  cy = 40,
  r = 9,
  gap = 22,
  colorA = '#ef4444',
  strokeA = '#991b1b',
  colorB = '#3b82f6',
  strokeB = '#1e3a8a',
  showPlus = true,
}) => {
  const plusGap = showPlus ? 24 : 10;
  const wA = a > 0 ? (a - 1) * gap + r * 2 : 0;
  const wB = b > 0 ? (b - 1) * gap + r * 2 : 0;
  const totalW = wA + (a > 0 || b > 0 ? plusGap : 0) + wB;
  const startX = cx - totalW / 2 + r;
  const plusX = startX + (a > 0 ? (a - 1) * gap + r : -r) + plusGap / 2;
  const startBX = plusX + plusGap / 2 + r;

  return (
    <g>
      {Array.from({ length: a }, (_, i) => (
        <circle
          key={`a-${i}`}
          cx={startX + i * gap}
          cy={cy}
          r={r}
          fill={colorA}
          stroke={strokeA}
          strokeWidth="1.6"
        />
      ))}
      {showPlus && (
        <text
          x={plusX}
          y={cy + 6}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#334155"
          fontFamily={ADD10_FONT}
        >
          +
        </text>
      )}
      {Array.from({ length: b }, (_, i) => (
        <circle
          key={`b-${i}`}
          cx={startBX + i * gap}
          cy={cy}
          r={r}
          fill={colorB}
          stroke={strokeB}
          strokeWidth="1.6"
        />
      ))}
      {b === 0 && (
        <rect
          x={startBX - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          rx="4"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      )}
      {a === 0 && (
        <rect
          x={startX - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          rx="4"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      )}
    </g>
  );
};

/** 10-es gyöngysor: `a` db első színű, `b` db második színű, a maradék üres szaggatott gyöngy. */
export const BeadString10G: React.FC<{
  a: number;
  b?: number;
  x0?: number;
  y?: number;
  step?: number;
  r?: number;
  colorA?: string;
  strokeA?: string;
  colorB?: string;
  strokeB?: string;
  showDividerAt5?: boolean;
}> = ({
  a,
  b = 0,
  x0 = 35,
  y = 45,
  step = 26,
  r = 10,
  colorA = '#16a34a',
  strokeA = '#14532d',
  colorB = '#f59e0b',
  strokeB = '#92400e',
  showDividerAt5 = true,
}) => {
  const xEnd = x0 + 9 * step;
  return (
    <g>
      <line x1={x0 - 16} y1={y} x2={xEnd + 16} y2={y} stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      {showDividerAt5 && (
        <line
          x1={x0 + 4.5 * step}
          y1={y - r - 6}
          x2={x0 + 4.5 * step}
          y2={y + r + 6}
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      )}
      {Array.from({ length: 10 }, (_, i) => {
        const cx = x0 + i * step;
        if (i < a) {
          return <circle key={i} cx={cx} cy={y} r={r} fill={colorA} stroke={strokeA} strokeWidth="1.8" />;
        }
        if (i < a + b) {
          return <circle key={i} cx={cx} cy={y} r={r} fill={colorB} stroke={strokeB} strokeWidth="1.8" />;
        }
        return (
          <circle
            key={i}
            cx={cx}
            cy={y}
            r={r}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="3 2"
          />
        );
      })}
    </g>
  );
};

/** 2×5-ös tízes keret (ten-frame). */
export const TenFrameG: React.FC<{
  a: number;
  b?: number;
  x?: number;
  y?: number;
  cell?: number;
  colorA?: string;
  colorB?: string;
  questionInRest?: boolean;
}> = ({
  a,
  b = 0,
  x = 40,
  y = 18,
  cell = 28,
  colorA = '#ef4444',
  colorB = '#3b82f6',
  questionInRest = false,
}) => {
  const total = 10;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={cell * 5}
        height={cell * 2}
        rx="6"
        fill="#ffffff"
        stroke="#475569"
        strokeWidth="2"
      />
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const rx = x + col * cell;
        const ry = y + row * cell;
        const cx = rx + cell / 2;
        const cy = ry + cell / 2;
        const rad = cell * 0.34;
        return (
          <g key={i}>
            <rect x={rx} y={ry} width={cell} height={cell} fill="none" stroke="#94a3b8" strokeWidth="1" />
            {i < a && <circle cx={cx} cy={cy} r={rad} fill={colorA} stroke="#7f1d1d" strokeWidth="1.2" />}
            {i >= a && i < a + b && (
              <circle cx={cx} cy={cy} r={rad} fill={colorB} stroke="#1e3a8a" strokeWidth="1.2" />
            )}
            {questionInRest && i >= a + b && (
              <text
                x={cx}
                y={cy + cell * 0.16}
                textAnchor="middle"
                fontSize={cell * 0.48}
                fontWeight="bold"
                fill="#dc2626"
                fontFamily={ADD10_FONT}
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
