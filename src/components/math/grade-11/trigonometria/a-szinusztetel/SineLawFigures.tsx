import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const sin = (deg: number) => Math.sin(toRad(deg));

/** Szögív az (x, y) csúcs körül d0 foktól d1 fokig (matematikai pozitív irány, képernyőn felfelé). */
const arcBetween = (x: number, y: number, r: number, d0: number, d1: number) => {
  const sx = x + r * Math.cos(toRad(d0));
  const sy = y - r * Math.sin(toRad(d0));
  const ex = x + r * Math.cos(toRad(d1));
  const ey = y - r * Math.sin(toRad(d1));
  const large = Math.abs(d1 - d0) > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
};

/** Irányszög (fok, matematikai irányban) P-től Q felé, képernyő-koordinátákban. */
const dirDeg = (P: { x: number; y: number }, Q: { x: number; y: number }) =>
  (Math.atan2(-(Q.y - P.y), Q.x - P.x) * 180) / Math.PI;

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

// Az Új Híd háromszöge: BC = 200 m, B-nél 109°, C-nél 16°, A-nál 55°
const BRIDGE_K = 1.6;
const BRIDGE_C_LEN = (200 * sin(16)) / sin(55); // ≈ 67,3 m
const bridgePoints = () => {
  const B = { x: 180, y: 235 };
  const C = { x: B.x + 200 * BRIDGE_K, y: B.y };
  const A = {
    x: B.x + BRIDGE_C_LEN * BRIDGE_K * Math.cos(toRad(109)),
    y: B.y - BRIDGE_C_LEN * BRIDGE_K * Math.sin(toRad(109))
  };
  return { A, B, C };
};

