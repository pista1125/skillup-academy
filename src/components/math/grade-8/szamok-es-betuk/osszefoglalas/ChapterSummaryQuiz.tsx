import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { ChapterSummaryMatcher } from './ChapterSummaryMatcher';
import { ChapterSummarySorter } from './ChapterSummarySorter';
import { Award, Brain, Zap, Square, Boxes } from 'lucide-react';

interface ChapterSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Halmazok & Logika',
    icon: <Brain className="w-4 h-4 text-blue-600" />,
    formula: '|A ∪ B| = |A| + |B| - |A ∩ B|  |  2ⁿ részhalmaz',
    note: 'Skatulya-elv: n+1 elem n skatulyában ⟹ legalább egyben ≥ 2. „Minden” tagadása: „Van olyan... amely nem...”.'
  },
  {
    id: 'c2',
    title: 'Hatványozás & Normálalak',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: 'aⁿ · aᵐ = aⁿ⁺ᵐ  |  aⁿ : aᵐ = aⁿ⁻ᵐ  |  (aⁿ)ᵐ = aⁿᵐ',
    note: 'a⁰ = 1, a⁻ⁿ = 1/aⁿ (a ≠ 0). Normálalak: a · 10ᵏ (1 ≤ a < 10, k ∈ ℤ).'
  },
  {
    id: 'c3',
    title: 'Négyzetgyökvonás',
    icon: <Square className="w-4 h-4 text-rose-600" />,
    formula: '√(a · b) = √a · √b  |  √(a²) = |a|  (a, b ≥ 0)',
    note: '√a ≥ 0 mindig! Kiemelés: √50 = 5√2. CSAPDA: √(a + b) ≠ √a + √b!'
  },
  {
    id: 'c4',
    title: 'A 3 Nevezetes Azonosság',
    icon: <Boxes className="w-4 h-4 text-purple-600" />,
    formula: '(a ± b)² = a² ± 2ab + b²  |  (a + b)(a - b) = a² - b²',
    note: 'Ne hagyd le a középső ±2ab tagot! Fejszámolás: 52 · 48 = 50² - 2² = 2496.'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAPFOGALMAK, DEFINÍCIÓK ÉS EGYSZERŰ MŰVELETEK (1-30) ------
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Melyik mondat minősül logikai állításnak (kijelentésnek)?',
    options: [
      'A 12 páros szám.',
      'Hány óra van?',
      'Gyere ide azonnal!',
      'Bárcsak nyár lenne!'
    ],
    correctAnswer: 'A 12 páros szám.',
    explanation: 'Egy mondat akkor állítás, ha egyértelműen eldönthető róla, hogy igaz vagy hamis.',
    hint: 'Keresd a kijelentő mondatot, amelynek egyértelmű igazságtartalma van!',
    breakdown: [{ label: 'Típus', value: 'Kijelentés (Igaz)' }]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mi a „Minden páros szám osztható 4-gyel” állítás helyes tagadása?',
    options: [
      'Van olyan páros szám, amely nem osztható 4-gyel.',
      'Egyetlen páros szám sem osztható 4-gyel.',
      'Minden páratlan szám osztható 4-gyel.',
      'Minden páros szám osztható 2-vel.'
    ],
    correctAnswer: 'Van olyan páros szám, amely nem osztható 4-gyel.',
    explanation: 'A „minden” állítás tagadása: „van olyan... amely nem...”. (Például a 6 páros, de nem osztható 4-gyel).',
    hint: 'Egyetlen ellenpélda létezése cáfolja a „minden” állítást!',
    breakdown: [{ label: 'Szabály', value: '„Minden A B” tagadása: „Van olyan A, ami nem B”' }]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Egy fiókban 3 különböző színű zokni van. Legalább hány zoknit kell kivennünk vakon, hogy biztosan legyen egy pár azonos színűnk?',
    options: [
      '4',
      '3',
      '6',
      '2'
    ],
    correctAnswer: '4',
    explanation: 'A skatulya-elv szerint 3 szín esetén a legrosszabb esetben az első 3 mind különböző színű. A 4. zokni biztosan egyezik valamelyikkel.',
    hint: 'Skatulyák száma = 3. Húzzunk 3 + 1 = 4 zoknit!',
    breakdown: [{ label: 'Skatulya-elv', value: 'n = 3 szín ⟹ n + 1 = 4 húzás' }]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Hány részhalmaza van egy 3 elemű halmaznak?',
    options: [
      '8',
      '6',
      '9',
      '3'
    ],
    correctAnswer: '8',
    explanation: 'Egy n elemű halmaz részhalmazainak száma 2ⁿ. Itt n = 3, így 2³ = 8.',
    hint: '2³ = 2 · 2 · 2 = 8.',
    breakdown: [{ label: 'Képlet', value: '2³ = 8' }]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Melyik szimbólum jelöli az üres halmazt?',
    options: [
      '∅ vagy {}',
      '{0}',
      '0',
      '{∅}'
    ],
    correctAnswer: '∅ vagy {}',
    explanation: 'Az üres halmaz jele az áthúzott kör (∅) vagy az üres kapcsos zárójel pár {}. A {0} egy 1 elemű halmaz!',
    hint: 'Az üres halmaz nem tartalmaz egyetlen elemet sem.',
    breakdown: [{ label: 'Jelölés', value: '∅ vagy {}' }]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mit nevezünk két halmaz metszetének (A ∩ B)?',
    options: [
      'Azon elemek halmazát, amelyek mindkét halmazban benne vannak.',
      'Azon elemek halmazát, amelyek legalább az egyikben benne vannak.',
      'Azon elemek halmazát, amelyek csak az A halmazban vannak benne.',
      'A két halmaz elemszámának szorzatát.'
    ],
    correctAnswer: 'Azon elemek halmazát, amelyek mindkét halmazban benne vannak.',
    explanation: 'A metszet a közös elemek halmaza: x ∈ A és x ∈ B.',
    hint: 'A ∩ B = a közös rész.',
    breakdown: [{ label: 'Definíció', value: 'x ∈ A és x ∈ B' }]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Melyik számhalmazt jelöli a ℕ betű?',
    options: [
      'Természetes számok {0, 1, 2, ...}',
      'Egész számok',
      'Racionális számok',
      'Negatív számok'
    ],
    correctAnswer: 'Természetes számok {0, 1, 2, ...}',
    explanation: 'ℕ a természetes számok (Natural numbers) halmaza: {0, 1, 2, 3, ...}.',
    hint: 'Természetes számok: nemnegatív egész számok.',
    breakdown: [{ label: 'Halmaz', value: 'ℕ = {0, 1, 2, 3, ...}' }]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi a 3/4 közönséges tört tizedestört alakja?',
    options: [
      '0.75',
      '0.34',
      '0.43',
      '1.33'
    ],
    correctAnswer: '0.75',
    explanation: '3 : 4 = 0.75 (vagy 75/100).',
    hint: '3 osztva 4-gyel.',
    breakdown: [{ label: 'Osztás', value: '3 / 4 = 0.75' }]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Melyik törtből lesz végtelen szakaszos tizedestört?',
    options: [
      '1/3',
      '1/2',
      '3/5',
      '7/10'
    ],
    correctAnswer: '1/3',
    explanation: '1 : 3 = 0.333... = 0.3̇, végtelen szakaszos tizedestört, mivel a nevezőben van 2-től és 5-től eltérő prímtényező (a 3).',
    hint: '1 : 3 = 0.333...',
    breakdown: [{ label: 'Érték', value: '0.333... = 0.3̇' }]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Végezd el a törtek összeadását: 1/2 + 1/3 = ?',
    options: [
      '5/6',
      '2/5',
      '1/5',
      '2/6'
    ],
    correctAnswer: '5/6',
    explanation: 'Közös nevező 6: 3/6 + 2/6 = 5/6.',
    hint: 'Hozd közös nevezőre (6): 3/6 + 2/6.',
    breakdown: [{ label: 'Közös nevező', value: '3/6 + 2/6 = 5/6' }]
  },
  {
    id: 'q1-11',
    level: 1,
    question: 'Számítsd ki a szorzatot: (-4) · (-5) = ?',
    options: [
      '20',
      '-20',
      '-9',
      '9'
    ],
    correctAnswer: '20',
    explanation: 'Két negatív szám szorzata pozitív: (-4) · (-5) = +20.',
    hint: 'Mínusz szorozva mínusszal plusz.',
    breakdown: [{ label: 'Számolás', value: '(-4) · (-5) = +20' }]
  },
  {
    id: 'q1-12',
    level: 1,
    question: 'Végezd el a hatványszorzást: 2³ · 2⁴ = ?',
    options: [
      '2⁷ (= 128)',
      '2¹²',
      '4⁷',
      '4¹²'
    ],
    correctAnswer: '2⁷ (= 128)',
    explanation: 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak: 3 + 4 = 7, így 2⁷ = 128.',
    hint: 'aⁿ · aᵐ = aⁿ⁺ᵐ ⟹ 2³⁺⁴ = 2⁷.',
    breakdown: [{ label: 'Kitevők', value: '3 + 4 = 7 ⟹ 2⁷' }]
  },
  {
    id: 'q1-13',
    level: 1,
    question: 'Mennyi 5⁰ pontos értéke?',
    options: [
      '1',
      '0',
      '5',
      'Nem értelmezhető'
    ],
    correctAnswer: '1',
    explanation: 'Bármely nemnulla szám 0-adik hatványa definíció szerint 1: a⁰ = 1.',
    hint: 'a⁰ = 1 minden a ≠ 0 számra.',
    breakdown: [{ label: 'Azonosság', value: '5⁰ = 1' }]
  },
  {
    id: 'q1-14',
    level: 1,
    question: 'Írd fel a 34 000 számot normálalakban!',
    options: [
      '3.4 · 10⁴',
      '34 · 10³',
      '0.34 · 10⁵',
      '3.4 · 10³'
    ],
    correctAnswer: '3.4 · 10⁴',
    explanation: 'A normálalak a · 10ᵏ alakú, ahol 1 ≤ a < 10. Itt a = 3.4 és 4 helyiértékkel toljuk el a tizedesvesszőt: 3.4 · 10⁴.',
    hint: 'Az első tényezőnek 1 és 10 közé kell esnie: 3.4.',
    breakdown: [{ label: 'Normálalak', value: '3.4 · 10⁴' }]
  },
  {
    id: 'q1-15',
    level: 1,
    question: 'Mennyi a √81 négyzetgyök pontos értéke?',
    options: [
      '9',
      '±9',
      '8.1',
      '40.5'
    ],
    correctAnswer: '9',
    explanation: 'A négyzetgyök definíciója szerint nemnegatív szám: 9² = 81 és 9 ≥ 0, így √81 = 9.',
    hint: 'Melyik nemnegatív szám négyzete 81? A 9.',
    breakdown: [{ label: 'Gyökvonás', value: '√81 = 9' }]
  },
  {
    id: 'q1-16',
    level: 1,
    question: 'Lehet-e egy valós szám négyzetgyöke negatív a definíció szerint?',
    options: [
      'Nem, a négyzetgyök értéke mindig nemnegatív (≥ 0)',
      'Igen, mindig van egy pozitív és egy negatív értéke',
      'Csak akkor, ha a gyök alatti szám negatív',
      'Igen, ha a szám páratlan'
    ],
    correctAnswer: 'Nem, a négyzetgyök értéke mindig nemnegatív (≥ 0)',
    explanation: 'A négyzetgyök matematikai definíciója szerint egyértelmű és nemnegatív: √a ≥ 0.',
    hint: '√a sosem lehet negatív szám!',
    breakdown: [{ label: 'Definíció', value: '√a ≥ 0 minden értelmezett a-ra' }]
  },
  {
    id: 'q1-17',
    level: 1,
    question: 'Mennyi a √0 értéke?',
    options: [
      '0',
      '1',
      'Nem értelmezhető',
      '-0'
    ],
    correctAnswer: '0',
    explanation: '0² = 0 és 0 ≥ 0, ezért √0 = 0.',
    hint: '0 négyzete 0.',
    breakdown: [{ label: 'Érték', value: '√0 = 0' }]
  },
  {
    id: 'q1-18',
    level: 1,
    question: 'Számítsd ki a szorzat négyzetgyökét: √(4 · 25) = ?',
    options: [
      '10',
      '20',
      '50',
      '100'
    ],
    correctAnswer: '10',
    explanation: '√(4 · 25) = √4 · √25 = 2 · 5 = 10 (vagy √100 = 10).',
    hint: '√4 = 2, √25 = 5. 2 · 5 = 10.',
    breakdown: [{ label: 'Szorzat gyöke', value: '√4 · √25 = 2 · 5 = 10' }]
  },
  {
    id: 'q1-19',
    level: 1,
    question: 'Melyik számhalmazba tartozik a √2 szám?',
    options: [
      'Irracionális számok (ℚ*)',
      'Racionális számok (ℚ)',
      'Egész számok (ℤ)',
      'Természetes számok (ℕ)'
    ],
    correctAnswer: 'Irracionális számok (ℚ*)',
    explanation: 'A √2 nem írható fel két egész szám hányadosaként, végtelen nem szakaszos tizedestört, így irracionális szám.',
    hint: 'Nem négyzetszám gyöke mindig irracionális!',
    breakdown: [{ label: 'Számhalmaz', value: '√2 ∈ ℚ*' }]
  },
  {
    id: 'q1-20',
    level: 1,
    question: 'Mi a -5x² algebrai tag együtthatója?',
    options: [
      '-5',
      '5',
      '2',
      'x²'
    ],
    correctAnswer: '-5',
    explanation: 'Az együttható a változók előtt álló szorzótényező az előjelével együtt: -5.',
    hint: 'A betű előtt álló előjeles szám.',
    breakdown: [{ label: 'Együttható', value: '-5' }]
  },
  {
    id: 'q1-21',
    level: 1,
    question: 'Végezd el az összevonást: 4x - 7x + 5x = ?',
    options: [
      '2x',
      '-2x',
      '16x',
      '2x³'
    ],
    correctAnswer: '2x',
    explanation: '(4 - 7 + 5)x = (-3 + 5)x = 2x.',
    hint: '4 - 7 = -3, és -3 + 5 = 2.',
    breakdown: [{ label: 'Összevonás', value: '(4 - 7 + 5)x = 2x' }]
  },
  {
    id: 'q1-22',
    level: 1,
    question: 'Mennyi a 2x - 3 kifejezés helyettesítési értéke, ha x = 5?',
    options: [
      '7',
      '10',
      '13',
      '3'
    ],
    correctAnswer: '7',
    explanation: '2 · 5 - 3 = 10 - 3 = 7.',
    hint: '2 · 5 = 10, ebből vonj ki 3-at.',
    breakdown: [{ label: 'Helyettesítés', value: '2 · 5 - 3 = 7' }]
  },
  {
    id: 'q1-23',
    level: 1,
    question: 'Végezd el a szorzást: 3x · 4y = ?',
    options: [
      '12xy',
      '7xy',
      '12x²y²',
      '7x + 4y'
    ],
    correctAnswer: '12xy',
    explanation: '3 · 4 = 12, és x · y = xy, így 12xy.',
    hint: '3 · 4 = 12, betűk szorzata xy.',
    breakdown: [{ label: 'Szorzat', value: '12xy' }]
  },
  {
    id: 'q1-24',
    level: 1,
    question: 'Bontsd fel a zárójelet: 3(2x - 4) = ?',
    options: [
      '6x - 12',
      '6x - 4',
      '5x - 7',
      '6x + 12'
    ],
    correctAnswer: '6x - 12',
    explanation: '3 · 2x - 3 · 4 = 6x - 12.',
    hint: '3 · 2x = 6x, 3 · (-4) = -12.',
    breakdown: [{ label: 'Bontás', value: '6x - 12' }]
  },
  {
    id: 'q1-25',
    level: 1,
    question: 'Emeld ki a közös tényezőt a 6x + 15 kifejezésből!',
    options: [
      '3(2x + 5)',
      '6(x + 15)',
      '3(3x + 5)',
      '5(x + 3)'
    ],
    correctAnswer: '3(2x + 5)',
    explanation: 'LNKO(6, 15) = 3. Kiemelve: 6x/3 = 2x és 15/3 = 5, így 3(2x + 5).',
    hint: 'Mindkét tag osztható 3-mal.',
    breakdown: [{ label: 'Kiemelés', value: '3(2x + 5)' }]
  },
  {
    id: 'q1-26',
    level: 1,
    question: 'Végezd el a kéttagú szorzást: (x + 2)(x + 3) = ?',
    options: [
      'x² + 5x + 6',
      'x² + 6x + 5',
      'x² + 5x + 5',
      '2x + 5'
    ],
    correctAnswer: 'x² + 5x + 6',
    explanation: 'x² + 3x + 2x + 6 = x² + 5x + 6.',
    hint: 'x² + (2+3)x + (2·3) = x² + 5x + 6.',
    breakdown: [{ label: 'Szorzat', value: 'x² + 5x + 6' }]
  },
  {
    id: 'q1-27',
    level: 1,
    question: 'Fejtsd ki a nevezetes azonosságot: (x + 4)² = ?',
    options: [
      'x² + 8x + 16',
      'x² + 16',
      'x² + 4x + 16',
      '2x + 8'
    ],
    correctAnswer: 'x² + 8x + 16',
    explanation: 'x² + 2 · x · 4 + 4² = x² + 8x + 16.',
    hint: 'Ne feledd a 2 · 4x = 8x középső tagot!',
    breakdown: [{ label: 'Azonosság', value: 'x² + 8x + 16' }]
  },
  {
    id: 'q1-28',
    level: 1,
    question: 'Fejtsd ki a különbség négyzetét: (x - 3)² = ?',
    options: [
      'x² - 6x + 9',
      'x² - 9',
      'x² - 3x + 9',
      'x² + 6x + 9'
    ],
    correctAnswer: 'x² - 6x + 9',
    explanation: 'x² - 2 · x · 3 + 3² = x² - 6x + 9.',
    hint: 'A középső tag -6x, a konstans +9.',
    breakdown: [{ label: 'Azonosság', value: 'x² - 6x + 9' }]
  },
  {
    id: 'q1-29',
    level: 1,
    question: 'Végezd el a szorzást: (x + 5)(x - 5) = ?',
    options: [
      'x² - 25',
      'x² + 25',
      'x² - 10x - 25',
      'x² - 10'
    ],
    correctAnswer: 'x² - 25',
    explanation: '(a + b)(a - b) = a² - b² alapján: x² - 5² = x² - 25.',
    hint: 'Négyzetek különbsége: a középső tagok kiesnek.',
    breakdown: [{ label: 'Azonosság', value: 'x² - 25' }]
  },
  {
    id: 'q1-30',
    level: 1,
    question: 'Mennyi a 2(3x - 1) + 4 kifejezés egyszerűsített alakja?',
    options: [
      '6x + 2',
      '6x + 6',
      '6x - 2',
      '5x + 3'
    ],
    correctAnswer: '6x + 2',
    explanation: '2 · 3x - 2 · 1 + 4 = 6x - 2 + 4 = 6x + 2.',
    hint: '6x - 2 + 4 = 6x + 2.',
    breakdown: [{ label: 'Összevonás', value: '6x - 2 + 4 = 6x + 2' }]
  },

  // =========================================================================
  // --- 2. SZINT: KÖZEPES NEHÉZSÉGŰ SZÁMÍTÁSOK ÉS ÖSSZETETTEBB SZABÁLYOK (31-60)
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Mi a „Van olyan prímszám, amely páros” állítás pontos tagadása?',
    options: [
      'Egyetlen prímszám sem páros (Minden prímszám páratlan).',
      'Minden prímszám páros.',
      'Van olyan prímszám, amely páratlan.',
      'Nem minden prímszám páros.'
    ],
    correctAnswer: 'Egyetlen prímszám sem páros (Minden prímszám páratlan).',
    explanation: 'A „van olyan” egzisztenciális állítás tagadása: „egyetlen sem...” vagy „minden nem...”.',
    hint: 'A „létezik legalább egy” ellentéte a „nem létezik egyetlen sem”.',
    breakdown: [{ label: 'Tagadás', value: 'Egyetlen prímszám sem páros' }]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Egy szobában 13 ember tartózkodik. Igaz-e, hogy biztosan van köztük legalább kettő, akik ugyanabban a hónapban születtek?',
    options: [
      'Igen, a skatulya-elv miatt (12 hónap és 13 ember).',
      'Nem, mert lehet, hogy mindenki más hónapban született.',
      'Csak szökőévben igaz.',
      'Nem dönthető el.'
    ],
    correctAnswer: 'Igen, a skatulya-elv miatt (12 hónap és 13 ember).',
    explanation: '12 hónap van (12 skatulya). 13 ember elhelyezésekor legalább egy hónapba legalább 2 ember jut.',
    hint: '13 ember > 12 naptári hónap.',
    breakdown: [{ label: 'Skatulya-elv', value: '13 ember / 12 hónap ⟹ min. 2 ugyanabban' }]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Hány részhalmaza van egy 5 elemű halmaznak?',
    options: [
      '32',
      '25',
      '10',
      '64'
    ],
    correctAnswer: '32',
    explanation: '2⁵ = 32 részhalmaz.',
    hint: '2 · 2 · 2 · 2 · 2 = 32.',
    breakdown: [{ label: 'Képlet', value: '2⁵ = 32' }]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Egy osztályban |A| = 14 diák angolt, |B| = 18 diák németet tanul. 6-an mindkettőt tanulják. Hányan tanulnak legalább egy nyelvet (|A ∪ B|)?',
    options: [
      '26',
      '32',
      '20',
      '24'
    ],
    correctAnswer: '26',
    explanation: 'A szita-formula alapján: |A ∪ B| = |A| + |B| - |A ∩ B| = 14 + 18 - 6 = 26.',
    hint: '14 + 18 - 6 = 26.',
    breakdown: [{ label: 'Szita-formula', value: '14 + 18 - 6 = 26' }]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Legyen A = {1, 2, 3, 4, 5} és B = {4, 5, 6, 7}. Mi az A \\ B különbséghalmaz?',
    options: [
      '{1, 2, 3}',
      '{6, 7}',
      '{4, 5}',
      '{1, 2, 3, 6, 7}'
    ],
    correctAnswer: '{1, 2, 3}',
    explanation: 'Az A \\ B azon A-beli elemek halmaza, amelyek nincsenek benne B-ben: {1, 2, 3}.',
    hint: 'Hagyd el az A-ból a közös elemeket (4, 5)!',
    breakdown: [{ label: 'Különbség', value: '{1, 2, 3}' }]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Mennyi a 2/9 közönséges tört tizedestört alakja?',
    options: [
      '0.222... = 0.2̇',
      '0.29',
      '0.45',
      '0.18'
    ],
    correctAnswer: '0.222... = 0.2̇',
    explanation: '2 : 9 = 0.222... (végtelen szakaszos tizedestört).',
    hint: '2 : 9 = 0.222...',
    breakdown: [{ label: 'Tört alak', value: '2/9 = 0.2̇' }]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Írd fel a 0.375 tizedestörtet a legegyszerűbb közönséges tört alakban!',
    options: [
      '3/8',
      '375/100',
      '7/20',
      '3/5'
    ],
    correctAnswer: '3/8',
    explanation: '0.375 = 375/1000 = 3/8 (125-tel egyszerűsítve).',
    hint: '375 és 1000 legnagyobb közös osztója 125.',
    breakdown: [{ label: 'Egyszerűsítés', value: '375/1000 = 3/8' }]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Számítsd ki a művelet eredményét: (-3)² - 4 · (-2) = ?',
    options: [
      '17',
      '1',
      '-17',
      '10'
    ],
    correctAnswer: '17',
    explanation: '(-3)² = 9, és -4 · (-2) = +8. 9 + 8 = 17.',
    hint: '(-3)² = +9 és -4 · (-2) = +8.',
    breakdown: [
      { label: 'Négyzet', value: '(-3)² = 9' },
      { label: 'Szorzás', value: '-4 · (-2) = +8' },
      { label: 'Összeg', value: '9 + 8 = 17' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Végezd el az osztást: 3/4 : 2/5 = ?',
    options: [
      '15/8',
      '6/20',
      '8/15',
      '5/8'
    ],
    correctAnswer: '15/8',
    explanation: 'Törttel úgy osztunk, hogy a reciprokával szorzunk: 3/4 · 5/2 = 15/8.',
    hint: '3/4 · 5/2 = 15/8.',
    breakdown: [{ label: 'Reciprokkal szorzás', value: '3/4 · 5/2 = 15/8' }]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Végezd el az osztást hatványazonossággal: 5⁸ : 5⁵ = ?',
    options: [
      '5³ (= 125)',
      '5¹³',
      '1³',
      '5⁴⁰'
    ],
    correctAnswer: '5³ (= 125)',
    explanation: 'aⁿ : aᵐ = aⁿ⁻ᵐ ⟹ 5⁸⁻⁵ = 5³ = 125.',
    hint: 'A kitevőket kivonjuk: 8 - 5 = 3.',
    breakdown: [{ label: 'Kitevők', value: '8 - 5 = 3 ⟹ 5³ = 125' }]
  },
  {
    id: 'q2-11',
    level: 2,
    question: 'Végezd el a hatványozást: (2³)$^4$ = ?',
    options: [
      '2¹²',
      '2⁷',
      '2⁶⁴',
      '8⁴'
    ],
    correctAnswer: '2¹²',
    explanation: '(aⁿ)ᵐ = aⁿ·ᵐ alapján 3 · 4 = 12, így 2¹².',
    hint: 'A kitevőket megszorozzuk: 3 · 4 = 12.',
    breakdown: [{ label: 'Kitevők szorzata', value: '3 · 4 = 12 ⟹ 2¹²' }]
  },
  {
    id: 'q2-12',
    level: 2,
    question: 'Mennyi 2⁻³ pontos értéke tört alakban?',
    options: [
      '1/8',
      '-8',
      '-6',
      '1/6'
    ],
    correctAnswer: '1/8',
    explanation: 'a⁻ⁿ = 1 / aⁿ alapján 2⁻³ = 1 / 2³ = 1/8.',
    hint: 'A negatív kitevő a reciprokra emelést jelenti: 1 / 2³.',
    breakdown: [{ label: 'Képlet', value: '2⁻³ = 1 / 2³ = 1/8' }]
  },
  {
    id: 'q2-13',
    level: 2,
    question: 'Végezd el a szorzást normálalakban: (3 · 10⁴) · (2 · 10⁵) = ?',
    options: [
      '6 · 10⁹',
      '6 · 10²⁰',
      '5 · 10⁹',
      '6 · 10¹'
    ],
    correctAnswer: '6 · 10⁹',
    explanation: '(3 · 2) · 10⁴⁺⁵ = 6 · 10⁹.',
    hint: '3 · 2 = 6, a tízes hatványok kitevői: 4 + 5 = 9.',
    breakdown: [{ label: 'Szorzat', value: '6 · 10⁹' }]
  },
  {
    id: 'q2-14',
    level: 2,
    question: 'Mely valós x számokra értelmezhető a √(x - 7) kifejezés?',
    options: [
      'x ≥ 7',
      'x > 7',
      'x ≤ 7',
      'Minden valós számra'
    ],
    correctAnswer: 'x ≥ 7',
    explanation: 'A négyzetgyök alatti kifejezés nemnegatív kell legyen: x - 7 ≥ 0 ⟹ x ≥ 7.',
    hint: 'A gyök alatt nem állhat negatív szám: x - 7 ≥ 0.',
    breakdown: [{ label: 'Feltétel', value: 'x - 7 ≥ 0 ⟹ x ≥ 7' }]
  },
  {
    id: 'q2-15',
    level: 2,
    question: 'Mennyi a √((-8)²) kifejezés pontos értéke?',
    options: [
      '8',
      '-8',
      '±8',
      '64'
    ],
    correctAnswer: '8',
    explanation: '√(a²) = |a| alapján √((-8)²) = |-8| = 8 (mivel (-8)² = 64 és √64 = 8).',
    hint: '(-8)² = +64, és √64 = 8.',
    breakdown: [{ label: 'Abszolútérték', value: '√((-8)²) = |-8| = 8' }]
  },
  {
    id: 'q2-16',
    level: 2,
    question: 'Írd fel a √50 kifejezést részleges gyökvonással (tényező kiemelésével a gyökjel elé)!',
    options: [
      '5√2',
      '2√5',
      '25√2',
      '10√5'
    ],
    correctAnswer: '5√2',
    explanation: '√50 = √(25 · 2) = √25 · √2 = 5√2.',
    hint: '50 = 25 · 2, és √25 = 5.',
    breakdown: [{ label: 'Kiemelés', value: '√(25 · 2) = 5√2' }]
  },
  {
    id: 'q2-17',
    level: 2,
    question: 'Vidd be a tényezőt a gyökjel alá: 3√5 = ?',
    options: [
      '√45',
      '√15',
      '√75',
      '√30'
    ],
    correctAnswer: '√45',
    explanation: '3√5 = √(3² · 5) = √(9 · 5) = √45.',
    hint: 'A 3-at négyzetre emelve visszük be: 3² · 5 = 9 · 5 = 45.',
    breakdown: [{ label: 'Bevitel', value: '√(9 · 5) = √45' }]
  },
  {
    id: 'q2-18',
    level: 2,
    question: 'Végezd el a műveletet és egyszerűsíts: √50 + √18 = ?',
    options: [
      '8√2',
      '√68',
      '15√2',
      '2√34'
    ],
    correctAnswer: '8√2',
    explanation: '√50 = 5√2 és √18 = 3√2. Összeadva: 5√2 + 3√2 = 8√2.',
    hint: '5√2 + 3√2 = 8√2. Tilos a gyökök alatti számokat összeadni (√68 hiba)!',
    breakdown: [{ label: 'Részleges gyökök', value: '5√2 + 3√2 = 8√2' }]
  },
  {
    id: 'q2-19',
    level: 2,
    question: 'Mennyi az x² - 4x kifejezés helyettesítési értéke, ha x = -3?',
    options: [
      '21',
      '-3',
      '-21',
      '3'
    ],
    correctAnswer: '21',
    explanation: '(-3)² - 4 · (-3) = 9 - (-12) = 9 + 12 = 21.',
    hint: '(-3)² = 9 és -4 · (-3) = +12.',
    breakdown: [{ label: 'Számolás', value: '9 + 12 = 21' }]
  },
  {
    id: 'q2-20',
    level: 2,
    question: 'Mennyi a 3a - 2b kifejezés értéke, ha a = -2 és b = 4?',
    options: [
      '-14',
      '2',
      '-2',
      '14'
    ],
    correctAnswer: '-14',
    explanation: '3 · (-2) - 2 · 4 = -6 - 8 = -14.',
    hint: '-6 - 8 = -14.',
    breakdown: [{ label: 'Érték', value: '-6 - 8 = -14' }]
  },
  {
    id: 'q2-21',
    level: 2,
    question: 'Bontsd fel a zárójelet: -3(2x - 5) = ?',
    options: [
      '-6x + 15',
      '-6x - 15',
      '-6x - 5',
      '6x - 15'
    ],
    correctAnswer: '-6x + 15',
    explanation: '-3 · 2x + (-3) · (-5) = -6x + 15.',
    hint: '(-3) · (-5) = +15.',
    breakdown: [{ label: 'Zárójelbontás', value: '-6x + 15' }]
  },
  {
    id: 'q2-22',
    level: 2,
    question: 'Végezd el az egytagúak szorzását: (-2a²) · (5a³) = ?',
    options: [
      '-10a⁵',
      '-10a⁶',
      '10a⁵',
      '-7a⁵'
    ],
    correctAnswer: '-10a⁵',
    explanation: '(-2 · 5) · a²⁺³ = -10a⁵.',
    hint: 'A kitevőket összeadjuk: 2 + 3 = 5.',
    breakdown: [{ label: 'Szorzat', value: '-10a⁵' }]
  },
  {
    id: 'q2-23',
    level: 2,
    question: 'Emeld ki a legnagyobb közös tényezőt: 8x² - 12x = ?',
    options: [
      '4x(2x - 3)',
      '4(2x² - 3x)',
      '2x(4x - 6)',
      '8x(x - 1.5)'
    ],
    correctAnswer: '4x(2x - 3)',
    explanation: 'LNKO(8, 12) = 4, közös változó x: 4x(2x - 3).',
    hint: 'Számokból 4, betűkből x emelhető ki.',
    breakdown: [{ label: 'Közös tényező', value: '4x(2x - 3)' }]
  },
  {
    id: 'q2-24',
    level: 2,
    question: 'Emelj ki negatív számot a -4x - 12 kifejezésből!',
    options: [
      '-4(x + 3)',
      '-4(x - 3)',
      '4(-x - 3)',
      '-2(2x - 6)'
    ],
    correctAnswer: '-4(x + 3)',
    explanation: '-4x / (-4) = x és -12 / (-4) = +3, így -4(x + 3).',
    hint: 'A zárójelben plusz előjelek lesznek: -4(x + 3).',
    breakdown: [{ label: 'Kiemelés', value: '-4(x + 3)' }]
  },
  {
    id: 'q2-25',
    level: 2,
    question: 'Végezd el a szorzást: (2x - 1)(3x + 4) = ?',
    options: [
      '6x² + 5x - 4',
      '6x² - 5x - 4',
      '6x² + 11x - 4',
      '6x² - 4'
    ],
    correctAnswer: '6x² + 5x - 4',
    explanation: '6x² + 8x - 3x - 4 = 6x² + 5x - 4.',
    hint: '8x - 3x = 5x.',
    breakdown: [{ label: 'Kifejtés', value: '6x² + 8x - 3x - 4 = 6x² + 5x - 4' }]
  },
  {
    id: 'q2-26',
    level: 2,
    question: 'Fejtsd ki a nevezetes azonossággal: (2x + 3)² = ?',
    options: [
      '4x² + 12x + 9',
      '4x² + 6x + 9',
      '2x² + 12x + 9',
      '4x² + 9'
    ],
    correctAnswer: '4x² + 12x + 9',
    explanation: '(2x)² + 2 · (2x) · 3 + 3² = 4x² + 12x + 9.',
    hint: '(2x)² = 4x² és 2 · 2x · 3 = 12x.',
    breakdown: [{ label: 'Azonosság', value: '4x² + 12x + 9' }]
  },
  {
    id: 'q2-27',
    level: 2,
    question: 'Fejtsd ki: (3x - 2)² = ?',
    options: [
      '9x² - 12x + 4',
      '9x² - 6x + 4',
      '9x² - 4',
      '9x² - 12x - 4'
    ],
    correctAnswer: '9x² - 12x + 4',
    explanation: '(3x)² - 2 · (3x) · 2 + 2² = 9x² - 12x + 4.',
    hint: '-2 · 3x · 2 = -12x.',
    breakdown: [{ label: 'Azonosság', value: '9x² - 12x + 4' }]
  },
  {
    id: 'q2-28',
    level: 2,
    question: 'Végezd el a szorzást: (4x + 3)(4x - 3) = ?',
    options: [
      '16x² - 9',
      '16x² + 9',
      '16x² - 24x - 9',
      '8x² - 9'
    ],
    correctAnswer: '16x² - 9',
    explanation: '(4x)² - 3² = 16x² - 9.',
    hint: '(4x)² = 16x² és 3² = 9.',
    breakdown: [{ label: 'Négyzetek különbsége', value: '16x² - 9' }]
  },
  {
    id: 'q2-29',
    level: 2,
    question: 'Egyszerűsítsd a kifejezést: (x + 2)² - (x - 2)² = ?',
    options: [
      '8x',
      '0',
      '2x² + 8',
      '4x'
    ],
    correctAnswer: '8x',
    explanation: '(x² + 4x + 4) - (x² - 4x + 4) = x² + 4x + 4 - x² + 4x - 4 = 8x.',
    hint: '4x - (-4x) = 8x.',
    breakdown: [{ label: 'Kivonás', value: '4x + 4x = 8x' }]
  },
  {
    id: 'q2-30',
    level: 2,
    question: 'Egy téglalap oldalai 2x és 3x - 4. Mi a területe (T)?',
    options: [
      '6x² - 8x',
      '5x - 4',
      '6x² - 4',
      '10x - 8'
    ],
    correctAnswer: '6x² - 8x',
    explanation: 'T = a · b = 2x · (3x - 4) = 6x² - 8x.',
    hint: '2x · 3x = 6x², 2x · (-4) = -8x.',
    breakdown: [{ label: 'Terület', value: '6x² - 8x' }]
  },

  // =========================================================================
  // --- 3. SZINT: ÖSSZETETT FEJEZETI FELADATOK, TÖRTEK ÉS TRÜKKÖK (61-90) ---
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Egy dobozban 50 golyó van 4 különböző színben (piros, kék, zöld, sárga). Legalább hány golyót kell kihúznunk vakon, hogy biztosan legyen köztük 10 azonos színű?',
    options: [
      '37',
      '40',
      '36',
      '10'
    ],
    correctAnswer: '37',
    explanation: 'A legrosszabb esetben minden színből kihúzunk 9 darabot: 4 · 9 = 36 golyó. A következő (37.) golyóval biztosan meglesz a 10 azonos színű.',
    hint: '4 szín × 9 darab = 36. Ehhez kell még 1: 37.',
    breakdown: [{ label: 'Skatulya-elv', value: '4 · 9 + 1 = 37' }]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Írd fel a 0.1̇8̇ végtelen szakaszos tizedestörtet egyszerűsített közönséges tört alakban!',
    options: [
      '2/11',
      '18/100',
      '1/5',
      '9/50'
    ],
    correctAnswer: '2/11',
    explanation: '0.1̇8̇ = 18/99 = 2/11 (9-cel egyszerűsítve).',
    hint: 'A kétjegyű szakasz nevezője 99: 18/99 = 2/11.',
    breakdown: [{ label: 'Átírás', value: '18/99 = 2/11' }]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Számítsd ki a hatványkifejezés értékét: (6¹⁰ · 2⁻⁵) / 3¹⁰ = ?',
    options: [
      '32',
      '64',
      '1',
      '16'
    ],
    correctAnswer: '32',
    explanation: '6¹⁰ / 3¹⁰ = (6/3)¹⁰ = 2¹⁰. Így 2¹⁰ · 2⁻⁵ = 2¹⁰⁻⁵ = 2⁵ = 32.',
    hint: '(6/3)¹⁰ = 2¹⁰, és 2¹⁰ · 2⁻⁵ = 2⁵ = 32.',
    breakdown: [{ label: 'Azonosság', value: '2¹⁰ · 2⁻⁵ = 2⁵ = 32' }]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Egyszerűsítsd a hatványtörtet: (2⁷ · 9³) / 6⁶ = ?',
    options: [
      '2',
      '1',
      '3',
      '6'
    ],
    correctAnswer: '2',
    explanation: '9³ = (3²)³ = 3⁶, 6⁶ = (2 · 3)⁶ = 2⁶ · 3⁶. A tört: (2⁷ · 3⁶) / (2⁶ · 3⁶) = 2⁷ / 2⁶ = 2.',
    hint: 'Bontsd fel a 9-et 3²-re és a 6-ot 2·3-ra!',
    breakdown: [{ label: 'Prímtényezők', value: '(2⁷ · 3⁶) / (2⁶ · 3⁶) = 2' }]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Végezd el az osztást normálalakban: (6 · 10⁸) : (1.5 · 10³) = ?',
    options: [
      '4 · 10⁵',
      '4 · 10¹¹',
      '4.5 · 10⁵',
      '4 · 10²⁴'
    ],
    correctAnswer: '4 · 10⁵',
    explanation: '(6 / 1.5) · 10⁸⁻³ = 4 · 10⁵.',
    hint: '6 : 1.5 = 4, és 8 - 3 = 5.',
    breakdown: [{ label: 'Osztás', value: '4 · 10⁵' }]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Számítsd ki az összeget normálalakban: 3 · 10⁵ + 4 · 10⁴ = ?',
    options: [
      '3.4 · 10⁵',
      '7 · 10⁹',
      '7 · 10⁵',
      '3.4 · 10⁴'
    ],
    correctAnswer: '3.4 · 10⁵',
    explanation: '300 000 + 40 000 = 340 000 = 3.4 · 10⁵.',
    hint: '3 · 10⁵ + 0.4 · 10⁵ = 3.4 · 10⁵.',
    breakdown: [{ label: 'Összeg', value: '340 000 = 3.4 · 10⁵' }]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Egyszerűsítsd a gyökös kifejezést: √75 - √48 + √27 = ?',
    options: [
      '4√3',
      '6√3',
      '√54',
      '2√3'
    ],
    correctAnswer: '4√3',
    explanation: '√75 = 5√3, √48 = 4√3, √27 = 3√3. 5√3 - 4√3 + 3√3 = 4√3.',
    hint: '5√3 - 4√3 + 3√3 = 4√3.',
    breakdown: [{ label: 'Gyökök', value: '5√3 - 4√3 + 3√3 = 4√3' }]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Számítsd ki a szorzatot: (√5 + √2)(√5 - √2) = ?',
    options: [
      '3',
      '7',
      '√3',
      '21'
    ],
    correctAnswer: '3',
    explanation: '(√5)² - (√2)² = 5 - 2 = 3.',
    hint: '(a + b)(a - b) = a² - b² ⟹ 5 - 2 = 3.',
    breakdown: [{ label: 'Azonosság', value: '5 - 2 = 3' }]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Fejtsd ki a gyökös összeget: (√3 + √2)² = ?',
    options: [
      '5 + 2√6',
      '5',
      '5 + √6',
      '5 + 4√6'
    ],
    correctAnswer: '5 + 2√6',
    explanation: '(√3)² + 2 · √3 · √2 + (√2)² = 3 + 2√6 + 2 = 5 + 2√6.',
    hint: '(√3)² = 3, (√2)² = 2, kétszeres szorzat: 2√6.',
    breakdown: [{ label: 'Azonosság', value: '3 + 2√6 + 2 = 5 + 2√6' }]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Mennyi a √0.0064 négyzetgyök pontos értéke?',
    options: [
      '0.08',
      '0.8',
      '0.008',
      '0.0008'
    ],
    correctAnswer: '0.08',
    explanation: '0.08² = 0.0064, mivel a tizedesjegyek száma gyökvonáskor feleződik (4-ből 2 lesz).',
    hint: '√64 = 8, 4 tizedesjegyből 2 tizedesjegy lesz: 0.08.',
    breakdown: [{ label: 'Gyökvonás', value: '√0.0064 = 0.08' }]
  },
  {
    id: 'q3-11',
    level: 3,
    question: 'Melyik egész számhoz van legközelebb a √110 értéke a számegyenesen?',
    options: [
      '10 (mert 10² = 100 közelebb van, mint 11² = 121)',
      '11',
      '10.5',
      '9'
    ],
    correctAnswer: '10 (mert 10² = 100 közelebb van, mint 11² = 121)',
    explanation: '10² = 100 és 11² = 121. A 110 távolsága a 100-tól 10, a 121-től 11, így a 10-hez van közelebb (√110 ≈ 10.488).',
    hint: '|110 - 100| = 10, míg |121 - 110| = 11.',
    breakdown: [{ label: 'Távolságok', value: '10 vs 11 ⟹ 10-hez közelebbi' }]
  },
  {
    id: 'q3-12',
    level: 3,
    question: 'Végezd el a szorzást: (-2a²b) · (3ab³) · (-4a) = ?',
    options: [
      '24a⁴b⁴',
      '-24a⁴b⁴',
      '24a³b⁴',
      '-24a³b³'
    ],
    correctAnswer: '24a⁴b⁴',
    explanation: '(-2) · 3 · (-4) = +24. a² · a¹ · a¹ = a⁴. b¹ · b³ = b⁴. Eredmény: 24a⁴b⁴.',
    hint: 'Két negatív szorzata pozitív (+24), a kitevők: a⁴b⁴.',
    breakdown: [{ label: 'Szorzat', value: '24a⁴b⁴' }]
  },
  {
    id: 'q3-13',
    level: 3,
    question: 'Emeld ki a legnagyobb közös tényezőt: 18x⁴ - 24x³ + 12x² = ?',
    options: [
      '6x²(3x² - 4x + 2)',
      '6x(3x³ - 4x² + 2x)',
      '3x²(6x² - 8x + 4)',
      '12x²(1.5x² - 2x + 1)'
    ],
    correctAnswer: '6x²(3x² - 4x + 2)',
    explanation: 'LNKO(18, 24, 12) = 6, legkisebb kitevőjű közös változó x²: 6x²(3x² - 4x + 2).',
    hint: '6x² emelhető ki.',
    breakdown: [{ label: 'Kiemelés', value: '6x²(3x² - 4x + 2)' }]
  },
  {
    id: 'q3-14',
    level: 3,
    question: 'Egyszerűsítsd az algebrai törtet: (6x² - 9x) / (3x) = ? (ha x ≠ 0)',
    options: [
      '2x - 3',
      '2x² - 3',
      '2x - 9',
      '3x(2x - 3)'
    ],
    correctAnswer: '2x - 3',
    explanation: '3x(2x - 3) / (3x) = 2x - 3.',
    hint: 'Emelj ki 3x-et a számlálóból!',
    breakdown: [{ label: 'Egyszerűsítés', value: '3x(2x - 3) / 3x = 2x - 3' }]
  },
  {
    id: 'q3-15',
    level: 3,
    question: 'Hozd közös nevezőre és vond össze: x/2 + x/3 = ?',
    options: [
      '5x / 6',
      '2x / 5',
      'x / 6',
      '5x / 5'
    ],
    correctAnswer: '5x / 6',
    explanation: '3x/6 + 2x/6 = 5x/6.',
    hint: 'Közös nevező a 6: 3x/6 + 2x/6.',
    breakdown: [{ label: 'Összeg', value: '5x/6' }]
  },
  {
    id: 'q3-16',
    level: 3,
    question: 'Mennyi a |2x - 7| - x² kifejezés értéke, ha x = -3?',
    options: [
      '4',
      '-4',
      '22',
      '-22'
    ],
    correctAnswer: '4',
    explanation: '|2 · (-3) - 7| - (-3)² = |-6 - 7| - 9 = |-13| - 9 = 13 - 9 = 4.',
    hint: '|-13| = 13, és (-3)² = 9. 13 - 9 = 4.',
    breakdown: [{ label: 'Számolás', value: '13 - 9 = 4' }]
  },
  {
    id: 'q3-17',
    level: 3,
    question: 'Alakítsd szorzattá a négyzetek különbsége azonossággal: 4x² - 81 = ?',
    options: [
      '(2x + 9)(2x - 9)',
      '(4x + 9)(4x - 9)',
      '(2x - 9)²',
      '(2x + 81)(2x - 1)'
    ],
    correctAnswer: '(2x + 9)(2x - 9)',
    explanation: '(2x)² - 9² = (2x + 9)(2x - 9).',
    hint: '√(4x²) = 2x és √81 = 9.',
    breakdown: [{ label: 'Azonosság', value: '(2x + 9)(2x - 9)' }]
  },
  {
    id: 'q3-18',
    level: 3,
    question: 'Ismerd fel a teljes négyzetet: x² - 14x + 49 = ?',
    options: [
      '(x - 7)²',
      '(x + 7)²',
      '(x - 7)(x + 7)',
      '(x - 14)²'
    ],
    correctAnswer: '(x - 7)²',
    explanation: 'x² - 2 · x · 7 + 7² = (x - 7)².',
    hint: 'Középső tag -14x, konstans 7².',
    breakdown: [{ label: 'Teljes négyzet', value: '(x - 7)²' }]
  },
  {
    id: 'q3-19',
    level: 3,
    question: 'Alakítsd szorzattá: 9a² + 12ab + 4b² = ?',
    options: [
      '(3a + 2b)²',
      '(3a - 2b)²',
      '(9a + 4b)²',
      '(3a + 2b)(3a - 2b)'
    ],
    correctAnswer: '(3a + 2b)²',
    explanation: '(3a)² + 2 · (3a) · (2b) + (2b)² = (3a + 2b)².',
    hint: '√(9a²) = 3a, √(4b²) = 2b, 2 · 3a · 2b = 12ab.',
    breakdown: [{ label: 'Szorzat alak', value: '(3a + 2b)²' }]
  },
  {
    id: 'q3-20',
    level: 3,
    question: 'Egyszerűsítsd az algebrai törtet számláló-átalakítással: (x² - 16) / (x - 4) = ? (ha x ≠ 4)',
    options: [
      'x + 4',
      'x - 4',
      'x + 16',
      '4'
    ],
    correctAnswer: 'x + 4',
    explanation: '(x - 4)(x + 4) / (x - 4) = x + 4.',
    hint: 'Bontsd fel a számlálót (x - 4)(x + 4)-re!',
    breakdown: [{ label: 'Egyszerűsítés', value: 'x + 4' }]
  },
  {
    id: 'q3-21',
    level: 3,
    question: 'Számítsd ki fejben a négyzetek különbsége segítségével: 103 · 97 = ?',
    options: [
      '9991',
      '9999',
      '9981',
      '10009'
    ],
    correctAnswer: '9991',
    explanation: '(100 + 3)(100 - 3) = 100² - 3² = 10 000 - 9 = 9991.',
    hint: '100² - 3² = 10000 - 9 = 9991.',
    breakdown: [{ label: 'Trükk', value: '10 000 - 9 = 9991' }]
  },
  {
    id: 'q3-22',
    level: 3,
    question: 'Számítsd ki négyzetre emelés nélkül: 65² - 35² = ?',
    options: [
      '3000',
      '900',
      '3600',
      '1200'
    ],
    correctAnswer: '3000',
    explanation: '(65 + 35)(65 - 35) = 100 · 30 = 3000.',
    hint: '(65 + 35) · (65 - 35) = 100 · 30.',
    breakdown: [{ label: 'Azonosság', value: '100 · 30 = 3000' }]
  },
  {
    id: 'q3-23',
    level: 3,
    question: 'Végezd el a műveleteket és egyszerűsíts: (2x - 1)(x + 4) - (x + 2)² = ?',
    options: [
      'x² + 3x - 8',
      'x² + 7x - 8',
      'x² + 3x',
      '3x² + 11x'
    ],
    correctAnswer: 'x² + 3x - 8',
    explanation: '(2x² + 7x - 4) - (x² + 4x + 4) = x² + 3x - 8.',
    hint: '2x² + 7x - 4 - x² - 4x - 4 = x² + 3x - 8.',
    breakdown: [{ label: 'Összevonás', value: 'x² + 3x - 8' }]
  },
  {
    id: 'q3-24',
    level: 3,
    question: 'Alakítsd szorzattá előjelváltással: a(x - y) + b(y - x) = ?',
    options: [
      '(a - b)(x - y)',
      '(a + b)(x - y)',
      '(a - b)(x + y)',
      '(a + b)(y - x)'
    ],
    correctAnswer: '(a - b)(x - y)',
    explanation: 'Mivel (y - x) = -(x - y), ezért a(x - y) - b(x - y) = (a - b)(x - y).',
    hint: '(y - x) = -(x - y).',
    breakdown: [{ label: 'Előjelváltás', value: '(a - b)(x - y)' }]
  },
  {
    id: 'q3-25',
    level: 3,
    question: 'Egy négyzet oldala x. Ha megnöveljük 4 cm-rel, mennyi a terület növekménye?',
    options: [
      '8x + 16',
      '16',
      '4x + 16',
      'x² + 16'
    ],
    correctAnswer: '8x + 16',
    explanation: '(x + 4)² - x² = x² + 8x + 16 - x² = 8x + 16.',
    hint: '(x + 4)² - x² = 8x + 16.',
    breakdown: [{ label: 'Területnövekmény', value: '8x + 16' }]
  },
  {
    id: 'q3-26',
    level: 3,
    question: 'Számítsd ki az összeg egyszerűsített alakját: (x² - 9)/(x + 3) + (x² + 6x + 9)/(x + 3) = ? (ha x ≠ -3)',
    options: [
      '2x',
      '2x + 6',
      '2x - 6',
      'x²'
    ],
    correctAnswer: '2x',
    explanation: '(x - 3) + (x + 3) = 2x.',
    hint: '(x² - 9)/(x + 3) = x - 3, és (x + 3)²/(x + 3) = x + 3. (x - 3) + (x + 3) = 2x.',
    breakdown: [{ label: 'Összeg', value: '(x - 3) + (x + 3) = 2x' }]
  },
  {
    id: 'q3-27',
    level: 3,
    question: 'Számítsd ki a kifejezés pontos értékét: (√50 - √18) / √2 = ?',
    options: [
      '2',
      '√16',
      '4',
      '√32'
    ],
    correctAnswer: '2',
    explanation: '(5√2 - 3√2) / √2 = 2√2 / √2 = 2.',
    hint: '5√2 - 3√2 = 2√2. Ezt osztva √2-vel 2-t kapunk.',
    breakdown: [{ label: 'Osztás', value: '2√2 / √2 = 2' }]
  },
  {
    id: 'q3-28',
    level: 3,
    question: 'Hány olyan 4-jegyű szám van, amelynek minden számjegye páratlan (1, 3, 5, 7, 9)?',
    options: [
      '625 (5⁴)',
      '120 (5 · 4 · 3 · 2)',
      '1000',
      '500'
    ],
    correctAnswer: '625 (5⁴)',
    explanation: 'Mind a 4 pozícióra 5 féle páratlan számjegy választható: 5 · 5 · 5 · 5 = 5⁴ = 625.',
    hint: '5 · 5 · 5 · 5 = 625.',
    breakdown: [{ label: 'Kombinatorika', value: '5⁴ = 625' }]
  },
  {
    id: 'q3-29',
    level: 3,
    question: 'Mennyi a (3x - 2y)² - (3x + 2y)² kifejezés egyszerűsített értéke?',
    options: [
      '-24xy',
      '0',
      '24xy',
      '-8y²'
    ],
    correctAnswer: '-24xy',
    explanation: '(9x² - 12xy + 4y²) - (9x² + 12xy + 4y²) = -12xy - 12xy = -24xy.',
    hint: '-12xy - 12xy = -24xy.',
    breakdown: [{ label: 'Kivonás', value: '-24xy' }]
  },
  {
    id: 'q3-30',
    level: 3,
    question: 'Melyik összefüggés érvényes minden a, b valós számra?',
    options: [
      '(a - b)² = (b - a)²',
      '(a - b)² = -(b - a)²',
      '(a + b)² = a² + b²',
      '√(a² + b²) = a + b'
    ],
    correctAnswer: '(a - b)² = (b - a)²',
    explanation: 'Mivel (b - a) = -(a - b), és bármely szám négyzete megegyezik az ellentettjének négyzetével: [-(a - b)]² = (a - b)².',
    hint: '(-x)² = x² miatt (b - a)² = (a - b)².',
    breakdown: [{ label: 'Azonosság', value: '(a - b)² = (b - a)²' }]
  }
];

export const ChapterSummaryQuiz: React.FC<ChapterSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="12. I. Fejezet Összefoglaló Nagyteszt – Kvíz"
      subtitle="90 feladat 3 nehézségi szinten (30-30-30): Logika, Halmazok, Racionális számok, Hatványozás, Gyökvonás és Algebrai Azonosságok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-chapter-summary-quiz"
      pdfFilename="8_osztaly_szamok_es_betuk_osszefoglalo_nagyteszt_kviz.pdf"
      badgeColor="amber"
      matcherComponent={<ChapterSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ChapterSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default ChapterSummaryQuiz;
