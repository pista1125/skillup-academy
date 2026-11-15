import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Szögív a P csúcsnál a `fromDeg` iránytól a `toDeg` irányig (képernyőn az óramutatóval ellentétesen). */
const arc = (P: Pt, r: number, fromDeg: number, toDeg: number) => {
  const s = { x: P.x + r * Math.cos(toRad(fromDeg)), y: P.y - r * Math.sin(toRad(fromDeg)) };
  const e = { x: P.x + r * Math.cos(toRad(toDeg)), y: P.y - r * Math.sin(toRad(toDeg)) };
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
};

/** Derékszög-jel (magyar jelölés: negyedkörív ponttal) a P csúcsnál, az u és v pontok felé mutató szárak között. */
const RightMark: React.FC<{ P: Pt; u: Pt; v: Pt; size?: number; color?: string }> = ({ P, u, v, size = 14, color = '#475569' }) => {
  const nu = Math.hypot(u.x - P.x, u.y - P.y);
  const nv = Math.hypot(v.x - P.x, v.y - P.y);
  const e1 = { x: (u.x - P.x) / nu, y: (u.y - P.y) / nu };
  const e2 = { x: (v.x - P.x) / nv, y: (v.y - P.y) / nv };
  const a = { x: P.x + e1.x * size, y: P.y + e1.y * size };
  const b = { x: P.x + e2.x * size, y: P.y + e2.y * size };
  const sweep = e1.x * e2.y - e1.y * e2.x > 0 ? 1 : 0;
  const bis = { x: e1.x + e2.x, y: e1.y + e2.y };
  const nb = Math.hypot(bis.x, bis.y) || 1;
  const dot = { x: P.x + (bis.x / nb) * size * 0.55, y: P.y + (bis.y / nb) * size * 0.55 };
  return (
    <g>
      <path
        d={`M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${size} ${size} 0 0 ${sweep} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={dot.x.toFixed(2)} cy={dot.y.toFixed(2)} r="1.8" fill={color} />
    </g>
  );
};

const Frame: React.FC<{ w: number; h: number; title: string }> = ({ w, h, title }) => (
  <>
    <rect x="5" y="5" width={w - 10} height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x={w / 2} y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
  </>
);

// 1. ábra: Kidolgozott feladat – a víztározó paralelogrammával közelítve (1,3 km, 1,2 km, 41°)
export const ReservoirParallelogramSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 180; // px / km
  const A = { x: 70, y: 290 };
  const B = { x: A.x + 1.3 * s, y: A.y };
  const D = { x: A.x + 1.2 * s * Math.cos(toRad(41)), y: A.y - 1.2 * s * Math.sin(toRad(41)) };
  const C = { x: B.x + D.x - A.x, y: D.y };
  const F = { x: D.x, y: A.y };
  return (
    <svg viewBox="0 0 560 340" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={340} title="A víztározó közelítése paralelogrammával" />
      <path
        d={`M ${A.x} ${A.y} Q ${A.x + 40} ${A.y + 18} ${B.x} ${B.y} Q ${B.x + 90} ${B.y - 60} ${C.x} ${C.y} Q ${C.x - 120} ${C.y - 22} ${D.x} ${D.y} Q ${D.x - 70} ${D.y + 80} ${A.x} ${A.y}`}
        fill="rgba(56,189,248,0.18)"
        stroke="#7dd3fc"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="rgba(14,165,233,0.15)" stroke="#0369a1" strokeWidth="2.5" />
      <line x1={D.x} y1={D.y} x2={F.x} y2={F.y} stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3" />
      <RightMark P={F} u={B} v={D} color="#dc2626" />
      <path d={arc(A, 36, 0, 41)} fill="none" stroke="#b91c1c" strokeWidth="2" />
      <text x={A.x + 42} y={A.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">41°</text>
      <text x={(A.x + B.x) / 2 + 30} y={A.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0369a1">1,3 km</text>
      <text x={(A.x + D.x) / 2 - 12} y={(A.y + D.y) / 2} fontSize="13" textAnchor="end" fontWeight="bold" fill="#0369a1">1,2 km</text>
      <text x={D.x + 8} y={(D.y + F.y) / 2 + 18} fontSize="13" fontWeight="bold" fill="#b91c1c">m</text>
      <circle cx={D.x} cy={D.y} r="4" fill="#0f172a" />
      <text x={D.x - 10} y={D.y - 10} fontSize="11" textAnchor="end" fill="#334155">Markaz</text>
      <circle cx={C.x} cy={C.y} r="4" fill="#0f172a" />
      <text x={C.x + 8} y={C.y - 8} fontSize="11" fill="#334155">Üdülőtelep</text>
      <rect x="330" y="44" width="210" height="62" rx="10" fill="#ffffff" stroke="#bae6fd" />
      <text x="435" y="66" fontSize="12" textAnchor="middle" fill="#0c4a6e">m = 1,2 · sin 41° ≈ 0,79 km</text>
      <text x="435" y="86" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">T = 1,3 · 1,2 · sin 41° ≈ 1 km²</text>
      <text x="435" y="100" fontSize="10" textAnchor="middle" fill="#475569">V ≈ 10⁶ m² · 2,5 m = 2,5 · 10⁶ m³</text>
    </svg>
  );
};

// 2. ábra: A paralelogramma területe: T = a · b · sin γ
export const ParallelogramAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const g = 55;
  const A = { x: 90, y: 240 };
  const B = { x: 370, y: 240 };
  const bl = 190;
  const D = { x: A.x + bl * Math.cos(toRad(g)), y: A.y - bl * Math.sin(toRad(g)) };
  const C = { x: B.x + D.x - A.x, y: D.y };
  const F = { x: D.x, y: A.y };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="Paralelogramma: mₐ = b · sin γ, T = a · b · sin γ" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#eef2ff" stroke="#4f46e5" strokeWidth="2.5" />
      <polygon points={`${A.x},${A.y} ${F.x},${F.y} ${D.x},${D.y}`} fill="rgba(239,68,68,0.15)" stroke="none" />
      <line x1={D.x} y1={D.y} x2={F.x} y2={F.y} stroke="#dc2626" strokeWidth="2.5" />
      <RightMark P={F} u={B} v={D} color="#dc2626" />
      <path d={arc(A, 34, 0, g)} fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="2" />
      <text x={A.x + 38} y={A.y - 10} fontSize="14" fontWeight="bold" fill="#6d28d9">γ</text>
      <text x={(A.x + B.x) / 2 + 40} y={A.y + 22} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#3730a3">a</text>
      <text x={(D.x + C.x) / 2} y={D.y - 8} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#3730a3">a</text>
      <text x={(A.x + D.x) / 2 - 12} y={(A.y + D.y) / 2} fontSize="14" textAnchor="end" fontWeight="bold" fill="#3730a3">b</text>
      <text x={(B.x + C.x) / 2 + 10} y={(B.y + C.y) / 2} fontSize="14" fontWeight="bold" fill="#3730a3">b</text>
      <text x={D.x + 8} y={(D.y + F.y) / 2 + 20} fontSize="14" fontWeight="bold" fill="#b91c1c">mₐ</text>
      <rect x="400" y="48" width="140" height="64" rx="10" fill="#ffffff" stroke="#c7d2fe" />
      <text x="470" y="72" fontSize="13" textAnchor="middle" fill="#312e81">sin γ = mₐ / b</text>
      <text x="470" y="96" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#312e81">T = a · b · sin γ</text>
    </svg>
  );
};

// 3. ábra: A háromszög területe: T = a · b · sin γ / 2 (példa: 4,5 cm, 2,8 cm, 73°)
export const TriangleAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 60; // px / cm
  const g = 73;
  const C = { x: 90, y: 250 };
  const B = { x: C.x + 4.5 * s, y: C.y };
  const A = { x: C.x + 2.8 * s * Math.cos(toRad(g)), y: C.y - 2.8 * s * Math.sin(toRad(g)) };
  const F = { x: A.x, y: C.y };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="Háromszög: T = a · b · sin γ / 2" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={F.x} y2={F.y} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 3" />
      <RightMark P={F} u={B} v={A} color="#dc2626" />
      <path d={arc(C, 30, 0, g)} fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="2" />
      <text x={C.x + 30} y={C.y - 34} fontSize="14" fontWeight="bold" fill="#6d28d9">γ = 73°</text>
      <text x={C.x - 16} y={C.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">C</text>
      <text x={B.x + 8} y={B.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">B</text>
      <text x={A.x - 6} y={A.y - 10} fontSize="14" fontWeight="bold" fill="#0f172a">A</text>
      <text x={(C.x + B.x) / 2 + 20} y={C.y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">a = 4,5 cm</text>
      <text x={(C.x + A.x) / 2 - 10} y={(C.y + A.y) / 2} fontSize="13" textAnchor="end" fontWeight="bold" fill="#047857">b = 2,8 cm</text>
      <text x={A.x + 8} y={(A.y + F.y) / 2 + 20} fontSize="13" fontWeight="bold" fill="#b91c1c">mₐ = b · sin γ</text>
      <rect x="350" y="48" width="190" height="62" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="445" y="72" fontSize="12" textAnchor="middle" fill="#065f46">T = (4,5 · 2,8 · sin 73°) : 2</text>
      <text x="445" y="96" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#065f46">T ≈ 6,0 cm²</text>
    </svg>
  );
};

// 4. ábra: 2. feladat – 18 cm sugarú kör, 30 cm-es húr, AKB körcikk és háromszög
export const ChordSectorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 6; // px / cm
  const R = 18 * s;
  const K = { x: 200, y: 165 };
  const half = (Math.asin(15 / 18) * 180) / Math.PI; // ≈ 56,44°
  // a húr alul vízszintes: A balra lent, B jobbra lent
  const A = { x: K.x + R * Math.cos(toRad(270 - half)), y: K.y - R * Math.sin(toRad(270 - half)) };
  const B = { x: K.x + R * Math.cos(toRad(270 + half)), y: K.y - R * Math.sin(toRad(270 + half)) };
  const F = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Kör (r = 18 cm) és 30 cm-es húr" />
      <circle cx={K.x} cy={K.y} r={R} fill="#ffffff" stroke="#64748b" strokeWidth="2" />
      <path
        d={`M ${K.x} ${K.y} L ${A.x.toFixed(2)} ${A.y.toFixed(2)} A ${R} ${R} 0 0 0 ${B.x.toFixed(2)} ${B.y.toFixed(2)} Z`}
        fill="rgba(245,158,11,0.18)"
        stroke="none"
      />
      <polygon points={`${K.x},${K.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="rgba(16,185,129,0.22)" stroke="#047857" strokeWidth="2" />
      <line x1={K.x} y1={K.y} x2={F.x} y2={F.y} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
      <RightMark P={F} u={B} v={K} color="#dc2626" />
      <path d={arc(K, 22, 270 - half, 270 + half)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <circle cx={K.x} cy={K.y} r="3.5" fill="#0f172a" />
      <text x={K.x - 8} y={K.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">K</text>
      <text x={A.x - 16} y={A.y + 14} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 6} y={B.y + 14} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={F.x} y={F.y + 16} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#047857">30 cm</text>
      <text x={(K.x + A.x) / 2 - 12} y={(K.y + A.y) / 2} fontSize="12" textAnchor="end" fill="#334155">18</text>
      <text x={K.x + 6} y={(K.y + F.y) / 2 + 12} fontSize="12" fontWeight="bold" fill="#b91c1c">d</text>
      <rect x="340" y="50" width="200" height="126" rx="10" fill="#ffffff" stroke="#fde68a" />
      <text x="440" y="72" fontSize="11.5" textAnchor="middle" fill="#1e293b">sin(AKB∢ / 2) = 15 / 18</text>
      <text x="440" y="92" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#6d28d9">AKB∢ ≈ 112,9°</text>
      <text x="440" y="112" fontSize="11.5" textAnchor="middle" fill="#1e293b">ívek ≈ 35,5 cm és ≈ 77,6 cm</text>
      <text x="440" y="132" fontSize="11.5" textAnchor="middle" fill="#92400e">körcikkek ≈ 319,2 és ≈ 698,7 cm²</text>
      <text x="440" y="152" fontSize="11.5" textAnchor="middle" fill="#047857">d = √99 ≈ 9,95 cm</text>
      <text x="440" y="170" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#047857">T(AKB) ≈ 149,2 cm²</text>
    </svg>
  );
};

// 5. ábra: Házi feladat 1. a) – deltoid (7 cm, 14 cm, 82,2°)
export const KiteAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 18; // px / cm
  const ab = 7;
  const bc = 14;
  const beta = 82.2;
  const ac = Math.sqrt(ab * ab + bc * bc - 2 * ab * bc * Math.cos(toRad(beta)));
  const bx = (ab * ab - bc * bc + ac * ac) / (2 * ac);
  const by = Math.sqrt(Math.max(0, ab * ab - bx * bx));
  const O = { x: 90, y: 165 };
  const A = { x: O.x, y: O.y };
  const C = { x: O.x + ac * s, y: O.y };
  const B = { x: O.x + bx * s, y: O.y - by * s };
  const D = { x: O.x + bx * s, y: O.y + by * s };
  const angB = (Math.atan2(A.y - B.y, A.x - B.x) * 180) / Math.PI;
  const angC = (Math.atan2(C.y - B.y, C.x - B.x) * 180) / Math.PI;
  return (
    <svg viewBox="0 0 560 310" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={310} title="Deltoid: két egybevágó háromszög" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#fdf4ff" stroke="#a21caf" strokeWidth="2.5" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(168,85,247,0.15)" stroke="none" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 3" />
      {/* a B csúcsnál lévő 82,2°-os szög (képernyő-koordinátákban: a BA és BC irány között) */}
      <path
        d={`M ${(B.x + 26 * Math.cos(toRad(angB))).toFixed(2)} ${(B.y + 26 * Math.sin(toRad(angB))).toFixed(2)} A 26 26 0 0 0 ${(B.x + 26 * Math.cos(toRad(angC))).toFixed(2)} ${(B.y + 26 * Math.sin(toRad(angC))).toFixed(2)}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="2"
      />
      <text x={B.x - 10} y={B.y + 44} fontSize="12" fontWeight="bold" fill="#b91c1c">82,2°</text>
      <text x={A.x - 16} y={A.y + 5} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x - 4} y={B.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={C.x + 6} y={C.y + 5} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={D.x - 4} y={D.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">D</text>
      <text x={(A.x + B.x) / 2 - 22} y={(A.y + B.y) / 2} fontSize="12" fontWeight="bold" fill="#86198f">7 cm</text>
      <text x={(B.x + C.x) / 2 + 6} y={(B.y + C.y) / 2 - 4} fontSize="12" fontWeight="bold" fill="#86198f">14 cm</text>
      <text x={(A.x + D.x) / 2 - 22} y={(A.y + D.y) / 2 + 12} fontSize="12" fill="#86198f">7 cm</text>
      <text x={(D.x + C.x) / 2 + 6} y={(D.y + C.y) / 2 + 14} fontSize="12" fill="#86198f">14 cm</text>
      <rect x="380" y="226" width="160" height="62" rx="10" fill="#ffffff" stroke="#f0abfc" />
      <text x="460" y="250" fontSize="12" textAnchor="middle" fill="#701a75">T = 2 · (7 · 14 · sin 82,2°) / 2</text>
      <text x="460" y="274" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#701a75">T ≈ 97,1 cm²</text>
    </svg>
  );
};
