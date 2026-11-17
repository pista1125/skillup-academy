import React from 'react';

// ---------------------------------------------------------------------------
// Rajzoló elemek a 8. Megálló – tudáspróba leckéhez (3. osztály, I. fejezet).
// Ezeket a Figures, a Quiz és a Theory fájl is használja.
// ---------------------------------------------------------------------------

export const UNK = '#e11d48';
export const INK = '#1e293b';
export const FONT = 'system-ui, sans-serif';

const isUnk = (s: string | number | null | undefined) => typeof s === 'string' && s.includes('?');

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 120, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Tízesrudak és egyeskockák. */
export const TensOnes: React.FC<{
  x?: number;
  y?: number;
  tens?: number;
  ones?: number;
  cell?: number;
  rodGap?: number;
  onesCols?: number;
  rodColor?: string;
  oneColor?: string;
}> = ({ x = 10, y = 10, tens = 4, ones = 7, cell = 6, rodGap = 12, onesCols = 5, rodColor = '#f59e0b', oneColor = '#0ea5e9' }) => {
  const rodW = cell + 2;
  const onesX = x + tens * rodGap + 8;
  return (
    <g>
      {Array.from({ length: tens }).map((_, i) => (
        <g key={`r${i}`}>
          <rect x={x + i * rodGap} y={y} width={rodW} height={cell * 10} rx="1.5" fill={rodColor} stroke="#92400e" strokeWidth="1" />
          {Array.from({ length: 9 }).map((__, k) => (
            <line key={k} x1={x + i * rodGap} y1={y + (k + 1) * cell} x2={x + i * rodGap + rodW} y2={y + (k + 1) * cell} stroke="#92400e" strokeWidth="0.6" />
          ))}
        </g>
      ))}
      {Array.from({ length: ones }).map((_, i) => (
        <rect
          key={`o${i}`}
          x={onesX + (i % onesCols) * (cell + 2)}
          y={y + cell * 10 - cell - Math.floor(i / onesCols) * (cell + 2)}
          width={cell}
          height={cell}
          rx="1"
          fill={oneColor}
          stroke="#075985"
          strokeWidth="0.8"
        />
      ))}
    </g>
  );
};

