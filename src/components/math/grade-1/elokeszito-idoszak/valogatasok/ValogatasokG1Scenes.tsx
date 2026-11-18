// „Válogatások” – a mese és a játék képei. Az OBJ tárgykészletet az előkészítő időszak többi leckéje is használja.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName, IconProps } from '../../shared/G1Pics';

export const COL = {
  piros: '#ef4444',
  kek: '#3b82f6',
  sarga: '#facc15',
  zold: '#22c55e',
  narancs: '#f97316',
  lila: '#a855f7',
} as const;

const g = (x: number, y: number, s: number, children: React.ReactNode, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
  </g>
);

type Draw = (p: IconProps) => React.ReactElement;

const OWN = {
  korte: ({ x, y, s = 1, color = '#a3e635', key }) =>
    g(x, y, s, (
      <>
        <path d="M0 -16 C7 -16 7 -7 10 -2 C17 8 13 20 0 20 C-13 20 -17 8 -10 -2 C-7 -7 -7 -16 0 -16 Z" fill={color} stroke="#4d7c0f" strokeWidth="3" />
        <path d="M0 -16 L2 -22" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      </>
    ), key),
  banan: ({ x, y, s = 1, color = '#facc15', key }) =>
    g(x, y, s, <path d="M-18 -10 Q-8 20 20 -12 L16 -16 Q-2 6 -12 -14 Z" fill={color} stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />, key),
  szolo: ({ x, y, s = 1, color = '#a855f7', key }) =>
    g(x, y, s, (
      <>
        {[[-8, -8], [0, -8], [8, -8], [-4, 0], [4, 0], [-8, 8], [8, 8], [0, 8], [0, 16]].map(([a, b], i) => (
          <circle key={i} cx={a} cy={b} r="5" fill={color} stroke="#581c87" strokeWidth="2" />
        ))}
        <path d="M0 -13 L3 -20" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      </>
    ), key),
  repa: ({ x, y, s = 1, color = '#f97316', key }) =>
    g(x, y, s, (
      <>
        <path d="M-4 -12 L-10 -22 M0 -12 L0 -24 M4 -12 L10 -22" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <path d="M-8 -12 H8 L1 20 H-1 Z" fill={color} stroke="#9a3412" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-5 -4 H-1 M2 4 H5 M-3 10 H0" stroke="#9a3412" strokeWidth="2" />
      </>
    ), key),
  uborka: ({ x, y, s = 1, color = '#16a34a', key }) =>
    g(x, y, s, (
      <g transform="rotate(-25)">
        <ellipse rx="21" ry="8" fill={color} stroke="#14532d" strokeWidth="3" />
        <circle cx="-8" cy="-2" r="1.5" fill="#bbf7d0" />
        <circle cx="2" cy="2" r="1.5" fill="#bbf7d0" />
        <circle cx="10" cy="-2" r="1.5" fill="#bbf7d0" />
      </g>
    ), key),
  paradicsom: ({ x, y, s = 1, color = '#dc2626', key }) =>
    g(x, y, s, (
      <>
        <circle cy="3" r="16" fill={color} stroke="#7f1d1d" strokeWidth="3" />
        <path d="M0 -13 L-8 -17 L-3 -10 L-10 -8 L0 -8 L10 -8 L3 -10 L8 -17 Z" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
      </>
    ), key),
  ceruza: ({ x, y, s = 1, color = '#facc15', key }) =>
    g(x, y, s, (
      <g transform="rotate(-35)">
        <rect x="-18" y="-5" width="28" height="10" fill={color} stroke="#713f12" strokeWidth="2.5" />
        <path d="M10 -5 L22 0 L10 5 Z" fill="#fde7c7" stroke="#713f12" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M18 -1.6 L22 0 L18 1.6 Z" fill="#111827" />
        <rect x="-23" y="-5" width="5" height="10" fill="#f9a8d4" stroke="#713f12" strokeWidth="2.5" />
      </g>
    ), key),
  konyv: ({ x, y, s = 1, color = '#3b82f6', key }) =>
    g(x, y, s, (
      <>
        <rect x="-15" y="-18" width="30" height="36" rx="3" fill={color} stroke="#1e3a8a" strokeWidth="3" />
        <rect x="-15" y="-18" width="6" height="36" fill="#1e3a8a" opacity="0.4" />
        <circle cx="3" cy="-4" r="6" fill="#fde047" stroke="#a16207" strokeWidth="2" />
      </>
    ), key),
  fuzet: ({ x, y, s = 1, color = '#f472b6', key }) =>
    g(x, y, s, (
      <>
        <rect x="-14" y="-18" width="28" height="36" rx="2" fill={color} stroke="#9d174d" strokeWidth="3" />
        <rect x="-8" y="-10" width="16" height="9" rx="2" fill="#fff" stroke="#9d174d" strokeWidth="2" />
      </>
    ), key),
  maci: ({ x, y, s = 1, color = '#b45309', key }) =>
    g(x, y, s, (
      <>
        <circle cx="-9" cy="-16" r="5" fill={color} stroke="#451a03" strokeWidth="2.5" />
        <circle cx="9" cy="-16" r="5" fill={color} stroke="#451a03" strokeWidth="2.5" />
        <ellipse cy="10" rx="13" ry="11" fill={color} stroke="#451a03" strokeWidth="2.5" />
        <circle cy="-8" r="10" fill={color} stroke="#451a03" strokeWidth="2.5" />
        <circle cx="-4" cy="-10" r="1.8" fill="#111827" />
        <circle cx="4" cy="-10" r="1.8" fill="#111827" />
        <ellipse cy="-4" rx="4" ry="3" fill="#fde7c7" />
      </>
    ), key),
  kocka: ({ x, y, s = 1, color = '#f97316', key }) =>
    g(x, y, s, (
      <>
        <rect x="-16" y="-16" width="32" height="32" rx="4" fill={color} stroke="#7c2d12" strokeWidth="3" />
        <path d="M0 -9 L2.6 -3 L9 -2.6 L4 1.6 L5.6 8 L0 4.4 L-5.6 8 L-4 1.6 L-9 -2.6 L-2.6 -3 Z" fill="#fff" />
      </>
    ), key),
  sapka: ({ x, y, s = 1, color = '#3b82f6', key }) =>
    g(x, y, s, (
      <>
        <path d="M-16 6 C-16 -18 16 -18 16 6 Z" fill={color} stroke="#1e3a8a" strokeWidth="3" />
        <path d="M10 6 H26 Q26 11 18 11 H-16 V6 Z" fill={color} stroke="#1e3a8a" strokeWidth="3" strokeLinejoin="round" />
        <circle cy="-12" r="3" fill="#1e3a8a" />
      </>
    ), key),
  zokni: ({ x, y, s = 1, color = '#22c55e', key }) =>
    g(x, y, s, (
      <>
        <path d="M-8 -20 H6 V6 L16 10 Q22 14 18 20 H-2 Q-10 20 -8 10 Z" fill={color} stroke="#14532d" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-8 -14 H6" stroke="#fff" strokeWidth="3" />
      </>
    ), key),
  polo: ({ x, y, s = 1, color = '#f43f5e', key }) =>
    g(x, y, s, <path d="M-8 -18 Q0 -12 8 -18 L22 -10 L16 0 L11 -3 V18 H-11 V-3 L-16 0 L-22 -10 Z" fill={color} stroke="#881337" strokeWidth="3" strokeLinejoin="round" />, key),
  hajo: ({ x, y, s = 1, color = '#ef4444', key }) =>
    g(x, y, s, (
      <>
        <path d="M2 -22 V6 M2 -20 L18 2 H2 Z" fill="#fff" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-2 -16 L-14 2 H-2 Z" fill="#fde047" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-22 6 H22 L14 18 H-14 Z" fill={color} stroke="#7f1d1d" strokeWidth="3" strokeLinejoin="round" />
      </>
    ), key),
  bicikli: ({ x, y, s = 1, color = '#8b5cf6', key }) =>
    g(x, y, s, (
      <>
        <circle cx="-13" cy="8" r="10" fill="none" stroke="#111827" strokeWidth="3" />
        <circle cx="13" cy="8" r="10" fill="none" stroke="#111827" strokeWidth="3" />
        <path d="M-13 8 L-4 -8 H8 L13 8 M-4 -8 L0 8 L8 -8 M8 -8 L6 -14 H12" fill="none" stroke={color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M-7 -12 H0" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
      </>
    ), key),
  kifli: ({ x, y, s = 1, color = '#f59e0b', key }) =>
    g(x, y, s, <path d="M-20 6 Q-14 -16 0 -14 Q14 -16 20 6 Q14 0 8 2 Q0 -6 -8 2 Q-14 0 -20 6 Z" fill={color} stroke="#92400e" strokeWidth="3" strokeLinejoin="round" />, key),
  kenyer: ({ x, y, s = 1, color = '#d97706', key }) =>
    g(x, y, s, (
      <>
        <path d="M-20 10 Q-22 -14 0 -14 Q22 -14 20 10 Z" fill={color} stroke="#78350f" strokeWidth="3" />
        <path d="M-8 -8 L-4 2 M2 -10 L6 0 M10 -7 L13 2" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ), key),
} satisfies Record<string, Draw>;

export type OwnName = keyof typeof OWN;
export type ThingName = IconName | OwnName;

export const OBJ: Record<ThingName, Draw> = { ...ICONS, ...OWN };

/** A tárgyak neve (felolvasáshoz). */
export const NAME: Record<ThingName, string> = {
  alma: 'alma', labda: 'labda', virag: 'virág', csillag: 'csillag', hal: 'hal', auto: 'autó', madar: 'madár', level: 'levél', gomba: 'gomba',
  szív: 'szív', korong: 'korong', pillango: 'pillangó', csiga: 'csiga', meh: 'méh', eper: 'eper', katica: 'katica',
  korte: 'körte', banan: 'banán', szolo: 'szőlő', repa: 'répa', uborka: 'uborka', paradicsom: 'paradicsom', ceruza: 'ceruza', konyv: 'könyv',
  fuzet: 'füzet', maci: 'maci', kocka: 'játékkocka', sapka: 'sapka', zokni: 'zokni', polo: 'póló', hajo: 'hajó', bicikli: 'bicikli', kifli: 'kifli', kenyer: 'kenyér',
};

/** Névelő + szó: „az alma”, „a labda”. */
export const az = (w: string, cap = false) => `${/^[aáeéiíoóöőuúüű]/i.test(w) ? (cap ? 'Az' : 'az') : cap ? 'A' : 'a'} ${w}`;

export interface ThingSpec {
  n: ThingName;
  color?: string;
  /** méret-szorzó (1 = alap) */
  s?: number;
}

/** Egy tárgy keretes kártyán (válaszgombhoz, kártyához). */
export const Thing: React.FC<ThingSpec & { className?: string; frame?: boolean }> = ({ n, color, s = 1, className = 'w-24 h-24', frame = true }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {frame && <rect x="3" y="3" width="94" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />}
    {OBJ[n]({ x: 50, y: 52, s: 1.7 * s, color })}
  </svg>
);

/** Válaszlehetőség egy tárggyal. */
export const thing = (n: ThingName, say?: string, color?: string, s?: number) => ({ figure: <Thing n={n} color={color} s={s} />, say: say ?? NAME[n] });

/** Tárgyak sora egy SVG-ben (kakukktojás, csoport). */
export const ThingRow: React.FC<{ items: ThingSpec[]; className?: string; bg?: string }> = ({ items, className, bg = '#fff' }) => {
  const w = items.length * 90 + 20;
  return (
    <svg viewBox={`0 0 ${w} 110`} className={className}>
      <rect x="2" y="2" width={w - 4} height="106" rx="18" fill={bg} stroke="#cbd5e1" strokeWidth="3" />
      {items.map((it, i) => OBJ[it.n]({ x: 55 + i * 90, y: 56, s: 1.6 * (it.s ?? 1), color: it.color, key: i }))}
    </svg>
  );
};

/** Csoport kerettel (karika), pl. „ezek az állatok”. Kicsi, kártyára is jó. */
export const GroupRing: React.FC<{ items: ThingSpec[]; ring?: string; className?: string }> = ({ items, ring = '#3b82f6', className = 'w-28 h-24' }) => {
  const pos: [number, number][] = items.length <= 2 ? [[38, 50], [82, 50]] : [[36, 36], [84, 36], [60, 72], [36, 72], [84, 72]];
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="4" y="4" width="112" height="92" rx="40" fill="#fff" stroke={ring} strokeWidth="5" />
      {items.slice(0, 5).map((it, i) => OBJ[it.n]({ x: pos[i][0], y: pos[i][1], s: 0.95 * (it.s ?? 1), color: it.color, key: i }))}
    </svg>
  );
};

