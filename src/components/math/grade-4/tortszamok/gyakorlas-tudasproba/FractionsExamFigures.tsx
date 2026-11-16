import React from 'react';
import { BarG, PieG, fw } from '../tortek-osszehasonlitasa/FractionCompare4Figures';
import { partOf } from '../tortresz-szamitasa/FractionOfAmountFigures';

const Frame: React.FC<{ vb: string; className?: string; children: React.ReactNode }> = ({ vb, className, children }) => (
  <svg viewBox={vb} className={className ?? 'w-full h-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    {children}
  </svg>
);

/** Négyzetrács: rows × cols kis négyzet, a `filled` indexű cellák színesek. */
export const GridG: React.FC<{ x: number; y: number; rows: number; cols: number; cell: number; filled: number[]; color?: string }> = ({ x, y, rows, cols, cell, filled, color = '#84cc16' }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => (
      <rect key={i} x={x + (i % cols) * cell} y={y + Math.floor(i / cols) * cell} width={cell} height={cell} fill={filled.includes(i) ? color : '#ffffff'} stroke="#475569" strokeWidth={1.2} />
    ))}
    <rect x={x} y={y} width={cols * cell} height={rows * cell} fill="none" stroke="#1e293b" strokeWidth={2} />
  </g>
);

// ---------------------------------------------------------------------------
// TK 152/20: társasjáték – a mező színe egy számot jelent
// ---------------------------------------------------------------------------
export type BoardColor = 'kék' | 'piros' | 'zöld' | 'narancs';
export const BOARD_VALUES: Record<BoardColor, number> = { kék: 1200, piros: 2400, zöld: 6000, narancs: 3200 };
export const BOARD_FILL: Record<BoardColor, string> = { kék: '#0ea5e9', piros: '#dc2626', zöld: '#65a30d', narancs: '#f97316' };

/** A játéktábla mezői a RAJT-tól a CÉL-ig (a tankönyv 152. oldala szerint). */
export const BOARD_FIELDS: { c: BoardColor; n: number; d: number }[] = [
  { c: 'narancs', n: 1, d: 2 },
  { c: 'zöld', n: 1, d: 2 },
  { c: 'kék', n: 1, d: 3 },
  { c: 'piros', n: 3, d: 4 },
  { c: 'zöld', n: 5, d: 10 },
  { c: 'narancs', n: 2, d: 4 },
  { c: 'piros', n: 1, d: 2 },
  { c: 'narancs', n: 3, d: 4 },
  { c: 'zöld', n: 1, d: 10 },
  { c: 'kék', n: 3, d: 4 },
  { c: 'piros', n: 1, d: 3 },
  { c: 'narancs', n: 1, d: 4 },
  { c: 'zöld', n: 3, d: 10 },
  { c: 'kék', n: 2, d: 4 },
  { c: 'piros', n: 2, d: 4 },
  { c: 'kék', n: 2, d: 3 },
  { c: 'zöld', n: 1, d: 100 },
  { c: 'narancs', n: 1, d: 10 }
];
export const boardFieldValue = (i: number): number => {
  const f = BOARD_FIELDS[i];
  return partOf(BOARD_VALUES[f.c], f.n, f.d);
};

/** A mezők helye a táblán (kígyózó út, mint a tankönyvben). index -1 = RAJT, BOARD_FIELDS.length = CÉL. */
export const boardCell = (i: number): { x: number; y: number } => {
  // 5 sor × 4 oszlop rács, kígyózva
  const layout: [number, number][] = [
    [0, 0], // RAJT
    [1, 0], [2, 0], [3, 0],
    [3, 1], [3, 2],
    [3, 3], [2, 3], [1, 3], [0, 3],
    [0, 4],
    [0, 5], [1, 5], [2, 5], [3, 5],
    [3, 6],
    [3, 7], [2, 7], [1, 7],
    [0, 7] // CÉL
  ];
  const [cx, cy] = layout[i + 1];
  return { x: 10 + cx * 110, y: 50 + cy * 34 };
};

