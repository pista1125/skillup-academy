// „A tizenegy” – a mese és a játék képei. A 12–14-es leckék (A tizenkettő, A tizenhárom, A tizennégy) is innen veszik a közös képeket:
// két tízes keret (1 tízes + egyesek), tízesrúd, tízes zsák, csoportkártyák 0–14-ig, művelet- és számsor-képek.
import React from 'react';
import { Potyi, PotyiMood } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';

export const FONT = 'system-ui, sans-serif';
export const RED = '#ef4444';
export const BLUE = '#3b82f6';

export const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Egy tízes keret (2×5) SVG-csoportként, (x, y) bal felső sarokkal. A `cells` tömb mondja meg az egyes helyek tartalmát. */
const frameG = (x: number, y: number, cells: ({ color: string; crossed?: boolean } | null)[], key: React.Key) => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect x="3" y="3" width="254" height="106" rx="10" fill="#fff" stroke="#1f2937" strokeWidth="4" />
    {[1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${3 + i * 50.8} 3 V109`} stroke="#1f2937" strokeWidth="3" />
    ))}
    <path d="M3 56 H257" stroke="#1f2937" strokeWidth="3" />
    {cells.map((c, i) => {
      if (!c) return null;
      const cx = 28.4 + (i % 5) * 50.8;
      const cy = 29.5 + Math.floor(i / 5) * 53;
      return (
        <g key={i} opacity={c.crossed ? 0.5 : 1}>
          <circle cx={cx} cy={cy} r="18" fill={c.color} stroke="#111827" strokeWidth="3" />
          {c.crossed && <path d={`M${cx - 16} ${cy - 16} L${cx + 16} ${cy + 16}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
        </g>
      );
    })}
  </g>
);

/**
 * Két tízes keret egymás mellett (0–20 korong). Az első `a` korong piros, a következő `b` kék
 * (sorban: először az első keret telik meg). Az utolsó `crossed` korong áthúzva (elvétel);
 * `crossStart` megadásával máshonnan kezdődik az áthúzás (pl. 0: a teli tízes áthúzva).
 */
export const TwoFrames: React.FC<{ a: number; b?: number; crossed?: number; crossStart?: number; className?: string; colorA?: string; colorB?: string }> = ({
  a,
  b = 0,
  crossed = 0,
  crossStart,
  className = 'w-full max-w-[460px] h-auto mx-auto',
  colorA = RED,
  colorB = BLUE,
}) => {
  const total = Math.min(20, a + b);
  const c0 = crossStart ?? total - crossed;
  const cell = (i: number) => (i < total ? { color: i < a ? colorA : colorB, crossed: i >= c0 && i < c0 + crossed } : null);
  return (
    <svg viewBox="0 0 540 112" className={className}>
      {frameG(0, 0, Array.from({ length: 10 }, (_, i) => cell(i)), 'f1')}
      {frameG(280, 0, Array.from({ length: 10 }, (_, i) => cell(10 + i)), 'f2')}
    </svg>
  );
};

/** Tízesrúd (10 összeragasztott kocka) + különálló egyes kockák. */
export const TensRod: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[420px] h-auto mx-auto' }) => {
  const ones = Math.max(0, n - 10);
  const w = 30 + 10 * 30 + 30 + Math.max(1, ones) * 38;
  return (
    <svg viewBox={`0 0 ${w} 80`} className={className}>
      {n >= 10 && (
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={20 + i * 30} y="20" width="30" height="30" fill="#f97316" stroke="#7c2d12" strokeWidth="3" />
          ))}
          <rect x="20" y="20" width="300" height="30" fill="none" stroke="#7c2d12" strokeWidth="5" rx="3" />
        </g>
      )}
      {Array.from({ length: n >= 10 ? ones : n }, (_, i) => (
        <rect key={`o${i}`} x={(n >= 10 ? 350 : 20) + i * 38} y="20" width="30" height="30" fill="#facc15" stroke="#713f12" strokeWidth="3" rx="3" />
      ))}
    </svg>
  );
};

/** Ikonok rácsban (5 oszlop): így a 10 két teli sor, a többi a harmadik sorba kerül. */
export const iconsG = (icon: IconName, n: number, opts: { x?: number; y?: number; cell?: number; cols?: number; color?: string; colorB?: string; from?: number; crossed?: number } = {}) => {
  const { x = 0, y = 0, cell = 30, cols = 5, color, colorB, from = n, crossed = 0 } = opts;
  return Array.from({ length: n }, (_, i) => {
    const cx = x + (i % cols) * cell + cell / 2;
    const cy = y + Math.floor(i / cols) * cell + cell / 2;
    const cross = i >= n - crossed;
    return (
      <g key={`${icon}${i}`} opacity={cross ? 0.45 : 1}>
        {ICONS[icon]({ x: cx, y: cy, s: cell / 46, color: i >= from ? colorB : color })}
        {cross && <path d={`M${cx - cell / 2.6} ${cy + cell / 2.6} L${cx + cell / 2.6} ${cy - cell / 2.6}`} stroke="#111827" strokeWidth="4" strokeLinecap="round" />}
      </g>
    );
  });
};

