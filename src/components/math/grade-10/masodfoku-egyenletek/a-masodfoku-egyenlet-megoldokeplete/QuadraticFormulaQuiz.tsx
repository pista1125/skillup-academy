import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticFormulaMatcher } from './QuadraticFormulaMatcher';
import { QuadraticFormulaSorter } from './QuadraticFormulaSorter';
import {
  FormulaAnatomySvg,
  DerivationStepsTreeSvg,
  DiscriminantCasesComparisonSvg,
  FormulaStepByStepMethodSvg
} from './QuadraticFormulaFigures';

interface QuadraticFormulaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A másodfokú egyenlet megoldóképlete',
    description: 'x₁,₂ = (-b ± √(b² - 4ac)) / (2a). A számláló elején a -b a lineáris tag ellentettje, a nevezőben kötelező a 2a!',
    note: 'Kanonikus alak: az egyenletet a képlet alkalmazása előtt mindig 0-ra kell rendezni (ax² + bx + c = 0)!',
    color: 'from-rose-500 to-red-600',
    figure: <FormulaAnatomySvg size={220} />
  },
  {
    title: 'A képlet levezetése (4a trükk)',
    description: 'ax² + bx + c = 0 beszorozva 4a-val: 4a²x² + 4abx + 4ac = 0. Teljes négyzetként: (2ax + b)² = b² - 4ac. Gyökvonás után adódik a megoldóképlet.',
    note: 'A 4a-val való szorzás zseniálisan kiküszöböli a törtes számolást a levezetés során!',
    color: 'from-indigo-500 to-purple-600',
    figure: <DerivationStepsTreeSvg size={220} />
  },
  {
    title: 'A diszkrimináns (D = b² - 4ac)',
    description: 'Ha D > 0: 2 különböző valós gyök. Ha D = 0: 1 valós gyök (kettős gyök: x = -b/2a). Ha D < 0: nincs valós gyök (x ∈ ∅).',
    note: 'Geometria: D > 0 metsző parabola, D = 0 érintő parabola, D < 0 tengelyt elkerülő parabola.',
    color: 'from-blue-500 to-cyan-600',
    figure: <DiscriminantCasesComparisonSvg size={220} />
  },
  {
    title: 'A megoldás 4 aranyszabálya',
    description: '1. Nullára rendezés ⟶ 2. Együtthatók azonosítása előjellel ⟶ 3. Diszkrimináns (D = b² - 4ac) ⟶ 4. A két ág (±) kiszámítása.',
    note: 'Vigyázat: a (-b)² mindig pozitív! Ne hagyd el a zárójelet a számológépben!',
    color: 'from-amber-500 to-orange-600',
    figure: <FormulaStepByStepMethodSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Képlet ismerete és együtthatók azonosítása',
    subtitle: 'A megoldóképlet felépítése, együtthatók kigyűjtése előjelekkel és a 0-ra rendezés.',
    range: '1–10. feladat',
    focus: 'Képlet szerkezete és együtthatók azonosítása',
    questions: [
      {
        id: 'qfq1-1',
        questionTypeBadge: 'Képlet ismerete',
        question: 'Mi a másodfokú egyenlet általános megoldóképlete az ax² + bx + c = 0 (a ≠ 0) egyenletre?',
        options: [
          'x₁,₂ = (-b ± √(b² - 4ac)) / (2a)',
          'x₁,₂ = (b ± √(b² - 4ac)) / (2a)',
          'x₁,₂ = (-b ± √(b² + 4ac)) / a',
          'x₁,₂ = (-b ± √(b² - 2ac)) / (2a)'
        ],
        correctAnswer: 0,
        explanation: 'A másodfokú egyenlet kanonikus alakjának univerzális megoldóképlete: x₁,₂ = (-b ± √(b² - 4ac)) / (2a). A számláló elején a -b áll, a gyök alatt a diszkrimináns (b² - 4ac), a nevezőben pedig a 2a.'
      },
      {
        id: 'qfq1-2',
        questionTypeBadge: 'Nevező',
        question: 'Mi áll a másodfokú egyenlet megoldóképletének nevezőjében?',
        options: [
          'Mindig 2a, azaz a főegyüttható 2-szerese',
          'Csak a főegyüttható (a)',
          '2b',
          'Mindig 2, függetlenül az egyenlettől'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképlet nevezője kötelezően 2 · a. Gyakori hiba, hogy a diákok elfelejtik beszorozni 2-vel az a-t, vagy ha a = 1, csak 1-gyel osztanak.'
      },
      {
        id: 'qfq1-3',
        questionTypeBadge: 'Feltétel',
        question: 'Miért kötelező feltétel a megoldóképlet alkalmazásakor, hogy a ≠ 0 legyen?',
        options: [
          'Mert a nevezőben 2a áll, és nullával való osztás értelmetlen; továbbá a = 0 esetén az egyenlet nem másodfokú, hanem elsőfokú lenne',
          'Mert nullának nincs négyzete',
          'Mert ekkor a diszkrimináns mindig negatív lenne',
          'Mert a másodfokú egyenletnek kötelezően 2 gyöke kell legyen'
        ],
        correctAnswer: 0,
        explanation: 'Ha a = 0 lenne, a nevezőben 2 · 0 = 0 állna, amivel a matematikában nem oszthatunk. Emellett 0 · x² = 0, így az egyenlet lineáris (bx + c = 0) lenne, amire nincs szükség másodfokú képletre.'
      },
      {
        id: 'qfq1-4',
        questionTypeBadge: 'Együtthatók',
        question: 'Mik az együtthatók pontos értékei az x² - 7x + 12 = 0 egyenletben?',
        options: [
          'a = 1, b = -7, c = 12',
          'a = 0, b = 7, c = 12',
          'a = 1, b = 7, c = 12',
          'a = 1, b = -7, c = -12'
        ],
        correctAnswer: 0,
        explanation: 'Az x² előtt a láthatatlan szorzó 1 (a = 1). Az x előtt a -7 áll (b = -7, az előjelet mindig visszük!), a szabad tag pedig +12 (c = 12).'
      },
      {
        id: 'qfq1-5',
        questionTypeBadge: '0-ra rendezés',
        question: 'Hogyan állapítjuk meg helyesen az együtthatókat a 2x² + 5x = 3 egyenletnél?',
        options: [
          'Előbb kivonunk 3-at mindkét oldalból: 2x² + 5x - 3 = 0, így a = 2, b = 5, c = -3',
          'Azonnal felírjuk: a = 2, b = 5, c = 3',
          'Mindkét oldalt osztjuk 3-mal',
          'A c értéke 0, mert a bal oldalon nincs konstans'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképlet kizárólag nullára rendezett (kanonikus) alakra érvényes! A 3-at át kell vinni a bal oldalra: 2x² + 5x - 3 = 0, így a konstans c = -3 lesz.'
      },
      {
        id: 'qfq1-6',
        questionTypeBadge: 'Előjel-szabály',
        question: 'Mit írunk a számláló elejére (-b), ha az egyenletben b = -8?',
        options: [
          '+8, mert -(-8) = +8',
          '-8',
          '±8',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'A képletben -b áll, ami a b együttható ellentettjét jelenti. Ha b negatív (-8), akkor -(-8) = +8 lesz a számláló elején.'
      },
      {
        id: 'qfq1-7',
        questionTypeBadge: 'Negatív főegyüttható',
        question: 'Mik az együtthatók a -x² + 4x - 5 = 0 egyenletben?',
        options: [
          'a = -1, b = 4, c = -5',
          'a = 1, b = 4, c = -5',
          'a = -1, b = -4, c = 5',
          'a = 0, b = 4, c = -5'
        ],
        correctAnswer: 0,
        explanation: 'A -x² szorzója a = -1. A lineáris tag együtthatója b = +4, a konstans tag pedig c = -5.'
      },
      {
        id: 'qfq1-8',
        questionTypeBadge: 'Tagok sorrendje',
        question: 'Melyek az együtthatók a 3x - x² + 10 = 0 egyenletben?',
        options: [
          'a = -1, b = 3, c = 10 (fokszám szerint átrendezve: -x² + 3x + 10 = 0)',
          'a = 3, b = -1, c = 10',
          'a = 1, b = 3, c = 10',
          'a = 10, b = 3, c = -1'
        ],
        correctAnswer: 0,
        explanation: 'Az együtthatók nem az írási sorrend, hanem az x kitevője szerint határozandók meg! Az x² szorzója az a = -1, az elsőfokú x szorzója a b = 3, a konstans a c = 10.'
      },
      {
        id: 'qfq1-9',
        questionTypeBadge: 'A ± jelentése',
        question: 'Mit fejez ki a ± szimbólum a megoldóképletben?',
        options: [
          'A két lehetséges megoldási ágat: az egyik gyöknél hozzáadjuk, a másiknál kivonjuk a diszkrimináns gyökét',
          'Azt, hogy a végeredmény lehet pozitív vagy negatív hiba',
          'Hogy a gyököt kerekíteni kell',
          'Hogy a törtvonal mindkét oldalán el kell végezni a műveletet'
        ],
        correctAnswer: 0,
        explanation: 'A ± jel tömör jelölés a két megoldásra: x₁ = (-b + √D) / 2a és x₂ = (-b - √D) / 2a. A két gyök szimmetrikusan helyezkedik el a parabola tengelye (-b/2a) körül.'
      },
      {
        id: 'qfq1-10',
        questionTypeBadge: 'Hiányos eset',
        question: 'Ha egy másodfokú egyenletből hiányzik az elsőfokú tag (b = 0, pl. x² - 9 = 0), mennyi a -b a képletben?',
        options: [
          '0, így a számláló egyszerűen ±√D alakú lesz',
          '1',
          '-1',
          'Nem alkalmazható a képlet'
        ],
        correctAnswer: 0,
        explanation: 'Ha b = 0, a megoldóképlet továbbra is tökéletesen működik: -b = 0, így x = (0 ± √(-4ac)) / 2a = ±√(-4ac) / 2a.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: A diszkrimináns (D) és a levezetés',
    subtitle: 'A diszkrimináns képlete, a gyökök számának meghatározása és a levezetés logikája.',
    range: '11–20. feladat',
    focus: 'Diszkrimináns számítás, gyökök száma és levezetés',
    questions: [
      {
        id: 'qfq2-1',
        questionTypeBadge: 'Diszkrimináns képlete',
        question: 'Mi a diszkrimináns (D) pontos algebrai képlete?',
        options: [
          'D = b² - 4ac',
          'D = b² + 4ac',
          'D = 2b - 4ac',
          'D = b² - 2ac'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképlet gyök alatti része a diszkrimináns: D = b² - 4ac. Ez a kifejezés dönti el a valós gyökök számát és természetét.'
      },
      {
        id: 'qfq2-2',
        questionTypeBadge: 'D számolás',
        question: 'Mennyi a diszkrimináns értéke az x² - 6x + 8 = 0 egyenletnél?',
        options: [
          'D = 4',
          'D = 68',
          'D = -4',
          'D = 16'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = -6, c = 8. D = b² - 4ac = (-6)² - 4 · 1 · 8 = 36 - 32 = 4.'
      },
      {
        id: 'qfq2-3',
        questionTypeBadge: 'Gyökök száma',
        question: 'Hány valós gyöke van egy másodfokú egyenletnek, ha a diszkriminánsa D = 0?',
        options: [
          'Pontosan 1 valós gyöke (kettős gyöke) van',
          '2 különböző valós gyöke van',
          '0 valós gyöke van',
          'Végtelen sok valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'Ha D = 0, akkor √D = √0 = 0. A ±0 nem hoz létre két külön ágat, így az egyenletnek egyetlen valós gyöke van: x = -b / (2a).'
      },
      {
        id: 'qfq2-4',
        questionTypeBadge: 'Gyökök száma',
        question: 'Hány valós megoldása van a másodfokú egyenletnek, ha D < 0?',
        options: [
          '0 valós gyöke van (a valós számok körében x ∈ ∅)',
          '1 negatív gyöke van',
          '2 képzetes gyöke helyett 2 valós gyöke',
          '1 valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'A valós számok körében negatív számnak nem létezik négyzetgyöke (egy valós szám négyzete sem lehet negatív). Ezért ha D < 0, az egyenletnek nincs valós gyöke.'
      },
      {
        id: 'qfq2-5',
        questionTypeBadge: 'Levezetés',
        question: 'A megoldóképlet levezetésénél miért szorozzuk meg az ax² + bx + c = 0 egyenletet 4a-val?',
        options: [
          'Mert (2ax)² = 4a²x² miatt az első tag azonnal teljes négyzet lesz, és kényelmetlen törtek nélkül végezhető el a négyzetkiegészítés',
          'Mert a 4 a legkisebb összetett szám',
          'Mert csak így lehet nullát kapni a jobb oldalon',
          'Mert az a kötelezően páros szám kell legyen'
        ],
        correctAnswer: 0,
        explanation: 'A 4a-val való beszorzás zseniális trükkje: 4a²x² + 4abx = (2ax + b)² - b². Így az egész négyzetkiegészítés egész együtthatókkal, törtek bevezetése nélkül elvégezhető!'
      },
      {
        id: 'qfq2-6',
        questionTypeBadge: 'D számolás negatív c-vel',
        question: 'Mennyi a 2x² - 3x - 2 = 0 egyenlet diszkriminánsa?',
        options: [
          'D = 25 (mert 9 - 4 · 2 · (-2) = 9 + 16 = 25)',
          'D = -7 (mert 9 - 16 = -7)',
          'D = 9',
          'D = 1'
        ],
        correctAnswer: 0,
        explanation: 'a = 2, b = -3, c = -2. D = (-3)² - 4 · 2 · (-2) = 9 - (-16) = 9 + 16 = 25. A két mínusz jel szorzata pluszt ad!'
      },
      {
        id: 'qfq2-7',
        questionTypeBadge: 'Gyökök természete',
        question: 'Ha egy másodfokú egyenlet diszkriminánsa D = 49, milyen típusúak lesznek a gyökök?',
        options: [
          'Két különböző racionális (egész vagy tört) szám lesz, mert 49 négyzetszám (√49 = 7)',
          'Két irracionális szám',
          'Egyetlen kettős gyök',
          'Nem lesznek valós gyökök'
        ],
        correctAnswer: 0,
        explanation: 'Mivel D = 49 pozitív négyzetszám, √49 = 7 pontos egész érték. Így a gyökök kiszámításakor nem marad gyökjel, az eredmény racionális szám lesz.'
      },
      {
        id: 'qfq2-8',
        questionTypeBadge: 'Geometriai jelentés',
        question: 'Mit jelent a parabola grafikonjára nézve, ha a diszkrimináns D = 0?',
        options: [
          'A parabola csúcspontja éppen ráfekszik az x-tengelyre, vagyis a görbe érinti a tengelyt',
          'A parabola két pontban metszi a tengelyt',
          'A parabola nem éri el az x-tengelyt',
          'A parabola átmegy az origón'
        ],
        correctAnswer: 0,
        explanation: 'D = 0 esetén pontosan 1 zérushely van. Ez geometriailag azt jelenti, hogy a parabola nem metszi át az x-tengelyt, hanem a csúcspontjával érinti azt.'
      },
      {
        id: 'qfq2-9',
        questionTypeBadge: 'Egyetlen gyök képlete',
        question: 'Ha D = 0, mennyi a kettős gyök közvetlen képlete?',
        options: [
          'x = -b / (2a)',
          'x = b / (2a)',
          'x = -b / a',
          'x = 0'
        ],
        correctAnswer: 0,
        explanation: 'Mivel D = 0 miatt ±√0 = 0, a képlet x = (-b ± 0) / (2a) = -b / (2a) alakra egyszerűsödik. Ez megegyezik a parabola csúcspontjának x-koordinátájával!'
      },
      {
        id: 'qfq2-10',
        questionTypeBadge: 'D számolás',
        question: 'Mennyi a diszkriminánsa az x² + 2x + 5 = 0 egyenletnek?',
        options: [
          'D = -16, így az egyenletnek nincs valós gyöke',
          'D = 24, két valós gyök van',
          'D = 0, egy valós gyök van',
          'D = 16, két valós gyök van'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = 2, c = 5. D = 2² - 4 · 1 · 5 = 4 - 20 = -16. Mivel D < 0, a valós számok körében nincs megoldás.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Teljes egyenletmegoldás és csapdák elkerülése',
    subtitle: 'Gyökök pontos kiszámítása, irracionális alakok és a leggyakoribb hibák kivédése.',
    range: '21–30. feladat',
    focus: 'Gyökszámítás, egyszerűsítés és tipikus hibák',
    questions: [
      {
        id: 'qfq3-1',
        questionTypeBadge: 'Teljes megoldás',
        question: 'Mik a gyökei az x² - 5x + 6 = 0 egyenletnek a megoldóképlettel számolva?',
        options: [
          'x₁ = 3 és x₂ = 2',
          'x₁ = -3 és x₂ = -2',
          'x₁ = 6 és x₂ = 1',
          'x₁ = 5 és x₂ = 1'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = -5, c = 6. D = (-5)² - 4·1·6 = 25 - 24 = 1. x = (5 ± √1) / 2 = (5 ± 1) / 2. Így x₁ = (5 + 1)/2 = 3 és x₂ = (5 - 1)/2 = 2.'
      },
      {
        id: 'qfq3-2',
        questionTypeBadge: 'Tört gyökök',
        question: 'Oldd meg a 2x² - 7x + 3 = 0 egyenletet!',
        options: [
          'x₁ = 3 és x₂ = 1/2',
          'x₁ = 7 és x₂ = 3',
          'x₁ = 2 és x₂ = 3/2',
          'x₁ = -3 és x₂ = -1/2'
        ],
        correctAnswer: 0,
        explanation: 'a = 2, b = -7, c = 3. D = (-7)² - 4·2·3 = 49 - 24 = 25, √25 = 5. x = (7 ± 5) / (2 · 2) = (7 ± 5) / 4. Innen x₁ = 12/4 = 3 és x₂ = 2/4 = 1/2.'
      },
      {
        id: 'qfq3-3',
        questionTypeBadge: 'Kettős gyök',
        question: 'Mi a gyöke az x² - 6x + 9 = 0 egyenletnek?',
        options: [
          'x₁ = x₂ = 3 (kettős gyök)',
          'x₁ = 9 és x₂ = 1',
          'x₁ = -3 és x₂ = 3',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: 'D = (-6)² - 4·1·9 = 36 - 36 = 0. x = -(-6) / (2·1) = 6/2 = 3. Az egyetlen megoldás x = 3.'
      },
      {
        id: 'qfq3-4',
        questionTypeBadge: 'Irracionális gyökök',
        question: 'Oldd meg az x² - 4x + 1 = 0 egyenletet a valós számok körében!',
        options: [
          'x₁,₂ = 2 ± √3',
          'x₁,₂ = 4 ± √12',
          'x₁ = 3 és x₂ = 1',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: 'D = (-4)² - 4·1·1 = 16 - 4 = 12. √12 = √(4 · 3) = 2√3. x = (4 ± 2√3) / 2 = 2 ± √3. Mindkét tagot osztani kell 2-vel!'
      },
      {
        id: 'qfq3-5',
        questionTypeBadge: 'Tipikus hiba felismerése',
        question: 'Mi a hiba a következő számításban: x² - 4x - 5 = 0 ⟹ D = -4² - 4 · 1 · (-5) = -16 + 20 = 4?',
        options: [
          'A b = -4 négyzetének felírásakor lemaradt a zárójel: (-4)² = +16, nem pedig -16!',
          'A -4 · 1 · (-5) szorzat negatív kellene legyen',
          'A diszkriminánsban 2ac kellene szerepeljen',
          'Nincs hiba a levezetésben'
        ],
        correctAnswer: 0,
        explanation: 'Ez a leggyakoribb számológépes hiba! Ha a -4-et zárójel nélkül négyzeteljük (-4²), az a műveleti sorrend miatt -(4²) = -16. Helyesen: (-4)² = (-4) · (-4) = +16, így D = 16 + 20 = 36.'
      },
      {
        id: 'qfq3-6',
        questionTypeBadge: 'Negatív a',
        question: 'Mik a gyökei a -x² + 3x + 4 = 0 egyenletnek?',
        options: [
          'x₁ = -1 és x₂ = 4',
          'x₁ = 1 és x₂ = -4',
          'x₁ = 3 és x₂ = 4',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: 'a = -1, b = 3, c = 4. D = 3² - 4·(-1)·4 = 9 + 16 = 25. x = (-3 ± 5) / [2 · (-1)] = (-3 ± 5) / (-2). x₁ = (-3 + 5)/(-2) = 2/(-2) = -1, x₂ = (-3 - 5)/(-2) = -8/(-2) = 4.'
      },
      {
        id: 'qfq3-7',
        questionTypeBadge: 'Egyszerűsítés a törtben',
        question: 'Ha egy egyenlet megoldásakor x = (6 ± √20) / 4 adódik, hogyan egyszerűsíthető helyesen a tört?',
        options: [
          '√20 = 2√5, így (6 ± 2√5) / 4 = (3 ± √5) / 2',
          '(6 ± 2√5) / 4 = (3 ± 2√5) / 2',
          '6/4 ± √20 = 1,5 ± √20',
          'Nem lehet egyszerűsíteni'
        ],
        correctAnswer: 0,
        explanation: 'A számlálóból kiemelünk 2-t: 2 · (3 ± √5) / 4. A 2-vel egyszerűsítve a számlálót és a nevezőt: (3 ± √5) / 2. Mindkét összeadandót osztani kell 2-vel!'
      },
      {
        id: 'qfq3-8',
        questionTypeBadge: 'Nem 0-ra rendezett egyenlet',
        question: 'Hogyan oldható meg az (x - 2)(x + 3) = 6 egyenlet?',
        options: [
          'Bontsuk fel a zárójeleket: x² + x - 6 = 6, vonjunk ki 6-ot: x² + x - 12 = 0, majd alkalmazzuk a képletet: x₁ = 3, x₂ = -4',
          'x - 2 = 6 vagy x + 3 = 6',
          'Azonnal a = 1, b = 1, c = -6',
          'x = 2 és x = -3'
        ],
        correctAnswer: 0,
        explanation: 'A szorzat = 0 tulajdonság CSAK akkor működik, ha a jobb oldalon 0 áll! Ha 6 áll ott, kötelező felbontani a zárójeleket (x² + x - 6 = 6), 0-ra rendezni (x² + x - 12 = 0), és csak ezután megoldani.'
      },
      {
        id: 'qfq3-9',
        questionTypeBadge: 'Normált alak képlete',
        question: 'Hogyan néz ki a megoldóképlet az x² + px + q = 0 normált alakra (a = 1)?',
        options: [
          'x₁,₂ = -p/2 ± √((p/2)² - q)',
          'x₁,₂ = -p ± √(p² - q)',
          'x₁,₂ = p/2 ± √(p² - 4q)',
          'x₁,₂ = -p/2 ± √(p² + q)'
        ],
        correctAnswer: 0,
        explanation: 'Ha a = 1, akkor a képlet: (-p ± √(p² - 4q)) / 2. A nevezőbeli 2-t bevíve a tagok alá: -p/2 ± √(p²/4 - q) = -p/2 ± √((p/2)² - q). Ez a normált másodfokú egyenlet megoldóképlete.'
      },
      {
        id: 'qfq3-10',
        questionTypeBadge: 'Teljesség',
        question: 'Miért hibás, ha valaki egy D > 0 diszkriminánsú egyenletnél csak az x₁-et számolja ki?',
        options: [
          'Mert D > 0 esetén pontosan két különböző valós gyök létezik, mindkettő kielégíti az egyenletet, így az x₂ elhagyása hiányos megoldás',
          'Mert a negatív gyök mindig fontosabb',
          'Mert a másodfokú egyenletnek kötelezően 3 gyöke kell legyen',
          'Mert a képlet csak az x₂-t adja meg pontosan'
        ],
        correctAnswer: 0,
        explanation: 'A másodfokú algebra alaptétele és a parabola geometriája szerint D > 0 esetén két független gyök létezik. Mindkét érték megoldása az egyenletnek, a megoldáshalmaz elhagyása pontlevonással jár.'
      }
    ]
  }
};

export const QuadraticFormulaQuiz: React.FC<QuadraticFormulaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="a-masodfoku-egyenlet-megoldokeplete"
      topicTitle="A másodfokú egyenlet megoldóképlete"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      renderMatcher={(level, onNext, onRules, onB) => (
        <QuadraticFormulaMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules, onB) => (
        <QuadraticFormulaSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

export default QuadraticFormulaQuiz;

