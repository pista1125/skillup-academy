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
  ArrowRightLeft,
  Snowflake,
  Thermometer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NegativeNumbersMatcher } from './NegativeNumbersMatcher';
import { NegativeNumbersSorter } from './NegativeNumbersSorter';

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

const NEGATIVE_CHEAT_SHEET = [
  { topic: 'Negatív számok (< 0)', formula: '-1, -2, -3, ...', note: 'A nullától balra találhatók a számegyenesen. A mínusz (-) előjel kötelező!' },
  { topic: 'A Nulla (= 0)', formula: 'Semleges origó', note: 'A nulla se nem pozitív, se nem negatív szám! Nincs előjele.' },
  { topic: 'Pozitív számok (> 0)', formula: '+1, +2, +3 (vagy 1, 2, 3)', note: 'A nullától jobbra találhatók. A plusz (+) előjel elhagyható.' },
  { topic: 'Összehasonlítás szabálya', formula: '-10 < -2', note: 'A számegyenesen a jobb oldalon lévő szám mindig a nagyobb. Minél hidegebb, annál kisebb a szám!' },
  { topic: 'Ellentett számok', formula: '-(+5) = -5, -(-5) = +5', note: 'A nullától azonos távolságra lévő, de ellentétes előjelű számpárok (pl. -7 és +7).' },
  { topic: 'Tengerszint / Hőmérő', formula: '0 m / 0 °C', note: 'A tengerszint alatti mélységet és a fagyos hőmérsékletet negatív számmal jelöljük.' },
  { topic: 'Pénzügyi egyenleg', formula: '+ Nyereség / - Tartozás', note: 'A pozitív egyenleg megtakarítást, a negatív egyenleg adósságot / hitelt jelent.' },
  { topic: 'Változások iránya', formula: 'Melegedés (+), Hűlés (-)', note: 'Ha -3 °C-ról melegszik 5 °C-ot, jobbra lépünk: -3 + 5 = +2 °C.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Hőmérséklet, adósság, tengerszint és alapfogalmak',
    range: 'Alapvető előjeles számok',
    focus: 'Előjelek értelmezése, nulla szerepe, fagy és meleg, számegyenes iránya',
    color: 'cyan',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Milyen számmal jelöljük a hőmérőt, ha télen 7 fokos fagyot mérünk a szabadban?',
        highlightValue: '7 fok fagy',
        questionTypeBadge: 'Hőmérséklet',
        options: ['-7 °C', '+7 °C', '0 °C', '14 °C'],
        correctAnswer: '-7 °C',
        explanation: 'A fagypont (0 °C) alatti hideget negatív előjellel jelöljük: -7 °C.',
        breakdown: [
          { label: 'Viszonyítási alap', value: '0 °C (fagypont)' },
          { label: 'Fagy értéke', value: '-7 °C' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Peti kölcsönkért a barátjától 3000 Ft-ot, amit még vissza kell fizetnie. Milyen előjeles számmal jelölhetjük Peti pénzügyi egyenlegét?',
        highlightValue: '3 000 Ft tartozás',
        questionTypeBadge: 'Pénzügyi egyenleg',
        options: ['-3 000 Ft', '+3 000 Ft', '0 Ft', '+6 000 Ft'],
        correctAnswer: '-3 000 Ft',
        explanation: 'A tartozást, hiányt és hitelt negatív számmal jelöljük: -3 000 Ft.',
        breakdown: [
          { label: 'Megtakarítás', value: '+ előjel' },
          { label: 'Tartozás / adósság', value: '- előjel (-3 000 Ft)' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Milyen előjelű szám a nulla (0)?',
        highlightValue: 'A Nulla (0)',
        questionTypeBadge: 'A nulla tulajdonsága',
        options: [
          'Se nem pozitív, se nem negatív',
          'Mindig pozitív szám',
          'Mindig negatív szám',
          'Egyszerre pozitív és negatív is'
        ],
        correctAnswer: 'Se nem pozitív, se nem negatív',
        explanation: 'A nulla a számegyenes semleges origója: se nem pozitív, se nem negatív szám, nincs előjele.',
        breakdown: [
          { label: 'Origó', value: '0' },
          { label: 'Tulajdonság', value: 'Semleges választóvonal' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hol helyezkednek el a negatív számok a számegyenesen a nullához képest?',
        highlightValue: 'Számegyenes elhelyezkedés',
        questionTypeBadge: 'Számegyenes',
        options: [
          'A nullától balra',
          'A nullától jobbra',
          'Közvetlenül a nulla felett',
          'Tetszőleges helyen bárhol'
        ],
        correctAnswer: 'A nullától balra',
        explanation: 'A számegyenesen a negatív számok a nullától balra, a pozitív számok pedig a nullától jobbra helyezkednek el.',
        breakdown: [
          { label: 'Nullától balra', value: 'Negatív számok (< 0)' },
          { label: 'Nullától jobbra', value: 'Pozitív számok (> 0)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik állítás IGAZ az előjelek kiírására vonatkozóan?',
        highlightValue: '+ és - előjelek',
        questionTypeBadge: 'Előjelek szabálya',
        options: [
          'A plusz (+) elhagyható, de a mínusz (-) kötelező',
          'A mínusz (-) elhagyható, de a plusz (+) kötelező',
          'Mindkét előjelet mindig kötelező kiírni',
          'Egyik előjelet sem szabad kiírni'
        ],
        correctAnswer: 'A plusz (+) elhagyható, de a mínusz (-) kötelező',
        explanation: 'A pozitív számoknál a + jel elhagyható (+5 = 5), de a negatív számoknál a - előjelet mindig kötelező kitenni (-5 ≠ 5).',
        breakdown: [
          { label: 'Pozitív', value: '+5 = 5 (elhagyható)' },
          { label: 'Negatív', value: '-5 (kötelező kiírni)' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik a nullához legközelebbi negatív egész szám a számegyenesen?',
        highlightValue: 'Legnagyobb negatív egész',
        questionTypeBadge: 'Szomszédok',
        options: ['-1', '0', '-10', '+1'],
        correctAnswer: '-1',
        explanation: 'A 0 közvetlen bal szomszédja a -1, ez a legnagyobb negatív egész szám.',
        breakdown: [
          { label: 'Nulla bal szomszédja', value: '-1' },
          { label: 'Értéke', value: 'Legnagyobb negatív egész' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Egy búvár 15 méterrel úszik a tenger szintje alatt. Milyen számmal adható meg a tengerszinthez viszonyított helyzete?',
        highlightValue: '15 méterrel a tengerszint alatt',
        questionTypeBadge: 'Tengerszint',
        options: ['-15 m', '+15 m', '0 m', '30 m'],
        correctAnswer: '-15 m',
        explanation: 'A tengerszint a 0 m. A tengerszint alatti mélységet negatív számmal fejezzük ki: -15 m.',
        breakdown: [
          { label: 'Tengerszint', value: '0 m' },
          { label: 'Mélység', value: '-15 m' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'A bevásárlóközpont liftjében a 2. mélygarázs szintet szeretnénk kiválasztani. Melyik gombot kell megnyomni?',
        highlightValue: '2. mélygarázs szint',
        questionTypeBadge: 'Lift szintek',
        options: ['-2', '+2', '0', '20'],
        correctAnswer: '-2',
        explanation: 'A földszint alatti szinteket negatív előjellel jelölik a liftekben: -2. szint.',
        breakdown: [
          { label: 'Földszint', value: '0' },
          { label: 'Mélygarázs', value: '-2' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Két téli nap közül melyiken van HIDEGEBB?',
        highlightValue: 'A nap: -12 °C  és  B nap: -4 °C',
        questionTypeBadge: 'Összehasonlítás',
        options: [
          'Az A napon (-12 °C)',
          'A B napon (-4 °C)',
          'Mindkettőn egyformán hideg van',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 'Az A napon (-12 °C)',
        explanation: 'A -12 °C 12 fokos fagyot jelent, míg a -4 °C csak 4 fokos fagyot, ezért -12 °C-on sokkal hidegebb van (-12 < -4).',
        breakdown: [
          { label: 'A nap', value: '-12 °C (keményebb fagy)' },
          { label: 'B nap', value: '-4 °C' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám 5-tel kisebb a nullánál a számegyenesen?',
        highlightValue: '0 - 5 = ?',
        questionTypeBadge: 'Nullánál kisebb',
        options: ['-5', '+5', '0', '-50'],
        correctAnswer: '-5',
        explanation: 'A nullától 5 egységgel balra lépve a -5-höz jutunk.',
        breakdown: [
          { label: 'Kiindulás', value: '0' },
          { label: '5 egység balra', value: '-5' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Összehasonlítás, ellentett számok, szomszédok és változások',
    range: '-50-től +50-ig',
    focus: 'Nagyságrendi összehasonlítás, ellentett pár, hőmérséklet-változás, távolság',
    color: 'blue',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Melyik relációs jel illik a két negatív szám közé?',
        highlightValue: '-8  ___  -3',
        questionTypeBadge: 'Összehasonlítás',
        options: ['< (kisebb)', '> (nagyobb)', '= (egyenlő)', '≤ (nem dönthető el)'],
        correctAnswer: '< (kisebb)',
        explanation: 'A számegyenesen a -8 balrább van, mint a -3, ezért -8 < -3. (A -8 hidegebb, mélyebb).',
        breakdown: [
          { label: '-8 helye', value: '8 egység balra a 0-tól' },
          { label: '-3 helye', value: '3 egység balra a 0-tól (jobbra van -8-hoz képest)' },
          { label: 'Eredmény', value: '-8 < -3' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a -6 szám ellentettje?',
        highlightValue: '-6 ellentettje',
        questionTypeBadge: 'Ellentett szám',
        options: ['+6 (6)', '-6', '0', '1/6'],
        correctAnswer: '+6 (6)',
        explanation: 'Egy szám ellentettje a számegyenesen a nullától azonos távolságra, de ellenkező irányban található szám: a -6 ellentettje a +6.',
        breakdown: [
          { label: 'Szám', value: '-6' },
          { label: 'Ellentettje', value: '+6' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Melyik szám a -4 közvetlen BAL és JOBB szomszédja a számegyenesen?',
        highlightValue: 'A -4 szomszédai',
        questionTypeBadge: 'Szomszédok',
        options: [
          'Bal: -5, Jobb: -3',
          'Bal: -3, Jobb: -5',
          'Bal: -4, Jobb: +4',
          'Bal: -6, Jobb: -2'
        ],
        correctAnswer: 'Bal: -5, Jobb: -3',
        explanation: 'Balra haladva a számok csökkennek (-5), jobbra haladva növekednek (-3), így -5 < -4 < -3.',
        breakdown: [
          { label: 'Kisebb szomszéd (bal)', value: '-5' },
          { label: 'Középső szám', value: '-4' },
          { label: 'Nagyobb szomszéd (jobb)', value: '-3' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hány fok lesz a hőmérséklet, ha +2 °C-ról lehűl az idő 5 °C-ot?',
        highlightValue: '+2 °C - 5 °C = ?',
        questionTypeBadge: 'Hőmérséklet-változás',
        options: ['-3 °C', '-7 °C', '+7 °C', '+3 °C'],
        correctAnswer: '-3 °C',
        explanation: '+2-ből 2-t levonva elérjük a 0 °C-ot, majd még 3-at hűlve a -3 °C-hoz jutunk.',
        breakdown: [
          { label: 'Kiindulás', value: '+2 °C' },
          { label: 'Fagypontig', value: '2 °C csökkenés ➔ 0 °C' },
          { label: 'Maradék hűlés', value: 'még 3 °C ➔ -3 °C' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Milyen távolságra van a -7 a nullától a számegyenesen?',
        highlightValue: 'Távolság az origótól (-7)',
        questionTypeBadge: 'Távolság a nullától',
        options: ['7 egység', '-7 egység', '0 egység', '14 egység'],
        correctAnswer: '7 egység',
        explanation: 'A távolság mindig nemnegatív mennyiség: a -7 pontosan 7 egységnyi távolságra van a nullától.',
        breakdown: [
          { label: 'Szám', value: '-7' },
          { label: 'Távolság a 0-tól', value: '7 egység' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik sor tartalmazza NÖVEKVŐ (legkisebbtől a legnagyobbig) sorrendben a számokat?',
        highlightValue: '-9, +3, 0, -5',
        questionTypeBadge: 'Növekvő sorrend',
        options: [
          '-9 < -5 < 0 < +3',
          '-5 < -9 < 0 < +3',
          '+3 < 0 < -5 < -9',
          '0 < -5 < -9 < +3'
        ],
        correctAnswer: '-9 < -5 < 0 < +3',
        explanation: 'A legkisebb a leghidegebb/legbalrább lévő: -9, utána -5, majd a 0, és a legnagyobb a +3.',
        breakdown: [
          { label: 'Helyes sorrend', value: '-9 < -5 < 0 < +3' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Annának 5 000 Ft volt a bankszámláján, de kifizetett egy 8 000 Ft-os számlát. Mennyi lett az új egyenlege?',
        highlightValue: '5 000 Ft - 8 000 Ft',
        questionTypeBadge: 'Egyenlegszámítás',
        options: ['-3 000 Ft', '+3 000 Ft', '-13 000 Ft', '0 Ft'],
        correctAnswer: '-3 000 Ft',
        explanation: '5 000 Ft elfogyott, és még 3 000 Ft mínuszba (hitelbe) került az egyenlege: -3 000 Ft.',
        breakdown: [
          { label: 'Kezdő egyenleg', value: '+5 000 Ft' },
          { label: 'Kiadás', value: '8 000 Ft' },
          { label: 'Végső egyenleg', value: '-3 000 Ft' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Két negatív szám közül melyik van TÁVOLABB a nullától a számegyenesen?',
        highlightValue: '-15  és  -8',
        questionTypeBadge: 'Távolság összehasonlítás',
        options: ['A -15', 'A -8', 'Egyforma távolságra vannak', 'Nem értelmezhető'],
        correctAnswer: 'A -15',
        explanation: 'A -15 távolsága a nullától 15 egység, míg a -8 távolsága csak 8 egység, tehát a -15 van távolabb.',
        breakdown: [
          { label: '-15 távolsága', value: '15 egység' },
          { label: '-8 távolsága', value: '8 egység' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Melyik szám található a -3 és a +2 KÖZÖTT a számegyenesen?',
        highlightValue: '-3 és +2 között',
        questionTypeBadge: 'Intervallum',
        options: ['-1', '-5', '+4', '-3'],
        correctAnswer: '-1',
        explanation: 'A -3 és +2 közé eső egész számok: -2, -1, 0, 1. Ezek közül a -1 szerepel az opciók között.',
        breakdown: [
          { label: 'Közé eső számok', value: '-2, -1, 0, +1' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Hány darab egész szám található szigorúan a -4 és a +3 között?',
        highlightValue: '-4 és +3 között',
        questionTypeBadge: 'Darabszám',
        options: ['6 darab', '7 darab', '5 darab', '8 darab'],
        correctAnswer: '6 darab',
        explanation: 'A számok: -3, -2, -1, 0, 1, 2. Ez pontosan 6 darab egész szám.',
        breakdown: [
          { label: 'Felsorolás', value: '-3, -2, -1, 0, 1, 2' },
          { label: 'Összesen', value: '6 db' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Összetett hőmérséklet-ingadozások, szintkülönbségek és szöveges feladványok',
    range: '-100-tól +100-ig',
    focus: 'Többlépéses változások, felezőpont, mélység-magasság különbség, állítások logikája',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-600 to-purple-700',
    iconBg: 'bg-indigo-700 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Hajnalban -6 °C volt. Délig melegedett 11 °C-ot, majd estig lehűlt 8 °C-ot. Mennyi volt az esti hőmérséklet?',
        highlightValue: '-6 + 11 - 8 = ?',
        questionTypeBadge: 'Összetett hőmérséklet',
        options: ['-3 °C', '+3 °C', '-5 °C', '+5 °C'],
        correctAnswer: '-3 °C',
        explanation: 'Déli hőmérséklet: -6 + 11 = +5 °C. Esti hőmérséklet: +5 - 8 = -3 °C.',
        breakdown: [
          { label: 'Hajnal', value: '-6 °C' },
          { label: 'Délben', value: '-6 + 11 = +5 °C' },
          { label: 'Este', value: '+5 - 8 = -3 °C' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy hegy csúcsa a tengerszint felett +150 méteren van, a közeli bányató legmélyebb pontja a tengerszint alatt -25 méteren található. Mekkora a szintkülönbség a csúcs és a tó mélye között?',
        highlightValue: '+150 m és -25 m szintkülönbsége',
        questionTypeBadge: 'Szintkülönbség',
        options: ['175 m', '125 m', '150 m', '100 m'],
        correctAnswer: '175 m',
        explanation: 'A hegycsúcstól a tengerszintig 150 m, a tengerszinttől a tó aljáig még 25 m, összesen: 150 + 25 = 175 m.',
        breakdown: [
          { label: 'Csúcstól 0-ig', value: '150 m' },
          { label: '0-tól a mélyig', value: '25 m' },
          { label: 'Teljes különbség', value: '150 + 25 = 175 m' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik szám felezi a számegyenesen a -8 és a +4 közötti szakaszt (hol van a felezőpont)?',
        highlightValue: '-8 és +4 felezőpontja',
        questionTypeBadge: 'Felezőpont',
        options: ['-2', '-4', '0', '-6'],
        correctAnswer: '-2',
        explanation: 'A távolság -8 és +4 között 12 egység. A fele 6 egység. -8-tól 6-ot lépünk jobbra: -8 + 6 = -2.',
        breakdown: [
          { label: 'Teljes távolság', value: '4 - (-8) = 12 egység' },
          { label: 'Féltáv', value: '12 : 2 = 6 egység' },
          { label: 'Felezőpont', value: '-8 + 6 = -2' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Egy cég bankszámlájának egyenlege -2 500 Ft tartozás volt. Befizettek 10 000 Ft-ot, majd kifizettek 12 000 Ft rezsit. Mennyi lett a záró egyenleg?',
        highlightValue: '-2 500 + 10 000 - 12 000',
        questionTypeBadge: 'Pénzügyi műveletsor',
        options: ['-4 500 Ft', '+4 500 Ft', '-500 Ft', '+500 Ft'],
        correctAnswer: '-4 500 Ft',
        explanation: '-2 500 + 10 000 = +7 500 Ft. Ezután 7 500 - 12 000 = -4 500 Ft.',
        breakdown: [
          { label: '1. lépés (befizetés)', value: '-2 500 + 10 000 = +7 500 Ft' },
          { label: '2. lépés (kifizetés)', value: '7 500 - 12 000 = -4 500 Ft' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik a LEGNAGYOBB kétjegyű negatív egész szám?',
        highlightValue: 'Legnagyobb 2 jegyű negatív',
        questionTypeBadge: 'Számelmélet',
        options: ['-10', '-99', '-11', '-1'],
        correctAnswer: '-10',
        explanation: 'A kétjegyű negatív számok -10-től -99-ig tartanak. A számegyenesen a leginkább jobbra lévő (legnagyobb) a -10.',
        breakdown: [
          { label: 'Tartomány', value: '-99 ... -10' },
          { label: 'Legnagyobb', value: '-10 (legközelebb a 0-hoz)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik a LEGKISEBB kétjegyű negatív egész szám?',
        highlightValue: 'Legkisebb 2 jegyű negatív',
        questionTypeBadge: 'Számelmélet',
        options: ['-99', '-10', '-90', '-100'],
        correctAnswer: '-99',
        explanation: 'A számegyenesen a leginkább balra lévő (legkisebb értékű) kétjegyű szám a -99.',
        breakdown: [
          { label: 'Tartomány', value: '-99 ... -10' },
          { label: 'Legkisebb', value: '-99 (legtávolabb a 0-tól balra)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'A lift a +3. emeletről lement 5 szintet, majd felment 1 szintet. Melyik szinten állt meg a lift?',
        highlightValue: '+3 - 5 + 1 = ?',
        questionTypeBadge: 'Lift modellezés',
        options: ['-1. szint', '-2. szint', '0. földszint', '+1. emelet'],
        correctAnswer: '-1. szint',
        explanation: '+3 - 5 = -2. szint (2. alagsor), majd onnan +1 szint = -1. szint (1. alagsor).',
        breakdown: [
          { label: '1. mozgás', value: '+3 - 5 = -2. szint' },
          { label: '2. mozgás', value: '-2 + 1 = -1. szint' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a különbség a téli leghidegebb (-18 °C) és a nyári legmelegebb (+27 °C) hőmérséklet között?',
        highlightValue: '-18 °C és +27 °C különbsége',
        questionTypeBadge: 'Hőingás / Különbség',
        options: ['45 °C', '9 °C', '35 °C', '55 °C'],
        correctAnswer: '45 °C',
        explanation: '-18-tól a 0-ig 18 °C, 0-tól +27-ig még 27 °C, összesen: 18 + 27 = 45 °C a hőingás.',
        breakdown: [
          { label: '-18-tól 0-ig', value: '18 fok' },
          { label: '0-tól 27-ig', value: '27 fok' },
          { label: 'Összesen', value: '18 + 27 = 45 °C' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik állítás HAMIS az alábbiak közül?',
        highlightValue: 'Logikai állítások',
        questionTypeBadge: 'Igaz-Hamis',
        options: [
          'Bármely negatív szám nagyobb, mint a 0',
          'Minden negatív szám kisebb, mint bármelyik pozitív szám',
          'A negatív számok ellentettje pozitív szám',
          'A -100 kisebb, mint a -1'
        ],
        correctAnswer: 'Bármely negatív szám nagyobb, mint a 0',
        explanation: 'A negatív számok definíció szerint KISEBBEK a nullánál (< 0), ezért az az állítás, hogy nagyobbak lennének, hamis.',
        breakdown: [
          { label: 'Szabály', value: 'Minden negatív szám < 0' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi az összeg értéke?',
        highlightValue: '(-15) + (+15)',
        questionTypeBadge: 'Ellentettek összege',
        options: ['0', '-30', '+30', '1'],
        correctAnswer: '0',
        explanation: 'Egy szám és ellentettjének összege mindig nulla, mert a számegyenesen ellentétes irányban egyenlő lépést teszünk meg.',
        breakdown: [
          { label: 'Szabály', value: 'a + (-a) = 0' },
          { label: 'Példa', value: '-15 + 15 = 0' }
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

interface NegativeNumbersQuizProps {
  onBack: () => void;
}

export function NegativeNumbersQuiz({ onBack }: NegativeNumbersQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCompleted(false);

    // Prepare questions with shuffled options
    const levelQuestions = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(levelQuestions);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex];
    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Keyboard shortcut listener [1, 2, 3, 4]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedLevel === null || gameMode !== 'quiz' || isCompleted) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (currentQ.options[optIdx]) {
            handleOptionSelect(currentQ.options[optIdx]);
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
  }, [selectedLevel, gameMode, currentIndex, isAnswerChecked, isCompleted, questions]);

  // 1. Initial Difficulty Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top Header */}
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
              className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
                  <span className="hidden sm:inline">Kilépés</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span className="hidden sm:inline">Teljes képernyő</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="h-8 rounded-xl px-2.5 border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-cyan-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">❄️</span>
            <span>Negatív számok Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a fagyos hőmérsékleteket, tengerszinteket, adósságot és a számegyenes elrendezését!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-cyan-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
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
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-cyan-900 dark:text-cyan-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                Negatív számok szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {NEGATIVE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-cyan-600 dark:text-cyan-400">{item.topic}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
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
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : level === 2
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-indigo-700 hover:bg-indigo-800 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-850/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
        "w-full px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
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

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
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
              <div className="flex items-center gap-1 font-black text-cyan-600 dark:text-cyan-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
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
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area */}
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
                  color={selectedLevel === 1 ? 'cyan' : selectedLevel === 2 ? 'blue' : 'indigo'}
                />
              </div>

              {/* 2-Column Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-cyan-50 to-blue-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-cyan-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-cyan-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step */}
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
                                    className="text-[10px] bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md font-mono border border-slate-200/80 dark:border-slate-700 font-bold"
                                  >
                                    <span className="text-slate-500 mr-1">{item.label}:</span>
                                    <span className="text-cyan-700 dark:text-cyan-300">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < questions.length - 1 ? 'Következő Kérdés' : 'Eredmények Megtekintése'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: Options List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Válassz egy választ:
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Billentyűk: [1] - [4]
                    </span>
                  </div>

                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    let btnStyle = "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20";

                    if (isAnswerChecked) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-xs";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                      } else {
                        btnStyle = "bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isAnswerChecked}
                        className={cn(
                          "w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-between group",
                          btnStyle
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn(
                            "w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center border",
                            isAnswerChecked && isCorrect
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : isAnswerChecked && isSelected
                              ? "bg-rose-500 border-rose-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/60 group-hover:text-cyan-800 dark:group-hover:text-cyan-300"
                          )}>
                            {idx + 1}
                          </span>
                          <span className="font-medium">{option}</span>
                        </div>

                        {isAnswerChecked && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                        {isAnswerChecked && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <NegativeNumbersMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER MODE WORKSPACE */
            <NegativeNumbersSorter
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

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                      ? "bg-slate-900 text-white dark:bg-cyan-600 dark:text-white"
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-cyan-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-cyan-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-cyan-600" />
              Negatív számok segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-cyan-300 dark:border-cyan-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                Negatív számok szabályai és tulajdonságai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="rounded-xl h-8 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
              {NEGATIVE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-cyan-600 dark:text-cyan-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-cyan-50/80 dark:bg-cyan-950/40 p-3 rounded-xl border border-cyan-200 dark:border-cyan-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Számegyenes:</strong> A számok balról jobbra növekednek. A -10 kisebb, mint a -2, mert a számegyenesen balrább van (-10 &lt; -2).</p>
              <p><strong>A 0 szerepe:</strong> A nulla se nem pozitív, se nem negatív, hanem a választó origó.</p>
              <p><strong>Ellentett:</strong> A nullától azonos távolságra lévő, ellentétes előjelű számok (pl. -5 és +5). Összegük mindig 0.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
            >
              Értem, visszatérek a gyakorláshoz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
