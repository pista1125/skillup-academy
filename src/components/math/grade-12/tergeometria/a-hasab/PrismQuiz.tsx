import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PrismMatcher } from './PrismMatcher';
import { PrismSorter } from './PrismSorter';
import {
  P2,
  P3,
  KFig,
  KLine,
  KText,
  KPoly,
  KRight,
  KAngle,
  KSolidFig,
  kPrism,
  kRegular,
  kMid,
  K_RED,
  K_BLUE,
  K_GREEN,
  K_PURPLE,
  K_EDGE,
  K_HID
} from './figKit';

// ---------------------------------------------------------------------------
// Kérdésábrák (kavalier-vetület, takart élek szaggatottak, derékszög: negyedkörív ponttal)
// ---------------------------------------------------------------------------
const OCTA: [number, number][] = [[1, 0], [2, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 2], [0, 1]];
const hexP = kPrism(kRegular(6, 4, 0, 4, 4), 5);
const octP = kPrism(OCTA, 3);

const FIG_HEX = <KSolidFig verts={hexP.verts} faces={hexP.faces} shade={[1]} />;
const FIG_OCTA = <KSolidFig verts={octP.verts} faces={octP.faces} shade={[1]} />;

/** Ferde hasáb elölnézete: oldalél L px hosszú, a szög deg fok. */
const obliqueFront = (deg: number, L: number, base: number, lblSide: string, lblM: string, lblAng: string) => {
  const r = (deg * Math.PI) / 180;
  const A: P2 = [28, 135];
  const B: P2 = [28 + base, 135];
  const D: P2 = [A[0] + L * Math.cos(r), A[1] - L * Math.sin(r)];
  const C: P2 = [B[0] + L * Math.cos(r), B[1] - L * Math.sin(r)];
  const F: P2 = [D[0], A[1]];
  return (
    <KFig>
      <KLine a={[14, 135]} b={[226, 135]} c="#94a3b8" w={1} />
      <KPoly p={[A, B, C, D]} fill="#e0e7ff" c={K_EDGE} w={1.8} op={0.7} />
      <KLine a={D} b={F} c={K_PURPLE} w={1.8} dash />
      <KRight v={F} p1={D} p2={B} r={9} />
      <KAngle v={A} p1={B} p2={D} t={lblAng} r={16} tr={30} />
      <KText p={[kMid(A, D)[0] - 14, kMid(A, D)[1] - 4]} t={lblSide} s={10.5} c={K_RED} />
      <KText p={[D[0] + 16, kMid(D, F)[1]]} t={lblM} s={10.5} c={K_PURPLE} />
    </KFig>
  );
};

const FIG_Q17 = obliqueFront(60, 104, 90, '10 cm', 'M = ?', '60°');
const FIG_Q30 = obliqueFront(30, 140, 60, '12 cm', '6 cm', '?');

const FIG_Q18 = (() => {
  const p = kPrism([[0, 0], [3, 0], [3, 3], [0, 3]], 4);
  return (
    <KSolidFig
      verts={p.verts}
      faces={p.faces}
      extra={(P) => (
        <>
          <KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} />
          <KText p={[kMid(P[0], P[1])[0], kMid(P[0], P[1])[1] + 12]} t="3 cm" s={10} c={K_BLUE} />
          <KText p={[kMid(P[0], P[4])[0] - 16, kMid(P[0], P[4])[1]]} t="4 cm" s={10} c={K_BLUE} />
          <KText p={[kMid(P[0], P[6])[0] + 12, kMid(P[0], P[6])[1] + 2]} t="?" />
        </>
      )}
    />
  );
})();

const hexTop = (extra: (V: P2[]) => React.ReactNode) => {
  const V = kRegular(6, 52, 0, 120, 82).map(([x, y]) => [x, y] as P2);
  return (
    <KFig>
      <KPoly p={V} fill="#e0e7ff" c={K_EDGE} w={2} />
      {extra(V)}
    </KFig>
  );
};

