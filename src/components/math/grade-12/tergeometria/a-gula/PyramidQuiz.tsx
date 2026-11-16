import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PyramidMatcher } from './PyramidMatcher';
import { PyramidSorter } from './PyramidSorter';
import {
  QFig,
  Txt,
  Seg,
  Poly,
  RightMark,
  AngleArc,
  PolyBody,
  polyhedron,
  pyramidSolid,
  mid2,
  away2,
  SK,
  P2,
  P3,
  PyrQ
} from './SolidSketch';

// ---------------------------------------------------------------------------
// Kérdésábrák (szabályos gúla ferde vetítésben, takart élek szaggatottak)
// ---------------------------------------------------------------------------
/** Szabályos tetraéder, AB él F felezőpontjával. */
const TetraQ: React.FC<{ edge: string; mode: 'dihedral' | 'height' | 'edgeAngle' }> = ({ edge, mode }) => {
  const t = pyramidSolid(3, 1, Math.sqrt(2));
  const g = polyhedron(t.verts, t.faces, { x: 60, y: 18, w: 120, h: 118 });
  const [A, B, C, D] = g.pts;
  const F = mid2(A, B);
  const O = g.P([0, 0, 0]);
  return (
    <QFig>
      <PolyBody g={g} />
      {mode === 'dihedral' && (
        <>
          <Seg a={D} b={F} color={SK.blue} w={1.6} />
          <Seg a={C} b={F} color={SK.blue} dash w={1.3} />
          <AngleArc v={F} p1={C} p2={D} t="?" r={13} tr={22} />
        </>
      )}
      {mode === 'height' && (
        <>
          <Seg a={D} b={O} color={SK.red} dash w={1.5} />
          <Seg a={O} b={C} color={SK.aux} dash w={1.2} />
          <RightMark v={O} p1={D} p2={C} r={8} />
          <Txt p={[O[0] - 5, (D[1] + O[1]) / 2 + 4]} t="M = ?" anchor="end" />
        </>
      )}
      {mode === 'edgeAngle' && (
        <>
          <Seg a={D} b={O} color={SK.red} dash w={1.3} />
          <Seg a={O} b={B} color={SK.aux} dash w={1.2} />
          <Seg a={D} b={B} color={SK.green} w={2.2} />
          <AngleArc v={B} p1={O} p2={D} t="?" r={13} tr={23} />
        </>
      )}
      <Txt p={away2(A, g.center2, 9)} t="A" size={10} />
      <Txt p={away2(B, g.center2, 9)} t="B" size={10} />
      <Txt p={away2(C, g.center2, 9)} t="C" size={10} />
      <Txt p={[D[0], D[1] - 8]} t="D" size={10} />
      <Txt p={[F[0], F[1] + 11]} t={edge} size={10} />
    </QFig>
  );
};

/** Derékszögű háromszög alapú gúla: a derékszögű csúcsból merőleges 12 cm-es oldalél. */
const RightBaseQ: React.FC<{ mark: 'face' | 'edge' }> = ({ mark }) => {
  const C: P3 = [0, 0, 0];
  const A: P3 = [12, 0, 0];
  const B: P3 = [0, 0, 5];
  const D: P3 = [0, 12, 0];
  const g = polyhedron([A, B, C, D], [[0, 1, 2], [0, 1, 3], [1, 2, 3], [0, 2, 3]], { x: 50, y: 16, w: 140, h: 118 });
  const [pA, pB, pC, pD] = g.pts;
  return (
    <QFig>
      {mark === 'face' && <Poly p={[pA, pB, pD]} fill="rgba(220,38,38,0.16)" color="none" w={0} />}
      <PolyBody g={g} />
      {mark === 'edge' && <Seg a={pA} b={pD} color={SK.red} w={2.4} />}
      <RightMark v={pC} p1={pA} p2={pB} r={9} />
      <RightMark v={pC} p1={pD} p2={pA} r={9} />
      <Txt p={[(pC[0] + pA[0]) / 2, pC[1] + 11]} t="12 cm" size={10} />
      <Txt p={[(pC[0] + pB[0]) / 2 - 12, (pC[1] + pB[1]) / 2 - 4]} t="5 cm" size={10} />
      <Txt p={[pC[0] - 6, (pC[1] + pD[1]) / 2]} t="12 cm" size={10} anchor="end" />
      {mark === 'edge' && <Txt p={[(pA[0] + pD[0]) / 2 + 8, (pA[1] + pD[1]) / 2 - 4]} t="?" anchor="start" />}
      {mark === 'face' && <Txt p={[(pA[0] + pB[0] + pD[0]) / 3 + 6, (pA[1] + pB[1] + pD[1]) / 3 + 4]} t="T = ?" size={10} />}
    </QFig>
  );
};

