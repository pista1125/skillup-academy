// „A hosszúság mérése” – a mese és a játék képei (Csigusz születésnapja: szalagok, pad, virágok mérése).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

export const ROD = '#fb923c';
const ROD_STROKE = '#9a3412';

export const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 60} Q${w / 3} ${h - 85} ${w / 2} ${h - 65} T${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** n narancssárga rúd egymás után (vízszintesen), egy rúd u széles. */
export const rodRow = (x: number, y: number, n: number, u = 40, h = 18, key = 'r') => (
  <g key={key}>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x + i * u + 1} y={y} width={u - 2} height={h} rx="3" fill={ROD} stroke={ROD_STROKE} strokeWidth="2.5" />
    ))}
  </g>
);

/** n rúd egymásra állítva (függőlegesen), alja: baseY. */
export const rodStack = (x: number, baseY: number, n: number, u = 40, w = 22, key = 's') => (
  <g key={key}>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x} y={baseY - (i + 1) * u + 1} width={w} height={u - 2} rx="3" fill={ROD} stroke={ROD_STROKE} strokeWidth="2.5" />
    ))}
  </g>
);

export type ThingKind = 'ceruza' | 'radir' | 'ecset' | 'szalag' | 'palcika' | 'katica' | 'kulcs';

/** Vízszintes tárgy x-től len hosszan, yc magasságban középre igazítva. */
export const thing = (k: ThingKind, x: number, yc: number, len: number, color = '#22c55e', key: React.Key = 't') => {
  switch (k) {
    case 'ceruza':
      return (
        <g key={key}>
          <rect x={x} y={yc - 8} width={len - 18} height="16" rx="3" fill={color} stroke="#14532d" strokeWidth="2.5" />
          <path d={`M${x + len - 18} ${yc - 8} L${x + len} ${yc} L${x + len - 18} ${yc + 8} Z`} fill="#fde68a" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
          <path d={`M${x + len - 6} ${yc - 3} L${x + len} ${yc} L${x + len - 6} ${yc + 3} Z`} fill="#1f2937" />
        </g>
      );
    case 'radir':
      return (
        <g key={key}>
          <rect x={x} y={yc - 10} width={len} height="20" rx="4" fill="#fff" stroke="#334155" strokeWidth="2.5" />
          <rect x={x} y={yc - 10} width={len / 2} height="20" rx="4" fill="#60a5fa" stroke="#334155" strokeWidth="2.5" />
        </g>
      );
    case 'ecset':
      return (
        <g key={key}>
          <path d={`M${x + 3} ${yc} H${x + len - 20}`} stroke="#a16207" strokeWidth="7" strokeLinecap="round" />
          <path d={`M${x + len - 22} ${yc - 6} Q${x + len} ${yc - 4} ${x + len} ${yc} Q${x + len} ${yc + 4} ${x + len - 22} ${yc + 6} Z`} fill="#1f2937" />
        </g>
      );
    case 'szalag':
      return (
        <path key={key} d={`M${x} ${yc - 8} H${x + len} L${x + len - 7} ${yc} L${x + len} ${yc + 8} H${x} Z`} fill={color} stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
      );
    case 'palcika':
      return <path key={key} d={`M${x + 4} ${yc} H${x + len - 4}`} stroke="#a16207" strokeWidth="8" strokeLinecap="round" />;
    case 'kulcs':
      return (
        <g key={key}>
          <circle cx={x + 9} cy={yc} r="8" fill="none" stroke="#a16207" strokeWidth="4" />
          <path d={`M${x + 17} ${yc} H${x + len} M${x + len - 4} ${yc} V${yc + 7} M${x + len - 11} ${yc} V${yc + 6}`} stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case 'katica':
    default:
      return <g key={key}>{ICONS.katica({ x: x + len / 2, y: yc, s: len / 40 })}</g>;
  }
};

export const THING_SAY: Record<ThingKind, string> = {
  ceruza: 'ceruza',
  radir: 'radír',
  ecset: 'ecset',
  szalag: 'szalag',
  palcika: 'pálcika',
  katica: 'katica',
  kulcs: 'kulcs',
};

/** Tárgy a narancssárga rúd alatt (közös kezdővonal): rövidebb, ugyanolyan hosszú vagy hosszabb. rel = hossz rúdban. */
export const VsRodFig: React.FC<{ k: ThingKind; rel: number; color?: string; className?: string }> = ({ k, rel, color, className = 'w-48 h-16' }) => (
  <svg viewBox="0 0 250 80" className={className}>
    <rect x="2" y="2" width="246" height="76" rx="12" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    <path d="M14 6 V74" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M94 6 V74" stroke="#fdba74" strokeWidth="2" strokeDasharray="5 4" />
    {rodRow(14, 12, 1, 80, 18)}
    {thing(k, 14, 54, rel * 80, color)}
  </svg>
);
export const vsRod = (k: ThingKind, rel: number, color?: string) => ({
  figure: <VsRodFig k={k} rel={rel} color={color} />,
  say: `${THING_SAY[k]}, ${rel < 1 ? 'rövidebb a rúdnál' : rel > 1 ? 'hosszabb a rúdnál' : 'ugyanolyan hosszú, mint a rúd'}`,
});

/** Szalag vagy ceruza közös kezdővonalról – válaszkártyához (minden kártya ugyanakkora léptékű). */
export const LenFig: React.FC<{ k?: ThingKind; len: number; color?: string; className?: string }> = ({ k = 'szalag', len, color = '#ef4444', className = 'w-48 h-12' }) => (
  <svg viewBox="0 0 250 50" className={className}>
    <path d="M10 4 V46" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
    {thing(k, 10, 25, len, color)}
  </svg>
);

/** Gyöngysor n gyönggyel (közös kezdés). */
export const BeadsFig: React.FC<{ n: number; color?: string; className?: string }> = ({ n, color = '#a855f7', className = 'w-48 h-12' }) => (
  <svg viewBox="0 0 250 50" className={className}>
    <path d={`M6 25 H${14 + n * 28}`} stroke="#334155" strokeWidth="3" />
    {Array.from({ length: n }, (_, i) => (
      <circle key={i} cx={24 + i * 28} cy="25" r="12" fill={color} stroke="#334155" strokeWidth="2.5" />
    ))}
  </svg>
);

/** Napraforgó adott magassággal (a talajtól). */
const flower = (x: number, baseY: number, h: number, color: string, key: React.Key = 'f') => (
  <g key={key}>
    <path d={`M${x} ${baseY} V${baseY - h + 16}`} stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
    <path d={`M${x} ${baseY - h * 0.35} q14 -14 24 -4 q-12 10 -24 4 Z`} fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <ellipse key={a} cx={x} cy={baseY - h + 2} rx="6" ry="11" fill={color} stroke="#a16207" strokeWidth="1.5" transform={`rotate(${a} ${x} ${baseY - h + 16}) translate(0 0)`} />
    ))}
    <circle cx={x} cy={baseY - h + 16} r="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
  </g>
);
export const FlowerFig: React.FC<{ h: number; color?: string; className?: string }> = ({ h, color = '#facc15', className = 'w-16 h-36' }) => (
  <svg viewBox="0 0 80 200" className={className}>
    <path d="M4 196 H76" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
    {flower(40, 195, h, color)}
  </svg>
);

