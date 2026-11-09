import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeApplicationMatcher } from './PracticeApplicationMatcher';
import { PracticeApplicationSorter } from './PracticeApplicationSorter';
import {
  ProjectileMotionSvg,
  OptimalAreaFencingSvg,
  GraphicalEquationSvg
} from './PracticeApplicationFigures';

interface PracticeApplicationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Területoptimalizálás kordonnal',
    description: 'Adott kerület (K) esetén a 4-oldalú téglalapok közül a négyzet területe maximális: x = K/4, T = (K/4)². Ha 1 oldal fal: T(x) = x(K - 2x), a maximum x = K/4 és b = K/2 (dupla terület: K²/8)!',
    note: 'A fal melletti kordonban a fallal párhuzamos oldal mindig kétszer akkora, mint a két merőleges oldal.',
    color: 'from-teal-500 to-emerald-600',
    figure: <OptimalAreaFencingSvg size={180} />
  },
  {
    title: 'Függőleges hajítás fizikája',
    description: 'h(t) = -5t² + v₀t + h₀. A parabola lefelé nyílik (a = -5 < 0). A tetőpont ideje: t = v₀ / 10 másodperc. A csúcsmagasság: h_max = h₀ + v₀² / 20.',
    note: 'A földet érés idejét a h(t) = 0 másodfokú egyenlet pozitív megoldása adja.',
    color: 'from-rose-500 to-red-600',
    figure: <ProjectileMotionSvg size={180} />
  },
  {
    title: 'Grafikus egyenletmegoldás',
    description: 'Az f(x) = g(x) egyenlet gyökei a grafikonok metszéspontjainak x-koordinátái. Az f(x) ≤ g(x) egyenlőtlenség megoldása az az intervallum, ahol f a g alatt vagy rajta fut.',
    note: 'Mindig érdemes egyszerű alapfüggvényekre bontani a két oldalt (pl. parabola és egyenes).',
    color: 'from-indigo-500 to-blue-600',
    figure: <GraphicalEquationSvg size={180} />
  },
  {
    title: 'Leszűkített értelmezési tartomány',
    description: 'Ha a függvény egy [a; b] intervallumra van korlátozva, a csúcspont csak akkor szélsőérték, ha u ∈ [a; b]. Egyébként a végpontok f(a) és f(b) értékei adják a szélsőértékeket.',
    note: 'Mindig ellenőrizd, hogy a parabola csúcsa benne van-e az engedélyezett intervallumban!',
    color: 'from-amber-500 to-yellow-600',
    figure: <OptimalAreaFencingSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Geometriai területoptimalizálás',
    subtitle: 'Négyzetes kordon, fal melletti elkerítés és maximális területek.',
    range: '1–10. feladat',
    focus: 'Kordonfeladatok, T(x) = x(K/2 - x) és T(x) = x(K - 2x)',
    questions: [
      {
        id: 'paq1-1',
        questionTypeBadge: 'Területmaximum',
        question: 'Egy 20 méter hosszú drótfonattal egy téglalap alakú kiskertet kerítünk el (mind a 4 oldalt). Mekkora az elérhető legnagyobb terület?',
        options: [
          '25 m²',
          '20 m²',
          '50 m²',
          '100 m²'
        ],
        correctAnswer: '25 m²',
        explanation: 'Félkerület: x + b = 10 ⇒ b = 10 - x. Terület: T(x) = x(10 - x) = -x² + 10x. A csúcspont x = 5 méter (négyzet), a maximális terület T(5) = 5 · 5 = 25 m².'
      },
      {
        id: 'paq1-2',
        questionTypeBadge: 'Oldalhossz optimum',
        question: 'Adott K = 40 m kerületű téglalapok közül melyiknek a legnagyobb a területe?',
        options: [
          'A 10 m × 10 m-es négyzetnek',
          'Az 5 m × 15 m-es téglalapnak',
          'A 8 m × 12 m-es téglalapnak',
          'Az 1 m × 19 m-es téglalapnak'
        ],
        correctAnswer: 'A 10 m × 10 m-es négyzetnek',
        explanation: 'Adott kerületű téglalapok közül mindig a szabályos alakzatnak, azaz a négyzetnek a legnagyobb a területe. x = K / 4 = 40 / 4 = 10 m.'
      },
      {
        id: 'paq1-3',
        questionTypeBadge: 'Fal menti kordon',
        question: 'Egy 20 m hosszú kerítéssel téglalap alakú részt kerítünk el úgy, hogy a telek egyik oldala meglévő kőfal, így csak 3 oldalt kell bekeríteni. Mekkora a maximális terület?',
        options: [
          '50 m²',
          '25 m²',
          '100 m²',
          '40 m²'
        ],
        correctAnswer: '50 m²',
        explanation: 'A kerítés: 2x + b = 20 ⇒ b = 20 - 2x. A terület: T(x) = x(20 - 2x) = -2x² + 20x. A csúcspont x = -20 / (2 · (-2)) = 5 m. Ekkor b = 20 - 2(5) = 10 m. T_max = 5 · 10 = 50 m²!'
      },
      {
        id: 'paq1-4',
        questionTypeBadge: 'Fal menti méretek',
        question: 'Ha 3 oldalt kerítünk el 24 méter kerítéssel egy fal mellett (2x + b = 24), milyen oldalhosszúságok adják a legnagyobb területet?',
        options: [
          'x = 6 m és b = 12 m',
          'x = 8 m és b = 8 m',
          'x = 4 m és b = 16 m',
          'x = 6 m és b = 6 m'
        ],
        correctAnswer: 'x = 6 m és b = 12 m',
        explanation: 'T(x) = x(24 - 2x) = -2x² + 24x. Maximumhely: x = 24 / 4 = 6 m. A fal menti hosszabb oldal: b = 24 - 2(6) = 12 m. T_max = 6 · 12 = 72 m².'
      },
      {
        id: 'paq1-5',
        questionTypeBadge: 'Aránypár fal mellett',
        question: 'Egy fal menti 3-oldalas téglalap alakú kordon esetén milyen arányban állnak a maximális területhez tartozó oldalak (falra merőleges x : fallal párhuzamos b)?',
        options: [
          '1 : 2',
          '1 : 1',
          '1 : 4',
          '2 : 3'
        ],
        correctAnswer: '1 : 2',
        explanation: 'Mivel x_opt = K / 4 és b_opt = K / 2, a falra merőleges oldal és a fallal párhuzamos oldal aránya mindig 1 : 2.'
      },
      {
        id: 'paq1-6',
        questionTypeBadge: 'Számok szorzata',
        question: 'Két valós szám összege 16. Mikor lesz a szorzatuk a lehető legnagyobb, és mennyi ez a maximum?',
        options: [
          'Ha mindkét szám 8, a szorzat maximuma 64',
          'Ha a számok 6 és 10, a szorzat 60',
          'Ha a számok 7 és 9, a szorzat 63',
          'Ha a számok 0 és 16, a szorzat 0'
        ],
        correctAnswer: 'Ha mindkét szám 8, a szorzat maximuma 64',
        explanation: 'Ha x + y = 16, akkor y = 16 - x. A szorzat: P(x) = x(16 - x) = -x² + 16x. A parabola csúcsa x = 8-nál van, így y = 8, a szorzat 8 · 8 = 64.'
      },
      {
        id: 'paq1-7',
        questionTypeBadge: 'Kerület és terület',
        question: 'Egy 12 cm hosszú cérnaszálból zárt 4-oldalú téglalapot hajtogatunk. Mekkora a területe, ha az egyik oldal 2 cm?',
        options: [
          '8 cm²',
          '12 cm²',
          '10 cm²',
          '4 cm²'
        ],
        correctAnswer: '8 cm²',
        explanation: 'Félkerület: 12 / 2 = 6 cm. Ha x = 2 cm, a másik oldal 6 - 2 = 4 cm. A terület: 2 · 4 = 8 cm².'
      },
      {
        id: 'paq1-8',
        questionTypeBadge: 'Maximális cérnaterület',
        question: 'Ugyanabból a 12 cm-es cérnaszálból készíthető-e 9 cm² területű zárt téglalap?',
        options: [
          'Igen, ha 3 cm × 3 cm-es négyzetet készítünk',
          'Nem, a maximum csak 8 cm²',
          'Nem, csak téglalap készíthető, négyzet nem',
          'Igen, ha 1 cm × 5 cm-es téglalapot készítünk'
        ],
        correctAnswer: 'Igen, ha 3 cm × 3 cm-es négyzetet készítünk',
        explanation: 'A 12 cm-es kerületű négyzet oldala 12 / 4 = 3 cm, területe pontosan 3 · 3 = 9 cm², ami a maximálisan elérhető terület.'
      },
      {
        id: 'paq1-9',
        questionTypeBadge: 'Területfüggvény zérushelyei',
        question: 'Mik a zérushelyei a T(x) = x(20 - 2x) területfüggvénynek?',
        options: [
          'x₁ = 0 és x₂ = 10',
          'x₁ = 0 és x₂ = 20',
          'x₁ = 5 és x₂ = 10',
          'x₁ = 0 és x₂ = 5'
        ],
        correctAnswer: 'x₁ = 0 és x₂ = 10',
        explanation: 'x(20 - 2x) = 0 ⇒ x = 0 vagy 20 - 2x = 0 ⇒ 2x = 20 ⇒ x = 10. Geometriailag: 0-nál és 10-nél a téglalap területe 0-vá fajul.'
      },
      {
        id: 'paq1-10',
        questionTypeBadge: 'Felezőpont elve',
        question: 'Hogyan határozható meg a T(x) = x(20 - 2x) függvény csúcspontja a zérushelyekből?',
        options: [
          'A két zérushely (0 és 10) számtani közepe: (0 + 10) / 2 = 5',
          'A zérushelyek szorzata: 0 · 10 = 0',
          'A nagyobbik zérushely fele: 10 / 2 = 5',
          'Csak deriválással határozható meg'
        ],
        correctAnswer: 'A két zérushely (0 és 10) számtani közepe: (0 + 10) / 2 = 5',
        explanation: 'A parabola szimmetriatengelye mindig a zérushelyek számtani közepénél metszi az x-tengelyt: u = (0 + 10) / 2 = 5.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Fizikai és gazdasági modellezés',
    subtitle: 'Függőleges hajítás, toronyból dobott kislabda és terepjárók tömege.',
    range: '11–20. feladat',
    focus: 'h(t) = -5t² + v₀t + h₀, költség- és tömegmodellek',
    questions: [
      {
        id: 'paq2-1',
        questionTypeBadge: 'Függőleges hajítás tetőpont',
        question: 'Egy kislabdát a talajról függőlegesen felfelé elhajítanak v₀ = 20 m/s kezdősebességgel: h(t) = -5t² + 20t. Hány másodperc múlva éri el a pálya tetőpontját?',
        options: [
          '2 másodperc',
          '4 másodperc',
          '1 másodperc',
          '10 másodperc'
        ],
        correctAnswer: '2 másodperc',
        explanation: 'A tetőpont ideje: t = -b / (2a) = -20 / (2 · (-5)) = 20 / 10 = 2 másodperc.'
      },
      {
        id: 'paq2-2',
        questionTypeBadge: 'Maximális magasság',
        question: 'Mekkora maximális magasságot ér el a h(t) = -5t² + 20t függvény által leírt kislabda?',
        options: [
          '20 méter',
          '40 méter',
          '15 méter',
          '25 méter'
        ],
        correctAnswer: '20 méter',
        explanation: 'Behelyettesítve t = 2-t: h(2) = -5(2)² + 20(2) = -20 + 40 = 20 méter.'
      },
      {
        id: 'paq2-3',
        questionTypeBadge: 'Visszaérkezés talajra',
        question: 'Mikor ér vissza a talajra (h = 0) a talajról elhajított h(t) = -5t² + 20t labda?',
        options: [
          '4 másodperc múlva',
          '2 másodperc múlva',
          '5 másodperc múlva',
          '8 másodperc múlva'
        ],
        correctAnswer: '4 másodperc múlva',
        explanation: '-5t² + 20t = 0 ⇒ -5t(t - 4) = 0. A kiindulás t = 0, a földet érés ideje t = 4 másodperc (a tetőpont idejének pontosan a kétszerese a szimmetria miatt!).'
      },
      {
        id: 'paq2-4',
        questionTypeBadge: 'Tankönyvi feladat: Torony',
        question: 'Egy 40 m magas toronyból függőlegesen felhajítanak egy labdát: h(t) = -5t² + 10t + 40. Mikor éri el a labda a maximális magasságát, és mekkora ez a magasság?',
        options: [
          't = 1 s múlva, h_max = 45 m',
          't = 2 s múlva, h_max = 50 m',
          't = 1 s múlva, h_max = 40 m',
          't = 0,5 s múlva, h_max = 42,5 m'
        ],
        correctAnswer: 't = 1 s múlva, h_max = 45 m',
        explanation: 't_tető = -10 / (2 · (-5)) = 1 másodperc. A csúcsmagasság: h(1) = -5(1)² + 10(1) + 40 = -5 + 10 + 40 = 45 méter.'
      },
      {
        id: 'paq2-5',
        questionTypeBadge: 'Becsapódás toronyból',
        question: 'Hány másodperc múlva éri el a talajt (h = 0) a 40 m magasból indított h(t) = -5t² + 10t + 40 labda?',
        options: [
          '4 másodperc múlva',
          '2 másodperc múlva',
          '5 másodperc múlva',
          '3 másodperc múlva'
        ],
        correctAnswer: '4 másodperc múlva',
        explanation: '-5t² + 10t + 40 = 0 ⇒ osztva -5-tel: t² - 2t - 8 = 0 ⇒ (t - 4)(t + 2) = 0. Mivel az idő nemnegatív, t = 4 másodperc.'
      },
      {
        id: 'paq2-6',
        questionTypeBadge: 'Tankönyvi feladat: Terepjáró',
        question: 'Egy terepjáró tömegét az m(t) = 1,5t² - 45t + 2100 függvény adja meg (ahol t = 0 az 1970-es év). Melyik évben volt a legkisebb a terepjáró átlagos tömege?',
        options: [
          '1985-ben (t = 15)',
          '1990-ben (t = 20)',
          '1980-ban (t = 10)',
          '1975-ben (t = 5)'
        ],
        correctAnswer: '1985-ben (t = 15)',
        explanation: 'A minimum helye: t = -b / (2a) = -(-45) / (2 · 1,5) = 45 / 3 = 15. Az 1970 + 15 = 1985-ös év!'
      },
      {
        id: 'paq2-7',
        questionTypeBadge: 'Minimális tömeg értéke',
        question: 'Hány kilogramm volt a terepjárók legkisebb átlagos tömege az m(t) = 1,5t² - 45t + 2100 modell szerint?',
        options: [
          '1762,5 kg',
          '1800 kg',
          '1650 kg',
          '1925 kg'
        ],
        correctAnswer: '1762,5 kg',
        explanation: 'Behelyettesítve t = 15-öt: m(15) = 1,5(225) - 45(15) + 2100 = 337,5 - 675 + 2100 = 1762,5 kg.'
      },
      {
        id: 'paq2-8',
        questionTypeBadge: 'Gazdasági költségminimum',
        question: 'Egy üzem napi költségét a K(x) = 2x² - 40x + 500 függvény írja le (ezer Ft-ban), ahol x a megtermelt termékek száma. Hány termék gyártása esetén a legkisebb a költség?',
        options: [
          '10 termék',
          '20 termék',
          '40 termék',
          '5 termék'
        ],
        correctAnswer: '10 termék',
        explanation: 'x_min = -b / (2a) = -(-40) / (2 · 2) = 40 / 4 = 10 termék.'
      },
      {
        id: 'paq2-9',
        questionTypeBadge: 'Keresleti görbe & Bevétel',
        question: 'Egy mozi jegybevétele B(p) = p(1000 - 0,5p). Milyen jegyár (p) mellett éri el a mozi a maximális bevételt?',
        options: [
          '1000 Ft',
          '2000 Ft',
          '500 Ft',
          '1500 Ft'
        ],
        correctAnswer: '1000 Ft',
        explanation: 'B(p) = -0,5p² + 1000p. A zérushelyek 0 és 2000 Ft. A maximum a kettő felezőpontjában: p = 1000 Ft.'
      },
      {
        id: 'paq2-10',
        questionTypeBadge: 'Értelmezési tartomány határa',
        question: 'Miért csak a t ∈ [0; 4] intervallumon értelmezzük a toronyból elhajított labda h(t) = -5t² + 10t + 40 magasságfüggvényét?',
        options: [
          'Mert a labda t = 4 s-nál földet ér, és nem fúródik a föld alá',
          'Mert a negatív számoknak nincs négyzetgyöke',
          'Mert 4 másodperc után elfogy a gravitáció',
          'Mert t = 4-nél van a tetőpont'
        ],
        correctAnswer: 'Mert a labda t = 4 s-nál földet ér, és nem fúródik a föld alá',
        explanation: 'A valós fizikai folyamat csak a talajszint eléréséig (h ≥ 0) érvényes, a labda t = 4 s-nál becsapódik.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Grafikus egyenletmegoldás és korlátos tartományok',
    subtitle: 'Metszéspontok, egyenlőtlenségek és szélsőértékek zárt intervallumon.',
    range: '21–30. feladat',
    focus: 'f(x) = g(x) grafikus megoldása, korlátos tartományok értékkészlete',
    questions: [
      {
        id: 'paq3-1',
        questionTypeBadge: 'Grafikus egyenletmegoldás',
        question: 'Mik a megoldásai az (x - 2)² - 1 = x - 1 egyenletnek a mellékelt grafikus ábrázolás alapján?',
        options: [
          'x₁ = 1 és x₂ = 4',
          'x₁ = 0 és x₂ = 3',
          'x₁ = -1 és x₂ = 2',
          'x₁ = 2 és x₂ = 5'
        ],
        correctAnswer: 'x₁ = 1 és x₂ = 4',
        explanation: 'Algebrailag: x² - 4x + 3 = x - 1 ⇒ x² - 5x + 4 = 0 ⇒ (x - 1)(x - 4) = 0. A grafikonon az M₁(1; 0) és M₂(4; 3) pontok x-koordinátái: x = 1 és x = 4.'
      },
      {
        id: 'paq3-2',
        questionTypeBadge: 'Grafikus egyenlőtlenség',
        question: 'Mely x valós számokra teljesül, hogy (x - 2)² - 1 ≤ x - 1?',
        options: [
          'x ∈ [1; 4]',
          'x ∈ ]-∞; 1] ∪ [4; ∞[',
          'x ∈ ]1; 4[',
          'x ∈ [2; 5]'
        ],
        correctAnswer: 'x ∈ [1; 4]',
        explanation: 'A parabola pontosan az [1; 4] zárt intervallumon halad az egyenes alatt vagy metszi azt.'
      },
      {
        id: 'paq3-3',
        questionTypeBadge: 'Abszolútértékes egyenlet',
        question: 'Grafikusan oldd meg az |x - 1| = 2 egyenletet!',
        options: [
          'x₁ = -1 és x₂ = 3',
          'x₁ = 1 és x₂ = 3',
          'x₁ = -3 és x₂ = 3',
          'x₁ = 0 és x₂ = 2'
        ],
        correctAnswer: 'x₁ = -1 és x₂ = 3',
        explanation: 'Az f(x) = |x - 1| „V”-alakú grafikonját a vízszintes y = 2 egyenes az x = -1 és x = 3 helyeken metszi.'
      },
      {
        id: 'paq3-4',
        questionTypeBadge: 'Abszolútértékes egyenlőtlenség',
        question: 'Mely valós x-ekre igaz, hogy |x - 1| ≤ 2?',
        options: [
          'x ∈ [-1; 3]',
          'x ∈ ]-∞; -1] ∪ [3; ∞[',
          'x ∈ [0; 2]',
          'x ∈ ]-1; 3['
        ],
        correctAnswer: 'x ∈ [-1; 3]',
        explanation: 'A „V”-grafikon az y = 2 magasság alatt az x = -1 és x = 3 közötti zárt intervallumon helyezkedik el: [-1; 3].'
      },
      {
        id: 'paq3-5',
        questionTypeBadge: 'Zárt intervallum ÉK',
        question: 'Adott a g: [1; 4] → ℝ, g(x) = (x - 2)² függvény. Mi a függvény értékkészlete ezen a zárt intervallumon?',
        options: [
          '[0; 4]',
          '[1; 4]',
          '[0; 1]',
          '[-2; 4]'
        ],
        correctAnswer: '[0; 4]',
        explanation: 'A parabola csúcsa x = 2-nél van, ahol g(2) = 0. Mivel 2 ∈ [1; 4], a minimális érték 0! A végpontok: g(1) = 1, g(4) = (4 - 2)² = 4. A maximális érték 4, tehát ÉK = [0; 4].'
      },
      {
        id: 'paq3-6',
        questionTypeBadge: 'Zárt intervallum: kieső csúcs',
        question: 'Mi az f: [3; 6] → ℝ, f(x) = (x - 1)² + 2 függvény értékkészlete?',
        options: [
          '[6; 27]',
          '[2; 27]',
          '[3; 6]',
          '[2; 6]'
        ],
        correctAnswer: '[6; 27]',
        explanation: 'A parabola csúcsa x = 1-nél van, de 1 NEM eleme a [3; 6] intervallumnak! A függvény a [3; 6] intervallumon szigorúan monoton nő. f(3) = (2)² + 2 = 6, f(6) = (5)² + 2 = 27. ÉK = [6; 27].'
      },
      {
        id: 'paq3-7',
        questionTypeBadge: 'Nyílt-zárt intervallum',
        question: 'Adott az f: ]-2; 2] → ℝ, f(x) = |x - 1| függvény. Mi az értékkészlete?',
        options: [
          '[0; 3[',
          '[0; 1]',
          ']0; 3]',
          '[1; 3]'
        ],
        correctAnswer: '[0; 3[',
        explanation: 'A töréspont x = 1 ∈ ]-2; 2], ahol f(1) = 0 (zárt alsó határ). A bal végpontnál: x → -2 esetén |-2 - 1| = 3, de -2 nyílt végpont, így 3-at nem éri el. A jobb végpontnál f(2) = 1. ÉK = [0; 3[.'
      },
      {
        id: 'paq3-8',
        questionTypeBadge: 'Grafikus egyenlet megoldásszám',
        question: 'Hány valós megoldása van az x² - 2 = -|x| egyenletnek?',
        options: [
          '2 megoldása van',
          '0 megoldása van',
          '4 megoldása van',
          '1 megoldása van'
        ],
        correctAnswer: '2 megoldása van',
        explanation: 'Az f(x) = x² - 2 lefelé tolt parabola (csúcs (0; -2)), a g(x) = -|x| lefelé nyíló „V” tetőpontja az origóban van. A két grafikon pontosan két szimmetrikus pontban metszi egymást (x = ±1).'
      },
      {
        id: 'paq3-9',
        questionTypeBadge: 'Érettségi feladat',
        question: 'Melyik az az egyetlen valós szám, amelyre (x + 3)² = -2x - 6 teljesül?',
        options: [
          'x = -3',
          'x = 3',
          'x = 0',
          'Nincs ilyen valós szám'
        ],
        correctAnswer: 'x = -3',
        explanation: '(x + 3)² = -2(x + 3) ⇒ (x + 3)² + 2(x + 3) = 0 ⇒ (x + 3)(x + 3 + 2) = 0 ⇒ x₁ = -3, x₂ = -5. Az x = -3 esetén mindkét oldal pontosan 0.'
      },
      {
        id: 'paq3-10',
        questionTypeBadge: 'Összegzés és modellezés',
        question: 'Egy kőhajítás pályáját y = -0,05x² + x írja le, ahol x a vízszintes távolság, y a magasság méterben. Milyen messzire repült a kő (hol ér földet)?',
        options: [
          '20 méter',
          '10 méter',
          '40 méter',
          '5 méter'
        ],
        correctAnswer: '20 méter',
        explanation: 'A földet érésnél y = 0: -0,05x² + x = 0 ⇒ x(-0,05x + 1) = 0. Ebből x = 0 (elhajítás helye) vagy -0,05x + 1 = 0 ⇒ 0,05x = 1 ⇒ x = 1 / 0,05 = 20 méter.'
      }
    ]
  }
};

export const PracticeApplicationQuiz: React.FC<PracticeApplicationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-transz-alkalmazas-quiz"
      topicTitle="Gyakorlás, alkalmazás Kvíz"
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={PracticeApplicationMatcher}
      sorterComponent={PracticeApplicationSorter}
      theoryLabel="Tananyag áttekintése"
    />
  );
};

