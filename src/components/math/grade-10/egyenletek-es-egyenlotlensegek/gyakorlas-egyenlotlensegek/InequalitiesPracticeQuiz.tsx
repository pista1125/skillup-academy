import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { InequalitiesPracticeMatcher } from './InequalitiesPracticeMatcher';
import { InequalitiesPracticeSorter } from './InequalitiesPracticeSorter';
import {
  FractionSignChartSvg,
  AbsoluteValueInequalityBandSvg,
  DenominatorDangerTrapSvg,
  ComplexIntervalIntersectionSvg,
  AbsoluteQuadraticParabolaSvg
} from './InequalitiesPracticeFigures';

interface InequalitiesPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Törtes egyenlőtlenségek és az előjeltáblázat',
    description:
      'SOHA ne szorozz be az ismeretlent tartalmazó nevezővel, mert ha az negatív, a relációjel megfordulna! Mindig nullára rendezünk (P(x)/Q(x) ≶ 0), közös nevezőre hozunk, és előjeltáblázatot készítünk a kritikus pontok (zérushelyek) alapján.',
    note: 'Kikötési aranyszabály: Megengedő (≤, ≥) egyenlőtlenségnél a számláló lehet nulla (zárt zárójel), de a nevező SOHA (a nevezőnél a zárójel kötelezően NYÍLT: pl. [a; b[)!',
    color: 'from-indigo-600 to-purple-700',
    figure: <FractionSignChartSvg size={260} />
  },
  {
    title: 'Az abszolútérték geometriai felbontása',
    description:
      'Az |x - u| kifejezés az x pont távolsága az u középponttól. Ha |A| ≤ d (d > 0), akkor a távolság legfeljebb d: ez a kétirányú -d ≤ A ≤ d összefüggést jelenti. Ha |A| ≥ d, akkor A ≤ -d VAGY A ≥ d (két külső félegyenes uniója).',
    note: 'Ha a jobb oldal negatív: |A| < -2 esetén M = ∅ (nincs megoldás), míg |A| ≥ -2 esetén M = ℝ (minden valós szám)!',
    color: 'from-blue-600 to-teal-600',
    figure: <AbsoluteValueInequalityBandSvg size={260} />
  },
  {
    title: 'Egyenlőtlenség-rendszerek és az átbeszorzás csapdája',
    description:
      'Egyenlőtlenség-rendszernél több feltételnek egyszerre kell teljesülnie: külön-külön megoldjuk az egyes egyenlőtlenségeket, majd a kapott rész-megoldáshalmazok METSZETÉT (I₁ ∩ I₂) képezzük egy közös számegyenesen.',
    note: 'Vigyázat: 3/(x - 2) > 1 esetén az átbeszorzás 3 > x - 2 ⟹ x < 5 hibás, mert ha x < 2, a nevező negatív! A helyes megoldás: x ∈ ]2; 5[.',
    color: 'from-rose-500 to-amber-600',
    figure: <DenominatorDangerTrapSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető törtes és abszolútértékes egyenlőtlenségek',
    subtitle: '10 alapozó feladat a törtek alapszabályairól, kikötéseiről és az abszolútértékről',
    range: '1–10. kérdés',
    focus: 'Átbeszorzás tilalma, nevező kikötése, egyszerű |x| relációk, előjelek',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    questions: [
      {
        id: 'ipq1-1',
        level: 1,
        question: 'Miért tilos egy törtes egyenlőtlenség mindkét oldalát beszorozni az ismeretlent tartalmazó nevezővel?',
        options: [
          'Mert a nevező előjele az ismeretlentől függ: ha negatív, a relációjel kötelezően megfordulna.',
          'Mert az algebra nem engedi a szorzást törtes feladatoknál.',
          'Mert a beszorzás mindig növeli a fokszámot.',
          'Mert a tört nevezője mindig pozitív szám.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a negatív számmal való szorzás szabályára: megfordul-e a kacsacsőr?',
        explanation: 'Egyenlőtlenségeknél negatív számmal való szorzáskor a relációjel megfordul. Mivel a nevező előjele x-től függ (lehet pozitív vagy negatív is), az előjel ismerete nélkül végzett átbeszorzás hamis tartományokat vagy gyökvesztést okoz!'
      },
      {
        id: 'ipq1-2',
        level: 1,
        question: 'Mi a valós megoldása az |x| ≤ 7 egyenlőtlenségnek?',
        options: [
          'x ∈ [-7; 7]',
          'x ∈ ]-7; 7[',
          'x ∈ ]-∞; -7] ∪ [7; ∞[',
          'x ≤ 7'
        ],
        correctAnswer: 0,
        hint: 'A számegyenesen az origótól mért távolság legfeljebb 7 egység, és a határok is megengedettek.',
        explanation: '|x| ≤ 7 pontosan akkor teljesül, ha -7 ≤ x ≤ 7. Mivel a reláció megengedő (≤), a határértékek is beletartoznak a zárt intervallumba: x ∈ [-7; 7].'
      },
      {
        id: 'ipq1-3',
        level: 1,
        question: 'Mely valós számokra teljesül az |x| > 3 egyenlőtlenség?',
        options: [
          'x ∈ ]-∞; -3[ ∪ ]3; ∞[',
          'x ∈ ]-3; 3[',
          'x > 3',
          'x ∈ [-3; 3]'
        ],
        correctAnswer: 0,
        hint: 'Az origótól való távolság szigorúan nagyobb mint 3 egység mindkét irányban.',
        explanation: 'Az abszolútérték akkor nagyobb mint 3, ha x > 3 VAGY x < -3. A két végtelen külső tartomány uniója: x ∈ ]-∞; -3[ ∪ ]3; ∞[.'
      },
      {
        id: 'ipq1-4',
        level: 1,
        question: 'Mi az |x| < -4 egyenlőtlenség megoldáshalmaza a valós számok halmazán?',
        options: [
          'M = ∅ (nincs megoldás)',
          'x ∈ ]-4; 4[',
          'M = ℝ',
          'x < -4'
        ],
        correctAnswer: 0,
        hint: 'Egy valós szám abszolútértéke definíció szerint nemnegatív (|x| ≥ 0). Lehet-e kisebb mint -4?',
        explanation: 'Bármely valós szám abszolútértéke nemnegatív (|x| ≥ 0). Emiatt nem létezik olyan valós szám, amelynek abszolútértéke szigorúan kisebb lenne egy negatív számnál (-4). A megoldás: M = ∅.'
      },
      {
        id: 'ipq1-5',
        level: 1,
        question: 'Mely valós számokra teljesül az |x| ≥ 0 egyenlőtlenség?',
        options: [
          'M = ℝ (minden valós számra teljesül)',
          'Csak x > 0 esetén',
          'Csak x = 0 esetén',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Pozitív szám abszolútértéke pozitív, negatívé pozitív, 0 abszolútértéke 0.',
        explanation: 'Az abszolútérték definíciója szerint minden valós x-re |x| ≥ 0. Ezért az egyenlőtlenség az egész valós számegyenesen igaz: M = ℝ.'
      },
      {
        id: 'ipq1-6',
        level: 1,
        question: 'Mi a megoldása az 1 / (x - 3) > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]3; ∞[',
          'x ∈ [3; ∞[',
          'x ∈ ]-∞; 3[',
          'x > 0'
        ],
        correctAnswer: 0,
        hint: 'A számláló +1 (mindig pozitív). Egy tört mikor lesz szigorúan pozitív?',
        explanation: 'Mivel a számláló pozitív (+1), a tört csak akkor lehet pozitív, ha a nevező is szigorúan pozitív: x - 3 > 0 ⟹ x > 3, azaz x ∈ ]3; ∞[.'
      },
      {
        id: 'ipq1-7',
        level: 1,
        question: 'Mi az (x - 2) / (x + 5) < 0 egyenlőtlenség megoldása?',
        options: [
          'x ∈ ]-5; 2[',
          'x ∈ [-5; 2]',
          'x ∈ ]-∞; -5[ ∪ ]2; ∞[',
          'x ∈ ]2; 5['
        ],
        correctAnswer: 0,
        hint: 'A tört előjele a szorzattal azonos: (x - 2)(x + 5) < 0. Két zérushely van: -5 és 2.',
        explanation: 'A hányados előjele megegyezik a szorzat (x - 2)(x + 5) < 0 előjelével. A gyökök -5 és 2. Mivel a kifejezés szigorúan negatív, a két gyök közötti nyílt intervallum a megoldás: x ∈ ]-5; 2[.'
      },
      {
        id: 'ipq1-8',
        level: 1,
        question: 'Miért kötelezően nyílt a zárójel a nevező zérushelyénél megengedő (≤ vagy ≥) törtes egyenlőtlenségben is?',
        options: [
          'Mert a nevezőben lévő kifejezés értéke sohasem lehet nulla (nullával nem osztunk).',
          'Mert a számláló zárójele mindig nyílt.',
          'Mert a megengedő reláció csak a pozitív számokra vonatkozik.',
          'Ez tévedés, a nevezőnél is mindig szögletes zárt zárójel áll.'
        ],
        correctAnswer: 0,
        hint: 'Mit kapunk, ha a nevező 0 lesz?',
        explanation: 'Bármilyen megengedő reláció esetén a tört értéke lehet 0 (ha a számláló 0), de a nevező soha semmilyen körülmények között nem veheti fel a 0 értéket, mert a nullával való osztás értelmetlen. Ezért a nevező zérushelyénél a zárójel MINDIG nyílt!'
      },
      {
        id: 'ipq1-9',
        level: 1,
        question: 'Mi az |x - 4| ≤ 2 egyenlőtlenség megoldása?',
        options: [
          'x ∈ [2; 6]',
          'x ∈ ]2; 6[',
          'x ∈ [-2; 2]',
          'x ∈ [4; 6]'
        ],
        correctAnswer: 0,
        hint: 'A 4-es középponttól mért távolság legfeljebb 2: 4 - 2 és 4 + 2.',
        explanation: '-2 ≤ x - 4 ≤ 2. Mindegyik oldalhoz 4-et adva: 2 ≤ x ≤ 6. Zárt intervallum: x ∈ [2; 6].'
      },
      {
        id: 'ipq1-10',
        level: 1,
        question: 'Mi a megoldása az 1 / x ≤ 0 egyenlőtlenségnek a valós számok halmazán?',
        options: [
          'x ∈ ]-∞; 0[ (a 0-nál szigorúan nyílt zárójellel)',
          'x ∈ ]-∞; 0]',
          'x ≤ 0',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'A számláló +1, így a tört sosem lehet 0! A nevező negatív kell legyen, és x ≠ 0.',
        explanation: 'Mivel a számláló +1 (nem lehet nulla), a tört sosem veheti fel az egyenlőséget (nem lehet 0). A feltétel csak úgy teljesülhet, ha 1/x < 0, vagyis ha x < 0. Mivel x ≠ 0, a megoldás: x ∈ ]-∞; 0[.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Nullára rendezés, közös nevező és másodfokúvá alakuló törtek',
    subtitle: '10 számításos feladat törtes kifejezések algebrai megoldásáról és abszolútértékes sávokról',
    range: '11–20. kérdés',
    focus: 'Közös nevezőre hozás, tört előjeltáblázata, |ax + b| egyenlőtlenségek',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'ipq2-1',
        level: 2,
        question: 'Hogyan rendezzük helyesen az (x + 3) / (x - 2) ≥ 1 egyenlőtlenséget?',
        options: [
          'Kivonunk 1-et mindkét oldalból, majd közös nevezőre hozunk: 5 / (x - 2) ≥ 0.',
          'Beszorozzuk mindkét oldalt (x - 2)-vel: x + 3 ≥ x - 2.',
          'Azonnal elhagyjuk a nevezőt.',
          'Négyzetre emeljük mindkét oldalt.'
        ],
        correctAnswer: 0,
        hint: 'Mindig nullára rendezünk: (x + 3)/(x - 2) - 1 ≥ 0.',
        explanation: 'A helyes lépés: (x + 3)/(x - 2) - (x - 2)/(x - 2) ≥ 0 ⟹ [(x + 3) - (x - 2)] / (x - 2) ≥ 0 ⟹ 5 / (x - 2) ≥ 0.'
      },
      {
        id: 'ipq2-2',
        level: 2,
        question: 'Mi a megoldása az előző feladatbeli 5 / (x - 2) ≥ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]2; ∞[',
          'x ∈ [2; ∞[',
          'x ∈ ]-∞; 2[',
          'x ≥ 5'
        ],
        correctAnswer: 0,
        hint: 'A számláló +5 (állandó pozitív). A nevező x - 2 > 0 kell legyen (x ≠ 2 kikötéssel).',
        explanation: 'Mivel a számláló +5 > 0, a hányados pontosan akkor pozitív, ha a nevező pozitív: x - 2 > 0 ⟹ x > 2. Mivel a nevező nem lehet nulla, a 2-nél nyílt a zárójel: x ∈ ]2; ∞[.'
      },
      {
        id: 'ipq2-3',
        level: 2,
        question: 'Mi a megoldása a (2x - 6) / (x + 1) ≤ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-1; 3] (a -1-nél nyílt, a 3-nál zárt)',
          'x ∈ [-1; 3]',
          'x ∈ ]-1; 3[',
          'x ∈ ]-∞; -1[ ∪ [3; ∞['
        ],
        correctAnswer: 0,
        hint: 'Számláló gyöke: 2x - 6 = 0 ⟹ x = 3. Nevező gyöke: x + 1 = 0 ⟹ x = -1.',
        explanation: 'A számláló zérushelye 3 (megengedett, mert ≤ 0), a nevezőé -1 (tilos, mert kikötés: x ≠ -1). A két zérushely között a tört negatív, így a megoldás: x ∈ ]-1; 3].'
      },
      {
        id: 'ipq2-4',
        level: 2,
        question: 'Mi az |2x - 3| < 5 egyenlőtlenség megoldása?',
        options: [
          'x ∈ ]-1; 4[',
          'x ∈ [-1; 4]',
          'x ∈ ]-4; 4[',
          'x ∈ ]-∞; -1[ ∪ ]4; ∞['
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel kétoldali egyenlőtlenségre: -5 < 2x - 3 < 5. Adj hozzá 3-at, majd oszd el 2-vel!',
        explanation: '-5 < 2x - 3 < 5 ⟹ 3-at hozzáadva: -2 < 2x < 8 ⟹ 2-vel osztva: -1 < x < 4. Nyílt intervallum: x ∈ ]-1; 4[.'
      },
      {
        id: 'ipq2-5',
        level: 2,
        question: 'Mi az |3x + 6| ≥ 9 egyenlőtlenség megoldása?',
        options: [
          'x ∈ ]-∞; -5] ∪ [1; ∞[',
          'x ∈ [-5; 1]',
          'x ∈ ]-5; 1[',
          'x ≥ 1'
        ],
        correctAnswer: 0,
        hint: 'Két ágra bomlik: 3x + 6 ≤ -9 VAGY 3x + 6 ≥ 9.',
        explanation: '1. ág: 3x + 6 ≤ -9 ⟹ 3x ≤ -15 ⟹ x ≤ -5. 2. ág: 3x + 6 ≥ 9 ⟹ 3x ≥ 3 ⟹ x ≥ 1. A két félegyenes uniója: x ∈ ]-∞; -5] ∪ [1; ∞[.'
      },
      {
        id: 'ipq2-6',
        level: 2,
        question: 'Mi a megoldása az (x² - 9) / (x - 1) > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-3; 1[ ∪ ]3; ∞[',
          'x ∈ ]-∞; -3[ ∪ ]1; 3[',
          'x ∈ ]1; 3[',
          'x ∈ ]-3; 3['
        ],
        correctAnswer: 0,
        hint: 'A kritikus pontok sorban: -3, 1, 3. Készíts előjeltáblázatot a (x - 3)(x + 3)/(x - 1) kifejezésre!',
        explanation: 'A zérushelyek -3, 1 és 3. Vizsgálva az előjeleket: ha x < -3: (-)·(-)/(-) = -. Ha -3 < x < 1: (-)·(+)/(-) = +. Ha 1 < x < 3: (-)·(+)/(+) = -. Ha x > 3: (+)·(+)/(+) = +. A pozitív részek: x ∈ ]-3; 1[ ∪ ]3; ∞[.'
      },
      {
        id: 'ipq2-7',
        level: 2,
        question: 'Mi a megoldása az (x + 4) / (x² + 2) ≥ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ [-4; ∞[',
          'x ∈ ]-4; ∞[',
          'x ∈ [-4; 2]',
          'x ∈ ]-∞; -4]'
        ],
        correctAnswer: 0,
        hint: 'A nevező x² + 2 legalább 2 minden valós x-re, tehát mindig szigorúan pozitív!',
        explanation: 'Mivel x² ≥ 0, ezért x² + 2 ≥ 2 mindig szigorúan pozitív a teljes valós számegyenesen. Így a tört előjelét kizárólag a számláló határozza meg: x + 4 ≥ 0 ⟹ x ≥ -4, azaz x ∈ [-4; ∞[.'
      },
      {
        id: 'ipq2-8',
        level: 2,
        question: 'Hogyan oldjuk meg az 1 / (x - 1) < 1 egyenlőtlenséget a valós számok halmazán?',
        options: [
          'Nullára rendezve: (2 - x) / (x - 1) < 0 ⟹ x ∈ ]-∞; 1[ ∪ ]2; ∞[.',
          'Beszorozva (x - 1)-gyel: 1 < x - 1 ⟹ x > 2.',
          'Kizárólag x < 1 a megoldás.',
          'Nincs valós megoldása.'
        ],
        correctAnswer: 0,
        hint: '1 / (x - 1) - 1 < 0 ⟹ [1 - (x - 1)] / (x - 1) < 0 ⟹ (2 - x) / (x - 1) < 0.',
        explanation: '1 / (x - 1) - 1 < 0 ⟹ (2 - x)/(x - 1) < 0. A zérushelyek 1 és 2. A tört a két gyökön kívül negatív: x ∈ ]-∞; 1[ ∪ ]2; ∞[.'
      },
      {
        id: 'ipq2-9',
        level: 2,
        question: 'Mi a megoldása a (4 - x) / (x + 3) ≥ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-3; 4]',
          'x ∈ [-3; 4]',
          'x ∈ ]-∞; -3[ ∪ [4; ∞[',
          'x ∈ ]-3; 4['
        ],
        correctAnswer: 0,
        hint: 'Vigyázat, a számlálóban a főegyüttható negatív (4 - x)! Zérushelyek: -3 (nevező, nyílt) és 4 (számláló, zárt).',
        explanation: 'A számláló gyöke 4, a nevezőé -3. Tesztelve x = 0-t: 4/3 > 0 (igaz). Tehát a két gyök között pozitív a tört. A nevező miatt a -3-nál nyílt, a 4-nél zárt: x ∈ ]-3; 4].'
      },
      {
        id: 'ipq2-10',
        level: 2,
        question: 'Mi a megoldása az |x - 1| ≤ 0 egyenlőtlenségnek?',
        options: [
          'M = {1} (egyetlen pont)',
          'M = ∅',
          'x ≤ 1',
          'x ∈ [-1; 1]'
        ],
        correctAnswer: 0,
        hint: 'Az abszolútérték mindig ≥ 0. Mikor lehet mégis ≤ 0?',
        explanation: 'Mivel |x - 1| ≥ 0 minden valós számra, a ≤ 0 feltétel kizárólag akkor teljesül, ha |x - 1| = 0, azaz x = 1. A megoldáshalmaz az egyelemű halmaz: M = {1}.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett másodfokú abszolútértékek és egyenlőtlenség-rendszerek',
    subtitle: '10 emelt szintű feladat rendszerekről, másodfokú abszolútértékekről és metszetekről',
    range: '21–30. kérdés',
    focus: '|ax² + bx + c| ≶ d, rendszerek közös metszete, többtényezős törtek',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-indigo-600',
    questions: [
      {
        id: 'ipq3-1',
        level: 3,
        question: 'Hogyan alakítható át ekvivalens módon az |x² - 4| < 5 másodfokú abszolútértékes egyenlőtlenség?',
        options: [
          'Kétoldali egyenlőtlenséggé: -5 < x² - 4 < 5, azaz { x² - 4 > -5 ÉS x² - 4 < 5 }.',
          'Négyzetre emeléssel egy negyedfokú egyenletté.',
          'Egyszerűen elhagyjuk az abszolútértéket: x² - 4 < 5.',
          'Két esetre: x² - 4 < 5 és x² - 4 < -5.'
        ],
        correctAnswer: 0,
        hint: '|A| < d pontosan akkor áll fenn, ha -d < A < d.',
        explanation: 'Az abszolútérték definíciója szerint |A| < d (ahol d > 0) pontosan akkor igaz, ha -d < A < d. Ez két egyidejű feltétel metszetét jelenti: x² - 4 > -5 ÉS x² - 4 < 5.'
      },
      {
        id: 'ipq3-2',
        level: 3,
        question: 'Mi a fenti |x² - 4| < 5 egyenlőtlenség valós megoldáshalmaza?',
        options: [
          'x ∈ ]-3; 3[',
          'x ∈ ]-1; 1[',
          'x ∈ ]-3; -1[ ∪ ]1; 3[',
          'x ∈ [-3; 3]'
        ],
        correctAnswer: 0,
        hint: '-5 < x² - 4 < 5 ⟹ 4-et hozzáadva: -1 < x² < 9. Mivel x² ≥ 0 mindig teljesül, csak x² < 9 marad!',
        explanation: '-1 < x² < 9. Az x² > -1 feltétel minden valós számra teljesül (ℝ). Az x² < 9 feltétel megoldása x ∈ ]-3; 3[. A kettő metszete: x ∈ ]-3; 3[.'
      },
      {
        id: 'ipq3-3',
        level: 3,
        question: 'Mi a megoldása az |x² - 5| ≥ 4 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; -3] ∪ [-1; 1] ∪ [3; ∞[',
          'x ∈ [-3; -1] ∪ [1; 3]',
          'x ∈ ]-3; 3[',
          'x ∈ ]-∞; -3] ∪ [3; ∞['
        ],
        correctAnswer: 0,
        hint: '1. ág: x² - 5 ≤ -4 ⟹ x² ≤ 1. 2. ág: x² - 5 ≥ 4 ⟹ x² ≥ 9.',
        explanation: '1. ág: x² ≤ 1 ⟹ x ∈ [-1; 1]. 2. ág: x² ≥ 9 ⟹ x ∈ ]-∞; -3] ∪ [3; ∞[. A megoldás ezen tartományok uniója: x ∈ ]-∞; -3] ∪ [-1; 1] ∪ [3; ∞[.'
      },
      {
        id: 'ipq3-4',
        level: 3,
        question: 'Mi az alábbi egyenlőtlenség-rendszer megoldása: { x² ≥ 4 ÉS x < 5 }?',
        options: [
          'x ∈ ]-∞; -2] ∪ [2; 5[',
          'x ∈ [2; 5[',
          'x ∈ ]-2; 2[',
          'x ∈ ]-∞; 5['
        ],
        correctAnswer: 0,
        hint: '1. feltétel: x ∈ ]-∞; -2] ∪ [2; ∞[. 2. feltétel: x < 5. Keresd a közös részt!',
        explanation: 'Az 1. feltétel megoldása I₁ = ]-∞; -2] ∪ [2; ∞[. A 2. feltétel I₂ = ]-∞; 5[. A kettő metszete a közös számegyenesen: M = I₁ ∩ I₂ = ]-∞; -2] ∪ [2; 5[.'
      },
      {
        id: 'ipq3-5',
        level: 3,
        question: 'Mi a megoldása az alábbi rendszernek: { x² - 4x + 3 < 0 ÉS x ≥ 2 }?',
        options: [
          'x ∈ [2; 3[',
          'x ∈ ]1; 3[',
          'x ∈ [1; 2]',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'x² - 4x + 3 < 0 megoldása ]1; 3[. Metsszed össze az x ≥ 2 feltétellel!',
        explanation: 'Az 1. egyenlőtlenség gyökei 1 és 3, így I₁ = ]1; 3[. A 2. feltétel I₂ = [2; ∞[. A metszet: ]1; 3[ ∩ [2; ∞[ = [2; 3[.'
      },
      {
        id: 'ipq3-6',
        level: 3,
        question: 'Mi a megoldása az (x² - 4) / (x² - 1) ≤ 0 törtes egyenlőtlenségnek?',
        options: [
          'x ∈ [-2; -1[ ∪ ]1; 2]',
          'x ∈ [-2; 2]',
          'x ∈ ]-1; 1[',
          'x ∈ ]-∞; -2] ∪ [-1; 1] ∪ [2; ∞['
        ],
        correctAnswer: 0,
        hint: 'Négy gyök van: -2, -1, 1, 2. A nevező gyökei (±1) kötelezően nyíltak, a számlálóéi (±2) zártak!',
        explanation: 'Számláló gyökei: ±2 (lehetnek 0, zárt zárójel). Nevező gyökei: ±1 (kikötés: x ≠ ±1, nyílt zárójel). Előjeltáblázatot készítve a negatív szakaszok: x ∈ [-2; -1[ ∪ ]1; 2].'
      },
      {
        id: 'ipq3-7',
        level: 3,
        question: 'Mi a megoldása az |x² - 2x| < 3 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-1; 3[',
          'x ∈ ]-3; 1[',
          'x ∈ ]0; 2[',
          'x ∈ [-1; 3]'
        ],
        correctAnswer: 0,
        hint: '-3 < x² - 2x < 3. 1. ág: x² - 2x + 3 > 0 (D < 0, mindig igaz). 2. ág: x² - 2x - 3 < 0.',
        explanation: '1. ág: x² - 2x > -3 ⟹ x² - 2x + 3 > 0. Ennek D = 4 - 12 = -8 < 0, így minden valós számra igaz (ℝ). 2. ág: x² - 2x - 3 < 0 ⟹ (x - 3)(x + 1) < 0 ⟹ x ∈ ]-1; 3[. Metszet: x ∈ ]-1; 3[.'
      },
      {
        id: 'ipq3-8',
        level: 3,
        question: 'Mi a megoldása az alábbi rendszernek: { x² + 1 > 0 ÉS x² - 16 ≤ 0 }?',
        options: [
          'x ∈ [-4; 4]',
          'x ∈ ]-4; 4[',
          'M = ℝ',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Az x² + 1 > 0 minden valós számra teljesül (M₁ = ℝ). Mi az x² ≤ 16 megoldása?',
        explanation: 'Az 1. feltétel minden valós számra igaz: I₁ = ℝ. A 2. feltétel: x² - 16 ≤ 0 ⟹ I₂ = [-4; 4]. A metszet: ℝ ∩ [-4; 4] = [-4; 4].'
      },
      {
        id: 'ipq3-9',
        level: 3,
        question: 'Mi a megoldása az 1 / (x - 2) ≥ 1 / 4 egyenlőtlenségnek?',
        options: [
          'x ∈ ]2; 6]',
          'x ∈ [2; 6]',
          'x ∈ ]-∞; 2[ ∪ [6; ∞[',
          'x ≤ 6'
        ],
        correctAnswer: 0,
        hint: '1/(x - 2) - 1/4 ≥ 0 ⟹ [4 - (x - 2)] / [4(x - 2)] ≥ 0 ⟹ (6 - x) / [4(x - 2)] ≥ 0.',
        explanation: 'Nullára rendezve: (6 - x) / (4(x - 2)) ≥ 0. A gyökök x = 2 (nevező, nyílt) és x = 6 (számláló, zárt). A kettő között a tört pozitív, így x ∈ ]2; 6].'
      },
      {
        id: 'ipq3-10',
        level: 3,
        question: 'Mely valós x értékekre teljesül az |x - 2| + |x - 5| = 3 egyenlet a számegyenesen?',
        options: [
          'Bármely x ∈ [2; 5] számra (a 2 és 5 közötti zárt szakasz minden pontjára).',
          'Kizárólag az x = 2 és x = 5 pontokban.',
          'Csak az x = 3,5 felezőpontban.',
          'Nincs ilyen valós szám.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a szakasz pontjaira: a 2-től és az 5-től vett távolságok összege a szakasz bármely belső pontjára pontosan a szakasz hossza (5 - 2 = 3)!',
        explanation: 'Geometriailag |x - 2| + |x - 5| az x pont távolságainak összege a 2-től és az 5-től. A 2 és 5 közötti szakasz hosszúsága 3. Bármely x ∈ [2; 5] pont esetén a két távolság összege pontosan 3 egység!'
      }
    ]
  }
};

export const InequalitiesPracticeQuiz: React.FC<InequalitiesPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-gyakorlas-egyenlotlensegek-quiz"
      topicTitle="Törtes és abszolútértékes egyenlőtlenségek – Kvíz és Feladatok"
      themeColor="indigo"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <InequalitiesPracticeMatcher
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
        <InequalitiesPracticeSorter
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

