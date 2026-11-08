import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RootPracticeMatcher } from './RootPracticeMatcher';
import { RootPracticeSorter } from './RootPracticeSorter';
import {
  RootDomainAndConditionsSvg,
  RootIdentitiesApplicationSvg,
  RootUnderRootSvg,
  RootEquationTrapSvg
} from './RootPracticeFigures';

interface RootPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Értelmezési tartomány és kikötések',
    description: 'Páros gyök alatt csak nemnegatív szám állhat: √(f(x)) ⇒ f(x) ≥ 0. Ha a gyök a nevezőben van: 1 / √(g(x)) ⇒ g(x) > 0 (szigorúan pozitív)!',
    note: 'Példa: √(2x - 6) ⇒ 2x ≥ 6 ⇒ x ≥ 3. Nevezőben: 1/√(5 - x) ⇒ 5 > x ⇒ x < 5!',
    color: 'from-violet-500 to-purple-600',
    figure: <RootDomainAndConditionsSvg size={180} />
  },
  {
    title: 'Nevezetes azonosságok gyökökkel',
    description: '(√a ± √b)² = a ± 2√(ab) + b. A 2ab vegyes szorzat sosem hagyható el! Négyzetek különbsége: (√a + √b)(√a - √b) = a - b (a gyökök teljesen kiejtik egymást).',
    note: 'Példa: (√3 + √2)² = 3 + 2√6 + 2 = 5 + 2√6. (√7 + √2)(√7 - √2) = 7 - 2 = 5.',
    color: 'from-blue-500 to-indigo-600',
    figure: <RootIdentitiesApplicationSvg size={180} />
  },
  {
    title: 'Teljes négyzet a gyökjel alatt',
    description: 'Emeletes gyökök: √(A ± 2√B) felbontása. A 2uv vegyes tag alapján megkeressük u-t és v-t úgy, hogy u² + v² = A teljesüljön.',
    note: 'Példa: √(7 + 4√3) = √((2 + √3)²) = 2 + √3. Kivonásnál: √(6 - 2√5) = |√5 - 1| = √5 - 1.',
    color: 'from-amber-500 to-yellow-600',
    figure: <RootUnderRootSvg size={180} />
  },
  {
    title: 'Gyökös egyenletek és a hamis gyökök',
    description: 'A négyzetre emelés nem ekvivalens átalakítás, mert ellentett előjelű számok négyzete is azonos! Hamis gyökök keletkezhetnek.',
    note: 'Aranyszabály: a megoldás végén az eredeti egyenletbe való behelyettesítéses ELLENŐRZÉS KÖTELEZŐ!',
    color: 'from-rose-500 to-red-600',
    figure: <RootEquationTrapSvg size={180} />
  }
];

