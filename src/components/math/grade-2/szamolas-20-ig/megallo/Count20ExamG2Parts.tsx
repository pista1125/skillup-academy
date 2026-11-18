import React from 'react';

// ---------------------------------------------------------------------------
// Közös SVG építőelemek és laborgenerátorok a 7. Megálló (2. osztály, 0–20) leckéhez.
// Minden szám szigorúan 0 és 20 között marad; nincs szorzás (·), osztás (: /),
// betűs képlet vagy LaTeX.
// ---------------------------------------------------------------------------

export const INK = '#0f172a';
export const SUB = '#334155';
export const UNK = '#dc2626';
export const FONT = 'system-ui, -apple-system, Segoe UI, sans-serif';

const isUnk = (v: string | number | null | undefined) => typeof v === 'string' && v.includes('?');

/** Kérdésábra-keret: 240 széles, h magas, világos kártya háttérrel. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 110, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
    {children}
  </svg>
);

/** Tízesrudak (narancs) és egyeskockák (kék) 0–20 között. */
export const TensOnes20: React.FC<{
  x?: number;
  y?: number;
  tens?: number;
  ones?: number;
  cell?: number;
}> = ({ x = 28, y = 14, tens = 1, ones = 4, cell = 6.4 }) => {
  const rodW = cell + 3;
  const rodGap = rodW + 7;
  const onesX = x + tens * rodGap + (tens > 0 ? 10 : 0);
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => (
        <g key={`r${i}`}>
          <rect x={x + i * rodGap} y={y} width={rodW} height={cell * 10} rx="2" fill="#f59e0b" stroke="#92400e" strokeWidth="1.2" />
          {Array.from({ length: 9 }, (__, k) => (
            <line
              key={k}
              x1={x + i * rodGap}
              y1={y + (k + 1) * cell}
              x2={x + i * rodGap + rodW}
              y2={y + (k + 1) * cell}
              stroke="#92400e"
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: ones }, (_, i) => (
        <rect
          key={`o${i}`}
          x={onesX + Math.floor(i / 5) * (cell + 3)}
          y={y + cell * 10 - cell - (i % 5) * (cell + 3)}
          width={cell}
          height={cell}
          rx="1.2"
          fill="#38bdf8"
          stroke="#0369a1"
          strokeWidth="1"
        />
      ))}
    </g>
  );
};

