import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PerpendicularParallelMatcher } from './PerpendicularParallelMatcher';
import { PerpendicularParallelSorter } from './PerpendicularParallelSorter';
import { PerpendicularParallelPlane } from './PerpendicularParallelFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';

export const PERPENDICULAR_PARALLEL_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapok (1–10)
  {
    id: 'pp-q1',
    level: 1,
    questionTypeBadge: 'Párhuzamosság',
    question: 'Mikor párhuzamos egymással két, az y tengellyel nem párhuzamos egyenes?',
    options: [
      'Akkor és csak akkor, ha a meredekségük egyenlő',
      'Ha a meredekségük szorzata −1',
      'Ha a meredekségük összege 0',
      'Ha az y tengelyt ugyanabban a pontban metszik'
    ],
    correctAnswer: 0,
    explanation: 'Két (y tengellyel nem párhuzamos) egyenes akkor és csak akkor párhuzamos, ha iránytangenseik egyenlők – ekkor az irányszögük is egyenlő.'
  },
  {
    id: 'pp-q2',
    level: 1,
    questionTypeBadge: 'Merőlegesség',
    question: 'Mikor merőleges egymásra két, az y tengellyel nem párhuzamos egyenes?',
    options: [
      'Akkor és csak akkor, ha a meredekségük szorzata −1',
      'Ha a meredekségük egyenlő',
      'Ha a meredekségük szorzata 1',
      'Ha a meredekségük különbsége 90'
    ],
    correctAnswer: 0,
    explanation: 'A tétel szerint e ⊥ f ⇔ mₑ · m_f = −1, azaz a meredekségek egymás reciprokának ellentettjei.'
  },
  {
    id: 'pp-q3',
    level: 1,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Melyik egyenes párhuzamos az y = 3x + 1 egyenletű egyenessel?',
    options: ['y = 3x − 5', 'y = −3x + 1', 'y = 1/3 x', 'y = −1/3 x + 1'],
    correctAnswer: 0,
    explanation: 'Párhuzamos egyenesek meredeksége egyenlő: y = 3x − 5 meredeksége is 3. (Az y = −1/3 x + 1 merőleges lenne rá.)'
  },
  {
    id: 'pp-q4',
    level: 1,
    questionTypeBadge: 'Merőleges meredekség',
    question: 'Mennyi az y = 2x egyenesre merőleges egyenesek meredeksége?',
    options: ['−1/2', '1/2', '−2', '2'],
    correctAnswer: 0,
    explanation: '2 · m = −1 ⇒ m = −1/2. (Az 1/2 csak a reciprok – 2 · 1/2 = 1, nem −1.)'
  },
  {
    id: 'pp-q5',
    level: 1,
    questionTypeBadge: 'Függőleges és vízszintes',
    figure: (
      <PerpendicularParallelPlane
        xMin={-2}
        xMax={9}
        yMin={-2}
        yMax={5}
        unit={24}
        className={FIG}
        lines={[{ p: [7, 0], q: [7, 1], color: PURPLE, label: 'x = 7', labelAt: 0.95, labelDx: -40 }]}
      />
    ),
    question: 'Melyik egyenes merőleges az ábrán látható x = 7 egyenletű egyenesre?',
    options: ['y = 2', 'x = 2', 'y = x + 7', 'y = 7x'],
    correctAnswer: 0,
    explanation: 'Az x = c alakú (függőleges) egyenesek minden y = b alakú (vízszintes) egyenesre merőlegesek. Az x = 2 párhuzamos vele.'
  },
  {
    id: 'pp-q6',
    level: 1,
    questionTypeBadge: 'Kidolgozott feladat',
    figure: (
      <PerpendicularParallelPlane
        xMin={-3}
        xMax={4}
        yMin={-3}
        yMax={3}
        unit={28}
        className={FIG}
        lines={[
          { p: [0, 0], q: [2, 1], color: BLUE, label: 'e', labelAt: 0.95 },
          { p: [0, 0], q: [1, -2], color: RED, dashed: true, label: 'f = ?', labelAt: 0.08, labelDx: 8, labelDy: 6 }
        ]}
        points={[{ at: [2, 1], label: 'P(2; 1)', dx: -10, dy: -10 }]}
        angles={[{ at: [0, 0], p: [2, 1], q: [1, -2], right: true, r: 13 }]}
      />
    ),
    question: 'Az e egyenes meredeksége 0,5 (átmegy az origón és a P(2; 1) ponton). Mennyi az e-re merőleges f egyenes meredeksége?',
    options: ['−2', '2', '−0,5', '0,5'],
    correctAnswer: 0,
    explanation: 'Az →OP(2; 1) −90°-os elforgatottja →OP′(1; −2), így m_f = −2/1 = −2. Ellenőrzés: 0,5 · (−2) = −1.'
  },
  {
    id: 'pp-q7',
    level: 1,
    questionTypeBadge: 'Párhuzamos egyenes',
    figure: (
      <PerpendicularParallelPlane
        xMin={-1}
        xMax={7}
        yMin={-4}
        yMax={4}
        unit={24}
        className={FIG}
        lines={[{ p: [0, -3], q: [1, -3], color: BLUE, label: 'y = −3', labelAt: 0.82, labelDy: -6 }]}
        points={[{ at: [5, 2], label: 'P(5; 2)', color: RED, dx: -20, dy: -10 }]}
      />
    ),
    question: 'Melyik a P(5; 2) ponton átmenő, az y = −3 egyenletű egyenessel párhuzamos egyenes?',
    options: ['y = 2', 'x = 5', 'y = −3x + 17', 'y = 5'],
    correctAnswer: 0,
    explanation: 'Az y = −3 vízszintes, a vele párhuzamos egyenesek y = b alakúak; P második koordinátája 2, így y = 2. (Az x = 5 merőleges lenne rá.)'
  },
  {
    id: 'pp-q8',
    level: 1,
    questionTypeBadge: 'Irányszög',
    question: 'Mit mondhatunk két párhuzamos (nem függőleges) egyenes irányszögéről?',
    options: ['Egyenlők', 'Összegük 90°', 'Különbségük 90°', 'Egymás ellentettjei'],
    correctAnswer: 0,
    explanation: 'Párhuzamos egyenesek az x tengely pozitív félegyenesével ugyanakkora szöget zárnak be, így irányszögük – és ezért a tangensük, a meredekségük – is egyenlő.'
  },
  {
    id: 'pp-q9',
    level: 1,
    questionTypeBadge: 'Helyzet rácsról',
    figure: (
      <PerpendicularParallelPlane
        xMin={-1}
        xMax={7}
        yMin={-3}
        yMax={4}
        unit={26}
        className={FIG}
        lines={[
          { p: [1, 0], q: [4, 2], color: BLUE, label: 'e', labelAt: 0.95 },
          { p: [3, 3], q: [5, 0], color: RED, label: 'f', labelAt: 0.06, labelDx: 8, labelDy: 4 }
        ]}
        points={[
          { at: [1, 0], color: BLUE },
          { at: [4, 2], color: BLUE },
          { at: [3, 3], color: RED },
          { at: [5, 0], color: RED }
        ]}
      />
    ),
    question: 'Az ábrán mindkét egyenesnek két rácspontját jelöltük. Milyen a két egyenes kölcsönös helyzete?',
    options: ['Merőlegesek', 'Párhuzamosak', 'Egybeesnek', 'Metszők, de nem merőlegesek'],
    correctAnswer: 0,
    explanation: 'mₑ = 2/3 (3 jobbra, 2 fel), m_f = −3/2 (2 jobbra, 3 le). A szorzat 2/3 · (−3/2) = −1, tehát merőlegesek.'
  },
  {
    id: 'pp-q10',
    level: 1,
    questionTypeBadge: 'Merőleges meredekség',
    question: 'Mennyi az y = −4x + 3 egyenletű egyenesre merőleges egyenes meredeksége?',
    options: ['1/4', '−1/4', '4', '−4'],
    correctAnswer: 0,
    explanation: '−4 · m = −1 ⇒ m = 1/4. A reciprok (−1/4) ellentettjét kell venni.'
  },

  // LEVEL 2: Egyenletek (11–20)
  {
    id: 'pp-q11',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Az e egyenes egyenlete −4x + 20y = 12. Melyik egyenes párhuzamos vele (és különbözik tőle)?',
    options: ['−x + 5y = 2', '10x + 2y = −5', '−40x + 8y = 20', '−40x − 8y = 20'],
    correctAnswer: 0,
    explanation: 'e: y = 1/5 x + 3/5. −x + 5y = 2 ⇔ y = 1/5 x + 2/5: ugyanaz a meredekség, más tengelymetszet. 10x + 2y = −5 és −40x − 8y = 20 meredeksége −5 (merőlegesek), −40x + 8y = 20-é 5.'
  },
  {
    id: 'pp-q12',
    level: 2,
    questionTypeBadge: 'Merőleges egyenes',
    question: 'Az e egyenes egyenlete −4x + 20y = 12. Melyik egyenes merőleges rá?',
    options: ['10x + 2y = −5', '−x + 5y = 2', '−40x + 8y = 20', '2x − 10y = −6'],
    correctAnswer: 0,
    explanation: 'mₑ = 1/5, 10x + 2y = −5 ⇔ y = −5x − 5/2, és 1/5 · (−5) = −1. A 2x − 10y = −6 maga az e egyenes (−1/2-szeres egyenlet), a −40x + 8y = 20 meredeksége +5.'
  },
  {
    id: 'pp-q13',
    level: 2,
    questionTypeBadge: 'Irányvektor',
    figure: (
      <PerpendicularParallelPlane
        xMin={-1}
        xMax={6}
        yMin={-3}
        yMax={2}
        unit={30}
        className={FIG}
        segs={[{ from: [0, 0], to: [5, -2], color: GREEN, width: 3, arrow: true, label: '→v(5; −2)', labelDx: 6, labelDy: -12 }]}
      />
    ),
    question: 'Az e egyenes átmegy az origón, és párhuzamos az ábrán látható →v(5; −2) vektorral. Mennyi az iránytangense?',
    options: ['−2/5', '−5/2', '5/2', '2/5'],
    correctAnswer: 0,
    explanation: 'A (v₁; v₂) irányvektorú egyenes meredeksége v₂/v₁ = −2/5. Az egyenes: y = −2/5 x.'
  },
  {
    id: 'pp-q14',
    level: 2,
    questionTypeBadge: 'Elforgatás',
    figure: (
      <PerpendicularParallelPlane
        xMin={-3}
        xMax={4}
        yMin={-3}
        yMax={3}
        unit={28}
        className={FIG}
        segs={[{ from: [0, 0], to: [2, 1], color: BLUE, width: 3, arrow: true }]}
        points={[{ at: [2, 1], label: 'P(2; 1)', dx: 6, dy: -6 }]}
        texts={[{ at: [1.4, -1.6], text: '−90° ↻ ?', color: RED, size: 12 }]}
      />
    ),
    question: 'Mik az →OP(2; 1) vektor −90°-os (az óramutató járásával egyező) elforgatottjának koordinátái?',
    options: ['(1; −2)', '(−1; 2)', '(−2; −1)', '(2; −1)'],
    correctAnswer: 0,
    explanation: '(a; b) −90°-os elforgatottja (b; −a), így (2; 1) ⇒ (1; −2). A (−1; 2) a +90°-os elforgatott, a (−2; −1) az ellentett vektor.'
  },
  {
    id: 'pp-q15',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'A(−4; −2), B(4; 2). Melyik a C(8; 10) ponton átmenő, az AB egyenessel párhuzamos egyenes?',
    options: ['y = 1/2 x + 6', 'y = 1/2 x + 10', 'y = −2x + 26', 'y = 2x − 6'],
    correctAnswer: 0,
    explanation: 'm_AB = 4/8 = 1/2. y − 10 = 1/2 (x − 8) ⇒ y = 1/2 x + 6. (Az y = −2x + 26 a C-n átmenő merőleges.)'
  },
  {
    id: 'pp-q16',
    level: 2,
    questionTypeBadge: 'Merőleges egyenes',
    question: 'Melyik egyenes merőleges a 2x + 5y = −1 egyenletű egyenesre?',
    options: ['x − 0,4y = 0,6', '4x − 3y = 12', '0,8x = 1 − 2y', '6x + 8y = 5'],
    correctAnswer: 0,
    explanation: '2x + 5y = −1 meredeksége −2/5. x − 0,4y = 0,6 ⇔ y = 2,5x − 1,5, és −2/5 · 5/2 = −1. A 0,8x = 1 − 2y (m = −2/5) vele párhuzamos.'
  },
  {
    id: 'pp-q17',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Melyik az origón átmenő, a 4x − 3y = 12 egyenessel párhuzamos egyenes egyenlete?',
    options: ['4x − 3y = 0', '3x + 4y = 0', '4x + 3y = 0', '3x − 4y = 0'],
    correctAnswer: 0,
    explanation: 'Párhuzamos egyenes egyenletében x és y együtthatója megtartható, csak a jobb oldal változik: 4x − 3y = c, az origóra c = 0. (3x + 4y = 0 merőleges lenne.)'
  },
  {
    id: 'pp-q18',
    level: 2,
    questionTypeBadge: 'Átlók',
    figure: (
      <PerpendicularParallelPlane
        xMin={-5}
        xMax={9}
        yMin={-3}
        yMax={11}
        unit={16}
        ticks="all"
        tickStep={2}
        className={FIG}
        polygons={[{ pts: [[-4, -2], [4, 2], [8, 10], [0, 6]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        segs={[
          { from: [-4, -2], to: [8, 10], color: PURPLE, dashed: true, width: 1.6 },
          { from: [4, 2], to: [0, 6], color: PURPLE, dashed: true, width: 1.6 }
        ]}
        points={[
          { at: [-4, -2], label: 'A', dx: -12, dy: 4 },
          { at: [4, 2], label: 'B', dx: 6, dy: 8 },
          { at: [8, 10], label: 'C', dx: -14, dy: -2 },
          { at: [0, 6], label: 'D', dx: -14, dy: -2 }
        ]}
      />
    ),
    question: 'Az ABCD négyszög csúcsai A(−4; −2), B(4; 2), C(8; 10), D(0; 6). Milyen az AC és a BD átló helyzete?',
    options: ['Merőlegesek, mert m_AC · m_BD = −1', 'Párhuzamosak', 'Metszők, de nem merőlegesek', 'Egy egyenesbe esnek'],
    correctAnswer: 0,
    explanation: 'm_AC = 12/12 = 1, m_BD = (6 − 2)/(0 − 4) = −1. A szorzat −1, tehát az átlók merőlegesek.'
  },
  {
    id: 'pp-q19',
    level: 2,
    questionTypeBadge: 'Merőleges egyenes',
    question: 'Melyik az origón átmenő, az y = 3/4 x − 2 egyenesre merőleges egyenes?',
    options: ['y = −4/3 x', 'y = 4/3 x', 'y = −3/4 x', 'y = 3/4 x'],
    correctAnswer: 0,
    explanation: '3/4 · m = −1 ⇒ m = −4/3, az origón átmenő egyenes y = −4/3 x.'
  },
  {
    id: 'pp-q20',
    level: 2,
    questionTypeBadge: 'Távolság',
    figure: (
      <PerpendicularParallelPlane
        xMin={-1}
        xMax={9}
        yMin={-1}
        yMax={5}
        unit={24}
        className={FIG}
        lines={[{ p: [7, 0], q: [7, 1], color: BLUE, label: 'x = 7', labelAt: 0.95, labelDx: 6 }]}
        segs={[{ from: [5, 2], to: [7, 2], color: PURPLE, dashed: true, label: '?', labelDy: -6 }]}
        angles={[{ at: [7, 2], p: [5, 2], q: [7, 4], right: true, r: 10 }]}
        points={[{ at: [5, 2], label: 'P(5; 2)', color: RED, dx: -26, dy: -10 }]}
      />
    ),
    question: 'Mekkora a P(5; 2) pont távolsága az x = 7 egyenletű egyenestől?',
    options: ['2', '5', '7', '√29 ≈ 5,39'],
    correctAnswer: 0,
    explanation: 'A P-ből az x = 7 egyenesre bocsátott merőleges vízszintes (y = 2), a talppont T(7; 2), a távolság |7 − 5| = 2.'
  },

  // LEVEL 3: Alkalmazás (21–30)
  {
    id: 'pp-q21',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'Az e egyenes egyenlete 6x − 15y = 2. Milyen p esetén merőleges e-re a 9x + py = 5 egyenletű egyenes?',
    options: ['p = 3,6', 'p = −3,6', 'p = −22,5', 'p = 22,5'],
    correctAnswer: 0,
    explanation: 'mₑ = 6/15 = 2/5, a másik meredeksége −9/p. 2/5 · (−9/p) = −1 ⇒ 18 = 5p ⇒ p = 3,6. (p = −22,5 a párhuzamosság feltétele.)'
  },
  {
    id: 'pp-q22',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'Az e egyenes egyenlete 6x − 15y = 2. Milyen p esetén párhuzamos e-vel a 9x + py = 5 egyenletű egyenes?',
    options: ['p = −22,5', 'p = 22,5', 'p = 3,6', 'p = −3,6'],
    correctAnswer: 0,
    explanation: '−9/p = 2/5 ⇒ p = −22,5. Ekkor 9x − 22,5y = 5, míg e 1,5-szerese 9x − 22,5y = 3, tehát nem egybeeső, hanem párhuzamos.'
  },
  {
    id: 'pp-q23',
    level: 3,
    questionTypeBadge: 'Magasságvonal',
    figure: (
      <PerpendicularParallelPlane
        xMin={-4}
        xMax={7}
        yMin={-5}
        yMax={3}
        unit={22}
        className={FIG}
        polygons={[{ pts: [[-3, 2], [5, -4], [0, 1]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        segs={[
          { from: [0, 1], to: [6, -1], color: '#94a3b8', dashed: true, width: 1.2 },
          { from: [5, -4], to: [6, -1], color: RED, dashed: true, width: 2, label: '?', labelDx: 12, labelDy: 0 }
        ]}
        angles={[{ at: [6, -1], p: [0, 1], q: [5, -4], right: true, r: 10 }]}
        points={[
          { at: [-3, 2], label: 'A', dx: -12, dy: -4 },
          { at: [5, -4], label: 'B', dx: 6, dy: 10 },
          { at: [0, 1], label: 'C', dx: -4, dy: -8 }
        ]}
      />
    ),
    question: 'Az ABC háromszög csúcsai A(−3; 2), B(5; −4), C(0; 1). Melyik a B csúcsból induló magasságvonal egyenlete?',
    options: ['y = 3x − 19', 'y = −1/3 x − 7/3', 'y = x − 9', 'y = 3x + 11'],
    correctAnswer: 0,
    explanation: 'A magasságvonal merőleges az AC oldalra: m_AC = (1 − 2)/(0 + 3) = −1/3, így m = 3. B-n át: y + 4 = 3(x − 5) ⇒ y = 3x − 19. (Az y = −1/3 x − 7/3 a B-n átmenő, AC-vel párhuzamos egyenes.)'
  },
  {
    id: 'pp-q24',
    level: 3,
    questionTypeBadge: 'Felezőmerőleges',
    question: 'A(−3; 2) és B(5; −4). Melyik az AB szakasz felezőmerőlegesének egyenlete?',
    options: ['4x − 3y = 7', '3x + 4y = −1', '4x − 3y = −18', '4x − 3y = 32'],
    correctAnswer: 0,
    explanation: 'F(1; −1) a felezőpont, m_AB = −6/8 = −3/4, a merőleges meredeksége 4/3: 4x − 3y = 4 · 1 − 3 · (−1) = 7. (3x + 4y = −1 maga az AB egyenes, a −18 és a 32 az A-n, illetve B-n átmenő merőlegesé.)'
  },
  {
    id: 'pp-q25',
    level: 3,
    questionTypeBadge: 'Pont és egyenes távolsága',
    figure: (
      <PerpendicularParallelPlane
        xMin={-5}
        xMax={3}
        yMin={-1}
        yMax={5}
        unit={28}
        className={FIG}
        lines={[{ p: [0, 1], q: [1, 0], color: BLUE, label: 'x + y = 1', labelAt: 0.12, labelDx: 10, labelDy: 0 }]}
        segs={[{ from: [-3, 2], to: [-2, 3], color: PURPLE, width: 2.6, label: 'd = ?', labelDx: -22, labelDy: -6 }]}
        angles={[{ at: [-2, 3], p: [-3, 2], q: [-1, 2], right: true, r: 10 }]}
        points={[{ at: [-3, 2], label: 'A(−3; 2)', dx: -24, dy: 16 }]}
      />
    ),
    question: 'Mekkora az A(−3; 2) pont távolsága az x + y = 1 egyenletű egyenestől?',
    options: ['√2 ≈ 1,41', '2', '2√2 ≈ 2,83', '1'],
    correctAnswer: 0,
    explanation: 'A merőleges A-n át: y = x + 5; metszéspont x + (x + 5) = 1 ⇒ T(−2; 3). AT = √(1² + 1²) = √2 ≈ 1,41.'
  },
  {
    id: 'pp-q26',
    level: 3,
    questionTypeBadge: 'Merőleges vetület',
    question: 'Hol van az A(−3; 2) pontból az x + y = 1 egyenesre bocsátott merőleges talppontja?',
    options: ['(−2; 3)', '(−1; 2)', '(0; 1)', '(−4; 1)'],
    correctAnswer: 0,
    explanation: 'Az egyenes meredeksége −1, a merőlegesé 1: y = x + 5. A két egyenes metszéspontja: 2x + 5 = 1 ⇒ x = −2, y = 3. (A (−1; 2) és a (0; 1) rajta van az egyenesen, de az A-ból hozzájuk vezető szakasz nem merőleges rá.)'
  },
  {
    id: 'pp-q27',
    level: 3,
    questionTypeBadge: 'Távolság az origótól',
    question: 'Milyen távol van az origó a 3x + 4y = 10 egyenletű egyenestől?',
    options: ['2', '10', '2,5', '10/7 ≈ 1,43'],
    correctAnswer: 0,
    explanation: 'A merőleges az origón át: y = 4/3 x. Behelyettesítve: 3x + 16/3 x = 10 ⇒ x = 1,2, y = 1,6. A távolság √(1,44 + 2,56) = √4 = 2.'
  },
  {
    id: 'pp-q28',
    level: 3,
    questionTypeBadge: 'Párhuzamosok távolsága',
    figure: (
      <PerpendicularParallelPlane
        xMin={-3}
        xMax={4}
        yMin={-5}
        yMax={4}
        unit={22}
        className={FIG}
        lines={[
          { p: [0, 1], q: [1, 3], color: BLUE, label: 'y = 2x + 1', labelAt: 0.95, labelDx: -78, labelDy: 0 },
          { p: [0, -4], q: [1, -2], color: GREEN, label: 'y = 2x − 4', labelAt: 0.75, labelDx: 8, labelDy: 10 }
        ]}
        segs={[{ from: [0, 1], to: [2, 0], color: PURPLE, dashed: true, width: 2, label: '?', labelDx: 6, labelDy: -6 }]}
        angles={[{ at: [2, 0], p: [0, 1], q: [3, 2], right: true, r: 10 }]}
      />
    ),
    question: 'Mekkora a távolság az y = 2x + 1 és az y = 2x − 4 párhuzamos egyenesek között?',
    options: ['√5 ≈ 2,24', '5', '2,5', '1'],
    correctAnswer: 0,
    explanation: 'A (0; 1) pontból a másik egyenesre merőleges: y = −1/2 x + 1. Metszéspont: 2x − 4 = −1/2 x + 1 ⇒ x = 2, T(2; 0). A távolság √(4 + 1) = √5 ≈ 2,24. (Az 5 a tengelymetszetek különbsége, az nem merőleges távolság.)'
  },
  {
    id: 'pp-q29',
    level: 3,
    questionTypeBadge: 'Négyszög típusa',
    question: 'Milyen négyszög az A(−4; −2), B(4; 2), C(8; 10), D(0; 6) csúcsú ABCD?',
    options: ['Rombusz, amely nem négyzet', 'Négyzet', 'Téglalap, amely nem négyzet', 'Trapéz, amely nem paralelogramma'],
    correctAnswer: 0,
    explanation: 'm_AB = m_DC = 1/2 és m_BC = m_AD = 2, tehát paralelogramma. Az átlók meredeksége 1 és −1, merőlegesek ⇒ rombusz. Mivel 1/2 · 2 = 1 ≠ −1, a szomszédos oldalak nem merőlegesek, így nem négyzet.'
  },
  {
    id: 'pp-q30',
    level: 3,
    questionTypeBadge: 'Merőleges pár',
    question: 'e: 2x + 5y = −1, f: 4x − 3y = 12, g: 6x + 8y = 5, h: x − 0,4y = 0,6. Melyik két egyenes merőleges egymásra az alábbiak közül?',
    options: ['e és h', 'e és g', 'f és h', 'g és h'],
    correctAnswer: 0,
    explanation: 'mₑ = −2/5, m_f = 4/3, m_g = −3/4, m_h = 5/2. mₑ · m_h = −1 ✓. e és g: 0,3; f és h: 10/3; g és h: −15/8. (f és g is merőleges, de az nincs a válaszok között.)'
  }
];

export const PerpendicularParallelQuiz: React.FC<{
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
      topicId="g11-geo-meroleges-parhuzamos-quiz"
      subtopicId="meroleges-parhuzamos-egyenesek"
      title="15. Merőleges, párhuzamos egyenesek – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: m₁ = m₂ és m₁ · m₂ = −1, paraméteres feladatok, magasságvonal, felezőmerőleges, pont és egyenes távolsága."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={PERPENDICULAR_PARALLEL_QUESTIONS}
      cheatSheets={[
        {
          title: 'Párhuzamosság',
          items: [
            'e ∥ f ⇔ m₁ = m₂ (nem függőleges egyenesekre).',
            'x = c egyenesek egymással párhuzamosak.',
            'Ax + By = C-vel párhuzamos: Ax + By = C′.',
            'Arányos egyenletek ⇒ egybeeső egyenesek.'
          ]
        },
        {
          title: 'Merőlegesség',
          items: [
            'e ⊥ f ⇔ m₁ · m₂ = −1, azaz m₂ = −1/m_{1}.',
            'x = c ⊥ y = b.',
            '(a; b) −90°-os elforgatottja (b; −a).',
            'Ax + By = C-re merőleges: Bx − Ay = C′.'
          ]
        },
        {
          title: 'Alkalmazások',
          items: [
            'Magasságvonal: a csúcson át, merőleges a szemközti oldalra.',
            'Felezőmerőleges: a felezőponton át, merőleges a szakaszra.',
            'Pont–egyenes távolság: merőleges → talppont → PT.',
            'd = |Ax₀ + By₀ − C| / √(A² + B²).'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PerpendicularParallelMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PerpendicularParallelSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PerpendicularParallelQuiz;
