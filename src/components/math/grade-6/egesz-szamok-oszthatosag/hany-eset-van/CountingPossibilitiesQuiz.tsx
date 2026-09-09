import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { CountingPossibilitiesMatcher } from './CountingPossibilitiesMatcher';
import { CountingPossibilitiesSorter } from './CountingPossibilitiesSorter';

export interface CountingPossibilitiesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Szorzási szabály (Független döntések)',
    formula: 'Összes eset = a · b · c · ...',
    note: 'Ha az 1. lépést a-féleképpen, a 2. lépést b-féleképpen választhatjuk, akkor a kettőt együtt a · b módon.'
  },
  {
    topic: 'Sorbaállítás (Permutáció)',
    formula: 'n elem sorrendje = n · (n-1) · ... · 1',
    note: 'Például 4 gyerek 4 székre: 4 · 3 · 2 · 1 = 24 féleképpen ülhet le.'
  },
  {
    topic: 'Érme- és kockadobások',
    formula: 'Érmék: 2ⁿ  |  Kockák: 6ⁿ',
    note: '2 érme: 2² = 4 eset. 3 érme: 2³ = 8 eset. 2 kocka: 6² = 36 eset.'
  },
  {
    topic: 'Számképzés 0-val',
    formula: '1. számjegy sosem lehet 0!',
    note: 'Pl. 0, 4, 7-ből 3-jegyű szám: az 1. helyre csak 4 vagy 7 kerülhet (2 · 2 · 1 = 4 szám).'
  },
  {
    topic: 'Ismétléses választás',
    formula: 'k darab lehetőség n helyre: kⁿ',
    note: 'Ha a számjegyek ismétlődhetnek 1, 2, 3-ból 3-jegyű: 3 · 3 · 3 = 27 szám.'
  },
  {
    topic: 'Kézfogások száma',
    formula: 'n ember között: n · (n - 1) / 2',
    note: 'Mert mindenki n-1 emberrel fog kezet, és A-B kézfogás ugyanaz, mint B-A.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető választások, érmedobások és egyszerű sorrendek',
    range: 'Egyszerű kombinatorikai feladatok legfeljebb 10-15 esetig',
    focus: 'Érmedobások, ruházat- és menükombinációk, 2-3 elem sorbaállítása',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hány különböző kimenetele lehet 2 pénzérme feldobásának (Fej vagy Írás)?',
        highlightValue: '2 érmedobás',
        questionTypeBadge: 'Érmedobás',
        options: ['4', '2', '6', '8'],
        correctAnswer: '4',
        explanation: 'Az 1. érme 2-féle (F, I), a 2. érme 2-féle (F, I) lehet: 2 · 2 = 4 eset [(F,F), (F,I), (I,F), (I,I)].',
        breakdown: [
          { label: '1. érme', value: '2 eset (F, I)' },
          { label: '2. érme', value: '2 eset (F, I)' },
          { label: 'Összesen', value: '2 · 2 = 4 eset' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Hányféleképpen választhatunk ki 1 pólót és 1 nadrágot, ha 3 különböző pólónk és 2 különböző nadrágunk van?',
        highlightValue: '3 póló és 2 nadrág',
        questionTypeBadge: 'Ruházat választás',
        options: ['6', '5', '8', '12'],
        correctAnswer: '6',
        explanation: 'A szorzási szabály szerint: 3 póló · 2 nadrág = 6 különböző szett állítható össze.',
        breakdown: [
          { label: 'Felsők', value: '3 lehetőség' },
          { label: 'Alsók', value: '2 lehetőség' },
          { label: 'Szorzat', value: '3 · 2 = 6 szett' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Hányféle sorrendben állhat fel a dobogóra az 1., 2., 3. helyezett versenyző, ha 3-an vettek részt a döntőben?',
        highlightValue: '3 versenyző dobogója',
        questionTypeBadge: 'Sorbaállítás',
        options: ['6', '3', '9', '12'],
        correctAnswer: '6',
        explanation: 'Az 1. helyre 3, a 2. helyre 2, a 3. helyre 1 futó kerülhet: 3 · 2 · 1 = 6 különböző sorrend.',
        breakdown: [
          { label: '1. hely', value: '3 lehetőség' },
          { label: '2. hely', value: '2 lehetőség' },
          { label: '3. hely', value: '1 lehetőség (3 · 2 · 1 = 6)' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hány különböző kétjegyű szám alkotható az 5 és 8 számkártyákból, ha a kártyákat csak egyszer használhatjuk fel?',
        highlightValue: '5 és 8 számkártyák',
        questionTypeBadge: 'Számképzés',
        options: ['2', '4', '3', '1'],
        correctAnswer: '2',
        explanation: 'Csak két szám képezhető: az 58 és a 85.',
        breakdown: [
          { label: 'Képzett számok', value: '58 és 85' },
          { label: 'Darabszám', value: '2 db' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Egy étterem menüjében 2 féle leves és 4 féle főétel szerepel. Hányféle kétfogásos ebéd állítható össze?',
        highlightValue: '2 leves és 4 főétel',
        questionTypeBadge: 'Menü összeállítás',
        options: ['8', '6', '12', '16'],
        correctAnswer: '8',
        explanation: '2 leves · 4 főétel = 8 különböző kétfogásos menü lehetséges.',
        breakdown: [
          { label: 'Levesek', value: '2 lehetőség' },
          { label: 'Főételek', value: '4 lehetőség' },
          { label: 'Összesen', value: '2 · 4 = 8 ebéd' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Hány különböző kimenetele lehet egyetlen szabályos dobókocka feldobásának?',
        highlightValue: '1 kockadobás',
        questionTypeBadge: 'Kockadobás',
        options: ['6', '12', '36', '4'],
        correctAnswer: '6',
        explanation: 'A kocka 6 oldalú, a lehetséges dobások az 1, 2, 3, 4, 5, 6 számok (6 eset).',
        breakdown: [
          { label: 'Kimenetelek', value: '1, 2, 3, 4, 5, 6' },
          { label: 'Összesen', value: '6 eset' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Hányféle sorrendben tehetünk egymás mellé a polcon 3 különböző könyvet?',
        highlightValue: '3 könyv sorrendje',
        questionTypeBadge: 'Könyvek a polcon',
        options: ['6', '3', '9', '27'],
        correctAnswer: '6',
        explanation: 'Az első helyre 3 könyv, a másodikra 2 könyv, a harmadikra 1 könyv kerülhet: 3 · 2 · 1 = 6 sorrend.',
        breakdown: [
          { label: '1. pozíció', value: '3 könyv' },
          { label: '2. pozíció', value: '2 könyv' },
          { label: '3. pozíció', value: '1 könyv (3 · 2 · 1 = 6)' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hány különböző kimenetele lehet 3 pénzérme egyszerre történő feldobásának?',
        highlightValue: '3 érmedobás',
        questionTypeBadge: 'Három érme',
        options: ['8', '6', '9', '12'],
        correctAnswer: '8',
        explanation: 'Mindhárom érme 2-féle lehet: 2 · 2 · 2 = 2³ = 8 különböző kimenetel.',
        breakdown: [
          { label: 'Képlet', value: '2 · 2 · 2' },
          { label: 'Eredmény', value: '8 eset' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Egy fagyizóban 4 féle íz és 2 féle tölcsér (sima és édes) van. Hányféle 1 gombócos fagylaltot kérhetünk?',
        highlightValue: '4 íz és 2 tölcsér',
        questionTypeBadge: 'Fagylalt rendelés',
        options: ['8', '6', '12', '16'],
        correctAnswer: '8',
        explanation: '4 fagylaltíz · 2 féle tölcsér = 8 különböző fagylalt kérhető.',
        breakdown: [
          { label: 'Ízek', value: '4 lehetőség' },
          { label: 'Tölcsérek', value: '2 lehetőség' },
          { label: 'Összesen', value: '4 · 2 = 8 variáció' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Hányféleképpen választhatunk ki 1 pár cipőt, ha 3 pár cipőnk van a cipősszekrényben?',
        highlightValue: '3 pár cipőből 1',
        questionTypeBadge: 'Egyetlen választás',
        options: ['3', '6', '9', '1'],
        correctAnswer: '3',
        explanation: 'A 3 pár cipő közül pontosan 3 különböző módon választhatunk ki egyet.',
        breakdown: [
          { label: 'Választási lehetőségek', value: '3 db' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Két kockadobás, többjegyű számok és összetett szettek',
    range: 'Összetett esetszámítások és feltételes feladatok',
    focus: '2 kocka 36 esete, számképzés ismétlődéssel és anélkül, 0 szerepe a számoknál',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hány különböző kimenetele lehet 2 darab szabályos dobókocka egyidejű feldobásának?',
        highlightValue: '2 dobókocka',
        questionTypeBadge: 'Két kockadobás',
        options: ['36', '12', '18', '24'],
        correctAnswer: '36',
        explanation: 'Az 1. kocka 6-féle, a 2. kocka 6-féle értéket vehet fel: 6 · 6 = 36 lehetséges számpár.',
        breakdown: [
          { label: '1. kocka', value: '6 lehetőség' },
          { label: '2. kocka', value: '6 lehetőség' },
          { label: 'Összes kimenetel', value: '6 · 6 = 36 eset' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Hány különböző háromjegyű szám készíthető az 1, 2, 3 számjegyekből, ha mindegyik számjegyet pontosan egyszer használjuk fel?',
        highlightValue: '1, 2, 3 (nem ismétlődő)',
        questionTypeBadge: 'Számképzés ismétlés nélkül',
        options: ['6', '9', '27', '12'],
        correctAnswer: '6',
        explanation: 'Százasok helyére 3, tízesek helyére 2, egyesek helyére 1 számjegy mehet: 3 · 2 · 1 = 6 szám (123, 132, 213, 231, 312, 321).',
        breakdown: [
          { label: 'Százasok', value: '3 lehetőség' },
          { label: 'Tízesek', value: '2 lehetőség' },
          { label: 'Egyesek', value: '1 lehetőség (3 · 2 · 1 = 6)' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hány különböző háromjegyű szám készíthető az 1, 2, 3 számjegyekből, ha a számjegyek ISMÉTLŐDHETNEK is?',
        highlightValue: '1, 2, 3 (ismétlődhet)',
        questionTypeBadge: 'Számképzés ismétléssel',
        options: ['27', '9', '6', '18'],
        correctAnswer: '27',
        explanation: 'Minden helyiértékre 3-féle számjegy kerülhet: 3 · 3 · 3 = 3³ = 27 különböző háromjegyű szám.',
        breakdown: [
          { label: 'Minden helyiérték', value: '3 · 3 · 3' },
          { label: 'Összesen', value: '27 szám' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hányféleképpen ülhet le 4 gyerek egy padba egymás mellé 4 helyre?',
        highlightValue: '4 gyerek 4 székre',
        questionTypeBadge: 'Sorbaállítás 4 elemre',
        options: ['24', '16', '12', '48'],
        correctAnswer: '24',
        explanation: 'Az 1. helyre 4, a 2. helyre 3, a 3. helyre 2, a 4. helyre 1 gyerek ülhet: 4 · 3 · 2 · 1 = 24 különböző ülésrend.',
        breakdown: [
          { label: 'Szorzás', value: '4 · 3 · 2 · 1' },
          { label: 'Eredmény', value: '24 sorrend' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Hány olyan kétjegyű szám van, amelynek mindkét számjegye páratlan? (1, 3, 5, 7, 9)',
        highlightValue: 'Páratlan kétjegyűek',
        questionTypeBadge: 'Kétjegyű számok feltétellel',
        options: ['25', '20', '10', '50'],
        correctAnswer: '25',
        explanation: '5 páratlan számjegy van. A tízes helyre 5-féle, az egyes helyre is 5-féle kerülhet: 5 · 5 = 25 szám.',
        breakdown: [
          { label: 'Tízes hely', value: '5 lehetőség (1,3,5,7,9)' },
          { label: 'Egyes hely', value: '5 lehetőség (1,3,5,7,9)' },
          { label: 'Szorzat', value: '5 · 5 = 25 szám' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hány különböző 3-jegyű szám alkotható a 0, 4, 7 számkártyákból, ha minden kártyát csak egyszer használunk fel?',
        highlightValue: '0, 4, 7 kártyák',
        questionTypeBadge: 'Számképzés 0-val',
        options: ['4', '6', '3', '2'],
        correctAnswer: '4',
        explanation: 'A kezdőjegy nem lehet 0 (csak 4 vagy 7 -> 2 lehetőség). A 2. helyre 2, a 3. helyre 1 kártya: 2 · 2 · 1 = 4 szám (407, 470, 704, 740).',
        breakdown: [
          { label: '1. jegy (nem 0)', value: '2 lehetőség (4, 7)' },
          { label: '2. jegy', value: '2 lehetőség' },
          { label: '3. jegy', value: '1 lehetőség (2 · 2 · 1 = 4)' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Péternek 3 nadrágja, 4 inge és 2 zakója van. Hányféleképpen öltözhet fel úgy, hogy mindegyikből 1 darabot visel?',
        highlightValue: '3 nadrág, 4 ing, 2 zakó',
        questionTypeBadge: 'Háromszoros kombináció',
        options: ['24', '9', '18', '36'],
        correctAnswer: '24',
        explanation: 'A szorzási szabály szerint: 3 nadrág · 4 ing · 2 zakó = 24 különböző öltözék.',
        breakdown: [
          { label: 'Számolás', value: '3 · 4 · 2' },
          { label: 'Összesen', value: '24 szett' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Hány olyan eset van 2 dobókocka feldobásakor, amikor a dobott számok összege pontosan 7?',
        highlightValue: 'Összeg = 7 két kockánál',
        questionTypeBadge: 'Kedvező esetek',
        options: ['6', '5', '7', '4'],
        correctAnswer: '6',
        explanation: 'A lehetséges dobáspárok: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> pontosan 6 eset.',
        breakdown: [
          { label: 'Párok', value: '(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)' },
          { label: 'Darabszám', value: '6 eset' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Egy futóverseny döntőjében 5 futó indul. Hányféleképpen alakulhat az első két helyezett (arany és ezüstérem)?',
        highlightValue: '5 futóból 1. és 2. hely',
        questionTypeBadge: 'Részleges sorrend',
        options: ['20', '10', '25', '120'],
        correctAnswer: '20',
        explanation: 'Az aranyérmes 5 futó közül kerül ki, az ezüstérmes a maradék 4 futó közül: 5 · 4 = 20 lehetőség.',
        breakdown: [
          { label: '1. hely', value: '5 lehetőség' },
          { label: '2. hely', value: '4 lehetőség' },
          { label: 'Összesen', value: '5 · 4 = 20 lehetőség' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy menüben 3 féle leves, 4 féle főétel és 3 féle desszert szerepel. Hányféle 3-fogásos ebéd állítható össze?',
        highlightValue: '3 leves, 4 főétel, 3 desszert',
        questionTypeBadge: 'Háromfogásos menü',
        options: ['36', '10', '24', '48'],
        correctAnswer: '36',
        explanation: '3 leves · 4 főétel · 3 desszert = 36 különböző háromfogásos menü.',
        breakdown: [
          { label: 'Szorzás', value: '3 · 4 · 3' },
          { label: 'Eredmény', value: '36 menü' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy esetszámok, permutációk, PIN-kódok és kézfogási tételek',
    range: 'Haladó kombinatorikai összefüggések és megszorításos feladványok',
    focus: '5 elem sorrendje (120), 4-jegyű kódok, páros/páratlan feltételek, kézfogások száma',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Hányféleképpen állhat sorba a pénztárnál 5 vásárló?',
        highlightValue: '5 ember sorbaállása',
        questionTypeBadge: '5 elem permutációja',
        options: ['120', '24', '60', '720'],
        correctAnswer: '120',
        explanation: '5 · 4 · 3 · 2 · 1 = 120 különböző sorrend lehetséges.',
        breakdown: [
          { label: 'Képlet', value: '5 · 4 · 3 · 2 · 1' },
          { label: 'Eredmény', value: '120 sorrend' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Hány különböző 4-jegyű PIN kód hozható létre a 0-9 számjegyekből (ismétlődéssel, pl. 0000-tól 9999-ig)?',
        highlightValue: '4-jegyű PIN kód',
        questionTypeBadge: 'PIN kódok',
        options: ['10 000', '9 000', '5 040', '1 000'],
        correctAnswer: '10 000',
        explanation: 'Mind a 4 pozícióra 10-féle számjegy mehet (0..9): 10 · 10 · 10 · 10 = 10⁴ = 10 000 kód.',
        breakdown: [
          { label: 'Minden pozíció', value: '10 lehetőség' },
          { label: 'Szorzat', value: '10⁴ = 10 000 kód' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Hány különböző 4-jegyű szám képezhető a 0, 1, 2, 3 számkártyákból, ha minden számkártyát pontosan egyszer használunk fel?',
        highlightValue: '0, 1, 2, 3 kártyák (4-jegyű)',
        questionTypeBadge: '4-jegyű szám 0-val',
        options: ['18', '24', '12', '6'],
        correctAnswer: '18',
        explanation: 'Az 1. helyre nem kerülhet 0 (3 lehetőség: 1,2,3). A 2. helyre 3, a 3. helyre 2, a 4. helyre 1: 3 · 3 · 2 · 1 = 18 szám.',
        breakdown: [
          { label: '1. hely (nem 0)', value: '3 lehetőség' },
          { label: '2. hely', value: '3 lehetőség' },
          { label: '3-4. hely', value: '2 · 1 = 2 (3 · 3 · 2 = 18)' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Hány különböző 3-jegyű PÁROS szám készíthető az 1, 2, 3, 4 számjegyekből, ha a számjegyek nem ismétlődhetnek?',
        highlightValue: '3-jegyű páros számok 1,2,3,4-ből',
        questionTypeBadge: 'Páros számképzés feltétellel',
        options: ['12', '24', '6', '18'],
        correctAnswer: '12',
        explanation: 'A páros számok utolsó jegye 2 vagy 4 lehet (2 lehetőség). A maradék 3 számból az első két helyre 3 · 2 = 6 féleképpen választhatunk: 6 · 2 = 12 szám.',
        breakdown: [
          { label: 'Utolsó jegy', value: '2 lehetőség (2 vagy 4)' },
          { label: 'Első két jegy', value: '3 · 2 = 6 lehetőség' },
          { label: 'Összesen', value: '6 · 2 = 12 páros szám' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Hány különböző kimenetele lehet 3 szabályos dobókocka egyszerre történő feldobásának?',
        highlightValue: '3 dobókocka',
        questionTypeBadge: 'Három kockadobás',
        options: ['216', '36', '18', '108'],
        correctAnswer: '216',
        explanation: 'Mindhárom kocka 6-féle értéket vehet fel: 6 · 6 · 6 = 6³ = 216 kimenetel.',
        breakdown: [
          { label: 'Számolás', value: '6 · 6 · 6 = 6³' },
          { label: 'Eredmény', value: '216 kimenetel' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Egy 6 fős baráti társaságban mindenki mindenkivel pontosan egyszer kezet fog. Hány kézfogás történik összesen?',
        highlightValue: '6 ember kézfogásai',
        questionTypeBadge: 'Kézfogási feladat',
        options: ['15', '30', '36', '12'],
        correctAnswer: '15',
        explanation: 'Mindenki a másik 5 emberrel fog kezet: 6 · 5 = 30. Mivel minden kézfogást kétszer számoltunk, osztunk 2-vel: 30 : 2 = 15 kézfogás.',
        breakdown: [
          { label: 'Képlet', value: '(n · (n-1)) / 2' },
          { label: 'Számolás', value: '(6 · 5) / 2 = 15 kézfogás' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Hányféleképpen választhatunk ki egy elnököt és egy titkárt egy 7 fős diákönkormányzati csoportból?',
        highlightValue: '7 főből elnök és titkár',
        questionTypeBadge: 'Tisztségek választása',
        options: ['42', '21', '49', '14'],
        correctAnswer: '42',
        explanation: 'Az elnök 7 ember közül kerül ki, a titkár a maradék 6 ember közül: 7 · 6 = 42 lehetőség.',
        breakdown: [
          { label: 'Elnök', value: '7 lehetőség' },
          { label: 'Titkár', value: '6 lehetőség' },
          { label: 'Szorzat', value: '7 · 6 = 42 lehetőség' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Hány olyan 3-jegyű szám van, amely 5-tel osztható és a számjegyei az 1, 2, 3, 4, 5 halmazból valók (ismétlődés nélkül)?',
        highlightValue: '5-tel osztható 3-jegyűek',
        questionTypeBadge: 'Oszthatóság és kombinatorika',
        options: ['12', '24', '6', '20'],
        correctAnswer: '12',
        explanation: 'Az 5-tel oszthatóság miatt az utolsó jegy csak 5 lehet (1 lehetőség). Az első két helyre a maradék 4 számból 4 · 3 = 12 lehetőség van: 12 · 1 = 12 szám.',
        breakdown: [
          { label: 'Utolsó jegy (5)', value: '1 lehetőség' },
          { label: 'Első két jegy', value: '4 · 3 = 12 lehetőség' },
          { label: 'Összesen', value: '12 szám' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Hány különböző kimenetele lehet 5 pénzérme feldobásának?',
        highlightValue: '5 érmedobás',
        questionTypeBadge: 'Öt érme',
        options: ['32', '25', '64', '10'],
        correctAnswer: '32',
        explanation: 'Mind az 5 érme 2-féle állapotban lehet: 2 · 2 · 2 · 2 · 2 = 2⁵ = 32 eset.',
        breakdown: [
          { label: 'Képlet', value: '2⁵' },
          { label: 'Eredmény', value: '32 eset' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy biztonsági lakat 3 tárcsás, mindegyik tárcsán 0-tól 9-ig szerepelnek számok. Hány különböző kódot lehet beállítani a lakaton?',
        highlightValue: '3 tárcsás számzár',
        questionTypeBadge: 'Számzáras lakat',
        options: ['1000', '720', '900', '500'],
        correctAnswer: '1000',
        explanation: 'Mindhárom tárcsán 10-féle számjegy (0..9) állítható be: 10 · 10 · 10 = 1000 különböző kód (000-tól 999-ig).',
        breakdown: [
          { label: 'Tárcsánként', value: '10 lehetőség' },
          { label: 'Szorzat', value: '10 · 10 · 10 = 1000 kód' }
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
      <CountingPossibilitiesMatcher
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  },
  {
    id: 'sorter',
    title: 'Csoportosító',
    subtitle: 'Húzd a helyére (3 csoport)',
    badgeText: '10 Elem (3 csoport)',
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <CountingPossibilitiesSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function CountingPossibilitiesQuiz({ onBack }: CountingPossibilitiesQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🎲"
      topicBadge="🎲 6. Osztály • I. Egész számok"
      title="Hány eset van? Kvíz"
      subtitle="Teszteld a tudásod a fastruktúráról, a szorzási szabályról és a rendszerezett összeszámolásról 3 szinten!"
      cheatSheetTitle="Kombinatorikai és összeszámolási szabályok"
      hintText="💡 Döntési lépéseknél szorozd össze a lehetőségek számát: n₁ · n₂ · n₃!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="amber"
    />
  );
}
