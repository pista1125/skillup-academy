import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GeometricSequenceMatcher } from './GeometricSequenceMatcher';
import { GeometricSequenceSorter } from './GeometricSequenceSorter';
import { SeqChain, SeqPlot, RightMark, S_PURPLE, S_RED, S_INK } from './seqKit';

const svgCls = 'w-full max-w-[280px] h-auto mx-auto';

/** Két egymásba írt négyzet; a kérdezett mennyiséget „?” jelöli. */
const squaresFig = (inner: string, outerLbl: string, showTri: boolean) => {
  const A: [number, number] = [50, 140];
  const B: [number, number] = [150, 140];
  const C: [number, number] = [150, 40];
  const D: [number, number] = [50, 40];
  const M1: [number, number] = [100, 140];
  const M2: [number, number] = [150, 90];
  const M3: [number, number] = [100, 40];
  const M4: [number, number] = [50, 90];
  return (
    <svg viewBox="0 0 240 160" className={svgCls} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="238" height="158" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <polygon points={[A, B, C, D].map((p) => p.join(',')).join(' ')} fill="#dbeafe" stroke={S_INK} strokeWidth="1.8" />
      <polygon points={[M1, M2, M3, M4].map((p) => p.join(',')).join(' ')} fill="#ede9fe" stroke={S_PURPLE} strokeWidth="1.5" />
      {showTri && (
        <>
          <polygon points={[A, M1, M4].map((p) => p.join(',')).join(' ')} fill="#fde68a" fillOpacity="0.7" stroke={S_RED} />
          <RightMark v={A} u1={[1, 0]} u2={[0, -1]} r={11} color={S_RED} />
        </>
      )}
      <text x="100" y="155" fontSize="10.5" textAnchor="middle" fill={S_INK}>
        {outerLbl}
      </text>
      <text x="64" y="108" fontSize="11" fill={S_PURPLE} fontWeight="bold">
        {inner}
      </text>
    </svg>
  );
};

const FIG_Q1 = <SeqChain terms={['3', '6', '12', '24', 'a₅ = ?']} ops="·2" color={S_PURPLE} />;
const FIG_Q7 = squaresFig('a₂ = ?', 'a₁ = 8 cm', true);
const FIG_Q9 = squaresFig('', 'T₁ = 64 cm²', false);
const FIG_Q10 = <SeqPlot values={[1, -1, 1, -1, 1, -1, 1, -1, 1, NaN]} unknown={9} />;
const FIG_Q15 = <SeqChain terms={['a₁₂ = 10', 'a₁₃', 'a₁₄ = 40']} ops="·q" color={S_PURPLE} />;
const FIG_Q30 = <SeqPlot values={[64, 32, 16, 8, 4]} showValues yLabel="Tₙ" hLine={{ y: 1, label: '1 cm²' }} />;

