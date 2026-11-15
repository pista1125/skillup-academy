import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { VectorScalarMatcher } from './VectorScalarMatcher';
import { VectorScalarSorter } from './VectorScalarSorter';
import { VectorScalarGrid, CubeVectorsSvg, HexagonDiagonalSvg, GP } from './VectorScalarFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#d97706';

const DE_FIG = (
  <VectorScalarGrid
    cols={9}
    rows={4}
    cell={26}
    className={FIG}
    vectors={[
      { from: [0.5, 3.5], to: [3.5, 1.5], label: 'd', color: RED, side: 1 },
      { from: [7.5, 3.5], to: [4.5, 1.5], label: 'e', color: AMBER, side: -1 },
      { from: [7.5, 0.5], to: [8.5, 0.5], label: 'i', color: '#0f172a', side: -1 },
      { from: [7.5, 0.5], to: [7.5, 1.5], label: 'j', color: '#0f172a', side: 1 }
    ]}
  />
);

const UV_FIG = (
  <VectorScalarGrid
    cols={6}
    rows={5}
    cell={30}
    grid={false}
    className={FIG}
    rightAngles={[{ at: [1, 1], p: [4, 1], q: [1, 5] }]}
    vectors={[
      { from: [1, 1], to: [4, 1], label: 'u', color: BLUE, side: 1 },
      { from: [1, 1], to: [1, 5], label: 'v', color: GREEN, side: 1 }
    ]}
    texts={[
      { at: [2.5, 0.25], text: '24 mm', color: BLUE },
      { at: [1.3, 3], text: '32 mm', color: GREEN, anchor: 'start' }
    ]}
  />
);

const PAR_PTS: GP[] = [[1, 1], [7, 1], [10, 5], [4, 5]];
const parFig = (from: GP) => (
  <VectorScalarGrid
    cols={11}
    rows={6}
    cell={24}
    grid={false}
    className={FIG}
    polygons={[{ pts: PAR_PTS, stroke: '#94a3b8', fill: 'rgba(37,99,235,0.05)' }]}
    vectors={[
      { from: [1, 1], to: [7, 1], label: 'a', color: BLUE, side: -1 },
      { from: [1, 1], to: [4, 5], label: 'b', color: GREEN, side: 1 },
      { from, to: [5.5, 3], label: '?', color: RED, side: -1, dashed: true, plain: true }
    ]}
    points={[{ at: [5.5, 3], label: 'O', dx: 0, dy: -9 }]}
  />
);