const FIG_Q19 = hexTop((V) => (
  <>
    <KLine a={V[0]} b={V[3]} c={K_RED} w={2.4} />
    <KText p={[120, 74]} t="?" />
    <KText p={[kMid(V[4], V[5])[0], kMid(V[4], V[5])[1] - 10]} t="4 m" s={10.5} c={K_BLUE} />
  </>
));

const FIG_Q20 = (() => {
  const A: P2 = [55, 140];
  const B: P2 = [185, 140];
  const C: P2 = [120, 140 - 65 * Math.sqrt(3)];
  const F: P2 = [120, 140];
  return (
    <KFig>
      <KPoly p={[A, B, C]} fill="#e0e7ff" c={K_EDGE} w={2} />
      <KLine a={C} b={F} c={K_PURPLE} w={1.8} dash />
      <KRight v={F} p1={C} p2={B} r={9} />
      <KText p={[152, 151]} t="90 cm" s={10} c={K_BLUE} />
      <KText p={[kMid(B, C)[0] + 18, kMid(B, C)[1]]} t="90 cm" s={10} c={K_BLUE} />
      <KText p={[108, 100]} t="?" />
    </KFig>
  );
})();

const FIG_Q21 = (
  <KSolidFig
    verts={hexP.verts}
    faces={hexP.faces}
    extra={(P) => (
      <>
        <KLine a={P[3]} b={P[6]} c={K_RED} w={2.4} />
        <KText p={[kMid(P[3], P[6])[0], kMid(P[3], P[6])[1] - 10]} t="?" />
        <KText p={[kMid(P[3], P[4])[0] - 8, kMid(P[3], P[4])[1] + 11]} t="4 m" s={10} c={K_BLUE} />
        <KText p={[P[3][0] - 8, (P[3][1] + P[9][1]) / 2]} t="5 m" s={10} c={K_BLUE} a="end" />
      </>
    )}
  />
);

const FIG_Q22 = (
  <KSolidFig
    verts={hexP.verts}
    faces={hexP.faces}
    extra={(P) => (
      <>
        <KLine a={P[3]} b={P[7]} c={K_GREEN} w={2.4} />
        <KText p={[kMid(P[3], P[7])[0] - 4, kMid(P[3], P[7])[1] - 10]} t="?" />
        <KText p={[kMid(P[3], P[4])[0] - 8, kMid(P[3], P[4])[1] + 11]} t="4 m" s={10} c={K_BLUE} />
        <KText p={[P[3][0] - 8, (P[3][1] + P[9][1]) / 2]} t="5 m" s={10} c={K_BLUE} a="end" />
      </>
    )}
  />
);

const FIG_Q23 = (() => {
  const h = 45 * Math.sqrt(3);
  const rh: P3[] = [[0, 0, 0], [90, 0, 0], [135, h, 0], [45, h, 0]];
  const v: P3[] = [...rh, ...rh.map((p) => [p[0], p[1], 300] as P3)];
  const f = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
  return (
    <KSolidFig
      verts={v}
      faces={f}
      k={0.5}
      shade={[0]}
      extra={(P) => (
        <>
          <KLine a={P[0]} b={P[6]} c={K_RED} w={2.4} />
          <KText p={[kMid(P[0], P[6])[0] + 2, kMid(P[0], P[6])[1] - 11]} t="?" />
          <KText p={[kMid(P[0], P[1])[0], kMid(P[0], P[1])[1] + 11]} t="90" s={10} c={K_BLUE} />
          <KText p={[kMid(P[1], P[5])[0] + 14, kMid(P[1], P[5])[1] + 4]} t="300" s={10} c={K_BLUE} />
        </>
      )}
    />
  );
})();

const octaTop = (extra: (T: (p: [number, number]) => P2) => React.ReactNode) => {
  const s = 40;
  const T = (p: [number, number]): P2 => [60 + p[0] * s, 20 + p[1] * s];
  return (
    <KFig>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <KLine a={T([i, 0])} b={T([i, 3])} c="#cbd5e1" w={1} />
          <KLine a={T([0, i])} b={T([3, i])} c="#cbd5e1" w={1} />
        </g>
      ))}
      <KPoly p={OCTA.map(T)} fill="#e0e7ff" c={K_EDGE} w={2} op={0.8} />
      <circle cx={T([1, 0])[0]} cy={T([1, 0])[1]} r="3.5" fill={K_RED} />
      <KText p={[T([1, 0])[0] - 10, T([1, 0])[1] - 8]} t="A′" s={10.5} />
      {extra(T)}
    </KFig>
  );
};

