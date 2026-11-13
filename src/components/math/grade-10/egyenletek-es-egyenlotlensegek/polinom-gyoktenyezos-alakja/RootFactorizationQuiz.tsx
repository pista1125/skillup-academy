import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RootFactorizationMatcher } from './RootFactorizationMatcher';
import { RootFactorizationSorter } from './RootFactorizationSorter';
import {
  RootFactorFormulaSvg,
  MissingLeadingCoeffTrapSvg,
  FractionSimplificationSvg,
  DiscriminantCasesFactorSvg,
  ConstructEquationFromRootsSvg
} from './RootFactorizationFigures';

interface RootFactorizationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A gyöktényezős alak alaptétele',
    description:
      'Ha a másodfokú polinomnak léteznek x₁ és x₂ valós gyökei, akkor felírható ax² + bx + c = a(x - x₁)(x - x₂) alakban. Ha D = 0, akkor x₁ = x₂ = x₀ kettős gyök, így a(x - x₀)² teljes négyzetet kapunk. Ha D < 0, a polinom nem bontható valós szorzatra!',
    note: 'Soha ne felejtsd el az "a" főegyütthatót a zárójelek elől kitenni!',
    color: 'from-purple-600 to-indigo-700',
    figure: <RootFactorFormulaSvg size={260} />
  },
  {
    title: 'A hiányzó "a" főegyüttható csapdája',
    description:
      'Ha a = 2 (pl. 2x² - 8x + 6), a gyökök 1 és 3. A helyes szorzatalak 2(x - 1)(x - 3). Ha elhagyod a 2-est, kibontva csak x² - 4x + 3-at kapnál, ami fele az eredetinek!',
    note: 'Negatív főegyüttható esetén az a = -1 szorzó is kötelező: -x² + 5x - 6 = -(x - 2)(x - 3)!',
    color: 'from-rose-500 to-amber-600',
    figure: <MissingLeadingCoeffTrapSvg size={260} />
  },
  {
    title: 'Algebrai törtek egyszerűsítése és kikötései',
    description:
      'Tört egyszerűsítésekor mind a számlálót, mind a nevezőt gyöktényezős alakra bontjuk, majd a közös szorzótényezőket kiejtjük. A nevező zérushelyeit egyszerűsítés előtt kötelező kikötni (x ≠ x_k), és ez a kikötés az egyszerűsítés után is szigorúan érvényben marad!',
    note: 'Csak szorzótényezőt szabad egyszerűsíteni, tagokat kiejteni tilos!',
    color: 'from-blue-600 to-teal-600',
    figure: <FractionSimplificationSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és normált (a = 1) polinomok szorzattá bontása',
    subtitle: '10 alapozó feladat a gyöktényezős tételről, azonosságokról és normált polinomokról',
    range: '1–10. kérdés',
    focus: 'ax² + bx + c = a(x - x₁)(x - x₂) képlet, D = 0 teljes négyzet, egyszerű szorzatalakok',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'rfq1-1',
        level: 1,
        question: 'Mi a másodfokú polinom gyöktényezős alakjának általános képlete, ha valós gyökei x₁ és x₂?',
        options: [
          'a(x - x₁)(x - x₂)',
          '(x - x₁)(x - x₂)',
          'a(x + x₁)(x + x₂)',
          '(ax - x₁)(ax - x₂)'
        ],
        correctAnswer: 0,
        hint: 'Ne feledd, az x² együtthatója "a", így ennek szorzóként meg kell jelennie!',
        explanation: 'A tétel kimondja, hogy ha az ax² + bx + c polinomnak x₁ és x₂ a gyökei, akkor ax² + bx + c = a(x - x₁)(x - x₂).'
      },
      {
        id: 'rfq1-2',
        level: 1,
        question: 'Mi a szorzatalakja az x² - 5x + 6 másodfokú polinomnak?',
        options: [
          '(x - 2)(x - 3)',
          '(x + 2)(x + 3)',
          '(x - 1)(x - 6)',
          '(x + 1)(x - 6)'
        ],
        correctAnswer: 0,
        hint: 'Keresd meg a gyököket: x₁ + x₂ = 5 és x₁ · x₂ = 6.',
        explanation: 'Az x² - 5x + 6 = 0 egyenlet gyökei 2 és 3. Mivel a = 1, a szorzatalak: (x - 2)(x - 3).'
      },
      {
        id: 'rfq1-3',
        level: 1,
        question: 'Hogyan alakítható szorzattá az x² - 9 kifejezés?',
        options: [
          '(x - 3)(x + 3)',
          '(x - 3)²',
          '(x + 3)²',
          'x(x - 9)'
        ],
        correctAnswer: 0,
        hint: 'Nevezetes azonosság: a² - b² = (a - b)(a + b). A gyökök: 3 és -3.',
        explanation: 'Az x² - 9 két négyzet különbsége: (x - 3)(x + 3). Gyökei x₁ = 3 és x₂ = -3.'
      },
      {
        id: 'rfq1-4',
        level: 1,
        question: 'Mi a szorzatalakja az x² + 4x + 4 polinomnak?',
        options: [
          '(x + 2)²',
          '(x - 2)²',
          '(x + 4)(x + 1)',
          '(x - 4)(x - 1)'
        ],
        correctAnswer: 0,
        hint: 'A diszkrimináns D = 16 - 16 = 0. Egyetlen kettős gyök van: x₀ = -2.',
        explanation: 'D = 0 esetén teljes négyzetet kapunk: (x - (-2))² = (x + 2)².'
      },
      {
        id: 'rfq1-5',
        level: 1,
        question: 'Hogyan bontható szorzatra az x² - 7x hiányos másodfokú polinom?',
        options: [
          'x(x - 7)',
          '(x - 7)²',
          '(x - 7)(x + 7)',
          'Nem bontható szorzatra'
        ],
        correctAnswer: 0,
        hint: 'Emelj ki x-et!',
        explanation: 'Ha c = 0, x kiemelhető: x(x - 7). A két gyök: x₁ = 0 és x₂ = 7.'
      },
      {
        id: 'rfq1-6',
        level: 1,
        question: 'Felbontható-e elsőfokú valós tényezők szorzatára az x² + 16 polinom a valós számok halmazán?',
        options: [
          'Nem, mert D = -64 < 0, nincs valós zérushelye.',
          'Igen: (x - 4)(x + 4).',
          'Igen: (x + 4)²',
          'Igen: x(x + 16).'
        ],
        correctAnswer: 0,
        hint: 'Számítsd ki a diszkriminánst: D = 0² - 4·1·16 = -64 < 0.',
        explanation: 'Mivel D < 0, a polinomnak nincs valós gyöke. Egy valós szám négyzete x² ≥ 0, így x² + 16 ≥ 16 sosem lehet 0, valós számok felett nem bontható szorzatra.'
      },
      {
        id: 'rfq1-7',
        level: 1,
        question: 'Ha egy másodfokú egyenlet főegyütthatója a = 1, gyökei pedig x₁ = 4 és x₂ = -1, melyik a polinom normál alakja?',
        options: [
          'x² - 3x - 4',
          'x² + 3x - 4',
          'x² - 5x + 4',
          'x² + 4x - 1'
        ],
        correctAnswer: 0,
        hint: '(x - 4)(x - (-1)) = (x - 4)(x + 1). Bontsd fel a zárójeleket!',
        explanation: '(x - 4)(x + 1) = x² + x - 4x - 4 = x² - 3x - 4.'
      },
      {
        id: 'rfq1-8',
        level: 1,
        question: 'Mi a szorzatalakja az x² - x - 20 polinomnak?',
        options: [
          '(x - 5)(x + 4)',
          '(x + 5)(x - 4)',
          '(x - 10)(x + 2)',
          '(x - 20)(x + 1)'
        ],
        correctAnswer: 0,
        hint: 'Két szám szorzata -20, összege +1. A gyökök: 5 és -4.',
        explanation: 'A gyökök x₁ = 5 és x₂ = -4, így a gyöktényezős alak: (x - 5)(x - (-4)) = (x - 5)(x + 4).'
      },
      {
        id: 'rfq1-9',
        level: 1,
        question: 'Mi történik a gyöktényezős alakkal, ha a másodfokú polinom diszkriminánsa D = 0?',
        options: [
          'A két gyöktényező egybeesik, és a(x - x₀)² teljes négyzetté alakul.',
          'A polinom nem bontható fel szorzatra.',
          'A szorzatalak értéke mindig 0 lesz.',
          'Kiesik a főegyüttható.'
        ],
        correctAnswer: 0,
        hint: 'Ha D = 0, a megoldóképletből x₁ = x₂ = x₀.',
        explanation: 'D = 0 esetén pontosan egy valós zérushely (kettős gyök) létezik, így a(x - x₀)(x - x₀) = a(x - x₀)² teljes négyzetet kapunk.'
      },
      {
        id: 'rfq1-10',
        level: 1,
        question: 'Mi a gyöktényezős alakja az x² + 6x + 9 kifejezésnek?',
        options: [
          '(x + 3)²',
          '(x - 3)²',
          '(x + 9)(x + 1)',
          '(x - 9)(x - 1)'
        ],
        correctAnswer: 0,
        hint: 'A kettős gyök: x₀ = -3.',
        explanation: 'x² + 6x + 9 = (x + 3)², mivel a -3-nál van kettős gyöke (D = 36 - 36 = 0).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Főegyütthatós polinomok (a ≠ 1) és algebrai tört-egyszerűsítés',
    subtitle: '10 számításos feladat kiemelt főegyütthatókról, negatív szorzókról és törtek egyszerűsítéséről',
    range: '11–20. kérdés',
    focus: 'a(x - x₁)(x - x₂) ahol a ≠ 1, algebrai törtek kikötése és egyszerűsítése',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    questions: [
      {
        id: 'rfq2-1',
        level: 2,
        question: 'Mi a helyes gyöktényezős alakja a 2x² - 8x + 6 polinomnak?',
        options: [
          '2 · (x - 1)(x - 3)',
          '(x - 1)(x - 3)',
          '(2x - 1)(x - 3)',
          '2 · (x + 1)(x + 3)'
        ],
        correctAnswer: 0,
        hint: 'A gyökök 1 és 3, és a = 2 főegyütthatót tilos elhagyni!',
        explanation: 'A gyökök x₁ = 1 és x₂ = 3. A főegyüttható a = 2. A helyes felírás: 2(x - 1)(x - 3). Kiemelés nélkül csak x² - 4x + 3 lenne, ami hibás!'
      },
      {
        id: 'rfq2-2',
        level: 2,
        question: 'Mi a szorzatalakja a 3x² + 6x + 3 polinomnak?',
        options: [
          '3 · (x + 1)²',
          '(x + 1)²',
          '(3x + 1)²',
          '3 · (x - 1)²'
        ],
        correctAnswer: 0,
        hint: 'Emelj ki 3-at: 3(x² + 2x + 1).',
        explanation: '3(x² + 2x + 1) = 3(x + 1)². A kettős gyök x₀ = -1, és a = 3.'
      },
      {
        id: 'rfq2-3',
        level: 2,
        question: 'Hogyan alakítható gyöktényezős szorzattá a -x² + 4x - 3 polinom?',
        options: [
          '-(x - 1)(x - 3)',
          '(x - 1)(x - 3)',
          '(x + 1)(x + 3)',
          '-(x + 1)(x - 3)'
        ],
        correctAnswer: 0,
        hint: 'A főegyüttható a = -1. Gyökök: 1 és 3.',
        explanation: 'a = -1, a gyökök x₁ = 1 és x₂ = 3. A gyöktényezős alak: -(x - 1)(x - 3), ami felírható (1 - x)(x - 3) alakban is.'
      },
      {
        id: 'rfq2-4',
        level: 2,
        question: 'Egyszerűsítsd az (x² - 4) / (x - 2) törtet a kikötés megadásával!',
        options: [
          'x + 2, ahol x ≠ 2',
          'x + 2, minden valós x-re',
          'x - 2, ahol x ≠ 2',
          'x - 2, minden valós x-re'
        ],
        correctAnswer: 0,
        hint: 'x² - 4 = (x - 2)(x + 2). Mi a nevező kizárt értéke?',
        explanation: 'A számláló (x - 2)(x + 2). Az (x - 2) tényezővel egyszerűsítve x + 2 marad. A nevező miatt a kikötés x ≠ 2, amely az egyszerűsítés után is kötelező érvényű!'
      },
      {
        id: 'rfq2-5',
        level: 2,
        question: 'Egyszerűsítsd az (x² - 5x + 6) / (x - 3) algebrai törtet!',
        options: [
          'x - 2, kikötés: x ≠ 3',
          'x - 3, kikötés: x ≠ 2',
          'x + 2, kikötés: x ≠ 3',
          'x - 2, kikötés nélkül'
        ],
        correctAnswer: 0,
        hint: 'Számláló: (x - 2)(x - 3).',
        explanation: '(x - 2)(x - 3) / (x - 3) = x - 2, feltéve, hogy x ≠ 3.'
      },
      {
        id: 'rfq2-6',
        level: 2,
        question: 'Egyszerűsítsd a (2x² - 8) / (x + 2) kifejezést!',
        options: [
          '2 · (x - 2), kikötés: x ≠ -2',
          '2 · (x + 2), kikötés: x ≠ -2',
          'x - 2, kikötés: x ≠ -2',
          '2x - 4, kikötés nélkül'
        ],
        correctAnswer: 0,
        hint: 'Számláló: 2(x² - 4) = 2(x - 2)(x + 2).',
        explanation: '2(x - 2)(x + 2) / (x + 2) = 2(x - 2) = 2x - 4, az x ≠ -2 kikötéssel.'
      },
      {
        id: 'rfq2-7',
        level: 2,
        question: 'Mi a gyöktényezős alakja a 2x² + 5x - 3 polinomnak?',
        options: [
          '(2x - 1)(x + 3)',
          '2 · (x - 1)(x + 3)',
          '(x - 1/2)(x + 3)',
          '(2x + 1)(x - 3)'
        ],
        correctAnswer: 0,
        hint: 'D = 25 - 4·2·(-3) = 49. Gyökök: 1/2 és -3. Képlet: 2(x - 1/2)(x + 3).',
        explanation: '2 · (x - 1/2)(x + 3) = (2x - 1)(x + 3). Mindkét forma helyes, a kettes bevihető a törttel rendelkező tagba.'
      },
      {
        id: 'rfq2-8',
        level: 2,
        question: 'Miért kötelező megadni a kikötést egy algebrai tört egyszerűsítésekor?',
        options: [
          'Mert az eredeti törtben a nevező nem lehetett 0, és az egyszerűsített kifejezés csak az értelmezési tartományon azonos az eredetivel.',
          'Csak formai követelmény, valójában nincs jelentősége.',
          'Mert egyszerűsítés után a gyökök száma növekszik.',
          'Mert a negatív számok kizárandók.'
        ],
        correctAnswer: 0,
        hint: 'Behelyettesíthetsz-e az eredeti törtbe olyan számot, ahol a nevező 0 volt?',
        explanation: 'Két algebrai kifejezés azonossága csak a közös értelmezési tartományukon érvényes. A tiltott értéknél az eredeti kifejezés nem értelmezett, ezért az egyszerűsített alakba sem szabad behelyettesíteni azt.'
      },
      {
        id: 'rfq2-9',
        level: 2,
        question: 'Egyszerűsítsd az (x² - 9) / (x² - 6x + 9) törtet!',
        options: [
          '(x + 3) / (x - 3), kikötés: x ≠ 3',
          '(x - 3) / (x + 3), kikötés: x ≠ -3',
          '1, kikötés: x ≠ 3',
          '(x + 3) / (x - 3), kikötés: x ≠ ±3'
        ],
        correctAnswer: 0,
        hint: 'Számláló: (x - 3)(x + 3). Nevező: (x - 3)²',
        explanation: '(x - 3)(x + 3) / (x - 3)² = (x + 3) / (x - 3). A nevező zérushelye x = 3, így a kikötés x ≠ 3.'
      },
      {
        id: 'rfq2-10',
        level: 2,
        question: 'Mi a szorzatalakja a -2x² + 8 polinomnak?',
        options: [
          '-2 · (x - 2)(x + 2)',
          '2 · (x - 2)(x + 2)',
          '-(x - 2)(x + 2)',
          '-2 · (x - 2)²'
        ],
        correctAnswer: 0,
        hint: 'Emelj ki -2-t: -2(x² - 4).',
        explanation: '-2(x² - 4) = -2(x - 2)(x + 2). A gyökök 2 és -2, a főegyüttható -2.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett törtek, egyenletalkotás és emelt szintű feladatok',
    subtitle: '10 komplex feladat egyenletek felírásáról, összetett egyszerűsítésekről és paraméterekről',
    range: '21–30. kérdés',
    focus: 'Egyenletalkotás x₁, x₂ gyökökből, összetett algebrai törtek, irreducibilis polinomok',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-purple-600',
    questions: [
      {
        id: 'rfq3-1',
        level: 3,
        question: 'Írj fel olyan egész együtthatós másodfokú egyenletet, amelynek gyökei x₁ = -3 és x₂ = 5!',
        options: [
          'x² - 2x - 15 = 0',
          'x² + 2x - 15 = 0',
          'x² - 8x + 15 = 0',
          'x² + 8x - 15 = 0'
        ],
        correctAnswer: 0,
        hint: '(x - (-3))(x - 5) = (x + 3)(x - 5) = 0.',
        explanation: '(x + 3)(x - 5) = x² - 5x + 3x - 15 = x² - 2x - 15 = 0.'
      },
      {
        id: 'rfq3-2',
        level: 3,
        question: 'Melyik másodfokú egyenletnek egyetlen valós kettős gyöke az x₀ = 4?',
        options: [
          'x² - 8x + 16 = 0',
          'x² + 8x + 16 = 0',
          'x² - 16 = 0',
          'x² - 4x + 16 = 0'
        ],
        correctAnswer: 0,
        hint: '(x - 4)² = 0. Bontsd fel!',
        explanation: '(x - 4)² = x² - 8x + 16 = 0.'
      },
      {
        id: 'rfq3-3',
        level: 3,
        question: 'Egyszerűsítsd a (2x² - 4x - 6) / (2x - 6) algebrai törtet!',
        options: [
          'x + 1, kikötés: x ≠ 3',
          'x - 1, kikötés: x ≠ 3',
          '2x + 1, kikötés: x ≠ 3',
          'x + 1, kikötés: x ≠ -1'
        ],
        correctAnswer: 0,
        hint: 'Számláló: 2(x² - 2x - 3) = 2(x - 3)(x + 1). Nevező: 2(x - 3).',
        explanation: '2(x - 3)(x + 1) / [2(x - 3)] = x + 1, a nevező miatti x ≠ 3 kikötéssel.'
      },
      {
        id: 'rfq3-4',
        level: 3,
        question: 'Egyszerűsítsd az (x² - 16) / (2x² - 7x - 4) törtet!',
        options: [
          '(x + 4) / (2x + 1), kikötések: x ≠ 4 és x ≠ -0,5',
          '(x - 4) / (2x + 1), kikötés: x ≠ 4',
          '(x + 4) / (2x - 1), kikötések: x ≠ 4 és x ≠ 0,5',
          '1 / 2, kikötés: x ≠ 4'
        ],
        correctAnswer: 0,
        hint: 'Számláló: (x - 4)(x + 4). A nevező gyökei 4 és -0,5, így (x - 4)(2x + 1).',
        explanation: 'A számláló (x - 4)(x + 4), a nevező (x - 4)(2x + 1). Egyszerűsítve (x + 4)/(2x + 1). Kikötések: x ≠ 4 és x ≠ -1/2.'
      },
      {
        id: 'rfq3-5',
        level: 3,
        question: 'Milyen feltétel esetén nem bontható fel egy másodfokú polinom valós elsőfokú tényezők szorzatára?',
        options: [
          'Ha a diszkriminánsa negatív: D = b² - 4ac < 0.',
          'Ha a főegyütthatója negatív: a < 0.',
          'Ha nincs konstans tagja: c = 0.',
          'Ha D = 0.'
        ],
        correctAnswer: 0,
        hint: 'Mikor nincs valós zérushelye a másodfokú egyenletnek?',
        explanation: 'Ha D < 0, az ax² + bx + c = 0 egyenletnek nincs valós gyöke, így a valós számok teste felett nem léteznek gyöktényezők: a polinom irreducibilis.'
      },
      {
        id: 'rfq3-6',
        level: 3,
        question: 'Írj fel olyan másodfokú egyenletet, amelynek gyökei az x₁ = 2/3 és x₂ = -1/2 számok!',
        options: [
          '6x² - x - 2 = 0',
          '6x² + x - 2 = 0',
          'x² - x - 2 = 0',
          '6x² - 5x + 1 = 0'
        ],
        correctAnswer: 0,
        hint: '(3x - 2)(2x + 1) = 0. Bontsd fel a zárójeleket!',
        explanation: '(x - 2/3)(x + 1/2) = 0. Szorozzuk meg 6-tal (3·2): (3x - 2)(2x + 1) = 6x² + 3x - 4x - 2 = 6x² - x - 2 = 0.'
      },
      {
        id: 'rfq3-7',
        level: 3,
        question: 'Egyszerűsítsd az (x³ - 4x) / (x² - 2x) kifejezést!',
        options: [
          'x + 2, kikötések: x ≠ 0 és x ≠ 2',
          'x + 2, kikötés: x ≠ 2',
          'x - 2, kikötések: x ≠ 0 és x ≠ 2',
          'x² + 2, kikötés nélkül'
        ],
        correctAnswer: 0,
        hint: 'Számláló: x(x² - 4) = x(x - 2)(x + 2). Nevező: x(x - 2).',
        explanation: 'x(x - 2)(x + 2) / [x(x - 2)] = x + 2. A nevező miatt mind az x = 0, mind az x = 2 kizárt érték!'
      },
      {
        id: 'rfq3-8',
        level: 3,
        question: 'Mi a gyöktényezős alakja a 4x² - 12x + 9 polinomnak?',
        options: [
          '(2x - 3)²',
          '4 · (x - 3)²',
          '(2x + 3)²',
          '(4x - 3)²'
        ],
        correctAnswer: 0,
        hint: 'D = 144 - 144 = 0. A gyök x₀ = 12/8 = 1,5 = 3/2. Képlet: 4(x - 3/2)².',
        explanation: '4 · (x - 3/2)² = [2(x - 3/2)]² = (2x - 3)². Teljes négyzet.'
      },
      {
        id: 'rfq3-9',
        level: 3,
        question: 'Határozd meg a k paraméter értékét, ha az x² + kx + 12 polinom egyik gyöke x₁ = 3!',
        options: [
          'k = -7',
          'k = 7',
          'k = -4',
          'k = 4'
        ],
        correctAnswer: 0,
        hint: 'A gyökök szorzata 12: x₁ · x₂ = 12 ⟹ 3 · x₂ = 12 ⟹ x₂ = 4. Összegük: x₁ + x₂ = -k.',
        explanation: 'Ha x₁ = 3, akkor a Viète-formula szerint 3 · x₂ = 12 ⟹ x₂ = 4. A gyökök összege: 3 + 4 = 7 = -k ⟹ k = -7. (Vagy behelyettesítve 3-at: 9 + 3k + 12 = 0 ⟹ 3k = -21 ⟹ k = -7).'
      },
      {
        id: 'rfq3-10',
        level: 3,
        question: 'Melyik algebrai tört ekvivalens az (x - 4) / (x + 1) kifejezéssel minden x ≠ -1 és x ≠ 4 valós számra?',
        options: [
          '(x² - 8x + 16) / (x² - 3x - 4)',
          '(x² - 16) / (x² - 1)',
          '(x - 4)² / (x + 1)',
          '(x² - 4) / (x + 1)'
        ],
        correctAnswer: 0,
        hint: 'Szorozd meg a számlálót és nevezőt is (x - 4)-gyel: (x - 4)² / [(x + 1)(x - 4)].',
        explanation: '(x - 4)(x - 4) / [(x + 1)(x - 4)] = (x² - 8x + 16) / (x² - 3x - 4). Kikötések: x ≠ -1 és x ≠ 4.'
      }
    ]
  }
};

export const RootFactorizationQuiz: React.FC<RootFactorizationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-polinom-gyoktenyezos-alakja-quiz"
      topicTitle="Polinom gyöktényezős alakja – Kvíz és Feladatok"
      themeColor="purple"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <RootFactorizationMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules) => (
        <RootFactorizationSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

