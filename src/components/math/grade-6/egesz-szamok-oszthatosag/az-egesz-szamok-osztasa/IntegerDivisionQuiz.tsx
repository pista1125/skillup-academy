import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { IntegerDivisionMatcher } from './IntegerDivisionMatcher';
import { IntegerDivisionSorter } from './IntegerDivisionSorter';

export interface IntegerDivisionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Azonos előjelek hányadosa (+)',
    formula: '(+) : (+) = +  |  (-) : (-) = +',
    note: 'Két azonos előjelű szám hányadosa mindig pozitív! Két negatív szám osztásakor az eredmény pozitív.'
  },
  {
    topic: 'Különböző előjelek hányadosa (-)',
    formula: '(+) : (-) = -  |  (-) : (+) = -',
    note: 'Egy pozitív és egy negatív szám hányadosa mindig negatív szám lesz.'
  },
  {
    topic: 'Nulla osztása (0 : a)',
    formula: '0 : a = 0 (ha a ≠ 0)',
    note: 'A nullát bármilyen nem nulla számmal osztva a hányados pontosan 0.'
  },
  {
    topic: 'Nullával való osztás (a : 0)',
    formula: 'a : 0 = TILOS! ⚠️',
    note: 'Nullával való osztás a matematikában nem értelmezhető, nincs ilyen művelet!'
  },
  {
    topic: 'Osztás 1-gyel és (-1)-gyel',
    formula: 'a : 1 = a  |  a : (-1) = -a',
    note: '1-gyel osztva változatlan marad, (-1)-gyel osztva az ellentettjére változik.'
  },
  {
    topic: 'Műveleti sorrend több osztásnál',
    formula: 'a : b : c = (a : b) : c',
    note: 'Egymást követő osztásoknál balról jobbra haladunk (nem felcserélhető és nem zárójelezhető át tetszőlegesen).'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Előjeles alaposztások, a nulla és az egyes szerepe',
    range: 'Egyszerű osztási műveletek a 100-as számkörben',
    focus: 'Előjelszabályok, 0 osztása, 0-val való osztás tilalma, osztás 1-gyel és -1-gyel',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a (-24) : (+6) művelet eredménye?',
        highlightValue: '(-24) : (+6)',
        questionTypeBadge: 'Különböző előjelű osztás',
        options: ['-4', '+4', '-18', '+18'],
        correctAnswer: '-4',
        explanation: 'Különböző előjelű számok hányadosa mindig NEGATÍV: 24 : 6 = 4, elé mínusz jelet teszünk: -4.',
        breakdown: [
          { label: 'Előjelek', value: '(-) : (+) = (-)' },
          { label: 'Hányados', value: '-(24 : 6) = -4' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a (-35) : (-7) művelet eredménye?',
        highlightValue: '(-35) : (-7)',
        questionTypeBadge: 'Két negatív szám osztása',
        options: ['+5', '-5', '+42', '-42'],
        correctAnswer: '+5',
        explanation: 'Két negatív szám hányadosa MINDIG POZITÍV: a mínusz jelek kiejtik egymást: 35 : 7 = +5.',
        breakdown: [
          { label: 'Előjelek', value: '(-) : (-) = (+)' },
          { label: 'Hányados', value: '35 : 7 = +5' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a (+48) : (-8) hányados értéke?',
        highlightValue: '(+48) : (-8)',
        questionTypeBadge: 'Pozitív : Negatív',
        options: ['-6', '+6', '-40', '+56'],
        correctAnswer: '-6',
        explanation: '(+) : (-) = (-), azaz 48 : 8 = 6, negatív előjellel: -6.',
        breakdown: [
          { label: 'Előjelek', value: '(+) : (-) = (-)' },
          { label: 'Hányados', value: '-(48 : 8) = -6' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mi az eredménye a 0 : (-9) osztásnak?',
        highlightValue: '0 : (-9)',
        questionTypeBadge: 'Nulla osztása',
        options: ['0', '-9', '+9', 'Nem értelmezhető'],
        correctAnswer: '0',
        explanation: 'A nulla bármilyen nem nulla számmal osztva mindig pontosan 0 (mert 0 · (-9) = 0).',
        breakdown: [
          { label: 'Szabály', value: '0 : a = 0 (ha a ≠ 0)' },
          { label: 'Ellenőrzés', value: '0 · (-9) = 0' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mi az eredménye a (-14) : 0 osztásnak?',
        highlightValue: '(-14) : 0',
        questionTypeBadge: 'Nullával való osztás',
        options: ['Nem értelmezhető (0-val nem osztunk)', '0', '-14', '+14'],
        correctAnswer: 'Nem értelmezhető (0-val nem osztunk)',
        explanation: 'Nullával (0) való osztás a matematikában NEM ÉRTELMEZHETŐ, szigorúan tilos művelet!',
        breakdown: [
          { label: 'Aranyszabály', value: 'Nullával nem osztunk!' },
          { label: 'Eredmény', value: 'Nincs értelmezve' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a (-52) : (-1) művelet eredménye?',
        highlightValue: '(-52) : (-1)',
        questionTypeBadge: 'Osztás (-1)-gyel',
        options: ['+52', '-52', '+51', '-53'],
        correctAnswer: '+52',
        explanation: '(-1)-gyel osztva a szám az ellentettjére változik: (-52) : (-1) = +52.',
        breakdown: [
          { label: 'Szabály', value: 'a : (-1) = -a' },
          { label: 'Hányados', value: '-(-52) = +52' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a (-63) : (+1) művelet eredménye?',
        highlightValue: '(-63) : (+1)',
        questionTypeBadge: 'Osztás (+1)-gyel',
        options: ['-63', '+63', '-62', '0'],
        correctAnswer: '-63',
        explanation: '1-gyel osztva bármely szám értéke és előjele változatlan marad: (-63) : 1 = -63.',
        breakdown: [
          { label: 'Szabály', value: 'a : 1 = a' },
          { label: 'Hányados', value: '-63' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Ha egy negatív egész számot elosztunk egy másik negatív számmal, milyen előjelű lesz a hányados?',
        highlightValue: '(-) : (-) = ?',
        questionTypeBadge: 'Előjelszabály',
        options: ['Mindig pozitív (+)', 'Mindig negatív (-)', 'Attól függ, melyik a nagyobb', 'Mindig nulla'],
        correctAnswer: 'Mindig pozitív (+)',
        explanation: '(-) : (-) = (+), két negatív szám osztásakor az eredmény mindig szigorúan pozitív.',
        breakdown: [
          { label: 'Szabály', value: 'Azonos előjelek hányadosa pozitív' },
          { label: 'Példa', value: '(-10) : (-2) = +5' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik szám hiányzik az egyenlőségből: ... : (-4) = +8 ?',
        highlightValue: '... : (-4) = +8',
        questionTypeBadge: 'Hiányzó osztandó',
        options: ['-32', '+32', '-2', '+2'],
        correctAnswer: '-32',
        explanation: 'Az osztandót úgy kapjuk meg, hogy a hányadost megszorozzuk az osztóval: (+8) · (-4) = -32.',
        breakdown: [
          { label: 'Inverz művelet', value: 'Osztandó = Hányados · Osztó' },
          { label: 'Számolás', value: '8 · (-4) = -32' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a (-100) : (+10) művelet eredménye?',
        highlightValue: '(-100) : (+10)',
        questionTypeBadge: 'Osztás 10-zel',
        options: ['-10', '+10', '-1000', '+1000'],
        correctAnswer: '-10',
        explanation: '100 : 10 = 10, az előjelek különböznek, így a végeredmény: -10.',
        breakdown: [
          { label: 'Előjelek', value: '(-) : (+) = (-)' },
          { label: 'Hányados', value: '-(100 : 10) = -10' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Többlépéses osztások, zárójelek és műveleti sorrend',
    range: 'Összetett kifejezések és műveleti sorrend feladatok',
    focus: 'Balról jobbra haladás több osztásnál, szögletes zárójelek, törtvonal mint osztásjel',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a (-72) : (-8) : (+3) műveletsor eredménye?',
        highlightValue: '(-72) : (-8) : (+3)',
        questionTypeBadge: 'Több osztás balról jobbra',
        options: ['+3', '-3', '+27', '-27'],
        correctAnswer: '+3',
        explanation: 'Balról jobbra haladunk: (-72) : (-8) = +9, majd (+9) : (+3) = +3.',
        breakdown: [
          { label: '1. lépés', value: '(-72) : (-8) = +9' },
          { label: '2. lépés', value: '(+9) : (+3) = +3' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a [(-30) + (-15)] : (-9) kifejezés értéke?',
        highlightValue: '[(-30) + (-15)] : (-9)',
        questionTypeBadge: 'Zárójeles összeadás osztása',
        options: ['+5', '-5', '+45', '-45'],
        correctAnswer: '+5',
        explanation: 'Először a zárójelben lévő összeadást végezzük el: (-30) + (-15) = -45. Ezután: (-45) : (-9) = +5.',
        breakdown: [
          { label: 'Zárójel', value: '(-30) + (-15) = -45' },
          { label: 'Osztás', value: '(-45) : (-9) = +5' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Számítsd ki: (-40) : [(-2) · (+5)] !',
        highlightValue: '(-40) : [(-2) · (+5)]',
        questionTypeBadge: 'Osztás szorzattal',
        options: ['+4', '-4', '+40', '-10'],
        correctAnswer: '+4',
        explanation: 'Először a szögletes zárójelbeli szorzást végezzük el: (-2) · 5 = -10. Majd: (-40) : (-10) = +4.',
        breakdown: [
          { label: 'Zárójel', value: '(-2) · 5 = -10' },
          { label: 'Osztás', value: '(-40) : (-10) = +4' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Számítsd ki a műveleti sorrend szabályai szerint: 50 - (-24) : (+4) !',
        highlightValue: '50 - (-24) : (+4)',
        questionTypeBadge: 'Kivonás és osztás',
        options: ['56', '44', '-56', '18'],
        correctAnswer: '56',
        explanation: 'Először az osztást végezzük el: (-24) : (+4) = -6. Majd a kivonást: 50 - (-6) = 50 + 6 = 56.',
        breakdown: [
          { label: '1. Osztás', value: '(-24) : 4 = -6' },
          { label: '2. Kivonás', value: '50 - (-6) = 56' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Melyik művelet eredménye a LEGNAGYOBB szám?',
        highlightValue: 'Melyik a legnagyobb?',
        questionTypeBadge: 'Értékek összehasonlítása',
        options: ['(-48) : (-6)', '(-48) : (+6)', '(+48) : (-6)', '(-48) : (+12)'],
        correctAnswer: '(-48) : (-6)',
        explanation: '(-48) : (-6) = +8, míg a többi negatív eredményt ad (-8, -8, -4). A legnagyobb a +8.',
        breakdown: [
          { label: '(-48) : (-6)', value: '+8 (egyetlen pozitív)' },
          { label: 'A többi', value: '-8, -8, -4' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Számítsd ki a tört értékét: (-60) / [(-3) · (-4)] !',
        highlightValue: '(-60) / [(-3) · (-4)]',
        questionTypeBadge: 'Törtvonal mint osztás',
        options: ['-5', '+5', '-20', '+20'],
        correctAnswer: '-5',
        explanation: 'A nevező: (-3) · (-4) = +12. A számláló osztva a nevezővel: (-60) : (+12) = -5.',
        breakdown: [
          { label: 'Nevező', value: '(-3) · (-4) = +12' },
          { label: 'Tört', value: '(-60) : 12 = -5' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Egy magas hegycsúcson 6 óra alatt a hőmérséklet 18 °C-kal csökkent egyenletesen. Óránként átlagosan hány fokkal változott a hőmérséklet?',
        highlightValue: '18 °C csökkenés 6 óra alatt',
        questionTypeBadge: 'Szöveges feladat',
        options: ['-3 °C/óra', '+3 °C/óra', '-12 °C/óra', '-108 °C/óra'],
        correctAnswer: '-3 °C/óra',
        explanation: 'A csökkenés előjeles értéke -18 °C. Az óránkénti változás: (-18) : 6 = -3 °C óránként.',
        breakdown: [
          { label: 'Összváltozás', value: '-18 °C' },
          { label: 'Óránkénti arány', value: '(-18) : 6 = -3 °C/óra' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Melyik szám teszi igazzá az egyenlőséget: (-45) : ... = -9 ?',
        highlightValue: '(-45) : ... = -9',
        questionTypeBadge: 'Hiányzó osztó',
        options: ['+5', '-5', '+9', '-405'],
        correctAnswer: '+5',
        explanation: 'Az osztót úgy kapjuk meg, hogy az osztandót elosztjuk a hányadossal: (-45) : (-9) = +5.',
        breakdown: [
          { label: 'Szabály', value: 'Osztó = Osztandó : Hányados' },
          { label: 'Számolás', value: '(-45) : (-9) = +5' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Számítsd ki: (-18) : (+2) - (-12) : (-4) !',
        highlightValue: '(-18) : (+2) - (-12) : (-4)',
        questionTypeBadge: 'Két osztás különbsége',
        options: ['-12', '-6', '+6', '+12'],
        correctAnswer: '-12',
        explanation: '1. osztás: (-18) : 2 = -9. 2. osztás: (-12) : (-4) = +3. Kivonás: (-9) - (+3) = -9 - 3 = -12.',
        breakdown: [
          { label: '1. tag', value: '(-18) : 2 = -9' },
          { label: '2. tag', value: '(-12) : (-4) = +3' },
          { label: 'Eredmény', value: '-9 - (+3) = -12' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mivel egyenlő: [(-4) · (-9)] : [(-2) · (+3)] ?',
        highlightValue: '[(-4) · (-9)] : [(-2) · (+3)]',
        questionTypeBadge: 'Két szorzat hányadosa',
        options: ['-6', '+6', '-12', '+12'],
        correctAnswer: '-6',
        explanation: 'Számláló / bal zárójel: (-4) · (-9) = +36. Nevező / jobb zárójel: (-2) · (+3) = -6. Osztás: (+36) : (-6) = -6.',
        breakdown: [
          { label: '1. szorzat', value: '(-4) · (-9) = +36' },
          { label: '2. szorzat', value: '(-2) · 3 = -6' },
          { label: 'Osztás', value: '(+36) : (-6) = -6' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Bonyolult műveleti láncok, algebrai kifejezések és logikai feladványok',
    range: 'Összetett zárójeles és hatványos műveletek egész számokkal',
    focus: 'Többszörös beágyazott zárójelek, hatványozás és osztás kapcsolata, algebrai azonosságok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a [(-100) : (-5)] : [(-8) + (+4)] kifejezés pontos értéke?',
        highlightValue: '[(-100) : (-5)] : [(-8) + (+4)]',
        questionTypeBadge: 'Összetett szögletes zárójelek',
        options: ['-5', '+5', '-20', '+20'],
        correctAnswer: '-5',
        explanation: 'Bal oldali rész: (-100) : (-5) = +20. Jobb oldali rész: (-8) + 4 = -4. Végső osztás: (+20) : (-4) = -5.',
        breakdown: [
          { label: 'Bal zárójel', value: '(-100) : (-5) = +20' },
          { label: 'Jobb zárójel', value: '(-8) + 4 = -4' },
          { label: 'Osztás', value: '20 : (-4) = -5' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Számítsd ki: 12 - [(-36) : (-6) - (-2) · (-4)] !',
        highlightValue: '12 - [(-36) : (-6) - (-2) · (-4)]',
        questionTypeBadge: 'Beágyazott műveletek',
        options: ['14', '10', '-14', '6'],
        correctAnswer: '14',
        explanation: 'Zárójelben: (-36):(-6) = 6 és (-2)·(-4) = 8. Ekkor: 6 - 8 = -2. Végső kivonás: 12 - (-2) = 12 + 2 = 14.',
        breakdown: [
          { label: 'Zárójelen belül', value: '6 - 8 = -2' },
          { label: 'Végső kivonás', value: '12 - (-2) = 14' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Számítsd ki a tört értékét: [(-25) · (-4) + (-20)] / [(-16) : (+2)] !',
        highlightValue: '[(-25) · (-4) + (-20)] / [(-16) : (+2)]',
        questionTypeBadge: 'Komplex törtes kifejezés',
        options: ['-10', '+10', '-8', '+8'],
        correctAnswer: '-10',
        explanation: 'Számláló: [100 + (-20)] = 80. Nevező: (-16) : 2 = -8. Eredmény: 80 : (-8) = -10.',
        breakdown: [
          { label: 'Számláló', value: '100 - 20 = 80' },
          { label: 'Nevező', value: '(-16) : 2 = -8' },
          { label: 'Tört értéke', value: '80 : (-8) = -10' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Ha a = -12, b = +3, c = -2, mennyi a (a : b) · c - (a : c) : b értéke?',
        highlightValue: '(a : b) · c - (a : c) : b',
        questionTypeBadge: 'Algebrai behelyettesítés',
        options: ['+6', '-6', '+10', '-10'],
        correctAnswer: '+6',
        explanation: 'a : b = (-12):3 = -4 -> (-4)·(-2) = +8. Másik tag: a : c = (-12):(-2) = +6 -> (+6):3 = +2. Eredmény: 8 - 2 = +6.',
        breakdown: [
          { label: '1. tag', value: '(-4) · (-2) = +8' },
          { label: '2. tag', value: '(+6) : 3 = +2' },
          { label: 'Különbség', value: '8 - 2 = +6' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik állítás IGAZ minden nem nulla a és b egész számra?',
        highlightValue: 'Melyik összefüggés helyes?',
        questionTypeBadge: 'Elméleti azonosságok',
        options: ['(-a) : (-b) = a : b', 'a : b = b : a', '(a : b) : c = a : (b : c)', 'a : 0 = 0'],
        correctAnswer: '(-a) : (-b) = a : b',
        explanation: 'Két negatív szám hányadosa megegyezik a nekik megfelelő pozitív számok hányadosával: (-a) : (-b) = a : b.',
        breakdown: [
          { label: 'Helyes azonosság', value: '(-a) : (-b) = +(a : b) = a : b' },
          { label: 'A többi hamis', value: 'Osztás nem kommutatív, 0-val nem osztunk' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik szám hiányzik az egyenletből: [(-60) + (...)] : (-7) = +10 ?',
        highlightValue: '[(-60) + (...)] : (-7) = +10',
        questionTypeBadge: 'Egyenlet típusú feladvány',
        options: ['-10', '+10', '-70', '+70'],
        correctAnswer: '-10',
        explanation: 'A szögletes zárójel értéke (+10) · (-7) = -70 kell legyen. (-60) + (...) = -70, tehát a hiányzó szám: -10.',
        breakdown: [
          { label: 'Zárójel értéke', value: '10 · (-7) = -70' },
          { label: 'Hiányzó tag', value: '-70 - (-60) = -10' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Számítsd ki hatványozással kombinálva: [(-2)^4 : (-8)] - [(-3)^3 : (+9)] !',
        highlightValue: '[(-2)^4 : (-8)] - [(-3)^3 : (+9)]',
        questionTypeBadge: 'Hatványozás és osztás',
        options: ['+1', '-1', '+5', '-5'],
        correctAnswer: '+1',
        explanation: '(-2)^4 = +16 -> 16 : (-8) = -2. (-3)^3 = -27 -> (-27) : 9 = -3. Eredmény: (-2) - (-3) = -2 + 3 = +1.',
        breakdown: [
          { label: '1. tag', value: '16 : (-8) = -2' },
          { label: '2. tag', value: '-27 : 9 = -3' },
          { label: 'Kivonás', value: '-2 - (-3) = +1' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Három egymást követő egész szám összege -18. Mennyi e három szám közül a legnagyobb és a legkisebb hányadosa?',
        highlightValue: 'Három egymást követő szám',
        questionTypeBadge: 'Logikai feladvány',
        options: ['+5/7 (azaz -5 : -7)', '-1', '+1', '-5/7'],
        correctAnswer: '+5/7 (azaz -5 : -7)',
        explanation: 'A három egymást követő szám: -7, -6, -5 (összegük -18). A legnagyobb a -5, legkisebb a -7, hányadosuk: (-5) : (-7) = +5/7.',
        breakdown: [
          { label: 'Számok', value: '-7, -6, -5 (összeg: -18)' },
          { label: 'Legnagyobb / Legkisebb', value: '(-5) : (-7) = +5/7' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Számítsd ki: (-120) : (-2) : (-3) : (-4) : (-5) !',
        highlightValue: '(-120) : (-2) : (-3) : (-4) : (-5)',
        questionTypeBadge: 'Öt tagú osztási lánc',
        options: ['-1', '+1', '-120', '+120'],
        correctAnswer: '-1',
        explanation: 'Balról jobbra: (-120):(-2)=+60, (+60):(-3)=-20, (-20):(-4)=+5, (+5):(-5)=-1.',
        breakdown: [
          { label: '1-2. lépés', value: '60 : (-3) = -20' },
          { label: '3-4. lépés', value: '-20 : (-4) = 5 -> 5 : (-5) = -1' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Ha x : (-6) = y és y : (-2) = -8, akkor mennyi az eredeti x értéke?',
        highlightValue: 'x : (-6) = y és y : (-2) = -8',
        questionTypeBadge: 'Lépcsős egyenletrendszer',
        options: ['-96', '+96', '-24', '+24'],
        correctAnswer: '-96',
        explanation: 'Visszafelé számolva: y = (-8) · (-2) = +16. Ekkor x = (+16) · (-6) = -96.',
        breakdown: [
          { label: 'y kiszámítása', value: '(-8) · (-2) = +16' },
          { label: 'x kiszámítása', value: '16 · (-6) = -96' }
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
    icon: <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <IntegerDivisionMatcher
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
      <IntegerDivisionSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function IntegerDivisionQuiz({ onBack }: IntegerDivisionQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="➗"
      topicBadge="➗ 6. Osztály • I. Egész számok"
      title="Az egész számok osztása kvíz"
      subtitle="Teszteld a tudásod az osztási előjelszabályokról, a nullával való osztás tilalmáról és az összetett műveleti sorrendről 3 szinten!"
      cheatSheetTitle="Egész számok osztási szabályai"
      hintText="💡 Két azonos előjel hányadosa POZITÍV, két különböző előjel hányadosa NEGATÍV, 0-val osztani TILOS!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="violet"
    />
  );
}
