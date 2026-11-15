import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11CircleEquationMatcher } from './G11CircleEquationMatcher';
import { G11CircleEquationSorter } from './G11CircleEquationSorter';
import { G11CircleEquationPlane, CE_BLUE, CE_RED, CE_GREEN, CE_PURPLE } from './G11CircleEquationFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';

const KickoffFig: React.FC<{ px: number; py: number; name: string }> = ({ px, py, name }) => (
  <G11CircleEquationPlane
    xMin={-11}
    xMax={11}
    yMin={-10}
    yMax={10}
    unit={6.5}
    tickEvery={5}
    grid={false}
    className={FIG}
    circles={[{ cx: 0, cy: 0, r: 9.15, color: CE_GREEN, width: 2, fill: 'rgba(16,185,129,0.08)' }]}
    segments={[{ from: [0, 0], to: [0, -9.15], color: CE_GREEN, dashed: true }]}
    points={[
      { x: 0, y: 0, color: '#0f172a', label: 'O', dx: -4, dy: -5, anchor: 'end' },
      { x: px, y: py, color: CE_RED, label: name, dx: 6, dy: -5 }
    ]}
    texts={[{ x: 0.6, y: -5, text: '9,15', color: CE_GREEN, bold: true, size: 9 }]}
  />
);

export const G11_CIRCLE_EQUATION_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'ce-q1',
    level: 1,
    questionTypeBadge: 'A kör fogalma',
    question: 'Mi a kör (körvonal)?',
    options: [
      'A sík egy adott pontjától adott pozitív távolságra lévő pontok halmaza',
      'A sík egy adott pontjától legfeljebb adott távolságra lévő pontok halmaza',
      'Két adott ponttól egyenlő távolságra lévő pontok halmaza',
      'Egy adott egyenestől adott távolságra lévő pontok halmaza'
    ],
    correctAnswer: 0,
    explanation: 'A kör a sík azon pontjainak halmaza, amelyek egy adott ponttól (a középponttól) adott pozitív távolságra (a sugárnyira) vannak. A „legfeljebb” a körlapot írná le.'
  },
  {
    id: 'ce-q2',
    level: 1,
    questionTypeBadge: 'Egyenlet felírása',
    question: 'Mi a C(3; 6) középpontú, 10 egység sugarú kör egyenlete?',
    options: ['(x − 3)² + (y − 6)² = 100', '(x + 3)² + (y + 6)² = 100', '(x − 3)² + (y − 6)² = 10', '(x − 6)² + (y − 3)² = 100'],
    correctAnswer: 0,
    explanation: 'A C(u; v) középpontú, r sugarú kör egyenlete (x − u)² + (y − v)² = r², itt u = 3, v = 6, r² = 100.'
  },
  {
    id: 'ce-q3',
    level: 1,
    questionTypeBadge: 'Origó középpontú kör',
    figure: (
      <G11CircleEquationPlane
        xMin={-6}
        xMax={6}
        yMin={-6}
        yMax={6}
        unit={11}
        tickEvery={5}
        className={FIG}
        circles={[{ cx: 0, cy: 0, r: 5, color: CE_BLUE, width: 2 }]}
        points={[{ x: 5, y: 0, label: '(5; 0)', dx: -4, dy: -6, anchor: 'end' }]}
        texts={[{ x: 3.6, y: 4.2, text: '?', color: CE_BLUE, bold: true, size: 13 }]}
      />
    ),
    question: 'Az ábrán látható kör középpontja az origó, és átmegy az (5; 0) ponton. Mi az egyenlete?',
    options: ['x² + y² = 25', 'x² + y² = 5', 'x + y = 5', '(x − 5)² + (y − 5)² = 25'],
    correctAnswer: 0,
    explanation: 'A sugár 5 (az origó és az (5; 0) távolsága), ezért az egyenlet x² + y² = 5² = 25.'
  },
  {
    id: 'ce-q4',
    level: 1,
    questionTypeBadge: 'Középpont és sugár',
    question: 'Mi az (x − 5)² + (y + 3)² = 16 egyenletű kör középpontja és sugara?',
    options: ['C(5; −3), r = 4', 'C(−5; 3), r = 4', 'C(5; −3), r = 16', 'C(5; 3), r = 4'],
    correctAnswer: 0,
    explanation: 'x − 5 ⇒ u = 5; y + 3 = y − (−3) ⇒ v = −3; r² = 16 ⇒ r = 4.'
  },
  {
    id: 'ce-q5',
    level: 1,
    questionTypeBadge: 'Egyenlet felírása',
    question: 'Mi a C(−5; 3) középpontú, 0,5 egység sugarú kör egyenlete?',
    options: ['(x + 5)² + (y − 3)² = 0,25', '(x + 5)² + (y − 3)² = 0,5', '(x − 5)² + (y + 3)² = 0,25', '(x + 5)² + (y + 3)² = 0,25'],
    correctAnswer: 0,
    explanation: 'u = −5 ⇒ (x − (−5))² = (x + 5)²; v = 3 ⇒ (y − 3)²; r² = 0,5² = 0,25.'
  },
  {
    id: 'ce-q6',
    level: 1,
    questionTypeBadge: 'Kezdőkör',
    figure: <KickoffFig px={9} py={1.65} name="A(9; 1,65)" />,
    question: 'A kezdőkör középpontja az origó, sugara 9,15 m. Hol áll az A(9; 1,65) játékos?',
    options: ['A kezdőkörön', 'A kezdőkörön belül', 'A kezdőkörön kívül', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'OA = √(9² + 1,65²) = √(81 + 2,7225) = √83,7225 = 9,15, ami éppen a sugár: A a kezdőkörön áll.'
  },
  {
    id: 'ce-q7',
    level: 1,
    questionTypeBadge: 'Kezdőkör',
    figure: <KickoffFig px={-7} py={4.4} name="B(−7; 4,4)" />,
    question: 'Hol áll a kezdőkörhöz (O középpont, r = 9,15 m) képest a B(−7; 4,4) játékos?',
    options: ['A kezdőkörön belül', 'A kezdőkörön', 'A kezdőkörön kívül', 'A felezővonalon'],
    correctAnswer: 0,
    explanation: 'OB = √(49 + 19,36) = √68,36 ≈ 8,27 < 9,15, ezért B a kezdőkörön belül van.'
  },
  {
    id: 'ce-q8',
    level: 1,
    questionTypeBadge: 'Rajta van-e?',
    question: 'Melyik pont NINCS az origótól 5 egység távolságra?',
    options: ['(4; 4)', '(3; −4)', '(0; −5)', '(−4; 3)'],
    correctAnswer: 0,
    explanation: '4² + 4² = 32 ≠ 25, így (4; 4) távolsága √32 ≈ 5,66. A többinél 9 + 16 = 25, illetve 0 + 25 = 25.'
  },
  {
    id: 'ce-q9',
    level: 1,
    questionTypeBadge: 'Egyenlet leolvasása',
    figure: (
      <G11CircleEquationPlane
        xMin={-6}
        xMax={3}
        yMin={-3}
        yMax={5}
        unit={18}
        className={FIG}
        circles={[{ cx: -2, cy: 1, r: 3, color: CE_BLUE, width: 2 }]}
        segments={[{ from: [-2, 1], to: [1, 1], color: CE_RED, width: 1.6 }]}
        points={[{ x: -2, y: 1, color: '#0f172a', label: 'C', dx: -4, dy: -6, anchor: 'end' }]}
        texts={[{ x: -1.2, y: 0.4, text: 'r', color: CE_RED, bold: true }]}
      />
    ),
    question: 'Az ábrán a kör C középpontja és a sugár végpontja rácspont. Mi a kör egyenlete?',
    options: ['(x + 2)² + (y − 1)² = 9', '(x − 2)² + (y + 1)² = 9', '(x + 2)² + (y − 1)² = 3', '(x − 2)² + (y − 1)² = 9'],
    correctAnswer: 0,
    explanation: 'Leolvasva C(−2; 1) és r = 3, így (x + 2)² + (y − 1)² = 9.'
  },
  {
    id: 'ce-q10',
    level: 1,
    questionTypeBadge: 'Ponthalmaz',
    question: 'Hány olyan pont van a koordináta-rendszerben, amely az origótól 5 egység távolságra van?',
    options: ['Végtelen sok', 'Pontosan 4', 'Pontosan 8', 'Pontosan 12'],
    correctAnswer: 0,
    explanation: 'Ezek a pontok egy kört alkotnak (x² + y² = 25), amelynek végtelen sok pontja van. Rácspontból 12 van, de nem csak rácspontok vannak rajta, pl. (1; √24) is.'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'ce-q11',
    level: 2,
    questionTypeBadge: 'Kör ponton át',
    figure: (
      <G11CircleEquationPlane
        xMin={-3}
        xMax={7}
        yMin={-11}
        yMax={4}
        unit={10}
        tickEvery={2}
        className={FIG}
        segments={[{ from: [4, 2], to: [-1, -10], color: CE_RED, dashed: true, width: 1.6 }]}
        points={[
          { x: 4, y: 2, color: '#0f172a', label: 'C(4; 2)', dx: 6, dy: -4 },
          { x: -1, y: -10, label: 'A(−1; −10)', dx: 6, dy: 4 }
        ]}
        texts={[{ x: 1.9, y: -4, text: 'r = ?', color: CE_RED, bold: true }]}
      />
    ),
    question: 'Mi a C(4; 2) középpontú kör egyenlete, ha a kör átmegy az A(−1; −10) ponton?',
    options: ['(x − 4)² + (y − 2)² = 169', '(x − 4)² + (y − 2)² = 13', '(x + 4)² + (y + 2)² = 169', '(x − 4)² + (y − 2)² = 119'],
    correctAnswer: 0,
    explanation: 'r² = CA² = (−1 − 4)² + (−10 − 2)² = 25 + 144 = 169 (r = 13). A 13 maga a sugár, a jobb oldalra r² kerül; a 119 a két négyzet különbsége lenne.'
  },
  {
    id: 'ce-q12',
    level: 2,
    questionTypeBadge: 'Kör ponton át',
    figure: (
      <G11CircleEquationPlane
        xMin={-4}
        xMax={3}
        yMin={-4}
        yMax={4}
        unit={16}
        className={FIG}
        segments={[{ from: [-2, 2], to: [1, -3], color: CE_RED, dashed: true, width: 1.6 }]}
        points={[
          { x: -2, y: 2, color: '#0f172a', label: 'C(−2; 2)', dx: -4, dy: -6, anchor: 'end' },
          { x: 1, y: -3, label: 'A(1; −3)', dx: 6, dy: 4 }
        ]}
        texts={[{ x: -0.1, y: 0, text: 'r = ?', color: CE_RED, bold: true }]}
      />
    ),
    question: 'Mi a C(−2; 2) középpontú kör egyenlete, ha a kör átmegy az A(1; −3) ponton?',
    options: ['(x + 2)² + (y − 2)² = 34', '(x + 2)² + (y − 2)² = √34', '(x − 2)² + (y + 2)² = 34', '(x + 2)² + (y − 2)² = 10'],
    correctAnswer: 0,
    explanation: 'r² = (1 − (−2))² + (−3 − 2)² = 9 + 25 = 34. A jobb oldalra r² kerül, nem r.'
  },
  {
    id: 'ce-q13',
    level: 2,
    questionTypeBadge: 'Rajta van-e?',
    question: 'Melyik pont NINCS rajta az (x + 4)² + (y − 2)² = 25 egyenletű körön?',
    options: ['D(−2; −3)', 'A(−1; −2)', 'B(1; 2)', 'C(−8; 5)'],
    correctAnswer: 0,
    explanation: 'D: (−2 + 4)² + (−3 − 2)² = 4 + 25 = 29 ≠ 25. A: 9 + 16 = 25; B: 25 + 0 = 25; C: 16 + 9 = 25.'
  },
  {
    id: 'ce-q14',
    level: 2,
    questionTypeBadge: 'Rajta van-e?',
    question: 'Melyik pont NINCS rajta az (x − 2)² + (y + 1)² = 10 egyenletű körön?',
    options: ['C(3; −5)', 'A(−1; −2)', 'B(1; 2)', 'D(5; 0)'],
    correctAnswer: 0,
    explanation: 'C: (3 − 2)² + (−5 + 1)² = 1 + 16 = 17 ≠ 10. A: 9 + 1 = 10; B: 1 + 9 = 10; D: 9 + 1 = 10.'
  },
  {
    id: 'ce-q15',
    level: 2,
    questionTypeBadge: 'Belül vagy kívül',
    figure: (
      <G11CircleEquationPlane
        xMin={-1}
        xMax={11}
        yMin={-8}
        yMax={4}
        unit={14}
        tickEvery={2}
        className={FIG}
        circles={[{ cx: 5, cy: -2, r: 5, color: CE_BLUE, width: 2 }]}
        points={[
          { x: 5, y: -2, color: '#0f172a', label: 'K′(5; −2)', dx: -4, dy: -6, anchor: 'end' },
          { x: 9.5, y: 0, label: 'E(9,5; 0)', dx: -4, dy: -7, anchor: 'end' }
        ]}
      />
    ),
    question: 'A K′(5; −2) középpontú kör sugara 5. Hol van az E(9,5; 0) pont?',
    options: ['A körön belül', 'A körön', 'A körön kívül', 'A kör középpontjában'],
    correctAnswer: 0,
    explanation: 'K′E² = (9,5 − 5)² + (0 + 2)² = 20,25 + 4 = 24,25 < 25, így K′E ≈ 4,92 < 5: az E pont a körön belül van.'
  },
  {
    id: 'ce-q16',
    level: 2,
    questionTypeBadge: 'Távolság',
    question: 'Az A(8; 3), B(−8; 0), C(0; 5), D(10; 1), E(11; −9) pontok közül melyek vannak 10 egység távolságra a K(2; −5) ponttól?',
    options: ['A és D', 'Csak A', 'A, D és E', 'B és C'],
    correctAnswer: 0,
    explanation: 'A: 6² + 8² = 100 ✓; D: 8² + 6² = 100 ✓; B: 100 + 25 = 125; C: 4 + 100 = 104; E: 81 + 16 = 97 (≈ 9,85, majdnem!).'
  },
  {
    id: 'ce-q17',
    level: 2,
    questionTypeBadge: 'Rajta van-e?',
    question: 'Rajta van-e a P(−3; 2) pont az (x + 7)² + (y − 1)² = 25 egyenletű körön?',
    options: ['Nem, a körön belül van', 'Igen, rajta van', 'Nem, a körön kívül van', 'Nem, mert a középpont (7; −1)'],
    correctAnswer: 0,
    explanation: '(−3 + 7)² + (2 − 1)² = 16 + 1 = 17 < 25, tehát P nincs a körön, hanem azon belül van. (A középpont C(−7; 1).)'
  },
  {
    id: 'ce-q18',
    level: 2,
    questionTypeBadge: 'Eltolás',
    figure: (
      <G11CircleEquationPlane
        xMin={-6}
        xMax={11}
        yMin={-8}
        yMax={6}
        unit={11}
        tickEvery={5}
        className={FIG}
        circles={[
          { cx: 0, cy: 0, r: 5, color: CE_BLUE, dashed: true, width: 1.4 },
          { cx: 5, cy: -2, r: 5, color: CE_RED, width: 2 }
        ]}
        segments={[{ from: [0, 0], to: [5, -2], color: CE_PURPLE, width: 2 }]}
        points={[
          { x: 0, y: 0, color: CE_BLUE, label: 'O', dx: -4, dy: -5, anchor: 'end' },
          { x: 5, y: -2, color: CE_RED }
        ]}
        texts={[
          { x: 1.6, y: -2.2, text: 'v(5; −2)', color: CE_PURPLE, bold: true, size: 9, vec: true },
          { x: 8.8, y: 2.6, text: '?', color: CE_RED, bold: true, size: 13 }
        ]}
      />
    ),
    question: 'Az x² + y² = 25 kört eltoljuk a →v(5; −2) vektorral. Mi a kapott (piros) kör egyenlete?',
    options: ['(x − 5)² + (y + 2)² = 25', '(x + 5)² + (y − 2)² = 25', '(x − 5)² + (y + 2)² = 29', 'x² + y² = 29'],
    correctAnswer: 0,
    explanation: 'Az eltolás a sugarat nem változtatja (r = 5), a középpont K′(5; −2) lesz: (x − 5)² + (y + 2)² = 25.'
  },
  {
    id: 'ce-q19',
    level: 2,
    questionTypeBadge: 'Kifejtett alak',
    question: 'Melyik egyenlet egyezik meg az (x − 3)² + (y + 2)² = 25 egyenlettel?',
    options: ['x² + y² − 6x + 4y − 12 = 0', 'x² + y² + 6x − 4y − 12 = 0', 'x² + y² − 6x + 4y + 12 = 0', 'x² + y² − 3x + 2y − 25 = 0'],
    correctAnswer: 0,
    explanation: 'x² − 6x + 9 + y² + 4y + 4 = 25 ⇒ x² + y² − 6x + 4y + 13 − 25 = 0 ⇒ x² + y² − 6x + 4y − 12 = 0.'
  },
  {
    id: 'ce-q20',
    level: 2,
    questionTypeBadge: 'Teljes négyzet',
    question: 'Mi az x² + y² + 8x − 2y + 8 = 0 egyenletű kör középpontja és sugara?',
    options: ['C(−4; 1), r = 3', 'C(4; −1), r = 3', 'C(−4; 1), r = 9', 'C(−8; 2), r = 3'],
    correctAnswer: 0,
    explanation: '(x + 4)² − 16 + (y − 1)² − 1 + 8 = 0 ⇒ (x + 4)² + (y − 1)² = 9 ⇒ C(−4; 1), r = 3.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'ce-q21',
    level: 3,
    questionTypeBadge: 'Átmérőből kör',
    figure: (
      <G11CircleEquationPlane
        xMin={-26}
        xMax={12}
        yMin={-18}
        yMax={19}
        unit={3.8}
        tickEvery={10}
        grid={false}
        className={FIG}
        circles={[{ cx: -7, cy: 1, r: 17, color: CE_BLUE, width: 1.8 }]}
        segments={[{ from: [1, -14], to: [-15, 16], color: CE_RED, width: 1.6 }]}
        points={[
          { x: 1, y: -14, label: 'A(1; −14)', dx: 5, dy: 4 },
          { x: -15, y: 16, label: 'B(−15; 16)', dx: -5, dy: -4, anchor: 'end' },
          { x: -7, y: 1, color: '#0f172a', label: '?', dx: 5, dy: 10 }
        ]}
      />
    ),
    question: 'Egy kör egyik átmérőjének két végpontja A(1; −14) és B(−15; 16). Mi a kör egyenlete?',
    options: ['(x + 7)² + (y − 1)² = 289', '(x + 7)² + (y − 1)² = 1156', '(x − 7)² + (y + 1)² = 289', '(x + 8)² + (y − 15)² = 289'],
    correctAnswer: 0,
    explanation: 'Középpont az AB felezőpontja: K(−7; 1). AB = √(16² + 30²) = 34, így r = 17 és r² = 289. (1156 = 34² az átmérő négyzete.)'
  },
  {
    id: 'ce-q22',
    level: 3,
    questionTypeBadge: 'Körbe írt négyzet',
    figure: (
      <G11CircleEquationPlane
        xMin={-26}
        xMax={12}
        yMin={-18}
        yMax={19}
        unit={3.8}
        tickEvery={10}
        grid={false}
        className={FIG}
        circles={[{ cx: -7, cy: 1, r: 17, color: CE_BLUE, width: 1.8 }]}
        segments={[
          { from: [1, -14], to: [8, 9], color: CE_PURPLE, width: 1.6 },
          { from: [8, 9], to: [-15, 16], color: CE_PURPLE, width: 1.6 },
          { from: [-15, 16], to: [-22, -7], color: CE_PURPLE, width: 1.6 },
          { from: [-22, -7], to: [1, -14], color: CE_PURPLE, width: 1.6 },
          { from: [1, -14], to: [-15, 16], color: CE_RED, dashed: true }
        ]}
        points={[
          { x: 1, y: -14, label: 'A', dx: 5, dy: 4 },
          { x: -15, y: 16, label: 'B', dx: -5, dy: -4, anchor: 'end' }
        ]}
        texts={[{ x: 5.5, y: -4, text: '?', color: CE_PURPLE, bold: true, size: 13 }]}
      />
    ),
    question: 'Az A(1; −14), B(−15; 16) átmérőjű körbe négyzetet írunk. Mekkora a négyzet oldala?',
    options: ['17√2 ≈ 24,04', '34', '17', '34√2 ≈ 48,08'],
    correctAnswer: 0,
    explanation: 'A körbe írt négyzet átlója a kör átmérője, 34. Az oldal a = 34 : √2 = 17√2 ≈ 24,04.'
  },
  {
    id: 'ce-q23',
    level: 3,
    questionTypeBadge: 'Beírt kör',
    question: 'Mi az A(1; −14), B(−15; 16) átmérőjű körbe írt négyzet beírt körének egyenlete?',
    options: ['(x + 7)² + (y − 1)² = 144,5', '(x + 7)² + (y − 1)² = 289', '(x + 7)² + (y − 1)² = 72,25', '(x + 7)² + (y − 1)² = 578'],
    correctAnswer: 0,
    explanation: 'A beírt kör középpontja is K(−7; 1), sugara a négyzet oldalának fele: 17√2 / 2, így r² = 289 · 2 / 4 = 144,5.'
  },
  {
    id: 'ce-q24',
    level: 3,
    questionTypeBadge: 'Négyzet köré írt kör',
    figure: (
      <G11CircleEquationPlane
        xMin={-20}
        xMax={34}
        yMin={-27}
        yMax={27}
        unit={2.7}
        tickEvery={10}
        grid={false}
        className={FIG}
        segments={[{ from: [14, -24], to: [0, 24], color: CE_RED, dashed: true, width: 1.6 }]}
        points={[
          { x: 14, y: -24, label: 'A(14; −24)', dx: 6, dy: 4 },
          { x: 0, y: 24, label: 'C(0; 24)', dx: 6, dy: 2 }
        ]}
        texts={[{ x: 10, y: 6, text: '?', color: CE_BLUE, bold: true, size: 13 }]}
      />
    ),
    question: 'Egy négyzet két szemközti csúcsa A(14; −24) és C(0; 24). Mi a négyzet köré írt kör egyenlete?',
    options: ['(x − 7)² + y² = 625', '(x − 7)² + y² = 2500', '(x + 7)² + y² = 625', '(x − 14)² + (y + 24)² = 2500'],
    correctAnswer: 0,
    explanation: 'A köré írt kör középpontja az AC átló felezőpontja, (7; 0); sugara az átló fele: AC = √(14² + 48²) = 50, r = 25, r² = 625.'
  },
  {
    id: 'ce-q25',
    level: 3,
    questionTypeBadge: 'Beírt kör területe',
    question: 'Mekkora az A(14; −24), C(0; 24) szemközti csúcsú négyzet beírt körének területe?',
    options: ['312,5π ≈ 981,7', '625π ≈ 1963,5', '156,25π ≈ 490,9', '25π ≈ 78,5'],
    correctAnswer: 0,
    explanation: 'Az átló 50, az oldal 50 : √2 = 25√2, a beírt kör sugara 25√2 / 2, így r² = 1250 / 4 = 312,5 és T = 312,5π ≈ 981,7.'
  },
  {
    id: 'ce-q26',
    level: 3,
    questionTypeBadge: 'Ráadás',
    figure: (
      <G11CircleEquationPlane
        xMin={-4}
        xMax={8}
        yMin={-2}
        yMax={6}
        unit={18}
        tickEvery={2}
        className={FIG}
        segments={[{ from: [-2, 4], to: [6, 0], color: CE_BLUE, width: 2.2 }]}
        points={[
          { x: -2, y: 4, label: 'A(−2; 4)', dx: 5, dy: -6 },
          { x: 6, y: 0, label: 'B(6; 0)', dx: -4, dy: -7, anchor: 'end' }
        ]}
        texts={[{ x: 2.6, y: 2.6, text: 'befogó', color: CE_BLUE, size: 9 }]}
      />
    ),
    question: 'Egy egyenlő szárú derékszögű háromszög egyik befogójának végpontjai A(−2; 4) és B(6; 0). Hány különböző köré írt kör adódik a lehetséges háromszögekre?',
    options: ['2', '4', '1', '8'],
    correctAnswer: 0,
    explanation: 'A derékszög A-nál vagy B-nél lehet, az AB mindkét oldalán: 4 háromszög. Az AB egyik oldalán lévő két háromszög egy négyzetet alkot, közös a köré írt körük. Így 2 kör: (x − 4)² + (y − 6)² = 40 és x² + (y + 2)² = 40.'
  },
  {
    id: 'ce-q27',
    level: 3,
    questionTypeBadge: 'Teljes négyzet',
    question: 'Mit ír le az x² + y² − 10x + 30 = 0 egyenlet?',
    options: ['Egyetlen pontot sem – nincs megoldása', 'Az (5; 0) középpontú, √5 sugarú kört', 'Az (5; 0) középpontú, √30 sugarú kört', 'Csak az (5; 0) pontot'],
    correctAnswer: 0,
    explanation: '(x − 5)² − 25 + y² + 30 = 0 ⇒ (x − 5)² + y² = −5. Négyzetek összege nem lehet negatív, így egyetlen pont sem elégíti ki.'
  },
  {
    id: 'ce-q28',
    level: 3,
    questionTypeBadge: 'Teljes négyzet',
    question: 'Mi az x² + y² − 6x + 4y − 12 = 0 egyenletű kör középpontja és sugara?',
    options: ['C(3; −2), r = 5', 'C(−3; 2), r = 5', 'C(3; −2), r = √12', 'C(6; −4), r = 5'],
    correctAnswer: 0,
    explanation: '(x − 3)² − 9 + (y + 2)² − 4 − 12 = 0 ⇒ (x − 3)² + (y + 2)² = 25 ⇒ C(3; −2), r = 5.'
  },
  {
    id: 'ce-q29',
    level: 3,
    questionTypeBadge: 'Rajta van-e?',
    question: 'Rajta van-e a B(−3/2; √91/2) pont az origó középpontú, 5 egység sugarú körön?',
    options: ['Igen, mert 9/4 + 91/4 = 25', 'Nem, mert −3/2 negatív', 'Nem, mert 3/2 + √91/2 ≠ 5', 'Igen, mert √91 ≈ 9,5 < 10'],
    correctAnswer: 0,
    explanation: '(−3/2)² + (√91/2)² = 9/4 + 91/4 = 100/4 = 25 = 5², tehát B rajta van a körön.'
  },
  {
    id: 'ce-q30',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'Milyen k értékekre illeszkedik a P(k; 4) pont az x² + y² = 25 egyenletű körre?',
    options: ['k = 3 vagy k = −3', 'Csak k = 3', 'k = √21 vagy k = −√21', 'k = 21'],
    correctAnswer: 0,
    explanation: 'k² + 16 = 25 ⇒ k² = 9 ⇒ k = 3 vagy k = −3. (A √21 akkor jönne ki, ha 4² helyett 4-et vonnánk ki.)'
  }
];

