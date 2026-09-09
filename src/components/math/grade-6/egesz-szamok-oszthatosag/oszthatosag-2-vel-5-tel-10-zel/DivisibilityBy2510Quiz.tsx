import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { DivisibilityBy2510Matcher } from './DivisibilityBy2510Matcher';
import { DivisibilityBy2510Sorter } from './DivisibilityBy2510Sorter';

export interface DivisibilityBy2510QuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Oszthatóság 2-vel',
    formula: 'Utolsó számjegy: 0, 2, 4, 6, 8',
    note: 'A szám páros (2k alakú). A 0 is páros szám!'
  },
  {
    topic: 'Oszthatóság 5-tel',
    formula: 'Utolsó számjegy: 0 vagy 5',
    note: '5k alakú számok. Maradék: 0, 1, 2, 3 vagy 4.'
  },
  {
    topic: 'Oszthatóság 10-zel',
    formula: 'Utolsó számjegy: 0',
    note: '10 = 2 · 5, így automatikusan osztható 2-vel és 5-tel is!'
  },
  {
    topic: '2-es osztási maradék',
    formula: 'Utolsó jegy mod 2',
    note: 'Páros számoknál 0, páratlan számoknál 1.'
  },
  {
    topic: '5-ös osztási maradék',
    formula: 'Utolsó jegy mod 5',
    note: 'Pl. 738 utolsó jegye 8 -> 8 : 5 = 1, maradék: 3.'
  },
  {
    topic: '10-es osztási maradék',
    formula: 'Maga az utolsó számjegy!',
    note: 'Pl. 9487 10-es maradéka pontosan 7.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető felismerések, párosság és 2-3 jegyű számok oszthatósága',
    range: 'Egész számok 1000-ig, utolsó számjegy vizsgálata',
    focus: 'Oszthatóság 2-vel, 5-tel, 10-zel, 0 párossága',
    color: 'cyan',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám osztható 2-vel az alábbiak közül?',
        highlightValue: 'Oszthatóság 2-vel',
        questionTypeBadge: 'Páros szám keresése',
        options: ['347', '582', '919', '125'],
        correctAnswer: '582',
        explanation: 'Az 582 utolsó számjegye 2 (páros), így maradék nélkül osztható 2-vel.',
        breakdown: [
          { label: 'Utolsó számjegy', value: '2 (páros)' },
          { label: 'Szabály', value: '0, 2, 4, 6, 8 végű számok oszthatók 2-vel' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám osztható 5-tel az alábbiak közül?',
        highlightValue: 'Oszthatóság 5-tel',
        questionTypeBadge: '5-tel osztható szám',
        options: ['412', '785', '603', '991'],
        correctAnswer: '785',
        explanation: 'A 785 utolsó száma 5, ezért maradék nélkül osztható 5-tel (785 : 5 = 157).',
        breakdown: [
          { label: 'Utolsó jegy', value: '5' },
          { label: 'Szabály', value: '0 vagy 5 végű számok oszthatók 5-tel' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Melyik szám osztható 10-zel az alábbiak közül?',
        highlightValue: 'Oszthatóság 10-zel',
        questionTypeBadge: '10-zel osztható szám',
        options: ['205', '340', '412', '809'],
        correctAnswer: '340',
        explanation: 'A 340 utolsó számjegye 0, így maradék nélkül osztható 10-zel (340 : 10 = 34).',
        breakdown: [
          { label: 'Utolsó számjegy', value: '0' },
          { label: 'Szabály', value: 'Kizárólag a 0-ra végződő számok oszthatók 10-zel' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Páros szám-e a nulla (0)?',
        highlightValue: '0 párossága',
        questionTypeBadge: 'Alapfogalom',
        options: ['Igen, páros szám', 'Nem, páratlan szám', 'Sem nem páros, sem nem páratlan', 'Csak a pozitív számok lehetnek párosak'],
        correctAnswer: 'Igen, páros szám',
        explanation: 'A 0 páros szám, mert 2-vel osztva 0 a hányados és 0 a maradék (0 = 2 · 0).',
        breakdown: [
          { label: 'Matematikai definíció', value: 'Egy szám páros, ha felírható 2 · k alakban' },
          { label: '0 esetén', value: '0 = 2 · 0 (ahol k = 0 egész szám)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 736 osztási maradéka 2-vel osztva?',
        highlightValue: '736 : 2 maradéka',
        questionTypeBadge: 'Maradékszámítás',
        options: ['0', '1', '2', '6'],
        correctAnswer: '0',
        explanation: 'Mivel a 736 utolsó jegye 6 (páros szám), 2-vel való osztási maradéka 0.',
        breakdown: [
          { label: 'Utolsó jegy', value: '6 (páros)' },
          { label: '2-es maradék', value: 'Páros számok maradéka: 0' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik állítás IGAZ az alábbiak közül?',
        highlightValue: 'Szabályok kapcsolata',
        questionTypeBadge: 'Logikai állítás',
        options: [
          'Minden 5-tel osztható szám osztható 10-zel is',
          'Minden 10-zel osztható szám osztható 5-tel is',
          'Minden páros szám osztható 10-zel',
          'Minden 5-tel osztható szám páratlan'
        ],
        correctAnswer: 'Minden 10-zel osztható szám osztható 5-tel is',
        explanation: 'Mivel 10 = 2 · 5, minden 10-zel osztható szám (0 végű) automatikusan osztható 5-tel és 2-vel is.',
        breakdown: [
          { label: 'Indoklás', value: 'A 10 többszörösei: 10, 20, 30... mind 5 többszörösei is' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik a legkisebb kétjegyű pozitív egész szám, amely osztható 5-tel?',
        highlightValue: 'Legkisebb 2-jegyű 5-tel osztható',
        questionTypeBadge: 'Számkeresés',
        options: ['5', '10', '15', '20'],
        correctAnswer: '10',
        explanation: 'A legkisebb kétjegyű egész szám a 10, és 10 osztható 5-tel (10 = 2 · 5).',
        breakdown: [
          { label: 'Legkisebb kétjegyű szám', value: '10' },
          { label: 'Oszthatóság', value: '10 : 5 = 2 (maradék 0)' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hány darab egyjegyű pozitív egész szám osztható 2-vel?',
        highlightValue: 'Egyjegyű páros számok',
        questionTypeBadge: 'Megszámlálás',
        options: ['3 darab', '4 darab', '5 darab', '9 darab'],
        correctAnswer: '4 darab',
        explanation: 'Az egyjegyű pozitív páros számok: 2, 4, 6, 8 (összesen 4 darab). A 0 nem pozitív szám!',
        breakdown: [
          { label: 'Pozitív egyjegyű párosak', value: '2, 4, 6, 8' },
          { label: 'Darabszám', value: '4 darab' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 485 szám 5-tel való osztási maradéka?',
        highlightValue: '485 : 5 maradéka',
        questionTypeBadge: '5-ös maradék',
        options: ['0', '1', '5', '8'],
        correctAnswer: '0',
        explanation: 'Mivel a 485 utolsó számjegye 5, maradék nélkül osztható 5-tel (maradék: 0).',
        breakdown: [
          { label: 'Utolsó számjegy', value: '5' },
          { label: 'Maradék', value: '0' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám NEM osztható sem 2-vel, sem 5-tel?',
        highlightValue: 'Nem osztható 2-vel és 5-tel sem',
        questionTypeBadge: 'Kizárásos keresés',
        options: ['430', '512', '645', '789'],
        correctAnswer: '789',
        explanation: 'A 789 utolsó jegye 9. Páratlan (nem osztható 2-vel) és nem 0 vagy 5 (nem osztható 5-tel sem).',
        breakdown: [
          { label: '430', value: 'Osztható 2-vel és 5-tel is (0 végű)' },
          { label: '512', value: 'Osztható 2-vel (2 végű)' },
          { label: '645', value: 'Osztható 5-tel (5 végű)' },
          { label: '789', value: '9 végű -> sem 2-vel, sem 5-tel nem osztható' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Maradékok közvetlen leolvasása, hiányzó számjegyek és többjegyű számok',
    range: 'Többjegyű számok, nyitott mondatok, helyiértékes maradékok',
    focus: 'Fejben végzett maradékszámítás, hiányzó jegyek pótlása',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 8437 osztási maradéka 5-tel anélkül, hogy elvégeznénk a teljes osztást?',
        highlightValue: '8437 : 5 maradéka',
        questionTypeBadge: '5-ös maradék leolvasása',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: 'Csak az utolsó számjegyet vizsgáljuk: 7 : 5 = 1, a maradék 2. Ezért 8437 : 5 maradéka is 2.',
        breakdown: [
          { label: 'Utolsó számjegy', value: '7' },
          { label: 'Maradék számítás', value: '7 : 5 = 1, maradék: 2' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 95 843 szám 10-zel való osztási maradéka?',
        highlightValue: '95 843 : 10 maradéka',
        questionTypeBadge: '10-es maradék azonnal',
        options: ['0', '3', '4', '8'],
        correctAnswer: '3',
        explanation: 'Bármely természetes szám 10-es osztási maradéka pontosan az utolsó számjegye: itt 3.',
        breakdown: [
          { label: 'Szabály', value: 'N mod 10 = utolsó számjegy' },
          { label: 'Eredmény', value: '3' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Milyen számjegy állhat a □ helyén a 45□ háromjegyű számban, ha a szám osztható 2-vel és 5-tel is?',
        highlightValue: '45□ osztható 2-vel és 5-tel',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['Kizárólag 0', '0 vagy 5', 'Bármely páros szám', 'Nincs ilyen számjegy'],
        correctAnswer: 'Kizárólag 0',
        explanation: 'Ha egy szám osztható 2-vel ÉS 5-tel is, akkor 10-zel is osztható, így az utolsó jegye kizárólag 0 lehet.',
        breakdown: [
          { label: '2-vel osztható', value: '□ ∈ {0, 2, 4, 6, 8}' },
          { label: '5-tel osztható', value: '□ ∈ {0, 5}' },
          { label: 'Közös metszet', value: '□ = 0' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Milyen számjegyek állhatnak a □ helyén a 72□ számban, ha a számot 5-tel osztva 3 a maradék?',
        highlightValue: '72□ : 5 maradék = 3',
        questionTypeBadge: 'Maradékos feltétel',
        options: ['Kizárólag a 3', '3 vagy 8', 'Kizárólag a 8', '1 vagy 6'],
        correctAnswer: '3 vagy 8',
        explanation: 'Az utolsó jegyet 5-tel osztva 3 kell legyen a maradék: a 3 (3:5=0 mar. 3) és a 8 (8:5=1 mar. 3) felel meg.',
        breakdown: [
          { label: 'Lehetőségek', value: '0+3 = 3, és 5+3 = 8' },
          { label: 'Megoldás', value: '□ lehet 3 vagy 8' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Melyik szám páros ÉS osztható 5-tel is az alábbiak közül?',
        highlightValue: 'Páros ÉS 5-tel osztható',
        questionTypeBadge: 'Kettős feltétel',
        options: ['1025', '2345', '4580', '6782'],
        correctAnswer: '4580',
        explanation: 'Páros és 5-tel osztható = 10-zel osztható (0-ra végződik). A 4580 utolsó jegye 0.',
        breakdown: [
          { label: 'Feltétel', value: 'Páros (0,2,4,6,8) ÉS 5-ös (0,5) -> csak a 0 jó' },
          { label: 'Helyes válasz', value: '4580' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hány olyan kétjegyű szám létezik, amely osztható 10-zel?',
        highlightValue: 'Kétjegyű 10-zel osztható számok',
        questionTypeBadge: 'Darabszám meghatározás',
        options: ['9 darab', '10 darab', '8 darab', '90 darab'],
        correctAnswer: '9 darab',
        explanation: 'A kétjegyű 10-zel osztható számok: 10, 20, 30, 40, 50, 60, 70, 80, 90 (összesen 9 darab).',
        breakdown: [
          { label: 'Lista', value: '10, 20, 30, 40, 50, 60, 70, 80, 90' },
          { label: 'Darabszám', value: '9 db' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mi a 329 + 481 összeg utolsó számjegye, és osztható-e 10-zel az eredmény?',
        highlightValue: '329 + 481',
        questionTypeBadge: 'Művelet utolsó jegye',
        options: [
          'Utolsó jegy: 0, osztható 10-zel',
          'Utolsó jegy: 1, nem osztható 10-zel',
          'Utolsó jegy: 5, osztható 5-tel de nem 10-zel',
          'Utolsó jegy: 9, nem osztható 10-zel'
        ],
        correctAnswer: 'Utolsó jegy: 0, osztható 10-zel',
        explanation: 'Az utolsó jegyek összege: 9 + 1 = 10, tehát az összeg 0-ra végződik (329 + 481 = 810), így osztható 10-zel.',
        breakdown: [
          { label: 'Utolsó jegyek', value: '9 + 1 = 10 (utolsó számjegy: 0)' },
          { label: 'Oszthatóság', value: '0 végű -> osztható 10-zel' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Hány darab különböző számjegy írható a □ helyére, hogy a 81□ szám páratlan legyen?',
        highlightValue: '81□ páratlan szám',
        questionTypeBadge: 'Számjegy lehetőségek',
        options: ['4 darab', '5 darab', '9 darab', '10 darab'],
        correctAnswer: '5 darab',
        explanation: 'A páratlan számjegyek az 1, 3, 5, 7, 9. Ez pontosan 5 darab különböző lehetőség.',
        breakdown: [
          { label: 'Páratlan számjegyek', value: '{1, 3, 5, 7, 9}' },
          { label: 'Lehetőségek száma', value: '5' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a 4 000 000 008 szám 5-tel való osztási maradéka?',
        highlightValue: '4 000 000 008 : 5 maradéka',
        questionTypeBadge: 'Nagy számok maradéka',
        options: ['1', '2', '3', '8'],
        correctAnswer: '3',
        explanation: 'A szám hossza nem számít: az utolsó számjegy 8. 8 : 5 = 1, a maradék 3.',
        breakdown: [
          { label: 'Utolsó számjegy', value: '8' },
          { label: '8 : 5', value: '1, maradék: 3' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Létezhet-e olyan egész szám, amely 10-zel osztható, de 5-tel NEM?',
        highlightValue: '10-zel osztható, de 5-tel nem?',
        questionTypeBadge: 'Elméleti tétel',
        options: [
          'Nem létezik ilyen szám, mert ami 10-zel osztható, az 5-tel is osztható',
          'Igen, a 20 ilyen szám',
          'Igen, minden páros tízes ilyen',
          'Csak a negatív számok között van ilyen'
        ],
        correctAnswer: 'Nem létezik ilyen szám, mert ami 10-zel osztható, az 5-tel is osztható',
        explanation: 'Mivel 10 = 2 · 5, ha egy szám osztható 10-zel (0-ra végződik), akkor kötelezően osztható 5-tel és 2-vel is.',
        breakdown: [
          { label: 'Bizonyítás', value: '10k = 5 · (2k), ami mindig 5 többszöröse' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Gondolkodtató szint',
    subtitle: 'Összetett összefüggések, műveletek paritása és logikai feladatok',
    range: 'Számelméleti következtetések, n-jegyű számok keresése, maradékos algebra',
    focus: 'Paritási szabályok, naptárszerű maradékok, bizonyítások',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Két tetszőleges páratlan szám összege mindig milyen számot ad?',
        highlightValue: 'Páratlan + Páratlan',
        questionTypeBadge: 'Paritás vizsgálat',
        options: ['Mindig páros', 'Mindig páratlan', 'Lehet páros is és páratlan is', 'Mindig 0-ra végződik'],
        correctAnswer: 'Mindig páros',
        explanation: '(2k + 1) + (2m + 1) = 2k + 2m + 2 = 2(k + m + 1), ami mindig osztható 2-vel, azaz páros.',
        breakdown: [
          { label: 'Példa', value: '3 + 5 = 8 (páros), 17 + 23 = 40 (páros)' },
          { label: 'Szabály', value: 'Páratlan + Páratlan = Páros' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Melyik a legnagyobb háromjegyű szám, amely osztható 5-tel, de NEM osztható 2-vel?',
        highlightValue: 'Legnagyobb 3-jegyű 5-tel osztható páratlan',
        questionTypeBadge: 'Extrémum keresés',
        options: ['990', '995', '999', '985'],
        correctAnswer: '995',
        explanation: 'A legnagyobb 3-jegyű szám a 999. 5-tel oszthatóak visszafelé: 995, 990... A 995 páratlan (5 végű), így nem osztható 2-vel.',
        breakdown: [
          { label: '995 utolsó jegye', value: '5 (5-tel osztható, 2-vel nem)' },
          { label: '990 utolsó jegye', value: '0 (2-vel is osztható lenne)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy természetes számot 10-zel osztva 7 a maradék. Mennyi maradékot ad ez a szám, ha 5-tel osztjuk?',
        highlightValue: 'N mod 10 = 7 -> N mod 5 = ?',
        questionTypeBadge: 'Maradék átszámítás',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: 'A szám utolsó számjegye 7. 7-et 5-tel osztva: 7 : 5 = 1, maradék 2. Tehát a szám 5-ös maradéka 2.',
        breakdown: [
          { label: 'Utolsó számjegy', value: '7 (mivel a 10-es maradék 7)' },
          { label: '5-ös osztás', value: '7 = 5 · 1 + 2 -> maradék: 2' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Hány olyan háromjegyű szám van, amelynek az utolsó számjegye 5?',
        highlightValue: 'Háromjegyű 5-re végződő számok',
        questionTypeBadge: 'Kombinatorikus számlálás',
        options: ['90 darab', '100 darab', '180 darab', '9 darab'],
        correctAnswer: '90 darab',
        explanation: 'A százasok helyén 1-9 (9 db), a tízesek helyén 0-9 (10 db), az egyesek helyén csak az 5 (1 db) állhat: 9 · 10 · 1 = 90 darab.',
        breakdown: [
          { label: 'Százas helyiérték', value: '9 lehetőség (1..9)' },
          { label: 'Tízes helyiérték', value: '10 lehetőség (0..9)' },
          { label: 'Összesen', value: '9 · 10 · 1 = 90 darab' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Milyen számjegyre végződik bármely 5-re végződő egész szám négyzete (...5 · ...5)?',
        highlightValue: '(...5)² utolsó jegye',
        questionTypeBadge: 'Hatványozási szabály',
        options: ['Kizárólag 5-re (sőt 25-re)', '0-ra vagy 5-re', 'Bármilyen páratlan számjegyre', '0-ra'],
        correctAnswer: 'Kizárólag 5-re (sőt 25-re)',
        explanation: '5 · 5 = 25, így az utolsó számjegy mindig 5 (sőt, az utolsó két jegy mindig 25: 15² = 225, 25² = 625, 35² = 1225).',
        breakdown: [
          { label: 'Példák', value: '5² = 25, 15² = 225, 25² = 625' },
          { label: 'Utolsó számjegy', value: 'Mindig 5' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik számjegyet kell mindkét □ helyére beírni a 4□82□ számban, hogy a kapott 5-jegyű szám osztható legyen 10-zel?',
        highlightValue: '4□82□ osztható 10-zel',
        questionTypeBadge: 'Azonos hiányzó jegyek',
        options: ['0', '2', '5', '8'],
        correctAnswer: '0',
        explanation: 'A 10-zel oszthatósághoz az utolsó számjegynek kötelezően 0-nak kell lennie, így mindkét □ helyére a 0 kerül (a szám: 40 820).',
        breakdown: [
          { label: 'Feltétel a végére', value: 'Utolsó jegy = 0' },
          { label: 'Kapott szám', value: '40 820 (osztható 10-zel)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Ha \'a\' szám 5-tel osztva 3-at, \'b\' szám pedig 5-tel osztva 4-et ad maradékul, mennyi az (a + b) összeg 5-ös maradéka?',
        highlightValue: '(3 + 4) mod 5',
        questionTypeBadge: 'Maradékok összeadása',
        options: ['0', '1', '2', '7'],
        correctAnswer: '2',
        explanation: 'A maradékok összeadódnak: 3 + 4 = 7. A 7-et 5-tel osztva: 7 : 5 = 1, a maradék 2.',
        breakdown: [
          { label: 'Maradékok összege', value: '3 + 4 = 7' },
          { label: '7 : 5 maradéka', value: '2' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Három egymást követő egész szám szorzata (pl. 4 · 5 · 6) biztosan...',
        highlightValue: 'n · (n+1) · (n+2)',
        questionTypeBadge: 'Szorzat tulajdonságai',
        options: [
          'Biztosan osztható 2-vel (páros)',
          'Biztosan osztható 10-zel',
          'Mindig páratlan',
          'Csak akkor páros, ha az első szám páros'
        ],
        correctAnswer: 'Biztosan osztható 2-vel (páros)',
        explanation: 'Három egymást követő szám közül legalább egy páros (sőt, legalább egy 3-mal is osztható), így a szorzatuk mindig páros.',
        breakdown: [
          { label: 'Példa 1', value: '1 · 2 · 3 = 6 (páros)' },
          { label: 'Példa 2', value: '4 · 5 · 6 = 120 (páros)' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik a legkisebb olyan négyjegyű szám, amely 2-vel, 5-tel és 10-zel is osztható?',
        highlightValue: 'Legkisebb 4-jegyű (2, 5, 10-zel osztható)',
        questionTypeBadge: 'Legkisebb szám megadása',
        options: ['1000', '1010', '1005', '1020'],
        correctAnswer: '1000',
        explanation: 'A legkisebb négyjegyű természetes szám az 1000. Mivel 0-ra végződik, osztható 2-vel, 5-tel és 10-zel is.',
        breakdown: [
          { label: 'Legkisebb 4-jegyű szám', value: '1000' },
          { label: 'Utolsó jegy', value: '0 -> osztható 2, 5, 10-zel' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy dobozban lévő golyókat 10-esével csomagolva 4 marad ki. Mennyi maradna ki, ha 2-esével, illetve ha 5-ösével csomagolnánk?',
        highlightValue: 'N mod 10 = 4 -> mod 2 és mod 5?',
        questionTypeBadge: 'Gyakorlati szöveges feladat',
        options: [
          '2-esével: 0 maradék (pont kijön), 5-ösével: 4 maradék',
          '2-esével: 1 maradék, 5-ösével: 1 maradék',
          '2-esével: 0 maradék, 5-ösével: 0 maradék',
          '2-esével: 2 maradék, 5-ösével: 2 maradék'
        ],
        correctAnswer: '2-esével: 0 maradék (pont kijön), 5-ösével: 4 maradék',
        explanation: 'A golyók száma 4-re végződik (10k + 4). 4 páros -> 2-vel osztva 0 maradék. 4 : 5 -> hányados 0, maradék 4.',
        breakdown: [
          { label: '2-esével osztva', value: '4 páros -> 0 maradék' },
          { label: '5-ösével osztva', value: '4 : 5 = 0, maradék: 4' }
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
    icon: <LayoutGrid className="w-3.5 h-3.5 text-cyan-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisibilityBy2510Matcher
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
      <DivisibilityBy2510Sorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function DivisibilityBy2510Quiz({ onBack }: DivisibilityBy2510QuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🔟"
      topicBadge="🔟 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 2-vel, 5-tel, 10-zel kvíz"
      subtitle="Teszteld a tudásod az utolsó számjegy alapú oszthatósági szabályokról, a maradékok leolvasásáról és a logikai trükkökről 3 szinten!"
      cheatSheetTitle="Oszthatóság 2-vel, 5-tel, 10-zel Segédlet"
      hintText="💡 Vizsgáld mindig az utolsó számjegyet: 2-nél a páros jegyeket (0,2,4,6,8), 5-nél a 0-t és 5-öt, 10-nél csak a 0-t!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="cyan"
    />
  );
}
