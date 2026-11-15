import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;

type Pt = { x: number; y: number };

const pts = (list: Pt[]) => list.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

/** Szögív a V csúcsnál az u1 iránytól az u2 irányig (a kisebbik szög). */
const angleArc = (V: Pt, u1: Pt, u2: Pt, r: number) => {
  const n1 = Math.hypot(u1.x, u1.y);
  const n2 = Math.hypot(u2.x, u2.y);
  const a = { x: u1.x / n1, y: u1.y / n1 };
  const b = { x: u2.x / n2, y: u2.y / n2 };
  const sweep = a.x * b.y - a.y * b.x > 0 ? 1 : 0;
  return `M ${(V.x + r * a.x).toFixed(2)} ${(V.y + r * a.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * b.x).toFixed(2)} ${(V.y + r * b.y).toFixed(2)}`;
};

const sub = (P: Pt, Q: Pt): Pt => ({ x: P.x - Q.x, y: P.y - Q.y });

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. */
const RightAngleArc: React.FC<{ V: Pt; u1: Pt; u2: Pt; r?: number; color?: string }> = ({ V, u1, u2, r = 14, color = '#475569' }) => {
  const n1 = Math.hypot(u1.x, u1.y);
  const n2 = Math.hypot(u2.x, u2.y);
  const bis = { x: u1.x / n1 + u2.x / n2, y: u1.y / n1 + u2.y / n2 };
  const nb = Math.hypot(bis.x, bis.y) || 1;
  return (
    <g>
      <path d={angleArc(V, u1, u2, r)} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={V.x + (0.5 * r * bis.x) / nb} cy={V.y + (0.5 * r * bis.y) / nb} r="1.8" fill={color} />
    </g>
  );
};

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

// 1. feladat: paralelogramma, átlók 30 mm és 50 mm, közrezárt tompaszög 120°
export const ParallelogramDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 4.2; // px / mm
  const M = { x: 200, y: 160 };
  const u = { x: Math.cos(toRad(0)), y: -Math.sin(toRad(0)) };
  const v = { x: Math.cos(toRad(120)), y: -Math.sin(toRad(120)) };
  const A = { x: M.x - 25 * k * u.x, y: M.y - 25 * k * u.y };
  const C = { x: M.x + 25 * k * u.x, y: M.y + 25 * k * u.y };
  const B = { x: M.x - 15 * k * v.x, y: M.y - 15 * k * v.y };
  const D = { x: M.x + 15 * k * v.x, y: M.y + 15 * k * v.y };
  return (
    <Frame title="1. feladat – átlókból az oldalak" h={300} className={className}>
      <polygon points={pts([A, B, C, D])} fill="rgba(59,130,246,0.1)" stroke="#2563eb" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#059669" strokeWidth="2" />
      <path d={angleArc(M, sub(C, M), sub(D, M), 20)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={M.x + 6} y={M.y - 24} fontSize="12" fontWeight="bold" fill="#6d28d9">120°</text>
      <path d={angleArc(M, sub(B, M), sub(C, M), 16)} fill="none" stroke="#d97706" strokeWidth="2" />
      <text x={M.x + 20} y={M.y + 22} fontSize="12" fontWeight="bold" fill="#b45309">60°</text>
      {[
        { p: A, l: 'A', dx: -16, dy: 4 },
        { p: B, l: 'B', dx: 6, dy: 14 },
        { p: C, l: 'C', dx: 8, dy: 4 },
        { p: D, l: 'D', dx: -6, dy: -8 },
        { p: M, l: 'M', dx: -16, dy: 16 }
      ].map(({ p, l, dx, dy }) => (
        <text key={l} x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" fill="#0f172a">
          {l}
        </text>
      ))}
      <text x={(A.x + M.x) / 2} y={M.y - 6} fontSize="11" textAnchor="middle" fill="#b91c1c">25</text>
      <text x={(M.x + D.x) / 2 - 12} y={(M.y + D.y) / 2} fontSize="11" fill="#047857">15</text>
      <g fontSize="11" fill="#334155">
        <text x="335" y="80">e = 30 mm, f = 50 mm</text>
        <text x="335" y="104">Fél átlók: 15 és 25 mm</text>
        <text x="335" y="134">CD² = 15² + 25² − 2·15·25·cos 120°</text>
        <text x="335" y="154" fontWeight="bold" fill="#1d4ed8">→ 35 mm</text>
        <text x="335" y="184">BC² = 15² + 25² − 2·15·25·cos 60°</text>
        <text x="335" y="204" fontWeight="bold" fill="#1d4ed8">→ ≈ 21,79 ≈ 22 mm</text>
        <text x="335" y="240" fontWeight="bold" fill="#0f172a">K = 2 · (35 + 22) = 114 mm</text>
        <text x="335" y="262">A = 1 + 1 + 4 = 6</text>
      </g>
    </Frame>
  );
};

