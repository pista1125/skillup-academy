import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RationalExponents1Matcher } from './RationalExponents1Matcher';
import { RationalExponents1Sorter } from './RationalExponents1Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Idővonal: egy teljes időszak n egyenlő részre bontva, minden lépés · ? */
const SplitTimelineFig: React.FC<{ parts: number; total: string; label: string }> = ({ parts, total, label }) => {
  const w = 200 / parts;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="20" y1="80" x2="222" y2="80" stroke="#475569" strokeWidth="2" />
      {Array.from({ length: parts + 1 }, (_, i) => (
        <circle key={i} cx={20 + i * w} cy="80" r="4" fill={i === 0 || i === parts ? '#7c3aed' : '#a78bfa'} />
      ))}
      {Array.from({ length: parts }, (_, i) => (
        <text key={i} x={20 + i * w + w / 2} y="68" fontSize={parts > 8 ? 7 : 10} textAnchor="middle" fill="#db2777" fontWeight="bold">
          ·?
        </text>
      ))}
      <path d="M 20 100 Q 121 135 222 100" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="121" y="140" fontSize="11" textAnchor="middle" fill="#4c1d95" fontWeight="bold">{total}</text>
      <text x="121" y="30" fontSize="11" textAnchor="middle" fill="#334155">{label}</text>
    </svg>
  );
};

/** Zongorabillentyűk egy oktávra; a kérdezett hangköz kiemelve. */
const PianoFig: React.FC<{ steps: number; note: string }> = ({ steps, note }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={12 + i * 27} y="14" width="27" height="80" fill={i === 0 ? '#ede9fe' : '#ffffff'} stroke="#334155" />
    ))}
    {[0, 1, 3, 4, 5].map((b) => (
      <rect key={b} x={12 + b * 27 + 19} y="14" width="16" height="48" fill="#1e293b" />
    ))}
    <text x="120" y="114" fontSize="11" textAnchor="middle" fill="#334155">oktáv = 12 félhang: frekvencia · 2</text>
    <text x="120" y="136" fontSize="12" textAnchor="middle" fill="#db2777" fontWeight="bold">
      {steps} félhang: · {note}
    </text>
  </svg>
);

/** Oszlopdiagram: tavirózsák napi területe, a kérdezett nap „?”. */
const LilyFig: React.FC<{ ask: number }> = ({ ask }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <line x1="10" y1="120" x2="230" y2="120" stroke="#475569" strokeWidth="1.5" />
    {Array.from({ length: 8 }, (_, d) => {
      const h = 40 + d * 7;
      return (
        <g key={d}>
          <rect x={16 + d * 27} y={120 - h} width="20" height={h} fill={d === ask ? '#fde68a' : '#6ee7b7'} stroke="#047857" />
          <text x={26 + d * 27} y="134" fontSize="9" textAnchor="middle" fill="#334155">{d}.</text>
          <text x={26 + d * 27} y={114 - h} fontSize="9" textAnchor="middle" fill="#065f46" fontWeight="bold">
            {d === 0 ? '8' : d === 7 ? '10,4' : d === ask ? '?' : ''}
          </text>
        </g>
      );
    })}
    <text x="120" y="147" fontSize="9" textAnchor="middle" fill="#475569">nap · befedett terület (m²), naponta k-szoros</text>
  </svg>
);