export const BoardGameG: React.FC<{ token?: number; ask?: number }> = ({ token, ask }) => (
  <g>
    {(Object.keys(BOARD_VALUES) as BoardColor[]).map((c, i) => (
      <g key={c}>
        <rect x={10 + i * 110} y={8} width={100} height={28} rx={14} fill={BOARD_FILL[c]} />
        <text x={60 + i * 110} y={27} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#ffffff">
          {BOARD_VALUES[c]}
        </text>
      </g>
    ))}
    {Array.from({ length: BOARD_FIELDS.length + 2 }, (_, k) => {
      const i = k - 1;
      const { x, y } = boardCell(i);
      const isEnd = i === -1 || i === BOARD_FIELDS.length;
      const f = BOARD_FIELDS[i];
      return (
        <g key={k}>
          <rect x={x} y={y} width={100} height={30} rx={6} fill={isEnd ? '#ffffff' : BOARD_FILL[f.c]} stroke={i === ask ? '#facc15' : '#334155'} strokeWidth={i === ask ? 4 : 1.2} />
          <text x={x + 50} y={y + 20} fontSize="13" fontWeight="bold" textAnchor="middle" fill={isEnd ? '#0f172a' : '#ffffff'}>
            {i === -1 ? 'RAJT' : isEnd ? 'CÉL' : fw(f.n, f.d)}
          </text>
          {token === i && <circle cx={x + 92} cy={y + 6} r={9} fill="#facc15" stroke="#713f12" strokeWidth={2} />}
        </g>
      );
    })}
  </g>
);

export const BoardGameSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 450 330" className={className}>
    <rect x="1" y="1" width="448" height="328" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <BoardGameG />
  </Frame>
);

// ---------------------------------------------------------------------------
// „Amit már tudsz”: a fejezet összefoglalása egy ábrán
// ---------------------------------------------------------------------------
export const ChapterSummarySvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 520 210" className={className}>
    <rect x="1" y="1" width="518" height="208" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    {[
      { cx: 60, p: 4, n: 1, t: '1 negyed' },
      { cx: 170, p: 4, n: 3, t: '3 negyed' },
      { cx: 280, p: 4, n: 4, t: '4 negyed = 1 egész', two: true }
    ].map((c) => (
      <g key={c.t}>
        <PieG cx={c.cx} cy={78} r={44} parts={c.p} filled={c.n} pizza />
        <text x={c.cx} y={146} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9a3412">
          {'two' in c ? '4 negyed' : c.t}
        </text>
        {'two' in c && (
          <text x={c.cx} y={162} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9a3412">
            = 1 egész
          </text>
        )}
      </g>
    ))}
    <PieG cx={395} cy={78} r={44} parts={4} filled={4} pizza />
    <PieG cx={470} cy={78} r={30} parts={4} filled={1} pizza />
    <text x={430} y={146} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9a3412">
      5 negyed =
    </text>
    <text x={430} y={162} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9a3412">
      1 egész és 1 negyed
    </text>
    <text x={115} y={176} fontSize="12" textAnchor="middle" fill="#334155">
      egynél kisebb törtek
    </text>
    <text x={430} y={180} fontSize="12" textAnchor="middle" fill="#334155">
      egynél nagyobb tört
    </text>
    <text x={260} y={200} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      12-nek a 3 negyede: 12 : 4 · 3 = 9
    </text>
  </Frame>
);

// ---------------------------------------------------------------------------
// MF II/78, 3–4. feladat: síkidomok megadott része és a 2400 értékű téglalap
// ---------------------------------------------------------------------------
export const SHAPE_PARTS: { label: string; rows: number; cols: number; filled: number[] }[] = [
  { label: 'harmada', rows: 3, cols: 3, filled: [0, 1, 2] },
  { label: 'negyede', rows: 2, cols: 2, filled: [0] },
  { label: 'ötöde', rows: 2, cols: 5, filled: [0, 5] },
  { label: 'fele', rows: 2, cols: 4, filled: [0, 1, 4, 5] }
];

export const ShapePartsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 500 150" className={className}>
    <rect x="1" y="1" width="498" height="148" rx="14" fill="#f7fee7" stroke="#d9f99d" />
    {SHAPE_PARTS.map((s, i) => {
      const cell = 22;
      const x = [20, 130, 220, 360][i];
      return (
        <g key={s.label}>
          <GridG x={x} y={24} rows={s.rows} cols={s.cols} cell={cell} filled={s.filled} />
          <text x={x + (s.cols * cell) / 2} y={124} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#3f6212">
            {s.label}
          </text>
        </g>
      );
    })}
  </Frame>
);

export const RECT_VALUES: { label: string; value: number }[] = [
  { label: 'fele', value: 1200 },
  { label: '1 harmada', value: 800 },
  { label: '1 tizenkettede', value: 200 },
  { label: '1 negyede', value: 600 }
];

