import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PossibilitiesMatcher } from './PossibilitiesMatcher';
import { PossibilitiesSorter } from './PossibilitiesSorter';
import { PossibilitiesSolverFigure } from './PossibilitiesDiagrams';
import {
  Plus,
  X,
  GitBranch,
  KeyRound,
  Layers,
  Sparkles,
  Utensils,
  Shirt,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

interface PossibilitiesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Összeadási Szabály (VAGY)',
    icon: <Plus className="w-4 h-4 text-amber-600" />,
    formula: '|A ∪ B| = |A| + |B|',
    note: 'Egymást kölcsönösen kizáró lehetőségek esetén a döntések száma összeadódik (pl. 3 vonat VAGY 4 busz ⟹ 3 + 4 = 7).'
  },
  {
    id: 'c2',
    title: 'Szorzási Szabály (ÉS)',
    icon: <X className="w-4 h-4 text-indigo-600" />,
    formula: 'p · q · r ···',
    note: 'Egymást követő vagy független rész-döntések esetén a lehetőségek összeszorzódnak (pl. 3 póló · 4 nadrág · 2 cipő = 24 szett).'
  },
  {
    id: 'c3',
    title: 'Visszatevéssel (Ismétlés)',
    icon: <KeyRound className="w-4 h-4 text-purple-600" />,
    formula: 'n · n · n ··· = nᵏ',
    note: 'Ha a számjegyek vagy elemek többször is választhatók (pl. 4-jegyű PIN kód: 10⁴ = 10 000).'
  },
  {
    id: 'c4',
    title: 'Visszatevés nélkül (Különböző)',
    icon: <Sparkles className="w-4 h-4 text-pink-600" />,
    formula: 'n · (n - 1) · (n - 2) ···',
    note: 'Ha minden elemet legfeljebb egyszer használunk fel (pl. 8 futó dobogós sorrendje: 8 · 7 · 6 = 336).'
  },
  {
    id: 'c5',
    title: '0 a Szám Elején (Megkötés)',
    icon: <Layers className="w-4 h-4 text-rose-600" />,
    formula: '(n - 1) · (n - 1) · (n - 2) ···',
    note: 'Többjegyű számnál az 1. helyre nem kerülhet 0, így az 1. pozícióra 1-gyel kevesebb választási lehetőség van.'
  },
  {
    id: 'c6',
    title: 'Szita-formula & Komplementer',
    icon: <Layers className="w-4 h-4 text-teal-600" />,
    formula: '|A ∪ B| = |A| + |B| - |A ∩ B|',
    note: 'Átfedő eseteknél a metszetet levonjuk; komplementernél: Jó esetek = Összes eset - Tiltott esetek.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Döntések, Összeadás és Szorzás',
    subtitle: 'Öltözködés, menüválasztás, utazási alternatívák, érme- és kockadobások',
    range: '1 - 10. feladat',
    focus: 'Összeadási vs Szorzási Szabály',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Péternek 4 különböző színű pólója és 3 különböző nadrágja van. Hányféleképpen választhat ki magának 1 pólót ÉS 1 nadrágot?',
        questionTypeBadge: 'Szorzási szabály',
        figure: <PossibilitiesSolverFigure type="outfit" />,
        options: ['12', '7', '16', '9'],
        correctAnswer: '12',
        explanation: 'Két független döntés egymás után: 4 féle pólóhoz mind a 3 féle nadrág párosítható. Összesen: 4 · 3 = 12 különböző öltözék.',
        breakdown: [
          { label: 'Pólók száma', value: '4 lehetőség' },
          { label: 'Nadrágok száma', value: '3 lehetőség' },
          { label: 'Összes szett', value: '4 · 3 = 12' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Budapestről Győrbe 3 vonatjárat VAGY 4 buszjárat közül választhatunk a délelőtt folyamán. Hányféleképpen utazhatunk el délelőtt?',
        questionTypeBadge: 'Összeadási szabály',
        figure: <PossibilitiesSolverFigure type="roads" />,
        options: ['7', '12', '1', '14'],
        correctAnswer: '7',
        explanation: 'A két utazási mód kölcsönösen kizárja egymást (vagy vonatra, vagy buszra szállunk). Az összeadási szabály szerint: 3 + 4 = 7 lehetőség.',
        breakdown: [
          { label: 'Vonat járatok', value: '3 járat' },
          { label: 'Busz járatok', value: '4 járat' },
          { label: 'Összesen (VAGY)', value: '3 + 4 = 7 lehetőség' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Egy étterem menüjében 2 féle leves, 4 féle főétel és 3 féle desszert szerepel. Hányféle 3-fogásos ebéd állítható össze?',
        questionTypeBadge: 'Menüválasztás',
        figure: <PossibilitiesSolverFigure type="menu" />,
        options: ['24', '9', '18', '36'],
        correctAnswer: '24',
        explanation: 'Három egymást követő döntés: a leves 2, a főétel 4, a desszert 3 féle lehet. Szorzási szabály: 2 · 4 · 3 = 24 különböző menü.',
        breakdown: [
          { label: 'Leves', value: '2 lehetőség' },
          { label: 'Főétel', value: '4 lehetőség' },
          { label: 'Desszert', value: '3 lehetőség' },
          { label: 'Összesen', value: '2 · 4 · 3 = 24 menü' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Feldobunk egy szabályos pénzérmét kétszer egymás után. Hány különböző (fej/írás) kimenetel lehetséges?',
        questionTypeBadge: 'Érmedobás',
        figure: <PossibilitiesSolverFigure type="tree" />,
        options: ['4', '2', '8', '6'],
        correctAnswer: '4',
        explanation: 'Az 1. dobás 2-féle (F vagy Í), a 2. dobás is 2-féle lehet: 2 · 2 = 4 eset (FF, FÍ, ÍF, ÍÍ).',
        breakdown: [
          { label: '1. dobás', value: '2 lehetőség (F, Í)' },
          { label: '2. dobás', value: '2 lehetőség (F, Í)' },
          { label: 'Kimenetelek', value: '2 · 2 = 4 eset' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Egyszerre feldobunk 1 db szabályos hatoldalú dobókockát ÉS 1 db pénzérmét. Hány különböző kimenetel lehetséges?',
        questionTypeBadge: 'Kocka + Érme',
        figure: <PossibilitiesSolverFigure type="dice_coin" />,
        options: ['12', '8', '36', '14'],
        correctAnswer: '12',
        explanation: 'A kocka 6-féle számot mutathat (1-6), az érme 2-féle (F vagy Í). Összesen: 6 · 2 = 12 kimenetel.',
        breakdown: [
          { label: 'Dobókocka', value: '6 lehetőség (1..6)' },
          { label: 'Pénzérme', value: '2 lehetőség (F, Í)' },
          { label: 'Összes kimenetel', value: '6 · 2 = 12' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Egy gyümölcskosárban 5 alma és 4 narancs van. Hányféleképpen vehetünk ki 1 db gyümölcsöt a kosárból?',
        questionTypeBadge: 'Összeadási szabály',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['9', '20', '5', '4'],
        correctAnswer: '9',
        explanation: 'Vagy almát választunk (5 lehetőség), VAGY narancsot (4 lehetőség): 5 + 4 = 9 lehetőség.',
        breakdown: [
          { label: 'Almák száma', value: '5 db' },
          { label: 'Narancsok száma', value: '4 db' },
          { label: '1 gyümölcs választása', value: '5 + 4 = 9 lehetőség' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Három pénzérmét dobunk fel egyszerre. Hány különböző kimenetelt kaphatunk?',
        questionTypeBadge: 'Fa-diagram kimenetel',
        figure: <PossibilitiesSolverFigure type="tree" />,
        options: ['8', '6', '16', '9'],
        correctAnswer: '8',
        explanation: 'Mindhárom pénzérme 2-féleképpen eshet le: 2 · 2 · 2 = 2³ = 8 különböző kimenetel.',
        breakdown: [
          { label: 'Szorzás', value: '2 · 2 · 2 = 2³' },
          { label: 'Eredmény', value: '8 kimenetel' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Két darab szabályos hatoldalú dobókockával dobunk. Hányféle különböző számpár (dobáseredmény) születhet?',
        questionTypeBadge: 'Két dobókocka',
        figure: <PossibilitiesSolverFigure type="dice_coin" />,
        options: ['36', '12', '18', '24'],
        correctAnswer: '36',
        explanation: 'Az 1. kocka 6-féle, a 2. kocka is 6-féle lehet: 6 · 6 = 36 különböző kimenetel.',
        breakdown: [
          { label: '1. kocka', value: '6 lehetőség' },
          { label: '2. kocka', value: '6 lehetőség' },
          { label: 'Összes kimenetel', value: '6 · 6 = 36' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Egy fagyizóban 6 féle gombócos fagylalt és 4 féle pálcikás jégkrém kapható. Hányféleképpen választhatunk 1 db édességet?',
        questionTypeBadge: 'VAGY választás',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['10', '24', '6', '4'],
        correctAnswer: '10',
        explanation: 'Vagy gombócos fagyit kérünk, vagy pálcikás jégkrémet. Összeadási szabály: 6 + 4 = 10 lehetőség.',
        breakdown: [
          { label: 'Kiszámítás', value: '6 + 4 = 10' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Anna 3 felsőből, 2 szoknyából és 2 pár cipőből válogat a reggeli öltözködéshez. Hány különböző komplett szettet állíthat össze?',
        questionTypeBadge: 'Öltözködés',
        figure: <PossibilitiesSolverFigure type="outfit" />,
        options: ['12', '7', '18', '14'],
        correctAnswer: '12',
        explanation: 'Felső (3) · Szoknya (2) · Cipő (2) = 3 · 2 · 2 = 12 szett.',
        breakdown: [
          { label: 'Szorzás', value: '3 · 2 · 2' },
          { label: 'Eredmény', value: '12 öltözék' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Úthálózatok, Számképzés és Visszatevés',
    subtitle: 'PIN-kódok, 3-jegyű számok megkötésekkel, útvonalak és dobogós helyezések',
    range: '11 - 20. feladat',
    focus: 'Visszatevéssel vs Visszatevés Nélkül',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    iconBg: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Az "A" városból a "B" városba 3 út vezet, a "B" városból a "C" városba pedig 4 út. Hány különböző útvonalon juthatunk el A-ból C-be B-n keresztül?',
        questionTypeBadge: 'Úthálózat',
        figure: <PossibilitiesSolverFigure type="roads" />,
        options: ['12', '7', '14', '24'],
        correctAnswer: '12',
        explanation: 'Az 1. szakaszra 3, a 2. szakaszra 4 út közül választhatunk függetlenül: 3 · 4 = 12 különböző útvonal.',
        breakdown: [
          { label: 'A ➔ B szakasz', value: '3 út' },
          { label: 'B ➔ C szakasz', value: '4 út' },
          { label: 'A ➔ B ➔ C útvonal', value: '3 · 4 = 12 útvonal' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Hány különböző 4-jegyű bankkártya PIN kód készíthető a 0, 1, 2, ..., 9 számjegyekből (a számjegyek tetszőlegesen ismétlődhetnek)?',
        questionTypeBadge: 'PIN kód',
        figure: <PossibilitiesSolverFigure type="pin" />,
        options: ['10 000', '5 040', '9 000', '1 000'],
        correctAnswer: '10 000',
        explanation: 'Mivel a PIN kód 0-val is kezdődhet és a jegyek ismétlődhetnek, mind a 4 helyiértékre 10 jegy választható: 10 · 10 · 10 · 10 = 10⁴ = 10 000.',
        breakdown: [
          { label: 'Helyiértékek', value: '10 · 10 · 10 · 10' },
          { label: 'Összes PIN', value: '10⁴ = 10 000' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Hány darab 3-jegyű szám készíthető az 1, 2, 3, 4, 5 számjegyekből, ha a számjegyek ISMÉTLŐDHETNEK (visszatevéssel)?',
        questionTypeBadge: 'Ismétléses számképzés',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['125', '60', '15', '243'],
        correctAnswer: '125',
        explanation: 'A százasok, tízesek és egyesek helyére is mind az 5 számjegy kerülhet: 5 · 5 · 5 = 5³ = 125 szám.',
        breakdown: [
          { label: 'Százasok', value: '5 lehetőség' },
          { label: 'Tízesek', value: '5 lehetőség' },
          { label: 'Egyesek', value: '5 lehetőség' },
          { label: 'Összesen', value: '5³ = 125' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Hány darab 3-jegyű szám készíthető az 1, 2, 3, 4, 5 számjegyekből, ha minden számjegyet LEGFELJEBB EGYSZER használhatunk fel (különböző jegyek)?',
        questionTypeBadge: 'Visszatevés nélkül',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['60', '125', '20', '120'],
        correctAnswer: '60',
        explanation: 'Az 1. helyre 5, a 2. helyre 4, a 3. helyre 3 lehetőség marad: 5 · 4 · 3 = 60 szám.',
        breakdown: [
          { label: '1. jegy', value: '5 lehetőség' },
          { label: '2. jegy', value: '4 lehetőség' },
          { label: '3. jegy', value: '3 lehetőség' },
          { label: 'Összesen', value: '5 · 4 · 3 = 60' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Az "A" és "B" város között 4 különböző út vezet. Hányféleképpen utazhatunk el A-ból B-be, majd vissza A-ba úgy, hogy VISSZAFELÉ MÁSIK ÚTON jövünk?',
        questionTypeBadge: 'Oda-vissza út',
        figure: <PossibilitiesSolverFigure type="roads" />,
        options: ['12', '16', '7', '8'],
        correctAnswer: '12',
        explanation: 'Odafelé 4 út közül választhatunk. Visszafelé a használt utat kizárjuk, így 3 út marad: 4 · 3 = 12 oda-vissza útvonal.',
        breakdown: [
          { label: 'Odaút', value: '4 lehetőség' },
          { label: 'Visszaút (másik út)', value: '3 lehetőség' },
          { label: 'Összesen', value: '4 · 3 = 12 útvonal' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Hány darab 3-jegyű szám képezhető a 0, 1, 2, 3 számjegyekből, ha a jegyek nem ismétlődhetnek (különböző számjegyek)?',
        questionTypeBadge: '0 az élen',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['18', '24', '12', '16'],
        correctAnswer: '18',
        explanation: 'Az 1. helyre (százasok) nem kerülhet 0, így 3 lehetőség van (1, 2, 3). A 2. helyre a maradék 3 jegy, a 3. helyre 2: 3 · 3 · 2 = 18 szám.',
        breakdown: [
          { label: '1. jegy (nem 0)', value: '3 lehetőség' },
          { label: '2. jegy', value: '3 lehetőség (0 is lehet)' },
          { label: '3. jegy', value: '2 lehetőség' },
          { label: 'Összesen', value: '3 · 3 · 2 = 18' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Egy 8 fős futóversenyen hányféleképpen alakulhat a dobogós sorrend (arany, ezüst, bronzérem), ha nincs holtverseny?',
        questionTypeBadge: 'Dobogós helyezés',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['336', '512', '56', '24'],
        correctAnswer: '336',
        explanation: '1. helyre 8, 2. helyre 7, 3. helyre 6 futó kerülhet: 8 · 7 · 6 = 336 dobogós elrendezés.',
        breakdown: [
          { label: 'Aranyérmes', value: '8 lehetőség' },
          { label: 'Ezüstérmes', value: '7 lehetőség' },
          { label: 'Bronzérmes', value: '6 lehetőség' },
          { label: 'Összesen', value: '8 · 7 · 6 = 336' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Hány olyan 3-jegyű kód képezhető az A, B, C betűkből, amelyben a betűk ISMÉTLŐDHETNEK?',
        questionTypeBadge: 'Betűkód',
        figure: <PossibilitiesSolverFigure type="pin" />,
        options: ['27', '9', '6', '81'],
        correctAnswer: '27',
        explanation: 'Mindhárom pozícióra mind a 3 betű kerülhet: 3 · 3 · 3 = 3³ = 27 kód.',
        breakdown: [
          { label: 'Kiszámítás', value: '3³ = 27' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Egy 4 fős társaságban mindenki mindenkivel koccint pontosan egyszer. Hány koccintás történik összesen?',
        questionTypeBadge: 'Koccintások száma',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['6', '12', '16', '4'],
        correctAnswer: '6',
        explanation: '4 ember mindegyike 3 másikkal koccintana (4 · 3 = 12), de minden koccintást 2 ember között kétszer számoltunk: (4 · 3) / 2 = 6 koccintás.',
        breakdown: [
          { label: 'Párok száma', value: '(4 · 3) / 2' },
          { label: 'Eredmény', value: '6 koccintás' }
        ]
      },
      {
        id: 'q20',
        prompt: 'Hány darab 3-jegyű PÁROS szám képezhető az 1, 2, 3, 4, 5 számjegyekből (ismétlés nélkül)?',
        questionTypeBadge: 'Páros megkötés',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['24', '12', '60', '18'],
        correctAnswer: '24',
        explanation: 'Az utolsó jegy páros kell legyen (2 vagy 4 → 2 lehetőség). Az 1. jegyre a maradék 4-ből, a 2. jegyre 3-ból választhatunk: 4 · 3 · 2 = 24 szám.',
        breakdown: [
          { label: 'Utolsó jegy (2 vagy 4)', value: '2 lehetőség' },
          { label: 'Első két jegy', value: '4 · 3 = 12 lehetőség' },
          { label: 'Összesen', value: '12 · 2 = 24 szám' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szita-formula, Komplementer és Mesterfogások',
    subtitle: 'Átfedő halmazok, legalább egy találat, összetett úthálózatok és esetszétválasztás',
    range: '21 - 30. feladat',
    focus: 'Szita-elv & Komplementer Módszer',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Egy 30 fős osztályban 18-an úsznak, 14-en atletizálnak, és 6-an mindkét sportot űzik. Hányan űznek LEGALÁBB az egyik sportot?',
        questionTypeBadge: 'Szita-formula',
        figure: <PossibilitiesSolverFigure type="venn" />,
        options: ['26', '32', '20', '24'],
        correctAnswer: '26',
        explanation: 'A kéthalmazos szita-formula szerint: |Úszás ∪ Atlétika| = |Úszás| + |Atlétika| - |Közös| = 18 + 14 - 6 = 26 diák.',
        breakdown: [
          { label: 'Úszók', value: '18 fő' },
          { label: 'Atléták', value: '14 fő' },
          { label: 'Közös metszet levonása', value: '- 6 fő' },
          { label: 'Legalább egyet űzők', value: '18 + 14 - 6 = 26 fő' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Feldobunk 3 szabályos pénzérmét. Hány esetben kapunk LEGALÁBB EGY FEJET a dobások során?',
        questionTypeBadge: 'Komplementer módszer',
        figure: <PossibilitiesSolverFigure type="tree" />,
        options: ['7', '8', '6', '4'],
        correctAnswer: '7',
        explanation: 'Komplementer módszer:\n1. Összes kimenetel: 2³ = 8.\n2. Tiltott eset (egyik sem fej = csupa írás: ÍÍÍ): 1 eset.\n3. Legalább egy fej: 8 - 1 = 7 eset.',
        breakdown: [
          { label: 'Összes eset', value: '2³ = 8' },
          { label: 'Csupa írás (rossz eset)', value: '1 eset (ÍÍÍ)' },
          { label: 'Legalább egy fej', value: '8 - 1 = 7 eset' }
        ]
      },
      {
        id: 'q23',
        prompt: 'A-ból C-be két útvonaltípus létezik: vagy a B csomóponton át megyünk (A-ból B-be 2 út, B-ből C-be 3 út), VAGY a D csomóponton át (A-ból D-be 1 út, D-ből C-be 4 út). Összesen hányféleképpen juthatunk el A-ból C-be?',
        questionTypeBadge: 'Esetszétválasztás',
        figure: <PossibilitiesSolverFigure type="roads" />,
        options: ['10', '24', '14', '7'],
        correctAnswer: '10',
        explanation: '1. B-n keresztül: 2 · 3 = 6 út.\n2. D-n keresztül: 1 · 4 = 4 út.\n3. A két alternatíva kizárja egymást (összeadási szabály): 6 + 4 = 10 útvonal.',
        breakdown: [
          { label: '1. ág (B-n át)', value: '2 · 3 = 6 út' },
          { label: '2. ág (D-n át)', value: '1 · 4 = 4 út' },
          { label: 'Összesen (VAGY)', value: '6 + 4 = 10 útvonal' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Két dobókockával dobva hány esetben lesz a dobott számok ÖSSZEGE pontosan 7?',
        questionTypeBadge: 'Kockaösszeg',
        figure: <PossibilitiesSolverFigure type="dice_coin" />,
        options: ['6', '5', '8', '4'],
        correctAnswer: '6',
        explanation: 'A lehetséges párok: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Összesen 6 ilyen eset van.',
        breakdown: [
          { label: 'Párok', value: '(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)' },
          { label: 'Esetek száma', value: '6 eset' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Az 1-től 30-ig terjedő egész számok közül hány darab osztható 2-vel VAGY 3-mal?',
        questionTypeBadge: 'Szita-formula',
        figure: <PossibilitiesSolverFigure type="venn" />,
        options: ['20', '25', '15', '18'],
        correctAnswer: '20',
        explanation: '1. 2-vel oszthatók: 30 / 2 = 15 szám.\n2. 3-mal oszthatók: 30 / 3 = 10 szám.\n3. Mindkettővel (6-tal) oszthatók: 30 / 6 = 5 szám.\nSzita-formula: 15 + 10 - 5 = 20 szám.',
        breakdown: [
          { label: '2-vel oszthatók', value: '15 db' },
          { label: '3-mal oszthatók', value: '10 db' },
          { label: '6-tal oszthatók (metszet)', value: '- 5 db' },
          { label: 'Összesen', value: '15 + 10 - 5 = 20 db' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Két dobókockával dobunk egyszerre. Hány olyan kimenetel van, amelyben a KÉT DOBOTT SZÁM KÜLÖNBÖZIK egymástól?',
        questionTypeBadge: 'Komplementer kocka',
        figure: <PossibilitiesSolverFigure type="dice_coin" />,
        options: ['30', '36', '24', '18'],
        correctAnswer: '30',
        explanation: '1. Összes kimenetel: 6 · 6 = 36.\n2. Egyforma párok (1-1, 2-2, 3-3, 4-4, 5-5, 6-6): 6 eset.\n3. Különböző párok: 36 - 6 = 30 eset.',
        breakdown: [
          { label: 'Összes eset', value: '36' },
          { label: 'Egyformák', value: '6' },
          { label: 'Különbözők', value: '36 - 6 = 30 eset' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Hány darab 4-jegyű szám készíthető a 0, 1, 2, 3, 4 számjegyekből, ha a számjegyek ISMÉTLŐDHETNEK, de az 1. helyre nem kerülhet 0?',
        questionTypeBadge: 'Ismétléses 0 korlát',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['500', '625', '120', '400'],
        correctAnswer: '500',
        explanation: 'Az 1. helyre 4 jegy kerülhet (1, 2, 3, 4). A 2., 3. és 4. helyre mind az 5 számjegy: 4 · 5 · 5 · 5 = 4 · 125 = 500 szám.',
        breakdown: [
          { label: '1. jegy (nem 0)', value: '4 lehetőség' },
          { label: '2., 3., 4. jegy', value: '5 · 5 · 5 = 125 lehetőség' },
          { label: 'Összesen', value: '4 · 125 = 500 szám' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Egy 5 csapatos egyenes kieséses tornán (ahol a vesztes azonnal kiesik) hány mérkőzést kell lejátszani a bajnoki cím eldöntéséhez?',
        questionTypeBadge: 'Kieséses bajnokság',
        figure: <PossibilitiesSolverFigure type="tree" />,
        options: ['4', '5', '10', '8'],
        correctAnswer: '4',
        explanation: 'Minden egyes mérkőzésen pontosan 1 csapat esik ki. Mivel 5 csapatból 4-nek ki kell esnie a bajnok megtalálásához, pontosan 5 - 1 = 4 mérkőzés szükséges.',
        breakdown: [
          { label: 'Csapatok száma', value: '5 csapat' },
          { label: 'Kiesők száma', value: '5 - 1 = 4 csapat' },
          { label: 'Mérkőzések száma', value: '4 mérkőzés' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Egy 20 fős társaságban mindenki választ vagy teát, vagy kávét. 12-en teáznak, 11-en kávéznak, és 3-an mindkettőt fogyasztanak. Hányan vannak, akik CSAK TEÁT isznak?',
        questionTypeBadge: 'Halmazos részhalmaz',
        figure: <PossibilitiesSolverFigure type="venn" />,
        options: ['9', '12', '8', '6'],
        correctAnswer: '9',
        explanation: 'A 12 teázóból 3-an kávéznak is. Így csak teát: 12 - 3 = 9 ember iszik.',
        breakdown: [
          { label: 'Teázók összesen', value: '12 fő' },
          { label: 'Mindkettőt ivók', value: '3 fő' },
          { label: 'Csak teázók', value: '12 - 3 = 9 fő' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Hány olyan 3-jegyű szám van a 0, 1, 2, 3 számjegyekből (ismétlés nélkül), amely PÁRATLAN szám?',
        questionTypeBadge: 'Összetett számképzés',
        figure: <PossibilitiesSolverFigure type="slots" />,
        options: ['8', '6', '12', '18'],
        correctAnswer: '8',
        explanation: '1. Utolsó jegy páratlan (1 vagy 3): 2 lehetőség.\n2. Első jegy: nem lehet 0 és nem lehet az utolsó jegy ⟹ a maradék 2 jegyből választhatunk (2 lehetőség).\n3. Második jegy: a megmaradt 2 jegy bármelyike (2 lehetőség).\nÖsszesen: 2 · 2 · 2 = 8 páratlan szám (103, 123, 201, 203, 213, 231, 301, 321).',
        breakdown: [
          { label: 'Utolsó jegy (1 vagy 3)', value: '2 lehetőség' },
          { label: 'Első jegy (nem 0 és nem utolsó)', value: '2 lehetőség' },
          { label: 'Középső jegy', value: '2 lehetőség' },
          { label: 'Összesen', value: '2 · 2 · 2 = 8 szám' }
        ]
      }
    ]
  }
};

export const PossibilitiesQuiz: React.FC<PossibilitiesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="hany-eset-van"
      topicId="g7-logic-how-many-cases"
      topicTitle="3. Hány eset van?"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="3. Hány eset van? Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: összeadási és szorzási szabály, úthálózatok, visszatevés és szita-formula"
      cheatSheetTitle="Összeszámlálási Szabályok és Képletek"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<PossibilitiesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PossibilitiesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="blue"
    />
  );
};