const GEOMETRIC_SEQUENCE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'gs-q1',
    questionTypeBadge: 'n-edik tag',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy mértani sorozat első tagja 3, kvóciense 2. Mennyi az 5. tag?',
    options: ['48', '96', '24', '11'],
    correctAnswer: 0,
    explanation: 'a₅ = a₁ · q⁴ = 3 · 16 = 48. (A 96 az a₁ · q⁵ hibás képletből jönne.)'
  },
  {
    id: 'gs-q2',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Melyik mértani sorozat kezdete?',
    options: ['2; 6; 18; 54; …', '2; 4; 6; 8; …', '1; 4; 9; 16; …', '1; 1/2; 1/3; 1/4; …'],
    correctAnswer: 0,
    explanation: 'Csak a 2; 6; 18; 54 esetén állandó a szomszédos tagok hányadosa (q = 3).'
  },
  {
    id: 'gs-q3',
    questionTypeBadge: 'Kvóciens',
    level: 1,
    question: 'Mennyi a 80; 40; 20; 10; … mértani sorozat kvóciense?',
    options: ['1/2', '2', '−40', '−1/2'],
    correctAnswer: 0,
    explanation: 'q = a₂/a₁ = 40/80 = 1/2. (A −40 a különbség lenne.)'
  },
  {
    id: 'gs-q4',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a mértani sorozat n-edik tagjának képlete?',
    options: ['aₙ = a₁ · qⁿ⁻¹', 'aₙ = a₁ · qⁿ', 'aₙ = a₁ + (n − 1)q', 'aₙ = (a₁ · q)ⁿ⁻¹'],
    correctAnswer: 0,
    explanation: 'Az első tagot (n − 1)-szer szorozzuk q-val.'
  },
  {
    id: 'gs-q5',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Lehet-e egy mértani sorozat kvóciense 0?',
    options: ['nem, sem a kvóciens, sem egyik tag nem lehet 0', 'igen, ha az első tag sem 0', 'igen, bármikor', 'csak ha a sorozat csökkenő'],
    correctAnswer: 0,
    explanation: 'A definíció szerint a hányados 0-tól különböző állandó, és a tagokkal osztunk, így 0 egyik tag sem lehet.'
  },
  {
    id: 'gs-q6',
    questionTypeBadge: 'Kvóciens',
    level: 1,
    question: 'Mennyi az 5; −10; 20; −40; … mértani sorozat kvóciense?',
    options: ['−2', '2', '−15', '−1/2'],
    correctAnswer: 0,
    explanation: 'q = −10/5 = −2: a tagok előjele váltakozik.'
  },
  {
    id: 'gs-q7',
    questionTypeBadge: 'Egymásba írt négyzetek',
    figure: FIG_Q7,
    level: 1,
    question: 'Egy 8 cm oldalú négyzet oldalfelező pontjait összekötjük. Mekkora a kapott négyzet oldala?',
    options: ['4√2 ≈ 5,66 cm', '4 cm', '6 cm', '2√2 ≈ 2,83 cm'],
    correctAnswer: 0,
    explanation: 'A sarokháromszög befogói 4 cm: a₂ = √(4² + 4²) = 4√2 ≈ 5,66 cm, azaz a₂ = a₁/√2.'
  },
  {
    id: 'gs-q8',
    questionTypeBadge: 'Egymásba írt négyzetek',
    level: 1,
    question: 'Az egymásba írt négyzeteknél mennyi két egymás utáni négyzet területének aránya (belső : külső)?',
    options: ['1/2', '1/√2', '1/4', '2'],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya m = 1/√2, a területek aránya m² = 1/2.'
  },
  {
    id: 'gs-q9',
    questionTypeBadge: 'Egymásba írt négyzetek',
    figure: FIG_Q9,
    level: 1,
    question: 'Az első négyzet területe T₁ = 64 cm². Mennyi a negyedik négyzet területe?',
    options: ['8 cm²', '16 cm²', '4 cm²', '32 cm²'],
    correctAnswer: 0,
    explanation: 'T₄ = T₁ · (1/2)³ = 64/8 = 8 cm².'
  },
  {
    id: 'gs-q10',
    questionTypeBadge: 'Váltakozó előjel',
    figure: FIG_Q10,
    level: 1,
    question: 'a₁ = 1, q = −1. Mennyi a₁₀?',
    options: ['−1', '1', '−10', '0'],
    correctAnswer: 0,
    explanation: 'a₁₀ = 1 · (−1)⁹ = −1: a páros sorszámú tagok −1-ek.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'gs-q11',
    questionTypeBadge: 'Kamatos kamat',
    level: 2,
    question: 'Zoltán 3 millió Ft-ot helyez el kamatos kamatra, évi 3,5%-ra (évente jóváírva). Mennyi pénze lesz 6 év múlva?',
    options: ['≈ 3 687 766 Ft', '3 630 000 Ft', '≈ 3 563 059 Ft', '≈ 3 816 838 Ft'],
    correctAnswer: 0,
    explanation: '3 000 000 · 1,035⁶ ≈ 3 687 766 Ft. (3 630 000 Ft az egyszerű kamat, a másik kettő 5, illetve 7 év.)'
  },
  {
    id: 'gs-q12',
    questionTypeBadge: 'Kvóciens',
    level: 2,
    question: 'Egy mértani sorozat első tagja 7, negyedik tagja 189. Mennyi a kvóciens?',
    options: ['3', '27', '9', '63'],
    correctAnswer: 0,
    explanation: 'a₄ = a₁ · q³ ⇒ q³ = 189/7 = 27 ⇒ q = 3.'
  },
  {
    id: 'gs-q13',
    questionTypeBadge: 'n-edik tag',
    level: 2,
    question: 'a₁ = 7, a₄ = 189. Mennyi a hatodik tag?',
    options: ['1701', '567', '5103', '1323'],
    correctAnswer: 0,
    explanation: 'q = 3, a₆ = 7 · 3⁵ = 7 · 243 = 1701. (567 az ötödik tag.)'
  },
  {
    id: 'gs-q14',
    questionTypeBadge: 'Kvóciens',
    level: 2,
    question: 'Egy mértani sorozat első tagja 7, negyedik tagja −0,875. Mennyi a kvóciens?',
    options: ['−0,5', '0,5', '−0,125', '−2'],
    correctAnswer: 0,
    explanation: 'q³ = −0,875/7 = −0,125 ⇒ q = −0,5 (páratlan kitevő: egyetlen valós gyök).'
  },
  {
    id: 'gs-q15',
    questionTypeBadge: 'Két megoldás',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy mértani sorozatban a₁₂ = 10 és a₁₄ = 40. Mennyi lehet a kvóciens?',
    options: ['2 vagy −2', 'csak 2', '4', 'csak −2'],
    correctAnswer: 0,
    explanation: 'a₁₄/a₁₂ = q² = 4 ⇒ q = 2 vagy q = −2; mindkét sorozat megfelel.'
  },
  {
    id: 'gs-q16',
    questionTypeBadge: 'Csökkenés',
    level: 2,
    question: 'Egy erdő faállománya évente 2%-kal csökken; 2010-ben 12 000 m³ volt. Mennyi volt 2020-ban?',
    options: ['≈ 9805 m³', '9600 m³', '≈ 9609 m³', '≈ 14 628 m³'],
    correctAnswer: 0,
    explanation: '12 000 · 0,98¹⁰ ≈ 9805 m³. (A 9600 m³ lineáris csökkenés, a 14 628 m³ 2%-os növekedés lenne.)'
  },
  {
    id: 'gs-q17',
    questionTypeBadge: 'Visszafelé számolás',
    level: 2,
    question: 'A faállomány 2010-ben 12 000 m³ volt, és 2005 óta évente 2%-kal csökkent. Mennyi volt 2005-ben?',
    options: ['≈ 13 275 m³', '13 200 m³', '≈ 13 249 m³', '≈ 10 847 m³'],
    correctAnswer: 0,
    explanation: 'a₂₀₀₅ · 0,98⁵ = 12 000 ⇒ a₂₀₀₅ = 12 000/0,98⁵ ≈ 13 275 m³. (12 000 · 1,02⁵ ≈ 13 249 nem ugyanaz!)'
  },
  {
    id: 'gs-q18',
    questionTypeBadge: 'Értékcsökkenés',
    level: 2,
    question: 'Egy 21,5 millió Ft-os gép értéke évente az előző évi érték 15%-ával csökken. Mennyit ér 3 év múlva?',
    options: ['≈ 13,2 millió Ft', '≈ 11,2 millió Ft', '11,825 millió Ft', '≈ 15,5 millió Ft'],
    correctAnswer: 0,
    explanation: 'q = 0,85; a₄ = 21,5 · 0,85³ ≈ 13,2 millió Ft. (11,825 = 21,5 · 0,55 a lineáris csökkenés hibája.)'
  },
  {
    id: 'gs-q19',
    questionTypeBadge: 'Egymásba írt négyzetek',
    level: 2,
    question: 'Az egymásba írt négyzetek közül (a₁ = 8 cm) mekkora a negyedik négyzet kerülete?',
    options: ['8√2 ≈ 11,31 cm', '16 cm', '4 cm', '16√2 ≈ 22,63 cm'],
    correctAnswer: 0,
    explanation: 'K₄ = K₁ · (1/√2)³ = 32/(2√2) = 8√2 ≈ 11,31 cm.'
  },
  {
    id: 'gs-q20',
    questionTypeBadge: 'Két megoldás',
    level: 2,
    question: 'Egy mértani sorozat második tagja 1600, negyedik tagja 4. Mennyi lehet a kvóciens?',
    options: ['1/20 vagy −1/20', 'csak 1/20', '1/400', '20 vagy −20'],
    correctAnswer: 0,
    explanation: 'q² = 4/1600 = 1/400 ⇒ q = 1/20 vagy q = −1/20.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'gs-q21',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Egy mértani sorozat második tagja 1600, negyedik tagja 4. Mennyi lehet az első tag?',
    options: ['32 000 vagy −32 000', 'csak 32 000', '80 vagy −80', '400'],
    correctAnswer: 0,
    explanation: 'a₁ = a₂/q = 1600/(±1/20) = ±32 000.'
  },
  {
    id: 'gs-q22',
    questionTypeBadge: 'Másodfokú egyenlet',
    level: 3,
    question: 'Egy mértani sorozat első tagja 8, a második és harmadik tag összege 16. Mennyi lehet a negyedik tag?',
    options: ['8 vagy −64', 'csak 8', 'csak −64', '−8 vagy 64'],
    correctAnswer: 0,
    explanation: '8q + 8q² = 16 ⇒ q² + q − 2 = 0 ⇒ q = 1 vagy q = −2 ⇒ a₄ = 8 vagy 8 · (−8) = −64.'
  },
  {
    id: 'gs-q23',
    questionTypeBadge: 'Kamatos kamat',
    level: 3,
    question: 'Mekkora az éves kamat, ha a 3 millió Ft-os betét 6 év alatt kamatos kamattal 3 840 000 Ft-ra nő?',
    options: ['≈ 4,2%', '≈ 4,67%', '28%', '3,5%'],
    correctAnswer: 0,
    explanation: 'q⁶ = 3,84/3 = 1,28 ⇒ q = ⁶√1,28 ≈ 1,042 ⇒ ≈ 4,2%. (4,67% = 28%/6 az egyszerű kamat hibája.)'
  },
  {
    id: 'gs-q24',
    questionTypeBadge: 'Csökkenés',
    level: 3,
    question: 'A faállomány 2010-ben 12 000 m³, évente 2%-kal csökken. Melyik évben csökkent először 10 500 m³ alá?',
    options: ['2017-ben', '2016-ban', '2018-ban', '2012-ben'],
    correctAnswer: 0,
    explanation: '12 000 · 0,98⁶ ≈ 10 630 (2016), 12 000 · 0,98⁷ ≈ 10 418 < 10 500 (2017).'
  },
  {
    id: 'gs-q25',
    questionTypeBadge: 'Értékcsökkenés',
    level: 3,
    question: 'A 2021-ben vett gép értéke évente 15%-kal csökken; akkor adják el, amikor az értéke kevesebb lesz az eredeti ár 45%-ánál. Melyik évben?',
    options: ['2026-ban', '2025-ben', '2024-ben', '2027-ben'],
    correctAnswer: 0,
    explanation: '0,85⁴ ≈ 0,522 > 0,45, de 0,85⁵ ≈ 0,444 < 0,45: 5 év múlva, 2026-ban.'
  },
  {
    id: 'gs-q26',
    questionTypeBadge: 'Tagok vizsgálata',
    level: 3,
    question: 'Egy mértani sorozat harmadik tagja 32, hatodik tagja 108. Hány olyan tagja van, amely kisebb, mint 1 000 000?',
    options: ['28', '27', '29', '26'],
    correctAnswer: 0,
    explanation: 'q³ = 108/32 = 3,375 ⇒ q = 1,5; a₁ = 32/2,25 ≈ 14,22. a₂₈ ≈ 8,1 · 10⁵ < 10⁶, a₂₉ ≈ 1,21 · 10⁶ > 10⁶, a sorozat növő ⇒ 28 tag.'
  },
  {
    id: 'gs-q27',
    questionTypeBadge: 'Hányadik tag?',
    level: 3,
    question: 'Egy mértani sorozat első tagja 10²³, kvóciense 0,001. Hányadik tagja a 100?',
    options: ['a 8.', 'a 7.', 'a 21.', 'a 9.'],
    correctAnswer: 0,
    explanation: 'aₙ = 10²³ · 10⁻³⁽ⁿ⁻¹⁾ = 10²⁶⁻³ⁿ = 10² ⇒ 26 − 3n = 2 ⇒ n = 8.'
  },
  {
    id: 'gs-q28',
    questionTypeBadge: 'Tagok vizsgálata',
    level: 3,
    question: 'Az a₁ = 10²³, q = 0,001 mértani sorozatnak hány olyan tagja van, amely nagyobb, mint 10¹⁰?',
    options: ['5', '4', '6', '13'],
    correctAnswer: 0,
    explanation: '26 − 3n > 10 ⇒ n < 16/3 ≈ 5,33 ⇒ n = 1, …, 5 (a₅ = 10¹¹, a₆ = 10⁸).'
  },
  {
    id: 'gs-q29',
    questionTypeBadge: 'Létezés',
    level: 3,
    question: 'Létezik-e olyan mértani sorozat, amelyben a₁ = 4 és a₃ = −16?',
    options: ['nem, mert q² = −4 nem teljesülhet', 'igen, q = −2', 'igen, q = 2 vagy −2', 'igen, q = −4'],
    correctAnswer: 0,
    explanation: 'a₃ = a₁ · q² ⇒ q² = −4, ennek nincs valós megoldása: a₁ és a₃ előjele mindig azonos.'
  },
  {
    id: 'gs-q30',
    questionTypeBadge: 'Egymásba írt négyzetek',
    figure: FIG_Q30,
    level: 3,
    question: 'Az egymásba írt négyzetek területei 64; 32; 16; … cm². Hányadik az első négyzet, amelynek területe kisebb 1 cm²-nél?',
    options: ['a 8.', 'a 7.', 'a 6.', 'a 64.'],
    correctAnswer: 0,
    explanation: 'Tₙ = 64 · (1/2)ⁿ⁻¹: T₇ = 1 (még nem kisebb), T₈ = 0,5 < 1.'
  }
];

