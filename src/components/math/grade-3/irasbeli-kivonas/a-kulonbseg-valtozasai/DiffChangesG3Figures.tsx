import React from 'react';
import { FONT, INK, UP, DOWN, C_MIN, C_SUB, C_DIF, DiffRowsG, diffRowsHeight, NumBox, Coin, PriceTag } from './DiffChangesG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-md mx-auto';

/** A kisebbítendő változik: 350 − 120 = 230 → +100 → 450 − 120 = 330 → −10 → 440 − 120 = 320. */
export const DiffChangesMinuendSvg: Fig = ({ className = DEF }) => {
  const h = diffRowsHeight(3, true);
  return (
    <svg viewBox={`0 0 240 ${h + 4}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h + 2} rx="12" fill="#eff6ff" stroke="#93c5fd" />
      <DiffRowsG
        names
        rows={[
          [350, 120, 230],
          [450, 120, 330],
          [440, 120, 320]
        ]}
        changes={[
          ['+100', null, '+100'],
          ['−10', null, '−10']
        ]}
        y={12}
      />
    </svg>
  );
};

/** A kivonandó változik: 450 − 120 = 330 → +100 → 450 − 220 = 230 → −10 → 450 − 210 = 240. Fordítva változik! */
export const DiffChangesSubtrahendSvg: Fig = ({ className = DEF }) => {
  const h = diffRowsHeight(3, true);
  return (
    <svg viewBox={`0 0 240 ${h + 4}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h + 2} rx="12" fill="#fff7ed" stroke="#fdba74" />
      <DiffRowsG
        names
        rows={[
          [450, 120, 330],
          [450, 220, 230],
          [450, 210, 240]
        ]}
        changes={[
          [null, '+100', '−100'],
          [null, '−10', '+10']
        ]}
        y={12}
      />
    </svg>
  );
};

/** Pénztárca: 500 Ft. Ha drágább a játék, kevesebb pénz marad. */
export const DiffChangesWalletSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="198" rx="12" fill="#fefce8" stroke="#fde047" />
    {/* pénztárca */}
    <rect x="14" y="24" width="112" height="64" rx="12" fill="#a78bfa" stroke="#5b21b6" strokeWidth="2" />
    <rect x="14" y="24" width="112" height="22" rx="10" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="2" />
    <Coin cx={38} cy={66} v={200} r={17} />
    <Coin cx={72} cy={66} v={200} r={17} />
    <Coin cx={106} cy={66} v={100} r={16} />
    <text x="70" y="110" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>500 Ft van nálad</text>
    {/* 1. vásárlás */}
    <PriceTag x={150} y={30} text="150 Ft" w={78} fs={15} fill="#e0f2fe" />
        <text x="232" y="49" fontSize="13" fontWeight="bold" fill={INK}>→ marad</text>
    <NumBox cx={322} cy={44} v="350 Ft" w={60} h={30} fs={15} fill={C_DIF.fill} stroke={C_DIF.stroke} />
    {/* 2. vásárlás */}
    <PriceTag x={150} y={78} text="250 Ft" w={78} fs={15} fill="#fee2e2" />
        <text x="232" y="97" fontSize="13" fontWeight="bold" fill={INK}>→ marad</text>
    <NumBox cx={322} cy={92} v="250 Ft" w={60} h={30} fs={15} fill={C_DIF.fill} stroke={C_DIF.stroke} />
    {/* magyarázat */}
    <text x="180" y="146" textAnchor="middle" fontSize="13" fontWeight="bold" fill={DOWN}>A játék 100 Ft-tal drágább: a kivonandó nő.</text>
    <text x="180" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill={DOWN}>Ezért 100 Ft-tal kevesebb marad: a különbség csökken.</text>
  </svg>
);

