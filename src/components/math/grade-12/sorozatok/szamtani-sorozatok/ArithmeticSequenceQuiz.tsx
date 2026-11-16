import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ArithmeticSequenceMatcher } from './ArithmeticSequenceMatcher';
import { ArithmeticSequenceSorter } from './ArithmeticSequenceSorter';
import { SeqChain, SeqPlot, S_BLUE, S_RED, S_INK, S_PURPLE } from './seqKit';

const FIG_Q1 = <SeqChain terms={['4', '7', '10', '13', 'a₅ = ?']} ops="+3" />;

/** Kis hatszöges ábra: az első két kör, a harmadik helyén kérdőjel. */
const FIG_HEX = (() => {
  const R = 11;
  const cx = 95;
  const cy = 80;
  const cols = ['#ffffff', '#fbcfe8', '#bfdbfe'];
  const hexes: React.ReactNode[] = [];
  for (let q = -2; q <= 2; q++)
    for (let r = -2; r <= 2; r++) {
      const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
      if (ring > 2) continue;
      const x = cx + R * Math.sqrt(3) * (q + r / 2);
      const y = cy + R * 1.5 * r;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const t = (Math.PI / 180) * (60 * i - 30);
        return `${x + R * Math.cos(t)},${y + R * Math.sin(t)}`;
      }).join(' ');
      hexes.push(<polygon key={`${q},${r}`} points={pts} fill={cols[ring]} stroke="#475569" strokeWidth="0.8" />);
    }
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="238" height="158" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {hexes}
      <text x="170" y="60" fontSize="10.5" fill="#db2777" fontWeight="bold">1. kör: 6</text>
      <text x="170" y="80" fontSize="10.5" fill={S_BLUE} fontWeight="bold">2. kör: 12</text>
      <text x="170" y="100" fontSize="10.5" fill={S_RED} fontWeight="bold">k-adik kör: ?</text>
    </svg>
  );
})();

const FIG_Q9 = (
  <svg viewBox="0 0 240 100" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="98" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="20" x2="220" y1="55" y2="55" stroke={S_INK} />
    {[60, 120, 180].map((x, i) => (
      <g key={x}>
        <circle cx={x} cy="55" r="5" fill={i === 1 ? S_RED : S_BLUE} />
        <text x={x} y="80" fontSize="11" textAnchor="middle" fill={S_INK}>
          {['a − d', 'a = ?', 'a + d'][i]}
        </text>
      </g>
    ))}
    <text x="120" y="30" fontSize="11" textAnchor="middle" fill={S_PURPLE} fontWeight="bold">
      összeg: 36
    </text>
  </svg>
);

const FIG_Q17 = (
  <svg viewBox="0 0 240 90" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="88" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="15" x2="225" y1="50" y2="50" stroke={S_INK} />
    {[12, 13, 14, 15].map((n, i) => (
      <g key={n}>
        <circle cx={50 + i * 46} cy="50" r={i === 0 || i === 3 ? 5 : 3} fill={i === 0 || i === 3 ? S_BLUE : '#94a3b8'} />
        <text x={50 + i * 46} y="72" fontSize="10" textAnchor="middle" fill="#475569">
          a{['₁₂', '₁₃', '₁₄', '₁₅'][i]}
        </text>
      </g>
    ))}
    <text x="50" y="34" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">40</text>
    <text x="188" y="34" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">46</text>
    <text x="119" y="30" fontSize="11" textAnchor="middle" fill={S_RED} fontWeight="bold">d = ?</text>
  </svg>
);

const FIG_Q24 = (
  <svg viewBox="0 0 240 90" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="88" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="15" x2="225" y1="45" y2="45" stroke={S_INK} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <circle cx={30 + i * 36} cy="45" r={i === 0 || i === 5 ? 5.5 : 4} fill={i === 0 || i === 5 ? S_BLUE : '#cbd5e1'} />
        <text x={30 + i * 36} y="68" fontSize="11" textAnchor="middle" fill={i === 0 || i === 5 ? S_BLUE : S_RED} fontWeight="bold">
          {i === 0 ? '5' : i === 5 ? '8' : '?'}
        </text>
      </g>
    ))}
  </svg>
);

