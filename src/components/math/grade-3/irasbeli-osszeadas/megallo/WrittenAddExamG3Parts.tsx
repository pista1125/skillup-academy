import React from 'react';
import { INK, UNK, QFig, NumBox } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { addSteps, suffixA } from '../irasbeli-osszeadas/WrittenAddG3Column';

// ---------------------------------------------------------------------------
// Segédek a 6. Megálló – tudáspróba leckéhez. A rajzelemek nagy része a 4–5.
// lecke Parts fájljából és a 3. lecke közös WrittenAddG3Column komponenséből jön.
// ---------------------------------------------------------------------------

/** Két összeg egymás mellett, köztük „?” kör (összehasonlítás számolás nélkül). */
export const CompareSumsFig: React.FC<{ l: [number, number]; r: [number, number] }> = ({ l, r }) => (
  <QFig h={64}>
    <NumBox cx={28} cy={32} v={l[0]} w={42} h={28} fs={15} fill="#dbeafe" stroke="#3b82f6" />
    <text x="56" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={84} cy={32} v={l[1]} w={42} h={28} fs={15} fill="#fef9c3" stroke="#ca8a04" />
    <circle cx="120" cy="32" r="11" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="120" y="37.5" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
    <NumBox cx={156} cy={32} v={r[0]} w={42} h={28} fs={15} fill="#dbeafe" stroke="#3b82f6" />
    <text x="184" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={212} cy={32} v={r[1]} w={42} h={28} fs={15} fill="#fef9c3" stroke="#ca8a04" />
  </QFig>
);

/** „az 5-öt”, „a 4-et” – névelő + szám + tárgyrag. */
const accDigit = (d: number) => `${d === 1 || d === 5 ? 'az' : 'a'} ${d}-${suffixA(d)}`;

/**
 * Az írásbeli összeadás kimondva, a tankönyv szavaival, jobbról balra.
 * A rövidebb tagok hiányzó helyi értékeit kihagyja (pl. 358 + 64 százasainál csak „3”).
 * Pl. „8 meg 5 az 13, leírom a 3-at, maradt 1. …”
 */
export const speakAdd = (nums: number[]): string => {
  const total = nums.reduce((s, n) => s + n, 0);
  const st = addSteps(nums, 3);
  const parts: string[] = [];
  st.forEach((s) => {
    const p = 10 ** s.col;
    const ds = nums.filter((n) => n >= p || s.col === 0).map((n) => Math.floor(n / p) % 10);
    if (ds.length === 0 && s.carryIn === 0) return;
    const own = ds.reduce((a, d) => a + d, 0);
    let t = ds.length > 1 ? `${ds.join(' meg ')} az ${own}` : ds.length === 1 ? `${ds[0]}` : '';
    if (s.carryIn > 0) t = ds.length > 1 ? `${t}, meg ${s.carryIn} az ${s.sum}` : ds.length === 1 ? `${ds[0]} meg ${s.carryIn} az ${s.sum}` : `marad ${s.carryIn}`;
    else if (ds.length === 1) t = `${ds[0]} az ${ds[0]}`;
    const last = s.col === 2 || nums.every((n) => n < 10 ** (s.col + 1));
    if (s.sum >= 10 && !last) t += `, leírom ${accDigit(s.write)}, maradt ${s.carryOut}`;
    parts.push(t + '.');
    if (last) st.length = 0;
  });
  return `${parts.join(' ')} Az összeg ${total}.`;
};

/** Beváltás (maradék) nélküli hibás összeg – a leggyakoribb hiba. */
export { sumNoCarry } from '../szoveges-feladatok/AddWordProblemsG3Parts';
