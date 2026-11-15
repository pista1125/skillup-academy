import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Egységvektor P-ből Q felé (képernyő-koordinátákban). */
const unit = (P: Pt, Q: Pt): Pt => {
  const l = Math.hypot(Q.x - P.x, Q.y - P.y) || 1;
  return { x: (Q.x - P.x) / l, y: (Q.y - P.y) / l };
};

/** Szögív a V csúcsnál, a V→P iránytól a V→Q irányig (a rövidebbik íven). */
const angleArc = (V: Pt, P: Pt, Q: Pt, r: number) => {
  const u1 = unit(V, P);
  const u2 = unit(V, Q);
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  return `M ${(V.x + r * u1.x).toFixed(2)} ${(V.y + r * u1.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * u2.x).toFixed(2)} ${(V.y + r * u2.y).toFixed(2)}`;
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. */
const RightAngleArc: React.FC<{ V: Pt; P: Pt; Q: Pt; r?: number; color?: string }> = ({
  V,
  P,
  Q,
  r = 14,
  color = '#475569'
}) => {
  const u1 = unit(V, P);
  const u2 = unit(V, Q);
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bl = Math.hypot(bx, by) || 1;
  const k = 0.45 * r * Math.SQRT2;
  return (
    <g>
      <path d={angleArc(V, P, Q, r)} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={V.x + (k * bx) / bl} cy={V.y + (k * by) / bl} r="1.8" fill={color} />
    </g>
  );
};

const City: React.FC<{ p: Pt; name: string; dx?: number; dy?: number; anchor?: 'start' | 'middle' | 'end' }> = ({
  p,
  name,
  dx = 0,
  dy = -10,
  anchor = 'middle'
}) => (
  <g>
    <circle cx={p.x} cy={p.y} r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
    <text x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" textAnchor={anchor} fill="#0f172a">
      {name}
    </text>
  </g>
);

// 1. ábra: Bevezető – Budapest, Bécs, Zágráb
export const FlightMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 0.75;
  const Bp = { x: 430, y: 70 };
  const Bec = { x: Bp.x + 233 * s * Math.cos(toRad(170)), y: Bp.y - 233 * s * Math.sin(toRad(170)) };
  const Zg = { x: Bp.x + 309 * s * Math.cos(toRad(230.9)), y: Bp.y - 309 * s * Math.sin(toRad(230.9)) };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
      <text x="110" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Két kisrepülőgép útja
      </text>
      <line x1={Bp.x} y1={Bp.y} x2={Bec.x} y2={Bec.y} stroke="#2563eb" strokeWidth="2.5" />
      <line x1={Bp.x} y1={Bp.y} x2={Zg.x} y2={Zg.y} stroke="#2563eb" strokeWidth="2.5" />
      <line x1={Bec.x} y1={Bec.y} x2={Zg.x} y2={Zg.y} stroke="#059669" strokeWidth="2.5" strokeDasharray="7 5" />
      <path d={angleArc(Bp, Bec, Zg, 44)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={Bp.x - 62} y={Bp.y + 36} fontSize="13" fontWeight="bold" fill="#b91c1c">60,9°</text>
      <text x={(Bp.x + Bec.x) / 2} y={(Bp.y + Bec.y) / 2 - 10} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
        233 km
      </text>
      <text x={(Bp.x + Zg.x) / 2 + 40} y={(Bp.y + Zg.y) / 2 + 10} fontSize="13" fontWeight="bold" fill="#1d4ed8">309 km</text>
      <text x={(Bec.x + Zg.x) / 2 - 12} y={(Bec.y + Zg.y) / 2} fontSize="14" textAnchor="end" fontWeight="bold" fill="#047857">
        c = ?
      </text>
      <City p={Bp} name="Budapest" dx={10} dy={-10} anchor="start" />
      <City p={Bec} name="Bécs" dy={-12} />
      <City p={Zg} name="Zágráb" dy={22} />
      <rect x="320" y="230" width="225" height="52" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="432" y="252" fontSize="12" textAnchor="middle" fill="#065f46">c² = 233² + 309² − 2 · 233 · 309 · cos 60,9°</text>
      <text x="432" y="272" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">c ≈ 282 km</text>
    </svg>
  );
};

