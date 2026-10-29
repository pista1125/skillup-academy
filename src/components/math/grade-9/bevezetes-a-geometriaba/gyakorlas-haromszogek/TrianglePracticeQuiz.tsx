import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TrianglePracticeMatcher, matcherLevels } from './TrianglePracticeMatcher';
import { TrianglePracticeSorter, sorterLevels } from './TrianglePracticeSorter';
import {
  TriangleAnglesAndSidesSVG,
  PythagorasHeightSVG,
  MediansCalculationSVG,
  CircumIncircleSVG
} from './TrianglePracticeFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface TrianglePracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Szögek, Egyenlőtlenség és Alaptételek (Könnyű)',
    subtitle: 'Belső és külső szögek, a háromszög-egyenlőtlenség és egyszerű Pitagorasz-számítások.',
    range: '1 - 10. feladat',
    focus: 'Alapvető geometriai számítások',
    questions: [
      {
        id: 'tpq1-1',
        questionTypeBadge: 'Belső Szögek Összege',
        question: 'Egy háromszög két belső szöge α = 45° és β = 65°. Mekkora a harmadik belső szög (γ)?',
        figure: <TriangleAnglesAndSidesSVG size={200} />,
        options: [
          '70°',
          '80°',
          '60°',
          '75°'
        ],
        correctAnswer: 0,
        hint: 'A háromszög belső szögeinek összege mindig 180°.',
        explanation: 'γ = 180° - (45° + 65°) = 180° - 110° = 70°.'
      },
      {
        id: 'tpq1-2',
        questionTypeBadge: 'Külső Szög Tétele',
        question: 'Egy háromszög két belső szöge α = 40° és β = 75°. Mekkora a harmadik csúcshoz tartozó külső szög (γ\')?',
        options: [
          '115°',
          '65°',
          '140°',
          '105°'
        ],
        correctAnswer: 0,
        hint: 'A külső szög egyenlő a nem mellette fekvő két belső szög összegével: γ\' = α + β.',
        explanation: 'A külső szög tétele szerint γ\' = α + β = 40° + 75° = 115°. (Ellenőrzés: γ = 180° - 115° = 65°, és 65° + 115° = 180°.)'
      },
      {
        id: 'tpq1-3',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Melyik számhármasból szerkeszthető síkbeli háromszög?',
        options: [
          '5 cm, 7 cm, 10 cm',
          '3 cm, 4 cm, 8 cm',
          '2 cm, 5 cm, 7 cm',
          '1 cm, 2 cm, 4 cm'
        ],
        correctAnswer: 0,
        hint: 'A két rövidebb szakasz összegének szigorúan nagyobbnak kell lennie a leghosszabbnál: a + b > c.',
        explanation: '5 + 7 = 12 > 10, tehát szerkeszthető! A többi esetben: 3 + 4 = 7 < 8 (nem), 2 + 5 = 7 (egyenesre lapul, nem), 1 + 2 = 3 < 4 (nem).'
      },
      {
        id: 'tpq1-4',
        questionTypeBadge: 'Háromszög-egyenlőtlenség Magyarázat',
        question: 'Miért NEM alkothatnak egy háromszög oldalai a = 3 cm, b = 4 cm és c = 8 cm hosszúságú szakaszokat?',
        options: [
          'Mert a két rövidebb oldal összege kisebb a harmadiknál: 3 + 4 = 7 < 8',
          'Mert nincs benne derékszög',
          'Mert a kerületük nem osztható 3-mal',
          'Mert a szögek összege nem lenne 180°'
        ],
        correctAnswer: 0,
        hint: 'A két körív, amit a csúcsokból húzunk, nem érheti el egymást.',
        explanation: 'A háromszög-egyenlőtlenség megköveteli, hogy bármely két oldal összege nagyobb legyen a harmadiknál. Mivel 3 + 4 = 7 < 8, a körívek nem metszik egymást.'
      },
      {
        id: 'tpq1-5',
        questionTypeBadge: 'Pitagorasz-tétel',
        question: 'Egy derékszögű háromszög befogói a = 5 cm és b = 12 cm. Mekkora az átfogó (c)?',
        figure: <PythagorasHeightSVG size={200} />,
        options: [
          '13 cm',
          '17 cm',
          '15 cm',
          '11 cm'
        ],
        correctAnswer: 0,
        hint: 'c² = a² + b² = 5² + 12² = 25 + 144 = 169.',
        explanation: 'c = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.'
      },
      {
        id: 'tpq1-6',
        questionTypeBadge: 'Körülírt Kör Derékszögűben',
        question: 'Egy derékszögű háromszög átfogója c = 16 cm. Mekkora a köré írható kör sugara (R)?',
        figure: <CircumIncircleSVG size={200} />,
        options: [
          '8 cm',
          '16 cm',
          '4 cm',
          '32 cm'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel miatt az átfogó a kör átmérője: R = c / 2.',
        explanation: 'Derékszögű háromszögben a körülírt kör középpontja az átfogó felezőpontja, így a sugara az átfogó fele: R = 16 / 2 = 8 cm.'
      },
      {
        id: 'tpq1-7',
        questionTypeBadge: 'Súlypont Aránya',
        question: 'Milyen arányban osztja a súlypont a háromszög súlyvonalát a csúcs felől nézve?',
        figure: <MediansCalculationSVG size={200} />,
        options: [
          '2 : 1 arányban',
          '1 : 2 arányban',
          '1 : 1 arányban (felezi)',
          '3 : 1 arányban'
        ],
        correctAnswer: 0,
        hint: 'A csúcs felőli szakasz a hosszabb, a teljes vonal 2/3 része.',
        explanation: 'A súlypont a súlyvonalakat 2 : 1 arányban osztja úgy, hogy a csúcs felőli rész a hosszabb (|AS| = 2/3 · s, |SF| = 1/3 · s).'
      },
      {
        id: 'tpq1-8',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Szögei',
        question: 'Egy egyenlő szárú háromszög szárszöge (a két szár által bezárt szög) 40°. Mekkorák az alapon fekvő szögei?',
        options: [
          '70° és 70°',
          '60° és 60°',
          '80° és 80°',
          '50° és 50°'
        ],
        correctAnswer: 0,
        hint: 'Az alapon fekvő két szög egyenlő nagyságú, és a belső szögek összege 180°.',
        explanation: 'A maradék 180° - 40° = 140° egyenlően oszlik meg a két alapszög között: 140° / 2 = 70° mindkettő.'
      },
      {
        id: 'tpq1-9',
        questionTypeBadge: 'Szabályos Háromszög Külső Szöge',
        question: 'Mekkora a szabályos (egyenlő oldalú) háromszög bármelyik csúcsához tartozó külső szög?',
        options: [
          '120°',
          '60°',
          '150°',
          '90°'
        ],
        correctAnswer: 0,
        hint: 'A szabályos háromszög belső szöge 60°, a külső szög ennek 180°-ra való kiegészítése.',
        explanation: 'Minden belső szög 60°, így a külső szög: 180° - 60° = 120° (vagy a másik két belső szög összege: 60° + 60° = 120°).'
      },
      {
        id: 'tpq1-10',
        questionTypeBadge: 'Középvonal Hossza',
        question: 'Egy háromszög alapja a = 16 cm. Milyen hosszú a vele párhuzamos középvonal (k_a)?',
        options: [
          '8 cm',
          '4 cm',
          '16 cm',
          '32 cm'
        ],
        correctAnswer: 0,
        hint: 'A középvonal hossza a szemközti oldal pontosan fele.',
        explanation: 'A középvonal tétele szerint k = a / 2 = 16 / 2 = 8 cm.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szimmetrikus Idomok és Részletes Arányok (Közepes)',
    subtitle: 'Egyenlő szárú és szabályos háromszögek magassága, területe, beírt kör sugara és súlyponti szakaszok.',
    range: '11 - 20. feladat',
    focus: 'Magasságok, területek és nevezetes sugarak kiszámítása',
    questions: [
      {
        id: 'tpq2-11',
        questionTypeBadge: 'Egyenlő Szárú Magasság',
        question: 'Egy egyenlő szárú háromszög alapja a = 12 cm, szára b = 10 cm. Mekkora az alaphoz tartozó magasság (m_a)?',
        figure: <PythagorasHeightSVG size={200} />,
        options: [
          '8 cm',
          '6 cm',
          '9 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        hint: 'Az alaphoz tartozó magasság felezi az alapot: a/2 = 6 cm. Pitagorasz: m² + 6² = 10².',
        explanation: 'm_a = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'tpq2-12',
        questionTypeBadge: 'Egyenlő Szárú Terület',
        question: 'Egy egyenlő szárú háromszög alapja a = 16 cm, szára b = 10 cm. Mekkora a háromszög területe?',
        options: [
          '48 cm²',
          '96 cm²',
          '80 cm²',
          '60 cm²'
        ],
        correctAnswer: 0,
        hint: 'Először számold ki a magasságot: m = √(10² - 8²) = 6 cm. Ezután T = (a · m) / 2.',
        explanation: 'A félalap 8 cm. A magasság m = √(100 - 64) = √36 = 6 cm. A terület T = (16 · 6) / 2 = 96 / 2 = 48 cm².'
      },
      {
        id: 'tpq2-13',
        questionTypeBadge: 'Szabályos Háromszög Magassága',
        question: 'Egy szabályos háromszög oldala a = 8 cm. Mekkora a magassága?',
        options: [
          '4√3 cm ≈ 6.93 cm',
          '8√3 cm',
          '4 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'm = (a · √3) / 2.',
        explanation: 'm = (8 · √3) / 2 = 4√3 cm ≈ 6.93 cm.'
      },
      {
        id: 'tpq2-14',
        questionTypeBadge: 'Szabályos Háromszög Területe',
        question: 'Egy szabályos háromszög oldala a = 4 cm. Mekkora a területe?',
        options: [
          '4√3 cm² ≈ 6.93 cm²',
          '8√3 cm²',
          '16√3 cm²',
          '8 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4.',
        explanation: 'T = (4² · √3) / 4 = (16 · √3) / 4 = 4√3 cm² ≈ 6.93 cm².'
      },
      {
        id: 'tpq2-15',
        questionTypeBadge: 'Súlypont Szakaszméretek',
        question: 'Egy súlyvonal teljes hossza s = 18 cm. Milyen hosszú a csúcs és a súlypont közötti szakasz, illetve a súlypont és az oldalfelező közötti szakasz?',
        figure: <MediansCalculationSVG size={200} />,
        options: [
          '12 cm és 6 cm',
          '9 cm és 9 cm',
          '10 cm és 8 cm',
          '14 cm és 4 cm'
        ],
        correctAnswer: 0,
        hint: 'A csúcs felőli 2 rész, az oldalfelező felőli 1 rész (összesen 3 rész). 18 / 3 = 6 cm egy rész.',
        explanation: 'Csúcs felőli szakasz: 2/3 · 18 = 12 cm. Oldalfelező felőli szakasz: 1/3 · 18 = 6 cm.'
      },
      {
        id: 'tpq2-16',
        questionTypeBadge: 'Súlypont Visszaszámítás',
        question: 'A súlypont és a szemközti oldal felezőpontjának távolsága 5 cm. Mennyi a teljes súlyvonal hossza?',
        options: [
          '15 cm',
          '10 cm',
          '20 cm',
          '12.5 cm'
        ],
        correctAnswer: 0,
        hint: 'Az oldalfelező felőli szakasz 1 egység. A teljes súlyvonal 3 egység.',
        explanation: 'Mivel 1 rész = 5 cm, a csúcs felőli 2 rész = 10 cm, a teljes súlyvonal hossza pedig 3 · 5 = 15 cm.'
      },
      {
        id: 'tpq2-17',
        questionTypeBadge: 'Beírt Kör Derékszögűben',
        question: 'Egy derékszögű háromszög befogói a = 9 cm és b = 12 cm (átfogója c = 15 cm). Mekkora a beírt kör sugara (r)?',
        figure: <CircumIncircleSVG size={200} />,
        options: [
          '3 cm',
          '4 cm',
          '2.5 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        hint: 'r = (a + b - c) / 2.',
        explanation: 'r = (9 + 12 - 15) / 2 = 6 / 2 = 3 cm.'
      },
      {
        id: 'tpq2-18',
        questionTypeBadge: 'Középvonal Kerületarány',
        question: 'Egy háromszög kerülete K = 36 cm. Mekkora a középvonalak által alkotott belső háromszög kerülete?',
        options: [
          '18 cm',
          '9 cm',
          '12 cm',
          '24 cm'
        ],
        correctAnswer: 0,
        hint: 'Minden középvonal pontosan a fele az eredeti háromszög oldalának.',
        explanation: 'A középvonalak hossza a/2, b/2, c/2. Így kerületük az eredeti kerület pontosan fele: K_kis = 36 / 2 = 18 cm.'
      },
      {
        id: 'tpq2-19',
        questionTypeBadge: 'Középvonal Területarány',
        question: 'Egy háromszög területe T = 80 cm². Mekkora a három középvonal által határolt belső háromszög területe?',
        options: [
          '20 cm²',
          '40 cm²',
          '26.6 cm²',
          '10 cm²'
        ],
        correctAnswer: 0,
        hint: 'A három középvonal 4 darab egyenlő területű háromszögre osztja a síkidomot.',
        explanation: 'T_kis = T / 4 = 80 / 4 = 20 cm².'
      },
      {
        id: 'tpq2-20',
        questionTypeBadge: 'Euler-egyenes Távolság',
        question: 'Egy háromszög Euler-egyenesén a súlypont és a körülírt kör távolsága |SO| = 6 cm. Mekkora a teljes távolság a magasságpont és a körülírt kör középpontja között (|MO|)?',
        options: [
          '18 cm',
          '12 cm',
          '24 cm',
          '15 cm'
        ],
        correctAnswer: 0,
        hint: '|MS| = 2 · |SO| = 12 cm. |MO| = |MS| + |SO|.',
        explanation: 'Mivel |MS| = 2 · 6 = 12 cm, a teljes távolság |MO| = 12 + 6 = 18 cm.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Kombinált Feladatok (Nehéz)',
    subtitle: 'Arányos szögfelosztás, koordináták, átfogóhoz tartozó magasság és speciális sugarak.',
    range: '21 - 30. feladat',
    focus: 'Többlépéses geometriai feladatok',
    questions: [
      {
        id: 'tpq3-21',
        questionTypeBadge: 'Arányos Szögfelosztás',
        question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Mekkora a háromszög legkisebb és legnagyobb szöge?',
        options: [
          '40° és 80°',
          '30° és 60°',
          '45° és 90°',
          '20° és 80°'
        ],
        correctAnswer: 0,
        hint: '2x + 3x + 4x = 9x = 180° -> x = 20°.',
        explanation: 'Egy rész: 180° / 9 = 20°. A szögek: 2 · 20° = 40°, 3 · 20° = 60°, 4 · 20° = 80°. A legkisebb 40°, a legnagyobb 80°.'
      },
      {
        id: 'tpq3-22',
        questionTypeBadge: 'Különleges Derékszögű (30°-60°)',
        question: 'Egy derékszögű háromszög átfogója c = 20 cm, egyik hegyesszöge 30°. Mennyi a 30°-os szöggel szemközti befogó és a körülírt kör sugara (R)?',
        options: [
          'a = 10 cm és R = 10 cm',
          'a = 10 cm és R = 5 cm',
          'a = 10√3 cm és R = 10 cm',
          'a = 5 cm és R = 10 cm'
        ],
        correctAnswer: 0,
        hint: 'A 30°-os szöggel szemközti befogó az átfogó fele. A körülírt kör sugara is az átfogó fele!',
        explanation: 'A 30°-60°-os derékszögű háromszög egy szabályos háromszög fele, így a rövidebb befogó c / 2 = 10 cm. A körülírt kör sugara szintén R = c / 2 = 10 cm.'
      },
      {
        id: 'tpq3-23',
        questionTypeBadge: 'Átfogóhoz Tartozó Magasság',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm, átfogója c = 10 cm. Mekkora az átfogóhoz tartozó magasság (m_c)?',
        options: [
          '4.8 cm',
          '5 cm',
          '4 cm',
          '3.6 cm'
        ],
        correctAnswer: 0,
        hint: 'Írd fel a területet kétféleképpen: T = (a · b) / 2 = (c · m_c) / 2 -> m_c = (a · b) / c.',
        explanation: 'A terület T = (6 · 8) / 2 = 24 cm². Ugyanakkor T = (10 · m_c) / 2 = 24, amiből 5 · m_c = 24, azaz m_c = 24 / 5 = 4.8 cm.'
      },
      {
        id: 'tpq3-24',
        questionTypeBadge: 'Szabályos Háromszög Sugarai',
        question: 'Egy szabályos háromszög oldala a = 6 cm. Mekkora a körülírt és a beírt körének sugara (R és r)?',
        options: [
          'R = 2√3 cm és r = √3 cm',
          'R = 3√3 cm és r = √3 cm',
          'R = 4 cm és r = 2 cm',
          'R = 3 cm és r = 1.5 cm'
        ],
        correctAnswer: 0,
        hint: 'm = 6√3 / 2 = 3√3 cm. R = 2/3 m, r = 1/3 m.',
        explanation: 'A magasság m = 3√3 cm. R = 2/3 · 3√3 = 2√3 cm ≈ 3.46 cm. r = 1/3 · 3√3 = √3 cm ≈ 1.73 cm. (Látható, hogy R = 2r.)'
      },
      {
        id: 'tpq3-25',
        questionTypeBadge: 'Súlypont Koordinátái',
        question: 'Egy síkbeli háromszög csúcsainak koordinátái: A(1, 3), B(5, 7), C(6, 2). Mik a súlypont (S) koordinátái?',
        options: [
          'S(4, 4)',
          'S(4, 3)',
          'S(3, 4)',
          'S(5, 4)'
        ],
        correctAnswer: 0,
        hint: 'S = ((x_A + x_B + x_C)/3, (y_A + y_B + y_C)/3).',
        explanation: 'x_S = (1 + 5 + 6) / 3 = 12 / 3 = 4. y_S = (3 + 7 + 2) / 3 = 12 / 3 = 4. Tehát S(4, 4).'
      },
      {
        id: 'tpq3-26',
        questionTypeBadge: 'Beírt Sugár Területből',
        question: 'Egy háromszög oldalai 13 cm, 14 cm, 15 cm. Kerülete K = 42 cm (félkerület s = 21 cm), területe T = 84 cm². Mekkora a beírt körének sugara (r)?',
        options: [
          '4 cm',
          '2 cm',
          '3 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        hint: 'T = r · s  ->  r = T / s.',
        explanation: 'r = T / s = 84 / 21 = 4 cm.'
      },
      {
        id: 'tpq3-27',
        questionTypeBadge: 'Tompaszögű Háromszög és Euler',
        question: 'Igaz-e az |MS| = 2 · |SO| összefüggés az Euler-egyenesen tompaszögű háromszög esetén is?',
        options: [
          'Igen, minden nem szabályos háromszögre érvényes, függetlenül a szögek nagyságától',
          'Nem, tompaszögű háromszögben az arány megfordul: |SO| = 2 · |MS|',
          'Nem, mert tompaszögű háromszögben nincs Euler-egyenes',
          'Csak akkor, ha a háromszög egyben egyenlő szárú is'
        ],
        correctAnswer: 0,
        hint: 'Leonhard Euler tétele általános érvényű bármely háromszögre, ahol a pontok nem esnek egybe.',
        explanation: 'Az Euler-egyenes tétele univerzális: bármely nem szabályos síkbeli háromszögben M, S és O egy egyenesre esik, és a súlypont mindig 2:1 arányban osztja az MO távolságot (|MS| = 2 · |SO|).'
      },
      {
        id: 'tpq3-28',
        questionTypeBadge: 'Szár Visszaszámítása Területből',
        question: 'Egy egyenlő szárú háromszög alapja a = 10 cm, területe T = 60 cm². Mekkora a háromszög szára (b)?',
        options: [
          '13 cm',
          '12 cm',
          '15 cm',
          '14 cm'
        ],
        correctAnswer: 0,
        hint: 'Először m_a = 2T / a = 120 / 10 = 12 cm. Majd Pitagorasz: b² = m² + (a/2)² = 12² + 5².',
        explanation: 'A magasság m_a = 12 cm. A félalap 5 cm. A szár b = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.'
      },
      {
        id: 'tpq3-29',
        questionTypeBadge: 'Terület Visszaszámítás Középvonalakból',
        question: 'A háromszög oldalfelező pontjai által alkotott belső háromszög területe 14 cm². Mekkora az eredeti háromszög teljes területe?',
        options: [
          '56 cm²',
          '28 cm²',
          '42 cm²',
          '70 cm²'
        ],
        correctAnswer: 0,
        hint: 'A belső háromszög területe az eredeti terület egynegyede: T = 4 · T_kis.',
        explanation: 'T = 4 · 14 cm² = 56 cm².'
      },
      {
        id: 'tpq3-30',
        questionTypeBadge: 'Derékszögű Súlyvonal Bizonyítás',
        question: 'Miért egyenlő derékszögű háromszögben a derékszögű csúcsból induló súlyvonal hossza pontosan az átfogó felével (s_c = c / 2)?',
        options: [
          'Mert az átfogó felezőpontja a körülírt kör középpontja (O), és a derékszögű csúcs is a körön fekszik (sugár)',
          'Mert a súlyvonal mindig merőleges az átfogóra',
          'Mert a két befogó összege egyenlő az átfogóval',
          'Mert a súlypont a derékszögű csúcsban van'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel szerint a derékszögű háromszög köré írt körének átmérője az átfogó.',
        explanation: 'A Thalész-tétel megfordítása miatt az átfogó felezőpontja a derékszögű háromszög körülírt körének középpontja. A derékszögű csúcs távolsága ettől a középponttól a kör sugara: R = c / 2. Mivel a csúcsot az átfogó felezőjével összekötő szakasz maga az s_c súlyvonal, ezért s_c = R = c / 2.'
      }
    ]
  }
};

export const TrianglePracticeQuiz: React.FC<TrianglePracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="9. Gyakorlás (Háromszögek)"
      subtitle="Szögek, Pitagorasz-tétel, súlypont-arányok és típusfeladatok gyakorlása"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-gyakorlas"
      themeColor="amber"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA"
      storageKey="grade9-triangle-practice-quiz"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító játék',
          icon: <ArrowRightLeft className="w-4 h-4" />,
          description: 'Keresd meg az összetartozó párokat!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <TrianglePracticeMatcher
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
            />
          )
        },
        {
          id: 'sorter',
          label: 'Csoportosító játék',
          icon: <LayoutGrid className="w-4 h-4" />,
          description: 'Válogasd szét a kategóriákba!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <TrianglePracticeSorter
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheatSheetCard
            title="Szögtételek & Egyenlőtlenség"
            icon={<TriangleAnglesAndSidesSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Belső szögek összege:</strong> α + β + γ = 180°</li>
              <li><strong>Külső szög:</strong> α' = β + γ  és  α + α' = 180°</li>
              <li><strong>Külső szögek összege:</strong> α' + β' + γ' = 360°</li>
              <li><strong>Háromszög-egyenlőtlenség:</strong> a + b &gt; c (bármely két oldal összege nagyobb a harmadiknál)</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Pitagorasz & Magasságok"
            icon={<PythagorasHeightSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Derékszögű háromszög:</strong> a² + b² = c²</li>
              <li><strong>Egyenlő szárú háromszög:</strong> m_a² + (a/2)² = b²</li>
              <li><strong>Szabályos háromszög magassága:</strong> m = (a · √3) / 2</li>
              <li><strong>Szabályos háromszög területe:</strong> T = (a² · √3) / 4</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Súlypont & Középvonalak"
            icon={<MediansCalculationSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Súlypont 2:1 aránya:</strong> |AS| = 2/3 · s_a  és  |SF_a| = 1/3 · s_a (csúcs felől a hosszabb!)</li>
              <li><strong>Területfelezés:</strong> 6 darab egyenlő területű (T / 6) háromszögre oszt</li>
              <li><strong>Középvonal:</strong> k = a / 2 és párhuzamos vele</li>
              <li><strong>Belső háromszög:</strong> T_kis = T / 4  és  K_kis = K / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Nevezetes Sugarak & Euler"
            icon={<CircumIncircleSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Derékszögű körülírt R:</strong> R = c / 2 (Thalész-tétel)</li>
              <li><strong>Derékszögű beírt r:</strong> r = (a + b - c) / 2</li>
              <li><strong>Általános beírt r:</strong> r = T / s  (ahol s = K / 2)</li>
              <li><strong>Euler-egyenes:</strong> M — S — O sorrend, |MS| = 2 · |SO|</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

