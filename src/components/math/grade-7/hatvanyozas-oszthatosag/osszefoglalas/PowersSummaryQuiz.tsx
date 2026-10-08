import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowersSummaryMatcher } from './PowersSummaryMatcher';
import { PowersSummarySorter } from './PowersSummarySorter';
import {
  Trophy,
  Zap,
  Calculator,
  Binary,
  Layers,
  Sparkles,
  Scale,
  Award,
  Hash,
  HelpCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface PowersSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs1',
    title: 'Hatványozási Azonosságok és Normálalak',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: 'aⁿ · aᵐ = aⁿ⁺ᵐ • aⁿ : aᵐ = aⁿ⁻ᵐ • (aⁿ)ᵐ = aⁿᵐ • a · 10ᵏ',
    note: 'Azonos alapoknál a kitevők összeadódnak vagy kivonódnak. Nulladik hatvány: a⁰ = 1 (a ≠ 0). Páros kitevőjű negatív alap pozitív, páratlan negatív.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="6" className="fill-amber-100 stroke-amber-300 dark:fill-amber-950/60 dark:stroke-amber-800" />
        <text x="12" y="29" className="text-[9px] font-mono font-bold fill-amber-900 dark:fill-amber-200">2³ · 2⁴ = 2⁷ = 128</text>
        <rect x="85" y="8" width="70" height="34" rx="6" className="fill-slate-100 stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="92" y="29" className="text-[9px] font-mono font-bold fill-slate-900 dark:fill-slate-200">4,5 · 10⁵ normál</text>
      </svg>
    )
  },
  {
    id: 'cs2',
    title: 'Oszthatósági Szabályok Gyorskeresője',
    icon: <Binary className="w-4 h-4 text-blue-600" />,
    formula: 'Utolsó jegyek (2, 4, 8, 5, 25) • Jegyösszeg (3, 9) • Szorzat (6, 12, 15)',
    note: 'Összetett számokkal való oszthatósághoz a számot relatív prím tényezőkre kell bontani: 6 = 2 · 3, 12 = 3 · 4, 15 = 3 · 5, 18 = 2 · 9, 36 = 4 · 9.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-blue-100 stroke-blue-300 dark:fill-blue-950/60 dark:stroke-blue-800" />
        <text x="16" y="28" className="text-[9px] font-mono font-bold fill-blue-900 dark:fill-blue-200">12-vel osztható ⟺ 3-mal ÉS 4-gyel</text>
      </svg>
    )
  },
  {
    id: 'cs3',
    title: 'Prímfelbontás és az Osztók Száma: d(n)',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'n = p₁^a · p₂^b ⟹ d(n) = (a + 1)(b + 1) • d(n) páratlan ⟺ négyzetszám',
    note: 'A kanonikus alak kitevőihez egyet adva és összeszorozva megkapjuk az összes pozitív osztó számát. Páratlan sok osztója kizárólag a négyzetszámoknak van.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="14" y="28" className="text-[9px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">72 = 2³ · 3² ⟹ 4 · 3 = 12 osztó</text>
      </svg>
    )
  },
  {
    id: 'cs4',
    title: 'LNKO, LKKT és Játékstratégiák',
    icon: <Scale className="w-4 h-4 text-emerald-600" />,
    formula: 'LNKO · LKKT = a · b • Kulcsszám: Cél - m(k + 1)',
    note: 'LNKO: közös prímek legkisebb kitevőn. LKKT: összes prím legnagyobb kitevőn. Számversenyekben a kiegészítő lépés (k + 1 - x) biztosítja a kulcspozíciók megtartását.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="14" y="28" className="text-[9px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">LNKO(a, b) · LKKT(a, b) = a · b</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és Közvetlen Kiszámítások',
    subtitle: 'Hatványértékek, alapvető azonosságok, oszthatósági tesztek és prímek (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Alapműveletek, hatványozási alapszabályok és közvetlen szabályalkalmazás',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi 2⁴ értéke?',
        options: ['16', '8', '32', '12'],
        correctAnswer: '16',
        explanation: '2⁴ = 2 · 2 · 2 · 2 = 16.',
        breakdown: [
          { label: 'Szorzat', value: '2 · 2 · 2 · 2' },
          { label: 'Eredmény', value: '16' }
        ],
        hint: 'Szorozd össze a 2-t négyszer!'
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi 3³ értéke?',
        options: ['27', '9', '18', '81'],
        correctAnswer: '27',
        explanation: '3³ = 3 · 3 · 3 = 27.',
        breakdown: [
          { label: 'Szorzat', value: '3 · 3 · 3' },
          { label: 'Eredmény', value: '27' }
        ],
        hint: 'Mennyi 3-szor 3, és az megszorozva 3-mal?'
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi (-2)⁴ értéke?',
        options: ['+16', '-16', '+8', '-8'],
        correctAnswer: '+16',
        explanation: 'Negatív alap páros kitevőn mindig pozitív: (-2) · (-2) · (-2) · (-2) = +16.',
        breakdown: [
          { label: 'Alap és kitevő', value: 'Alap: -2, páros kitevő: 4' },
          { label: 'Előjel', value: 'Pozitív (+16)' }
        ],
        hint: 'Páros számú negatív tényező szorzata pozitív!'
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi (-2)³ értéke?',
        options: ['-8', '+8', '-6', '+6'],
        correctAnswer: '-8',
        explanation: 'Negatív alap páratlan kitevőn negatív marad: (-2) · (-2) · (-2) = -8.',
        breakdown: [
          { label: 'Szorzat', value: '(-2) · (-2) · (-2)' },
          { label: 'Eredmény', value: '-8' }
        ],
        hint: 'Három darab negatív szám szorzata negatív.'
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi -3² értéke?',
        options: ['-9', '+9', '-6', '+6'],
        correctAnswer: '-9',
        explanation: 'Zárójel hiányában a négyzetre emelés csak a 3-ra vonatkozik: -3² = -(3 · 3) = -9.',
        breakdown: [
          { label: 'Műveleti sorrend', value: '-(3²)' },
          { label: 'Eredmény', value: '-9' }
        ],
        hint: 'Nincs zárójel a negatív előjel körül!'
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi 7⁰ értéke?',
        options: ['1', '0', '7', 'Nem értelmezhető'],
        correctAnswer: '1',
        explanation: 'Bármely nem nulla valós szám nulladik hatványa definíció szerint 1.',
        breakdown: [
          { label: 'Szabály', value: 'a⁰ = 1 (a ≠ 0)' },
          { label: 'Eredmény', value: '1' }
        ],
        hint: 'Mit tanultunk a nulladik hatványról?'
      },
      {
        id: 'q1-7',
        prompt: 'Egyszerűsítsd a kifejezést: a³ · a⁴',
        options: ['a⁷', 'a¹²', '2a⁷', 'a¹'],
        correctAnswer: 'a⁷',
        explanation: 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak: a³ · a⁴ = a³⁺⁴ = a⁷.',
        breakdown: [
          { label: 'Azonosság', value: 'aⁿ · aᵐ = aⁿ⁺ᵐ' },
          { label: 'Kitevők', value: '3 + 4 = 7' }
        ],
        hint: 'Add össze a kitevőket!'
      },
      {
        id: 'q1-8',
        prompt: 'Egyszerűsítsd a kifejezést: 5⁶ : 5²',
        options: ['5⁴', '5³', '5⁸', '1⁴'],
        correctAnswer: '5⁴',
        explanation: 'Azonos alapú hatványok osztásakor a kitevők kivonódnak: 5⁶ : 5² = 5⁶⁻² = 5⁴.',
        breakdown: [
          { label: 'Azonosság', value: 'aⁿ : aᵐ = aⁿ⁻ᵐ' },
          { label: 'Kitevők', value: '6 - 2 = 4' }
        ],
        hint: 'Vond ki az osztó kitevőjét az osztandó kitevőjéből!'
      },
      {
        id: 'q1-9',
        prompt: 'Egyszerűsítsd a kifejezést: (2³)²',
        options: ['2⁶', '2⁵', '2⁹', '4⁶'],
        correctAnswer: '2⁶',
        explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: (2³)² = 2³·² = 2⁶ = 64.',
        breakdown: [
          { label: 'Azonosság', value: '(aⁿ)ᵐ = aⁿ·ᵐ' },
          { label: 'Kitevők', value: '3 · 2 = 6' }
        ],
        hint: 'Szorozd össze a két kitevőt!'
      },
      {
        id: 'q1-10',
        prompt: 'Mivel egyenlő (3 · 4)² a hatványozás azonossága szerint?',
        options: ['3² · 4²', '3 · 4²', '3² + 4²', '12⁴'],
        correctAnswer: '3² · 4²',
        explanation: 'Szorzatot úgy hatványozunk, hogy a tényezőket külön-külön hatványozzuk: (a · b)ⁿ = aⁿ · bⁿ.',
        breakdown: [
          { label: 'Azonosság', value: '(a · b)ⁿ = aⁿ · bⁿ' },
          { label: 'Alkalmazás', value: '3² · 4² = 9 · 16 = 144' }
        ],
        hint: 'Hatványozd mindkét tényezőt!'
      },
      {
        id: 'q1-11',
        prompt: 'Hogyan írható fel az 50 000 normálalakban?',
        options: ['5 · 10⁴', '50 · 10³', '5 · 10⁵', '0,5 · 10⁵'],
        correctAnswer: '5 · 10⁴',
        explanation: 'A normálalakban a mantisszának 1 és 10 közé kell esnie: 50 000 = 5 · 10 000 = 5 · 10⁴.',
        breakdown: [
          { label: 'Mantissza', value: '1 ≤ 5 < 10' },
          { label: 'Tíz-hatvány', value: '10⁴' }
        ],
        hint: 'Hány nullát hagysz el, ha 5-öt írsz?'
      },
      {
        id: 'q1-12',
        prompt: 'Mennyi a 3,2 · 10³ szám normálalakból visszaírt értéke?',
        options: ['3200', '320', '32 000', '32'],
        correctAnswer: '3200',
        explanation: '10³ = 1000, így 3,2 · 1000 = 3200.',
        breakdown: [
          { label: '10-hatvány', value: '10³ = 1000' },
          { label: 'Szorzás', value: '3,2 · 1000 = 3200' }
        ],
        hint: 'Mozgasd a tizedesvesszőt 3 hellyel jobbra!'
      },
      {
        id: 'q1-13',
        prompt: 'Melyik szám osztható 2-vel az alábbiak közül?',
        options: ['418', '315', '721', '903'],
        correctAnswer: '418',
        explanation: 'Egy szám akkor osztható 2-vel, ha az utolsó számjegye páros (0, 2, 4, 6, 8). A 418 utolsó jegye 8.',
        breakdown: [
          { label: 'Utolsó jegy', value: '8 (páros)' },
          { label: 'Szabály', value: 'Osztható 2-vel' }
        ],
        hint: 'Nézd az utolsó számjegyet!'
      },
      {
        id: 'q1-14',
        prompt: 'Melyik szám osztható 5-tel az alábbiak közül?',
        options: ['735', '732', '734', '731'],
        correctAnswer: '735',
        explanation: 'Egy szám akkor osztható 5-tel, ha utolsó számjegye 0 vagy 5. A 735 5-re végződik.',
        breakdown: [
          { label: 'Utolsó jegy', value: '5' },
          { label: 'Szabály', value: 'Osztható 5-tel' }
        ],
        hint: 'Mire kell végződnie egy 5-tel osztható számnak?'
      },
      {
        id: 'q1-15',
        prompt: 'Melyik szám osztható 10-zel az alábbiak közül?',
        options: ['920', '925', '902', '912'],
        correctAnswer: '920',
        explanation: 'Egy szám akkor osztható 10-zel, ha az utolsó számjegye 0. A 920 0-ra végződik.',
        breakdown: [
          { label: 'Utolsó jegy', value: '0' },
          { label: 'Szabály', value: 'Osztható 10-zel' }
        ],
        hint: 'Az utolsó jegynek 0-nak kell lennie.'
      },
      {
        id: 'q1-16',
        prompt: 'Melyik szám osztható 3-mal az alábbiak közül?',
        options: ['243', '241', '242', '245'],
        correctAnswer: '243',
        explanation: 'A számjegyek összege: 2 + 4 + 3 = 9. Mivel 9 osztható 3-mal, a 243 is osztható 3-mal.',
        breakdown: [
          { label: 'Jegyösszeg', value: '2 + 4 + 3 = 9' },
          { label: 'Oszthatóság', value: '9 : 3 = 3 ⟹ Osztható' }
        ],
        hint: 'Add össze a számjegyeket!'
      },
      {
        id: 'q1-17',
        prompt: 'Melyik szám osztható 9-cel az alábbiak közül?',
        options: ['576', '574', '573', '578'],
        correctAnswer: '576',
        explanation: 'A számjegyek összege: 5 + 7 + 6 = 18. Mivel 18 osztható 9-cel, az 576 is osztható 9-cel.',
        breakdown: [
          { label: 'Jegyösszeg', value: '5 + 7 + 6 = 18' },
          { label: 'Oszthatóság', value: '18 : 9 = 2 ⟹ Osztható' }
        ],
        hint: 'Osztható-e a számjegyek összege 9-cel?'
      },
      {
        id: 'q1-18',
        prompt: 'Melyik szám osztható 4-gyel az alábbiak közül?',
        options: ['824', '822', '825', '826'],
        correctAnswer: '824',
        explanation: 'Az utolsó két számjegyből álló szám a 24. Mivel 24 osztható 4-gyel (24 : 4 = 6), a 824 is osztható 4-gyel.',
        breakdown: [
          { label: 'Utolsó 2 számjegy', value: '24' },
          { label: 'Oszthatóság', value: '24 : 4 = 6' }
        ],
        hint: 'Csak az utolsó két számjegyet vizsgáld!'
      },
      {
        id: 'q1-19',
        prompt: 'Melyik szám osztható 25-tel az alábbiak közül?',
        options: ['1375', '1370', '1365', '1380'],
        correctAnswer: '1375',
        explanation: 'Egy szám akkor osztható 25-tel, ha az utolsó két jegye 00, 25, 50 vagy 75. Az 1375 végződése 75.',
        breakdown: [
          { label: 'Utolsó 2 számjegy', value: '75' },
          { label: 'Szabály', value: '00, 25, 50, 75' }
        ],
        hint: 'Nézd meg az utolsó két számjegyet!'
      },
      {
        id: 'q1-20',
        prompt: 'Melyik a legkisebb prímszám?',
        options: ['2', '1', '0', '3'],
        correctAnswer: '2',
        explanation: 'A legkisebb prímszám a 2. Az 1 nem prímszám, mert csak 1 pozitív osztója van, míg a prímeknek pontosan 2.',
        breakdown: [
          { label: 'Legkisebb prím', value: '2' },
          { label: 'Az 1 esete', value: 'Nem prím és nem összetett' }
        ],
        hint: 'Hány pozitív osztója van a prímeknek? Miért nem prím az 1?'
      },
      {
        id: 'q1-21',
        prompt: 'Hány páros prímszám létezik a pozitív egészek között?',
        options: ['Pontosan 1 (a 2)', 'Végtelen sok', '0', '2 (a 2 és a 4)'],
        correctAnswer: 'Pontosan 1 (a 2)',
        explanation: 'A 2 az egyetlen páros prím. Minden nála nagyobb páros szám osztható 2-vel, így összetett szám.',
        breakdown: [
          { label: 'Egyetlen páros prím', value: '2' },
          { label: 'Többi páros szám', value: 'Összetett szám' }
        ],
        hint: 'Lehet-e a 2-nél nagyobb páros szám prím?'
      },
      {
        id: 'q1-22',
        prompt: 'Prímszám-e a 17?',
        options: [
          'Igen, mert pontosan 2 pozitív osztója van (1 és 17)',
          'Nem, mert páratlan szám',
          'Nem, mert osztható 3-mal',
          'Csak negatív előjellel'
        ],
        correctAnswer: 'Igen, mert pontosan 2 pozitív osztója van (1 és 17)',
        explanation: 'A 17 kizárólag 1-gyel és önmagával osztható, így definíció szerint prímszám.',
        breakdown: [
          { label: 'Osztók', value: '{1, 17}' },
          { label: 'Besorolás', value: 'Prímszám' }
        ],
        hint: 'Találsz-e osztót a 17-nek 1 és 17 között?'
      },
      {
        id: 'q1-23',
        prompt: 'Mi a 12 prímtényezős felbontása?',
        options: ['2² · 3', '2 · 6', '3 · 4', '2³ · 3'],
        correctAnswer: '2² · 3',
        explanation: '12 = 4 · 3 = 2 · 2 · 3 = 2² · 3.',
        breakdown: [
          { label: 'Szorzat', value: '2 · 2 · 3' },
          { label: 'Kanonikus alak', value: '2² · 3' }
        ],
        hint: 'Csak prímszámok szerepelhetnek a szorzatban!'
      },
      {
        id: 'q1-24',
        prompt: 'Mi a 18 prímtényezős felbontása?',
        options: ['2 · 3²', '2 · 9', '3 · 6', '2² · 3²'],
        correctAnswer: '2 · 3²',
        explanation: '18 = 2 · 9 = 2 · 3 · 3 = 2 · 3².',
        breakdown: [
          { label: 'Szorzat', value: '2 · 3 · 3' },
          { label: 'Kanonikus alak', value: '2 · 3²' }
        ],
        hint: 'Bontsd tovább a 9-et prímekre!'
      },
      {
        id: 'q1-25',
        prompt: 'Mennyi a 12 és a 18 legnagyobb közös osztója: LNKO(12, 18)?',
        options: ['6', '3', '2', '36'],
        correctAnswer: '6',
        explanation: '12 = 2² · 3 és 18 = 2 · 3². A közös prímtényezők a legkisebb kitevőn: 2¹ · 3¹ = 6.',
        breakdown: [
          { label: 'Prímfelbontások', value: '12 = 2²·3, 18 = 2·3²' },
          { label: 'LNKO', value: '2¹ · 3¹ = 6' }
        ],
        hint: 'Vedd a közös prímeket a kisebb kitevőn!'
      },
      {
        id: 'q1-26',
        prompt: 'Mennyi a 12 és a 18 legkisebb közös többszöröse: LKKT(12, 18)?',
        options: ['36', '72', '18', '216'],
        correctAnswer: '36',
        explanation: 'Az összes előforduló prím a legnagyobb kitevőn: 2² · 3² = 4 · 9 = 36.',
        breakdown: [
          { label: 'Kitevők', value: '2² és 3²' },
          { label: 'LKKT', value: '4 · 9 = 36' }
        ],
        hint: 'Vedd az összes előforduló prímet a nagyobb kitevőn!'
      },
      {
        id: 'q1-27',
        prompt: 'Mikor mondjuk két egész számról, hogy relatív prímek?',
        options: [
          'Ha legnagyobb közös osztójuk 1 (LNKO = 1)',
          'Ha mindkettő prímszám',
          'Ha legkisebb közös többszörösük 1',
          'Ha összegük prím'
        ],
        correctAnswer: 'Ha legnagyobb közös osztójuk 1 (LNKO = 1)',
        explanation: 'Két szám relatív prím, ha nincs 1-nél nagyobb közös pozitív osztójuk: LNKO(a, b) = 1 (pl. 8 és 9, bár egyik sem prím).',
        breakdown: [
          { label: 'Definíció', value: 'LNKO(a, b) = 1' },
          { label: 'Példa', value: 'LNKO(8, 9) = 1' }
        ],
        hint: 'Mit jelent a „relatív” szó a prímeknél?'
      },
      {
        id: 'q1-28',
        prompt: 'Hány pozitív egész osztója van a 9-nek?',
        options: ['3', '2', '4', '1'],
        correctAnswer: '3',
        explanation: 'A 9 pozitív osztói: 1, 3 és 9. Összesen 3 darab (páratlan sok, mert négyzetszám).',
        breakdown: [
          { label: 'Osztók', value: '{1, 3, 9}' },
          { label: 'Darabszám', value: '3 osztó' }
        ],
        hint: 'Sorold fel a 9 osztóit!'
      },
      {
        id: 'q1-29',
        prompt: 'A 21-es játékban 0-ról indulva 1, 2 vagy 3 adható hozzá felváltva. Mekkora a kiegészítő ciklus hossza?',
        options: ['4', '3', '5', '2'],
        correctAnswer: '4',
        explanation: 'A maximális lépés k = 3, így a ciklus hossza k + 1 = 3 + 1 = 4.',
        breakdown: [
          { label: 'Max lépés', value: '3' },
          { label: 'Ciklus', value: '3 + 1 = 4' }
        ],
        hint: 'A maximális lépéshez adj 1-et!'
      },
      {
        id: 'q1-30',
        prompt: 'Mit kell mondania a kezdő játékosnak a 21-es játékban (lépés: 1–3, 21 nyer) legelőször a biztos győzelemhez?',
        options: ['1-et', '2-t', '3-at', 'Nem tud biztosan nyerni'],
        correctAnswer: '1-et',
        explanation: '21 = 5 · 4 + 1. A 4-gyel vett osztási maradék 1, tehát a kezdő 1 mondásával azonnal nyerő pozícióba kerül.',
        breakdown: [
          { label: 'Maradék', value: '21 mod 4 = 1' },
          { label: 'Első lépés', value: '1' }
        ],
        hint: 'Mennyi 21 osztva 4-gyel maradéka?'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett Összefüggések és Szabályok',
    subtitle: 'Műveletek hatványokkal, összetett oszthatóság, kanonikus alak és d(n) számítás (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Kifejezések egyszerűsítése, hiányzó jegyek, osztószám-képlet és szöveges LNKO/LKKT',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Számítsd ki a tört értékét: (2⁵ · 2³) : 2⁴',
        options: ['16', '32', '8', '64'],
        correctAnswer: '16',
        explanation: 'A számlálóban: 2⁵ · 2³ = 2⁸. Osztva 2⁴-nel: 2⁸ : 2⁴ = 2⁴ = 16.',
        breakdown: [
          { label: 'Számláló', value: '2⁵⁺³ = 2⁸' },
          { label: 'Osztás', value: '2⁸⁻⁴ = 2⁴ = 16' }
        ],
        hint: 'Végezd el először a szorzást fent, utána az osztást!'
      },
      {
        id: 'q2-2',
        prompt: 'Egyszerűsítsd a kifejezést: (a² · b³)²',
        options: ['a⁴ · b⁶', 'a⁴ · b⁵', 'a² · b⁶', 'a⁴ · b³'],
        correctAnswer: 'a⁴ · b⁶',
        explanation: 'Szorzat hatványozásakor mindkét tényező kitevőjét megszorozzuk a külső kitevővel: (a²)² · (b³)² = a⁴ · b⁶.',
        breakdown: [
          { label: 'Első tényező', value: '(a²)² = a⁴' },
          { label: 'Második tényező', value: '(b³)² = b⁶' }
        ],
        hint: 'Szorozd meg mindkét belső kitevőt 2-vel!'
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a kifejezés értéke: (-1)¹⁰⁰ + (-1)¹⁰¹?',
        options: ['0', '2', '-2', '1'],
        correctAnswer: '0',
        explanation: '(-1)¹⁰⁰ = +1 (páros kitevő), míg (-1)¹⁰¹ = -1 (páratlan kitevő). Összegük: 1 + (-1) = 0.',
        breakdown: [
          { label: '(-1)¹⁰⁰', value: '+1' },
          { label: '(-1)¹⁰¹', value: '-1' },
          { label: 'Összeg', value: '1 + (-1) = 0' }
        ],
        hint: 'Nézd meg a két kitevő paritását külön-külön!'
      },
      {
        id: 'q2-4',
        prompt: 'Hogyan írható fel a 2 400 000 normálalakban?',
        options: ['2,4 · 10⁶', '24 · 10⁵', '2,4 · 10⁵', '0,24 · 10⁷'],
        correctAnswer: '2,4 · 10⁶',
        explanation: 'A tizedesvesszőt 6 hellyel balra visszük: 2 400 000 = 2,4 · 10⁶.',
        breakdown: [
          { label: 'Mantissza', value: '2,4' },
          { label: 'Kitevő', value: '6' }
        ],
        hint: 'Hány hellyel tolod el a tizedesvesszőt a 2 és a 4 közé?'
      },
      {
        id: 'q2-5',
        prompt: 'Végezd el a szorzást normálalakban: (3 · 10⁴) · (2 · 10³)',
        options: ['6 · 10⁷', '6 · 10¹²', '5 · 10⁷', '6 · 10¹'],
        correctAnswer: '6 · 10⁷',
        explanation: 'A mantisszák szorzata 3 · 2 = 6. A tíz-hatványok szorzata 10⁴ · 10³ = 10⁷. Végeredmény: 6 · 10⁷.',
        breakdown: [
          { label: 'Mantisszák', value: '3 · 2 = 6' },
          { label: 'Tízhatványok', value: '10⁴⁺³ = 10⁷' }
        ],
        hint: 'Szorozd össze a számokat, a 10 kitevőit pedig add össze!'
      },
      {
        id: 'q2-6',
        prompt: 'Melyik szám osztható 8-cal az alábbiak közül?',
        options: ['3128', '3124', '3122', '3126'],
        correctAnswer: '3128',
        explanation: 'Az utolsó 3 számjegy a 128. Mivel 128 : 8 = 16, a 3128 osztható 8-cal.',
        breakdown: [
          { label: 'Utolsó 3 jegy', value: '128' },
          { label: 'Osztás', value: '128 : 8 = 16' }
        ],
        hint: 'Vizsgáld meg az utolsó 3 számjegyből álló számot!'
      },
      {
        id: 'q2-7',
        prompt: 'Melyik szám osztható 6-tal az alábbiak közül?',
        options: ['432', '430', '435', '434'],
        correctAnswer: '432',
        explanation: 'Egy szám akkor osztható 6-tal, ha osztható 2-vel ÉS 3-mal. A 432 páros (2-vel osztható), és 4+3+2 = 9 (3-mal osztható).',
        breakdown: [
          { label: 'Páros-e?', value: 'Igen (2-re végződik)' },
          { label: 'Jegyösszeg', value: '4 + 3 + 2 = 9 (osztható 3-mal)' }
        ],
        hint: 'Párosnak kell lennie és a számjegyek összegének 3-mal oszthatónak!'
      },
      {
        id: 'q2-8',
        prompt: 'Melyik szám osztható 12-vel az alábbiak közül?',
        options: ['348', '346', '350', '342'],
        correctAnswer: '348',
        explanation: '12 = 3 · 4 (relatív prímek). A 348 utolsó 2 jegye 48 (osztható 4-gyel), jegyösszege 3+4+8 = 15 (osztható 3-mal).',
        breakdown: [
          { label: '4-gyel osztható?', value: '48 : 4 = 12 (Igen)' },
          { label: '3-mal osztható?', value: '3+4+8 = 15 (Igen)' }
        ],
        hint: 'Oszthatónak kell lennie 3-mal ÉS 4-gyel is!'
      },
      {
        id: 'q2-9',
        prompt: 'Melyik szám osztható 15-tel az alábbiak közül?',
        options: ['675', '670', '680', '672'],
        correctAnswer: '675',
        explanation: '15 = 3 · 5. A 675 5-re végződik (5-tel osztható), jegyösszege 6+7+5 = 18 (3-mal osztható).',
        breakdown: [
          { label: '5-tel osztható?', value: '5-re végződik (Igen)' },
          { label: '3-mal osztható?', value: '6+7+5 = 18 (Igen)' }
        ],
        hint: '5-re vagy 0-ra kell végződnie, és a jegyösszegnek oszthatónak kell lennie 3-mal!'
      },
      {
        id: 'q2-10',
        prompt: 'Melyik szám osztható 18-cal az alábbiak közül?',
        options: ['756', '753', '752', '758'],
        correctAnswer: '756',
        explanation: '18 = 2 · 9. A 756 páros (2-vel osztható), jegyösszege 7+5+6 = 18 (9-cel osztható).',
        breakdown: [
          { label: 'Páros-e?', value: 'Igen (6-ra végződik)' },
          { label: '9-cel osztható?', value: '7+5+6 = 18 (Igen)' }
        ],
        hint: 'Párosnak kell lennie és a jegyösszegének oszthatónak kell lennie 9-cel!'
      },
      {
        id: 'q2-11',
        prompt: 'Melyik számjegyet kell x helyére írni a 4x2 háromjegyű számban, hogy osztható legyen 9-cel?',
        options: ['3', '2', '6', '0'],
        correctAnswer: '3',
        explanation: 'A jegyösszeg: 4 + x + 2 = 6 + x. Hogy 9-cel osztható legyen, 6 + x = 9 ⟹ x = 3.',
        breakdown: [
          { label: 'Összeg', value: '4 + x + 2 = 6 + x' },
          { label: 'Feltétel', value: '6 + 3 = 9 ⟹ x = 3' }
        ],
        hint: 'Mennyit kell adni a 4 + 2 = 6-hoz, hogy 9 legyen?'
      },
      {
        id: 'q2-12',
        prompt: 'Melyik számjegy állhat y helyén az 57y számban, ha a szám osztható 6-tal?',
        options: ['0 vagy 6', '2 vagy 8', '4', 'Csak az 5'],
        correctAnswer: '0 vagy 6',
        explanation: '57y páros kell legyen (y ∈ {0, 2, 4, 6, 8}). Jegyösszeg: 5+7+y = 12+y. A 12+y akkor osztható 3-mal, ha y = 0 vagy 6.',
        breakdown: [
          { label: 'Párosság', value: 'y ∈ {0, 2, 4, 6, 8}' },
          { label: '3-as oszthatóság', value: '12 + y osztható 3-mal ⟹ y = 0 vagy 6' }
        ],
        hint: 'y páros kell legyen, és 12 + y-nak oszthatónak kell lennie 3-mal.'
      },
      {
        id: 'q2-13',
        prompt: 'Legfeljebb meddig kell vizsgálni a prímeket, hogy eldöntsük: a 89 prímszám-e?',
        options: ['7-ig (vagy 9-ig)', '45-ig', '88-ig', '3-ig'],
        correctAnswer: '7-ig (vagy 9-ig)',
        explanation: '√89 ≈ 9,43. Elég a √89 alatti prímekkel (2, 3, 5, 7) próbálkozni. Mivel egyik sem osztja, a 89 prím.',
        breakdown: [
          { label: 'Gyök', value: '√89 ≈ 9,43' },
          { label: 'Prímek √89 alatt', value: '2, 3, 5, 7' }
        ],
        hint: 'Elég a szám négyzetgyökéig vizsgálni a prímeket!'
      },
      {
        id: 'q2-14',
        prompt: 'Mi a 72 prímtényezős (kanonikus) felbontása?',
        options: ['2³ · 3²', '2² · 3³', '2⁴ · 3', '8 · 9'],
        correctAnswer: '2³ · 3²',
        explanation: '72 = 8 · 9 = 2³ · 3².',
        breakdown: [
          { label: 'Szorzat', value: '8 · 9' },
          { label: 'Kanonikus alak', value: '2³ · 3²' }
        ],
        hint: '8 = 2³ és 9 = 3².'
      },
      {
        id: 'q2-15',
        prompt: 'Hány pozitív egész osztója van a 72-nek a d(n) képlet alapján?',
        options: ['12', '10', '8', '16'],
        correctAnswer: '12',
        explanation: '72 = 2³ · 3². Az osztók száma: d(72) = (3 + 1)(2 + 1) = 4 · 3 = 12.',
        breakdown: [
          { label: 'Kitevők', value: 'α₁ = 3, α₂ = 2' },
          { label: 'Képlet', value: '(3 + 1)(2 + 1) = 4 · 3 = 12' }
        ],
        hint: 'Adj hozzá 1-et mindkét kitevőhöz, majd szorozd össze őket!'
      },
      {
        id: 'q2-16',
        prompt: 'Hány pozitív osztója van a 100-nak?',
        options: ['9', '8', '10', '12'],
        correctAnswer: '9',
        explanation: '100 = 2² · 5². d(100) = (2 + 1)(2 + 1) = 3 · 3 = 9.',
        breakdown: [
          { label: 'Kanonikus alak', value: '2² · 5²' },
          { label: 'd(100)', value: '(2 + 1)(2 + 1) = 9' }
        ],
        hint: '100 = 2² · 5², a kitevők 2 és 2.'
      },
      {
        id: 'q2-17',
        prompt: 'Miért van a 100-nak páratlan számú (9 db) pozitív osztója?',
        options: [
          'Mert a 100 négyzetszám (10²)',
          'Mert osztható 5-tel',
          'Mert 100 páros szám',
          'Minden háromjegyű számnak páratlan osztója van'
        ],
        correctAnswer: 'Mert a 100 négyzetszám (10²)',
        explanation: 'Egy számnak akkor és csak akkor van páratlan sok osztója, ha négyzetszám, mert a d · d′ = n párokban a √n önmagával alkot párt.',
        breakdown: [
          { label: 'Tétel', value: 'd(n) páratlan ⟺ n négyzetszám' },
          { label: '100 gyöke', value: '√100 = 10 (10 · 10 = 100)' }
        ],
        hint: 'Milyen speciális szám a 100? Melyik szám négyzete?'
      },
      {
        id: 'q2-18',
        prompt: 'Ha n = p³, ahol p prímszám, hány pozitív osztója van n-nek?',
        options: ['4', '3', 'p', '6'],
        correctAnswer: '4',
        explanation: 'A d(n) képlet szerint d(p³) = 3 + 1 = 4. Az osztók pontosan: 1, p, p² és p³.',
        breakdown: [
          { label: 'Osztók', value: '{1, p, p², p³}' },
          { label: 'Képlet', value: '3 + 1 = 4' }
        ],
        hint: 'Kitevő + 1!'
      },
      {
        id: 'q2-19',
        prompt: 'Határozd meg az LNKO(36, 60) értékét!',
        options: ['12', '6', '18', '24'],
        correctAnswer: '12',
        explanation: '36 = 2² · 3², 60 = 2² · 3 · 5. LNKO = 2² · 3¹ = 4 · 3 = 12.',
        breakdown: [
          { label: 'Közös prímek', value: '2 és 3' },
          { label: 'Kisebb kitevők', value: '2² · 3¹ = 12' }
        ],
        hint: 'Közös prímek a kisebb kitevőn!'
      },
      {
        id: 'q2-20',
        prompt: 'Határozd meg az LKKT(36, 60) értékét!',
        options: ['180', '120', '360', '720'],
        correctAnswer: '180',
        explanation: '36 = 2² · 3², 60 = 2² · 3 · 5. LKKT = 2² · 3² · 5¹ = 4 · 9 · 5 = 180.',
        breakdown: [
          { label: 'Összes prím', value: '2, 3 és 5' },
          { label: 'Nagyobb kitevők', value: '2² · 3² · 5 = 180' }
        ],
        hint: 'Összes prím a nagyobb kitevőn!'
      },
      {
        id: 'q2-21',
        prompt: 'Igaz-e a 36-ra és 60-ra, hogy LNKO(36, 60) · LKKT(36, 60) = 36 · 60?',
        options: [
          'Igen, mindkét szorzat pontosan 2160',
          'Nem, az LKKT nagyobb',
          'Csak akkor, ha prímek lennének',
          'Nem, a szorzat 1800'
        ],
        correctAnswer: 'Igen, mindkét szorzat pontosan 2160',
        explanation: 'Az alapösszefüggés szerint bármely két számra: LNKO · LKKT = a · b. Itt 12 · 180 = 2160 és 36 · 60 = 2160.',
        breakdown: [
          { label: 'Bal oldal', value: '12 · 180 = 2160' },
          { label: 'Jobb oldal', value: '36 · 60 = 2160' }
        ],
        hint: 'Ez a számelmélet egyik legfontosabb alaptétele!'
      },
      {
        id: 'q2-22',
        prompt: 'Két helyi járatú busz indul a végállomásról: az egyik 12, a másik 18 percenként. Hány perc múlva indulnak legközelebb egyszerre?',
        options: ['36 perc múlva', '72 perc múlva', '54 perc múlva', '24 perc múlva'],
        correctAnswer: '36 perc múlva',
        explanation: 'A legkisebb közös többszöröst keressük: LKKT(12, 18) = 36 perc.',
        breakdown: [
          { label: 'Feladat típusa', value: 'LKKT keresés' },
          { label: 'LKKT(12, 18)', value: '36 perc' }
        ],
        hint: 'Keresd a 12 és 18 legkisebb közös többszörösét!'
      },
      {
        id: 'q2-23',
        prompt: 'Egy asztalos egy 40 cm-es és egy 56 cm-es lécet a lehető leghosszabb, egyenlő méretű darabokra szeretne felvágni hulladék nélkül. Milyen hosszú legyen egy darab?',
        options: ['8 cm', '4 cm', '10 cm', '14 cm'],
        correctAnswer: '8 cm',
        explanation: 'A legnagyobb közös osztót keressük: 40 = 2³ · 5, 56 = 2³ · 7 ⟹ LNKO(40, 56) = 2³ = 8 cm.',
        breakdown: [
          { label: 'Feladat típusa', value: 'LNKO keresés' },
          { label: 'LNKO(40, 56)', value: '8 cm' }
        ],
        hint: 'Keresd a 40 és 56 legnagyobb közös osztóját!'
      },
      {
        id: 'q2-24',
        prompt: 'Relatív prímek-e a 14 és a 15 számok?',
        options: [
          'Igen, mert nincs 1-nél nagyobb közös osztójuk (LNKO = 1)',
          'Nem, mert a 14 páros',
          'Nem, mert a 15 osztható 3-mal',
          'Nem, mert egyik sem prím'
        ],
        correctAnswer: 'Igen, mert nincs 1-nél nagyobb közös osztójuk (LNKO = 1)',
        explanation: '14 = 2 · 7 és 15 = 3 · 5. Nincs közös prímosztójuk, így LNKO(14, 15) = 1. Tehát relatív prímek, bár egyikük sem prímszám.',
        breakdown: [
          { label: 'Prímfelbontások', value: '14 = 2·7, 15 = 3·5' },
          { label: 'Közös prím', value: 'Nincs ⟹ LNKO = 1' }
        ],
        hint: 'Van-e közös prímosztójuk a 2, 7 és 3, 5 halmazoknak?'
      },
      {
        id: 'q2-25',
        prompt: 'A 21-es játékban (lépés 1-3) az állás most 17. Miért nevezzük ezt a közvetlen győzelmet garantáló kulcspozíciónak?',
        options: [
          'Mert az ellenfél bármit lép (1, 2 vagy 3), a számláló 18, 19 vagy 20 lesz, ahonnan egy lépésből elérjük a 21-et',
          'Mert a 17 prímszám',
          'Mert innen már senki nem léphet',
          'Mert a 17 osztható 4-gyel'
        ],
        correctAnswer: 'Mert az ellenfél bármit lép (1, 2 vagy 3), a számláló 18, 19 vagy 20 lesz, ahonnan egy lépésből elérjük a 21-et',
        explanation: 'A 17-re lépő játékos után az ellenfél 1-et adva 18-ra, 2-t adva 19-re, 3-at adva 20-ra jut. Ezekről az értékekről a nyerő játékos rendre 3, 2 vagy 1 hozzáadásával eléri a 21-et.',
        breakdown: [
          { label: 'Ellenfél lépései', value: '17 + 1 = 18; 17 + 2 = 19; 17 + 3 = 20' },
          { label: 'Nyerő válaszok', value: '18 + 3 = 21; 19 + 2 = 21; 20 + 1 = 21' }
        ],
        hint: 'Milyen számokat tud mondani az ellenfél 17 után?'
      },
      {
        id: 'q2-26',
        prompt: 'A fordított (misère) 21-es játékban az veszít, aki kimondja a 21-et (lépés: 1–3). Mi ekkor a valódi nyerő cél?',
        options: ['A 20 elérése', 'A 19 elérése', 'A 18 elérése', 'A 21 elérése'],
        correctAnswer: 'A 20 elérése',
        explanation: 'Aki 20-ra lép, az ellenfelét a 21 kimondására kényszeríti, mert a legkisebb megengedett lépés 1 (20 + 1 = 21).',
        breakdown: [
          { label: 'Vesztő szám', value: '21' },
          { label: 'Nyerő cél', value: '20' }
        ],
        hint: 'Melyik számnál kényszerül az ellenfél 21-re lépni?'
      },
      {
        id: 'q2-27',
        prompt: 'Egy számversenyben a cél a 30 elérése 0-ról, felváltva 1-től 4-ig lehet hozzáadni. Ki rendelkezik nyerő stratégiával?',
        options: [
          'A második játékos, mert 30 osztható 5-tel (k + 1 = 5)',
          'A kezdő játékos 1-gyel',
          'A kezdő játékos 4-gyel',
          'Döntetlen lesz'
        ],
        correctAnswer: 'A második játékos, mert 30 osztható 5-tel (k + 1 = 5)',
        explanation: 'A ciklus hossza 4 + 1 = 5. Mivel 30 = 6 · 5 (maradék 0), a második játékos minden körben 5-re egészítve biztosan eléri a 30-at.',
        breakdown: [
          { label: 'Ciklusméret', value: '5' },
          { label: '30 mod 5', value: '0 ⟹ Második játékos nyer' }
        ],
        hint: 'Osztható-e a 30 a ciklusmérettel (4 + 1 = 5)?'
      },
      {
        id: 'q2-28',
        prompt: 'Ha a fenti (cél: 30, lépés: 1–4) játékban az ellenfél 3-at lép, mennyit kell lépnünk a kiegészítő stratégiával?',
        options: ['2-t', '3-at', '1-et', '4-et'],
        correctAnswer: '2-t',
        explanation: 'A két lépés összegének a ciklusméretnek (5-nek) kell lennie: 5 - 3 = 2.',
        breakdown: [
          { label: 'Ciklus', value: '5' },
          { label: 'Kiegészítés', value: '5 - 3 = 2' }
        ],
        hint: 'Egészítsd ki a 3-at 5-re!'
      },
      {
        id: 'q2-29',
        prompt: 'Két egyenlő kupacban 6-6 gyufa van. Egy lépésben tetszőleges számú gyufa elvihető az egyikből. Aki az utolsót elveszi, nyer. Ki nyer és hogyan?',
        options: [
          'A második játékos a szimmetrikus tükrözéssel (ugyanannyit vesz a másikból)',
          'A kezdő játékos 1 gyufa elvételével',
          'A kezdő játékos a teljes kupac elvitelével',
          'Mindig döntetlen'
        ],
        correctAnswer: 'A második játékos a szimmetrikus tükrözéssel (ugyanannyit vesz a másikból)',
        explanation: 'Mivel a kezdeti állás szimmetrikus (6; 6), a második játékos mindig helyre tudja állítani az egyenlőséget, így ő viszi el az utolsó szálat.',
        breakdown: [
          { label: 'Kezdőállapot', value: '(6; 6) - egyenlő' },
          { label: 'Stratégia', value: 'Második lemásolja a lépést a másik kupacon' }
        ],
        hint: 'Tükrözd a kezdő lépését a másik kupacon!'
      },
      {
        id: 'q2-30',
        prompt: 'Mi az állítás megfordítása: „Ha egy szám osztható 6-tal, akkor páros.”?',
        options: [
          '„Ha egy szám páros, akkor osztható 6-tal.” (és ez hamis)',
          '„Ha egy szám nem osztható 6-tal, akkor nem páros.”',
          '„Ha egy szám páros, akkor nem osztható 6-tal.”',
          '„Ha egy szám nem páros, akkor osztható 6-tal.”'
        ],
        correctAnswer: '„Ha egy szám páros, akkor osztható 6-tal.” (és ez hamis)',
        explanation: 'A „ha A, akkor B” megfordítása: „ha B, akkor A”. Az állítás megfordítása („ha egy szám páros, akkor osztható 6-tal”) hamis (pl. a 4 páros, de nem osztható 6-tal).',
        breakdown: [
          { label: 'Eredeti állítás', value: 'A ⟹ B (Igaz)' },
          { label: 'Megfordítás', value: 'B ⟹ A (Hamis, ellenpélda: 4, 8, 10)' }
        ],
        hint: 'Cseréld fel a feltételt és a következményt!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesterfokú Számelmélet és Összetett Stratégiák',
    subtitle: 'Nagy hatványok összehasonlítása, bonyolult osztókérdések, alaptételek és invariánsok (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Algebrai átalakítások, szélsőértékek, Zermelo tétele és összetett logikai problémák',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Számítsd ki a tört pontos értékét: 6⁴ : (2³ · 3³)',
        options: ['6', '36', '12', '18'],
        correctAnswer: '6',
        explanation: '6⁴ = (2 · 3)⁴ = 2⁴ · 3⁴. Ezt elosztva (2³ · 3³)-nal: 2⁴⁻³ · 3⁴⁻³ = 2¹ · 3¹ = 6.',
        breakdown: [
          { label: 'Számláló átalakítása', value: '6⁴ = 2⁴ · 3⁴' },
          { label: 'Osztás', value: '2⁴⁻³ · 3⁴⁻³ = 2 · 3 = 6' }
        ],
        hint: 'Bontsd fel a 6-ot 2 · 3-ra!'
      },
      {
        id: 'q3-2',
        prompt: 'Egyszerűsítsd a kifejezést: [(2³)⁴ · 8²] : 4⁷',
        options: ['16', '32', '8', '64'],
        correctAnswer: '16',
        explanation: 'Minden alapot írjunk fel 2 hatványaként: (2³)⁴ = 2¹², 8² = (2³)² = 2⁶, 4⁷ = (2²)⁷ = 2¹⁴. Számláló: 2¹²⁺⁶ = 2¹⁸. Osztás: 2¹⁸ : 2¹⁴ = 2⁴ = 16.',
        breakdown: [
          { label: 'Számláló', value: '2¹² · 2⁶ = 2¹⁸' },
          { label: 'Nevező', value: '2¹⁴' },
          { label: 'Eredmény', value: '2¹⁸⁻¹⁴ = 2⁴ = 16' }
        ],
        hint: 'Írj minden tagot 2 hatványaként!'
      },
      {
        id: 'q3-3',
        prompt: 'Melyik szám a nagyobb: 2³⁰ vagy 3²⁰?',
        options: [
          '3²⁰ a nagyobb (mert 9¹⁰ > 8¹⁰)',
          '2³⁰ a nagyobb (mert a kitevő nagyobb)',
          'Pontosan egyenlőek',
          'Nem hasonlíthatóak össze'
        ],
        correctAnswer: '3²⁰ a nagyobb (mert 9¹⁰ > 8¹⁰)',
        explanation: 'Közös kitevőre hozunk: 2³⁰ = (2³)¹⁰ = 8¹⁰. 3²⁰ = (3²)¹⁰ = 9¹⁰. Mivel 9 > 8, ezért 9¹⁰ > 8¹⁰, azaz 3²⁰ > 2³⁰.',
        breakdown: [
          { label: '2³⁰ alakja', value: '(2³)¹⁰ = 8¹⁰' },
          { label: '3²⁰ alakja', value: '(3²)¹⁰ = 9¹⁰' },
          { label: 'Összehasonlítás', value: '9¹⁰ > 8¹⁰ ⟹ 3²⁰ > 2³⁰' }
        ],
        hint: 'Hozd mindkét számot 10-es kitevőre: (2³)¹⁰ és (3²)¹⁰!'
      },
      {
        id: 'q3-4',
        prompt: 'Melyik szám a nagyobb: 5²⁰ vagy 2⁵⁰?',
        options: [
          '2⁵⁰ a nagyobb (mert 32¹⁰ > 25¹⁰)',
          '5²⁰ a nagyobb (mert az alap nagyobb)',
          'Egyenlőek',
          'Nem dönthető el'
        ],
        correctAnswer: '2⁵⁰ a nagyobb (mert 32¹⁰ > 25¹⁰)',
        explanation: 'Közös kitevő 10: 5²⁰ = (5²)¹⁰ = 25¹⁰. 2⁵⁰ = (2⁵)¹⁰ = 32¹⁰. Mivel 32 > 25, ezért 32¹⁰ > 25¹⁰ ⟹ 2⁵⁰ > 5²⁰.',
        breakdown: [
          { label: '5²⁰', value: '(5²)¹⁰ = 25¹⁰' },
          { label: '2⁵⁰', value: '(2⁵)¹⁰ = 32¹⁰' },
          { label: 'Eredmény', value: '32¹⁰ > 25¹⁰ ⟹ 2⁵⁰ > 5²⁰' }
        ],
        hint: 'Hozd mindkettőt 10-es kitevőre!'
      },
      {
        id: 'q3-5',
        prompt: 'Hány darab 0-ra végződik a szorzat: 1 · 2 · 3 · ... · 10 (10 faktoriális)?',
        options: ['2 darab 0-ra', '1 darab 0-ra', '3 darab 0-ra', '4 darab 0-ra'],
        correctAnswer: '2 darab 0-ra',
        explanation: 'Egy végső 0 egy 2-es és egy 5-ös prímtényező szorzatából (2 · 5 = 10) keletkezik. 1-től 10-ig két 5-ös tényező van (az 5-ben és a 10-ben), miközben 2-es tényezőből sokkal több van. Ezért pontosan 2 darab 0-ra végződik.',
        breakdown: [
          { label: '5-ös prímek száma', value: '2 db (5 és 10)' },
          { label: '2-es prímek száma', value: 'több mint 2' },
          { label: 'Végződő nullák', value: '2 db 0' }
        ],
        hint: 'Hány 5-ös prímtényező fordul elő 1 és 10 között?'
      },
      {
        id: 'q3-6',
        prompt: 'Egy természetes számnak pontosan 3 darab pozitív osztója van. Milyen szám ez feltétlenül?',
        options: [
          'Egy prímszám négyzete (p²)',
          'Egy tetszőleges páros szám',
          'Bármely négyzetszám',
          'Egy prím köbe (p³)'
        ],
        correctAnswer: 'Egy prímszám négyzete (p²)',
        explanation: 'Ha d(n) = 3, akkor az osztószám-képlet szerint a prímtényezős felbontás csak p² alakú lehet, mert (2 + 1) = 3. Az osztói: 1, p, p² (pl. 4, 9, 25, 49).',
        breakdown: [
          { label: 'Képlet', value: 'd(n) = α + 1 = 3 ⟹ α = 2' },
          { label: 'Alak', value: 'n = p² (prímszám négyzete)' }
        ],
        hint: 'Hogyan adódhat az osztószám szorzata 3-nak?'
      },
      {
        id: 'q3-7',
        prompt: 'Milyen alakú egy szám prímfelbontása, ha pontosan 4 pozitív osztója van?',
        options: [
          'p³ vagy p · q (ahol p, q különböző prímek)',
          'Csak p⁴ lehet',
          'Csak 2 · p lehet',
          'Csak p² · q lehet'
        ],
        correctAnswer: 'p³ vagy p · q (ahol p, q különböző prímek)',
        explanation: 'A 4 felírható 3 + 1-ként (ekkor n = p³, pl. 8 osztói: 1, 2, 4, 8) vagy (1 + 1)(1 + 1)-ként (ekkor n = p · q, pl. 6 osztói: 1, 2, 3, 6).',
        breakdown: [
          { label: '1. eset', value: '3 + 1 = 4 ⟹ n = p³' },
          { label: '2. eset', value: '(1 + 1)(1 + 1) = 4 ⟹ n = p · q' }
        ],
        hint: 'Hogyan bontható a 4 szorzatra: 4 = 4 vagy 4 = 2 · 2.'
      },
      {
        id: 'q3-8',
        prompt: 'Hány pozitív egész osztója van a 360-nak?',
        options: ['24', '18', '20', '30'],
        correctAnswer: '24',
        explanation: '360 = 36 · 10 = 2³ · 3² · 5¹. Az osztók száma: d(360) = (3 + 1)(2 + 1)(1 + 1) = 4 · 3 · 2 = 24.',
        breakdown: [
          { label: 'Kanonikus alak', value: '2³ · 3² · 5¹' },
          { label: 'd(360)', value: '(3+1)(2+1)(1+1) = 4 · 3 · 2 = 24' }
        ],
        hint: 'Írd fel a 360-at prímek szorzataként!'
      },
      {
        id: 'q3-9',
        prompt: 'Hány olyan kétjegyű pozitív egész szám van, amelynek páratlan számú osztója van?',
        options: ['6 darab', '5 darab', '7 darab', '10 darab'],
        correctAnswer: '6 darab',
        explanation: 'Páratlan számú osztója csak a négyzetszámoknak van. A kétjegyű négyzetszámok: 16 (4²), 25 (5²), 36 (6²), 49 (7²), 64 (8²), 81 (9²). Ez pontosan 6 darab szám.',
        breakdown: [
          { label: 'Feltétel', value: 'Kétjegyű négyzetszámok' },
          { label: 'Számok', value: '16, 25, 36, 49, 64, 81 (6 db)' }
        ],
        hint: 'Melyik kétjegyű számok négyzetszámok 10 és 99 között?'
      },
      {
        id: 'q3-10',
        prompt: 'Ha LNKO(a, b) = 6 és LKKT(a, b) = 72, és tudjuk, hogy a = 18, mennyi b értéke?',
        options: ['24', '36', '12', '48'],
        correctAnswer: '24',
        explanation: 'LNKO · LKKT = a · b összefüggésből: 6 · 72 = 18 · b ⟹ 432 = 18 · b ⟹ b = 432 : 18 = 24.',
        breakdown: [
          { label: 'Alaptétel', value: 'a · b = LNKO · LKKT' },
          { label: 'Egyenlet', value: '18 · b = 6 · 72 = 432' },
          { label: 'b értéke', value: '432 : 18 = 24' }
        ],
        hint: 'Használd a képletet: a · b = LNKO · LKKT!'
      },
      {
        id: 'q3-11',
        prompt: 'Ha a = 2³ · 3² · 5 és b = 2² · 3⁴ · 7, mennyi az LNKO(a, b)?',
        options: ['36', '72', '18', '108'],
        correctAnswer: '36',
        explanation: 'A közös prímtényezők a legkisebb kitevőn: 2² · 3² = 4 · 9 = 36.',
        breakdown: [
          { label: 'Közös prímek', value: '2 és 3' },
          { label: 'LNKO', value: '2² · 3² = 36' }
        ],
        hint: 'A közös prímek kisebb kitevőjét szorozd össze!'
      },
      {
        id: 'q3-12',
        prompt: 'Az előző feladat számaira (a = 2³ · 3² · 5 és b = 2² · 3⁴ · 7) mennyi az LKKT(a, b) hatványalakban?',
        options: [
          '2³ · 3⁴ · 5 · 7',
          '2² · 3² · 5 · 7',
          '2³ · 3⁴',
          '2⁵ · 3⁶ · 5 · 7'
        ],
        correctAnswer: '2³ · 3⁴ · 5 · 7',
        explanation: 'Az összes előforduló prímtényező a legnagyobb kitevőn: 2³ · 3⁴ · 5¹ · 7¹.',
        breakdown: [
          { label: 'Összes prím', value: '2, 3, 5, 7' },
          { label: 'Nagyobb kitevők', value: '2³ · 3⁴ · 5 · 7' }
        ],
        hint: 'Minden előforduló prímet vegyél a legnagyobb kitevőjén!'
      },
      {
        id: 'q3-13',
        prompt: 'A 3a4b négyjegyű szám osztható 36-tal. Melyik a lehető legnagyobb értéke b-nek, és mi ekkor a hozzá tartozó a?',
        options: ['b = 8 és a = 3', 'b = 6 és a = 5', 'b = 8 és a = 7', 'b = 4 és a = 7'],
        correctAnswer: 'b = 8 és a = 3',
        explanation: '36 = 4 · 9. A 4b akkor osztható 4-gyel, ha b ∈ {0, 4, 8}. A legnagyobb b = 8. Ekkor a jegyösszeg 3+a+4+8 = 15+a. Hogy 9-cel osztható legyen, a = 3 kell legyen (15+3=18).',
        breakdown: [
          { label: '4-es szabály (b)', value: '4b osztható 4-gyel ⟹ b_max = 8' },
          { label: '9-es szabály (a)', value: '3+a+4+8 = 15+a osztható 9-cel ⟹ a = 3' }
        ],
        hint: 'A 4b-nek 4-gyel, a számjegyek összegének 9-cel kell oszthatónak lennie!'
      },
      {
        id: 'q3-14',
        prompt: 'Miért nem lenne helyes a 36-tal való oszthatóságot úgy ellenőrizni, hogy a szám osztható-e 6-tal és 6-tal?',
        options: [
          'Mert a 6 és 6 nem relatív prímek (közös osztójuk a 6)',
          'Mert a 6 nem prímszám',
          'Mert a 36 páratlan',
          'Helyes lenne, nincs benne hiba'
        ],
        correctAnswer: 'Mert a 6 és 6 nem relatív prímek (közös osztójuk a 6)',
        explanation: 'Az összetett szabály feltétele, hogy a tényezők relatív prímek legyenek. Pl. a 12 osztható 6-tal, de 36-tal nem!',
        breakdown: [
          { label: 'Feltétel', value: 'Tényezők relatív prímek kell legyenek' },
          { label: 'LNKO(6, 6)', value: '6 ≠ 1 ⟹ nem relatív prímek' }
        ],
        hint: 'Relatív prímek-e az azonos számok?'
      },
      {
        id: 'q3-15',
        prompt: 'Egy 420 cm × 540 cm méretű téglalap alakú teraszt a legkevesebb számú, egyforma négyzet alakú járólappal burkolunk. Hány darab járólap kell?',
        options: ['63 darab', '70 darab', '60 darab', '54 darab'],
        correctAnswer: '63 darab',
        explanation: 'A járólap maximális oldalhossza LNKO(420, 540) = 60 cm. Az oldalak mentén 420 : 60 = 7 és 540 : 60 = 9 lap fér el. Összesen: 7 · 9 = 63 darab.',
        breakdown: [
          { label: 'Lapméret', value: 'LNKO(420, 540) = 60 cm' },
          { label: 'Darabszám', value: '(420 : 60) · (540 : 60) = 7 · 9 = 63' }
        ],
        hint: 'Keresd meg a 420 és 540 legnagyobb közös osztóját, majd szorozd össze a két oldal darabszámait!'
      },
      {
        id: 'q3-16',
        prompt: 'Három futó körideje a pályán 60, 75 és 90 másodperc. Ha egyszerre indultak a rajtvonalról, hány másodperc múlva érnek legközelebb egyszerre oda?',
        options: ['900 másodperc (15 perc)', '450 másodperc', '1800 másodperc', '300 másodperc'],
        correctAnswer: '900 másodperc (15 perc)',
        explanation: 'LKKT(60, 75, 90) = 2² · 3² · 5² = 4 · 9 · 25 = 900 másodperc = 15 perc.',
        breakdown: [
          { label: 'Prímbontások', value: '60=2²·3·5, 75=3·5², 90=2·3²·5' },
          { label: 'LKKT', value: '2² · 3² · 5² = 900 mp' }
        ],
        hint: 'Keresd meg a három szám legkisebb közös többszörösét!'
      },
      {
        id: 'q3-17',
        prompt: 'A 100-as játékban 0-ról indulva felváltva 1-től 10-ig adhatunk hozzá. Aki 100-at mond, nyer. Mit mondjon a kezdő az első lépésben a biztos győzelemhez?',
        options: ['1-et', '10-et', '5-öt', 'Nem tud biztosan nyerni'],
        correctAnswer: '1-et',
        explanation: 'A ciklus hossza 10 + 1 = 11. 100 = 9 · 11 + 1. A maradék 1, tehát a kezdő az 1 kimondásával megszerzi a nyerő pozíciót.',
        breakdown: [
          { label: 'Ciklus', value: '11' },
          { label: '100 mod 11', value: '1 ⟹ Kezdő 1-et mond' }
        ],
        hint: 'Oszd el a 100-at a ciklusmérettel (11-gyel)!'
      },
      {
        id: 'q3-18',
        prompt: 'A 100-as számversenyben (lépés: 1–10, cél: 100) mi a 100 előtti közvetlen utolsó kulcspozíció?',
        options: ['89', '90', '91', '99'],
        correctAnswer: '89',
        explanation: 'A 100-ból levonjuk a ciklusméretet: 100 - 11 = 89. Aki 89-re lép, az ellenfél bármely lépésére egyből eléri a 100-at.',
        breakdown: [
          { label: 'Cél', value: '100' },
          { label: 'Ciklus', value: '11' },
          { label: 'Előző kulcsszám', value: '100 - 11 = 89' }
        ],
        hint: 'Vonj le 11-et a 100-ból!'
      },
      {
        id: 'q3-19',
        prompt: 'Egy kerek asztalra két játékos felváltva helyez el egyforma érméket (nem fedhetik egymást). Aki nem tud tenni, veszít. Ki nyer és miért?',
        options: [
          'A kezdő nyer: a középpontba tesz, majd pontszimmetrikusan tükrözi az ellenfél lépéseit',
          'A második játékos nyer, mert lemásolhatja a kezdőt',
          'Döntetlen lesz',
          'A kezdő nyer, ha a szélére tesz'
        ],
        correctAnswer: 'A kezdő nyer: a középpontba tesz, majd pontszimmetrikusan tükrözi az ellenfél lépéseit',
        explanation: 'A kezdő lefoglalja az asztal egyetlen önmagába forduló pontját (a középpontot). Ezután a kör szimmetriája miatt az ellenfél bármely lépésére létezik egy szabad tükörkép.',
        breakdown: [
          { label: 'Kezdő 1. lépés', value: 'Geometriai középpont' },
          { label: 'Stratégia', value: 'Középpontos tükrözés' }
        ],
        hint: 'Melyik pontnak nincs párja a körben?'
      },
      {
        id: 'q3-20',
        prompt: 'A táblán 25 darab 1-es van felírva. Egy lépésben kettőt letörlünk és felírjuk összegüket vagy különbségüket. Lehet-e az utoljára megmaradó szám 0?',
        options: [
          'Nem, mert az összeg paritása invariáns és eredetileg páratlan (25)',
          'Igen, ha mindig a különbségeket írjuk',
          'Igen, páros sok lépés után',
          'Csak akkor, ha 1-est sem hagyunk'
        ],
        correctAnswer: 'Nem, mert az összeg paritása invariáns és eredetileg páratlan (25)',
        explanation: 'Két szám összegének és különbségének paritása azonos. A számok összege minden lépésben megőrzi paritását. 25 darab 1-es összege 25 (páratlan), így a végső szám is páratlan kell legyen; a 0 páros, tehát kizárt.',
        breakdown: [
          { label: 'Kezdeti összeg', value: '25 (páratlan)' },
          { label: 'Invariáns', value: 'Paritás megmarad' },
          { label: '0 paritása', value: 'Páros ⟹ Nem lehet 0' }
        ],
        hint: 'Változik-e az összeg párossága, ha a + b helyett |a - b|-t veszel?'
      },
      {
        id: 'q3-21',
        prompt: 'Egy 8×8-as sakktábla két átellenes sarkát levágtuk (maradt 62 mező). Lefedhető-e ez 31 db 2×1-es dominóval?',
        options: [
          'Nem, mert a levágott sarkok azonos színűek, így a fekete és fehér mezők száma nem egyenlő',
          'Igen, mert 62 mező = 31 dominó',
          'Igen, átlós elrendezéssel',
          'Csak 10×10-es táblán'
        ],
        correctAnswer: 'Nem, mert a levágott sarkok azonos színűek, így a fekete és fehér mezők száma nem egyenlő',
        explanation: 'Minden 2×1-es dominó 1 fehéret és 1 feketét fed le. Az átellenes sarkok azonos színűek (pl. mindkettő fehér), így 30 fehér és 32 fekete mező marad. 31 dominóhoz 31-31 mező kellene, ami lehetetlen.',
        breakdown: [
          { label: 'Színarány', value: '30 fehér, 32 fekete' },
          { label: 'Dominó fedése', value: '1 fehér + 1 fekete' },
          { label: 'Eredmény', value: 'Lefedhetetlen' }
        ],
        hint: 'Milyen színű mezőket fed le egyetlen dominó?'
      },
      {
        id: 'q3-22',
        prompt: 'Osztókivonós játék a 60-as számmal: felváltva levonjuk egy valódi osztóját. Aki eléri az 1-et, veszít. Milyen paritású számot kell adni az ellenfélnek?',
        options: [
          'Páratlan számot, mert annak csak páratlan osztói vannak, így ő párost kénytelen visszaadni',
          'Páros számot, mert annak több osztója van',
          '1-et',
          'Nem számít a paritás'
        ],
        correctAnswer: 'Páratlan számot, mert annak csak páratlan osztói vannak, így ő párost kénytelen visszaadni',
        explanation: 'Egy páratlan szám minden osztója páratlan. Így Páratlan - Páratlan osztó = Páros számot ad vissza nekünk. Mi pedig a párosból páratlan osztót levonva ismét páratlant adunk neki, egészen az 1-ig (ami páratlan vesztő állás).',
        breakdown: [
          { label: 'Kezdő lépése', value: 'Páros - Páratlan osztó = Páratlan' },
          { label: 'Ellenfél válasza', value: 'Páratlan - Páratlan osztó = Páros' }
        ],
        hint: 'Milyen osztói lehetnek egy páratlan számnak?'
      },
      {
        id: 'q3-23',
        prompt: 'Mi a szükséges és elégséges feltétele annak, hogy egy egész szám osztható legyen 10-zel?',
        options: [
          'Az utolsó számjegye 0 legyen',
          'Osztható legyen 2-vel',
          'Osztható legyen 5-tel',
          'A számjegyek összege 10 legyen'
        ],
        correctAnswer: 'Az utolsó számjegye 0 legyen',
        explanation: 'A 10-zel való oszthatóság akkor és csak akkor teljesül (szükséges és elégséges), ha a szám utolsó számjegye pontosan 0.',
        breakdown: [
          { label: 'Szükséges és elégséges', value: 'Akkor és csak akkor, ha...' },
          { label: 'Feltétel', value: 'Utolsó számjegy = 0' }
        ],
        hint: 'Milyen feltétel jelenti pontosan ugyanazt, mint a 10-zel való oszthatóság?'
      },
      {
        id: 'q3-24',
        prompt: 'Igaz-e, hogy a 4-gyel való oszthatóság SZÜKSÉGES feltétele a 2-vel való oszthatóságnak?',
        options: [
          'Nem, a 4-gyel való oszthatóság ELÉGSÉGES feltétel (ha osztható 4-gyel, abból már következik a 2)',
          'Igen, mert 4 nagyobb mint 2',
          'Igen, minden 2-vel osztható szám osztható 4-gyel is',
          'Egyik sem, a kettő független'
        ],
        correctAnswer: 'Nem, a 4-gyel való oszthatóság ELÉGSÉGES feltétel (ha osztható 4-gyel, abból már következik a 2)',
        explanation: 'A 4-gyel oszthatóság nem szükséges (pl. a 6 osztható 2-vel, mégsem osztható 4-gyel). Viszont elégséges: ha egy szám osztható 4-gyel, akkor garantáltan osztható 2-vel is.',
        breakdown: [
          { label: 'Szükséges?', value: 'Nem (pl. 6 osztható 2-vel, de 4-gyel nem)' },
          { label: 'Elégséges?', value: 'Igen (4-gyel osztható ⟹ 2-vel is osztható)' }
        ],
        hint: 'Gondolj a 6-ra vagy a 10-re: oszthatók 2-vel, de 4-gyel nem!'
      },
      {
        id: 'q3-25',
        prompt: 'Mi a különbség aⁿ · aᵐ és (aⁿ)ᵐ között?',
        options: [
          'A szorzatnál a kitevők összeadódnak (aⁿ⁺ᵐ), a hatványozásnál szorzódnak (aⁿᵐ)',
          'Nincs különbség, mindkettő ugyanaz',
          'A szorzatnál szorzódnak, a hatványozásnál összeadódnak',
          'Csak negatív alapoknál van különbség'
        ],
        correctAnswer: 'A szorzatnál a kitevők összeadódnak (aⁿ⁺ᵐ), a hatványozásnál szorzódnak (aⁿᵐ)',
        explanation: 'aⁿ · aᵐ = aⁿ⁺ᵐ (azonos alapok szorzása), míg (aⁿ)ᵐ = aⁿ·ᵐ (hatvány hatványozása).',
        breakdown: [
          { label: 'aⁿ · aᵐ', value: 'aⁿ⁺ᵐ (összeadás)' },
          { label: '(aⁿ)ᵐ', value: 'aⁿ·ᵐ (szorzás)' }
        ],
        hint: '2³ · 2² = 2⁵, de (2³)² = 2⁶.'
      },
      {
        id: 'q3-26',
        prompt: 'Mennyi (-1)ⁿ + (-1)ⁿ⁺¹ értéke bármely természetes n szám esetén?',
        options: ['0', '2', '-2', 'n-től függően változik'],
        correctAnswer: '0',
        explanation: 'Az n és n+1 egymást követő egészek, így az egyikük biztosan páros, a másik páratlan. Ezért az egyik hatvány +1, a másik -1 lesz. Összegük mindig: 1 + (-1) = 0.',
        breakdown: [
          { label: 'Paritás', value: 'Egyik páros (+1), másik páratlan (-1)' },
          { label: 'Összeg', value: '+1 + (-1) = 0' }
        ],
        hint: 'Lehet-e két egymást követő egész szám azonos paritású?'
      },
      {
        id: 'q3-27',
        prompt: 'Melyik a legkisebb olyan pozitív egész szám, amelynek pontosan 10 darab pozitív osztója van?',
        options: ['48', '512', '96', '36'],
        correctAnswer: '48',
        explanation: '10 = 2 · 5 ⟹ a kanonikus alak lehet p⁴ · q¹ vagy p⁹. A legkisebb értékek: 2⁴ · 3¹ = 16 · 3 = 48, illetve 2⁹ = 512. A legkisebb szám a 48.',
        breakdown: [
          { label: '1. lehetőség', value: '2⁴ · 3¹ = 16 · 3 = 48' },
          { label: '2. lehetőség', value: '2⁹ = 512' },
          { label: 'Minimum', value: '48' }
        ],
        hint: '10 = 5 · 2, a kitevők 4 és 1 lehetnek (2⁴ · 3).'
      },
      {
        id: 'q3-28',
        prompt: 'Ha egy a/b tört tovább nem egyszerűsíthető (törzstört alak), mit mondhatunk a és b viszonyáról?',
        options: [
          'a és b relatív prímek, azaz LNKO(a, b) = 1',
          'Mindkettő prímszám',
          'a kisebb mint b',
          'Összegük páratlan'
        ],
        correctAnswer: 'a és b relatív prímek, azaz LNKO(a, b) = 1',
        explanation: 'Egy tört akkor nem egyszerűsíthető, ha számlálójának és nevezőjének nincs 1-nél nagyobb közös osztója, vagyis LNKO(a, b) = 1.',
        breakdown: [
          { label: 'Egyszerűsíthetetlen', value: 'Nincs közös osztó > 1' },
          { label: 'Definíció', value: 'LNKO(a, b) = 1 ⟹ Relatív prímek' }
        ],
        hint: 'Mivel tudnád még egyszerűsíteni, ha lenne közös osztójuk?'
      },
      {
        id: 'q3-29',
        prompt: 'Zermelo tétele szerint mit állíthatunk a 21-es játékról és a hasonló véges, teljes információjú kétszemélyes játékokról?',
        options: [
          'A két játékos közül pontosan az egyiknek létezik biztos nyerő stratégiája',
          'Bármelyik játékos nyerhet egyenlő eséllyel',
          'A kezdő játékos mindig veszít',
          'Minden játék döntetlennel ér véget'
        ],
        correctAnswer: 'A két játékos közül pontosan az egyiknek létezik biztos nyerő stratégiája',
        explanation: 'Zermelo tétele kimondja, hogy véges, véletlent nem tartalmazó, teljes információjú determinisztikus játékban a kezdő vagy a második játékosnak garantáltan van nyerő (vagy döntetlent biztosító) stratégiája.',
        breakdown: [
          { label: 'Tétel', value: 'Ernst Zermelo (1913)' },
          { label: 'Következmény', value: 'Pontosan az egyik játékosnak van nyerő stratégiája' }
        ],
        hint: 'A matematika kizárja a véletlent ebben a játékban!'
      },
      {
        id: 'q3-30',
        prompt: 'Hogyan definiálja a játékelmélet a biztos „nyerő stratégiát”?',
        options: [
          'Egy olyan lépéssorozatot vagy algoritmust, amely az ellenfél bármely szabályos lépésére választ ad és garantálja a győzelmet',
          'Egy gyors taktikai cselt az első lépésben',
          'Az ellenfél figyelmetlenségének kihasználását',
          'Egy magas valószínűségű tippelést'
        ],
        correctAnswer: 'Egy olyan lépéssorozatot vagy algoritmust, amely az ellenfél bármely szabályos lépésére választ ad és garantálja a győzelmet',
        explanation: 'A nyerő stratégia nem feltételez ellenféli hibát: ez egy olyan döntési fa / szabályrendszer, amelyet betartva a játékos az ellenfél lehető legtökéletesebb játéka mellett is biztosan megnyeri a játékot.',
        breakdown: [
          { label: 'Definíció', value: 'Garantált győzelem bármely válasz mellett' },
          { label: 'Feltétel', value: 'Determinisztikus, nem alapul hibán' }
        ],
        hint: 'A matematikai bizonyításnak minden esetre működnie kell!'
      }
    ]
  }
};

export const PowersSummaryQuiz: React.FC<PowersSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-summary"
      topicTitle="11. Összefoglalás"
      subtopicId="osszefoglalas"
      documentId="grade-7-hatvanyozas-osszefoglalas-quiz"
      emoji="🏆"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság és Számelmélet"
      title="Hatványozás és Oszthatóság – Fejezeti Összefoglaló Kvíz"
      subtitle="Átfogó fejezeti szintézis: hatványozási azonosságok, normálalak, oszthatósági szabályrendszer, prímfelbontás, d(n), LNKO, LKKT és játékstratégiák 3 szinten 90 mesterfeladaton!"
      cheatSheetTitle="Fejezeti Rendszerező Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<PowersSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PowersSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="slate"
      hintText="💡 Használd a felül megnyitható szabálytárat a képletekhez, az azonosságokhoz és a d(n) szabályhoz!"
    />
  );
};

export default PowersSummaryQuiz;