const RATIONAL_EXPONENTS_1_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Definíció, egyszerű értékek (1–10)
  {
    id: 're1-q1',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mivel egyenlő a¹⁄ⁿ, ha a ≥ 0 és n > 1 természetes szám?',
    options: ['ⁿ√a', 'a : n', '1 / aⁿ', 'aⁿ'],
    correctAnswer: 0,
    explanation: 'Definíció szerint a¹⁄ⁿ = ⁿ√a, vagyis az a nemnegatív szám, amelynek n-edik hatványa a.'
  },
  {
    id: 're1-q2',
    level: 1,
    questionTypeBadge: 'Négyzetgyök',
    question: 'Mennyi 16¹⁄² értéke?',
    options: ['4', '8', '32', '1/16'],
    correctAnswer: 0,
    explanation: '16¹⁄² = √16 = 4, mert 4² = 16. (A 8 hibás: az 1/2 kitevő nem felezést jelent.)'
  },
  {
    id: 're1-q3',
    level: 1,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi 8¹⁄³ értéke?',
    options: ['2', '8/3', '24', '1/8'],
    correctAnswer: 0,
    explanation: '8¹⁄³ = ∛8 = 2, mert 2³ = 8.'
  },
  {
    id: 're1-q4',
    level: 1,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi 32¹⁄⁵ értéke?',
    options: ['2', '6,4', '5', '1/32'],
    correctAnswer: 0,
    explanation: '32¹⁄⁵ = ⁵√32 = 2, mert 2⁵ = 32.'
  },
  {
    id: 're1-q5',
    level: 1,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi 1000¹⁄³ értéke?',
    options: ['10', '100', '333,3', '1/1000'],
    correctAnswer: 0,
    explanation: '1000¹⁄³ = ∛1000 = 10, mert 10³ = 1000.'
  },
  {
    id: 're1-q6',
    level: 1,
    questionTypeBadge: 'Negyedik gyök',
    question: 'Mennyi 81¹⁄⁴ értéke?',
    options: ['3', '9', '20,25', '27'],
    correctAnswer: 0,
    explanation: '81¹⁄⁴ = ⁴√81 = 3, mert 3⁴ = 81. (A 9 a négyzetgyök: 81¹⁄².)'
  },
  {
    id: 're1-q7',
    level: 1,
    questionTypeBadge: 'Nulla alap',
    question: 'Mennyi 0¹⁄¹⁰ értéke?',
    options: ['0', '1', '10', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: '0¹⁄¹⁰ = ¹⁰√0 = 0. A definíció a ≥ 0 esetén érvényes, tehát a 0 alap megengedett.'
  },
  {
    id: 're1-q8',
    level: 1,
    questionTypeBadge: 'Értelmezés',
    question: 'Milyen alapra értelmeztük az a¹⁄ⁿ hatványt?',
    options: ['a ≥ 0', 'minden valós a-ra', 'csak a > 1-re', 'a ≠ 0 esetén'],
    correctAnswer: 0,
    explanation: 'A tankönyvi definíció: ha a nemnegatív valós szám és n > 1 természetes szám, akkor a¹⁄ⁿ = ⁿ√a.'
  },
  {
    id: 're1-q9',
    level: 1,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi 6,25¹⁄² értéke?',
    options: ['2,5', '3,125', '0,25', '39,0625'],
    correctAnswer: 0,
    explanation: '6,25¹⁄² = √6,25 = 2,5, mert 2,5² = 6,25.'
  },
  {
    id: 're1-q10',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Melyik állítás igaz?',
    options: ['(1,011¹⁄³)³ = 1,011', '(1,011¹⁄³)³ = 1,011³', '3 · 1,011¹⁄³ = 1,011', '1,011¹⁄³ = 1,011 : 3'],
    correctAnswer: 0,
    explanation: '1,011¹⁄³ = ∛1,011, és egy szám köbgyökének a köbe maga a szám: (1,011¹⁄³)³ = 1,011.'
  },

  // LEVEL 2: Számolás és modellek (11–20)
  {
    id: 're1-q11',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi 0,0016¹⁄⁴ értéke?',
    options: ['0,2', '0,04', '0,02', '0,0004'],
    correctAnswer: 0,
    explanation: '0,2⁴ = 0,0016, ezért 0,0016¹⁄⁴ = ⁴√0,0016 = 0,2. (A 0,04 a négyzetgyök.)'
  },
  {
    id: 're1-q12',
    level: 2,
    questionTypeBadge: 'n-edik gyök',
    question: 'Mennyi 1024¹⁄¹⁰ értéke?',
    options: ['2', '4', '10', '102,4'],
    correctAnswer: 0,
    explanation: '2¹⁰ = 1024, ezért 1024¹⁄¹⁰ = ¹⁰√1024 = 2.'
  },
  {
    id: 're1-q13',
    level: 2,
    questionTypeBadge: 'Köbgyök',
    question: 'Mennyi 0,125¹⁄³ értéke?',
    options: ['0,5', '0,25', '0,05', '0,0417'],
    correctAnswer: 0,
    explanation: '0,5³ = 0,125, tehát 0,125¹⁄³ = ∛0,125 = 0,5.'
  },
  {
    id: 're1-q14',
    level: 2,
    questionTypeBadge: 'Hatvány hatványa',
    question: 'Mennyi (7⁴)¹⁄² értéke?',
    options: ['49', '7', '14', '2401'],
    correctAnswer: 0,
    explanation: '(7⁴)¹⁄² = √(7⁴) = 7² = 49, mert (7²)² = 7⁴.'
  },
  {
    id: 're1-q15',
    level: 2,
    questionTypeBadge: 'Hatvány hatványa',
    question: 'Mennyi (2¹²)¹⁄⁴ értéke?',
    options: ['8', '256', '3', '2⁴⁸'],
    correctAnswer: 0,
    explanation: '(2¹²)¹⁄⁴ = ⁴√(2¹²) = 2³ = 8, mert (2³)⁴ = 2¹².'
  },
  {
    id: 're1-q16',
    level: 2,
    questionTypeBadge: 'Modell',
    question: 'A tavirózsák által befedett terület hetente 1,3-szorosára, naponta mindig ugyanannyiszorosára (k-szorosára) nő. Mennyi k?',
    figure: <SplitTimelineFig parts={7} total="1 hét: · 1,3" label="7 nap, minden nap ugyanaz a szorzó" />,
    options: ['⁷√1,3', '1,3 / 7', '1,3⁷', '1 + 0,3 / 7'],
    correctAnswer: 0,
    explanation: '7 napi szorzó egy heti szorzót ad: k⁷ = 1,3, ezért k = 1,3¹⁄⁷ = ⁷√1,3 ≈ 1,0382.'
  },
  {
    id: 're1-q17',
    level: 2,
    questionTypeBadge: 'Népesség',
    question: 'A Föld népessége (a modell szerint) évente 1,011-szeresére nő. Hányszorosára nő 1/3 év alatt?',
    figure: <SplitTimelineFig parts={3} total="1 év: · 1,011" label="2011. jún. → okt. → 2012. febr. → jún." />,
    options: ['≈ 1,0037', '≈ 0,337', '≈ 1,0334', '≈ 1,011'],
    correctAnswer: 0,
    explanation: 'x³ = 1,011, így x = 1,011¹⁄³ = ∛1,011 ≈ 1,0037. (Az 1,0334 = 1,011³ a 3 év alatti növekedés.)'
  },
  {
    id: 're1-q18',
    level: 2,
    questionTypeBadge: 'Félhang',
    question: 'Egy oktáv (12 félhang) alatt a frekvencia kétszeresére nő, és két szomszédos félhang frekvenciájának hányadosa állandó. Mennyi ez a hányados?',
    figure: <PianoFig steps={1} note="?" />,
    options: ['¹²√2 ≈ 1,0595', '2 / 12 ≈ 0,1667', '1 + 1/12 ≈ 1,0833', '2¹² = 4096'],
    correctAnswer: 0,
    explanation: 'q¹² = 2, ezért q = 2¹⁄¹² = ¹²√2 ≈ 1,0595.'
  },
  {
    id: 're1-q19',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi 0,027¹⁄³ értéke?',
    options: ['0,3', '0,03', '0,9', '0,009'],
    correctAnswer: 0,
    explanation: '0,3³ = 0,027, tehát 0,027¹⁄³ = ∛0,027 = 0,3.'
  },
  {
    id: 're1-q20',
    level: 2,
    questionTypeBadge: 'Tört alap',
    question: 'Mennyi (1/4)¹⁄² értéke?',
    options: ['1/2', '1/8', '1/16', '2'],
    correctAnswer: 0,
    explanation: '(1/4)¹⁄² = √(1/4) = 1/2, mert (1/2)² = 1/4.'
  },

  // LEVEL 3: Alkalmazások, összehasonlítás (21–30)
  {
    id: 're1-q21',
    level: 3,
    questionTypeBadge: 'Hatvány hatványa',
    question: 'Mennyi (2³³)¹⁄³ értéke?',
    options: ['2048', '1024', '4096', '2³⁶'],
    correctAnswer: 0,
    explanation: '(2¹¹)³ = 2³³, ezért (2³³)¹⁄³ = 2¹¹ = 2048.'
  },
  {
    id: 're1-q22',
    level: 3,
    questionTypeBadge: 'Hatvány hatványa',
    question: 'Mennyi (11⁶)¹⁄³ értéke?',
    options: ['121', '11', '1331', '14641'],
    correctAnswer: 0,
    explanation: '(11²)³ = 11⁶, ezért (11⁶)¹⁄³ = ∛(11⁶) = 11² = 121.'
  },
  {
    id: 're1-q23',
    level: 3,
    questionTypeBadge: 'Kvint',
    question: 'A kvint 7 félhanggal magasabb az alaphangnál. Hányszorosa a frekvenciája az alaphangénak (egy félhang szorzója ¹²√2)?',
    figure: <PianoFig steps={7} note="?" />,
    options: ['≈ 1,498', '≈ 1,583', '≈ 1,167', '≈ 1,0595'],
    correctAnswer: 0,
    explanation: 'Hét félhang: (2¹⁄¹²)⁷ = ¹²√(2⁷) ≈ 1,498 – közel 3/2. (Az 1,583 = 1 + 7/12 hibás „arányosítás”.)'
  },
  {
    id: 're1-q24',
    level: 3,
    questionTypeBadge: 'Modell',
    question: 'Kezdetben 8 m²-t fednek be a tavirózsák, a terület naponta k-szoros, hetente 1,3-szoros. Mekkora a terület a 3. napon (két tizedesre)?',
    figure: <LilyFig ask={3} />,
    options: ['≈ 8,95 m²', '≈ 9,03 m²', '≈ 17,58 m²', '≈ 8,31 m²'],
    correctAnswer: 0,
    explanation: 'k = ⁷√1,3 ≈ 1,0382, így 8 · k³ ≈ 8,95 m². (A 9,03 a hibás egyenletes, „+2,4/7 m² naponta” modell; a 17,58 = 8 · 1,3³ a 3. hét.)'
  },
  {
    id: 're1-q25',
    level: 3,
    questionTypeBadge: 'Népesség',
    question: '2011. június végén 6,98 milliárd fő élt a Földön, évi 1,011-szeres növekedéssel. Mekkora volt a népesség a modell szerint 4 hónappal később?',
    options: ['≈ 7,006 milliárd', '≈ 7,057 milliárd', '≈ 7,031 milliárd', '≈ 6,983 milliárd'],
    correctAnswer: 0,
    explanation: '4 hónap = 1/3 év: 6,98 · 1,011¹⁄³ ≈ 6,98 · 1,0037 ≈ 7,006 milliárd. (A 7,031 a 2/3 év, a 7,057 az 1 év utáni érték.)'
  },
  {
    id: 're1-q26',
    level: 3,
    questionTypeBadge: 'Népesség',
    question: '2011. október 1-jén Magyarország népessége 9982 ezer fő volt, és évente 0,998-szorosára változik. Hány ezer fő lesz 2013. január 1-jén (1,25 év múlva)?',
    options: ['≈ 9957 ezer', '≈ 9962 ezer', '≈ 9942 ezer', '≈ 9687 ezer'],
    correctAnswer: 0,
    explanation: '9982 · 0,998¹·²⁵ ≈ 9957 ezer fő. (9962 az 1 év, 9942 a 2 év utáni érték; 9687-hez 15-öt írtunk volna kitevőnek a 15 hónap miatt.)'
  },
  {
    id: 're1-q27',
    level: 3,
    questionTypeBadge: 'Felharmonikus',
    question: 'A C hang frekvenciája 261,6 Hz, a harmadik felharmonikusé kb. 784 Hz (≈ 3-szoros). Hány félhangnyira van ez az alaphangtól, ha egy félhang ¹²√2-szeres?',
    options: ['19', '24', '36', '18'],
    correctAnswer: 0,
    explanation: '(¹²√2)¹⁹ = 2¹⁹⁄¹² ≈ 2,997 ≈ 3, tehát 19 félhang (egy oktáv és egy kvint).'
  },
  {
    id: 're1-q28',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'Melyik kifejezést NEM értelmeztük a törtkitevőjű hatvány definíciója szerint?',
    options: ['(−8)¹⁄³', '0¹⁄³', '0,001¹⁄³', '8¹⁄³'],
    correctAnswer: 0,
    explanation: 'A definíció csak nemnegatív alapra szól. ∛(−8) = −2 ugyan létezik, de a (−8)¹⁄³ hatványt nem értelmezzük.'
  },
  {
    id: 're1-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legnagyobb a következő számok közül?',
    options: ['3¹⁄³', '2¹⁄²', '4¹⁄⁴', '5¹⁄⁵'],
    correctAnswer: 0,
    explanation: '3¹⁄³ ≈ 1,442; 2¹⁄² = 4¹⁄⁴ ≈ 1,414; 5¹⁄⁵ ≈ 1,380. (Hatodik hatványra emelve: (3¹⁄³)⁶ = 9 > 8 = (2¹⁄²)⁶.)'
  },
  {
    id: 're1-q30',
    level: 3,
    questionTypeBadge: 'n-edik gyök',
    question: 'Melyik szám egyenlő 2-vel?',
    options: ['64¹⁄⁶', '64¹⁄³', '32¹⁄⁴', '16¹⁄²'],
    correctAnswer: 0,
    explanation: '2⁶ = 64, így 64¹⁄⁶ = 2. A többi: 64¹⁄³ = 4, 32¹⁄⁴ ≈ 2,378, 16¹⁄² = 4.'
  }
];

