import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11VectorAdditionMatcher } from './G11VectorAdditionMatcher';
import { G11VectorAdditionSorter } from './G11VectorAdditionSorter';
import { G11VectorAdditionGrid, GP } from './G11VectorAdditionFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#d97706';

const hexPts = (cx: number, cy: number, r: number): GP[] =>
  [0, 1, 2, 3, 4, 5].map((k) => [cx + r * Math.cos((k * Math.PI) / 3), cy + r * Math.sin((k * Math.PI) / 3)] as GP);
const HEX = hexPts(3, 2.6, 2.2);

const SQUARE_POINTS = [
  { at: [1, 1] as GP, label: 'A', dx: -8, dy: 12 },
  { at: [4, 1] as GP, label: 'B', dx: 8, dy: 12 },
  { at: [4, 4] as GP, label: 'C', dx: 8, dy: -4 },
  { at: [1, 4] as GP, label: 'D', dx: -8, dy: -4 }
];

export const G11_VECTOR_ADDITION_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak (1–10)
  {
    id: 'va-q1',
    level: 1,
    questionTypeBadge: 'A vektor fogalma',
    question: 'Mi jellemez egy vektort?',
    options: ['Az iránya és az abszolút értéke (hossza)', 'Csak a hossza', 'Csak a kezdőpontja', 'A kezdőpontja és a hossza, az iránya nem számít'],
    correctAnswer: 0,
    explanation: 'A vektort az iránya és az abszolút értéke (hossza) jellemzi; bármelyik vele párhuzamos, azonos irányú és hosszú irányított szakasz reprezentálhatja, ezért a kezdőpont nem jellemzője.'
  },
  {
    id: 'va-q2',
    level: 1,
    questionTypeBadge: 'Skalár vagy vektor',
    question: 'Melyik vektormennyiség az alábbiak közül?',
    options: ['Az elmozdulás', 'A tömeg', 'Az idő', 'A távolság'],
    correctAnswer: 0,
    explanation: 'Az elmozdulásnak nagysága és iránya is van, ezért vektormennyiség. A tömeg, az idő és a távolság egyetlen számmal (és mértékegységgel) megadható skalármennyiség.'
  },
  {
    id: 'va-q3',
    level: 1,
    questionTypeBadge: 'Ellentett vektor',
    question: 'Mikor ellentettje egymásnak két vektor?',
    options: [
      'Ha párhuzamosak, egyenlő hosszúak és ellentétes irányúak',
      'Ha merőlegesek egymásra és egyenlő hosszúak',
      'Ha párhuzamosak és azonos irányúak',
      'Ha a kezdőpontjuk közös'
    ],
    correctAnswer: 0,
    explanation: 'A →v ellentettje (−→v) vele párhuzamos, ugyanolyan hosszú, de ellentétes irányú vektor. A −→v ellentettje ismét →v.'
  },
  {
    id: 'va-q4',
    level: 1,
    questionTypeBadge: 'Egyenlő vektorok',
    figure: (
      <G11VectorAdditionGrid
        cols={11}
        rows={5}
        cell={24}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [3, 3], label: 'a', color: RED, side: 1 },
          { from: [4, 1], to: [6, 3], label: 'p', color: BLUE, side: -1 },
          { from: [9, 1], to: [10, 4], label: 'q', color: BLUE, side: -1 },
          { from: [7, 5], to: [5, 3], label: 'r', color: BLUE, side: -1 },
          { from: [7, 2], to: [8, 3], label: 's', color: BLUE, side: 1 }
        ]}
      />
    ),
    question: 'Az ábrán látható kék vektorok közül melyik egyenlő az →a vektorral?',
    options: ['→p', '→q', '→r', '→s'],
    correctAnswer: 0,
    explanation: 'Két vektor egyenlő, ha párhuzamosak, azonos irányúak és egyenlő hosszúak. →p is 2 egységet jobbra és 2-t felfelé mutat. →s egyirányú, de rövidebb; →q más irányú; →r ugyanolyan hosszú, de ellentétes irányú (ez −→a).'
  },
  {
    id: 'va-q5',
    level: 1,
    questionTypeBadge: 'Összefűzés',
    figure: (
      <G11VectorAdditionGrid
        cols={7}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        vectors={[
          { from: [0.5, 1], to: [4, 3.5], label: 'a', color: BLUE, side: 1 },
          { from: [4, 3.5], to: [6.5, 0.5], label: 'b', color: GREEN, side: 1 },
          { from: [0.5, 1], to: [6.5, 0.5], label: '?', color: RED, side: -1, dashed: true, plain: true }
        ]}
      />
    ),
    question: 'Az ábrán →b kezdőpontja →a végpontjában van. Honnan hova mutat az →a + →b összegvektor?',
    options: [
      'Az →a kezdőpontjából a →b végpontjába',
      'A →b végpontjából az →a kezdőpontjába',
      'Az →a végpontjából a →b végpontjába',
      'Az →a kezdőpontjából az →a végpontjába'
    ],
    correctAnswer: 0,
    explanation: 'Összefűzésnél (háromszögmódszer) az összegvektor az első vektor kezdőpontjából az utolsó vektor végpontjába mutat.'
  },
  {
    id: 'va-q6',
    level: 1,
    questionTypeBadge: 'Paralelogrammamódszer',
    figure: (
      <G11VectorAdditionGrid
        cols={9}
        rows={5}
        cell={26}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[0.8, 0.8], [5.5, 0.8], [8.2, 4.4], [3.5, 4.4]], dashed: true, fill: 'rgba(37,99,235,0.06)' }]}
        vectors={[
          { from: [0.8, 0.8], to: [5.5, 0.8], label: 'a', color: BLUE, side: -1 },
          { from: [0.8, 0.8], to: [3.5, 4.4], label: 'b', color: GREEN, side: 1 }
        ]}
        points={[{ at: [0.8, 0.8], label: 'O', dx: -8, dy: 12 }]}
      />
    ),
    question: 'Az →a és →b vektort közös O kezdőpontból vettük fel, és kiegészítettük paralelogrammává. Melyik vektor az →a + →b?',
    options: [
      'Az O-ból induló átlóvektor',
      'A másik átló vektora',
      'A paralelogramma O-val szemközti csúcsából O-ba mutató vektor',
      'A →b végpontjából az →a végpontjába mutató vektor'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogrammamódszer szerint az összegvektor a közös kezdőpontból induló átlóvektor. A másik átló a különbséget adja (erről a következő leckében lesz szó).'
  },
  {
    id: 'va-q7',
    level: 1,
    questionTypeBadge: 'Összefűzés',
    figure: (
      <G11VectorAdditionGrid
        cols={7}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        vectors={[
          { from: [0.6, 0.6], to: [5, 1], color: BLUE },
          { from: [5, 1], to: [3.2, 3.5], color: GREEN }
        ]}
        points={[
          { at: [0.6, 0.6], label: 'A', dx: -8, dy: 12 },
          { at: [5, 1], label: 'B', dx: 10, dy: 10 },
          { at: [3.2, 3.5], label: 'C', dx: 0, dy: -8 }
        ]}
      />
    ),
    question: 'Mivel egyenlő →AB + →BC?',
    options: ['→AC', '→CA', '→BA', '→0'],
    correctAnswer: 0,
    explanation: 'A →BC kezdőpontja a →AB végpontja, így összefűzéssel az összeg A-ból C-be mutat: →AB + →BC = →AC.'
  },
  {
    id: 'va-q8',
    level: 1,
    questionTypeBadge: 'Nullvektor',
    question: 'Mivel egyenlő →a + (−→a)?',
    options: ['→0 (a nullvektorral)', '2→a', '→a', 'A 0 számmal'],
    correctAnswer: 0,
    explanation: 'Ellentett vektorok összegének kezdő- és végpontja egybeesik, így a hossza 0: ez a nullvektor, →0. Az eredmény vektor, nem a 0 szám.'
  },
  {
    id: 'va-q9',
    level: 1,
    questionTypeBadge: 'Nullvektor',
    question: 'Melyik állítás igaz a nullvektorra?',
    options: [
      'Az iránya tetszőleges, minden vektorral párhuzamos és mindegyikre merőleges',
      'Nincs iránya, ezért egyik vektorral sem párhuzamos',
      'Csak a vízszintes vektorokkal párhuzamos',
      'A hossza 1 egység'
    ],
    correctAnswer: 0,
    explanation: 'A nullvektor hossza 0, iránya tetszőleges; ezért minden vektorral párhuzamosnak és mindegyikre merőlegesnek tekintjük.'
  },
  {
    id: 'va-q10',
    level: 1,
    questionTypeBadge: 'Vektorok a négyzetben',
    figure: (
      <G11VectorAdditionGrid cols={5} rows={5} cell={30} grid={false} className={FIG} polygons={[{ pts: [[1, 1], [4, 1], [4, 4], [1, 4]], stroke: '#475569' }]} points={SQUARE_POINTS} texts={[{ at: [2.5, 0.45], text: '2 cm' }]} />
    ),
    question: 'Hány olyan vektor van, amely az ABCD négyzet valamelyik csúcsából egy másik csúcsába mutat?',
    options: ['12', '6', '8', '16'],
    correctAnswer: 0,
    explanation: 'Mind a 4 csúcsból 3 másik csúcsba mutathat vektor: 4 · 3 = 12. (6 a szakaszok száma – a vektoroknál az irány is számít.)'
  },

  // LEVEL 2: Hosszak és alkalmazások (11–20)
  {
    id: 'va-q11',
    level: 2,
    questionTypeBadge: 'Vektor hossza',
    figure: <G11VectorAdditionGrid cols={6} rows={5} cell={28} className={FIG} vectors={[{ from: [1, 0.5], to: [4, 4.5], label: 'a', color: BLUE, side: 1 }]} />,
    question: 'A rács legkisebb négyzetének oldala 1 egység. Milyen hosszú az →a vektor?',
    options: ['5', '7', '√7 ≈ 2,65', '25'],
    correctAnswer: 0,
    explanation: '→a 3 egységet jobbra és 4-et felfelé mutat, így Pitagorasz-tétellel |→a| = √(3² + 4²) = √25 = 5. (7 = 3 + 4 a lépések összege lenne.)'
  },
  {
    id: 'va-q12',
    level: 2,
    questionTypeBadge: 'Összeg a rácson',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={5}
        cell={26}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [3, 4], label: 'a', color: BLUE, side: 1 },
          { from: [3, 4], to: [7, 3], label: 'b', color: GREEN, side: 1 },
          { from: [1, 1], to: [7, 3], label: '?', color: RED, side: -1, dashed: true, plain: true }
        ]}
      />
    ),
    question: 'A rács négyzeteinek oldala 1 egység. Mekkora |→a + →b|?',
    options: ['√40 ≈ 6,32', '√13 + √17 ≈ 7,73', '√52 ≈ 7,21', '8'],
    correctAnswer: 0,
    explanation: '→a + →b 6 egységet jobbra és 2-t felfelé mutat: |→a + →b| = √(36 + 4) = √40 ≈ 6,32. A hosszak összege (≈ 7,73) csak egyirányú vektoroknál lenne helyes.'
  },
  {
    id: 'va-q13',
    level: 2,
    questionTypeBadge: 'Tulajdonságok',
    question: 'Mit mondhatunk az →a + →b és a →b + →a vektorról?',
    options: ['Mindig egyenlők', 'Egymás ellentettjei', 'Csak merőleges vektoroknál egyenlők', 'Csak a hosszuk egyenlő, az irányuk különböző'],
    correctAnswer: 0,
    explanation: 'A vektorösszeadás felcserélhető (kommutatív): a paralelogramma két oldalán végighaladva ugyanabba a csúcsba jutunk, így →a + →b = →b + →a.'
  },
  {
    id: 'va-q14',
    level: 2,
    questionTypeBadge: 'Legnagyobb összeg',
    question: '|→a| = 6 cm és |→b| = 2,5 cm, az irányuk tetszőleges. Legfeljebb mekkora lehet |→a + →b|?',
    options: ['8,5 cm', '6,5 cm', '3,5 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'A legnagyobb érték akkor adódik, ha a két vektor párhuzamos és egyirányú: |→a + →b| = 6 + 2,5 = 8,5 cm.'
  },
  {
    id: 'va-q15',
    level: 2,
    questionTypeBadge: 'Legkisebb összeg',
    question: '|→a| = 6 cm és |→b| = 2,5 cm, az irányuk tetszőleges. Legalább mekkora |→a + →b|?',
    options: ['3,5 cm', '0 cm', '2,5 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A legkisebb érték ellentétes irányú vektoroknál adódik: |→a + →b| = 6 − 2,5 = 3,5 cm. 0 csak egyenlő hosszú ellentett vektoroknál lehetne.'
  },
  {
    id: 'va-q16',
    level: 2,
    questionTypeBadge: 'Merőleges vektorok',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        rightAngles={[{ at: [1, 1], p: [7, 1], q: [1, 3.5] }]}
        polygons={[{ pts: [[1, 1], [7, 1], [7, 3.5], [1, 3.5]], dashed: true }]}
        vectors={[
          { from: [1, 1], to: [7, 1], label: 'a', color: BLUE, side: 1 },
          { from: [1, 1], to: [1, 3.5], label: 'b', color: GREEN, side: -1 },
          { from: [1, 1], to: [7, 3.5], label: '?', color: RED, side: 1, dashed: true, plain: true }
        ]}
        texts={[
          { at: [4, 0.35], text: '6 cm', color: BLUE },
          { at: [0.45, 2.3], text: '2,5 cm', color: GREEN }
        ]}
      />
    ),
    question: '|→a| = 6 cm, |→b| = 2,5 cm és →a ⊥ →b. Mekkora |→a + →b|?',
    options: ['6,5 cm', '8,5 cm', '3,5 cm', '√30,25 ≈ 5,5 cm'],
    correctAnswer: 0,
    explanation: 'Merőleges vektoroknál a paralelogramma téglalap, az összeg az átlója: |→a + →b| = √(6² + 2,5²) = √42,25 = 6,5 cm.'
  },
  {
    id: 'va-q17',
    level: 2,
    questionTypeBadge: 'Vektorok a négyzetben',
    figure: (
      <G11VectorAdditionGrid
        cols={5}
        rows={5}
        cell={30}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [4, 1], [4, 4], [1, 4]], stroke: '#cbd5e1' }]}
        vectors={[{ from: [1, 1], to: [4, 1], color: BLUE }]}
        points={SQUARE_POINTS}
        texts={[{ at: [2.5, 0.45], text: '2 cm' }]}
      />
    ),
    question: 'A 2 cm oldalú ABCD négyzet csúcsai között futó 12 vektor közül hánynak egyenlő az abszolút értéke |→AB|-vel (az →AB-t is beleértve)?',
    options: ['8', '4', '2', '12'],
    correctAnswer: 0,
    explanation: 'Az összes oldalvektor 2 cm hosszú: →AB, →BA, →BC, →CB, →CD, →DC, →DA, →AD – ez 8 vektor. Az átlóvektorok 2√2 ≈ 2,83 cm hosszúak.'
  },
  {
    id: 'va-q18',
    level: 2,
    questionTypeBadge: 'Vektorok a négyzetben',
    figure: (
      <G11VectorAdditionGrid
        cols={5}
        rows={5}
        cell={30}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [4, 1], [4, 4], [1, 4]], stroke: '#cbd5e1' }]}
        vectors={[{ from: [1, 1], to: [4, 4], color: RED }]}
        points={SQUARE_POINTS}
      />
    ),
    question: 'Az ABCD négyzet csúcsai között futó vektorok közül melyek merőlegesek az →AC vektorra?',
    options: ['→BD és →DB', '→CA', '→AB és →AD', '→BC és →CD'],
    correctAnswer: 0,
    explanation: 'A négyzet átlói merőlegesek egymásra, így a BD átló két irányítása, →BD és →DB merőleges →AC-re. →CA párhuzamos vele (ellentett).'
  },
  {
    id: 'va-q19',
    level: 2,
    questionTypeBadge: 'Oldalszél',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        rightAngles={[{ at: [7, 1], p: [1, 1], q: [7, 3.2] }]}
        vectors={[
          { from: [1, 1], to: [7, 1], label: 'a', color: BLUE, side: 1, at: 0.3 },
          { from: [7, 1], to: [7, 3.2], label: 'b', color: GREEN, side: 1 },
          { from: [1, 1], to: [7, 3.2], label: 'c', color: RED, side: 1 }
        ]}
        points={[{ at: [1, 1], label: 'R', dx: -8, dy: 12 }]}
        texts={[
          { at: [4, 0.35], text: '60 m', color: BLUE },
          { at: [7.5, 2.1], text: '11 m', color: GREEN, anchor: 'start' }
        ]}
      />
    ),
    question: 'A leszálló repülőgép szélcsendben 1 s alatt 60 m-t tenne meg a pálya mentén (→a), a merőleges oldalszél 1 s alatt 11 m-rel sodorja oldalra (→b). Mekkora a gép tényleges elmozdulása (→c = →a + →b) 1 s alatt?',
    options: ['61 m', '71 m', '49 m', '≈ 59 m'],
    correctAnswer: 0,
    explanation: 'A két elmozdulás merőleges, így |→c| = √(60² + 11²) = √3721 = 61 m. (71 m = 60 + 11 a hosszak hibás összeadása.)'
  },
  {
    id: 'va-q20',
    level: 2,
    questionTypeBadge: 'Paralelogrammamódszer',
    figure: (
      <G11VectorAdditionGrid
        cols={5}
        rows={5}
        cell={30}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [4, 1], [4, 4], [1, 4]], stroke: '#cbd5e1' }]}
        vectors={[
          { from: [1, 1], to: [4, 1], color: BLUE },
          { from: [1, 1], to: [1, 4], color: GREEN }
        ]}
        points={SQUARE_POINTS}
      />
    ),
    question: 'Az ABCD négyzetben mivel egyenlő →AB + →AD?',
    options: ['→AC', '→BD', '→DB', '→CA'],
    correctAnswer: 0,
    explanation: 'A két vektor közös kezdőpontja A, az általuk kifeszített paralelogramma maga a négyzet; az összeg az A-ból induló átlóvektor: →AC. (Másképp: →AD = →BC, így →AB + →BC = →AC.)'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'va-q21',
    level: 3,
    questionTypeBadge: 'Trapéz',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={4}
        cell={32}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 0.5], [7, 0.5], [5.5, 3.5], [2.5, 3.5]], fill: 'rgba(148,163,184,0.12)', stroke: '#475569' }]}
        vectors={[
          { from: [4, 2.5], to: [1, 0.5], color: BLUE, width: 1.8 },
          { from: [4, 2.5], to: [7, 0.5], color: BLUE, width: 1.8 },
          { from: [4, 2.5], to: [5.5, 3.5], color: GREEN, width: 1.8 },
          { from: [4, 2.5], to: [2.5, 3.5], color: GREEN, width: 1.8 }
        ]}
        points={[
          { at: [1, 0.5], label: 'A', dx: -8, dy: 12 },
          { at: [7, 0.5], label: 'B', dx: 8, dy: 12 },
          { at: [5.5, 3.5], label: 'C', dx: 8, dy: -4 },
          { at: [2.5, 3.5], label: 'D', dx: -8, dy: -4 },
          { at: [4, 2.5], label: 'K', dx: 0, dy: -9 }
        ]}
        texts={[
          { at: [4, 3.85], text: '3 cm' },
          { at: [4, 0.1], text: '6 cm' }
        ]}
      />
    ),
    question: 'Az ABCD trapézban AB = 6 cm, DC = 3 cm, K az átlók metszéspontja. Hová mutat a →KA + →KB + →KC + →KD összegvektor, ha a kezdőpontja K?',
    options: ['Az AB alap felezőpontjába', 'Magába a K pontba (az összeg →0)', 'A DC alap felezőpontjába', 'A B csúcsba'],
    correctAnswer: 0,
    explanation: 'K az átlókat 2 : 1 arányban osztja, így →KC = −½ →KA és →KD = −½ →KB. Az összeg ½(→KA + →KB), ami K-ból az AB felezőpontjába mutat.'
  },
  {
    id: 'va-q22',
    level: 3,
    questionTypeBadge: 'Szabályos hatszög',
    figure: (
      <G11VectorAdditionGrid
        cols={6}
        rows={5.2}
        cell={30}
        grid={false}
        className={FIG}
        polygons={[{ pts: HEX, stroke: '#475569', fill: 'rgba(148,163,184,0.1)' }]}
        vectors={HEX.map((p, k) => ({ from: [3, 2.6] as GP, to: p, color: k % 2 ? BLUE : PURPLE, width: 1.8 }))}
        points={[{ at: [3, 2.6], label: 'O', dx: 0, dy: -8 }]}
      />
    ),
    question: 'Egy szabályos hatszög O középpontjából a hat csúcsba vektorokat rajzolunk. Mivel egyenlő a hat vektor összege?',
    options: ['→0', 'A hatszög egyik oldalvektorának hatszorosával', 'Egy oldalvektorral', 'Egy átlóvektorral'],
    correctAnswer: 0,
    explanation: 'A vektorok páronként egymás ellentettjei (O a szimmetria-középpont): →OA + →OD = →0, →OB + →OE = →0, →OC + →OF = →0, így az összeg →0.'
  },
  {
    id: 'va-q23',
    level: 3,
    questionTypeBadge: 'Zárt töröttvonal',
    question: 'Mivel egyenlő egy ABCD négyszögben →AB + →BC + →CD + →DA?',
    options: ['→0', '→AC', '2 · →AC', '→AB + →CD'],
    correctAnswer: 0,
    explanation: 'Összefűzéssel A-ból indulunk és A-ba érkezünk vissza, így az összegvektor kezdő- és végpontja egybeesik: →0.'
  },
  {
    id: 'va-q24',
    level: 3,
    questionTypeBadge: 'Függvénygrafikon eltolása',
    question: 'Az x ↦ x² grafikonját előbb az →u (2 jobbra, 1 fel), majd a →v (1 balra, 3 fel) vektorral toljuk el. Melyik függvény grafikonját kapjuk?',
    options: ['x ↦ (x − 1)² + 4', 'x ↦ (x + 1)² + 4', 'x ↦ (x − 3)² + 4', 'x ↦ (x − 1)² − 2'],
    correctAnswer: 0,
    explanation: 'A két eltolás egymásutánja egyetlen eltolás az →u + →v vektorral: 2 − 1 = 1 jobbra és 1 + 3 = 4 fel. Így a hozzárendelés x ↦ (x − 1)² + 4.'
  },
  {
    id: 'va-q25',
    level: 3,
    questionTypeBadge: 'Eltolások egymásutánja',
    question: 'Egy eltolás a g grafikont az f grafikonba, egy másik az f-et a h-ba viszi. Melyik vektorral való eltolás viszi a g-t közvetlenül a h-ba?',
    options: ['A két eltolásvektor összegével', 'A két eltolásvektor különbségével', 'A második eltolásvektor ellentettjével', 'Ilyen eltolás nem létezik'],
    correctAnswer: 0,
    explanation: 'Két eltolás egymásutánja egyetlen eltolás, amelynek vektora a két eltolásvektor összege – ez éppen a vektorösszeadás definíciója.'
  },
  {
    id: 'va-q26',
    level: 3,
    questionTypeBadge: 'Összeg hossza',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        arcs={[{ at: [1, 0.8], p: [6, 0.8], q: [2.5, 3.4], r: 20, label: '60°' }]}
        vectors={[
          { from: [1, 0.8], to: [6, 0.8], label: 'a', color: BLUE, side: -1 },
          { from: [1, 0.8], to: [2.5, 3.4], label: 'b', color: GREEN, side: 1 }
        ]}
        texts={[
          { at: [4.6, 0.25], text: '5', color: BLUE },
          { at: [2.4, 3.75], text: '3', color: GREEN, anchor: 'start' }
        ]}
      />
    ),
    question: '|→a| = 5, |→b| = 3, és a két vektor 60°-os szöget zár be. Mekkora |→a + →b|?',
    options: ['7', '8', '√19 ≈ 4,36', '√34 ≈ 5,83'],
    correctAnswer: 0,
    explanation: 'A paralelogrammában az →a + →b átlóval szemközti szög 180° − 60° = 120°. Koszinusztétellel: |→a + →b|² = 25 + 9 − 2 · 5 · 3 · cos 120° = 34 + 15 = 49, tehát |→a + →b| = 7. (√19 a másik átló.)'
  },
  {
    id: 'va-q27',
    level: 3,
    questionTypeBadge: 'Összeg hossza',
    figure: (
      <G11VectorAdditionGrid
        cols={8}
        rows={4.2}
        cell={30}
        grid={false}
        className={FIG}
        arcs={[{ at: [4, 0.6], p: [7, 0.6], q: [2.5, 3.2], r: 18, label: '120°' }]}
        vectors={[
          { from: [4, 0.6], to: [7, 0.6], label: 'a', color: BLUE, side: -1 },
          { from: [4, 0.6], to: [2.5, 3.2], label: 'b', color: GREEN, side: 1 }
        ]}
      />
    ),
    question: '|→a| = |→b| = 4, és a két vektor 120°-os szöget zár be. Mekkora |→a + →b|?',
    options: ['4', '8', '0', '4√3 ≈ 6,93'],
    correctAnswer: 0,
    explanation: 'A paralelogramma rombusz, az →a + →b átló két szabályos háromszögre bontja (a közös kezdőpontnál 60°–60°), így |→a + →b| = 4. Koszinusztétellel: 16 + 16 − 2 · 16 · cos 60° = 16.'
  },
  {
    id: 'va-q28',
    level: 3,
    questionTypeBadge: 'Szabályos háromszög',
    figure: (
      <G11VectorAdditionGrid
        cols={6}
        rows={4}
        cell={32}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 0.6], [5, 0.6], [3, 0.6 + 2 * Math.sqrt(3)]], stroke: '#cbd5e1' }]}
        vectors={[
          { from: [1, 0.6], to: [5, 0.6], color: BLUE },
          { from: [1, 0.6], to: [3, 0.6 + 2 * Math.sqrt(3)], color: GREEN }
        ]}
        points={[
          { at: [1, 0.6], label: 'A', dx: -8, dy: 12 },
          { at: [5, 0.6], label: 'B', dx: 8, dy: 12 },
          { at: [3, 0.6 + 2 * Math.sqrt(3)], label: 'C', dx: 10, dy: 0 }
        ]}
        texts={[{ at: [3, 0.15], text: '2 cm' }]}
      />
    ),
    question: 'Az ABC szabályos háromszög oldala 2 cm. Milyen hosszú az →AB + →AC vektor?',
    options: ['2√3 ≈ 3,46 cm', '4 cm', '2 cm', '√3 ≈ 1,73 cm'],
    correctAnswer: 0,
    explanation: 'Az →AB és →AC által kifeszített paralelogramma rombusz, az összeg a hosszabbik átlója, ami a háromszög A-ból induló magasságának kétszerese: 2 · √3 ≈ 3,46 cm.'
  },
  {
    id: 'va-q29',
    level: 3,
    questionTypeBadge: 'Háromszög-egyenlőtlenség',
    question: 'Két nem nulla vektorra |→a + →b| = |→a| + |→b|. Mit tudunk a két vektorról?',
    options: ['Párhuzamosak és azonos irányúak', 'Merőlegesek egymásra', 'Párhuzamosak és ellentétes irányúak', 'Egyenlő hosszúak, de az irányuk tetszőleges'],
    correctAnswer: 0,
    explanation: 'Mindig |→a + →b| ≤ |→a| + |→b|, és egyenlőség csak akkor áll fenn, ha az összefűzött vektorok egy egyenesbe esnek és egyirányúak (nem jön létre „valódi” háromszög).'
  },
  {
    id: 'va-q30',
    level: 3,
    questionTypeBadge: 'Több vektor összege',
    figure: (
      <G11VectorAdditionGrid
        cols={6}
        rows={6}
        cell={26}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [3, 2], label: 'a', color: BLUE, side: -1 },
          { from: [3, 2], to: [4, 4], label: 'b', color: GREEN, side: -1 },
          { from: [4, 4], to: [1, 5], label: 'c', color: PURPLE, side: -1 },
          { from: [1, 5], to: [3, 4], label: 'd', color: AMBER, side: -1 }
        ]}
      />
    ),
    question: 'A rács négyzeteinek oldala 1 egység. Milyen hosszú az →a + →b + →c + →d összegvektor?',
    options: ['√13 ≈ 3,61', '≈ 9,87', '5', '√5 ≈ 2,24'],
    correctAnswer: 0,
    explanation: 'Összefűzéssel az összeg az →a kezdőpontjából a →d végpontjába mutat: 2 egység jobbra és 3 fel, így a hossza √(4 + 9) = √13 ≈ 3,61. (≈ 9,87 a négy hossz összege lenne.)'
  }
];

