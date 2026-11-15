import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SlopeTangentMatcher } from './SlopeTangentMatcher';
import { SlopeTangentSorter } from './SlopeTangentSorter';
import { SlopeTangentPlane, SlopeAngleMark } from './SlopeTangentFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#d97706';

/** Kis derékszögű háromszög (emelkedő/lejtő) adatokkal – a szöget „?” jelöli. */
const RampFig: React.FC<{ run: string; rise: string; down?: boolean }> = ({ run, rise, down = false }) => {
  const A = { x: 30, y: down ? 40 : 120 };
  const B = { x: 210, y: down ? 40 : 120 };
  const C = { x: 210, y: down ? 120 : 40 };
  const V = A;
  const H = B;
  const T = C;
  return (
    <svg viewBox="0 0 260 150" className={FIG} role="img">
      <rect width={260} height={150} fill="#ffffff" rx={8} />
      <polygon points={`${V.x},${V.y} ${H.x},${H.y} ${T.x},${T.y}`} fill="rgba(37,99,235,0.08)" stroke="#1e3a8a" strokeWidth={2} />
      <SlopeAngleMark V={V} P={H} Q={T} r={34} color={RED} label="?" />
      <SlopeAngleMark V={H} P={V} Q={T} r={12} right />
      <text x={(V.x + H.x) / 2} y={down ? 30 : 140} fontSize={12} fontWeight="bold" fill="#1e3a8a" textAnchor="middle">{run}</text>
      <text x={218} y={84} fontSize={12} fontWeight="bold" fill="#1e3a8a">{rise}</text>
    </svg>
  );
};

