// „A sorszámnevek” – szánkóverseny a havas Számkertben (képek a meséhez és a játékhoz).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { snow } from '../a-nyolc/ANyolcG1Scenes';
import { XMAS, XPIC, XPicName } from '../a-kilenc/AKilencG1Scenes';

export type Racer = 'potyi' | 'zumi' | 'csigusz';
export const RACER_NAME: Record<Racer, string> = { potyi: 'Pötyi', zumi: 'Zümi', csigusz: 'Csigusz' };

/** Szereplő egy SVG-n belül (x, y = középpont, size ≈ szélesség). */
export const drawRacer = (who: Racer, x: number, y: number, size = 60, key?: React.Key) =>
  who === 'potyi' ? (
    <Potyi key={key} mood="happy" dots={7} x={x - size / 2} y={y - size / 2} size={size} />
  ) : (
    <g key={key}>{(who === 'zumi' ? ICONS.meh : ICONS.csiga)({ x, y, s: size / 40 })}</g>
  );

/** Szereplő kártyaképe (válaszlehetőséghez). */
export const RacerPic: React.FC<{ who: Racer }> = ({ who }) => (
  <svg viewBox="0 0 100 90" className="w-24 h-auto">
    <rect x="3" y="3" width="94" height="84" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {drawRacer(who, 50, 46, 64)}
  </svg>
);

/** A domb tetején a három versenyző a szánkóján. */
export const RaceHillScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#dbeafe" />
    <path d="M0 90 Q120 70 220 130 T480 220 V240 H0 Z" fill="#fff" stroke="#bfdbfe" strokeWidth="3" />
    <rect x="22" y="30" width="6" height="64" fill="#475569" />
    <path d="M28 30 L64 42 L28 54 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
    {(['potyi', 'zumi', 'csigusz'] as Racer[]).map((r, i) => (
      <g key={r}>
        {XMAS.szanko({ x: 120 + i * 110, y: 110 + i * 34, s: 1.6, color: ['#ef4444', '#3b82f6', '#22c55e'][i] })}
        {drawRacer(r, 120 + i * 110, 82 + i * 34, r === 'potyi' ? 56 : 48)}
      </g>
    ))}
  </svg>
);

/** Dobogó: 2. bal, 1. közép, 3. jobb. `order`: [első, második, harmadik]. */
export const PodiumScene: React.FC<{ order: [Racer, Racer, Racer]; labels?: boolean }> = ({ order, labels = true }) => {
  const spots = [
    { place: 1, x: 240, h: 100 },
    { place: 2, x: 140, h: 70 },
    { place: 3, x: 340, h: 46 },
  ];
  return (
    <svg viewBox="0 0 480 240">
      {snow(480, 240)}
      {spots.map((s, i) => (
        <g key={s.place}>
          <rect x={s.x - 50} y={226 - s.h} width="100" height={s.h} fill={['#facc15', '#cbd5e1', '#f59e0b'][i]} stroke="#475569" strokeWidth="4" />
          {labels && (
            <text x={s.x} y={226 - s.h + 38} textAnchor="middle" fontSize="34" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
              {s.place}.
            </text>
          )}
          {drawRacer(order[i], s.x, 226 - s.h - 34, order[i] === 'potyi' ? 70 : 60)}
        </g>
      ))}
    </svg>
  );
};

