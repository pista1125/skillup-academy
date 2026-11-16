import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SequenceDefinitionMatcher } from './SequenceDefinitionMatcher';
import { SequenceDefinitionSorter } from './SequenceDefinitionSorter';
import { SeqPlot, SeqChain, S_GREEN, S_INK } from './seqKit';

const FIG_Q5 = (
  <svg viewBox="0 0 240 120" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => (
        <rect
          key={`${r}-${c}`}
          x={70 + c * 22}
          y={98 - (r + 1) * 22}
          width="20"
          height="20"
          rx="3"
          fill={['#dc2626', '#2563eb', '#059669', '#d97706'][Math.max(r, c)]}
          fillOpacity="0.75"
        />
      ))
    )}
    <text x="120" y="114" fontSize="10" textAnchor="middle" fill={S_INK}>
      1 + 3 + 5 + 7 = ?
    </text>
  </svg>
);
const FIG_Q13 = <SeqChain terms={['3', '2', '0', 'a₄ = ?']} ops="·2 − 4" color={S_GREEN} />;
const FIG_Q16 = <SeqPlot values={[3, 1, -2, NaN]} unknown={3} showValues yLabel="cₙ" />;
const FIG_Q21 = (
  <svg viewBox="0 0 260 110" className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="258" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 12 }, (_, i) => {
      const work = i % 6 < 4;
      return (
        <g key={i}>
          <rect x={14 + i * 19.5} y="30" width="17" height="30" rx="4" fill={work ? '#bbf7d0' : '#e2e8f0'} stroke={work ? '#059669' : '#94a3b8'} />
          <text x={22.5 + i * 19.5} y="49" fontSize="9" textAnchor="middle" fontWeight="bold" fill={S_INK}>
            {work ? 'M' : 'P'}
          </text>
          <text x={22.5 + i * 19.5} y="74" fontSize="8" textAnchor="middle" fill="#475569">
            {i + 1}.
          </text>
        </g>
      );
    })}
    <text x="130" y="96" fontSize="10.5" textAnchor="middle" fill={S_INK}>
      … és így tovább. A 100. nap: M vagy P?
    </text>
  </svg>
);
const FIG_Q30 = <SeqPlot values={[3, 1, -2, -3, -1, 2, 3, 1]} showValues yLabel="cₙ" />;

