import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Pont a (cx, cy) középpontú, R sugarú körön; a szöget matematikai irányban mérjük (képernyőn felfelé). */
const onCircle = (cx: number, cy: number, R: number, deg: number) => ({
  x: cx + R * Math.cos(toRad(deg)),
  y: cy - R * Math.sin(toRad(deg))
});

const pts = (list: { x: number; y: number }[]) => list.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

/** Körcikk path: középpontból a `from` foktól a `to` fokig (pozitív irányban). */
const sectorPath = (cx: number, cy: number, R: number, from: number, to: number) => {
  const a = onCircle(cx, cy, R, from);
  const b = onCircle(cx, cy, R, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${R} ${R} 0 ${large} 0 ${b.x.toFixed(2)} ${b.y.toFixed(2)} Z`;
};

/** Körszelet path: húr + ív a `from` foktól a `to` fokig. */
const segmentPath = (cx: number, cy: number, R: number, from: number, to: number) => {
  const a = onCircle(cx, cy, R, from);
  const b = onCircle(cx, cy, R, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${R} ${R} 0 ${large} 0 ${b.x.toFixed(2)} ${b.y.toFixed(2)} Z`;
};

/** Ív path (csak a görbe) – szögjelöléshez. */
const arcOnly = (cx: number, cy: number, R: number, from: number, to: number) => {
  const a = onCircle(cx, cy, R, from);
  const b = onCircle(cx, cy, R, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${R} ${R} 0 ${large} 0 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. u1, u2: a két szár iránya (tetszőleges hosszú vektor). */
const RightAngleArc: React.FC<{ x: number; y: number; u1: { x: number; y: number }; u2: { x: number; y: number }; r?: number; color?: string }> = ({
  x,
  y,
  u1,
  u2,
  r = 14,
  color = "#475569"
}) => {
  const n1 = Math.hypot(u1.x, u1.y);
  const n2 = Math.hypot(u2.x, u2.y);
  const a = { x: u1.x / n1, y: u1.y / n1 };
  const b = { x: u2.x / n2, y: u2.y / n2 };
  const sweep = a.x * b.y - a.y * b.x > 0 ? 1 : 0;
  const bis = { x: a.x + b.x, y: a.y + b.y };
  const nb = Math.hypot(bis.x, bis.y) || 1;
  return (
    <g>
      <path
        d={`M ${(x + r * a.x).toFixed(2)} ${(y + r * a.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(x + r * b.x).toFixed(2)} ${(y + r * b.y).toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={x + (0.5 * r * bis.x) / nb} cy={y + (0.5 * r * bis.y) / nb} r="1.8" fill={color} />
    </g>
  );
};

// 1. ábra: Kilencküllős dísztárcsa – szabályos kilencszög a kerékben
export const HubcapNonagonSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 200;
  const cy = 170;
  const R = 120;
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  // A a felső csúcs, utána az óramutató járásával megegyezően
  const vertices = labels.map((_, i) => onCircle(cx, cy, R, 110 - i * 40));
  return (
    <svg viewBox="0 0 560 340" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="330" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Kilencküllős dísztárcsa – szabályos kilencszög
      </text>
      {/* gumi és tárcsa */}
      <circle cx={cx} cy={cy} r={R + 22} fill="#334155" />
      <circle cx={cx} cy={cy} r={R + 6} fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
      {/* küllők */}
      {vertices.map((v, i) => (
        <line key={`k${i}`} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
      ))}
      {/* kilencszög */}
      <polygon points={pts(vertices)} fill="rgba(59,130,246,0.08)" stroke="#2563eb" strokeWidth="2" />
      {/* AOB háromszög kiemelése */}
      <polygon points={pts([{ x: cx, y: cy }, vertices[0], vertices[1]])} fill="rgba(245,158,11,0.25)" stroke="#d97706" strokeWidth="2.5" />
      <path d={arcOnly(cx, cy, 28, 70, 110)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={cx + 4} y={cy - 36} fontSize="12" fontWeight="bold" fill="#b91c1c">40°</text>
      <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
      <text x={cx - 18} y={cy + 18} fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
      {vertices.map((v, i) => {
        const lp = onCircle(cx, cy, R + 36, 110 - i * 40);
        return (
          <text key={`l${i}`} x={lp.x} y={lp.y + 4} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
            {labels[i]}
          </text>
        );
      })}
      {/* magyarázó szöveg */}
      <g fontSize="12" fill="#334155">
        <text x="370" y="80" fontWeight="bold" fill="#0f172a">Adatok</text>
        <text x="370" y="102">OA = 17,5 cm</text>
        <text x="370" y="118">(a köré írt kör sugara)</text>
        <text x="370" y="136">n = 9 csúcs</text>
        <text x="370" y="156" fontWeight="bold" fill="#0f172a">Középponti szög</text>
        <text x="370" y="178">AOB∠ = 360° : 9 = 40°</text>
        <text x="370" y="210" fontWeight="bold" fill="#0f172a">A kilencszög 9 db</text>
        <text x="370" y="230">egybevágó, egyenlő szárú</text>
        <text x="370" y="250">háromszögből áll.</text>
      </g>
    </svg>
  );
};

// 2. ábra: Az AOB egyenlő szárú háromszög a magassággal (20° + 20°)
export const NonagonTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // méretarányos: R = 17,5 → 230 px, félszög 20°
  const O = { x: 280, y: 50 };
  const L = 230;
  const A = { x: O.x - L * Math.sin(toRad(20)), y: O.y + L * Math.cos(toRad(20)) };
  const B = { x: O.x + L * Math.sin(toRad(20)), y: A.y };
  const P = { x: O.x, y: A.y };
  return (
    <svg viewBox="0 0 560 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points={pts([O, A, B])} fill="rgba(245,158,11,0.15)" stroke="#d97706" strokeWidth="2.5" />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 4" />
      <RightAngleArc x={P.x} y={P.y} u1={{ x: -1, y: 0 }} u2={{ x: 0, y: -1 }} />
      <path d={arcOnly(O.x, O.y, 42, 250, 270)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={arcOnly(O.x, O.y, 48, 270, 290)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={O.x - 30} y={O.y + 62} fontSize="12" fontWeight="bold" fill="#b91c1c">20°</text>
      <text x={O.x + 8} y={O.y + 66} fontSize="12" fontWeight="bold" fill="#b91c1c">20°</text>
      <text x={O.x - 6} y={O.y - 10} fontSize="14" fontWeight="bold" fill="#0f172a">O</text>
      <text x={A.x - 18} y={A.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 8} y={B.y + 6} fontSize="14" fontWeight="bold" fill="#0f172a">B</text>
      <text x={P.x - 4} y={P.y + 20} fontSize="13" fontWeight="bold" fill="#0f172a">P</text>
      <text x={(O.x + A.x) / 2 - 62} y={(O.y + A.y) / 2} fontSize="13" fontWeight="bold" fill="#1d4ed8">17,5 cm</text>
      <text x={(O.x + B.x) / 2 + 12} y={(O.y + B.y) / 2} fontSize="13" fontWeight="bold" fill="#1d4ed8">17,5 cm</text>
      <text x={(A.x + P.x) / 2} y={P.y + 20} fontSize="12" textAnchor="middle" fill="#047857">x/2</text>
      <text x={(B.x + P.x) / 2} y={P.y + 20} fontSize="12" textAnchor="middle" fill="#047857">x/2</text>
      <g fontSize="12" fill="#334155">
        <text x="20" y="250">AP = 17,5 · sin 20°</text>
        <text x="20" y="270">x = 2 · AP ≈ 12 cm</text>
        <text x="390" y="250">T(AOB) = ½ · 17,5² · sin 40°</text>
        <text x="390" y="270">≈ 98,4 cm²</text>
      </g>
    </svg>
  );
};

// 3. ábra: Körív és körcikk – egyenes arányosság a középponti szöggel
export const ArcSectorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 160;
  const cy = 165;
  const R = 110;
  const alpha = 70;
  const from = 20;
  const A = onCircle(cx, cy, R, from);
  const B = onCircle(cx, cy, R, from + alpha);
  return (
    <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Körív és körcikk
      </text>
      <circle cx={cx} cy={cy} r={R} fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
      <path d={sectorPath(cx, cy, R, from, from + alpha)} fill="rgba(16,185,129,0.25)" stroke="#059669" strokeWidth="2" />
      <path d={arcOnly(cx, cy, R, from, from + alpha)} fill="none" stroke="#dc2626" strokeWidth="4" />
      <path d={arcOnly(cx, cy, 26, from, from + alpha)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={cx + 30} y={cy - 22} fontSize="13" fontWeight="bold" fill="#6d28d9">α</text>
      <circle cx={cx} cy={cy} r="3.5" fill="#0f172a" />
      <text x={cx - 16} y={cy + 16} fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
      <text x={A.x + 8} y={A.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x - 4} y={B.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={(cx + A.x) / 2 + 4} y={(cy + A.y) / 2 + 18} fontSize="12" fill="#334155">r</text>
      <text x={onCircle(cx, cy, R + 16, from + alpha / 2).x} y={onCircle(cx, cy, R + 16, from + alpha / 2).y} fontSize="14" fontWeight="bold" fill="#b91c1c">i</text>
      <text x={onCircle(cx, cy, 64, from + alpha / 2).x - 4} y={onCircle(cx, cy, 64, from + alpha / 2).y + 4} fontSize="14" fontWeight="bold" fill="#047857">t</text>
      <g fontSize="13" fill="#334155">
        <text x="310" y="80" fontWeight="bold" fill="#b91c1c">Körív hossza</text>
        <text x="310" y="102">i = 2rπ · α/360° = rπα/180°</text>
        <text x="310" y="144" fontWeight="bold" fill="#047857">Körcikk területe</text>
        <text x="310" y="166">t = r²π · α/360°</text>
        <text x="310" y="188">t = i · r / 2</text>
        <text x="310" y="232" fontWeight="bold" fill="#6d28d9">Egyenes arányosság</text>
        <text x="310" y="254">kétszeres α → kétszeres i és t</text>
      </g>
    </svg>
  );
};

// 4. ábra: Körszelet = körcikk − AOB háromszög
export const CircularSegmentSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const R = 70;
  const alpha = 100;
  const from = 90 - alpha / 2;
  const panel = (cx: number, mode: 'sector' | 'triangle' | 'segment') => {
    const cy = 150;
    const A = onCircle(cx, cy, R, from);
    const B = onCircle(cx, cy, R, from + alpha);
    return (
      <g>
        <circle cx={cx} cy={cy} r={R} fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        {mode === 'sector' && <path d={sectorPath(cx, cy, R, from, from + alpha)} fill="rgba(16,185,129,0.3)" stroke="#059669" strokeWidth="2" />}
        {mode === 'triangle' && <polygon points={pts([{ x: cx, y: cy }, A, B])} fill="rgba(245,158,11,0.3)" stroke="#d97706" strokeWidth="2" />}
        {mode === 'segment' && <path d={segmentPath(cx, cy, R, from, from + alpha)} fill="rgba(59,130,246,0.35)" stroke="#2563eb" strokeWidth="2" />}
        {mode !== 'segment' && <path d={arcOnly(cx, cy, 18, from, from + alpha)} fill="none" stroke="#7c3aed" strokeWidth="1.5" />}
        {mode !== 'segment' && <text x={cx - 4} y={cy - 24} fontSize="11" fontWeight="bold" fill="#6d28d9">α</text>}
        <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
        <text x={cx - 5} y={cy + 16} fontSize="11" fontWeight="bold" fill="#0f172a">O</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A körszelet területe
      </text>
      {panel(95, 'sector')}
      <text x="183" y="145" fontSize="26" textAnchor="middle" fontWeight="bold" fill="#334155">−</text>
      {panel(275, 'triangle')}
      <text x="363" y="145" fontSize="26" textAnchor="middle" fontWeight="bold" fill="#334155">=</text>
      {panel(455, 'segment')}
      <g fontSize="12" textAnchor="middle" fontWeight="bold">
        <text x="95" y="250" fill="#047857">körcikk: r²πα/360°</text>
        <text x="275" y="250" fill="#b45309">háromszög: r²·sin α / 2</text>
        <text x="455" y="250" fill="#1d4ed8">körszelet</text>
      </g>
    </svg>
  );
};

// 5. ábra: 1. feladat – 8,4 cm sugarú kör, AB = 1,6r
export const ChordCircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 170;
  const cy = 160;
  const R = 115;
  const alpha = (2 * Math.asin(0.8) * 180) / Math.PI; // ≈ 106,26°
  const from = 270 - alpha / 2;
  const A = onCircle(cx, cy, R, from);
  const B = onCircle(cx, cy, R, from + alpha);
  return (
    <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R} fill="rgba(148,163,184,0.12)" stroke="#64748b" strokeWidth="1.5" />
      <path d={segmentPath(cx, cy, R, from, from + alpha)} fill="rgba(59,130,246,0.3)" stroke="#2563eb" strokeWidth="1.5" />
      <polygon points={pts([{ x: cx, y: cy }, A, B])} fill="rgba(245,158,11,0.2)" stroke="#d97706" strokeWidth="1.5" />
      <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#dc2626" strokeWidth="2.5" />
      <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="2.5" />
      <path d={arcOnly(cx, cy, 26, from, from + alpha)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={cx - 22} y={cy + 44} fontSize="12" fontWeight="bold" fill="#6d28d9">≈106,3°</text>
      <circle cx={cx} cy={cy} r="3.5" fill="#0f172a" />
      <text x={cx - 6} y={cy - 10} fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
      <text x={A.x - 18} y={A.y + 12} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 6} y={B.y + 12} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={cx} y={A.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">1,6r</text>
      <text x={(cx + A.x) / 2 - 18} y={(cy + A.y) / 2} fontSize="12" fill="#b91c1c">r</text>
      <g fontSize="11" fill="#334155">
        <text x="320" y="70" fontWeight="bold" fill="#0f172a">r = 8,4 cm; AB = 13,44 cm</text>
        <text x="320" y="96">sin(α/2) = 0,8r / r = 0,8</text>
        <text x="320" y="116">α/2 ≈ 53,13° → α ≈ 106,26°</text>
        <text x="320" y="146">T(AOB) = ½ · 8,4² · sin α ≈ 33,87 cm²</text>
        <text x="320" y="172">kisebbik ív ≈ 15,58 cm</text>
        <text x="320" y="192">nagyobbik ív ≈ 37,20 cm</text>
        <text x="320" y="222">körcikkek ≈ 65,43 és 156,24 cm²</text>
        <text x="320" y="248" fill="#1d4ed8" fontWeight="bold">kisebbik körszelet ≈ 31,56 cm²</text>
        <text x="320" y="268" fill="#1d4ed8" fontWeight="bold">nagyobbik körszelet ≈ 190,11 cm²</text>
      </g>
    </svg>
  );
};

// 6. ábra: Házi feladat 1. – vízszintes cső keresztmetszete, 20 cm magas víz
export const PipeWaterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 170;
  const cy = 155;
  const R = 120; // 30 cm ↔ 120 px
  const half = (Math.acos(1 / 3) * 180) / Math.PI; // ≈ 70,53°
  const from = 270 - half;
  const A = onCircle(cx, cy, R, from);
  const B = onCircle(cx, cy, R, from + 2 * half);
  return (
    <svg viewBox="0 0 560 310" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="300" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R + 8} fill="#cbd5e1" />
      <circle cx={cx} cy={cy} r={R} fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
      <path d={segmentPath(cx, cy, R, from, from + 2 * half)} fill="rgba(37,99,235,0.45)" stroke="#1d4ed8" strokeWidth="2" />
      <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1={cx} y1={cy} x2={cx} y2={cy + R} stroke="#7c3aed" strokeWidth="1.5" />
      <path d={arcOnly(cx, cy, 22, from, from + 2 * half)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={cx + 8} y={cy + 32} fontSize="11" fontWeight="bold" fill="#b91c1c">α</text>
      <circle cx={cx} cy={cy} r="3.5" fill="#0f172a" />
      <text x={cx - 18} y={cy - 6} fontSize="13" fontWeight="bold" fill="#0f172a">O</text>
      <text x={cx + 6} y={cy + (R / 3) / 2 + 4} fontSize="11" fill="#6d28d9">10</text>
      <line x1={cx + R + 20} y1={cy + R} x2={cx + R + 20} y2={cy + R / 3} stroke="#0f172a" strokeWidth="1.2" />
      <text x={cx + R + 26} y={cy + (2 * R) / 3 + 4} fontSize="12" fontWeight="bold" fill="#0f172a">20 cm</text>
      <text x={cx - R - 2} y={cy - R + 6} fontSize="12" fill="#334155">r = 30 cm</text>
      <g fontSize="11" fill="#334155">
        <text x="340" y="70" fontWeight="bold" fill="#0f172a">A víz a középpont alatt</text>
        <text x="340" y="90">30 − 20 = 10 cm-rel áll.</text>
        <text x="340" y="120">cos(α/2) = 10 / 30 → α ≈ 141,06°</text>
        <text x="340" y="150">körcikk ≈ 1107,9 cm²</text>
        <text x="340" y="170">háromszög ≈ 282,8 cm²</text>
        <text x="340" y="196" fill="#1d4ed8" fontWeight="bold">körszelet ≈ 825,0 cm²</text>
        <text x="340" y="226">V ≈ 825,0 · 260 cm³ ≈ 214,5 liter</text>
        <text x="340" y="250">a cső kb. 29%-a víz</text>
      </g>
    </svg>
  );
};
