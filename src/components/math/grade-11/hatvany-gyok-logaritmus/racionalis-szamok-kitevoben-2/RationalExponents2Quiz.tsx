import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RationalExponents2Matcher } from './RationalExponents2Matcher';
import { RationalExponents2Sorter } from './RationalExponents2Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Két út: előbb gyök, aztán hatvány – a végeredmény „?”. */
const TwoPathFig: React.FC<{ base: string; mid: string; root: string; pow: string }> = ({ base, mid, root, pow }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="10" y="55" width="50" height="34" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="35" y="78" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{base}</text>
    <rect x="95" y="55" width="50" height="34" rx="8" fill="#ffffff" stroke="#0f766e" strokeWidth="1.5" />
    <text x="120" y="78" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f766e">{mid}</text>
    <rect x="180" y="55" width="50" height="34" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
    <text x="205" y="78" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#9d174d">?</text>
    <line x1="60" y1="72" x2="95" y2="72" stroke="#0f766e" strokeWidth="1.5" />
    <polygon points="95,72 88,68 88,76" fill="#0f766e" />
    <text x="77" y="48" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f766e">{root}</text>
    <line x1="145" y1="72" x2="180" y2="72" stroke="#db2777" strokeWidth="1.5" />
    <polygon points="180,72 173,68 173,76" fill="#db2777" />
    <text x="162" y="48" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#db2777">{pow}</text>
    <text x="120" y="122" fontSize="10" textAnchor="middle" fill="#475569">előbb gyököt vonunk, aztán hatványozunk</text>
  </svg>
);

/** Idővonal harmad évekkel; a kérdezett pont kiemelve. */
const ThirdsFig: React.FC<{ ask: string }> = ({ ask }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <line x1="20" y1="80" x2="222" y2="80" stroke="#475569" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx={30 + i * 62} cy="80" r="5" fill={i === 2 ? '#db2777' : '#7c3aed'} />
        <text x={30 + i * 62} y="100" fontSize="9" textAnchor="middle" fill="#334155">
          {['2011. jún.', '2011. okt.', '2012. febr.', '2012. jún.'][i]}
        </text>
      </g>
    ))}
    {[0, 1, 2].map((i) => (
      <text key={i} x={61 + i * 62} y="70" fontSize="10" textAnchor="middle" fill="#7c3aed" fontWeight="bold">· x</text>
    ))}
    <text x="30" y="56" fontSize="10" textAnchor="middle" fill="#4c1d95" fontWeight="bold">6,98</text>
    <text x="154" y="56" fontSize="11" textAnchor="middle" fill="#db2777" fontWeight="bold">{ask}</text>
    <text x="120" y="130" fontSize="10" textAnchor="middle" fill="#475569">x³ = 1,011 (egy év alatt)</text>
  </svg>
);

const RATIONAL_EXPONENTS_2_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Definíció, egyszerű értékek (1–10)
  {
    id: 're2-q1',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Melyik gyökös alak egyenlő 32³⁄⁵-nel?',
    options: ['(⁵√32)³', '(∛32)⁵', '32³ / 5', '∛(32⁵)'],
    correctAnswer: 0,
    explanation: 'a^(p/q) = (q-adik gyök a)ᵖ: a nevező (5) a gyökkitevő, a számláló (3) a hatványkitevő.'
  },
  {
    id: 're2-q2',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 32³⁄⁵ értéke?',
    figure: <TwoPathFig base="32" mid="2" root="⁵√" pow="( )³" />,
    options: ['8', '19,2', '2', '6'],
    correctAnswer: 0,
    explanation: '32³⁄⁵ = (⁵√32)³ = 2³ = 8.'
  },
  {
    id: 're2-q3',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 25³⁄² értéke?',
    options: ['125', '37,5', '625', '5'],
    correctAnswer: 0,
    explanation: '25³⁄² = (√25)³ = 5³ = 125.'
  },
  {
    id: 're2-q4',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 9³⁄² értéke?',
    options: ['27', '13,5', '81', '3'],
    correctAnswer: 0,
    explanation: '9³⁄² = (√9)³ = 3³ = 27.'
  },
  {
    id: 're2-q5',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 27²⁄³ értéke?',
    options: ['9', '18', '3', '729'],
    correctAnswer: 0,
    explanation: '27²⁄³ = (∛27)² = 3² = 9.'
  },
  {
    id: 're2-q6',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi 81⁻¹⁄² értéke?',
    options: ['1/9', '−9', '9', '−40,5'],
    correctAnswer: 0,
    explanation: '81⁻¹⁄² = 1 / 81¹⁄² = 1/√81 = 1/9. A negatív kitevő reciprokot jelent, nem negatív előjelet.'
  },
  {
    id: 're2-q7',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mit jelent a negatív törtkitevő?',
    options: [
      'Az ellentett kitevőjű hatvány reciprokát',
      'Az ellentett kitevőjű hatvány ellentettjét',
      'A kitevő reciprokát (a fordított törtet)',
      'Hogy az alap negatív'
    ],
    correctAnswer: 0,
    explanation: 'Definíció: a^(−p/q) = 1 / a^(p/q), például 32⁻³⁄⁵ = 1/8.'
  },
  {
    id: 're2-q8',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Mivel egyenlő 28¹⁄³ · 28¹⁄³?',
    options: ['28²⁄³', '28¹⁄⁹', '28²⁄⁶', '56²⁄³'],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványok szorzatánál a kitevők összeadódnak: 1/3 + 1/3 = 2/3. (28²⁄⁶ = 28¹⁄³ lenne.)'
  },
  {
    id: 're2-q9',
    level: 1,
    questionTypeBadge: 'Értelmezés',
    question: 'Milyen alapra értelmeztük az a^(p/q) törtkitevőjű hatványt (p, q pozitív egész, q ≠ 1)?',
    options: ['a > 0', 'minden valós a-ra', 'a ≠ 0', 'a < 0'],
    correctAnswer: 0,
    explanation: 'A tankönyvi definíció: ha 0 < a, p és q pozitív egész szám, de q ≠ 1, akkor a^(p/q) = (a^(1/q))ᵖ.'
  },
  {
    id: 're2-q10',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 8⁵⁄³ értéke?',
    options: ['32', '13,33', '40', '2'],
    correctAnswer: 0,
    explanation: '8⁵⁄³ = (∛8)⁵ = 2⁵ = 32. Vagy: (2³)⁵⁄³ = 2⁵ = 32.'
  },

  // LEVEL 2: Azonosságok, átírás (11–20)
  {
    id: 're2-q11',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 64³⁄² értéke?',
    options: ['512', '96', '4096', '16'],
    correctAnswer: 0,
    explanation: '64³⁄² = (√64)³ = 8³ = 512.'
  },
  {
    id: 're2-q12',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 125⁴⁄³ értéke?',
    figure: <TwoPathFig base="125" mid="5" root="∛" pow="( )⁴" />,
    options: ['625', '166,7', '500', '25'],
    correctAnswer: 0,
    explanation: '125⁴⁄³ = (∛125)⁴ = 5⁴ = 625.'
  },
  {
    id: 're2-q13',
    level: 2,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi 32⁻³⁄⁵ értéke?',
    options: ['1/8', '−8', '8', '−19,2'],
    correctAnswer: 0,
    explanation: '32⁻³⁄⁵ = 1 / 32³⁄⁵ = 1 / (⁵√32)³ = 1/2³ = 1/8.'
  },
  {
    id: 're2-q14',
    level: 2,
    questionTypeBadge: 'Azonosság',
    question: 'Mennyi 6,25¹⁄³ · 6,25¹⁄⁶ értéke?',
    options: ['2,5', '6,25', '≈ 1,107', '3,125'],
    correctAnswer: 0,
    explanation: 'A kitevők összeadódnak: 1/3 + 1/6 = 1/2, tehát 6,25¹⁄² = √6,25 = 2,5. (Az 1,107 a kitevők szorzásából, 6,25¹⁄¹⁸-ból jönne.)'
  },
  {
    id: 're2-q15',
    level: 2,
    questionTypeBadge: 'Azonosság',
    question: 'Mennyi 28²⁄³ · 28⁴⁄³ értéke?',
    options: ['784', '28', '56', '28⁸⁄⁹'],
    correctAnswer: 0,
    explanation: '28²⁄³ · 28⁴⁄³ = 28⁶⁄³ = 28² = 784.'
  },
  {
    id: 're2-q16',
    level: 2,
    questionTypeBadge: 'Tizedes kitevő',
    question: 'Mennyi 36^0,4 · 36^0,6 értéke?',
    options: ['36', '6', '1296', '≈ 2,36'],
    correctAnswer: 0,
    explanation: 'A kitevők összeadódnak: 0,4 + 0,6 = 1, így 36¹ = 36. (A 2,36 a kitevők szorzásával kapott hibás 36^0,24.)'
  },
  {
    id: 're2-q17',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 27⁴⁄³ értéke?',
    options: ['81', '36', '9', '243'],
    correctAnswer: 0,
    explanation: '27⁴⁄³ = (∛27)⁴ = 3⁴ = 81.'
  },
  {
    id: 're2-q18',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 81³⁄⁴ értéke?',
    options: ['27', '60,75', '9', '243'],
    correctAnswer: 0,
    explanation: '81³⁄⁴ = (⁴√81)³ = 3³ = 27.'
  },
  {
    id: 're2-q19',
    level: 2,
    questionTypeBadge: 'Gyökkitevő',
    question: 'Írd fel kisebb gyökkitevővel: ¹⁵√(7⁶) = ?',
    options: ['⁵√49', '⁵√7', '∛49', '√7'],
    correctAnswer: 0,
    explanation: '¹⁵√(7⁶) = 7⁶⁄¹⁵ = 7²⁄⁵ = ⁵√(7²) = ⁵√49.'
  },
  {
    id: 're2-q20',
    level: 2,
    questionTypeBadge: 'Népesség',
    question: 'Évente 1,011-szeres a növekedés. Hányszorosára nő a népesség 2/3 év alatt?',
    figure: <ThirdsFig ask="6,98 · ?" />,
    options: ['≈ 1,0073', '≈ 0,674', '≈ 1,0220', '≈ 1,0037'],
    correctAnswer: 0,
    explanation: '1,011²⁄³ = (∛1,011)² ≈ 1,0037² ≈ 1,0073. (Az 1,0037 az 1/3 év szorzója, az 1,022 a hibás „kétszer 1,1%”.)'
  },

  // LEVEL 3: Összetett átalakítások (21–30)
  {
    id: 're2-q21',
    level: 3,
    questionTypeBadge: 'Közös alap',
    question: 'Mennyi 5^1,8 · 25^(−0,4) értéke?',
    options: ['5', '1', '25', '5^2,6'],
    correctAnswer: 0,
    explanation: '25^(−0,4) = (5²)^(−0,4) = 5^(−0,8), így 5^(1,8 − 0,8) = 5¹ = 5.'
  },
  {
    id: 're2-q22',
    level: 3,
    questionTypeBadge: 'Szorzat hatványa',
    question: 'Mennyi (225 · 196)¹⁄² értéke?',
    options: ['210', '29', '421', '44 100'],
    correctAnswer: 0,
    explanation: '(ab)ⁿ = aⁿbⁿ: 225¹⁄² · 196¹⁄² = 15 · 14 = 210.'
  },
  {
    id: 're2-q23',
    level: 3,
    questionTypeBadge: 'Hányados hatványa',
    question: 'Mennyi (81/16)¹⁄⁴ értéke?',
    options: ['3/2', '9/4', '81/4', '27/8'],
    correctAnswer: 0,
    explanation: '(a/b)ⁿ = aⁿ/bⁿ: 81¹⁄⁴ / 16¹⁄⁴ = 3/2.'
  },
  {
    id: 're2-q24',
    level: 3,
    questionTypeBadge: 'Azonosság',
    question: 'Mennyi 7²⁄⁵ · 7⁸⁄⁵ értéke?',
    options: ['49', '7', '343', '7¹⁶⁄²⁵'],
    correctAnswer: 0,
    explanation: '7²⁄⁵ · 7⁸⁄⁵ = 7¹⁰⁄⁵ = 7² = 49. (A 7¹⁶⁄²⁵ a kitevők hibás szorzásából jön.)'
  },
  {
    id: 're2-q25',
    level: 3,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi (1/9)⁻³⁄² értéke?',
    options: ['27', '1/27', '−27', '−1/27'],
    correctAnswer: 0,
    explanation: '(1/9)⁻³⁄² = 9³⁄² = (√9)³ = 3³ = 27.'
  },
  {
    id: 're2-q26',
    level: 3,
    questionTypeBadge: 'Gyökkitevő',
    question: 'Írd fel egyszerűbben: ²⁰√(3¹⁰) = ?',
    options: ['√3', '9', '3', '⁴√3'],
    correctAnswer: 0,
    explanation: '²⁰√(3¹⁰) = 3¹⁰⁄²⁰ = 3¹⁄² = √3.'
  },
  {
    id: 're2-q27',
    level: 3,
    questionTypeBadge: 'Negatív alap',
    question: 'Miért nem értelmezzük a (−8)¹⁄³ hatványt? Mennyi lenne (−8)²⁄⁶ = ⁶√((−8)²), ha megengednénk?',
    options: ['2 – ez ellentmond ∛(−8) = −2-nek', '−2 – ugyanaz, nincs ellentmondás', '4', '−4'],
    correctAnswer: 0,
    explanation: '(−8)² = 64, ⁶√64 = 2. Mivel 1/3 = 2/6, ugyanannak a hatványnak egyszer −2, egyszer 2 lenne az értéke – ezért csak pozitív alapra értelmezzük.'
  },
  {
    id: 're2-q28',
    level: 3,
    questionTypeBadge: 'Népesség',
    question: '2011. június végén 6,98 milliárd ember élt, évi 1,011-szeres növekedéssel. Mekkora volt a népesség a modell szerint 2012. február végén (2/3 év múlva)?',
    figure: <ThirdsFig ask="?" />,
    options: ['≈ 7,031 milliárd', '≈ 7,006 milliárd', '≈ 7,057 milliárd', '≈ 7,134 milliárd'],
    correctAnswer: 0,
    explanation: '6,98 · 1,011²⁄³ ≈ 6,98 · 1,0073 ≈ 7,031 milliárd fő. (7,006: 1/3 év; 7,057: 1 év; 7,134: hibás 6,98 · 1,022.)'
  },
  {
    id: 're2-q29',
    level: 3,
    questionTypeBadge: 'Gyökkitevő',
    question: 'Írd fel kisebb gyökkitevővel: ³⁶√(7⁵⁴) = ?',
    options: ['√(7³)', '∛(7²)', '7²', '√7'],
    correctAnswer: 0,
    explanation: '54/36 = 3/2, így ³⁶√(7⁵⁴) = 7³⁄² = √(7³) = √343.'
  },
  {
    id: 're2-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szám NEM egyenlő 4-gyel?',
    options: ['64¹⁄²', '8²⁄³', '16¹⁄²', '32²⁄⁵'],
    correctAnswer: 0,
    explanation: '64¹⁄² = 8. A többi: 8²⁄³ = 2² = 4; 16¹⁄² = 4; 32²⁄⁵ = 2² = 4.'
  }
];

export const RationalExponents2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-tortkitevo-masodik-quiz"
      subtopicId="racionalis-szamok-kitevoben-2"
      title="4. Racionális számok a kitevőben II. – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a p/q kitevő, negatív törtkitevő, a hatványozás azonosságai és a gyökkitevő csökkentése."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={RATIONAL_EXPONENTS_2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók (a > 0)',
          items: [
            'a^(p/q) = (q-adik gyök a)ᵖ = q-adik gyök (aᵖ)',
            'a nevező a gyökkitevő, a számláló a hatványkitevő',
            'a^(−p/q) = 1 / a^(p/q) (reciprok!)',
            '32³⁄⁵ = 8; 32⁻³⁄⁵ = 1/8; 81⁻¹⁄² = 1/9'
          ]
        },
        {
          title: 'Azonosságok racionális kitevőre',
          items: [
            'aᵐ · aⁿ = aᵐ⁺ⁿ;  aᵐ : aⁿ = aᵐ⁻ⁿ',
            '(ab)ⁿ = aⁿbⁿ;  (a/b)ⁿ = aⁿ/bⁿ',
            '(aᵐ)ⁿ = aᵐⁿ, pl. 8⁵⁄³ = (2³)⁵⁄³ = 2⁵ = 32',
            'Közös alap: 25 = 5², 8 = 2³, 27 = 3³'
          ]
        },
        {
          title: 'Kisebb gyökkitevő',
          items: [
            'Írd törtkitevős alakba, és egyszerűsítsd a törtet',
            '¹⁵√(7⁶) = 7²⁄⁵ = ⁵√49',
            '⁸√(6²) = ⁴√6;  ²⁰√(3¹⁰) = √3',
            '³⁶√(7⁵⁴) = 7³⁄² = √(7³)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RationalExponents2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RationalExponents2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RationalExponents2Quiz;
