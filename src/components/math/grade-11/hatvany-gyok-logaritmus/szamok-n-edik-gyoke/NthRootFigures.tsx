import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** Gyökjel SVG-ben: gyökkitevő (index), gyökjel és a gyök alatti kifejezés. */
const RootSign: React.FC<{ x: number; y: number; index?: string; radicand: string; size?: number; color?: string }> = ({
  x,
  y,
  index,
  radicand,
  size = 18,
  color = '#0f172a'
}) => {
  const w = radicand.length * size * 0.6 + 6;
  const h = size * 1.15;
  return (
    <g>
      {index && (
        <text x={x - 2} y={y - h * 0.45} fontSize={size * 0.6} fontWeight="bold" textAnchor="end" fill="#be185d">
          {index}
        </text>
      )}
      <path
        d={`M ${x - 8} ${y - h * 0.35} L ${x - 4} ${y - h * 0.45} L ${x + 1} ${y + 2} L ${x + 6} ${y - h} L ${x + 8 + w} ${y - h}`}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <text x={x + 10} y={y - 1} fontSize={size} fontWeight="bold" fill={color}>
        {radicand}
      </text>
    </g>
  );
};

/** Kidolgozott 1–2. feladat: kocka élének kiszámítása felszínből és térfogatból. */
export const NthRootCubeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cube = (ox: number, oy: number, s: number, fill: string, label: string, sub: string, res: React.ReactNode) => (
    <g>
      <polygon points={`${ox},${oy} ${ox + s},${oy} ${ox + s},${oy + s} ${ox},${oy + s}`} fill={fill} stroke="#334155" strokeWidth="1.5" />
      <polygon points={`${ox},${oy} ${ox + s * 0.4},${oy - s * 0.35} ${ox + s * 1.4},${oy - s * 0.35} ${ox + s},${oy}`} fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
      <polygon points={`${ox + s},${oy} ${ox + s * 1.4},${oy - s * 0.35} ${ox + s * 1.4},${oy + s * 0.65} ${ox + s},${oy + s}`} fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
      <text x={ox + s / 2} y={oy + s + 18} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#be185d">
        a = ?
      </text>
      <text x={ox + s * 0.7} y={oy + s + 40} fontSize="13" textAnchor="middle" fill="#0f172a">
        {label}
      </text>
      <text x={ox + s * 0.7} y={oy + s + 58} fontSize="12" textAnchor="middle" fill="#475569">
        {sub}
      </text>
      {res}
    </g>
  );
  return (
    <Frame title="Kocka éle a felszínből és a térfogatból" h={250} className={className}>
      {cube(
        60,
        80,
        80,
        '#fce7f3',
        'A = 6a² = 102 cm²',
        'a² = 17',
        <g>
          <text x="96" y="232" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="end">
            a =
          </text>
          <RootSign x={110} y={232} radicand="17" size={15} />
          <text x="142" y="232" fontSize="13" fontWeight="bold" fill="#0f172a">
            ≈ 4,12 cm
          </text>
        </g>
      )}
      {cube(
        330,
        80,
        80,
        '#ede9fe',
        'V = a³ = 45 cm³',
        '3,5³ < 45 < 3,6³',
        <g>
          <text x="366" y="232" fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="end">
            a =
          </text>
          <RootSign x={382} y={232} index="3" radicand="45" size={15} />
          <text x="414" y="232" fontSize="13" fontWeight="bold" fill="#0f172a">
            ≈ 3,56 cm
          </text>
        </g>
      )}
    </Frame>
  );
};

