import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SpatialDistanceMatcher } from './SpatialDistanceMatcher';
import { SpatialDistanceSorter } from './SpatialDistanceSorter';
import {
  P2,
  P3,
  KFig,
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
  K_EDGE
} from './figKit';

// ---------------------------------------------------------------------------
// Kérdésábrák (kavalier-vetület, takart élek szaggatottak, derékszög: negyedkörív ponttal)
// ---------------------------------------------------------------------------

type BoxOpts = {
  w: number;
  d: number;
  h: number;
  lw?: string;
  ld?: string;
  lh?: string;
  labels?: Record<number, string>;
  title?: string;
  extra?: (P: P2[]) => React.ReactNode;
};

const BoxQ: React.FC<BoxOpts> = ({ w, d, h, lw, ld, lh, labels = K_BOX_LABELS, title, extra }) => {
  const kx = 0.55 * Math.cos((35 * Math.PI) / 180);
  const ky = 0.55 * Math.sin((35 * Math.PI) / 180);
  const s = Math.min(170 / (w + kx * d), (title ? 104 : 114) / (h + ky * d));
  const ox = 120 - ((w + kx * d) * s) / 2;
  const oy = (title ? 88 : 82) + ((h + ky * d) * s) / 2;
  const pr = makeProj(ox, oy, s, 0.55, 35);
  const V = kBoxVerts(w, d, h);
  const P = V.map(pr);
  return (
    <KFig title={title}>
      <KSolid verts={V} faces={K_BOX_FACES} proj={pr} labels={labels} />
      {lw && <KText p={[kMid(P[0], P[1])[0], kMid(P[0], P[1])[1] + 12]} t={lw} s={10.5} c={K_BLUE} />}
      {ld && <KText p={[kMid(P[1], P[2])[0] + 13, kMid(P[1], P[2])[1] + 6]} t={ld} s={10.5} c={K_BLUE} />}
      {lh && <KText p={[kMid(P[0], P[4])[0] - 14, kMid(P[0], P[4])[1]]} t={lh} s={10.5} c={K_BLUE} />}
      {extra && extra(P)}
    </KFig>
  );
};

const PRIME_LABELS: Record<number, string> = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'A′', 5: 'B′', 6: 'C′', 7: 'D′' };