/** Kis csoport-kép: állatok / járművek / ételek. */
export const GroupRingFig: React.FC<{ kind: 'allat' | 'jarmu' | 'etel' | 'ruha' }> = ({ kind }) => {
  const sets = {
    allat: { items: [{ n: 'hal' as const }, { n: 'csiga' as const }, { n: 'katica' as const }], ring: COL.kek },
    jarmu: { items: [{ n: 'auto' as const }, { n: 'hajo' as const }, { n: 'bicikli' as const }], ring: COL.zold },
    etel: { items: [{ n: 'kifli' as const }, { n: 'alma' as const }, { n: 'kenyer' as const }], ring: COL.piros },
    ruha: { items: [{ n: 'sapka' as const }, { n: 'zokni' as const }, { n: 'polo' as const }], ring: COL.lila },
  }[kind];
  return <GroupRing items={sets.items} ring={sets.ring} />;
};

/** Kosár: a válogatás „doboza”. A jel (kis kép) mutatja, mi való bele. */
export const Basket: React.FC<{ sign?: ThingSpec[]; inside?: ThingSpec[]; color?: string; className?: string }> = ({ sign = [], inside = [], color = '#b45309', className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 140 120" className={className}>
    <path d="M30 50 Q70 -6 110 50" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
    {inside.slice(0, 4).map((it, i) => OBJ[it.n]({ x: 34 + i * 24, y: 50 - (i % 2) * 8, s: 0.85 * (it.s ?? 1), color: it.color, key: `in${i}` }))}
    <path d="M14 52 H126 L112 112 H28 Z" fill="#fbbf24" stroke={color} strokeWidth="5" strokeLinejoin="round" />
    <path d="M22 72 H118 M26 92 H114" stroke={color} strokeWidth="3" opacity="0.6" />
    {sign.length > 0 && (
      <>
        <circle cx="70" cy="84" r="24" fill="#fff" stroke={color} strokeWidth="3" />
        {sign.length === 1
          ? OBJ[sign[0].n]({ x: 70, y: 84, s: 0.85, color: sign[0].color })
          : sign.slice(0, 2).map((it, i) => OBJ[it.n]({ x: 60 + i * 20, y: 84, s: 0.5, color: it.color, key: `sg${i}` }))}
      </>
    )}
  </svg>
);

/** Gomb (ruhagomb): szín, nagyság, lyukak száma, forma szerint különbözhet. */
export const Button: React.FC<{ color: string; big?: boolean; holes?: 2 | 4; square?: boolean; className?: string }> = ({ color, big = true, holes = 4, square = false, className = 'w-24 h-24' }) => {
  const r = big ? 34 : 20;
  const hp: [number, number][] = holes === 2 ? [[-6, 0], [6, 0]] : [[-6, -6], [6, -6], [-6, 6], [6, 6]];
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="3" y="3" width="94" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {square ? (
        <rect x={50 - r} y={50 - r} width={2 * r} height={2 * r} rx="6" fill={color} stroke="#1f2937" strokeWidth="3" />
      ) : (
        <circle cx="50" cy="50" r={r} fill={color} stroke="#1f2937" strokeWidth="3" />
      )}
      {hp.map(([a, b], i) => (
        <circle key={i} cx={50 + a} cy={50 + b} r="3.5" fill="#fff" stroke="#1f2937" strokeWidth="1.5" />
      ))}
    </svg>
  );
};

const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 60} Q${w / 3} ${h - 90} ${w / 2} ${h - 62} T${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** 1. oldal: Pötyi bemutatkozik a Számkert kapujában. */
export const HelloScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <rect x="300" y="70" width="12" height="150" fill="#92400e" />
    <rect x="420" y="70" width="12" height="150" fill="#92400e" />
    <path d="M296 70 Q366 20 436 70" fill="none" stroke="#92400e" strokeWidth="10" />
    <circle cx="366" cy="96" r="16" fill="#fde047" stroke="#a16207" strokeWidth="3" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={356 + (i % 2) * 20} cy={90 + Math.floor(i / 2) * 12} r="3" fill="#111827" />
    ))}
    {OBJ.virag({ x: 330, y: 222, s: 0.9 })}
    {OBJ.virag({ x: 402, y: 228, s: 0.9, color: COL.lila })}
    <Potyi mood="cheer" x={30} y={40} size={210} />
  </svg>
);

/** 2. oldal: a Számkert – fa, virágok, tavacska, Zümi és Csigusz. */
export const GardenScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <rect x="66" y="120" width="22" height="90" rx="6" fill="#92400e" />
    <circle cx="77" cy="96" r="60" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
    {OBJ.alma({ x: 60, y: 90, s: 0.9 })}
    {OBJ.alma({ x: 96, y: 110, s: 0.9 })}
    <ellipse cx="350" cy="220" rx="90" ry="24" fill="#7dd3fc" stroke="#0284c7" strokeWidth="4" />
    {OBJ.hal({ x: 340, y: 220, s: 0.8 })}
    {OBJ.virag({ x: 170, y: 214, s: 1 })}
    {OBJ.virag({ x: 214, y: 222, s: 1, color: COL.sarga })}
    {OBJ.virag({ x: 250, y: 208, s: 1, color: COL.lila })}
    {OBJ.meh({ x: 300, y: 70, s: 1.6 })}
    {OBJ.csiga({ x: 150, y: 172, s: 1.4 })}
    <Potyi mood="happy" x={200} y={60} size={110} />
  </svg>
);

/** 3. oldal: a szél mindent összekevert. */
export const MessScene: React.FC = () => {
  const pile: [ThingName, number, number, string?][] = [
    ['alma', 90, 150], ['labda', 150, 190], ['ceruza', 210, 140], ['repa', 270, 196], ['maci', 330, 150, undefined],
    ['banan', 390, 196], ['zokni', 120, 210], ['korte', 300, 110], ['konyv', 380, 120], ['kocka', 200, 200],
  ];
  return (
    <svg viewBox="0 0 480 260">
      {sky(480, 260)}
      <path d="M30 50 Q80 30 120 50 T210 48 M60 80 Q110 60 160 80" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      {pile.map(([n, x, y, c], i) => OBJ[n]({ x, y, s: 1.2, color: c, key: i }))}
      <Potyi mood="wow" x={330} y={6} size={100} />
    </svg>
  );
};

/** Két kosár: gyümölcs és zöldség (a gyerek dönti el, mi hová kerül). */
export const TwoBasketsScene: React.FC<{ left?: ThingSpec[]; right?: ThingSpec[]; item?: ThingName }> = ({ left = [], right = [], item }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef9c3" />
    <svg x="10" y="70" width="190" height="160" viewBox="0 0 140 120">
      <Basket sign={[{ n: 'alma' }, { n: 'banan' }]} inside={left} className="" />
    </svg>
    <svg x="280" y="70" width="190" height="160" viewBox="0 0 140 120">
      <Basket sign={[{ n: 'repa' }, { n: 'uborka' }]} inside={right} className="" />
    </svg>
    {item && (
      <>
        <circle cx="240" cy="70" r="46" fill="#fff" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 6" />
        {OBJ[item]({ x: 240, y: 72, s: 1.7 })}
      </>
    )}
  </svg>
);

