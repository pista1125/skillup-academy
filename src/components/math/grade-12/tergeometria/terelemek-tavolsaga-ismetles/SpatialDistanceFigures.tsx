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
  kBoxVerts,
  K_BOX_FACES,
  K_BOX_LABELS,
  kMid,
  kLerp,
  K_RED,
  K_BLUE,
  K_GREEN,
  K_HID,
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

const Sail: React.FC<{ p: P2 }> = ({ p }) => (
  <g>
    <path d={`M ${p[0] - 9} ${p[1]} L ${p[0] + 9} ${p[1]} L ${p[0] + 6} ${p[1] + 4} L ${p[0] - 6} ${p[1] + 4} Z`} fill="#92400e" />
    <path d={`M ${p[0]} ${p[1] - 1} L ${p[0]} ${p[1] - 20} L ${p[0] + 10} ${p[1] - 3} Z`} fill="#fde68a" stroke="#b45309" strokeWidth="1" />
  </g>
);

// 1. ábra: négy hajó, bármely kettő 40 m-re – szabályos tetraéder
export const ShipsTetrahedronSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pr = makeProj(150, 165, 3, 0.55, 28);
  const A: P3 = [0, 0, 0];
  const B: P3 = [40, 0, 0];
  const C: P3 = [20, 0, 34.64];
  const top: P3 = [20, 32.66, 11.55];
  const bot: P3 = [20, -32.66, 11.55];
  const [a, b, c, t, d] = [A, B, C, top, bot].map(pr);
  const water = ([[-14, 0, -12], [60, 0, -12], [60, 0, 48], [-14, 0, 48]] as P3[]).map(pr);
  return (
    <Frame title="Négy hajó, bármely kettő 40 m-re van egymástól" className={className}>
      <KPoly p={water} fill="#bae6fd" op={0.55} c="#38bdf8" />
      <KLine a={a} b={b} c={K_BLUE} w={2.2} />
      <KLine a={b} b={c} c={K_BLUE} w={2.2} />
      <KLine a={c} b={a} c={K_BLUE} w={2.2} />
      {[a, b, c].map((p, i) => (
        <KLine key={`u${i}`} a={p} b={t} c={K_RED} w={1.8} />
      ))}
      {[a, b, c].map((p, i) => (
        <KLine key={`d${i}`} a={p} b={d} c={K_PURPLE} w={1.3} dash />
      ))}
      <KText p={[kMid(a, b)[0], kMid(a, b)[1] + 14]} t="40 m" c={K_BLUE} />
      <KText p={[kMid(b, c)[0] + 22, kMid(b, c)[1]]} t="40 m" c={K_BLUE} />
      <KText p={[kMid(a, t)[0] - 22, kMid(a, t)[1]]} t="40 m" c={K_RED} />
      <Sail p={a} />
      <Sail p={b} />
      <Sail p={c} />
      <ellipse cx={t[0]} cy={t[1] - 8} rx="22" ry="9" fill="#fecaca" stroke={K_RED} strokeWidth="1.5" />
      <rect x={d[0] - 16} y={d[1] - 5} width="32" height="11" rx="5" fill="#ddd6fe" stroke={K_PURPLE} strokeWidth="1.5" />
      <text x="318" y="80" fontSize="12.5" fontWeight="bold" fill={K_RED}>léghajó: a víz fölött</text>
      <text x="318" y="100" fontSize="11" fill="#334155">3 vitorlás: szabályos</text>
      <text x="318" y="116" fontSize="11" fill="#334155">háromszög a vízen</text>
      <text x="318" y="146" fontSize="11" fill="#334155">A 4. jármű nem lehet</text>
      <text x="318" y="162" fontSize="11" fill="#334155">a síkban: szabályos</text>
      <text x="318" y="178" fontSize="11" fill="#334155">tetraéder 4. csúcsa.</text>
      <text x="318" y="250" fontSize="12.5" fontWeight="bold" fill={K_PURPLE}>tengeralattjáró:</text>
      <text x="318" y="268" fontSize="12.5" fontWeight="bold" fill={K_PURPLE}>a víz alatt</text>
    </Frame>
  );
};