const FIG_Q12 = octaTop(() => null);
const FIG_Q24 = octaTop((T) => (
  <>
    <KLine a={T([1, 0])} b={T([2, 3])} c={K_RED} w={2.4} />
    <KText p={[T([1.6, 1.5])[0] + 10, T([1.6, 1.5])[1]]} t="?" />
  </>
));

const FIG_Q28 = (() => {
  // 1 cm = 20 px; téglalap 8 × 3 cm, két 120°-os csúcsú háromszög a 3 cm-es oldalakon
  const h = 10 * Math.sqrt(3);
  const A: P2 = [40, 110];
  const B: P2 = [200, 110];
  const C: P2 = [200, 50];
  const D: P2 = [40, 50];
  const L: P2 = [40 - h, 80];
  const R: P2 = [200 + h, 80];
  return (
    <KFig>
      <KPoly p={[A, B, R, C, D, L]} fill="#fef3c7" c={K_EDGE} w={2} />
      <KLine a={A} b={D} c={K_HID} w={1.2} dash />
      <KLine a={B} b={C} c={K_HID} w={1.2} dash />
      <KAngle v={L} p1={A} p2={D} t="120°" r={9} tr={24} />
      <KText p={[120, 126]} t="8 cm" s={10} c={K_BLUE} />
      <KText p={[186, 84]} t="3 cm" s={10} c={K_BLUE} a="end" />
      <KText p={[120, 30]} t="M = 15 cm" s={10} c={K_PURPLE} />
    </KFig>
  );
})();

