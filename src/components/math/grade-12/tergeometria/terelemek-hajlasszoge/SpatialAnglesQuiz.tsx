import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SpatialAnglesMatcher } from './SpatialAnglesMatcher';
import { SpatialAnglesSorter } from './SpatialAnglesSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// Derékszög: negyedkörív ponttal; takart élek szaggatottak.
// ---------------------------------------------------------------------------
type FPt = [number, number];
const fR = (n: number) => Math.round(n * 10) / 10;
const fUnit = (p: FPt): FPt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
const F_INK = '#0f172a';
const F_EDGE = '#334155';
const F_RED = '#dc2626';
const F_BLUE = '#2563eb';
const F_GREEN = '#059669';
const F_ARC = '#d97706';
const F_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const QText: React.FC<{ p: FPt; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({ p, t, size = 10, color, anchor = 'middle' }) => (
  <text x={fR(p[0])} y={fR(p[1])} fontSize={size} fontWeight="bold" textAnchor={anchor} dominantBaseline="middle" fill={t.includes('?') ? F_UNK : color ?? F_INK}>
    {t}
  </text>
);

const QSeg: React.FC<{ a: FPt; b: FPt; color?: string; w?: number; dash?: boolean }> = ({ a, b, color = F_EDGE, w = 1.6, dash }) => (
  <line x1={fR(a[0])} y1={fR(a[1])} x2={fR(b[0])} y2={fR(b[1])} stroke={color} strokeWidth={w} strokeDasharray={dash ? '4 3' : undefined} strokeLinecap="round" />
);

const QRight: React.FC<{ v: FPt; p1: FPt; p2: FPt; r?: number }> = ({ v, p1, p2, r = 8 }) => {
  const u1 = fUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = fUnit([p2[0] - v[0], p2[1] - v[1]]);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = fUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path
        d={`M ${fR(v[0] + u1[0] * r)} ${fR(v[1] + u1[1] * r)} A ${r} ${r} 0 0 ${sweep} ${fR(v[0] + u2[0] * r)} ${fR(v[1] + u2[1] * r)}`}
        fill="none"
        stroke={F_INK}
        strokeWidth="1.2"
      />
      <circle cx={fR(v[0] + b[0] * r * 0.55)} cy={fR(v[1] + b[1] * r * 0.55)} r="1.5" fill={F_INK} />
    </g>
  );
};

const QAngle: React.FC<{ v: FPt; p1: FPt; p2: FPt; r?: number; t?: string; tr?: number }> = ({ v, p1, p2, r = 16, t, tr }) => {
  const u1 = fUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = fUnit([p2[0] - v[0], p2[1] - v[1]]);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = fUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  const L = tr ?? r + 8;
  return (
    <g>
      <path
        d={`M ${fR(v[0] + u1[0] * r)} ${fR(v[1] + u1[1] * r)} A ${r} ${r} 0 0 ${sweep} ${fR(v[0] + u2[0] * r)} ${fR(v[1] + u2[1] * r)}`}
        fill="none"
        stroke={F_ARC}
        strokeWidth="1.5"
      />
      {t && <QText p={[v[0] + b[0] * L, v[1] + b[1] * L]} t={t} size={10} color="#b45309" />}
    </g>
  );
};

type BoxP = Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H', FPt>;
const fBox = (x: number, y: number, w: number, h: number, d: number): BoxP => {
  const dx = d * 0.55;
  const dy = -d * 0.42;
  const A: FPt = [x, y];
  const B: FPt = [x + w, y];
  const C: FPt = [x + w + dx, y + dy];
  const D: FPt = [x + dx, y + dy];
  return { A, B, C, D, E: [x, y - h], F: [x + w, y - h], G: [C[0], C[1] - h], H: [D[0], D[1] - h] };
};

