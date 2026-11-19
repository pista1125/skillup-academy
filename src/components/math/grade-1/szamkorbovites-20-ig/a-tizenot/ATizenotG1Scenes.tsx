// „A tizenöt” – a mese és a játék képei. A 16–18-as leckék (A tizenhat, A tizenhét, A tizennyolc) is innen veszik a közös képeket:
// két tízes keret (1 tízes + egyesek, tízre pótlás), tízesrúd, csoportkártyák 0–20-ig, művelet-, számsor- és számegyenes-képek.
import React from 'react';
import { Potyi, PotyiMood } from '../../shared/Potyi';
import { ICONS, IconName, NumberLine } from '../../shared/G1Pics';

export const FONT = 'system-ui, sans-serif';
export const RED = '#ef4444';
export const BLUE = '#3b82f6';
export const PURPLE = '#7c3aed';

/** Kerti háttér: halványkék ég, zöld domb. */
export const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Tóparti háttér: fű és egy nagy kék tó. */
export const pond = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#bbf7d0" />
    <ellipse cx={w / 2} cy={h / 2 + 6} rx={w / 2 - 14} ry={h / 2 - 16} fill="#7dd3fc" stroke="#0284c7" strokeWidth="4" />
  </>
);

// ---------- tízes keretek ----------
type Cell = { color: string; crossed?: boolean } | null;
const frameG = (x: number, y: number, cells: Cell[], key: React.Key) => (
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
 * Két tízes keret egymás mellett (0–20 korong). Az első `a` korong piros, a következő `b` kék;
 * először az első keret telik meg (így látszik a tízre pótlás: 8 + 7 = 8 + 2 + 5).
 * `crossed`: az utolsó ennyi korong áthúzva (elvétel).
 */
export const TwoFrames: React.FC<{ a: number; b?: number; crossed?: number; className?: string; colorA?: string; colorB?: string }> = ({
  a,
  b = 0,
  crossed = 0,
  className = 'w-full max-w-[460px] h-auto mx-auto',
  colorA = RED,
  colorB = BLUE,
}) => {
  const total = Math.min(20, a + b);
  const cell = (i: number): Cell => (i < total ? { color: i < a ? colorA : colorB, crossed: i >= total - crossed } : null);
  return (
    <svg viewBox="0 0 540 112" className={className}>
      {frameG(0, 0, Array.from({ length: 10 }, (_, i) => cell(i)), 'f1')}
      {frameG(280, 0, Array.from({ length: 10 }, (_, i) => cell(10 + i)), 'f2')}
    </svg>
  );
};

/** Kisebb két keret kártyára. */
export const MiniFrames: React.FC<{ a: number; b?: number; crossed?: number }> = (p) => <TwoFrames {...p} className="w-36 h-auto" />;

/** Tízesrúd (10 összeragasztott narancs kocka) + különálló sárga egyes kockák. */
export const TensRod: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[420px] h-auto mx-auto' }) => {
  const hasTen = n >= 10;
  const ones = hasTen ? n - 10 : n;
  const w = (hasTen ? 350 : 20) + Math.max(1, ones) * 38 + 10;
  return (
    <svg viewBox={`0 0 ${w} 70`} className={className}>
      {hasTen && (
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={20 + i * 30} y="20" width="30" height="30" fill="#f97316" stroke="#7c2d12" strokeWidth="3" />
          ))}
          <rect x="20" y="20" width="300" height="30" fill="none" stroke="#7c2d12" strokeWidth="5" rx="3" />
        </g>
      )}
      {Array.from({ length: ones }, (_, i) => (
        <rect key={`o${i}`} x={(hasTen ? 350 : 20) + i * 38} y="20" width="30" height="30" fill="#facc15" stroke="#713f12" strokeWidth="3" rx="3" />
      ))}
    </svg>
  );
};

