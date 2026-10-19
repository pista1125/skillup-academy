import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { FamousSequencesMatcher } from './FamousSequencesMatcher';
import { FamousSequencesSorter } from './FamousSequencesSorter';

export interface FamousSequencesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const FAMOUS_SEQUENCES_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: PÁROS, PÁRATLAN ÉS ALAP NÉGYZETSZÁMOK (1-10)
  // =========================================================================
  {
    id: 'fq1-1',
    level: 1,
    prompt: 'Melyik szám páros az alábbiak közül?',
    options: [
      '28 (mivel 2-vel osztható maradék nélkül)',
      '27',
      '35',
      '19'
    ],
    correctAnswer: 0,
    explanation: 'A páros számok 0, 2, 4, 6 vagy 8-ra végződnek, és maradék nélkül oszthatók 2-vel. 28 : 2 = 14.',
    hint: 'Nézd az utolsó számjegyet: 8 páros!',
    breakdown: [
      { label: 'Utolsó jegy', value: '8' },
      { label: 'Osztás', value: '28 : 2 = 14 (maradék 0)' }
    ],
    figure: (
      <svg className="w-36 h-16 mx-auto" viewBox="0 0 140 60">
        <rect x="10" y="10" width="55" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="37" y="28" textAnchor="middle" className="text-[10px] font-bold fill-blue-800">Páros</text>
        <text x="37" y="42" textAnchor="middle" className="text-[12px] font-black fill-blue-900">28</text>

        <rect x="75" y="10" width="55" height="40" rx="8" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="102" y="28" textAnchor="middle" className="text-[10px] font-bold fill-rose-800">Páratlan</text>
        <text x="102" y="42" textAnchor="middle" className="text-[12px] font-black fill-rose-900">27</text>
      </svg>
    )
  },
  {
    id: 'fq1-2',
    level: 1,
    prompt: 'Melyik algebrai képlet fejezi ki az n-edik pozitív páratlan számot?',
    options: [
      '2 · n - 1',
      '2 · n',
      'n + 2',
      '2 · n + 2'
    ],
    correctAnswer: 0,
    explanation: 'n = 1 esetén: 2·1 - 1 = 1; n = 2 esetén: 2·2 - 1 = 3; n = 3 esetén: 2·3 - 1 = 5. A páratlan számok képlete: 2n - 1.',
    hint: 'n = 1-re az eredménynek 1-nek kell lennie: 2 · 1 - 1 = 1.',
    breakdown: [
      { label: 'Páros számok', value: '2n' },
      { label: 'Páratlan számok', value: '2n - 1' }
    ]
  },
  {
    id: 'fq1-3',
    level: 1,
    prompt: 'Mennyi a 6. négyzetszám (6²) értéke?',
    options: [
      '36 (mivel 6 · 6 = 36)',
      '12',
      '30',
      '42'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetszámot úgy kapjuk, hogy a számot megszorozzuk önmagával: 6 · 6 = 36.',
    hint: 'Szorozd meg a 6-ot önmagával: 6 · 6 = ?',
    breakdown: [
      { label: 'Számolás', value: '6 · 6' },
      { label: 'Eredmény', value: '36' }
    ]
  },
  {
    id: 'fq1-4',
    level: 1,
    prompt: 'Melyik szám a kakukktojás a négyzetszámok sorozatában: 1, 4, 9, 15, 25, 36 ?',
    options: [
      'A 15 (mivel a helyes 4. négyzetszám 4 · 4 = 16)',
      'A 9',
      'A 25',
      'A 4'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetszámok sora: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. A 15 nem négyzetszám, helyette 16-nak kell állnia.',
    hint: '4 · 4 = 16, nem 15!',
    breakdown: [
      { label: 'Hibás tag', value: '15' },
      { label: 'Helyes érték', value: '4 · 4 = 16' }
    ]
  },
  {
    id: 'fq1-5',
    level: 1,
    prompt: 'Mennyi a 3. háromszögszám értéke (T₃)?',
    options: [
      '6 (mivel 1 + 2 + 3 = 6)',
      '9',
      '5',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögszámok az egymást követő természetes számok összegei: 1 + 2 + 3 = 6.',
    hint: 'Add össze az első 3 természetes számot: 1 + 2 + 3 = ?',
    breakdown: [
      { label: 'Összeg', value: '1 + 2 + 3' },
      { label: '3. háromszögszám', value: '6' }
    ]
  },
  {
    id: 'fq1-6',
    level: 1,
    prompt: 'Hány tekebábuból áll a klasszikus teke felállítás, amely pontosan a 4. háromszögszám?',
    options: [
      '10 bábu (mivel 1 + 2 + 3 + 4 = 10)',
      '9 bábu',
      '12 bábu',
      '8 bábu'
    ],
    correctAnswer: 0,
    explanation: 'A tekebábuk egyenlő oldalú háromszög alakban állnak: 1 az élen, 2 a 2. sorban, 3 a 3. sorban és 4 az utolsó sorban. Összesen: 1 + 2 + 3 + 4 = 10 bábu.',
    hint: '1 + 2 + 3 + 4 = 10.',
    breakdown: [
      { label: 'Sorok', value: '1 + 2 + 3 + 4' },
      { label: 'Összes bábu', value: '10 db' }
    ]
  },
  {
    id: 'fq1-7',
    level: 1,
    prompt: 'Mi a híres Fibonacci-sorozat legelső 4 tagja?',
    options: [
      '1, 1, 2, 3',
      '0, 2, 4, 6',
      '1, 2, 4, 8',
      '1, 3, 5, 7'
    ],
    correctAnswer: 0,
    explanation: 'A Fibonacci-sorozat két 1-essel indul: 1, 1. Majd 1 + 1 = 2, és 1 + 2 = 3. Tehát az első 4 tag: 1, 1, 2, 3.',
    hint: 'Két 1-essel kezdődik: 1, 1, majd az összegük jön: 2, aztán 1+2 = 3.',
    breakdown: [
      { label: '1. és 2. tag', value: '1, 1' },
      { label: '3. tag (1+1)', value: '2' },
      { label: '4. tag (1+2)', value: '3' }
    ]
  },
  {
    id: 'fq1-8',
    level: 1,
    prompt: 'Mennyi a 10. négyzetszám (10²) értéke?',
    options: [
      '100 (mivel 10 · 10 = 100)',
      '20',
      '1000',
      '50'
    ],
    correctAnswer: 0,
    explanation: '10 önmagával való szorzata: 10 · 10 = 100.',
    hint: '10 · 10 = ?',
    breakdown: [
      { label: 'Művelet', value: '10 · 10' },
      { label: 'Eredmény', value: '100' }
    ]
  },
  {
    id: 'fq1-9',
    level: 1,
    prompt: 'Mennyi a 15. pozitív páros szám értéke?',
    options: [
      '30 (mivel a képlet 2n, és 2 · 15 = 30)',
      '15',
      '32',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'A páros számok a 2 többszörösei: a 15. páros szám 2 · 15 = 30.',
    hint: 'Szorozd meg a 15-öt 2-vel!',
    breakdown: [
      { label: 'Képlet', value: '2 · n' },
      { label: '15. tag', value: '2 · 15 = 30' }
    ]
  },
  {
    id: 'fq1-10',
    level: 1,
    prompt: 'Melyik szám NEM négyzetszám az alábbiak közül?',
    options: [
      '20 (mivel 4² = 16 és 5² = 25, nincs olyan egész szám, amelynek négyzete 20)',
      '16',
      '25',
      '36'
    ],
    correctAnswer: 0,
    explanation: '16 = 4², 25 = 5², 36 = 6². A 20 viszont nem áll elő egész szám négyzeteként, így nem négyzetszám.',
    hint: 'Melyik szám nem szerepel a szorzótábla átlójában (1, 4, 9, 16, 25...)?',
    breakdown: [
      { label: '16', value: '4 · 4 (négyzetszám)' },
      { label: '20', value: 'NEM négyzetszám' },
      { label: '25', value: '5 · 5 (négyzetszám)' }
    ]
  },

  // =========================================================================
  // 2. SZINT: HÁROMSZÖGSZÁMOK, FIBONACCI ÉS KÜLÖNBSÉGEK (11-20)
  // =========================================================================
  {
    id: 'fq2-1',
    level: 2,
    prompt: 'Mennyi az 5. háromszögszám értéke (T₅)?',
    options: [
      '15 (mivel 1 + 2 + 3 + 4 + 5 = 15)',
      '10',
      '20',
      '25'
    ],
    correctAnswer: 0,
    explanation: 'Az első 5 szám összege: 1 + 2 + 3 + 4 + 5 = 15. A teke 10 bábujához még egy 5 fős sort adva 15 golyót kapunk.',
    hint: 'A 4. háromszögszám 10 volt, adj hozzá még 5-öt: 10 + 5 = ?',
    breakdown: [
      { label: 'Összeg', value: '1 + 2 + 3 + 4 + 5' },
      { label: 'Eredmény', value: '15' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 120 70">
        <circle cx="60" cy="10" r="4" fill="#0d9488" />
        <circle cx="50" cy="22" r="4" fill="#0d9488" />
        <circle cx="70" cy="22" r="4" fill="#0d9488" />
        <circle cx="40" cy="34" r="4" fill="#0d9488" />
        <circle cx="60" cy="34" r="4" fill="#0d9488" />
        <circle cx="80" cy="34" r="4" fill="#0d9488" />
        <circle cx="30" cy="46" r="4" fill="#0d9488" />
        <circle cx="50" cy="46" r="4" fill="#0d9488" />
        <circle cx="70" cy="46" r="4" fill="#0d9488" />
        <circle cx="90" cy="46" r="4" fill="#0d9488" />
        <circle cx="20" cy="58" r="4" fill="#0d9488" />
        <circle cx="40" cy="58" r="4" fill="#0d9488" />
        <circle cx="60" cy="58" r="4" fill="#0d9488" />
        <circle cx="80" cy="58" r="4" fill="#0d9488" />
        <circle cx="100" cy="58" r="4" fill="#0d9488" />
      </svg>
    )
  },
  {
    id: 'fq2-2',
    level: 2,
    prompt: 'Mennyi az első 4 páratlan szám összege: 1 + 3 + 5 + 7?',
    options: [
      '16 (mivel az első 4 páratlan szám összege pontosan 4² = 16)',
      '15',
      '14',
      '18'
    ],
    correctAnswer: 0,
    explanation: '1 + 3 = 4, 4 + 5 = 9, 9 + 7 = 16. Ez a csodálatos szabály: az első n páratlan szám összege mindig n²! 4 darab számnál 4² = 16.',
    hint: 'Add össze őket: 1 + 3 + 5 + 7 = 16. Nézd, ez pont 4²!',
    breakdown: [
      { label: 'Összeg', value: '1 + 3 + 5 + 7 = 16' },
      { label: 'Négyzetszám', value: '4² = 16' }
    ]
  },
  {
    id: 'fq2-3',
    level: 2,
    prompt: 'Mennyi a Fibonacci-sorozat 7. tagja (F₇), ha az első 6 tag: 1, 1, 2, 3, 5, 8, [?] ?',
    options: [
      '13 (mivel az utolsó kettő összege: 5 + 8 = 13)',
      '11',
      '16',
      '14'
    ],
    correctAnswer: 0,
    explanation: 'A Fibonacci szabály szerint minden tag az előző kettő összege: 5 + 8 = 13.',
    hint: 'Add össze az 5-öt és a 8-at!',
    breakdown: [
      { label: '5. tag + 6. tag', value: '5 + 8' },
      { label: '7. tag', value: '13' }
    ]
  },
  {
    id: 'fq2-4',
    level: 2,
    prompt: 'Mi a következő tag a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, 21, [?] ?',
    options: [
      '34 (mivel 13 + 21 = 34)',
      '32',
      '29',
      '42'
    ],
    correctAnswer: 0,
    explanation: '13 + 21 = 34. A Fibonacci-sorozat 9. tagja 34.',
    hint: 'Add össze az utolsó két számot: 13 + 21 = ?',
    breakdown: [
      { label: '13 + 21', value: '34' }
    ]
  },
  {
    id: 'fq2-5',
    level: 2,
    prompt: 'Mennyi a két szomszédos négyzetszám, a 7² és 6² különbsége (49 - 36)?',
    options: [
      '13 (ami pontosan a soron következő páratlan szám)',
      '11',
      '15',
      '12'
    ],
    correctAnswer: 0,
    explanation: '49 - 36 = 13. A szomszédos négyzetszámok különbségei mindig a páratlan számok: 3, 5, 7, 9, 11, 13!',
    hint: '49 - 36 = ?',
    breakdown: [
      { label: '7²', value: '49' },
      { label: '6²', value: '36' },
      { label: 'Különbség', value: '49 - 36 = 13' }
    ]
  },
  {
    id: 'fq2-6',
    level: 2,
    prompt: 'Mit kapunk, ha összeadjuk a 2. és a 3. háromszögszámot: 3 + 6?',
    options: [
      '9-et (ami pontosan a 3² négyzetszám!)',
      '10-et',
      '8-at',
      '12-t'
    ],
    correctAnswer: 0,
    explanation: '3 + 6 = 9 = 3². Bármely két egymást követő háromszögszám összege mindig négyzetszámot ad!',
    hint: '3 + 6 = 9. És mennyi a 3 négyzete?',
    breakdown: [
      { label: 'T₂ + T₃', value: '3 + 6 = 9' },
      { label: 'Négyzetszám', value: '3² = 9' }
    ]
  },
  {
    id: 'fq2-7',
    level: 2,
    prompt: 'Mit kapunk, ha összeadjuk a 3. és a 4. háromszögszámot: 6 + 10?',
    options: [
      '16-ot (ami a 4² négyzetszám)',
      '15-öt',
      '20-at',
      '18-at'
    ],
    correctAnswer: 0,
    explanation: '6 + 10 = 16 = 4². Két egymást követő háromszög alakzatból egy teljes négyzetet tudunk összerakni!',
    hint: '6 + 10 = 16 = 4 · 4.',
    breakdown: [
      { label: 'T₃ + T₄', value: '6 + 10 = 16' },
      { label: 'Négyzetszám', value: '4² = 16' }
    ]
  },
  {
    id: 'fq2-8',
    level: 2,
    prompt: 'Mennyi a 9. négyzetszám (9²) értéke?',
    options: [
      '81 (mivel 9 · 9 = 81)',
      '72',
      '90',
      '89'
    ],
    correctAnswer: 0,
    explanation: '9 · 9 = 81.',
    hint: 'Kilencszer kilenc = ?',
    breakdown: [
      { label: '9 · 9', value: '81' }
    ]
  },
  {
    id: 'fq2-9',
    level: 2,
    prompt: 'Egy kerti boglárka virágnak pontosan 5 szirma van. Melyik híres számsorozat eleme az 5-ös szám?',
    options: [
      'A Fibonacci-sorozaté (1, 1, 2, 3, 5, 8...)',
      'A négyzetszámoké',
      'A háromszögszámoké',
      'A páros számoké'
    ],
    correctAnswer: 0,
    explanation: 'Az 5 a Fibonacci-sorozat 5. tagja (2 + 3 = 5). A növények virágszirmainak száma rendkívül gyakran Fibonacci-szám!',
    hint: '1, 1, 2, 3, 5...',
    breakdown: [
      { label: 'Fibonacci tag', value: 'F₅ = 5' },
      { label: 'Biológiai példa', value: 'Boglárka (5 szirom)' }
    ]
  },
  {
    id: 'fq2-10',
    level: 2,
    prompt: 'Mennyi a 8. háromszögszám értéke (T₈ = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8)?',
    options: [
      '36 (mivel az összeg pontosan 36)',
      '32',
      '40',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'A számok összege: (1+8) + (2+7) + (3+6) + (4+5) = 4 · 9 = 36. Érdekesség: a 36 egyszerre háromszögszám (T₈) és négyzetszám (6²) is!',
    hint: 'Párosítsd a számokat: 1+8=9, 2+7=9, 3+6=9, 4+5=9. 4 · 9 = ?',
    breakdown: [
      { label: 'Párosítás', value: '4 · 9' },
      { label: 'Eredmény', value: '36' }
    ]
  },

  // =========================================================================
  // 3. SZINT: TERMÉSZETI CSODÁK ÉS ÖSSZETETT GEOMETRIA (21-30)
  // =========================================================================
  {
    id: 'fq3-1',
    level: 3,
    prompt: 'Mi a leglenyűgözőbb matematikai szabály a napraforgó magtányérjának magjaiban?',
    options: [
      'A magok két ellentétes irányú spirálba rendeződnek, és a spirálok számai szomszédos Fibonacci-számok (pl. 34 és 55)',
      'Minden sorban pontosan 10 mag van',
      'A magok négyzetrácsot alkotnak',
      'Nincs benne semmilyen szabályosság'
    ],
    correctAnswer: 0,
    explanation: 'A napraforgó magjai az optimális helykihasználás miatt spirálokba rendeződnek. Az óramutatóval egyező és ellentétes spirálok száma szinte kivétel nélkül szomszédos Fibonacci-számpár (pl. 21 és 34, vagy 34 és 55).',
    hint: 'Keresd a Fibonacci-spirálokat és a szomszédos Fibonacci-számokat!',
    breakdown: [
      { label: 'Jelenség', value: 'Kettős magspirál' },
      { label: 'Számok', value: '34 és 55 (Fibonacci-pár)' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 120 70">
        <circle cx="60" cy="35" r="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="60" cy="35" r="18" fill="#fde68a" />
        <circle cx="60" cy="35" r="6" fill="#d97706" />
        <path d="M 60 35 Q 70 20 85 25" fill="none" stroke="#ea580c" strokeWidth="1.5" />
        <path d="M 60 35 Q 50 50 35 45" fill="none" stroke="#ea580c" strokeWidth="1.5" />
        <path d="M 60 35 Q 75 45 80 55" fill="none" stroke="#ea580c" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'fq3-2',
    level: 3,
    prompt: 'Mennyi az első 10 pozitív páratlan szám összege: 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19?',
    options: [
      '100 (mivel az első n páratlan szám összege n², és 10² = 100)',
      '90',
      '110',
      '99'
    ],
    correctAnswer: 0,
    explanation: 'Az első n darab páratlan szám összege mindig pontosan n². Mivel 10 darab számot adunk össze: 10² = 100!',
    hint: '10 páratlan szám &rarr; 10² = ?',
    breakdown: [
      { label: 'Szabály', value: 'Első n páratlan összege = n²' },
      { label: 'n = 10 esetén', value: '10² = 100' }
    ]
  },
  {
    id: 'fq3-3',
    level: 3,
    prompt: 'Hányadik tag a Fibonacci-sorozatban az 55-ös érték (1, 1, 2, 3, 5, 8, 13, 21, 34, 55)?',
    options: [
      'A 10. tag (F₁₀ = 55)',
      'A 9. tag',
      'A 11. tag',
      'A 8. tag'
    ],
    correctAnswer: 0,
    explanation: 'Sorban: F₁=1, F₂=1, F₃=2, F₄=3, F₅=5, F₆=8, F₇=13, F₈=21, F₉=34, F₁₀=55. Tehát az 55 a 10. tag.',
    hint: 'Számold meg sorban az elemeket!',
    breakdown: [
      { label: 'F₉', value: '34' },
      { label: 'F₁₀', value: '21 + 34 = 55' }
    ]
  },
  {
    id: 'fq3-4',
    level: 3,
    prompt: 'Melyik szám az egyetlen 1-nél nagyobb szám az első 100 szám között, amely EGYSZERRE négyzetszám és háromszögszám is?',
    options: [
      'A 36 (mivel 6² = 36 és T₈ = 1 + ... + 8 = 36)',
      'A 25',
      'A 49',
      'A 64'
    ],
    correctAnswer: 0,
    explanation: '36 = 6 · 6 (6. négyzetszám), és 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36 (8. háromszögszám). Ez egy nagyon különleges, ritka szám!',
    hint: '6 · 6 = 36, és 1-től 8-ig a számok összege is 36.',
    breakdown: [
      { label: 'Négyzetszám', value: '6² = 36' },
      { label: 'Háromszögszám', value: 'T₈ = 36' }
    ]
  },
  {
    id: 'fq3-5',
    level: 3,
    prompt: 'Mennyi a 10. háromszögszám értéke (1-től 10-ig a számok összege)?',
    options: [
      '55 (ez egyben a 10. Fibonacci-szám is!)',
      '50',
      '45',
      '60'
    ],
    correctAnswer: 0,
    explanation: '(10 · 11) : 2 = 110 : 2 = 55. Csodálatos egybeesés: a 10. háromszögszám (55) pontosan megegyezik a 10. Fibonacci-számmal (55)!',
    hint: '1+10=11, 2+9=11... 5 pár van: 5 · 11 = ?',
    breakdown: [
      { label: 'Számítás', value: '5 · 11' },
      { label: 'Eredmény', value: '55' }
    ]
  },
  {
    id: 'fq3-6',
    level: 3,
    prompt: 'Mennyi a 12. négyzetszám értéke (12²)?',
    options: [
      '144 (ez egyben a 12. Fibonacci-szám is!)',
      '124',
      '140',
      '156'
    ],
    correctAnswer: 0,
    explanation: '12 · 12 = 144. Újabb matematikai csoda: a 12. négyzetszám (144) egyben a 12. Fibonacci-szám is (F₁₂ = 144)!',
    hint: '12 · 12 = ?',
    breakdown: [
      { label: 'Négyzet', value: '12 · 12 = 144' },
      { label: 'Fibonacci tag', value: 'F₁₂ = 144' }
    ]
  },
  {
    id: 'fq3-7',
    level: 3,
    prompt: 'Hogyan építhető fel az aranymetszéshez kapcsolódó Fibonacci-spirál geometriailag egy négyzetrácson?',
    options: [
      'Egymáshoz csatlakozó 1, 1, 2, 3, 5, 8... oldalú négyzetekből, amelyekbe negyedköríveket rajzolunk',
      'Csak körzővel rajzolt egyforma körökből',
      'Háromszögek egymásra pakolásával',
      'Szabálytalan vonalakkal szabad kézzel'
    ],
    correctAnswer: 0,
    explanation: 'A spirál úgy épül fel, hogy 1×1, 1×1, 2×2, 3×3, 5×5, 8×8... méretű négyzeteket illesztünk egymás mellé spirál alakban, majd mindegyikbe egy 90 fokos negyedkörívet illesztünk.',
    hint: 'Négyzetek oldalainak hossza a Fibonacci-számok: 1, 1, 2, 3, 5, 8...',
    breakdown: [
      { label: 'Négyzetek oldalai', value: '1, 1, 2, 3, 5, 8...' },
      { label: 'Ívek', value: 'Negyedkörívek összekötése' }
    ]
  },
  {
    id: 'fq3-8',
    level: 3,
    prompt: 'Hány virágszirmu növények a leggyakoribbak a vadvirágos réteken a botanikusok megfigyelése szerint?',
    options: [
      '3, 5, 8, 13, 21 vagy 34 szirmúak (mind Fibonacci-számok)',
      'Mindig páros sziromszámúak',
      'Pontosan 4 vagy 6 szirmúak',
      'Csak 10 szirmúak'
    ],
    correctAnswer: 0,
    explanation: 'A virágok sziromszámai túlnyomórészt Fibonacci-számok: pl. liliom (3), boglárka (5), szarkaláb (8), körömvirág (13), őszirózsa (21), margaréta (34).',
    hint: 'Keresd a Fibonacci-számokat!',
    breakdown: [
      { label: 'Sziromszámok', value: '3, 5, 8, 13, 21, 34' },
      { label: 'Kapcsolat', value: 'Fibonacci-sorozat a természetben' }
    ]
  },
  {
    id: 'fq3-9',
    level: 3,
    prompt: 'Mely számjegyekre NEM végződhet soha egyetlen egész szám négyzete sem?',
    options: [
      '2, 3, 7 és 8 (a négyzetszámok csak 0, 1, 4, 5, 6 vagy 9-re végződhetnek)',
      '0 és 5',
      '1 és 9',
      '4 és 6'
    ],
    correctAnswer: 0,
    explanation: 'A számok utolsó jegyének négyzetei: 0²=0, 1²=1, 2²=4, 3²=9, 4²=16 (6), 5²=25 (5), 6²=36 (6), 7²=49 (9), 8²=64 (4), 9²=81 (1). Egyik sem végződik 2-re, 3-ra, 7-re vagy 8-ra!',
    hint: 'Egyik egyjegyű szám négyzete sem végződik 2-re, 3-ra, 7-re vagy 8-ra.',
    breakdown: [
      { label: 'Lehetséges végződések', value: '0, 1, 4, 5, 6, 9' },
      { label: 'Lehetetlen végződések', value: '2, 3, 7, 8' }
    ]
  },
  {
    id: 'fq3-10',
    level: 3,
    prompt: 'Mi a legfőbb filozófiai és matematikai tanulsága a nevezetes sorozatok (Fibonacci, négyzetszámok, háromszögszámok) tanulmányozásának?',
    options: [
      'A látszólag különböző dolgok – a számelmélet, a geometria és a növényvilág – mögött ugyanazok a rejtett, harmonikus matematikai törvények húzódnak',
      'A matematika csak papíron létezik, nincs köze a valósághoz',
      'A sorozatokat csak a virágoknál lehet alkalmazni',
      'A sorozatok nem segítenek a számolásban'
    ],
    correctAnswer: 0,
    explanation: 'A nevezetes sorozatok rámutatnak a világ lenyűgöző egységére: a pontrácsok (geometria), a számok összege (aritmetika) és az élő természet formái (biológia) mind ugyanazt a közös matematikai nyelvet beszélik.',
    hint: 'A matematika a természet leíró nyelve.',
    breakdown: [
      { label: 'Összefüggés', value: 'Számelmélet + Geometria + Természet' },
      { label: 'Tanulság', value: 'A természet matematikai harmóniája' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'Páros és Páratlan Számok',
      badge: 'ALAPOK',
      description: 'Páros számok (2n): 2, 4, 6, 8, 10... Páratlan számok (2n - 1): 1, 3, 5, 7, 9...',
      formula: '2n \\quad | \\quad 2n - 1',
      note: 'Mindkettő lépésköze állandó: +2.'
    },
    {
      id: 'cs1-2',
      title: 'A Négyzetszámok Alapjai',
      badge: 'NÉGYZETEK',
      description: 'Egy szám önmagával való szorzata: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...',
      note: 'Lépésközök: a páratlan számok sora (+3, +5, +7, +9...).'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'A Háromszögszámok Titka',
      badge: 'HÁROMSZÖGEK',
      description: 'Egymást követő számok összege: T₁=1, T₂=3, T₃=6, T₄=10, T₅=15, T₆=21, T₇=28, T₈=36...',
      formula: 'T_n = \\frac{n(n + 1)}{2}',
      note: 'Két szomszédos háromszögszám összege mindig négyzetszám!'
    },
    {
      id: 'cs2-2',
      title: 'A Fibonacci-sorozat Képzése',
      badge: 'FIBONACCI',
      description: 'Kezdődik 1, 1-gyel. Minden következő tag az előző kettő összege.',
      formula: 'F_n = F_{n-1} + F_{n-2} \\implies 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...',
      note: '5 + 8 = 13, 8 + 13 = 21, 13 + 21 = 34...'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Fibonacci az Élő Természetben',
      badge: 'BIOLÓGIA',
      description: 'Napraforgó magtányér spiráljai (34 és 55). Virágszirmok száma (3, 5, 8, 13, 21). Fenyőtoboz és ananász pikkelyei.',
      note: 'A természet a legoptimálisabb helykihasználásra törekszik.'
    },
    {
      id: 'cs3-2',
      title: 'Különleges Egybeesések',
      badge: 'SZÁMELMÉLET',
      description: '36 = 6² = T₈ (egyszerre négyzet- és háromszögszám). 55 = T₁₀ = F₁₀. 144 = 12² = F₁₂.',
      note: 'Az első n páratlan szám összege = n²!'
    }
  ]
};

export const FamousSequencesQuiz: React.FC<FamousSequencesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-famous-seq-quiz"
      title="Nevezetes, érdekes sorozatok kvíz"
      subtitle="30 feladat 3 szinten: négyzetszámok, háromszögszámok, a Fibonacci-sorozat és természeti csodák"
      questions={FAMOUS_SEQUENCES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-famous-sequences-quiz"
      storageKey="g5-loc-famous-seq-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={FamousSequencesMatcher}
      sorterComponent={FamousSequencesSorter}
    />
  );
};