// 2. ábra: A levezetés – a háromszög felbontása egy magassággal
export const CosineLawDerivationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 0.9;
  const Bp = { x: 480, y: 235 };
  const Zg = { x: Bp.x - 309 * s, y: Bp.y };
  const Bec = { x: Bp.x - 233 * s * Math.cos(toRad(60.9)), y: Bp.y - 233 * s * Math.sin(toRad(60.9)) };
  const T = { x: Bec.x, y: Bp.y };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="110" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Felbontás két derékszögű
      </text>
      <text x="110" y="48" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        háromszögre
      </text>
      <polygon points={`${Zg.x},${Zg.y} ${T.x},${T.y} ${Bec.x},${Bec.y}`} fill="rgba(16,185,129,0.12)" stroke="#059669" strokeWidth="2" />
      <polygon points={`${T.x},${T.y} ${Bp.x},${Bp.y} ${Bec.x},${Bec.y}`} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
      <line x1={Bec.x} y1={Bec.y} x2={T.x} y2={T.y} stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
      <RightAngleArc V={T} P={Bp} Q={Bec} />
      <path d={angleArc(Bp, Zg, Bec, 36)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={Bp.x - 56} y={Bp.y - 12} fontSize="12" fontWeight="bold" fill="#b91c1c">60,9°</text>
      <text x={T.x + 8} y={(T.y + Bec.y) / 2} fontSize="14" fontWeight="bold" fill="#6d28d9">h</text>
      <text x={(T.x + Bp.x) / 2} y={Bp.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">x</text>
      <text x={(Zg.x + T.x) / 2} y={Bp.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">309 − x</text>
      <text x={(Bp.x + Bec.x) / 2 + 12} y={(Bp.y + Bec.y) / 2} fontSize="13" fontWeight="bold" fill="#1d4ed8">233</text>
      <text x={(Zg.x + Bec.x) / 2 - 10} y={(Zg.y + Bec.y) / 2} fontSize="14" textAnchor="end" fontWeight="bold" fill="#047857">c</text>
      <rect x="20" y="70" width="190" height="96" rx="10" fill="#ffffff" stroke="#ddd6fe" />
      <text x="115" y="92" fontSize="11" textAnchor="middle" fill="#4c1d95">c² = h² + (309 − x)²</text>
      <text x="115" y="112" fontSize="11" textAnchor="middle" fill="#4c1d95">h² + x² = 233²</text>
      <text x="115" y="132" fontSize="11" textAnchor="middle" fill="#4c1d95">x = 233 · cos 60,9°</text>
      <text x="115" y="154" fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#4c1d95">c² = 233² + 309² − 2·309·233·cos 60,9°</text>
    </svg>
  );
};

// 3. ábra: A koszinusztétel általános alakja
export const CosineLawGeneralSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 70, y: 230 };
  const B = { x: 470, y: 230 };
  const C = { x: 330, y: 60 };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="4" />
      <path d={angleArc(C, A, B, 34)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={C.x - 4} y={C.y + 52} fontSize="15" fontWeight="bold" fill="#b91c1c">γ</text>
      <text x={A.x - 16} y={A.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 8} y={B.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">B</text>
      <text x={C.x - 4} y={C.y - 10} fontSize="14" fontWeight="bold" fill="#0f172a">C</text>
      <text x={(A.x + C.x) / 2 - 14} y={(A.y + C.y) / 2 - 4} fontSize="15" fontWeight="bold" fill="#1d4ed8">b</text>
      <text x={(B.x + C.x) / 2 + 10} y={(B.y + C.y) / 2 - 4} fontSize="15" fontWeight="bold" fill="#1d4ed8">a</text>
      <text x={(A.x + B.x) / 2} y={A.y + 24} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#b91c1c">c</text>
      <rect x="40" y="28" width="230" height="40" rx="10" fill="#ffffff" stroke="#c7d2fe" />
      <text x="155" y="54" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#312e81">
        c² = a² + b² − 2ab · cos γ
      </text>
      <text x="280" y="275" fontSize="11" textAnchor="middle" fill="#475569">
        γ = 90° esetén cos γ = 0, és a tétel a Pitagorasz-tétel: c² = a² + b²
      </text>
    </svg>
  );
};

