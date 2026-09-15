import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetItem, DifficultyLevel } from '../QuizTemplate';
import { OppositeAbsoluteMatcher } from './OppositeAbsoluteMatcher';
import { OppositeAbsoluteSorter } from './OppositeAbsoluteSorter';

export interface OppositeAbsoluteQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const OPPOSITE_CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Ellentett szám fogalma',
    formula: '-(+a) = -a, -(-a) = +a',
    note: 'A nullától azonos távolságra lévő, ellentétes előjelű számpárok (pl. +8 ellentettje -8).'
  },
  {
    topic: 'A Nulla ellentettje',
    formula: '0 ellentettje: 0',
    note: 'A nulla az egyetlen olyan szám, amely önmaga ellentettje (távolsága 0).'
  },
  {
    topic: 'Abszolút érték mint távolság',
    formula: '|a| ≥ 0',
    note: 'A szám nullától mért távolsága a számegyenesen. A távolság SOSEM negatív!'
  },
  {
    topic: 'Pozitív szám és nulla abszolút értéke',
    formula: '|+8| = 8, |0| = 0',
    note: 'Pozitív számnál és nullánál az abszolút érték megegyezik magával a számmal.'
  },
  {
    topic: 'Negatív szám abszolút értéke',
    formula: '|-8| = 8',
    note: 'Negatív számnál az abszolút érték a szám ellentettjével (pozitív párjával) egyenlő.'
  },
  {
    topic: 'Külső előjel abszolút értéknél',
    formula: '-|-5| = -(5) = -5',
    note: 'Először a belső abszolút értéket számoljuk: |-5| = 5, majd elé tesszük a mínuszt.'
  },
  {
    topic: 'Ellentett számok összege',
    formula: 'a + (-a) = 0',
    note: 'Bármely számot összeadva a saját ellentettjével, az összeg mindig pontosan 0.'
  },
  {
    topic: 'Abszolút értékes egyenletek',
    formula: '|x| = k => x = k vagy x = -k',
    note: 'Ha k > 0, mindig 2 megoldás van; ha k = 0, 1 megoldás (0); ha k < 0, nincs megoldás.'
  }
];