/** Iskolatáska (a „mi való bele?” kérdésekhez). */
export const SchoolBagScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#ede9fe" />
    <path d="M200 60 Q240 20 280 60" fill="none" stroke="#6d28d9" strokeWidth="10" strokeLinecap="round" />
    <rect x="170" y="56" width="140" height="146" rx="26" fill="#8b5cf6" stroke="#4c1d95" strokeWidth="6" />
    <rect x="192" y="120" width="96" height="60" rx="14" fill="#a78bfa" stroke="#4c1d95" strokeWidth="5" />
    {OBJ.csillag({ x: 240, y: 92, s: 1, color: COL.sarga })}
    {OBJ.csiga({ x: 380, y: 180, s: 1.6 })}
  </svg>
);

/** Játékpolc. */
export const ShelfScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef3c7" />
    <rect x="130" y="30" width="12" height="180" fill="#b45309" />
    <rect x="338" y="30" width="12" height="180" fill="#b45309" />
    {[70, 130, 190].map((y) => (
      <rect key={y} x="130" y={y} width="220" height="10" fill="#d97706" stroke="#92400e" strokeWidth="2" />
    ))}
    {OBJ.labda({ x: 190, y: 50, s: 1 })}
    {OBJ.auto({ x: 290, y: 112, s: 1.1 })}
  </svg>
);

