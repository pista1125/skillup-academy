import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { VectorSubtractionMatcher } from './VectorSubtractionMatcher';
import { VectorSubtractionSorter } from './VectorSubtractionSorter';
import { VectorSubtractionGrid, GP } from './VectorSubtractionFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';

const KITE: GP[] = [[4, 7.4], [1.5, 5], [4, 0.6], [6.5, 5]];
const KITE_POINTS = [
  { at: KITE[0], label: 'A', dx: 0, dy: -8 },
  { at: KITE[1], label: 'B', dx: -10, dy: 4 },
  { at: KITE[2], label: 'C', dx: 0, dy: 16 },
  { at: KITE[3], label: 'D', dx: 10, dy: 4 }
];
const KiteFig: React.FC = () => (
  <VectorSubtractionGrid
    cols={8}
    rows={8}
    cell={22}
    grid={false}
    className="w-full max-w-[200px] h-auto mx-auto"
    polygons={[
      { pts: KITE, stroke: '#475569', fill: 'rgba(148,163,184,0.1)' },
      { pts: [KITE[0], KITE[2]], stroke: '#94a3b8', dashed: true }
    ]}
    points={KITE_POINTS}
  />
);

const RECT_POINTS = [
  { at: [1, 1] as GP, label: 'A', dx: -8, dy: 12 },
  { at: [7, 1] as GP, label: 'B', dx: 8, dy: 12 },
  { at: [7, 3.5] as GP, label: 'C', dx: 8, dy: -4 },
  { at: [1, 3.5] as GP, label: 'D', dx: -8, dy: -4 }
];

