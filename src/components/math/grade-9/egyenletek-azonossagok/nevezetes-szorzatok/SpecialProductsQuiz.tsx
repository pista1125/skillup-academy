import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SpecialProductsMatcher } from './SpecialProductsMatcher';
import { SpecialProductsSorter } from './SpecialProductsSorter';
import {
  SumSquareSvg,
  DiffSquareSvg,
  SumDiffProductSvg,
  MentalMathSvg
} from './SpecialProductsFigures';
import { ArrowRightLeft, LayoutGrid, Sparkles, AlertTriangle, Layers, Calculator } from 'lucide-react';

interface SpecialProductsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Nevezetes Szorzatok Kibontása (Könnyű)',
    subtitle: 'Kéttagú összeg négyzete, különbség négyzete és a négyzetek különbsége alapfeladatokon.',
    range: '1 - 10. feladat',
    focus: 'Azonosságok Alapjai',
    questions: [
      {
        id: 'spq1-1',
        questionTypeBadge: 'Összeg Négyzete',
        question: 'Mennyi az (x + 3)² kéttagú összeg négyzete az azonosság szerint?',
        figure: <SumSquareSvg size={170} />,
        options: ['x² + 6x + 9', 'x² + 9', 'x² + 3x + 9', '2x + 6'],
        correctAnswer: 0,
        hint: '(a + b)² = a² + 2ab + b². Itt a = x, b = 3. A kétszeres szorzat: 2 · x · 3 = 6x!',
        explanation: '(x + 3)² = x² + 2·x·3 + 3² = x² + 6x + 9.'
      },
      {
        id: 'spq1-2',
        questionTypeBadge: 'Különbség Négyzete',
        question: 'Mennyi az (x - 4)² kifejezés kibontott alakja?',
        figure: <DiffSquareSvg size={170} />,
        options: ['x² - 8x + 16', 'x² - 16', 'x² - 4x + 16', 'x² + 8x - 16'],
        correctAnswer: 0,
        hint: '(a - b)² = a² - 2ab + b². A középső tag előjele negatív (-8x), a harmadik tag négyzete pozitív (+16)!',
        explanation: '(x - 4)² = x² - 2·x·4 + 4² = x² - 8x + 16.'
      },
      {
        id: 'spq1-3',
        questionTypeBadge: 'Négyzetek Különbsége',
        question: 'Mennyi az (x + 5)(x - 5) szorzat értéke?',
        figure: <SumDiffProductSvg size={170} />,
        options: ['x² - 25', 'x² + 25', 'x² - 10x - 25', 'x² - 5'],
        correctAnswer: 0,
        hint: '(a + b)(a - b) = a² - b². A vegyes tagok kiejtik egymást (+5x - 5x = 0).',
        explanation: '(x + 5)(x - 5) = x² - 5² = x² - 25.'
      },
      {
        id: 'spq1-4',
        questionTypeBadge: 'Együtthatós Összeg Négyzete',
        question: 'Mennyi a (2x + 1)² kifejezés kibontott alakja?',
        options: ['4x² + 4x + 1', '4x² + 1', '2x² + 4x + 1', '4x² + 2x + 1'],
        correctAnswer: 0,
        hint: 'Az első tag négyzete: (2x)² = 4x²! A kétszeres szorzat: 2 · 2x · 1 = 4x.',
        explanation: '(2x + 1)² = (2x)² + 2·(2x)·1 + 1² = 4x² + 4x + 1.'
      },
      {
        id: 'spq1-5',
        questionTypeBadge: 'Együtthatós Különbség Négyzete',
        question: 'Mennyi a (3x - 2)² kifejezés kibontott alakja?',
        options: ['9x² - 12x + 4', '9x² - 4', '9x² - 6x + 4', '6x² - 12x + 4'],
        correctAnswer: 0,
        hint: '(3x)² = 9x², a kétszeres szorzat: 2 · 3x · 2 = 12x, a harmadik tag: 2² = 4.',
        explanation: '(3x - 2)² = (3x)² - 2·(3x)·2 + 2² = 9x² - 12x + 4.'
      },
      {
        id: 'spq1-6',
        questionTypeBadge: 'Együtthatós Négyzetek Különbsége',
        question: 'Mennyi a (4x + 3)(4x - 3) szorzat pontos értéke?',
        options: ['16x² - 9', '16x² + 9', '4x² - 9', '16x² - 24x - 9'],
        correctAnswer: 0,
        hint: '(4x)² - 3² = 16x² - 9.',
        explanation: '(4x + 3)(4x - 3) = (4x)² - 3² = 16x² - 9.'
      },
      {
        id: 'spq1-7',
        questionTypeBadge: 'Típushiba Felismerése',
        question: 'Melyik tag hiányzik az (x + 5)² = x² + 25 hibás felírásból?',
        options: ['A kétszeres szorzat: +10x', 'A kétszeres szorzat: +5x', 'A -10x tag', 'Semmi, a felírás helyes'],
        correctAnswer: 0,
        hint: '(a + b)² = a² + 2ab + b². Mi hiányzik az a² és b² közül?',
        explanation: 'A középső tag, vagyis a 2·x·5 = 10x maradt ki. Ezért (x + 5)² = x² + 10x + 25.'
      },
      {
        id: 'spq1-8',
        questionTypeBadge: 'Villámgyors Fejszámolás',
        question: 'Mennyi a 51 · 49 szorzat értéke a nevezetes azonosság segítségével?',
        figure: <MentalMathSvg size={170} />,
        options: ['2499', '2501', '2491', '2500'],
        correctAnswer: 0,
        hint: '51 · 49 = (50 + 1)(50 - 1) = 50² - 1² = 2500 - 1 = ?',
        explanation: '(50 + 1)(50 - 1) = 50² - 1² = 2500 - 1 = 2499.'
      },
      {
        id: 'spq1-9',
        questionTypeBadge: 'Felcserélt Tagok Különbségének Négyzete',
        question: 'Mennyi a (5 - x)² kifejezés kibontott alakja rendezve?',
        options: ['x² - 10x + 25', '25 - x²', 'x² + 10x + 25', 'x² - 25'],
        correctAnswer: 0,
        hint: '(5 - x)² = 5² - 2·5·x + x² = 25 - 10x + x² = x² - 10x + 25. Vegyük észre: (5 - x)² = (x - 5)²!',
        explanation: '(5 - x)² = 25 - 10x + x² = x² - 10x + 25. Mivel a négyzetre emelés eltünteti a -1 szorzót, (a - b)² = (b - a)².'
      },
      {
        id: 'spq1-10',
        questionTypeBadge: 'Kéttagú Összeg Négyzete Nagyobb Számmal',
        question: 'Mennyi az (x + 8)² kifejezés kibontott alakja?',
        options: ['x² + 16x + 64', 'x² + 8x + 64', 'x² + 64', 'x² + 16x + 16'],
        correctAnswer: 0,
        hint: 'A középső tag: 2 · x · 8 = 16x. A konstans tag: 8² = 64.',
        explanation: '(x + 8)² = x² + 2·x·8 + 8² = x² + 16x + 64.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kétváltozós Azonosságok, Negatív Előjelek és Törtek (Közepes)',
    subtitle: 'Többváltozós alakok, zárójel előtti mínusz, tört együtthatók és fejszámolási technikák.',
    range: '11 - 20. feladat',
    focus: 'Kétváltozós és Előjeles Azonosságok',
    questions: [
      {
        id: 'spq2-1',
        questionTypeBadge: 'Kétváltozós Összeg Négyzete',
        question: 'Mennyi a (2x + 3y)² kifejezés kibontott alakja?',
        options: ['4x² + 12xy + 9y²', '4x² + 6xy + 9y²', '4x² + 9y²', '2x² + 12xy + 3y²'],
        correctAnswer: 0,
        hint: '(2x)² = 4x², a kétszeres szorzat: 2 · 2x · 3y = 12xy, a harmadik tag: (3y)² = 9y².',
        explanation: '(2x)² + 2·(2x)·(3y) + (3y)² = 4x² + 12xy + 9y².'
      },
      {
        id: 'spq2-2',
        questionTypeBadge: 'Kétváltozós Különbség Négyzete',
        question: 'Mennyi a (3a - 4b)² kifejezés kibontott alakja?',
        options: ['9a² - 24ab + 16b²', '9a² - 12ab + 16b²', '9a² - 16b²', '9a² + 24ab + 16b²'],
        correctAnswer: 0,
        hint: '(3a)² = 9a², 2 · 3a · 4b = 24ab, (4b)² = 16b².',
        explanation: '(3a)² - 2·(3a)·(4b) + (4b)² = 9a² - 24ab + 16b².'
      },
      {
        id: 'spq2-3',
        questionTypeBadge: 'Kétváltozós Négyzetek Különbsége',
        question: 'Mennyi az (5x + 2y)(5x - 2y) szorzat értéke?',
        figure: <SumDiffProductSvg size={170} />,
        options: ['25x² - 4y²', '25x² + 4y²', '25x² - 20xy - 4y²', '5x² - 2y²'],
        correctAnswer: 0,
        hint: '(5x)² - (2y)² = 25x² - 4y².',
        explanation: '(5x + 2y)(5x - 2y) = (5x)² - (2y)² = 25x² - 4y².'
      },
      {
        id: 'spq2-4',
        questionTypeBadge: 'Két Negatív Tag Négyzete',
        question: 'Mennyi a (-x - 5)² kifejezés kibontott alakja?',
        options: ['x² + 10x + 25', 'x² - 10x + 25', '-x² - 10x - 25', '-x² + 10x + 25'],
        correctAnswer: 0,
        hint: '(-x - 5)² = [-(x + 5)]² = (x + 5)²! A négyzetre emelés miatt a negatív előjel kiesik.',
        explanation: '(-x)² - 2·(-x)·5 + 5² = x² + 10x + 25. Ugyanaz, mint (x + 5)²!'
      },
      {
        id: 'spq2-5',
        questionTypeBadge: 'Mínusz Előjel a Négyzet Előtt',
        question: 'Mennyi a - (x - 4)² kifejezés felbontott alakja?',
        options: ['-x² + 8x - 16', '-x² - 8x + 16', '-x² - 8x - 16', 'x² - 8x + 16'],
        correctAnswer: 0,
        hint: 'Előbb emelj négyzetre: (x - 4)² = x² - 8x + 16, majd minden előjelet fordíts meg!',
        explanation: '- (x² - 8x + 16) = -x² + 8x - 16.'
      },
      {
        id: 'spq2-6',
        questionTypeBadge: 'Négyzet Fejszámolás: 49²',
        question: 'Mennyi a 49² pontos értéke az azonosság segítségével?',
        options: ['2401', '2499', '2301', '2411'],
        correctAnswer: 0,
        hint: '49² = (50 - 1)² = 50² - 2·50·1 + 1² = 2500 - 100 + 1 = ?',
        explanation: '(50 - 1)² = 2500 - 100 + 1 = 2401.'
      },
      {
        id: 'spq2-7',
        questionTypeBadge: 'Fejszámolás: 102 · 98',
        question: 'Mennyi a 102 · 98 szorzat értéke fejszámolással?',
        options: ['9996', '9994', '10004', '9986'],
        correctAnswer: 0,
        hint: '(100 + 2)(100 - 2) = 100² - 2² = 10 000 - 4 = ?',
        explanation: '100² - 4 = 10 000 - 4 = 9996.'
      },
      {
        id: 'spq2-8',
        questionTypeBadge: 'Törtes Összeg Négyzete',
        question: 'Mennyi az (x + 1/2)² kifejezés kibontott alakja?',
        options: ['x² + x + 1/4', 'x² + 1/4', 'x² + (1/2)x + 1/4', 'x² + 2x + 1/4'],
        correctAnswer: 0,
        hint: 'A középső tag: 2 · x · (1/2) = 1x = x. A harmadik tag: (1/2)² = 1/4.',
        explanation: 'x² + 2·x·(1/2) + (1/2)² = x² + x + 1/4.'
      },
      {
        id: 'spq2-9',
        questionTypeBadge: 'Törtes Négyzetek Különbsége',
        question: 'Mennyi az (x - 1/3)(x + 1/3) szorzat értéke?',
        options: ['x² - 1/9', 'x² + 1/9', 'x² - 1/3', 'x² - (2/3)x - 1/9'],
        correctAnswer: 0,
        hint: '(a - b)(a + b) = a² - b² = x² - (1/3)² = ?',
        explanation: 'x² - (1/3)² = x² - 1/9.'
      },
      {
        id: 'spq2-10',
        questionTypeBadge: 'Másodfokú Tag Négyzete',
        question: 'Mennyi az (x² + 3)² kifejezés kibontott alakja?',
        options: ['x⁴ + 6x² + 9', 'x⁴ + 9', 'x⁴ + 3x² + 9', 'x⁴ + 6x + 9'],
        correctAnswer: 0,
        hint: '(x²)² = x⁴. A kétszeres szorzat: 2 · x² · 3 = 6x².',
        explanation: '(x²)² + 2·x²·3 + 3² = x⁴ + 6x² + 9.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Két Azonosság Különbsége és Összetett Kifejezések (Haladó)',
    subtitle: 'Négyzetek különbsége láncok, köbös azonosságok és érettségi típusfeladatok.',
    range: '21 - 30. feladat',
    focus: 'Összetett Azonosságok és Alkalmazások',
    questions: [
      {
        id: 'spq3-1',
        questionTypeBadge: 'Két Négyzet Különbsége (Érettségi Típus)',
        question: 'Mennyi az (x + 3)² - (x - 2)² kifejezés legegyszerűbb alakja?',
        options: ['10x + 5', '10x + 13', '2x + 5', '5'],
        correctAnswer: 0,
        hint: '(x² + 6x + 9) - (x² - 4x + 4) = x² + 6x + 9 - x² + 4x - 4 = ?',
        explanation: '(x² + 6x + 9) - (x² - 4x + 4) = 6x + 4x + 9 - 4 = 10x + 5.'
      },
      {
        id: 'spq3-2',
        questionTypeBadge: 'Azonosság és Monom Szorzata',
        question: 'Mennyi a (2x + 1)² - 4x(x + 2) kifejezés összevont értéke?',
        options: ['-4x + 1', '4x + 1', '1', '-12x + 1'],
        correctAnswer: 0,
        hint: '(4x² + 4x + 1) - (4x² + 8x) = 4x² + 4x + 1 - 4x² - 8x = ?',
        explanation: '4x² + 4x + 1 - 4x² - 8x = -4x + 1.'
      },
      {
        id: 'spq3-3',
        questionTypeBadge: 'Négyzetek Különbsége és Teljes Négyzet',
        question: 'Mennyi az (x + 4)(x - 4) - (x - 3)² kifejezés legegyszerűbb alakja?',
        options: ['6x - 25', '6x - 7', '-6x - 25', '-25'],
        correctAnswer: 0,
        hint: '(x² - 16) - (x² - 6x + 9) = x² - 16 - x² + 6x - 9 = ?',
        explanation: '(x² - 16) - (x² - 6x + 9) = 6x - 25.'
      },
      {
        id: 'spq3-4',
        questionTypeBadge: 'Teljes Négyzetté Kiegészítés',
        question: 'Melyik számot kell beírni a ? helyére, hogy az x² + 14x + ? kifejezés teljes négyzet legyen?',
        options: ['49', '14', '28', '7'],
        correctAnswer: 0,
        hint: 'A középső tag 14x = 2 · x · 7, így b = 7. A hiányzó tag b² = 7² = ?',
        explanation: 'x² + 2·x·7 + 7² = (x + 7)², tehát a hiányzó szám 7² = 49.'
      },
      {
        id: 'spq3-5',
        questionTypeBadge: 'Kéttagú Összeg Köbe: (a + b)³',
        question: 'Mennyi az (x + 2)³ kifejezés kibontott alakja az (a + b)³ = a³ + 3a²b + 3ab² + b³ azonosság szerint?',
        options: ['x³ + 6x² + 12x + 8', 'x³ + 8', 'x³ + 6x + 8', 'x³ + 2x² + 4x + 8'],
        correctAnswer: 0,
        hint: 'a = x, b = 2. 3a²b = 3·x²·2 = 6x². 3ab² = 3·x·4 = 12x. b³ = 2³ = 8.',
        explanation: 'x³ + 3·x²·2 + 3·x·2² + 2³ = x³ + 6x² + 12x + 8.'
      },
      {
        id: 'spq3-6',
        questionTypeBadge: 'Kéttagú Különbség Köbe: (a - b)³',
        question: 'Mennyi az (x - 1)³ kifejezés kibontott alakja?',
        options: ['x³ - 3x² + 3x - 1', 'x³ - 1', 'x³ - 3x² - 3x - 1', 'x³ + 3x² - 3x + 1'],
        correctAnswer: 0,
        hint: '(a - b)³ = a³ - 3a²b + 3ab² - b³. Figyeld az előjelek váltakozását: +, -, +, -!',
        explanation: 'x³ - 3·x²·1 + 3·x·1² - 1³ = x³ - 3x² + 3x - 1.'
      },
      {
        id: 'spq3-7',
        questionTypeBadge: 'Geometriai Területnövekedés',
        question: 'Egy x oldalú négyzet mindkét oldalát 3 méterrel megnöveljük. Hány négyzetméterrel nőtt a területe az eredeti x²-hez képest?',
        figure: <SumSquareSvg size={170} />,
        options: ['6x + 9 m²-rel', '9 m²-rel', '6x m²-rel', '3x + 9 m²-rel'],
        correctAnswer: 0,
        hint: 'Új terület = (x + 3)² = x² + 6x + 9. A növekmény: (x + 3)² - x² = ?',
        explanation: '(x + 3)² - x² = x² + 6x + 9 - x² = 6x + 9.'
      },
      {
        id: 'spq3-8',
        questionTypeBadge: 'Négyzetek Különbsége Szorzattá Alakítva',
        question: 'Melyik szorzattal egyenlő a 49x² - 64y² kifejezés?',
        options: ['(7x + 8y)(7x - 8y)', '(7x - 8y)²', '(7x + 8y)²', '(49x + 64y)(49x - 64y)'],
        correctAnswer: 0,
        hint: '49x² = (7x)², és 64y² = (8y)². a² - b² = (a + b)(a - b).',
        explanation: '(7x)² - (8y)² = (7x + 8y)(7x - 8y).'
      },
      {
        id: 'spq3-9',
        questionTypeBadge: 'Gyors Négyzetszámítás: 99²',
        question: 'Mennyi a 99² értéke az azonosság segítségével?',
        options: ['9801', '9809', '9901', '9701'],
        correctAnswer: 0,
        hint: '99² = (100 - 1)² = 100² - 2·100·1 + 1² = 10 000 - 200 + 1 = ?',
        explanation: '10 000 - 200 + 1 = 9801.'
      },
      {
        id: 'spq3-10',
        questionTypeBadge: 'Kettős Négyzetek Különbsége Lánc',
        question: 'Mennyi az (x - 2)(x + 2)(x² + 4) szorzat legkisebb tagokból álló alakja?',
        options: ['x⁴ - 16', 'x⁴ + 16', 'x⁴ - 4', 'x⁴ - 8'],
        correctAnswer: 0,
        hint: 'Előbb (x - 2)(x + 2) = x² - 4. Utána: (x² - 4)(x² + 4) = (x²)² - 4² = ?',
        explanation: '(x² - 4)(x² + 4) = (x²)² - 4² = x⁴ - 16.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. Összeg Négyzete',
    badge: '(a + b)²',
    points: [
      '(a + b)² = a² + 2ab + b².',
      'Soha ne hagyd el a középső +2ab tagot!',
      'Geometriai modell: 1 nagy négyzet (a²), 2 téglalap (2ab), 1 kis négyzet (b²).'
    ]
  },
  {
    title: '2. Különbség Négyzete',
    badge: '(a - b)²',
    points: [
      '(a - b)² = a² - 2ab + b².',
      'A középső tag negatív (-2ab), de a b² MINDIG pozitív (+b²)!',
      '(a - b)² = (b - a)², pl. (3 - x)² = (x - 3)².'
    ]
  },
  {
    title: '3. Négyzetek Különbsége',
    badge: '(a + b)(a - b)',
    points: [
      '(a + b)(a - b) = a² - b².',
      'A vegyes tagok kiejtik egymást (+ab - ab = 0).',
      'Villámgyors fejszámolás: 51·49 = 50² - 1 = 2499.'
    ]
  },
  {
    title: 'Haladó Azonosságok',
    badge: 'Köbök',
    points: [
      '(a + b)³ = a³ + 3a²b + 3ab² + b³.',
      '(a - b)³ = a³ - 3a²b + 3ab² - b³.',
      'Két négyzet kivonásakor a második zárójel előjelei fordulnak: (x+a)² - (x-b)².'
    ]
  }
];

export const SpecialProductsQuiz: React.FC<SpecialProductsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Nevezetes Szorzatok – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten az összeg és különbség négyzete, valamint a négyzetek különbségének begyakorlására"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 3. TÉMAKÖR"
      themeColor="purple"
      storageKey="grade9-special-products-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-nevezetes-quiz"
      topicTitle="Nevezetes szorzatok"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket, zárójeles alakokat és azonosságokat az eredményükkel!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SpecialProductsMatcher
              key={`special-products-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket azonosság típusa, tagok száma és középső tag szerint!',
          badgeText: '11-12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SpecialProductsSorter
              key={`special-products-sorter-${level}`}
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
