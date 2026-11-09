import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CompositeTransformMatcher } from './CompositeTransformMatcher';
import { CompositeTransformSorter } from './CompositeTransformSorter';
import {
  CanonicalParabolaSvg,
  CompositeAbsSvg,
  AbsOutsideSvg,
  BouncingBallModelSvg
} from './CompositeTransformFigures';

interface CompositeTransformQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A kanonikus alak: g(x) = a · f(x - u) + v',
    description: 'A kitüntetett pont (csúcs vagy töréspont) közvetlenül leolvasható: T(u; v). u: vízszintes (ellentétes előjellel), v: függőleges eltolás.',
    note: 'a előjele a nyílásirányt adja: a > 0 esetén minimum (v), a < 0 esetén maximum (v).',
    color: 'from-purple-500 to-indigo-600',
    figure: <CanonicalParabolaSvg size={180} />
  },
  {
    title: 'A lépések szigorú sorrendje',
    description: '1. Vízszintes eltolás (u) ⟶ 2. Függőleges skálázás és tükrözés (a) ⟶ 3. Függőleges eltolás (v).',
    note: 'A függőleges eltolás mindig a szorzás után következik, különben a konstans is megszorzódna!',
    color: 'from-indigo-500 to-blue-600',
    figure: <CompositeAbsSvg size={180} />
  },
  {
    title: 'Külső abszolútérték felhajtás: |f(x)|',
    description: 'A grafikon azon részei, amelyek az x-tengely alatt futnak (f(x) < 0), felfelé tükröződnek az x-tengelyre.',
    note: 'Parabolánál (|x² - d²|) jellegzetes W-alakú görbe keletkezik, melynek értékkészlete [0; ∞[.',
    color: 'from-rose-500 to-amber-600',
    figure: <AbsOutsideSvg size={180} />
  },
  {
    title: 'Gyakorlati modell: Pattogó labda',
    description: 'Két talajérintés között a pálya lefelé nyíló parabola: h(x) = -a(x - d)² + hmax. A csúcs pontosan a két zérushely felezőjénél van!',
    note: 'A szimmetriatengely mindig x = (x₁ + x₂) / 2.',
    color: 'from-emerald-500 to-teal-600',
    figure: <BouncingBallModelSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A kanonikus alak alaptulajdonságai',
    subtitle: 'Csúcspontok leolvasása, nyílásirány, szélsőérték jellege és alapértékek.',
    range: '1–10. feladat',
    focus: 'Kanonikus alak és kitüntetett pontok',
    questions: [
      {
        id: 'ctq1-1',
        questionTypeBadge: 'Csúcspont',
        question: 'Hol található az f(x) = (x - 4)² + 3 másodfokú függvény csúcspontja?',
        options: [
          'T(4; 3)',
          'T(-4; 3)',
          'T(4; -3)',
          'T(-4; -3)'
        ],
        correctAnswer: 0,
        explanation: 'A kanonikus alak f(x) = (x - u)² + v, ahol u = 4 és v = 3. A csúcspont tehát T(4; 3).'
      },
      {
        id: 'ctq1-2',
        questionTypeBadge: 'Szélsőérték típusa',
        question: 'Milyen szélsőértéke van az f(x) = -(x + 2)² + 5 függvénynek?',
        options: [
          'Globális maximuma van az x = -2 helyen, értéke 5',
          'Globális minimuma van az x = -2 helyen, értéke 5',
          'Globális maximuma van az x = 2 helyen, értéke 5',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        explanation: 'A zárójel előtti negatív előjel miatt a parabola lefelé nyílik (a = -1), így maximuma van a csúcspontjában: x = -2 helyen, értéke 5.'
      },
      {
        id: 'ctq1-3',
        questionTypeBadge: 'Abszolútérték töréspont',
        question: 'Mi a töréspontja az f(x) = -2|x - 1| + 6 függvénynek?',
        options: [
          'V(1; 6)',
          'V(-1; 6)',
          'V(1; -6)',
          'V(-2; 6)'
        ],
        correctAnswer: 0,
        explanation: 'Az alak a|x - u| + v. Itt u = 1 és v = 6, így a töréspont V(1; 6).'
      },
      {
        id: 'ctq1-4',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = 2(x + 5)² - 3 függvénynek, ha Df = ℝ?',
        options: [
          'Rf = [-3; ∞[',
          'Rf = [3; ∞[',
          'Rf = ]-∞; -3]',
          'Rf = [-5; ∞['
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = 2 > 0, a parabola felfelé nyílik, így a felvett legkisebb érték a csúcs y-koordinátája (-3): Rf = [-3; ∞[.'
      },
      {
        id: 'ctq1-5',
        questionTypeBadge: 'Nyílásirány',
        question: 'Melyik függvény grafikonja nyílik LEFELÉ?',
        options: [
          'f(x) = -(x - 1)² + 4',
          'f(x) = (x + 3)² - 2',
          'f(x) = 2(x - 5)² + 1',
          'f(x) = 0,5(x + 4)²'
        ],
        correctAnswer: 0,
        explanation: 'Csak az első függvénynél negatív a főegyüttható (a = -1), így ez nyílik lefelé.'
      },
      {
        id: 'ctq1-6',
        questionTypeBadge: 'Szimmetriatengely',
        question: 'Mi a szimmetriatengelye az f(x) = 3(x + 7)² - 10 parabolának?',
        options: [
          'Az x = -7 függőleges egyenes',
          'Az x = 7 függőleges egyenes',
          'Az y = -10 vízszintes egyenes',
          'Az y = 0 tengely'
        ],
        correctAnswer: 0,
        explanation: 'A parabola szimmetriatengelye mindig a csúcspont x-koordinátáján átmenő függőleges egyenes: x = -7.'
      },
      {
        id: 'ctq1-7',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van az f(x) = (x - 2)² + 4 függvénynek?',
        options: [
          '0 zérushelye van',
          '1 zérushelye van',
          '2 zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont T(2; 4) a tengely felett van, és a parabola felfelé nyílik (a = 1 > 0), így soha nem éri el az x-tengelyt (f(x) ≥ 4 mindenütt).'
      },
      {
        id: 'ctq1-8',
        questionTypeBadge: 'Helyettesítési érték',
        question: 'Mennyi az f(x) = -2(x - 3)² + 8 értéke az x = 1 helyen?',
        options: [
          '0',
          '8',
          '-4',
          '16'
        ],
        correctAnswer: 0,
        explanation: 'f(1) = -2 · (1 - 3)² + 8 = -2 · (-2)² + 8 = -2 · 4 + 8 = -8 + 8 = 0. (Ez egy zérushely!)'
      },
      {
        id: 'ctq1-9',
        questionTypeBadge: 'Lépések sorrendje',
        question: 'Milyen sorrendben kell végrehajtani a transzformációkat az f(x) = 2(x - 1)² + 5 ábrázolásakor?',
        options: [
          'Jobbra 1 ⟶ 2-szeres nyújtás ⟶ Fel 5',
          'Fel 5 ⟶ Jobbra 1 ⟶ 2-szeres nyújtás',
          '2-szeres nyújtás ⟶ Fel 5 ⟶ Jobbra 1',
          'Balra 1 ⟶ 2-szeres nyújtás ⟶ Fel 5'
        ],
        correctAnswer: 0,
        explanation: 'Helyes sorrend: 1. Vízszintes eltolás (jobbra 1), 2. Függőleges skálázás (2-szeres nyújtás a csúcsból), 3. Függőleges eltolás (fel 5).'
      },
      {
        id: 'ctq1-10',
        questionTypeBadge: 'Érintő csúcspont',
        question: 'Melyik függvény grafikonja ÉRINTI az x-tengelyt (van pontosan 1 zérushelye)?',
        options: [
          'f(x) = -3(x - 6)²',
          'f(x) = (x - 6)² + 2',
          'f(x) = -(x - 6)² + 4',
          'f(x) = 2(x - 6)² - 8'
        ],
        correctAnswer: 0,
        explanation: 'Akkor érinti a tengelyt, ha a csúcspont y-koordinátája v = 0. Az f(x) = -3(x - 6)² esetén T(6; 0), így pontosan 1 zérushelye van (x = 6).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Zérushelyek számítása és transzformációk visszafejtése',
    subtitle: 'Zérushelyek levezetése, képlet felírása pontokból és szélsőértékekből.',
    range: '11–20. feladat',
    focus: 'Zérushely-számítás, paraméterkeresés és abszolútérték',
    questions: [
      {
        id: 'ctq2-1',
        questionTypeBadge: 'Zérushelyek számolása',
        question: 'Melyek az f(x) = (x - 1)² - 9 függvény zérushelyei a valós számok halmazán?',
        options: [
          'x₁ = -2 és x₂ = 4',
          'x₁ = 2 és x₂ = -4',
          'x₁ = -3 és x₂ = 3',
          'x₁ = -1 és x₂ = 9'
        ],
        correctAnswer: 0,
        explanation: '(x - 1)² - 9 = 0 ⟹ (x - 1)² = 9 ⟹ x - 1 = 3 (x = 4) vagy x - 1 = -3 (x = -2).'
      },
      {
        id: 'ctq2-2',
        questionTypeBadge: 'Zérushelyek számolása',
        question: 'Melyek a g(x) = -2(x + 3)² + 8 függvény zérushelyei?',
        options: [
          'x₁ = -5 és x₂ = -1',
          'x₁ = 1 és x₂ = 5',
          'x₁ = -3 és x₂ = 3',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        explanation: '-2(x + 3)² + 8 = 0 ⟹ 2(x + 3)² = 8 ⟹ (x + 3)² = 4 ⟹ x + 3 = 2 (x = -1) vagy x + 3 = -2 (x = -5).'
      },
      {
        id: 'ctq2-3',
        questionTypeBadge: 'Abszolútérték zérushelyek',
        question: 'Melyek a h(x) = |x - 4| - 7 függvény zérushelyei?',
        options: [
          'x₁ = -3 és x₂ = 11',
          'x₁ = 3 és x₂ = -11',
          'Csak x = 11',
          'x₁ = 4 és x₂ = 7'
        ],
        correctAnswer: 0,
        explanation: '|x - 4| - 7 = 0 ⟹ |x - 4| = 7 ⟹ x - 4 = 7 (x = 11) vagy x - 4 = -7 (x = -3).'
      },
      {
        id: 'ctq2-4',
        questionTypeBadge: 'Képlet felírása',
        question: 'Egy másodfokú függvény csúcspontja T(2; -5), főegyütthatója a = 3. Mi a hozzárendelési szabálya?',
        options: [
          'f(x) = 3(x - 2)² - 5',
          'f(x) = 3(x + 2)² - 5',
          'f(x) = (3x - 2)² - 5',
          'f(x) = 3(x - 2)² + 5'
        ],
        correctAnswer: 0,
        explanation: 'Az a(x - u)² + v képletbe behelyettesítve: f(x) = 3(x - 2)² - 5.'
      },
      {
        id: 'ctq2-5',
        questionTypeBadge: 'Paraméter meghatározása',
        question: 'Az f(x) = -(x + a)² + b függvény maximumhelye x = 4, a maximum értéke 7. Mennyi az a és b értéke?',
        options: [
          'a = -4 és b = 7',
          'a = 4 és b = 7',
          'a = -4 és b = -7',
          'a = 7 és b = 4'
        ],
        correctAnswer: 0,
        explanation: 'A maximumhely x = u = 4. Mivel a képletben (x + a) szerepel: x - u = x - 4 = x + a ⟹ a = -4. A maximum értéke közvetlenül b = 7.'
      },
      {
        id: 'ctq2-6',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton CSÖKKENŐ az f(x) = 2(x - 3)² + 1 függvény?',
        options: [
          ']-∞; 3] intervallumon',
          '[3; ∞[ intervallumon',
          ']-∞; 1] intervallumon',
          '[1; ∞[ intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A parabola felfelé nyílik (a = 2 > 0), csúcsa x = 3 helyen van. A csúcspont előtt (]-∞; 3]) felülről lefelé halad, azaz szigorúan monoton csökken.'
      },
      {
        id: 'ctq2-7',
        questionTypeBadge: 'Gyökfüggvény összetett alakja',
        question: 'Mi a kezdőpontja és értékkészlete az f(x) = -2√(x - 3) + 4 függvénynek?',
        options: [
          'K(3; 4) és Rf = ]-∞; 4]',
          'K(-3; 4) és Rf = [4; ∞[',
          'K(3; 4) és Rf = [4; ∞[',
          'K(3; -4) és Rf = ]-∞; -4]'
        ],
        correctAnswer: 0,
        explanation: 'A kezdőpont K(u; v) = (3; 4). Mivel a gyök előtt negatív szorzó áll (-2), a görbe lefelé ível, így a felvett értékek legfeljebb 4-ek: Rf = ]-∞; 4].'
      },
      {
        id: 'ctq2-8',
        questionTypeBadge: 'Felhajtott abszolútérték',
        question: 'Hány zérushelye van az f(x) = |x² - 9| függvénynek?',
        options: [
          '2 zérushelye van: x = -3 és x = 3',
          '4 zérushelye van',
          '0 zérushelye van',
          '1 zérushelye van'
        ],
        correctAnswer: 0,
        explanation: '|x² - 9| = 0 ⟹ x² - 9 = 0 ⟹ x² = 9 ⟹ x = ±3. Az abszolútérték felhajtása a zérushelyek számát és helyét nem változtatja meg!'
      },
      {
        id: 'ctq2-9',
        questionTypeBadge: 'Felhajtott csúcs',
        question: 'Melyik pontban van helyi MAXIMUMA az f(x) = |(x - 2)² - 4| függvénynek?',
        options: [
          'A (2; 4) pontban',
          'A (2; -4) pontban',
          'A (-2; 4) pontban',
          'Az origóban (0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Az eredeti (x - 2)² - 4 parabola csúcsa (2; -4) volt. A külső abszolútérték a negatív -4-et felhajtja +4-be, így a (2; 4) pontban helyi maximum keletkezik.'
      },
      {
        id: 'ctq2-10',
        questionTypeBadge: 'Pontillesztés',
        question: 'Egy másodfokú függvény csúcspontja T(1; 2), és átmegy a P(3; 10) ponton. Mennyi az a főegyüttható?',
        options: [
          'a = 2',
          'a = 4',
          'a = 1',
          'a = 0,5'
        ],
        correctAnswer: 0,
        explanation: 'f(x) = a(x - 1)² + 2. Behelyettesítve: 10 = a(3 - 1)² + 2 ⟹ 10 = 4a + 2 ⟹ 8 = 4a ⟹ a = 2.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szöveges modellezés, érettségi és emelt szint',
    subtitle: 'Pattogó labda, lemez hajtogatás, metszéspontok és összetett abszolútérték-egyenletek.',
    range: '21–30. feladat',
    focus: 'Fizikai és geometriai optimumok, összetett egyenletek',
    questions: [
      {
        id: 'ctq3-1',
        questionTypeBadge: 'Tankönyvi feladat: Pattogó labda',
        question: 'Egy pattogó labda pályája két talajérintés között: h(x) = -0,05(x - 40)² + 80 (ahol x és h cm-ben értendő). Mekkora távolság van a két talajérintési pont között?',
        options: [
          '80 cm',
          '40 cm',
          '160 cm',
          '800 cm'
        ],
        correctAnswer: 0,
        explanation: 'Talajérintésnél h = 0: -0,05(x - 40)² + 80 = 0 ⟹ 0,05(x - 40)² = 80 ⟹ (x - 40)² = 1600 ⟹ x - 40 = ±40. x₁ = 0 és x₂ = 80 cm. A távolság 80 - 0 = 80 cm.'
      },
      {
        id: 'ctq3-2',
        questionTypeBadge: 'Tankönyvi feladat: Pattogó labda',
        question: 'Az előző h(x) = -0,05(x - 40)² + 80 pályán mozgó labda mekkora maximális magasságot ér el?',
        options: [
          '80 cm magasságot az x = 40 cm helyen',
          '40 cm magasságot az x = 80 cm helyen',
          '160 cm magasságot',
          '50 cm magasságot'
        ],
        correctAnswer: 0,
        explanation: 'A parabola csúcspontja T(40; 80), így a maximális magasság hmax = 80 cm, amelyet a két pattanás pontosan felénél, x = 40 cm-nél ér el.'
      },
      {
        id: 'ctq3-3',
        questionTypeBadge: 'Tankönyvi feladat: Vályú keresztmetszet',
        question: 'Egy 10 cm széles bádoglemez két szélét x szélességben derékszögben felhajtva vályút készítünk. Területe T(x) = -2(x - 2,5)² + 12,5. Hány cm-es részt kell felhajtani a maximális keresztmetszethez?',
        options: [
          'x = 2,5 cm-t (ekkor a terület 12,5 cm²)',
          'x = 5 cm-t (ekkor a terület 10 cm²)',
          'x = 2 cm-t (ekkor a terület 12 cm²)',
          'x = 3 cm-t'
        ],
        correctAnswer: 0,
        explanation: 'A lefelé nyíló parabola maximumhelye a csúcspont x-koordinátája: x = 2,5 cm, és a maximális terület T = 12,5 cm².'
      },
      {
        id: 'ctq3-4',
        questionTypeBadge: 'Metszéspontok száma',
        question: 'Hány közös pontja van az f(x) = (x - 2)² - 1 és g(x) = -(x - 2)² + 7 függvények grafikonjának?',
        options: [
          '2 közös pontja van (x = 0 és x = 4 helyeken)',
          '1 közös pontja van (a csúcspontban)',
          '0 közös pontja van',
          '4 közös pontja van'
        ],
        correctAnswer: 0,
        explanation: '(x - 2)² - 1 = -(x - 2)² + 7 ⟹ 2(x - 2)² = 8 ⟹ (x - 2)² = 4 ⟹ x - 2 = ±2 ⟹ x₁ = 4 és x₂ = 0. Mindkét helyen y = 3.'
      },
      {
        id: 'ctq3-5',
        questionTypeBadge: 'Abszolútérték felhajtott egyenlet',
        question: 'Hány megoldása van a valós számok halmazán az |x² - 4| = 3 egyenletnek?',
        options: [
          '4 valós megoldása van: x = ±1 és x = ±√7',
          '2 valós megoldása van: x = ±1',
          '0 megoldása van',
          '3 megoldása van'
        ],
        correctAnswer: 0,
        explanation: '|x² - 4| = 3 két esetet jelent: 1) x² - 4 = 3 ⟹ x² = 7 ⟹ x = ±√7; 2) x² - 4 = -3 ⟹ x² = 1 ⟹ x = ±1. Összesen 4 valós megoldás létezik!'
      },
      {
        id: 'ctq3-6',
        questionTypeBadge: 'Paraméteres vizsgálat',
        question: 'Milyen c valós értékekre van az f(x) = (x - 3)² + c függvénynek pontosan 2 különböző zérushelye?',
        options: [
          'c < 0 esetén',
          'c > 0 esetén',
          'c = 0 esetén',
          'Minden valós c értékre'
        ],
        correctAnswer: 0,
        explanation: '(x - 3)² = -c. Mivel egy négyzet csak pozitív számmal lehet egyenlő ahhoz, hogy 2 megoldás legyen: -c > 0 ⟹ c < 0 (a csúcsnak az x-tengely alatt kell lennie).'
      },
      {
        id: 'ctq3-7',
        questionTypeBadge: 'Összetett értékkészlet',
        question: 'Mi a legbővebb értékkészlete az f(x) = 3 - |2x - 4| függvénynek?',
        options: [
          'Rf = ]-∞; 3]',
          'Rf = [3; ∞[',
          'Rf = ]-∞; -3]',
          'Rf = [-4; 3]'
        ],
        correctAnswer: 0,
        explanation: 'Átírva kanonikus alakra: f(x) = -2|x - 2| + 3. A töréspont V(2; 3), és a grafikon lefelé nyílik (a = -2), így Rf = ]-∞; 3].'
      },
      {
        id: 'ctq3-8',
        questionTypeBadge: 'Érettségi típus: Transzformációk lánca',
        question: 'Az f(x) = x² függvény grafikonját eltoljuk balra 2-vel, tükrözzük az x-tengelyre, majd eltoljuk fel 5-tel. Melyik a helyes képlet?',
        options: [
          'g(x) = -(x + 2)² + 5',
          'g(x) = -(x - 2)² + 5',
          'g(x) = -(x + 2)² - 5',
          'g(x) = (-x + 2)² + 5'
        ],
        correctAnswer: 0,
        explanation: '1) Balra 2: (x + 2)². 2) Tükrözés az x-tengelyre: -(x + 2)². 3) Fel 5: -(x + 2)² + 5.'
      },
      {
        id: 'ctq3-9',
        questionTypeBadge: 'Belső abszolútérték',
        question: 'Melyik állítás IGAZ az f(x) = (|x| - 2)² függvényre?',
        options: [
          'Páros függvény, két csúcspontja (minimuma) van: (-2; 0) és (2; 0)',
          'Egyetlen csúcspontja van az origóban',
          'Nem szimmetrikus az y-tengelyre',
          'Értékkészlete ]-∞; 0]'
        ],
        correctAnswer: 0,
        explanation: 'f(-x) = (|-x| - 2)² = (|x| - 2)² = f(x), tehát páros. Zérushelyei |x| = 2 ⟹ x = ±2, itt éri el a 0 minimumot, W alakú sima görbe.'
      },
      {
        id: 'ctq3-10',
        questionTypeBadge: 'Emelt szintű szélsőérték',
        question: 'Hol és mennyi a MAXIMUMA az f(x) = -3(x + 1)² + 12 függvénynek a [0; 3] zárt intervallumon?',
        options: [
          'A maximumérték 9, az x = 0 helyen',
          'A maximumérték 12, az x = -1 helyen',
          'A maximumérték -36, az x = 3 helyen',
          'A maximumérték 0, az x = 1 helyen'
        ],
        correctAnswer: 0,
        explanation: 'A függvény csúcsa az x = -1 helyen van, de ez KÍVÜL esik a [0; 3] vizsgált intervallumon! Mivel x ≥ 0 esetén a függvény szigorúan monoton csökken, a legnagyobb értékét a bal végpontban veszi fel: f(0) = -3(0 + 1)² + 12 = 9!'
      }
    ]
  }
};

export const CompositeTransformQuiz: React.FC<CompositeTransformQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Összetett függvénytranszformációk"
      subtitle="Gyakorold a kanonikus alakot, a műveleti sorrendet és az abszolútérték felhajtását!"
      themeColor="purple"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={CompositeTransformMatcher}
      sorterComponent={CompositeTransformSorter}
    />
  );
};

