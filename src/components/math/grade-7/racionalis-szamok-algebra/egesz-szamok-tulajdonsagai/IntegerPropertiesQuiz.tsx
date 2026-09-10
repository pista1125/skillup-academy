import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { IntegerPropertiesMatcher } from './IntegerPropertiesMatcher';
import { IntegerPropertiesSorter } from './IntegerPropertiesSorter';
import {
  Sparkles,
  Layers,
  Scale,
  Calculator,
  Zap,
  LayoutGrid,
  ArrowRightLeft,
  Binary
} from 'lucide-react';

interface IntegerPropertiesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Z számhalmaz',
    icon: <Binary className="w-4 h-4 text-purple-600" />,
    formula: 'Z = Z- ∪ {0} ∪ Z+',
    note: 'N = {0, 1, 2, ...} része Z-nek. A számegyenesen a negatívak balra, a pozitívak jobbra vannak.'
  },
  {
    id: 'c2',
    title: 'Ellentett szám',
    icon: <Scale className="w-4 h-4 text-indigo-600" />,
    formula: 'a + (-a) = 0,  -(-a) = a',
    note: 'A nullától azonos távolságra, de ellentétes irányban lévő szám. A 0 ellentettje önmaga (0).'
  },
  {
    id: 'c3',
    title: 'Abszolútérték',
    icon: <Sparkles className="w-4 h-4 text-blue-600" />,
    formula: '|a| ≥ 0,  |-a| = |a|',
    note: 'A szám távolsága a 0-tól. Távolság sosem negatív: |5| = 5, |-5| = 5, |0| = 0.'
  },
  {
    id: 'c4',
    title: 'Összeadás és kivonás',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: 'a - b = a + (-b)',
    note: 'Zárójelek: +(+) = +, +(-) = -, -(+) = -, -(-) = +.'
  },
  {
    id: 'c5',
    title: 'Szorzás és osztás',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: '(+)·(+) = +, (-)·(-) = +, (+)·(-) = -',
    note: 'Páros sok negatív tényező szorzata POZITÍV, páratlan sok negatívé NEGATÍV. Nullával nem osztunk!'
  },
  {
    id: 'c6',
    title: 'Műveleti tulajdonságok',
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
    formula: 'a·(b+c) = a·b + a·c',
    note: 'Kommutativitás (a+b=b+a, a·b=b·a), Asszociativitás ((a+b)+c=a+(b+c)), Disztributivitás (széttagolás).'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Számegyenes',
    subtitle: 'A Z halmaz, ellentett szám, abszolútérték és összehasonlítások',
    range: '1 - 10. feladat',
    focus: 'Halmazok & Abszolútérték',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Melyik szám a -14 ellentettje?',
        highlightValue: '-14',
        questionTypeBadge: 'Ellentett',
        options: ['+14', '-14', '0', '1/14'],
        correctAnswer: '+14',
        explanation: 'Egy szám ellentettje a számegyenesen a 0-tól azonos távolságra, de ellentétes irányban lévő szám. A -14 ellentettje a +14 (mivel -14 + (+14) = 0).',
        breakdown: [
          { label: 'Eredeti szám', value: '-14' },
          { label: 'Szabály', value: '-(-a) = +a' },
          { label: 'Ellentett', value: '+14' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Mennyi a |-28| abszolútértéke?',
        highlightValue: '|-28|',
        questionTypeBadge: 'Abszolútérték',
        options: ['28', '-28', '0', '-1'],
        correctAnswer: '28',
        explanation: 'Egy szám abszolútértéke a számnak a nullától való távolsága a számegyenesen, ami sosem lehet negatív. |-28| = 28.',
        breakdown: [
          { label: 'Kifejezés', value: '|-28|' },
          { label: 'Távolság a 0-tól', value: '28 egység' },
          { label: 'Eredmény', value: '28' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Melyik állítás IGAZ a természetes számok (N) és az egész számok (Z) viszonyára?',
        questionTypeBadge: 'Számhalmazok',
        options: [
          'Minden természetes szám egyben egész szám is (N ⊂ Z)',
          'Minden egész szám egyben természetes szám is (Z ⊂ N)',
          'A negatív számok is a természetes számok halmazába tartoznak',
          'A nulla nem tartozik sem N-hez, sem Z-hez'
        ],
        correctAnswer: 'Minden természetes szám egyben egész szám is (N ⊂ Z)',
        explanation: 'A természetes számok (0, 1, 2, 3, ...) mind a nemnegatív egész számok, ezért az N halmaz valódi része az egész számok Z halmazának (N ⊂ Z).',
        breakdown: [
          { label: 'N halmaz', value: '{0, 1, 2, 3, ...}' },
          { label: 'Z halmaz', value: '{..., -2, -1, 0, 1, 2, ...}' },
          { label: 'Kapcsolat', value: 'N részhalmaza Z-nek' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Melyik reláció a helyes a -9 és a -4 összehasonlítására?',
        highlightValue: '-9  ?  -4',
        questionTypeBadge: 'Rendezés',
        options: ['-9 < -4', '-9 > -4', '-9 = -4', '-9 ≥ -4'],
        correctAnswer: '-9 < -4',
        explanation: 'Két negatív szám közül az a nagyobb, amelyik közelebb van a 0-hoz (kisebb az abszolútértéke). A -4 jobbra helyezkedik el a számegyenesen a -9-hez képest, így -9 < -4.',
        breakdown: [
          { label: '|-9| és |-4|', value: '9 > 4' },
          { label: 'Számegyenes', value: '-9 balrább van, mint -4' },
          { label: 'Eredmény', value: '-9 < -4' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Mennyi a -(-(-7)) kifejezés pontos értéke?',
        highlightValue: '-(-(-7))',
        questionTypeBadge: 'Előjelek',
        options: ['-7', '+7', '0', '-14'],
        correctAnswer: '-7',
        explanation: 'Lépésenként felbontva: a legbelső -(-7) = +7. Ezután -(+7) = -7. Páratlan számú (3 db) negatív előjel eredménye negatív (-).',
        breakdown: [
          { label: '1. lépés', value: '-(-7) = +7' },
          { label: '2. lépés', value: '-(+7) = -7' },
          { label: 'Eredmény', value: '-7' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Mely számok kielégítik a |x| = 13 egyenletet az egész számok körében?',
        highlightValue: '|x| = 13',
        questionTypeBadge: 'Abszolútérték egyenlet',
        options: ['x = 13 és x = -13', 'Csak x = 13', 'Csak x = -13', 'Nincs ilyen egész szám'],
        correctAnswer: 'x = 13 és x = -13',
        explanation: 'A számegyenesen pontosan két olyan szám van, amelynek a nullától mért távolsága 13 egység: a +13 és a -13.',
        breakdown: [
          { label: 'Feltétel', value: 'Távolság a 0-tól = 13' },
          { label: 'Jobbra a 0-tól', value: '+13' },
          { label: 'Balra a 0-tól', value: '-13' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Mennyi a nulla (0) abszolútértéke és ellentettje?',
        highlightValue: '0',
        questionTypeBadge: 'Nulla tulajdonságai',
        options: [
          'Abszolútértéke 0, ellentettje 0',
          'Abszolútértéke +1, ellentettje -1',
          'Abszolútértéke 0, ellentettje nincs',
          'Abszolútértéke nincs, ellentettje 0'
        ],
        correctAnswer: 'Abszolútértéke 0, ellentettje 0',
        explanation: 'A nulla távolsága önmagától 0 (|0| = 0), és 0 + 0 = 0 miatt a 0 ellentettje önmaga (-0 = 0).',
        breakdown: [
          { label: '|0|', value: '0' },
          { label: '-0', value: '0' },
          { label: 'Összeg', value: '0 + (-0) = 0' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Melyik szám a legkisebb az alábbiak közül?',
        questionTypeBadge: 'Összehasonlítás',
        options: ['-25', '-12', '0', '|-30|'],
        correctAnswer: '-25',
        explanation: 'A |-30| = +30 (pozitív). A 0 nagyobb a negatívoknál. A -12 és -25 közül a -25 van a legtávolabb balra a számegyenesen, így a -25 a legkisebb.',
        breakdown: [
          { label: 'Számok értéke', value: '-25, -12, 0, +30' },
          { label: 'Növekvő sorrend', value: '-25 < -12 < 0 < +30' },
          { label: 'Legkisebb', value: '-25' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Milyen előjelű számot kapunk, ha egy pozitív szám ellentettjét vesszük?',
        questionTypeBadge: 'Ellentett szabály',
        options: [
          'Mindig negatív számot',
          'Mindig pozitív számot',
          'Nullát',
          'Attól függ, mekkora a szám'
        ],
        correctAnswer: 'Mindig negatív számot',
        explanation: 'Ha a > 0 (pozitív), akkor annak ellentettje -a < 0 (negatív). Például +8 ellentettje -8.',
        breakdown: [
          { label: 'Pozitív szám', value: 'a > 0' },
          { label: 'Ellentett', value: '-a < 0 (negatív)' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Mennyi a |-18| - |+7| kifejezés értéke?',
        highlightValue: '|-18| - |+7|',
        questionTypeBadge: 'Abszolútérték művelet',
        options: ['11', '-11', '25', '-25'],
        correctAnswer: '11',
        explanation: '|-18| = 18 és |+7| = 7. Így 18 - 7 = 11.',
        breakdown: [
          { label: '|-18|', value: '18' },
          { label: '|+7|', value: '7' },
          { label: 'Különbség', value: '18 - 7 = 11' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Műveletek és Előjelszabályok',
    subtitle: 'Összeadás, kivonás, szorzás, osztás és zárójelfelbontások egész számokkal',
    range: '11 - 20. feladat',
    focus: 'Alapműveletek & Előjelek',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Mennyi a (-15) + (-27) művelet eredménye?',
        highlightValue: '(-15) + (-27)',
        questionTypeBadge: 'Azonos előjelű összeadás',
        options: ['-42', '+42', '-12', '+12'],
        correctAnswer: '-42',
        explanation: 'Azonos negatív előjelű számok összeadásakor az abszolútértékeket összeadjuk (15 + 27 = 42), és a közös negatív előjelet megtartjuk: -42.',
        breakdown: [
          { label: 'Abszolútértékek', value: '15 + 27 = 42' },
          { label: 'Közös előjel', value: 'Negatív (-)' },
          { label: 'Eredmény', value: '-42' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Számítsd ki: (-18) - (-25) = ?',
        highlightValue: '(-18) - (-25)',
        questionTypeBadge: 'Kivonás ellentettel',
        options: ['+7', '-7', '-43', '+43'],
        correctAnswer: '+7',
        explanation: 'Kivonás helyett az ellentettjét adjuk hozzá: -(-25) = +25. Így (-18) + 25 = +7.',
        breakdown: [
          { label: 'Átalakítás', value: '(-18) + 25' },
          { label: 'Számolás', value: '25 - 18 = 7' },
          { label: 'Eredmény', value: '+7' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Mennyi a (-8) · (-9) szorzat értéke?',
        highlightValue: '(-8) · (-9)',
        questionTypeBadge: 'Szorzás előjelszabály',
        options: ['+72', '-72', '+17', '-17'],
        correctAnswer: '+72',
        explanation: 'Két azonos előjelű (negatív) szám szorzata mindig POZITÍV (+). 8 · 9 = 72, így az eredmény +72.',
        breakdown: [
          { label: 'Előjelek', value: '(-) · (-) = (+)' },
          { label: 'Számérték', value: '8 · 9 = 72' },
          { label: 'Eredmény', value: '+72' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Mennyi a (-72) : (+8) hányados értéke?',
        highlightValue: '(-72) : (+8)',
        questionTypeBadge: 'Osztás előjelszabály',
        options: ['-9', '+9', '-8', '+8'],
        correctAnswer: '-9',
        explanation: 'Különböző előjelű számok osztásakor az eredmény mindig NEGATÍV (-). 72 : 8 = 9, így az eredmény -9.',
        breakdown: [
          { label: 'Előjelek', value: '(-) : (+) = (-)' },
          { label: 'Számérték', value: '72 : 8 = 9' },
          { label: 'Eredmény', value: '-9' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Számítsd ki a többtényezős szorzat értékét: (-2) · (-3) · (-5) · (+4) = ?',
        highlightValue: '(-2) · (-3) · (-5) · (+4)',
        questionTypeBadge: 'Többtényezős szorzat',
        options: ['-120', '+120', '-60', '+60'],
        correctAnswer: '-120',
        explanation: 'A szorzatban 3 db negatív tényező van (páratlan), így a végeredmény negatív (-). 2 · 3 · 5 · 4 = 120, tehát -120.',
        breakdown: [
          { label: 'Negatív tényezők száma', value: '3 db (Páratlan → -)' },
          { label: 'Abszolútértékek', value: '2 · 3 · 5 · 4 = 120' },
          { label: 'Eredmény', value: '-120' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Mennyi a következő művelet eredménye: 14 - 3 · (-6) = ?',
        highlightValue: '14 - 3 · (-6)',
        questionTypeBadge: 'Műveleti sorrend',
        options: ['32', '-4', '-66', '66'],
        correctAnswer: '32',
        explanation: 'A szorzást végezzük el először: 3 · (-6) = -18. Ezután a kivonás: 14 - (-18) = 14 + 18 = 32.',
        breakdown: [
          { label: '1. Szorzás', value: '3 · (-6) = -18' },
          { label: '2. Kivonás', value: '14 - (-18) = 14 + 18' },
          { label: 'Eredmény', value: '32' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Mi az értéke a (-48) : (-6) + (-5) · 3 kifejezésnek?',
        highlightValue: '(-48) : (-6) + (-5) · 3',
        questionTypeBadge: 'Összetett művelet',
        options: ['-7', '+7', '+23', '-23'],
        correctAnswer: '-7',
        explanation: '(-48) : (-6) = +8, és (-5) · 3 = -15. Összeadva: 8 + (-15) = -7.',
        breakdown: [
          { label: '1. Osztás', value: '(-48) : (-6) = 8' },
          { label: '2. Szorzás', value: '(-5) · 3 = -15' },
          { label: '3. Összeg', value: '8 + (-15) = -7' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Mit kapunk, ha a 0-t elosztjuk -9-cel?',
        highlightValue: '0 : (-9)',
        questionTypeBadge: 'Nulla osztása',
        options: ['0', '-9', '+9', 'Értelmetlen művelet'],
        correctAnswer: '0',
        explanation: 'Nullát bármely nemnulla számmal osztva mindig 0-t kapunk (0 : (-9) = 0).',
        breakdown: [
          { label: 'Szabály', value: '0 : a = 0 (ha a ≠ 0)' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Mennyi a (-4)² és a -4² közötti különbség értéke?',
        highlightValue: '(-4)²  vs  -4²',
        questionTypeBadge: 'Hatványozás és előjel',
        options: [
          '(-4)² = 16, míg -4² = -16',
          'Mindkettő értéke +16',
          'Mindkettő értéke -16',
          '(-4)² = -16, míg -4² = +16'
        ],
        correctAnswer: '(-4)² = 16, míg -4² = -16',
        explanation: 'A zárójel azt jelenti, hogy az egész negatív számot négyzetre emeljük: (-4)·(-4) = +16. Zárójel nélkül a mínusz a hatványozás után érvényesül: -(4²) = -16.',
        breakdown: [
          { label: '(-4)²', value: '(-4) · (-4) = +16' },
          { label: '-4²', value: '-(4 · 4) = -16' }
        ]
      },
      {
        id: 'q20',
        prompt: 'Számítsd ki: [(-3) + (-7)] · [15 - 20] = ?',
        highlightValue: '[(-3) + (-7)] · [15 - 20]',
        questionTypeBadge: 'Zárójeles művelet',
        options: ['+50', '-50', '+25', '-25'],
        correctAnswer: '+50',
        explanation: 'Első zárójel: (-3) + (-7) = -10. Második zárójel: 15 - 20 = -5. Szorzatuk: (-10) · (-5) = +50.',
        breakdown: [
          { label: '1. Zárójel', value: '-3 + (-7) = -10' },
          { label: '2. Zárójel', value: '15 - 20 = -5' },
          { label: '3. Szorzat', value: '(-10) · (-5) = +50' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Műveleti Tulajdonságok és Mesterfeladatok',
    subtitle: 'Kommutativitás, disztributivitás, algebrai kifejezések és logikai feladványok',
    range: '21 - 30. feladat',
    focus: 'Azonosságok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Melyik matematikai tulajdonságot szemlélteti az alábbi azonosság: a · (b + c) = a · b + a · c ?',
        highlightValue: 'a · (b + c) = a · b + a · c',
        questionTypeBadge: 'Műveleti tulajdonságok',
        options: [
          'Disztributivitás (széttagolhatóság)',
          'Kommutativitás (felcserélhetőség)',
          'Asszociativitás (csoportosíthatóság)',
          'Inverz tulajdonság'
        ],
        correctAnswer: 'Disztributivitás (széttagolhatóság)',
        explanation: 'A szorzásnak az összeadásra és kivonásra vonatkozó széttagolhatósági szabályát disztributivitásnak nevezzük.',
        breakdown: [
          { label: 'Képlet', value: 'a(b + c) = ab + ac' },
          { label: 'Jelentés', value: 'Tagonkénti beszorzás' },
          { label: 'Szakkifejezés', value: 'Disztributivitás' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Alkalmazd a disztributivitást a gyors fejszámoláshoz: (-18) · 47 + (-18) · 53 = ?',
        highlightValue: '(-18) · 47 + (-18) · 53',
        questionTypeBadge: 'Kiemelés disztributivitással',
        options: ['-1800', '+1800', '-900', '+900'],
        correctAnswer: '-1800',
        explanation: 'Kiemeljük a közös (-18) szorzótényezőt: (-18) · (47 + 53) = (-18) · 100 = -1800.',
        breakdown: [
          { label: 'Közös tényező', value: '-18' },
          { label: 'Kiemelés', value: '(-18) · (47 + 53)' },
          { label: 'Számolás', value: '(-18) · 100 = -1800' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Igaz vagy Hamis? "Bármely két egész szám különbsége és hányadosa felcserélhető (kommutatív): a - b = b - a és a : b = b : a."',
        questionTypeBadge: 'Logikai állítás',
        options: [
          'Hamis, sem a kivonás, sem az osztás nem kommutatív',
          'Igaz, minden alapművelet kommutatív Z-ben',
          'Csak a kivonás kommutatív, az osztás nem',
          'Csak akkor igaz, ha mindkét szám pozitív'
        ],
        correctAnswer: 'Hamis, sem a kivonás, sem az osztás nem kommutatív',
        explanation: 'Például 7 - 3 = 4, de 3 - 7 = -4 (nem egyenlő!). Hasonlóan 6 : 2 = 3, de 2 : 6 = 1/3. Csak az összeadás és a szorzás kommutatív.',
        breakdown: [
          { label: 'Összeadás, szorzás', value: 'Kommutatív (a+b=b+a, ab=ba)' },
          { label: 'Kivonás, osztás', value: 'NEM kommutatív (a-b ≠ b-a)' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Ha az "a" egy negatív egész szám (a < 0), akkor melyik kifejezés értéke lesz BIZTOSAN POZITÍV?',
        questionTypeBadge: 'Algebrai változók',
        options: ['-a', 'a + (-3)', 'a · 5', 'a³'],
        correctAnswer: '-a',
        explanation: 'Mivel a negatív szám, a -a jelöli a negatív szám ellentettjét, ami mindig pozitív (pl. ha a = -4, akkor -a = -(-4) = +4).',
        breakdown: [
          { label: 'Feltétel', value: 'a < 0' },
          { label: '-a értéke', value: '- (negatív) = POZITÍV' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Mennyi a helyettesítési értéke a 2a - 3b kifejezésnek, ha a = -5 és b = -4 ?',
        highlightValue: '2a - 3b (a = -5, b = -4)',
        questionTypeBadge: 'Helyettesítési érték',
        options: ['+2', '-2', '-22', '+22'],
        correctAnswer: '+2',
        explanation: 'Behelyettesítve: 2 · (-5) - 3 · (-4) = -10 - (-12) = -10 + 12 = +2.',
        breakdown: [
          { label: '2 · a', value: '2 · (-5) = -10' },
          { label: '3 · b', value: '3 · (-4) = -12' },
          { label: 'Kivonás', value: '-10 - (-12) = -10 + 12 = +2' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Egy téli reggelen a hőmérséklet -6 °C volt. Délre 11 °C-ot emelkedett, estére pedig 8 °C-ot csökkent. Hány °C volt este?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['-3 °C', '+3 °C', '+5 °C', '-5 °C'],
        correctAnswer: '-3 °C',
        explanation: 'Kifejezéssel felírva: (-6) + 11 - 8 = +5 - 8 = -3 °C.',
        breakdown: [
          { label: 'Reggel', value: '-6 °C' },
          { label: 'Délben', value: '-6 + 11 = +5 °C' },
          { label: 'Este', value: '+5 - 8 = -3 °C' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Mi az értéke a következő kifejezésnek: |-15 + 6| - | -4 · (-3) | = ?',
        highlightValue: '|-15 + 6| - | -4 · (-3) |',
        questionTypeBadge: 'Összetett abszolútérték',
        options: ['-3', '+3', '+21', '-21'],
        correctAnswer: '-3',
        explanation: 'Első tag: |-15 + 6| = |-9| = 9. Második tag: |-4 · (-3)| = |12| = 12. Különbség: 9 - 12 = -3.',
        breakdown: [
          { label: '1. Abszolútérték', value: '|-9| = 9' },
          { label: '2. Abszolútérték', value: '|12| = 12' },
          { label: 'Kivonás', value: '9 - 12 = -3' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Ha a · b = 0, mit állíthatunk biztosan az "a" és "b" egész számokról?',
        questionTypeBadge: 'Szorzat tulajdonság',
        options: [
          'Legalább az egyik szám (a = 0 vagy b = 0) nulla',
          'Mindkét szám biztosan nulla (a = 0 és b = 0)',
          'Mindkét szám pozitív',
          'Egymás ellentettjei'
        ],
        correctAnswer: 'Legalább az egyik szám (a = 0 vagy b = 0) nulla',
        explanation: 'Egy szorzat pontosan akkor egyenlő nullával, ha legalább az egyik szorzótényezője 0.',
        breakdown: [
          { label: 'Szabály', value: 'a · b = 0 ⇔ a = 0 vagy b = 0' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Mennyi a (-1)¹⁰⁰ + (-1)¹⁰¹ kifejezés pontos értéke?',
        highlightValue: '(-1)¹⁰⁰ + (-1)¹⁰¹',
        questionTypeBadge: 'Előjeles hatványozás',
        options: ['0', '+2', '-2', '-1'],
        correctAnswer: '0',
        explanation: 'Páros kitevő esetén (-1)¹⁰⁰ = +1. Páratlan kitevő esetén (-1)¹⁰¹ = -1. Összegük: (+1) + (-1) = 0.',
        breakdown: [
          { label: '(-1)¹⁰⁰', value: '+1 (páros kitevő)' },
          { label: '(-1)¹⁰¹', value: '-1 (páratlan kitevő)' },
          { label: 'Összeg', value: '1 + (-1) = 0' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Bontsd fel a zárójelet és egyszerűsítsd: -3 · (2x - 5) = ?',
        highlightValue: '-3 · (2x - 5)',
        questionTypeBadge: 'Algebrai zárójelfelbontás',
        options: ['-6x + 15', '-6x - 15', '6x - 15', '-6x - 5'],
        correctAnswer: '-6x + 15',
        explanation: 'Disztributivitással tagonként beszorzunk (-3)-mal: (-3) · (2x) + (-3) · (-5) = -6x + 15.',
        breakdown: [
          { label: '1. Tag beszorzása', value: '(-3) · (2x) = -6x' },
          { label: '2. Tag beszorzása', value: '(-3) · (-5) = +15' },
          { label: 'Eredmény', value: '-6x + 15' }
        ]
      }
    ]
  }
};

export const IntegerPropertiesQuiz: React.FC<IntegerPropertiesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🔢"
      topicBadge="7. Osztály • Matematika II. Témakör"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="1. Az egész számok tulajdonságai Kvíz"
      subtitle="Gyakorold az egész számok halmazát, az abszolútértéket, előjelszabályokat és műveleti azonosságokat 30 válogatott feladattal!"
      cheatSheetTitle="Egész Számok Szabálytár & Puska"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="purple"
      hintText="💡 Ügyelj a műveleti sorrendre és az előjelszabályokra: (-)·(-) = + és (-)·(+) = - !"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a kifejezéseket és eredményeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <IntegerPropertiesMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a számokat és kifejezéseket!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <IntegerPropertiesSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        }
      ]}
    />
  );
};
