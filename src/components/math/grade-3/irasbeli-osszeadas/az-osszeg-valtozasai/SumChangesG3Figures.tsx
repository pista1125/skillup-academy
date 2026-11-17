import React from 'react';
import { FONT, INK, UNK, UP, DOWN, ChangeRowsG, changeRowsHeight, NumBox } from './SumChangesG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-md mx-auto';

/** Egy tag változik: 230 + 140 = 370 → +100 → 330 + 140 = 470 → −10 → 330 + 130 = 460. */
export const SumChangesOneTagSvg: Fig = ({ className = DEF }) => {
  const h = changeRowsHeight(3);
  return (
    <svg viewBox={`0 0 240 ${h + 4}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h + 2} rx="12" fill="#f0fdf4" stroke="#86efac" />
      <ChangeRowsG
        rows={[
          [230, 140, 370],
          [330, 140, 470],
          [330, 130, 460]
        ]}
        changes={[
          ['+100', null, '+100'],
          [null, '−10', '−10']
        ]}
        y={14}
      />
    </svg>
  );
};

/** Mindkét tag nő: 215 + 132 = 347 → +10, +10 → 225 + 142 = 367 (+20). */
export const SumChangesBothSvg: Fig = ({ className = DEF }) => {
  const h = changeRowsHeight(2);
  return (
    <svg viewBox={`0 0 240 ${h + 4}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h + 2} rx="12" fill="#eff6ff" stroke="#93c5fd" />
      <ChangeRowsG rows={[[215, 132, 347], [225, 142, 367]]} changes={[['+10', '+10', '+20']]} y={14} />
    </svg>
  );
};

/** Átrakás: 180 + 120 = 300 → 10-et átteszünk → 190 + 110 = 300. Szakaszos ábrával. */
export const SumChangesMoveSvg: Fig = ({ className = DEF }) => {
  const x0 = 30;
  const W = 300;
  const k = W / 300;
  const bar = (y: number, a: number, b: number, moved: boolean) => (
    <g>
      <rect x={x0} y={y} width={a * k} height={34} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.6" />
      <rect x={x0 + a * k} y={y} width={b * k} height={34} fill="#fde68a" stroke="#a16207" strokeWidth="1.6" />
      {moved && <rect x={x0 + (a - 10) * k} y={y} width={10 * k} height={34} fill="#22c55e" stroke="#15803d" strokeWidth="1.6" />}
      <text x={x0 + (moved ? (a - 10) * k : a * k) / 2} y={y + 23} textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{moved ? a - 10 : a}</text>
      <text x={x0 + a * k + (b * k) / 2} y={y + 23} textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{b}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 214" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="212" rx="12" fill="#fffbeb" stroke="#fcd34d" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">Előtte: 180 + 120 = 300</text>
      {/* előtte */}
      <rect x={x0} y="32" width={180 * k} height="34" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.6" />
      <rect x={x0 + 170 * k} y="32" width={10 * k} height="34" fill="#22c55e" stroke="#15803d" strokeWidth="1.6" />
      <text x={x0 + 85 * k} y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>180</text>
      <rect x={x0 + 180 * k} y="32" width={120 * k} height="34" fill="#fde68a" stroke="#a16207" strokeWidth="1.6" />
      <text x={x0 + 240 * k} y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>120</text>
      {/* nyíl */}
      <path d={`M ${x0 + 175 * k} 70 Q ${x0 + 175 * k} 96 ${x0 + 183 * k} 112`} fill="none" stroke="#15803d" strokeWidth="2.6" />
      <path d={`M ${x0 + 177 * k} 108 L ${x0 + 184 * k} 114 L ${x0 + 186 * k} 105`} fill="none" stroke="#15803d" strokeWidth="2.6" strokeLinejoin="round" />
      <text x={x0 + 196 * k} y="96" fontSize="13" fontWeight="bold" fill="#15803d">10-et átteszek</text>
      {/* utána */}
      {bar(116, 170, 130, false)}
      <rect x={x0 + 170 * k} y="116" width={10 * k} height="34" fill="#22c55e" stroke="#15803d" strokeWidth="1.6" />
      <text x="180" y="174" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">Utána: 170 + 130 = 300</text>
      <text x="180" y="198" textAnchor="middle" fontSize="13" fill="#475569">A csík ugyanolyan hosszú maradt: az összeg nem változott.</text>
    </svg>
  );
};

