import React from 'react';
import { OneDisc, TenDisc, NumberLine0To20 } from './Numbers20G2Parts';

// ---------------------------------------------------------------------------
// 1. Számok 0-tól 20-ig – ábrák (2. osztály)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/** Korongok: 10 egyes = 1 tízes, 16 és 20 kirakása. */
export const DiscsPlaceValueSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 186" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="184" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    {/* 1. sor: 10 egyes = 1 tízes */}
    {Array.from({ length: 10 }, (_, i) => (
      <OneDisc key={i} cx={24 + i * 23} cy={30} r={9.5} />
    ))}
    <text x="262" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">=</text>
    <TenDisc cx={296} cy={30} r={14} />
    <text x="180" y="57" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1e3a8a">
      10 egyes = 1 tízes = 10
    </text>

    <line x1="20" y1="68" x2="340" y2="68" stroke="#bae6fd" strokeWidth="1.5" />

    {/* 2. sor: 1 tízes + 6 egyes = 16 */}
    <TenDisc cx={44} cy={95} r={14} />
    <text x="72" y="101" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">+</text>
    {Array.from({ length: 6 }, (_, i) => (
      <OneDisc key={i} cx={98 + i * 24} cy={95} r={10} />
    ))}
    <text x="256" y="101" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">=</text>
    <text x="292" y="102" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">16</text>
    <text x="180" y="123" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#14532d">
      1 tízes + 6 egyes = 16
    </text>

    <line x1="20" y1="134" x2="340" y2="134" stroke="#bae6fd" strokeWidth="1.5" />

    {/* 3. sor: 20 egyes = 2 tízes */}
    <TenDisc cx={68} cy={159} r={14} />
    <TenDisc cx={102} cy={159} r={14} />
    <text x="225" y="164" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#4c1d95">
      20 egyes = 2 tízes = 20
    </text>
  </svg>
);

/** 0–20-as számegyenes a 13 egyes számszomszédjaival. */
export const NumberLine20Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 24;
  const x1 = 332;
  const X = (v: number) => x0 + ((x1 - x0) * v) / 20;
  return (
    <svg viewBox="0 0 360 138" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="136" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="22" y="25" fontSize="12" fontWeight="bold" fill="#15803d">egyes számszomszédok:</text>
      <text x="22" y="42" fontSize="13" fontWeight="bold" fill="#0f172a">12 &lt; 13 &lt; 14</text>

      <NumberLine0To20 lo={0} hi={20} x0={x0} x1={x1} y={88} labels={[0, 5, 10, 15, 20]} />

      {/* 12, 13, 14 jelölése */}
      <circle cx={X(12)} cy={88} r="4.5" fill="#16a34a" />
      <circle cx={X(14)} cy={88} r="4.5" fill="#16a34a" />
      <circle cx={X(13)} cy={88} r="5.5" fill="#dc2626" />
      <path d={`M ${X(13) - 2} 80 Q ${X(12.5)} 62 ${X(12) + 1} 80`} fill="none" stroke="#16a34a" strokeWidth="1.8" />
      <path d={`M ${X(13) + 2} 80 Q ${X(13.5)} 62 ${X(14) - 1} 80`} fill="none" stroke="#16a34a" strokeWidth="1.8" />
      <text x={X(12) - 7} y={60} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">12</text>
      <text x={X(13)} y={42} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">13</text>
      <line x1={X(13)} y1={46} x2={X(13)} y2={78} stroke="#dc2626" strokeWidth="1.3" strokeDasharray="3 2" />
      <text x={X(14) + 7} y={60} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">14</text>
    </svg>
  );
};

/** Páros és páratlan házszámok utcája 0-tól 10-ig. */
export const EvenOddStreetSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 28;
  const step = 30;
  const X = (v: number) => x0 + v * step;
  const oddNums = [1, 3, 5, 7, 9];
  const evenNums = [0, 2, 4, 6, 8, 10];
  return (
    <svg viewBox="0 0 360 188" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="186" rx="14" fill="#fefce8" stroke="#fde68a" />
      {/* Páratlan házak felül */}
      {oddNums.map((n) => {
        const cx = X(n);
        return (
          <g key={n}>
            <polygon points={`${cx - 14},36 ${cx},20 ${cx + 14},36`} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.4" />
            <rect x={cx - 12} y={36} width="24" height="24" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="1.4" />
            <text x={cx} y={53} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{n}</text>
          </g>
        );
      })}
      {/* Utca / számegyenes */}
      <line x1={x0 - 12} y1={86} x2={X(10) + 18} y2={86} stroke="#334155" strokeWidth="2.2" />
      <path d={`M ${X(10) + 18} 81.5 L ${X(10) + 26} 86 L ${X(10) + 18} 90.5 Z`} fill="#334155" />
      {Array.from({ length: 11 }, (_, v) => (
        <line key={v} x1={X(v)} y1={79} x2={X(v)} y2={93} stroke="#334155" strokeWidth={v % 2 === 0 ? 1.8 : 1.4} />
      ))}
      {/* Páros házak alul */}
      {evenNums.map((n) => {
        const cx = X(n);
        return (
          <g key={n}>
            <polygon points={`${cx - 14},122 ${cx},106 ${cx + 14},122`} fill="#16a34a" stroke="#14532d" strokeWidth="1.4" />
            <rect x={cx - 12} y={122} width="24" height="24" fill="#dcfce7" stroke="#14532d" strokeWidth="1.4" />
            <text x={cx} y={139} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">{n}</text>
          </g>
        );
      })}
      <text x="180" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
        Páratlan házak: 1, 3, 5, 7, 9... (1 kimarad)
      </text>
      <text x="180" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
        Páros házak: 0, 2, 4, 6, 8, 10... (mindennek van párja)
      </text>
    </svg>
  );
};

