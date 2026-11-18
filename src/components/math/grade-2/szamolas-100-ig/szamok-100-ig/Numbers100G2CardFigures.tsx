import React from 'react';
import { N100_FONT, RodsPart, rodsWidth, CoinPart } from './Numbers100G2Parts';

// ---------------------------------------------------------------------------
// Kártyaképek a Párosítóhoz (150 × 80) és a Csoportosítóhoz (80 × 80).
// Csak a mennyiséget mutatják, az eredményt nem írják ki.
// ---------------------------------------------------------------------------

const Frame150: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

const Frame80: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Tízesrudak + egyeskockák, 150 × 80. */
export const RodsCard150: React.FC<{ tens: number; ones: number }> = ({ tens, ones }) => {
  const u = 6;
  const w = rodsWidth(tens, ones, u);
  return (
    <Frame150>
      <RodsPart x={75 - w / 2} y={10} tens={tens} ones={ones} u={u} strokeWidth={1.2} />
    </Frame150>
  );
};

/** Tízesrudak + egyeskockák, 80 × 80. */
export const RodsCard80: React.FC<{ tens: number; ones: number }> = ({ tens, ones }) => {
  const u = tens + Math.ceil(ones / 5) > 9 ? 4 : 5;
  const w = rodsWidth(tens, ones, u);
  return (
    <Frame80>
      <RodsPart x={40 - w / 2} y={40 - 5 * u} tens={tens} ones={ones} u={u} strokeWidth={1} />
    </Frame80>
  );
};

/** Számegyenes-darab (`from`–`to`), nyíl mutat egy pontra. */
export const LineCard150: React.FC<{ from: number; to: number; at: number }> = ({ from, to, at }) => {
  const x0 = 14;
  const w = 122;
  const px = (v: number) => x0 + ((v - from) / (to - from)) * w;
  const ticks: number[] = [];
  for (let v = from; v <= to; v++) ticks.push(v);
  return (
    <Frame150>
      <line x1={x0 - 4} y1="48" x2={x0 + w + 6} y2="48" stroke="#1e293b" strokeWidth="3" />
      {ticks.map((v) => (
        <line
          key={v}
          x1={px(v)}
          y1={v === from || v === to ? 40 : (v - from) % 5 === 0 ? 42 : 44}
          x2={px(v)}
          y2={v === from || v === to ? 56 : (v - from) % 5 === 0 ? 54 : 52}
          stroke="#1e293b"
          strokeWidth={v === from || v === to ? 3 : 2}
        />
      ))}
      <text x={px(from)} y="72" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">{from}</text>
      <text x={px(to)} y="72" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">{to}</text>
      <path d={`M ${px(at)} 40 l -7 -16 l 14 0 Z`} fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      <text x={px(at)} y="19" textAnchor="middle" fontSize="13" fontWeight="900" fill="#dc2626">?</text>
    </Frame150>
  );
};

/**
 * Százas-tábla ablak: egy ismert szám és egy „?” mező (`dr` sor, `dc` oszlop eltolással).
 */
export const ChartCard: React.FC<{ known: number; dr: number; dc: number; small?: boolean }> = ({
  known,
  dr,
  dc,
  small
}) => {
  const cols = small ? 3 : 5;
  const cell = small ? 23 : 27;
  const rowsH = small ? 23 : 23;
  const mid = Math.floor(cols / 2);
  const kc = dc > 0 ? Math.max(0, mid - dc) : Math.min(cols - 1, mid - dc);
  const kr = dr > 0 ? 0 : dr < 0 ? 2 : 1;
  const qc = kc + dc;
  const qr = kr + dr;
  const W = small ? 80 : 150;
  const x0 = (W - cols * cell) / 2;
  const y0 = (80 - 3 * rowsH) / 2;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < cols; c++) {
      const isK = r === kr && c === kc;
      const isQ = r === qr && c === qc;
      cells.push(
        <g key={`${r}-${c}`}>
          <rect
            x={x0 + c * cell}
            y={y0 + r * rowsH}
            width={cell}
            height={rowsH}
            fill={isK ? '#fde047' : isQ ? '#fee2e2' : '#ffffff'}
            stroke="#475569"
            strokeWidth="1.5"
          />
          {(isK || isQ) && (
            <text
              x={x0 + c * cell + cell / 2}
              y={y0 + r * rowsH + rowsH / 2 + 5.5}
              textAnchor="middle"
              fontSize={small ? 13 : 15}
              fontWeight="900"
              fill={isQ ? '#dc2626' : '#0f172a'}
            >
              {isQ ? '?' : known}
            </text>
          )}
        </g>
      );
    }
  }
  const content = <g>{cells}</g>;
  return small ? <Frame80>{content}</Frame80> : <Frame150>{content}</Frame150>;
};

/** Pénzérmék, 150 × 80. */
export const CoinCard150: React.FC<{ coins: (10 | 20 | 50 | 100)[] }> = ({ coins }) => {
  const step = coins.length > 4 ? 26 : 32;
  const x0 = 75 - ((coins.length - 1) * step) / 2;
  return (
    <Frame150>
      {coins.map((v, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={v} r={coins.length > 4 ? 12 : 14} />
      ))}
    </Frame150>
  );
};
