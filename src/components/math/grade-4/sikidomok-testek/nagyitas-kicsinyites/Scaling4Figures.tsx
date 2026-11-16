import React from 'react';

// ---------------------------------------------------------------------------
// Közös segédek: négyzetrács
// ---------------------------------------------------------------------------
const GridLines: React.FC<{ x0: number; y0: number; cols: number; rows: number; u: number; color?: string }> = ({
  x0,
  y0,
  cols,
  rows,
  u,
  color = '#cbd5e1'
}) => (
  <g>
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke={color} strokeWidth="0.8" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke={color} strokeWidth="0.8" />
    ))}
  </g>
);

type Cell = [number, number];

/** Cellákból álló alakzat kirajzolása s-szeres nagyításban. */
const Cells: React.FC<{ cells: Cell[]; x0: number; y0: number; u: number; s?: number; fill: string; stroke: string }> = ({
  cells,
  x0,
  y0,
  u,
  s = 1,
  fill,
  stroke
}) => (
  <g>
    {cells.map(([c, r]) => (
      <rect key={`${c}-${r}`} x={x0 + c * s * u} y={y0 + r * s * u} width={s * u} height={s * u} fill={fill} stroke={stroke} strokeWidth="1" />
    ))}
  </g>
);

/** Ház: test (w széles, h magas) + tető (a test fölött, mindkét oldalon w/2-vel túllóg). */
const House: React.FC<{ x: number; yBottom: number; w: number; u: number }> = ({ x, yBottom, w, u }) => {
  const bodyTop = yBottom - w * u;
  const roofL = x - (w / 2) * u;
  const roofR = x + w * u + (w / 2) * u;
  const apexX = x + (w / 2) * u;
  const apexY = bodyTop - w * u;
  return (
    <g>
      <rect x={x} y={bodyTop} width={w * u} height={w * u} fill="#fcd34d" stroke="#b45309" strokeWidth="1.2" />
      <polygon points={`${roofL},${bodyTop} ${apexX},${apexY} ${roofR},${bodyTop}`} fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
    </g>
  );
};

// ---------------------------------------------------------------------------
// 1. Nagyító és térkép (TK 126/1.)
// ---------------------------------------------------------------------------
export const MagnifierMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="358" height="198" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    {/* Bal: nagyító és katica */}
    <text x="90" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">NAGYÍTÁS</text>
    <g>
      <circle cx="40" cy="150" r="6" fill="#dc2626" />
      <circle cx="40" cy="146" r="2.5" fill="#111827" />
      <line x1="40" y1="144" x2="40" y2="156" stroke="#111827" strokeWidth="0.8" />
    </g>
    <line x1="46" y1="146" x2="72" y2="112" stroke="#94a3b8" strokeDasharray="3 3" />
    <circle cx="105" cy="90" r="46" fill="#ffffff" stroke="#1e3a8a" strokeWidth="6" />
    <line x1="138" y1="124" x2="168" y2="160" stroke="#78350f" strokeWidth="11" strokeLinecap="round" />
    <g>
      <circle cx="105" cy="96" r="26" fill="#dc2626" />
      <circle cx="105" cy="74" r="11" fill="#111827" />
      <line x1="105" y1="70" x2="105" y2="122" stroke="#111827" strokeWidth="2" />
      <circle cx="94" cy="92" r="4.5" fill="#111827" />
      <circle cx="116" cy="92" r="4.5" fill="#111827" />
      <circle cx="96" cy="108" r="4" fill="#111827" />
      <circle cx="114" cy="108" r="4" fill="#111827" />
    </g>
    <text x="90" y="186" textAnchor="middle" fontSize="11" fill="#334155">A nagyító nagyobbnak mutatja</text>
    {/* Jobb: földgömb és térkép */}
    <text x="270" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">KICSINYÍTÉS</text>
    <circle cx="235" cy="92" r="40" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
    <path d="M215 70 q10 -8 22 0 q6 10 -4 16 q-12 4 -18 -6z" fill="#22c55e" />
    <path d="M238 98 q14 -6 20 6 q-2 16 -16 18 q-8 -10 -4 -24z" fill="#22c55e" />
    <line x1="235" y1="132" x2="235" y2="150" stroke="#475569" strokeWidth="3" />
    <rect x="218" y="150" width="34" height="6" rx="3" fill="#475569" />
    <rect x="285" y="60" width="62" height="70" rx="4" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" />
    <path d="M292 70 q12 -4 20 6 q10 10 28 4" fill="none" stroke="#0ea5e9" strokeWidth="2" />
    <path d="M300 95 q8 -10 18 0 q8 8 20 -2" fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <circle cx="314" cy="112" r="3" fill="#dc2626" />
    <text x="270" y="186" textAnchor="middle" fontSize="11" fill="#334155">A földgömb és a térkép a valóság kicsinyített mása</text>
  </svg>
);

