// „Számolás 20-ig” (témakörzáró) – Pötyi év végi ünnepének képei: lufik, zászlófüzér, sütik, ajándékdobozok.
// A két tízes keret, a csoportok, a művelet- és számsorképek az „A tizenöt”, a tízesrudak az „A húsz” leckéből jönnek.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { FONT, PURPLE, garden } from '../a-tizenot/ATizenotG1Scenes';

const BALLOON_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f97316', '#ec4899', '#a855f7'];

/** Egy lufi (középpont x, y), madzaggal; opcionális felirat. */
const balloon = (x: number, y: number, color: string, opts: { r?: number; label?: string | number; key?: React.Key; crossed?: boolean; q?: boolean } = {}) => {
  const { r = 22, label, key, crossed = false, q = false } = opts;
  return (
    <g key={key} opacity={crossed ? 0.4 : 1}>
      <path d={`M${x} ${y + r * 1.15} q-6 ${r * 0.6} 0 ${r * 1.2} t0 ${r * 0.9}`} fill="none" stroke="#475569" strokeWidth="2" />
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.18} fill={q ? '#ede9fe' : color} stroke={q ? PURPLE : '#1f2937'} strokeWidth="3" />
      <path d={`M${x - 5} ${y + r * 1.18 + 5} L${x} ${y + r * 1.18 - 1} L${x + 5} ${y + r * 1.18 + 5} Z`} fill={q ? PURPLE : color} stroke="#1f2937" strokeWidth="2" />
      {!q && <ellipse cx={x - r * 0.4} cy={y - r * 0.45} rx={r * 0.22} ry={r * 0.35} fill="#fff" opacity="0.5" />}
      {label !== undefined && (
        <text x={x} y={y + r * 0.42} textAnchor="middle" fontSize={r * 1.05} fontWeight="900" fill={q ? PURPLE : '#fff'} stroke={q ? 'none' : '#1f2937'} strokeWidth={q ? 0 : 1} fontFamily={FONT}>
          {label}
        </text>
      )}
      {crossed && <path d={`M${x - r} ${y + r} L${x + r} ${y - r}`} stroke="#111827" strokeWidth="4" strokeLinecap="round" />}
    </g>
  );
};

/** Zászlófüzér a kép tetején. */
const garland = (w: number) => (
  <g>
    <path d={`M0 14 Q${w / 2} 44 ${w} 14`} fill="none" stroke="#78350f" strokeWidth="3" />
    {Array.from({ length: 11 }, (_, i) => {
      const x = 20 + i * ((w - 40) / 10);
      const t = (x / w) * 2 - 1;
      const y = 14 + 30 * (1 - t * t);
      return <path key={i} d={`M${x - 12} ${y - 2} L${x + 12} ${y - 2} L${x} ${y + 22} Z`} fill={BALLOON_COLORS[i % BALLOON_COLORS.length]} stroke="#1f2937" strokeWidth="2" />;
    })}
  </g>
);

/** Az ünnep: zászlófüzér, lufik, torta, Pötyi és a barátai. */
export const PartyScene: React.FC<{ number?: number | string; mood?: 'happy' | 'wow' | 'cheer' }> = ({ number, mood = 'happy' }) => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {garland(480)}
    {balloon(36, 92, '#ef4444', { r: 18 })}
    {balloon(70, 80, '#3b82f6', { r: 18 })}
    {balloon(446, 92, '#22c55e', { r: 18 })}
    {balloon(412, 80, '#ec4899', { r: 18 })}
    <Potyi mood={mood} dots={7} number={number} x={150} y={56} size={170} />
    {ICONS.meh({ x: 90, y: 190, s: 1.7 })}
    {ICONS.csiga({ x: 380, y: 196, s: 2 })}
  </svg>
);

/** Számozott lufik sorban; a „?” lufi lila. */
export const BalloonNumbers: React.FC<{ items: (number | string)[] }> = ({ items }) => {
  const n = items.length;
  const step = Math.min(64, 440 / n);
  const x0 = 240 - ((n - 1) * step) / 2;
  return (
    <svg viewBox="0 0 480 170">
      <rect x="0" y="0" width="480" height="170" rx="18" fill="#e0f2fe" />
      {items.map((v, i) => balloon(x0 + i * step, 56 + (i % 2) * 14, BALLOON_COLORS[i % BALLOON_COLORS.length], { r: Math.min(26, step / 2.3), label: v, q: v === '?', key: i }))}
    </svg>
  );
};

/** Lufisor balról jobbra; a sor eleje Pötyinél van. A `yellow`-adik (1-től) lufi sárga, a többi kék – sorszámnévhez. */
export const BalloonRow: React.FC<{ n: number; yellow: number }> = ({ n, yellow }) => {
  const step = 46;
  const w = 90 + n * step;
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="2" y="2" width={w - 4} height="146" rx="16" fill="#ecfccb" stroke="#84cc16" strokeWidth="3" />
      <Potyi mood="happy" dots={7} x={6} y={56} size={78} />
      {Array.from({ length: n }, (_, i) => balloon(100 + i * step, 50, i === yellow - 1 ? '#facc15' : '#3b82f6', { r: 18, key: i }))}
    </svg>
  );
};