export const RectValueSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 500 160" className={className}>
    <rect x="1" y="1" width="498" height="158" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="250" y="20" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#166534">
      Az egész téglalap értéke 2400
    </text>
    {/* fele: felső sáv */}
    <g>
      <rect x={20} y={34} width={90} height={30} fill="#84cc16" stroke="#334155" strokeWidth={1.5} />
      <rect x={20} y={64} width={90} height={30} fill="#ffffff" stroke="#334155" strokeWidth={1.5} />
    </g>
    {/* 1 harmad: 3 vízszintes sáv, középső színes */}
    <g>
      <rect x={140} y={34} width={90} height={20} fill="#ffffff" stroke="#334155" strokeWidth={1.5} />
      <rect x={140} y={54} width={90} height={20} fill="#84cc16" stroke="#334155" strokeWidth={1.5} />
      <rect x={140} y={74} width={90} height={20} fill="#ffffff" stroke="#334155" strokeWidth={1.5} />
    </g>
    <GridG x={260} y={34} rows={2} cols={6} cell={15} filled={[2]} />
    <GridG x={380} y={34} rows={2} cols={2} cell={30} filled={[3]} />
    {RECT_VALUES.map((r, i) => (
      <g key={r.label}>
        <text x={[65, 185, 305, 410][i]} y={118} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
          {r.label}
        </text>
        <text x={[65, 185, 305, 410][i]} y={140} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#15803d">
          {r.value}
        </text>
      </g>
    ))}
  </Frame>
);

// ---------------------------------------------------------------------------
// MF II/83, 9. feladat: a nomád tábor 180 diákja
// ---------------------------------------------------------------------------
export const CampSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 480 190" className={className}>
    <rect x="1" y="1" width="478" height="188" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="240" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#075985">
      A nomád tábor: 180 diák
    </text>
    <rect x={30} y={36} width={210} height={34} fill="#3b82f6" stroke="#334155" strokeWidth={1.5} />
    <rect x={240} y={36} width={70} height={34} fill="#22c55e" stroke="#334155" strokeWidth={1.5} />
    <rect x={310} y={36} width={140} height={34} fill="#d6a463" stroke="#334155" strokeWidth={1.5} />
    <text x={135} y={58} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">kék sátor: 90</text>
    <text x={275} y={58} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#ffffff">zöld: 30</text>
    <text x={380} y={58} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">jurta: 60</text>
    <path d="M 240 78 L 240 86 L 450 86 L 450 78" fill="none" stroke="#334155" strokeWidth={1.5} />
    <text x={345} y={100} fontSize="11" textAnchor="middle" fill="#334155">a maradék: 180 − 90 = 90 diák</text>
    <text x={30} y={126} fontSize="12" fill="#334155">1. a diákok fele: 180 : 2 = <tspan fontWeight="bold">90</tspan> (kék sátor)</text>
    <text x={30} y={146} fontSize="12" fill="#334155">2. a maradék harmada: 90 : 3 = <tspan fontWeight="bold">30</tspan> (zöld sátor)</text>
    <text x={30} y={166} fontSize="12" fill="#334155">3. a többiek: 90 − 30 = <tspan fontWeight="bold">60</tspan> (jurta)</text>
  </Frame>
);

// ---------------------------------------------------------------------------
// MF II/83, 8. feladat: „Mit tapasztaltál?” 1 ketted, 4 nyolcad, 2 negyed
// ---------------------------------------------------------------------------
export const SameHalfCirclesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 420 160" className={className}>
    <rect x="1" y="1" width="418" height="158" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
    {[
      { p: 2, n: 1 },
      { p: 8, n: 4 },
      { p: 4, n: 2 }
    ].map((c, i) => (
      <g key={c.p}>
        <PieG cx={70 + i * 140} cy={70} r={46} parts={c.p} filled={c.n} color="#c026d3" empty="#ffffff" />
        <text x={70 + i * 140} y={140} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#86198f">
          {fw(c.n, c.p)}
        </text>
        {i < 2 && (
          <text x={140 + i * 140} y={78} fontSize="26" fontWeight="bold" textAnchor="middle" fill="#a21caf">
            =
          </text>
        )}
      </g>
    ))}
  </Frame>
);

// ---------------------------------------------------------------------------
// A törtrész neve: táblázat-ábra a csíkokkal (1 ketted … 1 tized)
// ---------------------------------------------------------------------------
export const PartNamesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 460 210" className={className}>
    <rect x="1" y="1" width="458" height="208" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {[2, 3, 4, 5, 6, 8, 10].map((d, i) => (
      <g key={d}>
        <text x={110} y={34 + i * 26} fontSize="12" fontWeight="bold" textAnchor="end" fill="#334155">
          {d} egyenlő rész:
        </text>
        <BarG x={120} y={20 + i * 26} w={220} h={20} parts={d} filled={1} color="#f97316" />
        <text x={350} y={34 + i * 26} fontSize="12" fontWeight="bold" fill="#9a3412">
          {fw(1, d)}
        </text>
      </g>
    ))}
  </Frame>
);