/** Életkor: a korkülönbség nem változik. Most 9 és 4 éves, 5 év múlva 14 és 9 éves. */
export const DiffChangesAgeSvg: Fig = ({ className = DEF }) => {
  const k = 14; // 1 év = 14 egység
  const x0 = 70;
  const pair = (y: number, title: string, big: number, small: number) => (
    <g>
      <text x="14" y={y - 8} fontSize="13" fontWeight="bold" fill="#334155">{title}</text>
      <text x={x0 - 8} y={y + 17} textAnchor="end" fontSize="13" fontWeight="bold" fill={C_MIN.stroke}>Nóri</text>
      <rect x={x0} y={y} width={small * k} height="24" fill={C_MIN.bar} stroke={C_MIN.stroke} strokeWidth="1.6" />
      <rect x={x0 + small * k} y={y} width={(big - small) * k} height="24" fill={C_DIF.bar} stroke={C_DIF.stroke} strokeWidth="1.6" />
      <text x={x0 + big * k + 6} y={y + 17} fontSize="13" fontWeight="bold" fill={INK}>{big} éves</text>
      <text x={x0 - 8} y={y + 47} textAnchor="end" fontSize="13" fontWeight="bold" fill={C_SUB.stroke}>Ádám</text>
      <rect x={x0} y={y + 30} width={small * k} height="24" fill={C_SUB.bar} stroke={C_SUB.stroke} strokeWidth="1.6" />
      <text x={x0 + small * k + 6} y={y + 47} fontSize="13" fontWeight="bold" fill={INK}>{small} éves</text>
      <text x={x0 + small * k + ((big - small) * k) / 2} y={y + 17} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">5 év</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="12" fill="#f0fdf4" stroke="#86efac" />
      {pair(30, 'Most:', 9, 4)}
      {pair(122, '5 év múlva:', 14, 9)}
      <text x="340" y="104" textAnchor="end" fontSize="12.5" fontWeight="bold" fill={UP}>mindketten +5 év</text>
    </svg>
  );
};

/** Állandó különbség: 300 − 100, 310 − 110, … mind 200. */
export const DiffChangesTableSvg: Fig = ({ className = DEF }) => {
  const A = [300, 310, 320, 330, 340];
  const B = [100, 110, 120, 130, 140];
  const cw = 46;
  const x0 = 120;
  const rows: [string, number[], string][] = [
    ['kisebbítendő', A, C_MIN.fill],
    ['kivonandó', B, C_SUB.fill],
    ['különbség', A.map(() => 200), C_DIF.fill]
  ];
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="168" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map(([name, vals, fill], r) => (
        <g key={r}>
          <rect x="10" y={14 + r * 34} width={x0 - 10} height="32" fill={fill} stroke="#94a3b8" />
          <text x={(10 + x0) / 2} y={35 + r * 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{name}</text>
          {vals.map((v, k) => (
            <g key={k}>
              <rect x={x0 + k * cw} y={14 + r * 34} width={cw} height="32" fill="#fff" stroke="#94a3b8" />
              <text x={x0 + k * cw + cw / 2} y={36 + r * 34} textAnchor="middle" fontSize="15" fontWeight="bold" fill={r === 2 ? '#15803d' : INK}>{v}</text>
            </g>
          ))}
        </g>
      ))}
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <text x={x0 + (k + 1) * cw} y="126" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UP}>+10</text>
          <text x={x0 + (k + 1) * cw} y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UP}>+10</text>
        </g>
      ))}
      <text x="65" y="134" textAnchor="middle" fontSize="11.5" fill="#475569">lépésenként:</text>
      <text x="180" y="161" textAnchor="middle" fontSize="12.5" fill="#475569">Mindkettő 10-zel nő: a különbség marad 200.</text>
    </svg>
  );
};

/** Okos kivonás: 435 − 198 → mindkettőhöz 2-t adok → 437 − 200 = 237. */
export const DiffChangesCleverSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
    <NumBox cx={80} cy={38} v={435} w={70} h={36} fs={20} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="140" y="46" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={200} cy={38} v={198} w={70} h={36} fs={20} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <line x1="80" y1="60" x2="80" y2="102" stroke={UP} strokeWidth="2.6" />
    <path d="M 74 96 L 80 104 L 86 96" fill="none" stroke={UP} strokeWidth="2.6" strokeLinejoin="round" />
    <text x="90" y="88" fontSize="15" fontWeight="bold" fill={UP}>+2</text>
    <line x1="200" y1="60" x2="200" y2="102" stroke={UP} strokeWidth="2.6" />
    <path d="M 194 96 L 200 104 L 206 96" fill="none" stroke={UP} strokeWidth="2.6" strokeLinejoin="round" />
    <text x="210" y="88" fontSize="15" fontWeight="bold" fill={UP}>+2</text>
    <NumBox cx={80} cy={128} v={437} w={70} h={36} fs={20} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="140" y="136" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={200} cy={128} v={200} w={70} h={36} fs={20} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <text x="252" y="135" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>=</text>
    <NumBox cx={304} cy={128} v={237} w={70} h={36} fs={20} fill={C_DIF.fill} stroke={C_DIF.stroke} />
    <text x="304" y="40" textAnchor="middle" fontSize="12.5" fill="#475569">200-at</text>
    <text x="304" y="56" textAnchor="middle" fontSize="12.5" fill="#475569">könnyű elvenni!</text>
  </svg>
);
