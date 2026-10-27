import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowersPracticeMatcher } from './PowersPracticeMatcher';
import { PowersPracticeSorter } from './PowersPracticeSorter';
import {
  PrimeBaseDecompositionSvg,
  FractionMovementSvg,
  FactoringStrategySvg,
  PowerComparisonSvg
} from './PowersPracticeFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface PowersPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Átalakítások és Egyszerűsítések (Könnyű)',
    subtitle: 'Prímalapra hozás, negatív kitevők a törtvonalon, szorzat és tört hatványai.',
    range: '1 - 10. feladat',
    focus: 'Alapvető algebrai átalakítások',
    questions: [
      {
        id: 'ppq1-1',
        questionTypeBadge: 'Közös Alapra Hozás',
        question: 'Mennyi a 4³ · 8² szorzat értéke 2 hatványaként felírva?',
        figure: <PrimeBaseDecompositionSvg size={170} />,
        options: [
          '2¹²',
          '2¹⁰',
          '2¹⁶',
          '32⁵'
        ],
        correctAnswer: 0,
        hint: 'Írd át a 4-et és 8-at 2 hatványaként: 4 = 2² és 8 = 2³.',
        explanation: '4³ = (2²)³ = 2⁶, és 8² = (2³)² = 2⁶. A szorzat: 2⁶ · 2⁶ = 2⁶⁺⁶ = 2¹².'
      },
      {
        id: 'ppq1-2',
        questionTypeBadge: 'Negatív Kitevő a Nevezőben',
        question: 'Egyszerűsítsd az 5 / 5⁻³ törtet!',
        figure: <FractionMovementSvg size={170} />,
        options: [
          '5⁴ = 625',
          '5⁻² = 1/25',
          '5⁻⁴',
          '1'
        ],
        correctAnswer: 0,
        hint: 'A számláló 5¹, azonos alap osztásánál a kitevőket kivonjuk: 1 - (-3).',
        explanation: '5¹ / 5⁻³ = 5^{1 - (-3)} = 5¹⁺³ = 5⁴ = 625.'
      },
      {
        id: 'ppq1-3',
        questionTypeBadge: 'Szorzat Hatványozása',
        question: 'Melyik a (3x²)³ kifejezés helyes zárójel nélküli alakja?',
        options: [
          '27x⁶',
          '9x⁶',
          '3x⁶',
          '27x⁵'
        ],
        correctAnswer: 0,
        hint: 'A kitevő (3) a 3-as együtthatóra és az x²-re is vonatkozik: (ab)ⁿ = aⁿbⁿ.',
        explanation: '(3x²)³ = 3³ · (x²)³ = 27 · x²·³ = 27x⁶.'
      },
      {
        id: 'ppq1-4',
        questionTypeBadge: 'Tört Negatív Kitevőn',
        question: 'Mennyi a (3/4)⁻² tört pontos értéke?',
        options: [
          '16/9',
          '-9/16',
          '9/16',
          '-16/9'
        ],
        correctAnswer: 0,
        hint: 'A negatív kitevő megfordítja a törtet: (a/b)⁻ⁿ = (b/a)ⁿ.',
        explanation: '(3/4)⁻² = (4/3)² = 4² / 3² = 16/9.'
      },
      {
        id: 'ppq1-5',
        questionTypeBadge: 'Előjeles Hatványok',
        question: 'Számítsd ki a (-2)⁶ - (-2)⁵ kifejezés értékét!',
        options: [
          '96',
          '32',
          '-96',
          '0'
        ],
        correctAnswer: 0,
        hint: 'Páros kitevőn a negatív alap pozitív lesz, páratlan kitevőn negatív marad.',
        explanation: '(-2)⁶ = +64. (-2)⁵ = -32. A különbség: 64 - (-32) = 64 + 32 = 96.'
      },
      {
        id: 'ppq1-6',
        questionTypeBadge: 'Törtvonalon Átmozgatás',
        question: 'Írd át pozitív kitevőkkel az (a⁻² / b⁻³) kifejezést!',
        figure: <FractionMovementSvg size={170} />,
        options: [
          'b³ / a²',
          'a² / b³',
          '1 / (a² · b³)',
          '-b³ / a²'
        ],
        correctAnswer: 0,
        hint: 'A számlálóban lévő a⁻² lemegy a nevezőbe, a nevezőbeli b⁻³ felmegy a számlálóba.',
        explanation: 'a⁻² / b⁻³ = (1 / a²) / (1 / b³) = b³ / a².'
      },
      {
        id: 'ppq1-7',
        questionTypeBadge: 'Egyszerű Prímfelbontás',
        question: 'Mennyi a 6³ / (2² · 3³) tört értéke?',
        figure: <PrimeBaseDecompositionSvg size={170} />,
        options: [
          '2',
          '6',
          '1/2',
          '3'
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel a 6-ot: 6³ = (2 · 3)³ = 2³ · 3³.',
        explanation: '6³ / (2² · 3³) = (2³ · 3³) / (2² · 3³) = 2³⁻² · 3³⁻³ = 2¹ · 3⁰ = 2 · 1 = 2.'
      },
      {
        id: 'ppq1-8',
        questionTypeBadge: 'Nulladik Hatvány',
        question: 'Mennyi a (7x⁴ - 3y² + 15)⁰ kifejezés értéke, ha az alap nem nulla?',
        options: [
          '1',
          '0',
          '15',
          'Nem értelmezhető'
        ],
        correctAnswer: 0,
        hint: 'Bármilyen nemnulla algebrai kifejezés 0. hatványa pontosan 1.',
        explanation: 'Minden a ≠ 0 esetén a⁰ = 1, függetlenül attól, hogy hány tagú az alap.'
      },
      {
        id: 'ppq1-9',
        questionTypeBadge: 'Alapvető Összehasonlítás',
        question: 'Melyik a nagyobb: 2⁵⁰ vagy 4²⁵?',
        figure: <PowerComparisonSvg size={170} />,
        options: [
          'Egyenlő a két kifejezés értéke (2⁵⁰ = 4²⁵)',
          '2⁵⁰ a nagyobb',
          '4²⁵ a nagyobb',
          'Nem összehasonlítható'
        ],
        correctAnswer: 0,
        hint: 'Alakítsd át a 4²⁵-t 2-es alapra: 4 = 2².',
        explanation: '4²⁵ = (2²)²⁵ = 2²·²⁵ = 2⁵⁰. A két érték pontosan megegyezik!'
      },
      {
        id: 'ppq1-10',
        questionTypeBadge: 'Egyszerűbb Egyenlet',
        question: 'Oldd meg a 2^(x+2) = 64 egyenletet a valós számok halmazán!',
        options: [
          'x = 4',
          'x = 6',
          'x = 32',
          'x = 2'
        ],
        correctAnswer: 0,
        hint: 'Írd át a 64-et 2 hatványaként: 64 = 2⁶.',
        explanation: '2^(x+2) = 2⁶. Mivel az alapok azonosak és pozitívak (≠1), x + 2 = 6, amiből x = 4.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett Törtek és Kiemelési Technikák (Közepes)',
    subtitle: 'Kiemelés hatványösszegekből, prímfelbontásos egyszerűsítés, nagyságrendi becslés.',
    range: '11 - 20. feladat',
    focus: 'Kiemelés és Összetett Törtkifejezések',
    questions: [
      {
        id: 'ppq2-1',
        questionTypeBadge: 'Kiemelés Számlálóból',
        question: 'Mennyi a (2¹⁰ + 2¹²) / 2¹⁰ tört pontos értéke?',
        figure: <FactoringStrategySvg size={170} />,
        options: [
          '5',
          '2² = 4',
          '2¹² = 4096',
          '3'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki a számlálóból a kisebb kitevőjű tagot: 2¹⁰.',
        explanation: '(2¹⁰ + 2¹²) / 2¹⁰ = [2¹⁰ · (1 + 2²)] / 2¹⁰ = 1 + 4 = 5.'
      },
      {
        id: 'ppq2-2',
        questionTypeBadge: 'Törtkifejezés Prímalapokkal',
        question: 'Egyszerűsítsd a (9³ · 2⁷) / 6⁵ kifejezést!',
        figure: <PrimeBaseDecompositionSvg size={170} />,
        options: [
          '12',
          '6',
          '18',
          '4'
        ],
        correctAnswer: 0,
        hint: '9³ = (3²)³ = 3⁶ és 6⁵ = (2 · 3)⁵ = 2⁵ · 3⁵.',
        explanation: '(3⁶ · 2⁷) / (2⁵ · 3⁵) = 3⁶⁻⁵ · 2⁷⁻⁵ = 3¹ · 2² = 3 · 4 = 12.'
      },
      {
        id: 'ppq2-3',
        questionTypeBadge: 'Algebrai Tört Egyszerűsítése',
        question: 'Mennyi a (4x³ y⁻²)² / (2x⁴ y⁻⁵) kifejezés egyszerűsített alakja?',
        options: [
          '8x² y',
          '8x² / y',
          '2x² y',
          '16x² y'
        ],
        correctAnswer: 0,
        hint: 'Emeld négyzetre a számlálót: 16x⁶ y⁻⁴, majd vond ki a nevező kitevőit.',
        explanation: 'Számláló: 16x⁶ y⁻⁴. Osztás: (16/2) · x⁶⁻⁴ · y⁻⁴⁻⁽⁻⁵⁾ = 8 · x² · y¹ = 8x²y.'
      },
      {
        id: 'ppq2-4',
        questionTypeBadge: 'Változós Kiemelés',
        question: 'Mivel egyenlő a (3ⁿ⁺¹ + 3ⁿ) / 3ⁿ tört tetszőleges n egész szám esetén?',
        figure: <FactoringStrategySvg size={170} />,
        options: [
          '4',
          '3ⁿ⁺¹',
          '3',
          '3ⁿ + 1'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki 3ⁿ-t a számlálóból: 3ⁿ(3¹ + 1).',
        explanation: '(3ⁿ⁺¹ + 3ⁿ) / 3ⁿ = [3ⁿ(3 + 1)] / 3ⁿ = 4.'
      },
      {
        id: 'ppq2-5',
        questionTypeBadge: 'Közös Kitevőre Hozás',
        question: 'Hogyan aránylik egymáshoz 2³⁰⁰ és 3²⁰⁰ nagysága?',
        figure: <PowerComparisonSvg size={170} />,
        options: [
          '3²⁰⁰ a nagyobb (mert 8¹⁰⁰ < 9¹⁰⁰)',
          '2³⁰⁰ a nagyobb (mert a kitevő jóval nagyobb)',
          'Pontosan egyenlők',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'Hozd a kitevőket 100-as közös szorzóra: 2³⁰⁰ = (2³)¹⁰⁰ és 3²⁰⁰ = (3²)¹⁰⁰.',
        explanation: '2³⁰⁰ = 8¹⁰⁰, míg 3²⁰⁰ = 9¹⁰⁰. Mivel 8 < 9, így 8¹⁰⁰ < 9¹⁰⁰, tehát 3²⁰⁰ a nagyobb.'
      },
      {
        id: 'ppq2-6',
        questionTypeBadge: 'Többtagú Kiemelés',
        question: 'Számítsd ki a (5¹⁰⁰ - 5⁹⁸) / (5⁹⁸ · 24) kifejezés értékét!',
        options: [
          '1',
          '5',
          '25',
          '1/24'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki 5⁹⁸-at a számlálóból: 5⁹⁸(5² - 1).',
        explanation: 'A számláló: 5⁹⁸(25 - 1) = 5⁹⁸ · 24. A nevező is 5⁹⁸ · 24. Az osztás eredménye: 1.'
      },
      {
        id: 'ppq2-7',
        questionTypeBadge: 'Előjeles Zárójeles Csapda',
        question: 'Mennyi a -(-3)⁴ + (-2)³ kifejezés pontos értéke?',
        options: [
          '-89',
          '+73',
          '-73',
          '+89'
        ],
        correctAnswer: 0,
        hint: '(-3)⁴ = +81, de elöl van egy mínuszjel: -(81) = -81. (-2)³ = -8.',
        explanation: '-(-3)⁴ + (-2)³ = -(+81) + (-8) = -81 - 8 = -89.'
      },
      {
        id: 'ppq2-8',
        questionTypeBadge: 'Tört Alapú Csapda',
        question: 'Melyik reláció igaz az alábbiak közül?',
        figure: <PowerComparisonSvg size={170} />,
        options: [
          '(1/3)² > (1/3)⁴',
          '(1/3)² < (1/3)⁴',
          '(1/3)² = (1/3)⁴',
          '(1/3)⁻² < (1/3)⁻⁴'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az értékeket: (1/3)² = 1/9, (1/3)⁴ = 1/81.',
        explanation: 'Mivel 1/9 ≈ 0,111 > 1/81 ≈ 0,0123, így (1/3)² > (1/3)⁴. Tört alapnál a kisebb kitevő adja a nagyobb értéket!'
      },
      {
        id: 'ppq2-9',
        questionTypeBadge: 'Összegből Kiemelés és Egyszerűsítés',
        question: 'Mennyi a (10⁶ + 10⁵) / 11 értéke?',
        options: [
          '100 000 (10⁵)',
          '10 000',
          '1 000 000',
          '110 000'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki 10⁵-t a számlálóból: 10⁵(10 + 1).',
        explanation: '10⁶ + 10⁵ = 10⁵(10 + 1) = 10⁵ · 11. Ezt 11-gyel osztva 10⁵ = 100 000-et kapunk.'
      },
      {
        id: 'ppq2-10',
        questionTypeBadge: 'Exponenciális Egyenlet',
        question: 'Oldd meg a 9^(x-1) = 27 egyenletet a valós számok halmazán!',
        options: [
          'x = 2,5',
          'x = 2',
          'x = 3',
          'x = 1,5'
        ],
        correctAnswer: 0,
        hint: 'Írd át mindkét oldalt 3-as alapú hatványként: 9 = 3² és 27 = 3³.',
        explanation: '(3²)^(x-1) = 3³ ➔ 3^(2x - 2) = 3³ ➔ 2x - 2 = 3 ➔ 2x = 5 ➔ x = 2,5.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi Szintű Kihívások és Mélyebb Algebra (Haladó)',
    subtitle: 'Érettségi típusfeladatok, toronyhatványok, paraméteres egyenletek és becslések.',
    range: '21 - 30. feladat',
    focus: 'Érettségi és Versenyfeladatok',
    questions: [
      {
        id: 'ppq3-1',
        questionTypeBadge: 'Kiemeléses Érettségi Feladat',
        question: 'Számítsd ki a (2²⁰²⁴ + 2²⁰²⁶) / 2²⁰²⁵ kifejezés pontos értékét!',
        figure: <FactoringStrategySvg size={170} />,
        options: [
          '2,5 (azaz 5/2)',
          '2',
          '3',
          '1,5'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki a számlálóból 2²⁰²⁴-et, a nevezőt pedig írd fel 2²⁰²⁴ · 2 alakban.',
        explanation: '[2²⁰²⁴(1 + 2²)] / [2²⁰²⁴ · 2¹] = (1 + 4) / 2 = 5 / 2 = 2,5.'
      },
      {
        id: 'ppq3-2',
        questionTypeBadge: 'Komplex Algebrai Tört',
        question: 'Egyszerűsítsd: ((2x⁻² y³)⁻² · (4x³ y⁻¹)²) / (16x⁸ y⁻⁷)',
        options: [
          '1 / (4x² y)',
          '4 / (x² y)',
          'y / (4x²)',
          '1 / (16x² y)'
        ],
        correctAnswer: 0,
        hint: 'Külön bontsd fel együtthatókra, x hatványaira és y hatványaira.',
        explanation: 'Együtthatók: 2⁻² · 4² / 16 = (1/4 · 16) / 16 = 4 / 16 = 1/4. x kitevője: (-2)·(-2) + 3·2 - 8 = 4 + 6 - 8 = 2. y kitevője: 3·(-2) + (-1)·2 - (-7) = -6 - 2 + 7 = -1. Eredmény: 1/4 · x² · y⁻¹ = x² / (4y) vagy 1/(4x⁻² y).'
      },
      {
        id: 'ppq3-3',
        questionTypeBadge: 'Három Hatvány Sorrendje',
        question: 'Állítsd növekvő sorrendbe: A = 2⁴⁵, B = 3³⁰, C = 5¹⁵!',
        figure: <PowerComparisonSvg size={170} />,
        options: [
          'C < A < B (azaz 5¹⁵ < 2⁴⁵ < 3³⁰)',
          'A < B < C',
          'C < B < A',
          'B < A < C'
        ],
        correctAnswer: 0,
        hint: 'A kitevők közös osztója 15: 45 = 3 · 15, 30 = 2 · 15, 15 = 1 · 15.',
        explanation: 'A = (2³)¹⁵ = 8¹⁵, B = (3²)¹⁵ = 9¹⁵, C = 5¹⁵. Mivel 5 < 8 < 9, így 5¹⁵ < 8¹⁵ < 9¹⁵, azaz C < A < B.'
      },
      {
        id: 'ppq3-4',
        questionTypeBadge: 'Toronyhatvány vs Zárójelezett',
        question: 'Mennyi a különbség: (2³)² - 2³² ?',
        options: [
          '-448 (mert 64 - 512 = -448)',
          '0 (mert mindkettő 2⁶)',
          '+448',
          '-64'
        ],
        correctAnswer: 0,
        hint: '(2³)² = 2³·² = 2⁶ = 64. A toronyhatványnál fentről haladunk: 2³² = 2^(3²) = 2⁹ = 512.',
        explanation: '(2³)² = 2⁶ = 64. A toronyhatvány 2^(3²) = 2⁹ = 512. A különbség: 64 - 512 = -448.'
      },
      {
        id: 'ppq3-5',
        questionTypeBadge: 'Azonos Tagok Összeadása',
        question: 'Melyik kifejezéssel egyenlő a 3ˣ + 3ˣ + 3ˣ összeg?',
        options: [
          '3^(x+1)',
          '9ˣ',
          '3³ˣ',
          '9³ˣ'
        ],
        correctAnswer: 0,
        hint: 'Három egyforma tag összeadása megfelel 3-mal való szorzásnak: 3 · 3ˣ.',
        explanation: '3ˣ + 3ˣ + 3ˣ = 3 · 3ˣ = 3¹ · 3ˣ = 3^(1 + x) = 3^(x+1).'
      },
      {
        id: 'ppq3-6',
        questionTypeBadge: 'Tört Negatív Kitevővel',
        question: 'Mennyi a (0,125)⁻⁴ kifejezés pontos értéke?',
        options: [
          '4096 (azaz 2¹²)',
          '512',
          '1/4096',
          '256'
        ],
        correctAnswer: 0,
        hint: '0,125 = 1/8 = 2⁻³. Tehát (2⁻³)⁻⁴.',
        explanation: '0,125 = 1/8. (1/8)⁻⁴ = 8⁴ = (2³)⁴ = 2¹² = 4096.'
      },
      {
        id: 'ppq3-7',
        questionTypeBadge: 'Exponenciális Helyettesítés',
        question: 'Ha 2ᵃ = 3 és 2ᵇ = 5, mennyi a 2^(a + b + 1) kifejezés értéke?',
        options: [
          '30',
          '16',
          '15',
          '32'
        ],
        correctAnswer: 0,
        hint: 'Bontsd szét a hatványt szorzattá: 2^(a + b + 1) = 2ᵃ · 2ᵇ · 2¹.',
        explanation: '2^(a + b + 1) = 2ᵃ · 2ᵇ · 2¹ = 3 · 5 · 2 = 30.'
      },
      {
        id: 'ppq3-8',
        questionTypeBadge: 'Faktorizálás és Osztás',
        question: 'Egyszerűsítsd: (6¹² - 6¹⁰) / (35 · 6¹⁰)',
        options: [
          '1',
          '6',
          '35',
          '6² = 36'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki 6¹⁰-t a számlálóból: 6¹⁰(6² - 1).',
        explanation: '6¹² - 6¹⁰ = 6¹⁰(36 - 1) = 6¹⁰ · 35. A nevezővel osztva: (6¹⁰ · 35) / (35 · 6¹⁰) = 1.'
      },
      {
        id: 'ppq3-9',
        questionTypeBadge: 'Negatív Hatványok Összege',
        question: 'Mennyi a 4⁻¹ + 2⁻³ összeg pontos értéke tizedestört alakban?',
        options: [
          '0,375 (azaz 3/8)',
          '0,5',
          '0,125',
          '0,25'
        ],
        correctAnswer: 0,
        hint: '4⁻¹ = 1/4 = 2/8. 2⁻³ = 1/8.',
        explanation: '4⁻¹ + 2⁻³ = 1/4 + 1/8 = 2/8 + 1/8 = 3/8 = 0,375.'
      },
      {
        id: 'ppq3-10',
        questionTypeBadge: 'Nagy Hatványok Összehasonlítása',
        question: 'Hogyan viszonyul egymáshoz 25⁴⁰ és 2¹²⁰ ?',
        figure: <PowerComparisonSvg size={170} />,
        options: [
          '25⁴⁰ > 2¹²⁰ (mert 25⁴⁰ > 8⁴⁰ = 2¹²⁰)',
          '25⁴⁰ < 2¹²⁰',
          '25⁴⁰ = 2¹²⁰',
          'Nem összehasonlítható'
        ],
        correctAnswer: 0,
        hint: 'Írd át mindkettőt 40-es kitevőre: 25⁴⁰ és (2³)⁴⁰ = 8⁴⁰.',
        explanation: '2¹²⁰ = (2³)⁴⁰ = 8⁴⁰. Mivel 25 > 8, így 25⁴⁰ > 8⁴⁰ = 2¹²⁰.'
      }
    ]
  }
};

export const PowersPracticeQuiz: React.FC<PowersPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Gyakorló Kvíz – Hatványozás Mesterfokon"
      subtitle="30 válogatott feladat 3 szinten: törtes kifejezések egyszerűsítése, kiemelési technikák és hatványok összehasonlítása."
      topicId="g9-szamok-gyakorlas-hatvany-quiz"
      topicTitle="Hatványozás Gyakorlása"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="rose"
      cheatSheetCards={[
        <CheatSheetCard
          key="cs-prime"
          title="Prímalapra Hozás Szabályai"
          badge="Azonosságok"
          badgeColor="rose"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>4ⁿ</strong> = (2²)ⁿ = <strong>2²ⁿ</strong></p>
            <p>• <strong>8ⁿ</strong> = (2³)ⁿ = <strong>2³ⁿ</strong></p>
            <p>• <strong>6ⁿ</strong> = (2 · 3)ⁿ = <strong>2ⁿ · 3ⁿ</strong></p>
            <p>• <strong>9ⁿ</strong> = (3²)ⁿ = <strong>3²ⁿ</strong></p>
            <p>• <strong>12ⁿ</strong> = (2² · 3)ⁿ = <strong>2²ⁿ · 3ⁿ</strong></p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-factoring"
          title="Kiemelés Hatványösszegből"
          badge="Kulcsmódszer"
          badgeColor="amber"
        >
          <div className="space-y-1 text-xs">
            <p>• Összeadásra <strong>NINCS azonosság</strong>!</p>
            <p>• Mindig a <strong>legkisebb kitevőjű</strong> tagot emeljük ki:</p>
            <p className="font-mono text-amber-700 dark:text-amber-300 font-bold">2ⁿ⁺² + 2ⁿ = 2ⁿ(2² + 1) = 5 · 2ⁿ</p>
            <p>• 3ˣ + 3ˣ + 3ˣ = 3 · 3ˣ = <strong>3ˣ⁺¹</strong></p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-compare"
          title="Hatványok Összehasonlítása"
          badge="Stratégiák"
          badgeColor="blue"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>Közös alap:</strong> 4¹⁵ = 2³⁰ = 8¹⁰</p>
            <p>• <strong>Közös kitevő:</strong> 2³⁰⁰ = 8¹⁰⁰ &lt; 9¹⁰⁰ = 3²⁰⁰</p>
            <p>• <strong>Tört alap (0 &lt; a &lt; 1):</strong> (0,5)² &gt; (0,5)⁴</p>
            <p>• <strong>Toronyhatvány:</strong> (2³)² = 64 &lt; 2³² = 512</p>
          </div>
        </CheatSheetCard>
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az összetett kifejezéseket az egyszerűsített alakjukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PowersPracticeMatcher
              key={`powprac-matcher-${level}`}
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
          subtitle: 'Kategorizáld a feladatokat az alkalmazandó megoldási módszer szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PowersPracticeSorter
              key={`powprac-sorter-${level}`}
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

export default PowersPracticeQuiz;