export const SLOPE_TANGENT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak, leolvasás (1–10)
  {
    id: 'st-q1',
    level: 1,
    questionTypeBadge: 'A meredekség fogalma',
    question: 'Mit ad meg egy egyenes meredeksége?',
    options: [
      'Az egységnyi első koordináta-növekedésre jutó második koordináta-változást',
      'Az egyenes és az y tengely metszéspontjának második koordinátáját',
      'Az egyenes és az x tengely metszéspontjának első koordinátáját',
      'Az egyenes két pontjának távolságát'
    ],
    correctAnswer: 0,
    explanation: 'A meredekség megmutatja, hogyan (előjel) és mennyivel (számérték) változik a második koordináta, ha az első koordináta 1-gyel nő: m = Δy / Δx.'
  },
  {
    id: 'st-q2',
    level: 1,
    questionTypeBadge: 'y = mx + b',
    question: 'Mennyi az y = 2x − 5 egyenletű egyenes meredeksége?',
    options: ['2', '−5', '5', '−2'],
    correctAnswer: 0,
    explanation: 'Az y-ra rendezett y = mx + b alakban a meredekség az x együtthatója: m = 2. A −5 az y tengellyel vett metszéspont második koordinátája.'
  },
  {
    id: 'st-q3',
    level: 1,
    questionTypeBadge: 'Leolvasás rácsról',
    figure: (
      <SlopeTangentPlane
        xMin={-2}
        xMax={5}
        yMin={-1}
        yMax={6}
        unit={26}
        className={FIG}
        lines={[{ p: [0, 1], q: [2, 5], color: BLUE, label: 'e' }]}
        points={[
          { at: [0, 1], color: RED },
          { at: [2, 5], color: RED }
        ]}
      />
    ),
    question: 'Az ábrán az e egyenes két rácspontját pirossal jelöltük. Mennyi az e egyenes meredeksége?',
    options: ['2', '1/2', '4', '−2'],
    correctAnswer: 0,
    explanation: 'A (0; 1) pontból a (2; 5) pontba lépve Δx = 2 és Δy = 4, így m = 4/2 = 2. (Az 1/2 a fordított hányados lenne.)'
  },
  {
    id: 'st-q4',
    level: 1,
    questionTypeBadge: 'Csökkenő egyenes',
    figure: (
      <SlopeTangentPlane
        xMin={-1}
        xMax={5}
        yMin={-1}
        yMax={5}
        unit={28}
        className={FIG}
        lines={[{ p: [0, 3], q: [3, 0], color: RED, label: 'f', labelAt: 0.1 }]}
        points={[
          { at: [0, 3], color: BLUE },
          { at: [3, 0], color: BLUE }
        ]}
      />
    ),
    question: 'Mennyi az ábrán látható f egyenes meredeksége? (A jelölt pontok rácspontok.)',
    options: ['−1', '1', '3', '−3'],
    correctAnswer: 0,
    explanation: 'A (0; 3)-ból a (3; 0)-ba lépve Δx = 3, Δy = −3, tehát m = −3/3 = −1. Az egyenes csökkenő, ezért a meredeksége negatív.'
  },
  {
    id: 'st-q5',
    level: 1,
    questionTypeBadge: 'Vízszintes egyenes',
    figure: (
      <SlopeTangentPlane
        xMin={-3}
        xMax={4}
        yMin={-1}
        yMax={5}
        unit={26}
        className={FIG}
        lines={[{ p: [0, 3], q: [1, 3], color: GREEN, label: 'g', labelAt: 0.92, labelDy: -8 }]}
      />
    ),
    question: 'Mennyi az ábrán látható g egyenes (y = 3) meredeksége?',
    options: ['0', '3', 'Nincs meredeksége', '1'],
    correctAnswer: 0,
    explanation: 'Az x tengellyel párhuzamos egyenes mentén a második koordináta nem változik: Δy = 0, így m = 0, az irányszög 0°. Egyenlete y = 0 · x + 3.'
  },
  {
    id: 'st-q6',
    level: 1,
    questionTypeBadge: 'Függőleges egyenes',
    figure: (
      <SlopeTangentPlane
        xMin={-2}
        xMax={5}
        yMin={-2}
        yMax={4}
        unit={26}
        className={FIG}
        lines={[{ p: [3, 0], q: [3, 1], color: PURPLE, label: 'h', labelAt: 0.95, labelDx: 6 }]}
      />
    ),
    question: 'Mit mondhatunk az ábrán látható, x = 3 egyenletű h egyenes meredekségéről?',
    options: ['Nincs meredeksége, mert tg 90° nem értelmezett', '0', '3', '1/3'],
    correctAnswer: 0,
    explanation: 'Az y tengellyel párhuzamos egyenes irányszöge 90°, de a 90°-nak nem értelmezzük a tangensét. Ezért a függőleges egyeneseknek nincs meredekségük, és nem írható fel y = mx + b alakú egyenletük.'
  },
  {
    id: 'st-q7',
    level: 1,
    questionTypeBadge: 'Irányszög',
    question: 'Mit nevezünk egy (x tengelyre nem merőleges) egyenes irányszögének?',
    options: [
      'Az egyenesnek az x tengely pozitív félegyenesével bezárt előjeles szögét (−90° és 90° között)',
      'Az egyenesnek az y tengellyel bezárt szögét',
      'Az egyenes és az origó távolságát',
      'Az egyenes két tetszőleges pontja által meghatározott szakasz hosszát'
    ],
    correctAnswer: 0,
    explanation: 'Az irányszög az x tengely pozitív félegyenesével bezárt előjeles szög, nagysága −90°-nál nagyobb és 90°-nál kisebb. Az y tengellyel párhuzamos egyenesek irányszöge 90°.'
  },
  {
    id: 'st-q8',
    level: 1,
    questionTypeBadge: 'm = tg α',
    question: 'Egy egyenes irányszöge 45°. Mennyi a meredeksége?',
    options: ['1', '0', '√2/2', '45'],
    correctAnswer: 0,
    explanation: 'm = tg α = tg 45° = 1: egy jobbra lépésre egy felfelé lépés jut. (A √2/2 a sin 45° értéke.)'
  },
  {
    id: 'st-q9',
    level: 1,
    questionTypeBadge: 'Százalékos emelkedő',
    figure: <RampFig run="100 m" rise="12 m" />,
    question: 'A tábla 12%-os emelkedőt jelez: 100 m vízszintes úton 12 m az emelkedés. Mennyi az emelkedő meredeksége?',
    options: ['0,12', '12', '1,2', '0,012'],
    correctAnswer: 0,
    explanation: 'A meredekség az emelkedés és a vízszintes távolság hányadosa: 12/100 = 0,12 (ez az ábrán jelölt szög tangense).'
  },
  {
    id: 'st-q10',
    level: 1,
    questionTypeBadge: 'Előjel',
    question: 'Melyik állítás igaz egy negatív meredekségű egyenesre?',
    options: [
      'Az irányszöge −90°-nál nagyobb és 0°-nál kisebb',
      'Az irányszöge 90° és 180° közé esik',
      'Az egyenes párhuzamos az x tengellyel',
      'Az egyenes balról jobbra haladva emelkedik'
    ],
    correctAnswer: 0,
    explanation: 'Negatív meredekségű egyenes balról jobbra haladva süllyed; irányszöge egy hegyesszög ellentettje, vagyis −90° < α < 0°.'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'st-q11',
    level: 2,
    questionTypeBadge: 'Két pontból',
    figure: (
      <SlopeTangentPlane
        xMin={-1}
        xMax={6}
        yMin={-1}
        yMax={9}
        unit={20}
        className={FIG}
        lines={[{ p: [1, 2], q: [4, 8], color: BLUE }]}
        points={[
          { at: [1, 2], label: 'A(1; 2)', dx: 6, dy: 10 },
          { at: [4, 8], label: 'B(4; 8)', dx: -48, dy: -4 }
        ]}
      />
    ),
    question: 'Mennyi az A(1; 2) és B(4; 8) pontokon átmenő egyenes meredeksége?',
    options: ['2', '1/2', '6', '3'],
    correctAnswer: 0,
    explanation: 'm = (y₂ − y₁)/(x₂ − x₁) = (8 − 2)/(4 − 1) = 6/3 = 2. (Az 1/2 a fordított hányados, a 6 csak Δy, a 3 csak Δx.)'
  },
  {
    id: 'st-q12',
    level: 2,
    questionTypeBadge: 'Két pontból',
    question: 'Mennyi az A(−2; 5) és B(2; −3) pontokon átmenő egyenes meredeksége?',
    options: ['−2', '2', '−1/2', '1/2'],
    correctAnswer: 0,
    explanation: 'Δx = 2 − (−2) = 4, Δy = −3 − 5 = −8, így m = −8/4 = −2.'
  },
  {
    id: 'st-q13',
    level: 2,
    questionTypeBadge: 'Rendezés y-ra',
    question: 'Mennyi a 3x − 2y = −6 egyenletű egyenes meredeksége?',
    options: ['3/2', '3', '−3/2', '2/3'],
    correctAnswer: 0,
    explanation: 'y-ra rendezve: −2y = −3x − 6, y = 3/2 x + 3, tehát m = 3/2. (Általában Ax + By = C esetén m = −A/B = −3/(−2).)'
  },
  {
    id: 'st-q14',
    level: 2,
    questionTypeBadge: 'Rendezés y-ra',
    question: 'Mennyi a 3x − 5y = 8 egyenletű egyenes iránytangense?',
    options: ['3/5', '−3/5', '3', '5/3'],
    correctAnswer: 0,
    explanation: '−5y = −3x + 8, y = 3/5 x − 8/5, így az iránytangens 3/5 = 0,6.'
  },
  {
    id: 'st-q15',
    level: 2,
    questionTypeBadge: 'Rendezés y-ra',
    question: 'Mennyi az x + 3y + 12 = 0 egyenletű egyenes meredeksége?',
    options: ['−1/3', '1/3', '−3', '3'],
    correctAnswer: 0,
    explanation: '3y = −x − 12, y = −1/3 x − 4, tehát m = −1/3 (irányszöge ≈ −18,43°).'
  },
  {
    id: 'st-q16',
    level: 2,
    questionTypeBadge: 'Irányszög',
    question: 'Mekkora az y = 4/5 x + 1 egyenletű egyenes irányszöge (két tizedesjegyre)?',
    options: ['≈ 38,66°', '≈ 51,34°', '≈ 36,87°', '0,8°'],
    correctAnswer: 0,
    explanation: 'tg α = m = 4/5 = 0,8, ezért α ≈ 38,66°. (51,34° a tg α = 5/4 megoldása lenne, 36,87° pedig a tg α = 0,75-é.)'
  },
  {
    id: 'st-q17',
    level: 2,
    questionTypeBadge: 'Irányszög',
    question: 'Egy egyenes iránytangense −4/7. Mekkora az irányszöge?',
    options: ['≈ −29,74°', '≈ 29,74°', '≈ −60,26°', '≈ −0,57°'],
    correctAnswer: 0,
    explanation: 'tg α = −4/7 ≈ −0,571, és −90° < α < 90°, így α ≈ −29,74°. A negatív előjel a csökkenő egyenest jelzi. (−60,26° a tg α = −7/4 megoldása.)'
  },
  {
    id: 'st-q18',
    level: 2,
    questionTypeBadge: 'Százalékos lejtő',
    figure: <RampFig run="100 m" rise="10 m" down />,
    question: 'A tábla 10%-os lejtőt jelez. Mekkora előjeles szöggel jellemezhetjük az út vízszintestől való eltérését?',
    options: ['≈ −5,71°', '−10°', '≈ −84,29°', '−0,1°'],
    correctAnswer: 0,
    explanation: 'A lejtő meredeksége −10/100 = −0,1. tg α = 0,1 ⇒ α ≈ 5,71°, a süllyedés miatt előjelesen −5,71°.'
  },
  {
    id: 'st-q19',
    level: 2,
    questionTypeBadge: 'Irányszög rácsról',
    figure: (
      <SlopeTangentPlane
        xMin={-1}
        xMax={7}
        yMin={-1}
        yMax={4}
        unit={28}
        className={FIG}
        lines={[{ p: [0, 0], q: [3, 1], color: BLUE, label: 'e', labelAt: 0.95, labelDy: -8 }]}
        points={[
          { at: [0, 0], color: RED },
          { at: [3, 1], color: RED }
        ]}
        angles={[{ at: [0, 0], p: [3, 0], q: [3, 1], r: 34, label: '?', color: PURPLE }]}
      />
    ),
    question: 'Az e egyenes átmegy az origón és a (3; 1) rácsponton. Mekkora az irányszöge?',
    options: ['≈ 18,43°', '≈ 71,57°', '≈ 33,33°', '≈ 0,33°'],
    correctAnswer: 0,
    explanation: 'm = 1/3, ezért tg α = 1/3 és α ≈ 18,43°. (71,57° a tg α = 3 megoldása – a koordináták felcserélésének hibája.)'
  },
  {
    id: 'st-q20',
    level: 2,
    questionTypeBadge: 'Pont az egyenesen',
    question: 'Egy egyenes meredeksége 2, és az y tengelyen lévő pontja P(0; −5). Melyik pont illeszkedik az egyenesre?',
    options: ['(3; 1)', '(1; −7)', '(2; 1)', '(−1; −3)'],
    correctAnswer: 0,
    explanation: 'Az egyenlet y = 2x − 5. Az x = 3 helyen y = 6 − 5 = 1, tehát (3; 1) rajta van. (1; −7): 2 − 5 = −3 ≠ −7; (2; 1): 4 − 5 = −1 ≠ 1; (−1; −3): −2 − 5 = −7 ≠ −3.'
  },

  // LEVEL 3: Alkalmazás (21–30)
  {
    id: 'st-q21',
    level: 3,
    questionTypeBadge: 'Támasztólétra',
    question: 'Egy támasztólétra hajlásszöge 60° és 70° között kell legyen. Milyen értékek közé esik a létra egyenesének m meredeksége (emelkedőnek tekintve)?',
    options: ['1,73 ≤ m ≤ 2,75', '0,36 ≤ m ≤ 0,58', '60 ≤ m ≤ 70', '0,87 ≤ m ≤ 0,94'],
    correctAnswer: 0,
    explanation: 'm = tg α, és nagyobb hegyesszögnek nagyobb a tangense: tg 60° ≈ 1,73 ≤ m ≤ tg 70° ≈ 2,75. (0,36–0,58 a pótszögek tangense, 0,87–0,94 a szinuszok.)'
  },
  {
    id: 'st-q22',
    level: 3,
    questionTypeBadge: 'Fokból százalék',
    question: 'Milyen egész számmal felírt, %-ban kifejezett adatot kell a veszélyes emelkedőt jelző táblára írni, ha az emelkedő 14°-os?',
    options: ['25%', '14%', '24%', '97%'],
    correctAnswer: 0,
    explanation: 'tg 14° ≈ 0,2493, ami ≈ 24,93%; egész számra kerekítve 25%. (A 24% helytelen kerekítés, a 97% a cos 14° értéke lenne.)'
  },
  {
    id: 'st-q23',
    level: 3,
    questionTypeBadge: 'Egyenlet felírása',
    question: 'Egy f egyenes átmegy az E(6; 0) ponton, és iránytangense 2/3. Mi az egyenlete?',
    options: ['y = 2/3 x − 4', 'y = 2/3 x + 6', 'y = 2/3 x − 6', 'y = 3/2 x − 9'],
    correctAnswer: 0,
    explanation: 'y − 0 = 2/3 (x − 6), azaz y = 2/3 x − 4. Ellenőrzés: x = 6 esetén y = 4 − 4 = 0.'
  },
  {
    id: 'st-q24',
    level: 3,
    questionTypeBadge: 'Távolság az origótól',
    figure: (
      <SlopeTangentPlane
        xMin={-2}
        xMax={8}
        yMin={-5}
        yMax={2}
        unit={24}
        ticks="all"
        tickStep={2}
        className={FIG}
        lines={[{ p: [6, 0], q: [0, -4], color: BLUE, label: 'f', labelAt: 0.9, labelDx: 6, labelDy: 6 }]}
        segs={[{ from: [0, 0], to: [24 / 13, -36 / 13], color: RED, dashed: true, label: 'd = ?', labelDx: -22, labelDy: 2 }]}
        angles={[{ at: [24 / 13, -36 / 13], p: [0, 0], q: [6, 0], right: true, r: 11 }]}
        points={[
          { at: [6, 0], label: 'E', dx: 2, dy: -6 },
          { at: [0, -4], color: BLUE }
        ]}
      />
    ),
    question: 'Az f: y = 2/3 x − 4 egyenes a tengelyeket a (6; 0) és a (0; −4) pontban metszi. Milyen távol van f az origótól?',
    options: ['≈ 3,33', '4', '6', '≈ 7,21'],
    correctAnswer: 0,
    explanation: 'A tengelymetszetek és az origó derékszögű háromszöget alkotnak, átfogója √(36 + 16) = √52 ≈ 7,21. A távolság az átfogóhoz tartozó magasság: d = 6 · 4 / √52 ≈ 3,33.'
  },
  {
    id: 'st-q25',
    level: 3,
    questionTypeBadge: 'Távolság az origótól',
    question: 'A k egyenes átmegy a K(8; 0) ponton, és iránytangense 0,75. Milyen távol van k az origótól?',
    options: ['4,8', '6', '10', '8'],
    correctAnswer: 0,
    explanation: 'k: y = 0,75(x − 8) = 0,75x − 6, a tengelymetszetek 8 és 6, az átfogó √(64 + 36) = 10. A távolság az átfogóhoz tartozó magasság: 8 · 6 / 10 = 4,8.'
  },
  {
    id: 'st-q26',
    level: 3,
    questionTypeBadge: 'Létra irányszöge',
    figure: (
      <SlopeTangentPlane
        xMin={-1}
        xMax={3}
        yMin={-1}
        yMax={4}
        unit={34}
        className={FIG}
        segs={[{ from: [0, 3], to: [0.8, 0], color: AMBER, width: 6 }]}
        points={[
          { at: [0, 3], label: '(0; 3)', color: RED, dx: 6, dy: -4 },
          { at: [0.8, 0], label: '(0,8; 0)', color: RED, dx: 6, dy: -6 }
        ]}
      />
    ),
    question: 'Az ábrán látható létra egyenese a (0; 3) és a (0,8; 0) ponton megy át. Mekkora az egyenes előjeles irányszöge?',
    options: ['≈ −75,1°', '≈ 75,1°', '≈ −14,9°', '−3,75°'],
    correctAnswer: 0,
    explanation: 'm = (0 − 3)/(0,8 − 0) = −3,75; tg α = −3,75 ⇒ α ≈ −75,1°. Az egyenes süllyedő, ezért negatív az irányszög. (−14,9° a függőlegessel bezárt szög lenne.)'
  },
  {
    id: 'st-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <SlopeTangentPlane
        xMin={-4}
        xMax={4}
        yMin={-4}
        yMax={4}
        unit={24}
        className={FIG}
        lines={[
          { p: [0, 0], q: [1, 2], color: BLUE, label: 'e', labelAt: 0.94, labelDx: 6 },
          { p: [0, -1], q: [2, 0], color: GREEN, label: 'f', labelAt: 0.95, labelDy: -8 },
          { p: [0, 1], q: [1, -2], color: RED, label: 'g', labelAt: 0.06, labelDx: 8, labelDy: 4 },
          { p: [-2, 0], q: [-2, 1], color: PURPLE, label: 'h', labelAt: 0.96, labelDx: 6 }
        ]}
      />
    ),
    question: 'Az ábrán négy egyenes látható. Melyiknek a legnagyobb a meredeksége?',
    options: ['e', 'h', 'g', 'f'],
    correctAnswer: 0,
    explanation: 'e meredeksége 2, f-é 1/2, g-é −3 (meredek, de csökkenő, így a legkisebb szám), h pedig függőleges, ezért nincs meredeksége. A legnagyobb tehát e-é.'
  },
  {
    id: 'st-q28',
    level: 3,
    questionTypeBadge: 'Irányszög az egyenletből',
    question: 'Melyik egyenletű egyenes irányszöge 45°?',
    options: ['x − y = 3', 'x + y = 3', '2x − y = 1', 'y = 45x'],
    correctAnswer: 0,
    explanation: 'x − y = 3 ⇔ y = x − 3, így m = 1 = tg 45°. x + y = 3 irányszöge −45° (m = −1), 2x − y = 1-é ≈ 63,43° (m = 2), az y = 45x egyenesé pedig ≈ 88,73°.'
  },
  {
    id: 'st-q29',
    level: 3,
    questionTypeBadge: 'Ismeretlen koordináta',
    question: 'A (−1; 2) és a (3; a) pontokon átmenő egyenes meredeksége −1/2. Mennyi a?',
    options: ['0', '4', '1', '−4'],
    correctAnswer: 0,
    explanation: 'Δx = 3 − (−1) = 4, így Δy = m · Δx = −1/2 · 4 = −2, tehát a = 2 − 2 = 0. (A 4 a pozitív meredekséggel kapott érték, az 1 a Δx = 2-vel számolt hibás eredmény.)'
  },
  {
    id: 'st-q30',
    level: 3,
    questionTypeBadge: 'Szögből pont',
    figure: (
      <SlopeTangentPlane
        xMin={-1}
        xMax={5}
        yMin={-1}
        yMax={3}
        unit={34}
        className={FIG}
        lines={[{ p: [0, 0], q: [3, Math.sqrt(3)], color: BLUE, label: 'e', labelAt: 0.95, labelDy: -8 }]}
        angles={[{ at: [0, 0], p: [3, 0], q: [3, Math.sqrt(3)], r: 40, label: '30°', color: PURPLE }]}
      />
    ),
    question: 'Az origón átmenő e egyenes irányszöge 30°. Melyik pont illeszkedik rá?',
    options: ['(3; √3)', '(√3; 3)', '(3; 1,5)', '(2; 1)'],
    correctAnswer: 0,
    explanation: 'm = tg 30° = √3/3, így e: y = √3/3 · x. x = 3 esetén y = √3. (A (√3; 3) pont a 60°-os egyenesre illeszkedik; 1,5/3 = 0,5 és 1/2 = 0,5 nem egyenlő √3/3 ≈ 0,577-del.)'
  }
];

