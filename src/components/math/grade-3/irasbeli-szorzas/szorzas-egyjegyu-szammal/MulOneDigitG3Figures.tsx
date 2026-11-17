import React from 'react';
import { FONT, CoinRow, coinRowWidth, MiniBlocks, miniBlocksWidth, BraceDown, OpArrow, Flat, Rod } from './MulOneDigitG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 230 Ft · 3: három sor pénz, összesen 6 százas és 9 tízes. */
export const CoinsMulSvg: Fig = ({ className }) => {
  const w0 = coinRowWidth(230, 13, 10);
  return (
    <Frame w={380} h={190} className={className}>
      <text x="20" y="28" fontSize="15" fontWeight="bold" fill="#334155">Egy belépő: 230 Ft. Hárman megyünk.</text>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <text x="22" y={66 + r * 36} fontSize="13" fontWeight="bold" fill="#64748b">{r + 1}.</text>
          <CoinRow x={44} cy={61 + r * 36} amount={230} r100={13} r10={10} />
        </g>
      ))}
      <line x1={44 + w0 + 14} y1="44" x2={44 + w0 + 14} y2="150" stroke="#cbd5e1" strokeWidth="2" />
      <text x={44 + w0 + 30} y="70" fontSize="14" fill="#b91c1c" fontWeight="bold">3 · 2 százas = 6 százas</text>
      <text x={44 + w0 + 30} y="96" fontSize="14" fill="#1d4ed8" fontWeight="bold">3 · 3 tízes = 9 tízes</text>
      <text x={44 + w0 + 30} y="128" fontSize="15" fill="#0f172a" fontWeight="bold">600 + 90 = 690</text>
      <text x="190" y="176" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">230 Ft · 3 = 3 · 230 Ft = 690 Ft</text>
    </Frame>
  );
};

/** 120 · 3: 12 tízes háromszor = 36 tízes = 360. */
export const TensMulSvg: Fig = ({ className }) => {
  const bw = miniBlocksWidth(120, 30);
  return (
    <Frame w={380} h={170} className={className}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={18 + i * 76} y="18" width={bw + 14} height="46" rx="8" fill="#fff" stroke="#94a3b8" strokeDasharray="4 3" />
          <MiniBlocks x={25 + i * 76} y={26} n={120} s={30} />
        </g>
      ))}
      <text x="255" y="38" fontSize="14" fontWeight="bold" fill="#334155">3-szor 120</text>
      <text x="255" y="58" fontSize="13" fill="#475569">= 3-szor 12 tízes</text>
      <text x="22" y="96" fontSize="15" fill="#0f172a">12 · 3 = 36, ezért</text>
      <text x="22" y="120" fontSize="15" fontWeight="bold" fill="#1d4ed8">12 tízes · 3 = 36 tízes = 360</text>
      <text x="22" y="152" fontSize="17" fontWeight="bold" fill="#0f172a">120 · 3 = 360</text>
      <text x="190" y="152" fontSize="13" fill="#64748b">(1 százas + 2 tízes, háromszor)</text>
    </Frame>
  );
};

/** 280 · 2 = 200 · 2 + 80 · 2 bontással, kapcsos zárójelekkel. */
export const SplitMulSvg: Fig = ({ className }) => (
  <Frame w={380} h={150} className={className}>
    <text x="20" y="40" fontSize="20" fontWeight="bold" fill="#0f172a">280 · 2 =</text>
    <text x="118" y="40" fontSize="20" fontWeight="bold" fill="#b91c1c">200 · 2</text>
    <text x="196" y="40" fontSize="20" fontWeight="bold" fill="#0f172a">+</text>
    <text x="218" y="40" fontSize="20" fontWeight="bold" fill="#1d4ed8">80 · 2</text>
    <text x="285" y="40" fontSize="20" fontWeight="bold" fill="#0f172a">=</text>
    <BraceDown x1={118} x2={186} y={48} />
    <BraceDown x1={218} x2={276} y={48} />
    <text x="152" y="84" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">400</text>
    <text x="197" y="84" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">+</text>
    <text x="247" y="84" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">160</text>
    <text x="300" y="84" fontSize="18" fontWeight="bold" fill="#0f172a">= 560</text>
    <text x="20" y="122" fontSize="13.5" fill="#475569">Bontsd százasokra és tízesekre!</text>
    <text x="20" y="140" fontSize="13.5" fill="#475569">Mindkét részt szorozd meg, aztán add össze!</text>
  </Frame>
);