export const G11VectorAdditionQuiz: React.FC<{
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
      topicId="g11-geo-vektor-osszeadas-quiz"
      subtopicId="vektorok-osszeadasa"
      title="1. Vektorok összeadása – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: vektorfogalom, összefűzés, paralelogrammamódszer, az összegvektor hossza."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={G11_VECTOR_ADDITION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: [
            'Vektor: párhuzamos, azonos irányú, egyenlő hosszú irányított szakaszok halmaza.',
            '|→v|: a vektor hossza (abszolút értéke).',
            '−→v: párhuzamos, egyenlő hosszú, ellentétes irányú.',
            '→0: nulla hosszú, iránya tetszőleges.'
          ]
        },
        {
          title: 'Összeadás',
          items: [
            'Összefűzés: →AB + →BC = →AC.',
            'Paralelogramma: közös kezdőpontból az átló.',
            '→a + →b = →b + →a; →a + (−→a) = →0.',
            'Zárt töröttvonal oldalvektorainak összege →0.'
          ]
        },
        {
          title: 'Az összeg hossza',
          items: [
            '||→a| − |→b|| ≤ |→a + →b| ≤ |→a| + |→b|.',
            'Merőlegesek: |→a + →b|² = |→a|² + |→b|².',
            'Általában koszinusztétel a paralelogrammában (szemközti szög: 180° − φ).',
            '6 és 2,5 cm: max 8,5; min 3,5; merőlegesen 6,5 cm.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11VectorAdditionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11VectorAdditionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11VectorAdditionQuiz;