/** Rúdtorony n rúdból (közös talajon). */
export const TowerFig: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-14 h-36' }) => (
  <svg viewBox="0 0 60 200" className={className}>
    <path d="M4 196 H56" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    {rodStack(19, 194, n, 18, 22)}
  </svg>
);

/** Csík: széles vagy keskeny. */
export const StripFig: React.FC<{ wide: boolean; color?: string; className?: string }> = ({ wide, color = '#38bdf8', className = 'w-40 h-16' }) => (
  <svg viewBox="0 0 200 70" className={className}>
    <rect x={10} y={wide ? 12 : 30} width="180" height={wide ? 46 : 10} rx="5" fill={color} stroke="#334155" strokeWidth="2.5" />
  </svg>
);

/** n pálcika egy sorban. */
export const StickRowFig: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-40 h-12' }) => (
  <svg viewBox="0 0 250 40" className={className}>
    {Array.from({ length: n }, (_, i) => thing('palcika', 6 + i * 48, 20, 46, undefined, i))}
  </svg>
);

/** Kis cipő és nagy csizma (lépéshez). */
export const ShoeFig: React.FC<{ big?: boolean; className?: string }> = ({ big = false, className = 'w-20 h-16' }) => (
  <svg viewBox="0 0 100 70" className={className}>
    {big ? (
      <path d="M22 4 H52 V40 L88 46 Q96 50 94 62 H10 V40 Q20 30 22 4 Z" fill="#16a34a" stroke="#14532d" strokeWidth="3.5" strokeLinejoin="round" />
    ) : (
      <path d="M36 36 H52 V48 L66 51 Q70 54 69 60 H32 V50 Q35 44 36 36 Z" fill="#ec4899" stroke="#9d174d" strokeWidth="3" strokeLinejoin="round" />
    )}
  </svg>
);

