import React from 'react';

type FigProps = { className?: string };
const DEFAULT_CLS = 'w-full h-auto max-w-xl mx-auto';

// Figure 1: A szinusz és koszinusz definíciója (tankönyv 13. oldal)
export const SinCosDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 520 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="512" height="252" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="260" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Hegyesszög szinusza és koszinusza
    </text>
    {/* Triangle: A(50,220) B(290,220) C(290,70) — right angle at B, alpha at A */}
    <polygon points="50,220 290,220 290,70" fill="#eef2ff" stroke="#4338ca" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 274 220 A 16 16 0 0 1 290 204" fill="none" stroke="#4338ca" strokeWidth="1.5" /><circle cx="283.8" cy="213.8" r="2" fill="#4338ca" />
    <path d="M 50 220 L 95 220 A 45 45 0 0 0 88.2 196.2 Z" fill="rgba(220,38,38,0.18)" />
    <path d="M 95 220 A 45 45 0 0 0 88.2 196.2" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="104" y="210" fontSize="14" fontWeight="bold" fill="#b91c1c">α</text>
    {/* Labels */}
    <text x="170" y="240" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0369a1">b (szög melletti befogó)</text>
    <text x="300" y="150" fontSize="13" fontWeight="bold" fill="#047857">a</text>
    <text x="300" y="166" fontSize="10" fill="#047857">(szemközti</text>
    <text x="300" y="179" fontSize="10" fill="#047857">befogó)</text>
    <text x="150" y="130" fontSize="13" fontWeight="bold" fill="#7c2d12" transform="rotate(-32 150 130)">c (átfogó)</text>
    {/* Formula box */}
    <rect x="372" y="80" width="130" height="120" rx="12" fill="#ffffff" stroke="#c7d2fe" strokeWidth="1.5" />
    <text x="437" y="112" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#047857">sin α = a / c</text>
    <text x="437" y="142" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0369a1">cos α = b / c</text>
    <text x="437" y="172" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#4338ca">tg α = a / b</text>
  </svg>
);

