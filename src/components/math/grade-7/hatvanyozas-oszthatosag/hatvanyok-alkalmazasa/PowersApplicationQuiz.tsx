import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowersApplicationMatcher } from './PowersApplicationMatcher';
import { PowersApplicationSorter } from './PowersApplicationSorter';
import {
  Zap,
  Calculator,
  Binary,
  Layers,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Hash
} from 'lucide-react';

interface PowersApplicationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Azonos Alapú Hatványok Szorzása & Osztása',
    icon: <Binary className="w-4 h-4 text-amber-600" />,
    formula: 'aⁿ · aᵏ = aⁿ⁺ᵏ  és  aⁿ : aᵏ = aⁿ⁻ᵏ (a ≠ 0)',
    note: 'Szorzáskor az alapot változatlanul hagyjuk, a kitevőket összeadjuk. Osztáskor a számláló kitevőjéből kivonjuk a nevező kitevőjét.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="68" height="34" rx="8" className="fill-amber-100 stroke-amber-300" />
        <text x="14" y="30" className="text-[11px] font-mono font-bold fill-amber-800">2³ · 2⁴ = 2⁷</text>
        <rect x="85" y="8" width="68" height="34" rx="8" className="fill-orange-100 stroke-orange-300" />
        <text x="94" y="30" className="text-[11px] font-mono font-bold fill-orange-800">5⁶ : 5² = 5⁴</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Hatvány Hatványozása',
    icon: <Zap className="w-4 h-4 text-purple-600" />,
    formula: '(aⁿ)ᵏ = aⁿ · ᵏ',
    note: 'Hatvány hatványozásakor a kitevőket összeszorozzuk! Zárójel nélkül: 2^(3²) = 2⁹ = 512, de (2³)² = 2⁶ = 64!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="8" className="fill-purple-100 stroke-purple-300" />
        <text x="24" y="30" className="text-[11px] font-mono font-bold fill-purple-900">(3²)⁴ = 3²·⁴ = 3⁸</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Szorzat és Tört Hatványozása',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: '(a · b)ⁿ = aⁿ · bⁿ  és  (a / b)ⁿ = aⁿ / bⁿ',
    note: 'Minden tényezőt, számlálót és nevezőt külön emelünk a hatványra. Visszafelé: azonos kitevőnél az alapok összeszorozhatók: 4⁵ · 25⁵ = (4 · 25)⁵ = 100⁵!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-blue-100 stroke-blue-300" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-blue-900">(2·5)³ = 10³</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-teal-100 stroke-teal-300" />
        <text x="92" y="29" className="text-[10px] font-mono font-bold fill-teal-900">(2/3)³=8/27</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Veszélyzónák & Tipikus Hibák',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '2³ + 2⁴ ≠ 2⁷  és  (3a)² = 9a² (nem 3a²!)',
    note: 'Összeadásnál a kitevők nem adódnak össze! Csak azonos tagok összeadásakor van egyszerűsítés: 2⁴ + 2⁴ = 2 · 2⁴ = 2⁵!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-rose-100 stroke-rose-300" />
        <text x="15" y="29" className="text-[10px] font-mono font-bold fill-rose-800">2³+2⁴ = 24</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="91" y="29" className="text-[10px] font-mono font-bold fill-emerald-800">2⁴+2⁴ = 2⁵</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Azonosságok Alkalmazása',
    subtitle: 'Azonos alapú szorzás, osztás, hatvány hatványozása és egyszerű műveletek',
    range: '1 - 10. feladat',
    focus: 'Közvetlen szabályok és egyszerű számítások',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a 2³ · 2⁴ szorzat értéke egyetlen hatvány alakban kifejezve?',
        options: ['2⁷', '4⁷', '2¹²', '4¹²'],
        correctAnswer: '2⁷',
        explanation: 'Azonos alapú hatványok szorzásakor az alapot változatlanul hagyjuk, és a kitevőket összeadjuk: 2³ · 2⁴ = 2³⁺⁴ = 2⁷ (értéke 128).',
        breakdown: [
          { label: 'Szabály', value: 'aⁿ · aᵏ = aⁿ⁺ᵏ' },
          { label: 'Kitevők összege', value: '3 + 4 = 7' },
          { label: 'Eredmény', value: '2⁷' }
        ],
        hint: 'Az alapot nem szabad összeszorozni, csak a kitevőket összeadni!'
      },
      {
        id: 'q1-2',
        prompt: 'Hozd egyszerűbb hatványalakra a következő hányadost: 5⁶ : 5²!',
        options: ['5⁴', '5³', '1⁴', '5⁸'],
        correctAnswer: '5⁴',
        explanation: 'Azonos alapú hatványok osztásakor a kitevőket kivonjuk egymásból: 5⁶ : 5² = 5⁶⁻² = 5⁴ (értéke 625).',
        breakdown: [
          { label: 'Szabály', value: 'aⁿ : aᵏ = aⁿ⁻ᵏ' },
          { label: 'Kitevők különbsége', value: '6 - 2 = 4' },
          { label: 'Eredmény', value: '5⁴' }
        ],
        hint: 'Osztáskor nem osztjuk a kitevőket (6:2=3 helytelen!), hanem kivonjuk őket!'
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a (3²)³ kifejezés értéke?',
        options: ['3⁶ = 729', '3⁵ = 243', '6⁶', '9³ = 729'],
        correctAnswer: '3⁶ = 729',
        explanation: 'Hatvány hatványozásakor a kitevőket összeszorozzuk: (3²)³ = 3²·³ = 3⁶ = 729.',
        breakdown: [
          { label: 'Szabály', value: '(aⁿ)ᵏ = aⁿ·ᵏ' },
          { label: 'Kitevők szorzata', value: '2 · 3 = 6' },
          { label: 'Érték', value: '3⁶ = 729' }
        ],
        hint: 'Hatványozás hatványozásakor a kitevők szorzódnak, nem összeadódnak!'
      },
      {
        id: 'q1-4',
        prompt: 'Számítsd ki a (2 · 5)³ kifejezés értékét az azonosságok segítségével!',
        options: ['1 000', '100', '250', '30'],
        correctAnswer: '1 000',
        explanation: '(2 · 5)³ = 10³ = 1 000, vagy szorzat hatványozásával: 2³ · 5³ = 8 · 125 = 1 000.',
        breakdown: [
          { label: '1. Módszer', value: '2 · 5 = 10, majd 10³ = 1 000' },
          { label: '2. Módszer', value: '2³ · 5³ = 8 · 125 = 1 000' }
        ],
        hint: 'A zárójelben lévő szorzás elvégzésével 10³-t kapunk.'
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a (2/3)³ tört értéke?',
        options: ['8/27', '6/9', '8/9', '2/27'],
        correctAnswer: '8/27',
        explanation: 'Tört hatványozásakor mind a számlálót, mind a nevezőt külön köbre emeljük: (2/3)³ = 2³ / 3³ = 8 / 27.',
        breakdown: [
          { label: 'Számláló köbe', value: '2³ = 8' },
          { label: 'Nevező köbe', value: '3³ = 27' },
          { label: 'Eredmény', value: '8/27' }
        ],
        hint: 'Mind a számlálót, mind a nevezőt emeld köbre!'
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a következő műveletsor eredménye: 10⁴ · 10³ : 10⁵?',
        options: ['10² = 100', '10¹² = 1 000 000 000 000', '10⁷', '10'],
        correctAnswer: '10² = 100',
        explanation: 'Balról jobbra haladva az azonosságokkal: 10⁴ · 10³ = 10⁴⁺³ = 10⁷, majd 10⁷ : 10⁵ = 10⁷⁻⁵ = 10² = 100.',
        breakdown: [
          { label: '1. Szorzás', value: '10⁴ · 10³ = 10⁷' },
          { label: '2. Osztás', value: '10⁷ : 10⁵ = 10⁷⁻⁵ = 10²' },
          { label: 'Kiszámított érték', value: '100' }
        ],
        hint: 'Előbb add össze a szorzás kitevőit (4+3=7), majd vond ki az osztás kitevőjét (7-5=2)!'
      },
      {
        id: 'q1-7',
        prompt: 'Írd fel egyetlen hatvány alakban: x⁵ · x² · x !',
        options: ['x⁸', 'x⁷', 'x¹⁰', '3x⁷'],
        correctAnswer: 'x⁸',
        explanation: 'Ahol nincs kiírva kitevő, ott a kitevő 1: x = x¹. Ezért: x⁵ · x² · x¹ = x⁵⁺²⁺¹ = x⁸.',
        breakdown: [
          { label: 'Fontos szabály', value: 'x = x¹' },
          { label: 'Kitevők összege', value: '5 + 2 + 1 = 8' },
          { label: 'Eredmény', value: 'x⁸' }
        ],
        hint: 'Ne felejtsd el: a magában álló x kitevője 1!'
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi az a⁷ : a⁷ kifejezés értéke, ha a ≠ 0?',
        options: ['1', '0', 'a', 'a¹⁴'],
        correctAnswer: '1',
        explanation: 'Azonos alapú hatványok osztásakor: a⁷ : a⁷ = a⁷⁻⁷ = a⁰ = 1. Bármely számot önmagával osztva 1-et kapunk.',
        breakdown: [
          { label: 'Kitevők kivonása', value: '7 - 7 = 0' },
          { label: 'Nulladik hatvány', value: 'a⁰ = 1 (ha a ≠ 0)' }
        ],
        hint: 'Egy számot önmagával osztva mindig 1-et kapunk.'
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a (-2)³ · (-2)² szorzat értéke?',
        options: ['-32', '+32', '-64', '+64'],
        correctAnswer: '-32',
        explanation: 'Azonos alap a (-2): (-2)³ · (-2)² = (-2)³⁺² = (-2)⁵ = -32. Páratlan kitevő esetén negatív alap negatív eredményt ad.',
        breakdown: [
          { label: 'Azonos alap', value: '(-2)' },
          { label: 'Kitevők összege', value: '3 + 2 = 5' },
          { label: 'Hatványozás', value: '(-2)⁵ = -32' }
        ],
        hint: 'A kitevő 5 (páratlan), így az előjel negatív marad.'
      },
      {
        id: 'q1-10',
        prompt: 'Melyik állítás HIBÁS az alábbiak közül?',
        options: [
          '2³ + 2⁴ = 2⁷',
          '2³ · 2⁴ = 2⁷',
          '(2³)² = 2⁶',
          '(2 · 3)⁴ = 2⁴ · 3⁴'
        ],
        correctAnswer: '2³ + 2⁴ = 2⁷',
        explanation: '2³ + 2⁴ = 8 + 16 = 24, míg 2⁷ = 128. Hatványok összeadásakor a kitevők NEM adódnak össze, az azonosság csak szorzásra érvényes!',
        breakdown: [
          { label: 'Bal oldal', value: '2³ + 2⁴ = 8 + 16 = 24' },
          { label: 'Jobb oldal', value: '2⁷ = 128' },
          { label: 'Következtetés', value: '24 ≠ 128, az állítás hibás!' }
        ],
        hint: 'Keresd azt az opciót, ahol összeadás szerepel szorzás helyett!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Zárójelek, Algebra és Átírások',
    subtitle: 'Együtthatók hatványozása, azonos kitevők, alapok átírása és összevonások',
    range: '11 - 20. feladat',
    focus: 'Algebrai alakok, zárójeles szabályok és közös alapok',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Bontsd fel a zárójelet a következő kifejezésben: (3a)² !',
        options: ['9a²', '3a²', '6a²', '9a'],
        correctAnswer: '9a²',
        explanation: 'Szorzat hatványozásakor mindegyik tényezőt négyzetre kell emelni: (3a)² = 3² · a² = 9a².',
        breakdown: [
          { label: 'Együttható négyzete', value: '3² = 9' },
          { label: 'Változó négyzete', value: 'a²' },
          { label: 'Eredmény', value: '9a²' }
        ],
        hint: 'A zárójelben lévő számot (3) is négyzetre kell emelni!'
      },
      {
        id: 'q2-2',
        prompt: 'Egyszerűsítsd a következő kifejezést: (2x³)² !',
        options: ['4x⁶', '2x⁶', '4x⁵', '4x⁹'],
        correctAnswer: '4x⁶',
        explanation: '(2x³)² = 2² · (x³)² = 4 · x³·² = 4x⁶.',
        breakdown: [
          { label: 'Együttható', value: '2² = 4' },
          { label: 'Kitevők szorzása', value: '(x³)² = x⁶' },
          { label: 'Összesen', value: '4x⁶' }
        ],
        hint: 'A 2-t négyzetre emeljük (4), az x³ kitevőjét megszorozzuk 2-vel (6).'
      },
      {
        id: 'q2-3',
        prompt: 'Írd fel a 4³ hatványt 2-es alapú hatvány alakjában!',
        options: ['2⁶', '2⁵', '2⁸', '2⁹'],
        correctAnswer: '2⁶',
        explanation: 'Mivel 4 = 2², ezért 4³ = (2²)³ = 2²·³ = 2⁶ (értéke 64).',
        breakdown: [
          { label: 'Alap átírása', value: '4 = 2²' },
          { label: 'Behelyettesítés', value: '(2²)³' },
          { label: 'Kitevők szorzása', value: '2 · 3 = 6 ⟹ 2⁶' }
        ],
        hint: 'Írd át a 4-et 2²-ként, majd alkalmazd a hatvány hatványozása szabályt!'
      },
      {
        id: 'q2-4',
        prompt: 'Számítsd ki a következő tört értékét: (2⁵ · 2⁴) / 2⁶ !',
        options: ['8', '16', '4', '2'],
        correctAnswer: '8',
        explanation: 'Számláló: 2⁵ · 2⁴ = 2⁹. Tört egyszerűsítése: 2⁹ / 2⁶ = 2⁹⁻⁶ = 2³ = 8.',
        breakdown: [
          { label: 'Számláló', value: '2⁵⁺⁴ = 2⁹' },
          { label: 'Osztás a nevezővel', value: '2⁹⁻⁶ = 2³' },
          { label: 'Érték', value: '2³ = 8' }
        ],
        hint: 'Vond össze a számláló kitevőit (5+4=9), majd vond ki belőle a nevező kitevőjét (6)!'
      },
      {
        id: 'q2-5',
        prompt: 'Hogyan számítható ki a leggyorsabban a 6⁴ : 2⁴ osztás eredménye?',
        options: ['(6 : 2)⁴ = 3⁴ = 81', '3⁴ = 12', '4⁴ = 256', '6² : 2² = 9'],
        correctAnswer: '(6 : 2)⁴ = 3⁴ = 81',
        explanation: 'Azonos kitevő (4) esetén az alapokat eloszthatjuk: 6⁴ : 2⁴ = (6 : 2)⁴ = 3⁴ = 81.',
        breakdown: [
          { label: 'Szabály', value: 'aⁿ : bⁿ = (a : b)ⁿ' },
          { label: 'Alapok osztása', value: '6 : 2 = 3' },
          { label: 'Kiszámítás', value: '3⁴ = 81' }
        ],
        hint: 'Mivel a kitevők egyenlők (4), előbb oszd el az alapokat: 6 : 2 = 3!'
      },
      {
        id: 'q2-6',
        prompt: 'Számítsd ki a 25³ · 4³ szorzatot az azonosságok segítségével!',
        options: ['1 000 000', '100 000', '10 000', '10 000 000'],
        correctAnswer: '1 000 000',
        explanation: 'Azonos kitevő esetén az alapokat összeszorozzuk: 25³ · 4³ = (25 · 4)³ = 100³ = 1 000 000.',
        breakdown: [
          { label: 'Alapok szorzása', value: '25 · 4 = 100' },
          { label: 'Közös kitevő', value: '100³' },
          { label: 'Érték', value: '1 000 000 (egymillió)' }
        ],
        hint: '25 · 4 = 100, és a 100 köbe 1 millió!'
      },
      {
        id: 'q2-7',
        prompt: 'Írd fel egyetlen 2-es alapú hatvány alakjában a 2⁵ + 2⁵ összeget!',
        options: ['2⁶', '2¹⁰', '4⁵', '4¹⁰'],
        correctAnswer: '2⁶',
        explanation: 'Két egyforma tag összeadása: 2⁵ + 2⁵ = 2 · 2⁵ = 2¹ · 2⁵ = 2¹⁺⁵ = 2⁶ = 64.',
        breakdown: [
          { label: 'Összeg felírása', value: '2⁵ + 2⁵ = 2 · 2⁵' },
          { label: 'Hatványozás szabálya', value: '2¹ · 2⁵ = 2⁶' },
          { label: 'Ellenőrzés', value: '32 + 32 = 64 = 2⁶' }
        ],
        hint: 'Két darab 2⁵ összege = 2 · 2⁵!'
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a [(-1)²]³ és a [(-1)³]² kifejezések értéke?',
        options: [
          'Mindkettő +1',
          'Az első +1, a második -1',
          'Mindkettő -1',
          'Az első -1, a második +1'
        ],
        correctAnswer: 'Mindkettő +1',
        explanation: 'A kitevők szorzata mindkét esetben 2 · 3 = 6 (páros): (-1)⁶ = +1. Bármely páros kitevőjű hatvány pozitív.',
        breakdown: [
          { label: 'Első kifejezés', value: '((-1)²)³ = 1³ = +1' },
          { label: 'Második kifejezés', value: '((-1)³)² = (-1)² = +1' },
          { label: 'Azonosság szerint', value: '(-1)²·³ = (-1)⁶ = +1' }
        ],
        hint: 'A kitevők mindkét esetben 2 · 3 = 6-ot adnak, a 6 pedig páros.'
      },
      {
        id: 'q2-9',
        prompt: 'Egyszerűsítsd a következő törtet: (a⁸ · b⁵) / (a³ · b²) !',
        options: ['a⁵ b³', 'a⁵ b²', 'a¹¹ b⁷', 'a²⁴ b¹⁰'],
        correctAnswer: 'a⁵ b³',
        explanation: 'Az azonos alapokat külön-külön vonjuk össze: a⁸ / a³ = a⁸⁻³ = a⁵, és b⁵ / b² = b⁵⁻² = b³. Eredmény: a⁵ b³.',
        breakdown: [
          { label: 'a alapú tagok', value: 'a⁸⁻³ = a⁵' },
          { label: 'b alapú tagok', value: 'b⁵⁻² = b³' },
          { label: 'Eredmény', value: 'a⁵ b³' }
        ],
        hint: 'Az azonos betűk kitevőit külön-külön vond ki egymásból!'
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a -(2³)² és a (-2³)² kifejezések értéke?',
        options: [
          '-64 és +64',
          '+64 és +64',
          '-64 és -64',
          '+64 és -64'
        ],
        correctAnswer: '-64 és +64',
        explanation: '-(2³)² = -(2⁶) = -64, mert a mínusz a zárójelen kívül áll. A (-2³)² = (-8)² = +64, mert a külső négyzet miatt a negatív előjel pozitívvá válik.',
        breakdown: [
          { label: 'Első', value: '-(2³)² = -(8²) = -64' },
          { label: 'Második', value: '(-8)² = +64' }
        ],
        hint: 'Ügyelj arra, hogy melyik mínusz előjelre vonatkozik a négyzetre emelés!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emeletes Törtek, Egyenletek és Összetett Alkalmazások',
    subtitle: 'Különböző alapok közös alapra hozása, nagyságrendek és valós matematikai problémák',
    range: '21 - 30. feladat',
    focus: 'Összetett feladatok és logikai mélység',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Számítsd ki a tört értékét: (4³ · 8²) / 2¹⁰ !',
        options: ['4', '2', '8', '16'],
        correctAnswer: '4',
        explanation: 'Írjuk át mindent 2-es alapra: 4³ = (2²)³ = 2⁶, és 8² = (2³)² = 2⁶. Számláló: 2⁶ · 2⁶ = 2¹². Osztás: 2¹² / 2¹⁰ = 2² = 4.',
        breakdown: [
          { label: '4³ átírása', value: '(2²)³ = 2⁶' },
          { label: '8² átírása', value: '(2³)² = 2⁶' },
          { label: 'Számláló', value: '2⁶⁺⁶ = 2¹²' },
          { label: 'Végeredmény', value: '2¹²⁻¹⁰ = 2² = 4' }
        ],
        hint: 'Írd át a 4-et 2²-re, a 8-at pedig 2³-ra!'
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a (9⁴ · 3⁵) / 27³ kifejezés értéke?',
        options: ['81', '27', '243', '9'],
        correctAnswer: '81',
        explanation: '3-as alapra írva: 9⁴ = (3²)⁴ = 3⁸, 27³ = (3³)³ = 3⁹. Számláló: 3⁸ · 3⁵ = 3¹³. Tört: 3¹³ / 3⁹ = 3⁴ = 81.',
        breakdown: [
          { label: 'Alapok átírása', value: '9 = 3², 27 = 3³' },
          { label: 'Számláló', value: '3⁸ · 3⁵ = 3¹³' },
          { label: 'Nevező', value: '3⁹' },
          { label: 'Eredmény', value: '3¹³⁻⁹ = 3⁴ = 81' }
        ],
        hint: 'Írj mindent 3-as alapú hatványként: 9 = 3², 27 = 3³!'
      },
      {
        id: 'q3-3',
        prompt: 'Írd fel egyetlen 3-as alapú hatvány alakjában: 3⁶ + 3⁶ + 3⁶ !',
        options: ['3⁷', '3¹⁸', '9⁶', '3¹²'],
        correctAnswer: '3⁷',
        explanation: 'Három egyforma tag összeadása: 3⁶ + 3⁶ + 3⁶ = 3 · 3⁶ = 3¹ · 3⁶ = 3¹⁺⁶ = 3⁷ (értéke 2 187).',
        breakdown: [
          { label: 'Szorzattá alakítás', value: '3 · 3⁶' },
          { label: 'Kitevők összeadása', value: '3¹⁺⁶ = 3⁷' },
          { label: 'Eredmény', value: '3⁷' }
        ],
        hint: 'Háromszor van meg a 3⁶, ami 3 · 3⁶ = 3⁷!'
      },
      {
        id: 'q3-4',
        prompt: 'Ha 2ˣ = 32, akkor mennyi a 2ˣ⁺² kifejezés értéke?',
        options: ['128', '64', '256', '34'],
        correctAnswer: '128',
        explanation: 'Azonosság szerint: 2ˣ⁺² = 2ˣ · 2² = 32 · 4 = 128. (Mivel 2ˣ = 32, x = 5, így 2⁵⁺² = 2⁷ = 128).',
        breakdown: [
          { label: 'Szétbontás', value: '2ˣ⁺² = 2ˣ · 2²' },
          { label: 'Behelyettesítés', value: '32 · 4 = 128' }
        ],
        hint: 'Bontsd szét a hatványt: 2ˣ⁺² = 2ˣ · 2²!'
      },
      {
        id: 'q3-5',
        prompt: 'Számítsd ki a következő tört értékét: (10⁷ · 5³) / 50³ !',
        options: ['10 000', '1 000', '100', '5 000'],
        correctAnswer: '10 000',
        explanation: '50³ = (10 · 5)³ = 10³ · 5³. A tört: (10⁷ · 5³) / (10³ · 5³) = 10⁷ / 10³ = 10⁴ = 10 000.',
        breakdown: [
          { label: 'Nevező szétbontása', value: '50³ = 10³ · 5³' },
          { label: 'Egyszerűsítés 5³-nal', value: 'kiesik a számlálóból és a nevezőből' },
          { label: '10-es hatvány', value: '10⁷ / 10³ = 10⁴ = 10 000' }
        ],
        hint: 'Bontsd fel az 50-et 10 · 5-re a nevezőben!'
      },
      {
        id: 'q3-6',
        prompt: 'Melyik szám a nagyobb: 2³⁰ vagy 3²⁰?',
        options: [
          '3²⁰ a nagyobb',
          '2³⁰ a nagyobb',
          'Pontosan egyenlőek',
          'Nem dönthető el'
        ],
        correctAnswer: '3²⁰ a nagyobb',
        explanation: 'Közös kitevőre hozzuk őket 10-es kitevővel: 2³⁰ = (2³)¹⁰ = 8¹⁰. 3²⁰ = (3²)¹⁰ = 9¹⁰. Mivel 9 > 8, ezért 9¹⁰ > 8¹⁰, tehát 3²⁰ > 2³⁰!',
        breakdown: [
          { label: '2³⁰ átírása', value: '(2³)¹⁰ = 8¹⁰' },
          { label: '3²⁰ átírása', value: '(3²)¹⁰ = 9¹⁰' },
          { label: 'Összehasonlítás', value: '9¹⁰ > 8¹⁰ ⟹ 3²⁰ > 2³⁰' }
        ],
        hint: 'Írd át mindkettőt 10-es külső kitevőre: (2³)¹⁰ és (3²)¹⁰!'
      },
      {
        id: 'q3-7',
        prompt: 'Egyszerűsítsd a következő kifejezést: (x² y³)⁴ / (x³ y)² !',
        options: ['x² y¹⁰', 'x⁵ y¹⁰', 'x² y⁴', 'x⁸ y¹²'],
        correctAnswer: 'x² y¹⁰',
        explanation: 'Számláló: (x² y³)⁴ = x⁸ y¹². Nevező: (x³ y)² = x⁶ y². Osztás: x⁸⁻⁶ y¹²⁻² = x² y¹⁰.',
        breakdown: [
          { label: 'Számláló kibontása', value: 'x⁸ y¹²' },
          { label: 'Nevező kibontása', value: 'x⁶ y²' },
          { label: 'Kitevők kivonása', value: 'x⁸⁻⁶ · y¹²⁻² = x² y¹⁰' }
        ],
        hint: 'Előbb szorozd be a külső kitevőket, majd vond ki az azonos betűk kitevőit!'
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a (0,5)⁴ · 2⁶ szorzat pontos értéke?',
        options: ['4', '2', '8', '1'],
        correctAnswer: '4',
        explanation: 'Mivel 0,5 = 1/2 = 2⁻¹, de 7. osztályos módon: (0,5 · 2)⁴ · 2² = 1⁴ · 4 = 1 · 4 = 4.',
        breakdown: [
          { label: 'Szétbontás', value: '2⁶ = 2⁴ · 2²' },
          { label: 'Közös kitevő', value: '(0,5 · 2)⁴ · 2² = 1⁴ · 4' },
          { label: 'Eredmény', value: '4' }
        ],
        hint: 'Bontsd szét a 2⁶-t 2⁴ · 2²-re, így 0,5 · 2 = 1 lesz!'
      },
      {
        id: 'q3-9',
        prompt: 'Számítsd ki a következő tört értékét: (6⁵ · 10³) / (15³ · 2⁵) !',
        options: ['72', '36', '144', '18'],
        correctAnswer: '72',
        explanation: 'Prímtényezőkre bontva: 6⁵ = 2⁵ · 3⁵, 10³ = 2³ · 5³, 15³ = 3³ · 5³. Behelyettesítve: (2⁵ · 3⁵ · 2³ · 5³) / (3³ · 5³ · 2⁵) = 3⁵⁻³ · 2³ = 3² · 8 = 9 · 8 = 72.',
        breakdown: [
          { label: 'Prímtényezők', value: '6 = 2·3, 10 = 2·5, 15 = 3·5' },
          { label: 'Egyszerűsítés', value: '2⁵ és 5³ kiesik' },
          { label: 'Maradék', value: '3⁵⁻³ · 2³ = 3² · 8 = 72' }
        ],
        hint: 'Bontsd fel a 6-ot (2·3), a 10-et (2·5) és a 15-öt (3·5) prímtényezőkre!'
      },
      {
        id: 'q3-10',
        prompt: 'Egy baktériumtenyészet óránként megduplázódik (2-szeresére nő). Kezdetben 2³ = 8 baktérium volt a mintában. Hány baktérium lesz 5 óra elteltével?',
        options: ['2⁸ = 256', '2¹⁵ = 32 768', '2¹⁰ = 1 024', '40'],
        correctAnswer: '2⁸ = 256',
        explanation: 'Minden órában 2-vel szorzódik a számuk. 5 óra alatt 2⁵-szeresére nő: 2³ · 2⁵ = 2³⁺⁵ = 2⁸ = 256 baktérium lesz.',
        breakdown: [
          { label: 'Kezdeti állapot', value: '2³ baktérium' },
          { label: 'Növekedési szorzó 5 óra alatt', value: '2⁵' },
          { label: 'Összesen', value: '2³ · 2⁵ = 2⁸ = 256' }
        ],
        hint: 'A kezdeti értéket szorozd meg 2⁵-nel: 2³ · 2⁵!'
      }
    ]
  }
};

export const PowersApplicationQuiz: React.FC<PowersApplicationQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-application"
      topicTitle="2. Hatványok alkalmazása"
      subtopicId="hatvanyok-alkalmazasa"
      documentId="grade-7-hatvanyok-alkalmazasa-quiz"
      emoji="⚡"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      title="2. Hatványok alkalmazása Kvíz"
      subtitle="Gyakorold az 5 alapvető hatványazonosságot, a szorzást, osztást, hatvány hatványozását és az algebrai kifejezések egyszerűsítését 30 feladattal!"
      cheatSheetTitle="Hatványazonosságok Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<PowersApplicationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PowersApplicationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="amber"
      hintText="💡 Figyelj az azonos alapú szorzásra (kitevők összeadása), osztásra (kitevők kivonása), és a zárójelekre: (3x)² = 9x²!"
    />
  );
};

export default PowersApplicationQuiz;