export const RationalExponents1Quiz: React.FC<{
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
      topicId="g11-exp-tortkitevo-elso-quiz"
      subtopicId="racionalis-szamok-kitevoben-1"
      title="3. Racionális számok a kitevőben I. – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: az 1/n kitevő, gyökök számológép nélkül, népesség-, tavirózsa- és hangmodellek."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={RATIONAL_EXPONENTS_1_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: [
            'a¹⁄ⁿ = ⁿ√a, ha a ≥ 0 és n > 1 természetes szám',
            '(a¹⁄ⁿ)ⁿ = a',
            'Ellenőrzés: az eredmény n-edik hatványa az alap',
            'Negatív alapra nem értelmezzük!'
          ]
        },
        {
          title: 'Fejben számolható értékek',
          items: [
            '16¹⁄² = 4; 8¹⁄³ = 2; 81¹⁄⁴ = 3; 32¹⁄⁵ = 2',
            '1000¹⁄³ = 10; 1024¹⁄¹⁰ = 2; 64¹⁄⁶ = 2',
            '0,04¹⁄² = 0,2; 0,125¹⁄³ = 0,5; 0,0016¹⁄⁴ = 0,2',
            '(7⁴)¹⁄² = 49; (2¹²)¹⁄⁴ = 8; (2³³)¹⁄³ = 2048'
          ]
        },
        {
          title: 'Egyenlő lépésekre bontott növekedés',
          items: [
            'Ha t idő alatt q-szoros, akkor t/n idő alatt ⁿ√q-szoros',
            'Népesség: 1/3 év alatt ∛1,011 ≈ 1,0037',
            'Tavirózsa: naponta ⁷√1,3 ≈ 1,0382',
            'Félhang: ¹²√2 ≈ 1,0595; kvint ≈ 1,498'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RationalExponents1Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RationalExponents1Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RationalExponents1Quiz;