// 4. ábra: A vízmolekula (3. feladat)
export const WaterMoleculeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 280, y: 90 };
  const L = 160;
  const half = 104.5 / 2;
  const H1 = { x: O.x - L * Math.sin(toRad(half)), y: O.y + L * Math.cos(toRad(half)) };
  const H2 = { x: O.x + L * Math.sin(toRad(half)), y: O.y + L * Math.cos(toRad(half)) };
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A vízmolekula: H–H távolság
      </text>
      <line x1={O.x} y1={O.y} x2={H1.x} y2={H1.y} stroke="#64748b" strokeWidth="5" />
      <line x1={O.x} y1={O.y} x2={H2.x} y2={H2.y} stroke="#64748b" strokeWidth="5" />
      <line x1={H1.x} y1={H1.y} x2={H2.x} y2={H2.y} stroke="#059669" strokeWidth="2" strokeDasharray="6 4" />
      <path d={angleArc(O, H1, H2, 42)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={O.x} y={O.y + 62} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#b91c1c">104,5°</text>
      <circle cx={O.x} cy={O.y} r="26" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
      <text x={O.x} y={O.y + 6} fontSize="16" textAnchor="middle" fontWeight="bold" fill="#ffffff">O</text>
      {[H1, H2].map((H, i) => (
        <g key={i}>
          <circle cx={H.x} cy={H.y} r="17" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <text x={H.x} y={H.y + 5} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">H</text>
        </g>
      ))}
      <text x={(O.x + H1.x) / 2 - 16} y={(O.y + H1.y) / 2} fontSize="13" textAnchor="end" fontWeight="bold" fill="#1d4ed8">98 pm</text>
      <text x={(O.x + H2.x) / 2 + 16} y={(O.y + H2.y) / 2} fontSize="13" fontWeight="bold" fill="#1d4ed8">98 pm</text>
      <text x={O.x} y={H1.y + 32} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">
        d² = 98² + 98² − 2 · 98 · 98 · cos 104,5° ⇒ d ≈ 155 pm
      </text>
    </svg>
  );
};

// 5. ábra: Paralelogramma oldalai és átlói (4. feladat)
export const ParallelogramDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 8;
  const alpha = 83.87;
  const A = { x: 90, y: 230 };
  const B = { x: A.x + 32 * s, y: A.y };
  const D = { x: A.x + 24 * s * Math.cos(toRad(alpha)), y: A.y - 24 * s * Math.sin(toRad(alpha)) };
  const C = { x: B.x + (D.x - A.x), y: D.y };
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2.5" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4" />
      <path d={angleArc(A, B, D, 30)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <path d={angleArc(B, C, A, 26)} fill="none" stroke="#059669" strokeWidth="2" />
      <text x={A.x + 26} y={A.y - 34} fontSize="12" fontWeight="bold" fill="#6d28d9">α</text>
      <text x={B.x - 30} y={B.y - 30} fontSize="12" fontWeight="bold" fill="#047857">β</text>
      <text x={A.x - 14} y={A.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 6} y={B.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={C.x + 6} y={C.y} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={D.x - 14} y={D.y} fontSize="13" fontWeight="bold" fill="#0f172a">D</text>
      <text x={(A.x + B.x) / 2} y={A.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#c2410c">32 cm</text>
      <text x={(A.x + D.x) / 2 - 10} y={(A.y + D.y) / 2} fontSize="13" textAnchor="end" fontWeight="bold" fill="#c2410c">24 cm</text>
      <text x={(A.x + C.x) / 2 + 30} y={(A.y + C.y) / 2 + 22} fontSize="13" fontWeight="bold" fill="#b91c1c">e = 42 cm</text>
      <text x={(B.x + D.x) / 2 - 40} y={(B.y + D.y) / 2 - 18} fontSize="13" fontWeight="bold" fill="#1d4ed8">f = ?</text>
      <rect x="400" y="40" width="148" height="70" rx="10" fill="#ffffff" stroke="#fed7aa" />
      <text x="474" y="62" fontSize="11" textAnchor="middle" fill="#9a3412">42² = 24² + 32² − 2·24·32·cos β</text>
      <text x="474" y="80" fontSize="11" textAnchor="middle" fill="#9a3412">β ≈ 96,1°, α ≈ 83,9°</text>
      <text x="474" y="98" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9a3412">f ≈ 37,9 cm</text>
    </svg>
  );
};
