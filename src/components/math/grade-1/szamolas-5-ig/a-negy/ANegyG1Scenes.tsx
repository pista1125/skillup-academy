// „A négy” – a mese és a játék képei. Az általános képeket (GroupBox, CompareScene, NumberHouse, KorongRow,
// DigitStrokes, TreeScene …) „Az öt” és az „Összeadás 0-tól 5-ig” lecke is használja.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';

const FONT = 'system-ui, sans-serif';

export const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Szilva (a közös ikonkészletben nincs). */
export const plum = (x: number, y: number, s = 1, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx="14" ry="17" fill="#7c3aed" stroke="#3b0764" strokeWidth="3" />
    <path d="M-3 -14 Q-6 0 -3 14" stroke="#a78bfa" strokeWidth="2.5" fill="none" />
    <path d="M0 -17 L3 -24" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <path d="M3 -22 Q12 -28 14 -19 Q6 -17 3 -22 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
  </g>
);

/** Körte. */
export const pear = (x: number, y: number, s = 1, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -16 C-7 -16 -8 -6 -10 0 C-18 6 -16 20 0 20 C16 20 18 6 10 0 C8 -6 7 -16 0 -16 Z" fill="#facc15" stroke="#a16207" strokeWidth="3" />
    <path d="M0 -16 L2 -23" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
  </g>
);

/** Sütőtök. */
export const pumpkin = (x: number, y: number, s = 1, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx="18" ry="14" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
    <path d="M-6 -13 Q-10 0 -6 13 M6 -13 Q10 0 6 13" stroke="#9a3412" strokeWidth="2.5" fill="none" />
    <path d="M0 -13 L2 -20" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
  </g>
);

export type FruitName = IconName | 'szilva' | 'korte' | 'tok';

export const drawThing = (icon: FruitName, x: number, y: number, s = 1, key?: React.Key, color?: string) =>
  icon === 'szilva' ? plum(x, y, s, key) : icon === 'korte' ? pear(x, y, s, key) : icon === 'tok' ? pumpkin(x, y, s, key) : ICONS[icon]({ x, y, s, key, color });

const POS: Record<number, [number, number][]> = {
  0: [],
  1: [[60, 50]],
  2: [[38, 50], [82, 50]],
  3: [[30, 34], [90, 34], [60, 70]],
  4: [[36, 30], [84, 30], [36, 72], [84, 72]],
  5: [[30, 28], [90, 28], [60, 51], [30, 75], [90, 75]],
};

/** Keret n (0–5) tárggyal, kockaképszerű elrendezésben. */
export const GroupBox: React.FC<{ icon: FruitName; n: number; color?: string; className?: string }> = ({ icon, n, color, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {(POS[n] || []).map(([x, y], i) => drawThing(icon, x, y, n === 1 ? 1.2 : n >= 4 ? 0.78 : 0.85, i, color))}
  </svg>
);

/** Kisebb kártyakép a párosítóhoz, válogatóhoz. */
export const MiniGroup: React.FC<{ icon: FruitName; n: number; color?: string }> = ({ icon, n, color }) => <GroupBox icon={icon} n={n} color={color} className="w-24 h-20" />;

/** Két csoport, középen „?” – melyik jel kell? */
export const CompareScene: React.FC<{ icon: FruitName; a: number; b: number; iconB?: FruitName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 320 110">
    <svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={icon} n={a} className="" />
    </svg>
    <text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
    <svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={iconB ?? icon} n={b} className="" />
    </svg>
  </svg>
);

/** Pöttysor kártya (két szín, párosítóhoz): a kék, b piros, középen jel nélkül. */
export const DotsPair: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const w = 24 * (a + b) + 40;
  return (
    <svg viewBox={`0 0 ${w} 50`} className="w-32 h-12">
      {Array.from({ length: a }, (_, i) => <circle key={`a${i}`} cx={16 + i * 24} cy="25" r="10" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />)}
      {Array.from({ length: b }, (_, i) => <circle key={`b${i}`} cx={16 + a * 24 + 28 + i * 24} cy="25" r="10" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />)}
    </svg>
  );
};

/** Lóhere `leaves` levéllel (2–4). */
export const Clover: React.FC<{ leaves: number; className?: string }> = ({ leaves, className = 'w-24 h-24' }) => {
  const angs = leaves === 4 ? [0, 90, 180, 270] : leaves === 3 ? [0, 120, 240] : [-40, 40];
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M50 52 Q54 76 44 96" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
      {angs.map((a) => (
        <g key={a} transform={`rotate(${a} 50 46)`}>
          <path d="M50 46 C36 30 34 12 50 18 C66 12 64 30 50 46 Z" fill="#22c55e" stroke="#14532d" strokeWidth="3" strokeLinejoin="round" />
        </g>
      ))}
      <circle cx="50" cy="46" r="4" fill="#14532d" />
    </svg>
  );
};

