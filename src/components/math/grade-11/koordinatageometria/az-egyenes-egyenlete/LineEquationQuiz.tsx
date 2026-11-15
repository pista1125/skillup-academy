import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LineEquationMatcher } from './LineEquationMatcher';
import { LineEquationSorter } from './LineEquationSorter';
import { LineEquationPlane, LE_BLUE, LE_RED, LE_GREEN, LE_PURPLE, LE_AMBER } from './LineEquationFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';

/** Falnak támasztott létra vázlata koordináta-rendszerben, a keresett adat „?”. */
const LadderFig: React.FC<{ foot: string; top: string; pointLabel: string; px: number; py: number; known: 'x' | 'y'; knownText: string }> = ({
  foot,
  top,
  pointLabel,
  px,
  py,
  known,
  knownText
}) => {
  const O = { x: 40, y: 125 };
  const A = { x: 200, y: O.y };
  const B = { x: O.x, y: 20 };
  const P = { x: O.x + px * (A.x - O.x), y: O.y - py * (O.y - B.y) };
  return (
    <svg viewBox="0 0 240 150" className={FIG}>
      <rect x={O.x - 10} y={14} width={10} height={O.y - 14} fill="#cbd5e1" />
      <line x1={O.x - 10} y1={O.y} x2={225} y2={O.y} stroke="#334155" strokeWidth={1.4} />
      <line x1={O.x} y1={O.y + 8} x2={O.x} y2={10} stroke="#334155" strokeWidth={1.4} />
      <text x={228} y={O.y + 4} fontSize={9} fontStyle="italic" fill="#334155">x</text>
      <text x={O.x + 4} y={12} fontSize={9} fontStyle="italic" fill="#334155">y</text>
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#92400e" strokeWidth={3.2} strokeLinecap="round" />
      <line x1={P.x} y1={P.y} x2={P.x} y2={O.y} stroke={LE_BLUE} strokeDasharray="3 3" />
      <line x1={P.x} y1={P.y} x2={O.x} y2={P.y} stroke={LE_BLUE} strokeDasharray="3 3" />
      <circle cx={A.x} cy={A.y} r={3} fill={LE_RED} />
      <circle cx={B.x} cy={B.y} r={3} fill={LE_RED} />
      <circle cx={P.x} cy={P.y} r={3.5} fill={LE_BLUE} />
      <text x={A.x} y={A.y + 13} fontSize={9} textAnchor="middle" fill="#0f172a">{foot}</text>
      <text x={B.x + 6} y={B.y + 3} fontSize={9} fill="#0f172a">{top}</text>
      <text x={P.x + 6} y={P.y - 4} fontSize={10} fontWeight="bold" fill={LE_BLUE}>{pointLabel}</text>
      <text x={P.x} y={O.y + 13} fontSize={9} textAnchor="middle" fill={LE_BLUE} fontWeight="bold">{known === 'x' ? knownText : '?'}</text>
      <text x={O.x - 13} y={P.y + 3} fontSize={9} textAnchor="end" fill={LE_BLUE} fontWeight="bold">{known === 'y' ? knownText : '?'}</text>
    </svg>
  );
};