const PRISM_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pr-q1',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Milyen sokszögek a hasáb oldallapjai általában?',
    options: ['paralelogrammák', 'háromszögek', 'trapézok', 'mindig négyzetek'],
    correctAnswer: 0,
    explanation: 'A hasáb oldallapjai paralelogrammák, amelyeknek egy-egy párhuzamos oldalpárját az alaplap és a fedőlap megfelelő élei alkotják.'
  },
  {
    id: 'pr-q2',
    questionTypeBadge: 'Egyenes hasáb',
    level: 1,
    question: 'Milyenek az egyenes hasáb oldallapjai?',
    options: ['téglalapok', 'nem téglalap paralelogrammák', 'háromszögek', 'rombuszok'],
    correctAnswer: 0,
    explanation: 'Ha egy hasáb oldallapjai téglalapok, akkor a test egyenes hasáb; oldalélei merőlegesek az alaplap és a fedőlap síkjára.'
  },
  {
    id: 'pr-q3',
    questionTypeBadge: 'Elnevezés',
    level: 1,
    question: 'Mit nevezünk négyzetes oszlopnak?',
    options: ['a négyzet alapú egyenes hasábot', 'a négyzet alapú ferde hasábot', 'a négyzet alapú gúlát', 'bármely téglatestet'],
    correctAnswer: 0,
    explanation: 'A négyzet alapú egyenes hasábot négyzetes hasábnak vagy négyzetes oszlopnak nevezzük.'
  },
  {
    id: 'pr-q4',
    questionTypeBadge: 'Lapok száma',
    figure: FIG_HEX,
    level: 1,
    question: 'Hány lapja van egy hatszög alapú hasábnak?',
    options: ['8', '6', '12', '18'],
    correctAnswer: 0,
    explanation: 'Alaplap + fedőlap + 6 oldallap = 8 lap (n + 2).'
  },
  {
    id: 'pr-q5',
    questionTypeBadge: 'Élek száma',
    level: 1,
    question: 'Hány éle van egy ötszög alapú hasábnak?',
    options: ['15', '10', '7', '20'],
    correctAnswer: 0,
    explanation: '5 alapél + 5 fedőél + 5 oldalél = 15 él (3n).'
  },
  {
    id: 'pr-q6',
    questionTypeBadge: 'Fedőlap',
    level: 1,
    question: 'Hogyan kapjuk a hasáb fedőlapját az alaplapból?',
    options: [
      'párhuzamos eltolással (nem az alaplap síkjával párhuzamos irányban)',
      'középpontos tükrözéssel',
      'forgatással a test tengelye körül',
      'kicsinyítéssel'
    ],
    correctAnswer: 0,
    explanation: 'A fedőlap az alaplappal egybevágó sokszög, amelyet az alaplapból párhuzamos eltolással kapunk; az eltolás iránya nem párhuzamos az alaplap síkjával.'
  },
  {
    id: 'pr-q7',
    questionTypeBadge: 'Magasság',
    level: 1,
    question: 'Melyik hasáb testmagassága egyenlő az oldalél hosszával?',
    options: ['az egyenes hasábé', 'a ferde hasábé', 'minden hasábé', 'csak a kockáé'],
    correctAnswer: 0,
    explanation: 'Az egyenes hasáb oldalélei merőlegesek az alaplap síkjára, ezért a testmagasság az oldalél hosszával egyenlő. Ferde hasábnál a magasság kisebb.'
  },
  {
    id: 'pr-q8',
    questionTypeBadge: 'Elnevezés',
    level: 1,
    question: 'Mi a kocka a hasábok között?',
    options: ['olyan téglatest, amelynek élei egyenlő hosszúak', 'négyzet alapú ferde hasáb', 'olyan hasáb, amelynek csak az alaplapja négyzet', 'rombusz alapú egyenes hasáb'],
    correctAnswer: 0,
    explanation: 'A téglatest téglalap alapú egyenes hasáb; a kocka olyan téglatest, amelynek élei egyenlő hosszúak.'
  },
  {
    id: 'pr-q9',
    questionTypeBadge: 'Felismerés',
    level: 1,
    question: 'Melyik test NEM hasáb?',
    options: ['a négyzet alapú gúla', 'a kocka', 'a téglatest', 'a háromszög alapú egyenes hasáb'],
    correctAnswer: 0,
    explanation: 'A gúlának egyetlen alaplapja van, oldallapjai háromszögek – nincs vele egybevágó, párhuzamos fedőlapja.'
  },
  {
    id: 'pr-q10',
    questionTypeBadge: 'Bevezető test',
    figure: FIG_OCTA,
    level: 1,
    question: 'A bűvös kockából 4 sarokhasáb levágásával kapott nyolcszög alapú egyenes hasábnak hány csúcsa van?',
    options: ['16', '8', '24', '10'],
    correctAnswer: 0,
    explanation: 'Az alaplapnak és a fedőlapnak is 8-8 csúcsa van: 16 csúcs. (Éle 24, lapja 10.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'pr-q11',
    questionTypeBadge: 'Élek és lapok',
    level: 2,
    question: 'Hány éle és hány lapja van a nyolcszög alapú hasábnak?',
    options: ['24 él, 10 lap', '16 él, 10 lap', '24 él, 8 lap', '32 él, 10 lap'],
    correctAnswer: 0,
    explanation: '8 alapél + 8 fedőél + 8 oldalél = 24 él; 2 nyolcszöglap + 8 oldallap = 10 lap.'
  },
  {
    id: 'pr-q12',
    questionTypeBadge: 'Lapátlók',
    figure: FIG_Q12,
    level: 2,
    question: 'A nyolcszög alakú fedőlapon hány olyan átló van, amelynek egyik végpontja A′?',
    options: ['5', '8', '6', '3'],
    correctAnswer: 0,
    explanation: 'Egy n-szög egy csúcsából n − 3 átló indul (önmagába és a két szomszédba nem): 8 − 3 = 5.'
  },
  {
    id: 'pr-q13',
    questionTypeBadge: 'Testátlók',
    figure: FIG_HEX,
    level: 2,
    question: 'Hány testátlója van egy hatszög alapú hasábnak?',
    options: ['18', '9', '12', '6'],
    correctAnswer: 0,
    explanation: 'Minden alapcsúcsból n − 3 = 3 testátló indul a fedőlap nem szomszédos csúcsaiba: 6 · 3 = 18.'
  },
  {
    id: 'pr-q14',
    questionTypeBadge: 'Testátlók',
    level: 2,
    question: 'Hány testátlója van a szabályos hétszög alapú egyenes hasábnak?',
    options: ['28', '18', '14', '21'],
    correctAnswer: 0,
    explanation: 'n(n − 3) = 7 · 4 = 28. (A tankönyvi „18 testátló” állítás tehát hamis.)'
  },
  {
    id: 'pr-q15',
    questionTypeBadge: 'Lapátlók',
    level: 2,
    question: 'Hány lapátlója van egy háromszög alapú hasábnak?',
    options: ['6', '0', '3', '9'],
    correctAnswer: 0,
    explanation: 'A háromszöglapoknak nincs átlójuk, a 3 paralelogramma alakú oldallapnak 2-2 átlója van: 3 · 2 = 6.'
  },
  {
    id: 'pr-q16',
    questionTypeBadge: 'Testátlók',
    level: 2,
    question: 'Melyik hasábnak nincs testátlója?',
    options: ['a háromszög alapú hasábnak', 'a kockának', 'a négyzetes oszlopnak', 'az ötszög alapú hasábnak'],
    correctAnswer: 0,
    explanation: 'Háromszög alapú hasábban minden alapcsúcs a fedőlap minden csúcsával közös oldallapon van (n − 3 = 0), ezért nincs testátló.'
  },
  {
    id: 'pr-q17',
    questionTypeBadge: 'Ferde hasáb',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy ferde hasáb oldaléle 10 cm, és 60°-os szöget zár be az alaplap síkjával. Milyen magas a hasáb?',
    options: ['≈ 8,66 cm', '5 cm', '10 cm', '≈ 11,55 cm'],
    correctAnswer: 0,
    explanation: 'Az oldalél, a magasság és az oldalél vetülete derékszögű háromszöget alkot: M = 10 · sin 60° = 5√3 ≈ 8,66 cm.'
  },
  {
    id: 'pr-q18',
    questionTypeBadge: 'Négyzetes oszlop',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy négyzetes oszlop alapéle 3 cm, magassága 4 cm. Mekkora a testátlója?',
    options: ['√34 ≈ 5,83 cm', '5 cm', '3√2 ≈ 4,24 cm', '√41 ≈ 6,40 cm'],
    correctAnswer: 0,
    explanation: 'e = √(3² + 3² + 4²) = √34 ≈ 5,83 cm.'
  },
  {
    id: 'pr-q19',
    questionTypeBadge: 'Hatszög átlója',
    figure: FIG_Q19,
    level: 2,
    question: 'Mekkora a 4 m oldalú szabályos hatszög leghosszabb átlója?',
    options: ['8 m', '4√3 ≈ 6,93 m', '4 m', '12 m'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög 6 szabályos háromszögre bontható; a leghosszabb átló két oldalnyi: 2 · 4 = 8 m. (A rövidebb átló 4√3 ≈ 6,93 m.)'
  },
  {
    id: 'pr-q20',
    questionTypeBadge: 'Hirdetőoszlop',
    figure: FIG_Q20,
    level: 2,
    question: 'Egy szabályos háromszög alapú hirdetőoszlop alapéle 90 cm. Milyen magas, ha az oldallapján fekszik a talajon?',
    options: ['≈ 77,9 cm', '90 cm', '45 cm', '≈ 155,9 cm'],
    correctAnswer: 0,
    explanation: 'A magasság a 90 cm oldalú szabályos háromszög magassága: 90 · √3 / 2 = 45√3 ≈ 77,9 cm.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'pr-q21',
    questionTypeBadge: 'Testátló',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy szabályos hatszög alapú egyenes hasáb alapéle 4 m, magassága 5 m. Mekkora a leghosszabb merevítő rúd (testátló)?',
    options: ['√89 ≈ 9,43 m', '√73 ≈ 8,54 m', '√41 ≈ 6,40 m', '13 m'],
    correctAnswer: 0,
    explanation: 'A leghosszabb testátló a 8 m-es alaplap-átló és az 5 m-es magasság derékszögű háromszögének átfogója: √(64 + 25) = √89 ≈ 9,43 m.'
  },
  {
    id: 'pr-q22',
    questionTypeBadge: 'Testátló',
    figure: FIG_Q22,
    level: 3,
    question: 'Ugyanebben a hasábban (a = 4 m, M = 5 m) mekkora a rövidebb testátló?',
    options: ['√73 ≈ 8,54 m', '√89 ≈ 9,43 m', '4√3 ≈ 6,93 m', '9 m'],
    correctAnswer: 0,
    explanation: 'A rövidebb alaplap-átló 4√3 m, így a testátló √((4√3)² + 5²) = √(48 + 25) = √73 ≈ 8,54 m.'
  },
  {
    id: 'pr-q23',
    questionTypeBadge: 'Rombusz alapú hasáb',
    figure: FIG_Q23,
    level: 3,
    question: 'Két 90 cm alapélű, 300 cm hosszú szabályos háromszög alapú oszlopot oldallapjuk mentén összeillesztünk. Milyen távol van a kapott hasáb két legtávolabbi csúcsa?',
    options: ['≈ 338,1 cm', '≈ 349,9 cm', '≈ 313,2 cm', '≈ 155,9 cm'],
    correctAnswer: 0,
    explanation: 'Az alaplap 60°-os, 90 cm oldalú rombusz; hosszabb átlója 2 · 45√3 = 90√3 ≈ 155,9 cm. A legtávolabbi csúcsok: √(155,9² + 300²) = √114 300 ≈ 338,1 cm.',
    breakdown: ['rombusz hosszabb átlója: 90√3 ≈ 155,88 cm', 'testátló: √((90√3)² + 300²)', '√(24 300 + 90 000) ≈ 338,1 cm']
  },
  {
    id: 'pr-q24',
    questionTypeBadge: 'Nyolcszög átlói',
    figure: FIG_Q24,
    level: 3,
    question: 'A bevezető nyolcszögében (3 × 3-as négyzet, levágott 1 × 1-es sarkok) mekkora a leghosszabb A′-ből induló átló?',
    options: ['√10 ≈ 3,16', '3', '2√2 ≈ 2,83', '3√2 ≈ 4,24'],
    correctAnswer: 0,
    explanation: 'Rácson számolva A′-től a legtávolabbi csúcs 1 egységgel jobbra és 3 egységgel feljebb van: √(1² + 3²) = √10 ≈ 3,16. (3√2 a levágás előtti négyzet átlója lenne.)'
  },
  {
    id: 'pr-q25',
    questionTypeBadge: 'Nyolcszög testátlói',
    level: 3,
    question: 'A 3 egység magas nyolcszög alapú hasábban mekkora a leghosszabb A′-ből induló testátló?',
    options: ['√19 ≈ 4,36', '√18 ≈ 4,24', '√17 ≈ 4,12', '√27 ≈ 5,20'],
    correctAnswer: 0,
    explanation: 'A leghosszabb alaplap-átló √10, így a testátló √(10 + 3²) = √19 ≈ 4,36. (A √27 az eredeti kocka testátlója lenne, de annak csúcsait levágtuk.)'
  },
  {
    id: 'pr-q26',
    questionTypeBadge: 'Nyolcszög átlói',
    level: 3,
    question: 'A nyolcszög alakú alaplapnak összesen 20 átlója van. Hányféle hosszúság fordul elő ezek között?',
    options: ['4', '5', '2', '20'],
    correctAnswer: 0,
    explanation: 'A rácson az átlók hossza √5, 2√2, 3 vagy √10 lehet – 4-féle (8 db √5, 4-4 db a többi).'
  },
  {
    id: 'pr-q27',
    questionTypeBadge: 'Igaz–hamis',
    level: 3,
    question: 'Melyik állítás HAMIS?',
    options: [
      'A szabályos hétszög alapú egyenes hasábnak 18 testátlója van.',
      'Minden hasábnak páros számú lapátlója van.',
      'Van olyan hasáb, amelynek nincs testátlója.',
      'A hasáb oldaléle legalább olyan hosszú, mint a hasáb magassága.'
    ],
    correctAnswer: 0,
    explanation: 'A hétszög alapú hasábnak 7 · 4 = 28 testátlója van. A lapátlók száma n(n − 1), ami mindig páros; a háromszög alapú hasábnak nincs testátlója; az oldalél ≥ M.'
  },
  {
    id: 'pr-q28',
    questionTypeBadge: 'Csokoládésdoboz',
    figure: FIG_Q28,
    level: 3,
    question: 'A svájci csokoládé doboza egyenes hasáb, 15 cm magas; alaplapja egy 3 cm × 8 cm-es téglalapból és két egyenlő szárú, 120°-os szárszögű háromszögből áll (a háromszögek alapja a 3 cm-es oldal). Legfeljebb milyen hosszú kötőtű fér el teljes hosszában a dobozban (egy tizedesre)?',
    options: ['≈ 17,9 cm', '≈ 17,3 cm', '17,0 cm', '≈ 9,7 cm'],
    correctAnswer: 0,
    explanation: 'A háromszögek magassága 1,5 / tg 60° = √3/2 ≈ 0,87 cm, így az alaplap leghosszabb átlója a két 120°-os csúcs távolsága: 8 + √3 ≈ 9,73 cm. A leghosszabb testátló: √(9,73² + 15²) ≈ √319,7 ≈ 17,9 cm.'
  },
  {
    id: 'pr-q29',
    questionTypeBadge: 'Testátlók',
    level: 3,
    question: 'Egy hasábnak 54 testátlója van. Hány oldalú az alaplapja?',
    options: ['9', '6', '12', '8'],
    correctAnswer: 0,
    explanation: 'n(n − 3) = 54 ⇒ n² − 3n − 54 = 0 ⇒ n = 9 (a negatív gyök nem jó). Ellenőrzés: 9 · 6 = 54.'
  },
  {
    id: 'pr-q30',
    questionTypeBadge: 'Ferde hasáb',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy ferde hasáb oldaléle 12 cm, magassága 6 cm. Mekkora szöget zár be az oldalél az alaplap síkjával?',
    options: ['30°', '60°', '45°', '≈ 26,6°'],
    correctAnswer: 0,
    explanation: 'sin α = M / oldalél = 6 / 12 = 0,5 ⇒ α = 30°.'
  }
];

