import React from 'react';

// ---------------------------------------------------------------------------
// I. fejezet – Megálló, Kitekintő (tudáspróba): ábrák és SVG-segédek
// ---------------------------------------------------------------------------

export const UNKNOWN_COLOR = '#dc2626';

type FigProps = { className?: string };

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode; title?: string }> = ({
  w,
  h,
  className,
  children,
  title
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className={className ?? 'w-full max-w-xl h-auto mx-auto'}
    xmlns="http://www.w3.org/2000/svg"
    fontFamily="system-ui, sans-serif"
    role="img"
    aria-label={title}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    {title && (
      <text x={w / 2} y="22" textAnchor="middle" fontSize={title.length > 50 ? 12 : 13} fontWeight="bold" fill="#92400e">
        {title}
      </text>
    )}
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// Összegpiramis (téglák): rows[0] a csúcs, az utolsó sor az alap
// ---------------------------------------------------------------------------
export const SumPyramid: React.FC<{
  rows: (string | number)[][];
  cx: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  stroke?: string;
  text?: string;
}> = ({ rows, cx, y, w = 44, h = 22, fill = '#d6a58a', stroke = '#7c2d12', text = '#431407' }) => (
  <g>
    {rows.map((row, r) =>
      row.map((v, i) => {
        const x = cx - (row.length * w) / 2 + i * w;
        const yy = y + r * h;
        const s = String(v);
        const unknown = s === '?' || /^[A-I]$/.test(s);
        return (
          <g key={`${r}-${i}`}>
            <rect x={x} y={yy} width={w} height={h} fill={unknown ? '#fff' : fill} stroke={stroke} strokeWidth="1.4" />
            <text
              x={x + w / 2}
              y={yy + h / 2 + 4.5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill={s === '?' ? UNKNOWN_COLOR : text}
            >
              {s}
            </text>
          </g>
        );
      })
    )}
  </g>
);

export const SumPyramidSvg: React.FC<FigProps> = ({ className }) => (
  <Frame w={400} h={165} className={className} title="Összegpiramis: felülre a két alatta lévő szám összege kerül">
    <SumPyramid rows={[['A'], ['B', 'C'], [321, 135, 228]]} cx={120} y={40} />
    <SumPyramid
      rows={[['819'], ['456', '363'], [321, 135, 228]]}
      cx={290}
      y={40}
      fill="#fde68a"
      stroke="#b45309"
      text="#78350f"
    />
    <text x="120" y="130" textAnchor="middle" fontSize="11" fill="#7c2d12">feladat</text>
    <text x="290" y="130" textAnchor="middle" fontSize="11" fill="#78350f">megoldás</text>
    <text x="200" y="152" textAnchor="middle" fontSize="11" fill="#78350f">321 + 135 = 456, 135 + 228 = 363, 456 + 363 = 819</text>
  </Frame>
);

// ---------------------------------------------------------------------------
// Kerekítsd, majd szorozd! (TK 29/1.)
// ---------------------------------------------------------------------------
export const RoundBox: React.FC<{ x: number; y: number; value: string | number; factors: (string | number)[]; color?: string }> = ({
  x,
  y,
  value,
  factors,
  color = '#16a34a'
}) => {
  const cols = ['#16a34a', '#0284c7', '#dc2626', '#334155'];
  const pos = [
    [-12, -10],
    [12, -10],
    [-12, 12],
    [12, 12]
  ];
  return (
    <g>
      <rect x={x} y={y} width="62" height="30" rx="3" fill="#fff" stroke={color} strokeWidth="1.8" />
      <text x={x + 31} y={y + 20} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {value}
      </text>
      <circle cx={x + 108} cy={y + 15} r="28" fill="#fff" stroke={color} strokeWidth="1.8" />
      {factors.slice(0, 4).map((f, i) => (
        <text key={i} x={x + 108 + pos[i][0]} y={y + 19 + pos[i][1]} textAnchor="middle" fontSize="13" fontWeight="bold" fill={cols[i]}>
          {f}
        </text>
      ))}
    </g>
  );
};

export const RoundAndMultiplySvg: React.FC<FigProps> = ({ className }) => (
  <Frame w={360} h={120} className={className} title="Kerekítsd tízesre, aztán szorozz!">
    <RoundBox x={20} y={50} value={75} factors={[6, 8, 9, 7]} />
    <RoundBox x={190} y={50} value={115} factors={[2, 3, 4, 5]} color="#ea580c" />
    <text x="180" y="112" textAnchor="middle" fontSize="11" fill="#78350f">75 ≈ 80, és 80 · 6 = 480 • 115 ≈ 120, és 120 · 4 = 480</text>
  </Frame>
);

// ---------------------------------------------------------------------------
// Tündérszárnyak és koboldsapkák (TK 51/4.)
// ---------------------------------------------------------------------------
export const Wing: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g>
    <ellipse cx={x - 6} cy={y - 4} rx="6" ry="8" fill={color} stroke="#475569" strokeWidth="0.8" />
    <ellipse cx={x + 6} cy={y - 4} rx="6" ry="8" fill={color} stroke="#475569" strokeWidth="0.8" />
    <ellipse cx={x - 5} cy={y + 7} rx="4.5" ry="5" fill={color} stroke="#475569" strokeWidth="0.8" />
    <ellipse cx={x + 5} cy={y + 7} rx="4.5" ry="5" fill={color} stroke="#475569" strokeWidth="0.8" />
    <line x1={x} y1={y - 10} x2={x} y2={y + 11} stroke="#475569" strokeWidth="1.4" />
  </g>
);

export const Hat: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g>
    <path d={`M ${x - 14} ${y + 8} Q ${x - 4} ${y - 14} ${x + 14} ${y - 2} Q ${x + 4} ${y + 2} ${x + 14} ${y + 8} Z`} fill={color} stroke="#334155" strokeWidth="0.9" />
    <rect x={x - 15} y={y + 6} width="30" height="4" rx="2" fill="#1f2937" opacity="0.5" />
  </g>
);

export const WING_COLORS = { blue: '#7dd3fc', pink: '#f9a8d4', green: '#86efac' };
export const HAT_COLORS = { green: '#84cc16', brown: '#b45309' };

type Tok = { k: 'w' | 'h' | 't'; c?: string; t?: string };
export const PuzzleRow: React.FC<{ y: number; items: Tok[]; x?: number }> = ({ y, items, x = 22 }) => (
  <g>
    {items.map((it, i) => {
      const xx = x + i * 30;
      if (it.k === 'w') return <Wing key={i} x={xx} y={y} color={it.c ?? '#7dd3fc'} />;
      if (it.k === 'h') return <Hat key={i} x={xx} y={y} color={it.c ?? '#84cc16'} />;
      return (
        <text key={i} x={xx} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {it.t}
        </text>
      );
    })}
  </g>
);

const W = (c: string): Tok => ({ k: 'w', c });
const H = (c: string): Tok => ({ k: 'h', c });
const T = (t: string): Tok => ({ k: 't', t });

export const FAIRY_ROWS: Tok[][] = [
  [W(WING_COLORS.blue), T('+'), W(WING_COLORS.blue), T('+'), W(WING_COLORS.blue), T('='), H(HAT_COLORS.green)],
  [W(WING_COLORS.blue), T('+'), W(WING_COLORS.pink), T('='), H(HAT_COLORS.green)],
  [W(WING_COLORS.pink), T('−'), H(HAT_COLORS.brown), T('−'), H(HAT_COLORS.brown), T('−'), H(HAT_COLORS.brown), T('='), H(HAT_COLORS.brown)],
  [W(WING_COLORS.green), T('+'), W(WING_COLORS.green), T('+'), W(WING_COLORS.green), T('='), H(HAT_COLORS.brown), T('+'), H(HAT_COLORS.green)]
];

export const FairyWingsSvg: React.FC<FigProps> = ({ className }) => (
  <Frame w={360} h={170} className={className} title="Az azonos színű képek azonos számot takarnak">
    {FAIRY_ROWS.map((r, i) => (
      <PuzzleRow key={i} y={50 + i * 30} items={r} />
    ))}
    <Wing x={300} y={80} color={WING_COLORS.blue} />
    <text x="316" y="85" fontSize="14" fontWeight="bold" fill="#334155">= 60</text>
  </Frame>
);

// ---------------------------------------------------------------------------
// Műveletlánc nyilakkal (TK 51/5.)
// ---------------------------------------------------------------------------
export const OpChain: React.FC<{
  start: string;
  ops: string[];
  values: string[];
  y: number;
  x?: number;
  step?: number;
}> = ({ start, ops, values, y, x = 26, step = 52 }) => (
  <g>
    <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
      {start}
    </text>
    {ops.map((op, i) => {
      const x0 = x + i * step + 12;
      const x1 = x + (i + 1) * step - 14;
      const xm = (x0 + x1) / 2;
      const v = values[i] ?? '?';
      return (
        <g key={i}>
          <path d={`M ${x0} ${y - 6} Q ${xm} ${y - 30} ${x1} ${y - 8}`} fill="none" stroke="#475569" strokeWidth="1.4" />
          <path d={`M ${x1 - 6} ${y - 13} L ${x1} ${y - 8} L ${x1 - 7} ${y - 6}`} fill="none" stroke="#475569" strokeWidth="1.4" />
          <text x={xm} y={y - 26} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">
            {op}
          </text>
          <rect x={x + (i + 1) * step - 16} y={y - 9} width="32" height="20" rx="6" fill={v === '?' ? '#fee2e2' : '#ede9fe'} stroke="#7c3aed" />
          <text x={x + (i + 1) * step} y={y + 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={v === '?' ? UNKNOWN_COLOR : '#4c1d95'}>
            {v}
          </text>
        </g>
      );
    })}
  </g>
);

export const OperationChainSvg: React.FC<FigProps> = ({ className }) => (
  <Frame w={360} h={110} className={className} title="Műveletlánc: lépésről lépésre haladj!">
    <OpChain start="6400" ops={[': 20', '· 5', ': 80', '· 100']} values={['320', '1600', '20', '2000']} y={78} x={36} step={68} />
  </Frame>
);

// ---------------------------------------------------------------------------
// Sátrak (TK 30/2.)
// ---------------------------------------------------------------------------
export const TENT_COLORS = ['#22c55e', '#facc15', '#22c55e', '#22c55e', '#facc15'];

export const Tent: React.FC<{ x: number; y: number; color: string; n: number; name?: string }> = ({ x, y, color, n, name }) => (
  <g>
    <path d={`M ${x - 26} ${y + 22} L ${x} ${y - 16} L ${x + 26} ${y + 22} Z`} fill={color} stroke="#334155" strokeWidth="1.2" />
    <path d={`M ${x - 8} ${y + 22} L ${x} ${y + 2} L ${x + 8} ${y + 22} Z`} fill="#fef9c3" stroke="#334155" strokeWidth="0.8" />
    <rect x={x - 8} y={y - 9} width="16" height="12" rx="2" fill="#fff" stroke="#334155" strokeWidth="0.7" />
    <text x={x} y={y + 1} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">
      {n}.
    </text>
    {name !== undefined && (
      <text x={x} y={y + 40} textAnchor="middle" fontSize="12" fontWeight="bold" fill={name === '?' ? UNKNOWN_COLOR : '#1e293b'}>
        {name}
      </text>
    )}
  </g>
);

export const TentsSvg: React.FC<FigProps & { names?: string[] }> = ({ className, names }) => (
  <Frame w={360} h={130} className={className} title="Ki melyik sátorban lakott?">
    {TENT_COLORS.map((c, i) => (
      <Tent key={i} x={44 + i * 68} y={62} color={c} n={i + 1} name={names ? names[i] : '?'} />
    ))}
  </Frame>
);

// ---------------------------------------------------------------------------
// Szorzatrács (TK 52/4.)
// ---------------------------------------------------------------------------
export const PRODUCT_GRID = {
  letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  colors: ['#facc15', '#0ea5e9', '#db2777', '#1e3a8a', '#65a30d', '#7c2d12', '#a21caf', '#dc2626', '#f97316'],
  horiz: [8800, 8000, 6000, 8400, 5400, 7800],
  vert: [5500, 9600, 7000, 4500, 7200, 9100]
};

export const ProductGrid: React.FC<{ x: number; y: number; show?: string[]; dx?: number; dy?: number; values?: Record<string, string> }> = ({
  x,
  y,
  show,
  dx = 100,
  dy = 52,
  values
}) => {
  const g = PRODUCT_GRID;
  const pos = (i: number) => ({ px: x + (i % 3) * dx, py: y + Math.floor(i / 3) * dy });
  const visible = (i: number) => !show || show.includes(g.letters[i]);
  const edges: { a: number; b: number; v: number }[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) edges.push({ a: r * 3 + c, b: r * 3 + c + 1, v: g.horiz[r * 2 + c] });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) edges.push({ a: r * 3 + c, b: (r + 1) * 3 + c, v: g.vert[r * 3 + c] });
  return (
    <g>
      {edges
        .filter((e) => visible(e.a) && visible(e.b))
        .map((e, i) => {
          const A = pos(e.a);
          const B = pos(e.b);
          const horiz = A.py === B.py;
          return (
            <g key={i}>
              <line x1={A.px} y1={A.py} x2={B.px} y2={B.py} stroke="#334155" strokeWidth="1.3" />
              <text
                x={horiz ? (A.px + B.px) / 2 : A.px + 6}
                y={horiz ? A.py - 5 : (A.py + B.py) / 2 + 4}
                textAnchor={horiz ? 'middle' : 'start'}
                fontSize="11"
                fontWeight="bold"
                fill="#1e293b"
              >
                {e.v}
              </text>
            </g>
          );
        })}
      {g.letters.map((l, i) => {
        if (!visible(i)) return null;
        const { px, py } = pos(i);
        const v = values?.[l];
        return (
          <g key={l}>
            <rect x={px - 20} y={py - 10} width="40" height="20" rx="2" fill={g.colors[i]} stroke="#1e293b" strokeWidth="0.8" />
            <text x={px} y={py + 4.5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">
              {v ?? l}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const ProductGridSvg: React.FC<FigProps> = ({ className }) => (
  <Frame w={300} h={175} className={className} title="Kerek tízesek 40 és 140 között">
    <ProductGrid x={50} y={52} />
  </Frame>
);

// ---------------------------------------------------------------------------
// Segédek a kvízábrákhoz
// ---------------------------------------------------------------------------

/** Írásbeli művelet oszlopokban; a '?' piros. */
export const ColumnOp: React.FC<{ x: number; y: number; top: string; bottom: string; op: string; result: string; cw?: number }> = ({
  x,
  y,
  top,
  bottom,
  op,
  result,
  cw = 16
}) => {
  const n = Math.max(top.length, bottom.length, result.length) + 1;
  const right = x + n * cw;
  const digits = (s: string, yy: number, col = '#1e293b') =>
    s.split('').map((d, i) => (
      <text key={i} x={right - (s.length - i - 0.5) * cw} y={yy} textAnchor="middle" fontSize="15" fontWeight="bold" fill={d === '?' ? UNKNOWN_COLOR : col}>
        {d}
      </text>
    ));
  return (
    <g fontFamily="ui-monospace, monospace">
      {Array.from({ length: n }).map((_, i) => (
        <line key={i} x1={x + i * cw} y1={y - 16} x2={x + i * cw} y2={y + 46} stroke="#e2e8f0" />
      ))}
      {digits(top, y)}
      <text x={right - (bottom.length + 0.5) * cw} y={y + 20} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7c3aed">
        {op}
      </text>
      {digits(bottom, y + 20)}
      <line x1={x} y1={y + 26} x2={right} y2={y + 26} stroke="#1e293b" strokeWidth="1.6" />
      {digits(result, y + 44, '#0f766e')}
    </g>
  );
};

/** Helyiérték-táblázat. */
export const PlaceTable: React.FC<{ x: number; y: number; heads: string[]; values: string[]; cw?: number }> = ({ x, y, heads, values, cw = 34 }) => {
  const cols = ['#a21caf', '#16a34a', '#dc2626', '#0284c7', '#ca8a04'];
  const off = 5 - heads.length;
  return (
    <g>
      {heads.map((h, i) => (
        <g key={i}>
          <rect x={x + i * cw} y={y} width={cw} height="20" fill={cols[i + off]} opacity="0.85" />
          <text x={x + i * cw + cw / 2} y={y + 14} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">
            {h}
          </text>
          <rect x={x + i * cw} y={y + 20} width={cw} height="26" fill="#fff" stroke="#94a3b8" />
          <text x={x + i * cw + cw / 2} y={y + 38} textAnchor="middle" fontSize="14" fontWeight="bold" fill={values[i] === '?' ? UNKNOWN_COLOR : '#1e293b'}>
            {values[i]}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Számegyenes beosztással; marks: érték → felirat. */
export const NumberLine: React.FC<{
  x: number;
  y: number;
  w: number;
  from: number;
  to: number;
  step: number;
  labelEvery?: number;
  marks?: { v: number; label: string }[];
}> = ({ x, y, w, from, to, step, labelEvery, marks = [] }) => {
  const sx = (v: number) => x + ((v - from) / (to - from)) * w;
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(v);
  return (
    <g>
      <line x1={x - 6} y1={y} x2={x + w + 10} y2={y} stroke="#1e293b" strokeWidth="1.6" />
      <path d={`M ${x + w + 10} ${y} l -7 -4 v 8 Z`} fill="#1e293b" />
      {ticks.map((v, i) => {
        const big = labelEvery ? Math.round((v - from) / step) % labelEvery === 0 : i === 0 || i === ticks.length - 1;
        return (
          <g key={v}>
            <line x1={sx(v)} y1={y - (big ? 7 : 4)} x2={sx(v)} y2={y + (big ? 7 : 4)} stroke="#1e293b" strokeWidth={big ? 1.5 : 1} />
            {big && (
              <text x={sx(v)} y={y + 20} textAnchor="middle" fontSize="10" fill="#334155">
                {v >= 10000 ? '10 000' : v}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={i}>
          <path d={`M ${sx(m.v)} ${y - 8} l -5 -9 h 10 Z`} fill={m.label === '?' ? UNKNOWN_COLOR : '#2563eb'} />
          <text x={sx(m.v)} y={y - 21} textAnchor="middle" fontSize="12" fontWeight="bold" fill={m.label === '?' ? UNKNOWN_COLOR : '#1e3a8a'}>
            {m.label}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Logikai lap: forma, szín, méret, lyukas-e. */
export const LogicShape: React.FC<{
  x: number;
  y: number;
  shape: 'kor' | 'negyzet' | 'haromszog';
  color: string;
  big?: boolean;
  holed?: boolean;
}> = ({ x, y, shape, color, big = false, holed = false }) => {
  const s = big ? 20 : 12;
  return (
    <g>
      {shape === 'kor' && <circle cx={x} cy={y} r={s} fill={color} stroke="#1e293b" strokeWidth="0.8" />}
      {shape === 'negyzet' && <rect x={x - s} y={y - s} width={2 * s} height={2 * s} fill={color} stroke="#1e293b" strokeWidth="0.8" />}
      {shape === 'haromszog' && (
        <path d={`M ${x} ${y - s * 1.1} L ${x + s * 1.15} ${y + s * 0.9} L ${x - s * 1.15} ${y + s * 0.9} Z`} fill={color} stroke="#1e293b" strokeWidth="0.8" />
      )}
      {holed && <circle cx={x} cy={shape === 'haromszog' ? y + s * 0.25 : y} r={big ? 5 : 3.5} fill="#fff" stroke="#1e293b" strokeWidth="0.6" />}
    </g>
  );
};

export const LOGIC_COLORS = { piros: '#ef4444', sarga: '#facc15', kek: '#3b82f6', zold: '#22c55e' };
