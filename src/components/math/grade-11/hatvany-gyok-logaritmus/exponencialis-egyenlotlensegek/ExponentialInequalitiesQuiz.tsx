import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExponentialInequalitiesMatcher } from './ExponentialInequalitiesMatcher';
import { ExponentialInequalitiesSorter } from './ExponentialInequalitiesSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** y = aˣ grafikonja és egy (vagy két) vízszintes egyenes; a megoldás nincs jelölve. */
const IneqFig: React.FC<{ a: number; levels: number[]; labels: string[]; xr?: number; yMax?: number; title: string }> = ({ a, levels, labels, xr = 5, yMax = 5, title }) => {
  const X = (x: number) => 120 + (x / xr) * 105;
  const Y = (y: number) => 130 - (y / yMax) * 110;
  const pts = Array.from({ length: 81 }, (_, i) => -xr + (i / 80) * 2 * xr)
    .filter((x) => Math.pow(a, x) <= yMax * 1.05)
    .map((x) => `${X(x).toFixed(1)},${Y(Math.pow(a, x)).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="12" y1={Y(0)} x2="230" y2={Y(0)} stroke="#334155" strokeWidth="1.3" />
      <line x1={X(0)} y1={Y(0) + 4} x2={X(0)} y2="12" stroke="#334155" strokeWidth="1.3" />
      <text x="230" y={Y(0) + 12} fontSize="9" textAnchor="end" fill="#334155">x</text>
      <text x={X(0) + 4} y="18" fontSize="9" fill="#334155">y</text>
      <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      {levels.map((v, i) => (
        <g key={i}>
          <line x1="12" y1={Y(v)} x2="230" y2={Y(v)} stroke="#db2777" strokeDasharray="4 3" />
          <text x={i % 2 ? 228 : 16} y={Y(v) - 3} fontSize="9" textAnchor={i % 2 ? 'end' : 'start'} fill="#9d174d" fontWeight="bold">
            y = {labels[i]}
          </text>
        </g>
      ))}
      <text x={a > 1 ? 30 : 210} y="40" fontSize="10" textAnchor="middle" fill="#4c1d95" fontWeight="bold">{title}</text>
    </svg>
  );
};

const EXPONENTIAL_INEQUALITIES_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'ei-q1',
    level: 1,
    questionTypeBadge: 'Monotonitás',
    question: 'Oldd meg: 2ˣ > 8.',
    options: ['x > 3', 'x < 3', 'x > 4', 'x > 2,5'],
    correctAnswer: 0,
    explanation: '8 = 2³, és a 2 alapú függvény növő, így a relációjel marad: x > 3.'
  },
  {
    id: 'ei-q2',
    level: 1,
    questionTypeBadge: 'Relációjel fordul',
    question: 'Oldd meg: (1/2)ˣ < 8.',
    figure: <IneqFig a={0.5} levels={[8]} labels={['8']} xr={5} yMax={10} title="y = (1/2)ˣ" />,
    options: ['x > −3', 'x < −3', 'x < 3', 'x > 3'],
    correctAnswer: 0,
    explanation: '8 = (1/2)⁻³. Mivel 0 < 1/2 < 1, a függvény csökkenő, a relációjel megfordul: x > −3.'
  },
  {
    id: 'ei-q3',
    level: 1,
    questionTypeBadge: 'Grafikus megoldás',
    question: 'Olvasd le az x ↦ 1,2ˣ grafikonjáról: mely x-ekre teljesül 1,2ˣ ≥ 1,44?',
    figure: <IneqFig a={1.2} levels={[1.44]} labels={['1,44']} xr={6} yMax={3} title="y = 1,2ˣ" />,
    options: ['x ≥ 2', 'x ≤ 2', 'x ≥ 1,2', 'x ≥ 1,44'],
    correctAnswer: 0,
    explanation: '1,2² = 1,44, és a függvény növő, így 1,2ˣ ≥ 1,44 ⇔ x ≥ 2.'
  },
  {
    id: 'ei-q4',
    level: 1,
    questionTypeBadge: 'Grafikus megoldás',
    question: 'Mely x-ekre teljesül 1,2ˣ < 1?',
    figure: <IneqFig a={1.2} levels={[1]} labels={['1']} xr={6} yMax={3} title="y = 1,2ˣ" />,
    options: ['x < 0', 'x > 0', 'x < 1', 'semmilyen x-re'],
    correctAnswer: 0,
    explanation: '1 = 1,2⁰, a függvény növő: 1,2ˣ < 1,2⁰ ⇔ x < 0.'
  },
  {
    id: 'ei-q5',
    level: 1,
    questionTypeBadge: 'Monotonitás',
    question: 'Melyik x ↦ aˣ függvénynél fordul meg a relációjel az egyenlőtlenség megoldásakor?',
    options: ['a = 0,94', 'a = 1,08', 'a = 1,002', 'a = 3'],
    correctAnswer: 0,
    explanation: 'A relációjel akkor fordul, ha a függvény csökkenő, vagyis 0 < a < 1 – itt a = 0,94.'
  },
  {
    id: 'ei-q6',
    level: 1,
    questionTypeBadge: 'Közös alap',
    question: 'Oldd meg: 3ˣ ≤ 2187.',
    options: ['x ≤ 7', 'x ≥ 7', 'x ≤ 6', 'x ≤ 729'],
    correctAnswer: 0,
    explanation: '2187 = 3⁷, a függvény növő: x ≤ 7.'
  },
  {
    id: 'ei-q7',
    level: 1,
    questionTypeBadge: 'Relációjel fordul',
    question: 'Oldd meg: 0,5ˣ ≥ 4.',
    options: ['x ≤ −2', 'x ≥ −2', 'x ≥ 2', 'x ≤ 2'],
    correctAnswer: 0,
    explanation: '4 = 0,5⁻², a függvény csökkenő, a relációjel fordul: x ≤ −2.'
  },
  {
    id: 'ei-q8',
    level: 1,
    questionTypeBadge: 'Értékkészlet',
    question: 'Mely valós x-ekre teljesül 5ˣ > 0?',
    options: ['minden valós x-re', 'x > 0', 'x ≥ 1', 'semmilyen x-re'],
    correctAnswer: 0,
    explanation: 'Az exponenciális függvény minden értéke pozitív, tehát 5ˣ > 0 minden x-re igaz.'
  },
  {
    id: 'ei-q9',
    level: 1,
    questionTypeBadge: 'Értékkészlet',
    question: 'Hány valós megoldása van a 2ˣ < −3 egyenlőtlenségnek?',
    options: ['nincs megoldása', 'egy', 'végtelen sok, x < 0', 'végtelen sok, x < −3'],
    correctAnswer: 0,
    explanation: '2ˣ mindig pozitív, így sosem lehet −3-nál kisebb: nincs megoldás.'
  },
  {
    id: 'ei-q10',
    level: 1,
    questionTypeBadge: 'Monotonitás',
    question: 'Oldd meg: 10ˣ ≥ 100.',
    options: ['x ≥ 2', 'x ≥ 10', 'x ≤ 2', 'x ≥ 1'],
    correctAnswer: 0,
    explanation: '100 = 10², a függvény növő: x ≥ 2.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'ei-q11',
    level: 2,
    questionTypeBadge: 'Kettős egyenlőtlenség',
    question: 'Oldd meg: 1 ≤ 1,5ˣ ≤ 10.',
    figure: <IneqFig a={1.5} levels={[1, 10]} labels={['1', '10']} xr={7} yMax={12} title="y = 1,5ˣ" />,
    options: ['0 ≤ x ≤ 5,679', '1 ≤ x ≤ 6,667', '0 ≤ x ≤ 0,176', '−5,679 ≤ x ≤ 0'],
    correctAnswer: 0,
    explanation: '1 = 1,5⁰; 1,5ˣ = 10 ⇔ x = lg 10 / lg 1,5 ≈ 5,679. A függvény növő: 0 ≤ x ≤ 5,679. (6,667 = 10 / 1,5 hibás.)'
  },
  {
    id: 'ei-q12',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Oldd meg: 1,15 < 1,002ˣ < 1,2.',
    options: ['69,95 < x < 91,25', '575 < x < 600', '0,06 < x < 0,08', '−91,25 < x < −69,95'],
    correctAnswer: 0,
    explanation: 'x = lg 1,15 / lg 1,002 ≈ 69,95 és x = lg 1,2 / lg 1,002 ≈ 91,25; az alap > 1, a relációjelek maradnak.'
  },
  {
    id: 'ei-q13',
    level: 2,
    questionTypeBadge: 'Modell',
    question: 'Egy részvény értéke f(x) = 2000 · 1,002ˣ Ft (x: nap). Hányadik naptól hányadikig lesz az értéke 2300 és 2400 Ft között?',
    options: ['a 70. naptól a 91. napig', 'a 69. naptól a 92. napig', 'a 150. naptól a 200. napig', 'a 7. naptól a 9. napig'],
    correctAnswer: 0,
    explanation: '1,15 < 1,002ˣ < 1,2 ⇔ 69,95 < x < 91,25, egész napokra 70 ≤ x ≤ 91.'
  },
  {
    id: 'ei-q14',
    level: 2,
    questionTypeBadge: 'Modell',
    question: 'Egy webáruház napi vásárlásainak száma N(x) = 10 · 1,08ˣ (x: a nyitás óta eltelt napok). Hányadik napon lépte át először a napi 100-at?',
    figure: <IneqFig a={1.08} levels={[10]} labels={['100 / 10 = 10']} xr={40} yMax={14} title="y = 1,08ˣ" />,
    options: ['a 30. napon', 'a 29. napon', 'a 13. napon', 'a 113. napon'],
    correctAnswer: 0,
    explanation: '1,08ˣ > 10 ⇔ x > lg 10 / lg 1,08 ≈ 29,92, így először a 30. napon. (13 ≈ 10 / 0,08 hibás.)'
  },
  {
    id: 'ei-q15',
    level: 2,
    questionTypeBadge: 'Relációjel fordul',
    question: 'Oldd meg: 0,06 < 0,6ˣ < 6.',
    options: ['−3,508 < x < 5,508', '−5,508 < x < 3,508', '0,1 < x < 10', '3,508 < x < 5,508'],
    correctAnswer: 0,
    explanation: 'lg 6 / lg 0,6 ≈ −3,508 és lg 0,06 / lg 0,6 ≈ 5,508. Az alap < 1, a relációjelek fordulnak: −3,508 < x < 5,508.'
  },
  {
    id: 'ei-q16',
    level: 2,
    questionTypeBadge: 'Relációjel fordul',
    question: 'Oldd meg: 0,8ˣ < 0,5.',
    figure: <IneqFig a={0.8} levels={[0.5]} labels={['0,5']} xr={8} yMax={4} title="y = 0,8ˣ" />,
    options: ['x > 3,106', 'x < 3,106', 'x > 0,625', 'x < −3,106'],
    correctAnswer: 0,
    explanation: 'x₀ = lg 0,5 / lg 0,8 ≈ 3,106. A függvény csökkenő, a reláció fordul: x > 3,106.'
  },
  {
    id: 'ei-q17',
    level: 2,
    questionTypeBadge: 'Százalék',
    question: 'A tigrisek száma t(x) = 3600 · 0,854ˣ (x: 2014 vége óta eltelt évek). Hány százalékkal csökken a számuk 2016 végére?',
    options: ['≈ 27,1%-kal', '≈ 29,2%-kal', '≈ 14,6%-kal', '≈ 72,9%-kal'],
    correctAnswer: 0,
    explanation: 'x = 2: 0,854² ≈ 0,7293, tehát kb. 27,1%-os csökkenés. (29,2% = 2 · 14,6% hibás összeadás; 72,9% a megmaradó rész.)'
  },
  {
    id: 'ei-q18',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Oldd meg: 2ˣ ≥ 10.',
    options: ['x ≥ 3,322', 'x ≥ 5', 'x ≤ 3,322', 'x ≥ 0,301'],
    correctAnswer: 0,
    explanation: 'x₀ = lg 10 / lg 2 ≈ 3,322, a függvény növő: x ≥ 3,322.'
  },
  {
    id: 'ei-q19',
    level: 2,
    questionTypeBadge: 'Monotonitás',
    question: 'Oldd meg: 0,9ˣ > 0,9⁵.',
    options: ['x < 5', 'x > 5', 'x > 0,9', 'x < 0,9'],
    correctAnswer: 0,
    explanation: 'Azonos, 1-nél kisebb alap: a függvény csökkenő, ezért x < 5.'
  },
  {
    id: 'ei-q20',
    level: 2,
    questionTypeBadge: 'Rendezés',
    question: 'Oldd meg: 3 · 2ˣ > 48.',
    options: ['x > 4', 'x > 16', 'x > 5', 'x > 3'],
    correctAnswer: 0,
    explanation: '2ˣ > 16 = 2⁴ ⇒ x > 4.'
  },

  // LEVEL 3 (21–30)
  {
    id: 'ei-q21',
    level: 3,
    questionTypeBadge: 'Modell',
    question: 'A webáruház napi vásárlásai (N(x) = 10 · 1,08ˣ) várhatóan 1250 és 1750 között állandósulnak. Legalább és legfeljebb kb. hány napig tarthat a növekedő szakasz?',
    options: ['kb. 63 és 67 nap között', 'kb. 125 és 175 nap között', 'kb. 30 és 40 nap között', 'kb. 56 és 61 nap között'],
    correctAnswer: 0,
    explanation: '125 < 1,08ˣ < 175 ⇔ lg 125 / lg 1,08 ≈ 62,74 < x < lg 175 / lg 1,08 ≈ 67,11.'
  },
  {
    id: 'ei-q22',
    level: 3,
    questionTypeBadge: 'Modell',
    question: 'P(x) = 50 · 0,94ˣ millió fő az x évesek száma (40 < x < 75). Hány évesek azok a korosztályok, amelyeknek egymilliónál több tagjuk van?',
    options: ['41–63 évesek', '64–74 évesek', '41–53 évesek', '53–70 évesek'],
    correctAnswer: 0,
    explanation: '0,94ˣ > 0,02 ⇔ x < lg 0,02 / lg 0,94 ≈ 63,22 (fordul a reláció!). 40 < x ≤ 63, vagyis 41–63 évesek.'
  },
  {
    id: 'ei-q23',
    level: 3,
    questionTypeBadge: 'Felezési idő',
    question: 'A ¹⁴C felezési ideje 5730 év. Legfeljebb kb. milyen régi az a csont, amelynek ¹⁴C-tartalma még több mint 15%-a az eredetinek?',
    options: ['≈ 15 683 év', '≈ 4732 év', '≈ 859 év', '≈ 38 200 év'],
    correctAnswer: 0,
    explanation: '(1/2)^{t/5730} > 0,15 ⇔ t/5730 < lg 0,15 / lg 0,5 ≈ 2,737 ⇔ t < ≈ 15 683 év.'
  },
  {
    id: 'ei-q24',
    level: 3,
    questionTypeBadge: 'Érettségi',
    question: 't(x) = 3600 · 0,854ˣ (x: 2014 vége óta eltelt évek). Melyik évben várható, hogy a tigrisek száma 900 alá csökken?',
    options: ['2023', '2022', '2018', '2028'],
    correctAnswer: 0,
    explanation: '0,854ˣ < 0,25 ⇔ x > lg 0,25 / lg 0,854 ≈ 8,78, tehát x = 9: 2014 + 9 = 2023 (t(8) ≈ 1019, t(9) ≈ 870).'
  },
  {
    id: 'ei-q25',
    level: 3,
    questionTypeBadge: 'Csapda',
    question: 'Melyik a helyes megoldása a 0,94ˣ > 0,02 egyenlőtlenségnek?',
    options: ['x < 63,22', 'x > 63,22', 'x < −63,22', 'x > 0,021'],
    correctAnswer: 0,
    explanation: 'x · lg 0,94 > lg 0,02; a negatív lg 0,94-gyel osztva a reláció fordul: x < lg 0,02 / lg 0,94 ≈ 63,22.'
  },
  {
    id: 'ei-q26',
    level: 3,
    questionTypeBadge: 'Kamatos kamat',
    question: '2000 Ft évi 5%-os kamatos kamatra. Legalább hány év kell ahhoz, hogy több mint 3000 Ft legyen a számlán?',
    options: ['9 év', '8 év', '10 év', '20 év'],
    correctAnswer: 0,
    explanation: '1,05ⁿ > 1,5 ⇔ n > lg 1,5 / lg 1,05 ≈ 8,31, tehát legalább 9 év. (10 év az egyszerű kamatos számolás.)'
  },
  {
    id: 'ei-q27',
    level: 3,
    questionTypeBadge: 'Relációjel fordul',
    question: 'Oldd meg: (1/3)ˣ ≤ 27.',
    options: ['x ≥ −3', 'x ≤ −3', 'x ≤ 3', 'x ≥ 3'],
    correctAnswer: 0,
    explanation: '27 = (1/3)⁻³; a függvény csökkenő, a reláció fordul: x ≥ −3.'
  },
  {
    id: 'ei-q28',
    level: 3,
    questionTypeBadge: 'Közös alap',
    question: 'Oldd meg: 4ˣ < 8.',
    options: ['x < 1,5', 'x < 2', 'x > 1,5', 'x < 0,5'],
    correctAnswer: 0,
    explanation: '2²ˣ < 2³ ⇔ 2x < 3 ⇔ x < 1,5.'
  },
  {
    id: 'ei-q29',
    level: 3,
    questionTypeBadge: 'Modell',
    question: 'Egy gyógyszer mennyisége a szervezetben 100 · 0,7ˣ mg (x: óra). Legalább hány egész óra után lesz legfeljebb 10 mg?',
    options: ['7 óra', '6 óra', '13 óra', '3 óra'],
    correctAnswer: 0,
    explanation: '0,7ˣ ≤ 0,1 ⇔ x ≥ lg 0,1 / lg 0,7 ≈ 6,456 (fordul a reláció), a legkisebb egész: 7.'
  },
  {
    id: 'ei-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Mely x-ekre teljesül 2ˣ > 3ˣ?',
    options: ['x < 0', 'x > 0', 'minden x-re', 'semmilyen x-re'],
    correctAnswer: 0,
    explanation: '3ˣ > 0-val osztva: (2/3)ˣ > 1 = (2/3)⁰. Az alap < 1, a reláció fordul: x < 0. (Pl. x = −1: 1/2 > 1/3 ✓.)'
  }
];

export const ExponentialInequalitiesQuiz: React.FC<{
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
      topicId="g11-exp-exponencialis-egyenlotlenseg-quiz"
      subtopicId="exponencialis-egyenlotlensegek"
      title="14. Exponenciális egyenlőtlenségek – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: grafikus megoldás, monotonitás és relációjel-fordulás, kettős egyenlőtlenségek, valós modellek."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={EXPONENTIAL_INEQUALITIES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Monotonitás',
          items: [
            'a > 1: x ↦ aˣ növő, a relációjel marad',
            '0 < a < 1: csökkenő, a relációjel megfordul',
            '(1/2)ˣ < 8 = (1/2)⁻³ ⇔ x > −3',
            'aˣ > 0 mindig: aˣ < −3 nincs megoldás'
          ]
        },
        {
          title: 'Határok logaritmussal',
          items: [
            'aˣ = b ⇔ x = lg b / lg a',
            '2ˣ ≥ 10 ⇔ x ≥ 3,322',
            '0,8ˣ < 0,5 ⇔ x > 3,106',
            'c · aˣ: előbb osszunk c-vel!'
          ]
        },
        {
          title: 'Modellek, egész értékek',
          items: [
            '2300 < 2000 · 1,002ˣ < 2400 ⇔ 69,95 < x < 91,25',
            'egész napokra: 70 ≤ x ≤ 91',
            'P(x) = 50 · 0,94ˣ > 1 ⇔ x < 63,22',
            '„először lépi át”: a határ fölötti első egész'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExponentialInequalitiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ExponentialInequalitiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ExponentialInequalitiesQuiz;
