import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticRootMatcher } from './QuadraticRootMatcher';
import { QuadraticRootSorter } from './QuadraticRootSorter';
import {
  ParabolaTransformSvg,
  SquareRootSvg,
  TransformComparisonSvg
} from './QuadraticRootFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export interface QuadraticRootQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Parabola és Gyök Alapok (Könnyű)',
    subtitle: 'Alapfüggvények grafikonja, csúcspont leolvasás és a négyzetgyök alapvető feltételei.',
    range: '1 - 10. feladat',
    focus: 'Alapgörbék & Csúcspont',
    questions: [
      {
        id: 'qq1-1',
        questionTypeBadge: 'Alapfüggvény',
        question: 'Mi a másodfokú alapfüggvény f(x) = x² grafikonjának neve és hol van a csúcspontja?',
        figure: <ParabolaTransformSvg size={240} />,
        options: [
          'Parabola, melynek csúcspontja az origó C(0; 0)',
          'Hiperbola, melynek csúcspontja C(1; 1)',
          'Félegyenes az origóból kiindulva',
          'V-alakú görbe C(0; 1) csúcsponttal'
        ],
        correctAnswer: 0,
        hint: 'Az x² görbéje U-alakú szimmetrikus parabola, legalacsonyabb pontja az origóban van.',
        explanation: 'Az f(x) = x² függvény grafikonja egy parabola, csúcspontja az origóban (0; 0) található, felfelé nyílik és alulról korlátos.'
      },
      {
        id: 'qq1-2',
        questionTypeBadge: 'Gyök Értelmezési Tartomány',
        question: 'Mi a négyzetgyök alapfüggvény g(x) = √x értelmezési tartománya (Dg) a valós számok körében?',
        figure: <SquareRootSvg size={240} />,
        options: [
          'Dg = [0; ∞[ (csak nemnegatív valós számokból vonhatunk négyzetgyököt)',
          'Dg = ℝ (bármilyen valós számból vonhatunk gyököt)',
          'Dg = ]0; ∞[ (a nulla nincs benne)',
          'Dg = ]-∞; 0]'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e negatív szám a négyzetgyökjel alatt a valós számok körében?',
        explanation: 'A valós számok halmazán negatív számoknak nincs négyzetgyöke, ezért a gyök alatti kifejezésnek nemnegatívnak kell lennie: x ≥ 0, azaz Dg = [0; ∞[.'
      },
      {
        id: 'qq1-3',
        questionTypeBadge: 'Gyök Értékkészlet',
        question: 'Mi a négyzetgyök alapfüggvény g(x) = √x értékkészlete (Rg)?',
        options: [
          'Rg = [0; ∞[ (a négyzetgyök definíció szerint nemnegatív)',
          'Rg = ℝ (pozitív és negatív értékeket is felvesz)',
          'Rg = ]-∞; 0]',
          'Rg = [1; ∞['
        ],
        correctAnswer: 0,
        hint: 'Bár (-3)² = 9, de a √9 definíció szerint CSAK +3, nem lehet -3.',
        explanation: 'A négyzetgyök definíciója szerint egy nemnegatív szám azon EGYETLEN nemnegatív száma, melynek négyzete az eredeti szám. Tehát Rg = [0; ∞[.'
      },
      {
        id: 'qq1-4',
        questionTypeBadge: 'Csúcspont Leolvasás',
        question: 'Hol található az f(x) = (x - 5)² + 3 parabola csúcspontja?',
        options: [
          'C(5; 3)',
          'C(-5; 3)',
          'C(5; -3)',
          'C(3; 5)'
        ],
        correctAnswer: 0,
        hint: 'a(x - u)² + v alakban a csúcspont C(u; v). Figyeld az x melletti előjelet!',
        explanation: 'A zárójelben x - 5 = 0 adja meg az u = 5 koordinátát, a külső konstans v = 3. A csúcspont koordinátái: C(5; 3).'
      },
      {
        id: 'qq1-5',
        questionTypeBadge: 'Csúcspont Balra Tolva',
        question: 'Hol található az f(x) = (x + 2)² - 7 parabola csúcspontja?',
        options: [
          'C(-2; -7)',
          'C(2; -7)',
          'C(-2; 7)',
          'C(-7; -2)'
        ],
        correctAnswer: 0,
        hint: 'x + 2 = 0 ⟹ x = -2.',
        explanation: 'Az (x + 2) tag balra tolást jelent (-2), a -7 pedig lefelé tolást. A csúcspont C(-2; -7).'
      },
      {
        id: 'qq1-6',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Melyik függőleges egyenes a szimmetriatengelye az f(x) = (x - 4)² + 1 parabolának?',
        options: [
          'x = 4',
          'x = -4',
          'y = 1',
          'y = 4'
        ],
        correctAnswer: 0,
        hint: 'A parabola szimmetriatengelye mindig átmegy a csúcsponton, egyenlete x = u.',
        explanation: 'A parabola a csúcspontján átmenő függőleges egyenesre szimmetrikus, melynek egyenlete x = 4.'
      },
      {
        id: 'qq1-7',
        questionTypeBadge: 'Nyílás Iránya',
        question: 'Merre nyílik az f(x) = -3(x - 1)² + 5 parabola?',
        options: [
          'Lefelé nyílik (tükrözve van az x-tengelyre)',
          'Felfelé nyílik',
          'Jobbra nyílik',
          'Balra nyílik'
        ],
        correctAnswer: 0,
        hint: 'A főegyüttható a = -3 negatív előjelű.',
        explanation: 'Mivel a = -3 < 0, a parabola ágai lefelé mutatnak a -∞ felé, és a csúcspontjában maximuma van.'
      },
      {
        id: 'qq1-8',
        questionTypeBadge: 'Gyökfüggvény Kezdőpont',
        question: 'Melyik pontból indul ki a g(x) = √(x - 6) négyzetgyök-függvény grafikonja?',
        options: [
          'K(6; 0) pontból indul jobbra',
          'K(-6; 0) pontból indul balra',
          'K(0; 6) pontból indul felfelé',
          'Az origóból (0; 0)'
        ],
        correctAnswer: 0,
        hint: 'A gyök alatti kifejezés x = 6 esetén válik nullává: √(6 - 6) = 0.',
        explanation: 'A gyök alatti feltétel: x - 6 ≥ 0 ⟹ x ≥ 6. A kezdőpont K(6; 0), innen indul a görbe jobbra a végtelenbe.'
      },
      {
        id: 'qq1-9',
        questionTypeBadge: 'Paritás',
        question: 'Milyen szimmetriatulajdonsággal rendelkezik az f(x) = x² alapfüggvény?',
        options: [
          'Páros függvény: tengelyesen szimmetrikus az y-tengelyre',
          'Páratlan függvény: középpontosan szimmetrikus az origóra',
          'Nem szimmetrikus',
          'Periodikus függvény'
        ],
        correctAnswer: 0,
        hint: '(-x)² = x², tehát f(-x) = f(x).',
        explanation: 'Mivel f(-x) = (-x)² = x² = f(x), az alapfüggvény páros, és grafikonja szimmetrikus a függőleges y-tengelyre.'
      },
      {
        id: 'qq1-10',
        questionTypeBadge: 'Pontos Értékek',
        question: 'Mennyi a √0 és a √49 pontos értéke?',
        options: [
          '√0 = 0 és √49 = 7',
          '√0 = 0 és √49 = ±7',
          '√0 nincs értelmezve, √49 = 7',
          '√0 = 1 és √49 = 7'
        ],
        correctAnswer: 0,
        hint: 'A négyzetgyök függvény egyértelmű, nemnegatív értéket ad.',
        explanation: '0² = 0, ezért √0 = 0. 7² = 49 és 7 ≥ 0, ezért √49 = 7 (a negatív előjel nem része az alapvető gyökvonásnak).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Transzformációk és Algebrai Számítások (Közepes)',
    subtitle: 'Négyzetes alakítások, zérushelyek számítása és gyökös eltolások mélyebb vizsgálata.',
    range: '11 - 20. feladat',
    focus: 'Teljes Négyzetek & Transzformációk',
    questions: [
      {
        id: 'qq2-1',
        questionTypeBadge: 'Transzformációs Lépések',
        question: 'Milyen geometriai transzformációkkal kapjuk az f(x) = x²-ből az f(x) = -(x - 3)² + 4 függvényt?',
        figure: <ParabolaTransformSvg size={240} />,
        options: [
          '3 egységgel jobbra tolás, tükrözés az x-tengelyre, majd 4 egységgel felfelé tolás',
          '3 egységgel balra tolás, 4 egységgel lefelé tolás',
          '4 egységgel jobbra tolás, 3 egységgel felfelé tolás',
          'Csak függőleges nyújtás és eltolás'
        ],
        correctAnswer: 0,
        hint: '(x - 3) jobbra tol, a negatív előjel tükröz (lefelé nyílik), a +4 pedig felfelé emeli a csúcsot.',
        explanation: 'Az (x - 3) miatt 3-mal jobbra tolunk, a - előjel miatt tükrözünk az x-tengelyre, a +4 miatt 4 egységgel feljebb visszük a csúcsot C(3; 4)-be.'
      },
      {
        id: 'qq2-2',
        questionTypeBadge: 'Gyökfüggvény Értékkészlete',
        question: 'Mi a kezdőpontja és értékkészlete a g(x) = √(x + 4) - 2 függvénynek?',
        options: [
          'Kezdőpontja K(-4; -2), értékkészlete Rg = [-2; ∞[',
          'Kezdőpontja K(4; -2), értékkészlete Rg = [0; ∞[',
          'Kezdőpontja K(-4; 2), értékkészlete Rg = ]-∞; -2]',
          'Kezdőpontja K(-2; -4), értékkészlete Rg = ℝ'
        ],
        correctAnswer: 0,
        hint: 'A gyök alatti kifejezés x = -4-nél 0, ekkor g(-4) = 0 - 2 = -2. Innen felfelé nő a függvény.',
        explanation: 'Kezdőpont: x + 4 = 0 ⟹ x = -4, ekkor y = -2. Mivel √(x + 4) ≥ 0, a felvett értékek y ≥ -2, tehát Rg = [-2; ∞[.'
      },
      {
        id: 'qq2-3',
        questionTypeBadge: 'Teljes Négyzetté Alakítás',
        question: 'Alakítsd át teljes négyzetté az f(x) = x² - 10x + 29 kifejezést!',
        options: [
          'f(x) = (x - 5)² + 4, csúcspontja C(5; 4)',
          'f(x) = (x - 5)² - 4, csúcspontja C(5; -4)',
          'f(x) = (x + 5)² + 4, csúcspontja C(-5; 4)',
          'f(x) = (x - 10)² + 29, csúcspontja C(10; 29)'
        ],
        correctAnswer: 0,
        hint: 'x² - 10x = (x - 5)² - 25. Add hozzá a 29-et!',
        explanation: 'x² - 10x + 29 = (x - 5)² - 25 + 29 = (x - 5)² + 4. A csúcspont C(5; 4).'
      },
      {
        id: 'qq2-4',
        questionTypeBadge: 'Negatív Csúcsú Alakítás',
        question: 'Alakítsd át teljes négyzetté az f(x) = x² + 6x - 1 kifejezést!',
        options: [
          'f(x) = (x + 3)² - 10, csúcspontja C(-3; -10)',
          'f(x) = (x + 3)² + 8, csúcspontja C(-3; 8)',
          'f(x) = (x - 3)² - 10, csúcspontja C(3; -10)',
          'f(x) = (x + 6)² - 1, csúcspontja C(-6; -1)'
        ],
        correctAnswer: 0,
        hint: 'x² + 6x = (x + 3)² - 9. Ezután -9 - 1 = -10.',
        explanation: 'x² + 6x - 1 = (x + 3)² - 9 - 1 = (x + 3)² - 10. A csúcspont C(-3; -10).'
      },
      {
        id: 'qq2-5',
        questionTypeBadge: 'Zérushely Számítás',
        question: 'Mik a zérushelyei az f(x) = (x - 2)² - 9 másodfokú függvénynek?',
        options: [
          'x = -1 és x = 5',
          'x = 2 és x = -9',
          'x = 3 és x = -3',
          'x = 1 és x = 7'
        ],
        correctAnswer: 0,
        hint: '(x - 2)² - 9 = 0 ⟹ (x - 2)² = 9 ⟹ x - 2 = 3 vagy x - 2 = -3.',
        explanation: '(x - 2)² = 9 ⟹ x - 2 = 3 ⟹ x = 5; illetve x - 2 = -3 ⟹ x = -1. A két zérushely: -1 és 5.'
      },
      {
        id: 'qq2-6',
        questionTypeBadge: 'Zérushelyek Száma',
        question: 'Hány valós zérushelye van az f(x) = 2(x + 1)² + 5 függvénynek?',
        options: [
          '0 zérushelye van (nem metszi az x-tengelyt)',
          '1 zérushelye van',
          '2 zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont (-1; 5)-ben van, és a = 2 > 0 miatt felfelé nyílik.',
        explanation: 'Mivel a csúcspont az x-tengely felett van (y = 5) és a görbe felfelé nyílik, a függvény értéke mindig legalább 5 (soha nem éri el a 0-t).'
      },
      {
        id: 'qq2-7',
        questionTypeBadge: 'Összetett Gyök Alatti Feltétel',
        question: 'Mennyi a g(x) = √(2x - 8) függvény értelmezési tartománya?',
        options: [
          'Dg = [4; ∞[',
          'Dg = [8; ∞[',
          'Dg = [0; ∞[',
          'Dg = ]-∞; 4]'
        ],
        correctAnswer: 0,
        hint: 'Oldd meg a 2x - 8 ≥ 0 egyenlőtlenséget!',
        explanation: '2x - 8 ≥ 0 ⟹ 2x ≥ 8 ⟹ x ≥ 4. Tehát az értelmezési tartomány [4; ∞[.'
      },
      {
        id: 'qq2-8',
        questionTypeBadge: 'Szélsőérték Leolvasás',
        question: 'Mi a szélsőértéke az f(x) = -2(x + 3)² + 8 függvénynek?',
        options: [
          'Maximuma van az x = -3 helyen, értéke y = 8',
          'Minimuma van az x = -3 helyen, értéke y = 8',
          'Maximuma van az x = 3 helyen, értéke y = 8',
          'Maximuma van az x = 8 helyen, értéke y = -3'
        ],
        correctAnswer: 0,
        hint: 'A negatív főegyüttható (-2) miatt lefelé nyílik, így a csúcsban maximum van.',
        explanation: 'A lefelé nyíló parabola csúcspontja C(-3; 8). Ez a globális maximum: helye x = -3, értéke y = 8.'
      },
      {
        id: 'qq2-9',
        questionTypeBadge: 'Behelyettesítés',
        question: 'Mennyi az f(x) = (x - 4)² - 5 függvény értéke az x = 1 helyen?',
        options: [
          'f(1) = 4',
          'f(1) = -2',
          'f(1) = 14',
          'f(1) = -4'
        ],
        correctAnswer: 0,
        hint: 'Számold ki: (1 - 4)² - 5 = (-3)² - 5.',
        explanation: 'f(1) = (1 - 4)² - 5 = (-3)² - 5 = 9 - 5 = 4.'
      },
      {
        id: 'qq2-10',
        questionTypeBadge: 'Laposodó Parabola',
        question: 'Melyik függvény grafikonja szélesebb (laposabb), mint az y = x² alapfüggvény?',
        options: [
          'f(x) = 0.25x²',
          'f(x) = 4x²',
          'f(x) = 2(x - 1)²',
          'f(x) = -3x²'
        ],
        correctAnswer: 0,
        hint: 'Ha |a| < 1, a parabola szélesebb, laposabb, lassabban növekszik.',
        explanation: 'Mivel |a| = 0.25 < 1, az f(x) = 0.25x² parabola szélesebb (laposabb) az alapfüggvénynél.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Gyökös Egyenletek és Alkalmazások (Nehéz)',
    subtitle: 'Négyzetgyökös egyenletek, fordított előjelű tartományok és mindennapi parabola-modellek.',
    range: '21 - 30. feladat',
    focus: 'Gyökös Egyenletek & Modellezés',
    questions: [
      {
        id: 'qq3-1',
        questionTypeBadge: 'Gyökös Egyenlet',
        question: 'Mi a megoldása a √(x + 7) = 5 egyenletnek?',
        figure: <TransformComparisonSvg size={240} />,
        options: [
          'x = 18',
          'x = 32',
          'x = -2',
          'Nincs valós megoldás'
        ],
        correctAnswer: 0,
        hint: 'Emeld mindkét oldalt négyzetre: x + 7 = 25.',
        explanation: '√(x + 7) = 5 ⟹ x + 7 = 25 ⟹ x = 18. Ellenőrzés: √(18 + 7) = √25 = 5, ami stimmel.'
      },
      {
        id: 'qq3-2',
        questionTypeBadge: 'Balra Mutató Gyök',
        question: 'Milyen x valós számokra értelmezett a h(x) = √(10 - 2x) függvény?',
        options: [
          'x ∈ ]-∞; 5]',
          'x ∈ [5; ∞[',
          'x ∈ [-5; 5]',
          'x ∈ ℝ'
        ],
        correctAnswer: 0,
        hint: '10 - 2x ≥ 0 ⟹ 10 ≥ 2x ⟹ 5 ≥ x.',
        explanation: 'A gyök alatti kifejezés nemnegatív: 10 - 2x ≥ 0 ⟹ 10 ≥ 2x ⟹ x ≤ 5. Így a tartomány ]-∞; 5].'
      },
      {
        id: 'qq3-3',
        questionTypeBadge: 'Metszéspontok Keresése',
        question: 'Mely pontokban metszi egymást az f(x) = x² és a g(x) = 2x + 3 egyenes grafikonja?',
        options: [
          'M1(-1; 1) és M2(3; 9)',
          'M1(1; 1) és M2(-3; 9)',
          'Csak az origóban (0; 0)',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        hint: 'Oldd meg az x² = 2x + 3 ⟹ x² - 2x - 3 = 0 egyenletet!',
        explanation: 'x² - 2x - 3 = (x - 3)(x + 1) = 0 ⟹ x₁ = 3, x₂ = -1. A pontok: f(3) = 9 ⟹ (3; 9) és f(-1) = 1 ⟹ (-1; 1).'
      },
      {
        id: 'qq3-4',
        questionTypeBadge: 'Hídív Modell',
        question: 'Egy völgyhíd ívét a vízszint felett a h(x) = -0.05x² + 20 képlet modellezi méterben. Milyen magas a híd a legmagasabb pontján, és mekkora a fesztávolsága a víz szintjén (h = 0)?',
        options: [
          'Magassága 20 m, fesztávolsága 40 m (x = -20-tól +20-ig)',
          'Magassága 40 m, fesztávolsága 20 m',
          'Magassága 20 m, fesztávolsága 20 m',
          'Magassága 100 m, fesztávolsága 50 m'
        ],
        correctAnswer: 0,
        hint: 'A csúcs x = 0-nál h(0) = 20. A zérushelyhez: -0.05x² + 20 = 0 ⟹ 0.05x² = 20 ⟹ x² = 400.',
        explanation: 'A csúcspont (0; 20), így a magasság 20 m. A víz szintjén: 0.05x² = 20 ⟹ x² = 400 ⟹ x = ±20 m. A teljes távolság 20 - (-20) = 40 m.'
      },
      {
        id: 'qq3-5',
        questionTypeBadge: 'Negatív Négyzet Kiegészítés',
        question: 'Alakítsd át teljes négyzetté az f(x) = -x² + 4x + 5 függvényt!',
        options: [
          'f(x) = -(x - 2)² + 9, csúcspontja C(2; 9)',
          'f(x) = -(x - 2)² + 5, csúcspontja C(2; 5)',
          'f(x) = -(x + 2)² + 9, csúcspontja C(-2; 9)',
          'f(x) = (x - 2)² + 9, csúcspontja C(2; 9)'
        ],
        correctAnswer: 0,
        hint: '-(x² - 4x) + 5 = -((x - 2)² - 4) + 5 = -(x - 2)² + 4 + 5.',
        explanation: '-x² + 4x + 5 = -(x² - 4x) + 5 = -((x - 2)² - 4) + 5 = -(x - 2)² + 9. Csúcspontja C(2; 9).'
      },
      {
        id: 'qq3-6',
        questionTypeBadge: 'Gyök Négyzete Csapda',
        question: 'Mennyi a √((√3 - 2)²) kifejezés pontos értéke?',
        options: [
          '2 - √3',
          '√3 - 2',
          '1',
          'Nincs értelmezve'
        ],
        correctAnswer: 0,
        hint: '√(a²) = |a|. Mivel √3 ≈ 1.73, ezért √3 - 2 < 0 negatív!',
        explanation: 'A √(a²) azonosság szerint az eredmény |a|. Mivel √3 < 2, a különbség negatív, így abszolútértéke az ellentettje: |√3 - 2| = 2 - √3.'
      },
      {
        id: 'qq3-7',
        questionTypeBadge: 'Intervallumos Értékkészlet',
        question: 'Határozd meg az f(x) = x² - 4x + 7 függvény értékkészletét a [0; 5] zárt intervallumon!',
        options: [
          'Rf = [3; 12]',
          'Rf = [7; 12]',
          'Rf = [3; 7]',
          'Rf = [0; 5]'
        ],
        correctAnswer: 0,
        hint: 'Teljes négyzet: (x - 2)² + 3. A csúcs x = 2 benne van [0; 5]-ben (y = 3). Számold ki a végpontokat: f(0) és f(5)!',
        explanation: 'f(x) = (x - 2)² + 3. A csúcson f(2) = 3 (minimum). Végpontok: f(0) = 7, f(5) = (3)² + 3 = 12 (maximum). Így Rf = [3; 12].'
      },
      {
        id: 'qq3-8',
        questionTypeBadge: 'Érintő Parabola Paramétere',
        question: 'Milyen c valós érték esetén érinti az f(x) = x² + 6x + c parabola az x-tengelyt?',
        options: [
          'c = 9',
          'c = 36',
          'c = 0',
          'c = 6'
        ],
        correctAnswer: 0,
        hint: 'A parabola akkor érinti a tengelyt, ha teljes négyzet: (x + 3)², ahol a konstans 3² = 9.',
        explanation: 'Az érintés azt jelenti, hogy 1 zérushely van (csúcs az x-tengelyen: v = 0). x² + 6x + c = (x + 3)² - 9 + c = 0 ⟹ c - 9 = 0 ⟹ c = 9.'
      },
      {
        id: 'qq3-9',
        questionTypeBadge: 'Gyök Zérushelye',
        question: 'Mi a g(x) = -√(x - 2) + 5 függvény zérushelye?',
        options: [
          'x = 27',
          'x = 23',
          'x = 7',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        hint: '-√(x - 2) + 5 = 0 ⟹ √(x - 2) = 5 ⟹ x - 2 = 25.',
        explanation: '√(x - 2) = 5 ⟹ x - 2 = 25 ⟹ x = 27. Ellenőrzés: -√(25) + 5 = -5 + 5 = 0.'
      },
      {
        id: 'qq3-10',
        questionTypeBadge: 'Inverz Tulajdonság',
        question: 'Melyik állítás IGAZ az f(x) = x² (x ≥ 0) és a g(x) = √x függvények kapcsolatáról?',
        options: [
          'Egymás inverzei a nemnegatív számokon, grafikonjaik tükrösek az y = x egyenesre',
          'Párhuzamosak egymással a síkon',
          'Egyik sem monoton növekvő',
          'Összegük konstans függvényt ad'
        ],
        correctAnswer: 0,
        hint: 'Ha egy pont rajta van az egyiken: (a; b), akkor (b; a) rajta van a másikon (tükrözés az y = x főátlóra).',
        explanation: 'A nemnegatív számokon a négyzetre emelés és a négyzetgyökvonás egymás megfordításai (inverzei), geometriailag grafikonjaik az y = x egyenesre tükrösek.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Parabola Csúcs: C(u; v)',
    icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>f(x) = a(x - u)² + v</strong></p>
        <p><strong className="text-amber-300">u:</strong> vízszintes tolás ellentétes előjellel!</p>
        <p><strong className="text-emerald-300">v:</strong> függőleges eltolás.</p>
        <p><strong className="text-indigo-300">a:</strong> nyílás iránya (&gt;0 felfelé, &lt;0 lefelé).</p>
      </div>
    )
  },
  {
    title: 'Négyzetgyök Szigorú Szabályai',
    icon: <Target className="w-5 h-5 text-emerald-400" />,
    color: 'emerald',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>g(x) = √(x - u) + v</strong></p>
        <p><strong className="text-emerald-300">Tartomány:</strong> x - u ≥ 0 ⟹ x ≥ u.</p>
        <p><strong className="text-teal-300">Értékkészlet:</strong> y ≥ v (ha a &gt; 0).</p>
        <p className="text-slate-400">A gyök értéke soha nem lehet negatív!</p>
      </div>
    )
  },
  {
    title: 'Teljes Négyzetté Kiegészítés',
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    color: 'purple',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>x² + 2bx + c = (x + b)² - b² + c</strong></p>
        <p>Példa: x² - 6x + 10 = (x - 3)² - 9 + 10 = <strong>(x - 3)² + 1</strong>.</p>
        <p className="text-slate-400">Csúcspont közvetlenül leolvasható: C(3; 1).</p>
      </div>
    )
  },
  {
    title: 'Fontos Azonosság: √(a²)',
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong className="text-amber-300">√(a²) = |a|</strong></p>
        <p>Negatív szám négyzete pozitív, de a gyöke az abszolútértéke!</p>
        <p className="text-slate-400">Példa: √((-5)²) = √25 = 5 = |-5|.</p>
      </div>
    )
  }
];

export const QuadraticRootQuiz: React.FC<QuadraticRootQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="masodfoku-es-negyzetgyok-fuggveny"
      badgeLabel="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="Másodfokú és Négyzetgyök-függvény Kvíz"
      subtitle="30 válogatott feladat 3 szinten: a parabolák csúcspontjától és nyílásától kezdve az algebrai teljes négyzeteken át a gyökös egyenletekig."
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        onSwitchToMatcher ? (
          <QuadraticRootMatcher
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToSorter={onSwitchToSorter}
          />
        ) : undefined
      }
      sorterComponent={
        onSwitchToSorter ? (
          <QuadraticRootSorter
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToMatcher={onSwitchToMatcher}
          />
        ) : undefined
      }
    />
  );
};

