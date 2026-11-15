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

/** Szögív a V csúcsnál a V→P iránytól a V→Q irányig (a rövidebbik íven). */
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

// 1. ábra: Egyenlő szárú háromszög 42°-os szárszögének felosztása (1. csoportmunka-feladat)
export const IsoscelesSplitSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 200 / 120; // méretarányos: 120 m ≙ 200 px
  const B0 = { x: 280 - 60 * s, y: 300 };
  const B3 = { x: 280 + 60 * s, y: 300 };
  const B1 = { x: 280 - 20 * s, y: 300 };
  const B2 = { x: 280 + 20 * s, y: 300 };
  const C = { x: 280, y: 300 - 156.31 * s };
  const F = { x: 280, y: 300 };
  return (
    <svg viewBox="0 0 560 340" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="330" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="110" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">42°-os szárszög</text>
      <text x="110" y="46" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">három részre</text>
      <polygon points={`${B0.x},${B0.y} ${B3.x},${B3.y} ${C.x},${C.y}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={B1.x} y2={B1.y} stroke="#7c3aed" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={B2.x} y2={B2.y} stroke="#7c3aed" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={F.x} y2={F.y} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" />
      <RightAngleArc V={F} P={B2} Q={C} r={12} />
      <path d={angleArc(C, B0, B1, 95)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={angleArc(C, B1, B2, 80)} fill="none" stroke="#059669" strokeWidth="2" />
      <path d={angleArc(C, B2, B3, 95)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={C.x - 26} y={C.y + 110} fontSize="13" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={C.x - 4} y={C.y + 96} fontSize="12" fontWeight="bold" fill="#047857">β</text>
      <text x={C.x + 17} y={C.y + 110} fontSize="13" fontWeight="bold" fill="#b91c1c">γ</text>
      <path d={angleArc(B0, B3, C, 34)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={angleArc(B3, C, B0, 34)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={B0.x + 40} y={B0.y - 8} fontSize="12" fontWeight="bold" fill="#1d4ed8">69°</text>
      <text x={B3.x - 40} y={B3.y - 8} fontSize="12" textAnchor="end" fontWeight="bold" fill="#1d4ed8">69°</text>
      <text x={C.x} y={C.y - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#b91c1c">42°</text>
      {[
        [B0, B1],
        [B1, B2],
        [B2, B3]
      ].map(([P, Q], i) => (
        <text key={i} x={(P.x + Q.x) / 2} y={P.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">
          40 m
        </text>
      ))}
      <text x={C.x + 6} y={(C.y + F.y) / 2 + 30} fontSize="12" fontWeight="bold" fill="#64748b">m</text>
      <text x="470" y="80" fontSize="11" textAnchor="middle" fill="#334155">m = 60 · tg 69° ≈ 156,3 m</text>
      <text x="470" y="100" fontSize="11" textAnchor="middle" fill="#334155">szár = 60 / cos 69° ≈ 167,4 m</text>
      <text x="470" y="120" fontSize="11" textAnchor="middle" fill="#334155">tg(β/2) = 20 / m ⇒ β ≈ 14,6°</text>
      <text x="470" y="140" fontSize="11" textAnchor="middle" fill="#334155">α = γ ≈ 13,7°</text>
    </svg>
  );
};

// 2. ábra: Vasúti töltés keresztmetszete (2. csoportmunka-feladat) – trapéz = paralelogramma + háromszög
export const EmbankmentSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 44;
  const A = { x: 60, y: 240 };
  const angA = 49.67; // a 3,8 m-es rézsű emelkedési szöge
  const h = 2.897;
  const D = { x: A.x + 3.8 * Math.cos(toRad(angA)) * s, y: A.y - h * s };
  const Cc = { x: D.x + 4.5 * s, y: D.y };
  const B = { x: A.x + 10 * s, y: A.y };
  const E = { x: A.x + 4.5 * s, y: A.y }; // a paralelogramma negyedik csúcsa
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Vasúti töltés: paralelogramma + háromszög
      </text>
      <polygon points={`${A.x},${A.y} ${E.x},${E.y} ${Cc.x},${Cc.y} ${D.x},${D.y}`} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
      <polygon points={`${E.x},${E.y} ${B.x},${B.y} ${Cc.x},${Cc.y}`} fill="rgba(245,158,11,0.18)" stroke="#d97706" strokeWidth="2" />
      <line x1={E.x} y1={E.y} x2={Cc.x} y2={Cc.y} stroke="#d97706" strokeWidth="2" strokeDasharray="6 4" />
      <line x1={Cc.x} y1={Cc.y} x2={Cc.x} y2={A.y} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 4" />
      <RightAngleArc V={{ x: Cc.x, y: A.y }} P={B} Q={Cc} r={12} color="#7c3aed" />
      <path d={angleArc(A, B, D, 32)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={angleArc(B, Cc, A, 32)} fill="none" stroke="#059669" strokeWidth="2" />
      <text x={A.x + 36} y={A.y - 10} fontSize="12" fontWeight="bold" fill="#b91c1c">≈ 49,7°</text>
      <text x={B.x - 38} y={B.y - 10} fontSize="12" textAnchor="end" fontWeight="bold" fill="#047857">≈ 43,6°</text>
      <text x={(D.x + Cc.x) / 2} y={D.y - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">korona: 4,5 m</text>
      <text x={(A.x + B.x) / 2} y={A.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">alap: 10 m</text>
      <text x={(A.x + D.x) / 2 - 8} y={(A.y + D.y) / 2} fontSize="12" textAnchor="end" fontWeight="bold" fill="#1d4ed8">3,8 m</text>
      <text x={(B.x + Cc.x) / 2 + 10} y={(B.y + Cc.y) / 2} fontSize="12" fontWeight="bold" fill="#b45309">4,2 m</text>
      <text x={(E.x + Cc.x) / 2 - 6} y={(E.y + Cc.y) / 2 + 26} fontSize="11" textAnchor="end" fill="#b45309">3,8 m</text>
      <text x={(E.x + B.x) / 2} y={A.y - 6} fontSize="11" textAnchor="middle" fill="#b45309">5,5 m</text>
      <text x={Cc.x + 6} y={(Cc.y + A.y) / 2} fontSize="12" fontWeight="bold" fill="#6d28d9">m ≈ 2,9 m</text>
      <text x="280" y="280" fontSize="11" textAnchor="middle" fill="#475569">
        A 3,8 – 4,2 – 5,5 m-es háromszög szögei koszinusztétellel, a magasság m = 3,8 · sin 49,7°
      </text>
    </svg>
  );
};

// 3. ábra: A Pécs–Budapest–Győr „háromszög” (4. csoportmunka-feladat)
export const HungaryTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 1.15;
  const G = { x: 120, y: 70 };
  const Bp = { x: G.x + 108 * s, y: G.y };
  const P = { x: G.x + 185 * s * Math.cos(toRad(64.84)), y: G.y + 185 * s * Math.sin(toRad(64.84)) };
  const dots: [Pt, string, number, number, 'start' | 'middle' | 'end'][] = [
    [G, 'Győr', -10, -10, 'end'],
    [Bp, 'Budapest', 10, -10, 'start'],
    [P, 'Pécs', 0, 22, 'middle']
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      <polygon points={`${G.x},${G.y} ${Bp.x},${Bp.y} ${P.x},${P.y}`} fill="rgba(16,185,129,0.12)" stroke="#059669" strokeWidth="2" />
      <path d={angleArc(G, Bp, P, 30)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <path d={angleArc(Bp, P, G, 30)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={angleArc(P, G, Bp, 36)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={G.x + 22} y={G.y + 36} fontSize="12" fontWeight="bold" fill="#6d28d9">γ</text>
      <text x={Bp.x - 22} y={Bp.y + 36} fontSize="12" fontWeight="bold" fill="#1d4ed8">β</text>
      <text x={P.x - 4} y={P.y - 44} fontSize="12" fontWeight="bold" fill="#b91c1c">α</text>
      {dots.map(([p, name, dx, dy, anchor]) => (
        <g key={name}>
          <circle cx={p.x} cy={p.y} r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <text x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" textAnchor={anchor} fill="#0f172a">{name}</text>
        </g>
      ))}
      <text x={(G.x + Bp.x) / 2} y={G.y - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">108 km</text>
      <text x={(Bp.x + P.x) / 2 + 12} y={(Bp.y + P.y) / 2} fontSize="12" fontWeight="bold" fill="#065f46">170 km</text>
      <text x={(G.x + P.x) / 2 - 10} y={(G.y + P.y) / 2} fontSize="12" textAnchor="end" fontWeight="bold" fill="#065f46">185 km</text>
      <rect x="320" y="60" width="225" height="130" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="432" y="84" fontSize="12" textAnchor="middle" fill="#065f46">α (Pécs) ≈ 35,1°</text>
      <text x="432" y="104" fontSize="12" textAnchor="middle" fill="#065f46">β (Budapest) ≈ 80,1°</text>
      <text x="432" y="124" fontSize="12" textAnchor="middle" fill="#065f46">γ (Győr) ≈ 64,8°</text>
      <text x="432" y="150" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">T = ½ · 108 · 170 · sin β ≈ 9042 km²</text>
      <text x="432" y="172" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">≈ 9,7%-a Magyarországnak</text>
    </svg>
  );
};

// 4. ábra: A tompaszög tangense az egységkörön
export const ObtuseTangentSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 300, y: 240 };
  const R = 170;
  const b = 135;
  const Q = { x: O.x + R * Math.cos(toRad(b)), y: O.y - R * Math.sin(toRad(b)) };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="120" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">A tompaszög tangense</text>
      <line x1={O.x - R - 30} y1={O.y} x2={O.x + R + 30} y2={O.y} stroke="#475569" strokeWidth="1.5" />
      <line x1={O.x} y1={O.y + 20} x2={O.x} y2={O.y - R - 25} stroke="#475569" strokeWidth="1.5" />
      <text x={O.x + R + 24} y={O.y + 18} fontSize="13" fontStyle="italic" fill="#334155">x</text>
      <text x={O.x + 8} y={O.y - R - 14} fontSize="13" fontStyle="italic" fill="#334155">y</text>
      <path d={`M ${O.x + R} ${O.y} A ${R} ${R} 0 0 0 ${O.x - R} ${O.y}`} fill="none" stroke="#94a3b8" strokeDasharray="5 4" />
      <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#0f172a" strokeWidth="2.5" />
      <line x1={O.x} y1={O.y} x2={Q.x} y2={O.y} stroke="#dc2626" strokeWidth="4" />
      <line x1={Q.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#059669" strokeWidth="4" />
      <path d={angleArc(O, { x: O.x + 10, y: O.y }, Q, 32)} fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="2" />
      <text x={O.x + 6} y={O.y - 38} fontSize="13" fontWeight="bold" fill="#6d28d9">β = 135°</text>
      <circle cx={Q.x} cy={Q.y} r="5" fill="#7c3aed" />
      <text x={Q.x - 8} y={Q.y - 10} fontSize="12" fontWeight="bold" textAnchor="end" fill="#5b21b6">Q(cos β; sin β)</text>
      <text x={(O.x + Q.x) / 2} y={O.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#b91c1c">cos β &lt; 0</text>
      <text x={Q.x - 8} y={(O.y + Q.y) / 2 + 4} fontSize="12" textAnchor="end" fontWeight="bold" fill="#047857">sin β &gt; 0</text>
      <rect x="380" y="40" width="165" height="90" rx="10" fill="#ffffff" stroke="#ddd6fe" />
      <text x="462" y="62" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">tg β = sin β / cos β</text>
      <text x="462" y="84" fontSize="12" textAnchor="middle" fill="#4c1d95">tg 135° = (√2/2) / (−√2/2)</text>
      <text x="462" y="104" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">= −1 &lt; 0</text>
      <text x="462" y="122" fontSize="10" textAnchor="middle" fill="#6d28d9">90°-nak nincs tangense</text>
    </svg>
  );
};

// 5. ábra: Helymeghatározás előremetszéssel (Ráadás)
export const TriangulationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 0.8;
  const o = { x: 90, y: 262 };
  const map = (x: number, y: number) => ({ x: o.x + x * s, y: o.y - y * s });
  const A = map(0, 0);
  const B = map(200, 0);
  const C = map(31.25, 248.04);
  const P = map(226.5, 262.5);
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Előremetszés</text>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(148,163,184,0.15)" stroke="#64748b" strokeWidth="2" />
      <line x1={B.x} y1={B.y} x2={P.x} y2={P.y} stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
      <line x1={C.x} y1={C.y} x2={P.x} y2={P.y} stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
      <path d={angleArc(B, C, P, 40)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={angleArc(C, B, P, 34)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={B.x + 4} y={B.y - 46} fontSize="12" fontWeight="bold" fill="#b91c1c">40°</text>
      <text x={C.x + 30} y={C.y + 6} fontSize="12" fontWeight="bold" fill="#b91c1c">60°</text>
      {[
        [A, 'A', -16, 6],
        [B, 'B', 8, 16],
        [C, 'C', -16, -6],
        [P, 'P', 8, -8]
      ].map(([p, n, dx, dy]) => {
        const q = p as Pt;
        return (
          <g key={n as string}>
            <circle cx={q.x} cy={q.y} r="4.5" fill={n === 'P' ? '#7c3aed' : '#0f172a'} />
            <text x={q.x + (dx as number)} y={q.y + (dy as number)} fontSize="13" fontWeight="bold" fill="#0f172a">{n as string}</text>
          </g>
        );
      })}
      <text x={(A.x + B.x) / 2} y={A.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">200 m</text>
      <text x={(A.x + C.x) / 2 - 8} y={(A.y + C.y) / 2} fontSize="12" textAnchor="end" fontWeight="bold" fill="#334155">250 m</text>
      <text x={(B.x + C.x) / 2 - 6} y={(B.y + C.y) / 2 + 18} fontSize="12" fontWeight="bold" fill="#334155">300 m</text>
      <text x={(B.x + P.x) / 2 + 8} y={(B.y + P.y) / 2} fontSize="12" fontWeight="bold" fill="#1d4ed8">d₁</text>
      <text x={(C.x + P.x) / 2} y={(C.y + P.y) / 2 - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">d₂</text>
      <rect x="330" y="150" width="215" height="80" rx="10" fill="#ffffff" stroke="#bfdbfe" />
      <text x="437" y="172" fontSize="11" textAnchor="middle" fill="#1e3a8a">a P-nél lévő szög: 180° − 40° − 60° = 80°</text>
      <text x="437" y="194" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">d₁ = 300 · sin 60° / sin 80° ≈ 264 m</text>
      <text x="437" y="216" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">d₂ = 300 · sin 40° / sin 80° ≈ 196 m</text>
    </svg>
  );
};