const FIG_Q30 = <SeqPlot values={[2, 5, 8, 11, 14, 17, 20, 23, 26, 29]} highlight={[3, 6, 9]} />;

const ARITHMETIC_SEQUENCE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as-q1',
    questionTypeBadge: 'n-edik tag',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy számtani sorozat első tagja 4, differenciája 3. Mennyi az 5. tag?',
    options: ['16', '19', '15', '12'],
    correctAnswer: 0,
    explanation: 'a₅ = a₁ + 4d = 4 + 4 · 3 = 16. (A 19 az a₁ + 5d hibás képletből jönne.)'
  },
  {
    id: 'as-q2',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Melyik számtani sorozat kezdete?',
    options: ['3; 7; 11; 15; …', '2; 4; 8; 16; …', '1; 4; 9; 16; …', '1; −1; 1; −1; …'],
    correctAnswer: 0,
    explanation: 'Csak a 3; 7; 11; 15 esetén állandó a szomszédos tagok különbsége (d = 4).'
  },
  {
    id: 'as-q3',
    questionTypeBadge: 'Differencia',
    level: 1,
    question: 'Mennyi a 20; 17; 14; 11; … számtani sorozat differenciája?',
    options: ['−3', '3', '−17', '20'],
    correctAnswer: 0,
    explanation: 'd = a₂ − a₁ = 17 − 20 = −3; a sorozat csökkenő.'
  },
  {
    id: 'as-q4',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a számtani sorozat n-edik tagjának képlete?',
    options: ['aₙ = a₁ + (n − 1)d', 'aₙ = a₁ + nd', 'aₙ = a₁ · dⁿ⁻¹', 'aₙ = (a₁ + d) · n'],
    correctAnswer: 0,
    explanation: 'Az első taghoz (n − 1)-szer adjuk hozzá a differenciát.'
  },
  {
    id: 'as-q5',
    questionTypeBadge: 'Első tag',
    level: 1,
    question: 'A 33-nál nagyobb páros számokat növekvő sorba állítva számtani sorozatot kapunk. Melyik az első tagja?',
    options: ['34', '33', '35', '36'],
    correctAnswer: 0,
    explanation: 'A 33-nál nagyobb legkisebb páros szám a 34.'
  },
  {
    id: 'as-q6',
    questionTypeBadge: 'Differencia',
    level: 1,
    question: 'Mennyi a 33-nál nagyobb páros számok növekvő sorozatának differenciája?',
    options: ['2', '1', '34', '33'],
    correctAnswer: 0,
    explanation: 'Két szomszédos páros szám különbsége 2.'
  },
  {
    id: 'as-q7',
    questionTypeBadge: 'Modell',
    level: 1,
    question: 'A gabonatermelés modellje: 1960-ban 824 millió tonna, évente 27 millió tonnával több. Mennyi a modell szerint az 1970-es termelés?',
    options: ['1094 millió tonna', '1067 millió tonna', '1121 millió tonna', '8510 millió tonna'],
    correctAnswer: 0,
    explanation: '1970 a 11. év (n = 11): a₁₁ = 824 + 10 · 27 = 1094.'
  },
  {
    id: 'as-q8',
    questionTypeBadge: 'Hatszöges burkolás',
    figure: FIG_HEX,
    level: 1,
    question: 'A főtér hatszöglapjainak „köreiben” belülről kifelé 6; 12; … lap van. Hány lap van a 3. körben?',
    options: ['18', '24', '16', '36'],
    correctAnswer: 0,
    explanation: 'Számtani sorozat a₁ = 6, d = 6: a₃ = 6 + 2 · 6 = 18.'
  },
  {
    id: 'as-q9',
    questionTypeBadge: 'Szimmetrikus jelölés',
    figure: FIG_Q9,
    level: 1,
    question: 'Egy számtani sorozat három egymást követő tagjának összege 36. Mennyi a középső tag?',
    options: ['12', '18', '9', '36'],
    correctAnswer: 0,
    explanation: '(a − d) + a + (a + d) = 3a = 36 ⇒ a = 12.'
  },
  {
    id: 'as-q10',
    questionTypeBadge: 'Növekedés',
    level: 1,
    question: 'Milyen a számtani sorozat, ha d < 0?',
    options: ['(szigorúan) csökkenő', '(szigorúan) növő', 'konstans', 'váltakozó előjelű'],
    correctAnswer: 0,
    explanation: 'aₙ − aₙ₋₁ = d < 0, így minden tag kisebb az előzőnél.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'as-q11',
    questionTypeBadge: 'n-edik tag',
    level: 2,
    question: 'Melyik szám a 33-nál nagyobb páros számok növekvő sorozatának 77. tagja?',
    options: ['186', '188', '184', '154'],
    correctAnswer: 0,
    explanation: 'a₇₇ = 34 + 76 · 2 = 186.'
  },
  {
    id: 'as-q12',
    questionTypeBadge: 'Hányadik tag?',
    level: 2,
    question: 'Hányadik tagja a 33-nál nagyobb páros számok növekvő sorozatának az 1948?',
    options: ['a 958.', 'a 957.', 'a 974.', 'a 959.'],
    correctAnswer: 0,
    explanation: '1948 = 34 + (n − 1) · 2 ⇒ n − 1 = 957 ⇒ n = 958.'
  },
  {
    id: 'as-q13',
    questionTypeBadge: 'Szimmetrikus jelölés',
    level: 2,
    question: 'Egy számtani sorozat 10., 11. és 12. tagjának összege 63. Mennyi a 11. tag?',
    options: ['21', '63', '31,5', '20'],
    correctAnswer: 0,
    explanation: 'a₁₀ + a₁₁ + a₁₂ = (a₁₁ − d) + a₁₁ + (a₁₁ + d) = 3a₁₁ = 63 ⇒ a₁₁ = 21.'
  },
  {
    id: 'as-q14',
    questionTypeBadge: 'Első tag',
    level: 2,
    question: 'Egy számtani sorozatban a₁₁ = 21 és d = 5. Mennyi az első tag?',
    options: ['−29', '−34', '71', '−24'],
    correctAnswer: 0,
    explanation: 'a₁ = a₁₁ − 10d = 21 − 50 = −29.'
  },
  {
    id: 'as-q15',
    questionTypeBadge: 'Differencia',
    level: 2,
    question: 'A {bₙ} számtani sorozatban b₇ − b₁ = 24. Mennyi a differencia?',
    options: ['4', '24/7', '6', '3'],
    correctAnswer: 0,
    explanation: 'b₇ − b₁ = 6d = 24 ⇒ d = 4.'
  },
  {
    id: 'as-q16',
    questionTypeBadge: 'Első tag',
    level: 2,
    question: 'A {bₙ} számtani sorozatban b₇ − b₁ = 24 és b₇ + b₁ = 4. Mennyi b₁?',
    options: ['−10', '14', '2', '−14'],
    correctAnswer: 0,
    explanation: 'Összeadva: 2b₇ = 28 ⇒ b₇ = 14; kivonva: 2b₁ = −20 ⇒ b₁ = −10.'
  },
  {
    id: 'as-q17',
    questionTypeBadge: 'Két tagból',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy számtani sorozatban a₁₂ = 40 és a₁₅ = 46. Mennyi a differencia?',
    options: ['2', '6', '3', '1'],
    correctAnswer: 0,
    explanation: 'a₁₅ − a₁₂ = 3d = 6 ⇒ d = 2.'
  },
  {
    id: 'as-q18',
    questionTypeBadge: 'Szöveges feladat',
    level: 2,
    question: 'Tibor havonta 100 Ft-tal többet tesz a perselybe, mint előző hónapban; április–június között összesen 8100 Ft-ot. Mennyit tett be januárban?',
    options: ['2300 Ft', '2400 Ft', '2700 Ft', '2200 Ft'],
    correctAnswer: 0,
    explanation: 'Május: 3c = 8100 ⇒ c = 2700; január 4 hónappal korábban: 2700 − 400 = 2300 Ft.'
  },
  {
    id: 'as-q19',
    questionTypeBadge: 'Hatszöges burkolás',
    figure: FIG_HEX,
    level: 2,
    question: 'Hány hatszöglap van a belülről számított 12. „körben” (1. kör: 6, 2. kör: 12, …)?',
    options: ['72', '66', '78', '12'],
    correctAnswer: 0,
    explanation: 'aₖ = 6k ⇒ a₁₂ = 72.'
  },
  {
    id: 'as-q20',
    questionTypeBadge: 'Hatszöges burkolás',
    level: 2,
    question: 'Hány kőlappal van több a 20. „körben”, mint a 15. „körben” (d = 6)?',
    options: ['30', '5', '36', '6'],
    correctAnswer: 0,
    explanation: 'a₂₀ − a₁₅ = 5d = 30.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'as-q21',
    questionTypeBadge: 'Hányadik tag?',
    level: 3,
    question: 'Egy számtani sorozat 28. tagja 96, 32. tagja 112. Hányadik tagja a sorozatnak a 192?',
    options: ['a 52.', 'a 51.', 'a 48.', 'a 56.'],
    correctAnswer: 0,
    explanation: '4d = 16 ⇒ d = 4; 192 − 96 = 96 = 24d, így 28 + 24 = 52. tag.'
  },
  {
    id: 'as-q22',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: '(Érettségi, 2022) Egy számtani sorozat első három tagjának összege 18. A harmadik és a negyedik tag összege 28-cal nagyobb az első és a második tag összegénél. Mennyi az első tag és a differencia?',
    options: ['a₁ = −1, d = 7', 'a₁ = 6, d = 7', 'a₁ = −8, d = 14', 'a₁ = 2, d = 4'],
    correctAnswer: 0,
    explanation: '3a₂ = 18 ⇒ a₂ = 6; (a₃ + a₄) − (a₁ + a₂) = 4d = 28 ⇒ d = 7; a₁ = 6 − 7 = −1.'
  },
  {
    id: 'as-q23',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: '(Érettségi, 2017) A büfé július 1-jén, 2-án és 3-án összesen 165 liter üdítőt, július 15-én 198 litert rendelt; a napi rendelés naponta ugyanannyival nő. Hány litert rendelnek július 31-én?',
    options: ['374 liter', '363 liter', '385 liter', '341 liter'],
    correctAnswer: 0,
    explanation: 'a₂ = 55; a₁₅ − a₂ = 13d = 143 ⇒ d = 11; a₁ = 44, a₃₁ = 44 + 30 · 11 = 374.'
  },
  {
    id: 'as-q24',
    questionTypeBadge: 'Beiktatás',
    figure: FIG_Q24,
    level: 3,
    question: 'Iktass be 4 számot 5 és 8 közé úgy, hogy a hat szám egy számtani sorozat hat egymás utáni tagja legyen! Mennyi a differencia?',
    options: ['0,6', '0,75', '0,5', '1,5'],
    correctAnswer: 0,
    explanation: 'Hat tag között 5 lépés: 5d = 8 − 5 = 3 ⇒ d = 0,6 (5; 5,6; 6,2; 6,8; 7,4; 8).'
  },
  {
    id: 'as-q25',
    questionTypeBadge: 'Maradékos sorozat',
    level: 3,
    question: 'A 37-tel osztva 3 maradékot adó pozitív egészek növekvő sorozatának melyik a legkisebb tagja, amely nagyobb, mint 999?',
    options: ['1002', '999', '1036', '1040'],
    correctAnswer: 0,
    explanation: '999 = 27 · 37, így 27 · 37 + 3 = 1002. (999 maradéka 0, 1036 = 28 · 37, 1040 maradéka 4.)'
  },
  {
    id: 'as-q26',
    questionTypeBadge: 'Maradékos sorozat',
    level: 3,
    question: 'Hány négyjegyű tagja van a 37-tel osztva 3 maradékot adó pozitív egészek sorozatának?',
    options: ['244', '243', '245', '270'],
    correctAnswer: 0,
    explanation: 'A legkisebb négyjegyű 1002 = 37 · 27 + 3, a legnagyobb 9993 = 37 · 270 + 3; k = 27, …, 270: 270 − 27 + 1 = 244 darab.'
  },
  {
    id: 'as-q27',
    questionTypeBadge: 'Egyenletrendszer',
    level: 3,
    question: 'Egy számtani sorozat 5. és 6. tagjának összege 60, a 8., 9. és 10. tag összege 69. Mennyi az első tag és a differencia?',
    options: ['a₁ = 39, d = −2', 'a₁ = 41, d = −2', 'a₁ = 39, d = 2', 'a₁ = 23, d = 2'],
    correctAnswer: 0,
    explanation: '3a₉ = 69 ⇒ a₁ + 8d = 23; 2a₁ + 9d = 60. Kivonva: 7d = −14 ⇒ d = −2, a₁ = 39.'
  },
  {
    id: 'as-q28',
    questionTypeBadge: 'Hatszöges burkolás',
    level: 3,
    question: 'A főtér minden „köre” más színű (1. kör: 6 lap, d = 6). Hány olyan szín van, amelyből 100-nál kevesebb kőlap kell?',
    options: ['16', '17', '15', '10'],
    correctAnswer: 0,
    explanation: '6k < 100 ⇒ k < 16,7 ⇒ k = 1, …, 16: 16 szín (a 17. körben már 102 lap van).'
  },
  {
    id: 'as-q29',
    questionTypeBadge: 'Szimmetrikus jelölés',
    level: 3,
    question: 'Egy számtani sorozat 10., 11. és 12. tagjának összege 63, differenciája 7. Mennyi a 10. és a 12. tag?',
    options: ['14 és 28', '7 és 35', '21 és 28', '14 és 21'],
    correctAnswer: 0,
    explanation: 'a₁₁ = 21; a₁₀ = 21 − 7 = 14, a₁₂ = 21 + 7 = 28.'
  },
  {
    id: 'as-q30',
    questionTypeBadge: 'Számtani közép',
    figure: FIG_Q30,
    level: 3,
    question: 'Melyik egyenlőség igaz MINDEN számtani sorozatra? (Az ábrán egy példa: a₄, a₇, a₁₀ kiemelve.)',
    options: ['a₇ = (a₄ + a₁₀)/2', 'a₇ = (a₄ + a₁₀)/3', 'a₇ = a₄ + a₁₀ − a₁', 'a₇ = 2a₄ − a₁₀'],
    correctAnswer: 0,
    explanation: 'a₄ = a₇ − 3d és a₁₀ = a₇ + 3d, így összegük 2a₇: a sorozat bármely tagja a tőle egyenlő távolságra lévő két tag számtani közepe.'
  }
];

