import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ArithmeticSumMatcher } from './ArithmeticSumMatcher';
import { ArithmeticSumSorter } from './ArithmeticSumSorter';
import { SeqChain, S_BLUE, S_AMBER, S_INK, S_RED, S_GREEN } from './seqKit';

const svgCls = 'w-full max-w-[280px] h-auto mx-auto';

const FIG_GAUSS = (
  <svg viewBox="0 0 240 110" className={svgCls} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[1, 2, 3].map((k, i) => (
      <g key={k}>
        <text x={30 + i * 26} y="40" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_BLUE}>
          {k}
        </text>
        <text x={210 - i * 26} y="40" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_RED}>
          {41 - k}
        </text>
        <path d={`M ${30 + i * 26} 46 Q 120 ${80 + i * 8} ${210 - i * 26} 46`} fill="none" stroke={S_GREEN} strokeWidth="1.2" />
      </g>
    ))}
    <text x="120" y="40" fontSize="12" textAnchor="middle" fill="#64748b">
      …
    </text>
    <text x="120" y="100" fontSize="10.5" textAnchor="middle" fill={S_INK}>
      1 + 2 + … + 39 + 40 = ?
    </text>
  </svg>
);

const FIG_ROWS = (
  <svg viewBox="0 0 240 130" className={svgCls} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[
      { t: '1. sor', v: '26', w: 40 },
      { t: '2. sor', v: '28', w: 43 },
      { t: '3. sor', v: '30', w: 46 },
      { t: '50. sor', v: '?', w: 150 }
    ].map((r, i) => (
      <g key={r.t}>
        <text x="12" y={28 + i * 26} fontSize="10" fill={S_INK}>
          {r.t}
        </text>
        <rect x="56" y={16 + i * 26} width={r.w} height="17" rx="3" fill={r.v === '?' ? '#fee2e2' : '#bfdbfe'} stroke={r.v === '?' ? S_RED : S_BLUE} />
        <text x={56 + r.w / 2} y={28.5 + i * 26} fontSize="10" textAnchor="middle" fontWeight="bold" fill={r.v === '?' ? S_RED : S_INK}>
          {r.v}
        </text>
      </g>
    ))}
    <text x="120" y="80" fontSize="11" textAnchor="middle" fill="#64748b">
      ⋮
    </text>
  </svg>
);

const FIG_CANS = (
  <svg viewBox="0 0 240 150" className={svgCls} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[1, 2, 3, 4].map((k) => (
      <g key={k}>
        {Array.from({ length: k }, (_, j) => (
          <rect key={j} x={100 - k * 11 + j * 22} y={14 + (k - 1) * 24} width="20" height="22" rx="3" fill="#fecaca" stroke="#b45309" />
        ))}
      </g>
    ))}
    <text x="100" y="122" fontSize="12" textAnchor="middle" fill="#64748b">
      ⋮
    </text>
    <text x="180" y="40" fontSize="10" fill={S_INK}>
      1 db
    </text>
    <text x="180" y="64" fontSize="10" fill={S_INK}>
      2 db
    </text>
    <text x="180" y="88" fontSize="10" fill={S_INK}>
      3 db
    </text>
    <text x="180" y="112" fontSize="10" fill={S_INK}>
      4 db
    </text>
    <text x="120" y="142" fontSize="10.5" textAnchor="middle" fill={S_AMBER} fontWeight="bold">
      összesen 5 · 24 = 120 konzerv
    </text>
  </svg>
);

const FIG_Q8 = <SeqChain terms={['5', '7', '9', '11']} ops="+2" title="S₄ = ?" />;

