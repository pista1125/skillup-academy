import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowersPracticeMatcher } from './PowersPracticeMatcher';
import { PowersPracticeSorter } from './PowersPracticeSorter';
import {
  AlgebraicFractionSimplificationSvg,
  PrimeFactorizationPowersSvg,
  PowersComparisonSvg,
  FactoringPowersSvg
} from './PowersPracticeFigures';

interface PowersPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Összetett algebrai törtek egyszerűsítése',
    description: '1. Külső kitevő szétbontása ((X·Y)/Z)ⁿ = XⁿYⁿ/Zⁿ. 2. Kitevők szorzása (aᵖ)ⁿ = aᵖⁿ. 3. Negatív kitevők reciprok átrendezése: a⁻ᵏ = 1/aᵏ.',
    note: 'Fontos: Ne felejtsd el a számegyütthatót is hatványozni! Pl. (2a⁻³)² = 4a⁻⁶.',
    color: 'from-purple-500 to-indigo-600',
    figure: <AlgebraicFractionSimplificationSvg size={180} />
  },
  {
    title: 'Összetett számalapok prímhatvány-bontása',
    description: 'Bontsd az alapokat prímek szorzatára: 12 = 2²·3 ⟹ 12ⁿ = 2²ⁿ·3ⁿ; 18 = 2·3² ⟹ 18ⁿ = 2ⁿ·3²ⁿ; 50 = 2·5² ⟹ 50ⁿ = 2ⁿ·5²ⁿ.',
    note: 'Ezután az azonos alapú kitevők szorzásnál összeadódnak, osztásnál kivonódnak.',
    color: 'from-blue-500 to-sky-600',
    figure: <PrimeFactorizationPowersSvg size={180} />
  },
  {
    title: 'Különböző alapú és kitevőjű hatványok összehasonlítása',
    description: 'A) Közös alapra hozás: 4¹⁵ = (2²)¹⁵ = 2³⁰ és 8¹⁰ = (2³)¹⁰ = 2³⁰ ⟹ 4¹⁵ = 8¹⁰. B) Közös kitevő (LNKO): 2⁶⁰ = (2³)²⁰ = 8²⁰ < 9²⁰ = (3²)²⁰ = 3⁴⁰.',
    note: 'Ha az alap > 1, a nagyobb kitevőjű hatvány a nagyobb.',
    color: 'from-amber-500 to-orange-600',
    figure: <PowersComparisonSvg size={180} />
  },
  {
    title: 'Hatványok összege és a kiemelés technikája',
    description: 'NINCS azonosság hatványok összeadására! 2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹¹. Kiemelés: aⁿ⁺ᵏ - aⁿ = aⁿ(aᵏ - 1).',
    note: 'Példa: (3ⁿ⁺² - 3ⁿ) / (3ⁿ⁺¹ + 3ⁿ) = 3ⁿ(9 - 1) / 3ⁿ(3 + 1) = 8 / 4 = 2 minden n-re.',
    color: 'from-rose-500 to-red-600',
    figure: <FactoringPowersSvg size={180} />
  }
];