/** Fa, ház, bicikli, lámpaoszlop (a „milyen magas lehet a valóságban” kérdésekhez). */
export const RealFig: React.FC<{ k: 'fa' | 'haz' | 'bicikli' | 'lampa' | 'pad'; className?: string }> = ({ k, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    {k === 'fa' && (
      <>
        <rect x="34" y="46" width="12" height="30" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
        <circle cx="40" cy="30" r="24" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
      </>
    )}
    {k === 'haz' && (
      <>
        <path d="M10 34 L40 8 L70 34 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" strokeLinejoin="round" />
        <rect x="16" y="34" width="48" height="42" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <rect x="34" y="54" width="12" height="22" fill="#92400e" />
        <rect x="21" y="42" width="10" height="10" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
        <rect x="49" y="42" width="10" height="10" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
      </>
    )}
    {k === 'bicikli' && (
      <>
        <circle cx="20" cy="54" r="14" fill="none" stroke="#1f2937" strokeWidth="4" />
        <circle cx="60" cy="54" r="14" fill="none" stroke="#1f2937" strokeWidth="4" />
        <path d="M20 54 L34 32 L54 32 L60 54 M34 32 L40 54 L54 32 M30 26 H40 M54 32 L52 22 H60" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      </>
    )}
    {k === 'lampa' && (
      <>
        <rect x="37" y="16" width="6" height="60" fill="#475569" />
        <path d="M28 18 L52 18 L46 6 L34 6 Z" fill="#facc15" stroke="#a16207" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="30" y="72" width="20" height="6" fill="#475569" />
      </>
    )}
    {k === 'pad' && (
      <>
        <rect x="6" y="36" width="68" height="10" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
        <rect x="6" y="20" width="68" height="8" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
        <path d="M14 46 V70 M66 46 V70 M14 28 V36 M66 28 V36" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      </>
    )}
  </svg>
);
export const IconFig: React.FC<{ icon: keyof typeof ICONS; className?: string; color?: string }> = ({ icon, className = 'w-20 h-20', color }) => (
  <svg viewBox="0 0 60 60" className={className}>
    {ICONS[icon]({ x: 30, y: 30, s: 1.2, color })}
  </svg>
);

// ---------- meseoldalak ----------

/** 1. oldal: Pötyi, Zümi, Csigusz – készülnek Csigusz születésnapjára. */
export const HelloScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    {garden(480, 250)}
    <Potyi mood="cheer" dots={7} x={10} y={40} size={160} />
    {ICONS.meh({ x: 250, y: 60, s: 1.5 })}
    {ICONS.csiga({ x: 400, y: 190, s: 1.8 })}
    {thing('szalag', 200, 150, 120, '#ef4444', 'a')}
    {thing('szalag', 200, 180, 80, '#3b82f6', 'b')}
    {rodRow(330, 30, 3, 40, 18)}
  </svg>
);

/** Két szalag közös kezdővonalról. */
export const RibbonsScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
    <path d="M60 30 V170" stroke="#64748b" strokeWidth="3" strokeDasharray="7 6" />
    {thing('szalag', 60, 75, 320, '#ef4444', 'a')}
    {thing('szalag', 60, 130, 220, '#3b82f6', 'b')}
    {ICONS.csiga({ x: 440, y: 160, s: 1.2 })}
  </svg>
);

/** Három napraforgó a kertben. */
export const FlowersScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {flower(120, 215, 120, '#facc15', 'a')}
    {flower(240, 215, 185, '#fb923c', 'b')}
    {flower(360, 215, 80, '#f472b6', 'c')}
    {ICONS.meh({ x: 420, y: 50, s: 1.2 })}
  </svg>
);