/** Szabályos négyoldalú gúla tengelymetszete (két szemközti oldallap magasságán át). */
const SectionQ: React.FC = () => {
  const E: P2 = [120, 22];
  const L: P2 = [70, 134];
  const R: P2 = [170, 134];
  const F: P2 = [120, 134];
  return (
    <QFig>
      <Poly p={[L, R, E]} fill="rgba(37,99,235,0.1)" color={SK.blue} />
      <Seg a={E} b={F} color={SK.red} dash w={1.5} />
      <RightMark v={F} p1={E} p2={R} r={9} />
      <AngleArc v={E} p1={L} p2={R} t="?" r={18} tr={30} />
      <Txt p={[F[0] - 5, 84]} t="12" anchor="end" color={SK.red} />
      <Txt p={[120, 146]} t="a = 10" size={10.5} />
      <Txt p={[190, 82]} t="két szemközti" size={9} color={SK.aux} />
      <Txt p={[190, 93]} t="oldallap szöge" size={9} color={SK.aux} />
    </QFig>
  );
};

export const PYRAMID_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pyr-q1',
    level: 1,
    questionTypeBadge: 'Lapok száma',
    question: 'Hány lapja van egy hatoldalú gúlának?',
    options: ['7', '6', '12', '8'],
    correctAnswer: 0,
    explanation: 'Egy alaplap (hatszög) és annyi háromszög, ahány oldalú az alaplap: 1 + 6 = 7 lap.'
  },
  {
    id: 'pyr-q2',
    level: 1,
    questionTypeBadge: 'Élek száma',
    question: 'Hány éle van egy ötoldalú gúlának?',
    options: ['10', '6', '5', '15'],
    correctAnswer: 0,
    explanation: 'Az alaplapnak 5 éle van, és a csúcsból 5 oldalél indul: 5 + 5 = 10 él (általában 2n).'
  },
  {
    id: 'pyr-q3',
    level: 1,
    questionTypeBadge: 'Csúcsok száma',
    question: 'Hány csúcsa van egy nyolcoldalú gúlának?',
    options: ['9', '8', '16', '10'],
    correctAnswer: 0,
    explanation: 'Az alaplap 8 csúcsa és a gúla csúcsa: 8 + 1 = 9.'
  },
  {
    id: 'pyr-q4',
    level: 1,
    questionTypeBadge: 'Tetraéder',
    question: 'Mit nevezünk tetraédernek?',
    options: ['A háromoldalú gúlát', 'A négyoldalú gúlát', 'A négyzet alapú szabályos gúlát', 'A négy egyenlő élű hasábot'],
    correctAnswer: 0,
    explanation: 'A háromoldalú gúlának az alaplappal együtt 4 lapja van; görög eredetű neve tetraéder. Bármelyik lapja tekinthető alaplapnak.'
  },
  {
    id: 'pyr-q5',
    level: 1,
    questionTypeBadge: 'Szabályos gúla',
    question: 'Mikor nevezünk egy gúlát szabályos gúlának?',
    options: [
      'Ha alaplapja szabályos sokszög, és minden oldaléle egyenlő hosszú',
      'Ha minden lapja szabályos háromszög',
      'Ha az alaplapja négyzet',
      'Ha a magassága egyenlő az alapélével'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv definíciója: szabályos az alaplap, és az oldalélek egyenlők. (A minden lapján szabályos háromszög a szabályos tetraéder.)'
  },
  {
    id: 'pyr-q6',
    level: 1,
    questionTypeBadge: 'Testmagasság',
    question: 'Mit nevezünk a gúla testmagasságának?',
    options: [
      'A gúla csúcsának az alapsíktól való távolságát',
      'Az oldallap alapélhez tartozó magasságát',
      'A leghosszabb oldalél hosszát',
      'A csúcs és egy alapcsúcs távolságát'
    ],
    correctAnswer: 0,
    explanation: 'A testmagasság (M) a csúcs és az alaplap síkjának távolsága. Az oldallap magassága (mₒ) ettől különböző szakasz.'
  },
  {
    id: 'pyr-q7',
    level: 1,
    questionTypeBadge: 'Oldallap magassága',
    figure: <PyrQ n={4} h={0.9} l={{ edge: 'a = 6 cm', M: 'M = 4', mo: 'mₒ = ?' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 6 cm, magassága 4 cm. Mekkora az oldallap magassága?',
    options: ['5 cm', '√52 ≈ 7,2 cm', '√34 ≈ 5,8 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'A magasság, a fél alapél (3 cm) és az oldallap magassága derékszögű háromszöget alkot: mₒ = √(4² + 3²) = 5 cm.'
  },
  {
    id: 'pyr-q8',
    level: 1,
    questionTypeBadge: 'Testmagasság',
    figure: <PyrQ n={4} h={1.6} l={{ edge: 'a = 10 cm', M: 'M = ?', mo: 'mₒ = 13' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 10 cm, oldallapjának magassága 13 cm. Mekkora a gúla magassága?',
    options: ['12 cm', '√69 ≈ 8,3 cm', '√194 ≈ 13,9 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'M = √(mₒ² − (a/2)²) = √(169 − 25) = √144 = 12 cm.'
  },
  {
    id: 'pyr-q9',
    level: 1,
    questionTypeBadge: 'Oldalél',
    question: 'Egy szabályos négyoldalú gúla oldallapjának magassága 12 cm, alapéle 10 cm. Milyen hosszú az oldalél?',
    options: ['13 cm', '√119 ≈ 10,9 cm', '√244 ≈ 15,6 cm', '17 cm'],
    correctAnswer: 0,
    explanation: 'Az oldallap fele derékszögű háromszög: b = √(mₒ² + (a/2)²) = √(144 + 25) = 13 cm.'
  },
  {
    id: 'pyr-q10',
    level: 1,
    questionTypeBadge: 'Szabályos tetraéder',
    question: 'Milyen lapok határolják a szabályos tetraédert?',
    options: ['4 egybevágó szabályos háromszög', '3 háromszög és egy négyzet', '4 egyenlő szárú derékszögű háromszög', '6 egybevágó háromszög'],
    correctAnswer: 0,
    explanation: 'A szabályos tetraéder olyan szabályos háromoldalú gúla, amelynek mind a 4 lapja szabályos háromszög.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'pyr-q11',
    level: 2,
    questionTypeBadge: 'Oldallap hajlásszöge',
    figure: <PyrQ n={4} h={0.75} l={{ edge: 'a = 8 cm', M: 'M = 3', beta: '?' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 8 cm, magassága 3 cm. Mekkora szöget zár be az oldallap az alaplappal?',
    options: ['≈ 36,9°', '≈ 27,9°', '≈ 53,1°', '≈ 20,6°'],
    correctAnswer: 0,
    explanation: 'tg β = M / (a/2) = 3 / 4 = 0,75 ⇒ β ≈ 36,9°. (A 27,9° az oldalél szöge lenne: tg α = 3 / (4√2).)'
  },
  {
    id: 'pyr-q12',
    level: 2,
    questionTypeBadge: 'Magasság oldalélből',
    figure: <PyrQ n={4} h={1.24} l={{ edge: 'a = 8 cm', M: 'M = ?', b: 'b = 9', R: 'R' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 8 cm, oldaléle 9 cm. Milyen magas a gúla?',
    options: ['7 cm', '√65 ≈ 8,1 cm', '√17 ≈ 4,1 cm', '√113 ≈ 10,6 cm'],
    correctAnswer: 0,
    explanation: 'A magasság talppontja a négyzet középpontja, R = a√2/2 = 4√2 ≈ 5,66 cm. M = √(81 − 32) = √49 = 7 cm.'
  },
  {
    id: 'pyr-q13',
    level: 2,
    questionTypeBadge: 'Hatoldalú gúla',
    figure: <PyrQ n={6} h={0.45} l={{ edge: 'a = 12 cm', M: 'M = ?', b: 'b = 13' }} />,
    question: 'Egy szabályos hatoldalú gúla alapéle 12 cm, oldaléle 13 cm. Mekkora a gúla magassága?',
    options: ['5 cm', '√133 ≈ 11,5 cm', '√61 ≈ 7,8 cm', '1 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög köré írt körének sugara az alapél: R = 12 cm. M = √(13² − 12²) = √25 = 5 cm.'
  },
  {
    id: 'pyr-q14',
    level: 2,
    questionTypeBadge: 'Oldalél hajlásszöge',
    figure: <PyrQ n={6} h={0.45} l={{ edge: 'a = 12 cm', M: 'M = 5', alpha: '?' }} />,
    question: 'Egy szabályos hatoldalú gúla alapéle 12 cm, magassága 5 cm. Mekkora szöget zár be az oldalél az alaplappal?',
    options: ['≈ 22,6°', '≈ 25,7°', '≈ 67,4°', '≈ 24,6°'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete az alapsíkon R = a = 12 cm, így tg α = 5 / 12 ⇒ α ≈ 22,6°. (25,7° az oldallap szöge: tg β = 5 / (6√3).)'
  },
  {
    id: 'pyr-q15',
    level: 2,
    questionTypeBadge: 'Kheopsz-piramis',
    question: 'A Kheopsz-piramis alapéle 232,4 m, magassága 146,7 m. Körülbelül mennyi az oldallap magasságának és a fél alapélnek a hányadosa?',
    options: ['1,61', '1,26', '0,63', '2,00'],
    correctAnswer: 0,
    explanation: 'mₒ = √(146,7² + 116,2²) ≈ 187,1 m, így mₒ : 116,2 ≈ 1,61 – közel az aranymetszés arányszámához (1,618).'
  },
  {
    id: 'pyr-q16',
    level: 2,
    questionTypeBadge: 'Háromoldalú gúla',
    figure: <PyrQ n={3} h={1.8} l={{ edge: 'a = 6 cm', M: 'M = 4', mo: 'mₒ = ?', rho: 'ρ' }} />,
    question: 'Egy szabályos háromoldalú gúla alapéle 6 cm, magassága 4 cm. Mekkora az oldallapok magassága?',
    options: ['√19 ≈ 4,36 cm', '5 cm', '√28 ≈ 5,29 cm', '√17 ≈ 4,12 cm'],
    correctAnswer: 0,
    explanation: 'A beírt kör sugara ρ = a√3/6 = √3 ≈ 1,73 cm. mₒ = √(M² + ρ²) = √(16 + 3) = √19 ≈ 4,36 cm.'
  },
  {
    id: 'pyr-q17',
    level: 2,
    questionTypeBadge: 'Szabályos oldallapok',
    question: 'Egy szabályos négyoldalú gúla oldallapjai szabályos háromszögek, alaplapjának területe 100 cm². Mekkora a gúla magassága?',
    options: ['5√2 ≈ 7,07 cm', '5√3 ≈ 8,66 cm', '10 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'a = 10 cm, minden él 10 cm. R = 5√2 cm, M = √(10² − (5√2)²) = √50 = 5√2 ≈ 7,07 cm. (8,66 cm az oldallap magassága.)'
  },
  {
    id: 'pyr-q18',
    level: 2,
    questionTypeBadge: 'Tetraéder magassága',
    figure: <TetraQ edge="6 cm" mode="height" />,
    question: 'Mekkora a 6 cm élű szabályos tetraéder magassága?',
    options: ['≈ 4,90 cm', '≈ 5,20 cm', '≈ 3,46 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A talppont a szabályos háromszög középpontja: R = a√3/3 = 2√3 ≈ 3,46 cm. M = √(36 − 12) = √24 ≈ 4,90 cm. (5,20 cm a lap magassága.)'
  },
  {
    id: 'pyr-q19',
    level: 2,
    questionTypeBadge: 'Alapél szögből',
    figure: <PyrQ n={4} h={1} l={{ edge: 'a = ?', M: 'M = 4', beta: '45°' }} />,
    question: 'Egy szabályos négyoldalú gúla magassága 4 cm, oldallapjai 45°-os szöget zárnak be az alaplappal. Mekkora az alapéle?',
    options: ['8 cm', '4 cm', '4√2 ≈ 5,66 cm', '8√2 ≈ 11,3 cm'],
    correctAnswer: 0,
    explanation: 'A 45°-os derékszögű háromszög egyenlő szárú: a/2 = M = 4 cm, tehát a = 8 cm.'
  },
  {
    id: 'pyr-q20',
    level: 2,
    questionTypeBadge: 'Hatoldalú gúla',
    figure: <PyrQ n={6} h={1} l={{ edge: 'a = ?', b: 'b = 7√2', alpha: '45°' }} />,
    question: 'Egy szabályos hatoldalú gúla oldaléle 7√2 egység, és 45°-os szöget zár be az alaplappal. Mekkora az alapél?',
    options: ['7 egység', '7√2 egység', '14 egység', '7√3/2 egység'],
    correctAnswer: 0,
    explanation: 'R = 7√2 · cos 45° = 7. A szabályos hatszögben a köré írt kör sugara egyenlő az oldallal, így a = 7.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'pyr-q21',
    level: 3,
    questionTypeBadge: 'Lapok hajlásszöge',
    figure: <TetraQ edge="8 cm" mode="dihedral" />,
    question: 'Mekkora szöget zárnak be egymással a 8 cm élű szabályos tetraéder lapjai?',
    options: ['≈ 70,5°', '60°', '≈ 54,7°', '≈ 109,5°'],
    correctAnswer: 0,
    explanation: 'Az AB él felezőpontjából a két lapon húzott magasság 4√3 cm. Koszinusztétellel: 64 = 48 + 48 − 96 cos φ ⇒ cos φ = 1/3 ⇒ φ ≈ 70,5°.'
  },
  {
    id: 'pyr-q22',
    level: 3,
    questionTypeBadge: 'Kheopsz-piramis',
    figure: <PyrQ n={4} h={1.26} l={{ edge: '232,4 m', M: '146,7 m', alpha: '?' }} />,
    question: 'A Kheopsz-piramis alapéle 232,4 m, magassága 146,7 m. Mekkora szöget zár be az oldalél az alaplappal?',
    options: ['≈ 41,8°', '≈ 51,6°', '≈ 32,3°', '≈ 38,4°'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete a fél átló: R = 116,2·√2 ≈ 164,3 m. tg α = 146,7 / 164,3 ≈ 0,893 ⇒ α ≈ 41,8°. (51,6° az oldallap szöge.)'
  },
  {
    id: 'pyr-q23',
    level: 3,
    questionTypeBadge: 'Legnagyobb lap',
    figure: <RightBaseQ mark="face" />,
    question:
      'Egy gúla alapja 5 cm és 12 cm befogójú derékszögű háromszög. A 12 cm-es oldalél a derékszögű csúcsból indul, és merőleges az alaplapra. Mekkora a gúla legnagyobb területű lapja?',
    options: ['≈ 83,6 cm²', '72 cm²', '30 cm²', '78 cm²'],
    correctAnswer: 0,
    explanation:
      'A ferde lap oldalai: √(12² + 5²) = 13, az alap átfogója 13 és √(12² + 12²) = 12√2 ≈ 16,97 cm. Egyenlő szárú háromszög: magassága √(169 − 72) = √97, területe 6√2 · √97 ≈ 83,6 cm² – nagyobb, mint a 72 cm²-es derékszögű lap.'
  },
  {
    id: 'pyr-q24',
    level: 3,
    questionTypeBadge: 'Ismeretlen él',
    figure: <RightBaseQ mark="edge" />,
    question: 'Az előző gúlában (befogók 5 és 12 cm, a derékszögű csúcsból merőleges 12 cm-es oldalél) milyen hosszú a leghosszabb él?',
    options: ['12√2 ≈ 16,97 cm', '13 cm', '√313 ≈ 17,7 cm', '17 cm'],
    correctAnswer: 0,
    explanation: 'Az élek: 5, 12, 13 (alap), 12 (merőleges), √(12² + 5²) = 13 és √(12² + 12²) = 12√2 ≈ 16,97 cm. A leghosszabb 12√2 cm.'
  },
  {
    id: 'pyr-q25',
    level: 3,
    questionTypeBadge: 'Alapél szögből',
    figure: <PyrQ n={4} h={0.77} l={{ edge: 'a = ?', M: 'M = 8', beta: '57°' }} />,
    question: 'Egy szabályos négyoldalú gúla magassága 8 cm, oldallapjai 57°-os szöget zárnak be az alaplap síkjával. Mekkora az alapéle?',
    options: ['≈ 10,39 cm', '≈ 5,20 cm', '≈ 24,64 cm', '≈ 7,35 cm'],
    correctAnswer: 0,
    explanation: 'tg 57° = M / (a/2) ⇒ a/2 = 8 / tg 57° ≈ 5,195 cm ⇒ a ≈ 10,39 cm.'
  },
  {
    id: 'pyr-q26',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás HAMIS?',
    options: [
      'Van olyan gúla, amelynek van testátlója.',
      'A gúla magassága nem lehet hosszabb egyetlen oldalélénél sem.',
      'Egy oldallapon a két oldalél felezőpontját összekötő szakasz az alapél fele.',
      'Szabályos tízoldalú gúla alaplapjának területe kisebb, mint az oldallapok területeinek összege.'
    ],
    correctAnswer: 0,
    explanation:
      'A gúla bármely két csúcsát él vagy alaplapon fekvő átló köti össze, ezért nincs testátlója. A magasság merőleges szakasz, így legfeljebb akkora, mint bármely oldalél; a felezőpontokat összekötő szakasz középvonal; az oldallapok vetülete éppen az alaplap, és minden oldallap nagyobb a vetületénél.'
  },
  {
    id: 'pyr-q27',
    level: 3,
    questionTypeBadge: 'Hatoldalú gúla',
    figure: <PyrQ n={6} h={1.5} l={{ edge: 'a = 4 cm', M: 'M = ?', beta: '60°', rho: 'ρ' }} />,
    question: 'Egy szabályos hatoldalú gúla alapéle 4 cm, oldallapjai 60°-os szöget zárnak be az alaplappal. Milyen magas a gúla?',
    options: ['6 cm', '4√3 ≈ 6,93 cm', '2√3 ≈ 3,46 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'A hatszög beírt körének sugara ρ = a√3/2 = 2√3 cm. M = ρ · tg 60° = 2√3 · √3 = 6 cm. (4√3 a köré írt körrel, R = 4 cm-rel számolva jönne ki.)'
  },
  {
    id: 'pyr-q28',
    level: 3,
    questionTypeBadge: 'Szemközti oldallapok',
    figure: <SectionQ />,
    question: 'Egy szabályos négyoldalú gúla alapéle 10 cm, magassága 12 cm. Mekkora szöget zár be egymással két szemközti oldallap síkja?',
    options: ['≈ 45,2°', '≈ 22,6°', '≈ 134,8°', '≈ 61,9°'],
    correctAnswer: 0,
    explanation: 'A két szemközti oldallap magasságán átmenő metszet egyenlő szárú háromszög (alap 10, magasság 12). Félszöge: tg = 5 / 12 ⇒ 22,6°, a teljes szög ≈ 45,2°.'
  },
  {
    id: 'pyr-q29',
    level: 3,
    questionTypeBadge: 'Háromoldalú gúla',
    figure: <PyrQ n={3} h={1.73} l={{ edge: 'a = ?', b: 'b = 10', alpha: '60°', M: 'M' }} />,
    question: 'Egy szabályos háromoldalú gúla oldaléle 10 cm, és 60°-os szöget zár be az alaplappal. Mekkora az alapél?',
    options: ['5√3 ≈ 8,66 cm', '5 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete R = 10 · cos 60° = 5 cm (a köré írt kör sugara). Szabályos háromszögben R = a√3/3 ⇒ a = R√3 = 5√3 ≈ 8,66 cm.'
  },
  {
    id: 'pyr-q30',
    level: 3,
    questionTypeBadge: 'Tetraéder élszöge',
    figure: <TetraQ edge="a" mode="edgeAngle" />,
    question: 'Mekkora szöget zár be a szabályos tetraéder egyik oldaléle az alaplap síkjával?',
    options: ['≈ 54,7°', '60°', '≈ 70,5°', '≈ 35,3°'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete R = a√3/3, így cos α = R / a = 1/√3 ⇒ α ≈ 54,7°. (70,5° a lapok hajlásszöge.)'
  }
];

export const PyramidQuiz: React.FC<{
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
      topicId="g12-ter-gula-quiz"
      subtopicId="a-gula"
      title="10. A gúla – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a gúla részei, szabályos gúla és tetraéder, derékszögű háromszögek, hajlásszögek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={PYRAMID_QUESTIONS}
      cheatSheets={[
        {
          title: 'A gúla részei',
          items: [
            'n oldalú gúla: n + 1 lap, 2n él, n + 1 csúcs',
            'Szabályos gúla: szabályos alaplap + egyenlő oldalélek',
            'Tetraéder = háromoldalú gúla; szabályos tetraéder: 4 szabályos háromszög',
            'A gúlának nincs testátlója'
          ]
        },
        {
          title: 'Derékszögű háromszögek',
          items: [
            'M² + ρ² = mₒ² (ρ: beírt kör sugara)',
            'M² + R² = b² (R: köré írt kör sugara)',
            'mₒ² + (a/2)² = b²',
            'Négyzet: ρ = a/2, R = a√2/2; hatszög: ρ = a√3/2, R = a; szab. háromszög: ρ = a√3/6, R = a√3/3'
          ]
        },
        {
          title: 'Hajlásszögek',
          items: [
            'Oldalél–alaplap: tg α = M / R',
            'Oldallap–alaplap: tg β = M / ρ, és β > α',
            'Szabályos tetraéder: lapszög ≈ 70,5° (cos φ = 1/3), élszög ≈ 54,7°',
            'Kheopsz: α ≈ 41,8°, β ≈ 51,6°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PyramidMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PyramidSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PyramidQuiz;
