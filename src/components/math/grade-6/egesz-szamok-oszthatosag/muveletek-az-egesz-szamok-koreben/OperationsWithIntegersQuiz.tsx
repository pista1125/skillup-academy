import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { OperationsWithIntegersMatcher } from './OperationsWithIntegersMatcher';
import { OperationsWithIntegersSorter } from './OperationsWithIntegersSorter';

export interface OperationsWithIntegersQuizProps {
  onBack: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Azonos előjelű számok összeadása',
    formula: '(+a)+(+b) = +(a+b) | (-a)+(-b) = -(a+b)',
    note: 'Az abszolút értékeket összeadjuk, és a közös előjelet megtartjuk. Pl. (-6) + (-8) = -14.'
  },
  {
    topic: 'Különböző előjelű számok összeadása',
    formula: 'Nagyobb absz. értékből kisebb kivonása',
    note: 'A nagyobb abszolút értékű szám előjelét kapja az eredmény. Pl. (-12) + (+5) = -7, mert 12 > 5.'
  },
  {
    topic: 'Ellentett számok összege',
    formula: 'a + (-a) = 0',
    note: 'Bármely szám és ellentettjének összege mindig 0. Pl. (+15) + (-15) = 0.'
  },
  {
    topic: 'Kivonás átalakítása',
    formula: 'a - b = a + (-b)',
    note: 'Kivonás helyett az ellentett hozzáadását végezzük el. Pl. 8 - 14 = 8 + (-14) = -6.'
  },
  {
    topic: 'Zárójelfelbontás: -(-b) és -(+b)',
    formula: '-(-b) = +b | -(+b) = -b',
    note: 'Két egymást követő mínuszjel pluszra vált. Pl. -5 - (-9) = -5 + 9 = +4.'
  },
  {
    topic: 'Többtagú kifejezések csoportosítása',
    formula: 'Pozitívak összege + Negatívak összege',
    note: 'Zárójelbontás után külön összeadjuk a pozitív és negatív tagokat, majd egyetlen kivonást végzünk.'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Előjeles alapműveletek és egyszerű összeadás, kivonás',
    range: 'Egyszerű 1 és 2 tagú műveletek 20-as számkörben',
    focus: 'Azonos és különböző előjelű összeadások, ellentettek összege, hőmérséklet és adósság',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a (+8) + (+14) összeadás eredménye?',
        highlightValue: '(+8) + (+14)',
        questionTypeBadge: 'Azonos előjelű összeadás',
        options: ['+22', '+6', '-22', '+112'],
        correctAnswer: '+22',
        explanation: 'Két pozitív szám összege pozitív: az abszolút értékeket összeadjuk: 8 + 14 = 22.',
        breakdown: [
          { label: 'Előjelek', value: 'Mindkettő pozitív (+)' },
          { label: 'Számolás', value: '8 + 14 = 22 (+22)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a (-7) + (-9) összeadás eredménye?',
        highlightValue: '(-7) + (-9)',
        questionTypeBadge: 'Két negatív szám összeadása',
        options: ['-16', '+16', '-2', '+2'],
        correctAnswer: '-16',
        explanation: 'Két negatív szám összeadásakor az abszolút értékeket összeadjuk (7 + 9 = 16), és elé kitesszük a közös mínusz előjelet: -16.',
        breakdown: [
          { label: 'Előjelek', value: 'Mindkettő negatív (-)' },
          { label: 'Számolás', value: '-(7 + 9) = -16' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a (-12) + (+5) művelet eredménye?',
        highlightValue: '(-12) + (+5)',
        questionTypeBadge: 'Különböző előjelek összeadása',
        options: ['-7', '+7', '-17', '+17'],
        correctAnswer: '-7',
        explanation: 'A negatív szám abszolút értéke nagyobb (12 > 5), így a nagyobból kivonjuk a kisebbet: 12 - 5 = 7, előjele negatív marad: -7.',
        breakdown: [
          { label: 'Nagyobb absz. érték', value: '|-12| = 12 (negatív túlsúly)' },
          { label: 'Különbség', value: '-(12 - 5) = -7' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a (+15) + (-6) összeadás értéke?',
        highlightValue: '(+15) + (-6)',
        questionTypeBadge: 'Pozitív többlet összeadása',
        options: ['+9', '-9', '+21', '-21'],
        correctAnswer: '+9',
        explanation: 'A pozitív szám abszolút értéke nagyobb (15 > 6), így 15 - 6 = 9, az eredmény pozitív: +9.',
        breakdown: [
          { label: 'Nagyobb absz. érték', value: '|+15| = 15 (pozitív túlsúly)' },
          { label: 'Különbség', value: '15 - 6 = +9' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a (-18) + (+18) összeadás eredménye?',
        highlightValue: '(-18) + (+18)',
        questionTypeBadge: 'Ellentett számok összege',
        options: ['0', '-36', '+36', '1'],
        correctAnswer: '0',
        explanation: 'Két ellentett szám összege mindig pontosan 0, mert a számegyenesen ellentétes irányban egyforma távolságra vannak az origótól.',
        breakdown: [
          { label: 'Szabály', value: 'a + (-a) = 0' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a (+4) - (+9) kivonás eredménye?',
        highlightValue: '(+4) - (+9)',
        questionTypeBadge: 'Kisebb számból nagyobb kivonása',
        options: ['-5', '+5', '-13', '+13'],
        correctAnswer: '-5',
        explanation: 'A kivonást átalakítjuk ellentett hozzáadásává: (+4) + (-9) = -5.',
        breakdown: [
          { label: 'Átalakítás', value: '4 - 9 = 4 + (-9)' },
          { label: 'Eredmény', value: '-5' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a (-6) - (+7) kivonás eredménye?',
        highlightValue: '(-6) - (+7)',
        questionTypeBadge: 'Kivonás negatív számból',
        options: ['-13', '+1', '-1', '+13'],
        correctAnswer: '-13',
        explanation: 'A kivonást átalakítjuk: (-6) + (-7) = -13. A számegyenesen a -6-tól még 7 egységet balra lépünk.',
        breakdown: [
          { label: 'Átalakítás', value: '-6 - 7 = -6 + (-7)' },
          { label: 'Eredmény', value: '-13' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Reggel a hőmérséklet -3 °C volt. Délre 8 °C-ot melegedett a levegő. Hány °C lett délben?',
        highlightValue: '-3 °C + 8 °C',
        questionTypeBadge: 'Hőmérsékleti feladat',
        options: ['+5 °C', '-11 °C', '+11 °C', '-5 °C'],
        correctAnswer: '+5 °C',
        explanation: 'A melegedés hozzáadást jelent: -3 + 8 = +5 °C.',
        breakdown: [
          { label: 'Kezdő érték', value: '-3 °C' },
          { label: 'Változás', value: '+8 °C melegedés' },
          { label: 'Végeredmény', value: '-3 + 8 = +5 °C' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 0 + (-15) művelet eredménye?',
        highlightValue: '0 + (-15)',
        questionTypeBadge: 'Műveletek nullával',
        options: ['-15', '+15', '0', 'Nem értelmezett'],
        correctAnswer: '-15',
        explanation: 'A nullához bármilyen számot hozzáadva maga a szám marad: 0 + (-15) = -15.',
        breakdown: [
          { label: 'Szabály', value: '0 + a = a' },
          { label: 'Eredmény', value: '-15' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a (-20) - 0 kivonás eredménye?',
        highlightValue: '(-20) - 0',
        questionTypeBadge: 'Nulla kivonása',
        options: ['-20', '+20', '0', '-40'],
        correctAnswer: '-20',
        explanation: 'Egy számból nullát kivonva a szám értéke nem változik: (-20) - 0 = -20.',
        breakdown: [
          { label: 'Szabály', value: 'a - 0 = a' },
          { label: 'Eredmény', value: '-20' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Zárójelfelbontás, két előjel találkozása és nyitott mondatok',
    range: 'Összetett 2-3 tagú műveletek és szöveges kontextus',
    focus: '-(-b) = +b szabály, több tag összevonása, hiányzó tag keresése, bankszámla feladatok',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a (-8) - (-14) kifejezés értéke a zárójelfelbontás után?',
        highlightValue: '(-8) - (-14)',
        questionTypeBadge: 'Két mínuszjel találkozása',
        options: ['+6', '-22', '-6', '+22'],
        correctAnswer: '+6',
        explanation: 'A két mínuszjel pluszra vált: -8 - (-14) = -8 + 14 = +6.',
        breakdown: [
          { label: 'Zárójelfelbontás', value: '-8 - (-14) = -8 + 14' },
          { label: 'Összegzés', value: '14 - 8 = +6' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 15 - (-9) kivonás pontos értéke?',
        highlightValue: '15 - (-9)',
        questionTypeBadge: 'Kivonás negatív számból',
        options: ['24', '6', '-24', '-6'],
        correctAnswer: '24',
        explanation: 'A negatív szám kivonása hozzáadást jelent: 15 - (-9) = 15 + 9 = 24.',
        breakdown: [
          { label: 'Szabály', value: 'a - (-b) = a + b' },
          { label: 'Számolás', value: '15 + 9 = 24' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a -10 - (-10) kifejezés értéke?',
        highlightValue: '-10 - (-10)',
        questionTypeBadge: 'Önmagából való kivonás',
        options: ['0', '-20', '+20', '1'],
        correctAnswer: '0',
        explanation: 'Bármely számból kivonva önmagát, 0-t kapunk: -10 - (-10) = -10 + 10 = 0.',
        breakdown: [
          { label: 'Zárójel felbontása', value: '-10 + 10' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a (-4) + (+9) - (+7) műveletsor eredménye?',
        highlightValue: '(-4) + (+9) - (+7)',
        questionTypeBadge: '3 tagú műveletsor',
        options: ['-2', '+12', '+2', '-20'],
        correctAnswer: '-2',
        explanation: 'Zárójelbontás: -4 + 9 - 7. Csoportosítás: +9 és (-4 - 7 = -11), így 9 - 11 = -2.',
        breakdown: [
          { label: 'Zárójelbontás', value: '-4 + 9 - 7' },
          { label: 'Lépésről lépésre', value: '5 - 7 = -2' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 12 - 18 + 7 előjeles összevonás értéke?',
        highlightValue: '12 - 18 + 7',
        questionTypeBadge: 'Pozitívak és negatívak összevonása',
        options: ['+1', '-1', '+13', '-13'],
        correctAnswer: '+1',
        explanation: 'Összevonjuk a pozitívakat: 12 + 7 = 19. Ebből levonjuk a 18-at: 19 - 18 = +1.',
        breakdown: [
          { label: 'Pozitívak', value: '12 + 7 = 19' },
          { label: 'Negatívak', value: '-18' },
          { label: 'Eredmény', value: '19 - 18 = +1' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a -15 + (-8) - (-12) kifejezés értéke?',
        highlightValue: '-15 + (-8) - (-12)',
        questionTypeBadge: 'Összetett zárójeles művelet',
        options: ['-11', '-35', '+5', '-5'],
        correctAnswer: '-11',
        explanation: 'Zárójelbontás után: -15 - 8 + 12 = -23 + 12 = -11.',
        breakdown: [
          { label: 'Zárójelbontás', value: '-15 - 8 + 12' },
          { label: 'Negatívak összege', value: '-15 - 8 = -23' },
          { label: 'Végeredmény', value: '-23 + 12 = -11' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Milyen szám hiányzik a nyitott mondatból: (-9) + ▢ = +4 ?',
        highlightValue: '(-9) + ▢ = +4',
        questionTypeBadge: 'Nyitott mondat (ismeretlen tag)',
        options: ['+13', '-13', '+5', '-5'],
        correctAnswer: '+13',
        explanation: 'A hiányzó tag kiszámítása: ▢ = 4 - (-9) = 4 + 9 = +13. Ellenőrzés: -9 + 13 = 4.',
        breakdown: [
          { label: 'Kiszámítás', value: '▢ = 4 - (-9)' },
          { label: 'Eredmény', value: '4 + 9 = +13' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Milyen szám hiányzik a nyitott mondatból: ▢ - (-6) = +2 ?',
        highlightValue: '▢ - (-6) = +2',
        questionTypeBadge: 'Nyitott mondat (kisebbítendő)',
        options: ['-4', '+8', '+4', '-8'],
        correctAnswer: '-4',
        explanation: 'Zárójelbontással: ▢ + 6 = 2, amiből ▢ = 2 - 6 = -4. Ellenőrzés: -4 - (-6) = -4 + 6 = 2.',
        breakdown: [
          { label: 'Egyszerűsítés', value: '▢ + 6 = 2' },
          { label: 'Eredmény', value: '▢ = 2 - 6 = -4' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Egy búvár -14 méteren úszik (14 m-rel a vízszint alatt). Ereszkedik még 8 métert, majd feljebb úszik 15 métert. Milyen mélységben van most?',
        highlightValue: '-14 - 8 + 15',
        questionTypeBadge: 'Gyakorlati szöveges feladat',
        options: ['-7 m (7 m mélyen)', '-37 m', '+7 m (felszín felett)', '-21 m'],
        correctAnswer: '-7 m (7 m mélyen)',
        explanation: 'A műveletsor: -14 - 8 + 15 = -22 + 15 = -7 méter, tehát 7 méterrel van a vízfelszín alatt.',
        breakdown: [
          { label: '1. lépés (ereszkedés)', value: '-14 - 8 = -22 m' },
          { label: '2. lépés (emelkedés)', value: '-22 + 15 = -7 m' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Peti bankszámla-egyenlege -4500 Ft volt. Érkezett 12 000 Ft ösztöndíj, majd levontak 3500 Ft tagsági díjat. Mennyi lett a számla egyenlege?',
        highlightValue: '-4500 + 12000 - 3500',
        questionTypeBadge: 'Pénzügyi szöveges feladat',
        options: ['+4000 Ft', '+5000 Ft', '-4000 Ft', '+11000 Ft'],
        correctAnswer: '+4000 Ft',
        explanation: 'Kiszámítás: -4500 + 12000 - 3500 = 7500 - 3500 = +4000 Ft.',
        breakdown: [
          { label: 'Kezdő + jóváírás', value: '-4500 + 12000 = +7500 Ft' },
          { label: 'Levonás után', value: '7500 - 3500 = +4000 Ft' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Összetett műveleti sorrend, több zárójel és algebrai feladatok',
    range: 'Haladó előjeles kifejezések, abszolút értékek és egyenletek',
    focus: 'Többemeletes zárójelek, abszolút értékek műveletei, behelyettesítéses algebrai feladatok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a -(-14) + (-20) - (-8) - (+15) kifejezés egyszerűsített értéke?',
        highlightValue: '-(-14) + (-20) - (-8) - (+15)',
        questionTypeBadge: 'Többtagú előjeles összevonás',
        options: ['-13', '+27', '-41', '+13'],
        correctAnswer: '-13',
        explanation: 'Zárójelbontás: 14 - 20 + 8 - 15. Pozitívak: 14 + 8 = 22. Negatívak: -20 - 15 = -35. Végeredmény: 22 - 35 = -13.',
        breakdown: [
          { label: 'Zárójelfelbontás', value: '14 - 20 + 8 - 15' },
          { label: 'Pozitívak / Negatívak', value: '22 - 35' },
          { label: 'Végeredmény', value: '-13' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a | -18 + 7 | - | -6 - 8 | abszolút értékes kifejezés pontos értéke?',
        highlightValue: '| -18 + 7 | - | -6 - 8 |',
        questionTypeBadge: 'Abszolút értékek művelete',
        options: ['-3', '+25', '-25', '+3'],
        correctAnswer: '-3',
        explanation: 'Belső műveletek: |-11| - |-14| = 11 - 14 = -3.',
        breakdown: [
          { label: '1. abszolút érték', value: '|-18 + 7| = |-11| = 11' },
          { label: '2. abszolút érték', value: '|-6 - 8| = |-14| = 14' },
          { label: 'Kivonás', value: '11 - 14 = -3' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi a -( -(-8) ) + (-12) - (-15) kifejezés értéke?',
        highlightValue: '-( -(-8) ) + (-12) - (-15)',
        questionTypeBadge: 'Többszörös előjelváltás',
        options: ['-5', '+11', '-35', '+19'],
        correctAnswer: '-5',
        explanation: '-( -(-8) ) értéke -8 (páratlan mínusz). Így: -8 - 12 + 15 = -20 + 15 = -5.',
        breakdown: [
          { label: '1. tag felbontása', value: '-( -(-8) ) = -8' },
          { label: 'Többi tag', value: '-8 - 12 + 15' },
          { label: 'Eredmény', value: '-20 + 15 = -5' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a (15 - 28) - (-7 + 19) zárójeles kifejezés eredménye?',
        highlightValue: '(15 - 28) - (-7 + 19)',
        questionTypeBadge: 'Zárójelek kivonása',
        options: ['-25', '-1', '+1', '+25'],
        correctAnswer: '-25',
        explanation: '1. zárójel: 15 - 28 = -13. 2. zárójel: -7 + 19 = 12. Különbség: -13 - (+12) = -13 - 12 = -25.',
        breakdown: [
          { label: '1. zárójel', value: '15 - 28 = -13' },
          { label: '2. zárójel', value: '-7 + 19 = 12' },
          { label: 'Végeredmény', value: '-13 - 12 = -25' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Milyen számra igaz a nyitott mondat: -14 - ▢ + (-8) = -5 ?',
        highlightValue: '-14 - ▢ + (-8) = -5',
        questionTypeBadge: 'Összetett nyitott mondat',
        options: ['-17', '+17', '-27', '+27'],
        correctAnswer: '-17',
        explanation: 'Összevonjuk az ismert tagokat: -14 - 8 - ▢ = -5 ➔ -22 - ▢ = -5 ➔ ▢ = -22 - (-5) = -22 + 5 = -17.',
        breakdown: [
          { label: 'Összevonás', value: '-22 - ▢ = -5' },
          { label: 'Kifejezés', value: '▢ = -22 - (-5) = -17' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Ha a = -6 és b = -9, mennyi az a - b - |a| algebrai kifejezés helyettesítési értéke?',
        highlightValue: 'a = -6, b = -9 esetén: a - b - |a|',
        questionTypeBadge: 'Algebrai behelyettesítés',
        options: ['-3', '+9', '-21', '+3'],
        correctAnswer: '-3',
        explanation: 'Behelyettesítve: (-6) - (-9) - |-6| = -6 + 9 - 6 = 3 - 6 = -3.',
        breakdown: [
          { label: 'Behelyettesítés', value: '-6 - (-9) - |-6|' },
          { label: 'Egyszerűsítés', value: '-6 + 9 - 6' },
          { label: 'Eredmény', value: '3 - 6 = -3' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Melyik művelet eredménye a LEGKISEBB az alábbiak közül?',
        highlightValue: 'Legkisebb érték kiválasztása',
        questionTypeBadge: 'Kifejezések összehasonlítása',
        options: [
          '-18 + (-4)',
          '-18 - (-4)',
          '+18 + (-25)',
          '0 - 15'
        ],
        correctAnswer: '-18 + (-4)',
        explanation: 'Számoljuk ki mindet: A: -18 - 4 = -22; B: -18 + 4 = -14; C: 18 - 25 = -7; D: -15. A legkisebb a -22.',
        breakdown: [
          { label: 'A: -18 + (-4)', value: '-22 (Legkisebb!)' },
          { label: 'B: -18 - (-4)', value: '-14' },
          { label: 'C: +18 + (-25)', value: '-7' },
          { label: 'D: 0 - 15', value: '-15' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'A Holt-tenger felszíne -430 méter, a Mount Everest csúcsa +8848 méter. Mekkora a magasságkülönbség a két pont között?',
        highlightValue: '+8848 m - (-430 m)',
        questionTypeBadge: 'Földrajzi magasságkülönbség',
        options: ['9278 m', '8418 m', '-8418 m', '9000 m'],
        correctAnswer: '9278 m',
        explanation: 'A különbség a legnagyobb és a legkisebb magasság kivonása: 8848 - (-430) = 8848 + 430 = 9278 méter.',
        breakdown: [
          { label: 'Képlet', value: 'Magasságkülönbség = Magasabb - Alacsonyabb' },
          { label: 'Számolás', value: '8848 - (-430) = 8848 + 430 = 9278 m' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a -1 + 2 - 3 + 4 - 5 + 6 - 7 + 8 - 9 + 10 számsorozat összege?',
        highlightValue: '-1 + 2 - 3 + 4 - 5 + 6 - 7 + 8 - 9 + 10',
        questionTypeBadge: 'Trükkös sorozatösszeg',
        options: ['+5', '0', '-5', '+10'],
        correctAnswer: '+5',
        explanation: 'Képezzünk számpárokat: (-1 + 2) + (-3 + 4) + (-5 + 6) + (-7 + 8) + (-9 + 10) = 1 + 1 + 1 + 1 + 1 = +5.',
        breakdown: [
          { label: 'Párok', value: '5 darab (+1) értékű számpár' },
          { label: 'Összeg', value: '5 · 1 = +5' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a -25 - [ -14 + (-6 - (-9)) ] összetett szögletes zárójeles kifejezés értéke?',
        highlightValue: '-25 - [ -14 + (-6 - (-9)) ]',
        questionTypeBadge: 'Többszörösen beágyazott zárójel',
        options: ['-14', '-36', '-22', '+14'],
        correctAnswer: '-14',
        explanation: 'Belső kerek zárójel: -6 + 9 = 3. Szögletes zárójel: -14 + 3 = -11. Végső kivonás: -25 - (-11) = -25 + 11 = -14.',
        breakdown: [
          { label: '1. belső zárójel', value: '-6 - (-9) = -6 + 9 = 3' },
          { label: '2. szögletes zárójel', value: '-14 + 3 = -11' },
          { label: '3. végeredmény', value: '-25 - (-11) = -25 + 11 = -14' }
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
      <OperationsWithIntegersMatcher
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
      <OperationsWithIntegersSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function OperationsWithIntegersQuiz({ onBack }: OperationsWithIntegersQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🔢"
      topicBadge="🔢 6. Osztály • I. Egész számok"
      title="Műveletek az egész számok körében kvíz"
      subtitle="Gyakorold az egész számok összeadását, kivonását, a zárójelfelbontást és az összetett feladatokat 3 nehézségi szinten!"
      cheatSheetTitle="Műveletek az egész számokkal szabályok"
      hintText="💡 Két azonos előjel összeadásakor az összeg megtartja a közös előjelet, ellentetteknél a nagyobb abszolút érték dominál!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="orange"
    />
  );
}
