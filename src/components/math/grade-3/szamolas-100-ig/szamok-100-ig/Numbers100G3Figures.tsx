import React from 'react';
import { TenRod, OneCube, CoinG } from './Numbers100G3Parts';

// ---------------------------------------------------------------------------
// 1. Számok 100-ig – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/** 46 tízesrudakkal és egyeskockákkal. */
export const TensOnesBlocksSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="188" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    {[0, 1, 2, 3].map((i) => (
      <TenRod key={i} x={40 + i * 26} y={22} s={12} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <OneCube key={i} x={200 + (i % 3) * 20} y={94 + Math.floor(i / 3) * 20} s={14} />
    ))}
    <text x="85" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">4 tízes</text>
    <text x="230" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#a16207">6 egyes</text>
    <text x="160" y="181" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">4 t + 6 e = 40 + 6 = 46</text>
  </svg>
);

/** Százas tábla – néhány mező „?”-lel, a lépések jelölése. */
export const HundredBoardSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const S = 25;
  const X0 = 15;
  const Y0 = 12;
  const hidden = [27, 49, 63, 86];
  return (
    <svg viewBox="0 0 280 320" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="278" height="318" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: 100 }, (_, k) => {
        const n = k + 1;
        const r = Math.floor(k / 10);
        const c = k % 10;
        const isHidden = hidden.includes(n);
        const fill = n === 34 ? '#fde68a' : n === 35 ? '#bbf7d0' : n === 44 ? '#bfdbfe' : isHidden ? '#fee2e2' : c === 9 ? '#e0f2fe' : '#ffffff';
        return (
          <g key={n}>
            <rect x={X0 + c * S} y={Y0 + r * S} width={S} height={S} fill={fill} stroke="#94a3b8" strokeWidth="0.8" />
            <text x={X0 + c * S + S / 2} y={Y0 + r * S + 16.5} textAnchor="middle" fontSize={n === 100 ? 9.5 : 11} fontWeight={isHidden || [34, 35, 44].includes(n) ? 'bold' : 'normal'} fill={isHidden ? '#dc2626' : '#334155'}>
              {isHidden ? '?' : n}
            </text>
          </g>
        );
      })}
      <rect x="20" y="272" width="14" height="14" fill="#bbf7d0" stroke="#94a3b8" />
      <text x="40" y="284" fontSize="12" fill="#14532d">jobbra lépek: 1-gyel több (34 → 35)</text>
      <rect x="20" y="294" width="14" height="14" fill="#bfdbfe" stroke="#94a3b8" />
      <text x="40" y="306" fontSize="12" fill="#1e3a8a">lefelé lépek: 10-zel több (34 → 44)</text>
    </svg>
  );
};

/** Helyiérték-táblázat 58, 30 és 100 bontásával. */
export const PlaceValueTableSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const rows: [string, string, string, string][] = [
    ['', '5', '8', '= 5 t + 8 e = 58'],
    ['', '3', '0', '= 3 t + 0 e = 30'],
    ['1', '0', '0', '= 1 százas = 100']
  ];
  return (
    <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="168" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <rect x="14" y="14" width="186" height="26" fill="#f97316" />
      <text x="107" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">Helyiérték</text>
      {[
        ['százas', '#ef4444'],
        ['tízes', '#3b82f6'],
        ['egyes', '#eab308']
      ].map(([t, col], i) => (
        <g key={t}>
          <rect x={14 + i * 62} y="40" width="62" height="24" fill={col} />
          <text x={45 + i * 62} y="57" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{t}</text>
        </g>
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 62} y={64 + j * 32} width="62" height="32" fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} stroke="#fdba74" />
              <text x={45 + i * 62} y={86 + j * 32} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1e293b">{r[i]}</text>
            </g>
          ))}
          <text x="208" y={85 + j * 32} fontSize="12.5" fontWeight="bold" fill="#7c2d12">{r[3]}</text>
        </g>
      ))}
    </svg>
  );
};

