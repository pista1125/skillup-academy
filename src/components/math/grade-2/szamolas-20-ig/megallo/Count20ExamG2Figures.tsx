import React from 'react';
import {
  FONT,
  INK,
  SUB,
  NumLine20,
  TwentyFrame,
  PyramidFig,
  RadialWheelFig,
  CompareBarsFig,
} from './Count20ExamG2Parts';

type FigProps = { className?: string };

const Frame: React.FC<{ className?: string; h: number; w?: number; title: string; children?: React.ReactNode }> = ({
  className,
  h,
  w = 300,
  title,
  children,
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className={className ?? 'w-full h-auto'}
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={FONT}
    role="img"
    aria-label={title}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    {children}
  </svg>
);

/** 1. Számcsoportok térképe 0-tól 20-ig (egyjegyű/kétjegyű × páros/páratlan). */
export const Count20ClassificationMapSvg: React.FC<FigProps> = ({ className }) => {
  const boxes = [
    { x: 14, y: 32, title: 'Egyjegyű páros', ex: '0, 2, 4, 6, 8', eq: '14 − 6 = 8', bg: '#dcfce7', bd: '#16a34a', tc: '#166534' },
    { x: 154, y: 32, title: 'Egyjegyű páratlan', ex: '1, 3, 5, 7, 9', eq: '12 − 5 = 7', bg: '#fee2e2', bd: '#dc2626', tc: '#991b1b' },
    { x: 14, y: 102, title: 'Kétjegyű páros', ex: '10, 12, 14, 16, 18, 20', eq: '8 + 8 = 16', bg: '#e0f2fe', bd: '#0284c7', tc: '#075985' },
    { x: 154, y: 102, title: 'Kétjegyű páratlan', ex: '11, 13, 15, 17, 19', eq: '9 + 8 = 17', bg: '#fef3c7', bd: '#d97706', tc: '#92400e' },
  ];
  return (
    <Frame className={className} h={176} title="Négyféle számcsoport 0-tól 20-ig">
      <text x="150" y="21" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={INK}>
        Négy számcsoport 0-tól 20-ig
      </text>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="132" height="60" rx="9" fill={b.bg} stroke={b.bd} strokeWidth="1.5" />
          <text x={b.x + 66} y={b.y + 16} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={b.tc}>
            {b.title}
          </text>
          <text x={b.x + 66} y={b.y + 34} textAnchor="middle" fontSize="9.5" fill={INK}>
            {b.ex}
          </text>
          <text x={b.x + 66} y={b.y + 50} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={b.tc}>
            Pl.: {b.eq}
          </text>
        </g>
      ))}
    </Frame>
  );
};

/** 2. Tízesátlépés 20-as kerettel és kétlépéses számegyenessel (8 + 5 = 13). */
export const Count20BridgingFrameSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={184} title="Tízesátlépés 20-as kereten és számegyenesen">
    <text x="150" y="20" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={INK}>
      Tízesátlépés: 8 + 5 = 8 + 2 + 3 = 13
    </text>
    <g transform="translate(34, 14)">
      <TwentyFrame x={0} y={14} a={8} b={5} cell={20} />
    </g>
    <g transform="translate(30, 62)">
      <NumLine20
        x={12}
        y={56}
        w={216}
        from={0}
        to={20}
        labelEvery={5}
        arcs={[
          { from: 8, to: 10, label: '+ 2', color: '#0284c7' },
          { from: 10, to: 13, label: '+ 3', color: '#16a34a' },
        ]}
        marks={[
          { v: 8, label: '8' },
          { v: 13, label: '13' },
        ]}
      />
    </g>
    <text x="150" y="172" textAnchor="middle" fontSize="10.5" fill={SUB}>
      Előbb pótold 10-re (8 + 2 = 10), aztán add hozzá a többi 3-at!
    </text>
  </Frame>
);

/** 3. Négyemeletes számpiramis 0–20 között (1, 2, 3, 4 -> 20). */
export const Count20PyramidSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} title="Négyemeletes számpiramis">
    <PyramidFig
      cx={94}
      y={16}
      bw={36}
      bh={22}
      rows={[
        [20],
        [8, 12],
        [3, 5, 7],
        [1, 2, 3, 4],
      ]}
    />
    <text x="230" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
      Szabály:
    </text>
    <text x="230" y="50" textAnchor="middle" fontSize="10" fill={SUB}>
      Felfelé összeadsz:
    </text>
    <text x="230" y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b45309">
      1 + 2 = 3, 2 + 3 = 5
    </text>
    <text x="230" y="88" textAnchor="middle" fontSize="10" fill={SUB}>
      Lefelé kivonsz:
    </text>
    <text x="230" y="104" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0369a1">
      20 − 8 = 12
    </text>
    <text x="150" y="136" textAnchor="middle" fontSize="10.5" fill={SUB}>
      Minden felső tégla az alatta lévő két tégla összege.
    </text>
  </Frame>
);