export const VECTOR_SCALAR_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A definíció (1–10)
  {
    id: 'vc-q1',
    level: 1,
    questionTypeBadge: 'Hossz',
    question: '|→a| = 2 cm. Milyen hosszú a 3→a vektor?',
    options: ['6 cm', '5 cm', '2 cm', '1,5 cm'],
    correctAnswer: 0,
    explanation: 'A λ · →a hossza |→a| |λ|-szorosa: |3→a| = 3 · 2 cm = 6 cm.'
  },
  {
    id: 'vc-q2',
    level: 1,
    questionTypeBadge: 'Irány',
    question: 'Milyen irányú λ · →a, ha λ < 0 és →a ≠ →0?',
    options: ['Ellentétes irányú →a-val', 'Egyirányú →a-val', 'Merőleges →a-ra', 'Tetszőleges irányú'],
    correctAnswer: 0,
    explanation: 'Negatív szorzónál a számszoros párhuzamos →a-val, de ellentétes irányú. Tetszőleges irány csak λ = 0 esetén van (nullvektor).'
  },
  {
    id: 'vc-q3',
    level: 1,
    questionTypeBadge: 'Nullvektor',
    question: 'Mivel egyenlő 0 · →a?',
    options: ['→0 (a nullvektorral)', 'A 0 számmal', '→a-val', '−→a-val'],
    correctAnswer: 0,
    explanation: 'Vektor számszorosa mindig vektor: 0 · →a = →0. A „0 · →a = 0” (szám) felírás hibás.'
  },
  {
    id: 'vc-q4',
    level: 1,
    questionTypeBadge: 'Ellentett',
    question: 'Mivel egyenlő (−1) · →a?',
    options: ['−→a, az →a ellentettjével', '→a-val', '→0-val', 'A −1 számmal'],
    correctAnswer: 0,
    explanation: 'λ = −1 esetén a számszoros ugyanolyan hosszú, de ellentétes irányú: (−1) · →a = −→a.'
  },
  {
    id: 'vc-q5',
    level: 1,
    questionTypeBadge: 'Számszoros a rácson',
    figure: (
      <VectorScalarGrid
        cols={13}
        rows={6}
        cell={22}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [3, 2], label: 'a', color: RED, side: 1 },
          { from: [4, 1], to: [8, 3], label: 'p', color: BLUE, side: 1 },
          { from: [12, 3], to: [8, 1], label: 'q', color: BLUE, side: 1 },
          { from: [1, 3], to: [4, 4.5], label: 'r', color: BLUE, side: 1 },
          { from: [8, 4.5], to: [11, 5.5], label: 's', color: BLUE, side: -1 }
        ]}
      />
    ),
    question: 'Melyik kék vektor egyenlő 2→a-val?',
    options: ['→p', '→q', '→r', '→s'],
    correctAnswer: 0,
    explanation: '2→a egyirányú →a-val és kétszer olyan hosszú: 4 egység jobbra, 2 fel – ez →p. →q = −2→a (ellentétes irányú), →r = 1,5→a, →s nem párhuzamos →a-val.'
  },
  {
    id: 'vc-q6',
    level: 1,
    questionTypeBadge: 'Számszoros a rácson',
    figure: (
      <VectorScalarGrid
        cols={9}
        rows={4}
        cell={26}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [3, 2], label: 'a', color: BLUE, side: 1 },
          { from: [8, 3], to: [4, 1], label: 'b', color: GREEN, side: 1 }
        ]}
      />
    ),
    question: 'Hányszorosa a →b vektor az →a vektornak?',
    options: ['(−2)-szerese', '2-szerese', '(−½)-szerese', '½-szerese'],
    correctAnswer: 0,
    explanation: '→b párhuzamos →a-val, kétszer olyan hosszú (4 balra, 2 le), de ellentétes irányú, tehát →b = −2→a.'
  },
  {
    id: 'vc-q7',
    level: 1,
    questionTypeBadge: 'Jelölések',
    question: 'Melyik kifejezés NEM egyenlő −3→a-val?',
    options: ['−(−3→a)', '(−3)→a', '3(−→a)', '−(3→a)'],
    correctAnswer: 0,
    explanation: '(−3)→a = 3(−→a) = −(3→a) = −3→a. A −(−3→a) viszont a −3→a ellentettje, vagyis 3→a.'
  },
  {
    id: 'vc-q8',
    level: 1,
    questionTypeBadge: 'Hossz és irány',
    question: 'Milyen a λ · →a vektor, ha −1 < λ < 0 és →a ≠ →0?',
    options: ['Rövidebb →a-nál és ellentétes irányú', 'Hosszabb →a-nál és ellentétes irányú', 'Rövidebb →a-nál és egyirányú', 'Ugyanolyan hosszú és ellentétes irányú'],
    correctAnswer: 0,
    explanation: '|λ| < 1, ezért rövidebb; λ < 0, ezért ellentétes irányú (pl. −0,5→a).'
  },
  {
    id: 'vc-q9',
    level: 1,
    questionTypeBadge: 'Bevezető',
    question: 'Az expander sárga gumikötele 4,5 kg, a zöld 9 kg ellenállást ad. Ha a sárga mellé a zöldet is felcsatoljuk, hányszoros erő kell ugyanakkora megnyújtáshoz?',
    options: ['3-szoros', '2-szeres', '1,5-szeres', '4-szeres'],
    correctAnswer: 0,
    explanation: '4,5 + 9 = 13,5 kg, és 13,5 = 3 · 4,5, tehát 3→F erő kell.'
  },
  {
    id: 'vc-q10',
    level: 1,
    questionTypeBadge: 'Bevezető',
    question: 'A sárga kötélhez (4,5 kg) képest hányszoros erő kell, ha egyszerre a kék (7 kg) és a fekete (11 kg) kötelet csatoljuk fel?',
    options: ['4-szeres', '3-szoros', '18-szoros', '2,5-szeres'],
    correctAnswer: 0,
    explanation: '7 + 11 = 18 kg = 4 · 4,5 kg, tehát a sárgához szükséges erő 4-szerese (4→F).'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'vc-q11',
    level: 2,
    questionTypeBadge: 'Rácsvektorok',
    figure: DE_FIG,
    question: 'Fejezd ki a →d vektort a →i és →j rácsvektorral!',
    options: ['3→i − 2→j', '3→i + 2→j', '−3→i − 2→j', '2→i − 3→j'],
    correctAnswer: 0,
    explanation: '→d 3 egységet jobbra (3→i) és 2-t lefelé (−2→j) mutat: →d = 3→i + (−2→j) = 3→i − 2→j.'
  },
  {
    id: 'vc-q12',
    level: 2,
    questionTypeBadge: 'Rácsvektorok',
    figure: DE_FIG,
    question: 'Az ábra jelöléseivel →d = 3→i − 2→j és →e = −3→i − 2→j. Mivel egyenlő →d + →e?',
    options: ['−4→j', '6→i', '→0', '−4→i'],
    correctAnswer: 0,
    explanation: '→d + →e = (3 − 3)→i + (−2 − 2)→j = −4→j (tankönyv 1. feladat).'
  },
  {
    id: 'vc-q13',
    level: 2,
    questionTypeBadge: 'Rácsvektorok',
    figure: DE_FIG,
    question: 'Az ábra jelöléseivel →d = 3→i − 2→j és →e = −3→i − 2→j. Mivel egyenlő →d − →e?',
    options: ['6→i', '−4→j', '6→i − 4→j', '→0'],
    correctAnswer: 0,
    explanation: '→d − →e = (3 + 3)→i + (−2 + 2)→j = 6→i.'
  },
  {
    id: 'vc-q14',
    level: 2,
    questionTypeBadge: 'Párhuzamos vektorok',
    question: '→a és →b párhuzamos és azonos irányú, |→a| = 24 mm, |→b| = 6 mm. Melyik igaz?',
    options: ['→a = 4→b', '→a = −4→b', '→b = 4→a', '→a = 18→b'],
    correctAnswer: 0,
    explanation: 'Egyirányúak, a hosszak aránya 24 : 6 = 4, tehát →a = 4→b (és →b = 0,25→a).'
  },
  {
    id: 'vc-q15',
    level: 2,
    questionTypeBadge: 'Párhuzamos vektorok',
    question: '→a és →b párhuzamos és ellentétes irányú, |→a| = 8 mm, |→b| = 10 mm. Melyik igaz?',
    options: ['→a = −0,8→b', '→a = 0,8→b', '→a = −1,25→b', '→b = −0,8→a'],
    correctAnswer: 0,
    explanation: 'A hosszak aránya 8 : 10 = 0,8, az irány ellentétes, így →a = −0,8→b; fordítva →b = −1,25→a.'
  },
  {
    id: 'vc-q16',
    level: 2,
    questionTypeBadge: 'Párhuzamos vektorok',
    question: '→a és →b párhuzamos, |→a| = 16 mm, |→b| = 40 mm, az irányukat nem ismerjük. Hányféleképpen írható fel →a a →b számszorosaként?',
    options: ['2-féleképpen: →a = 0,4→b vagy →a = −0,4→b', '1-féleképpen: →a = 0,4→b', '1-féleképpen: →a = 2,5→b', 'Végtelen sokféleképpen'],
    correctAnswer: 0,
    explanation: '16 : 40 = 0,4. Ha egyirányúak, →a = 0,4→b; ha ellentétes irányúak, →a = −0,4→b – két lehetőség van.'
  },
  {
    id: 'vc-q17',
    level: 2,
    questionTypeBadge: 'Hossz',
    question: '|→v| = 32 mm. Milyen hosszú a −1,5→v vektor?',
    options: ['48 mm', '−48 mm', '30,5 mm', '21,3 mm'],
    correctAnswer: 0,
    explanation: '|−1,5→v| = |−1,5| · 32 mm = 48 mm. A hossz sohasem negatív, a negatív szorzó csak az irányt fordítja meg.'
  },
  {
    id: 'vc-q18',
    level: 2,
    questionTypeBadge: 'Merőleges vektorok',
    figure: UV_FIG,
    question: '|→u| = 24 mm, |→v| = 32 mm, és →u ⊥ →v. Milyen hosszú a 2→u − 2→v vektor?',
    options: ['80 mm', '16 mm', '40 mm', '112 mm'],
    correctAnswer: 0,
    explanation: '2→u − 2→v befogói 48 mm és 64 mm, így a hossza √(48² + 64²) = 80 mm. (16 mm = 2 · 32 − 2 · 24 a hosszak hibás kivonása lenne.)'
  },
  {
    id: 'vc-q19',
    level: 2,
    questionTypeBadge: 'Szabályos hatszög',
    figure: <HexagonDiagonalSvg className={FIG} showSum={false} />,
    question: 'A szabályos hatszög A csúcsából induló két oldalvektora →b és →c, AD a hatszög leghosszabb átlója. Melyik igaz?',
    options: ['→b + →c = ½ →AD', '→b + →c = →AD', '→b + →c = 2 →AD', '→b + →c = ⅓ →AD'],
    correctAnswer: 0,
    explanation: '→b + →c = →AK (K a középpont), ami egyirányú →AD-vel és fele olyan hosszú: →AD = 2(→b + →c).'
  },
  {
    id: 'vc-q20',
    level: 2,
    questionTypeBadge: 'Jelölések',
    question: 'Melyik egyenlő az →a − (5→b) vektorral?',
    options: ['→a + 5(−→b)', '→a + 5→b', '5(→a − →b)', '−5(→a + →b)'],
    correctAnswer: 0,
    explanation: '→a − (5→b) = →a + (−5)→b = →a + 5(−→b) = →a − 5→b.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'vc-q21',
    level: 3,
    questionTypeBadge: 'Merőleges vektorok',
    figure: UV_FIG,
    question: '|→u| = 24 mm, |→v| = 32 mm, és →u ⊥ →v. Milyen hosszú a 4→u + 3→v vektor?',
    options: ['≈ 135,8 mm', '192 mm', '96 mm', '≈ 113,1 mm'],
    correctAnswer: 0,
    explanation: '|4→u| = 96 mm és |3→v| = 96 mm merőlegesek: √(96² + 96²) = 96√2 ≈ 135,8 mm. (192 mm a hosszak összege lenne.)'
  },
  {
    id: 'vc-q22',
    level: 3,
    questionTypeBadge: 'Merőleges vektorok',
    question: '|→u| = 24 mm, |→v| = 32 mm, és →u ⊥ →v. Milyen hosszú a −→u − 2→v vektor?',
    options: ['≈ 68,4 mm', '88 mm', '≈ 40,0 mm', '≈ 59,4 mm'],
    correctAnswer: 0,
    explanation: 'Befogók: 24 mm és 64 mm, így √(24² + 64²) = √4672 ≈ 68,4 mm. A negatív előjelek csak az irányt változtatják.'
  },
  {
    id: 'vc-q23',
    level: 3,
    questionTypeBadge: 'Kocka',
    figure: <CubeVectorsSvg className={FIG} showQ={false} />,
    question: 'A kockában →a = →AB, →b = →AD, →c = →AE. Hogyan írható fel a →CH vektor?',
    options: ['−→a + →c', '→a + →c', '−→b + →c', '→a − →c'],
    correctAnswer: 0,
    explanation: '→CH = →CD + →DH = −→a + →c (→CD = −→AB, →DH = →AE).'
  },
  {
    id: 'vc-q24',
    level: 3,
    questionTypeBadge: 'Kocka',
    figure: <CubeVectorsSvg className={FIG} showQ={false} />,
    question: 'A kockában →a = →AB, →b = →AD, →c = →AE. Hogyan írható fel a →BH testátló-vektor?',
    options: ['−→a + →b + →c', '→a + →b + →c', '→a − →b + →c', '−→a − →b + →c'],
    correctAnswer: 0,
    explanation: '→BH = →BA + →AD + →DH = −→a + →b + →c. (→a + →b + →c az →AG testátló.)'
  },
  {
    id: 'vc-q25',
    level: 3,
    questionTypeBadge: 'Kocka',
    figure: <CubeVectorsSvg className={FIG} />,
    question: 'A kockában →a = →AB, →b = →AD, →c = →AE, Q a BF él felezőpontja. Hogyan írható fel a →DQ vektor?',
    options: ['→a − →b + ½→c', '→a + →b + ½→c', '−→a + →b + ½→c', '→a − →b + →c'],
    correctAnswer: 0,
    explanation: '→DQ = →DA + →AB + →BQ = −→b + →a + ½→c.'
  },
  {
    id: 'vc-q26',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: parFig([1, 1]),
    question: 'Egy paralelogramma közös csúcsból induló oldalvektorai →a és →b, O a középpontja. Melyik vektor mutat a közös csúcsból O-ba?',
    options: ['½(→a + →b)', '→a + →b', '½(→a − →b)', '−½(→a + →b)'],
    correctAnswer: 0,
    explanation: 'Az átló vektora →a + →b, és O felezi az átlót, így a közös csúcsból O-ba ½(→a + →b) mutat.'
  },
  {
    id: 'vc-q27',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: parFig([7, 1]),
    question: 'Egy paralelogramma közös csúcsból induló oldalvektorai →a és →b, O a középpontja. Melyik vektor mutat az →a végpontjából O-ba?',
    options: ['½(→b − →a)', '½(→a − →b)', '½(→a + →b)', '→b − →a'],
    correctAnswer: 0,
    explanation: 'Ez a vektor a →b − →a átló fele: az →a végpontjából indulva −→a + ½(→a + →b) = ½(→b − →a).'
  },
  {
    id: 'vc-q28',
    level: 3,
    questionTypeBadge: 'Kötélhúzás',
    question: 'Egy 3 fős csapat minden tagja →F erővel húzza a kötelet, majd beáll még 2 ugyanilyen tag. Mekkora erővel kell húznia az ellenfélnek, hogy döntetlen legyen?',
    options: ['−5→F', '5→F', '−3→F', '−2→F'],
    correctAnswer: 0,
    explanation: 'A csapat ereje 5→F. Döntetlenhez a két erő eredője →0, így az ellenfélnek az ellentett erőt, −5→F-et kell kifejtenie.'
  },
  {
    id: 'vc-q29',
    level: 3,
    questionTypeBadge: 'Hossz',
    question: '→a ≠ →0 és |λ · →a| = |→a|. Mit tudunk λ-ról?',
    options: ['λ = 1 vagy λ = −1', 'Csak λ = 1 lehet', 'λ = 0', 'Bármilyen valós szám lehet'],
    correctAnswer: 0,
    explanation: '|λ · →a| = |λ| · |→a| = |→a| ⇒ |λ| = 1, tehát λ = 1 (maga →a) vagy λ = −1 (az ellentett).'
  },
  {
    id: 'vc-q30',
    level: 3,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Mivel egyenlő 2(→a + →b) − (→a − 3→b)?',
    options: ['→a + 5→b', '→a − →b', '3→a + 5→b', '→a + →b'],
    correctAnswer: 0,
    explanation: '2→a + 2→b − →a + 3→b = →a + 5→b. (A zárójel előtti kivonás miatt −(−3→b) = +3→b.)'
  }
];