// ---------------------------------------------------------------------------
// 2. A gyerekek házikói (TK 126/2.)
// ---------------------------------------------------------------------------
export const HouseDrawingsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 11;
  const x0 = 12;
  const y0 = 30;
  const cols = 30;
  const rows = 9;
  const yb = y0 + rows * u;
  return (
    <svg viewBox="0 0 354 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="352" height="158" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={x0} y0={y0} cols={cols} rows={rows} u={u} />
      <House x={x0 + 2 * u} yBottom={yb} w={2} u={u} />
      <House x={x0 + 8 * u} yBottom={yb} w={1} u={u} />
      <House x={x0 + 15 * u} yBottom={yb} w={4} u={u} />
      <House x={x0 + 25 * u} yBottom={yb} w={2} u={u} />
      {[
        { x: x0 + 3 * u, t: 'eredeti', c: '#0f172a' },
        { x: x0 + 8.5 * u, t: 'Ábel', c: '#1d4ed8' },
        { x: x0 + 17 * u, t: 'Kata', c: '#be185d' },
        { x: x0 + 26 * u, t: 'Gábor', c: '#047857' }
      ].map((l) => (
        <text key={l.t} x={l.x} y={20} textAnchor="middle" fontSize="12" fontWeight="bold" fill={l.c}>
          {l.t}
        </text>
      ))}
      <text x="177" y="152" textAnchor="middle" fontSize="10.5" fill="#475569">
        Ábel: felére kicsinyített • Kata: kétszeresére nagyított • Gábor: ugyanakkora
      </text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 3. Kétszeresére nagyított fa (TK 127/3.)
// ---------------------------------------------------------------------------
const TREE_CROWN: Cell[] = [
  [1, 0], [2, 0],
  [0, 1], [1, 1], [2, 1], [3, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
  [1, 3], [2, 3]
];
const TREE_TRUNK: Cell[] = [[1, 4], [1, 5]];

export const TreeDoubleSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 12;
  return (
    <svg viewBox="0 0 330 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="328" height="188" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={12} y0={24} cols={26} rows={13} u={u} />
      {/* eredeti: 4 széles, 6 magas */}
      <Cells cells={TREE_CROWN} x0={12 + u} y0={24 + 6 * u} u={u} fill="#4ade80" stroke="#166534" />
      <Cells cells={TREE_TRUNK} x0={12 + u} y0={24 + 6 * u} u={u} fill="#92400e" stroke="#451a03" />
      {/* kétszeres: 8 széles, 12 magas */}
      <Cells cells={TREE_CROWN} x0={12 + 10 * u} y0={24} u={u} s={2} fill="#4ade80" stroke="#166534" />
      <Cells cells={TREE_TRUNK} x0={12 + 10 * u} y0={24} u={u} s={2} fill="#92400e" stroke="#451a03" />
      <text x={12 + 3 * u} y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">eredeti</text>
      <text x={12 + 14 * u} y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">kétszeresére nagyítva</text>
      <text x={12 + 23 * u} y={24 + 4 * u} textAnchor="middle" fontSize="10" fill="#334155">1 kis négyzet</text>
      <text x={12 + 23 * u} y={24 + 5 * u} textAnchor="middle" fontSize="10" fill="#334155">helyett</text>
      <rect x={12 + 22 * u} y={24 + 6 * u} width={2 * u} height={2 * u} fill="#bfdbfe" stroke="#1d4ed8" />
      <text x={12 + 23 * u} y={24 + 9.3 * u} textAnchor="middle" fontSize="10" fill="#334155">2 · 2 kis négyzet</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 4. Hasonló vagy nem? (TK 127/4.)
// ---------------------------------------------------------------------------
export const SimilarPairsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 12;
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="148" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={10} y0={20} cols={28} rows={8} u={u} />
      {/* a) körök */}
      <text x="16" y="15" fontSize="11" fontWeight="bold" fill="#0f172a">a)</text>
      <circle cx={10 + 1.5 * u} cy={20 + 2 * u} r={u} fill="#1e3a8a" />
      <circle cx={10 + 5 * u} cy={20 + 5 * u} r={2 * u} fill="#1e3a8a" />
      <text x={10 + 4 * u} y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">hasonló ✓</text>
      {/* b) téglalapok 2·1 és 4·2 */}
      <text x={16 + 9 * u} y="15" fontSize="11" fontWeight="bold" fill="#0f172a">b)</text>
      <rect x={10 + 10 * u} y={20 + 1 * u} width={2 * u} height={u} fill="#4ade80" stroke="#166534" />
      <rect x={10 + 10 * u} y={20 + 4 * u} width={4 * u} height={2 * u} fill="#4ade80" stroke="#166534" />
      <text x={10 + 12.5 * u} y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">hasonló ✓</text>
      {/* c) téglalapok 6·1 és 6·2 */}
      <text x={16 + 17 * u} y="15" fontSize="11" fontWeight="bold" fill="#0f172a">c)</text>
      <rect x={10 + 19 * u} y={20 + 1 * u} width={6 * u} height={u} fill="#fb923c" stroke="#9a3412" />
      <rect x={10 + 19 * u} y={20 + 4 * u} width={6 * u} height={2 * u} fill="#fb923c" stroke="#9a3412" />
      <text x={10 + 22 * u} y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">nem hasonló ✗</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. Nyilas lépéssor kétszerezve és kettővel növelve (TK 127/5.)
