import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CoordPracticeMatcher } from './CoordPracticeMatcher';
import { CoordPracticeSorter } from './CoordPracticeSorter';
import { MidpointPlane, MidpointPlaneProps, CP } from '../felezopont/MidpointFigures';

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

const TRI: CP[] = [
  [-2, -2],
  [7, 1],
  [5, 5]
];
const triPoints = [
  { at: TRI[0], label: 'A(−2; −2)', dx: 10, dy: 14, color: BLUE },
  { at: TRI[1], label: 'B(7; 1)', dx: 4, dy: 14, color: BLUE },
  { at: TRI[2], label: 'C(5; 5)', dx: -24, dy: -2, color: BLUE }
];

const COORD_PRACTICE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'cp-q1',
    level: 1,
    questionTypeBadge: 'Párhuzamos vektorok',
    question: 'Melyik vektor párhuzamos az →a(2; −3) vektorral?',
    options: ['(−4; 6)', '(3; 2)', '(−3; 2)', '(2; 3)'],
    correctAnswer: 0,
    explanation: '(−4; 6) = −2 · (2; −3), tehát a két vektor egymás számszorosa, így párhuzamosak (ellentétes irányúak). A (3; 2) éppen merőleges →a-ra.'
  },
  {
    id: 'cp-q2',
    level: 1,
    questionTypeBadge: 'Merőleges vektorok',
    figure: (
      <Fig
        x={[-3, 7]}
        y={[-4, 5]}
        unit={24}
        vecs={[
          { from: [0, 0], to: [2, -3], color: BLUE, label: 'a', lx: 12, ly: 4 },
          { from: [0, 0], to: [6, 4], color: GREEN, label: '?', lx: -4, ly: -8 }
        ]}
        rightAngles={[{ at: [0, 0], p: [2, -3], q: [6, 4], r: 12, color: GREEN }]}
      />
    ),
    question: 'Melyik vektor merőleges az →a(2; −3) vektorra?',
    options: ['(6; 4)', '(4; −6)', '(−6; 4)', '(3; −2)'],
    correctAnswer: 0,
    explanation: '→a +90°-os elforgatottja (3; 2), ennek kétszerese (6; 4) – ez merőleges →a-ra. A (4; −6) = 2→a párhuzamos vele.'
  },
  {
    id: 'cp-q3',
    level: 1,
    questionTypeBadge: 'Elforgatás',
    question: 'Mi a →c(4; −6) vektor +90°-os elforgatottja?',
    options: ['(6; 4)', '(−6; −4)', '(−4; 6)', '(6; −4)'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) +90°-os elforgatottja (−v₂; v₁) = (6; 4). A (−6; −4) a −90°-os elforgatott, a (−4; 6) az ellentett vektor.'
  },
  {
    id: 'cp-q4',
    level: 1,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig x={[-14, 14]} y={[-14, 14]} unit={9} grid={0} points={[{ at: [-5, 12], label: 'P(−5; 12)', dx: 4, dy: -8, color: RED }]}>
        {circ([0, 0], 13, 9)}
      </Fig>
    ),
    question: 'Mi annak a körnek az egyenlete, amelynek középpontja az origó, és illeszkedik rá a P(−5; 12) pont?',
    options: ['x² + y² = 169', 'x² + y² = 13', 'x² + y² = 49', '(x + 5)² + (y − 12)² = 169'],
    correctAnswer: 0,
    explanation: 'r² = OP² = (−5)² + 12² = 25 + 144 = 169, így x² + y² = 169. A jobb oldalon r², nem r = 13 áll.'
  },
  {
    id: 'cp-q5',
    level: 1,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig
        x={[-10, 6]}
        y={[-1, 15]}
        unit={15}
        grid={0}
        points={[{ at: [-2, 7], label: 'C(−2; 7)', dx: 0, dy: -8, color: RED }]}
        segs={[{ from: [-2, 7], to: [-2, 0], color: RED, dashed: true, width: 1.4 }]}
        texts={[{ at: [-1.2, 3.5], text: 'r = ?', color: RED, size: 10, anchor: 'start' }]}
      >
        {circ([-2, 7], 7, 15)}
      </Fig>
    ),
    question: 'Mi annak a körnek az egyenlete, amelynek középpontja C(−2; 7), és érinti az x tengelyt?',
    options: ['(x + 2)² + (y − 7)² = 49', '(x + 2)² + (y − 7)² = 4', '(x − 2)² + (y + 7)² = 49', '(x + 2)² + (y − 7)² = 7'],
    correctAnswer: 0,
    explanation: 'Ha a kör érinti az x tengelyt, a sugár a középpont távolsága a tengelytől: r = |7| = 7, r² = 49. A középpont koordinátáit ellentétes előjellel írjuk a zárójelekbe.'
  },
  {
    id: 'cp-q6',
    level: 1,
    questionTypeBadge: 'Egyenes egyenlete',
    question: 'Írd fel az f: 5x − 12y + 43 = 0 egyenes egyenletét y = mx + b alakban!',
    options: ['y = (5/12)x + 43/12', 'y = −(5/12)x + 43/12', 'y = (12/5)x + 43/5', 'y = (5/12)x − 43/12'],
    correctAnswer: 0,
    explanation: '12y = 5x + 43, mindkét oldalt 12-vel osztva y = (5/12)x + 43/12.'
  },
  {
    id: 'cp-q7',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    figure: (
      <Fig
        x={[-8, 4]}
        y={[-9, 2]}
        unit={20}
        segs={[{ from: [2, -7], to: [-6, -1], color: BLUE, width: 2.4 }]}
        lines={[{ p: [0, -1], d: [2, 3], color: PURPLE, label: 'e', labelAt: 0.85, lx: 6, ly: 4 }]}
        points={[
          { at: [2, -7], label: 'B(2; −7)', dx: -4, dy: 15, color: BLUE },
          { at: [-6, -1], label: 'C(−6; −1)', dx: 10, dy: -8, color: BLUE },
          { at: [-2, -4], label: 'F', dx: -10, dy: 12, color: RED }
        ]}
      />
    ),
    question: 'B(2; −7), C(−6; −1). Illeszkedik-e a BC szakasz F felezőpontja az e: 3x − 2y = 2 egyenesre?',
    options: [
      'Igen: F(−2; −4) és 3 · (−2) − 2 · (−4) = 2',
      'Nem: F(−4; 3) és 3 · (−4) − 2 · 3 = −18',
      'Nem: F(−2; −4) és 3 · (−2) − 2 · (−4) = −14',
      'Igen: F(−4; −8) és 3 · (−4) − 2 · (−8) = 4'
    ],
    correctAnswer: 0,
    explanation: 'F((2 − 6)/2; (−7 − 1)/2) = F(−2; −4). Behelyettesítve: −6 + 8 = 2 ✓, tehát F rajta van e-n. A (−4; 3) az ½ →BC vektor, nem a felezőpont.'
  },
  {
    id: 'cp-q8',
    level: 1,
    questionTypeBadge: 'Metszéspont',
    question: 'Hol metszi egymást az e: 3x − 2y = 2 és az f: 3x + 4y = 14 egyenes?',
    options: ['(2; 2)', '(2; −2)', '(4; 5)', '(−2; −4)'],
    correctAnswer: 0,
    explanation: 'A második egyenletből kivonva az elsőt: 6y = 12, y = 2; ekkor 3x = 2 + 4, x = 2. A (4; 5) és a (−2; −4) csak az e-n van rajta.'
  },
  {
    id: 'cp-q9',
    level: 1,
    questionTypeBadge: 'Magasságvonal',
    question: 'Az ABC háromszög C csúcsából induló magasságvonala…',
    options: [
      'átmegy C-n, és merőleges az AB oldalra',
      'átmegy C-n és az AB oldal felezőpontján',
      'átmegy az AB oldal felezőpontján, és merőleges AB-re',
      'átmegy C-n, és párhuzamos az AB oldallal'
    ],
    correctAnswer: 0,
    explanation: 'A magasságvonal a csúcsból a szemközti oldal egyenesére bocsátott merőleges egyenes. A második válasz a súlyvonal, a harmadik az oldalfelező merőleges.'
  },
  {
    id: 'cp-q10',
    level: 1,
    questionTypeBadge: 'Körülírt kör',
    question: 'Hogyan kapjuk meg a háromszög köré írt körének középpontját?',
    options: [
      'Két oldalfelező merőleges metszéspontjaként',
      'Két magasságvonal metszéspontjaként',
      'Két súlyvonal metszéspontjaként',
      'Két szögfelező metszéspontjaként'
    ],
    correctAnswer: 0,
    explanation: 'A körülírt kör középpontja mindhárom csúcstól egyenlő távolságra van, ezért mindegyik oldal felezőmerőlegesén rajta van. A magasságvonalak a magasságpontban, a súlyvonalak a súlypontban, a szögfelezők a beírt kör középpontjában metszik egymást.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'cp-q11',
    level: 2,
    questionTypeBadge: 'Derékszögű háromszög',
    figure: (
      <Fig
        x={[-1, 15]}
        y={[-6, 12]}
        unit={15}
        grid={0}
        segs={[{ from: [4, 1], to: [10, 5], color: '#0f172a', width: 2.6 }]}
        points={[
          { at: [4, 1], label: 'A(4; 1)', dx: -4, dy: 15, color: BLUE },
          { at: [10, 5], label: 'B(10; 5)', dx: 6, dy: -8, color: BLUE }
        ]}
      />
    ),
    question: 'Az ABC egyenlő szárú derékszögű háromszög egyik befogójának végpontjai A(4; 1) és B(10; 5). Hány ilyen háromszög rajzolható?',
    options: ['4', '2', '1', '8'],
    correctAnswer: 0,
    explanation: 'A derékszög lehet A-nál vagy B-nél, és mindkét esetben a másik befogó az AB két oldalára mérhető fel: 2 · 2 = 4 háromszög.'
  },
  {
    id: 'cp-q12',
    level: 2,
    questionTypeBadge: 'Derékszögű háromszög',
    figure: (
      <Fig
        x={[-1, 13]}
        y={[-1, 9]}
        unit={19}
        grid={0}
        segs={[{ from: [4, 1], to: [10, 5], color: '#0f172a', width: 2.6 }]}
        rightAngles={[{ at: [4, 1], p: [10, 5], q: [0, 7], r: 13, color: RED }]}
        points={[
          { at: [4, 1], label: 'A(4; 1)', dx: 14, dy: 15, color: BLUE },
          { at: [10, 5], label: 'B(10; 5)', dx: 6, dy: -8, color: BLUE },
          { at: [0, 7], label: 'C = ?', dx: 8, dy: -8, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'A(4; 1), B(10; 5), az ABC egyenlő szárú derékszögű háromszög derékszöge az A csúcsnál van (C az AB egyenestől balra fent). Melyik a C csúcs?',
    options: ['C(0; 7)', 'C(6; 11)', 'C(8; −5)', 'C(7; 3)'],
    correctAnswer: 0,
    explanation: '→AB = (6; 4), ennek +90°-os elforgatottja (−4; 6). C = A + (−4; 6) = (0; 7). A (6; 11) esetén a derékszög B-nél van, a (8; −5) az AB másik oldalára esik, a (7; 3) az AB felezőpontja.'
  },
  {
    id: 'cp-q13',
    level: 2,
    questionTypeBadge: 'Kerület, terület',
    question: 'Mekkora annak az egyenlő szárú derékszögű háromszögnek a kerülete és a területe, amelynek egyik befogója A(4; 1), B(10; 5)?',
    options: ['K = 4√13 + 2√26 ≈ 24,62; T = 26', 'K = 4√13 + 2√26 ≈ 24,62; T = 52', 'K = 6√13 ≈ 21,63; T = 26', 'K = 2√13 + 2√26 ≈ 17,41; T = 13'],
    correctAnswer: 0,
    explanation: 'A befogó √(6² + 4²) = √52 = 2√13, az átfogó √2-szerese: 2√26. K = 2 · 2√13 + 2√26 ≈ 24,62; T = (2√13)²/2 = 52/2 = 26.'
  },
  {
    id: 'cp-q14',
    level: 2,
    questionTypeBadge: 'Körülírt kör',
    figure: (
      <Fig
        x={[-1, 11]}
        y={[0, 8]}
        unit={22}
        grid={0}
        polys={[{ pts: [[4, 1], [10, 5], [0, 7]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        rightAngles={[{ at: [4, 1], p: [10, 5], q: [0, 7], r: 13, color: BLUE }]}
        points={[
          { at: [4, 1], label: 'A(4; 1)', dx: 0, dy: 14, color: BLUE },
          { at: [10, 5], label: 'B(10; 5)', dx: -6, dy: -8, color: BLUE },
          { at: [0, 7], label: 'C(0; 7)', dx: 22, dy: -4, color: BLUE }
        ]}
        texts={[{ at: [5.6, 4.6], text: 'K = ?', color: PURPLE, size: 10, bold: true }]}
      />
    ),
    question: 'Hol van az A(4; 1), B(10; 5), C(0; 7) csúcsú derékszögű háromszög köré írt körének középpontja?',
    options: ['(5; 6)', '(7; 3)', '(14/3; 13/3)', '(4; 1)'],
    correctAnswer: 0,
    explanation: 'A derékszög A-nál van, így Thalész tétele miatt a körülírt kör középpontja a BC átfogó felezőpontja: ((10 + 0)/2; (5 + 7)/2) = (5; 6). A (14/3; 13/3) a súlypont, a (7; 3) az AB felezőpontja.'
  },
  {
    id: 'cp-q15',
    level: 2,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig x={[-8, 8]} y={[-8, 8]} unit={15} grid={0}>
        {circ([-4, -4], 4, 15)}
      </Fig>
    ),
    question: 'Mi annak a 4 egység sugarú körnek az egyenlete, amely mindkét koordinátatengely negatív félegyenesét érinti?',
    options: ['(x + 4)² + (y + 4)² = 16', '(x − 4)² + (y − 4)² = 16', '(x + 4)² + (y + 4)² = 4', '(x + 4)² + (y − 4)² = 16'],
    correctAnswer: 0,
    explanation: 'A negatív félegyeneseket érintő kör a III. síknegyedben van, középpontja (−4; −4), így (x + 4)² + (y + 4)² = 16.'
  },
  {
    id: 'cp-q16',
    level: 2,
    questionTypeBadge: 'Kör egyenlete',
    figure: (
      <Fig
        x={[-5, 9]}
        y={[-11, 1]}
        unit={19}
        grid={0}
        segs={[{ from: [7, -4], to: [-3, -6], color: RED, width: 2 }]}
        points={[
          { at: [7, -4], label: 'A(7; −4)', dx: -6, dy: -8, color: RED },
          { at: [-3, -6], label: 'B(−3; −6)', dx: 8, dy: 15, color: RED }
        ]}
      >
        {circ([2, -5], Math.sqrt(26), 19)}
      </Fig>
    ),
    question: 'Egy kör egyik átmérőjének végpontjai A(7; −4) és B(−3; −6). Mi a kör egyenlete?',
    options: ['(x − 2)² + (y + 5)² = 26', '(x − 2)² + (y + 5)² = 104', '(x + 2)² + (y − 5)² = 26', '(x − 5)² + (y − 1)² = 26'],
    correctAnswer: 0,
    explanation: 'A középpont az AB felezőpontja: K(2; −5). r² = KA² = 5² + 1² = 26. A 104 = AB² az átmérő négyzete, nem a sugáré.'
  },
  {
    id: 'cp-q17',
    level: 2,
    questionTypeBadge: 'Irányszög',
    question: 'Mekkora szöget zár be az f: 5x − 12y + 43 = 0 egyenes az x tengellyel?',
    options: ['≈ 22,6°', '≈ 67,4°', '≈ 157,4°', '≈ 45°'],
    correctAnswer: 0,
    explanation: 'A meredekség m = 5/12, így tg α = 5/12 ⇒ α ≈ 22,6°. A 67,4° az y tengellyel bezárt szög.'
  },
  {
    id: 'cp-q18',
    level: 2,
    questionTypeBadge: 'Párhuzamosság',
    question: 'Melyik egyenes párhuzamos (de nem azonos) a g: −9x + 15y = 10 egyenessel?',
    options: ['6x − 10y = 14', '10x + 6y = −14', '9x + 15y = 10', '−18x + 30y = 20'],
    correctAnswer: 0,
    explanation: 'g: y = (3/5)x + 2/3. A 6x − 10y = 14 egyenes: y = (3/5)x − 7/5 – ugyanaz a meredekség, más tengelymetszet. A 10x + 6y = −14 merőleges g-re, a −18x + 30y = 20 a g kétszerese, tehát azonos vele.'
  },
  {
    id: 'cp-q19',
    level: 2,
    questionTypeBadge: 'Párhuzamosság',
    figure: (
      <Fig
        x={[-8, 6]}
        y={[-9, 5]}
        unit={18}
        grid={0}
        segs={[{ from: [2, -7], to: [-6, -1], color: BLUE, width: 2.4 }]}
        lines={[{ p: [2, 2], d: [4, -3], color: GREEN, label: 'f', labelAt: 0.12, lx: 6, ly: 12 }]}
        points={[
          { at: [2, -7], label: 'B(2; −7)', dx: 4, dy: 15, color: BLUE },
          { at: [-6, -1], label: 'C(−6; −1)', dx: 6, dy: 15, color: BLUE }
        ]}
      />
    ),
    question: 'B(2; −7), C(−6; −1). Párhuzamos-e a BC egyenes az f: 3x + 4y = 14 egyenessel?',
    options: [
      'Igen, mindkét meredekség −3/4, és B nincs rajta f-en',
      'Nem, mert m(BC) = −4/3, m(f) = −3/4',
      'Nem, mert a két egyenes egybeesik',
      'Nem, mert merőlegesek egymásra'
    ],
    correctAnswer: 0,
    explanation: '→BC = (−8; 6), m(BC) = 6/(−8) = −3/4. f: y = −(3/4)x + 3,5, tehát m(f) = −3/4. B-t behelyettesítve 6 − 28 = −22 ≠ 14, így nem esnek egybe: párhuzamosak.'
  },
  {
    id: 'cp-q20',
    level: 2,
    questionTypeBadge: 'Oldalfelező merőleges',
    figure: (
      <Fig
        x={[-3, 9]}
        y={[-3, 7]}
        unit={22}
        grid={0}
        polys={[{ pts: TRI, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        lines={[{ p: [2.5, -0.5], d: [-1, 3], color: GREEN, label: 'fAB = ?', labelAt: 0.1, lx: 6, ly: 2, dashed: true }]}
        rightAngles={[{ at: [2.5, -0.5], p: [7, 1], q: [1.5, 2.5], r: 10, color: GREEN }]}
        points={triPoints}
      />
    ),
    question: 'A(−2; −2), B(7; 1). Mi az AB szakasz felezőmerőlegesének egyenlete?',
    options: ['3x + y = 7', 'x − 3y = 4', '3x + y = 20', '3x − y = 8'],
    correctAnswer: 0,
    explanation: 'Felezőpont: (2,5; −0,5). m(AB) = 3/9 = 1/3, a merőleges meredeksége −3: y + 0,5 = −3(x − 2,5) ⇒ y = −3x + 7, azaz 3x + y = 7. Az x − 3y = 4 maga az AB egyenes, a 3x + y = 20 a C-n átmenő magasságvonal.'
  },

  // LEVEL 3 (21–30)
  {
    id: 'cp-q21',
    level: 3,
    questionTypeBadge: 'Magasságvonal',
    figure: (
      <Fig
        x={[-3, 9]}
        y={[-3, 7]}
        unit={22}
        grid={0}
        polys={[{ pts: TRI, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        segs={[{ from: [5, 5], to: [6.4, 0.8], color: RED, dashed: true, width: 1.6 }]}
        rightAngles={[{ at: [6.4, 0.8], p: [5, 5], q: [-2, -2], r: 10, color: RED }]}
        points={triPoints}
        texts={[{ at: [6.6, 3.2], text: 'mc', color: RED, size: 10, bold: true, anchor: 'start' }]}
      />
    ),
    question: 'Az ABC háromszög csúcsai A(−2; −2), B(7; 1), C(5; 5). Mi a C csúcsból induló magasságvonal egyenlete?',
    options: ['3x + y = 20', '3x + y = 7', 'x − 3y = −10', '3x + y = −8'],
    correctAnswer: 0,
    explanation: 'mc ⊥ AB és m(AB) = 1/3, ezért mc meredeksége −3; átmegy C(5; 5)-ön: y − 5 = −3(x − 5) ⇒ 3x + y = 20. A 3x + y = 7 az AB felezőmerőlegese, az x − 3y = −10 a C-n átmenő, AB-vel párhuzamos egyenes.'
  },
  {
    id: 'cp-q22',
    level: 3,
    questionTypeBadge: 'Körülírt kör',
    figure: (
      <Fig
        x={[-3, 9]}
        y={[-3, 7]}
        unit={22}
        grid={0}
        polys={[{ pts: TRI, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        lines={[
          { p: [2.5, -0.5], d: [-1, 3], color: GREEN, dashed: true, width: 1.4 },
          { p: [6, 3], d: [2, 1], color: AMBER, dashed: true, width: 1.4 }
        ]}
        points={triPoints}
      />
    ),
    question: 'A(−2; −2), B(7; 1), C(5; 5). Az AB oldal felezőmerőlegese y = −3x + 7, a BC oldalé y = x/2. Hol van a háromszög köré írt körének középpontja?',
    options: ['K(2; 1)', 'K(10/3; 4/3)', 'K(6; 2)', 'K(2,5; −0,5)'],
    correctAnswer: 0,
    explanation: '−3x + 7 = x/2 ⇒ 3,5x = 7 ⇒ x = 2, y = 1. Ellenőrzés: KA = KB = KC = 5. A (10/3; 4/3) a súlypont, a (6; 2) a magasságpont, a (2,5; −0,5) az AB felezőpontja.'
  },
  {
    id: 'cp-q23',
    level: 3,
    questionTypeBadge: 'Körülírt kör',
    question: 'Az A(−2; −2), B(7; 1), C(5; 5) háromszög köré írt körének középpontja K(2; 1). Mi a körülírt kör egyenlete?',
    options: ['(x − 2)² + (y − 1)² = 25', '(x − 2)² + (y − 1)² = 5', '(x + 2)² + (y + 1)² = 25', '(x − 2)² + (y − 1)² = 50'],
    correctAnswer: 0,
    explanation: 'r² = KA² = (−2 − 2)² + (−2 − 1)² = 16 + 9 = 25, így (x − 2)² + (y − 1)² = 25. (Ellenőrzés B-vel: 25 + 0 = 25 ✓.)'
  },
  {
    id: 'cp-q24',
    level: 3,
    questionTypeBadge: 'Magasságpont',
    figure: (
      <Fig
        x={[-3, 9]}
        y={[-3, 7]}
        unit={22}
        grid={0}
        polys={[{ pts: TRI, fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        lines={[
          { p: [5, 5], d: [-1, 3], color: RED, dashed: true, width: 1.4 },
          { p: [-2, -2], d: [2, 1], color: RED, dashed: true, width: 1.4 }
        ]}
        points={[...triPoints, { at: [6, 2], label: 'M = ?', dx: 22, dy: 4, color: RED, hollow: true }]}
      />
    ),
    question: 'A(−2; −2), B(7; 1), C(5; 5). A C-ből induló magasságvonal 3x + y = 20, az A-ból induló x − 2y = 2. Hol van a háromszög magasságpontja?',
    options: ['M(6; 2)', 'M(2; 1)', 'M(6,4; 0,8)', 'M(10/3; 4/3)'],
    correctAnswer: 0,
    explanation: 'A második egyenletből x = 2 + 2y; behelyettesítve 6 + 6y + y = 20 ⇒ y = 2, x = 6. A (6,4; 0,8) a C-ből húzott magasság talppontja, a (2; 1) a körülírt kör középpontja.'
  },
  {
    id: 'cp-q25',
    level: 3,
    questionTypeBadge: 'Magasság hossza',
    question: 'Az A(−2; −2), B(7; 1), C(5; 5) háromszög területe 21. Milyen hosszú a C csúcsból induló magasság?',
    options: ['14/√10 ≈ 4,43', '√10 ≈ 3,16', '7/√10 ≈ 2,21', '42/√10 ≈ 13,28'],
    correctAnswer: 0,
    explanation: 'AB = √(9² + 3²) = √90 = 3√10. T = AB · mc / 2 ⇒ mc = 2 · 21 / (3√10) = 14/√10 ≈ 4,43. A 42/√10 a 2T/√10, ott elmaradt a 3-mal való osztás.'
  },
  {
    id: 'cp-q26',
    level: 3,
    questionTypeBadge: 'Súlyvonal',
    question: 'A(−2; −2), B(7; 1), C(5; 5). Mi a C csúcsból induló súlyvonal egyenlete?',
    options: ['11x − 5y = 30', '3x + y = 20', '3x + y = 7', '5x − 11y = −30'],
    correctAnswer: 0,
    explanation: 'Az AB felezőpontja F(2,5; −0,5). A súlyvonal C-n és F-en megy át: →FC = (2,5; 5,5), meredeksége 5,5/2,5 = 11/5. y − 5 = (11/5)(x − 5) ⇒ 11x − 5y = 30. Ellenőrzés F-fel: 27,5 + 2,5 = 30 ✓.'
  },
  {
    id: 'cp-q27',
    level: 3,
    questionTypeBadge: 'Magasság, felezőmerőleges',
    question: 'A(−3; 2), B(5; −4), C(0; 1). Mi a B csúcsból induló magasságvonal egyenlete?',
    options: ['y = 3x − 19', 'y = −(1/3)x − 7/3', 'y = 3x + 11', 'y = (4/3)x − 7/3'],
    correctAnswer: 0,
    explanation: 'm(AC) = (1 − 2)/(0 + 3) = −1/3, a rá merőleges meredekség 3. A B(5; −4) ponton át: y + 4 = 3(x − 5) ⇒ y = 3x − 19. Az y = (4/3)x − 7/3 az AB oldal felezőmerőlegese.'
  },
  {
    id: 'cp-q28',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: (
      <Fig
        x={[-9, 2]}
        y={[-4, 2]}
        unit={24}
        grid={0}
        lines={[{ p: [-7, 0], d: [3, -1], color: PURPLE, label: 'g', labelAt: 0.9, lx: -4, ly: -6 }]}
        polys={[{ pts: [[0, 0], [-7, 0], [0, -7 / 3]], fill: 'rgba(124,58,237,0.12)', stroke: PURPLE }]}
        rightAngles={[{ at: [0, 0], p: [-7, 0], q: [0, -7 / 3], r: 12, color: PURPLE }]}
        texts={[{ at: [-2.6, -0.8], text: 'T = ?', color: PURPLE, size: 10, bold: true }]}
      />
    ),
    question: 'Mekkora annak a derékszögű háromszögnek a területe, amelyet a g: x + 3y = −7 egyenes a koordinátatengelyekkel határol?',
    options: ['49/6 ≈ 8,17', '49/3 ≈ 16,33', '7', '49/2 = 24,5'],
    correctAnswer: 0,
    explanation: 'y = 0 ⇒ x = −7; x = 0 ⇒ y = −7/3. A befogók 7 és 7/3, így T = ½ · 7 · 7/3 = 49/6 ≈ 8,17.'
  },
  {
    id: 'cp-q29',
    level: 3,
    questionTypeBadge: 'Ráadás',
    figure: (
      <Fig
        x={[-3, 7]}
        y={[-1, 12]}
        unit={18}
        grid={0}
        polys={[{ pts: [[2, 4], [5, 7], [-1, 10]], fill: 'rgba(37,99,235,0.08)', stroke: BLUE }]}
        points={[
          { at: [2, 4], label: 'A(2; 4)', dx: 22, dy: 8, color: BLUE },
          { at: [5, 7], label: 'B(5; 7)', dx: 2, dy: -8, color: BLUE },
          { at: [-1, 10], label: 'C(−1; 10)', dx: 10, dy: -8, color: BLUE }
        ]}
        texts={[{ at: [2, 1.5], text: 'PA² + PB² + PC² → min', color: RED, size: 10, bold: true }]}
      />
    ),
    question: 'A(2; 4), B(5; 7), C(−1; 10). Melyik P pontban a legkisebb a PA² + PB² + PC² összeg?',
    options: ['P(2; 7)', 'P(1,5; 7,5)', 'P(3,5; 5,5)', 'P(0; 0)'],
    correctAnswer: 0,
    explanation: 'Az összeg 3(x − 2)² + 3(y − 7)² + 36 alakra hozható, ez x = 2, y = 7 esetén a legkisebb – ez éppen a súlypont. Az (1,5; 7,5) a körülírt kör középpontja (ott az összeg 37,5), a (3,5; 5,5) az AB felezőpontja.'
  },
  {
    id: 'cp-q30',
    level: 3,
    questionTypeBadge: 'Egyenesek helyzete',
    question: 'e: y = (3/5)x − 7/5; f: y = −(5/3)x + 7/3; g: −9x + 15y = 10; h: 6x − 10y = 14. Hány egyenes metszi közülük az i: 10x + 6y = −14 egyenest?',
    options: ['3', '4', '2', '1'],
    correctAnswer: 0,
    explanation: 'i: y = −(5/3)x − 7/3. Az f meredeksége is −5/3, de más a tengelymetszete, így f ∥ i. Az e, g, h meredeksége 3/5, ezek metszik i-t (sőt merőlegesek rá): 3 egyenes.'
  }
];

export const CoordPracticeQuiz: React.FC<{
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
      topicId="g11-geo-gyakorlas-quiz"
      subtopicId="gyakorlas-koordinatageometria"
      title="16. Gyakorlás – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: vektorok, körök és egyenesek egyenletei, párhuzamosság, merőlegesség, magasságvonal, oldalfelező merőleges, körülírt kör."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={COORD_PRACTICE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Vektorok, pontok',
          items: [
            'Párhuzamos: →w = λ · →v',
            '+90°: (v₁; v₂) ↦ (−v₂; v₁), −90°: (v₁; v₂) ↦ (v₂; −v₁)',
            'Távolság: √((b₁ − a₁)² + (b₂ − a₂)²)',
            'Felezőpont: (A + B)/2, súlypont: (A + B + C)/3'
          ]
        },
        {
          title: 'Egyenesek',
          items: [
            'y = mx + b, m = tg α (irányszög)',
            'Párhuzamos: m₁ = m₂; merőleges: m₁ · m₂ = −1',
            'P(x₀; y₀) ponton át: y − y₀ = m(x − x₀)',
            'Metszéspont: az egyenletrendszer megoldása'
          ]
        },
        {
          title: 'Háromszög, kör',
          items: [
            'mc: C-n át, merőleges AB-re',
            'fAB: AB felezőpontján át, merőleges AB-re',
            'K = két oldalfelező merőleges metszéspontja, r = KA',
            'Kör: (x − u)² + (y − v)² = r²'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CoordPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CoordPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CoordPracticeQuiz;
