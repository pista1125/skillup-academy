import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { OrderingMatcher } from './OrderingMatcher';
import { OrderingSorter } from './OrderingSorter';
import { OrderingSolverFigure } from './OrderingDiagrams';
import {
  ListOrdered,
  Layers,
  RotateCcw,
  Sparkles,
  Zap,
  Calculator,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

interface OrderingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Faktoriális Képlete',
    icon: <ListOrdered className="w-4 h-4 text-violet-600" />,
    formula: 'n! = n · (n - 1) ··· 1',
    note: 'n különböző elem lehetséges sorrendjeinek száma n faktoriális (pl. 4! = 4 · 3 · 2 · 1 = 24).'
  },
  {
    id: 'c2',
    title: '0 Számjegy a Szám Elején',
    icon: <Calculator className="w-4 h-4 text-rose-600" />,
    formula: '(n - 1) · (n - 1) · (n - 2) ···',
    note: 'Többjegyű számoknál a legelső helyre nem kerülhet 0, így az első pozícióra 1-gyel kevesebb lehetőség van.'
  },
  {
    id: 'c3',
    title: 'Szomszédos Elemek («Blokk-módszer»)',
    icon: <Layers className="w-4 h-4 text-purple-600" />,
    formula: 'k! · (blokkok száma)!',
    note: 'Az egymás mellett álló elemeket 1 blokknak tekintjük, majd megszorozzuk a blokkon belüli belső sorrendek számával.'
  },
  {
    id: 'c4',
    title: 'Nem Szomszédos Elemek (Komplementer)',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: 'Összes - Egymás mellettiek',
    note: 'Ha két elem nem állhat egymás mellett, az összes lehetséges esetből kivonjuk a szomszédos esetek számát.'
  },
  {
    id: 'c5',
    title: 'Körasztal Köré Ültetés',
    icon: <RotateCcw className="w-4 h-4 text-teal-600" />,
    formula: '(n - 1)!',
    note: 'Körasztal esetén a forgatások nem adnak új szomszédságot: az 1. embert rögzítjük, a maradék n - 1 embert rendezzük sorba.'
  },
  {
    id: 'c6',
    title: 'Anagrammák és Betűkeverés',
    icon: <Sparkles className="w-4 h-4 text-pink-600" />,
    formula: 'k! (különböző betűk)',
    note: 'Egy k betűs szó összes átrendezéseinek száma k!, amennyiben minden betű különböző.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Sorrendek és Faktoriális',
    subtitle: 'Különböző elemek sorba állítása, 3 és 4 elem permutációja, alap faktoriális számolások',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Faktoriális',
    badgeBg: 'bg-violet-50 dark:bg-violet-950/40',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-700 dark:text-violet-300',
    iconBg: 'bg-violet-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Négy jóbarát (Anna, Béla, Cili és Dénes) egy 4 személyes padra szeretne leülni. Hányféle különböző ülésrendben foglalhatnak helyet?',
        questionTypeBadge: 'Permutáció',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['24', '12', '16', '6'],
        correctAnswer: '24',
        explanation: '4 különböző személy sorbarendezése: az 1. helyre 4, a 2. helyre 3, a 3. helyre 2, a 4. helyre 1 ember ülhet. Összesen: 4! = 4 · 3 · 2 · 1 = 24 ülésrend.',
        breakdown: [
          { label: '1. hely', value: '4 lehetőség' },
          { label: '2. hely', value: '3 lehetőség' },
          { label: '3. hely', value: '2 lehetőség' },
          { label: '4. hely', value: '1 lehetőség' },
          { label: 'Kiszámítás', value: '4! = 24' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Hány darab 3-jegyű szám képezhető az 1, 2, 3 számjegyekből, ha minden számjegyet pontosan egyszer használunk fel?',
        questionTypeBadge: 'Számképzés',
        figure: <OrderingSolverFigure type="slots_3" />,
        options: ['6', '9', '27', '3'],
        correctAnswer: '6',
        explanation: 'Három különböző számjegy sorrendje: 3! = 3 · 2 · 1 = 6 különböző szám (123, 132, 213, 231, 312, 321).',
        breakdown: [
          { label: 'Százasok', value: '3 lehetőség' },
          { label: 'Tízesek', value: '2 lehetőség' },
          { label: 'Egyesek', value: '1 lehetőség' },
          { label: 'Összesen', value: '3! = 6 szám' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Egy dobozban egy piros, egy kék és egy zöld golyó van. Egymás után kihúzzuk mindhármat. Hányféle kihúzási sorrend lehetséges?',
        questionTypeBadge: 'Sorrend',
        figure: <OrderingSolverFigure type="slots_3" />,
        options: ['6', '3', '9', '12'],
        correctAnswer: '6',
        explanation: '3 különböző elem sorrendjeinek száma: 3! = 3 · 2 · 1 = 6.',
        breakdown: [
          { label: 'Képlet', value: 'n! ahol n = 3' },
          { label: 'Eredmény', value: '3 · 2 · 1 = 6 sorrend' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Mennyi az 5! (5 faktoriális) pontos értéke?',
        questionTypeBadge: 'Faktoriális',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['120', '24', '720', '60'],
        correctAnswer: '120',
        explanation: '5! = 5 · 4 · 3 · 2 · 1 = 20 · 6 = 120.',
        breakdown: [
          { label: 'Kiszámítás', value: '5 · 4 · 3 · 2 · 1' },
          { label: 'Eredmény', value: '120' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Egy könyvespolcon 5 különböző tantárgyú tankönyvet (matek, fizika, kémia, töri, angol) szeretnénk egymás mellé elhelyezni. Hányféle elrendezés lehetséges?',
        questionTypeBadge: 'Könyvespolc',
        figure: <OrderingSolverFigure type="books" />,
        options: ['120', '24', '25', '60'],
        correctAnswer: '120',
        explanation: '5 különböző könyv sorbarendezése: 5! = 5 · 4 · 3 · 2 · 1 = 120 sorrend.',
        breakdown: [
          { label: 'Elemek száma', value: 'n = 5 könyv' },
          { label: 'Sorrendek', value: '5! = 120 eset' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Egy futóverseny döntőjében 3 versenyző érkezik a célba (nem lehet holtverseny). Hányféle sorrendben állhatnak fel a dobogóra (arany, ezüst, bronz)?',
        questionTypeBadge: 'Dobogó',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['6', '3', '8', '9'],
        correctAnswer: '6',
        explanation: 'Az 1. helyre 3, a 2. helyre 2, a 3. helyre 1 futó kerülhet: 3 · 2 · 1 = 6 féle dobogós sorrend.',
        breakdown: [
          { label: 'Aranyérmes', value: '3 lehetőség' },
          { label: 'Ezüstérmes', value: '2 lehetőség' },
          { label: 'Bronzérmes', value: '1 lehetőség' },
          { label: 'Összesen', value: '3! = 6 eset' }
        ]
      },
      {
        id: 'q7',
        prompt: 'A "FA" szó két betűjének (F és A) hányféle sorrendje létezik?',
        questionTypeBadge: 'Anagramma',
        figure: <OrderingSolverFigure type="anagram" />,
        options: ['2', '1', '4', '3'],
        correctAnswer: '2',
        explanation: '2 különböző betű sorrendje: 2! = 2 · 1 = 2 (FA és AF).',
        breakdown: [
          { label: 'Permutáció', value: '2! = 2' },
          { label: 'Szavak', value: 'FA, AF' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Két diák (Eszter és Gergő) leül egy kétszemélyes iskolapadba. Hányféle ülésrendben ülhetnek?',
        questionTypeBadge: 'Ülésrend',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['2', '1', '4', '3'],
        correctAnswer: '2',
        explanation: 'Bal oldalon ülhet Eszter vagy Gergő (2 lehetőség), a jobb oldalon a másik: 2! = 2 ülésrend.',
        breakdown: [
          { label: 'Esetek', value: '(Eszter, Gergő) vagy (Gergő, Eszter)' },
          { label: 'Összesen', value: '2! = 2' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Egy tolltartóban 4 különböző színű ceruzát helyezünk el egymás mellé a tartókba. Hányféle sorrend lehetséges?',
        questionTypeBadge: 'Sorrend',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['24', '16', '12', '8'],
        correctAnswer: '24',
        explanation: '4 különböző tárgy sorrendje: 4! = 4 · 3 · 2 · 1 = 24 sorrend.',
        breakdown: [
          { label: 'Kiszámítás', value: '4! = 24' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Mennyi a 3! + 4! művelet pontos eredménye?',
        questionTypeBadge: 'Faktoriális összeg',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['30', '5040', '24', '36'],
        correctAnswer: '30',
        explanation: '3! = 3 · 2 · 1 = 6 és 4! = 4 · 3 · 2 · 1 = 24. Összegük: 6 + 24 = 30.',
        breakdown: [
          { label: '3!', value: '6' },
          { label: '4!', value: '24' },
          { label: 'Összeg', value: '6 + 24 = 30' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Megkötések, Rögzített Helyek és 0 Számjegy',
    subtitle: '0 a számjegyek között, anagrammák, könyvek csoportosítása és rögzített pozíciók',
    range: '11 - 20. feladat',
    focus: 'Megkötések & Speciális Esetek',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Hány darab 4-jegyű szám képezhető a 0, 3, 5, 8 számjegyekből, ha minden jegyet pontosan egyszer használhatunk fel?',
        questionTypeBadge: '0 megkötés',
        figure: <OrderingSolverFigure type="digits" />,
        options: ['18', '24', '12', '16'],
        correctAnswer: '18',
        explanation: 'Az 1. helyre (ezresek) nem kerülhet 0, így csak 3 lehetőség van (3, 5, 8). A 2. helyre a maradék 3 jegy, a 3. helyre 2, az utolsóra 1: 3 · 3 · 2 · 1 = 18 szám.',
        breakdown: [
          { label: '1. jegy (nem 0)', value: '3 lehetőség (3, 5, 8)' },
          { label: '2. jegy', value: '3 lehetőség' },
          { label: '3. jegy', value: '2 lehetőség' },
          { label: '4. jegy', value: '1 lehetőség' },
          { label: 'Összesen', value: '3 · 3 · 2 · 1 = 18' }
        ]
      },
      {
        id: 'q12',
        prompt: 'A "MATEK" szó 5 különböző betűjéből hányféle 5-betűs (értelmes vagy értelmetlen) szó készíthető?',
        questionTypeBadge: 'Anagramma',
        figure: <OrderingSolverFigure type="anagram" />,
        options: ['120', '24', '60', '720'],
        correctAnswer: '120',
        explanation: 'Az 5 különböző betű (M, A, T, E, K) összes sorrendje: 5! = 5 · 4 · 3 · 2 · 1 = 120 szó.',
        breakdown: [
          { label: 'Betűk száma', value: '5 db különböző' },
          { label: 'Összes anagramma', value: '5! = 120' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Hány olyan 5-betűs szó képezhető a "MATEK" szó betűiből, amely "M" betűvel kezdődik?',
        questionTypeBadge: 'Rögzített kezdőbetű',
        figure: <OrderingSolverFigure type="anagram" />,
        options: ['24', '120', '48', '12'],
        correctAnswer: '24',
        explanation: 'Az 1. betű rögzített (csak az M lehet, 1 lehetőség). A megmaradt 4 betűt (A, T, E, K) tetszőleges sorrendben rendezzük el: 1 · 4! = 1 · 24 = 24 szó.',
        breakdown: [
          { label: '1. betű (M)', value: '1 lehetőség' },
          { label: 'Maradék 4 betű', value: '4! = 24 lehetőség' },
          { label: 'Összesen', value: '1 · 24 = 24' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Egy polcra 3 matekkönyvet és 2 fizikakönyvet teszünk. Hányféleképpen rendezhetők el, ha a matekkönyvek egymás mellett, és a fizikakönyvek is egymás mellett vannak?',
        questionTypeBadge: 'Csoportosítás',
        figure: <OrderingSolverFigure type="books" />,
        options: ['24', '12', '120', '48'],
        correctAnswer: '24',
        explanation: '1. A két tantárgycsoport sorrendje: 2! = 2 (Matek-Fizika vagy Fizika-Matek).\n2. A matekkönyvek belső sorrendje: 3! = 6.\n3. A fizikakönyvek belső sorrendje: 2! = 2.\nÖsszesen: 2 · 6 · 2 = 24 sorrend.',
        breakdown: [
          { label: 'Csoportok sorrendje', value: '2! = 2' },
          { label: 'Matekkönyvek', value: '3! = 6' },
          { label: 'Fizikakönyvek', value: '2! = 2' },
          { label: 'Összesen', value: '2 · 6 · 2 = 24' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Négy ember (A, B, C, D) áll sorba a büfénél. Hány olyan sorrend lehetséges, amelyben az "A" személy áll a legelső helyen?',
        questionTypeBadge: 'Rögzített pozíció',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['6', '24', '12', '4'],
        correctAnswer: '6',
        explanation: 'Az 1. hely rögzített (A), a maradék 3 személyt (B, C, D) rendezzük sorba: 1 · 3! = 1 · 6 = 6 sorrend.',
        breakdown: [
          { label: '1. hely (A)', value: '1 lehetőség' },
          { label: '2-4. helyek', value: '3! = 6 lehetőség' },
          { label: 'Összesen', value: '6 sorrend' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Hány darab 3-jegyű PÁROS szám képezhető az 1, 2, 3, 4, 5 számjegyekből (ismétlés nélkül)?',
        questionTypeBadge: 'Páros számképzés',
        figure: <OrderingSolverFigure type="digits" />,
        options: ['24', '12', '60', '18'],
        correctAnswer: '24',
        explanation: 'Egy szám akkor páros, ha az utolsó jegye páros (itt 2 vagy 4 → 2 lehetőség). Az 1. jegyre a maradék 4-ből, a 2. jegyre a maradék 3-ból választhatunk: 4 · 3 · 2 = 24 szám.',
        breakdown: [
          { label: 'Utolsó jegy (2 vagy 4)', value: '2 lehetőség' },
          { label: 'Első jegy', value: '4 lehetőség' },
          { label: 'Második jegy', value: '3 lehetőség' },
          { label: 'Összesen', value: '4 · 3 · 2 = 24' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Négy barát egy KÖRASZTAL köré ül le. Hányféle lényegesen különböző ülésrend létezik (az elforgatott ülésrendek nem számítanak újnak)?',
        questionTypeBadge: 'Körasztal',
        figure: <OrderingSolverFigure type="circle" />,
        options: ['6', '24', '12', '4'],
        correctAnswer: '6',
        explanation: 'n ember körasztal körüli elrendezése: (n - 1)!. Itt n = 4, tehát (4 - 1)! = 3! = 3 · 2 · 1 = 6 ülésrend.',
        breakdown: [
          { label: 'Képlet', value: '(n - 1)!' },
          { label: 'Kiszámítás', value: '(4 - 1)! = 3! = 6' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Négy különböző feladatot kell kiosztani 4 diák között úgy, hogy minden diák pontosan egy feladatot kap. Hányféle kiosztás lehetséges?',
        questionTypeBadge: 'Hozzárendelés',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['24', '16', '12', '256'],
        correctAnswer: '24',
        explanation: 'Az 1. diáknak 4, a 2.-nak 3, a 3.-nak 2, a 4.-nek 1 feladat jut: 4! = 24 kiosztási lehetőség.',
        breakdown: [
          { label: 'Kiszámítás', value: '4! = 24' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Hány darab 4-jegyű szám készíthető az 1, 2, 3, 4 számjegyekből, ha a jegyek ISMÉTLŐDHETNEK?',
        questionTypeBadge: 'Ismétléses számképzés',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['256', '24', '64', '16'],
        correctAnswer: '256',
        explanation: 'Minden egyes pozícióra mind a 4 számjegy választható: 4 · 4 · 4 · 4 = 4⁴ = 256 szám.',
        breakdown: [
          { label: '1. jegy', value: '4 lehetőség' },
          { label: '2. jegy', value: '4 lehetőség' },
          { label: '3. jegy', value: '4 lehetőség' },
          { label: '4. jegy', value: '4 lehetőség' },
          { label: 'Összesen', value: '4⁴ = 256' }
        ]
      },
      {
        id: 'q20',
        prompt: 'A "KÉP" szó 3 betűjéből készített 3-betűs szavak közül hány végződik "P" betűre?',
        questionTypeBadge: 'Rögzített utolsó betű',
        figure: <OrderingSolverFigure type="anagram" />,
        options: ['2', '6', '4', '1'],
        correctAnswer: '2',
        explanation: 'Az utolsó betű rögzített (P: 1 lehetőség). Az első két helyre a K és É betűket 2! = 2 féleképpen rendezhetjük: 2! · 1 = 2 szó (KÉP és ÉKP).',
        breakdown: [
          { label: 'Első két betű (K, É)', value: '2! = 2 lehetőség' },
          { label: 'Utolsó betű (P)', value: '1 lehetőség' },
          { label: 'Összesen', value: '2 szó' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesteri Sorbarendezés, Blokkok és Komplementer',
    subtitle: 'Blokk-módszer, egymás mellett/nem mellett ülők, körasztal feltételekkel és többcsoportos permutáció',
    range: '21 - 30. feladat',
    focus: 'Összetett Megkötések & Mesterfogások',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Négy barát (Anna, Béla, Cili, Dénes) padra ül. Hány olyan ülésrend van, amelyben Anna és Béla MINDIG egymás mellett ülnek?',
        questionTypeBadge: 'Blokk-módszer',
        figure: <OrderingSolverFigure type="blocks" />,
        options: ['12', '24', '6', '18'],
        correctAnswer: '12',
        explanation: 'Tekintsük Annát és Bélát 1etlen blokknak: (AB vagy BA → 2 lehetőség). Ekkor 3 blokkot (AB, C, D) rendezünk sorba: 3! = 6. Összesen: 2 · 3! = 2 · 6 = 12 ülésrend.',
        breakdown: [
          { label: 'Blokkon belüli sorrend', value: '2! = 2 (AB vagy BA)' },
          { label: 'Blokkok sorrendje', value: '3! = 6' },
          { label: 'Összesen', value: '2 · 6 = 12' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Négy barát (Anna, Béla, Cili, Dénes) padra ül. Hány olyan ülésrend van, amelyben Anna és Béla NEM ülhetnek egymás mellett?',
        questionTypeBadge: 'Komplementer ülésrend',
        figure: <OrderingSolverFigure type="blocks" />,
        options: ['12', '24', '18', '6'],
        correctAnswer: '12',
        explanation: 'Komplementer módszer:\n1. Összes ülésrend megkötés nélkül: 4! = 24.\n2. Tiltott esetek (egymás mellett ülnek): 12.\n3. Nem ülnek egymás mellett: 24 - 12 = 12 ülésrend.',
        breakdown: [
          { label: 'Összes eset', value: '4! = 24' },
          { label: 'Egymás mellettiek', value: '12' },
          { label: 'Különbség', value: '24 - 12 = 12' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Öt fős baráti társaság ül le egy kerek asztal (körasztal) köré. Hányféle lényegesen különböző ülésrend lehetséges?',
        questionTypeBadge: 'Körasztal',
        figure: <OrderingSolverFigure type="circle" />,
        options: ['24', '120', '60', '12'],
        correctAnswer: '24',
        explanation: 'n = 5 személy körasztal körül: (n - 1)! = (5 - 1)! = 4! = 4 · 3 · 2 · 1 = 24 ülésrend.',
        breakdown: [
          { label: 'Képlet', value: '(5 - 1)! = 4!' },
          { label: 'Eredmény', value: '24 ülésrend' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Hány darab 4-jegyű PÁROS szám készíthető a 0, 1, 2, 3, 4 számjegyekből (ismétlés nélkül)?',
        questionTypeBadge: '0 és párosság',
        figure: <OrderingSolverFigure type="digits" />,
        options: ['60', '48', '72', '36'],
        correctAnswer: '60',
        explanation: 'Két külön esetet vizsgálunk az utolsó jegy szerint:\n1. Eset: 0-ra végződik (utolsó jegy 1 lehetőség):\n   - Első 3 jegy: 4 · 3 · 2 = 24 szám.\n2. Eset: 2-re vagy 4-re végződik (2 lehetőség):\n   - Első jegy nem lehet 0 és nem lehet az utolsó jegy → 3 lehetőség.\n   - Második jegy: 3 lehetőség (a 0 is jöhet).\n   - Harmadik jegy: 2 lehetőség.\n   → 2 · (3 · 3 · 2) = 36 szám.\nÖsszesen: 24 + 36 = 60 szám.',
        breakdown: [
          { label: '1. eset (0-ra végződik)', value: '4 · 3 · 2 · 1 = 24' },
          { label: '2. eset (2-re vagy 4-re)', value: '2 · (3 · 3 · 2) = 36' },
          { label: 'Összesen', value: '24 + 36 = 60 szám' }
        ]
      },
      {
        id: 'q25',
        prompt: '3 fiú és 3 lány ül le egy 6 személyes padra úgy, hogy a nemek felváltva követik egymást (pl. F L F L F L vagy L F L F L F). Hány ilyen ülésrend van?',
        questionTypeBadge: 'Felváltva ülők',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['72', '36', '144', '18'],
        correctAnswer: '72',
        explanation: '1. A nemek mintázata: 2 lehetőség (F L F L F L vagy L F L F L F).\n2. A 3 fiú elrendezése a saját székein: 3! = 6.\n3. A 3 lány elrendezése a saját székein: 3! = 6.\nÖsszesen: 2 · 3! · 3! = 2 · 6 · 6 = 72 ülésrend.',
        breakdown: [
          { label: 'Mintázat', value: '2 féle (F-L-F-L-F-L vagy L-F-L-F-L-F)' },
          { label: 'Fiúk sorrendje', value: '3! = 6' },
          { label: 'Lányok sorrendje', value: '3! = 6' },
          { label: 'Összesen', value: '2 · 6 · 6 = 72' }
        ]
      },
      {
        id: 'q26',
        prompt: 'A "BALATON" szó 7 betűjéből hány 7-betűs szó készíthető, ha tudjuk, hogy az "A" betű 2-szer szerepel?',
        questionTypeBadge: 'Ismétléses permutáció',
        figure: <OrderingSolverFigure type="anagram" />,
        options: ['2520', '5040', '1260', '720'],
        correctAnswer: '2520',
        explanation: '7 betű összes sorrendje 7! = 5040 lenne, de a két darab "A" betű felcserélése nem hoz létre új szót. Ezért osztunk 2!-sal: 7! / 2! = 5040 / 2 = 2520 szó.',
        breakdown: [
          { label: '7 betű permutációja', value: '7! = 5040' },
          { label: 'A betűk száma', value: '2 db (osztás 2!-sal)' },
          { label: 'Eredmény', value: '5040 / 2 = 2520' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Öt ember (A, B, C, D, E) ül le egy padra. Hányféleképpen ülhetnek le, ha A és B a pad két szélére kerülnek?',
        questionTypeBadge: 'Szélső pozíciók',
        figure: <OrderingSolverFigure type="queue" />,
        options: ['12', '24', '6', '48'],
        correctAnswer: '12',
        explanation: '1. A két szélre A és B kerülhet: 2 lehetőség (A...B vagy B...A).\n2. A középső 3 helyre a maradék 3 embert (C, D, E) 3! = 6 féleképpen ültethetjük le.\nÖsszesen: 2 · 3! = 2 · 6 = 12 ülésrend.',
        breakdown: [
          { label: 'Szélső helyek (A, B)', value: '2 lehetőség' },
          { label: 'Középső 3 hely', value: '3! = 6 lehetőség' },
          { label: 'Összesen', value: '2 · 6 = 12' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Öt különböző méretű könyvet teszünk a polcra. Hány olyan elrendezés van, amelyben a LEGNAGYOBB könyv NEM kerül a polc szélére?',
        questionTypeBadge: 'Komplementer polc',
        figure: <OrderingSolverFigure type="books" />,
        options: ['72', '120', '48', '96'],
        correctAnswer: '72',
        explanation: '1. Összes elrendezés: 5! = 120.\n2. Rossz esetek (a legnagyobb könyv a balszélen VAGY a jobbszélen van): 2 · 4! = 2 · 24 = 48.\n3. Nem a szélen van: 120 - 48 = 72 elrendezés.\n(Alternatív megoldás: a legnagyobb könyv a belső 3 hely bármelyikére kerülhet: 3 · 4! = 3 · 24 = 72).',
        breakdown: [
          { label: 'Összes elrendezés', value: '5! = 120' },
          { label: 'Szélső helyen van', value: '2 · 24 = 48' },
          { label: 'Belső helyen van', value: '120 - 48 = 72' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Öt ember körasztal köré ül úgy, hogy Anna és Béla MINDIG egymás mellett ülnek. Hányféle ilyen ülésrend lehetséges?',
        questionTypeBadge: 'Körasztal blokkal',
        figure: <OrderingSolverFigure type="circle" />,
        options: ['12', '24', '6', '48'],
        correctAnswer: '12',
        explanation: '1. Annát és Bélát 1 blokknak tekintjük: ekkor 4 blokk van a körasztal körül.\n2. 4 blokk körasztalos elrendezése: (4 - 1)! = 3! = 6.\n3. A blokkon belül Anna és Béla 2-féleképpen ülhet (AB vagy BA): 2.\nÖsszesen: 6 · 2 = 12 ülésrend.',
        breakdown: [
          { label: '4 blokk körasztal körül', value: '(4 - 1)! = 3! = 6' },
          { label: 'Belső sorrend (AB / BA)', value: '2' },
          { label: 'Összesen', value: '6 · 2 = 12' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Hat különböző színű selyemből hányféle 4 sávos lobogó állítható össze (fentről lefelé 4 különböző színű sáv)?',
        questionTypeBadge: 'Sávos zászló',
        figure: <OrderingSolverFigure type="slots_4" />,
        options: ['360', '720', '24', '120'],
        correctAnswer: '360',
        explanation: 'Az 1. sávhoz 6, a 2.-hoz 5, a 3.-hoz 4, a 4.-hez 3 színből választhatunk: 6 · 5 · 4 · 3 = 360 különböző lobogó.',
        breakdown: [
          { label: '1. sáv', value: '6 lehetőség' },
          { label: '2. sáv', value: '5 lehetőség' },
          { label: '3. sáv', value: '4 lehetőség' },
          { label: '4. sáv', value: '3 lehetőség' },
          { label: 'Összesen', value: '6 · 5 · 4 · 3 = 360' }
        ]
      }
    ]
  }
};

export const OrderingQuiz: React.FC<OrderingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="rendezd-sorba"
      topicId="g7-logic-order-it"
      topicTitle="2. Rendezd sorba!"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="2. Rendezd sorba! Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: permutációk, faktoriálisok, sorbarendezési megkötések és körasztal-szimmetriák"
      cheatSheetTitle="Sorbarendezési Szabályok és Képletek"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<OrderingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<OrderingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="violet"
    />
  );
};
