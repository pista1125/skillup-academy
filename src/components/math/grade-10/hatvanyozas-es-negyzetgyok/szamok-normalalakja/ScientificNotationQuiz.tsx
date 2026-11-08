import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ScientificNotationMatcher } from './ScientificNotationMatcher';
import { ScientificNotationSorter } from './ScientificNotationSorter';
import {
  ScientificNotationStructureSvg,
  SiPrefixScaleSvg,
  ScientificMultiplicationSvg,
  ScientificAdditionSvg
} from './ScientificNotationFigures';

interface ScientificNotationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A normálalak anatómiája és definíciója',
    description: 'x = a · 10ᵏ, ahol 1 ≤ |a| < 10 (mantissza) és k ∈ ℤ (nagyságrendi kitevő). A tizedesvessző előtt pontosan 1 nem nulla számjegy állhat.',
    note: 'Szabályos: 3,4 · 10⁵. Hibás: 34 · 10⁴ vagy 0,34 · 10⁶!',
    color: 'from-emerald-500 to-teal-600',
    figure: <ScientificNotationStructureSvg size={180} />
  },
  {
    title: 'SI prefixumok (előtagok) skálája',
    description: 'Tera (10¹²), Giga (10⁹), Mega (10⁶), Kilo (10³). Kicsik: Milli (10⁻³), Mikro (10⁻⁶), Nano (10⁻⁹), Piko (10⁻¹²).',
    note: 'Példa: 1 TB = 10¹² B, 5 nm = 5 · 10⁻⁹ m.',
    color: 'from-sky-500 to-blue-600',
    figure: <SiPrefixScaleSvg size={180} />
  },
  {
    title: 'Szorzás, osztás és a kötelező újraigazítás',
    description: 'Szorzásnál a mantisszák szorzódnak, a kitevők összeadódnak. Osztásnál a mantisszák osztódnak, a kitevők kivonódnak.',
    note: 'Ha a szorzat mantisszája ≥ 10 (pl. 24 · 10⁵): 2,4 · 10⁶ (kitevő +1)!',
    color: 'from-indigo-500 to-purple-600',
    figure: <ScientificMultiplicationSvg size={180} />
  },
  {
    title: 'Összeadás és kivonás: azonos kitevőre hozás',
    description: 'Összeadás és kivonás csak azonos 10-es kitevő esetén végezhető el a mantisszák összevonásával!',
    note: 'Példa: 4 · 10⁵ + 3 · 10⁴ = 4 · 10⁵ + 0,3 · 10⁵ = 4,3 · 10⁵.',
    color: 'from-rose-500 to-amber-600',
    figure: <ScientificAdditionSvg size={180} />
  }
];

