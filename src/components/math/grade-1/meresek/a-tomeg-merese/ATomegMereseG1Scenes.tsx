// „A tömeg mérése” – a mese és a játék képei (piac a Számkertben: libikóka, kétkarú mérleg, golyók, kilogramm).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

export const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 60} Q${w / 3} ${h - 85} ${w / 2} ${h - 65} T${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

export type ItemKind =
  | 'alma'
  | 'eper'
  | 'korte'
  | 'tok'
  | 'dinnye'
  | 'ko'
  | 'lufi'
  | 'toll'
  | 'suly'
  | 'zsak'
  | 'mez'
  | 'level'
  | 'virag'
  | 'pillango'
  | 'gomba'
  | 'katica'
  | 'auto';

export const ITEM_SAY: Record<ItemKind, string> = {
  alma: 'alma',
  eper: 'eper',
  korte: 'körte',
  tok: 'tök',
  dinnye: 'dinnye',
  ko: 'kő',
  lufi: 'léggömb',
  toll: 'toll',
  suly: '1 kilogrammos súly',
  zsak: 'zsák',
  mez: 'mézesbödön',
  level: 'levél',
  virag: 'virág',
  pillango: 'pillangó',
  gomba: 'gomba',
  katica: 'katica',
  auto: 'autó',
};

/** Egy tárgy, amelynek az alja y-on van, közepe x-en. */
export const item = (k: ItemKind, x: number, y: number, s = 1, label?: string, key: React.Key = 'i'): React.ReactElement => {
  switch (k) {
    case 'korte':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 -36 C-8 -36 -8 -24 -10 -18 C-20 -12 -18 0 0 0 C18 0 20 -12 10 -18 C8 -24 8 -36 0 -36 Z" fill="#a3e635" stroke="#3f6212" strokeWidth="3" />
          <path d="M0 -36 L2 -42" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'tok':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="-10" cy="-16" rx="14" ry="16" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
          <ellipse cx="10" cy="-16" rx="14" ry="16" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
          <ellipse cx="0" cy="-16" rx="12" ry="16" fill="#fb923c" stroke="#9a3412" strokeWidth="3" />
          <path d="M0 -32 Q2 -40 7 -42" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'dinnye':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="0" cy="-17" rx="28" ry="17" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
          <path d="M-18 -28 Q-22 -17 -18 -6 M-6 -33 Q-9 -17 -6 -1 M6 -33 Q9 -17 6 -1 M18 -28 Q22 -17 18 -6" stroke="#14532d" strokeWidth="2.5" fill="none" />
        </g>
      );
    case 'ko':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-13 0 C-16 -8 -10 -15 -2 -15 C8 -16 14 -9 13 0 Z" fill="#78716c" stroke="#292524" strokeWidth="3" strokeLinejoin="round" />
        </g>
      );
    case 'lufi':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0 Q-5 -10 0 -18" stroke="#334155" strokeWidth="2" fill="none" />
          <ellipse cx="0" cy="-42" rx="20" ry="24" fill="#f43f5e" stroke="#9f1239" strokeWidth="3" />
          <path d="M-4 -18 L4 -18 L0 -22 Z" fill="#9f1239" />
          <ellipse cx="-7" cy="-50" rx="4" ry="7" fill="#fff" opacity="0.6" />
        </g>
      );
    case 'toll':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-20 -2 Q-4 -30 22 -26 Q10 -6 -20 -2 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2.5" />
          <path d="M-22 0 L20 -24" stroke="#0369a1" strokeWidth="2" />
        </g>
      );
    case 'suly':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-16 0 L-12 -24 H12 L16 0 Z" fill="#334155" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
          <rect x="-6" y="-31" width="12" height="8" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="2.5" />
          <text x="0" y="-7" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">1 kg</text>
        </g>
      );
    case 'zsak':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-18 0 Q-24 -24 -10 -34 L-12 -40 H12 L10 -34 Q24 -24 18 0 Z" fill="#d6b48a" stroke="#78350f" strokeWidth="3" strokeLinejoin="round" />
          <path d="M-12 -36 H12" stroke="#78350f" strokeWidth="3" />
          {label && (
            <text x="0" y="-10" textAnchor="middle" fontSize="12" fontWeight="900" fill="#451a03" fontFamily="system-ui, sans-serif">
              {label}
            </text>
          )}
        </g>
      );
    case 'mez':
      return (
        <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-14" y="-28" width="28" height="28" rx="6" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
          <rect x="-16" y="-34" width="32" height="8" rx="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
        </g>
      );
    case 'auto':
      return <g key={key}>{ICONS.auto({ x, y: y - 10 * s, s: s * 1.2 })}</g>;
    default:
      return <g key={key}>{ICONS[k]({ x, y: y - 17 * s, s: s * 0.85 })}</g>;
  }
};