const ARITHMETIC_SUM_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'asum-q1',
    questionTypeBadge: 'Összegképlet',
    level: 1,
    question: 'Egy számtani sorozatban a₁ = 2 és a₁₀ = 20. Mennyi az első 10 tag összege?',
    options: ['110', '220', '100', '90'],
    correctAnswer: 0,
    explanation: 'S₁₀ = (a₁ + a₁₀)/2 · 10 = (2 + 20)/2 · 10 = 110. (A 220 a felezés elfelejtéséből jön.)'
  },
  {
    id: 'asum-q2',
    questionTypeBadge: 'Gauss',
    figure: FIG_GAUSS,
    level: 1,
    question: 'A kis Gauss 1-től 40-ig adta össze a számokat. Mennyi az összeg?',
    options: ['820', '800', '1640', '840'],
    correctAnswer: 0,
    explanation: '1 + 40 = 2 + 39 = … = 20 + 21 = 41, és 20 ilyen pár van: 20 · 41 = 820.'
  },
  {
    id: 'asum-q3',
    questionTypeBadge: 'Díszkövek',
    figure: FIG_ROWS,
    level: 1,
    question: 'Egy tér 50 sorában az első sorba 26 díszkövet tettek, minden következőbe 2-vel többet. Hány kő van az 50. sorban?',
    options: ['124', '126', '100', '122'],
    correctAnswer: 0,
    explanation: 'a₅₀ = 26 + 49 · 2 = 124. (A 126 az a₁ + 50d hibás képletből jönne.)'
  },
  {
    id: 'asum-q4',
    questionTypeBadge: 'Díszkövek',
    figure: FIG_ROWS,
    level: 1,
    question: 'Összesen hány díszkő van a téren (50 sor, 26; 28; 30; …)?',
    options: ['3750', '7500', '3700', '6200'],
    correctAnswer: 0,
    explanation: 'S₅₀ = (26 + 124)/2 · 50 = 75 · 50 = 3750.'
  },
  {
    id: 'asum-q5',
    questionTypeBadge: 'Összegképlet',
    level: 1,
    question: 'Melyik képlet adja meg a számtani sorozat első n tagjának összegét a₁ és d segítségével?',
    options: ['Sₙ = (2a₁ + (n − 1)d)/2 · n', 'Sₙ = (a₁ + (n − 1)d)/2 · n', 'Sₙ = (2a₁ + nd)/2 · n', 'Sₙ = a₁ + (n − 1)d'],
    correctAnswer: 0,
    explanation: 'aₙ = a₁ + (n − 1)d-t az Sₙ = (a₁ + aₙ)/2 · n képletbe írva: Sₙ = (2a₁ + (n − 1)d)/2 · n. Az utolsó opció csak aₙ.'
  },
  {
    id: 'asum-q6',
    questionTypeBadge: 'Gauss',
    level: 1,
    question: 'Mennyi 1 + 2 + 3 + … + 100?',
    options: ['5050', '5000', '10 100', '4950'],
    correctAnswer: 0,
    explanation: '(1 + 100)/2 · 100 = 5050.'
  },
  {
    id: 'asum-q7',
    questionTypeBadge: 'Szimmetrikus összeg',
    level: 1,
    question: 'Egy számtani sorozat első tagja −65, n-edik tagja 65. Mennyi az első n tag összege, ha n = 11?',
    options: ['0', '65', '−65', '715'],
    correctAnswer: 0,
    explanation: 'Sₙ = (−65 + 65)/2 · n = 0, bármekkora is n.'
  },
  {
    id: 'asum-q8',
    questionTypeBadge: 'Összegképlet',
    figure: FIG_Q8,
    level: 1,
    question: 'a₁ = 5, d = 2. Mennyi az első 4 tag összege?',
    options: ['32', '11', '28', '44'],
    correctAnswer: 0,
    explanation: '5 + 7 + 9 + 11 = 32, vagy (5 + 11)/2 · 4 = 32.'
  },
  {
    id: 'asum-q9',
    questionTypeBadge: 'Páratlan számok',
    level: 1,
    question: 'Mennyi az első 20 pozitív páratlan szám összege?',
    options: ['400', '200', '420', '390'],
    correctAnswer: 0,
    explanation: 'Az első n pozitív páratlan szám összege n²: 20² = 400 (vagy (1 + 39)/2 · 20 = 400).'
  },
  {
    id: 'asum-q10',
    questionTypeBadge: 'Gauss',
    level: 1,
    question: 'Gauss 1-től 40-ig a számokat „1 + 40, 2 + 39, …” párokba rendezte. Hány pár lett?',
    options: ['20', '40', '41', '19'],
    correctAnswer: 0,
    explanation: '40 számból 40/2 = 20 pár lesz (az utolsó pár 20 + 21).'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'asum-q11',
    questionTypeBadge: 'Hiányzó adatok',
    level: 2,
    question: 'a₁ = 129, d = −10, n = 13. Mennyi Sₙ?',
    options: ['897', '1677', '9', '780'],
    correctAnswer: 0,
    explanation: 'a₁₃ = 129 − 120 = 9; S₁₃ = (129 + 9)/2 · 13 = 69 · 13 = 897.'
  },
  {
    id: 'asum-q12',
    questionTypeBadge: 'Hiányzó adatok',
    level: 2,
    question: 'd = 5,3, n = 21, aₙ = 112. Mennyi az első tag?',
    options: ['6', '0,7', '11,3', '−6'],
    correctAnswer: 0,
    explanation: 'a₁ = a₂₁ − 20d = 112 − 106 = 6. (A 0,7 a 21d levonásából jönne.)'
  },
  {
    id: 'asum-q13',
    questionTypeBadge: 'Hiányzó adatok',
    level: 2,
    question: 'a₁ = 6, a₂₁ = 112. Mennyi az első 21 tag összege?',
    options: ['1239', '2478', '1180', '1302'],
    correctAnswer: 0,
    explanation: 'S₂₁ = (6 + 112)/2 · 21 = 59 · 21 = 1239.'
  },
  {
    id: 'asum-q14',
    questionTypeBadge: 'Hiányzó adatok',
    level: 2,
    question: 'd = −1, n = 27, aₙ = 48. Mennyi Sₙ?',
    options: ['1647', '1296', '3294', '1620'],
    correctAnswer: 0,
    explanation: 'a₁ = 48 + 26 = 74; S₂₇ = (74 + 48)/2 · 27 = 61 · 27 = 1647.'
  },
  {
    id: 'asum-q15',
    questionTypeBadge: 'Összegképlet',
    level: 2,
    question: 'Egy számtani sorozatban a₁ = 15, d = −1,2. Mennyi az első 10 tag összege?',
    options: ['96', '90', '150', '108'],
    correctAnswer: 0,
    explanation: 'S₁₀ = (2 · 15 + 9 · (−1,2))/2 · 10 = (30 − 10,8) · 5 = 96. (A 90 a 10d-vel számolt hibás érték.)'
  },
  {
    id: 'asum-q16',
    questionTypeBadge: 'Összegképlet',
    level: 2,
    question: 'a₁ = 15, d = −1,2. Mennyi az első 26 tag összege?',
    options: ['0', '390', '−15', '26'],
    correctAnswer: 0,
    explanation: 'S₂₆ = (30 + 25 · (−1,2))/2 · 26 = (30 − 30)/2 · 26 = 0: a pozitív és negatív tagok kiejtik egymást.'
  },
  {
    id: 'asum-q17',
    questionTypeBadge: 'Tagszám',
    level: 2,
    question: 'Mennyi az eredmény, ha összeadjuk a pozitív egész számokat 100-tól 1000-ig?',
    options: ['495 550', '495 000', '550 000', '495 450'],
    correctAnswer: 0,
    explanation: 'A tagok száma 1000 − 100 + 1 = 901; S = (100 + 1000)/2 · 901 = 550 · 901 = 495 550.'
  },
  {
    id: 'asum-q18',
    questionTypeBadge: 'Szöveges feladat',
    level: 2,
    question: 'Egy stadion első sorában 340 ülés van, minden következőben 30-cal több. Hány ülőhely van a 27 sorban összesen?',
    options: ['19 710', '9180', '20 115', '39 420'],
    correctAnswer: 0,
    explanation: 'S₂₇ = (2 · 340 + 26 · 30)/2 · 27 = (680 + 780)/2 · 27 = 730 · 27 = 19 710.'
  },
  {
    id: 'asum-q19',
    questionTypeBadge: 'Két tagból',
    level: 2,
    question: 'Egy számtani sorozatban a₁ = −5 és a₆ = 5. Mennyi S₂₅?',
    options: ['475', '950', '500', '425'],
    correctAnswer: 0,
    explanation: '5d = 10 ⇒ d = 2; a₂₅ = −5 + 48 = 43; S₂₅ = (−5 + 43)/2 · 25 = 19 · 25 = 475.'
  },
  {
    id: 'asum-q20',
    questionTypeBadge: 'Érettségi',
    level: 2,
    question: '(Érettségi, 2006) 55 darab egymást követő pozitív páratlan szám összege 3905. Melyik az összegben az első páratlan szám?',
    options: ['17', '71', '15', '19'],
    correctAnswer: 0,
    explanation: 'Az átlag (a középső, 28. tag) 3905/55 = 71; az első 27 lépéssel, azaz 54-gyel kisebb: 17.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'asum-q21',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: '(Érettségi, 2006) 55 egymást követő pozitív páratlan szám összege 3905. Melyik az 55. páratlan szám az összegben?',
    options: ['125', '127', '71', '123'],
    correctAnswer: 0,
    explanation: 'a₁ = 17, d = 2: a₅₅ = 17 + 54 · 2 = 125. Ellenőrzés: (17 + 125)/2 · 55 = 3905 ✓.'
  },
  {
    id: 'asum-q22',
    questionTypeBadge: 'Konzervgúla',
    figure: FIG_CANS,
    level: 3,
    question: '120 konzervet gúla alakban rendeznek: a legfelső sorba 1-et, minden sorba 1-gyel többet, mint a fölötte lévőbe. Hány konzerv kerül a legalsó sorba?',
    options: ['15', '16', '14', '24'],
    correctAnswer: 0,
    explanation: 'k(k + 1)/2 = 120 ⇒ k² + k − 240 = 0 ⇒ k = 15 (15 · 16/2 = 120).'
  },
  {
    id: 'asum-q23',
    questionTypeBadge: 'Konzervgúla',
    level: 3,
    question: 'Milyen magas lesz a 120 konzervből álló gúla (1-től 15-ig soronként), ha egy konzerv 12 cm magas?',
    options: ['180 cm', '192 cm', '168 cm', '120 cm'],
    correctAnswer: 0,
    explanation: '15 sor · 12 cm = 180 cm.'
  },
  {
    id: 'asum-q24',
    questionTypeBadge: 'Konzervgúla',
    level: 3,
    question: 'Hány konzerv kellene egy 3 m magas gúlához (12 cm-es konzervek, legfelül 1, soronként +1)?',
    options: ['325', '300', '351', '625'],
    correctAnswer: 0,
    explanation: '300/12 = 25 sor: 1 + 2 + … + 25 = 25 · 26/2 = 325.'
  },
  {
    id: 'asum-q25',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: '(Érettségi, 2015) Zsuzsa nagyszülei 18 hónapon át tesznek félre, összesen 90 000 Ft-ot; minden hónapban 200 Ft-tal többet, mint előző hónapban. Mennyit tesznek félre első alkalommal?',
    options: ['3300 Ft', '5000 Ft', '1600 Ft', '3400 Ft'],
    correctAnswer: 0,
    explanation: '(2a₁ + 17 · 200)/2 · 18 = 90 000 ⇒ 2a₁ + 3400 = 10 000 ⇒ a₁ = 3300 Ft. (5000 Ft az átlag.)'
  },
  {
    id: 'asum-q26',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: 'Zsuzsa nagyszülei (a₁ = 3300 Ft, d = 200 Ft, 18 hónap) mennyit tesznek félre az utolsó alkalommal?',
    options: ['6700 Ft', '6900 Ft', '5000 Ft', '3600 Ft'],
    correctAnswer: 0,
    explanation: 'a₁₈ = 3300 + 17 · 200 = 6700 Ft. (6900 Ft az a₁ + 18d hibás képletből jönne.)'
  },
  {
    id: 'asum-q27',
    questionTypeBadge: 'Tagszám',
    level: 3,
    question: 'Mennyi a pozitív páratlan számok összege 45-től 945-ig?',
    options: ['223 245', '222 750', '446 490', '223 740'],
    correctAnswer: 0,
    explanation: 'n = (945 − 45)/2 + 1 = 451; S = (45 + 945)/2 · 451 = 495 · 451 = 223 245.'
  },
  {
    id: 'asum-q28',
    questionTypeBadge: 'Tagszám',
    level: 3,
    question: 'Mennyi a páros számok összege −14-től 132-ig?',
    options: ['4366', '4307', '8732', '4425'],
    correctAnswer: 0,
    explanation: 'n = (132 − (−14))/2 + 1 = 74; S = (−14 + 132)/2 · 74 = 59 · 74 = 4366.'
  },
  {
    id: 'asum-q29',
    questionTypeBadge: 'Két tagból',
    level: 3,
    question: 'Egy számtani sorozatban a₃ = 6 és a₁₀ = −15. Mennyi S₂₀?',
    options: ['−330', '−660', '−300', '330'],
    correctAnswer: 0,
    explanation: '7d = −21 ⇒ d = −3; a₁ = 12, a₂₀ = 12 − 57 = −45; S₂₀ = (12 − 45)/2 · 20 = −330.'
  },
  {
    id: 'asum-q30',
    questionTypeBadge: 'Hány tag?',
    level: 3,
    question: 'Legalább hány tagját kell összeadni az 1; 2; 3; … sorozatnak, hogy az összeg meghaladja az 1000-et?',
    options: ['45', '44', '46', '32'],
    correctAnswer: 0,
    explanation: 'n(n + 1)/2 > 1000: n = 44-re 990, n = 45-re 1035. Tehát 45 tag kell.'
  }
];

