import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberSequencesMatcher } from './NumberSequencesMatcher';
import { NumberSequencesSorter } from './NumberSequencesSorter';
import { SeqPlot, SeqChain } from './seqKit';

const FIG_Q4 = <SeqPlot values={[2, 5, 1, 4, 3]} />;
const FIG_Q10 = <SeqChain terms={['1', '2', '3', '5', '8', '?']} ops="" title="Lehetőségek száma a lépcsőfokokon" />;
const FIG_Q14 = <SeqPlot values={[0, 1, 3, 6, 10, NaN]} unknown={5} yLabel="kₙ" showValues />;
const FIG_Q17 = <SeqPlot values={[6, 3, 2, 1.5, 1.2, 1, 6 / 7]} />;
const FIG_Q20 = <SeqPlot values={[1, 2, 4, 8]} />;
const FIG_Q27 = <SeqChain terms={['a₇ = 21', 'a₈ = 34', 'a₉', 'a₁₀ = ?']} ops="" title="1 vagy 2 fokos lépések" />;

const NUMBER_SEQUENCES_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ns-q1',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mi a számsorozat (mint függvény) értelmezési tartománya?',
    options: ['a pozitív egész számok halmaza (ℤ⁺)', 'a valós számok halmaza', 'a racionális számok halmaza', 'a negatív egész számok halmaza'],
    correctAnswer: 0,
    explanation: 'A sorozat olyan függvény, amely az 1-hez az első, a 2-höz a második, …, az n-hez az n-edik tagot rendeli: értelmezési tartománya ℤ⁺, képhalmaza ℝ.'
  },
  {
    id: 'ns-q2',
    questionTypeBadge: 'Tag kiszámítása',
    level: 1,
    question: 'Az {aₙ} sorozat n-edik tagja aₙ = 3n + 2. Mennyi a₄?',
    options: ['14', '11', '17', '12'],
    correctAnswer: 0,
    explanation: 'a₄ = 3 · 4 + 2 = 14.'
  },
  {
    id: 'ns-q3',
    questionTypeBadge: 'Tag kiszámítása',
    level: 1,
    question: 'Az aₙ = n² sorozatnak mennyi a 7. tagja?',
    options: ['49', '14', '64', '36'],
    correctAnswer: 0,
    explanation: 'a₇ = 7² = 49.'
  },
  {
    id: 'ns-q4',
    questionTypeBadge: 'Pontgrafikon',
    figure: FIG_Q4,
    level: 1,
    question: 'Az ábra egy sorozat első öt tagjának pontgrafikonja. Mennyi a₃?',
    options: ['1', '3', '5', '4'],
    correctAnswer: 0,
    explanation: 'Az n = 3 fölötti pont magassága 1, tehát a₃ = 1. (A 3 az a₅ értéke.)'
  },
  {
    id: 'ns-q5',
    questionTypeBadge: 'Lépcső',
    level: 1,
    question: 'Egy lépcsőn egyszerre 1 vagy 2 fokot lépünk. Tudjuk: a₃ = 3 és a₄ = 5. Hányféleképpen juthatunk fel az 5. fokra?',
    options: ['8', '5', '6', '15'],
    correctAnswer: 0,
    explanation: 'Az 5. fokra a 4. fokról (utolsó lépés 1) vagy a 3. fokról (utolsó lépés 2) érkezünk: a₅ = a₄ + a₃ = 5 + 3 = 8.'
  },
  {
    id: 'ns-q6',
    questionTypeBadge: 'Jelölés',
    level: 1,
    question: 'Mit jelöl a₁₂?',
    options: ['a sorozat 12. tagját', 'a sorozat első 12 tagjának összegét', 'annak a tagnak a sorszámát, amelynek értéke 12', 'a sorozat első tagjának 12-szeresét'],
    correctAnswer: 0,
    explanation: 'Az alsó index a tag sorszáma: a₁₂ a sorozat 12. tagja, vagyis a 12-höz rendelt függvényérték.'
  },
  {
    id: 'ns-q7',
    questionTypeBadge: 'Pontgrafikon',
    level: 1,
    question: 'Hogyan ábrázoljuk egy sorozat grafikonját a koordináta-rendszerben?',
    options: [
      'különálló (n; aₙ) pontokkal, a pontokat nem kötjük össze',
      'a pontokat folytonos vonallal összekötjük',
      'egy egyenessel, mert minden sorozat lineáris',
      'egy zárt görbével'
    ],
    correctAnswer: 0,
    explanation: 'A sorozat csak a pozitív egészeken értelmezett, így grafikonja különálló pontokból áll; „1,5-edik tag” nincs.'
  },
  {
    id: 'ns-q8',
    questionTypeBadge: 'Tag kiszámítása',
    level: 1,
    question: 'Mennyi a bₙ = n/(n + 1) sorozat 4. tagja?',
    options: ['4/5', '5/4', '3/4', '5/6'],
    correctAnswer: 0,
    explanation: 'b₄ = 4/(4 + 1) = 4/5.'
  },
  {
    id: 'ns-q9',
    questionTypeBadge: 'Szöveges sorozat',
    level: 1,
    question: 'Hajni vasárnap kitalált egy viccet, hétfőn elmondta 3 barátnőjének. Kedden mindegyikük 3-3 új lánynak mondta el. Hányan hallották kedden először a viccet?',
    options: ['9', '6', '13', '12'],
    correctAnswer: 0,
    explanation: 'A hétfői 3 hallgató mindegyike 3 új embernek mondja el: 3 · 3 = 9.'
  },
  {
    id: 'ns-q10',
    questionTypeBadge: 'Lépcső',
    figure: FIG_Q10,
    level: 1,
    question: 'A lépcsős feladat lehetőségszámai: 1; 2; 3; 5; 8; … Mi a következő tag?',
    options: ['13', '11', '12', '10'],
    correctAnswer: 0,
    explanation: 'Minden tag az előző kettő összege (aₙ = aₙ₋₁ + aₙ₋₂): 5 + 8 = 13.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'ns-q11',
    questionTypeBadge: 'Számjegysorozat',
    level: 2,
    question: 'Az 5/7 tizedes tört alakjában (0,714285…) milyen számjegy áll a tizedesvessző utáni 8. helyen?',
    options: ['1', '7', '4', '5'],
    correctAnswer: 0,
    explanation: 'A 714285 szakasz 6 jegyenként ismétlődik. 8 = 6 + 2, így a 8. jegy megegyezik a 2. jeggyel: 1.'
  },
  {
    id: 'ns-q12',
    questionTypeBadge: 'Számjegysorozat',
    level: 2,
    question: 'Az 5/7 tizedes tört alakjában milyen számjegy áll a tizedesvessző utáni 90. helyen?',
    options: ['5', '7', '8', '2'],
    correctAnswer: 0,
    explanation: '90 = 15 · 6 maradék nélkül, tehát a 90. jegy a szakasz utolsó (6.) jegye: 5.'
  },
  {
    id: 'ns-q13',
    questionTypeBadge: 'Lépcső',
    level: 2,
    question: 'A lépcsős feladatban (1 vagy 2 fokos lépések) a₁₈ = 4181 és a₂₀ = 10 946. Mennyi a₁₉?',
    options: ['6765', '15 127', '7563,5', '2584'],
    correctAnswer: 0,
    explanation: 'a₂₀ = a₁₉ + a₁₈ ⇒ a₁₉ = 10 946 − 4181 = 6765.'
  },
  {
    id: 'ns-q14',
    questionTypeBadge: 'Pontgrafikon',
    figure: FIG_Q14,
    level: 2,
    question: 'A {kₙ} sorozat tagjai kₙ = n(n − 1)/2. Az ábrán az első öt tag látszik. Mennyi k₆?',
    options: ['15', '21', '14', '30'],
    correctAnswer: 0,
    explanation: 'k₆ = 6 · 5 / 2 = 15. (A tagok különbségei 1; 2; 3; 4; 5 – a 10 után 5-tel nagyobb szám jön.)'
  },
  {
    id: 'ns-q15',
    questionTypeBadge: 'Tag kiszámítása',
    level: 2,
    question: 'Mennyi a cₙ = log₄ n sorozat 16. tagja?',
    options: ['2', '4', '0,5', '64'],
    correctAnswer: 0,
    explanation: 'c₁₆ = log₄ 16 = 2, mert 4² = 16.'
  },
  {
    id: 'ns-q16',
    questionTypeBadge: 'Sorozat és függvény',
    level: 2,
    question: 'A {kₙ} sorozat tagjai: 0; 1; 3; 6; 10; 15; … Melyik függvény egyezik meg vele a pozitív egészeken?',
    options: ['i(n) = (n² − n)/2', 'j(n) = n(n + 1)/2', 'f(n) = n²/2', 'g(n) = 2n − 2'],
    correctAnswer: 0,
    explanation: 'i(1) = 0, i(2) = 1, i(3) = 3, i(4) = 6 … ✓. A j(n) 1-gyel kezd, f(1) = 0,5, g(3) = 4 ≠ 3.'
  },
  {
    id: 'ns-q17',
    questionTypeBadge: 'Pontgrafikon',
    figure: FIG_Q17,
    level: 2,
    question: 'Melyik képletű sorozat első hét tagját ábrázolja a pontgrafikon? (Tankönyv, 1. a) feladat)',
    options: ['aₙ = 6/n', 'aₙ = 1/n', 'aₙ = 7 − n', 'aₙ = 6 − n'],
    correctAnswer: 0,
    explanation: 'A pontok: 6; 3; 2; 1,5; 1,2; 1; … – a tag és a sorszám szorzata mindig 6, tehát aₙ = 6/n. (Az 1/n az 1-gyel kezdene, a 7 − n második tagja 5 lenne.)'
  },
  {
    id: 'ns-q18',
    questionTypeBadge: 'Szöveges sorozat',
    level: 2,
    question: 'A vicc terjedésénél (Hajni, majd mindenki naponta 3 új embernek mondja tovább) hányan ismerik a viccet összesen szerda estére (Hajnit is beleszámolva)?',
    options: ['40', '27', '39', '36'],
    correctAnswer: 0,
    explanation: 'Új hallgatók: hétfő 3, kedd 9, szerda 27. Összesen 1 + 3 + 9 + 27 = 40.'
  },
  {
    id: 'ns-q19',
    questionTypeBadge: 'Rekurzív modell',
    level: 2,
    question: 'Egy hüllőállomány 201 egyedből indul; évente megduplázódik, majd 200 egyed elpusztul. Mennyi az egyedszám a 3. évben (az 1. évben 201)?',
    options: ['204', '202', '208', '402'],
    correctAnswer: 0,
    explanation: '2. év: 2 · 201 − 200 = 202; 3. év: 2 · 202 − 200 = 204.'
  },
  {
    id: 'ns-q20',
    questionTypeBadge: 'Pontgrafikon',
    figure: FIG_Q20,
    level: 2,
    question: 'Melyik hozzárendelési szabályú sorozat első négy tagját ábrázolja a pontgrafikon? (Tankönyv, 1. c) feladat)',
    options: ['cₙ = 2ⁿ⁻¹', 'cₙ = 2ⁿ', 'cₙ = 2n − 1', 'cₙ = n²'],
    correctAnswer: 0,
    explanation: 'A pontok: 1; 2; 4; 8 – minden tag az előző kétszerese, c₁ = 1 = 2⁰, tehát cₙ = 2ⁿ⁻¹. (A 2ⁿ 2-vel kezdene, a 2n − 1 harmadik tagja 5, az n² második tagja 4 lenne.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'ns-q21',
    questionTypeBadge: 'Számjegysorozat',
    level: 3,
    question: 'Az 5/7 tizedes tört alakjában milyen számjegy áll a tizedesvessző utáni 970. helyen?',
    options: ['2', '4', '8', '5'],
    correctAnswer: 0,
    explanation: '970 = 161 · 6 + 4, így a 970. jegy a 714285 szakasz 4. jegye: 2.'
  },
  {
    id: 'ns-q22',
    questionTypeBadge: 'Számjegysorozat',
    level: 3,
    question: 'Az 1/7 = 0,142857142857… tizedes tört alakjában milyen számjegy áll a tizedesvessző utáni 50. helyen?',
    options: ['4', '1', '2', '7'],
    correctAnswer: 0,
    explanation: '50 = 8 · 6 + 2, tehát a 2. jegy ismétlődik: 4.'
  },
  {
    id: 'ns-q23',
    questionTypeBadge: 'Lépcső',
    level: 3,
    question: 'Most egyszerre 1, 2 vagy 3 fokot léphetünk. Az első fokokra a lehetőségek: a₁ = 1, a₂ = 2, a₃ = 4. Hányféleképpen juthatunk fel az 5. fokra?',
    options: ['13', '8', '11', '15'],
    correctAnswer: 0,
    explanation: 'aₙ = aₙ₋₁ + aₙ₋₂ + aₙ₋₃: a₄ = 4 + 2 + 1 = 7, a₅ = 7 + 4 + 2 = 13.'
  },
  {
    id: 'ns-q24',
    questionTypeBadge: 'Szöveges sorozat',
    level: 3,
    question: 'A vicc terjedésénél (hétfőn 3 új hallgató, ezután naponta háromszor annyi új) hányan ismerik a viccet összesen szombat estére, Hajnit is beleszámolva?',
    options: ['1093', '729', '1092', '364'],
    correctAnswer: 0,
    explanation: 'Új hallgatók: 3; 9; 27; 81; 243; 729. Összesen 1 + 3 + 9 + 27 + 81 + 243 + 729 = 1093.'
  },
  {
    id: 'ns-q25',
    questionTypeBadge: 'Rekurzív modell',
    level: 3,
    question: 'A hüllőállomány: 201 egyed az 1. évben, a következő évi létszám aₙ₊₁ = 2aₙ − 200. Mennyi az egyedszám a 10. évben?',
    options: ['712', '201', '456', '1224'],
    correctAnswer: 0,
    explanation: '201; 202; 204; 208; 216; 232; 264; 328; 456; 712 – a 200 fölötti többlet évente duplázódik: 200 + 2⁹ = 712.'
  },
  {
    id: 'ns-q26',
    questionTypeBadge: 'Képlet keresése',
    level: 3,
    question: 'Melyik képlet adja meg a hüllőállomány n-edik évi létszámát (a₁ = 201, aₙ₊₁ = 2aₙ − 200)?',
    options: ['aₙ = 200 + 2ⁿ⁻¹', 'aₙ = 201 · 2ⁿ⁻¹', 'aₙ = 200 + n', 'aₙ = 199 + 2ⁿ'],
    correctAnswer: 0,
    explanation: 'Ha bₙ = aₙ − 200, akkor bₙ₊₁ = 2bₙ és b₁ = 1, így bₙ = 2ⁿ⁻¹. A 199 + 2ⁿ a 2. tagnál már 203-at adna 202 helyett.'
  },
  {
    id: 'ns-q27',
    questionTypeBadge: 'Lépcső',
    figure: FIG_Q27,
    level: 3,
    question: 'A lépcsős feladatban (1 vagy 2 fokos lépések) a₇ = 21 és a₈ = 34. Hányféleképpen juthatunk fel a 10. fokra?',
    options: ['89', '55', '68', '144'],
    correctAnswer: 0,
    explanation: 'a₉ = 34 + 21 = 55, a₁₀ = 55 + 34 = 89.'
  },
  {
    id: 'ns-q28',
    questionTypeBadge: 'Tagok vizsgálata',
    level: 3,
    question: 'A kₙ = n(n − 1)/2 sorozatnak hány tagja kisebb 100-nál?',
    options: ['14', '13', '15', '10'],
    correctAnswer: 0,
    explanation: 'n(n − 1) < 200: n = 14-re 182 < 200, n = 15-re 210 > 200. A sorozat növő, így az első 14 tag kisebb 100-nál.'
  },
  {
    id: 'ns-q29',
    questionTypeBadge: 'Hányadik tag?',
    level: 3,
    question: 'A bₙ = n/(n + 1) sorozatnak hányadik tagja a 0,95?',
    options: ['a 19.', 'a 20.', 'a 95.', 'a 18.'],
    correctAnswer: 0,
    explanation: 'n/(n + 1) = 19/20 ⇒ 20n = 19n + 19 ⇒ n = 19.'
  },
  {
    id: 'ns-q30',
    questionTypeBadge: 'Tagok vizsgálata',
    level: 3,
    question: 'A cₙ = log₄ n sorozatnak hány tagja kisebb 3-nál?',
    options: ['63', '64', '12', '81'],
    correctAnswer: 0,
    explanation: 'log₄ n < 3 ⇔ n < 4³ = 64, tehát n = 1, 2, …, 63: 63 tag.'
  }
];

