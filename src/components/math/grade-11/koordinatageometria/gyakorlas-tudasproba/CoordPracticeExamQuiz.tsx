import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CoordPracticeExamMatcher } from './CoordPracticeExamMatcher';
import { CoordPracticeExamSorter } from './CoordPracticeExamSorter';
import { MidpointPlane, MidpointPlaneProps, MidpointArrow, CP } from '../felezopont/MidpointFigures';

// ---- Kvízábrák (kis koordináta-rendszerek) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

/** Halvány rács, beosztás nélkül – a keresett értékek így nem olvashatók le. */
const Fig: React.FC<MidpointPlaneProps> = (props) => <MidpointPlane className={FIG} grid={1} labels={-1} {...props} />;

const circ = (center: CP, r: number, unit: number, color = PURPLE) => (px: (p: CP) => { x: number; y: number }) => {
  const c = px(center);
  return <circle cx={c.x} cy={c.y} r={r * unit} fill="rgba(124,58,237,0.05)" stroke={color} strokeWidth={1.8} />;
};

// ---- 1. SZINT: alapfogalmak, egylépéses számolások (1–30) ----
const LEVEL1: QuizQuestion[] = [
  {
    id: 'cpe-q1',
    level: 1,
    questionTypeBadge: 'Vektor fogalma',
    question: 'Mi jellemez egyértelműen egy vektort?',
    options: ['Az iránya és a hossza (abszolút értéke)', 'A kezdőpontja és a hossza', 'Csak a hossza', 'Csak a kezdőpontja'],
    correctAnswer: 0,
    explanation: 'A párhuzamos, azonos irányú és azonos hosszúságú irányított szakaszok ugyanazt a vektort adják, ezért a vektort az iránya és a hossza határozza meg; a kezdőpont tetszőleges.'
  },
  {
    id: 'cpe-q2',
    level: 1,
    questionTypeBadge: 'Vektorok összeadása',
    figure: (
      <svg viewBox="0 0 260 140" className={FIG}>
        <rect x={0} y={0} width={260} height={140} rx={10} fill="#ffffff" />
        <MidpointArrow x1={30} y1={110} x2={140} y2={70} color={BLUE} />
        <MidpointArrow x1={140} y1={70} x2={220} y2={25} color={GREEN} />
        <line x1={30} y1={110} x2={220} y2={25} stroke="#94a3b8" strokeDasharray="5 4" strokeWidth={1.5} />
        <text x={80} y={82} fontSize={13} fontWeight="bold" fill={BLUE}>→a</text>
        <text x={185} y={60} fontSize={13} fontWeight="bold" fill={GREEN}>→b</text>
        <text x={110} y={45} fontSize={13} fontWeight="bold" fill="#64748b">?</text>
        <text x={18} y={126} fontSize={11} fill="#0f172a">P</text>
        <text x={224} y={22} fontSize={11} fill="#0f172a">Q</text>
      </svg>
    ),
    question: 'Az ábrán az →a végpontjából indul a →b vektor. Melyik vektor az →a + →b?',
    options: [
      'Az →a kezdőpontjából (P) a →b végpontjába (Q) mutató vektor',
      'A →b végpontjából (Q) az →a kezdőpontjába (P) mutató vektor',
      'Az →a végpontjából a →b végpontjába mutató vektor',
      'Az →a kezdőpontjából a →b kezdőpontjába mutató vektor'
    ],
    correctAnswer: 0,
    explanation: 'Összefűzés módszere: az összegvektor az első vektor kezdőpontjából az utolsó vektor végpontjába mutat, tehát →a + →b = →PQ. A fordított irányú →QP az összeg ellentettje.'
  },
  {
    id: 'cpe-q3',
    level: 1,
    questionTypeBadge: 'Összeg koordinátái',
    question: 'Mi az →a(3; −2) és a →b(−1; 5) vektor összege?',
    options: ['(2; 3)', '(4; −7)', '(−3; −10)', '(2; 7)'],
    correctAnswer: 0,
    explanation: 'Koordinátánként adunk össze: (3 + (−1); −2 + 5) = (2; 3). A (4; −7) a különbség, a (−3; −10) a koordinátánkénti szorzat.'
  },
  {
    id: 'cpe-q4',
    level: 1,
    questionTypeBadge: 'Különbség koordinátái',
    question: 'Mi az →a(3; −2) − →b(−1; 5) különbségvektor?',
    options: ['(4; −7)', '(2; 3)', '(−4; 7)', '(4; 3)'],
    correctAnswer: 0,
    explanation: '(3 − (−1); −2 − 5) = (4; −7). A (−4; 7) a →b − →a.'
  },
  {
    id: 'cpe-q5',
    level: 1,
    questionTypeBadge: 'Számszoros',
    question: 'Mi a 3 · (2; −5) vektor?',
    options: ['(6; −15)', '(5; −2)', '(6; −5)', '(−6; 15)'],
    correctAnswer: 0,
    explanation: 'Mindkét koordinátát 3-mal szorozzuk: (3 · 2; 3 · (−5)) = (6; −15).'
  },
  {
    id: 'cpe-q6',
    level: 1,
    questionTypeBadge: 'AB vektor',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[-2, 5]}
        unit={26}
        vecs={[{ from: [2, -1], to: [5, 3], color: BLUE, label: 'AB', lx: -14, ly: -2 }]}
        points={[
          { at: [2, -1], label: 'A(2; −1)', dx: 0, dy: 15, color: BLUE },
          { at: [5, 3], label: 'B(5; 3)', dx: 8, dy: -8, color: BLUE }
        ]}
      />
    ),
    question: 'A(2; −1), B(5; 3). Mik az →AB vektor koordinátái?',
    options: ['(3; 4)', '(−3; −4)', '(7; 2)', '(3; 2)'],
    correctAnswer: 0,
    explanation: 'Végpont mínusz kezdőpont: (5 − 2; 3 − (−1)) = (3; 4). A (−3; −4) a →BA, a (7; 2) a helyvektorok összege.'
  },
  {
    id: 'cpe-q7',
    level: 1,
    questionTypeBadge: 'Vektor hossza',
    question: 'Milyen hosszú a →v(3; 4) vektor?',
    options: ['5', '7', '25', '√7'],
    correctAnswer: 0,
    explanation: '|→v| = √(3² + 4²) = √25 = 5. A 25 a hossz négyzete, a 7 a koordináták összege.'
  },
  {
    id: 'cpe-q8',
    level: 1,
    questionTypeBadge: 'Elforgatás',
    figure: (
      <Fig
        x={[-5, 3]}
        y={[-1, 5]}
        unit={28}
        vecs={[
          { from: [0, 0], to: [1, 4], color: BLUE, label: 'v', lx: 12, ly: 2 },
          { from: [0, 0], to: [-4, 1], color: RED, label: '?', lx: 0, ly: -6 }
        ]}
        rightAngles={[{ at: [0, 0], p: [1, 4], q: [-4, 1], r: 12, color: RED }]}
        texts={[{ at: [-1.2, 3.4], text: '+90°', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'Mi a →v(1; 4) vektor +90°-os elforgatottja?',
    options: ['(−4; 1)', '(4; −1)', '(−1; −4)', '(4; 1)'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) +90°-os elforgatottja (−v₂; v₁) = (−4; 1). A (4; −1) a −90°-os elforgatott, a (−1; −4) az ellentett vektor.'
  },
  {
    id: 'cpe-q9',
    level: 1,
    questionTypeBadge: 'Távolság',
    figure: (
      <Fig
        x={[-1, 9]}
        y={[-1, 11]}
        unit={18}
        segs={[
          { from: [1, 2], to: [7, 10], color: BLUE, width: 2.4 },
          { from: [1, 2], to: [7, 2], color: '#94a3b8', dashed: true, width: 1.2 },
          { from: [7, 2], to: [7, 10], color: '#94a3b8', dashed: true, width: 1.2 }
        ]}
        rightAngles={[{ at: [7, 2], p: [1, 2], q: [7, 10], r: 10, color: '#94a3b8' }]}
        points={[
          { at: [1, 2], label: 'A(1; 2)', dx: -4, dy: 15, color: BLUE },
          { at: [7, 10], label: 'B(7; 10)', dx: -26, dy: 0, color: BLUE }
        ]}
      />
    ),
    question: 'Mekkora az A(1; 2) és a B(7; 10) pont távolsága?',
    options: ['10', '14', '√28', '100'],
    correctAnswer: 0,
    explanation: 'AB = √(6² + 8²) = √100 = 10. A 14 a koordinátakülönbségek összege – a Pitagorasz-tétel kell.'
  },
  {
    id: 'cpe-q10',
    level: 1,
    questionTypeBadge: 'Felezőpont',
    figure: (
      <Fig
        x={[-4, 8]}
        y={[-2, 6]}
        unit={22}
        segs={[{ from: [-3, 5], to: [7, -1], color: BLUE, width: 2.2 }]}
        points={[
          { at: [-3, 5], label: 'A(−3; 5)', dx: 24, dy: -4, color: BLUE },
          { at: [7, -1], label: 'B(7; −1)', dx: -4, dy: 15, color: BLUE },
          { at: [2, 2], label: 'F = ?', dx: 6, dy: -8, color: RED }
        ]}
      />
    ),
    question: 'Hol van az A(−3; 5), B(7; −1) szakasz felezőpontja?',
    options: ['(2; 2)', '(5; −3)', '(4; 4)', '(10; −6)'],
    correctAnswer: 0,
    explanation: 'F((−3 + 7)/2; (5 + (−1))/2) = F(2; 2). Az (5; −3) az ½ →AB vektor, a (10; −6) az →AB.'
  },
  {
    id: 'cpe-q11',
    level: 1,
    questionTypeBadge: 'Súlypont',
    figure: (
      <Fig
        x={[0, 8]}
        y={[0, 10]}
        unit={20}
        polys={[{ pts: [[1, 1], [7, 2], [4, 9]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        points={[
          { at: [1, 1], label: 'A(1; 1)', dx: 6, dy: 15, color: BLUE },
          { at: [7, 2], label: 'B(7; 2)', dx: -4, dy: 15, color: BLUE },
          { at: [4, 9], label: 'C(4; 9)', dx: 26, dy: 2, color: BLUE }
        ]}
        texts={[{ at: [4, 4.6], text: 'S = ?', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'Hol van az A(1; 1), B(7; 2), C(4; 9) háromszög súlypontja?',
    options: ['(4; 4)', '(6; 6)', '(12; 12)', '(5,5; 5,5)'],
    correctAnswer: 0,
    explanation: 'S((1 + 7 + 4)/3; (1 + 2 + 9)/3) = S(4; 4). A (12; 12) a koordináták összege harmadolás nélkül, az (5,5; 5,5) a BC felezőpontja.'
  },
  {
    id: 'cpe-q12',
    level: 1,
    questionTypeBadge: 'Helyvektor',
    question: 'Mik az A(3; −2) pont helyvektorának koordinátái?',
    options: ['(3; −2)', '(−3; 2)', '(−2; 3)', '(0; 0)'],
    correctAnswer: 0,
    explanation: 'A helyvektor az origóból az A pontba mutat, így koordinátái megegyeznek a pont koordinátáival: (3; −2).'
  },
  {
    id: 'cpe-q13',
    level: 1,
    questionTypeBadge: 'Egyenes egyenlete',
    figure: (
      <Fig x={[-8, 4]} y={[-2, 4]} unit={22} lines={[{ p: [0, 2], d: [1, 0], color: PURPLE, label: 'y = 2', labelAt: 0.9, lx: -30, ly: -6 }]} />
    ),
    question: 'Melyik pont van rajta az y = 2 egyenletű egyenesen?',
    options: ['(−7; 2)', '(2; −7)', '(2; 0)', '(0; −2)'],
    correctAnswer: 0,
    explanation: 'Az y = 2 egyenes minden pontjának második koordinátája 2 (az x tetszőleges), ilyen a (−7; 2).'
  },
  {
    id: 'cpe-q14',
    level: 1,
    questionTypeBadge: 'Egyenes egyenlete',
    question: 'Melyik állítás igaz az x = −3 egyenletű egyenesre?',
    options: [
      'Párhuzamos az y tengellyel, és a (−3; 0) pontban metszi az x tengelyt',
      'Párhuzamos az x tengellyel, és a (0; −3) pontban metszi az y tengelyt',
      'Átmegy az origón, meredeksége −3',
      'Meredeksége −3, tengelymetszete 0'
    ],
    correctAnswer: 0,
    explanation: 'Az x = −3 egyenes pontjainak első koordinátája −3: ez az y tengellyel párhuzamos, (−3; 0)-n átmenő egyenes. Meredeksége nincs (irányszöge 90°).'
  },
  {
    id: 'cpe-q15',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont illeszkedik az y = 1,5x − 5 egyenesre?',
    options: ['(2; −2)', '(2; 2)', '(0; 5)', '(−2; −1)'],
    correctAnswer: 0,
    explanation: 'x = 2 esetén y = 1,5 · 2 − 5 = −2, tehát a (2; −2) rajta van. A (0; 5) helyett (0; −5) lenne a tengelymetszet.'
  },
  {
    id: 'cpe-q16',
    level: 1,
    questionTypeBadge: 'Két ponton át',
    figure: (
      <Fig
        x={[-2, 5]}
        y={[-1, 9]}
        unit={20}
        lines={[{ p: [0, 3], d: [1, 2], color: PURPLE, label: '?', labelAt: 0.9, lx: 6, ly: 4 }]}
        points={[
          { at: [0, 3], label: 'P(0; 3)', dx: -24, dy: 2, color: BLUE },
          { at: [2, 7], label: 'Q(2; 7)', dx: 24, dy: 4, color: BLUE }
        ]}
      />
    ),
    question: 'Mi a P(0; 3) és Q(2; 7) pontokon átmenő egyenes egyenlete?',
    options: ['y = 2x + 3', 'y = 3x + 2', 'y = 0,5x + 3', 'y = 2x + 7'],
    correctAnswer: 0,
    explanation: 'm = (7 − 3)/(2 − 0) = 2, a tengelymetszet a P második koordinátája: b = 3, így y = 2x + 3.'
  },
  {
    id: 'cpe-q17',
    level: 1,
    questionTypeBadge: 'Meredekség',
    question: 'Mennyi az y = −3x + 4 egyenes meredeksége (iránytangense)?',
    options: ['−3', '4', '3', '−1/3'],
    correctAnswer: 0,
    explanation: 'Az y = mx + b alakban m a meredekség: m = −3. A 4 a tengelymetszet.'
  },
  {
    id: 'cpe-q18',
    level: 1,
    questionTypeBadge: 'Irányszög',
    question: 'Mekkora az y = x egyenes irányszöge?',
    options: ['45°', '90°', '0°', '−45°'],
    correctAnswer: 0,
    explanation: 'm = 1 = tg α ⇒ α = 45°. A −45° az y = −x egyenes irányszöge.'
  },
  {
    id: 'cpe-q19',
    level: 1,
    questionTypeBadge: 'Párhuzamosság',
    question: 'Melyik egyenes párhuzamos az y = 2x + 1 egyenessel?',
    options: ['y = 2x − 7', 'y = −2x + 1', 'y = 0,5x + 1', 'y = −0,5x + 1'],
    correctAnswer: 0,
    explanation: 'Párhuzamos egyenesek meredeksége egyenlő: m = 2. Az y = −0,5x + 1 merőleges rá.'
  },
  {
    id: 'cpe-q20',
    level: 1,
    questionTypeBadge: 'Merőlegesség',
    figure: (
      <Fig
        x={[-4, 5]}
        y={[-2, 6]}
        unit={22}
        lines={[
          { p: [0, 1], d: [1, 2], color: BLUE, label: 'y = 2x + 1', labelAt: 0.9, lx: -64, ly: 0 },
          { p: [0, 3], d: [2, -1], color: RED, label: '?', labelAt: 0.92, lx: -4, ly: -6 }
        ]}
        rightAngles={[{ at: [0.8, 2.6], p: [1.8, 4.6], q: [2.8, 1.6], r: 12, color: RED }]}
      />
    ),
    question: 'Melyik egyenes merőleges az y = 2x + 1 egyenesre?',
    options: ['y = −0,5x + 3', 'y = 2x + 3', 'y = 0,5x + 3', 'y = −2x + 3'],
    correctAnswer: 0,
    explanation: 'Merőlegesség: m₁ · m₂ = −1 ⇒ m₂ = −1/2. Az y = −2x + 3 esetén a szorzat −4.'
  },
  {
    id: 'cpe-q21',
    level: 1,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig
        x={[-2, 8]}
        y={[-7, 3]}
        unit={22}
        grid={0}
        segs={[{ from: [3, -2], to: [7, -2], color: RED, width: 1.6 }]}
        points={[{ at: [3, -2], label: 'K(3; −2)', dx: -6, dy: -8, color: PURPLE }]}
        texts={[{ at: [5, -2.5], text: 'r = 4', color: RED, size: 10, bold: true }]}
      >
        {circ([3, -2], 4, 22)}
      </Fig>
    ),
    question: 'Mi a K(3; −2) középpontú, 4 egység sugarú kör egyenlete?',
    options: ['(x − 3)² + (y + 2)² = 16', '(x − 3)² + (y + 2)² = 4', '(x + 3)² + (y − 2)² = 16', '(x − 3)² + (y + 2)² = 8'],
    correctAnswer: 0,
    explanation: '(x − u)² + (y − v)² = r² ⇒ (x − 3)² + (y − (−2))² = 4² = 16.'
  },
  {
    id: 'cpe-q22',
    level: 1,
    questionTypeBadge: 'Kör adatai',
    question: 'Mi az (x + 1)² + (y − 5)² = 9 egyenletű kör középpontja és sugara?',
    options: ['K(−1; 5), r = 3', 'K(1; −5), r = 3', 'K(−1; 5), r = 9', 'K(1; 5), r = 3'],
    correctAnswer: 0,
    explanation: 'x + 1 = x − (−1) és y − 5 ⇒ K(−1; 5); r² = 9 ⇒ r = 3.'
  },
  {
    id: 'cpe-q23',
    level: 1,
    questionTypeBadge: 'Pont és kör',
    figure: (
      <Fig x={[-6, 6]} y={[-6, 6]} unit={20}>
        {circ([0, 0], 5, 20)}
      </Fig>
    ),
    question: 'Melyik pont van rajta az x² + y² = 25 egyenletű körön?',
    options: ['(3; −4)', '(5; 5)', '(2; 3)', '(4; 4)'],
    correctAnswer: 0,
    explanation: '3² + (−4)² = 9 + 16 = 25 ✓. Az (5; 5): 50 > 25 (kívül), a (2; 3): 13 < 25 (belül), a (4; 4): 32 > 25 (kívül).'
  },
  {
    id: 'cpe-q24',
    level: 1,
    questionTypeBadge: 'Metszéspont',
    figure: (
      <Fig
        x={[-2, 6]}
        y={[-1, 6]}
        unit={24}
        lines={[
          { p: [0, 1], d: [1, 1], color: BLUE, label: 'y = x + 1', labelAt: 0.88, lx: -60, ly: 0 },
          { p: [0, 5], d: [1, -1], color: RED, label: 'y = −x + 5', labelAt: 0.85, lx: -6, ly: -8 }
        ]}
        points={[{ at: [2, 3], label: '?', dx: 0, dy: -9, color: PURPLE }]}
      />
    ),
    question: 'Hol metszi egymást az y = x + 1 és az y = −x + 5 egyenes?',
    options: ['(2; 3)', '(3; 2)', '(−2; −1)', '(1; 2)'],
    correctAnswer: 0,
    explanation: 'x + 1 = −x + 5 ⇒ 2x = 4 ⇒ x = 2, y = 3. Az (1; 2) csak az első egyenesen van rajta.'
  },
  {
    id: 'cpe-q25',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Hol metszi a 4x + 3y = −11 egyenes az y tengelyt?',
    options: ['(0; −11/3)', '(−11/4; 0)', '(0; −11)', '(0; 11/3)'],
    correctAnswer: 0,
    explanation: 'Az y tengelyen x = 0: 3y = −11 ⇒ y = −11/3. A (−11/4; 0) az x tengellyel vett metszéspont.'
  },
  {
    id: 'cpe-q26',
    level: 1,
    questionTypeBadge: 'Merőlegesség',
    question: 'Mikor merőleges egymásra két, az y tengellyel nem párhuzamos egyenes?',
    options: ['Ha meredekségük szorzata −1', 'Ha meredekségük egyenlő', 'Ha meredekségük összege 0', 'Ha meredekségük szorzata 1'],
    correctAnswer: 0,
    explanation: 'e ⊥ f ⇔ m₁ · m₂ = −1. Egyenlő meredekség a párhuzamosság feltétele.'
  },
  {
    id: 'cpe-q27',
    level: 1,
    questionTypeBadge: 'Érettségi 2011',
    figure: (
      <Fig
        x={[-5, 5]}
        y={[-1, 7]}
        unit={24}
        lines={[
          { p: [-1.5, 3.5], d: [2, 5], color: BLUE, label: 'e', labelAt: 0.9, lx: 8, ly: 4 },
          { p: [-1.5, 3.5], d: [5, -2], color: RED, label: 'f', labelAt: 0.9, lx: -4, ly: -8 }
        ]}
        points={[{ at: [-1.5, 3.5], label: 'P = ?', dx: -22, dy: -6, color: PURPLE }]}
      />
    ),
    question: 'Hol metszi egymást az e: 5x − 2y = −14,5 és az f: 2x + 5y = 14,5 egyenes?',
    options: ['P(−1,5; 3,5)', 'P(1,5; −3,5)', 'P(3,5; −1,5)', 'P(−3,5; 1,5)'],
    correctAnswer: 0,
    explanation: 'Az első egyenletet 5-tel, a másodikat 2-vel szorozva és összeadva: 29x = −43,5 ⇒ x = −1,5; ekkor 2y = 5 · (−1,5) + 14,5 = 7 ⇒ y = 3,5.'
  },
  {
    id: 'cpe-q28',
    level: 1,
    questionTypeBadge: 'Paraméter',
    question: 'A g: c · x + 4y = 5 egyenesre illeszkedik az A(3; −2) pont. Mennyi c?',
    options: ['13/3', '1', '−1', '3'],
    correctAnswer: 0,
    explanation: '3c + 4 · (−2) = 5 ⇒ 3c = 13 ⇒ c = 13/3.'
  },
  {
    id: 'cpe-q29',
    level: 1,
    questionTypeBadge: 'Pont és kör',
    question: 'Rajta van-e az A(1; −3) pont az (x − 6)² + (y − 9)² = 169 egyenletű körön?',
    options: ['Igen, mert (−5)² + (−12)² = 25 + 144 = 169', 'Nem, mert (−5)² + (−12)² = 119', 'Nem, mert 1 + 9 ≠ 169', 'Igen, mert 7² + 6² = 169'],
    correctAnswer: 0,
    explanation: '(1 − 6)² + (−3 − 9)² = 25 + 144 = 169, tehát A a körön van.'
  },
  {
    id: 'cpe-q30',
    level: 1,
    questionTypeBadge: 'Felbontás',
    question: 'Az →a és a →b nem párhuzamos vektorok. Melyik állítás igaz a sík tetszőleges →v vektorára?',
    options: [
      'Egyértelműen felírható →v = m→a + n→b alakban',
      'Csak akkor írható fel m→a + n→b alakban, ha |→v| < |→a| + |→b|',
      'Pontosan kétféleképpen írható fel m→a + n→b alakban',
      'Csak akkor írható fel, ha →v párhuzamos →a-val'
    ],
    correctAnswer: 0,
    explanation: 'Két nem párhuzamos vektor irányával párhuzamos összetevőkre minden vektor egyértelműen felbontható: →v = m→a + n→b (m, n valós számok).'
  }
];

// ---- 2. SZINT: kétlépéses feladatok (31–60) ----
const LEVEL2: QuizQuestion[] = [
  {
    id: 'cpe-q31',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <svg viewBox="0 0 260 140" className={FIG}>
        <rect x={0} y={0} width={260} height={140} rx={10} fill="#ffffff" />
        <polygon points="30,115 170,115 230,30 90,30" fill="rgba(37,99,235,0.06)" stroke="#94a3b8" />
        <MidpointArrow x1={30} y1={115} x2={170} y2={115} color={BLUE} />
        <MidpointArrow x1={30} y1={115} x2={90} y2={30} color={GREEN} />
        <line x1={30} y1={115} x2={230} y2={30} stroke={PURPLE} strokeDasharray="5 4" strokeWidth={1.6} />
        <text x={18} y={128} fontSize={12} fontWeight="bold">A</text>
        <text x={172} y={130} fontSize={12} fontWeight="bold">B</text>
        <text x={234} y={30} fontSize={12} fontWeight="bold">C</text>
        <text x={80} y={24} fontSize={12} fontWeight="bold">D</text>
      </svg>
    ),
    question: 'Az ABCD paralelogrammában mivel egyenlő az →AB + →AD összeg?',
    options: ['→AC', '→BD', '→DB', '→CA'],
    correctAnswer: 0,
    explanation: 'Paralelogramma-módszer: a közös kezdőpontú →AB és →AD összege a paralelogramma A-ból induló átlóvektora, →AC.'
  },
  {
    id: 'cpe-q32',
    level: 2,
    questionTypeBadge: 'Vektorok kivonása',
    figure: (
      <svg viewBox="0 0 260 140" className={FIG}>
        <rect x={0} y={0} width={260} height={140} rx={10} fill="#ffffff" />
        <MidpointArrow x1={40} y1={115} x2={210} y2={95} color={BLUE} />
        <MidpointArrow x1={40} y1={115} x2={140} y2={25} color={GREEN} />
        <line x1={140} y1={25} x2={210} y2={95} stroke="#94a3b8" strokeDasharray="5 4" strokeWidth={1.5} />
        <text x={130} y={124} fontSize={13} fontWeight="bold" fill={BLUE}>→a</text>
        <text x={68} y={62} fontSize={13} fontWeight="bold" fill={GREEN}>→b</text>
        <text x={182} y={52} fontSize={13} fontWeight="bold" fill="#64748b">?</text>
      </svg>
    ),
    question: 'Az →a és a →b vektort közös kezdőpontból mértük fel. Hogyan kapjuk az →a − →b különbségvektort?',
    options: [
      'A →b végpontjából az →a végpontjába mutató vektor',
      'Az →a végpontjából a →b végpontjába mutató vektor',
      'A közös kezdőpontból az →a végpontjába mutató vektor',
      'A paralelogramma közös kezdőpontból induló átlója'
    ],
    correctAnswer: 0,
    explanation: 'A kivonandó (→b) végpontjából a kisebbítendő (→a) végpontjába mutató vektor az →a − →b, mert →b + (→a − →b) = →a. A fordított irányú vektor a →b − →a.'
  },
  {
    id: 'cpe-q33',
    level: 2,
    questionTypeBadge: 'Vektorok összefűzése',
    question: 'Mivel egyenlő egy ABC háromszögben az →AB + →BC + →CA összeg?',
    options: ['→0 (nullvektor)', '→AC', '2→AB', '→CA'],
    correctAnswer: 0,
    explanation: 'Összefűzve az A pontból indulunk, és az A pontba érkezünk vissza, ezért az összeg a nullvektor.'
  },
  {
    id: 'cpe-q34',
    level: 2,
    questionTypeBadge: 'Vektorok kivonása',
    question: 'Mivel egyenlő az →AB − →AC különbség?',
    options: ['→CB', '→BC', '→AC', '→0'],
    correctAnswer: 0,
    explanation: 'Közös kezdőpontú vektorok különbsége a kivonandó végpontjából (C) a kisebbítendő végpontjába (B) mutat: →CB.'
  },
  {
    id: 'cpe-q35',
    level: 2,
    questionTypeBadge: 'Számszoros',
    question: 'Az →a vektor hossza 4. Milyen hosszú a −3→a vektor?',
    options: ['12', '−12', '7', '4/3'],
    correctAnswer: 0,
    explanation: '|λ→a| = |λ| · |→a| = 3 · 4 = 12. A hossz nem lehet negatív; a −3 csak az irányt fordítja meg.'
  },
  {
    id: 'cpe-q36',
    level: 2,
    questionTypeBadge: 'Felbontás',
    figure: (
      <Fig
        x={[-1, 8]}
        y={[-4, 5]}
        unit={22}
        vecs={[
          { from: [0, 0], to: [1, 1], color: BLUE, label: 'a', lx: -10, ly: -2 },
          { from: [0, 0], to: [1, -1], color: GREEN, label: 'b', lx: -8, ly: 14 },
          { from: [0, 0], to: [7, 1], color: RED, label: 'v', lx: 10, ly: -4 }
        ]}
        segs={[
          { from: [0, 0], to: [4, 4], color: '#94a3b8', dashed: true, width: 1.2 },
          { from: [4, 4], to: [7, 1], color: '#94a3b8', dashed: true, width: 1.2 }
        ]}
      />
    ),
    question: 'Bontsd fel a →v(7; 1) vektort az →a(1; 1) és a →b(1; −1) vektorral párhuzamos összetevőkre: →v = m→a + n→b. Mennyi m és n?',
    options: ['m = 4, n = 3', 'm = 3, n = 4', 'm = 7, n = 1', 'm = 1, n = 7'],
    correctAnswer: 0,
    explanation: 'm + n = 7 és m − n = 1 ⇒ m = 4, n = 3. Ellenőrzés: 4 · (1; 1) + 3 · (1; −1) = (7; 1) ✓. Az m = 3, n = 4 a (7; −1)-et adná.'
  },
  {
    id: 'cpe-q37',
    level: 2,
    questionTypeBadge: 'Bázisvektorok',
    question: 'Mik a →v = 3→i − 2→j vektor koordinátái (→i és →j a bázisvektorok)?',
    options: ['(3; −2)', '(−2; 3)', '(3; 2)', '(1; 0)'],
    correctAnswer: 0,
    explanation: 'A bázisvektorok együtthatói a vektor koordinátái: →v(3; −2).'
  },
  {
    id: 'cpe-q38',
    level: 2,
    questionTypeBadge: 'Párhuzamos vektorok',
    question: 'Melyik λ számra igaz, hogy λ · (2; −3) = (−5; 7,5)?',
    options: ['λ = −2,5', 'λ = 2,5', 'λ = −0,4', 'λ = 0,4'],
    correctAnswer: 0,
    explanation: '2λ = −5 ⇒ λ = −2,5; ellenőrzés: −3 · (−2,5) = 7,5 ✓. A két vektor párhuzamos, ellentétes irányú.'
  },
  {
    id: 'cpe-q39',
    level: 2,
    questionTypeBadge: 'Vektorműveletek',
    question: '→a(1; 4), →b(−3; 6). Mi a 2→a − 3→b vektor?',
    options: ['(11; −10)', '(−7; 26)', '(11; 26)', '(−11; 10)'],
    correctAnswer: 0,
    explanation: '2→a = (2; 8), 3→b = (−9; 18), különbségük (2 + 9; 8 − 18) = (11; −10). A (−7; 26) a 2→a + 3→b.'
  },
  {
    id: 'cpe-q40',
    level: 2,
    questionTypeBadge: 'Tudáspróba I.',
    question: '→a(1; 4), →c(½; 3/2). Mik az →a + 4→c vektor koordinátái?',
    options: ['(3; 10)', '(6; 22)', '(4,5; 17,5)', '(1,5; 5,5)'],
    correctAnswer: 0,
    explanation: '4→c = (2; 6), így →a + 4→c = (1 + 2; 4 + 6) = (3; 10). A (6; 22) a 4(→a + →c), a (4,5; 17,5) a 4→a + →c.'
  },
  {
    id: 'cpe-q41',
    level: 2,
    questionTypeBadge: 'Elforgatás',
    question: '→b(−3; 6). Mik az ½→b vektor 90°-os elforgatottjainak koordinátái?',
    options: ['(−3; −1,5) és (3; 1,5)', '(3; −1,5) és (−3; 1,5)', '(−6; −3) és (6; 3)', '(1,5; −3) és (−1,5; 3)'],
    correctAnswer: 0,
    explanation: '½→b = (−1,5; 3). +90°: (−3; −1,5), −90°: (3; 1,5). A (−6; −3) és (6; 3) a →b elforgatottjai (felezés nélkül), az (1,5; −3) az ellentett.'
  },
  {
    id: 'cpe-q42',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[-1, 9]}
        unit={18}
        polys={[{ pts: [[0, 0], [6, 0], [0, 8]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        rightAngles={[{ at: [0, 0], p: [6, 0], q: [0, 8], r: 12, color: BLUE }]}
        points={[
          { at: [0, 0], label: 'A(0; 0)', dx: 18, dy: 14, color: BLUE },
          { at: [6, 0], label: 'B(6; 0)', dx: 0, dy: 14, color: BLUE },
          { at: [0, 8], label: 'C(0; 8)', dx: 22, dy: 2, color: BLUE }
        ]}
      />
    ),
    question: 'Mekkora az A(0; 0), B(6; 0), C(0; 8) háromszög kerülete?',
    options: ['24', '14', '48', '20'],
    correctAnswer: 0,
    explanation: 'AB = 6, AC = 8, BC = √(36 + 64) = 10, így K = 6 + 8 + 10 = 24. A 48 a terület kétszerese, a 14 a két befogó összege.'
  },
  {
    id: 'cpe-q43',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: (
      <Fig
        x={[0, 8]}
        y={[0, 7]}
        unit={22}
        polys={[{ pts: [[1, 1], [7, 1], [4, 6]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        points={[
          { at: [1, 1], label: 'A(1; 1)', dx: 4, dy: 15, color: BLUE },
          { at: [7, 1], label: 'B(7; 1)', dx: -4, dy: 15, color: BLUE },
          { at: [4, 6], label: 'C(4; 6)', dx: 24, dy: 2, color: BLUE }
        ]}
      />
    ),
    question: 'Mekkora az A(1; 1), B(7; 1), C(4; 6) háromszög területe?',
    options: ['15', '30', '18', '12,5'],
    correctAnswer: 0,
    explanation: 'Az AB oldal vízszintes, hossza 6; a C-hez tartozó magasság 6 − 1 = 5. T = 6 · 5 / 2 = 15. A 30-nál elmaradt a felezés.'
  },
  {
    id: 'cpe-q44',
    level: 2,
    questionTypeBadge: 'Felezőpont visszafelé',
    figure: (
      <Fig
        x={[-3, 6]}
        y={[0, 7]}
        unit={24}
        segs={[{ from: [-2, 5], to: [4, 1], color: BLUE, width: 2 }]}
        points={[
          { at: [-2, 5], label: 'A(−2; 5)', dx: 6, dy: -8, color: BLUE },
          { at: [1, 3], label: 'F(1; 3)', dx: 8, dy: -8, color: RED },
          { at: [4, 1], label: 'B = ?', dx: -6, dy: 15, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Az AB szakasz felezőpontja F(1; 3), az egyik végpont A(−2; 5). Mik a B végpont koordinátái?',
    options: ['B(4; 1)', 'B(−0,5; 4)', 'B(3; −2)', 'B(−5; 7)'],
    correctAnswer: 0,
    explanation: 'B = 2F − A = (2 + 2; 6 − 5) = (4; 1). A (3; −2) az →AF vektor, a (−5; 7) = 2A − F az F tükörképe A-ra.'
  },
  {
    id: 'cpe-q45',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <Fig
        x={[-2, 7]}
        y={[-1, 6]}
        unit={24}
        polys={[{ pts: [[-1, 0], [4, 1], [6, 5], [1, 4]], fill: 'rgba(37,99,235,0.06)', stroke: '#94a3b8', dashed: true }]}
        points={[
          { at: [-1, 0], label: 'A(−1; 0)', dx: 6, dy: 15, color: BLUE },
          { at: [4, 1], label: 'B(4; 1)', dx: 10, dy: 14, color: BLUE },
          { at: [6, 5], label: 'C(6; 5)', dx: -4, dy: -8, color: BLUE },
          { at: [1, 4], label: 'D = ?', dx: -6, dy: -8, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'Az ABCD paralelogramma három csúcsa A(−1; 0), B(4; 1), C(6; 5). Hol van a D csúcs?',
    options: ['D(1; 4)', 'D(11; 6)', 'D(−3; −4)', 'D(2,5; 2,5)'],
    correctAnswer: 0,
    explanation: 'Az átlók felezik egymást, így A + C = B + D ⇒ D = A + C − B = (−1 + 6 − 4; 0 + 5 − 1) = (1; 4). A (2,5; 2,5) a középpont.'
  },
  {
    id: 'cpe-q46',
    level: 2,
    questionTypeBadge: 'Két ponton át',
    question: 'Mi a P(4; −8) és Q(−3; 6) pontokon átmenő egyenes egyenlete?',
    options: ['y = −2x', 'y = −2x − 16', 'y = 2x − 16', 'y = −0,5x − 6'],
    correctAnswer: 0,
    explanation: 'm = (6 − (−8))/(−3 − 4) = 14/(−7) = −2. P-n át: y + 8 = −2(x − 4) ⇒ y = −2x. Ellenőrzés Q-val: −2 · (−3) = 6 ✓.'
  },
  {
    id: 'cpe-q47',
    level: 2,
    questionTypeBadge: 'Meredekség',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[-4, 2]}
        unit={26}
        lines={[{ p: [0, 0], d: [5, -2], color: PURPLE, label: 'e', labelAt: 0.92, lx: -6, ly: -8, width: 1.4 }]}
        vecs={[{ from: [0, 0], to: [5, -2], color: RED, label: 'v', lx: 6, ly: 16 }]}
        texts={[{ at: [3.5, 0.8], text: '→v(5; −2)', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'Az e egyenes párhuzamos a →v(5; −2) vektorral. Mennyi a meredeksége?',
    options: ['−2/5', '−5/2', '2/5', '5/2'],
    correctAnswer: 0,
    explanation: 'm = v₂/v₁ = −2/5 (5 egységet jobbra lépve 2-t lefelé megyünk). A −5/2 a fordított tört.'
  },
  {
    id: 'cpe-q48',
    level: 2,
    questionTypeBadge: 'Irányszög',
    question: 'Mekkora az y = 0,8x + 1 egyenes irányszöge?',
    options: ['≈ 38,7°', '≈ 51,3°', '≈ 53,1°', '≈ 0,8°'],
    correctAnswer: 0,
    explanation: 'tg α = 0,8 ⇒ α ≈ 38,7°. Az 51,3° a pótszöge (az y tengellyel bezárt szög), az 53,1° a tg α = 4/3-hoz tartozna.'
  },
  {
    id: 'cpe-q49',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Melyik az a P(5; 2) ponton átmenő egyenes, amely párhuzamos az y = −3 egyenessel?',
    options: ['y = 2', 'x = 5', 'y = −3x + 17', 'y = −3'],
    correctAnswer: 0,
    explanation: 'Az y = −3 egyenes párhuzamos az x tengellyel, így a vele párhuzamos egyenes is y = állandó alakú; P miatt y = 2. Az x = 5 merőleges rá.'
  },
  {
    id: 'cpe-q50',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenes',
    question: 'Írd fel a P(−7; 4) ponton átmenő, az f: y = 5x − 9 egyenessel párhuzamos egyenes egyenletét!',
    options: ['y = 5x + 39', 'y = 5x − 39', 'y = −0,2x + 2,6', 'y = 5x + 4'],
    correctAnswer: 0,
    explanation: 'm = 5, és 4 = 5 · (−7) + b ⇒ b = 39: y = 5x + 39. Az y = −0,2x + 2,6 a P-n átmenő, f-re merőleges egyenes.'
  },
  {
    id: 'cpe-q51',
    level: 2,
    questionTypeBadge: 'Paraméter',
    question: 'A g: k · x + 2y = 1 egyenesre illeszkedik az A(5; −2) pont. Mennyi k?',
    options: ['k = 1', 'k = −1', 'k = 3/5', 'k = −3/5'],
    correctAnswer: 0,
    explanation: '5k + 2 · (−2) = 1 ⇒ 5k = 5 ⇒ k = 1.'
  },
  {
    id: 'cpe-q52',
    level: 2,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig
        x={[-8, 4]}
        y={[-7, 5]}
        unit={20}
        grid={0}
        segs={[{ from: [-5, 3], to: [1, -5], color: RED, width: 2 }]}
        points={[
          { at: [-5, 3], label: 'A(−5; 3)', dx: -4, dy: -8, color: RED },
          { at: [1, -5], label: 'B(1; −5)', dx: 8, dy: 15, color: RED }
        ]}
      >
        {circ([-2, -1], 5, 20)}
      </Fig>
    ),
    question: 'Mi az AB átmérőjű kör egyenlete, ha A(−5; 3) és B(1; −5)?',
    options: ['(x + 2)² + (y + 1)² = 25', '(x + 2)² + (y + 1)² = 100', '(x − 2)² + (y − 1)² = 25', '(x + 3)² + (y − 4)² = 25'],
    correctAnswer: 0,
    explanation: 'K = AB felezőpontja = (−2; −1), r = AB/2 = √(36 + 64)/2 = 5. A 100 = AB² az átmérő négyzete.'
  },
  {
    id: 'cpe-q53',
    level: 2,
    questionTypeBadge: 'Érintő kör',
    figure: (
      <Fig x={[-2, 4]} y={[-5, 1]} unit={34} grid={0} points={[{ at: [1, -3], label: 'A(1; −3)', dx: 0, dy: -8, color: PURPLE }]}>
        {circ([1, -3], 1, 34)}
      </Fig>
    ),
    question: 'Mi annak az A(1; −3) középpontú körnek az egyenlete, amely érinti az y tengelyt?',
    options: ['(x − 1)² + (y + 3)² = 1', '(x − 1)² + (y + 3)² = 9', '(x + 1)² + (y − 3)² = 1', '(x − 1)² + (y + 3)² = 10'],
    correctAnswer: 0,
    explanation: 'Az y tengelyt érintő kör sugara a középpont első koordinátájának abszolút értéke: r = 1. A 9 az x tengelyt érintő körhöz tartozna, a 10 = OA².'
  },
  {
    id: 'cpe-q54',
    level: 2,
    questionTypeBadge: 'Érettségi 2010',
    figure: (
      <Fig
        x={[-1, 9]}
        y={[-2, 9]}
        unit={20}
        grid={0}
        lines={[{ p: [0, 0], d: [1, 1], color: GREEN, label: 'y = x', labelAt: 0.92, lx: -40, ly: 0 }]}
        points={[
          { at: [1, 0], label: '(1; 0)', dx: -8, dy: 14, color: RED },
          { at: [7, 0], label: '(7; 0)', dx: 8, dy: 14, color: RED }
        ]}
        texts={[{ at: [5.6, 6.8], text: 'K = ?', color: PURPLE, size: 10, bold: true }]}
      />
    ),
    question: 'Egy kör az (1; 0) és a (7; 0) pontban metszi az x tengelyt, középpontja az y = x egyenesen van. Hol a középpont?',
    options: ['K(4; 4)', 'K(4; 0)', 'K(3,5; 3,5)', 'K(4; −4)'],
    correctAnswer: 0,
    explanation: 'A középpont egyenlő távol van a két metszésponttól, így az x = 4 egyenesen van; y = x miatt K(4; 4). A (4; −4) is egyenlő távol van, de nincs az y = x egyenesen.'
  },
  {
    id: 'cpe-q55',
    level: 2,
    questionTypeBadge: 'Pont és kör',
    figure: (
      <Fig x={[-8, 5]} y={[-7, 7]} unit={18} grid={0} points={[{ at: [-2, 1], label: 'K', dx: -8, dy: -4, color: PURPLE }, { at: [3, 3], label: 'P(3; 3)', dx: -8, dy: -8, color: RED }]}>
        {circ([-2, 1], 5, 18)}
      </Fig>
    ),
    question: 'Hol van a P(3; 3) pont az (x + 2)² + (y − 1)² = 25 egyenletű körhöz képest?',
    options: ['A körön kívül', 'A körön', 'A kör belsejében', 'A kör középpontjában'],
    correctAnswer: 0,
    explanation: '(3 + 2)² + (3 − 1)² = 25 + 4 = 29 > 25, ezért KP > r: P a körön kívül van.'
  },
  {
    id: 'cpe-q56',
    level: 2,
    questionTypeBadge: 'Érintők száma',
    question: 'Hány érintő húzható egy körhöz egy, a körön kívül lévő pontból?',
    options: ['2', '1', '0', 'végtelen sok'],
    correctAnswer: 0,
    explanation: 'Külső pontból 2 érintő húzható, a körön lévő pontban 1 érintő van, belső pontból egy sem.'
  },
  {
    id: 'cpe-q57',
    level: 2,
    questionTypeBadge: 'Kör és egyenes',
    figure: (
      <Fig
        x={[-2, 6]}
        y={[-3, 5]}
        unit={24}
        grid={0}
        lines={[{ p: [3.5, 0], d: [0, 1], color: RED, label: 'x = 3,5', labelAt: 0.95, lx: 4, ly: 8 }]}
        points={[{ at: [2, 1], label: 'K(2; 1)', dx: -14, dy: -6, color: PURPLE }]}
      >
        {circ([2, 1], Math.sqrt(8.5), 24)}
      </Fig>
    ),
    question: 'Melyek az (x − 2)² + (y − 1)² = 8,5 egyenletű kör azon pontjai, amelyek első koordinátája 3,5?',
    options: ['(3,5; 3,5) és (3,5; −1,5)', '(3,5; 2,5) és (3,5; −0,5)', 'Csak a (3,5; 1)', 'Nincs ilyen pont'],
    correctAnswer: 0,
    explanation: '(1,5)² + (y − 1)² = 8,5 ⇒ (y − 1)² = 6,25 ⇒ y − 1 = ±2,5 ⇒ y = 3,5 vagy y = −1,5.'
  },
  {
    id: 'cpe-q58',
    level: 2,
    questionTypeBadge: 'Merőleges egyenes',
    question: 'Az e egyenes átmegy az origón, és párhuzamos a →v(5; −2) vektorral. Mi az origón átmenő, e-re merőleges g egyenes egyenlete?',
    options: ['y = 2,5x', 'y = −0,4x', 'y = 0,4x', 'y = −2,5x'],
    correctAnswer: 0,
    explanation: 'm(e) = −2/5 = −0,4, a merőleges meredekség −1 : (−0,4) = 2,5, így g: y = 2,5x. Az y = −0,4x maga az e.'
  },
  {
    id: 'cpe-q59',
    level: 2,
    questionTypeBadge: 'Paraméter',
    question: 'Az e: 6x − 15y = 2 egyenesre merőleges a 9x + py = 5 egyenes. Mennyi p?',
    options: ['p = 3,6', 'p = −22,5', 'p = −3,6', 'p = 22,5'],
    correctAnswer: 0,
    explanation: 'm(e) = 6/15 = 0,4, a másik meredeksége −9/p. 0,4 · (−9/p) = −1 ⇒ p = 3,6. A p = −22,5 a párhuzamossághoz tartozik.'
  },
  {
    id: 'cpe-q60',
    level: 2,
    questionTypeBadge: 'Érettségi 2011',
    question: 'Mekkora szöget zár be az e: 5x − 2y = −14,5 egyenes az x tengellyel?',
    options: ['≈ 68,2°', '≈ 21,8°', '≈ 111,8°', '≈ 2,5°'],
    correctAnswer: 0,
    explanation: 'y = 2,5x + 7,25, így tg α = 2,5 ⇒ α ≈ 68,2°. A 21,8° az y tengellyel bezárt szög.'
  }
];

const T12: CP[] = [
  [-2, -1],
  [9, -3],
  [-3, 6]
];
const T12_POINTS = [
  { at: T12[0], label: 'A(−2; −1)', dx: -26, dy: 6, color: BLUE },
  { at: T12[1], label: 'B(9; −3)', dx: 0, dy: 15, color: BLUE },
  { at: T12[2], label: 'C(−3; 6)', dx: 30, dy: -2, color: BLUE }
];

// ---- 3. SZINT: érettségi típusú, többlépéses feladatok (61–90) ----
const LEVEL3: QuizQuestion[] = [
  {
    id: 'cpe-q61',
    level: 3,
    questionTypeBadge: 'Érettségi 2012',
    figure: (
      <Fig x={[-5, 11]} y={[-5, 8]} unit={17} polys={[{ pts: T12, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]} points={T12_POINTS} />
    ),
    question: 'A(−2; −1), B(9; −3), C(−3; 6). Mi a BC oldal egyenesének egyenlete?',
    options: ['3x + 4y = 15', '4x − 3y = 45', '3x − 4y = 39', 'x + y = 6'],
    correctAnswer: 0,
    explanation: '→BC = (−12; 9), m = 9/(−12) = −3/4. B-n át: y + 3 = −(3/4)(x − 9) ⇒ 4y + 12 = −3x + 27 ⇒ 3x + 4y = 15. Ellenőrzés C-vel: −9 + 24 = 15 ✓.'
  },
  {
    id: 'cpe-q62',
    level: 3,
    questionTypeBadge: 'Középvonal',
    figure: (
      <Fig
        x={[-5, 11]}
        y={[-5, 8]}
        unit={17}
        grid={0}
        polys={[{ pts: T12, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        segs={[{ from: [3.5, -2], to: [-2.5, 2.5], color: RED, width: 2.2, dashed: true }]}
        points={T12_POINTS}
        texts={[{ at: [2.4, 1.2], text: 'középvonal = ?', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'A(−2; −1), B(9; −3), C(−3; 6). Milyen hosszú a BC oldallal párhuzamos középvonal?',
    options: ['7,5', '15', '5', '3,75'],
    correctAnswer: 0,
    explanation: 'BC = √(12² + 9²) = 15, a vele párhuzamos középvonal fele ilyen hosszú: 7,5.'
  },
  {
    id: 'cpe-q63',
    level: 3,
    questionTypeBadge: 'Szög a háromszögben',
    figure: (
      <Fig x={[-5, 11]} y={[-5, 8]} unit={17} polys={[{ pts: T12, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]} points={T12_POINTS} texts={[{ at: [-2.2, 4.2], text: 'γ = ?', color: AMBER, size: 10, bold: true, anchor: 'start' }]} />
    ),
    question: 'A(−2; −1), B(9; −3), C(−3; 6). Mekkora a háromszög C csúcsnál lévő belső szöge?',
    options: ['45°', '135°', '60°', '30°'],
    correctAnswer: 0,
    explanation: 'CA = √50, CB = 15, AB = √125. cos γ = (50 + 225 − 125)/(2 · √50 · 15) = 150/(150√2) = 1/√2 ⇒ γ = 45°.'
  },
  {
    id: 'cpe-q64',
    level: 3,
    questionTypeBadge: 'Érettségi 2015',
    figure: (
      <svg viewBox="0 0 260 150" className={FIG}>
        <rect x={0} y={0} width={260} height={150} rx={10} fill="#ffffff" />
        <MidpointArrow x1={100} y1={125} x2={200} y2={125} color={BLUE} />
        <MidpointArrow x1={100} y1={125} x2={50} y2={38} color={GREEN} />
        <path d="M 118 125 A 18 18 0 0 0 91 109.4" fill="none" stroke={AMBER} strokeWidth={1.5} />
        <text x={112} y={104} fontSize={10} fill={AMBER} fontWeight="bold">120°</text>
        <text x={150} y={142} fontSize={11} fill={BLUE} textAnchor="middle">5</text>
        <text x={64} y={88} fontSize={11} fill={GREEN}>5</text>
        <text x={92} y={142} fontSize={12} fontWeight="bold">A</text>
        <text x={204} y={130} fontSize={12} fontWeight="bold">B</text>
        <text x={40} y={34} fontSize={12} fontWeight="bold">C</text>
      </svg>
    ),
    question: 'Az →AB és →AC vektor 120°-os szöget zár be, mindkettő 5 egység hosszú. Milyen hosszú az →AB + →AC vektor?',
    options: ['5', '10', '5√3 ≈ 8,66', '0'],
    correctAnswer: 0,
    explanation: 'Az összeg a 120°-os szögű rombusz rövidebb átlója; ez a rombusz két oldalával egy 60°-os szögű, egyenlő szárú, tehát szabályos háromszöget alkot, így hossza 5.'
  },
  {
    id: 'cpe-q65',
    level: 3,
    questionTypeBadge: 'Érettségi 2015',
    figure: (
      <svg viewBox="0 0 260 150" className={FIG}>
        <rect x={0} y={0} width={260} height={150} rx={10} fill="#ffffff" />
        <MidpointArrow x1={100} y1={125} x2={200} y2={125} color={BLUE} />
        <MidpointArrow x1={100} y1={125} x2={50} y2={38} color={GREEN} />
        <MidpointArrow x1={50} y1={38} x2={200} y2={125} color={RED} dashed />
        <path d="M 118 125 A 18 18 0 0 0 91 109.4" fill="none" stroke={AMBER} strokeWidth={1.5} />
        <text x={112} y={104} fontSize={10} fill={AMBER} fontWeight="bold">120°</text>
        <text x={150} y={142} fontSize={11} fill={BLUE} textAnchor="middle">5</text>
        <text x={64} y={88} fontSize={11} fill={GREEN}>5</text>
        <text x={150} y={70} fontSize={12} fill={RED} fontWeight="bold">?</text>
        <text x={92} y={142} fontSize={12} fontWeight="bold">A</text>
        <text x={204} y={130} fontSize={12} fontWeight="bold">B</text>
        <text x={40} y={34} fontSize={12} fontWeight="bold">C</text>
      </svg>
    ),
    question: 'Az →AB és →AC vektor 120°-os szöget zár be, mindkettő 5 egység hosszú. Milyen hosszú az →AB − →AC vektor?',
    options: ['5√3 ≈ 8,66', '5', '10', '5√2 ≈ 7,07'],
    correctAnswer: 0,
    explanation: '→AB − →AC = →CB. Koszinusztétellel: CB² = 25 + 25 − 2 · 25 · cos 120° = 75 ⇒ CB = 5√3 ≈ 8,66.'
  },
  {
    id: 'cpe-q66',
    level: 3,
    questionTypeBadge: 'Rombusz',
    figure: (
      <Fig
        x={[-1, 9]}
        y={[-8, 3]}
        unit={20}
        grid={0}
        segs={[{ from: [4, -3], to: [7, 1], color: RED, width: 2 }]}
        points={[
          { at: [4, -3], label: 'K(4; −3)', dx: -24, dy: 4, color: PURPLE },
          { at: [7, 1], label: 'T(7; 1)', dx: 8, dy: -8, color: BLUE },
          { at: [1, -7], label: 'R = ?', dx: -4, dy: 15, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'A PRST rombusz középpontja K(4; −3), egyik csúcsa T(7; 1). Hol van a T-vel szemközti R csúcs?',
    options: ['R(1; −7)', 'R(10; 5)', 'R(5,5; −1)', 'R(3; 4)'],
    correctAnswer: 0,
    explanation: 'K az RT átló felezőpontja: R = 2K − T = (8 − 7; −6 − 1) = (1; −7). A (10; 5) = 2T − K, az (5,5; −1) a KT felezőpontja, a (3; 4) a →KT vektor.'
  },
  {
    id: 'cpe-q67',
    level: 3,
    questionTypeBadge: 'Rombusz',
    figure: (
      <Fig
        x={[-5, 13]}
        y={[-10, 4]}
        unit={15}
        grid={0}
        segs={[{ from: [1, -7], to: [7, 1], color: RED, dashed: true, width: 1.6 }]}
        points={[
          { at: [4, -3], label: 'K(4; −3)', dx: 26, dy: 4, color: PURPLE },
          { at: [7, 1], label: 'T(7; 1)', dx: 8, dy: -8, color: BLUE },
          { at: [1, -7], label: 'R(1; −7)', dx: -4, dy: 15, color: BLUE }
        ]}
        texts={[{ at: [-2, 1.5], text: 'P = ?', color: RED, size: 10, bold: true }, { at: [11, -7.5], text: 'S = ?', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'A PRST rombusz középpontja K(4; −3), T(7; 1), R(1; −7), és RT átló fele olyan hosszú, mint a PS átló. Melyik a P és az S csúcs?',
    options: ['(−4; 3) és (12; −9)', '(−2; 5) és (10; −11)', '(0; 0) és (8; −6)', '(1; −7) és (7; 1)'],
    correctAnswer: 0,
    explanation: '→KT = (3; 4), KT = 5, így KP = 10, és KP ⊥ KT: →KP = ±2 · (−4; 3) = ±(−8; 6). P, S = K ± (−8; 6) = (−4; 3) és (12; −9). A (−2; 5)-höz tartozó (−6; 8) nem merőleges →KT-re, a (0; 0)-nál KP csak 5.'
  },
  {
    id: 'cpe-q68',
    level: 3,
    questionTypeBadge: 'Érettségi 2007',
    question: 'Az e: 4x + 3y = −11 egyenes Q pontjának ordinátája 107. Mennyi a Q abszcisszája?',
    options: ['−83', '83', '77,5', '−29,5'],
    correctAnswer: 0,
    explanation: '4x + 3 · 107 = −11 ⇒ 4x = −11 − 321 = −332 ⇒ x = −83.'
  },
  {
    id: 'cpe-q69',
    level: 3,
    questionTypeBadge: 'Érettségi 2007',
    question: 'Rajta van-e a P(100; −36) pont az e: 4x + 3y = −11 egyenesen?',
    options: ['Nem, mert 4 · 100 + 3 · (−36) = 292 ≠ −11', 'Igen, mert 4 · 100 − 3 · 36 = −11', 'Nem, mert 4 · 100 + 3 · (−36) = 508', 'Igen, mert P koordinátáinak aránya −4/3'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve 400 − 108 = 292, ami nem egyenlő −11-gyel, így P nincs az egyenesen.'
  },
  {
    id: 'cpe-q70',
    level: 3,
    questionTypeBadge: 'Érettségi 2007',
    question: 'A(−5; 3), B(1; −5). Rajta van-e az S(1; 3) pont az AB átmérőjű körön?',
    options: ['Igen: K(−2; −1), r = 5, és KS² = 9 + 16 = 25', 'Nem: K(−2; −1), r = 5, de KS² = 9 + 4 = 13', 'Nem: K(−3; 4), r = 10, KS = 4', 'Igen: K(−2; −1), r = 10, és KS = 10'],
    correctAnswer: 0,
    explanation: 'K = (−2; −1), r = AB/2 = 10/2 = 5. KS² = (1 + 2)² + (3 + 1)² = 9 + 16 = 25 = r², tehát S a körön van (és ∢ASB = 90°, Thalész).'
  },
  {
    id: 'cpe-q71',
    level: 3,
    questionTypeBadge: 'Tudáspróba I.',
    question: 'e: 5x − 2y = −7, g: c · x + 4y = 5. Milyen c esetén merőleges g az e-re?',
    options: ['c = 1,6', 'c = −10', 'c = 10', 'c = −1,6'],
    correctAnswer: 0,
    explanation: 'm(e) = 5/2, m(g) = −c/4. (5/2) · (−c/4) = −1 ⇒ c = 8/5 = 1,6. A c = −10 a párhuzamos esethez tartozik.'
  },
  {
    id: 'cpe-q72',
    level: 3,
    questionTypeBadge: 'Tudáspróba I.',
    figure: (
      <Fig
        x={[-1, 8]}
        y={[-2, 20]}
        unit={11}
        grid={0}
        lines={[
          { p: [0, 3.5], d: [2, 5], color: BLUE, label: 'e', labelAt: 0.9, lx: -14, ly: 0 },
          { p: [0, -9], d: [1, 5], color: RED, label: 'f', labelAt: 0.92, lx: 6, ly: 6 }
        ]}
        texts={[{ at: [6.4, 15.5], text: '?', color: PURPLE, size: 12, bold: true }]}
      />
    ),
    question: 'Hol metszi egymást az e: 5x − 2y = −7 és az f: y = 5x − 9 egyenes?',
    options: ['(5; 16)', '(16; 5)', '(1; 6)', '(−5; −34)'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: 5x − 2(5x − 9) = −7 ⇒ −5x + 18 = −7 ⇒ x = 5, y = 16. Az (1; 6) csak az e-n van rajta.'
  },
  {
    id: 'cpe-q73',
    level: 3,
    questionTypeBadge: 'Rombusz',
    figure: (
      <Fig
        x={[-7, 17]}
        y={[-11, 9]}
        unit={11}
        grid={0}
        segs={[{ from: [1, 4], to: [9, -6], color: RED, width: 1.6, dashed: true }]}
        lines={[{ p: [1, 4], d: [6, 13], color: BLUE, label: 'AB', labelAt: 0.12, lx: 8, ly: 4 }]}
        points={[
          { at: [1, 4], label: 'A(1; 4)', dx: 24, dy: 0, color: BLUE },
          { at: [9, -6], label: 'C(9; −6)', dx: 8, dy: 15, color: BLUE },
          { at: [5, -1], label: '', color: RED, r: 2.6 }
        ]}
      />
    ),
    question: 'Az ABCD rombusz két szemközti csúcsa A(1; 4) és C(9; −6). Mi a BD átló egyenesének egyenlete?',
    options: ['4x − 5y = 25', '5x + 4y = 21', '4x − 5y = −16', '13x − 6y = 71'],
    correctAnswer: 0,
    explanation: 'A rombusz átlói merőlegesen felezik egymást, így BD az AC felezőmerőlegese. AC felezőpontja (5; −1), m(AC) = −10/8 = −5/4, a merőleges meredekség 4/5: y + 1 = (4/5)(x − 5) ⇒ 4x − 5y = 25.'
  },
  {
    id: 'cpe-q74',
    level: 3,
    questionTypeBadge: 'Rombusz',
    figure: (
      <Fig
        x={[-7, 17]}
        y={[-11, 9]}
        unit={11}
        grid={0}
        segs={[{ from: [1, 4], to: [9, -6], color: '#94a3b8', width: 1.4, dashed: true }]}
        lines={[
          { p: [1, 4], d: [6, 13], color: BLUE, label: 'AB', labelAt: 0.12, lx: 8, ly: 4 },
          { p: [5, -1], d: [5, 4], color: RED, label: 'BD', labelAt: 0.92, lx: -22, ly: -4, dashed: true }
        ]}
        points={[
          { at: [1, 4], label: 'A', dx: 10, dy: -4, color: BLUE },
          { at: [9, -6], label: 'C', dx: 10, dy: 10, color: BLUE }
        ]}
      />
    ),
    question: 'Az ABCD rombuszban A(1; 4), C(9; −6), az AB egyenes 13x − 6y = −11, a BD egyenes 4x − 5y = 25. Hol van a B és a D csúcs?',
    options: ['B(−5; −9), D(15; 7)', 'B(5; −1), D(5; −1)', 'B(−5; 9), D(15; −7)', 'B(−9; −5), D(7; 15)'],
    correctAnswer: 0,
    explanation: 'B az AB és BD metszéspontja: 13x − 6y = −11 és 4x − 5y = 25 ⇒ x = −5, y = −9. D = 2K − B, ahol K(5; −1): D = (10 + 5; −2 + 9) = (15; 7).'
  },
  {
    id: 'cpe-q75',
    level: 3,
    questionTypeBadge: 'Rombusz',
    question: 'Milyen hosszúak az A(1; 4), B(−5; −9), C(9; −6), D(15; 7) rombusz oldalai?',
    options: ['√205 ≈ 14,32', '√164 ≈ 12,81', '205', '√205/2 ≈ 7,16'],
    correctAnswer: 0,
    explanation: '→AB = (−6; −13), AB = √(36 + 169) = √205 ≈ 14,32. A √164 az AC átló hossza.'
  },
  {
    id: 'cpe-q76',
    level: 3,
    questionTypeBadge: 'Tudáspróba II.',
    figure: (
      <Fig
        x={[-6, 8]}
        y={[5, 25]}
        unit={11}
        grid={0}
        lines={[{ p: [-3, 7], d: [2, 3], color: BLUE, label: 'AB', labelAt: 0.15, lx: 8, ly: 4 }]}
        segs={[{ from: [-3, 7], to: [-1, 23], color: '#0f172a', width: 1.6 }]}
        points={[
          { at: [-3, 7], label: 'A(−3; 7)', dx: 26, dy: 4, color: BLUE },
          { at: [-1, 23], label: 'C(−1; 23)', dx: 30, dy: -2, color: BLUE }
        ]}
        texts={[{ at: [4, 22], text: 'BC = ?', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'Az ABC derékszögű háromszög AB oldalegyenese 3x − 2y = −23, az átfogó végpontjai A(−3; 7) és C(−1; 23). Mi a BC oldalegyenes egyenlete?',
    options: ['2x + 3y = 67', '3x − 2y = −49', '2x + 3y = 15', '3x + 2y = 43'],
    correctAnswer: 0,
    explanation: 'AC az átfogó, így a derékszög B-nél van: BC ⊥ AB. m(AB) = 3/2 ⇒ m(BC) = −2/3, C-n át: y − 23 = −(2/3)(x + 1) ⇒ 2x + 3y = 67. A 3x − 2y = −49 a C-n átmenő, AB-vel párhuzamos egyenes.'
  },
  {
    id: 'cpe-q77',
    level: 3,
    questionTypeBadge: 'Tudáspróba II.',
    figure: (
      <Fig
        x={[-6, 9]}
        y={[5, 25]}
        unit={11}
        grid={0}
        lines={[
          { p: [-3, 7], d: [2, 3], color: BLUE, label: 'AB', labelAt: 0.15, lx: 8, ly: 4 },
          { p: [-1, 23], d: [3, -2], color: RED, label: 'BC', labelAt: 0.9, lx: -10, ly: -8 }
        ]}
        texts={[{ at: [6.6, 19.6], text: 'B = ?', color: PURPLE, size: 10, bold: true }]}
      />
    ),
    question: 'AB: 3x − 2y = −23, BC: 2x + 3y = 67. Hol van a B csúcs?',
    options: ['B(5; 19)', 'B(−2; 15)', 'B(19; 5)', 'B(−5; 4)'],
    correctAnswer: 0,
    explanation: 'Az első egyenletet 3-mal, a másodikat 2-vel szorozva és összeadva: 13x = 65 ⇒ x = 5, y = 19. A (−5; 4) csak az AB-n van rajta, a (−2; 15) az AC felezőpontja.'
  },
  {
    id: 'cpe-q78',
    level: 3,
    questionTypeBadge: 'Körülírt kör',
    figure: (
      <Fig
        x={[-11, 7]}
        y={[6, 24]}
        unit={13}
        grid={0}
        polys={[{ pts: [[-3, 7], [5, 19], [-1, 23]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        rightAngles={[{ at: [5, 19], p: [-3, 7], q: [-1, 23], r: 12, color: BLUE }]}
        points={[
          { at: [-3, 7], label: 'A', dx: -8, dy: 12, color: BLUE },
          { at: [5, 19], label: 'B', dx: 10, dy: 4, color: BLUE },
          { at: [-1, 23], label: 'C', dx: -8, dy: -4, color: BLUE }
        ]}
      />
    ),
    question: 'Az A(−3; 7), B(5; 19), C(−1; 23) háromszög derékszöge B-nél van. Mi a körülírt kör egyenlete?',
    options: ['(x + 2)² + (y − 15)² = 65', '(x + 2)² + (y − 15)² = 260', '(x − 2)² + (y + 15)² = 65', '(x + 1)² + (y − 23)² = 65'],
    correctAnswer: 0,
    explanation: 'Thalész: a középpont az AC átfogó felezőpontja, K(−2; 15); r² = (−3 + 2)² + (7 − 15)² = 1 + 64 = 65. A 260 = AC² az átmérő négyzete.'
  },
  {
    id: 'cpe-q79',
    level: 3,
    questionTypeBadge: 'Körülírt kör',
    question: 'Az A(−5; 2), B(3; 1), C(1; −2) háromszögben AC² + BC² = AB². Mi a körülírt kör egyenlete?',
    options: ['(x + 1)² + (y − 1,5)² = 16,25', '(x + 1)² + (y − 1,5)² = 65', '(x − 1)² + (y + 1,5)² = 16,25', '(x − 1)² + (y + 2)² = 16,25'],
    correctAnswer: 0,
    explanation: 'A derékszög C-nél van, az átfogó AB. K = AB felezőpontja = (−1; 1,5), r² = AB²/4 = 65/4 = 16,25.'
  },
  {
    id: 'cpe-q80',
    level: 3,
    questionTypeBadge: 'Érintő',
    figure: (
      <Fig
        x={[-6, 7]}
        y={[-6, 7]}
        unit={18}
        grid={0}
        segs={[{ from: [0, 0], to: [3, 4], color: PURPLE, width: 1.6 }]}
        lines={[{ p: [3, 4], d: [4, -3], color: RED, label: '?', labelAt: 0.12, lx: 8, ly: 4 }]}
        rightAngles={[{ at: [3, 4], p: [0, 0], q: [7, 1], r: 11, color: RED }]}
        points={[{ at: [3, 4], label: 'P(3; 4)', dx: -22, dy: -4, color: RED }]}
      >
        {circ([0, 0], 5, 18)}
      </Fig>
    ),
    question: 'Mi az x² + y² = 25 kör P(3; 4) pontbeli érintőjének egyenlete?',
    options: ['3x + 4y = 25', '4x − 3y = 0', '3x + 4y = 5', '4x + 3y = 24'],
    correctAnswer: 0,
    explanation: 'Az érintő merőleges az OP sugárra: m(OP) = 4/3 ⇒ m = −3/4. y − 4 = −(3/4)(x − 3) ⇒ 4y − 16 = −3x + 9 ⇒ 3x + 4y = 25. A 4x − 3y = 0 maga az OP egyenes, a 4x + 3y = 24 átmegy P-n, de nem merőleges a sugárra.'
  },
  {
    id: 'cpe-q81',
    level: 3,
    questionTypeBadge: 'Kör és egyenes',
    figure: (
      <Fig x={[-6, 6]} y={[-6, 6]} unit={20} grid={0} lines={[{ p: [0, 1], d: [1, 1], color: RED, label: 'y = x + 1', labelAt: 0.9, lx: -66, ly: 0 }]}>
        {circ([0, 0], 5, 20)}
      </Fig>
    ),
    question: 'Melyek az x² + y² = 25 kör és az y = x + 1 egyenes közös pontjai?',
    options: ['(3; 4) és (−4; −3)', '(4; 3) és (−3; −4)', 'Csak a (3; 4)', 'Nincs közös pontjuk'],
    correctAnswer: 0,
    explanation: 'x² + (x + 1)² = 25 ⇒ 2x² + 2x − 24 = 0 ⇒ x² + x − 12 = 0 ⇒ x = 3 vagy x = −4; y = x + 1 ⇒ (3; 4) és (−4; −3). A (4; 3) nincs rajta az egyenesen.'
  },
  {
    id: 'cpe-q82',
    level: 3,
    questionTypeBadge: 'Thalész-kör',
    figure: (
      <Fig
        x={[-2, 5]}
        y={[-2, 5]}
        unit={30}
        segs={[{ from: [-1, 0], to: [4, 3], color: BLUE, width: 2.2 }]}
        points={[
          { at: [-1, 0], label: 'A(−1; 0)', dx: 6, dy: 15, color: BLUE },
          { at: [4, 3], label: 'B(4; 3)', dx: -4, dy: -8, color: BLUE }
        ]}
      />
    ),
    question: 'A(−1; 0), B(4; 3). A koordinátatengelyek mely (A-tól különböző) pontjaiból látható derékszögben az AB szakasz?',
    options: ['(4; 0), (0; 4) és (0; −1)', 'Csak (4; 0) és (0; 4)', 'Csak (0; 4) és (0; −1)', '(1,5; 0) és (0; 1,5)'],
    correctAnswer: 0,
    explanation: 'A pontok az AB átmérőjű Thalész-körön vannak: (x − 1,5)² + (y − 1,5)² = 8,5. y = 0 ⇒ x = 4 (vagy −1, ez A); x = 0 ⇒ (y − 1,5)² = 6,25 ⇒ y = 4 vagy y = −1.'
  },
  {
    id: 'cpe-q83',
    level: 3,
    questionTypeBadge: 'Kör alkalmazása',
    figure: (
      <Fig x={[-19, 13]} y={[-14, 18]} unit={8} grid={0} points={[{ at: [-3, 2], label: 'P(−3; 2)', dx: 0, dy: -8, color: PURPLE }, { at: [11, 7], label: 'D(11; 7)', dx: -14, dy: -8, color: RED }]}>
        {circ([-3, 2], 15, 8)}
      </Fig>
    ),
    question: 'Egy rádióadó a P(−3; 2) pontban van, az adás hatósugara 15 egység. Fogható-e az adás a D(11; 7) pontban?',
    options: ['Igen, mert PD² = 196 + 25 = 221 < 225', 'Nem, mert PD² = 221 > 15', 'Nem, mert PD = 14 + 5 = 19 > 15', 'Igen, mert PD = 15'],
    correctAnswer: 0,
    explanation: 'PD² = (11 + 3)² + (7 − 2)² = 196 + 25 = 221 < 15² = 225, tehát PD ≈ 14,87 < 15: D a körön belül van, az adás fogható.'
  },
  {
    id: 'cpe-q84',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'A(0; 0), B(6; 0), C(0; 6). Melyik P pontban a legkisebb a PA² + PB² + PC² összeg, és mennyi ez a minimum?',
    options: ['P(2; 2), a minimum 48', 'P(3; 3), a minimum 54', 'P(2; 2), a minimum 24', 'P(0; 0), a minimum 72'],
    correctAnswer: 0,
    explanation: 'A minimumot a súlypontban, S((0 + 6 + 0)/3; (0 + 0 + 6)/3) = S(2; 2)-ben veszi fel. Értéke (4 + 4) + (16 + 4) + (4 + 16) = 48. A (3; 3)-ban (a körülírt kör középpontjában) az összeg 54.'
  },
  {
    id: 'cpe-q85',
    level: 3,
    questionTypeBadge: 'Négyzet',
    figure: (
      <Fig
        x={[-1, 7]}
        y={[0, 7]}
        unit={26}
        segs={[{ from: [1, 1], to: [5, 2], color: BLUE, width: 2.4 }]}
        points={[
          { at: [1, 1], label: 'A(1; 1)', dx: 0, dy: 15, color: BLUE },
          { at: [5, 2], label: 'B(5; 2)', dx: 8, dy: 15, color: BLUE }
        ]}
        texts={[{ at: [3, 5.5], text: 'C = ?, D = ?', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'Az ABCD négyzet (pozitív körüljárású) két szomszédos csúcsa A(1; 1) és B(5; 2). Hol van a C és a D csúcs?',
    options: ['C(4; 6), D(0; 5)', 'C(6; −2), D(2; −3)', 'C(4; 6), D(1; 5)', 'C(5; 6), D(1; 5)'],
    correctAnswer: 0,
    explanation: '→AB = (4; 1), ennek +90°-os elforgatottja (−1; 4) = →BC = →AD. C = B + (−1; 4) = (4; 6), D = A + (−1; 4) = (0; 5). A (6; −2), (2; −3) a −90°-os elforgatással kapott (negatív körüljárású) négyzet.'
  },
  {
    id: 'cpe-q86',
    level: 3,
    questionTypeBadge: 'Tudáspróba I.',
    question: 'Az ABC háromszög csúcsainak helyvektorai →a(1; 4), →b(−3; 6), →c(½; 3/2). Mi az AB oldalegyenes egyenlete?',
    options: ['x + 2y = 9', '2x − y = −2', 'x + 2y = 4', '2x + y = 6'],
    correctAnswer: 0,
    explanation: 'A(1; 4), B(−3; 6), m = 2/(−4) = −1/2. y − 4 = −(1/2)(x − 1) ⇒ 2y − 8 = −x + 1 ⇒ x + 2y = 9. Ellenőrzés B-vel: −3 + 12 = 9 ✓.'
  },
  {
    id: 'cpe-q87',
    level: 3,
    questionTypeBadge: 'Tudáspróba I.',
    figure: (
      <Fig
        x={[-4, 3]}
        y={[-1, 7]}
        unit={24}
        polys={[{ pts: [[1, 4], [-3, 6], [0.5, 1.5]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        vecs={[
          { from: [0, 0], to: [1, 4], color: BLUE, label: 'a', lx: 10, ly: 4 },
          { from: [0, 0], to: [-3, 6], color: GREEN, label: 'b', lx: -10, ly: 4 },
          { from: [0, 0], to: [0.5, 1.5], color: AMBER, label: 'c', lx: 10, ly: 6, width: 1.6 }
        ]}
        points={[{ at: [-1.25, 3.75], label: 'F = ?', dx: -18, dy: 4, color: RED }]}
      />
    ),
    question: 'Az ABC háromszög csúcsainak helyvektorai →a(1; 4), →b(−3; 6), →c(½; 3/2). Hol van a BC oldal felezőpontja?',
    options: ['(−1,25; 3,75)', '(−2,5; 7,5)', '(1,75; −2,25)', '(−1; 5)'],
    correctAnswer: 0,
    explanation: 'F = ½(→b + →c) = ½(−2,5; 7,5) = (−1,25; 3,75). A (−2,5; 7,5) az összeg felezés nélkül, az (1,75; −2,25) az ½(→c − →b), a (−1; 5) az AB felezőpontja.'
  },
  {
    id: 'cpe-q88',
    level: 3,
    questionTypeBadge: 'Egyenesek',
    question: 'e: 2x + 5y = −1; f: 4x − 3y = 12; g: 6x + 8y = 5; h: x − 0,4y = 0,6; i: x/3 − y/4 = 1; j: 0,8x = 1 − 2y. Hány különböző egyenest adtunk meg?',
    options: ['5', '6', '4', '3'],
    correctAnswer: 0,
    explanation: 'Az i egyenletét 12-vel szorozva 4x − 3y = 12, ez azonos f-fel. A többi különböző (j: 2x + 5y = 2,5 párhuzamos e-vel, de nem azonos). Így 5 különböző egyenes van.'
  },
  {
    id: 'cpe-q89',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: (
      <Fig
        x={[-5, 2]}
        y={[-1, 4]}
        unit={30}
        grid={0}
        lines={[{ p: [-11 / 3, 0], d: [4, 3], color: PURPLE, label: 'e', labelAt: 0.9, lx: 6, ly: 4 }]}
        polys={[{ pts: [[0, 0], [-11 / 3, 0], [0, 11 / 4]], fill: 'rgba(124,58,237,0.12)', stroke: PURPLE }]}
        rightAngles={[{ at: [0, 0], p: [-11 / 3, 0], q: [0, 11 / 4], r: 12, color: PURPLE }]}
        texts={[{ at: [-1.2, 0.7], text: 'T = ?', color: PURPLE, size: 10, bold: true }]}
      />
    ),
    question: 'Mekkora annak a háromszögnek a területe, amelyet az e: −3x + 4y = 11 egyenes a koordinátatengelyekkel közrefog?',
    options: ['121/24 ≈ 5,04', '121/12 ≈ 10,08', '11/2 = 5,5', '121/7 ≈ 17,29'],
    correctAnswer: 0,
    explanation: 'Tengelymetszetek: y = 0 ⇒ x = −11/3; x = 0 ⇒ y = 11/4. T = ½ · (11/3) · (11/4) = 121/24 ≈ 5,04.'
  },
  {
    id: 'cpe-q90',
    level: 3,
    questionTypeBadge: 'Tudáspróba II.',
    question: 'e: −3x + 4y = 11, g: k · x + 2y = 1. Milyen k esetén merőleges g az e-re?',
    options: ['k = 8/3', 'k = −1,5', 'k = −8/3', 'k = 1,5'],
    correctAnswer: 0,
    explanation: 'm(e) = 3/4, m(g) = −k/2. (3/4) · (−k/2) = −1 ⇒ k = 8/3. A k = −1,5 a párhuzamos esethez tartozik (−k/2 = 3/4).'
  }
];

const COORD_PRACTICE_EXAM_QUESTIONS: QuizQuestion[] = [...LEVEL1, ...LEVEL2, ...LEVEL3];

export const CoordPracticeExamQuiz: React.FC<{
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
      topicId="g11-geo-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="17. Gyakorlás, tudáspróba – Kvíz"
      subtitle="Fejezetzáró kvíz: 90 kérdés 3 nehézségi szinten a teljes koordinátageometria fejezetből – vektorok, pontok, egyenesek, kör, érettségi feladatok."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={COORD_PRACTICE_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Vektorok',
          items: [
            '→AB(b₁ − a₁; b₂ − a₂), |→a| = √(a₁² + a₂²)',
            'Összeg, különbség, számszoros: koordinátánként',
            '+90°: (−a₂; a₁), −90°: (a₂; −a₁)',
            'Felbontás: →v = m→a + n→b (→a, →b nem párhuzamos)'
          ]
        },
        {
          title: 'Pontok, egyenesek',
          items: [
            'AB = √((b₁ − a₁)² + (b₂ − a₂)²), F = (A + B)/2, S = (A + B + C)/3',
            'y = mx + b, m = v₂/v₁ = tg α',
            'Párhuzamos: m₁ = m₂; merőleges: m₁ · m₂ = −1',
            'Metszéspont: egyenletrendszer'
          ]
        },
        {
          title: 'Kör',
          items: [
            '(x − u)² + (y − v)² = r²',
            'Átmérő AB ⇒ K = F(AB), r = AB/2',
            'Érintő a P pontban: merőleges a KP sugárra',
            'Kör és egyenes: behelyettesítés, másodfokú egyenlet'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CoordPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CoordPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CoordPracticeExamQuiz;