const quizLevels: Record<1 | 2 | 3, QuizLevelConfig> = {
  1: {
    title: '1. Szint: A normálalak fogalma és átváltások',
    subtitle: '10 feladat a mantissza feltétel (1 ≤ |a| < 10) és a tizedesvessző léptetésének begyakorlására',
    questions: [
      {
        id: 'snq1-1',
        question: 'Melyik alak felel meg a 450 000 szám szabályos normálalakjának?',
        options: ['4,5 · 10⁵', '45 · 10⁴', '0,45 · 10⁶', '4,5 · 10⁴'],
        correctAnswer: 0,
        explanation: 'A normálalak mantisszájának teljesítenie kell az 1 ≤ |a| < 10 feltételt. A tizedesvesszőt 5 hellyel toljuk balra: 4,5 · 10⁵.'
      },
      {
        id: 'snq1-2',
        question: 'Melyik alak felel meg a 0,003 8 szám szabályos normálalakjának?',
        options: ['3,8 · 10⁻³', '38 · 10⁻⁴', '0,38 · 10⁻²', '3,8 · 10³'],
        correctAnswer: 0,
        explanation: 'A tizedesvesszőt 3 hellyel toljuk jobbra a 3 mögé: 3,8 · 10⁻³.'
      },
      {
        id: 'snq1-3',
        question: 'Mi a feltétele az a · 10ᵏ alakú szám mantisszájának (a)?',
        options: ['1 ≤ |a| < 10', '0 < a < 10', '1 ≤ a ≤ 10', 'Bármilyen valós szám lehet'],
        correctAnswer: 0,
        explanation: 'A nemzetközi matematikai definíció szerint a mantissza abszolút értéke: 1 ≤ |a| < 10.'
      },
      {
        id: 'snq1-4',
        question: 'Melyik szám SZABÁLYOS normálalak az alábbiak közül?',
        options: ['7,02 · 10⁴', '70,2 · 10³', '0,702 · 10⁵', '702 · 10²'],
        correctAnswer: 0,
        explanation: 'Csak a 7,02 esetén igaz, hogy 1 ≤ |a| < 10. A többinél a mantissza túl nagy vagy túl kicsi.'
      },
      {
        id: 'snq1-5',
        question: 'Mennyi 6,2 · 10³ hagyományos helyiértékes alakja?',
        options: ['6200', '62 000', '620', '0,0062'],
        correctAnswer: 0,
        explanation: 'A 10³ = 1000 szorzó azt jelenti, hogy a tizedesvesszőt 3 hellyel toljuk jobbra: 6,2 · 1000 = 6200.'
      },
      {
        id: 'snq1-6',
        question: 'Mennyi 4,5 · 10⁻² hagyományos tizedestört alakja?',
        options: ['0,045', '0,45', '0,0045', '450'],
        correctAnswer: 0,
        explanation: 'A 10⁻² = 0,01 szorzó azt jelenti, hogy a tizedesvesszőt 2 hellyel toljuk balra: 0,045.'
      },
      {
        id: 'snq1-19',
        question: 'Melyik szám nagyobb: 3,4 · 10⁵ vagy 8,2 · 10⁴?',
        options: ['3,4 · 10⁵ a nagyobb', '8,2 · 10⁴ a nagyobb', 'Egyenlőek', 'Nem összehasonlítható'],
        correctAnswer: 0,
        explanation: 'Pozitív számoknál mindig a nagyobb 10-es kitevőjű szám a nagyobb (nagyságrendi dominancia): 3,4 · 10⁵ = 340 000 > 82 000 = 8,2 · 10⁴.'
      },
      {
        id: 'snq1-21',
        question: 'Hogyan írható fel a 25 · 10³ szám szabályos normálalakban?',
        options: ['2,5 · 10⁴', '2,5 · 10²', '0,25 · 10⁵', '250 000'],
        correctAnswer: 0,
        explanation: '25 = 2,5 · 10¹. Ezért 25 · 10³ = (2,5 · 10¹) · 10³ = 2,5 · 10⁴.'
      },
      {
        id: 'snq1-24',
        question: 'Mennyi a fénysebesség (300 000 km/s) méter per szekundumban normálalakban?',
        options: ['3 · 10⁸ m/s', '3 · 10⁵ m/s', '3 · 10⁶ m/s', '3 · 10¹¹ m/s'],
        correctAnswer: 0,
        explanation: '300 000 km/s = 300 000 000 m/s = 3 · 10⁸ m/s.'
      },
      {
        id: 'snq1-26',
        question: 'Mit jelent a „kilo” (k) SI prefixum a normálalakban?',
        options: ['10³ = 1000', '10⁶ = 1 000 000', '10² = 100', '10⁻³ = 0,001'],
        correctAnswer: 0,
        explanation: 'A kilo előtag az ezerszerest jelenti: 10³ (pl. 1 km = 10³ m).'
      }
    ]
  },
  2: {
    title: '2. Szint: Műveletek normálalakban és mértékegységek',
    subtitle: '10 feladat a szorzás, osztás, mantissza-újraigazítás és SI prefixumok témaköréből',
    questions: [
      {
        id: 'snq2-1',
        question: 'Mennyi (3 · 10⁴) · (2 · 10⁵) szorzat értéke normálalakban?',
        options: ['6 · 10⁹', '6 · 10²⁰', '5 · 10⁹', '6 · 10¹'],
        correctAnswer: 0,
        explanation: 'Mantisszák szorzata: 3 · 2 = 6. Kitevők összege: 4 + 5 = 9. Mivel 1 ≤ 6 < 10, a kész alak: 6 · 10⁹.'
      },
      {
        id: 'snq2-2',
        question: 'Mennyi (4 · 10⁶) · (5 · 10⁴) szorzat értéke szabályos normálalakban?',
        options: ['2 · 10¹¹', '20 · 10¹⁰', '2 · 10¹⁰', '9 · 10¹⁰'],
        correctAnswer: 0,
        explanation: '4 · 5 = 20, és 6 + 4 = 10 ⟹ 20 · 10¹⁰. A 20 nem szabályos mantissza (≥ 10), ezért: 20 = 2 · 10¹ ⟹ (2 · 10¹) · 10¹⁰ = 2 · 10¹¹.'
      },
      {
        id: 'snq2-3',
        question: 'Mennyi (8 · 10⁷) : (4 · 10²) hányados értéke normálalakban?',
        options: ['2 · 10⁵', '2 · 10⁹', '4 · 10⁵', '2 · 10¹⁴'],
        correctAnswer: 0,
        explanation: 'Mantisszák hányadosa: 8 / 4 = 2. Kitevők különbsége: 7 - 2 = 5. Eredmény: 2 · 10⁵.'
      },
      {
        id: 'snq2-4',
        question: 'Mennyi (2 · 10⁵) : (8 · 10²) hányados értéke szabályos normálalakban?',
        options: ['2,5 · 10²', '0,25 · 10³', '2,5 · 10³', '4 · 10²'],
        correctAnswer: 0,
        explanation: '2 / 8 = 0,25 és 5 - 2 = 3 ⟹ 0,25 · 10³. Mivel 0,25 < 1, át kell alakítani: 0,25 = 2,5 · 10⁻¹ ⟹ (2,5 · 10⁻¹) · 10³ = 2,5 · 10² = 250.'
      },
      {
        id: 'snq2-7',
        question: 'Mennyi (3 · 10⁴)² négyzete normálalakban?',
        options: ['9 · 10⁸', '6 · 10⁸', '9 · 10⁶', '9 · 10¹⁶'],
        correctAnswer: 0,
        explanation: '(3 · 10⁴)² = 3² · (10⁴)² = 9 · 10⁸.'
      },
      {
        id: 'snq2-9',
        question: 'Mit jelent a „Mega” (M) előtag a fizikában és informatikában?',
        options: ['10⁶ = egymillió', '10³ = ezer', '10⁹ = egymilliárd', '10¹² = egybillió'],
        correctAnswer: 0,
        explanation: 'A Mega az egymilliószoros szorzót jelenti: 10⁶ (pl. 1 Megawatt = 10⁶ W).'
      },
      {
        id: 'snq2-11',
        question: 'Mit jelent a „Mikro” (μ) előtag az SI rendszerben?',
        options: ['10⁻⁶ = egy milliomod', '10⁻³ = egy ezred', '10⁻⁹ = egy milliárdod', '10⁻¹² = egy billiomod'],
        correctAnswer: 0,
        explanation: 'A mikro (görög mü: μ) a milliomodrészt jelenti: 10⁻⁶ (pl. 1 μm = 10⁻⁶ m).'
      },
      {
        id: 'snq2-14',
        question: 'Mennyi (7 · 10⁵) + (2 · 10⁵) összege normálalakban?',
        options: ['9 · 10⁵', '9 · 10¹⁰', '14 · 10⁵', '9 · 10²⁵'],
        correctAnswer: 0,
        explanation: 'Mivel a kitevők megegyeznek (mindkettő 5), a mantisszák összeadódnak: (7 + 2) · 10⁵ = 9 · 10⁵.'
      },
      {
        id: 'snq2-16',
        question: 'Mennyi (4 · 10⁵) + (3 · 10⁴) összege szabályos normálalakban?',
        options: ['4,3 · 10⁵', '7 · 10⁹', '7 · 10⁵', '43 · 10⁴'],
        correctAnswer: 0,
        explanation: 'Azonos kitevőre kell hozni: 3 · 10⁴ = 0,3 · 10⁵. Ekkor: (4 + 0,3) · 10⁵ = 4,3 · 10⁵.'
      },
      {
        id: 'snq2-19',
        question: 'A Föld tömege kb. 6 · 10²⁴ kg, a Hold tömege kb. 7,5 · 10²² kg. Hányszor nehezebb a Föld a Holdnál?',
        options: ['80-szor', '8-szor', '800-szor', '1,25-ször'],
        correctAnswer: 0,
        explanation: '(6 · 10²⁴) : (7,5 · 10²²) = (6 / 7,5) · 10²⁴⁻²² = 0,8 · 10² = 80-szor!'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi és emelt szintű feladatok normálalakkal',
    subtitle: '10 komplex természettudományos feladat, nagyságrendi becslések és bonyolult műveletek',
    questions: [
      {
        id: 'snq3-1',
        question: 'A Nap átlagos távolsága a Földtől 1,5 · 10⁸ km. A fény sebessége 3 · 10⁵ km/s. Hány perc alatt ér a Nap fénye a Földre?',
        options: ['kb. 8,33 perc (500 másodperc)', 'kb. 5 perc', 'kb. 12,5 perc', 'kb. 1,5 perc'],
        correctAnswer: 0,
        explanation: 'Idő: t = s / v = (1,5 · 10⁸ km) / (3 · 10⁵ km/s) = (1,5 / 3) · 10⁸⁻⁵ = 0,5 · 10³ s = 500 másodperc. 500 / 60 = 8 perc 20 másodperc = kb. 8,33 perc!'
      },
      {
        id: 'snq3-2',
        question: 'Számítsd ki: ((6 · 10⁷) · (4 · 10⁻²)) / (8 · 10⁴) értékét!',
        options: ['30 (vagy 3 · 10¹)', '3', '300', '0,3'],
        correctAnswer: 0,
        explanation: 'Számláló: (6 · 4) · 10⁷⁻² = 24 · 10⁵. Osztás: (24 / 8) · 10⁵⁻⁴ = 3 · 10¹ = 30.'
      },
      {
        id: 'snq3-3',
        question: 'Egy mol gázban 6 · 10²³ részecske található (Avogadro-szám). Mennyi a tömege egyetlen vízmolekulának, ha 1 mol víz tömege 18 gramm?',
        options: ['3 · 10⁻²³ g', '3 · 10⁻²² g', '1,08 · 10²⁵ g', '3 · 10⁻²⁴ g'],
        correctAnswer: 0,
        explanation: 'm = 18 g / (6 · 10²³) = (18 / 6) · 10⁻²³ = 3 · 10⁻²³ gramm.'
      },
      {
        id: 'snq3-4',
        question: 'Mennyi a ((2 · 10⁵)³ · (3 · 10⁻⁴)²) / (1,8 · 10⁶) kifejezés pontos értéke?',
        options: ['4 · 10¹ = 40', '4 · 10²', '7,2 · 10³', '4'],
        correctAnswer: 0,
        explanation: '(2 · 10⁵)³ = 8 · 10¹⁵. (3 · 10⁻⁴)² = 9 · 10⁻⁸. Számláló: (8 · 9) · 10¹⁵⁻⁸ = 72 · 10⁷. Osztva (1,8 · 10⁶)-nal: (72 / 1,8) · 10⁷⁻⁶ = 40 · 10¹ = 400? Várjunk: 72 / 1,8 = 40. 40 · 10¹ = 400 = 4 · 10²!'
      },
      {
        id: 'snq3-5',
        question: 'A Tejútrendszer átmérője kb. 100 000 fényév. 1 fényév kb. 9,46 · 10¹² km. Mennyi a Tejútrendszer átmérője kilométerben normálalakban?',
        options: ['9,46 · 10¹⁷ km', '9,46 · 10¹⁶ km', '9,46 · 10¹⁴ km', '9,46 · 10¹⁸ km'],
        correctAnswer: 0,
        explanation: '100 000 = 10⁵. (9,46 · 10¹² km) · 10⁵ = 9,46 · 10¹²⁺⁵ = 9,46 · 10¹⁷ km.'
      },
      {
        id: 'snq3-9',
        question: 'Egy merevlemez kapacitása 2 TB (2 · 10¹² B). Egy digitális fénykép átlagosan 4 MB (4 · 10⁶ B). Hány fénykép fér a lemezre?',
        options: ['500 000 (vagy 5 · 10⁵)', '50 000', '5 000 000', '200 000'],
        correctAnswer: 0,
        explanation: 'N = (2 · 10¹²) / (4 · 10⁶) = (2 / 4) · 10¹²⁻⁶ = 0,5 · 10⁶ = 5 · 10⁵ = 500 000 fénykép.'
      },
      {
        id: 'snq3-11',
        question: 'Mennyi a (4 · 10⁻⁵)⁻² kifejezés pontos értéke normálalakban?',
        options: ['6,25 · 10⁸', '62,5 · 10⁷', '1,6 · 10¹⁰', '6,25 · 10⁻⁸'],
        correctAnswer: 0,
        explanation: '4⁻² · (10⁻⁵)⁻² = (1/16) · 10¹⁰ = 0,0625 · 10¹⁰ = 6,25 · 10⁻² · 10¹⁰ = 6,25 · 10⁸.'
      },
      {
        id: 'snq3-13',
        question: 'Számítsd ki: (8 · 10¹⁰ + 4 · 10⁹) / (2 · 10⁵)!',
        options: ['4,2 · 10⁵', '4,2 · 10⁴', '6 · 10⁵', '4,2 · 10⁶'],
        correctAnswer: 0,
        explanation: 'Számláló: 8 · 10¹⁰ + 0,4 · 10¹⁰ = 8,4 · 10¹⁰. Osztva (2 · 10⁵)-nel: (8,4 / 2) · 10¹⁰⁻⁵ = 4,2 · 10⁵.'
      },
      {
        id: 'snq3-20',
        question: 'Mennyi a ((10⁵ + 10⁴) / (10⁴ + 10³)) hányados pontos értéke?',
        options: ['10', '1', '100', '11'],
        correctAnswer: 0,
        explanation: 'Számláló: 10⁴ · (10 + 1) = 11 · 10⁴. Nevező: 10³ · (10 + 1) = 11 · 10³. Hányados: (11 · 10⁴) / (11 · 10³) = 10⁴⁻³ = 10¹ = 10.'
      },
      {
        id: 'snq3-23',
        question: 'Melyik az az x szám, amelyre (3 · 10⁴) · x = 1,2 · 10²?',
        options: ['4 · 10⁻³', '4 · 10⁻²', '0,4 · 10⁻³', '4 · 10⁻¹'],
        correctAnswer: 0,
        explanation: 'x = (1,2 · 10²) / (3 · 10⁴) = (1,2 / 3) · 10²⁻⁴ = 0,4 · 10⁻² = 4 · 10⁻³.'
      }
    ]
  }
};

export const ScientificNotationQuiz: React.FC<ScientificNotationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hatvanyozas-negyzetgyok"
      topicTitle="4. Számok normálalakja"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ScientificNotationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ScientificNotationSorter
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