/** Állandó összeg: 100 + 200, 110 + 190, … mind 300. */
export const SumChangesTableSvg: Fig = ({ className = DEF }) => {
  const A = [100, 110, 120, 130, 140];
  const B = [200, 190, 180, 170, 160];
  const cw = 50;
  const x0 = 100;
  const rows: [string, (number | string)[], string][] = [
    ['1. tag', A, '#dbeafe'],
    ['2. tag', B, '#fef9c3'],
    ['összeg', A.map(() => 300), '#dcfce7']
  ];
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="168" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map(([name, vals, fill], r) => (
        <g key={r}>
          <rect x="12" y={14 + r * 34} width={x0 - 12} height="32" fill={fill} stroke="#94a3b8" />
          <text x={(12 + x0) / 2} y={35 + r * 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{name}</text>
          {vals.map((v, k) => (
            <g key={k}>
              <rect x={x0 + k * cw} y={14 + r * 34} width={cw} height="32" fill="#fff" stroke="#94a3b8" />
              <text x={x0 + k * cw + cw / 2} y={36 + r * 34} textAnchor="middle" fontSize="16" fontWeight="bold" fill={r === 2 ? '#15803d' : INK}>{v}</text>
            </g>
          ))}
        </g>
      ))}
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <text x={x0 + (k + 1) * cw} y="126" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UP}>+10</text>
          <text x={x0 + (k + 1) * cw} y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill={DOWN}>−10</text>
        </g>
      ))}
      <text x="56" y="134" textAnchor="middle" fontSize="11.5" fill="#475569">lépésenként:</text>
      <text x="180" y="161" textAnchor="middle" fontSize="12.5" fill="#475569">1. tag: +10, 2. tag: −10. Az összeg marad 300.</text>
    </svg>
  );
};

/** Okos számolás: 198 + 147 = 200 + 145 = 345 (2-t átteszünk). */
export const SumChangesCleverSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
    <NumBox cx={80} cy={40} v={198} w={70} h={36} fs={20} fill="#dbeafe" stroke="#3b82f6" />
    <text x="140" y="47" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={200} cy={40} v={147} w={70} h={36} fs={20} fill="#fef9c3" stroke="#ca8a04" />
    <path d="M 200 62 Q 140 96 88 66" fill="none" stroke="#7c3aed" strokeWidth="2.6" />
    <path d="M 98 64 L 88 66 L 92 76" fill="none" stroke="#7c3aed" strokeWidth="2.6" strokeLinejoin="round" />
    <text x="144" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">2-t átteszek</text>
    <NumBox cx={80} cy={128} v={200} w={70} h={36} fs={20} fill="#dbeafe" stroke="#3b82f6" />
    <text x="140" y="135" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={200} cy={128} v={145} w={70} h={36} fs={20} fill="#fef9c3" stroke="#ca8a04" />
    <text x="252" y="135" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>=</text>
    <NumBox cx={304} cy={128} v={345} w={70} h={36} fs={20} fill="#dcfce7" stroke="#16a34a" />
    <text x="304" y="48" textAnchor="middle" fontSize="12.5" fill="#475569">200-hoz</text>
    <text x="304" y="64" textAnchor="middle" fontSize="12.5" fill="#475569">könnyű adni!</text>
  </svg>
);

/** Összehasonlítás számolás nélkül: 236 + 158 ○ 246 + 158. */
export const SumChangesCompareSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="12" fill="#f0f9ff" stroke="#7dd3fc" />
    <NumBox cx={40} cy={40} v={236} w={54} h={32} fs={18} fill="#dbeafe" stroke="#3b82f6" />
    <text x="79" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={118} cy={40} v={158} w={54} h={32} fs={18} fill="#fef9c3" stroke="#ca8a04" />
    <circle cx="180" cy="40" r="16" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="180" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <NumBox cx={242} cy={40} v={246} w={54} h={32} fs={18} fill="#dbeafe" stroke="#3b82f6" />
    <text x="281" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={320} cy={40} v={158} w={54} h={32} fs={18} fill="#fef9c3" stroke="#ca8a04" />
    <path d="M 40 60 Q 141 100 236 62" fill="none" stroke={UP} strokeWidth="2.4" />
    <path d="M 225 60 L 236 62 L 230 72" fill="none" stroke={UP} strokeWidth="2.4" strokeLinejoin="round" />
    <text x="120" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UP}>1. tag: +10</text>
    <path d="M 118 60 Q 219 96 316 62" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="4 3" />
    <text x="290" y="104" textAnchor="middle" fontSize="12.5" fill="#475569">2. tag: ugyanaz</text>
  </svg>
);
