import React from 'react';
import { Frame, T, sectorPath, ringPath, C_BLUE, C_RED, C_GREEN, C_PURPLE, C_EDGE, C_AMBER, F_BLUE, F_RED, F_GREEN, F_AMBER } from './probKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type P2 = [number, number];

/** Derékszög jelölése: negyedkörív ponttal (magyar jelölés). */
export const RightAngleMark: React.FC<{ v: P2; p1: P2; p2: P2; r?: number; c?: string }> = ({ v, p1, p2, r = 12, c = C_EDGE }) => {
  const u = (p: P2): P2 => {
    const dx = p[0] - v[0];
    const dy = p[1] - v[1];
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  const u1 = u(p1);
  const u2 = u(p2);
  const a: P2 = [v[0] + r * u1[0], v[1] + r * u1[1]];
  const b: P2 = [v[0] + r * u2[0], v[1] + r * u2[1]];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const sweep = cross > 0 ? 1 : 0;
  const bis: P2 = [u1[0] + u2[0], u1[1] + u2[1]];
  const bl = Math.hypot(bis[0], bis[1]) || 1;
  const d: P2 = [v[0] + (0.55 * r * bis[0]) / bl, v[1] + (0.55 * r * bis[1]) / bl];
  return (
    <g>
      <path d={`M ${a[0]} ${a[1]} A ${r} ${r} 0 0 ${sweep} ${b[0]} ${b[1]}`} fill="none" stroke={c} strokeWidth={1.4} />
      <circle cx={d[0]} cy={d[1]} r={1.8} fill={c} />
    </g>
  );
};

/** Koncentrikus céltábla (sugarak px-ben, belülről kifelé). */
export const Target: React.FC<{ cx: number; cy: number; radii: number[]; fills: string[]; stroke?: string }> = ({ cx, cy, radii, fills, stroke = C_EDGE }) => (
  <g>
    {radii.map((R, i) => (
      <path key={i} d={ringPath(cx, cy, R, i === 0 ? 0 : radii[i - 1])} fill={fills[i] ?? '#ffffff'} fillRule="evenodd" stroke={stroke} strokeWidth={1.4} />
    ))}
  </g>
);

// 1. ábra: a kidolgozott feladat céltáblája
export const TargetRingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 4.4;
  return (
    <Frame title="Céltábla: belső kör d = 10 cm, két 10 cm-es körgyűrű" className={className} h={290}>
      <Target cx={140} cy={160} radii={[5 * s, 15 * s, 25 * s]} fills={[F_RED, F_AMBER, F_BLUE]} />
      <line x1={140} y1={160} x2={140 + 25 * s} y2={160} stroke={C_EDGE} strokeWidth={1.2} strokeDasharray="4 3" />
      <T x={140 + 2.5 * s} y={152} t="5" s={10} b />
      <T x={140 + 10 * s} y={152} t="10" s={10} b />
      <T x={140 + 20 * s} y={152} t="10" s={10} b />
      <T x={290} y={80} t="P(belső kör) = 5²π / 25²π = 1/25" s={11} a="start" b c={C_RED} />
      <T x={290} y={112} t="P(belső gyűrű) = (15² − 5²)π / 25²π" s={11} a="start" b c={C_AMBER} />
      <T x={300} y={130} t="= 200/625 = 8/25" s={11} a="start" b c={C_AMBER} />
      <T x={290} y={162} t="P(külső gyűrű) = (25² − 15²)π / 25²π" s={11} a="start" b c={C_BLUE} />
      <T x={300} y={180} t="= 400/625 = 16/25" s={11} a="start" b c={C_BLUE} />
      <T x={290} y={220} t="Ellenőrzés: 1/25 + 8/25 + 16/25 = 1" s={11} a="start" c={C_GREEN} />
    </Frame>
  );
};

// 2. ábra: szerencsekerék
export const LuckyWheelSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const parts = [
    { a: 120, f: F_BLUE, t: 'A: 120°' },
    { a: 90, f: F_RED, t: 'B: 90°' },
    { a: 60, f: F_GREEN, t: 'C: 60°' },
    { a: 90, f: F_AMBER, t: 'D: 90°' }
  ];
  let acc = 0;
  return (
    <Frame title="Szerencsekerék: P = középponti szög / 360°" className={className} h={280}>
      {parts.map((p) => {
        const a0 = acc;
        acc += p.a;
        const mid = ((a0 + acc) / 2) * (Math.PI / 180);
        return (
          <g key={p.t}>
            <path d={sectorPath(140, 156, 100, a0, acc)} fill={p.f} stroke={C_EDGE} strokeWidth={1.4} />
            <T x={140 + 60 * Math.sin(mid)} y={156 - 60 * Math.cos(mid)} t={p.t} s={11} b />
          </g>
        );
      })}
      <polygon points="140,46 132,30 148,30" fill={C_EDGE} />
      <circle cx={140} cy={156} r={5} fill={C_EDGE} />
      <T x={280} y={86} t="P(A) = 120°/360° = 1/3" s={12} a="start" b c={C_BLUE} />
      <T x={280} y={116} t="P(B) = 90°/360° = 1/4" s={12} a="start" b c={C_RED} />
      <T x={280} y={146} t="P(C) = 60°/360° = 1/6" s={12} a="start" b c={C_GREEN} />
      <T x={280} y={176} t="P(D) = 90°/360° = 1/4" s={12} a="start" b c="#92400e" />
      <T x={280} y={214} t="A szögek összege 360°," s={11} a="start" />
      <T x={280} y={230} t="a valószínűségeké 1." s={11} a="start" />
    </Frame>
  );
};

