import React from 'react';

type FigProps = { className?: string };
type Pt = { x: number; y: number };

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
const dirDeg = (P: Pt, Q: Pt) => (Math.atan2(-(Q.y - P.y), Q.x - P.x) * 180) / Math.PI;

/** Derékszög jelölése (magyar szokás): negyedkörív a V csúcsnál a P1 és P2 felé mutató szárak között, benne egy pont. */
const RightAngleAt: React.FC<{ V: Pt; P1: Pt; P2: Pt; r?: number; color?: string }> = ({
  V,
  P1,
  P2,
  r = 13,
  color = '#475569'
}) => {
  const n1 = Math.hypot(P1.x - V.x, P1.y - V.y) || 1;
  const n2 = Math.hypot(P2.x - V.x, P2.y - V.y) || 1;
  const u1 = { x: (P1.x - V.x) / n1, y: (P1.y - V.y) / n1 };
  const u2 = { x: (P2.x - V.x) / n2, y: (P2.y - V.y) / n2 };
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bn = Math.hypot(bx, by) || 1;
  return (
    <g>
      <path
        d={`M ${(V.x + r * u1.x).toFixed(2)} ${(V.y + r * u1.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * u2.x).toFixed(2)} ${(V.y + r * u2.y).toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={V.x + 0.55 * r * (bx / bn)} cy={V.y + 0.55 * r * (by / bn)} r="1.8" fill={color} />
    </g>
  );
};

// 1. ábra: Bevezető – repülőgép és földi jeladó (27° és 57° depressziószög, 3000 m)
export const AirplaneBeaconSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 0.06;
  const d = (3000 * sin(123)) / sin(30);
  const R1 = { x: 80, y: 62 };
  const R2 = { x: R1.x + 3000 * k, y: R1.y };
  const J = { x: R1.x + d * k * Math.cos(toRad(27)), y: R1.y + d * k * Math.sin(toRad(27)) };
  const P = { x: R1.x, y: J.y };
  return (
    <svg viewBox="0 0 580 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Repülőgép és földi jeladó
      </text>
      <line x1="30" y1={J.y} x2="550" y2={J.y} stroke="#a16207" strokeWidth="3" />
      <line x1={R1.x - 30} y1={R1.y} x2={R2.x + 120} y2={R2.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <polygon points={`${R1.x},${R1.y} ${R2.x},${R2.y} ${J.x},${J.y}`} fill="rgba(59,130,246,0.10)" stroke="#2563eb" strokeWidth="2" />
      <line x1={R1.x} y1={R1.y} x2={P.x} y2={P.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
      <RightAngleAt V={P} P1={R1} P2={J} color="#059669" />
      <path d={arcBetween(R1.x, R1.y, 40, -27, 0)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={R1.x + 46} y={R1.y + 14} fontSize="12" fontWeight="bold" fill="#b91c1c">27°</text>
      <path d={arcBetween(R2.x, R2.y, 22, 180, 303)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={R2.x - 40} y={R2.y + 26} fontSize="12" fontWeight="bold" fill="#6d28d9">123°</text>
      <path d={arcBetween(R2.x, R2.y, 30, -57, 0)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={R2.x + 30} y={R2.y + 26} fontSize="12" fontWeight="bold" fill="#b91c1c">57°</text>
      <path d={arcBetween(J.x, J.y, 44, dirDeg(J, R2), dirDeg(J, R1))} fill="none" stroke="#0284c7" strokeWidth="2" />
      <text x={J.x - 52} y={J.y - 40} fontSize="12" fontWeight="bold" fill="#0369a1">30°</text>
      <path d={arcBetween(J.x, J.y, 30, dirDeg(J, R1), 180)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={J.x - 64} y={J.y - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">27°</text>
      <text x={R1.x} y={R1.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">R₁</text>
      <text x={R2.x} y={R2.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="middle">R₂</text>
      <text x={J.x + 8} y={J.y + 20} fontSize="13" fontWeight="bold" fill="#0f172a">J</text>
      <text x={P.x - 4} y={P.y + 20} fontSize="13" fontWeight="bold" fill="#0f172a" textAnchor="end">P</text>
      <text x={(R1.x + R2.x) / 2} y={R1.y - 8} fontSize="12" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">3000 m</text>
      <text x={(R1.x + J.x) / 2 - 10} y={(R1.y + J.y) / 2 + 18} fontSize="12" fontWeight="bold" fill="#1d4ed8">d ≈ 5030 m</text>
      <text x={(R2.x + J.x) / 2 + 10} y={(R2.y + J.y) / 2 - 4} fontSize="12" fontWeight="bold" fill="#1d4ed8">e ≈ 2720 m</text>
      <text x={P.x + 6} y={(R1.y + P.y) / 2} fontSize="12" fontWeight="bold" fill="#047857">h ≈ 2280 m</text>
      <text x="440" y="250" fontSize="11" textAnchor="middle" fill="#475569">R₁R₂J szögei: 27°, 123°, 30°</text>
    </svg>
  );
};

// 2. ábra: Kidolgozott feladat – a = 4,5 cm, b = 6 cm, α = 45°: két háromszög
export const AmbiguousCaseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 40;
  const A = { x: 70, y: 235 };
  const C = { x: A.x + 6 * k * Math.cos(toRad(45)), y: A.y - 6 * k * Math.sin(toRad(45)) };
  const r = 4.5 * k;
  const dx = Math.sqrt(r * r - (A.y - C.y) * (A.y - C.y));
  const B1 = { x: C.x + dx, y: A.y };
  const B2 = { x: C.x - dx, y: A.y };
  return (
    <svg viewBox="0 0 580 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        a = 4,5 cm, b = 6 cm, α = 45° ⇒ két háromszög
      </text>
      <path
        d={`M ${C.x - r} ${C.y} A ${r} ${r} 0 0 0 ${C.x + r} ${C.y}`}
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <line x1="40" y1={A.y} x2="540" y2={A.y} stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points={`${A.x},${A.y} ${B1.x},${B1.y} ${C.x},${C.y}`} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
      <polygon points={`${A.x},${A.y} ${B2.x},${B2.y} ${C.x},${C.y}`} fill="rgba(244,63,94,0.12)" stroke="#e11d48" strokeWidth="2" />
      <path d={arcBetween(A.x, A.y, 34, 0, 45)} fill="none" stroke="#0f172a" strokeWidth="2" />
      <text x={A.x + 38} y={A.y - 8} fontSize="12" fontWeight="bold" fill="#0f172a">45°</text>
      <path d={arcBetween(B1.x, B1.y, 24, dirDeg(B1, C), 180)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={B1.x + 4} y={B1.y - 28} fontSize="12" fontWeight="bold" fill="#1d4ed8">β₁ ≈ 70,53°</text>
      <path d={arcBetween(B2.x, B2.y, 18, dirDeg(B2, C), 180)} fill="none" stroke="#e11d48" strokeWidth="2" />
      <text x={B2.x - 40} y={B2.y - 26} fontSize="12" fontWeight="bold" fill="#be123c">β₂ ≈ 109,47°</text>
      <text x={(A.x + C.x) / 2 - 40} y={(A.y + C.y) / 2} fontSize="13" fontWeight="bold" fill="#0f172a">b = 6 cm</text>
      <text x={(B1.x + C.x) / 2 + 8} y={(B1.y + C.y) / 2} fontSize="13" fontWeight="bold" fill="#1d4ed8">a = 4,5 cm</text>
      <text x={(B2.x + C.x) / 2 - 2} y={(B2.y + C.y) / 2 + 30} fontSize="12" fontWeight="bold" fill="#be123c" textAnchor="end">4,5 cm</text>
      <text x={A.x - 6} y={A.y + 18} fontSize="12" fill="#334155">A</text>
      <text x={B2.x - 4} y={B2.y + 18} fontSize="12" fill="#be123c">B₂</text>
      <text x={B1.x - 4} y={B1.y + 18} fontSize="12" fill="#1d4ed8">B₁</text>
      <text x={C.x} y={C.y - 8} fontSize="12" fill="#334155" textAnchor="middle">C</text>
      <text x="290" y="264" fontSize="11" textAnchor="middle" fill="#475569">
        sin β = 6 · sin 45° / 4,5 ≈ 0,9428 ⇒ β₁ ≈ 70,53° vagy β₂ ≈ 109,47° (β₁ + β₂ = 180°)
      </text>
    </svg>
  );
};

// 3. ábra: 4. feladat – a hegy magassága (AB = 223 m, α = 74°, β = 51°, BKH-ban 11°)
export const MountainHeightSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 60, y: 245 };
  const B = { x: 470, y: 245 };
  const K = { x: 300, y: 195 };
  const H = { x: 300, y: 75 };
  return (
    <svg viewBox="0 0 580 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Milyen magas a hegycsúcs a rét felett?
      </text>
      <polygon points="30,262 520,262 560,180 110,180" fill="rgba(34,197,94,0.10)" stroke="#86efac" />
      <path d={`M 150 ${K.y} Q 240 40 ${H.x} ${H.y} Q 380 60 470 ${K.y}`} fill="rgba(148,163,184,0.15)" stroke="#94a3b8" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${H.x},${H.y}`} fill="rgba(59,130,246,0.10)" stroke="#2563eb" strokeWidth="2" />
      <line x1={B.x} y1={B.y} x2={K.x} y2={K.y} stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="5 4" />
      <line x1={H.x} y1={H.y} x2={K.x} y2={K.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
      <RightAngleAt V={K} P1={H} P2={B} color="#059669" />
      <path d={arcBetween(A.x, A.y, 30, 0, dirDeg(A, H))} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 34} y={A.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">α = 74°</text>
      <path d={arcBetween(B.x, B.y, 30, dirDeg(B, H), 180)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={B.x - 50} y={B.y - 30} fontSize="12" fontWeight="bold" fill="#1d4ed8">β = 51°</text>
      <path d={arcBetween(B.x, B.y, 56, dirDeg(B, H), dirDeg(B, K))} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={B.x - 84} y={B.y - 60} fontSize="12" fontWeight="bold" fill="#6d28d9">γ = 11°</text>
      <text x={(A.x + B.x) / 2} y={A.y + 18} fontSize="12" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">AB = 223 m</text>
      <text x={H.x + 6} y={(H.y + K.y) / 2} fontSize="13" fontWeight="bold" fill="#047857">m</text>
      <text x={A.x - 8} y={A.y + 4} fontSize="12" fill="#334155" textAnchor="end">A</text>
      <text x={B.x + 8} y={B.y + 4} fontSize="12" fill="#334155">B</text>
      <text x={K.x - 6} y={K.y + 16} fontSize="12" fill="#334155" textAnchor="end">K</text>
      <text x={H.x} y={H.y - 8} fontSize="12" fill="#334155" textAnchor="middle">H</text>
      <text x="420" y="60" fontSize="11" fill="#475569">BH ≈ 261,7 m</text>
      <text x="420" y="76" fontSize="11" fill="#475569">m = BH · sin 11° ≈ 50 m</text>
    </svg>
  );
};

// 4. ábra: Ráadás – szerkeszthetőség: a = 10 cm, β = 30°, b = 4 / 5 / 6 cm
export const ConstructibilitySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 11;
  const cases = [
    { b: 4, title: 'b = 4 cm: nincs metszéspont', color: '#e11d48' },
    { b: 5, title: 'b = 5 cm: érintő (1 háromszög)', color: '#d97706' },
    { b: 6, title: 'b = 6 cm: 2 metszéspont', color: '#059669' }
  ];
  return (
    <svg viewBox="0 0 580 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        a = 10 cm, β = 30°: hány háromszög szerkeszthető?
      </text>
      {cases.map((cs, i) => {
        const B = { x: 15 + i * 190, y: 200 };
        const C = { x: B.x + 10 * k, y: B.y };
        const r = cs.b * k;
        const u = { x: Math.cos(toRad(30)), y: -Math.sin(toRad(30)) };
        const proj = 10 * k * Math.cos(toRad(30));
        const disc = proj * proj - (10 * k) * (10 * k) + r * r;
        const ts = disc < -1e-6 ? [] : disc < 1e-6 ? [proj] : [proj - Math.sqrt(disc), proj + Math.sqrt(disc)];
        const rayLen = 175;
        return (
          <g key={cs.b}>
            <text x={B.x + 85} y="52" fontSize="11" fontWeight="bold" fill={cs.color} textAnchor="middle">{cs.title}</text>
            <circle cx={C.x} cy={C.y} r={r} fill="none" stroke={cs.color} strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#0f172a" strokeWidth="2.5" />
            <line x1={B.x} y1={B.y} x2={B.x + rayLen * u.x} y2={B.y + rayLen * u.y} stroke="#475569" strokeWidth="1.5" />
            <path d={arcBetween(B.x, B.y, 22, 0, 30)} fill="none" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={B.x + 26} y={B.y - 4} fontSize="10" fontWeight="bold" fill="#6d28d9">30°</text>
            {ts.map((t, j) => {
              const X = { x: B.x + t * u.x, y: B.y + t * u.y };
              return (
                <g key={j}>
                  <line x1={C.x} y1={C.y} x2={X.x} y2={X.y} stroke={cs.color} strokeWidth="1.8" />
                  <circle cx={X.x} cy={X.y} r="3.5" fill={cs.color} />
                  {ts.length === 1 && <RightAngleAt V={X} P1={B} P2={C} r={9} color={cs.color} />}
                </g>
              );
            })}
            <text x={B.x - 2} y={B.y + 16} fontSize="11" fill="#334155">B</text>
            <text x={C.x - 4} y={C.y + 16} fontSize="11" fill="#334155">C</text>
            <text x={(B.x + C.x) / 2} y={B.y + 16} fontSize="10" fill="#334155" textAnchor="middle">a</text>
          </g>
        );
      })}
      <text x="290" y="244" fontSize="11" textAnchor="middle" fill="#475569">
        sin α = a · sin β / b: 1,25 (nincs) · 1 (α = 90°) · ≈ 0,833 (α ≈ 56,44° vagy ≈ 123,56°)
      </text>
    </svg>
  );
};

// 5. ábra: Házi feladat – a pisai ferde torony „kiegyenesítve” (4° dőlés, 77°, 9 m árnyék)
export const PisaTowerSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 3;
  const L = (9 * sin(77)) / sin(9);
  const F = { x: 300, y: 235 };
  const T = { x: F.x - L * k * sin(4), y: F.y - L * k * Math.cos(toRad(4)) };
  const S = { x: F.x + 9 * k, y: F.y };
  return (
    <svg viewBox="0 0 580 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Milyen magas lenne a pisai torony kiegyenesítve?
      </text>
      <line x1="40" y1={F.y} x2="540" y2={F.y} stroke="#a16207" strokeWidth="3" />
      <text x="60" y={F.y + 20} fontSize="11" fill="#a16207">dél</text>
      <text x="520" y={F.y + 20} fontSize="11" fill="#a16207" textAnchor="end">észak</text>
      {/* napsugár a torony csúcsán át az árnyék végéig */}
      <line
        x1={T.x - 0.12 * (S.x - T.x)}
        y1={T.y - 0.12 * (S.y - T.y)}
        x2={S.x}
        y2={S.y}
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <line x1={F.x} y1={F.y} x2={F.x} y2={T.y} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 4" />
      <line x1={F.x} y1={F.y} x2={T.x} y2={T.y} stroke="#334155" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <line x1={F.x} y1={F.y} x2={S.x} y2={S.y} stroke="#0f172a" strokeWidth="4" />
      <path d={arcBetween(F.x, F.y, 60, 90, 94)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={F.x - 26} y={F.y - 66} fontSize="12" fontWeight="bold" fill="#b91c1c" textAnchor="end">4°</text>
      <path d={arcBetween(S.x, S.y, 24, dirDeg(S, T), 180)} fill="none" stroke="#d97706" strokeWidth="2" />
      <text x={S.x + 6} y={S.y - 26} fontSize="12" fontWeight="bold" fill="#b45309">77°</text>
      <text x={(F.x + S.x) / 2} y={F.y + 18} fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="middle">9 m</text>
      <text x={T.x - 14} y={(T.y + F.y) / 2} fontSize="12" fontWeight="bold" fill="#334155" textAnchor="end">L = ?</text>
      <rect x="360" y="70" width="190" height="64" rx="10" fill="#ffffff" stroke="#fde68a" />
      <text x="455" y="92" fontSize="12" textAnchor="middle" fill="#78350f">szögek: 77°, 94°, 9°</text>
      <text x="455" y="114" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#78350f">L = 9 · sin 77° / sin 9° ≈ 56 m</text>
    </svg>
  );
};
