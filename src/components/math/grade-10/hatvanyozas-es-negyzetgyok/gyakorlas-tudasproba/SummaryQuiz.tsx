import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SummaryMatcher } from './SummaryMatcher';
import { SummarySorter } from './SummarySorter';
import {
  ChapterIdentitiesMapSvg,
  FourClassicTrapsSvg,
  ScientificSummarySvg,
  RadicalTransformationsPipelineSvg
} from './SummaryFigures';

interface SummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Hatványozás és gyökvonás szintézise',
    description: 'A hatványozás és a gyökvonás szabályrendszere egymást kiegészíti. a⁻ⁿ = 1/aⁿ (a ≠ 0), a⁰ = 1. A gyökvonásnál a ≥ 0, √(ab) = √a√b és √(a²) = |a|.',
    note: 'Fontos: a 0⁰ és 0⁻ⁿ matematikailag nem értelmezett, akárcsak negatív szám négyzetgyöke a valós számok körében!',
    color: 'from-rose-500 to-pink-600',
    figure: <ChapterIdentitiesMapSvg size={180} />
  },
  {
    title: 'A 4 klasszikus vizsgacsapda',
    description: '1. (-3)² = 9 ≠ -3² = -9 (zárójel). 2. 2⁻³ = 1/8 ≠ -8 (negatív kitevő = reciprok). 3. √(a+b) ≠ √a + √b (nem vonható tagonként). 4. √(a²) = |a| (mindig nemnegatív).',
    note: 'Ezek a leggyakoribb dolgozathibák: tartsuk mindig észben a zárójeleket és előjeleket!',
    color: 'from-amber-500 to-orange-600',
    figure: <FourClassicTrapsSvg size={180} />
  },
  {
    title: 'Normálalak és SI nagyságrendek',
    description: 'x = a · 10ᵏ, ahol 1 ≤ |a| < 10 (mantissza) és k ∈ ℤ. Szorzásnál a mantisszák szorzódnak, kitevők összeadódnak; osztásnál kivonódnak.',
    note: 'Giga: 10⁹, Mega: 10⁶, Kilo: 10³. Kicsik: milli: 10⁻³, mikro: 10⁻⁶, nano: 10⁻⁹.',
    color: 'from-emerald-500 to-teal-600',
    figure: <ScientificSummarySvg size={180} />
  },
  {
    title: 'Gyökös átalakítások eszköztára',
    description: 'Kiemelés: √72 = 6√2. Bevitel: 3√5 = √45 (nagyságrendi összehasonlításhoz). Gyöktelenítés: 6/√3 = 2√3 és kéttagú nevező esetén bővítés a konjugálttal.',
    note: 'Konjugált: c / (√a + √b) = c(√a - √b) / (a - b). Gyökös egyenletnél az ellenőrzés kötelező!',
    color: 'from-indigo-500 to-purple-600',
    figure: <RadicalTransformationsPipelineSvg size={180} />
  }
];