export const LINE_EQUATION_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'le-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent, hogy egy egyenlet az e egyenes egyenlete?',
    options: [
      'Az egyenletet csakis az e egyenesre illeszkedő pontok koordinátái teszik igazzá',
      'Az egyenletet az e egyenes két pontja teszi igazzá, a többi nem',
      'Az egyenletet a sík minden pontja kielégíti',
      'Az egyenlet megoldása az e egyenes meredeksége'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenes egyenlete a pontjainak koordinátáira vonatkozó összefüggés: az egyenes minden pontja kielégíti, és más pont nem.'
  },
  {
    id: 'le-q2',
    level: 1,
    questionTypeBadge: 'Függőleges egyenes',
    figure: (
      <LineEquationPlane
        xMin={-3}
        xMax={5}
        yMin={-3}
        yMax={4}
        unit={20}
        className={FIG}
        lines={[{ x: 2, color: LE_BLUE, width: 2.2, label: '?', labelAt: 3.2 }]}
        points={[{ x: 2, y: 0, label: '(2; 0)', dx: 5, dy: 12 }]}
      />
    ),
    question: 'Mi az ábrán látható, az y tengellyel párhuzamos egyenes egyenlete?',
    options: ['x = 2', 'y = 2', 'y = 2x', 'x = −2'],
    correctAnswer: 0,
    explanation: 'Az egyenes minden pontjának első koordinátája 2, ezért egyenlete x = 2. (Az y = 2 egyenes vízszintes lenne.)'
  },
  {
    id: 'le-q3',
    level: 1,
    questionTypeBadge: 'Vízszintes egyenes',
    figure: (
      <LineEquationPlane
        xMin={-4}
        xMax={4}
        yMin={-2}
        yMax={5}
        unit={20}
        className={FIG}
        lines={[{ m: 0, b: 3, color: LE_BLUE, width: 2.2, label: '?', labelAt: 2.6 }]}
        points={[{ x: 0, y: 3, label: '(0; 3)', dx: 5, dy: -6 }]}
      />
    ),
    question: 'Mi az ábrán látható, az x tengellyel párhuzamos egyenes egyenlete?',
    options: ['y = 3', 'x = 3', 'y = 3x', 'y = x + 3'],
    correctAnswer: 0,
    explanation: 'Az egyenes minden pontjának második koordinátája 3, ezért egyenlete y = 3 (az y = mx + b alak m = 0 esetben).'
  },
  {
    id: 'le-q4',
    level: 1,
    questionTypeBadge: 'Tengelyek',
    question: 'Mi az y tengely egyenlete?',
    options: ['x = 0', 'y = 0', 'y = x', 'x + y = 0'],
    correctAnswer: 0,
    explanation: 'Az y tengely minden pontjának első koordinátája 0, ezért egyenlete x = 0. Az y = 0 az x tengely egyenlete.'
  },
  {
    id: 'le-q5',
    level: 1,
    questionTypeBadge: 'Origón átmenő egyenes',
    question: 'Melyik egyenes illeszkedik az origóra?',
    options: ['y = −2x', 'y = −2x + 1', 'y = 2', 'x = 3'],
    correctAnswer: 0,
    explanation: 'Az y = mx alakú egyenesekre illeszkedik az origó: x = 0 esetén y = 0. Az y = −2x + 1 a (0; 1), az y = 2 a (0; 2) ponton megy át, az x = 3 nem metszi az y tengelyt.'
  },
  {
    id: 'le-q6',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    figure: (
      <LineEquationPlane
        xMin={-1}
        xMax={6}
        yMin={-5}
        yMax={3}
        unit={20}
        className={FIG}
        lines={[{ m: 1.5, b: -5, color: LE_BLUE, width: 2, label: 'y = 1,5x − 5', labelAt: 1.4, labelDx: 8, labelDy: 8 }]}
        points={[{ x: 4, y: 1, label: 'Q(4; 1)', dx: 6, dy: 4 }]}
      />
    ),
    question: 'Illeszkedik-e a Q(4; 1) pont az y = 1,5x − 5 egyenletű egyenesre?',
    options: ['Igen, mert 1,5 · 4 − 5 = 1', 'Nem, mert 1,5 · 4 − 5 = −1', 'Nem, mert 1,5 · 1 − 5 ≠ 4', 'Csak akkor, ha az egyenes átmegy az origón'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve x = 4-et: 1,5 · 4 − 5 = 6 − 5 = 1, ami éppen Q második koordinátája, tehát Q rajta van az egyenesen.'
  },
  {
    id: 'le-q7',
    level: 1,
    questionTypeBadge: 'Koordináták kapcsolata',
    question: 'Mi azoknak a pontoknak az egyenlete, amelyeknek második koordinátája az első 3-szorosa?',
    options: ['y = 3x', 'x = 3y', 'y = x + 3', 'y = 3'],
    correctAnswer: 0,
    explanation: 'A második koordináta (y) az első (x) háromszorosa: y = 3x. Ez egy origón átmenő egyenes.'
  },
  {
    id: 'le-q8',
    level: 1,
    questionTypeBadge: 'Koordináták kapcsolata',
    question: 'Mi azoknak a pontoknak az egyenlete, amelyeknek második koordinátája 5-tel nagyobb az elsőnél?',
    options: ['y = x + 5', 'y = 5x', 'x = y + 5', 'y = x − 5'],
    correctAnswer: 0,
    explanation: 'y = x + 5. Az x = y + 5 azt jelentené, hogy az első koordináta nagyobb 5-tel.'
  },
  {
    id: 'le-q9',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    figure: (
      <LineEquationPlane
        xMin={-3}
        xMax={4}
        yMin={-5}
        yMax={3}
        unit={20}
        className={FIG}
        lines={[{ m: 2, b: -3, color: LE_BLUE, width: 2, label: 'y = 2x − 3', labelAt: 2.2, labelDx: 6, labelDy: 6 }]}
        points={[{ x: 0, y: -3, label: '?', dx: -8, dy: 4, anchor: 'end' }]}
      />
    ),
    question: 'Melyik pontban metszi az y tengelyt az y = 2x − 3 egyenletű egyenes?',
    options: ['(0; −3)', '(−3; 0)', '(0; 2)', '(1,5; 0)'],
    correctAnswer: 0,
    explanation: 'Az y tengely pontjaira x = 0, így y = 2 · 0 − 3 = −3: a metszéspont (0; −3). Az (1,5; 0) az x tengellyel vett metszéspont.'
  },
  {
    id: 'le-q10',
    level: 1,
    questionTypeBadge: 'Függvény vagy egyenes',
    question: 'Melyik egyenes NEM lineáris függvény grafikonja?',
    options: ['x = 2', 'y = 2', 'y = 2x', 'y = −x + 2'],
    correctAnswer: 0,
    explanation: 'Az x = 2 egyenesen ugyanahhoz az x = 2 értékhez végtelen sok y tartozik, ezért ez nem egyértelmű hozzárendelés, nem függvény grafikonja. A többi y = mx + b alakú.'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'le-q11',
    level: 2,
    questionTypeBadge: 'Létra – magasság',
    figure: <LadderFig foot="A(0,8; 0)" top="B(0; 3)" pointLabel="C" px={0.625} py={0.375} known="x" knownText="0,5" />,
    question: 'A létra egyenese f(x) = −3,75x + 3 (A(0,8; 0), B(0; 3), méterben). Milyen magasan van a faltól 0,5 m-re lévő C létrafok?',
    options: ['1,125 m', '1,875 m', '0,875 m', '2,25 m'],
    correctAnswer: 0,
    explanation: 'f(0,5) = −3,75 · 0,5 + 3 = −1,875 + 3 = 1,125, tehát a C létrafok 1,125 m magasan van.'
  },
  {
    id: 'le-q12',
    level: 2,
    questionTypeBadge: 'Létra – távolság',
    figure: <LadderFig foot="A(0,8; 0)" top="B(0; 3)" pointLabel="D" px={0.1} py={0.9} known="y" knownText="2,7" />,
    question: 'A létra egyenese y = −3,75x + 3. Milyen messze van a faltól a 2,7 m magasan lévő D létrafok?',
    options: ['0,08 m', '0,8 m', '0,72 m', '0,3 m'],
    correctAnswer: 0,
    explanation: '2,7 = −3,75x + 3 ⇒ 3,75x = 0,3 ⇒ x = 0,08. A D létrafok 0,08 m = 8 cm-re van a faltól.'
  },
  {
    id: 'le-q13',
    level: 2,
    questionTypeBadge: 'Két pont → egyenlet',
    figure: (
      <LineEquationPlane
        xMin={-1}
        xMax={5}
        yMin={-1}
        yMax={7}
        unit={17}
        className={FIG}
        tickEvery={2}
        lines={[{ m: 3, b: -6, color: LE_BLUE, width: 2, label: '?', labelAt: 4.1, labelDx: 6, labelDy: 10 }]}
        points={[
          { x: 2, y: 0, label: '(2; 0)', dx: 5, dy: 12 },
          { x: 4, y: 6, label: '(4; 6)', dx: -6, dy: -4, anchor: 'end' }
        ]}
      />
    ),
    question: 'Mi a (2; 0) és a (4; 6) pontra illeszkedő egyenes egyenlete?',
    options: ['y = 3x − 6', 'y = 3x − 2', 'y = (1/3)x − 2/3', 'y = 6x − 12'],
    correctAnswer: 0,
    explanation: 'm = (6 − 0) : (4 − 2) = 3; 0 = 3 · 2 + b ⇒ b = −6. Ellenőrzés: 3 · 4 − 6 = 6. Tehát y = 3x − 6 (a tankönyv A esete).'
  },
  {
    id: 'le-q14',
    level: 2,
    questionTypeBadge: 'Tengelymetszet',
    figure: (
      <LineEquationPlane
        xMin={-2}
        xMax={4}
        yMin={-4}
        yMax={3}
        unit={20}
        className={FIG}
        lines={[{ m: 2, b: -3, color: LE_BLUE, width: 2, label: 'y = 2x − 3', labelAt: 2.4, labelDx: 6, labelDy: 6 }]}
        points={[{ x: 1.5, y: 0, label: '?', dx: 6, dy: 12 }]}
      />
    ),
    question: 'Melyik pontban metszi az x tengelyt az y = 2x − 3 egyenletű egyenes?',
    options: ['(1,5; 0)', '(−1,5; 0)', '(0; −3)', '(3; 0)'],
    correctAnswer: 0,
    explanation: 'Az x tengely pontjaira y = 0: 0 = 2x − 3 ⇒ x = 1,5. A metszéspont (1,5; 0).'
  },
  {
    id: 'le-q15',
    level: 2,
    questionTypeBadge: 'Két pont → egyenlet',
    figure: (
      <LineEquationPlane
        xMin={-4}
        xMax={5}
        yMin={-9}
        yMax={7}
        unit={9}
        className={FIG}
        tickEvery={2}
        lines={[{ m: -2, b: 0, color: LE_BLUE, width: 2, label: '?', labelAt: 2.5, labelDx: 6, labelDy: 0 }]}
        points={[
          { x: 4, y: -8, label: 'P(4; −8)', dx: -6, dy: 2, anchor: 'end' },
          { x: -3, y: 6, label: 'Q(−3; 6)', dx: 6, dy: 2 }
        ]}
      />
    ),
    question: 'Mi a P(4; −8) és a Q(−3; 6) pontra illeszkedő egyenes egyenlete?',
    options: ['y = −2x', 'y = −0,5x − 6', 'y = 2x − 16', 'y = −2x + 2'],
    correctAnswer: 0,
    explanation: 'm = (6 − (−8)) : (−3 − 4) = 14 : (−7) = −2; −8 = −2 · 4 + b ⇒ b = 0. Tehát y = −2x, az egyenes átmegy az origón.'
  },
  {
    id: 'le-q16',
    level: 2,
    questionTypeBadge: 'Két pont → egyenlet',
    figure: (
      <LineEquationPlane
        xMin={-2}
        xMax={5}
        yMin={-3}
        yMax={5}
        unit={18}
        className={FIG}
        points={[
          { x: 3, y: -2, label: 'P(3; −2)', dx: 6, dy: 4 },
          { x: 3, y: 3.7, label: 'Q(3; 3,7)', dx: 6, dy: 4 }
        ]}
        segments={[{ from: [3, -2], to: [3, 3.7], color: LE_BLUE, dashed: true }]}
      />
    ),
    question: 'Mi a P(3; −2) és a Q(3; 3,7) pontra illeszkedő egyenes egyenlete?',
    options: ['x = 3', 'y = 3', 'y = 3x', 'y = 5,7x − 3'],
    correctAnswer: 0,
    explanation: 'A két pont első koordinátája egyenlő (3), ezért az egyenes párhuzamos az y tengellyel: x = 3. Ilyen egyenes nem írható y = mx + b alakban.'
  },
  {
    id: 'le-q17',
    level: 2,
    questionTypeBadge: 'Illeszkedés',
    question: 'Illeszkedik-e a Q(1; 3,7) pont az y = −1,7x − 2 egyenletű egyenesre?',
    options: ['Nem, mert −1,7 · 1 − 2 = −3,7 ≠ 3,7', 'Igen, mert 1,7 + 2 = 3,7', 'Igen, mert a pont az y tengelyen van', 'Nem dönthető el ábra nélkül'],
    correctAnswer: 0,
    explanation: 'x = 1 esetén y = −1,7 − 2 = −3,7, de a pont második koordinátája +3,7, így Q nincs rajta (a Q(1; −3,7) pont lenne rajta).'
  },
  {
    id: 'le-q18',
    level: 2,
    questionTypeBadge: 'Koordináták kapcsolata',
    question: 'Milyen kapcsolat van az y = −x + 3 egyenes pontjainak koordinátái között?',
    options: ['A két koordináta összege 3', 'A második koordináta 3-mal kisebb az elsőnél', 'A két koordináta különbsége 3', 'A második koordináta az első −3-szorosa'],
    correctAnswer: 0,
    explanation: 'y = −x + 3 ⇔ x + y = 3: a két koordináta összege 3.'
  },
  {
    id: 'le-q19',
    level: 2,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont illeszkedik a 3x − y = 8 egyenletű egyenesre?',
    options: ['(4; 4)', '(0; 8)', '(2; 2)', '(3; −1)'],
    correctAnswer: 0,
    explanation: 'Átrendezve y = 3x − 8. (4; 4): 3 · 4 − 8 = 4 ✓. (0; 8): −8 ≠ 8; (2; 2): −2 ≠ 2; (3; −1): 1 ≠ −1.'
  },
  {
    id: 'le-q20',
    level: 2,
    questionTypeBadge: 'Két pont → egyenlet',
    question: 'Mi az A(−5; 15) és a B(2; −6) pontra illeszkedő egyenes egyenlete?',
    options: ['y = −3x', 'y = 3x + 30', 'y = −3x + 15', 'y = −(1/3)x + 40/3'],
    correctAnswer: 0,
    explanation: 'm = (−6 − 15) : (2 − (−5)) = −21 : 7 = −3; 15 = −3 · (−5) + b ⇒ b = 0. Tehát y = −3x.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'le-q21',
    level: 3,
    questionTypeBadge: 'Két pont → egyenlet',
    question: 'Mi az A(4; −7) és a B(−6; 13) pontra illeszkedő egyenes egyenlete?',
    options: ['y = −2x + 1', 'y = 2x − 15', 'y = −0,5x − 5', 'y = −2x − 1'],
    correctAnswer: 0,
    explanation: 'm = (13 − (−7)) : (−6 − 4) = 20 : (−10) = −2; −7 = −2 · 4 + b ⇒ b = 1. Ellenőrzés B-vel: −2 · (−6) + 1 = 13 ✓.'
  },
  {
    id: 'le-q22',
    level: 3,
    questionTypeBadge: 'Két pont → egyenlet',
    question: 'Mi az A(9; 5) és a B(−2; −6) pontra illeszkedő egyenes egyenlete?',
    options: ['y = x − 4', 'y = x + 4', 'y = −x + 14', 'y = x − 5'],
    correctAnswer: 0,
    explanation: 'm = (−6 − 5) : (−2 − 9) = −11 : (−11) = 1; 5 = 9 + b ⇒ b = −4. Tehát y = x − 4.'
  },
  {
    id: 'le-q23',
    level: 3,
    questionTypeBadge: 'Törtes együtthatók',
    question: 'Mi a P(−7; −5) és a Q(2; 0) pontra illeszkedő egyenes egyenlete?',
    options: ['y = (5/9)x − 10/9', 'y = (9/5)x − 18/5', 'y = (5/9)x + 10/9', 'y = (5/9)x − 2'],
    correctAnswer: 0,
    explanation: 'm = (0 − (−5)) : (2 − (−7)) = 5/9; 0 = (5/9) · 2 + b ⇒ b = −10/9. Ellenőrzés P-vel: (5/9) · (−7) − 10/9 = −45/9 = −5 ✓.'
  },
  {
    id: 'le-q24',
    level: 3,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Hol metszi az x tengelyt az y = −6x + 5 egyenletű egyenes?',
    options: ['(5/6; 0)', '(6/5; 0)', '(−5/6; 0)', '(0; 5)'],
    correctAnswer: 0,
    explanation: 'y = 0: 0 = −6x + 5 ⇒ x = 5/6. A (0; 5) az y tengellyel vett metszéspont.'
  },
  {
    id: 'le-q25',
    level: 3,
    questionTypeBadge: 'Egyenlet leolvasása',
    figure: (
      <LineEquationPlane
        xMin={-2}
        xMax={6}
        yMin={-2}
        yMax={4}
        unit={20}
        className={FIG}
        lines={[{ m: -0.5, b: 2, color: LE_BLUE, width: 2, label: '?', labelAt: 5, labelDx: 2, labelDy: -6 }]}
        points={[
          { x: 0, y: 2, color: LE_RED },
          { x: 4, y: 0, color: LE_RED }
        ]}
      />
    ),
    question: 'Az ábrán a két kiemelt pont rácspont. Mi az egyenes egyenlete?',
    options: ['y = −0,5x + 2', 'y = −2x + 2', 'y = 0,5x + 2', 'y = −0,5x + 4'],
    correctAnswer: 0,
    explanation: 'Az egyenes a (0; 2) és a (4; 0) ponton megy át: b = 2 és m = (0 − 2) : (4 − 0) = −0,5. Tehát y = −0,5x + 2.'
  },
  {
    id: 'le-q26',
    level: 3,
    questionTypeBadge: 'Egyenes azonosítása',
    figure: (
      <LineEquationPlane
        xMin={-4}
        xMax={5}
        yMin={-2}
        yMax={6}
        unit={18}
        className={FIG}
        lines={[
          { m: -1, b: 3, color: LE_BLUE, label: 'e', labelAt: 4.2, labelDx: 6, labelDy: 4 },
          { m: 1, b: 3, color: LE_GREEN, label: 'f', labelAt: -3.6, labelDx: 6, labelDy: 10 },
          { m: 0, b: 3, color: LE_PURPLE, label: 'g', labelAt: -3.8, labelDx: 0, labelDy: -5 },
          { x: 3, color: LE_AMBER, label: 'h', labelAt: 5.2, labelDx: 5 }
        ]}
      />
    ),
    question: 'Melyik egyenes egyenlete y = −x + 3 az ábrán?',
    options: ['e', 'f', 'g', 'h'],
    correctAnswer: 0,
    explanation: 'Az y = −x + 3 a (0; 3) és a (3; 0) ponton megy át, és jobbra haladva csökken: ez az e. f: y = x + 3, g: y = 3, h: x = 3.'
  },
  {
    id: 'le-q27',
    level: 3,
    questionTypeBadge: 'Ponthalmaz',
    question: 'Mely egyenesek pontjai vannak mind 4 egység távolságra az y tengelytől?',
    options: ['Az x = 4 és az x = −4 egyenes', 'Az y = 4 és az y = −4 egyenes', 'Csak az x = 4 egyenes', 'Az y = 4x egyenes'],
    correctAnswer: 0,
    explanation: 'Egy pont távolsága az y tengelytől az első koordinátájának abszolút értéke: |x| = 4 ⇒ x = 4 vagy x = −4. Két, az y tengellyel párhuzamos egyenes.'
  },
  {
    id: 'le-q28',
    level: 3,
    questionTypeBadge: 'Létra – modell',
    figure: <LadderFig foot="(1,2; 0)" top="(0; 3,6)" pointLabel="E" px={0.333} py={0.667} known="x" knownText="0,4" />,
    question: 'Egy létra talpa a faltól 1,2 m-re van, teteje 3,6 m magasan támaszkodik. Milyen magasan van a faltól 0,4 m-re lévő E létrafok?',
    options: ['2,4 m', '1,2 m', '3,2 m', '2,6 m'],
    correctAnswer: 0,
    explanation: 'A létra egyenese: m = −3,6 : 1,2 = −3, b = 3,6 ⇒ y = −3x + 3,6. x = 0,4 ⇒ y = −1,2 + 3,6 = 2,4 m.'
  },
  {
    id: 'le-q29',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'Mekkora k értéke, ha a P(k; 7) pont illeszkedik az y = 2x + 3 egyenletű egyenesre?',
    options: ['k = 2', 'k = 17', 'k = 5', 'k = −2'],
    correctAnswer: 0,
    explanation: '7 = 2k + 3 ⇒ 2k = 4 ⇒ k = 2. (A 17 az y érték lenne x = 7 esetén.)'
  },
  {
    id: 'le-q30',
    level: 3,
    questionTypeBadge: 'Illeszkedés',
    question: 'Az A(−1; −1,8) és a B(2; −7,6) pont közül melyik illeszkedik az y = −2,8x + 2 egyenletű egyenesre?',
    options: ['Egyik sem', 'Csak A', 'Csak B', 'Mindkettő'],
    correctAnswer: 0,
    explanation: 'x = −1: −2,8 · (−1) + 2 = 4,8 ≠ −1,8; x = 2: −2,8 · 2 + 2 = −3,6 ≠ −7,6. Egyik pont sincs rajta az egyenesen.'
  }
];

