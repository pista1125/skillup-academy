import React from 'react';
import {
  Frame,
  DEFAULT_FIG_CLASS,
  S_BLUE,
  S_RED,
  S_GREEN,
  S_PURPLE,
  S_AMBER,
  S_INK,
  Pt,
  RightAt,
  arcPath,
  foot,
  lerp,
  circumcenter,
  incenter,
  inradius,
  orthocenter,
  centroid,
  dist
} from './sumKit';

type FigProps = { className?: string };

// 1. ábra: térelemek távolsága (pont–egyenes, pont–sík, párhuzamos egyenesek)
export const DistanceTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const P1: Pt = [80, 70];
  const e1A: Pt = [25, 150];
  const e1B: Pt = [140, 150];
  const F1 = foot(P1, e1A, e1B);
  const P2: Pt = [240, 62];
  const F2: Pt = [240, 150];
  const Q3: Pt = [395, 105];
  const F3: Pt = [395, 160];
  return (
    <Frame title="Térelemek távolsága: merőleges szakasz hossza" className={className} h={230}>
      {/* pont–egyenes */}
      <line x1={e1A[0]} y1={e1A[1]} x2={e1B[0]} y2={e1B[1]} stroke={S_INK} strokeWidth="1.8" />
      <text x="132" y="168" fontSize="12" fill={S_INK} fontStyle="italic">
        e
      </text>
      <line x1={P1[0]} y1={P1[1]} x2={F1[0]} y2={F1[1]} stroke={S_RED} strokeWidth="2" />
      <RightAt V={F1} P={P1} Q={e1B} />
      <circle cx={P1[0]} cy={P1[1]} r="3.5" fill={S_BLUE} />
      <text x={P1[0] + 6} y={P1[1] - 6} fontSize="12" fill={S_BLUE} fontWeight="bold">
        P
      </text>
      <text x={F1[0] - 14} y={F1[1] + 16} fontSize="11" fill={S_INK}>
        P′
      </text>
      <text x="82" y="205" fontSize="11" textAnchor="middle" fill="#475569">
        pont és egyenes
      </text>
      {/* pont–sík */}
      <polygon points="175,135 300,135 330,175 205,175" fill="#dbeafe" stroke={S_BLUE} strokeWidth="1.3" />
      <text x="310" y="170" fontSize="12" fill={S_BLUE} fontStyle="italic">
        S
      </text>
      <line x1={P2[0]} y1={P2[1]} x2={F2[0]} y2={F2[1] + 6} stroke={S_RED} strokeWidth="2" />
      <RightAt V={[F2[0], F2[1] + 6]} P={P2} Q={[300, 156]} />
      <circle cx={P2[0]} cy={P2[1]} r="3.5" fill={S_BLUE} />
      <text x={P2[0] + 6} y={P2[1] - 4} fontSize="12" fill={S_BLUE} fontWeight="bold">
        P
      </text>
      <text x="252" y="205" fontSize="11" textAnchor="middle" fill="#475569">
        pont és sík
      </text>
      {/* két párhuzamos egyenes */}
      <line x1="345" y1="105" x2="455" y2="105" stroke={S_INK} strokeWidth="1.8" />
      <line x1="345" y1="160" x2="455" y2="160" stroke={S_INK} strokeWidth="1.8" />
      <text x="448" y="98" fontSize="12" fontStyle="italic" fill={S_INK}>
        e
      </text>
      <text x="448" y="176" fontSize="12" fontStyle="italic" fill={S_INK}>
        f
      </text>
      <line x1={Q3[0]} y1={Q3[1]} x2={F3[0]} y2={F3[1]} stroke={S_RED} strokeWidth="2" />
      <RightAt V={F3} P={Q3} Q={[455, 160]} />
      <circle cx={Q3[0]} cy={Q3[1]} r="3.5" fill={S_BLUE} />
      <text x="400" y="98" fontSize="11" fill={S_BLUE} fontWeight="bold">
        Q
      </text>
      <text x="400" y="205" fontSize="11" textAnchor="middle" fill="#475569">
        párhuzamos egyenesek
      </text>
    </Frame>
  );
};