export const OPPOSITE_QUIZ_LEVELS: Record<1 | 2 | 3, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Ellentett fogalma, előjelváltás és abszolút érték mint távolság',
    range: 'Alapfogalmak és értelmezések',
    focus: 'Ellentétes előjel, nulla ellentettje, távolság a nullától, |a| számolása',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mi a +9 egész szám ellentettje a számegyenesen?',
        highlightValue: '+9 ellentettje',
        questionTypeBadge: 'Ellentett szám',
        options: ['-9', '+9', '0', '1/9'],
        correctAnswer: '-9',
        explanation: 'Egy pozitív szám ellentettje az ugyanolyan abszolút értékű, de negatív előjelű szám: -9.',
        breakdown: [
          { label: 'Eredeti szám', value: '+9' },
          { label: 'Ellentett szám', value: '-(+9) = -9' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mi a -14 negatív egész szám ellentettje?',
        highlightValue: '-14 ellentettje',
        questionTypeBadge: 'Ellentett szám',
        options: ['+14', '-14', '0', '-28'],
        correctAnswer: '+14',
        explanation: 'Egy negatív szám ellentettje pozitív előjelű: -(-14) = +14.',
        breakdown: [
          { label: 'Eredeti szám', value: '-14' },
          { label: 'Ellentett szám', value: '-(-14) = +14' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mi a nulla (0) ellentettje?',
        highlightValue: '0 ellentettje',
        questionTypeBadge: 'A nulla ellentettje',
        options: ['0', '-0', '+1', 'Nincs ellentettje'],
        correctAnswer: '0',
        explanation: 'A nulla távolsága önmagától 0, így a nulla ellentettje saját maga: 0.',
        breakdown: [
          { label: 'Eredeti szám', value: '0' },
          { label: 'Szabály', value: 'A nulla ellentettje önmaga: 0' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mit jelent geometriailag egy szám abszolút értéke a számegyenesen?',
        highlightValue: 'Abszolút érték fogalma',
        questionTypeBadge: 'Geometriai jelentés',
        options: [
          'A szám nullától mért távolságát',
          'A szám előjelét',
          'A szám kétszeresét',
          'A számtól jobbra lévő egész számot'
        ],
        correctAnswer: 'A szám nullától mért távolságát',
        explanation: 'Egy szám abszolút értéke a számnak a nullától (origótól) mért távolsága a számegyenesen.',
        breakdown: [
          { label: 'Jelölés', value: '|a|' },
          { label: 'Jelentés', value: 'Nullától mért távolság egységekben' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a |-8| abszolút értéke?',
        highlightValue: '|-8| értéke',
        questionTypeBadge: 'Abszolút érték kiszámítása',
        options: ['8', '-8', '0', '-16'],
        correctAnswer: '8',
        explanation: 'A -8 távolsága a nullától pontosan 8 egység. Az abszolút érték mindig nemnegatív: |-8| = 8.',
        breakdown: [
          { label: 'Szám', value: '-8' },
          { label: 'Távolság a nullától', value: '8 egység (|-8| = 8)' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a |+15| abszolút értéke?',
        highlightValue: '|+15| értéke',
        questionTypeBadge: 'Abszolút érték kiszámítása',
        options: ['15', '-15', '0', '30'],
        correctAnswer: '15',
        explanation: 'Pozitív szám abszolút értéke megegyezik magával a számmal: |+15| = 15.',
        breakdown: [
          { label: 'Szám', value: '+15' },
          { label: 'Abszolút érték', value: '15' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a |0| abszolút értéke?',
        highlightValue: '|0| értéke',
        questionTypeBadge: 'A nulla abszolút értéke',
        options: ['0', '+1', '-1', 'Nem értelmezett'],
        correctAnswer: '0',
        explanation: 'A nulla távolsága a nullától 0 egység, ezért |0| = 0.',
        breakdown: [
          { label: 'Origó', value: '0' },
          { label: 'Abszolút érték', value: '|0| = 0' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Lehet-e egy szám abszolút értéke negatív szám?',
        highlightValue: 'Lehet-e negatív az abszolút érték?',
        questionTypeBadge: 'Abszolút érték tulajdonsága',
        options: [
          'Nem, mert a távolság sosem negatív (mindig ≥ 0)',
          'Igen, ha a kiinduló szám negatív',
          'Igen, ha kivonás van a jelben',
          'Csak a -100-nál kisebb számoknál'
        ],
        correctAnswer: 'Nem, mert a távolság sosem negatív (mindig ≥ 0)',
        explanation: 'Mivel az abszolút érték geometriai távolságot jelent, értéke sosem lehet negatív (|a| ≥ 0 minden valós számra).',
        breakdown: [
          { label: 'Szabály', value: '|a| ≥ 0' },
          { label: 'Magyarázat', value: 'Távolság sosem lehet negatív' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik számpár alkot ellentett számpárt az alábbiak közül?',
        highlightValue: 'Ellentett számpár kiválasztása',
        questionTypeBadge: 'Számpárok',
        options: ['-12 és +12', '-12 és -12', '+12 és 0', '-12 és +24'],
        correctAnswer: '-12 és +12',
        explanation: 'A -12 és +12 a nullától egyenlő távolságra (12 egységre), de ellentétes irányban találhatók.',
        breakdown: [
          { label: '1. szám', value: '-12' },
          { label: '2. szám (ellentett)', value: '+12' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a -25 szám távolsága a nullától a számegyenesen?',
        highlightValue: '-25 távolsága a 0-tól',
        questionTypeBadge: 'Távolság számolása',
        options: ['25 egység', '-25 egység', '50 egység', '0 egység'],
        correctAnswer: '25 egység',
        explanation: 'A távolság a szám abszolút értéke: |-25| = 25 egység.',
        breakdown: [
          { label: 'Képlet', value: 'Távolság = |-25|' },
          { label: 'Eredmény', value: '25 egység' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Műveletek abszolút értékekkel, külső előjelek és egyenletek',
    range: 'Összetett kifejezések és előjeles műveletek',
    focus: '-(-a), -|+a|, abszolút értékek összege/különbsége, |x| = k gyökei',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a -(-18) kifejezés egyszerűsített értéke?',
        highlightValue: '-(-18)',
        questionTypeBadge: 'Előjel feloldása',
        options: ['+18', '-18', '0', '-36'],
        correctAnswer: '+18',
        explanation: 'Egy negatív szám ellentettje pozitív szám: a két mínusz előjel egymást semlegesíti, így +18 lesz.',
        breakdown: [
          { label: 'Szabály', value: '-(-a) = +a' },
          { label: 'Eredmény', value: '+18' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a -(+23) kifejezés egyszerűsített értéke?',
        highlightValue: '-(+23)',
        questionTypeBadge: 'Előjel feloldása',
        options: ['-23', '+23', '0', '+46'],
        correctAnswer: '-23',
        explanation: 'A +23 ellentettje a -23: -(+a) = -a.',
        breakdown: [
          { label: 'Szabály', value: '-(+a) = -a' },
          { label: 'Eredmény', value: '-23' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a |-7| + |+5| műveletsor eredménye?',
        highlightValue: '|-7| + |+5|',
        questionTypeBadge: 'Abszolút értékek összege',
        options: ['12', '-2', '2', '-12'],
        correctAnswer: '12',
        explanation: 'Először kiszámítjuk az abszolút értékeket: |-7| = 7 és |+5| = 5. Majd összeadjuk: 7 + 5 = 12.',
        breakdown: [
          { label: '1. lépés', value: '|-7| = 7 és |+5| = 5' },
          { label: '2. lépés', value: '7 + 5 = 12' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a |-30| - |-12| kivonás értéke?',
        highlightValue: '|-30| - |-12|',
        questionTypeBadge: 'Abszolút értékek különbsége',
        options: ['18', '-42', '42', '-18'],
        correctAnswer: '18',
        explanation: '|-30| = 30 és |-12| = 12. A különbség: 30 - 12 = 18.',
        breakdown: [
          { label: '1. tag', value: '|-30| = 30' },
          { label: '2. tag', value: '|-12| = 12' },
          { label: 'Kivonás', value: '30 - 12 = 18' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a -|-15| kifejezés pontos értéke?',
        highlightValue: '-|-15|',
        questionTypeBadge: 'Külső előjel abszolút értéknél',
        options: ['-15', '+15', '0', '-30'],
        correctAnswer: '-15',
        explanation: 'Először a belső abszolút értéket határozzuk meg: |-15| = 15. Ezután kitesszük elé a külső mínuszt: -(15) = -15.',
        breakdown: [
          { label: 'Belső abszolút érték', value: '|-15| = 15' },
          { label: 'Külső mínusz előjel', value: '-(15) = -15' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mely egész számok teszik igazzá a |x| = 8 egyenletet?',
        highlightValue: '|x| = 8',
        questionTypeBadge: 'Abszolút értékes egyenlet',
        options: [
          'x = 8 és x = -8',
          'Csak az x = 8',
          'Csak az x = -8',
          'x = 0 és x = 8'
        ],
        correctAnswer: 'x = 8 és x = -8',
        explanation: 'A számnak a nullától 8 egység távolságra kell lennie. Ez jobbra a +8, balra a -8.',
        breakdown: [
          { label: 'Pozitív gyök', value: 'x = +8' },
          { label: 'Negatív gyök', value: 'x = -8' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi egy tetszőleges szám és az ellentettjének összege: a + (-a)?',
        highlightValue: 'a + (-a)',
        questionTypeBadge: 'Ellentettek összege szabály',
        options: [
          'Mindig 0',
          'Mindig 2a',
          'Mindig pozitív szám',
          'Függ az "a" értékétől'
        ],
        correctAnswer: 'Mindig 0',
        explanation: 'Bármely számot összeadva a saját ellentettjével, a két szám kiejti egymást, így az összeg mindig 0.',
        breakdown: [
          { label: 'Példa 1', value: '5 + (-5) = 0' },
          { label: 'Példa 2', value: '(-12) + 12 = 0' },
          { label: 'Szabály', value: 'a + (-a) = 0' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a (+17) + (-17) összeadás eredménye?',
        highlightValue: '(+17) + (-17)',
        questionTypeBadge: 'Összeadás ellentettel',
        options: ['0', '34', '-34', '17'],
        correctAnswer: '0',
        explanation: 'A +17 és a -17 ellentett számpárt alkotnak, összegük pontosan 0.',
        breakdown: [
          { label: 'Ellentétes tagok', value: '+17 és -17' },
          { label: 'Összeg', value: '0' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Melyik állítás IGAZ az alábbiak közül?',
        highlightValue: '|-6| és |+6| összehasonlítása',
        questionTypeBadge: 'Összehasonlítás',
        options: ['|-6| = |+6|', '|-6| < |+6|', '|-6| > |+6|', '|-6| = -|+6|'],
        correctAnswer: '|-6| = |+6|',
        explanation: 'Mivel mindkét szám 6 egység távolságra van a nullától, |-6| = 6 és |+6| = 6, tehát abszolút értékük egyenlő.',
        breakdown: [
          { label: '|-6|', value: '6' },
          { label: '|+6|', value: '6' },
          { label: 'Kapcsolat', value: '6 = 6' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a -(-(-10)) kifejezés értéke?',
        highlightValue: '-(-(-10))',
        questionTypeBadge: 'Háromszoros előjelváltás',
        options: ['-10', '+10', '0', '-30'],
        correctAnswer: '-10',
        explanation: 'A belső -(-10) értéke +10. Ebből a külső előjellel: -(+10) = -10 (Páratlan számú mínusz esetén az eredmény negatív marad).',
        breakdown: [
          { label: 'Belső rész', value: '-(-10) = +10' },
          { label: 'Külső mínusz', value: '-(+10) = -10' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Többszörös előjelek, egyenlőtlenségek és algebrai összefüggések',
    range: 'Haladó abszolút értékes feladatok és egyenletek',
    focus: 'Többszörös mínuszok, |x| ≤ k intervallumok, |x| = negatív csapda, műveletek',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-orange-500 to-rose-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a -( -(-(+14)) ) kifejezés értéke 3 db mínusz előjellel?',
        highlightValue: '-( -(-(+14)) )',
        questionTypeBadge: 'Többszörös előjelváltás',
        options: ['-14', '+14', '0', '-28'],
        correctAnswer: '-14',
        explanation: 'Páratlan számú (3 db) negatív előjel esetén az eredmény negatív előjelű marad: -14.',
        breakdown: [
          { label: '1. lépés', value: '-(+14) = -14' },
          { label: '2. lépés', value: '-(-14) = +14' },
          { label: '3. lépés', value: '-(+14) = -14' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a -( -(-(-20)) ) kifejezés értéke 4 db mínusz előjellel?',
        highlightValue: '-( -(-(-20)) )',
        questionTypeBadge: 'Páros számú negatív előjel',
        options: ['+20', '-20', '0', '+40'],
        correctAnswer: '+20',
        explanation: 'Páros számú (4 db) negatív előjel egymást páronként kiejti, így a végeredmény pozitív: +20.',
        breakdown: [
          { label: 'Előjelek száma', value: '4 db mínusz (páros)' },
          { label: 'Végeredmény', value: '+20' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Hány olyan EGÉSZ szám létezik, amelyre teljesül a |x| ≤ 3 egyenlőtlenség?',
        highlightValue: '|x| ≤ 3 egész megoldásai',
        questionTypeBadge: 'Abszolút értékes egyenlőtlenség',
        options: [
          '7 db (-3, -2, -1, 0, 1, 2, 3)',
          '6 db (-3, -2, -1, 1, 2, 3)',
          '3 db (1, 2, 3)',
          '4 db (0, 1, 2, 3)'
        ],
        correctAnswer: '7 db (-3, -2, -1, 0, 1, 2, 3)',
        explanation: 'Azok az egész számok, amelyek távolsága a nullától legfeljebb 3: -3, -2, -1, 0, +1, +2, +3. Ez összesen 7 darab egész szám.',
        breakdown: [
          { label: 'Negatív számok', value: '-3, -2, -1 (3 db)' },
          { label: 'Nulla', value: '0 (1 db)' },
          { label: 'Pozitív számok', value: '1, 2, 3 (3 db)' },
          { label: 'Összesen', value: '3 + 1 + 3 = 7 db' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a |-24| : |-6| + |-3| · |+4| műveletsor eredménye?',
        highlightValue: '|-24| : |-6| + |-3| · |+4|',
        questionTypeBadge: 'Összetett műveletsor',
        options: ['16', '28', '4', '-16'],
        correctAnswer: '16',
        explanation: 'Először abszolút értékek: 24 : 6 + 3 · 4. Osztás és szorzás: 4 + 12 = 16.',
        breakdown: [
          { label: 'Abszolút értékek után', value: '24 : 6 + 3 · 4' },
          { label: 'Műveleti sorrend', value: '4 + 12' },
          { label: 'Eredmény', value: '16' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Oldd meg a |x| = -5 egyenletet! Milyen valós számokra igaz?',
        highlightValue: '|x| = -5',
        questionTypeBadge: 'Lehetetlen egyenlet csapda',
        options: [
          'Nincs megoldása, mert az abszolút érték nem lehet negatív',
          'x = -5 és x = 5',
          'Csak x = -5',
          'x = 0'
        ],
        correctAnswer: 'Nincs megoldása, mert az abszolút érték nem lehet negatív',
        explanation: 'Mivel a geometriai távolság nem lehet negatív (|x| ≥ 0), egyetlen számnak sem lehet a nullától mért távolsága -5. Nincs megoldás!',
        breakdown: [
          { label: 'Bal oldal', value: '|x| ≥ 0 mindig' },
          { label: 'Jobb oldal', value: '-5 (negatív)' },
          { label: 'Következtetés', value: 'Nincs megoldás (ellentmondás)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a -(-|-16|) kifejezés pontos értéke?',
        highlightValue: '-(-|-16|)',
        questionTypeBadge: 'Kettős külső előjel abszolút értékkel',
        options: ['+16', '-16', '0', '-32'],
        correctAnswer: '+16',
        explanation: '|-16| = 16. Ebből: -|-16| = -16. A külső mínusz: -(-16) = +16.',
        breakdown: [
          { label: '1. lépés', value: '|-16| = 16' },
          { label: '2. lépés', value: '-|-16| = -16' },
          { label: '3. lépés', value: '-(-16) = +16' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Melyik relációs jel teszi igazzá: -|-9| ___ -(-9) ?',
        highlightValue: '-|-9| ___ -(-9)',
        questionTypeBadge: 'Kifejezések összehasonlítása',
        options: [
          '< (mivel -9 < +9)',
          '> (mivel -9 > +9)',
          '= (egyenlőek)',
          '≤ (csak ha a szám nulla)'
        ],
        correctAnswer: '< (mivel -9 < +9)',
        explanation: 'A bal oldal: -|-9| = -9. A jobb oldal: -(-9) = +9. Mivel a negatív szám kisebb a pozitívnál, -9 < +9.',
        breakdown: [
          { label: 'Bal oldal', value: '-|-9| = -9' },
          { label: 'Jobb oldal', value: '-(-9) = +9' },
          { label: 'Reláció', value: '-9 < +9' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Ha a = -7, mennyi a -a és |a| összege? (-a + |a|)',
        highlightValue: 'Ha a = -7, mennyi -a + |a| ?',
        questionTypeBadge: 'Behelyettesítéses feladat',
        options: [
          '14 (7 + 7 = 14)',
          '0 (-7 + 7 = 0)',
          '-14',
          '7'
        ],
        correctAnswer: '14 (7 + 7 = 14)',
        explanation: 'Ha a = -7, akkor -a = -(-7) = +7, és |a| = |-7| = 7. Összegük: 7 + 7 = 14.',
        breakdown: [
          { label: '-a értéke', value: '-(-7) = 7' },
          { label: '|a| értéke', value: '|-7| = 7' },
          { label: 'Összeg', value: '7 + 7 = 14' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a | -12 + 5 | kifejezés értéke?',
        highlightValue: '| -12 + 5 |',
        questionTypeBadge: 'Művelet az abszolút értéken belül',
        options: ['7', '-7', '17', '-17'],
        correctAnswer: '7',
        explanation: 'Először az abszolút értéken belüli műveletet végezzük el: -12 + 5 = -7. Ennek az abszolút értéke: |-7| = 7.',
        breakdown: [
          { label: 'Belső összeg', value: '-12 + 5 = -7' },
          { label: 'Abszolút érték', value: '|-7| = 7' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Melyik az az egyetlen szám a számegyenesen, amelynek a |x| = k egyenlete csak egyetlen gyökkel rendelkezik?',
        highlightValue: 'Egyetlen gyökkel rendelkező egyenlet',
        questionTypeBadge: 'Szélsőérték és origó',
        options: [
          'A 0 (|0| = 0)',
          'Az 1 (|1| = 1)',
          'A -1 (|-1| = 1)',
          'Minden páros szám'
        ],
        correctAnswer: 'A 0 (|0| = 0)',
        explanation: 'A |x| = 0 egyenletnek egyetlen gyöke van (x = 0), mert a 0-nak nincs külön előjeles párja, míg minden pozitív k-ra két gyök van (+k és -k).',
        breakdown: [
          { label: 'Origó', value: '|0| = 0 (1 gyök: x = 0)' },
          { label: 'Pozitív számok', value: '|x| = 5 (2 gyök: x = 5 és x = -5)' }
        ]
      }
    ]
  }
};

export function OppositeAbsoluteQuiz({
  onBack,
  onSwitchToTheory
}: OppositeAbsoluteQuizProps) {
  return (
    <QuizTemplate
      title="Ellentett és Abszolút Érték - Gyakorló Kvíz"
      topicBadge="🔄 5. Osztály • I. Az egész számok"
      badgeText="🔄 5. Osztály • I. Az egész számok"
      badgeColor="orange"
      levels={OPPOSITE_QUIZ_LEVELS}
      cheatSheet={OPPOSITE_CHEAT_SHEET}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<OppositeAbsoluteMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<OppositeAbsoluteSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default OppositeAbsoluteQuiz;