// 2. ábra: a pók legrövidebb útja a levegőben – az EC testátló
export const SpiderBoxSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pr = makeProj(120, 255, 46, 0.55, 35);
  const V = kBoxVerts(2, 4, 2.5);
  const P = V.map(pr);
  const [A, B, C, , E] = [P[0], P[1], P[2], P[3], P[4]];
  return (
    <Frame title="A pók útja a levegőben: az EC testátló" className={className}>
      <KPoly p={[A, C, E]} fill="#fee2e2" op={0.7} />
      <KSolid verts={V} faces={K_BOX_FACES} proj={pr} labels={K_BOX_LABELS} />
      <KLine a={A} b={C} c={K_GREEN} w={2} dash />
      <KLine a={E} b={C} c={K_RED} w={2.6} />
      <KRight v={A} p1={E} p2={C} r={13} />
      <KRight v={B} p1={A} p2={C} r={10} />
      <KText p={[kMid(A, B)[0], kMid(A, B)[1] + 13]} t="2" />
      <KText p={[kMid(B, C)[0] + 12, kMid(B, C)[1] + 8]} t="4" />
      <KText p={[kMid(A, E)[0] - 16, kMid(A, E)[1]]} t="2,5" />
      <KText p={[kMid(E, C)[0] + 12, kMid(E, C)[1] - 10]} t="e" c={K_RED} />
      <text x="318" y="90" fontSize="12" fill="#334155">Az ABC háromszögből:</text>
      <text x="318" y="108" fontSize="12.5" fontWeight="bold" fill={K_GREEN}>AC² = AB² + BC²</text>
      <text x="318" y="140" fontSize="12" fill="#334155">Az ACE háromszögből:</text>
      <text x="318" y="158" fontSize="12.5" fontWeight="bold" fill={K_RED}>EC² = EA² + AC²</text>
      <text x="318" y="196" fontSize="12.5" fontWeight="bold" fill="#0f172a">EC = √(2,5² + 2² + 4²)</text>
      <text x="318" y="216" fontSize="12.5" fontWeight="bold" fill="#0f172a">= √26,25 ≈ 5,12 m</text>
    </Frame>
  );
};

/** Kiterített téglalap átlóval. */
const Net: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fold: 'h' | 'v';
  foldAt: number;
  corners: [string, string, string, string];
  foldLbl: [string, string];
  start: 'bl' | 'tl';
  dims: { p: P2; t: string }[];
  title: string;
  result: string;
  best?: boolean;
}> = ({ x, y, w, h, fold, foldAt, corners, foldLbl, start, dims, title, result, best }) => {
  const tl: P2 = [x, y];
  const tr: P2 = [x + w, y];
  const br: P2 = [x + w, y + h];
  const bl: P2 = [x, y + h];
  const s = start === 'bl' ? bl : tl;
  const e = start === 'bl' ? tr : br;
  const f1: P2 = fold === 'h' ? [x, y + foldAt] : [x + foldAt, y];
  const f2: P2 = fold === 'h' ? [x + w, y + foldAt] : [x + foldAt, y + h];
  const cx = x + w / 2;
  return (
    <g>
      <text x={cx} y={y - 26} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
      <KPoly p={[tl, tr, br, bl]} fill={best ? '#dcfce7' : '#eef2ff'} c={K_EDGE} w={1.8} />
      <KLine a={f1} b={f2} c={K_HID} w={1.3} dash />
      <KLine a={s} b={e} c={K_RED} w={2.4} />
      <KText p={[tl[0] - 8, tl[1] - 7]} t={corners[0]} s={10.5} />
      <KText p={[tr[0] + 8, tr[1] - 7]} t={corners[1]} s={10.5} />
      <KText p={[br[0] + 8, br[1] + 8]} t={corners[2]} s={10.5} />
      <KText p={[bl[0] - 8, bl[1] + 8]} t={corners[3]} s={10.5} />
      <KText p={fold === 'h' ? [f1[0] - 9, f1[1]] : [f1[0], f1[1] - 8]} t={foldLbl[0]} s={10} c="#64748b" />
      <KText p={fold === 'h' ? [f2[0] + 9, f2[1]] : [f2[0], f2[1] + 9]} t={foldLbl[1]} s={10} c="#64748b" />
      {dims.map((d, i) => (
        <KText key={i} p={d.p} t={d.t} s={10} c="#1d4ed8" />
      ))}
      <text x={cx} y={282} fontSize="11.5" fontWeight="bold" textAnchor="middle" fill={best ? '#15803d' : '#0f172a'}>
        {result}
      </text>
    </g>
  );
};