export const G11CircleEquationQuiz: React.FC<{
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
      topicId="g11-geo-kor-egyenlete-quiz"
      subtopicId="a-kor-egyenlete"
      title="11. A kör egyenlete – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a kör egyenlete, középpont és sugár, rajta van-e a pont, teljes négyzetté kiegészítés."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={G11_CIRCLE_EQUATION_QUESTIONS}
      cheatSheets={[
        {
          title: 'A kör egyenlete',
          items: [
            'C(u; v) középpont, r sugár: (x − u)² + (y − v)² = r².',
            'Origó középpontú kör: x² + y² = r².',
            '(x + 4)² = (x − (−4))² ⇒ u = −4.',
            'A jobb oldalon r² áll – a sugár ennek gyöke.'
          ]
        },
        {
          title: 'Rajta, belül, kívül',
          items: [
            'Helyettesítsd be a pontot a bal oldalba!',
            '= r² ⇒ rajta van; < r² ⇒ belül; > r² ⇒ kívül.',
            'Kör ponton át: r² = (x₀ − u)² + (y₀ − v)².',
            'Átmérő végpontjaiból: K = felezőpont, r = átmérő fele.'
          ]
        },
        {
          title: 'Teljes négyzetté kiegészítés',
          items: [
            'x² + y² + Dx + Ey + F = 0',
            'C(−D/2; −E/2), r² = (D/2)² + (E/2)² − F',
            'r² > 0 ⇒ kör; = 0 ⇒ egy pont; < 0 ⇒ üres halmaz',
            'Példa: x² + y² − 6x + 4y − 12 = 0 ⇒ C(3; −2), r = 5'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11CircleEquationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11CircleEquationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11CircleEquationQuiz;
