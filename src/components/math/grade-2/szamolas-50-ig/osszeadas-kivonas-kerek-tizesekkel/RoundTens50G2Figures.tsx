import React from 'react';
import {
  RT_FONT,
  RT_INK,
  RT_SUB,
  RT_UNK,
  ROD_BLUE,
  CUBE_GREEN,
  RodsPart,
  NumLine50Part,
  CoinPart
} from './RoundTens50G2Parts';

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
    fontFamily={RT_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    {children}
  </svg>
);

/** 1. A kerek tízesek: 10, 20, 30, 40, 50 tízesrudakkal. */
export const RoundTensStairsSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} label="A kerek tízesek tízesrudakkal">
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={RT_INK}>
      A kerek tízesek
    </text>
    {[1, 2, 3, 4, 5].map((t, i) => {
      const c = 14 + i * 68 + 33;
      return (
        <g key={t}>
          <RodsPart x={c - (15 * t - 5) / 2} y={34} cell={6} groups={[{ count: t }]} />
          <text x={c} y={120} textAnchor="middle" fontSize="20" fontWeight="900" fill="#92400e">
            {t * 10}
          </text>
          <text x={c} y={137} textAnchor="middle" fontSize="11" fontWeight="bold" fill={RT_SUB}>
            {t} tízes
          </text>
        </g>
      );
    })}
  </Frame>
);

/** 2. Kistesó – nagytesó: 3 + 2 = 5 és 30 + 20 = 50. */
export const SmallBigAnalogySvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={170} label="3 + 2 = 5 és 30 + 20 = 50">
    {/* felső sor: kockák */}
    {Array.from({ length: 3 }, (_, i) => (
      <rect key={`a${i}`} x={24 + i * 16} y={22} width="12" height="12" rx="2" fill={CUBE_GREEN.fill} stroke={CUBE_GREEN.stroke} strokeWidth="1.5" />
    ))}
    <text x="86" y="33" fontSize="14" fontWeight="bold" fill={RT_INK}>+</text>
    {Array.from({ length: 2 }, (_, i) => (
      <rect key={`b${i}`} x={102 + i * 16} y={22} width="12" height="12" rx="2" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
    ))}
    <text x="160" y="34" fontSize="16" fontWeight="900" fill={RT_INK}>3 + 2 = 5</text>
    <text x="250" y="34" fontSize="11" fontWeight="bold" fill={RT_SUB}>kistesó</text>
    <line x1="14" y1="48" x2="346" y2="48" stroke="#fde68a" strokeWidth="2" />
    {/* alsó sor: rudak */}
    <RodsPart x={24} y={58} cell={7} groups={[{ count: 3 }, { count: 2, ...ROD_BLUE }]} groupGap={18} />
    <text x="160" y="104" fontSize="16" fontWeight="900" fill={RT_INK}>30 + 20 = 50</text>
    <text x="160" y="124" fontSize="11" fontWeight="bold" fill={RT_SUB}>3 tízes + 2 tízes = 5 tízes</text>
    <text x="290" y="104" fontSize="11" fontWeight="bold" fill={RT_SUB}>nagytesó</text>
    <text x="180" y="158" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#92400e">
      Számolj tízesekkel, a végére írd oda a 0-t!
    </text>
  </Frame>
);

/** 3. Elvétel tízesrudakkal: 50 − 20 = 30. */
export const TakeAwayRodsSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} label="50 − 20 = 30 áthúzott tízesrudakkal">
    <RodsPart x={30} y={22} cell={8} groups={[{ count: 5 }]} crossed={2} />
    <text x="150" y="58" fontSize="20" fontWeight="900" fill={RT_INK}>50 − 20 = 30</text>
    <text x="150" y="82" fontSize="12" fontWeight="bold" fill={RT_SUB}>5 tízes − 2 tízes = 3 tízes</text>
    <text x="150" y="104" fontSize="11" fill={RT_UNK} fontWeight="bold">2 rudat áthúztunk.</text>
    <text x="150" y="122" fontSize="11" fill="#166534" fontWeight="bold">3 rúd maradt.</text>
  </Frame>
);