// 3. ábra: a pók útja a falakon – a három kiterítés
export const SpiderNetsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 26;
  return (
    <Frame title="A pók útja a falakon: három lehetséges kiterítés" className={className}>
      {/* I. a HG élen át: 2 × (4 + 2,5) */}
      <Net
        x={60}
        y={70}
        w={2 * s}
        h={6.5 * s}
        fold="h"
        foldAt={2.5 * s}
        corners={['D', 'C', 'F', 'E']}
        foldLbl={['H', 'G']}
        start="bl"
        dims={[
          { p: [60 + s, 70 + 6.5 * s + 10], t: '2' },
          { p: [60 + 2 * s + 12, 70 + 4.5 * s], t: '4' },
          { p: [60 + 2 * s + 16, 70 + 1.25 * s], t: '2,5' }
        ]}
        title="I. a HG élen át"
        result="√46,25 ≈ 6,80 m"
      />
      {/* II. az AD élen át: 4 × (2,5 + 2) */}
      <Net
        x={186}
        y={90}
        w={4 * s}
        h={4.5 * s}
        fold="h"
        foldAt={2.5 * s}
        corners={['E', 'H', 'C', 'B']}
        foldLbl={['A', 'D']}
        start="tl"
        dims={[
          { p: [186 + 2 * s, 80], t: '4' },
          { p: [186 + 4 * s + 18, 90 + 1.25 * s], t: '2,5' },
          { p: [186 + 4 * s + 14, 90 + 3.5 * s], t: '2' }
        ]}
        title="II. az AD élen át"
        result="√36,25 ≈ 6,02 m ✓"
        best
      />
      {/* III. a HD élen át: (4 + 2) × 2,5 */}
      <Net
        x={340}
        y={130}
        w={6 * s * 0.8}
        h={2.5 * s * 0.8}
        fold="v"
        foldAt={4 * s * 0.8}
        corners={['E', 'G', 'C', 'A']}
        foldLbl={['H', 'D']}
        start="tl"
        dims={[
          { p: [340 + 2 * s * 0.8, 130 + 2.5 * s * 0.8 + 12], t: '4' },
          { p: [340 + 5 * s * 0.8, 130 + 2.5 * s * 0.8 + 12], t: '2' },
          { p: [332, 130 + 1.25 * s * 0.8], t: '2,5' }
        ]}
        title="III. a HD élen át"
        result="√42,25 = 6,5 m"
      />
    </Frame>
  );
};

