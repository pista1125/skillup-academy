// „Összeadás 0-tól 5-ig” – a mese és a játék képei (Pötyi uzsonnát rendez).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { Domino, Hand, ICONS } from '../../shared/G1Pics';
import { FruitName, GroupBox, drawThing, sky } from '../a-negy/ANegyG1Scenes';

const FONT = 'system-ui, sans-serif';

/** Uzsonna a Számkertben: asztal, tányér, Pötyi, Zümi, Csigusz. */
export const PartyScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="200" y="140" width="240" height="14" rx="5" fill="#b45309" stroke="#78350f" strokeWidth="3" />
    <rect x="216" y="154" width="10" height="66" fill="#92400e" />
    <rect x="414" y="154" width="10" height="66" fill="#92400e" />
    <ellipse cx="320" cy="134" rx="70" ry="12" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {ICONS.eper({ x: 296, y: 122, s: 0.8 })}
    {ICONS.eper({ x: 340, y: 122, s: 0.8 })}
    <Potyi mood="cheer" dots={5} x={10} y={70} size={160} />
    {ICONS.meh({ x: 250, y: 60, s: 1.3 })}
    {ICONS.csiga({ x: 420, y: 112, s: 1.1 })}
  </svg>
);

/** Tányér (vagy ág) `have` tárggyal; fent `add` tárgy érkezik egy nyíllal. A tetejére „?” is kerülhet. */
export const ArriveScene: React.FC<{ icon: FruitName; have: number; add: number; place?: 'plate' | 'branch'; who?: 'meh' | 'csiga' | 'katica' }> = ({ icon, have, add, place = 'plate', who }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill={place === 'branch' ? '#e0f2fe' : '#fef3c7'} />
    {place === 'plate' ? (
      <ellipse cx="190" cy="180" rx="150" ry="34" fill="#fff" stroke="#94a3b8" strokeWidth="4" />
    ) : (
      <path d="M20 196 Q200 172 360 190" stroke="#92400e" strokeWidth="14" fill="none" strokeLinecap="round" />
    )}
    {Array.from({ length: have }, (_, i) => drawThing(icon, 190 + (i - (have - 1) / 2) * 56, 168, 1.3, `h${i}`))}
    {Array.from({ length: add }, (_, i) => drawThing(icon, 400 + (i % 2) * 44 - (add > 1 ? 22 : 0), 50 + Math.floor(i / 2) * 46, 1.2, `a${i}`))}
    <path d="M390 140 Q350 168 304 156" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <path d="M316 144 L302 156 L320 166" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    {who && drawThing(who, 290, 56, 1.3)}
  </svg>
);

/** a tárgy + b tárgy = ? (képes összeadás). */
export const SumScene: React.FC<{ icon: FruitName; a: number; b: number; iconB?: FruitName; result?: number | '?' }> = ({ icon, a, b, iconB, result = '?' }) => (
  <svg viewBox="0 0 440 120">
    <svg x="0" y="10" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={icon} n={a} className="" />
    </svg>
    <text x="146" y="76" textAnchor="middle" fontSize="46" fontWeight="900" fill="#dc2626" fontFamily={FONT}>+</text>
    <svg x="172" y="10" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={iconB ?? icon} n={b} className="" />
    </svg>
    <text x="318" y="76" textAnchor="middle" fontSize="46" fontWeight="900" fill="#1f2937" fontFamily={FONT}>=</text>
    <rect x="346" y="24" width="80" height="72" rx="14" fill={result === '?' ? '#ede9fe' : '#fff'} stroke="#7c3aed" strokeWidth="3" />
    <text x="386" y="76" textAnchor="middle" fontSize="44" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{result}</text>
  </svg>
);

/** Nagy műveletkép, pl. "3 + 1 = 4" vagy "3 + 1 ? 4". */
export const ExprScene: React.FC<{ text: string; bg?: string }> = ({ text, bg = '#fffbeb' }) => (
  <svg viewBox="0 0 440 110">
    <rect x="2" y="2" width="436" height="106" rx="18" fill={bg} stroke="#fcd34d" strokeWidth="3" />
    <text x="220" y="74" textAnchor="middle" fontSize="54" fontWeight="900" fill="#1f2937" fontFamily={FONT}>
      {text.split('').map((c, i) => (
        <tspan key={i} fill={c === '+' ? '#dc2626' : c === '?' ? '#7c3aed' : undefined}>{c}</tspan>
      ))}
    </text>
  </svg>
);

/** „Így írjuk” tábla: dominó + művelet. */
export const WriteItScene: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef9c3" />
    <svg x="150" y="10" width="180" height="90" viewBox="0 0 160 80">
      <Domino left={a} right={b} className="" />
    </svg>
    <text x="240" y="170" textAnchor="middle" fontSize="60" fontWeight="900" fill="#1f2937" fontFamily={FONT}>
      {a} <tspan fill="#dc2626">+</tspan> {b} = {a + b}
    </text>
  </svg>
);

/** Két kéz egymás mellett. */
export const TwoHands: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 320 130">
    <svg x="10" y="5" width="120" height="120" viewBox="0 0 100 110">
      <Hand fingers={a} className="" />
    </svg>
    <text x="160" y="80" textAnchor="middle" fontSize="44" fontWeight="900" fill="#dc2626" fontFamily={FONT}>+</text>
    <svg x="190" y="5" width="120" height="120" viewBox="0 0 100 110">
      <Hand fingers={b} className="" />
    </svg>
  </svg>
);

/** Két színű almák egy keretben (felcserélhetőség): `first` színű elöl, utána a másik. */
export const TwoColorApples: React.FC<{ red: number; green: number; greenFirst?: boolean; className?: string }> = ({ red, green, greenFirst = false, className = 'w-full max-w-[300px] h-auto mx-auto' }) => {
  const cols = greenFirst ? [...Array(green).fill('#84cc16'), ...Array(red).fill('#ef4444')] : [...Array(red).fill('#ef4444'), ...Array(green).fill('#84cc16')];
  const w = cols.length * 56 + 16;
  return (
    <svg viewBox={`0 0 ${w} 80`} className={className}>
      <rect x="2" y="2" width={w - 4} height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {cols.map((c, i) => ICONS.alma({ x: 36 + i * 56, y: 42, s: 1.2, color: c, key: i }))}
    </svg>
  );
};