export const ArithmeticSumQuiz: React.FC<{
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
      topicId="g12-seq-szamtani-osszeg-quiz"
      subtopicId="a-szamtani-sorozat-elso-n-tagjanak-osszege"
      title="4. A számtani sorozat első n tagjának összege – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: Sₙ két alakja, Gauss trükkje, tagszám, érettségi feladatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={ARITHMETIC_SUM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összegképletek',
          items: [
            'Sₙ = a₁ + a₂ + … + aₙ.',
            'Sₙ = (a₁ + aₙ)/2 · n.',
            'Sₙ = (2a₁ + (n − 1)d)/2 · n.',
            'aₙ = a₁ + (n − 1)d.'
          ]
        },
        {
          title: 'Ötletek',
          items: [
            'Előre + visszafelé: 2Sₙ = n(a₁ + aₙ).',
            'Gauss: 1 + 2 + … + n = n(n + 1)/2.',
            '1 + 3 + … + (2n − 1) = n².',
            'Átlag = középső tag = Sₙ/n.'
          ]
        },
        {
          title: 'Tagszám és ellenőrzés',
          items: [
            'n = (aₙ − a₁)/d + 1 (100-tól 1000-ig: 901 tag).',
            'Ne felejtsd a 2-vel osztást!',
            'Ha a₁ = −aₙ, akkor Sₙ = 0.',
            'Konzervgúla: k(k + 1)/2 darab.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ArithmeticSumMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ArithmeticSumSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ArithmeticSumQuiz;
