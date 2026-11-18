import React from 'react';
import { WP_FONT, WP_INK, WP_SUB, WP_UNK, BarModelPart, CompareBarsPart } from './WordProblems50G2Parts';

type FigProps = { className?: string };

const Frame: React.FC<{ className?: string; w?: number; h: number; label: string; children?: React.ReactNode }> = ({
  className,
  w = 360,
  h,
  label,
  children
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className={className ?? 'w-full max-w-[480px] h-auto mx-auto'}
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={WP_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
    {children}
  </svg>
);

/** 1. A megoldás 4 lépése: Mit tudunk? Mit kérdeznek? Számolás. Válasz. */
export const WordStepsSvg: React.FC<FigProps> = ({ className }) => {
  const steps = [
    { t: 'Mit tudunk?', s: 'a számok', c: '#2563eb', bg: '#dbeafe' },
    { t: 'Mit kérdez?', s: 'a kérdés', c: '#7c3aed', bg: '#ede9fe' },
    { t: 'Számolok', s: '+ vagy −', c: '#d97706', bg: '#fef3c7' },
    { t: 'Válaszolok', s: 'mondatban', c: '#16a34a', bg: '#dcfce7' }
  ];
  return (
    <Frame className={className} h={120} label="A szöveges feladat megoldásának 4 lépése">
      {steps.map((st, i) => {
        const x = 14 + i * 86;
        return (
          <g key={i}>
            <rect x={x} y={20} width="76" height="80" rx="12" fill={st.bg} stroke={st.c} strokeWidth="2" />
            <circle cx={x + 38} cy={40} r="13" fill={st.c} />
            <text x={x + 38} y={45} textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">
              {i + 1}
            </text>
            <text x={x + 38} y={72} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={WP_INK}>
              {st.t}
            </text>
            <text x={x + 38} y={89} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={st.c}>
              {st.s}
            </text>
            {i < 3 && (
              <path d={`M ${x + 78} 60 L ${x + 84} 60 M ${x + 81} 56 L ${x + 85} 60 L ${x + 81} 64`} fill="none" stroke={WP_SUB} strokeWidth="2" />
            )}
          </g>
        );
      })}
    </Frame>
  );
};

/** 2. Hozzáadás szalagmodellel: 27 + 8 = ? */
export const JoinBarSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={140} label="Szalagmodell: 27 és 8 együtt">
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WP_SUB}>
      27 dió van a tálban. Teszünk mellé még 8-at.
    </text>
    <BarModelPart x={40} y={40} w={280} h={34} parts={[{ v: 27, size: 27, color: 'blue' }, { v: 8, size: 8, color: 'green' }]} total="?" fs={17} />
    <text x="180" y="130" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1d4ed8">
      27 + 8 = 27 + 3 + 5 = 35
    </text>
  </Frame>
);

/** 3. Elvétel és hiányzó rész szalagmodellel. */
export const TakeBarSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={190} label="Szalagmodell: az egész és a hiányzó rész">
    <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WP_SUB}>
      42 lufi volt. 6 kipukkadt. Hány maradt?
    </text>
    <BarModelPart x={40} y={32} w={280} h={30} parts={[{ v: '?', size: 36 }, { v: 6, size: 6, color: 'rose' }]} total={42} fs={16} />
    <text x="180" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WP_SUB}>
      Az egész 42. Az egyik rész 6. A másik rész?
    </text>
    <text x="180" y="146" textAnchor="middle" fontSize="15" fontWeight="900" fill="#be123c">
      42 − 6 = 42 − 2 − 4 = 36
    </text>
    <text x="180" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
      Ellenőrzés: 36 + 6 = 42
    </text>
  </Frame>
);

/** 4. Összehasonlítás: mennyivel több? */
export const CompareDiffSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={130} label="Összehasonlítás: 31 és 24 különbsége">
    <CompareBarsPart
      x={20}
      y={24}
      w={320}
      labelW={64}
      rowH={30}
      gap={18}
      rows={[
        { label: 'Máté', size: 31, text: 31, color: 'blue' },
        { label: 'Réka', size: 24, text: 24, color: 'amber' }
      ]}
      diff="?"
    />
    <text x="180" y="120" textAnchor="middle" fontSize="14" fontWeight="900" fill={WP_UNK}>
      Mennyivel több? 31 − 24 = 7
    </text>
  </Frame>
);

/** 5. Csavaros szöveg: „ez 9-cel több, mint…” – mégis kivonunk. */
export const TrickyCompareSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={168} label="Csavaros szöveg: a több szó kivonást jelent">
    <text x="180" y="22" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={WP_SUB}>
      A kertben 34 tulipán van. Ez 9-cel több,
    </text>
    <text x="180" y="38" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={WP_SUB}>
      mint a nárciszok száma. Hány nárcisz van?
    </text>
    <CompareBarsPart
      x={20}
      y={52}
      w={320}
      labelW={72}
      rowH={28}
      gap={16}
      rows={[
        { label: 'tulipán', size: 34, text: 34, color: 'rose' },
        { label: 'nárcisz', size: 25, text: '?', color: 'amber' }
      ]}
      diff="9"
    />
    <text x="180" y="150" textAnchor="middle" fontSize="14" fontWeight="900" fill="#be123c">
      A nárcisz kevesebb: 34 − 9 = 25
    </text>
  </Frame>
);

/** 6. Két lépés: 50 − 23 − 18. */
export const TwoStepBarSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={176} label="Két lépés: 50-ből elvesszük a 23-at és a 18-at">
    <text x="180" y="22" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={WP_SUB}>
      50 sütiből délelőtt 23, délután 18 fogyott el.
    </text>
    <BarModelPart
      x={30}
      y={34}
      w={300}
      h={30}
      parts={[
        { v: 23, size: 23, color: 'blue' },
        { v: 18, size: 18, color: 'violet' },
        { v: '?', size: 9 }
      ]}
      total={50}
      fs={15}
    />
    <text x="180" y="138" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#1d4ed8">
      1. lépés: 50 − 23 = 27
    </text>
    <text x="180" y="160" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#6d28d9">
      2. lépés: 27 − 18 = 9 süti maradt
    </text>
  </Frame>
);