const SEQUENCE_DEFINITION_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sd-q1',
    questionTypeBadge: 'Megadási mód',
    level: 1,
    question: 'Hogyan adtuk meg az aₙ = 3n + 2 sorozatot?',
    options: ['képlettel (aₙ n függvényében)', 'rekurzív módon', 'utasítással, körülírással', 'táblázattal'],
    correctAnswer: 0,
    explanation: 'Az n-edik tagot közvetlenül n függvényében adtuk meg: ez a képlettel való megadás.'
  },
  {
    id: 'sd-q2',
    questionTypeBadge: 'Megadási mód',
    level: 1,
    question: 'Hogyan adtuk meg a sorozatot: a₁ = 1, a₂ = 2, és n > 2 esetén aₙ = aₙ₋₁ + aₙ₋₂?',
    options: ['rekurzív módon', 'képlettel', 'utasítással, körülírással', 'sehogy, mert nincs meghatározva'],
    correctAnswer: 0,
    explanation: 'Az n-edik tagot az előtte álló két tagból számoljuk, és megadtuk az első két tagot: ez rekurzív megadás.'
  },
  {
    id: 'sd-q3',
    questionTypeBadge: 'Megadási mód',
    level: 1,
    question: 'Hogyan adtuk meg „a pozitív négyzetszámok növekvő sorozatát”?',
    options: ['utasítással, körülírással', 'képlettel', 'rekurzív módon', 'pontgrafikonnal'],
    correctAnswer: 0,
    explanation: 'Szavakkal írtuk le, mely számok a tagok és milyen sorrendben: ez az utasítással való megadás (képlettel: aₙ = n²).'
  },
  {
    id: 'sd-q4',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Mennyi az aₙ = 8n − 3 sorozat 5. tagja?',
    options: ['37', '40', '29', '45'],
    correctAnswer: 0,
    explanation: 'a₅ = 8 · 5 − 3 = 37.'
  },
  {
    id: 'sd-q5',
    questionTypeBadge: 'Páratlan számok összege',
    figure: FIG_Q5,
    level: 1,
    question: 'Mennyi az első négy pozitív páratlan szám összege, 1 + 3 + 5 + 7?',
    options: ['16', '10', '12', '20'],
    correctAnswer: 0,
    explanation: 'Az első n pozitív páratlan szám összege n²: 4² = 16. Az ábrán a négy „L” alak egy 4 × 4-es négyzetet ad.'
  },
  {
    id: 'sd-q6',
    questionTypeBadge: 'Rekurzió',
    level: 1,
    question: 'a₁ = 5, és a második tagtól kezdve minden tag 2-vel nagyobb az előzőnél. Mennyi a₄?',
    options: ['11', '13', '9', '40'],
    correctAnswer: 0,
    explanation: '5; 7; 9; 11 – tehát a₄ = 11. (Képlettel aₙ = 2n + 3.)'
  },
  {
    id: 'sd-q7',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik képlet adja meg a páros pozitív egész számok növekvő sorozatát?',
    options: ['aₙ = 2n', 'aₙ = 2n − 1', 'aₙ = n + 2', 'aₙ = 2n + 2'],
    correctAnswer: 0,
    explanation: '2; 4; 6; … ⇒ aₙ = 2n. A 2n + 2 a 4-gyel kezdene, a 2n − 1 a páratlanokat adja.'
  },
  {
    id: 'sd-q8',
    questionTypeBadge: 'Rekurzió',
    level: 1,
    question: 'Rekurzív megadásnál a szabályon kívül mit kell még feltétlenül megadni?',
    options: ['az első (néhány) tagot', 'az utolsó tagot', 'az összes tagot', 'semmit, a szabály elég'],
    correctAnswer: 0,
    explanation: 'Annyi kezdőtagot kell megadni, hogy a rekurzióval a többi tag kiszámolható legyen.'
  },
  {
    id: 'sd-q9',
    questionTypeBadge: 'Rekurzió',
    level: 1,
    question: 'b₁ = 8, és a második tagtól kezdve minden tag az előző tag fele. Mennyi b₄?',
    options: ['1', '2', '0,5', '4'],
    correctAnswer: 0,
    explanation: '8; 4; 2; 1 – tehát b₄ = 1.'
  },
  {
    id: 'sd-q10',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik képlet adja meg a természetes számok növekvő sorozatát (0; 1; 2; …)?',
    options: ['aₙ = n − 1', 'aₙ = n', 'aₙ = n + 1', 'aₙ = 2n'],
    correctAnswer: 0,
    explanation: 'Az első tag (n = 1) a 0 kell legyen: aₙ = n − 1.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'sd-q11',
    questionTypeBadge: 'Képlet keresése',
    level: 2,
    question: 'Melyik képlet adja meg a 3-mal osztva 1 maradékot adó pozitív egészek növekvő sorozatát?',
    options: ['aₙ = 3n − 2', 'aₙ = 3n + 1', 'aₙ = 3n − 1', 'aₙ = n + 3'],
    correctAnswer: 0,
    explanation: '1; 4; 7; 10; … ⇒ aₙ = 3(n − 1) + 1 = 3n − 2. A 3n + 1 kihagyná az 1-et (a₁ = 4 lenne).'
  },
  {
    id: 'sd-q12',
    questionTypeBadge: 'Képlet keresése',
    level: 2,
    question: 'Melyik képlet adja meg a 7-tel osztva 4 maradékot adó pozitív egészek növekvő sorozatát?',
    options: ['aₙ = 7n − 3', 'aₙ = 7n + 4', 'aₙ = 7n − 4', 'aₙ = 4n + 7'],
    correctAnswer: 0,
    explanation: '4; 11; 18; … ⇒ aₙ = 7(n − 1) + 4 = 7n − 3.'
  },
  {
    id: 'sd-q13',
    questionTypeBadge: 'Rekurzió',
    figure: FIG_Q13,
    level: 2,
    question: 'a₁ = 3, és ha n > 1, akkor aₙ = 2 · aₙ₋₁ − 4. Mennyi a₄?',
    options: ['−4', '0', '2', '−12'],
    correctAnswer: 0,
    explanation: 'a₂ = 6 − 4 = 2, a₃ = 4 − 4 = 0, a₄ = 0 − 4 = −4.'
  },
  {
    id: 'sd-q14',
    questionTypeBadge: 'Váltakozó előjel',
    level: 2,
    question: 'Adott az aₙ = 8 · (−1)ⁿ sorozat. Mennyi a₁₇?',
    options: ['−8', '8', '−136', '136'],
    correctAnswer: 0,
    explanation: '17 páratlan, (−1)¹⁷ = −1, így a₁₇ = −8.'
  },
  {
    id: 'sd-q15',
    questionTypeBadge: 'Értékkészlet',
    level: 2,
    question: 'Hány elemű halmaz az aₙ = 8 · (−1)ⁿ sorozat értékkészlete?',
    options: ['2 elemű: {−8; 8}', '1 elemű', 'végtelen sok elemű', '8 elemű'],
    correctAnswer: 0,
    explanation: 'A tagok felváltva −8 és 8, így az értékkészlet {−8; 8}.'
  },
  {
    id: 'sd-q16',
    questionTypeBadge: 'Kéttagú rekurzió',
    figure: FIG_Q16,
    level: 2,
    question: 'c₁ = 3, c₂ = 1, és ha n > 2, akkor cₙ = cₙ₋₁ − cₙ₋₂. Mennyi c₄?',
    options: ['−3', '−2', '−1', '3'],
    correctAnswer: 0,
    explanation: 'c₃ = 1 − 3 = −2, c₄ = −2 − 1 = −3.'
  },
  {
    id: 'sd-q17',
    questionTypeBadge: 'Képlet',
    level: 2,
    question: 'Mennyi a cₙ = n(n − 1) + 2 sorozat 10. tagja?',
    options: ['92', '110', '90', '102'],
    correctAnswer: 0,
    explanation: 'c₁₀ = 10 · 9 + 2 = 92.'
  },
  {
    id: 'sd-q18',
    questionTypeBadge: 'Tagok összehasonlítása',
    level: 2,
    question: 'Melyik sorozatnak nagyobb a 4. tagja: aₙ = 12 − 5n vagy bₙ = 10 − n²?',
    options: ['bₙ-nek (b₄ = −6 > a₄ = −8)', 'aₙ-nek (a₄ = −8 > b₄ = −6)', 'egyenlők', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'a₄ = 12 − 20 = −8, b₄ = 10 − 16 = −6, és −6 > −8.'
  },
  {
    id: 'sd-q19',
    questionTypeBadge: 'Érettségi',
    level: 2,
    question: '(Érettségi, 2021) Egy sorozat első tagja 5. A második tagtól kezdve minden tag az előző tag (−2)-szeresénél 1-gyel nagyobb. Mennyi a második tag?',
    options: ['−9', '−11', '11', '−10'],
    correctAnswer: 0,
    explanation: 'a₂ = (−2) · 5 + 1 = −9. (A −11 az 1-gyel kisebb lenne.)'
  },
  {
    id: 'sd-q20',
    questionTypeBadge: 'Rekurzióból képlet',
    level: 2,
    question: 'b₁ = 8, és minden további tag az előző fele. Melyik képlet adja meg a sorozatot?',
    options: ['bₙ = 16/2ⁿ', 'bₙ = 8/2ⁿ', 'bₙ = 8 · 2ⁿ⁻¹', 'bₙ = 8 − 2n'],
    correctAnswer: 0,
    explanation: 'bₙ = 8 · (1/2)ⁿ⁻¹ = 16/2ⁿ; ellenőrzés: b₁ = 16/2 = 8 ✓. A 8/2ⁿ a 4-gyel kezdene.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'sd-q21',
    questionTypeBadge: 'Érettségi',
    figure: FIG_Q21,
    level: 3,
    question: '(Érettségi, 2021 nyomán) Egy biztonsági őr 4 napot dolgozik, 2 napot pihen, és így tovább. Január 1-jén kezdett dolgozni. Dolgozik vagy pihen az év 100. napján?',
    options: ['dolgozik (a 6 napos ciklus 4. napja)', 'pihen (a ciklus 5. napja)', 'pihen (a ciklus 6. napja)', 'dolgozik (a ciklus 1. napja)'],
    correctAnswer: 0,
    explanation: '100 = 16 · 6 + 4, tehát a 100. nap a ciklus 4. napja – munkanap.'
  },
  {
    id: 'sd-q22',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: 'Az előző őr (4 nap munka, 2 nap pihenő, január 1-jén kezd) az év 100. napjának reggelén hány ledolgozott munkanappal rendelkezik?',
    options: ['67', '66', '68', '64'],
    correctAnswer: 0,
    explanation: 'Reggel még csak 99 nap telt el: 99 = 16 · 6 + 3, így 16 · 4 + 3 = 67 munkanap.'
  },
  {
    id: 'sd-q23',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: 'Ugyanez az őr az év 125. napjának reggelén hány ledolgozott munkanappal rendelkezik?',
    options: ['84', '83', '85', '82'],
    correctAnswer: 0,
    explanation: '124 = 20 · 6 + 4: 20 teljes ciklus (80 munkanap) + 4 munkanap = 84.'
  },
  {
    id: 'sd-q24',
    questionTypeBadge: 'Váltakozó előjel',
    level: 3,
    question: 'Mennyi az aₙ = 8 · (−1)ⁿ sorozat első 25 tagjának összege?',
    options: ['−8', '0', '8', '−200'],
    correctAnswer: 0,
    explanation: 'Az első 24 tag 12 darab (−8 + 8) = 0 párt alkot, marad a₂₅ = −8.'
  },
  {
    id: 'sd-q25',
    questionTypeBadge: 'Hányadik tag?',
    level: 3,
    question: 'A cₙ = n(n − 1) + 2 sorozatnak hányadik tagja a 74?',
    options: ['a 9.', 'a 8.', 'a 10.', 'a 37.'],
    correctAnswer: 0,
    explanation: 'n(n − 1) = 72 = 9 · 8 ⇒ n = 9.'
  },
  {
    id: 'sd-q26',
    questionTypeBadge: 'Hányadik tag?',
    level: 3,
    question: 'A cₙ = n(n − 1) + 2 sorozatnak hányadik tagja a 602?',
    options: ['a 25.', 'a 24.', 'a 26.', 'a 301.'],
    correctAnswer: 0,
    explanation: 'n(n − 1) = 600 = 25 · 24 ⇒ n = 25.'
  },
  {
    id: 'sd-q27',
    questionTypeBadge: 'Érettségi',
    level: 3,
    question: '(Érettségi, 2021) a₁ = 5, és minden további tag az előző (−2)-szeresénél 1-gyel nagyobb. Mennyi a 6. tag?',
    options: ['−149', '149', '−151', '75'],
    correctAnswer: 0,
    explanation: '5; −9; 19; −37; 75; −149. (A 75 az 5. tag.)'
  },
  {
    id: 'sd-q28',
    questionTypeBadge: 'Váltakozó sorozat',
    level: 3,
    question: 'Egy sorozat minden páratlan sorszámú tagja 24, minden páros sorszámú tagja −23. Mennyi az első 15 tag összege?',
    options: ['31', '7', '24', '5'],
    correctAnswer: 0,
    explanation: '8 páratlan sorszámú tag (8 · 24 = 192) és 7 páros (7 · (−23) = −161): 192 − 161 = 31.'
  },
  {
    id: 'sd-q29',
    questionTypeBadge: 'Páratlan számok összege',
    level: 3,
    question: 'Mennyi 1 + 3 + 5 + … + 99?',
    options: ['2500', '2450', '9801', '4950'],
    correctAnswer: 0,
    explanation: '99 = 2n − 1 ⇒ n = 50 páratlan szám; összegük n² = 2500.'
  },
  {
    id: 'sd-q30',
    questionTypeBadge: 'Periodikus rekurzió',
    figure: FIG_Q30,
    level: 3,
    question: 'c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂ (n > 2). Az ábrán az első 8 tag látszik. Mennyi c₁₀₀?',
    options: ['−3', '−2', '2', '1'],
    correctAnswer: 0,
    explanation: 'A sorozat 6 tagonként ismétlődik (3; 1; −2; −3; −1; 2). 100 = 16 · 6 + 4, így c₁₀₀ = c₄ = −3.'
  }
];

