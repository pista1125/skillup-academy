// „A kilenc” – az ünnepi (adventi) Számkert képei. A 14–16. lecke (számolás 0-tól 9-ig, sorszámnevek, megálló) is ezeket használja.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName, IconProps } from '../../shared/G1Pics';
import { WINTER, snow } from '../a-nyolc/ANyolcG1Scenes';

const grp = (x: number, y: number, s: number, children: React.ReactNode, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
  </g>
);

// ---------- saját ünnepi ikonok (ugyanolyan aláírás, mint az ICONS) ----------
export const XMAS = {
  disz: ({ x, y, s = 1, color = '#ef4444', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <rect x="-5" y="-21" width="10" height="7" rx="2" fill="#facc15" stroke="#a16207" strokeWidth="2" />
        <circle cx="0" cy="0" r="16" fill={color} stroke="#111827" strokeWidth="3" />
        <ellipse cx="-6" cy="-6" rx="5" ry="3.5" fill="#fff" opacity="0.6" transform="rotate(-35 -6 -6)" />
      </>
    ), key),
  toboz: ({ x, y, s = 1, color = '#92400e', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <ellipse cx="0" cy="2" rx="12" ry="18" fill={color} stroke="#451a03" strokeWidth="3" />
        <path d="M-10 -6 Q0 0 10 -6 M-11 4 Q0 10 11 4 M-8 13 Q0 18 8 13" fill="none" stroke="#451a03" strokeWidth="2.5" />
        <path d="M0 -16 V-21" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
      </>
    ), key),
  csengo: ({ x, y, s = 1, color = '#facc15', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M-15 12 Q-14 -16 0 -16 Q14 -16 15 12 Z" fill={color} stroke="#854d0e" strokeWidth="3" strokeLinejoin="round" />
        <rect x="-18" y="10" width="36" height="6" rx="3" fill={color} stroke="#854d0e" strokeWidth="3" />
        <circle cx="0" cy="19" r="4.5" fill="#854d0e" />
        <circle cx="0" cy="-19" r="3.5" fill="none" stroke="#854d0e" strokeWidth="2.5" />
      </>
    ), key),
  ajandek: ({ x, y, s = 1, color = '#ec4899', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <rect x="-16" y="-10" width="32" height="26" rx="3" fill={color} stroke="#111827" strokeWidth="3" />
        <rect x="-3.5" y="-10" width="7" height="26" fill="#facc15" />
        <path d="M0 -10 Q-12 -22 -12 -12 Q-10 -8 0 -10 Q10 -8 12 -12 Q12 -22 0 -10" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      </>
    ), key),
  bogre: ({ x, y, s = 1, color = '#3b82f6', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M10 -6 Q22 -6 20 4 Q18 12 8 10" fill="none" stroke="#111827" strokeWidth="4" />
        <path d="M-14 -14 H12 V10 Q12 16 6 16 H-8 Q-14 16 -14 10 Z" fill={color} stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="-1" cy="-14" rx="13" ry="3" fill="#fff" opacity="0.6" />
      </>
    ), key),
  suti: ({ x, y, s = 1, color = '#c2410c', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M0 -18 L5 -6 L18 -6 L8 2 L12 15 L0 7 L-12 15 L-8 2 L-18 -6 L-5 -6 Z" fill={color} stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="0" cy="-1" r="2.5" fill="#fff" />
        <circle cx="-6" cy="-5" r="1.8" fill="#fff" />
        <circle cx="6" cy="-5" r="1.8" fill="#fff" />
      </>
    ), key),
  sutiSziv: ({ x, y, s = 1, color = '#b45309', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M0 16 C-24 0 -16 -18 0 -8 C16 -18 24 0 0 16 Z" fill={color} stroke="#78350f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-8 -4 Q0 4 8 -4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ), key),
  sal: ({ x, y, s = 1, color = '#facc15', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M-18 -10 Q0 -2 18 -10 L18 -2 Q0 6 -18 -2 Z" fill={color} stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M6 0 L4 18 L13 18 L14 -2" fill={color} stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M5 18 V22 M9 18 V22 M13 18 V22" stroke="#111827" strokeWidth="2" />
      </>
    ), key),
  boritek: ({ x, y, s = 1, color = '#fff', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <rect x="-18" y="-12" width="36" height="24" rx="3" fill={color} stroke="#111827" strokeWidth="3" />
        <path d="M-18 -12 L0 3 L18 -12" fill="none" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="0" cy="4" r="3.5" fill="#ef4444" />
      </>
    ), key),
  szanko: ({ x, y, s = 1, color = '#ef4444', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <rect x="-18" y="-8" width="36" height="12" rx="4" fill={color} stroke="#111827" strokeWidth="3" />
        <path d="M-12 4 V10 M12 4 V10" stroke="#111827" strokeWidth="3" />
        <path d="M-22 10 H18 Q24 10 24 4" fill="none" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
      </>
    ), key),
};

export type XPicName = IconName | keyof typeof WINTER | keyof typeof XMAS;
export const XPIC = (name: XPicName): ((p: IconProps) => React.ReactElement) =>
  name in XMAS ? XMAS[name as keyof typeof XMAS] : name in WINTER ? WINTER[name as keyof typeof WINTER] : ICONS[name as IconName];

/** Színek a díszekhez, szánkókhoz (sorrendben). */
export const COLORS = ['#ef4444', '#3b82f6', '#facc15', '#a855f7', '#22c55e', '#f97316', '#ec4899', '#14b8a6', '#92400e'];
export const COLOR_NAMES = ['piros', 'kék', 'sárga', 'lila', 'zöld', 'narancssárga', 'rózsaszín', 'türkiz', 'barna'];

/**
 * Keretes doboz: `n` darab `icon`, utána `nb` darab `iconB` (vagy `colorB` színnel).
 * 1–4: egy sor; 5–8: 4-es sorok; 9–10: 5-ös sorok. `crossed`: az utolsó ennyi áthúzva.
 */
export const XBox: React.FC<{ icon: XPicName; n: number; iconB?: XPicName; nb?: number; color?: string; colorB?: string; crossed?: number; className?: string }> = ({
  icon,
  n,
  iconB,
  nb = 0,
  color,
  colorB,
  crossed = 0,
  className = 'w-36 h-24',
}) => {
  const total = n + nb;
  const per = total > 8 ? 5 : 4;
  const rows = total <= per ? 1 : 2;
  const s = total === 1 ? 1.25 : total <= 4 ? 0.95 : 0.8;
  const gap = total <= 4 ? 38 : 30;
  return (
    <svg viewBox="0 0 160 100" className={className}>
      <rect x="3" y="3" width="154" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: total }, (_, i) => {
        const row = rows === 1 ? 0 : i < per ? 0 : 1;
        const inRow = rows === 1 ? total : row === 0 ? per : total - per;
        const col = row === 0 ? i : i - per;
        const x = 80 + (col - (inRow - 1) / 2) * gap;
        const y = rows === 1 ? 50 : row === 0 ? 30 : 72;
        const b = i >= n;
        const isX = i >= total - crossed;
        return (
          <g key={i} opacity={isX ? 0.45 : 1}>
            {XPIC(b ? iconB ?? icon : icon)({ x, y, s, color: b ? colorB : color })}
            {isX && <path d={`M${x - 14} ${y - 14} L${x + 14} ${y + 14}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Kisebb kártya-változat (párosító, válogató). */
export const XMini: React.FC<{ icon: XPicName; n: number; iconB?: XPicName; nb?: number; color?: string; colorB?: string; crossed?: number }> = (p) => <XBox {...p} className="w-28 h-[72px]" />;

/** Két doboz, középen „?” – melyik jel kell? */
export const XCompare: React.FC<{ icon: XPicName; a: number; b: number; iconB?: XPicName; mid?: string }> = ({ icon, a, b, iconB, mid = '?' }) => (
  <svg viewBox="0 0 380 110" className="w-full max-w-[440px] h-auto mx-auto">
    <svg x="0" y="5" width="160" height="100" viewBox="0 0 160 100">
      <XBox icon={icon} n={a} className="" />
    </svg>
    <text x="190" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">{mid}</text>
    <svg x="220" y="5" width="160" height="100" viewBox="0 0 160 100">
      <XBox icon={iconB ?? icon} n={b} className="" />
    </svg>
  </svg>
);

/** Tárgysor egy sorban (max 10): az első `a` darab `color` színű, a többi `colorB`. Bögrék, szánkók, díszek. */
export const XRow: React.FC<{ icon: XPicName; a: number; b?: number; color?: string; colorB?: string; colors?: string[]; className?: string; frame?: boolean }> = ({
  icon,
  a,
  b = 0,
  color,
  colorB = '#ef4444',
  colors,
  className = 'w-full max-w-[460px] h-auto mx-auto',
  frame = true,
}) => {
  const n = a + b;
  const w = Math.max(1, n) * 48 + 16;
  return (
    <svg viewBox={`0 0 ${w} 70`} className={className}>
      {frame && <rect x="3" y="3" width={w - 6} height="64" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />}
      {Array.from({ length: n }, (_, i) => XPIC(icon)({ x: 32 + i * 48, y: 37, s: 0.95, color: colors ? colors[i % colors.length] : i < a ? color : colorB, key: i }))}
    </svg>
  );
};

// ---------- a karácsonyfa ----------
export const HOOKS: [number, number][] = [
  [240, 82],
  [214, 120], [266, 120],
  [192, 160], [240, 156], [288, 160],
  [184, 200], [240, 203], [296, 200],
];

/**
 * Fenyőfa 9 akasztóhellyel. `filled`: hány dísz lóg rajta (balról, fentről töltve) vagy melyik helyen van dísz.
 * `label`: szám a táblán (a cél). `onHook`: koppintható helyek (Játszótér).
 */
export const TreeScene: React.FC<{
  filled: number | boolean[];
  colors?: string[];
  label?: string | number;
  showHooks?: boolean;
  onHook?: (i: number) => void;
  friends?: boolean;
  dots?: number;
}> = ({ filled, colors = COLORS, label, showHooks = false, onHook, friends = false, dots = 9 }) => {
  const on = (i: number) => (typeof filled === 'number' ? i < filled : !!filled[i]);
  return (
    <svg viewBox="0 0 480 250">
      {snow(480, 250)}
      <rect x="226" y="218" width="28" height="24" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="3" />
      <path d="M240 140 L135 222 H345 Z" fill="#16a34a" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M240 100 L150 185 H330 Z" fill="#22c55e" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M240 60 L170 140 H310 Z" fill="#16a34a" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M240 26 L190 100 H290 Z" fill="#22c55e" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M240 6 L245 18 L258 18 L248 26 L252 38 L240 31 L228 38 L232 26 L222 18 L235 18 Z" fill="#facc15" stroke="#a16207" strokeWidth="2.5" strokeLinejoin="round" />
      {HOOKS.map(([x, y], i) => (
        <g key={i} onClick={onHook ? () => onHook(i) : undefined} style={onHook ? { cursor: 'pointer' } : undefined}>
          {(showHooks || onHook) && !on(i) && <circle cx={x} cy={y} r="13" fill="#bbf7d0" stroke="#14532d" strokeWidth="2.5" strokeDasharray="4 4" />}
          {on(i) && XMAS.disz({ x, y, s: 0.85, color: colors[i % colors.length] })}
          {onHook && <circle cx={x} cy={y} r="20" fill="transparent" />}
        </g>
      ))}
      {label !== undefined && (
        <g>
          <rect x="374" y="22" width="84" height="84" rx="18" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
          <text x="416" y="84" textAnchor="middle" fontSize="54" fontWeight="900" fill={label === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">{label}</text>
        </g>
      )}
      {friends && (
        <>
          <Potyi mood="cheer" dots={dots} x={6} y={110} size={120} />
          {ICONS.meh({ x: 110, y: 60, s: 1.4 })}
          {ICONS.csiga({ x: 410, y: 212, s: 1.6 })}
        </>
      )}
    </svg>
  );
};

/** A barátok az ünnepi Számkertben, kis fenyővel (díszek nélkül, hogy ne kelljen számolni). */
export const HolidayGardenScene: React.FC<{ dots?: number; mood?: 'happy' | 'cheer' | 'wow' }> = ({ dots = 7, mood = 'cheer' }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <rect x="384" y="170" width="16" height="22" fill="#92400e" />
    <path d="M392 70 L340 176 H444 Z" fill="#22c55e" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
    <path d="M392 56 L396 66 L406 66 L398 72 L401 82 L392 76 L383 82 L386 72 L378 66 L388 66 Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />
    <Potyi mood={mood} dots={dots} x={20} y={56} size={150} />
    {ICONS.meh({ x: 240, y: 80, s: 2 })}
    {ICONS.csiga({ x: 260, y: 186, s: 2.1 })}
  </svg>
);

/** Párba állítás: n tárgy kettesével egymás alatt (páros / páratlan). */
export const PairUpScene: React.FC<{ n: number; icon?: XPicName; color?: string; className?: string }> = ({ n, icon = 'disz', color = '#3b82f6', className = 'w-full max-w-[420px] h-auto mx-auto' }) => {
  const cols = Math.ceil(n / 2);
  const w = cols * 56 + 24;
  return (
    <svg viewBox={`0 0 ${w} 130`} className={className}>
      <rect x="3" y="3" width={w - 6} height="124" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const c = Math.floor(i / 2);
        const r = i % 2;
        return XPIC(icon)({ x: 40 + c * 56, y: 40 + r * 52, s: 1, color, key: i });
      })}
    </svg>
  );
};

/** „Mennyivel több?” – két sor egymás alatt, hogy a párok látszódjanak. */
export const TwoRows: React.FC<{ icon: XPicName; a: number; b: number; color?: string; colorB?: string }> = ({ icon, a, b, color = '#ef4444', colorB = '#3b82f6' }) => {
  const n = Math.max(a, b);
  const w = n * 46 + 24;
  return (
    <svg viewBox={`0 0 ${w} 120`} className="w-full max-w-[440px] h-auto mx-auto">
      <rect x="3" y="3" width={w - 6} height="114" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: a }, (_, i) => XPIC(icon)({ x: 35 + i * 46, y: 36, s: 0.9, color, key: `a${i}` }))}
      {Array.from({ length: b }, (_, i) => XPIC(icon)({ x: 35 + i * 46, y: 86, s: 0.9, color: colorB, key: `b${i}` }))}
    </svg>
  );
};
