import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CompletingSquareMatcher } from './CompletingSquareMatcher';
import { CompletingSquareSorter } from './CompletingSquareSorter';
import {
  GeometricCompletingSquareSvg,
  IncompleteEquationTreeSvg,
  StepByStepSquareMethodSvg,
  RootsExistenceComparisonSvg
} from './CompletingSquareFigures';

interface CompletingSquareQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A teljes négyzetté kiegészítés azonossága',
    description: 'x² + px = (x + p/2)² - (p/2)². A felezett érték négyzetét mindig le kell vonni a kompenzáláshoz!',
    note: 'Előjel-szabály: x² - 6x esetén (x - 3)² - 9, a levont tag mindig KIVONÁS!',
    color: 'from-amber-500 to-orange-600',
    figure: <GeometricCompletingSquareSvg size={220} />
  },
  {
    title: 'Hiányos másodfokú egyenletek',
    description: 'c = 0: ax² + bx = 0 ⟹ x(ax + b) = 0 ⟹ x₁ = 0 vagy x₂ = -b/a. b = 0: ax² + c = 0 ⟹ x² = -c/a ⟹ x = ±√(-c/a).',
    note: 'Soha ne ossz le x-szel, mert a nullával való osztással elveszíted az x = 0 gyököt!',
    color: 'from-blue-500 to-indigo-600',
    figure: <IncompleteEquationTreeSvg size={220} />
  },
  {
    title: 'A négyzetkiegészítés 4 lépése',
    description: '1. Felezés (d = p/2) ⟶ 2. Felírás és levonás ((x+d)² - d²) ⟶ 3. Átrendezés a jobb oldalra ((x+d)² = k) ⟶ 4. Gyökvonás (x = -d ± √k).',
    note: 'Mielőtt gyököt vonnál, mindig vond össze az összes konstanst a jobb oldalon!',
    color: 'from-emerald-500 to-teal-600',
    figure: <StepByStepSquareMethodSvg size={220} />
  },
  {
    title: 'A valós gyökök száma ((x + d)² = k)',
    description: 'Ha k > 0: 2 különböző valós gyök (±√k). Ha k = 0: 1 valós gyök (x = -d, kettős gyök). Ha k < 0: nincs valós gyök (x ∈ ∅).',
    note: 'A valós számok körében egyetlen valós szám négyzete sem lehet negatív!',
    color: 'from-purple-500 to-pink-600',
    figure: <RootsExistenceComparisonSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és hiányos egyenletek',
    subtitle: 'Másodfokú kifejezések felépítése, kiemelés és közvetlen gyökvonás hiányos esetekben.',
    range: '1–10. feladat',
    focus: 'Hiányos egyenletek és azonosságok',
    questions: [
      {
        id: 'csq1-1',
        questionTypeBadge: 'Fogalom',
        question: 'Miért kötelező feltétel az ax² + bx + c = 0 kanonikus alakban, hogy a ≠ 0 legyen?',
        options: [
          'Mert ha a = 0 lenne, a másodfokú tag eltűnne, és az egyenlet elsőfokúvá (lineárissá) válna',
          'Mert nullával nem lehet szorozni a matematikában',
          'Mert a negatív számnak nem létezik négyzetgyöke',
          'Mert különben az egyenletnek végtelen sok gyöke lenne'
        ],
        correctAnswer: 0,
        explanation: 'Ha a = 0, akkor 0 · x² = 0, így az egyenlet bx + c = 0 alakú lesz, ami egy közönséges elsőfokú (lineáris) egyenlet. A másodfokúságot éppen a másodfokú tag jelenléte (a ≠ 0) biztosítja.'
      },
      {
        id: 'csq1-2',
        questionTypeBadge: 'Hiányos egyenlet',
        question: 'Mik a gyökei az x² - 25 = 0 egyenletnek a valós számok halmazán?',
        options: [
          'x₁ = 5 és x₂ = -5',
          'Csak x = 5',
          'x₁ = 0 és x₂ = 25',
          'Nincs valós gyöke'
        ],
        correctAnswer: 0,
        explanation: 'Átrendezve: x² = 25. Mivel mind az 5² = 25, mind a (-5)² = 25, ezért két ellentett előjelű valós gyök van: x₁,₂ = ±√25 = ±5.'
      },
      {
        id: 'csq1-3',
        questionTypeBadge: 'Hiányos egyenlet',
        question: 'Hogyan oldható meg helyesen az x² - 7x = 0 hiányos másodfokú egyenlet?',
        options: [
          'x kiemelésével: x(x - 7) = 0 ⟹ x₁ = 0, x₂ = 7',
          'Mindkét oldalt leosztjuk x-szel: x = 7',
          'Átvisszük a 7x-et és gyököt vonunk: x = ±√7',
          'Négyzetkiegészítéssel: (x - 7)² = 0 ⟹ x = 7'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a konstans tag hiányzik (c = 0), az x kiemelhető szorzóként: x(x - 7) = 0. Egy szorzat akkor 0, ha valamelyik tényezője 0, így x₁ = 0 vagy x - 7 = 0 ⟹ x₂ = 7. x-szel osztani tilos, mert elveszítenénk az x = 0 gyököt!'
      },
      {
        id: 'csq1-4',
        questionTypeBadge: 'Tévhit elkerülése',
        question: 'Hány valós megoldása van az x² + 16 = 0 egyenletnek?',
        options: [
          '0 (nincs valós megoldása, mert x² = -16)',
          '2 (x₁ = 4 és x₂ = -4)',
          '1 (kettős gyök: x = -4)',
          '2 (x₁ = 16 és x₂ = -16)'
        ],
        correctAnswer: 0,
        explanation: 'Átrendezve: x² = -16. A valós számok halmazán bármely valós szám négyzete nemnegatív (x² ≥ 0), így soha nem lehet egyenlő negatív számmal (-16 < 0). Ezért az egyenletnek nincs valós megoldása (x ∈ ∅).'
      },
      {
        id: 'csq1-5',
        questionTypeBadge: 'Hiányos egyenlet',
        question: 'Mik a megoldásai a 3x² + 12x = 0 egyenletnek?',
        options: [
          'x₁ = 0 és x₂ = -4',
          'x₁ = 0 és x₂ = 4',
          'Csak x = -4',
          'x = ±2'
        ],
        correctAnswer: 0,
        explanation: 'Kiemelve 3x-et: 3x(x + 4) = 0. Ebből vagy 3x = 0 ⟹ x₁ = 0, vagy x + 4 = 0 ⟹ x₂ = -4.'
      },
      {
        id: 'csq1-6',
        questionTypeBadge: 'Hiányos egyenlet',
        question: 'Mik a megoldásai a 2x² - 18 = 0 egyenletnek?',
        options: [
          'x = ±3',
          'x = 9',
          'x = ±9',
          'x₁ = 0 és x₂ = 3'
        ],
        correctAnswer: 0,
        explanation: '2x² = 18 ⟹ mindkét oldalt osztjuk 2-vel: x² = 9 ⟹ gyökvonás után x₁,₂ = ±3.'
      },
      {
        id: 'csq1-7',
        questionTypeBadge: 'Azonosság',
        question: 'Melyik algebrai azonosság fejezi ki az (x - 5)² kifejezés kibontott alakját?',
        options: [
          'x² - 10x + 25',
          'x² - 25',
          'x² - 5x + 25',
          'x² - 10x - 25'
        ],
        correctAnswer: 0,
        explanation: '(a - b)² = a² - 2ab + b². Behelyettesítve: x² - 2·x·5 + 5² = x² - 10x + 25.'
      },
      {
        id: 'csq1-8',
        questionTypeBadge: 'Hiányos egyenlet',
        question: 'Mennyi a gyöke az 5x² = 0 egyenletnek?',
        options: [
          'x = 0 (kettős gyök)',
          'x = 5',
          'x = ±5',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: '5-tel osztva: x² = 0, aminek egyetlen valós megoldása x = 0.'
      },
      {
        id: 'csq1-9',
        questionTypeBadge: 'Együtthatók',
        question: 'Melyek az a, b, c együtthatók értékei az 5x - 2x² + 7 = 0 egyenletben?',
        options: [
          'a = -2, b = 5, c = 7',
          'a = 5, b = -2, c = 7',
          'a = 2, b = 5, c = 7',
          'a = -2, b = 7, c = 5'
        ],
        correctAnswer: 0,
        explanation: 'Mindig a tagok fokszáma határozza meg az együtthatókat: a az x² szorzója (-2), b az x szorzója (+5), c a konstans szám (+7).'
      },
      {
        id: 'csq1-10',
        questionTypeBadge: 'Gyökvonás',
        question: 'Mi a megoldása az (x - 3)² = 0 egyenletnek?',
        options: [
          'x = 3 (kettős gyök)',
          'x = ±3',
          'x = -3',
          'x₁ = 0 és x₂ = 3'
        ],
        correctAnswer: 0,
        explanation: 'Egy kifejezés négyzete pontosan akkor 0, ha maga a kifejezés 0: x - 3 = 0 ⟹ x = 3.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: A teljes négyzetté kiegészítés alaplépései',
    subtitle: 'Felezés, a hiányzó saroktag megkeresése és az (x ± d)² - d² átalakítás.',
    range: '11–20. feladat',
    focus: 'Felezés és kompenzálás',
    questions: [
      {
        id: 'csq2-1',
        questionTypeBadge: 'Négyzetkiegészítés',
        question: 'Milyen számot kell hozzáadni az x² + 8x kifejezéshez, hogy teljes négyzetté alakuljon?',
        options: [
          '16-ot, mert (8/2)² = 4² = 16',
          '8-at, mert 8 fele 4',
          '64-et, mert 8² = 64',
          '4-et, mert 8 fele 4'
        ],
        correctAnswer: 0,
        explanation: 'Az x² + 2dx képlet szerint 2d = 8 ⟹ d = 4. A hiányzó saroktag d² = 4² = 16. Ekkor x² + 8x + 16 = (x + 4)².'
      },
      {
        id: 'csq2-2',
        questionTypeBadge: 'Átalakítás',
        question: 'Hogyan alakítható át teljes négyzetté az x² + 6x kifejezés levonással (kompenzálással)?',
        options: [
          '(x + 3)² - 9',
          '(x + 3)² + 9',
          '(x + 6)² - 36',
          '(x + 3)² - 6'
        ],
        correctAnswer: 0,
        explanation: 'A p = 6 feléből d = 3 adódik. Mivel (x + 3)² = x² + 6x + 9, a felesleges +9-et azonnal le kell vonni: x² + 6x = (x + 3)² - 9.'
      },
      {
        id: 'csq2-3',
        questionTypeBadge: 'Előjel-szabály',
        question: 'Hogyan alakítható át helyesen az x² - 10x kifejezés teljes négyzetté?',
        options: [
          '(x - 5)² - 25',
          '(x - 5)² + 25',
          '(x + 5)² - 25',
          '(x - 10)² - 100'
        ],
        correctAnswer: 0,
        explanation: 'p = -10 ⟹ d = -5. (x - 5)² = x² - 10x + 25. A keletkező +25-öt kompenzálni kell, ezért LEVONJUK: (x - 5)² - 25.'
      },
      {
        id: 'csq2-4',
        questionTypeBadge: 'Egyenlet átalakítása',
        question: 'Milyen alakra jutunk, ha az x² + 4x - 5 = 0 egyenletet négyzetté kiegészítjük?',
        options: [
          '(x + 2)² = 9',
          '(x + 2)² = 5',
          '(x + 2)² = 1',
          '(x + 4)² = 9'
        ],
        correctAnswer: 0,
        explanation: 'x² + 4x = (x + 2)² - 4. Behelyettesítve: (x + 2)² - 4 - 5 = 0 ⟹ (x + 2)² - 9 = 0 ⟹ (x + 2)² = 9.'
      },
      {
        id: 'csq2-5',
        questionTypeBadge: 'Gyökvonás',
        question: 'Mik a megoldásai az (x + 2)² = 9 egyenletnek?',
        options: [
          'x₁ = 1 és x₂ = -5',
          'x₁ = 3 és x₂ = -3',
          'x₁ = 5 és x₂ = -1',
          'Csak x = 1'
        ],
        correctAnswer: 0,
        explanation: 'Gyökvonás után: x + 2 = ±3. Ebből x₁ = -2 + 3 = 1, és x₂ = -2 - 3 = -5.'
      },
      {
        id: 'csq2-6',
        questionTypeBadge: 'Négyzetkiegészítés',
        question: 'Milyen számot kell hozzáadni az x² - 14x kifejezéshez, hogy teljes négyzet legyen?',
        options: [
          '49-et, mert (-7)² = 49',
          '-49-et',
          '14-et',
          '196-ot'
        ],
        correctAnswer: 0,
        explanation: 'A -14 fele -7. Ennek négyzete (-7)² = +49. Ekkor x² - 14x + 49 = (x - 7)².'
      },
      {
        id: 'csq2-7',
        questionTypeBadge: 'Átalakítás',
        question: 'Alakítsd át teljes négyzetté: x² + 2x - 8 = 0!',
        options: [
          '(x + 1)² = 9',
          '(x + 1)² = 8',
          '(x + 2)² = 9',
          '(x + 1)² = 7'
        ],
        correctAnswer: 0,
        explanation: 'x² + 2x = (x + 1)² - 1. Ekkor (x + 1)² - 1 - 8 = 0 ⟹ (x + 1)² - 9 = 0 ⟹ (x + 1)² = 9.'
      },
      {
        id: 'csq2-8',
        questionTypeBadge: 'Gyökmegoldás',
        question: 'Mik a gyökei az előző feladatbeli (x + 1)² = 9 egyenletnek?',
        options: [
          'x₁ = 2 és x₂ = -4',
          'x₁ = 4 és x₂ = -2',
          'x₁ = 3 és x₂ = -3',
          'x₁ = 8 és x₂ = -10'
        ],
        correctAnswer: 0,
        explanation: 'x + 1 = ±3 ⟹ x₁ = -1 + 3 = 2, és x₂ = -1 - 3 = -4.'
      },
      {
        id: 'csq2-9',
        questionTypeBadge: 'Tévhit elkerülése',
        question: 'Miért hibás az x² - 6x = (x - 3)² + 9 átalakítás?',
        options: [
          'Mert (x - 3)² kibontva x² - 6x + 9, így a +9-et kivonni kell, nem hozzáadni',
          'Mert a -6 fele +3 lenne',
          'Mert 3 négyzete nem 9, hanem 6',
          'Mert az x² előjele megfordul'
        ],
        correctAnswer: 0,
        explanation: 'Kibontva: (x - 3)² + 9 = x² - 6x + 9 + 9 = x² - 6x + 18, ami nem egyenlő az eredeti x² - 6x-szel! A helyes alak: (x - 3)² - 9.'
      },
      {
        id: 'csq2-10',
        questionTypeBadge: 'Átalakítás',
        question: 'Milyen alakra jutunk az x² - 12x + 36 = 0 egyenletnél?',
        options: [
          '(x - 6)² = 0',
          '(x - 6)² = 36',
          '(x + 6)² = 0',
          '(x - 12)² = 0'
        ],
        correctAnswer: 0,
        explanation: 'A kifejezés eleve egy teljes négyzet: x² - 12x + 36 = (x - 6)². Így az egyenlet (x - 6)² = 0, amiből x = 6 (kettős gyök).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett egyenletmegoldás és gyökök száma',
    subtitle: 'Két gyök, kettős gyök és valós gyök nélküli esetek diszkussziója és rendezett egyenletek.',
    range: '21–30. feladat',
    focus: 'Összetett feladatok és diszkusszió',
    questions: [
      {
        id: 'csq3-1',
        questionTypeBadge: 'Egyenletmegoldás',
        question: 'Oldd meg teljes négyzetté kiegészítéssel: x² - 6x + 5 = 0!',
        options: [
          'x₁ = 5 és x₂ = 1',
          'x₁ = -5 és x₂ = -1',
          'x₁ = 6 és x₂ = -1',
          'x₁ = 3 és x₂ = 2'
        ],
        correctAnswer: 0,
        explanation: 'x² - 6x = (x - 3)² - 9. Behelyettesítve: (x - 3)² - 9 + 5 = 0 ⟹ (x - 3)² = 4. Gyökvonás: x - 3 = ±2 ⟹ x₁ = 3 + 2 = 5, x₂ = 3 - 2 = 1.'
      },
      {
        id: 'csq3-2',
        questionTypeBadge: 'Diszkusszió',
        question: 'Mi mondható el az x² + 6x + 13 = 0 egyenlet megoldásairól a valós számok halmazán?',
        options: [
          'Nincs valós megoldása, mert (x + 3)² = -4 adódik',
          'Két valós megoldása van: x₁ = -1 és x₂ = -5',
          'Egyetlen valós megoldása van: x = -3',
          'Két valós megoldása van: x = ±√13'
        ],
        correctAnswer: 0,
        explanation: 'x² + 6x = (x + 3)² - 9. Behelyettesítve: (x + 3)² - 9 + 13 = 0 ⟹ (x + 3)² + 4 = 0 ⟹ (x + 3)² = -4. Mivel egy valós szám négyzete nem lehet negatív (-4 < 0), az egyenletnek nincs valós gyöke.'
      },
      {
        id: 'csq3-3',
        questionTypeBadge: 'Egyenletmegoldás',
        question: 'Mik a megoldásai az x² - 8x - 9 = 0 egyenletnek?',
        options: [
          'x₁ = 9 és x₂ = -1',
          'x₁ = -9 és x₂ = 1',
          'x₁ = 8 és x₂ = 1',
          'x₁ = 3 és x₂ = -3'
        ],
        correctAnswer: 0,
        explanation: 'x² - 8x = (x - 4)² - 16. (x - 4)² - 16 - 9 = 0 ⟹ (x - 4)² = 25 ⟹ x - 4 = ±5. Így x₁ = 4 + 5 = 9, és x₂ = 4 - 5 = -1.'
      },
      {
        id: 'csq3-4',
        questionTypeBadge: 'Kettős gyök',
        question: 'Melyik egyenletnek van pontosan egy (kettős) valós gyöke az alábbiak közül?',
        options: [
          'x² + 10x + 25 = 0',
          'x² + 10x - 25 = 0',
          'x² - 25 = 0',
          'x² + 25 = 0'
        ],
        correctAnswer: 0,
        explanation: 'Az x² + 10x + 25 kifejezés éppen (x + 5)², így az egyenlet (x + 5)² = 0, aminek egyetlen gyöke van: x = -5.'
      },
      {
        id: 'csq3-5',
        questionTypeBadge: 'Rendezés',
        question: 'Oldd meg a rendezendő egyenletet: (x - 2)(x + 4) = 7!',
        options: [
          'x₁ = 3 és x₂ = -5',
          'x₁ = 2 és x₂ = -4',
          'x₁ = 5 és x₂ = -3',
          'x₁ = 1 és x₂ = -7'
        ],
        correctAnswer: 0,
        explanation: 'Zárójelbontás: x² + 2x - 8 = 7. Nullára rendezve: x² + 2x - 15 = 0. Négyzetkiegészítés: (x + 1)² - 1 - 15 = 0 ⟹ (x + 1)² = 16 ⟹ x + 1 = ±4. Így x₁ = -1 + 4 = 3, és x₂ = -1 - 4 = -5.'
      },
      {
        id: 'csq3-6',
        questionTypeBadge: 'Törtes gyök',
        question: 'Mik a megoldásai az (x - 1)² = 2 egyenletnek a valós számok körében?',
        options: [
          'x₁ = 1 + √2 és x₂ = 1 - √2',
          'x = 1 ± 2',
          'x₁ = 3 és x₂ = -1',
          'Nincs valós megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Közvetlen gyökvonással: x - 1 = ±√2. Mindkét oldalhoz 1-et adva: x = 1 ± √2, azaz x₁ = 1 + √2 és x₂ = 1 - √2.'
      },
      {
        id: 'csq3-7',
        questionTypeBadge: 'Páratlan együttható',
        question: 'Hogyan alakítható át törtekkel az x² + 3x kifejezés teljes négyzetté?',
        options: [
          '(x + 1,5)² - 2,25',
          '(x + 3)² - 9',
          '(x + 1,5)² + 2,25',
          '(x + 3/2)² - 3/4'
        ],
        correctAnswer: 0,
        explanation: '3 fele 1,5 (vagy 3/2). Ennek négyzete 1,5² = 2,25 (vagy 9/4). Ezért x² + 3x = (x + 1,5)² - 2,25.'
      },
      {
        id: 'csq3-8',
        questionTypeBadge: 'Egyenletmegoldás',
        question: 'Oldd meg: x² + 3x - 10 = 0!',
        options: [
          'x₁ = 2 és x₂ = -5',
          'x₁ = -2 és x₂ = 5',
          'x₁ = 1 és x₂ = -10',
          'x₁ = 3 és x₂ = -10'
        ],
        correctAnswer: 0,
        explanation: '(x + 1,5)² - 2,25 - 10 = 0 ⟹ (x + 1,5)² = 12,25. Mivel √12,25 = 3,5, ezért x + 1,5 = ±3,5. Így x₁ = -1,5 + 3,5 = 2, és x₂ = -1,5 - 3,5 = -5.'
      },
      {
        id: 'csq3-9',
        questionTypeBadge: 'Geometriai alkalmazás',
        question: 'Egy négyzet egyik oldalát 4 cm-rel növeljük, a másikat 4 cm-rel csökkentjük, így a keletkező téglalap területe 33 cm² lesz. Mekkora volt az eredeti négyzet oldala (x)?',
        options: [
          'x = 7 cm',
          'x = 8 cm',
          'x = 6 cm',
          'x = 9 cm'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap oldalai (x + 4) és (x - 4). Területe: (x + 4)(x - 4) = x² - 16 = 33 ⟹ x² = 49 ⟹ x = 7 (mivel a hosszúság pozitív, x > 0).'
      },
      {
        id: 'csq3-10',
        questionTypeBadge: 'Szélsőérték / Minimum',
        question: 'Melyik x értéknél veszi fel az f(x) = x² - 6x + 14 kifejezés a legkisebb értékét (minimumát)?',
        options: [
          'x = 3-nál, a minimum érték pedig 5',
          'x = -3-nál, a minimum érték pedig 14',
          'x = 6-nál, a minimum érték pedig 0',
          'x = 0-nál, a minimum érték pedig 14'
        ],
        correctAnswer: 0,
        explanation: 'Teljes négyzetté alakítva: x² - 6x + 14 = (x - 3)² - 9 + 14 = (x - 3)² + 5. Mivel (x - 3)² ≥ 0 minden valós x-re, legkisebb értékét akkor veszi fel, amikor (x - 3)² = 0, azaz x = 3 esetén. Ekkor a kifejezés értéke 0 + 5 = 5.'
      }
    ]
  }
};

export const CompletingSquareQuiz: React.FC<CompletingSquareQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Teljes négyzetté kiegészítés"
      subtitle="Gyakorold a hiányos másodfokú egyenletek megoldását, a négyzetté alakítás lépéseit és a valós gyökök kiszámítását!"
      themeColor="amber"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • GYAKORLÁS"
      topicTitle="V. Másodfokú egyenletek"
      pdfFilename="10_osztaly_masodfoku_egyenletek_teljes_negyzet_gyakorlo.pdf"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={CompletingSquareMatcher}
      sorterComponent={CompletingSquareSorter}
    />
  );
};

