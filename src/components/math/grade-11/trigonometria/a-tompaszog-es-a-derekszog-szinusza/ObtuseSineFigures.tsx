import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Szögív az (x, y) csúcs körül d0 foktól d1 fokig (matematikai pozitív irány, képernyőn felfelé). */
const arcBetween = (x: number, y: number, r: number, d0: number, d1: number) => {
  const sx = x + r * Math.cos(toRad(d0));
  const sy = y - r * Math.sin(toRad(d0));
  const ex = x + r * Math.cos(toRad(d1));
  const ey = y - r * Math.sin(toRad(d1));
  const large = Math.abs(d1 - d0) > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. */
const RightAngleMark: React.FC<{
  x: number;
  y: number;
  size?: number;
  dir?: 'left-up' | 'right-up';
  color?: string;
}> = ({ x, y, size = 13, dir = 'left-up', color = '#475569' }) => {
  const u1 = { x: dir === 'left-up' ? -1 : 1, y: 0 };
  const u2 = { x: 0, y: -1 };
  const cross = u1.x * u2.y - u1.y * u2.x;
  const sweep = cross > 0 ? 1 : 0;
  const bis = { x: (u1.x + u2.x) / Math.SQRT2, y: (u1.y + u2.y) / Math.SQRT2 };
  return (
    <g>
      <path
        d={`M ${x + size * u1.x} ${y + size * u1.y} A ${size} ${size} 0 0 ${sweep} ${x + size * u2.x} ${y + size * u2.y}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={x + 0.55 * size * bis.x} cy={y + 0.55 * size * bis.y} r="1.8" fill={color} />
    </g>
  );
};

// 1. ábra: Kidolgozott feladat – 26 cm és 45 cm, közbezárt szög 52°, illetve 128°
export const ObtuseAreaPairSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 4; // 1 cm ≙ 4 px
  const P1 = { x: 40, y: 240 };
  const Q1 = { x: P1.x + 45 * k, y: 240 };
  const R1 = { x: P1.x + 26 * k * Math.cos(toRad(52)), y: P1.y - 26 * k * Math.sin(toRad(52)) };
  const P2 = { x: 370, y: 240 };
  const Q2 = { x: P2.x + 45 * k, y: 240 };
  const R2 = { x: P2.x + 26 * k * Math.cos(toRad(128)), y: P2.y - 26 * k * Math.sin(toRad(128)) };
  return (
    <svg viewBox="0 0 580 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Ugyanaz a két oldal, 52° vagy 128° – ugyanakkora terület
      </text>
      {/* a) hegyesszögű */}
      <text x="140" y="60" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">a) γ = 52°</text>
      <polygon
        points={`${P1.x},${P1.y} ${Q1.x},${Q1.y} ${R1.x},${R1.y}`}
        fill="rgba(59,130,246,0.12)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <line x1={R1.x} y1={R1.y} x2={R1.x} y2={P1.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
      <RightAngleMark x={R1.x} y={P1.y} dir="right-up" />
      <path d={arcBetween(P1.x, P1.y, 26, 0, 52)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={P1.x + 30} y={P1.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">52°</text>
      <text x={(P1.x + Q1.x) / 2} y={P1.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">45 cm</text>
      <text x={(P1.x + R1.x) / 2 - 30} y={(P1.y + R1.y) / 2} fontSize="12" fontWeight="bold" fill="#1d4ed8">26 cm</text>
      <text x={R1.x + 6} y={(P1.y + R1.y) / 2 + 14} fontSize="12" fontWeight="bold" fill="#047857">m</text>

      {/* b) tompaszögű */}
      <text x="430" y="60" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c3aed">b) γ = 128°</text>
      <line x1={R2.x - 10} y1={P2.y} x2={P2.x} y2={P2.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <polygon
        points={`${P2.x},${P2.y} ${Q2.x},${Q2.y} ${R2.x},${R2.y}`}
        fill="rgba(139,92,246,0.12)"
        stroke="#7c3aed"
        strokeWidth="2"
      />
      <line x1={R2.x} y1={R2.y} x2={R2.x} y2={P2.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
      <RightAngleMark x={R2.x} y={P2.y} dir="right-up" />
      <path d={arcBetween(P2.x, P2.y, 22, 0, 128)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={P2.x + 4} y={P2.y - 28} fontSize="12" fontWeight="bold" fill="#b91c1c">128°</text>
      <path d={arcBetween(P2.x, P2.y, 34, 128, 180)} fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x={P2.x - 52} y={P2.y - 6} fontSize="11" fontWeight="bold" fill="#b45309">52°</text>
      <text x={(P2.x + Q2.x) / 2} y={P2.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#6d28d9">45 cm</text>
      <text x={(P2.x + R2.x) / 2 + 12} y={(P2.y + R2.y) / 2 - 6} fontSize="12" fontWeight="bold" fill="#6d28d9">26 cm</text>
      <text x={R2.x - 18} y={(P2.y + R2.y) / 2 + 14} fontSize="12" fontWeight="bold" fill="#047857">m</text>

      <text x="290" y="282" fontSize="12" textAnchor="middle" fill="#334155">
        m = 26 · sin 52° ≈ 20,5 cm, T = 45 · 26 · sin 52° / 2 ≈ 461 cm² mindkét esetben
      </text>
    </svg>
  );
};

// 2. ábra: A két háromszög egymás mellett (tankönyvi megjegyzés)
export const SideBySideTrianglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 4;
  const C = { x: 290, y: 230 };
  const A = { x: C.x + 45 * k, y: 230 };
  const D = { x: C.x - 45 * k, y: 230 };
  const B = { x: C.x + 26 * k * Math.cos(toRad(52)), y: C.y - 26 * k * Math.sin(toRad(52)) };
  return (
    <svg viewBox="0 0 580 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Közös oldal, közös magasság: a két terület egyenlő
      </text>
      <polygon points={`${D.x},${D.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="rgba(139,92,246,0.14)" stroke="#7c3aed" strokeWidth="2" />
      <polygon points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="rgba(59,130,246,0.14)" stroke="#2563eb" strokeWidth="2" />
      <line x1={B.x} y1={B.y} x2={B.x} y2={C.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
      <RightAngleMark x={B.x} y={C.y} dir="right-up" />
      <path d={arcBetween(C.x, C.y, 24, 0, 52)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={C.x + 28} y={C.y - 8} fontSize="12" fontWeight="bold" fill="#1d4ed8">52°</text>
      <path d={arcBetween(C.x, C.y, 18, 52, 180)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={C.x - 50} y={C.y - 18} fontSize="12" fontWeight="bold" fill="#6d28d9">128°</text>
      <text x={(D.x + C.x) / 2} y={C.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#6d28d9">45 cm</text>
      <text x={(C.x + A.x) / 2} y={C.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">45 cm</text>
      <text x={(C.x + B.x) / 2 - 34} y={(C.y + B.y) / 2 - 4} fontSize="12" fontWeight="bold" fill="#0f172a">26 cm</text>
      <text x={B.x + 6} y={(B.y + C.y) / 2 + 10} fontSize="12" fontWeight="bold" fill="#047857">m</text>
      <text x={D.x} y={D.y + 20} fontSize="12" textAnchor="middle" fill="#334155">D</text>
      <text x={C.x} y={C.y + 36} fontSize="12" textAnchor="middle" fill="#334155">C</text>
      <text x={A.x} y={A.y + 20} fontSize="12" textAnchor="middle" fill="#334155">A</text>
      <text x={B.x} y={B.y - 8} fontSize="12" textAnchor="middle" fill="#334155">B</text>
    </svg>
  );
};

// 3. ábra: Az elméleti rész ábrája – ABC (tompaszögű) és CBD háromszög, sin γ = sin(180° − γ)
export const SupplementarySineDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const gamma = 125;
  const C = { x: 300, y: 220 };
  const A = { x: 470, y: 220 };
  const D = { x: 130, y: 220 };
  const B = { x: C.x + 150 * Math.cos(toRad(gamma)), y: C.y - 150 * Math.sin(toRad(gamma)) };
  return (
    <svg viewBox="0 0 580 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        T(ABC) = T(CBD) ⇒ sin γ = sin (180° − γ)
      </text>
      <polygon points={`${D.x},${D.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="rgba(16,185,129,0.14)" stroke="#059669" strokeWidth="2" />
      <polygon points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="rgba(244,63,94,0.10)" stroke="#e11d48" strokeWidth="2" />
      <line x1={B.x} y1={B.y} x2={B.x} y2={C.y} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d={arcBetween(C.x, C.y, 26, 0, gamma)} fill="none" stroke="#e11d48" strokeWidth="2" />
      <text x={C.x + 22} y={C.y - 26} fontSize="13" fontWeight="bold" fill="#be123c">γ</text>
      <path d={arcBetween(C.x, C.y, 38, gamma, 180)} fill="none" stroke="#059669" strokeWidth="2" />
      <text x={C.x - 100} y={C.y - 10} fontSize="12" fontWeight="bold" fill="#047857">180° − γ</text>
      <text x={(D.x + C.x) / 2} y={C.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">b</text>
      <text x={(C.x + A.x) / 2} y={C.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#be123c">b</text>
      <text x={(C.x + B.x) / 2 + 10} y={(C.y + B.y) / 2 - 2} fontSize="13" fontWeight="bold" fill="#0f172a">a</text>
      <text x={D.x - 4} y={D.y + 20} fontSize="12" textAnchor="middle" fill="#334155">D</text>
      <text x={C.x} y={C.y + 36} fontSize="12" textAnchor="middle" fill="#334155">C</text>
      <text x={A.x + 4} y={A.y + 20} fontSize="12" textAnchor="middle" fill="#334155">A</text>
      <text x={B.x} y={B.y - 8} fontSize="12" textAnchor="middle" fill="#334155">B</text>
      <text x="290" y="262" fontSize="12" textAnchor="middle" fill="#334155">
        Közös a magasság és egyenlő az alap (AC = CD = b) ⇒ a két terület egyenlő
      </text>
    </svg>
  );
};

// 4. ábra: Derékszögű háromszög – T = ab / 2, ezért sin 90° = 1
export const RightAngleSineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 150, y: 220 };
  const A = { x: 430, y: 220 };
  const B = { x: 150, y: 70 };
  return (
    <svg viewBox="0 0 580 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A derékszög szinusza
      </text>
      <polygon points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="rgba(245,158,11,0.12)" stroke="#d97706" strokeWidth="2" />
      <RightAngleMark x={C.x} y={C.y} size={16} dir="right-up" />
      <text x={C.x + 22} y={C.y - 22} fontSize="13" fontWeight="bold" fill="#b45309">γ = 90°</text>
      <text x={C.x - 18} y={(C.y + B.y) / 2} fontSize="14" fontWeight="bold" fill="#92400e">a</text>
      <text x={(C.x + A.x) / 2} y={C.y + 22} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#92400e">b</text>
      <rect x="330" y="62" width="220" height="70" rx="10" fill="#ffffff" stroke="#fcd34d" />
      <text x="440" y="88" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#78350f">T = a · b / 2</text>
      <text x="440" y="114" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#78350f">T = a · b · sin 90° / 2</text>
      <text x="440" y="160" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#b45309">⇒ sin 90° = 1</text>
    </svg>
  );
};

// 5. ábra: A sin⁻¹ funkció csak a hegyesszöget adja meg – a tompaszög a kiegészítő szög
export const SineInverseTwoAnglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 290, y: 220 };
  const r = 160;
  const alpha = 35;
  const P = { x: O.x + r * Math.cos(toRad(alpha)), y: O.y - r * Math.sin(toRad(alpha)) };
  const Q = { x: O.x - r * Math.cos(toRad(alpha)), y: P.y };
  return (
    <svg viewBox="0 0 580 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Két szög, ugyanaz a szinusz: α és 180° − α
      </text>
      <line x1={O.x - r - 20} y1={O.y} x2={O.x + r + 20} y2={O.y} stroke="#94a3b8" strokeWidth="1.5" />
      <path d={`M ${O.x + r} ${O.y} A ${r} ${r} 0 0 0 ${O.x - r} ${O.y}`} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#2563eb" strokeWidth="2.5" />
      <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#7c3aed" strokeWidth="2.5" />
      <line x1={Q.x} y1={Q.y} x2={P.x} y2={P.y} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />
      <line x1={P.x} y1={P.y} x2={P.x} y2={O.y} stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
      <line x1={Q.x} y1={Q.y} x2={Q.x} y2={O.y} stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
      <path d={arcBetween(O.x, O.y, 36, 0, alpha)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={O.x + 42} y={O.y - 6} fontSize="12" fontWeight="bold" fill="#1d4ed8">α</text>
      <path d={arcBetween(O.x, O.y, 24, 0, 180 - alpha)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={O.x - 30} y={O.y - 30} fontSize="12" fontWeight="bold" fill="#6d28d9">180° − α</text>
      <circle cx={P.x} cy={P.y} r="4" fill="#2563eb" />
      <circle cx={Q.x} cy={Q.y} r="4" fill="#7c3aed" />
      <text x={P.x + 8} y={P.y - 6} fontSize="12" fontWeight="bold" fill="#1d4ed8">sin⁻¹: hegyesszög</text>
      <text x={Q.x - 8} y={Q.y - 6} fontSize="12" fontWeight="bold" fill="#6d28d9" textAnchor="end">tompaszög</text>
      <text x="290" y="250" fontSize="12" textAnchor="middle" fill="#334155">
        Azonos magasság ⇒ sin 35° = sin 145° ≈ 0,574
      </text>
    </svg>
  );
};
