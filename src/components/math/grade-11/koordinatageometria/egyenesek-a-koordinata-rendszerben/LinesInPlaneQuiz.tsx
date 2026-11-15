import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LinesInPlaneMatcher } from './LinesInPlaneMatcher';
import { LinesInPlaneSorter } from './LinesInPlaneSorter';
import { MidpointPlane, MidpointPlaneProps } from '../felezopont/MidpointFigures';

// ---- Kvízábrák ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

/** Leolvasós ábra: rács és tengelybeosztás. */
const Grid: React.FC<Partial<MidpointPlaneProps>> = (props) => <MidpointPlane className={FIG} x={[-6, 6]} y={[-6, 6]} unit={19} labels={2} {...props} />;
/** Vázlat: rács és beosztás nélkül (nem árulja el a választ). */
const Sketch: React.FC<MidpointPlaneProps> = (props) => <MidpointPlane className={FIG} grid={0} labels={-1} {...props} />;

const LINES_IN_PLANE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Az egyenletek jelentése, egyszerű leolvasás (1–10)
  {
    id: 'lip-q1',
    level: 1,
    questionTypeBadge: 'x = a',
    figure: (
      <Sketch
        x={[-2, 9]}
        y={[-3, 5]}
        unit={22}
        lines={[{ p: [7, 0], d: [0, 1], color: BLUE, label: 'e', labelAt: 0.95, lx: 6, ly: 6 }]}
        points={[{ at: [7, 0], label: '(7; 0)', dx: -20, dy: 14, color: BLUE }]}
        rightAngles={[{ at: [7, 0], p: [9, 0], q: [7, 2] }]}
      />
    ),
    question: 'Az e egyenes merőleges az x tengelyre, és azt a (7; 0) pontban metszi. Mi az e egyenes egyenlete?',
    options: ['x = 7', 'y = 7', 'y = x + 7', 'x + y = 7'],
    correctAnswer: 0,
    explanation: 'Az e minden pontjának első koordinátája 7, és minden ilyen pont rajta van e-n, ezért az egyenlete x = 7. Az y = 7 vízszintes egyenes lenne.'
  },
  {
    id: 'lip-q2',
    level: 1,
    questionTypeBadge: 'y = b',
    figure: (
      <Sketch
        x={[-4, 6]}
        y={[-5, 2]}
        unit={24}
        lines={[{ p: [0, -3], d: [1, 0], color: RED, label: 'f', labelAt: 0.96, lx: -8, ly: -6 }]}
        points={[{ at: [0, -3], label: '(0; −3)', dx: -24, dy: 14, color: RED }]}
      />
    ),
    question: 'Az f egyenes merőleges az y tengelyre, és azt a (0; −3) pontban metszi. Mi az f egyenes egyenlete?',
    options: ['y = −3', 'x = −3', 'y = x − 3', 'y = −3x'],
    correctAnswer: 0,
    explanation: 'Az f minden pontjának második koordinátája −3, ezért az egyenlete y = −3. Az x = −3 függőleges egyenes.'
  },
  {
    id: 'lip-q3',
    level: 1,
    questionTypeBadge: 'y = b',
    question: 'Melyik állítás igaz az y = 2 egyenletű egyenesre?',
    options: [
      'Minden pontjának második koordinátája 2, és minden ilyen pont rajta van',
      'Minden pontjának első koordinátája 2',
      'Átmegy az origón',
      'Merőleges az x tengelyre'
    ],
    correctAnswer: 0,
    explanation: 'Az y = 2 egyenletet pontosan azok a pontok teszik igazzá, amelyek második koordinátája 2: ez az x tengellyel párhuzamos (az y tengelyre merőleges) egyenes.'
  },
  {
    id: 'lip-q4',
    level: 1,
    questionTypeBadge: 'y = x',
    question: 'Melyik pont van rajta az y = x egyenletű egyenesen?',
    options: ['(−3; −3)', '(−3; 3)', '(3; 0)', '(0; 3)'],
    correctAnswer: 0,
    explanation: 'Az y = x egyenes (a szögfelező) pontjainak két koordinátája egyenlő: (−3; −3). A (−3; 3) az y = −x egyenesen van.'
  },
  {
    id: 'lip-q5',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont van rajta az y = x + 5 egyenletű egyenesen?',
    options: ['A(−2,9; 2,1)', 'B(4,3; 9,4)', 'C(5; 0)', 'D(2; 3)'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: −2,9 + 5 = 2,1 ✓. A B pontra 4,3 + 5 = 9,3 ≠ 9,4, a C-re 10 ≠ 0, a D-re 7 ≠ 3.'
  },
  {
    id: 'lip-q6',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <Grid lines={[{ p: [0, 4], d: [1, 0], color: PURPLE, label: 'a', labelAt: 0.95, lx: -6, ly: -6 }]} />,
    question: 'Mi az ábrán látható a egyenes egyenlete?',
    options: ['y = 4', 'x = 4', 'y = 4x', 'y = x + 4'],
    correctAnswer: 0,
    explanation: 'Az a egyenes vízszintes, az y tengelyt a (0; 4) pontban metszi; minden pontjának második koordinátája 4: y = 4.'
  },
  {
    id: 'lip-q7',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <Grid lines={[{ p: [-2, 0], d: [0, 1], color: BLUE, label: 'b', labelAt: 0.95, lx: 6, ly: 8 }]} />,
    question: 'Mi az ábrán látható b egyenes egyenlete?',
    options: ['x = −2', 'y = −2', 'x = 2', 'y = x − 2'],
    correctAnswer: 0,
    explanation: 'A b egyenes függőleges, az x tengelyt a (−2; 0) pontban metszi; minden pontjának első koordinátája −2: x = −2.'
  },
  {
    id: 'lip-q8',
    level: 1,
    questionTypeBadge: 'Alakzat egyenlete',
    question: 'Mit nevezünk egy alakzat egyenletének a koordináta-rendszerben?',
    options: [
      'Olyan x-et és y-t tartalmazó egyenlőséget, amelyet az alakzat pontjainak és csakis azoknak a koordinátái tesznek igazzá',
      'Olyan egyenlőséget, amelyet az alakzat legalább két pontjának koordinátái igazzá tesznek',
      'Az alakzat pontjainak felsorolását',
      'Olyan egyenlőséget, amelyet az alakzaton kívüli pontok koordinátái tesznek igazzá'
    ],
    correctAnswer: 0,
    explanation: 'A definíció két irányú: az alakzat minden pontjára igaz legyen, és csak azokra. Két pont teljesülése még nem elég (pl. a (0; 0) és (1; 1) pont az y = x² parabolán is rajta van).'
  },
  {
    id: 'lip-q9',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    figure: (
      <Sketch
        x={[-6, 4]}
        y={[-3, 7]}
        unit={22}
        lines={[{ p: [0, 1], d: [1, -1], color: BLUE, label: 'y = −x + 1', labelAt: 0.88, lx: 6, ly: -4 }]}
        points={[
          { at: [-4, 5], label: 'A', dx: -9, dy: -4, color: PURPLE },
          { at: [-1, 3], label: 'B', dx: -9, dy: -4, color: PURPLE },
          { at: [2, 2], label: 'C', dx: 9, dy: -4, color: PURPLE }
        ]}
      />
    ),
    question: 'A(−4; 5), B(−1; 3), C(2; 2). Melyik pont van rajta az y = −x + 1 egyenletű egyenesen?',
    options: ['Csak az A', 'Csak a B', 'Csak a C', 'Mindhárom'],
    correctAnswer: 0,
    explanation: 'A: −(−4) + 1 = 5 ✓. B: 1 + 1 = 2 ≠ 3. C: −2 + 1 = −1 ≠ 2. Csak az A pont illeszkedik.'
  },
  {
    id: 'lip-q10',
    level: 1,
    questionTypeBadge: 'Tengelyek',
    question: 'Mi az x tengely egyenlete?',
    options: ['y = 0', 'x = 0', 'y = x', 'x + y = 0'],
    correctAnswer: 0,
    explanation: 'Az x tengely pontjainak második koordinátája 0, például (5; 0), (−2; 0): y = 0. Az x = 0 az y tengely egyenlete.'
  },

  // LEVEL 2: Rajzolás, leolvasás, illeszkedés (11–20)
  {
    id: 'lip-q11',
    level: 2,
    questionTypeBadge: 'Eltolás',
    figure: (
      <Sketch
        x={[-6, 5]}
        y={[-4, 8]}
        unit={20}
        lines={[
          { p: [0, 0], d: [1, 1], color: GREEN, label: 'b: y = x', labelAt: 0.92, lx: -4, ly: 14 },
          { p: [0, 5], d: [1, 1], color: PURPLE, label: 'c = ?', labelAt: 0.3, lx: -42, ly: 0, dashed: true }
        ]}
        vecs={[{ from: [-3, -3], to: [-3, 2], color: AMBER, width: 2 }]}
        texts={[{ at: [-3, -0.5], text: '(0; 5)', dx: -6, color: AMBER, anchor: 'end', bold: true }]}
      />
    ),
    question: 'A c egyenest úgy kapjuk, hogy az y = x egyenletű b egyenest eltoljuk a (0; 5) vektorral. Mi a c egyenlete?',
    options: ['y = x + 5', 'y = x − 5', 'y = 5x', 'y = 5'],
    correctAnswer: 0,
    explanation: 'Minden (t; t) pont képe (t; t + 5): a második koordináta 5-tel nagyobb az elsőnél, így c: y = x + 5.'
  },
  {
    id: 'lip-q12',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <Grid lines={[{ p: [0, -3], d: [1, 1], color: PURPLE, label: 'c', labelAt: 0.92, lx: -14, ly: 0 }]} />,
    question: 'Mi az ábrán látható c egyenes egyenlete?',
    options: ['y = x − 3', 'y = x + 3', 'y = −x − 3', 'y = −3x'],
    correctAnswer: 0,
    explanation: 'Az egyenes átmegy a (0; −3) és a (3; 0) ponton; minden pontjának második koordinátája 3-mal kisebb az elsőnél: y = x − 3.'
  },
  {
    id: 'lip-q13',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <Grid x={[-7, 3]} y={[-7, 3]} lines={[{ p: [0, -5], d: [1, -1], color: RED, label: 'd', labelAt: 0.1, lx: 6, ly: 2 }]} />,
    question: 'Mi az ábrán látható d egyenes egyenlete?',
    options: ['y = −x − 5', 'y = x − 5', 'y = −x + 5', 'y = x + 5'],
    correctAnswer: 0,
    explanation: 'A d átmegy a (0; −5) és a (−5; 0) ponton; jobbra haladva lejt, a koordináták összege −5: y = −x − 5.'
  },
  {
    id: 'lip-q14',
    level: 2,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont NINCS rajta az y = −x + 1 egyenletű egyenesen?',
    options: ['F(871; −872)', 'D(5; −4)', 'E(100; −99)', 'A(−4; 5)'],
    correctAnswer: 0,
    explanation: 'F-re: −871 + 1 = −870 ≠ −872, így F nincs rajta. D: −5 + 1 = −4 ✓, E: −100 + 1 = −99 ✓, A: 4 + 1 = 5 ✓.'
  },
  {
    id: 'lip-q15',
    level: 2,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont van rajta az y = x − 5 egyenletű egyenesen?',
    options: ['B(−1; −6)', 'A(−5; −9)', 'C(2; −2)', 'E(100; 105)'],
    correctAnswer: 0,
    explanation: 'B: −1 − 5 = −6 ✓. A: −10 ≠ −9, C: −3 ≠ −2, E: 95 ≠ 105.'
  },
  {
    id: 'lip-q16',
    level: 2,
    questionTypeBadge: 'Illeszkedés',
    question: 'Az A(−5; −9), B(−1; −6), C(2; −2), D(5; 0), E(100; 105), F(871; −866) pontok közül hány van rajta az y = x − 5 egyenesen?',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation: 'Csak B(−1; −6) és D(5; 0) teszi igazzá az egyenletet. F-nél 871 − 5 = 866, de a második koordináta −866 – az előjel számít!'
  },
  {
    id: 'lip-q17',
    level: 2,
    questionTypeBadge: 'Metszéspont',
    figure: (
      <Sketch
        x={[-2, 9]}
        y={[-4, 7]}
        unit={20}
        lines={[
          { p: [7, 0], d: [0, 1], color: BLUE, label: 'x = 7', labelAt: 0.97, lx: -40, ly: 8 },
          { p: [0, -3], d: [1, 1], color: PURPLE, label: 'y = x − 3', labelAt: 0.5, lx: 8, ly: 14 }
        ]}
        points={[{ at: [7, 4], label: '?', dx: 10, dy: 4, color: RED, r: 4 }]}
      />
    ),
    question: 'Hol metszi egymást az x = 7 és az y = x − 3 egyenletű egyenes?',
    options: ['(7; 4)', '(4; 7)', '(7; −3)', '(7; 10)'],
    correctAnswer: 0,
    explanation: 'A metszéspont mindkét egyenletet kielégíti: x = 7, és y = 7 − 3 = 4. Tehát (7; 4).'
  },
  {
    id: 'lip-q18',
    level: 2,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Hol metszi az y tengelyt az y = −x − 5 egyenletű egyenes?',
    options: ['(0; −5)', '(−5; 0)', '(0; 5)', '(5; 0)'],
    correctAnswer: 0,
    explanation: 'Az y tengely pontjaira x = 0, így y = −0 − 5 = −5: a metszéspont (0; −5). A (−5; 0) az x tengellyel vett metszéspont.'
  },
  {
    id: 'lip-q19',
    level: 2,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Hol metszi az x tengelyt az y = −x − 5 egyenletű egyenes?',
    options: ['(−5; 0)', '(5; 0)', '(0; −5)', '(−1; 0)'],
    correctAnswer: 0,
    explanation: 'Az x tengely pontjaira y = 0: 0 = −x − 5 ⇒ x = −5, a metszéspont (−5; 0).'
  },
  {
    id: 'lip-q20',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <Grid lines={[{ p: [0, 4], d: [1, -1], color: GREEN, label: 'e', labelAt: 0.12, lx: 8, ly: 0 }]} />,
    question: 'Mi az ábrán látható e egyenes egyenlete?',
    options: ['y = −x + 4', 'y = x + 4', 'y = x − 4', 'y = −x − 4'],
    correctAnswer: 0,
    explanation: 'Az e átmegy a (0; 4) és a (4; 0) ponton; a koordináták összege mindig 4, vagyis y = −x + 4.'
  },

  // LEVEL 3: Eltolás, paraméter, irány- és normálvektor (21–30)
  {
    id: 'lip-q21',
    level: 3,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Mi annak az egyenesnek az egyenlete, amely párhuzamos az y = x egyenessel, és átmegy az (1; 6) ponton?',
    options: ['y = x + 5', 'y = x + 6', 'y = x + 7', 'y = −x + 7'],
    correctAnswer: 0,
    explanation: 'Az y = x eltoltjai y = x + b alakúak. Az (1; 6) pontra 6 = 1 + b ⇒ b = 5: y = x + 5 (ez a tankönyvi c egyenes).'
  },
  {
    id: 'lip-q22',
    level: 3,
    questionTypeBadge: 'Eltolás',
    figure: (
      <Sketch
        x={[-5, 7]}
        y={[-5, 5]}
        unit={20}
        lines={[
          { p: [0, 0], d: [1, 1], color: GREEN, label: 'y = x', labelAt: 0.9, lx: -40, ly: 0 },
          { p: [3, 0], d: [1, 1], color: PURPLE, label: '?', labelAt: 0.85, lx: 8, ly: 6, dashed: true }
        ]}
        vecs={[{ from: [0, 0], to: [3, 0], color: AMBER, width: 2.2 }]}
        texts={[{ at: [1.5, 0], text: '(3; 0)', dy: 14, color: AMBER, bold: true }]}
      />
    ),
    question: 'Az y = x egyenletű egyenest eltoljuk a (3; 0) vektorral. Mi a kép egyenlete?',
    options: ['y = x − 3', 'y = x + 3', 'x = 3', 'y = 3x'],
    correctAnswer: 0,
    explanation: 'A (t; t) pont képe (t + 3; t): a második koordináta 3-mal kisebb az elsőnél, tehát y = x − 3. (Jobbra tolás 3-mal = lefelé tolás 3-mal ennél az egyenesnél.)'
  },
  {
    id: 'lip-q23',
    level: 3,
    questionTypeBadge: 'Eltolás',
    question: 'Az y = x egyenletű egyenest eltoljuk a (2; 2) vektorral. Mi a kép egyenlete?',
    options: ['y = x (önmagába megy át)', 'y = x + 2', 'y = x + 4', 'y = x − 2'],
    correctAnswer: 0,
    explanation: '(t; t) képe (t + 2; t + 2), ami ismét két egyenlő koordinátájú pont. A (2; 2) vektor párhuzamos az egyenessel (irányvektora), ezért az egyenes önmagába megy át.'
  },
  {
    id: 'lip-q24',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'A P(k; 3) pont rajta van az y = −x + 1 egyenesen. Mennyi k?',
    options: ['−2', '2', '4', '−4'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: 3 = −k + 1 ⇒ k = −2. Ellenőrzés: −(−2) + 1 = 3 ✓.'
  },
  {
    id: 'lip-q25',
    level: 3,
    questionTypeBadge: 'Irányvektor',
    question: 'Melyik vektor párhuzamos az y = 2x + 1 egyenletű egyenessel (azaz irányvektora)?',
    options: ['(1; 2)', '(2; 1)', '(2; −1)', '(0; 1)'],
    correctAnswer: 0,
    explanation: 'Az egyenesen 1-et jobbra lépve y 2-vel nő, így (1; 2) irányvektor. A (2; 1) feles meredekségű irányt adna, a (0; 1) függőleges.'
  },
  {
    id: 'lip-q26',
    level: 3,
    questionTypeBadge: 'Normálvektor',
    figure: (
      <Sketch
        x={[-3, 4]}
        y={[-2, 6]}
        unit={26}
        lines={[{ p: [0, 1], d: [1, 2], color: PURPLE, label: 'y = 2x + 1', labelAt: 0.92, lx: -76, ly: 0 }]}
        vecs={[
          { from: [1, 3], to: [2, 5], color: BLUE, width: 2.4, label: 'v', lx: 12, ly: 6 },
          { from: [1, 3], to: [-1, 4], color: RED, width: 2.4, label: 'n', lx: -4, ly: -6 }
        ]}
        rightAngles={[{ at: [1, 3], p: [2, 5], q: [-1, 4], color: RED }]}
        texts={[
          { at: [2, 5], text: '→v(1; 2)', dx: 6, dy: 4, color: BLUE, anchor: 'start', bold: true },
          { at: [-1, 4], text: '→n = ?', dx: -4, dy: 14, color: RED, anchor: 'end', bold: true }
        ]}
      />
    ),
    question: 'Az y = 2x + 1 egyenes egy irányvektora →v(1; 2). Melyik vektor merőleges az egyenesre (normálvektor)?',
    options: ['(−2; 1)', '(1; 2)', '(2; 1)', '(1; −2)'],
    correctAnswer: 0,
    explanation: 'A →v(1; 2) +90°-os elforgatottja (−2; 1) – ez merőleges az egyenesre. Az (1; 2) maga az irányvektor, a (2; 1) és az (1; −2) nem merőleges rá.'
  },
  {
    id: 'lip-q27',
    level: 3,
    questionTypeBadge: 'Alakzat egyenlete',
    question: 'Melyik egyenlet NEM egyenest ír le a koordináta-rendszerben?',
    options: ['y = x²', 'y = 3', 'x = −4', 'y = −x + 4'],
    correctAnswer: 0,
    explanation: 'Az y = x² pontjai (pl. (0; 0), (1; 1), (2; 4)) nincsenek egy egyenesen – ez parabola. A többi egyenes: vízszintes, függőleges, illetve y = ax + b alakú.'
  },
  {
    id: 'lip-q28',
    level: 3,
    questionTypeBadge: 'Ponthalmaz',
    question: 'Mi azoknak a pontoknak a halmaza, amelyek két koordinátája egymás ellentettje?',
    options: ['Az y = −x egyenletű egyenes', 'Az y = x egyenletű egyenes', 'Az x = 0 egyenletű egyenes', 'Csak az origó'],
    correctAnswer: 0,
    explanation: 'y = −x pontosan akkor teljesül, ha a második koordináta az első ellentettje, pl. (3; −3), (−2; 2), (0; 0). Ez a másik két síknegyed szögfelezője.'
  },
  {
    id: 'lip-q29',
    level: 3,
    questionTypeBadge: 'Ponthalmaz',
    question: 'Mi azoknak a pontoknak a halmaza, amelyek az x tengely felett, attól 3 egység távolságra vannak?',
    options: ['Az y = 3 egyenletű egyenes', 'Az x = 3 egyenletű egyenes', 'Az y = x + 3 egyenletű egyenes', 'Az y = −3 egyenletű egyenes'],
    correctAnswer: 0,
    explanation: 'Az x tengelytől mért távolság a második koordináta abszolút értéke; az x tengely felett ez pozitív: y = 3. Az x = 3 pontjai az y tengelytől vannak 3 egységre.'
  },
  {
    id: 'lip-q30',
    level: 3,
    questionTypeBadge: 'y = ax + b',
    figure: (
      <Sketch
        x={[-2, 3]}
        y={[-2, 7]}
        unit={22}
        lines={[{ p: [0, 2], d: [1, 3], color: PURPLE }]}
        points={[
          { at: [0, 2], label: '(0; 2)', dx: -20, dy: 4, color: BLUE },
          { at: [1, 5], label: '(1; 5)', dx: 22, dy: 4, color: BLUE }
        ]}
        texts={[{ at: [-1.2, 5.5], text: 'y = ax + b', color: PURPLE, size: 11, bold: true }]}
      />
    ),
    question: 'Az y = ax + b egyenletű egyenesen rajta van a (0; 2) és az (1; 5) pont. Mennyi a és b?',
    options: ['a = 3, b = 2', 'a = 2, b = 3', 'a = 5, b = 2', 'a = 3, b = 5'],
    correctAnswer: 0,
    explanation: '(0; 2): 2 = a · 0 + b ⇒ b = 2. (1; 5): 5 = a + 2 ⇒ a = 3. Az egyenes: y = 3x + 2.'
  }
];

export const LinesInPlaneQuiz: React.FC<{
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
      topicId="g11-geo-egyenes-iranyvektor-quiz"
      subtopicId="egyenesek-a-koordinata-rendszerben"
      title="9. Egyenesek a koordináta-rendszerben – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: x = a, y = b, y = ax + b, illeszkedés, leolvasás ábráról, eltolás vektorral, irány- és normálvektor."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={LINES_IN_PLANE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Egyenesek egyenlete',
          items: [
            'x tengelyre merőleges, (a; 0)-n át: x = a',
            'y tengelyre merőleges, (0; b)-n át: y = b',
            'mindkét tengelyt metszi: y = ax + b',
            'x tengely: y = 0; y tengely: x = 0; szögfelezők: y = x, y = −x'
          ]
        },
        {
          title: 'Illeszkedés',
          items: [
            'Helyettesítsd be a pont koordinátáit az egyenletbe!',
            'Igaz egyenlőség ⇒ rajta van; hamis ⇒ nincs rajta.',
            'y = x + 5: (−2,9; 2,1) rajta van, (4,3; 9,4) nincs.',
            'Tengelymetszetek: x = 0, illetve y = 0 behelyettesítése.'
          ]
        },
        {
          title: 'Eltolás, irány, normális',
          items: [
            'y = ax eltolása (v₁; v₂)-vel: y = a(x − v₁) + v₂',
            'y = x eltolása (0; 5)-tel: y = x + 5',
            'y = ax + b irányvektora (1; a), normálvektora (−a; 1)',
            'Irányvektorral eltolva az egyenes önmagába megy át.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LinesInPlaneMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LinesInPlaneSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LinesInPlaneQuiz;