export const VectorScalarQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId="g11-geo-vektor-szamszoros-quiz"
      subtopicId="vektorok-szamszorosa"
      title="3. Vektorok számszorosa – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a számszoros iránya és hossza, rácsvektorok, párhuzamos vektorok, hatszög, paralelogramma, kocka."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={VECTOR_SCALAR_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: [
            'λ · →a ∥ →a, és |λ · →a| = |λ| · |→a|.',
            'λ > 0: egyirányú; λ < 0: ellentétes irányú.',
            '0 · →a = →0 és λ · →0 = →0.',
            '(−1)→a = −→a; (−3)→a = 3(−→a) = −(3→a).'
          ]
        },
        {
          title: 'Hossz',
          items: [
            '|λ| > 1: hosszabb; |λ| < 1: rövidebb; |λ| = 1: egyenlő.',
            'A hossz sohasem negatív: |−1,5→v| = 1,5|→v|.',
            'Merőleges →u, →v: |p→u + q→v|² = (p|→u|)² + (q|→v|)².',
            '24 és 32 mm: |→u + →v| = 40 mm, |2→u ± 2→v| = 80 mm.'
          ]
        },
        {
          title: 'Kifejezések',
          items: [
            'Rács: →d = 3→i − 2→j, →e = −3→i − 2→j.',
            'Hatszög: →AD = 2(→b + →c).',
            'Paralelogramma: a középpontba ½(→a + →b).',
            'Kocka: →BH = −→a + →b + →c, →DQ = →a − →b + ½→c.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <VectorScalarMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <VectorScalarSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default VectorScalarQuiz;
