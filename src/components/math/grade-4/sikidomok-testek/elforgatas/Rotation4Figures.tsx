import React from 'react';

// ---------------------------------------------------------------------------
// Segédek
// ---------------------------------------------------------------------------
type Pt = [number, number];
/** Elforgatás képernyő-koordinátában (y lefelé nő): q negyed fordulat jobbra (óramutató járásával megegyezően). */
export const rotQ = ([x, y]: Pt, q: number): Pt => {
  let p: Pt = [x, y];
  const n = ((q % 4) + 4) % 4;
  for (let i = 0; i < n; i++) p = [-p[1], p[0]];
  return p;
};

const poly = (pts: Pt[], cx: number, cy: number, u: number) => pts.map(([x, y]) => `${cx + x * u},${cy + y * u}`).join(' ');

/** Derékszög jele: negyedkörív ponttal (magyar jelölés). */
const RightMark: React.FC<{ v: Pt; u1: Pt; u2: Pt; r?: number; color?: string }> = ({ v, u1, u2, r = 14, color = '#0f172a' }) => {
  const a: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const b: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const sweep = cross > 0 ? 1 : 0;
  const bis: Pt = [u1[0] + u2[0], u1[1] + u2[1]];
  const bl = Math.hypot(bis[0], bis[1]) || 1;
  const d: Pt = [v[0] + (bis[0] / bl) * r * 0.55, v[1] + (bis[1] / bl) * r * 0.55];
  return (
    <g>
      <path d={`M${a[0]} ${a[1]} A ${r} ${r} 0 0 ${sweep} ${b[0]} ${b[1]}`} fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx={d[0]} cy={d[1]} r="1.8" fill={color} />
    </g>
  );
};

const CurvedArrow: React.FC<{ cx: number; cy: number; r: number; from: number; to: number; color: string; w?: number }> = ({ cx, cy, r, from, to, color, w = 2.5 }) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const p1: Pt = [cx + r * Math.cos(rad(from)), cy + r * Math.sin(rad(from))];
  const p2: Pt = [cx + r * Math.cos(rad(to)), cy + r * Math.sin(rad(to))];
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const sweep = to > from ? 1 : 0;
  // nyílhegy érintő irányban
  const t = rad(to) + (sweep ? Math.PI / 2 : -Math.PI / 2);
  const h = 8;
  const a1: Pt = [p2[0] - h * Math.cos(t - 0.5), p2[1] - h * Math.sin(t - 0.5)];
  const a2: Pt = [p2[0] - h * Math.cos(t + 0.5), p2[1] - h * Math.sin(t + 0.5)];
  return (
    <g>
      <path d={`M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`} fill="none" stroke={color} strokeWidth={w} />
      <polygon points={`${p2[0].toFixed(1)},${p2[1].toFixed(1)} ${a1[0].toFixed(1)},${a1[1].toFixed(1)} ${a2[0].toFixed(1)},${a2[1].toFixed(1)}`} fill={color} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// 1. Forgó tárgyak (TK 129/1.)
// ---------------------------------------------------------------------------
export const SpinningThingsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f0fdfa" stroke="#99f6e4" />
    {/* körhinta */}
    <g>
      <polygon points="45,30 20,52 70,52" fill="#ef4444" stroke="#991b1b" />
      <line x1="45" y1="52" x2="45" y2="98" stroke="#a16207" strokeWidth="3" />
      <rect x="22" y="58" width="10" height="14" rx="3" fill="#f59e0b" />
      <rect x="58" y="62" width="10" height="14" rx="3" fill="#60a5fa" />
      <ellipse cx="45" cy="100" rx="30" ry="7" fill="#dc2626" />
      <CurvedArrow cx={45} cy={112} r={22} from={200} to={340} color="#0d9488" />
      <text x="45" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">körhinta</text>
    </g>
    {/* pörgettyű */}
    <g>
      <line x1="135" y1="28" x2="135" y2="44" stroke="#0369a1" strokeWidth="3" />
      <path d="M105 60 Q135 40 165 60 L135 102 Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
      <ellipse cx="135" cy="60" rx="30" ry="7" fill="#7dd3fc" stroke="#0369a1" />
      <CurvedArrow cx={135} cy={60} r={40} from={200} to={340} color="#0d9488" />
      <text x="135" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">pörgettyű</text>
    </g>
    {/* földgömb */}
    <g>
      <circle cx="225" cy="66" r="32" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
      <path d="M205 52 q10 -8 20 0 q4 10 -6 14 q-10 2 -14 -14z" fill="#22c55e" />
      <path d="M230 72 q12 -4 16 6 q-2 12 -14 12 q-6 -8 -2 -18z" fill="#22c55e" />
      <line x1="215" y1="28" x2="236" y2="104" stroke="#475569" strokeWidth="2" />
      <rect x="210" y="106" width="30" height="6" rx="3" fill="#475569" />
      <CurvedArrow cx={225} cy={66} r={40} from={20} to={160} color="#0d9488" />
      <text x="225" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">földgömb</text>
    </g>
    {/* forgó */}
    <g>
      <ellipse cx="315" cy="82" rx="36" ry="14" fill="#fde047" stroke="#a16207" />
      <path d="M279 82 A36 14 0 0 1 315 68 L315 82 Z" fill="#f87171" />
      <path d="M315 68 A36 14 0 0 1 351 82 L315 82 Z" fill="#60a5fa" />
      <line x1="315" y1="82" x2="315" y2="50" stroke="#15803d" strokeWidth="3" />
      <line x1="290" y1="56" x2="340" y2="56" stroke="#15803d" strokeWidth="3" />
      <CurvedArrow cx={315} cy={82} r={30} from={20} to={160} color="#0d9488" />
      <text x="315" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">játszótéri forgó</text>
    </g>
  </svg>
);

