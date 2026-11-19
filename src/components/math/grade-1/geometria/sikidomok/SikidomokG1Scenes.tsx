// „Síkidomok” – a mese és a játék képei: kör, háromszög, négyzet, téglalap (a tankönyv nevei), formaképek, tükör.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

export type ShapeK = 'kor' | 'haromszog' | 'derekszogu' | 'negyzet' | 'teglalap' | 'ovalis';
export const SHAPE_NAME: Record<ShapeK, string> = {
  kor: 'kör',
  haromszog: 'háromszög',
  derekszogu: 'háromszög',
  negyzet: 'négyzet',
  teglalap: 'téglalap',
  ovalis: 'tojás alakú forma',
};

export const COLORS = {
  piros: '#ef4444',
  kek: '#3b82f6',
  sarga: '#facc15',
  zold: '#22c55e',
  lila: '#a855f7',
  narancs: '#f97316',
};
const STROKE: Record<string, string> = {
  '#ef4444': '#7f1d1d',
  '#3b82f6': '#1e3a8a',
  '#facc15': '#a16207',
  '#22c55e': '#14532d',
  '#a855f7': '#581c87',
  '#f97316': '#7c2d12',
};
export const COLOR_NAME: Record<string, string> = { '#ef4444': 'piros', '#3b82f6': 'kék', '#facc15': 'sárga', '#22c55e': 'zöld', '#a855f7': 'lila', '#f97316': 'narancssárga' };
const strokeOf = (c: string) => STROKE[c] ?? '#334155';

export interface ShapeSpec {
  k: ShapeK;
  x: number;
  y: number;
  /** méret: a forma kb. 2·r széles */
  r?: number;
  color?: string;
  rot?: number;
}

/** Egy síkidom egy SVG-n belül (középpont x, y). */
export const shapeEl = ({ k, x, y, r = 20, color = COLORS.kek, rot = 0 }: ShapeSpec, key?: React.Key) => {
  const st = { fill: color, stroke: strokeOf(color), strokeWidth: Math.max(2, r / 8), strokeLinejoin: 'round' as const };
  let el: React.ReactNode;
  switch (k) {
    case 'kor':
      el = <circle cx={0} cy={0} r={r} {...st} />;
      break;
    case 'ovalis':
      el = <ellipse cx={0} cy={0} rx={r} ry={r * 0.6} {...st} />;
      break;
    case 'haromszog':
      el = <path d={`M0 ${-r} L${r * 1.05} ${r * 0.8} L${-r * 1.05} ${r * 0.8} Z`} {...st} />;
      break;
    case 'derekszogu':
      el = <path d={`M${-r} ${-r} L${r} ${r * 0.8} L${-r} ${r * 0.8} Z`} {...st} />;
      break;
    case 'negyzet':
      el = <rect x={-r * 0.85} y={-r * 0.85} width={r * 1.7} height={r * 1.7} {...st} />;
      break;
    case 'teglalap':
      el = <rect x={-r * 1.2} y={-r * 0.6} width={r * 2.4} height={r * 1.2} {...st} />;
      break;
  }
  return (
    <g key={key} transform={`translate(${x} ${y}) rotate(${rot})`}>
      {el}
    </g>
  );
};

/** Egy síkidom kártyán. */
export const ShapeFig: React.FC<{ k: ShapeK; color?: string; r?: number; rot?: number; className?: string; frame?: boolean }> = ({ k, color, r = 26, rot, className = 'w-24 h-24', frame = true }) => (
  <svg viewBox="0 0 80 80" className={className}>
    {frame && <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />}
    {shapeEl({ k, x: 40, y: k === 'haromszog' ? 44 : 40, r, color, rot })}
  </svg>
);
/** Válaszlehetőség: { figure, say } */
export const shp = (k: ShapeK, color?: string, opts: { r?: number; rot?: number; say?: string } = {}) => ({
  figure: <ShapeFig k={k} color={color} r={opts.r} rot={opts.rot} />,
  say: opts.say ?? (color && COLOR_NAME[color] ? COLOR_NAME[color] + ' ' : '') + SHAPE_NAME[k],
});

