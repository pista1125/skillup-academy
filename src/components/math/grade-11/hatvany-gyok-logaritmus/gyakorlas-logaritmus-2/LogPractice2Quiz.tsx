import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LogPractice2Matcher } from './LogPractice2Matcher';
import { LogPractice2Sorter } from './LogPractice2Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const path = (f: (t: number) => number, t0: number, t1: number, sx: (t: number) => number, sy: (y: number) => number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = t0 + ((t1 - t0) * i) / 60;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx(t).toFixed(1)},${sy(f(t)).toFixed(1)}`);
  }
  return pts.join(' ');
};

/** K(t) = 60 · 0,87^t görbe, a kérdezett hely „?”-lel. */
const CoffeeFig: React.FC<{ askT?: number; askK?: number; tMin?: number }> = ({ askT, askK, tMin = 0 }) => {
  const sx = (t: number) => 40 + (t - tMin) * (180 / (30 - tMin));
  const sy = (k: number) => 125 - k * (askT !== undefined && askT < 0 ? 0.75 : 1.6);
  const f = (t: number) => 60 * Math.pow(0.87, t);
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="40" y1="125" x2="228" y2="125" stroke="#475569" />
      <line x1={sx(0)} y1="128" x2={sx(0)} y2="10" stroke="#475569" />
      <text x="226" y="140" fontSize="9" textAnchor="end" fill="#334155">t (perc)</text>
      <text x={sx(0) + 4} y="16" fontSize="9" fill="#334155">K (°C)</text>
      <text x={sx(0) - 3} y={sy(60) + 3} fontSize="9" textAnchor="end" fill="#334155">60</text>
      <line x1={sx(0) - 3} y1={sy(60)} x2={sx(0)} y2={sy(60)} stroke="#475569" />
      <path d={path(f, tMin, 30, sx, sy)} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      {askT !== undefined && (
        <g>
          <line x1={sx(askT)} y1="125" x2={sx(askT)} y2={sy(f(askT))} stroke="#db2777" strokeDasharray="3 3" />
          <circle cx={sx(askT)} cy={sy(f(askT))} r="3.5" fill="#db2777" />
          <text x={sx(askT)} y="138" fontSize="9" textAnchor="middle" fill="#9d174d">{askT}</text>
          <text x={sx(askT) + 6} y={sy(f(askT)) - 5} fontSize="11" fontWeight="bold" fill="#9d174d">?</text>
        </g>
      )}
      {askK !== undefined && (
        <g>
          <line x1={sx(0)} y1={sy(askK)} x2="228" y2={sy(askK)} stroke="#db2777" strokeDasharray="3 3" />
          <text x={sx(0) - 3} y={sy(askK) + 3} fontSize="9" textAnchor="end" fill="#9d174d">{askK}</text>
          <text x="200" y={sy(askK) - 4} fontSize="11" fontWeight="bold" fill="#9d174d">t = ?</text>
        </g>
      )}
    </svg>
  );
};

/** Légnyomás-görbe; a kérdezett érték „?”. */
const PressureFig: React.FC<{ askX?: number; askP?: number; label?: string }> = ({ askX, askP, label }) => {
  const sx = (x: number) => 40 + x * 18;
  const sy = (p: number) => 125 - p / 1000;
  const f = (x: number) => 1.013e5 * Math.pow(1.133, -x);
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="40" y1="125" x2="228" y2="125" stroke="#475569" />
      <line x1="40" y1="128" x2="40" y2="10" stroke="#475569" />
      <text x="226" y="140" fontSize="9" textAnchor="end" fill="#334155">x (km)</text>
      <text x="44" y="16" fontSize="9" fill="#334155">p (Pa)</text>
      <path d={path(f, 0, 10, sx, sy)} fill="none" stroke="#0f766e" strokeWidth="2.5" />
      {askX !== undefined && (
        <g>
          <line x1={sx(askX)} y1="125" x2={sx(askX)} y2={sy(f(askX))} stroke="#7c3aed" strokeDasharray="3 3" />
          <circle cx={sx(askX)} cy={sy(f(askX))} r="3.5" fill="#7c3aed" />
          <text x={sx(askX)} y="138" fontSize="9" textAnchor="middle" fill="#4c1d95">{label}</text>
          <text x={sx(askX) + 6} y={sy(f(askX)) - 5} fontSize="11" fontWeight="bold" fill="#4c1d95">p = ?</text>
        </g>
      )}
      {askP !== undefined && (
        <g>
          <line x1="40" y1={sy(askP)} x2="228" y2={sy(askP)} stroke="#7c3aed" strokeDasharray="3 3" />
          <text x="150" y={sy(askP) - 5} fontSize="10" fontWeight="bold" fill="#4c1d95">{label}</text>
          <text x="210" y={sy(askP) + 14} fontSize="11" fontWeight="bold" fill="#4c1d95">x = ?</text>
        </g>
      )}
    </svg>
  );
};

