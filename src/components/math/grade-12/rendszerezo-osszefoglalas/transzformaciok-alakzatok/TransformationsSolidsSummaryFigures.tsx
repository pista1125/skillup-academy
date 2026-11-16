import React from 'react';
import { Frame, DEFAULT_FIG_CLASS, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK, Pt, RightAt, arcPath } from './sumKit';

type FigProps = { className?: string };

const label = (P: Pt, t: string, dx: number, dy: number, color = S_INK, size = 12) => (
  <text x={P[0] + dx} y={P[1] + dy} fontSize={size} fontWeight="bold" fill={color}>
    {t}
  </text>
);

// 1. ábra: tengelyes, középpontos és forgásszimmetria
export const SymmetryTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const pent = Array.from({ length: 5 }, (_, i): Pt => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / 5;
    return [390 + 55 * Math.cos(t), 135 + 55 * Math.sin(t)];
  });
  return (
    <Frame title="Szimmetriák: tengelyes, középpontos, forgás" className={className} h={240}>
      {/* deltoid tengellyel */}
      <polygon points="80,60 125,120 80,195 35,120" fill="#dbeafe" stroke={S_BLUE} strokeWidth="2" />
      <line x1="80" y1="45" x2="80" y2="210" stroke={S_RED} strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="80" y="226" fontSize="11" textAnchor="middle" fill={S_INK}>
        deltoid – tengely
      </text>
      {/* paralelogramma középponttal */}
      <polygon points="175,170 285,170 265,90 155,90" fill="#dcfce7" stroke={S_GREEN} strokeWidth="2" />
      <line x1="175" y1="170" x2="265" y2="90" stroke={S_GREEN} strokeDasharray="4 3" />
      <line x1="285" y1="170" x2="155" y2="90" stroke={S_GREEN} strokeDasharray="4 3" />
      <circle cx="220" cy="130" r="4" fill={S_RED} />
      <text x="228" y="126" fontSize="11" fill={S_RED} fontWeight="bold">
        O
      </text>
      <text x="220" y="226" fontSize="11" textAnchor="middle" fill={S_INK}>
        paralelogramma – középpont
      </text>
      {/* szabályos ötszög, 72° */}
      <polygon points={pent.map((p) => p.join(',')).join(' ')} fill="#f3e8ff" stroke={S_PURPLE} strokeWidth="2" />
      <line x1="390" y1="135" x2={pent[0][0]} y2={pent[0][1]} stroke={S_PURPLE} />
      <line x1="390" y1="135" x2={pent[1][0]} y2={pent[1][1]} stroke={S_PURPLE} />
      <path d={arcPath([390, 135], pent[0], pent[1], 20)} fill="none" stroke={S_RED} strokeWidth="1.8" />
      <text x="402" y="116" fontSize="11" fill={S_RED} fontWeight="bold">
        72°
      </text>
      <text x="390" y="226" fontSize="11" textAnchor="middle" fill={S_INK}>
        szabályos ötszög – 72°
      </text>
    </Frame>
  );
};

// 2. ábra: középpontos hasonlóság k = 1,5 és k = −0,5 aránnyal
export const CentralSimilaritySvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const O: Pt = [240, 150];
  const T: Pt[] = [
    [290, 175],
    [345, 160],
    [305, 110]
  ];
  const img = (k: number) => T.map((P): Pt => [O[0] + k * (P[0] - O[0]), O[1] + k * (P[1] - O[1])]);
  const big = img(1.5);
  const neg = img(-0.5);
  return (
    <Frame title="Középpontos hasonlóság: OP′ = |k| · OP" className={className} h={270}>
      {T.map((P, i) => (
        <line key={`r${i}`} x1={O[0]} y1={O[1]} x2={big[i][0]} y2={big[i][1]} stroke="#94a3b8" strokeDasharray="3 3" />
      ))}
      {neg.map((P, i) => (
        <line key={`n${i}`} x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke="#94a3b8" strokeDasharray="3 3" />
      ))}
      <polygon points={T.map((p) => p.join(',')).join(' ')} fill="#dbeafe" stroke={S_BLUE} strokeWidth="2" />
      <polygon points={big.map((p) => p.join(',')).join(' ')} fill="none" stroke={S_GREEN} strokeWidth="2" />
      <polygon points={neg.map((p) => p.join(',')).join(' ')} fill="#fee2e2" stroke={S_RED} strokeWidth="2" />
      <circle cx={O[0]} cy={O[1]} r="4" fill={S_INK} />
      {label(O, 'O', -14, 4)}
      {label(T[0], 'A', -4, 16, S_BLUE, 11)}
      {label(T[1], 'B', 4, 12, S_BLUE, 11)}
      {label(T[2], 'C', -12, -2, S_BLUE, 11)}
      {label(big[0], 'A′', -4, 16, S_GREEN, 11)}
      {label(big[1], 'B′', 4, 4, S_GREEN, 11)}
      {label(big[2], 'C′', -6, -6, S_GREEN, 11)}
      {label(neg[1], 'B″', -18, 0, S_RED, 11)}
      <text x="40" y="225" fontSize="11.5" fill={S_GREEN} fontWeight="bold">
        k = 1,5: nagyítás
      </text>
      <text x="40" y="245" fontSize="11.5" fill={S_RED} fontWeight="bold">
        k = −0,5: kicsinyítés + tükrözés O-ra
      </text>
      <text x="300" y="245" fontSize="11" fill={S_INK}>
        kerület: |k|-szoros, terület: k²-szeres
      </text>
    </Frame>
  );
};

