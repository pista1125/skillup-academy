import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AlgebraSummaryMatcher } from './AlgebraSummaryMatcher';
import { AlgebraSummarySorter } from './AlgebraSummarySorter';
import { PlotBox, Axes, curvePath, mapX, mapY, L_BLUE, L_RED, L_AMBER, L_GREEN, L_INK } from './plotKit';

const QSVG: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 170 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const FIG_SQUARE = (
  <QSVG h={150}>
    <rect x="40" y="20" width="70" height="70" fill="#dbeafe" stroke={L_BLUE} />
    <rect x="110" y="20" width="40" height="70" fill="#fde68a" stroke={L_AMBER} />
    <rect x="40" y="90" width="70" height="40" fill="#fde68a" stroke={L_AMBER} />
    <rect x="110" y="90" width="40" height="40" fill="#dcfce7" stroke={L_GREEN} />
    <text x="75" y="16" fontSize="10" textAnchor="middle" fill={L_INK}>a</text>
    <text x="130" y="16" fontSize="10" textAnchor="middle" fill={L_INK}>b</text>
    <text x="32" y="58" fontSize="10" textAnchor="middle" fill={L_INK}>a</text>
    <text x="32" y="114" fontSize="10" textAnchor="middle" fill={L_INK}>b</text>
    <text x="195" y="80" fontSize="12" textAnchor="middle" fill={L_RED} fontWeight="bold">(a + b)² = ?</text>
  </QSVG>
);

const B_SYS: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -5, xmax: 5, ymin: -2, ymax: 5 };
const FIG_SYS = (
  <QSVG>
    <Axes b={B_SYS} />
    <path d={curvePath(B_SYS, (x) => (4 * x + 10) / 3)} fill="none" stroke={L_BLUE} strokeWidth="2" />
    <path d={curvePath(B_SYS, (x) => (10 - 2 * x) / 6)} fill="none" stroke={L_RED} strokeWidth="2" />
    <circle cx={mapX(B_SYS, -1)} cy={mapY(B_SYS, 2)} r="4" fill={L_GREEN} />
    <text x={mapX(B_SYS, -1) - 6} y={mapY(B_SYS, 2) - 7} fontSize="11" fontWeight="bold" textAnchor="end" fill={L_GREEN}>?</text>
  </QSVG>
);

const B_PAR: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -4, xmax: 7, ymin: -42, ymax: 20 };
const FIG_PAR = (
  <QSVG>
    <Axes b={B_PAR} stepX={1} stepY={10} />
    <path d={curvePath(B_PAR, (x) => 3 * x * x - 8 * x - 35)} fill="none" stroke={L_BLUE} strokeWidth="2" />
    <text x="150" y="30" fontSize="10" fill={L_BLUE} fontWeight="bold">y = 3x² − 8x − 35</text>
  </QSVG>
);

const B_ROOT: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -1, xmax: 16, ymin: -7, ymax: 10 };
const FIG_ROOT = (
  <QSVG>
    <Axes b={B_ROOT} stepX={2} stepY={2} />
    <path d={curvePath(B_ROOT, (x) => (4 * x - 3 >= 0 ? Math.sqrt(4 * x - 3) : NaN), 0.75, 16)} fill="none" stroke={L_BLUE} strokeWidth="2" />
    <path d={curvePath(B_ROOT, (x) => x - 6)} fill="none" stroke={L_RED} strokeWidth="2" />
    <text x="30" y="28" fontSize="10" fill={L_BLUE} fontWeight="bold">y = √(4x − 3)</text>
    <text x="30" y="42" fontSize="10" fill={L_RED} fontWeight="bold">y = x − 6</text>
  </QSVG>
);