/** Számegyenes 17 és 22 között, a k helye „?”. */
const IntervalFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <text x="120" y="30" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">1,065ᵏ = 3,45</text>
    <line x1="15" y1="85" x2="225" y2="85" stroke="#475569" strokeWidth="1.5" />
    {[17, 18, 19, 20, 21, 22].map((n, i) => (
      <g key={n}>
        <line x1={20 + i * 40} y1="80" x2={20 + i * 40} y2="90" stroke="#475569" />
        <text x={20 + i * 40} y="106" fontSize="10" textAnchor="middle" fill="#334155">{n}</text>
      </g>
    ))}
    <text x="120" y="70" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#db2777">k = ?</text>
    <text x="120" y="132" fontSize="10" textAnchor="middle" fill="#475569">Melyik két egész közé esik?</text>
  </svg>
);

const LOG_PRACTICE_2_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'lp2-q1',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₃ 9 értéke?',
    options: ['2', '3', '1/2', '27'],
    correctAnswer: 0,
    explanation: '3² = 9, ezért log₃ 9 = 2.'
  },
  {
    id: 'lp2-q2',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi (log₃ 1/9)⁻¹ értéke?',
    options: ['−1/2', '−2', '1/2', '2'],
    correctAnswer: 0,
    explanation: '1/9 = 3⁻², így log₃ 1/9 = −2, és (−2)⁻¹ = −1/2.'
  },
  {
    id: 'lp2-q3',
    level: 1,
    questionTypeBadge: 'Tízes alapú log.',
    question: 'Mennyi lg 0,0001 értéke?',
    options: ['−4', '4', '−3', '−5'],
    correctAnswer: 0,
    explanation: '0,0001 = 10⁻⁴, ezért lg 0,0001 = −4.'
  },
  {
    id: 'lp2-q4',
    level: 1,
    questionTypeBadge: 'Tízes alapú log.',
    question: 'Mennyi lg ³√10 értéke?',
    options: ['1/3', '3', '−1/3', '10/3'],
    correctAnswer: 0,
    explanation: '³√10 = 10^{1/3}, ezért lg ³√10 = 1/3.'
  },
  {
    id: 'lp2-q5',
    level: 1,
    questionTypeBadge: 'Exp. egyenlet',
    question: 'Oldd meg: 2,4ˣ = 5,76.',
    options: ['x = 2', 'x = 2,4', 'x = 0,5', 'x = 3'],
    correctAnswer: 0,
    explanation: '2,4² = 5,76, tehát x = 2.'
  },
  {
    id: 'lp2-q6',
    level: 1,
    questionTypeBadge: 'Exp. egyenlet',
    question: 'Oldd meg: 3ˣ⁺¹ = 81.',
    options: ['x = 3', 'x = 4', 'x = 26', 'x = 2'],
    correctAnswer: 0,
    explanation: '81 = 3⁴, így x + 1 = 4, vagyis x = 3.'
  },
  {
    id: 'lp2-q7',
    level: 1,
    questionTypeBadge: 'Hűlési törvény',
    question: 'A kávé és a szoba hőmérséklet-különbsége K(t) = 60 · 0,87ᵗ (t percben). Mennyi a különbség kezdetben (t = 0)?',
    options: ['60 °C', '80 °C', '20 °C', '52,2 °C'],
    correctAnswer: 0,
    explanation: 'K(0) = 60 · 0,87⁰ = 60 · 1 = 60 °C (80 °C − 20 °C).'
  },
  {
    id: 'lp2-q8',
    level: 1,
    questionTypeBadge: 'Információ',
    question: 'Shannon-képlet: I = −log₂ p. Mennyi az 1/8 valószínűségű esemény információtartalma?',
    options: ['3 bit', '8 bit', '−3 bit', '1/3 bit'],
    correctAnswer: 0,
    explanation: 'log₂ (1/8) = −3, így I = −(−3) = 3 bit.'
  },
  {
    id: 'lp2-q9',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₂ 64 értéke?',
    options: ['6', '8', '32', '5'],
    correctAnswer: 0,
    explanation: '2⁶ = 64, ezért log₂ 64 = 6.'
  },
  {
    id: 'lp2-q10',
    level: 1,
    questionTypeBadge: 'Értelmezési tart.',
    question: 'Mely valós x-ekre értelmezhető a log₁/₃ (2 − x) kifejezés?',
    options: ['x < 2', 'x > 2', 'x ≠ 2', 'x < 1/3'],
    correctAnswer: 0,
    explanation: 'A logaritmus mögött pozitív szám állhat: 2 − x > 0, azaz x < 2.'
  },

  // LEVEL 2
  {
    id: 'lp2-q11',
    level: 2,
    questionTypeBadge: 'Tízes alapú log.',
    question: 'Mennyi lg ³√10 − (2/3) · lg 0,0001 értéke?',
    options: ['3', '−7/3', '8/3', '−3'],
    correctAnswer: 0,
    explanation: 'lg ³√10 = 1/3, lg 0,0001 = −4, így 1/3 − (2/3) · (−4) = 1/3 + 8/3 = 3.'
  },
  {
    id: 'lp2-q12',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két szomszédos egész szám közé esik k, ha 1,065ᵏ = 3,45?',
    figure: <IntervalFig />,
    options: ['19 és 20', '18 és 19', '20 és 21', '3 és 4'],
    correctAnswer: 0,
    explanation: 'k = lg 3,45 / lg 1,065 ≈ 19,66. Ellenőrzés: 1,065¹⁹ ≈ 3,31 < 3,45 < 3,52 ≈ 1,065²⁰.'
  },
  {
    id: 'lp2-q13',
    level: 2,
    questionTypeBadge: 'Hűlési törvény',
    question: 'K(t) = 60 · 0,87ᵗ. Mennyi lesz a hőmérséklet-különbség negyedóra (15 perc) múlva?',
    figure: <CoffeeFig askT={15} />,
    options: ['≈ 7,4 °C', '≈ 52,2 °C', '≈ 27,4 °C', '≈ 12,0 °C'],
    correctAnswer: 0,
    explanation: 'K(15) = 60 · 0,87¹⁵ ≈ 60 · 0,1238 ≈ 7,4 °C.'
  },
  {
    id: 'lp2-q14',
    level: 2,
    questionTypeBadge: 'Hűlési törvény',
    question: 'A 20 °C-os szobában a kávé és a szoba hőmérséklet-különbsége K(t) = 60 · 0,87ᵗ. Hány fokos lesz a kávé 15 perc múlva?',
    options: ['≈ 27,4 °C', '≈ 7,4 °C', '≈ 12,6 °C', '≈ 47,4 °C'],
    correctAnswer: 0,
    explanation: 'K(15) ≈ 7,4 °C, a kávé hőmérséklete a szobáénál ennyivel nagyobb: 20 + 7,4 ≈ 27,4 °C.'
  },
  {
    id: 'lp2-q15',
    level: 2,
    questionTypeBadge: 'Felezési idő',
    question: 'K(t) = 60 · 0,87ᵗ. Mennyi idő alatt csökken a felére a hőmérséklet-különbség?',
    figure: <CoffeeFig askK={30} />,
    options: ['≈ 4,98 perc', '≈ 0,20 perc', '≈ 7,7 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '0,87ᵗ = 0,5 ⇒ t = lg 0,5 / lg 0,87 ≈ 4,98 perc.'
  },
  {
    id: 'lp2-q16',
    level: 2,
    questionTypeBadge: 'Légnyomás',
    question: 'p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (Pa). Mekkora a légnyomás a Kékestetőn (x = 1,014 km)?',
    figure: <PressureFig askX={1.014} label="1,014" />,
    options: ['≈ 89 250 Pa', '≈ 114 970 Pa', '≈ 101 300 Pa', '≈ 99 900 Pa'],
    correctAnswer: 0,
    explanation: 'p(1,014) = 101 300 · 1,133^(−1,014) ≈ 89 250 Pa. (A 114 970 Pa a kitevő előjelének elhagyásából adódna.)'
  },
  {
    id: 'lp2-q17',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₂ 64 · (log₄ 8 − log₈ 4) értéke?',
    options: ['5', '6', '0', '1/6'],
    correctAnswer: 0,
    explanation: 'log₂ 64 = 6, log₄ 8 = 3/2 (4^{3/2} = 8), log₈ 4 = 2/3 (8^{2/3} = 4). 6 · (3/2 − 2/3) = 6 · 5/6 = 5.'
  },
  {
    id: 'lp2-q18',
    level: 2,
    questionTypeBadge: 'Exp. egyenlet',
    question: 'Oldd meg: 4³ˣ⁻¹ = 0,5.',
    options: ['x = 1/6', 'x = −1/6', 'x = 1/2', 'x = 1/3'],
    correctAnswer: 0,
    explanation: '4³ˣ⁻¹ = 2⁶ˣ⁻² és 0,5 = 2⁻¹, így 6x − 2 = −1, x = 1/6.'
  },
  {
    id: 'lp2-q19',
    level: 2,
    questionTypeBadge: 'Információ',
    question: 'Hartley-formula: H = n · log₂ N. Mekkora egy 4 számjegyből álló PIN-kód információértéke?',
    options: ['≈ 13,29 bit', '40 bit', '≈ 3,32 bit', '≈ 4 bit'],
    correctAnswer: 0,
    explanation: 'N = 10 számjegy, n = 4: H = 4 · log₂ 10 = 4 · lg 10 / lg 2 ≈ 4 · 3,32 ≈ 13,29 bit.'
  },
  {
    id: 'lp2-q20',
    level: 2,
    questionTypeBadge: 'Értelmezési tart.',
    question: 'Mely valós x-ekre értelmezhető a log₇ (3x + 16) kifejezés?',
    options: ['x > −16/3', 'x > 16/3', 'x ≥ −16/3', 'x > −16'],
    correctAnswer: 0,
    explanation: '3x + 16 > 0 ⇒ x > −16/3. Az egyenlőség nem megengedett, mert log₇ 0 nem értelmezett.'
  },

  // LEVEL 3
  {
    id: 'lp2-q21',
    level: 3,
    questionTypeBadge: 'Légnyomás',
    question: 'p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (Pa). Hány km magasságban lesz a légnyomás 80 000 Pa?',
    figure: <PressureFig askP={80000} label="80 000 Pa" />,
    options: ['≈ 1,89 km', '≈ 0,53 km', '≈ 18,9 km', '≈ 2,13 km'],
    correctAnswer: 0,
    explanation: '1,133ˣ = 101 300 / 80 000 ≈ 1,266 ⇒ x = lg 1,266 / lg 1,133 ≈ 1,89 km.'
  },
  {
    id: 'lp2-q22',
    level: 3,
    questionTypeBadge: 'Felezési magasság',
    question: 'p(x) = 1,013 · 10⁵ · 1,133⁻ˣ. Hány km-enként csökken a felére a légnyomás („felezési magasság”)?',
    options: ['≈ 5,55 km', '≈ 0,18 km', '≈ 7,58 km', '≈ 4,42 km'],
    correctAnswer: 0,
    explanation: '1,133⁻ʰ = 1/2 ⇒ 1,133ʰ = 2 ⇒ h = lg 2 / lg 1,133 ≈ 5,55 km. (A 0,18 a fordított hányados lenne.)'
  },
  {
    id: 'lp2-q23',
    level: 3,
    questionTypeBadge: 'Hűlési törvény',
    question: 'A 20 °C-os szobában K(t) = 60 · 0,87ᵗ. Milyen forró lett volna a modell szerint a kávé a mérés kezdete előtt 5 perccel?',
    options: ['≈ 140 °C', '≈ 120 °C', '≈ 50 °C', '80 °C'],
    correctAnswer: 0,
    explanation: 't = −5: K(−5) = 60 · 0,87⁻⁵ ≈ 120,4 °C, a kávé tehát ≈ 20 + 120,4 ≈ 140 °C – ez irreális, a modell nem érvényes visszafelé ilyen messzire.'
  },
  {
    id: 'lp2-q24',
    level: 3,
    questionTypeBadge: 'Exp. egyenlőtlenség',
    question: 'A 20 °C-os szobában K(t) = 60 · 0,87ᵗ. Kb. hány perc múlva hűl a kávé 21 °C alá?',
    figure: <CoffeeFig askK={1} />,
    options: ['≈ 30 perc múlva', '≈ 5 perc múlva', '≈ 15 perc múlva', '≈ 60 perc múlva'],
    correctAnswer: 0,
    explanation: 'K(t) < 1 ⇒ 0,87ᵗ < 1/60 ⇒ t > lg(1/60) / lg 0,87 ≈ 29,4 (a reláció megfordul, mert lg 0,87 < 0). Kb. 30 perc múlva.'
  },
  {
    id: 'lp2-q25',
    level: 3,
    questionTypeBadge: 'Kamatos kamat',
    question: '(Érettségi, 2011) Hány teljes év alatt nő a 2000 eurós tőke évi 6%-os kamatos kamattal 4024 euróra?',
    options: ['12 év', '11 év', '13 év', '17 év'],
    correctAnswer: 0,
    explanation: '1,06ⁿ = 2,012 ⇒ n = lg 2,012 / lg 1,06 ≈ 11,998. 2000 · 1,06¹¹ ≈ 3797 €, 2000 · 1,06¹² ≈ 4024,4 €, tehát 12 év.'
  },
  {
    id: 'lp2-q26',
    level: 3,
    questionTypeBadge: 'Információ',
    question: 'I = −log₂ p. Mekkora a 3/7 valószínűségű esemény információtartalma?',
    options: ['≈ 1,22 bit', '≈ 0,37 bit', '≈ 2,33 bit', '≈ −1,22 bit'],
    correctAnswer: 0,
    explanation: 'I = −lg(3/7) / lg 2 ≈ 0,368 / 0,301 ≈ 1,22 bit. (0,37 a −lg(3/7) lenne, a 2-vel való osztás nélkül.)'
  },
  {
    id: 'lp2-q27',
    level: 3,
    questionTypeBadge: 'Információ',
    question: 'H = n · log₂ N. Mekkora a 24 betűs ábécéből kirakott, 10 karakteres jelsorozat információértéke?',
    options: ['≈ 45,85 bit', '240 bit', '≈ 13,80 bit', '≈ 4,58 bit'],
    correctAnswer: 0,
    explanation: 'H = 10 · log₂ 24 = 10 · lg 24 / lg 2 ≈ 10 · 4,585 ≈ 45,85 bit.'
  },
  {
    id: 'lp2-q28',
    level: 3,
    questionTypeBadge: 'Exp. egyenlőtlenség',
    question: 'Oldd meg a valós számok halmazán: (7/8)⁵ˣ⁻⁴ < 8/7.',
    options: ['x > 3/5', 'x < 3/5', 'x > 1', 'x < 1'],
    correctAnswer: 0,
    explanation: '8/7 = (7/8)⁻¹. Az alap 1-nél kisebb, ezért a reláció megfordul: 5x − 4 > −1 ⇒ x > 3/5.'
  },
  {
    id: 'lp2-q29',
    level: 3,
    questionTypeBadge: 'Exp. egyenlőtlenség',
    question: 'K(t) = 60 · 0,87ᵗ. Mely t ≥ 0 értékekre kisebb a hőmérséklet-különbség 15 °C-nál?',
    options: ['t > kb. 9,95 perc', 't < kb. 9,95 perc', 't > kb. 4,98 perc', 't < kb. 4,98 perc'],
    correctAnswer: 0,
    explanation: '0,87ᵗ < 0,25 ⇒ t > lg 0,25 / lg 0,87 ≈ 9,95. A 15 °C a 60 °C negyede, ez két felezési idő (2 · 4,98).'
  },
  {
    id: 'lp2-q30',
    level: 3,
    questionTypeBadge: 'Becslés',
    question: 'Melyik az a legkisebb egész k, amelyre 1,065ᵏ > 3,45?',
    options: ['20', '19', '21', '4'],
    correctAnswer: 0,
    explanation: 'lg 3,45 / lg 1,065 ≈ 19,66, és 1,065ᵏ szigorúan növekvő, így a legkisebb ilyen egész a 20 (1,065²⁰ ≈ 3,52; 1,065¹⁹ ≈ 3,31).'
  }
];

