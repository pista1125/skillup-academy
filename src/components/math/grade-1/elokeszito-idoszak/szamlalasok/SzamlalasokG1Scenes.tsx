// „Számlálások” – a mese és a játék képei. Számjegy nincs: a mennyiséget pöttyök, dominók, képek mutatják.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';

export const NUM_WORD = ['nulla', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc', 'tíz'];
/** jelzői alak: „két alma”, „három alma” */
export const NUM_ATTR = ['nulla', 'egy', 'két', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc', 'tíz'];

const DICE: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

/** Pöttykártya (dobókocka-kép, 1–6). */
export const DotCard: React.FC<{ n: number; className?: string; color?: string }> = ({ n, className = 'w-20 h-20', color = '#111827' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="3" y="3" width="74" height="74" rx="14" fill="#fff" stroke="#111827" strokeWidth="4" />
    {(DICE[n] || []).map(([a, b], i) => (
      <circle key={i} cx={40 + a * 20} cy={40 + b * 20} r="8" fill={color} />
    ))}
  </svg>
);
export const dotOpt = (n: number) => ({ figure: <DotCard n={n} />, say: `${NUM_WORD[n]} pötty` });

/** Dominó két térféllel (a pöttyök száma összesen számít). */
export const Domino2: React.FC<{ left: number; right: number; className?: string }> = ({ left, right, className = 'w-32 h-auto' }) => (
  <svg viewBox="0 0 160 80" className={className}>
    <rect x="3" y="3" width="154" height="74" rx="12" fill="#fff" stroke="#111827" strokeWidth="4" />
    <path d="M80 10 V70" stroke="#111827" strokeWidth="3" />
    {(DICE[left] || []).map(([a, b], i) => <circle key={`l${i}`} cx={40 + a * 20} cy={40 + b * 20} r="7" fill="#111827" />)}
    {(DICE[right] || []).map(([a, b], i) => <circle key={`r${i}`} cx={120 + a * 20} cy={40 + b * 20} r="7" fill="#111827" />)}
  </svg>
);
export const dominoOpt = (left: number, right: number) => ({ figure: <Domino2 left={left} right={right} />, say: `${NUM_WORD[left + right]} pötty a dominón` });

/** Saját gyümölcsök (a közös készletben nincs körte és szilva). */
export type Thing = IconName | 'korte' | 'szilva';
export const drawThing = (t: Thing, x: number, y: number, s = 1, key?: React.Key) => {
  if (t === 'korte')
    return (
      <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M0 -16 C-6 -16 -8 -8 -8 -4 C-16 2 -16 18 0 18 C16 18 16 2 8 -4 C8 -8 6 -16 0 -16 Z" fill="#facc15" stroke="#a16207" strokeWidth="3" />
        <path d="M0 -16 L2 -22" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  if (t === 'szilva')
    return (
      <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse rx="12" ry="15" fill="#6d28d9" stroke="#3b0764" strokeWidth="3" />
        <path d="M0 -14 Q-4 0 0 14" stroke="#3b0764" strokeWidth="2" fill="none" />
        <path d="M0 -15 L3 -21" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  return ICONS[t]({ x, y, s, key });
};
export const THING_NAME: Record<Thing, string> = {
  alma: 'alma', labda: 'labda', virag: 'virág', csillag: 'csillag', hal: 'hal', auto: 'autó', madar: 'madár', level: 'levél', gomba: 'gomba', szív: 'szív', korong: 'korong', pillango: 'pillangó', csiga: 'csiga', meh: 'méh', eper: 'eper', katica: 'katica', korte: 'körte', szilva: 'szilva',
};

const GROUP_POS: Record<number, [number, number][]> = {
  1: [[60, 50]],
  2: [[36, 50], [84, 50]],
  3: [[30, 34], [90, 34], [60, 70]],
  4: [[34, 30], [86, 30], [34, 72], [86, 72]],
  5: [[28, 28], [92, 28], [60, 50], [28, 74], [92, 74]],
  6: [[26, 30], [60, 30], [94, 30], [26, 72], [60, 72], [94, 72]],
  7: [[22, 28], [52, 28], [82, 28], [104, 50], [22, 74], [52, 74], [82, 74]],
};

/** n darab tárgy keretben (válaszkép). */
export const GroupPic: React.FC<{ thing: Thing; n: number; className?: string }> = ({ thing, n, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {(GROUP_POS[n] || []).map(([x, y], i) => drawThing(thing, x, y, n >= 5 ? 0.72 : 0.9, i))}
  </svg>
);
export const groupOpt = (thing: Thing, n: number) => ({ figure: <GroupPic thing={thing} n={n} />, say: `${NUM_ATTR[n]} ${THING_NAME[thing]}` });

/** Tárgyak sorban (vegyesen). */
export const MixRow: React.FC<{ things: Thing[]; className?: string }> = ({ things, className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <svg viewBox={`0 0 ${things.length * 76 + 16} 96`} className={className}>
    <rect x="0" y="0" width={things.length * 76 + 16} height="96" rx="16" fill="#f0fdf4" />
    {things.map((t, i) => drawThing(t, 46 + i * 76, 48, 1.4, i))}
  </svg>
);

/** Nyitott tenyér (taps) és ököl (koppantás). */
const palm = (x: number, y: number, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y})`}>
    {[-15, -5, 5, 15].map((fx, i) => (
      <rect key={i} x={fx - 4.5} y={-30 + Math.abs(fx) * 0.3} width="9" height="26" rx="4.5" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2.5" />
    ))}
    <rect x="-22" y="0" width="9" height="20" rx="4.5" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2.5" transform="rotate(-35 -18 10)" />
    <rect x="-20" y="-8" width="40" height="34" rx="12" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2.5" />
  </g>
);
const fist = (x: number, y: number, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect x="-20" y="-16" width="40" height="38" rx="13" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2.5" />
    <path d="M-10 -16 V-2 M0 -16 V-2 M10 -16 V-2" stroke="#9a3412" strokeWidth="2.5" />
    <rect x="-20" y="2" width="22" height="9" rx="4.5" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2.5" />
  </g>
);

/** Kézjelek sora: 'p' = tenyér (taps), 'f' = ököl (koppantás). */
export const HandsRow: React.FC<{ seq: ('p' | 'f')[]; className?: string }> = ({ seq, className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <svg viewBox={`0 0 ${seq.length * 60 + 20} 90`} className={className}>
    <rect x="0" y="0" width={seq.length * 60 + 20} height="90" rx="14" fill="#fef3c7" />
    {seq.map((k, i) => (k === 'p' ? palm(40 + i * 60, 46, i) : fist(40 + i * 60, 46, i)))}
  </svg>
);

/** Táblázat állatokkal (3 sor × 4 oszlop). */
export const TABLE: IconName[] = ['meh', 'pillango', 'csiga', 'pillango', 'katica', 'pillango', 'meh', 'csiga', 'pillango', 'katica', 'meh', 'pillango'];
export const AnimalTable: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[380px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 296 224" className={className}>
    {TABLE.map((ic, i) => {
      const x = 4 + (i % 4) * 72;
      const y = 4 + Math.floor(i / 4) * 72;
      return (
        <g key={i}>
          <rect x={x} y={y} width="72" height="72" fill="#fff" stroke="#334155" strokeWidth="3" />
          {ICONS[ic]({ x: x + 36, y: y + 36, s: 1.3 })}
        </g>
      );
    })}
  </svg>
);

/** Egymásra dobált labdák kupaca (n = 3–5). */
export const BallHeap: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const spots: [number, number, string][] = [
    [90, 110, '#3b82f6'],
    [128, 96, '#ef4444'],
    [112, 70, '#22c55e'],
    [150, 120, '#f59e0b'],
    [72, 82, '#a855f7'],
  ];
  return (
    <svg viewBox="0 0 220 160" className={className}>
      <rect x="0" y="0" width="220" height="160" rx="16" fill="#fefce8" />
      {spots.slice(0, n).map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="28" fill={c} stroke="#1f2937" strokeWidth="4" />
          <path d={`M${x - 28} ${y} H${x + 28}`} stroke="#fff" strokeWidth="3" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
};

/** Zoknikupac (n = 3–5), egymást keresztezve. */
export const SockHeap: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const spots: [number, number, number, string][] = [
    [80, 70, -20, '#f472b6'],
    [130, 80, 25, '#60a5fa'],
    [105, 60, 80, '#facc15'],
    [150, 60, -60, '#4ade80'],
    [100, 95, 5, '#fb923c'],
  ];
  return (
    <svg viewBox="0 0 220 160" className={className}>
      <rect x="0" y="0" width="220" height="160" rx="16" fill="#f8fafc" />
      {spots.slice(0, n).map(([x, y, r, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M-10 -40 H10 V14 Q10 26 -2 30 H-26 Q-36 28 -34 18 Q-32 10 -20 10 H-10 Z" fill={c} stroke="#1f2937" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M-10 -32 H10" stroke="#1f2937" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
};

/** Labda n pöttyel (a „labdán annyi pötty” feladathoz). */
export const DotBall: React.FC<{ n: number; color?: string; className?: string }> = ({ n, color = '#facc15', className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <circle cx="40" cy="40" r="34" fill={color} stroke="#1f2937" strokeWidth="4" />
    {(DICE[n] || []).map(([a, b], i) => (
      <circle key={i} cx={40 + a * 15} cy={40 + b * 15} r="6" fill="#111827" />
    ))}
  </svg>
);
export const ballOpt = (n: number, color?: string) => ({ figure: <DotBall n={n} color={color} />, say: `labda ${NUM_WORD[n]} pöttyel` });

/** Gomba n fehér pöttyel a kalapján. */
export const SpotMushroom: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-24 h-24' }) => {
  const spots: [number, number][] = [
    [30, 40],
    [50, 30],
    [70, 40],
    [40, 54],
    [60, 54],
  ];
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="3" y="3" width="94" height="94" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      <rect x="40" y="58" width="20" height="30" rx="6" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
      <path d="M14 62 C14 18 86 18 86 62 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="3" />
      {spots.slice(0, n).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="#fff" />
      ))}
    </svg>
  );
};
export const mushOpt = (n: number) => ({ figure: <SpotMushroom n={n} />, say: `gomba ${NUM_ATTR[n]} pöttyel` });

/** Almafa n almával (1–6). */
export const AppleTree: React.FC<{ n: number }> = ({ n }) => {
  const spots: [number, number][] = [
    [200, 70],
    [250, 60],
    [290, 90],
    [180, 115],
    [240, 110],
    [300, 130],
  ];
  return (
    <svg viewBox="0 0 480 240" className="w-full max-w-[480px] h-auto mx-auto">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
      <path d="M0 200 Q240 180 480 200 V240 H0 Z" fill="#86efac" />
      <rect x="226" y="140" width="28" height="80" rx="8" fill="#92400e" />
      <circle cx="240" cy="96" r="84" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
      {spots.slice(0, n).map(([x, y], i) => ICONS.alma({ x, y, s: 1.1, key: i }))}
      <Potyi mood="think" dots={7} x={330} y={110} size={110} />
    </svg>
  );
};

/** Két 3×3-as rács, bennük rajzok (összesen számolás). */
export const TwoGrids: React.FC<{ left: (Thing | null)[]; right: (Thing | null)[] }> = ({ left, right }) => {
  const grid = (cells: (Thing | null)[], ox: number) =>
    cells.map((t, i) => {
      const x = ox + (i % 3) * 50;
      const y = 6 + Math.floor(i / 3) * 50;
      return (
        <g key={`${ox}-${i}`}>
          <rect x={x} y={y} width="50" height="50" fill="#fff" stroke="#334155" strokeWidth="2.5" />
          {t && drawThing(t, x + 25, y + 25, 0.9)}
        </g>
      );
    });
  return (
    <svg viewBox="0 0 330 162" className="w-full max-w-[420px] h-auto mx-auto">
      {grid(left, 6)}
      {grid(right, 174)}
    </svg>
  );
};

/** Nyitó kép. */
export const CountIntroScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 200 Q120 180 240 196 T480 192 V250 H0 Z" fill="#86efac" />
    {[0, 1, 2].map((i) => ICONS.virag({ x: 300 + i * 50, y: 200 - (i % 2) * 10, s: 1.1, key: `v${i}` }))}
    {[0, 1].map((i) => ICONS.pillango({ x: 330 + i * 70, y: 70 + i * 20, s: 1.2, key: `p${i}` }))}
    <Potyi mood="cheer" dots={7} x={30} y={50} size={170} />
  </svg>
);

/** Egyetlen tárgy kártyán (válaszlehetőségnek). */
export const ThingCard: React.FC<{ thing: Thing; className?: string }> = ({ thing, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="3" y="3" width="74" height="74" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {drawThing(thing, 40, 40, 1.4)}
  </svg>
);
export const thingOpt = (t: Thing) => ({ figure: <ThingCard thing={t} />, say: THING_NAME[t] });