// ---------------------------------------------------------------------------
// 2. Sablon gombostűvel: virág (TK 129/2. b)
// ---------------------------------------------------------------------------
export const PinTemplateSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const c: Pt = [250, 90];
  return (
    <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="178" rx="14" fill="#ffffff" stroke="#e2e8f0" />
      <ellipse cx="50" cy="80" rx="13" ry="40" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      <text x="50" y="140" textAnchor="middle" fontSize="11" fill="#334155">sablon</text>
      <ellipse cx="120" cy="80" rx="13" ry="40" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      <circle cx="120" cy="118" r="4.5" fill="#dc2626" />
      <line x1="135" y1="150" x2="122" y2="122" stroke="#0f172a" strokeWidth="1.2" />
      <text x="140" y="164" textAnchor="middle" fontSize="11" fill="#334155">gombostű helye</text>
      <circle cx={c[0]} cy={c[1]} r="84" fill="#fb923c" />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx={c[0]}
          cy={c[1] - 38}
          rx="12"
          ry="38"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="1.3"
          transform={`rotate(${i * 30} ${c[0]} ${c[1]})`}
        />
      ))}
      <circle cx={c[0]} cy={c[1]} r="5" fill="#dc2626" />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 3. Fordulatok: negyed, fél, háromnegyed, egész
