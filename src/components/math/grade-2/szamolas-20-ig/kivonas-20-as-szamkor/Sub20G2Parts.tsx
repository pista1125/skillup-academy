import React from 'react';

export const SUB20_FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * 2 × 10-es tízes keret kivonáshoz (20-as keret).
 * A `total` db korong közül az utolsó `crossed` db piros X-szel át van húzva.
 * Így látszik, hogy először az alsó sorból lépünk vissza 10-re, majd a felső sorból vonunk ki tovább.
 */
export const TwentyFrameSubPart: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  total: number;
  crossed: number;
  highlightTenRow?: boolean;
  twoToneAtTen?: boolean;
}> = ({
  x = 20,
  y = 18,
  cell = 26,
  total,
  crossed,
  highlightTenRow = false,
  twoToneAtTen = true
}) => {
  const gapAfter5 = 6;
  const colX = (c: number) => x + c * cell + (c >= 5 ? gapAfter5 : 0);
  const totalW = 10 * cell + gapAfter5;
  const remaining = Math.max(0, total - crossed);

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
          fillOpacity="0.4"
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
        const present = idx < total;
        const isTaken = present && idx >= remaining;
        const isTopRow = idx < 10;
        const rad = cell * 0.34;
        const fill = isTaken
          ? '#e2e8f0'
          : twoToneAtTen && !isTopRow
          ? '#f59e0b'
          : '#0284c7';
        const stroke = isTaken
          ? '#64748b'
          : twoToneAtTen && !isTopRow
          ? '#92400e'
          : '#0c4a6e';

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
            {present && (
              <circle cx={cx} cy={cy} r={rad} fill={fill} stroke={stroke} strokeWidth="1.3" />
            )}
            {isTaken && (
              <g stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round">
                <line x1={cx - rad * 0.72} y1={cy - rad * 0.72} x2={cx + rad * 0.72} y2={cy + rad * 0.72} />
                <line x1={cx + rad * 0.72} y1={cy - rad * 0.72} x2={cx - rad * 0.72} y2={cy + rad * 0.72} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * 0–20-as számegyenes egy vagy több hátrafelé mutató ugrással.
 */
export interface SubHop {
  from: number;
  to: number;
  label: string;
  color: string;
  above?: boolean;
  depth?: number;
}

export const NumberLine020SubPart: React.FC<{
  x0?: number;
  x1?: number;
  y?: number;
  labels?: number[];
  hops?: SubHop[];
  dots?: { v: number; color: string; r?: number }[];
}> = ({
  x0 = 20,
  x1 = 320,
  y = 86,
  labels = [0, 5, 10, 15, 20],
  hops = [],
  dots = []
}) => {
  const X = (v: number) => x0 + ((x1 - x0) * v) / 20;

  return (
    <g fontFamily={SUB20_FONT}>
      <line x1={x0 - 6} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: 21 }, (_, v) => {
        const major = v % 10 === 0;
        const mid = v % 5 === 0;
        return (
          <line
            key={v}
            x1={X(v)}
            y1={major ? y - 9 : mid ? y - 6 : y - 4}
            x2={X(v)}
            y2={major ? y + 9 : mid ? y + 6 : y + 4}
            stroke={v === 10 ? '#16a34a' : '#334155'}
            strokeWidth={major ? 2 : 1}
          />
        );
      })}
      {labels.map((v) => (
        <text
          key={v}
          x={X(v)}
          y={y + 22}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight={v === 10 || dots.some((d) => d.v === v) ? 'bold' : 'normal'}
          fill={v === 10 ? '#15803d' : '#334155'}
        >
          {v}
        </text>
      ))}
      {hops.map((h, idx) => {
        const sx = X(h.from);
        const ex = X(h.to);
        const mx = (sx + ex) / 2;
        const depth = h.depth ?? 34;
        const dir = h.above !== false ? -1 : 1;
        const sy = y + dir * 7;
        const ey = y + dir * 8;
        const cy = y + dir * depth;
        return (
          <g key={idx}>
            <path
              d={`M ${sx} ${sy} Q ${mx} ${cy} ${ex + 2} ${ey}`}
              fill="none"
              stroke={h.color}
              strokeWidth="2.2"
            />
            <path
              d={`M ${ex + 7} ${ey + dir * 5} L ${ex + 1} ${ey} L ${ex + 5} ${ey + dir * -6}`}
              fill="none"
              stroke={h.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {h.label && (
              <text
                x={mx}
                y={y + dir * (depth * 0.8 + (dir < 0 ? 6 : 14))}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill={h.color}
              >
                {h.label}
              </text>
            )}
          </g>
        );
      })}
      {dots.map((d, idx) => (
        <circle key={idx} cx={X(d.v)} cy={y} r={d.r ?? 4.5} fill={d.color} />
      ))}
    </g>
  );
};