/** Formák egy sorban (sorminta, válogatás). A null egy „?”-es üres hely. */
export const ShapeRowScene: React.FC<{ items: (Omit<ShapeSpec, 'x' | 'y'> | null)[]; className?: string }> = ({ items, className }) => {
  const w = items.length * 70 + 20;
  return (
    <svg viewBox={`0 0 ${w} 90`} className={className}>
      <rect x="2" y="2" width={w - 4} height="86" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {items.map((it, i) =>
        it ? (
          shapeEl({ ...it, x: 45 + i * 70, y: it.k === 'haromszog' ? 48 : 45, r: it.r ?? 24 }, i)
        ) : (
          <g key={i}>
            <rect x={45 + i * 70 - 28} y={17} width="56" height="56" rx="10" fill="#f8fafc" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
            <text x={45 + i * 70} y={58} textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
              ?
            </text>
          </g>
        )
      )}
    </svg>
  );
};

/** Formákból kirakott kép (szabad elrendezés). */
export const ShapePicture: React.FC<{ shapes: ShapeSpec[]; w?: number; h?: number; bg?: string; className?: string; children?: React.ReactNode }> = ({ shapes, w = 240, h = 200, bg = '#fff', className, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className}>
    <rect x="2" y="2" width={w - 4} height={h - 4} rx="16" fill={bg} stroke="#cbd5e1" strokeWidth="3" />
    {shapes.map((s, i) => shapeEl(s, i))}
    {children}
  </svg>
);

const C = COLORS;
/** Rakéta: 5 háromszög (1 orr, 2 szárny, 2 láng), 2 négyzet. */
export const ROCKET: ShapeSpec[] = [
  { k: 'haromszog', x: 120, y: 44, r: 26, color: C.piros },
  { k: 'negyzet', x: 120, y: 90, r: 22, color: C.kek },
  { k: 'negyzet', x: 120, y: 128, r: 22, color: C.kek },
  { k: 'haromszog', x: 86, y: 136, r: 14, color: C.piros },
  { k: 'haromszog', x: 154, y: 136, r: 14, color: C.piros },
  { k: 'haromszog', x: 108, y: 172, r: 10, color: C.sarga, rot: 180 },
  { k: 'haromszog', x: 132, y: 172, r: 10, color: C.sarga, rot: 180 },
];
/** Virág: 6 kör (5 szirom + közép), 1 téglalap szár, 2 háromszög levél. */
export const FLOWER: ShapeSpec[] = [
  { k: 'teglalap', x: 120, y: 150, r: 26, color: C.zold, rot: 90 },
  { k: 'haromszog', x: 96, y: 160, r: 14, color: C.zold, rot: -90 },
  { k: 'haromszog', x: 144, y: 150, r: 14, color: C.zold, rot: 90 },
  { k: 'kor', x: 120, y: 38, r: 18, color: C.lila },
  { k: 'kor', x: 154, y: 62, r: 18, color: C.lila },
  { k: 'kor', x: 142, y: 100, r: 18, color: C.lila },
  { k: 'kor', x: 98, y: 100, r: 18, color: C.lila },
  { k: 'kor', x: 86, y: 62, r: 18, color: C.lila },
  { k: 'kor', x: 120, y: 72, r: 16, color: C.sarga },
];
/** Vonat: 4 négyzet (1 fülke + 3 kocsi), 1 téglalap, 1 háromszög kémény, 4 kör kerék. */
export const TRAIN: ShapeSpec[] = [
  { k: 'teglalap', x: 70, y: 128, r: 24, color: C.piros },
  { k: 'negyzet', x: 76, y: 99, r: 18, color: C.piros },
  { k: 'haromszog', x: 50, y: 104, r: 10, color: C.sarga },
  { k: 'negyzet', x: 138, y: 124, r: 20, color: C.kek },
  { k: 'negyzet', x: 188, y: 124, r: 20, color: C.zold },
  { k: 'negyzet', x: 238, y: 124, r: 20, color: C.narancs },
  { k: 'kor', x: 52, y: 162, r: 11, color: '#334155' },
  { k: 'kor', x: 90, y: 162, r: 11, color: '#334155' },
  { k: 'kor', x: 163, y: 162, r: 11, color: '#334155' },
  { k: 'kor', x: 213, y: 162, r: 11, color: '#334155' },
];