/** 4. Kétjegyű szám + kerek tízes: csak a tízesek változnak (24 + 20 = 44). */
export const OnlyTensChangeSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={170} label="24 + 20 = 44: csak a tízesek változnak">
    <RodsPart x={20} y={20} cell={7} groups={[{ count: 2 }, { count: 2, ...ROD_BLUE }]} ones={4} groupGap={14} />
    {/* T E táblázat */}
    {[
      { y: 30, t: '2', e: '4', label: '24' },
      { y: 66, t: '+2', e: '0', label: '+ 20' },
      { y: 102, t: '4', e: '4', label: '44' }
    ].map((r, i) => (
      <g key={i}>
        <rect x="170" y={r.y} width="44" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <rect x="214" y={r.y} width="44" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="192" y={r.y + 21} textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e">{r.t}</text>
        <text x="236" y={r.y + 21} textAnchor="middle" fontSize="16" fontWeight="900" fill="#166534">{r.e}</text>
        <text x="272" y={r.y + 21} fontSize="15" fontWeight="900" fill={RT_INK}>{r.label}</text>
      </g>
    ))}
    <text x="192" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">T</text>
    <text x="236" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">E</text>
    <line x1="170" y1="99" x2="258" y2="99" stroke={RT_INK} strokeWidth="2" />
    <text x="180" y="156" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
      A tízesek nőnek, az egyesek (4) ugyanazok maradnak!
    </text>
  </Frame>
);

/** 5. Tízes ugrások a számegyenesen: 13 + 30 = 43 és 47 − 20 = 27. */
export const TensJumpsLineSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={232} label="Tízes ugrások a számegyenesen">
    <NumLine50Part
      x0={20}
      x1={330}
      y={70}
      jumps={[
        { from: 13, to: 23, label: '+10' },
        { from: 23, to: 33, label: '+10' },
        { from: 33, to: 43, label: '+10' }
      ]}
      marks={[{ v: 13, color: '#2563eb' }, { v: 43, color: '#166534' }]}
    />
    <text x="180" y="108" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">13 + 30 = 43 (3 ugrás előre)</text>
    <NumLine50Part
      x0={20}
      x1={330}
      y={182}
      jumps={[
        { from: 47, to: 37, label: '−10' },
        { from: 37, to: 27, label: '−10' }
      ]}
      marks={[{ v: 47, color: '#dc2626' }, { v: 27, color: '#166534' }]}
    />
    <text x="180" y="220" textAnchor="middle" fontSize="15" fontWeight="900" fill="#b91c1c">47 − 20 = 27 (2 ugrás vissza)</text>
  </Frame>
);

/** 6. 40 Ft kifizetése többféleképpen 10 és 20 Ft-osokkal. */
export const PayFortySvg: React.FC<FigProps> = ({ className }) => {
  const rows: number[][] = [
    [10, 10, 10, 10],
    [20, 10, 10],
    [20, 20]
  ];
  return (
    <Frame className={className} h={190} label="40 Ft kifizetése háromféleképpen">
      {/* alma árcédulával */}
      <circle cx="46" cy="70" r="24" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      <path d="M46 46 q4 -10 12 -12" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="38" cy="62" rx="6" ry="4" fill="#fca5a5" />
      <rect x="18" y="104" width="56" height="26" rx="6" fill="#fff" stroke={RT_INK} strokeWidth="2" />
      <text x="46" y="122" textAnchor="middle" fontSize="15" fontWeight="900" fill={RT_INK}>40 Ft</text>
      {rows.map((r, i) => (
        <g key={i}>
          {r.map((c, k) => (
            <CoinPart key={k} cx={120 + k * 42} cy={36 + i * 54} value={c} r={17} />
          ))}
          <text x="350" y={41 + i * 54} textAnchor="end" fontSize="15" fontWeight="900" fill="#166534">
            = 40 Ft
          </text>
        </g>
      ))}
    </Frame>
  );
};