// 2. ábra: nevezetes szögpárok két párhuzamos egyenes és egy metsző egyenes mentén
export const AnglePairsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const t1: Pt = [150, 250];
  const t2: Pt = [330, 50];
  const yE = 110;
  const yF = 190;
  const at = (y: number): Pt => lerp(t1, t2, (t1[1] - y) / (t1[1] - t2[1]));
  const X1 = at(yE);
  const X2 = at(yF);
  return (
    <Frame title="Nevezetes szögpárok (e ∥ f)" className={className} h={290}>
      <line x1="40" y1={yE} x2="440" y2={yE} stroke={S_INK} strokeWidth="1.6" />
      <line x1="40" y1={yF} x2="440" y2={yF} stroke={S_INK} strokeWidth="1.6" />
      <line x1={t1[0]} y1={t1[1]} x2={t2[0]} y2={t2[1]} stroke={S_INK} strokeWidth="1.6" />
      <text x="430" y={yE - 6} fontSize="12" fontStyle="italic" fill={S_INK}>
        e
      </text>
      <text x="430" y={yF - 6} fontSize="12" fontStyle="italic" fill={S_INK}>
        f
      </text>
      {/* α: felső metszéspont, jobb felső */}
      <path d={arcPath(X1, [440, yE], t2, 22)} fill="none" stroke={S_BLUE} strokeWidth="2" />
      <text x={X1[0] + 26} y={X1[1] - 8} fontSize="13" fill={S_BLUE} fontWeight="bold">
        α
      </text>
      {/* β: alsó metszéspont, jobb felső (egyállású) */}
      <path d={arcPath(X2, [440, yF], t2, 22)} fill="none" stroke={S_GREEN} strokeWidth="2" />
      <text x={X2[0] + 26} y={X2[1] - 8} fontSize="13" fill={S_GREEN} fontWeight="bold">
        β
      </text>
      {/* γ: felső metszéspont, bal alsó (csúcsszög α-val) */}
      <path d={arcPath(X1, [40, yE], t1, 22)} fill="none" stroke={S_PURPLE} strokeWidth="2" />
      <text x={X1[0] - 36} y={X1[1] + 20} fontSize="13" fill={S_PURPLE} fontWeight="bold">
        γ
      </text>
      {/* δ: felső metszéspont, bal felső (mellékszög α-val) */}
      <path d={arcPath(X1, [40, yE], t2, 16)} fill="none" stroke={S_AMBER} strokeWidth="2" />
      <text x={X1[0] - 32} y={X1[1] - 8} fontSize="13" fill={S_AMBER} fontWeight="bold">
        δ
      </text>
      <text x="40" y="232" fontSize="11" fill={S_INK}>
        α és β egyállású: α = β
      </text>
      <text x="40" y="250" fontSize="11" fill={S_INK}>
        α és γ csúcsszögek: α = γ; β és γ váltószögek: β = γ
      </text>
      <text x="40" y="268" fontSize="11" fill={S_INK}>
        α és δ mellékszögek: α + δ = 180°
      </text>
    </Frame>
  );
};

