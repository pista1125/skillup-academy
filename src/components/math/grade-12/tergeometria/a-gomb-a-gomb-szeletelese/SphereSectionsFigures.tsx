import React from 'react';

type FigProps = { className?: string };
type Pt = [number, number];

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';
const INK = '#0f172a';
const SPHERE = '#2563eb';
const SECTION = '#059669';
const RAD = '#dc2626';
const AUX = '#64748b';

const r1 = (n: number) => Math.round(n * 10) / 10;
const unit = (p: Pt): Pt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};

/** Magyar derékszög-jelölés: negyedkörív ponttal a v csúcsnál (p1, p2 irányok között). */
const RightMark: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number; color?: string }> = ({ v, p1, p2, r = 12, color = INK }) => {
  const u1 = unit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = unit([p2[0] - v[0], p2[1] - v[1]]);
  const s: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = unit([u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path d={`M ${r1(s[0])} ${r1(s[1])} A ${r} ${r} 0 0 ${sweep} ${r1(e[0])} ${r1(e[1])}`} fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={r1(v[0] + b[0] * r * 0.55)} cy={r1(v[1] + b[1] * r * 0.55)} r="1.8" fill={color} />
    </g>
  );
};

/** Vízszintes ellipszis: elülső (alsó) fele folytonos, hátsó (felső) fele szaggatott. */
const HEllipse: React.FC<{ cx: number; cy: number; rx: number; ry: number; color?: string; w?: number; fill?: string }> = ({
  cx,
  cy,
  rx,
  ry,
  color = SECTION,
  w = 2,
  fill
}) => (
  <g>
    {fill && <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} stroke="none" />}
    <path d={`M ${r1(cx - rx)} ${cy} A ${r1(rx)} ${r1(ry)} 0 0 1 ${r1(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth={w} strokeDasharray="5 4" />
    <path d={`M ${r1(cx - rx)} ${cy} A ${r1(rx)} ${r1(ry)} 0 0 0 ${r1(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth={w} />
  </g>
);

const Frame: React.FC<{ w: number; h: number; title: string; className: string; children: React.ReactNode }> = ({ w, h, title, className, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="5" y="5" width={w - 10} height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x={w / 2} y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill={INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a kettévágott narancs (8 cm átmérő, a vágás 2 cm-re a középponttól)
export const OrangeSectionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // bal oldal: térbeli kép, jobb oldal: a középponton átmenő, a vágásra merőleges metszet
  const s = 26; // px / cm
  const L: Pt = [150, 175];
  const Rr = 4 * s;
  const d = 2 * s;
  const rr = Math.sqrt(12) * s;
  const Q: Pt = [L[0], L[1] - d];
  const C: Pt = [420, 175];
  const Q2: Pt = [C[0], C[1] - d];
  const P2: Pt = [C[0] + rr, C[1] - d];
  return (
    <Frame w={560} h={320} title="A kettévágott narancs" className={className}>
      {/* térbeli kép */}
      <circle cx={L[0]} cy={L[1]} r={Rr} fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
      <HEllipse cx={L[0]} cy={L[1]} rx={Rr} ry={Rr * 0.28} color="#fb923c" w={1.2} />
      <HEllipse cx={Q[0]} cy={Q[1]} rx={rr} ry={rr * 0.28} color={SECTION} fill="rgba(16,185,129,0.15)" />
      <line x1={L[0]} y1={L[1]} x2={Q[0]} y2={Q[1]} stroke={RAD} strokeWidth="2" />
      <line x1={Q[0]} y1={Q[1]} x2={Q[0] + rr} y2={Q[1]} stroke={SECTION} strokeWidth="2" />
      <line x1={L[0]} y1={L[1]} x2={Q[0] + rr} y2={Q[1]} stroke={SPHERE} strokeWidth="2" />
      <circle cx={L[0]} cy={L[1]} r="3" fill={INK} />
      <circle cx={Q[0]} cy={Q[1]} r="3" fill={INK} />
      <text x={L[0] - 14} y={L[1] + 14} fontSize="13" fontWeight="bold" fill={INK}>O</text>
      <text x={Q[0] - 16} y={Q[1] - 6} fontSize="13" fontWeight="bold" fill={INK}>Q</text>
      <text x={Q[0] + rr + 6} y={Q[1] - 4} fontSize="13" fontWeight="bold" fill={INK}>P</text>
      <text x={L[0] - 10} y={L[1] + 60} fontSize="11" fill={AUX} textAnchor="middle">térbeli kép</text>
      {/* metszet */}
      <circle cx={C[0]} cy={C[1]} r={Rr} fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <line x1={C[0] - rr} y1={Q2[1]} x2={P2[0]} y2={P2[1]} stroke={SECTION} strokeWidth="2.5" />
      <polygon points={`${C[0]},${C[1]} ${Q2[0]},${Q2[1]} ${P2[0]},${P2[1]}`} fill="rgba(37,99,235,0.1)" stroke="none" />
      <line x1={C[0]} y1={C[1]} x2={Q2[0]} y2={Q2[1]} stroke={RAD} strokeWidth="2" />
      <line x1={C[0]} y1={C[1]} x2={P2[0]} y2={P2[1]} stroke={SPHERE} strokeWidth="2" />
      <RightMark v={Q2} p1={C} p2={P2} />
      <circle cx={C[0]} cy={C[1]} r="3" fill={INK} />
      <text x={C[0] - 14} y={C[1] + 14} fontSize="13" fontWeight="bold" fill={INK}>O</text>
      <text x={Q2[0] - 16} y={Q2[1] - 6} fontSize="13" fontWeight="bold" fill={INK}>Q</text>
      <text x={P2[0] + 6} y={P2[1] - 4} fontSize="13" fontWeight="bold" fill={INK}>P</text>
      <text x={C[0] - 14} y={C[1] - d / 2 + 4} fontSize="12" fontWeight="bold" fill={RAD}>2</text>
      <text x={(C[0] + P2[0]) / 2 + 8} y={(C[1] + P2[1]) / 2 + 12} fontSize="12" fontWeight="bold" fill={SPHERE}>4</text>
      <text x={(Q2[0] + P2[0]) / 2} y={Q2[1] - 7} fontSize="12" fontWeight="bold" fill={SECTION} textAnchor="middle">r</text>
      <text x={C[0]} y={C[1] + Rr + 24} fontSize="11" fill={AUX} textAnchor="middle">a vágásra merőleges főkör-metszet</text>
      <text x={280} y={302} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">r² = 4² − 2² = 12 ⇒ r = √12 ≈ 3,5 cm</text>
    </Frame>
  );
};

// 2. ábra: gömb, középpont, főkör és síkmetszet
export const SphereTermsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C: Pt = [230, 180];
  const R = 115;
  const h = 62;
  const rs = Math.sqrt(R * R - h * h);
  return (
    <Frame w={560} h={330} title="A gömb síkmetszetei" className={className}>
      <circle cx={C[0]} cy={C[1]} r={R} fill="rgba(37,99,235,0.06)" stroke={SPHERE} strokeWidth="2.2" />
      <HEllipse cx={C[0]} cy={C[1]} rx={R} ry={R * 0.27} color="#7c3aed" w={2.2} fill="rgba(124,58,237,0.08)" />
      <HEllipse cx={C[0]} cy={C[1] - h} rx={rs} ry={rs * 0.27} color={SECTION} w={2.2} fill="rgba(16,185,129,0.12)" />
      <circle cx={C[0]} cy={C[1]} r="3.2" fill={INK} />
      <text x={C[0] + 6} y={C[1] - 6} fontSize="13" fontWeight="bold" fill={INK}>O</text>
      <line x1={C[0]} y1={C[1]} x2={C[0] + R * Math.cos(-0.5)} y2={C[1] + R * Math.sin(-0.5) * -1} stroke={RAD} strokeWidth="2" />
      <text x={C[0] + 55} y={C[1] + 40} fontSize="13" fontWeight="bold" fill={RAD}>R</text>
      {/* feliratok */}
      <line x1={C[0] + rs - 6} y1={C[1] - h} x2={420} y2={92} stroke={AUX} strokeWidth="1" />
      <text x={426} y={96} fontSize="13" fill={SECTION} fontWeight="bold">síkmetszet (kör)</text>
      <line x1={C[0] + R - 4} y1={C[1] + 6} x2={420} y2={180} stroke={AUX} strokeWidth="1" />
      <text x={426} y={184} fontSize="13" fill="#7c3aed" fontWeight="bold">főkör (sugara R)</text>
      <line x1={C[0] + 3} y1={C[1] + 3} x2={420} y2={262} stroke={AUX} strokeWidth="1" />
      <text x={426} y={266} fontSize="13" fill={INK} fontWeight="bold">középpont</text>
      <text x={280} y={316} fontSize="11.5" fill={AUX} textAnchor="middle">
        Minden metsző sík kört metsz ki; a középponton átmenő sík metszete a főkör.
      </text>
    </Frame>
  );
};

// 3. ábra: a gömbsugár, a metszetkör sugara és a sík távolsága derékszögű háromszöget alkot
export const SectionTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C: Pt = [250, 185];
  const R = 120;
  const d = 58;
  const rr = Math.sqrt(R * R - d * d);
  const Q: Pt = [C[0], C[1] - d];
  const P: Pt = [C[0] + rr, C[1] - d];
  return (
    <Frame w={560} h={330} title="R² = r² + d²" className={className}>
      <path d={`M ${r1(C[0] - rr)} ${r1(Q[1])} A ${R} ${R} 0 0 1 ${r1(P[0])} ${r1(P[1])} Z`} fill="rgba(245,158,11,0.18)" stroke="none" />
      <path d={`M ${r1(C[0] - rr)} ${r1(Q[1])} A ${R} ${R} 0 1 0 ${r1(P[0])} ${r1(P[1])} Z`} fill="rgba(37,99,235,0.07)" stroke="none" />
      <circle cx={C[0]} cy={C[1]} r={R} fill="none" stroke={SPHERE} strokeWidth="2.2" />
      <line x1={C[0] - rr - 30} y1={Q[1]} x2={P[0] + 30} y2={P[1]} stroke={SECTION} strokeWidth="1.2" strokeDasharray="6 4" />
      <line x1={C[0] - rr} y1={Q[1]} x2={P[0]} y2={P[1]} stroke={SECTION} strokeWidth="2.6" />
      <line x1={C[0]} y1={C[1]} x2={Q[0]} y2={Q[1]} stroke={RAD} strokeWidth="2.4" />
      <line x1={C[0]} y1={C[1]} x2={P[0]} y2={P[1]} stroke={SPHERE} strokeWidth="2.4" />
      <RightMark v={Q} p1={C} p2={P} r={13} />
      <circle cx={C[0]} cy={C[1]} r="3.2" fill={INK} />
      <text x={C[0] - 16} y={C[1] + 16} fontSize="13" fontWeight="bold" fill={INK}>O</text>
      <text x={Q[0] - 18} y={Q[1] - 6} fontSize="13" fontWeight="bold" fill={INK}>Q</text>
      <text x={P[0] + 6} y={P[1] - 6} fontSize="13" fontWeight="bold" fill={INK}>P</text>
      <text x={C[0] - 16} y={C[1] - d / 2 + 5} fontSize="13" fontWeight="bold" fill={RAD}>d</text>
      <text x={(Q[0] + P[0]) / 2} y={Q[1] - 8} fontSize="13" fontWeight="bold" fill={SECTION} textAnchor="middle">r</text>
      <text x={(C[0] + P[0]) / 2 + 10} y={(C[1] + P[1]) / 2 + 14} fontSize="13" fontWeight="bold" fill={SPHERE}>R</text>
      <text x={C[0]} y={Q[1] - 32} fontSize="11.5" fill="#b45309" textAnchor="middle" fontWeight="bold">kisebb gömbsüveg</text>
      <text x={C[0]} y={C[1] + 70} fontSize="11.5" fill={SPHERE} textAnchor="middle" fontWeight="bold">nagyobb gömbsüveg</text>
      <text x={430} y={110} fontSize="12" fill={INK}>d: a sík távolsága</text>
      <text x={430} y={128} fontSize="12" fill={INK}>a középponttól</text>
      <text x={430} y={160} fontSize="12" fill={INK}>r: a metszetkör</text>
      <text x={430} y={178} fontSize="12" fill={INK}>sugara</text>
      <text x={430} y={210} fontSize="12" fill={INK}>R: gömbsugár</text>
      <text x={280} y={318} fontSize="12" fill={AUX} textAnchor="middle">A metszetkör sugara: r = √(R² − d²)</text>
    </Frame>
  );
};

// 4. ábra: a 20 cm átmérőjű dinnye 5 egyenlő (4 cm magas) részre vágva
export const MelonSlicesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 11; // px / cm
  const C: Pt = [250, 180];
  const R = 10 * s;
  const cuts = [-6, -2, 2, 6];
  return (
    <Frame w={560} h={330} title="Dinnye 5 db 4 cm-es szeletben" className={className}>
      <circle cx={C[0]} cy={C[1]} r={R} fill="rgba(34,197,94,0.12)" stroke="#16a34a" strokeWidth="2.4" />
      {cuts.map((k) => {
        const half = Math.sqrt(100 - k * k) * s;
        const y = C[1] - k * s;
        return <line key={k} x1={C[0] - half} y1={y} x2={C[0] + half} y2={y} stroke={RAD} strokeWidth="2" />;
      })}
      {/* sugarak */}
      <line x1={C[0]} y1={C[1]} x2={C[0] + 8 * s} y2={C[1] - 6 * s} stroke={SPHERE} strokeWidth="1.8" />
      <line x1={C[0]} y1={C[1]} x2={C[0]} y2={C[1] - 6 * s} stroke={AUX} strokeWidth="1.4" strokeDasharray="4 3" />
      <RightMark v={[C[0], C[1] - 6 * s]} p1={C} p2={[C[0] + 8 * s, C[1] - 6 * s]} r={10} />
      <circle cx={C[0]} cy={C[1]} r="3" fill={INK} />
      <text x={C[0] - 14} y={C[1] + 14} fontSize="12" fontWeight="bold" fill={INK}>O</text>
      <text x={C[0] + 46} y={C[1] - 26} fontSize="12" fontWeight="bold" fill={SPHERE}>10</text>
      <text x={C[0] - 16} y={C[1] - 30} fontSize="12" fontWeight="bold" fill={AUX}>6</text>
      {/* magasságjelölés */}
      {[-10, -6, -2, 2, 6, 10].map((k) => (
        <line key={`t${k}`} x1={C[0] - R - 30} y1={C[1] - k * s} x2={C[0] - R - 18} y2={C[1] - k * s} stroke={INK} strokeWidth="1.4" />
      ))}
      <line x1={C[0] - R - 24} y1={C[1] - R} x2={C[0] - R - 24} y2={C[1] + R} stroke={INK} strokeWidth="1.2" />
      {[-8, -4, 0, 4, 8].map((k) => (
        <text key={`l${k}`} x={C[0] - R - 46} y={C[1] - k * s + 4} fontSize="11" fill={INK} textAnchor="middle">4</text>
      ))}
      <text x={420} y={90} fontSize="12" fill={INK} fontWeight="bold">vágósíkok távolsága</text>
      <text x={420} y={108} fontSize="12" fill={INK}>a középponttól:</text>
      <text x={420} y={130} fontSize="12" fill={RAD} fontWeight="bold">6 cm és 2 cm</text>
      <text x={420} y={170} fontSize="12" fill={INK}>r₁ = √(10² − 6²) = 8 cm</text>
      <text x={420} y={192} fontSize="12" fill={INK}>r₂ = √(10² − 2²) ≈ 9,8 cm</text>
    </Frame>
  );
};

// 5. ábra: a kocka éleit érintő gömb – a kocka egy lapja
export const CubeSphereSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 22;
  const O: Pt = [180, 180];
  const a = 8 * s;
  const x0 = O[0] - a / 2;
  const y0 = O[1] - a / 2;
  const rc = 4 * s;
  return (
    <Frame w={560} h={330} title="A kocka éleit érintő gömb" className={className}>
      <defs>
        <mask id="ss-cube-mask">
          <rect x={x0} y={y0} width={a} height={a} fill="white" />
          <circle cx={O[0]} cy={O[1]} r={rc} fill="black" />
        </mask>
      </defs>
      <rect x={x0} y={y0} width={a} height={a} fill="#f59e0b" opacity="0.35" mask="url(#ss-cube-mask)" />
      <rect x={x0} y={y0} width={a} height={a} fill="none" stroke={INK} strokeWidth="2.2" />
      <circle cx={O[0]} cy={O[1]} r={rc} fill="none" stroke={SECTION} strokeWidth="2.2" />
      <line x1={O[0]} y1={O[1]} x2={O[0] + rc} y2={O[1]} stroke={SECTION} strokeWidth="1.8" />
      <text x={O[0] + rc / 2} y={O[1] - 6} fontSize="12" fontWeight="bold" fill={SECTION} textAnchor="middle">4</text>
      <text x={O[0]} y={y0 + a + 20} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">8 cm</text>
      <text x={O[0]} y={y0 - 10} fontSize="11" fill={AUX} textAnchor="middle">a kocka egy lapja</text>
      {/* oldalnézet: a gömb sugara a lapátló fele */}
      <g>
        <rect x={360} y={110} width={140} height={140} fill="none" stroke={INK} strokeWidth="1.6" />
        <circle cx={430} cy={180} r={70 * Math.SQRT2} fill="none" stroke={SPHERE} strokeWidth="1.8" strokeDasharray="5 4" />
        <line x1={430} y1={180} x2={500} y2={110} stroke={RAD} strokeWidth="2" />
        <circle cx={430} cy={180} r="3" fill={INK} />
        <text x={474} y={160} fontSize="12" fontWeight="bold" fill={RAD}>R = 4√2</text>
        <text x={430} y={290} fontSize="11" fill={AUX} textAnchor="middle">a kocka egy élre merőleges metszete</text>
      </g>
      <text x={180} y={316} fontSize="12" fill={INK} textAnchor="middle">
        A lap síkja 4 cm-re van O-tól: r = √(32 − 16) = 4 cm
      </text>
    </Frame>
  );
};

// 6. ábra: a gömbsüveg alakú kupola (alapkör átmérője 50 m, magassága 16 m)
export const DomeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 4.2;
  const Rg = 27.53 * s;
  const base = 215;
  const O: Pt = [280, base + (27.53 - 16) * s];
  const half = 25 * s;
  const top: Pt = [O[0], O[1] - Rg];
  return (
    <Frame w={560} h={330} title="A kupola gömbsüveg alakú" className={className}>
      <path d={`M ${r1(O[0] - half)} ${base} A ${r1(Rg)} ${r1(Rg)} 0 0 1 ${r1(O[0] + half)} ${base} Z`} fill="rgba(37,99,235,0.12)" stroke={SPHERE} strokeWidth="2.4" />
      <line x1={40} y1={base} x2={520} y2={base} stroke="#94a3b8" strokeWidth="2" />
      <line x1={O[0]} y1={top[1]} x2={O[0]} y2={O[1]} stroke={RAD} strokeWidth="1.8" strokeDasharray="5 3" />
      <line x1={O[0]} y1={O[1]} x2={O[0] + half} y2={base} stroke={SPHERE} strokeWidth="2" />
      <RightMark v={[O[0], base]} p1={top} p2={[O[0] + half, base]} r={11} />
      <circle cx={O[0]} cy={O[1]} r="3" fill={INK} />
      <text x={O[0] - 16} y={O[1] + 4} fontSize="13" fontWeight="bold" fill={INK}>O</text>
      <text x={O[0] + half / 2} y={base - 7} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">25 m</text>
      <text x={O[0] - 10} y={(top[1] + base) / 2} fontSize="12" fontWeight="bold" fill={RAD} textAnchor="end">16 m</text>
      <text x={O[0] + half / 2 + 20} y={(O[1] + base) / 2 + 10} fontSize="12" fontWeight="bold" fill={SPHERE}>R</text>
      <text x={O[0] + 10} y={(O[1] + base) / 2 + 2} fontSize="12" fontWeight="bold" fill={AUX}>R − 16</text>
      <text x={280} y={318} fontSize="12" fill={INK} textAnchor="middle">
        (R − 16)² + 25² = R² ⇒ R ≈ 27,5 m
      </text>
    </Frame>
  );
};
