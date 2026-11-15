import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CircleProblemsMatcher } from './CircleProblemsMatcher';
import { CircleProblemsSorter } from './CircleProblemsSorter';
import { CircleProblemsPlane, CP_BLUE, CP_RED, CP_GREEN, CP_PURPLE, CP_AMBER, CP_SLATE } from './CircleProblemsFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BRIDGE_POSTS = [-18, -12, -6, 0, 6, 12, 18];

export const CIRCLE_PROBLEMS_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'cp-q1',
    level: 1,
    questionTypeBadge: 'Egyenletrendszer',
    question: 'Melyik egyenletet kell megoldani, ha az (x − 2)² + (y − 1)² = 8,5 egyenletű kör azon pontjait keressük, amelyek első koordinátája 3,5?',
    options: ['(3,5 − 2)² + (y − 1)² = 8,5', '(x − 2)² + (3,5 − 1)² = 8,5', '(3,5 − 2)² + (3,5 − 1)² = 8,5', '3,5² + y² = 8,5'],
    correctAnswer: 0,
    explanation: 'A P(3,5; y) pont akkor van a körön, ha koordinátái kielégítik a kör egyenletét: x helyére 3,5-et írunk, y az ismeretlen.'
  },
  {
    id: 'cp-q2',
    level: 1,
    questionTypeBadge: 'Közös pontok',
    question: 'Hány közös pontja lehet egy egyenesnek és egy körnek?',
    options: ['0, 1 vagy 2', 'Csak 2', '0 vagy 2', 'Akármennyi'],
    correctAnswer: 0,
    explanation: 'A behelyettesítés után kapott másodfokú egyenletnek 0, 1 vagy 2 megoldása lehet, ezért egyenesnek és körnek 0, 1 vagy 2 közös pontja van.'
  },
  {
    id: 'cp-q3',
    level: 1,
    questionTypeBadge: 'Érintő',
    question: 'Mikor nevezünk egy egyenest a kör érintőjének?',
    options: ['Ha pontosan egy közös pontja van a körrel', 'Ha átmegy a kör középpontján', 'Ha két közös pontja van a körrel', 'Ha nincs közös pontja a körrel'],
    correctAnswer: 0,
    explanation: 'Az érintőnek pontosan egy közös pontja (az érintési pont) van a körrel. A két közös pontú egyenes a szelő.'
  },
  {
    id: 'cp-q4',
    level: 1,
    questionTypeBadge: 'Kölcsönös helyzet',
    figure: (
      <CircleProblemsPlane
        xMin={-5}
        xMax={6}
        yMin={-4}
        yMax={5}
        unit={18}
        className={FIG}
        circles={[{ cx: 0, cy: 0, r: 3, color: CP_BLUE, width: 2 }]}
        lines={[
          { m: 0, b: 3, color: CP_RED, label: 'e', labelAt: -4.4, labelDy: -5 },
          { m: 1, b: 0, color: CP_GREEN, label: 'f', labelAt: 3.8, labelDx: 6, labelDy: 6 },
          { x: 4.2, color: CP_PURPLE, label: 'g', labelAt: -3.4, labelDx: 5 }
        ]}
      />
    ),
    question: 'Az ábrán melyik egyenes érintője a körnek?',
    options: ['e', 'f', 'g', 'Egyik sem'],
    correctAnswer: 0,
    explanation: 'Az e egyenesnek egyetlen közös pontja van a körrel (a kör „tetején”), ez érintő. Az f két pontban metszi (szelő), a g-nek nincs közös pontja a körrel.'
  },
  {
    id: 'cp-q5',
    level: 1,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintő húzható egy körhöz a kör egy pontján át?',
    options: ['1', '0', '2', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'A kör egy pontjában pontosan egy érintő van: az a merőleges, amelyet az adott pontba húzott sugárra állítunk.'
  },
  {
    id: 'cp-q6',
    level: 1,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintő húzható egy körhöz egy, a körön belül lévő ponton át?',
    options: ['0', '1', '2', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'A körön belüli ponton átmenő minden egyenes két pontban metszi a kört (szelő), ezért érintő nem húzható.'
  },
  {
    id: 'cp-q7',
    level: 1,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintő húzható egy körhöz egy, a körön kívül lévő ponton át?',
    options: ['2', '1', '0', '4'],
    correctAnswer: 0,
    explanation: 'Külső pontból két érintő húzható; az érintési pontok a középpontot és a külső pontot összekötő szakasz Thalész-körén vannak.'
  },
  {
    id: 'cp-q8',
    level: 1,
    questionTypeBadge: 'Thalész-tétel',
    question: 'Hol van a derékszögű háromszög köré írt körének középpontja?',
    options: ['Az átfogó felezőpontjában', 'A derékszögű csúcsban', 'A súlypontban', 'A leghosszabb befogó felezőpontjában'],
    correctAnswer: 0,
    explanation: 'Thalész tétele szerint a derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja, sugara az átfogó fele.'
  },
  {
    id: 'cp-q9',
    level: 1,
    questionTypeBadge: 'Tengelyt érintő kör',
    figure: (
      <CircleProblemsPlane
        xMin={-11}
        xMax={2}
        yMin={-9}
        yMax={3}
        unit={14}
        tickEvery={5}
        className={FIG}
        circles={[{ cx: -5, cy: -3, r: 5, color: CP_BLUE, width: 2 }]}
        segments={[{ from: [-5, -3], to: [0, -3], color: CP_RED, dashed: true, width: 1.6 }]}
        points={[
          { x: -5, y: -3, color: '#0f172a', label: 'C(−5; −3)', dx: -4, dy: -6, anchor: 'end' },
          { x: 0, y: -3, color: CP_RED }
        ]}
        texts={[{ x: -2.9, y: -2.4, text: 'r = ?', color: CP_RED, bold: true }]}
      />
    ),
    question: 'A C(−5; −3) középpontú kör érinti az y tengelyt. Mekkora a sugara?',
    options: ['5', '3', '√34', '8'],
    correctAnswer: 0,
    explanation: 'Az érintési pont (0; −3); a sugár a középpont távolsága az y tengelytől, vagyis az első koordináta abszolút értéke: |−5| = 5. (A 3 az x tengelytől mért távolság lenne.)'
  },
  {
    id: 'cp-q10',
    level: 1,
    questionTypeBadge: 'Érintő és sugár',
    question: 'Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?',
    options: ['90°-ot', '45°-ot', '60°-ot', 'A sugár hosszától függ'],
    correctAnswer: 0,
    explanation: 'A kör érintője mindig merőleges az érintési pontba húzott sugárra.'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'cp-q11',
    level: 2,
    questionTypeBadge: 'Kör és függőleges egyenes',
    figure: (
      <CircleProblemsPlane
        xMin={-2}
        xMax={6}
        yMin={-3}
        yMax={5}
        unit={17}
        className={FIG}
        circles={[{ cx: 2, cy: 1, r: Math.sqrt(8.5), color: CP_BLUE, width: 2 }]}
        lines={[{ x: 3.5, color: CP_RED, label: 'x = 3,5', labelAt: 4.3, labelDx: 4 }]}
        points={[
          { x: 2, y: 1, color: '#0f172a', label: 'C(2; 1)', dx: -4, dy: -6, anchor: 'end' },
          { x: 3.5, y: 3.5, color: CP_RED, label: '?', dx: 6, dy: -3 },
          { x: 3.5, y: -1.5, color: CP_RED, label: '?', dx: 6, dy: 10 }
        ]}
      />
    ),
    question: 'Melyek az (x − 2)² + (y − 1)² = 8,5 egyenletű kör azon pontjai, amelyek első koordinátája 3,5?',
    options: ['(3,5; 3,5) és (3,5; −1,5)', 'Csak (3,5; 3,5)', '(3,5; 1,5) és (3,5; −3,5)', '(3,5; 2,5) és (3,5; −2,5)'],
    correctAnswer: 0,
    explanation: '2,25 + (y − 1)² = 8,5 ⇒ (y − 1)² = 6,25 ⇒ y − 1 = ±2,5 ⇒ y = 3,5 vagy y = −1,5.'
  },
  {
    id: 'cp-q12',
    level: 2,
    questionTypeBadge: 'Derékszögű háromszög',
    figure: (
      <CircleProblemsPlane
        xMin={-6}
        xMax={4}
        yMin={-3}
        yMax={3}
        unit={22}
        className={FIG}
        segments={[
          { from: [-5, 2], to: [3, 1], color: CP_PURPLE, width: 1.8 },
          { from: [3, 1], to: [1, -2], color: CP_PURPLE, width: 1.8 },
          { from: [1, -2], to: [-5, 2], color: CP_PURPLE, width: 1.8 }
        ]}
        points={[
          { x: -5, y: 2, label: 'A(−5; 2)', dx: 4, dy: -6 },
          { x: 3, y: 1, label: 'B(3; 1)', dx: -4, dy: -7, anchor: 'end' },
          { x: 1, y: -2, label: 'C(1; −2)', dx: 6, dy: 4 }
        ]}
      />
    ),
    question: 'Az A(−5; 2), B(3; 1), C(1; −2) háromszögről igaz, hogy derékszögű. Melyik csúcsnál van a derékszög?',
    options: ['C-nél', 'A-nál', 'B-nél', 'Egyiknél sem, a háromszög tompaszögű'],
    correctAnswer: 0,
    explanation: 'AB² = 64 + 1 = 65, AC² = 36 + 16 = 52, BC² = 4 + 9 = 13. 52 + 13 = 65, így AB az átfogó, a derékszög a vele szemközti C csúcsnál van.'
  },
  {
    id: 'cp-q13',
    level: 2,
    questionTypeBadge: 'Körülírt kör',
    figure: (
      <CircleProblemsPlane
        xMin={-6}
        xMax={4}
        yMin={-3}
        yMax={3}
        unit={22}
        className={FIG}
        segments={[
          { from: [-5, 2], to: [3, 1], color: CP_RED, width: 1.8 },
          { from: [3, 1], to: [1, -2], color: CP_PURPLE, width: 1.8 },
          { from: [1, -2], to: [-5, 2], color: CP_PURPLE, width: 1.8 }
        ]}
        rightAngles={[{ v: [1, -2], p: [-5, 2], q: [3, 1] }]}
        points={[
          { x: -5, y: 2, label: 'A', dx: -4, dy: -6, anchor: 'end' },
          { x: 3, y: 1, label: 'B', dx: 5, dy: -5 },
          { x: 1, y: -2, label: 'C', dx: 6, dy: 4 }
        ]}
        texts={[{ x: -1.3, y: 2.1, text: '?', color: CP_BLUE, bold: true, size: 13 }]}
      />
    ),
    question: 'Mi az A(−5; 2), B(3; 1), C(1; −2) derékszögű háromszög köré írt körének egyenlete?',
    options: ['(x + 1)² + (y − 1,5)² = 16,25', '(x + 1)² + (y − 1,5)² = 65', '(x − 1)² + (y + 1,5)² = 16,25', '(x + 1)² + (y − 1,5)² = √65 / 2'],
    correctAnswer: 0,
    explanation: 'A középpont az AB átfogó felezőpontja: F(−1; 1,5). r = √65 / 2, így r² = 65 / 4 = 16,25.'
  },
  {
    id: 'cp-q14',
    level: 2,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintője van az (x + 1)² + (y − 1,5)² = 16,25 körnek, amely átmegy a P(−3; 4,5) ponton?',
    options: ['0', '1', '2', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: '(−3 + 1)² + (4,5 − 1,5)² = 4 + 9 = 13 < 16,25, tehát P a körön belül van, így nincs rajta átmenő érintő.'
  },
  {
    id: 'cp-q15',
    level: 2,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintője van az (x + 1)² + (y − 1,5)² = 16,25 körnek, amely átmegy az S(2; 5) ponton?',
    options: ['2', '1', '0', '3'],
    correctAnswer: 0,
    explanation: '(2 + 1)² + (5 − 1,5)² = 9 + 12,25 = 21,25 > 16,25, tehát S a körön kívül van: 2 érintő húzható.'
  },
  {
    id: 'cp-q16',
    level: 2,
    questionTypeBadge: 'Kör és vízszintes egyenes',
    figure: (
      <CircleProblemsPlane
        xMin={-11}
        xMax={2}
        yMin={-9}
        yMax={3}
        unit={14}
        tickEvery={5}
        className={FIG}
        circles={[{ cx: -5, cy: -3, r: 5, color: CP_BLUE, width: 2 }]}
        lines={[{ m: 0, b: -6, color: CP_RED, label: 'y = −6', labelAt: -10.8, labelDy: 12 }]}
        points={[
          { x: -5, y: -3, color: '#0f172a', label: 'C', dx: 4, dy: -5 },
          { x: -1, y: -6, color: CP_RED, label: '?', dx: 5, dy: -4 },
          { x: -9, y: -6, color: CP_RED, label: '?', dx: -5, dy: -4, anchor: 'end' }
        ]}
      />
    ),
    question: 'Melyek az (x + 5)² + (y + 3)² = 25 egyenletű kör azon pontjai, amelyek második koordinátája −6?',
    options: ['(−1; −6) és (−9; −6)', '(1; −6) és (9; −6)', '(−1; −6) és (−11; −6)', 'Csak (−5; −6)'],
    correctAnswer: 0,
    explanation: '(x + 5)² + 9 = 25 ⇒ (x + 5)² = 16 ⇒ x + 5 = ±4 ⇒ x = −1 vagy x = −9.'
  },
  {
    id: 'cp-q17',
    level: 2,
    questionTypeBadge: 'Híd íve',
    question: 'Egy vasúti híd íve az x² + (y + 32)² = 1600 egyenletű kör része. Mekkora a körív sugara?',
    options: ['40 m', '1600 m', '32 m', '8 m'],
    correctAnswer: 0,
    explanation: 'r² = 1600 ⇒ r = 40 m. A 32 a középpont (0; −32) távolsága az origótól, a 8 pedig az ív legmagasabb pontjának magassága.'
  },
  {
    id: 'cp-q18',
    level: 2,
    questionTypeBadge: 'Híd íve',
    figure: (
      <CircleProblemsPlane
        xMin={-28}
        xMax={28}
        yMin={0}
        yMax={11}
        unit={4.6}
        tickEvery={100}
        grid={false}
        className={FIG}
        circles={[{ cx: 0, cy: -32, r: 40, color: CP_BLUE, width: 2.2 }]}
        points={[
          { x: -24, y: 0, label: 'P(?; 0)', dx: -2, dy: -6, anchor: 'end' },
          { x: 24, y: 0, label: 'Q(?; 0)', dx: 2, dy: -6 },
          { x: 0, y: 8, label: 'R(0; ?)', dx: 5, dy: -5 }
        ]}
      />
    ),
    question: 'Az x² + (y + 32)² = 1600 ív a P és Q pontban metszi az x tengelyt, az R pontban az y tengelyt. Mik a koordináták?',
    options: ['P(−24; 0), Q(24; 0), R(0; 8)', 'P(−40; 0), Q(40; 0), R(0; 8)', 'P(−24; 0), Q(24; 0), R(0; 40)', 'P(−32; 0), Q(32; 0), R(0; 8)'],
    correctAnswer: 0,
    explanation: 'y = 0: x² + 1024 = 1600 ⇒ x² = 576 ⇒ x = ±24. x = 0: (y + 32)² = 1600 ⇒ y + 32 = 40 (a felső ív) ⇒ y = 8.'
  },
  {
    id: 'cp-q19',
    level: 2,
    questionTypeBadge: 'Kölcsönös helyzet',
    question: 'Hány közös pontja van az x² + y² = 25 körnek és az y = 5 egyenesnek?',
    options: ['1 – az egyenes érintő', '2 – az egyenes szelő', '0', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'y = 5-öt behelyettesítve x² + 25 = 25 ⇒ x² = 0 ⇒ x = 0. Egyetlen közös pont van, a (0; 5), tehát az egyenes érinti a kört.'
  },
  {
    id: 'cp-q20',
    level: 2,
    questionTypeBadge: 'Rádióadó',
    question: 'Egy rádióadó a P(−3; 2) pontban van, hatókörének sugara 15 egység. Fogható-e az adás a B(9; −11) pontban?',
    options: ['Nem, mert 12² + 13² = 313 > 225', 'Igen, mert 9 + 11 = 20 > 15', 'Igen, mert 12² + 13² = 313 < 15²', 'Nem dönthető el ábra nélkül'],
    correctAnswer: 0,
    explanation: '(9 + 3)² + (−11 − 2)² = 144 + 169 = 313, ami nagyobb 15² = 225-nél: B a hatókörön kívül van, ott az adás nem fogható.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'cp-q21',
    level: 3,
    questionTypeBadge: 'Metszéspontok',
    figure: (
      <CircleProblemsPlane
        xMin={-6}
        xMax={6}
        yMin={-6}
        yMax={7}
        unit={14}
        tickEvery={2}
        className={FIG}
        circles={[{ cx: 0, cy: 0, r: 5, color: CP_BLUE, width: 2 }]}
        lines={[{ m: 1, b: 1, color: CP_RED, label: 'y = x + 1', labelAt: -5.5, labelDx: 6, labelDy: 8 }]}
        points={[
          { x: 3, y: 4, color: CP_RED, label: '?', dx: 6, dy: 4 },
          { x: -4, y: -3, color: CP_RED, label: '?', dx: 6, dy: 6 }
        ]}
      />
    ),
    question: 'Melyek az x² + y² = 25 kör és az y = x + 1 egyenes közös pontjai?',
    options: ['(3; 4) és (−4; −3)', '(4; 3) és (−3; −4)', '(3; 4) és (−3; −4)', 'Csak (3; 4)'],
    correctAnswer: 0,
    explanation: 'x² + (x + 1)² = 25 ⇒ 2x² + 2x − 24 = 0 ⇒ x² + x − 12 = 0 ⇒ x = 3 vagy x = −4; y = x + 1 ⇒ (3; 4) és (−4; −3).'
  },
  {
    id: 'cp-q22',
    level: 3,
    questionTypeBadge: 'Diszkrimináns',
    question: 'Hány közös pontja van az x² + y² = 25 körnek és az y = x + 8 egyenesnek?',
    options: ['Nincs közös pontjuk', '1', '2', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'x² + (x + 8)² = 25 ⇒ 2x² + 16x + 39 = 0, a diszkrimináns 256 − 312 = −56 < 0, ezért nincs valós megoldás.'
  },
  {
    id: 'cp-q23',
    level: 3,
    questionTypeBadge: 'Híd íve',
    figure: (
      <CircleProblemsPlane
        xMin={-28}
        xMax={28}
        yMin={0}
        yMax={11}
        unit={4.6}
        tickEvery={100}
        grid={false}
        className={FIG}
        circles={[{ cx: 0, cy: -32, r: 40, color: CP_BLUE, width: 2.2 }]}
        segments={BRIDGE_POSTS.map((x) => ({
          from: [x, 0] as [number, number],
          to: [x, Math.sqrt(1600 - x * x) - 32] as [number, number],
          color: x === 6 ? CP_RED : CP_SLATE,
          width: x === 6 ? 2.6 : 1.6
        }))}
        texts={[
          { x: 6.8, y: 3.5, text: '?', color: CP_RED, bold: true, size: 12 },
          { x: 3, y: -0.1, text: '6 m', color: '#0f172a', size: 8, anchor: 'middle' }
        ]}
      />
    ),
    question: 'A híd íve x² + (y + 32)² = 1600 (méterben), a tartóoszlopok 6 m-enként állnak, egy a közepén. Milyen magas a középsőtől 6 m-re álló oszlop?',
    options: ['≈ 7,55 m', '≈ 7,1 m', '8 m', '≈ 6,16 m'],
    correctAnswer: 0,
    explanation: 'x = 6: (y + 32)² = 1600 − 36 = 1564 ⇒ y = √1564 − 32 ≈ 39,55 − 32 ≈ 7,55 m. (8 m a középső, 6,16 m a 12 m-re álló oszlop.)'
  },
  {
    id: 'cp-q24',
    level: 3,
    questionTypeBadge: 'Körülírt kör',
    figure: (
      <CircleProblemsPlane
        xMin={-4}
        xMax={8}
        yMin={-4}
        yMax={7}
        unit={16}
        tickEvery={2}
        className={FIG}
        segments={[
          { from: [7, 6], to: [-1, -3], color: CP_PURPLE, width: 1.8 },
          { from: [-1, -3], to: [-3, 2], color: CP_PURPLE, width: 1.8 },
          { from: [-3, 2], to: [7, 6], color: CP_PURPLE, width: 1.8 }
        ]}
        points={[
          { x: 7, y: 6, label: 'A(7; 6)', dx: -4, dy: -6, anchor: 'end' },
          { x: -1, y: -3, label: 'B(−1; −3)', dx: 6, dy: 4 },
          { x: -3, y: 2, label: 'C(−3; 2)', dx: -2, dy: -7, anchor: 'start' }
        ]}
        texts={[{ x: 3.4, y: 1, text: '?', color: CP_BLUE, bold: true, size: 13 }]}
      />
    ),
    question: 'Mi az A(7; 6), B(−1; −3), C(−3; 2) háromszög köré írt körének egyenlete?',
    options: ['(x − 3)² + (y − 1,5)² = 36,25', '(x − 3)² + (y − 1,5)² = 145', '(x − 1)² + (y − 1,67)² = 36,25', '(x + 3)² + (y + 1,5)² = 36,25'],
    correctAnswer: 0,
    explanation: 'AB² = 145, AC² = 116, BC² = 29 és 116 + 29 = 145, így derékszög C-nél, AB az átfogó. Középpont: AB felezőpontja (3; 1,5), r² = 145 / 4 = 36,25.'
  },
  {
    id: 'cp-q25',
    level: 3,
    questionTypeBadge: 'Terület',
    question: 'Mekkora az A(7; 6), B(−1; −3), C(−3; 2) derékszögű háromszög területe?',
    options: ['29', '58', '72,5', '√145'],
    correctAnswer: 0,
    explanation: 'A befogók AC = √116 és BC = √29, így T = √116 · √29 / 2 = √3364 / 2 = 58 / 2 = 29.'
  },
  {
    id: 'cp-q26',
    level: 3,
    questionTypeBadge: 'Thalész-kör',
    figure: (
      <CircleProblemsPlane
        xMin={-3}
        xMax={6}
        yMin={-3}
        yMax={6}
        unit={18}
        className={FIG}
        segments={[{ from: [-1, 0], to: [4, 3], color: CP_BLUE, width: 2.2 }]}
        points={[
          { x: -1, y: 0, label: 'A(−1; 0)', dx: -4, dy: 13, anchor: 'end' },
          { x: 4, y: 3, label: 'B(4; 3)', dx: 6, dy: -4 }
        ]}
        texts={[{ x: 0.3, y: 5, text: '? (az y tengelyen)', color: CP_RED, bold: true, size: 9 }]}
      />
    ),
    question: 'Az y tengely mely pontjaiból látszik derékszögben az AB szakasz, ha A(−1; 0) és B(4; 3)?',
    options: ['(0; 4) és (0; −1)', '(0; 4) és (0; 1)', 'Csak (0; 1,5)', '(0; 3) és (0; −3)'],
    correctAnswer: 0,
    explanation: 'Az AB Thalész-köre: középpont (1,5; 1,5), r² = (25 + 9) / 4 = 8,5. x = 0: 2,25 + (y − 1,5)² = 8,5 ⇒ (y − 1,5)² = 6,25 ⇒ y = 4 vagy y = −1.'
  },
  {
    id: 'cp-q27',
    level: 3,
    questionTypeBadge: 'Rádióadó',
    question: 'A rádióadó a P(−3; 2) pontban van, hatóköre 15 egység. Az A(8; −4), B(9; −11), C(6; −10), D(11; 7), E(−9; 16), F(9; 11) pontok közül hol fogható az adás (a határt is beleértve)?',
    options: ['A, C, D és F', 'Csak A és D', 'A, B, D és F', 'Mindegyikben'],
    correctAnswer: 0,
    explanation: 'A: 157, D: 221 (< 225); C: 81 + 144 = 225 és F: 144 + 81 = 225 (a határon); B: 313 és E: 232 (> 225), ott nem fogható.'
  },
  {
    id: 'cp-q28',
    level: 3,
    questionTypeBadge: 'Érintő egyenlete',
    figure: (
      <CircleProblemsPlane
        xMin={-6}
        xMax={8}
        yMin={-6}
        yMax={8}
        unit={13}
        tickEvery={2}
        className={FIG}
        circles={[{ cx: 0, cy: 0, r: 5, color: CP_BLUE, width: 2 }]}
        lines={[{ m: -0.75, b: 6.25, color: CP_AMBER, label: '?', labelAt: 6.4, labelDx: 2, labelDy: -6 }]}
        segments={[{ from: [0, 0], to: [3, 4], color: CP_RED, width: 1.6 }]}
        rightAngles={[{ v: [3, 4], p: [0, 0], q: [5, 2.5], color: CP_AMBER }]}
        points={[{ x: 3, y: 4, color: CP_RED, label: '(3; 4)', dx: -4, dy: -7, anchor: 'end' }]}
      />
    ),
    question: 'Mi az x² + y² = 25 kör (3; 4) pontjában húzott érintőjének egyenlete?',
    options: ['y = −0,75x + 6,25', 'y = (4/3)x', 'y = 0,75x + 1,75', 'y = −0,75x + 4'],
    correctAnswer: 0,
    explanation: 'A sugár meredeksége 4/3, az érintő erre merőleges, meredeksége −3/4. A (3; 4) ponton át: 4 = −0,75 · 3 + b ⇒ b = 6,25.'
  },
  {
    id: 'cp-q29',
    level: 3,
    questionTypeBadge: 'Érintő egyenes',
    figure: (
      <CircleProblemsPlane
        xMin={-3}
        xMax={7}
        yMin={-4}
        yMax={6}
        unit={16}
        className={FIG}
        circles={[{ cx: 2, cy: 1, r: 3, color: CP_BLUE, width: 2 }]}
        points={[{ x: 2, y: 1, color: '#0f172a', label: 'C(2; 1)', dx: 5, dy: -5 }]}
        texts={[{ x: -2.6, y: 5.2, text: 'y = b ?', color: CP_RED, bold: true }]}
      />
    ),
    question: 'Milyen b értékekre érinti az y = b egyenes az (x − 2)² + (y − 1)² = 9 egyenletű kört?',
    options: ['b = 4 vagy b = −2', 'b = 3 vagy b = −3', 'Csak b = 4', 'b = 5 vagy b = −1'],
    correctAnswer: 0,
    explanation: 'A vízszintes érintők a középponttól r = 3 távolságra vannak: y = 1 + 3 = 4 és y = 1 − 3 = −2.'
  },
  {
    id: 'cp-q30',
    level: 3,
    questionTypeBadge: 'Kölcsönös helyzet',
    question: 'Hány közös pontja van az (x − 2)² + (y − 1)² = 8,5 körnek és az x = 5 egyenesnek?',
    options: ['Nincs közös pontjuk', '1', '2', '3'],
    correctAnswer: 0,
    explanation: 'x = 5: 9 + (y − 1)² = 8,5 ⇒ (y − 1)² = −0,5, aminek nincs valós megoldása. (Az egyenes 3 egységre van a középponttól, a sugár √8,5 ≈ 2,92.)'
  }
];

export const CircleProblemsQuiz: React.FC<{
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
      topicId="g11-geo-kor-feladatok-quiz"
      subtopicId="korrel-kapcsolatos-feladatok"
      title="12. Körrel kapcsolatos feladatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kör és egyenes közös pontjai, érintők, derékszögű háromszög köré írt köre, alkalmazások."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={CIRCLE_PROBLEMS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kör és egyenes',
          items: [
            'Az egyenes egyenletét behelyettesítjük a kör egyenletébe.',
            'Diszkrimináns > 0 ⇒ 2 közös pont (szelő).',
            'Diszkrimináns = 0 ⇒ 1 közös pont (érintő).',
            'Diszkrimináns < 0 ⇒ nincs közös pont.'
          ]
        },
        {
          title: 'Érintők',
          items: [
            'Belső pontból 0, a kör pontjából 1, külső pontból 2 érintő.',
            'Az érintő merőleges az érintési pontba húzott sugárra.',
            'Tengelyt érintő kör: r = a középpont távolsága a tengelytől.',
            'x² + y² = 25, (3; 4) ⇒ y = −0,75x + 6,25'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            '(x − 2)² + (y − 1)² = 8,5, x = 3,5 ⇒ (3,5; 3,5), (3,5; −1,5)',
            'A(−5; 2), B(3; 1), C(1; −2) ⇒ (x + 1)² + (y − 1,5)² = 16,25',
            'Híd: r = 40 m, P(−24; 0), Q(24; 0), R(0; 8)',
            'C(−5; −3), érinti az y tengelyt ⇒ (x + 5)² + (y + 3)² = 25'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CircleProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CircleProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CircleProblemsQuiz;