/** n kis golyó egy halomban, alja y-on. */
export const balls = (n: number, x: number, y: number, key: React.Key = 'b') => (
  <g key={key}>
    {Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / 4);
      const cnt = Math.min(4, n - row * 4);
      const col = i % 4;
      return <circle key={i} cx={x + (col - (cnt - 1) / 2) * 13} cy={y - 6 - row * 11} r="6" fill="#94a3b8" stroke="#334155" strokeWidth="2" />;
    })}
  </g>
);

export type PanContent = { k: ItemKind; label?: string; s?: number }[] | { balls: number };

const panContent = (c: PanContent, x: number, y: number) => {
  if (!Array.isArray(c)) return balls(c.balls, x, y);
  const step = 26;
  return <g>{c.map((it, i) => item(it.k, x + (i - (c.length - 1) / 2) * step, y, it.s ?? 0.8, it.label, i))}</g>;
};

/** Kétkarú mérleg. tilt: 1 = a bal oldal lent (nehezebb), -1 = a jobb oldal lent, 0 = egyensúly. */
export const scale = (cx: number, cy: number, L: number, tilt: -1 | 0 | 1, left: PanContent, right: PanContent, key: React.Key = 'sc') => {
  const a = (12 * Math.PI) / 180;
  const dx = L * Math.cos(a * Math.abs(tilt));
  const dy = L * Math.sin(a) * tilt;
  const ends: [number, number][] = [
    [cx - dx, cy + dy],
    [cx + dx, cy - dy],
  ];
  const drop = 42;
  return (
    <g key={key}>
      <path d={`M${cx} ${cy} V${cy + 92}`} stroke="#a16207" strokeWidth="7" strokeLinecap="round" />
      <path d={`M${cx - 30} ${cy + 96} H${cx + 30}`} stroke="#a16207" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${ends[0][0]} ${ends[0][1]} L${ends[1][0]} ${ends[1][1]}`} stroke="#a16207" strokeWidth="7" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7" fill="#facc15" stroke="#a16207" strokeWidth="3" />
      {ends.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} L${x - 26} ${y + drop} M${x} ${y} L${x + 26} ${y + drop}`} stroke="#64748b" strokeWidth="2" />
          {panContent(i === 0 ? left : right, x, y + drop)}
          <path d={`M${x - 32} ${y + drop} Q${x} ${y + drop + 18} ${x + 32} ${y + drop} Z`} fill="#fcd34d" stroke="#a16207" strokeWidth="3" />
        </g>
      ))}
    </g>
  );
};

/** Mérleg kártyaképként. */
export const ScaleFig: React.FC<{ tilt: -1 | 0 | 1; left: PanContent; right: PanContent; className?: string }> = ({ tilt, left, right, className = 'w-36 h-28' }) => (
  <svg viewBox="0 0 200 150" className={className}>
    {scale(100, 40, 66, tilt, left, right)}
  </svg>
);

