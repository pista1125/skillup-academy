import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ParabolaBasicsMatcher } from './ParabolaBasicsMatcher';
import { ParabolaBasicsSorter } from './ParabolaBasicsSorter';
import {
  NormalParabolaSvg,
  VerticalShiftSvg,
  HorizontalShiftSvg,
  ParabolaOddStepSvg
} from './ParabolaBasicsFigures';

interface ParabolaBasicsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Az f(x) = x² normálparabola alapjai',
    description: 'Csúcspont (tengelypont): T(0; 0). Szimmetriatengely: y-tengely (x = 0). Df = ℝ, Rf = [0; ∞[. Minimuma 0 az x = 0 helyen.',
    note: 'Páros függvény: (-x)² = x², ezért a negatív és pozitív x értékekhez azonos y tartozik.',
    color: 'from-blue-500 to-indigo-600',
    figure: <NormalParabolaSvg size={180} />
  },
  {
    title: 'Függőleges eltolások: f(x) = x² ± c',
    description: 'c > 0 esetén c-vel felfelé, c < 0 esetén |c|-vel lefelé tolódik. Csúcspont: T(0; c). Értékkészlet: Rf = [c; ∞[.',
    note: 'Zérushelyek: c < 0 esetén 2 db (x = ±√|c|), c = 0 esetén 1 db (x = 0), c > 0 esetén 0 db.',
    color: 'from-emerald-500 to-teal-600',
    figure: <VerticalShiftSvg size={180} />
  },
  {
    title: 'Vízszintes eltolások: f(x) = (x ∓ u)²',
    description: 'Ellentétes előjel szabálya: (x - u)² jobbra tol u-val, míg (x + u)² balra tol u-val. Csúcspont: T(u; 0), illetve T(-u; 0).',
    note: 'Az értékkészlet marad [0; ∞[, egyetlen zérushelye van a csúcspontban.',
    color: 'from-purple-500 to-indigo-600',
    figure: <HorizontalShiftSvg size={180} />
  },
  {
    title: 'A páratlan lépések szabálya rajzoláskor',
    description: 'A csúcspontból jobbra (vagy balra) 1-et lépve sorban páratlan számú egységet lépünk fel: 1, majd 3, 5, 7...',
    note: 'Összefüggés: 1 = 1², 1+3 = 2² = 4, 1+3+5 = 3² = 9. Gyors és pontos rajzolást tesz lehetővé!',
    color: 'from-amber-500 to-rose-600',
    figure: <ParabolaOddStepSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A normálparabola alapjai és egyszerű eltolások',
    subtitle: 'Csúcspont, szimmetriatengely, Df, Rf és egy-egy tengely menti mozgás.',
    range: '1–10. feladat',
    focus: 'Alapfogalmak és szimmetria',
    questions: [
      {
        id: 'pbq1-1',
        questionTypeBadge: 'Fogalom',
        question: 'Mi a koordináta-rendszerben ábrázolt f(x) = x² függvény grafikonjának szimmetriatengelye?',
        options: [
          'Az y-tengely (az x = 0 egyenes)',
          'Az x-tengely (az y = 0 egyenes)',
          'Az y = x egyenes',
          'Nincs szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'Az f(x) = x² függvény páros, mivel f(-x) = (-x)² = x² = f(x). Grafikonja tükörszimmetrikus az y-tengelyre (az x = 0 függőleges egyenesre).'
      },
      {
        id: 'pbq1-2',
        questionTypeBadge: 'Csúcspont',
        question: 'Hol található az f(x) = x² alapfüggvény csúcspontja (tengelypontja)?',
        options: [
          'Az origóban: T(0; 0)',
          'A T(1; 1) pontban',
          'A T(0; 1) pontban',
          'A T(1; 0) pontban'
        ],
        correctAnswer: 0,
        explanation: 'A normálparabola tengelypontja a szimmetriatengely (y-tengely) és a görbe metszéspontja, ami pontosan az origóban: T(0; 0) van.'
      },
      {
        id: 'pbq1-3',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az f : ℝ → ℝ, f(x) = x² függvény értékkészlete (Rf)?',
        options: [
          '[0; ∞[ (vagyis a nemnegatív valós számok: ℝ₀⁺)',
          ']-∞; ∞[ (minden valós szám: ℝ)',
          ']0; ∞[ (szigorúan pozitív valós számok)',
          '[-1; 1]'
        ],
        correctAnswer: 0,
        explanation: 'Bármely valós szám négyzete legalább 0 (nemnegatív), és minden nemnegatív szám előáll négyzetszámként, ezért Rf = [0; ∞[ = ℝ₀⁺.'
      },
      {
        id: 'pbq1-4',
        questionTypeBadge: 'Eltolás',
        question: 'Milyen irányban és mennyivel mozdul el a grafikon az f(x) = x²-hez képest a g(x) = x² + 3 szabálynál?',
        options: [
          'Az y-tengely mentén 3 egységgel felfelé',
          'Az y-tengely mentén 3 egységgel lefelé',
          'Az x-tengely mentén 3 egységgel jobbra',
          'Az x-tengely mentén 3 egységgel balra'
        ],
        correctAnswer: 0,
        explanation: 'A függvényértékhez adott +3 minden pont y-koordinátáját 3-mal növeli, így a parabola 3 egységgel felfelé tolódik.'
      },
      {
        id: 'pbq1-5',
        questionTypeBadge: 'Csúcspont',
        question: 'Mik a csúcspontjának koordinátái a g(x) = x² - 5 függvénynek?',
        options: [
          'T(0; -5)',
          'T(-5; 0)',
          'T(5; 0)',
          'T(0; 5)'
        ],
        correctAnswer: 0,
        explanation: 'Az x² - 5 grafikonja 5 egységgel lefelé van eltolva, x = 0-nál az értéke -5, így a csúcspont T(0; -5).'
      },
      {
        id: 'pbq1-6',
        questionTypeBadge: 'Eltolás',
        question: 'Milyen transzformációval kapjuk meg az f(x) = x² függvényből a h(x) = (x - 4)² függvényt?',
        options: [
          'Az x-tengely mentén 4 egységgel jobbra tolással',
          'Az x-tengely mentén 4 egységgel balra tolással',
          'Az y-tengely mentén 4 egységgel lefelé tolással',
          'Az x-tengelyre való tükrözéssel'
        ],
        correctAnswer: 0,
        explanation: 'Az ellentétes előjel szabálya szerint az (x - 4)² a minimális 0 értéket x = +4-nél veszi fel, így a parabola 4 egységgel jobbra tolódik.'
      },
      {
        id: 'pbq1-7',
        questionTypeBadge: 'Csúcspont',
        question: 'Mik a csúcspontjának koordinátái a k(x) = (x + 2)² függvénynek?',
        options: [
          'T(-2; 0)',
          'T(2; 0)',
          'T(0; 2)',
          'T(0; -2)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel (x + 2)² = (x - (-2))², az eltolás balra történik 2 egységgel, a csúcspont T(-2; 0).'
      },
      {
        id: 'pbq1-8',
        questionTypeBadge: 'Monotonitás',
        question: 'Hol szigorúan monoton növekvő az f : ℝ → ℝ, f(x) = x² alapfüggvény?',
        options: [
          'A [0; ∞[ intervallumon',
          'A ]-∞; 0] intervallumon',
          'A teljes valós számegyenesen',
          'A [-1; 1] intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A normálparabola a csúcspontjától jobbra, azaz a [0; ∞[ félegyenesen szigorúan monoton növekszik, míg a negatív félegyenesen (]-∞; 0]) csökken.'
      },
      {
        id: 'pbq1-9',
        questionTypeBadge: 'Rajzolás',
        question: 'A páratlan lépések szabálya szerint ha a (0; 0) csúcspontból jobbra lépünk 1-et és fel 1-et a (1; 1) pontba, innen hány egységet kell felfelé lépnünk a következő 1 egység jobbra lépés után?',
        options: [
          '3 egységet fel (a (2; 4) pontba)',
          '1 egységet fel',
          '2 egységet fel',
          '4 egységet fel'
        ],
        correctAnswer: 0,
        explanation: 'A páratlan számok sorozata: 1, majd 3, majd 5, majd 7. Az (1; 1) pontból 1-et jobbra és 3-at fel lépve pontosan a (2; 1+3) = (2; 4) pontba érkezünk, hiszen 2² = 4.'
      },
      {
        id: 'pbq1-10',
        questionTypeBadge: 'Számítás',
        question: 'Mennyi az f(x) = x² + 1 függvény helyettesítési értéke az x = -3 helyen?',
        options: [
          '10',
          '-8',
          '8',
          '-10'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve: f(-3) = (-3)² + 1 = 9 + 1 = 10.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kettős eltolás, zérushelyek és függvényjellemzés',
    subtitle: 'f(x) = (x - u)² + c eltolások, zérushelyek algebrai kiszámítása és értékkészlet.',
    range: '11–20. feladat',
    focus: 'Kettős eltolás és zérushelyek',
    questions: [
      {
        id: 'pbq2-1',
        questionTypeBadge: 'Kettős eltolás',
        question: 'Mik a csúcspontjának koordinátái az f(x) = (x - 3)² + 5 függvénynek?',
        options: [
          'T(3; 5)',
          'T(-3; 5)',
          'T(3; -5)',
          'T(-3; -5)'
        ],
        correctAnswer: 0,
        explanation: 'Az (x - 3)² tag 3 egységgel jobbra tolja a csúcsot (x = 3), a +5 pedig 5 egységgel felfelé (y = 5). Így a csúcspont T(3; 5).'
      },
      {
        id: 'pbq2-2',
        questionTypeBadge: 'Kettős eltolás',
        question: 'Mik a csúcspontjának koordinátái a g(x) = (x + 1)² - 7 függvénynek?',
        options: [
          'T(-1; -7)',
          'T(1; -7)',
          'T(-1; 7)',
          'T(1; 7)'
        ],
        correctAnswer: 0,
        explanation: 'Az (x + 1) balra 1-et jelent (x = -1), a -7 pedig lefelé 7-et (y = -7), tehát a csúcspont T(-1; -7).'
      },
      {
        id: 'pbq2-3',
        questionTypeBadge: 'Zérushely',
        question: 'Melyek az f(x) = x² - 16 függvény zérushelyei a valós számok halmazán?',
        options: [
          'x₁ = -4 és x₂ = 4',
          'Csak x = 4',
          'Csak x = 16',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        explanation: 'A zérushelyeknél f(x) = 0: x² - 16 = 0 ⟹ x² = 16 ⟹ x = ±4.'
      },
      {
        id: 'pbq2-4',
        questionTypeBadge: 'Zérushely',
        question: 'Hány zérushelye van a h(x) = (x - 5)² + 2 függvénynek?',
        options: [
          '0 (nincs zérushelye, mert a csúcspontja (5; 2) az x-tengely felett van)',
          '1 zérushelye van (x = 5)',
          '2 zérushelye van',
          'Végtelen sok zérushelye van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel (x - 5)² ≥ 0 minden valós x-re, ezért (x - 5)² + 2 ≥ 2 > 0 mindig. A függvény soha nem veszi fel a 0 értéket, így 0 zérushelye van.'
      },
      {
        id: 'pbq2-5',
        questionTypeBadge: 'Szabályfelírás',
        question: 'Egy parabola tengelypontja a T(6; 0) pont. Ha a normálparabola eltolásával kaptuk, mi a hozzárendelési szabálya?',
        options: [
          'f(x) = (x - 6)²',
          'f(x) = (x + 6)²',
          'f(x) = x² + 6',
          'f(x) = x² - 6'
        ],
        correctAnswer: 0,
        explanation: 'A T(6; 0) tengelypont azt jelenti, hogy a parabola az x-tengely mentén 6 egységgel jobbra tolódott, tehát a szabály f(x) = (x - 6)².'
      },
      {
        id: 'pbq2-6',
        questionTypeBadge: 'Szabályfelírás',
        question: 'Egy parabola tengelypontja a T(0; 5) pont. Ha a normálparabola eltolásával kaptuk, mi a hozzárendelési szabálya?',
        options: [
          'f(x) = x² + 5',
          'f(x) = (x - 5)²',
          'f(x) = (x + 5)²',
          'f(x) = x² - 5'
        ],
        correctAnswer: 0,
        explanation: 'A T(0; 5) tengelypont az y-tengelyen van, ami 5 egységnyi felfelé történő eltolást jelent, tehát f(x) = x² + 5.'
      },
      {
        id: 'pbq2-7',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi a g(x) = (x + 3)² - 4 függvény értékkészlete?',
        options: [
          '[-4; ∞[',
          '[3; ∞[',
          '[-3; ∞[',
          '[0; ∞['
        ],
        correctAnswer: 0,
        explanation: 'Mivel (x + 3)² ≥ 0, a legkisebb érték akkor keletkezik, amikor ez a tag 0, ekkor g(-3) = -4. A parabola felfelé nyílik, így Rf = [-4; ∞[.'
      },
      {
        id: 'pbq2-8',
        questionTypeBadge: 'Számítás',
        question: 'Oldd meg fejben: mik a zérushelyei az f(x) = (x - 2)² - 9 függvénynek?',
        options: [
          'x₁ = -1 és x₂ = 5',
          'x₁ = -3 és x₂ = 3',
          'x₁ = 2 és x₂ = 9',
          'x₁ = -7 és x₂ = 11'
        ],
        correctAnswer: 0,
        explanation: '(x - 2)² - 9 = 0 ⟹ (x - 2)² = 9 ⟹ x - 2 = ±3. Ebből x₁ = 2 - 3 = -1, míg x₂ = 2 + 3 = 5.'
      },
      {
        id: 'pbq2-9',
        questionTypeBadge: 'Szimmetria',
        question: 'Mi a szimmetriatengelye az f(x) = (x + 4)² - 3 függvény grafikonjának?',
        options: [
          'Az x = -4 függőleges egyenes',
          'Az x = 4 függőleges egyenes',
          'Az y = -3 vízszintes egyenes',
          'Az y-tengely (x = 0)'
        ],
        correctAnswer: 0,
        explanation: 'A parabola szimmetriatengelye mindig átmegy a csúcsponton, amelynek x-koordinátája u = -4. Ezért a tengely egyenlete x = -4.'
      },
      {
        id: 'pbq2-10',
        questionTypeBadge: 'Szélsőérték',
        question: 'Határozd meg az f(x) = (x - 7)² + 10 függvény minimumának értékét és a minimum helyét!',
        options: [
          'Minimum értéke: 10, a minimum helye: x = 7',
          'Minimum értéke: 7, a minimum helye: x = 10',
          'Minimum értéke: -10, a minimum helye: x = -7',
          'Minimum értéke: 0, a minimum helye: x = 7'
        ],
        correctAnswer: 0,
        explanation: 'A legkisebb függvényérték a csúcspont y-koordinátája: minimum = 10. Ez a csúcspont x-koordinátájánál következik be: minimumhely: x = 7.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Korlátos tartományok, abszolútérték és emelt szintű feladatok',
    subtitle: 'Intervallum-korlátozás, |x² - c| töréspontok és ismeretlen paraméter megállapítása.',
    range: '21–30. feladat',
    focus: 'Haladó vizsgálatok és érettségi problémák',
    questions: [
      {
        id: 'pbq3-1',
        questionTypeBadge: 'Érettségi',
        question: 'Tekintsük az f : [0; 4] → ℝ, f(x) = (x - 3)² függvényt! Mi a függvény értékkészlete ezen a korlátozott tartományon?',
        options: [
          '[0; 9]',
          '[0; 1]',
          '[1; 9]',
          '[0; 16]'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont x = 3 beletartozik a [0; 4] intervallumba, így a minimum f(3) = 0. A végpontokban: f(0) = (0-3)² = 9, és f(4) = (4-3)² = 1. A felvett legnagyobb érték a 9. Ezért Rf = [0; 9]!'
      },
      {
        id: 'pbq3-2',
        questionTypeBadge: 'Érettségi',
        question: 'Tekintsük a g : ]-1; 2] → ℝ, g(x) = x² - 3 függvényt! Mi a függvény értékkészlete ezen a tartományon?',
        options: [
          '[-3; 1]',
          ']-2; 1]',
          '[-3; 4]',
          ']-3; 1]'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont x = 0 beletartozik a ]-1; 2] tartományba, ott g(0) = -3 a zárt minimum. A határoknál: x → -1 esetén g(x) → -2, míg x = 2 esetén g(2) = 2² - 3 = 1. Ezért a felvett értékek halmaza Rf = [-3; 1]!'
      },
      {
        id: 'pbq3-3',
        questionTypeBadge: 'Paraméteres feladat',
        question: 'Egy f : ℝ → ℝ függvény hozzárendelési szabálya f(x) = x² - p, ahol p valós szám. A grafikon átmegy a Q(-1; -2,5) ponton. Mennyi a p értéke?',
        options: [
          'p = 3,5',
          'p = -1,5',
          'p = 1,5',
          'p = -3,5'
        ],
        correctAnswer: 0,
        explanation: 'A pont koordinátáit behelyettesítve a szabályba: f(-1) = (-1)² - p = -2,5 ⟹ 1 - p = -2,5 ⟹ p = 1 + 2,5 = 3,5.'
      },
      {
        id: 'pbq3-4',
        questionTypeBadge: 'Abszolút érték',
        question: 'Hány zérushelye van a k(x) = |x² - 4| függvénynek a valós számok halmazán?',
        options: [
          '2 zérushelye van (x = -2 és x = 2)',
          '4 zérushelye van',
          '1 zérushelye van (x = 0)',
          '0 zérushelye van'
        ],
        correctAnswer: 0,
        explanation: '|x² - 4| = 0 pontosan akkor teljesül, ha x² - 4 = 0, azaz x = ±2. Tehát pontosan 2 zérushelye van.'
      },
      {
        id: 'pbq3-5',
        questionTypeBadge: 'Abszolút érték',
        question: 'Mik a koordinátái a k(x) = |x² - 4| függvény helyi maximumhelyének a [-2; 2] intervallumon?',
        options: [
          'P(0; 4)',
          'P(0; -4)',
          'P(2; 0)',
          'P(0; 2)'
        ],
        correctAnswer: 0,
        explanation: 'Az eredeti x² - 4 parabola csúcsa a (0; -4) pontban van. Az abszolút érték hatására a negatív rész tükröződik az x-tengelyre, így a (0; -4) pontból (0; 4) helyi maximumpont lesz!'
      },
      {
        id: 'pbq3-6',
        questionTypeBadge: 'Metszéspont',
        question: 'Hol metszi egymást az f(x) = x² és a g(x) = |2x| függvény grafikonja?',
        options: [
          'Három pontban: (-2; 4), (0; 0) és (2; 4)',
          'Csak az origóban: (0; 0)',
          'Két pontban: (-2; 4) és (2; 4)',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlővé téve: x² = |2x|. Ha x = 0, akkor 0 = 0. Ha x > 0: x² = 2x ⟹ x = 2 (y = 4). Ha x < 0: x² = -2x ⟹ x = -2 (y = 4). Így a három metszéspont: (-2; 4), (0; 0) és (2; 4).'
      },
      {
        id: 'pbq3-7',
        questionTypeBadge: 'Érettségi',
        question: 'Melyik függvény grafikonját kapjuk, ha az x ↦ x² függvényt az x-tengely mentén pozitív irányban 3 egységgel, majd az y-tengely mentén pozitív irányban 1 egységgel toljuk el?',
        options: [
          'f(x) = (x - 3)² + 1',
          'f(x) = (x + 3)² + 1',
          'f(x) = (x - 3)² - 1',
          'f(x) = (x + 1)² + 3'
        ],
        correctAnswer: 0,
        explanation: 'Pozitív irányban 3 egységgel az x-tengely mentén jobbra tolást jelent: (x - 3)². Az y-tengely mentén pozitív irányban 1 egység felfelé tolást jelent: + 1. Tehát f(x) = (x - 3)² + 1.'
      },
      {
        id: 'pbq3-8',
        questionTypeBadge: 'Monotonitás',
        question: 'Milyen intervallumon szigorúan monoton csökken az f(x) = (x + 5)² - 2 függvény?',
        options: [
          'A ]-∞; -5] intervallumon',
          'A [-5; ∞[ intervallumon',
          'A ]-∞; 5] intervallumon',
          'A ]-∞; -2] intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A parabola csúcspontja x = -5-nél van. Mivel felfelé nyílik, a csúcspont előtt (balra tőle) szigorúan monoton csökken, vagyis a ]-∞; -5] intervallumon.'
      },
      {
        id: 'pbq3-9',
        questionTypeBadge: 'Érettségi',
        question: 'Adott az f(x) = x² - 2 és a k(x) = x/2 + 1 függvény. Melyik x értékre veszi fel mindkét függvény pontosan ugyanazt az értéket?',
        options: [
          'x = 2 (ekkor mindkettő értéke 2)',
          'x = 0',
          'x = 1',
          'x = 3'
        ],
        correctAnswer: 0,
        explanation: 'Ellenőrzés x = 2 esetén: f(2) = 2² - 2 = 2; míg k(2) = 2/2 + 1 = 1 + 1 = 2. Tehát a (2; 2) pont közös metszéspontjuk!'
      },
      {
        id: 'pbq3-10',
        questionTypeBadge: 'Emelt szint',
        question: 'Melyik állítás IGAZ az f(x) = |x² - 1| és g(x) = |x²| + 1 függvényekre?',
        options: [
          'f(x)-nek 2 zérushelye van (x = ±1), míg g(x)-nek 0 zérushelye van (Rf = [1; ∞[)',
          'A két függvény grafikonja teljesen egybeesik',
          'Mindkét függvénynek 2 zérushelye van',
          'g(x) grafikonja érinti az x-tengelyt az origóban'
        ],
        correctAnswer: 0,
        explanation: 'f(x) = |x² - 1| zérushelyei x = ±1. Ezzel szemben g(x) = |x²| + 1 = x² + 1, mert x² ≥ 0 mindig, és mivel hozzáadunk 1-et, g(x) ≥ 1 mindenütt, tehát nincs zérushelye!'
      }
    ]
  }
};

export const ParabolaBasicsQuiz: React.FC<ParabolaBasicsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Parabolák a koordináta-rendszerben"
      subtitle="Gyakorold az f(x) = x² normálparabola jellemzését, csúcspontját és tengely menti eltolásait!"
      themeColor="indigo"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={ParabolaBasicsMatcher}
      sorterComponent={ParabolaBasicsSorter}
    />
  );
};

