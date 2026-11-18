// „Megálló” (0–6) – a mese és a játék saját képei (a többi az A hat, a Számolás 0-tól 6-ig és a Páros-páratlan leckéből jön).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { Box6, sky } from '../a-hat/AHatG1Scenes';

const FONT = 'system-ui, sans-serif';

/** 1. oldal: a barátok megállnak pihenni egy pad mellett, a „MEGÁLLÓ” táblánál. */
export const RestStopScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <rect x="384" y="70" width="10" height="150" fill="#475569" />
    <circle cx="389" cy="62" r="34" fill="#facc15" stroke="#a16207" strokeWidth="5" />
    <text x="389" y="76" textAnchor="middle" fontSize="40" fontWeight="900" fill="#7c2d12" fontFamily={FONT}>
      6
    </text>
    <rect x="200" y="190" width="150" height="14" rx="5" fill="#92400e" />
    <rect x="212" y="204" width="10" height="26" fill="#92400e" />
    <rect x="328" y="204" width="10" height="26" fill="#92400e" />
    <Potyi mood="cheer" dots={6} x={20} y={70} size={160} />
    {ICONS.meh({ x: 250, y: 120, s: 1.8 })}
    {ICONS.csiga({ x: 310, y: 176, s: 1.6 })}
  </svg>
);

/** Dobozsor: a dobozokban egyre változik a tárgyak száma; az utolsó helyén „?”. */
export const ShrinkScene: React.FC<{ icon: IconName; counts: number[] }> = ({ icon, counts }) => {
  const slots = counts.length + 1;
  const w = slots * 112 + 8;
  return (
    <svg viewBox={`0 0 ${w} 110`} className="w-full max-w-[470px] h-auto mx-auto">
      {counts.map((c, i) => (
        <svg key={i} x={8 + i * 112} y="5" width="104" height="100" viewBox="0 0 120 100">
          <Box6 icon={icon} n={c} className="" />
        </svg>
      ))}
      <rect x={8 + counts.length * 112 + 6} y="10" width="92" height="90" rx="16" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 6" />
      <text x={8 + counts.length * 112 + 52} y="72" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>
        ?
      </text>
    </svg>
  );
};

/** Katica a művelettel: a kártyán a művelet, a katica hátán „?” – hány pötty kell rá? */
export const LadybugOpScene: React.FC<{ op: string }> = ({ op }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#ffe4e6" />
    <rect x="30" y="60" width="200" height="100" rx="18" fill="#fff" stroke="#7c3aed" strokeWidth="5" />
    <text x="130" y="128" textAnchor="middle" fontSize="54" fontWeight="900" fill="#1e293b" fontFamily={FONT}>
      {op}
    </text>
    <Potyi mood="think" number="?" x={260} y={10} size={200} />
  </svg>
);

/** Szétszórt, színes számok (a „jegyezd meg a számokat” oldalhoz). */
export const NumberCloudScene: React.FC<{ nums: number[] }> = ({ nums }) => {
  const spots: [number, number, number][] = [
    [70, 110, -8],
    [160, 170, 6],
    [250, 90, -4],
    [330, 175, 8],
    [410, 105, -6],
    [240, 200, 3],
  ];
  const colors = ['#dc2626', '#16a34a', '#ca8a04', '#db2777', '#2563eb', '#7c3aed'];
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#fffbeb" />
      {nums.map((n, i) => {
        const [x, y, r] = spots[i % spots.length];
        return (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize="76" fontWeight="900" fill={colors[i % colors.length]} stroke="#111827" strokeWidth="2" fontFamily={FONT} transform={`rotate(${r} ${x} ${y})`}>
            {n}
          </text>
        );
      })}
    </svg>
  );
};

/** Igaz / hamis válaszképek. */
export const TrueIcon: React.FC = () => (
  <svg viewBox="0 0 80 80" className="w-14 h-14">
    <circle cx="40" cy="40" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="5" />
    <path d="M22 42 L35 55 L58 28" fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const FalseIcon: React.FC = () => (
  <svg viewBox="0 0 80 80" className="w-14 h-14">
    <circle cx="40" cy="40" r="34" fill="#fee2e2" stroke="#dc2626" strokeWidth="5" />
    <path d="M26 26 L54 54 M54 26 L26 54" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
  </svg>
);
export const IGAZ = { label: 'igaz', figure: <TrueIcon />, say: 'igaz' };
export const HAMIS = { label: 'hamis', figure: <FalseIcon />, say: 'hamis' };

/** Kis katica n pöttyel (válasz- és párosítókártyához). */
export const DotBug: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-16 h-16' }) => <Potyi dots={n} mood="happy" className={className} />;