// 4. ábra: távolságtípusok – merőleges szakasz
export const DistanceTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // a) pont–egyenes
  const P1: P2 = [85, 90];
  const F1: P2 = [85, 190];
  // b) pont–sík
  const plane2: P2[] = [[175, 200], [295, 200], [325, 160], [205, 160]];
  const P2p: P2 = [250, 82];
  const F2: P2 = [250, 180];
  // c) párhuzamos síkok
  const up: P2[] = [[350, 110], [450, 110], [470, 80], [370, 80]];
  const lo: P2[] = [[350, 210], [450, 210], [470, 180], [370, 180]];
  const Q1: P2 = [415, 95];
  const Q2: P2 = [415, 195];
  return (
    <Frame title="A távolság mindig a merőleges szakasz hossza" className={className}>
      <text x="85" y="54" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">pont és egyenes</text>
      <KLine a={[20, 190]} b={[150, 190]} c={K_BLUE} w={2.2} />
      <KLine a={P1} b={F1} c={K_RED} w={2.2} />
      <KRight v={F1} p1={P1} p2={[150, 190]} r={11} />
      <circle cx={P1[0]} cy={P1[1]} r="3.2" fill="#0f172a" />
      <circle cx={F1[0]} cy={F1[1]} r="3.2" fill="#0f172a" />
      <KText p={[P1[0] + 12, P1[1] - 6]} t="P" />
      <KText p={[F1[0] - 10, F1[1] + 13]} t="P′" />
      <KText p={[140, 178]} t="e" c={K_BLUE} />
      <KText p={[P1[0] + 12, 140]} t="d" c={K_RED} />

      <text x="250" y="54" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">pont és sík</text>
      <KPoly p={plane2} fill="#dbeafe" c={K_BLUE} w={1.6} op={0.8} />
      <KLine a={P2p} b={F2} c={K_RED} w={2.2} />
      <KRight v={F2} p1={P2p} p2={[300, 180]} r={11} />
      <circle cx={P2p[0]} cy={P2p[1]} r="3.2" fill="#0f172a" />
      <circle cx={F2[0]} cy={F2[1]} r="3.2" fill="#0f172a" />
      <KText p={[P2p[0] + 12, P2p[1] - 6]} t="P" />
      <KText p={[F2[0] - 12, F2[1] + 10]} t="P′" />
      <KText p={[305, 192]} t="S" c={K_BLUE} />
      <KText p={[P2p[0] + 12, 130]} t="d" c={K_RED} />

      <text x="410" y="54" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">párhuzamos síkok</text>
      <KPoly p={up} fill="#dcfce7" c={K_GREEN} w={1.6} op={0.8} />
      <KPoly p={lo} fill="#dbeafe" c={K_BLUE} w={1.6} op={0.8} />
      <KLine a={Q1} b={Q2} c={K_RED} w={2.2} />
      <KRight v={Q2} p1={Q1} p2={[450, 195]} r={10} />
      <circle cx={Q1[0]} cy={Q1[1]} r="3" fill="#0f172a" />
      <KText p={[338, 95]} t="S₁" c={K_GREEN} />
      <KText p={[338, 195]} t="S₂" c={K_BLUE} />
      <KText p={[427, 150]} t="d" c={K_RED} />
      <text x="240" y="250" fontSize="12" textAnchor="middle" fill="#334155">
        A talppont (P′) a pont merőleges vetülete. Ha a két térelemnek van közös pontja,
      </text>
      <text x="240" y="268" fontSize="12" textAnchor="middle" fill="#334155">
        a távolságuk 0. Két ponthalmaz távolsága a pontjaik távolságainak minimuma.
      </text>
    </Frame>
  );
};

// 5. ábra: a kocka lapátlója és testátlója
export const CubeDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pr = makeProj(80, 250, 36, 0.55, 35);
  const V = kBoxVerts(4, 4, 4);
  const P = V.map(pr);
  const A = P[0];
  const C = P[2];
  const E = P[4];
  return (
    <Frame title="A kocka lapátlója (f) és testátlója (e)" className={className}>
      <KPoly p={[A, C, E]} fill="#fee2e2" op={0.6} />
      <KSolid verts={V} faces={K_BOX_FACES} proj={pr} labels={K_BOX_LABELS} />
      <KLine a={A} b={C} c={K_GREEN} w={2.2} dash />
      <KLine a={E} b={C} c={K_RED} w={2.6} />
      <KRight v={A} p1={E} p2={C} r={13} />
      <KRight v={P[1]} p1={A} p2={C} r={10} />
      <KText p={[kMid(A, P[1])[0], kMid(A, P[1])[1] + 13]} t="a" />
      <KText p={[kMid(A, E)[0] - 12, kMid(A, E)[1]]} t="a" />
      <KText p={[kLerp(A, C, 0.6)[0], kLerp(A, C, 0.6)[1] + 12]} t="f" c={K_GREEN} />
      <KText p={[kLerp(E, C, 0.4)[0] + 4, kLerp(E, C, 0.4)[1] - 12]} t="e" c={K_RED} />
      <text x="314" y="80" fontSize="12" fill="#334155">Az ABC háromszögből:</text>
      <text x="314" y="100" fontSize="13" fontWeight="bold" fill={K_GREEN}>f = √(a² + a²) = a√2</text>
      <text x="314" y="134" fontSize="12" fill="#334155">Az ACE háromszögből:</text>
      <text x="314" y="154" fontSize="13" fontWeight="bold" fill={K_RED}>e = √(f² + a²) = a√3</text>
      <text x="318" y="196" fontSize="12" fill="#334155">Téglatestben (a, b, c):</text>
      <text x="318" y="216" fontSize="13" fontWeight="bold" fill="#0f172a">e = √(a² + b² + c²)</text>
    </Frame>
  );
};
