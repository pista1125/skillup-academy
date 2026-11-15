import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Szögív a P csúcsnál az u pont irányától a v pont irányáig (a rövidebb úton). */
const angleArc = (P: Pt, u: Pt, v: Pt, r: number) => {
  const nu = Math.hypot(u.x - P.x, u.y - P.y);
  const nv = Math.hypot(v.x - P.x, v.y - P.y);
  const e1 = { x: (u.x - P.x) / nu, y: (u.y - P.y) / nu };
  const e2 = { x: (v.x - P.x) / nv, y: (v.y - P.y) / nv };
  const sweep = e1.x * e2.y - e1.y * e2.x > 0 ? 1 : 0;
  return `M ${(P.x + e1.x * r).toFixed(2)} ${(P.y + e1.y * r).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(P.x + e2.x * r).toFixed(2)} ${(P.y + e2.y * r).toFixed(2)}`;
};

/** Derékszög-jel (magyar jelölés: negyedkörív ponttal) a P csúcsnál, az u és v pontok felé mutató szárak között. */
const RightMark: React.FC<{ P: Pt; u: Pt; v: Pt; size?: number; color?: string }> = ({ P, u, v, size = 14, color = '#475569' }) => {
  const nu = Math.hypot(u.x - P.x, u.y - P.y);
  const nv = Math.hypot(v.x - P.x, v.y - P.y);
  const e1 = { x: (u.x - P.x) / nu, y: (u.y - P.y) / nu };
  const e2 = { x: (v.x - P.x) / nv, y: (v.y - P.y) / nv };
  const bis = { x: e1.x + e2.x, y: e1.y + e2.y };
  const nb = Math.hypot(bis.x, bis.y) || 1;
  const dot = { x: P.x + (bis.x / nb) * size * 0.55, y: P.y + (bis.y / nb) * size * 0.55 };
  return (
    <g>
      <path d={angleArc(P, u, v, size)} fill="none" stroke={color} strokeWidth="1.5" />
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

const AK_LEN = 250 * Math.tan(toRad(36)); // ≈ 181,6 m
const AB_LEN = AK_LEN * Math.tan(toRad(32)); // ≈ 113,5 m
const AL_LEN = 250 / Math.cos(toRad(36)); // ≈ 309 m

// 1. ábra: A mérés térben – torony a folyó túlsó partján, K és L mérési pont
export const TowerPerspectiveSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 0.95;
  const P = (X: number, Y: number, Z: number): Pt => ({
    x: 110 + s * X + s * 0.5 * Math.cos(toRad(40)) * Y,
    y: 262 - s * 0.5 * Math.sin(toRad(40)) * Y - s * Z
  });
  const K = P(0, 0, 0);
  const L = P(250, 0, 0);
  const A = P(0, AK_LEN, 0);
  const B = P(0, AK_LEN, AB_LEN);
  const g1 = P(-60, -20, 0);
  const g2 = P(330, -20, 0);
  const g3 = P(330, 240, 0);
  const g4 = P(-60, 240, 0);
  const r1 = P(-60, 50, 0);
  const r2 = P(330, 50, 0);
  const r3 = P(330, 140, 0);
  const r4 = P(-60, 140, 0);
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="A torony a folyó túlsó partján áll" />
      <polygon points={`${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y} ${g4.x},${g4.y}`} fill="#ecfccb" stroke="#a3e635" />
      <polygon points={`${r1.x},${r1.y} ${r2.x},${r2.y} ${r3.x},${r3.y} ${r4.x},${r4.y}`} fill="#bae6fd" stroke="#38bdf8" />
      <text x={r2.x - 30} y={r2.y - 16} fontSize="11" fill="#0369a1" fontStyle="italic">folyó</text>
      {/* torony */}
      <rect x={A.x - 7} y={B.y} width="14" height={A.y - B.y} fill="#cbd5e1" stroke="#64748b" />
      <polygon points={`${A.x - 10},${B.y} ${A.x + 10},${B.y} ${A.x},${B.y - 16}`} fill="#94a3b8" stroke="#64748b" />
      {/* háromszögek */}
      <line x1={K.x} y1={K.y} x2={A.x} y2={A.y} stroke="#2563eb" strokeWidth="2" />
      <line x1={K.x} y1={K.y} x2={L.x} y2={L.y} stroke="#0f172a" strokeWidth="2.5" />
      <line x1={L.x} y1={L.y} x2={A.x} y2={A.y} stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 3" />
      <line x1={K.x} y1={K.y} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="2" />
      <line x1={L.x} y1={L.y} x2={B.x} y2={B.y} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#047857" strokeWidth="3" />
      <RightMark P={K} u={L} v={A} size={13} />
      <RightMark P={A} u={K} v={B} size={11} />
      <path d={angleArc(K, A, B, 34)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={K.x + 8} y={K.y - 40} fontSize="12" fontWeight="bold" fill="#b91c1c">32°</text>
      <path d={angleArc(L, K, A, 36)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={L.x - 56} y={L.y - 8} fontSize="12" fontWeight="bold" fill="#6d28d9">36°</text>
      {[
        { p: K, t: 'K', dx: -18, dy: 6 },
        { p: L, t: 'L', dx: 8, dy: 6 },
        { p: A, t: 'A', dx: 10, dy: 6 },
        { p: B, t: 'B', dx: 10, dy: -6 }
      ].map(({ p, t, dx, dy }) => (
        <text key={t} x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
      <text x={(K.x + L.x) / 2} y={K.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">250 m</text>
      <rect x="390" y="44" width="150" height="62" rx="10" fill="#ffffff" stroke="#bbf7d0" />
      <text x="465" y="66" fontSize="11.5" textAnchor="middle" fill="#14532d">AK = 250 · tg 36° ≈ 182 m</text>
      <text x="465" y="88" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#14532d">AB = AK · tg 32° ≈ 114 m</text>
    </svg>
  );
};

// 2. ábra: A két derékszögű háromszög külön – felülnézet (AKL) és oldalnézet (AKB)
export const TowerTwoTrianglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 0.8;
  const K1 = { x: 50, y: 262 };
  const L1 = { x: K1.x + 250 * s, y: K1.y };
  const A1 = { x: K1.x, y: K1.y - AK_LEN * s };
  const K2 = { x: 300, y: 262 };
  const A2 = { x: K2.x + AK_LEN * s, y: K2.y };
  const B2 = { x: A2.x, y: A2.y - AB_LEN * s };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Felülnézet: AKL △ • Oldalnézet: AKB △" />
      {/* felülnézet */}
      <polygon points={`${K1.x},${K1.y} ${L1.x},${L1.y} ${A1.x},${A1.y}`} fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <RightMark P={K1} u={L1} v={A1} />
      <path d={angleArc(L1, K1, A1, 34)} fill="none" stroke="#6d28d9" strokeWidth="2" />
      <text x={L1.x - 62} y={L1.y - 10} fontSize="12" fontWeight="bold" fill="#6d28d9">36°</text>
      <text x={K1.x - 16} y={K1.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">K</text>
      <text x={L1.x + 6} y={L1.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">L</text>
      <text x={A1.x - 16} y={A1.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={(K1.x + L1.x) / 2} y={K1.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">250 m</text>
      <text x={K1.x + 6} y={(K1.y + A1.y) / 2} fontSize="12" fontWeight="bold" fill="#2563eb">AK = ?</text>
      <text x={(A1.x + L1.x) / 2 + 10} y={(A1.y + L1.y) / 2 - 6} fontSize="11" fill="#6d28d9">AL</text>
      <text x="150" y="58" fontSize="11" textAnchor="middle" fill="#475569">vízszintes sík</text>
      {/* oldalnézet */}
      <line x1={K2.x - 10} y1={K2.y} x2={A2.x + 40} y2={A2.y} stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points={`${K2.x},${K2.y} ${A2.x},${A2.y} ${B2.x},${B2.y}`} fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <RightMark P={A2} u={K2} v={B2} />
      <path d={angleArc(K2, A2, B2, 40)} fill="none" stroke="#b91c1c" strokeWidth="2" />
      <text x={K2.x + 46} y={K2.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">32°</text>
      <text x={K2.x - 16} y={K2.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">K</text>
      <text x={A2.x + 6} y={A2.y + 14} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B2.x + 6} y={B2.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={(K2.x + A2.x) / 2} y={K2.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#2563eb">AK ≈ 182 m</text>
      <text x={A2.x + 8} y={(A2.y + B2.y) / 2 + 4} fontSize="12" fontWeight="bold" fill="#047857">AB = ?</text>
      <text x="420" y="58" fontSize="11" textAnchor="middle" fill="#475569">függőleges sík</text>
    </svg>
  );
};

// 3. ábra: 2. kidolgozott feladat – az LAB derékszögű háromszög
export const TowerFromLSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 1.3;
  const L = { x: 60, y: 250 };
  const A = { x: L.x + AL_LEN * s, y: L.y };
  const B = { x: A.x, y: A.y - AB_LEN * s };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="Mekkora szögben látjuk a tornyot L-ből?" />
      <line x1="30" y1={L.y} x2="530" y2={L.y} stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points={`${L.x},${L.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#047857" strokeWidth="3" />
      <RightMark P={A} u={L} v={B} />
      <path d={angleArc(L, A, B, 60)} fill="rgba(245,158,11,0.15)" stroke="#b45309" strokeWidth="2" />
      <text x={L.x + 66} y={L.y - 8} fontSize="13" fontWeight="bold" fill="#92400e">λ ≈ 20°</text>
      <text x={L.x - 16} y={L.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">L</text>
      <text x={A.x + 6} y={A.y + 14} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x + 6} y={B.y + 4} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={(L.x + A.x) / 2} y={L.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">
        AL = 250 : cos 36° ≈ 309 m
      </text>
      <text x={A.x - 8} y={(A.y + B.y) / 2} fontSize="12" textAnchor="end" fontWeight="bold" fill="#047857">AB ≈ 114 m</text>
      <rect x="70" y="48" width="230" height="40" rx="10" fill="#ffffff" stroke="#fde68a" />
      <text x="185" y="73" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#78350f">tg λ = 114 / 309 ≈ 0,369</text>
    </svg>
  );
};

// 4. ábra: 2. feladat – LED-lámpák világítási szöge (40 cm magasan)
export const LedLampSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 2.2; // px / cm
  const tableY = 236;
  const lamps = [
    { cx: 130, angle: 40, color: '#0ea5e9' },
    { cx: 400, angle: 110, color: '#f59e0b' }
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="LED-lámpák 40 cm magasan: világítási szög 40° és 110°" />
      <line x1="20" y1={tableY} x2="540" y2={tableY} stroke="#78350f" strokeWidth="4" />
      {lamps.map(({ cx, angle, color }) => {
        const top = { x: cx, y: tableY - 40 * s };
        const rad = 40 * Math.tan(toRad(angle / 2));
        const left = { x: cx - rad * s, y: tableY };
        const right = { x: cx + rad * s, y: tableY };
        const foot = { x: cx, y: tableY };
        return (
          <g key={angle}>
            <polygon points={`${top.x},${top.y} ${left.x},${left.y} ${right.x},${right.y}`} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" />
            <line x1={top.x} y1={top.y} x2={foot.x} y2={foot.y} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
            <RightMark P={foot} u={right} v={top} size={11} />
            <path d={angleArc(top, left, right, 22)} fill="none" stroke={color} strokeWidth="2" />
            <rect x={top.x - 12} y={top.y - 14} width="24" height="12" rx="3" fill="#334155" />
            <text x={top.x} y={top.y - 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill={color}>
              {angle}°
            </text>
            <text x={cx - 6} y={(top.y + foot.y) / 2 + 4} fontSize="11" textAnchor="end" fill="#334155">40 cm</text>
            <text x={cx} y={tableY + 18} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">
              átmérő ≈ {(2 * rad).toFixed(1).replace('.', ',')} cm
            </text>
          </g>
        );
      })}
      <text x="280" y="276" fontSize="11" textAnchor="middle" fill="#475569">r = h · tg(világítási szög / 2)</text>
    </svg>
  );
};

// 5. ábra: 3. feladat – szabályos négyoldalú gúla alakú háztető (10 m × 10 m, oldallapok 40°)
export const PyramidRoofSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const h = 5 * Math.tan(toRad(40));
  const P = (X: number, Y: number, Z: number): Pt => ({ x: 130 + 22 * X + 9 * Y, y: 262 - 6 * Y - 22 * Z });
  const c1 = P(0, 0, 0);
  const c2 = P(10, 0, 0);
  const c3 = P(10, 10, 0);
  const c4 = P(0, 10, 0);
  const T = P(5, 5, h);
  const O = P(5, 5, 0);
  const M = P(5, 0, 0);
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Gúla alakú háztető 10 m × 10 m-es alap fölött" />
      {/* rejtett élek */}
      <line x1={c1.x} y1={c1.y} x2={c4.x} y2={c4.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={c4.x} y1={c4.y} x2={c3.x} y2={c3.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={c4.x} y1={c4.y} x2={T.x} y2={T.y} stroke="#94a3b8" strokeDasharray="4 3" />
      {/* látható lapok */}
      <polygon points={`${c1.x},${c1.y} ${c2.x},${c2.y} ${T.x},${T.y}`} fill="rgba(220,38,38,0.12)" stroke="#b91c1c" strokeWidth="2" />
      <polygon points={`${c2.x},${c2.y} ${c3.x},${c3.y} ${T.x},${T.y}`} fill="rgba(220,38,38,0.2)" stroke="#b91c1c" strokeWidth="2" />
      {/* magasság és oldalmagasság */}
      <line x1={T.x} y1={T.y} x2={O.x} y2={O.y} stroke="#047857" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={O.x} y1={O.y} x2={M.x} y2={M.y} stroke="#047857" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1={T.x} y1={T.y} x2={M.x} y2={M.y} stroke="#7c3aed" strokeWidth="2" />
      <line x1={O.x} y1={O.y} x2={c1.x} y2={c1.y} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 3" />
      <RightMark P={O} u={M} v={T} size={10} color="#047857" />
      <path d={angleArc(M, O, T, 22)} fill="none" stroke="#6d28d9" strokeWidth="2" />
      <text x={M.x + 4} y={M.y - 22} fontSize="11" fontWeight="bold" fill="#6d28d9">40°</text>
      <path d={angleArc(c1, O, T, 30)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={c1.x + 34} y={c1.y - 6} fontSize="11" fontWeight="bold" fill="#1d4ed8">α</text>
      <text x={T.x + 4} y={(T.y + O.y) / 2} fontSize="13" fontWeight="bold" fill="#047857">h</text>
      <text x={(T.x + c1.x) / 2 - 14} y={(T.y + c1.y) / 2} fontSize="13" fontWeight="bold" fill="#b91c1c">x</text>
      <text x={(c1.x + c2.x) / 2 + 30} y={c1.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">10 m</text>
      <text x={(c2.x + c3.x) / 2 + 22} y={(c2.y + c3.y) / 2 + 6} fontSize="12" fontWeight="bold" fill="#334155">10 m</text>
      <rect x="400" y="44" width="140" height="104" rx="10" fill="#ffffff" stroke="#fecaca" />
      <text x="470" y="64" fontSize="11" textAnchor="middle" fill="#1e293b">h = 5 · tg 40° ≈ 4,2 m</text>
      <text x="470" y="84" fontSize="11" textAnchor="middle" fill="#1e293b">oldalmag. ≈ 6,53 m</text>
      <text x="470" y="104" fontSize="11" textAnchor="middle" fill="#1e293b">tető ≈ 130,5 m²</text>
      <text x="470" y="124" fontSize="11" textAnchor="middle" fill="#1e293b">x ≈ 8,2 m</text>
      <text x="470" y="142" fontSize="11" textAnchor="middle" fill="#1e293b">α ≈ 30,7°</text>
    </svg>
  );
};

// 6. ábra: 5. feladat – a kocka testátlója és a fedőlap szöge
export const CubeDiagonalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const e = 3.2;
  const P = (X: number, Y: number, Z: number): Pt => ({ x: 150 + 45 * X + 25 * Y, y: 262 - 15 * Y - 45 * Z });
  const v = (x: number, y: number, z: number) => P(x * e, y * e, z * e);
  const p000 = v(0, 0, 0);
  const p100 = v(1, 0, 0);
  const p110 = v(1, 1, 0);
  const p010 = v(0, 1, 0);
  const p001 = v(0, 0, 1);
  const p101 = v(1, 0, 1);
  const p111 = v(1, 1, 1);
  const p011 = v(0, 1, 1);
  const A = p000;
  const B = p001;
  const C = p111;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="A kocka testátlója és a fedőlap síkja" />
      {/* rejtett élek */}
      <line x1={p000.x} y1={p000.y} x2={p010.x} y2={p010.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={p010.x} y1={p010.y} x2={p110.x} y2={p110.y} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={p010.x} y1={p010.y} x2={p011.x} y2={p011.y} stroke="#94a3b8" strokeDasharray="4 3" />
      {/* fedőlap */}
      <polygon points={`${p001.x},${p001.y} ${p101.x},${p101.y} ${p111.x},${p111.y} ${p011.x},${p011.y}`} fill="rgba(59,130,246,0.12)" stroke="#334155" strokeWidth="2" />
      {/* látható élek */}
      <polyline points={`${p000.x},${p000.y} ${p100.x},${p100.y} ${p110.x},${p110.y} ${p111.x},${p111.y}`} fill="none" stroke="#334155" strokeWidth="2" />
      <line x1={p000.x} y1={p000.y} x2={p001.x} y2={p001.y} stroke="#334155" strokeWidth="2" />
      <line x1={p100.x} y1={p100.y} x2={p101.x} y2={p101.y} stroke="#334155" strokeWidth="2" />
      {/* ABC háromszög */}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(239,68,68,0.12)" stroke="none" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#2563eb" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="3" />
      <RightMark P={B} u={A} v={C} size={12} color="#b91c1c" />
      <path d={angleArc(C, B, A, 40)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={C.x - 66} y={C.y + 34} fontSize="12" fontWeight="bold" fill="#6d28d9">≈ 35,3°</text>
      <text x={A.x - 16} y={A.y + 6} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={B.x - 16} y={B.y} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={C.x + 6} y={C.y - 4} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={(p000.x + p100.x) / 2} y={p000.y + 18} fontSize="12" textAnchor="middle" fill="#334155">3,2 cm</text>
      <rect x="380" y="150" width="160" height="104" rx="10" fill="#ffffff" stroke="#fecaca" />
      <text x="460" y="172" fontSize="11" textAnchor="middle" fill="#1e293b">AB = 3,2 cm (él)</text>
      <text x="460" y="192" fontSize="11" textAnchor="middle" fill="#1e293b">BC = 3,2·√2 ≈ 4,53 cm</text>
      <text x="460" y="212" fontSize="11" textAnchor="middle" fill="#1e293b">AC = 3,2·√3 ≈ 5,54 cm</text>
      <text x="460" y="236" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#6d28d9">tg ACB∢ = 1/√2</text>
    </svg>
  );
};
