import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeExamMatcher } from './PracticeExamMatcher';
import { PracticeExamSorter } from './PracticeExamSorter';
import {
  SynthesisConceptMapSvg,
  ExamChecklistTreeSvg,
  InequalityRegionsSvg,
  NonlinearSystemsIntersectionSvg,
  GradingRubricTrophySvg
} from './PracticeExamFigures';

interface PracticeExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Fejezeti Tudáspróba 4 Alappillére',
    description:
      '1. Értelmezési tartomány (nevező ≠ 0, négyzetgyök alatt ≥ 0). 2. Nem ekvivalens lépés (négyzetre emelés) esetén kötelező a próba! 3. Másodfokú egyenlőtlenség: nullára rendezés, zérushelyek, parabola vagy előjeltábla. 4. Rendszerek: összetartozó rendezett számpárokban (x; y) adjuk meg a választ!',
    note: 'Érettségi tanács: A kikötésért és a nullára rendezésért önálló részpont jár!',
    color: 'from-violet-500 to-purple-600',
    figure: <SynthesisConceptMapSvg size={260} />
  },
  {
    title: 'Egyenlőtlenségek és Előjeltáblázatok',
    description:
      'ax² + bx + c ≷ 0 esetén ha a > 0, a parabola a gyökökön kívül pozitív (+), a gyökök között negatív (-). Törtes egyenlőtlenségnél a nevező zérushelye SOHA nem lehet zárt határ (mindig nyílt kerek zárójel)!',
    note: 'Tilos ismeretlennel átbeszorozni, mert nem ismerjük az előjelét!',
    color: 'from-purple-500 to-indigo-600',
    figure: <InequalityRegionsSvg size={260} />
  },
  {
    title: 'Viète-formulák és Másodfokú Rendszerek',
    description:
      'Normált alakban x₁ + x₂ = -p és x₁x₂ = q. Négyzetösszeg: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂. Szimmetrikus rendszernél (x + y = S, xy = P) a megoldások az u² - Su + P = 0 segédegyenlet gyökei. Két másodfokú egyenletnél kivonással kiejtjük a négyzetes tagokat!',
    note: 'Szimmetria: ha (u₁; u₂) megoldás, akkor (u₂; u₁) is az!',
    color: 'from-indigo-600 to-violet-700',
    figure: <NonlinearSystemsIntersectionSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Fejezeti alapok és gyorsfeladványok',
    subtitle: '30 alapozó feladat: hiányos egyenletek, egyszerű gyökös és törtes feltételek, Viète-reflexek',
    range: '1–30. kérdés',
    focus: 'Mérlegelv, hiányos másodfokú egyenletek, alapvető kikötések, szorzattá bontás',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 'peq-1-1',
        question: 'Mi a megoldáshalmaza az x² - 9 = 0 egyenletnek?',
        options: ['M = {-3; 3}', 'M = {3}', 'M = {-9; 9}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x² = 9 ⇒ x = 3 vagy x = -3.',
        hint: 'A pozitív és negatív szám négyzete is 9!'
      },
      {
        id: 'peq-1-2',
        question: 'Oldd meg fejben: x² - 5x = 0!',
        options: ['M = {0; 5}', 'M = {5}', 'M = {-5; 0}', 'M = {0; -5}'],
        correctAnswer: 0,
        explanation: 'Kiemeléssel: x(x - 5) = 0 ⇒ x = 0 vagy x = 5.',
        hint: 'Emelj ki x-et!'
      },
      {
        id: 'peq-1-3',
        question: 'Melyek az x² - 8x + 15 = 0 egyenlet valós gyökei?',
        options: ['x₁ = 3 és x₂ = 5', 'x₁ = -3 és x₂ = -5', 'x₁ = 2 és x₂ = 6', 'x₁ = 1 és x₂ = 15'],
        correctAnswer: 0,
        explanation: 'Viète szerint a szorzat 15, az összeg 8. 3 · 5 = 15 és 3 + 5 = 8.',
        hint: 'Keresd a 15 két tényezőjét, melyek összege 8!'
      },
      {
        id: 'peq-1-4',
        question: 'Oldd meg a valós számokon: √(x + 4) = 3!',
        options: ['x = 5', 'x = -1', 'x = 9', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: x + 4 = 9 ⇒ x = 5. Próba: √(5 + 4) = √9 = 3 (helyes).',
        hint: 'Emeld négyzetre mindkét oldalt!'
      },
      {
        id: 'peq-1-5',
        question: 'Mi a √(2x - 8) kifejezés értelmezési tartománya a valós számok halmazán?',
        options: ['x ≥ 4', 'x > 4', 'x ≥ 8', 'x ∈ ℝ'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök alatt nemnegatív szám állhat: 2x - 8 ≥ 0 ⇒ 2x ≥ 8 ⇒ x ≥ 4.',
        hint: 'A gyök alatti kifejezés ≥ 0.'
      },
      {
        id: 'peq-1-6',
        question: 'Oldd meg: (x - 1)(x - 3) = 0!',
        options: ['M = {1; 3}', 'M = {-1; -3}', 'M = {1}', 'M = {3}'],
        correctAnswer: 0,
        explanation: 'Egy szorzat akkor 0, ha valamelyik tényezője 0: x - 1 = 0 (x = 1) vagy x - 3 = 0 (x = 3).',
        hint: 'Mikor nulla egy szorzat?'
      },
      {
        id: 'peq-1-7',
        question: 'Mi az x² + 16 = 0 egyenlet valós megoldáshalmaza?',
        options: ['M = ∅ (üres halmaz)', 'M = {-4; 4}', 'M = {4}', 'M = {-16}'],
        correctAnswer: 0,
        explanation: 'x² = -16. Valós szám négyzete sosem negatív, így nincs valós gyök.',
        hint: 'Lehet valós szám négyzete negatív?'
      },
      {
        id: 'peq-1-8',
        question: 'Hány valós gyöke van az x² - 6x + 9 = 0 egyenletnek?',
        options: ['Pontosan 1 (kétszeres) gyöke van: x = 3', '2 különböző gyöke van', 'Nincs valós gyöke', 'Végtelen sok'],
        correctAnswer: 0,
        explanation: 'x² - 6x + 9 = (x - 3)² = 0, D = 36 - 36 = 0, így egyetlen kétszeres gyök van: x = 3.',
        hint: 'Vedd észre a teljes négyzetet!'
      },
      {
        id: 'peq-1-9',
        question: 'Oldd meg az egyenlőtlenséget: -3x < 12!',
        options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'],
        correctAnswer: 0,
        explanation: 'Negatív számmal (-3) osztva a relációjel megfordul: x > 12 / (-3) = -4.',
        hint: 'Negatív számmal való osztáskor megfordul a jel!'
      },
      {
        id: 'peq-1-10',
        question: 'Oldd meg a valós számokon: (x - 2)/(x + 1) = 0!',
        options: ['M = {2}', 'M = {2; -1}', 'M = {-1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'A számláló 0, ha x = 2. A nevező miatt x ≠ -1. Így az egyetlen megoldás x = 2.',
        hint: 'Egy tört akkor 0, ha a számlálója 0 és a nevezője nem 0.'
      },
      {
        id: 'peq-1-11',
        question: 'Oldd meg az { x + y = 7; xy = 12 } rendszert!',
        options: ['M = {(3; 4); (4; 3)}', 'M = {(3; 4)}', 'M = {(2; 5); (5; 2)}', 'M = {(1; 6); (6; 1)}'],
        correctAnswer: 0,
        explanation: 'u² - 7u + 12 = 0 gyökei 3 és 4. A szimmetria miatt mindkét számpár megoldás: (3; 4) és (4; 3).',
        hint: 'Összeg 7, szorzat 12.'
      },
      {
        id: 'peq-1-12',
        question: 'Mely pontokban metszi az y = 4 vízszintes egyenes az y = x² parabolát?',
        options: ['P₁(-2; 4) és P₂(2; 4)', 'Csak P(2; 4)', 'P₁(0; 4) és P₂(4; 4)', 'Nem metszik egymást'],
        correctAnswer: 0,
        explanation: 'x² = 4 ⇒ x = ±2. Mivel y = 4, a metszéspontok: (-2; 4) és (2; 4).',
        hint: 'Helyettesíts be y = 4-et!'
      },
      {
        id: 'peq-1-13',
        question: 'Ha egy normált másodfokú egyenlet gyökei -2 és -3, mi az egyenlet alakja?',
        options: ['x² + 5x + 6 = 0', 'x² - 5x + 6 = 0', 'x² + 5x - 6 = 0', 'x² - 6x + 5 = 0'],
        correctAnswer: 0,
        explanation: 'Összeg: -2 + (-3) = -5 ⇒ -p = -5 ⇒ p = 5. Szorzat: (-2)(-3) = 6 ⇒ q = 6. Egyenlet: x² + 5x + 6 = 0.',
        hint: 'x² - (x₁ + x₂)x + x₁x₂ = 0.'
      },
      {
        id: 'peq-1-14',
        question: 'Mi az x² - 4x + 4 kifejezés gyöktényezős alakja?',
        options: ['(x - 2)²', '(x - 2)(x + 2)', '(x + 2)²', '(x - 4)(x - 1)'],
        correctAnswer: 0,
        explanation: 'x² - 4x + 4 teljes négyzet: (x - 2)², gyöktényezős alakban: (x - 2)(x - 2).',
        hint: 'Azonosság: a² - 2ab + b².'
      },
      {
        id: 'peq-1-15',
        question: 'Oldd meg: 2x² - 50 = 0!',
        options: ['M = {-5; 5}', 'M = {5}', 'M = {-25; 25}', 'M = {25}'],
        correctAnswer: 0,
        explanation: '2x² = 50 ⇒ x² = 25 ⇒ x = ±5.',
        hint: 'Oszd el mindkét oldalt 2-vel!'
      },
      {
        id: 'peq-1-16',
        question: 'Oldd meg a valós számok halmazán: √x = -4!',
        options: ['M = ∅ (nincs valós megoldás)', 'x = 16', 'x = -16', 'x = ±4'],
        correctAnswer: 0,
        explanation: 'A valós számokon a négyzetgyök értéke nemnegatív (√x ≥ 0), így sosem lehet egyenlő -4-gyel.',
        hint: 'Lehet a négyzetgyök értéke negatív?'
      },
      {
        id: 'peq-1-17',
        question: 'Mi a megoldása az (x - 3)(x + 2) < 0 egyenlőtlenségnek?',
        options: [']-2; 3[', '[-2; 3]', 'x < -2 vagy x > 3', 'x < 3'],
        correctAnswer: 0,
        explanation: 'Felfelé nyíló parabola tengely alatti része a gyökök közötti nyílt szakasz: ]-2; 3[.',
        hint: 'A szigorú relációjel miatt a határpontok nyíltak.'
      },
      {
        id: 'peq-1-18',
        question: 'Milyen x valós számokra igaz, hogy x² ≥ 0?',
        options: ['Minden valós számra (x ∈ ℝ)', 'Csak x > 0 esetén', 'Csak x ≥ 0 esetén', 'Csak pozitív egészekre'],
        correctAnswer: 0,
        explanation: 'Bármely valós szám négyzete nemnegatív: x² ≥ 0 minden x ∈ ℝ-re.',
        hint: 'Pozitív, negatív és nulla négyzete is ≥ 0.'
      },
      {
        id: 'peq-1-19',
        question: 'Oldd meg az { y = x; x² + y² = 18 } egyenletrendszert!',
        options: ['M = {(3; 3); (-3; -3)}', 'M = {(3; 3)}', 'M = {(9; 9); (-9; -9)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x² + x² = 18 ⇒ 2x² = 18 ⇒ x² = 9 ⇒ x = ±3. Mivel y = x, a számpárok: (3; 3) és (-3; -3).',
        hint: 'Helyettesíts y helyére x-et!'
      },
      {
        id: 'peq-1-20',
        question: 'Mit jelent, ha egy másodfokú egyenlet diszkriminánsa D > 0?',
        options: [
          'Az egyenletnek két különböző valós gyöke van',
          'Az egyenletnek 1 valós gyöke van',
          'Az egyenletnek nincs valós gyöke',
          'A gyökök biztosan pozitívak'
        ],
        correctAnswer: 0,
        explanation: 'Ha D > 0, a megoldóképletben a gyökvonás elvégezhető, és a ± miatt két különböző valós gyök adódik.',
        hint: 'D > 0 esetén két megoldás van.'
      },
      {
        id: 'peq-1-21',
        question: 'Oldd meg: (x - 4)² = 0!',
        options: ['M = {4}', 'M = {-4; 4}', 'M = {-4}', 'M = {16}'],
        correctAnswer: 0,
        explanation: 'Egy szám négyzete csak akkor 0, ha a szám maga 0: x - 4 = 0 ⇒ x = 4.',
        hint: 'Mikor nulla egy négyzet?'
      },
      {
        id: 'peq-1-22',
        question: 'Oldd meg a valós számokon: x(x + 7) = 0!',
        options: ['M = {0; -7}', 'M = {0; 7}', 'M = {-7}', 'M = {7}'],
        correctAnswer: 0,
        explanation: 'x = 0 vagy x + 7 = 0 ⇒ x = -7.',
        hint: 'Egy szorzat akkor 0, ha valamelyik tényezője 0.'
      },
      {
        id: 'peq-1-23',
        question: 'Mennyi az x² - 10x + 21 = 0 egyenlet gyökeinek összege?',
        options: ['10', '-10', '21', '-21'],
        correctAnswer: 0,
        explanation: 'Viète-tétel szerint a normált alakban a gyökök összege a középső tag ellentettje: -(-10) = 10.',
        hint: 'x₁ + x₂ = -p.'
      },
      {
        id: 'peq-1-24',
        question: 'Mennyi az x² - 10x + 21 = 0 egyenlet gyökeinek szorzata?',
        options: ['21', '-21', '10', '-10'],
        correctAnswer: 0,
        explanation: 'Viète-tétel szerint a normált alakban a gyökök szorzata a konstans tag: q = 21.',
        hint: 'x₁ · x₂ = q.'
      },
      {
        id: 'peq-1-25',
        question: 'Oldd meg: √(3x) = 6!',
        options: ['x = 12', 'x = 2', 'x = 36', 'x = 18'],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: 3x = 36 ⇒ x = 12. Próba: √(3·12) = √36 = 6 (helyes).',
        hint: '3x = 36.'
      },
      {
        id: 'peq-1-26',
        question: 'Mely valós számokra igaz, hogy x² + 1 > 0?',
        options: ['Minden valós számra (x ∈ ℝ)', 'Csak x > 0', 'Csak x > -1', 'Nincs ilyen szám'],
        correctAnswer: 0,
        explanation: 'Mivel x² ≥ 0 minden valós x-re, így x² + 1 ≥ 1 > 0 minden valós számra teljesül.',
        hint: 'x² minimális értéke 0, így x² + 1 legalább 1.'
      },
      {
        id: 'peq-1-27',
        question: 'Oldd meg az { x - y = 2; xy = 8 } rendszert a valós számokon!',
        options: ['M = {(4; 2); (-2; -4)}', 'M = {(4; 2)}', 'M = {(2; 4); (-4; -2)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x = y + 2 ⇒ (y + 2)y = 8 ⇒ y² + 2y - 8 = 0 ⇒ y₁ = 2 (x₁ = 4) és y₂ = -4 (x₂ = -2).',
        hint: 'Fejezd ki x-et: x = y + 2.'
      },
      {
        id: 'peq-1-28',
        question: 'Oldd meg: 2x² + 8x = 0!',
        options: ['M = {0; -4}', 'M = {0; 4}', 'M = {-4}', 'M = {4}'],
        correctAnswer: 0,
        explanation: '2x(x + 4) = 0 ⇒ 2x = 0 (x = 0) vagy x + 4 = 0 (x = -4).',
        hint: 'Emelj ki 2x-et!'
      },
      {
        id: 'peq-1-29',
        question: 'Mi a megoldása az x² - 25 ≤ 0 egyenlőtlenségnek?',
        options: ['[-5; 5]', ']-5; 5[', 'x ≤ -5 vagy x ≥ 5', 'x ≤ 5'],
        correctAnswer: 0,
        explanation: '(x - 5)(x + 5) ≤ 0 ⇒ felfelé nyíló parabola a tengely alatt a [-5; 5] zárt szakaszon.',
        hint: 'A megengedő relációjel (≤) miatt a határok zártak.'
      },
      {
        id: 'peq-1-30',
        question: 'Mi a kikötés az 1 / (x - 5) kifejezésre?',
        options: ['x ≠ 5', 'x > 5', 'x ≥ 5', 'x ≠ 0'],
        correctAnswer: 0,
        explanation: 'A nevező nem lehet 0: x - 5 ≠ 0 ⇒ x ≠ 5.',
        hint: 'Nullával való osztás tilos.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Középszintű érettségi feladattípusok',
    subtitle: '30 érettségi típusfeladat: gyökös egyenlet hamis gyökökkel, törtes egyenlőtlenségek, kör és egyenes',
    range: '31–60. kérdés',
    focus: 'Hamis gyökök szűrése, törtes egyenlőtlenségek nyílt határai, kör és parabola metszéspontjai',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 'peq-2-1',
        question: 'Oldd meg a valós számokon: √(2x + 3) = x!',
        options: ['M = {3} (az x = -1 hamis gyök)', 'M = {-1; 3}', 'M = {-1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: '2x + 3 = x² ⇒ x² - 2x - 3 = 0 ⇒ x₁ = 3, x₂ = -1. Próba: x = -1 esetén √(1) = 1 ≠ -1 (hamis gyök!). Csak x = 3 megoldás.',
        hint: 'Próbáld ki mindkét értéket az eredeti egyenletben!'
      },
      {
        id: 'peq-2-2',
        question: 'Mi az (x - 1)(x - 5) ≤ 0 egyenlőtlenség megoldáshalmaza?',
        options: ['[1; 5]', ']1; 5[', 'x ≤ 1 vagy x ≥ 5', 'x ≤ 5'],
        correctAnswer: 0,
        explanation: 'A parabola gyökei 1 és 5, felfelé nyílik, így a tengely alatt a zárt [1; 5] intervallumon jár.',
        hint: 'A zárt határok a ≤ jel miatt kellenek.'
      },
      {
        id: 'peq-2-3',
        question: 'Oldd meg a valós számokon: (x + 4) / (x - 2) ≤ 0!',
        options: ['[-4; 2[ (a -4 zárt, a 2 nyílt)', '[-4; 2]', ']-4; 2[', 'x ≤ -4 vagy x > 2'],
        correctAnswer: 0,
        explanation: 'A számláló gyöke -4 (zárt), a nevezőé 2 (kikötés: x ≠ 2, nyílt). A tört negatív a [-4; 2[ félig nyílt intervallumon.',
        hint: 'A nevező gyöke sosem lehet zárt határpont!'
      },
      {
        id: 'peq-2-4',
        question: 'Oldd meg: (x² - 9) / (x + 3) = 0!',
        options: ['M = {3} (csak a 3)', 'M = {-3; 3}', 'M = {-3}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés: x + 3 ≠ 0 ⇒ x ≠ -3. A számláló x = ±3-nál 0, de a -3 ki van zárva, így csak x = 3 megoldás.',
        hint: 'Nézd meg a kikötést a nevezőre!'
      },
      {
        id: 'peq-2-5',
        question: 'Mely pontokban metszi egymást az y = x² parabola és az y = x + 6 egyenes?',
        options: ['P₁(-2; 4) és P₂(3; 9)', 'P₁(2; 4) és P₂(-3; 9)', 'P₁(-2; -2) és P₂(3; 3)', 'Nem metszik egymást'],
        correctAnswer: 0,
        explanation: 'x² = x + 6 ⇒ x² - x - 6 = 0 ⇒ x₁ = 3 (y₁ = 9) és x₂ = -2 (y₂ = 4). Pontok: (-2; 4) és (3; 9).',
        hint: 'x² - x - 6 = 0 gyökei: 3 és -2.'
      },
      {
        id: 'peq-2-6',
        question: 'Hol metszi az y = 4 egyenes az x² + y² = 25 kört?',
        options: ['P₁(-3; 4) és P₂(3; 4)', 'P₁(-4; 3) és P₂(4; 3)', 'P(0; 4)', 'Nem metszik egymást'],
        correctAnswer: 0,
        explanation: 'x² + 4² = 25 ⇒ x² + 16 = 25 ⇒ x² = 9 ⇒ x = ±3. Metszéspontok: (-3; 4) és (3; 4).',
        hint: 'x² + 16 = 25.'
      },
      {
        id: 'peq-2-7',
        question: 'Mi a 2x² - 7x + 3 polinom gyöktényezős alakja?',
        options: ['2(x - 3)(x - 1/2) vagy (x - 3)(2x - 1)', '(x - 3)(x - 1/2)', '2(x + 3)(x + 1/2)', '(2x + 1)(x - 3)'],
        correctAnswer: 0,
        explanation: 'Gyökök: x₁ = 3 és x₂ = 1/2. Főegyüttható a = 2. Alak: 2(x - 3)(x - 1/2) = (x - 3)(2x - 1).',
        hint: 'Ne felejtsd el az a = 2 főegyütthatót elöl!'
      },
      {
        id: 'peq-2-8',
        question: 'Egyszerűsítsd az algebrai törtet: (x² - 5x + 6) / (x - 2)!',
        options: ['x - 3  (x ≠ 2 esetén)', 'x - 2', 'x + 3', 'Nem egyszerűsíthető'],
        correctAnswer: 0,
        explanation: 'x² - 5x + 6 = (x - 2)(x - 3). Egyszerűsítve (x - 2)-vel: x - 3, feltéve, hogy x ≠ 2.',
        hint: 'Bontsd fel a számlálót gyöktényezőkre!'
      },
      {
        id: 'peq-2-9',
        question: 'Oldd meg a valós számokon: |x - 4| = 3!',
        options: ['M = {1; 7}', 'M = {7}', 'M = {-1; 7}', 'M = {-7; 7}'],
        correctAnswer: 0,
        explanation: 'x - 4 = 3 ⇒ x = 7, vagy x - 4 = -3 ⇒ x = 1.',
        hint: 'A 4-től mért távolság 3: balra 1, jobbra 7.'
      },
      {
        id: 'peq-2-10',
        question: 'Oldd meg: |x + 2| < 5!',
        options: [']-7; 3[', '[-7; 3]', 'x < 3', 'x < -7 vagy x > 3'],
        correctAnswer: 0,
        explanation: '-5 < x + 2 < 5 ⇒ -7 < x < 3, azaz ]-7; 3[.',
        hint: 'A -2-től mért távolság kisebb 5-nél.'
      },
      {
        id: 'peq-2-11',
        question: 'Számítsd ki az x² - 4x + 5 = 0 egyenlet diszkriminánsát!',
        options: ['D = -4', 'D = 4', 'D = 0', 'D = 36'],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac = (-4)² - 4·1·5 = 16 - 20 = -4.',
        hint: 'D = b² - 4ac.'
      },
      {
        id: 'peq-2-12',
        question: 'Oldd meg az { x + y = 1; x² + y² = 25 } egyenletrendszert!',
        options: ['M = {(4; -3); (-3; 4)}', 'M = {(5; 0); (0; 5)}', 'M = {(3; -2); (-2; 3)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'y = 1 - x ⇒ x² + (1 - x)² = 25 ⇒ 2x² - 2x - 24 = 0 ⇒ x² - x - 12 = 0 ⇒ x₁ = 4 (y₁ = -3), x₂ = -3 (y₂ = 4).',
        hint: 'Helyettesíts y = 1 - x-et a második egyenletbe!'
      },
      {
        id: 'peq-2-13',
        question: 'Oldd meg a valós számokon: √(x + 7) = x + 1!',
        options: ['M = {2} (az x = -3 hamis gyök)', 'M = {-3; 2}', 'M = {-3}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x + 7 = (x + 1)² = x² + 2x + 1 ⇒ x² + x - 6 = 0 ⇒ x₁ = 2, x₂ = -3. Próba: x = -3 esetén √4 = 2 ≠ -2 (hamis!). Csak x = 2.',
        hint: 'Próbáld ki x = -3-at a jobb oldalon: -3 + 1 = -2!'
      },
      {
        id: 'peq-2-14',
        question: 'Mi a megoldása az (x - 3)² ≤ 0 egyenlőtlenségnek?',
        options: ['M = {3} (egyetlen pont)', 'M = ∅', 'M = ℝ', 'x ≤ 3'],
        correctAnswer: 0,
        explanation: 'A négyzet sosem negatív (< 0), de = 0 lehet x = 3-nál. Így az egyetlen megoldás x = 3.',
        hint: 'Mikor lehet egy teljes négyzet ≤ 0?'
      },
      {
        id: 'peq-2-15',
        question: 'Oldd meg: x² - 6x + 8 > 0!',
        options: ['x < 2 vagy x > 4', '2 < x < 4', '[2; 4]', 'x > 4'],
        correctAnswer: 0,
        explanation: 'A gyökök 2 és 4. Felfelé nyíló parabola a tengely felett a gyökökön kívül jár: x < 2 vagy x > 4.',
        hint: 'Külső intervallumok.'
      },
      {
        id: 'peq-2-16',
        question: 'Mely pontban érinti az y = 2x - 1 egyenes az y = x² parabolát?',
        options: ['P(1; 1)', 'P(2; 4)', 'P(0; -1)', 'P(-1; 1)'],
        correctAnswer: 0,
        explanation: 'x² = 2x - 1 ⇒ x² - 2x + 1 = 0 ⇒ (x - 1)² = 0 ⇒ x = 1 (y = 1). Pont: (1; 1).',
        hint: 'x² - 2x + 1 = 0 teljes négyzet.'
      },
      {
        id: 'peq-2-17',
        question: 'Mely pontban érinti az x = 4 függőleges egyenes az x² + y² = 16 kört?',
        options: ['P(4; 0)', 'P(0; 4)', 'P(4; 4)', 'Nem érinti'],
        correctAnswer: 0,
        explanation: '4² + y² = 16 ⇒ 16 + y² = 16 ⇒ y² = 0 ⇒ y = 0. Érintési pont: (4; 0).',
        hint: 'A kör sugara r = 4, az egyenes x = 4.'
      },
      {
        id: 'peq-2-18',
        question: 'Oldd meg a valós számokon: √(x - 1) · (x - 4) = 0!',
        options: ['M = {1; 4}', 'M = {4}', 'M = {1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés: x - 1 ≥ 0 ⇒ x ≥ 1. A szorzat 0, ha x = 1 vagy x = 4. Mivel mindkettő ≥ 1, M = {1; 4}.',
        hint: 'Mindkét tényező zérushelye megfelel a kikötésnek.'
      },
      {
        id: 'peq-2-19',
        question: 'Melyek az x² - 8x + 12 = 0 egyenlet gyökei?',
        options: ['x₁ = 2 és x₂ = 6', 'x₁ = -2 és x₂ = -6', 'x₁ = 3 és x₂ = 4', 'x₁ = -3 és x₂ = -4'],
        correctAnswer: 0,
        explanation: 'Szorzat 12, összeg 8 ⇒ 2 és 6.',
        hint: '2 · 6 = 12 és 2 + 6 = 8.'
      },
      {
        id: 'peq-2-20',
        question: 'Oldd meg a 3x² - 5x - 2 = 0 másodfokú egyenletet!',
        options: ['x₁ = 2 és x₂ = -1/3', 'x₁ = -2 és x₂ = 1/3', 'x₁ = 3 és x₂ = -2', 'Nincs valós gyök'],
        correctAnswer: 0,
        explanation: 'D = 25 - 4·3·(-2) = 25 + 24 = 49. x = (5 ± 7) / 6 ⇒ x₁ = 12/6 = 2, x₂ = -2/6 = -1/3.',
        hint: 'D = 49, aminek négyzetgyöke 7.'
      },
      {
        id: 'peq-2-21',
        question: 'Mi a megoldása az (x + 2)/(x - 1) > 0 egyenlőtlenségnek?',
        options: ['x < -2 vagy x > 1', '-2 < x < 1', 'x > 1', 'x < -2'],
        correctAnswer: 0,
        explanation: 'A tört akkor pozitív, ha a számláló és nevező azonos előjelű. Ez a -2-nél kisebb és 1-nél nagyobb számokra teljesül.',
        hint: 'Két azonos előjel hányadosa pozitív.'
      },
      {
        id: 'peq-2-22',
        question: 'Oldd meg: x + y = 8  és  xy = 15!',
        options: ['M = {(3; 5); (5; 3)}', 'M = {(3; 5)}', 'M = {(2; 6); (6; 2)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'u² - 8u + 15 = 0 gyökei 3 és 5. Megoldások: (3; 5) és (5; 3).',
        hint: 'Két szám összege 8, szorzata 15.'
      },
      {
        id: 'peq-2-23',
        question: 'Mi a megoldása az x² - 2x - 15 ≤ 0 egyenlőtlenségnek?',
        options: ['[-3; 5]', ']-3; 5[', 'x ≤ -3 vagy x ≥ 5', '[-5; 3]'],
        correctAnswer: 0,
        explanation: 'A gyökök -3 és 5. Felfelé nyíló parabola a tengely alatt a zárt [-3; 5] intervallumon jár.',
        hint: '(-3) · 5 = -15 és -3 + 5 = 2.'
      },
      {
        id: 'peq-2-24',
        question: 'Oldd meg: (2x - 4) / (x + 3) = 0!',
        options: ['x = 2', 'x = -3', 'x = 2 és x = -3', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: '2x - 4 = 0 ⇒ x = 2. A nevező x = -3-nál lenne 0, ami nem egyezik 2-vel, így x = 2 a megoldás.',
        hint: '2x - 4 = 0.'
      },
      {
        id: 'peq-2-25',
        question: 'Oldd meg: √(4x + 9) = 5!',
        options: ['x = 4', 'x = 16', 'x = 1', 'x = -1'],
        correctAnswer: 0,
        explanation: '4x + 9 = 25 ⇒ 4x = 16 ⇒ x = 4. Próba: √(16 + 9) = √25 = 5 (helyes).',
        hint: '4x + 9 = 25.'
      },
      {
        id: 'peq-2-26',
        question: 'Egy diák az x² = 10x egyenletet leosztotta x-szel és x = 10-et kapott. Mi a hiba?',
        options: [
          'Gyökvesztés történt: az x = 0 gyök elveszett',
          'Hamis gyök keletkezett',
          'Rossz az osztás eredménye',
          'A levezetés hibátlan'
        ],
        correctAnswer: 0,
        explanation: 'x-szel való osztás nem megengedett, mert x = 0 is gyöke az egyenletnek: x(x - 10) = 0 ⇒ x₁ = 0, x₂ = 10.',
        hint: 'Ismeretlennel nem osztunk, mert 0 is lehet!'
      },
      {
        id: 'peq-2-27',
        question: 'Oldd meg: x² + y² = 10  és  y = 3x!',
        options: ['M = {(1; 3); (-1; -3)}', 'M = {(1; 3)}', 'M = {(3; 1); (-3; -1)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x² + (3x)² = 10 ⇒ x² + 9x² = 10 ⇒ 10x² = 10 ⇒ x² = 1 ⇒ x = ±1. y = 3x ⇒ (1; 3) és (-1; -3).',
        hint: 'x² + 9x² = 10x² = 10.'
      },
      {
        id: 'peq-2-28',
        question: 'Oldd meg: x² - 12x + 36 = 0!',
        options: ['M = {6} (egyetlen gyök)', 'M = {-6; 6}', 'M = {-6}', 'M = ∅'],
        correctAnswer: 0,
        explanation: '(x - 6)² = 0 ⇒ x = 6.',
        hint: 'Teljes négyzet: (x - 6)².'
      },
      {
        id: 'peq-2-29',
        question: 'Oldd meg a valós számokon: √x + 5 = 2!',
        options: ['M = ∅ (nincs megoldás)', 'x = 9', 'x = -9', 'x = 49'],
        correctAnswer: 0,
        explanation: '√x = 2 - 5 = -3. Négyzetgyök értéke nem lehet negatív, így nincs valós megoldás.',
        hint: '√x = -3.'
      },
      {
        id: 'peq-2-30',
        question: 'Mi a megoldása az (x - 2)(x - 5) ≥ 0 egyenlőtlenségnek?',
        options: ['x ≤ 2 vagy x ≥ 5', '[2; 5]', '2 ≤ x ≤ 5', 'x ≥ 5'],
        correctAnswer: 0,
        explanation: 'Felfelé nyíló parabola a tengely felett és a tengelyen a gyökökön kívül jár: x ≤ 2 vagy x ≥ 5.',
        hint: 'Külső zárt félegyenesek.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű szintézis és mesterfeladatok',
    subtitle: '30 összetett feladat: paraméterek, szimmetrikus kifejezések, két másodfokú egyenlet és javítókulcs',
    range: '61–90. kérdés',
    focus: 'Paraméteres diszkrimináns, gyöktényezős törtek, Viète azonosságok, szigorú pontozási szabályok',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 'peq-3-1',
        question: 'Milyen k valós paraméter esetén van az x² - 6x + k = 0 egyenletnek pontosan 1 valós gyöke?',
        options: ['k = 9', 'k = 36', 'k = 6', 'k = -9'],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac = 36 - 4k = 0 ⇒ 4k = 36 ⇒ k = 9.',
        hint: 'Állítsd a diszkriminánst egyenlővé nullával!'
      },
      {
        id: 'peq-3-2',
        question: 'Ha x₁ és x₂ az x² - 5x + 2 = 0 egyenlet gyökei, mennyi x₁² + x₂² pontos értéke?',
        options: ['21', '25', '29', '17'],
        correctAnswer: 0,
        explanation: 'x₁ + x₂ = 5 és x₁x₂ = 2. x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = 5² - 2·2 = 25 - 4 = 21.',
        hint: '(x₁ + x₂)² - 2x₁x₂.'
      },
      {
        id: 'peq-3-3',
        question: 'Ha x₁ és x₂ a 2x² + 5x - 1 = 0 egyenlet gyökei, mennyi 1/x₁ + 1/x₂?',
        options: ['5', '-5', '2.5', '-2.5'],
        correctAnswer: 0,
        explanation: '1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁x₂) = (-5/2) / (-1/2) = 5. (Vagy egyszerűen -b/c = -5/(-1) = 5).',
        hint: '-b/c képlet.'
      },
      {
        id: 'peq-3-4',
        question: 'A √(3x + 1) = x - 3 egyenlet megoldása során x² - 9x + 8 = 0 adódik (gyökök: 1 és 8). Mi a helyes megoldáshalmaz?',
        options: ['M = {8} (az x = 1 hamis gyök)', 'M = {1; 8}', 'M = {1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés x - 3 ≥ 0 ⇒ x ≥ 3. Az x = 1 ezt nem teljesíti (√4 = 2 ≠ -2). Valódi gyök csak az x = 8 (√25 = 5 = 8 - 3).',
        hint: 'Helyettesíts be x = 1-et: a jobb oldal 1 - 3 = -2 negatív!'
      },
      {
        id: 'peq-3-5',
        question: 'Hány valós számpár megoldása van az { x² + y² = 25; x² - y² = 7 } rendszernek?',
        options: [
          '4 számpár: (4; 3), (4; -3), (-4; 3), (-4; -3)',
          '2 számpár',
          '1 számpár',
          '0 számpár'
        ],
        correctAnswer: 0,
        explanation: 'Összeadva: 2x² = 32 ⇒ x² = 16 ⇒ x = ±4. Kivonva: 2y² = 18 ⇒ y² = 9 ⇒ y = ±3. Az előjelek kombinálásával 4 számpár adódik.',
        hint: 'Add össze és vond ki a két egyenletet!'
      },
      {
        id: 'peq-3-6',
        question: 'Mi a megoldása az (x - 2)²(x + 5) ≤ 0 egyenlőtlenségnek?',
        options: ['x ≤ -5 vagy x = 2', 'x ≤ -5', 'x ≤ 2', '[-5; 2]'],
        correctAnswer: 0,
        explanation: '(x - 2)² ≥ 0 minden valós x-re. Ezért a szorzat akkor negatív, ha x + 5 ≤ 0 (x ≤ -5), de = 0 lehet x = 2 esetén is!',
        hint: 'A négyzetteljes tag x = 2-nél nullát ad, ami megengedett!'
      },
      {
        id: 'peq-3-7',
        question: 'Milyen m paraméterértékek esetén nincs valós gyöke az x² + 4x + m = 0 egyenletnek?',
        options: ['m > 4', 'm < 4', 'm ≥ 4', 'm = 4'],
        correctAnswer: 0,
        explanation: 'D = 16 - 4m < 0 ⇒ 16 < 4m ⇒ m > 4.',
        hint: 'D < 0.'
      },
      {
        id: 'peq-3-8',
        question: 'Mely pontokban metszi egymást az y = x² és az y = 6 - x² parabola?',
        options: ['P₁(-√3; 3) és P₂(√3; 3)', 'P₁(-3; 9) és P₂(3; 9)', 'P(0; 6)', 'Nem metszik egymást'],
        correctAnswer: 0,
        explanation: 'x² = 6 - x² ⇒ 2x² = 6 ⇒ x² = 3 ⇒ x = ±√3. y = (±√3)² = 3. Pontok: (-√3; 3) és (√3; 3).',
        hint: '2x² = 6 ⇒ x² = 3.'
      },
      {
        id: 'peq-3-9',
        question: 'Keressük a valós megoldásokat: √(x - 2) + √(2 - x) = 0!',
        options: ['M = {2} (egyetlen szám)', 'M = ∅', 'Minden x ≥ 2', 'x = 0'],
        correctAnswer: 0,
        explanation: 'Kikötések: x - 2 ≥ 0 (x ≥ 2) és 2 - x ≥ 0 (x ≤ 2). Az egyetlen közös szám x = 2. Ekkor √0 + √0 = 0.',
        hint: 'Nézd meg az értelmezési tartományok metszetét!'
      },
      {
        id: 'peq-3-10',
        question: 'Oldd meg: (x² - 4x + 3) / √(x - 2) = 0!',
        options: ['M = {3} (csak a 3)', 'M = {1; 3}', 'M = {1}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'Kikötés a nevezőben lévő gyök miatt: x - 2 > 0 ⇒ x > 2. A számláló gyökei x = 1 és x = 3, de az 1 nem nagyobb 2-nél, így csak x = 3 megoldás.',
        hint: 'Kikötés: x > 2.'
      },
      {
        id: 'peq-3-11',
        question: 'Oldd meg: x + 6/x = 5  (x ≠ 0)!',
        options: ['M = {2; 3}', 'M = {-2; -3}', 'M = {1; 6}', 'M = {5}'],
        correctAnswer: 0,
        explanation: 'Beszorozva x-szel: x² + 6 = 5x ⇒ x² - 5x + 6 = 0 ⇒ x₁ = 2, x₂ = 3.',
        hint: 'x² - 5x + 6 = 0.'
      },
      {
        id: 'peq-3-12',
        question: 'Hány valós megoldáspárja van az { x² + y² = 13; xy = 6 } rendszernek?',
        options: ['4 megoldáspár', '2 megoldáspár', '1 megoldáspár', '0 megoldáspár'],
        correctAnswer: 0,
        explanation: '(x + y)² = 13 + 12 = 25 ⇒ x + y = ±5. x + y = 5 és xy = 6 esetén (2; 3), (3; 2). x + y = -5 és xy = 6 esetén (-2; -3), (-3; -2). Összesen 4 pár.',
        hint: '(x + y)² = 25.'
      },
      {
        id: 'peq-3-13',
        question: 'Oldd meg a valós számokon: |2x - 4| ≤ 6!',
        options: ['[-1; 5]', ']-1; 5[', 'x ≤ 5', 'x ≤ -1 vagy x ≥ 5'],
        correctAnswer: 0,
        explanation: '-6 ≤ 2x - 4 ≤ 6 ⇒ -2 ≤ 2x ≤ 10 ⇒ -1 ≤ x ≤ 5, azaz [-1; 5].',
        hint: '-6 ≤ 2x - 4 ≤ 6.'
      },
      {
        id: 'peq-3-14',
        question: 'Egy derékszögű háromszög átfogója c = 13 cm, a két befogó összege a + b = 17 cm. Mekkorák a befogók?',
        options: ['5 cm és 12 cm', '6 cm és 11 cm', '7 cm és 10 cm', '8 cm és 9 cm'],
        correctAnswer: 0,
        explanation: 'a² + b² = 169. (a + b)² = 289 ⇒ 2ab = 289 - 169 = 120 ⇒ ab = 60. Az u² - 17u + 60 = 0 gyökei 5 és 12. Befogók: 5 cm és 12 cm.',
        hint: '5² + 12² = 25 + 144 = 169 = 13².'
      },
      {
        id: 'peq-3-15',
        question: 'Melyek az x² - (p + 1)x + p = 0 egyenlet gyökei tetszőleges valós p paraméter esetén?',
        options: ['x₁ = 1 és x₂ = p', 'x₁ = -1 és x₂ = -p', 'x₁ = p és x₂ = p + 1', 'Nincs valós gyök'],
        correctAnswer: 0,
        explanation: 'Viète szerint a szorzat p (1 · p), az összeg p + 1 (1 + p). Így a gyökök azonnal: 1 és p.',
        hint: '1 + p = p + 1 és 1 · p = p.'
      },
      {
        id: 'peq-3-16',
        question: 'Mi a megoldáshalmaza az (x² - 16)(x - 1) ≥ 0 egyenlőtlenségnek?',
        options: ['[-4; 1] ∪ [4; ∞[', '[-4; 4]', '] -∞; -4] ∪ [1; 4]', '[1; 4]'],
        correctAnswer: 0,
        explanation: 'A tényezők zérushelyei: -4, 1, 4. Előjeltáblázattal a szorzat pozitív vagy 0 a [-4; 1] és a [4; ∞[ intervallumokon.',
        hint: 'Vizsgáld az előjeleket a -4, 1, 4 pontok közötti szakaszokon!'
      },
      {
        id: 'peq-3-17',
        question: 'Milyen m meredekség esetén érinti az y = mx egyenes az y = x² + 4 parabolát?',
        options: ['m = 4 vagy m = -4', 'm = 2 vagy m = -2', 'm = 8 vagy m = -8', 'm = 0'],
        correctAnswer: 0,
        explanation: 'x² - mx + 4 = 0 ⇒ D = m² - 4·1·4 = m² - 16 = 0 ⇒ m² = 16 ⇒ m = ±4.',
        hint: 'D = m² - 16 = 0.'
      },
      {
        id: 'peq-3-18',
        question: 'Ha x₁ és x₂ az x² - 4x + 1 = 0 egyenlet gyökei, mennyi (x₁ - x₂)² pontos értéke?',
        options: ['12', '16', '14', '8'],
        correctAnswer: 0,
        explanation: '(x₁ - x₂)² = (x₁ + x₂)² - 4x₁x₂ = 4² - 4·1 = 16 - 4 = 12. (Ez pontosan megegyezik a diszkriminánssal: D = 12!).',
        hint: '(x₁ - x₂)² = D / a².'
      },
      {
        id: 'peq-3-19',
        question: 'Oldd meg a valós számokon: √(x + 5) + √x = 5!',
        options: ['x = 4', 'x = 9', 'x = 1', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: '√(x + 5) = 5 - √x ⇒ x + 5 = 25 - 10√x + x ⇒ 10√x = 20 ⇒ √x = 2 ⇒ x = 4. Próba: √9 + √4 = 3 + 2 = 5 (helyes).',
        hint: 'Próbáld ki x = 4-et: √9 + √4 = 3 + 2 = 5!'
      },
      {
        id: 'peq-3-20',
        question: 'Hogyan eliminálhatók a négyzetes tagok az { x² + y² + 2x = 9; x² + y² - 4y = 5 } rendszerben?',
        options: [
          'Kivonjuk egymásból a két egyenletet: 2x + 4y = 4  ⇒  x = 2 - 2y',
          'Összeadjuk a két egyenletet',
          'Mindkét egyenletet megszorozzuk x-szel',
          'Nem eliminálhatók a négyzetes tagok'
        ],
        correctAnswer: 0,
        explanation: 'A két egyenlet kivonásával x² és y² kiesik: 2x - (-4y) = 9 - 5 ⇒ 2x + 4y = 4 ⇒ x + 2y = 2 ⇒ x = 2 - 2y.',
        hint: 'Az azonos együtthatójú tagok kivonással kiejthetők.'
      },
      {
        id: 'peq-3-21',
        question: 'Egyszerűsítsd az algebrai törtet: (x² - 1) / (x² - 2x + 1)!',
        options: [
          '(x + 1) / (x - 1)  (x ≠ 1 és x ≠ -1 esetén)',
          '(x - 1) / (x + 1)',
          'x + 1',
          'Nem egyszerűsíthető'
        ],
        correctAnswer: 0,
        explanation: 'Számláló: (x - 1)(x + 1). Nevező: (x - 1)². (x - 1)-gyel egyszerűsítve: (x + 1) / (x - 1).',
        hint: 'Bontsd fel a számlálót (a-b)(a+b), a nevezőt (a-b)² alakba!'
      },
      {
        id: 'peq-3-22',
        question: 'Milyen k értékek esetén van az x² - 2kx + k + 2 = 0 egyenletnek egyetlen valós gyöke?',
        options: ['k = 2 vagy k = -1', 'k = 1 vagy k = -2', 'Csak k = 2', 'Nincs ilyen k'],
        correctAnswer: 0,
        explanation: 'D = (-2k)² - 4·1·(k + 2) = 4k² - 4k - 8 = 0 ⇒ k² - k - 2 = 0 ⇒ (k - 2)(k + 1) = 0 ⇒ k = 2 vagy k = -1.',
        hint: 'k² - k - 2 = 0.'
      },
      {
        id: 'peq-3-23',
        question: 'Oldd meg a valós számokon: x³ - 4x = 0!',
        options: ['M = {-2; 0; 2}', 'M = {0; 4}', 'M = {-2; 2}', 'M = {2}'],
        correctAnswer: 0,
        explanation: 'Kiemeléssel: x(x² - 4) = 0 ⇒ x(x - 2)(x + 2) = 0 ⇒ gyökök: -2, 0, 2.',
        hint: 'Emelj ki x-et, majd alkalmazz nevezetes azonosságot!'
      },
      {
        id: 'peq-3-24',
        question: 'Oldd meg az egyenlőtlenséget: (x - 3)/(x + 1) < 1!',
        options: ['x > -1', 'x < -1', '-1 < x < 3', 'Minden valós x-re'],
        correctAnswer: 0,
        explanation: '(x - 3)/(x + 1) - 1 < 0 ⇒ ((x - 3) - (x + 1))/(x + 1) < 0 ⇒ -4 / (x + 1) < 0 ⇒ x + 1 > 0 ⇒ x > -1.',
        hint: 'Rendezz 0-ra: vond le az 1-et és hozz közös nevezőre!'
      },
      {
        id: 'peq-3-25',
        question: 'Oldd meg a valós számokon: √(2x - 1) = √(x + 4)!',
        options: ['x = 5', 'x = 3', 'x = -4', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: 2x - 1 = x + 4 ⇒ x = 5. Próba: √9 = √9 = 3 (helyes).',
        hint: '2x - 1 = x + 4.'
      },
      {
        id: 'peq-3-26',
        question: 'Oldd meg az { x² + y² = 20; y = 2x } rendszert!',
        options: ['M = {(2; 4); (-2; -4)}', 'M = {(2; 4)}', 'M = {(4; 2); (-4; -2)}', 'M = ∅'],
        correctAnswer: 0,
        explanation: 'x² + (2x)² = 20 ⇒ x² + 4x² = 20 ⇒ 5x² = 20 ⇒ x² = 4 ⇒ x = ±2. y = 2x ⇒ (2; 4) és (-2; -4).',
        hint: '5x² = 20.'
      },
      {
        id: 'peq-3-27',
        question: 'Mely valós számokra igaz, hogy x² - 8x + 16 > 0?',
        options: ['Minden x ∈ ℝ, kivéve x = 4 (ℝ \\ {4})', 'x > 4', 'x < 4', 'Minden valós számra'],
        correctAnswer: 0,
        explanation: 'x² - 8x + 16 = (x - 4)². Egy szám négyzete mindig pozitív, kivéve ha az alap 0 (x = 4-nél 0). Így ℝ \\ {4}.',
        hint: '(x - 4)² > 0 mikor nem teljesül?'
      },
      {
        id: 'peq-3-28',
        question: 'Ha a gyökök összege S = x₁ + x₂ = 3, szorzata P = x₁x₂ = 1, mennyi x₁³ + x₂³ értéke?',
        options: ['18', '27', '24', '15'],
        correctAnswer: 0,
        explanation: 'x₁³ + x₂³ = (x₁ + x₂)³ - 3x₁x₂(x₁ + x₂) = S³ - 3PS = 3³ - 3·1·3 = 27 - 9 = 18.',
        hint: 'S³ - 3PS azonosság.'
      },
      {
        id: 'peq-3-29',
        question: 'Miért kötelező az érettségin leírni a hamis gyök kizárását, nem elég csupán elhagyni?',
        options: [
          'Mert a javítókulcs külön részpontot ad a hamis gyök azonosításáért és explicit elutasításáért',
          'Mert anélkül a vizsgázó dolgozatát érvénytelennek nyilvánítják',
          'Mert a hamis gyökből negatív szám lesz',
          'Nincs ilyen szabály, elég csak a helyes gyököt leírni'
        ],
        correctAnswer: 0,
        explanation: 'A javítókulcs a logikai lépéseket díjazza: a vizsgázónak igazolnia kell, hogy ellenőrzéssel vagy kikötéssel tudatosan szűrte ki a nem ekvivalens lépés melléktermékét.',
        hint: 'A pontozók a tudatos ellenőrzésért adnak részpontot.'
      },
      {
        id: 'peq-3-30',
        question: 'Oldd meg a valós számok halmazán: √(x - 4) + √(x + 5) = 9!',
        options: ['x = 20', 'x = 11', 'x = 4', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: 'Próba x = 20-ra: √(20 - 4) + √(20 + 5) = √16 + √25 = 4 + 5 = 9. Az egyenlet egyetlen valós gyöke x = 20.',
        hint: 'Próbáld ki x = 20-at: √16 + √25 = 4 + 5 = 9!'
      }
    ]
  }
};

export const PracticeExamQuiz: React.FC<PracticeExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-gyakorlas-tudasproba-quiz"
      topicTitle="10. Gyakorlás, fejezeti tudáspróba"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • KVÍZ"
      themeColor="violet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <PracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

