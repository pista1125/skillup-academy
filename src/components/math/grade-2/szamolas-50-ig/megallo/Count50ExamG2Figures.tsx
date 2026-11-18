import React from 'react';
import { EX_FONT, EX_INK, EX_SUB, EX_UNK, NumberTablePart, PyramidPart } from './Count50ExamG2Parts';
import { RodsPart, NumLine50Part } from '../osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Parts';

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
    fontFamily={EX_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#ecfeff" stroke="#67e8f9" strokeWidth="1.5" />
    {children}
  </svg>
);

/** 1. Az 5 lecke térképe egy-egy példával. */
export const Count50MapSvg: React.FC<FigProps> = ({ className }) => {
  const boxes = [
    { t: '1. Számok 50-ig', ex: '37 = 3 T + 7 E', c: '#2563eb', bg: '#dbeafe' },
    { t: '2. Összeadás', ex: '38 + 7 = 45', c: '#16a34a', bg: '#dcfce7' },
    { t: '3. Kivonás', ex: '43 − 6 = 37', c: '#7c3aed', bg: '#ede9fe' },
    { t: '4. Kerek tízesek', ex: '24 + 20 = 44', c: '#d97706', bg: '#fef3c7' },
    { t: '5. Szöveges', ex: 'kap → +, marad → −', c: '#e11d48', bg: '#ffe4e6' }
  ];
  return (
    <Frame className={className} h={176} label="A II. témakör leckéi egy-egy példával">
      {boxes.map((b, i) => {
        const col = i < 3 ? i : i - 3;
        const x = i < 3 ? 12 + col * 114 : 69 + col * 114;
        const y = i < 3 ? 14 : 94;
        return (
          <g key={i}>
            <rect x={x} y={y} width="108" height="68" rx="12" fill={b.bg} stroke={b.c} strokeWidth="2" />
            <text x={x + 54} y={y + 26} textAnchor="middle" fontSize="12" fontWeight="900" fill={b.c}>
              {b.t}
            </text>
            <text x={x + 54} y={y + 50} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={EX_INK}>
              {b.ex}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

/** 2. Helyiérték: 37 = 3 tízesrúd + 7 egyeskocka. */
export const Count50PlaceValueSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={130} label="37 = 3 tízes és 7 egyes">
    <RodsPart x={24} y={18} cell={8} groups={[{ count: 3 }]} ones={7} />
    <rect x="190" y="30" width="54" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
    <rect x="244" y="30" width="54" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.6" />
    <text x="217" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">T</text>
    <text x="271" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">E</text>
    <rect x="190" y="60" width="54" height="34" fill="#fff" stroke="#d97706" strokeWidth="1.6" />
    <rect x="244" y="60" width="54" height="34" fill="#fff" stroke="#16a34a" strokeWidth="1.6" />
    <text x="217" y="85" textAnchor="middle" fontSize="22" fontWeight="900" fill="#92400e">3</text>
    <text x="271" y="85" textAnchor="middle" fontSize="22" fontWeight="900" fill="#166534">7</text>
    <text x="244" y="118" textAnchor="middle" fontSize="13" fontWeight="900" fill={EX_INK}>
      37 = 30 + 7 (harminchét)
    </text>
  </Frame>
);

/** 3. Számszomszédok: egyes és tízes szomszédok a számegyenesen. */
export const Count50NeighborsSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} label="A 27 egyes és tízes szomszédai">
    <NumLine50Part x0={20} x1={330} y={78} from={20} to={30} labelEvery={1} marks={[{ v: 27, color: EX_UNK }]} />
    <text x="20" y="22" fontSize="13" fontWeight="900" fill={EX_INK}>
      A 27 szomszédai:
    </text>
    <rect x="160" y="34" width="20" height="18" rx="4" fill="#dbeafe" stroke="#2563eb" />
    <text x="190" y="47" fontSize="12" fontWeight="bold" fill="#1d4ed8">
      egyes szomszédok: 26 és 28
    </text>
    <rect x="20" y="118" width="20" height="18" rx="4" fill="#fef3c7" stroke="#d97706" />
    <text x="50" y="131" fontSize="12" fontWeight="bold" fill="#92400e">
      tízes szomszédok: 20 és 30 (a két kerek tízes)
    </text>
    {[26, 28].map((v) => (
      <circle key={v} cx={20 + (v - 20) * 31} cy={93} r="10" fill="none" stroke="#2563eb" strokeWidth="2.5" />
    ))}
    {[20, 30].map((v) => (
      <rect key={v} x={20 + (v - 20) * 31 - 11} y={83} width="22" height="20" rx="4" fill="none" stroke="#d97706" strokeWidth="2.5" />
    ))}
  </Frame>
);

/** 4. Tízesátlépés oda-vissza: 38 + 7 és 43 − 6 a számegyenesen. */
export const Count50BridgeSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={200} label="38 + 7 = 45 és 43 − 6 = 37 a számegyenesen">
    <NumLine50Part
      x0={20}
      x1={330}
      y={62}
      from={30}
      to={50}
      labelEvery={5}
      jumps={[
        { from: 38, to: 40, label: '+2' },
        { from: 40, to: 45, label: '+5' }
      ]}
      marks={[{ v: 38, color: '#2563eb' }, { v: 45, color: '#16a34a' }]}
    />
    <text x="180" y="100" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1d4ed8">
      38 + 7 = 38 + 2 + 5 = 45
    </text>
    <NumLine50Part
      x0={20}
      x1={330}
      y={152}
      from={30}
      to={50}
      labelEvery={5}
      jumps={[
        { from: 43, to: 40, label: '−3' },
        { from: 40, to: 37, label: '−3' }
      ]}
      marks={[{ v: 43, color: '#dc2626' }, { v: 37, color: '#16a34a' }]}
    />
    <text x="180" y="190" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b91c1c">
      43 − 6 = 43 − 3 − 3 = 37
    </text>
  </Frame>
);

/** 5. Páros és páratlan számok a 21–50-es számtáblán. */
export const Count50EvenOddSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={128} label="Páros számok kékkel a számtáblán">
    <NumberTablePart x={25} y={14} cell={31} evenColor />
    <text x="180" y="120" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={EX_SUB}>
      Kék: páros (0, 2, 4, 6, 8 a vége). Fehér: páratlan.
    </text>
  </Frame>
);

/** 6. Számpiramis és két rudas összeadás. */
export const Count50PyramidSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} label="Számpiramis: 9, 14, 8 alulról">
    <PyramidPart rows={[[45], [23, 22], [9, 14, 8]]} cx={110} y={20} bw={56} bh={34} />
    <text x="290" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill={EX_SUB}>
      9 + 14 = 23
    </text>
    <text x="290" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill={EX_SUB}>
      14 + 8 = 22
    </text>
    <text x="290" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill={EX_SUB}>
      23 + 22 = 45
    </text>
  </Frame>
);