// ---------------------------------------------------------------------------
export const TurnAmountsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const items = [
    { t: 'negyed fordulat', end: 0, label: '1 derékszög' },
    { t: 'fél fordulat', end: 90, label: '2 derékszög' },
    { t: 'háromnegyed', end: 180, label: '3 derékszög' },
    { t: 'egész fordulat', end: 269, label: '4 derékszög' }
  ];
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#ffffff" stroke="#e2e8f0" />
      {items.map((it, i) => {
        const cx = 48 + i * 88;
        const cy = 66;
        const rad = (d: number) => (d * Math.PI) / 180;
        const ex = cx + 34 * Math.cos(rad(it.end));
        const ey = cy + 34 * Math.sin(rad(it.end));
        return (
          <g key={it.t}>
            <circle cx={cx} cy={cy} r="38" fill="#f0fdfa" stroke="#99f6e4" />
            <line x1={cx} y1={cy} x2={cx} y2={cy - 34} stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 3" />
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#0d9488" strokeWidth="4" strokeLinecap="round" />
            <CurvedArrow cx={cx} cy={cy} r={22} from={-90} to={it.end - 8} color="#ea580c" w={2.2} />
            {i === 0 && <RightMark v={[cx, cy]} u1={[0, -1]} u2={[1, 0]} r={11} />}
            <circle cx={cx} cy={cy} r="3.5" fill="#0f172a" />
            <text x={cx} y={122} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">
              {it.t}
            </text>
            <text x={cx} y={138} textAnchor="middle" fontSize="10" fill="#475569">
              {it.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 4. Logikai lapokból épített alakzat negyed fordulatokkal (TK 129/3.)
// ---------------------------------------------------------------------------
const BUILD_SQ: Pt[] = [[0, -1], [0, -2], [1, 0], [2, 0]]; // négyzetek bal felső sarka (a sarok-négyzet [0,0] körül)
const BUILD_CIRC: Pt[] = [[0.5, -2.5], [3.5, 0.5]];

export const QuarterTurnsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 13;
  const panels = ['eredeti', 'negyed fordulat', 'fél fordulat', 'háromnegyed'];
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#ffffff" stroke="#e2e8f0" />
      {panels.map((p, q) => {
        const pc = 46 + q * 89;
        const cx = q < 2 ? pc - 1.5 * u : pc + 1.5 * u;
        const cy = q === 0 || q === 3 ? 80 + 1.5 * u : 80 - 1.5 * u;
        // négyzetek: a cella középpontját forgatjuk a (0.5, 0.5) pont körül (a sarokcella közepe)
        const cells: Pt[] = [[0, 0], ...BUILD_SQ];
        return (
          <g key={p}>
            {cells.map(([c, r], i) => {
              const [rx, ry] = rotQ([c + 0.5 - 0.5, r + 0.5 - 0.5], q);
              return (
                <g key={i}>
                  <rect x={cx + (rx - 0.5) * u} y={cy + (ry - 0.5) * u} width={u} height={u} fill="#22c55e" stroke="#14532d" />
                  <circle cx={cx + rx * u} cy={cy + ry * u} r="2.6" fill="#ffffff" />
                </g>
              );
            })}
            {BUILD_CIRC.map(([c, r], i) => {
              const [rx, ry] = rotQ([c - 0.5, r - 0.5], q);
              return <circle key={`c${i}`} cx={cx + rx * u} cy={cy + ry * u} r={u * 0.55} fill="#facc15" stroke="#a16207" />;
            })}
            <text x={pc} y={150} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#134e4a">
              {p}
            </text>
          </g>
        );
      })}
      <text x="180" y="164" textAnchor="middle" fontSize="9.5" fill="#475569">Mindig negyed fordulattal jobbra forgatjuk (a sarokban lévő négyzet körül).</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. Másolópapír + tű: a piros csúcs az X pontba kerül (TK 129/4.)
// ---------------------------------------------------------------------------
export const TracingPaperSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  // tű: (90,140); piros csúcs: (90,90) → X: (140,140) – negyed fordulat jobbra
  const pin: Pt = [90, 140];
  const tri: Pt[] = [[40, 30], [40, 90], [90, 90]];
  const rot = (p: Pt): Pt => {
    const r = rotQ([p[0] - pin[0], p[1] - pin[1]], 1);
    return [pin[0] + r[0], pin[1] + r[1]];
  };
  const tri2 = tri.map(rot);
  const ps = (pts: Pt[]) => pts.map((p) => p.join(',')).join(' ');
  return (
    <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="298" height="198" rx="14" fill="#ffffff" stroke="#fecaca" strokeWidth="2" />
      <polygon points={ps(tri)} fill="#818cf8" stroke="#3730a3" strokeWidth="1.5" />
      <RightMark v={[40, 90]} u1={[0, -1]} u2={[1, 0]} r={12} />
      <polygon points={ps(tri2)} fill="none" stroke="#3730a3" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1={pin[0]} y1={pin[1]} x2={90} y2={90} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={pin[0]} y1={pin[1]} x2={140} y2={140} stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx={90} cy={90} r="4.5" fill="#dc2626" />
      <circle cx={pin[0]} cy={pin[1]} r="4.5" fill="#dc2626" />
      <text x={pin[0] - 6} y={pin[1] + 18} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">tű</text>
      <text x={146} y={146} fontSize="16" fontWeight="bold" fill="#0f172a">X</text>
      <RightMark v={pin} u1={[0, -1]} u2={[1, 0]} r={14} color="#ea580c" />
      <text x="150" y="172" fontSize="11" fill="#334155">A piros csúcs az X-be kerül:</text>
      <text x="150" y="188" fontSize="11" fontWeight="bold" fill="#0d9488">negyed fordulat jobbra</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 6. Forgatás négyzethálón egy pont körül (zászló 4 helyzetben)
// ---------------------------------------------------------------------------
const FLAG: Pt[] = [[0, 0], [0, -3], [2, -3], [2, -2], [1, -2], [1, 0]];

export const GridRotationSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 18;
  const cx = 130;
  const cy = 95;
  const colors = [
    ['#93c5fd', '#1d4ed8'],
    ['#fdba74', '#c2410c'],
    ['#86efac', '#15803d'],
    ['#f9a8d4', '#be185d']
  ];
  return (
    <svg viewBox="0 0 340 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="338" height="188" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={cx + (i - 5) * u} y1={cy - 5 * u} x2={cx + (i - 5) * u} y2={cy + 5 * u} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1={cx - 5 * u} y1={cy + (i - 5) * u} x2={cx + 5 * u} y2={cy + (i - 5) * u} stroke="#e2e8f0" />
      ))}
      {[0, 1, 2, 3].map((q) => (
        <polygon
          key={q}
          points={poly(FLAG.map((p) => rotQ(p, q)), cx, cy, u)}
          fill={colors[q][0]}
          stroke={colors[q][1]}
          strokeWidth="2"
          opacity={q === 0 ? 1 : 0.85}
        />
      ))}
      <circle cx={cx} cy={cy} r="5" fill="#dc2626" />
      <text x={cx + 8} y={cy - 6} fontSize="11" fontWeight="bold" fill="#dc2626">O</text>
      <rect x="240" y="30" width="12" height="12" fill={colors[0][0]} stroke={colors[0][1]} />
      <text x="258" y="40" fontSize="10.5" fill="#334155">eredeti</text>
      <rect x="240" y="52" width="12" height="12" fill={colors[1][0]} stroke={colors[1][1]} />
      <text x="258" y="62" fontSize="10.5" fill="#334155">negyed jobbra</text>
      <rect x="240" y="74" width="12" height="12" fill={colors[2][0]} stroke={colors[2][1]} />
      <text x="258" y="84" fontSize="10.5" fill="#334155">fél fordulat</text>
      <rect x="240" y="96" width="12" height="12" fill={colors[3][0]} stroke={colors[3][1]} />
      <text x="258" y="106" fontSize="10.5" fill="#334155">háromnegyed</text>
      <text x="240" y="140" fontSize="10" fill="#475569">Az O pont (a tű)</text>
      <text x="240" y="154" fontSize="10" fill="#475569">nem mozdul el.</text>
    </svg>
  );
};
