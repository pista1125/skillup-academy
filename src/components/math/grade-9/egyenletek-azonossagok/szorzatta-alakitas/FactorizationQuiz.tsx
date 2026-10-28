import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FactorizationMatcher } from './FactorizationMatcher';
import { FactorizationSorter } from './FactorizationSorter';
import {
  FactoringTreeSvg,
  CommonFactorSvg,
  GroupingSvg,
  TwoStepFactoringSvg
} from './FactorizationFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Sparkles, FolderTree, Calculator } from 'lucide-react';

interface FactorizationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Közös Tényező Kiemelése (Könnyű)',
    subtitle: 'Legnagyobb közös osztó zárójel elé hozása és az alapszabályok alkalmazása.',
    range: '1 - 10. feladat',
    focus: 'Kiemelés Alapjai',
    questions: [
      {
        id: 'fq1-1',
        questionTypeBadge: 'Egyszerű Számkiemelés',
        question: 'Melyik alak felel meg a 6x + 18 kifejezés kiemeléssel történő szorzattá alakításának?',
        figure: <CommonFactorSvg size={170} />,
        options: ['6 · (x + 3)', '6 · (x + 18)', '3 · (2x + 9)', 'x · (6 + 18)'],
        correctAnswer: 0,
        hint: 'A 6 és 18 legnagyobb közös osztója a 6. 6x / 6 = x, és 18 / 6 = 3.',
        explanation: 'A 6-ot kiemelve: 6x + 18 = 6(x + 3).'
      },
      {
        id: 'fq1-2',
        questionTypeBadge: 'Változó Kiemelése',
        question: 'Hogyan alakítható szorzattá az x² - 5x kifejezés?',
        options: ['x · (x - 5)', '5 · (x - 1)', 'x · (x + 5)', 'x² · (1 - 5)'],
        correctAnswer: 0,
        hint: 'Mindkét tagban szerepel az x. x² / x = x, és -5x / x = -5.',
        explanation: 'Az x kiemelésével: x² - 5x = x(x - 5).'
      },
      {
        id: 'fq1-3',
        questionTypeBadge: 'Szám és Változó Együttes Kiemelése',
        question: 'Mennyi a 4x² + 12x kifejezés szorzatalakja?',
        options: ['4x · (x + 3)', '4 · (x² + 3x)', 'x · (4x + 12)', '2x · (2x + 6)'],
        correctAnswer: 0,
        hint: 'A 4 és a 12 LNKO-ja 4. Az x² és az x LNKO-ja x. A teljes kiemelhető rész: 4x.',
        explanation: 'A 4x kiemelésével a legteljesebb szorzatot kapjuk: 4x² + 12x = 4x(x + 3).'
      },
      {
        id: 'fq1-4',
        questionTypeBadge: 'Rejtett 1 a Kiemelés Után',
        question: 'Mi marad a zárójelben a 7x - 7 kifejezésből a 7 kiemelése után?',
        options: ['7 · (x - 1)', '7 · (x - 0)', '7 · x', '7 · (x - 7)'],
        correctAnswer: 0,
        hint: '-7 / 7 = -1. Nem 0 marad!',
        explanation: '7x - 7 = 7 · x - 7 · 1 = 7(x - 1).'
      },
      {
        id: 'fq1-5',
        questionTypeBadge: 'Negatív Előjel Kiemelése',
        question: 'Hogyan alakítható szorzattá a -3x - 15 kifejezés a -3 kiemelésével?',
        options: ['-3 · (x + 5)', '-3 · (x - 5)', '3 · (-x - 5)', '-3 · (x + 15)'],
        correctAnswer: 0,
        hint: 'Ha negatív számot (-3) emelsz ki, a zárójelen belüli tagok előjele megfordul!',
        explanation: '-3x / (-3) = x, és -15 / (-3) = +5. Ezért -3(x + 5).'
      },
      {
        id: 'fq1-6',
        questionTypeBadge: 'Kétváltozós Kiemelés',
        question: 'Mennyi a 2a²b + 6ab² kifejezés szorzatalakja?',
        options: ['2ab · (a + 3b)', '2ab · (a + b)', 'ab · (2a + 6b)', '2 · (a²b + 3ab²)'],
        correctAnswer: 0,
        hint: 'Számok LNKO-ja: 2. Változók: a² és a osztója a; b és b² osztója b. Közös: 2ab.',
        explanation: '2a²b / 2ab = a, és 6ab² / 2ab = 3b. Így 2ab(a + 3b).'
      },
      {
        id: 'fq1-7',
        questionTypeBadge: 'Magasabb Hatvány Kiemelése',
        question: 'Mennyi a 15x³ - 25x² kifejezés szorzattá alakított alakja?',
        options: ['5x² · (3x - 5)', '5x · (3x² - 5x)', 'x² · (15x - 25)', '5x² · (3x - 25)'],
        correctAnswer: 0,
        hint: '15 és 25 LNKO-ja 5. x³ és x² LNKO-ja x². A közös tényező 5x².',
        explanation: '15x³ - 25x² = 5x²(3x - 5).'
      },
      {
        id: 'fq1-8',
        questionTypeBadge: 'A Szorzattá Alakítás Célja',
        question: 'Miért alapvető cél az algebrában a kifejezések szorzattá alakítása?',
        figure: <FactoringTreeSvg size={170} />,
        options: [
          'Mert egy szorzat pontosan akkor 0, ha legalább az egyik tényezője 0',
          'Mert a szorzat mindig kisebb értéket ad',
          'Mert a zárójeleket kötelező kiírni',
          'Mert csak így lehet összevonni az egynemű tagokat'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az egyenletmegoldásra: A · B = 0 ⇒ A = 0 vagy B = 0.',
        explanation: 'A szorzattá alakítás teszi lehetővé a másod- és magasabb fokú egyenletek megoldását, valamint a törtek egyszerűsítését.'
      },
      {
        id: 'fq1-9',
        questionTypeBadge: 'Ellenőrzés Visszaszorzással',
        question: 'Melyik szorzattá alakítás HIBÁS az alábbiak közül?',
        options: [
          '8x + 4 = 4 · (2x)  (hiányzik a +1!)',
          '9x - 6 = 3 · (3x - 2)',
          'x² + 3x = x · (x + 3)',
          '5a - 10 = 5 · (a - 2)'
        ],
        correctAnswer: 0,
        hint: 'Szorozd vissza a 4 · (2x)-et: 8x-et kapsz, nem 8x + 4-et!',
        explanation: '8x + 4 = 4(2x + 1). A +1 elhagyása típushiba.'
      },
      {
        id: 'fq1-10',
        questionTypeBadge: 'Közös Zárójeles Tag Kiemelése',
        question: 'Mennyi az a · (x + 2) + b · (x + 2) kifejezés szorzatalakja?',
        options: ['(x + 2) · (a + b)', '(x + 2) · ab', '2x · (a + b)', '(a + b) + (x + 2)'],
        correctAnswer: 0,
        hint: 'Az (x + 2) egy egész blokk, ami mindkét tagban szerepel. Emeld ki ezt a zárójelet!',
        explanation: 'Az (x + 2) közös tényezőként kiemelhető: (x + 2)(a + b).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Nevezetes Azonosságok Alkalmazása Visszafelé (Közepes)',
    subtitle: 'Négyzetek különbsége, teljes négyzetek és kétváltozós azonosságok felismerése.',
    range: '11 - 20. feladat',
    focus: 'Azonosságok Visszafelé',
    questions: [
      {
        id: 'fq2-1',
        questionTypeBadge: 'Négyzetek Különbsége: x² - 64',
        question: 'Milyen szorzattá alakítható az x² - 64 kifejezés az a² - b² = (a - b)(a + b) azonosság alapján?',
        options: ['(x - 8)(x + 8)', '(x - 8)²', '(x - 32)(x + 32)', '(x + 8)²'],
        correctAnswer: 0,
        hint: '64 = 8². Így x² - 8² = (x - 8)(x + 8).',
        explanation: 'Két négyzetszám különbsége: a² - b² = (a - b)(a + b), ahol a = x, b = 8.'
      },
      {
        id: 'fq2-2',
        questionTypeBadge: 'Együtthatós Négyzetek Különbsége',
        question: 'Mennyi a 4x² - 25 kifejezés szorzattá alakított alakja?',
        options: ['(2x - 5)(2x + 5)', '(4x - 5)(4x + 5)', '(2x - 25)(2x + 25)', '(2x - 5)²'],
        correctAnswer: 0,
        hint: '4x² = (2x)² és 25 = 5².',
        explanation: '(2x)² - 5² = (2x - 5)(2x + 5).'
      },
      {
        id: 'fq2-3',
        questionTypeBadge: 'Teljes Négyzet Összegre',
        question: 'Milyen szorzattal egyenlő az x² + 8x + 16 kifejezés?',
        options: ['(x + 4)²', '(x + 8)²', '(x - 4)(x + 4)', '(x + 4)(x + 2)'],
        correctAnswer: 0,
        hint: 'Első tag: x², utolsó: 16 = 4², középső: 2 · x · 4 = 8x. Ez (x + 4)²!',
        explanation: 'a² + 2ab + b² = (a + b)², ahol a = x és b = 4.'
      },
      {
        id: 'fq2-4',
        questionTypeBadge: 'Teljes Négyzet Különbségre',
        question: 'Milyen szorzattal egyenlő az x² - 14x + 49 kifejezés?',
        options: ['(x - 7)²', '(x + 7)²', '(x - 7)(x + 7)', '(x - 14)²'],
        correctAnswer: 0,
        hint: 'A középső tag előjele negatív (-14x), így ez (x - 7)².',
        explanation: 'x² - 2·x·7 + 7² = (x - 7)².'
      },
      {
        id: 'fq2-5',
        questionTypeBadge: 'Együtthatós Teljes Négyzet',
        question: 'Mennyi a 9x² + 12x + 4 kifejezés szorzatalakja?',
        options: ['(3x + 2)²', '(9x + 2)²', '(3x + 4)²', '(3x - 2)(3x + 2)'],
        correctAnswer: 0,
        hint: '9x² = (3x)², 4 = 2², középső: 2 · 3x · 2 = 12x.',
        explanation: '(3x)² + 2·(3x)·2 + 2² = (3x + 2)².'
      },
      {
        id: 'fq2-6',
        questionTypeBadge: 'Konstans Elöl a Négyzetek Különbségénél',
        question: 'Mennyi az 1 - 9y² kifejezés szorzattá alakított alakja?',
        options: ['(1 - 3y)(1 + 3y)', '(3y - 1)(3y + 1)', '(1 - 9y)(1 + 9y)', '(1 - 3y)²'],
        correctAnswer: 0,
        hint: '1 = 1² és 9y² = (3y)². Így 1² - (3y)² = ?',
        explanation: '1 - 9y² = (1 - 3y)(1 + 3y).'
      },
      {
        id: 'fq2-7',
        questionTypeBadge: 'Kétváltozós Teljes Négyzet',
        question: 'Milyen alakban írható fel a 25x² - 30xy + 9y² kifejezés?',
        options: ['(5x - 3y)²', '(5x + 3y)²', '(5x - 3y)(5x + 3y)', '(25x - 9y)²'],
        correctAnswer: 0,
        hint: '(5x)² = 25x², (3y)² = 9y², és 2 · 5x · 3y = 30xy.',
        explanation: '(5x)² - 2·(5x)·(3y) + (3y)² = (5x - 3y)².'
      },
      {
        id: 'fq2-8',
        questionTypeBadge: 'Nem Alakítható Szorzattá (Csapda)',
        question: 'Melyik kifejezés NEM alakítható szorzattá a valós számok halmazán?',
        options: ['x² + 9', 'x² - 9', 'x² - 6x + 9', '3x + 9'],
        correctAnswer: 0,
        hint: 'A négyzetek ÖSSZEGE (a² + b²) a valós számok halmazán soha nem bontható szorzatra!',
        explanation: 'x² + 9 nem bontható, mert nincs olyan valós szám, amelynek négyzete -9 lenne.'
      },
      {
        id: 'fq2-9',
        questionTypeBadge: 'Törtes Négyzetek Különbsége',
        question: 'Mennyi az x² - 1/4 kifejezés szorzatalakja?',
        options: ['(x - 1/2)(x + 1/2)', '(x - 1/4)(x + 1/4)', '(x - 1/2)²', '(x - 1/8)(x + 1/8)'],
        correctAnswer: 0,
        hint: '1/4 = (1/2)². Így x² - (1/2)² = ?',
        explanation: 'x² - (1/2)² = (x - 1/2)(x + 1/2).'
      },
      {
        id: 'fq2-10',
        questionTypeBadge: 'Hiányzó Tag Keresése',
        question: 'Melyik tag hiányzik, hogy a 4x² + ? + 25 kifejezés teljes négyzetté alakulhasson?',
        options: ['20x', '10x', '40x', '100x'],
        correctAnswer: 0,
        hint: 'a = 2x, b = 5. A középső tag: 2 · a · b = 2 · 2x · 5 = ?',
        explanation: '2 · (2x) · 5 = 20x. Így (2x + 5)² = 4x² + 20x + 25.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kétszeres Kiemelés, Csoportosítás és Törtek Egyszerűsítése (Haladó)',
    subtitle: 'Összetett módszerek, 4 tagú csoportosítás, tört-egyszerűsítés és szorzatos egyenletek.',
    range: '21 - 30. feladat',
    focus: 'Többlépcsős Szorzattá Alakítás és Alkalmazások',
    questions: [
      {
        id: 'fq3-1',
        questionTypeBadge: 'Kétszeres Kiemelés: 2x² - 50',
        question: 'Mennyi a 2x² - 50 kifejezés teljes szorzatalakja?',
        figure: <TwoStepFactoringSvg size={170} />,
        options: ['2 · (x - 5)(x + 5)', '(2x - 10)(x + 5)', '2 · (x² - 25)', '(x - 5)(2x + 10)'],
        correctAnswer: 0,
        hint: 'Előbb emeld ki a 2-t: 2(x² - 25), majd alakítsd a zárójelet négyzetek különbségeként!',
        explanation: '2x² - 50 = 2(x² - 25) = 2(x - 5)(x + 5).'
      },
      {
        id: 'fq3-2',
        questionTypeBadge: 'Kétszeres Kiemelés Teljes Négyzettel',
        question: 'Mennyi a 3x² + 18x + 27 kifejezés teljes szorzattá alakított alakja?',
        options: ['3 · (x + 3)²', '3 · (x² + 6x + 9)', '(3x + 9)²', '(3x + 3)(x + 9)'],
        correctAnswer: 0,
        hint: 'Előbb a 3 kiemelése: 3(x² + 6x + 9), majd a zárójel teljes négyzet: (x + 3)².',
        explanation: '3(x² + 6x + 9) = 3(x + 3)².'
      },
      {
        id: 'fq3-3',
        questionTypeBadge: 'Változó Kiemelése Négyzetek Különbségével',
        question: 'Mennyi az x³ - x kifejezés teljes szorzatalakja?',
        options: ['x · (x - 1)(x + 1)', 'x · (x² - 1)', '(x² - x)(x + 1)', 'x² · (x - 1)'],
        correctAnswer: 0,
        hint: 'x kiemelése: x(x² - 1), majd x² - 1 = (x - 1)(x + 1).',
        explanation: 'x(x² - 1) = x(x - 1)(x + 1).'
      },
      {
        id: 'fq3-4',
        questionTypeBadge: 'Csoportosításos Módszer (4 tag)',
        question: 'Hogyan alakítható szorzattá az ax + ay + bx + by kifejezés?',
        figure: <GroupingSvg size={170} />,
        options: ['(x + y) · (a + b)', '(a + x) · (b + y)', 'ab · (x + y)', 'xy · (a + b)'],
        correctAnswer: 0,
        hint: 'Párosíts: a(x + y) + b(x + y) = (x + y)(a + b).',
        explanation: 'a(x + y) + b(x + y) = (x + y)(a + b).'
      },
      {
        id: 'fq3-5',
        questionTypeBadge: 'Csoportosítás Negatív Előjellel',
        question: 'Mennyi a 3x - 3y - ax + ay kifejezés szorzatalakja?',
        options: ['(x - y) · (3 - a)', '(x - y) · (3 + a)', '(x + y) · (3 - a)', '3a · (x - y)'],
        correctAnswer: 0,
        hint: '3(x - y) - a(x - y) = (x - y)(3 - a).',
        explanation: '3(x - y) - a(x - y) = (x - y)(3 - a).'
      },
      {
        id: 'fq3-6',
        questionTypeBadge: 'Kettős Négyzetek Különbsége: x⁴ - 16',
        question: 'Mennyi az x⁴ - 16 kifejezés teljes szorzatalakja a valós számok halmazán?',
        options: ['(x² + 4)(x - 2)(x + 2)', '(x² - 4)(x² + 4)', '(x - 2)²(x + 2)²', '(x - 4)(x + 4)'],
        correctAnswer: 0,
        hint: 'x⁴ - 16 = (x² - 4)(x² + 4). Az x² - 4 tovább bontható: (x - 2)(x + 2)!',
        explanation: '(x² - 4)(x² + 4) = (x - 2)(x + 2)(x² + 4). Az x² + 4 valósban nem bontható tovább.'
      },
      {
        id: 'fq3-7',
        questionTypeBadge: 'Algebrai Tört Egyszerűsítése',
        question: 'Mennyi az (x² - 25) / (x - 5) tört legegyszerűbb alakja, ha x ≠ 5?',
        options: ['x + 5', 'x - 5', 'x + 25', '5'],
        correctAnswer: 0,
        hint: 'Számláló: x² - 25 = (x - 5)(x + 5). Egyszerűsíts az (x - 5) tényezővel!',
        explanation: '[(x - 5)(x + 5)] / (x - 5) = x + 5.'
      },
      {
        id: 'fq3-8',
        questionTypeBadge: 'Tört Egyszerűsítése Teljes Négyzettel',
        question: 'Mennyi az (x² - 6x + 9) / (2x - 6) tört legegyszerűbb alakja (x ≠ 3)?',
        options: ['(x - 3) / 2', '(x + 3) / 2', 'x - 3', '(x - 3) / (2x)'],
        correctAnswer: 0,
        hint: 'Számláló: (x - 3)². Nevező: 2(x - 3). Egyszerűsíts (x - 3)-mal!',
        explanation: '(x - 3)² / [2(x - 3)] = (x - 3) / 2.'
      },
      {
        id: 'fq3-9',
        questionTypeBadge: 'Szorzatos Egyenlet Megoldása',
        question: 'Melyek a (2x - 6)(x + 5) = 0 egyenlet valós gyökei?',
        options: ['x₁ = 3 és x₂ = -5', 'x₁ = -3 és x₂ = 5', 'x₁ = 6 és x₂ = -5', 'Csak x = 3'],
        correctAnswer: 0,
        hint: 'Egy szorzat akkor 0, ha 2x - 6 = 0 vagy x + 5 = 0.',
        explanation: '2x - 6 = 0 ⇒ 2x = 6 ⇒ x = 3;  x + 5 = 0 ⇒ x = -5.'
      },
      {
        id: 'fq3-10',
        questionTypeBadge: 'Köbök Különbségének Szorzattá Alakítása',
        question: 'Mennyi az x³ - 8 kifejezés szorzatalakja az a³ - b³ = (a - b)(a² + ab + b²) azonosság szerint?',
        options: ['(x - 2)(x² + 2x + 4)', '(x - 2)³', '(x - 2)(x² - 2x + 4)', '(x + 2)(x² - 2x + 4)'],
        correctAnswer: 0,
        hint: 'a = x, b = 2. a² + ab + b² = x² + 2x + 4.',
        explanation: 'x³ - 2³ = (x - 2)(x² + 2·x + 2²) = (x - 2)(x² + 2x + 4).'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. Közös Tényező Kiemelése',
    badge: 'Mindig ezzel kezdj!',
    points: [
      'Számok és változók legnagyobb közös osztóját (LNKO) emeld ki.',
      'Ha a teljes tagot kiemeled, +1 (vagy -1) marad a helyén: 5x + 5 = 5(x + 1).',
      'Ellenőrizd a megoldásod visszaszorzással!'
    ]
  },
  {
    title: '2. Négyzetek Különbsége',
    badge: 'a² - b²',
    points: [
      'a² - b² = (a - b)(a + b).',
      'Pl. 4x² - 25 = (2x - 5)(2x + 5).',
      'FIGYELEM: a² + b² (összeg) NEM alakítható szorzattá a valós számokon!'
    ]
  },
  {
    title: '3. Teljes Négyzet',
    badge: '(a ± b)²',
    points: [
      'a² + 2ab + b² = (a + b)².',
      'a² - 2ab + b² = (a - b)².',
      'Mindig ellenőrizd, hogy a középső tag valóban kétszeres szorzat-e (2ab)!'
    ]
  },
  {
    title: '4. Csoportosítás & Kétszeres Kiemelés',
    badge: 'Összetett módszerek',
    points: [
      '4 tag esetén: ax + ay + bx + by = a(x+y) + b(x+y) = (x+y)(a+b).',
      'Előbb emelj ki számot, utána alkalmazz azonosságot: 2x² - 18 = 2(x-3)(x+3).',
      'Szorzatos egyenlet: A · B = 0  ⇒  A = 0 vagy B = 0.'
    ]
  }
];

export const FactorizationQuiz: React.FC<FactorizationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Szorzattá Alakítás – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten a közös tényező kiemelése, nevezetes azonosságok és csoportosítás témaköréből"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 4. TÉMAKÖR"
      themeColor="violet"
      storageKey="grade9-factorization-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-szorzatta-quiz"
      topicTitle="Szorzattá alakítás"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket a kiemeléssel és azonosságokkal kapott szorzatalakjukkal!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <FactorizationMatcher
              key={`factorization-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kifejezéseket szorzattá alakítási módszer és tényezők szerint!',
          badgeText: '11-12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <FactorizationSorter
              key={`factorization-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};