const FIG_Q4 = (
  <BoxQ w={5} d={5} h={5} lw="5 cm" extra={(P) => <><KLine a={P[0]} b={P[5]} c={K_RED} w={2.4} /><KText p={[kMid(P[0], P[5])[0] + 10, kMid(P[0], P[5])[1] + 8]} t="f = ?" s={10.5} /></>} />
);
const FIG_Q5 = (
  <BoxQ w={5} d={5} h={5} lw="5 cm" extra={(P) => <><KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} /><KText p={[kMid(P[0], P[6])[0] + 4, kMid(P[0], P[6])[1] - 12]} t="e = ?" s={10.5} /></>} />
);
const FIG_Q6 = (
  <BoxQ w={4} d={3} h={12} lw="4" ld="3" lh="12" extra={(P) => <><KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} /><KText p={[kMid(P[0], P[6])[0] + 12, kMid(P[0], P[6])[1]]} t="?" /></>} />
);
const FIG_Q7 = (
  <BoxQ w={4} d={4} h={4} title="Hány él kitérő az AB-hez?" extra={(P) => <KLine a={P[0]} b={P[1]} c={K_RED} w={3.2} />} />
);
const FIG_Q8 = (
  <BoxQ w={4} d={4} h={4} extra={(P) => <><KLine a={P[1]} b={P[7]} c={K_RED} w={2.6} /><KLine a={P[0]} b={P[5]} c={K_GREEN} w={2.2} /></>} />
);
const FIG_Q11 = (
  <BoxQ w={3} d={2} h={6} lw="3" ld="2" lh="6" extra={(P) => <><KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} /><KText p={[kMid(P[0], P[6])[0] + 11, kMid(P[0], P[6])[1]]} t="?" /></>} />
);
const FIG_Q12 = (
  <BoxQ
    w={4}
    d={4}
    h={4}
    extra={(P) => (
      <>
        <KLine a={P[0]} b={P[2]} c={K_GREEN} w={2.2} dash />
        <KLine a={P[4]} b={P[2]} c={K_RED} w={2.4} />
        <KText p={[kLerp(P[0], P[2], 0.6)[0], kLerp(P[0], P[2], 0.6)[1] + 11]} t="10" s={10.5} c={K_GREEN} />
        <KText p={[kLerp(P[4], P[2], 0.35)[0] + 6, kLerp(P[4], P[2], 0.35)[1] - 11]} t="e = ?" s={10.5} />
      </>
    )}
  />
);
const FIG_Q14 = (
  <BoxQ
    w={12}
    d={7}
    h={5}
    lw="12 m"
    ld="7 m"
    lh="5 m"
    labels={PRIME_LABELS}
    extra={(P) => (
      <>
        <KLine a={P[0]} b={P[3]} c={K_RED} w={3} />
        <KLine a={P[5]} b={P[6]} c={K_BLUE} w={3} />
      </>
    )}
  />
);
const FIG_Q15 = (
  <BoxQ
    w={12}
    d={7}
    h={5}
    lw="12 m"
    ld="7 m"
    lh="5 m"
    labels={PRIME_LABELS}
    extra={(P) => (
      <>
        <KLine a={P[0]} b={P[3]} c={K_RED} w={3} />
        <KLine a={P[1]} b={P[5]} c={K_BLUE} w={3} />
      </>
    )}
  />
);
const FIG_Q16 = (
  <BoxQ
    w={2}
    d={4}
    h={2.5}
    lw="2 m"
    ld="4 m"
    lh="2,5 m"
    extra={(P) => (
      <>
        <KLine a={P[4]} b={P[2]} c={K_RED} w={2.4} />
        <KText p={[kMid(P[4], P[2])[0] + 10, kMid(P[4], P[2])[1] - 8]} t="?" />
      </>
    )}
  />
);
const FIG_Q19 = (
  <BoxQ
    w={6}
    d={6}
    h={6}
    lw="6 cm"
    extra={(P) => (
      <>
        <KLine a={P[0]} b={P[1]} c={K_RED} w={3} />
        <KLine a={P[7]} b={P[6]} c={K_BLUE} w={3} />
      </>
    )}
  />
);
const FIG_Q22 = (
  <BoxQ w={8} d={6} h={10} lw="8 m" ld="6 m" lh="10 m" extra={(P) => <><circle cx={P[4][0]} cy={P[4][1]} r="3.5" fill={K_RED} /><circle cx={P[2][0]} cy={P[2][1]} r="3.5" fill={K_RED} /></>} />
);
const FIG_Q27 = (
  <BoxQ
    w={8}
    d={8}
    h={8}
    lw="8 cm"
    extra={(P) => {
      const Fp = kLerp(P[0], P[6], 1 / 3);
      return (
        <>
          <KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} />
          <KLine a={P[1]} b={Fp} c={K_GREEN} w={2.2} />
          <KRight v={Fp} p1={P[1]} p2={P[6]} r={8} />
          <KText p={[kMid(P[1], Fp)[0] + 6, kMid(P[1], Fp)[1] + 9]} t="?" />
        </>
      );
    }}
  />
);

const FIG_Q23 = (() => {
  const pr = makeProj(70, 146, 6, 0.55, 30);
  const sq: P3[] = [[0, 0, 0], [10, 0, 0], [10, 0, 10], [0, 0, 10]];
  const O: P3 = [5, 0, 5];
  const top: P3 = [5, 19, 5];
  const fix: P3 = [5, 12.66, 5];
  const S = sq.map(pr);
  return (
    <KFig>
      <KPoly p={S} fill="#dcfce7" c={K_GREEN} w={1.4} op={0.7} />
      <KLine a={pr(O)} b={pr(top)} c={K_EDGE} w={3} />
      {S.map((p, i) => (
        <KLine key={i} a={p} b={pr(fix)} c={i === 2 ? '#94a3b8' : K_RED} w={1.4} dash={i === 2} />
      ))}
      <KText p={[kMid(S[0], S[1])[0], kMid(S[0], S[1])[1] + 11]} t="10 m" s={10} c={K_GREEN} />
      <KText p={[kMid(S[0], pr(fix))[0] - 18, kMid(S[0], pr(fix))[1]]} t="14,5 m" s={10} c={K_RED} />
      <KText p={[pr(top)[0] + 14, pr(top)[1] + 4]} t="H = ?" s={10.5} />
      <KText p={[pr(fix)[0] + 28, pr(fix)[1] + 2]} t="⅔ H" s={10} c="#64748b" />
    </KFig>
  );
})();

