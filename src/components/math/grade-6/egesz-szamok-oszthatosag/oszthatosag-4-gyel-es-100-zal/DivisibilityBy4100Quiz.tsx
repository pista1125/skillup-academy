import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { DivisibilityBy4100Matcher } from './DivisibilityBy4100Matcher';
import { DivisibilityBy4100Sorter } from './DivisibilityBy4100Sorter';

export interface DivisibilityBy4100QuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Oszthatóság 4-gyel',
    formula: 'Utolsó 2 számjegy ∈ 4k',
    note: 'Pl. 00, 04, 08, 12, 16, 20... 96.'
  },
  {
    topic: 'Oszthatóság 100-zal',
    formula: 'Utolsó 2 számjegy = 00',
    note: '100k alakú számok (100, 200, 300...).'
  },
  {
    topic: 'A 4 és 100 kapcsolata',
    formula: '100 = 4 · 25',
    note: 'Minden 100-zal osztható szám automatikusan osztható 4-gyel is!'
  },
  {
    topic: '4-es osztási maradék',
    formula: 'Utolsó 2 jegy mod 4',
    note: 'Pl. 735 ⟹ 35 : 4 = 8, maradék: 3.'
  },
  {
    topic: '100-as osztási maradék',
    formula: 'Maga az utolsó két számjegy!',
    note: 'Pl. 8974 100-as maradéka pontosan 74.'
  },
  {
    topic: 'Kétszeri felezés trükk',
    formula: 'N / 2 páros szám',
    note: 'Ha elfelezve még mindig páros, akkor osztható 4-gyel!'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Utolsó 2 számjegy felismerése és alapvető 4-es és 100-as oszthatóság',
    range: 'Egész számok 1000-ig, utolsó két számjegy vizsgálata',
    focus: 'Oszthatóság 4-gyel és 100-zal, 00 végződés felismerése',
    color: 'rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám osztható 4-gyel az alábbiak közül?',
        highlightValue: 'Oszthatóság 4-gyel',
        questionTypeBadge: '4-gyel osztható keresése',
        options: ['514', '628', '735', '919'],
        correctAnswer: '628',
        explanation: 'A 628 utolsó két számjegye 28. Mivel 28 : 4 = 7, a 628 osztható 4-gyel.',
        breakdown: [
          { label: 'Utolsó két számjegy', value: '28' },
          { label: '28 : 4', value: '7 (maradék 0)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám osztható 100-zal az alábbiak közül?',
        highlightValue: 'Oszthatóság 100-zal',
        questionTypeBadge: '100-zal osztható keresése',
        options: ['350', '405', '700', '955'],
        correctAnswer: '700',
        explanation: 'A 700 utolsó két számjegye 00, így maradék nélkül osztható 100-zal (700 : 100 = 7).',
        breakdown: [
          { label: 'Utolsó két jegy', value: '00' },
          { label: 'Szabály', value: 'Kizárólag a 00-ra végződő számok oszthatók 100-zal' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mely számjegyek határozzák meg egy természetes szám 4-gyel való oszthatóságát?',
        highlightValue: 'Oszthatósági szabály',
        questionTypeBadge: 'Alapszabály',
        options: [
          'Az utolsó két számjegy',
          'Csak az utolsó egy számjegy',
          'Az összes számjegy összege',
          'Az első két számjegy'
        ],
        correctAnswer: 'Az utolsó két számjegy',
        explanation: 'Mivel a 100 osztható 4-gyel (100 = 4 · 25), kizárólag az utolsó két számjegy dönti el a 4-gyel való oszthatóságot.',
        breakdown: [
          { label: 'Indoklás', value: '100 · k mindig osztható 4-gyel, csak az egyesek és tízesek számítanak' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Osztható-e 4-gyel a 134 szám?',
        highlightValue: '134 vizsgálata',
        questionTypeBadge: 'Szabály alkalmazása',
        options: [
          'Nem, mert 34 nem osztható 4-gyel (34 : 4 = 8 mar. 2)',
          'Igen, mert 4-re végződik',
          'Igen, mert páros szám',
          'Nem, mert 3-mal kezdődik'
        ],
        correctAnswer: 'Nem, mert 34 nem osztható 4-gyel (34 : 4 = 8 mar. 2)',
        explanation: 'Az utolsó két számjegy a 34. Mivel 34 : 4 = 8, és a maradék 2, a 134 nem osztható 4-gyel.',
        breakdown: [
          { label: 'Utolsó két jegy', value: '34' },
          { label: '34 : 4', value: '8, maradék: 2 (nem osztható)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik állítás IGAZ az alábbiak közül?',
        highlightValue: 'Kapcsolat a 4 és 100 között',
        questionTypeBadge: 'Logikai tétel',
        options: [
          'Minden 100-zal osztható szám osztható 4-gyel is',
          'Minden 4-gyel osztható szám osztható 100-zal is',
          'Csak a 00-ra végződő számok oszthatók 4-gyel',
          'A 4-re végződő számok mind oszthatók 4-gyel'
        ],
        correctAnswer: 'Minden 100-zal osztható szám osztható 4-gyel is',
        explanation: 'Mivel 100 = 4 · 25, minden szám, amely osztható 100-zal (00 végű), kötelezően osztható 4-gyel is.',
        breakdown: [
          { label: 'Példa', value: '100, 200, 300... mind osztható 4-gyel (25, 50, 75...)' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi az 519 szám 4-es osztási maradéka?',
        highlightValue: '519 : 4 maradéka',
        questionTypeBadge: '4-es maradék',
        options: ['1', '2', '3', '4'],
        correctAnswer: '3',
        explanation: 'Az utolsó két számjegy 19. 19 : 4 = 4, a maradék 3. Tehát 519 : 4 maradéka 3.',
        breakdown: [
          { label: 'Utolsó 2 számjegy', value: '19' },
          { label: '19 : 4', value: '4, maradék: 3' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik a legkisebb kétjegyű pozitív szám, amely osztható 4-gyel?',
        highlightValue: 'Legkisebb 2-jegyű 4-gyel osztható',
        questionTypeBadge: 'Számkeresés',
        options: ['10', '12', '14', '16'],
        correctAnswer: '12',
        explanation: 'A legkisebb kétjegyű szám a 10. A 12 a legkisebb kétjegyű 4 többszörös (3 · 4 = 12).',
        breakdown: [
          { label: '10, 11', value: 'Nem oszthatók 4-gyel' },
          { label: '12', value: '12 : 4 = 3' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik a legkisebb 3-jegyű szám, amely osztható 100-zal?',
        highlightValue: 'Legkisebb 3-jegyű 100-zal osztható',
        questionTypeBadge: 'Számkeresés',
        options: ['100', '105', '110', '200'],
        correctAnswer: '100',
        explanation: 'A legkisebb háromjegyű szám pontosan a 100, amely osztható 100-zal (100 = 1 · 100).',
        breakdown: [
          { label: 'Kezdő 3-jegyű szám', value: '100' },
          { label: '100 : 100', value: '1 (maradék 0)' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 850 szám 100-as osztási maradéka?',
        highlightValue: '850 : 100 maradéka',
        questionTypeBadge: '100-as maradék',
        options: ['0', '5', '50', '85'],
        correctAnswer: '50',
        explanation: '850 : 100 = 8, a maradék 50. A 100-as maradék mindig az utolsó két számjegy (50).',
        breakdown: [
          { label: 'Szabály', value: 'N mod 100 = utolsó 2 számjegy' },
          { label: 'Eredmény', value: '50' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám NEM osztható 4-gyel az alábbiak közül?',
        highlightValue: 'Nem osztható 4-gyel',
        questionTypeBadge: 'Kizárás',
        options: ['316', '420', '532', '646'],
        correctAnswer: '646',
        explanation: 'A 646 utolsó két száma 46. 46 : 4 = 11, maradék 2. Ezért a 646 nem osztható 4-gyel.',
        breakdown: [
          { label: '316 (16)', value: '16 : 4 = 4 (osztható)' },
          { label: '420 (20)', value: '20 : 4 = 5 (osztható)' },
          { label: '532 (32)', value: '32 : 4 = 8 (osztható)' },
          { label: '646 (46)', value: '46 : 4 = 11 mar. 2 (NEM osztható)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Maradékok leolvasása, hiányzó jegyek pótlása és felezési trükkök',
    range: 'Többjegyű számok, hiányzó számjegyek, műveletek maradékai',
    focus: 'Fejben végzett 4-es maradékszámítás, tízesek paritása',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-rose-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 789 535 szám 4-es osztási maradéka?',
        highlightValue: '789 535 : 4 maradéka',
        questionTypeBadge: '4-es maradék nagy számban',
        options: ['1', '2', '3', '5'],
        correctAnswer: '3',
        explanation: 'Csak az utolsó két számjegyet kell vizsgálni: 35 : 4 = 8, a maradék 3. Így az egész szám 4-es maradéka 3.',
        breakdown: [
          { label: 'Utolsó 2 számjegy', value: '35' },
          { label: '35 : 4', value: '8, maradék: 3' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Milyen számjegyek állhatnak a □ helyén a 43□ számban, hogy a szám osztható legyen 4-gyel?',
        highlightValue: '43□ osztható 4-gyel (páratlan tízes)',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['2 vagy 6', '0, 4 vagy 8', 'Kizárólag 4', '1 vagy 5'],
        correctAnswer: '2 vagy 6',
        explanation: 'A tízes helyén páratlan szám (3) áll, így a 32 (32:4=8) és a 36 (36:4=9) osztható 4-gyel. Tehát □ = 2 vagy 6.',
        breakdown: [
          { label: 'Lehetőségek 30-as sorban', value: '30..39' },
          { label: '4 többszörösei', value: '32 és 36 ⟹ □ ∈ {2, 6}' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Milyen számjegyek állhatnak a □ helyén az 56□ számban, hogy a szám osztható legyen 4-gyel?',
        highlightValue: '56□ osztható 4-gyel (páros tízes)',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['0, 4 vagy 8', '2 vagy 6', 'Kizárólag 0', 'Bármely páros számjegy'],
        correctAnswer: '0, 4 vagy 8',
        explanation: 'A tízes helyén páros szám (6) áll: a 60, 64 és 68 mind oszthatók 4-gyel. Tehát □ = 0, 4 vagy 8.',
        breakdown: [
          { label: 'Lehetőségek 60-as sorban', value: '60..69' },
          { label: '4 többszörösei', value: '60, 64, 68 ⟹ □ ∈ {0, 4, 8}' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Melyik szám osztható 4-gyel ÉS 5-tel is (azaz 20-szal)?',
        highlightValue: '4-gyel ÉS 5-tel osztható',
        questionTypeBadge: 'Kettős feltétel',
        options: ['315', '420', '525', '635'],
        correctAnswer: '420',
        explanation: 'Az 5-tel oszthatósághoz 0 vagy 5 kell a végére. Páros szám kell (4-gyel osztható), így csak 0 lehet a vége. A 420 utolsó két jegye 20, ami osztható 4-gyel.',
        breakdown: [
          { label: '5-tel osztható páros', value: '0-ra végződik' },
          { label: '420 utolsó két jegye', value: '20 ⟹ 20 : 4 = 5 (osztható)' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 9 000 000 078 szám 100-as osztási maradéka?',
        highlightValue: '100-as maradék',
        questionTypeBadge: 'Nagy szám 100-as maradéka',
        options: ['0', '7', '78', '8'],
        correctAnswer: '78',
        explanation: 'Bármely szám 100-zal való osztási maradéka pontosan az utolsó két számjegye: itt 78.',
        breakdown: [
          { label: 'Szabály', value: 'N mod 100 = utolsó 2 számjegy' },
          { label: 'Eredmény', value: '78' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hány olyan kétjegyű pozitív egész szám van, amely osztható 4-gyel?',
        highlightValue: 'Kétjegyű 4-gyel osztható számok',
        questionTypeBadge: 'Megszámlálás',
        options: ['22 darab', '23 darab', '24 darab', '25 darab'],
        correctAnswer: '22 darab',
        explanation: 'A kétjegyű 4-gyel osztható számok 12-től 96-ig tartanak: (96 - 12) / 4 + 1 = 84 / 4 + 1 = 21 + 1 = 22 darab.',
        breakdown: [
          { label: 'Első és utolsó', value: '12 és 96' },
          { label: 'Képlet', value: '(96 - 12) / 4 + 1 = 22 db' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Milyen számjegy állhat a □ helyén a 7□0 számban, hogy a szám osztható legyen 100-zal?',
        highlightValue: '7□0 osztható 100-zal',
        questionTypeBadge: '100-as szabály',
        options: ['Kizárólag 0', '0 vagy 5', 'Bármilyen számjegy', '1'],
        correctAnswer: 'Kizárólag 0',
        explanation: 'A 100-zal való oszthatósághoz kötelezően 00-ra kell végződnie a számnak, így □ csak 0 lehet (a szám a 700).',
        breakdown: [
          { label: 'Végződés feltétele', value: '00' },
          { label: 'Eredmény', value: '□ = 0' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a 4514 + 2318 összeg 4-es osztási maradéka?',
        highlightValue: '4514 + 2318 mod 4',
        questionTypeBadge: 'Összeg 4-es maradéka',
        options: ['0', '1', '2', '3'],
        correctAnswer: '0',
        explanation: '14 : 4 maradék 2, 18 : 4 maradék 2. A maradékok összege: 2 + 2 = 4. Mivel 4 osztható 4-gyel, az összeg 4-es maradéka 0.',
        breakdown: [
          { label: '4514 mod 4', value: '2 (14 mod 4 = 2)' },
          { label: '2318 mod 4', value: '2 (18 mod 4 = 2)' },
          { label: 'Összeg mod 4', value: '(2 + 2) mod 4 = 0' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Egy számot felezve 46-ot kapunk. Osztható-e az eredeti szám 4-gyel?',
        highlightValue: 'Felezés trükk',
        questionTypeBadge: 'Felezéses vizsgálat',
        options: [
          'Igen, mert a 46 páros, így még egyszer elfelezhető (fele 23)',
          'Nem, mert a 46 nem osztható 4-gyel',
          'Csak akkor, ha 100-nál nagyobb',
          'Nem dönthető el'
        ],
        correctAnswer: 'Igen, mert a 46 páros, így még egyszer elfelezhető (fele 23)',
        explanation: 'Az eredeti szám 2 · 46 = 92. Mivel a 46 páros, a 92 kétszer egymás után elfelezhető (92 ⟹ 46 ⟹ 23), így osztható 4-gyel (92 : 4 = 23).',
        breakdown: [
          { label: 'Eredeti szám', value: '2 · 46 = 92' },
          { label: 'Oszthatóság 4-gyel', value: '92 : 4 = 23 (maradék 0)' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Hány darab különböző számjegy írható a □ helyére, hogy a 81□ szám osztható legyen 4-gyel?',
        highlightValue: '81□ osztható 4-gyel',
        questionTypeBadge: 'Számjegy lehetőségek',
        options: ['2 darab (2 és 6)', '3 darab', '5 darab', '1 darab'],
        correctAnswer: '2 darab (2 és 6)',
        explanation: 'A tízes helyén 1 áll (páratlan). A 12 és 16 osztható 4-gyel. Ez pontosan 2 darab lehetőség.',
        breakdown: [
          { label: 'Lehetőségek', value: '12 (3·4) és 16 (4·4)' },
          { label: 'Darabszám', value: '2 db (□ ∈ {2, 6})' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Gondolkodtató szint',
    subtitle: 'Négyzetek paritása, összetett oszthatósági szabályok és algebrai feladatok',
    range: 'Algebrai azonosságok, közös osztók, kombinatorikus számkeresés',
    focus: '4-gyel és 100-zal oszthatóság bizonyításai, maradékos összefüggések',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Melyik a legnagyobb háromjegyű szám, amely osztható 4-gyel?',
        highlightValue: 'Legnagyobb 3-jegyű 4-gyel osztható',
        questionTypeBadge: 'Extrémum keresés',
        options: ['996', '998', '992', '999'],
        correctAnswer: '996',
        explanation: 'A 999 páratlan, 998 végződése 98 (98:4=24 mar. 2), a 996 végződése 96 (96 : 4 = 24). Így a 996 a legnagyobb.',
        breakdown: [
          { label: '996 utolsó 2 jegye', value: '96 ⟹ 96 : 4 = 24' },
          { label: 'Eredmény', value: '996' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Bármely páros egész szám négyzete [(2k)²] biztosan osztható...',
        highlightValue: '(2k)² paritása',
        questionTypeBadge: 'Algebrai bizonyítás',
        options: ['Mindig 4-gyel', 'Csak 2-vel', 'Mindig 8-cal', 'Mindig 16-tal'],
        correctAnswer: 'Mindig 4-gyel',
        explanation: '(2k)² = 4k², ami a 4 szorzótényező miatt mindig osztható 4-gyel.',
        breakdown: [
          { label: 'Képlet', value: '(2k)² = 4k²' },
          { label: 'Következtetés', value: 'Mindig 4 többszöröse' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy számot 100-zal osztva 36 a maradék. Mennyi maradékot ad ugyanez a szám 4-gyel osztva?',
        highlightValue: 'N mod 100 = 36 ⟹ N mod 4 = ?',
        questionTypeBadge: 'Maradék átszámítás',
        options: ['0 (pontosan kijön)', '1', '2', '3'],
        correctAnswer: '0 (pontosan kijön)',
        explanation: 'N = 100k + 36. Mivel a 100k és a 36 is osztható 4-gyel (36 : 4 = 9), a szám 4-es maradéka 0.',
        breakdown: [
          { label: '36 : 4', value: '9, maradék: 0' },
          { label: 'Következtetés', value: 'A szám maradék nélkül osztható 4-gyel' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Egy számot 100-zal osztva 75 a maradék. Mennyi a 4-es osztási maradéka?',
        highlightValue: 'N mod 100 = 75 ⟹ N mod 4 = ?',
        questionTypeBadge: 'Maradék átszámítás',
        options: ['3', '1', '2', '0'],
        correctAnswer: '3',
        explanation: 'N = 100k + 75. A 75-öt 4-gyel osztva: 75 : 4 = 18, a maradék 3. Tehát a 4-es maradék 3.',
        breakdown: [
          { label: '75 : 4', value: '18, maradék: 3' },
          { label: 'Eredmény', value: '3' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik a legkisebb négyjegyű szám, amely 4-gyel és 100-zal is osztható?',
        highlightValue: 'Legkisebb 4-jegyű (4 és 100 többszöröse)',
        questionTypeBadge: 'Számkeresés',
        options: ['1000', '1004', '1040', '1100'],
        correctAnswer: '1000',
        explanation: 'A legkisebb négyjegyű szám az 1000, amely 00-ra végződik, így 100-zal és 4-gyel is osztható.',
        breakdown: [
          { label: 'Kezdő 4-jegyű szám', value: '1000' },
          { label: 'Utolsó 2 jegy', value: '00 ⟹ osztható 100-zal és 4-gyel is' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Milyen számjegyet kell írni az 5□□ szám mindkét □ helyére (azonos számjegy!), hogy a szám osztható legyen 4-gyel?',
        highlightValue: '5□□ osztható 4-gyel',
        questionTypeBadge: 'Azonos hiányzó jegyek',
        options: ['0, 4 vagy 8', '2 vagy 6', 'Kizárólag 4', 'Bármely páros jegy'],
        correctAnswer: '0, 4 vagy 8',
        explanation: 'Az azonos kétjegyű végződések: 00, 44 és 88 mind oszthatók 4-gyel (00:4=0, 44:4=11, 88:4=22).',
        breakdown: [
          { label: 'Lehetőségek', value: '00, 11, 22, 33, 44, 55, 66, 77, 88, 99' },
          { label: '4-gyel oszthatók', value: '00, 44, 88 ⟹ □ ∈ {0, 4, 8}' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Igaz-e, hogy két tetszőleges páratlan szám összege mindig osztható 4-gyel?',
        highlightValue: 'Páratlan + Páratlan mod 4',
        questionTypeBadge: 'Állítás elemzése',
        options: [
          'Nem feltétlenül (pl. 3 + 5 = 8 osztható, de 1 + 5 = 6 nem osztható 4-gyel)',
          'Igen, mindig osztható 4-gyel',
          'Soha nem osztható 4-gyel',
          'Csak akkor, ha 5-nél nagyobbak'
        ],
        correctAnswer: 'Nem feltétlenül (pl. 3 + 5 = 8 osztható, de 1 + 5 = 6 nem osztható 4-gyel)',
        explanation: 'Két páratlan szám összege mindig páros (2-vel osztható), de 4-gyel nem feltétlenül osztható (pl. 1 + 5 = 6, 6 : 4 = 1 mar. 2).',
        breakdown: [
          { label: 'Példa 1', value: '1 + 3 = 4 (osztható 4-gyel)' },
          { label: 'Példa 2', value: '1 + 5 = 6 (NEM osztható 4-gyel)' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Ha \'a\' szám 4-es maradéka 3, és \'b\' szám 4-es maradéka 2, mennyi a szorzatuk (a · b) 4-es maradéka?',
        highlightValue: '(3 · 2) mod 4',
        questionTypeBadge: 'Szorzat 4-es maradéka',
        options: ['2', '0', '1', '3'],
        correctAnswer: '2',
        explanation: 'A szorzat maradéka a maradékok szorzatának maradéka: 3 · 2 = 6. 6 : 4 = 1, a maradék 2.',
        breakdown: [
          { label: 'Maradékok szorzata', value: '3 · 2 = 6' },
          { label: '6 : 4', value: '1, maradék: 2' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik a legkisebb 3-jegyű szám, amely 4-gyel és 9-cel is osztható (azaz 36-tal)?',
        highlightValue: 'Legkisebb 3-jegyű (4 és 9 többszöröse)',
        questionTypeBadge: 'Összetett oszthatóság',
        options: ['108', '116', '126', '144'],
        correctAnswer: '108',
        explanation: 'A 108 utolsó két jegye 08 (osztható 4-gyel), számjegyösszege 1 + 0 + 8 = 9 (osztható 9-cel). 108 = 3 · 36.',
        breakdown: [
          { label: '4-gyel', value: '08 : 4 = 2 (osztható)' },
          { label: '9-cel', value: '1 + 0 + 8 = 9 (osztható)' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Hány darab olyan háromjegyű pozitív szám létezik, amely osztható 100-zal?',
        highlightValue: 'Háromjegyű 100-zal osztható számok',
        questionTypeBadge: 'Megszámlálás',
        options: ['9 darab (100, 200, ..., 900)', '10 darab', '8 darab', '90 darab'],
        correctAnswer: '9 darab (100, 200, ..., 900)',
        explanation: 'A háromjegyű 100-zal osztható számok: 100, 200, 300, 400, 500, 600, 700, 800, 900 (összesen 9 darab).',
        breakdown: [
          { label: 'Lista', value: '100, 200, 300, 400, 500, 600, 700, 800, 900' },
          { label: 'Darabszám', value: '9 db' }
        ]
      }
    ]
  }
};

const GAME_MODES: CustomGameMode[] = [
  {
    id: 'matcher',
    title: 'Kártyás Párosító',
    subtitle: '8 pár megkeresése',
    badgeText: '8 Pár',
    icon: <LayoutGrid className="w-3.5 h-3.5 text-rose-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisibilityBy4100Matcher
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  },
  {
    id: 'sorter',
    title: 'Csoportosító',
    subtitle: 'Helyezd a megfelelő csoportba',
    badgeText: '10 Elem (3 csoport)',
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisibilityBy4100Sorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function DivisibilityBy4100Quiz({ onBack }: DivisibilityBy4100QuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="💯"
      topicBadge="💯 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 4-gyel és 100-zal kvíz"
      subtitle="Teszteld a tudásod az utolsó két számjegy szabályairól, a maradékokról és a fejszámolási trükkökről 3 szinten!"
      cheatSheetTitle="Oszthatóság 4-gyel és 100-zal Segédlet"
      hintText="💡 Figyeld az utolsó két számjegyet: ha az osztható 4-gyel (vagy 00), akkor az egész szám is osztható 4-gyel!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="cyan"
    />
  );
}
