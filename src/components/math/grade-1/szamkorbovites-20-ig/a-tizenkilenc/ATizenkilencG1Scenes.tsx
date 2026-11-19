// „A tizenkilenc” – saját képek: a Számkert eperágyása (kosár = 1 tízes, szem eper = egyes), képes egyenletek, színes korongok.
// A közös képek (két tízes keret, tízesrúd, csoportkártyák, számsorok) a tizenöt leckéből jönnek.
import React from 'react';
import { ICONS, IconName } from '../../shared/G1Pics';
import { FONT, PURPLE, garden } from '../a-tizenot/ATizenotG1Scenes';

/** Fonott kosár 10 eperrel (2 × 5), bal felső sarka (x, y), kb. 200 × 150. */
export const basketG = (x: number, y: number, n = 10, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <path d="M30 40 Q100 -30 170 40" fill="none" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
    <path d="M6 40 H194 L176 146 H24 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="5" strokeLinejoin="round" />
    {[66, 92, 118].map((yy) => (
      <path key={yy} d={`M${10 + (yy - 40) * 0.16} ${yy} H${190 - (yy - 40) * 0.16}`} stroke="#b45309" strokeWidth="3" />
    ))}
    {Array.from({ length: Math.min(10, n) }, (_, i) => ICONS.eper({ x: 30 + (i % 5) * 35, y: 62 + Math.floor(i / 5) * 46, s: 0.95, key: i }))}
  </g>
);

/** Kosár (1 tízes) + levélen a különálló szemek (egyesek, 0–9); alul felirat. `tens = 0`: csak szemek. */
export const BasketScene: React.FC<{ tens?: number; ones: number; label?: string | number; className?: string }> = ({ tens = 1, ones, label, className }) => (
  <svg viewBox="0 0 480 240" className={className}>
    {garden(480, 240)}
    {tens > 0 && basketG(14, 30)}
    {tens > 0 && <text x="234" y="128" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>}
    <ellipse cx="364" cy="116" rx="106" ry="66" fill="#4ade80" stroke="#15803d" strokeWidth="4" />
    {Array.from({ length: ones }, (_, i) => ICONS.eper({ x: 296 + (i % 5) * 34, y: 96 + Math.floor(i / 5) * 42, s: 0.9, key: i }))}
    {label !== undefined && (
      <text x="240" y="226" textAnchor="middle" fontSize="34" fontWeight="900" fill={String(label).includes('?') ? PURPLE : '#1e293b'} fontFamily={FONT}>{label}</text>
    )}
  </svg>
);

/** Képes egyenlet: azonos képek azonos számot takarnak, pl. alma + alma + alma + 4 = 19. */
export const PicEqScene: React.FC<{ icon: IconName; count: number; plus?: number; result: number }> = ({ icon, count, plus, result }) => {
  type T = { kind: 'icon' } | { kind: 'text'; t: string };
  const toks: T[] = [];
  for (let i = 0; i < count; i++) {
    if (i > 0) toks.push({ kind: 'text', t: '+' });
    toks.push({ kind: 'icon' });
  }
  if (plus !== undefined) toks.push({ kind: 'text', t: '+' }, { kind: 'text', t: String(plus) });
  toks.push({ kind: 'text', t: '=' }, { kind: 'text', t: String(result) });
  const wOf = (t: T) => (t.kind === 'icon' ? 64 : t.t.length > 1 ? 58 : 36);
  const total = toks.reduce((s, t) => s + wOf(t), 0);
  let x = 240 - total / 2;
  return (
    <svg viewBox="0 0 480 120" className="w-full max-w-[440px] h-auto mx-auto">
      <rect x="0" y="0" width="480" height="120" rx="18" fill="#fef9c3" />
      {toks.map((t, i) => {
        const w = wOf(t);
        const cx = x + w / 2;
        x += w;
        return t.kind === 'icon' ? (
          <g key={i}>{ICONS[icon]({ x: cx, y: 60, s: 1.25 })}</g>
        ) : (
          <text key={i} x={cx} y="76" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>{t.t}</text>
        );
      })}
    </svg>
  );
};

