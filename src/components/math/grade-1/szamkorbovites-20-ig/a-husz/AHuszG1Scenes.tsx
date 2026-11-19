// „A húsz” – az epres kert képei. A közös képek (két tízes keret, csoportok, művelet-, számsor-képek…) az „A tizenöt” leckéből jönnek.
// A „Számolás 20-ig” (témakörzáró) lecke is innen veszi a tízesrudakat (`RodsScene`, `MiniRods`) és a párosító képet (`PairsScene`).
import React from 'react';
import { ICONS, IconName, Hand } from '../../shared/G1Pics';
import { FONT, PURPLE, garden } from '../a-tizenot/ATizenotG1Scenes';

/**
 * Tízesrudak (10 összeragasztott narancs kocka, egymás alatt) és mellettük a sárga egyes kockák (0–20).
 * 20 = 2 rúd, 0 egyes kocka.
 */
export const RodsScene: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[440px] h-auto mx-auto' }) => {
  const v = Math.max(0, Math.min(20, n));
  const tens = Math.floor(v / 10);
  const ones = v % 10;
  return (
    <svg viewBox="0 0 480 110" className={className}>
      <rect x="2" y="2" width="476" height="106" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
      {Array.from({ length: tens }, (_, k) => (
        <g key={`t${k}`}>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={16 + i * 26} y={14 + k * 46} width="26" height="34" fill="#f97316" stroke="#7c2d12" strokeWidth="2.5" />
          ))}
          <rect x="16" y={14 + k * 46} width="260" height="34" fill="none" stroke="#7c2d12" strokeWidth="5" rx="3" />
        </g>
      ))}
      {Array.from({ length: ones }, (_, j) => (
        <rect key={`o${j}`} x={300 + (j % 5) * 35} y={14 + Math.floor(j / 5) * 46} width="30" height="34" fill="#facc15" stroke="#713f12" strokeWidth="3" rx="3" />
      ))}
    </svg>
  );
};

/** Kisebb tízesrúd-kép kártyára. */
export const MiniRods: React.FC<{ n: number }> = ({ n }) => <RodsScene n={n} className="w-36 h-auto" />;

/** Két kosár, mindegyikben 10 hely (mint a tízes keret); előbb az első telik meg. Az utolsó `crossed` eper áthúzva. */
export const BasketsScene: React.FC<{ n: number; crossed?: number }> = ({ n, crossed = 0 }) => {
  const v = Math.max(0, Math.min(20, n));
  return (
    <svg viewBox="0 0 480 200">
      {garden(480, 200)}
      {[0, 1].map((k) => {
        const x0 = 18 + k * 234;
        return (
          <g key={k}>
            <path d={`M${x0 + 30} 60 Q${x0 + 105} -4 ${x0 + 180} 60`} fill="none" stroke="#92400e" strokeWidth="7" />
            <path d={`M${x0} 58 H${x0 + 210} L${x0 + 196} 186 H${x0 + 14} Z`} fill="#d97706" stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
            <rect x={x0 + 14} y="68" width="182" height="104" rx="10" fill="#fef3c7" stroke="#78350f" strokeWidth="3" />
            {Array.from({ length: 10 }, (_, i) => {
              const idx = k * 10 + i;
              const cx = x0 + 33 + (i % 5) * 36;
              const cy = 96 + Math.floor(i / 5) * 50;
              if (idx >= v) return <circle key={i} cx={cx} cy={cy} r="14" fill="none" stroke="#d6a76c" strokeWidth="2" strokeDasharray="4 4" />;
              const cross = idx >= v - crossed;
              return (
                <g key={i} opacity={cross ? 0.45 : 1}>
                  {ICONS.eper({ x: cx, y: cy, s: 1 })}
                  {cross && <path d={`M${cx - 15} ${cy + 15} L${cx + 15} ${cy - 15}`} stroke="#111827" strokeWidth="4" strokeLinecap="round" />}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

/** Párba állított tárgyak (kettesével, oszloponként egy pár); a pár nélkül maradt tárgy lila keretben. */
export const PairsScene: React.FC<{ n: number; icon?: IconName; className?: string }> = ({ n, icon = 'eper', className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const cols = Math.ceil(n / 2);
  const cell = 44;
  const w = Math.max(200, cols * cell + 24);
  return (
    <svg viewBox={`0 0 ${w} 120`} className={className}>
      <rect x="2" y="2" width={w - 4} height="116" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: cols }, (_, c) => {
        const cx = 12 + c * cell + cell / 2;
        const full = 2 * c + 1 < n;
        return (
          <g key={c}>
            <rect x={cx - 19} y="12" width="38" height={full ? 96 : 50} rx="14" fill="none" stroke={full ? '#22c55e' : PURPLE} strokeWidth="3" strokeDasharray={full ? undefined : '5 4'} />
            {ICONS[icon]({ x: cx, y: 37, s: 0.8 })}
            {full && ICONS[icon]({ x: cx, y: 83, s: 0.8 })}
          </g>
        );
      })}
    </svg>
  );
};

/** Két kéz és két láb: 4 × 5 ujj = 20. */
const foot = (x: number, flip: boolean, key: React.Key) => (
  <g key={key} transform={`translate(${x} 0) ${flip ? 'scale(-1 1)' : ''}`}>
    <path d="M-26 120 C-34 70 -20 50 0 50 C22 50 30 76 24 120 C20 150 -22 152 -26 120 Z" fill="#fcd9b6" stroke="#9a3412" strokeWidth="3" />
    {[[-20, 42, 9], [-4, 36, 8], [10, 38, 7], [21, 44, 6], [29, 54, 5.5]].map(([a, b, r], i) => (
      <circle key={i} cx={a} cy={b} r={r} fill="#fcd9b6" stroke="#9a3412" strokeWidth="3" />
    ))}
  </g>
);
export const HandsFeetScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef9c3" />
    <svg x="10" y="10" width="110" height="120" viewBox="0 0 100 110">
      <Hand fingers={5} className="" />
    </svg>
    <svg x="120" y="10" width="110" height="120" viewBox="0 0 100 110">
      <g transform="translate(100 0) scale(-1 1)">
        <Hand fingers={5} className="" />
      </g>
    </svg>
    <g transform="translate(0 20)">
      {foot(300, true, 'f1')}
      {foot(400, false, 'f2')}
    </g>
    <text x="120" y="176" textAnchor="middle" fontSize="30" fontWeight="900" fill="#1e293b" fontFamily={FONT}>5 + 5</text>
    <text x="350" y="190" textAnchor="middle" fontSize="30" fontWeight="900" fill="#1e293b" fontFamily={FONT}>5 + 5</text>
  </svg>
);