/** Bűvös négyzet (TK 8/3 mintájára): minden sorban és oszlopban egy kör, egy háromszög, egy négyzet. */
export const MagicGridScene: React.FC<{ grid: (ShapeK | null)[][]; color?: string }> = ({ grid, color = C.kek }) => (
  <svg viewBox="0 0 240 240" className="w-56 h-56 mx-auto">
    <rect x="2" y="2" width="236" height="236" rx="14" fill="#eef2ff" stroke="#6366f1" strokeWidth="3" />
    {grid.map((row, i) =>
      row.map((k, j) => (
        <g key={`${i}-${j}`}>
          <rect x={10 + j * 74} y={10 + i * 74} width="70" height="70" rx="8" fill="#fff" stroke="#a5b4fc" strokeWidth="2" />
          {k ? (
            shapeEl({ k, x: 45 + j * 74, y: 45 + i * 74 + (k === 'haromszog' ? 3 : 0), r: 22, color })
          ) : (
            <text x={45 + j * 74} y={58 + i * 74} textAnchor="middle" fontSize="38" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
              ?
            </text>
          )}
        </g>
      ))
    )}
  </svg>
);

/** Síkidom pálcikákból (minden oldal más színű pálcika, mint a munkafüzetben). */
const STICK_COLORS = ['#ef4444', '#2563eb', '#16a34a', '#eab308'];
export const StickShape: React.FC<{ k: 'haromszog' | 'negyzet' | 'teglalap'; x?: number; y?: number; size?: number }> = ({ k, x = 0, y = 0, size = 1 }) => {
  const pts: [number, number][] =
    k === 'haromszog'
      ? [[50, 8], [92, 82], [8, 82]]
      : k === 'negyzet'
        ? [[14, 10], [86, 10], [86, 82], [14, 82]]
        : [[4, 24], [116, 24], [116, 76], [4, 76]];
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      {pts.map((p, i) => {
        const q = pts[(i + 1) % pts.length];
        return <path key={i} d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke={STICK_COLORS[i]} strokeWidth="7" strokeLinecap="round" />;
      })}
    </g>
  );
};
export const StickShapesScene: React.FC<{ shapes: ('haromszog' | 'negyzet' | 'teglalap')[]; className?: string }> = ({ shapes, className }) => {
  const w = shapes.length * 120 + 20;
  return (
    <svg viewBox={`0 0 ${w} 110`} className={className}>
      <rect x="2" y="2" width={w - 4} height="106" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {shapes.map((k, i) => (
        <StickShape key={i} k={k} x={20 + i * 120} y={10} />
      ))}
    </svg>
  );
};

/** Négyzetek az ábrán (TK 130/3 mintájára): nagy négyzet, a sarkában egy kisebb. */
export const NestedSquaresScene: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
    <rect x="20" y="20" width="160" height="160" fill="#fff" stroke="#1d4ed8" strokeWidth="5" />
    <rect x="100" y="100" width="80" height="80" fill="none" stroke="#1d4ed8" strokeWidth="5" />
  </svg>
);

/** 1. oldal: Pötyi a formás zsákkal; a síkidomok a fűben. */
export const ShapesHelloScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 180 Q160 150 240 175 T480 170 V250 H0 Z" fill="#86efac" />
    <Potyi mood="cheer" dots={7} x={10} y={50} size={160} />
    <path d="M200 210 Q190 120 240 110 Q290 120 280 210 Z" fill="#fde68a" stroke="#a16207" strokeWidth="4" />
    <path d="M226 112 Q240 92 254 112" fill="none" stroke="#a16207" strokeWidth="4" />
    {shapeEl({ k: 'kor', x: 330, y: 200, r: 20, color: C.piros })}
    {shapeEl({ k: 'haromszog', x: 385, y: 205, r: 20, color: C.sarga })}
    {shapeEl({ k: 'negyzet', x: 440, y: 200, r: 18, color: C.kek })}
    {shapeEl({ k: 'teglalap', x: 370, y: 150, r: 20, color: C.zold, rot: -10 })}
    {ICONS.meh({ x: 420, y: 60, s: 1.4 })}
  </svg>
);