/** 2×10-es húszas keret (5-ös elválasztó vonallal). */
export const TwentyFrame: React.FC<{
  x?: number;
  y?: number;
  a?: number;
  b?: number;
  cross?: number;
  cell?: number;
  showEmpty?: boolean;
}> = ({ x = 18, y = 16, a = 8, b = 0, cross = 0, cell = 19, showEmpty = true }) => {
  const gap = 1.5;
  const w = 10 * cell + 9 * gap;
  const h = 2 * cell + gap;
  const total = a + b;
  const kept = Math.max(0, total - cross);
  return (
    <g>
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx="7" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
      <line x1={x + 5 * cell + 4.5 * gap} y1={y - 4} x2={x + 5 * cell + 4.5 * gap} y2={y + h + 4} stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 2" />
      {Array.from({ length: 20 }, (_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const cx = x + col * (cell + gap) + cell / 2;
        const cy = y + row * (cell + gap) + cell / 2;
        const rx = x + col * (cell + gap);
        const ry = y + row * (cell + gap);
        const isFirst = i < a;
        const isSecond = i >= a && i < total;
        const isCrossed = cross > 0 && i >= kept && i < total;
        return (
          <g key={i}>
            {showEmpty && <rect x={rx + 0.5} y={ry + 0.5} width={cell - 1} height={cell - 1} rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.9" />}
            {(isFirst || isSecond) && (
              <circle
                cx={cx}
                cy={cy}
                r={cell * 0.36}
                fill={isCrossed ? '#e2e8f0' : isFirst ? '#ef4444' : '#2563eb'}
                stroke={isCrossed ? '#64748b' : isFirst ? '#991b1b' : '#1e3a8a'}
                strokeWidth="1.2"
              />
            )}
            {isCrossed && (
              <line
                x1={cx - cell * 0.34}
                y1={cy + cell * 0.34}
                x2={cx + cell * 0.34}
                y2={cy - cell * 0.34}
                stroke="#dc2626"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
    </g>
  );
};

export interface JumpArc {
  from: number;
  to: number;
  label: string;
  color?: string;
}

/** Számegyenes 0–20 között, opcionális jelölőkkel és ívekkel. */
export const NumLine20: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  from?: number;
  to?: number;
  labelEvery?: number;
  marks?: { v: number; label: string }[];
  arcs?: JumpArc[];
}> = ({ x = 18, y = 62, w = 198, from = 0, to = 20, labelEvery = 5, marks = [], arcs = [] }) => {
  const sx = (v: number) => x + ((v - from) / (to - from)) * w;
  const ticks: number[] = [];
  for (let v = from; v <= to; v += 1) ticks.push(v);
  const hasArcs = arcs.length > 0;
  return (
    <g>
      <line x1={x - 6} y1={y} x2={x + w + 10} y2={y} stroke={INK} strokeWidth="1.8" />
      <path d={`M ${x + w + 12} ${y} l -7 -4 v 8 Z`} fill={INK} />
      {ticks.map((v) => {
        const isTen = v % 10 === 0;
        const isFive = v % 5 === 0;
        const isLabeled = (v - from) % labelEvery === 0;
        const th = isTen ? 8 : isFive ? 6.5 : 4;
        return (
          <g key={v}>
            <line x1={sx(v)} y1={y - th} x2={sx(v)} y2={y + th} stroke={INK} strokeWidth={isTen || isFive ? 1.6 : 1} />
            {isLabeled && (
              <text x={sx(v)} y={y + 16} textAnchor="middle" fontSize="9.5" fontWeight={isFive ? 'bold' : 'normal'} fill={SUB}>
                {v}
              </text>
            )}
          </g>
        );
      })}
      {arcs.map((a, idx) => {
        const x1 = sx(a.from);
        const x2 = sx(a.to);
        const mid = (x1 + x2) / 2;
        const archH = Math.max(26, Math.min(36, Math.abs(x2 - x1) * 0.45));
        const col = a.color ?? (a.to >= a.from ? '#16a34a' : '#dc2626');
        const dir = x2 >= x1 ? 1 : -1;
        return (
          <g key={idx}>
            <path d={`M ${x1} ${y - 6} Q ${mid} ${y - 6 - archH} ${x2 - dir * 2} ${y - 9}`} fill="none" stroke={col} strokeWidth="2.1" />
            <circle cx={x2} cy={y - 7} r="2.8" fill={col} />
            <text x={mid} y={y - 9 - archH * 0.62} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={isUnk(a.label) ? UNK : col}>
              {a.label}
            </text>
          </g>
        );
      })}
      {marks.map((m, i) => {
        const unk = isUnk(m.label);
        const col = unk ? UNK : '#1d4ed8';
        const dotCol = unk ? UNK : '#2563eb';
        if (hasArcs) {
          return (
            <g key={i}>
              <circle cx={sx(m.v)} cy={y} r="4" fill={dotCol} />
              <rect x={sx(m.v) - 13} y={y + 22} width="26" height="17" rx="4" fill={unk ? '#fee2e2' : '#dbeafe'} stroke={dotCol} strokeWidth="1.2" />
              <text x={sx(m.v)} y={y + 34} textAnchor="middle" fontSize="11" fontWeight="bold" fill={col}>
                {m.label}
              </text>
            </g>
          );
        }
        return (
          <g key={i}>
            <circle cx={sx(m.v)} cy={y} r="4" fill={dotCol} />
            <path d={`M ${sx(m.v)} ${y - 7} l -4 -7 h 8 Z`} fill={dotCol} />
            <text x={sx(m.v)} y={y - 18} textAnchor="middle" fontSize="12" fontWeight="bold" fill={col}>
              {m.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Számpiramis 3 vagy 4 sorral: a felső tégla az alatta lévő kettő összege. */
export const PyramidFig: React.FC<{
  rows: (string | number)[][];
  cx?: number;
  y?: number;
  bw?: number;
  bh?: number;
  palette?: 'amber' | 'sky' | 'violet';
}> = ({ rows, cx = 120, y = 10, bw = 40, bh = 22, palette = 'amber' }) => {
  const fills: Record<string, { bg: string; stroke: string }> = {
    amber: { bg: '#fef3c7', stroke: '#d97706' },
    sky: { bg: '#e0f2fe', stroke: '#0284c7' },
    violet: { bg: '#f3e8ff', stroke: '#7e22ce' },
  };
  const pal = fills[palette];
  const gapX = 4;
  const gapY = 3;
  // rows[0] = top (length 1), rows[last] = bottom
  return (
    <g>
      {rows.map((row, rIdx) => {
        const totalW = row.length * bw + (row.length - 1) * gapX;
        const x0 = cx - totalW / 2;
        const ry = y + rIdx * (bh + gapY);
        return row.map((val, cIdx) => {
          const rx = x0 + cIdx * (bw + gapX);
          const unk = isUnk(val);
          return (
            <g key={`${rIdx}-${cIdx}`}>
              <rect
                x={rx}
                y={ry}
                width={bw}
                height={bh}
                rx="5"
                fill={unk ? '#fee2e2' : pal.bg}
                stroke={unk ? UNK : pal.stroke}
                strokeWidth={unk ? '1.8' : '1.3'}
              />
              <text
                x={rx + bw / 2}
                y={ry + bh / 2 + 4.5}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="bold"
                fill={unk ? UNK : INK}
              >
                {val}
              </text>
            </g>
          );
        });
      })}
    </g>
  );
};

/** Sugaras párosító kerék (Kitekintő TK 23. o. mintájára). */
export const RadialWheelFig: React.FC<{
  center: number | string;
  pairs: [string | number, string | number, string?][];
  cx?: number;
  cy?: number;
  R?: number;
}> = ({ center, pairs, cx = 120, cy = 62, R = 44 }) => {
  const defaultCols = ['#0284c7', '#d97706', '#dc2626', '#7e22ce', '#059669', '#0f766e', '#be185d'];
  const nodeR = pairs.length >= 6 ? 10 : 11.5;
  const fs = pairs.length >= 6 ? 10.5 : 11.5;
  return (
    <g>
      {pairs.map(([a, b, col], idx) => {
        const angle = -Math.PI / 2 + (idx * Math.PI) / pairs.length;
        const x1 = cx + Math.cos(angle) * R;
        const y1 = cy + Math.sin(angle) * R;
        const x2 = cx - Math.cos(angle) * R;
        const y2 = cy - Math.sin(angle) * R;
        const lineCol = col ?? defaultCols[idx % defaultCols.length];
        return (
          <g key={idx}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={lineCol} strokeWidth="2.2" />
            {[
              { x: x1, y: y1, v: a },
              { x: x2, y: y2, v: b },
            ].map((node, k) => {
              const unk = isUnk(node.v);
              return (
                <g key={k}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeR}
                    fill={unk ? '#fee2e2' : '#ffffff'}
                    stroke={unk ? UNK : lineCol}
                    strokeWidth="2"
                  />
                  <text x={node.x} y={node.y + 3.8} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={unk ? UNK : INK}>
                    {node.v}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="14.5" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.2" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>
        {center}
      </text>
    </g>
  );
};

const PIP_POS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]],
};

/** 1–3 dobókocka kérdőjellel vagy pöttyökkel. */
export const DiceTrioFig: React.FC<{ values: (number | '?')[]; y?: number; s?: number }> = ({ values, y = 20, s = 42 }) => {
  const fills = ['#fef9c3', '#e0f2fe', '#fce7f3'];
  const gap = 14;
  const totalW = values.length * s + (values.length - 1) * gap;
  const x0 = 120 - totalW / 2;
  return (
    <g>
      {values.map((v, idx) => {
        const x = x0 + idx * (s + gap);
        return (
          <g key={idx}>
            <rect x={x} y={y} width={s} height={s} rx="8" fill={v === '?' ? '#fee2e2' : fills[idx % fills.length]} stroke={v === '?' ? UNK : '#334155'} strokeWidth="1.8" />
            {v === '?' ? (
              <text x={x + s / 2} y={y + s / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
                ?
              </text>
            ) : (
              (PIP_POS[v] ?? []).map(([px, py], k) => (
                <circle key={k} cx={x + px * s} cy={y + py * s} r="3.4" fill={INK} />
              ))
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Számkártyák egy sorban (sorozathoz, válogatáshoz). */
export const CardsRowFig: React.FC<{ cards: (string | number)[]; y?: number; color?: string }> = ({
  cards,
  y = 22,
  color = '#0284c7',
}) => {
  const gap = 5;
  const rawWidths = cards.map((c) => Math.max(30, String(c).length * 8 + 14));
  const rawSum = rawWidths.reduce((a, b) => a + b, 0) + gap * (cards.length - 1);
  const scale = rawSum > 224 ? 224 / rawSum : 1;
  const widths = rawWidths.map((w) => w * scale);
  const totalW = widths.reduce((a, b) => a + b, 0) + gap * (cards.length - 1);
  const fs = scale < 0.85 ? 11 : 13;
  let curX = 120 - totalW / 2;
  return (
    <g>
      {cards.map((c, i) => {
        const w = widths[i];
        const cx = curX;
        curX += w + gap;
        const unk = isUnk(c);
        return (
          <g key={i}>
            <rect x={cx} y={y} width={w} height="30" rx="6" fill={unk ? '#fee2e2' : '#ffffff'} stroke={unk ? UNK : color} strokeWidth="1.6" />
            <text x={cx + w / 2} y={y + 19.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={unk ? UNK : INK}>
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Műveletlánc: minden nyíl felett világos műveleti jel. */
export const ArrowChainFig: React.FC<{
  values: (string | number)[];
  ops: string[];
  y?: number;
}> = ({ values, ops, y = 34 }) => {
  const n = values.length;
  const step = Math.min(62, 196 / Math.max(1, n - 1));
  const x0 = 120 - ((n - 1) * step) / 2;
  return (
    <g>
      {ops.map((op, i) => {
        const x1 = x0 + i * step + 15;
        const x2 = x0 + (i + 1) * step - 17;
        return (
          <g key={`op${i}`}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="#475569" strokeWidth="1.8" />
            <path d={`M ${x2 + 4} ${y} l -6 -3.5 v 7 Z`} fill="#475569" />
            <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">
              {op}
            </text>
          </g>
        );
      })}
      {values.map((v, i) => {
        const cx = x0 + i * step;
        const unk = isUnk(v);
        return (
          <g key={`v${i}`}>
            <circle cx={cx} cy={y} r="14" fill={unk ? '#fee2e2' : '#fff'} stroke={unk ? UNK : '#0284c7'} strokeWidth="1.8" />
            <text x={cx} y={y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={unk ? UNK : INK}>
              {v}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Szalagmodell / összehasonlító szakaszos ábra (szöveges feladatokhoz). */
export const CompareBarsFig: React.FC<{
  topLabel: string;
  topVal: number;
  topText: string;
  botLabel: string;
  botVal: number;
  botText: string;
  diffText?: string;
  y?: number;
}> = ({ topLabel, topVal, topText, botLabel, botVal, botText, diffText, y = 16 }) => {
  const maxVal = Math.max(topVal, botVal, 1);
  const maxW = 148;
  const xStart = 64;
  const w1 = (topVal / maxVal) * maxW;
  const w2 = (botVal / maxVal) * maxW;
  return (
    <g>
      <text x={xStart - 6} y={y + 15} textAnchor="end" fontSize="11" fontWeight="bold" fill={SUB}>
        {topLabel}
      </text>
      <rect x={xStart} y={y} width={w1} height="22" rx="5" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.4" />
      <text x={xStart + w1 / 2} y={y + 15} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={isUnk(topText) ? UNK : INK}>
        {topText}
      </text>

      <text x={xStart - 6} y={y + 47} textAnchor="end" fontSize="11" fontWeight="bold" fill={SUB}>
        {botLabel}
      </text>
      <rect x={xStart} y={y + 32} width={w2} height="22" rx="5" fill="#fde68a" stroke="#d97706" strokeWidth="1.4" />
      <text x={xStart + w2 / 2} y={y + 47} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={isUnk(botText) ? UNK : INK}>
        {botText}
      </text>

      {diffText && (
        <g>
          <line x1={xStart + Math.min(w1, w2)} y1={y + 58} x2={xStart + Math.max(w1, w2)} y2={y + 58} stroke={UNK} strokeWidth="1.8" />
          <line x1={xStart + Math.min(w1, w2)} y1={y + 54} x2={xStart + Math.min(w1, w2)} y2={y + 62} stroke={UNK} strokeWidth="1.6" />
          <line x1={xStart + Math.max(w1, w2)} y1={y + 54} x2={xStart + Math.max(w1, w2)} y2={y + 62} stroke={UNK} strokeWidth="1.6" />
          <text
            x={Math.min(228, Math.max(64, xStart + (w1 + w2) / 2))}
            y={y + 72}
            textAnchor={xStart + (w1 + w2) / 2 + diffText.length * 3.1 > 228 ? 'end' : 'middle'}
            fontSize="10.5"
            fontWeight="bold"
            fill={isUnk(diffText) ? UNK : '#b45309'}
          >
            {diffText}
          </text>
        </g>
      )}
    </g>
  );
};

/** Bűvös háromszög (Kitekintő TK 22/2b mintájára): 6 csúcs/oldalközép, minden oldalon azonos összeg. */
export const MagicTriangleFig: React.FC<{
  nodes: (string | number)[]; // [top, midL, midR, botL, botM, botR] (6-node triangle)
  target: number;
  cx?: number;
  y?: number;
}> = ({ nodes, target, cx = 96, y = 18 }) => {
  const coords: [number, number][] = [
    [cx, y], // 0 top
    [cx - 32, y + 34], // 1 midL
    [cx + 32, y + 34], // 2 midR
    [cx - 64, y + 68], // 3 botL
    [cx, y + 68], // 4 botM
    [cx + 64, y + 68], // 5 botR
  ];
  return (
    <g>
      <polygon
        points={`${coords[0][0]},${coords[0][1]} ${coords[3][0]},${coords[3][1]} ${coords[5][0]},${coords[5][1]}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.4"
      />
      {coords.map(([nx, ny], idx) => {
        const v = nodes[idx];
        const unk = isUnk(v);
        return (
          <g key={idx}>
            <circle cx={nx} cy={ny} r="12.5" fill={unk ? '#fee2e2' : '#ffffff'} stroke={unk ? UNK : '#d97706'} strokeWidth="2" />
            <text x={nx} y={ny + 4.2} textAnchor="middle" fontSize="12" fontWeight="bold" fill={unk ? UNK : INK}>
              {v}
            </text>
          </g>
        );
      })}
      <rect x="170" y="16" width="60" height="24" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
      <text x="200" y="32" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#92400e">
        oldal = {target}
      </text>
    </g>
  );
};

/** Kockás mező (pixel-rács minta, Kitekintő TK 23/2-3 mintájára). */
export const PixelGridFig: React.FC<{
  grid: string[][]; // hex colors or '' for empty
  x?: number;
  y?: number;
  cell?: number;
}> = ({ grid, x = 80, y = 12, cell = 16 }) => (
  <g>
    {grid.map((row, r) =>
      row.map((col, c) => (
        <rect
          key={`${r}-${c}`}
          x={x + c * cell}
          y={y + r * cell}
          width={cell}
          height={cell}
          fill={col || '#ffffff'}
          stroke="#64748b"
          strokeWidth="1"
        />
      ))
    )}
  </g>
);

// ---------------------------------------------------------------------------
// Labor I & II feladatgenerátorok (szigorúan 0–20 között)
// ---------------------------------------------------------------------------
export type ExamG2TaskKind =
  | 'szomszed'
  | 'potlas10'
  | 'atl_osszeadas'
  | 'atl_kivonas'
  | 'ketjegyu_kivonas'
  | 'lanc';

export const EXAM_G2_TASK_KINDS: { id: ExamG2TaskKind; label: string }[] = [
  { id: 'szomszed', label: 'Szomszédok' },
  { id: 'potlas10', label: 'Pótlás 10-re' },
  { id: 'atl_osszeadas', label: 'Összeadás 20-ig' },
  { id: 'atl_kivonas', label: 'Kivonás 20-ig' },
  { id: 'ketjegyu_kivonas', label: 'Kétjegyű − kétjegyű' },
  { id: 'lanc', label: 'Műveletlánc' },
];

export interface ExamG2Task {
  text: string;
  answer: number;
  hint: string;
  mistakes: { value: number; msg: string }[];
}

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const makeExamG2Task = (kind: ExamG2TaskKind): ExamG2Task => {
  let task: ExamG2Task;
  switch (kind) {
    case 'szomszed': {
      const n = rnd(1, 19);
      if (rnd(0, 1) === 0) {
        task = {
          text: `Mi a ${n} kisebb egyes szomszédja?`,
          answer: n - 1,
          hint: `Számolj vissza 1-et a ${n}-ből!`,
          mistakes: [{ value: n + 1, msg: 'Ez a nagyobb szomszéd. Most a kisebbet keressük!' }],
        };
      } else {
        task = {
          text: `Mi a ${n} nagyobb egyes szomszédja?`,
          answer: n + 1,
          hint: `Adj hozzá 1-et a ${n}-hez!`,
          mistakes: [{ value: n - 1, msg: 'Ez a kisebb szomszéd. Most a nagyobbat keressük!' }],
        };
      }
      break;
    }
    case 'potlas10': {
      const a = rnd(1, 9);
      const ans = 10 - a;
      task = {
        text: `${a} + □ = 10`,
        answer: ans,
        hint: `Gondolj a 10 bontására: mennyi hiányzik a ${a}-tól a 10-ig?`,
        mistakes: [{ value: 10 + a, msg: 'Nem összeadni kell a 10-et és a ' + a + '-t, hanem kiegészíteni 10-re!' }],
      };
      break;
    }
    case 'atl_osszeadas': {
      const a = rnd(4, 9);
      const minB = 11 - a;
      const b = rnd(minB, 9);
      const toTen = 10 - a;
      const rest = b - toTen;
      task = {
        text: `${a} + ${b} =`,
        answer: a + b,
        hint: `Pótold 10-re! ${a} + ${toTen} = 10, és 10 + ${rest} = ${a + b}.`,
        mistakes: [
          { value: a + b - 1, msg: 'Eggyel kevesebbet számoltál. Ellenőrizd a második lépést!' },
          { value: a + b + 1, msg: 'Eggyel többet számoltál. Ellenőrizd a maradékot!' },
        ],
      };
      break;
    }
    case 'atl_kivonas': {
      const a = rnd(11, 18);
      const minB = a - 9;
      const b = rnd(minB, 9);
      const toTen = a - 10;
      const rest = b - toTen;
      task = {
        text: `${a} − ${b} =`,
        answer: a - b,
        hint: `Menj le előbb 10-re: ${a} − ${toTen} = 10, majd 10 − ${rest} = ${a - b}.`,
        mistakes: [
          { value: 10 + Math.abs((a % 10) - b), msg: 'Ne fordítsd meg az egyeseket! Előbb menj vissza 10-re.' },
          { value: a + b <= 20 ? a + b : a - b + 2, msg: 'Összeadás helyett kivonni kell!' },
        ],
      };
      break;
    }
    case 'ketjegyu_kivonas': {
      const a = rnd(12, 20);
      const b = rnd(10, a - 1);
      const onesB = b % 10;
      task = {
        text: `${a} − ${b} =`,
        answer: a - b,
        hint: `Vegyél el előbb 10-et: ${a} − 10 = ${a - 10}, aztán még ${onesB}-t!`,
        mistakes: [
          { value: a - 10, msg: `Ne felejtsd el az egyeseket (${onesB}) is elvenni!` },
          { value: a - onesB, msg: 'A 10-est is el kell venni, nem csak az egyeseket!' },
        ],
      };
      break;
    }
    case 'lanc':
    default: {
      const start = rnd(5, 13);
      const add = rnd(2, Math.min(7, 20 - start));
      const mid = start + add;
      const sub = rnd(2, Math.min(8, mid));
      task = {
        text: `${start} + ${add} − ${sub} =`,
        answer: mid - sub,
        hint: `Haladj balról jobbra! Előbb ${start} + ${add} = ${mid}, aztán ${mid} − ${sub}.`,
        mistakes: [
          { value: mid, msg: `Még ki kell vonnod a ${sub}-t is a ${mid}-ból!` },
          { value: start + sub - add, msg: 'Mindig balról jobbra haladj!' },
        ],
      };
      break;
    }
  }
  return {
    ...task,
    mistakes: task.mistakes.filter((m) => m.value !== task.answer && m.value >= 0 && m.value <= 20),
  };
};

export interface PyramidG2Task {
  b1: number;
  b2: number;
  b3: number;
  m1: number;
  m2: number;
  top: number;
  /** 'top-up' = alul adva, felül üres; 'missing-mid' = egy alsó és a felső hiányzik */
  mode: 'bottom-up' | 'mixed';
}

export const makePyramidG2Task = (): PyramidG2Task => {
  // Biztosítjuk, hogy a legfelső tégla (b1 + 2*b2 + b3) <= 20 legyen!
  const b2 = rnd(1, 5);
  const maxRem = 20 - 2 * b2;
  const b1 = rnd(1, Math.min(8, maxRem - 1));
  const b3 = rnd(1, Math.min(8, maxRem - b1));
  const m1 = b1 + b2;
  const m2 = b2 + b3;
  const top = m1 + m2;
  const mode = rnd(0, 1) === 0 ? 'bottom-up' : 'mixed';
  return { b1, b2, b3, m1, m2, top, mode };
};