// 3. ábra: köré írt kör és beírt kör
export const CircumIncircleSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const A: Pt = [120, 250];
  const B: Pt = [320, 250];
  const C: Pt = [220, 95];
  const O = circumcenter(A, B, C);
  const R = dist(O, A);
  const I = incenter(A, B, C);
  const r = inradius(A, B, C);
  const mAB = lerp(A, B, 0.5);
  const mBC = lerp(B, C, 0.5);
  return (
    <Frame title="Oldalfelező merőlegesek → K; szögfelezők → O" className={className} h={330}>
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={S_BLUE} strokeWidth="1.4" />
      <circle cx={I[0]} cy={I[1]} r={r} fill="none" stroke={S_GREEN} strokeWidth="1.4" />
      <polygon points={`${A} ${B} ${C}`} fill="#f1f5f9" fillOpacity="0.6" stroke={S_INK} strokeWidth="2" />
      <line x1={mAB[0]} y1={mAB[1] + 20} x2={O[0]} y2={O[1] - 30} stroke={S_BLUE} strokeDasharray="5 3" />
      <line x1={mBC[0] + (mBC[0] - O[0]) * 0.3} y1={mBC[1] + (mBC[1] - O[1]) * 0.3} x2={O[0]} y2={O[1]} stroke={S_BLUE} strokeDasharray="5 3" />
      <RightAt V={mAB} P={B} Q={[mAB[0], mAB[1] - 30]} r={10} color={S_BLUE} />
      <RightAt V={mBC} P={C} Q={O} r={10} color={S_BLUE} />
      <line x1={A[0]} y1={A[1]} x2={I[0]} y2={I[1]} stroke={S_GREEN} strokeDasharray="4 3" />
      <line x1={B[0]} y1={B[1]} x2={I[0]} y2={I[1]} stroke={S_GREEN} strokeDasharray="4 3" />
      <line x1={C[0]} y1={C[1]} x2={I[0]} y2={I[1]} stroke={S_GREEN} strokeDasharray="4 3" />
      <circle cx={O[0]} cy={O[1]} r="4" fill={S_BLUE} />
      <text x={O[0] + 6} y={O[1] - 6} fontSize="12" fill={S_BLUE} fontWeight="bold">
        K
      </text>
      <circle cx={I[0]} cy={I[1]} r="4" fill={S_GREEN} />
      <text x={I[0] - 14} y={I[1] + 4} fontSize="12" fill={S_GREEN} fontWeight="bold">
        O
      </text>
      {[
        [A, 'A', -14, 14],
        [B, 'B', 6, 14],
        [C, 'C', -4, -8]
      ].map(([P, t, dx, dy]) => (
        <text key={t as string} x={(P as Pt)[0] + (dx as number)} y={(P as Pt)[1] + (dy as number)} fontSize="13" fontWeight="bold" fill={S_INK}>
          {t as string}
        </text>
      ))}
      <text x="360" y="90" fontSize="11" fill={S_BLUE}>
        K: köré írt kör
      </text>
      <text x="360" y="106" fontSize="11" fill={S_BLUE}>
        középpontja
      </text>
      <text x="360" y="130" fontSize="11" fill={S_GREEN}>
        O: beírt kör
      </text>
      <text x="360" y="146" fontSize="11" fill={S_GREEN}>
        középpontja
      </text>
    </Frame>
  );
};

// 4. ábra: magasságpont és súlypont
export const OrthoCentroidSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const A: Pt = [70, 240];
  const B: Pt = [330, 240];
  const C: Pt = [180, 70];
  const M = orthocenter(A, B, C);
  const S = centroid(A, B, C);
  const tA = foot(A, B, C);
  const tB = foot(B, A, C);
  const tC = foot(C, A, B);
  const fBC = lerp(B, C, 0.5);
  const fAC = lerp(A, C, 0.5);
  const fAB = lerp(A, B, 0.5);
  return (
    <Frame title="Magasságvonalak → M; súlyvonalak → S" className={className} h={290}>
      <polygon points={`${A} ${B} ${C}`} fill="#f8fafc" stroke={S_INK} strokeWidth="2" />
      {[
        [A, tA],
        [B, tB],
        [C, tC]
      ].map(([P, T], i) => (
        <g key={`h${i}`}>
          <line x1={(P as Pt)[0]} y1={(P as Pt)[1]} x2={(T as Pt)[0]} y2={(T as Pt)[1]} stroke={S_RED} strokeWidth="1.4" />
        </g>
      ))}
      <RightAt V={tC} P={C} Q={B} r={10} color={S_RED} />
      <RightAt V={tA} P={A} Q={C} r={10} color={S_RED} />
      <RightAt V={tB} P={B} Q={C} r={10} color={S_RED} />
      {[
        [A, fBC],
        [B, fAC],
        [C, fAB]
      ].map(([P, F], i) => (
        <line key={`s${i}`} x1={(P as Pt)[0]} y1={(P as Pt)[1]} x2={(F as Pt)[0]} y2={(F as Pt)[1]} stroke={S_PURPLE} strokeWidth="1.3" strokeDasharray="6 3" />
      ))}
      <circle cx={M[0]} cy={M[1]} r="4" fill={S_RED} />
      <text x={M[0] - 16} y={M[1] - 4} fontSize="12" fill={S_RED} fontWeight="bold">
        M
      </text>
      <circle cx={S[0]} cy={S[1]} r="4" fill={S_PURPLE} />
      <text x={S[0] + 6} y={S[1] + 14} fontSize="12" fill={S_PURPLE} fontWeight="bold">
        S
      </text>
      <text x={A[0] - 14} y={A[1] + 14} fontSize="13" fontWeight="bold" fill={S_INK}>
        A
      </text>
      <text x={B[0] + 4} y={B[1] + 14} fontSize="13" fontWeight="bold" fill={S_INK}>
        B
      </text>
      <text x={C[0] - 4} y={C[1] - 8} fontSize="13" fontWeight="bold" fill={S_INK}>
        C
      </text>
      <text x="345" y="110" fontSize="11" fill={S_RED}>
        M: magasságpont
      </text>
      <text x="345" y="135" fontSize="11" fill={S_PURPLE}>
        S: súlypont
      </text>
      <text x="345" y="151" fontSize="11" fill={S_PURPLE}>
        (harmadolópont)
      </text>
    </Frame>
  );
};

