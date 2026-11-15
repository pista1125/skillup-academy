import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CoordinateVectorsMatcher } from './CoordinateVectorsMatcher';
import { CoordinateVectorsSorter } from './CoordinateVectorsSorter';
import { CVGrid } from './CoordinateVectorsFigures';

// ---- Kvízábrák: kis koordináta-rendszerek (csak ebben a fájlban) ----
const Q_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

export const COORDINATE_VECTORS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cv-q1',
    level: 1,
    questionTypeBadge: 'Bázisvektor',
    question: 'Melyek az →i bázisvektor koordinátái?',
    options: ['(1; 0)', '(0; 1)', '(1; 1)', '(0; 0)'],
    correctAnswer: 0,
    explanation: 'Az →i az origóból az (1; 0) pontba mutató egységvektor: →i = 1 · →i + 0 · →j.'
  },
  {
    id: 'cv-q2',
    level: 1,
    questionTypeBadge: 'Koordináták',
    question: 'Melyek az →a = 3→i − 2→j vektor koordinátái?',
    options: ['(3; −2)', '(−2; 3)', '(3; 2)', '(−3; 2)'],
    correctAnswer: 0,
    explanation: 'A felbontás együtthatói a koordináták: a₁ = 3, a₂ = −2, tehát →a(3; −2).'
  },
  {
    id: 'cv-q3',
    level: 1,
    questionTypeBadge: 'Helyvektor',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-1}
        y1={4}
        cell={26}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [0, 0], to: [2, 3], label: 'a', color: '#2563eb', side: 1 }]}
        points={[{ at: [2, 3], label: 'A', dx: 6, dy: -4 }]}
      />
    ),
    question: 'Melyek az ábrán látható →a helyvektor koordinátái?',
    options: ['(2; 3)', '(3; 2)', '(−2; 3)', '(2; −3)'],
    correctAnswer: 0,
    explanation: 'A helyvektor koordinátái megegyeznek a végpontja, az A pont koordinátáival: A(2; 3), így →a(2; 3).'
  },
  {
    id: 'cv-q4',
    level: 1,
    questionTypeBadge: '→AB koordinátái',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-1}
        y1={6}
        cell={22}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [1, 2], to: [2, 5], label: '→AB', color: '#2563eb', side: -1, offset: 16 }]}
        points={[
          { at: [1, 2], label: 'A(1; 2)', dx: 6, dy: 12 },
          { at: [2, 5], label: 'B(2; 5)', dx: 6, dy: -4 }
        ]}
      />
    ),
    question: 'Adott A(1; 2) és B(2; 5). Melyek az →AB vektor koordinátái?',
    options: ['(1; 3)', '(−1; −3)', '(3; 7)', '(3; 1)'],
    correctAnswer: 0,
    explanation: 'Végpont mínusz kezdőpont: →AB(2 − 1; 5 − 2) = (1; 3). A (−1; −3) a →BA vektor.'
  },
  {
    id: 'cv-q5',
    level: 1,
    questionTypeBadge: 'Vektor hossza',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-1}
        y1={5}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        polygons={[{ pts: [[0, 0], [3, 0], [3, 4]], fill: 'rgba(250,204,21,0.15)', stroke: '#eab308' }]}
        rightAngles={[{ at: [3, 0], p: [0, 0], q: [3, 4] }]}
        vectors={[{ from: [0, 0], to: [3, 4], label: 'v', color: '#2563eb', side: 1 }]}
        texts={[{ at: [3, 4], text: '?', color: '#dc2626', dx: 8, dy: 4, anchor: 'start' }]}
      />
    ),
    question: 'Milyen hosszú a →v(3; 4) vektor?',
    options: ['5', '7', '√7', '25'],
    correctAnswer: 0,
    explanation: '|→v| = √(3² + 4²) = √25 = 5. (3 + 4 = 7 hibás: a hosszak nem adódnak össze; 25 a hossz négyzete.)'
  },
  {
    id: 'cv-q6',
    level: 1,
    questionTypeBadge: 'Összeg',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-2}
        y1={4}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [0, 0], to: [1, 3], label: 'p', color: '#2563eb', side: 1 },
          { from: [0, 0], to: [3, -1], label: 'q', color: '#059669', side: -1 }
        ]}
      />
    ),
    question: 'Mennyi a →p(1; 3) és →q(3; −1) vektorok összege?',
    options: ['(4; 2)', '(−2; 4)', '(4; −2)', '(3; −3)'],
    correctAnswer: 0,
    explanation: 'Koordinátánként adunk össze: (1 + 3; 3 + (−1)) = (4; 2).'
  },
  {
    id: 'cv-q7',
    level: 1,
    questionTypeBadge: 'Számszoros',
    question: 'Melyek a 2→r vektor koordinátái, ha →r(−3; 1)?',
    options: ['(−6; 2)', '(−6; 1)', '(−1; 3)', '(6; −2)'],
    correctAnswer: 0,
    explanation: 'Mindkét koordinátát 2-vel szorozzuk: (2 · (−3); 2 · 1) = (−6; 2).'
  },
  {
    id: 'cv-q8',
    level: 1,
    questionTypeBadge: 'Leolvasás rácsról',
    figure: (
      <CVGrid
        x0={-2}
        x1={3}
        y0={-1}
        y1={4}
        cell={26}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [-1, 1], to: [2, 3], label: 'v', color: '#2563eb', side: 1 }]}
      />
    ),
    question: 'Melyek az ábrán látható →v vektor koordinátái?',
    options: ['(3; 2)', '(2; 3)', '(−3; −2)', '(1; 4)'],
    correctAnswer: 0,
    explanation: 'A kezdőpont (−1; 1), a végpont (2; 3): →v(2 − (−1); 3 − 1) = (3; 2).'
  },
  {
    id: 'cv-q9',
    level: 1,
    questionTypeBadge: 'Helyvektor',
    question: 'Mi az A pont helyvektora?',
    options: ['Az origóból az A pontba mutató vektor', 'Az A pontból az origóba mutató vektor', 'Az A pontból az (1; 0) pontba mutató vektor', 'Az A pont koordinátáinak összege'],
    correctAnswer: 0,
    explanation: 'A helyvektor kezdőpontja mindig az origó, végpontja a pont; koordinátái a pont koordinátái.'
  },
  {
    id: 'cv-q10',
    level: 1,
    questionTypeBadge: 'Felbontás i, j szerint',
    figure: (
      <CVGrid
        x0={-3}
        x1={2}
        y0={-1}
        y1={4}
        cell={26}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [0, 0], to: [-2, 3], label: 'd', color: '#dc2626', side: -1 },
          { from: [0, 0], to: [1, 0], label: 'i', color: '#0f172a', side: -1, width: 3 },
          { from: [0, 0], to: [0, 1], label: 'j', color: '#0f172a', side: -1, width: 3 }
        ]}
      />
    ),
    question: 'Írd fel az ábrán látható →d vektort az →i és →j bázisvektorokkal!',
    options: ['→d = −2→i + 3→j', '→d = 3→i − 2→j', '→d = 2→i − 3→j', '→d = −2→i − 3→j'],
    correctAnswer: 0,
    explanation: '→d végpontja (−2; 3): 2 egység →i-vel ellentétesen és 3 egység →j irányban, tehát →d = −2→i + 3→j.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'cv-q11',
    level: 2,
    questionTypeBadge: 'Vektor hossza',
    question: 'Milyen hosszú a →v(−2; −7) vektor?',
    options: ['√53 ≈ 7,28', '√45 ≈ 6,71', '9', '53'],
    correctAnswer: 0,
    explanation: '|→v| = √((−2)² + (−7)²) = √(4 + 49) = √53 ≈ 7,28. A negatív szám négyzete pozitív; √45 a (−2)² = −4 hibából jönne.'
  },
  {
    id: 'cv-q12',
    level: 2,
    questionTypeBadge: '+90°-os elforgatás',
    figure: (
      <CVGrid
        x0={-2}
        x1={4}
        y0={-1}
        y1={4}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [0, 0], to: [3, 1], label: 'v', color: '#2563eb', side: -1 }]}
      />
    ),
    question: 'Melyek a →v(3; 1) vektor +90°-os (pozitív irányú) elforgatottjának koordinátái?',
    options: ['(−1; 3)', '(1; −3)', '(−3; 1)', '(1; 3)'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) +90°-os elforgatottja (−v₂; v₁) = (−1; 3). Az (1; −3) a −90°-os elforgatott.'
  },
  {
    id: 'cv-q13',
    level: 2,
    questionTypeBadge: '−90°-os elforgatás',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-1}
        y1={6}
        cell={22}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [0, 0], to: [2, 5], label: 'v', color: '#2563eb', side: 1 }]}
      />
    ),
    question: 'Melyek a →v(2; 5) vektor −90°-os elforgatottjának koordinátái?',
    options: ['(5; −2)', '(−5; 2)', '(−2; 5)', '(2; −5)'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) −90°-os elforgatottja (v₂; −v₁) = (5; −2). A (−5; 2) a +90°-os elforgatott.'
  },
  {
    id: 'cv-q14',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: (
      <CVGrid
        x0={-3}
        x1={4}
        y0={-2}
        y1={5}
        cell={22}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [0, 0], to: [1, 3], label: 'p', color: '#2563eb', side: 1 },
          { from: [0, 0], to: [3, -1], label: 's', color: '#7c3aed', side: -1 }
        ]}
      />
    ),
    question: 'Melyek a →p − →s vektor koordinátái, ha →p(1; 3) és →s(3; −1)?',
    options: ['(−2; 4)', '(2; −4)', '(4; 2)', '(−2; 2)'],
    correctAnswer: 0,
    explanation: '(1 − 3; 3 − (−1)) = (−2; 4). A (2; −4) az →s − →p lenne.'
  },
  {
    id: 'cv-q15',
    level: 2,
    questionTypeBadge: 'Leolvasás rácsról',
    figure: (
      <CVGrid
        x0={-4}
        x1={2}
        y0={-1}
        y1={3}
        cell={26}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [-3, 1], to: [0, 0], label: '→GO', color: '#7c3aed', side: 1, offset: 16 }]}
        points={[{ at: [-3, 1], label: 'G', dx: -6, dy: -8 }]}
      />
    ),
    question: 'Melyek a →GO vektor koordinátái, ha G(−3; 1) és O az origó?',
    options: ['(3; −1)', '(−3; 1)', '(−3; −1)', '(3; 1)'],
    correctAnswer: 0,
    explanation: '→GO(0 − (−3); 0 − 1) = (3; −1). A (−3; 1) a G pont helyvektora, vagyis az →OG.'
  },
  {
    id: 'cv-q16',
    level: 2,
    questionTypeBadge: 'Párhuzamos vektor',
    question: 'Melyik az összes olyan vektor, amely párhuzamos az →u = 2→i − 4→j vektorral, és fele olyan hosszú?',
    options: ['(1; −2) és (−1; 2)', '(1; −2) és (2; −1)', '(4; −8) és (−4; 8)', '(−2; 1) és (2; −1)'],
    correctAnswer: 0,
    explanation: '±½ · (2; −4) = ±(1; −2). A (4; −8) kétszer olyan hosszú; a (2; −1) nem párhuzamos.'
  },
  {
    id: 'cv-q17',
    level: 2,
    questionTypeBadge: 'Összeg hossza',
    question: 'Adott →u = →i − 5→j és →v = 2→i + →j. Milyen hosszú az →u + →v vektor?',
    options: ['5', '√37 ≈ 6,08', '7', '≈ 7,33'],
    correctAnswer: 0,
    explanation: '→u + →v = (1 + 2; −5 + 1) = (3; −4), hossza √(9 + 16) = 5. (√26 + √5 ≈ 7,33 a két hossz összege – az nem az összeg hossza.)'
  },
  {
    id: 'cv-q18',
    level: 2,
    questionTypeBadge: 'Párhuzamosság',
    question: 'Melyik vektorral párhuzamos a →g(−3; 1,5) vektor?',
    options: ['(2; −1)', '(1; 2)', '(3; 1,5)', '(−2; −1)'],
    correctAnswer: 0,
    explanation: '→g = −1,5 · (2; −1) = (−3; 1,5), tehát párhuzamos (ellentétes irányú). A többinél a koordináták aránya különböző.'
  },
  {
    id: 'cv-q19',
    level: 2,
    questionTypeBadge: 'Merőlegesség',
    figure: (
      <CVGrid
        x0={-1}
        x1={4}
        y0={-2}
        y1={4}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [0, 0], to: [1, 3], label: 'p', color: '#2563eb', side: 1 },
          { from: [0, 0], to: [3, -1], label: 'q', color: '#059669', side: -1 }
        ]}
      />
    ),
    question: 'Milyen helyzetű egymáshoz képest a →p(1; 3) és a →q(3; −1)?',
    options: ['Merőlegesek', 'Párhuzamosak', 'Egyenlők', 'Egymás ellentettjei'],
    correctAnswer: 0,
    explanation: '→p koordinátáit megkapjuk, ha →q koordinátáit felcseréljük, és az egyik előjelét megváltoztatjuk: →p a →q +90°-os elforgatottja, tehát merőlegesek (és egyenlő hosszúak, √10).'
  },
  {
    id: 'cv-q20',
    level: 2,
    questionTypeBadge: 'Merőleges vektor',
    figure: (
      <CVGrid
        x0={-3}
        x1={2}
        y0={-1}
        y1={3}
        cell={26}
        axes
        ticks
        className={Q_CLASS}
        vectors={[{ from: [0, 0], to: [-1, 2], label: 'v', color: '#2563eb', side: -1 }]}
      />
    ),
    question: 'Melyik vektor merőleges a →v(−1; 2) vektorra, és háromszor olyan hosszú?',
    options: ['(−6; −3)', '(−3; 6)', '(6; −3)', '(2; 1)'],
    correctAnswer: 0,
    explanation: '→v +90°-os elforgatottja (−2; −1), háromszorosa (−6; −3) (a másik megoldás (6; 3)). A (−3; 6) párhuzamos →v-vel, a (2; 1) merőleges, de csak ugyanolyan hosszú.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'cv-q21',
    level: 3,
    questionTypeBadge: 'Vektor hossza',
    question: 'Milyen hosszú a →c(−20; −21) vektor?',
    options: ['29', '41', '√41 ≈ 6,40', '841'],
    correctAnswer: 0,
    explanation: '|→c| = √(400 + 441) = √841 = 29. (20 + 21 = 41 hibás; 841 a hossz négyzete.)'
  },
  {
    id: 'cv-q22',
    level: 3,
    questionTypeBadge: 'Műveletek',
    question: 'Adott →a = 5→i − 12→j és →b = 4→i − 3→j. Melyek a 2→b − →a vektor koordinátái?',
    options: ['(3; 6)', '(−3; −6)', '(13; −18)', '(−1; 9)'],
    correctAnswer: 0,
    explanation: '2→b = (8; −6), ebből →a(5; −12)-t kivonva (8 − 5; −6 − (−12)) = (3; 6).'
  },
  {
    id: 'cv-q23',
    level: 3,
    questionTypeBadge: 'Összeg hossza',
    question: 'Adott →a = 5→i − 12→j és →b = 4→i − 3→j. Mennyi |→a + →b|?',
    options: ['√306 = 3√34 ≈ 17,49', '18', '√34 ≈ 5,83', '24'],
    correctAnswer: 0,
    explanation: '→a + →b = (9; −15), |→a + →b| = √(81 + 225) = √306 = 3√34 ≈ 17,49. A 18 = |→a| + |→b| = 13 + 5 hibás.'
  },
  {
    id: 'cv-q24',
    level: 3,
    questionTypeBadge: 'Párhuzamos vektor',
    question: 'Melyik az összes olyan vektor, amely párhuzamos az →u = →i − 3→j vektorral, és kétszer olyan hosszú?',
    options: ['(2; −6) és (−2; 6)', '(6; 2) és (−6; −2)', '(2; −6) és (−6; 2)', '(0,5; −1,5) és (−0,5; 1,5)'],
    correctAnswer: 0,
    explanation: '±2 · (1; −3) = ±(2; −6). A (6; 2) merőleges →u-ra; a (0,5; −1,5) fele olyan hosszú.'
  },
  {
    id: 'cv-q25',
    level: 3,
    questionTypeBadge: 'Merőleges vektor',
    question: 'Melyik az összes olyan vektor, amely merőleges az →u(1; −1) vektorra, és kétszer olyan hosszú?',
    options: ['(2; 2) és (−2; −2)', '(2; −2) és (−2; 2)', '(1; 1) és (−1; −1)', '(4; 4) és (−4; −4)'],
    correctAnswer: 0,
    explanation: '→u +90°-os elforgatottja (1; 1), kétszerese (2; 2); a −90°-os irányban (−2; −2). A (2; −2) párhuzamos →u-val.'
  },
  {
    id: 'cv-q26',
    level: 3,
    questionTypeBadge: 'Egyenlő vektorok',
    figure: (
      <CVGrid
        x0={-3}
        x1={5}
        y0={-3}
        y1={2}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [-2, -1], to: [1, 1], label: '→AB', color: '#2563eb', side: 1, offset: 14 },
          { from: [1, -2], to: [4, 0], label: '→CD', color: '#059669', side: -1, offset: 14 }
        ]}
        points={[
          { at: [-2, -1], label: 'A', dx: -12, dy: 4 },
          { at: [1, 1], label: 'B', dx: 4, dy: -6 },
          { at: [1, -2], label: 'C', dx: -12, dy: 6 },
          { at: [4, 0], label: 'D', dx: 4, dy: -6 }
        ]}
      />
    ),
    question: 'Melyik állítás igaz az ábrán látható →AB és →CD vektorokra?',
    options: ['→AB = →CD', '→AB = −→CD', '→AB merőleges →CD-re', '|→AB| = 2 · |→CD|'],
    correctAnswer: 0,
    explanation: '→AB(1 − (−2); 1 − (−1)) = (3; 2) és →CD(4 − 1; 0 − (−2)) = (3; 2). Egyenlő koordináták ⇔ egyenlő vektorok.'
  },
  {
    id: 'cv-q27',
    level: 3,
    questionTypeBadge: 'Végpont',
    question: 'Az A(2; −1) pontból induló →AB vektor koordinátái (−3; 4). Melyek a B pont koordinátái?',
    options: ['(−1; 3)', '(5; −5)', '(−3; 4)', '(−1; −3)'],
    correctAnswer: 0,
    explanation: 'b₁ − 2 = −3 ⇒ b₁ = −1; b₂ − (−1) = 4 ⇒ b₂ = 3. B(−1; 3). Az (5; −5) a kivonás helytelen irányából adódna.'
  },
  {
    id: 'cv-q28',
    level: 3,
    questionTypeBadge: 'Elforgatás',
    figure: (
      <CVGrid
        x0={-2}
        x1={5}
        y0={-1}
        y1={5}
        cell={22}
        axes
        ticks
        className={Q_CLASS}
        vectors={[
          { from: [0, 0], to: [4, 1], label: 'v', color: '#2563eb', side: -1 },
          { from: [0, 0], to: [-1, 4], label: 'w', color: '#dc2626', side: 1 }
        ]}
      />
    ),
    question: 'Az ábrán →v(4; 1) és →w(−1; 4) látható. Milyen kapcsolat van köztük?',
    options: ['→w a →v +90°-os elforgatottja', '→w a →v −90°-os elforgatottja', '→w = −→v', '→w párhuzamos →v-vel'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) = (4; 1) ⇒ (−v₂; v₁) = (−1; 4) = →w: ez a +90°-os (pozitív, az óramutató járásával ellentétes) elforgatás.'
  },
  {
    id: 'cv-q29',
    level: 3,
    questionTypeBadge: 'Számszoros hossza',
    question: 'Milyen hosszú a −2→a vektor, ha →a(3; −4)?',
    options: ['10', '−10', '20', '7'],
    correctAnswer: 0,
    explanation: '−2→a = (−6; 8), hossza √(36 + 64) = 10 = |−2| · |→a| = 2 · 5. Hossz nem lehet negatív.'
  },
  {
    id: 'cv-q30',
    level: 3,
    questionTypeBadge: 'Elforgatás',
    question: 'Melyik vektor 90°-os elforgatottja az →u(6; −1) vektor?',
    options: ['(1; 6)', '(6; 1)', '(−6; 1)', '(−1; 6)'],
    correctAnswer: 0,
    explanation: '(1; 6) −90°-os elforgatottja (v₂; −v₁) = (6; −1) = →u. A (6; 1) elforgatottjai (−1; 6) és (1; −6), a (−1; 6) elforgatottjai (−6; −1) és (6; 1), a (−6; 1) pedig −→u (180°-os forgatás).'
  }
];