/** Egy tárgy kártyaképként. */
export const ItemFig: React.FC<{ k: ItemKind; label?: string; className?: string }> = ({ k, label, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 70 70" className={className}>
    {item(k, 35, 62, 1.2, label)}
  </svg>
);

// ---------- meseoldalak ----------

export const MarketScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    <rect x="190" y="110" width="270" height="70" rx="8" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
    <path d="M180 110 L200 60 H450 L470 110 Z" fill="#f87171" stroke="#7f1d1d" strokeWidth="3" strokeLinejoin="round" />
    {item('tok', 230, 112, 1)}
    {item('alma', 280, 112, 1)}
    {item('korte', 320, 112, 1)}
    {item('dinnye', 380, 112, 1)}
    {item('mez', 430, 112, 1)}
    <Potyi mood="cheer" dots={7} x={10} y={60} size={150} />
    {ICONS.csiga({ x: 330, y: 205, s: 1.5 })}
    {ICONS.meh({ x: 160, y: 40, s: 1.2 })}
  </svg>
);

/** Libikóka: a bal végén Pötyi, a jobb végén Csigusz; a nehezebb oldal lent. */
export const SeesawScene: React.FC<{ heavyRight?: boolean }> = ({ heavyRight = true }) => {
  const a = ((heavyRight ? 1 : -1) * 12 * Math.PI) / 180;
  const cx = 240;
  const cy = 170;
  const L = 170;
  const lx = cx - L * Math.cos(a);
  const ly = cy - L * Math.sin(a);
  const rx = cx + L * Math.cos(a);
  const ry = cy + L * Math.sin(a);
  return (
    <svg viewBox="0 0 480 240">
      {garden(480, 240)}
      <path d={`M${cx - 26} 222 L${cx} ${cy} L${cx + 26} 222 Z`} fill="#a16207" stroke="#78350f" strokeWidth="3" strokeLinejoin="round" />
      <path d={`M${lx} ${ly} L${rx} ${ry}`} stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
      <Potyi mood="happy" dots={7} x={lx - 30} y={ly - 70} size={70} />
      {ICONS.csiga({ x: rx - 10, y: ry - 30, s: 1.6 })}
    </svg>
  );
};

/** Egy nagy mérleg a mesében. */
export const BigScaleScene: React.FC<{ tilt: -1 | 0 | 1; left: PanContent; right: PanContent }> = ({ tilt, left, right }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef3c7" />
    <g transform="translate(70 0) scale(1.7)">{scale(100, 30, 66, tilt, left, right)}</g>
  </svg>
);

/** Két (vagy három) mérleg egymás mellett, mindegyiken tárgy és golyók egyensúlyban. */
export const BallScalesScene: React.FC<{ rows: { k: ItemKind; n: number }[] }> = ({ rows }) => {
  const w = 480 / rows.length;
  return (
    <svg viewBox="0 0 480 170">
      <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
      {rows.map((r, i) => scale(w * i + w / 2, 40, Math.min(66, w / 2 - 30), 0, [{ k: r.k, s: 0.8 }], { balls: r.n }, i))}
    </svg>
  );
};

/** Zsákok felirattal (kg) egy sorban, az utolsó lehet „?”. */
export const SacksScene: React.FC<{ sacks: { label: string; s?: number }[]; sign?: string[] }> = ({ sacks, sign = [] }) => {
  const step = 400 / sacks.length;
  return (
    <svg viewBox="0 0 480 160">
      <rect x="0" y="0" width="480" height="160" rx="18" fill="#fef3c7" />
      {sacks.map((sk, i) => item('zsak', 40 + step * i + step / 2, 140, sk.s ?? 2, sk.label, i))}
      {sign.map((t, i) => (
        <text key={`t${i}`} x={40 + step * (i + 1)} y="100" textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
          {t}
        </text>
      ))}
    </svg>
  );
};

export const EndScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    <g transform="translate(150 20) scale(1.3)">{scale(100, 30, 66, 0, [{ k: 'korte' }], { balls: 4 })}</g>
    <Potyi mood="cheer" dots={7} x={10} y={90} size={130} />
    {ICONS.csiga({ x: 420, y: 200, s: 1.5 })}
    {ICONS.meh({ x: 420, y: 60, s: 1.2 })}
  </svg>
);

export const IconFig: React.FC<{ icon: keyof typeof ICONS; className?: string; color?: string }> = ({ icon, className = 'w-20 h-20', color }) => (
  <svg viewBox="0 0 60 60" className={className}>
    {ICONS[icon]({ x: 30, y: 30, s: 1.2, color })}
  </svg>
);
