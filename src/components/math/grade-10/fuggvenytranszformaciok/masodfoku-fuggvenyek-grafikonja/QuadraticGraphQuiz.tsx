import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticGraphMatcher } from './QuadraticGraphMatcher';
import { QuadraticGraphSorter } from './QuadraticGraphSorter';
import {
  RootsAndAxisSvg,
  FiveKeyPointsParabolaSvg,
  ParabolaCharacterizationSvg
} from './QuadraticGraphFigures';

interface QuadraticGraphQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A segédfüggvény és zérushelyei',
    description: 'A konstans tag nélküli g(x) = ax² + bx segédfüggvény szorzattá alakítható: x(ax + b) = 0. Zérushelyei mindig: x₁ = 0 és x₂ = -b/a.',
    note: 'Az f(x) = ax² + bx + c grafikonját úgy kapjuk meg, hogy g(x) grafikonját c-vel függőlegesen eltoljuk az y-tengely mentén.',
    color: 'from-rose-500 to-pink-600',
    figure: <RootsAndAxisSvg size={180} />
  },
  {
    title: 'Szimmetriatengely a felezőpontban',
    description: 'A parabola szimmetriatengelye függőleges egyenes: x = u, amely pontosan a két zérushely számtani közepénél metszi az x-tengelyt.',
    note: 'Képlete: u = (0 + (-b/a)) / 2 = -b / (2a). A csúcs magassága: v = f(u).',
    color: 'from-indigo-500 to-purple-600',
    figure: <FiveKeyPointsParabolaSvg size={180} />
  },
  {
    title: 'A parabola 5 kulcspontja',
    description: 'Egy másodfokú görbe precíz megrajzolásához 5 pont elegendő: 1. Csúcspont V(u; v), 2. y-metszet (0; c), 3. Tükörkép (2u; c), 4-5. Zérushelyek (x₁; 0), (x₂; 0).',
    note: 'A (0; c) és a (2u; c) pontok pontosan egyenlő u távolságra vannak a szimmetriatengely két oldalán.',
    color: 'from-emerald-500 to-teal-600',
    figure: <FiveKeyPointsParabolaSvg size={180} />
  },
  {
    title: 'Függvényjellemzés & Egyenlőtlenségek',
    description: 'Értékkészlet: [v; ∞[ (ha a > 0) vagy ]-∞; v] (ha a < 0). Monotonitás: ]-∞; u] és [u; ∞[ szakaszokon.',
    note: 'Egyenlőtlenség: f(x) > 0 ott teljesül, ahol a parabola az x-tengely felett halad, f(x) < 0 ott, ahol alatta.',
    color: 'from-blue-500 to-cyan-600',
    figure: <ParabolaCharacterizationSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Segédfüggvény, zérushelyek és szimmetriatengely',
    subtitle: 'Szorzattá alakítás, zérushelyek számtani közepe és a tengely meghatározása.',
    range: '1–10. feladat',
    focus: 'g(x) = ax² + bx, szorzattá alakítás, szimmetriatengely',
    questions: [
      {
        id: 'qgq1-1',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Mik a zérushelyei a g(x) = x² - 8x segédfüggvénynek a valós számok halmazán?',
        options: [
          'x₁ = 0 és x₂ = 8',
          'x₁ = 0 és x₂ = -8',
          'x₁ = -4 és x₂ = 4',
          'x₁ = 2 és x₂ = -8'
        ],
        correctAnswer: 'x₁ = 0 és x₂ = 8',
        explanation: 'Kiemelve x-et: x(x - 8) = 0. Egy szorzat akkor nulla, ha valamelyik tényezője nulla: x = 0 vagy x - 8 = 0 ⇒ x = 8.'
      },
      {
        id: 'qgq1-2',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Ha egy másodfokú segédfüggvény zérushelyei x₁ = 0 és x₂ = 8, mi a szimmetriatengelyének egyenlete?',
        options: [
          'x = 4',
          'x = 8',
          'y = 4',
          'x = -4'
        ],
        correctAnswer: 'x = 4',
        explanation: 'A szimmetriatengely a két zérushely számtani közepénél található: u = (0 + 8) / 2 = 4, egyenlete: x = 4.'
      },
      {
        id: 'qgq1-3',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Melyek a g(x) = 2x² - 10x függvény zérushelyei?',
        options: [
          'x₁ = 0 és x₂ = 5',
          'x₁ = 0 és x₂ = -5',
          'x₁ = 2 és x₂ = 10',
          'x₁ = -2 és x₂ = 5'
        ],
        correctAnswer: 'x₁ = 0 és x₂ = 5',
        explanation: 'Kiemelve 2x-et: 2x(x - 5) = 0. Ebből 2x = 0 ⇒ x = 0, illetve x - 5 = 0 ⇒ x = 5.'
      },
      {
        id: 'qgq1-4',
        questionTypeBadge: 'Csúcspont x-koordináta',
        question: 'Mennyi a g(x) = 2x² - 10x függvény csúcspontjának x-koordinátája?',
        options: [
          'x = 2,5',
          'x = 5',
          'x = -2,5',
          'x = 2'
        ],
        correctAnswer: 'x = 2,5',
        explanation: 'A zérushelyek (0 és 5) felezőpontja: u = (0 + 5) / 2 = 2,5. Képlettel: u = -b / (2a) = -(-10) / (2 · 2) = 10 / 4 = 2,5.'
      },
      {
        id: 'qgq1-5',
        questionTypeBadge: 'Zérushelyek',
        question: 'Melyek a g(x) = -x² + 6x függvény zérushelyei?',
        options: [
          'x₁ = 0 és x₂ = 6',
          'x₁ = 0 és x₂ = -6',
          'x₁ = 3 és x₂ = -3',
          'x₁ = -6 és x₂ = 6'
        ],
        correctAnswer: 'x₁ = 0 és x₂ = 6',
        explanation: 'Kiemelve -x-et: -x(x - 6) = 0. Zérushelyek: x = 0 és x = 6.'
      },
      {
        id: 'qgq1-6',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Mi a g(x) = -x² + 6x parabola szimmetriatengelyének egyenlete?',
        options: [
          'x = 3',
          'x = -3',
          'y = 3',
          'x = 6'
        ],
        correctAnswer: 'x = 3',
        explanation: 'A zérushelyek (0 és 6) számtani közepe: (0 + 6) / 2 = 3. A tengely egyenlete: x = 3.'
      },
      {
        id: 'qgq1-7',
        questionTypeBadge: 'y-tengelymetszet',
        question: 'Hol metszi az y-tengelyt az f(x) = 3x² - 7x - 5 függvény grafikonja?',
        options: [
          'A (0; -5) pontban',
          'A (-5; 0) pontban',
          'A (0; 3) pontban',
          'A (0; -7) pontban'
        ],
        correctAnswer: 'A (0; -5) pontban',
        explanation: 'Az y-tengelyen x = 0. Behelyettesítve: f(0) = 3(0)² - 7(0) - 5 = -5. A metszéspont a (0; -5).'
      },
      {
        id: 'qgq1-8',
        questionTypeBadge: 'Eltolás összefüggés',
        question: 'Ha g(x) = x² - 4x csúcspontja (2; -4), mi lesz az f(x) = x² - 4x + 7 függvény csúcspontja?',
        options: [
          'V(2; 3)',
          'V(2; -11)',
          'V(9; -4)',
          'V(-5; -4)'
        ],
        correctAnswer: 'V(2; 3)',
        explanation: 'Mivel f(x) = g(x) + 7, a grafikon függőlegesen 7 egységgel tolódik feljebb. Az x-koordináta marad 2, az y-koordináta: -4 + 7 = 3. Tehát V(2; 3).'
      },
      {
        id: 'qgq1-9',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Oldd meg szorzattá alakítással az 0,5x² + 3x = 0 egyenletet!',
        options: [
          'x₁ = 0 és x₂ = -6',
          'x₁ = 0 és x₂ = 6',
          'x₁ = 0 és x₂ = -3',
          'x₁ = -1,5 és x₂ = 1,5'
        ],
        correctAnswer: 'x₁ = 0 és x₂ = -6',
        explanation: 'Kiemelve x-et: x(0,5x + 3) = 0. Ebből x = 0 vagy 0,5x + 3 = 0 ⇒ 0,5x = -3 ⇒ x = -6.'
      },
      {
        id: 'qgq1-10',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Mi a szimmetriatengelye az f(x) = x² - 12 függvénynek?',
        options: [
          'x = 0 (az y-tengely)',
          'x = 12',
          'x = -12',
          'y = 0'
        ],
        correctAnswer: 'x = 0 (az y-tengely)',
        explanation: 'Mivel az elsőfokú tag hiányzik (b = 0), a szimmetriatengely u = -0 / (2 · 1) = 0, vagyis maga az y-tengely.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: A parabola 5 nevezetes pontja és geometriája',
    subtitle: 'y-metszet tükörképe, csúcspont, valós zérushelyek száma és elhelyezkedése.',
    range: '11–20. feladat',
    focus: '5 nevezetes pont, tükörkép (2u; c), csúcs és zérushelyek',
    questions: [
      {
        id: 'qgq2-1',
        questionTypeBadge: 'Tükörkép meghatározása',
        question: 'Egy parabola szimmetriatengelye x = 3, és az y-tengelyt a (0; 5) pontban metszi. Mi a (0; 5) pont tükörképe a szimmetriatengelyre nézve?',
        options: [
          '(6; 5)',
          '(3; 5)',
          '(6; -5)',
          '(5; 3)'
        ],
        correctAnswer: '(6; 5)',
        explanation: 'A (0; 5) pont távolsága a tengelytől 3 egység. A túloldalon ugyanolyan 3 egység távolságra a 3 + 3 = 6 pont található azonos y = 5 magasságban: (2u; c) = (2 · 3; 5) = (6; 5).'
      },
      {
        id: 'qgq2-2',
        questionTypeBadge: '5 nevezetes pont',
        question: 'Az f(x) = x² - 6x + 8 függvény y-tengelymetszete (0; 8), csúcspontja V(3; -1). Mi az y-tengelymetszet tükörképe?',
        options: [
          '(6; 8)',
          '(3; 8)',
          '(8; 6)',
          '(6; -1)'
        ],
        correctAnswer: '(6; 8)',
        explanation: 'Mivel u = 3, a tükörkép x-koordinátája 2u = 2 · 3 = 6. A magassága megegyezik a tengelymetszetével (8), tehát a pont: (6; 8).'
      },
      {
        id: 'qgq2-3',
        questionTypeBadge: 'Zérushelyek meghatározása',
        question: 'Melyek az f(x) = x² - 6x + 8 függvény zérushelyei?',
        options: [
          'x₁ = 2 és x₂ = 4',
          'x₁ = -2 és x₂ = -4',
          'x₁ = 1 és x₂ = 8',
          'x₁ = 3 és x₂ = -1'
        ],
        correctAnswer: 'x₁ = 2 és x₂ = 4',
        explanation: 'x² - 6x + 8 = (x - 2)(x - 4) = 0, így a zérushelyek x₁ = 2 és x₂ = 4. Vegyük észre: a zérushelyek felezőpontja (2 + 4) / 2 = 3, pontosan a csúcs x-koordinátája!'
      },
      {
        id: 'qgq2-4',
        questionTypeBadge: 'Csúcspont képlete',
        question: 'Határozd meg az f(x) = 2x² - 8x + 3 parabola csúcspontját az u = -b / (2a) képlettel!',
        options: [
          'V(2; -5)',
          'V(2; 3)',
          'V(-2; 27)',
          'V(4; 3)'
        ],
        correctAnswer: 'V(2; -5)',
        explanation: 'u = -(-8) / (2 · 2) = 8 / 4 = 2. A magasság: v = f(2) = 2(2)² - 8(2) + 3 = 8 - 16 + 3 = -5. Tehát V(2; -5).'
      },
      {
        id: 'qgq2-5',
        questionTypeBadge: 'Tükörkép koordináta',
        question: 'Az f(x) = -x² + 4x - 1 függvény csúcsa V(2; 3). Mi a (0; -1) pont tengelyes tükörképe?',
        options: [
          '(4; -1)',
          '(2; -1)',
          '(4; 3)',
          '(-4; -1)'
        ],
        correctAnswer: '(4; -1)',
        explanation: 'A szimmetriatengely x = 2. A tükörkép x = 2 · 2 = 4, y-értéke marad -1. Tehát a pont: (4; -1).'
      },
      {
        id: 'qgq2-6',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van a valós számok halmazán az f(x) = (x - 3)² + 4 függvénynek?',
        options: [
          '0 (nincs zérushelye)',
          '1 zérushelye van',
          '2 zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: '0 (nincs zérushelye)',
        explanation: 'A parabola felfelé nyílik (a = 1 > 0) és a csúcspontja V(3; 4), vagyis a minimális értéke 4. Mivel sosem éri el a 0-t (mindig f(x) ≥ 4), nincs valós zérushelye.'
      },
      {
        id: 'qgq2-7',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Mikor érinti egy másodfokú függvény grafikonja pontosan egyetlen pontban az x-tengelyt?',
        options: [
          'Ha a csúcspont y-koordinátája v = 0 (teljes négyzet)',
          'Ha az y-tengelymetszete 0',
          'Ha a = 1',
          'Ha b = 0'
        ],
        correctAnswer: 'Ha a csúcspont y-koordinátája v = 0 (teljes négyzet)',
        explanation: 'Ha a csúcspont magassága v = 0, akkor a parabola csúcsa pontosan az x-tengelyre esik, így egyetlen érintési pontja (kétszeres gyöke) van.'
      },
      {
        id: 'qgq2-8',
        questionTypeBadge: 'Zérushelyek szimmetriája',
        question: 'Egy másodfokú függvény szimmetriatengelye x = -1, és egyik zérushelye x₁ = 3. Mi a másik zérushelye?',
        options: [
          'x₂ = -5',
          'x₂ = -3',
          'x₂ = 1',
          'x₂ = -4'
        ],
        correctAnswer: 'x₂ = -5',
        explanation: 'A tengely a két zérushely felezőpontja: (x₁ + x₂) / 2 = u ⇒ (3 + x₂) / 2 = -1 ⇒ 3 + x₂ = -2 ⇒ x₂ = -5.'
      },
      {
        id: 'qgq2-9',
        questionTypeBadge: 'Segédfüggvény csúcspontja',
        question: 'Mi a g(x) = x² + 6x segédfüggvény csúcspontja?',
        options: [
          'V(-3; -9)',
          'V(3; 27)',
          'V(-3; 0)',
          'V(0; 0)'
        ],
        correctAnswer: 'V(-3; -9)',
        explanation: 'A zérushelyek 0 és -6, a felezőpont u = -3. g(-3) = (-3)² + 6(-3) = 9 - 18 = -9. Tehát V(-3; -9).'
      },
      {
        id: 'qgq2-10',
        questionTypeBadge: 'Függőleges eltolás',
        question: 'Ha g(x) = x² + 6x csúcspontja (-3; -9), mi lesz az f(x) = x² + 6x + 5 függvény csúcspontja és értékkészlete?',
        options: [
          'V(-3; -4) és ÉK: [-4; ∞[',
          'V(-3; -14) és ÉK: [-14; ∞[',
          'V(3; -4) és ÉK: ]-∞; -4]',
          'V(-3; 5) és ÉK: [5; ∞['
        ],
        correctAnswer: 'V(-3; -4) és ÉK: [-4; ∞[',
        explanation: 'f(x) = g(x) + 5, tehát a csúcs y-koordinátája: -9 + 5 = -4. Mivel a = 1 > 0, a parabola felfelé nyílik, így értékkészlete [-4; ∞[.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Teljes körű jellemzés, egyenlőtlenségek és alkalmazások',
    subtitle: 'Monotonitási intervallumok, értékkészlet, előjelvizsgálat és grafikus megoldás.',
    range: '21–30. feladat',
    focus: 'ÉK, monotonitás, f(x) > 0, egyenlőtlenségek grafikus megoldása',
    questions: [
      {
        id: 'qgq3-1',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi a valós számok halmazán értelmezett f(x) = -2(x - 3)² + 8 függvény értékkészlete?',
        options: [
          ']-∞; 8]',
          '[8; ∞[',
          ']-∞; -2]',
          '[-2; 8]'
        ],
        correctAnswer: ']-∞; 8]',
        explanation: 'A főegyüttható a = -2 < 0, így a parabola lefelé nyílik, maximuma van a csúcspontban: V(3; 8). A felvehető értékek legfeljebb 8-ak: ÉK = ]-∞; 8].'
      },
      {
        id: 'qgq3-2',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton növekvő az f(x) = (x - 4)² - 5 függvény?',
        options: [
          '[4; ∞[',
          ']-∞; 4]',
          '[-5; ∞[',
          ']-∞; -5]'
        ],
        correctAnswer: '[4; ∞[',
        explanation: 'A parabola csúcsa V(4; -5) és felfelé nyílik (a = 1 > 0). A csúcstól jobbra, azaz a [4; ∞[ zárt intervallumon a függvény értékei növekednek.'
      },
      {
        id: 'qgq3-3',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton csökkenő az f(x) = -(x + 2)² + 3 függvény?',
        options: [
          '[-2; ∞[',
          ']-∞; -2]',
          '[3; ∞[',
          ']-∞; 3]'
        ],
        correctAnswer: '[-2; ∞[',
        explanation: 'A parabola lefelé nyílik (maximum van u = -2-nél). A tetőponttól jobbra, a [-2; ∞[ intervallumon a függvény szigorúan monoton csökken.'
      },
      {
        id: 'qgq3-4',
        questionTypeBadge: 'Előjelvizsgálat',
        question: 'Az f(x) = x² - 4x - 5 függvény zérushelyei x₁ = -1 és x₂ = 5, a = 1. Mely intervallumokon vesz fel negatív értékeket (f(x) < 0)?',
        options: [
          ']-1; 5[',
          ']-∞; -1[ ∪ ]5; ∞[',
          '[-1; 5]',
          ']-∞; 2['
        ],
        correctAnswer: ']-1; 5[',
        explanation: 'Mivel a = 1 > 0, a parabola felfelé nyílik. Az x-tengely alá a két zérushely között süllyed le, tehát f(x) < 0 pontosan a ]-1; 5[ nyílt intervallumon.'
      },
      {
        id: 'qgq3-5',
        questionTypeBadge: 'Egyenlőtlenség',
        question: 'Oldd meg grafikusan az x² - 6x + 8 ≤ 0 egyenlőtlenséget a valós számok halmazán!',
        options: [
          'x ∈ [2; 4]',
          'x ∈ ]-∞; 2] ∪ [4; ∞[',
          'x ∈ ]2; 4[',
          'x ∈ [3; ∞['
        ],
        correctAnswer: 'x ∈ [2; 4]',
        explanation: 'Az f(x) = x² - 6x + 8 parabola zérushelyei 2 és 4, felfelé nyílik. A görbe pontosan a [2; 4] zárt intervallumon halad az x-tengelyen vagy alatta (≤ 0).'
      },
      {
        id: 'qgq3-6',
        questionTypeBadge: 'Egyenlőtlenség',
        question: 'Milyen x valós számokra igaz, hogy -x² + 9 > 0?',
        options: [
          'x ∈ ]-3; 3[',
          'x ∈ ]-∞; -3[ ∪ ]3; ∞[',
          'x ∈ [-3; 3]',
          'x ∈ ]0; 3['
        ],
        correctAnswer: 'x ∈ ]-3; 3[',
        explanation: 'A g(x) = -x² + 9 lefelé nyíló parabola, zérushelyei -3 és 3. A két zérushely között halad a tengely felett (> 0), így a megoldás: ]-3; 3[.'
      },
      {
        id: 'qgq3-7',
        questionTypeBadge: 'Érettségi feladattípus',
        question: 'Egy másodfokú függvényről tudjuk, hogy zérushelyei x₁ = -2 és x₂ = 3, valamint f(0) = -12. Mi a függvény hozzárendelési szabálya?',
        options: [
          'f(x) = 2x² - 2x - 12',
          'f(x) = x² - x - 12',
          'f(x) = -2x² + 2x - 12',
          'f(x) = 2x² + 2x - 12'
        ],
        correctAnswer: 'f(x) = 2x² - 2x - 12',
        explanation: 'Gyöktényezős alak: f(x) = a(x + 2)(x - 3). Behelyettesítve x = 0-t: f(0) = a(2)(-3) = -6a = -12 ⇒ a = 2. Így f(x) = 2(x² - x - 6) = 2x² - 2x - 12.'
      },
      {
        id: 'qgq3-8',
        questionTypeBadge: 'Alkalmazás: Téglalap terület',
        question: 'Egy kerítés melletti téglalap alakú virágágyás területe a kordon hosszából adódóan T(x) = x(10 - 2x). Milyen x értéknél lesz maximális a terület?',
        options: [
          'x = 2,5',
          'x = 5',
          'x = 10',
          'x = 2'
        ],
        correctAnswer: 'x = 2,5',
        explanation: 'A T(x) = -2x² + 10x lefelé nyíló parabola. Zérushelyei: x₁ = 0 és 10 - 2x = 0 ⇒ x₂ = 5. A maximum pontosan a két zérushely felezőjében van: x = (0 + 5) / 2 = 2,5.'
      },
      {
        id: 'qgq3-9',
        questionTypeBadge: 'Mindig pozitív függvény',
        question: 'Melyik állítás igaz az f(x) = x² + 2x + 5 függvényre a valós számok halmazán?',
        options: [
          'Minden valós x-re f(x) ≥ 4, így nincs zérushelye',
          'Van két valós zérushelye: x = -1 és x = 5',
          'Maximuma van az x = -1 helyen',
          'Értékkészlete ]-∞; 5]'
        ],
        correctAnswer: 'Minden valós x-re f(x) ≥ 4, így nincs zérushelye',
        explanation: 'Teljes négyzetté alakítva: f(x) = (x + 1)² + 4. Mivel (x + 1)² ≥ 0, ezért f(x) ≥ 4 minden x-re. A grafikon magasan az x-tengely felett lebeg.'
      },
      {
        id: 'qgq3-10',
        questionTypeBadge: 'Szélsőérték és Tengely',
        question: 'Határozd meg a valós számokon értelmezett f(x) = 0,1x² - 2,2x függvény szélsőértékének helyét és értékét!',
        options: [
          'Minimumhely: x = 11, minimumérték: y = -12,1',
          'Maximumhely: x = 11, maximumérték: y = 12,1',
          'Minimumhely: x = 22, minimumérték: y = 0',
          'Minimumhely: x = -11, minimumérték: y = -12,1'
        ],
        correctAnswer: 'Minimumhely: x = 11, minimumérték: y = -12,1',
        explanation: 'Kiemelve: 0,1x(x - 22) = 0 ⇒ zérushelyek: 0 és 22. A felezőpont (minimumhely): u = 11. Az érték: f(11) = 0,1(121) - 2,2(11) = 12,1 - 24,2 = -12,1.'
      }
    ]
  }
};

export const QuadraticGraphQuiz: React.FC<QuadraticGraphQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-transz-masodfoku-grafikon-quiz"
      topicTitle="Másodfokú függvények grafikonja Kvíz"
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={QuadraticGraphMatcher}
      sorterComponent={QuadraticGraphSorter}
      theoryLabel="Tananyag áttekintése"
    />
  );
};