export const SequenceDefinitionQuiz: React.FC<{
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
      topicId="g12-seq-megadas-quiz"
      subtopicId="sorozatok-megadasa"
      title="2. Sorozatok megadása – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: képlet, rekurzió, utasítás, maradékos és periodikus sorozatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={SEQUENCE_DEFINITION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Megadási módok',
          items: [
            'Képlettel: aₙ = f(n), pl. aₙ = 3n + 2.',
            'Rekurzív módon: aₙ az előző tag(ok)ból + kezdőtag(ok).',
            'Utasítással: szavakkal, pl. pozitív négyzetszámok növekvő sorozata.',
            'Ugyanaz a sorozat többféleképpen is megadható.'
          ]
        },
        {
          title: 'Maradékos sorozatok',
          items: [
            'm-mel osztva r maradék: a₁ = r (ha r > 0), aₙ = aₙ₋₁ + m.',
            'Képlet: aₙ = m(n − 1) + r.',
            'Pl. 8-cal osztva 5: aₙ = 8n − 3.',
            'Ellenőrizd az első tagra!'
          ]
        },
        {
          title: 'Hasznos tények',
          items: [
            '1 + 3 + … + (2n − 1) = n².',
            '(−1)ⁿ: páros n-re 1, páratlanra −1.',
            'Periodikus beosztás: a sorszám maradéka dönt.',
            'cₙ = cₙ₋₁ − cₙ₋₂ hat tagonként ismétlődik.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SequenceDefinitionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SequenceDefinitionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SequenceDefinitionQuiz;