/** Indulási sor: elöl (balra) a zászló. Az elemek a zászlótól kezdve állnak. `mark`: e fölé „?” kerül. `labels`: sorszámok alatta. */
export type QItem = { icon: XPicName | 'potyi'; color?: string };
export const StartQueue: React.FC<{ items: QItem[]; mark?: number; labels?: boolean }> = ({ items, mark, labels = false }) => {
  const step = 46;
  const x0 = 70;
  const w = x0 + items.length * step + 10;
  return (
    <svg viewBox={`0 0 ${w} 130`} className="w-full max-w-[470px] h-auto mx-auto">
      <rect x="0" y="0" width={w} height="130" rx="16" fill="#dbeafe" />
      <rect x="0" y="80" width={w} height="50" fill="#fff" />
      <rect x="22" y="22" width="5" height="68" fill="#475569" />
      <path d="M27 22 L56 32 L27 42 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
      {items.map((it, i) => {
        const x = x0 + i * step + step / 2 - 10;
        return (
          <g key={i}>
            {it.icon === 'potyi' ? <Potyi mood="happy" dots={7} x={x - 21} y={44} size={42} /> : XPIC(it.icon)({ x, y: 66, s: it.icon === 'szanko' ? 1.05 : 0.95, color: it.color })}
            {mark === i && (
              <text x={x} y="34" textAnchor="middle" fontSize="28" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
            )}
            {labels && (
              <text x={x} y="118" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
                {i + 1}.
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Tárgysor balról jobbra (zöld nyíl jelzi, honnan számolunk). `mode="count"`: az első k színes; `mode="place"`: csak a k-adik színes. */
export const OrdinalStrip: React.FC<{ n?: number; k: number; mode: 'count' | 'place'; icon?: XPicName; color?: string; className?: string }> = ({
  n = 9,
  k,
  mode,
  icon = 'disz',
  color = '#ef4444',
  className = 'w-full max-w-[440px] h-auto mx-auto',
}) => {
  const w = 40 + n * 40 + 8;
  return (
    <svg viewBox={`0 0 ${w} 64`} className={className}>
      <rect x="2" y="2" width={w - 4} height="60" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      <path d="M10 32 H30 M22 24 L30 32 L22 40" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: n }, (_, i) => {
        const on = mode === 'count' ? i < k : i === k - 1;
        return XPIC(icon)({ x: 56 + i * 40, y: 34, s: 0.78, color: on ? color : '#ffffff', key: i });
      })}
    </svg>
  );
};

/** Ajándékzsákok füzéren, mindegyiken sorszám-címke, a zsákon a tartalma. */
export const GarlandScene: React.FC<{ items: XPicName[] }> = ({ items }) => {
  const n = items.length;
  const X = (i: number) => 32 + i * (416 / Math.max(1, n - 1));
  const Y = (i: number) => 50 + Math.sin((i / Math.max(1, n - 1)) * Math.PI) * 35;
  return (
    <svg viewBox="0 0 480 200">
      <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
      <path d={`M0 40 Q240 120 480 40`} fill="none" stroke="#78350f" strokeWidth="3" />
      {items.map((it, i) => (
        <g key={i}>
          <path d={`M${X(i) - 20} ${Y(i) + 22} Q${X(i) - 26} ${Y(i) + 82} ${X(i)} ${Y(i) + 84} Q${X(i) + 26} ${Y(i) + 82} ${X(i) + 20} ${Y(i) + 22} Z`} fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
          <path d={`M${X(i) - 14} ${Y(i) + 22} L${X(i)} ${Y(i) + 14} L${X(i) + 14} ${Y(i) + 22}`} fill="none" stroke="#dc2626" strokeWidth="3" />
          <circle cx={X(i)} cy={Y(i)} r="15" fill="#fff" stroke="#1e3a8a" strokeWidth="2.5" />
          <text x={X(i)} y={Y(i) + 6} textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e3a8a" fontFamily="system-ui, sans-serif">
            {i + 1}.
          </text>
          {XPIC(it)({ x: X(i), y: Y(i) + 56, s: 0.7 })}
        </g>
      ))}
    </svg>
  );
};

/** Toronyház: a szinteket alulról számoljuk (1. = legalsó). `residents[0]` lakik legalul. */
export type Resident = XPicName | 'potyi';
export const TowerScene: React.FC<{ residents: Resident[]; labels?: boolean }> = ({ residents, labels = true }) => {
  const n = residents.length;
  const fh = 38;
  const base = 236;
  return (
    <svg viewBox="0 0 480 240">
      {snow(480, 240)}
      <path d={`M180 ${base - n * fh} L240 ${base - n * fh - 34} L300 ${base - n * fh} Z`} fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
      {residents.map((r, i) => {
        const y = base - (i + 1) * fh;
        return (
          <g key={i}>
            <rect x="180" y={y} width="120" height={fh} fill="#fde68a" stroke="#92400e" strokeWidth="3" />
            <rect x="218" y={y + 4} width="44" height={fh - 8} rx="6" fill="#e0f2fe" stroke="#92400e" strokeWidth="2.5" />
            {r === 'potyi' ? <Potyi mood="happy" dots={7} x={226} y={y + 4} size={30} /> : XPIC(r)({ x: 240, y: y + fh / 2, s: 0.62 })}
            {labels && (
              <text x="160" y={y + 28} textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
                {i + 1}.
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Pálcikahalom: a `colors` sorrendjében rajzolunk, tehát az utolsó van legfelül. */
export const StickPile: React.FC<{ colors: string[] }> = ({ colors }) => {
  const lines: [number, number, number, number][] = [
    [90, 50, 390, 190],
    [110, 200, 380, 40],
    [70, 110, 420, 140],
    [240, 20, 250, 220],
  ];
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#f8fafc" />
      {colors.map((c, i) => {
        const [x1, y1, x2, y2] = lines[i % lines.length];
        return (
          <g key={i}>
            <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#111827" strokeWidth="22" strokeLinecap="round" />
            <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={c} strokeWidth="15" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
};

/** Egyetlen pálcika vagy szánkó képe (válaszlehetőség). */
export const StickPic: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 100 50" className="w-24 h-auto">
    <path d="M12 25 H88" stroke="#111827" strokeWidth="16" strokeLinecap="round" />
    <path d="M12 25 H88" stroke={color} strokeWidth="10" strokeLinecap="round" />
  </svg>
);
export const SledPic: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 80 50" className="w-20 h-auto">
    {XMAS.szanko({ x: 40, y: 24, s: 1.5, color })}
  </svg>
);

// ---------- közös adatok (mese, játék) ----------
export const ORD_WORDS = ['első', 'második', 'harmadik', 'negyedik', 'ötödik', 'hatodik', 'hetedik', 'nyolcadik', 'kilencedik'];
/** Sorszám-válasz: felirat „4.”, felolvasva „negyedik”. */
export const ord = (k: number) => ({ label: `${k}.`, say: ORD_WORDS[k - 1] });
/** A 9 szánkó színe (a COLORS indexei): 1. kék, 2. zöld, 3. sárga, 4. piros, 5. lila, 6. narancssárga, 7. rózsaszín, 8. barna, 9. türkiz. */
export const SLEDS9 = [1, 4, 2, 0, 3, 5, 6, 8, 7];
/** A füzér zsákjai: 1. toboz, 2. csillag-süti, 3. dísz, 4. bögre, 5. szív-süti, 6. csengő, 7. sál, 8. boríték, 9. ajándék. */
export const GARLAND: XPicName[] = ['toboz', 'suti', 'disz', 'bogre', 'sutiSziv', 'csengo', 'sal', 'boritek', 'ajandek'];
/** A toronyház lakói alulról: 1. Csigusz, 2. Zümi, 3. Pötyi, 4. madár, 5. pillangó. */
export const TOWER: Resident[] = ['csiga', 'meh', 'potyi', 'madar', 'pillango'];
/** Sor a forró teához: 1. Zümi, 2. madár, 3. Pötyi, 4. pillangó, 5. Csigusz. */
export const ANIMAL_QUEUE: QItem[] = [{ icon: 'meh' }, { icon: 'madar' }, { icon: 'potyi' }, { icon: 'pillango' }, { icon: 'csiga' }];
