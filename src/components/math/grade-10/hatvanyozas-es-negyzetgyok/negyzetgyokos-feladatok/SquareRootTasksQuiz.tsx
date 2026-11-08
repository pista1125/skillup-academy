import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SquareRootTasksMatcher } from './SquareRootTasksMatcher';
import { SquareRootTasksSorter } from './SquareRootTasksSorter';
import {
  RootExtractionSvg,
  RootInsertionAndCompareSvg,
  MonomialRationalizationSvg,
  ConjugateRationalizationSvg
} from './SquareRootTasksFigures';

interface SquareRootTasksQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Tényező kiemelése (részleges gyökvonás)',
    description: 'A gyök alatti számot négyzetszám és maradék szorzatára bontjuk: √(a² · b) = a · √b (a, b ≥ 0). Csak a maximális kiemelés ad végleges egyszerű alakot.',
    note: 'Példa: √72 = √(36 · 2) = 6√2. Hibás a 2√18, mert még tovább egyszerűsíthető!',
    color: 'from-amber-500 to-orange-600',
    figure: <RootExtractionSvg size={180} />
  },
  {
    title: 'Tényező bevitele a gyökjel alá',
    description: 'A szorzótényezőt négyzetre emelve visszük a gyök alá: a · √b = √(a² · b) (a ≥ 0). Negatív szám esetén a mínuszjel mindig a gyök előtt marad!',
    note: 'Példa: 3√5 = √(9 · 5) = √45. Előjellel: -3√5 = -√45!',
    color: 'from-sky-500 to-blue-600',
    figure: <RootInsertionAndCompareSvg size={180} />
  },
  {
    title: 'Egytagú gyökös nevező gyöktelenítése',
    description: 'A tört számlálóját és nevezőjét beszorozzuk a nevezőben álló gyökkel: c / √a = (c · √a) / a (a > 0).',
    note: 'Példa: 6 / √3 = (6√3) / 3 = 2√3. Mindig egyszerűsítsünk, ha lehet!',
    color: 'from-teal-500 to-emerald-600',
    figure: <MonomialRationalizationSvg size={180} />
  },
  {
    title: 'Kéttagú nevező konjugálttal',
    description: 'Bővítés a nevező algebrai konjugáltjával: c / (√a + √b) = c(√a - √b) / (a - b) az (x + y)(x - y) = x² - y² azonosság alapján.',
    note: 'Példa: 2 / (√5 - 1) = 2(√5 + 1) / (5 - 1) = 2(√5 + 1) / 4 = (√5 + 1) / 2.',
    color: 'from-purple-500 to-indigo-600',
    figure: <ConjugateRationalizationSvg size={180} />
  }
];

