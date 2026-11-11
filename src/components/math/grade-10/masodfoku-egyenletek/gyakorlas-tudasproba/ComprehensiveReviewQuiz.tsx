import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ComprehensiveReviewMatcher } from './ComprehensiveReviewMatcher';
import { ComprehensiveReviewSorter } from './ComprehensiveReviewSorter';
import {
  ChapterRoadmapSvg,
  EquationTaxonomySvg,
  ComprehensiveDiscriminantSvg,
  MasterProblemSolvingPipelineSvg
} from './ComprehensiveReviewFigures';

interface ComprehensiveReviewQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A fejezet átfogó térképe',
    description: '1. Hiányos egyenletek (kiemelés, gyökvonás) ⟶ 2. Teljes négyzetté kiegészítés ⟶ 3. Megoldóképlet és Diszkrimináns ⟶ 4. Visszavezethető egyenletek ⟶ 5. Szöveges feladatok.',
    note: 'Minden típus egyetlen közös alapra épül: az ax² + bx + c = 0 kanonikus alakra.',
    color: 'from-indigo-500 to-purple-600',
    figure: <ChapterRoadmapSvg size={220} />
  },
  {
    title: 'Megoldási döntési fa',
    description: 'c = 0 ⟹ Kiemelés x-szel (x₁=0). b = 0 ⟹ Közvetlen gyökvonás (x² = -c/a). Teljes egyenlet ⟹ Megoldóképlet D = b² - 4ac kiszámításával.',
    note: 'Hiányos egyenletnél soha ne használd a hosszadalmas megoldóképletet!',
    color: 'from-violet-500 to-pink-600',
    figure: <EquationTaxonomySvg size={220} />
  },
  {
    title: 'A diszkrimináns szentháromsága',
    description: 'D > 0: 2 különböző valós gyök (a parabola kétszer metszi az x-tengelyt). D = 0: 1 kettős gyök (érinti a tengelyt). D < 0: nincs valós gyök (lebeg a tengely felett).',
    note: 'Ha a és c különböző előjelű (ac < 0), akkor D mindig pozitív, így biztosan van 2 valós gyök.',
    color: 'from-emerald-500 to-teal-600',
    figure: <ComprehensiveDiscriminantSvg size={220} />
  },
  {
    title: 'Szöveges feladatok csővezetéke',
    description: '1. Változó & Értelmezési tartomány (x > 0) ⟶ 2. Egyenlet felírása ⟶ 3. Algebrai megoldás ⟶ 4. Ellenőrzés és hamis gyökök kizárása ⟶ 5. Szöveges válasz mértékegységgel.',
    note: 'Negatív oldalhossz, sebesség vagy személyszám fizikai képtelenség, azonnal elvetendő!',
    color: 'from-amber-500 to-orange-600',
    figure: <MasterProblemSolvingPipelineSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és hiányos egyenletek',
    subtitle: 'Másodfokú egyenletek azonosítása, hiányos típusok, azonosságok, megoldóképlet és alapvető szöveges feladatok.',
    range: '1–30. feladat',
    focus: 'Alaptípusok, kiemelés, közvetlen gyökvonás, D előjele, alapvető szöveges modellek (30 feladat a teljes fejezetből)',
    questions: [
      {
        id: "crq1-1",
        question: "Miért kötelező feltétel az ax² + bx + c = 0 kanonikus alakban, hogy a ≠ 0 legyen?",
        options: [ "Mert ha a = 0 lenne, a másodfokú tag eltűnne, és az egyenlet elsőfokúvá (lineárissá) válna", "Mert nullával nem lehet szorozni a matematikában", "Mert a negatív számnak nem létezik négyzetgyöke", "Mert különben az egyenletnek végtelen sok gyöke lenne" ],
        correctAnswer: 0,
        explanation: "Ha a = 0, akkor 0 · x² = 0, így az egyenlet bx + c = 0 alakú lesz, ami egy közönséges elsőfokú (lineáris) egyenlet. A másodfokúságot éppen a másodfokú tag jelenléte (a ≠ 0) biztosítja."
      },
      {
        id: "crq1-2",
        question: "Mik a gyökei az x² - 25 = 0 egyenletnek a valós számok halmazán?",
        options: [ "x₁ = 5 és x₂ = -5", "Csak x = 5", "x₁ = 0 és x₂ = 25", "Nincs valós gyöke" ],
        correctAnswer: 0,
        explanation: "Átrendezve: x² = 25. Mivel mind az 5² = 25, mind a (-5)² = 25, ezért két ellentett előjelű valós gyök van: x₁,₂ = ±√25 = ±5."
      },
      {
        id: "crq1-3",
        question: "Hogyan oldható meg helyesen az x² - 7x = 0 hiányos másodfokú egyenlet?",
        options: [ "x kiemelésével: x(x - 7) = 0 ⟹ x₁ = 0, x₂ = 7", "Mindkét oldalt leosztjuk x-szel: x = 7", "Átvisszük a 7x-et és gyököt vonunk: x = ±√7", "Négyzetkiegészítéssel: (x - 7)² = 0 ⟹ x = 7" ],
        correctAnswer: 0,
        explanation: "Mivel a konstans tag hiányzik (c = 0), az x kiemelhető szorzóként: x(x - 7) = 0. Egy szorzat akkor 0, ha valamelyik tényezője 0, így x₁ = 0 vagy x - 7 = 0 ⟹ x₂ = 7. x-szel osztani tilos, mert elveszítenénk az x = 0 gyököt!"
      },
      {
        id: "crq1-4",
        question: "Mit nevezünk normált másodfokú egyenletnek?",
        options: [ "Olyan x² + px + q = 0 másodfokú egyenletet, amelyben a másodfokú tag együtthatója pontosan 1", "Olyan egyenletet, amelynek két pozitív egész gyöke van", "Olyan egyenletet, amelyben nincsenek törtek vagy negatív számok", "Olyan egyenletet, amelynek a jobb oldala 1-gyel egyenlő" ],
        correctAnswer: 0,
        explanation: "Normált másodfokú egyenletnek azt az alakot nevezzük, amelyben a főegyüttható (az x² szorzója) 1, azaz a = 1. Ezt általában x² + px + q = 0 alakban írjuk fel."
      },
      {
        id: "crq1-5",
        question: "A 4x² - 16x + 12 = 0 egyenlet 4-gyel való leosztása után melyik egyenletet kapjuk?",
        options: [ "x² - 4x + 3 = 0", "x² - 16x + 12 = 0", "x² - 4x + 12 = 0", "4(x² - 4x + 3) = 4" ],
        correctAnswer: 0,
        explanation: "Az egyenlet minden egyes tagját el kell osztanunk 4-gyel: (4x²)/4 = x², (-16x)/4 = -4x, 12/4 = 3, és 0/4 = 0. Tehát az egyenlet x² - 4x + 3 = 0."
      },
      {
        id: "crq1-6",
        question: "A 2x² - 12x + 10 = 0 egyenlet 2-vel való osztása után mekkora lesz a felezendő p együttható és annak d = p/2 fele?",
        options: [ "p = -6, így d = -3", "p = -12, így d = -6", "p = 6, így d = 3", "p = -6, így d = -6" ],
        correctAnswer: 0,
        explanation: "2-vel osztva az egyenlet x² - 6x + 5 = 0. Itt az elsőfokú tag együtthatója p = -6. Ennek fele d = p/2 = -6/2 = -3."
      },
      {
        id: "crq1-7",
        question: "Mi a másodfokú egyenlet általános megoldóképlete az ax² + bx + c = 0 (a ≠ 0) egyenletre?",
        options: [ "x₁,₂ = (-b ± √(b² - 4ac)) / (2a)", "x₁,₂ = (b ± √(b² - 4ac)) / (2a)", "x₁,₂ = (-b ± √(b² + 4ac)) / a", "x₁,₂ = (-b ± √(b² - 2ac)) / (2a)" ],
        correctAnswer: 0,
        explanation: "A másodfokú egyenlet kanonikus alakjának univerzális megoldóképlete: x₁,₂ = (-b ± √(b² - 4ac)) / (2a). A számláló elején a -b áll, a gyök alatt a diszkrimináns (b² - 4ac), a nevezőben pedig a 2a."
      },
      {
        id: "crq1-8",
        question: "Hogyan állapítjuk meg helyesen az együtthatókat a 2x² + 5x = 3 egyenletnél?",
        options: [ "Előbb kivonunk 3-at mindkét oldalból: 2x² + 5x - 3 = 0, így a = 2, b = 5, c = -3", "Azonnal felírjuk: a = 2, b = 5, c = 3", "Mindkét oldalt osztjuk 3-mal", "A c értéke 0, mert a bal oldalon nincs konstans" ],
        correctAnswer: 0,
        explanation: "A megoldóképlet kizárólag nullára rendezett (kanonikus) alakra érvényes! A 3-at át kell vinni a bal oldalra: 2x² + 5x - 3 = 0, így a konstans c = -3 lesz."
      },
      {
        id: "crq1-9",
        question: "Mit írunk a számláló elejére (-b), ha az egyenletben b = -8?",
        options: [ "+8, mert -(-8) = +8", "-8", "±8", "0" ],
        correctAnswer: 0,
        explanation: "A képletben -b áll, ami a b együttható ellentettjét jelenti. Ha b negatív (-8), akkor -(-8) = +8 lesz a számláló elején."
      },
      {
        id: "crq1-10",
        question: "Mi a helyes első lépés az (x - 3)(x + 2) = 14 egyenlet megoldásakor?",
        options: [ "A zárójelek felbontása és 0-ra rendezés: x² - x - 20 = 0", "x - 3 = 14 vagy x + 2 = 14", "Azonnal a = 1, b = -3, c = 2 behelyettesítése", "Mindkét oldal osztása 14-gyel" ],
        correctAnswer: 0,
        explanation: "A szorzat-nulla tulajdonság CSAK akkor működik, ha a jobb oldalon 0 áll! Mivel itt 14 áll, fel kell bontani a zárójeleket: x² + 2x - 3x - 6 = 14 ⟹ x² - x - 6 = 14. Ebből 14-et kivonva kapjuk a 0-ra rendezett alakot: x² - x - 20 = 0."
      },
      {
        id: "crq1-11",
        question: "Mi a helyes 0-ra rendezett alakja az x(3x - 5) = 2 egyenletnek?",
        options: [ "3x² - 5x - 2 = 0", "3x² - 5x + 2 = 0", "3x² - 5x = 2", "3x - 5x - 2 = 0" ],
        correctAnswer: 0,
        explanation: "Zárójelet bontunk: 3x² - 5x = 2. Mindkét oldalból kivonunk 2-t: 3x² - 5x - 2 = 0."
      },
      {
        id: "crq1-12",
        question: "Mik a gyökei az x² - x - 20 = 0 egyenletnek?",
        options: [ "x₁ = 5 és x₂ = -4", "x₁ = -5 és x₂ = 4", "x₁ = 10 és x₂ = -2", "x₁ = 20 és x₂ = 1" ],
        correctAnswer: 0,
        explanation: "D = (-1)² - 4 · 1 · (-20) = 1 + 80 = 81. √81 = 9. x = (1 ± 9) / 2. Így x₁ = 10/2 = 5 és x₂ = -8/2 = -4."
      },
      {
        id: "crq1-13",
        question: "Mi a legelső és legfontosabb lépés bármely szöveges feladat megoldásakor?",
        options: [ "A szöveg alapos értelmezése és az ismeretlen (x) pontos kijelölése mértékegységgel", "Azonnal felírni a másodfokú megoldóképletet", "Összeszorozni az összes számot a szövegből", "Kitalálni a választ fejben próba-szerencse alapon" ],
        correctAnswer: 0,
        explanation: "A sikeres megoldás alapja az ismeretlen egyértelmű rögzítése (pl. „Legyen x a kisebbik egész szám”). Ha nincs rögzítve, mit jelent az x, a kapott számokat sem tudjuk helyesen értelmezni a végén."
      },
      {
        id: "crq1-14",
        question: "Hogyan jelölünk két egymást követő (szomszédos) egész számot algebrailag?",
        options: [ "x és x + 1", "x és 2x", "x és x + 2", "x és x²" ],
        correctAnswer: 0,
        explanation: "Az egész számok egyesével követik egymást a számegyenesen, így ha az egyik x, akkor a közvetlenül utána következő szomszédja x + 1."
      },
      {
        id: "crq1-15",
        question: "Két szomszédos pozitív egész szám szorzata 56. Melyik egyenlet írja le helyesen a feladatot?",
        options: [ "x · (x + 1) = 56 ⟹ x² + x - 56 = 0", "x + (x + 1) = 56", "x · (x + 2) = 56", "x² + 56 = 0" ],
        correctAnswer: 0,
        explanation: "A két szám x és x + 1. Szorzatuk: x(x + 1) = 56. Zárójelbontás és 0-ra rendezés után: x² + x - 56 = 0."
      },
      {
        id: "crq1-16",
        question: "Mi a diszkrimináns pontos képlete az ax² + bx + c = 0 másodfokú egyenletben?",
        options: [ "D = b² - 4ac", "D = b² + 4ac", "D = -b ± 4ac", "D = 4ac - b²" ],
        correctAnswer: 0,
        explanation: "A diszkrimináns a másodfokú megoldóképlet négyzetgyök alatti része: D = b² - 4ac."
      },
      {
        id: "crq1-17",
        question: "Mennyi a diszkrimináns értéke az x² - 6x + 8 = 0 egyenletben?",
        options: [ "D = 4", "D = -4", "D = 68", "D = 0" ],
        correctAnswer: 0,
        explanation: "a = 1, b = -6, c = 8. Ekkor D = (-6)² - 4 · 1 · 8 = 36 - 32 = 4."
      },
      {
        id: "crq1-18",
        question: "Hány valós gyöke van az egyenletnek, ha D = 0?",
        options: [ "Pontosan 1 valós gyöke van (két egybeeső / kettős gyök)", "Nincs megoldása", "2 különböző gyöke van", "Nem lehet eldönteni az a ismerete nélkül" ],
        correctAnswer: 0,
        explanation: "Ha D = 0, a megoldóképletben ±√0 = ±0, így x₁ = x₂ = -b / (2a), azaz 1 valós (kettős) gyök létezik."
      },
      {
        id: "crq1-19",
        question: "Egy téglalap egyik oldala 3 cm-rel hosszabb a másiknál. Területe 40 cm². Mekkora a rövidebb oldal?",
        options: [ "5 cm", "8 cm", "4 cm", "7 cm" ],
        correctAnswer: 0,
        explanation: "Egyenlet: x(x + 3) = 40 ⟹ x² + 3x - 40 = 0. A gyökök: x₁ = 5, x₂ = -8. Mivel oldal nem lehet negatív, a rövidebb oldal 5 cm (a hosszabb 8 cm)."
      },
      {
        id: "crq1-20",
        question: "Egy derékszögű háromszög befogói x és x + 2 cm, átfogója 10 cm. Mekkora a rövidebb befogó?",
        options: [ "6 cm", "8 cm", "5 cm", "4 cm" ],
        correctAnswer: 0,
        explanation: "Pitagorasz-tétel: x² + (x + 2)² = 10² ⟹ x² + x² + 4x + 4 = 100 ⟹ 2x² + 4x - 96 = 0 ⟹ x² + 2x - 48 = 0. Gyökök: x₁ = 6, x₂ = -8. A rövidebb befogó 6 cm."
      },
      {
        id: "crq1-21",
        question: "Egy négyzet oldalát 4 cm-rel növelve területe 56 cm²-rel nő. Mekkora volt az eredeti négyzet oldala?",
        options: [ "5 cm", "4 cm", "6 cm", "7 cm" ],
        correctAnswer: 0,
        explanation: "(x + 4)² - x² = 56 ⟹ x² + 8x + 16 - x² = 56 ⟹ 8x = 40 ⟹ x = 5 cm."
      },
      {
        id: "crq1-22",
        question: "Milyen helyettesítést alkalmazunk leggyakrabban az ax⁴ + bx² + c = 0 bikvadratikus egyenlet megoldásához?",
        options: [ "u = x²  (ahol u ≥ 0)", "u = x⁴", "u = x + 1", "u = 1 / x" ],
        correctAnswer: 0,
        explanation: "Mivel x⁴ = (x²)², az u = x² helyettesítéssel az egyenlet au² + bu + c = 0 másodfokú egyenletté válik."
      },
      {
        id: "crq1-23",
        question: "Mik a megoldásai az x³ - 16x = 0 egyenletnek?",
        options: [ "x₁ = 0, x₂ = 4, x₃ = -4", "x₁ = 4, x₂ = -4", "x = 16", "x = 0" ],
        correctAnswer: 0,
        explanation: "Kiemeléssel: x(x² - 16) = 0. Egy szorzat akkor 0, ha x = 0, vagy x² - 16 = 0 ⟹ x = ±4. A megoldáshalmaz: {-4; 0; 4}."
      },
      {
        id: "crq1-24",
        question: "Mi a helyes kikötés az 5 / (x - 3) = 2 törtes egyenletnél?",
        options: [ "x ≠ 3", "x ≠ 0", "x > 3", "x ≠ -3" ],
        correctAnswer: 0,
        explanation: "A tört nevezője nem lehet nulla: x - 3 ≠ 0 ⟹ x ≠ 3."
      },
      {
        id: "crq1-25",
        question: "Egy termék ára először 20%-kal nőtt, majd 20%-kal csökkent. Hogyan viszonyul a végső ár az eredetihez?",
        options: [ "Pontosan 4%-kal alacsonyabb lett", "Visszatért a pontos eredeti árra (0% változás)", "2%-kal magasabb lett", "4%-kal magasabb lett" ],
        correctAnswer: 0,
        explanation: "Á₂ = Á₀ · (1 + 0,2)(1 - 0,2) = Á₀ · (1 - 0,04) = 0,96 · Á₀, tehát pontosan 4%-kal lett kevesebb."
      },
      {
        id: "crq1-26",
        question: "Mi a helyes képlet egy Á₀ árú cikkre, ha egymás után kétszer növelték az árát azonos p%-kal?",
        options: [ "Á₂ = Á₀ · (1 + p/100)²", "Á₂ = Á₀ · (1 + 2p/100)", "Á₂ = Á₀ · (p/100)²", "Á₂ = Á₀ · (1 + p²/100)" ],
        correctAnswer: 0,
        explanation: "Mindkét lépésben a meglévő árat szorozzuk (1 + p/100)-zal, így Á₂ = Á₀ · (1 + p/100)²."
      },
      {
        id: "crq1-27",
        question: "100 000 Ft-ot 2 évre lekötünk kamatos kamatra. A 2. év végén 121 000 Ft van a számlán. Mekkora az éves kamatláb (p)?",
        options: [ "10%", "10,5%", "21%", "11%" ],
        correctAnswer: 0,
        explanation: "q² = 121 000 / 100 000 = 1,21 ⟹ q = √1,21 = 1,1 ⟹ p = (1,1 - 1) · 100 = 10%."
      },
      {
        id: "crq1-28",
        question: "Egy autó s utat tesz meg v sebességgel. Mennyi a menetideje?",
        options: [ "t = s / v", "t = s · v", "t = v / s", "t = s - v" ],
        correctAnswer: 0,
        explanation: "Az egyenes vonalú egyenletes mozgás alapképletéből (s = v · t) átrendezve: t = s / v."
      },
      {
        id: "crq1-29",
        question: "Hogyan kell felírni 15 perc időkülönbséget egy olyan egyenletben, ahol a sebesség km/h-ban van megadva?",
        options: [ "15 / 60 óra = 1/4 óra = 0,25 óra", "15 óra", "15 / 100 óra = 0,15 óra", "1 / 15 óra" ],
        correctAnswer: 0,
        explanation: "1 óra = 60 perc, ezért 15 perc = 15/60 = 1/4 óra = 0,25 óra."
      },
      {
        id: "crq1-30",
        question: "Egy vonat 180 km-es úton halad. 15 km/h-val nagyobb sebességgel 1 órával hamarabb ér célba. Mekkora az eredeti sebesség?",
        options: [ "45 km/h", "60 km/h", "50 km/h", "30 km/h" ],
        correctAnswer: 0,
        explanation: "180/v - 180/(v + 15) = 1 ⟹ v² + 15v - 2700 = 0 ⟹ (v - 45)(v + 60) = 0 ⟹ v = 45 km/h."
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Megoldóképlet és visszavezetési technikák',
    subtitle: 'Általános egyenletek megoldása, törtes és negyedfokú (biquadratikus) egyenletek kezelése, geometriai és gazdasági modellek.',
    range: '1–30. feladat',
    focus: 'Megoldóképlet precíz alkalmazása, u = x² helyettesítés, törtes egyenletek kikötései, geometria és gazdasági szélsőérték (30 feladat a teljes fejezetből)',
    questions: [
      {
        id: "crq2-1",
        question: "Milyen számot kell hozzáadni az x² + 8x kifejezéshez, hogy teljes négyzetté alakuljon?",
        options: [ "16-ot, mert (8/2)² = 4² = 16", "8-at, mert 8 fele 4", "64-et, mert 8² = 64", "4-et, mert 8 fele 4" ],
        correctAnswer: 0,
        explanation: "Az x² + 2dx képlet szerint 2d = 8 ⟹ d = 4. A hiányzó saroktag d² = 4² = 16. Ekkor x² + 8x + 16 = (x + 4)²."
      },
      {
        id: "crq2-2",
        question: "Hogyan alakítható át helyesen az x² - 10x kifejezés teljes négyzetté?",
        options: [ "(x - 5)² - 25", "(x - 5)² + 25", "(x + 5)² - 25", "(x - 10)² - 100" ],
        correctAnswer: 0,
        explanation: "p = -10 ⟹ d = -5. (x - 5)² = x² - 10x + 25. A keletkező +25-öt kompenzálni kell, ezért LEVONJUK: (x - 5)² - 25."
      },
      {
        id: "crq2-3",
        question: "Mik a megoldásai az (x + 2)² = 9 egyenletnek?",
        options: [ "x₁ = 1 és x₂ = -5", "x₁ = 3 és x₂ = -3", "x₁ = 5 és x₂ = -1", "Csak x = 1" ],
        correctAnswer: 0,
        explanation: "Gyökvonás után: x + 2 = ±3. Ebből x₁ = -2 + 3 = 1, és x₂ = -2 - 3 = -5."
      },
      {
        id: "crq2-4",
        question: "Mennyi az x² + 3x kifejezésben a 3 fele (d = p/2), és mennyi annak négyzete?",
        options: [ "d = 3/2, négyzete pedig 9/4", "d = 1,5, négyzete pedig 3", "d = 3/2, négyzete pedig 6/4", "d = 6, négyzete pedig 36" ],
        correctAnswer: 0,
        explanation: "A p = 3 együttható fele d = 3/2. Törtet úgy négyzetelünk, hogy a számlálót és a nevezőt is négyzetre emeljük: (3/2)² = 3²/2² = 9/4."
      },
      {
        id: "crq2-5",
        question: "Mik a gyökei az (x + 1/2)² = 9/4 egyenletnek?",
        options: [ "x₁ = 1 és x₂ = -2", "x₁ = 2 és x₂ = -1", "x₁ = 3/2 és x₂ = -3/2", "x₁ = 4 és x₂ = -5" ],
        correctAnswer: 0,
        explanation: "Gyökvonással: x + 1/2 = ±√(9/4) = ±3/2. Így x₁ = -1/2 + 3/2 = 2/2 = 1, és x₂ = -1/2 - 3/2 = -4/2 = -2."
      },
      {
        id: "crq2-6",
        question: "Hogyan alakul át a 2x² + 3x - 2 = 0 egyenlet 2-vel való osztás után?",
        options: [ "x² + 3/2 x - 1 = 0", "x² + 3x - 1 = 0", "x² + 1,5x - 2 = 0", "2(x² + 3x - 2) = 0" ],
        correctAnswer: 0,
        explanation: "Minden tagot osztunk 2-vel: (2x²)/2 = x², (3x)/2 = 3/2 x, (-2)/2 = -1. Így az egyenlet: x² + 3/2 x - 1 = 0."
      },
      {
        id: "crq2-7",
        question: "Mennyi a diszkrimináns értéke az x² - 6x + 8 = 0 egyenletnél?",
        options: [ "D = 4", "D = 68", "D = -4", "D = 16" ],
        correctAnswer: 0,
        explanation: "a = 1, b = -6, c = 8. D = b² - 4ac = (-6)² - 4 · 1 · 8 = 36 - 32 = 4."
      },
      {
        id: "crq2-8",
        question: "Mennyi a 2x² - 3x - 2 = 0 egyenlet diszkriminánsa?",
        options: [ "D = 25 (mert 9 - 4 · 2 · (-2) = 9 + 16 = 25)", "D = -7 (mert 9 - 16 = -7)", "D = 9", "D = 1" ],
        correctAnswer: 0,
        explanation: "a = 2, b = -3, c = -2. D = (-3)² - 4 · 2 · (-2) = 9 - (-16) = 9 + 16 = 25. A két mínusz jel szorzata pluszt ad!"
      },
      {
        id: "crq2-9",
        question: "Ha egy másodfokú egyenlet diszkriminánsa D = 49, milyen típusúak lesznek a gyökök?",
        options: [ "Két különböző racionális (egész vagy tört) szám lesz, mert 49 négyzetszám (√49 = 7)", "Két irracionális szám", "Egyetlen kettős gyök", "Nem lesznek valós gyökök" ],
        correctAnswer: 0,
        explanation: "Mivel D = 49 pozitív négyzetszám, √49 = 7 pontos egész érték. Így a gyökök kiszámításakor nem marad gyökjel, az eredmény racionális szám lesz."
      },
      {
        id: "crq2-10",
        question: "Miért kötelező azonnal kikötést tenni a törtes másodfokú egyenleteknél?",
        options: [ "Mert a törtek nevezője soha nem lehet 0, és a beszorzáskor olyan hamis gyökök keletkezhetnek, amelyek tiltottak az eredeti egyenletben", "Mert a számológép nem tud törteket kezelni", "Mert a diszkrimináns csak kikötéssel számolható ki", "Mert a törtekkel való szorzás megváltoztatja az egyenlet fokszámát" ],
        correctAnswer: 0,
        explanation: "Nullával való osztás a matematikában nincs értelmezve. Amikor beszorzunk az ismeretlent tartalmazó nevezővel, bővítjük az alaphalmazt, így olyan gyökök is bekerülhetnek, ahol az eredeti tört nem értelmezhető (hamis gyök)."
      },
      {
        id: "crq2-11",
        question: "Mi a kikötés az (x² - 4) / (x - 2) = 0 egyenletnél?",
        options: [ "x ≠ 2 (mert a nevező x - 2 nem lehet 0)", "x ≠ -2", "x ≠ ±2", "Nincs kikötés, mert a számláló 0" ],
        correctAnswer: 0,
        explanation: "A nevezőben x - 2 szerepel, így x - 2 ≠ 0 ⟹ x ≠ 2. Ez a feladat értelmezési tartományának kötelező feltétele."
      },
      {
        id: "crq2-12",
        question: "Mik az x² - 7x + 6 = 0 egyenlet gyökei, és elfogadhatók-e a kikötés (x ≠ 0) mellett?",
        options: [ "x₁ = 6 és x₂ = 1, és mivel egyik sem 0, mindkettő valós megoldás", "x₁ = 7 és x₂ = -1", "Csak x = 6, az 1 hamis gyök", "Nincs valós gyök" ],
        correctAnswer: 0,
        explanation: "D = 49 - 24 = 25. x = (7 ± 5) / 2 ⟹ x₁ = 6, x₂ = 1. Mivel 6 ≠ 0 és 1 ≠ 0, mindkét gyök kielégíti a kikötést és az eredeti egyenletet is."
      },
      {
        id: "crq2-13",
        question: "Mit nevezünk egy 0-tól különböző x szám reciprokának?",
        options: [ "Az 1/x számot, amellyel az x-et megszorozva 1-et kapunk", "A -x ellentettet", "Az x² négyzetet", "A √x négyzetgyököt" ],
        correctAnswer: 0,
        explanation: "Egy szám reciproka az a szám, amellyel megszorozva az eredetit a szorzat 1 lesz: x · (1/x) = 1. Feltétel: x ≠ 0."
      },
      {
        id: "crq2-14",
        question: "Két szomszédos egész szám négyzetének összege 41. Melyik másodfokú egyenlet fejezi ki ezt?",
        options: [ "x² + (x + 1)² = 41 ⟹ 2x² + 2x - 40 = 0 ⟹ x² + x - 20 = 0", "(x + x + 1)² = 41", "x² + x + 1 = 41", "2x² + 1 = 41" ],
        correctAnswer: 0,
        explanation: "Az első szám négyzete x², a szomszédos négyzete (x + 1)² = x² + 2x + 1. Összegük: 2x² + 2x + 1 = 41 ⟹ 2x² + 2x - 40 = 0 ⟹ x² + x - 20 = 0."
      },
      {
        id: "crq2-15",
        question: "Mely számpárok elégítik ki, hogy két szomszédos egész szám négyzetösszege 41?",
        options: [ "A (4; 5) és a (-5; -4)", "Csak a (4; 5)", "A (3; 4) és a (5; 6)", "Nincs ilyen egész számpár" ],
        correctAnswer: 0,
        explanation: "Az x² + x - 20 = 0 gyökei x₁ = 4 és x₂ = -5. Ha x = 4, a szomszédja 5 (4² + 5² = 16 + 25 = 41). Ha x = -5, a szomszédja -4 ((-5)² + (-4)² = 25 + 16 = 41)."
      },
      {
        id: "crq2-16",
        question: "Hány pontban metszi az f(x) = x² - 4x + 3 függvény grafikonja az x-tengelyt?",
        options: [ "2 pontban (szelő)", "1 pontban (érintő)", "0 pontban (nem metszi)", "4 pontban" ],
        correctAnswer: 0,
        explanation: "D = (-4)² - 4 · 1 · 3 = 16 - 12 = 4 > 0. Mivel D > 0, a grafikon 2 különböző pontban metszi az x-tengelyt (x₁ = 1, x₂ = 3)."
      },
      {
        id: "crq2-17",
        question: "Ha egy másodfokú egyenlet diszkriminánsa D = 0, mennyi a gyök értéke az együtthatókkal kifejezve?",
        options: [ "x = -b / (2a)", "x = b / (2a)", "x = -c / a", "x = 0" ],
        correctAnswer: 0,
        explanation: "A megoldóképletből: x = (-b ± √0) / (2a) = -b / (2a)."
      },
      {
        id: "crq2-18",
        question: "Mit tudunk biztosan az ax² + bx + c = 0 egyenlet gyökeiről, ha a és c ellentétes előjelűek (a · c < 0)?",
        options: [ "Biztosan van 2 különböző valós gyöke", "Biztosan nincs valós gyöke", "Biztosan 1 kettős gyöke van", "Csak akkor van gyöke, ha b = 0" ],
        correctAnswer: 0,
        explanation: "Mivel b² ≥ 0 minden valós b-re, és ac < 0 miatt -4ac > 0, ezért D = b² + (-4ac) szigorúan pozitív (D > 0). Így mindig van 2 valós gyök!"
      },
      {
        id: "crq2-19",
        question: "Hány átlója van egy konvex nyolcszögnek?",
        options: [ "20 db", "24 db", "16 db", "28 db" ],
        correctAnswer: 0,
        explanation: "Képlet: A = n(n - 3) / 2 = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 20 db átló."
      },
      {
        id: "crq2-20",
        question: "Hány oldalú az a konvex sokszög, amelynek 35 átlója van?",
        options: [ "10 oldalú (tízszög)", "9 oldalú (kilencszög)", "12 oldalú (tizenkétszög)", "8 oldalú (nyolcszög)" ],
        correctAnswer: 0,
        explanation: "n(n - 3) / 2 = 35 ⟹ n² - 3n = 70 ⟹ n² - 3n - 70 = 0. Gyökök: n₁ = 10, n₂ = -7. A sokszög 10 oldalú."
      },
      {
        id: "crq2-21",
        question: "Egy téglalap átlója 25 cm, egyik oldala 17 cm-rel hosszabb a másiknál. Mekkorák a téglalap oldalai?",
        options: [ "7 cm és 24 cm", "8 cm és 25 cm", "15 cm és 20 cm", "9 cm és 26 cm" ],
        correctAnswer: 0,
        explanation: "x² + (x + 17)² = 25² ⟹ 2x² + 34x + 289 = 625 ⟹ 2x² + 34x - 336 = 0 ⟹ x² + 17x - 168 = 0. Gyökök: x₁ = 7, x₂ = -24. Az oldalak: 7 cm és 24 cm."
      },
      {
        id: "crq2-22",
        question: "Mi a megoldása a √(x + 5) = x - 1 egyenletnek?",
        options: [ "x = 4 (az x = -1 hamis gyök)", "x = 4 és x = -1 mindkettő jó", "x = -1", "Nincs megoldása" ],
        correctAnswer: 0,
        explanation: "Négyzetre emelve: x + 5 = (x - 1)² = x² - 2x + 1 ⟹ x² - 3x - 4 = 0 ⟹ x₁ = 4, x₂ = -1. Ellenőrzés: x = 4 ⟹ √9 = 3 (jó). x = -1 ⟹ √4 = -2 (hamis, mert 2 ≠ -2). Tehát csak x = 4 a megoldás."
      },
      {
        id: "crq2-23",
        question: "Mi a megoldása az x / (x - 2) = 2 / (x - 2) törtes egyenletnek?",
        options: [ "Nincs megoldása (M = ∅, mert x = 2 tilos)", "x = 2", "Minden valós szám megoldás", "x = 0" ],
        correctAnswer: 0,
        explanation: "Kikötés: x - 2 ≠ 0 ⟹ x ≠ 2. Beszorozva (x - 2)-vel: x = 2. Mivel a kapott gyök megegyezik a tiltott értékkel, kizárjuk, így nincs megoldás."
      },
      {
        id: "crq2-24",
        question: "Mik a megoldásai a 4x⁴ - 5x² + 1 = 0 bikvadratikus egyenletnek?",
        options: [ "x = ±1 és x = ±0,5", "x = ±1 és x = ±2", "x = 1 és x = 0,25", "x = ±1" ],
        correctAnswer: 0,
        explanation: "u = x² ⟹ 4u² - 5u + 1 = 0. D = 25 - 16 = 9. u₁,₂ = (5 ± 3) / 8 ⟹ u₁ = 1, u₂ = 0,25. Ekkor x² = 1 ⟹ x = ±1, és x² = 0,25 ⟹ x = ±0,5."
      },
      {
        id: "crq2-25",
        question: "Egy koncertre a jegyár 4000 Ft, ekkor 500 jegy kel el. Minden 200 Ft áremelés 20-szal csökkenti a nézőszámot. Mi a bevétel függvénye x Ft áremelés esetén?",
        options: [ "B(x) = (4000 + x) · (500 - 0,1x)", "B(x) = (4000 + x) · (500 - 20x)", "B(x) = (4000 + x) · (500 + 0,1x)", "B(x) = 4000 · 500 - 20x²" ],
        correctAnswer: 0,
        explanation: "Minden 200 Ft emelés -20 néző ⟹ 1 Ft emelés -0,1 néző. Így Q(x) = 500 - 0,1x, B(x) = (4000 + x)(500 - 0,1x)."
      },
      {
        id: "crq2-26",
        question: "Mekkora áremelés (x) mellett lesz maximális a fenti koncert bevétele (x_opt = -b / (2a))?",
        options: [ "500 Ft emelés mellett (4500 Ft jegyár)", "1000 Ft emelés mellett", "200 Ft emelés mellett", "Nincs maximum, a bevétel korlátlanul nő" ],
        correctAnswer: 0,
        explanation: "x_opt = -100 / (2 · (-0,1)) = 100 / 0,2 = 500 Ft. Az új optimális jegyár 4000 + 500 = 4500 Ft."
      },
      {
        id: "crq2-27",
        question: "Egy könyvesboltban a B(x) = -2x² + 80x + 6000 árbevételi függvény írja le a profitot. Milyen x értéknél lesz a profit maximális?",
        options: [ "x = 20", "x = 40", "x = 80", "x = 10" ],
        correctAnswer: 0,
        explanation: "x_v = -b / (2a) = -80 / (2 · (-2)) = -80 / (-4) = 20."
      },
      {
        id: "crq2-28",
        question: "Egy motorcsónak saját sebessége állóvízben v, a folyó sodrása v_f. Mekkora a sebessége folyásirányban (lefelé)?",
        options: [ "v + v_f", "v - v_f", "v · v_f", "√(v² + v_f²)" ],
        correctAnswer: 0,
        explanation: "Folyásirányban haladva a víz sodrása hozzáadódik a hajó saját sebességéhez: v_le = v + v_f."
      },
      {
        id: "crq2-29",
        question: "Mekkora a csónak sebessége folyással szemben (felfelé)?",
        options: [ "v - v_f  (ahol v > v_f)", "v + v_f", "v_f - v", "v / v_f" ],
        correctAnswer: 0,
        explanation: "A folyó sodrása fékezi a hajót, így v_fel = v - v_f. Haladáshoz szükséges feltétel: v > v_f."
      },
      {
        id: "crq2-30",
        question: "Egy csónak saját sebessége 20 km/h. 48 km-t tesz meg oda és vissza 5 óra alatt. Mekkora a folyó sodrása?",
        options: [ "4 km/h", "3 km/h", "5 km/h", "2 km/h" ],
        correctAnswer: 0,
        explanation: "48/(20 + v_f) + 48/(20 - v_f) = 5 ⟹ 1920 / (400 - v_f²) = 5 ⟹ 2000 - 5v_f² = 1920 ⟹ 5v_f² = 80 ⟹ v_f² = 16 ⟹ v_f = 4 km/h."
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi szintű szöveges és összetett feladatok',
    subtitle: 'Geometriai, pénzügyi, mozgásos és munkavégzéses valós életszituációk modellezése, paraméteres egyenletek.',
    range: '1–30. feladat',
    focus: 'Összetett modellek, Pitagorasz-tétel, paraméteres egyenletek, relatív sebesség, munkavégzés, hamis gyökök kizárása (30 feladat a teljes fejezetből)',
    questions: [
      {
        id: "crq3-1",
        question: "Oldd meg teljes négyzetté kiegészítéssel: x² - 6x + 5 = 0!",
        options: [ "x₁ = 5 és x₂ = 1", "x₁ = -5 és x₂ = -1", "x₁ = 6 és x₂ = -1", "x₁ = 3 és x₂ = 2" ],
        correctAnswer: 0,
        explanation: "x² - 6x = (x - 3)² - 9. Behelyettesítve: (x - 3)² - 9 + 5 = 0 ⟹ (x - 3)² = 4. Gyökvonás: x - 3 = ±2 ⟹ x₁ = 3 + 2 = 5, x₂ = 3 - 2 = 1."
      },
      {
        id: "crq3-2",
        question: "Mi mondható el az x² + 6x + 13 = 0 egyenlet megoldásairól a valós számok halmazán?",
        options: [ "Nincs valós megoldása, mert (x + 3)² = -4 adódik", "Két valós megoldása van: x₁ = -1 és x₂ = -5", "Egyetlen valós megoldása van: x = -3", "Két valós megoldása van: x = ±√13" ],
        correctAnswer: 0,
        explanation: "x² + 6x = (x + 3)² - 9. Behelyettesítve: (x + 3)² - 9 + 13 = 0 ⟹ (x + 3)² + 4 = 0 ⟹ (x + 3)² = -4. Mivel egy valós szám négyzete nem lehet negatív (-4 < 0), az egyenletnek nincs valós gyöke."
      },
      {
        id: "crq3-3",
        question: "Oldd meg: x² + 3x - 10 = 0!",
        options: [ "x₁ = 2 és x₂ = -5", "x₁ = -2 és x₂ = 5", "x₁ = 1 és x₂ = -10", "x₁ = 3 és x₂ = -10" ],
        correctAnswer: 0,
        explanation: "(x + 1,5)² - 2,25 - 10 = 0 ⟹ (x + 1,5)² = 12,25. Mivel √12,25 = 3,5, ezért x + 1,5 = ±3,5. Így x₁ = -1,5 + 3,5 = 2, és x₂ = -1,5 - 3,5 = -5."
      },
      {
        id: "crq3-4",
        question: "Mennyi az f(x) = 2(x - 3)² + 5 függvény szélsőértékének HELYE és ÉRTÉKE?",
        options: [ "Helye: x = 3, értéke: min = 5", "Helye: x = -3, értéke: min = 5", "Helye: x = 5, értéke: min = 3", "Helye: x = 3, értéke: max = 5" ],
        correctAnswer: 0,
        explanation: "A teljes négyzet akkor veszi fel minimális (0) értékét, ha x - 3 = 0, azaz a szélsőérték helye x = 3. Ekkor a függvény értéke f(3) = 2 · 0² + 5 = 5, ami a függvény minimum értéke."
      },
      {
        id: "crq3-5",
        question: "Mik a csúcspontjának koordinátái a g(x) = -(x + 4)² + 9 parabolának?",
        options: [ "C(-4; 9), és itt maximuma van a függvénynek", "C(4; 9), és itt minimuma van a függvénynek", "C(-4; -9), és itt maximuma van a függvénynek", "C(4; -9), és itt minimuma van a függvénynek" ],
        correctAnswer: 0,
        explanation: "Az a(x - u)² + v alakban az (x + 4) = (x - (-4)), tehát u = -4, v = 9. A csúcspont koordinátái: C(-4; 9). Mivel a = -1 < 0, a parabola lefelé nyílik, így a csúcspontban maximum van."
      },
      {
        id: "crq3-6",
        question: "Egy téglalap kerülete 40 cm. Hogyan válasszuk meg az oldalait, hogy a területe a lehető legnagyobb legyen?",
        options: [ "Négyzetként: mindkét oldal 10 cm legyen (a maximális terület 100 cm²)", "Egyik oldal 5 cm, másik oldal 15 cm legyen", "Egyik oldal 1 cm, másik oldal 19 cm legyen", "Bármilyen méretnél ugyanakkora a terület" ],
        correctAnswer: 0,
        explanation: "Kerület K = 2(a + b) = 40 ⟹ a + b = 20 ⟹ b = 20 - a. A terület T(a) = a(20 - a) = -a² + 20a. Teljes négyzetté alakítva: -(a - 10)² + 100. Ennek maximuma van az a = 10 helyen, értéke 100 cm² (négyzet)."
      },
      {
        id: "crq3-7",
        question: "Mik a gyökei az x² - 5x + 6 = 0 egyenletnek a megoldóképlettel számolva?",
        options: [ "x₁ = 3 és x₂ = 2", "x₁ = -3 és x₂ = -2", "x₁ = 6 és x₂ = 1", "x₁ = 5 és x₂ = 1" ],
        correctAnswer: 0,
        explanation: "a = 1, b = -5, c = 6. D = (-5)² - 4·1·6 = 25 - 24 = 1. x = (5 ± √1) / 2 = (5 ± 1) / 2. Így x₁ = (5 + 1)/2 = 3 és x₂ = (5 - 1)/2 = 2."
      },
      {
        id: "crq3-8",
        question: "Oldd meg a 2x² - 7x + 3 = 0 egyenletet!",
        options: [ "x₁ = 3 és x₂ = 1/2", "x₁ = 7 és x₂ = 3", "x₁ = 2 és x₂ = 3/2", "x₁ = -3 és x₂ = -1/2" ],
        correctAnswer: 0,
        explanation: "a = 2, b = -7, c = 3. D = (-7)² - 4·2·3 = 49 - 24 = 25, √25 = 5. x = (7 ± 5) / (2 · 2) = (7 ± 5) / 4. Innen x₁ = 12/4 = 3 és x₂ = 2/4 = 1/2."
      },
      {
        id: "crq3-9",
        question: "Oldd meg az x² - 4x + 1 = 0 egyenletet a valós számok körében!",
        options: [ "x₁,₂ = 2 ± √3", "x₁,₂ = 4 ± √12", "x₁ = 3 és x₂ = 1", "Nincs valós gyöke" ],
        correctAnswer: 0,
        explanation: "D = (-4)² - 4·1·1 = 16 - 4 = 12. √12 = √(4 · 3) = 2√3. x = (4 ± 2√3) / 2 = 2 ± √3. Mindkét tagot osztani kell 2-vel!"
      },
      {
        id: "crq3-10",
        question: "Mennyi a gyökök összege (x₁ + x₂) az x² - 8x + 12 = 0 egyenletnél a Viète-formula szerint?",
        options: [ "8, mert x₁ + x₂ = -(-8)/1 = 8", "-8", "12", "4" ],
        correctAnswer: 0,
        explanation: "A Viète-formula szerint ax² + bx + c = 0 egyenletnél a gyökök összege x₁ + x₂ = -b / a. Itt -(-8)/1 = 8. (Valóban: x₁ = 2, x₂ = 6, és 2 + 6 = 8)."
      },
      {
        id: "crq3-11",
        question: "Mennyi a gyökök szorzata (x₁ · x₂) az x² - 8x + 12 = 0 egyenletnél?",
        options: [ "12, mert x₁ · x₂ = c/a = 12/1 = 12", "-12", "8", "6" ],
        correctAnswer: 0,
        explanation: "A Viète-formula szerint a gyökök szorzata x₁ · x₂ = c / a. Itt c = 12 és a = 1, így 12/1 = 12. (Valóban: 2 · 6 = 12)."
      },
      {
        id: "crq3-12",
        question: "Melyik az a normált másodfokú egyenlet, amelynek gyökei x₁ = 3 és x₂ = -5?",
        options: [ "x² + 2x - 15 = 0", "x² - 2x - 15 = 0", "x² - 8x - 15 = 0", "x² + 2x + 15 = 0" ],
        correctAnswer: 0,
        explanation: "A gyökök összege: 3 + (-5) = -2, így -p = -2 ⟹ p = +2. A gyökök szorzata: 3 · (-5) = -15 = q. A normált egyenlet: x² + px + q = x² + 2x - 15 = 0."
      },
      {
        id: "crq3-13",
        question: "Egy 60 000 Ft-os buszt bérel egy társaság. 2 fő lemondta, emiatt fejenként 1500 Ft-tal többet fizettek. Hányan mentek el VÉGÜL?",
        options: [ "8 fő ment el (az egyenlet x = 10 eredeti létszámot adott, ebből 2 lemondta)", "10 fő ment el", "12 fő ment el", "6 fő ment el" ],
        correctAnswer: 0,
        explanation: "Az egyenlet: 60000/(x - 2) - 60000/x = 1500 ⟹ x² - 2x - 80 = 0 ⟹ x₁ = 10 (a -8 kiesik). Az x = 10 az EREDETI terv volt! Végül 10 - 2 = 8 fő utazott el."
      },
      {
        id: "crq3-14",
        question: "Egy derékszögű háromszög átfogója 10 cm, egyik befogója 2 cm-rel hosszabb a másiknál. Mennyi a rövidebb befogó?",
        options: [ "6 cm (befogók: 6 cm és 8 cm)", "4 cm", "8 cm", "5 cm" ],
        correctAnswer: 0,
        explanation: "Pitagorasz-tétel: x² + (x + 2)² = 10² ⟹ x² + x² + 4x + 4 = 100 ⟹ 2x² + 4x - 96 = 0 ⟹ x² + 2x - 48 = 0. Gyökök: 6 és -8. A rövidebb befogó 6 cm."
      },
      {
        id: "crq3-15",
        question: "Egy sakktornán minden résztvevő pontosan egyszer játszott mindenkivel. Összesen 45 partit játszottak le. Hányan vettek részt a tornán?",
        options: [ "10 résztvevő", "9 résztvevő", "15 résztvevő", "45 résztvevő" ],
        correctAnswer: 0,
        explanation: "n résztvevő esetén a mérkőzések száma n(n - 1)/2. Az egyenlet: n(n - 1)/2 = 45 ⟹ n² - n = 90 ⟹ n² - n - 90 = 0. Gyökök: 10 és -9. A létszám 10 fő."
      },
      {
        id: "crq3-16",
        question: "A p valós paraméter melyik értékére lesz az x² - 6x + p = 0 egyenletnek pontosan 1 valós gyöke?",
        options: [ "p = 9", "p = 36", "p = -9", "p = 0" ],
        correctAnswer: 0,
        explanation: "1 valós gyök akkor van, ha D = 0. D = (-6)² - 4 · 1 · p = 36 - 4p = 0 ⟹ 4p = 36 ⟹ p = 9."
      },
      {
        id: "crq3-17",
        question: "A p paraméter mely értékei esetén van az x² - 6x + p = 0 egyenletnek két különböző valós gyöke?",
        options: [ "p < 9", "p > 9", "p ≤ 9", "p = 9" ],
        correctAnswer: 0,
        explanation: "2 különböző valós gyök feltétele: D > 0. D = 36 - 4p > 0 ⟹ 36 > 4p ⟹ p < 9."
      },
      {
        id: "crq3-18",
        question: "A p mely valós értékére lesz a px² + 4x + 1 = 0 másodfokú egyenletnek kettős valós gyöke?",
        options: [ "p = 4", "p = 16", "p = 0", "p = -4" ],
        correctAnswer: 0,
        explanation: "Másodfokú egyenlethez p ≠ 0, és D = 0 kell: D = 4² - 4 · p · 1 = 16 - 4p = 0 ⟹ p = 4."
      },
      {
        id: "crq3-19",
        question: "Egy derékszögű trapéz alapjai 18 cm és 10 cm. Ferde szára 2 cm-rel hosszabb a derékszögű száránál (magasságánál). Mekkora a trapéz magassága?",
        options: [ "15 cm", "12 cm", "16 cm", "14 cm" ],
        correctAnswer: 0,
        explanation: "A magasság behúzásával egy derékszögű háromszög keletkezik, melynek egyik befogója 18 - 10 = 8 cm, másik befogója a magasság (m), átfogója m + 2. Pitagorasz: 8² + m² = (m + 2)² ⟹ 64 + m² = m² + 4m + 4 ⟹ 4m = 60 ⟹ m = 15 cm."
      },
      {
        id: "crq3-20",
        question: "Egy rombusz átlóinak különbsége 4 cm, oldala 10 cm. Mekkorák a rombusz átlói?",
        options: [ "12 cm és 16 cm", "10 cm és 14 cm", "8 cm és 12 cm", "14 cm és 18 cm" ],
        correctAnswer: 0,
        explanation: "A rombusz átlói felezik egymást és merőlegesek. Legyenek a félátlók x és x + 2. Pitagorasz: x² + (x + 2)² = 10² ⟹ 2x² + 4x + 4 = 100 ⟹ x² + 2x - 48 = 0. Gyökök: x = 6 cm. Félátlók: 6 cm és 8 cm, így az átlók: 12 cm és 16 cm."
      },
      {
        id: "crq3-21",
        question: "Egy derékszögű háromszög területe 60 cm², átfogója 17 cm. Mekkora a befogók összege (a + b)?",
        options: [ "23 cm", "21 cm", "25 cm", "24 cm" ],
        correctAnswer: 0,
        explanation: "Tudjuk: a² + b² = 17² = 289 és a · b = 120 (mivel ab/2 = 60). Figyeld meg az azonosságot: (a + b)² = a² + 2ab + b² = 289 + 2(120) = 289 + 240 = 529 = 23². Mivel a + b > 0, ezért a + b = 23 cm (a befogók 8 és 15 cm)."
      },
      {
        id: "crq3-22",
        question: "Mik a valós megoldásai az (x² - 3x)² - 2(x² - 3x) - 8 = 0 egyenletnek?",
        options: [ "x = 4, x = -1, x = 1, x = 2", "x = 4 és x = -2", "x = 3 és x = -1", "Nincs valós megoldása" ],
        correctAnswer: 0,
        explanation: "u² - 2u - 8 = 0 ⟹ u₁ = 4, u₂ = -2. 1) x² - 3x = 4 ⟹ x² - 3x - 4 = 0 ⟹ x = 4, x = -1. 2) x² - 3x = -2 ⟹ x² - 3x + 2 = 0 ⟹ x = 1, x = 2. Összesen 4 valós gyök: {-1; 1; 2; 4}."
      },
      {
        id: "crq3-23",
        question: "A p valós paraméter mely értékei esetén van az x⁴ - 6x² + p = 0 bikvadratikus egyenletnek pontosan 4 különböző valós gyöke?",
        options: [ "0 < p < 9", "p < 9", "p > 0", "p = 9" ],
        correctAnswer: 0,
        explanation: "u = x² esetén u² - 6u + p = 0. Hogy 4 különböző valós x gyök legyen, a másodfokú egyenletnek két KÜLÖNBÖZŐ ÉS POZITÍV u gyökének kell lennie: 1) D > 0 ⟹ 36 - 4p > 0 ⟹ p < 9. 2) Viète: u₁ · u₂ = p > 0 és u₁ + u₂ = 6 > 0. A kettő metszete: 0 < p < 9."
      },
      {
        id: "crq3-24",
        question: "Oldjuk meg a √(2x + 3) - √(x + 1) = 1 egyenletet!",
        options: [ "x = 3 (az x = -1 is ellenőrzendő: mindkettő jó)", "Csak x = 3", "Csak x = -1", "Nincs megoldása" ],
        correctAnswer: 0,
        explanation: "Átrendezve: √(2x + 3) = 1 + √(x + 1). Négyzetre emelve: 2x + 3 = 1 + 2√(x + 1) + x + 1 ⟹ x + 1 = 2√(x + 1). Újra négyzetre emelve: (x + 1)² = 4(x + 1) ⟹ (x + 1)(x + 1 - 4) = 0 ⟹ x₁ = -1, x₂ = 3. Behelyettesítéssel mindkettő kielégíti az eredeti egyenletet!"
      },
      {
        id: "crq3-25",
        question: "Hány diák volt az eredeti társaságban az n² - 2n - 120 = 0 egyenlet alapján?",
        options: [ "12 fő (az n = -10 gyököt elvetjük)", "10 fő", "14 fő", "8 fő" ],
        correctAnswer: 0,
        explanation: "(n - 12)(n + 10) = 0. Mivel a létszám pozitív, n = 12 fő volt eredetileg (10 fő maradt, akik fejenként 12 000 Ft-ot adtak)."
      },
      {
        id: "crq3-26",
        question: "Dániel az 1. év elején 200 000 Ft-ot, a 2. év elején 100 000 Ft-ot tett be a bankba. A 2. év végén 342 000 Ft-ja lett. Melyik a modellje q kamattényezőre?",
        options: [ "200 000 · q² + 100 000 · q = 342 000", "200 000 · q² + 100 000 · q² = 342 000", "300 000 · q² = 342 000", "200 000 · q + 100 000 · q² = 342 000" ],
        correctAnswer: 0,
        explanation: "Az 1. betét 2 évig kamatozik (q²), a 2. év eleji betét csak 1 évet kamatozik a 2. év végéig (q)."
      },
      {
        id: "crq3-27",
        question: "Egy cég árbevétele 2 egymást követő negyedévben ugyanakkora p%-kal nőtt, így 100 millióról 144 millióra emelkedett. Mennyi volt a negyedéves növekedési ütem?",
        options: [ "20%", "44%", "22%", "18%" ],
        correctAnswer: 0,
        explanation: "100 · q² = 144 ⟹ q² = 1,44 ⟹ q = 1,20 ⟹ p = 20% negyedévenként."
      },
      {
        id: "crq3-28",
        question: "Két cső együtt 6 óra alatt tölt meg egy medencét. Az első cső egyedül 5 órával hamarabb töltené fel, mint a második. Melyik a helyes egyenlet (t = 1. cső ideje)?",
        options: [ "1 / t + 1 / (t + 5) = 1 / 6", "1 / t + 1 / (t - 5) = 1 / 6", "t + (t + 5) = 6", "6 / t + 6 / (t + 5) = 0" ],
        correctAnswer: 0,
        explanation: "Az 1. cső ideje t, a lassabb 2. cső ideje t + 5. Együttes teljesítményük: 1/t + 1/(t + 5) = 1/6."
      },
      {
        id: "crq3-29",
        question: "Hány óra alatt töltené fel a medencét a két cső külön-külön az 1/t + 1/(t + 5) = 1/6 egyenletből?",
        options: [ "10 óra és 15 óra", "6 óra és 11 óra", "8 óra és 13 óra", "12 óra és 17 óra" ],
        correctAnswer: 0,
        explanation: "t² - 7t - 30 = 0 ⟹ (t - 10)(t + 3) = 0 ⟹ t = 10 óra (1. cső) és t + 5 = 15 óra (2. cső). A t = -3 elvetendő."
      },
      {
        id: "crq3-30",
        question: "Egy vonat a 300 km-es út első felét (150 km) v sebességgel tette meg, majd a második felét (v + 10) km/h sebességgel. A teljes menetidő 5 óra volt. Melyik az egyenlet?",
        options: [ "150 / v + 150 / (v + 10) = 5", "300 / v + 300 / (v + 10) = 5", "150 / v - 150 / (v + 10) = 5", "150v + 150(v + 10) = 5" ],
        correctAnswer: 0,
        explanation: "A két szakasz menetideje összeadódik: t₁ = 150/v és t₂ = 150/(v + 10), összegük 5 óra."
      }
    ]
  }
};

export const ComprehensiveReviewQuiz: React.FC<ComprehensiveReviewQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Gyakorlás, tudáspróba Kvíz"
      subtitle="Tedd próbára az egész fejezetben megszerzett tudásodat a szintenként 30 kérdéses témazáró kihívásban!"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TÉMAZÁRÓ PRÓBA"
      color="violet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <ComprehensiveReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ComprehensiveReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