// ---------------------------------------------------------------------------
export const ArrowStepsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 11;
  const y0 = 34;
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="148" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={10} y0={y0} cols={30} rows={7} u={u} />
      {/* eredeti 2 · 3 */}
      <rect x={10 + 2 * u} y={y0 + 2 * u} width={2 * u} height={3 * u} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.5" />
      <circle cx={10 + 2 * u} cy={y0 + 2 * u} r="3" fill="#dc2626" />
      {/* kétszerezve 4 · 6 */}
      <rect x={10 + 8 * u} y={y0 + 0.5 * u} width={4 * u} height={6 * u} fill="#dcfce7" stroke="#15803d" strokeWidth="2.5" />
      <circle cx={10 + 8 * u} cy={y0 + 0.5 * u} r="3" fill="#dc2626" />
      {/* kettővel növelve 4 · 5 */}
      <rect x={10 + 19 * u} y={y0 + 1 * u} width={4 * u} height={5 * u} fill="#fee2e2" stroke="#b91c1c" strokeWidth="2.5" />
      <circle cx={10 + 19 * u} cy={y0 + 1 * u} r="3" fill="#dc2626" />
      <text x={10 + 3 * u} y="14" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1d4ed8">eredeti</text>
      <text x={10 + 3 * u} y="27" textAnchor="middle" fontSize="10" fill="#1d4ed8">2→, 3↓, 2←, 3↑</text>
      <text x={10 + 10 * u} y="14" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">kétszerezve</text>
      <text x={10 + 10 * u} y="27" textAnchor="middle" fontSize="10" fill="#15803d">4→, 6↓, 4←, 6↑</text>
      <text x={10 + 21 * u} y="14" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b91c1c">kettőt hozzáadva</text>
      <text x={10 + 21 * u} y="27" textAnchor="middle" fontSize="10" fill="#b91c1c">4→, 5↓, 4←, 5↑</text>
      <text x={10 + 10 * u} y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">hasonló ✓</text>
      <text x={10 + 21 * u} y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">nem hasonló ✗</text>
      <text x="180" y="143" textAnchor="middle" fontSize="9.5" fill="#475569">A piros pont a kezdőpont.</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 6. Jó és rossz nagyítás (TK 127/6.) – mosolygó arc
// ---------------------------------------------------------------------------
const Smiley: React.FC<{ cx: number; cy: number; rx: number; ry: number }> = ({ cx, cy, rx, ry }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#facc15" stroke="#a16207" strokeWidth="2" />
    <ellipse cx={cx - rx * 0.35} cy={cy - ry * 0.25} rx={rx * 0.1} ry={ry * 0.14} fill="#111827" />
    <ellipse cx={cx + rx * 0.35} cy={cy - ry * 0.25} rx={rx * 0.1} ry={ry * 0.14} fill="#111827" />
    <path
      d={`M${cx - rx * 0.5} ${cy + ry * 0.2} Q${cx} ${cy + ry * 0.7} ${cx + rx * 0.5} ${cy + ry * 0.2}`}
      fill="none"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
);

export const WrongScalingSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="358" height="158" rx="12" fill="#fff7ed" stroke="#fed7aa" />
    <Smiley cx={50} cy={80} rx={24} ry={24} />
    <Smiley cx={140} cy={80} rx={44} ry={44} />
    <Smiley cx={268} cy={80} rx={70} ry={30} />
    <text x="50" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">eredeti</text>
    <text x="140" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">jó nagyítás ✓</text>
    <text x="268" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">elnyúlt, nem hasonló ✗</text>
  </svg>
);
