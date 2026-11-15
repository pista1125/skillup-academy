import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MidpointMatcher } from './MidpointMatcher';
import { MidpointSorter } from './MidpointSorter';
import { MidpointPlane, MidpointPlaneProps } from './MidpointFigures';

// ---- Kvízábrák (kis koordináta-rendszerek) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

/** Rács és beosztás nélkül, hogy a keresett pont koordinátái ne legyenek leolvashatók. */
const Fig: React.FC<MidpointPlaneProps> = (props) => <MidpointPlane className={FIG} grid={0} labels={-1} {...props} />;

const MIDPOINT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A felezőpont képlete, egyszerű esetek (1–10)
  {
    id: 'mp-q1',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Mik az AB szakasz F felezőpontjának koordinátái, ha A(a₁; a₂) és B(b₁; b₂)?',
    options: [
      'F((a₁ + b₁)/2; (a₂ + b₂)/2)',
      'F((b₁ − a₁)/2; (b₂ − a₂)/2)',
      'F(a₁ + b₁; a₂ + b₂)',
      'F((a₁ + a₂)/2; (b₁ + b₂)/2)'
    ],
    correctAnswer: 0,
    explanation: 'A felezőpont koordinátái a végpontok megfelelő koordinátáinak számtani közepei: az első koordinátákat egymással, a másodikakat egymással átlagoljuk.'
  },
  {
    id: 'mp-q2',
    level: 1,
    questionTypeBadge: 'Felezőpont',
    figure: (
      <Fig
        x={[-1, 8]}
        y={[-1, 9]}
        unit={22}
        segs={[{ from: [2, 4], to: [6, 8], width: 2.2 }]}
        points={[
          { at: [2, 4], label: 'A(2; 4)', dx: -4, dy: 14, color: BLUE },
          { at: [6, 8], label: 'B(6; 8)', dx: -24, dy: 0, color: GREEN },
          { at: [4, 6], label: 'F = ?', dx: 22, dy: 4, color: RED }
        ]}
      />
    ),
    question: 'Mik az AB szakasz F felezőpontjának koordinátái, ha A(2; 4) és B(6; 8)?',
    options: ['(4; 6)', '(2; 2)', '(8; 12)', '(4; 4)'],
    correctAnswer: 0,
    explanation: 'F((2 + 6)/2; (4 + 8)/2) = F(4; 6). A (2; 2) az ½ →AB vektor, a (8; 12) az összeg felezés nélkül.'
  },
  {
    id: 'mp-q3',
    level: 1,
    questionTypeBadge: 'Alkalmazás',
    figure: (
      <Fig
        x={[-1, 13]}
        y={[-3, 5]}
        unit={19}
        segs={[{ from: [0, -2], to: [12, 4], color: BLUE, width: 3 }]}
        points={[
          { at: [0, -2], label: 'A(0; −2)', dx: 26, dy: 10, color: BLUE },
          { at: [12, 4], label: 'B(12; 4)', dx: -6, dy: -8, color: BLUE },
          { at: [6, 1], label: '?', dx: -4, dy: -8, color: RED }
        ]}
      />
    ),
    question: 'A mozgólépcső 30 s alatt viszi fel az utast az A(0; −2) pontból a B(12; 4) pontba (egység: méter, az x tengely az utcaszint). Milyen magasan van az utas 15 s után?',
    options: ['1 m-rel az utcaszint felett', '3 m-rel az utcaszint felett', '2 m-rel az utcaszint felett', 'Pontosan az utcaszinten'],
    correctAnswer: 0,
    explanation: '15 s az út fele, így az utas az AB felezőpontjában van: F((0 + 12)/2; (−2 + 4)/2) = F(6; 1). A második koordináta 1, tehát 1 m-rel van az utcaszint felett.'
  },
  {
    id: 'mp-q4',
    level: 1,
    questionTypeBadge: 'Felezőpont',
    figure: (
      <Fig
        x={[-5, 11]}
        y={[-1, 8]}
        unit={17}
        segs={[{ from: [-4, 3], to: [10, 7], width: 2.2 }]}
        points={[
          { at: [-4, 3], label: 'A(−4; 3)', dx: 6, dy: -8, color: BLUE },
          { at: [10, 7], label: 'B(10; 7)', dx: -6, dy: -8, color: GREEN },
          { at: [3, 5], label: 'F = ?', dx: 0, dy: 14, color: RED }
        ]}
      />
    ),
    question: 'Határozd meg az AB szakasz F felezőpontját, ha A(−4; 3) és B(10; 7)!',
    options: ['F(3; 5)', 'F(7; 2)', 'F(6; 10)', 'F(−7; −2)'],
    correctAnswer: 0,
    explanation: 'F((−4 + 10)/2; (3 + 7)/2) = F(3; 5). A (7; 2) az ½ →AB vektor (különbség fele), a (6; 10) az →a + →b átlóvektor, aminek csak a fele a felezőpont helyvektora.'
  },
  {
    id: 'mp-q5',
    level: 1,
    questionTypeBadge: 'Helyvektor',
    question: 'Az A és B pont helyvektora →a és →b. Mi az AB szakasz F felezőpontjának →f helyvektora?',
    options: ['→f = ½(→a + →b)', '→f = ½(→b − →a)', '→f = →a + →b', '→f = 2(→a + →b)'],
    correctAnswer: 0,
    explanation: 'Az →a és →b által kifeszített paralelogramma O-ból induló átlója →a + →b; az átlók felezik egymást, így F az átló felezőpontja: →f = ½(→a + →b).'
  },
  {
    id: 'mp-q6',
    level: 1,
    questionTypeBadge: 'Indoklás',
    figure: (
      <Fig
        x={[-5, 11]}
        y={[-1, 11]}
        unit={16}
        polys={[{ pts: [[0, 0], [-4, 3], [6, 10], [10, 7]], stroke: '#94a3b8', dashed: true }]}
        segs={[{ from: [-4, 3], to: [10, 7], width: 1.8 }]}
        vecs={[
          { from: [0, 0], to: [-4, 3], color: BLUE, label: 'a', lx: -6, ly: 12 },
          { from: [0, 0], to: [10, 7], color: GREEN, label: 'b', lx: 10, ly: 12 },
          { from: [0, 0], to: [6, 10], color: PURPLE, width: 1.5, dashed: true }
        ]}
        points={[
          { at: [-4, 3], label: 'A', dx: -8, dy: -4 },
          { at: [10, 7], label: 'B', dx: 8, dy: -4 },
          { at: [6, 10], label: 'P', dx: -8, dy: -4 },
          { at: [3, 5], label: 'F', dx: -8, dy: -4, color: RED }
        ]}
      />
    ),
    question: 'Az ábrán AOBP paralelogramma, F az AB szakasz felezőpontja. Miért igaz, hogy F az OP átlónak is felezőpontja?',
    options: [
      'Mert a paralelogramma átlói felezik egymást',
      'Mert a paralelogramma átlói merőlegesek egymásra',
      'Mert a paralelogramma átlói egyenlő hosszúak',
      'Mert OA = OB'
    ],
    correctAnswer: 0,
    explanation: 'Minden paralelogramma átlói felezik egymást, így az AB és az OP átló közös F pontja mindkettőnek felezőpontja: →f = ½ →OP = ½(→a + →b).'
  },
  {
    id: 'mp-q7',
    level: 1,
    questionTypeBadge: 'Előjelek',
    question: 'Mik a felezőpont koordinátái, ha A(−3; −5) és B(5; 1)?',
    options: ['(1; −2)', '(4; 3)', '(2; −4)', '(1; 2)'],
    correctAnswer: 0,
    explanation: 'F((−3 + 5)/2; (−5 + 1)/2) = F(1; −2). A (4; 3) a különbség fele, a (2; −4) a felezés nélküli összeg, az (1; 2) előjelhibás.'
  },
  {
    id: 'mp-q8',
    level: 1,
    questionTypeBadge: 'Felezőpont',
    figure: (
      <Fig
        x={[-7, 3]}
        y={[-2, 2]}
        unit={24}
        segs={[{ from: [-6, 0], to: [2, 0], color: BLUE, width: 3 }]}
        points={[
          { at: [-6, 0], label: 'A(−6; 0)', dx: 6, dy: -9, color: BLUE },
          { at: [2, 0], label: 'B(2; 0)', dx: -2, dy: -9, color: BLUE },
          { at: [-2, 0], label: '?', dy: -9, color: RED }
        ]}
      />
    ),
    question: 'Az A(−6; 0) és a B(2; 0) pont az x tengelyen van. Hol van az AB szakasz felezőpontja?',
    options: ['(−2; 0)', '(4; 0)', '(−4; 0)', '(−8; 0)'],
    correctAnswer: 0,
    explanation: '(−6 + 2)/2 = −2 és (0 + 0)/2 = 0, így F(−2; 0). A (4; 0) a különbség fele, a (−8; 0) a különbség.'
  },
  {
    id: 'mp-q9',
    level: 1,
    questionTypeBadge: 'Helyvektor',
    question: 'Hol van az OA szakasz felezőpontja, ha O az origó és A(8; −6)?',
    options: ['(4; −3)', '(−4; 3)', '(16; −12)', '(8; −3)'],
    correctAnswer: 0,
    explanation: 'O(0; 0), így F((0 + 8)/2; (0 − 6)/2) = F(4; −3) – a helyvektor fele.'
  },
  {
    id: 'mp-q10',
    level: 1,
    questionTypeBadge: 'Visszafelé',
    figure: (
      <Fig
        x={[-2, 5]}
        y={[-1, 5]}
        unit={30}
        segs={[{ from: [-1, 0], to: [3, 4], width: 2, dashed: true }]}
        points={[
          { at: [-1, 0], label: 'A(−1; 0)', dx: 4, dy: 14, color: BLUE },
          { at: [1, 2], label: 'F(1; 2)', dx: 26, dy: 4, color: RED },
          { at: [3, 4], label: 'B = ?', dx: -22, dy: 0, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Az AB szakasz felezőpontja F(1; 2), egyik végpontja A(−1; 0). Mik a B végpont koordinátái?',
    options: ['B(3; 4)', 'B(0; 1)', 'B(2; 2)', 'B(−3; −2)'],
    correctAnswer: 0,
    explanation: 'F az A és B átlaga, ezért B = 2F − A = (2 + 1; 4 − 0) = (3; 4). Ellenőrzés: ((−1 + 3)/2; (0 + 4)/2) = (1; 2). ✓'
  },

  // LEVEL 2: Negyedelőpont, meghosszabbítás, tükrözés, négyzet, háromszög (11–20)
  {
    id: 'mp-q11',
    level: 2,
    questionTypeBadge: 'Felezőpont',
    question: 'Adottak a P(−4; 16) és a Q(20; −2) pontok. Mik a PQ szakasz F felezőpontjának koordinátái?',
    options: ['F(8; 7)', 'F(12; −9)', 'F(16; 14)', 'F(8; 9)'],
    correctAnswer: 0,
    explanation: 'F((−4 + 20)/2; (16 − 2)/2) = F(8; 7). A (12; −9) az ½ →PQ vektor, a (16; 14) a felezés nélküli összeg.'
  },
  {
    id: 'mp-q12',
    level: 2,
    questionTypeBadge: 'Negyedelőpont',
    figure: (
      <Fig
        x={[-6, 22]}
        y={[-4, 18]}
        unit={9.5}
        segs={[{ from: [-4, 16], to: [20, -2], width: 2 }]}
        points={[
          { at: [-4, 16], label: 'P(−4; 16)', dx: 32, dy: -2 },
          { at: [20, -2], label: 'Q(20; −2)', dx: -8, dy: 13 },
          { at: [8, 7], label: 'F', dx: 8, dy: -6, color: RED },
          { at: [14, 2.5], label: 'N = ?', dx: 18, dy: -6, color: PURPLE }
        ]}
      />
    ),
    question: 'P(−4; 16), Q(20; −2). Mik a PQ szakasz Q-hoz legközelebb eső N negyedelőpontjának koordinátái?',
    options: ['N(14; 2,5)', 'N(2; 11,5)', 'N(8; 7)', 'N(12; 4,5)'],
    correctAnswer: 0,
    explanation: 'N az FQ szakasz felezőpontja, ahol F(8; 7): N((8 + 20)/2; (7 − 2)/2) = N(14; 2,5). (Másképp: N = P + ¾ →PQ.) A (2; 11,5) a P-hez legközelebbi negyedelőpont.'
  },
  {
    id: 'mp-q13',
    level: 2,
    questionTypeBadge: 'Távolság',
    question: 'F(8; 7) és N(14; 2,5). Mekkora az FN szakasz hossza?',
    options: ['7,5', '10,5', '56,25', '15'],
    correctAnswer: 0,
    explanation: '→FN = (6; −4,5), így FN = √(6² + 4,5²) = √(36 + 20,25) = √56,25 = 7,5. (Ez a 30 hosszú PQ szakasz negyede.)'
  },
  {
    id: 'mp-q14',
    level: 2,
    questionTypeBadge: 'Meghosszabbítás',
    figure: (
      <Fig
        x={[-6, 2]}
        y={[-8, 6]}
        unit={15}
        segs={[
          { from: [-2, 5], to: [-3, -1], width: 2.2 },
          { from: [-3, -1], to: [-4, -7], width: 1.6, dashed: true, color: '#64748b' }
        ]}
        points={[
          { at: [-2, 5], label: 'A(−2; 5)', dx: 26, dy: 2, color: BLUE },
          { at: [-3, -1], label: 'B(−3; −1)', dx: 30, dy: 2, color: GREEN },
          { at: [-4, -7], label: 'C = ?', dx: 22, dy: 2, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'A(−2; 5), B(−3; −1). Az AB szakaszt B-n túl meghosszabbítjuk az eredeti szakasz hosszával; a végpont C. Mik C koordinátái?',
    options: ['C(−4; −7)', 'C(−2,5; 2)', 'C(−1; −6)', 'C(−1; 11)'],
    correctAnswer: 0,
    explanation: 'B az AC szakasz felezőpontja, ezért C = 2B − A = (−6 + 2; −2 − 5) = (−4; −7). A (−1; 11) a B tükörképe A-ra (rossz irányba hosszabbítottunk), a (−1; −6) az →AB vektor.'
  },
  {
    id: 'mp-q15',
    level: 2,
    questionTypeBadge: 'Tükrözés pontra',
    figure: (
      <Fig
        x={[-6, 12]}
        y={[-8, 6]}
        unit={14}
        segs={[{ from: [7, -4], to: [-1, 2], width: 2 }]}
        points={[
          { at: [7, -4], label: 'P(7; −4)', dx: 6, dy: 13, color: BLUE },
          { at: [-1, 2], label: 'Q(−1; 2)', dx: -6, dy: -8, color: GREEN },
          { at: [3, -1], label: 'F', dx: -6, dy: -7, color: RED },
          { at: [11, -7], label: 'F′ = ?', dx: -10, dy: 13, color: PURPLE, hollow: true }
        ]}
      />
    ),
    question: 'P(7; −4), Q(−1; 2), F a PQ felezőpontja. Mik az F pont P-re vonatkozó F′ tükörképének koordinátái?',
    options: ['F′(11; −7)', 'F′(5; −2,5)', 'F′(−5; 5)', 'F′(4; −3)'],
    correctAnswer: 0,
    explanation: 'F(3; −1). P az FF′ szakasz felezőpontja, így F′ = 2P − F = (14 − 3; −8 + 1) = (11; −7). A (−5; 5) a Q-ra vett tükörkép.'
  },
  {
    id: 'mp-q16',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: (
      <Fig
        x={[-5, 19]}
        y={[-34, 18]}
        unit={4.6}
        segs={[{ from: [-3, 16], to: [17, -32], width: 1.8 }]}
        points={[
          { at: [-3, 16], label: 'A(−3; 16)', dx: 30, dy: 2, color: BLUE },
          { at: [7, -8], label: 'K(7; −8)', dx: 26, dy: 2, color: RED },
          { at: [17, -32], label: 'C = ?', dx: -20, dy: 4, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Egy négyzet középpontja K(7; −8), egyik csúcsa A(−3; 16). Mik az A-val szemközti C csúcs koordinátái?',
    options: ['C(17; −32)', 'C(2; 4)', 'C(−13; 40)', 'C(10; −24)'],
    correctAnswer: 0,
    explanation: 'A négyzet átlói felezik egymást, így K az AC felezőpontja: C = 2K − A = (14 + 3; −16 − 16) = (17; −32). A (2; 4) az AK felezőpontja, a (10; −24) a →AK vektor.'
  },
  {
    id: 'mp-q17',
    level: 2,
    questionTypeBadge: 'Távolság',
    question: 'A(−3; 16) és C(17; −32) egy négyzet két szemközti csúcsa. Milyen hosszú a négyzet átlója?',
    options: ['52', '26', '68', '1352'],
    correctAnswer: 0,
    explanation: '→AC = (20; −48), AC = √(20² + 48²) = √2704 = 52. A 68 = 20 + 48 nem hossz, a 1352 a négyzet területe (52²/2).'
  },
  {
    id: 'mp-q18',
    level: 2,
    questionTypeBadge: 'Oldalfelező pont',
    figure: (
      <Fig
        x={[-11, 12]}
        y={[-8, 14]}
        unit={10}
        polys={[{ pts: [[-10, -7], [10, 3], [10, 13]], fill: 'rgba(37,99,235,0.06)', stroke: BLUE }]}
        points={[
          { at: [-10, -7], label: 'A(−10; −7)', dx: 28, dy: 4 },
          { at: [10, 3], label: 'B(10; 3)', dx: -24, dy: 10 },
          { at: [10, 13], label: 'C(10; 13)', dx: -28, dy: 0 },
          { at: [10, 8], label: '?', dx: 9, dy: 4, color: RED }
        ]}
      />
    ),
    question: 'Az ABC háromszög csúcsai A(−10; −7), B(10; 3), C(10; 13). Mik a BC oldal felezőpontjának koordinátái?',
    options: ['(10; 8)', '(0; 5)', '(20; 16)', '(10; 5)'],
    correctAnswer: 0,
    explanation: '((10 + 10)/2; (3 + 13)/2) = (10; 8). A (0; 5) a különbség fele, a (20; 16) a felezés nélküli összeg.'
  },
  {
    id: 'mp-q19',
    level: 2,
    questionTypeBadge: 'Középvonal',
    figure: (
      <Fig
        x={[-11, 12]}
        y={[-8, 14]}
        unit={10}
        polys={[{ pts: [[-10, -7], [10, 3], [10, 13]], fill: 'rgba(37,99,235,0.06)', stroke: BLUE }]}
        segs={[{ from: [0, -2], to: [0, 3], color: RED, width: 2.4 }]}
        points={[
          { at: [-10, -7], label: 'A', dx: -2, dy: 13 },
          { at: [10, 3], label: 'B', dx: 9, dy: 4 },
          { at: [10, 13], label: 'C', dx: 9, dy: 4 },
          { at: [0, -2], label: 'F₁', dx: 8, dy: 12, color: RED },
          { at: [0, 3], label: 'F₂', dx: -10, dy: -4, color: RED }
        ]}
      />
    ),
    question: 'A(−10; −7), B(10; 3), C(10; 13). Milyen hosszú az a középvonal, amely az AB és az AC oldal felezőpontját köti össze (F₁F₂)?',
    options: ['5', '10', '2,5', '≈ 11,18'],
    correctAnswer: 0,
    explanation: 'F₁(0; −2), F₂(0; 3), így F₁F₂ = 5. Ez a vele párhuzamos BC oldal (10) fele, ahogy a középvonal-tétel mondja.'
  },
  {
    id: 'mp-q20',
    level: 2,
    questionTypeBadge: 'Kicsinyítés',
    question: 'Az A(−5; −6), B(16; 0) pontok esetén kicsinyítsük a B pontot A-ból ½ arányban! Hová kerül B?',
    options: ['B′(5,5; −3)', 'B′(10,5; 3)', 'B′(8; 0)', 'B′(21; 6)'],
    correctAnswer: 0,
    explanation: '½ arányú kicsinyítésnél B′ az AB felezőpontja: ((−5 + 16)/2; (−6 + 0)/2) = (5,5; −3). A (10,5; 3) az ½ →AB vektor, nem pont.'
  },

  // LEVEL 3: Osztópontok, nagyítás, súlypont, paralelogramma, Ráadás (21–30)
  {
    id: 'mp-q21',
    level: 3,
    questionTypeBadge: 'Kicsinyítés',
    question: 'A(−5; −6), C(10; 6). Kicsinyítsük a C pontot A-ból ¾ arányban! Mik a C′ képpont koordinátái?',
    options: ['C′(6,25; 3)', 'C′(7,5; 4,5)', 'C′(11,25; 9)', 'C′(2,5; 0)'],
    correctAnswer: 0,
    explanation: '→AC = (15; 12), →AC′ = ¾ · (15; 12) = (11,25; 9), így C′ = A + (11,25; 9) = (6,25; 3). A (7,5; 4,5) az origóból végzett kicsinyítés, a (2,5; 0) a ½ arányú.'
  },
  {
    id: 'mp-q22',
    level: 3,
    questionTypeBadge: 'Negyedelőpont',
    figure: (
      <Fig
        x={[-7, 3]}
        y={[-1, 8]}
        unit={26}
        polys={[{ pts: [[-6, 2], [2, 0], [1, 7]], fill: 'rgba(5,150,105,0.07)', stroke: GREEN }]}
        segs={[{ from: [-6, 2], to: [1.5, 3.5], color: AMBER, dashed: true, width: 1.6 }]}
        points={[
          { at: [-6, 2], label: 'A(−6; 2)', dx: 4, dy: 14 },
          { at: [2, 0], label: 'B(2; 0)', dx: -6, dy: 13 },
          { at: [1, 7], label: 'C(1; 7)', dx: 24, dy: 2 },
          { at: [1.5, 3.5], label: 'F', dx: 9, dy: 2, color: AMBER }
        ]}
      />
    ),
    question: 'A(−6; 2), B(2; 0), C(1; 7), F a BC oldal felezőpontja. Mik az AF szakasz középső negyedelőpontjának (azaz AF felezőpontjának) koordinátái?',
    options: ['(−2,25; 2,75)', '(−4,125; 2,375)', '(−0,375; 3,125)', '(−2,5; 4,5)'],
    correctAnswer: 0,
    explanation: 'F((2 + 1)/2; (0 + 7)/2) = F(1,5; 3,5). AF felezőpontja ((−6 + 1,5)/2; (2 + 3,5)/2) = (−2,25; 2,75). A másik két negyedelőpont (−4,125; 2,375) és (−0,375; 3,125); a (−2,5; 4,5) az AC felezőpontja.'
  },
  {
    id: 'mp-q23',
    level: 3,
    questionTypeBadge: 'Nagyítás',
    question: 'Nagyítsuk az A(−3; 8) pontot a P(1; 0) középpontból 2-szeresére! Mik az A′ képpont koordinátái?',
    options: ['A′(−7; 16)', 'A′(−6; 16)', 'A′(−1; 4)', 'A′(−8; 16)'],
    correctAnswer: 0,
    explanation: '→PA = (−4; 8), →PA′ = 2 · →PA = (−8; 16), A′ = P + (−8; 16) = (−7; 16). A (−6; 16) az origóból vett nagyítás, a (−8; 16) maga a vektor, a (−1; 4) a PA felezőpontja.'
  },
  {
    id: 'mp-q24',
    level: 3,
    questionTypeBadge: 'Ráadás',
    figure: (
      <svg viewBox="0 0 240 150" className={FIG}>
        <rect x="0" y="0" width="240" height="150" rx="10" fill="#ffffff" />
        <polygon points="40,125 205,120 120,22" fill="rgba(37,99,235,0.06)" stroke={BLUE} strokeWidth="1.6" />
        <polygon points="80,73.5 122.5,122.5 162.5,71" fill="none" stroke={RED} strokeWidth="1.3" strokeDasharray="4 3" />
        <text x="30" y="138" fontSize="12" fontWeight="bold" fill="#0f172a">A</text>
        <text x="208" y="134" fontSize="12" fontWeight="bold" fill="#0f172a">B</text>
        <text x="115" y="16" fontSize="12" fontWeight="bold" fill="#0f172a">C</text>
        {[
          [80, 73.5, 'P(4; −4)', -6, -6, 'end'],
          [122.5, 122.5, 'Q(−1; −3)', 0, 16, 'middle'],
          [162.5, 71, 'R(−2; −1)', 6, -6, 'start']
        ].map(([x, y, l, dx, dy, a]) => (
          <g key={String(l)}>
            <circle cx={Number(x)} cy={Number(y)} r="3" fill={RED} />
            <text x={Number(x) + Number(dx)} y={Number(y) + Number(dy)} fontSize="10.5" fontWeight="bold" fill={RED} textAnchor={a as 'end' | 'middle' | 'start'}>
              {String(l)}
            </text>
          </g>
        ))}
      </svg>
    ),
    question: 'Egy háromszög oldalfelező pontjai: P(4; −4) az AC, Q(−1; −3) az AB, R(−2; −1) a BC oldalon (vázlat). Mik az A csúcs koordinátái?',
    options: ['A(5; −6)', 'A(−7; 0)', 'A(3; −2)', 'A(1; −8)'],
    correctAnswer: 0,
    explanation: 'Az APRQ négyszög paralelogramma (a középvonalak miatt), így A = P + Q − R = (4 − 1 + 2; −4 − 3 + 1) = (5; −6). A (−7; 0) a B, a (3; −2) a C csúcs.'
  },
  {
    id: 'mp-q25',
    level: 3,
    questionTypeBadge: 'Osztópont',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[-1, 10]}
        unit={15}
        segs={[{ from: [0, 0], to: [6, 9], width: 2.2 }]}
        points={[
          { at: [0, 0], label: 'A', dx: 10, dy: -4, color: BLUE },
          { at: [6, 9], label: 'B(6; 9)', dx: -24, dy: 2, color: GREEN },
          { at: [2, 3], label: 'P = ?', dx: 22, dy: 4, color: RED }
        ]}
      />
    ),
    question: 'A(0; 0), B(6; 9). A P pont az AB szakaszt A-tól mérve 1 : 2 arányban osztja (AP : PB = 1 : 2). Mik P koordinátái?',
    options: ['P(2; 3)', 'P(4; 6)', 'P(3; 4,5)', 'P(2; 4,5)'],
    correctAnswer: 0,
    explanation: 'AP = ⅓ AB, így P = A + ⅓ →AB = ⅓ · (6; 9) = (2; 3). A (4; 6) az 2 : 1 arányú osztópont, a (3; 4,5) a felezőpont.'
  },
  {
    id: 'mp-q26',
    level: 3,
    questionTypeBadge: 'Súlypont',
    figure: (
      <Fig
        x={[-7, 3]}
        y={[-1, 8]}
        unit={26}
        polys={[{ pts: [[-6, 2], [2, 0], [1, 7]], fill: 'rgba(5,150,105,0.07)', stroke: GREEN }]}
        segs={[
          { from: [-6, 2], to: [1.5, 3.5], color: AMBER, dashed: true, width: 1.4 },
          { from: [2, 0], to: [-2.5, 4.5], color: AMBER, dashed: true, width: 1.4 }
        ]}
        points={[
          { at: [-6, 2], label: 'A(−6; 2)', dx: 4, dy: 14 },
          { at: [2, 0], label: 'B(2; 0)', dx: -6, dy: 13 },
          { at: [1, 7], label: 'C(1; 7)', dx: 24, dy: 2 },
          { at: [-1, 3], label: 'S = ?', dx: -4, dy: -8, color: RED }
        ]}
      />
    ),
    question: 'Mik az A(−6; 2), B(2; 0), C(1; 7) csúcsú háromszög S súlypontjának koordinátái?',
    options: ['S(−1; 3)', 'S(1,5; 3,5)', 'S(−3; 9)', 'S(−2,5; 4,5)'],
    correctAnswer: 0,
    explanation: 'S((−6 + 2 + 1)/3; (2 + 0 + 7)/3) = S(−1; 3). Az (1,5; 3,5) a BC felezőpontja, a (−3; 9) az összeg osztás nélkül, a (−2,5; 4,5) az AC felezőpontja.'
  },
  {
    id: 'mp-q27',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[-1, 7]}
        unit={24}
        polys={[{ pts: [[1, 1], [5, 2], [6, 6], [2, 5]], fill: 'rgba(124,58,237,0.06)', stroke: PURPLE, dashed: true }]}
        points={[
          { at: [1, 1], label: 'A(1; 1)', dx: 4, dy: 14 },
          { at: [5, 2], label: 'B(5; 2)', dx: 8, dy: 13 },
          { at: [6, 6], label: 'C(6; 6)', dx: -6, dy: -8 },
          { at: [2, 5], label: 'D = ?', dx: -6, dy: -8, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'Az ABCD paralelogramma három csúcsa A(1; 1), B(5; 2), C(6; 6). Mik a D csúcs koordinátái?',
    options: ['D(2; 5)', 'D(10; 7)', 'D(0; −3)', 'D(3,5; 3,5)'],
    correctAnswer: 0,
    explanation: 'Az átlók felezik egymást: AC és BD felezőpontja közös, ezért A + C = B + D, D = A + C − B = (1 + 6 − 5; 1 + 6 − 2) = (2; 5). A (3,5; 3,5) a középpont.'
  },
  {
    id: 'mp-q28',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Az AB szakasz felezőpontja F(2; −1), az A végpont A(−3; 4). Mik a B végpont koordinátái?',
    options: ['B(7; −6)', 'B(−0,5; 1,5)', 'B(5; −5)', 'B(−8; 9)'],
    correctAnswer: 0,
    explanation: 'B = 2F − A = (4 + 3; −2 − 4) = (7; −6). A (−8; 9) = 2A − F az F tükörképe A-ra, az (5; −5) az →AF vektor.'
  },
  {
    id: 'mp-q29',
    level: 3,
    questionTypeBadge: 'Osztópont',
    question: 'A(2; −3), B(10; 5). Melyik az a P pont az AB szakaszon, amelyre AP : PB = 3 : 1?',
    options: ['P(8; 3)', 'P(4; −1)', 'P(6; 1)', 'P(9; 4)'],
    correctAnswer: 0,
    explanation: 'AP = ¾ AB, →AB = (8; 8), így P = A + ¾ · (8; 8) = (2 + 6; −3 + 6) = (8; 3). A (4; −1) az 1 : 3 arányú pont, a (6; 1) a felezőpont.'
  },
  {
    id: 'mp-q30',
    level: 3,
    questionTypeBadge: 'Súlypont',
    question: 'Milyen arányban osztja a háromszög súlypontja a súlyvonalakat?',
    options: [
      '2 : 1 arányban; a csúcshoz közelebbi rész a hosszabb',
      '1 : 1 arányban (felezi őket)',
      '1 : 2 arányban; a csúcshoz közelebbi rész a rövidebb',
      '3 : 1 arányban; a csúcshoz közelebbi rész a hosszabb'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonal csúcstól távolabbi harmadolópontja: S = A + ⅔ →AF, ahol F a szemközti oldal felezőpontja. Ebből S = (A + B + C)/3.'
  }
];

export const MidpointQuiz: React.FC<{
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
      topicId="g11-geo-felezopont-quiz"
      subtopicId="felezopont"
      title="7. Felezőpont – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: felezőpont, negyedelőpontok, meghosszabbítás és tükrözés, nagyítás egy pontból, súlypont."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={MIDPOINT_QUESTIONS}
      cheatSheets={[
        {
          title: 'A felezőpont',
          items: [
            'A(a₁; a₂), B(b₁; b₂) ⇒ F((a₁ + b₁)/2; (a₂ + b₂)/2)',
            'Helyvektorral: →f = ½(→a + →b)',
            'Indoklás: a paralelogramma átlói felezik egymást.',
            'Ellenőrzés: F koordinátái A és B koordinátái közé esnek.'
          ]
        },
        {
          title: 'Visszafelé és tovább',
          items: [
            'Másik végpont / meghosszabbítás: B = 2F − A',
            'Tükrözés P pontra: X′ = 2P − X',
            'Negyedelőpontok: A + ¼ →AB, A + ½ →AB, A + ¾ →AB',
            'Nagyítás O-ból λ arányban: X′ = O + λ · →OX'
          ]
        },
        {
          title: 'Háromszög, paralelogramma',
          items: [
            'Súlypont: S((a₁ + b₁ + c₁)/3; (a₂ + b₂ + c₂)/3)',
            'A súlypont a súlyvonalat 2 : 1 arányban osztja.',
            'Paralelogramma: D = A + C − B',
            'Csúcsok az oldalfelező pontokból: A = P + Q − R'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MidpointMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MidpointSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MidpointQuiz;
