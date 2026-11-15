import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PowersReviewMatcher } from './PowersReviewMatcher';
import { PowersReviewSorter } from './PowersReviewSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** 3 × 3-as szorzat-bűvös négyzet 2 hatványaiból; a kérdezett mező „?”. */
const MagicSquareFig: React.FC<{ cells: string[][] }> = ({ cells }) => (
  <svg viewBox="0 0 240 170" className={QSVG}>
    {cells.map((row, r) =>
      row.map((e, c) => (
        <g key={`${r}-${c}`}>
          <rect x={45 + c * 52} y={10 + r * 50} width="48" height="46" rx="6" fill={e === '?' ? '#fee2e2' : e === '' ? '#ffffff' : '#ede9fe'} stroke="#7c3aed" strokeWidth="1.5" />
          {e !== '' && (
            <text x={69 + c * 52} y={39 + r * 50} fontSize="16" fontWeight="bold" textAnchor="middle" fill={e === '?' ? '#b91c1c' : '#4c1d95'}>
              {e === '?' ? '?' : '2'}
              {e !== '?' && (
                <tspan fontSize="11" dy="-7">
                  {e}
                </tspan>
              )}
            </text>
          )}
        </g>
      ))
    )}
    <text x="120" y="165" fontSize="10" textAnchor="middle" fill="#475569">
      Minden sorban, oszlopban, átlóban azonos a szorzat
    </text>
  </svg>
);

/** Számegyenes 0-val és hat jelölt ponttal (betűk, sorrend nélkül). */
const ORDER_FIG = (
  <svg viewBox="0 0 240 110" className={QSVG}>
    <line x1="10" y1="60" x2="230" y2="60" stroke="#334155" strokeWidth="2" />
    <polygon points="230,55 238,60 230,65" fill="#334155" />
    <line x1="120" y1="50" x2="120" y2="70" stroke="#0f172a" strokeWidth="2" />
    <text x="120" y="86" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      0
    </text>
    <text x="60" y="35" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
      negatívak?
    </text>
    <text x="180" y="35" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">
      pozitívak?
    </text>
    <text x="120" y="104" fontSize="10" textAnchor="middle" fill="#475569">
      A, B, C, D, E, F helye: ?
    </text>
  </svg>
);