// 3. ábra: Pitagorasz- és Thalész-tétel
export const PythagorasThalesSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  // Pitagorasz: befogók 3 és 4 egység (1 egység = 22 px)
  const u = 22;
  const C: Pt = [70, 200];
  const A: Pt = [70 + 4 * u, 200];
  const B: Pt = [70, 200 - 3 * u];
  // Thalész
  const O: Pt = [355, 170];
  const R = 80;
  const P: Pt = [O[0] + R * Math.cos((-115 * Math.PI) / 180), O[1] + R * Math.sin((-115 * Math.PI) / 180)];
  const A2: Pt = [O[0] - R, O[1]];
  const B2: Pt = [O[0] + R, O[1]];
  return (
    <Frame title="Pitagorasz-tétel: a² + b² = c²; Thalész-tétel" className={className} h={270}>
      <polygon points={`${A} ${B} ${C}`} fill="#dbeafe" stroke={S_INK} strokeWidth="2" />
      <RightAt V={C} P={A} Q={B} r={13} />
      <text x={(C[0] + A[0]) / 2} y={C[1] + 26} fontSize="12" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
        b
      </text>
      <text x={C[0] - 20} y={(C[1] + B[1]) / 2 + 4} fontSize="12" fill={S_AMBER} fontWeight="bold">
        a
      </text>
      <text x={(A[0] + B[0]) / 2 + 8} y={(A[1] + B[1]) / 2 - 4} fontSize="12" fill={S_RED} fontWeight="bold">
        c
      </text>
      <text x="110" y="255" fontSize="11" textAnchor="middle" fill={S_INK}>
        3² + 4² = 5²
      </text>
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={S_PURPLE} strokeWidth="1.6" />
      <polygon points={`${A2} ${B2} ${P}`} fill="#f3e8ff" fillOpacity="0.6" stroke={S_INK} strokeWidth="1.8" />
      <RightAt V={P} P={A2} Q={B2} r={13} color={S_RED} />
      <circle cx={O[0]} cy={O[1]} r="3.5" fill={S_INK} />
      {label(O, 'O', -4, 16, S_INK, 11)}
      {label(A2, 'A', -14, 4)}
      {label(B2, 'B', 4, 4)}
      {label(P, 'C', -6, -8)}
      <text x={O[0]} y="265" fontSize="11" textAnchor="middle" fill={S_INK}>
        az átmérő a körről derékszögben látszik
      </text>
    </Frame>
  );
};