/** Téglatest ferde vetületben, csúcsbetűkkel; extra: a kiemelt elemek. */
const BoxFig: React.FC<{ w: number; h: number; d: number; title?: string; extra?: (P: BoxP) => React.ReactNode; dims?: [string?, string?, string?] }> = ({
  w,
  h,
  d,
  title,
  extra,
  dims = []
}) => {
  const x = 120 - (w + d * 0.55) / 2;
  const y = 136;
  const P = fBox(x, y, w, h, d);
  const off: Record<keyof BoxP, FPt> = { A: [-8, 6], B: [6, 7], C: [8, 3], D: [-8, -3], E: [-8, -3], F: [-2, -8], G: [8, -4], H: [-4, -8] };
  return (
    <QFig title={title}>
      <QSeg a={P.A} b={P.D} dash w={1} />
      <QSeg a={P.D} b={P.C} dash w={1} />
      <QSeg a={P.D} b={P.H} dash w={1} />
      {(
        [
          ['A', 'B'],
          ['B', 'C'],
          ['E', 'F'],
          ['F', 'G'],
          ['G', 'H'],
          ['H', 'E'],
          ['A', 'E'],
          ['B', 'F'],
          ['C', 'G']
        ] as [keyof BoxP, keyof BoxP][]
      ).map(([a, b]) => (
        <QSeg key={a + b} a={P[a]} b={P[b]} />
      ))}
      {extra && extra(P)}
      {(Object.keys(P) as (keyof BoxP)[]).map((k) => (
        <QText key={k} p={[P[k][0] + off[k][0], P[k][1] + off[k][1]]} t={k} size={9.5} />
      ))}
      {dims[0] && <QText p={[(P.A[0] + P.B[0]) / 2, P.A[1] + 8]} t={dims[0]} size={9} />}
      {dims[1] && <QText p={[(P.B[0] + P.C[0]) / 2 + 9, (P.B[1] + P.C[1]) / 2 + 5]} t={dims[1]} size={9} anchor="start" />}
      {dims[2] && <QText p={[P.A[0] - 6, (P.A[1] + P.E[1]) / 2]} t={dims[2]} size={9} anchor="end" />}
    </QFig>
  );
};

// --- konkrét ábrák ---
const FIG_CRATE_DIAG = (
  <BoxFig
    w={130}
    h={30}
    d={40}
    title="Láda: 30 × 6 × 5 cm"
    dims={['30', '6', '5']}
    extra={(P) => <QSeg a={P.A} b={P.G} color={F_RED} w={2.2} />}
  />
);

const FIG_CRATE_BASE = (
  <BoxFig
    w={130}
    h={30}
    d={40}
    title="AG és az ABCD lap szöge"
    dims={['30', '6', '5']}
    extra={(P) => (
      <g>
        <QSeg a={P.A} b={P.C} color={F_GREEN} w={1.8} dash />
        <QSeg a={P.A} b={P.G} color={F_RED} w={2.2} />
        <QSeg a={P.C} b={P.G} color={F_BLUE} w={2} />
        <QAngle v={P.A} p1={P.C} p2={P.G} r={34} t="β = ?" tr={52} />
      </g>
    )}
  />
);

const FIG_CRATE_TWO = (
  <BoxFig
    w={130}
    h={30}
    d={40}
    title="AG és HB testátló szöge"
    dims={['30', '6', '5']}
    extra={(P) => {
      const K: FPt = [(P.A[0] + P.G[0]) / 2, (P.A[1] + P.G[1]) / 2];
      return (
        <g>
          <QSeg a={P.A} b={P.G} color={F_RED} w={2} />
          <QSeg a={P.H} b={P.B} color={F_BLUE} w={2} />
          <QAngle v={K} p1={P.A} p2={P.H} r={12} t="α = ?" tr={26} />
        </g>
      );
    }}
  />
);

const FIG_CUBE_AG_FACE = (
  <BoxFig
    w={70}
    h={70}
    d={70}
    title="6 cm élű kocka: AG és a BCGF sík"
    extra={(P) => (
      <g>
        <polygon points={[P.B, P.C, P.G, P.F].map((p) => p.join(',')).join(' ')} fill="rgba(16,185,129,0.15)" />
        <QSeg a={P.A} b={P.G} color={F_RED} w={2} />
        <QSeg a={P.B} b={P.G} color={F_GREEN} w={1.8} dash />
        <QRight v={P.B} p1={P.A} p2={P.G} r={7} />
        <QAngle v={P.G} p1={P.A} p2={P.B} r={22} t="α" tr={32} />
      </g>
    )}
  />
);

const FIG_CUBE_BDG = (
  <BoxFig
    w={70}
    h={70}
    d={70}
    title="A BDG sík és az alaplap"
    extra={(P) => {
      const O: FPt = [(P.B[0] + P.D[0]) / 2, (P.B[1] + P.D[1]) / 2];
      return (
        <g>
          <polygon points={[P.B, P.D, P.G].map((p) => p.join(',')).join(' ')} fill="rgba(245,158,11,0.25)" stroke={F_ARC} strokeWidth="1.2" />
          <QSeg a={P.B} b={P.D} color={F_INK} w={1.4} dash />
          <QSeg a={O} b={P.C} color={F_GREEN} w={1.6} dash />
          <QSeg a={O} b={P.G} color={F_RED} w={1.8} />
          <QAngle v={O} p1={P.C} p2={P.G} r={14} t="β = ?" tr={28} />
          <QText p={[O[0] - 4, O[1] + 8]} t="O" size={9} />
        </g>
      );
    }}
  />
);

