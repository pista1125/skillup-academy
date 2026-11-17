import React from 'react';
import { FONT, UNK, Coin, TensJumpLine, PointsChart } from './AddSub200G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 120 + 30 pénzzel: 100 + 10 + 10, hozzá még 3 db 10 forintos. */
export const TensCoinsAddSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <rect x="14" y="16" width="150" height="62" rx="12" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
    <Coin cx={44} cy={47} v={100} r={22} />
    <Coin cx={92} cy={47} v={10} r={16} />
    <Coin cx={132} cy={47} v={10} r={16} />
    <text x="182" y="56" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">+</text>
    <rect x="200" y="16" width="146" height="62" rx="12" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
    <Coin cx={232} cy={47} v={10} r={16} />
    <Coin cx={273} cy={47} v={10} r={16} />
    <Coin cx={314} cy={47} v={10} r={16} />
    <text x="89" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">120 Ft = 12 tízes</text>
    <text x="273" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">30 Ft = 3 tízes</text>
    <text x="180" y="122" textAnchor="middle" fontSize="13" fill="#475569">12 tízes + 3 tízes = 15 tízes = 150</text>
  </svg>
);

/** 6 + 5 = 11, ezért 60 + 50 = 110 – tízesrudakkal. */
export const AnalogyRodsSvg: Fig = ({ className = DEF }) => {
  const rod = (x: number, color: string, key: string) => (
    <g key={key}>
      {Array.from({ length: 10 }, (_, k) => (
        <rect key={k} x={x} y={18 + k * 7} width="9" height="7" fill={color} stroke="#1e3a8a" strokeWidth="0.6" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: 6 }, (_, i) => rod(22 + i * 14, '#60a5fa', `a${i}`))}
      <text x="124" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">+</text>
      {Array.from({ length: 5 }, (_, i) => rod(142 + i * 14, '#f472b6', `b${i}`))}
      <text x="226" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">=</text>
      <text x="292" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">11 tízes</text>
      <text x="292" y="74" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#15803d">= 110</text>
      <text x="62" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">60 = 6 tízes</text>
      <text x="170" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be185d">50 = 5 tízes</text>
      <text x="180" y="132" textAnchor="middle" fontSize="12" fill="#475569">Mint 6 + 5 = 11, csak tízesekkel.</text>
    </svg>
  );
};

/** 60 + 50: előbb a 100-ig (+40), aztán még +10. */
export const BridgeHundredSvg: Fig = ({ className = DEF }) => (
  <TensJumpLine lo={40} hi={130} start={60} jumps={[{ to: 100, label: '+40' }, { to: 110, label: '+10' }]} className={className} />
);

/** 130 − 50: előbb vissza a 100-ig (−30), aztán még −20. */
export const BridgeBackSvg: Fig = ({ className = DEF }) => (
  <TensJumpLine lo={60} hi={150} start={130} jumps={[{ to: 100, label: '−30' }, { to: 80, label: '−20' }]} color="#ea580c" className={className} />
);

/** Pótlás 200-ra csíkkal: 140 + ? = 200. */
export const ToTwoHundredSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">200</text>
    <path d="M 20 36 L 20 30 L 340 30 L 340 36" fill="none" stroke="#0c4a6e" strokeWidth="1.6" />
    {Array.from({ length: 20 }, (_, i) => (
      <rect key={i} x={20 + i * 16} y="44" width="16" height="30" fill={i < 14 ? '#38bdf8' : '#fee2e2'} stroke={i < 14 ? '#0369a1' : UNK} strokeWidth="1" />
    ))}
    <text x="132" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0c4a6e">140</text>
    <text x="292" y="66" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <text x="180" y="98" textAnchor="middle" fontSize="12.5" fill="#475569">Egy kocka = 10. Hány kocka hiányzik a 200-hoz?</text>
  </svg>
);

/** Saját oszlopdiagram: pontgyűjtő verseny. */
export const PointsChartSvg: Fig = ({ className = DEF }) => <PointsChart className={className} />;