export const GeometricSequenceQuiz: React.FC<{
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
      topicId="g12-seq-mertani-quiz"
      subtopicId="mertani-sorozatok"
      title="5. Mértani sorozatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kvóciens, n-edik tag, két megoldás, egymásba írt négyzetek, kamatos kamat, csökkenés."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={GEOMETRIC_SEQUENCE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: [
            'aₙ/aₙ₋₁ = q állandó, q ≠ 0 (kvóciens).',
            'Egyik tag sem lehet 0.',
            'q < 0: váltakozó előjel; q = 1: konstans.',
            'a₁ > 0 esetén q > 1 növő, 0 < q < 1 csökkenő.'
          ]
        },
        {
          title: 'Képletek',
          items: [
            'aₙ = a₁ · qⁿ⁻¹.',
            'aₘ/aₖ = qᵐ⁻ᵏ.',
            'Páros kitevő: q = ± gyök (két megoldás).',
            'Növekedés p%-kal: q = 1 + p/100; csökkenés: q = 1 − p/100.'
          ]
        },
        {
          title: 'Mintapéldák',
          items: [
            'Egymásba írt négyzetek: m = 1/√2, területek: 1/2.',
            'Kamatos kamat: 3 000 000 · 1,035⁶.',
            'Erdő: 12 000 · 0,98ᵏ.',
            'Gép: 0,85ⁿ < 0,45 ⇒ n = 5.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GeometricSequenceMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <GeometricSequenceSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default GeometricSequenceQuiz;