// 5. ábra: a négyszögek családja
export const QuadrilateralFamilySvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const boxes: { x: number; y: number; t: string; c: string; pts: string }[] = [
    { x: 190, y: 40, t: 'trapéz', c: S_INK, pts: '-30,14 30,14 18,-14 -16,-14' },
    { x: 90, y: 120, t: 'paralelogramma', c: S_BLUE, pts: '-32,14 20,14 32,-14 -20,-14' },
    { x: 380, y: 120, t: 'deltoid', c: S_GREEN, pts: '0,-18 18,-4 0,20 -18,-4' },
    { x: 90, y: 205, t: 'téglalap', c: S_PURPLE, pts: '-30,14 30,14 30,-14 -30,-14' },
    { x: 260, y: 205, t: 'rombusz', c: S_AMBER, pts: '0,-18 26,0 0,18 -26,0' },
    { x: 175, y: 275, t: 'négyzet', c: S_RED, pts: '-16,14 16,14 16,-18 -16,-18' }
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [4, 5]
  ];
  return (
    <Frame title="Négyszögek: a lefelé haladva minden tulajdonság öröklődik" className={className} h={320}>
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={boxes[a].x} y1={boxes[a].y + 22} x2={boxes[b].x} y2={boxes[b].y - 22} stroke="#94a3b8" strokeWidth="1.3" />
      ))}
      {boxes.map((b) => (
        <g key={b.t}>
          <polygon points={b.pts} transform={`translate(${b.x - 60} ${b.y})`} fill="#ffffff" stroke={b.c} strokeWidth="1.8" />
          <text x={b.x - 18} y={b.y + 5} fontSize="12" fontWeight="bold" fill={b.c}>
            {b.t}
          </text>
        </g>
      ))}
      <text x="300" y="45" fontSize="10.5" fill="#475569">
        van két párhuzamos oldala
      </text>
      <text x="300" y="300" fontSize="10.5" fill="#475569">
        négyzet = téglalap ∩ rombusz
      </text>
    </Frame>
  );
};