export const SlopeTangentQuiz: React.FC<{
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
      topicId="g11-geo-meredekseg-quiz"
      subtopicId="meredekseg-iranytangens"
      title="13. Meredekség, iránytangens – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: meredekség két pontból és az egyenletből, irányszög, százalékos emelkedő."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={SLOPE_TANGENT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Meredekség',
          items: [
            'm = Δy / Δx = (y₂ − y₁)/(x₂ − x₁)',
            'y = mx + b: m a meredekség, (0; b) az y tengelyen.',
            'Ax + By = C (B ≠ 0): m = −A/B.',
            'x = c: függőleges, nincs meredeksége.'
          ]
        },
        {
          title: 'Irányszög',
          items: [
            'Előjeles szög az x tengely pozitív félegyenesével: −90° < α < 90°.',
            'm = tg α (iránytangens, iránytényező).',
            'm > 0: emelkedő; m < 0: csökkenő; m = 0: vízszintes.',
            'tg 45° = 1, tg 30° = √3/3, tg 60° = √3.'
          ]
        },
        {
          title: 'Emelkedő, lejtő',
          items: [
            '12% ⇒ m = 0,12 ⇒ α ≈ 6,84°.',
            '10%-os lejtő ⇒ m = −0,1 ⇒ α ≈ −5,71°.',
            '14° ⇒ tg 14° ≈ 0,2493 ≈ 25%.',
            '100% = 45°, nem 90°!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SlopeTangentMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SlopeTangentSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SlopeTangentQuiz;