export const LogPractice2Quiz: React.FC<{
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
      topicId="g11-exp-log-gyakorlas-masodik-quiz"
      subtopicId="gyakorlas-logaritmus-2"
      title="15. Gyakorlás – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: logaritmus számológéppel és anélkül, légnyomás, kávé hűlése, információtartalom."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={LOG_PRACTICE_2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Logaritmus',
          items: [
            'logₐ b = x ⇔ aˣ = b (a > 0, a ≠ 1, b > 0)',
            'logₐ b = lg b / lg a (áttérés tízes alapra)',
            'lg 0,0001 = −4; lg ³√10 = 1/3; log₃ 1/9 = −2',
            'log₂ x = lg x / lg 2'
          ]
        },
        {
          title: 'Modellek',
          items: [
            'Hűlés: K(t) = 60 · 0,87ᵗ, T(t) = 20 + K(t)',
            'Légnyomás: p(x) = 1,013 · 10⁵ · 1,133⁻ˣ',
            'Felezés: qᵀ = 1/2 ⇒ T = lg 0,5 / lg q',
            'Shannon: I = −log₂ p; Hartley: H = n · log₂ N'
          ]
        },
        {
          title: 'Egyenlőtlenség, ért. tartomány',
          items: [
            'a > 1: aˣ < aʸ ⇔ x < y',
            '0 < a < 1: aˣ < aʸ ⇔ x > y (megfordul!)',
            'negatív lg-vel (pl. lg 0,87) osztva is megfordul',
            'logₐ f(x) értelmezett ⇔ f(x) > 0'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LogPractice2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LogPractice2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LogPractice2Quiz;
