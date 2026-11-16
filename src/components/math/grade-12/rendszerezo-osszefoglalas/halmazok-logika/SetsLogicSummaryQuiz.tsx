import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SetsLogicSummaryMatcher } from './SetsLogicSummaryMatcher';
import { SetsLogicSummarySorter } from './SetsLogicSummarySorter';
import { Venn, K_BLUE, K_RED, K_INK } from './vennKit';

const FIG_SHADE_DIFF = <Venn shade={['10']} shadeColor="#fca5a5" title="Melyik halmaz a satírozott rész?" />;
const FIG_SHADE_COMPL = <Venn shade={['01', '00']} shadeColor="#fde68a" title="Melyik halmaz a satírozott rész?" />;
const FIG_MOVIE = <Venn n={3} labels={['A', 'M', 'G']} universe="osztály" values={{ '111': 'x', '000': 'x' }} title="17, 18, 13 néző; |osztály| = ?" />;
const FIG_SWIM = (
  <Venn n={3} labels={['H', 'Sz', 'P']} values={{ '110': 14, '011': 18, '101': 8, '111': 0, '001': '?' }} title="Úszás: hétfő, szerda, péntek (65 gyerek)" />
);
const FIG_SIEVE3 = <Venn n={3} values={{ '111': 2 }} title="|A| = 20, |B| = 15, |C| = 12" />;


const FIG_INTERVALS = (() => {
  const X = (v: number) => 20 + v * 18.5;
  return (
    <svg viewBox="0 0 240 110" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="238" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="12" x2="230" y1="80" y2="80" stroke={K_INK} />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <line x1={X(i)} x2={X(i)} y1="76" y2="84" stroke={K_INK} />
          <text x={X(i)} y="98" fontSize="9" textAnchor="middle" fill="#475569">
            {i}
          </text>
        </g>
      ))}
      <line x1={X(2)} x2={X(6)} y1="40" y2="40" stroke={K_BLUE} strokeWidth="3" />
      <circle cx={X(2)} cy="40" r="4" fill={K_BLUE} />
      <circle cx={X(6)} cy="40" r="4" fill={K_BLUE} />
      <text x={X(4)} y="32" fontSize="10" textAnchor="middle" fill={K_BLUE} fontWeight="bold">A = [2; 6]</text>
      <line x1={X(3)} x2={X(10)} y1="62" y2="62" stroke={K_RED} strokeWidth="3" />
      <circle cx={X(3)} cy="62" r="4" fill={K_RED} />
      <circle cx={X(10)} cy="62" r="4" fill={K_RED} />
      <text x={X(8)} y="56" fontSize="10" textAnchor="middle" fill={K_RED} fontWeight="bold">B = [3; 10]</text>
      <text x="200" y="22" fontSize="11" textAnchor="middle" fill={K_INK} fontWeight="bold">A ∩ B = ?</text>
    </svg>
  );
})();