// 3. ábra: hangya a méterrúdon (1. feladat)
export const AntRodSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 50;
  const L = 380;
  const X = (cm: number) => x0 + (cm / 100) * L;
  const rod = (y: number, seg: [number, number], color: string, label: string) => (
    <g>
      <rect x={X(0)} y={y} width={L} height={12} fill="#ffffff" stroke={C_EDGE} />
      <rect x={X(seg[0])} y={y} width={X(seg[1]) - X(seg[0])} height={12} fill={color} stroke={C_EDGE} />
      <T x={X(50)} y={y + 26} t={label} s={11} />
    </g>
  );
  return (
    <Frame title="Hangya az 1 m-es rúdon: hosszúságok aránya" className={className} h={280}>
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={X(i * 10)} y1={48} x2={X(i * 10)} y2={56} stroke={C_EDGE} />
          <T x={X(i * 10)} y={42} t={String(i * 10)} s={9} c="#475569" />
        </g>
      ))}
      {rod(62, [0, 50], F_BLUE, 'a) közelebb a 0-hoz, mint a 100-hoz: [0; 50) → 50/100 = 1/2')}
      {rod(120, [25, 75], F_GREEN, 'b) közelebb a középponthoz, mint egy véghez: (25; 75) → 1/2')}
      {rod(178, [0, 60], F_AMBER, 'c) közelebb a 20 cm-es ponthoz, mint a 100-hoz: [0; 60) → 0,6')}
      <circle cx={X(20)} cy={184} r={4} fill={C_RED} />
      <T x={X(20)} y={172} t="20" s={9} c={C_RED} b />
      <line x1={X(60)} y1={172} x2={X(60)} y2={196} stroke={C_RED} strokeWidth={1.5} strokeDasharray="3 2" />
      <T x={240} y={250} t="P = a kedvező szakasz hossza / a teljes rúd hossza" s={12} b c={C_PURPLE} />
    </Frame>
  );
};

// 4. ábra: 50 forintos a csempén (3. feladat)
export const TileCoinSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 9;
  const x0 = 60;
  const y0 = 60;
  const g = 0.5 * s;
  return (
    <Frame title="Az érme nem érint fugát, ha a középpontja a belső négyzetben van" className={className} h={300}>
      <rect x={x0 - g} y={y0 - g} width={20 * s + 2 * g} height={20 * s + 2 * g} fill="#94a3b8" />
      <rect x={x0} y={y0} width={20 * s} height={20 * s} fill="#f1f5f9" stroke={C_EDGE} />
      <rect x={x0 + 1.4 * s} y={y0 + 1.4 * s} width={17.2 * s} height={17.2 * s} fill={F_GREEN} stroke={C_GREEN} strokeDasharray="5 3" />
      <circle cx={x0 + 1.4 * s} cy={y0 + 6 * s} r={1.4 * s} fill="#fde68a" stroke={C_AMBER} strokeWidth={1.5} />
      <circle cx={x0 + 1.4 * s} cy={y0 + 6 * s} r={2} fill={C_AMBER} />
      <T x={x0 + 10 * s} y={y0 + 20 * s + 20} t="csempe: 20 cm, fuga: 0,5 cm" s={11} />
      <T x={x0 + 10 * s} y={y0 + 10 * s} t="17,2 cm" s={12} b c={C_GREEN} />
      <T x={300} y={90} t="érme átmérője 2,8 cm → r = 1,4 cm" s={11} a="start" />
      <T x={300} y={120} t="kedvező: 17,2² = 295,84 cm²" s={11} a="start" c={C_GREEN} b />
      <T x={300} y={146} t="összes (csempe + fuga fele" s={11} a="start" />
      <T x={300} y={162} t="minden oldalon): 20,5² = 420,25 cm²" s={11} a="start" />
      <T x={300} y={200} t="P = 295,84 / 420,25 ≈ 0,704" s={13} a="start" b c={C_PURPLE} />
    </Frame>
  );
};

