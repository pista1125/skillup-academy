import React from 'react';
import { FONT, INK, UNK, QFig, PriceTag } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { WrittenAddG3ColumnG, columnAddSize, addSteps } from '../irasbeli-osszeadas/WrittenAddG3Column';

// ---------------------------------------------------------------------------
// Rajzelemek az 5. Szöveges feladatok leckéhez (a 6. Megálló is használja).
// Az alapelemek (QFig, csíkok, árcédula) a 4. lecke Parts fájljában vannak.
// ---------------------------------------------------------------------------

export const round10 = (n: number) => Math.round(n / 10) * 10;
export const round100 = (n: number) => Math.round(n / 100) * 100;

/** Összeadás a maradék (beváltás) nélkül – a leggyakoribb hiba. Pl. 236 + 158 → 384. */
export const sumNoCarry = (nums: number[]): number => {
  let r = 0;
  for (let p = 1; p <= 100; p *= 10) r += (nums.reduce((s, n) => s + (Math.floor(n / p) % 10), 0) % 10) * p;
  return r;
};

/** A beváltott jegyek a WrittenAddG3Column `carries` propjához (jobbról: [-, tízesek fölé, százasok fölé]). */
export const carriesOf = (nums: number[]): (number | null)[] => {
  const st = addSteps(nums, 3);
  return [null, st[1].carryIn || null, st[2].carryIn || null];
};

/** Kérdésábra: írásbeli összeadás oszlopban (a c7a-féle közös komponenssel). */
export const ColumnFig: React.FC<{ addends: (number | string)[]; result?: number | string; carries?: (number | string | null)[]; header?: boolean; cell?: number }> = ({
  addends,
  result = '___',
  carries,
  header = true,
  cell = 26
}) => {
  const props = { addends, result, carries, header, cell };
  const { w, h } = columnAddSize(props);
  return (
    <QFig h={h + 16}>
      <WrittenAddG3ColumnG {...props} x={(240 - w) / 2} y={8} />
    </QFig>
  );
};

/** Táblázat: név – érték sorok (pl. osztályok és a gyűjtött papír). */
export const ListTableFig: React.FC<{ title?: string; rows: [string, string][] }> = ({ title, rows }) => {
  const h = 18 + (title ? 22 : 0) + rows.length * 26;
  const y0 = 10 + (title ? 22 : 0);
  return (
    <QFig h={h}>
      {title && <text x="120" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{title}</text>}
      {rows.map(([k, v], i) => (
        <g key={i}>
          <rect x="40" y={y0 + i * 26} width="90" height="26" fill={i % 2 ? '#f1f5f9' : '#e0f2fe'} stroke="#94a3b8" />
          <rect x="130" y={y0 + i * 26} width="70" height="26" fill="#fff" stroke="#94a3b8" />
          <text x="85" y={y0 + i * 26 + 17.5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{k}</text>
          <text x="165" y={y0 + i * 26 + 17.5} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={v.includes('?') ? UNK : INK}>{v}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Árcédulák egy sorban „+” jelekkel (2 vagy 3 db). */
export const TagsFig: React.FC<{ items: { name: string; price: number }[] }> = ({ items }) => {
  const n = items.length;
  const tw = n === 3 ? 62 : 80;
  const gap = n === 3 ? 14 : 24;
  const total = n * tw + (n - 1) * gap;
  const x0 = (240 - total) / 2;
  return (
    <QFig h={84}>
      {items.map((it, k) => {
        const x = x0 + k * (tw + gap);
        return (
          <g key={k}>
            <text x={x + (tw - 10) / 2} y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{it.name}</text>
            <PriceTag x={x} y={38} text={`${it.price} Ft`} w={tw} fs={n === 3 ? 12.5 : 14} fill={['#fef3c7', '#e0f2fe', '#dcfce7'][k % 3]} />
            {k > 0 && <text x={x - gap / 2} y="56" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>}
          </g>
        );
      })}
    </QFig>
  );
};

/** Palacsintázó étlap (krétatábla). */
export const MENU = { alap: 160, items: [['kakaó', 85], ['lekvár', 95], ['túró', 145], ['tejszínhab', 120]] as [string, number][] };
export const MenuBoardG: React.FC<{ x?: number; y?: number; w?: number; fs?: number }> = ({ x = 10, y = 8, w = 220, fs = 13 }) => {
  const lh = fs * 1.45;
  const h = lh * (MENU.items.length + 3) + 10;
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#14532d" stroke="#a16207" strokeWidth="5" />
      <text x={x + w / 2} y={y + lh} textAnchor="middle" fontSize={fs + 1} fontWeight="bold" fill="#fde68a">Palacsinta: {MENU.alap} Ft</text>
      <text x={x + 14} y={y + lh * 2.15} fontSize={fs - 0.5} fontWeight="bold" fill="#bbf7d0">Feltétek:</text>
      {MENU.items.map(([n, p], i) => (
        <g key={n}>
          <text x={x + 24} y={y + lh * (3.15 + i)} fontSize={fs} fill="#fff">{n}</text>
          <text x={x + w - 16} y={y + lh * (3.15 + i)} textAnchor="end" fontSize={fs} fontWeight="bold" fill="#fff">{p} Ft</text>
        </g>
      ))}
    </g>
  );
};
export const menuBoardHeight = (fs = 13) => fs * 1.45 * (MENU.items.length + 3) + 10;

export const MenuFig: React.FC = () => (
  <QFig h={menuBoardHeight(13) + 18}>
    <MenuBoardG x={30} y={9} w={180} fs={13} />
  </QFig>
);