export const SETS_LOGIC_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'sl-q1',
    questionTypeBadge: 'Halmaz eleme',
    level: 1,
    question: 'Legyen A = {2; 3; 5; 7} (az egyjegyű prímszámok halmaza). Melyik állítás igaz?',
    options: ['3 ∈ A', '9 ∈ A', '1 ∈ A', '12 ∈ A'],
    correctAnswer: 0,
    explanation: 'A 3 prím és egyjegyű, ezért eleme A-nak. A 9 és a 12 összetett, az 1 nem prím.'
  },
  {
    id: 'sl-q2',
    questionTypeBadge: 'Unió',
    level: 1,
    question: 'A = {1; 2; 3; 4} és B = {3; 4; 5}. Melyik halmaz az A ∪ B?',
    options: ['{1; 2; 3; 4; 5}', '{3; 4}', '{1; 2}', '{1; 2; 5}'],
    correctAnswer: 0,
    explanation: 'Az unióba azok az elemek kerülnek, amelyek legalább az egyik halmazban benne vannak; minden elemet egyszer írunk.'
  },
  {
    id: 'sl-q3',
    questionTypeBadge: 'Metszet',
    level: 1,
    question: 'A = {1; 2; 3; 4} és B = {3; 4; 5}. Melyik halmaz az A ∩ B?',
    options: ['{3; 4}', '{1; 2; 3; 4; 5}', '{5}', '{1; 2}'],
    correctAnswer: 0,
    explanation: 'A metszet a mindkét halmazban szereplő elemek halmaza: 3 és 4.'
  },
  {
    id: 'sl-q4',
    questionTypeBadge: 'Különbség',
    level: 1,
    question: 'A = {1; 2; 3; 4} és B = {3; 4; 5}. Melyik halmaz az A ∖ B?',
    options: ['{1; 2}', '{5}', '{3; 4}', '{1; 2; 5}'],
    correctAnswer: 0,
    explanation: 'A ∖ B: azok az A-beli elemek, amelyek nincsenek B-ben. Az {5} a B ∖ A lenne.'
  },
  {
    id: 'sl-q5',
    questionTypeBadge: 'Venn-diagram',
    figure: FIG_SHADE_DIFF,
    level: 1,
    question: 'Melyik halmazt jelöli a Venn-diagram satírozott része?',
    options: ['A ∖ B', 'B ∖ A', 'A ∩ B', 'A ∪ B'],
    correctAnswer: 0,
    explanation: 'A satírozott rész A-hoz tartozik, de B-hez nem: ez az A ∖ B különbséghalmaz.'
  },
  {
    id: 'sl-q6',
    questionTypeBadge: 'Komplementer',
    figure: FIG_SHADE_COMPL,
    level: 1,
    question: 'Melyik halmazt jelöli a satírozott rész (H az alaphalmaz)?',
    options: ['Ā, azaz H ∖ A', 'B ∖ A', 'B', 'H ∖ B'],
    correctAnswer: 0,
    explanation: 'Satírozva van minden, ami nincs A-ban – a B-nek az A-n kívüli része és a körökön kívüli rész is. Ez A komplementere.'
  },
  {
    id: 'sl-q7',
    questionTypeBadge: 'Üres halmaz',
    level: 1,
    question: 'Melyik halmaz üres?',
    options: ['{x ∈ ℝ | x² = −1}', '{0}', '{x ∈ ℕ | x < 1}', '{a 2-nél kisebb prímek és a 2}'],
    correctAnswer: 0,
    explanation: 'Valós szám négyzete nem lehet negatív, így nincs eleme. A {0} és az {x ∈ ℕ | x < 1} = {0} egyelemű, a negyedik halmaz {2}.'
  },
  {
    id: 'sl-q8',
    questionTypeBadge: 'Végtelen halmaz',
    level: 1,
    question: 'Melyik halmaz végtelen?',
    options: ['ℤ, az egész számok halmaza', '{egyjegyű prímszámok}', 'ℕ ∖ ℝ', '{a 120 pozitív osztói}'],
    correctAnswer: 0,
    explanation: 'Az egész számok halmaza végtelen. A prímes halmaz 4, a 120 osztóinak halmaza 16 elemű, ℕ ∖ ℝ = ∅.'
  },
  {
    id: 'sl-q9',
    questionTypeBadge: 'VAGY művelet',
    level: 1,
    question: 'A: „A 7 prímszám.” (igaz), B: „A 7 páros szám.” (hamis). Mi az A ∨ B állítás logikai értéke?',
    options: ['igaz', 'hamis', 'nem dönthető el', 'csak akkor igaz, ha B igaz'],
    correctAnswer: 0,
    explanation: 'A „megengedő vagy” igaz, ha legalább az egyik állítás igaz; itt A igaz.'
  },
  {
    id: 'sl-q10',
    questionTypeBadge: 'Implikáció',
    level: 1,
    question: 'Mikor HAMIS a „ha A, akkor B” (A → B) állítás?',
    options: ['ha A igaz és B hamis', 'ha A hamis és B igaz', 'ha A és B is hamis', 'ha A és B is igaz'],
    correctAnswer: 0,
    explanation: 'Az implikáció egyetlen esetben hamis: igaz feltételből hamis következmény.'
  },
  // ---------- 2. szint ----------
  {
    id: 'sl-q11',
    questionTypeBadge: 'Osztóhalmazok',
    level: 2,
    question: 'A a 120, B a 150 pozitív osztóinak halmaza. Melyik az A ∩ B?',
    options: ['{1; 2; 3; 5; 6; 10; 15; 30}', '{1; 2; 3; 5; 6; 10; 15; 30; 60}', '{1; 2; 3; 5; 6; 15; 30}', '{30}'],
    correctAnswer: 0,
    explanation: 'A közös osztók éppen a legnagyobb közös osztó, a (120; 150) = 30 osztói: 1, 2, 3, 5, 6, 10, 15, 30.'
  },
  {
    id: 'sl-q12',
    questionTypeBadge: 'Osztóhalmazok',
    level: 2,
    question: 'A a 120, B a 150 pozitív osztóinak halmaza. Melyik az A ∖ B?',
    options: ['{4; 8; 12; 20; 24; 40; 60; 120}', '{4; 8; 12; 24; 40; 60; 120}', '{25; 50; 75; 150}', '{4; 8; 12; 20; 24; 40; 60}'],
    correctAnswer: 0,
    explanation: 'A 120 osztói (16 db) közül elhagyjuk a 30 nyolc osztóját: 4, 8, 12, 20, 24, 40, 60, 120 marad. A {25; 50; 75; 150} a B ∖ A.'
  },
  {
    id: 'sl-q13',
    questionTypeBadge: 'Számosság',
    level: 2,
    question: '|A| = 10 és |B| = 13. Mekkora lehet legfeljebb |A ∩ B|?',
    options: ['10', '13', '23', '3'],
    correctAnswer: 0,
    explanation: 'A metszet A-nak részhalmaza, így legfeljebb 10 elemű; ez akkor teljesül, ha A ⊆ B.'
  },
  {
    id: 'sl-q14',
    questionTypeBadge: 'Számosság',
    level: 2,
    question: '|A| = 10 és |B| = 13. Mekkora lehet legalább |B ∖ A|?',
    options: ['3', '0', '13', '10'],
    correctAnswer: 0,
    explanation: '|B ∖ A| = |B| − |A ∩ B| ≥ 13 − 10 = 3; egyenlőség A ⊆ B esetén.'
  },
  {
    id: 'sl-q15',
    questionTypeBadge: 'Intervallumok',
    figure: FIG_INTERVALS,
    level: 2,
    question: 'A = [2; 6] és B = [3; 10] zárt intervallumok. Mi az A ∩ B?',
    options: ['[3; 6]', '[2; 10]', '[2; 3[', ']6; 10]'],
    correctAnswer: 0,
    explanation: 'A közös rész 3-tól 6-ig tart, mindkét végpont mindkét halmazban benne van. Az unió [2; 10] lenne.'
  },
  {
    id: 'sl-q16',
    questionTypeBadge: 'Szitaformula',
    level: 2,
    question: 'Egy 30 fős osztályban 18 tanulónak van angol vagy német nyelvvizsgája, 3-nak mindkettő. Az angolosok száma kétszerese a németeseknek. Hányan vizsgáztak németből?',
    options: ['7', '6', '9', '14'],
    correctAnswer: 0,
    explanation: '|A ∪ N| = |A| + |N| − |A ∩ N|: 2n + n − 3 = 18 ⇒ n = 7 (angolból 14).'
  },
  {
    id: 'sl-q17',
    questionTypeBadge: 'Tagadás',
    level: 2,
    question: 'Anikó állítja: „Minden országban él kenguru.” Melyik mondat ennek a tagadása?',
    options: ['Van olyan ország, amelyben nem él kenguru.', 'Semelyik országban sem él kenguru.', 'Van olyan ország, amelyben él kenguru.', 'Csak Ausztráliában él kenguru.'],
    correctAnswer: 0,
    explanation: 'A „minden” tagadása: „van olyan, amelyre nem teljesül” (= „nem minden országban él kenguru”).'
  },
  {
    id: 'sl-q18',
    questionTypeBadge: 'Megfordítás',
    level: 2,
    question: 'Mi a „Ha |a| = |b|, akkor a = b.” állítás megfordítása?',
    options: ['Ha a = b, akkor |a| = |b|.', 'Ha |a| ≠ |b|, akkor a ≠ b.', 'Ha a ≠ b, akkor |a| ≠ |b|.', 'Ha |a| = |b|, akkor a = −b.'],
    correctAnswer: 0,
    explanation: 'Az A → B megfordítása B → A: a feltétel és a következmény helyet cserél. (Az eredeti hamis, a megfordítás igaz.)'
  },
  {
    id: 'sl-q19',
    questionTypeBadge: 'Logikai érték',
    level: 2,
    question: 'A: „Van olyan halmaz, amelynek a számossága 0.” B: „Van olyan gráf, amelynek ugyanannyi éle van, mint pontja.” Mi igaz?',
    options: ['A ∧ ¬B hamis, A ∨ ¬B igaz', 'A ∧ ¬B és A ∨ ¬B is igaz', 'A ∧ ¬B és A ∨ ¬B is hamis', 'A ∧ ¬B igaz, A ∨ ¬B hamis'],
    correctAnswer: 0,
    explanation: 'A igaz (üres halmaz), B igaz (pl. háromszög: 3 pont, 3 él), így ¬B hamis: A ∧ ¬B hamis, A ∨ ¬B igaz.'
  },
  {
    id: 'sl-q20',
    questionTypeBadge: 'Végtelen halmaz',
    level: 2,
    question: 'Hány végtelen halmaz van a következők között: ℕ ∩ ℝ, ℕ ∪ ℝ, ℕ ∖ ℝ, ℝ ∖ ℕ?',
    options: ['3', '4', '2', '1'],
    correctAnswer: 0,
    explanation: 'ℕ ∩ ℝ = ℕ, ℕ ∪ ℝ = ℝ és ℝ ∖ ℕ végtelen; ℕ ∖ ℝ = ∅ véges.'
  },
  // ---------- 3. szint ----------
  {
    id: 'sl-q21',
    questionTypeBadge: 'Három halmaz',
    figure: FIG_MOVIE,
    level: 3,
    question: 'Egy osztályban 17-en látták az Avatart, 18-an a Mátrixot, 13-an a Gladiátort. Ugyanannyian láttak mindhárom, pontosan kettő, pontosan egy, illetve egy filmet sem. Hány fős az osztály?',
    options: ['32', '24', '48', '40'],
    correctAnswer: 0,
    explanation: '17 + 18 + 13 = x + 2x + 3x ⇒ 48 = 6x ⇒ x = 8; a létszám 4x = 32.'
  },
  {
    id: 'sl-q22',
    questionTypeBadge: 'Három halmaz',
    figure: FIG_SWIM,
    level: 3,
    question: 'Hétfőn és szerdán 14, szerdán és pénteken 18, hétfőn és pénteken 8 gyerek jár úszni, mindhárom nap senki. Összesen 65 gyerek jár, és mindhárom napon ugyanannyian. Hányan járnak csak pénteken?',
    options: ['9', '13', '3', '17'],
    correctAnswer: 0,
    explanation: '3n = 65 + 14 + 18 + 8 = 105 ⇒ n = 35 fő naponta. Csak pénteken: 35 − 18 − 8 = 9. (Csak hétfőn 13, csak szerdán 3.)'
  },
  {
    id: 'sl-q23',
    questionTypeBadge: 'Szita oszthatósággal',
    level: 3,
    question: 'Hány olyan 100-nál kisebb pozitív egész szám van, amely nem osztható sem 2-vel, sem 7-tel, sem 11-gyel?',
    options: ['39', '27', '38', '60'],
    correctAnswer: 0,
    explanation: 'Legalább egyikkel osztható: 49 + 14 + 9 − 7 − 4 − 1 + 0 = 60, így egyikkel sem 99 − 60 = 39. (27: a metszetek elhagyása, 38: a 77 elfelejtése.)'
  },
  {
    id: 'sl-q24',
    questionTypeBadge: 'Szitaformula',
    figure: FIG_SIEVE3,
    level: 3,
    question: '|A| = 20, |B| = 15, |C| = 12, |A ∩ B| = 6, |A ∩ C| = 5, |B ∩ C| = 4, |A ∩ B ∩ C| = 2. Hány elemű A ∪ B ∪ C?',
    options: ['34', '32', '47', '30'],
    correctAnswer: 0,
    explanation: '20 + 15 + 12 − 6 − 5 − 4 + 2 = 34. (32: a hármas metszetet nem adtuk vissza; 47: semmit sem vontunk le.)'
  },
  {
    id: 'sl-q25',
    questionTypeBadge: 'Halmaz visszafejtése',
    level: 3,
    question: 'A ∪ B = {egyjegyű pozitív egészek}, A ∩ B = {a 6 pozitív osztói}, A ∖ B = {4; 5}. Melyik az A halmaz?',
    options: ['{1; 2; 3; 4; 5; 6}', '{4; 5}', '{1; 2; 3; 6; 7; 8; 9}', '{1; 2; 3; 4; 5; 6; 7; 8; 9}'],
    correctAnswer: 0,
    explanation: 'A = (A ∩ B) ∪ (A ∖ B) = {1; 2; 3; 6} ∪ {4; 5}. B = {1; 2; 3; 6; 7; 8; 9}.'
  },
  {
    id: 'sl-q26',
    questionTypeBadge: 'Számhalmazok',
    level: 3,
    question: 'Hány végtelen halmaz van a következők között: ℝ ∩ ℤ, ℤ ∩ ℕ, ℝ ∩ ∅, ℝ ∖ ∅, ∅ ∖ ℝ? (B8.)',
    options: ['3', '5', '4', '2'],
    correctAnswer: 0,
    explanation: 'ℝ ∩ ℤ = ℤ, ℤ ∩ ℕ = ℕ és ℝ ∖ ∅ = ℝ végtelen; ℝ ∩ ∅ = ∅ és ∅ ∖ ℝ = ∅ üres (véges). Tehát 3.'
  },
  {
    id: 'sl-q27',
    questionTypeBadge: 'Kizáró vagy',
    level: 3,
    question: '„Vagy ma, vagy holnap megyek moziba.” (kizáró vagy) Mikor igaz ez az állítás?',
    options: ['ha pontosan az egyik napon megyek', 'ha legalább az egyik napon megyek', 'ha mindkét napon megyek', 'ha egyik napon sem megyek'],
    correctAnswer: 0,
    explanation: 'A kizáró vagy pontosan akkor igaz, ha a két állítás közül pontosan az egyik igaz.'
  },
  {
    id: 'sl-q28',
    questionTypeBadge: 'Ekvivalencia',
    level: 3,
    question: 'Melyik ekvivalencia igaz MINDEN egész x-re?',
    options: ['x páros ↔ x² páros', 'x páros ↔ x osztható 4-gyel', 'x² > 0 ↔ x > 0', 'x prím ↔ x páratlan'],
    correctAnswer: 0,
    explanation: 'Páros szám négyzete páros, páratlané páratlan, így a két állítás mindig egyszerre igaz. x = 2, x = −1, x = 9 cáfolja a többit.'
  },
  {
    id: 'sl-q29',
    questionTypeBadge: 'Logikai érték',
    level: 3,
    question: 'A: „Minden deltoid tengelyesen szimmetrikus.” B: „Minden paralelogramma tengelyesen szimmetrikus.” Mi igaz?',
    options: ['A igaz, B hamis, A ∧ ¬B igaz', 'A igaz, B igaz, A ∧ ¬B hamis', 'A hamis, B hamis, A ∧ ¬B hamis', 'A igaz, B hamis, A ∧ ¬B hamis'],
    correctAnswer: 0,
    explanation: 'A deltoid szimmetriatengelye az egyik átlója egyenese; a nem rombusz, nem téglalap paralelogrammának nincs szimmetriatengelye. A ∧ ¬B = igaz ∧ igaz = igaz.'
  },
  {
    id: 'sl-q30',
    questionTypeBadge: 'Megfordítás',
    level: 3,
    question: '„Ha egy test csonkagúla, akkor van két különböző területű lapja.” Mi igaz az állításra és a megfordítására?',
    options: ['az állítás igaz, a megfordítása hamis', 'mindkettő igaz', 'az állítás hamis, a megfordítása igaz', 'mindkettő hamis'],
    correctAnswer: 0,
    explanation: 'A csonkagúla két alaplapja különböző területű, tehát igaz. A megfordítás hamis: pl. egy 1 × 2 × 3-as téglatestnek is vannak különböző területű lapjai.'
  }
];