/** Az n-edik gyök jelölése és definíciója. */
export const NthRootDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Az n-edik gyök: ⁿ√a az a szám, amelynek n-edik hatványa a" h={250} className={className}>
    <RootSign x={110} y={95} index="n" radicand="a" size={34} />
    <line x1="60" y1="50" x2="96" y2="62" stroke="#be185d" strokeWidth="1" />
    <text x="55" y="48" fontSize="12" textAnchor="end" fill="#be185d">
      gyökkitevő
    </text>
    <line x1="150" y1="110" x2="132" y2="96" stroke="#7c3aed" strokeWidth="1" />
    <text x="155" y="122" fontSize="12" fill="#7c3aed">
      alap (gyök alatti szám)
    </text>
    <text x="210" y="80" fontSize="13" fill="#0f172a">
      n ∈ N⁺ \ {'{1}'}
    </text>
    <rect x="25" y="140" width="250" height="95" rx="12" fill="#ecfdf5" stroke="#10b981" />
    <text x="150" y="162" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#047857">
      n páros: csak a ≥ 0 esetén
    </text>
    <text x="150" y="184" fontSize="12" textAnchor="middle" fill="#0f172a">
      ⁿ√a ≥ 0, és (ⁿ√a)ⁿ = a
    </text>
    <text x="150" y="206" fontSize="12" textAnchor="middle" fill="#0f172a">
      ⁴√81 = 3, mert 3⁴ = 81
    </text>
    <text x="150" y="226" fontSize="12" textAnchor="middle" fill="#0f172a">
      ⁶√0,015625 = 0,5
    </text>
    <rect x="290" y="140" width="250" height="95" rx="12" fill="#eff6ff" stroke="#3b82f6" />
    <text x="415" y="162" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">
      n páratlan: minden valós a-ra
    </text>
    <text x="415" y="184" fontSize="12" textAnchor="middle" fill="#0f172a">
      ⁿ√a előjele = a előjele
    </text>
    <text x="415" y="206" fontSize="12" textAnchor="middle" fill="#0f172a">
      ∛−216 = −6, mert (−6)³ = −216
    </text>
    <text x="415" y="226" fontSize="12" textAnchor="middle" fill="#0f172a">
      ⁵√−0,03125 = −0,5; ⁷√128 = 2
    </text>
    <text x="420" y="60" fontSize="12" fill="#475569">
      √64 = ²√64 = 8
    </text>
    <text x="420" y="80" fontSize="12" fill="#475569">
      ∛64 = 4 („köbgyök”)
    </text>
    <text x="420" y="100" fontSize="12" fill="#475569">
      ⁿ√0 = 0
    </text>
  </Frame>
);