const levels: QuizLevelConfig[] = [
  // 1. SZINT: KÖNNYŰ (10 KÉRDÉS)
  {
    level: 1,
    title: '1. Könnyű szint: Kikötések, alapműveletek és egyszerű összevonások',
    subtitle: 'Értelmezési tartomány felírása, egyszerű szorzatok, hányadosok és egynemű gyökök.',
    range: '1–10. feladat',
    focus: 'Értelmezési tartomány és alapműveletek',
    color: 'violet',
    questions: [
      {
        id: 'rpt1-1',
        question: 'Mi a feltétele annak, hogy a √(x - 3) kifejezés értelmezve legyen a valós számok körében?',
        options: ['x ≥ 3', 'x > 3', 'x ≤ 3', 'x bármilyen valós szám lehet'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök alatti kifejezés nemnegatív kell legyen: x - 3 ≥ 0 ⇒ x ≥ 3.'
      },
      {
        id: 'rpt1-3',
        question: 'Mi az értelmezési tartománya a √(2x - 8) kifejezésnek?',
        options: ['x ≥ 4', 'x > 4', 'x ≥ 8', 'x ≤ 4'],
        correctAnswer: 0,
        explanation: '2x - 8 ≥ 0 ⇒ 2x ≥ 8 ⇒ x ≥ 4.'
      },
      {
        id: 'rpt1-5',
        question: 'Mi a feltétele annak, hogy a √(7 - x) kifejezés valós szám legyen?',
        options: ['x ≤ 7', 'x ≥ 7', 'x < 7', 'x > 7'],
        correctAnswer: 0,
        explanation: '7 - x ≥ 0 ⇒ 7 ≥ x, vagyis x ≤ 7.'
      },
      {
        id: 'rpt1-8',
        question: 'Milyen x értékekre értelmezett az 1 / √(x - 4) tört kifejezés?',
        options: ['x > 4 (szigorúan nagyobb 4-nél)', 'x ≥ 4', 'x < 4', 'x ≤ 4'],
        correctAnswer: 0,
        explanation: 'Mivel a gyök a nevezőben van, az értéke nem lehet nulla, így x - 4 > 0 ⇒ x > 4.'
      },
      {
        id: 'rpt1-11',
        question: 'Miért nem szerepelhet egyenlőségjel (≥ 0 helyett > 0) a nevezőben álló gyök kikötésénél?',
        options: ['Mert nullával való osztás nem értelmezett', 'Mert a gyök értéke sosem lehet nulla', 'Mert a számláló mindig pozitív', 'Nincs különbség, mindkettő helyes'],
        correctAnswer: 0,
        explanation: 'Ha a gyök alatti kifejezés 0 lenne, a gyök értéke is 0 lenne, ami 0-val való osztáshoz vezetne, ami a matematikában tilos.'
      },
      {
        id: 'rpt1-12',
        question: 'Mely valós x értékekre értelmezett a √(x² + 4) kifejezés?',
        options: ['Minden valós számra (x ∈ ℝ)', 'Csak x ≥ 0 esetén', 'Csak x ≥ 2 esetén', 'Csak x ≥ -2 esetén'],
        correctAnswer: 0,
        explanation: 'Bármely valós x-re x² ≥ 0, így x² + 4 ≥ 4 > 0 mindig teljesül, nincs kizárt érték.'
      },
      {
        id: 'rpt1-16',
        question: 'Mennyi (√6)² értéke?',
        options: ['6', '36', '√36', '12'],
        correctAnswer: 0,
        explanation: 'A definíció szerint (√a)² = a, így (√6)² = 6.'
      },
      {
        id: 'rpt1-19',
        question: 'Mennyi a √2 · √18 szorzat értéke?',
        options: ['6', '36', '2√18', '√20'],
        correctAnswer: 0,
        explanation: '√2 · √18 = √(2 · 18) = √36 = 6.'
      },
      {
        id: 'rpt1-26',
        question: 'Mennyi a 3√2 + 5√2 összeg értéke?',
        options: ['8√2', '8√4', '15√2', '8'],
        correctAnswer: 0,
        explanation: '(3 + 5)√2 = 8√2.'
      },
      {
        id: 'rpt1-30',
        question: 'Hogyan alakítható át a √72 tényező kiemelésével?',
        options: ['6√2', '2√18', '3√8', '12√2'],
        correctAnswer: 0,
        explanation: '72 = 36 · 2, így √72 = 6√2.'
      }
    ]
  },

  // 2. SZINT: KÖZEPES (10 KÉRDÉS)
  {
    level: 2,
    title: '2. Közepes szint: Nevezetes azonosságok kibontása és egyszerű gyökös egyenletek',
    subtitle: '(a ± b)² és (a + b)(a - b) azonosságok gyökökkel, valamint alapfokú gyökös egyenletek.',
    range: '11–20. feladat',
    focus: 'Azonosságok és gyökös egyenletek',
    color: 'violet',
    questions: [
      {
        id: 'rpt2-1',
        question: 'Fejtsük ki a (√3 + √2)² kifejezést!',
        options: ['5 + 2√6', '5', '5 + √6', '6 + 2√6'],
        correctAnswer: 0,
        explanation: '(√3)² + 2(√3 · √2) + (√2)² = 3 + 2√6 + 2 = 5 + 2√6.'
      },
      {
        id: 'rpt2-4',
        question: 'Fejtsük ki a (√5 - 1)² kifejezést!',
        options: ['6 - 2√5', '4', '4 - 2√5', '6 + 2√5'],
        correctAnswer: 0,
        explanation: '(√5)² - 2(√5 · 1) + 1² = 5 - 2√5 + 1 = 6 - 2√5.'
      },
      {
        id: 'rpt2-7',
        question: 'Fejtsük ki a (2 + √3)² kifejezést!',
        options: ['7 + 4√3', '7', '7 + 2√3', '5 + 4√3'],
        correctAnswer: 0,
        explanation: '2² + 2(2 · √3) + (√3)² = 4 + 4√3 + 3 = 7 + 4√3.'
      },
      {
        id: 'rpt2-11',
        question: 'Mennyi a (√5 + √2)(√5 - √2) szorzat értéke?',
        options: ['3', '7', '√3', '√21'],
        correctAnswer: 0,
        explanation: '(√5)² - (√2)² = 5 - 2 = 3.'
      },
      {
        id: 'rpt2-14',
        question: 'Mennyi a (3 + √5)(3 - √5) szorzat értéke?',
        options: ['4', '-4', '14', '6'],
        correctAnswer: 0,
        explanation: '3² - (√5)² = 9 - 5 = 4.'
      },
      {
        id: 'rpt2-16',
        question: 'Mennyi a (2√2 + 1)(2√2 - 1) szorzat értéke?',
        options: ['7', '9', '3', '5'],
        correctAnswer: 0,
        explanation: '(2√2)² - 1² = (4 · 2) - 1 = 8 - 1 = 7.'
      },
      {
        id: 'rpt2-19',
        question: 'Mennyi a (√6 + √2)² + (√6 - √2)² összeg értéke?',
        options: ['16', '8', '16 + 4√12', '12'],
        correctAnswer: 0,
        explanation: '(8 + 2√12) + (8 - 2√12) = 16.'
      },
      {
        id: 'rpt2-23',
        question: 'Oldjuk meg a valós számok körében: √x = 5',
        options: ['x = 25', 'x = ±25', 'x = √5', 'x = 10'],
        correctAnswer: 0,
        explanation: 'Mindkét oldalt négyzetre emelve: x = 5² = 25. Ellenőrzés: √25 = 5 (helyes).'
      },
      {
        id: 'rpt2-26',
        question: 'Oldjuk meg: √(2x + 1) = 5',
        options: ['x = 12', 'x = 13', 'x = 24', 'x = 2'],
        correctAnswer: 0,
        explanation: '2x + 1 = 25 ⇒ 2x = 24 ⇒ x = 12. Ellenőrzés: √(25) = 5.'
      },
      {
        id: 'rpt2-28',
        question: 'Hány valós megoldása van a √x = -3 egyenletnek?',
        options: ['0 (nincs megoldás)', '1 (x = 9)', '2 (x = ±9)', 'Végtelen sok'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök értéke a definíció szerint mindig nemnegatív (√x ≥ 0), így sosem lehet -3. Az egyenletnek nincs megoldása!'
      }
    ]
  },

  // 3. SZINT: NEHÉZ (10 KÉRDÉS)
  {
    level: 3,
    title: '3. Nehéz szint: Emeletes gyökök teljes négyzetté alakítása, összetett egyenletek és konjugáltak',
    subtitle: '√(A ± 2√B) felbontása, gyökös másodfokú egyenletek hamis gyökök kiszűrésével és algebrai azonosságok.',
    range: '21–30. feladat',
    focus: 'Összetett gyökök és egyenletek',
    color: 'violet',
    questions: [
      {
        id: 'rpt3-1',
        question: 'Mennyi a √(7 + 4√3) kifejezés pontos értéke?',
        options: ['2 + √3', '2 - √3', '√7 + 2√3', '4 + √3'],
        correctAnswer: 0,
        explanation: '7 + 4√3 = 4 + 4√3 + 3 = (2 + √3)². Gyöke: |2 + √3| = 2 + √3.'
      },
      {
        id: 'rpt3-4',
        question: 'Mennyi a √(6 - 2√5) kifejezés pontos értéke?',
        options: ['√5 - 1', '1 - √5', '5 - 1', '3 - √5'],
        correctAnswer: 0,
        explanation: 'Mivel √5 ≈ 2,236 > 1, a négyzetgyök nemnegatív értéke |√5 - 1| = √5 - 1 (és nem 1 - √5!).'
      },
      {
        id: 'rpt3-5',
        question: 'Mennyi a √(11 + 6√2) kifejezés pontos értéke?',
        options: ['3 + √2', '3 - √2', '2 + √3', '9 + 2√2'],
        correctAnswer: 0,
        explanation: '11 + 6√2 = 9 + 6√2 + 2 = (3 + √2)². Gyöke: 3 + √2.'
      },
      {
        id: 'rpt3-12',
        question: 'Mennyi a √(7 + 4√3) + √(7 - 4√3) kifejezés összevont értéke?',
        options: ['4', '2√3', '7', '8'],
        correctAnswer: 0,
        explanation: '(2 + √3) + (2 - √3) = 4.'
      },
      {
        id: 'rpt3-15',
        question: 'Gyöktelenítsük az 1 / (√5 + √3) tört nevezőjét!',
        options: ['(√5 - √3) / 2', '(√5 + √3) / 2', '√5 - √3', '(√5 - √3) / 8'],
        correctAnswer: 0,
        explanation: '(√5 - √3) / (5 - 3) = (√5 - √3) / 2.'
      },
      {
        id: 'rpt3-17',
        question: 'Gyöktelenítsük az 1 / (3 + 2√2) tört nevezőjét!',
        options: ['3 - 2√2', '3 + 2√2', '(3 - 2√2) / 17', '2√2 - 3'],
        correctAnswer: 0,
        explanation: '(3 - 2√2) / (3² - (2√2)²) = (3 - 2√2) / (9 - 8) = 3 - 2√2.'
      },
      {
        id: 'rpt3-19',
        question: 'Oldjuk meg a valós számok körében: √(2x + 3) = x',
        options: ['Csak x = 3', 'x = 3 és x = -1', 'Csak x = -1', 'Nincs valós megoldás'],
        correctAnswer: 0,
        explanation: 'Négyzetre emelve: 2x + 3 = x² ⇒ x² - 2x - 3 = 0 ⇒ (x - 3)(x + 1) = 0. Ellenőrzés: x = 3 esetén √9 = 3 (jó!). x = -1 esetén √1 = -1 (hamis!). Tehát csak x = 3 a valós megoldás!'
      },
      {
        id: 'rpt3-21',
        question: 'Oldjuk meg: √(4 - x) = x - 2',
        options: ['Csak x = 3', 'x = 3 és x = 0', 'Csak x = 0', 'Nincs megoldás'],
        correctAnswer: 0,
        explanation: '4 - x = (x - 2)² = x² - 4x + 4 ⇒ x² - 3x = 0 ⇒ x(x - 3) = 0. x = 0-nál √4 = -2 (hamis!). x = 3-nál √1 = 1 (jó!). Egyetlen megoldás: x = 3.'
      },
      {
        id: 'rpt3-26',
        question: 'Mi a közös értelmezési tartománya a √(x - 2) + √(5 - x) összegnek?',
        options: ['x ∈ [2; 5]', 'x ∈ ]2; 5[', 'x ≥ 2', 'x ≤ 5'],
        correctAnswer: 0,
        explanation: 'x - 2 ≥ 0 ⇒ x ≥ 2, és 5 - x ≥ 0 ⇒ x ≤ 5. A kettő metszete a zárt [2; 5] intervallum.'
      },
      {
        id: 'rpt3-29',
        question: 'Mennyi a √(x² - 6x + 9) kifejezés pontos értéke, ha tudjuk, hogy x < 3?',
        options: ['3 - x', 'x - 3', '±(x - 3)', 'x + 3'],
        correctAnswer: 0,
        explanation: 'x² - 6x + 9 = (x - 3)². Gyöke |x - 3|. Mivel x < 3, így x - 3 negatív, ezért az abszolút értéke -(x - 3) = 3 - x.'
      }
    ]
  }
];

export const RootPracticeQuiz: React.FC<RootPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="Gyakorlás: Gyökvonás kvíz"
      subtitle="Összetett négyzetgyökös feladatok, értelmezési tartomány, egyszerűsítés és egyenletek"
      themeColor="teal"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <RootPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <RootPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      initialGameMode={initialGameMode}
    />
  );
};

export default RootPracticeQuiz;
    
