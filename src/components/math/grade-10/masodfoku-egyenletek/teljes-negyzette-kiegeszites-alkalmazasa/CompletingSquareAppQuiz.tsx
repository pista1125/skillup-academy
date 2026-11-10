import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CompletingSquareAppMatcher } from './CompletingSquareAppMatcher';
import { CompletingSquareAppSorter } from './CompletingSquareAppSorter';
import {
  LeadingCoeffStrategySvg,
  ExtremumParabolaSvg,
  FractionalSquareMethodSvg,
  NegativeLeadingCoeffSvg
} from './CompletingSquareAppFigures';

interface CompletingSquareAppQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Két stratégia: Egyenlet vs. Kifejezés',
    description: 'Egyenletnél (ax² + bx + c = 0) leoszthatunk a-val! Kifejezésnél (függvénynél) kötelező kiemelni az a-t: a[(x+d)² - d²] + c = a(x+d)² - ad² + c.',
    note: 'Soha ne felejtsd el a levont d²-et visszaszorozni az a-val a zárójel felbontásakor!',
    color: 'from-amber-500 to-orange-600',
    figure: <LeadingCoeffStrategySvg size={220} />
  },
  {
    title: 'Szélsőérték és a parabola csúcspontja',
    description: 'f(x) = a(x - u)² + v. Ha a > 0: felfelé nyíló parabola, MINIMUM helye u, értéke v. Ha a < 0: lefelé nyíló parabola, MAXIMUM helye u, értéke v.',
    note: 'A csúcspont koordinátái: C(u, v). A szélsőérték helye az x, értéke pedig az y = f(x).',
    color: 'from-blue-500 to-indigo-600',
    figure: <ExtremumParabolaSvg size={220} />
  },
  {
    title: 'Törtekkel végzett négyzetkiegészítés',
    description: 'Páratlan b esetén a felezett tag d = b/2 tört lesz. Négyzete (b/2)² = b²/4. A levonást közös nevezőre hozással végezzük el!',
    note: 'Ne válts tizedes törtre (pl. 2,25), mert a közönséges törtekkel (9/4) sokkal pontosabb és gyorsabb a gyökvonás!',
    color: 'from-emerald-500 to-teal-600',
    figure: <FractionalSquareMethodSvg size={220} />
  },
  {
    title: 'Negatív főegyüttható (-x² vagy a < 0)',
    description: '-x² + bx + c = 0 egyenletnél szorozzunk (-1)-gyel! Kifejezésnél emeljünk ki (-1)-et: -(x² - bx) = -[(x - b/2)² - (b/2)²] = -(x - b/2)² + (b/2)²',
    note: 'A mínusz előjel kiemelésekor a zárójelben MINDEN tag előjele megfordul!',
    color: 'from-purple-500 to-pink-600',
    figure: <NegativeLeadingCoeffSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Főegyüttható kezelése és normálttá tétel',
    subtitle: 'a ≠ 1 együtthatójú egyenletek átalakítása osztással és negatív előjelek kezelése.',
    range: '1–10. feladat',
    focus: 'Leosztás főegyütthatóval és alap átalakítások',
    questions: [
      {
        id: 'csaq1-1',
        questionTypeBadge: 'Stratégia',
        question: 'Hogyan érdemes elkezdeni a 2x² + 8x - 10 = 0 egyenlet megoldását négyzetkiegészítéssel?',
        options: [
          'Mindkét oldalt elosztjuk 2-vel, így az x² + 4x - 5 = 0 normált egyenletet kapjuk',
          'Azonnal felírjuk a (2x + 4)² teljes négyzetet',
          'Gyököt vonunk mindkét oldalból',
          'Kivonunk 8x-et mindkét oldalból'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet esetén, ha a = 2 ≠ 1, a legegyszerűbb út mindkét oldalt leosztani a főegyütthatóval (2-vel). Így x² + 4x - 5 = 0 normált alakot kapunk, ahol a másodfokú tag együtthatója 1, és a p = 4 felezésével azonnal folytatható a munka.'
      },
      {
        id: 'csaq1-2',
        questionTypeBadge: 'Fogalom',
        question: 'Mit nevezünk normált másodfokú egyenletnek?',
        options: [
          'Olyan x² + px + q = 0 másodfokú egyenletet, amelyben a másodfokú tag együtthatója pontosan 1',
          'Olyan egyenletet, amelynek két pozitív egész gyöke van',
          'Olyan egyenletet, amelyben nincsenek törtek vagy negatív számok',
          'Olyan egyenletet, amelynek a jobb oldala 1-gyel egyenlő'
        ],
        correctAnswer: 0,
        explanation: 'Normált másodfokú egyenletnek azt az alakot nevezzük, amelyben a főegyüttható (az x² szorzója) 1, azaz a = 1. Ezt általában x² + px + q = 0 alakban írjuk fel.'
      },
      {
        id: 'csaq1-3',
        questionTypeBadge: 'Negatív előjel',
        question: 'Mi a leggyorsabb első lépés a -x² + 6x - 5 = 0 egyenlet megoldásakor?',
        options: [
          'Megszorozzuk mindkét oldalt (-1)-gyel, így x² - 6x + 5 = 0 lesz',
          'Hozzáadunk x²-et csak a bal oldalhoz',
          'Gyököt vonunk a negatív tagból',
          'Azonnal felírjuk: -(x + 3)² = 5'
        ],
        correctAnswer: 0,
        explanation: 'Egyenletnél az egyenlet mindkét oldalát megszorozva vagy elosztva (-1)-gyel a főegyüttható azonnal +1 lesz: x² - 6x + 5 = 0. Ezzel elkerülhető a zárójel előtti mínusz miatti előjelhiba.'
      },
      {
        id: 'csaq1-4',
        questionTypeBadge: 'Egyszerűsítés',
        question: 'A 4x² - 16x + 12 = 0 egyenlet 4-gyel való leosztása után melyik egyenletet kapjuk?',
        options: [
          'x² - 4x + 3 = 0',
          'x² - 16x + 12 = 0',
          'x² - 4x + 12 = 0',
          '4(x² - 4x + 3) = 4'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlet minden egyes tagját el kell osztanunk 4-gyel: (4x²)/4 = x², (-16x)/4 = -4x, 12/4 = 3, és 0/4 = 0. Tehát az egyenlet x² - 4x + 3 = 0.'
      },
      {
        id: 'csaq1-5',
        questionTypeBadge: 'Számolás',
        question: 'Mik a gyökei a 3x² - 12 = 0 egyenletnek?',
        options: [
          'x₁ = 2 és x₂ = -2',
          'Csak x = 2',
          'x₁ = 4 és x₂ = -4',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: '3-mal osztva: x² - 4 = 0 ⟹ x² = 4. Kétoldali gyökvonással: x₁,₂ = ±√4 = ±2.'
      },
      {
        id: 'csaq1-6',
        questionTypeBadge: 'Felezés',
        question: 'A 2x² - 12x + 10 = 0 egyenlet 2-vel való osztása után mekkora lesz a felezendő p együttható és annak d = p/2 fele?',
        options: [
          'p = -6, így d = -3',
          'p = -12, így d = -6',
          'p = 6, így d = 3',
          'p = -6, így d = -6'
        ],
        correctAnswer: 0,
        explanation: '2-vel osztva az egyenlet x² - 6x + 5 = 0. Itt az elsőfokú tag együtthatója p = -6. Ennek fele d = p/2 = -6/2 = -3.'
      },
      {
        id: 'csaq1-7',
        questionTypeBadge: 'Egyenlet vs Kifejezés',
        question: 'Miért NEM szabad az f(x) = 2x² + 8x + 6 függvényképletet egyszerűen elosztani 2-vel?',
        options: [
          'Mert ez egy kifejezés, nem egyenlet: nincs jobb oldal, így az osztással a függvényértékek a felükre csökkennének!',
          'Mert páros számot tilos osztani függvényekben',
          'Mert az x² nem osztható 2-vel',
          'Mert a parabola automatikusan lefelé fordulna'
        ],
        correctAnswer: 0,
        explanation: 'Egyenletnél a mérlegelv szerint mindkét oldalt oszthatjuk (0/2 = 0). Függvény kifejezésénél viszont ha osztanánk 2-vel, az f(x)/2 lenne, vagyis egy teljesen más függvényt kapnánk! Ezért kifejezéseknél osztás helyett KIEMELJÜK a 2-t: 2(x² + 4x + 3).'
      },
      {
        id: 'csaq1-8',
        questionTypeBadge: 'Hiányos eset',
        question: 'Mi a megoldása a -2x² + 8x = 0 egyenletnek?',
        options: [
          'x₁ = 0 és x₂ = 4',
          'Csak x = 4',
          'x₁ = 2 és x₂ = -2',
          'x₁ = 0 és x₂ = -4'
        ],
        correctAnswer: 0,
        explanation: '(-2)-vel osztva mindkét oldalt: x² - 4x = 0. Kiemelve x-et: x(x - 4) = 0. Így a két gyök: x₁ = 0 és x₂ = 4.'
      },
      {
        id: 'csaq1-9',
        questionTypeBadge: 'Normált alak',
        question: 'A 3x² + 18x + 24 = 0 egyenlet normált alakjában mennyi a konstans tag (q)?',
        options: [
          'q = 8',
          'q = 24',
          'q = 6',
          'q = -8'
        ],
        correctAnswer: 0,
        explanation: 'Mindkét oldalt elosztva 3-mal: x² + 6x + 8 = 0. Itt a konstans tag q = 8.'
      },
      {
        id: 'csaq1-10',
        questionTypeBadge: 'Alapelv',
        question: 'Szabad-e egy egyenlet mindkét oldalát elosztani a másodfokú tag főegyütthatójával, ha az negatív tört, pl. -1/2?',
        options: [
          'Igen, bármilyen 0-tól különböző valós számmal szabad osztani vagy szorozni (pl. itt szorozhatunk (-2)-vel)',
          'Nem, negatív számmal soha nem szabad egyenletet osztani',
          'Nem, törttel való osztás érvényteleníti az egyenletet',
          'Csak akkor, ha a többi tag is negatív tört'
        ],
        correctAnswer: 0,
        explanation: 'A mérlegelv szerint bármely 0-tól különböző valós számmal megszorozhatjuk vagy eloszthatjuk egy egyenlet mindkét oldalát. (-1/2)-del való osztás megegyezik a (-2)-vel való szorzással, ami azonnal +1-gyé teszi a főegyütthatót.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtekkel való négyzetkiegészítés',
    subtitle: 'Páratlan együtthatók, nevezők négyzete és precíz törtszámítás a teljes négyzet alakban.',
    range: '11–20. feladat',
    focus: 'Törtek, páratlan b együttható és közös nevező',
    questions: [
      {
        id: 'csaq2-1',
        questionTypeBadge: 'Tört felezés',
        question: 'Mennyi az x² + 3x kifejezésben a 3 fele (d = p/2), és mennyi annak négyzete?',
        options: [
          'd = 3/2, négyzete pedig 9/4',
          'd = 1,5, négyzete pedig 3',
          'd = 3/2, négyzete pedig 6/4',
          'd = 6, négyzete pedig 36'
        ],
        correctAnswer: 0,
        explanation: 'A p = 3 együttható fele d = 3/2. Törtet úgy négyzetelünk, hogy a számlálót és a nevezőt is négyzetre emeljük: (3/2)² = 3²/2² = 9/4.'
      },
      {
        id: 'csaq2-2',
        questionTypeBadge: 'Négyzetté alakítás',
        question: 'Hogyan alakítható teljes négyzetté az x² - 5x kifejezés?',
        options: [
          '(x - 5/2)² - 25/4',
          '(x - 5/2)² + 25/4',
          '(x - 5)² - 25',
          '(x - 2,5)² - 5'
        ],
        correctAnswer: 0,
        explanation: 'A felezett tag d = -5/2. A teljes négyzet: (x - 5/2)². A kifejtéskor keletkező d² = (-5/2)² = 25/4 többletet le kell vonnunk: (x - 5/2)² - 25/4.'
      },
      {
        id: 'csaq2-3',
        questionTypeBadge: 'Egyenlet megoldás',
        question: 'Az x² + x - 2 = 0 egyenletnél a teljes négyzetté alakítás után milyen alakra jutunk a jobb oldalon?',
        options: [
          '(x + 1/2)² = 9/4',
          '(x + 1/2)² = 7/4',
          '(x + 1)² = 3',
          '(x + 1/2)² = -7/4'
        ],
        correctAnswer: 0,
        explanation: 'x² + x = 2 ⟹ (x + 1/2)² - 1/4 = 2 ⟹ (x + 1/2)² = 2 + 1/4 = 8/4 + 1/4 = 9/4.'
      },
      {
        id: 'csaq2-4',
        questionTypeBadge: 'Gyökvonás törtből',
        question: 'Mik a gyökei az (x + 1/2)² = 9/4 egyenletnek?',
        options: [
          'x₁ = 1 és x₂ = -2',
          'x₁ = 2 és x₂ = -1',
          'x₁ = 3/2 és x₂ = -3/2',
          'x₁ = 4 és x₂ = -5'
        ],
        correctAnswer: 0,
        explanation: 'Gyökvonással: x + 1/2 = ±√(9/4) = ±3/2. Így x₁ = -1/2 + 3/2 = 2/2 = 1, és x₂ = -1/2 - 3/2 = -4/2 = -2.'
      },
      {
        id: 'csaq2-5',
        questionTypeBadge: 'Közös nevező',
        question: 'Az x² + 5x + 6 = 0 egyenletnél mennyi a jobb oldal az (x + 5/2)² felírása után?',
        options: [
          '1/4, mert 25/4 - 6 = 25/4 - 24/4 = 1/4',
          '49/4, mert 25/4 + 6 = 49/4',
          '-1/4, mert nincs gyöke',
          '1, mert 25/4 kerekítve 6'
        ],
        correctAnswer: 0,
        explanation: '(x + 5/2)² - 25/4 + 6 = 0 ⟹ (x + 5/2)² = 25/4 - 6. A 6-ot 4-es közös nevezőre hozzuk: 6 = 24/4. Így 25/4 - 24/4 = 1/4.'
      },
      {
        id: 'csaq2-6',
        questionTypeBadge: 'Gyökök meghatározása',
        question: 'Mik az x² + 5x + 6 = 0 egyenlet gyökei az (x + 5/2)² = 1/4 alakból?',
        options: [
          'x₁ = -2 és x₂ = -3',
          'x₁ = 2 és x₂ = 3',
          'x₁ = -1 és x₂ = -6',
          'x₁ = 5 és x₂ = 6'
        ],
        correctAnswer: 0,
        explanation: 'x + 5/2 = ±√(1/4) = ±1/2. Innen x₁ = -5/2 + 1/2 = -4/2 = -2, és x₂ = -5/2 - 1/2 = -6/2 = -3.'
      },
      {
        id: 'csaq2-7',
        questionTypeBadge: 'Tört együttható',
        question: 'Hogyan alakul át a 2x² + 3x - 2 = 0 egyenlet 2-vel való osztás után?',
        options: [
          'x² + 3/2 x - 1 = 0',
          'x² + 3x - 1 = 0',
          'x² + 1,5x - 2 = 0',
          '2(x² + 3x - 2) = 0'
        ],
        correctAnswer: 0,
        explanation: 'Minden tagot osztunk 2-vel: (2x²)/2 = x², (3x)/2 = 3/2 x, (-2)/2 = -1. Így az egyenlet: x² + 3/2 x - 1 = 0.'
      },
      {
        id: 'csaq2-8',
        questionTypeBadge: 'Tört felezése',
        question: 'Mennyi a 3/2 tört fele (3/2 : 2), és mennyi annak négyzete?',
        options: [
          'Fele 3/4, négyzete pedig 9/16',
          'Fele 3/4, négyzete pedig 6/8',
          'Fele 3/1, négyzete pedig 9',
          'Fele 1,5, négyzete pedig 2,25'
        ],
        correctAnswer: 0,
        explanation: 'Egy törtet úgy osztunk 2-vel, hogy a nevezőjét szorozzuk 2-vel: (3/2) / 2 = 3/4. Ennek négyzete: (3/4)² = 9/16.'
      },
      {
        id: 'csaq2-9',
        questionTypeBadge: 'Negatív jobb oldal',
        question: 'Az x² - 3x + 5 = 0 egyenlet átalakításakor (x - 3/2)² = 9/4 - 5 = 9/4 - 20/4 = -11/4 adódik. Hány valós gyöke van az egyenletnek?',
        options: [
          '0 valós gyöke van, mert valós szám négyzete nem lehet negatív (-11/4 < 0)',
          '2 valós gyöke van: ±√(-11/4)',
          '1 valós gyöke van: x = 3/2',
          'Végtelen sok valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a jobb oldal szigorúan negatív (-11/4 < 0), és a valós számok halmazán a bal oldali teljes négyzet mindig nemnegatív ((x - 3/2)² ≥ 0), az egyenletnek nincs valós gyöke (x ∈ ∅).'
      },
      {
        id: 'csaq2-10',
        questionTypeBadge: 'Tizedes vs Tört',
        question: 'Miért ajánlott algebrai átalakításoknál a közönséges törteket (pl. 7/2 és 49/4) használni a tizedes törtek helyett?',
        options: [
          'Mert a törtekkel való gyökvonás fejben azonnal elvégezhető (√(49/4) = 7/2), míg a tizedes törtek gyakran végtelen szakaszosak vagy nehezen gyökölhetők',
          'Mert a tizedes tört használata tilos a matematikában',
          'Mert a törtek mindig egész számot adnak',
          'Mert a számológép nem tud tizedes törtekkel dolgozni'
        ],
        correctAnswer: 0,
        explanation: 'A közönséges törtek (pl. 9/4, 49/16) számlálójából és nevezőjéből külön-külön azonnal és pontosan lehet gyököt vonni. Ezzel szemben a harmadok vagy hetedek tizedes törtként végtelenek lennének, a kerekítés pedig pontatlansághoz és hibás gyökökhöz vezetne.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kiemelés és szélsőérték-számítás',
    subtitle: 'Függvények csúcspontjának (Vertex) meghatározása, minimum/maximum és összetett feladatok.',
    range: '21–30. feladat',
    focus: 'Kiemelés, parabola csúcspontja és szélsőértékek',
    questions: [
      {
        id: 'csaq3-1',
        questionTypeBadge: 'Szélsőérték jellege',
        question: 'Az f(x) = 2(x - 3)² + 5 másodfokú függvénynek milyen szélsőértéke van, és miért?',
        options: [
          'Minimuma van, mert a négyzetes tag szorzója pozitív (a = 2 > 0), így a parabola felfelé nyílik',
          'Maximuma van, mert a +5 pozitív szám',
          'Maximuma van, mert a = 2 nagyobb 1-nél',
          'Nincs szélsőértéke, mert nem egyenlő 0-val'
        ],
        correctAnswer: 0,
        explanation: 'Mivel (x - 3)² ≥ 0 mindig, ennek legkisebb értéke 0 (ha x = 3). Mivel a = 2 > 0 pozitív, a 2(x - 3)² tag legkisebb értéke szintén 0, így f(x) a legkisebb értékét veszi fel: minimuma van.'
      },
      {
        id: 'csaq3-2',
        questionTypeBadge: 'Szélsőérték értéke és helye',
        question: 'Mennyi az f(x) = 2(x - 3)² + 5 függvény szélsőértékének HELYE és ÉRTÉKE?',
        options: [
          'Helye: x = 3, értéke: min = 5',
          'Helye: x = -3, értéke: min = 5',
          'Helye: x = 5, értéke: min = 3',
          'Helye: x = 3, értéke: max = 5'
        ],
        correctAnswer: 0,
        explanation: 'A teljes négyzet akkor veszi fel minimális (0) értékét, ha x - 3 = 0, azaz a szélsőérték helye x = 3. Ekkor a függvény értéke f(3) = 2 · 0² + 5 = 5, ami a függvény minimum értéke.'
      },
      {
        id: 'csaq3-3',
        questionTypeBadge: 'Csúcspont koordináták',
        question: 'Mik a csúcspontjának koordinátái a g(x) = -(x + 4)² + 9 parabolának?',
        options: [
          'C(-4; 9), és itt maximuma van a függvénynek',
          'C(4; 9), és itt minimuma van a függvénynek',
          'C(-4; -9), és itt maximuma van a függvénynek',
          'C(4; -9), és itt minimuma van a függvénynek'
        ],
        correctAnswer: 0,
        explanation: 'Az a(x - u)² + v alakban az (x + 4) = (x - (-4)), tehát u = -4, v = 9. A csúcspont koordinátái: C(-4; 9). Mivel a = -1 < 0, a parabola lefelé nyílik, így a csúcspontban maximum van.'
      },
      {
        id: 'csaq3-4',
        questionTypeBadge: 'Kiemelés lépései',
        question: 'Alakítsd át az f(x) = 2x² - 12x + 11 polinomot teljes négyzetes alakra!',
        options: [
          '2(x - 3)² - 7',
          '2(x - 3)² + 2',
          '2(x - 6)² - 25',
          '(2x - 6)² - 7'
        ],
        correctAnswer: 0,
        explanation: '1. Kiemeljük a 2-t az első két tagból: 2(x² - 6x) + 11. 2. Zárójelen belül négyzetté alakítunk: 2[(x - 3)² - 9] + 11. 3. Visszaszorozzuk a levont 9-et: 2(x - 3)² - 18 + 11 = 2(x - 3)² - 7.'
      },
      {
        id: 'csaq3-5',
        questionTypeBadge: 'Tipikus hiba felismerése',
        question: 'Mi a hiba a következő átalakításban: 3x² + 12x + 5 = 3(x + 2)² - 4 + 5 = 3(x + 2)² + 1?',
        options: [
          'A levont 2² = 4-et elfelejtette visszaszorozni a kiemelt 3-mal, helyesen -3 · 4 = -12-t kellett volna levonni!',
          'A zárójelben (x - 2)-nek kellene lennie',
          'A 12 fele 4, nem pedig 2',
          'A +5-öt is osztani kellett volna 3-mal'
        ],
        correctAnswer: 0,
        explanation: 'Ez a leggyakoribb diákhiba! Amikor 3(x² + 4x) alakban a zárójelen belül (x + 2)² - 4-et írunk, a zárójel felbontásakor a -4-et is szorozza a külső 3: 3 · (-4) = -12. Helyesen: 3(x + 2)² - 12 + 5 = 3(x + 2)² - 7.'
      },
      {
        id: 'csaq3-6',
        questionTypeBadge: 'Szélsőérték feladat',
        question: 'Egy téglalap kerülete 40 cm. Hogyan válasszuk meg az oldalait, hogy a területe a lehető legnagyobb legyen?',
        options: [
          'Négyzetként: mindkét oldal 10 cm legyen (a maximális terület 100 cm²)',
          'Egyik oldal 5 cm, másik oldal 15 cm legyen',
          'Egyik oldal 1 cm, másik oldal 19 cm legyen',
          'Bármilyen méretnél ugyanakkora a terület'
        ],
        correctAnswer: 0,
        explanation: 'Kerület K = 2(a + b) = 40 ⟹ a + b = 20 ⟹ b = 20 - a. A terület T(a) = a(20 - a) = -a² + 20a. Teljes négyzetté alakítva: -(a - 10)² + 100. Ennek maximuma van az a = 10 helyen, értéke 100 cm² (négyzet).'
      },
      {
        id: 'csaq3-7',
        questionTypeBadge: 'Maximum meghatározás',
        question: 'Mennyi a h(x) = -3x² + 12x - 5 függvény maximumának értéke?',
        options: [
          '7 (az x = 2 helyen)',
          '-5 (az x = 0 helyen)',
          '12 (az x = 4 helyen)',
          'Nincs maximuma, mert a = -3 negatív'
        ],
        correctAnswer: 0,
        explanation: '-3-at kiemelve: -3(x² - 4x) - 5 = -3[(x - 2)² - 4] - 5 = -3(x - 2)² + 12 - 5 = -3(x - 2)² + 7. A maximum értéke 7 az x = 2 helyen.'
      },
      {
        id: 'csaq3-8',
        questionTypeBadge: 'Érintő parabola',
        question: 'Ha az f(x) = a(x - u)² + v parabola csúcspontja pontosan az x-tengelyre esik (v = 0), hány valós zérushelye van a függvénynek?',
        options: [
          'Pontosan 1 valós zérushelye van (az x = u helyen érinti a tengelyt, kettős gyök)',
          '2 különböző valós zérushelye van',
          '0 valós zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'Ha v = 0, akkor a(x - u)² = 0, amiből (x - u)² = 0 ⟹ x = u az egyetlen megoldás. Geometriailag a parabola csúcspontja C(u; 0) éppen érinti az x-tengelyt.'
      },
      {
        id: 'csaq3-9',
        questionTypeBadge: 'Függvénytranszformáció',
        question: 'Hogyan származtatható az f(x) = 2(x - 1)² + 3 grafikonja a normál parabolából (y = x²)?',
        options: [
          '1 egységgel jobbra, 3 egységgel fel toljuk, és 2-szeresére nyújtjuk függőlegesen',
          '1 egységgel balra, 3 egységgel le toljuk, és 2-szeresére zsugorítjuk',
          '1 egységgel fel, 3 egységgel jobbra toljuk',
          'Megfordítjuk és 2 egységgel eltoljuk'
        ],
        correctAnswer: 0,
        explanation: 'Az (x - 1) miatti eltolás +1 egység jobbra (x irányban), a +3 miatti eltolás +3 egység fel (y irányban), a 2-szeres szorzó pedig az y tengely menti 2-szeres függőleges nyújtás.'
      },
      {
        id: 'csaq3-10',
        questionTypeBadge: 'Összegzés',
        question: 'Melyik állítás IGAZ minden másodfokú ax² + bx + c kifejezésre a valós számok körében?',
        options: [
          'Bármely másodfokú kifejezés egyértelműen átalakítható a(x - u)² + v alakra teljes négyzetté kiegészítéssel',
          'Csak akkor alakítható át, ha a gyökök valós egész számok',
          'Ha a < 0, akkor a kifejezésnek nincs teljes négyzet alakja',
          'A teljes négyzetté alakítás csak egyenleteknél működik, függvényeknél nem'
        ],
        correctAnswer: 0,
        explanation: 'A teljes négyzetté kiegészítés univerzális algebrai azonosság: tetszőleges valós együtthatójú másodfokú polinom (a ≠ 0) mindig egyértelműen felírható a(x - u)² + v alakban, függetlenül attól, hogy vannak-e valós gyökei vagy sem.'
      }
    ]
  }
};

export const CompletingSquareAppQuiz: React.FC<CompletingSquareAppQuizProps> = ({
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
      topicId="teljes-negyzette-kiegeszites-alkalmazasa"
      topicTitle="Teljes négyzetté kiegészítés alkalmazása"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      renderMatcher={(level, onNext, onRules, onB) => (
        <CompletingSquareAppMatcher
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
        <CompletingSquareAppSorter
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

export default CompletingSquareAppQuiz;

