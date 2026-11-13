import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RadicalEquationsMatcher } from './RadicalEquationsMatcher';
import { RadicalEquationsSorter } from './RadicalEquationsSorter';
import {
  RadicalStepFlowSvg,
  RadicalParabolaIntersectionSvg,
  RadicalDomainSvg,
  TwoRadicalsSvg,
  ExtraneousRootDetectorSvg
} from './RadicalEquationsFigures';

interface RadicalEquationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A négyzetgyök definíciója és feltételei',
    description: 'A valós számok halmazán a négyzetgyök alatt nem állhat negatív szám (f(x) ≥ 0). Továbbá a négyzetgyök értéke mindig nemnegatív (√... ≥ 0), így ha √f(x) = g(x), akkor g(x) ≥ 0 is kötelező feltétel!',
    note: 'Ha a jobb oldalon negatív szám áll (pl. √x = -3), az egyenletnek azonnal láthatóan nincs megoldása (M = ∅)!',
    color: 'from-cyan-500 to-blue-600',
    figure: <RadicalDomainSvg size={260} />
  },
  {
    title: 'Miért kötelező a behelyettesítéses ellenőrzés?',
    description: 'A négyzetre emelés nem ekvivalens átalakítás: A = B ⟹ A² = B², de visszafelé A = -B is lehet! Emiatt a kapott másodfokú egyenletből származó gyökök egy része hamis gyök lehet.',
    note: 'A hamis gyökök kiszűrése az eredeti egyenletbe való behelyettesítéssel a megoldás szerves része, nélküle pontlevonás jár!',
    color: 'from-amber-500 to-rose-600',
    figure: <ExtraneousRootDetectorSvg size={260} />
  },
  {
    title: 'Két gyökös kifejezések izolálása',
    description: 'Ha az egyenletben két gyök szerepel (pl. √(x+5) - √x = 1), soha ne emelj azonnal négyzetre! Vidd át az egyik gyököt a másik oldalra: √(x+5) = 1 + √x, és így végezd el a négyzetre emelést.',
    note: 'Így az x kiesik, és a megmaradt egyetlen gyököt újabb izolálással és négyzetre emeléssel könnyen megoldhatod.',
    color: 'from-emerald-500 to-teal-600',
    figure: <TwoRadicalsSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak, kikötések és egyszerű egyenletek',
    subtitle: '10 alapozó feladat a négyzetgyök definíciójáról, az értelmezési tartományról és az alapműveletekről',
    range: '1–10. kérdés',
    focus: 'Gyök alatti kifejezés feltétele, alapvető egyenletek, negatív jobb oldal felismerése',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    questions: [
      {
        id: 'req1-1',
        level: 1,
        question: 'Mi a négyzetgyök definíciója valós számok esetén?',
        options: [
          'Olyan nemnegatív szám, amelynek a négyzete az adott szám.',
          'Bármilyen szám, amelynek a négyzete az adott szám, akár negatív is.',
          'A szám fele.',
          'A számnak a reciproka.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a √9 értékére: vajon a definíció szerint lehet-e -3?',
        explanation: 'Egy nemnegatív "a" szám négyzetgyökén azt a nemnegatív számot értjük, amelynek négyzete "a". Definíció szerint a négyzetgyök értéke nem lehet negatív!'
      },
      {
        id: 'req1-2',
        level: 1,
        question: 'Milyen feltételnek kell teljesülnie a valós számok halmazán a √(x - 4) kifejezés értelmezéséhez?',
        options: [
          'x ≥ 4',
          'x > 4',
          'x ≤ 4',
          'x ≠ 4'
        ],
        correctAnswer: 0,
        hint: 'A négyzetgyök alatti kifejezés nem lehet negatív.',
        explanation: 'A valós számok halmazán a négyzetgyök alatt nemnegatív szám állhat: x - 4 ≥ 0 ⟹ x ≥ 4.'
      },
      {
        id: 'req1-3',
        level: 1,
        question: 'Mennyi az x értéke a √(x) = 7 egyenletben?',
        options: [
          'x = 49',
          'x = ±49',
          'x = 14',
          'Nincs valós megoldás'
        ],
        correctAnswer: 0,
        hint: 'Emeld négyzetre mindkét oldalt: (√x)² = 7².',
        explanation: 'Mindkét oldalt négyzetre emelve: x = 7² = 49. Ellenőrzés: √49 = 7 ✓.'
      },
      {
        id: 'req1-4',
        level: 1,
        question: 'Mi az egyenlet megoldása: √(2x + 1) = 5?',
        options: [
          'x = 12',
          'x = 2',
          'x = 13',
          'x = 24'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emelés után: 2x + 1 = 25.',
        explanation: '2x + 1 = 5² = 25 ⟹ 2x = 24 ⟹ x = 12. Ellenőrzés: √(2·12 + 1) = √25 = 5 ✓.'
      },
      {
        id: 'req1-5',
        level: 1,
        question: 'Mi a megoldáshalmaza a √(3x - 1) = -4 egyenletnek a valós számok halmazán?',
        options: [
          'M = ∅ (üres halmaz)',
          'M = {17/3}',
          'M = {-1}',
          'M = {5}'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e a négyzetgyök értéke negatív szám?',
        explanation: 'Mivel a négyzetgyök értéke a definíció szerint nemnegatív (√... ≥ 0), egyenlőség negatív számmal nem állhat fenn. Ezért azonnal: M = ∅!'
      },
      {
        id: 'req1-6',
        level: 1,
        question: 'Mi a feltétel a √(8 - 2x) kifejezés értelmezési tartományára?',
        options: [
          'x ≤ 4',
          'x ≥ 4',
          'x ≥ -4',
          'x ≤ -4'
        ],
        correctAnswer: 0,
        hint: '8 - 2x ≥ 0. Figyelj a negatív számmal való osztásra!',
        explanation: '8 - 2x ≥ 0 ⟹ 8 ≥ 2x ⟹ 4 ≥ x, azaz x ≤ 4.'
      },
      {
        id: 'req1-7',
        level: 1,
        question: 'Mi a helyes első lépés, ha a gyökjel mellett más tag is áll, pl. √(x + 2) - 3 = 1?',
        options: [
          'Először izoláljuk a gyökjelet: √(x + 2) = 4, majd négyzetre emelünk.',
          'Azonnal négyzetre emeljük a bal oldalt tagonként: x + 2 - 9 = 1.',
          'Levonunk mindkét oldalból 1-et és osztunk 3-mal.',
          'Kijelentjük, hogy nincs megoldása.'
        ],
        correctAnswer: 0,
        hint: 'Mindig törekedj arra, hogy a gyökös kifejezés egyedül álljon az egyik oldalon!',
        explanation: 'A gyökjel izolálása elengedhetetlen: √(x + 2) = 1 + 3 = 4, majd négyzetre emelve: x + 2 = 16 ⟹ x = 14.'
      },
      {
        id: 'req1-8',
        level: 1,
        question: 'Milyen halmazon értelmezhető a √(x² + 9) kifejezés a valós számok között?',
        options: [
          'A teljes ℝ halmazon, mert x² ≥ 0 miatt x² + 9 mindig pozitív.',
          'Csak x ≥ 3 esetén.',
          'Csak x ≥ 0 esetén.',
          'Csak a [-3; 3] zárt intervallumon.'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e x² + 9 negatív bármely valós x számra?',
        explanation: 'Minden valós szám négyzete x² ≥ 0. Ehhez 9-et hozzáadva x² + 9 ≥ 9 > 0, ami minden x ∈ ℝ esetén szigorúan pozitív!'
      },
      {
        id: 'req1-9',
        level: 1,
        question: 'Mi a megoldása az √(5 - x) = 0 egyenletnek?',
        options: [
          'x = 5',
          'x = -5',
          'x = 25',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Melyik szám négyzetgyöke ad pontosan nullát?',
        explanation: 'Egy szám négyzetgyöke akkor és csak akkor nulla, ha maga a szám nulla: 5 - x = 0 ⟹ x = 5.'
      },
      {
        id: 'req1-10',
        level: 1,
        question: 'Miért kötelező ellenőrizni a gyökös egyenlet megoldásait az eredeti egyenletbe való behelyettesítéssel?',
        options: [
          'Mert a négyzetre emelés nem ekvivalens átalakítás, és hamis gyökök keletkezhetnek.',
          'Mert a másodfokú megoldóképlet mindig hibás gyököket ad.',
          'Mert ez csak tanári szokás, matematikailag felesleges.',
          'Mert a gyökvonás elhagyja a pozitív számokat.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, hogy (-3)² és (+3)² is egyaránt 9.',
        explanation: 'Mivel A = B-ből következik A² = B², de visszafelé A = -B is lehet, a négyzetre emelés tágítja az igazsághalmazt. A hamis gyököket csak behelyettesítéssel lehet kizárni!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Másodfokúvá alakuló egyenletek és hamis gyökök',
    subtitle: '10 feladat az ismeretlen mindkét oldalon való szerepléséről, a megoldóképletről és a hamis gyökök szűréséről',
    range: '11–20. kérdés',
    focus: 'Gyökös kifejezés = lineáris kifejezés, diszkrimináns, behelyettesítéses teszt',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'req2-1',
        level: 2,
        question: 'Oldd meg a valós számokon: √(x + 3) = x - 3. Mi a valódi megoldáshalmaz?',
        options: [
          'M = {6} (az x = 1 hamis gyök)',
          'M = {1; 6}',
          'M = {1}',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'x + 3 = (x - 3)² = x² - 6x + 9. Oldd meg a másodfokú egyenletet, majd helyettesíts vissza!',
        explanation: 'x² - 7x + 6 = 0 ⟹ x₁ = 6, x₂ = 1. Ellenőrzés: x = 1 esetén √(4) = 2, de 1 - 3 = -2, tehát 2 ≠ -2 (hamis!). x = 6 esetén √9 = 3 = 6 - 3 ✓. Megoldás: M = {6}.'
      },
      {
        id: 'req2-2',
        level: 2,
        question: 'A √(2x + 9) = x - 3 egyenlet négyzetre emelése után az x² - 8x = 0 egyenlet adódik (x₁ = 0, x₂ = 8). Mi a valós megoldás?',
        options: [
          'M = {8} (mert x = 0 esetén 3 ≠ -3)',
          'M = {0; 8}',
          'M = {0}',
          'M = {-8; 0}'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be x = 0-t és x = 8-at az eredeti egyenletbe!',
        explanation: 'x = 0 esetén Bal = √9 = 3, Jobb = 0 - 3 = -3. Mivel 3 ≠ -3, a 0 hamis gyök! x = 8 esetén √25 = 5 = 8 - 3 ✓. Megoldás: M = {8}.'
      },
      {
        id: 'req2-3',
        level: 2,
        question: 'Oldd meg a √(6 - x) = x egyenletet!',
        options: [
          'M = {2} (az x = -3 hamis gyök, mert a jobb oldal nem lehet negatív)',
          'M = {-3; 2}',
          'M = {-3}',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: '6 - x = x² ⟹ x² + x - 6 = 0. Kikötés: a jobb oldal miatt x ≥ 0!',
        explanation: 'x² + x - 6 = 0 ⟹ (x + 3)(x - 2) = 0. x = -3 esetén a jobb oldal negatív, ami lehetetlen (√9 = 3 ≠ -3). x = 2 esetén √4 = 2 = 2 ✓. Megoldás: M = {2}.'
      },
      {
        id: 'req2-4',
        level: 2,
        question: 'Oldd meg: √(x² - 5) = 2. Hány valós megoldása van?',
        options: [
          '2 valós megoldása van: x = 3 és x = -3.',
          '1 valós megoldása van: csak az x = 3.',
          'Nincs valós megoldása.',
          '4 valós megoldása van.'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emelve: x² - 5 = 4 ⟹ x² = 9.',
        explanation: 'x² - 5 = 4 ⟹ x² = 9 ⟹ x = ±3. Mindkettőt behelyettesítve: √(9 - 5) = √4 = 2 ✓. Mindkét gyök valódi megoldás!'
      },
      {
        id: 'req2-5',
        level: 2,
        question: 'A √(x + 11) = x - 1 egyenletből kapott másodfokú gyökök: x₁ = 5 és x₂ = -2. Melyik a helyes állítás?',
        options: [
          'x = 5 valódi gyök, x = -2 hamis gyök, így M = {5}.',
          'Mindkét gyök valódi, így M = {-2; 5}.',
          'Mindkét gyök hamis, így M = ∅.',
          'Csak az x = -2 a valódi gyök.'
        ],
        correctAnswer: 0,
        hint: 'x = -2 esetén mennyi a jobb oldal: -2 - 1 = ?',
        explanation: 'x = -2 esetén a jobb oldal -2 - 1 = -3, míg a bal oldal √9 = +3. Mivel +3 ≠ -3, ez hamis gyök! x = 5-nél √16 = 4 = 5 - 1 ✓. Megoldás: M = {5}.'
      },
      {
        id: 'req2-6',
        level: 2,
        question: 'Mi a megoldása a √(4x + 5) = x egyenletnek?',
        options: [
          'M = {5} (az x = -1 hamis gyök)',
          'M = {-1; 5}',
          'M = {-1}',
          'M = {1; 5}'
        ],
        correctAnswer: 0,
        hint: '4x + 5 = x² ⟹ x² - 4x - 5 = 0.',
        explanation: 'x² - 4x - 5 = (x - 5)(x + 1) = 0. Mivel a jobb oldal x, ezért x ≥ 0 kell legyen. x = -1 hamis gyök, x = 5 esetén √25 = 5 = 5 ✓. Megoldás: M = {5}.'
      },
      {
        id: 'req2-7',
        level: 2,
        question: 'Milyen feltételnek kell teljesülnie a √f(x) = g(x) egyenlet jobb oldalára?',
        options: [
          'g(x) ≥ 0, mert a négyzetgyök értéke nemnegatív.',
          'g(x) ≤ 0.',
          'g(x) bármilyen valós szám lehet.',
          'g(x) ≠ 0.'
        ],
        correctAnswer: 0,
        hint: 'A bal oldal egy négyzetgyök, amely sosem lehet negatív.',
        explanation: 'Mivel a bal oldal definíció szerint nemnegatív (√f(x) ≥ 0), az egyenlőség csak akkor állhat fenn, ha a jobb oldal is nemnegatív: g(x) ≥ 0.'
      },
      {
        id: 'req2-8',
        level: 2,
        question: 'Oldd meg: √(2x + 5) = x - 5.',
        options: [
          'M = {10} (az x = 2 hamis gyök)',
          'M = {2; 10}',
          'M = {2}',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: '2x + 5 = (x - 5)² = x² - 10x + 25 ⟹ x² - 12x + 20 = 0.',
        explanation: '(x - 10)(x - 2) = 0. x = 2 esetén 2 - 5 = -3 < 0 (hamis!). x = 10 esetén √25 = 5 = 10 - 5 ✓. Megoldás: M = {10}.'
      },
      {
        id: 'req2-9',
        level: 2,
        question: 'Oldd meg: √(x + 20) = x.',
        options: [
          'M = {5} (az x = -4 hamis gyök)',
          'M = {-4; 5}',
          'M = {-4}',
          'M = {-5; 4}'
        ],
        correctAnswer: 0,
        hint: 'x + 20 = x² ⟹ x² - x - 20 = 0.',
        explanation: 'x² - x - 20 = (x - 5)(x + 4) = 0. A jobb oldal miatt x ≥ 0, ezért x = -4 hamis gyök. x = 5 esetén √25 = 5 = 5 ✓. Megoldás: M = {5}.'
      },
      {
        id: 'req2-10',
        level: 2,
        question: 'Miért állhat fenn megoldás a √(x + 6) = -x egyenletnél, bár a jobb oldalon "-x" szerepel?',
        options: [
          'Mert ha x negatív (pl. x = -2), akkor a -x kifejezés pozitívvá válik: -(-2) = +2.',
          'Mert a negatív előjel nem számít.',
          'Mert a négyzetgyök értéke negatív is lehet.',
          'Nincs megoldása, mert -x mindig negatív.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az előjel szabályra: negatív szám ellentettje pozitív!',
        explanation: 'A -x nem azt jelenti, hogy az érték negatív, hanem hogy x ellentettje! Ha x = -2, akkor Bal = √(-2 + 6) = √4 = 2, Jobb = -(-2) = 2 ✓. Tehát x = -2 valódi megoldás!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Két gyökös kifejezések és összetett feladatok',
    subtitle: '10 emelt szintű érettségi feladat több gyökjellel, új ismeretlen bevezetésével és trükkös feltételekkel',
    range: '21–30. kérdés',
    focus: 'Két gyök átvitele, helyettesítéses másodfokú egyenlet, szélsőérték és tartomány vizsgálat',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'req3-1',
        level: 3,
        question: 'Hogyan érdemes elkezdeni a √(x + 5) - √x = 1 egyenlet megoldását?',
        options: [
          'Átvisszük a √x-et a jobb oldalra: √(x + 5) = 1 + √x, és így emelünk négyzetre.',
          'Azonnal négyzetre emeljük a bal oldalt tagonként: x + 5 - x = 1.',
          'Levonunk mindkét oldalból 5-öt.',
          'Mindkét oldalt elosztjuk √x-szel.'
        ],
        correctAnswer: 0,
        hint: 'Ha mindkét gyök egy oldalon van, a vegyes szorzat miatt a gyök nem tűnik el!',
        explanation: 'Az izolálási elv: vigyük át az egyik gyököt a másik oldalra: √(x + 5) = 1 + √x. Négyzetre emelve x + 5 = 1 + 2√x + x, ahol az x kiesik!'
      },
      {
        id: 'req3-2',
        level: 3,
        question: 'Mi a megoldása a √(x + 5) - √x = 1 egyenletnek?',
        options: [
          'x = 4',
          'x = 1',
          'x = 9',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Az izolálás után: 4 = 2√x ⟹ √x = 2.',
        explanation: 'x + 5 = 1 + 2√x + x ⟹ 4 = 2√x ⟹ √x = 2 ⟹ x = 4. Ellenőrzés: √9 - √4 = 3 - 2 = 1 ✓.'
      },
      {
        id: 'req3-3',
        level: 3,
        question: 'Oldd meg: √(x - 1) = √(2x - 5).',
        options: [
          'x = 4',
          'x = 6',
          'x = 2',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Mindkét oldalon egy-egy gyök áll, azonnal négyzetre emelhető.',
        explanation: 'x - 1 = 2x - 5 ⟹ 4 = x. Ellenőrzés: √(4 - 1) = √3 és √(2·4 - 5) = √3 ✓. Mindkét oldal értelmezett és egyenlő, x = 4.'
      },
      {
        id: 'req3-4',
        level: 3,
        question: 'Oldd meg: √(x + 7) + √(x + 2) = 5.',
        options: [
          'x = 2',
          'x = 7',
          'x = -1',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Próbáld ki x = 2-t, vagy vidd át a √(x+2)-t és emelj négyzetre!',
        explanation: '√(2 + 7) + √(2 + 2) = √9 + √4 = 3 + 2 = 5 ✓. Rendezetten: √(x + 7) = 5 - √(x + 2) ⟹ x + 7 = 25 - 10√(x + 2) + x + 2 ⟹ 10√(x + 2) = 20 ⟹ √(x + 2) = 2 ⟹ x + 2 = 4 ⟹ x = 2.'
      },
      {
        id: 'req3-5',
        level: 3,
        question: 'Mi a megoldáshalmaza a √(x - 4) + √(4 - x) = 0 egyenletnek?',
        options: [
          'M = {4}',
          'M = ∅',
          'M = ℝ',
          'M = [-4; 4]'
        ],
        correctAnswer: 0,
        hint: 'Vizsgáld meg a két gyök értelmezési tartományának metszetét: x ≥ 4 ÉS x ≤ 4!',
        explanation: 'x - 4 ≥ 0 ⟹ x ≥ 4, és 4 - x ≥ 0 ⟹ x ≤ 4. A kettő metszete egyetlen szám: x = 4. Behelyettesítve: √0 + √0 = 0 ✓. Megoldás: M = {4}.'
      },
      {
        id: 'req3-6',
        level: 3,
        question: 'Hogyan oldható meg legegyszerűbben az x² - 3x + √(x² - 3x + 5) = 7 egyenlet?',
        options: [
          'Új ismeretlen bevezetésével: legyen u = √(x² - 3x + 5) ≥ 0, ekkor x² - 3x = u² - 5.',
          'Mindkét oldal azonnali négyzetre emelésével.',
          'Mindkét oldal leosztásával (x² - 3x)-szel.',
          'Negyemfokú polinom megoldóképlettel.'
        ],
        correctAnswer: 0,
        hint: 'Észreveszed a közös (x² - 3x) blokkot a gyök alatt és kívül?',
        explanation: 'Ha u = √(x² - 3x + 5), akkor u² = x² - 3x + 5, így x² - 3x = u² - 5. Az egyenlet: (u² - 5) + u = 7 ⟹ u² + u - 12 = 0.'
      },
      {
        id: 'req3-7',
        level: 3,
        question: 'Az u² + u - 12 = 0 egyenlet gyökei u₁ = 3 és u₂ = -4. Mivel u = √(x² - 3x + 5) ≥ 0, a -4 kiesik. Mi lesz az x megoldása a √(x² - 3x + 5) = 3 egyenletből?',
        options: [
          'x₁ = 4 és x₂ = -1',
          'x₁ = 3 és x₂ = -4',
          'x = 2',
          'Nincs valós megoldás'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emelve: x² - 3x + 5 = 9 ⟹ x² - 3x - 4 = 0.',
        explanation: 'x² - 3x - 4 = (x - 4)(x + 1) = 0 ⟹ x₁ = 4, x₂ = -1. Mindkettőt visszahelyettesítve az eredeti kifejezés 7-et ad ✓!'
      },
      {
        id: 'req3-8',
        level: 3,
        question: 'Oldd meg a valós számokon: √(x + 6) = -x.',
        options: [
          'M = {-2} (az x = 3 hamis gyök)',
          'M = {3}',
          'M = {-2; 3}',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emelve x + 6 = x² ⟹ x² - x - 6 = 0. Kikötés: a jobb oldal miatt -x ≥ 0 ⟹ x ≤ 0!',
        explanation: '(x - 3)(x + 2) = 0. Mivel a jobb oldal miatt x ≤ 0 szükséges, az x = 3 hamis gyök (√9 = 3 ≠ -3). x = -2 esetén √4 = 2 = -(-2) ✓. Megoldás: M = {-2}.'
      },
      {
        id: 'req3-9',
        level: 3,
        question: 'Hány valós megoldása van a √(x + 2) + √(x - 3) = 1 egyenletnek?',
        options: [
          '0 (nincs megoldás, mert a bal oldal értéke már x = 3-nál is √5 ≈ 2,24 > 1)',
          '1',
          '2',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg az értelmezési tartomány legkisebb elemét: x ≥ 3.',
        explanation: 'Az értelmezési tartomány x ≥ 3. Mivel x ≥ 3, ezért √(x + 2) ≥ √5 ≈ 2,236, és √(x - 3) ≥ 0. A bal oldal legkisebb értéke is nagyobb 2-nél, így sosem lehet 1. Számolás nélkül: M = ∅!'
      },
      {
        id: 'req3-10',
        level: 3,
        question: 'Miért minősül súlyos hibának az érettségin, ha a diák a √f(x) = g(x) megoldása során nem végez ellenőrzést és nem vizsgálja a jobb oldal előjelét?',
        options: [
          'Mert a négyzetre emelés tágítja a megoldáshalmazt, így a hamis gyökök kiszűrése nélkül a megoldás matematikailag hibás és hiányos.',
          'Mert a gyökvonás negatív számokra nem létezik.',
          'Mert a diszkrimináns megváltozik.',
          'Mert a feladat szövege mindig kötelezővé teszi a grafikus ábrázolást.'
        ],
        correctAnswer: 0,
        hint: 'Az érettségi javítókulcsa külön pontot ad a hamis gyök kizárásáért.',
        explanation: 'A négyzetre emelés csak következmény-reláció (A = B ⟹ A² = B²). Az így kapott egyenlet gyökei között olyanok is szerepelhetnek, amelyek nem megoldásai az eredeti egyenletnek. Ellenőrzés nélkül a megoldás nem fogadható el teljesnek!'
      }
    ]
  }
};

export const RadicalEquationsQuiz: React.FC<RadicalEquationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-gyokos-egyenletek-quiz"
      topicTitle="Gyökös egyenletek – Kvíz és Gyakorló Feladatok"
      themeColor="cyan"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <RadicalEquationsMatcher
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
        <RadicalEquationsSorter
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

