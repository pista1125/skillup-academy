import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticSystemsMatcher } from './QuadraticSystemsMatcher';
import { QuadraticSystemsSorter } from './QuadraticSystemsSorter';
import {
  LineAndParabolaIntersectionSvg,
  SymmetricSystemVieteBridgeSvg,
  CircleAndLineSystemSvg,
  EliminationQuadraticsSvg,
  OrderedPairsVerificationSvg
} from './QuadraticSystemsFigures';

interface QuadraticSystemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Behelyettesítő módszer (Lineáris + Másodfokú)',
    description:
      'Ha az egyik egyenlet elsőfokú, abból fejezd ki a legegyszerűbb ismeretlent (pl. y = mx + d), majd helyettesítsd be a másodfokú egyenletbe! A kapott másodfokú egyenlet diszkriminánsa mutatja a megoldások számát: D > 0 (2 metszéspont), D = 0 (1 érintési pont), D < 0 (nincs metszéspont).',
    note: 'Aranyszabály: Minden x gyökhöz a hozzá tartozó y-t kell kiszámolni!',
    color: 'from-orange-500 to-amber-600',
    figure: <LineAndParabolaIntersectionSvg size={260} />
  },
  {
    title: 'Szimmetrikus rendszerek és a Viète-híd',
    description:
      'Ha a rendszer x + y = S és x · y = P alakú, x és y az u² - Su + P = 0 egyenlet gyökei. A szimmetria miatt mindkét rendezett számpár megoldás: (x₁; y₁) = (u₁; u₂) és (x₂; y₂) = (u₂; u₁)!',
    note: 'Tipp: x² + y² = (x + y)² - 2xy azonossággal a négyzetösszeg azonnal összegre és szorzatra bontható!',
    color: 'from-amber-500 to-orange-600',
    figure: <SymmetricSystemVieteBridgeSvg size={260} />
  },
  {
    title: 'Tagelimináció és megoldáspárok',
    description:
      'Két másodfokú egyenlet esetén kivonással kiejthetők a négyzetes tagok (x², y²), így egyszerű lineáris kapcsolathoz jutunk. A végső megoldást mindig összetartozó rendezett számpárokban kell megadni: M = {(x₁; y₁); (x₂; y₂)}!',
    note: 'Fontos: Soha ne adj meg külön x és y értékeket összefűzés nélkül!',
    color: 'from-orange-600 to-rose-600',
    figure: <OrderedPairsVerificationSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapozó behelyettesítés és szimmetrikus rendszerek',
    subtitle: '10 alapvető feladat: lineáris behelyettesítés, Viète-számpárok és megoldások formája',
    range: '1–10. kérdés',
    focus: 'Behelyettesítés algoritmusa, összeg és szorzat rendszere, rendezett számpárok',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'qsq-1-1',
        question: 'Oldd meg a rendszert: x + y = 7  és  x · y = 10!',
        options: [
          'M = {(2; 5); (5; 2)}',
          'Csak (2; 5)',
          'M = {(1; 6); (6; 1)}',
          'M = {(-2; -5); (-5; -2)}'
        ],
        correctAnswer: 0,
        explanation: 'Az u² - 7u + 10 = 0 egyenlet gyökei 2 és 5. A szimmetria miatt mindkét számpár megoldás: (2; 5) és (5; 2).',
        hint: 'Melyik két szám összege 7 és szorzata 10?'
      },
      {
        id: 'qsq-1-2',
        question: 'Hogyan kezdjük a { y = 2x - 1; x² + y² = 10 } egyenletrendszer megoldását?',
        options: [
          'Az első egyenletből kifejezett y-t behelyettesítjük a másodikba: x² + (2x - 1)² = 10',
          'Összeadjuk a két egyenletet',
          'Mindkét egyenletből négyzetgyököt vonunk',
          'Kivonjuk a második egyenletből az elsőt'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az első egyenlet már eleve kifejezi y-t (y = 2x - 1), ezt behelyettesítjük az x² + y² = 10 egyenlet y helyére.',
        hint: 'A lineáris egyenletből kifejezett ismeretlent behelyettesítjük a másodfokúba.'
      },
      {
        id: 'qsq-1-3',
        question: 'Mi a megoldása az { y = x²; y = 9 } rendszernek?',
        options: [
          'M = {(-3; 9); (3; 9)}',
          'M = {(3; 9)}',
          'M = {(3; 3); (-3; -3)}',
          'M = {(9; 3); (9; -3)}'
        ],
        correctAnswer: 0,
        explanation: 'x² = 9 ⇒ x = 3 vagy x = -3. Mivel mindkét esetben y = 9, a két metszéspont: (-3; 9) és (3; 9).',
        hint: 'A negatív szám négyzete is 9!'
      },
      {
        id: 'qsq-1-4',
        question: 'Melyik segédegyenlet gyökei adják az { x + y = 9; xy = 20 } rendszer megoldásait?',
        options: ['u² - 9u + 20 = 0', 'u² + 9u + 20 = 0', 'u² - 20u + 9 = 0', 'u² + 9u - 20 = 0'],
        correctAnswer: 0,
        explanation: 'A Viète-formulák alapján a két szám összege S = 9, szorzata P = 20, így az egyenlet: u² - Su + P = u² - 9u + 20 = 0.',
        hint: 'A középső tag az összeg ellentettje: -S·u!'
      },
      {
        id: 'qsq-1-5',
        question: 'Oldd meg a rendszert: x + y = 6  és  xy = 9!',
        options: [
          'M = {(3; 3)} (egyetlen érintési megoldáspár)',
          'M = {(3; 3); (-3; -3)}',
          'M = {(0; 6); (6; 0)}',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: 'u² - 6u + 9 = (u - 3)² = 0 ⇒ u = 3 (kétszeres gyök). Ezért x = 3 és y = 3, azaz egyetlen számpár: (3; 3).',
        hint: 'u² - 6u + 9 teljes négyzet!'
      },
      {
        id: 'qsq-1-6',
        question: 'Miért hibás így leírni egy kétismeretlenes rendszer végeredményét: x = 2; 4 és y = 5; 1?',
        options: [
          'Mert nem derül ki, melyik x-hez melyik y tartozik; a megoldást rendezett számpárokban (x; y) kell megadni',
          'Mert x és y nem lehet egyidejűleg két érték',
          'Mert a törteket nem tizedes törtként írtuk le',
          'Ez a felírás teljesen elfogadott'
        ],
        correctAnswer: 0,
        explanation: 'A megoldás számpárokból áll: pl. (2; 5) és (4; 1). Külön felsorolva nem tudjuk, hogyan tartoznak össze a koordináták.',
        hint: 'A koordinátasíkon a pontoknak két koordinátája van: (x; y).'
      },
      {
        id: 'qsq-1-7',
        question: 'Oldd meg: y = x  és  x² + y² = 8!',
        options: [
          'M = {(2; 2); (-2; -2)}',
          'M = {(2; 2)}',
          'M = {(4; 4); (-4; -4)}',
          'M = {(√8; √8)}'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve: x² + x² = 8 ⇒ 2x² = 8 ⇒ x² = 4 ⇒ x = ±2. Mivel y = x, a számpárok: (2; 2) és (-2; -2).',
        hint: 'y helyére írj x-et a második egyenletben!'
      },
      {
        id: 'qsq-1-8',
        question: 'Hány valós megoldáspárja van az { x + y = 2; xy = 5 } rendszernek?',
        options: [
          '0 valós megoldáspár (M = ∅)',
          '1 megoldáspár',
          '2 megoldáspár',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'A segédegyenlet: u² - 2u + 5 = 0. A diszkrimináns D = (-2)² - 4·1·5 = 4 - 20 = -16 < 0. Mivel D < 0, nincs valós megoldás.',
        hint: 'Számold ki az u² - 2u + 5 = 0 diszkriminánsát!'
      },
      {
        id: 'qsq-1-9',
        question: 'Oldd meg: x - y = 4  és  xy = 5!',
        options: [
          'M = {(5; 1); (-1; -5)}',
          'M = {(5; 1); (1; 5)}',
          'M = {(4; 0); (0; -4)}',
          'M = {(5; -1); (-1; 5)}'
        ],
        correctAnswer: 0,
        explanation: 'x = y + 4 ⇒ (y + 4)y = 5 ⇒ y² + 4y - 5 = 0 ⇒ y₁ = 1 (x₁ = 5) és y₂ = -5 (x₂ = -1). Megoldások: (5; 1) és (-1; -5).',
        hint: 'Fejezd ki x-et: x = y + 4!'
      },
      {
        id: 'qsq-1-10',
        question: 'Mi a geometriai jelentése az { y = mx + d; y = ax² + bx + c } rendszernek?',
        options: [
          'Egyenes és parabola metszéspontjainak meghatározása a síkon',
          'Két egyenes metszéspontja',
          'Kör és hiperbola metszése',
          'Egy pont távolsága a síktól'
        ],
        correctAnswer: 0,
        explanation: 'Az első egyenlet egy egyenes, a második egy parabola egyenlete. A közös pontjaik a metszéspontok.',
        hint: 'Az elsőfokú egyenlet grafikonja egyenes, a másodfokúé parabola.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Metszéspontok, körök és diszkrimináns',
    subtitle: '10 geometriai és algebrai feladat: egyenes és kör/parabola metszéspontjai, érintők',
    range: '11–20. kérdés',
    focus: 'Kör és egyenes egyenletrendszere, érintési feltétel (D = 0), pontos gyökpárosítás',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'qsq-2-1',
        question: 'Határozd meg az y = x² és y = x + 2 metszéspontjait!',
        options: [
          'M = {(-1; 1); (2; 4)}',
          'M = {(1; 1); (2; 4)}',
          'M = {(-2; 4); (1; 1)}',
          'M = {(-1; -1); (2; 2)}'
        ],
        correctAnswer: 0,
        explanation: 'x² = x + 2 ⇒ x² - x - 2 = 0 ⇒ x₁ = 2 (y₁ = 4) és x₂ = -1 (y₂ = 1). Metszéspontok: (2; 4) és (-1; 1).',
        hint: 'Egyenlítsd a két y-t: x² = x + 2!'
      },
      {
        id: 'qsq-2-2',
        question: 'Hol metszi az y = 3 egyenes az x² + y² = 25 kört?',
        options: [
          'P₁(-4; 3) és P₂(4; 3)',
          'P₁(-5; 3) és P₂(5; 3)',
          'Csak P(4; 3)',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: 'x² + 3² = 25 ⇒ x² + 9 = 25 ⇒ x² = 16 ⇒ x = ±4. Mivel y = 3, a pontok: (-4; 3) és (4; 3).',
        hint: 'Helyettesíts be y = 3-at a kör egyenletébe!'
      },
      {
        id: 'qsq-2-3',
        question: 'Milyen m meredekség esetén érinti az y = mx egyenes az y = x² + 1 parabolát?',
        options: [
          'm = 2 vagy m = -2',
          'm = 1 vagy m = -1',
          'm = 0',
          'Csak m = 4'
        ],
        correctAnswer: 0,
        explanation: 'x² + 1 = mx ⇒ x² - mx + 1 = 0. Érintő esetén a diszkrimináns D = m² - 4·1·1 = 0 ⇒ m² = 4 ⇒ m = ±2.',
        hint: 'Az érintési feltétel: a másodfokú egyenlet diszkriminánsa D = 0!'
      },
      {
        id: 'qsq-2-4',
        question: 'Oldd meg: y = 2x - 3  és  x² + y² = 5!',
        options: [
          'M = {(2; 1); (0.4; -2.2)}',
          'M = {(1; 2); (-2; -1)}',
          'M = {(2; 1)} (érintő)',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: 'x² + (2x - 3)² = 5 ⇒ x² + 4x² - 12x + 9 = 5 ⇒ 5x² - 12x + 4 = 0. Gyökök: x₁ = 2 (y₁ = 1) és x₂ = 0.4 (y₂ = -2.2).',
        hint: 'Bontsd fel a (2x - 3)² négyzetét: 4x² - 12x + 9!'
      },
      {
        id: 'qsq-2-5',
        question: 'Hány közös pontja van az x² + y² = 9 körnek és az y = 4 egyenesnek?',
        options: [
          '0 közös pont (elkerülő egyenes, mert a kör sugara r = 3 < 4)',
          '1 közös pont',
          '2 közös pont',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'A kör sugara r = √9 = 3. Az y = 4 vízszintes egyenes a kör felett halad (4 > 3), így nem metszi a kört: x² + 16 = 9 ⇒ x² = -7 (lehetetlen).',
        hint: 'Hasonlítsd össze az egyenes távolságát az origótól a kör sugarával!'
      },
      {
        id: 'qsq-2-6',
        question: 'Oldd meg a rendszert: x + y = 1  és  x² + y² = 25!',
        options: [
          'M = {(4; -3); (-3; 4)}',
          'M = {(5; 0); (0; 5)}',
          'M = {(3; -2); (-2; 3)}',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: 'y = 1 - x ⇒ x² + (1 - x)² = 25 ⇒ 2x² - 2x - 24 = 0 ⇒ x² - x - 12 = 0 ⇒ x₁ = 4 (y₁ = -3) és x₂ = -3 (y₂ = 4).',
        hint: 'A gyökök szorzata -12, összege 1.'
      },
      {
        id: 'qsq-2-7',
        question: 'Mi a megoldása az { y = 2x²; y = 4x - 2 } rendszernek?',
        options: [
          'M = {(1; 2)} (pontosan 1 érintési pont)',
          'M = {(1; 2); (-1; -2)}',
          'M = {(0; -2); (2; 6)}',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: '2x² = 4x - 2 ⇒ 2x² - 4x + 2 = 0 ⇒ 2(x - 1)² = 0 ⇒ x = 1 (kétszeres gyök). y = 4(1) - 2 = 2. Megoldás: (1; 2).',
        hint: 'Osztva 2-vel: x² - 2x + 1 = 0, ami teljes négyzet!'
      },
      {
        id: 'qsq-2-8',
        question: 'Egy derékszögű háromszög befogóinak összege a + b = 14 cm, átfogója c = 10 cm. Melyik rendszer írja le a feladatot?',
        options: [
          'a + b = 14  és  a² + b² = 100',
          'a + b = 14  és  a · b = 100',
          'a + b = 14  és  a² + b² = 10',
          'a - b = 14  és  a² + b² = 100'
        ],
        correctAnswer: 0,
        explanation: 'A befogók összege a + b = 14, a Pitagorasz-tétel szerint pedig a² + b² = c² = 10² = 100.',
        hint: 'A Pitagorasz-tételben a befogók négyzeteinek összege az átfogó négyzete!'
      },
      {
        id: 'qsq-2-9',
        question: 'A fenti háromszöges feladatban (a + b = 14 és a² + b² = 100) mekkorák a befogók?',
        options: [
          '6 cm és 8 cm',
          '5 cm és 9 cm',
          '4 cm és 10 cm',
          '7 cm és 7 cm'
        ],
        correctAnswer: 0,
        explanation: 'a² + b² = (a + b)² - 2ab ⇒ 100 = 14² - 2ab = 196 - 2ab ⇒ 2ab = 96 ⇒ ab = 48. Az u² - 14u + 48 = 0 gyökei 6 és 8. A befogók: 6 cm és 8 cm.',
        hint: 'Használd az azonosságot: (a + b)² - 2ab = a² + b²!'
      },
      {
        id: 'qsq-2-10',
        question: 'Mit jelent geometriailag, ha az egyenes és a parabola egyenletrendszerének diszkriminánsa D = 0?',
        options: [
          'Az egyenes érinti a parabolát (pontosan 1 közös pontjuk van)',
          'Az egyenes szeli a parabolát (2 pontban metsz)',
          'Az egyenes elkerüli a parabolát',
          'Az egyenes a parabola szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'D = 0 esetén a másodfokú egyenletnek egyetlen valós (kétszeres) gyöke van, ami az érintési pont abszcisszája.',
        hint: 'Egyetlen közös pont = érintő.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Bajnoki rendszerek és tagelimináció',
    subtitle: '10 emelt szintű feladat: két másodfokú egyenlet, 4 megoldáspáros szimmetria és paraméterek',
    range: '21–30. kérdés',
    focus: 'Tagelimináció két körnél, x² + y² és xy rendszere (4 pár), paraméteres feltételek',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'qsq-3-1',
        question: 'Hány valós számpár teszi igazzá a következő rendszert: x² + y² = 13  és  xy = 6?',
        options: [
          '4 megoldáspár: (2; 3), (3; 2), (-2; -3), (-3; -2)',
          'Csak 2 megoldáspár: (2; 3) és (3; 2)',
          '1 megoldáspár',
          '8 megoldáspár'
        ],
        correctAnswer: 0,
        explanation: '(x+y)² = x²+y² + 2xy = 13 + 12 = 25 ⇒ x+y = ±5. Ha x+y = 5 és xy = 6 ⇒ (2; 3), (3; 2). Ha x+y = -5 és xy = 6 ⇒ (-2; -3), (-3; -2). Összesen 4 számpár!',
        hint: 'Számold ki (x + y)² értékét: 13 + 2·6 = 25, aminek gyöke 5 és -5 is lehet!'
      },
      {
        id: 'qsq-3-2',
        question: 'Oldd meg tageliminációval: { x² + y² = 25; x² - y² = 7 }!',
        options: [
          'M = {(4; 3); (4; -3); (-4; 3); (-4; -3)} (4 pont)',
          'M = {(4; 3); (-4; -3)}',
          'M = {(16; 9)}',
          'M = {(5; 0); (-5; 0)}'
        ],
        correctAnswer: 0,
        explanation: 'Összeadva a két egyenletet: 2x² = 32 ⇒ x² = 16 ⇒ x = ±4. Kivonva őket: 2y² = 18 ⇒ y² = 9 ⇒ y = ±3. Az előjelek tetszőlegesen kombinálhatók: 4 számpár.',
        hint: 'Add össze a két egyenletet az y² kiejtéséhez!'
      },
      {
        id: 'qsq-3-3',
        question: 'Oldd meg a két parabola metszéspontjait: y = x²  és  y = 2 - x²!',
        options: [
          'M = {(-1; 1); (1; 1)}',
          'M = {(0; 0); (1; 1)}',
          'M = {(-1; -1); (1; 1)}',
          'M = {(-√2; 2); (√2; 2)}'
        ],
        correctAnswer: 0,
        explanation: 'x² = 2 - x² ⇒ 2x² = 2 ⇒ x² = 1 ⇒ x = ±1. Mivel y = x², mindkét esetben y = 1. Pontok: (-1; 1) és (1; 1).',
        hint: 'Egyenlítsd a két parabolát: x² = 2 - x²!'
      },
      {
        id: 'qsq-3-4',
        question: 'Oldd meg: x² + y = 7  és  x + y = 5!',
        options: [
          'M = {(2; 3); (-1; 6)}',
          'M = {(2; 3); (3; 2)}',
          'M = {(1; 4); (-2; 7)}',
          'M = ∅'
        ],
        correctAnswer: 0,
        explanation: 'y = 5 - x ⇒ x² + (5 - x) = 7 ⇒ x² - x - 2 = 0 ⇒ x₁ = 2 (y₁ = 3) és x₂ = -1 (y₂ = 6).',
        hint: 'Fejezd ki y-t a másodikból: y = 5 - x!'
      },
      {
        id: 'qsq-3-5',
        question: 'Milyen k paraméter esetén van az { x + y = k; xy = 9 } rendszernek pontosan 1 valós megoldáspárja?',
        options: [
          'k = 6 vagy k = -6',
          'Csak k = 6',
          'k = 3 vagy k = -3',
          'k = 18 vagy k = -18'
        ],
        correctAnswer: 0,
        explanation: 'A segédegyenlet: u² - ku + 9 = 0. Pontosan 1 megoldáspár akkor van, ha D = k² - 4·1·9 = 0 ⇒ k² = 36 ⇒ k = ±6.',
        hint: 'A diszkrimináns legyen 0: k² - 36 = 0!'
      },
      {
        id: 'qsq-3-6',
        question: 'Két szám különbsége x - y = 3, négyzeteik összege x² + y² = 29. Melyek a lehetséges számpárok?',
        options: [
          'M = {(5; 2); (-2; -5)}',
          'M = {(5; 2); (2; 5)}',
          'M = {(4; 1); (-1; -4)}',
          'M = {(5; 2)}'
        ],
        correctAnswer: 0,
        explanation: 'x = y + 3 ⇒ (y + 3)² + y² = 29 ⇒ 2y² + 6y + 9 = 29 ⇒ 2y² + 6y - 20 = 0 ⇒ y² + 3y - 10 = 0 ⇒ y₁ = 2 (x₁ = 5) és y₂ = -5 (x₂ = -2).',
        hint: 'Helyettesíts be: (y + 3)² + y² = 29!'
      },
      {
        id: 'qsq-3-7',
        question: 'Oldd meg tageliminációval: { x² + y² + 2x = 9; x² + y² - 4y = 5 }!',
        options: [
          'A kivonással kapott lineáris kapcsolat: 2x + 4y = 4  ⇒  x = 2 - 2y',
          'x + y = 4',
          '2x - 4y = 14',
          'Nem vonhatók ki egymásból'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenletből kivonva a II.-at: (x²+y²+2x) - (x²+y²-4y) = 9 - 5 ⇒ 2x + 4y = 4 ⇒ 2-vel osztva x + 2y = 2 ⇒ x = 2 - 2y.',
        hint: 'Ügyelj az előjelre: -(-4y) = +4y!'
      },
      {
        id: 'qsq-3-8',
        question: 'Mi a megoldáshalmaza a következő rendszernek: { xy = 12; x² + y² = 25 } a pozitív valós számokon?',
        options: [
          'M = {(3; 4); (4; 3)}',
          'M = {(2; 6); (6; 2)}',
          'M = {(3; 4)}',
          'M = {(1; 12); (12; 1)}'
        ],
        correctAnswer: 0,
        explanation: '(x+y)² = 25 + 24 = 49 ⇒ x+y = 7 (pozitív számok). u² - 7u + 12 = 0 ⇒ u₁ = 3, u₂ = 4. Megoldások: (3; 4) és (4; 3).',
        hint: 'Pozitív számoknál x + y csak +7 lehet!'
      },
      {
        id: 'qsq-3-9',
        question: 'Egy téglalap területe 60 cm², átlója 13 cm. Melyik rendszer adja meg az a és b oldalakat?',
        options: [
          'a · b = 60  és  a² + b² = 169',
          'a · b = 60  és  a + b = 13',
          'a · b = 60  és  a² + b² = 13',
          '2(a + b) = 60  és  a² + b² = 169'
        ],
        correctAnswer: 0,
        explanation: 'A terület ab = 60, a Pitagorasz-tétel szerint pedig a² + b² = d² = 13² = 169.',
        hint: 'A téglalap átlójára a Pitagorasz-tétel érvényes: a² + b² = d²!'
      },
      {
        id: 'qsq-3-10',
        question: 'A fenti téglalap feladatban (ab = 60 és a² + b² = 169) mekkorák az oldalak?',
        options: [
          '5 cm és 12 cm',
          '6 cm és 10 cm',
          '4 cm és 15 cm',
          '3 cm és 20 cm'
        ],
        correctAnswer: 0,
        explanation: '(a+b)² = 169 + 2·60 = 289 ⇒ a+b = 17. Az u² - 17u + 60 = 0 gyökei 5 és 12. A téglalap oldalai: 5 cm és 12 cm.',
        hint: '169 + 120 = 289, aminek négyzetgyöke 17!'
      }
    ]
  }
};

export const QuadraticSystemsQuiz: React.FC<QuadraticSystemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-masodfoku-egyenletrendszerek-quiz"
      topicTitle="9. Ráadás – Másodfokú egyenletrendszerek"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • KVÍZ"
      themeColor="orange"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <QuadraticSystemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <QuadraticSystemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

