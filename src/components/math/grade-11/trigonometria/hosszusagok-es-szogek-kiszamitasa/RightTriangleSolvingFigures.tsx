import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Szögív a P csúcsnál, a `fromDeg` iránytól a `toDeg` irányig (matematikai pozitív irány, képernyőn felfelé). */
const arc = (P: Pt, r: number, fromDeg: number, toDeg: number) => {
  const s = { x: P.x + r * Math.cos(toRad(fromDeg)), y: P.y - r * Math.sin(toRad(fromDeg)) };
  const e = { x: P.x + r * Math.cos(toRad(toDeg)), y: P.y - r * Math.sin(toRad(toDeg)) };
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
};

/** Az A pontból a BC egyenesre bocsátott merőleges talppontja. */
const foot = (A: Pt, B: Pt, C: Pt): Pt => {
  const dx = C.x - B.x;
  const dy = C.y - B.y;
  const t = ((A.x - B.x) * dx + (A.y - B.y) * dy) / (dx * dx + dy * dy);
  return { x: B.x + t * dx, y: B.y + t * dy };
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

// 1. ábra: Tanácsok hosszúságok és szögek kiszámításához + a három szögfüggvény
export const SolvingStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = ['Keress derékszögű háromszöget!', 'Jelöld be a derékszöget!', 'Jelöld be a szereplő szögeket!', 'Azonosítsd az oldalakat!'];
  const colors = ['#4f46e5', '#0891b2', '#059669', '#d97706'];
  const A = { x: 70, y: 270 };
  const C = { x: 300, y: 270 };
  const B = { x: 300, y: 140 };
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Tanácsok hosszúságok és szögek kiszámításához" />
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={20 + i * 132} y="44" width="124" height="58" rx="10" fill="#ffffff" stroke={colors[i]} strokeWidth="2" />
          <circle cx={36 + i * 132} cy="60" r="10" fill={colors[i]} />
          <text x={36 + i * 132} y="64" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#ffffff">
            {i + 1}
          </text>
          {s.split(' ').reduce<string[]>((lines, word) => {
            const last = lines[lines.length - 1];
            if (last && (last + ' ' + word).length <= 15) lines[lines.length - 1] = last + ' ' + word;
            else lines.push(word);
            return lines;
          }, []).map((line, j) => (
            <text key={line} x={84 + i * 132} y={64 + j * 14} fontSize="10.5" textAnchor="middle" fill="#1e293b">
              {line}
            </text>
          ))}
          {i < 3 && (
            <text x={146 + i * 132} y="78" fontSize="14" textAnchor="middle" fill="#64748b">
              →
            </text>
          )}
        </g>
      ))}
      <polygon points={`${A.x},${A.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <RightMark P={C} u={A} v={B} />
      <path d={arc(A, 38, 0, 29.5)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 46} y={A.y - 8} fontSize="14" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={C.x + 10} y={(B.y + C.y) / 2 + 4} fontSize="12" fontWeight="bold" fill="#b91c1c">a (szemközti)</text>
      <text x={(A.x + C.x) / 2} y={A.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
        b (szög melletti)
      </text>
      <text x={(A.x + B.x) / 2 - 20} y={(A.y + B.y) / 2 - 8} fontSize="12" fontWeight="bold" fill="#475569">c (átfogó)</text>
      <rect x="390" y="130" width="150" height="132" rx="12" fill="#ffffff" stroke="#c7d2fe" />
      <text x="465" y="156" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#312e81">sin α = a / c</text>
      <text x="465" y="180" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#312e81">cos α = b / c</text>
      <text x="465" y="204" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#312e81">tg α = a / b</text>
      <text x="465" y="228" fontSize="12" textAnchor="middle" fill="#475569">tg α = sin α / cos α</text>
      <text x="465" y="250" fontSize="12" textAnchor="middle" fill="#475569">sin²α + cos²α = 1</text>
    </svg>
  );
};

// 2. ábra: 1. kidolgozott feladat – egyenlő szárú háromszög (alap 12 cm, szárhoz tartozó magasság 10,8 cm)
export const IsoscelesAltitudeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const alpha = (Math.asin(0.9) * 180) / Math.PI; // ≈ 64,16°
  const s = 17; // px / cm
  const hApex = 6 * Math.tan(toRad(alpha)) * s;
  const left = { A: { x: 30, y: 280 }, B: { x: 30 + 12 * s, y: 280 } };
  const LC = { x: left.A.x + 6 * s, y: 280 - hApex };
  const D = foot(left.A, left.B, LC);
  const off = 290;
  const RA = { x: left.A.x + off, y: 280 };
  const RB = { x: left.B.x + off, y: 280 };
  const RC = { x: LC.x + off, y: LC.y };
  const F = { x: (RA.x + RB.x) / 2, y: 280 };
  return (
    <svg viewBox="0 0 560 310" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={310} title="Egyenlő szárú háromszög: alap 12 cm, szárhoz tartozó magasság 10,8 cm" />
      {/* bal oldal: ABD derékszögű háromszög */}
      <polygon points={`${left.A.x},${left.A.y} ${left.B.x},${left.B.y} ${LC.x},${LC.y}`} fill="#eef2ff" stroke="#6366f1" strokeWidth="2" />
      <polygon points={`${left.A.x},${left.A.y} ${left.B.x},${left.B.y} ${D.x},${D.y}`} fill="rgba(239,68,68,0.12)" stroke="none" />
      <line x1={left.A.x} y1={left.A.y} x2={D.x} y2={D.y} stroke="#dc2626" strokeWidth="2.5" />
      <RightMark P={D} u={left.A} v={left.B} />
      <path d={arc(left.B, 30, 180 - alpha, 180)} fill="none" stroke="#b91c1c" strokeWidth="2" />
      <text x={left.B.x - 44} y={left.B.y - 10} fontSize="13" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={left.A.x - 4} y={left.A.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={left.B.x - 4} y={left.B.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={LC.x - 4} y={LC.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={D.x + 8} y={D.y + 2} fontSize="13" fontWeight="bold" fill="#0f172a">D</text>
      <text x={(left.A.x + D.x) / 2 - 2} y={(left.A.y + D.y) / 2 - 6} fontSize="12" fontWeight="bold" fill="#b91c1c" textAnchor="end">
        10,8
      </text>
      <text x={(left.A.x + left.B.x) / 2} y={left.A.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
        12
      </text>
      <text x="132" y="300" fontSize="11" textAnchor="middle" fill="#475569">sin α = 10,8 / 12 = 0,9 ⇒ α ≈ 64,2°</text>

      {/* jobb oldal: BFC derékszögű háromszög */}
      <polygon points={`${RA.x},${RA.y} ${RB.x},${RB.y} ${RC.x},${RC.y}`} fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <polygon points={`${F.x},${F.y} ${RB.x},${RB.y} ${RC.x},${RC.y}`} fill="rgba(16,185,129,0.18)" stroke="none" />
      <line x1={F.x} y1={F.y} x2={RC.x} y2={RC.y} stroke="#047857" strokeWidth="2.5" strokeDasharray="5 3" />
      <line x1={RB.x} y1={RB.y} x2={RC.x} y2={RC.y} stroke="#b91c1c" strokeWidth="3" />
      <RightMark P={F} u={RB} v={RC} />
      <path d={arc(RB, 30, 180 - alpha, 180)} fill="none" stroke="#b91c1c" strokeWidth="2" />
      <text x={RB.x - 62} y={RB.y - 10} fontSize="12" fontWeight="bold" fill="#b91c1c">64,2°</text>
      <text x={RA.x - 4} y={RA.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
      <text x={RB.x - 4} y={RB.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
      <text x={RC.x - 4} y={RC.y - 8} fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
      <text x={F.x - 4} y={F.y + 18} fontSize="13" fontWeight="bold" fill="#0f172a">F</text>
      <text x={(RA.x + F.x) / 2} y={RA.y + 18} fontSize="12" textAnchor="middle" fill="#1d4ed8">6</text>
      <text x={(F.x + RB.x) / 2} y={RA.y + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">6</text>
      <text x={(RB.x + RC.x) / 2 + 10} y={(RB.y + RC.y) / 2} fontSize="13" fontWeight="bold" fill="#b91c1c">x</text>
      <text x="422" y="300" fontSize="11" textAnchor="middle" fill="#475569">cos 64,2° = 6 / x ⇒ x ≈ 13,8 cm</text>
    </svg>
  );
};

// 3. ábra: 2. kidolgozott feladat – az új AD út (trapéz felbontása két derékszögű háromszögre és egy téglalapra)
export const TrapezoidRoadSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 8; // px / km
  const m = 30 * Math.sin(toRad(37));
  const ap = 30 * Math.cos(toRad(37));
  const delta = (Math.asin(m / 20) * 180) / Math.PI;
  const qd = 20 * Math.cos(toRad(delta));
  const O = { x: 40, y: 250 };
  const P = (x: number, y: number): Pt => ({ x: O.x + x * s, y: O.y - y * s });
  const A = P(0, 0);
  const B = P(ap, m);
  const C = P(ap + 25, m);
  const D = P(ap + 25 + qd, 0);
  const Pp = P(ap, 0);
  const Q = P(ap + 25, 0);
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Az A – B – C – D útvonal és a tervezett új AD út" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="#fefce8" stroke="#a16207" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#16a34a" strokeWidth="4" />
      <line x1={B.x} y1={B.y} x2={Pp.x} y2={Pp.y} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1={C.x} y1={C.y} x2={Q.x} y2={Q.y} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 3" />
      <RightMark P={Pp} u={A} v={B} />
      <RightMark P={Q} u={D} v={C} />
      <path d={arc(A, 34, 0, 37)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={A.x + 40} y={A.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">37°</text>
      <path d={arc(D, 30, 180 - delta, 180)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={D.x - 44} y={D.y - 8} fontSize="12" fontWeight="bold" fill="#6d28d9">δ</text>
      {[
        { p: A, t: 'A', dx: -16, dy: 4 },
        { p: B, t: 'B', dx: -6, dy: -10 },
        { p: C, t: 'C', dx: -4, dy: -10 },
        { p: D, t: 'D', dx: 8, dy: 4 },
        { p: Pp, t: 'P', dx: -4, dy: 18 },
        { p: Q, t: 'Q', dx: -4, dy: 18 }
      ].map(({ p, t, dx, dy }) => (
        <text key={t} x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
      <text x={(A.x + B.x) / 2 - 14} y={(A.y + B.y) / 2} fontSize="12" fontWeight="bold" fill="#a16207" textAnchor="end">30 km</text>
      <text x={(B.x + C.x) / 2} y={B.y - 8} fontSize="12" fontWeight="bold" fill="#a16207" textAnchor="middle">25 km</text>
      <text x={(C.x + D.x) / 2 + 10} y={(C.y + D.y) / 2} fontSize="12" fontWeight="bold" fill="#a16207">20 km</text>
      <text x={Pp.x + 6} y={(B.y + Pp.y) / 2} fontSize="12" fill="#475569">m</text>
      <text x={Q.x - 16} y={(C.y + Q.y) / 2} fontSize="12" fill="#475569">m</text>
      <text x={(Pp.x + Q.x) / 2} y={A.y + 18} fontSize="11" textAnchor="middle" fill="#15803d">25 km</text>
      <text x="280" y="285" fontSize="11" textAnchor="middle" fill="#475569">
        AD = AP + PQ + QD ≈ 24 + 25 + 8,6 ≈ 57,6 km; δ ≈ 64,5°
      </text>
    </svg>
  );
};

// 4. ábra: 2. feladat – az emelődaru teleszkópos karja (gém)
export const CraneArmSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const alpha = 35;
  const k = 300;
  const O = { x: 120, y: 240 };
  const T = { x: O.x + k * Math.cos(toRad(alpha)), y: O.y - k * Math.sin(toRad(alpha)) };
  const G = { x: T.x, y: O.y };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="Emelődaru: gém hossza k (4–12 m), dőlésszöge α (10°–60°)" />
      <line x1="30" y1={O.y} x2="530" y2={O.y} stroke="#94a3b8" strokeWidth="2" />
      {/* daru teste */}
      <rect x={O.x - 50} y={O.y - 30} width="70" height="30" rx="4" fill="#fde68a" stroke="#b45309" />
      <circle cx={O.x - 34} cy={O.y + 2} r="8" fill="#334155" />
      <circle cx={O.x + 4} cy={O.y + 2} r="8" fill="#334155" />
      <line x1={O.x} y1={O.y} x2={T.x} y2={T.y} stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
      <line x1={T.x} y1={T.y} x2={T.x} y2={T.y + 26} stroke="#334155" strokeWidth="1.5" />
      <rect x={T.x - 10} y={T.y + 26} width="20" height="14" fill="#64748b" />
      <line x1={T.x} y1={T.y} x2={G.x} y2={G.y} stroke="#059669" strokeWidth="2" strokeDasharray="6 4" />
      <line x1={O.x} y1={O.y + 18} x2={G.x} y2={G.y + 18} stroke="#2563eb" strokeWidth="2" />
      <RightMark P={G} u={O} v={T} />
      <path d={arc(O, 46, 0, alpha)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={O.x + 54} y={O.y - 10} fontSize="14" fontWeight="bold" fill="#b91c1c">α</text>
      <text x={(O.x + T.x) / 2 - 12} y={(O.y + T.y) / 2 - 12} fontSize="15" fontWeight="bold" fill="#b45309">k</text>
      <text x={G.x + 10} y={(T.y + G.y) / 2 + 20} fontSize="14" fontWeight="bold" fill="#047857">h</text>
      <text x={(O.x + G.x) / 2} y={O.y + 34} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">d</text>
      <rect x="400" y="50" width="140" height="56" rx="10" fill="#ffffff" stroke="#fcd34d" />
      <text x="470" y="74" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">d = k · cos α</text>
      <text x="470" y="96" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">h = k · sin α</text>
    </svg>
  );
};

// 5. ábra: 5. feladat – a Szabadság-szobor (47 m talapzat, 46 m szobor, 70 m távolság)
export const StatueOfLibertySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 2.3; // px / m
  const O = { x: 80, y: 270 };
  const baseX = O.x + 70 * s;
  const pedTop = O.y - 47 * s;
  const statueTop = O.y - 93 * s;
  const a1 = (Math.atan(47 / 70) * 180) / Math.PI;
  const a2 = (Math.atan(93 / 70) * 180) / Math.PI;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={300} title="Mekkora szögben látszik a Szabadság-szobor?" />
      <line x1="30" y1={O.y} x2="530" y2={O.y} stroke="#94a3b8" strokeWidth="2" />
      {/* talapzat */}
      <rect x={baseX - 4} y={pedTop} width="40" height={47 * s} fill="#e2e8f0" stroke="#64748b" />
      {/* szobor (stilizált) */}
      <rect x={baseX + 6} y={statueTop + 14} width="20" height={46 * s - 14} rx="6" fill="#99f6e4" stroke="#0f766e" />
      <line x1={baseX + 16} y1={statueTop + 14} x2={baseX + 16} y2={statueTop} stroke="#0f766e" strokeWidth="3" />
      <circle cx={baseX + 16} cy={statueTop - 2} r="4" fill="#f59e0b" />
      {/* látósugarak */}
      <line x1={O.x} y1={O.y} x2={baseX} y2={pedTop} stroke="#2563eb" strokeWidth="2" />
      <line x1={O.x} y1={O.y} x2={baseX} y2={statueTop} stroke="#dc2626" strokeWidth="2" />
      <line x1={baseX} y1={O.y} x2={baseX} y2={statueTop} stroke="#475569" strokeWidth="1" strokeDasharray="4 3" />
      <path d={arc(O, 50, 0, a1)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={arc(O, 72, a1, a2)} fill="rgba(239,68,68,0.15)" stroke="#dc2626" strokeWidth="2" />
      <text x={O.x + 56} y={O.y - 10} fontSize="11" fontWeight="bold" fill="#1d4ed8">≈ 33,9°</text>
      <text x={O.x + 40} y={O.y - 76} fontSize="11" fontWeight="bold" fill="#b91c1c">≈ 19,2°</text>
      <circle cx={O.x} cy={O.y} r="4" fill="#0f172a" />
      <text x={O.x - 20} y={O.y + 20} fontSize="11" fill="#334155">megfigyelő</text>
      <text x={(O.x + baseX) / 2} y={O.y + 20} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">70 m</text>
      <text x={baseX + 42} y={(O.y + pedTop) / 2} fontSize="12" fontWeight="bold" fill="#475569">talapzat 47 m</text>
      <text x={baseX + 32} y={(pedTop + statueTop) / 2} fontSize="12" fontWeight="bold" fill="#0f766e">szobor 46 m</text>
      <rect x="350" y="44" width="190" height="62" rx="10" fill="#ffffff" stroke="#fecaca" />
      <text x="445" y="66" fontSize="11.5" textAnchor="middle" fill="#1e293b">tg α₁ = 47 / 70 ⇒ α₁ ≈ 33,9°</text>
      <text x="445" y="84" fontSize="11.5" textAnchor="middle" fill="#1e293b">tg α₂ = 93 / 70 ⇒ α₂ ≈ 53,0°</text>
      <text x="445" y="100" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#b91c1c">α₂ − α₁ ≈ 19,2°</text>
    </svg>
  );
};

// 6. ábra: Ráadás – a hegyesszög kotangense
export const CotangentSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 80, y: 240 };
  const C = { x: 400, y: 240 };
  const B = { x: 400, y: 80 };
  const alpha = (Math.atan(160 / 320) * 180) / Math.PI;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <Frame w={560} h={290} title="Ráadás: a hegyesszög kotangense" />
      <polygon points={`${A.x},${A.y} ${C.x},${C.y} ${B.x},${B.y}`} fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#2563eb" strokeWidth="4" />
      <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke="#dc2626" strokeWidth="4" />
      <RightMark P={C} u={A} v={B} size={13} />
      <path d={arc(A, 44, 0, alpha)} fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="2" />
      <text x={A.x + 52} y={A.y - 8} fontSize="15" fontWeight="bold" fill="#6d28d9">α</text>
      <text x={(A.x + C.x) / 2} y={A.y + 22} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">b (szög melletti befogó)</text>
      <text x={C.x + 10} y={(B.y + C.y) / 2} fontSize="13" fontWeight="bold" fill="#b91c1c">a</text>
      <text x={(A.x + B.x) / 2 - 10} y={(A.y + B.y) / 2 - 10} fontSize="13" fontWeight="bold" fill="#475569">c</text>
      <rect x="110" y="48" width="200" height="64" rx="10" fill="#ffffff" stroke="#ddd6fe" />
      <text x="210" y="72" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#4c1d95">ctg α = b / a</text>
      <text x="210" y="98" fontSize="12" textAnchor="middle" fill="#475569">= 1 / tg α = cos α / sin α</text>
      <text x="478" y="200" fontSize="12" textAnchor="middle" fill="#6d28d9">ctg α =</text>
      <text x="478" y="218" fontSize="12" textAnchor="middle" fill="#6d28d9">tg(90° − α)</text>
    </svg>
  );
};