/** Két doboz: hogyan válogatott Pötyi? */
export const TwoBoxesScene: React.FC<{ left: ThingSpec[]; right: ThingSpec[]; leftRing?: string; rightRing?: string }> = ({ left, right, leftRing = '#64748b', rightRing = '#64748b' }) => (
  <svg viewBox="0 0 480 200">
    <svg x="10" y="10" width="220" height="180" viewBox="0 0 120 100">
      <GroupRing items={left} ring={leftRing} className="" />
    </svg>
    <svg x="250" y="10" width="220" height="180" viewBox="0 0 120 100">
      <GroupRing items={right} ring={rightRing} className="" />
    </svg>
  </svg>
);

/** Egy tárgy nagyban, a „melyik csoportba illik?” kérdésekhez. */
export const BigThing: React.FC<ThingSpec> = ({ n, color, s = 1 }) => (
  <svg viewBox="0 0 480 180">
    <rect x="0" y="0" width="480" height="180" rx="18" fill="#f0f9ff" />
    <circle cx="240" cy="90" r="70" fill="#fff" stroke="#7c3aed" strokeWidth="4" strokeDasharray="10 7" />
    {OBJ[n]({ x: 240, y: 92, s: 2.8 * s, color })}
  </svg>
);

/** A keresett gomb nagyban: „keresd meg a párját!”. */
export const ButtonScene: React.FC<{ color: string; big?: boolean; holes?: 2 | 4; square?: boolean }> = (p) => (
  <svg viewBox="0 0 480 180">
    <rect x="0" y="0" width="480" height="180" rx="18" fill="#fdf4ff" />
    <svg x="170" y="10" width="160" height="160" viewBox="0 0 100 100">
      <Button {...p} className="" />
    </svg>
  </svg>
);

/** Utolsó oldal: rendet raktunk – teli kosarak. */
export const TidyScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <svg x="10" y="90" width="150" height="130" viewBox="0 0 140 120">
      <Basket inside={[{ n: 'alma' }, { n: 'banan' }, { n: 'korte' }, { n: 'eper' }]} className="" />
    </svg>
    <svg x="165" y="90" width="150" height="130" viewBox="0 0 140 120">
      <Basket inside={[{ n: 'repa' }, { n: 'uborka' }, { n: 'paradicsom' }]} className="" />
    </svg>
    <svg x="320" y="90" width="150" height="130" viewBox="0 0 140 120">
      <Basket inside={[{ n: 'labda' }, { n: 'maci' }, { n: 'kocka' }]} color="#7c3aed" className="" />
    </svg>
    <Potyi mood="cheer" x={190} y={0} size={100} />
  </svg>
);
