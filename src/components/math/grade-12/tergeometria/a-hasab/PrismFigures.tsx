import React from 'react';
import {
  P2,
  P3,
  KLine,
  KText,
  KPoly,
  KRight,
  KSolid,
  makeProj,
  kPrism,
  kRegular,
  kMid,
  K_RED,
  K_BLUE,
  K_GREEN,
  K_PURPLE,
  K_EDGE
} from './figKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** A bevezető nyolcszöge: 3 × 3-as négyzet, a sarkokból 1 × 1-es derékszögű háromszögeket vágtunk le. */
export const OCTA_BASE: [number, number][] = [
  [1, 0], [2, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 2], [0, 1]
];

// 1. ábra: a Rubik-kockából vágott nyolcszög alapú egyenes hasáb
export const RubikOctaPrismSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pr = makeProj(40, 250, 46, 0.55, 35);
  const { verts, faces } = kPrism(OCTA_BASE, 3);
  // felülnézet
  const s = 40;
  const ox = 300;
  const oy = 80;
  const T = (p: [number, number]): P2 => [ox + p[0] * s, oy + p[1] * s];
  const oct = OCTA_BASE.map(T);
  return (
    <Frame title="A „megvágott” bűvös kocka: nyolcszög alapú egyenes hasáb" className={className}>
      <KSolid verts={verts} faces={faces} proj={pr} shade={[1]} />
      <KText p={[kMid(pr(verts[8]), pr(verts[0]))[0] - 14, kMid(pr(verts[8]), pr(verts[0]))[1]]} t="3" c={K_BLUE} />
      <KText p={[kMid(pr(verts[0]), pr(verts[1]))[0], kMid(pr(verts[0]), pr(verts[1]))[1] + 13]} t="1" c={K_BLUE} />
      <KText p={[kMid(pr(verts[1]), pr(verts[2]))[0] + 14, kMid(pr(verts[1]), pr(verts[2]))[1] + 6]} t="√2" c={K_RED} />
      <text x="40" y="282" fontSize="11.5" fill="#334155">16 csúcs, 24 él, 10 lap (2 nyolcszög + 8 téglalap)</text>
      {/* felülnézeti rács */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <KLine a={[ox + i * s, oy]} b={[ox + i * s, oy + 3 * s]} c="#cbd5e1" w={1} />
          <KLine a={[ox, oy + i * s]} b={[ox + 3 * s, oy + i * s]} c="#cbd5e1" w={1} />
        </g>
      ))}
      {[[[0, 0], [1, 0], [0, 1]], [[2, 0], [3, 0], [3, 1]], [[3, 2], [3, 3], [2, 3]], [[1, 3], [0, 3], [0, 2]]].map((tri, i) => (
        <KPoly key={i} p={(tri as [number, number][]).map(T)} fill="#fecaca" op={0.6} c="#f87171" w={1} dash />
      ))}
      <KPoly p={oct} fill="#e0e7ff" op={0.8} c={K_EDGE} w={2} />
      <KText p={[ox + 1.5 * s, oy - 10]} t="1" c={K_BLUE} />
      <KText p={[ox + 2.7 * s + 8, oy + 0.3 * s - 6]} t="√2" c={K_RED} />
      <KText p={[ox + 1.5 * s, oy + 3 * s + 16]} t="felülnézet (fedőlap)" s={10.5} c="#334155" normal />
    </Frame>
  );
};