const levels: QuizLevelConfig[] = [
  // 1. SZINT: KÖNNYŰ (10 KÉRDÉS)
  {
    level: 1,
    title: '1. Könnyű szint: Tényező kiemelése gyökjel alól és egynemű gyökök',
    subtitle: 'Részleges gyökvonás, négyzetszám osztók keresése és egynemű gyökök összevonása.',
    range: '1–10. feladat',
    focus: 'Részleges gyökvonás és egynemű gyökök',
    color: 'amber',
    questions: [
      {
        id: 'srt1-1',
        question: 'Hogyan alakítható át a √8 a lehető legnagyobb tényező kiemelésével?',
        options: ['2√2', '4√2', '2√4', '√4 · 2'],
        correctAnswer: 0,
        explanation: '8 = 4 · 2, így √8 = √(4 · 2) = √4 · √2 = 2√2.'
      },
      {
        id: 'srt1-2',
        question: 'Hogyan alakítható át a √12 tényező kiemelésével?',
        options: ['2√3', '3√2', '4√3', '6√2'],
        correctAnswer: 0,
        explanation: '12 = 4 · 3, így √12 = √(4 · 3) = 2√3.'
      },
      {
        id: 'srt1-3',
        question: 'Hogyan alakítható át a √18 tényező kiemelésével?',
        options: ['3√2', '2√3', '9√2', '6√3'],
        correctAnswer: 0,
        explanation: '18 = 9 · 2, így √18 = √(9 · 2) = 3√2.'
      },
      {
        id: 'srt1-4',
        question: 'Hogyan alakítható át a √20 tényező kiemelésével?',
        options: ['2√5', '5√2', '4√5', '10√2'],
        correctAnswer: 0,
        explanation: '20 = 4 · 5, így √20 = √(4 · 5) = 2√5.'
      },
      {
        id: 'srt1-8',
        question: 'Hogyan alakítható át a √48 a legnagyobb négyzetszám kiemelésével?',
        options: ['4√3', '2√12', '16√3', '6√2'],
        correctAnswer: 0,
        explanation: '48 = 16 · 3, így √48 = √(16 · 3) = 4√3.'
      },
      {
        id: 'srt1-9',
        question: 'Hogyan alakítható át a √50 tényező kiemelésével?',
        options: ['5√2', '2√5', '25√2', '10√5'],
        correctAnswer: 0,
        explanation: '50 = 25 · 2, így √50 = √(25 · 2) = 5√2.'
      },
      {
        id: 'srt1-10',
        question: 'Hogyan alakítható át a √72 a legnagyobb négyzetszám kiemelésével?',
        options: ['6√2', '2√18', '3√8', '12√2'],
        correctAnswer: 0,
        explanation: '72 = 36 · 2, így √72 = √(36 · 2) = 6√2.'
      },
      {
        id: 'srt1-25',
        question: 'Mit nevezünk a matematikában részleges gyökvonásnak?',
        options: ['Amikor a gyök alatti szám négyzetszorzójából pontosan gyököt vonunk, míg a maradék tényező a gyökjel alatt marad', 'Amikor kerekítve számolunk', 'Amikor csak a számlálóból vonunk gyököt', 'Amikor negatív számból vonunk gyököt'],
        correctAnswer: 0,
        explanation: 'Részleges gyökvonás: √(a² · b) = a · √b, a négyzetszám "kiszabadul", a többi benn marad.'
      },
      {
        id: 'srt1-26',
        question: 'Mennyi a 2√2 + 3√2 összeg értéke?',
        options: ['5√2', '5√4', '6√2', '√20'],
        correctAnswer: 0,
        explanation: 'Mivel a gyökös tényező azonos (√2), az együtthatókat összeadjuk: (2 + 3)√2 = 5√2.'
      },
      {
        id: 'srt1-30',
        question: 'Összevonható-e közvetlenül egyetlen gyökké a 2√3 + 3√2 összeg?',
        options: ['Nem, mert a gyök alatti számok különböznek (nem egynemű gyökök)', 'Igen, 5√5', 'Igen, 5√6', 'Igen, 6√6'],
        correctAnswer: 0,
        explanation: 'Különböző irracionális gyököket (√3 és √2) nem lehet összevonni, a kifejezés ebben az alakban marad a legegyszerűbb.'
      }
    ]
  },

  // 2. SZINT: KÖZEPES (10 KÉRDÉS)
  {
    level: 2,
    title: '2. Közepes szint: Tényező bevitele gyök alá, összehasonlítás és egytagú gyöktelenítés',
    subtitle: 'a√b = √(a²b) szabály, kifejezések nagyságrendi összehasonlítása és egytagú gyökös nevezők megszüntetése.',
    range: '11–20. feladat',
    focus: 'Tényező bevitele, egytagú nevező gyöktelenítése',
    color: 'amber',
    questions: [
      {
        id: 'srt2-1',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 2√3 = ?',
        options: ['√12', '√6', '√18', '√24'],
        correctAnswer: 0,
        explanation: '2 = √4, így 2√3 = √(4 · 3) = √12.'
      },
      {
        id: 'srt2-2',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 3√2 = ?',
        options: ['√18', '√6', '√12', '√36'],
        correctAnswer: 0,
        explanation: '3 = √9, így 3√2 = √(9 · 2) = √18.'
      },
      {
        id: 'srt2-6',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 3√5 = ?',
        options: ['√45', '√15', '√75', '√225'],
        correctAnswer: 0,
        explanation: '3√5 = √(9 · 5) = √45.'
      },
      {
        id: 'srt2-14',
        question: 'Hogyan visszük be a negatív előjeles számot a gyökjel alá: -3√2 = ?',
        options: ['-√18 (a negatív előjel a gyök előtt marad)', '√(-18)', '√18', '-√6'],
        correctAnswer: 0,
        explanation: 'A negatív előjelet NEM szabad bevinni a páros gyökjel alá! -3√2 = -(3√2) = -√(9 · 2) = -√18.'
      },
      {
        id: 'srt2-15',
        question: 'Melyik szám a nagyobb: 3√5 vagy 5√2?',
        options: ['5√2 a nagyobb (mert √50 > √45)', '3√5 a nagyobb', 'Egyenlőek', 'Nem dönthető el'],
        correctAnswer: 0,
        explanation: '3√5 = √45, míg 5√2 = √50. Mivel 50 > 45, ezért 5√2 > 3√5.'
      },
      {
        id: 'srt2-18',
        question: 'Melyik szám a nagyobb: 5√2 vagy 7?',
        options: ['5√2 a nagyobb (mert √50 > √49)', '7 a nagyobb', 'Egyenlőek', 'Nem hasonlíthatóak össze'],
        correctAnswer: 0,
        explanation: '5√2 = √50, míg 7 = √49. Mivel 50 > 49, ezért 5√2 > 7.'
      },
      {
        id: 'srt2-20',
        question: 'Mennyi az 1 / √2 tört értéke a nevező gyöktelenítése után?',
        options: ['√2 / 2', '2 / √2', '√2', '1 / 2'],
        correctAnswer: 0,
        explanation: 'Számlálót és nevezőt √2-vel szorozzuk: (1 · √2) / (√2 · √2) = √2 / 2.'
      },
      {
        id: 'srt2-23',
        question: 'Mennyi a 6 / √3 tört egyszerűsített értéke gyöktelenítés után?',
        options: ['2√3', '3√3', '6√3', '√3 / 2'],
        correctAnswer: 0,
        explanation: '(6 · √3) / (√3 · √3) = (6√3) / 3 = 2√3.'
      },
      {
        id: 'srt2-24',
        question: 'Mennyi a 10 / √5 tört értéke gyöktelenítés után?',
        options: ['2√5', '5√5', '√5 / 2', '10√5'],
        correctAnswer: 0,
        explanation: '(10 · √5) / 5 = 2√5.'
      },
      {
        id: 'srt2-30',
        question: 'Mi a legfőbb célja a nevező gyöktelenítésének?',
        options: ['Hogy a tört nevezőjében racionális (egész) szám szerepeljen, így a kifejezés könnyebben értelmezhető és számolható', 'Hogy eltűnjön a törtvonal', 'Hogy az érték pozitív legyen', 'Hogy a számláló egész szám legyen'],
        correctAnswer: 0,
        explanation: 'Egy racionális számmal (egész számmal) való osztás sokkal kezelhetőbb, mint egy végtelen nem szakaszos tizedestörttel való osztás.'
      }
    ]
  },

  // 3. SZINT: NEHÉZ (10 KÉRDÉS)
  {
    level: 3,
    title: '3. Nehéz szint: Összetett gyökös kifejezések, konjugáltak és emeletes gyökök',
    subtitle: 'Kéttagú nevező konjugáltja, nevezetes szorzatok, gyök alatti teljes négyzetek és emeletes gyökök.',
    range: '21–30. feladat',
    focus: 'Kéttagú nevező gyöktelenítése, összetett kifejezések',
    color: 'amber',
    questions: [
      {
        id: 'srt3-1',
        question: 'Mennyi a √8 + √18 kifejezés legegyszerűbb alakja?',
        options: ['5√2', '√26', '6√2', '7√2'],
        correctAnswer: 0,
        explanation: '√8 = 2√2, √18 = 3√2. Összevonva: 2√2 + 3√2 = 5√2.'
      },
      {
        id: 'srt3-6',
        question: 'Mennyi a √32 + √50 - √18 kifejezés értéke?',
        options: ['6√2', '4√2', '8√2', '√64'],
        correctAnswer: 0,
        explanation: '√32 = 4√2, √50 = 5√2, √18 = 3√2. Számolás: 4√2 + 5√2 - 3√2 = 6√2.'
      },
      {
        id: 'srt3-7',
        question: 'Mennyi a 2√12 - √27 + 3√48 kifejezés értéke?',
        options: ['13√3', '11√3', '15√3', '9√3'],
        correctAnswer: 0,
        explanation: '2√12 = 2(2√3) = 4√3. √27 = 3√3. 3√48 = 3(4√3) = 12√3. Összesen: 4√3 - 3√3 + 12√3 = 13√3.'
      },
      {
        id: 'srt3-9',
        question: 'Mi a (√5 - 1) kéttagú kifejezés algebrai konjugáltja?',
        options: ['√5 + 1', '-√5 - 1', '1 - √5', '5 - 1'],
        correctAnswer: 0,
        explanation: 'A két tag közötti előjelet ellentétesre változtatjuk: (√5 - 1) konjugáltja (√5 + 1).'
      },
      {
        id: 'srt3-13',
        question: 'Mennyi a (√5 + 1)(√5 - 1) szorzat értéke a nevezetes azonosság alapján?',
        options: ['4', '6', '5', '√24'],
        correctAnswer: 0,
        explanation: '(a + b)(a - b) = a² - b². Így (√5)² - 1² = 5 - 1 = 4.'
      },
      {
        id: 'srt3-17',
        question: 'Gyöktelenítsük a 2 / (√5 - 1) tört nevezőjét!',
        options: ['(√5 + 1) / 2', '√5 + 1', '(√5 - 1) / 2', '2(√5 + 1)'],
        correctAnswer: 0,
        explanation: 'Szorzunk konjugálttal: 2(√5 + 1) / ((√5)² - 1²) = 2(√5 + 1) / 4 = (√5 + 1) / 2.'
      },
      {
        id: 'srt3-19',
        question: 'Gyöktelenítsük a 4 / (√7 - √3) tört nevezőjét!',
        options: ['√7 + √3', '2(√7 + √3)', '(√7 + √3) / 2', '4(√7 + √3)'],
        correctAnswer: 0,
        explanation: '4(√7 + √3) / (7 - 3) = 4(√7 + √3) / 4 = √7 + √3.'
      },
      {
        id: 'srt3-22',
        question: 'Gyöktelenítsük az 1 / (2 - √3) tört nevezőjét!',
        options: ['2 + √3', '2 - √3', '(2 + √3) / 7', '√3 - 2'],
        correctAnswer: 0,
        explanation: '1(2 + √3) / (2² - (√3)²) = (2 + √3) / (4 - 3) = 2 + √3.'
      },
      {
        id: 'srt3-23',
        question: 'Fejtsük ki a (√5 + √3)² kifejezést!',
        options: ['8 + 2√15', '8', '8 + √15', '15 + 2√8'],
        correctAnswer: 0,
        explanation: '(√5)² + 2(√5 · √3) + (√3)² = 5 + 2√15 + 3 = 8 + 2√15.'
      },
      {
        id: 'srt3-27',
        question: 'Mennyi a √(7 + 4√3) összetett gyök pontos értéke?',
        options: ['2 + √3', '2 - √3', '√7 + 2√3', '1 + 2√3'],
        correctAnswer: 0,
        explanation: 'Vegyük észre, hogy 7 + 4√3 = 4 + 4√3 + 3 = (2 + √3)². Ezért √((2 + √3)²) = 2 + √3.'
      }
    ]
  }
];

export const SquareRootTasksQuiz: React.FC<SquareRootTasksQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="Négyzetgyökös feladatok kvíz"
      subtitle="Kiemelés a gyökjel alól, bevitel gyök alá, nevező gyöktelenítése és összetett kifejezések"
      themeColor="amber"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <SquareRootTasksMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SquareRootTasksSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      initialGameMode={initialGameMode}
    />
  );
};

export default SquareRootTasksQuiz;