/** Számegyenes. */
export const NumLine: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  from?: number;
  to?: number;
  step?: number;
  labelEvery?: number;
  marks?: { v: number; label: string }[];
}> = ({ x = 18, y = 50, w = 196, from = 0, to = 100, step = 10, labelEvery = 1, marks = [] }) => {
  const sx = (v: number) => x + ((v - from) / (to - from)) * w;
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(v);
  return (
    <g>
      <line x1={x - 6} y1={y} x2={x + w + 12} y2={y} stroke={INK} strokeWidth="1.6" />
      <path d={`M ${x + w + 12} ${y} l -7 -4 v 8 Z`} fill={INK} />
      {ticks.map((v, i) => {
        const big = i % labelEvery === 0;
        return (
          <g key={v}>
            <line x1={sx(v)} y1={y - (big ? 7 : 4)} x2={sx(v)} y2={y + (big ? 7 : 4)} stroke={INK} strokeWidth={big ? 1.5 : 1} />
            {big && (
              <text x={sx(v)} y={y + 20} textAnchor="middle" fontSize="10" fill="#334155">
                {v}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={i}>
          <path d={`M ${sx(m.v)} ${y - 8} l -5 -9 h 10 Z`} fill={isUnk(m.label) ? UNK : '#2563eb'} />
          <text x={sx(m.v)} y={y - 21} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isUnk(m.label) ? UNK : '#1e3a8a'}>
            {m.label}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Egyszerű táblázat (fejléc + egy vagy több sor). A '\n' a fejlécben sortörés. */
export const SimpleTable: React.FC<{
  x?: number;
  y?: number;
  heads?: string[];
  rows?: (string | number)[][];
  colW?: number;
  headH?: number;
  rowH?: number;
  highlightCol?: number;
}> = ({ x = 10, y = 10, heads = ['Szám'], rows = [['?']], colW = 44, headH = 26, rowH = 26, highlightCol = -1 }) => (
  <g>
    {heads.map((h, i) => {
      const lines = h.split('\n');
      return (
        <g key={`h${i}`}>
          <rect x={x + i * colW} y={y} width={colW} height={headH} fill={i === highlightCol ? '#fbbf24' : '#fde68a'} stroke="#b45309" />
          {lines.map((ln, k) => (
            <text
              key={k}
              x={x + i * colW + colW / 2}
              y={y + headH / 2 + (k - (lines.length - 1) / 2) * 10 + 3.5}
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill="#78350f"
            >
              {ln}
            </text>
          ))}
        </g>
      );
    })}
    {rows.map((r, j) =>
      r.map((c, i) => (
        <g key={`c${j}-${i}`}>
          <rect x={x + i * colW} y={y + headH + j * rowH} width={colW} height={rowH} fill="#fff" stroke="#b45309" />
          <text
            x={x + i * colW + colW / 2}
            y={y + headH + j * rowH + rowH / 2 + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={isUnk(String(c)) ? UNK : INK}
          >
            {c}
          </text>
        </g>
      ))
    )}
  </g>
);

/** Számkártyák egy sorban. */
export const Cards: React.FC<{ cards?: string[]; y?: number; color?: string }> = ({ cards = ['12', '?'], y = 14, color = '#0284c7' }) => {
  const w = Math.min(44, 224 / cards.length);
  return (
    <g>
      {cards.map((c, i) => {
        const x = 120 - (cards.length * w) / 2 + i * w + 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w - 4} height="32" rx="7" fill="#fff" stroke={isUnk(c) ? UNK : color} strokeWidth="1.8" />
            <text x={x + (w - 4) / 2} y={y + 22} textAnchor="middle" fontSize="15" fontWeight="bold" fill={isUnk(c) ? UNK : INK}>
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Magyar pénzérmék. */
export const Coins: React.FC<{ values?: number[]; y?: number }> = ({ values = [50, 20], y = 40 }) => {
  const r = (v: number) => (v >= 100 ? 21 : v >= 50 ? 20 : v >= 20 ? 18 : v >= 10 ? 16 : 13);
  const gap = 6;
  const total = values.reduce((s, v) => s + 2 * r(v), 0) + gap * (values.length - 1);
  let cx = 120 - total / 2;
  return (
    <g>
      {values.map((v, i) => {
        const rr = r(v);
        cx += rr;
        const c = cx;
        cx += rr + gap;
        const gold = v === 5 || v === 20 || v === 100;
        return (
          <g key={i}>
            <circle cx={c} cy={y} r={rr} fill={gold ? '#fcd34d' : '#e2e8f0'} stroke={gold ? '#b45309' : '#64748b'} strokeWidth="1.6" />
            {v === 100 && <circle cx={c} cy={y} r={rr - 6} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />}
            <text x={c} y={y + 1} textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
              {v}
            </text>
            <text x={c} y={y + 11} textAnchor="middle" fontSize="7.5" fill="#334155">
              Ft
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Tányérok (csoportok). dots: a tányéron lévő korongok színei, vagy '?' ha ismeretlen. */
export const Plates: React.FC<{
  n?: number;
  dots?: string[] | '?';
  y?: number;
  r?: number;
}> = ({ n = 4, dots = '?', y = 60, r = 20 }) => {
  const step = Math.min(2 * r + 8, 224 / n);
  const rr = Math.min(r, step / 2 - 2);
  const x0 = 120 - (n * step) / 2 + step / 2;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const cx = x0 + i * step;
        return (
          <g key={i}>
            <circle cx={cx} cy={y} r={rr} fill="#fff" stroke="#94a3b8" strokeWidth="1.6" />
            <circle cx={cx} cy={y} r={rr - 4} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            {dots === '?' ? (
              <text x={cx} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>
                ?
              </text>
            ) : (
              dots.map((c, k) => {
                const cols = dots.length <= 4 ? 2 : 3;
                const rows = Math.ceil(dots.length / cols);
                const d = Math.min(7, ((rr - 4) * 1.4) / Math.max(cols, rows));
                const px = cx + ((k % cols) - (cols - 1) / 2) * d * 1.25;
                const py = y + (Math.floor(k / cols) - (rows - 1) / 2) * d * 1.25;
                return <circle key={k} cx={px} cy={py} r={d / 2} fill={c} stroke="#0f172a" strokeWidth="0.4" />;
              })
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Korongok: csoportosítva (size-onként keretben) vagy ömlesztve, 10-es sorokban. */
export const DotGroups: React.FC<{
  total?: number;
  size?: number;
  grouped?: boolean;
  y?: number;
  color?: string;
  perRow?: number;
  noun?: string;
}> = ({ total = 17, size = 5, grouped = true, y = 14, color = '#f97316', perRow = 10, noun = 'korong' }) => {
  const d = 13;
  if (!grouped) {
    const rows = Math.ceil(total / perRow);
    const x0 = 120 - (Math.min(total, perRow) * d) / 2 + d / 2;
    return (
      <g>
        {Array.from({ length: total }).map((_, i) => (
          <circle key={i} cx={x0 + (i % perRow) * d} cy={y + 8 + Math.floor(i / perRow) * d} r="5" fill={color} stroke="#7c2d12" strokeWidth="0.8" />
        ))}
        <text x="120" y={y + 8 + rows * d + 8} textAnchor="middle" fontSize="10" fill="#334155">
          {total} {noun}
        </text>
      </g>
    );
  }
  const groups = Math.floor(total / size);
  const rest = total - groups * size;
  const cols = size <= 3 ? size : size <= 6 ? Math.ceil(size / 2) : Math.ceil(size / 3);
  const gRows = Math.ceil(size / cols);
  const gw = cols * 11 + 8;
  const gh = gRows * 11 + 8;
  const items = groups + (rest > 0 ? 1 : 0);
  const perLine = Math.max(1, Math.floor(224 / (gw + 6)));
  const lines = Math.ceil(items / perLine);
  const inLine = Math.min(items, perLine);
  const x0 = 120 - (inLine * (gw + 6) - 6) / 2;
  return (
    <g>
      {Array.from({ length: items }).map((_, g) => {
        const gx = x0 + (g % perLine) * (gw + 6);
        const gy = y + Math.floor(g / perLine) * (gh + 6);
        const isRest = g === groups;
        const count = isRest ? rest : size;
        return (
          <g key={g}>
            {!isRest && <rect x={gx} y={gy} width={gw} height={gh} rx="7" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.4" />}
            {Array.from({ length: count }).map((_, k) => (
              <circle
                key={k}
                cx={gx + 4 + 5.5 + (k % cols) * 11}
                cy={gy + 4 + 5.5 + Math.floor(k / cols) * 11}
                r="4.5"
                fill={isRest ? '#a855f7' : color}
                stroke="#3b0764"
                strokeWidth="0.6"
              />
            ))}
          </g>
        );
      })}
      <text x="120" y={y + lines * (gh + 6) + 8} textAnchor="middle" fontSize="10" fill="#334155">
        {total} korong, {size}-ösével csoportosítva
      </text>
    </g>
  );
};

/** Műveletlánc: értékek dobozokban, köztük nyilak a műveletekkel. */
export const Chain: React.FC<{ values?: string[]; ops?: string[]; y?: number }> = ({ values = ['4', '?'], ops = ['+ 3'], y = 30 }) => {
  const n = values.length;
  const bw = n >= 5 ? 32 : 38;
  const gap = (228 - n * bw) / (n - 1);
  const x0 = 6;
  return (
    <g>
      {values.map((v, i) => {
        const x = x0 + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height="28" rx="7" fill={isUnk(v) ? '#ffe4e6' : '#fff'} stroke={isUnk(v) ? UNK : '#0369a1'} strokeWidth="1.8" />
            <text x={x + bw / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isUnk(v) ? UNK : INK}>
              {v}
            </text>
            {i < n - 1 && (
              <g>
                <line x1={x + bw + 2} y1={y + 14} x2={x + bw + gap - 6} y2={y + 14} stroke="#7c3aed" strokeWidth="1.6" />
                <path d={`M ${x + bw + gap - 2} ${y + 14} l -6 -4 v 8 Z`} fill="#7c3aed" />
                <text x={x + bw + gap / 2} y={y - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">
                  {ops[i]}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export type TileShape = 'kor' | 'negyzet' | 'haromszog';
export const TILE_COLORS = { piros: '#ef4444', sarga: '#facc15', kek: '#1e40af', zold: '#22c55e' } as const;

/** Logikai lap (középpont, méret). */
export const Tile: React.FC<{ shape?: TileShape; color?: string; cx?: number; cy?: number; s?: number }> = ({
  shape = 'kor',
  color = TILE_COLORS.kek,
  cx = 20,
  cy = 20,
  s = 24
}) => {
  if (shape === 'kor') return <circle cx={cx} cy={cy} r={s / 2} fill={color} stroke="#0f172a" strokeWidth="0.8" />;
  if (shape === 'negyzet') return <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill={color} stroke="#0f172a" strokeWidth="0.8" />;
  return <path d={`M ${cx} ${cy - s / 2} L ${cx + s / 2} ${cy + s / 2} L ${cx - s / 2} ${cy + s / 2} Z`} fill={color} stroke="#0f172a" strokeWidth="0.8" />;
};

export type EqPart = string | { shape: TileShape; color: string };

/** Egyenlet logikai lapokkal: pl. [tile, '+ 25 = 50']. */
export const ShapeEq: React.FC<{ parts?: EqPart[]; y?: number; s?: number }> = ({ parts = [{ shape: 'kor', color: TILE_COLORS.kek }, '+ 25 = 50'], y = 30, s = 26 }) => {
  const cw = 8.6;
  const widths = parts.map((p) => (typeof p === 'string' ? p.length * cw + 8 : s + 8));
  const total = widths.reduce((a, b) => a + b, 0);
  let x = 120 - total / 2;
  return (
    <g>
      {parts.map((p, i) => {
        const x0 = x;
        x += widths[i];
        if (typeof p === 'string')
          return (
            <text key={i} x={x0 + widths[i] / 2} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>
              {p}
            </text>
          );
        return <Tile key={i} shape={p.shape} color={p.color} cx={x0 + widths[i] / 2} cy={y} s={s} />;
      })}
    </g>
  );
};

/** Szakaszos ábra: felül az egész, alatta a részek. */
export const Bars: React.FC<{
  total?: string;
  parts?: { label: string; len: number; color?: string }[];
  y?: number;
  x?: number;
  w?: number;
}> = ({ total = '45 cm', parts = [{ label: '18 cm', len: 18 }, { label: '?', len: 27 }], y = 22, x = 16, w = 208 }) => {
  const sum = parts.reduce((s, p) => s + p.len, 0);
  let cx = x;
  const palette = ['#38bdf8', '#fbbf24', '#a78bfa', '#34d399'];
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={isUnk(total) ? UNK : '#334155'} strokeWidth="1.5" />
      <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#334155" strokeWidth="1.5" />
      <line x1={x + w} y1={y - 5} x2={x + w} y2={y + 5} stroke="#334155" strokeWidth="1.5" />
      <rect x={120 - total.length * 4.5 - 4} y={y - 9} width={total.length * 9 + 8} height="17" rx="4" fill="#f8fafc" />
      <text x="120" y={y + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isUnk(total) ? UNK : INK}>
        {total}
      </text>
      {parts.map((p, i) => {
        const pw = (p.len / sum) * w;
        const x0 = cx;
        cx += pw;
        const unk = isUnk(p.label);
        return (
          <g key={i}>
            <rect
              x={x0}
              y={y + 14}
              width={pw}
              height="24"
              fill={unk ? '#fff1f2' : p.color ?? palette[i % palette.length]}
              stroke={unk ? UNK : '#1e293b'}
              strokeWidth="1.2"
              strokeDasharray={unk ? '4 3' : undefined}
            />
            <text x={x0 + pw / 2} y={y + 31} textAnchor="middle" fontSize="12" fontWeight="bold" fill={unk ? UNK : INK}>
              {p.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Lépcső kockákból: steps fokú lépcső (1 + 2 + … + steps kocka). */
export const Stairs: React.FC<{ x?: number; y?: number; steps?: number; c?: number; label?: string }> = ({ x = 10, y = 70, steps = 3, c = 11, label }) => (
  <g>
    {Array.from({ length: steps }).map((_, col) =>
      Array.from({ length: col + 1 }).map((__, row) => (
        <g key={`${col}-${row}`}>
          <rect x={x + col * c} y={y - (row + 1) * c} width={c} height={c} fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
          <path d={`M ${x + col * c} ${y - (row + 1) * c} l 3 -3 h ${c} l -3 3 Z`} fill="#bae6fd" stroke="#0369a1" strokeWidth="0.6" />
        </g>
      ))
    )}
    <path d={`M ${x + steps * c} ${y} l 3 -3 v ${-steps * c} l -3 3 Z`} fill="#7dd3fc" stroke="#0369a1" strokeWidth="0.6" />
    {label && (
      <text x={x + (steps * c) / 2} y={y + 15} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isUnk(label) ? UNK : INK}>
        {label}
      </text>
    )}
  </g>
);

/** Útvonalak: A → B (ab db út), B → C (bc db út). */
export const Routes: React.FC<{ names?: [string, string, string]; ab?: string[]; bc?: string[]; y?: number }> = ({
  names = ['Falu', 'Város', 'Tó'],
  ab = ['busz', 'vonat', 'autó'],
  bc = ['hajó', 'bicikli'],
  y = 60
}) => {
  const boxes = [
    { x: 6, w: 44 },
    { x: 98, w: 44 },
    { x: 190, w: 44 }
  ];
  const curves = (from: number, to: number, labels: string[], color: string) =>
    labels.map((l, i) => {
      const off = (i - (labels.length - 1) / 2) * 30;
      const x1 = boxes[from].x + boxes[from].w;
      const x2 = boxes[to].x;
      const mx = (x1 + x2) / 2;
      return (
        <g key={`${from}-${i}`}>
          <path d={`M ${x1} ${y} Q ${mx} ${y + off * 1.6} ${x2 - 4} ${y}`} fill="none" stroke={color} strokeWidth="1.6" />
          <path d={`M ${x2} ${y} l -7 -4 v 8 Z`} fill={color} />
          <rect x={mx - 19} y={y + off * 0.8 - 8} width="38" height="15" rx="7" fill="#fff" stroke={color} strokeWidth="1" />
          <text x={mx} y={y + off * 0.8 + 3.5} textAnchor="middle" fontSize="9" fontWeight="bold" fill={INK}>
            {l}
          </text>
        </g>
      );
    });
  return (
    <g>
      {curves(0, 1, ab, '#0284c7')}
      {curves(1, 2, bc, '#16a34a')}
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={y - 14} width={b.w} height="28" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4" />
          <text x={b.x + b.w / 2} y={y + 4} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#78350f">
            {names[i]}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Dominó pöttyminták 0–6. */
const PIPS: Record<number, [number, number][]> = {
  0: [],
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
};

export const DominoHalf: React.FC<{ cx?: number; cy?: number; s?: number; n?: number | '?' }> = ({ cx = 20, cy = 20, s = 30, n = 3 }) => (
  <g>
    {n === '?' ? (
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
        ?
      </text>
    ) : (
      PIPS[n].map(([dx, dy], i) => <circle key={i} cx={cx + dx * s * 0.27} cy={cy + dy * s * 0.27} r={s * 0.085} fill={INK} />)
    )}
  </g>
);

/**
 * Négy dominó négyzetben (3 × 3 mező, a közepe üres).
 * v = [balFelső, felsőKözép, jobbFelső, jobbKözép, jobbAlsó, alsóKözép, balAlsó, balKözép]
 * Bal dominó: balFelső/balKözép (függőleges), felső: felsőKözép|jobbFelső, jobb: jobbKözép/jobbAlsó, alsó: balAlsó|alsóKözép.
 */
export const DominoSquare: React.FC<{ x?: number; y?: number; s?: number; v?: (number | '?')[] }> = ({ x = 75, y = 10, s = 30, v = [4, 2, 4, 1, 5, 2, 3, 3] }) => {
  const cell = (c: number, r: number) => ({ cx: x + c * s + s / 2, cy: y + r * s + s / 2 });
  const pos = [cell(0, 0), cell(1, 0), cell(2, 0), cell(2, 1), cell(2, 2), cell(1, 2), cell(0, 2), cell(0, 1)];
  const dom = (c: number, r: number, w: number, h: number, key: string) => (
    <g key={key}>
      <rect x={x + c * s + 1} y={y + r * s + 1} width={w * s - 2} height={h * s - 2} rx="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      {w === 2 ? (
        <line x1={x + (c + 1) * s} y1={y + r * s + 4} x2={x + (c + 1) * s} y2={y + (r + 1) * s - 4} stroke={INK} strokeWidth="1" />
      ) : (
        <line x1={x + c * s + 4} y1={y + (r + 1) * s} x2={x + (c + 1) * s - 4} y2={y + (r + 1) * s} stroke={INK} strokeWidth="1" />
      )}
    </g>
  );
  return (
    <g>
      {dom(0, 0, 1, 2, 'l')}
      {dom(1, 0, 2, 1, 't')}
      {dom(2, 1, 1, 2, 'r')}
      {dom(0, 2, 2, 1, 'b')}
      {pos.map((p, i) => (
        <DominoHalf key={i} cx={p.cx} cy={p.cy} s={s} n={v[i]} />
      ))}
    </g>
  );
};

/** Csokoládé: rows × cols kocka. */
export const Choco: React.FC<{
  x?: number;
  y?: number;
  rows?: number;
  cols?: number;
  c?: number;
  frame?: string;
  fill?: string;
  stroke?: string;
  round?: boolean;
}> = ({ x = 60, y = 14, rows = 4, cols = 6, c = 18, frame = '#78350f', fill = '#a16207', stroke = '#451a03', round = false }) => (
  <g>
    <rect x={x - 3} y={y - 3} width={cols * c + 6} height={rows * c + 6} rx="4" fill={frame} stroke={round ? stroke : 'none'} />
    {Array.from({ length: rows * cols }).map((_, i) =>
      round ? (
        <circle key={i} cx={x + (i % cols) * c + c / 2} cy={y + Math.floor(i / cols) * c + c / 2} r={c / 2 - 2} fill={fill} stroke={stroke} strokeWidth="0.8" />
      ) : (
        <rect key={i} x={x + (i % cols) * c + 1} y={y + Math.floor(i / cols) * c + 1} width={c - 2} height={c - 2} rx="2" fill={fill} stroke={stroke} strokeWidth="0.8" />
      )
    )}
  </g>
);

/** Étkezőasztalok: n asztal, mindegyik körül seats szék. */
export const DinnerTables: React.FC<{ n?: number; seats?: number; y?: number }> = ({ n = 5, seats = 6, y = 40 }) => {
  const step = 224 / n;
  const tw = Math.min(30, step - 14);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const cx = 8 + step * i + step / 2;
        const half = seats / 2;
        return (
          <g key={i}>
            <rect x={cx - tw / 2} y={y - 12} width={tw} height="24" rx="3" fill="#fde68a" stroke="#92400e" strokeWidth="1.2" />
            {Array.from({ length: half }).map((_, k) => {
              const sx = cx - tw / 2 + (tw / half) * (k + 0.5);
              return (
                <g key={k}>
                  <circle cx={sx} cy={y - 18} r="3.6" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="0.8" />
                  <circle cx={sx} cy={y + 18} r="3.6" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="0.8" />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

/** Szorzótábla-részlet: fejléc a szorzókkal, sorok az első oszlopban. */
export const MulTable: React.FC<{ x?: number; y?: number; head?: (string | number)[]; rows?: (string | number)[][]; c?: number }> = ({
  x = 30,
  y = 12,
  head = [5, 6],
  rows = [[8, '?', 48]],
  c = 30
}) => (
  <g>
    {['·', ...head].map((h, i) => (
      <g key={`h${i}`}>
        <rect x={x + i * c} y={y} width={c} height={c} fill={i === 0 ? '#fff' : '#bbf7d0'} stroke="#15803d" />
        <text x={x + i * c + c / 2} y={y + c / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isUnk(String(h)) ? UNK : INK}>
          {h}
        </text>
      </g>
    ))}
    {rows.map((r, j) =>
      r.map((v, i) => (
        <g key={`r${j}-${i}`}>
          <rect x={x + i * c} y={y + (j + 1) * c} width={c} height={c} fill={i === 0 ? '#bbf7d0' : '#fff'} stroke="#15803d" />
          <text x={x + i * c + c / 2} y={y + (j + 1) * c + c / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isUnk(String(v)) ? UNK : INK}>
            {v}
          </text>
        </g>
      ))
    )}
  </g>
);

/** Kifejezés a műveletek sorrendjének jelölésével: a lépésszámok színes körökben a jelek fölött. */
export const OrderMarks: React.FC<{ tokens?: string[]; order?: (number | null)[]; y?: number; fs?: number }> = ({
  tokens = ['24', '+', '5', '·', '3', '=', '?'],
  order = [null, 2, null, 1, null, null, null],
  y = 52,
  fs = 20
}) => {
  const cw = fs * 0.62;
  const widths = tokens.map((t) => t.length * cw + 10);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = 120 - total / 2;
  return (
    <g>
      {tokens.map((t, i) => {
        const x0 = x;
        x += widths[i];
        const cx = x0 + widths[i] / 2;
        const o = order[i];
        return (
          <g key={i}>
            <text x={cx} y={y} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={isUnk(t) ? UNK : INK}>
              {t}
            </text>
            {o != null && (
              <g>
                <circle cx={cx} cy={y - fs - 8} r="10" fill={o === 1 ? '#7c3aed' : o === 2 ? '#0891b2' : '#ea580c'} />
                <text x={cx} y={y - fs - 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">
                  {o}.
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