export const LineEquationQuiz: React.FC<{
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
      topicId="g11-geo-egyenes-egyenlete-quiz"
      subtopicId="az-egyenes-egyenlete"
      title="10. Az egyenes egyenlete – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: az egyenes egyenletének alakjai, illeszkedés, tengelymetszetek, két pontra illeszkedő egyenes."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={LINE_EQUATION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az egyenes egyenlete',
          items: [
            'Nem függőleges egyenes: y = mx + b (b: az y tengellyel vett metszéspont második koordinátája).',
            'y = mx: átmegy az origón; y = b: párhuzamos az x tengellyel.',
            'Függőleges egyenes: x = c (nem függvény grafikonja).',
            'x tengely: y = 0; y tengely: x = 0.'
          ]
        },
        {
          title: 'Két pontból egyenlet',
          items: [
            'Ha x₁ = x₂: x = x₁.',
            'Különben m = (y₂ − y₁) / (x₂ − x₁).',
            'b = y₁ − m · x₁ (vagy helyettesíts be y = mx + b-be).',
            'Ellenőrzés: mindkét pont teljesítse az egyenletet!'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Létra: A(0,8; 0), B(0; 3) ⇒ f(x) = −3,75x + 3; C: 1,125 m; D: 0,08 m',
            '(2; 0), (4; 6) ⇒ y = 3x − 6; (4; −8), (−3; 6) ⇒ y = −2x',
            '(5; 13), (−1; 1) ⇒ y = 2x + 3; (−7; −5), (2; 0) ⇒ y = (5/9)x − 10/9',
            'y = 2x − 3 tengelymetszetei: (0; −3), (1,5; 0)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LineEquationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LineEquationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LineEquationQuiz;
