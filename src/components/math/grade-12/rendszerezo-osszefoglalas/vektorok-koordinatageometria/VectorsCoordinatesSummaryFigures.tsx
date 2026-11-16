import React from 'react';
import { Frame, DEFAULT_FIG_CLASS, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK, Pt, RightAt, Grid, Arrow, makePlane, PlaneCfg } from './sumKit';

type FigProps = { className?: string };

const lbl = (P: Pt, t: string, dx: number, dy: number, color = S_INK, size = 12) => (
  <text x={P[0] + dx} y={P[1] + dy} fontSize={size} fontWeight="bold" fill={color}>
    {t}
  </text>
);

// 1. ábra: vektorok összege és különbsége
export const VectorOpsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const O: Pt = [70, 220];
  const a: Pt = [170, -30];
  const b: Pt = [60, -120];
  const A: Pt = [O[0] + a[0], O[1] + a[1]];
  const B: Pt = [O[0] + b[0], O[1] + b[1]];
  const S: Pt = [O[0] + a[0] + b[0], O[1] + a[1] + b[1]];
  return (
    <Frame title="a + b (paralelogramma-szabály) és a − b" className={className} h={260}>
      <line x1={A[0]} y1={A[1]} x2={S[0]} y2={S[1]} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={B[0]} y1={B[1]} x2={S[0]} y2={S[1]} stroke="#94a3b8" strokeDasharray="4 3" />
      <Arrow from={O} to={A} color={S_BLUE} />
      <Arrow from={O} to={B} color={S_GREEN} />
      <Arrow from={O} to={S} color={S_RED} width={2.6} />
      <Arrow from={B} to={A} color={S_PURPLE} />
      {lbl([(O[0] + A[0]) / 2, (O[1] + A[1]) / 2], 'a', 0, 18, S_BLUE, 14)}
      {lbl([(O[0] + B[0]) / 2, (O[1] + B[1]) / 2], 'b', -16, 0, S_GREEN, 14)}
      {lbl([(O[0] + S[0]) / 2, (O[1] + S[1]) / 2], 'a + b', -10, -10, S_RED, 13)}
      {lbl([(B[0] + A[0]) / 2, (B[1] + A[1]) / 2], 'a − b', 8, 4, S_PURPLE, 13)}
      <text x="400" y="80" fontSize="11" fill={S_INK} textAnchor="middle">
        a − b: b végpontjából
      </text>
      <text x="400" y="96" fontSize="11" fill={S_INK} textAnchor="middle">
        a végpontjába mutat
      </text>
    </Frame>
  );
};

// 2. ábra: vektor koordinátái a bázisvektorokkal
export const VectorCoordsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const c: PlaneCfg = { xmin: -1, xmax: 6, ymin: -1, ymax: 4, x0: 100, y0: 40, w: 280, h: 200 };
  const { P } = makePlane(c);
  return (
    <Frame title="a = a₁i + a₂j, a(a₁; a₂) – itt a(5; 3)" className={className} h={270}>
      <Grid c={c} />
      <Arrow from={P(0, 0)} to={P(1, 0)} color={S_GREEN} width={3} />
      <Arrow from={P(0, 0)} to={P(0, 1)} color={S_GREEN} width={3} />
      <Arrow from={P(0, 0)} to={P(5, 0)} color={S_AMBER} dashed />
      <Arrow from={P(5, 0)} to={P(5, 3)} color={S_AMBER} dashed />
      <Arrow from={P(0, 0)} to={P(5, 3)} color={S_BLUE} width={2.8} />
      {lbl(P(0.4, 0), 'i', 0, 16, S_GREEN)}
      {lbl(P(0, 0.5), 'j', -14, 4, S_GREEN)}
      {lbl(P(2.6, 0), '5i', 0, -6, S_AMBER, 11)}
      {lbl(P(5, 1.5), '3j', 6, 0, S_AMBER, 11)}
      {lbl(P(2.5, 1.5), 'a', -6, -8, S_BLUE, 14)}
    </Frame>
  );
};