// ---------- tárgycsoportok ----------
/** Ikonok rácsban (5 oszlop): így a 10 két teli sor, a többi alatta. `from`-tól a második szín, az utolsó `crossed` áthúzva. */
export const iconsG = (
  icon: IconName,
  n: number,
  opts: { x?: number; y?: number; cell?: number; cols?: number; color?: string; colorB?: string; from?: number; crossed?: number } = {}
) => {
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

/** Keretes csoport 0–20 tárggyal, 5-ös sorokban (160×110). `nb` darab második színű a végén. */
export const groupG = (icon: IconName, n: number, opts: { nb?: number; color?: string; colorB?: string; crossed?: number } = {}) => {
  const { nb = 0, color, colorB, crossed = 0 } = opts;
  const total = n + nb;
  const rows = Math.max(1, Math.ceil(total / 5));
  const cell = rows <= 3 ? 30 : 24;
  const x = 80 - (5 * cell) / 2;
  const top = 55 - (rows * cell) / 2;
  return (
    <>
      <rect x="3" y="3" width="154" height="104" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {iconsG(icon, total, { x, y: top, cell, color, colorB, from: n, crossed })}
    </>
  );
};

/** Csoport kész SVG-ként (válaszkártya). */
export const GroupBox: React.FC<{ icon: IconName; n: number; nb?: number; color?: string; colorB?: string; crossed?: number; className?: string }> = ({
  icon,
  n,
  nb,
  color,
  colorB,
  crossed,
  className = 'w-36 h-[100px]',
}) => (
  <svg viewBox="0 0 160 110" className={className}>
    {groupG(icon, n, { nb, color, colorB, crossed })}
  </svg>
);

/** Kisebb kártya a párosítóhoz, válogatóhoz. */
export const MiniGroup: React.FC<{ icon: IconName; n: number; nb?: number; color?: string; colorB?: string; crossed?: number }> = (p) => (
  <GroupBox {...p} className="w-28 h-[76px]" />
);

/** Két csoport, középen „?” – melyik jel kell? */
export const CompareScene: React.FC<{ icon: IconName; a: number; b: number; iconB?: IconName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 400 116" className="w-full max-w-[440px] h-auto mx-auto">
    <g transform="translate(0 3)">{groupG(icon, a)}</g>
    <text x="200" y="76" textAnchor="middle" fontSize="54" fontWeight="900" fill={PURPLE} fontFamily={FONT}>?</text>
    <g transform="translate(240 3)">{groupG(iconB ?? icon, b)}</g>
  </svg>
);

/** Kép szétszórt tárgyakkal (legfeljebb 20), hogy „számlálni” kelljen. */
const SCATTER: [number, number][] = [
  [52, 46], [124, 34], [196, 52], [268, 36], [340, 50], [420, 38],
  [80, 104], [152, 96], [226, 110], [300, 98], [374, 108], [446, 100],
  [46, 164], [118, 160], [192, 172], [266, 160], [338, 170], [412, 162],
  [152, 214], [300, 214],
];
export const ScatterScene: React.FC<{ icon: IconName; n: number; color?: string; bg?: 'garden' | 'pond' | 'plain'; s?: number }> = ({ icon, n, color, bg = 'garden', s = 1.05 }) => (
  <svg viewBox="0 0 480 240">
    {bg === 'garden' && garden(480, 240)}
    {bg === 'pond' && pond(480, 240)}
    {bg === 'plain' && <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef9c3" />}
    {SCATTER.slice(0, n).map(([x, y], i) => ICONS[icon]({ x, y, s, color, key: i }))}
  </svg>
);

// ---------- műveletek, számsorok ----------
/** Nagy felirat (művelet, jelek), egy vagy több sorban. A „?” és a „□” lila. */
export const ExprScene: React.FC<{ text: string | string[]; bg?: string }> = ({ text, bg = '#f5f3ff' }) => {
  const lines = Array.isArray(text) ? text : [text];
  const longest = Math.max(...lines.map((l) => l.length));
  const fs = longest > 20 ? 34 : longest > 15 ? 40 : longest > 11 ? 48 : 56;
  const lh = fs + 18;
  const h = lines.length * lh + 34;
  return (
    <svg viewBox={`0 0 480 ${h}`} className="w-full max-w-[440px] h-auto mx-auto">
      <rect x="0" y="0" width="480" height={h} rx="18" fill={bg} />
      {lines.map((line, k) => (
        <text key={k} x="240" y={20 + (k + 1) * lh - 12} textAnchor="middle" fontSize={fs} fontWeight="900" fill="#1e293b" fontFamily={FONT}>
          {line.split(/(\?|□)/).map((p, i) => (p === '?' || p === '□' ? <tspan key={i} fill={PURPLE}>{p}</tspan> : <tspan key={i}>{p}</tspan>))}
        </text>
      ))}
    </svg>
  );
};

/** Számkártya-sor, „?” a hiányzó helyén. */
export const SeqStrip: React.FC<{ items: (number | string)[]; className?: string }> = ({ items, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const w = items.length * 70 + 10;
  return (
    <svg viewBox={`0 0 ${w} 90`} className={className}>
      {items.map((v, i) => {
        const q = v === '?';
        return (
          <g key={i}>
            <rect x={8 + i * 70} y="8" width="62" height="74" rx="12" fill={q ? '#ede9fe' : '#eff6ff'} stroke={q ? PURPLE : '#93c5fd'} strokeWidth="3" />
            <text x={39 + i * 70} y="60" textAnchor="middle" fontSize={String(v).length > 1 ? 34 : 40} fontWeight="900" fill={q ? PURPLE : '#1e293b'} fontFamily={FONT}>{v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Számegyenes 0–max ugrásokkal; az állat (`icon`) a kiindulásnál ül, a célnál „?”. */
export const HopLine: React.FC<{ max: number; from: number; jumps: { from: number; to: number }[]; question?: number; icon?: IconName; mark?: number[] }> = ({
  max,
  from,
  jumps,
  question,
  icon = 'meh',
  mark = [from],
}) => {
  const st = Math.min(44, 420 / max);
  const w = 40 + max * st + 14;
  const X = (v: number) => 20 + v * st;
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <svg x="0" y="54" width={w} height="96" viewBox={`0 0 ${w} 96`}>
        <NumberLine max={max} className="" mark={mark} question={question} jumps={jumps} />
      </svg>
      {ICONS[icon]({ x: X(from), y: 36, s: 0.8 })}
    </svg>
  );
};

/** Két dominó: 5|5 (a tízes) és az egyesek dominója (5-ig az egyik, a többi a másik térfélen). */
const DOM: Record<number, [number, number][]> = {
  0: [],
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
};
export const DominoPair: React.FC<{ ones: number; className?: string }> = ({ ones, className = 'w-full max-w-[360px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 340 80" className={className}>
    {[0, 180].map((x0, k) => (
      <g key={k} transform={`translate(${x0} 0)`}>
        <rect x="3" y="3" width="154" height="74" rx="12" fill="#fff" stroke="#111827" strokeWidth="4" />
        <path d="M80 10 V70" stroke="#111827" strokeWidth="3" />
        {(k === 0 ? [5, 5] : [Math.min(5, ones), Math.max(0, ones - 5)]).map((n, h) =>
          (DOM[n] || []).map(([a, b], i) => <circle key={`${h}-${i}`} cx={40 + h * 80 + a * 14} cy={40 + b * 14} r="6" fill="#111827" />)
        )}
      </g>
    ))}
  </svg>
);

/** Pötyi (teli szárnyak = 1 tízes) és mellette egy levél `ones` pöttyel (egyesek). */
export const PotyiTenScene: React.FC<{ ones: number; mood?: PotyiMood; label?: string | number }> = ({ ones, mood = 'happy', label }) => {
  const per = ones > 5 ? Math.ceil(ones / 2) : ones;
  return (
    <svg viewBox="0 0 480 240">
      {garden(480, 240)}
      <Potyi mood={mood} dots={10} x={10} y={20} size={200} />
      <text x="228" y="128" textAnchor="middle" fontSize="50" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
      <path d="M262 150 Q262 60 360 52 Q458 60 458 150 Q360 196 262 150 Z" fill="#4ade80" stroke="#15803d" strokeWidth="4" />
      {Array.from({ length: ones }, (_, i) => {
        const row = ones > 5 ? Math.floor(i / per) : 0;
        const inRow = ones > 5 ? (row === 0 ? per : ones - per) : ones;
        const col = row === 0 ? i : i - per;
        const cx = 360 + (col - (inRow - 1) / 2) * 34;
        const cy = ones > 5 ? 96 + row * 40 : 116;
        return <circle key={i} cx={cx} cy={cy} r="13" fill="#111827" />;
      })}
      {label !== undefined && (
        <text x="360" y="226" textAnchor="middle" fontSize="38" fontWeight="900" fill={label === '?' ? PURPLE : '#1e293b'} fontFamily={FONT}>{label}</text>
      )}
    </svg>
  );
};

/** Pötyi nagyban, a hátán egy szám vagy pöttyök; `friends`: Zümi és Csigusz is ott van. */
export const FriendsScene: React.FC<{ number?: number | string; dots?: number; mood?: PotyiMood; bg?: 'garden' | 'pond'; extra?: React.ReactNode }> = ({
  number,
  dots = 7,
  mood = 'happy',
  bg = 'garden',
  extra,
}) => (
  <svg viewBox="0 0 480 240">
    {bg === 'garden' ? garden(480, 240) : pond(480, 240)}
    <Potyi mood={mood} dots={dots} number={number} x={30} y={30} size={180} />
    {ICONS.meh({ x: 290, y: 80, s: 2.1 })}
    {ICONS.csiga({ x: 400, y: 186, s: 2.3 })}
    {extra}
  </svg>
);

/** Számház: a tetőn a szám, a szobákban a bontások („?” az ismeretlen). */
export const NumberHouse: React.FC<{ top: number | string; rows: [number | string, number | string][]; className?: string }> = ({ top, rows, className = 'w-48 h-auto mx-auto' }) => {
  const h = 70 + rows.length * 44 + 8;
  return (
    <svg viewBox={`0 0 220 ${h}`} className={className}>
      <path d="M10 70 L110 6 L210 70 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
      <text x="110" y="58" textAnchor="middle" fontSize="36" fontWeight="900" fill="#fff" fontFamily={FONT}>{top}</text>
      {rows.map(([a, b], i) => (
        <g key={i}>
          <rect x="30" y={70 + i * 44} width="160" height="44" fill="#fff" stroke="#1f2937" strokeWidth="3" />
          {[a, '+', b].map((t, k) => (
            <text key={k} x={66 + k * 44} y={70 + i * 44 + 32} textAnchor="middle" fontSize="28" fontWeight="900" fill={t === '?' ? PURPLE : '#1e293b'} fontFamily={FONT}>
              {t}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
};

// ---------- „A tizenöt” saját jelenetei: a Számkert halastava ----------
const FISH_POS: [number, number][] = [
  [110, 66], [240, 106], [370, 148], [175, 188], [345, 66], [70, 148], [275, 148], [140, 106], [305, 188], [415, 106],
  [240, 66], [205, 148], [110, 188], [345, 106], [175, 66], [415, 148], [70, 106], [370, 188], [305, 66], [140, 148],
];

/** Halak a tóban: `n` narancs hal, utánuk `nb` sárga hal (0–20). */
export const PondScene: React.FC<{ n: number; nb?: number; friends?: boolean }> = ({ n, nb = 0, friends = false }) => (
  <svg viewBox="0 0 480 240">
    {pond(480, 240)}
    {FISH_POS.slice(0, n + nb).map(([x, y], i) => ICONS.hal({ x, y, s: 1.05, color: i < n ? '#f97316' : '#facc15', key: i }))}
    {friends && <Potyi mood="happy" dots={7} x={392} y={150} size={90} />}
  </svg>
);

/** Tavirózsa-levelek, mindegyiken 5 hal (dominó-ötös): ötösével számolunk. */
export const FivesScene: React.FC<{ pads: number; last?: number }> = ({ pads, last = 5 }) => {
  const FIVE: [number, number][] = [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]];
  const w = 160;
  const x0 = 240 - (pads * w) / 2 + w / 2;
  return (
    <svg viewBox="0 0 480 200">
      <rect x="0" y="0" width="480" height="200" rx="18" fill="#7dd3fc" />
      {Array.from({ length: pads }, (_, k) => {
        const cx = x0 + k * w;
        const cnt = k === pads - 1 ? last : 5;
        return (
          <g key={k}>
            <ellipse cx={cx} cy="100" rx="72" ry="66" fill="#4ade80" stroke="#15803d" strokeWidth="4" />
            <path d={`M${cx} 100 L${cx + 60} 64`} stroke="#15803d" strokeWidth="4" />
            {FIVE.slice(0, cnt).map(([a, b], i) => ICONS.hal({ x: cx + a * 34, y: 100 + b * 34, s: 0.62, key: i }))}
          </g>
        );
      })}
    </svg>
  );
};

/** Csigusz köveken lépked át a patakon: a köveken számok, „?” a hiányzónál. */
export const StonesScene: React.FC<{ stones: (number | string)[] }> = ({ stones }) => {
  const n = stones.length;
  const step = 400 / Math.max(1, n - 1);
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#bbf7d0" />
      <path d="M0 70 Q240 40 480 90 V170 Q240 200 0 160 Z" fill="#7dd3fc" stroke="#0284c7" strokeWidth="3" />
      {stones.map((v, i) => {
        const cx = 40 + i * step;
        const cy = i % 2 === 0 ? 132 : 104;
        const q = v === '?';
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="30" ry="20" fill={q ? '#ede9fe' : '#e7e5e4'} stroke={q ? PURPLE : '#57534e'} strokeWidth="3" />
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="26" fontWeight="900" fill={q ? PURPLE : '#1e293b'} fontFamily={FONT}>{v}</text>
          </g>
        );
      })}
      {ICONS.csiga({ x: 40, y: 190, s: 1.1 })}
    </svg>
  );
};
