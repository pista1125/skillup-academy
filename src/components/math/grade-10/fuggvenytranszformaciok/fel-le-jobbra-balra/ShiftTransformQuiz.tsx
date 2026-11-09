import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ShiftTransformMatcher } from './ShiftTransformMatcher';
import { ShiftTransformSorter } from './ShiftTransformSorter';
import {
  GeneralShiftVectorSvg,
  AbsFunctionShiftSvg,
  SqrtFunctionShiftSvg,
  InsideVsOutsideComparisonSvg
} from './ShiftTransformFigures';

interface ShiftTransformQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Függőleges (külső) eltolás: f(x) ± c',
    description: 'c > 0 esetén c-vel felfelé, c < 0 esetén |c|-vel lefelé mozdul el a grafikon. Minden (x; y) pontból (x; y + c) lesz.',
    note: 'Értelmezési tartomány (Df) nem változik, az értékkészlet (Rf) határai c-vel tolódnak.',
    color: 'from-cyan-500 to-blue-600',
    figure: <InsideVsOutsideComparisonSvg size={180} />
  },
  {
    title: 'Vízszintes (belső) eltolás: f(x ∓ u)',
    description: 'Ellentétes előjel szabálya! (x - u) esetén u-val JOBBRA (+ irányba), (x + u) esetén u-val BALRA (- irányba) tolódik.',
    note: 'Értékkészlet (Rf) nem változik, az értelmezési tartomány (Df) határai tolódnak el u-val.',
    color: 'from-amber-500 to-orange-600',
    figure: <AbsFunctionShiftSvg size={180} />
  },
  {
    title: 'Vektoros eltolás: v(u; c) vektor',
    description: 'A g(x) = f(x - u) + c szabály a síkban v(u; c) eltolásvektornak felel meg. Minden pont: (x; y) ↦ (x + u; y + c).',
    note: 'Az origóbeli jellegzetes pont (csúcspont, töréspont, kezdőpont) az (u; c) pontba kerül.',
    color: 'from-purple-500 to-indigo-600',
    figure: <GeneralShiftVectorSvg size={180} />
  },
  {
    title: 'Négyzetgyök- és abszolútérték-függvények',
    description: 'f(x) = |x - u| + c töréspontja V(u; c), Rf = [c; ∞[. f(x) = √(x - u) + c kezdőpontja K(u; c), Df = [u; ∞[, Rf = [c; ∞[.',
    note: 'Ügyelj a gyökjel hosszára: √(x + 3) balra tol 3-mal, míg √x + 3 felfelé tol 3-mal!',
    color: 'from-emerald-500 to-teal-600',
    figure: <SqrtFunctionShiftSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető eltolások és irányok felismerése',
    subtitle: 'Függőleges és vízszintes elmozdulások egyedi azonosítása különböző függvényeken.',
    range: '1–10. feladat',
    focus: 'Eltolási irányok és alapszabályok',
    questions: [
      {
        id: 'stq1-1',
        questionTypeBadge: 'Függőleges eltolás',
        question: 'Milyen geometriai elmozdulással kapjuk meg az f(x) = |x| grafikonjából a g(x) = |x| - 4 függvény grafikonját?',
        options: [
          'Az y-tengely mentén lefelé 4 egységgel',
          'Az x-tengely mentén jobbra 4 egységgel',
          'Az x-tengely mentén balra 4 egységgel',
          'Az y-tengely mentén felfelé 4 egységgel'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a -4 konstans az abszolútértéken kívül helyezkedik el (f(x) - 4), ez az y-tengely mentén történő lefelé tolás 4 egységgel.'
      },
      {
        id: 'stq1-2',
        questionTypeBadge: 'Vízszintes eltolás',
        question: 'Hogyan tolódik el az f(x) = |x| függvény grafikonja, ha a g(x) = |x + 5| függvényt vizsgáljuk?',
        options: [
          'Az x-tengely mentén balra (negatív irányba) 5 egységgel',
          'Az x-tengely mentén jobbra (pozitív irányba) 5 egységgel',
          'Az y-tengely mentén felfelé 5 egységgel',
          'Az y-tengely mentén lefelé 5 egységgel'
        ],
        correctAnswer: 0,
        explanation: 'Az ellentétes előjel szabálya miatt az |x + 5| kifejezés x = -5 esetén éri el a 0-t, így a grafikon balra tolódik 5 egységgel.'
      },
      {
        id: 'stq1-3',
        questionTypeBadge: 'Gyökfüggvény',
        question: 'Milyen transzformációval kapjuk az f(x) = √x grafikonjából a h(x) = √(x - 3) függvény grafikonját?',
        options: [
          'Eltolás az x-tengely mentén jobbra 3 egységgel',
          'Eltolás az y-tengely mentén lefelé 3 egységgel',
          'Eltolás az x-tengely mentén balra 3 egységgel',
          'Eltolás az y-tengely mentén felfelé 3 egységgel'
        ],
        correctAnswer: 0,
        explanation: 'A -3 a gyökjel alatt, a változó mellett van: √(x - 3). Ez vízszintes eltolás jobbra (+3 egységgel).'
      },
      {
        id: 'stq1-4',
        questionTypeBadge: 'Kitüntetett pont',
        question: 'Hol található a g(x) = |x - 7| függvény töréspontja a koordináta-rendszerben?',
        options: [
          'V(7; 0)',
          'V(-7; 0)',
          'V(0; 7)',
          'V(0; -7)'
        ],
        correctAnswer: 0,
        explanation: 'Az alapfüggvény (|x|) töréspontja az origó (0; 0). A jobbra tolás 7 egységgel a pontot a (7; 0) helyre viszi.'
      },
      {
        id: 'stq1-5',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = |x| + 3 függvénynek, ha Df = ℝ?',
        options: [
          'Rf = [3; ∞[',
          'Rf = [-3; ∞[',
          'Rf = [0; ∞[',
          'Rf = ℝ'
        ],
        correctAnswer: 0,
        explanation: 'Mivel |x| ≥ 0 minden valós számra, ezért |x| + 3 ≥ 0 + 3 = 3. A legkisebb érték 3, így Rf = [3; ∞[.'
      },
      {
        id: 'stq1-6',
        questionTypeBadge: 'Értelmezési tartomány',
        question: 'Mi a legbővebb értelmezési tartománya a g(x) = √(x - 5) valós függvénynek?',
        options: [
          'Dg = [5; ∞[',
          'Dg = [-5; ∞[',
          'Dg = ]5; ∞[',
          'Dg = ℝ'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetgyök alatt nemnegatív számnak kell állnia: x - 5 ≥ 0 ⟹ x ≥ 5. Ezért Dg = [5; ∞[.'
      },
      {
        id: 'stq1-7',
        questionTypeBadge: 'Törtfüggvény',
        question: 'Hová kerül az f(x) = 1/x reciprok függvény függőleges aszimptotája a g(x) = 1/(x + 2) transzformáció után?',
        options: [
          'Az x = -2 egyenesre (2-vel balra tolódik)',
          'Az x = 2 egyenesre (2-vel jobbra tolódik)',
          'Az y = 2 egyenesre (felfelé tolódik)',
          'Változatlanul az x = 0 egyenes marad'
        ],
        correctAnswer: 0,
        explanation: 'A nevező nem lehet nulla: x + 2 ≠ 0 ⟹ x ≠ -2. Az aszimptota az x = 0 függőleges egyenesből az x = -2 egyenesbe tolódik balra.'
      },
      {
        id: 'stq1-8',
        questionTypeBadge: 'Kívül vs. Belül',
        question: 'Melyik függvény grafikonja tolódik FELFELÉ 6 egységgel?',
        options: [
          'f(x) = √x + 6',
          'f(x) = √(x + 6)',
          'f(x) = √(x - 6)',
          'f(x) = √x - 6'
        ],
        correctAnswer: 0,
        explanation: 'Felfelé tolás akkor történik, ha a konstans a gyökjelen kívül, pozitív előjellel szerepel: √x + 6.'
      },
      {
        id: 'stq1-9',
        questionTypeBadge: 'Zérushely',
        question: 'Mi a zérushelye az f(x) = |x| - 5 függvénynek a valós számok halmazán?',
        options: [
          'Két zérushelye van: x₁ = -5 és x₂ = 5',
          'Egyetlen zérushelye van: x = 5',
          'Egyetlen zérushelye van: x = -5',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        explanation: '|x| - 5 = 0 ⟹ |x| = 5, amelynek megoldásai: x = 5 és x = -5.'
      },
      {
        id: 'stq1-10',
        questionTypeBadge: 'Helyettesítési érték',
        question: 'Mennyi a g(x) = √(x + 7) függvény helyettesítési értéke x = 2 esetén?',
        options: [
          '3',
          '9',
          '√7 + 2',
          '5'
        ],
        correctAnswer: 0,
        explanation: 'g(2) = √(2 + 7) = √9 = 3.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Együttes eltolások és eltolásvektorok',
    subtitle: 'Vektoros leírás, együttes vízszintes és függőleges mozgások, kitüntetett pontok elemzése.',
    range: '11–20. feladat',
    focus: 'Vektorok, kitüntetett pontok és intervallumok',
    questions: [
      {
        id: 'stq2-1',
        questionTypeBadge: 'Eltolásvektor',
        question: 'Melyik vektorral kell eltolni az f(x) = |x| grafikonját, hogy a g(x) = |x - 4| + 3 függvény grafikonját kapjuk?',
        options: [
          'v(4; 3) vektorral',
          'v(-4; 3) vektorral',
          'v(4; -3) vektorral',
          'v(-4; -3) vektorral'
        ],
        correctAnswer: 0,
        explanation: 'A hozzárendelési szabály f(x - u) + c alakú, ahol u = 4 (jobbra) és c = 3 (fel). Ez a v(4; 3) eltolásvektor.'
      },
      {
        id: 'stq2-2',
        questionTypeBadge: 'Gyökfüggvény kezdőpont',
        question: 'Mi a kezdőpontja a h(x) = √(x + 6) - 2 függvény grafikonjának?',
        options: [
          'K(-6; -2)',
          'K(6; -2)',
          'K(-6; 2)',
          'K(6; 2)'
        ],
        correctAnswer: 0,
        explanation: 'Az alapfüggvény (√x) kezdőpontja (0; 0). A transzformáció: 6 egységgel balra és 2 egységgel lefelé, így K(-6; -2).'
      },
      {
        id: 'stq2-3',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = (x + 3)² - 7 másodfokú függvénynek?',
        options: [
          'Rf = [-7; ∞[',
          'Rf = [7; ∞[',
          'Rf = [-3; ∞[',
          'Rf = ℝ'
        ],
        correctAnswer: 0,
        explanation: 'A parabola felfelé nyílik, csúcspontja T(-3; -7). A felvett legkisebb függvényérték -7, innen felfelé minden értéket felvesz: Rf = [-7; ∞[.'
      },
      {
        id: 'stq2-4',
        questionTypeBadge: 'Transzformáció visszafejtése',
        question: 'Egy parabola tengelypontja T(-4; 5). Felfelé nyíló normálparabola esetén mi a függvény hozzárendelési szabálya?',
        options: [
          'f(x) = (x + 4)² + 5',
          'f(x) = (x - 4)² + 5',
          'f(x) = (x + 4)² - 5',
          'f(x) = (x - 4)² - 5'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont T(u; c) = (-4; 5), tehát u = -4 és c = 5. A képlet: (x - (-4))² + 5 = (x + 4)² + 5.'
      },
      {
        id: 'stq2-5',
        questionTypeBadge: 'Pontáthelyezés',
        question: 'Az f(x) = |x| tartalmazza a P(3; 3) pontot. Melyik pontba kerül ez a pont a g(x) = |x + 2| - 4 függvény grafikonján?',
        options: [
          'P\'(1; -1)',
          'P\'(5; -1)',
          'P\'(1; 7)',
          'P\'(5; 7)'
        ],
        correctAnswer: 0,
        explanation: 'Az eltolásvektor v(-2; -4). A pont új koordinátái: x\' = 3 + (-2) = 1, y\' = 3 + (-4) = -1. Tehát P\'(1; -1). Ellenőrzés: g(1) = |1 + 2| - 4 = 3 - 4 = -1.'
      },
      {
        id: 'stq2-6',
        questionTypeBadge: 'Tartományok',
        question: 'Határozd meg a g(x) = √(x - 1) + 4 függvény értelmezési tartományát és értékkészletét!',
        options: [
          'Dg = [1; ∞[ és Rg = [4; ∞[',
          'Dg = [-1; ∞[ és Rg = [4; ∞[',
          'Dg = [1; ∞[ és Rg = [-4; ∞[',
          'Dg = ℝ és Rg = [4; ∞['
        ],
        correctAnswer: 0,
        explanation: 'A gyök alatt x - 1 ≥ 0 ⟹ x ≥ 1, így Dg = [1; ∞[. A gyök nemnegatív (≥ 0), hozzáadva 4-et a minimum 4 lesz, így Rg = [4; ∞[.'
      },
      {
        id: 'stq2-7',
        questionTypeBadge: 'Törtfüggvény centrum',
        question: 'Hol metszik egymást az f(x) = 1/(x - 3) + 2 hiperbola aszimptotái?',
        options: [
          'A C(3; 2) pontban',
          'A C(-3; 2) pontban',
          'A C(3; -2) pontban',
          'A C(-3; -2) pontban'
        ],
        correctAnswer: 0,
        explanation: 'A függőleges aszimptota az x = 3 egyenes (ahol a nevező 0), a vízszintes aszimptota az y = 2 egyenes (amit nem vehet fel). Metszéspontjuk: C(3; 2).'
      },
      {
        id: 'stq2-8',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van a g(x) = |x - 2| + 3 függvénynek?',
        options: [
          '0 zérushelye van',
          '1 zérushelye van',
          '2 zérushelye van',
          'Végtelen sok zérushelye van'
        ],
        correctAnswer: 0,
        explanation: '|x - 2| ≥ 0 mindig, ezért |x - 2| + 3 ≥ 3 minden x-re. A függvény legkisebb értéke 3, soha nem éri el a 0-t, tehát nincs zérushelye.'
      },
      {
        id: 'stq2-9',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton növekvő az f(x) = (x - 5)² + 1 függvény?',
        options: [
          '[5; ∞[ intervallumon',
          ']-∞; 5] intervallumon',
          '[1; ∞[ intervallumon',
          ']-∞; 1] intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A normálparabola csúcspontja x = 5 helyen van. A csúcsponttól jobbra, azaz az [5; ∞[ intervallumon szigorúan monoton nő.'
      },
      {
        id: 'stq2-10',
        questionTypeBadge: 'Szélsőérték helye és értéke',
        question: 'Hol és milyen szélsőértéke van a h(x) = |x + 8| - 6 függvénynek?',
        options: [
          'Minimuma van az x = -8 helyen, értéke: -6',
          'Minimuma van az x = 8 helyen, értéke: -6',
          'Maximuma van az x = -8 helyen, értéke: 6',
          'Minimuma van az x = -6 helyen, értéke: -8'
        ],
        correctAnswer: 0,
        explanation: 'Az abszolútérték minimuma a töréspontban van: x + 8 = 0 ⟹ x = -8 (hely), a felvett minimális érték pedig -6.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett transzformációk, szöveges modellezés és emelt szint',
    subtitle: 'Metszéspontok, grafikonok egymásba alakítása, paraméteres feladatok és valós folyamatok.',
    range: '21–30. feladat',
    focus: 'Metszéspontok, paraméterek és modellezés',
    questions: [
      {
        id: 'stq3-1',
        questionTypeBadge: 'Transzformációk egymásutánja',
        question: 'Milyen vektorral vihető át az f(x) = (x - 2)² + 1 grafikonja a g(x) = (x + 3)² - 4 grafikonjába?',
        options: [
          'v(-5; -5) vektorral',
          'v(5; -5) vektorral',
          'v(-5; 5) vektorral',
          'v(1; -3) vektorral'
        ],
        correctAnswer: 0,
        explanation: 'Az f csúcspontja T₁(2; 1), a g csúcspontja T₂(-3; -4). Az elmozdulás: Δx = -3 - 2 = -5 (5-tel balra), Δy = -4 - 1 = -5 (5-tel lefelé). Vektor: v(-5; -5).'
      },
      {
        id: 'stq3-2',
        questionTypeBadge: 'Közös pont / Metszéspont',
        question: 'Hol metszi egymást az f(x) = |x - 2| és a g(x) = 4 - |x - 2| függvény grafikonja?',
        options: [
          'Az x = 0 és x = 4 helyeken (y = 2)',
          'Csak az x = 2 helyen (y = 0)',
          'Az x = -2 és x = 2 helyeken',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: '|x - 2| = 4 - |x - 2| ⟹ 2|x - 2| = 4 ⟹ |x - 2| = 2. Ebből x - 2 = 2 ⟹ x = 4, vagy x - 2 = -2 ⟹ x = 0. Mindkét helyen y = 2.'
      },
      {
        id: 'stq3-3',
        questionTypeBadge: 'Szöveges mozgásmodell',
        question: 'Egy autó áll a ház előtt (x = 0). Egyenletesen gyorsulva távolodik: s₁(t) = 0,5 t². A fenyőfa a háztól 50 m-re van az autó mozgási iránya mentén. Hogyan fejezhető ki az autó fenyőfától mért távolsága az idő függvényében az elindulástól a fáig?',
        options: [
          's₂(t) = |50 - 0,5 t²|',
          's₂(t) = 0,5 (t - 50)²',
          's₂(t) = 0,5 t² + 50',
          's₂(t) = 50 / (0,5 t²)'
        ],
        correctAnswer: 0,
        explanation: 'Kezdetben a távolság 50 m, majd ahogy az autó s₁(t) utat tesz meg a fa felé, a fától vett távolsága 50 - s₁(t) lesz, míg el nem éri a fát, utána pedig eltávolodik: s₂(t) = |50 - 0,5 t²|.'
      },
      {
        id: 'stq3-4',
        questionTypeBadge: 'Paraméter meghatározása',
        question: 'Az f(x) = √(x - p) + 3 függvény grafikonja átmegy a P(7; 5) ponton. Mennyi a p paraméter értéke?',
        options: [
          'p = 3',
          'p = 4',
          'p = -2',
          'p = 7'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve a pont koordinátáit: 5 = √(7 - p) + 3 ⟹ 2 = √(7 - p) ⟹ 4 = 7 - p ⟹ p = 3.'
      },
      {
        id: 'stq3-5',
        questionTypeBadge: 'Gyökfüggvény zérushelye',
        question: 'Mennyi a zérushelye az f(x) = √(x + 5) - 3 függvénynek?',
        options: [
          'x = 4',
          'x = -5',
          'x = 9',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        explanation: '√(x + 5) - 3 = 0 ⟹ √(x + 5) = 3 ⟹ x + 5 = 9 ⟹ x = 4. Ellenőrzés: √(4 + 5) - 3 = 3 - 3 = 0.'
      },
      {
        id: 'stq3-6',
        questionTypeBadge: 'Érettségi típusú feladat',
        question: 'Az f: ℝ → ℝ, f(x) = |x - 1| - 2 függvény esetén melyik állítás HAMIS?',
        options: [
          'A függvénynek nincsenek negatív értékei',
          'A függvénynek két zérushelye van: x = -1 és x = 3',
          'A függvény minimuma -2',
          'A függvény szigorúan monoton csökken a ]-∞; 1] intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A minimum értéke -2, így a függvény felvesz negatív értékeket is (értékkészlete [-2; ∞[), ezért az az állítás, hogy nincsenek negatív értékei, egyértelműen HAMIS.'
      },
      {
        id: 'stq3-7',
        questionTypeBadge: 'Transzformációk sorrendje',
        question: 'Az f(x) = x² normálparabolát eltoltuk 3 egységgel balra, majd 4 egységgel lefelé, végül tükröztük az x-tengelyre. Mi az így kapott függvény hozzárendelési szabálya?',
        options: [
          'g(x) = -(x + 3)² + 4',
          'g(x) = -(x - 3)² - 4',
          'g(x) = -(x + 3)² - 4',
          'g(x) = (x + 3)² - 4'
        ],
        correctAnswer: 0,
        explanation: '1. lépés: (x + 3)². 2. lépés: (x + 3)² - 4. 3. lépés (tükrözés az x-tengelyre: a teljes kifejezés szorzása -1-gyel): -[(x + 3)² - 4] = -(x + 3)² + 4!'
      },
      {
        id: 'stq3-8',
        questionTypeBadge: 'Szélsőérték zárt intervallumon',
        question: 'Mi a g(x) = |x - 2| + 1 függvény MAXIMUMA a [0; 5] zárt intervallumon?',
        options: [
          '4 (az x = 5 helyen)',
          '3 (az x = 0 helyen)',
          '1 (az x = 2 helyen)',
          '5 (az x = 5 helyen)'
        ],
        correctAnswer: 0,
        explanation: 'A határokon és a töréspontban vizsgáljuk: g(0) = |0 - 2| + 1 = 3; g(2) = 1 (minimum); g(5) = |5 - 2| + 1 = 4. A maximum a 4, amelyet az x = 5 helyen vesz fel.'
      },
      {
        id: 'stq3-9',
        questionTypeBadge: 'Két függvény távolsága',
        question: 'Tekintsük az f(x) = (x - 1)² + 5 és a g(x) = (x - 1)² - 2 függvényeket. Mekkora a két grafikon függőleges távolsága egy tetszőleges x helyen?',
        options: [
          'Pontosan 7 egység minden x esetén',
          'x-től függően változó',
          '3 egység',
          '10 egység'
        ],
        correctAnswer: 0,
        explanation: 'f(x) - g(x) = [(x - 1)² + 5] - [(x - 1)² - 2] = 5 - (-2) = 7. Mivel az eltolt parabolák egybevágóak, a függőleges távolságuk minden pontban állandó: pontosan 7 egység!'
      },
      {
        id: 'stq3-10',
        questionTypeBadge: 'Emelt szintű eltolás',
        question: 'Melyik x értékre veszi fel a h(x) = 1/(x - 4) + 5 függvény a 7 értéket?',
        options: [
          'x = 4,5',
          'x = 3,5',
          'x = 6',
          'x = 2'
        ],
        correctAnswer: 0,
        explanation: '1/(x - 4) + 5 = 7 ⟹ 1/(x - 4) = 2 ⟹ x - 4 = 1/2 = 0,5 ⟹ x = 4,5. Ellenőrzés: 1/(4,5 - 4) + 5 = 1/0,5 + 5 = 2 + 5 = 7.'
      }
    ]
  }
};

export const ShiftTransformQuiz: React.FC<ShiftTransformQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="„Fel”-, „le”, „jobbra”-, „balra”"
      subtitle="Gyakorold a párhuzamos függvénytranszformációkat, eltolásvektorokat és tartományvizsgálatokat!"
      themeColor="cyan"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={ShiftTransformMatcher}
      sorterComponent={ShiftTransformSorter}
    />
  );
};