// 2. ábra: a hasáb részei (ferde hasáb)
export const PrismAnatomySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const base: [number, number][] = [[0, 0], [3, 0], [3.8, 2], [1.6, 3.4], [-0.4, 2]];
  const pr = makeProj(80, 245, 30, 0.6, 30);
  const { verts, faces } = kPrism(base, 4, [1.6, 0.4]);
  const top = pr(verts[5]);
  const foot = pr([verts[5][0], 0, verts[5][2]]);
  return (
    <Frame title="A hasáb részei" className={className}>
      <KSolid verts={verts} faces={faces} proj={pr} shade={[1]} />
      <KLine a={top} b={foot} c={K_PURPLE} w={1.8} dash />
      <KRight v={foot} p1={top} p2={pr([verts[5][0] + 2, 0, verts[5][2]])} r={10} c={K_PURPLE} />
      <KText p={[foot[0] - 8, (top[1] + foot[1]) / 2]} t="M" c={K_PURPLE} a="end" />
      <KLine a={pr(verts[1])} b={pr(verts[6])} c={K_RED} w={2.6} />
      <KLine a={pr(verts[0])} b={pr(verts[1])} c={K_GREEN} w={2.6} />
      <text x="340" y="70" fontSize="12" fontWeight="bold" fill="#4338ca">fedőlap (kék)</text>
      <text x="340" y="96" fontSize="12" fontWeight="bold" fill={K_RED}>oldalél</text>
      <text x="340" y="122" fontSize="12" fontWeight="bold" fill="#334155">oldallap:</text><text x="340" y="136" fontSize="11" fill="#334155">paralelogramma</text>
      <text x="340" y="160" fontSize="12" fontWeight="bold" fill={K_GREEN}>alapél</text>
      <text x="340" y="184" fontSize="12" fontWeight="bold" fill={K_PURPLE}>M: testmagasság</text>
      <text x="340" y="214" fontSize="11" fill="#334155">ferde hasáb: M kisebb,</text>
      <text x="340" y="230" fontSize="11" fill="#334155">mint az oldalél</text>
    </Frame>
  );
};

// 3. ábra: hasábtípusok
export const PrismTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const p1 = makeProj(30, 230, 26, 0.6, 30);
  const p2 = makeProj(190, 230, 26, 0.6, 30);
  const p3 = makeProj(345, 230, 26, 0.6, 30);
  const ferde = kPrism([[0, 0], [3, 0], [3.4, 2.4], [0.4, 2.4]], 4, [1.4, 0]);
  const egyenes = kPrism([[0, 0], [3.2, 0], [1.2, 2.6]], 4.4);
  const negyzetes = kPrism([[0, 0], [2.4, 0], [2.4, 2.4], [0, 2.4]], 4.8);
  return (
    <Frame title="Ferde hasáb, egyenes hasáb, négyzetes oszlop" className={className}>
      <KSolid verts={ferde.verts} faces={ferde.faces} proj={p1} shade={[0]} />
      <KSolid verts={egyenes.verts} faces={egyenes.faces} proj={p2} shade={[0]} />
      <KSolid verts={negyzetes.verts} faces={negyzetes.faces} proj={p3} shade={[0]} />
      <KRight v={p2([3.2, 0, 0])} p1={p2([3.2, 4.4, 0])} p2={p2([0, 0, 0])} r={10} />
      <KText p={[p3([1.2, 0, 0])[0], p3([1.2, 0, 0])[1] + 13]} t="a" c={K_BLUE} />
      <KText p={[p3([2.4, 0, 1.2])[0] + 12, p3([2.4, 0, 1.2])[1] + 4]} t="a" c={K_BLUE} />
      <text x="100" y="270" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">ferde hasáb</text>
      <text x="100" y="286" fontSize="10.5" textAnchor="middle" fill="#64748b">oldallapok: paralelogrammák</text>
      <text x="250" y="270" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">egyenes hasáb</text>
      <text x="250" y="286" fontSize="10.5" textAnchor="middle" fill="#64748b">oldallapok: téglalapok</text>
      <text x="395" y="270" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">négyzetes oszlop</text>
      <text x="395" y="286" fontSize="10.5" textAnchor="middle" fill="#64748b">négyzet alapú egyenes hasáb</text>
    </Frame>
  );
};