/** Keretes csoport 0–15 tárggyal (5-ös sorokban). 160×110-es. */
export const groupG = (icon: IconName, n: number, opts: { color?: string; colorB?: string; from?: number; crossed?: number } = {}) => {
  const rows = Math.max(1, Math.ceil(n / 5));
  const cell = 30;
  const top = 55 - (rows * cell) / 2;
  return (
    <>
      <rect x="3" y="3" width="154" height="104" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {iconsG(icon, n, { x: 5, y: top, cell, ...opts })}
    </>
  );
};

/** Csoport kész SVG-ként (válaszkártya). */
export const GroupBox: React.FC<{ icon: IconName; n: number; color?: string; crossed?: number; className?: string }> = ({ icon, n, color, crossed, className = 'w-32 h-[88px]' }) => (
  <svg viewBox="0 0 160 110" className={className}>
    {groupG(icon, n, { color, crossed })}
  </svg>
);

/** Kisebb kártya a párosítóhoz, válogatóhoz. */
export const MiniGroup: React.FC<{ icon: IconName; n: number; color?: string; crossed?: number }> = ({ icon, n, color, crossed }) => (
  <GroupBox icon={icon} n={n} color={color} crossed={crossed} className="w-28 h-[76px]" />
);

/** Tárgyak „tízes zsákban”: 10 egy hálóban, a többi mellette. */
export const BagScene: React.FC<{ icon: IconName; n: number; color?: string; className?: string }> = ({ icon, n, color, className = 'w-full max-w-[440px] h-auto mx-auto' }) => {
  const inBag = Math.min(10, n);
  const rest = Math.max(0, n - 10);
  return (
    <svg viewBox="0 0 400 110" className={className}>
      <rect x="0" y="0" width="400" height="110" rx="16" fill="#f8fafc" />
      <rect x="8" y="10" width="200" height="90" rx="40" fill="#fef3c7" stroke="#b45309" strokeWidth="4" strokeDasharray={n >= 10 ? undefined : '8 6'} />
      {iconsG(icon, inBag, { x: 21, y: 15, cell: 35, color })}
      {iconsG(icon, rest, { x: 230, y: rest > 3 ? 15 : 37, cell: 35, cols: 4, color })}
    </svg>
  );
};

/** Két csoport, középen „?” – melyik jel kell? */
export const CompareScene: React.FC<{ icon: IconName; a: number; b: number; iconB?: IconName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 400 116" className="w-full max-w-[440px] h-auto mx-auto">
    <g transform="translate(0 3)">{groupG(icon, a)}</g>
    <text x="200" y="76" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
    <g transform="translate(240 3)">{groupG(iconB ?? icon, b)}</g>
  </svg>
);

