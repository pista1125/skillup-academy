import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ReducibleMatcher } from './ReducibleMatcher';
import { ReducibleSorter } from './ReducibleSorter';
import {
  BiquadraticSubstitutionSvg,
  FractionalCheckTreeSvg,
  SquareRootEquationCheckSvg,
  PolynomialFactoringSvg
} from './ReducibleFigures';

interface ReducibleQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Bikvadratikus egyenletek (u = x²)',
    description: 'ax⁴ + bx² + c = 0 ⟹ au² + bu + c = 0. Kikötés: u ≥ 0. Visszatérés: x = ±√u. Csak nemnegatív u-ból vonható valós gyök!',
    note: 'Egy bikvadratikus egyenletnek 0, 1, 2, 3 vagy 4 darab valós gyöke lehet a kapott u értékek előjelétől függően.',
    color: 'from-cyan-500 to-blue-600',
    figure: <BiquadraticSubstitutionSvg size={220} />
  },
  {
    title: 'Törtes egyenletek és kikötések',
    description: '1. Kikötés: Nevező ≠ 0 ⟶ 2. Beszorzás közös nevezővel ⟶ 3. Másodfokú megoldás ⟶ 4. Hamis gyökök kizárása.',
    note: 'Soha ne hagyd el a kikötést! A kapott gyökök közül a nevezőt nullává tevő értékeket azonnal el kell vetni.',
    color: 'from-blue-500 to-indigo-600',
    figure: <FractionalCheckTreeSvg size={220} />
  },
  {
    title: 'Négyzetgyökös egyenletek',
    description: '√(A) = B. Izolálás, majd négyzetre emelés: A = B². Feltétel: A ≥ 0 és B ≥ 0. A négyzetre emelés nem ekvivalens lépés!',
    note: 'Mivel a négyzetre emelés hamis gyököket hozhat létre, a gyökök behelyettesítéses ellenőrzése mindig kötelező.',
    color: 'from-amber-500 to-orange-600',
    figure: <SquareRootEquationCheckSvg size={220} />
  },
  {
    title: 'Kiemelés és csoportosítás',
    description: 'x³ - 9x = 0 ⟹ x(x² - 9) = 0 ⟹ x₁ = 0, x₂,₃ = ±3. Egy szorzat akkor 0, ha valamelyik tényezője 0.',
    note: 'Soha ne osszunk le az ismeretlennel (x-szel), mert ezzel elveszítjük a nullagyököt!',
    color: 'from-purple-500 to-violet-600',
    figure: <PolynomialFactoringSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Bikvadratikus alapok és egyszerű helyettesítések',
    subtitle: 'Az u = x² helyettesítés alkalmazása és a gyökvonás szabályai.',
    range: '1–10. feladat',
    focus: 'Bikvadratikus egyenletek megoldása és szűrése',
    questions: [
      {
        id: 'rq1-1',
        question: 'Milyen helyettesítést alkalmazunk leggyakrabban az ax⁴ + bx² + c = 0 bikvadratikus egyenlet megoldásához?',
        options: [
          'u = x²  (ahol u ≥ 0)',
          'u = x⁴',
          'u = x + 1',
          'u = 1 / x'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x⁴ = (x²)², az u = x² helyettesítéssel az egyenlet au² + bu + c = 0 másodfokú egyenletté válik.'
      },
      {
        id: 'rq1-2',
        question: 'Hány valós gyöke van az x⁴ - 5x² + 4 = 0 egyenletnek?',
        options: [
          '4 valós gyöke van (-2; -1; 1; 2)',
          '2 valós gyöke van (1; 4)',
          '0 valós gyöke van',
          '1 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'u = x² ⟹ u² - 5u + 4 = 0 ⟹ u₁ = 1, u₂ = 4. Mivel mindkét u pozitív: x² = 1 ⟹ x = ±1 és x² = 4 ⟹ x = ±2. Összesen 4 valós gyök van.'
      },
      {
        id: 'rq1-3',
        question: 'Hány valós gyöke van az x⁴ - 3x² - 4 = 0 egyenletnek?',
        options: [
          '2 valós gyöke van (-2 és 2)',
          '4 valós gyöke van',
          '0 valós gyöke van',
          '3 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'u² - 3u - 4 = 0 ⟹ u₁ = 4, u₂ = -1. Az u₁ = 4-ből x = ±2 (2 valós gyök). Az u₂ = -1-ből x² = -1, aminek nincs valós megoldása. Így összesen 2 valós gyök van.'
      },
      {
        id: 'rq1-4',
        question: 'Hány valós gyöke van az x⁴ + 5x² + 6 = 0 egyenletnek?',
        options: [
          '0 valós gyöke van (nincs megoldás)',
          '2 valós gyöke van',
          '4 valós gyöke van',
          '1 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'u² + 5u + 6 = 0 ⟹ u₁ = -2, u₂ = -3. Mivel mindkét u negatív, és valós szám négyzete nem lehet negatív, az egyenletnek nincs valós gyöke.'
      },
      {
        id: 'rq1-5',
        question: 'Mik a megoldásai az x³ - 16x = 0 egyenletnek?',
        options: [
          'x₁ = 0, x₂ = 4, x₃ = -4',
          'x₁ = 4, x₂ = -4',
          'x = 16',
          'x = 0'
        ],
        correctAnswer: 0,
        explanation: 'Kiemeléssel: x(x² - 16) = 0. Egy szorzat akkor 0, ha x = 0, vagy x² - 16 = 0 ⟹ x = ±4. A megoldáshalmaz: {-4; 0; 4}.'
      },
      {
        id: 'rq1-6',
        question: 'Miért hibás lépés az x³ - 9x = 0 egyenlet mindkét oldalát leosztani x-szel?',
        options: [
          'Mert ezzel elveszítjük az x = 0 valós gyököt',
          'Mert x nem lehet negatív szám',
          'Mert a 9 nem osztható x-szel',
          'Mert a jobb oldal nem változik'
        ],
        correctAnswer: 0,
        explanation: 'Ismeretlennel való osztásnál gyökvesztés lép fel, ha az ismeretlen felvehetné a nulla értéket. Itt az x = 0 megoldás elveszne!'
      },
      {
        id: 'rq1-7',
        question: 'Mi a helyes kikötés az 5 / (x - 3) = 2 törtes egyenletnél?',
        options: [
          'x ≠ 3',
          'x ≠ 0',
          'x > 3',
          'x ≠ -3'
        ],
        correctAnswer: 0,
        explanation: 'A tört nevezője nem lehet nulla: x - 3 ≠ 0 ⟹ x ≠ 3.'
      },
      {
        id: 'rq1-8',
        question: 'Mik a valós gyökei az x⁴ - 16 = 0 egyenletnek?',
        options: [
          'x = ±2',
          'x = ±4',
          'x = ±2 és x = ±4',
          'x = 16'
        ],
        correctAnswer: 0,
        explanation: 'x⁴ = 16 ⟹ x² = 16 ⟹ x = ±√16 = ±4 helyett: x⁴ = 16 ⟹ x² = 4 ⟹ x = ±2 (és x² = -4-ből nincs valós gyök). Így a valós gyökök: x = ±2.'
      },
      {
        id: 'rq1-9',
        question: 'Hány valós gyöke van a √(x + 4) = -3 egyenletnek?',
        options: [
          '0 (nincs valós megoldása)',
          '1 valós gyöke van (x = 5)',
          '1 valós gyöke van (x = -1)',
          '2 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetgyök definíciója szerint nemnegatív számot ad (√(A) ≥ 0). Ezért nem lehet egyenlő negatív számmal (-3-mal), nincs valós megoldás.'
      },
      {
        id: 'rq1-10',
        question: 'Hány valós megoldása lehet legfeljebb egy bikvadratikus (ax⁴ + bx² + c = 0) egyenletnek?',
        options: [
          'Legfeljebb 4 valós megoldása',
          'Legfeljebb 2 valós megoldása',
          'Pontosan 4 valós megoldása mindig',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'Mivel negyedfokú algebrai egyenlet, a valós számok halmazán legfeljebb 4 különböző gyöke lehet.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtes és négyzetgyökös egyenletek szűrése',
    subtitle: 'Hamis gyökök kizárása, közös nevező és kötelező ellenőrzés.',
    range: '11–20. feladat',
    focus: 'Hamis gyökök felismerése és algebrai átalakítások',
    questions: [
      {
        id: 'rq2-1',
        question: 'Mi a megoldása a √(x + 5) = x - 1 egyenletnek?',
        options: [
          'x = 4 (az x = -1 hamis gyök)',
          'x = 4 és x = -1 mindkettő jó',
          'x = -1',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: x + 5 = (x - 1)² = x² - 2x + 1 ⟹ x² - 3x - 4 = 0 ⟹ x₁ = 4, x₂ = -1. Ellenőrzés: x = 4 ⟹ √9 = 3 (jó). x = -1 ⟹ √4 = -2 (hamis, mert 2 ≠ -2). Tehát csak x = 4 a megoldás.'
      },
      {
        id: 'rq2-2',
        question: 'Mi a megoldása az x / (x - 2) = 2 / (x - 2) törtes egyenletnek?',
        options: [
          'Nincs megoldása (M = ∅, mert x = 2 tilos)',
          'x = 2',
          'Minden valós szám megoldás',
          'x = 0'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x - 2 ≠ 0 ⟹ x ≠ 2. Beszorozva (x - 2)-vel: x = 2. Mivel a kapott gyök megegyezik a tiltott értékkel, kizárjuk, így nincs megoldás.'
      },
      {
        id: 'rq2-3',
        question: 'Oldjuk meg: 6 / x + x = 5!',
        options: [
          'x₁ = 2,  x₂ = 3',
          'x₁ = 1,  x₂ = 6',
          'x₁ = -2, x₂ = -3',
          'x = 5'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x ≠ 0. Beszorozva x-szel: 6 + x² = 5x ⟹ x² - 5x + 6 = 0. Gyökök: x₁ = 2, x₂ = 3. Mindkettő megfelel a kikötésnek.'
      },
      {
        id: 'rq2-4',
        question: 'Mik a megoldásai a 4x⁴ - 5x² + 1 = 0 bikvadratikus egyenletnek?',
        options: [
          'x = ±1 és x = ±0,5',
          'x = ±1 és x = ±2',
          'x = 1 és x = 0,25',
          'x = ±1'
        ],
        correctAnswer: 0,
        explanation: 'u = x² ⟹ 4u² - 5u + 1 = 0. D = 25 - 16 = 9. u₁,₂ = (5 ± 3) / 8 ⟹ u₁ = 1, u₂ = 0,25. Ekkor x² = 1 ⟹ x = ±1, és x² = 0,25 ⟹ x = ±0,5.'
      },
      {
        id: 'rq2-5',
        question: 'Miért szükséges ellenőrizni a gyökös egyenletek megoldásait az eredeti egyenletbe való behelyettesítéssel?',
        options: [
          'Mert a négyzetre emelés nem ekvivalens átalakítás, és hamis gyökök keletkezhetnek',
          'Mert a megoldóképlet pontatlan lehet',
          'Csak akkor kell ellenőrizni, ha a diszkrimináns negatív',
          'Csak formai követelmény, nem változtatja az eredményt'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetre emelés kibővíti az egyenlet alaphalmazát (hiszen (-a)² = a²), így olyan számok is kielégíthetik a négyzetre emelt egyenletet, amelyek az eredetit nem.'
      },
      {
        id: 'rq2-6',
        question: 'Oldjuk meg: √(2x + 9) = x + 3!',
        options: [
          'x = 0 (az x = -4 hamis gyök)',
          'x = 0 és x = -4',
          'x = -3',
          'x = 3'
        ],
        correctAnswer: 0,
        explanation: '2x + 9 = (x + 3)² = x² + 6x + 9 ⟹ x² + 4x = 0 ⟹ x(x + 4) = 0. x₁ = 0, x₂ = -4. Ellenőrzés: x = 0 ⟹ √9 = 3 (jó). x = -4 ⟹ √1 = -1 (hamis!). Csak x = 0 a megoldás.'
      },
      {
        id: 'rq2-7',
        question: 'Mik a valós gyökei az x³ - 3x² - 4x + 12 = 0 egyenletnek?',
        options: [
          'x₁ = 3, x₂ = 2, x₃ = -2',
          'x₁ = 3, x₂ = 4, x₃ = -1',
          'x₁ = 0, x₂ = 3, x₃ = -4',
          'x₁ = 12, x₂ = 1'
        ],
        correctAnswer: 0,
        explanation: 'Páronkénti csoportosítás: x²(x - 3) - 4(x - 3) = (x - 3)(x² - 4) = 0. Ebből x - 3 = 0 ⟹ x = 3, és x² - 4 = 0 ⟹ x = ±2.'
      },
      {
        id: 'rq2-8',
        question: 'Oldjuk meg a (2x - 1) / (x + 1) = (x + 5) / (x + 1) törtes egyenletet!',
        options: [
          'x = 6',
          'x = -1',
          'Nincs megoldása',
          'x = 1'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x + 1 ≠ 0 ⟹ x ≠ -1. Beszorozva (x + 1)-gyel: 2x - 1 = x + 5 ⟹ x = 6. Mivel 6 ≠ -1, a megoldás x = 6.'
      },
      {
        id: 'rq2-9',
        question: 'Oldjuk meg: (x² - 9) / (x - 3) = 0!',
        options: [
          'x = -3 (az x = 3 kizárva)',
          'x = 3 és x = -3',
          'x = 3',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x ≠ 3. A számláló: x² - 9 = 0 ⟹ x = ±3. Az x = 3 ütközik a kikötéssel, így egyedül az x = -3 a megoldás.'
      },
      {
        id: 'rq2-10',
        question: 'Hány valós gyöke van az x⁴ - 8x² + 16 = 0 egyenletnek?',
        options: [
          '2 valós gyöke van (x = 2 és x = -2)',
          '4 valós gyöke van',
          '1 valós gyöke van',
          '0 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: '(x² - 4)² = 0 ⟹ x² - 4 = 0 ⟹ x² = 4 ⟹ x = ±2. Mindkét gyök kétszeres multiplicitású, tehát 2 különböző valós gyök van.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kifejezés-helyettesítés és emelt szintű egyenletek',
    subtitle: 'Blokkhelyettesítés, törtes egyenletrendszerek és összetett vizsgálatok.',
    range: '21–30. feladat',
    focus: 'Összetett blokk-helyettesítés és emelt szintű egyenletek',
    questions: [
      {
        id: 'rq3-1',
        question: 'Milyen új ismeretlent célszerű bevezetni az (x² - 3x)² - 2(x² - 3x) - 8 = 0 egyenletben?',
        options: [
          'u = x² - 3x',
          'u = x²',
          'u = x - 3',
          'u = (x² - 3x)²'
        ],
        correctAnswer: 0,
        explanation: 'Az ismétlődő zárójeles kifejezés x² - 3x. Ezt elnevezve u-nak: u² - 2u - 8 = 0.'
      },
      {
        id: 'rq3-2',
        question: 'Mik a valós megoldásai az (x² - 3x)² - 2(x² - 3x) - 8 = 0 egyenletnek?',
        options: [
          'x = 4, x = -1, x = 1, x = 2',
          'x = 4 és x = -2',
          'x = 3 és x = -1',
          'Nincs valós megoldása'
        ],
        correctAnswer: 0,
        explanation: 'u² - 2u - 8 = 0 ⟹ u₁ = 4, u₂ = -2. 1) x² - 3x = 4 ⟹ x² - 3x - 4 = 0 ⟹ x = 4, x = -1. 2) x² - 3x = -2 ⟹ x² - 3x + 2 = 0 ⟹ x = 1, x = 2. Összesen 4 valós gyök: {-1; 1; 2; 4}.'
      },
      {
        id: 'rq3-3',
        question: 'Oldjuk meg: (x + 1/x)² - 4(x + 1/x) + 3 = 0!',
        options: [
          'x = 1 és x = (3 ± √5) / 2',
          'x = 1 és x = 3',
          'x = ±1',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Legyen u = x + 1/x. Ekkor u² - 4u + 3 = 0 ⟹ u₁ = 1, u₂ = 3. 1) x + 1/x = 1 ⟹ x² - x + 1 = 0 (D = -3 < 0, nincs valós gyök). 2) x + 1/x = 3 ⟹ x² - 3x + 1 = 0 ⟹ x = (3 ± √5)/2. Valamint u = 1 nem adott valós gyököt, így a két megoldás: x = (3 ± √5)/2.'
      },
      {
        id: 'rq3-4',
        question: 'A p valós paraméter mely értékei esetén van az x⁴ - 6x² + p = 0 bikvadratikus egyenletnek pontosan 4 különböző valós gyöke?',
        options: [
          '0 < p < 9',
          'p < 9',
          'p > 0',
          'p = 9'
        ],
        correctAnswer: 0,
        explanation: 'u = x² esetén u² - 6u + p = 0. Hogy 4 különböző valós x gyök legyen, a másodfokú egyenletnek két KÜLÖNBÖZŐ ÉS POZITÍV u gyökének kell lennie: 1) D > 0 ⟹ 36 - 4p > 0 ⟹ p < 9. 2) Viète: u₁ · u₂ = p > 0 és u₁ + u₂ = 6 > 0. A kettő metszete: 0 < p < 9.'
      },
      {
        id: 'rq3-5',
        question: 'A p mely értékére van az x⁴ - 6x² + p = 0 egyenletnek pontosan 2 különböző valós gyöke?',
        options: [
          'p < 0 vagy p = 9',
          'p = 9',
          'p > 9',
          'p = 0'
        ],
        correctAnswer: 0,
        explanation: '2 valós gyök akkor van, ha vagy D = 0 és az egyetlen u pozitív (p = 9 ⟹ u = 3 ⟹ x = ±√3), vagy az egyik u pozitív, a másik negatív (u₁ · u₂ = p < 0 ⟹ p < 0).'
      },
      {
        id: 'rq3-6',
        question: 'Oldjuk meg a √(2x + 3) - √(x + 1) = 1 egyenletet!',
        options: [
          'x = 3 (az x = -1 is ellenőrzendő: mindkettő jó)',
          'Csak x = 3',
          'Csak x = -1',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Átrendezve: √(2x + 3) = 1 + √(x + 1). Négyzetre emelve: 2x + 3 = 1 + 2√(x + 1) + x + 1 ⟹ x + 1 = 2√(x + 1). Újra négyzetre emelve: (x + 1)² = 4(x + 1) ⟹ (x + 1)(x + 1 - 4) = 0 ⟹ x₁ = -1, x₂ = 3. Behelyettesítéssel mindkettő kielégíti az eredeti egyenletet!'
      },
      {
        id: 'rq3-7',
        question: 'Oldjuk meg a valós számok halmazán: |x² - 4| = 3!',
        options: [
          'x = ±1 és x = ±√7',
          'x = ±1',
          'x = ±√7',
          'x = 1 és x = 7'
        ],
        correctAnswer: 0,
        explanation: '1) x² - 4 = 3 ⟹ x² = 7 ⟹ x = ±√7. 2) x² - 4 = -3 ⟹ x² = 1 ⟹ x = ±1. Mind a 4 gyök valós és helyes.'
      },
      {
        id: 'rq3-8',
        question: 'Oldjuk meg: 2x + 3 / x = 7!',
        options: [
          'x₁ = 3,  x₂ = 0,5',
          'x₁ = 1,  x₂ = 6',
          'x₁ = 2,  x₂ = 1,5',
          'x = 3'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x ≠ 0. Beszorozva x-szel: 2x² + 3 = 7x ⟹ 2x² - 7x + 3 = 0. D = 49 - 24 = 25. x = (7 ± 5) / 4 ⟹ x₁ = 3, x₂ = 0,5.'
      },
      {
        id: 'rq3-9',
        question: 'Oldjuk meg az x⁴ - 2x² - 8 = 0 egyenletet!',
        options: [
          'x = ±2 (az u = -2 nem ad valós gyököt)',
          'x = ±2 és x = ±√2',
          'x = 4 és x = -2',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: 'u = x² ⟹ u² - 2u - 8 = 0 ⟹ u₁ = 4, u₂ = -2. Az u₁ = 4-ből x = ±2. Az u₂ = -2-ből nem adódik valós gyök, mert x² ≥ 0.'
      },
      {
        id: 'rq3-10',
        question: 'Melyik állítás IGAZ az x⁴ + 10x² + 9 = 0 egyenletre?',
        options: [
          'Nincs valós megoldása, mert x⁴ ≥ 0 és 10x² ≥ 0, így az összeg legalább 9',
          '4 valós gyöke van (±1 és ±3)',
          '2 valós gyöke van',
          'x = 0 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'Minden valós x-re x⁴ ≥ 0 és 10x² ≥ 0, ezért x⁴ + 10x² + 9 ≥ 9 > 0 mindig, soha nem lehet 0. Nincs valós megoldás.'
      }
    ]
  }
};

export const ReducibleQuiz: React.FC<ReducibleQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Másodfokú Egyenletre Visszavezethető Feladatok"
      subtitle="Bikvadratikus egyenletek, új ismeretlen bevezetése, törtes és gyökös egyenletek szűrése"
      topicId="g10-quad-visszavezetheto"
      topicTitle="Visszavezethető egyenletek"
      badge="10. Osztály • V. Témakör • 36. Lecke"
      color="cyan"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <ReducibleMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
          topicId="g10-quad-visszavezetheto"
        />
      }
      sorterComponent={
        <ReducibleSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
          topicId="g10-quad-visszavezetheto"
        />
      }
    />
  );
};