export const PrismQuiz: React.FC<{
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
      topicId="g12-ter-hasab-quiz"
      subtopicId="a-hasab"
      title="2. A hasáb – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a hasáb részei és fajtái, csúcsok, élek, lapok, lapátlók és testátlók."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={PRISM_QUESTIONS}
      cheatSheets={[
        {
          title: 'A hasáb részei',
          items: [
            'Alaplap ≅ fedőlap (párhuzamos eltolással), oldallapok: paralelogrammák.',
            'Alapél, fedőél, oldalél; az oldalélek egyenlők és párhuzamosak.',
            'Testmagasság (M): az alap- és fedőlap síkjának távolsága.',
            'Egyenes hasáb: téglalap oldallapok, M = oldalél.'
          ]
        },
        {
          title: 'Fajták',
          items: [
            'Ferde hasáb: M < oldalél.',
            'Négyzetes oszlop: négyzet alapú egyenes hasáb.',
            'Téglatest: téglalap alapú egyenes hasáb.',
            'Kocka: egyenlő élű téglatest.'
          ]
        },
        {
          title: 'n-oldalú hasáb',
          items: [
            '2n csúcs, 3n él, n + 2 lap (Euler: c − é + l = 2).',
            'Lapátlók: n(n − 1), testátlók: n(n − 3).',
            'Egyenes hasáb testátlója: √(d² + M²), d alaplap-átló.',
            'Szabályos hatszög átlói: a√3 és 2a.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PrismMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PrismSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PrismQuiz;
