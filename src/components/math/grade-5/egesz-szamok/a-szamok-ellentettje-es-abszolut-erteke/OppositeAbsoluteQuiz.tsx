import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OppositeAbsoluteMatcher } from './OppositeAbsoluteMatcher';
import { OppositeAbsoluteSorter } from './OppositeAbsoluteSorter';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher' | 'sorter';

export interface QuizQuestion {
  id: string;
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
}

interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentGradient: string;
  iconBg: string;
  questions: QuizQuestion[];
}

const OPPOSITE_CHEAT_SHEET = [
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
    formula: '|x| = k  =>  x = k vagy x = -k',
    note: 'Ha k > 0, mindig 2 megoldás van; ha k = 0, 1 megoldás (0); ha k < 0, nincs megoldás.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
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
          { label: 'Ha k > 0', value: '2 megoldás (+k, -k)' },
          { label: 'Ha k = 0', value: '1 megoldás (x = 0)' },
          { label: 'Ha k < 0', value: '0 megoldás (lehetetlen)' }
        ]
      }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface OppositeAbsoluteQuizProps {
  onBack: () => void;
}

export function OppositeAbsoluteQuiz({ onBack }: OppositeAbsoluteQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Fullscreen toggler
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Confetti on completion
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);

    const prepared = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
    if (!currentQ) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const total = questions.length || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isCompleted || !selectedLevel) return;

      if (!isAnswerChecked) {
        const keyMap: { [key: string]: number } = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3
        };
        if (e.key in keyMap) {
          const optionIdx = keyMap[e.key];
          const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
          if (currentQ && currentQ.options[optionIdx]) {
            handleOptionClick(currentQ.options[optionIdx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  // 1. Initial Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top bar with back button, fullscreen toggle and cheat sheet */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1" />
                  Ablak
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1" />
                  Teljes képernyő
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="rounded-xl h-8 px-3 text-xs font-bold border-orange-300 bg-orange-50/50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800 hover:bg-orange-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-orange-600" />
              Ellentett és abszolút érték segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🔄</span>
            <span>A számok ellentettje és abszolút értéke Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Teszteld a tudásod a számok ellentettjéről, az abszolút értékről mint távolságról, az előjelváltásokról és az egyenletekről!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-orange-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
              Kártyás Párosító
            </button>
            <button
              onClick={() => setGameMode('sorter')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-orange-200 dark:border-orange-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-orange-900 dark:text-orange-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Ellentett és abszolút érték szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-orange-800 dark:text-orange-300 hover:bg-orange-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {OPPOSITE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-orange-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-orange-600 dark:text-orange-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = QUIZ_LEVELS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-orange-600 dark:text-orange-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : gameMode === 'matcher' ? 'Párosító Indítása' : 'Csoportosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Completion Screen
  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const totalQuestions = questions.length || levelConfig.questions.length;

  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = percentage >= 70;

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-2xl mx-auto px-4 py-8 animate-in zoom-in-95 duration-300 text-center",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl max-w-xl w-full">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-2xl font-black text-orange-600 dark:text-orange-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-11 rounded-xl text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>

            <Button
              variant="ghost"
              onClick={() => setSelectedLevel(null)}
              className="h-11 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Szintek
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active View with Right-side Wordwall Sidebar
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
          </Button>

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-orange-600 dark:text-orange-400" />
                <span className="hidden sm:inline">Kilépés</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span className="hidden sm:inline">Teljes képernyő</span>
              </>
            )}
          </Button>
        </div>

        {/* Level pills in header */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl, gameMode)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {lvl === 1 ? '1. Könnyű' : lvl === 2 ? '2. Közepes' : '3. Nehéz'}
            </button>
          ))}
        </div>

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-orange-600 dark:text-orange-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : gameMode === 'matcher' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span>{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-orange-50 to-amber-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-orange-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-orange-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step below question */}
                  {isAnswerChecked && (
                    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        selectedOption === currentQuestion.correctAnswer
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                            selectedOption === currentQuestion.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              selectedOption === currentQuestion.correctAnswer
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {selectedOption === currentQuestion.correctAnswer ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              {currentQuestion.explanation}
                            </p>

                            {currentQuestion.breakdown && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-orange-600 dark:text-orange-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-orange-600 dark:hover:bg-orange-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a helyes eredményt:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-orange-500 hover:shadow-xs dark:hover:border-orange-500";

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-800 dark:text-rose-200 shadow-xs";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-orange-50/60 dark:bg-slate-850/80 rounded-xl border border-orange-200/50 dark:border-slate-800 text-[11px] text-orange-900 dark:text-orange-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>💡 Az abszolút érték mindig nemnegatív (≥ 0)! Ellentettnél az előjel váltakozik.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <OppositeAbsoluteMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER / GROUPING MODE WORKSPACE */
            <OppositeAbsoluteSorter
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'sorter')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-orange-50 dark:bg-orange-950/50 border-orange-400 text-orange-900 dark:text-orange-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-orange-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">10 feladat, 4 opció</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogató</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">8 pár megkeresése</div>
                </div>
              </button>

              {/* Sorter Mode Button */}
              <button
                onClick={() => setGameMode('sorter')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'sorter'
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Csoportosító</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Húzd a helyére (3 csoport)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Nehézségi szint</span>
            </div>

            <div className="flex flex-col gap-1">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleStartLevel(lvl, gameMode)}
                  className={cn(
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-orange-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű szint' : lvl === 2 ? 'Közepes szint' : 'Nehéz szint'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold justify-start"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-orange-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-orange-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-orange-300 bg-orange-50/50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800 hover:bg-orange-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-orange-600" />
              Segédlet & Szabályok
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-orange-300 dark:border-orange-900 shadow-2xl max-w-2xl w-full text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                Az ellentett és abszolút érték szabályai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {OPPOSITE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-orange-600 dark:text-orange-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{item.formula}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.note}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-orange-600 hover:bg-orange-700 text-white"
            >
              Értem, bezárás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