export const SetsLogicSummaryQuiz: React.FC<{
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
      topicId="g12-sum-halmazok-logika-quiz"
      subtopicId="halmazok-logika"
      title="1. Halmazok, logika – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: halmazműveletek, Venn-diagram, szitaformula, logikai műveletek, tagadás, megfordítás."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={SETS_LOGIC_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Halmazok',
          items: ['A ∪ B: legalább az egyikben.', 'A ∩ B: mindkettőben.', 'A ∖ B: A-ban, de B-ben nem.', 'Ā = H ∖ A; ∅: üres halmaz.']
        },
        {
          title: 'Szitaformula',
          items: [
            '|A ∪ B| = |A| + |B| − |A ∩ B|',
            '3 halmaz: + egyesek − párosok + hármas metszet',
            'Venn-diagramot belülről kifelé töltsd ki!',
            '„Egyik sem” = |H| − |unió|'
          ]
        },
        {
          title: 'Logika',
          items: [
            'A ∨ B: legalább egy igaz; A ∧ B: mindkettő igaz.',
            'A → B hamis ⇔ A igaz, B hamis.',
            'A ↔ B: azonos logikai érték.',
            '„Minden” tagadása: „van olyan, amely nem”.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SetsLogicSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SetsLogicSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SetsLogicSummaryQuiz;