// 2. feladat: paralelogramma, oldalak 10 mm és 70 mm, szög 150°
export const ParallelogramAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 4.2;
  const A = { x: 40, y: 200 };
  const B = { x: A.x + 70 * k, y: A.y };
  const d = { x: 10 * k * Math.cos(toRad(30)), y: -10 * k * Math.sin(toRad(30)) };
  const D = { x: A.x + d.x, y: A.y + d.y };
  const C = { x: B.x + d.x, y: B.y + d.y };
  return (
    <Frame title="2. feladat – terület két oldalból és a közbezárt szögből" h={280} className={className}>
      <polygon points={pts([A, B, C, D])} fill="rgba(16,185,129,0.15)" stroke="#059669" strokeWidth="2.5" />
      <path d={angleArc(A, sub(B, A), sub(D, A), 26)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 30} y={A.y - 4} fontSize="11" fontWeight="bold" fill="#b91c1c">30°</text>
      <path d={angleArc(B, sub(C, B), sub(A, B), 18)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={B.x - 44} y={B.y - 14} fontSize="11" fontWeight="bold" fill="#6d28d9">150°</text>
      <text x={(A.x + B.x) / 2} y={A.y + 20} fontSize="12" textAnchor="middle" fill="#0f172a">70 mm</text>
      <text x={C.x + 6} y={(B.y + C.y) / 2 + 4} fontSize="12" fill="#0f172a">10 mm</text>
      <g fontSize="12" fill="#334155">
        <text x="40" y="70">T = a · b · sin γ = 10 · 70 · sin 150°</text>
        <text x="40" y="92">sin 150° = sin 30° = 0,5 (pótló szögek szinusza egyenlő)</text>
        <text x="40" y="118" fontWeight="bold" fill="#047857">T = 350 mm² → B = 3 · 5 · 0 = 0</text>
        <text x="40" y="250" fill="#475569">Számolás nélkül is látszik: a 0 számjegy miatt B = 0!</text>
      </g>
    </Frame>
  );
};