/** 4 × 5-ös számtábla 1-től 20-ig elrejtett számokkal. */
export const Grid1To20Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const cols = 5;
  const cellW = 46;
  const cellH = 34;
  const x0 = (300 - cols * cellW) / 2;
  const y0 = 16;
  const hidden = [7, 14];
  return (
    <svg viewBox="0 0 300 206" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="298" height="204" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: 20 }, (_, k) => {
        const n = k + 1;
        const r = Math.floor(k / cols);
        const c = k % cols;
        const isQ = hidden.includes(n);
        const fill = isQ ? '#fee2e2' : r % 2 === 0 ? '#ffffff' : '#f1f5f9';
        return (
          <g key={n}>
            <rect x={x0 + c * cellW} y={y0 + r * cellH} width={cellW} height={cellH} fill={fill} stroke="#64748b" strokeWidth="1.2" />
            <text
              x={x0 + c * cellW + cellW / 2}
              y={y0 + r * cellH + 23}
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
              fill={isQ ? '#dc2626' : '#1e293b'}
            >
              {isQ ? '?' : n}
            </text>
          </g>
        );
      })}
      <text x="150" y="174" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        4 sor, minden sorban 5 szám (1-től 20-ig).
      </text>
      <text x="150" y="192" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
        A ? helyén a 7 és a 14 bújik meg.
      </text>
    </svg>
  );
};

/** Oszlopos számláló ábra (0–10): kiszínezett téglalapok. */
export const BarCountChartSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const items = [
    { label: 'alma', count: 6, fill: '#fca5a5', stroke: '#b91c1c' },
    { label: 'körte', count: 4, fill: '#fde047', stroke: '#a16207' },
    { label: 'szilva', count: 9, fill: '#c4b5fd', stroke: '#6d28d9' },
    { label: 'dió', count: 5, fill: '#fdba74', stroke: '#c2410c' },
  ];
  const yBase = 148;
  const unitH = 12;
  return (
    <svg viewBox="0 0 340 196" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="194" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <line x1="42" y1="22" x2="42" y2={yBase} stroke="#475569" strokeWidth="1.8" />
      <line x1="42" y1={yBase} x2="318" y2={yBase} stroke="#475569" strokeWidth="1.8" />
      {[0, 2, 4, 6, 8, 10].map((v) => (
        <g key={v}>
          <line x1="37" y1={yBase - v * unitH} x2="314" y2={yBase - v * unitH} stroke="#fed7aa" strokeWidth="1" />
          <text x="32" y={yBase - v * unitH + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill="#7c2d12">{v}</text>
        </g>
      ))}
      {items.map((it, idx) => {
        const bx = 64 + idx * 64;
        return (
          <g key={it.label}>
            {Array.from({ length: 10 }, (_, k) => {
              const active = k < it.count;
              return (
                <rect
                  key={k}
                  x={bx}
                  y={yBase - (k + 1) * unitH}
                  width="36"
                  height={unitH}
                  fill={active ? it.fill : '#ffffff'}
                  stroke={active ? it.stroke : '#cbd5e1'}
                  strokeWidth="1.1"
                />
              );
            })}
            <text x={bx + 18} y={yBase + 16} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
              {it.label}
            </text>
            <text x={bx + 18} y={yBase + 31} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={it.stroke}>
              ({it.count} db)
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Darabszám (5 zászló) és sorszám (az 5. zászló) összehasonlítása. */
export const OrdinalRowSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const Flag: React.FC<{ x: number; y: number; fill: string; stroke: string; label?: string }> = ({ x, y, fill, stroke, label }) => (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 34} stroke="#334155" strokeWidth="2.2" />
      <polygon points={`${x},${y} ${x + 22},${y + 9} ${x},${y + 18}`} fill={fill} stroke={stroke} strokeWidth="1.5" />
      {label && (
        <text x={x + 8} y={y + 49} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">
          {label}
        </text>
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 360 166" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="164" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
      {/* Felső sor: 5 darab zászló */}
      <rect x="16" y="16" width="154" height="46" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.6" strokeDasharray="4 2" />
      {Array.from({ length: 7 }, (_, i) => (
        <Flag key={`t${i}`} x={26 + i * 30} y={22} fill={i < 5 ? '#3b82f6' : '#ffffff'} stroke={i < 5 ? '#1e3a8a' : '#64748b'} />
      ))}
      <text x="296" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">5 zászló</text>
      <text x="296" y="54" textAnchor="middle" fontSize="11" fill="#475569">(hány darab?)</text>

      <line x1="18" y1="78" x2="342" y2="78" stroke="#f5d0fe" strokeWidth="1.5" />

      {/* Alsó sor: az 5. zászló */}
      {Array.from({ length: 7 }, (_, i) => (
        <Flag
          key={`b${i}`}
          x={26 + i * 30}
          y={94}
          fill={i === 4 ? '#f43f5e' : '#ffffff'}
          stroke={i === 4 ? '#9f1239' : '#64748b'}
          label={`${i + 1}.`}
        />
      ))}
      <text x="296" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be123c">az 5. zászló</text>
      <text x="296" y="128" textAnchor="middle" fontSize="11" fill="#475569">(hányadik?)</text>
    </svg>
  );
};
