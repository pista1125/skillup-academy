import React from 'react';
import { FONT, Coin, JumpLine, Bar500 } from './AddSub500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 240 + 130 pénzzel: 2 százas 4 tízes + 1 százas 3 tízes = 3 százas 7 tízes. */
export const AddSub500CoinsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <rect x="10" y="12" width="166" height="76" rx="12" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
    <Coin cx={36} cy={50} v={100} r={20} />
    <Coin cx={80} cy={50} v={100} r={20} />
    <Coin cx={118} cy={34} v={10} r={13} />
    <Coin cx={150} cy={34} v={10} r={13} />
    <Coin cx={118} cy={66} v={10} r={13} />
    <Coin cx={150} cy={66} v={10} r={13} />
    <text x="190" y="58" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">+</text>
    <rect x="204" y="12" width="146" height="76" rx="12" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
    <Coin cx={232} cy={50} v={100} r={20} />
    <Coin cx={274} cy={50} v={10} r={13} />
    <Coin cx={304} cy={50} v={10} r={13} />
    <Coin cx={334} cy={50} v={10} r={13} />
    <text x="93" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">240 Ft = 2 százas 4 tízes</text>
    <text x="277" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">130 Ft = 1 százas 3 tízes</text>
    <text x="180" y="128" textAnchor="middle" fontSize="13" fill="#475569">Együtt: 3 százas 7 tízes = 370 Ft</text>
  </svg>
);

/** 28 + 9 = 37, ezért 28 tízes + 9 tízes = 37 tízes, vagyis 280 + 90 = 370. */
export const AddSub500AnalogySvg: Fig = ({ className = DEF }) => {
  const box = (y: number, color: string, stroke: string, text: string, note: string) => (
    <g>
      <rect x="16" y={y} width="210" height="30" rx="8" fill={color} stroke={stroke} strokeWidth="1.6" />
      <text x="121" y={y + 21} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{text}</text>
      <text x="238" y={y + 20} fontSize="12.5" fill="#475569">{note}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {box(12, '#fef9c3', '#ca8a04', '28 + 9 = 37', 'kis számokkal')}
      <path d="M 121 44 L 121 54" stroke="#64748b" strokeWidth="2" />
      <path d="M 116 50 L 121 56 L 126 50" fill="none" stroke="#64748b" strokeWidth="2" />
      {box(58, '#dbeafe', '#2563eb', '28 t + 9 t = 37 t', 'tízesekkel')}
      <path d="M 121 90 L 121 100" stroke="#64748b" strokeWidth="2" />
      <path d="M 116 96 L 121 102 L 126 96" fill="none" stroke="#64748b" strokeWidth="2" />
      {box(104, '#dcfce7', '#16a34a', '280 + 90 = 370', 'a nagy számok')}
    </svg>
  );
};

/** 280 + 50: előbb a 300-ig (+20), aztán még +30. */
export const AddSub500BridgeSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={250} hi={350} start={280} jumps={[{ to: 300, label: '+20' }, { to: 330, label: '+30' }]} className={className} />
);

/** 430 − 60: előbb vissza a 400-ig (−30), aztán még −30. */
export const AddSub500BridgeBackSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={350} hi={450} start={430} jumps={[{ to: 400, label: '−30' }, { to: 370, label: '−30' }]} color="#ea580c" className={className} />
);

/** 250 + 170 bontással: +100, aztán +70. */
export const AddSub500SplitAddSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={200} hi={450} start={250} jumps={[{ to: 350, label: '+100' }, { to: 420, label: '+70' }]} H={130} className={className} />
);

/** 430 − 160 bontással: −100, aztán −60. */
export const AddSub500SplitSubSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={250} hi={450} start={430} jumps={[{ to: 330, label: '−100' }, { to: 270, label: '−60' }]} color="#ea580c" H={130} className={className} />
);

/** Pótlás 500-ra csíkkal: 360 + ? = 500. */
export const AddSub500ToFiveHundredSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <Bar500 known={360} x={20} y={38} W={320} h={34} fs={16} />
    <text x="180" y="104" textAnchor="middle" fontSize="13" fill="#475569">360 + ? = 500. Előbb a 400-ig: +40, aztán +100.</text>
  </svg>
);