// 4. ábra: a szabályos hatszög alapú hasáb testátlói
export const HexPrismDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const base = kRegular(6, 4, 0, 4, 4);
  const pr = makeProj(50, 250, 20, 0.6, 30);
  const { verts, faces } = kPrism(base, 5);
  const A = pr(verts[3]);
  const T1 = pr(verts[6 + 1]);
  const T0 = pr(verts[6 + 0]);
  return (
    <Frame title="Merevítő rudak a hatszög alapú hasáb testátlói mentén" className={className}>
      <KSolid verts={verts} faces={faces} proj={pr} shade={[1]} />
      <KLine a={A} b={T1} c={K_GREEN} w={2.4} />
      <KLine a={A} b={T0} c={K_RED} w={2.6} />
      <KLine a={A} b={pr(verts[1])} c={K_GREEN} w={1.4} dash />
      <KLine a={A} b={pr(verts[0])} c={K_RED} w={1.4} dash />
      <KText p={[kMid(pr(verts[3]), pr(verts[4]))[0] - 6, kMid(pr(verts[3]), pr(verts[4]))[1] + 13]} t="a = 4 m" s={10.5} c={K_BLUE} />
      <KText p={[pr(verts[3])[0] - 18, (pr(verts[3])[1] + pr(verts[9])[1]) / 2]} t="M = 5 m" s={10.5} c={K_BLUE} a="end" />
      <text x="320" y="80" fontSize="12" fill="#334155">rövidebb alapátló: 4√3</text>
      <text x="320" y="100" fontSize="12.5" fontWeight="bold" fill={K_GREEN}>√73 ≈ 8,54 m</text>
      <text x="320" y="140" fontSize="12" fill="#334155">hosszabb alapátló: 8</text>
      <text x="320" y="160" fontSize="12.5" fontWeight="bold" fill={K_RED}>√89 ≈ 9,43 m</text>
      <text x="320" y="200" fontSize="11.5" fill="#334155">18 testátló: 12 rövidebb,</text>
      <text x="320" y="216" fontSize="11.5" fill="#334155">6 hosszabb</text>
    </Frame>
  );
};

// 5. ábra: szabályos háromszög alapú hirdetőoszlop, két oszlop összeillesztve
export const TriPrismBillboardSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const h = 45 * Math.sqrt(3);
  const L = 300;
  const tri: P3[] = [[0, 0, 0], [90, 0, 0], [45, h, 0]];
  const v1: P3[] = [...tri, ...tri.map((p) => [p[0], p[1], L] as P3)];
  const f1 = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
  const pr1 = makeProj(30, 240, 0.85, 0.5, 35);
  const rh: P3[] = [[0, 0, 0], [90, 0, 0], [135, h, 0], [45, h, 0]];
  const v2: P3[] = [...rh, ...rh.map((p) => [p[0], p[1], L] as P3)];
  const f2 = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
  const pr2 = makeProj(238, 240, 0.85, 0.5, 35);
  const top1 = pr1([45, h, 0]);
  const foot1 = pr1([45, 0, 0]);
  return (
    <Frame title="Háromszög alapú hirdetőtábla: 90 cm-es alapél, 300 cm-es oldalél" className={className}>
      <KSolid verts={v1} faces={f1} proj={pr1} shade={[0]} />
      <KLine a={top1} b={foot1} c={K_PURPLE} w={1.8} dash />
      <KRight v={foot1} p1={top1} p2={pr1([90, 0, 0])} r={9} c={K_PURPLE} />
      <KText p={[foot1[0] - 10, (top1[1] + foot1[1]) / 2]} t="m" c={K_PURPLE} a="end" />
      <KText p={[pr1([45, 0, 0])[0], pr1([45, 0, 0])[1] + 13]} t="90" s={10.5} c={K_BLUE} />
      <KText p={[kMid(pr1([90, 0, 0]), pr1([90, 0, L]))[0] + 14, kMid(pr1([90, 0, 0]), pr1([90, 0, L]))[1] + 4]} t="300" s={10.5} c={K_BLUE} />
      <KSolid verts={v2} faces={f2} proj={pr2} shade={[0]} />
      <KLine a={pr2(v2[0])} b={pr2(v2[6])} c={K_RED} w={2.6} />
      <KText p={[kMid(pr2(v2[0]), pr2(v2[6]))[0] + 4, kMid(pr2(v2[0]), pr2(v2[6]))[1] - 12]} t="d" c={K_RED} />
      <text x="240" y="276" fontSize="11.5" textAnchor="middle" fill="#334155">
        Két oszlop oldallapjuk mentén összeillesztve: rombusz alapú (60°-os) egyenes hasáb
      </text>
    </Frame>
  );
};
