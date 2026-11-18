import React from 'react';
import { RT_FONT, RT_UNK, RodsPart, rodsWidth, CoinPart } from './RoundTens100G2Parts';

type RodsProps = { tens: number; ones?: number; add?: number; cross?: number };

/** 150 × 80: tízesrudak (+ kék hozzátett rudak / áthúzott rudak) és egyeskockák. */
export const RodsCard150: React.FC<RodsProps> = ({ tens, ones = 0, add = 0, cross = 0 }) => {
  const rodW = 8;
  const gap = 4;
  const w = rodsWidth(tens + add, ones, rodW, gap, 6);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="144" height="74" rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
      <RodsPart x={(150 - w) / 2} y={10} tens={tens} ones={ones} addTens={add} crossTens={cross} cell={6} rodW={rodW} gap={gap} strokeW={1.8} />
    </svg>
  );
};

/** 80 × 80: kisebb rúdkártya (legfeljebb 10 rúd, vagy 7 rúd + egyesek). */
export const RodsCard80: React.FC<RodsProps> = ({ tens, ones = 0, add = 0, cross = 0 }) => {
  const rodW = 5;
  const gap = 2;
  const w = rodsWidth(tens + add, ones, rodW, gap, 5);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
      <RodsPart x={(80 - w) / 2} y={14} tens={tens} ones={ones} addTens={add} crossTens={cross} cell={5} rodW={rodW} gap={gap} strokeW={1.4} />
    </svg>
  );
};

/** Tízes ugrások a számegyenesen. 150 × 80 vagy 80 × 80 (small). */
export const JumpCard: React.FC<{ start: number; hops: number; dir?: 1 | -1; small?: boolean }> = ({
  start,
  hops,
  dir = 1,
  small
}) => {
  const W = small ? 80 : 150;
  const end = start + dir * 10 * hops;
  const lo = Math.min(start, end);
  const span = Math.abs(end - start);
  const x0 = 12;
  const w = W - 24;
  const X = (v: number) => x0 + ((v - lo) / span) * w;
  const y = small ? 50 : 48;
  const col = dir === 1 ? '#2563eb' : '#e11d48';
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1="8" y1={y} x2={W - 8} y2={y} stroke="#334155" strokeWidth="3" />
      {Array.from({ length: hops }, (_, i) => {
        const a = start + dir * 10 * i;
        const b = a + dir * 10;
        return (
          <path
            key={i}
            d={`M ${X(a)} ${y - 3} Q ${(X(a) + X(b)) / 2} ${y - 26} ${X(b)} ${y - 3}`}
            fill="none"
            stroke={col}
            strokeWidth="3"
          />
        );
      })}
      {!small &&
        Array.from({ length: hops }, (_, i) => {
          const a = start + dir * 10 * i;
          const b = a + dir * 10;
          return (
            <text key={`t${i}`} x={(X(a) + X(b)) / 2} y={y - 24} textAnchor="middle" fontSize="11" fontWeight="900" fill={col}>
              {dir === 1 ? '+10' : '−10'}
            </text>
          );
        })}
      <circle cx={X(start)} cy={y} r="4.5" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
      <circle cx={X(end)} cy={y} r="4.5" fill={RT_UNK} />
      <text x={X(start)} y={y + 22} textAnchor="middle" fontSize={small ? 15 : 17} fontWeight="900" fill="#92400e">
        {start}
      </text>
      <text x={X(end)} y={y + 22} textAnchor="middle" fontSize={small ? 15 : 17} fontWeight="900" fill={RT_UNK}>
        ?
      </text>
      {small && (
        <text x="40" y="20" textAnchor="middle" fontSize="12" fontWeight="900" fill={col}>
          {dir === 1 ? 'előre' : 'vissza'}
        </text>
      )}
    </svg>
  );
};

/** Érmék kártyán. 150 × 80 vagy 80 × 80 (small, max. 4 érme). */
export const CoinsCard: React.FC<{ coins: (10 | 20 | 50)[]; small?: boolean }> = ({ coins, small }) => {
  if (small) {
    const pos = [
      [24, 26],
      [56, 26],
      [24, 56],
      [56, 56]
    ];
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
        {coins.map((c, i) => (
          <CoinPart key={i} cx={pos[i][0]} cy={pos[i][1]} value={c} scale={0.95} />
        ))}
      </svg>
    );
  }
  const step = 34;
  const x0 = 75 - ((coins.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} scale={1.05} />
      ))}
    </svg>
  );
};

/** 150 × 80: 100 = known tízes + ? (10 rúd, a hiányzó rész szürke). */
export const HundredSplitCard: React.FC<{ knownTens: number }> = ({ knownTens }) => {
  const rodW = 9;
  const gap = 3.5;
  const w = 10 * (rodW + gap) - gap;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
      <rect x="3" y="3" width="144" height="74" rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
      <text x="75" y="20" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
        100
      </text>
      <RodsPart x={(150 - w) / 2} y={26} tens={knownTens} unknownTens={10 - knownTens} cell={4.8} rodW={rodW} gap={gap} strokeW={1.6} />
    </svg>
  );
};

/** 150 × 80: start → művelet → ? */
export const ChainCard: React.FC<{ start: string; op: string }> = ({ start, op }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <rect x="10" y="32" width="40" height="34" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <text x="30" y="56" textAnchor="middle" fontSize="18" fontWeight="900" fill="#78350f">
      {start}
    </text>
    <line x1="54" y1="49" x2="92" y2="49" stroke="#334155" strokeWidth="3" />
    <path d="M 90 43 L 99 49 L 90 55 Z" fill="#334155" />
    <text x="76" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill={op.startsWith('−') ? '#be123c' : '#1d4ed8'}>
      {op}
    </text>
    <rect x="102" y="32" width="40" height="34" rx="8" fill="#fee2e2" stroke={RT_UNK} strokeWidth="3" />
    <text x="122" y="56" textAnchor="middle" fontSize="20" fontWeight="900" fill={RT_UNK}>
      ?
    </text>
  </svg>
);