export const ArithmeticSequenceQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="sorozatok"
      topicId="g12-seq-szamtani-quiz"
      subtopicId="szamtani-sorozatok"
      title="3. Számtani sorozatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: differencia, n-edik tag, két tagból a sorozat, szimmetrikus jelölés, érettségi feladatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={ARITHMETIC_SEQUENCE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: [
            'aₙ − aₙ₋₁ = d állandó (n ≥ 2).',
            'd: differencia (különbség).',
            'd > 0 növő, d < 0 csökkenő, d = 0 konstans.',
            'A pontgrafikon pontjai egy egyenesre esnek.'
          ]
        },
        {
          title: 'Képletek',
          items: [
            'aₙ = a₁ + (n − 1)d.',
            'aₘ − aₖ = (m − k)d.',
            'Hányadik tag x? n = (x − a₁)/d + 1.',
            'a₁ = aₖ − (k − 1)d.'
          ]
        },
        {
          title: 'Trükkök',
          items: [
            'Három szomszédos tag: a − d; a; a + d (összeg 3a).',
            'aₖ = (aₖ₋ⱼ + aₖ₊ⱼ)/2 (számtani közép).',
            'k szám beiktatása: (k + 1) lépés.',
            'Ellenőrizd n = 1-re!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ArithmeticSequenceMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ArithmeticSequenceSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ArithmeticSequenceQuiz;
