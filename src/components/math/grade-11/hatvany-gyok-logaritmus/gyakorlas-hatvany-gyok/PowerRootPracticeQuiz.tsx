import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PowerRootPracticeMatcher } from './PowerRootPracticeMatcher';
import { PowerRootPracticeSorter } from './PowerRootPracticeSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Kétkarú mérleg két kifejezéssel – melyik a nehezebb (nagyobb)? */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="120,40 108,128 132,128" fill="#cbd5e1" stroke="#475569" />
    <line x1="30" y1="40" x2="210" y2="40" stroke="#475569" strokeWidth="3" />
    <circle cx="120" cy="40" r="5" fill="#475569" />
    <line x1="40" y1="40" x2="40" y2="70" stroke="#94a3b8" />
    <line x1="200" y1="40" x2="200" y2="70" stroke="#94a3b8" />
    <rect x="2" y="70" width="80" height="34" rx="8" fill="#ede9fe" stroke="#7c3aed" />
    <text x="42" y="92" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{left}</text>
    <rect x="158" y="70" width="80" height="34" rx="8" fill="#fce7f3" stroke="#db2777" />
    <text x="198" y="92" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#9d174d">{right}</text>
    <text x="120" y="22" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#0f172a">?</text>
    <text x="120" y="146" fontSize="10" textAnchor="middle" fill="#64748b">melyik a nagyobb?</text>
  </svg>
);

/** Kitevő-helyettesítés: ismert hatvány és a kérdezett kifejezés. */
const SubstFig: React.FC<{ known: string; ask: string }> = ({ known, ask }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="50" y="14" width="140" height="40" rx="10" fill="#7c3aed" />
    <text x="120" y="40" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#ffffff">{known}</text>
    <line x1="120" y1="54" x2="120" y2="84" stroke="#7c3aed" strokeWidth="2" />
    <polygon points="114,80 120,90 126,80" fill="#7c3aed" />
    <rect x="40" y="92" width="160" height="40" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
    <text x="120" y="118" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#9d174d">{ask} = ?</text>
  </svg>
);

const POWER_ROOT_PRACTICE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapok ismétlése (1–10)
  {
    id: 'prp-q1',
    level: 1,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 4^0,5 értéke?',
    options: ['2', '8', '0,5', '16'],
    correctAnswer: 0,
    explanation: '4^0,5 = 4¹⁄² = √4 = 2.'
  },
  {
    id: 'prp-q2',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Mennyi 3⁵ · 3⁻⁸ értéke?',
    options: ['1/27', '27', '−27', '3⁻⁴⁰'],
    correctAnswer: 0,
    explanation: 'A kitevők összeadódnak: 3⁵⁺⁽⁻⁸⁾ = 3⁻³ = 1/27.'
  },
  {
    id: 'prp-q3',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi 3⁻² értéke?',
    options: ['1/9', '−9', '−6', '9'],
    correctAnswer: 0,
    explanation: '3⁻² = 1/3² = 1/9.'
  },
  {
    id: 'prp-q4',
    level: 1,
    questionTypeBadge: 'Negatív törtkitevő',
    question: 'Mennyi 16⁻³⁄⁴ értéke?',
    options: ['1/8', '8', '−8', '−12'],
    correctAnswer: 0,
    explanation: '16⁻³⁄⁴ = 1 / (⁴√16)³ = 1/2³ = 1/8.'
  },
  {
    id: 'prp-q5',
    level: 1,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 5ᵏ = 3, mennyi 5⁻ᵏ?',
    options: ['1/3', '−3', '3', '−15'],
    correctAnswer: 0,
    explanation: '5⁻ᵏ = 1/5ᵏ = 1/3.'
  },
  {
    id: 'prp-q6',
    level: 1,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 5ᵏ = 3, mennyi 5²ᵏ?',
    options: ['9', '6', '15', '8'],
    correctAnswer: 0,
    explanation: '5²ᵏ = (5ᵏ)² = 3² = 9.'
  },
  {
    id: 'prp-q7',
    level: 1,
    questionTypeBadge: 'Nulla kitevő',
    question: 'Mennyi −3⁰ értéke?',
    options: ['−1', '1', '0', '−3'],
    correctAnswer: 0,
    explanation: 'A hatványozás az előjel előtt történik: −3⁰ = −(3⁰) = −1.'
  },
  {
    id: 'prp-q8',
    level: 1,
    questionTypeBadge: 'Normálalak',
    question: 'Mennyi 16 · 10⁻² értéke?',
    options: ['0,16', '1,6', '0,016', '−160'],
    correctAnswer: 0,
    explanation: '10⁻² = 1/100, így 16 · 10⁻² = 16/100 = 0,16.'
  },
  {
    id: 'prp-q9',
    level: 1,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi ∛(−125/8) értéke?',
    options: ['−5/2', '5/2', '−125/24', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Páratlan gyök negatív számból is vonható: (−5/2)³ = −125/8, tehát ∛(−125/8) = −5/2.'
  },
  {
    id: 'prp-q10',
    level: 1,
    questionTypeBadge: 'Nulla kitevő',
    question: 'Mennyi π⁰ − 2⁴ · 4⁻² értéke?',
    options: ['0', '1', '−1', '2'],
    correctAnswer: 0,
    explanation: 'π⁰ = 1, 2⁴ · 4⁻² = 16/16 = 1, így 1 − 1 = 0.'
  },

  // LEVEL 2: Összehasonlítás, hatványalak (11–20)
  {
    id: 'prp-q11',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás igaz 25³⁄² és 27²⁄³ viszonyáról?',
    figure: <BalanceFig left="25³⁄²" right="27²⁄³" />,
    options: ['25³⁄² > 27²⁄³', '25³⁄² < 27²⁄³', '25³⁄² = 27²⁄³', 'Számológép nélkül nem dönthető el'],
    correctAnswer: 0,
    explanation: '25³⁄² = (√25)³ = 125, 27²⁄³ = (∛27)² = 9, tehát 125 > 9.'
  },
  {
    id: 'prp-q12',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: 3⁻² vagy 16⁻³⁄⁴?',
    figure: <BalanceFig left="3⁻²" right="16⁻³⁄⁴" />,
    options: ['16⁻³⁄⁴, mert 1/8 > 1/9', '3⁻², mert 1/9 > 1/8', 'Egyenlők', '3⁻², mert −2 > −3/4'],
    correctAnswer: 0,
    explanation: '3⁻² = 1/9, 16⁻³⁄⁴ = 1/8. Azonos számlálónál a kisebb nevezőjű tört a nagyobb: 1/8 > 1/9.'
  },
  {
    id: 'prp-q13',
    level: 2,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 5ᵏ = 3, mennyi 5ᵏ⁺¹?',
    figure: <SubstFig known="5ᵏ = 3" ask="5ᵏ⁺¹" />,
    options: ['15', '4', '6', '125'],
    correctAnswer: 0,
    explanation: '5ᵏ⁺¹ = 5ᵏ · 5 = 3 · 5 = 15. (A 4 a tipikus hiba: 5ᵏ + 1.)'
  },
  {
    id: 'prp-q14',
    level: 2,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 5ᵏ = 3, mennyi 5³ᵏ⁻²?',
    figure: <SubstFig known="5ᵏ = 3" ask="5³ᵏ⁻²" />,
    options: ['27/25', '7', '27/10', '25/27'],
    correctAnswer: 0,
    explanation: '5³ᵏ⁻² = (5ᵏ)³ : 5² = 27/25.'
  },
  {
    id: 'prp-q15',
    level: 2,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 7ᵏ = 4 és 7ᵐ = 5, mennyi 7ᵏ⁺ᵐ?',
    options: ['20', '9', '1024', '1/20'],
    correctAnswer: 0,
    explanation: '7ᵏ⁺ᵐ = 7ᵏ · 7ᵐ = 4 · 5 = 20.'
  },
  {
    id: 'prp-q16',
    level: 2,
    questionTypeBadge: '2 hatványa',
    question: 'A 2-nek hányadik hatványa ⁵√16 · 2⁻³?',
    options: ['2^(−11/5)', '2^(−12/5)', '2^(19/5)', '2^(4/15)'],
    correctAnswer: 0,
    explanation: '⁵√16 = ⁵√(2⁴) = 2^(4/5), így 2^(4/5) · 2⁻³ = 2^(4/5 − 3) = 2^(−11/5).'
  },
  {
    id: 'prp-q17',
    level: 2,
    questionTypeBadge: '2 hatványa',
    question: 'A 2-nek hányadik hatványa 4^1,5 · 8⁻²?',
    options: ['2⁻³', '2⁻¹', '2⁹', '2^(−4,5)'],
    correctAnswer: 0,
    explanation: '4^1,5 = (2²)^1,5 = 2³ és 8⁻² = (2³)⁻² = 2⁻⁶, így 2³ · 2⁻⁶ = 2⁻³.'
  },
  {
    id: 'prp-q18',
    level: 2,
    questionTypeBadge: 'Számolás',
    question: 'Mennyi ∛27 · 2⁻⁴ értéke?',
    options: ['3/16', '27/16', '3/8', '−24'],
    correctAnswer: 0,
    explanation: '∛27 = 3, 2⁻⁴ = 1/16, így 3 · 1/16 = 3/16 = 0,1875.'
  },
  {
    id: 'prp-q19',
    level: 2,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 10ᵏ = 7, mennyi 10ᵏ⁺³?',
    options: ['7000', '10', '21', '343'],
    correctAnswer: 0,
    explanation: '10ᵏ⁺³ = 10ᵏ · 10³ = 7 · 1000 = 7000.'
  },
  {
    id: 'prp-q20',
    level: 2,
    questionTypeBadge: 'Átalakítás',
    question: 'Írd fel negatív kitevő nélkül (a > 0): a⁻¹ + a⁻² = ?',
    options: ['(a + 1)/a²', '1/a³', '2/a³', '−a − a²'],
    correctAnswer: 0,
    explanation: 'a⁻¹ + a⁻² = 1/a + 1/a² = a/a² + 1/a² = (a + 1)/a².'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'prp-q21',
    level: 3,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 7ᵏ = 4 és 7ᵐ = 5, mennyi 7ᵏ⁻ᵐ⁺²?',
    figure: <SubstFig known="7ᵏ = 4, 7ᵐ = 5" ask="7ᵏ⁻ᵐ⁺²" />,
    options: ['39,2', '49,8', '0,8', '4/245'],
    correctAnswer: 0,
    explanation: '7ᵏ⁻ᵐ⁺² = 7ᵏ : 7ᵐ · 7² = 4/5 · 49 = 196/5 = 39,2. (49,8 = 0,8 + 49 a hibás „összeadás”.)'
  },
  {
    id: 'prp-q22',
    level: 3,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 7ᵏ = 4 és 7ᵐ = 5, mennyi 7³ᵏ⁻²ᵐ?',
    options: ['64/25', '2', '16/25', '12/10'],
    correctAnswer: 0,
    explanation: '7³ᵏ⁻²ᵐ = (7ᵏ)³ : (7ᵐ)² = 64/25.'
  },
  {
    id: 'prp-q23',
    level: 3,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 10ᵏ = 7, mennyi 10⁴ᵏ?',
    options: ['2401', '28', '11', '7000'],
    correctAnswer: 0,
    explanation: '10⁴ᵏ = (10ᵏ)⁴ = 7⁴ = 2401.'
  },
  {
    id: 'prp-q24',
    level: 3,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 10ᵏ = 7, mennyi 10⁻²ᵏ?',
    options: ['1/49', '−49', '−14', '1/14'],
    correctAnswer: 0,
    explanation: '10⁻²ᵏ = 1 / (10ᵏ)² = 1/49.'
  },
  {
    id: 'prp-q25',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'A 3-nak hányadik hatványa a (3³)³ szám köbgyöke?',
    options: ['3', '9', '27', '1'],
    correctAnswer: 0,
    explanation: '(3³)³ = 3⁹, és ∛(3⁹) = 3⁹⁄³ = 3³. Tehát a 3. hatvány.'
  },
  {
    id: 'prp-q26',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'A 3-nak hányadik hatványa a 3^(3³) szám köbgyöke?',
    options: ['9', '3', '27', '1'],
    correctAnswer: 0,
    explanation: '3^(3³) = 3²⁷, és ∛(3²⁷) = 3²⁷⁄³ = 3⁹. (Vigyázat: 3^(3³) ≠ (3³)³!)'
  },
  {
    id: 'prp-q27',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'A 2-nek hányadik hatványa a (2⁴)⁸ szám negyedik gyöke?',
    options: ['8', '2', '16', '32'],
    correctAnswer: 0,
    explanation: '(2⁴)⁸ = 2³², és ⁴√(2³²) = 2³²⁄⁴ = 2⁸.'
  },
  {
    id: 'prp-q28',
    level: 3,
    questionTypeBadge: 'Kitevő-helyettesítés',
    question: 'Ha 7ᵏ = 4 és 7ᵐ = 5, mennyi 7²ᵐ⁻ᵏ?',
    options: ['25/4', '6', '4/25', '5/2'],
    correctAnswer: 0,
    explanation: '7²ᵐ⁻ᵏ = (7ᵐ)² : 7ᵏ = 25/4.'
  },
  {
    id: 'prp-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: 3⁵ · 3⁻⁸ vagy (1/27)²?',
    figure: <BalanceFig left="3⁵ · 3⁻⁸" right="(1/27)²" />,
    options: ['3⁵ · 3⁻⁸', '(1/27)²', 'Egyenlők', 'Számológép nélkül nem dönthető el'],
    correctAnswer: 0,
    explanation: '3⁵ · 3⁻⁸ = 3⁻³ = 1/27, (1/27)² = 3⁻⁶ = 1/729. Mivel 1/27 > 1/729, az első a nagyobb.'
  },
  {
    id: 'prp-q30',
    level: 3,
    questionTypeBadge: 'Sorrend',
    question: 'Melyik a helyes növekvő sorrend?',
    options: ['3⁻² < 16⁻³⁄⁴ < 8⁻¹⁄³', '16⁻³⁄⁴ < 3⁻² < 8⁻¹⁄³', '8⁻¹⁄³ < 16⁻³⁄⁴ < 3⁻²', '3⁻² < 8⁻¹⁄³ < 16⁻³⁄⁴'],
    correctAnswer: 0,
    explanation: '3⁻² = 1/9 ≈ 0,111; 16⁻³⁄⁴ = 1/8 = 0,125; 8⁻¹⁄³ = 1/2 = 0,5.'
  }
];

