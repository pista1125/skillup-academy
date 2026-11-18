// „Több, kevesebb, ugyanannyi” – a mese és a játék képei. Itt jelennek meg a jelek: =, <, >.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
// A tárgyrajzok és a pöttykártya a „Számlálások” leckéből (ugyanaz a fejezet).
import { DotCard, GroupPic, NUM_ATTR, NUM_WORD, THING_NAME, Thing, drawThing } from '../szamlalasok/SzamlalasokG1Scenes';

export { DotCard, GroupPic, NUM_ATTR, NUM_WORD, THING_NAME, drawThing };
export type { Thing };

export type Sign = '<' | '>' | '=';
export const signOf = (a: number, b: number): Sign => (a < b ? '<' : a > b ? '>' : '=');
export const SIGN_SAY: Record<Sign, string> = { '<': 'kisebb, mint', '>': 'nagyobb, mint', '=': 'egyenlő' };

export const groupOpt = (thing: Thing, n: number) => ({ figure: <GroupPic thing={thing} n={n} />, say: `${NUM_ATTR[n]} ${THING_NAME[thing]}` });

const signText = (x: number, y: number, s: string, color = '#7c3aed') => (
  <text x={x} y={y} textAnchor="middle" fontSize="56" fontWeight="900" fill={color} fontFamily="system-ui, sans-serif">
    {s}
  </text>
);

/** Két keret egymás mellett, középen jel (vagy „?”, vagy üres). */
export const TwoSets: React.FC<{ a: [Thing, number]; b: [Thing, number]; sign?: Sign | '?' | null; className?: string }> = ({ a, b, sign = '?', className = 'w-full max-w-[420px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 330 110" className={className}>
    <svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupPic thing={a[0]} n={a[1]} className="" />
    </svg>
    {sign && (
      <>
        <rect x="135" y="22" width="60" height="66" rx="12" fill={sign === '?' ? '#f5f3ff' : '#fff'} stroke="#7c3aed" strokeWidth="3" strokeDasharray={sign === '?' ? '6 4' : undefined} />
        {signText(165, 74, sign, sign === '?' ? '#7c3aed' : '#dc2626')}
      </>
    )}
    <svg x="210" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupPic thing={b[0]} n={b[1]} className="" />
    </svg>
  </svg>
);

/** Két sor egymás alatt, összekötve párosával – ami pár nélkül marad, az a „több”. */
export const PairRows: React.FC<{ top: [Thing, number]; bottom: [Thing, number]; lines?: boolean; className?: string }> = ({ top, bottom, lines = true, className = 'w-full max-w-[440px] h-auto mx-auto' }) => {
  const n = Math.max(top[1], bottom[1]);
  const w = n * 70 + 20;
  const X = (i: number) => 45 + i * 70;
  return (
    <svg viewBox={`0 0 ${w} 170`} className={className}>
      <rect x="0" y="0" width={w} height="170" rx="16" fill="#f0fdf4" />
      {lines &&
        Array.from({ length: Math.min(top[1], bottom[1]) }, (_, i) => <path key={`l${i}`} d={`M${X(i)} 56 V114`} stroke="#7c3aed" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" />)}
      {Array.from({ length: top[1] }, (_, i) => drawThing(top[0], X(i), 34, 1.2, `t${i}`))}
      {Array.from({ length: bottom[1] }, (_, i) => drawThing(bottom[0], X(i), 136, 1.2, `b${i}`))}
    </svg>
  );
};

/** Fehér kockákból álló torony. */
const drawTower = (n: number, x: number, base: number, u = 24, key?: React.Key) => (
  <g key={key}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i}>
        <rect x={x} y={base - (i + 1) * u} width={u} height={u} fill="#fff" stroke="#334155" strokeWidth="2.5" />
        <path d={`M${x + u} ${base - (i + 1) * u} l6 -5 v${u} l-6 5`} fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
      </g>
    ))}
  </g>
);

export const TowerPic: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-16 h-auto' }) => (
  <svg viewBox="0 0 60 150" className={className}>
    <rect x="2" y="132" width="56" height="12" rx="4" fill="#d6a76c" stroke="#7c2d12" strokeWidth="2" />
    {drawTower(n, 16, 132)}
  </svg>
);
export const towerOpt = (n: number) => ({ figure: <TowerPic n={n} />, say: `${NUM_ATTR[n]} kockás torony` });

/** Két torony, közöttük jel helye. */
export const TowersScene: React.FC<{ left: number; right: number; sign?: Sign | '?' }> = ({ left, right, sign = '?' }) => (
  <svg viewBox="0 0 260 170" className="w-full max-w-[340px] h-auto mx-auto">
    <rect x="10" y="150" width="240" height="12" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    {drawTower(left, 50, 150)}
    {drawTower(right, 186, 150)}
    <rect x="100" y="70" width="60" height="66" rx="12" fill={sign === '?' ? '#f5f3ff' : '#fff'} stroke="#7c3aed" strokeWidth="3" strokeDasharray={sign === '?' ? '6 4' : undefined} />
    {signText(130, 122, sign, sign === '?' ? '#7c3aed' : '#dc2626')}
  </svg>
);

/** Két pöttykártya vagy két kéz, közöttük jel helye. */
export const DotsCompare: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 260 100" className="w-full max-w-[340px] h-auto mx-auto">
    <svg x="5" y="10" width="80" height="80" viewBox="0 0 80 80"><DotCard n={a} className="" /></svg>
    <rect x="100" y="17" width="60" height="66" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" strokeDasharray="6 4" />
    {signText(130, 69, '?')}
    <svg x="175" y="10" width="80" height="80" viewBox="0 0 80 80"><DotCard n={b} className="" /></svg>
  </svg>
);

/** Válaszkép: két kis csoport egy jellel – „melyik igaz?”. */
export const statementOpt = (thing: Thing, a: number, sign: Sign, b: number) => ({
  figure: <TwoSets a={[thing, a]} b={[thing, b]} sign={sign} className="w-full h-auto" />,
  say: `${NUM_WORD[a]} ${SIGN_SAY[sign]} ${NUM_WORD[b]}`,
});

/** Nyitó kép: piknik. */
export const PicnicScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 170 Q240 150 480 170 V250 H0 Z" fill="#86efac" />
    <path d="M180 190 L440 190 L470 240 L150 240 Z" fill="#fecaca" stroke="#b91c1c" strokeWidth="4" />
    <path d="M230 190 L215 240 M290 190 L290 240 M350 190 L365 240 M163 215 H455" stroke="#b91c1c" strokeWidth="3" />
    <path d="M380 150 h50 l-8 36 h-34 Z" fill="#d6a76c" stroke="#7c2d12" strokeWidth="4" strokeLinejoin="round" />
    <path d="M385 150 Q405 120 425 150" fill="none" stroke="#7c2d12" strokeWidth="4" />
    {ICONS.meh({ x: 230, y: 160, s: 1.4 })}
    {ICONS.csiga({ x: 300, y: 172, s: 1.4 })}
    {ICONS.katica({ x: 355, y: 205, s: 1.3 })}
    {[0, 1, 2, 3].map((i) => ICONS.eper({ x: 210 + i * 34, y: 218, s: 0.9, key: i }))}
    <Potyi mood="cheer" dots={7} x={20} y={50} size={160} />
  </svg>
);