const plotPath = (f: (x: number) => number, x0: number, x1: number, toS: (x: number, y: number) => [number, number], yMin: number, yMax: number) => {
  let d = '';
  let pen = false;
  for (let i = 0; i <= 200; i++) {
    const x = x0 + ((x1 - x0) * i) / 200;
    const y = f(x);
    if (y < yMin || y > yMax) {
      pen = false;
      continue;
    }
    const [sx, sy] = toS(x, y);
    d += `${pen ? 'L' : 'M'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
    pen = true;
  }
  return d;
};

/** Páros és páratlan kitevő: y = x⁴ és y = x³ metszése vízszintes egyenessel. */
export const NthRootEvenOddSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const panel = (ox: number, n: number, a: number, title: string, color: string, note: string) => {
    const k = 40;
    const toS = (x: number, y: number): [number, number] => [ox + 120 + x * k, 150 - y * 10];
    const roots = n % 2 === 0 ? (a > 0 ? [-Math.pow(a, 1 / n), Math.pow(a, 1 / n)] : a === 0 ? [0] : []) : [Math.sign(a) * Math.pow(Math.abs(a), 1 / n)];
    return (
      <g>
        <text x={ox + 120} y="52" fontSize="13" fontWeight="bold" textAnchor="middle" fill={color}>
          {title}
        </text>
        <line x1={ox + 10} y1="150" x2={ox + 230} y2="150" stroke="#94a3b8" />
        <line x1={ox + 120} y1="60" x2={ox + 120} y2="240" stroke="#94a3b8" />
        <path d={plotPath((x) => Math.pow(x, n), -2.6, 2.6, toS, -9, 9)} fill="none" stroke={color} strokeWidth="2.5" />
        <line x1={ox + 10} y1={150 - a * 10} x2={ox + 230} y2={150 - a * 10} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={ox + 228} y={145 - a * 10} fontSize="11" textAnchor="end" fill="#b45309">
          y = {String(a).replace('-', '−')}
        </text>
        {roots.map((r, i) => {
          const [sx, sy] = toS(r, a);
          return <circle key={i} cx={sx} cy={sy} r="4.5" fill="#be185d" />;
        })}
        <text x={ox + 120} y="258" fontSize="11" textAnchor="middle" fill="#475569">
          {note}
        </text>
      </g>
    );
  };
  return (
    <Frame title="Páros és páratlan gyökkitevő" h={270} className={className}>
      {panel(30, 4, 5, 'y = x⁴ (páros kitevő)', '#059669', 'x⁴ = 5: két megoldás, ±⁴√5; x⁴ = −5: nincs')}
      {panel(290, 3, -5, 'y = x³ (páratlan kitevő)', '#2563eb', 'x³ = −5: pontosan egy megoldás, ∛−5')}
    </Frame>
  );
};

/** Kidolgozott 3. feladat: Magyarország népessége 2001 és 2021 között. */
export const NthRootPopulationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P0 = 10.2;
  const q = Math.pow(0.95, 1 / 20);
  const bars = Array.from({ length: 21 }, (_, i) => P0 * Math.pow(q, i));
  const toY = (p: number) => 220 - (p - 9.5) * 200;
  return (
    <Frame title="Átlagos évi fogyás: Pₙ = P₀ · (1 + r)ⁿ" h={260} className={className}>
      <line x1="50" y1="220" x2="530" y2="220" stroke="#94a3b8" />
      {bars.map((p, i) => (
        <rect key={i} x={60 + i * 22} y={toY(p)} width="16" height={220 - toY(p)} rx="2" fill={i === 0 || i === 20 ? '#be185d' : '#f9a8d4'} />
      ))}
      <text x="68" y={toY(P0) - 6} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9d174d">
        10,2 M
      </text>
      <text x="508" y={toY(9.7) - 6} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9d174d">
        9,7 M
      </text>
      <text x="68" y="238" fontSize="11" textAnchor="middle" fill="#475569">
        2001
      </text>
      <text x="508" y="238" fontSize="11" textAnchor="middle" fill="#475569">
        2021
      </text>
      <text x="290" y="60" fontSize="13" textAnchor="middle" fill="#0f172a">
        9,7 · 10⁶ = 10,2 · 10⁶ · (1 + r)²⁰ ⇒ (1 + r)²⁰ ≈ 0,95
      </text>
      <text x="290" y="82" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#be185d">
        1 + r = ²⁰√0,95 ≈ 0,9974 ⇒ r ≈ −0,26% évente
      </text>
      <text x="290" y="252" fontSize="10" textAnchor="middle" fill="#475569">
        (a függőleges tengely 9,5 millió főnél kezdődik)
      </text>
    </Frame>
  );
};

/** 4. feladat: a hidroglóbusz gömb alakú tartálya. */
export const NthRootSphereSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Víztorony (hidroglóbusz): V = 113 m³" h={260} className={className}>
    <rect x="140" y="150" width="20" height="95" fill="#94a3b8" />
    <circle cx="150" cy="105" r="65" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
    <ellipse cx="150" cy="105" rx="65" ry="16" fill="none" stroke="#2563eb" strokeDasharray="5 4" />
    <line x1="150" y1="105" x2="215" y2="105" stroke="#be185d" strokeWidth="2" />
    <circle cx="150" cy="105" r="3" fill="#0f172a" />
    <text x="182" y="98" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#be185d">
      R = ?
    </text>
    <text x="270" y="80" fontSize="13" fill="#0f172a">
      V = 4πR³ / 3 = 113 m³
    </text>
    <text x="270" y="108" fontSize="13" fill="#0f172a">
      R³ = 3V / (4π)
    </text>
    <text x="270" y="140" fontSize="13" fontWeight="bold" fill="#be185d">
      R = ∛(3V / (4π))
    </text>
    <text x="270" y="172" fontSize="13" fill="#0f172a">
      Burkolat: A = 4πR²
    </text>
  </Frame>
);