// 3. feladat: a torony magassága – vízszintes PQB háromszög és függőleges TB
export const TowerTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // perspektivikus vázlat: P, Q, B a talajon, T a B fölött
  const P = { x: 70, y: 255 };
  const Q = { x: 290, y: 275 };
  const B = { x: 230, y: 195 };
  const T = { x: 230, y: 50 };
  return (
    <Frame title="3. feladat – milyen magas a torony?" h={310} className={className}>
      <polygon points={pts([P, Q, B])} fill="rgba(245,158,11,0.15)" stroke="#d97706" strokeWidth="2" />
      <polygon points={pts([Q, B, T])} fill="rgba(59,130,246,0.1)" stroke="#2563eb" strokeWidth="2" />
      <rect x={B.x - 9} y={T.y} width="18" height={B.y - T.y} fill="#cbd5e1" opacity="0.6" />
      <line x1={B.x} y1={B.y} x2={T.x} y2={T.y} stroke="#0f172a" strokeWidth="2.5" />
      <RightAngleArc V={B} u1={sub(T, B)} u2={sub(Q, B)} r={14} />
      <path d={angleArc(Q, sub(P, Q), sub(B, Q), 26)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={Q.x - 50} y={Q.y - 8} fontSize="11" fontWeight="bold" fill="#b91c1c">42°</text>
      <path d={angleArc(P, sub(Q, P), sub(B, P), 34)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={P.x + 38} y={P.y - 8} fontSize="11" fontWeight="bold" fill="#b91c1c">53°</text>
      <path d={angleArc(Q, sub(B, Q), sub(T, Q), 30)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={Q.x - 6} y={Q.y - 40} fontSize="11" fontWeight="bold" fill="#6d28d9">72°</text>
      <text x={P.x - 16} y={P.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">P</text>
      <text x={Q.x + 6} y={Q.y + 10} fontSize="13" fontWeight="bold" fill="#0f172a">Q</text>
      <text x={B.x - 22} y={B.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={T.x - 6} y={T.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">T</text>
      <text x={(P.x + Q.x) / 2} y={(P.y + Q.y) / 2 + 20} fontSize="12" textAnchor="middle" fill="#0f172a">15 m</text>
      <g fontSize="11" fill="#334155">
        <text x="340" y="70" fontWeight="bold" fill="#0f172a">Vízszintes PQB háromszög:</text>
        <text x="340" y="92">PBQ∠ = 180° − 42° − 53° = 85°</text>
        <text x="340" y="114">QB = 15 · sin 53° / sin 85° ≈ 12,03 m</text>
        <text x="340" y="146" fontWeight="bold" fill="#0f172a">Függőleges QBT háromszög</text>
        <text x="340" y="166">(B-nél derékszög):</text>
        <text x="340" y="188">TB = QB · tg 72° ≈ 37,01 m</text>
        <text x="340" y="216" fontWeight="bold" fill="#1d4ed8">C = 37</text>
      </g>
    </Frame>
  );
};

// 4. feladat: két oldal és az egyikkel szemközti szög – két lehetséges háromszög
export const AmbiguousTrianglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 3.3;
  const A = { x: 40, y: 250 };
  const Cm = { x: 74 * Math.cos(toRad(37)), y: 74 * Math.sin(toRad(37)) };
  const dx = Math.sqrt(50 * 50 - Cm.y * Cm.y);
  const C = { x: A.x + Cm.x * k, y: A.y - Cm.y * k };
  const B1 = { x: A.x + (Cm.x - dx) * k, y: A.y };
  const B2 = { x: A.x + (Cm.x + dx) * k, y: A.y };
  return (
    <Frame title="4. feladat – két megoldás: β₁ + β₂ = 180°" h={300} className={className}>
      <line x1={A.x} y1={A.y} x2={B2.x + 30} y2={A.y} stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points={pts([A, B2, C])} fill="rgba(59,130,246,0.1)" stroke="#2563eb" strokeWidth="2" />
      <polygon points={pts([A, B1, C])} fill="rgba(245,158,11,0.18)" stroke="#d97706" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={B1.x} y2={B1.y} stroke="#dc2626" strokeWidth="2.5" />
      <line x1={C.x} y1={C.y} x2={B2.x} y2={B2.y} stroke="#dc2626" strokeWidth="2.5" />
      <path d={angleArc(A, sub(B2, A), sub(C, A), 34)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={A.x + 40} y={A.y - 8} fontSize="11" fontWeight="bold" fill="#6d28d9">α = 37°</text>
      <path d={angleArc(B2, sub(C, B2), sub(A, B2), 20)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={B2.x - 36} y={B2.y - 18} fontSize="11" fontWeight="bold" fill="#1d4ed8">β₂</text>
      <path d={angleArc(B1, sub(A, B1), sub(C, B1), 16)} fill="none" stroke="#b45309" strokeWidth="2" />
      <text x={B1.x - 22} y={B1.y - 20} fontSize="11" fontWeight="bold" fill="#b45309">β₁</text>
      <text x={A.x - 14} y={A.y + 16} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={C.x - 4} y={C.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={B1.x - 6} y={B1.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">B₁</text>
      <text x={B2.x - 6} y={B2.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">B₂</text>
      <text x={(A.x + C.x) / 2 - 30} y={(A.y + C.y) / 2} fontSize="12" fill="#0f172a">b = 74</text>
      <text x={(C.x + B2.x) / 2 + 8} y={(C.y + B2.y) / 2} fontSize="12" fill="#b91c1c">a = 50</text>
      <text x={(C.x + B1.x) / 2 - 36} y={(C.y + B1.y) / 2 + 20} fontSize="12" fill="#b91c1c">a = 50</text>
      <g fontSize="11" fill="#334155">
        <text x="335" y="70">sin β = 74 · sin 37° / 50 ≈ 0,8907</text>
        <text x="335" y="92">β₂ ≈ 62,96°, β₁ ≈ 117,04°</text>
        <text x="335" y="120" fontWeight="bold" fill="#1d4ed8">β₁ + β₂ = 180° → D = 180</text>
        <text x="335" y="142">A CB₁B₂ háromszög egyenlő szárú,</text>
        <text x="335" y="160">ezért a két szög kiegészítő szög.</text>
      </g>
    </Frame>
  );
};

// 5. feladat: 20 cm sugarú kör, 110°-os középponti szög – a kisebbik körszelet
export const Segment110Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 170, y: 160 };
  const R = 110;
  const from = 90 - 55;
  const to = 90 + 55;
  const A = { x: O.x + R * Math.cos(toRad(from)), y: O.y - R * Math.sin(toRad(from)) };
  const B = { x: O.x + R * Math.cos(toRad(to)), y: O.y - R * Math.sin(toRad(to)) };
  return (
    <Frame title="5. feladat – a kisebbik körszelet" h={300} className={className}>
      <circle cx={O.x} cy={O.y} r={R} fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
      <path
        d={`M ${A.x.toFixed(2)} ${A.y.toFixed(2)} A ${R} ${R} 0 0 0 ${B.x.toFixed(2)} ${B.y.toFixed(2)} Z`}
        fill="rgba(59,130,246,0.35)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <polygon points={pts([O, A, B])} fill="rgba(245,158,11,0.18)" stroke="#d97706" strokeWidth="1.5" />
      <path d={angleArc(O, sub(A, O), sub(B, O), 22)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={O.x - 14} y={O.y - 28} fontSize="12" fontWeight="bold" fill="#6d28d9">110°</text>
      <circle cx={O.x} cy={O.y} r="3.5" fill="#0f172a" />
      <text x={O.x - 6} y={O.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
      <text x={(O.x + A.x) / 2 + 8} y={(O.y + A.y) / 2 + 10} fontSize="12" fill="#0f172a">20 cm</text>
      <g fontSize="12" fill="#334155">
        <text x="320" y="80">körcikk: 20² · π · 110° / 360°</text>
        <text x="320" y="100">≈ 383,97 cm²</text>
        <text x="320" y="130">háromszög: 20² · sin 110° / 2</text>
        <text x="320" y="150">≈ 187,94 cm²</text>
        <text x="320" y="184" fontWeight="bold" fill="#1d4ed8">körszelet ≈ 196,03 cm²</text>
        <text x="320" y="206" fontWeight="bold" fill="#1d4ed8">E = 196</text>
      </g>
    </Frame>
  );
};

// Ráadás: a szinuszgörbe 0° és 180° között a tankönyvi táblázat pontjaival
export const SineCurveSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X0 = 50;
  const Y0 = 240;
  const sx = 2.6; // px / fok
  const sy = 180; // px / egység
  const curve = Array.from({ length: 181 }, (_, d) => `${(X0 + d * sx).toFixed(2)},${(Y0 - Math.sin(toRad(d)) * sy).toFixed(2)}`).join(' ');
  const marks = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165];
  return (
    <Frame title="Ráadás – a szinuszgörbe (0° < α < 180°)" h={290} className={className}>
      <line x1={X0} y1={Y0} x2={X0 + 180 * sx + 20} y2={Y0} stroke="#475569" strokeWidth="1.5" />
      <line x1={X0} y1={Y0 + 10} x2={X0} y2={Y0 - sy - 20} stroke="#475569" strokeWidth="1.5" />
      <line x1={X0} y1={Y0 - sy} x2={X0 + 180 * sx} y2={Y0 - sy} stroke="#cbd5e1" strokeDasharray="4 4" />
      <line x1={X0} y1={Y0 - sy / 2} x2={X0 + 180 * sx} y2={Y0 - sy / 2} stroke="#cbd5e1" strokeDasharray="4 4" />
      <text x={X0 - 10} y={Y0 - sy + 4} fontSize="11" textAnchor="end" fill="#334155">1</text>
      <text x={X0 - 10} y={Y0 - sy / 2 + 4} fontSize="11" textAnchor="end" fill="#334155">0,5</text>
      <text x={X0 - 10} y={Y0 + 4} fontSize="11" textAnchor="end" fill="#334155">0</text>
      <polyline points={curve} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {marks.map((d) => (
        <g key={d}>
          <circle cx={X0 + d * sx} cy={Y0 - Math.sin(toRad(d)) * sy} r="3.5" fill="#dc2626" />
          <text x={X0 + d * sx} y={Y0 + 16} fontSize="9" textAnchor="middle" fill="#334155">
            {d}°
          </text>
        </g>
      ))}
      <text x={X0 + 180 * sx} y={Y0 + 16} fontSize="9" textAnchor="middle" fill="#334155">180°</text>
      <text x={X0 + 180 * sx + 24} y={Y0 + 4} fontSize="12" fill="#334155">α</text>
      <text x={X0 + 6} y={Y0 - sy - 10} fontSize="12" fill="#334155">y = sin α</text>
      <text x="280" y="275" fontSize="11" textAnchor="middle" fill="#475569">
        A görbe a 90°-os egyenesre szimmetrikus: sin(180° − α) = sin α
      </text>
    </Frame>
  );
};