const FIG_Q28 = (() => {
  const A: P2 = [40, 125];
  const B: P2 = [200, 125];
  const C: P2 = [200, 25];
  const D: P2 = [40, 25];
  const t = ((B[0] - A[0]) * (C[0] - A[0]) + (B[1] - A[1]) * (C[1] - A[1])) / ((C[0] - A[0]) ** 2 + (C[1] - A[1]) ** 2);
  const F: P2 = kLerp(A, C, t);
  return (
    <KFig title="">
      <KPoly p={[A, B, C, D]} fill="#eef2ff" c={K_EDGE} w={1.8} />
      <KLine a={A} b={C} c={K_RED} w={2.6} />
      <KLine a={B} b={F} c={K_GREEN} w={2} />
      <KRight v={F} p1={B} p2={C} r={9} />
      <KText p={[120, 140]} t="8 m" s={10.5} c={K_BLUE} />
      <KText p={[214, 75]} t="5 m" s={10.5} c={K_BLUE} />
      <KText p={[kMid(B, F)[0] + 8, kMid(B, F)[1] + 8]} t="?" />
      <KText p={[85, 62]} t="fal" s={10} c={K_RED} />
    </KFig>
  );
})();

const FIG_Q30 = (() => {
  const pr = makeProj(56, 138, 3.3, 0.55, 28);
  const A: P3 = [0, 0, 0];
  const B: P3 = [40, 0, 0];
  const C: P3 = [20, 0, 34.64];
  const T: P3 = [20, 32.66, 11.55];
  const Fo: P3 = [20, 0, 11.55];
  const [a, b, c, t, f] = [A, B, C, T, Fo].map(pr);
  return (
    <KFig>
      <KPoly p={[a, b, c]} fill="#bae6fd" c={K_BLUE} w={1.8} op={0.6} />
      <KLine a={a} b={t} c={K_EDGE} />
      <KLine a={b} b={t} c={K_EDGE} />
      <KLine a={c} b={t} c="#94a3b8" w={1.3} dash />
      <KLine a={t} b={f} c={K_RED} w={2.2} dash />
      <KRight v={f} p1={t} p2={b} r={8} />
      <KText p={[kMid(a, b)[0], kMid(a, b)[1] + 11]} t="40 m" s={10} c={K_BLUE} />
      <KText p={[kMid(a, t)[0] - 18, kMid(a, t)[1]]} t="40 m" s={10} />
      <KText p={[kMid(t, f)[0] + 10, kMid(t, f)[1]]} t="?" />
      <KText p={[t[0], t[1] - 9]} t="léghajó" s={9.5} c={K_RED} />
    </KFig>
  );
})();