export const CoordinateVectorsQuiz: React.FC<{
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
      topicId="g11-geo-vektor-koordinatak-quiz"
      subtopicId="vektorok-a-koordinata-rendszerben"
      title="5. Vektorok a koordináta-rendszerben – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: koordináták leolvasása, →AB, műveletek, 90°-os elforgatás, vektor hossza."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={COORDINATE_VECTORS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Koordináták',
          items: [
            '→i(1; 0), →j(0; 1) – bázisvektorok.',
            '→a = a₁→i + a₂→j ⇔ →a(a₁; a₂).',
            'Pont koordinátái = helyvektora koordinátái.',
            '→AB(b₁ − a₁; b₂ − a₂): végpont − kezdőpont.'
          ]
        },
        {
          title: 'Műveletek',
          items: [
            '→a ± →b = (a₁ ± b₁; a₂ ± b₂).',
            'c · →a = (c · a₁; c · a₂).',
            '+90°: (v₁; v₂) → (−v₂; v₁); −90°: (v₁; v₂) → (v₂; −v₁).',
            'Párhuzamos: koordináták egymás számszorosai.'
          ]
        },
        {
          title: 'Hossz',
          items: [
            '|→v| = √(v₁² + v₂²).',
            '|→AB| = √((b₁ − a₁)² + (b₂ − a₂)²).',
            '→p(1; 3), →q(3; −1), →r(−3; 1): mind √10.',
            '→v(−2; −7): √53; →c(−20; −21): 29.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CoordinateVectorsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CoordinateVectorsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CoordinateVectorsQuiz;
