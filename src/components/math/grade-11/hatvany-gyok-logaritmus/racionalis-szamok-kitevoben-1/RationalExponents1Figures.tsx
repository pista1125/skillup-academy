import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Hatvány tört kitevővel SVG-ben: alap + kis betűs tört kitevő. */
const FracPow: React.FC<{ x: number; y: number; base: string; p: string; q: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  base,
  p,
  q,
  size = 16,
  fill = '#0f172a',
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fontWeight="bold" fill={fill}>
    {base}
    <tspan fontSize={size * 0.62} dy={-size * 0.45}>
      {p}/{q}
    </tspan>
  </text>
);

// 1. ábra: a népesség 1/3 évenként x-szeresére nő – három lépés egy év
export const PopulationThirdsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pts = [
    { x: 70, date: '2011. június', val: '6,98' },
    { x: 210, date: '2011. október', val: '6,98 · x' },
    { x: 350, date: '2012. február', val: '6,98 · x²' },
    { x: 490, date: '2012. június', val: '6,98 · x³' }
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A világ népessége (milliárd fő): egyenlő idők alatt ugyanannyiszoros növekedés
      </text>
      <line x1="50" y1="130" x2="515" y2="130" stroke="#475569" strokeWidth="2.5" />
      <polygon points="515,124 527,130 515,136" fill="#475569" />
      {pts.map((p, i) => (
        <g key={p.date}>
          <circle cx={p.x} cy="130" r="7" fill={i === 0 ? '#7c3aed' : '#a78bfa'} stroke="#4c1d95" strokeWidth="1.5" />
          <text x={p.x} y="160" fontSize="12" textAnchor="middle" fill="#334155">{p.date}</text>
          <text x={p.x} y="110" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{p.val}</text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M ${pts[i].x + 10} 82 Q ${(pts[i].x + pts[i + 1].x) / 2} 52 ${pts[i + 1].x - 10} 82`} fill="none" stroke="#db2777" strokeWidth="2" />
          <polygon points={`${pts[i + 1].x - 10},82 ${pts[i + 1].x - 20},76 ${pts[i + 1].x - 16},86`} fill="#db2777" />
          <text x={(pts[i].x + pts[i + 1].x) / 2} y="58" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#db2777">· x</text>
          <text x={(pts[i].x + pts[i + 1].x) / 2} y="184" fontSize="11" textAnchor="middle" fill="#64748b">1/3 év</text>
        </g>
      ))}
      <rect x="110" y="200" width="340" height="44" rx="10" fill="#ede9fe" stroke="#7c3aed" />
      <text x="280" y="228" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
        x³ = 1,011  ⇒  x = ∛1,011 ≈ 1,0037
      </text>
    </svg>
  );
};

// 2. ábra: a^(1/n) = n-edik gyök a – híd a hatvány és a gyök között
export const RootPowerBridgeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { base: '32', q: '5', root: '⁵√32', val: '2' },
    { base: '6,25', q: '2', root: '√6,25', val: '2,5' },
    { base: '0,0016', q: '4', root: '⁴√0,0016', val: '0,2' },
    { base: '0', q: '10', root: '¹⁰√0', val: '0' }
  ];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="150" y="18" width="260" height="46" rx="12" fill="#7c3aed" />
      <FracPow x={235} y={50} base="a" p="1" q="n" size={22} fill="#ffffff" />
      <text x="300" y="50" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#ffffff">=</text>
      <text x="355" y="50" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#ffffff">ⁿ√a</text>
      <text x="280" y="84" fontSize="11" textAnchor="middle" fill="#475569">a ≥ 0 valós szám, n &gt; 1 természetes szám</text>
      {rows.map((r, i) => (
        <g key={r.base}>
          <rect x="40" y={98 + i * 42} width="480" height="34" rx="8" fill={i % 2 ? '#ffffff' : '#f5f3ff'} stroke="#ddd6fe" />
          <FracPow x={140} y={121 + i * 42} base={r.base} p="1" q={r.q} size={15} fill="#4c1d95" />
          <text x="230" y={121 + i * 42} fontSize="15" textAnchor="middle" fill="#334155">=</text>
          <text x="320" y={121 + i * 42} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f766e">{r.root}</text>
          <text x="400" y={121 + i * 42} fontSize="15" textAnchor="middle" fill="#334155">=</text>
          <text x="460" y={121 + i * 42} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#db2777">{r.val}</text>
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: tavirózsák – a heti 1,3-szoros növekedés 7 egyforma napi lépésre bontva
export const WaterLilyGrowthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = Math.pow(1.3, 1 / 7);
  const vals = Array.from({ length: 8 }, (_, d) => 8 * Math.pow(k, d));
  const h = (v: number) => (v - 6) * 38;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Befedett terület (m²): naponta k-szoros, hetente 1,3-szoros
      </text>
      <line x1="50" y1="240" x2="530" y2="240" stroke="#475569" strokeWidth="2" />
      {vals.map((v, d) => {
        const x = 70 + d * 58;
        return (
          <g key={d}>
            <rect x={x} y={240 - h(v)} width="38" height={h(v)} rx="4" fill={d === 0 || d === 7 ? '#059669' : '#6ee7b7'} stroke="#047857" />
            <ellipse cx={x + 19} cy={240 - h(v) - 8} rx="12" ry="5" fill="#34d399" stroke="#047857" />
            <text x={x + 19} y={240 - h(v) - 18} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#065f46">
              {v.toFixed(2).replace('.', ',')}
            </text>
            <text x={x + 19} y="258" fontSize="11" textAnchor="middle" fill="#334155">{d}. nap</text>
            {d > 0 && (
              <text x={x - 10} y="275" fontSize="10" textAnchor="middle" fill="#db2777">· k</text>
            )}
          </g>
        );
      })}
      <text x="280" y="62" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">
        k⁷ = 1,3  ⇒  k = ⁷√1,3 ≈ 1,0382
      </text>
    </svg>
  );
};

// 4. ábra: zongora – egy oktáv 12 félhang, a frekvencia kétszeresére nő
export const SemitoneOctaveSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const whites = ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C′'];
  const blackAfter = [0, 1, 3, 4, 5];
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Egy oktáv = 12 félhang, és a frekvencia a kétszeresére nő
      </text>
      {whites.map((w, i) => (
        <g key={w}>
          <rect x={60 + i * 55} y="45" width="55" height="130" fill={i === 0 || i === 7 ? '#ede9fe' : i === 4 ? '#fce7f3' : '#ffffff'} stroke="#334155" strokeWidth="1.5" />
          <text x={87 + i * 55} y="165" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#334155">{w}</text>
        </g>
      ))}
      {blackAfter.map((b) => (
        <rect key={b} x={60 + b * 55 + 38} y="45" width="34" height="80" fill="#1e293b" />
      ))}
      <path d="M 87 190 Q 120 210 150 192" fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x="120" y="222" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">1 félhang: · q</text>
      <path d="M 87 186 Q 200 240 307 186" fill="none" stroke="#db2777" strokeWidth="2" strokeDasharray="5 3" />
      <text x="250" y="244" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#db2777">kvint (7 félhang): · q⁷ ≈ 1,498</text>
      <text x="460" y="205" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">q¹² = 2</text>
      <text x="460" y="228" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">q = ¹²√2 ≈ 1,0595</text>
    </svg>
  );
};

// 5. ábra: (a^(1/n))^n = a – a gyök és a hatvány „kioltja” egymást
export const RootCycleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="130" cy="115" r="52" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="130" y="112" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#4c1d95">1,011</text>
    <text x="130" y="134" fontSize="11" textAnchor="middle" fill="#6d28d9">egy év alatt</text>
    <circle cx="430" cy="115" r="52" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
    <text x="430" y="112" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#9d174d">≈ 1,0037</text>
    <text x="430" y="134" fontSize="11" textAnchor="middle" fill="#be185d">1/3 év alatt</text>
    <path d="M 185 92 Q 280 40 375 92" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
    <polygon points="375,92 362,88 368,78" fill="#7c3aed" />
    <FracPow x={280} y={52} base="( )" p="1" q="3" size={18} fill="#7c3aed" />
    <text x="280" y="74" fontSize="11" textAnchor="middle" fill="#6d28d9">köbgyökvonás</text>
    <path d="M 375 140 Q 280 192 185 140" fill="none" stroke="#db2777" strokeWidth="2.5" />
    <polygon points="185,140 198,144 192,154" fill="#db2777" />
    <text x="280" y="186" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#db2777">( )³</text>
    <text x="280" y="205" fontSize="11" textAnchor="middle" fill="#be185d">köbre emelés</text>
    <text x="280" y="122" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      (1,011
      <tspan fontSize="9" dy="-7">1/3</tspan>
      <tspan dy="7">)³ = 1,011</tspan>
    </text>
  </svg>
);