// 4. ábra: hegyesszögek szögfüggvényei
export const TrigRatiosSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const A: Pt = [70, 220];
  const C: Pt = [380, 220];
  const B: Pt = [380, 70];
  return (
    <Frame title="sin α, cos α, tg α a derékszögű háromszögben" className={className} h={270}>
      <polygon points={`${A} ${B} ${C}`} fill="#eef2ff" stroke={S_INK} strokeWidth="2" />
      <RightAt V={C} P={A} Q={B} r={15} />
      <path d={arcPath(A, C, B, 40)} fill="none" stroke={S_RED} strokeWidth="2" />
      <text x={A[0] + 46} y={A[1] - 8} fontSize="13" fill={S_RED} fontWeight="bold">
        α
      </text>
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={S_BLUE} strokeWidth="4" strokeOpacity="0.5" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={S_GREEN} strokeWidth="4" strokeOpacity="0.5" />
      <text x={B[0] + 8} y="150" fontSize="11.5" fill={S_BLUE} fontWeight="bold">
        szemközti
      </text>
      <text x={B[0] + 8} y="164" fontSize="11.5" fill={S_BLUE} fontWeight="bold">
        befogó
      </text>
      <text x="225" y="242" fontSize="11.5" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
        szög melletti befogó
      </text>
      <text x="200" y="130" fontSize="11.5" fill={S_INK} fontWeight="bold" transform="rotate(-25.8 200 130)">
        átfogó
      </text>
      <text x="240" y="54" fontSize="10.5" textAnchor="middle" fill={S_INK}>
        sin α = szemközti/átfogó; cos α = melletti/átfogó; tg α = szemközti/melletti
      </text>
    </Frame>
  );
};

// 5. ábra: kidolgozott feladat – a függőhíd íve
export const BridgeArcSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const O: Pt = [240, 175];
  const R = 120;
  const yE = 100;
  const half = Math.sqrt(R * R - (O[1] - yE) ** 2);
  const A: Pt = [O[0] - half, yE];
  const B: Pt = [O[0] + half, yE];
  const E: Pt = [O[0], yE];
  const C: Pt = [O[0], O[1] - R];
  const D: Pt = [O[0], O[1] + R];
  return (
    <Frame title="A híd íve: EB² = EC · ED (vagy Pitagorasz az OEB háromszögben)" className={className} h={320}>
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 4" />
      <path d={`M ${A[0]} ${A[1]} A ${R} ${R} 0 0 1 ${B[0]} ${B[1]}`} fill="none" stroke={S_BLUE} strokeWidth="3" />
      <line x1={A[0] - 20} y1={yE} x2={B[0] + 20} y2={yE} stroke={S_INK} strokeWidth="2.5" />
      <line x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} stroke={S_INK} strokeDasharray="5 3" />
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={S_PURPLE} strokeWidth="1.4" />
      <line x1={D[0]} y1={D[1]} x2={B[0]} y2={B[1]} stroke={S_PURPLE} strokeWidth="1.4" />
      <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke={S_RED} strokeWidth="1.4" />
      <RightAt V={E} P={B} Q={C} r={10} />
      <RightAt V={B} P={C} Q={D} r={12} color={S_PURPLE} />
      {[O, A, B, C, D, E].map((P, i) => (
        <circle key={i} cx={P[0]} cy={P[1]} r="3" fill={S_INK} />
      ))}
      {label(A, 'A', -16, -4)}
      {label(B, 'B', 6, -4)}
      {label(C, 'C', -4, -8)}
      {label(D, 'D', 6, 14)}
      {label(E, 'E', -16, 16)}
      {label(O, 'O', -16, 4)}
      <text x={(A[0] + E[0]) / 2} y={yE + 16} fontSize="11" textAnchor="middle" fill={S_INK}>
        375 m
      </text>
      <text x={(E[0] + B[0]) / 2} y={yE + 16} fontSize="11" textAnchor="middle" fill={S_INK}>
        375 m
      </text>
      <text x={C[0] + 6} y={(C[1] + yE) / 2 + 4} fontSize="11" fill={S_AMBER} fontWeight="bold">
        120 m
      </text>
      <text x={D[0] + 6} y={(yE + D[1]) / 2 + 30} fontSize="11" fill={S_INK}>
        2r − 120
      </text>
      <text x={(O[0] + B[0]) / 2 + 10} y={(O[1] + B[1]) / 2 + 14} fontSize="11" fill={S_RED} fontWeight="bold">
        r
      </text>
    </Frame>
  );
};