const POWERS_REVIEW_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Értelmezés és azonosságok (1–10)
  {
    id: 'prv-q1',
    level: 1,
    questionTypeBadge: 'Hatványozás',
    question: 'Mennyi 2⁵ értéke?',
    options: ['32', '10', '25', '16'],
    correctAnswer: 0,
    explanation: '2⁵ = 2 · 2 · 2 · 2 · 2 = 32 – öt darab 2-es tényező szorzata (nem 2 · 5 és nem 5²).'
  },
  {
    id: 'prv-q2',
    level: 1,
    questionTypeBadge: 'Nulladik hatvány',
    question: 'Mennyi a⁰ értéke, ha a ≠ 0?',
    options: ['1', '0', 'a', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Bármely 0-tól különböző valós szám nulladik hatványa 1.'
  },
  {
    id: 'prv-q3',
    level: 1,
    questionTypeBadge: 'Nulladik hatvány',
    question: 'Mit mondhatunk 0⁰-ról?',
    options: ['Nem értelmezett', '0⁰ = 0', '0⁰ = 1', '0⁰ végtelen'],
    correctAnswer: 0,
    explanation: 'A nulladik hatványt csak 0-tól különböző alapra értelmezzük; 0⁰ nem értelmezett.'
  },
  {
    id: 'prv-q4',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi 2⁻³ értéke?',
    options: ['1/8', '−8', '−6', '8'],
    correctAnswer: 0,
    explanation: 'Negatív kitevő: az alap reciprokát emeljük a kitevő ellentettjére: 2⁻³ = (1/2)³ = 1/8. A hatvány pozitív marad!'
  },
  {
    id: 'prv-q5',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Melyik azonosság igaz azonos alapú hatványok szorzatára?',
    options: ['aᵐ · aⁿ = aᵐ⁺ⁿ', 'aᵐ · aⁿ = aᵐ·ⁿ', 'aᵐ · aⁿ = aᵐ⁻ⁿ', 'aᵐ · aⁿ = (2a)ᵐ⁺ⁿ'],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványokat úgy szorzunk, hogy a kitevőket összeadjuk: aᵐ · aⁿ = aᵐ⁺ⁿ.'
  },
  {
    id: 'prv-q6',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Mivel egyenlő (aᵐ)ⁿ?',
    options: ['aᵐ·ⁿ', 'aᵐ⁺ⁿ', 'a^(mⁿ)', 'aᵐ · n'],
    correctAnswer: 0,
    explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: (aᵐ)ⁿ = aᵐ·ⁿ.'
  },
  {
    id: 'prv-q7',
    level: 1,
    questionTypeBadge: 'Negatív alap',
    question: 'Mennyi (−3)² értéke?',
    options: ['9', '−9', '−6', '1/9'],
    correctAnswer: 0,
    explanation: '(−3)² = (−3) · (−3) = 9. Negatív alap páros kitevőn pozitív.'
  },
  {
    id: 'prv-q8',
    level: 1,
    questionTypeBadge: 'Negatív alap',
    question: 'Mennyi −5² értéke?',
    options: ['−25', '25', '1/25', '−10'],
    correctAnswer: 0,
    explanation: 'A hatványozás előbb történik, mint az előjelváltás: −5² = −(5²) = −25. Csak (−5)² = 25.'
  },
  {
    id: 'prv-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik nagyobb: 7⁰ vagy 0⁷?',
    options: ['7⁰, mert 7⁰ = 1 és 0⁷ = 0', '0⁷, mert 0⁷ = 7', 'Egyenlők, mindkettő 0', 'Egyenlők, mindkettő 1'],
    correctAnswer: 0,
    explanation: '7⁰ = 1 (nem nulla alap nulladik hatványa), 0⁷ = 0 (a 0 pozitív kitevős hatványa 0).'
  },
  {
    id: 'prv-q10',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi (2/3)⁻¹ értéke?',
    options: ['3/2', '−2/3', '2/3', '−3/2'],
    correctAnswer: 0,
    explanation: 'A −1-edik hatvány a reciprok: (2/3)⁻¹ = 3/2.'
  },

  // LEVEL 2: Átírás 2 és 3 hatványaira, összehasonlítás (11–20)
  {
    id: 'prv-q11',
    level: 2,
    questionTypeBadge: '2 hatványai',
    question: 'Írd fel 2 hatványaként: 2³ · (2⁻²)⁻⁵',
    options: ['2¹³', '2⁻⁷', '2³⁰', '2⁻²'],
    correctAnswer: 0,
    explanation: '(2⁻²)⁻⁵ = 2¹⁰, így 2³ · 2¹⁰ = 2¹³.'
  },
  {
    id: 'prv-q12',
    level: 2,
    questionTypeBadge: '2 hatványai',
    question: 'Írd fel 2 hatványaként: (2⁻³)⁻¹ : (2⁻⁴)⁻³',
    options: ['2⁻⁹', '2⁹', '2¹⁵', '2⁻¹'],
    correctAnswer: 0,
    explanation: '(2⁻³)⁻¹ = 2³ és (2⁻⁴)⁻³ = 2¹², tehát 2³ : 2¹² = 2³⁻¹² = 2⁻⁹.'
  },
  {
    id: 'prv-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik nagyobb: 2⁻³ vagy 3⁻²?',
    options: ['2⁻³, mert 1/8 > 1/9', '3⁻², mert 1/9 > 1/8', 'Egyenlők', 'Nem lehet eldönteni számológép nélkül'],
    correctAnswer: 0,
    explanation: '2⁻³ = 1/8 és 3⁻² = 1/9. A nagyobb nevezőjű tört a kisebb, ezért 2⁻³ a nagyobb.'
  },
  {
    id: 'prv-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik nagyobb: (−2)⁻² vagy (−3)⁻²?',
    options: ['(−2)⁻², mert 1/4 > 1/9', '(−3)⁻², mert 1/9 > 1/4', 'Egyenlők', 'Mindkettő negatív, (−3)⁻² a nagyobb'],
    correctAnswer: 0,
    explanation: '(−2)⁻² = 1/(−2)² = 1/4 és (−3)⁻² = 1/9 – páros kitevő miatt mindkettő pozitív, 1/4 a nagyobb.'
  },
  {
    id: 'prv-q15',
    level: 2,
    questionTypeBadge: '2 hatványai',
    question: 'Írd fel 2 hatványaként: 4¹¹',
    options: ['2²²', '2¹³', '2⁴⁴', '2¹⁵'],
    correctAnswer: 0,
    explanation: '4 = 2², így 4¹¹ = (2²)¹¹ = 2²².'
  },
  {
    id: 'prv-q16',
    level: 2,
    questionTypeBadge: '2 hatványai',
    question: 'Írd fel 2 hatványaként: 512²',
    options: ['2¹⁸', '2¹¹', '2⁹', '2³⁶'],
    correctAnswer: 0,
    explanation: '512 = 2⁹, így 512² = (2⁹)² = 2¹⁸.'
  },
  {
    id: 'prv-q17',
    level: 2,
    questionTypeBadge: 'Tört alak',
    question: 'Add meg két egész szám hányadosaként: (3⁻¹ − 3⁻²) : 3',
    options: ['2/27', '2/9', '1/27', '−1/27'],
    correctAnswer: 0,
    explanation: '3⁻¹ − 3⁻² = 1/3 − 1/9 = 2/9, majd (2/9) : 3 = 2/27.'
  },
  {
    id: 'prv-q18',
    level: 2,
    questionTypeBadge: '3 hatványai',
    question: 'Írd fel 3 hatványaként: 9² · 27⁻⁶',
    options: ['3⁻¹⁴', '3²²', '3⁻⁴', '3¹²'],
    correctAnswer: 0,
    explanation: '9² = 3⁴ és 27⁻⁶ = (3³)⁻⁶ = 3⁻¹⁸, így 3⁴ · 3⁻¹⁸ = 3⁻¹⁴.'
  },
  {
    id: 'prv-q19',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik valós szám harmadik hatványa 8/27?',
    options: ['2/3', '±2/3', '8/9', '3/2'],
    correctAnswer: 0,
    explanation: '(2/3)³ = 8/27. Páratlan kitevőnél csak egy megoldás van: (−2/3)³ = −8/27.'
  },
  {
    id: 'prv-q20',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik valós szám (−1)-edik hatványa 1/5?',
    options: ['5', '−5', '1/5', '−1/5'],
    correctAnswer: 0,
    explanation: 'x⁻¹ = 1/x = 1/5 ⇒ x = 5.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'prv-q21',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Állítsd növekvő sorrendbe: A = (−7)⁸⁰, B = (−3)⁷⁵, C = 5⁻¹⁰, D = (2³)⁸⁰, E = (−3)⁻⁷⁵, F = (−3)⁻¹⁰',
    figure: ORDER_FIG,
    options: ['B < E < C < F < A < D', 'E < B < F < C < A < D', 'B < E < F < C < D < A', 'C < F < E < B < A < D'],
    correctAnswer: 0,
    explanation: 'Negatívak (páratlan kitevő, negatív alap): B nagy abszolút értékű, E közel 0-hoz ⇒ B < E. Pozitívak: 5⁻¹⁰ < 3⁻¹⁰ (C < F), 7⁸⁰ < 8⁸⁰ (A < D).'
  },
  {
    id: 'prv-q22',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Mely valós számok negyedik hatványa 16/81?',
    options: ['2/3 és −2/3', 'Csak 2/3', '4/9 és −4/9', 'Csak 4/9'],
    correctAnswer: 0,
    explanation: '(±2/3)⁴ = 16/81. Páros kitevőnél a szám és az ellentettje ugyanazt a hatványt adja.'
  },
  {
    id: 'prv-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Mely valós számok mínusz második hatványa 4/9?',
    options: ['3/2 és −3/2', 'Csak 3/2', '2/3 és −2/3', '9/4'],
    correctAnswer: 0,
    explanation: 'x⁻² = 1/x² = 4/9 ⇒ x² = 9/4 ⇒ x = ±3/2.'
  },
  {
    id: 'prv-q24',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik valós szám hatodik hatványa −1/64?',
    options: ['Nincs ilyen valós szám', '−1/2', '1/2 és −1/2', '1/2'],
    correctAnswer: 0,
    explanation: 'Páros kitevős hatvány nem lehet negatív (x⁶ ≥ 0), ezért nincs ilyen valós szám. (−1/2)⁶ = +1/64.'
  },
  {
    id: 'prv-q25',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Mely valós számok mínusz tizedik hatványa 1024?',
    options: ['1/2 és −1/2', 'Csak 1/2', '2 és −2', 'Csak 2'],
    correctAnswer: 0,
    explanation: 'x⁻¹⁰ = 1024 = 2¹⁰ ⇒ x¹⁰ = (1/2)¹⁰ ⇒ x = ±1/2.'
  },
  {
    id: 'prv-q26',
    level: 3,
    questionTypeBadge: 'Szabadulószoba',
    question: 'A szabadulószobában a kód: 45⁻¹ tizedes tört alakjából a tizedesvessző utáni első 3 számjegy. Mi a kód?',
    options: ['022', '045', '222', '450'],
    correctAnswer: 0,
    explanation: '45⁻¹ = 1/45 = 0,0222…, így a tizedesvessző utáni első három számjegy: 022.'
  },
  {
    id: 'prv-q27',
    level: 3,
    questionTypeBadge: 'Bűvös négyzet',
    question: 'A 2 hatványaiból álló bűvös négyzetben minden sor, oszlop és átló szorzata 2⁴⁵. Az első sorban 2²² és 2¹⁸ áll. Mi a hiányzó elem?',
    figure: (
      <MagicSquareFig
        cells={[
          ['?', '22', '18'],
          ['', '15', ''],
          ['', '8', '']
        ]}
      />
    ),
    options: ['2⁵', '2⁴⁰', '2⁷', '2⁻⁵'],
    correctAnswer: 0,
    explanation: '2ˣ · 2²² · 2¹⁸ = 2ˣ⁺⁴⁰ = 2⁴⁵ ⇒ x = 5. Szorzat helyett elég a kitevőket összeadni.'
  },
  {
    id: 'prv-q28',
    level: 3,
    questionTypeBadge: 'Igaz–hamis',
    question: 'Melyik állítás igaz?',
    options: [
      'Van olyan pozitív szám, amelynek a négyzete nagyobb a köbénél',
      'Minden pozitív szám négyzete kisebb a köbénél',
      'Negatív szám negatív kitevős hatványa mindig negatív',
      'A 2 minden páratlan kitevős hatványa felírható 4 egész kitevős hatványaként'
    ],
    correctAnswer: 0,
    explanation: 'Pl. 0,5² = 0,25 > 0,5³ = 0,125. Hamis: (−2)⁻² = 1/4 > 0; 2³ = 8 nem 4 egész kitevős hatványa.'
  },
  {
    id: 'prv-q29',
    level: 3,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mely valós számok (−1)-edik hatványa egyenlő magával a számmal?',
    options: ['1 és −1', 'Csak 1', 'Csak 0', 'Nincs ilyen szám'],
    correctAnswer: 0,
    explanation: 'x⁻¹ = 1/x = x ⇒ x² = 1 ⇒ x = ±1. (A 0-nak nincs −1-edik hatványa.)'
  },
  {
    id: 'prv-q30',
    level: 3,
    questionTypeBadge: 'Helyettesítés',
    question: 'Mennyi a · (a²)⁻¹ · a⁻³ : ((a⁻³)⁻² · a⁻⁹) értéke, ha a = 123 456?',
    options: ['1/123 456', '123 456', '1', '1/123 456²'],
    correctAnswer: 0,
    explanation: 'Számláló: a¹⁻²⁻³ = a⁻⁴; nevező: a⁶ · a⁻⁹ = a⁻³. Hányados: a⁻⁴⁻⁽⁻³⁾ = a⁻¹ = 1/123 456. Előbb egyszerűsíts, utána helyettesíts!'
  }
];