// 3. ábra: egyenes meredeksége, y = mx + b és x = c
export const LineSlopeSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const c: PlaneCfg = { xmin: -3, xmax: 6, ymin: -2, ymax: 6, x0: 114, y0: 36, w: 252, h: 224 };
  const { P } = makePlane(c);
  const f = (x: number) => 0.5 * x + 1;
  return (
    <Frame title="y = mx + b: m meredekség, (0; b) tengelymetszet" className={className} h={280}>
      <Grid c={c} />
      <line x1={P(-3, f(-3))[0]} y1={P(-3, f(-3))[1]} x2={P(6, f(6))[0]} y2={P(6, f(6))[1]} stroke={S_BLUE} strokeWidth="2.4" />
      <line x1={P(2, f(2))[0]} y1={P(2, f(2))[1]} x2={P(4, f(2))[0]} y2={P(4, f(2))[1]} stroke={S_RED} strokeWidth="2" />
      <line x1={P(4, f(2))[0]} y1={P(4, f(2))[1]} x2={P(4, f(4))[0]} y2={P(4, f(4))[1]} stroke={S_RED} strokeWidth="2" />
      <RightAt V={P(4, f(2))} P={P(2, f(2))} Q={P(4, f(4))} r={9} color={S_RED} />
      {lbl(P(3, f(2)), '2', -4, 16, S_RED, 11)}
      {lbl(P(4, 2.5), '1', 6, 4, S_RED, 11)}
      <circle cx={P(0, 1)[0]} cy={P(0, 1)[1]} r="4" fill={S_GREEN} />
      {lbl(P(0, 1), '(0; b)', 6, -6, S_GREEN, 11)}
      {lbl(P(4.6, f(4.6)), 'y = 0,5x + 1', -40, -12, S_BLUE, 11)}
      <line x1={P(-2, -2)[0]} y1={P(-2, -2)[1]} x2={P(-2, 6)[0]} y2={P(-2, 6)[1]} stroke={S_PURPLE} strokeWidth="2.2" />
      {lbl(P(-2, 5), 'x = c', 6, 0, S_PURPLE, 11)}
      <text x="430" y="268" fontSize="10.5" textAnchor="end" fill={S_INK}>
        m = 1/2: 2 jobbra, 1 fel
      </text>
    </Frame>
  );
};

// 4. ábra: 6. kidolgozott feladat – ABC háromszög és az A-ból induló súlyvonal
export const TriangleMedianSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const c: PlaneCfg = { xmin: -6, xmax: 5, ymin: -1, ymax: 13, x0: 100, y0: 34, w: 192.5, h: 245 };
  const { P } = makePlane(c);
  const A = P(-5, 3);
  const B = P(-1, 0);
  const C = P(4, 12);
  const F = P(1.5, 6);
  return (
    <Frame title="A(−5; 3), B(−1; 0), C(4; 12); F a BC felezőpontja" className={className} h={310}>
      <Grid c={c} labelEvery={2} />
      <polygon points={`${A} ${B} ${C}`} fill="#dbeafe" fillOpacity="0.55" stroke={S_INK} strokeWidth="2" />
      <line x1={A[0]} y1={A[1]} x2={F[0]} y2={F[1]} stroke={S_RED} strokeWidth="2" strokeDasharray="6 3" />
      {[A, B, C, F].map((Q, i) => (
        <circle key={i} cx={Q[0]} cy={Q[1]} r="3.8" fill={i === 3 ? S_RED : S_INK} />
      ))}
      {lbl(A, 'A', -16, -4)}
      {lbl(B, 'B', 6, 12)}
      {lbl(C, 'C', 6, 4)}
      {lbl(F, 'F', 6, 12, S_RED)}
      <text x="330" y="120" fontSize="11" fill={S_INK}>
        AB = 5
      </text>
      <text x="330" y="138" fontSize="11" fill={S_INK}>
        BC = 13
      </text>
      <text x="330" y="156" fontSize="11" fill={S_INK}>
        AC = 9√2
      </text>
      <text x="330" y="180" fontSize="11" fill={S_RED}>
        β ≈ 75,75°
      </text>
    </Frame>
  );
};