/** Szorzólánc: 140 ·2→ 280 ·2→ 560, alul: ·4. */
export const ChainSvg: Fig = ({ className }) => {
  const box = (x: number, t: string, c = '#0f172a') => (
    <g>
      <rect x={x} y="40" width="66" height="38" rx="9" fill="#fff" stroke="#64748b" strokeWidth="2" />
      <text x={x + 33} y="66" textAnchor="middle" fontSize="19" fontWeight="bold" fill={c}>{t}</text>
    </g>
  );
  return (
    <Frame w={380} h={150} className={className}>
      {box(30, '140')}
      <OpArrow x1={100} x2={150} y={59} label="· 2" />
      {box(156, '280')}
      <OpArrow x1={226} x2={276} y={59} label="· 2" />
      {box(282, '560', '#1d4ed8')}
      <path d="M 63 82 Q 63 128 190 128 Q 315 128 315 86" fill="none" stroke="#16a34a" strokeWidth="2.2" />
      <path d="M 315 80 L 310 90 L 320 90 Z" fill="#16a34a" />
      <text x="190" y="122" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#16a34a">· 4</text>
      <text x="190" y="24" textAnchor="middle" fontSize="13" fill="#475569">Kétszer 2-vel szorozni = egyszerre 4-gyel szorozni</text>
    </Frame>
  );
};

/** Kitekintő: 3 · 124 = 3 · 100 + 3 · 20 + 3 · 4. */
export const ThreePartSvg: Fig = ({ className }) => {
  const parts = [
    { n: 100, label: '3 · 100 = 300', c: '#b91c1c' },
    { n: 20, label: '3 · 20 = 60', c: '#1d4ed8' },
    { n: 4, label: '3 · 4 = 12', c: '#a16207' }
  ];
  const xs = [20, 150, 270];
  return (
    <Frame w={380} h={196} className={className}>
      {parts.map((p, i) => (
        <g key={i}>
          {[0, 1, 2].map((r) => (
            <g key={r}>
              {p.n === 100 && <Flat x={xs[i] + 30} y={14 + r * 30} s={26} thin />}
              {p.n === 20 && [0, 1].map((k) => <Rod key={k} x={xs[i] + 30 + k * 10} y={14 + r * 30} w={7} h={26} thin />)}
              {p.n === 4 && [0, 1, 2, 3].map((k) => <rect key={k} x={xs[i] + 22 + k * 10} y={30 + r * 30} width="8" height="8" rx="1" fill="#facc15" stroke="#a16207" strokeWidth="0.9" />)}
            </g>
          ))}
          <text x={xs[i] + 43} y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill={p.c}>{p.label}</text>
        </g>
      ))}
      <text x="190" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">3 · 124 = 300 + 60 + 12 = 372</text>
      <text x="190" y="176" textAnchor="middle" fontSize="13" fill="#475569">A 3. leckében ezt írásban, oszlopokban számoljuk.</text>
    </Frame>
  );
};

/** Felcserélhetőség: 4 sor 120 Ft vagy 120 Ft négyszer – ugyanannyi. */
export const SwapSvg: Fig = ({ className }) => (
  <Frame w={380} h={128} className={className}>
    {[0, 1, 2, 3].map((r) => (
      <CoinRow key={r} x={22} cy={26 + r * 25} amount={120} r100={10} r10={8} />
    ))}
    <text x="130" y="44" fontSize="16" fontWeight="bold" fill="#0f172a">4 · 120 = 120 · 4</text>
    <text x="130" y="70" fontSize="14" fill="#475569">A tényezők felcserélhetők,</text>
    <text x="130" y="90" fontSize="14" fill="#475569">a szorzat nem változik.</text>
    <text x="130" y="114" fontSize="16" fontWeight="bold" fill="#1d4ed8">Mindkettő 480.</text>
  </Frame>
);
