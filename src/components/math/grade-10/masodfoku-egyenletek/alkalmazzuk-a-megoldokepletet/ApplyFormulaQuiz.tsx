import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ApplyFormulaMatcher } from './ApplyFormulaMatcher';
import { ApplyFormulaSorter } from './ApplyFormulaSorter';
import {
  EquationSimplificationTreeSvg,
  FractionalEquationCheckSvg,
  RootsSimplificationTreeSvg,
  VieteVerificationCardSvg
} from './ApplyFormulaFigures';

interface ApplyFormulaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Kanonikus alakra rendezés',
    description: '1. Zárójelek felbontása ⟶ 2. Azonos nemű tagok összevonása ⟶ 3. Minden tag egy oldalra: ax² + bx + c = 0 ⟶ 4. Egyszerűsítés közös osztóval.',
    note: 'Soha ne kezdj behelyettesíteni a megoldóképletbe, amíg a jobb oldalon nem pontosan 0 áll!',
    color: 'from-rose-500 to-red-600',
    figure: <EquationSimplificationTreeSvg size={220} />
  },
  {
    title: 'Törtes egyenletek és kikötések',
    description: '1. Kikötés: Nevező ≠ 0 ⟶ 2. Beszorzás közös nevezővel ⟶ 3. Másodfokú egyenlet megoldása ⟶ 4. Hamis gyökök azonnali kizárása a kikötés alapján.',
    note: 'A kikötést mindig a legelső sorban rögzítsd, még a törtek eltüntetése előtt!',
    color: 'from-blue-500 to-cyan-600',
    figure: <FractionalEquationCheckSvg size={220} />
  },
  {
    title: 'Irracionális gyökök egyszerűsítése',
    description: '√72 = √(36 · 2) = 6√2. A számlálóból közös tényezőt emelünk ki: (6 ± 6√2)/4 = 2(3 ± 3√2)/4 = (3 ± 3√2)/2. Pontos zárt alak kerekítés nélkül.',
    note: 'Tilos részlegesen egyszerűsíteni: a törtvonal a számláló minden tagját osztja!',
    color: 'from-purple-500 to-indigo-600',
    figure: <RootsSimplificationTreeSvg size={220} />
  },
  {
    title: 'A Viète-formulák (Önellenőrzés)',
    description: 'x₁ + x₂ = -b / a és x₁ · x₂ = c / a. Normált egyenletnél (x² + px + q = 0): x₁ + x₂ = -p és x₁ · x₂ = q.',
    note: 'A leggyorsabb mód a gyökök ellenőrzésére: a gyökök összeadásával és szorzásával azonnal ellenőrizhető a dolgozat.',
    color: 'from-amber-500 to-orange-600',
    figure: <VieteVerificationCardSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Zárójelbontás, összevonás és egyszerűsítés',
    subtitle: 'Bonyolultabb kifejezések 0-ra rendezése és az egyenlet egyszerűsítése közös osztóval.',
    range: '1–10. feladat',
    focus: 'Kanonikus alak és műveleti lépések',
    questions: [
      {
        id: 'afq1-1',
        questionTypeBadge: 'Zárójelbontás',
        question: 'Mi a helyes első lépés az (x - 3)(x + 2) = 14 egyenlet megoldásakor?',
        options: [
          'A zárójelek felbontása és 0-ra rendezés: x² - x - 20 = 0',
          'x - 3 = 14 vagy x + 2 = 14',
          'Azonnal a = 1, b = -3, c = 2 behelyettesítése',
          'Mindkét oldal osztása 14-gyel'
        ],
        correctAnswer: 0,
        explanation: 'A szorzat-nulla tulajdonság CSAK akkor működik, ha a jobb oldalon 0 áll! Mivel itt 14 áll, fel kell bontani a zárójeleket: x² + 2x - 3x - 6 = 14 ⟹ x² - x - 6 = 14. Ebből 14-et kivonva kapjuk a 0-ra rendezett alakot: x² - x - 20 = 0.'
      },
      {
        id: 'afq1-2',
        questionTypeBadge: 'Kéttagú négyzet',
        question: 'Mi a 0-ra rendezett alakja a (2x - 1)² = x + 5 egyenletnek?',
        options: [
          '4x² - 5x - 4 = 0',
          '4x² - 3x - 4 = 0',
          '4x² - 5x + 6 = 0',
          '2x² - x - 4 = 0'
        ],
        correctAnswer: 0,
        explanation: '(2x - 1)² kifejtése: 4x² - 4x + 1. Az egyenlet: 4x² - 4x + 1 = x + 5. Mindkét oldalból kivonva x-et és 5-öt: 4x² - 5x - 4 = 0.'
      },
      {
        id: 'afq1-3',
        questionTypeBadge: 'Egyszerűsítés',
        question: 'Ha egy egyenlet 6x² - 18x - 24 = 0, mit érdemes tenni a megoldóképlet alkalmazása előtt?',
        options: [
          'Mindkét oldalt elosztani 6-tal: x² - 3x - 4 = 0',
          'Azonnal a = 6, b = -18, c = -24 számokkal dolgozni',
          'Megszorozni 6-tal mindkét oldalt',
          'Kivonni 24-et mindkét oldalból'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mind a 6, mind a -18, mind a -24 osztható 6-tal, érdemes leosztani az egyenletet 6-tal. Az x² - 3x - 4 = 0 egyenletből sokkal kisebb számokkal, gyorsabban és hibátlanul számolhatunk: D = 9 + 16 = 25.'
      },
      {
        id: 'afq1-4',
        questionTypeBadge: 'Ekvivalencia',
        question: 'Miért nem változnak meg az egyenlet gyökei, ha mindkét oldalt elosztjuk egy 0-tól különböző számmal?',
        options: [
          'Mert a 0-tól különböző számmal való szorzás vagy osztás ekvivalens átalakítás (a mérlegelv szerint a megoldáshalmaz nem változik)',
          'Mert a jobb oldalon 0 van, és 0 osztva bármivel 0 marad',
          'Mert a másodfokú egyenletnek mindig fix gyökei vannak',
          'Mert a diszkrimináns ettől megnő'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlet mindkét oldalát tetszőleges 0-tól különböző valós számmal oszthatjuk vagy szorozhatjuk; ez ekvivalens átalakítás, vagyis az egyenlet gyökeinek halmaza nem változik meg.'
      },
      {
        id: 'afq1-5',
        questionTypeBadge: 'Átrendezés',
        question: 'Mi a helyes 0-ra rendezett alakja az x(3x - 5) = 2 egyenletnek?',
        options: [
          '3x² - 5x - 2 = 0',
          '3x² - 5x + 2 = 0',
          '3x² - 5x = 2',
          '3x - 5x - 2 = 0'
        ],
        correctAnswer: 0,
        explanation: 'Zárójelet bontunk: 3x² - 5x = 2. Mindkét oldalból kivonunk 2-t: 3x² - 5x - 2 = 0.'
      },
      {
        id: 'afq1-6',
        questionTypeBadge: 'Számolás',
        question: 'Mik a gyökei az x² - x - 20 = 0 egyenletnek?',
        options: [
          'x₁ = 5 és x₂ = -4',
          'x₁ = -5 és x₂ = 4',
          'x₁ = 10 és x₂ = -2',
          'x₁ = 20 és x₂ = 1'
        ],
        correctAnswer: 0,
        explanation: 'D = (-1)² - 4 · 1 · (-20) = 1 + 80 = 81. √81 = 9. x = (1 ± 9) / 2. Így x₁ = 10/2 = 5 és x₂ = -8/2 = -4.'
      },
      {
        id: 'afq1-7',
        questionTypeBadge: 'Hiányos alakra egyszerűsödés',
        question: 'Mi a 0-ra rendezett alakja az (x + 3)² = 6x + 13 egyenletnek?',
        options: [
          'x² - 4 = 0',
          'x² + 12x - 4 = 0',
          'x² - 6x - 4 = 0',
          'x² + 22 = 0'
        ],
        correctAnswer: 0,
        explanation: '(x + 3)² = x² + 6x + 9. Az egyenlet: x² + 6x + 9 = 6x + 13. Mindkét oldalból kivonva 6x-et és 13-at: x² - 4 = 0 (tiszta négyzetes egyenlet, gyökei x = ±2).'
      },
      {
        id: 'afq1-8',
        questionTypeBadge: 'Közös osztó',
        question: 'Ha az 5x² + 15x - 50 = 0 egyenletet elosztjuk 5-tel, milyen normált egyenletet kapunk?',
        options: [
          'x² + 3x - 10 = 0',
          'x² + 15x - 50 = 0',
          'x² + 3x - 50 = 0',
          '5(x² + 3x - 10) = 5'
        ],
        correctAnswer: 0,
        explanation: 'Minden tagot osztunk 5-tel: 5x²/5 = x², 15x/5 = 3x, -50/5 = -10, 0/5 = 0. Így az egyenlet: x² + 3x - 10 = 0.'
      },
      {
        id: 'afq1-9',
        questionTypeBadge: 'Tipikus hiba',
        question: 'Miért súlyos hiba az x(x - 4) = 5 egyenletnél azt írni, hogy x = 5 vagy x - 4 = 5?',
        options: [
          'Mert a szorzat-tényező bontás csak akkor garantálja az egyik tényező nullaságát, ha a szorzat értéke 0!',
          'Mert az x nem lehet egyenlő 5-tel',
          'Mert zárójeles kifejezést nem szabad szorzatnak tekinteni',
          'Mert az 5 nem páros szám'
        ],
        correctAnswer: 0,
        explanation: 'Egy szorzat csak akkor 0, ha valamelyik tényezője 0. Ha a szorzat értéke 5, végtelen sok számpár szorzata lehet 5 (pl. 1·5, 2·2,5, 10·0,5...). Ezért kötelező zárójelet bontani és 0-ra rendezni: x² - 4x - 5 = 0.'
      },
      {
        id: 'afq1-10',
        questionTypeBadge: 'Gyökök',
        question: 'Mik a gyökei a 2x² - 8x = 0 egyenletnek?',
        options: [
          'x₁ = 0 és x₂ = 4',
          'Csak x = 4',
          'x₁ = 2 és x₂ = -2',
          'x₁ = 0 és x₂ = -4'
        ],
        correctAnswer: 0,
        explanation: '2-vel osztva: x² - 4x = 0 ⟹ x(x - 4) = 0. Egy szorzat akkor 0, ha valamelyik tényezője 0: x₁ = 0 vagy x₂ = 4.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtes egyenletek és kikötések',
    subtitle: 'Értelmezési tartomány vizsgálata, beszorzás közös nevezővel és a hamis gyökök kizárása.',
    range: '11–20. feladat',
    focus: 'Törtes egyenletek, kikötés és hamis gyökök',
    questions: [
      {
        id: 'afq2-1',
        questionTypeBadge: 'Kikötés fontossága',
        question: 'Miért kötelező azonnal kikötést tenni a törtes másodfokú egyenleteknél?',
        options: [
          'Mert a törtek nevezője soha nem lehet 0, és a beszorzáskor olyan hamis gyökök keletkezhetnek, amelyek tiltottak az eredeti egyenletben',
          'Mert a számológép nem tud törteket kezelni',
          'Mert a diszkrimináns csak kikötéssel számolható ki',
          'Mert a törtekkel való szorzás megváltoztatja az egyenlet fokszámát'
        ],
        correctAnswer: 0,
        explanation: 'Nullával való osztás a matematikában nincs értelmezve. Amikor beszorzunk az ismeretlent tartalmazó nevezővel, bővítjük az alaphalmazt, így olyan gyökök is bekerülhetnek, ahol az eredeti tört nem értelmezhető (hamis gyök).'
      },
      {
        id: 'afq2-2',
        questionTypeBadge: 'Kikötés meghatározása',
        question: 'Mi a kikötés az (x² - 4) / (x - 2) = 0 egyenletnél?',
        options: [
          'x ≠ 2 (mert a nevező x - 2 nem lehet 0)',
          'x ≠ -2',
          'x ≠ ±2',
          'Nincs kikötés, mert a számláló 0'
        ],
        correctAnswer: 0,
        explanation: 'A nevezőben x - 2 szerepel, így x - 2 ≠ 0 ⟹ x ≠ 2. Ez a feladat értelmezési tartományának kötelező feltétele.'
      },
      {
        id: 'afq2-3',
        questionTypeBadge: 'Hamis gyök felismerése',
        question: 'Mik az (x² - 4) / (x - 2) = 0 egyenlet valós megoldásai?',
        options: [
          'Csak x = -2 (mivel az x = 2 hamis gyök a kikötés miatt)',
          'x₁ = 2 és x₂ = -2',
          'Csak x = 2',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        explanation: 'Egy tört akkor 0, ha a számlálója 0: x² - 4 = 0 ⟹ x = ±2. Viszont a kikötés szerint x ≠ 2, így az x = 2 nem lehet megoldás! Az egyetlen valós gyök: x = -2.'
      },
      {
        id: 'afq2-4',
        questionTypeBadge: 'Közös nevező',
        question: 'Hogyan tüntetjük el a törteket az x/2 + 3/x = 7/2 egyenletben?',
        options: [
          'Mindkét oldalt megszorozzuk a közös nevezővel: 2x-szel (kikötés: x ≠ 0)',
          'Összeadjuk a nevezőket: 2 + x',
          'Keresztbe szorzunk',
          'Levonunk 7/2-et beszorzás nélkül'
        ],
        correctAnswer: 0,
        explanation: 'A nevezők 2 és x. A legkisebb közös nevező a 2x. Kikötjük, hogy x ≠ 0, majd mindkét oldalt megszorozzuk 2x-szel.'
      },
      {
        id: 'afq2-5',
        questionTypeBadge: 'Egyenlet levezetése',
        question: 'Milyen másodfokú egyenletet kapunk az x/2 + 3/x = 7/2 egyenlet 2x-szel való beszorzása és 0-ra rendezése után?',
        options: [
          'x² - 7x + 6 = 0',
          'x² + 7x + 6 = 0',
          'x² - 7x - 6 = 0',
          '2x² - 7x + 3 = 0'
        ],
        correctAnswer: 0,
        explanation: '(x/2) · 2x = x²; (3/x) · 2x = 6; (7/2) · 2x = 7x. Az egyenlet: x² + 6 = 7x ⟹ x² - 7x + 6 = 0.'
      },
      {
        id: 'afq2-6',
        questionTypeBadge: 'Gyökök ellenőrzése',
        question: 'Mik az x² - 7x + 6 = 0 egyenlet gyökei, és elfogadhatók-e a kikötés (x ≠ 0) mellett?',
        options: [
          'x₁ = 6 és x₂ = 1, és mivel egyik sem 0, mindkettő valós megoldás',
          'x₁ = 7 és x₂ = -1',
          'Csak x = 6, az 1 hamis gyök',
          'Nincs valós gyök'
        ],
        correctAnswer: 0,
        explanation: 'D = 49 - 24 = 25. x = (7 ± 5) / 2 ⟹ x₁ = 6, x₂ = 1. Mivel 6 ≠ 0 és 1 ≠ 0, mindkét gyök kielégíti a kikötést és az eredeti egyenletet is.'
      },
      {
        id: 'afq2-7',
        questionTypeBadge: 'Kikötés több nevezőnél',
        question: 'Mi a kikötés az 5/(x - 3) + 2/(x + 1) = 1 egyenletnél?',
        options: [
          'x ≠ 3 és x ≠ -1',
          'Csak x ≠ 3',
          'x ≠ 0',
          'x ≠ 1 és x ≠ -3'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenletben két különböző nevező szerepel: x - 3 ≠ 0 ⟹ x ≠ 3, és x + 1 ≠ 0 ⟹ x ≠ -1. Mindkét feltételnek egyszerre kell teljesülnie.'
      },
      {
        id: 'afq2-8',
        questionTypeBadge: 'Hamis gyök fogalma',
        question: 'Mi a pontos definíciója a hamis gyöknek (idegen gyöknek)?',
        options: [
          'Olyan szám, amely kielégíti az algebrai átalakítások után kapott egyenletet, de nem eleme az eredeti egyenlet értelmezési tartományának (vagy nem elégíti ki azt)',
          'Bármilyen negatív számú megoldás',
          'Olyan gyök, amit elszámoltunk a megoldóképletben',
          'Az a gyök, amely nem egész szám'
        ],
        correctAnswer: 0,
        explanation: 'Hamis gyök akkor keletkezik, ha az átalakítások (pl. ismeretlennel való beszorzás vagy négyzetre emelés) nem ekvivalensek. Az ilyen gyök az átalakított egyenletet igazzá teszi, de az eredetiben értelmetlen vagy ellentmondáshoz vezet.'
      },
      {
        id: 'afq2-9',
        questionTypeBadge: 'Szűréses feladat',
        question: 'Mi az (x² - 5x + 6) / (x - 3) = 0 egyenlet megoldáshalmaza?',
        options: [
          '{2} (csak a 2, mert az x = 3 esetén a nevező 0 lenne)',
          '{2; 3}',
          '{3}',
          'Üres halmaz (∅)'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x - 3 ≠ 0 ⟹ x ≠ 3. A számláló nullára: x² - 5x + 6 = 0 ⟹ x₁ = 2, x₂ = 3. Mivel a 3 tiltott a kikötés miatt, a megoldáshalmaz kizárólag a {2}.'
      },
      {
        id: 'afq2-10',
        questionTypeBadge: 'Törtes azonosság',
        question: 'Hogyan oldható meg villámgyorsan a (2x - 4) / (x - 2) = x egyenlet?',
        options: [
          'Kikötés: x ≠ 2. A számlálóból 2-t kiemelve: 2(x - 2)/(x - 2) = 2, így 2 = x. Mivel a kapott x = 2 tiltott a kikötés miatt, az egyenletnek NINCS megoldása!',
          'x = 2 az egyetlen megoldás',
          'x = 0 és x = 2',
          'x = 4'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x ≠ 2. Egyszerűsítve (x - 2)-vel: 2 = x ⟹ x = 2 adódik. De a kikötés éppen tiltja az x = 2 értéket! Ezért az egyenletnek egyetlen valós megoldása sincs: x ∈ ∅.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Irracionális egyszerűsítés és Viète-formulák',
    subtitle: 'Négyzetgyökök kiemelése és az önellenőrzés Viète-összefüggéseinek mesterfogásai.',
    range: '21–30. feladat',
    focus: 'Irracionális gyökök, Viète-formulák és önellenőrzés',
    questions: [
      {
        id: 'afq3-1',
        questionTypeBadge: 'Viète-összeg',
        question: 'Mennyi a gyökök összege (x₁ + x₂) az x² - 8x + 12 = 0 egyenletnél a Viète-formula szerint?',
        options: [
          '8, mert x₁ + x₂ = -(-8)/1 = 8',
          '-8',
          '12',
          '4'
        ],
        correctAnswer: 0,
        explanation: 'A Viète-formula szerint ax² + bx + c = 0 egyenletnél a gyökök összege x₁ + x₂ = -b / a. Itt -(-8)/1 = 8. (Valóban: x₁ = 2, x₂ = 6, és 2 + 6 = 8).'
      },
      {
        id: 'afq3-2',
        questionTypeBadge: 'Viète-szorzat',
        question: 'Mennyi a gyökök szorzata (x₁ · x₂) az x² - 8x + 12 = 0 egyenletnél?',
        options: [
          '12, mert x₁ · x₂ = c/a = 12/1 = 12',
          '-12',
          '8',
          '6'
        ],
        correctAnswer: 0,
        explanation: 'A Viète-formula szerint a gyökök szorzata x₁ · x₂ = c / a. Itt c = 12 és a = 1, így 12/1 = 12. (Valóban: 2 · 6 = 12).'
      },
      {
        id: 'afq3-3',
        questionTypeBadge: 'Egyenlet felírása',
        question: 'Melyik az a normált másodfokú egyenlet, amelynek gyökei x₁ = 3 és x₂ = -5?',
        options: [
          'x² + 2x - 15 = 0',
          'x² - 2x - 15 = 0',
          'x² - 8x - 15 = 0',
          'x² + 2x + 15 = 0'
        ],
        correctAnswer: 0,
        explanation: 'A gyökök összege: 3 + (-5) = -2, így -p = -2 ⟹ p = +2. A gyökök szorzata: 3 · (-5) = -15 = q. A normált egyenlet: x² + px + q = x² + 2x - 15 = 0.'
      },
      {
        id: 'afq3-4',
        questionTypeBadge: 'Irracionális egyszerűsítés',
        question: 'Hogyan egyszerűsíthető pontos zárt alakra a (6 ± √72) / 4 kifejezés?',
        options: [
          '(3 ± 3√2) / 2',
          '(3 ± √72) / 2',
          '(6 ± 6√2) / 4 kerekítve 3,21',
          '3 ± 3√2'
        ],
        correctAnswer: 0,
        explanation: '√72 = √(36 · 2) = 6√2. A tört: (6 ± 6√2) / 4. A számlálóból 2-t kiemelve: 2(3 ± 3√2) / 4. A 2-vel egyszerűsítve: (3 ± 3√2) / 2.'
      },
      {
        id: 'afq3-5',
        questionTypeBadge: 'Kiemelés a gyökből',
        question: 'Mennyi a (10 ± √20) / 2 tört legegyszerűbb pontos alakja?',
        options: [
          '5 ± √5',
          '5 ± √10',
          '5 ± 2√5',
          '10 ± √5'
        ],
        correctAnswer: 0,
        explanation: '√20 = √(4 · 5) = 2√5. A tört: (10 ± 2√5) / 2. Mindkét tagot elosztva 2-vel: 10/2 ± (2√5)/2 = 5 ± √5.'
      },
      {
        id: 'afq3-6',
        questionTypeBadge: 'Konjugált gyökök',
        question: 'Mennyi a gyökök összege és szorzata, ha x₁ = 1 + √3 és x₂ = 1 - √3?',
        options: [
          'Összeg = 2, Szorzat = -2',
          'Összeg = 2, Szorzat = 4',
          'Összeg = 2√3, Szorzat = -2',
          'Összeg = 0, Szorzat = -3'
        ],
        correctAnswer: 0,
        explanation: 'Összeg: (1 + √3) + (1 - √3) = 2. Szorzat: a nevezetes azonosság szerint (a + b)(a - b) = a² - b² ⟹ 1² - (√3)² = 1 - 3 = -2.'
      },
      {
        id: 'afq3-7',
        questionTypeBadge: 'Részleges egyszerűsítési hiba',
        question: 'Miért hibás a következő lépés: (4 ± √12) / 2 = 2 ± √12?',
        options: [
          'Mert az összeadás/kivonás miatt a nevező a számláló MINDEN tagját osztja, nem csak a 4-et!',
          'Mert a 4 nem osztható 2-vel',
          'Mert a √12 negatív szám',
          'Mert a ± jel megakadályozza az egyszerűsítést'
        ],
        correctAnswer: 0,
        explanation: 'Törtet csak úgy szabad egyszerűsíteni, ha a számláló minden tagját elosztjuk (vagy előbb kiemelünk). Helyesen: √12 = 2√3 ⟹ (4 ± 2√3)/2 = 2 ± √3.'
      },
      {
        id: 'afq3-8',
        questionTypeBadge: 'Nem normált Viète',
        question: 'Mennyi a 2x² - 7x + 3 = 0 egyenlet gyökeinek összege és szorzata?',
        options: [
          'Összeg = 7/2, Szorzat = 3/2',
          'Összeg = -7, Szorzat = 3',
          'Összeg = 7, Szorzat = 3',
          'Összeg = 3,5, Szorzat = -1,5'
        ],
        correctAnswer: 0,
        explanation: 'Nem normált egyenletnél az a = 2 együtthatóval is osztani kell: x₁ + x₂ = -b/a = -(-7)/2 = 7/2, és x₁ · x₂ = c/a = 3/2.'
      },
      {
        id: 'afq3-9',
        questionTypeBadge: 'Előjel-vizsgálat',
        question: 'Ha egy másodfokú egyenlet diszkriminánsa pozitív (D > 0), és a gyökök szorzata pozitív (c/a > 0), míg összege negatív (-b/a < 0), mit tudunk a gyökökről?',
        options: [
          'Mindkét gyök szigorúan negatív valós szám',
          'Mindkét gyök pozitív szám',
          'Egyik gyök pozitív, a másik negatív',
          'A gyökök egyenlőek'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a szorzat pozitív (x₁ · x₂ > 0), a két gyök azonos előjelű. Mivel az összegük negatív (x₁ + x₂ < 0), mindkét gyöknek kötelezően negatívnak kell lennie!'
      },
      {
        id: 'afq3-10',
        questionTypeBadge: 'Önellenőrzés haszna',
        question: 'Hogyan biztosítja a Viète-formula a hibátlan dolgozatot?',
        options: [
          'Ha a képlettel kiszámított x₁ és x₂ értékeket összeadva és összeszorozva pontosan visszakapjuk a -b/a és c/a értékeket, biztosak lehetünk abban, hogy a számolás hibátlan',
          'Kiváltja a megoldóképletet minden feladatban',
          'Automatikusan kijavítja a számológép hibáit',
          'Csak egész gyököknél használható'
        ],
        correctAnswer: 0,
        explanation: 'A Viète-formulák két független egyenletet adnak a gyökökre. Ha a kapott gyökök mind az összeg-, mind a szorzat-teszten átmennek, a megoldás matematikailag garantáltan helyes, így nem veszítünk pontot számolási hiba miatt.'
      }
    ]
  }
};

export const ApplyFormulaQuiz: React.FC<ApplyFormulaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="alkalmazzuk-a-megoldokepletet"
      topicTitle="Alkalmazzuk a megoldóképletet!"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      renderMatcher={(level, onNext, onRules, onB) => (
        <ApplyFormulaMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules, onB) => (
        <ApplyFormulaSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

export default ApplyFormulaQuiz;