/** Zümi egyenes és Csigusz kanyargós útja ugyanattól a levéltől ugyanahhoz a virághoz. */
export const PathsScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    {garden(480, 220)}
    {ICONS.level({ x: 50, y: 110, s: 1.4 })}
    {ICONS.virag({ x: 430, y: 110, s: 1.4 })}
    <path d="M78 110 H402" stroke="#eab308" strokeWidth="6" strokeLinecap="round" />
    <path d="M78 110 C110 40 150 40 170 110 S230 180 250 110 S320 40 340 110 S390 170 402 110" fill="none" stroke="#db2777" strokeWidth="6" strokeLinecap="round" />
    {ICONS.meh({ x: 240, y: 30, s: 1.2 })}
    {ICONS.csiga({ x: 240, y: 190, s: 1.2 })}
  </svg>
);

/** Pad, alatta n pálcika. */
export const BenchSticksScene: React.FC<{ n: number }> = ({ n }) => {
  const u = Math.min(64, 380 / n);
  const x0 = (480 - n * u) / 2;
  return (
    <svg viewBox="0 0 480 220">
      {garden(480, 220)}
      <rect x={x0} y="70" width={n * u} height="16" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      <rect x={x0} y="40" width={n * u} height="12" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      <path d={`M${x0 + 12} 86 V140 M${x0 + n * u - 12} 86 V140 M${x0 + 12} 52 V70 M${x0 + n * u - 12} 52 V70`} stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
      {Array.from({ length: n }, (_, i) => thing('palcika', x0 + i * u, 170, u, undefined, i))}
      <path d={`M${x0} 30 V185 M${x0 + n * u} 30 V185`} stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
    </svg>
  );
};

/** Egy arasz rajza x0-tól x1-ig (hüvelykujj – kisujj). */
const hand = (x0: number, x1: number, y: number, key: React.Key = 'h') => {
  const m = (x0 + x1) / 2;
  return (
    <g key={key} stroke="#9a3412" strokeWidth="3" strokeLinecap="round" fill="#fcd9b6">
      <path d={`M${x0} ${y} L${m - 8} ${y - 26}`} strokeWidth="12" stroke="#fcd9b6" />
      <path d={`M${x1} ${y} L${m + 10} ${y - 26}`} strokeWidth="11" stroke="#fcd9b6" />
      <path d={`M${m - 4} ${y - 34} L${m - 10} ${y - 60} M${m + 4} ${y - 34} L${m + 4} ${y - 64} M${m + 10} ${y - 32} L${m + 18} ${y - 58}`} strokeWidth="10" stroke="#fcd9b6" />
      <circle cx={m} cy={y - 28} r="17" stroke="none" />
      <circle cx={x0} cy={y} r="5" fill="#9a3412" stroke="none" />
      <circle cx={x1} cy={y} r="5" fill="#9a3412" stroke="none" />
    </g>
  );
};

