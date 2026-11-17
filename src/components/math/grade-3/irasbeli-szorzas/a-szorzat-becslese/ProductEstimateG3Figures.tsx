import React from 'react';
import { FONT, PriceTag, ItemIcon } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** A 345 kerekítése két számegyenesen: százasra 300, tízesre 350. */
export const RoundLinesSvg: Fig = ({ className }) => {
  const line = (y: number, lo: number, hi: number, v: number, res: number, title: string, color: string) => {
    const x0 = 40;
    const x1 = 340;
    const X = (t: number) => x0 + ((x1 - x0) * (t - lo)) / (hi - lo);
    const to = hi - lo;
    return (
      <g>
        <text x="20" y={y - 26} fontSize="14" fontWeight="bold" fill={color}>{title}</text>
        <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={X(lo + (i * to) / 10)} y1={y - (i % 5 === 0 ? 9 : 5)} x2={X(lo + (i * to) / 10)} y2={y + (i % 5 === 0 ? 9 : 5)} stroke={i === 5 ? '#7c3aed' : '#334155'} strokeWidth={i % 10 === 0 ? 2.4 : 1.4} />
        ))}
        <text x={X(lo)} y={y + 26} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{lo}</text>
        <text x={X(hi)} y={y + 26} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{hi}</text>
        <text x={X(lo + to / 2)} y={y + 24} textAnchor="middle" fontSize="11" fill="#7c3aed">{lo + to / 2}</text>
        <circle cx={X(v)} cy={y} r="6" fill="#dc2626" />
        <text x={X(v)} y={y - 13} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">{v}</text>
        <path d={`M ${X(v)} ${y + 10} Q ${(X(v) + X(res)) / 2} ${y + 34} ${X(res)} ${y + 12}`} fill="none" stroke={color} strokeWidth="2.2" strokeDasharray="5 3" />
        <text x={x1 + 4} y={y - 26} textAnchor="end" fontSize="15" fontWeight="bold" fill={color}>345 ≈ {res}</text>
      </g>
    );
  };
  return (
    <Frame w={380} h={210} className={className}>
      {line(66, 300, 400, 345, 300, 'Százasra kerekítve', '#b91c1c')}
      {line(162, 340, 350, 345, 350, 'Tízesre kerekítve', '#1d4ed8')}
    </Frame>
  );
};

/** Két becslés és a pontos szorzat szalagokon: 345 · 2. */
export const TwoEstimatesSvg: Fig = ({ className }) => {
  const rows = [
    { l: 'százasra: 300 · 2', v: 600, c: '#fca5a5' },
    { l: 'tízesre: 350 · 2', v: 700, c: '#93c5fd' },
    { l: 'pontosan: 345 · 2', v: 690, c: '#86efac' }
  ];
  return (
    <Frame w={380} h={150} className={className}>
      {rows.map((r, i) => (
        <g key={i}>
          <text x="140" y={34 + i * 38} textAnchor="end" fontSize="13" fontWeight="bold" fill="#334155">{r.l}</text>
          <rect x="148" y={18 + i * 38} width={(r.v / 700) * 170} height="24" rx="5" fill={r.c} stroke="#334155" />
          <text x={152 + (r.v / 700) * 170} y={35 + i * 38} fontSize="14" fontWeight="bold" fill="#0f172a">{r.v}</text>
        </g>
      ))}
      <text x="190" y="138" textAnchor="middle" fontSize="13" fill="#475569">A tízesre kerekített becslés közelebb van a pontos értékhez.</text>
    </Frame>
  );
};

/** Lefelé kerekítettünk → a szorzat több; felfelé → kevesebb. */
export const UpDownSvg: Fig = ({ className }) => (
  <Frame w={380} h={170} className={className}>
    <g>
      <rect x="14" y="14" width="170" height="142" rx="12" fill="#ecfdf5" stroke="#34d399" />
      <text x="99" y="38" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">214 · 3</text>
      <text x="99" y="60" textAnchor="middle" fontSize="13" fill="#065f46">214 ≈ 210 (lefelé)</text>
      <path d="M 99 68 L 99 94" stroke="#059669" strokeWidth="3" />
      <path d="M 99 100 L 92 90 L 106 90 Z" fill="#059669" />
      <text x="99" y="120" textAnchor="middle" fontSize="13" fill="#065f46">210 · 3 = 630</text>
      <text x="99" y="144" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#065f46">A szorzat több lesz.</text>
    </g>
    <g>
      <rect x="196" y="14" width="170" height="142" rx="12" fill="#fff7ed" stroke="#fb923c" />
      <text x="281" y="38" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">157 · 2</text>
      <text x="281" y="60" textAnchor="middle" fontSize="13" fill="#9a3412">157 ≈ 160 (felfelé)</text>
      <path d="M 281 100 L 281 74" stroke="#ea580c" strokeWidth="3" />
      <path d="M 281 68 L 274 78 L 288 78 Z" fill="#ea580c" />
      <text x="281" y="120" textAnchor="middle" fontSize="13" fill="#9a3412">160 · 2 = 320</text>
      <text x="281" y="144" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#9a3412">A szorzat kevesebb lesz.</text>
    </g>
  </Frame>
);

/** Elég-e a pénz? 4 füzet 235 Ft-ért, 1000 Ft van. */
export const EnoughMoneySvg: Fig = ({ className }) => (
  <Frame w={380} h={160} className={className}>
    <PriceTag x={18} y={20} text="235 Ft" w={92} fs={17} />
    {[0, 1, 2, 3].map((i) => (
      <ItemIcon key={i} kind="book" cx={150 + i * 50} cy={40} s={0.9} />
    ))}
    <text x="20" y="96" fontSize="14" fill="#334155">Van 1000 Ft-om. Elég 4 füzetre?</text>
    <text x="20" y="120" fontSize="14" fontWeight="bold" fill="#1d4ed8">235 ≈ 240, 240 · 4 = 960</text>
    <text x="20" y="144" fontSize="14" fontWeight="bold" fill="#065f46">960 kevesebb, mint 1000 – elég lesz!</text>
  </Frame>
);
