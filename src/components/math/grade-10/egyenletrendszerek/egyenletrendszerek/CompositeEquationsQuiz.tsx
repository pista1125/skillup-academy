import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CompositeEquationsMatcher } from './CompositeEquationsMatcher';
import { CompositeEquationsSorter } from './CompositeEquationsSorter';
import {
  ThreeLinearPlanesSvg,
  LineAndCircleSvg,
  LineAndParabolaSvg,
  ChairsAndTripsSvg,
  CoffeeMixtureSvg,
  ElevationMotionSvg
} from './CompositeEquationsFigures';

interface CompositeEquationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Háromismeretlenes Lineáris Rendszerek',
    description: '3 sík metszéspontja a térben. Megoldás lépcsős Gauss-kiküszöböléssel: 2 egyenletpárból kiejtjük z-t ⟹ 2x2 rendszert kapunk ⟹ x és y kiszámítása ⟹ z visszafejtése.',
    note: 'Ciklikus rendszernél (x+y=a, y+z=b, z+x=c) add össze mindhárom egyenletet: 2(x+y+z) = a+b+c!',
    color: 'from-blue-500 to-indigo-600',
    figure: <ThreeLinearPlanesSvg size={180} />
  },
  {
    title: 'Első- és Másodfokú Rendszerek',
    description: 'Az elsőfokú egyenletből kifejezzük az egyik ismeretlent, és beírjuk a másodfokúba. A kapott másodfokú egyenlet diszkriminánsa adja a metszéspontok számát (D > 0: 2 pont, D = 0: 1 pont, D < 0: 0 pont).',
    note: 'Kör és egyenes metszésénél x₁ és x₂ behelyettesítésével két rendezett számpárt kapunk: (x₁; y₁) és (x₂; y₂).',
    color: 'from-purple-500 to-pink-600',
    figure: <LineAndCircleSvg size={180} />
  },
  {
    title: 'Székek és Fordulók (xy szorzat kiesése)',
    description: 'Összes szék = x (szék/forduló) · y (forduló). (x+1)(y−2) = xy és (x−1)(y+4) = xy esetén a felbontás után az xy tagok mindkét oldalon kiesnek, tiszta lineáris rendszert hagyva!',
    note: 'Megoldás: −2x + y = 2 és 4x − y = 4 ⟹ x = 3 szék, y = 8 forduló ⟹ 24 szék összesen.',
    color: 'from-amber-500 to-orange-600',
    figure: <ChairsAndTripsSvg size={180} />
  },
  {
    title: 'Keverési Mérlegmodell',
    description: 'Mindig két egyenletet írunk fel: 1) Tömeg / térfogat mérlege (x + y = teljes tömeg), 2) Belső érték / tiszta hatóanyag mérlege (ár₁·x + ár₂·y = átlagár · teljes tömeg).',
    note: 'Példa: 17,5 kg 3600 Ft/kg-os kávékeverék 3000 és 4000 Ft-os kávékból: 7 kg és 10,5 kg.',
    color: 'from-emerald-500 to-teal-600',
    figure: <CoffeeMixtureSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető 3-ismeretlenes és másodfokú rendszerek (Könnyű)',
    subtitle: 'Háromismeretlenes alapesetek, ciklikus szimmetria és egyszerű másodfokú behelyettesítések.',
    range: '1–10. feladat',
    focus: '3 változós elimináció és alapvető kör-egyenes metszéspontok',
    questions: [
      {
        id: 'ceq1-1',
        questionTypeBadge: 'Háromismeretlenes alap',
        question: 'Mi a megoldása a következő egyszerű háromismeretlenes rendszernek?\nI. x + y + z = 10\nII. x + y = 6\nIII. x − y = 2',
        options: [
          '(4; 2; 4)',
          '(3; 3; 4)',
          '(5; 1; 4)',
          '(2; 4; 4)'
        ],
        correctAnswer: 0,
        explanation: 'A II. és III. egyenletből azonnal: (x + y) + (x − y) = 6 + 2 ⟹ 2x = 8 ⟹ x = 4. Ebből y = 6 − 4 = 2. Az I. egyenletbe beírva: 4 + 2 + z = 10 ⟹ 6 + z = 10 ⟹ z = 4. A megoldáshármas: (4; 2; 4).',
        hint: 'Először oldd meg a kétismeretlenes (II. és III.) rendszert x-re és y-ra, majd számold ki z-t az I-ből!'
      },
      {
        id: 'ceq1-2',
        questionTypeBadge: 'Ciklikus szimmetria',
        question: 'Adott a rendszer:\nI. x + y = 7\nII. y + z = 9\nIII. z + x = 8\nMennyi a három ismeretlen összege: x + y + z?',
        options: [
          '12',
          '24',
          '14',
          '10'
        ],
        correctAnswer: 0,
        explanation: 'Adjuk össze mindhárom egyenlet bal és jobb oldalát: (x + y) + (y + z) + (z + x) = 7 + 9 + 8 ⟹ 2x + 2y + 2z = 24 ⟹ 2(x + y + z) = 24 ⟹ x + y + z = 12. Ebből közvetlenül adódik: z = 12 − 7 = 5, x = 12 − 9 = 3, y = 12 − 8 = 4.',
        hint: 'Minden ismeretlen pontosan kétszer szerepel a bal oldalakon! Add össze a három egyenletet!',
        figure: <ThreeLinearPlanesSvg size={220} />
      },
      {
        id: 'ceq1-3',
        questionTypeBadge: 'Másodfokú rendszer',
        question: 'Mely pontokban metszi egymást a következőkben adott egyenes és parabola?\nI. y = x²\nII. y = 4',
        options: [
          '(2; 4) és (−2; 4)',
          '(4; 2) és (−4; 2)',
          'Csak a (2; 4) pontban',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlővé téve: x² = 4 ⟹ x = ±2. Mivel y = 4 mindkét esetben, a metszéspontok: P₁(2; 4) és P₂(−2; 4).',
        hint: 'Helyettesítsd be y = 4-et az első egyenletbe: x² = 4. Mely számok négyzete 4?'
      },
      {
        id: 'ceq1-4',
        questionTypeBadge: 'Kör és egyenes',
        question: 'Oldd meg a következő másodfokú egyenletrendszert:\nI. x² + y² = 25\nII. y = 3',
        options: [
          '(4; 3) és (−4; 3)',
          '(5; 3) és (−5; 3)',
          '(3; 4) és (−3; 4)',
          '(0; 5)'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve y = 3-at: x² + 3² = 25 ⟹ x² + 9 = 25 ⟹ x² = 16 ⟹ x = ±4. A két metszéspont: (4; 3) és (−4; 3).',
        hint: 'y² = 9. Mennyi x², ha x² + 9 = 25?',
        figure: <LineAndCircleSvg size={220} />
      },
      {
        id: 'ceq1-5',
        questionTypeBadge: 'Szimmetrikus rendszer',
        question: 'Két pozitív szám összege 9, szorzatuk 20. Melyik ez a két szám (x ≥ y)?',
        options: [
          'x = 5 és y = 4',
          'x = 6 és y = 3',
          'x = 10 és y = 2',
          'x = 7 és y = 2'
        ],
        correctAnswer: 0,
        explanation: 'A Viète-formula szerint a számok az u² − 9u + 20 = 0 másodfokú egyenlet gyökei. (u − 5)(u − 4) = 0 ⟹ u₁ = 5, u₂ = 4. Mivel x ≥ y, x = 5 és y = 4.',
        hint: 'Melyik két pozitív egész szám összege 9 és szorzata 20?'
      },
      {
        id: 'ceq1-6',
        questionTypeBadge: 'Szöveges alap',
        question: 'Két szám összege 60, különbsége 5. Melyik a nagyobbik szám? (Tankönyv 41. o. 3. feladat)',
        options: [
          '32,5',
          '35',
          '30',
          '27,5'
        ],
        correctAnswer: 0,
        explanation: 'I. x + y = 60 és II. x − y = 5. Összeadva a két egyenletet: 2x = 65 ⟹ x = 32,5. Ebből a kisebbik szám y = 60 − 32,5 = 27,5. A nagyobbik szám 32,5.',
        hint: 'Add össze az összeget és a különbséget (60 + 5), majd oszd el 2-vel!'
      },
      {
        id: 'ceq1-7',
        questionTypeBadge: '3-ismeretlenes kiesés',
        question: 'Tekintsük az alábbi rendszert:\nI. x + 2y + z = 7\nII. 2x − y + z = 4\nMilyen egyenletet kapunk, ha az I. egyenletből kivonjuk a II. egyenletet?',
        options: [
          '−x + 3y = 3',
          '3x + y = 11',
          '−x + y = 3',
          'x + 3y + 2z = 11'
        ],
        correctAnswer: 0,
        explanation: 'Kivonva: (x − 2x) + (2y − (−y)) + (z − z) = 7 − 4 ⟹ −x + 3y = 3. A z ismeretlen teljesen kiesett.',
        hint: 'Vond ki tagról tagra: x − 2x = −x, 2y − (−y) = 3y, z − z = 0, 7 − 4 = 3.'
      },
      {
        id: 'ceq1-8',
        questionTypeBadge: 'Másodfokú érintő',
        question: 'Mely pontban érinti az y = 2x − 1 egyenes az y = x² parabolát?',
        options: [
          '(1; 1)',
          '(2; 3)',
          '(0; −1)',
          '(1; 2)'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlővé téve: x² = 2x − 1 ⟹ x² − 2x + 1 = 0 ⟹ (x − 1)² = 0 ⟹ x = 1. Ebből y = 1² = 1. A diszkrimináns D = 0, tehát pontosan egy közös érintési pont van: (1; 1).',
        hint: 'Rendezd nullára: x² − 2x + 1 = 0. Teljes négyzet!'
      },
      {
        id: 'ceq1-9',
        questionTypeBadge: 'Háromszög szögei',
        question: 'Egy háromszög második szöge kétszer akkora, a harmadik szöge háromszor akkora, mint az első szög. Hány fokosak a háromszög szögei?',
        options: [
          '30°, 60°, 90°',
          '20°, 40°, 120°',
          '25°, 50°, 105°',
          '36°, 72°, 72°'
        ],
        correctAnswer: 0,
        explanation: 'Legyenek a szögek a, b, c. I. a + b + c = 180°. II. b = 2a. III. c = 3a. Behelyettesítve: a + 2a + 3a = 180° ⟹ 6a = 180° ⟹ a = 30°. Ekkor b = 60°, c = 90°.',
        hint: 'A háromszög belső szögeinek összege 180°. a + 2a + 3a = 6a = 180°.'
      },
      {
        id: 'ceq1-10',
        questionTypeBadge: 'Megoldások száma',
        question: 'Legfeljebb hány metszéspontja lehet a síkban egy egyenesnek és egy körnek?',
        options: [
          'Legfeljebb 2',
          'Legfeljebb 1',
          'Végtelen sok',
          'Legfeljebb 4'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a kör egyenlete másodfokú, az egyenesé elsőfokú, a behelyettesítés után legfeljebb másodfokú egyenletet kapunk. Egy valós másodfokú egyenletnek legfeljebb 2 valós gyöke lehet (szelő esetén 2, érintőnél 1, kitérőnél 0).',
        hint: 'Gondolj a szelőre, az érintőre és a kitérő egyenesre!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Görbék metszéspontjai és típus-szöveges modellek (Közepes)',
    subtitle: 'Parabola és egyenes metszése, székek és fordulók, kávékeverék és energiafogyasztás.',
    range: '11–20. feladat',
    focus: 'Diszkrimináns vizsgálat és a tankönyvi szöveges modellek',
    questions: [
      {
        id: 'ceq2-1',
        questionTypeBadge: 'Parabola és egyenes',
        question: 'Határozd meg az alábbi rendszer valós megoldáspárjait!\nI. y = x²\nII. y = x + 2',
        options: [
          '(2; 4) és (−1; 1)',
          '(3; 9) és (−2; 4)',
          '(2; 4) és (1; 1)',
          '(−2; 0) és (1; 3)'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlővé téve: x² = x + 2 ⟹ x² − x − 2 = 0. Szorzattá alakítva: (x − 2)(x + 1) = 0. A gyökök: x₁ = 2 (ekkor y₁ = 4) és x₂ = −1 (ekkor y₂ = 1). Megoldáspárok: (2; 4) és (−1; 1).',
        hint: 'Rendezd a másodfokút nullára: x² − x − 2 = 0, és keresd a gyököket!',
        figure: <LineAndParabolaSvg size={220} />
      },
      {
        id: 'ceq2-2',
        questionTypeBadge: 'Szöveges: Székek és fordulók',
        question: 'Egy diák székeket visz át a terembe. Ha minden fordulóban 1-gyel több széket vinne, 2-vel kevesebbszer kellene fordulnia. Ha 1-gyel kevesebbet vinne, 4-gyel több fordulóra lenne szükség. Hány széket kell átvinnie összesen? (Tankönyv 40. o.)',
        options: [
          '24 darab széket',
          '30 darab széket',
          '20 darab széket',
          '18 darab széket'
        ],
        correctAnswer: 0,
        explanation: 'Legyen x a székek száma fordulónként, y a fordulók száma. Összes szék: xy. I. (x + 1)(y − 2) = xy ⟹ −2x + y = 2. II. (x − 1)(y + 4) = xy ⟹ 4x − y = 4. Összeadva: 2x = 6 ⟹ x = 3 szék fordulónként. Ebből y = 2 + 2·3 = 8 forduló. Összesen: 3 · 8 = 24 szék.',
        hint: 'Bontsd fel a zárójeleket: az xy mindkét oldalon kiesik, így −2x + y = 2 és 4x − y = 4 marad!',
        figure: <ChairsAndTripsSvg size={220} />
      },
      {
        id: 'ceq2-3',
        questionTypeBadge: 'Szöveges: Kávékeverék',
        question: 'A 3000 Ft-os és a 4000 Ft-os kilónkénti árú kávéfajtákból 17,5 kg 3600 Ft/kg árú keveréket kell készíteni. Hány kg kell a két fajtából? (Tankönyv 41. o. 1. feladat)',
        options: [
          '7 kg a 3000 Ft-osból és 10,5 kg a 4000 Ft-osból',
          '8 kg a 3000 Ft-osból és 9,5 kg a 4000 Ft-osból',
          '6,5 kg a 3000 Ft-osból és 11 kg a 4000 Ft-osból',
          '10 kg a 3000 Ft-osból és 7,5 kg a 4000 Ft-osból'
        ],
        correctAnswer: 0,
        explanation: 'I. Tömeg: x + y = 17,5 ⟹ y = 17,5 − x. II. Érték: 3000x + 4000y = 17,5 · 3600 = 63 000. Behelyettesítve: 3000x + 4000(17,5 − x) = 63 000 ⟹ 3000x + 70 000 − 4000x = 63 000 ⟹ −1000x = −7000 ⟹ x = 7 kg (a 3000 Ft-osból). Ebből y = 17,5 − 7 = 10,5 kg (a 4000 Ft-osból).',
        hint: 'Állíts fel egy egyenletet az össztömegre (x + y = 17,5) és egyet az összértékre (3000x + 4000y = 63 000)!',
        figure: <CoffeeMixtureSvg size={220} />
      },
      {
        id: 'ceq2-4',
        questionTypeBadge: 'Szöveges: Mosógép energia',
        question: 'Egy mosógép vízmelegítéskor 2000 W, egyébként átlagosan 400 W teljesítményt vesz fel. Az 1 órás program alatt összesen 800 Wh energiát használt fel. Mennyi ideig melegített vizet? (Tankönyv 41. o. 6. feladat)',
        options: [
          '15 percig (0,25 óra)',
          '20 percig (1/3 óra)',
          '10 percig (1/6 óra)',
          '30 percig (0,5 óra)'
        ],
        correctAnswer: 0,
        explanation: 'Legyen t₁ a vízmelegítés ideje órában, t₂ az egyéb műveletek ideje. I. t₁ + t₂ = 1 ⟹ t₂ = 1 − t₁. II. 2000t₁ + 400t₂ = 800. Behelyettesítve: 2000t₁ + 400(1 − t₁) = 800 ⟹ 1600t₁ + 400 = 800 ⟹ 1600t₁ = 400 ⟹ t₁ = 400/1600 = 0,25 óra = 15 perc.',
        hint: 'Írd fel: t₁ + t₂ = 1 és 2000t₁ + 400t₂ = 800! Mennyi t₁?'
      },
      {
        id: 'ceq2-5',
        questionTypeBadge: 'Geometriai rendszer: Négyzetek',
        question: 'Két négyzet területe között 72 m² különbség van. Az egyik négyzet kerülete 16 m-rel nagyobb a másikénál. Hány méter a két négyzet oldala? (Tankönyv 41. o. 2. feladat)',
        options: [
          '11 m és 7 m',
          '12 m és 8 m',
          '10 m és 6 m',
          '13 m és 9 m'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a két oldal a és b (a > b). I. Kerület: 4a − 4b = 16 ⟹ a − b = 4. II. Terület: a² − b² = 72. Mivel a² − b² = (a − b)(a + b), behelyettesítve az a − b = 4-et: 4(a + b) = 72 ⟹ a + b = 18. Ezzel: a − b = 4 és a + b = 18 ⟹ 2a = 22 ⟹ a = 11 m, és b = 7 m. Ellenőrzés: 11² − 7² = 121 − 49 = 72 m² ✓.',
        hint: 'Alkalmazd az azonosságot: a² − b² = (a − b)(a + b) = 72!'
      },
      {
        id: 'ceq2-6',
        questionTypeBadge: 'Diszkrimináns és érintő',
        question: 'Milyen m meredekség esetén ÉRINTI az y = mx egyenes az x² + (y − 5)² = 9 kört az origóból indítva?',
        options: [
          'm = ±4/3 (vagyis m = ±1,333)',
          'm = ±1',
          'm = ±3/4',
          'm = ±2'
        ],
        correctAnswer: 0,
        explanation: 'A kör középpontja K(0; 5), sugara r = 3. Az origón átmenő érintő és a középpont távolsága r = 3. Az érintő egyenlete mx − y = 0. A pont-egyenes távolság: d = |m·0 − 5| / √(m² + 1) = 3 ⟹ 5 / √(m² + 1) = 3 ⟹ 25 / (m² + 1) = 9 ⟹ 9m² + 9 = 25 ⟹ 9m² = 16 ⟹ m² = 16/9 ⟹ m = ±4/3.',
        hint: 'Algebrai úton is helyettesíthetsz: x² + (mx − 5)² = 9, és állítsd a diszkriminánst 0-ra!'
      },
      {
        id: 'ceq2-7',
        questionTypeBadge: 'Szimmetrikus negyedfokú',
        question: 'Oldd meg a valós számok halmazán a rendszert:\nI. x² + y² = 13\nII. x · y = 6\n(x, y > 0 és x ≥ y)',
        options: [
          'x = 3; y = 2',
          'x = 4; y = 1,5',
          'x = 3,5; y = 1,5',
          'x = √13; y = 0'
        ],
        correctAnswer: 0,
        explanation: 'Tudjuk, hogy (x + y)² = x² + y² + 2xy = 13 + 2·6 = 25 ⟹ x + y = 5 (mivel pozitívak). Továbbá (x − y)² = x² + y² − 2xy = 13 − 12 = 1 ⟹ x − y = 1. Összeadva: 2x = 6 ⟹ x = 3, amiből y = 2. Ellenőrzés: 3² + 2² = 13 és 3·2 = 6 ✓.',
        hint: 'Számold ki (x + y)² értékét: x² + y² + 2xy = 13 + 12 = 25!'
      },
      {
        id: 'ceq2-8',
        questionTypeBadge: 'Háromismeretlenes Gauss',
        question: 'Mi a z értéke az alábbi rendszerben?\nI. x + y + z = 9\nII. 2x − y + z = 8\nIII. x + y − z = 1',
        options: [
          'z = 4',
          'z = 3',
          'z = 5',
          'z = 2'
        ],
        correctAnswer: 0,
        explanation: 'Vonjuk ki a III. egyenletet az I-ből: (x+y+z) − (x+y−z) = 9 − 1 ⟹ 2z = 8 ⟹ z = 4. Azonnal megkaptuk z-t egyetlen kivonással!',
        hint: 'Hasonlítsd össze az I. és a III. egyenlet bal oldalát! Mi a különbség köztük?'
      },
      {
        id: 'ceq2-9',
        questionTypeBadge: 'Törtes másodfokú',
        question: 'Oldd meg az alábbi rendszert a valós számpárok halmazán:\nI. x + y = 5\nII. 1/x + 1/y = 5/6',
        options: [
          '(3; 2) és (2; 3)',
          '(4; 1) és (1; 4)',
          '(5; 1) és (1; 5)',
          '(6; −1) és (−1; 6)'
        ],
        correctAnswer: 0,
        explanation: 'Hozzunk közös nevezőre a II-ben: (x + y) / (xy) = 5/6. Mivel x + y = 5, ezt beírva a számlálóba: 5 / (xy) = 5/6 ⟹ xy = 6. Tehát x + y = 5 és xy = 6. A gyökök: 3 és 2. Megoldáspárok: (3; 2) és (2; 3).',
        hint: 'A bal oldal közös nevezőre hozva: (x + y) / (xy) = 5/6. Írd be a számlálóba, hogy x + y = 5!'
      },
      {
        id: 'ceq2-10',
        questionTypeBadge: 'Szöveges: Kétjegyű szám',
        question: 'Egy kétjegyű számban a tízesek száma 2-vel nagyobb az egyesek számánál. A szám és a felcserélt szám szorzata 1855. Mi az eredeti szám?',
        options: [
          '53',
          '64',
          '42',
          '75'
        ],
        correctAnswer: 0,
        explanation: 'Legyen az egyesek száma y, a tízeseké x = y + 2. A szám 10(y+2) + y = 11y + 20. A felcserélt szám 10y + (y+2) = 11y + 2. Szorzatuk: (11y + 20)(11y + 2) = 1855 ⟹ 121y² + 242y + 40 = 1855 ⟹ 121y² + 242y − 1815 = 0. 121-gyel osztva: y² + 2y − 15 = 0 ⟹ (y + 5)(y − 3) = 0. Mivel y számjegy (y > 0), y = 3. Ekkor x = 3 + 2 = 5. Az eredeti szám az 53 (53 · 35 = 1855 ✓).',
        hint: 'Próbáld ki a szóba jöhető kétjegyű számokat: 31·13, 42·24, 53·35, 64·46... 53 · 35 = 1855!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű, érettségi és összetett versenyfeladatok (Nehéz)',
    subtitle: 'Autós túra hegyen-völgyön, bolti akciók, kamatos kamat és derékszögű háromszögek.',
    range: '21–30. feladat',
    focus: 'Összetett többváltozós modellek és érettségi feladatok',
    questions: [
      {
        id: 'ceq3-1',
        questionTypeBadge: 'Autós túra terepen',
        question: 'Gyula autós kiránduláson vett részt oda-vissza ugyanazon az úton. Emelkedőn 60 km/h, lejtőn 120 km/h, a 140 km-es sík úton 80 km/h volt a sebessége. Odafelé 3 óra 45 perc (3,75 h), visszafelé 4 óra alatt tette meg az utat. Milyen messze volt az úti cél? (Tankönyv 41. o. 4. feladat)',
        options: [
          '300 km',
          '280 km',
          '320 km',
          '260 km'
        ],
        correctAnswer: 0,
        explanation: 'Legyen az emelkedő hossza odafelé s₁, a lejtőé s₂. A sík szakasz ideje oda is, vissza is: 140 / 80 = 1,75 óra. Így a fennmaradó idők: odafelé s₁/60 + s₂/120 = 3,75 − 1,75 = 2 óra; visszafelé az emelkedőből lejtő lesz és viszont: s₁/120 + s₂/60 = 4 − 1,75 = 2,25 óra. 120-szal szorozva: 2s₁ + s₂ = 240 és s₁ + 2s₂ = 270. Összeadva: 3(s₁ + s₂) = 510 ⟹ s₁ + s₂ = 170 km. Az úti cél teljes távolsága: s₁ + s₂ + 140 = 170 + 140 = 300 km!',
        hint: 'Vonj le 140/80 = 1,75 órát mindkét menetidőből! A megmaradó emelkedő-lejtő egyenletek: 2s₁ + s₂ = 240 és s₁ + 2s₂ = 270.',
        figure: <ElevationMotionSvg size={220} />
      },
      {
        id: 'ceq3-2',
        questionTypeBadge: 'Bolti akció és engedmények',
        question: 'Egy boltvezető tejet és tejfölt akcióz. 1) Ha a tejre 20% (50 Ft/l), a tejfölre 75 Ft/l kedvezményt ad, a bevételkiesés 9750 Ft. 2) Ha a tejre 70 Ft/l, a tejfölre 10% (45 Ft/l) kedvezményt ad, a kiesés 10 650 Ft. Hány liter tej és tejföl van készleten? (Tankönyv 41. o. 4. feladat)',
        options: [
          '120 liter tej és 50 liter tejföl',
          '100 liter tej és 60 liter tejföl',
          '150 liter tej és 40 liter tejföl',
          '110 liter tej és 55 liter tejföl'
        ],
        correctAnswer: 0,
        explanation: 'A tej ára 250 Ft ⟹ 20%-a 50 Ft. A tejföl ára 450 Ft ⟹ 10%-a 45 Ft. I. 50x + 75y = 9750 (25-tel osztva: 2x + 3y = 390). II. 70x + 45y = 10 650 (5-tel osztva: 14x + 9y = 2130). Az elsőt 3-mal szorozva: 6x + 9y = 1170. Kivonva a II-ből: 8x = 960 ⟹ x = 120 liter tej. Ebből 2·120 + 3y = 390 ⟹ 3y = 150 ⟹ y = 50 liter tejföl.',
        hint: 'A kedvezmények forintban: 20% 250 Ft-ból = 50 Ft; 10% 450 Ft-ból = 45 Ft. Így: 50x + 75y = 9750 és 70x + 45y = 10 650.'
      },
      {
        id: 'ceq3-3',
        questionTypeBadge: 'Érettségi: Derékszögű háromszög',
        question: 'Egy derékszögű háromszög DE befogója 7 cm-rel rövidebb, mint a DF befogó. Az átfogója 2 cm-rel hosszabb, mint a DF befogó. Milyen hosszúak a háromszög oldalai? (Tankönyv 117. o. 4. feladat)',
        options: [
          'DE = 8 cm, DF = 15 cm, átfogó = 17 cm',
          'DE = 5 cm, DF = 12 cm, átfogó = 13 cm',
          'DE = 6 cm, DF = 8 cm, átfogó = 10 cm',
          'DE = 9 cm, DF = 12 cm, átfogó = 15 cm'
        ],
        correctAnswer: 0,
        explanation: 'Legyen DF = x. Ekkor DE = x − 7, és az átfogó c = x + 2. Pitagorasz-tétel: (x − 7)² + x² = (x + 2)² ⟹ x² − 14x + 49 + x² = x² + 4x + 4 ⟹ x² − 18x + 45 = 0. Szorzattá alakítva: (x − 15)(x − 3) = 0. Mivel x > 7 (hogy DE pozitív legyen), x = 15 cm. Így DE = 15 − 7 = 8 cm, DF = 15 cm, az átfogó pedig 15 + 2 = 17 cm (8² + 15² = 64 + 225 = 289 = 17² ✓).',
        hint: 'Írd fel a Pitagorasz-tételt: (x − 7)² + x² = (x + 2)²!'
      },
      {
        id: 'ceq3-4',
        questionTypeBadge: 'Érettségi: Kamatos kamat',
        question: 'A Nagy család 800 000 Ft-ot kötött le két évre kamatos kamatra. A bank a 2. évre 3%-kal növelte a kamatlábat, így a 2. év végén 907 200 Ft-ot vettek fel. Hány százalék volt az első évi kamatláb? (Tankönyv 117. o. 4. feladat)',
        options: [
          '5%',
          '4%',
          '6%',
          '4,5%'
        ],
        correctAnswer: 0,
        explanation: 'Legyen az 1. évi kamatláb p%, a kamattényező k = 1 + p/100. A 2. évi kamatláb (p + 3)%, így a tényező k + 0,03. Egyenlet: 800 000 · k · (k + 0,03) = 907 200 ⟹ k(k + 0,03) = 907 200 / 800 000 = 1,134 ⟹ k² + 0,03k − 1,134 = 0. Megoldóképlettel: k = (−0,03 + √(0,0009 + 4,536)) / 2 = (−0,03 + 2,13) / 2 = 1,05. Tehát az 1. évi kamatláb p = 5% (a 2. évi pedig 8%). Ellenőrzés: 800 000 · 1,05 · 1,08 = 840 000 · 1,08 = 907 200 Ft ✓.',
        hint: '800 000 · (1 + p/100) · (1 + (p+3)/100) = 907 200. Vizsgáld meg a p = 5%-ot!'
      },
      {
        id: 'ceq3-5',
        questionTypeBadge: 'Érettségi: Mobiltelefon költség',
        question: 'Stefi 4 hét alatt 2 órát (120 perc) beszélt és 4000 Ft-ot költött, fele-fele arányban (2000-2000 Ft) csúcsidőben és azon kívül. Csúcsidőben a percdíj 25 Ft-tal drágább. Hány percet beszélt csúcsidőben? (Tankönyv 117. o. 4. feladat)',
        options: [
          '40 percet',
          '50 percet',
          '30 percet',
          '60 percet'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a csúcsidőn kívüli percdíj p Ft, a csúcsidőn kívüli beszélgetés t₂ perc. Csúcsidőben a percdíj p + 25 Ft, az idő t₁ = 120 − t₂. Mivel mindkettőre 2000 Ft-ot költött: t₁(p + 25) = 2000 és t₂·p = 2000 ⟹ p = 2000/t₂ és p + 25 = 2000/t₁. Kivonva: 2000/t₁ − 2000/t₂ = 25 ⟹ 80/t₁ − 80/(120 − t₁) = 1 ⟹ 80(120 − t₁) − 80t₁ = t₁(120 − t₁) ⟹ 9600 − 160t₁ = 120t₁ − t₁² ⟹ t₁² − 280t₁ + 9600 = 0. Szorzattá alakítva: (t₁ − 40)(t₁ − 240) = 0. Mivel t₁ ≤ 120, t₁ = 40 perc! (Ekkor t₂ = 80 perc, a percdíjak: 50 Ft és 25 Ft, 40·50 = 2000 és 80·25 = 2000 ✓).',
        hint: 'Mindkét időszakra 2000 Ft jutott. 2000/t₁ − 2000/t₂ = 25 és t₁ + t₂ = 120. Próbáld ki a t₁ = 40 percet!'
      },
      {
        id: 'ceq3-6',
        questionTypeBadge: 'Klímamodell másodfokú',
        question: 'Egy klímamodell szerint az évi középhőmérséklet: f(x) = 0,0001x² − 0,0063x + 15,2, ahol x az 1900 óta eltelt évek száma. Melyik évben volt az évi középhőmérséklet pontosan 15,42 °C? (Tankönyv 117. o. 4. feladat)',
        options: [
          '1990-ben',
          '1985-ben',
          '2000-ben',
          '1975-ben'
        ],
        correctAnswer: 0,
        explanation: '0,0001x² − 0,0063x + 15,2 = 15,42 ⟹ 0,0001x² − 0,0063x − 0,22 = 0. Beszorozva 10 000-rel: x² − 63x − 2200 = 0. Szorzattá alakítva: (x − 90)(x + 25) = 0. Mivel x ≥ 0, x = 90 év telt el 1900 óta. 1900 + 90 = 1990.',
        hint: 'Beszorozva tízezerrel az egyenlet: x² − 63x − 2200 = 0. Keresd a pozitív gyököt!'
      },
      {
        id: 'ceq3-7',
        questionTypeBadge: 'Tyúkfarm csoportverseny',
        question: 'Egy farmon 10 000 tyúk évi 2,20 millió tojást tojik. Ha a tyúkok számát p%-kal csökkentik, az egy tyúkra jutó termelés 2p%-kal nő. Hány százalékkal csökkentették a tyúkok számát, ha az összkibocsátás 8%-kal nőtt? (Tankönyv 117. o. 3. feladat)',
        options: [
          '20%-kal (vagy 30%-kal)',
          '10%-kal',
          '15%-kal',
          '25%-kal'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a csökkentés aránya x = p/100. A tyúkok száma (1 − x)-szeresére változik, az egy tyúkra jutó tojásszám (1 + 2x)-szeresére. A teljes termelés 8%-kal nő, vagyis 1,08-szoros: (1 − x)(1 + 2x) = 1,08 ⟹ 1 + 2x − x − 2x² = 1,08 ⟹ 2x² − x + 0,08 = 0. 100-zal szorozva: 200x² − 100x + 8 = 0 ⟹ 25x² − 12,5x + 1 = 0 ⟹ gyökök: x₁ = 0,2 (vagyis p = 20%) és x₂ = 0,3 (vagyis p = 30%). Mindkettő érvényes (p ≤ 30% a feladat szerint).',
        hint: 'Írd fel a szorzót: (1 − x)(1 + 2x) = 1,08, ahol x = p/100!'
      },
      {
        id: 'ceq3-8',
        questionTypeBadge: 'Hiányzó együttható',
        question: 'Milyen értéket kell adni a hiányzó c együtthatónak a 7x² + 4x + c = 0 egyenletben, hogy NE legyen valós megoldása? (Tankönyv 117. o. 2. feladat)',
        options: [
          'c > 4/7 (kb. c > 0,571)',
          'c < 4/7',
          'c = 0',
          'c < −1'
        ],
        correctAnswer: 0,
        explanation: 'A másodfokú egyenletnek akkor nincs valós gyöke, ha a diszkriminánsa negatív: D = b² − 4ac < 0. Itt a = 7, b = 4, így: 4² − 4·7·c < 0 ⟹ 16 − 28c < 0 ⟹ 16 < 28c ⟹ c > 16/28 = 4/7.',
        hint: 'A diszkriminánsnak negatívnak kell lennie: b² − 4ac < 0 ⟹ 16 − 28c < 0.'
      },
      {
        id: 'ceq3-9',
        questionTypeBadge: 'Egyetlen valós gyök',
        question: 'Milyen b együttható esetén lesz pontosan egy valós gyöke az x² − bx + 16 = 0 egyenletnek? (Tankönyv 117. o. 5. feladat)',
        options: [
          'b = 8 vagy b = −8',
          'Csak b = 4',
          'Csak b = 8',
          'b = 16 vagy b = −16'
        ],
        correctAnswer: 0,
        explanation: 'Pontosan egy valós gyök akkor van, ha a diszkrimináns nulla: D = (−b)² − 4·1·16 = 0 ⟹ b² − 64 = 0 ⟹ b² = 64 ⟹ b = ±8. (Ekkor (x − 4)² = 0 vagy (x + 4)² = 0).',
        hint: 'D = b² − 4ac = 0. Mennyi b, ha b² − 64 = 0?'
      },
      {
        id: 'ceq3-10',
        questionTypeBadge: 'Szimmetrikus negyedfokú',
        question: 'Hány valós számpár megoldása van a következő egyenletrendszernek?\nI. x³ + y³ = 35\nII. x + y = 5',
        options: [
          '2 megoldáspár: (3; 2) és (2; 3)',
          '1 megoldáspár: (2,5; 2,5)',
          '3 megoldáspár',
          '0 megoldás'
        ],
        correctAnswer: 0,
        explanation: 'Használjuk az azonosságot: x³ + y³ = (x + y)(x² − xy + y²) = (x + y)((x + y)² − 3xy). Behelyettesítve x + y = 5-öt: 5 · (5² − 3xy) = 35 ⟹ 25 − 3xy = 7 ⟹ 3xy = 18 ⟹ xy = 6. Tehát x + y = 5 és xy = 6. Ennek a másodfokú rendszernek a megoldásai a 3 és a 2. A megoldáspárok: (3; 2) és (2; 3).',
        hint: 'Bontsd fel a köbök összegét: x³ + y³ = (x + y)((x + y)² − 3xy) = 35!'
      }
    ]
  }
};

export const CompositeEquationsQuiz: React.FC<CompositeEquationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="3. Egyenletrendszerek – Kvíz"
      subtitle="Gyakorold a 3-ismeretlenes, másodfokú rendszereket és a tankönyvi összetett szöveges feladatokat 30 válogatott feladaton keresztül!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 9. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Egyenletrendszerek Segédlet • Összetett és Szöveges feladatok"
      initialGameMode={initialGameMode}
      matcherComponent={
        <CompositeEquationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <CompositeEquationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