/** Két csoport művelettel: a + b = ?  vagy  a − b (áthúzva) = ? */
export const OpScene: React.FC<{ icon: IconName; a: number; b: number; op: '+' | '−'; iconB?: IconName; showResult?: boolean }> = ({ icon, a, b, op, iconB, showResult = false }) => {
  const res = op === '+' ? a + b : a - b;
  if (op === '−') {
    return (
      <svg viewBox="0 0 300 116" className="w-full max-w-[360px] h-auto mx-auto">
        <g transform="translate(0 3)">{groupG(icon, a, { crossed: b })}</g>
        <text x="190" y="76" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>=</text>
        <text x="252" y="78" textAnchor="middle" fontSize="50" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{showResult ? res : '?'}</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 480 116" className="w-full max-w-[460px] h-auto mx-auto">
      <g transform="translate(0 3)">{groupG(icon, a)}</g>
      <text x="180" y="74" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
      <g transform="translate(200 3)">{groupG(iconB ?? icon, b)}</g>
      <text x="383" y="74" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>=</text>
      <text x="440" y="78" textAnchor="middle" fontSize={showResult && res > 9 ? 42 : 52} fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{showResult ? res : '?'}</text>
    </svg>
  );
};

/** Nagy felirat (művelet, jelek): pl. "10 + 1 = ?". A „?” lila. */
export const ExprScene: React.FC<{ text: string; bg?: string }> = ({ text, bg = '#f5f3ff' }) => {
  const parts = text.split(/(\?)/);
  return (
    <svg viewBox="0 0 480 120" className="w-full max-w-[440px] h-auto mx-auto">
      <rect x="0" y="0" width="480" height="120" rx="18" fill={bg} />
      <text x="240" y="82" textAnchor="middle" fontSize={text.length > 18 ? 36 : text.length > 13 ? 44 : 56} fontWeight="900" fill="#1e293b" fontFamily={FONT}>
        {parts.map((p, i) => (p === '?' ? <tspan key={i} fill="#7c3aed">?</tspan> : <tspan key={i}>{p}</tspan>))}
      </text>
    </svg>
  );
};

/** Számkártya-sor, „?” a hiányzó helyén. */
export const SeqStrip: React.FC<{ items: (number | '?')[] }> = ({ items }) => {
  const w = items.length * 70 + 10;
  return (
    <svg viewBox={`0 0 ${w} 90`} className="w-full max-w-[460px] h-auto mx-auto">
      {items.map((v, i) => (
        <g key={i}>
          <rect x={8 + i * 70} y="8" width="62" height="74" rx="12" fill={v === '?' ? '#ede9fe' : '#eff6ff'} stroke={v === '?' ? '#7c3aed' : '#93c5fd'} strokeWidth="3" />
          <text x={39 + i * 70} y="60" textAnchor="middle" fontSize={String(v).length > 1 ? 34 : 40} fontWeight="900" fill={v === '?' ? '#7c3aed' : '#1e293b'} fontFamily={FONT}>{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** Pötyi nagyban; a hátán `dots` pötty (0–10) vagy egy szám (`number`). `friends`: Zümi és Csigusz is ott van. */
export const PotyiScene: React.FC<{ dots?: number; number?: number | string; mood?: PotyiMood; friends?: boolean }> = ({ dots = 10, number, mood = 'happy', friends = false }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <Potyi mood={mood} dots={dots} number={number} x={friends ? 40 : 130} y={20} size={210} />
    {friends && ICONS.meh({ x: 330, y: 80, s: 2.2 })}
    {friends && ICONS.csiga({ x: 380, y: 190, s: 2.4 })}
  </svg>
);

/** Pötyi (teli szárnyak = 10 pötty) és mellette Zümi, aki `ones` pöttyöt tart (egyesek). */
export const PotyiPlusScene: React.FC<{ ones: number; mood?: PotyiMood; label?: string }> = ({ ones, mood = 'happy', label }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <Potyi mood={mood} dots={10} x={20} y={20} size={200} />
    {ICONS.meh({ x: 300, y: 70, s: 2 })}
    <rect x="250" y="112" width="210" height="64" rx="16" fill="#fff" stroke="#f59e0b" strokeWidth="4" />
    {Array.from({ length: ones }, (_, i) => (
      <circle key={i} cx={280 + i * 50} cy="144" r="17" fill="#111827" />
    ))}
    {label && (
      <text x="355" y="224" textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{label}</text>
    )}
  </svg>
);

/** Két dominó egymás mellett: 5|5 (= 10) és az egyesek dominója (pl. 1|0). */
export const DominoPair: React.FC<{ ones: number; right?: number }> = ({ ones, right = 0 }) => (
  <svg viewBox="0 0 340 80" className="w-full max-w-[360px] h-auto mx-auto">
    {[0, 180].map((x0, k) => (
      <g key={k} transform={`translate(${x0} 0)`}>
        <rect x="3" y="3" width="154" height="74" rx="12" fill="#fff" stroke="#111827" strokeWidth="4" />
        <path d="M80 10 V70" stroke="#111827" strokeWidth="3" />
        {(k === 0 ? [5, 5] : [ones, right]).map((n, h) =>
          (DOM[n] || []).map(([a, b], i) => <circle key={`${h}-${i}`} cx={40 + h * 80 + a * 14} cy={40 + b * 14} r="6" fill="#111827" />)
        )}
      </g>
    ))}
  </svg>
);
const DOM: Record<number, [number, number][]> = {
  0: [],
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

/** Tóparti / kerti kép: n tárgy szétszórva (nem sorban), hogy „számlálni” kelljen. */
const SCATTER: [number, number][] = [
  [60, 60], [140, 40], [220, 70], [300, 45], [390, 65], [90, 130], [175, 115], [260, 140], [345, 120], [430, 140],
  [50, 195], [135, 190], [215, 205], [300, 195], [385, 200], [445, 85],
];
export const ScatterScene: React.FC<{ icon: IconName; n: number; color?: string; bg?: 'garden' | 'pond' | 'water' }> = ({ icon, n, color, bg = 'garden' }) => (
  <svg viewBox="0 0 480 240">
    {bg === 'garden' && sky(480, 240)}
    {bg === 'pond' && (
      <>
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#bbf7d0" />
        <ellipse cx="240" cy="125" rx="225" ry="108" fill="#60a5fa" opacity="0.55" />
      </>
    )}
    {bg === 'water' && <rect x="0" y="0" width="480" height="240" rx="18" fill="#bae6fd" stroke="#0284c7" strokeWidth="4" />}
    {SCATTER.slice(0, n).map(([x, y], i) => ICONS[icon]({ x, y, s: 1.15, color, key: i }))}
  </svg>
);