/** Luficsokor (0–20, ötös sorokban); az utolsó `crossed` lufi áthúzva (elszállt). */
export const BalloonBunch: React.FC<{ n: number; crossed?: number; className?: string }> = ({ n, crossed = 0, className = 'w-full max-w-[400px] h-auto mx-auto' }) => {
  const rows = Math.max(1, Math.ceil(n / 5));
  const h = rows * 62 + 36;
  return (
    <svg viewBox={`0 0 340 ${h}`} className={className}>
      <rect x="2" y="2" width="336" height={h - 4} rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) =>
        balloon(50 + (i % 5) * 60, 34 + Math.floor(i / 5) * 62, BALLOON_COLORS[i % BALLOON_COLORS.length], { r: 17, key: i, crossed: i >= n - crossed })
      )}
    </svg>
  );
};

/** Süti (kerek, csokidarabokkal). */
const cookie = (x: number, y: number, extra: boolean, key: React.Key) => (
  <g key={key}>
    <circle cx={x} cy={y} r="12" fill={extra ? '#fde68a' : '#d97706'} stroke="#78350f" strokeWidth="2.5" />
    {[[-4, -3], [4, -1], [-1, 5]].map(([a, b], i) => <circle key={i} cx={x + a} cy={y + b} r="2.2" fill="#451a03" />)}
  </g>
);

/**
 * „Ennyivel több” kép: fent Csigusz `a` sütije, lent Zümi ugyanannyi + `more` világos sütije, a végén „?”.
 * (A könyv: „6 kacsa és 7-tel több liba”.)
 */
export const MoreScene: React.FC<{ a: number; more: number }> = ({ a, more }) => {
  const step = 27;
  return (
    <svg viewBox="0 0 480 170">
      <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
      {ICONS.csiga({ x: 34, y: 50, s: 1.2 })}
      {ICONS.meh({ x: 34, y: 122, s: 1.2 })}
      {Array.from({ length: a }, (_, i) => cookie(76 + i * step, 50, false, `a${i}`))}
      {Array.from({ length: a }, (_, i) => cookie(76 + i * step, 122, false, `b${i}`))}
      {Array.from({ length: more }, (_, i) => cookie(76 + (a + i) * step, 122, true, `c${i}`))}
      <path d={`M${66 + a * step} 146 Q${66 + a * step} 158 ${76 + a * step} 158 H${64 + (a + more) * step} Q${76 + (a + more) * step - 2} 158 ${76 + (a + more) * step - 2} 146`} fill="none" stroke={PURPLE} strokeWidth="3" />
      <text x={70 + (a + more / 2) * step} y="96" textAnchor="middle" fontSize="24" fontWeight="900" fill={PURPLE} fontFamily={FONT}>+{more}</text>
      <text x={462} y="132" textAnchor="end" fontSize="38" fontWeight="900" fill={PURPLE} fontFamily={FONT}>?</text>
    </svg>
  );
};

/** Találós kép: `count` egyforma ajándékdoboz (bennük „?”) együtt `total`. */
export const GiftBoxes: React.FC<{ count: number; total: number }> = ({ count, total }) => {
  const box = (x: number, key: React.Key) => (
    <g key={key}>
      <rect x={x} y="56" width="74" height="64" rx="6" fill="#ec4899" stroke="#831843" strokeWidth="3" />
      <rect x={x - 6} y="42" width="86" height="20" rx="5" fill="#f472b6" stroke="#831843" strokeWidth="3" />
      <rect x={x + 31} y="42" width="12" height="78" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
      <path d={`M${x + 37} 42 C${x + 18} 22 ${x + 10} 40 ${x + 37} 42 C${x + 56} 22 ${x + 64} 40 ${x + 37} 42`} fill="#facc15" stroke="#854d0e" strokeWidth="2" />
      <circle cx={x + 37} cy="96" r="15" fill="#fff" stroke={PURPLE} strokeWidth="2.5" />
      <text x={x + 37} y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill={PURPLE} fontFamily={FONT}>?</text>
    </g>
  );
  const step = 108;
  return (
    <svg viewBox="0 0 480 150">
      <rect x="0" y="0" width="480" height="150" rx="18" fill="#fdf2f8" />
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          {box(14 + i * step, `b${i}`)}
          {i < count - 1 && <text x={14 + i * step + 91} y="100" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>}
        </g>
      ))}
      <text x={14 + count * step + 34} y="102" textAnchor="middle" fontSize="40" fontWeight="900" fill="#1e293b" fontFamily={FONT}>= {total}</text>
    </svg>
  );
};
