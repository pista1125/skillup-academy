import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { IntegerMultiplicationMatcher } from './IntegerMultiplicationMatcher';
import { IntegerMultiplicationSorter } from './IntegerMultiplicationSorter';

export interface IntegerMultiplicationQuizProps {
  onBack: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Azonos előjelek szorzata (+)',
    formula: '(+) · (+) = +  |  (-) · (-) = +',
    note: 'Két azonos előjelű szám szorzata mindig pozitív! Két mínusz szorzata pluszra vált.'
  },
  {
    topic: 'Különböző előjelek szorzata (-)',
    formula: '(+) · (-) = -  |  (-) · (+) = -',
    note: 'Egy pozitív és egy negatív szám szorzata mindig negatív szám lesz.'
  },
  {
    topic: 'Szorzás nullával (0)',
    formula: 'a · 0 = 0 · a = 0',
    note: 'Bármely számot nullával szorozva a szorzat pontosan 0 (elnyeli a szorzást).'
  },
  {
    topic: 'Páros számú negatív tényező',
    formula: '(-a) · (-b) · (-c) · (-d) = +',
    note: 'Ha a szorzatban páros számú (2, 4, 6, ...) negatív tényező van, az eredmény pozitív.'
  },
  {
    topic: 'Páratlan számú negatív tényező',
    formula: '(-a) · (-b) · (-c) = -',
    note: 'Ha a szorzatban páratlan számú (1, 3, 5, ...) negatív tényező van, az eredmény negatív marad.'
  },
  {
    topic: 'Zárójel vs Zárójel nélküli hatvány',
    formula: '(-a)² = +a²  |  -a² = -(a²)',
    note: '(-3)² = (-3)·(-3) = +9, de -3² = -(3·3) = -9!'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Kéttényezős alap szorzások, előjelszabályok és a nulla',
    range: 'Egész számok szorzása a 100-as számkörben',
    focus: 'Előjelek szorzása, nulla szorzata, abszolút értékek szorzata',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a (+7) · (+8) szorzás eredménye?',
        highlightValue: '(+7) · (+8)',
        questionTypeBadge: 'Pozitív · Pozitív',
        options: ['+56', '-56', '+15', '+54'],
        correctAnswer: '+56',
        explanation: 'Két pozitív szám szorzata pozitív: (+7) · (+8) = +56.',
        breakdown: [
          { label: 'Előjelek', value: '(+) · (+) = (+)' },
          { label: 'Szorzat', value: '7 · 8 = 56' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a (-6) · (-9) szorzás eredménye?',
        highlightValue: '(-6) · (-9)',
        questionTypeBadge: 'Két negatív szám szorzata',
        options: ['+54', '-54', '-15', '+15'],
        correctAnswer: '+54',
        explanation: 'Két negatív szám szorzata mindig POZITÍV: (-6) · (-9) = +54.',
        breakdown: [
          { label: 'Előjelek', value: '(-) · (-) = (+)' },
          { label: 'Szorzat', value: '6 · 9 = 54 (+54)' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a (+5) · (-7) szorzás eredménye?',
        highlightValue: '(+5) · (-7)',
        questionTypeBadge: 'Pozitív · Negatív',
        options: ['-35', '+35', '-2', '-12'],
        correctAnswer: '-35',
        explanation: 'Különböző előjelű számok szorzata negatív: (+5) · (-7) = -35.',
        breakdown: [
          { label: 'Előjelek', value: '(+) · (-) = (-)' },
          { label: 'Szorzat', value: '-(5 · 7) = -35' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a (-8) · (+4) szorzás eredménye?',
        highlightValue: '(-8) · (+4)',
        questionTypeBadge: 'Negatív · Pozitív',
        options: ['-32', '+32', '-4', '-12'],
        correctAnswer: '-32',
        explanation: 'Negatív szorozva pozitívval negatív eredményt ad: (-8) · (+4) = -32.',
        breakdown: [
          { label: 'Előjelek', value: '(-) · (+) = (-)' },
          { label: 'Szorzat', value: '-(8 · 4) = -32' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a (-15) · 0 szorzás eredménye?',
        highlightValue: '(-15) · 0',
        questionTypeBadge: 'Szorzás nullával',
        options: ['0', '-15', '+15', 'Nem értelmezhető'],
        correctAnswer: '0',
        explanation: 'Bármely számot nullával szorozva a szorzat mindig pontosan 0.',
        breakdown: [
          { label: 'Szabály', value: 'a · 0 = 0' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 0 · (+24) szorzás eredménye?',
        highlightValue: '0 · (+24)',
        questionTypeBadge: 'Nulla szorzandó',
        options: ['0', '+24', '-24', '1'],
        correctAnswer: '0',
        explanation: '0 szorozva bármilyen számmal 0-t ad eredményül.',
        breakdown: [
          { label: 'Szabály', value: '0 · a = 0' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a (-1) · (-1) szorzás eredménye?',
        highlightValue: '(-1) · (-1)',
        questionTypeBadge: 'Mínusz egy szorzata',
        options: ['+1', '-1', '0', '-2'],
        correctAnswer: '+1',
        explanation: 'Két negatív szám szorzata pozitív: (-1) · (-1) = +1.',
        breakdown: [
          { label: 'Előjelek', value: '(-) · (-) = (+)' },
          { label: 'Szorzat', value: '1 · 1 = 1 (+1)' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a (-12) · (+5) szorzás értéke?',
        highlightValue: '(-12) · (+5)',
        questionTypeBadge: 'Különböző előjelek',
        options: ['-60', '+60', '-7', '+7'],
        correctAnswer: '-60',
        explanation: 'Egy negatív és egy pozitív szám szorzata negatív: -(12 · 5) = -60.',
        breakdown: [
          { label: 'Előjel', value: 'Negatív (-)' },
          { label: 'Számolás', value: '12 · 5 = 60 (-60)' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a (+11) · (-11) szorzás értéke?',
        highlightValue: '(+11) · (-11)',
        questionTypeBadge: 'Ellentett számok szorzata',
        options: ['-121', '+121', '0', '-22'],
        correctAnswer: '-121',
        explanation: 'Két egymásnak ellentett szám szorzata (ha nem 0) mindig negatív: -(11 · 11) = -121.',
        breakdown: [
          { label: 'Előjel', value: '(+) · (-) = (-)' },
          { label: 'Számolás', value: '11 · 11 = 121 (-121)' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a (-20) · (-4) szorzás eredménye?',
        highlightValue: '(-20) · (-4)',
        questionTypeBadge: 'Két negatív szám',
        options: ['+80', '-80', '-24', '+24'],
        correctAnswer: '+80',
        explanation: 'Azonos negatív előjelek szorzata pozitív: (-20) · (-4) = +80.',
        breakdown: [
          { label: 'Előjel', value: '(-) · (-) = (+)' },
          { label: 'Szorzat', value: '20 · 4 = 80 (+80)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Többtényezős szorzatok, negatív hatványok és disztributivitás',
    range: '3 és 4 tényezős szorzatok, hatványozás és zárójelek',
    focus: 'Negatív tényezők számlálása, (-a)ⁿ hatványok, széttagolás',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a (-2) · (-3) · (-4) háromtényezős szorzat értéke?',
        highlightValue: '(-2) · (-3) · (-4)',
        questionTypeBadge: '3 negatív tényező',
        options: ['-24', '+24', '-9', '+9'],
        correctAnswer: '-24',
        explanation: 'Páratlan számú (3 db) negatív tényező esetén az eredmény negatív: (+6) · (-4) = -24.',
        breakdown: [
          { label: '1. lépés', value: '(-2) · (-3) = +6' },
          { label: '2. lépés', value: '(+6) · (-4) = -24' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a (-5) · (-2) · (-6) · (-1) négytényezős szorzat értéke?',
        highlightValue: '(-5) · (-2) · (-6) · (-1)',
        questionTypeBadge: '4 negatív tényező',
        options: ['+60', '-60', '+120', '-120'],
        correctAnswer: '+60',
        explanation: 'Páros számú (4 db) negatív tényező szorzata POZITÍV: 10 · 6 = +60.',
        breakdown: [
          { label: 'Párosítás', value: '[(-5)·(-2)] · [(-6)·(-1)]' },
          { label: 'Részeredmények', value: '(+10) · (+6) = +60' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a (-3)² kifejezés pontos értéke?',
        highlightValue: '(-3)²',
        questionTypeBadge: 'Negatív szám négyzete',
        options: ['+9', '-9', '-6', '+6'],
        correctAnswer: '+9',
        explanation: 'A négyzetre emelés azt jelenti, hogy a számot önmagával szorozzuk: (-3) · (-3) = +9.',
        breakdown: [
          { label: 'Kifejtve', value: '(-3) · (-3)' },
          { label: 'Eredmény', value: '+9' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a (-2)³ kifejezés pontos értéke?',
        highlightValue: '(-2)³',
        questionTypeBadge: 'Negatív szám köbe',
        options: ['-8', '+8', '-6', '+6'],
        correctAnswer: '-8',
        explanation: 'Páratlan kitevő (3) esetén a negatív alap negatív marad: (-2) · (-2) · (-2) = 4 · (-2) = -8.',
        breakdown: [
          { label: 'Kifejtve', value: '(-2) · (-2) · (-2)' },
          { label: 'Eredmény', value: '-8' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a (-1)¹⁰ kifejezés értéke?',
        highlightValue: '(-1)¹⁰',
        questionTypeBadge: 'Páros kitevőjű hatvány',
        options: ['+1', '-1', '-10', '+10'],
        correctAnswer: '+1',
        explanation: 'Mivel a kitevő (10) páros szám, a -1 tízszeres szorzata pozitív egy: +1.',
        breakdown: [
          { label: 'Kitevő', value: '10 (páros)' },
          { label: 'Eredmény', value: '+1' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a (-1)¹⁵ kifejezés értéke?',
        highlightValue: '(-1)¹⁵',
        questionTypeBadge: 'Páratlan kitevőjű hatvány',
        options: ['-1', '+1', '-15', '+15'],
        correctAnswer: '-1',
        explanation: 'Mivel a kitevő (15) páratlan szám, a szorzat negatív marad: -1.',
        breakdown: [
          { label: 'Kitevő', value: '15 (páratlan)' },
          { label: 'Eredmény', value: '-1' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a (-4) · (10 - 3) kifejezés értéke?',
        highlightValue: '(-4) · (10 - 3)',
        questionTypeBadge: 'Zárójeles szorzás',
        options: ['-28', '+28', '-52', '+52'],
        correctAnswer: '-28',
        explanation: 'Először a zárójelben: 10 - 3 = 7. Majd a szorzás: (-4) · 7 = -28.',
        breakdown: [
          { label: 'Zárójel', value: '10 - 3 = 7' },
          { label: 'Szorzás', value: '(-4) · 7 = -28' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Számold ki ügyesen a (-5) · 12 + (-5) · 8 kifejezést a disztributivitás segítségével!',
        highlightValue: '(-5) · 12 + (-5) · 8',
        questionTypeBadge: 'Közös tényező kiemelése',
        options: ['-100', '+100', '-50', '-20'],
        correctAnswer: '-100',
        explanation: 'Kiemeljük a (-5)-öt: (-5) · (12 + 8) = (-5) · 20 = -100.',
        breakdown: [
          { label: 'Kiemelés', value: '(-5) · (12 + 8)' },
          { label: 'Számolás', value: '(-5) · 20 = -100' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a (-8) · (-2) · 0 · (-15) szorzat értéke?',
        highlightValue: '(-8) · (-2) · 0 · (-15)',
        questionTypeBadge: 'Nulla a tényezők között',
        options: ['0', '+240', '-240', 'Nem értelmezhető'],
        correctAnswer: '0',
        explanation: 'Mivel a szorzat egyik tényezője nulla, a teljes kifejezés értéke azonnal 0 lesz.',
        breakdown: [
          { label: 'Szabály', value: 'Ha bármely tényező 0, a szorzat 0' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a -7² kifejezés pontos értéke (zárójel nélkül!)?',
        highlightValue: '-7²',
        questionTypeBadge: 'Zárójel nélküli előjel csapda',
        options: ['-49', '+49', '-14', '+14'],
        correctAnswer: '-49',
        explanation: 'Zárójel nélkül a hatványozás erősebb az előjelnél: -7² = -(7 · 7) = -49. (Csak (-7)² lenne +49).',
        breakdown: [
          { label: 'Műveleti sorrend', value: '-(7²)' },
          { label: 'Eredmény', value: '-(49) = -49' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Összetett műveleti sorrend, szögletes zárójelek és abszolút értékek',
    range: 'Többszörösen beágyazott kifejezések és algebrai feladatok',
    focus: 'Műveleti sorrend egész számokkal, abszolút értékes szorzások, behelyettesítés',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a (-4) · (-5) - 3 · (-6) összetett kifejezés értéke?',
        highlightValue: '(-4) · (-5) - 3 · (-6)',
        questionTypeBadge: 'Két szorzás kivonása',
        options: ['+38', '-38', '+2', '-2'],
        correctAnswer: '+38',
        explanation: 'Először a szorzások: (-4)·(-5) = 20, és 3·(-6) = -18. Majd a kivonás: 20 - (-18) = 20 + 18 = +38.',
        breakdown: [
          { label: '1. szorzat', value: '(-4) · (-5) = 20' },
          { label: '2. szorzat', value: '3 · (-6) = -18' },
          { label: 'Kivonás', value: '20 - (-18) = +38' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 15 - (-2) · (-8) műveletsor értéke?',
        highlightValue: '15 - (-2) · (-8)',
        questionTypeBadge: 'Műveleti sorrend',
        options: ['-1', '+31', '-31', '+1'],
        correctAnswer: '-1',
        explanation: 'A szorzás megelőzi a kivonást: (-2) · (-8) = +16. Ebből: 15 - (+16) = 15 - 16 = -1.',
        breakdown: [
          { label: 'Szorzás', value: '(-2) · (-8) = +16' },
          { label: 'Kivonás', value: '15 - 16 = -1' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi a (-3) · [ -4 - (-10) ] szögletes zárójeles kifejezés értéke?',
        highlightValue: '(-3) · [ -4 - (-10) ]',
        questionTypeBadge: 'Szögletes zárójel',
        options: ['-18', '+18', '+42', '-42'],
        correctAnswer: '-18',
        explanation: 'Szögletes zárójelen belül: -4 + 10 = +6. Szorzás: (-3) · (+6) = -18.',
        breakdown: [
          { label: 'Belső rész', value: '-4 - (-10) = -4 + 10 = 6' },
          { label: 'Szorzás', value: '(-3) · 6 = -18' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a |-6| · (-4) + |-5| · |-3| kifejezés értéke?',
        highlightValue: '|-6| · (-4) + |-5| · |-3|',
        questionTypeBadge: 'Abszolút értékes szorzás',
        options: ['-9', '+9', '-39', '+39'],
        correctAnswer: '-9',
        explanation: 'Abszolút értékek után: 6 · (-4) + 5 · 3 = -24 + 15 = -9.',
        breakdown: [
          { label: 'Abszolút értékek', value: '6 · (-4) + 5 · 3' },
          { label: 'Szorzások', value: '-24 + 15' },
          { label: 'Összeg', value: '-9' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a (-2)⁴ - (-2)³ kifejezés pontos értéke?',
        highlightValue: '(-2)⁴ - (-2)³',
        questionTypeBadge: 'Hatványok különbsége',
        options: ['+24', '+8', '-24', '-8'],
        correctAnswer: '+24',
        explanation: '(-2)⁴ = +16, és (-2)³ = -8. Különbségük: 16 - (-8) = 16 + 8 = +24.',
        breakdown: [
          { label: '(-2)⁴', value: '+16 (páros kitevő)' },
          { label: '(-2)³', value: '-8 (páratlan kitevő)' },
          { label: 'Kivonás', value: '16 - (-8) = +24' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a -[ (-3) · (-4) · (-5) ] kifejezés értéke?',
        highlightValue: '-[ (-3) · (-4) · (-5) ]',
        questionTypeBadge: 'Külső előjel szorzattal',
        options: ['+60', '-60', '+30', '-30'],
        correctAnswer: '+60',
        explanation: 'Belső szorzat: (-3)·(-4)·(-5) = -60. A külső mínusszal: -(-60) = +60.',
        breakdown: [
          { label: 'Belső szorzat', value: '(-3) · (-4) · (-5) = -60' },
          { label: 'Külső mínusz', value: '-(-60) = +60' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a (-10) · [ 25 - 3 · 9 ] kifejezés értéke?',
        highlightValue: '(-10) · [ 25 - 3 · 9 ]',
        questionTypeBadge: 'Műveleti sorrend zárójelben',
        options: ['+20', '-20', '+200', '-200'],
        correctAnswer: '+20',
        explanation: 'Zárójelben a szorzás előbb: 3 · 9 = 27. Zárójel értéke: 25 - 27 = -2. Végső szorzás: (-10) · (-2) = +20.',
        breakdown: [
          { label: '1. zárójel szorzás', value: '3 · 9 = 27' },
          { label: '2. zárójel kivonás', value: '25 - 27 = -2' },
          { label: '3. végső szorzat', value: '(-10) · (-2) = +20' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Ha a = -3 és b = -5, mennyi a 2a² - 3ab algebrai kifejezés behelyettesítési értéke?',
        highlightValue: 'Ha a = -3, b = -5, mennyi 2a² - 3ab ?',
        questionTypeBadge: 'Algebrai behelyettesítés',
        options: ['-27', '+27', '+63', '-63'],
        correctAnswer: '-27',
        explanation: 'a² = (-3)² = 9. 2a² = 2 · 9 = 18. ab = (-3) · (-5) = 15. 3ab = 3 · 15 = 45. Eredmény: 18 - 45 = -27.',
        breakdown: [
          { label: '2a²', value: '2 · (-3)² = 2 · 9 = 18' },
          { label: '3ab', value: '3 · [(-3) · (-5)] = 3 · 15 = 45' },
          { label: 'Kivonás', value: '18 - 45 = -27' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi az első 5 egymást követő negatív egész szám szorzata? [ (-1)·(-2)·(-3)·(-4)·(-5) ]',
        highlightValue: '(-1) · (-2) · (-3) · (-4) · (-5)',
        questionTypeBadge: 'Faktoriális előjellel',
        options: ['-120', '+120', '-24', '+24'],
        correctAnswer: '-120',
        explanation: '5 darab negatív szám (páratlan darab), ezért a szorzat negatív: -(1 · 2 · 3 · 4 · 5) = -120.',
        breakdown: [
          { label: 'Előjelek száma', value: '5 db mínusz (páratlan $\to$ -)' },
          { label: 'Szorzat', value: '-(120) = -120' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a -5 · (-2)² + (-3)² · (-2) összetett kifejezés pontos értéke?',
        highlightValue: '-5 · (-2)² + (-3)² · (-2)',
        questionTypeBadge: 'Hatványozás és szorzások összege',
        options: ['-38', '+38', '-2', '+2'],
        correctAnswer: '-38',
        explanation: '(-2)² = 4 $\to$ -5 · 4 = -20. (-3)² = 9 $\to$ 9 · (-2) = -18. Összegük: -20 + (-18) = -38.',
        breakdown: [
          { label: '1. tag', value: '-5 · 4 = -20' },
          { label: '2. tag', value: '9 · (-2) = -18' },
          { label: 'Összeg', value: '-20 + (-18) = -38' }
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
      <IntegerMultiplicationMatcher
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
      <IntegerMultiplicationSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function IntegerMultiplicationQuiz({ onBack }: IntegerMultiplicationQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="✖️"
      topicBadge="✖️ 6. Osztály • I. Egész számok"
      title="Az egész számok szorzása kvíz"
      subtitle="Teszteld a tudásod a szorzási előjelszabályokról, a nullával való szorzásról és az összetett műveleti sorrendről 3 szinten!"
      cheatSheetTitle="Egész számok szorzási szabályai"
      hintText="💡 Két azonos előjel szorzata POZITÍV, két különböző előjel szorzata NEGATÍV!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="indigo"
    />
  );
}