export const NumberSequencesQuiz: React.FC<{
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
      topicId="g12-seq-szamsorozatok-quiz"
      subtopicId="szamsorozatok"
      title="1. Számsorozatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a sorozat fogalma, tagjai, pontgrafikonja, lépcsőzés, számjegysorozatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={NUMBER_SEQUENCES_QUESTIONS}
      cheatSheets={[
        {
          title: 'A sorozat fogalma',
          items: [
            'Sorozat: ℤ⁺ → ℝ függvény, n ↦ aₙ.',
            'Végtelen sok tagú felsorolás: a₁; a₂; a₃; …',
            'Jelölés: {aₙ}; aₙ az n-edik (általános) tag.',
            'Néhány tag nem határozza meg a sorozatot.'
          ]
        },
        {
          title: 'Ábrázolás',
          items: [
            'Pontgrafikon: (n; aₙ) pontok.',
            'A pontokat nem kötjük össze.',
            'Vízszintes tengely: n, függőleges: aₙ.',
            'Számegyenesen is jelölhetjük a tagokat.'
          ]
        },
        {
          title: 'Mintapéldák',
          items: [
            'Lépcső (1 vagy 2 fok): aₙ = aₙ₋₁ + aₙ₋₂; 1; 2; 3; 5; 8; …',
            '5/7 = 0,714285…: a k-adik jegyet k mod 6 adja.',
            'kₙ = n(n − 1)/2: 0; 1; 3; 6; 10; 15; …',
            'Vicc: új hallgatók 3; 9; 27; …, összesen 4; 13; 40; …'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberSequencesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <NumberSequencesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default NumberSequencesQuiz;
