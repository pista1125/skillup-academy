import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LogarithmConceptMatcher } from './LogarithmConceptMatcher';
import { LogarithmConceptSorter } from './LogarithmConceptSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** y = 2ˣ grafikon egy vízszintes egyenessel; a metszéspont x-koordinátája ismeretlen. */
const Exp2Fig: React.FC<{ b: number; label: string }> = ({ b, label }) => {
  const toS = (x: number, y: number): [number, number] => [80 + x * 40, 140 - y * 14];
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const x = -2 + (5.2 * i) / 120;
    const [sx, sy] = toS(x, Math.pow(2, x));
    d += `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
  }
  const xb = Math.log2(b);
  const [px, py] = toS(xb, b);
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="5" y1="140" x2="235" y2="140" stroke="#94a3b8" />
      <line x1="80" y1="5" x2="80" y2="155" stroke="#94a3b8" />
      {[-1, 1, 2, 3].map((t) => (
        <text key={t} x={toS(t, 0)[0]} y="152" fontSize="9" textAnchor="middle" fill="#64748b">
          {String(t).replace('-', '−')}
        </text>
      ))}
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <line x1="5" y1={py} x2="235" y2={py} stroke="#f59e0b" strokeDasharray="5 4" />
      <text x="232" y={py - 4} fontSize="10" textAnchor="end" fill="#b45309">{label}</text>
      <line x1={px} y1={py} x2={px} y2="140" stroke="#be185d" strokeDasharray="3 3" />
      <circle cx={px} cy={py} r="3.5" fill="#be185d" />
      <text x={px + 4} y="134" fontSize="11" fontWeight="bold" fill="#b91c1c">x = ?</text>
      <text x="130" y="16" fontSize="10" fill="#7c3aed">y = 2ˣ</text>
    </svg>
  );
};

/** Számegyenes a 2 hatványaival és a 412 helyével. */
const POW2_LINE_FIG = (
  <svg viewBox="0 0 240 90" className={QSVG}>
    <line x1="10" y1="45" x2="230" y2="45" stroke="#334155" strokeWidth="1.5" />
    {[
      { v: 64, l: '2⁶ = 64' },
      { v: 128, l: '2⁷ = 128' },
      { v: 256, l: '2⁸ = 256' },
      { v: 512, l: '2⁹ = 512' }
    ].map((p, i) => {
      const x = 20 + i * 66;
      return (
        <g key={p.v}>
          <line x1={x} y1="38" x2={x} y2="52" stroke="#334155" strokeWidth="1.5" />
          <text x={x} y="68" fontSize="9" textAnchor="middle" fill="#334155">{p.l}</text>
        </g>
      );
    })}
    <circle cx={20 + 2 * 66 + 66 * ((412 - 256) / 256)} cy="45" r="4" fill="#be185d" />
    <text x={20 + 2 * 66 + 66 * ((412 - 256) / 256)} y="30" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#be185d">412</text>
    <text x="120" y="86" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#b91c1c">2ᶻ = 412 ⇒ z = ?</text>
  </svg>
);

/** Logarléc: lg 2 és lg 3 hossza; az összeg ismeretlen. */
const SLIDE_RULE_FIG = (
  <svg viewBox="0 0 240 110" className={QSVG}>
    {(() => {
      const s = 200;
      const pos = (v: number) => 20 + Math.log10(v) * s;
      return (
        <g>
          <rect x="20" y="55" width={s} height="24" fill="#fef3c7" stroke="#b45309" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
            <g key={t}>
              <line x1={pos(t)} y1="55" x2={pos(t)} y2="63" stroke="#78350f" />
              <text x={pos(t)} y="74" fontSize="8" textAnchor="middle" fill="#78350f">{t}</text>
            </g>
          ))}
          <line x1="20" y1="30" x2={pos(2)} y2="30" stroke="#7c3aed" strokeWidth="2" />
          <text x={(20 + pos(2)) / 2} y="25" fontSize="8" textAnchor="middle" fill="#7c3aed">lg 2 ≙ 75,26 mm</text>
          <line x1={pos(2)} y1="42" x2={pos(6)} y2="42" stroke="#b45309" strokeWidth="2" />
          <text x={(pos(2) + pos(6)) / 2} y="38" fontSize="8" textAnchor="middle" fill="#b45309">lg 3 ≙ 119,28 mm</text>
          <line x1="20" y1="92" x2={pos(6)} y2="92" stroke="#be185d" strokeWidth="2" />
          <text x={(20 + pos(6)) / 2} y="105" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#be185d">lg 6 ≙ ? mm</text>
        </g>
      );
    })()}
  </svg>
);

const LOGARITHM_CONCEPT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'lgc-q1',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₂ 128 értéke?',
    options: ['7', '64', '6', '256'],
    correctAnswer: 0,
    explanation: 'Azt a kitevőt keressük, amelyre a 2-t emelve 128-at kapunk: 2⁷ = 128, tehát log₂ 128 = 7.'
  },
  {
    id: 'lgc-q2',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₅ 25 értéke?',
    options: ['2', '5', '20', '125'],
    correctAnswer: 0,
    explanation: '5² = 25, ezért log₅ 25 = 2.'
  },
  {
    id: 'lgc-q3',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent logₐ b?',
    options: [
      'Azt a kitevőt, amelyre a-t emelve b-t kapunk',
      'Azt a számot, amelynek a-adik hatványa b',
      'Az a és b hányadosát',
      'Az a szám b-edik hatványát'
    ],
    correctAnswer: 0,
    explanation: 'Definíció: logₐ b az a kitevő, amelyre az a alapot emelve b-t kapunk (a > 0, a ≠ 1, b > 0). A második válasz a gyökvonást írja le.'
  },
  {
    id: 'lgc-q4',
    level: 1,
    questionTypeBadge: 'Egyenlet',
    question: 'Melyik egyenlet megoldása z = log₂ 412?',
    options: ['2ᶻ = 412', 'z² = 412', '412ᶻ = 2', 'z = 2⁴¹²'],
    correctAnswer: 0,
    explanation: 'Az aˣ = b egyenlet megoldása x = logₐ b; itt a = 2, b = 412.'
  },
  {
    id: 'lgc-q5',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₃ 1 értéke?',
    options: ['0', '1', '3', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: '3⁰ = 1, ezért log₃ 1 = 0. (Bármely megengedett alapra logₐ 1 = 0.)'
  },
  {
    id: 'lgc-q6',
    level: 1,
    questionTypeBadge: 'Elnevezés',
    question: 'A logₐ b kifejezésben hogyan nevezzük a b számot?',
    options: ['A logaritmus argumentuma (numerusa)', 'A logaritmus alapja', 'A logaritmus kitevője', 'A logaritmus gyöke'],
    correctAnswer: 0,
    explanation: 'a a logaritmus alapja, b a logaritmus argumentuma – régies nevén numerusa.'
  },
  {
    id: 'lgc-q7',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mennyi 2^(log₂ 5) értéke?',
    options: ['5', '2', '10', '32'],
    correctAnswer: 0,
    explanation: 'A definíció képlete: a^(logₐ b) = b. A log₂ 5 éppen az a kitevő, amelyre 2-t emelve 5-öt kapunk.'
  },
  {
    id: 'lgc-q8',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₁₃ 169 értéke?',
    options: ['2', '13', '1/2', '156'],
    correctAnswer: 0,
    explanation: '169 = 13², tehát log₁₃ 169 = 2.'
  },
  {
    id: 'lgc-q9',
    level: 1,
    questionTypeBadge: 'Grafikon',
    question: 'Az ábrán az y = 2ˣ grafikonját és az y = 8 egyenest látod. Mennyi a metszéspont x-koordinátája, azaz log₂ 8?',
    figure: <Exp2Fig b={8} label="y = 8" />,
    options: ['3', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '2³ = 8, tehát a metszéspont x = log₂ 8 = 3.'
  },
  {
    id: 'lgc-q10',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₁₀ 100 000 000 értéke?',
    options: ['8', '9', '7', '10 000'],
    correctAnswer: 0,
    explanation: '100 000 000 = 10⁸, tehát a keresett kitevő 8.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'lgc-q11',
    level: 2,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi log₃ (1/9) értéke?',
    options: ['−2', '2', '1/2', '−1/2'],
    correctAnswer: 0,
    explanation: '3⁻² = 1/3² = 1/9, ezért log₃ (1/9) = −2.'
  },
  {
    id: 'lgc-q12',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi log₄₉ 7 értéke?',
    options: ['1/2', '2', '7', '−2'],
    correctAnswer: 0,
    explanation: '49^{1/2} = √49 = 7, ezért log₄₉ 7 = 1/2. (log₇ 49 lenne 2.)'
  },
  {
    id: 'lgc-q13',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi log₂ ∛(1/2) értéke?',
    options: ['−1/3', '1/3', '−3', '3'],
    correctAnswer: 0,
    explanation: '∛(1/2) = (1/2)^{1/3} = 2^{-1/3}, így a keresett kitevő −1/3.'
  },
  {
    id: 'lgc-q14',
    level: 2,
    questionTypeBadge: 'Hatványalak',
    question: 'logₖ 25 = 2. Melyik számot jelöli k?',
    options: ['5', '−5 és 5', '625', '12,5'],
    correctAnswer: 0,
    explanation: 'Hatványalakban: k² = 25. A logaritmus alapja csak pozitív (és 1-től különböző) lehet, ezért k = 5; a −5 nem jó.'
  },
  {
    id: 'lgc-q15',
    level: 2,
    questionTypeBadge: 'Hatványalak',
    question: 'log₅ k = 3. Melyik számot jelöli k?',
    options: ['125', '15', '243', '5/3'],
    correctAnswer: 0,
    explanation: 'Hatványalakban: 5³ = k, azaz k = 125. (243 = 3⁵ – az alap és a kitevő felcserélése.)'
  },
  {
    id: 'lgc-q16',
    level: 2,
    questionTypeBadge: 'Értelmezés',
    question: 'Melyik kifejezés van értelmezve a valós számok körében?',
    options: ['log₀,₅ 8', 'log₁ 5', 'log₂ (−8)', 'log₃ 0'],
    correctAnswer: 0,
    explanation: 'log₀,₅ 8 = −3, mert 0,5⁻³ = 8. Az 1-es alap nem megengedett; negatív szám és 0 nem lehet argumentum.'
  },
  {
    id: 'lgc-q17',
    level: 2,
    questionTypeBadge: 'Feltételek',
    question: 'Milyen feltételek mellett értelmezzük a logₐ b kifejezést?',
    options: ['a > 0, a ≠ 1 és b > 0', 'a > 0 és b > 0', 'a ≠ 0 és b ≠ 0', 'a > 1 és b ≥ 0'],
    correctAnswer: 0,
    explanation: 'Az alap pozitív és nem 1 (1 minden hatványa 1), az argumentum pozitív (pozitív szám minden hatványa pozitív). Pl. a = 0,5 is megengedett alap.'
  },
  {
    id: 'lgc-q18',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₄ 0,25 értéke?',
    options: ['−1', '1', '−2', '1/2'],
    correctAnswer: 0,
    explanation: '0,25 = 1/4 = 4⁻¹, tehát log₄ 0,25 = −1.'
  },
  {
    id: 'lgc-q19',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'A 2ᶻ = 412 egyenlet megoldása melyik két egymást követő egész szám közé esik?',
    figure: POW2_LINE_FIG,
    options: ['8 és 9 közé', '7 és 8 közé', '9 és 10 közé', '205 és 206 közé'],
    correctAnswer: 0,
    explanation: '2⁸ = 256 < 412 < 512 = 2⁹, így z = log₂ 412 8 és 9 közé esik (z ≈ 8,69).'
  },
  {
    id: 'lgc-q20',
    level: 2,
    questionTypeBadge: 'Ismeretlen szerepe',
    question: 'Az y⁷ = 923 egyenletben mi az ismeretlen szerepe, és melyik művelettel kapjuk meg?',
    options: ['Hatványalap – gyökvonással: y = ⁷√923 ≈ 2,65', 'Hatványkitevő – logaritmussal: y = log₇ 923', 'Hatványérték – hatványozással: y = 923⁷', 'Hatványalap – logaritmussal: y = log₉₂₃ 7'],
    correctAnswer: 0,
    explanation: 'y a hatvány alapja, ezért gyököt vonunk: y = ⁷√923 ≈ 2,65. A logaritmus akkor kell, ha a kitevő az ismeretlen.'
  },

  // LEVEL 3 (21–30)
  {
    id: 'lgc-q21',
    level: 3,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi log₂ 2 + log₂ 4 + log₄ 2 + log₄ 4?',
    options: ['4,5', '4', '5', '6'],
    correctAnswer: 0,
    explanation: '1 + 2 + 1/2 + 1 = 4,5. (log₄ 2 = 1/2, mert 4^{1/2} = 2.)'
  },
  {
    id: 'lgc-q22',
    level: 3,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi log₀,₅ 2 + log₀,₅ 4 + log₀,₅ 8?',
    options: ['−6', '6', '−3', '14'],
    correctAnswer: 0,
    explanation: '0,5⁻¹ = 2, 0,5⁻² = 4, 0,5⁻³ = 8, így az összeg −1 − 2 − 3 = −6.'
  },
  {
    id: 'lgc-q23',
    level: 3,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi log₃ 3 · log₃ 2 · log₃ 1?',
    options: ['0', '1', 'log₃ 6', '2'],
    correctAnswer: 0,
    explanation: 'log₃ 1 = 0, ezért a szorzat 0.'
  },
  {
    id: 'lgc-q24',
    level: 3,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi log₄ 64 + log₅ 125?',
    options: ['6', '9', '5', '189'],
    correctAnswer: 0,
    explanation: '4³ = 64 és 5³ = 125, így 3 + 3 = 6.'
  },
  {
    id: 'lgc-q25',
    level: 3,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi log₆₄ 4 − log₂₅ 5?',
    options: ['−1/6', '1/6', '1', '−1/2'],
    correctAnswer: 0,
    explanation: '64^{1/3} = 4 ⇒ log₆₄ 4 = 1/3; 25^{1/2} = 5 ⇒ log₂₅ 5 = 1/2; 1/3 − 1/2 = −1/6.'
  },
  {
    id: 'lgc-q26',
    level: 3,
    questionTypeBadge: 'Definíció',
    question: 'Mennyi 6^{log₆ (2/3)} értéke?',
    options: ['2/3', '6', '4', '3/2'],
    correctAnswer: 0,
    explanation: 'a^(logₐ b) = b minden megengedett a, b esetén, így az érték 2/3.'
  },
  {
    id: 'lgc-q27',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik számnak a 3-as alapú logaritmusa 9?',
    options: ['19 683', '729', '27', '2'],
    correctAnswer: 0,
    explanation: 'log₃ b = 9 ⇔ b = 3⁹ = 19 683. (729 = 3⁶ = 9³.)'
  },
  {
    id: 'lgc-q28',
    level: 3,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₉ (1/3) értéke?',
    options: ['−1/2', '−2', '1/2', '−3'],
    correctAnswer: 0,
    explanation: '9^{1/2} = 3, így 9^{-1/2} = 1/3; a keresett kitevő −1/2.'
  },
  {
    id: 'lgc-q29',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'Az a ∈ {−8; −2; 0; 1; 2; 8} számok közül hánynak van kettes alapú logaritmusa?',
    options: ['3', '4', '6', '2'],
    correctAnswer: 0,
    explanation: 'Csak a pozitív számoknak: 1, 2, 8 (log₂ értékük 0, 1, 3). A 0 és a negatív számok nem lehetnek argumentumok.'
  },
  {
    id: 'lgc-q30',
    level: 3,
    questionTypeBadge: 'Logarléc',
    question: 'A logarlécen lg 2-nek 75,26 mm, lg 3-nak 119,28 mm felel meg. Mekkora hossz felel meg lg 6-nak?',
    figure: SLIDE_RULE_FIG,
    options: ['194,54 mm', '451,56 mm', '44,02 mm', '225,78 mm'],
    correctAnswer: 0,
    explanation: 'A logarléc a szorzást a logaritmusok összeadására vezeti vissza: lg 6 = lg (2 · 3) = lg 2 + lg 3 ≙ 75,26 + 119,28 = 194,54 mm. (451,56 = 6 · 75,26 hibás.)'
  }
];

export const LogarithmConceptQuiz: React.FC<{
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
      topicId="g11-exp-logaritmus-fogalom-quiz"
      subtopicId="a-logaritmus-fogalma"
      title="10. A logaritmus fogalma – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a logaritmus definíciója, alap és argumentum feltételei, átírás hatványalakba, számolás logaritmusokkal."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={LOGARITHM_CONCEPT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: ['logₐ b: a kitevő, amelyre a-t emelve b-t kapunk', 'aˣ = b ⇔ x = logₐ b', 'a^(logₐ b) = b', 'a > 0, a ≠ 1, b > 0']
        },
        {
          title: 'Nevezetes értékek',
          items: ['logₐ 1 = 0, logₐ a = 1', 'logₐ (1/a) = −1', 'logₐ aⁿ = n', 'log₄₉ 7 = 1/2, log₃ (1/9) = −2']
        },
        {
          title: 'Három művelet',
          items: ['Hatványérték ismeretlen: hatványozás (x = 5⁶)', 'Alap ismeretlen: gyökvonás (y = ⁷√2187)', 'Kitevő ismeretlen: logaritmus (z = log₂ 128)', 'Logarléc: lg (xy) = lg x + lg y']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LogarithmConceptMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <LogarithmConceptSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default LogarithmConceptQuiz;