const levels: QuizLevelConfig[] = [
  // 1. SZINT: KÖNNYŰ (30 KÉRDÉS)
  {
    level: 1,
    title: '1. Könnyű szint: Alapfogalmak, előjelek és alaptulajdonságok',
    subtitle: 'Egész kitevőjű hatványok, alapvető előjelszabályok, normálalak alapjai és nevezetes négyzetgyökök.',
    range: '1–30. feladat',
    focus: 'Alapfogalmak és alaptulajdonságok',
    color: 'rose',
    questions: [
      {
        id: 'sum-q1-1',
        question: 'Mennyi (-2)³ pontos értéke?',
        options: ['-8', '8', '-6', '6'],
        correctAnswer: 0,
        explanation: 'Páratlan kitevő esetén a negatív előjel megmarad: (-2) · (-2) · (-2) = -8.'
      },
      {
        id: 'sum-q1-2',
        question: 'Mennyi (-2)⁴ pontos értéke?',
        options: ['16', '-16', '8', '-8'],
        correctAnswer: 0,
        explanation: 'Páros számú negatív tényező szorzata pozitív: (-2)⁴ = +16.'
      },
      {
        id: 'sum-q1-3',
        question: 'Mennyi -2⁴ értéke zárójel nélkül?',
        options: ['-16', '16', '-8', '8'],
        correctAnswer: 0,
        explanation: 'Zárójel hiányában a kitevő csak a 2-esre vonatkozik: -(2⁴) = -16.'
      },
      {
        id: 'sum-q1-4',
        question: 'Mennyi 5⁰ értéke?',
        options: ['1', '0', '5', 'Nem értelmezett'],
        correctAnswer: 0,
        explanation: 'A permanencia-elv alapján bármely nem nulla szám 0. hatványa 1: a⁰ = 1.'
      },
      {
        id: 'sum-q1-5',
        question: 'Mennyi a 0⁰ kifejezés értéke a matematikában?',
        options: ['Matematikailag nem értelmezett (határozatlan alak)', '1', '0', 'Végtelen'],
        correctAnswer: 0,
        explanation: 'A 0⁰ kifejezésnek nincs egyértelmű matematikai értéke, nem értelmezett.'
      },
      {
        id: 'sum-q1-6',
        question: 'Mennyi 2⁻³ értéke tört alakban?',
        options: ['1/8', '-8', '-6', '1/6'],
        correctAnswer: 0,
        explanation: 'A negatív kitevő definíciója: a⁻ⁿ = 1 / aⁿ. Így 2⁻³ = 1 / 2³ = 1/8.'
      },
      {
        id: 'sum-q1-7',
        question: 'Mennyi 3⁻² értéke tört alakban?',
        options: ['1/9', '-9', '-6', '1/6'],
        correctAnswer: 0,
        explanation: '3⁻² = 1 / 3² = 1/9.'
      },
      {
        id: 'sum-q1-8',
        question: 'Mennyi 10⁻⁴ értéke tizedestört alakban?',
        options: ['0,0001', '0,001', '-40', '-0,0001'],
        correctAnswer: 0,
        explanation: '10⁻⁴ = 1 / 10000 = 0,0001 (a tizedesvessző után a 4. helyen áll az 1-es).'
      },
      {
        id: 'sum-q1-9',
        question: 'Melyik valós szám felel meg a 4,5 · 10³ normálalaknak?',
        options: ['4500', '450', '45000', '0,0045'],
        correctAnswer: 0,
        explanation: 'A tizedesvesszőt 3 hellyel jobbra léptetjük: 4,5 · 1000 = 4500.'
      },
      {
        id: 'sum-q1-10',
        question: 'Melyik valós szám felel meg a 3 · 10⁻² normálalaknak?',
        options: ['0,03', '0,3', '0,003', '-300'],
        correctAnswer: 0,
        explanation: '3 · 0,01 = 0,03.'
      },
      {
        id: 'sum-q1-11',
        question: 'Szabályos normálalak-e a 42 · 10³ felírás?',
        options: ['Nem szabályos, mert a mantisszának 1 és 10 közé kell esnie (helyesen: 4,2 · 10⁴)', 'Igen, teljesen szabályos', 'Csak negatív kitevővel lehetne az', 'Csak ha a mantissza prím'],
        correctAnswer: 0,
        explanation: 'A normálalak definíciója szerint 1 ≤ |a| < 10, a 42 nem felel meg ennek. Helyesen: 4,2 · 10⁴.'
      },
      {
        id: 'sum-q1-12',
        question: 'Hány gramm 1 kilogramm (kg) 10-es hatványalakban kifejezve?',
        options: ['10³ g', '10² g', '10⁶ g', '10⁻³ g'],
        correctAnswer: 0,
        explanation: 'A kilo- (k) prefixum 10³-t (1000-et) jelent, tehát 1 kg = 10³ g.'
      },
      {
        id: 'sum-q1-13',
        question: 'Hány gramm 1 milligramm (mg) 10-es hatványalakban?',
        options: ['10⁻³ g', '10⁻⁶ g', '10³ g', '0,01 g'],
        correctAnswer: 0,
        explanation: 'A milli- (m) előtag 10⁻³-at (ezredrészt) jelent, így 1 mg = 10⁻³ g.'
      },
      {
        id: 'sum-q1-14',
        question: 'Mennyi a 2³ · 2⁴ szorzat értéke hatványalakban?',
        options: ['2⁷', '2¹²', '4⁷', '4¹²'],
        correctAnswer: 0,
        explanation: 'Azonos alapú hatványok szorzásakor az alapot a kitevők összegére emeljük: 2³⁺⁴ = 2⁷.'
      },
      {
        id: 'sum-q1-15',
        question: 'Mennyi a 3⁵ : 3² hányados értéke?',
        options: ['3³ = 27', '3⁷', '1³ = 1', '3²·⁵'],
        correctAnswer: 0,
        explanation: 'Azonos alapú hatványok osztásakor a kitevőket kivonjuk: 3⁵⁻² = 3³ = 27.'
      },
      {
        id: 'sum-q1-16',
        question: 'Mennyi a (2³)² hatvány hatványa?',
        options: ['2⁶ = 64', '2⁵ = 32', '2⁹ = 512', '4⁶'],
        correctAnswer: 0,
        explanation: 'Hatvány hatványozásakor a kitevők szorzódnak: 3 · 2 = 6, így 2⁶ = 64.'
      },
      {
        id: 'sum-q1-17',
        question: 'Mennyi √64 pontos értéke a valós számok körében?',
        options: ['8', '±8', '-8', '32'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök definíciója szerint az eredmény mindig nemnegatív szám, tehát √64 = +8 (és nem ±8).'
      },
      {
        id: 'sum-q1-18',
        question: 'Mennyi √144 pontos értéke?',
        options: ['12', '14', '72', '±12'],
        correctAnswer: 0,
        explanation: '12² = 144 és 12 ≥ 0, így √144 = 12.'
      },
      {
        id: 'sum-q1-19',
        question: 'Mennyi √0 értéke?',
        options: ['0', '1', 'Nem értelmezett', '±0'],
        correctAnswer: 0,
        explanation: '0² = 0 és 0 ≥ 0, ezért √0 = 0.'
      },
      {
        id: 'sum-q1-20',
        question: 'Értelmezett-e a √(-25) kifejezés a valós számok halmazán?',
        options: ['Nem értelmezett, mert nincs olyan valós szám, amelynek a négyzete negatív', 'Igen, -5', 'Igen, 5', 'Igen, ±5'],
        correctAnswer: 0,
        explanation: 'Valós számok körében kizárólag nemnegatív számból vonhatunk négyzetgyököt.'
      },
      {
        id: 'sum-q1-21',
        question: 'Lehet-e egy valós szám négyzetgyökének az értéke negatív szám?',
        options: ['Nem, a definíció szerint a négyzetgyök mindig nemnegatív (√a ≥ 0)', 'Igen, ha a radikandus páratlan', 'Igen, ha kivonásból keletkezett', 'Mindig két értéke van'],
        correctAnswer: 0,
        explanation: 'A négyzetgyökfüggvény értékkészlete a nemnegatív valós számok halmaza: √a ≥ 0.'
      },
      {
        id: 'sum-q1-22',
        question: 'Mennyi (√7)² értéke?',
        options: ['7', '49', '14', '√49'],
        correctAnswer: 0,
        explanation: 'A definíció szerint nemnegatív számra (√a)² = a, így (√7)² = 7.'
      },
      {
        id: 'sum-q1-23',
        question: 'Mennyi a √4 · √25 szorzat értéke?',
        options: ['10', '100', '20', '50'],
        correctAnswer: 0,
        explanation: '√4 = 2, √25 = 5, szorzatuk 2 · 5 = 10 (vagy √(4 · 25) = √100 = 10).'
      },
      {
        id: 'sum-q1-24',
        question: 'Mennyi a √100 / √4 hányados értéke?',
        options: ['5', '25', '10', '2'],
        correctAnswer: 0,
        explanation: '√100 / √4 = 10 / 2 = 5 (vagy √(100 / 4) = √25 = 5).'
      },
      {
        id: 'sum-q1-25',
        question: 'Hogyan alakítható át a √8 a legnagyobb tényező kiemelésével?',
        options: ['2√2', '4√2', '2√4', '8√1'],
        correctAnswer: 0,
        explanation: '√8 = √(4 · 2) = 2√2.'
      },
      {
        id: 'sum-q1-26',
        question: 'Hogyan alakítható át a √12 tényező kiemelésével?',
        options: ['2√3', '3√2', '4√3', '6√2'],
        correctAnswer: 0,
        explanation: '√12 = √(4 · 3) = 2√3.'
      },
      {
        id: 'sum-q1-27',
        question: 'Hogyan alakítható át a √18 tényező kiemelésével?',
        options: ['3√2', '2√3', '9√2', '6√3'],
        correctAnswer: 0,
        explanation: '√18 = √(9 · 2) = 3√2.'
      },
      {
        id: 'sum-q1-28',
        question: 'Mennyi a 2√2 + 5√2 összeg értéke?',
        options: ['7√2', '7√4', '10√2', '7'],
        correctAnswer: 0,
        explanation: '(2 + 5)√2 = 7√2.'
      },
      {
        id: 'sum-q1-29',
        question: 'Mi a feltétele annak, hogy a √(x - 4) kifejezés valós szám legyen?',
        options: ['x ≥ 4', 'x > 4', 'x ≤ 4', 'x bármilyen szám lehet'],
        correctAnswer: 0,
        explanation: 'x - 4 ≥ 0 ⇒ x ≥ 4.'
      },
      {
        id: 'sum-q1-30',
        question: 'Mi a feltétele annak, hogy a √(7 - x) kifejezés valós szám legyen?',
        options: ['x ≤ 7', 'x ≥ 7', 'x < 7', 'x > 7'],
        correctAnswer: 0,
        explanation: '7 - x ≥ 0 ⇒ 7 ≥ x, vagyis x ≤ 7.'
      }
    ]
  },

  // 2. SZINT: KÖZEPES (30 KÉRDÉS)
  {
    level: 2,
    title: '2. Közepes szint: Tört kitevők, normálalak műveletei, gyökös azonosságok és kiemelés',
    subtitle: 'Törtek negatív hatványai, műveletek normálalakkal, √(a²) = |a|, szorzat/hányados gyöke és egytagú gyöktelenítés.',
    range: '1–30. feladat',
    focus: 'Azonosságok alkalmazása és műveletek',
    color: 'rose',
    questions: [
      {
        id: 'sum-q2-1',
        question: 'Mennyi a (2/3)⁻² hatvány értéke közönséges törtként?',
        options: ['9/4', '4/9', '-4/9', '-9/4'],
        correctAnswer: 0,
        explanation: '(2/3)⁻² = (3/2)² = 9/4.'
      },
      {
        id: 'sum-q2-2',
        question: 'Mennyi a (-1/2)⁻³ hatvány értéke?',
        options: ['-8', '8', '-1/8', '1/8'],
        correctAnswer: 0,
        explanation: '(-1/2)⁻³ = (-2)³ = -8.'
      },
      {
        id: 'sum-q2-3',
        question: 'Mennyi a (-1/3)⁻² hatvány értéke?',
        options: ['9', '-9', '1/9', '-1/9'],
        correctAnswer: 0,
        explanation: '(-1/3)⁻² = (-3)² = +9.'
      },
      {
        id: 'sum-q2-4',
        question: 'Mennyi a (2³ · 2⁻⁵ · 2⁴) szorzat értéke?',
        options: ['4', '2', '8', '1'],
        correctAnswer: 0,
        explanation: 'A kitevőket összeadjuk: 3 + (-5) + 4 = 2, így 2² = 4.'
      },
      {
        id: 'sum-q2-5',
        question: 'Mennyi a (3⁻⁴ · 3⁶) / 3⁻² kifejezés értéke?',
        options: ['81', '27', '9', '1'],
        correctAnswer: 0,
        explanation: 'Számláló: 3⁻⁴⁺⁶ = 3². Osztva 3⁻²-nel: 3²⁻⁽⁻²⁾ = 3⁴ = 81.'
      },
      {
        id: 'sum-q2-6',
        question: 'Mennyi a (2 · 10⁴) · (3 · 10⁵) szorzat értéke szabályos normálalakban?',
        options: ['6 · 10⁹', '6 · 10²⁰', '5 · 10⁹', '6 · 10¹'],
        correctAnswer: 0,
        explanation: '(2 · 3) · (10⁴⁺⁵) = 6 · 10⁹.'
      },
      {
        id: 'sum-q2-7',
        question: 'Mennyi a (4 · 10⁶) · (5 · 10³) szorzat értéke szabályos normálalakban?',
        options: ['2 · 10¹⁰', '20 · 10⁹', '2 · 10⁹', '20 · 10¹⁸'],
        correctAnswer: 0,
        explanation: '4 · 5 = 20, és 10⁶ · 10³ = 10⁹. Mivel a 20 ≥ 10, újraigazítjuk: 20 · 10⁹ = 2 · 10¹⁰.'
      },
      {
        id: 'sum-q2-8',
        question: 'Mennyi a (8 · 10⁷) : (2 · 10³) hányados értéke normálalakban?',
        options: ['4 · 10⁴', '4 · 10¹⁰', '6 · 10⁴', '4 · 10⁻⁴'],
        correctAnswer: 0,
        explanation: '(8 : 2) · 10⁷⁻³ = 4 · 10⁴.'
      },
      {
        id: 'sum-q2-9',
        question: 'Mennyi a (3 · 10⁴) + (2 · 10⁴) összeg értéke?',
        options: ['5 · 10⁴', '5 · 10⁸', '6 · 10⁴', '5 · 10¹⁶'],
        correctAnswer: 0,
        explanation: 'Mivel a 10-es kitevő azonos, a mantisszákat összeadjuk: (3 + 2) · 10⁴ = 5 · 10⁴.'
      },
      {
        id: 'sum-q2-10',
        question: 'Mennyi a (4 · 10⁵) + (3 · 10⁴) összeg értéke szabályos normálalakban?',
        options: ['4,3 · 10⁵', '7 · 10⁵', '7 · 10⁹', '4,3 · 10⁴'],
        correctAnswer: 0,
        explanation: 'Közös kitevőre hozás: 3 · 10⁴ = 0,3 · 10⁵. Összeadva: 4 · 10⁵ + 0,3 · 10⁵ = 4,3 · 10⁵.'
      },
      {
        id: 'sum-q2-11',
        question: 'Mennyi √((-8)²) értéke?',
        options: ['8', '-8', '±8', '-64'],
        correctAnswer: 0,
        explanation: '√(a²) = |a|, így √((-8)²) = |-8| = 8.'
      },
      {
        id: 'sum-q2-12',
        question: 'Mennyi √((-15)²) értéke?',
        options: ['15', '-15', '225', '-225'],
        correctAnswer: 0,
        explanation: '√((-15)²) = |-15| = 15.'
      },
      {
        id: 'sum-q2-13',
        question: 'Ha x egy negatív valós szám (x < 0), mennyi √(x²) értéke?',
        options: ['-x', 'x', 'x²', '-x²'],
        correctAnswer: 0,
        explanation: '√(x²) = |x|. Ha x < 0, akkor |x| = -x (ami pozitív értéket ad).'
      },
      {
        id: 'sum-q2-14',
        question: 'Mennyi √(9 + 16) pontos értéke?',
        options: ['5', '7', '√7', '25'],
        correctAnswer: 0,
        explanation: '√(9 + 16) = √25 = 5.'
      },
      {
        id: 'sum-q2-15',
        question: 'Igaz-e, hogy √(9 + 16) = √9 + √16?',
        options: ['Nem igaz, mert √25 = 5, miközben 3 + 4 = 7 (5 ≠ 7)', 'Igaz, mindkettő 7', 'Csak egész számokra igaz', 'Mindig igaz'],
        correctAnswer: 0,
        explanation: 'A gyökvonás nem tagolható összeadásra: √(a + b) ≠ √a + √b.'
      },
      {
        id: 'sum-q2-16',
        question: 'Mennyi a √2 · √32 szorzat értéke?',
        options: ['8', '64', '4', '16'],
        correctAnswer: 0,
        explanation: '√2 · √32 = √(2 · 32) = √64 = 8.'
      },
      {
        id: 'sum-q2-17',
        question: 'Mennyi a √3 · √75 szorzat értéke?',
        options: ['15', '225', '5', '45'],
        correctAnswer: 0,
        explanation: '√3 · √75 = √(3 · 75) = √225 = 15.'
      },
      {
        id: 'sum-q2-18',
        question: 'Mennyi a √50 / √2 hányados értéke?',
        options: ['5', '25', '10', '√25 / 2'],
        correctAnswer: 0,
        explanation: '√50 / √2 = √(50 / 2) = √25 = 5.'
      },
      {
        id: 'sum-q2-19',
        question: 'Hogyan alakítható át a √72 a lehető legnagyobb tényező kiemelésével?',
        options: ['6√2', '2√18', '3√8', '12√2'],
        correctAnswer: 0,
        explanation: '72 = 36 · 2, így √72 = 6√2.'
      },
      {
        id: 'sum-q2-20',
        question: 'Hogyan alakítható át a √48 a legnagyobb tényező kiemelésével?',
        options: ['4√3', '2√12', '16√3', '6√2'],
        correctAnswer: 0,
        explanation: '48 = 16 · 3, így √48 = 4√3.'
      },
      {
        id: 'sum-q2-21',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 3√5 = ?',
        options: ['√45', '√15', '√75', '√225'],
        correctAnswer: 0,
        explanation: '3√5 = √(3² · 5) = √(9 · 5) = √45.'
      },
      {
        id: 'sum-q2-22',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 5√2 = ?',
        options: ['√50', '√20', '√100', '√25'],
        correctAnswer: 0,
        explanation: '5√2 = √(5² · 2) = √(25 · 2) = √50.'
      },
      {
        id: 'sum-q2-23',
        question: 'Melyik szám a nagyobb: 3√5 vagy 5√2?',
        options: ['5√2 a nagyobb (mert √50 > √45)', '3√5 a nagyobb', 'Egyenlőek', 'Nem összehasonlíthatóak'],
        correctAnswer: 0,
        explanation: '3√5 = √45, míg 5√2 = √50. Mivel 50 > 45, ezért 5√2 > 3√5.'
      },
      {
        id: 'sum-q2-24',
        question: 'Mennyi a 6 / √3 tört egyszerűsített értéke a nevező gyöktelenítése után?',
        options: ['2√3', '3√3', '6√3', '√3 / 2'],
        correctAnswer: 0,
        explanation: '(6 · √3) / 3 = 2√3.'
      },
      {
        id: 'sum-q2-25',
        question: 'Mennyi a 10 / √5 tört értéke gyöktelenítés után?',
        options: ['2√5', '5√5', '√5 / 2', '10√5'],
        correctAnswer: 0,
        explanation: '(10 · √5) / 5 = 2√5.'
      },
      {
        id: 'sum-q2-26',
        question: 'Fejtsük ki a (√5 + √2)² kifejezést!',
        options: ['7 + 2√10', '7', '7 + √10', '10 + 2√7'],
        correctAnswer: 0,
        explanation: '(√5)² + 2(√5 · √2) + (√2)² = 5 + 2√10 + 2 = 7 + 2√10.'
      },
      {
        id: 'sum-q2-27',
        question: 'Fejtsük ki a (√5 - 1)² kifejezést!',
        options: ['6 - 2√5', '4 - 2√5', '4', '6 + 2√5'],
        correctAnswer: 0,
        explanation: '(√5)² - 2(√5 · 1) + 1² = 5 - 2√5 + 1 = 6 - 2√5.'
      },
      {
        id: 'sum-q2-28',
        question: 'Mennyi a (√7 + √3)(√7 - √3) szorzat pontos értéke?',
        options: ['4', '10', '√4 = 2', '√21'],
        correctAnswer: 0,
        explanation: '(√7)² - (√3)² = 7 - 3 = 4.'
      },
      {
        id: 'sum-q2-29',
        question: 'Mi a kikötése az 1 / √(x - 6) kifejezésnek?',
        options: ['x > 6', 'x ≥ 6', 'x < 6', 'x ≤ 6'],
        correctAnswer: 0,
        explanation: 'A nevezőben álló gyök miatt x - 6 > 0 (szigorúan!) ⇒ x > 6.'
      },
      {
        id: 'sum-q2-30',
        question: 'Oldjuk meg a valós számok körében: √(2x - 1) = 5',
        options: ['x = 13', 'x = 12', 'x = 26', 'x = 3'],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: 2x - 1 = 25 ⇒ 2x = 26 ⇒ x = 13. Ellenőrzés: √(26 - 1) = √25 = 5 (jó).'
      }
    ]
  },

  // 3. SZINT: NEHÉZ (30 KÉRDÉS)
  {
    level: 3,
    title: '3. Nehéz szint: Összetett algebrai törtek, konjugáltak, emeletes gyökök és gyökös egyenletek',
    subtitle: 'Betűs kifejezések egyszerűsítése, kéttagú gyöktelenítés, emeletes gyökök felbontása és vizsgafeladatok.',
    range: '1–30. feladat',
    focus: 'Összetett feladatok és kihívások',
    color: 'rose',
    questions: [
      {
        id: 'sum-q3-1',
        question: 'Egyszerűsítsük az (a³ · b⁻²)⁴ · (a⁻² · b)³ kifejezést!',
        options: ['a⁶ / b⁵', 'a¹² / b⁸', 'a⁶ · b', 'a⁻⁶ · b⁵'],
        correctAnswer: 0,
        explanation: '(a¹² · b⁻⁸) · (a⁻⁶ · b³) = a¹²⁻⁶ · b⁻⁸⁺³ = a⁶ · b⁻⁵ = a⁶ / b⁵.'
      },
      {
        id: 'sum-q3-2',
        question: 'Egyszerűsítsük a (2x²y⁻³)² / (4x⁻¹y⁻⁴) algebrai törtet!',
        options: ['x⁵ / y²', 'x³ / y²', 'x⁵y²', '4x⁵ / y²'],
        correctAnswer: 0,
        explanation: 'Számláló: 4x⁴y⁻⁶. Osztva 4x⁻¹y⁻⁴-gyel: (4/4) · x⁴⁻⁽⁻¹⁾ · y⁻⁶⁻⁽⁻⁴⁾ = x⁵ · y⁻² = x⁵ / y².'
      },
      {
        id: 'sum-q3-3',
        question: 'Mennyi a (16 · 10⁻⁴ · 25 · 10⁶) / (2 · 10³) kifejezés pontos értéke normálalakban?',
        options: ['2 · 10²', '200 · 10²', '2 · 10³', '2 · 10¹'],
        correctAnswer: 0,
        explanation: '16 · 25 = 400. 10⁻⁴ · 10⁶ = 10². Számláló: 400 · 10² = 40000 = 4 · 10⁴. Osztva 2 · 10³-nal: 2 · 10¹ = 200 = 2 · 10².'
      },
      {
        id: 'sum-q3-4',
        question: 'A Nap távolsága a Földtől 1,5 · 10⁸ km, a fénysebesség 3 · 10⁵ km/s. Mennyi idő alatt ér a napfény a Földre másodpercben?',
        options: ['500 s (5 · 10² s)', '50 s', '5000 s', '0,5 s'],
        correctAnswer: 0,
        explanation: 't = s / v = (1,5 · 10⁸ km) / (3 · 10⁵ km/s) = (1,5 / 3) · 10³ = 0,5 · 10³ = 500 s (kb. 8 perc 20 másodperc).'
      },
      {
        id: 'sum-q3-5',
        question: 'Mennyi a √8 + √18 - √32 kifejezés összevont értéke?',
        options: ['√2', '2√2', '0', '3√2'],
        correctAnswer: 0,
        explanation: '√8 = 2√2, √18 = 3√2, √32 = 4√2. Számítás: 2√2 + 3√2 - 4√2 = √2.'
      },
      {
        id: 'sum-q3-6',
        question: 'Mennyi a 2√27 + √75 - 3√12 kifejezés összevont értéke?',
        options: ['5√3', '6√3', '3√3', '7√3'],
        correctAnswer: 0,
        explanation: '2(3√3) + 5√3 - 3(2√3) = 6√3 + 5√3 - 6√3 = 5√3.'
      },
      {
        id: 'sum-q3-7',
        question: 'Mennyi a 3√20 - 2√45 + √80 kifejezés értéke?',
        options: ['4√5', '2√5', '6√5', '8√5'],
        correctAnswer: 0,
        explanation: '3(2√5) - 2(3√5) + 4√5 = 6√5 - 6√5 + 4√5 = 4√5.'
      },
      {
        id: 'sum-q3-8',
        question: 'Gyöktelenítsük a 2 / (√5 - 1) tört nevezőjét!',
        options: ['(√5 + 1) / 2', '√5 + 1', '(√5 - 1) / 2', '2(√5 + 1)'],
        correctAnswer: 0,
        explanation: 'Bővítés a konjugálttal: 2(√5 + 1) / (5 - 1) = 2(√5 + 1) / 4 = (√5 + 1) / 2.'
      },
      {
        id: 'sum-q3-9',
        question: 'Gyöktelenítsük az 1 / (√3 + 1) tört nevezőjét!',
        options: ['(√3 - 1) / 2', '√3 - 1', '(√3 + 1) / 2', '√3 / 2'],
        correctAnswer: 0,
        explanation: '1(√3 - 1) / (3 - 1) = (√3 - 1) / 2.'
      },
      {
        id: 'sum-q3-10',
        question: 'Gyöktelenítsük a 4 / (√7 - √3) tört nevezőjét!',
        options: ['√7 + √3', '2(√7 + √3)', '(√7 + √3) / 2', '4(√7 + √3)'],
        correctAnswer: 0,
        explanation: '4(√7 + √3) / (7 - 3) = 4(√7 + √3) / 4 = √7 + √3.'
      },
      {
        id: 'sum-q3-11',
        question: 'Gyöktelenítsük az 1 / (3 + 2√2) tört nevezőjét!',
        options: ['3 - 2√2', '3 + 2√2', '(3 - 2√2) / 17', '2√2 - 3'],
        correctAnswer: 0,
        explanation: '(3 - 2√2) / (3² - (2√2)²) = (3 - 2√2) / (9 - 8) = 3 - 2√2.'
      },
      {
        id: 'sum-q3-12',
        question: 'Mennyi a (2√3 + 1)(2√3 - 1) szorzat értéke?',
        options: ['11', '13', '5', '7'],
        correctAnswer: 0,
        explanation: '(2√3)² - 1² = (4 · 3) - 1 = 12 - 1 = 11.'
      },
      {
        id: 'sum-q3-13',
        question: 'Mennyi a (3√2 + 2)(3√2 - 2) szorzat értéke?',
        options: ['14', '22', '16', '10'],
        correctAnswer: 0,
        explanation: '(3√2)² - 2² = (9 · 2) - 4 = 18 - 4 = 14.'
      },
      {
        id: 'sum-q3-14',
        question: 'Fejtsük ki a (2√3 - √2)² kifejezést!',
        options: ['14 - 4√6', '10 - 4√6', '14 - 2√6', '10'],
        correctAnswer: 0,
        explanation: '(2√3)² - 2(2√3 · √2) + (√2)² = 12 - 4√6 + 2 = 14 - 4√6.'
      },
      {
        id: 'sum-q3-15',
        question: 'Mennyi a (√6 + √2)² + (√6 - √2)² kifejezés értéke?',
        options: ['16', '8', '16 + 4√12', '12'],
        correctAnswer: 0,
        explanation: '(8 + 2√12) + (8 - 2√12) = 16.'
      },
      {
        id: 'sum-q3-16',
        question: 'Mennyi a (√7 + √3)² - (√7 - √3)² kifejezés értéke?',
        options: ['4√21', '0', '20', '2√21'],
        correctAnswer: 0,
        explanation: '(a + b)² - (a - b)² = 4ab = 4 · √7 · √3 = 4√21.'
      },
      {
        id: 'sum-q3-17',
        question: 'Mennyi a √(7 + 4√3) emeletes gyök pontos értéke?',
        options: ['2 + √3', '2 - √3', '√7 + 2√3', '4 + √3'],
        correctAnswer: 0,
        explanation: '7 + 4√3 = 4 + 4√3 + 3 = (2 + √3)². Gyöke: 2 + √3.'
      },
      {
        id: 'sum-q3-18',
        question: 'Mennyi a √(7 - 4√3) emeletes gyök pontos értéke?',
        options: ['2 - √3', '√3 - 2', '2 + √3', '4 - √3'],
        correctAnswer: 0,
        explanation: 'Mivel 2 > √3 (2 > 1,732), így |2 - √3| = 2 - √3.'
      },
      {
        id: 'sum-q3-19',
        question: 'Mennyi a √(6 - 2√5) emeletes gyök pontos értéke?',
        options: ['√5 - 1', '1 - √5', '5 - 1', '3 - √5'],
        correctAnswer: 0,
        explanation: '6 - 2√5 = (√5 - 1)². Mivel √5 > 1, így |√5 - 1| = √5 - 1 (és nem 1 - √5!).'
      },
      {
        id: 'sum-q3-20',
        question: 'Mennyi a √(11 + 6√2) kifejezés pontos értéke?',
        options: ['3 + √2', '3 - √2', '2 + √3', '1 + 3√2'],
        correctAnswer: 0,
        explanation: '11 + 6√2 = 9 + 6√2 + 2 = (3 + √2)². Gyöke: 3 + √2.'
      },
      {
        id: 'sum-q3-21',
        question: 'Mennyi a √(8 - 2√7) kifejezés pontos értéke?',
        options: ['√7 - 1', '1 - √7', '6', '7 - 1'],
        correctAnswer: 0,
        explanation: '|√7 - 1| = √7 - 1.'
      },
      {
        id: 'sum-q3-22',
        question: 'Mennyi a √(7 + 4√3) + √(7 - 4√3) kifejezés összevont értéke?',
        options: ['4', '2√3', '7', '8'],
        correctAnswer: 0,
        explanation: '(2 + √3) + (2 - √3) = 4.'
      },
      {
        id: 'sum-q3-23',
        question: 'Oldjuk meg a valós számok körében: √(2x + 3) = x',
        options: ['Csak x = 3', 'x = 3 és x = -1', 'Csak x = -1', 'Nincs valós megoldás'],
        correctAnswer: 0,
        explanation: '2x + 3 = x² ⇒ x² - 2x - 3 = 0 ⇒ (x - 3)(x + 1) = 0. Ellenőrzés: x = 3 jó (√9 = 3), x = -1 hamis (√1 ≠ -1). Tehát csak x = 3 a valós gyök!'
      },
      {
        id: 'sum-q3-24',
        question: 'Oldjuk meg: √(x + 6) = x',
        options: ['Csak x = 3', 'x = 3 és x = -2', 'Csak x = -2', 'x = 6'],
        correctAnswer: 0,
        explanation: 'x + 6 = x² ⇒ x² - x - 6 = 0 ⇒ (x - 3)(x + 2) = 0. Csak az x = 3 elégíti ki az eredeti egyenletet (√9 = 3).'
      },
      {
        id: 'sum-q3-25',
        question: 'Oldjuk meg: √(4 - x) = x - 2',
        options: ['Csak x = 3', 'x = 3 és x = 0', 'Csak x = 0', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: '4 - x = x² - 4x + 4 ⇒ x² - 3x = 0 ⇒ x(x - 3) = 0. x = 0 hamis gyök (√4 ≠ -2), így csak x = 3 a megoldás.'
      },
      {
        id: 'sum-q3-26',
        question: 'Mi a közös értelmezési tartománya a √(x - 3) + √(7 - x) kifejezésnek?',
        options: ['x ∈ [3; 7]', 'x ∈ ]3; 7[', 'x ≥ 3', 'x ≤ 7'],
        correctAnswer: 0,
        explanation: 'x - 3 ≥ 0 ⇒ x ≥ 3, és 7 - x ≥ 0 ⇒ x ≤ 7. Metszetük: [3; 7].'
      },
      {
        id: 'sum-q3-27',
        question: 'Mi az értelmezési tartománya az 1 / (√(x - 1) - 3) kifejezésnek?',
        options: ['x ≥ 1 és x ≠ 10', 'x ≥ 1', 'x > 1', 'x ≠ 10'],
        correctAnswer: 0,
        explanation: 'Gyök miatt x ≥ 1. Nevező ≠ 0: √(x - 1) - 3 ≠ 0 ⇒ √(x - 1) ≠ 3 ⇒ x - 1 ≠ 9 ⇒ x ≠ 10.'
      },
      {
        id: 'sum-q3-28',
        question: 'Mennyi a √(x² - 8x + 16) kifejezés pontos értéke, ha tudjuk, hogy x < 4?',
        options: ['4 - x', 'x - 4', '±(x - 4)', 'x + 4'],
        correctAnswer: 0,
        explanation: 'x² - 8x + 16 = (x - 4)². Gyöke |x - 4|. Mivel x < 4, így x - 4 negatív, abszolút értéke -(x - 4) = 4 - x.'
      },
      {
        id: 'sum-q3-29',
        question: 'Mennyi a (√2 + √3 + √5)(√2 + √3 - √5) szorzat értéke?',
        options: ['2√6', '5 + 2√6', '0', '√30'],
        correctAnswer: 0,
        explanation: '(√2 + √3)² - (√5)² = 5 + 2√6 - 5 = 2√6.'
      },
      {
        id: 'sum-q3-30',
        question: 'Mennyi az (√a - √b)² + 2√ab egyszerűsített értéke (a, b ≥ 0)?',
        options: ['a + b', 'a - b', '2a', 'a² + b²'],
        correctAnswer: 0,
        explanation: '(a - 2√ab + b) + 2√ab = a + b.'
      }
    ]
  }
];

export const SummaryQuiz: React.FC<SummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="Hatvány és gyök fejezeti tudáspróba"
      subtitle="Átfogó érettségi szintű feladatsor: hatványozás, normálalak, gyökvonás és gyöktelenítés"
      themeColor="rose"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <SummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      initialGameMode={initialGameMode}
    />
  );
};

export default SummaryQuiz;