export const PowersReviewQuiz: React.FC<{
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
      topicId="g11-exp-hatvanyozas-ismetles-quiz"
      subtopicId="hatvanyozas-ismetles"
      title="1. Hatványozás – ismétlés – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: egész kitevőjű hatványok, azonosságok, 2 és 3 hatványai, összehasonlítás, visszafelé gondolkodás."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={POWERS_REVIEW_QUESTIONS}
      cheatSheets={[
        {
          title: 'Értelmezés',
          items: ['aⁿ = a · a · … · a (n tényező)', 'a¹ = a; a⁰ = 1 (a ≠ 0); 0⁰ nem értelmezett', 'a⁻ⁿ = (1/a)ⁿ = 1/aⁿ (a ≠ 0)', 'Negatív kitevő ≠ negatív hatvány: 2⁻³ = 1/8']
        },
        {
          title: 'Azonosságok',
          items: ['aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ : aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐ·ⁿ', '(ab)ⁿ = aⁿbⁿ; (a/b)ⁿ = aⁿ/bⁿ', 'Átírás: 4 = 2², 8 = 2³, 16 = 2⁴, 32 = 2⁵, 512 = 2⁹']
        },
        {
          title: 'Előjel és összehasonlítás',
          items: ['Pozitív alap ⇒ pozitív hatvány', 'Negatív alap: páros kitevő ⇒ +, páratlan ⇒ −', '(−3)² = 9, de −3² = −9', 'xⁿ = c páros n-re: ±, páratlanra egy megoldás']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PowersReviewMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PowersReviewSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PowersReviewQuiz;
