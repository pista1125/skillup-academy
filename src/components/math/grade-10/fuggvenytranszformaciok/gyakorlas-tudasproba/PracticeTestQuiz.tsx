import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeTestMatcher } from './PracticeTestMatcher';
import { PracticeTestSorter } from './PracticeTestSorter';
import {
  TransformSynthesisSvg,
  FoldedAbsoluteSvg,
  BoundedDomainParabolaSvg
} from './PracticeTestFigures';

interface PracticeTestQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Transzformációs mesterképlet',
    description: 'f(x) = a · f₀(x - u) + v. V(u; v) a csúcspont. u jobbra/balra mozgat ellenkező előjellel, v fel/le mozgat azonos előjellel, a skáláz és tükröz.',
    note: 'Lépéssorrend: 1. vízszintes eltolás (u), 2. függőleges nyújtás/tükrözés (a), 3. függőleges eltolás (v).',
    color: 'from-violet-500 to-indigo-600',
    figure: <TransformSynthesisSvg size={180} />
  },
  {
    title: 'Felhajtott abszolútérték',
    description: '|f(x)| esetén a grafikon x-tengely feletti része változatlan marad, az alatta lévő negatív ív pedig tükröződik a tengely fölé.',
    note: 'Az eredeti völgy csúcsa V(u; v)-ből helyi tetőponttá válik a V(u; |v|) pontban.',
    color: 'from-pink-500 to-rose-600',
    figure: <FoldedAbsoluteSvg size={180} />
  },
  {
    title: 'Leszűkített tartomány [a; b]',
    description: 'Ha a függvény értelmezési tartománya [a; b], a csúcspont csak akkor szélsőérték, ha u ∈ [a; b]. Ha nincs bent, a szélsőértékek a végpontokban (f(a) és f(b)) vannak.',
    note: 'Értékkészlet meghatározásakor mindig vesd össze a csúcs magasságát a végpontok magasságával!',
    color: 'from-emerald-500 to-teal-600',
    figure: <BoundedDomainParabolaSvg size={180} />
  },
  {
    title: 'Alkalmazások & Modellezés',
    description: 'Bekerítés: 4 oldal esetén négyzet a maximum (x = K/4). 1 fal mentén téglalap a maximum (x = K/4, b = K/2, dupla terület: K²/8). Hajítás: h(t) = -5t² + v₀t + h₀.',
    note: 'Grafikus egyenlet: f(x) = g(x) megoldásai a két grafikon metszéspontjainak x-koordinátái.',
    color: 'from-amber-500 to-orange-600',
    figure: <TransformSynthesisSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alaptranszformációk és bázispontok',
    subtitle: 'Eltolások fel-le-jobbra-balra, tükrözések, nyújtások és bázispontok (30 feladat).',
    range: '1–30. feladat',
    focus: 'Alapfüggvények, eltolások és csúcspontok azonosítása',
    questions: [
      {
        id: 'ptq1-1',
        questionTypeBadge: 'Függőleges eltolás',
        question: 'Hogyan kapjuk meg az f(x) = x² + 3 függvény grafikonját az alap x² grafikonjából?',
        options: [
          'Az y-tengely mentén 3 egységgel felfelé toljuk',
          'Az y-tengely mentén 3 egységgel lefelé toljuk',
          'Az x-tengely mentén 3 egységgel jobbra toljuk',
          'Az x-tengely mentén 3 egységgel balra toljuk'
        ],
        correctAnswer: 'Az y-tengely mentén 3 egységgel felfelé toljuk',
        explanation: 'A függvényértékhez hozzáadott +3 minden pontot 3 egységgel feljebb tol függőlegesen.'
      },
      {
        id: 'ptq1-2',
        questionTypeBadge: 'Függőleges eltolás',
        question: 'Hogyan kapjuk meg az f(x) = |x| - 4 grafikonját az |x| alapfüggvényből?',
        options: [
          'Az y-tengely mentén 4 egységgel lefelé toljuk',
          'Az y-tengely mentén 4 egységgel felfelé toljuk',
          'Az x-tengely mentén 4 egységgel balra toljuk',
          'Az x-tengely mentén 4 egységgel jobbra toljuk'
        ],
        correctAnswer: 'Az y-tengely mentén 4 egységgel lefelé toljuk',
        explanation: 'A -4 a függvényértéket csökkenti, így a „V” alakú grafikon 4 egységgel lejjebb tolódik.'
      },
      {
        id: 'ptq1-3',
        questionTypeBadge: 'Vízszintes eltolás',
        question: 'Hogyan kapjuk meg az f(x) = (x - 5)² grafikonját az x² grafikonjából?',
        options: [
          'Az x-tengely mentén 5 egységgel jobbra toljuk',
          'Az x-tengely mentén 5 egységgel balra toljuk',
          'Az y-tengely mentén 5 egységgel lefelé toljuk',
          'Az y-tengely mentén 5 egységgel felfelé toljuk'
        ],
        correctAnswer: 'Az x-tengely mentén 5 egységgel jobbra toljuk',
        explanation: 'A változóból kivont szám ellentétes irányban mozgat: x - 5 = 0 ⇒ x = 5, tehát 5 egységgel jobbra tolódik.'
      },
      {
        id: 'ptq1-4',
        questionTypeBadge: 'Vízszintes eltolás',
        question: 'Hogyan kapjuk meg az f(x) = |x + 2| grafikonját az |x| grafikonjából?',
        options: [
          'Az x-tengely mentén 2 egységgel balra toljuk',
          'Az x-tengely mentén 2 egységgel jobbra toljuk',
          'Az y-tengely mentén 2 egységgel felfelé toljuk',
          'Az y-tengely mentén 2 egységgel lefelé toljuk'
        ],
        correctAnswer: 'Az x-tengely mentén 2 egységgel balra toljuk',
        explanation: 'Az abszolútérték jelen belüli +2 balra tolást jelent 2 egységgel (csúcs: x = -2).'
      },
      {
        id: 'ptq1-5',
        questionTypeBadge: 'Csúcspont azonosítás',
        question: 'Mi a csúcspontja az f(x) = (x + 3)² - 4 parabolának?',
        options: [
          'V(-3; -4)',
          'V(3; -4)',
          'V(-3; 4)',
          'V(3; 4)'
        ],
        correctAnswer: 'V(-3; -4)',
        explanation: 'A kanonikus alak (x - u)² + v. Itt u = -3 és v = -4, így V(-3; -4).'
      },
      {
        id: 'ptq1-6',
        questionTypeBadge: 'Csúcspont azonosítás',
        question: 'Mi a bázispontja (csúcspontja) az f(x) = |x - 1| + 2 függvénynek?',
        options: [
          'V(1; 2)',
          'V(-1; 2)',
          'V(1; -2)',
          'V(-1; -2)'
        ],
        correctAnswer: 'V(1; 2)',
        explanation: 'Az eltolások: 1 egységgel jobbra, 2 egységgel fel. A csúcs: V(1; 2).'
      },
      {
        id: 'ptq1-7',
        questionTypeBadge: 'Tükrözés',
        question: 'Melyik tengelyre vett tükrözéssel kapjuk meg az f(x) = -x² grafikont az x² grafikonjából?',
        options: [
          'Az x-tengelyre tükrözve',
          'Az y-tengelyre tükrözve',
          'Az origóra tükrözve',
          'Az y = x egyenesre tükrözve'
        ],
        correctAnswer: 'Az x-tengelyre tükrözve',
        explanation: 'Minden függvényérték az ellentettjére változik (-f(x)), ami a vízszintes x-tengelyre vett tükrözés.'
      },
      {
        id: 'ptq1-8',
        questionTypeBadge: 'Függőleges nyújtás',
        question: 'Hogyan viszonyul az f(x) = 2x² parabola az x² alap-parabolához?',
        options: [
          'Meredekebb, soványabb (minden y-érték kétszeresére nő)',
          'Laposabb, kövérebb (minden y-érték felére csökken)',
          '2 egységgel jobbra van eltolva',
          '2 egységgel feljebb van eltolva'
        ],
        correctAnswer: 'Meredekebb, soványabb (minden y-érték kétszeresére nő)',
        explanation: 'A 2-szeres szorzó miatt az azonos x-hez tartozó magasságok megduplázódnak, így a görbe meredekebb, soványabb lesz.'
      },
      {
        id: 'ptq1-9',
        questionTypeBadge: 'Függőleges összenyomás',
        question: 'Hogyan viszonyul az f(x) = 0,5x² parabola az x² alap-parabolához?',
        options: [
          'Laposabb, kövérebb (minden pont fele olyan magasan van)',
          'Meredekebb, soványabb',
          'Fél egységgel balra van eltolva',
          'Lefelé nyílik'
        ],
        correctAnswer: 'Laposabb, kövérebb (minden pont fele olyan magasan van)',
        explanation: '|a| = 0,5 < 1 esetén a parabola függőlegesen összenyomódik, azaz laposabb, kövérebb lesz.'
      },
      {
        id: 'ptq1-10',
        questionTypeBadge: 'Négyzetgyök ÉT',
        question: 'Mi az értelmezési tartománya az f(x) = √(x - 3) függvénynek a valós számok halmazán?',
        options: [
          'D_f = [3; ∞[',
          'D_f = ]-∞; 3]',
          'D_f = ℝ',
          'D_f = ]3; ∞['
        ],
        correctAnswer: 'D_f = [3; ∞[',
        explanation: 'Négyzetgyök alatt nem állhat negatív szám: x - 3 ≥ 0 ⇒ x ≥ 3, azaz [3; ∞[.'
      },
      {
        id: 'ptq1-11',
        questionTypeBadge: 'Négyzetgyök ÉK',
        question: 'Mi az értékkészlete az f(x) = √x + 2 függvénynek?',
        options: [
          'R_f = [2; ∞[',
          'R_f = [0; ∞[',
          'R_f = ℝ',
          'R_f = ]-∞; 2]'
        ],
        correctAnswer: 'R_f = [2; ∞[',
        explanation: 'Mivel √x ≥ 0 minden valós számra, ezért √x + 2 ≥ 2. A legkisebb érték 2, értékkészlete [2; ∞[.'
      },
      {
        id: 'ptq1-12',
        questionTypeBadge: 'Minimumhely',
        question: 'Hol van a minimumhelye az f(x) = (x - 2)² függvénynek?',
        options: [
          'x = 2',
          'x = -2',
          'y = 0',
          'x = 0'
        ],
        correctAnswer: 'x = 2',
        explanation: 'Egy teljes négyzet legkisebb értéke 0, amit x - 2 = 0, vagyis x = 2 esetén vesz fel.'
      },
      {
        id: 'ptq1-13',
        questionTypeBadge: 'Maximumhely',
        question: 'Hol van a maximumhelye az f(x) = -(x + 4)² függvénynek?',
        options: [
          'x = -4',
          'x = 4',
          'y = 0',
          'x = 0'
        ],
        correctAnswer: 'x = -4',
        explanation: 'Mivel -(x + 4)² ≤ 0, a legnagyobb érték 0, amit az x + 4 = 0 ⇒ x = -4 helyen ér el.'
      },
      {
        id: 'ptq1-14',
        questionTypeBadge: 'Zérushelyek',
        question: 'Mik a zérushelyei az f(x) = x² - 9 függvénynek?',
        options: [
          'x₁ = -3 és x₂ = 3',
          'x = 9',
          'x = 3',
          'Nincs zérushelye'
        ],
        correctAnswer: 'x₁ = -3 és x₂ = 3',
        explanation: 'x² - 9 = 0 ⇒ x² = 9 ⇒ x = ±3.'
      },
      {
        id: 'ptq1-15',
        questionTypeBadge: 'Zérushelyek',
        question: 'Mik a zérushelyei az f(x) = |x| - 5 függvénynek?',
        options: [
          'x₁ = -5 és x₂ = 5',
          'x = 5',
          'x = -5',
          'Nincs zérushelye'
        ],
        correctAnswer: 'x₁ = -5 és x₂ = 5',
        explanation: '|x| - 5 = 0 ⇒ |x| = 5 ⇒ x = ±5.'
      },
      {
        id: 'ptq1-16',
        questionTypeBadge: 'Egyetlen zérushely',
        question: 'Hány zérushelye van az f(x) = (x - 6)² függvénynek?',
        options: [
          '1 zérushelye van: x = 6',
          '2 zérushelye van: x = ±6',
          'Nincs zérushelye',
          'Végtelen sok'
        ],
        correctAnswer: '1 zérushelye van: x = 6',
        explanation: '(x - 6)² = 0 pontosan akkor teljesül, ha x = 6. A parabola csúcsa érinti az x-tengelyt.'
      },
      {
        id: 'ptq1-17',
        questionTypeBadge: 'Zérushelyek',
        question: 'Mik a zérushelyei az f(x) = -(x - 1)² + 4 függvénynek?',
        options: [
          'x₁ = -1 és x₂ = 3',
          'x₁ = 1 és x₂ = 5',
          'x₁ = -3 és x₂ = 1',
          'x₁ = 0 és x₂ = 4'
        ],
        correctAnswer: 'x₁ = -1 és x₂ = 3',
        explanation: '-(x - 1)² + 4 = 0 ⇒ (x - 1)² = 4 ⇒ x - 1 = ±2 ⇒ x₁ = 1 - 2 = -1 és x₂ = 1 + 2 = 3.'
      },
      {
        id: 'ptq1-18',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány valós zérushelye van az f(x) = x² + 1 függvénynek?',
        options: [
          '0 (nincs valós zérushelye)',
          '1',
          '2',
          'Végtelen sok'
        ],
        correctAnswer: '0 (nincs valós zérushelye)',
        explanation: 'Mivel x² ≥ 0 minden valós számra, x² + 1 ≥ 1 > 0, sosem éri el a nullát.'
      },
      {
        id: 'ptq1-19',
        questionTypeBadge: 'Csúcspont',
        question: 'Mi a csúcspontja az f(x) = 3(x - 2)² + 1 függvénynek?',
        options: [
          'V(2; 1)',
          'V(-2; 1)',
          'V(2; 3)',
          'V(6; 1)'
        ],
        correctAnswer: 'V(2; 1)',
        explanation: 'A 3-as szorzó csak a nyújtást befolyásolja, a csúcspont koordinátái u = 2 és v = 1, azaz V(2; 1).'
      },
      {
        id: 'ptq1-20',
        questionTypeBadge: 'Csúcspont',
        question: 'Mi a csúcspontja az f(x) = -0,5(x + 1)² - 2 függvénynek?',
        options: [
          'V(-1; -2)',
          'V(1; -2)',
          'V(-1; 2)',
          'V(-0,5; -2)'
        ],
        correctAnswer: 'V(-1; -2)',
        explanation: 'u = -1, v = -2, így a csúcs V(-1; -2).'
      },
      {
        id: 'ptq1-21',
        questionTypeBadge: 'Képletalkotás',
        question: 'Melyik függvényt kapjuk, ha az x² parabolát jobbra toljuk 2-vel, majd fel 3-mal?',
        options: [
          'f(x) = (x - 2)² + 3',
          'f(x) = (x + 2)² + 3',
          'f(x) = (x - 2)² - 3',
          'f(x) = (x + 3)² + 2'
        ],
        correctAnswer: 'f(x) = (x - 2)² + 3',
        explanation: 'Jobbra 2-vel: (x - 2)², fel 3-mal: +3 ⇒ f(x) = (x - 2)² + 3.'
      },
      {
        id: 'ptq1-22',
        questionTypeBadge: 'Képletalkotás',
        question: 'Melyik függvényt kapjuk, ha az |x| görbét balra toljuk 5-tel, majd le 1-gyel?',
        options: [
          'f(x) = |x + 5| - 1',
          'f(x) = |x - 5| - 1',
          'f(x) = |x + 5| + 1',
          'f(x) = |x - 1| + 5'
        ],
        correctAnswer: 'f(x) = |x + 5| - 1',
        explanation: 'Balra 5-tel: |x + 5|, le 1-gyel: -1 ⇒ f(x) = |x + 5| - 1.'
      },
      {
        id: 'ptq1-23',
        questionTypeBadge: 'Képletalkotás',
        question: 'Melyik függvényt kapjuk, ha a √x görbét jobbra toljuk 4 egységgel?',
        options: [
          'f(x) = √(x - 4)',
          'f(x) = √(x + 4)',
          'f(x) = √x - 4',
          'f(x) = √x + 4'
        ],
        correctAnswer: 'f(x) = √(x - 4)',
        explanation: 'A gyök alatti x helyébe x - 4 lép, tehát f(x) = √(x - 4).'
      },
      {
        id: 'ptq1-24',
        questionTypeBadge: 'Paritás',
        question: 'Igaz-e, hogy az f(x) = x² függvény páros (szimmetrikus az y-tengelyre)?',
        options: [
          'Igen, mert f(-x) = (-x)² = x² = f(x)',
          'Nem, mert nincs benne mínusz jel',
          'Nem, páratlan függvény',
          'Csak a pozitív számokra páros'
        ],
        correctAnswer: 'Igen, mert f(-x) = (-x)² = x² = f(x)',
        explanation: 'Mivel f(-x) = f(x) minden valós x-re teljesül, a függvény páros, grafikonja szimmetrikus az y-tengelyre.'
      },
      {
        id: 'ptq1-25',
        questionTypeBadge: 'Paritás',
        question: 'Páros függvény-e az f(x) = (x - 3)²?',
        options: [
          'Nem, mert a szimmetriatengelye az x = 3 egyenesre tolódott, nem az y-tengely',
          'Igen, mert négyzetre van emelve',
          'Páratlan függvény',
          'Igen, mert 3 páratlan szám'
        ],
        correctAnswer: 'Nem, mert a szimmetriatengelye az x = 3 egyenesre tolódott, nem az y-tengely',
        explanation: 'Egy függvény csak akkor páros, ha az y-tengelyre (x = 0) szimmetrikus. Itt a tengely x = 3, így f(-x) ≠ f(x).'
      },
      {
        id: 'ptq1-26',
        questionTypeBadge: 'Szélsőérték jellege',
        question: 'Milyen szélsőértéke van az f(x) = -x² + 7 függvénynek a valós számok halmazán?',
        options: [
          'Maximuma van az x = 0 helyen, értéke: y = 7',
          'Minimuma van az x = 0 helyen, értéke: y = 7',
          'Maximuma van az x = 7 helyen, értéke: y = 0',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 'Maximuma van az x = 0 helyen, értéke: y = 7',
        explanation: 'A parabola lefelé nyílik (a = -1 < 0), csúcsa (0; 7), így maximuma van az x = 0 helyen, értéke 7.'
      },
      {
        id: 'ptq1-27',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = 2(x + 3)² - 5 függvénynek?',
        options: [
          'R_f = [-5; ∞[',
          'R_f = ]-∞; -5]',
          'R_f = [-3; ∞[',
          'R_f = ℝ'
        ],
        correctAnswer: 'R_f = [-5; ∞[',
        explanation: 'Felfelé nyílik (a = 2 > 0), a legkisebb értéke a csúcs magassága v = -5. ÉK = [-5; ∞[.'
      },
      {
        id: 'ptq1-28',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = -(x - 2)² + 6 függvénynek?',
        options: [
          'R_f = ]-∞; 6]',
          'R_f = [6; ∞[',
          'R_f = ]-∞; 2]',
          'R_f = [2; 6]'
        ],
        correctAnswer: 'R_f = ]-∞; 6]',
        explanation: 'Lefelé nyílik (a = -1 < 0), a legnagyobb értéke a csúcs v = 6 magassága. ÉK = ]-∞; 6].'
      },
      {
        id: 'ptq1-29',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = |x - 4| + 3 függvénynek?',
        options: [
          'R_f = [3; ∞[',
          'R_f = [4; ∞[',
          'R_f = ]-∞; 3]',
          'R_f = [0; ∞['
        ],
        correctAnswer: 'R_f = [3; ∞[',
        explanation: 'Mivel |x - 4| ≥ 0, hozzáadva 3-at: f(x) ≥ 3 minden valós x-re. ÉK = [3; ∞[.'
      },
      {
        id: 'ptq1-30',
        questionTypeBadge: 'Zérushelyek',
        question: 'Mik a zérushelyei az f(x) = 2|x| - 6 függvénynek?',
        options: [
          'x₁ = -3 és x₂ = 3',
          'x = 3',
          'x₁ = -6 és x₂ = 6',
          'Nincs zérushelye'
        ],
        correctAnswer: 'x₁ = -3 és x₂ = 3',
        explanation: '2|x| - 6 = 0 ⇒ 2|x| = 6 ⇒ |x| = 3 ⇒ x = ±3.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett transzformációk, kanonikus alak és grafikonok',
    subtitle: 'Teljes négyzetté alakítás, segédfüggvény, felhajtás és geometriai összefüggések (30 feladat).',
    range: '31–60. feladat',
    focus: 'ax² + bx + c, u = -b/(2a), |f(x)|, monotonitás és szimmetria',
    questions: [
      {
        id: 'ptq2-1',
        questionTypeBadge: 'Lépéssorrend',
        question: 'Milyen sorrendben végezzük a transzformációs lépéseket az f(x) = -2(x - 3)² + 8 függvény ábrázolásakor?',
        options: [
          '1. Jobbra 3-mal, 2. Nyújtás 2-vel és tükrözés az x-tengelyre, 3. Felfelé 8-cal',
          '1. Felfelé 8-cal, 2. Jobbra 3-mal, 3. Tükrözés',
          '1. Balra 3-mal, 2. Nyújtás 2-vel, 3. Lefelé 8-cal',
          '1. Tükrözés, 2. Felfelé 8-cal, 3. Jobbra 3-mal'
        ],
        correctAnswer: '1. Jobbra 3-mal, 2. Nyújtás 2-vel és tükrözés az x-tengelyre, 3. Felfelé 8-cal',
        explanation: 'A műveleti hierarchia: zárójel belseje (x - 3: jobbra 3), szorzás (-2: nyújtás és tükrözés), külső összeadás (+8: fel 8).'
      },
      {
        id: 'ptq2-2',
        questionTypeBadge: 'Teljes négyzet',
        question: 'Hogyan alakítható teljes négyzetté az f(x) = x² - 6x + 9 polinom?',
        options: [
          'f(x) = (x - 3)²',
          'f(x) = (x + 3)²',
          'f(x) = (x - 6)²',
          'f(x) = (x - 3)² - 9'
        ],
        correctAnswer: 'f(x) = (x - 3)²',
        explanation: 'x² - 2 · 3 · x + 3² = (x - 3)², pontosan egy nevezetes azonosság.'
      },
      {
        id: 'ptq2-3',
        questionTypeBadge: 'Kanonikus alak',
        question: 'Mi az f(x) = x² + 8x + 12 függvény kanonikus alakja?',
        options: [
          'f(x) = (x + 4)² - 4',
          'f(x) = (x + 4)² + 12',
          'f(x) = (x + 8)² - 4',
          'f(x) = (x + 4)² + 4'
        ],
        correctAnswer: 'f(x) = (x + 4)² - 4',
        explanation: 'x² + 8x + 12 = (x + 4)² - 16 + 12 = (x + 4)² - 4.'
      },
      {
        id: 'ptq2-4',
        questionTypeBadge: 'Csúcspont',
        question: 'Mi a csúcspontja az f(x) = x² - 4x + 1 parabolának?',
        options: [
          'V(2; -3)',
          'V(-2; -3)',
          'V(2; 1)',
          'V(-2; 1)'
        ],
        correctAnswer: 'V(2; -3)',
        explanation: 'x² - 4x + 1 = (x - 2)² - 4 + 1 = (x - 2)² - 3. A csúcs V(2; -3).'
      },
      {
        id: 'ptq2-5',
        questionTypeBadge: 'Kiemelés és teljes négyzet',
        question: 'Alakítsd kanonikus alakra a 2x² - 8x + 10 kifejezést!',
        options: [
          '2(x - 2)² + 2',
          '2(x - 4)² + 10',
          '2(x - 2)² - 6',
          '(2x - 4)² + 2'
        ],
        correctAnswer: '2(x - 2)² + 2',
        explanation: '2[x² - 4x] + 10 = 2[(x - 2)² - 4] + 10 = 2(x - 2)² - 8 + 10 = 2(x - 2)² + 2.'
      },
      {
        id: 'ptq2-6',
        questionTypeBadge: 'Negatív főegyüttható',
        question: 'Mi a kanonikus alakja az f(x) = -x² + 6x - 5 függvénynek?',
        options: [
          '-(x - 3)² + 4',
          '-(x + 3)² + 4',
          '-(x - 3)² - 5',
          '-(x - 3)² - 4'
        ],
        correctAnswer: '-(x - 3)² + 4',
        explanation: '-[x² - 6x] - 5 = -[(x - 3)² - 9] - 5 = -(x - 3)² + 9 - 5 = -(x - 3)² + 4.'
      },
      {
        id: 'ptq2-7',
        questionTypeBadge: 'Segédfüggvény',
        question: 'Melyek a g(x) = x² - 6x segédfüggvény zérushelyei és szimmetriatengelye?',
        options: [
          'Zérushelyek: 0 és 6, tengely: x = 3',
          'Zérushelyek: 0 és -6, tengely: x = -3',
          'Zérushelyek: -3 és 3, tengely: x = 0',
          'Zérushelyek: 0 és 6, tengely: x = 6'
        ],
        correctAnswer: 'Zérushelyek: 0 és 6, tengely: x = 3',
        explanation: 'x(x - 6) = 0 ⇒ x₁ = 0, x₂ = 6. A számtani közép u = (0 + 6) / 2 = 3.'
      },
      {
        id: 'ptq2-8',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Mi a szimmetriatengelye a g(x) = 2x² - 12x segédfüggvénynek?',
        options: [
          'x = 3',
          'x = 6',
          'x = -3',
          'x = 12'
        ],
        correctAnswer: 'x = 3',
        explanation: '2x(x - 6) = 0 ⇒ gyökök 0 és 6, felezőpont x = 3.'
      },
      {
        id: 'ptq2-9',
        questionTypeBadge: 'Eltolás segédfüggvényből',
        question: 'Ha g(x) = x² - 4x csúcspontja (2; -4), mi lesz az f(x) = x² - 4x + 7 csúcspontja?',
        options: [
          'V(2; 3)',
          'V(2; 11)',
          'V(-2; 3)',
          'V(2; -11)'
        ],
        correctAnswer: 'V(2; 3)',
        explanation: 'f(x) = g(x) + 7, a csúcspont y-koordinátája: -4 + 7 = 3. V(2; 3).'
      },
      {
        id: 'ptq2-10',
        questionTypeBadge: 'Tengelymetszet tükörképe',
        question: 'Az f(x) = x² - 6x + 8 parabola y-metszete a (0; 8) pont, csúcsa V(3; -1). Mi a (0; 8) pont tükörképe a tengelyre?',
        options: [
          '(6; 8)',
          '(3; 8)',
          '(6; -1)',
          '(8; 6)'
        ],
        correctAnswer: '(6; 8)',
        explanation: 'A szimmetriatengely x = 3. A túloldali tükörkép koordinátája: (2u; c) = (2 · 3; 8) = (6; 8).'
      },
      {
        id: 'ptq2-11',
        questionTypeBadge: 'Csúcspont képlet',
        question: 'Határozd meg az f(x) = -x² + 4x + 5 parabola csúcspontját az u = -b / (2a) képlettel!',
        options: [
          'V(2; 9)',
          'V(-2; 9)',
          'V(2; 5)',
          'V(4; 5)'
        ],
        correctAnswer: 'V(2; 9)',
        explanation: 'u = -4 / (2 · (-1)) = 2. A magasság: f(2) = -(4) + 4(2) + 5 = -4 + 8 + 5 = 9. V(2; 9).'
      },
      {
        id: 'ptq2-12',
        questionTypeBadge: 'Felhajtott abszolútérték',
        question: 'Milyen alakú az f(x) = |x² - 4| függvény grafikonja?',
        options: [
          'A [-2; 2] közötti lefelé lógó ív fel van hajtva a tengely fölé (W alak)',
          'Egyszerű parabola, ami 4 egységgel feljebb ment',
          'Két egyenesből álló V alak',
          'Kör alakú görbe'
        ],
        correctAnswer: 'A [-2; 2] közötti lefelé lógó ív fel van hajtva a tengely fölé (W alak)',
        explanation: 'Az x² - 4 parabola -2 és 2 között negatív volt. Az abszolútérték miatt ez az ív felfelé tükröződik, csúcsa (0; 4) lesz.'
      },
      {
        id: 'ptq2-13',
        questionTypeBadge: 'Felhajtott csúcspont',
        question: 'Mi a felhajtott lokális tetőpontja az f(x) = |(x - 2)² - 1| függvénynek?',
        options: [
          '(2; 1)',
          '(2; -1)',
          '(1; 2)',
          '(0; 1)'
        ],
        correctAnswer: '(2; 1)',
        explanation: 'Az eredeti függvény csúcsa (2; -1) volt. A felhajtás után |-1| = 1 lesz, tehát a pont (2; 1).'
      },
      {
        id: 'ptq2-14',
        questionTypeBadge: 'V alak felhajtása',
        question: 'Hány zérushelye van az f(x) = ||x - 3| - 2| függvénynek?',
        options: [
          '2 zérushelye van: x = 1 és x = 5',
          '1 zérushelye van: x = 3',
          '4 zérushelye van',
          'Nincs zérushelye'
        ],
        correctAnswer: '2 zérushelye van: x = 1 és x = 5',
        explanation: '|x - 3| - 2 = 0 ⇒ |x - 3| = 2 ⇒ x - 3 = ±2 ⇒ x = 1 és x = 5.'
      },
      {
        id: 'ptq2-15',
        questionTypeBadge: 'Zérushelyek kanonikusból',
        question: 'Mik a zérushelyei az f(x) = 2(x - 1)² - 8 függvénynek?',
        options: [
          'x₁ = -1 és x₂ = 3',
          'x₁ = -3 és x₂ = 5',
          'x₁ = 1 és x₂ = 4',
          'x₁ = -1 és x₂ = 5'
        ],
        correctAnswer: 'x₁ = -1 és x₂ = 3',
        explanation: '2(x - 1)² - 8 = 0 ⇒ 2(x - 1)² = 8 ⇒ (x - 1)² = 4 ⇒ x - 1 = ±2 ⇒ x = -1 és x = 3.'
      },
      {
        id: 'ptq2-16',
        questionTypeBadge: 'Zérushelyek kanonikusból',
        question: 'Mik a zérushelyei az f(x) = -3(x + 2)² + 12 függvénynek?',
        options: [
          'x₁ = -4 és x₂ = 0',
          'x₁ = -2 és x₂ = 2',
          'x₁ = 0 és x₂ = 4',
          'x₁ = -6 és x₂ = 2'
        ],
        correctAnswer: 'x₁ = -4 és x₂ = 0',
        explanation: '-3(x + 2)² + 12 = 0 ⇒ 3(x + 2)² = 12 ⇒ (x + 2)² = 4 ⇒ x + 2 = ±2 ⇒ x = -4 és x = 0.'
      },
      {
        id: 'ptq2-17',
        questionTypeBadge: 'Zérushelyek kanonikusból',
        question: 'Mik a zérushelyei az f(x) = 0,5(x - 4)² - 2 függvénynek?',
        options: [
          'x₁ = 2 és x₂ = 6',
          'x₁ = 0 és x₂ = 8',
          'x₁ = 3 és x₂ = 5',
          'x₁ = 4 és x₂ = 6'
        ],
        correctAnswer: 'x₁ = 2 és x₂ = 6',
        explanation: '0,5(x - 4)² = 2 ⇒ (x - 4)² = 4 ⇒ x - 4 = ±2 ⇒ x = 2 és x = 6.'
      },
      {
        id: 'ptq2-18',
        questionTypeBadge: 'Általános alak felírása',
        question: 'Egy parabola csúcsa V(3; -4), főegyütthatója a = 1. Mi az általános polinom alakja?',
        options: [
          'f(x) = x² - 6x + 5',
          'f(x) = x² - 6x + 9',
          'f(x) = x² + 6x + 5',
          'f(x) = x² - 3x - 4'
        ],
        correctAnswer: 'f(x) = x² - 6x + 5',
        explanation: 'Kanonikus alak: (x - 3)² - 4 = x² - 6x + 9 - 4 = x² - 6x + 5.'
      },
      {
        id: 'ptq2-19',
        questionTypeBadge: 'Általános alak felírása',
        question: 'Egy parabola csúcsa V(-1; 5), főegyütthatója a = -2. Mi a függvény hozzárendelési szabálya polinom alakban?',
        options: [
          'f(x) = -2x² - 4x + 3',
          'f(x) = -2x² + 4x + 3',
          'f(x) = -2x² - 4x + 5',
          'f(x) = 2x² + 4x + 3'
        ],
        correctAnswer: 'f(x) = -2x² - 4x + 3',
        explanation: '-2(x + 1)² + 5 = -2(x² + 2x + 1) + 5 = -2x² - 4x - 2 + 5 = -2x² - 4x + 3.'
      },
      {
        id: 'ptq2-20',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton csökkenő az f(x) = x² - 2x függvény a valós számok halmazán?',
        options: [
          ']-∞; 1]',
          '[1; ∞[',
          ']-∞; 2]',
          '[0; 2]'
        ],
        correctAnswer: ']-∞; 1]',
        explanation: 'A parabola csúcsa x = 1-nél van és felfelé nyílik. A csúcsig, azaz a ]-∞; 1] intervallumon szigorúan monoton csökken.'
      },
      {
        id: 'ptq2-21',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton növekvő az f(x) = -(x - 4)² + 3 függvény?',
        options: [
          ']-∞; 4]',
          '[4; ∞[',
          ']-∞; 3]',
          '[3; ∞['
        ],
        correctAnswer: ']-∞; 4]',
        explanation: 'Lefelé nyílik, a maximumhely x = 4. A csúcsig, a ]-∞; 4] intervallumon a függvény értékei növekednek.'
      },
      {
        id: 'ptq2-22',
        questionTypeBadge: 'Szimmetriatengely egyenlete',
        question: 'Mi a szimmetriatengelyének egyenlete az f(x) = 2(x + 1)² - 3 függvénynek?',
        options: [
          'x = -1',
          'x = 1',
          'y = -3',
          'y = -1'
        ],
        correctAnswer: 'x = -1',
        explanation: 'A csúcs x-koordinátája u = -1. A tengely egyenlete egy függőleges egyenes: x = -1.'
      },
      {
        id: 'ptq2-23',
        questionTypeBadge: 'y-tengelymetszet',
        question: 'Hol metszi az y-tengelyt az f(x) = 3(x - 2)² - 5 függvény?',
        options: [
          'A (0; 7) pontban',
          'A (0; -5) pontban',
          'A (0; 12) pontban',
          'A (7; 0) pontban'
        ],
        correctAnswer: 'A (0; 7) pontban',
        explanation: 'Behelyettesítve x = 0-t: f(0) = 3(0 - 2)² - 5 = 3(4) - 5 = 12 - 5 = 7. A metszéspont (0; 7).'
      },
      {
        id: 'ptq2-24',
        questionTypeBadge: 'y-tengelymetszet',
        question: 'Hol metszi az y-tengelyt az f(x) = -2(x + 3)² + 10 függvény?',
        options: [
          'A (0; -8) pontban',
          'A (0; 10) pontban',
          'A (0; 4) pontban',
          'A (0; -18) pontban'
        ],
        correctAnswer: 'A (0; -8) pontban',
        explanation: 'f(0) = -2(3)² + 10 = -2(9) + 10 = -18 + 10 = -8. A metszéspont (0; -8).'
      },
      {
        id: 'ptq2-25',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van az f(x) = 3(x - 1)² + 2 függvénynek?',
        options: [
          '0 (nincs zérushelye)',
          '1',
          '2',
          '3'
        ],
        correctAnswer: '0 (nincs zérushelye)',
        explanation: 'Felfelé nyílik (a = 3 > 0), és a csúcsa az x-tengely felett van (v = 2 > 0). Nem éri el a tengelyt.'
      },
      {
        id: 'ptq2-26',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van az f(x) = -2(x + 4)² függvénynek?',
        options: [
          '1 zérushelye van (érinti a tengelyt)',
          '2 zérushelye van',
          'Nincs zérushelye',
          'Végtelen sok'
        ],
        correctAnswer: '1 zérushelye van (érinti a tengelyt)',
        explanation: 'A csúcspont y-koordinátája v = 0, így a csúcs pontosan a tengelyre esik: x = -4.'
      },
      {
        id: 'ptq2-27',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van az f(x) = -0,5(x - 3)² + 8 függvénynek?',
        options: [
          '2 zérushelye van',
          '1 zérushelye van',
          'Nincs zérushelye',
          'Nem határozható meg'
        ],
        correctAnswer: '2 zérushelye van',
        explanation: 'Lefelé nyílik (a < 0) és a csúcsa a tengely felett van (v = 8 > 0), így lefelé haladva kétszer metszi az x-tengelyt.'
      },
      {
        id: 'ptq2-28',
        questionTypeBadge: 'Főegyüttható meghatározása',
        question: 'Egy V(2; 1) csúcspontú parabola áthalad a (0; 5) ponton. Mennyi a főegyütthatója (a)?',
        options: [
          'a = 1',
          'a = 2',
          'a = 0,5',
          'a = -1'
        ],
        correctAnswer: 'a = 1',
        explanation: 'f(x) = a(x - 2)² + 1. Behelyettesítve (0; 5)-öt: 5 = a(0 - 2)² + 1 ⇒ 5 = 4a + 1 ⇒ 4a = 4 ⇒ a = 1.'
      },
      {
        id: 'ptq2-29',
        questionTypeBadge: 'Zérushelyek és szimmetria',
        question: 'Egy másodfokú függvény zérushelyei x₁ = 1 és x₂ = 5. Mi a szimmetriatengelye?',
        options: [
          'x = 3',
          'x = 2',
          'x = 4',
          'x = 2,5'
        ],
        correctAnswer: 'x = 3',
        explanation: 'A szimmetriatengely a két zérushely számtani közepe: (1 + 5) / 2 = 3.'
      },
      {
        id: 'ptq2-30',
        questionTypeBadge: 'Közös csúcspont',
        question: 'Mi a közös pontja az f(x) = (x - 3)² + 2 és g(x) = -(x - 3)² + 2 paraboláknak?',
        options: [
          'A V(3; 2) csúcspont',
          'Az origó (0; 0)',
          'Nincs közös pontjuk',
          'A (0; 2) pont'
        ],
        correctAnswer: 'A V(3; 2) csúcspont',
        explanation: 'Mindkét parabola csúcspontja (3; 2), az egyik felfelé, a másik lefelé nyílik, így kizárólag a közös csúcspontjukban érintik egymást.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Fejezeti szintézis, optimalizálás és érettségi kihívások',
    subtitle: 'Bekerítési feladatok, hajítások, korlátos tartományok és grafikus egyenletek (30 feladat).',
    range: '61–90. feladat',
    focus: 'Alkalmazások, D_f leszűkítés, optimalizálás és összetett szintézis',
    questions: [
      {
        id: 'ptq3-1',
        questionTypeBadge: 'Kordonoptimalizálás',
        question: '20 méter kerítéssel 4-oldalú téglalapot kerítünk el. Mekkora a maximális terület, és milyen alakzat adja azt?',
        options: [
          '25 m² (5 m × 5 m-es négyzet)',
          '20 m² (4 m × 6 m-es téglalap)',
          '50 m² (5 m × 10 m-es téglalap)',
          '100 m² (10 m × 10 m-es négyzet)'
        ],
        correctAnswer: '25 m² (5 m × 5 m-es négyzet)',
        explanation: 'T(x) = x(10 - x) = -x² + 10x. Csúcspont x = 5 méter (négyzet), területe 5 · 5 = 25 m².'
      },
      {
        id: 'ptq3-2',
        questionTypeBadge: 'Fal menti kordon',
        question: 'Ugyanabból a 20 méter kerítésből egy meglévő hosszú fal mentén 3 oldalt kerítünk el. Mekkora a maximális terület?',
        options: [
          '50 m² (5 m × 10 m-es téglalap)',
          '25 m² (5 m × 5 m-es négyzet)',
          '40 m² (4 m × 10 m-es téglalap)',
          '100 m²'
        ],
        correctAnswer: '50 m² (5 m × 10 m-es téglalap)',
        explanation: 'T(x) = x(20 - 2x) = -2x² + 20x. Maximumhely x = 5 m, fal menti oldal b = 10 m, T_max = 50 m².'
      },
      {
        id: 'ptq3-3',
        questionTypeBadge: 'Optimalizálás aránya',
        question: 'Miért pontosan a duplája a fal menti maximális terület a 4-oldalas szabad kordon maximális területének?',
        options: [
          'Mert a fal ingyen adja a kerület felét, így a kordon kétszer akkora területet tud körülölelni',
          'Mert a téglalap területe mindig kétszerese a négyzetének',
          'Ez csak véletlen egybeesés a 20 méternél',
          'Mert két fal találkozásánál kerítünk'
        ],
        correctAnswer: 'Mert a fal ingyen adja a kerület felét, így a kordon kétszer akkora területet tud körülölelni',
        explanation: 'A 4 oldalas esetben T_max = K² / 16, míg a fal menti esetben T_max = K² / 8, ami pontosan a duplája.'
      },
      {
        id: 'ptq3-4',
        questionTypeBadge: 'Kordonoptimalizálás',
        question: '40 méter kerítéssel egy fal mellett mekkora maximális területet lehet elkeríteni?',
        options: [
          '200 m² (10 m × 20 m)',
          '100 m² (10 m × 10 m)',
          '400 m² (20 m × 20 m)',
          '150 m²'
        ],
        correctAnswer: '200 m² (10 m × 20 m)',
        explanation: 'T(x) = x(40 - 2x) = -2x² + 40x. Csúcspont x = 10 m, b = 20 m, T_max = 10 · 20 = 200 m².'
      },
      {
        id: 'ptq3-5',
        questionTypeBadge: 'Hajítás tetőpontja',
        question: 'Egy toronyból felhajított labda magassága h(t) = -5t² + 10t + 40. Mikor van a tetőponton és milyen magasan?',
        options: [
          't = 1 s múlva, h = 45 m magasan',
          't = 2 s múlva, h = 50 m magasan',
          't = 1 s múlva, h = 40 m magasan',
          't = 4 s múlva, h = 45 m magasan'
        ],
        correctAnswer: 't = 1 s múlva, h = 45 m magasan',
        explanation: 't_tető = -10 / (2 · (-5)) = 1 másodperc. h(1) = -5(1) + 10(1) + 40 = 45 méter.'
      },
      {
        id: 'ptq3-6',
        questionTypeBadge: 'Becsapódás ideje',
        question: 'Mikor ér földet (h = 0) a fenti h(t) = -5t² + 10t + 40 labda?',
        options: [
          't = 4 másodperc múlva',
          't = 2 másodperc múlva',
          't = 5 másodperc múlva',
          't = 8 másodperc múlva'
        ],
        correctAnswer: 't = 4 másodperc múlva',
        explanation: '-5t² + 10t + 40 = 0 ⇒ t² - 2t - 8 = 0 ⇒ (t - 4)(t + 2) = 0. Mivel t > 0, t = 4 másodperc.'
      },
      {
        id: 'ptq3-7',
        questionTypeBadge: 'Talajról indított hajítás',
        question: 'Talajról függőlegesen felhajított kő magassága h(t) = -5t² + 30t. Mekkora a kő maximális magassága?',
        options: [
          '45 méter (t = 3 s-nál)',
          '30 méter (t = 3 s-nál)',
          '90 méter (t = 6 s-nál)',
          '60 méter (t = 2 s-nál)'
        ],
        correctAnswer: '45 méter (t = 3 s-nál)',
        explanation: 't_tető = 30 / 10 = 3 s. h(3) = -5(9) + 30(3) = -45 + 90 = 45 méter.'
      },
      {
        id: 'ptq3-8',
        questionTypeBadge: 'Terepjáró tömege',
        question: 'Terepjáró tömege m(t) = 1,5t² - 45t + 2100 (t = 0: 1970). Melyik évben volt legkönnyebb a modell és hány kg volt?',
        options: [
          '1985-ben (t = 15), tömege 1762,5 kg',
          '1990-ben (t = 20), tömege 1800 kg',
          '1980-ban (t = 10), tömege 1750 kg',
          '1985-ben (t = 15), tömege 1725 kg'
        ],
        correctAnswer: '1985-ben (t = 15), tömege 1762,5 kg',
        explanation: 't_min = 45 / (2 · 1,5) = 15 (1970 + 15 = 1985). m(15) = 1,5(225) - 45(15) + 2100 = 1762,5 kg.'
      },
      {
        id: 'ptq3-9',
        questionTypeBadge: 'Tankönyvi feladat: Gyártási haszon',
        question: 'Egy gép óránkénti haszna f(x) = -0,01x² + 18x (x a darabszám). Milyen x-nél maximális a haszon, és mennyi ez az összeg?',
        options: [
          'x = 900 db alkatrész esetén, haszon: 8100 Ft',
          'x = 1800 db alkatrész esetén, haszon: 0 Ft',
          'x = 500 db alkatrész esetén, haszon: 6500 Ft',
          'x = 1000 db alkatrész esetén, haszon: 8000 Ft'
        ],
        correctAnswer: 'x = 900 db alkatrész esetén, haszon: 8100 Ft',
        explanation: 'Zérushelyek 0 és 1800. A csúcspont a felezőpont: x = 900 db. f(900) = -0,01(810 000) + 18(900) = -8100 + 16 200 = 8100 Ft.'
      },
      {
        id: 'ptq3-10',
        questionTypeBadge: 'Grafikus egyenletmegoldás',
        question: 'Mik a megoldásai az (x - 2)² - 1 = x - 1 egyenletnek?',
        options: [
          'x₁ = 1 és x₂ = 4',
          'x₁ = -1 és x₂ = 4',
          'x₁ = 2 és x₂ = 3',
          'x = 1'
        ],
        correctAnswer: 'x₁ = 1 és x₂ = 4',
        explanation: 'x² - 4x + 3 = x - 1 ⇒ x² - 5x + 4 = 0 ⇒ (x - 1)(x - 4) = 0 ⇒ x = 1 és x = 4.'
      },
      {
        id: 'ptq3-11',
        questionTypeBadge: 'Grafikus egyenlőtlenség',
        question: 'Mely valós számokra teljesül, hogy (x - 2)² - 1 ≤ x - 1?',
        options: [
          'x ∈ [1; 4]',
          'x ∈ ]-∞; 1] ∪ [4; ∞[',
          'x ∈ ]1; 4[',
          'x ∈ [2; 5]'
        ],
        correctAnswer: 'x ∈ [1; 4]',
        explanation: 'A parabola az [1; 4] intervallumon fut az egyenes alatt vagy metszi azt.'
      },
      {
        id: 'ptq3-12',
        questionTypeBadge: 'Metszéspontok száma',
        question: 'Hány metszéspontja van az f(x) = x² - 4 parabolának és a g(x) = -|x| + 2 függvénynek?',
        options: [
          '2 metszéspontja van (x = ±2)',
          '4 metszéspontja van',
          '0 metszéspontja van',
          '1 metszéspontja van'
        ],
        correctAnswer: '2 metszéspontja van (x = ±2)',
        explanation: 'Mindkét függvény zérushelye x = ±2, ahol f(±2) = 0 és g(±2) = 0. Más metszéspontjuk nincs a síkban.'
      },
      {
        id: 'ptq3-13',
        questionTypeBadge: 'Grafikus megoldás',
        question: 'Mik a valós megoldásai az |x - 2| = (x - 2)² egyenletnek?',
        options: [
          'x ∈ {1, 2, 3}',
          'x ∈ {2}',
          'x ∈ {0, 2, 4}',
          'x ∈ {1, 3}'
        ],
        correctAnswer: 'x ∈ {1, 2, 3}',
        explanation: 'Legyen y = |x - 2|. Ekkor y = y² ⇒ y(y - 1) = 0 ⇒ y = 0 vagy y = 1. Ha |x - 2| = 0 ⇒ x = 2; ha |x - 2| = 1 ⇒ x = 1 vagy x = 3.'
      },
      {
        id: 'ptq3-14',
        questionTypeBadge: 'Zárt intervallum ÉK',
        question: 'Adott a g: [1; 4] → ℝ, g(x) = (x - 2)² függvény. Mi az értékkészlete?',
        options: [
          'R_g = [0; 4]',
          'R_g = [1; 4]',
          'R_g = [0; 1]',
          'R_g = [-2; 4]'
        ],
        correctAnswer: 'R_g = [0; 4]',
        explanation: 'A csúcs x = 2 ∈ [1; 4], ahol g(2) = 0. A végpontok: g(1) = 1, g(4) = 4. ÉK = [0; 4].'
      },
      {
        id: 'ptq3-15',
        questionTypeBadge: 'Zárt intervallum ÉK',
        question: 'Adott a h: [-1; 2] → ℝ, h(x) = -|x| + 2 függvény. Mi az értékkészlete?',
        options: [
          'R_h = [0; 2]',
          'R_h = [1; 2]',
          'R_h = [-2; 2]',
          'R_h = [0; 1]'
        ],
        correctAnswer: 'R_h = [0; 2]',
        explanation: 'A tetőpont x = 0-nál van, ahol h(0) = 2. A végpontok: h(-1) = 1, h(2) = 0. ÉK = [0; 2].'
      },
      {
        id: 'ptq3-16',
        questionTypeBadge: 'Nyílt-zárt intervallum ÉK',
        question: 'Adott az f: ]-2; 2] → ℝ, f(x) = |x - 1| függvény. Mi az értékkészlete?',
        options: [
          'R_f = [0; 3[',
          'R_f = [0; 1]',
          'R_f = ]0; 3]',
          'R_f = [1; 3]'
        ],
        correctAnswer: 'R_f = [0; 3[',
        explanation: 'A csúcs x = 1 ∈ ]-2; 2], ahol f(1) = 0 (zárt alsó korlát). A nyílt végpontnál: x → -2 esetén f(x) → 3, így ÉK = [0; 3[.'
      },
      {
        id: 'ptq3-17',
        questionTypeBadge: 'Kieső csúcspont',
        question: 'Mi az f: [3; 6] → ℝ, f(x) = (x - 1)² + 2 függvény értékkészlete?',
        options: [
          'R_f = [6; 27]',
          'R_f = [2; 27]',
          'R_f = [3; 6]',
          'R_f = [2; 6]'
        ],
        correctAnswer: 'R_f = [6; 27]',
        explanation: 'A csúcs x = 1 nincs benne a [3; 6] intervallumban. A függvény itt szigorúan nő: f(3) = 6, f(6) = 27. ÉK = [6; 27].'
      },
      {
        id: 'ptq3-18',
        questionTypeBadge: 'Zárt intervallum ÉK',
        question: 'Adott az f: [-3; 2] → ℝ, f(x) = |x + 2| függvény. Mi az értékkészlete?',
        options: [
          'R_f = [0; 4]',
          'R_f = [1; 4]',
          'R_f = [0; 2]',
          'R_f = [-3; 2]'
        ],
        correctAnswer: 'R_f = [0; 4]',
        explanation: 'A csúcs x = -2 ∈ [-3; 2], ahol f(-2) = 0. A végpontok: f(-3) = 1, f(2) = 4. ÉK = [0; 4].'
      },
      {
        id: 'ptq3-19',
        questionTypeBadge: 'Zárt intervallum ÉK',
        question: 'Adott a g: [0; 3] → ℝ, g(x) = (x - 2)² + 2 függvény. Mi az értékkészlete?',
        options: [
          'R_g = [2; 6]',
          'R_g = [2; 3]',
          'R_g = [3; 6]',
          'R_g = [0; 6]'
        ],
        correctAnswer: 'R_g = [2; 6]',
        explanation: 'Csúcs x = 2 ∈ [0; 3], minimum értéke g(2) = 2. Végpontok: g(0) = 6, g(3) = 3. ÉK = [2; 6].'
      },
      {
        id: 'ptq3-20',
        questionTypeBadge: 'Másodfokú egyenlőtlenség',
        question: 'Oldd meg grafikusan az x² - 6x + 5 ≤ 0 egyenlőtlenséget a valós számok halmazán!',
        options: [
          'x ∈ [1; 5]',
          'x ∈ ]-∞; 1] ∪ [5; ∞[',
          'x ∈ ]1; 5[',
          'x ∈ [2; 4]'
        ],
        correctAnswer: 'x ∈ [1; 5]',
        explanation: 'A felfelé nyíló parabola zérushelyei 1 és 5. A tengely alatt vagy azon a zárt [1; 5] szakaszon halad.'
      },
      {
        id: 'ptq3-21',
        questionTypeBadge: 'Másodfokú egyenlőtlenség',
        question: 'Oldd meg a -x² + 4x > 0 egyenlőtlenséget a valós számokon!',
        options: [
          'x ∈ ]0; 4[',
          'x ∈ [0; 4]',
          'x ∈ ]-∞; 0[ ∪ ]4; ∞[',
          'x ∈ ]2; 4['
        ],
        correctAnswer: 'x ∈ ]0; 4[',
        explanation: 'A lefelé nyíló parabola zérushelyei 0 és 4. A két zérushely között a tengely felett fut (> 0): ]0; 4[.'
      },
      {
        id: 'ptq3-22',
        questionTypeBadge: 'Mindig pozitív parabola',
        question: 'Melyik állítás igaz az f(x) = x² + 2x + 4 függvényre?',
        options: [
          'Minden valós x-re f(x) ≥ 3, így nincs valós zérushelye',
          'Van két valós zérushelye: x = -1 és x = 4',
          'Maximuma van az x = -1 helyen',
          'Értékkészlete ]-∞; 3]'
        ],
        correctAnswer: 'Minden valós x-re f(x) ≥ 3, így nincs valós zérushelye',
        explanation: 'f(x) = (x + 1)² + 3. Mivel (x + 1)² ≥ 0, f(x) ≥ 3 mindig, soha nem metszi a tengelyt.'
      },
      {
        id: 'ptq3-23',
        questionTypeBadge: 'Parabola és egyenes érintése',
        question: 'Hány pontban metszi egymást az f(x) = x² és a g(x) = 2x - 1 függvény grafikonja?',
        options: [
          'Pontosan 1 pontban érintik egymást (x = 1)',
          '2 pontban',
          '0 pontban',
          'Végtelen sok pontban'
        ],
        correctAnswer: 'Pontosan 1 pontban érintik egymást (x = 1)',
        explanation: 'x² = 2x - 1 ⇒ x² - 2x + 1 = 0 ⇒ (x - 1)² = 0 ⇒ x = 1 (egyetlen kétszeres gyök, az egyenes érintő).'
      },
      {
        id: 'ptq3-24',
        questionTypeBadge: 'Parabola és egyenes elkerülése',
        question: 'Hány pontban metszi egymást az f(x) = x² és a g(x) = 2x - 2 grafikonja?',
        options: [
          '0 pontban (elkerülik egymást)',
          '1 pontban',
          '2 pontban',
          'Nem határozható meg'
        ],
        correctAnswer: '0 pontban (elkerülik egymást)',
        explanation: 'x² = 2x - 2 ⇒ x² - 2x + 2 = 0. A diszkrimináns D = 4 - 8 = -4 < 0, nincs valós közös pont.'
      },
      {
        id: 'ptq3-25',
        questionTypeBadge: 'Paraméteres feladat: Érintés',
        question: 'Milyen c valós érték esetén érinti az f(x) = x² - 4x + c parabola az x-tengelyt?',
        options: [
          'c = 4',
          'c = -4',
          'c = 2',
          'c = 0'
        ],
        correctAnswer: 'c = 4',
        explanation: 'Akkor érinti a tengelyt, ha teljes négyzet: x² - 4x + 4 = (x - 2)², tehát c = 4 (ekkor v = 0).'
      },
      {
        id: 'ptq3-26',
        questionTypeBadge: 'Paraméteres feladat: Két gyök',
        question: 'Milyen c valós értékek esetén van pontosan 2 különböző zérushelye az f(x) = x² - 6x + c függvénynek?',
        options: [
          'c < 9',
          'c = 9',
          'c > 9',
          'c ≤ 6'
        ],
        correctAnswer: 'c < 9',
        explanation: 'D = 36 - 4c > 0 ⇒ 4c < 36 ⇒ c < 9. Ekkor a csúcspont v = c - 9 negatív, így metszi a tengelyt.'
      },
      {
        id: 'ptq3-27',
        questionTypeBadge: 'Paraméteres feladat: Érintés',
        question: 'Milyen pozitív b érték esetén érinti az f(x) = -x² + bx - 9 parabola az x-tengelyt?',
        options: [
          'b = 6',
          'b = 9',
          'b = 3',
          'b = 18'
        ],
        correctAnswer: 'b = 6',
        explanation: 'D = b² - 4(-1)(-9) = b² - 36 = 0 ⇒ b² = 36 ⇒ b = 6 (mivel b > 0).'
      },
      {
        id: 'ptq3-28',
        questionTypeBadge: 'Kordon kerület 28',
        question: 'Egy zárt, 4-oldalú téglalap alakú kert kerülete 28 méter. Mekkora a maximálisan elérhető terület?',
        options: [
          '49 m² (7 m × 7 m)',
          '28 m²',
          '56 m²',
          '98 m²'
        ],
        correctAnswer: '49 m² (7 m × 7 m)',
        explanation: 'A félkerület 14 m, a maximális területű alakzat a négyzet: 14 / 2 = 7 m, területe 7 · 7 = 49 m².'
      },
      {
        id: 'ptq3-29',
        questionTypeBadge: 'Számok szorzata',
        question: 'Két valós szám különbsége 10 (y - x = 10). Milyen számok esetén lesz a szorzatuk a lehető legkisebb, és mennyi ez a minimum?',
        options: [
          'x = -5 és y = 5 esetén a minimális szorzat -25',
          'x = 0 és y = 10 esetén a szorzat 0',
          'x = 5 és y = 15 esetén a szorzat 75',
          'Nincs minimuma'
        ],
        correctAnswer: 'x = -5 és y = 5 esetén a minimális szorzat -25',
        explanation: 'y = x + 10. Szorzat: P(x) = x(x + 10) = x² + 10x. Csúcspont: x = -10 / 2 = -5, ekkor y = 5, szorzatuk -5 · 5 = -25.'
      },
      {
        id: 'ptq3-30',
        questionTypeBadge: 'Érettségi szintézis',
        question: 'Melyik összefoglaló állítás írja le helyesen az f(x) = -2x² + 8x - 6 másodfokú függvényt?',
        options: [
          'Csúcsa V(2; 2), zérushelyei 1 és 3, értékkészlete ]-∞; 2]',
          'Csúcsa V(2; -6), zérushelyei nincsenek, értékkészlete [2; ∞[',
          'Csúcsa V(-2; 2), felfelé nyílik, értékkészlete [-6; ∞[',
          'Csúcsa V(4; 2), zérushelyei 2 és 6'
        ],
        correctAnswer: 'Csúcsa V(2; 2), zérushelyei 1 és 3, értékkészlete ]-∞; 2]',
        explanation: '-2(x² - 4x) - 6 = -2[(x - 2)² - 4] - 6 = -2(x - 2)² + 8 - 6 = -2(x - 2)² + 2. Csúcs V(2; 2), lefelé nyílik (ÉK: ]-∞; 2]), zérushelyek: -2(x - 2)² + 2 = 0 ⇒ (x - 2)² = 1 ⇒ x = 1 és x = 3.'
      }
    ]
  }
};

export const PracticeTestQuiz: React.FC<PracticeTestQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-transz-tudasproba-quiz"
      topicTitle="Gyakorlás, tudáspróba Kvíz"
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={PracticeTestMatcher}
      sorterComponent={PracticeTestSorter}
      theoryLabel="Tananyag áttekintése"
    />
  );
};