/** Rét lóherékkel, Pötyi, Zümi és Csigusz. */
export const CloverMeadowScene: React.FC<{ withFriends?: boolean }> = ({ withFriends = true }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {[
      [250, 150, 3],
      [330, 168, 4],
      [410, 150, 3],
    ].map(([x, y, l], i) => (
      <svg key={i} x={x - 40} y={y - 40} width="80" height="80" viewBox="0 0 100 100">
        <Clover leaves={l} className="" />
      </svg>
    ))}
    <Potyi mood="wow" dots={4} x={20} y={70} size={150} />
    {withFriends && ICONS.meh({ x: 200, y: 60, s: 1.4 })}
    {withFriends && ICONS.csiga({ x: 190, y: 205, s: 1.2 })}
  </svg>
);

/** Nagy négylevelű lóhere, a levelek megszámozva. */
export const CountCloverScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#f0fdf4" />
    <svg x="150" y="10" width="180" height="180" viewBox="0 0 100 100">
      <Clover leaves={4} className="" />
    </svg>
    {[
      [240, 46, 1],
      [306, 100, 2],
      [240, 156, 3],
      [174, 100, 4],
    ].map(([x, y, t]) => (
      <text key={t} x={x} y={y + 8} textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff" fontFamily={FONT}>{t}</text>
    ))}
    <text x="240" y="228" textAnchor="middle" fontSize="26" fontWeight="900" fill="#166534" fontFamily={FONT}>1, 2, 3, 4</text>
  </svg>
);