const quizLevels: Record<1 | 2 | 3, QuizLevelConfig> = {
  1: {
    title: '1. Szint: Prímhatványok és alapvető egyszerűsítések',
    subtitle: '10 feladat a prímhatványokra bontás, numerikus törtek és egyszerűbb algebrai hatványok begyakorlására',
    questions: [
      {
        id: 'ppq1-1',
        question: 'Hogyan írható fel a 12³ a legegyszerűbb prímhatványos alakban?',
        options: ['2⁶ · 3³', '2³ · 3³', '2⁵ · 3²', '4³ · 3³'],
        correctAnswer: 0,
        explanation: 'Mivel 12 = 2² · 3, ezért 12³ = (2² · 3)³ = (2²)³ · 3³ = 2⁶ · 3³.'
      },
      {
        id: 'ppq1-2',
        question: 'Mennyi 2⁵ · 4⁻² pontos értéke?',
        options: ['2', '1/2', '4', '8'],
        correctAnswer: 0,
        explanation: '4⁻² = (2²)⁻² = 2⁻⁴. Ekkor 2⁵ · 2⁻⁴ = 2⁵⁻⁴ = 2¹ = 2.'
      },
      {
        id: 'ppq1-5',
        question: 'Mivel egyenlő (a²b³)⁴, ha a, b ≠ 0?',
        options: ['a⁸b¹²', 'a⁶b⁷', 'a⁸b³', 'a²b¹²'],
        correctAnswer: 0,
        explanation: 'Szorzat hatványozásakor a tényezők kitevőit megszorozzuk a külső kitevővel: a²·⁴ · b³·⁴ = a⁸b¹².'
      },
      {
        id: 'ppq1-9',
        question: 'Egyszerűsítsd: (x⁴ · x⁻²) : x³ (x ≠ 0)!',
        options: ['x⁻¹', 'x⁻²', 'x²', 'x³'],
        correctAnswer: 0,
        explanation: 'Számláló: x⁴⁺⁽⁻²⁾ = x². Osztás: x² : x³ = x²⁻³ = x⁻¹ = 1/x.'
      },
      {
        id: 'ppq1-11',
        question: 'Melyik a helyes átalakítása a 2¹⁰ + 2¹⁰ összegnek?',
        options: ['2¹¹', '2²⁰', '4¹⁰', '4²⁰'],
        correctAnswer: 0,
        explanation: 'Két azonos szám összege a szám kétszerese: 2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹ · 2¹⁰ = 2¹¹.'
      },
      {
        id: 'ppq1-12',
        question: 'Egyszerűsítsd: (3a²)³ : (9a⁴) (a ≠ 0)!',
        options: ['3a²', 'a²', '27a²', '3a'],
        correctAnswer: 0,
        explanation: '(3a²)³ = 3³ · a⁶ = 27a⁶. Ekkor 27a⁶ : (9a⁴) = (27/9) · a⁶⁻⁴ = 3a².'
      },
      {
        id: 'ppq1-14',
        question: 'Mivel egyenlő (x⁻²)⁻⁴ (x ≠ 0)?',
        options: ['x⁸', 'x⁻⁸', 'x⁻⁶', 'x⁶'],
        correctAnswer: 0,
        explanation: 'Hatvány hatványozásakor a kitevők szorzódnak: (-2) · (-4) = +8, tehát x⁸.'
      },
      {
        id: 'ppq1-19',
        question: 'Melyik a nagyobb: 2³⁰ vagy 4¹⁵?',
        options: ['Egyenlőek', '2³⁰ a nagyobb', '4¹⁵ a nagyobb', 'Nem összehasonlítható'],
        correctAnswer: 0,
        explanation: '4¹⁵ = (2²)¹⁵ = 2³⁰. Mivel mindkettő pontosan 2³⁰, a két kifejezés értéke egyenlő!'
      },
      {
        id: 'ppq1-21',
        question: 'Egyszerűsítsd: (4x⁻³y) · (2x⁵y⁻¹) (x, y ≠ 0)!',
        options: ['8x²', '8x²y', '6x²', '8x⁻¹⁵'],
        correctAnswer: 0,
        explanation: 'Együtthatók: 4 · 2 = 8. x-alapúak: x⁻³⁺⁵ = x². y-alapúak: y¹⁺⁽⁻¹⁾ = y⁰ = 1. Eredmény: 8x².'
      },
      {
        id: 'ppq1-30',
        question: 'Mi a feltétele annak, hogy a (2x - 6)⁰ = 1 kifejezés értelmezett legyen?',
        options: ['x ≠ 3', 'x ≠ 0', 'x > 3', 'Minden x valós számra értelmezett'],
        correctAnswer: 0,
        explanation: 'A 0⁰ kifejezés nincs értelmezve a matematikában, így az alap nem lehet 0: 2x - 6 ≠ 0 ⟹ 2x ≠ 6 ⟹ x ≠ 3.'
      }
    ]
  },
  2: {
    title: '2. Szint: Összetett törtek, prímbontás és összehasonlítás',
    subtitle: '30 feladat betűs algebrai törtek egyszerűsítésére, közös alapra és kitevőre hozásra',
    questions: [
      {
        id: 'ppq2-1',
        question: 'Hozd a legegyszerűbb alakra: ((a⁻² · b³)² : (a⁻⁴ · b⁵)) (a, b ≠ 0)!',
        options: ['b', 'b²', 'ab', 'a⁻⁸b'],
        correctAnswer: 0,
        explanation: 'Számláló: (a⁻²)² · (b³)² = a⁻⁴ · b⁶. Osztás: a⁻⁴b⁶ : (a⁻⁴b⁵) = a⁻⁴⁻⁽⁻⁴⁾ · b⁶⁻⁵ = a⁰ · b¹ = b.'
      },
      {
        id: 'ppq2-2',
        question: 'Számítsd ki prímhatvány-bontással: (12⁴ · 18⁻²) : 6³!',
        options: ['8/27', '27/8', '2/3', '4/9'],
        correctAnswer: 0,
        explanation: '12⁴ = 2⁸ · 3⁴, 18⁻² = 2⁻² · 3⁻⁴, 6³ = 2³ · 3³. Számláló: 2⁸⁺⁽⁻²⁾ · 3⁴⁺⁽⁻⁴⁾ = 2⁶ · 3⁰ = 2⁶. Osztva 6³-nal: 2⁶ : (2³ · 3³) = 2⁶⁻³ · 3⁻³ = 2³ · 3⁻³ = 8 / 27.'
      },
      {
        id: 'ppq2-3',
        question: 'Melyik a nagyobb: 2⁶⁰ vagy 3⁴⁰?',
        options: ['3⁴⁰ a nagyobb', '2⁶⁰ a nagyobb', 'Egyenlőek', 'Nem dönthető el'],
        correctAnswer: 0,
        explanation: 'A kitevők lnko(60, 40) = 20. 2⁶⁰ = (2³)²⁰ = 8²⁰, míg 3⁴⁰ = (3²)²⁰ = 9²⁰. Mivel 8 < 9 ⟹ 8²⁰ < 9²⁰ ⟹ 3⁴⁰ a nagyobb!'
      },
      {
        id: 'ppq2-4',
        question: 'Egyszerűsítsd: ((2x⁻³y²) / (4x²y⁻¹))⁻² (x, y ≠ 0)!',
        options: ['4x¹⁰ / y⁶', 'x¹⁰ / (4y⁶)', '4x⁵ / y³', 'x⁵ / (2y³)'],
        correctAnswer: 0,
        explanation: 'Belső tört: (2/4) · x⁻³⁻² · y²⁻⁽⁻¹⁾ = ½ · x⁻⁵ · y³. Ennek a (-2). hatványa: (½)⁻² · (x⁻⁵)⁻² · (y³)⁻² = 2² · x¹⁰ · y⁻⁶ = 4x¹⁰ / y⁶.'
      },
      {
        id: 'ppq2-6',
        question: 'Egyszerűsítsd a (3ⁿ⁺² - 3ⁿ) : 3ⁿ kifejezést (n ∈ ℤ)!',
        options: ['8', '9', '6', '3'],
        correctAnswer: 0,
        explanation: 'Számlálóból kiemelve 3ⁿ-t: 3ⁿ · (3² - 1) = 3ⁿ · (9 - 1) = 3ⁿ · 8. 3ⁿ-nel egyszerűsítve: 8.'
      },
      {
        id: 'ppq2-8',
        question: 'Egyszerűsítsd: (x⁻¹ + y⁻¹)⁻¹ (x, y ≠ 0, x + y ≠ 0)!',
        options: ['(xy) / (x + y)', 'x + y', '1 / (x + y)', 'xy'],
        correctAnswer: 0,
        explanation: 'x⁻¹ + y⁻¹ = 1/x + 1/y = (y + x) / (xy). Ennek a reciproka (-1. hatványa): (xy) / (x + y).'
      },
      {
        id: 'ppq2-10',
        question: 'Hogyan írható fel a (2a⁻³ / b²)⁻³ kifejezés pozitív kitevőkkel?',
        options: ['(a⁹b⁶) / 8', '8a⁹ / b⁶', 'b⁶ / (8a⁹)', 'a⁹ / (8b⁶)'],
        correctAnswer: 0,
        explanation: 'A reciprok szabály szerint: (b² / (2a⁻³))³ = (b⁶) / (2³ · a⁻⁹) = (b⁶ · a⁹) / 8 = (a⁹b⁶) / 8.'
      },
      {
        id: 'ppq2-15',
        question: 'Egyszerűsítsd: (a⁻² - b⁻²) / (a⁻¹ - b⁻¹) (a, b ≠ 0, a ≠ b)!',
        options: ['a⁻¹ + b⁻¹', 'a⁻¹ - b⁻¹', 'a + b', 'ab'],
        correctAnswer: 0,
        explanation: 'A számláló két négyzet különbsége: a⁻² - b⁻² = (a⁻¹ - b⁻¹)(a⁻¹ + b⁻¹). Egyszerűsítve: a⁻¹ + b⁻¹ (vagy (a+b)/(ab)).'
      },
      {
        id: 'ppq2-21',
        question: 'Mivel egyenlő (x + x⁻¹)² kibontva (x ≠ 0)?',
        options: ['x² + 2 + x⁻²', 'x² + x⁻²', 'x² + 1 + x⁻²', '2x + 2x⁻¹'],
        correctAnswer: 0,
        explanation: 'Kéttagú összeg négyzete: (a + b)² = a² + 2ab + b². Mivel 2 · x · x⁻¹ = 2 · 1 = 2, a felbontás: x² + 2 + x⁻².'
      },
      {
        id: 'ppq2-23',
        question: 'Hogyan aránylik 2¹⁰⁰ a 4⁴⁹-hez?',
        options: ['2¹⁰⁰ négyszer akkora, mint 4⁴⁹', 'Egyenlőek', '2¹⁰⁰ fele akkora', '4⁴⁹ a nagyobb'],
        correctAnswer: 0,
        explanation: '4⁴⁹ = (2²)⁴⁹ = 2⁹⁸. 2¹⁰⁰ / 2⁹⁸ = 2¹⁰⁰⁻⁹⁸ = 2² = 4, tehát 2¹⁰⁰ pontosan 4-szer akkora!'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi és emelt szintű hatványos feladatok',
    subtitle: '10 komplex feladat hatványos egyenletekről, kiemelésekről, azonosságok láncolatáról és becslésekről',
    questions: [
      {
        id: 'ppq3-1',
        question: 'Számítsd ki a (3²⁰²⁵ - 3²⁰²³) / (3²⁰²⁴ + 3²⁰²³) tört pontos értékét!',
        options: ['2', '8/3', '4', '1'],
        correctAnswer: 0,
        explanation: 'Emeljük ki a legkisebb hatványt, 3²⁰²³-t: Számláló: 3²⁰²³ · (3² - 1) = 3²⁰²³ · 8. Nevező: 3²⁰²³ · (3¹ + 1) = 3²⁰²³ · 4. A hányados: 8 / 4 = 2!'
      },
      {
        id: 'ppq3-2',
        question: 'Melyik a legnagyobb a következő négy szám közül: A = 2¹⁰⁰, B = 3⁷⁵, C = 5⁵⁰, D = 10²⁵?',
        options: ['C = 5⁵⁰ a legnagyobb', 'B = 3⁷⁵ a legnagyobb', 'A = 2¹⁰⁰ a legnagyobb', 'D = 10²⁵ a legnagyobb'],
        correctAnswer: 0,
        explanation: 'Közös kitevő lnko(100, 75, 50, 25) = 25: A = (2⁴)²⁵ = 16²⁵; B = (3³)²⁵ = 27²⁵; C = (5²)²⁵ = 25²⁵; D = 10²⁵. Mivel 27 > 25 > 16 > 10, a legnagyobb B = 3⁷⁵!'
      },
      {
        id: 'ppq3-3',
        question: 'Ha 2ˣ = 3, mennyi 8ˣ értéke?',
        options: ['27', '9', '24', '18'],
        correctAnswer: 0,
        explanation: '8ˣ = (2³)ˣ = (2ˣ)³ = 3³ = 27.'
      },
      {
        id: 'ppq3-4',
        question: 'Ha 3ʸ = 5, mennyi 9ʸ⁺¹ értéke?',
        options: ['225', '75', '45', '125'],
        correctAnswer: 0,
        explanation: '9ʸ⁺¹ = 9ʸ · 9¹ = (3²)ʸ · 9 = (3ʸ)² · 9 = 5² · 9 = 25 · 9 = 225.'
      },
      {
        id: 'ppq3-6',
        question: 'Melyik n egész számra igaz, hogy 2ⁿ⁺¹ + 2ⁿ = 96?',
        options: ['n = 5', 'n = 4', 'n = 6', 'n = 7'],
        correctAnswer: 0,
        explanation: 'Kiemelve 2ⁿ-t: 2ⁿ · (2¹ + 1) = 3 · 2ⁿ = 96 ⟹ 2ⁿ = 32 = 2⁵ ⟹ n = 5.'
      },
      {
        id: 'ppq3-8',
        question: 'Mennyi a (2¹⁰ + 2¹⁰ + 2¹⁰ + 2¹⁰) · (3¹⁰ + 3¹⁰ + 3¹⁰) szorzat értéke?',
        options: ['4 · 6¹⁰ (vagy 2¹² · 3¹¹)', '6²⁰', '12¹⁰', '6¹¹'],
        correctAnswer: 0,
        explanation: 'Első tényező: 4 · 2¹⁰ = 2² · 2¹⁰ = 2¹². Második tényező: 3 · 3¹⁰ = 3¹¹. Szorzatuk: 2¹² · 3¹¹ = 2 · (2 · 3)¹¹ = 2 · 6¹¹ (vagy 4 · 6¹⁰).'
      },
      {
        id: 'ppq3-11',
        question: 'Ha a + a⁻¹ = 3, mennyi a² + a⁻² értéke?',
        options: ['7', '9', '11', '6'],
        correctAnswer: 0,
        explanation: 'Emeljük négyzetre az adott egyenletet: (a + a⁻¹)² = a² + 2 · a · a⁻¹ + a⁻² = a² + 2 + a⁻² = 3² = 9. Ebből levonva 2-t: a² + a⁻² = 7!'
      },
      {
        id: 'ppq3-13',
        question: 'Oldd meg a valós számok halmazán: 4ˣ - 3 · 2ˣ - 4 = 0!',
        options: ['x = 2', 'x = 4', 'x = 1 vagy x = -4', 'Nincs valós megoldás'],
        correctAnswer: 0,
        explanation: 'Legyen u = 2ˣ (u > 0). Ekkor 4ˣ = (2ˣ)² = u². Az egyenlet: u² - 3u - 4 = 0 ⟹ (u - 4)(u + 1) = 0. Mivel u > 0, csak u = 4 lehetséges ⟹ 2ˣ = 4 = 2² ⟹ x = 2.'
      },
      {
        id: 'ppq3-18',
        question: 'Mennyi (1 - 2⁻¹)(1 - 3⁻¹)(1 - 4⁻¹) · … · (1 - 100⁻¹) szorzat értéke?',
        options: ['1/100', '1/50', '99/100', '1/2'],
        correctAnswer: 0,
        explanation: 'A tényezők: (1/2) · (2/3) · (3/4) · … · (99/100). Minden belső számláló és nevező kiesik (teleszkopikus szorzat), így csak az első számláló (1) és az utolsó nevező (100) marad: 1/100!'
      },
      {
        id: 'ppq3-22',
        question: 'Mi az utolsó számjegye a 2²⁰²⁶ számnak?',
        options: ['4', '2', '8', '6'],
        correctAnswer: 0,
        explanation: 'A 2 hatványainak utolsó számjegyei 4 hosszú ciklust követnek: 2¹=2, 2²=4, 2³=8, 2⁴=6, 2⁵=2... Mivel 2026 = 4 · 506 + 2, a maradék 2, tehát az utolsó számjegy megegyezik 2²-ével: 4!'
      }
    ]
  }
};

export const PowersPracticeQuiz: React.FC<PowersPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hatvanyozas-negyzetgyok"
      topicTitle="3. Hatványozás gyakorlása"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PowersPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PowersPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

