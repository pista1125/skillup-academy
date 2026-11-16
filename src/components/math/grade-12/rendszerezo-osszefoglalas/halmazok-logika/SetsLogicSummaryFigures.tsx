import React from 'react';
import { Venn, K_BLUE, K_RED, K_GREEN, K_PURPLE, K_INK } from './vennKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={K_INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: részhalmaz és valódi részhalmaz
export const SubsetSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Részhalmaz: A ⊆ B, valódi részhalmaz: A ⊂ B" className={className} h={230}>
    <rect x="30" y="45" width="190" height="150" rx="10" fill="#fff" stroke="#94a3b8" />
    <circle cx="125" cy="120" r="66" fill="#fee2e2" stroke={K_RED} strokeWidth="2" />
    <circle cx="110" cy="128" r="34" fill="#dbeafe" stroke={K_BLUE} strokeWidth="2" />
    <text x="110" y="133" fontSize="15" fontWeight="bold" textAnchor="middle" fill={K_BLUE}>A</text>
    <text x="168" y="80" fontSize="15" fontWeight="bold" textAnchor="middle" fill={K_RED}>B</text>
    <text x="125" y="212" fontSize="11" textAnchor="middle" fill="#475569">A minden eleme B-nek is eleme</text>
    <rect x="260" y="45" width="190" height="150" rx="10" fill="#fff" stroke="#94a3b8" />
    <circle cx="355" cy="120" r="56" fill="#ede9fe" stroke={K_PURPLE} strokeWidth="2" />
    <text x="355" y="115" fontSize="14" fontWeight="bold" textAnchor="middle" fill={K_PURPLE}>A = B</text>
    <text x="355" y="135" fontSize="11" textAnchor="middle" fill="#475569">(A ⊆ B is igaz)</text>
    <text x="355" y="212" fontSize="11" textAnchor="middle" fill="#475569">ugyanazok az elemeik</text>
  </Frame>
);

// 2. ábra: a négy halmazművelet
export const SetOperationsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Halmazműveletek Venn-diagramon" className={className} h={310}>
    <Venn embed={{ x: 40, y: 34, w: 190 }} shade={['10', '01', '11']} title="A ∪ B (unió)"  />
    <Venn embed={{ x: 250, y: 34, w: 190 }} shade={['11']} title="A ∩ B (metszet)" shadeColor="#86efac" />
    <Venn embed={{ x: 40, y: 168, w: 190 }} shade={['10']} title="A ∖ B (különbség)"  shadeColor="#fca5a5" />
    <Venn embed={{ x: 250, y: 168, w: 190 }} shade={['01', '00']} title="Ā (A komplementere H-ra)"  shadeColor="#fde68a" />
  </Frame>
);

// 3. ábra: szitaformula három halmazra
export const SieveFormulaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Szitaformula három halmazra" className={className} h={290}>
    <Venn embed={{ x: 20, y: 40, w: 250 }} n={3} shade={['111']} shadeColor="#c4b5fd" values={{ '111': '+1' }}  />
    <text x="285" y="80" fontSize="12" fill={K_INK}>|A ∪ B ∪ C| =</text>
    <text x="285" y="104" fontSize="12" fill={K_BLUE}>|A| + |B| + |C|</text>
    <text x="285" y="128" fontSize="12" fill={K_RED}>− |A ∩ B| − |A ∩ C| − |B ∩ C|</text>
    <text x="285" y="152" fontSize="12" fill={K_GREEN}>+ |A ∩ B ∩ C|</text>
    <text x="285" y="190" fontSize="10.5" fill="#475569">A közös rész elemeit 3-szor adtuk</text>
    <text x="285" y="205" fontSize="10.5" fill="#475569">hozzá, 3-szor vontuk le,</text>
    <text x="285" y="220" fontSize="10.5" fill="#475569">ezért egyszer vissza kell adni.</text>
    <text x="285" y="250" fontSize="11" fill={K_PURPLE} fontWeight="bold">Két halmazra: |A ∪ B| = |A| + |B| − |A ∩ B|</text>
  </Frame>
);