const SPATIAL_DISTANCE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sd-q1',
    questionTypeBadge: 'Kölcsönös helyzet',
    level: 1,
    question: 'Hogyan nevezzük azt a két egyenest, amelyekre nem illeszthető közös sík?',
    options: ['kitérő egyenesek', 'párhuzamos egyenesek', 'metsző egyenesek', 'merőleges egyenesek'],
    correctAnswer: 0,
    explanation: 'Két egyenes kitérő, ha nincs olyan sík, amelyre mindkét egyenes illeszkedik. A párhuzamos és a metsző egyenesek mindig egy síkban vannak.'
  },
  {
    id: 'sd-q2',
    questionTypeBadge: 'Pont és sík',
    level: 1,
    question: 'Mi a pont és a sík távolsága?',
    options: [
      'a pontból a síkra állított merőleges szakasz hossza',
      'a pont és a sík bármely pontjának távolsága',
      'a pontot a sík legközelebbi egyenesével összekötő tetszőleges szakasz hossza',
      'a pont és a sík legtávolabbi pontjának távolsága'
    ],
    correctAnswer: 0,
    explanation: 'Pont és sík távolsága a pontból a síkra állított merőleges szakasz hossza: a merőleges talppontja a sík legközelebbi pontja.'
  },
  {
    id: 'sd-q3',
    questionTypeBadge: 'Távolság fogalma',
    level: 1,
    question: 'Mekkora két egymást metsző sík távolsága?',
    options: ['0', 'a metszésvonal hossza', 'nem értelmezhető', 'a két sík hajlásszöge'],
    correctAnswer: 0,
    explanation: 'Ha két térelemnek van közös pontja (metszik egymást vagy illeszkednek egymásra), akkor a távolságuk 0.'
  },
  {
    id: 'sd-q4',
    questionTypeBadge: 'Kocka lapátlója',
    figure: FIG_Q4,
    level: 1,
    question: 'Mekkora az 5 cm élű kocka lapátlója?',
    options: ['5√2 ≈ 7,07 cm', '5√3 ≈ 8,66 cm', '10 cm', '√10 ≈ 3,16 cm'],
    correctAnswer: 0,
    explanation: 'A lapátló egy négyzet átlója: f = √(5² + 5²) = 5√2 ≈ 7,07 cm.'
  },
  {
    id: 'sd-q5',
    questionTypeBadge: 'Kocka testátlója',
    figure: FIG_Q5,
    level: 1,
    question: 'Mekkora az 5 cm élű kocka testátlója?',
    options: ['5√3 ≈ 8,66 cm', '5√2 ≈ 7,07 cm', '15 cm', '√125 ≈ 11,18 cm'],
    correctAnswer: 0,
    explanation: 'e = √(a² + a² + a²) = a√3 = 5√3 ≈ 8,66 cm.'
  },
  {
    id: 'sd-q6',
    questionTypeBadge: 'Téglatest testátlója',
    figure: FIG_Q6,
    level: 1,
    question: 'Egy téglatest egy csúcsból induló élei 3 cm, 4 cm és 12 cm. Mekkora a testátlója?',
    options: ['13 cm', '19 cm', '≈ 12,65 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'e = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm.'
  },
  {
    id: 'sd-q7',
    questionTypeBadge: 'Kitérő élek',
    figure: FIG_Q7,
    level: 1,
    question: 'A kocka AB élével hány éle kitérő?',
    options: ['4', '3', '2', '8'],
    correctAnswer: 0,
    explanation: 'A kocka többi 11 éléből 3 párhuzamos AB-vel (DC, EF, HG), 4 metszi (AD, AE, BC, BF), a maradék 4 kitérő (CG, DH, EH, FG).'
  },
  {
    id: 'sd-q8',
    questionTypeBadge: 'Lapátló vagy testátló',
    figure: FIG_Q8,
    level: 1,
    question: 'Az ábrán a kocka AF (zöld) és BH (piros) szakasza látható. Melyik állítás igaz?',
    options: ['AF lapátló, BH testátló', 'AF testátló, BH lapátló', 'mindkettő lapátló', 'mindkettő testátló'],
    correctAnswer: 0,
    explanation: 'Az A és F csúcs az ABFE lapon van, így AF lapátló. A B és H csúcs nincs közös lapon, így BH testátló.'
  },
  {
    id: 'sd-q9',
    questionTypeBadge: 'Bevezető probléma',
    level: 1,
    question: 'Négy hajó közül bármely kettő 40 m-re van egymástól, és három vitorlás a vízen. Milyen jármű lehet a negyedik?',
    options: ['léghajó vagy tengeralattjáró', 'csak egy vitorlás', 'csak motorcsónak a háromszög közepén', 'ilyen elhelyezkedés nem lehetséges'],
    correctAnswer: 0,
    explanation: 'A síkban nincs olyan pont, amely egy 40 m oldalú szabályos háromszög mindhárom csúcsától 40 m-re van, ezért a negyedik jármű a víz fölött vagy alatt van (szabályos tetraéder csúcsa).'
  },
  {
    id: 'sd-q10',
    questionTypeBadge: 'Párhuzamos síkok',
    level: 1,
    question: 'Hogyan határozzuk meg két párhuzamos sík távolságát?',
    options: [
      'az egyik sík egy tetszőleges pontjának távolsága a másik síktól',
      'a két sík egy-egy tetszőleges pontjának távolsága',
      'a két sík metszésvonalának hossza',
      'a két sík pontjai közötti legnagyobb távolság'
    ],
    correctAnswer: 0,
    explanation: 'Két párhuzamos sík távolsága az egyik sík tetszőleges pontjának a másik síktól való (merőleges) távolsága – ez minden pontra ugyanannyi.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'sd-q11',
    questionTypeBadge: 'Téglatest testátlója',
    figure: FIG_Q11,
    level: 2,
    question: 'Mekkora a 3 cm, 2 cm és 6 cm élű téglatest testátlója?',
    options: ['7 cm', '11 cm', '≈ 6,71 cm', '49 cm'],
    correctAnswer: 0,
    explanation: 'e = √(3² + 2² + 6²) = √(9 + 4 + 36) = √49 = 7 cm.'
  },
  {
    id: 'sd-q12',
    questionTypeBadge: 'Kocka átlói',
    figure: FIG_Q12,
    level: 2,
    question: 'Egy kocka lapátlója 10 egység. Mekkora a testátlója?',
    options: ['5√6 ≈ 12,25 egység', '10√2 ≈ 14,14 egység', '10√3 ≈ 17,32 egység', '10 egység'],
    correctAnswer: 0,
    explanation: 'a√2 = 10 ⇒ a = 5√2. A testátló e = a√3 = 5√2 · √3 = 5√6 ≈ 12,25 egység.',
    breakdown: ['f = a√2 = 10', 'a = 10 / √2 = 5√2 ≈ 7,07', 'e = a√3 = 5√6 ≈ 12,25']
  },
  {
    id: 'sd-q13',
    questionTypeBadge: 'Kocka átlói',
    level: 2,
    question: 'Egy kocka testátlója 30 egység. Mekkora a lapátlója?',
    options: ['10√6 ≈ 24,49 egység', '≈ 21,21 egység', '10√3 ≈ 17,32 egység', '30√2 ≈ 42,43 egység'],
    correctAnswer: 0,
    explanation: 'a√3 = 30 ⇒ a = 10√3. A lapátló f = a√2 = 10√6 ≈ 24,49 egység.'
  },
  {
    id: 'sd-q14',
    questionTypeBadge: 'Párhuzamos élek',
    figure: FIG_Q14,
    level: 2,
    question: 'Az ABCDA′B′C′D′ téglatestben AD = 7 m, AB = 12 m, AA′ = 5 m. Milyen távol van az AD él a B′C′ éltől?',
    options: ['13 m', '12 m', '5 m', '≈ 14,76 m'],
    correctAnswer: 0,
    explanation: 'A két él párhuzamos; távolságuk az ABB′A′ téglalap AB′ átlója: √(12² + 5²) = √169 = 13 m.'
  },
  {
    id: 'sd-q15',
    questionTypeBadge: 'Kitérő élek távolsága',
    figure: FIG_Q15,
    level: 2,
    question: 'Ugyanebben a téglatestben (AD = 7 m, AB = 12 m, AA′ = 5 m) milyen távol van az AD él a vele kitérő BB′ éltől?',
    options: ['12 m', '5 m', '13 m', '0 m'],
    correctAnswer: 0,
    explanation: 'Az AB él merőleges AD-re és BB′-re is (közös merőleges), így a két kitérő él távolsága AB = 12 m.'
  },
  {
    id: 'sd-q16',
    questionTypeBadge: 'A pók útja',
    figure: FIG_Q16,
    level: 2,
    question: 'A 2 m széles, 4 m hosszú, 2,5 m magas szoba E sarkából a pók fonálon jut el a legtávolabbi C sarokba. Mekkora a legrövidebb út?',
    options: ['√26,25 ≈ 5,12 m', '8,5 m', '√20 ≈ 4,47 m', '√36,25 ≈ 6,02 m'],
    correctAnswer: 0,
    explanation: 'A levegőben a legrövidebb út az EC testátló: √(2,5² + 2² + 4²) = √26,25 ≈ 5,12 m. (A 6,02 m a falakon mért út.)'
  },
  {
    id: 'sd-q17',
    questionTypeBadge: 'Kocka középpontja',
    level: 2,
    question: 'Milyen távol van a 10 cm élű kocka középpontja a kocka egyik élétől?',
    options: ['5√2 ≈ 7,07 cm', '5 cm', '5√3 ≈ 8,66 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'A középpontból az élre állított merőleges a lapátló felével egyenlő hosszú (az élre merőleges, középponton átmenő metszet egy 10 cm oldalú négyzet): 10√2 / 2 = 5√2 ≈ 7,07 cm.'
  },
  {
    id: 'sd-q18',
    questionTypeBadge: 'Átlók száma',
    level: 2,
    question: 'Hány testátlója van egy kockának?',
    options: ['4', '8', '12', '6'],
    correctAnswer: 0,
    explanation: 'Mind a 8 csúcsból egy testátló indul (a szemközti csúcsba), és mindegyiket kétszer számoltuk: 8 / 2 = 4. (Lapátlója 6 · 2 = 12 van.)'
  },
  {
    id: 'sd-q19',
    questionTypeBadge: 'Párhuzamos élek',
    figure: FIG_Q19,
    level: 2,
    question: 'Milyen távol van egymástól a 6 cm élű kocka AB és HG éle?',
    options: ['6√2 ≈ 8,49 cm', '6 cm', '6√3 ≈ 10,39 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'AB ∥ HG, és BG merőleges mindkettőre, így a távolság a BCGF lap BG lapátlója: 6√2 ≈ 8,49 cm.'
  },
  {
    id: 'sd-q20',
    questionTypeBadge: 'A pók útja',
    level: 2,
    question: 'A 2 m × 4 m × 2,5 m-es szobában a pók csak a falakon, padlón, plafonon mászhat E-ből C-be. Mekkora a legrövidebb útja?',
    options: ['√36,25 ≈ 6,02 m', '√26,25 ≈ 5,12 m', '√42,25 = 6,5 m', '√46,25 ≈ 6,80 m'],
    correctAnswer: 0,
    explanation: 'Három kiterítést kell összehasonlítani: √(2² + 6,5²) ≈ 6,80; √(4² + 4,5²) ≈ 6,02; √(2,5² + 6²) = 6,5. A legrövidebb a leghosszabb (4 m-es) élen átvezető út: ≈ 6,02 m.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'sd-q21',
    questionTypeBadge: 'A pók útja',
    level: 3,
    question: 'A pók legrövidebb falmenti útján (2 m × 4 m × 2,5 m-es szoba, az AD = 4 m-es élen át) az A csúcstól milyen távolságban „fordul be” az AD élen?',
    options: ['≈ 2,22 m', '2 m', '≈ 1,78 m', '2,5 m'],
    correctAnswer: 0,
    explanation: 'A kiterített 4 × 4,5-es téglalapon az átló a 2,5 m-es magasságban metszi a hajtásvonalat; hasonló háromszögekkel x = 4 · 2,5 / 4,5 ≈ 2,22 m.'
  },
  {
    id: 'sd-q22',
    questionTypeBadge: 'Kiterítés',
    figure: FIG_Q22,
    level: 3,
    question: 'Egy 8 m × 6 m × 10 m-es (szélesség × hosszúság × magasság) téglatest egyik csúcsából a szemközti csúcsba a felületén haladva mekkora a legrövidebb út?',
    options: ['√296 ≈ 17,20 m', '√200 ≈ 14,14 m', '√320 ≈ 17,89 m', '√360 ≈ 18,97 m'],
    correctAnswer: 0,
    explanation: 'Kiterítések: √(10² + 14²) = √296 ≈ 17,20; √(8² + 16²) = √320 ≈ 17,89; √(6² + 18²) = √360 ≈ 18,97. A leghosszabb (10 m-es) élen átmenő út a legrövidebb. A √200 a testátló (a felületen nem járható).'
  },
  {
    id: 'sd-q23',
    questionTypeBadge: 'Érettségi 2007',
    figure: FIG_Q23,
    level: 3,
    question: 'Egy függőleges antennát magasságának 2/3 részénél négy 14,5 m-es kötéllel rögzítenek; a rögzítési pontok egy 10 m oldalú négyzetet alkotnak, amelynek közepén áll az antenna. Milyen magas az antenna?',
    options: ['≈ 19 m', '≈ 12,66 m', '14,5 m', '≈ 13,61 m'],
    correctAnswer: 0,
    explanation: 'A négyzet középpontja a csúcsoktól 5√2 ≈ 7,07 m-re van. A rögzítés magassága √(14,5² − 50) = √160,25 ≈ 12,66 m = ⅔ H, így H ≈ 12,66 · 1,5 ≈ 19 m.',
    breakdown: ['félátló: 10√2 / 2 ≈ 7,07 m', 'x = √(14,5² − 7,07²) ≈ 12,66 m', 'H = 1,5 · x ≈ 18,99 ≈ 19 m']
  },
  {
    id: 'sd-q24',
    questionTypeBadge: 'Érettségi 2007',
    level: 3,
    question: 'Az előző antenna szomszédos kötelei közé sátorszerűen 4 háromszög alakú vásznat feszítenek (oldalaik 14,5 m, 14,5 m, 10 m). Mekkora a vásznak együttes területe?',
    options: ['≈ 272,2 m²', '≈ 68,05 m²', '290 m²', '≈ 136,1 m²'],
    correctAnswer: 0,
    explanation: 'Egy egyenlő szárú háromszög alaphoz tartozó magassága √(14,5² − 5²) ≈ 13,61 m, területe 10 · 13,61 / 2 ≈ 68,05 m². Négy vászon: ≈ 272,2 m².'
  },
  {
    id: 'sd-q25',
    questionTypeBadge: 'Pont és sík',
    level: 3,
    question: 'Egy terem összes élének összege 53,2 m, magasság : szélesség : hosszúság = 4 : 6 : 9. A mennyezet közepéről 40 cm-es zsinóron lámpa lóg. Milyen távol van a lámpa a legkisebb területű faltól?',
    options: ['3,15 m', '2,1 m', '2,4 m', '6,3 m'],
    correctAnswer: 0,
    explanation: '4 · 19k = 53,2 ⇒ k = 0,7: a terem 2,8 m magas, 4,2 m széles, 6,3 m hosszú. A legkisebb fal a 2,8 × 4,2-es, ettől a lámpa a hosszúság felére van: 6,3 / 2 = 3,15 m.'
  },
  {
    id: 'sd-q26',
    questionTypeBadge: 'Pont és egyenes',
    level: 3,
    question: 'Ugyanebben a 2,8 m × 4,2 m × 6,3 m-es teremben (lámpa a mennyezet közepe alatt 0,4 m-rel) milyen távol van a lámpa a legközelebbi leghosszabb éltől?',
    options: ['≈ 2,14 m', '≈ 3,19 m', '2,1 m', '≈ 3,17 m'],
    correctAnswer: 0,
    explanation: 'A leghosszabb (6,3 m-es) élek közül a mennyezet élei a legközelebbiek: a merőleges szakasz √(2,1² + 0,4²) = √4,57 ≈ 2,14 m. (A padló hosszú éle √(2,1² + 2,4²) ≈ 3,19 m-re van.)'
  },
  {
    id: 'sd-q27',
    questionTypeBadge: 'Pont és egyenes',
    figure: FIG_Q27,
    level: 3,
    question: 'Milyen távol van a 8 cm élű kocka egyik testátlója a kocka azon csúcsaitól, amelyek nem illeszkednek rá?',
    options: ['8√6/3 ≈ 6,53 cm', '4√2 ≈ 5,66 cm', '8√3/3 ≈ 4,62 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Az ABG háromszög B-nél derékszögű (AB = 8, BG = 8√2, AG = 8√3). A B-ből húzott magasság: AB · BG / AG = 8 · 8√2 / (8√3) = 8√6/3 ≈ 6,53 cm. Szimmetria miatt mind a 6 csúcs ugyanilyen távol van.',
    breakdown: ['AB = 8, BG = 8√2, AG = 8√3', 'm = AB · BG / AG', 'm = 8√2 / √3 = 8√6 / 3 ≈ 6,53 cm']
  },
  {
    id: 'sd-q28',
    questionTypeBadge: 'Átlósík',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy 5 m széles, 8 m hosszú, 3 m magas termet a padló egyik átlója mentén állított függőleges fallal kettéosztanak. Milyen távol van a fal a terem másik két függőleges élétől?',
    options: ['≈ 4,24 m', '≈ 4,72 m', '2,5 m', '0 m'],
    correctAnswer: 0,
    explanation: 'Felülnézetben a téglalap csúcsának távolsága az átlótól: a · b / √(a² + b²) = 5 · 8 / √89 ≈ 4,24 m. (A fal síkjára illeszkedő két élnél a távolság 0.)'
  },
  {
    id: 'sd-q29',
    questionTypeBadge: 'Lapközéppontok',
    level: 3,
    question: 'Egy kocka két szomszédos lapközéppontjának távolsága 21,92 cm. Mekkora a kocka éle?',
    options: ['≈ 31 cm', '10,96 cm', '≈ 43,84 cm', '≈ 37,97 cm'],
    correctAnswer: 0,
    explanation: 'Két szomszédos lapközéppont távolsága egy a/2 befogójú egyenlő szárú derékszögű háromszög átfogója: (a/2)·√2 = a/√2. Így a = 21,92 · √2 ≈ 31 cm.'
  },
  {
    id: 'sd-q30',
    questionTypeBadge: 'Szabályos tetraéder',
    figure: FIG_Q30,
    level: 3,
    question: 'A bevezető feladat léghajója mindhárom vitorlástól 40 m-re van. Milyen magasan van a víz felszíne fölött?',
    options: ['40·√(2/3) ≈ 32,66 m', '40 m', '20√3 ≈ 34,64 m', '≈ 23,09 m'],
    correctAnswer: 0,
    explanation: 'A léghajó vetülete a háromszög középpontja, amely a csúcsoktól 40/√3 ≈ 23,09 m-re van. Pitagorasz-tétellel: m = √(40² − 23,09²) = 40·√(2/3) ≈ 32,66 m.'
  }
];

export const SpatialDistanceQuiz: React.FC<{
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
      topicId="g12-ter-terelemek-tavolsaga-quiz"
      subtopicId="terelemek-tavolsaga-ismetles"
      title="1. Térelemek távolsága (ismétlés) – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kölcsönös helyzet, távolságok, lapátló és testátló, a pók legrövidebb útja."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SPATIAL_DISTANCE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kölcsönös helyzet',
          items: [
            'Két egyenes: metsző (1 közös pont), párhuzamos (egy síkban, nincs közös pont), kitérő (nincs közös síkjuk).',
            'Egyenes és sík: illeszkedik, metszi (1 közös pont), párhuzamos.',
            'Két sík: metsző (metszésvonal) vagy párhuzamos.',
            'Kocka egy élével: 3 párhuzamos, 4 metsző, 4 kitérő él.'
          ]
        },
        {
          title: 'Távolságok',
          items: [
            'Két ponthalmaz távolsága: a pontjaik távolságainak minimuma.',
            'Közös pont esetén a távolság 0.',
            'Pont–egyenes, pont–sík: a merőleges szakasz hossza.',
            'Párhuzamos térelemek: egyik tetszőleges pontjának távolsága a másiktól.'
          ]
        },
        {
          title: 'Átlók',
          items: [
            'Téglatest: e = √(a² + b² + c²)',
            'Kocka: f = a√2, e = a√3',
            'Pók a falakon: √(L² + (p + q)²), L a leghosszabb él',
            'Derékszögű háromszög magassága: m = a · b / c'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SpatialDistanceMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SpatialDistanceSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SpatialDistanceQuiz;