// 1. ábra: Bevezető – az Új Híd leghosszabb tartókábele
export const NewBridgeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const { A, B, C } = bridgePoints();
  return (
    <svg viewBox="0 0 580 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Pozsony, Új Híd: milyen hosszú a tartókábel?
      </text>
      {/* pályatest */}
      <rect x="40" y={B.y} width="500" height="10" fill="#cbd5e1" stroke="#64748b" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(14,165,233,0.10)" stroke="none" />
      {/* pillér */}
      <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      {/* kábel */}
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#0284c7" strokeWidth="2.5" />
      <path d={arcBetween(B.x, B.y, 22, 0, 109)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={B.x + 14} y={B.y - 26} fontSize="12" fontWeight="bold" fill="#b91c1c">109°</text>
      <path d={arcBetween(C.x, C.y, 46, 164, 180)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={C.x - 76} y={C.y - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">16°</text>
      <path d={arcBetween(A.x, A.y, 26, dirDeg(A, B), dirDeg(A, C))} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={A.x + 22} y={A.y + 34} fontSize="12" fontWeight="bold" fill="#6d28d9">55°</text>
      <text x={A.x - 6} y={A.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="end">A</text>
      <text x={B.x} y={B.y + 26} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">B</text>
      <text x={C.x} y={C.y + 26} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">C</text>
      <text x={(B.x + C.x) / 2} y={B.y + 26} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">a = 200 m</text>
      <text x={(A.x + C.x) / 2 + 10} y={(A.y + C.y) / 2 - 8} fontSize="13" fontWeight="bold" fill="#0369a1">b = ? (kábel)</text>
      <text x={(A.x + B.x) / 2 - 10} y={(A.y + B.y) / 2} fontSize="13" fontWeight="bold" fill="#334155" textAnchor="end">c</text>
      <text x="290" y="276" fontSize="11" textAnchor="middle" fill="#475569">
        b = 200 · sin 109° / sin 55° ≈ 231 m
      </text>
    </svg>
  );
};

// 2. ábra: 2. feladat – a további tartókötelek (e, d) és a BP, PQ, QC távolságok
export const BridgeCablesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const { A, B, C } = bridgePoints();
  const BP = (BRIDGE_C_LEN * sin(30)) / sin(41);
  const BQ = (BRIDGE_C_LEN * sin(47)) / sin(24);
  const P = { x: B.x + BP * BRIDGE_K, y: B.y };
  const Q = { x: B.x + BQ * BRIDGE_K, y: B.y };
  return (
    <svg viewBox="0 0 580 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Három tartókötél: e, d és b
      </text>
      <rect x="40" y={B.y} width="500" height="10" fill="#cbd5e1" stroke="#64748b" />
      <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#16a34a" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={Q.x} y2={Q.y} stroke="#f59e0b" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#0284c7" strokeWidth="2" />
      <path d={arcBetween(B.x, B.y, 18, 0, 109)} fill="none" stroke="#dc2626" strokeWidth="1.8" />
      <text x={B.x + 10} y={B.y - 22} fontSize="11" fontWeight="bold" fill="#b91c1c">109°</text>
      <path d={arcBetween(P.x, P.y, 24, 139, 180)} fill="none" stroke="#16a34a" strokeWidth="1.8" />
      <text x={P.x - 50} y={P.y - 8} fontSize="11" fontWeight="bold" fill="#15803d">41°</text>
      <path d={arcBetween(Q.x, Q.y, 34, 156, 180)} fill="none" stroke="#d97706" strokeWidth="1.8" />
      <text x={Q.x - 62} y={Q.y - 6} fontSize="11" fontWeight="bold" fill="#b45309">24°</text>
      <path d={arcBetween(C.x, C.y, 46, 164, 180)} fill="none" stroke="#0284c7" strokeWidth="1.8" />
      <text x={C.x - 76} y={C.y - 6} fontSize="11" fontWeight="bold" fill="#0369a1">16°</text>
      {[
        { p: A, l: 'A', dy: -8 },
        { p: B, l: 'B', dy: 26 },
        { p: P, l: 'P', dy: 26 },
        { p: Q, l: 'Q', dy: 26 },
        { p: C, l: 'C', dy: 26 }
      ].map(({ p, l, dy }) => (
        <text key={l} x={p.x} y={p.y + dy} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">{l}</text>
      ))}
      <text x={(A.x + P.x) / 2 + 2} y={(A.y + P.y) / 2 + 14} fontSize="12" fontWeight="bold" fill="#15803d">e</text>
      <text x={(A.x + Q.x) / 2 + 4} y={(A.y + Q.y) / 2 + 2} fontSize="12" fontWeight="bold" fill="#b45309">d</text>
      <text x={(A.x + C.x) / 2 + 8} y={(A.y + C.y) / 2 - 8} fontSize="12" fontWeight="bold" fill="#0369a1">b</text>
      <text x="290" y="276" fontSize="11" textAnchor="middle" fill="#475569">
        BC = 200 m; e ≈ 97 m, d ≈ 156 m; BP ≈ 51 m, PQ ≈ 70 m, QC ≈ 79 m
      </text>
    </svg>
  );
};

// 3. ábra: A szinusztétel és bizonyítása – a terület kétféle felírása
export const SineLawProofSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 90, y: 230 };
  const B = { x: 450, y: 230 };
  const C = { x: 300, y: 80 };
  const H = { x: C.x, y: A.y };
  return (
    <svg viewBox="0 0 580 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Szinusztétel: a / b = sin α / sin β
      </text>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={H.x} y2={H.y} stroke="#059669" strokeWidth="1.8" strokeDasharray="5 4" />
      <RightAngleMark x={H.x} y={H.y} dir="right-up" color="#059669" />
      <path d={arcBetween(A.x, A.y, 34, 0, dirDeg(A, C))} fill="rgba(220,38,38,0.12)" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 42} y={A.y - 8} fontSize="14" fontWeight="bold" fill="#b91c1c">α</text>
      <path d={arcBetween(B.x, B.y, 30, dirDeg(B, C), 180)} fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="2" />
      <text x={B.x - 44} y={B.y - 8} fontSize="14" fontWeight="bold" fill="#1d4ed8">β</text>
      <text x={(B.x + C.x) / 2 + 12} y={(B.y + C.y) / 2 - 4} fontSize="15" fontWeight="bold" fill="#b91c1c">a</text>
      <text x={(A.x + C.x) / 2 - 18} y={(A.y + C.y) / 2 - 4} fontSize="15" fontWeight="bold" fill="#1d4ed8">b</text>
      <text x={(A.x + B.x) / 2 - 40} y={A.y + 20} fontSize="15" fontWeight="bold" fill="#312e81">c</text>
      <text x={C.x + 6} y={(C.y + H.y) / 2 + 20} fontSize="12" fontWeight="bold" fill="#047857">m</text>
      <text x={A.x - 8} y={A.y + 16} fontSize="12" fill="#334155">A</text>
      <text x={B.x + 4} y={B.y + 16} fontSize="12" fill="#334155">B</text>
      <text x={C.x} y={C.y - 8} fontSize="12" fill="#334155" textAnchor="middle">C</text>
      <rect x="20" y="44" width="230" height="56" rx="10" fill="#ffffff" stroke="#c7d2fe" />
      <text x="135" y="66" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#312e81">a · c · sin β / 2 = b · c · sin α / 2</text>
      <text x="135" y="88" fontSize="12" textAnchor="middle" fill="#334155">(m = a · sin β = b · sin α)</text>
    </svg>
  );
};

// 4. ábra: 3. feladat – a hajó távolsága a parttól (100 m, 74°, 52°)
export const ShipDistanceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 2;
  const X1 = { x: 140, y: 250 };
  const X2 = { x: X1.x + 100 * k, y: 250 };
  const side = (100 * sin(52)) / sin(54); // X1-től a hajóig
  const S = { x: X1.x + side * k * Math.cos(toRad(74)), y: X1.y - side * k * Math.sin(toRad(74)) };
  const F = { x: S.x, y: X1.y };
  return (
    <svg viewBox="0 0 580 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="10" y="40" width="560" height={X1.y - 40} fill="rgba(56,189,248,0.10)" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Milyen messze van a hajó a parttól?
      </text>
      <line x1="20" y1={X1.y} x2="560" y2={X1.y} stroke="#a16207" strokeWidth="3" />
      <text x="530" y={X1.y + 20} fontSize="12" fill="#a16207" textAnchor="end">part</text>
      <polygon points={`${X1.x},${X1.y} ${X2.x},${X2.y} ${S.x},${S.y}`} fill="rgba(59,130,246,0.10)" stroke="#2563eb" strokeWidth="2" />
      <line x1={S.x} y1={S.y} x2={F.x} y2={F.y} stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
      <RightAngleMark x={F.x} y={F.y} dir="right-up" color="#dc2626" />
      <path d={arcBetween(X1.x, X1.y, 26, 0, 74)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={X1.x - 36} y={X1.y - 14} fontSize="12" fontWeight="bold" fill="#6d28d9">α ≈ 74°</text>
      <path d={arcBetween(X2.x, X2.y, 30, 128, 180)} fill="none" stroke="#059669" strokeWidth="2" />
      <text x={X2.x + 6} y={X2.y - 12} fontSize="12" fontWeight="bold" fill="#047857">β ≈ 52°</text>
      <text x={(X1.x + X2.x) / 2 + 30} y={X1.y + 20} fontSize="13" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">100 m</text>
      <text x={S.x + 8} y={(S.y + F.y) / 2} fontSize="13" fontWeight="bold" fill="#b91c1c">x ≈ 93,6 m</text>
      <path d={`M ${S.x - 18} ${S.y - 4} L ${S.x + 18} ${S.y - 4} L ${S.x + 12} ${S.y + 6} L ${S.x - 12} ${S.y + 6} Z`} fill="#334155" />
      <line x1={S.x} y1={S.y - 4} x2={S.x} y2={S.y - 24} stroke="#334155" strokeWidth="2" />
      <text x={S.x - 24} y={S.y - 10} fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="end">hajó</text>
    </svg>
  );
};

// 5. ábra: 4. feladat – két oldal összege 20 cm, a szemközti szögek 67° és 48°
export const SideSumTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 22;
  const aLen = (20 * sin(67)) / (sin(67) + sin(48));
  const bLen = 20 - aLen;
  const cLen = (aLen * sin(65)) / sin(67);
  const A = { x: 110, y: 240 };
  const B = { x: A.x + cLen * k, y: A.y };
  const C = { x: A.x + bLen * k * Math.cos(toRad(67)), y: A.y - bLen * k * Math.sin(toRad(67)) };
  return (
    <svg viewBox="0 0 580 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        a + b = 20 cm, α = 67°, β = 48°
      </text>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(16,185,129,0.12)" stroke="#059669" strokeWidth="2" />
      <path d={arcBetween(A.x, A.y, 28, 0, 67)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 30} y={A.y - 10} fontSize="12" fontWeight="bold" fill="#b91c1c">67°</text>
      <path d={arcBetween(B.x, B.y, 32, 132, 180)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={B.x - 64} y={B.y - 8} fontSize="12" fontWeight="bold" fill="#1d4ed8">48°</text>
      <path d={arcBetween(C.x, C.y, 24, dirDeg(C, A), dirDeg(C, B))} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={C.x + 4} y={C.y + 40} fontSize="12" fontWeight="bold" fill="#6d28d9">65°</text>
      <text x={(B.x + C.x) / 2 + 12} y={(B.y + C.y) / 2} fontSize="14" fontWeight="bold" fill="#b91c1c">a ≈ 11,07 cm</text>
      <text x={(A.x + C.x) / 2 - 12} y={(A.y + C.y) / 2} fontSize="14" fontWeight="bold" fill="#1d4ed8" textAnchor="end">b ≈ 8,93 cm</text>
      <text x={(A.x + B.x) / 2} y={A.y + 22} fontSize="14" fontWeight="bold" fill="#047857" textAnchor="middle">c ≈ 10,90 cm</text>
      <text x={A.x - 10} y={A.y + 6} fontSize="12" fill="#334155" textAnchor="end">A</text>
      <text x={B.x + 10} y={B.y + 6} fontSize="12" fill="#334155">B</text>
      <text x={C.x} y={C.y - 8} fontSize="12" fill="#334155" textAnchor="middle">C</text>
      <text x="290" y="276" fontSize="11" textAnchor="middle" fill="#475569">
        a : b = sin 67° : sin 48° és a + b = 20 ⇒ T = a · b · sin 65° / 2 ≈ 44,8 cm²
      </text>
    </svg>
  );
};