const FIG_PRISM_PLANE = (
  <BoxFig
    w={46}
    h={86}
    d={46}
    title="Négyzetes oszlop 5 × 5 × 9: ABGH sík"
    dims={['5', '5', '9']}
    extra={(P) => (
      <g>
        <polygon points={[P.A, P.B, P.G, P.H].map((p) => p.join(',')).join(' ')} fill="rgba(124,58,237,0.18)" stroke="#7c3aed" strokeWidth="1.2" />
        <QSeg a={P.B} b={P.G} color={F_RED} w={1.8} />
        <QAngle v={P.B} p1={P.C} p2={P.G} r={14} t="φ = ?" tr={30} />
      </g>
    )}
  />
);

const FIG_PRISM_ACGE = (
  <BoxFig
    w={46}
    h={86}
    d={46}
    title="Négyzetes oszlop 5 × 5 × 9: ACGE"
    dims={['5', '5', '9']}
    extra={(P) => (
      <g>
        <polygon points={[P.A, P.C, P.G, P.E].map((p) => p.join(',')).join(' ')} fill="rgba(37,99,235,0.18)" stroke={F_BLUE} strokeWidth="1.2" />
        <QText p={[205, 70]} t="T = ?" size={11} />
      </g>
    )}
  />
);

const FIG_HF1 = (
  <BoxFig
    w={70}
    h={80}
    d={46}
    title="Téglatest 5,18 × 3,75 × 9,92 cm"
    dims={['5,18', '3,75', '9,92']}
    extra={(P) => (
      <g>
        <QSeg a={P.A} b={P.C} color={F_GREEN} w={1.6} dash />
        <QSeg a={P.A} b={P.G} color={F_RED} w={2} />
        <QAngle v={P.A} p1={P.C} p2={P.G} r={22} t="α = ?" tr={36} />
      </g>
    )}
  />
);

const FIG_HF2 = (
  <BoxFig
    w={70}
    h={50}
    d={70}
    title="a = 10 cm, m = 7 cm; K a fedőlap közepe"
    extra={(P) => {
      const K: FPt = [(P.E[0] + P.G[0]) / 2, (P.E[1] + P.G[1]) / 2];
      return (
        <g>
          <QSeg a={P.A} b={K} color={F_RED} w={2} />
          <circle cx={fR(K[0])} cy={fR(K[1])} r="2" fill={F_INK} />
          <QText p={[K[0] + 6, K[1] - 6]} t="K" size={9.5} />
          <QText p={[205, 75]} t="AK = ?" size={11} />
        </g>
      );
    }}
  />
);

const FIG_LINE_PLANE = (
  <QFig title="10 m-es rúd, árnyéka a talajon 8 m">
    <polygon points="20,125 170,125 220,95 70,95" fill="rgba(16,185,129,0.12)" stroke={F_GREEN} strokeWidth="1.2" />
    <QSeg a={[50, 112]} b={[150, 112]} color={F_GREEN} w={2} dash />
    <QSeg a={[50, 112]} b={[150, 37]} color={F_RED} w={2.4} />
    <QSeg a={[150, 37]} b={[150, 112]} color={F_BLUE} w={1.3} dash />
    <QRight v={[150, 112]} p1={[150, 37]} p2={[50, 112]} r={8} />
    <QAngle v={[50, 112]} p1={[150, 112]} p2={[150, 37]} r={26} t="α = ?" tr={42} />
    <QText p={[92, 66]} t="10" size={10} color={F_RED} />
    <QText p={[100, 120]} t="8" size={10} color={F_GREEN} />
  </QFig>
);

