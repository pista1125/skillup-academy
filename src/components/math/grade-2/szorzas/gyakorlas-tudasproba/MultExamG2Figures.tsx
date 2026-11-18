import React from 'react';
import { FONT, INK, CoinG } from './MultExamG2Parts';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (IV. Szorzás) – tananyag-ábrák (max. 480 px)
// ---------------------------------------------------------------------------

type Fig = React.FC<{ className?: string }>;
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

const Arrow: React.FC<{ x1: number; x2: number; y: number; label: string; color?: string }> = ({ x1, x2, y, label, color = '#16a34a' }) => (
  <g>
    <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y - 26} ${x2} ${y}`} fill="none" stroke={color} strokeWidth="3" />
    <path d={`M ${x2} ${y} l -10 -4 l 4 -8 z`} fill={color} />
    <text x={(x1 + x2) / 2} y={y - 22} textAnchor="middle" fontSize="15" fontWeight="900" fill={color}>
      {label}
    </text>
  </g>
);

const Box: React.FC<{ x: number; y: number; w?: number; text: string; fill?: string; stroke?: string }> = ({
  x,
  y,
  w = 96,
  text,
  fill = '#fff',
  stroke = '#be185d',
}) => (
  <g>
    <rect x={x} y={y} width={w} height={38} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
    <text x={x + w / 2} y={y + 26} textAnchor="middle" fontSize="17" fontWeight="900" fill={INK}>
      {text}
    </text>
  </g>
);

/** A szorzás jelentése: 3 zsák, mindegyikben 4 labda. */
export const MultMeaningSvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="2" />
    {[0, 1, 2].map((g) => (
      <g key={g}>
        <rect x={40 + g * 140} y={22} width={110} height={74} rx="18" fill="#fff7ed" stroke="#9a3412" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={68 + g * 140 + (i % 2) * 54} cy={44 + Math.floor(i / 2) * 30} r="11" fill={['#ec4899', '#3b82f6', '#f97316'][g]} />
        ))}
      </g>
    ))}
    <text x="240" y="134" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
      4 + 4 + 4 = 3 · 4 = 12
    </text>
    <text x="240" y="166" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">
      3 csoport, csoportonként 4 → olvasd: háromszor négy
    </text>
    <text x="240" y="188" textAnchor="middle" fontSize="13" fill="#64748b">
      3 és 4 a tényezők, 12 a szorzat.
    </text>
  </svg>
);

/** Felcserélhetőség rácspontokkal: 3 · 5 = 5 · 3. */
export const CommuteArraySvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
    {Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => <circle key={`a${r}${c}`} cx={50 + c * 28} cy={44 + r * 28} r="10" fill="#3b82f6" />)
    )}
    <text x="106" y="150" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
      3 · 5 = 15
    </text>
    <path d="M 210 80 H 262" stroke="#64748b" strokeWidth="3" />
    <path d="M 262 80 l -10 -6 v 12 z" fill="#64748b" />
    <text x="236" y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      fordítsd el
    </text>
    {Array.from({ length: 5 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) => <circle key={`b${r}${c}`} cx={318 + c * 28} cy={24 + r * 24} r="9" fill="#f97316" />)
    )}
    <text x="346" y="150" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
      5 · 3 = 15
    </text>
    <text x="240" y="178" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
      A tényezők helyet cserélhetnek, a szorzat nem változik.
    </text>
  </svg>
);

/** A teljes szorzótábla 10 × 10. A négyzetszámok (átló) kiemelve. */
export const ProductGridSvg: Fig = ({ className = CLS }) => {
  const c = 38;
  const x0 = 22;
  const y0 = 10;
  return (
    <svg viewBox="0 0 462 440" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={x0} y={y0} width={c} height={c} fill="#e2e8f0" />
      <text x={x0 + c / 2} y={y0 + 26} textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
        ·
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect x={x0 + (i + 1) * c} y={y0} width={c} height={c} fill="#fbcfe8" stroke="#fff" strokeWidth="2" />
          <text x={x0 + (i + 1.5) * c} y={y0 + 25} textAnchor="middle" fontSize="15" fontWeight="900" fill="#831843">
            {i + 1}
          </text>
          <rect x={x0} y={y0 + (i + 1) * c} width={c} height={c} fill="#bfdbfe" stroke="#fff" strokeWidth="2" />
          <text x={x0 + c / 2} y={y0 + (i + 1) * c + 25} textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e3a8a">
            {i + 1}
          </text>
        </g>
      ))}
      {Array.from({ length: 10 }, (_, r) =>
        Array.from({ length: 10 }, (_, k) => {
          const diag = r === k;
          return (
            <g key={`${r}-${k}`}>
              <rect
                x={x0 + (k + 1) * c}
                y={y0 + (r + 1) * c}
                width={c}
                height={c}
                fill={diag ? '#fef08a' : (r + k) % 2 === 0 ? '#ffffff' : '#f8fafc'}
                stroke="#e2e8f0"
              />
              <text x={x0 + (k + 1.5) * c} y={y0 + (r + 1) * c + 24} textAnchor="middle" fontSize="14" fontWeight={diag ? 900 : 700} fill={INK}>
                {(r + 1) * (k + 1)}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
};

/** A 2-es, 4-es és 8-as tábla: mindig duplázunk. */
export const Links248Svg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    <Box x={24} y={60} w={112} text="6 · 2 = 12" />
    <Box x={184} y={60} w={112} text="6 · 4 = 24" />
    <Box x={344} y={60} w={112} text="6 · 8 = 48" />
    <Arrow x1={110} x2={204} y={58} label="duplázd" />
    <Arrow x1={270} x2={364} y={58} label="duplázd" />
    <text x="240" y="128" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
      12 + 12 = 24, és 24 + 24 = 48
    </text>
    <text x="240" y="154" textAnchor="middle" fontSize="13" fill="#475569">
      A 4-es tábla a 2-es tábla kétszerese, a 8-as tábla a 4-es tábla kétszerese.
    </text>
  </svg>
);

/** A 3-as, 6-os és 9-es tábla. */
export const Links369Svg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <Box x={184} y={20} w={112} text="4 · 3 = 12" fill="#ffedd5" stroke="#c2410c" />
    <Box x={40} y={118} w={130} text="4 · 6 = 24" fill="#fff" stroke="#c2410c" />
    <Box x={310} y={118} w={130} text="4 · 9 = 36" fill="#fff" stroke="#c2410c" />
    <path d="M 200 60 Q 140 76 112 114" fill="none" stroke="#16a34a" strokeWidth="3" />
    <path d="M 112 114 l 1 -11 l 8 4 z" fill="#16a34a" />
    <text x="118" y="80" textAnchor="middle" fontSize="13" fontWeight="900" fill="#166534">
      kétszer
    </text>
    <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      12 + 12
    </text>
    <path d="M 280 60 Q 340 76 368 114" fill="none" stroke="#2563eb" strokeWidth="3" />
    <path d="M 368 114 l -9 -6 l 8 -4 z" fill="#2563eb" />
    <text x="368" y="80" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
      háromszor
    </text>
    <text x="372" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
      12 + 12 + 12
    </text>
    <text x="240" y="186" textAnchor="middle" fontSize="13" fill="#475569">
      A 6-os tábla a 3-as tábla kétszerese, a 9-es tábla a 3-as tábla háromszorosa.
    </text>
  </svg>
);

/** Az 5-ös és a 10-es tábla pénzzel: 6 · 5 Ft és 6 · 10 Ft. */
export const Link510Svg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="176" rx="16" fill="#fefce8" stroke="#fde047" strokeWidth="2" />
    {Array.from({ length: 6 }, (_, i) => (
      <CoinG key={`a${i}`} cx={46 + i * 40} cy={46} value={10} scale={1.3} />
    ))}
    <text x="400" y="52" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
      6 · 10 = 60
    </text>
    {Array.from({ length: 6 }, (_, i) => (
      <CoinG key={`b${i}`} cx={46 + i * 40} cy={108} value={5} scale={1.3} />
    ))}
    <text x="400" y="114" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
      6 · 5 = 30
    </text>
    <text x="240" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#854d0e">
      Ugyanannyi érme, de a 10 Ft kétszer annyi, mint az 5 Ft: a 60 a 30 kétszerese.
    </text>
  </svg>
);