/** Szétszórt színes korongok (legfeljebb 20): „Melyik színből van a legtöbb?” */
const DOT_POS: [number, number][] = [
  [48, 50], [130, 36], [214, 58], [300, 40], [384, 54], [446, 104],
  [86, 110], [170, 100], [256, 116], [340, 98], [412, 168], [40, 170],
  [124, 176], [206, 160], [290, 180], [370, 132], [228, 212], [100, 220], [330, 222], [440, 220],
];
export const ColorDotsScene: React.FC<{ counts: { color: string; n: number }[] }> = ({ counts }) => {
  // a színeket felváltva osztjuk ki, hogy ne csoportosuljanak
  const left = counts.map((c) => c.n);
  const order: string[] = [];
  let k = 0;
  while (left.some((v) => v > 0)) {
    if (left[k % counts.length] > 0) {
      order.push(counts[k % counts.length].color);
      left[k % counts.length] -= 1;
    }
    k += 1;
  }
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {order.slice(0, DOT_POS.length).map((c, i) => (
        <circle key={i} cx={DOT_POS[i][0]} cy={DOT_POS[i][1]} r="17" fill={c} stroke="#111827" strokeWidth="3" />
      ))}
    </svg>
  );
};

/** Egy színes korong válaszkártyára. */
export const DotPic: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 80 80" className="w-16 h-16">
    <circle cx="40" cy="40" r="30" fill={color} stroke="#111827" strokeWidth="4" />
  </svg>
);

/** Eperszemek egy levélen (0–9), 5-ös sorokban; a levél középpontja (cx, cy). */
const leafG = (cx: number, cy: number, n: number, key?: React.Key, rx = 92, ry = 58) => (
  <g key={key}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#4ade80" stroke="#15803d" strokeWidth="4" />
    {Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / 5);
      const inRow = n > 5 ? (row === 0 ? 5 : n - 5) : n;
      const col = i % 5;
      const rows = n > 5 ? 2 : 1;
      const small = rx < 80;
      return ICONS.eper({ x: cx + (col - (inRow - 1) / 2) * (small ? 26 : 32), y: cy + (row - (rows - 1) / 2) * 40, s: small ? 0.68 : 0.8, key: i });
    })}
  </g>
);

/** Három levél, mindegyiken eper (0–9): Zümi, Csigusz és Pötyi szüretje – háromtagú összeadáshoz. Alul felirat. */
export const ThreeLeavesScene: React.FC<{ counts: [number, number, number]; label?: string }> = ({ counts, label }) => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {counts.map((n, k) => (
      <g key={k}>
        {leafG(84 + k * 156, 92, n, k, 72, 54)}
      </g>
    ))}
    {ICONS.meh({ x: 84, y: 166, s: 0.9 })}
    {ICONS.csiga({ x: 240, y: 168, s: 0.9 })}
    {ICONS.katica({ x: 396, y: 166, s: 0.9 })}
    {label && (
      <text x="240" y="224" textAnchor="middle" fontSize="32" fontWeight="900" fill="#1e293b" fontFamily={FONT}>
        {label.split(/(\?|□)/).map((p, i) => (p === '?' || p === '□' ? <tspan key={i} fill={PURPLE}>{p}</tspan> : <tspan key={i}>{p}</tspan>))}
      </text>
    )}
  </svg>
);

/** „Mi változott meg?” – két kép egymás mellett: kosár (1 tízes) + levélen `left`, illetve `right` szem eper. */
export const SpotScene: React.FC<{ left: number; right: number }> = ({ left, right }) => (
  <svg viewBox="0 0 480 220">
    {[left, right].map((n, k) => (
      <g key={k} transform={`translate(${k * 244} 0)`}>
        <rect x="4" y="4" width="228" height="212" rx="16" fill="#e0f2fe" stroke="#64748b" strokeWidth="3" />
        <g transform="translate(64 10) scale(0.55)">{basketG(0, 0)}</g>
        {leafG(118, 156, n, `l${k}`, 98, 50)}
      </g>
    ))}
  </svg>
);

/** Kis kosár-ikon gombra (1 tízes). */
export const BasketIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 200 150" className={className}>
    {basketG(0, 0)}
  </svg>
);

/** Kis eper-ikon gombra (1 egyes); `minus`: áthúzva (elvétel). */
export const EperIcon: React.FC<{ minus?: boolean; className?: string }> = ({ minus = false, className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    {ICONS.eper({ x: 30, y: 32, s: 1.1 })}
    {minus && <path d="M8 52 L52 8" stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
  </svg>
);