export const ALGEBRA_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'al-q1',
    questionTypeBadge: 'Nevezetes azonosság',
    figure: FIG_SQUARE,
    level: 1,
    question: 'Mivel egyenlő (a + b)²?',
    options: ['a² + 2ab + b²', 'a² + b²', 'a² + ab + b²', '2a + 2b'],
    correctAnswer: 0,
    explanation: 'A nagy négyzet egy a², egy b² és két ab területű részből áll.'
  },
  {
    id: 'al-q2',
    questionTypeBadge: 'Nevezetes azonosság',
    level: 1,
    question: 'Mivel egyenlő (x − 3)(x + 3)?',
    options: ['x² − 9', 'x² + 9', 'x² − 6x − 9', 'x² − 6x + 9'],
    correctAnswer: 0,
    explanation: '(a + b)(a − b) = a² − b², így x² − 3² = x² − 9.'
  },
  {
    id: 'al-q3',
    questionTypeBadge: 'Szorzattá alakítás',
    level: 1,
    question: 'Melyik a 3x² − 12x kifejezés szorzat alakja?',
    options: ['3x(x − 4)', '3x(x − 12)', 'x(3x − 4)', '3(x − 2)²'],
    correctAnswer: 0,
    explanation: 'Kiemelünk 3x-et: 3x · x − 3x · 4 = 3x² − 12x.'
  },
  {
    id: 'al-q4',
    questionTypeBadge: 'Másodfokú egyenlet',
    level: 1,
    question: 'Mi a 3x² − 12 = 0 egyenlet megoldáshalmaza a valós számok halmazán?',
    options: ['{2; −2}', '{2}', '{4}', '{0; 4}'],
    correctAnswer: 0,
    explanation: '3(x − 2)(x + 2) = 0 ⇒ x = 2 vagy x = −2. (x² = 4-nek két gyöke van!)'
  },
  {
    id: 'al-q5',
    questionTypeBadge: 'Diszkrimináns',
    level: 1,
    question: 'Hány valós gyöke van a −2x² + 4x − 3 = 0 egyenletnek?',
    options: ['0', '1', '2', 'végtelen sok'],
    correctAnswer: 0,
    explanation: 'D = 4² − 4 · (−2) · (−3) = 16 − 24 = −8 < 0, tehát nincs valós gyöke.'
  },
  {
    id: 'al-q6',
    questionTypeBadge: 'Megoldóképlet',
    level: 1,
    question: 'Melyik az ax² + bx + c = 0 (a ≠ 0) egyenlet megoldóképlete?',
    options: ['x₁,₂ = (−b ± √(b² − 4ac)) / (2a)', 'x₁,₂ = (b ± √(b² − 4ac)) / (2a)', 'x₁,₂ = (−b ± √(b² + 4ac)) / (2a)', 'x₁,₂ = (−b ± √(b² − 4ac)) / a'],
    correctAnswer: 0,
    explanation: 'A gyökjel alatt a diszkrimináns, D = b² − 4ac áll; a nevező 2a.'
  },
  {
    id: 'al-q7',
    questionTypeBadge: 'Gyökös egyenlet',
    level: 1,
    question: 'Hány valós megoldása van a √(3 − 7x) = −2 egyenletnek?',
    options: ['0', '1 (x = −1/7)', '2', 'végtelen sok'],
    correctAnswer: 0,
    explanation: 'Valós szám négyzetgyöke nemnegatív, nem lehet −2. (A négyzetre emeléssel kapott x = −1/7 hamis gyök: √4 = 2 ≠ −2.)'
  },
  {
    id: 'al-q8',
    questionTypeBadge: 'Ekvivalens átalakítás',
    level: 1,
    question: 'Melyik átalakítás NEM feltétlenül ekvivalens?',
    options: ['mindkét oldal szorzása x-szel', 'mindkét oldalhoz 5 hozzáadása', 'mindkét oldal osztása 3-mal', 'mindkét oldalból 2x kivonása'],
    correctAnswer: 0,
    explanation: 'Ha x = 0 is lehet, az ismeretlennel szorzás hamis gyököt hozhat be. A mérlegelv többi lépése ekvivalens.'
  },
  {
    id: 'al-q9',
    questionTypeBadge: 'Elsőfokú egyenlet',
    level: 1,
    question: 'Oldd meg: 4x − 3 = 2x + 7.',
    options: ['x = 5', 'x = 2', 'x = −5', 'x = 2,5'],
    correctAnswer: 0,
    explanation: 'Mérlegelv: 2x = 10 ⇒ x = 5. Ellenőrzés: 17 = 17 ✓.'
  },
  {
    id: 'al-q10',
    questionTypeBadge: 'Egyenletrendszer',
    figure: FIG_SYS,
    level: 1,
    question: 'Melyik számpár megoldása a 4x − 3y = −10, 2x + 6y = 10 egyenletrendszernek?',
    options: ['(−1; 2)', '(2; −1)', '(1; 2)', '(−1; −2)'],
    correctAnswer: 0,
    explanation: 'Az első egyenlet kétszereséhez adva a másodikat: 10x = −10 ⇒ x = −1, majd 6y = 12 ⇒ y = 2.'
  },
  // ---------- 2. szint ----------
  {
    id: 'al-q11',
    questionTypeBadge: 'Általános alak',
    level: 2,
    question: 'Írd ax² + bx + c alakba: (2x − 1)² − 3x(2x − 4).',
    options: ['−2x² + 8x + 1', '−2x² − 16x + 1', '10x² − 16x + 1', '−2x² + 8x − 1'],
    correctAnswer: 0,
    explanation: '4x² − 4x + 1 − 6x² + 12x = −2x² + 8x + 1.'
  },
  {
    id: 'al-q12',
    questionTypeBadge: 'Helyettesítési érték',
    level: 2,
    question: 'Mennyi a −2x² + 8x + 1 kifejezés értéke x = −1/2 esetén?',
    options: ['−3,5', '4,5', '−2,5', '5,5'],
    correctAnswer: 0,
    explanation: '−2 · 1/4 + 8 · (−1/2) + 1 = −0,5 − 4 + 1 = −3,5.'
  },
  {
    id: 'al-q13',
    questionTypeBadge: 'Gyöktényezős alak',
    level: 2,
    question: 'Melyik a 3x² − 2x − 1 gyöktényezős alakja?',
    options: ['3(x − 1)(x + 1/3)', '(x − 1)(x + 1/3)', '3(x + 1)(x − 1/3)', '(3x − 1)(x + 1)'],
    correctAnswer: 0,
    explanation: 'A gyökök x₁ = 1 és x₂ = −1/3; a(x − x₁)(x − x₂) = 3(x − 1)(x + 1/3). (Az a = 3 szorzó nem maradhat le.)'
  },
  {
    id: 'al-q14',
    questionTypeBadge: 'Másodfokú egyenlet',
    level: 2,
    question: 'Oldd meg a valós számok halmazán: (2x − 1)(2x + 1) = 8.',
    options: ['{−3/2; 3/2}', '{3/2}', '{9/4}', '{−2; 2}'],
    correctAnswer: 0,
    explanation: '4x² − 1 = 8 ⇒ x² = 9/4 ⇒ x = ±3/2.'
  },
  {
    id: 'al-q15',
    questionTypeBadge: 'Szöveges egyenlet',
    level: 2,
    question: 'Antal édesanyja most 3,5-szer annyi idős, mint Antal. 8 év múlva életkoraik hányadosa 2,5 lesz. Hány éves most Antal?',
    options: ['12', '8', '16', '42'],
    correctAnswer: 0,
    explanation: '(3,5a + 8) / (a + 8) = 2,5 ⇒ 3,5a + 8 = 2,5a + 20 ⇒ a = 12 (az anya 42 éves).'
  },
  {
    id: 'al-q16',
    questionTypeBadge: 'Értelmezési tartomány',
    level: 2,
    question: 'Mely valós x-ekre értelmezett az lg(7 − 3x) kifejezés?',
    options: ['x < 7/3', 'x ≤ 7/3', 'x > 7/3', 'x < 3/7'],
    correctAnswer: 0,
    explanation: 'A logaritmus csak pozitív számra értelmezett: 7 − 3x > 0 ⇒ x < 7/3.'
  },
  {
    id: 'al-q17',
    questionTypeBadge: 'Exponenciális egyenlet',
    level: 2,
    question: 'Oldd meg: 3ˣ · 9⁻ˣ = 27 · (1/3)²ˣ.',
    options: ['x = 3', 'x = −3', 'x = 1', 'x = 1/3'],
    correctAnswer: 0,
    explanation: 'Közös alap: 3ˣ⁻²ˣ = 3³ · 3⁻²ˣ ⇒ −x = 3 − 2x ⇒ x = 3.'
  },
  {
    id: 'al-q18',
    questionTypeBadge: 'Logaritmusos egyenlőtlenség',
    level: 2,
    question: 'Mi az lg(5 − 6x) ≤ −2 egyenlőtlenség megoldáshalmaza?',
    options: ['[499/600; 5/6[', ']−∞; 499/600]', ']499/600; 5/6]', '[499/600; ∞['],
    correctAnswer: 0,
    explanation: 'Értelmezés: x < 5/6. Az lg nő: 5 − 6x ≤ 0,01 ⇒ x ≥ 499/600. A kettő együtt: [499/600; 5/6[.'
  },
  {
    id: 'al-q19',
    questionTypeBadge: 'Egyenlőtlenség egészeken',
    level: 2,
    question: 'Mely egész számok teszik igazzá: (x − 1)² + (x − 3)(x + 3) ≤ 4?',
    options: ['{−2; −1; 0; 1; 2; 3}', '{−1; 0; 1; 2}', '{−3; −2; −1; 0; 1; 2}', '{−2; 3}'],
    correctAnswer: 0,
    explanation: '2x² − 2x − 8 ≤ 4 ⇒ x² − x − 6 ≤ 0 ⇒ (x + 2)(x − 3) ≤ 0 ⇒ −2 ≤ x ≤ 3.'
  },
  {
    id: 'al-q20',
    questionTypeBadge: 'Szöveges egyenlet',
    level: 2,
    question: 'Fejenként 12 000 Ft-ot szednek, így 4000 Ft hiányzik; 13 000 Ft-tal 4000 Ft-tal több gyűlne össze a szükségesnél. Hány fős a társaság?',
    options: ['8', '4', '12', '9'],
    correctAnswer: 0,
    explanation: '12 000n + 4000 = 13 000n − 4000 ⇒ 1000n = 8000 ⇒ n = 8 (a költség 100 000 Ft).'
  },
  // ---------- 3. szint ----------
  {
    id: 'al-q21',
    questionTypeBadge: 'Másodfokú egyenlőtlenség',
    figure: FIG_PAR,
    level: 3,
    question: 'Mi a 3x² − 8x − 35 < 0 egyenlőtlenség megoldáshalmaza az egész számok halmazán?',
    options: ['{−2; −1; 0; 1; 2; 3; 4}', '{−2; −1; 0; 1; 2; 3; 4; 5}', '{−3; −2; −1; 0; 1; 2; 3; 4}', '{−1; 0; 1; 2; 3; 4}'],
    correctAnswer: 0,
    explanation: 'Gyökök: −7/3 ≈ −2,33 és 5; a parabola felfelé nyitott, a gyökök között negatív. Egészek: −2-től 4-ig (az 5 nem, mert ott 0).'
  },
  {
    id: 'al-q22',
    questionTypeBadge: 'Gyökös egyenlet',
    figure: FIG_ROOT,
    level: 3,
    question: 'Mi a √(4x − 3) = x − 6 egyenlet megoldáshalmaza?',
    options: ['{13}', '{3; 13}', '{3}', '∅'],
    correctAnswer: 0,
    explanation: 'Négyzetre emelve x² − 16x + 39 = 0 ⇒ x = 3 vagy 13. x = 3-nál a jobb oldal −3 < 0: hamis gyök. M = {13}.'
  },
  {
    id: 'al-q23',
    questionTypeBadge: 'Egyenletrendszer',
    level: 3,
    question: 'Ha az Egyik Kft. vállalásának 4/5-ét, a Másik 110%-át teljesíti, 4300 darab készül; ha az Egyik 5/6-ot, a Másik 105%-ot, akkor 4230. Mennyit vállaltak eredetileg?',
    options: ['1800 és 2600 darabot', '2600 és 1800 darabot', '2000 és 2400 darabot', '1500 és 2730 darabot'],
    correctAnswer: 0,
    explanation: '0,8x + 1,1y = 4300 és (5/6)x + 1,05y = 4230 ⇒ y = 2600, x = 1800. (1500 és 2730 a második változat teljesítése.)'
  },
  {
    id: 'al-q24',
    questionTypeBadge: 'Exponenciális egyenlőtlenség',
    level: 3,
    question: 'Oldd meg a valós számok halmazán: 0,3⁴ˣ⁻¹ < 0,09⁻³.',
    options: ['x > −5/4', 'x < −5/4', 'x > −1/2', 'x < 5/4'],
    correctAnswer: 0,
    explanation: '0,09⁻³ = 0,3⁻⁶; a 0,3 alapú exponenciális függvény csökkenő, a reláció megfordul: 4x − 1 > −6 ⇒ x > −5/4.'
  },
  {
    id: 'al-q25',
    questionTypeBadge: 'Esetszétválasztás',
    level: 3,
    question: 'Melyek az xˣ⁺³ = x⁷ egyenlet valós gyökei?',
    options: ['0; 1; 4', 'csak 4', '1 és 4', '−1; 0; 1; 4'],
    correctAnswer: 0,
    explanation: 'x > 0: x = 1 vagy x + 3 = 7 ⇒ x = 4; x = 0 is jó (0 = 0); x = −1: 1 ≠ −1, nem gyök.'
  },
  {
    id: 'al-q26',
    questionTypeBadge: 'Gyökös egyenlet',
    level: 3,
    question: 'Oldd meg a negatív valós számok halmazán: √(2x + 11) = x + 4.',
    options: ['x = −1', 'x = −5', 'x = −1 és x = −5', 'nincs megoldás'],
    correctAnswer: 0,
    explanation: 'Négyzetre emelve x² + 6x + 5 = 0 ⇒ x = −1 vagy −5. x = −5-nél a jobb oldal −1 < 0: hamis gyök.'
  },
  {
    id: 'al-q27',
    questionTypeBadge: 'Egyenletrendszer',
    level: 3,
    question: '5 doboz macska- és 3 doboz kutyaeledel 2250 Ft. A macskaeledel 20%-kal olcsóbb, a kutyaeledel 10%-kal drágább lett, a 8 doboz ára így is 2250 Ft. Mennyibe került eredetileg egy-egy doboz?',
    options: ['macska 150 Ft, kutya 500 Ft', 'macska 500 Ft, kutya 150 Ft', 'macska 180 Ft, kutya 450 Ft', 'macska 225 Ft, kutya 375 Ft'],
    correctAnswer: 0,
    explanation: '5m + 3k = 2250 és 4m + 3,3k = 2250 ⇒ m = 0,3k ⇒ 4,5k = 2250 ⇒ k = 500, m = 150. (A 180/450 csak az első egyenletet teljesíti.)'
  },
  {
    id: 'al-q28',
    questionTypeBadge: 'Életkoros feladat',
    level: 3,
    question: 'A kapitány és a kormányos életkorának összege 92 év. Amikor az összeg megduplázódik, a kapitány 4 év híján 100 éves lesz. Hány évesek most?',
    options: ['50 és 42', '48 és 44', '54 és 38', '46 és 46'],
    correctAnswer: 0,
    explanation: 'A duplázódásig mindketten 46 évet öregszenek (92 + 2 · 46 = 184). A kapitány ekkor 96, most 50; a kormányos 42.'
  },
  {
    id: 'al-q29',
    questionTypeBadge: 'Mozgásos feladat',
    level: 3,
    question: 'Egy hajó délben 35 km/h-val indul, egy másik 45 perccel később ugyanonnan, ugyanarra 45 km/h-val. A második indulása után hány órával éri utol az elsőt?',
    options: ['2,625 óra', '3,375 óra', '0,75 óra', '1,5 óra'],
    correctAnswer: 0,
    explanation: 'Előny: 35 · 0,75 = 26,25 km; közeledés 10 km/h ⇒ 2,625 óra (ekkor 118,125 km-re vannak a kikötőtől).'
  },
  {
    id: 'al-q30',
    questionTypeBadge: 'Exponenciális egyenlet',
    level: 3,
    question: 'A légnyomás h km magasan p = 10⁵ · 2,718^{-0,1275h} Pa. Milyen magasan lesz 0,9 · 10⁵ Pa?',
    options: ['≈ 0,83 km', '≈ 0,08 km', '≈ 8,26 km', '≈ 0,36 km'],
    correctAnswer: 0,
    explanation: '0,9 = 2,718^{-0,1275h} ⇒ h = lg(1/0,9) / (0,1275 · lg 2,718) ≈ 0,83 km. (0,36: a lg 2,718-cal való osztás elmaradt.)'
  }
];

export const AlgebraSummaryQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId="g12-sum-algebra-quiz"
      subtopicId="algebra"
      title="4. Algebra – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: azonosságok, szorzattá alakítás, egyenletek, egyenlőtlenségek, egyenletrendszerek, szöveges feladatok."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={ALGEBRA_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Azonosságok',
          items: ['(a ± b)² = a² ± 2ab + b²', '(a + b)(a − b) = a² − b²', 'először kiemelés!', 'ax² + bx + c = a(x − x₁)(x − x₂)']
        },
        {
          title: 'Másodfokú',
          items: ['x₁,₂ = (−b ± √D) / (2a)', 'D = b² − 4ac', 'D > 0: 2, D = 0: 1, D < 0: 0 gyök', 'egyenlőtlenség: parabola + zérushelyek']
        },
        {
          title: 'Ellenőrzés',
          items: ['négyzetre emelés után: hamis gyök?', 'gyök alatt ≥ 0, √ értéke ≥ 0', 'lg csak pozitív számra', '0 < a < 1 alapnál a reláció fordul']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AlgebraSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <AlgebraSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default AlgebraSummaryQuiz;
