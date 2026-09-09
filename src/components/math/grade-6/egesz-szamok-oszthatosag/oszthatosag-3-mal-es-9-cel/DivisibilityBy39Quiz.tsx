import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { DivisibilityBy39Matcher } from './DivisibilityBy39Matcher';
import { DivisibilityBy39Sorter } from './DivisibilityBy39Sorter';

export interface DivisibilityBy39QuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Oszthatóság 3-mal',
    formula: 'Számjegyösszeg ∈ 3k',
    note: 'Ha a számjegyek összege osztható 3-mal (pl. 3, 6, 9, 12...).'
  },
  {
    topic: 'Oszthatóság 9-cel',
    formula: 'Számjegyösszeg ∈ 9k',
    note: 'Ha a számjegyek összege osztható 9-cel (pl. 9, 18, 27...).'
  },
  {
    topic: 'A 3 és 9 kapcsolata',
    formula: '9-cel osztható ⟹ 3-mal is osztható',
    note: 'Fordítva nem kötelező! (Pl. 6 osztható 3-mal, de 9-cel nem).'
  },
  {
    topic: '3-as osztási maradék',
    formula: 'Számjegyösszeg mod 3',
    note: 'Pl. 415 ⟹ 4+1+5=10 ⟹ 10 : 3 mar. 1.'
  },
  {
    topic: '9-es osztási maradék',
    formula: 'Számjegyösszeg mod 9',
    note: 'Pl. 748 ⟹ 7+4+8=19 ⟹ 19 : 9 mar. 1.'
  },
  {
    topic: 'Kilences-próba trükk',
    formula: '9-esek elhagyása',
    note: 'A 9-es jegyek és az összeget 9-re kiegészítő párok kihagyhatók.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető számjegyösszegek és oszthatósági felismerések',
    range: 'Egész számok 1000-ig, számjegyek összeadásának gyakorlása',
    focus: 'Oszthatóság 3-mal és 9-cel, számjegyösszeg kiszámítása',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám osztható 3-mal az alábbiak közül?',
        highlightValue: 'Oszthatóság 3-mal',
        questionTypeBadge: '3-mal osztható keresése',
        options: ['415', '528', '712', '904'],
        correctAnswer: '528',
        explanation: 'Az 528 számjegyeinek összege: 5 + 2 + 8 = 15. Mivel 15 osztható 3-mal (15 : 3 = 5), az 528 is osztható 3-mal.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '5 + 2 + 8 = 15' },
          { label: '15 : 3', value: '5 (maradék: 0)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám osztható 9-cel az alábbiak közül?',
        highlightValue: 'Oszthatóság 9-cel',
        questionTypeBadge: '9-cel osztható keresése',
        options: ['324', '415', '602', '718'],
        correctAnswer: '324',
        explanation: 'A 324 számjegyeinek összege: 3 + 2 + 4 = 9. Mivel 9 osztható 9-cel, a 324 is osztható 9-cel.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '3 + 2 + 4 = 9' },
          { label: '9 : 9', value: '1 (maradék: 0)' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a 275 szám számjegyeinek összege?',
        highlightValue: '275 számjegyösszege',
        questionTypeBadge: 'Számjegyek összeadása',
        options: ['12', '14', '15', '16'],
        correctAnswer: '14',
        explanation: '2 + 7 + 5 = 14.',
        breakdown: [
          { label: 'Lépés 1', value: '2 + 7 = 9' },
          { label: 'Lépés 2', value: '9 + 5 = 14' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Osztható-e 3-mal a 275 szám?',
        highlightValue: '275 osztható 3-mal?',
        questionTypeBadge: 'Szabály alkalmazása',
        options: [
          'Nem, mert a számjegyek összege 14, ami nem osztható 3-mal',
          'Igen, mert 5-re végződik',
          'Igen, mert 27-tel kezdődik',
          'Nem, mert páratlan szám'
        ],
        correctAnswer: 'Nem, mert a számjegyek összege 14, ami nem osztható 3-mal',
        explanation: 'A 275 számjegyeinek összege 14. Mivel 14 nem osztható 3-mal (14 : 3 = 4, mar. 2), a 275 sem osztható 3-mal.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '14' },
          { label: '14 mod 3', value: '2 (nem 0)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik állítás IGAZ az alábbiak közül?',
        highlightValue: 'Kapcsolat a 3 és 9 között',
        questionTypeBadge: 'Logikai tétel',
        options: [
          'Minden 9-cel osztható szám osztható 3-mal is',
          'Minden 3-mal osztható szám osztható 9-cel is',
          'Csak a páratlan számok oszthatók 3-mal',
          'A 3-ra végződő számok mind oszthatók 3-mal'
        ],
        correctAnswer: 'Minden 9-cel osztható szám osztható 3-mal is',
        explanation: 'Mivel 9 = 3 · 3, minden szám, amely 9-cel osztható, kötelezően osztható 3-mal is.',
        breakdown: [
          { label: 'Indoklás', value: 'A 9 többszörösei (9, 18, 27...) mind a 3-nak is többszörösei' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 431 szám 3-as osztási maradéka?',
        highlightValue: '431 : 3 maradéka',
        questionTypeBadge: '3-as maradék',
        options: ['0', '1', '2', '4'],
        correctAnswer: '2',
        explanation: 'A számjegyek összege: 4 + 3 + 1 = 8. A 8-at 3-mal osztva: 8 : 3 = 2, maradék 2.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '4 + 3 + 1 = 8' },
          { label: '8 : 3', value: '2, maradék: 2' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik a legkisebb kétjegyű pozitív szám, amely osztható 3-mal?',
        highlightValue: 'Legkisebb 2-jegyű 3-mal osztható',
        questionTypeBadge: 'Számkeresés',
        options: ['10', '11', '12', '15'],
        correctAnswer: '12',
        explanation: 'A legkisebb kétjegyű szám a 10. A 12 az első olyan kétjegyű szám, melynek számjegyösszege (1+2=3) osztható 3-mal.',
        breakdown: [
          { label: '10, 11', value: 'Összegük: 1 és 2 (nem osztható 3-mal)' },
          { label: '12', value: '1 + 2 = 3 (osztható 3-mal)' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik a legkisebb kétjegyű pozitív szám, amely osztható 9-cel?',
        highlightValue: 'Legkisebb 2-jegyű 9-cel osztható',
        questionTypeBadge: 'Számkeresés',
        options: ['9', '18', '27', '99'],
        correctAnswer: '18',
        explanation: 'A 9 egyjegyű, így a legkisebb KÉTJEGYŰ 9-cel osztható szám a 18 (1 + 8 = 9).',
        breakdown: [
          { label: 'Feltétel', value: 'Kétjegyű (≥ 10)' },
          { label: 'Eredmény', value: '18 (18 : 9 = 2)' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 603 szám számjegyösszege, és osztható-e 9-cel?',
        highlightValue: '603 vizsgálata',
        questionTypeBadge: 'Összeg + Oszthatóság',
        options: [
          'Összeg: 9, osztható 9-cel',
          'Összeg: 9, csak 3-mal osztható',
          'Összeg: 6, nem osztható 9-cel',
          'Összeg: 3, osztható 9-cel'
        ],
        correctAnswer: 'Összeg: 9, osztható 9-cel',
        explanation: '6 + 0 + 3 = 9. Mivel 9 osztható 9-cel, a 603 osztható 9-cel (és 3-mal is).',
        breakdown: [
          { label: 'Számjegyösszeg', value: '6 + 0 + 3 = 9' },
          { label: 'Oszthatóság', value: '9 : 9 = 1 ⟹ osztható 9-cel' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám NEM osztható sem 3-mal, sem 9-cel az alábbiak közül?',
        highlightValue: 'Egyikkel sem osztható',
        questionTypeBadge: 'Kizárás',
        options: ['123', '234', '345', '457'],
        correctAnswer: '457',
        explanation: 'A 457 számjegyeinek összege: 4 + 5 + 7 = 16. A 16 sem 3-mal, sem 9-cel nem osztható.',
        breakdown: [
          { label: '123 összeg', value: '1+2+3 = 6 (3-mal osztható)' },
          { label: '234 összeg', value: '2+3+4 = 9 (9-cel osztható)' },
          { label: '345 összeg', value: '3+4+5 = 12 (3-mal osztható)' },
          { label: '457 összeg', value: '4+5+7 = 16 (egyikkel sem osztható)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Maradékok közvetlen leolvasása, hiányzó jegyek és többjegyű számok',
    range: 'Nagyobb számok, nyitott mondatok, összetett oszthatóság (pl. 6-tal)',
    focus: 'Fejben végzett számjegyösszeg-számítás, hiányzó jegyek pótlása',
    color: 'orange',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-700 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    iconBg: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 7458 szám 9-es osztási maradéka?',
        highlightValue: '7458 : 9 maradéka',
        questionTypeBadge: '9-es maradék',
        options: ['3', '5', '6', '8'],
        correctAnswer: '6',
        explanation: '7 + 4 + 5 + 8 = 24. A 24-et 9-cel osztva: 24 : 9 = 2, maradék 6. Tehát 7458 : 9 maradéka is 6.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '7 + 4 + 5 + 8 = 24' },
          { label: '24 : 9', value: '2, maradék: 6' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Milyen számjegyek állhatnak a □ helyén a 35□ számban, hogy a szám osztható legyen 3-mal?',
        highlightValue: '35□ osztható 3-mal',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['1, 4 vagy 7', '0, 3 vagy 6', '2, 5 vagy 8', 'Kizárólag a 3'],
        correctAnswer: '1, 4 vagy 7',
        explanation: 'A meglévő számjegyek összege: 3 + 5 = 8. A 8-hoz adva: 8+1=9, 8+4=12, 8+7=15. Mindhárom 3 többszöröse.',
        breakdown: [
          { label: 'Eddigi összeg', value: '3 + 5 = 8' },
          { label: 'Megfelelő jegyek', value: '8+1=9, 8+4=12, 8+7=15 ⟹ {1, 4, 7}' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Milyen számjegy állhat a □ helyén a 47□1 számban, hogy a szám osztható legyen 9-cel?',
        highlightValue: '47□1 osztható 9-cel',
        questionTypeBadge: 'Pontos hiányzó jegy',
        options: ['2', '4', '6', '8'],
        correctAnswer: '6',
        explanation: 'A meglévő jegyek összege: 4 + 7 + 1 = 12. A legközelebbi 9-cel osztható szám a 18: 18 - 12 = 6.',
        breakdown: [
          { label: 'Meglévő összeg', value: '4 + 7 + 1 = 12' },
          { label: 'Keresett összeg', value: '18 ⟹ □ = 18 - 12 = 6' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Melyik szám osztható 2-vel ÉS 3-mal is (azaz 6-tal)?',
        highlightValue: 'Páros ÉS 3-mal osztható',
        questionTypeBadge: 'Kettős oszthatóság',
        options: ['315', '428', '516', '711'],
        correctAnswer: '516',
        explanation: 'Az 516 páros (6-ra végződik), és számjegyeinek összege 5 + 1 + 6 = 12 (osztható 3-mal).',
        breakdown: [
          { label: 'Párosság', value: '516 utolsó jegye 6 ⟹ páros' },
          { label: '3-mal oszthatóság', value: '5 + 1 + 6 = 12 ⟹ osztható 3-mal' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 8 000 000 003 szám 3-as osztási maradéka?',
        highlightValue: '8 000 000 003 : 3 maradéka',
        questionTypeBadge: 'Nagy szám maradéka',
        options: ['0', '1', '2', '3'],
        correctAnswer: '2',
        explanation: 'A számjegyek összege: 8 + 3 = 11. 11 : 3 = 3, maradék 2.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '8 + 0 + ... + 3 = 11' },
          { label: '11 : 3', value: '3, maradék: 2' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hány olyan kétjegyű pozitív egész szám van, amely osztható 9-cel?',
        highlightValue: 'Kétjegyű 9-cel osztható számok',
        questionTypeBadge: 'Megszámlálás',
        options: ['9 darab', '10 darab', '11 darab', '12 darab'],
        correctAnswer: '10 darab',
        explanation: 'A kétjegyű 9-cel osztható számok: 18, 27, 36, 45, 54, 63, 72, 81, 90, 99 (összesen 10 darab).',
        breakdown: [
          { label: 'Lista', value: '18, 27, 36, 45, 54, 63, 72, 81, 90, 99' },
          { label: 'Darabszám', value: '10 db' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Milyen számjegyek állhatnak a □ helyén a 2□5 számban, ha a számot 3-mal osztva 1 a maradék?',
        highlightValue: '2□5 : 3 mar. = 1',
        questionTypeBadge: 'Maradékos hiányzó jegy',
        options: ['0, 3, 6 vagy 9', '1, 4 vagy 7', '2, 5 vagy 8', 'Kizárólag 1'],
        correctAnswer: '0, 3, 6 vagy 9',
        explanation: '2 + 5 = 7. Ha □ = 0 ⟹ 7 : 3 mar. 1; ha □ = 3 ⟹ 10 : 3 mar. 1; ha □ = 6 ⟹ 13 : 3 mar. 1; ha □ = 9 ⟹ 16 : 3 mar. 1.',
        breakdown: [
          { label: 'Kezdő összeg', value: '2 + 5 = 7' },
          { label: 'Jegyek', value: '0 (7), 3 (10), 6 (13), 9 (16) mind 1-et ad maradékul' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a 999 999 999 szám 9-es osztási maradéka?',
        highlightValue: 'Kilenc darab 9-es',
        questionTypeBadge: 'Gyors maradék',
        options: ['0', '1', '8', '9'],
        correctAnswer: '0',
        explanation: 'A számjegyek összege 9 · 9 = 81. Mivel 81 osztható 9-cel, a maradék 0.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '9 · 9 = 81' },
          { label: '81 : 9', value: '9, maradék: 0' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mi a 128 + 355 összeg 3-as osztási maradéka?',
        highlightValue: '128 + 355 mod 3',
        questionTypeBadge: 'Összeg maradéka',
        options: ['0', '1', '2', '3'],
        correctAnswer: '0',
        explanation: '128 számjegyösszege 11 (mod 3 = 2), 355 számjegyösszege 13 (mod 3 = 1). A maradékok összege: 2 + 1 = 3 (mod 3 = 0).',
        breakdown: [
          { label: '128 mod 3', value: '2 (11 : 3 mar. 2)' },
          { label: '355 mod 3', value: '1 (13 : 3 mar. 1)' },
          { label: 'Összeg mod 3', value: '(2 + 1) mod 3 = 0 (pontosan osztható)' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Melyik számjegyet kell a 7□□3 szám mindkét üres helyére beírni, hogy a szám osztható legyen 9-cel?',
        highlightValue: '7□□3 osztható 9-cel (azonos jegyek)',
        questionTypeBadge: 'Egyenlet számjegyekkel',
        options: ['1 darab (a 4-es)', '2 darab', 'Nincs ilyen számjegy', '4 darab'],
        correctAnswer: '1 darab (a 4-es)',
        explanation: '7 + 3 + 2 · □ = 10 + 2 · □. A legközelebbi 9 többszörös a 18: 10 + 2 · □ = 18 ⟹ 2 · □ = 8 ⟹ □ = 4 (a szám a 7443).',
        breakdown: [
          { label: 'Összeg', value: '10 + 2□ = 18' },
          { label: 'Eredmény', value: '□ = 4 (7443 ⟹ 7+4+4+3 = 18)' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Gondolkodtató szint',
    subtitle: 'Összetett számelméleti feladatok, műveletek és kombinatorika',
    range: 'Algebrai levezetések, szorzatok maradékai, versenyfeladatok',
    focus: 'Maradékos algebra, oszthatósági bizonyítások',
    color: 'rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Két tetszőleges 3-mal osztható szám összege mindig milyen tulajdonságú?',
        highlightValue: '3k + 3m összege',
        questionTypeBadge: 'Bizonyítás',
        options: ['Mindig osztható 3-mal', 'Mindig osztható 9-cel', 'Lehet nem osztható 3-mal is', 'Mindig páros'],
        correctAnswer: 'Mindig osztható 3-mal',
        explanation: '3k + 3m = 3(k + m), ami a disztributivitás miatt mindig 3 többszöröse.',
        breakdown: [
          { label: 'Algebrai alak', value: '3k + 3m = 3(k + m)' },
          { label: 'Következtetés', value: 'Mindig osztható 3-mal' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Melyik a legnagyobb háromjegyű, 9-cel osztható PÁROS szám?',
        highlightValue: 'Legnagyobb 3-jegyű 9-cel osztható páros',
        questionTypeBadge: 'Extrémum keresés',
        options: ['990', '998', '996', '984'],
        correctAnswer: '990',
        explanation: 'A 999 a legnagyobb 3-jegyű 9-cel osztható szám, de az páratlan. Az előző 9-cel osztható szám a 990 (999 - 9 = 990), ami páros!',
        breakdown: [
          { label: '999', value: '9-cel osztható, de PÁRATLAN' },
          { label: '990', value: '9-cel osztható ÉS PÁROS (0 végű)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy számot 9-cel osztva 5 a maradék. Mennyi maradékot ad ez a szám, ha 3-mal osztjuk?',
        highlightValue: 'N mod 9 = 5 ⟹ N mod 3 = ?',
        questionTypeBadge: 'Maradék átszámítás',
        options: ['1', '2', '3', '5'],
        correctAnswer: '2',
        explanation: 'N = 9k + 5 = 3 · (3k + 1) + 2. Mivel 5 : 3 = 1, maradék 2, ezért a szám 3-as maradéka 2.',
        breakdown: [
          { label: 'Felbontás', value: '9k osztható 3-mal' },
          { label: '5 : 3', value: '1, maradék: 2' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Melyik a legkisebb háromjegyű szám, amely 3-mal és 5-tel is osztható (azaz 15-tel)?',
        highlightValue: 'Legkisebb 3-jegyű (3 és 5 többszöröse)',
        questionTypeBadge: 'Közös többszörös',
        options: ['105', '110', '115', '120'],
        correctAnswer: '105',
        explanation: 'A háromjegyű számok 100-tól kezdődnek. 5-tel oszthatóak: 100, 105... A 105 számjegyösszege 1 + 0 + 5 = 6 (osztható 3-mal).',
        breakdown: [
          { label: '100', value: '1+0+0 = 1 (nem osztható 3-mal)' },
          { label: '105', value: '1+0+5 = 6 (osztható 3-mal és 5-tel is)' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Ha egy szám számjegyeinek összege 2025, osztható-e a szám 9-cel?',
        highlightValue: 'Számjegyösszeg = 2025',
        questionTypeBadge: 'Összetett számjegyösszeg',
        options: [
          'Igen, mert 2+0+2+5 = 9, ami osztható 9-cel',
          'Nem, mert a 2025 páratlan',
          'Csak akkor, ha 9-re végződik',
          'Nem dönthető el'
        ],
        correctAnswer: 'Igen, mert 2+0+2+5 = 9, ami osztható 9-cel',
        explanation: 'A számjegyek összege 2025. A 2025 számjegyeinek összege 2 + 0 + 2 + 5 = 9, ami osztható 9-cel, így az eredeti szám is osztható 9-cel.',
        breakdown: [
          { label: '2025 számjegyösszege', value: '2 + 0 + 2 + 5 = 9' },
          { label: 'Következtetés', value: '2025 osztható 9-cel ⟹ az eredeti szám is osztható 9-cel' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Létezik-e olyan természetes szám, melynek számjegyösszege 15, és osztható 9-cel?',
        highlightValue: 'Összeg = 15, de 9-cel osztható?',
        questionTypeBadge: 'Elméleti lehetetlenség',
        options: [
          'Nem létezik ilyen szám, mert ha az összeg 15, nem osztható 9-cel',
          '69',
          '78',
          '96'
        ],
        correctAnswer: 'Nem létezik ilyen szám, mert ha az összeg 15, nem osztható 9-cel',
        explanation: 'A 9-cel való oszthatóság feltétele, hogy a számjegyösszeg 9 többszöröse legyen. A 15 nem többszöröse a 9-nek, így ilyen szám nem létezhet.',
        breakdown: [
          { label: 'Feltétel 9-re', value: 'Számjegyösszeg ∈ {9, 18, 27...}' },
          { label: '15 esete', value: '15 nem osztható 9-cel ⟹ a szám sem lehet az' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Milyen számjegy írható az 1□2□3□ szám mindhárom □ helyére (azonos számjegy!), hogy a szám osztható legyen 9-cel?',
        highlightValue: '1□2□3□ osztható 9-cel',
        questionTypeBadge: 'Több hiányzó jegy',
        options: ['1, 4 vagy 7', '4', '1', 'Nincs ilyen'],
        correctAnswer: '1, 4 vagy 7',
        explanation: 'A meglévő jegyek: 1 + 2 + 3 = 6. A teljes összeg: 6 + 3 · □. Ha □=1 ⟹ 9; ha □=4 ⟹ 18; ha □=7 ⟹ 27. Mindhárom 9 többszöröse!',
        breakdown: [
          { label: 'Kifejezés', value: '6 + 3□' },
          { label: 'Megoldások', value: '□ = 1 (összeg 9), □ = 4 (összeg 18), □ = 7 (összeg 27)' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Ha \'a\' szám 9-es maradéka 4, és \'b\' szám 9-es maradéka 7, mennyi a szorzatuk (a · b) 9-es maradéka?',
        highlightValue: '(4 · 7) mod 9',
        questionTypeBadge: 'Szorzat maradéka',
        options: ['1', '2', '5', '7'],
        correctAnswer: '1',
        explanation: 'A szorzat maradéka a maradékok szorzatának maradéka: 4 · 7 = 28. 28 : 9 = 3, a maradék 1.',
        breakdown: [
          { label: 'Maradékok szorzata', value: '4 · 7 = 28' },
          { label: '28 : 9', value: '3, maradék: 1' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Három egymást követő természetes szám összege [n + (n+1) + (n+2)] mindig...',
        highlightValue: 'n + (n+1) + (n+2)',
        questionTypeBadge: 'Összefüggés bizonyítása',
        options: [
          'Mindig osztható 3-mal',
          'Mindig osztható 9-cel',
          'Mindig páratlan',
          'Csak akkor osztható 3-mal, ha n páros'
        ],
        correctAnswer: 'Mindig osztható 3-mal',
        explanation: 'n + (n+1) + (n+2) = 3n + 3 = 3(n+1), ami mindig 3 többszöröse, bármilyen egész szám is az n.',
        breakdown: [
          { label: 'Összevonás', value: '3n + 3 = 3(n + 1)' },
          { label: 'Következtetés', value: 'Mindig osztható 3-mal' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Hány olyan háromjegyű szám készíthető az 1, 2, 3 számjegyekből (minden jegyet pontosan egyszer használva), amely osztható 3-mal?',
        highlightValue: '{1, 2, 3} permutációi',
        questionTypeBadge: 'Kombinatorikai feladat',
        options: [
          'Mind a 6 darab szám osztható 3-mal',
          'Csak 2 darab',
          'Csak 3 darab',
          'Egyik sem'
        ],
        correctAnswer: 'Mind a 6 darab szám osztható 3-mal',
        explanation: 'Bármilyen sorrendben rakjuk ki a számjegyeket, a számjegyek összege mindig 1 + 2 + 3 = 6 marad, ami osztható 3-mal. Így mind a 6 szám (123, 132, 213, 231, 312, 321) osztható 3-mal!',
        breakdown: [
          { label: 'Számjegyösszeg', value: '1 + 2 + 3 = 6 (mindig 6)' },
          { label: 'Összes szám (6 db)', value: '123, 132, 213, 231, 312, 321 mind osztható 3-mal' }
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
    icon: <LayoutGrid className="w-3.5 h-3.5 text-amber-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisibilityBy39Matcher
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
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-orange-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisibilityBy39Sorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function DivisibilityBy39Quiz({ onBack }: DivisibilityBy39QuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🧮"
      topicBadge="🧮 6. Osztály • I. Egész számok, oszthatóság"
      title="Oszthatóság 3-mal és 9-cel kvíz"
      subtitle="Teszteld a tudásod a számjegyösszeg alapú oszthatósági szabályokról, a maradékokról és a logikai összefüggésekről 3 szinten!"
      cheatSheetTitle="Oszthatóság 3-mal és 9-cel Segédlet"
      hintText="💡 Számold ki a számjegyek összegét! Ha az összeg 3-mal osztható, a szám is osztható 3-mal; ha 9-cel, akkor 9-cel is!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="amber"
    />
  );
}