/** 4. Számpárkerék a 12 bontásához (rendezetlen párokkal: 7 különböző pár). */
export const Count20RadialWheelSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={160} title="Számpárkerék a 12-höz">
    <text x="150" y="19" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
      Egy vonal két vége együtt 12
    </text>
    <RadialWheelFig
      cx={92}
      cy={86}
      R={47}
      center={12}
      pairs={[
        [0, 12],
        [1, 11],
        [2, 10],
        [3, 9],
        [4, 8],
        [5, 7],
        [6, 6],
      ]}
    />
    <text x="224" y="48" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
      7 különböző pár:
    </text>
    <text x="224" y="66" textAnchor="middle" fontSize="9.8" fill={INK}>
      0+12, 1+11, 2+10,
    </text>
    <text x="224" y="81" textAnchor="middle" fontSize="9.8" fill={INK}>
      3+9, 4+8, 5+7, 6+6
    </text>
    <rect x="164" y="96" width="122" height="38" rx="7" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.2" />
    <text x="225" y="112" textAnchor="middle" fontSize="9.2" fontWeight="bold" fill="#991b1b">
      A sorrend nem számít!
    </text>
    <text x="225" y="126" textAnchor="middle" fontSize="9.2" fill="#7f1d1d">
      (5 és 7 = 7 és 5)
    </text>
  </Frame>
);

/** 5. Kitekintő társasjáték-ösvény 1-től 20-ig (9 + 5 = 14). */
export const Count20GamePathSvg: React.FC<FigProps> = ({ className }) => {
  const top = ['S', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const bot = ['C', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11'];
  const tileColor = (v: string) => {
    if (v === 'S' || v === 'C') return '#fed7aa';
    if (v === '9') return '#bae6fd';
    if (v === '14') return '#bbf7d0';
    return '#ffffff';
  };
  return (
    <Frame className={className} h={142} title="Társasjáték-ösvény 1-től 20-ig">
      <text x="150" y="20" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={INK}>
        Társasjáték 1-től 20-ig: a 9-esről +5 lépés
      </text>
      {top.map((v, i) => {
        const x = 14 + i * 25;
        return (
          <g key={`t${i}`}>
            <rect x={x} y={32} width="22" height="24" rx="4" fill={tileColor(v)} stroke={v === '9' ? '#0284c7' : '#64748b'} strokeWidth={v === '9' ? 2 : 1.2} />
            <text x={x + 11} y={48} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={INK}>
              {v === 'S' ? 'ST' : v}
            </text>
          </g>
        );
      })}
      {bot.map((v, i) => {
        const x = 14 + i * 25;
        return (
          <g key={`b${i}`}>
            <rect x={x} y={76} width="22" height="24" rx="4" fill={tileColor(v)} stroke={v === '14' ? '#16a34a' : '#64748b'} strokeWidth={v === '14' ? 2 : 1.2} />
            <text x={x + 11} y={92} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={INK}>
              {v === 'C' ? 'CÉL' : v}
            </text>
          </g>
        );
      })}
      <path d="M 275 44 Q 290 66 275 88" fill="none" stroke="#64748b" strokeWidth="1.8" />
      <path d="M 250 32 Q 268 18 276 74" fill="none" stroke="none" />
      <path d="M 250 56 C 250 68, 200 66, 200 74" fill="none" stroke="#16a34a" strokeWidth="2.2" />
      <circle cx="200" cy="75" r="3" fill="#16a34a" />
      <text x="150" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        9 + 5 = 14 • A 14-es mezőre lépsz!
      </text>
    </Frame>
  );
};

/** 6. Fordított összehasonlítás szalagmodellel (szöveges feladat). */
export const Count20StripRecapSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={146} title="Szalagmodell összehasonlító szöveges feladathoz">
    <text x="150" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
      Lili 13 kagylót szedett, 5-tel többet, mint Marci.
    </text>
    <g transform="translate(30, 26)">
      <CompareBarsFig
        topLabel="Lili"
        topVal={13}
        topText="13"
        botLabel="Marci"
        botVal={8}
        botText="? (8)"
        diffText="Lili 5-tel több"
        y={8}
      />
    </g>
    <text x="150" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
      Marci kevesebbet szedett: 13 − 5 = 8 kagyló!
    </text>
  </Frame>
);
