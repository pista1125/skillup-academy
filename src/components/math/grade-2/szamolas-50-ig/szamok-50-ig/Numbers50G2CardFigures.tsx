import React from 'react';
import { N50_FONT, CoinPart, EggTrayPart, EggPart } from './Numbers50G2Parts';

// Kártyaképek: Párosító 150 × 80, Csoportosító 80 × 80. Nem írják ki a választ.

const Frame: React.FC<{ w: number; children: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Tízesrudak + egyeskockák. */
export const BlocksCard: React.FC<{ tens: number; ones: number; small?: boolean }> = ({ tens, ones, small }) => {
  const w = small ? 80 : 150;
  const unit = small ? 5.4 : 6;
  const gap = small ? 3 : 5;
  const rodW = small ? 6 : 8;
  const totalRods = tens * (rodW + gap);
  const onesCols = Math.ceil(ones / 5);
  const cube = small ? 6 : 8;
  const totalW = totalRods + (ones > 0 ? 4 + onesCols * (cube + 2) : 0);
  const x0 = (w - totalW) / 2;
  const y0 = 12;
  const rodH = unit * 10;
  const onesX = x0 + totalRods + 4;
  return (
    <Frame w={w}>
      {Array.from({ length: tens }, (_, t) => (
        <g key={t}>
          <rect x={x0 + t * (rodW + gap)} y={y0} width={rodW} height={rodH} rx="1.5" fill="#c084fc" stroke="#581c87" strokeWidth="2" />
          {Array.from({ length: 9 }, (_, k) => (
            <line
              key={k}
              x1={x0 + t * (rodW + gap)}
              y1={y0 + (k + 1) * unit}
              x2={x0 + t * (rodW + gap) + rodW}
              y2={y0 + (k + 1) * unit}
              stroke="#581c87"
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: ones }, (_, i) => {
        const col = Math.floor(i / 5);
        const row = i % 5;
        return (
          <rect
            key={`o${i}`}
            x={onesX + col * (cube + 2)}
            y={y0 + rodH - (row + 1) * (cube + 2) + 2}
            width={cube}
            height={cube}
            rx="1.2"
            fill="#4ade80"
            stroke="#14532d"
            strokeWidth="1.8"
          />
        );
      })}
    </Frame>
  );
};

/** Érmék (5, 10, 20 Ft). */
export const CoinsCard: React.FC<{ coins: (5 | 10 | 20)[]; small?: boolean }> = ({ coins, small }) => {
  const w = small ? 80 : 150;
  if (small) {
    // 2 sorban
    return (
      <Frame w={w}>
        {coins.map((c, i) => {
          const perRow = Math.ceil(coins.length / 2);
          const row = coins.length <= 2 ? 0 : Math.floor(i / perRow);
          const inRow = coins.length <= 2 ? coins.length : row === 0 ? perRow : coins.length - perRow;
          const idx = coins.length <= 2 ? i : i - row * perRow;
          const span = 24;
          const cx = 40 - ((inRow - 1) * span) / 2 + idx * span;
          const cy = coins.length <= 2 ? 40 : 25 + row * 30;
          return <CoinPart key={i} cx={cx} cy={cy} value={c} r={11.5} />;
        })}
      </Frame>
    );
  }
  const span = Math.min(34, 130 / coins.length);
  return (
    <Frame w={w}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={75 - ((coins.length - 1) * span) / 2 + i * span} cy={40} value={c} r={c === 20 ? 16 : c === 10 ? 14.5 : 13} />
      ))}
    </Frame>
  );
};

/** Teli tojástartók + szabad tojások. */
export const EggsCard: React.FC<{ trays: number; eggs: number; small?: boolean }> = ({ trays, eggs, small }) => {
  const w = small ? 80 : 150;
  const s = small ? 0.5 : 0.75;
  const trayW = 58 * s;
  const trayH = 26 * s;
  const cols = small ? 1 : 2;
  return (
    <Frame w={w}>
      {Array.from({ length: trays }, (_, t) => (
        <EggTrayPart key={t} x={8 + (t % cols) * (trayW + 3)} y={10 + Math.floor(t / cols) * (trayH + 4)} s={s} />
      ))}
      {Array.from({ length: eggs }, (_, i) => {
        const ex0 = 8 + cols * (trayW + 3) + 4;
        const perCol = 3;
        const cx = ex0 + Math.floor(i / perCol) * (small ? 8 : 12);
        const cy = (small ? 22 : 16) + (i % perCol) * (small ? 16 : 20);
        return <EggPart key={i} cx={cx} cy={cy} s={small ? 0.6 : 0.85} />;
      })}
    </Frame>
  );
};

/** Számegyenes nyíllal (150 × 80). */
export const NumberLineCard: React.FC<{ from: number; to: number; arrowAt: number }> = ({ from, to, arrowAt }) => {
  const x0 = 14;
  const width = 118;
  const u = width / (to - from);
  const px = (v: number) => x0 + (v - from) * u;
  const y = 52;
  return (
    <Frame w={150}>
      <line x1={x0 - 4} y1={y} x2={x0 + width + 6} y2={y} stroke="#1e293b" strokeWidth="2.5" />
      {Array.from({ length: to - from + 1 }, (_, k) => {
        const v = from + k;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        return (
          <line key={v} x1={px(v)} y1={y - (big ? 7 : mid ? 5 : 3)} x2={px(v)} y2={y + (big ? 7 : mid ? 5 : 3)} stroke="#1e293b" strokeWidth={big ? 2.5 : 1.3} />
        );
      })}
      {[from, to].map((v) => (
        <text key={v} x={px(v)} y={y + 22} textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e293b">{v}</text>
      ))}
      <line x1={px(arrowAt)} y1={y - 34} x2={px(arrowAt)} y2={y - 11} stroke="#dc2626" strokeWidth="3" />
      <path d={`M ${px(arrowAt) - 5} ${y - 14} L ${px(arrowAt)} ${y - 6} L ${px(arrowAt) + 5} ${y - 14} Z`} fill="#dc2626" />
    </Frame>
  );
};

/** Számsor-kártya, az utolsó helyen „?”. */
export const SequenceCard: React.FC<{ items: string[] }> = ({ items }) => {
  const n = items.length + 1;
  const bw = 130 / n;
  return (
    <Frame w={150}>
      {[...items, '?'].map((t, i) => (
        <g key={i}>
          <rect x={10 + i * bw + 1} y="24" width={bw - 3} height="32" rx="6" fill={t === '?' ? '#fee2e2' : '#e0f2fe'} stroke={t === '?' ? '#dc2626' : '#0369a1'} strokeWidth="2" />
          <text x={10 + i * bw + bw / 2} y="47" textAnchor="middle" fontSize="16" fontWeight="900" fill={t === '?' ? '#dc2626' : '#0c4a6e'}>{t}</text>
        </g>
      ))}
    </Frame>
  );
};