// Figure 2: 25 mm átfogójú derékszögű háromszögek (tankönyv 12. oldal, 1. feladat)
export const MillimeterHypotenuseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => {
  const R = 200;
  const ox = 60;
  const oy = 240;
  const angles = [10, 30, 50, 70];
  const colors = ['#dc2626', '#2563eb', '#059669', '#d97706'];
  return (
    <svg viewBox="0 0 320 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="312" height="262" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="160" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Átfogó mindig 25 mm – csak a szög változik
      </text>
      {/* mm grid */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v${i}`} x1={ox + i * 20} y1={40} x2={ox + i * 20} y2={oy} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1={ox} y1={oy - i * 20} x2={ox + 200} y2={oy - i * 20} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      <path d={`M ${ox + R} ${oy} A ${R} ${R} 0 0 0 ${ox} ${oy - R}`} fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
      {angles.map((a, i) => {
        const x = ox + R * Math.cos((a * Math.PI) / 180);
        const y = oy - R * Math.sin((a * Math.PI) / 180);
        return (
          <g key={a}>
            <line x1={ox} y1={oy} x2={x} y2={y} stroke={colors[i]} strokeWidth="2" />
            <line x1={x} y1={y} x2={x} y2={oy} stroke={colors[i]} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={x} cy={y} r="3" fill={colors[i]} />
            <text x={x + 6} y={y - 4} fontSize="10" fontWeight="bold" fill={colors[i]}>{a}°</text>
          </g>
        );
      })}
      <line x1={ox} y1={oy} x2={ox + 210} y2={oy} stroke="#334155" strokeWidth="1.5" />
      <text x={ox + 100} y={oy + 18} fontSize="10" textAnchor="middle" fill="#334155">szög melletti befogó = 25 · cos α</text>
      <text x={ox - 8} y={oy + 4} fontSize="10" textAnchor="end" fill="#334155">0</text>
    </svg>
  );
};

// Figure 3: Turistaút a hegycsúcsra (tankönyv 13. oldal, 3. feladat)
export const HikingPathSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="512" height="222" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
    <text x="260" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#14532d">
      500 m hosszú út, 15°-os emelkedéssel
    </text>
    <polygon points="40,190 470,190 470,75" fill="#dcfce7" stroke="#15803d" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 454 190 A 16 16 0 0 1 470 174" fill="none" stroke="#15803d" strokeWidth="1.5" /><circle cx="463.8" cy="183.8" r="2" fill="#15803d" />
    <path d="M 40 190 L 110 190 A 70 70 0 0 0 107.6 171.9" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="118" y="182" fontSize="13" fontWeight="bold" fill="#b91c1c">15°</text>
    <text x="250" y="118" fontSize="13" fontWeight="bold" fill="#166534" transform="rotate(-15 250 118)">500 m (út)</text>
    <text x="478" y="138" fontSize="12" fontWeight="bold" fill="#0f172a">m = ?</text>
    <text x="255" y="210" fontSize="12" textAnchor="middle" fill="#0f172a">vízszintes távolság (térképen 1 : 8000)</text>
    <circle cx="40" cy="190" r="5" fill="#b45309" />
    <text x="40" y="214" fontSize="11" textAnchor="middle" fill="#78350f">turistaház</text>
    <polygon points="470,75 462,60 478,60" fill="#78350f" />
    <text x="470" y="52" fontSize="11" textAnchor="middle" fill="#78350f">csúcs</text>
  </svg>
);

// Figure 4: Egyenlő szárú háromszög 14 cm-es szárakkal, 44°-os szárszöggel (13. oldal, 4. feladat)
export const IsoscelesApexSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 420 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="412" height="252" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
    <text x="210" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c2d12">
      Egyenlő szárú háromszög felezése a magassággal
    </text>
    <polygon points="210,45 125,225 295,225" fill="#ffedd5" stroke="#c2410c" strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="210" y1="45" x2="210" y2="225" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 226 225 A 16 16 0 0 0 210 209" fill="none" stroke="#2563eb" strokeWidth="1.5" /><circle cx="216.2" cy="218.8" r="2" fill="#2563eb" />
    <path d="M 192.9 81.2 A 40 40 0 0 0 227.1 81.2" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="210" y="100" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#b91c1c">22° | 22°</text>
    <text x="150" y="130" fontSize="13" fontWeight="bold" fill="#9a3412">14 cm</text>
    <text x="250" y="130" fontSize="13" fontWeight="bold" fill="#9a3412">14 cm</text>
    <text x="218" y="170" fontSize="12" fontWeight="bold" fill="#1d4ed8">m</text>
    <text x="167" y="245" fontSize="12" textAnchor="middle" fill="#0f172a">a/2</text>
    <text x="253" y="245" fontSize="12" textAnchor="middle" fill="#0f172a">a/2</text>
    <text x="340" y="120" fontSize="11" fill="#0f172a">a/2 = 14 · sin 22°</text>
    <text x="340" y="140" fontSize="11" fill="#0f172a">m = 14 · cos 22°</text>
  </svg>
);

// Figure 5: Számológép-billentyűk (tankönyv 13. oldal, Elmélet 3.)
export const CalculatorKeysSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => {
  const keys = [
    { label: 'sin', sub: 'szög → szinusz', x: 30, color: '#047857' },
    { label: 'cos', sub: 'szög → koszinusz', x: 150, color: '#0369a1' },
    { label: 'sin⁻¹', sub: 'szinusz → szög', x: 270, color: '#b45309' },
    { label: 'cos⁻¹', sub: 'koszinusz → szög', x: 390, color: '#7c3aed' }
  ];
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="512" height="162" rx="16" fill="#1e293b" />
      <rect x="380" y="16" width="120" height="26" rx="6" fill="#bbf7d0" />
      <text x="440" y="34" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#14532d">DEG (D) mód</text>
      <text x="24" y="34" fontSize="12" fontWeight="bold" fill="#e2e8f0">Ellenőrizd: fokokban számol a gép?</text>
      {keys.map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="60" width="100" height="50" rx="10" fill="#334155" stroke={k.color} strokeWidth="2.5" />
          <text x={k.x + 50} y="92" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#f8fafc">{k.label}</text>
          <text x={k.x + 50} y="135" fontSize="10.5" textAnchor="middle" fill="#cbd5e1">{k.sub}</text>
        </g>
      ))}
    </svg>
  );
};

// Figure 6: Téglalap átlója és oldala (12. oldal, 2. b) feladat)
export const RectangleDiagonalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 420 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="412" height="252" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
    <text x="210" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
      Téglalap: átló 20 cm, egyik oldal 17,3 cm
    </text>
    <rect x="60" y="40" width="300" height="173" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2.5" />
    <line x1="60" y1="213" x2="360" y2="40" stroke="#dc2626" strokeWidth="2.5" />
    <path d="M 110 213 A 50 50 0 0 0 103.3 188" fill="none" stroke="#b91c1c" strokeWidth="2" />
    <text x="116" y="204" fontSize="12" fontWeight="bold" fill="#b91c1c">α ≈ 30°</text>
    <text x="215" y="118" fontSize="13" fontWeight="bold" fill="#b91c1c" transform="rotate(-30 215 118)">20 cm</text>
    <text x="210" y="234" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">17,3 cm</text>
    <text x="366" y="130" fontSize="12" fill="#4c1d95">≈ 10 cm</text>
  </svg>
);