// 4. ábra: kidolgozott feladat – filmek
export const MovieVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Kidolgozott feladat: Avatar (A), Mátrix (M), Gladiátor (G)" className={className} h={280}>
    <Venn embed={{ x: 20, y: 40, w: 250 }}
        n={3}
        labels={['A', 'M', 'G']}
        universe="osztály"
        shade={['110', '101', '011']}
        shadeColor="#bbf7d0"
        values={{ '111': 'x', '000': 'x' }}
        
      />
    <text x="290" y="70" fontSize="11.5" fill={K_INK}>|A| = 17, |M| = 18, |G| = 13</text>
    <text x="290" y="96" fontSize="11" fill={K_GREEN}>zöld: pontosan 2 filmet látott – összesen x fő</text>
    <text x="290" y="116" fontSize="11" fill="#b45309">fehér körrészek: pontosan 1 film – x fő</text>
    <text x="290" y="136" fontSize="11" fill={K_PURPLE}>középen: mind a hármat – x fő</text>
    <text x="290" y="156" fontSize="11" fill="#475569">körökön kívül: egyiket sem – x fő</text>
    <text x="290" y="190" fontSize="12" fontWeight="bold" fill={K_RED}>17 + 18 + 13 = x + 2x + 3x</text>
    <text x="290" y="212" fontSize="12" fontWeight="bold" fill={K_RED}>48 = 6x ⇒ x = 8</text>
    <text x="290" y="236" fontSize="12" fontWeight="bold" fill={K_BLUE}>létszám: 4x = 32 fő</text>
  </Frame>
);

// 5. ábra: igazságtáblázatok
export const TruthTablesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: [boolean, boolean][] = [
    [true, true],
    [true, false],
    [false, true],
    [false, false]
  ];
  const cols: { h: string; f: (a: boolean, b: boolean) => boolean }[] = [
    { h: '¬A', f: (a) => !a },
    { h: 'A ∨ B', f: (a, b) => a || b },
    { h: 'A ∧ B', f: (a, b) => a && b },
    { h: 'vagy A, vagy B', f: (a, b) => a !== b },
    { h: 'A → B', f: (a, b) => !a || b },
    { h: 'A ↔ B', f: (a, b) => a === b }
  ];
  const cw = [40, 40, 50, 54, 54, 96, 56, 56];
  const xs = cw.reduce<number[]>((acc, w, i) => [...acc, i === 0 ? 20 : acc[i - 1] + cw[i - 1]], []);
  return (
    <Frame title="Logikai műveletek igazságtáblázata" className={className} h={210}>
      {['A', 'B', ...cols.map((c) => c.h)].map((h, i) => (
        <g key={h}>
          <rect x={xs[i]} y="40" width={cw[i]} height="26" fill={i < 2 ? '#e0e7ff' : '#f1f5f9'} stroke="#cbd5e1" />
          <text x={xs[i] + cw[i] / 2} y="57" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill={K_INK}>
            {h}
          </text>
        </g>
      ))}
      {rows.map(([a, b], r) => {
        const vals = [a, b, ...cols.map((c) => c.f(a, b))];
        return vals.map((v, i) => (
          <g key={`${r}-${i}`}>
            <rect x={xs[i]} y={66 + r * 30} width={cw[i]} height="30" fill={i < 2 ? '#f8fafc' : v ? '#ecfdf5' : '#fef2f2'} stroke="#cbd5e1" />
            <text x={xs[i] + cw[i] / 2} y={86 + r * 30} fontSize="11" textAnchor="middle" fill={v ? K_GREEN : K_RED} fontWeight={i < 2 ? 'normal' : 'bold'}>
              {v ? 'i' : 'h'}
            </text>
          </g>
        ));
      })}
      <text x="240" y="198" fontSize="10.5" textAnchor="middle" fill="#475569">
        i = igaz, h = hamis. Az implikáció csak akkor hamis, ha A igaz és B hamis.
      </text>
    </Frame>
  );
};