/** A 63 egyes és tízes szomszédjai a számegyenesen. */
export const NeighboursNumberLineSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const X0 = 25;
  const U = 15; // 1 egység
  const LO = 56;
  const HI = 74;
  const x = (v: number) => X0 + (v - LO) * U;
  return (
    <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="148" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <line x1={x(LO) - 10} y1="84" x2={x(HI) + 8} y2="84" stroke="#334155" strokeWidth="2" />
      <path d={`M ${x(HI) + 8} 79 L ${x(HI) + 15} 84 L ${x(HI) + 8} 89 Z`} fill="#334155" />
      {Array.from({ length: HI - LO + 1 }, (_, i) => {
        const v = LO + i;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        return <line key={v} x1={x(v)} y1={big ? 74 : mid ? 77 : 79} x2={x(v)} y2={big ? 94 : mid ? 91 : 89} stroke="#334155" strokeWidth={big ? 2 : 1} />;
      })}
      {[60, 70].map((v) => (
        <text key={v} x={x(v)} y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">{v}</text>
      ))}
      {/* a szám */}
      <circle cx={x(63)} cy="84" r="5" fill="#dc2626" />
      <text x={x(63)} y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">63</text>
      <line x1={x(63)} y1="34" x2={x(63)} y2="74" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 2" />
      {/* egyes szomszédok */}
      <circle cx={x(62)} cy="84" r="4" fill="#16a34a" />
      <circle cx={x(64)} cy="84" r="4" fill="#16a34a" />
      <path d={`M ${x(63) - 2} 76 Q ${x(62.5)} 60 ${x(62) + 1} 76`} fill="none" stroke="#16a34a" strokeWidth="1.6" />
      <path d={`M ${x(63) + 2} 76 Q ${x(63.5)} 60 ${x(64) - 1} 76`} fill="none" stroke="#16a34a" strokeWidth="1.6" />
      <text x={x(62) - 8} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">62</text>
      <text x={x(64) + 8} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">64</text>
      <text x="250" y="36" textAnchor="middle" fontSize="11.5" fill="#15803d">egyes szomszédok:</text>
      <text x="250" y="51" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#15803d">62 és 64</text>
      {/* tízes szomszédok */}
      <path d={`M ${x(60)} 116 L ${x(60)} 122 L ${x(70)} 122 L ${x(70)} 116`} fill="none" stroke="#1d4ed8" strokeWidth="1.6" />
      <text x={x(65)} y="139" textAnchor="middle" fontSize="11.5" fill="#1e3a8a">tízes szomszédok: <tspan fontWeight="bold">60 és 70</tspan></text>
    </svg>
  );
};

/** Pénztárca: 50 + 20 + 5 = 75 Ft. */
export const PurseMoneySvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => (
  <svg viewBox="0 0 300 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="168" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
    <path d="M 40 40 Q 20 120 50 130 L 250 130 Q 280 120 260 40 Z" fill="#c084fc" stroke="#6b21a8" strokeWidth="2" />
    <path d="M 40 40 Q 150 24 260 40" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="140" cy="26" r="7" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="160" cy="26" r="7" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <CoinG cx={90} cy={84} v={50} r={22} />
    <CoinG cx={150} cy={84} v={20} r={20} />
    <CoinG cx={205} cy={84} v={5} r={16} />
    <text x="150" y="158" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#581c87">50 Ft + 20 Ft + 5 Ft = 75 Ft</text>
  </svg>
);

/** Páros és páratlan: korongok párokba állítva. */
export const EvenOddSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fefce8" stroke="#fde68a" />
    <text x="80" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">8 korong</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={22 + i * 30} y="36" width="26" height="54" rx="12" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx={35 + i * 30} cy="50" r="9" fill="#22c55e" />
        <circle cx={35 + i * 30} cy="76" r="9" fill="#22c55e" />
      </g>
    ))}
    <text x="80" y="112" textAnchor="middle" fontSize="12" fill="#14532d">mindegyiknek van párja</text>
    <text x="80" y="134" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">PÁROS</text>
    <line x1="160" y1="20" x2="160" y2="140" stroke="#fde68a" strokeWidth="2" />
    <text x="240" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">7 korong</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={180 + i * 30} y="36" width="26" height="54" rx="12" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx={193 + i * 30} cy="50" r="9" fill="#fb923c" />
        <circle cx={193 + i * 30} cy="76" r="9" fill="#fb923c" />
      </g>
    ))}
    <circle cx="283" cy="50" r="9" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
    <text x="240" y="112" textAnchor="middle" fontSize="12" fill="#7c2d12">egy korong pár nélkül marad</text>
    <text x="240" y="134" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">PÁRATLAN</text>
  </svg>
);