/** A négy síkidom egymás mellett, kis felirattal. */
export const FourShapesScene: React.FC<{ labels?: boolean }> = ({ labels = true }) => (
  <svg viewBox="0 0 480 170">
    <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef9c3" />
    {shapeEl({ k: 'kor', x: 70, y: 72, r: 42, color: C.piros })}
    {shapeEl({ k: 'haromszog', x: 182, y: 78, r: 44, color: C.sarga })}
    {shapeEl({ k: 'negyzet', x: 296, y: 72, r: 40, color: C.kek })}
    {shapeEl({ k: 'teglalap', x: 412, y: 72, r: 38, color: C.zold })}
    {labels &&
      [
        [70, 'kör'],
        [182, 'háromszög'],
        [296, 'négyzet'],
        [412, 'téglalap'],
      ].map(([x, t]) => (
        <text key={String(t)} x={Number(x)} y={152} textAnchor="middle" fontSize="20" fontWeight="800" fill="#334155" fontFamily="system-ui, sans-serif">
          {t}
        </text>
      ))}
  </svg>
);

/** Négyzet és téglalap egymás mellett, a négyzet oldalai mellett egyforma pálcikák. */
export const SquareVsRectScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#f0fdf4" />
    <StickShape k="negyzet" x={50} y={40} size={1.4} />
    <StickShape k="teglalap" x={270} y={40} size={1.4} />
  </svg>
);

/** Zsák síkidomokkal (válogatás: melyik nem illik bele?). */
export const SackScene: React.FC<{ shapes: Omit<ShapeSpec, 'x' | 'y'>[] }> = ({ shapes }) => {
  const pos: [number, number][] = [[200, 120], [270, 110], [230, 175], [300, 170], [180, 180]];
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#f8fafc" />
      <path d="M140 230 Q120 100 220 70 L260 70 Q360 100 340 230 Z" fill="#fff7ed" stroke="#a16207" strokeWidth="5" />
      <path d="M220 70 Q240 40 260 70" fill="none" stroke="#a16207" strokeWidth="5" />
      {shapes.map((s, i) => shapeEl({ ...s, x: pos[i][0], y: pos[i][1], r: s.r ?? 22 }, i))}
    </svg>
  );
};

/** Ház kirakva síkidomokból, a tető helyén „?”. */
export const HouseBuildScene: React.FC<{ roof?: boolean }> = ({ roof = false }) => (
  <svg viewBox="0 0 480 230">
    <rect x="0" y="0" width="480" height="230" rx="18" fill="#e0f2fe" />
    <path d="M0 200 H480 V230 H0 Z" fill="#86efac" />
    {roof ? (
      shapeEl({ k: 'haromszog', x: 240, y: 70, r: 70, color: C.piros })
    ) : (
      <g>
        <path d="M166 126 L240 14 L314 126 Z" fill="#f8fafc" stroke="#7c3aed" strokeWidth="4" strokeDasharray="10 7" />
        <text x="240" y="104" textAnchor="middle" fontSize="44" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
          ?
        </text>
      </g>
    )}
    <rect x="176" y="126" width="128" height="74" fill="#fde68a" stroke="#a16207" strokeWidth="4" />
    <rect x="192" y="140" width="34" height="34" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="3" />
    <rect x="246" y="146" width="36" height="54" fill="#b45309" stroke="#78350f" strokeWidth="3" />
    <Potyi dots={7} x={360} y={110} size={100} mood={roof ? 'cheer' : 'think'} />
  </svg>
);

/** Tükör: bal oldalt a forma, középen a piros tükörvonal, jobb oldalt „?” vagy a tükörkép. */
const FLAG = 'M0 0 L36 0 L36 18 L18 18 L18 60 L0 60 Z';
export const MirrorFig: React.FC<{ mode: 'mirror' | 'same' | 'flip'; color?: string; className?: string }> = ({ mode, color = C.lila, className = 'w-20 h-24' }) => (
  <svg viewBox="0 0 70 80" className={className}>
    <rect x="2" y="2" width="66" height="76" rx="12" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    <g transform={mode === 'mirror' ? 'translate(53 10) scale(-1 1)' : mode === 'flip' ? 'translate(17 70) scale(1 -1)' : 'translate(17 10)'}>
      <path d={FLAG} fill={color} stroke={strokeOf(color)} strokeWidth="3" strokeLinejoin="round" />
    </g>
  </svg>
);
export const MirrorScene: React.FC<{ solved?: boolean }> = ({ solved = false }) => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#ecfeff" />
    <g transform="translate(150 60)">
      <path d={FLAG} fill={C.lila} stroke={strokeOf(C.lila)} strokeWidth="3" strokeLinejoin="round" />
    </g>
    <rect x="236" y="20" width="8" height="160" rx="4" fill="#e11d48" />
    {solved ? (
      <g transform="translate(330 60) scale(-1 1)">
        <path d={FLAG} fill={C.lila} stroke={strokeOf(C.lila)} strokeWidth="3" strokeLinejoin="round" opacity="0.7" />
      </g>
    ) : (
      <text x="310" y="122" textAnchor="middle" fontSize="60" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
        ?
      </text>
    )}
  </svg>
);