/** Asztal, rajta n arasz ívekkel, az első araszon egy kéz. */
export const AraszScene: React.FC<{ n: number }> = ({ n }) => {
  const u = Math.min(100, 400 / n);
  const x0 = (480 - n * u) / 2;
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef3c7" />
      <rect x={x0} y="130" width={n * u} height="18" rx="4" fill="#a16207" stroke="#78350f" strokeWidth="3" />
      <path d={`M${x0 + 16} 148 V210 M${x0 + n * u - 16} 148 V210`} stroke="#78350f" strokeWidth="9" strokeLinecap="round" />
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x0 + i * u + 3} 128 Q${x0 + i * u + u / 2} ${88} ${x0 + (i + 1) * u - 3} 128`} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray={i === 0 ? undefined : '7 5'} />
      ))}
      {hand(x0 + 3, x0 + u - 3, 128)}
    </svg>
  );
};

const print = (cx: number, cy: number, big: boolean, key: React.Key) =>
  big ? (
    <g key={key} fill="#15803d">
      <ellipse cx={cx - 6} cy={cy} rx="20" ry="11" />
      <ellipse cx={cx + 20} cy={cy} rx="8" ry="9" />
    </g>
  ) : (
    <g key={key} fill="#db2777">
      <ellipse cx={cx - 3} cy={cy} rx="10" ry="6" />
      <ellipse cx={cx + 10} cy={cy} rx="4" ry="5" />
    </g>
  );

/** Kerti út, rajta lábnyomok: kicsik (n) és/vagy nagyok (m). */
export const StepsScene: React.FC<{ small?: number; big?: number }> = ({ small = 0, big = 0 }) => (
  <svg viewBox="0 0 480 220">
    {garden(480, 220)}
    <rect x="30" y="70" width="420" height={big && small ? 130 : 80} rx="14" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="3" />
    {ICONS.virag({ x: 30, y: 50, s: 0.9 })}
    {ICONS.virag({ x: 450, y: 50, s: 0.9 })}
    {Array.from({ length: small }, (_, i) => print(40 + ((i + 0.5) * 400) / small, 100, false, `s${i}`))}
    {Array.from({ length: big }, (_, i) => print(40 + ((i + 0.5) * 400) / big, small ? 165 : 110, true, `b${i}`))}
  </svg>
);

/** A narancssárga rúd (1 dm) – mellette radír és ceruza. */
export const RodScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fff7ed" />
    <path d="M60 20 V200" stroke="#64748b" strokeWidth="3" strokeDasharray="7 6" />
    <path d="M220 20 V200" stroke="#fdba74" strokeWidth="3" strokeDasharray="7 6" />
    {rodRow(60, 40, 1, 160, 30)}
    <text x="290" y="64" fontSize="30" fontWeight="900" fill="#9a3412" fontFamily="system-ui, sans-serif">1 dm</text>
    {thing('radir', 60, 120, 90, undefined, 'r')}
    {thing('ceruza', 60, 175, 280, '#22c55e', 'c')}
  </svg>
);

/** 10 rúd egymás után = a méterrúd. */
export const MeterScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fff7ed" />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={40 + i * 40} y="50" width="40" height="18" fill={i % 2 ? '#fff' : '#ef4444'} stroke="#7f1d1d" strokeWidth="2" />
    ))}
    {rodRow(40, 100, 10, 40, 22)}
    <text x="240" y="36" textAnchor="middle" fontSize="26" fontWeight="900" fill="#b91c1c" fontFamily="system-ui, sans-serif">1 m</text>
    <text x="240" y="160" textAnchor="middle" fontSize="26" fontWeight="900" fill="#9a3412" fontFamily="system-ui, sans-serif">10 dm</text>
    <path d="M40 40 V180 M440 40 V180" stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
  </svg>
);

/** Tárgy magassága rudakkal mérve: mellette n rúd egymáson. */
export const HeightScene: React.FC<{ n: number; what: 'cserep' | 'szek' | 'torta' }> = ({ n, what }) => {
  const u = Math.min(36, 190 / n);
  const base = 215;
  const top = base - n * u;
  return (
    <svg viewBox="0 0 480 230">
      <rect x="0" y="0" width="480" height="230" rx="18" fill="#fef3c7" />
      <path d={`M40 ${base} H440`} stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      {rodStack(120, base, n, u, 26)}
      <path d={`M100 ${top} H400`} stroke="#64748b" strokeWidth="2.5" strokeDasharray="7 6" />
      {what === 'cserep' && (
        <g>
          <path d={`M230 ${base} L220 ${base - n * u * 0.45} H320 L310 ${base} Z`} fill="#ea580c" stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
          <path d={`M270 ${base - n * u * 0.45} V${top + 18}`} stroke="#15803d" strokeWidth="6" />
          <path d={`M270 ${base - n * u * 0.65} q20 -16 32 -4 q-14 12 -32 4 Z`} fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          {ICONS.virag({ x: 270, y: top + 18, s: 0.9 })}
        </g>
      )}
      {what === 'szek' && (
        <g stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round">
          <path d={`M230 ${base} V${base - n * u * 0.55} H310 V${base} M310 ${base - n * u * 0.55} V${top + 3}`} fill="none" />
          <rect x="226" y={base - n * u * 0.55 - 6} width="88" height="12" rx="4" fill="#3b82f6" />
        </g>
      )}
      {what === 'torta' && (
        <g>
          <rect x="220" y={top + 20} width="110" height={n * u - 20} rx="8" fill="#fbcfe8" stroke="#9d174d" strokeWidth="3" />
          <path d={`M220 ${top + 40} Q247 ${top + 55} 275 ${top + 40} T330 ${top + 40}`} fill="none" stroke="#fff" strokeWidth="6" />
          <rect x="271" y={top} width="8" height="20" fill="#60a5fa" />
          <path d={`M275 ${top - 12} q6 6 0 12 q-6 -6 0 -12 Z`} fill="#f59e0b" />
        </g>
      )}
      {ICONS.csiga({ x: 410, y: base - 22, s: 1.1 })}
    </svg>
  );
};

/** Szalag(ok) rudakkal mérve. ribbons: hossz rúdban; cut: a végéről ennyi rúdnyi levágva (áthúzva). */
export const RibbonRodsScene: React.FC<{ ribbons: { n: number; color: string; label?: string }[]; cut?: number; showRods?: boolean }> = ({ ribbons, cut = 0, showRods = true }) => {
  const u = 40;
  return (
    <svg viewBox={`0 0 480 ${30 + ribbons.length * 80}`}>
      <rect x="0" y="0" width="480" height={30 + ribbons.length * 80} rx="18" fill="#fef3c7" />
      <path d={`M30 10 V${20 + ribbons.length * 80}`} stroke="#64748b" strokeWidth="2.5" strokeDasharray="7 6" />
      {ribbons.map((r, i) => {
        const y = 40 + i * 80;
        return (
          <g key={i}>
            {thing('szalag', 30, y, r.n * u, r.color, `s${i}`)}
            {showRods && rodRow(30, y + 16, r.n, u, 16, `r${i}`)}
            {r.label && (
              <text x={40 + r.n * u} y={y + 8} fontSize="22" fontWeight="900" fill="#334155" fontFamily="system-ui, sans-serif">
                {r.label}
              </text>
            )}
            {i === 0 && cut > 0 && (
              <g>
                <path d={`M${30 + (r.n - cut) * u} ${y - 20} V${y + 40}`} stroke="#111827" strokeWidth="3" strokeDasharray="5 4" />
                {Array.from({ length: cut }, (_, k) => {
                  const cx = 30 + (r.n - cut + k) * u + u / 2;
                  return <path key={k} d={`M${cx - 12} ${y - 10} L${cx + 12} ${y + 10} M${cx + 12} ${y - 10} L${cx - 12} ${y + 10}`} stroke="#111827" strokeWidth="4" strokeLinecap="round" />;
                })}
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Rúdtornyok egymás mellett, színes zászlóval. */
export const TowersScene: React.FC<{ towers: { n: number; color: string }[] }> = ({ towers }) => {
  const u = 20;
  const base = 225;
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
      <path d={`M30 ${base} H450`} stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      {towers.map((t, i) => {
        const x = 100 + i * (280 / Math.max(1, towers.length - 1));
        return (
          <g key={i}>
            {rodStack(x - 13, base, t.n, u, 26, `t${i}`)}
            <path d={`M${x} ${base - t.n * u} V${base - t.n * u - 26}`} stroke="#334155" strokeWidth="3" />
            <path d={`M${x} ${base - t.n * u - 26} l22 7 l-22 7 Z`} fill={t.color} stroke="#334155" strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
};

/** Pad és két mérőeszköz: rövid pálcika és hosszú pálca. */
export const TwoToolsScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    {garden(480, 220)}
    <rect x="80" y="60" width="320" height="16" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
    <rect x="80" y="30" width="320" height="12" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
    <path d="M92 76 V130 M388 76 V130 M92 42 V60 M388 42 V60" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
    {thing('palcika', 80, 165, 40, undefined, 'k')}
    <text x="100" y="200" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155" fontFamily="system-ui, sans-serif">?</text>
    {thing('palcika', 220, 165, 160, undefined, 'n')}
    <text x="300" y="200" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155" fontFamily="system-ui, sans-serif">?</text>
  </svg>
);

/** Utolsó oldal: feldíszített kert, Csigusz szülinapja. */
export const PartyScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    <path d="M20 30 Q240 90 460 30" fill="none" stroke="#64748b" strokeWidth="2" />
    {[60, 120, 180, 240, 300, 360, 420].map((x, i) => (
      <path key={x} d={`M${x - 12} ${40 + Math.sin((x / 480) * Math.PI) * 26} l12 26 l12 -26 Z`} fill={['#ef4444', '#facc15', '#3b82f6', '#22c55e'][i % 4]} stroke="#334155" strokeWidth="1.5" />
    ))}
    <Potyi mood="cheer" dots={7} x={20} y={90} size={130} />
    {ICONS.csiga({ x: 250, y: 190, s: 1.8 })}
    {ICONS.meh({ x: 400, y: 110, s: 1.4 })}
    <rect x="320" y="170" width="70" height="40" rx="6" fill="#fbcfe8" stroke="#9d174d" strokeWidth="3" />
    <rect x="352" y="152" width="6" height="18" fill="#60a5fa" />
  </svg>
);
