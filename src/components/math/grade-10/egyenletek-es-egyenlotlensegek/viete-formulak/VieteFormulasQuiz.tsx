import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { VieteFormulasMatcher } from './VieteFormulasMatcher';
import { VieteFormulasSorter } from './VieteFormulasSorter';
import {
  VieteFormulasDuoSvg,
  SignOfRootsDeductionSvg,
  SymmetricExpressionsSquareSvg,
  SymmetricExpressionsReciprocalSvg,
  MentalRootGuesserSvg
} from './VieteFormulasFigures';

interface VieteFormulasQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Viète-formulák alaptétele',
    description:
      'Ha az ax² + bx + c = 0 (a ≠ 0) másodfokú egyenletnek léteznek valós gyökei (D ≥ 0), akkor a gyökök összege x₁ + x₂ = -b/a, a gyökök szorzata pedig x₁ · x₂ = c/a. Normált egyenletnél (x² + px + q = 0) ez egyszerűen: x₁ + x₂ = -p és x₁ · x₂ = q.',
    note: 'Előjelcsapda: A gyökök összege mindig a középső tag ellentettje (-b/a)!',
    color: 'from-amber-500 to-orange-600',
    figure: <VieteFormulasDuoSvg size={260} />
  },
  {
    title: 'Gyökök fejben történő megsejtése',
    description:
      'Normált egyenletnél (x² - 7x + 10 = 0) először a szorzatot (q = 10) bontjuk fel egész számpárokra: 1·10 vagy 2·5. Ezután megnézzük, melyik pár összege adja a -p értéket (-(-7) = 7). Mivel 2 + 5 = 7, a gyökök azonnal: 2 és 5!',
    note: 'Kiváló módszer az érettségin az ellenőrzésre vagy a gyors szorzattá bontásra!',
    color: 'from-emerald-500 to-teal-600',
    figure: <MentalRootGuesserSvg size={260} />
  },
  {
    title: 'Szimmetrikus kifejezések kiszámítása',
    description:
      'A gyökök konkrét kiszámítása nélkül megadható bármely szimmetrikus kifejezés értéke! Négyzetösszeg: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = b²/a² - 2c/a. Reciprok összeg: 1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂) = -b/c.',
    note: 'Különbség négyzete: (x₁ - x₂)² = (x₁ + x₂)² - 4x₁x₂ = D / a².',
    color: 'from-purple-600 to-indigo-700',
    figure: <SymmetricExpressionsSquareSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Viète-formulák és fejben számolás',
    subtitle: '10 alapozó feladat a gyökök összegéről, szorzatáról és a fejben megsejtésről',
    range: '1–10. kérdés',
    focus: 'x₁ + x₂ = -b/a, x₁x₂ = c/a, előjelváltás felismerése, egész gyökök',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'vfq1-1',
        level: 1,
        question: 'Melyek a helyes Viète-formulák az ax² + bx + c = 0 másodfokú egyenlet valós gyökeire?',
        options: [
          'x₁ + x₂ = -b/a  és  x₁ · x₂ = c/a',
          'x₁ + x₂ = b/a  és  x₁ · x₂ = -c/a',
          'x₁ + x₂ = -b  és  x₁ · x₂ = c',
          'x₁ + x₂ = c/a  és  x₁ · x₂ = -b/a'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az előjelváltásra az összegnél, és a főegyütthatóval való osztásra!',
        explanation: 'A tétel szerint a gyökök összege a lineáris tag együtthatójának ellentettje osztva a főegyütthatóval (-b/a), a gyökök szorzata pedig a konstans tag osztva a főegyütthatóval (c/a).'
      },
      {
        id: 'vfq1-2',
        level: 1,
        question: 'Mennyi az x² - 7x + 10 = 0 egyenlet gyökeinek összege (x₁ + x₂)?',
        options: [
          '+7',
          '-7',
          '+10',
          '-10'
        ],
        correctAnswer: 0,
        hint: 'x₁ + x₂ = -p = -(-7).',
        explanation: 'Az x² - 7x + 10 = 0 egyenletben b = -7 és a = 1. Így x₁ + x₂ = -(-7)/1 = +7. (A gyökök 2 és 5, 2 + 5 = 7).'
      },
      {
        id: 'vfq1-3',
        level: 1,
        question: 'Mennyi az x² + 5x + 6 = 0 egyenlet gyökeinek összege?',
        options: [
          '-5',
          '+5',
          '+6',
          '-6'
        ],
        correctAnswer: 0,
        hint: 'Vigyázat, a középső tag előjele megfordul!',
        explanation: 'x₁ + x₂ = -b/a = -5/1 = -5. (A gyökök -2 és -3, összegük: -2 + (-3) = -5).'
      },
      {
        id: 'vfq1-4',
        level: 1,
        question: 'Mennyi az x² - 8x - 9 = 0 egyenlet gyökeinek szorzata (x₁ · x₂)?',
        options: [
          '-9',
          '+9',
          '+8',
          '-8'
        ],
        correctAnswer: 0,
        hint: 'x₁ · x₂ = c/a. A konstans előjele nem változik!',
        explanation: 'A szorzat c/a = -9/1 = -9. (A gyökök 9 és -1, szorzatuk: 9 · (-1) = -9).'
      },
      {
        id: 'vfq1-5',
        level: 1,
        question: 'Melyek a gyökei fejben számolva az x² - 6x + 8 = 0 egyenletnek?',
        options: [
          '2 és 4',
          '-2 és -4',
          '1 és 8',
          '-1 és -8'
        ],
        correctAnswer: 0,
        hint: 'Szorzatuk 8, összegük +6.',
        explanation: 'Olyan számokat keresünk, amelyek szorzata 8 és összege 6. Ez a 2 és a 4 (2 · 4 = 8, 2 + 4 = 6).'
      },
      {
        id: 'vfq1-6',
        level: 1,
        question: 'Melyek a gyökei fejben számolva az x² + 2x - 15 = 0 egyenletnek?',
        options: [
          '3 és -5',
          '-3 és 5',
          '1 és -15',
          '2 és -15'
        ],
        correctAnswer: 0,
        hint: 'Szorzatuk -15, összegük -2.',
        explanation: 'Szorzatuk -15, összegük -2. Mivel 3 · (-5) = -15 és 3 + (-5) = -2, a gyökök 3 és -5.'
      },
      {
        id: 'vfq1-7',
        level: 1,
        question: 'Mennyi a 2x² - 6x + 4 = 0 egyenlet gyökeinek összege?',
        options: [
          '3',
          '6',
          '-3',
          '2'
        ],
        correctAnswer: 0,
        hint: 'Ne felejts el osztani a = 2-vel! x₁ + x₂ = -(-6)/2.',
        explanation: 'x₁ + x₂ = -b/a = -(-6)/2 = 6/2 = 3. (A gyökök 1 és 2, 1 + 2 = 3).'
      },
      {
        id: 'vfq1-8',
        level: 1,
        question: 'Mennyi a 3x² + 9x - 12 = 0 egyenlet gyökeinek szorzata?',
        options: [
          '-4',
          '+4',
          '-12',
          '-3'
        ],
        correctAnswer: 0,
        hint: 'x₁ · x₂ = c/a = -12 / 3.',
        explanation: 'x₁ · x₂ = c/a = -12/3 = -4. (A gyökök 1 és -4, 1 · (-4) = -4).'
      },
      {
        id: 'vfq1-9',
        level: 1,
        question: 'Milyen feltétel mellett felelnek meg a Viète-formulák valós számoknak?',
        options: [
          'Csak ha a diszkrimináns D = b² - 4ac ≥ 0.',
          'Bármilyen egyenlet esetén, még ha nincs valós megoldás sem.',
          'Csak ha a főegyüttható a = 1.',
          'Csak ha c > 0.'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e valós összegről és szorzatról beszélni, ha a másodfokú egyenletnek nincs valós gyöke?',
        explanation: 'A Viète-formulák algebrai azonosságok, de valós gyökökről kizárólag akkor beszélhetünk, ha D ≥ 0, különben a gyökök nem valós számok!'
      },
      {
        id: 'vfq1-10',
        level: 1,
        question: 'Ha egy normált (a = 1) másodfokú egyenlet gyökei 4 és 7, mi az egyenlet felírása?',
        options: [
          'x² - 11x + 28 = 0',
          'x² + 11x + 28 = 0',
          'x² - 28x + 11 = 0',
          'x² - 3x + 28 = 0'
        ],
        correctAnswer: 0,
        hint: 'Összeg: 4 + 7 = 11 ⟹ -p = 11 ⟹ p = -11. Szorzat: 4 · 7 = 28 ⟹ q = 28.',
        explanation: 'Az egyenlet alakja x² - (x₁ + x₂)x + x₁x₂ = 0 ⟹ x² - 11x + 28 = 0.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szimmetrikus kifejezések és reciprok összegek',
    subtitle: '10 számításos feladat a négyzetösszegről, reciprok összegről és a gyökök különbségéről',
    range: '11–20. kérdés',
    focus: 'x₁² + x₂² = (x₁+x₂)² - 2x₁x₂, 1/x₁ + 1/x₂ = -b/c, szimmetrikus alakok',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'vfq2-1',
        level: 2,
        question: 'Hogyan fejezhető ki a gyökök négyzetösszege (x₁² + x₂²) az összeg és szorzat segítségével?',
        options: [
          '(x₁ + x₂)² - 2x₁x₂',
          '(x₁ + x₂)² + 2x₁x₂',
          '(x₁ + x₂)²',
          '(x₁ - x₂)² + 4x₁x₂'
        ],
        correctAnswer: 0,
        hint: '(x₁ + x₂)² = x₁² + 2x₁x₂ + x₂². Vond ki a felesleges középső tagot!',
        explanation: 'Mivel (x₁ + x₂)² = x₁² + 2x₁x₂ + x₂², mindkét oldalból 2x₁x₂-t levonva kapjuk: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂.'
      },
      {
        id: 'vfq2-2',
        level: 2,
        question: 'Mennyi az x² - 4x + 1 = 0 egyenlet gyökeinek négyzetösszege (x₁² + x₂²)?',
        options: [
          '14',
          '16',
          '18',
          '12'
        ],
        correctAnswer: 0,
        hint: 'x₁ + x₂ = 4 és x₁x₂ = 1. Számold ki: 4² - 2·1-et!',
        explanation: 'x₁ + x₂ = 4, x₁x₂ = 1. A négyzetösszeg: 4² - 2 · 1 = 16 - 2 = 14.'
      },
      {
        id: 'vfq2-3',
        level: 2,
        question: 'Hogyan fejezhető ki az 1/x₁ + 1/x₂ reciprok összeg az egyenlet együtthatóival?',
        options: [
          '-b / c',
          'b / c',
          '-c / b',
          '-b / a'
        ],
        correctAnswer: 0,
        hint: 'Hozd közös nevezőre: (x₁ + x₂) / (x₁x₂) = (-b/a) / (c/a).',
        explanation: '1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂) = (-b/a) / (c/a) = -b/c.'
      },
      {
        id: 'vfq2-4',
        level: 2,
        question: 'Mennyi az x² - 5x + 2 = 0 egyenlet gyökeinek reciprok összege (1/x₁ + 1/x₂)?',
        options: [
          '2,5',
          '-2,5',
          '5',
          '0,4'
        ],
        correctAnswer: 0,
        hint: '-b/c = -(-5)/2 = 5/2.',
        explanation: '1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂) = 5 / 2 = 2,5.'
      },
      {
        id: 'vfq2-5',
        level: 2,
        question: 'Mennyi a 2x² - 6x - 1 = 0 egyenlet gyökeinek négyzetösszege (x₁² + x₂²)?',
        options: [
          '10',
          '8',
          '9',
          '11'
        ],
        correctAnswer: 0,
        hint: 'x₁ + x₂ = 6/2 = 3. x₁x₂ = -1/2 = -0,5. Négyzetösszeg: 3² - 2·(-0,5).',
        explanation: 'x₁ + x₂ = 3, x₁x₂ = -0,5. A négyzetösszeg: 3² - 2·(-0,5) = 9 + 1 = 10.'
      },
      {
        id: 'vfq2-6',
        level: 2,
        question: 'Hogyan írható fel a gyökök különbségének négyzete, (x₁ - x₂)², az összeg és a szorzat segítségével?',
        options: [
          '(x₁ + x₂)² - 4x₁x₂',
          '(x₁ + x₂)² - 2x₁x₂',
          '(x₁ + x₂)² + 4x₁x₂',
          'x₁² - x₂²'
        ],
        correctAnswer: 0,
        hint: '(x₁ - x₂)² = x₁² - 2x₁x₂ + x₂² = (x₁² + 2x₁x₂ + x₂²) - 4x₁x₂.',
        explanation: '(x₁ - x₂)² = (x₁ + x₂)² - 4x₁x₂ = (-b/a)² - 4(c/a) = (b² - 4ac) / a² = D / a².'
      },
      {
        id: 'vfq2-7',
        level: 2,
        question: 'Mennyi az x² - 3x - 4 = 0 egyenletnél az (x₁ - x₂)² kifejezés értéke?',
        options: [
          '25',
          '9',
          '16',
          '7'
        ],
        correctAnswer: 0,
        hint: '(x₁ + x₂)² - 4x₁x₂ = 3² - 4·(-4) = 9 + 16.',
        explanation: 'x₁ + x₂ = 3, x₁x₂ = -4. (x₁ - x₂)² = 3² - 4·(-4) = 9 + 16 = 25. (A gyökök 4 és -1, különbségük 5, 5² = 25).'
      },
      {
        id: 'vfq2-8',
        level: 2,
        question: 'Mennyi az x² + 6x + 3 = 0 egyenlet gyökeinek reciprok összege (1/x₁ + 1/x₂)?',
        options: [
          '-2',
          '2',
          '-0,5',
          '3'
        ],
        correctAnswer: 0,
        hint: '-b/c = -6 / 3.',
        explanation: '1/x₁ + 1/x₂ = -b/c = -6/3 = -2.'
      },
      {
        id: 'vfq2-9',
        level: 2,
        question: 'Hogyan számítható ki az x₁²x₂ + x₁x₂² kifejezés értéke a Viète-formulákból?',
        options: [
          'Kiemelve x₁x₂-t: x₁x₂(x₁ + x₂) = (c/a) · (-b/a).',
          'Négyzetre emeléssel.',
          'Nem számítható ki az egyéni gyökök ismerete nélkül.',
          '(x₁ + x₂) / (x₁x₂)'
        ],
        correctAnswer: 0,
        hint: 'Mindkét tagban szerepel az x₁x₂ szorzat! Emeld ki!',
        explanation: 'x₁²x₂ + x₁x₂² = x₁x₂(x₁ + x₂). Ez a szorzat és az összeg közvetlen szorzata.'
      },
      {
        id: 'vfq2-10',
        level: 2,
        question: 'Mennyi a fenti x₁²x₂ + x₁x₂² kifejezés értéke az x² - 4x + 3 = 0 egyenletre?',
        options: [
          '12',
          '7',
          '-12',
          '1'
        ],
        correctAnswer: 0,
        hint: 'x₁ + x₂ = 4 és x₁x₂ = 3. Számold ki a szorzatukat: 3 · 4!',
        explanation: 'x₁x₂(x₁ + x₂) = 3 · 4 = 12.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Paraméteres feladatok, előjelek és versenyfeladványok',
    subtitle: '10 komplex feladat paraméterekről, gyökök előjeléről és köbösszegekről',
    range: '21–30. kérdés',
    focus: 'Paraméterkeresés (reciprok, ellentett), köbösszegek, előjel meghatározása megoldás nélkül',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-amber-600',
    questions: [
      {
        id: 'vfq3-1',
        level: 3,
        question: 'Milyen m valós paraméter esetén lesznek a 3x² - 8x + m = 0 egyenlet gyökei egymás reciprokai?',
        options: [
          'm = 3',
          'm = 8',
          'm = -3',
          'm = 1'
        ],
        correctAnswer: 0,
        hint: 'Két szám egymás reciproka ⟺ szorzatuk 1: x₁ · x₂ = m/3 = 1.',
        explanation: 'x₁ · x₂ = c/a = m/3. Reciprok gyökök esetén a szorzat 1: m/3 = 1 ⟹ m = 3. Ekkor D = 64 - 36 = 28 > 0, tehát valós gyökök léteznek.'
      },
      {
        id: 'vfq3-2',
        level: 3,
        question: 'Milyen k valós paraméter esetén lesznek a 2x² + kx - 8 = 0 egyenlet gyökei egymás ellentettjei (x₁ = -x₂)?',
        options: [
          'k = 0',
          'k = 4',
          'k = -8',
          'Nincs ilyen k'
        ],
        correctAnswer: 0,
        hint: 'Ellentett gyökök összege 0: x₁ + x₂ = -k/2 = 0.',
        explanation: 'x₁ + x₂ = -k/2. Ha a gyökök ellentettek, összegük nulla: -k/2 = 0 ⟹ k = 0. Ekkor 2x² - 8 = 0 ⟹ x² = 4 ⟹ x = ±2 (valóban ellentettek).'
      },
      {
        id: 'vfq3-3',
        level: 3,
        question: 'Milyen előjelűek a 3x² - 17x + 2 = 0 egyenlet gyökei a megoldóképlet kiszámítása nélkül?',
        options: [
          'Mindkét gyök szigorúan pozitív (+, +)',
          'Mindkét gyök szigorúan negatív (-, -)',
          'Egy pozitív és egy negatív gyök (+, -)',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        hint: 'D = 289 - 24 > 0. Szorzat: 2/3 > 0. Összeg: 17/3 > 0.',
        explanation: 'c/a = 2/3 > 0, tehát a gyökök azonos előjelűek. -b/a = 17/3 > 0, tehát összegük pozitív. Ezért mindkét gyök szigorúan pozitív!'
      },
      {
        id: 'vfq3-4',
        level: 3,
        question: 'Milyen előjelűek a 2x² + 11x + 3 = 0 egyenlet gyökei?',
        options: [
          'Mindkét gyök szigorúan negatív (-, -)',
          'Mindkét gyök szigorúan pozitív (+, +)',
          'Egy pozitív és egy negatív gyök (+, -)',
          'Egyik gyök nulla'
        ],
        correctAnswer: 0,
        hint: 'Szorzat: 3/2 > 0 (azonos előjel). Összeg: -11/2 < 0 (negatív összeg).',
        explanation: 'A szorzat pozitív (3/2 > 0), így a két gyök azonos előjelű. Mivel az összegük negatív (-11/2 < 0), mindkét gyök szükségképpen negatív.'
      },
      {
        id: 'vfq3-5',
        level: 3,
        question: 'Milyen előjelűek az 5x² + 4x - 7 = 0 egyenlet gyökei?',
        options: [
          'Egy pozitív és egy negatív gyök (+, -)',
          'Mindkettő pozitív',
          'Mindkettő negatív',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        hint: 'Nézd a gyökök szorzatát: c/a = -7/5 < 0!',
        explanation: 'Két valós szám szorzata pontosan akkor negatív, ha ellentétes előjelűek. Mivel c/a = -7/5 < 0, az egyenletnek egy pozitív és egy negatív gyöke van.'
      },
      {
        id: 'vfq3-6',
        level: 3,
        question: 'Hogyan fejezhető ki a gyökök köbösszege (x₁³ + x₂³) szimmetrikus alakban?',
        options: [
          '(x₁ + x₂)³ - 3x₁x₂(x₁ + x₂)',
          '(x₁ + x₂)³ - x₁x₂',
          '(x₁ + x₂)³ + 3x₁x₂(x₁ + x₂)',
          '(x₁ + x₂)(x₁² + x₂²)'
        ],
        correctAnswer: 0,
        hint: '(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a + b).',
        explanation: '(x₁ + x₂)³ = x₁³ + x₂³ + 3x₁x₂(x₁ + x₂). Átrendezve: x₁³ + x₂³ = (x₁ + x₂)³ - 3x₁x₂(x₁ + x₂).'
      },
      {
        id: 'vfq3-7',
        level: 3,
        question: 'Mennyi az x² - 4x + 2 = 0 egyenlet gyökeinek köbösszege (x₁³ + x₂³)?',
        options: [
          '40',
          '64',
          '32',
          '56'
        ],
        correctAnswer: 0,
        hint: 'x₁ + x₂ = 4, x₁x₂ = 2. Számold ki: 4³ - 3·2·4-et!',
        explanation: '4³ - 3 · 2 · 4 = 64 - 24 = 40.'
      },
      {
        id: 'vfq3-8',
        level: 3,
        question: 'Milyen pozitív p paraméter esetén lesz az x² - 6x + p = 0 egyenlet egyik gyöke a másik kétszerese (x₂ = 2x₁)?',
        options: [
          'p = 8',
          'p = 9',
          'p = 4',
          'p = 12'
        ],
        correctAnswer: 0,
        hint: 'Összeg: x₁ + 2x₁ = 3x₁ = 6 ⟹ x₁ = 2. Szorzat: p = x₁ · x₂ = 2 · 4.',
        explanation: 'x₁ + x₂ = 6 ⟹ x₁ + 2x₁ = 3x₁ = 6 ⟹ x₁ = 2, így x₂ = 4. A szorzat p = x₁ · x₂ = 2 · 4 = 8.'
      },
      {
        id: 'vfq3-9',
        level: 3,
        question: 'Milyen k paraméter esetén lesz az x² + kx + 25 = 0 egyenletnek két egyenlő valós gyöke (x₁ = x₂)?',
        options: [
          'k = ±10',
          'k = 10',
          'k = 5',
          'k = ±5'
        ],
        correctAnswer: 0,
        hint: 'Két egyenlő gyök esetén D = k² - 4·1·25 = 0 ⟹ k² = 100.',
        explanation: 'D = k² - 100 = 0 ⟹ k = ±10. Ha k = 10, a gyökök -5 és -5; ha k = -10, a gyökök 5 és 5.'
      },
      {
        id: 'vfq3-10',
        level: 3,
        question: 'Mennyi az x₁/x₂ + x₂/x₁ kifejezés értéke az x² - 5x + 3 = 0 egyenletre?',
        options: [
          '19 / 3',
          '25 / 3',
          '7',
          '16 / 3'
        ],
        correctAnswer: 0,
        hint: 'Közös nevezővel: (x₁² + x₂²) / (x₁x₂). x₁² + x₂² = 5² - 2·3 = 19.',
        explanation: 'x₁/x₂ + x₂/x₁ = (x₁² + x₂²) / (x₁x₂). A négyzetösszeg: 5² - 2·3 = 19. A szorzat: 3. Így az érték 19/3.'
      }
    ]
  }
};

export const VieteFormulasQuiz: React.FC<VieteFormulasQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-viete-formulak-quiz"
      topicTitle="Viète-formulák – Kvíz és Feladatok"
      themeColor="amber"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <VieteFormulasMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules) => (
        <VieteFormulasSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