const FIG_HEX = (
  <QFig title="Szabályos hatszög alapú hasáb">
    {(() => {
      const cx = 110;
      const base = 128;
      const top = 38;
      const r = 48;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const t = (Math.PI / 3) * i;
        return [cx + r * Math.cos(t), r * 0.32 * Math.sin(t)] as FPt;
      });
      const at = (p: FPt, y: number): FPt => [p[0], y + p[1]];
      return (
        <g>
          {pts.map((p, i) => {
            const q = pts[(i + 1) % 6];
            const back = p[1] < 0 || q[1] < 0;
            return (
              <g key={i}>
                <QSeg a={at(p, base)} b={at(q, base)} dash={back && !(p[1] >= 0 || q[1] >= 0) ? true : back} w={back ? 1 : 1.6} />
                <QSeg a={at(p, top)} b={at(q, top)} />
              </g>
            );
          })}
          {pts.map((p, i) => (
            <QSeg key={`v${i}`} a={at(p, base)} b={at(p, top)} dash={p[1] < -0.1} w={p[1] < -0.1 ? 1 : 1.6} />
          ))}
          <QSeg a={at(pts[3], base)} b={at(pts[0], top)} color={F_RED} w={2.2} />
          <QSeg a={at(pts[3], base)} b={at(pts[0], base)} color={F_GREEN} w={1.6} dash />
          <QAngle v={at(pts[3], base)} p1={at(pts[0], base)} p2={at(pts[0], top)} r={22} t="60°" tr={36} />
          <QText p={[150, 70]} t="14" size={10} color={F_RED} />
          <QText p={[205, 60]} t="a = ?" size={11} />
          <QText p={[205, 80]} t="m = ?" size={11} />
        </g>
      );
    })()}
  </QFig>
);

const FIG_TWO_LINES = (
  <QFig title="Két metsző egyenes">
    <QSeg a={[30, 80]} b={[210, 80]} color={F_BLUE} w={2} />
    <QSeg a={[60, 130]} b={[180, 30]} color={F_RED} w={2} />
    <QAngle v={[120, 80]} p1={[30, 80]} p2={[60, 130]} r={18} t="140°" tr={34} />
    <QText p={[200, 70]} t="e" size={10.5} color={F_BLUE} />
    <QText p={[186, 26]} t="f" size={10.5} color={F_RED} />
    <QText p={[180, 120]} t="hajlásszög = ?" size={10} />
  </QFig>
);