export const PowerRootPracticeQuiz: React.FC<{
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
      topicId="g11-exp-hatvany-gyok-gyakorlas-quiz"
      subtopicId="gyakorlas-hatvany-gyok"
      title="5. Gyakorlás – Kvíz"
      subtitle="30 vegyes tesztkérdés 3 nehézségi szinten: egész és törtkitevő, n-edik gyök, összehasonlítás, 2 hatványai és kitevő-helyettesítés."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={POWER_ROOT_PRACTICE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók',
          items: [
            'a⁰ = 1 (a ≠ 0); a⁻ⁿ = 1/aⁿ',
            'a^(1/n) = ⁿ√a (a ≥ 0)',
            'a^(p/q) = (q-adik gyök a)^p (a > 0)',
            'a^(−p/q) = 1/a^(p/q); −3⁰ = −1, de (−3)⁰ = 1'
          ]
        },
        {
          title: 'Azonosságok',
          items: [
            'aᵐ · aⁿ = aᵐ⁺ⁿ;  aᵐ : aⁿ = aᵐ⁻ⁿ',
            '(aᵐ)ⁿ = aᵐⁿ;  (ab)ⁿ = aⁿbⁿ;  (a/b)ⁿ = aⁿ/bⁿ',
            'Közös alap: 4 = 2², 8 = 2³, 16 = 2⁴, 27 = 3³',
            '(3³)³ = 3⁹, de 3^(3³) = 3²⁷'
          ]
        },
        {
          title: 'Kitevő-helyettesítés',
          items: [
            'Ha 5ᵏ = 3: 5ᵏ⁺¹ = 15; 5²ᵏ = 9; 5³ᵏ⁻² = 27/25',
            'Ha 7ᵏ = 4, 7ᵐ = 5: 7ᵏ⁺ᵐ = 20; 7³ᵏ⁻²ᵐ = 64/25',
            'Ha 10ᵏ = 7: 10ᵏ⁺³ = 7000; 10⁴ᵏ = 2401',
            'Összeg a kitevőben → szorzat, különbség → hányados'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PowerRootPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PowerRootPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PowerRootPracticeQuiz;
