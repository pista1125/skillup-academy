import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AlgebraicOperationsMatcher } from './AlgebraicOperationsMatcher';
import { AlgebraicOperationsSorter } from './AlgebraicOperationsSorter';
import {
  DistributiveLawSvg,
  DoubleBracketSvg,
  MinusBracketSvg,
  LikeTermsCombineSvg
} from './AlgebraicOperationsFigures';
import { ArrowRightLeft, LayoutGrid, Shuffle, Split, Layers, Calculator } from 'lucide-react';

interface AlgebraicOperationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Egynemű Kifejezések Összevonása és Alapműveletek (Könnyű)',
    subtitle: 'Egynemű tagok felismerése, összevonás, előjeles együtthatók és egyszerű zárójelfelbontás.',
    range: '1 - 10. feladat',
    focus: 'Összevonás és Alapvető Műveletek',
    questions: [
      {
        id: 'aq1-1',
        questionTypeBadge: 'Egynemű Tagok Összevonása',
        question: 'Mennyi a 7x - 12x kifejezés legegyszerűbb összevont alakja?',
        figure: <LikeTermsCombineSvg size={170} />,
        options: ['-5x', '5x', '-5x²', '-19x'],
        correctAnswer: 0,
        hint: 'Csak az együtthatókat vond össze: 7 - 12 = ?',
        explanation: 'A betűs rész változatlan marad, az együtthatókat kivonjuk: (7 - 12)x = -5x.'
      },
      {
        id: 'aq1-2',
        questionTypeBadge: 'Negatív Együtthatók',
        question: 'Mi a -4a² - 6a² kifejezés összevont értéke?',
        options: ['-10a²', '10a²', '-10a⁴', '-2a²'],
        correctAnswer: 0,
        hint: 'Két negatív szám összege: -4 + (-6) = -10.',
        explanation: '(-4 - 6)a² = -10a². Ne feledd, az összeadásnál a kitevő nem változik, nem lesz a⁴!'
      },
      {
        id: 'aq1-3',
        questionTypeBadge: 'Különnemű Tagok Szétválogatása',
        question: 'Mennyi a 4a + 7b - 2a + 3b kifejezés legegyszerűbb alakja?',
        options: ['2a + 10b', '6a + 10b', '12ab', '2a + 4b'],
        correctAnswer: 0,
        hint: 'Vond össze az a-s tagokat külön (4a - 2a), és a b-s tagokat külön (7b + 3b)!',
        explanation: '(4a - 2a) + (7b + 3b) = 2a + 10b. Az a és b tagok nem vonhatók tovább össze!'
      },
      {
        id: 'aq1-4',
        questionTypeBadge: 'Zárójelfelbontás Pozitív Számmal',
        question: 'Mennyi a 3 · (2x - 5) szorzat felbontott alakja a disztributivitás alapján?',
        figure: <DistributiveLawSvg size={170} />,
        options: ['6x - 15', '6x - 5', '5x - 15', '6x + 15'],
        correctAnswer: 0,
        hint: 'A zárójelen belüli mindkét tagot meg kell szorozni 3-mal: 3 · 2x és 3 · (-5).',
        explanation: '3 · 2x + 3 · (-5) = 6x - 15.'
      },
      {
        id: 'aq1-5',
        questionTypeBadge: 'Mínusz Előjel a Zárójel Előtt',
        question: 'Hogyan alakul a kifejezés a zárójel elhagyása után: - (3x - 8)?',
        figure: <MinusBracketSvg size={170} />,
        options: ['-3x + 8', '-3x - 8', '3x + 8', '3x - 8'],
        correctAnswer: 0,
        hint: 'A mínuszjel megfordítja az összes zárójelen belüli tag előjelét!',
        explanation: '-(3x - 8) = -3x - (-8) = -3x + 8. A -8 ellentettje +8!'
      },
      {
        id: 'aq1-6',
        questionTypeBadge: 'Változók Szorzása',
        question: 'Mennyi a 2x · 4x szorzat értéke?',
        options: ['8x²', '8x', '6x²', '6x'],
        correctAnswer: 0,
        hint: 'Az együtthatókat megszorozzuk (2 · 4 = 8), a változókat is megszorozzuk (x · x = x²).',
        explanation: '(2 · 4) · (x · x) = 8x².'
      },
      {
        id: 'aq1-7',
        questionTypeBadge: 'Nulla Eredményű Összevonás',
        question: 'Mennyi a 4x² + 3x - 4x² kifejezés legegyszerűbb alakja?',
        options: ['3x', '0', '8x² + 3x', '3x³'],
        correctAnswer: 0,
        hint: 'A 4x² és a -4x² tagok egymás ellentettjei, összegük 0.',
        explanation: '(4x² - 4x²) + 3x = 0 + 3x = 3x.'
      },
      {
        id: 'aq1-8',
        questionTypeBadge: 'Polinomok Összeadása',
        question: 'Mennyi a (3x + 4) + (2x - 9) kifejezés értéke?',
        options: ['5x - 5', '5x + 13', 'x - 5', '5x² - 5'],
        correctAnswer: 0,
        hint: 'Zárójel előtt + van, így zárójelek elhagyása után: 3x + 4 + 2x - 9 = ?',
        explanation: '(3x + 2x) + (4 - 9) = 5x - 5.'
      },
      {
        id: 'aq1-9',
        questionTypeBadge: 'Felcserélhető Változók Összevonása',
        question: 'Mennyi az 5xy - 8yx kifejezés értéke?',
        options: ['-3xy', '3xy', '-3x²y²', 'Nem vonható össze'],
        correctAnswer: 0,
        hint: 'A szorzás felcserélhető: yx = xy, így a két tag egynemű!',
        explanation: 'Mivel xy = yx, ezért 5xy - 8xy = (5 - 8)xy = -3xy.'
      },
      {
        id: 'aq1-10',
        questionTypeBadge: 'Konstans és Változó Összevonás',
        question: 'Mennyi a 6x + 8 - 4x - 11 kifejezés legegyszerűbb alakja?',
        options: ['2x - 3', '2x + 3', '10x - 19', '-x'],
        correctAnswer: 0,
        hint: '6x - 4x = 2x, és 8 - 11 = -3.',
        explanation: '(6x - 4x) + (8 - 11) = 2x - 3.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egytagú Szorzása Többtagúval és Előjeles Zárójelek (Közepes)',
    subtitle: 'Negatív szorzók, monom szorzása polinommal, zárójeles kivonások és előjelcsapdák.',
    range: '11 - 20. feladat',
    focus: 'Előjeles Zárójelfelbontás és Monom Szorzás',
    questions: [
      {
        id: 'aq2-1',
        questionTypeBadge: 'Negatív Szám Zárójelben',
        question: 'Mennyi a -4 · (3x - 5) szorzat felbontott alakja?',
        options: ['-12x + 20', '-12x - 20', '12x + 20', '-12x - 5'],
        correctAnswer: 0,
        hint: '-4 · 3x = -12x, és -4 · (-5) = +20 (két negatív szám szorzata pozitív!).',
        explanation: '-4 · 3x + (-4) · (-5) = -12x + 20.'
      },
      {
        id: 'aq2-2',
        questionTypeBadge: 'Változóval Való Szorzás',
        question: 'Mennyi a 2x · (3x² - 5x + 4) kifejezés felbontott alakja?',
        options: ['6x³ - 10x² + 8x', '6x² - 10x + 8', '5x³ - 7x² + 6x', '6x³ - 5x + 4'],
        correctAnswer: 0,
        hint: 'Szorozd meg 2x-szel mindhárom tagot: 2x · 3x², 2x · (-5x), 2x · 4. Kitevők összeadódnak!',
        explanation: '2x · 3x² = 6x³, 2x · (-5x) = -10x², 2x · 4 = 8x. Együtt: 6x³ - 10x² + 8x.'
      },
      {
        id: 'aq2-3',
        questionTypeBadge: 'Mínuszos Zárójel Kivonása',
        question: 'Mennyi a 9x - (4x - 7) kifejezés értéke az összevonás után?',
        figure: <MinusBracketSvg size={170} />,
        options: ['5x + 7', '5x - 7', '13x - 7', '13x + 7'],
        correctAnswer: 0,
        hint: '9x - 4x - (-7) = 9x - 4x + 7 = ?',
        explanation: '9x - 4x + 7 = 5x + 7. A -7-ből a zárójel előtti mínusz miatt +7 lesz!'
      },
      {
        id: 'aq2-4',
        questionTypeBadge: 'Két Polinom Kivonása',
        question: 'Mennyi a (5x² - 3x + 2) - (2x² + 4x - 6) kifejezés összevont alakja?',
        options: ['3x² - 7x + 8', '3x² + x - 4', '3x² - 7x - 4', '7x² + x + 8'],
        correctAnswer: 0,
        hint: 'Bontsd fel a második zárójelet: -2x² - 4x + 6, majd vond össze az egynemű tagokat!',
        explanation: '5x² - 3x + 2 - 2x² - 4x + 6 = (5-2)x² + (-3-4)x + (2+6) = 3x² - 7x + 8.'
      },
      {
        id: 'aq2-5',
        questionTypeBadge: 'Hatványok Szorzása Monomban',
        question: 'Mennyi a -3x² · (-5x³) szorzat pontos értéke?',
        options: ['15x⁵', '-15x⁵', '15x⁶', '-15x⁶'],
        correctAnswer: 0,
        hint: '(-3) · (-5) = +15. x² · x³ = x^(2+3) = x⁵ (a kitevőket összeadjuk!).',
        explanation: 'Két negatív szám szorzata pozitív: 15. Azonos alapú hatványoknál a kitevőket összeadjuk: 2 + 3 = 5, tehát 15x⁵.'
      },
      {
        id: 'aq2-6',
        questionTypeBadge: 'Zárójelfelbontás és Összevonás',
        question: 'Mennyi a 3(x - 4) + 2(5 - x) kifejezés összevont alakja?',
        options: ['x - 2', 'x - 22', '5x - 2', 'x + 2'],
        correctAnswer: 0,
        hint: '3x - 12 + 10 - 2x = (3x - 2x) + (-12 + 10) = ?',
        explanation: '3x - 12 + 10 - 2x = x - 2.'
      },
      {
        id: 'aq2-7',
        questionTypeBadge: 'Téglalap Terület Modellezése',
        question: 'Egy téglalap oldalai 3x és (2x + 5) méter hosszúak. Melyik polinom fejezi ki a területét (T)?',
        figure: <DistributiveLawSvg size={170} />,
        options: ['6x² + 15x', '6x² + 5', '5x + 5', '6x + 15'],
        correctAnswer: 0,
        hint: 'T = a · b = 3x · (2x + 5) = ?',
        explanation: 'T = 3x · 2x + 3x · 5 = 6x² + 15x.'
      },
      {
        id: 'aq2-8',
        questionTypeBadge: 'Többváltozós Monom Szorzás',
        question: 'Mennyi a -2ab · (3a - 4b) kifejezés kibontott alakja?',
        options: ['-6a²b + 8ab²', '-6a²b - 8ab²', '6a²b - 8ab²', '-6ab + 8ab'],
        correctAnswer: 0,
        hint: '-2ab · 3a = -6a²b, és -2ab · (-4b) = +8ab².',
        explanation: '-2ab · 3a + (-2ab) · (-4b) = -6a²b + 8ab².'
      },
      {
        id: 'aq2-9',
        questionTypeBadge: 'Tört Együtthatós Zárójelfelbontás',
        question: 'Mennyi a (1/3) · (9x - 12) kifejezés felbontott alakja?',
        options: ['3x - 4', '3x - 12', '9x - 4', '27x - 36'],
        correctAnswer: 0,
        hint: '1/3 · 9x = 3x, és 1/3 · (-12) = -4.',
        explanation: '(9x / 3) - (12 / 3) = 3x - 4.'
      },
      {
        id: 'aq2-10',
        questionTypeBadge: 'Beágyazott Zárójel',
        question: 'Mennyi a 8 - [4x - (x + 3)] kifejezés legegyszerűbb alakja?',
        options: ['11 - 3x', '5 - 3x', '11 - 5x', '5 - 5x'],
        correctAnswer: 0,
        hint: 'Előbb a belső zárójel: 4x - x - 3 = 3x - 3. Utána a külső: 8 - (3x - 3) = 8 - 3x + 3 = ?',
        explanation: '8 - [3x - 3] = 8 - 3x + 3 = 11 - 3x.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Két Binom Szorzása és Összetett Algebrai Kifejezések (Haladó)',
    subtitle: '(a+b)(c+d) szabály, két szorzat különbsége, előjeles láncok és érettségi típuspéldák.',
    range: '21 - 30. feladat',
    focus: 'Polinomok Szorzása és Összetett Kifejezések',
    questions: [
      {
        id: 'aq3-1',
        questionTypeBadge: 'Két Binom Szorzata',
        question: 'Mennyi az (x + 3)(x - 5) szorzat összevont, legegyszerűbb alakja?',
        figure: <DoubleBracketSvg size={170} />,
        options: ['x² - 2x - 15', 'x² + 2x - 15', 'x² - 15', 'x² - 8x - 15'],
        correctAnswer: 0,
        hint: 'Minden tagot minden taggal: x·x - 5·x + 3·x - 15 = x² - 5x + 3x - 15 = ?',
        explanation: 'x² - 5x + 3x - 15 = x² - 2x - 15.'
      },
      {
        id: 'aq3-2',
        questionTypeBadge: 'Két Negatív Tag Szorzása',
        question: 'Mennyi az (x - 4)(x - 7) szorzat összevont alakja?',
        options: ['x² - 11x + 28', 'x² - 11x - 28', 'x² + 11x + 28', 'x² - 3x + 28'],
        correctAnswer: 0,
        hint: 'A középső tag: (-4 - 7)x = -11x. A konstans: (-4) · (-7) = +28.',
        explanation: 'x² - 7x - 4x + 28 = x² - 11x + 28.'
      },
      {
        id: 'aq3-3',
        questionTypeBadge: 'Együtthatós Binomok Szorzata',
        question: 'Mennyi a (2x + 3)(3x - 4) szorzat felbontott és összevont alakja?',
        figure: <DoubleBracketSvg size={170} />,
        options: ['6x² + x - 12', '6x² - x - 12', '6x² + 17x - 12', '5x² - x - 12'],
        correctAnswer: 0,
        hint: '2x·3x + 2x·(-4) + 3·3x + 3·(-4) = 6x² - 8x + 9x - 12 = ?',
        explanation: '6x² - 8x + 9x - 12 = 6x² + x - 12.'
      },
      {
        id: 'aq3-4',
        questionTypeBadge: 'Két Szorzat Különbsége (Érettségi Típus)',
        question: 'Mennyi a (x + 2)(x + 3) - (x - 1)(x + 4) kifejezés legegyszerűbb alakja?',
        options: ['2x + 10', '3x + 10', 'x² + 3x + 10', '7x + 2'],
        correctAnswer: 0,
        hint: '1. szorzat: x² + 5x + 6. 2. szorzat: x² + 3x - 4. Különbségük: (x² + 5x + 6) - (x² + 3x - 4) = ?',
        explanation: '(x² + 5x + 6) - (x² + 3x - 4) = x² + 5x + 6 - x² - 3x + 4 = 2x + 10.'
      },
      {
        id: 'aq3-5',
        questionTypeBadge: 'Mínusz Szorzat Előtt',
        question: 'Mennyi a - (x - 3)(x + 5) kifejezés felbontott alakja?',
        figure: <MinusBracketSvg size={170} />,
        options: ['-x² - 2x + 15', '-x² + 2x - 15', '-x² + 2x + 15', 'x² + 2x - 15'],
        correctAnswer: 0,
        hint: 'Először szorozd össze a zárójeleket: x² + 2x - 15. Majd vedd a teljes kifejezés ellentettjét!',
        explanation: '- (x² + 5x - 3x - 15) = - (x² + 2x - 15) = -x² - 2x + 15.'
      },
      {
        id: 'aq3-6',
        questionTypeBadge: 'Binom és Trinom Szorzata',
        question: 'Mennyi az (x + 2)(x² - 2x + 4) szorzat értéke minden tag összeszorzása és összevonása után?',
        options: ['x³ + 8', 'x³ - 8', 'x³ - 4x² + 8', 'x³ + 4x² - 8'],
        correctAnswer: 0,
        hint: 'x(x² - 2x + 4) = x³ - 2x² + 4x. 2(x² - 2x + 4) = 2x² - 4x + 8. Vond össze!',
        explanation: 'x³ - 2x² + 4x + 2x² - 4x + 8 = x³ + (-2x² + 2x²) + (4x - 4x) + 8 = x³ + 8. (Ez a köbök összege azonosság!).'
      },
      {
        id: 'aq3-7',
        questionTypeBadge: 'Területnövekedés Modellezése',
        question: 'Egy x oldalú négyzet egyik oldalát 4-gyel növeljük, a másikat 2-vel csökkentjük. Hány egységgel változik a területe az eredeti x²-hez képest?',
        options: ['2x - 8 egységgel', '2x + 8 egységgel', '-8 egységgel', '4x - 2 egységgel'],
        correctAnswer: 0,
        hint: 'Új terület = (x + 4)(x - 2) = x² + 2x - 8. Ebből kivonva az eredeti x²-et: ?',
        explanation: '(x + 4)(x - 2) - x² = x² + 2x - 8 - x² = 2x - 8.'
      },
      {
        id: 'aq3-8',
        questionTypeBadge: 'Negatív Előjeles Binomok',
        question: 'Mennyi a (3 - 2x)(4 - x) szorzat összevont polinom alakja csökkenő fokszám szerint?',
        options: ['2x² - 11x + 12', '-2x² - 11x + 12', '2x² + 11x + 12', '-2x² + 5x + 12'],
        correctAnswer: 0,
        hint: '3·4 - 3·x - 2x·4 + 2x·x = 12 - 3x - 8x + 2x² = 2x² - 11x + 12.',
        explanation: '(-2x) · (-x) = 2x². A keresztszorzatok: 3 · (-x) + (-2x) · 4 = -3x - 8x = -11x. A konstans: 3 · 4 = 12. Összesen: 2x² - 11x + 12.'
      },
      {
        id: 'aq3-9',
        questionTypeBadge: 'Helyettesítési Érték Szorzat Kifejezésben',
        question: 'Mennyi a (2x - 1)(x + 4) - 2x² kifejezés értéke x = 3 esetén?',
        options: ['17', '21', '35', '14'],
        correctAnswer: 0,
        hint: 'Kibontva: 2x² + 7x - 4 - 2x² = 7x - 4. x = 3 esetén: 7 · 3 - 4 = ?',
        explanation: '(2x² + 8x - x - 4) - 2x² = 7x - 4. Behelyettesítve x = 3: 7 · 3 - 4 = 21 - 4 = 17.'
      },
      {
        id: 'aq3-10',
        questionTypeBadge: 'Három Kéttagú Szorzata',
        question: 'Mennyi az x(x + 1)(x + 2) szorzat rendezett polinom alakja?',
        options: ['x³ + 3x² + 2x', 'x³ + 2x² + 2x', 'x³ + 3x + 2', '3x³ + 2x'],
        correctAnswer: 0,
        hint: 'Először (x + 1)(x + 2) = x² + 3x + 2, majd ezt szorozzuk x-szel.',
        explanation: 'x · (x² + 3x + 2) = x · x² + x · 3x + x · 2 = x³ + 3x² + 2x.'
      }
    ]
  }
};

// Gyors puskakártya adatok a kvízhez
const cheatSheetData: CheatSheetCard[] = [
  {
    title: 'Egynemű Tagok Összevonása',
    badge: 'Alapszabály',
    points: [
      'Csak akkor vonható össze, ha a változók és azok kitevői teljesen azonosak.',
      'Összevonáskor csak az együtthatókat adjuk össze/vonjuk ki: ax + bx = (a+b)x.',
      'Összeadáskor a kitevő SOHA nem változik meg! (3x² + 2x² = 5x²).'
    ]
  },
  {
    title: 'Zárójelfelbontás Előjelei',
    badge: 'Mínusz Szabály',
    points: [
      'Zárójel előtt + jel: a tagok előjele változatlan marad.',
      'Zárójel előtt - jel: MINDEN belső tag előjele az ellentettjére fordul: -(a - b) = -a + b.',
      'Gyakori hiba csak az első tag előjelét megváltoztatni!'
    ]
  },
  {
    title: 'Disztributív Szorzás: a(b + c)',
    badge: 'Egytagú × Polinom',
    points: [
      'Az egytagúval a zárójel minden tagját megszorozzuk.',
      'Változók szorzásakor a kitevőket összeadjuk: x · x² = x³.',
      'Előjelszabály: (+)·(+) = (+), (-)·(-) = (+), (+)·(-) = (-).'
    ]
  },
  {
    title: 'Két Binom Szorzása: (a+b)(c+d)',
    badge: 'Minden tagot mindennel',
    points: [
      '(a + b)(c + d) = ac + ad + bc + bd.',
      'Négy részszorzat keletkezik, melyekből az egynemű középső tagokat összevonjuk.',
      'Kivonásnál: -(x+a)(x+b) esetén előbb szorozz, és tartsd zárójelben a szorzatot!'
    ]
  }
];

export const AlgebraicOperationsQuiz: React.FC<AlgebraicOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Számolás az Algebrában – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten az összevonás, zárójelfelbontás és polinomok szorzásának alapos begyakorlására"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 2. TÉMAKÖR"
      themeColor="cyan"
      storageKey="grade9-algebraic-operations-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-algebrai-szamolas-quiz"
      topicTitle="Számolás az algebrában"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket, zárójelfelbontásokat és szorzatokat az eredményükkel!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <AlgebraicOperationsMatcher
              key={`algebraic-operations-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket konstans előjele, fokszám és eredmény szerint!',
          badgeText: '11-12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <AlgebraicOperationsSorter
              key={`algebraic-operations-sorter-${level}`}
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
