import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const arcPath = (x: number, y: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return `M ${x + r} ${y} A ${r} ${r} 0 0 0 ${(x + r * Math.cos(rad)).toFixed(2)} ${(y - r * Math.sin(rad)).toFixed(2)}`;
};

const Key: React.FC<{ x: number; y: number; label: string; fill?: string; text?: string; w?: number }> = ({
  x,
  y,
  label,
  fill = '#e2e8f0',
  text = '#0f172a',
  w = 70
}) => (
  <g>
    <rect x={x} y={y} width={w} height="34" rx="8" fill={fill} stroke="#64748b" strokeWidth="1.2" />
    <text x={x + w / 2} y={y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill={text}>
      {label}
    </text>
  </g>
);

// 1. ábra: Számológép – DEG mód, tan és tan⁻¹ (2ndf / SHIFT) billentyűk
export const CalculatorKeysSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="150" y="20" width="260" height="268" rx="22" fill="#1e293b" />
    <rect x="170" y="38" width="220" height="70" rx="8" fill="#d9f99d" stroke="#65a30d" />
    <text x="180" y="54" fontSize="11" fontWeight="bold" fill="#365314">D</text>
    <text x="200" y="54" fontSize="10" fill="#4d7c0f">DEG</text>
    <text x="380" y="68" fontSize="14" textAnchor="end" fill="#1a2e05">tan 64</text>
    <text x="380" y="96" fontSize="20" textAnchor="end" fontWeight="bold" fill="#1a2e05">2,050303842</text>
    <Key x={172} y={124} label="2ndf" fill="#fbbf24" />
    <Key x={245} y={124} label="DRG" />
    <Key x={318} y={124} label="MODE" />
    <Key x={172} y={168} label="sin" />
    <Key x={245} y={168} label="cos" />
    <Key x={318} y={168} label="tan" fill="#60a5fa" text="#ffffff" />
    <Key x={172} y={212} label="7" />
    <Key x={245} y={212} label="8" />
    <Key x={318} y={212} label="9" />
    <Key x={245} y={250} label="=" fill="#34d399" />
    <text x="320" y="164" fontSize="10" fill="#fbbf24" fontWeight="bold">tan⁻¹</text>
    {/* magyarázó feliratok */}
    <text x="20" y="80" fontSize="11" fill="#334155" fontWeight="bold">1. Fok mód (D / DEG)</text>
    <line x1="140" y1="76" x2="172" y2="56" stroke="#334155" strokeWidth="1" />
    <text x="20" y="145" fontSize="11" fill="#b45309" fontWeight="bold">2ndf / SHIFT</text>
    <line x1="110" y1="141" x2="172" y2="141" stroke="#b45309" strokeWidth="1" />
    <text x="420" y="185" fontSize="11" fill="#1d4ed8" fontWeight="bold">tan: szög → tg</text>
    <text x="420" y="205" fontSize="11" fill="#b45309" fontWeight="bold">2ndf tan:</text>
    <text x="420" y="221" fontSize="11" fill="#b45309" fontWeight="bold">tg → szög</text>
  </svg>
);

// 2. ábra: A torony magassága mérési bizonytalansággal (36°–38°, 30 m)
export const TowerMeasurementRangeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 60, y: 250 };
  const d = 250;
  const C = { x: A.x + d, y: A.y };
  const h36 = d * Math.tan((36 * Math.PI) / 180);
  const h38 = d * Math.tan((38 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Mérési eredmények: 36° és 38° között
      </text>
      <line x1="30" y1={A.y} x2="530" y2={A.y} stroke="#94a3b8" strokeWidth="2" />
      <rect x={C.x - 10} y={A.y - h38} width="20" height={h38} fill="#e2e8f0" stroke="#64748b" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={A.y - h36} stroke="#2563eb" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={A.y - h38} stroke="#dc2626" strokeWidth="2" />
      <rect x={C.x - 14} y={A.y - h38} width="28" height={h38 - h36} fill="rgba(245,158,11,0.35)" stroke="#d97706" />
      <path d={arcPath(A.x, A.y, 60, 36)} fill="none" stroke="#2563eb" strokeWidth="1.8" />
      <path d={arcPath(A.x, A.y, 74, 38)} fill="none" stroke="#dc2626" strokeWidth="1.8" />
      <text x={A.x + 82} y={A.y - 30} fontSize="12" fontWeight="bold" fill="#1d4ed8">36°…38°</text>
      <text x={(A.x + C.x) / 2} y={A.y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#334155">30 m</text>
      <text x={C.x + 24} y={A.y - h38 - 4} fontSize="12" fontWeight="bold" fill="#b91c1c">30 · tg 38° ≈ 23,4 m</text>
      <text x={C.x + 24} y={A.y - h36 + 12} fontSize="12" fontWeight="bold" fill="#1d4ed8">30 · tg 36° ≈ 21,8 m</text>
      <text x={C.x + 24} y={A.y - h36 + 34} fontSize="11" fill="#b45309">bizonytalanság ≈ 1,6 m</text>
    </svg>
  );
};

// 3. ábra: Lejtő meredeksége százalékban – 9% ≈ 5°
export const SlopePercentSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 50, y: 220 };
  const w = 450;
  const rise = w * 0.09 * 3; // a függőleges irányt háromszorosan torzítjuk a láthatóság kedvéért
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        9%-os emelkedő: 100 m vízszintesen → 9 m emelkedés
      </text>
      <polygon
        points={`${A.x},${A.y} ${A.x + w},${A.y} ${A.x + w},${A.y - rise}`}
        fill="rgba(16,185,129,0.12)"
        stroke="#059669"
        strokeWidth="2"
      />
      <line x1={A.x} y1={A.y} x2={A.x + w} y2={A.y - rise} stroke="#334155" strokeWidth="5" strokeLinecap="round" />
      <text x={A.x + w / 2} y={A.y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">100 m</text>
      <text x={A.x + w + 8} y={A.y - rise / 2 + 4} fontSize="13" fontWeight="bold" fill="#047857">9 m</text>
      <path d={arcPath(A.x, A.y, 80, 15)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 90} y={A.y - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">α ≈ 5°</text>
      <rect x="70" y="50" width="250" height="56" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="195" y="72" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">tg α = 9 / 100 = 0,09</text>
      <text x="195" y="94" fontSize="12" textAnchor="middle" fill="#065f46">2ndf tan 0,09 ⇒ α ≈ 5,1°</text>
      <text x="530" y="262" fontSize="10" textAnchor="end" fill="#64748b">(a függőleges lépték torzított)</text>
    </svg>
  );
};

// 4. ábra: Téglalap alakú kert – 25 m-es oldal, átló szöge 39,5°–40,5°
export const GardenRectangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 80;
  const y0 = 230;
  const w = 360;
  const h = w * Math.tan((40 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="22" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A kert területe a mérési hibahatárokkal
      </text>
      <rect x={x0} y={y0 - h} width={w} height={h} fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0 - h} stroke="#15803d" strokeWidth="2.5" />
      <path d={arcPath(x0, y0, 60, 40)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={x0 + 68} y={y0 - 14} fontSize="12" fontWeight="bold" fill="#b91c1c">39,5°…40,5°</text>
      <text x={x0 + w / 2} y={y0 + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#15803d">25 m</text>
      <text x={x0 + w + 10} y={y0 - h / 2} fontSize="12" fontWeight="bold" fill="#15803d">25 · tg α</text>
      <text x={x0 + w + 10} y={y0 - h / 2 + 16} fontSize="11" fill="#15803d">≈ 20,6…21,4 m</text>
      <text x="280" y="268" fontSize="12" textAnchor="middle" fill="#334155">T ≈ 515 m² … 534 m²</text>
    </svg>
  );
};

// 5. ábra: Ráadás – lineáris interpoláció a négyjegyű függvénytáblázatban
export const InterpolationTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Lineáris interpoláció: tg 11,55° = tg 11° 33′
    </text>
    <rect x="40" y="44" width="230" height="130" rx="10" fill="#ffffff" stroke="#cbd5e1" />
    <text x="60" y="68" fontSize="12" fontWeight="bold" fill="#475569">szög</text>
    <text x="190" y="68" fontSize="12" fontWeight="bold" fill="#475569">tg</text>
    <line x1="50" y1="76" x2="260" y2="76" stroke="#e2e8f0" />
    <text x="60" y="100" fontSize="13" fill="#0f172a">11° 30′</text>
    <text x="190" y="100" fontSize="13" fill="#0f172a">0,2035</text>
    <text x="60" y="128" fontSize="13" fill="#b45309" fontWeight="bold">11° 33′</text>
    <text x="190" y="128" fontSize="13" fill="#b45309" fontWeight="bold">?</text>
    <text x="60" y="156" fontSize="13" fill="#0f172a">11° 36′</text>
    <text x="190" y="156" fontSize="13" fill="#0f172a">0,2053</text>
    <g fontSize="12" fill="#334155">
      <text x="300" y="70">6′ alatt: 0,2053 − 0,2035 = 0,0018</text>
      <text x="300" y="96">1′-re: 0,0018 : 6 = 0,0003</text>
      <text x="300" y="122">3′-re: 3 · 0,0003 = 0,0009</text>
      <text x="300" y="152" fontWeight="bold" fill="#047857">tg 11° 33′ ≈ 0,2035 + 0,0009</text>
      <text x="300" y="172" fontWeight="bold" fill="#047857">= 0,2044</text>
    </g>
    <text x="280" y="220" fontSize="11" textAnchor="middle" fill="#64748b">
      A számológép négy tizedesjegyre kerekítve ugyanezt adja: tg 11,55° ≈ 0,2044.
    </text>
  </svg>
);
