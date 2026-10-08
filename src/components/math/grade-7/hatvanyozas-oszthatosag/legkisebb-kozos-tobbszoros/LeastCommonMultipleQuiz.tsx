import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LeastCommonMultipleMatcher } from './LeastCommonMultipleMatcher';
import { LeastCommonMultipleSorter } from './LeastCommonMultipleSorter';
import {
  TrendingUp,
  Calculator,
  Binary,
  Layers,
  Sparkles,
  HelpCircle,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock
} from 'lucide-react';

interface LeastCommonMultipleQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Az LKKT Fogalma és Alsó Határa',
    icon: <TrendingUp className="w-4 h-4 text-purple-600" />,
    formula: 'LKKT(a, b) ≥ max(a, b) • Pozitív közös többszörösök legkisebbje',
    note: 'Két számnak végtelen sok közös többszöröse van. Bármely közös többszörös osztható az LKKT-vel. Ha a | b, akkor LKKT(a, b) = b.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-purple-900 dark:fill-purple-200">6 & 8</text>
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="92" y="29" className="text-[10px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">LKKT = 24</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Prímfelbontás: Legnagyobb Kitevők Elve',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'LKKT: Összes előforduló prím a LEGNAGYOBB kitevőn',
    note: 'Azokat a prímeket is be kell szorozni, amelyek csak az egyik számban szerepelnek! Mindegyik prímhez a max hatványkitevőt rendeljük.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">2³·3 & 2²·3² → 2³·3² = 72</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Az Alaptétel Két Számra',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'LNKO(a, b) · LKKT(a, b) = a · b',
    note: 'Bármely két pozitív egész szorzata megegyezik az LNKO-juk és LKKT-jük szorzatával! Relatív prímeknél (LNKO = 1) LKKT = a · b.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">LNKO · LKKT = a · b</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Gyakorlat: Közös Nevező és Időzítés',
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    formula: 'Közös nevező = LKKT(nevezők) • Találkozás = LKKT(időközök)',
    note: 'Törtek összeadásakor a legkisebb közös nevező a nevezők LKKT-je. Menetrendek, villogások találkozási ideje szintén az időközök LKKT-je.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-amber-100 stroke-amber-300 dark:fill-amber-950/60 dark:stroke-amber-800" />
        <text x="18" y="29" className="text-[10px] font-mono font-bold fill-amber-900 dark:fill-amber-200">1/12 + 1/18 → Nevező: 36</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Közös Többszörösök és Egyszerű LKKT',
    subtitle: 'Pozitív többszörösök sorozata és az LKKT közvetlen meghatározása',
    range: '1 - 10. feladat',
    focus: 'Közvetlen felismerés, többszörös-listák és az alsó korlát megértése',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a 6 és 8 legkisebb közös többszöröse: LKKT(6, 8)?',
        options: ['24', '48', '12', '18'],
        correctAnswer: '24',
        explanation: '6 többszörösei: 6, 12, 18, 24, 30... A 8 többszörösei: 8, 16, 24, 32... Az első közös szám a 24. (Bár 6 · 8 = 48 is közös többszörös, de a 24 a legkisebb!).',
        breakdown: [
          { label: '6 többszörösei', value: '6, 12, 18, 24, 30, ...' },
          { label: '8 többszörösei', value: '8, 16, 24, 32, ...' },
          { label: 'LKKT', value: '24' }
        ],
        hint: 'Írd fel a 6 és 8 többszöröseit: melyik a legkisebb közös érték?'
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám a 10 és 15 legkisebb közös többszöröse?',
        options: ['30', '150', '60', '15'],
        correctAnswer: '30',
        explanation: '10 többszörösei: 10, 20, 30, 40... A 15 többszörösei: 15, 30, 45... A legkisebb közös a 30.',
        breakdown: [
          { label: '10 többszörösei', value: '10, 20, 30, 40' },
          { label: '15 többszörösei', value: '15, 30, 45' },
          { label: 'LKKT', value: '30' }
        ],
        hint: 'Mindkét szám 0-ra vagy 5-re végződő többszörösökkel rendelkezik.'
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi az LKKT(12, 18)?',
        options: ['36', '72', '24', '216'],
        correctAnswer: '36',
        explanation: '12 többszörösei: 12, 24, 36, 48... A 18 többszörösei: 18, 36, 54... A legkisebb közös többszörös a 36.',
        breakdown: [
          { label: '12-es sorozat', value: '12, 24, 36, 48' },
          { label: '18-as sorozat', value: '18, 36, 54' },
          { label: 'LKKT', value: '36' }
        ],
        hint: 'Mennyi 18 · 2? Osztható 12-vel?'
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi az LKKT(8, 12)?',
        options: ['24', '48', '96', '16'],
        correctAnswer: '24',
        explanation: '8 többszörösei: 8, 16, 24, 32... A 12 többszörösei: 12, 24, 36... LKKT(8, 12) = 24.',
        breakdown: [
          { label: 'Közös többszörösök', value: '24, 48, 72, ...' },
          { label: 'Legkisebb (LKKT)', value: '24' }
        ],
        hint: 'A 24 osztható 8-cal (3) és 12-vel (2) is.'
      },
      {
        id: 'q1-5',
        prompt: 'Ha a 15 osztója a 45-nek, mennyi az LKKT(15, 45)?',
        options: ['45', '15', '90', '675'],
        correctAnswer: '45',
        explanation: 'Ha az egyik szám osztója a másiknak (a | b), akkor a nagyobbik szám már eleve többszöröse a kisebbiknek, így az LKKT maga a nagyobbik szám: LKKT(15, 45) = 45.',
        breakdown: [
          { label: 'Tétel', value: 'Ha a | b ⟹ LKKT(a, b) = b' },
          { label: 'Alkalmazás', value: '15 | 45 ⟹ LKKT(15, 45) = 45' }
        ],
        hint: 'Mivel a 45 osztható 15-tel, a 45 önmagának és a 15-nek is közös többszöröse.'
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi az LKKT(14, 21)?',
        options: ['42', '84', '294', '21'],
        correctAnswer: '42',
        explanation: '14 = 2 · 7 és 21 = 3 · 7. LKKT = 2 · 3 · 7 = 42. (14 többszörösei: 14, 28, 42; 21 többszörösei: 21, 42).',
        breakdown: [
          { label: '14 többszörösei', value: '14, 28, 42' },
          { label: '21 többszörösei', value: '21, 42' },
          { label: 'LKKT', value: '42' }
        ],
        hint: 'Mennyi 21 · 2? Osztható 14-gyel?'
      },
      {
        id: 'q1-7',
        prompt: 'Melyik szám NEM közös többszöröse a 4-nek és 6-nak?',
        options: ['18', '12', '24', '36'],
        correctAnswer: '18',
        explanation: 'A 18 osztható 6-tal (6 · 3 = 18), de a 4-gyel NEM osztható (18 : 4 = 4, maradék 2). Így nem lehet közös többszörös.',
        breakdown: [
          { label: '18 : 6', value: '3 ✓' },
          { label: '18 : 4', value: 'nem egész ✗' },
          { label: 'Közös többszörösök', value: '12, 24, 36, 48, ...' }
        ],
        hint: 'Oszd el a számokat 4-gyel: melyik nem osztható?'
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi az LKKT(20, 30)?',
        options: ['60', '120', '600', '30'],
        correctAnswer: '60',
        explanation: '20 = 2 · 10 és 30 = 3 · 10. A 60 osztható 20-szal (3) és 30-cal (2) is. LKKT(20, 30) = 60.',
        breakdown: [
          { label: '20-as sorozat', value: '20, 40, 60, 80' },
          { label: '30-as sorozat', value: '30, 60, 90' },
          { label: 'LKKT', value: '60' }
        ],
        hint: 'Gondolj a 60-ra: 3 · 20 és 2 · 30.'
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 4 és 5 legkisebb közös többszöröse?',
        options: ['20', '10', '40', '15'],
        correctAnswer: '20',
        explanation: 'Mivel a 4 és 5 relatív prímek (nincs közös prímjük), a legkisebb közös többszörösük pontosan a szorzatuk: 4 · 5 = 20.',
        breakdown: [
          { label: 'Kapcsolat', value: '4 és 5 relatív prímek' },
          { label: 'Szorzat', value: '4 · 5 = 20' }
        ],
        hint: 'Ha két számnak nincs közös osztója, a szorzatuk adja az LKKT-t.'
      },
      {
        id: 'q1-10',
        prompt: 'Lehet-e két pozitív egész szám legkisebb közös többszöröse kisebb, mint a nagyobbik szám?',
        options: [
          'Nem, mert egy közös többszörös nem lehet kisebb a számoknál, amiknek többszöröse',
          'Igen, ha a számok relatív prímek',
          'Igen, ha mindkét szám páros',
          'Csak akkor, ha az egyik szám 1'
        ],
        correctAnswer: 'Nem, mert egy közös többszörös nem lehet kisebb a számoknál, amiknek többszöröse',
        explanation: 'Mivel a közös többszörösnek a-nak és b-nek is többszörösének kell lennie, biztosan legalább akkora, mint mindkét szám: LKKT(a, b) ≥ max(a, b).',
        breakdown: [
          { label: 'Szabály', value: 'm többszöröse b-nek ⟹ m ≥ b' },
          { label: 'Következtetés', value: 'LKKT(a, b) ≥ max(a, b)' }
        ],
        hint: 'Lehet-e a 12-nek olyan pozitív többszöröse, ami kisebb 12-nél?'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: LKKT Prímfelbontásból (Legnagyobb Kitevők)',
    subtitle: 'Prímtényezők kiválasztása és a legnagyobb kitevők szorzatának képzése',
    range: '11 - 20. feladat',
    focus: 'A kanonikus alakokból való LKKT meghatározás szabályai',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Ha a = 2³ · 3¹ (24) és b = 2² · 3² (36), mi az LKKT(a, b) hatványalakja?',
        options: ['2³ · 3²', '2² · 3¹', '2³ · 3³', '2⁵ · 3³'],
        correctAnswer: '2³ · 3²',
        explanation: 'Minden előforduló prímtényezőt a LEGNAGYOBB kitevőre emelünk: 2-esnél max(3, 2) = 3 (2³), 3-asnál max(1, 2) = 2 (3²). Így LKKT = 2³ · 3² = 8 · 9 = 72.',
        breakdown: [
          { label: '2 alap', value: 'max(3, 2) = 3 ⟹ 2³' },
          { label: '3 alap', value: 'max(1, 2) = 2 ⟹ 3²' },
          { label: 'Szorzat', value: '2³ · 3² = 8 · 9 = 72' }
        ],
        hint: 'Válaszd mindegyik előforduló prímhez a nagyobbik kitevőt!'
      },
      {
        id: 'q2-2',
        prompt: 'Ha a = 2² · 5¹ (20) és b = 2¹ · 5² (50), mennyi az LKKT-jük?',
        options: ['100', '50', '200', '10'],
        correctAnswer: '100',
        explanation: 'LKKT = 2^(max(2,1)) · 5^(max(1,2)) = 2² · 5² = 4 · 25 = 100.',
        breakdown: [
          { label: '2-es hatvány', value: 'max(2, 1) = 2 ⟹ 2² = 4' },
          { label: '5-ös hatvány', value: 'max(1, 2) = 2 ⟹ 5² = 25' },
          { label: 'Szorzat', value: '4 · 25 = 100' }
        ],
        hint: '2² · 5² = ?'
      },
      {
        id: 'q2-3',
        prompt: 'Adott: a = 2³ · 7 és b = 2 · 3 · 7. Mi az LKKT(a, b)?',
        options: ['168', '56', '24', '336'],
        correctAnswer: '168',
        explanation: 'Minden előforduló prím kell: 2, 3 és 7. Nagyobb kitevők: 2³ · 3¹ · 7¹ = 8 · 3 · 7 = 168.',
        breakdown: [
          { label: 'Prímek', value: '2, 3, 7 (a 3 is kell, pedig csak b-ben van!)' },
          { label: 'Kitevők', value: '2³, 3¹, 7¹' },
          { label: 'Szorzat', value: '8 · 3 · 7 = 168' }
        ],
        hint: 'A 3-ast is bele kell venni, mert az LKKT-nek b-vel is oszthatónak kell lennie!'
      },
      {
        id: 'q2-4',
        prompt: 'Szerepel-e az LKKT-ben olyan prímtényező, amelyik csak az egyik szám felbontásában található meg?',
        options: [
          'Igen, az LKKT-be az összes előforduló prím belekerül a legnagyobb kitevőn',
          'Nem, csak a közös prímek kerülhetnek bele',
          'Csak akkor, ha az a prím a 2 vagy a 3',
          'Csak páratlan számok esetén'
        ],
        correctAnswer: 'Igen, az LKKT-be az összes előforduló prím belekerül a legnagyobb kitevőn',
        explanation: 'Mivel a közös többszörösnek mindkét számmal oszthatónak kell lennie, minden olyan prímtényezőt tartalmaznia kell, ami bármelyik számban szerepel.',
        breakdown: [
          { label: 'Oszthatóság', value: 'm osztható a-val és b-vel is' },
          { label: 'Következmény', value: 'Tartalmaznia kell a-nak és b-nek minden prímtényezőjét' }
        ],
        hint: 'Ha egy prím kimaradna, osztható lenne-e a többszörös azzal a számmal, amelyik tartalmazza?'
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi az LKKT(2⁴ · 3, 2³ · 5)?',
        options: ['240', '120', '80', '480'],
        correctAnswer: '240',
        explanation: 'Prímek: 2, 3, 5. Nagyobb kitevők: 2⁴ · 3¹ · 5¹ = 16 · 3 · 5 = 240.',
        breakdown: [
          { label: '2-es alap', value: 'max(4, 3) = 4 ⟹ 2⁴ = 16' },
          { label: '3-as és 5-ös alap', value: '3¹ és 5¹' },
          { label: 'Szorzat', value: '16 · 15 = 240' }
        ],
        hint: '16 · 3 · 5 = ?'
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi az LKKT(3² · 5, 2² · 3)?',
        options: ['180', '90', '360', '45'],
        correctAnswer: '180',
        explanation: 'Prímek: 2, 3, 5. Kitevők: 2² · 3² · 5¹ = 4 · 9 · 5 = 180.',
        breakdown: [
          { label: 'Alapok', value: '2, 3, 5' },
          { label: 'Kitevők', value: '2² = 4, 3² = 9, 5¹ = 5' },
          { label: 'Szorzat', value: '4 · 9 · 5 = 180' }
        ],
        hint: '4 · 9 · 5 = ?'
      },
      {
        id: 'q2-7',
        prompt: 'A 60 = 2² · 3 · 5 és a 84 = 2² · 3 · 7 felbontása alapján mennyi az LKKT-jük?',
        options: ['420', '210', '840', '1260'],
        correctAnswer: '420',
        explanation: 'Összes prím: 2, 3, 5, 7. Nagyobb kitevők: 2² · 3¹ · 5¹ · 7¹ = 4 · 3 · 5 · 7 = 420.',
        breakdown: [
          { label: 'Közös prímek', value: '2² · 3¹ = 12' },
          { label: 'Egyedi prímek', value: '5 · 7 = 35' },
          { label: 'Szorzat', value: '12 · 35 = 420' }
        ],
        hint: '12 · 5 · 7 = ?'
      },
      {
        id: 'q2-8',
        prompt: 'Melyik szabály adja meg helyesen az LKKT kiszámítását a prímtényezős alakból?',
        options: [
          'Az összes előforduló prímtényező szorzata a legnagyobb kitevőn',
          'Csak a közös prímtényezők szorzata a legkisebb kitevőn',
          'A prímtényezők összege megszorozva a legnagyobb prímfaktorral',
          'A két szám összege osztva a különbségükkel'
        ],
        correctAnswer: 'Az összes előforduló prímtényező szorzata a legnagyobb kitevőn',
        explanation: 'Az LKKT-nél minden olyan prímtényezőt figyelembe veszünk, amely legalább az egyik számban szerepel, és mindegyikből a legnagyobb kitevőt választjuk.',
        breakdown: [
          { label: 'Kritérium 1', value: 'ÖSSZES előforduló prím' },
          { label: 'Kritérium 2', value: 'LEGNAGYOBB kitevő (max)' }
        ],
        hint: 'Többszörös = nagyobb érték ➔ legnagyobb kitevők!'
      },
      {
        id: 'q2-9',
        prompt: 'Ha x = 2³ · 5 (40) és y = 3 · 7 (21) relatív prímek, mennyi az LKKT(x, y)?',
        options: ['840', '420', '1', '120'],
        correctAnswer: '840',
        explanation: 'Mivel a két számnak nincs közös prímtényezője (relatív prímek, LNKO = 1), az LKKT pontosan a két szám szorzata: 40 · 21 = 840.',
        breakdown: [
          { label: 'Közös prím', value: 'nincs (LNKO = 1)' },
          { label: 'LKKT', value: '40 · 21 = 840' }
        ],
        hint: 'Relatív prímeknél az LKKT megegyezik a két szám szorzatával.'
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi az LKKT(90, 120), ha 90 = 2 · 3² · 5 és 120 = 2³ · 3 · 5?',
        options: ['360', '180', '720', '30'],
        correctAnswer: '360',
        explanation: 'LKKT = 2^(max(1,3)) · 3^(max(2,1)) · 5^(max(1,1)) = 2³ · 3² · 5 = 8 · 9 · 5 = 360.',
        breakdown: [
          { label: 'Kitevők', value: '2³ = 8, 3² = 9, 5¹ = 5' },
          { label: 'Szorzás', value: '8 · 9 · 5 = 360' }
        ],
        hint: '8 · 9 · 5 = ?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Az Alaptétel, Közös Nevező és Alkalmazások',
    subtitle: 'Az LNKO · LKKT = a · b tétel, törtek közös nevezője és periodikus találkozások',
    range: '21 - 30. feladat',
    focus: 'Összetett összefüggések, algebrai átrendezések és életszerű szöveges feladványok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Ha két pozitív egész szám esetén LNKO(a, b) = 6 és a · b = 360, mennyi az LKKT(a, b)?',
        options: ['60', '30', '120', '2160'],
        correctAnswer: '60',
        explanation: 'Az alaptétel szerint: LNKO · LKKT = a · b. Ebből LKKT = (a · b) / LNKO = 360 / 6 = 60.',
        breakdown: [
          { label: 'Alaptétel', value: 'LNKO · LKKT = a · b' },
          { label: 'Kifejezés', value: 'LKKT = (a · b) / LNKO' },
          { label: 'Számítás', value: '360 : 6 = 60' }
        ],
        hint: 'Oszd el a szorzatot az LNKO-val!'
      },
      {
        id: 'q3-2',
        prompt: 'Ha két szám relatív prím (LNKO = 1), mennyi a legkisebb közös többszörösük?',
        options: [
          'A két szám szorzata: a · b',
          'Mindig 1',
          'A két szám összege: a + b',
          'A két szám különbsége: b - a'
        ],
        correctAnswer: 'A két szám szorzata: a · b',
        explanation: 'Mivel LNKO(a, b) = 1, az alaptételből: 1 · LKKT(a, b) = a · b ⟹ LKKT(a, b) = a · b.',
        breakdown: [
          { label: 'Képlet', value: '1 · LKKT = a · b' },
          { label: 'Eredmény', value: 'LKKT = a · b' }
        ],
        hint: 'Helyettesítsd be az 1-et az LNKO helyére az LNKO · LKKT = a · b képletbe!'
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi az 5/12 és 7/18 törtek összeadásakor a legkisebb közös nevező?',
        options: ['36', '72', '216', '18'],
        correctAnswer: '36',
        explanation: 'A legkisebb közös nevező a nevezők legkisebb közös többszöröse: LKKT(12, 18) = 36. Így 5/12 = 15/36 és 7/18 = 14/36.',
        breakdown: [
          { label: 'Nevezők', value: '12 és 18' },
          { label: 'LKKT', value: '36' },
          { label: 'Bővítés', value: '15/36 + 14/36 = 29/36' }
        ],
        hint: 'Mennyi a 12 és 18 legkisebb közös többszöröse?'
      },
      {
        id: 'q3-4',
        prompt: 'Két autóbusz 12, illetve 18 percenként indul a pályaudvarról. Ha 8:00-kor egyszerre indultak, hány perccel később indulnak legközelebb egyszerre?',
        options: ['36 perc múlva (8:36-kor)', '72 perc múlva (9:12-kor)', '30 perc múlva (8:30-kor)', '60 perc múlva (9:00-kor)'],
        correctAnswer: '36 perc múlva (8:36-kor)',
        explanation: 'A közös indulási időpontok az időközök közös többszörösei. A legközelebbi közös indulás az LKKT(12, 18) = 36 perc múlva következik be.',
        breakdown: [
          { label: 'Járat 1', value: '12, 24, 36, 48 perc' },
          { label: 'Járat 2', value: '18, 36, 54 perc' },
          { label: 'Találkozás', value: '36 perc múlva' }
        ],
        hint: 'Keresd a 12 és 18 legkisebb közös többszörösét!'
      },
      {
        id: 'q3-5',
        prompt: 'Két futó 45 másodperc, illetve 60 másodperc alatt tesz meg egy kört. Hány másodperc múlva érnek át újra egyszerre a rajtvonalon?',
        options: ['180 másodperc (3 perc)', '120 másodperc (2 perc)', '240 másodperc (4 perc)', '300 másodperc (5 perc)'],
        correctAnswer: '180 másodperc (3 perc)',
        explanation: 'LKKT(45, 60): 45 = 3² · 5, 60 = 2² · 3 · 5. LKKT = 2² · 3² · 5 = 4 · 9 · 5 = 180 másodperc = 3 perc múlva érnek be újra egyszerre.',
        breakdown: [
          { label: 'Futó 1 körök', value: '45, 90, 135, 180 s (4 kör)' },
          { label: 'Futó 2 körök', value: '60, 120, 180 s (3 kör)' },
          { label: 'LKKT', value: '180 másodperc' }
        ],
        hint: 'Mennyi az LKKT(45, 60)?'
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi bármely n pozitív egész szám esetén az LKKT(n, n + 1)?',
        options: [
          'n · (n + 1), mert két szomszédos szám mindig relatív prím',
          'n + 1',
          '2n',
          'Mindig 1'
        ],
        correctAnswer: 'n · (n + 1), mert két szomszédos szám mindig relatív prím',
        explanation: 'Mivel bármely két egymást követő egész szám relatív prím (LNKO(n, n+1) = 1), az LKKT-jük a szorzatukkal egyenlő: LKKT(n, n+1) = n · (n + 1).',
        breakdown: [
          { label: 'LNKO(n, n+1)', value: '1' },
          { label: 'Alaptétel', value: '1 · LKKT = n · (n + 1)' },
          { label: 'LKKT', value: 'n · (n + 1)' }
        ],
        hint: 'Emlékezz: két szomszédos szám mindig relatív prím!'
      },
      {
        id: 'q3-7',
        prompt: 'Érvényes-e az LNKO(a, b, c) · LKKT(a, b, c) = a · b · c összefüggés HÁROM tetszőleges pozitív egész számra?',
        options: [
          'Nem érvényes, ez a tétel kizárólag KÉT számra igaz',
          'Igen, bármennyi számra érvényes',
          'Csak akkor, ha mindhárom szám prím',
          'Csak akkor, ha a számok párosak'
        ],
        correctAnswer: 'Nem érvényes, ez a tétel kizárólag KÉT számra igaz',
        explanation: 'Például: a=2, b=2, c=2 esetén LNKO=2, LKKT=2, a szorzatuk 4, míg a · b · c = 8 ≠ 4! Három számra az összefüggés nem ilyen egyszerű.',
        breakdown: [
          { label: 'Két számra', value: 'LNKO(a, b) · LKKT(a, b) = a · b (IGAZ)' },
          { label: 'Három számra', value: 'Általában NEM egyenlő (HAMIS)' }
        ],
        hint: 'Gondolj az ellenpéldára: (2, 2, 2) esetén LNKO=2, LKKT=2.'
      },
      {
        id: 'q3-8',
        prompt: 'Ha a = 15 és LKKT(a, b) = 60, valamint LNKO(a, b) = 5, mennyi a b szám értéke?',
        options: ['20', '25', '30', '12'],
        correctAnswer: '20',
        explanation: 'Az alaptétel szerint: 15 · b = LNKO · LKKT = 5 · 60 = 300. Ebből b = 300 / 15 = 20.',
        breakdown: [
          { label: 'Egyenlet', value: '15 · b = 5 · 60' },
          { label: 'Szorzat', value: '15 · b = 300' },
          { label: 'Megoldás', value: 'b = 20' }
        ],
        hint: 'Szorozd össze az LNKO-t és az LKKT-t (300), majd oszd el 15-tel!'
      },
      {
        id: 'q3-9',
        prompt: 'Melyik a legkisebb olyan pozitív egész szám, amely maradék nélkül osztható az első hat pozitív egésszel: 1, 2, 3, 4, 5 és 6-tal is?',
        options: ['60', '120', '30', '720'],
        correctAnswer: '60',
        explanation: 'LKKT(1, 2, 3, 4, 5, 6): a prímek maximális hatványai: 2² (4-ből), 3¹ (3-ból), 5¹ (5-ből). LKKT = 2² · 3 · 5 = 4 · 3 · 5 = 60.',
        breakdown: [
          { label: 'Prímhatványok', value: '2² = 4, 3¹ = 3, 5¹ = 5' },
          { label: 'Szorzat', value: '4 · 3 · 5 = 60' },
          { label: 'Ellenőrzés', value: '60 osztható 1, 2, 3, 4, 5, 6-tal ✓' }
        ],
        hint: 'Keresd a 2, 3, 4, 5 és 6 legkisebb közös többszörösét!'
      },
      {
        id: 'q3-10',
        prompt: 'Egy kikötőben a zöld jelzőfény 15 másodpercenként, a sárga fény 25 másodpercenként villan fel. Hány másodpercenként villannak fel pontosan egyszerre?',
        options: ['75 másodpercenként', '150 másodpercenként', '50 másodpercenként', '375 másodpercenként'],
        correctAnswer: '75 másodpercenként',
        explanation: 'LKKT(15, 25): 15 = 3 · 5, 25 = 5². LKKT = 3 · 5² = 3 · 25 = 75 másodperc. Tehát minden 75. másodpercben (1 perc 15 másodperc) villannak egyszerre.',
        breakdown: [
          { label: '15 felbontása', value: '3 · 5' },
          { label: '25 felbontása', value: '5²' },
          { label: 'LKKT', value: '3 · 25 = 75 s' }
        ],
        hint: 'Mennyi az LKKT(15, 25)?'
      }
    ]
  }
};

export const LeastCommonMultipleQuiz: React.FC<LeastCommonMultipleQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-lcm"
      topicTitle="9. Legkisebb közös többszörös"
      subtopicId="legkisebb-kozos-tobbszoros"
      documentId="grade-7-legkisebb-kozos-tobbszoros-quiz"
      emoji="📈"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság és Számelmélet"
      title="Legkisebb közös többszörös (LKKT) – Kvíz"
      subtitle="Mesterfokú gyakorlás: közös többszörösök, az LKKT prímfelbontásból (legnagyobb kitevők elve), az LNKO · LKKT = a · b alaptétel és a közös nevező 30 interaktív feladaton!"
      cheatSheetTitle="LKKT és Közös Nevező Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<LeastCommonMultipleMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<LeastCommonMultipleSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="purple"
      hintText="💡 Használd a felül megnyitható szabálytárat a legnagyobb kitevők elvéhez és az alaptételhez!"
    />
  );
};

export default LeastCommonMultipleQuiz;