/** Pötyi a tócsa fölött: a vízben a tükörképe. */
export const PuddleScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
    <path d="M0 120 H480 V240 H0 Z" fill="#86efac" />
    <ellipse cx="240" cy="170" rx="190" ry="60" fill="#7dd3fc" stroke="#0284c7" strokeWidth="4" />
    <Potyi dots={7} x={190} y={20} size={100} />
    <g opacity="0.55" transform="translate(0 240) scale(1 -1)">
      <Potyi dots={7} x={190} y={20} size={100} />
    </g>
    <rect x="60" y="118" width="360" height="5" fill="#e11d48" opacity="0.6" />
  </svg>
);

/** Összehajtható (szimmetrikus) és nem összehajtható rajzok. */
export type FoldK = 'sziv' | 'pillango' | 'kor' | 'auto' | 'zaszlo' | 'derekszogu' | 'level';
export const FOLD_OK: Record<FoldK, boolean> = { sziv: true, pillango: true, kor: true, auto: false, zaszlo: false, derekszogu: false, level: true };
export const FOLD_SAY: Record<FoldK, string> = { sziv: 'szív', pillango: 'pillangó', kor: 'kör', auto: 'autó', zaszlo: 'zászló', derekszogu: 'háromszög', level: 'levél' };
export const FoldFig: React.FC<{ k: FoldK; className?: string }> = ({ k, className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {k === 'sziv' && <path d="M40 66 C10 46 10 18 28 16 C36 15 40 22 40 26 C40 22 44 15 52 16 C70 18 70 46 40 66 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />}
    {k === 'pillango' && ICONS.pillango({ x: 40, y: 40, s: 1.4 })}
    {k === 'kor' && <circle cx="40" cy="40" r="24" fill="#22c55e" stroke="#14532d" strokeWidth="3" />}
    {k === 'auto' && ICONS.auto({ x: 40, y: 42, s: 1.3 })}
    {k === 'zaszlo' && <path d="M24 66 V14 L58 26 L24 38" fill="#facc15" stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />}
    {k === 'derekszogu' && <path d="M18 62 L18 18 L62 62 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" strokeLinejoin="round" />}
    {k === 'level' && <path d="M40 10 C62 24 62 52 40 70 C18 52 18 24 40 10 Z M40 14 V70" fill="#4ade80" stroke="#15803d" strokeWidth="3" />}
  </svg>
);
export const fold = (k: FoldK) => ({ figure: <FoldFig k={k} />, say: FOLD_SAY[k] });

/** Hétköznapi tárgyak a síkidomokhoz (párosító). */
export type ThingK = 'tanyer' | 'ablak' | 'ajto' | 'zaszlocska';
export const ThingFig: React.FC<{ k: ThingK; className?: string }> = ({ k, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {k === 'tanyer' && (
      <>
        <circle cx="40" cy="40" r="28" fill="#f1f5f9" stroke="#475569" strokeWidth="3" />
        <circle cx="40" cy="40" r="17" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      </>
    )}
    {k === 'ablak' && (
      <>
        <rect x="16" y="16" width="48" height="48" fill="#bae6fd" stroke="#92400e" strokeWidth="4" />
        <path d="M40 16 V64 M16 40 H64" stroke="#92400e" strokeWidth="4" />
      </>
    )}
    {k === 'ajto' && (
      <>
        <rect x="24" y="8" width="32" height="64" fill="#b45309" stroke="#78350f" strokeWidth="3" />
        <circle cx="49" cy="42" r="3" fill="#facc15" />
      </>
    )}
    {k === 'zaszlocska' && (
      <>
        <path d="M10 18 H70" stroke="#475569" strokeWidth="3" />
        <path d="M16 18 L28 50 L40 18 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M42 18 L54 50 L66 18 Z" fill="#facc15" stroke="#a16207" strokeWidth="2.5" strokeLinejoin="round" />
      </>
    )}
  </svg>
);