/** Számjegy írása vonásonként, mint a tankönyvben (4: két vonás; 5: két vonás). */
export const DigitStrokes: React.FC<{ digit: 4 | 5; className?: string }> = ({ digit, className = 'w-40 h-48 mx-auto' }) => {
  const strokes: Record<number, string[]> = {
    4: ['M62 12 L22 80 H84', 'M66 46 V110'],
    5: ['M30 14 V56 C52 40 84 48 80 78 C77 106 40 112 22 96', 'M30 14 H78'],
  };
  return (
    <svg viewBox="0 0 100 120" className={className}>
      <rect x="4" y="4" width="92" height="112" rx="10" fill="#fff" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 5" />
      {strokes[digit].map((d, i) => (
        <path key={`b${i}`} d={d} fill="none" stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {strokes[digit].map((d, i) => (
        <path key={`r${i}`} d={d} fill="none" stroke={i === 0 ? '#ef4444' : '#2563eb'} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 8" />
      ))}
      {strokes[digit].map((d, i) => {
        const m = /M(\d+) (\d+)/.exec(d)!;
        const x = Number(m[1]);
        const y = Number(m[2]);
        return (
          <g key={`s${i}`}>
            <circle cx={x} cy={y} r="8" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
            <text x={x + (i === 0 ? -14 : 14)} y={y + 6} textAnchor="middle" fontSize="14" fontWeight="900" fill="#14532d" fontFamily={FONT}>{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Fa n gyümölccsel (0–5). */
export const TreeScene: React.FC<{ fruit?: FruitName; n: number }> = ({ fruit = 'alma', n }) => {
  const spots: [number, number][] = [
    [240, 54],
    [190, 96],
    [290, 96],
    [214, 136],
    [266, 136],
  ];
  return (
    <svg viewBox="0 0 480 260">
      {sky(480, 260)}
      <rect x="226" y="150" width="28" height="92" rx="8" fill="#92400e" />
      <circle cx="240" cy="98" r="88" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
      {spots.slice(0, n).map(([x, y], i) => drawThing(fruit, x, y, 1.05, i))}
    </svg>
  );
};

/** Levél n katicával. */
export const LeafBugsScene: React.FC<{ n: number }> = ({ n }) => {
  const spots: [number, number][] = [
    [180, 110],
    [250, 90],
    [320, 112],
    [230, 150],
    [300, 156],
  ];
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef9c3" />
      <path d="M80 200 C70 80 260 10 420 40 C430 160 260 230 80 200 Z" fill="#4ade80" stroke="#15803d" strokeWidth="6" />
      <path d="M80 200 Q250 120 420 40" stroke="#15803d" strokeWidth="4" fill="none" />
      {spots.slice(0, n).map(([x, y], i) => ICONS.katica({ x, y, s: 1.1, key: i }))}
    </svg>
  );
};

/** Bontás-ház: a tetőn az egész, lent a két rész ('?' lehet). */
export const NumberHouse: React.FC<{ top: number | string; left: number | string; right: number | string; className?: string }> = ({ top, left, right, className = 'w-36 h-36' }) => (
  <svg viewBox="0 0 120 120" className={className}>
    <path d="M10 46 L60 8 L110 46 Z" fill="#fde68a" stroke="#92400e" strokeWidth="4" strokeLinejoin="round" />
    <text x="60" y="40" textAnchor="middle" fontSize="26" fontWeight="900" fill={top === '?' ? '#7c3aed' : '#1f2937'} fontFamily={FONT}>{top}</text>
    <rect x="14" y="46" width="92" height="66" fill="#fff" stroke="#92400e" strokeWidth="4" />
    <path d="M60 46 V112" stroke="#92400e" strokeWidth="4" />
    <text x="37" y="90" textAnchor="middle" fontSize="30" fontWeight="900" fill={left === '?' ? '#7c3aed' : '#dc2626'} fontFamily={FONT}>{left}</text>
    <text x="83" y="90" textAnchor="middle" fontSize="30" fontWeight="900" fill={right === '?' ? '#7c3aed' : '#2563eb'} fontFamily={FONT}>{right}</text>
  </svg>
);

/** Korongsor: `red` piros, `blue` kék, `white` színezetlen korong. */
export const KorongRow: React.FC<{ red: number; blue?: number; white?: number; className?: string }> = ({ red, blue = 0, white = 0, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const n = red + blue + white;
  const w = n * 56 + 16;
  return (
    <svg viewBox={`0 0 ${w} 72`} className={className}>
      <rect x="2" y="2" width={w - 4} height="68" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={36 + i * 56} cy="36" r="22" fill={i < red ? '#ef4444' : i < red + blue ? '#3b82f6' : '#fff'} stroke="#111827" strokeWidth="3" />
      ))}
    </svg>
  );
};

/** Korongsor + bontás-ház egy képen. */
export const SplitScene: React.FC<{ red: number; blue: number; white?: number; top: number | string; left: number | string; right: number | string }> = ({ red, blue, white = 0, top, left, right }) => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#f8fafc" />
    <svg x="10" y="60" width="300" height="80" viewBox={`0 0 ${(red + blue + white) * 56 + 16} 72`}>
      <KorongRow red={red} blue={blue} white={white} className="" />
    </svg>
    <svg x="320" y="20" width="160" height="160" viewBox="0 0 120 120">
      <NumberHouse top={top} left={left} right={right} className="" />
    </svg>
  </svg>
);

/** Egyszerű kutya (4 láb). */
export const DogFig: React.FC<{ className?: string }> = ({ className = 'w-24 h-20' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {[34, 46, 70, 82].map((x) => (
      <rect key={x} x={x - 4} y="56" width="8" height="28" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
    ))}
    <ellipse cx="58" cy="54" rx="32" ry="14" fill="#d97706" stroke="#78350f" strokeWidth="3" />
    <circle cx="94" cy="38" r="13" fill="#d97706" stroke="#78350f" strokeWidth="3" />
    <ellipse cx="88" cy="32" rx="5" ry="10" fill="#92400e" />
    <circle cx="98" cy="35" r="2.5" fill="#111827" />
    <path d="M26 50 Q14 40 18 28" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

/** Madár két lábbal. */
export const BirdFig: React.FC<{ className?: string }> = ({ className = 'w-24 h-20' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <path d="M54 66 V84 M66 66 V84 M50 84 H58 M62 84 H70" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
    <g transform="translate(60 50) scale(1.7)">{ICONS.madar({ x: 0, y: 0 })}</g>
  </svg>
);

/** Csiga – nincs lába. */
export const SnailFig: React.FC<{ className?: string }> = ({ className = 'w-24 h-20' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <g transform="translate(60 52) scale(1.7)">{ICONS.csiga({ x: 0, y: 0 })}</g>
  </svg>
);

/** Kisasztal n lábbal (Csigusz terít). */
export const TableFig: React.FC<{ legs: number; className?: string }> = ({ legs, className = 'w-24 h-20' }) => {
  const xs = legs === 4 ? [24, 44, 76, 96] : legs === 3 ? [24, 60, 96] : [24, 96];
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      <rect x="14" y="30" width="92" height="12" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      {xs.map((x, i) => (
        <rect key={i} x={x - 4} y="42" width="8" height={i === 1 && legs === 4 ? 34 : i === 2 && legs === 4 ? 34 : 44} rx="3" fill="#92400e" stroke="#78350f" strokeWidth="2" />
      ))}
    </svg>
  );
};

/** Csoport + „?” kép egy feladathoz: n tárgy egy sorban (pl. hal, madár). */
export const RowScene: React.FC<{ icon: FruitName; n: number; bg?: string }> = ({ icon, n, bg = '#e0f2fe' }) => {
  const w = 480;
  const gap = Math.min(90, 400 / Math.max(1, n));
  const x0 = 240 - ((n - 1) * gap) / 2;
  return (
    <svg viewBox={`0 0 ${w} 160`}>
      <rect x="0" y="0" width={w} height="160" rx="18" fill={bg} />
      {Array.from({ length: n }, (_, i) => drawThing(icon, x0 + i * gap, 80, 1.6, i))}
    </svg>
  );
};