const SPATIAL_ANGLES_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sa-q1',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Legfeljebb mekkora lehet két egyenes hajlásszöge?',
    options: ['90°', '180°', '45°', '360°'],
    correctAnswer: 0,
    explanation: 'A hajlásszög a keletkező szögek közül a nem nagyobbik, ezért 0° és 90° közé esik.'
  },
  {
    id: 'sa-q2',
    questionTypeBadge: 'Két egyenes',
    figure: FIG_TWO_LINES,
    level: 1,
    question: 'Két metsző egyenes egyik szöge 140°. Mekkora a hajlásszögük?',
    options: ['40°', '140°', '50°', '70°'],
    correctAnswer: 0,
    explanation: 'A metsző egyenesek két-két egyenlő szöget alkotnak: 140° és 180° − 140° = 40°. A nem nagyobbik a hajlásszög: 40°.'
  },
  {
    id: 'sa-q3',
    questionTypeBadge: 'Párhuzamos',
    level: 1,
    question: 'Mekkora két párhuzamos sík hajlásszöge?',
    options: ['0°', '90°', '180°', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'A tankönyv definíciója szerint párhuzamos síkok szöge 0° (ugyanígy párhuzamos egyeneseké és a síkkal párhuzamos egyenesé is).'
  },
  {
    id: 'sa-q4',
    questionTypeBadge: 'Egyenes és sík',
    level: 1,
    question: 'Hogyan értelmezzük egy (a síkra nem merőleges) egyenes és egy sík hajlásszögét?',
    options: [
      'Az egyenes és a síkra eső merőleges vetületének szögeként',
      'Az egyenes és a sík tetszőleges egyenesének szögeként',
      'A sík normálisa és az egyenes szögeként',
      'Mindig 90°-nak tekintjük'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenes és a sík hajlásszöge az egyenesnek és a síkra eső merőleges vetületének a hajlásszöge.'
  },
  {
    id: 'sa-q5',
    questionTypeBadge: 'Merőlegesség',
    level: 1,
    question: 'Mi az elégséges feltétele annak, hogy egy egyenes merőleges legyen egy síkra?',
    options: [
      'Merőleges a döféspontján átmenő két (nem párhuzamos) síkbeli egyenesre',
      'Merőleges a sík egyetlen egyenesére',
      'Párhuzamos a sík egy egyenesével',
      'A síkkal nincs közös pontja'
    ],
    correctAnswer: 0,
    explanation: 'Elég, ha az egyenes merőleges a sík és az egyenes metszéspontján átmenő, a síkban lévő két egyenesre.'
  },
  {
    id: 'sa-q6',
    questionTypeBadge: 'Testátló',
    figure: FIG_CRATE_DIAG,
    level: 1,
    question: 'Milyen hosszú a 30 cm × 6 cm × 5 cm-es téglatest alakú láda testátlója?',
    options: ['31 cm', '41 cm', '√936 ≈ 30,6 cm', '√61 ≈ 7,8 cm'],
    correctAnswer: 0,
    explanation: 'e² = 5² + 6² + 30² = 25 + 36 + 900 = 961 ⇒ e = 31 cm, így a 31 cm-es pálca pontosan elfér a testátló mentén.'
  },
  {
    id: 'sa-q7',
    questionTypeBadge: 'Két sík',
    level: 1,
    question: 'Két metsző sík hajlásszögének meghatározásakor melyik két egyenes szögét mérjük?',
    options: [
      'A metszésvonal egy pontjában a metszésvonalra merőlegesen, a két síkban állított egyenesekét',
      'A két sík tetszőleges egy-egy egyenesének szögét',
      'A metszésvonal és az egyik sík egy egyenesének szögét',
      'A két sík egy-egy, egymással párhuzamos egyenesének szögét'
    ],
    correctAnswer: 0,
    explanation: 'A metszésvonal tetszőleges pontjában mindkét síkban merőlegest állítunk a metszésvonalra; ezek szöge a két sík hajlásszöge.'
  },
  {
    id: 'sa-q8',
    questionTypeBadge: 'Kocka',
    level: 1,
    question: 'Mekkora szöget zár be egy kocka egyik lapátlója a lap egyik élével?',
    options: ['45°', '30°', '60°', '35,3°'],
    correctAnswer: 0,
    explanation: 'A négyzet átlója a szögfelező, ezért az oldallal 45°-ot zár be.'
  },
  {
    id: 'sa-q9',
    questionTypeBadge: 'Egyenes és sík',
    figure: FIG_LINE_PLANE,
    level: 1,
    question: 'Egy 10 m-es rúd ferdén áll; merőleges vetülete (árnyéka) a vízszintes talajon 8 m. Mekkora szöget zár be a rúd a talajjal?',
    options: ['≈ 36,9°', '≈ 53,1°', '≈ 38,7°', '≈ 51,3°'],
    correctAnswer: 0,
    explanation: 'cos α = vetület / szakasz = 8 / 10 = 0,8 ⇒ α ≈ 36,9°. (53,1° a rúd és a függőleges szöge.)'
  },
  {
    id: 'sa-q10',
    questionTypeBadge: 'Kocka',
    level: 1,
    question: 'Mekkora szöget zár be egy kocka oldaléle (pl. AE) az alaplap síkjával?',
    options: ['90°', '45°', '0°', '35,3°'],
    correctAnswer: 0,
    explanation: 'Az AE él merőleges az ABCD lap két metsző élére (AB, AD), így merőleges a lap síkjára: 90°.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sa-q11',
    questionTypeBadge: 'Testátló és lap',
    figure: FIG_CRATE_BASE,
    level: 2,
    question: 'A 30 × 6 × 5 cm-es ládában (magasság 5 cm) az AG testátló mekkora szöget zár be a legnagyobb (ABCD) lappal?',
    options: ['≈ 9,3°', '≈ 14,6°', '≈ 80,7°', '≈ 9,5°'],
    correctAnswer: 0,
    explanation: 'A GAC háromszög C-nél derékszögű: sin β = CG / AG = 5 / 31 ≈ 0,1613 ⇒ β ≈ 9,3°. (14,6° az AG és az AB él szöge.)'
  },
  {
    id: 'sa-q12',
    questionTypeBadge: 'Két testátló',
    figure: FIG_CRATE_TWO,
    level: 2,
    question: 'Mekkora szöget zár be a 30 × 6 × 5 cm-es láda AG és HB testátlója? (AH = √61 ≈ 7,81 cm)',
    options: ['≈ 29,2°', '≈ 14,6°', '≈ 150,8°', '≈ 9,3°'],
    correctAnswer: 0,
    explanation: 'A testátlók felezik egymást: HK = AK = 15,5 cm. A HAK egyenlő szárú háromszögben sin(α/2) = 3,905 / 15,5 ≈ 0,2519 ⇒ α/2 ≈ 14,6° ⇒ α ≈ 29,2°.',
    breakdown: ['AH = √(5² + 6²) = √61 ≈ 7,81 cm', 'HP = AH/2 ≈ 3,905 cm, HK = 15,5 cm', 'sin(α/2) ≈ 0,2519 ⇒ α/2 ≈ 14,6°', 'α ≈ 29,2°']
  },
  {
    id: 'sa-q13',
    questionTypeBadge: 'Kocka',
    figure: FIG_CUBE_AG_FACE,
    level: 2,
    question: 'A 6 cm élű ABCDEFGH kockában mekkora az AG egyenes és a BCGF sík hajlásszöge?',
    options: ['≈ 35,3°', '45°', '≈ 54,7°', '≈ 70,5°'],
    correctAnswer: 0,
    explanation: 'AG vetülete a BCGF síkon BG (mert AB ⟂ BCGF). Az ABG háromszög B-nél derékszögű: tg α = AB / BG = 6 / (6√2) = 1/√2 ⇒ α ≈ 35,3°.'
  },
  {
    id: 'sa-q14',
    questionTypeBadge: 'Két sík',
    figure: FIG_CUBE_BDG,
    level: 2,
    question: 'A 6 cm élű kockában mekkora a BDG sík és az ABCD alaplap hajlásszöge?',
    options: ['≈ 54,7°', '45°', '≈ 35,3°', '60°'],
    correctAnswer: 0,
    explanation: 'A metszésvonal BD. A BD felezőpontjából (O) a két síkban merőleges: OC és OG. tg β = CG / OC = 6 / (3√2) = √2 ⇒ β ≈ 54,7°.'
  },
  {
    id: 'sa-q15',
    questionTypeBadge: 'Két sík',
    figure: FIG_PRISM_PLANE,
    level: 2,
    question: 'Az 5 cm alapélű, 9 cm magas ABCDEFGH négyzetes oszlopban mekkora szöget zár be az ABGH sík az alaplappal?',
    options: ['≈ 60,9°', '≈ 29,1°', '≈ 51,8°', '≈ 56,3°'],
    correctAnswer: 0,
    explanation: 'A metszésvonal AB. AB-re merőleges az alaplapban BC, az ABGH síkban BG. tg φ = CG / BC = 9 / 5 ⇒ φ ≈ 60,9°. (51,8° az AG testátló és az alaplap szöge.)'
  },
  {
    id: 'sa-q16',
    questionTypeBadge: 'Síkmetszet területe',
    figure: FIG_PRISM_ACGE,
    level: 2,
    question: 'Mekkora az 5 cm alapélű, 9 cm magas négyzetes oszlop ACGE átlós metszetének területe?',
    options: ['45√2 ≈ 63,64 cm²', '45 cm²', '5√106 ≈ 51,48 cm²', '90 cm²'],
    correctAnswer: 0,
    explanation: 'ACGE téglalap: AC = 5√2 ≈ 7,07 cm, AE = 9 cm, a terület 45√2 ≈ 63,64 cm². (51,48 cm² az ABGH téglalap területe.)'
  },
  {
    id: 'sa-q17',
    questionTypeBadge: 'Két sík',
    level: 2,
    question: 'Az 5 × 5 × 9 cm-es négyzetes oszlop ACGE átlós síkja mekkora szöget zár be az ABFE oldallappal?',
    options: ['45°', '90°', '≈ 60,9°', '≈ 29,1°'],
    correctAnswer: 0,
    explanation: 'A metszésvonal AE. AE-re merőleges az ABFE lapban AB, az ACGE síkban AC; ezek szöge a négyzet átlójának szöge: 45°. (Az alaplappal 90°-ot zár be.)'
  },
  {
    id: 'sa-q18',
    questionTypeBadge: 'Testátló és lap',
    level: 2,
    question: 'Mekkora szöget zár be a 3 cm × 4 cm × 12 cm-es téglatest (12 cm a magasság) testátlója az alaplappal?',
    options: ['≈ 67,4°', '≈ 22,6°', '≈ 71,6°', '≈ 75,9°'],
    correctAnswer: 0,
    explanation: 'Az alaplap átlója √(9 + 16) = 5 cm, a testátló 13 cm. tg β = 12 / 5 ⇒ β ≈ 67,4°. (22,6° a testátló és a függőleges él szöge.)'
  },
  {
    id: 'sa-q19',
    questionTypeBadge: 'Testátló és él',
    level: 2,
    question: 'Mekkora szöget zár be a 3 × 4 × 12 cm-es téglatest testátlója a 12 cm-es éllel?',
    options: ['≈ 22,6°', '≈ 67,4°', '≈ 18,4°', '≈ 14,0°'],
    correctAnswer: 0,
    explanation: 'Az AEG háromszög E-nél derékszögű: cos γ = 12 / 13 ⇒ γ ≈ 22,6°.'
  },
  {
    id: 'sa-q20',
    questionTypeBadge: 'Kocka',
    level: 2,
    question: 'Mekkora szöget zár be egy kocka testátlója az alaplap síkjával?',
    options: ['≈ 35,3°', '45°', '≈ 54,7°', '30°'],
    correctAnswer: 0,
    explanation: 'a élű kockában a vetület az alaplap-átló (a√2), a magasság a: tg β = a / (a√2) = 1/√2 ⇒ β ≈ 35,3°. (54,7° a testátló és az oldalél szöge.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sa-q21',
    questionTypeBadge: 'Hatszög alapú hasáb',
    figure: FIG_HEX,
    level: 3,
    question: 'Egy szabályos hatszög alapú egyenes hasáb leghosszabb testátlója 14 cm, és 60°-ot zár be az alaplappal. Mekkora az alapél és a magasság?',
    options: ['a = 3,5 cm, m ≈ 12,12 cm', 'a = 7 cm, m ≈ 12,12 cm', 'a ≈ 6,06 cm, m = 7 cm', 'a = 3,5 cm, m = 7 cm'],
    correctAnswer: 0,
    explanation: 'A testátló vetülete a leghosszabb alaplap-átló: 14 · cos 60° = 7 cm = 2a ⇒ a = 3,5 cm. A magasság 14 · sin 60° ≈ 12,12 cm. (7 cm a hatszög átlója, nem az éle.)'
  },
  {
    id: 'sa-q22',
    questionTypeBadge: 'Hatszög alapú hasáb',
    level: 3,
    question: 'Az előző hasábban (a = 3,5 cm, m ≈ 12,12 cm) milyen hosszú a rövidebb testátló?',
    options: ['≈ 13,56 cm', '14 cm', '≈ 12,61 cm', '≈ 6,06 cm'],
    correctAnswer: 0,
    explanation: 'A rövidebb alaplap-átló a√3 ≈ 6,06 cm, így a rövidebb testátló √(6,06² + 12,12²) ≈ 13,56 cm. (12,61 cm az alapéllel számolt hibás érték.)'
  },
  {
    id: 'sa-q23',
    questionTypeBadge: 'Testátló és alaplap',
    figure: FIG_HF1,
    level: 3,
    question: 'Egy téglatest élei 5,18 cm, 3,75 cm és 9,92 cm (ez a magasság). Mekkora az AG testátló és az alaplap síkjának szöge?',
    options: ['≈ 57,2°', '≈ 32,8°', '≈ 62,4°', '≈ 69,3°'],
    correctAnswer: 0,
    explanation: 'AC = √(5,18² + 3,75²) ≈ 6,39 cm. tg α = 9,92 / 6,39 ⇒ α ≈ 57,2°. (32,8° az AG és az AE él szöge.)'
  },
  {
    id: 'sa-q24',
    questionTypeBadge: 'Két testátló',
    level: 3,
    question: 'Ugyanebben a téglatestben (5,18 × 3,75 × 9,92 cm) mekkora az AG és a CE testátló hajlásszöge?',
    options: ['≈ 65,6°', '≈ 114,4°', '≈ 32,8°', '≈ 57,2°'],
    correctAnswer: 0,
    explanation: 'AG és CE az ACGE téglalap (AC ≈ 6,39, AE = 9,92) átlói. Az átlók szöge 2 · EAG∢ ≈ 2 · 32,8° ≈ 65,6° (a másik szög 114,4°, de a hajlásszög ≤ 90°).'
  },
  {
    id: 'sa-q25',
    questionTypeBadge: 'Szakasz hossza',
    figure: FIG_HF2,
    level: 3,
    question: 'Egy négyzetes oszlop alaplapjának területe 1 dm², palástja 280 cm². Milyen hosszú az alaplap A csúcsát a fedőlap K középpontjával összekötő szakasz?',
    options: ['≈ 9,95 cm', '≈ 12,21 cm', '≈ 8,60 cm', '≈ 7,07 cm'],
    correctAnswer: 0,
    explanation: 'a = 10 cm, m = 280 / 40 = 7 cm. K vetülete az alaplap középpontja, az A-tól 5√2 ≈ 7,07 cm-re: AK = √(50 + 49) = √99 ≈ 9,95 cm. (12,21 cm az A–G testátló.)'
  },
  {
    id: 'sa-q26',
    questionTypeBadge: 'Egyenes és sík',
    level: 3,
    question: 'Az előző oszlopban (a = 10 cm, m = 7 cm) mekkora szöget zár be az AK szakasz az ABCD alaplappal?',
    options: ['≈ 44,71°', '≈ 59,83°', '≈ 35,0°', '≈ 45,29°'],
    correctAnswer: 0,
    explanation: 'AK vetülete az alaplapon az A-t a lapközépponttal összekötő 5√2 cm-es szakasz: tg = 7 / (5√2) ≈ 0,990 ⇒ ≈ 44,71°. (59,83° az AK és az AB él szöge.)'
  },
  {
    id: 'sa-q27',
    questionTypeBadge: 'Két egyenes',
    level: 3,
    question: 'Az előző oszlopban (a = 10 cm, m = 7 cm) mekkora szöget zár be az AK szakasz az AB alapéllel?',
    options: ['≈ 59,83°', '≈ 44,71°', '≈ 30,17°', '45°'],
    correctAnswer: 0,
    explanation: 'K merőleges vetülete az AB egyenesre az AB felezőpontja, ezért cos = 5 / √99 ≈ 0,5025 ⇒ ≈ 59,83°.'
  },
  {
    id: 'sa-q28',
    questionTypeBadge: 'Két testátló',
    level: 3,
    question: 'Mekkora szöget zár be egy kocka két testátlója?',
    options: ['≈ 70,5°', '≈ 109,5°', '60°', '90°'],
    correctAnswer: 0,
    explanation: 'A két testátló egy a × a√2 oldalú téglalap átlói; a szögek 2 · arctg √2 ≈ 109,5° és 70,5°. A hajlásszög a nem nagyobbik: ≈ 70,5°.'
  },
  {
    id: 'sa-q29',
    questionTypeBadge: 'Kitérő egyenesek',
    level: 3,
    question: 'Mekkora az ABCDEFGH kocka AF és BD lapátlójának (két kitérő egyenesnek) a hajlásszöge?',
    options: ['60°', '90°', '45°', '0°'],
    correctAnswer: 0,
    explanation: 'Kitérő egyeneseknél egy ponton át húzott párhuzamosaik szögét vesszük. AF párhuzamos a szemközti lap DG átlójával, így a keresett szög BDG∢. A BDG háromszög oldalai lapátlók, tehát szabályos: a szög 60°.'
  },
  {
    id: 'sa-q30',
    questionTypeBadge: 'Állítás',
    level: 3,
    question: 'Az 5,18 × 3,75 × 9,92 cm-es téglatestben igaz-e, hogy az AG és CE testátló szöge éppen kétszerese az EAG szögnek?',
    options: [
      'Igen: az ACGE téglalap átlói egyenlő szárú háromszögeket alkotnak, így a szög 2 · EAG∢',
      'Nem: a két szög egyenlő',
      'Nem: a testátlók szöge mindig 90°',
      'Csak kocka esetén igaz'
    ],
    correctAnswer: 0,
    explanation: 'Az ACGE téglalap K középpontjában AK = EK, így az AKE háromszög egyenlő szárú: KEA∢ = KAE∢ = EAG∢. Az EKG∢ ennek a háromszögnek külső szöge, tehát EKG∢ = 2 · EAG∢ ≈ 2 · 32,8° ≈ 65,6°. Mivel ez nem nagyobb 90°-nál, ez a két testátló hajlásszöge.'
  }
];

export const SpatialAnglesQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-hajlasszog-quiz"
      subtopicId="terelemek-hajlasszoge"
      title="9. Térelemek hajlásszöge – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: két egyenes, egyenes és sík, két sík hajlásszöge téglatestben, kockában, hasábban."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SPATIAL_ANGLES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók',
          items: [
            'Két egyenes: a nem nagyobbik szög (0°–90°), párhuzamosak: 0°.',
            'Egyenes és sík: az egyenes és merőleges vetületének szöge.',
            'Két sík: a metszésvonalra merőleges, a két síkban fekvő egyenesek szöge.',
            'Merőleges egyenes–sík: elég két metsző síkbeli egyenesre merőlegesnek lennie.'
          ]
        },
        {
          title: 'Számolás',
          items: [
            'Keress derékszögű háromszöget, amely a szöget tartalmazza!',
            'testátló: e = √(a² + b² + c²)',
            'testátló–alaplap: tg = c / √(a² + b²)',
            'ha φ > 90° jön ki, a hajlásszög 180° − φ'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Láda 30 × 6 × 5: e = 31 cm, két testátló ≈ 29,2°, AG–alaplap ≈ 9,3°',
            'Kocka: AG–BCGF ≈ 35,3°, BDG–ABCD ≈ 54,7°',
            'Oszlop 5 × 5 × 9: ABGH–alaplap ≈ 60,9°, ACGE–oldallap 45°',
            'Hatszög hasáb, testátló 14 cm, 60°: a = 3,5 cm, m ≈ 12,12 cm'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SpatialAnglesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SpatialAnglesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SpatialAnglesQuiz;