// 5. ábra: a csonkakúp alakú virágcserép tengelymetszete (5. feladat)
export const FlowerPotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 12;
  const cx = 150;
  const yb = 250;
  const m = Math.sqrt(91);
  const yt = yb - m * s;
  const A: P2 = [cx - 9 * s, yb];
  const B: P2 = [cx + 9 * s, yb];
  const C: P2 = [cx + 6 * s, yt];
  const D: P2 = [cx - 6 * s, yt];
  const r3 = 6 + 9 / m;
  const y3 = yt + 3 * s;
  const foot: P2 = [C[0], yb];
  return (
    <Frame title="Virágcserép (csonkakúp): a fedőlaptól legfeljebb 3 cm" className={className} h={290}>
      <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`} fill="#fef3c7" stroke={C_EDGE} strokeWidth={1.8} />
      <polygon points={`${D[0]},${D[1]} ${C[0]},${C[1]} ${cx + r3 * s},${y3} ${cx - r3 * s},${y3}`} fill={F_AMBER} stroke={C_AMBER} strokeWidth={1.5} />
      <line x1={cx - r3 * s} y1={y3} x2={cx + r3 * s} y2={y3} stroke={C_AMBER} strokeWidth={1.5} strokeDasharray="5 3" />
      <line x1={C[0]} y1={C[1]} x2={foot[0]} y2={foot[1]} stroke={C_PURPLE} strokeWidth={1.5} strokeDasharray="4 3" />
      <RightAngleMark v={foot} p1={C} p2={A} r={11} c={C_PURPLE} />
      <T x={cx} y={yb + 14} t="18 cm" s={11} b c={C_BLUE} />
      <T x={cx} y={yt - 10} t="12 cm" s={11} b c={C_BLUE} />
      <T x={B[0] + 4} y={(B[1] + C[1]) / 2} t="10 cm" s={11} b c={C_RED} a="start" />
      <T x={C[0] - 6} y={(yt + yb) / 2 + 20} t="m" s={12} b c={C_PURPLE} a="end" />
      <T x={D[0] - 8} y={(yt + y3) / 2} t="3 cm" s={10} b c="#92400e" a="end" />
      <T x={300} y={70} t="m = √(10² − 3²) = √91 ≈ 9,54 cm" s={11} a="start" />
      <T x={300} y={98} t="r(3 cm-nél) = 6 + 3 · 3/m ≈ 6,94 cm" s={11} a="start" />
      <T x={300} y={126} t="V(felső szelet) ≈ 395,4 cm³" s={11} a="start" c="#92400e" b />
      <T x={300} y={150} t="V(cserép) ≈ 1708,2 cm³" s={11} a="start" />
      <T x={300} y={188} t="P ≈ 395,4 / 1708,2 ≈ 0,23" s={13} a="start" b c={C_PURPLE} />
    </Frame>
  );
};

// 6. ábra: pont a papírlapon, minden csúcstól 10 cm-nél távolabb (HF 2.)
export const PaperCornersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 7;
  const x0 = 40;
  const y0 = 60;
  const W = 30 * s;
  const H = 20 * s;
  const r = 10 * s;
  return (
    <Frame title="20 cm × 30 cm-es lap: minden csúcstól 10 cm-nél távolabb" className={className} h={260}>
      <rect x={x0} y={y0} width={W} height={H} fill={F_GREEN} stroke={C_EDGE} strokeWidth={1.6} />
      <path d={`M ${x0} ${y0} L ${x0 + r} ${y0} A ${r} ${r} 0 0 1 ${x0} ${y0 + r} Z`} fill="#ffffff" stroke={C_RED} />
      <path d={`M ${x0 + W} ${y0} L ${x0 + W} ${y0 + r} A ${r} ${r} 0 0 1 ${x0 + W - r} ${y0} Z`} fill="#ffffff" stroke={C_RED} />
      <path d={`M ${x0} ${y0 + H} L ${x0} ${y0 + H - r} A ${r} ${r} 0 0 1 ${x0 + r} ${y0 + H} Z`} fill="#ffffff" stroke={C_RED} />
      <path d={`M ${x0 + W} ${y0 + H} L ${x0 + W - r} ${y0 + H} A ${r} ${r} 0 0 1 ${x0 + W} ${y0 + H - r} Z`} fill="#ffffff" stroke={C_RED} />
      <T x={x0 + W / 2} y={y0 - 10} t="30 cm" s={11} b />
      <T x={x0 - 8} y={y0 + H / 2} t="20" s={11} b a="end" />
      <T x={x0 + 22} y={y0 + 18} t="10" s={10} c={C_RED} />
      <T x={300} y={96} t="4 negyedkör = 1 teljes kör:" s={11} a="start" />
      <T x={300} y={114} t="10²π = 100π ≈ 314,2 cm²" s={11} a="start" c={C_RED} />
      <T x={300} y={146} t="kedvező: 600 − 100π cm²" s={11} a="start" c={C_GREEN} b />
      <T x={300} y={184} t="P = (600 − 100π)/600 ≈ 0,476" s={12} a="start" b c={C_PURPLE} />
    </Frame>
  );
};