export const VECTOR_SUBTRACTION_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalom és szerkesztés (1–10)
  {
    id: 'vs-q1',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Ha →c = →a + →b, akkor mivel egyenlő →c − →b?',
    options: ['→a', '→b', '→c + →b', '−→a'],
    correctAnswer: 0,
    explanation: 'A definíció szerint ha →c = →a + →b, akkor az →a vektort nevezzük a →c és a →b különbségvektorának: →c − →b = →a.'
  },
  {
    id: 'vs-q2',
    level: 1,
    questionTypeBadge: 'Szerkesztés',
    figure: (
      <VectorSubtractionGrid
        cols={9}
        rows={5}
        cell={28}
        grid={false}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [8, 1.6], label: 'b', color: GREEN, side: -1 },
          { from: [1, 1], to: [4.5, 4.5], label: 'c', color: BLUE, side: 1 },
          { from: [8, 1.6], to: [4.5, 4.5], label: '?', color: RED, side: -1, dashed: true, plain: true }
        ]}
      />
    ),
    question: 'A →b és →c vektort közös kezdőpontból vettük fel. Honnan hova mutat a →c − →b különbségvektor?',
    options: [
      'A →b végpontjából a →c végpontjába',
      'A →c végpontjából a →b végpontjába',
      'A közös kezdőpontból a paralelogramma szemközti csúcsába',
      'A →c végpontjából a közös kezdőpontba'
    ],
    correctAnswer: 0,
    explanation: 'A különbségvektor a kivonandó (→b) végpontjából a kisebbítendő (→c) végpontjába mutat. Ellenőrzés: →b + (→c − →b) = →c.'
  },
  {
    id: 'vs-q3',
    level: 1,
    questionTypeBadge: 'Ellentett hozzáadása',
    question: 'Melyik vektor egyenlő →a − →b-vel?',
    options: ['→a + (−→b)', '→b + (−→a)', '−→a − →b', '→b − →a'],
    correctAnswer: 0,
    explanation: 'A vektorok különbsége előáll a kisebbítendő és a kivonandó ellentettjének összegeként: →a − →b = →a + (−→b). (→b − →a ennek az ellentettje.)'
  },
  {
    id: 'vs-q4',
    level: 1,
    questionTypeBadge: 'Különbség pontokkal',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={5}
        cell={28}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [7, 1.5], [3, 4.5]], stroke: '#cbd5e1' }]}
        vectors={[
          { from: [1, 1], to: [7, 1.5], color: BLUE },
          { from: [1, 1], to: [3, 4.5], color: GREEN }
        ]}
        points={[
          { at: [1, 1], label: 'A', dx: -8, dy: 12 },
          { at: [7, 1.5], label: 'B', dx: 10, dy: 10 },
          { at: [3, 4.5], label: 'C', dx: 0, dy: -8 }
        ]}
      />
    ),
    question: 'Mivel egyenlő →AB − →AC?',
    options: ['→CB', '→BC', '→AB + →AC', '→CA'],
    correctAnswer: 0,
    explanation: 'Közös kezdőpont (A): a különbség a kivonandó végpontjából (C) a kisebbítendő végpontjába (B) mutat, tehát →AB − →AC = →CB. Ellenőrzés: →AC + →CB = →AB.'
  },
  {
    id: 'vs-q5',
    level: 1,
    questionTypeBadge: 'Nullvektor',
    question: 'Mivel egyenlő →a − →a?',
    options: ['→0 (nullvektor)', '2→a', '−→a', 'A 0 számmal'],
    correctAnswer: 0,
    explanation: '→a − →a = →a + (−→a) = →0. A műveletek eredménye vektor, nem szám.'
  },
  {
    id: 'vs-q6',
    level: 1,
    questionTypeBadge: 'Paralelogramma átlói',
    figure: (
      <VectorSubtractionGrid
        cols={9}
        rows={5}
        cell={26}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [6, 1], [8, 4.4], [3, 4.4]], dashed: true, fill: 'rgba(37,99,235,0.05)' }]}
        vectors={[
          { from: [1, 1], to: [6, 1], label: 'a', color: BLUE, side: -1 },
          { from: [1, 1], to: [3, 4.4], label: 'b', color: GREEN, side: 1 }
        ]}
      />
    ),
    question: 'Az →a és →b vektor egy paralelogramma közös pontból induló oldalvektorai. Melyik vektor az →a − →b?',
    options: [
      'A →b végpontjából az →a végpontjába mutató átlóvektor',
      'A közös pontból induló átlóvektor',
      'Az →a végpontjából a →b végpontjába mutató átlóvektor',
      'A paralelogramma egyik oldalvektora'
    ],
    correctAnswer: 0,
    explanation: 'A közös pontból induló átló →a + →b, a másik átló →b végpontjából →a végpontjába mutatva →a − →b. Fordított irányítással →b − →a lenne.'
  },
  {
    id: 'vs-q7',
    level: 1,
    questionTypeBadge: 'Ellentett különbség',
    question: 'Milyen kapcsolatban van →a − →b és →b − →a?',
    options: ['Egymás ellentettjei', 'Egyenlők', 'Merőlegesek egymásra', 'Nincs köztük kapcsolat'],
    correctAnswer: 0,
    explanation: 'A paralelogramma ugyanazon átlójának két irányítása: −(→a − →b) = →b − →a. A kivonás tehát nem felcserélhető.'
  },
  {
    id: 'vs-q8',
    level: 1,
    questionTypeBadge: 'Elmozdulásvektor',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={5}
        cell={28}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [6, 2], label: 'a', color: BLUE, side: -1 },
          { from: [1, 1], to: [3, 4.5], label: 'b', color: GREEN, side: 1 }
        ]}
        points={[
          { at: [1, 1], label: 'O', dx: -8, dy: 12 },
          { at: [6, 2], label: 'A', dx: 10, dy: 4 },
          { at: [3, 4.5], label: 'B', dx: 0, dy: -8 }
        ]}
      />
    ),
    question: 'Egy test az A pontból a B pontba került. Az A-ba mutató helyvektor →a = →OA, a B-be mutató →b = →OB. Melyik vektor adja a test elmozdulását?',
    options: ['→b − →a', '→a − →b', '→a + →b', '→b'],
    correctAnswer: 0,
    explanation: 'Változás = végállapot − kezdőállapot, így az elmozdulás →AB = →OB − →OA = →b − →a.'
  },
  {
    id: 'vs-q9',
    level: 1,
    questionTypeBadge: 'Oldalszél',
    question: 'A repülőgép földhöz viszonyított sebessége →e = →v + →s, ahol →v a levegőhöz viszonyított sebesség, →s a szél sebessége. Mivel egyenlő →v?',
    options: ['→e − →s', '→e + →s', '→s − →e', '→e'],
    correctAnswer: 0,
    explanation: 'Az →e = →v + →s egyenlőségből a különbség definíciója szerint →v = →e − →s = →e + (−→s): a pilótának a szél ellen kell dolgoznia.'
  },
  {
    id: 'vs-q10',
    level: 1,
    questionTypeBadge: 'Különbség pontokkal',
    figure: (
      <VectorSubtractionGrid
        cols={9}
        rows={5}
        cell={26}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [6, 1], [8, 4.2], [3, 4.2]], stroke: '#cbd5e1' }]}
        vectors={[
          { from: [1, 1], to: [6, 1], color: BLUE },
          { from: [1, 1], to: [3, 4.2], color: GREEN }
        ]}
        points={[
          { at: [1, 1], label: 'A', dx: -8, dy: 12 },
          { at: [6, 1], label: 'B', dx: 8, dy: 12 },
          { at: [8, 4.2], label: 'C', dx: 8, dy: -4 },
          { at: [3, 4.2], label: 'D', dx: -8, dy: -4 }
        ]}
      />
    ),
    question: 'Az ABCD paralelogrammában mivel egyenlő →AB − →AD?',
    options: ['→DB', '→BD', '→AC', '→CA'],
    correctAnswer: 0,
    explanation: 'A kivonandó (→AD) végpontjából, D-ből a kisebbítendő végpontjába, B-be mutat: →AB − →AD = →DB.'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'vs-q11',
    level: 2,
    questionTypeBadge: 'Különbség a rácson',
    figure: (
      <VectorSubtractionGrid
        cols={7}
        rows={6}
        cell={26}
        className={FIG}
        vectors={[
          { from: [1, 1], to: [5, 2], label: 'a', color: BLUE, side: -1 },
          { from: [1, 1], to: [2, 4], label: 'b', color: GREEN, side: 1 }
        ]}
      />
    ),
    question: 'A rács négyzeteinek oldala 1 egység. Milyen hosszú az →a − →b vektor?',
    options: ['√13 ≈ 3,61', '√41 ≈ 6,40', '√17 + √10 ≈ 7,29', '√17 − √10 ≈ 0,96'],
    correctAnswer: 0,
    explanation: '→a − →b a →b végpontjából az →a végpontjába mutat: 3 egység jobbra és 2 le, így a hossza √(9 + 4) = √13 ≈ 3,61. (√41 ≈ 6,40 az →a + →b hossza; a hosszak összege vagy különbsége nem a különbségvektor hossza.)'
  },
  {
    id: 'vs-q12',
    level: 2,
    questionTypeBadge: 'Merőleges vektorok',
    figure: (
      <VectorSubtractionGrid
        cols={6}
        rows={6}
        cell={26}
        className={FIG}
        rightAngles={[{ at: [1, 1], p: [4, 1], q: [1, 5] }]}
        vectors={[
          { from: [1, 1], to: [4, 1], label: 'a', color: BLUE, side: -1 },
          { from: [1, 1], to: [1, 5], label: 'b', color: GREEN, side: 1 }
        ]}
      />
    ),
    question: 'A rács négyzeteinek oldala 1 egység, →a ⊥ →b. Mekkora |→a − →b|?',
    options: ['5', '1', '7', '√7 ≈ 2,65'],
    correctAnswer: 0,
    explanation: '|→a| = 3, |→b| = 4, a különbségvektor a derékszögű háromszög átfogója: √(9 + 16) = 5. Merőleges vektoroknál |→a − →b| = |→a + →b|.'
  },
  {
    id: 'vs-q13',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={4.5}
        cell={28}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [7, 1], [7, 3.5], [1, 3.5]], stroke: '#475569' }]}
        points={RECT_POINTS}
        texts={[
          { at: [4, 0.4], text: '6 cm' },
          { at: [0.25, 2.35], text: '2,5', anchor: 'middle' }
        ]}
      />
    ),
    question: 'Az ABCD téglalapban AB = 6 cm, AD = 2,5 cm. Mekkora |→BA + →BC|?',
    options: ['6,5 cm', '8,5 cm', '3,5 cm', '15 cm'],
    correctAnswer: 0,
    explanation: '→BA + →BC a B-ből induló átlóvektor, →BD. Hossza √(6² + 2,5²) = √42,25 = 6,5 cm.'
  },
  {
    id: 'vs-q14',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={4.5}
        cell={28}
        grid={false}
        className={FIG}
        polygons={[{ pts: [[1, 1], [7, 1], [7, 3.5], [1, 3.5]], stroke: '#475569' }]}
        points={RECT_POINTS}
        texts={[
          { at: [4, 0.4], text: '6 cm' },
          { at: [0.25, 2.35], text: '2,5', anchor: 'middle' }
        ]}
      />
    ),
    question: 'Az ABCD téglalapban AB = 6 cm, AD = 2,5 cm. Mekkora |→BA − →BC|?',
    options: ['6,5 cm', '3,5 cm', '8,5 cm', '0 cm'],
    correctAnswer: 0,
    explanation: '→BA − →BC = →CA (C-ből A-ba mutat), a téglalap másik átlója. A téglalap átlói egyenlők, így ez is 6,5 cm. (3,5 cm = 6 − 2,5 a hosszak kivonása lenne.)'
  },
  {
    id: 'vs-q15',
    level: 2,
    questionTypeBadge: 'Rombusz',
    figure: (
      <VectorSubtractionGrid
        cols={10}
        rows={9}
        cell={18}
        grid={false}
        className={FIG}
        polygons={[
          { pts: [[2, 4.5], [5, 8.5], [8, 4.5], [5, 0.5]], stroke: '#475569', fill: 'rgba(148,163,184,0.08)' },
          { pts: [[2, 4.5], [8, 4.5]], stroke: '#94a3b8', dashed: true },
          { pts: [[5, 8.5], [5, 0.5]], stroke: '#94a3b8', dashed: true }
        ]}
        points={[
          { at: [2, 4.5], label: 'A', dx: -10, dy: 4 },
          { at: [5, 0.5], label: 'B', dx: 0, dy: 16 },
          { at: [8, 4.5], label: 'C', dx: 10, dy: 4 },
          { at: [5, 8.5], label: 'D', dx: 0, dy: -8 }
        ]}
        texts={[
          { at: [7.2, 2.2], text: '?', color: RED, size: 14 },
          { at: [5.6, 6.6], text: '8', color: '#475569', anchor: 'start' },
          { at: [3.4, 4.0], text: '6', color: '#475569' }
        ]}
      />
    ),
    question: 'Az ABCD rombuszban |→BA + →BC| = 8 cm és |→BA − →BC| = 6 cm. Milyen hosszú a rombusz oldala?',
    options: ['5 cm', '7 cm', '10 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'A két adat a rombusz két átlója (→BD és →CA): 8 cm és 6 cm. Az átlók merőlegesen felezik egymást, így az oldal √(4² + 3²) = 5 cm.'
  },
  {
    id: 'vs-q16',
    level: 2,
    questionTypeBadge: 'Rombusz',
    question: 'Az előző rombuszban (oldala 5 cm) mekkora |→AB + →DC|?',
    options: ['10 cm', '0 cm', '5 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'A rombusz szemközti oldalai párhuzamosak és egyirányúak: →DC = →AB, így →AB + →DC = 2 · →AB, hossza 10 cm.'
  },
  {
    id: 'vs-q17',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Mivel egyenlő (→a − →b) + (→b − →a)?',
    options: ['→0', '2→a − 2→b', '2→a', '→a − →b'],
    correctAnswer: 0,
    explanation: 'A két zárójeles vektor egymás ellentettje, összegük a nullvektor: (→a − →b) + (→b − →a) = →0.'
  },
  {
    id: 'vs-q18',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Mivel egyenlő →c + →d − →a + (−→c) − →d?',
    options: ['−→a', '→a', '→0', '2→c − →a'],
    correctAnswer: 0,
    explanation: '→c és −→c, valamint →d és −→d kiejti egymást, marad −→a.'
  },
  {
    id: 'vs-q19',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Mivel egyenlő →a + →b − (→b − →a) + (−→a)?',
    options: ['→a', '→0', '2→b − →a', '−→a'],
    correctAnswer: 0,
    explanation: '→a + →b − →b + →a − →a = →a. Vigyázz: a zárójel előtti kivonás miatt −(→b − →a) = −→b + →a.'
  },
  {
    id: 'vs-q20',
    level: 2,
    questionTypeBadge: 'Azonosságok',
    question: 'Melyik egyenlőség igaz minden →a, →b, →c vektorra?',
    options: ['→a − (→b + →c) = →a − →b − →c', '→a − (→b + →c) = →a − →b + →c', '→a − →b = →b − →a', '→a − (→b − →c) = →a − →b − →c'],
    correctAnswer: 0,
    explanation: '→a − (→b + →c) = →a + (−→b) + (−→c) = →a − →b − →c (tankönyv 4. c) feladat). A kivonás nem felcserélhető, és zárójelfelbontásnál a jelek megfordulnak.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'vs-q21',
    level: 3,
    questionTypeBadge: 'Átlók hossza',
    question: 'Két nem párhuzamos vektorra |→u + →v| = |→u − →v|. Mit tudunk →u és →v kapcsolatáról?',
    options: ['Merőlegesek egymásra', 'Egyenlő hosszúak', 'Egymás ellentettjei', 'Egyirányúak'],
    correctAnswer: 0,
    explanation: '|→u + →v| és |→u − →v| a paralelogramma két átlójának hossza. Az átlók pontosan akkor egyenlők, ha a paralelogramma téglalap, vagyis →u ⊥ →v.'
  },
  {
    id: 'vs-q22',
    level: 3,
    questionTypeBadge: 'Átlók helyzete',
    question: 'Két nem párhuzamos vektorra (→u + →v) merőleges (→u − →v)-re. Mit tudunk →u és →v kapcsolatáról?',
    options: ['Egyenlő hosszúak: |→u| = |→v|', 'Merőlegesek egymásra', 'Egyirányúak', '|→u| = 2|→v|'],
    correctAnswer: 0,
    explanation: 'A két vektor a paralelogramma két átlója. Az átlók pontosan akkor merőlegesek, ha a paralelogramma rombusz, vagyis |→u| = |→v|.'
  },
  {
    id: 'vs-q23',
    level: 3,
    questionTypeBadge: 'Deltoid',
    figure: <KiteFig />,
    question: 'Az ABCD konvex deltoid szimmetriaátlója AC. Melyik egyenlőség igaz?',
    options: ['→AB − →CB = →AC', '→AB − →AD = →BD', '→AB − →CB = →CA', '→BA − →BC = →AC'],
    correctAnswer: 0,
    explanation: '→AB − →CB = →AB + →BC = →AC. A többi hibás irányú: →AB − →AD = →DB, és →BA − →BC = →CA.'
  },
  {
    id: 'vs-q24',
    level: 3,
    questionTypeBadge: 'Deltoid',
    figure: <KiteFig />,
    question: 'Az ABCD konvex deltoid szimmetriaátlója AC. Milyen helyzetű egymáshoz képest az →AB + →BC és a →CD + →BC vektor?',
    options: ['Merőlegesek', 'Párhuzamosak és egyirányúak', 'Egymás ellentettjei', 'Egyenlők'],
    correctAnswer: 0,
    explanation: '→AB + →BC = →AC és →CD + →BC = →BC + →CD = →BD. A deltoid átlói merőlegesek, ezért a két vektor is merőleges.'
  },
  {
    id: 'vs-q25',
    level: 3,
    questionTypeBadge: 'Elmozdulás',
    question: 'Egy turista sík terepen 12 km-t megy északnyugati irányba, majd 12 km-t északkeleti irányba. Merre mutat és milyen hosszú az elmozdulásvektora?',
    options: ['Észak felé, ≈ 16,97 km', 'Észak felé, 24 km', 'Északkelet felé, ≈ 16,97 km', 'Északnyugat felé, 12 km'],
    correctAnswer: 0,
    explanation: 'Az északnyugati és az északkeleti irány merőleges, a két egyenlő hosszú elmozdulás összege egy négyzet átlója: 12√2 ≈ 16,97 km, és szimmetria miatt pontosan észak felé mutat.'
  },
  {
    id: 'vs-q26',
    level: 3,
    questionTypeBadge: 'Különbség hossza',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        arcs={[{ at: [1, 0.8], p: [6, 0.8], q: [2.5, 3.4], r: 20, label: '60°' }]}
        vectors={[
          { from: [1, 0.8], to: [6, 0.8], label: 'a', color: BLUE, side: -1 },
          { from: [1, 0.8], to: [2.5, 3.4], label: 'b', color: GREEN, side: 1 },
          { from: [2.5, 3.4], to: [6, 0.8], label: '?', color: RED, side: 1, dashed: true, plain: true }
        ]}
        texts={[
          { at: [4.6, 0.25], text: '5', color: BLUE },
          { at: [2.4, 3.75], text: '3', color: GREEN, anchor: 'start' }
        ]}
      />
    ),
    question: '|→a| = 5, |→b| = 3, a két vektor szöge 60°. Mekkora |→a − →b|?',
    options: ['√19 ≈ 4,36', '7', '2', '√34 ≈ 5,83'],
    correctAnswer: 0,
    explanation: 'Az →a, →b és →a − →b háromszöget alkot, amelyben a 60°-os szöggel szemközti oldal a különbség: |→a − →b|² = 25 + 9 − 2 · 5 · 3 · cos 60° = 19 ⇒ ≈ 4,36. (7 az összeg hossza.)'
  },
  {
    id: 'vs-q27',
    level: 3,
    questionTypeBadge: 'Különbség hossza',
    figure: (
      <VectorSubtractionGrid
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
    question: '|→a| = |→b| = 4, a két vektor szöge 120°. Mekkora |→a − →b|?',
    options: ['4√3 ≈ 6,93', '4', '8', '0'],
    correctAnswer: 0,
    explanation: 'Koszinusztétellel: |→a − →b|² = 16 + 16 − 2 · 16 · cos 120° = 32 + 16 = 48 ⇒ |→a − →b| = √48 = 4√3 ≈ 6,93. (4 az összeg hossza.)'
  },
  {
    id: 'vs-q28',
    level: 3,
    questionTypeBadge: 'Szabályos háromszög',
    figure: (
      <VectorSubtractionGrid
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
    question: 'Az ABC szabályos háromszög oldala 2 cm. Milyen hosszú az →AB − →AC vektor?',
    options: ['2 cm', '0 cm', '2√3 ≈ 3,46 cm', '4 cm'],
    correctAnswer: 0,
    explanation: '→AB − →AC = →CB, ami a háromszög egyik oldala: 2 cm. (2√3 ≈ 3,46 cm az →AB + →AC hossza.)'
  },
  {
    id: 'vs-q29',
    level: 3,
    questionTypeBadge: 'Pontok különbsége',
    question: 'Tetszőleges A, B, C pontra mivel egyenlő →AB − →CB + →CA?',
    options: ['→0', '2 · →AB', '→AC', '2 · →CA'],
    correctAnswer: 0,
    explanation: '−→CB = →BC, így →AB + →BC + →CA: A-ból B-n és C-n át visszajutunk A-ba, az eredmény →0 (tankönyv 5. b) VI.).'
  },
  {
    id: 'vs-q30',
    level: 3,
    questionTypeBadge: 'Oldalszél',
    figure: (
      <VectorSubtractionGrid
        cols={8}
        rows={4}
        cell={30}
        grid={false}
        className={FIG}
        rightAngles={[{ at: [7, 2.8], p: [1, 2.8], q: [7, 0.6] }]}
        vectors={[
          { from: [1, 2.8], to: [7, 2.8], label: 'e', color: BLUE, side: 1 },
          { from: [7, 0.6], to: [7, 2.8], label: 's', color: GREEN, side: -1 },
          { from: [1, 2.8], to: [7, 0.6], label: 'v', color: RED, side: -1 }
        ]}
        points={[{ at: [1, 2.8], label: 'R', dx: -8, dy: 4 }]}
        texts={[
          { at: [4, 3.55], text: '70 m/s', color: BLUE },
          { at: [7.3, 1.75], text: '10 m/s', color: GREEN, anchor: 'start' }
        ]}
      />
    ),
    question: 'A gépnek a pálya mentén |→e| = 70 m/s sebességgel kell haladnia a földhöz képest, a merőleges oldalszél sebessége |→s| = 10 m/s. Mekkora legyen a levegőhöz viszonyított sebessége (→v = →e − →s)?',
    options: ['≈ 70,7 m/s', '80 m/s', '60 m/s', '≈ 69,3 m/s'],
    correctAnswer: 0,
    explanation: '→v = →e − →s, és →e ⊥ →s, így |→v| = √(70² + 10²) = √5000 ≈ 70,7 m/s – a szélcsendesnél kicsit nagyobb sebesség kell. (≈ 69,3 m/s = √(70² − 10²) hibás.)'
  }
];

export const VectorSubtractionQuiz: React.FC<{
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
      topicId="g11-geo-vektor-kulonbseg-quiz"
      subtopicId="ket-vektor-kulonbsege"
      title="2. Két vektor különbsége – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a különbségvektor szerkesztése, a paralelogramma átlói, egyszerűsítések, hosszak."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={VECTOR_SUBTRACTION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció és szerkesztés',
          items: [
            'Ha →c = →a + →b, akkor →c − →b = →a.',
            'Közös kezdőpont: a kivonandó végpontjából a kisebbítendő végpontjába.',
            '→c − →b = →c + (−→b).',
            'Pontokkal: →OB − →OA = →AB; →AB − →AC = →CB.'
          ]
        },
        {
          title: 'Paralelogramma',
          items: [
            'Közös pontból induló átló: →a + →b.',
            'Másik átló (→b végétől →a végéig): →a − →b.',
            '−(→a − →b) = →b − →a.',
            'Téglalap ⟺ |→a + →b| = |→a − →b|; rombusz ⟺ átlók merőlegesek.'
          ]
        },
        {
          title: 'Alkalmazások',
          items: [
            'Változás = végállapot − kezdőállapot: elmozdulás →b − →a.',
            'Pilóta: →v = →e − →s (a szél ellen dolgozik).',
            '(→a − →b) + (→b − →a) = →0.',
            '→a − (→b + →c) = →a − →b − →c.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <VectorSubtractionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <VectorSubtractionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default VectorSubtractionQuiz;