// 6. ábra: kidolgozott feladat – derékszögű háromszög, magasság és szögfelező
export const RightTriangleBisectorSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const C: Pt = [70, 245];
  const A: Pt = [400, 245];
  const tan25 = Math.tan((25 * Math.PI) / 180);
  const B: Pt = [70, 245 - 330 * tan25];
  const T = foot(C, A, B);
  // szögfelező: 45°-os irány metszése AB-vel
  const dir: Pt = [Math.SQRT1_2, -Math.SQRT1_2];
  const denom = dir[0] * (A[1] - B[1]) - dir[1] * (A[0] - B[0]);
  const s = ((B[0] - C[0]) * (A[1] - B[1]) - (B[1] - C[1]) * (A[0] - B[0])) / denom;
  const P: Pt = [C[0] + s * dir[0], C[1] + s * dir[1]];
  return (
    <Frame title="Magasság és szögfelező a derékszögű csúcsból" className={className} h={280}>
      <polygon points={`${A} ${B} ${C}`} fill="#f8fafc" stroke={S_INK} strokeWidth="2" />
      <line x1={C[0]} y1={C[1]} x2={T[0]} y2={T[1]} stroke={S_RED} strokeWidth="1.7" />
      <line x1={C[0]} y1={C[1]} x2={P[0]} y2={P[1]} stroke={S_BLUE} strokeWidth="1.7" strokeDasharray="6 3" />
      <RightAt V={C} P={A} Q={B} r={16} />
      <RightAt V={T} P={C} Q={A} r={10} color={S_RED} />
      <path d={arcPath(C, T, P, 46)} fill="none" stroke={S_GREEN} strokeWidth="2" />
      <text x={C[0] + 46} y={C[1] - 58} fontSize="12" fill={S_GREEN} fontWeight="bold">
        20°
      </text>
      <path d={arcPath(A, C, B, 34)} fill="none" stroke={S_AMBER} strokeWidth="1.6" />
      <text x={A[0] - 54} y={A[1] - 6} fontSize="12" fill={S_AMBER} fontWeight="bold">
        α = ?
      </text>
      <path d={arcPath(B, C, A, 22)} fill="none" stroke={S_PURPLE} strokeWidth="1.6" />
      <text x={B[0] + 10} y={B[1] + 36} fontSize="12" fill={S_PURPLE} fontWeight="bold">
        β = ?
      </text>
      <text x={C[0] - 16} y={C[1] + 14} fontSize="13" fontWeight="bold" fill={S_INK}>
        C
      </text>
      <text x={A[0] + 4} y={A[1] + 14} fontSize="13" fontWeight="bold" fill={S_INK}>
        A
      </text>
      <text x={B[0] - 16} y={B[1]} fontSize="13" fontWeight="bold" fill={S_INK}>
        B
      </text>
      <text x={T[0] + 2} y={T[1] - 8} fontSize="12" fontWeight="bold" fill={S_RED}>
        T
      </text>
      <text x={P[0] + 4} y={P[1] - 6} fontSize="12" fontWeight="bold" fill={S_BLUE}>
        P
      </text>
    </Frame>
  );
};

// 7. ábra: konvex hétszög egy csúcsból húzott átlói
export const PolygonDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const parts = [23, 42, 30, 47, 8];
  const V: Pt = [240, 250];
  const L = 175;
  const start = 90 - 150 / 2; // a csúcsnál lévő 150°-os szög szimmetrikusan felfelé nyílik
  const rays: Pt[] = [];
  let acc = start;
  rays.push([V[0] + L * Math.cos((acc * Math.PI) / 180), V[1] - L * Math.sin((acc * Math.PI) / 180)]);
  parts.forEach((p) => {
    acc += p;
    rays.push([V[0] + L * Math.cos((acc * Math.PI) / 180), V[1] - L * Math.sin((acc * Math.PI) / 180)]);
  });
  // a sokszög csúcsai: V, majd a sugarak végpontjai (közelítő, illusztratív hétszög)
  const poly = [V, ...rays.map((r, i) => lerp(V, r, [0.62, 0.92, 1, 1, 0.95, 0.7][i]))];
  let a2 = start;
  return (
    <Frame title="Egy csúcsból induló átlók: 4 átló, 5 szögtartomány" className={className} h={290}>
      <polygon points={poly.map((p) => p.join(',')).join(' ')} fill="#eef2ff" stroke={S_INK} strokeWidth="2" />
      {poly.slice(2, 6).map((p, i) => (
        <line key={i} x1={V[0]} y1={V[1]} x2={p[0]} y2={p[1]} stroke={S_BLUE} strokeWidth="1.4" />
      ))}
      {parts.map((p, i) => {
        const mid = a2 + p / 2;
        a2 += p;
        const rr = 70 + (i % 2) * 18;
        return (
          <text key={i} x={V[0] + rr * Math.cos((mid * Math.PI) / 180)} y={V[1] - rr * Math.sin((mid * Math.PI) / 180) + 4} fontSize="11" textAnchor="middle" fill={S_RED} fontWeight="bold">
            {p}°
          </text>
        );
      })}
      <circle cx={V[0]} cy={V[1]} r="4" fill={S_INK} />
      <text x="240" y="272" fontSize="11" textAnchor="middle" fill="#475569">
        23° + 42° + 30° + 47° + 8° = 150°
      </text>
    </Frame>
  );
};