// 5. ábra: 7. kidolgozott feladat – e, f, g egyenesek és a Thalész-kör
export const LinesThalesSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const c: PlaneCfg = { xmin: -6, xmax: 5, ymin: -4, ymax: 7, x0: 60, y0: 36, w: 242, h: 242 };
  const { P, sx } = makePlane(c);
  const seg = (f: (x: number) => number, x1: number, x2: number, color: string, w = 2) => (
    <line x1={P(x1, f(x1))[0]} y1={P(x1, f(x1))[1]} x2={P(x2, f(x2))[0]} y2={P(x2, f(x2))[1]} stroke={color} strokeWidth={w} />
  );
  const Cc = P(1, 3);
  return (
    <Frame title="e: y = −3x + 6, f ⊥ e, g: y = 2x − 9; Thalész-kör" className={className} h={310}>
      <Grid c={c} labelEvery={2} />
      <circle cx={Cc[0]} cy={Cc[1]} r={Math.sqrt(10) * sx} fill="#f3e8ff" fillOpacity="0.4" stroke={S_PURPLE} strokeWidth="1.6" />
      <polygon points={`${P(0, 0)} ${P(2, 0)} ${P(0, 6)}`} fill="#fef3c7" fillOpacity="0.7" stroke="none" />
      {seg((x) => -3 * x + 6, -1 / 3, 10 / 3, S_BLUE, 2.4)}
      {seg((x) => x / 3 + 5 / 3, -6, 5, S_GREEN)}
      {seg((x) => 2 * x - 9, 2.5, 5, S_RED)}
      <RightAt V={P(0, 0)} P={P(2, 0)} Q={P(0, 6)} r={10} />
      {[P(3, -3), P(2, 0), P(0, 6), P(-5, 0), Cc].map((Q, i) => (
        <circle key={i} cx={Q[0]} cy={Q[1]} r="3.5" fill={S_INK} />
      ))}
      {lbl(P(3, -3), 'B(3; −3)', 6, 4, S_RED, 10.5)}
      {lbl(P(2, 0), 'P', 4, 14, S_INK, 11)}
      {lbl(P(0, 6), 'Q', 6, -2, S_INK, 11)}
      {lbl(P(-5, 0), 'A(−5; 0)', -10, -8, S_GREEN, 10.5)}
      {lbl(Cc, 'C(1; 3)', 6, -4, S_PURPLE, 10.5)}
      <text x="318" y="70" fontSize="11" fill={S_BLUE} fontWeight="bold">
        e
      </text>
      <text x="318" y="90" fontSize="11" fill={S_GREEN} fontWeight="bold">
        f: y = x/3 + 5/3
      </text>
      <text x="318" y="110" fontSize="11" fill={S_RED} fontWeight="bold">
        g
      </text>
      <text x="318" y="140" fontSize="10.5" fill={S_PURPLE}>
        (x − 1)² + (y − 3)² = 10
      </text>
      <text x="318" y="160" fontSize="10.5" fill={S_INK}>
        T = 6 · 2/2 = 6
      </text>
    </Frame>
  );
};

// 6. ábra: a kör egyenlete
export const CircleEquationSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const c: PlaneCfg = { xmin: -1, xmax: 7, ymin: -1, ymax: 6, x0: 70, y0: 36, w: 280, h: 245 };
  const { P, sx } = makePlane(c);
  const C = P(3, 2.5);
  const r = 2.5;
  const t = (40 * Math.PI) / 180;
  const Q = P(3 + r * Math.cos(t), 2.5 + r * Math.sin(t));
  const H = P(3 + r * Math.cos(t), 2.5);
  return (
    <Frame title="Kör: (x − u)² + (y − v)² = r²" className={className} h={300}>
      <Grid c={c} />
      <circle cx={C[0]} cy={C[1]} r={r * sx} fill="none" stroke={S_BLUE} strokeWidth="2.2" />
      <line x1={C[0]} y1={C[1]} x2={Q[0]} y2={Q[1]} stroke={S_RED} strokeWidth="2" />
      <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={S_AMBER} strokeDasharray="4 3" strokeWidth="1.6" />
      <line x1={H[0]} y1={H[1]} x2={Q[0]} y2={Q[1]} stroke={S_AMBER} strokeDasharray="4 3" strokeWidth="1.6" />
      <RightAt V={H} P={C} Q={Q} r={9} color={S_AMBER} />
      <circle cx={C[0]} cy={C[1]} r="4" fill={S_INK} />
      <circle cx={Q[0]} cy={Q[1]} r="4" fill={S_RED} />
      {lbl(C, 'C(u; v)', -50, 16, S_INK, 11)}
      {lbl(Q, 'P(x; y)', 6, -6, S_RED, 11)}
      {lbl([(C[0] + Q[0]) / 2, (C[1] + Q[1]) / 2], 'r', -12, -4, S_RED)}
      {lbl([(C[0] + H[0]) / 2, H[1]], 'x − u', -14, 14, S_AMBER, 10)}
      {lbl([H[0], (H[1] + Q[1]) / 2], 'y − v', 6, 4, S_AMBER, 10)}
      <text x="370" y="120" fontSize="11" fill={S_INK}>
        Pitagorasz:
      </text>
      <text x="370" y="138" fontSize="11" fill={S_INK}>
        (x − u)² + (y − v)²
      </text>
      <text x="370" y="156" fontSize="11" fill={S_INK}>
        = r²
      </text>
    </Frame>
  );
};