// 6. ábra: területképletek
export const AreaFormulasSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  return (
    <Frame title="Területképletek" className={className} h={300}>
      {/* háromszög */}
      <polygon points="30,130 150,130 95,55" fill="#dbeafe" stroke={S_BLUE} strokeWidth="1.8" />
      <line x1="95" y1="55" x2="95" y2="130" stroke={S_RED} strokeDasharray="4 3" />
      <RightAt V={[95, 130]} P={[150, 130]} Q={[95, 55]} r={9} color={S_RED} />
      <text x="99" y="100" fontSize="11" fill={S_RED}>
        mₐ
      </text>
      <text x="90" y="146" fontSize="11" textAnchor="middle" fill={S_INK}>
        T = a · mₐ/2 = ab · sin γ/2
      </text>
      {/* paralelogramma */}
      <polygon points="260,130 370,130 400,60 290,60" fill="#dcfce7" stroke={S_GREEN} strokeWidth="1.8" />
      <line x1="290" y1="60" x2="290" y2="130" stroke={S_RED} strokeDasharray="4 3" />
      <RightAt V={[290, 130]} P={[370, 130]} Q={[290, 60]} r={9} color={S_RED} />
      <text x="294" y="100" fontSize="11" fill={S_RED}>
        mₐ
      </text>
      <text x="330" y="146" fontSize="11" textAnchor="middle" fill={S_INK}>
        T = a · mₐ = ab · sin γ
      </text>
      {/* deltoid */}
      <polygon points="95,170 140,215 95,280 50,215" fill="#fef3c7" stroke={S_AMBER} strokeWidth="1.8" />
      <line x1="95" y1="170" x2="95" y2="280" stroke={S_INK} strokeDasharray="4 3" />
      <line x1="50" y1="215" x2="140" y2="215" stroke={S_INK} strokeDasharray="4 3" />
      <RightAt V={[95, 215]} P={[140, 215]} Q={[95, 170]} r={8} />
      <text x="150" y="235" fontSize="11" fill={S_INK}>
        T = e · f/2
      </text>
      {/* trapéz */}
      <polygon points="250,280 400,280 365,200 285,200" fill="#f3e8ff" stroke={S_PURPLE} strokeWidth="1.8" />
      <line x1="300" y1="200" x2="300" y2="280" stroke={S_RED} strokeDasharray="4 3" />
      <RightAt V={[300, 280]} P={[400, 280]} Q={[300, 200]} r={9} color={S_RED} />
      <text x="304" y="246" fontSize="11" fill={S_RED}>
        m
      </text>
      <text x="325" y="194" fontSize="11" textAnchor="middle" fill={S_INK}>
        c
      </text>
      <text x="325" y="294" fontSize="11" textAnchor="middle" fill={S_INK}>
        a · T = (a + c)/2 · m
      </text>
    </Frame>
  );
};

// 7. ábra: kidolgozott feladat – koszinusz- és szinusztétel (PQR háromszög)
export const CosineLawSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  // QR = 6,4; PQ = 4,4; PR = 5,3 cm (1 cm = 45 px)
  const s = 45;
  const Q: Pt = [80, 230];
  const R: Pt = [80 + 6.4 * s, 230];
  const x = (4.4 ** 2 - 5.3 ** 2 + 6.4 ** 2) / (2 * 6.4);
  const y = Math.sqrt(4.4 ** 2 - x * x);
  const P: Pt = [Q[0] + x * s, Q[1] - y * s];
  return (
    <Frame title="Koszinusztétel a leghosszabb oldalra, majd szinusztétel" className={className} h={270}>
      <polygon points={`${P} ${Q} ${R}`} fill="#eef2ff" stroke={S_INK} strokeWidth="2" />
      <path d={arcPath(P, Q, R, 24)} fill="none" stroke={S_RED} strokeWidth="2" />
      <path d={arcPath(R, Q, P, 30)} fill="none" stroke={S_GREEN} strokeWidth="2" />
      <text x={P[0] - 4} y={P[1] + 40} fontSize="13" fill={S_RED} fontWeight="bold">
        β
      </text>
      <text x={R[0] - 52} y={R[1] - 8} fontSize="13" fill={S_GREEN} fontWeight="bold">
        δ
      </text>
      {label(P, 'P', -4, -8)}
      {label(Q, 'Q', -16, 6)}
      {label(R, 'R', 6, 6)}
      <text x={(Q[0] + P[0]) / 2 - 40} y={(Q[1] + P[1]) / 2} fontSize="12" fill={S_INK}>
        4,4 cm
      </text>
      <text x={(R[0] + P[0]) / 2 + 10} y={(R[1] + P[1]) / 2} fontSize="12" fill={S_INK}>
        5,3 cm
      </text>
      <text x={(Q[0] + R[0]) / 2} y={Q[1] + 18} fontSize="12" textAnchor="middle" fill={S_INK}>
        6,4 cm
      </text>
      <text x="240" y="54" fontSize="11" textAnchor="middle" fill="#475569">
        6,4² = 5,3² + 4,4² − 2 · 5,3 · 4,4 · cos β
      </text>
    </Frame>
  );
};

