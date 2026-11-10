import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ComprehensiveReviewMatcher } from './ComprehensiveReviewMatcher';
import { ComprehensiveReviewSorter } from './ComprehensiveReviewSorter';
import {
  ChapterRoadmapSvg,
  EquationTaxonomySvg,
  ComprehensiveDiscriminantSvg,
  MasterProblemSolvingPipelineSvg
} from './ComprehensiveReviewFigures';

interface ComprehensiveReviewQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A fejezet átfogó térképe',
    description: '1. Hiányos egyenletek (kiemelés, gyökvonás) ⟶ 2. Teljes négyzetté kiegészítés ⟶ 3. Megoldóképlet és Diszkrimináns ⟶ 4. Visszavezethető egyenletek ⟶ 5. Szöveges feladatok.',
    note: 'Minden típus egyetlen közös alapra épül: az ax² + bx + c = 0 kanonikus alakra.',
    color: 'from-indigo-500 to-purple-600',
    figure: <ChapterRoadmapSvg size={220} />
  },
  {
    title: 'Megoldási döntési fa',
    description: 'c = 0 ⟹ Kiemelés x-szel (x₁=0). b = 0 ⟹ Közvetlen gyökvonás (x² = -c/a). Teljes egyenlet ⟹ Megoldóképlet D = b² - 4ac kiszámításával.',
    note: 'Hiányos egyenletnél soha ne használd a hosszadalmas megoldóképletet!',
    color: 'from-violet-500 to-pink-600',
    figure: <EquationTaxonomySvg size={220} />
  },
  {
    title: 'A diszkrimináns szentháromsága',
    description: 'D > 0: 2 különböző valós gyök (a parabola kétszer metszi az x-tengelyt). D = 0: 1 kettős gyök (érinti a tengelyt). D < 0: nincs valós gyök (lebeg a tengely felett).',
    note: 'Ha a és c különböző előjelű (ac < 0), akkor D mindig pozitív, így biztosan van 2 valós gyök.',
    color: 'from-emerald-500 to-teal-600',
    figure: <ComprehensiveDiscriminantSvg size={220} />
  },
  {
    title: 'Szöveges feladatok csővezetéke',
    description: '1. Változó & Értelmezési tartomány (x > 0) ⟶ 2. Egyenlet felírása ⟶ 3. Algebrai megoldás ⟶ 4. Ellenőrzés és hamis gyökök kizárása ⟶ 5. Szöveges válasz mértékegységgel.',
    note: 'Negatív oldalhossz, sebesség vagy személyszám fizikai képtelenség, azonnal elvetendő!',
    color: 'from-amber-500 to-orange-600',
    figure: <MasterProblemSolvingPipelineSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és hiányos egyenletek',
    subtitle: 'Másodfokú egyenletek azonosítása, hiányos típusok, azonosságok és a diszkrimináns alapjai.',
    range: '1–10. feladat',
    focus: 'Alaptípusok, kiemelés, közvetlen gyökvonás, D előjele',
    questions: [
      {
        id: 'crq1-1',
        question: 'Mi a feltétele annak, hogy az ax² + bx + c = 0 egyenlet valóban másodfokú legyen?',
        options: ['a ≠ 0', 'b ≠ 0', 'c ≠ 0', 'D > 0'],
        correctAnswer: 0,
        explanation: 'Ha az "a" főegyüttható 0 lenne, a négyzetes tag eltűnne, és az egyenlet legfeljebb elsőfokú (lineáris) lenne. Ezért a másodfokú definíciójának alappillére: a ≠ 0.'
      },
      {
        id: 'crq1-2',
        question: 'Melyek a gyökei a 3x² - 12x = 0 hiányos másodfokú egyenletnek?',
        options: ['x₁ = 0 és x₂ = 4', 'x = 4 (egyetlen gyök)', 'x = ±2', 'x₁ = 0 és x₂ = -4'],
        correctAnswer: 0,
        explanation: 'Kiemeléssel: 3x(x - 4) = 0. Egy szorzat akkor 0, ha valamelyik tényezője 0. Így 3x = 0 ⟹ x₁ = 0, vagy x - 4 = 0 ⟹ x₂ = 4. Tilos x-szel leosztani!'
      },
      {
        id: 'crq1-3',
        question: 'Melyek a megoldásai a 2x² - 50 = 0 egyenletnek a valós számok körében?',
        options: ['x = ±5', 'x = 5', 'x = 25', 'Nincs valós megoldása'],
        correctAnswer: 0,
        explanation: 'Átrendezve: 2x² = 50 ⟹ x² = 25. Gyökvonás után x = ±√25 = ±5. Mindkét szám négyzete 25!'
      },
      {
        id: 'crq1-4',
        question: 'Hány valós megoldása van a 4x² + 36 = 0 egyenletnek?',
        options: ['0 (nincs valós megoldás, M = ∅)', '1', '2 (x = ±3)', 'Végtelen sok'],
        correctAnswer: 0,
        explanation: '4x² = -36 ⟹ x² = -9. A valós számok körében egyetlen valós szám négyzete sem lehet negatív, így nincs valós gyök.'
      },
      {
        id: 'crq1-5',
        question: 'Mennyi a diszkriminánsa az x² - 6x + 9 = 0 egyenletnek?',
        options: ['0', '36', '-36', '72'],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac = (-6)² - 4 · 1 · 9 = 36 - 36 = 0. Mivel D = 0, egyetlen valós (kettős) gyöke van: x = 3.'
      },
      {
        id: 'crq1-6',
        question: 'Melyik azonosság alapján alakítható teljes négyzetté az x² + 10x kifejezés?',
        options: ['(x + 5)² - 25', '(x + 5)² + 25', '(x + 10)² - 100', '(x + 5)² - 10'],
        correctAnswer: 0,
        explanation: 'A lineáris tag együtthatóját felezzük: 10/2 = 5. (x + 5)² = x² + 10x + 25, így 25-öt le kell vonnunk a kompenzáláshoz: (x + 5)² - 25.'
      },
      {
        id: 'crq1-7',
        question: 'Hány pontban metszi az x-tengelyt az f(x) = x² - 4x + 7 függvény parabolája?',
        options: ['0 pontban (nem metszi a tengelyt)', '1 pontban', '2 pontban', '3 pontban'],
        correctAnswer: 0,
        explanation: 'D = (-4)² - 4 · 1 · 7 = 16 - 28 = -12 < 0. Mivel a diszkrimináns negatív, az egyenletnek nincs valós gyöke, így a parabola lebeg az x-tengely felett.'
      },
      {
        id: 'crq1-8',
        question: 'Mi a helyes szorzattá alakított alakja az x² - 5x + 6 másodfokú kifejezésnek?',
        options: ['(x - 2)(x - 3)', '(x + 2)(x + 3)', '(x - 1)(x - 6)', '(x + 1)(x - 6)'],
        correctAnswer: 0,
        explanation: 'Az egyenlet gyökei x₁ = 2 és x₂ = 3. A gyöktényezős alak a(x - x₁)(x - x₂) = 1 · (x - 2)(x - 3).'
      },
      {
        id: 'crq1-9',
        question: 'Ha egy másodfokú egyenletben a és c különböző előjelűek (pl. a > 0 és c < 0), mit tudunk a gyökökről?',
        options: [
          'Biztosan 2 különböző valós gyök van',
          'Biztosan nincs valós gyök',
          'Pontosan 1 kettős gyök van',
          'Nem lehet eldönteni b ismerete nélkül'
        ],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac. Ha a és c ellenkező előjelű, akkor ac < 0, így -4ac > 0 (pozitív). Mivel b² ≥ 0, az összegük D = b² + (pozitív) szigorúan nagyobb mint 0, tehát mindig 2 valós gyök van!'
      },
      {
        id: 'crq1-10',
        question: 'Melyik állítás IGAZ az x² = 0 egyenletre?',
        options: [
          'x = 0 az egyetlen valós (kettős) gyöke',
          'Nincs valós megoldása',
          'x₁ = 0 és x₂ = 1',
          'Nem minősül másodfokú egyenletnek'
        ],
        correctAnswer: 0,
        explanation: 'x² = 0 másodfokú egyenlet (a = 1, b = 0, c = 0). Egyetlen valós kettős gyöke az x = 0.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Megoldóképlet és visszavezetési technikák',
    subtitle: 'Általános egyenletek megoldása, törtes és negyedfokú (biquadratikus) egyenletek kezelése.',
    range: '11–20. feladat',
    focus: 'Megoldóképlet precíz alkalmazása, u = x² helyettesítés, törtes egyenletek kikötései',
    questions: [
      {
        id: 'crq2-1',
        question: 'Melyek a 2x² - 7x + 3 = 0 egyenlet valós gyökei?',
        options: ['x₁ = 3 és x₂ = 1/2', 'x₁ = -3 és x₂ = -1/2', 'x₁ = 2 és x₂ = 3', 'x₁ = 7 és x₂ = 3'],
        correctAnswer: 0,
        explanation: 'D = (-7)² - 4 · 2 · 3 = 49 - 24 = 25. √D = 5. x₁,₂ = (7 ± 5) / (2 · 2) = (7 ± 5) / 4. x₁ = 12/4 = 3, x₂ = 2/4 = 1/2.'
      },
      {
        id: 'crq2-2',
        question: 'Mi a legelső kötelező lépés a (2x - 3)/(x - 2) = 5/x törtes egyenlet megoldásakor?',
        options: [
          'Kikötés felírása: x ≠ 2 és x ≠ 0',
          'Keresztbeszorzás elvégzése azonnal',
          'A megoldóképlet felírása',
          'A zárójelek felbontása'
        ],
        correctAnswer: 0,
        explanation: 'Törtes egyenletnél a nevezők soha nem lehetnek nullák! A kikötés felírása (x ≠ 0 és x ≠ 2) nélkül nem garantálható a megoldás helyessége, mert hamis gyököt kaphatunk.'
      },
      {
        id: 'crq2-3',
        question: 'Hány valós gyöke van az x⁴ - 13x² + 36 = 0 biquadratikus egyenletnek?',
        options: ['4 valós gyöke van: ±2 és ±3', '2 valós gyöke van: 2 és 3', 'Nincs valós gyöke', '1 valós gyöke van'],
        correctAnswer: 0,
        explanation: 'Legyen u = x² (u ≥ 0). Ekkor u² - 13u + 36 = 0, melynek gyökei u₁ = 4 és u₂ = 9. Mivel mindkettő pozitív: x² = 4 ⟹ x = ±2; x² = 9 ⟹ x = ±3. Összesen 4 valós gyök!'
      },
      {
        id: 'crq2-4',
        question: 'Hány valós megoldása van az x⁴ + 5x² - 36 = 0 egyenletnek?',
        options: ['2 valós megoldása: x = ±2', '4 valós megoldása', '0 valós megoldása', '3 valós megoldása'],
        correctAnswer: 0,
        explanation: 'u = x² bevezetésével u² + 5u - 36 = 0 ⟹ (u + 9)(u - 4) = 0 ⟹ u₁ = 4, u₂ = -9. Mivel u = x² ≥ 0, az u₂ = -9 hamis gyök (nem ad valós x-et). u₁ = 4 ⟹ x = ±2. Csak 2 valós megoldás van.'
      },
      {
        id: 'crq2-5',
        question: 'A Viète-formulák szerint mi a gyökök összege és szorzata az x² - 8x + 12 = 0 egyenletnél?',
        options: ['Összeg: +8, Szorzat: +12', 'Összeg: -8, Szorzat: +12', 'Összeg: +12, Szorzat: +8', 'Összeg: -8, Szorzat: -12'],
        correctAnswer: 0,
        explanation: 'Normált másodfokú egyenletnél (a = 1): x₁ + x₂ = -p = -(-8) = +8, és x₁ · x₂ = q = +12. A gyökök valóban 2 és 6, összege 8, szorzata 12.'
      },
      {
        id: 'crq2-6',
        question: 'Hol található az f(x) = 2x² - 8x + 5 parabola csúcspontja (M)?',
        options: ['M(2; -3)', 'M(-2; 5)', 'M(4; -3)', 'M(2; 3)'],
        correctAnswer: 0,
        explanation: 'u = -b / (2a) = -(-8) / (2 · 2) = 8 / 4 = 2. v = f(2) = 2(2)² - 8(2) + 5 = 8 - 16 + 5 = -3. A csúcspont M(2; -3).'
      },
      {
        id: 'crq2-7',
        question: 'Melyik egyenletnek a gyökei a 3 és a -5 számok?',
        options: ['x² + 2x - 15 = 0', 'x² - 2x - 15 = 0', 'x² + 8x + 15 = 0', 'x² - 15x + 2 = 0'],
        correctAnswer: 0,
        explanation: '(x - 3)(x - (-5)) = (x - 3)(x + 5) = x² + 5x - 3x - 15 = x² + 2x - 15 = 0.'
      },
      {
        id: 'crq2-8',
        question: 'Oldd meg a (x + 2) / (x - 1) = 4 / (x - 1) egyenletet! Mi a helyes következtetés?',
        options: [
          'Nincs megoldása (M = ∅), mert x = 2 nem gyök, x = 1 pedig kizárva a kikötés miatt',
          'x = 1 a gyök',
          'x = 2 a gyök',
          'x = 4 a gyök'
        ],
        correctAnswer: 0,
        explanation: 'Kikötés: x ≠ 1. Beszorozva (x - 1)-gyel: x + 2 = 4 ⟹ x = 2. Ellenőrzés: bal oldal (2+2)/(2-1) = 4/1 = 4; jobb oldal 4/(2-1) = 4. x = 2 helyes és nem ütközik a kikötéssel!'
      },
      {
        id: 'crq2-9',
        question: 'Mi a diszkriminánsa a 3x² - 2x + 1 = 0 egyenletnek?',
        options: ['-8 (nincs valós gyök)', '16', '0', '-16'],
        correctAnswer: 0,
        explanation: 'D = (-2)² - 4 · 3 · 1 = 4 - 12 = -8 < 0. Mivel negatív, a valós számok halmazán nincs megoldás.'
      },
      {
        id: 'crq2-10',
        question: 'Mi a hibája a következő lépésnek: x² = -4x ⟹ osztás x-szel ⟹ x = -4?',
        options: [
          'Elveszett az x = 0 gyök a nullával való tiltott osztás miatt',
          'Az előjel rossz, x = +4 lenne',
          'Nem szabad másodfokú egyenletet rendezni',
          'Nincs hiba, a lépés teljesen korrekt'
        ],
        correctAnswer: 0,
        explanation: 'Ismeretlennel soha nem osztunk le! 0-ra rendezve: x² + 4x = 0 ⟹ x(x + 4) = 0 ⟹ x₁ = 0 és x₂ = -4. Az x-szel való leosztás eltüntette a 0 gyököt.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi szintű szöveges és összetett feladatok',
    subtitle: 'Geometriai, pénzügyi, mozgásos és munkavégzéses valós életszituációk modellezése.',
    range: '21–30. feladat',
    focus: 'Összetett modellek, Pitagorasz-tétel, árváltozás, relatív sebesség, hamis gyökök kizárása',
    questions: [
      {
        id: 'crq3-1',
        question: 'Egy téglalap egyik oldala 3 cm-rel hosszabb a másiknál, területe 40 cm². Mekkorák a téglalap oldalai?',
        options: ['5 cm és 8 cm', '4 cm és 10 cm', '6 cm és 9 cm', '-8 cm és -5 cm'],
        correctAnswer: 0,
        explanation: 'Legyen a rövidebb oldal x (x > 0). Ekkor x(x + 3) = 40 ⟹ x² + 3x - 40 = 0. Szorzattá alakítva: (x + 8)(x - 5) = 0. Mivel oldalhossz nem lehet negatív, x = 5 cm. A másik oldal 5 + 3 = 8 cm. Ellenőrzés: 5 · 8 = 40 cm².'
      },
      {
        id: 'crq3-2',
        question: 'Egy derékszögű háromszög egyik befogója 7 cm-rel hosszabb a másiknál, átfogója 13 cm. Mekkora a rövidebb befogó?',
        options: ['5 cm', '12 cm', '6 cm', '8 cm'],
        correctAnswer: 0,
        explanation: 'Pitagorasz-tétel: x² + (x + 7)² = 13² = 169. x² + x² + 14x + 49 = 169 ⟹ 2x² + 14x - 120 = 0 ⟹ x² + 7x - 60 = 0. (x + 12)(x - 5) = 0. x > 0 miatt a rövidebb befogó 5 cm (a másik 12 cm, 5² + 12² = 169).'
      },
      {
        id: 'crq3-3',
        question: 'Egy termék ára egymás után kétszer ugyanannyi p%-kal nőtt. Az eredeti 1000 Ft-os ára 1440 Ft lett. Hány százalékos volt a drágulás?',
        options: ['20%', '44%', '22%', '10%'],
        correctAnswer: 0,
        explanation: '1000 · (1 + p/100)² = 1440 ⟹ (1 + p/100)² = 1,44. Gyököt vonva: 1 + p/100 = 1,2 ⟹ p/100 = 0,2 ⟹ p = 20%.'
      },
      {
        id: 'crq3-4',
        question: 'Egy csoport 60 000 Ft-ért bérel kisbuszt. Az indulás előtt 2 fő visszalép, így a többieknek fejenként 1000 Ft-tal többet kell fizetniük. Hányan mentek el végül kirándulni?',
        options: ['10 fő ment el (eredetileg 12 fő volt)', '12 fő ment el', '8 fő ment el', '15 fő ment el'],
        correctAnswer: 0,
        explanation: 'Legyen az eredeti létszám n. 60000/(n - 2) - 60000/n = 1000. 60/(n - 2) - 60/n = 1 ⟹ 60n - 60(n - 2) = n(n - 2) ⟹ 120 = n² - 2n ⟹ n² - 2n - 120 = 0. (n - 12)(n + 10) = 0 ⟹ n = 12 fő volt eredetileg, így végül 12 - 2 = 10 fő ment el kirándulni.'
      },
      {
        id: 'crq3-5',
        question: 'Két város távolsága 120 km. Egy gyorsvonat sebessége 20 km/h-val nagyobb a személyvonaténál, így menetideje 1 órával kevesebb. Mekkora a személyvonat sebessége?',
        options: ['40 km/h', '60 km/h', '50 km/h', '30 km/h'],
        correctAnswer: 0,
        explanation: 'Időkülönbség: 120/v - 120/(v + 20) = 1. Közös nevezővel beszorozva: 120(v + 20) - 120v = v(v + 20) ⟹ 2400 = v² + 20v ⟹ v² + 20v - 2400 = 0. (v + 60)(v - 40) = 0. v > 0 miatt v = 40 km/h a személyvonat sebessége (menetidő: 120/40 = 3 óra, a gyorsvonaté 120/60 = 2 óra, különbség 1 óra).'
      },
      {
        id: 'crq3-6',
        question: 'Egy motorcsónak állóvízi sebessége 18 km/h. A folyón 28 km-t megy a folyás irányában, majd visszatér a kiindulópontra. Az oda-vissza út összesen 3 óra 12 percig tartott. Mekkora a folyó sebessége?',
        options: ['3 km/h', '2 km/h', '4 km/h', '5 km/h'],
        correctAnswer: 0,
        explanation: '3 óra 12 perc = 3 + 12/60 = 3,2 óra = 16/5 óra. 28/(18 + v_f) + 28/(18 - v_f) = 3,2. 28[(18 - v_f + 18 + v_f)] / (324 - v_f²) = 3,2 ⟹ 28 · 36 / (324 - v_f²) = 3,2 ⟹ 1008 = 3,2(324 - v_f²) ⟹ 315 = 324 - v_f² ⟹ v_f² = 9 ⟹ v_f = 3 km/h.'
      },
      {
        id: 'crq3-7',
        question: 'Két munkás együtt 6 óra alatt végez el egy munkát. Ha az első munkás egyedül dolgozna, 5 órával hamarabb végezne, mint a második egyedül. Hány óra alatt végezne az első munkás egyedül?',
        options: ['10 óra alatt', '15 óra alatt', '8 óra alatt', '12 óra alatt'],
        correctAnswer: 0,
        explanation: 'Legyen az első munkás ideje t (t > 0), a másodiké t + 5. Együttes munkavégzés: 1/t + 1/(t + 5) = 1/6. Beszorozva 6t(t + 5)-tel: 6(t + 5) + 6t = t(t + 5) ⟹ 12t + 30 = t² + 5t ⟹ t² - 7t - 30 = 0. (t - 10)(t + 3) = 0. t > 0 miatt az első munkás egyedül 10 óra alatt végezne.'
      },
      {
        id: 'crq3-8',
        question: 'Melyik valós x érték elégíti ki a √(2x + 3) = x egyenletet?',
        options: ['x = 3 (az x = -1 hamis gyök)', 'x = 3 és x = -1 is jó', 'x = -1', 'Nincs valós gyök'],
        correctAnswer: 0,
        explanation: 'Mindkét oldalt négyzetre emelve: 2x + 3 = x² ⟹ x² - 2x - 3 = 0 ⟹ (x - 3)(x + 1) = 0 ⟹ x₁ = 3, x₂ = -1. Ellenőrzés: √(2·3 + 3) = √9 = 3 (jó). √(2·(-1) + 3) = √1 = 1 ≠ -1, tehát x = -1 hamis gyök! Csak x = 3 a valós megoldás.'
      },
      {
        id: 'crq3-9',
        question: 'Egy üzem termelési költségfüggvénye K(x) = x² - 40x + 500 (ahol x a gyártott darabszám ezer darabban). Milyen darabszámnál minimális a költség?',
        options: ['x = 20 ezer darabnál (K = 100)', 'x = 40 ezer darabnál', 'x = 10 ezer darabnál', 'x = 25 ezer darabnál'],
        correctAnswer: 0,
        explanation: 'A másodfokú kifejezés minimuma a parabola csúcspontjában van: x_min = -b / (2a) = -(-40) / (2 · 1) = 40 / 2 = 20 ezer darabnál. K(20) = 400 - 800 + 500 = 100.'
      },
      {
        id: 'crq3-10',
        question: 'Egy kerti medence köré 1 méter széles járdát építenek. A medence 6 m x 8 m-es. Hány négyzetméter a járda területe?',
        options: ['32 m²', '28 m²', '48 m²', '14 m²'],
        correctAnswer: 0,
        explanation: 'A medence területe: 6 · 8 = 48 m². A járdával megnövelt külső méretek: mindkét oldalhoz 2 · 1 = 2 méter adódik hozzá, így (6 + 2) = 8 m és (8 + 2) = 10 m. A teljes terület: 8 · 10 = 80 m². A járda területe: 80 - 48 = 32 m².'
      }
    ]
  }
};

export const ComprehensiveReviewQuiz: React.FC<ComprehensiveReviewQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Gyakorlás, tudáspróba Kvíz"
      subtitle="Tedd próbára az egész fejezetben megszerzett tudásodat a 30 kérdéses témazáró kihívásban!"
      badge="12. Lecke • Témazáró Próba"
      color="violet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <ComprehensiveReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ComprehensiveReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

