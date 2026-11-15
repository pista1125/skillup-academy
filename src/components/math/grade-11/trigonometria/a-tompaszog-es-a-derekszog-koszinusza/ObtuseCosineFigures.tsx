import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Szögív path az (x, y) csúcsnál, `from` foktól `to` fokig (matematikai pozitív irányban, képernyőn felfelé). */
const arcPath = (x: number, y: number, r: number, from: number, to: number) => {
  const sx = x + r * Math.cos(toRad(from));
  const sy = y - r * Math.sin(toRad(from));
  const ex = x + r * Math.cos(toRad(to));
  const ey = y - r * Math.sin(toRad(to));
  const large = to - from > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
};

/**
 * Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont.
 * V a csúcs, u1 és u2 a két szár irányába mutató egységvektor (képernyő-koordinátákban).
 */
const RightAngleArc: React.FC<{
  V: { x: number; y: number };
  u1: { x: number; y: number };
  u2: { x: number; y: number };
  r?: number;
  color?: string;
}> = ({ V, u1, u2, r = 14, color = '#475569' }) => {
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bl = Math.hypot(bx, by) || 1;
  const k = 0.45 * r * Math.SQRT2;
  return (
    <g>
      <path
        d={`M ${(V.x + r * u1.x).toFixed(2)} ${(V.y + r * u1.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * u2.x).toFixed(2)} ${(V.y + r * u2.y).toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={V.x + (k * bx) / bl} cy={V.y + (k * by) / bl} r="1.8" fill={color} />
    </g>
  );
};

const Axes: React.FC<{ O: { x: number; y: number }; R: number; left?: boolean }> = ({ O, R, left = true }) => (
  <g>
    <line x1={left ? O.x - R - 30 : O.x - 20} y1={O.y} x2={O.x + R + 30} y2={O.y} stroke="#475569" strokeWidth="1.5" />
    <line x1={O.x} y1={O.y + 20} x2={O.x} y2={O.y - R - 30} stroke="#475569" strokeWidth="1.5" />
    <polygon points={`${O.x + R + 30},${O.y} ${O.x + R + 22},${O.y - 4} ${O.x + R + 22},${O.y + 4}`} fill="#475569" />
    <polygon points={`${O.x},${O.y - R - 30} ${O.x - 4},${O.y - R - 22} ${O.x + 4},${O.y - R - 22}`} fill="#475569" />
    <text x={O.x + R + 26} y={O.y + 18} fontSize="13" fontStyle="italic" fill="#334155">x</text>
    <text x={O.x + 10} y={O.y - R - 22} fontSize="13" fontStyle="italic" fill="#334155">y</text>
    <text x={O.x - 12} y={O.y + 16} fontSize="12" fill="#334155">0</text>
  </g>
);

// 1. ábra: Hegyesszög az egységkörben – P(cos α; sin α)
export const UnitCircleAcuteSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 150, y: 250 };
  const R = 190;
  const a = 50;
  const P = { x: O.x + R * Math.cos(toRad(a)), y: O.y - R * Math.sin(toRad(a)) };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="420" y="34" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hegyesszög az egységkörön
      </text>
      <Axes O={O} R={R} left={false} />
      <path d={arcPath(O.x, O.y, R, 0, 90)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
      <polygon
        points={`${O.x},${O.y} ${P.x},${O.y} ${P.x},${P.y}`}
        fill="rgba(59,130,246,0.10)"
        stroke="#2563eb"
        strokeWidth="1.5"
      />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#0f172a" strokeWidth="2.5" />
      <line x1={O.x} y1={O.y} x2={P.x} y2={O.y} stroke="#dc2626" strokeWidth="4" />
      <line x1={P.x} y1={O.y} x2={P.x} y2={P.y} stroke="#059669" strokeWidth="4" />
      <RightAngleArc V={{ x: P.x, y: O.y }} u1={{ x: -1, y: 0 }} u2={{ x: 0, y: -1 }} />
      <path d={arcPath(O.x, O.y, 40, 0, a)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={O.x + 46} y={O.y - 14} fontSize="14" fontWeight="bold" fill="#b91c1c">α</text>
      <circle cx={P.x} cy={P.y} r="5" fill="#7c3aed" />
      <text x={P.x + 10} y={P.y - 8} fontSize="13" fontWeight="bold" fill="#5b21b6">P(cos α; sin α)</text>
      <text x={(O.x + P.x) / 2} y={O.y + 20} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#b91c1c">cos α</text>
      <text x={P.x + 8} y={(O.y + P.y) / 2 + 4} fontSize="13" fontWeight="bold" fill="#047857">sin α</text>
      <text x={(O.x + P.x) / 2 - 18} y={(O.y + P.y) / 2 - 6} fontSize="12" fill="#334155">1</text>
      <rect x="350" y="120" width="190" height="64" rx="10" fill="#ffffff" stroke="#c7d2fe" />
      <text x="445" y="146" fontSize="13" textAnchor="middle" fill="#312e81">sin α = y / 1 ⇒ y = sin α</text>
      <text x="445" y="168" fontSize="13" textAnchor="middle" fill="#312e81">cos α = x / 1 ⇒ x = cos α</text>
    </svg>
  );
};

// 2. ábra: Tompaszög az egységkörön – Q(cos β; sin β), cos β = −cos(180° − β)
export const UnitCircleObtuseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 300, y: 250 };
  const R = 190;
  const b = 130;
  const Q = { x: O.x + R * Math.cos(toRad(b)), y: O.y - R * Math.sin(toRad(b)) };
  const Qm = { x: O.x - R * Math.cos(toRad(b)), y: Q.y };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="140" y="34" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Tompaszög az egységkörön
      </text>
      <Axes O={O} R={R} />
      <path d={arcPath(O.x, O.y, R, 0, 180)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
      {/* tükörkép az I. síknegyedben */}
      <line x1={O.x} y1={O.y} x2={Qm.x} y2={Qm.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <line x1={Qm.x} y1={O.y} x2={Qm.x} y2={Qm.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <line x1={Q.x} y1={Q.y} x2={Qm.x} y2={Qm.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
      {/* Q pont és vetületei */}
      <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#0f172a" strokeWidth="2.5" />
      <line x1={O.x} y1={O.y} x2={Q.x} y2={O.y} stroke="#dc2626" strokeWidth="4" />
      <line x1={Q.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="#059669" strokeWidth="4" />
      <path d={arcPath(O.x, O.y, 34, 0, b)} fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="2" />
      <text x={O.x + 8} y={O.y - 40} fontSize="14" fontWeight="bold" fill="#6d28d9">β</text>
      <path d={arcPath(O.x, O.y, 58, b, 180)} fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x={O.x - 112} y={O.y - 30} fontSize="12" fontWeight="bold" fill="#b45309">180° − β</text>
      <circle cx={Q.x} cy={Q.y} r="5" fill="#7c3aed" />
      <text x={Q.x - 10} y={Q.y - 12} fontSize="13" fontWeight="bold" textAnchor="end" fill="#5b21b6">Q(cos β; sin β)</text>
      <circle cx={Qm.x} cy={Qm.y} r="4" fill="#94a3b8" />
      <text x={(O.x + Q.x) / 2} y={O.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#b91c1c">cos β &lt; 0</text>
      <text x={Q.x - 8} y={(O.y + Q.y) / 2 + 36} fontSize="12" textAnchor="end" fontWeight="bold" fill="#047857">sin β</text>
      <rect x="370" y="40" width="175" height="56" rx="10" fill="#ffffff" stroke="#fde68a" />
      <text x="457" y="63" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">cos β = −cos(180° − β)</text>
      <text x="457" y="84" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">sin β = sin(180° − β)</text>
    </svg>
  );
};

// 3. ábra: A derékszög koszinusza – M(0; 1)
export const RightAngleCosineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 200, y: 250 };
  const R = 180;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="420" y="34" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A derékszög koszinusza
      </text>
      <Axes O={O} R={R} />
      <path d={arcPath(O.x, O.y, R, 0, 180)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1={O.x} y1={O.y} x2={O.x} y2={O.y - R} stroke="#0f172a" strokeWidth="3" />
      <RightAngleArc V={O} u1={{ x: 1, y: 0 }} u2={{ x: 0, y: -1 }} r={18} color="#dc2626" />
      <text x={O.x + 22} y={O.y - 22} fontSize="13" fontWeight="bold" fill="#b91c1c">90°</text>
      <circle cx={O.x} cy={O.y - R} r="6" fill="#7c3aed" />
      <text x={O.x + 12} y={O.y - R + 4} fontSize="14" fontWeight="bold" fill="#5b21b6">M(0; 1)</text>
      <circle cx={O.x + R} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x + R - 4} y={O.y + 18} fontSize="12" fill="#334155">1</text>
      <circle cx={O.x - R} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x - R - 6} y={O.y + 18} fontSize="12" fill="#334155">−1</text>
      <rect x="360" y="110" width="180" height="70" rx="10" fill="#ffffff" stroke="#ddd6fe" />
      <text x="450" y="136" fontSize="13" textAnchor="middle" fill="#4c1d95">M(cos 90°; sin 90°)</text>
      <text x="450" y="160" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">cos 90° = 0; sin 90° = 1</text>
    </svg>
  );
};

// 4. ábra: A koszinusz értékei 0° és 180° között
export const CosineGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 60;
  const y0 = 150;
  const w = 450;
  const h = 100;
  const pts = Array.from({ length: 91 }, (_, i) => {
    const deg = i * 2;
    return `${(x0 + (deg / 180) * w).toFixed(1)},${(y0 - h * Math.cos(toRad(deg))).toFixed(1)}`;
  }).join(' ');
  const marks = [0, 30, 60, 90, 120, 150, 180];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        cos α értékei 0° ≤ α ≤ 180° esetén
      </text>
      <rect x={x0} y={y0 - h} width={w / 2} height={h} fill="rgba(16,185,129,0.08)" />
      <rect x={x0 + w / 2} y={y0} width={w / 2} height={h} fill="rgba(239,68,68,0.08)" />
      <line x1={x0} y1={y0} x2={x0 + w + 10} y2={y0} stroke="#475569" strokeWidth="1.5" />
      <line x1={x0} y1={y0 + h + 10} x2={x0} y2={y0 - h - 10} stroke="#475569" strokeWidth="1.5" />
      {[1, -1].map((v) => (
        <g key={v}>
          <line x1={x0 - 4} y1={y0 - h * v} x2={x0 + w} y2={y0 - h * v} stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x={x0 - 8} y={y0 - h * v + 4} fontSize="11" textAnchor="end" fill="#334155">{v}</text>
        </g>
      ))}
      {marks.map((m) => (
        <g key={m}>
          <line x1={x0 + (m / 180) * w} y1={y0 - 4} x2={x0 + (m / 180) * w} y2={y0 + 4} stroke="#475569" />
          <text x={x0 + (m / 180) * w} y={y0 + (m > 90 ? -10 : 18)} fontSize="11" textAnchor="middle" fill="#334155">
            {m}°
          </text>
        </g>
      ))}
      <polyline points={pts} fill="none" stroke="#2563eb" strokeWidth="3" />
      <circle cx={x0 + w / 2} cy={y0} r="5" fill="#7c3aed" />
      <text x={x0 + w / 2 + 8} y={y0 - 12} fontSize="12" fontWeight="bold" fill="#5b21b6">cos 90° = 0</text>
      <text x={x0 + w / 4} y={y0 - h + 22} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#047857">
        hegyesszög: 0 &lt; cos α &lt; 1
      </text>
      <text x={x0 + (3 * w) / 4} y={y0 + h - 12} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#b91c1c">
        tompaszög: −1 &lt; cos α &lt; 0
      </text>
      <text x="280" y="282" fontSize="11" textAnchor="middle" fill="#475569">
        A grafikon a 90°-os pontra középpontosan szimmetrikus: cos(180° − α) = −cos α
      </text>
    </svg>
  );
};

// 5. ábra: Egyenlő szárú háromszög tompa szárszöggel (4. a) feladat: cos γ = −0,777)
export const IsoscelesObtuseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 80, y: 220 };
  const B = { x: 480, y: 220 };
  const base = 19.51;
  const halfW = (B.x - A.x) / 2;
  const C = { x: (A.x + B.x) / 2, y: A.y - halfW * Math.tan(toRad(base)) };
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Egyenlő szárú háromszög: cos γ = −0,777
      </text>
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <path d={arcPath(A.x, A.y, 60, 0, base)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={arcPath(B.x, B.y, 60, 180 - base, 180)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={arcPath(C.x, C.y, 30, 180 + base, 360 - base)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 66} y={A.y - 6} fontSize="12" fontWeight="bold" fill="#1d4ed8">α ≈ 19,5°</text>
      <text x={B.x - 66} y={B.y - 6} fontSize="12" fontWeight="bold" textAnchor="end" fill="#1d4ed8">α ≈ 19,5°</text>
      <text x={C.x} y={C.y - 10} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#b91c1c">γ ≈ 141,0°</text>
      <text x="280" y="250" fontSize="12" textAnchor="middle" fill="#475569">
        Negatív koszinusz ⇒ tompaszög ⇒ csak a szárszög lehet; az alapon fekvő szögek (180° − γ) / 2
      </text>
    </svg>
  );
};
