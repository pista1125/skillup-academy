import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleAreaMatcher, matcherLevels } from './TriangleAreaMatcher';
import { TriangleAreaSorter, sorterLevels } from './TriangleAreaSorter';
import {
  BaseAndHeightAreaSVG,
  RightTriangleAreaSVG,
  EquilateralTriangleAreaSVG,
  HeronAndCirclesAreaSVG
} from './TriangleAreaFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface TriangleAreaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alap- és Magasságképletek (Könnyű)',
    subtitle: 'Alap és magasság szorzata, derékszögű háromszögek területe és magasság visszaszámítása.',
    range: '1 - 10. feladat',
    focus: 'Az alapvető területi összefüggések gyakorlása',
    questions: [
      {
        id: 'taq1-1',
        questionTypeBadge: 'Alap és Magasság Képlete',
        question: 'Hogyan számoljuk ki egy háromszög területét, ha ismerjük az "a" oldalát és a hozzá tartozó "m_a" magasságát?',
        figure: <BaseAndHeightAreaSVG size={200} />,
        options: [
          'T = (a · m_a) / 2',
          'T = a · m_a',
          'T = (a + m_a) / 2',
          'T = (a · m_a) / 4'
        ],
        correctAnswer: 0,
        hint: 'A háromszög területe a megfelelő téglalap területének a fele.',
        explanation: 'A háromszög területe az oldal és a hozzá tartozó magasság szorzatának a fele: T = (a · m_a) / 2.'
      },
      {
        id: 'taq1-2',
        questionTypeBadge: 'Alapszámítás',
        question: 'Egy háromszög alapja a = 14 cm, a hozzá tartozó magassága m_a = 8 cm. Mekkora a területe?',
        options: [
          '56 cm²',
          '112 cm²',
          '28 cm²',
          '44 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = (14 · 8) / 2 = 112 / 2.',
        explanation: 'T = (14 · 8) / 2 = 112 / 2 = 56 cm².'
      },
      {
        id: 'taq1-3',
        questionTypeBadge: 'Derékszögű Háromszög Területe',
        question: 'Egy derékszögű háromszög befogói a = 7 cm és b = 10 cm. Mekkora a háromszög területe?',
        figure: <RightTriangleAreaSVG size={200} />,
        options: [
          '35 cm²',
          '70 cm²',
          '17.5 cm²',
          '49 cm²'
        ],
        correctAnswer: 0,
        hint: 'A két befogó merőleges egymásra: T = (a · b) / 2.',
        explanation: 'T = (7 · 10) / 2 = 70 / 2 = 35 cm².'
      },
      {
        id: 'taq1-4',
        questionTypeBadge: 'Magasság Visszaszámítása',
        question: 'Egy háromszög területe T = 45 cm², az alapja a = 10 cm. Milyen hosszú a hozzá tartozó m_a magasság?',
        options: [
          '9 cm',
          '4.5 cm',
          '18 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        hint: 'm_a = (2 · T) / a = (2 · 45) / 10.',
        explanation: 'm_a = (2 · 45) / 10 = 90 / 10 = 9 cm.'
      },
      {
        id: 'taq1-5',
        questionTypeBadge: 'Oldal Visszaszámítása',
        question: 'Egy háromszög területe T = 36 cm², a magassága m = 6 cm. Milyen hosszú a magassághoz tartozó oldal?',
        options: [
          '12 cm',
          '6 cm',
          '18 cm',
          '24 cm'
        ],
        correctAnswer: 0,
        hint: 'alap = (2 · T) / m = 72 / 6.',
        explanation: 'alap = (2 · 36) / 6 = 72 / 6 = 12 cm.'
      },
      {
        id: 'taq1-6',
        questionTypeBadge: 'Két Oldal és Magasságok Egyenlősége',
        question: 'Egy háromszögben a = 12 cm, m_a = 6 cm, és egy másik oldala b = 9 cm. Mekkora a b oldalhoz tartozó m_b magasság?',
        options: [
          '8 cm',
          '6 cm',
          '10 cm',
          '7.5 cm'
        ],
        correctAnswer: 0,
        hint: 'a · m_a = b · m_b  =>  12 · 6 = 9 · m_b.',
        explanation: '2T = a · m_a = 12 · 6 = 72. Ekkor 9 · m_b = 72, amiből m_b = 72 / 9 = 8 cm.'
      },
      {
        id: 'taq1-7',
        questionTypeBadge: 'Kerület Kiszámítása',
        question: 'Egy háromszög oldalai a = 8 cm, b = 11 cm és c = 15 cm. Mekkora a kerülete (K) és a félkerülete (s)?',
        options: [
          'K = 34 cm és s = 17 cm',
          'K = 34 cm és s = 34 cm',
          'K = 68 cm és s = 34 cm',
          'K = 17 cm és s = 8.5 cm'
        ],
        correctAnswer: 0,
        hint: 'K = a + b + c, és s = K / 2.',
        explanation: 'K = 8 + 11 + 15 = 34 cm, a félkerület pedig s = 34 / 2 = 17 cm.'
      },
      {
        id: 'taq1-8',
        questionTypeBadge: 'Több Magasság Szorzata',
        question: 'Igaz-e, hogy egy háromszögben az (a · m_a), a (b · m_b) és a (c · m_c) szorzatok értéke mindig megegyezik?',
        options: [
          'Igen, mindhárom szorzat a terület kétszeresével (2T) egyenlő',
          'Nem, a leghosszabb oldalhoz tartozó szorzat mindig nagyobb',
          'Csak szabályos háromszögben egyeznek meg',
          'Csak derékszögű háromszögben egyeznek meg'
        ],
        correctAnswer: 0,
        hint: 'Mivel T = (oldal · magasság) / 2 minden oldalra felírható, a szorzatok értéke 2T.',
        explanation: 'Bármely háromszögben a · m_a = b · m_b = c · m_c = 2T, mert mindegyik a háromszög területének kétszeresét adja.'
      },
      {
        id: 'taq1-9',
        questionTypeBadge: 'Derékszögű Háromszög Átfogóval',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, az átfogóhoz tartozó magassága m_c = 4.8 cm. Mekkora a területe?',
        options: [
          '24 cm²',
          '48 cm²',
          '12 cm²',
          '20 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = (c · m_c) / 2 = (10 · 4.8) / 2.',
        explanation: 'T = (10 · 4.8) / 2 = 48 / 2 = 24 cm².'
      },
      {
        id: 'taq1-10',
        questionTypeBadge: 'Területfelezés Súlyvonallal',
        question: 'Egy háromszög területe T = 50 cm². Behúzzuk az egyik súlyvonalát. Mekkora területű részekre osztja a háromszöget ez az egyetlen súlyvonal?',
        options: [
          'Két darab 25 cm² területű háromszögre',
          'Egy 30 cm² és egy 20 cm² területűre',
          'Három egyenlő részre',
          'Attól függ, melyik csúcsból indítjuk'
        ],
        correctAnswer: 0,
        hint: 'A két keletkező háromszög alapja azonos (felezett oldal), magasságuk pedig közös.',
        explanation: 'Mivel a súlyvonal felezi a szemközti oldalt, a két keletkező háromszög alapja és a hozzá tartozó magassága azonos, így a területük is egyenlő: 50 / 2 = 25 cm².'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szabályos, Egyenlő Szárú és Hérón-képlet (Közepes)',
    subtitle: 'Szabályos háromszög területe, egyenlő szárú háromszög magassága, Hérón-képlet és beírt sugár.',
    range: '11 - 20. feladat',
    focus: 'Összetettebb területi képletek és levezetések',
    questions: [
      {
        id: 'taq2-11',
        questionTypeBadge: 'Szabályos Háromszög Magassága',
        question: 'Egy szabályos háromszög oldala a = 10 cm. Milyen hosszú a magassága (m)?',
        figure: <EquilateralTriangleAreaSVG size={200} />,
        options: [
          '5√3 cm ≈ 8.66 cm',
          '10√3 cm',
          '5 cm',
          '8 cm'
        ],
        correctAnswer: 0,
        hint: 'm = (a · √3) / 2 = (10 · √3) / 2.',
        explanation: 'm = (10 · √3) / 2 = 5√3 cm ≈ 8.66 cm.'
      },
      {
        id: 'taq2-12',
        questionTypeBadge: 'Szabályos Háromszög Területe',
        question: 'Egy szabályos háromszög oldala a = 6 cm. Mekkora a területe?',
        figure: <EquilateralTriangleAreaSVG size={200} />,
        options: [
          '9√3 cm² ≈ 15.59 cm²',
          '36√3 cm²',
          '18 cm²',
          '18√3 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4 = (36 · √3) / 4.',
        explanation: 'T = (6² · √3) / 4 = (36 · √3) / 4 = 9√3 cm² ≈ 15.59 cm².'
      },
      {
        id: 'taq2-13',
        questionTypeBadge: 'Egyenlő Szárú Terület',
        question: 'Egy egyenlő szárú háromszög alapja a = 10 cm, szárai b = 13 cm. Mekkora a területe?',
        options: [
          '60 cm²',
          '120 cm²',
          '65 cm²',
          '50 cm²'
        ],
        correctAnswer: 0,
        hint: 'Félalap: 5 cm. Magasság: m = √(13² - 5²) = 12 cm. Terület: T = (10 · 12) / 2.',
        explanation: 'Az alap fele 5 cm. A magasság m = √(169 - 25) = √144 = 12 cm. A terület T = (10 · 12) / 2 = 60 cm².'
      },
      {
        id: 'taq2-14',
        questionTypeBadge: 'Hérón Félkerület',
        question: 'Egy háromszög oldalai a = 7 cm, b = 8 cm és c = 9 cm. Mennyi a Hérón-képletben szereplő félkerület (s)?',
        figure: <HeronAndCirclesAreaSVG size={200} />,
        options: [
          '12 cm',
          '24 cm',
          '6 cm',
          '8 cm'
        ],
        correctAnswer: 0,
        hint: 's = (a + b + c) / 2 = (7 + 8 + 9) / 2.',
        explanation: 's = (7 + 8 + 9) / 2 = 24 / 2 = 12 cm.'
      },
      {
        id: 'taq2-15',
        questionTypeBadge: 'Hérón-képlet Számítás',
        question: 'Egy háromszög oldalai a = 3 cm, b = 4 cm és c = 5 cm. Mennyi a területe a Hérón-képlettel számolva (s = 6 cm)?',
        options: [
          '6 cm²',
          '12 cm²',
          '10 cm²',
          '8 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = √[6 · (6-3) · (6-4) · (6-5)] = √[6 · 3 · 2 · 1] = √36.',
        explanation: 'T = √[6 · 3 · 2 · 1] = √36 = 6 cm². (Ez megegyezik a derékszögű T = 3 · 4 / 2 = 6 képlettel is!)'
      },
      {
        id: 'taq2-16',
        questionTypeBadge: 'Hérón Nevezetes Háromszög',
        question: 'Egy háromszög oldalai 13 cm, 14 cm és 15 cm. Félkerülete s = 21 cm. Mekkora a területe?',
        options: [
          '84 cm²',
          '168 cm²',
          '90 cm²',
          '72 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = √[21 · (21-13) · (21-14) · (21-15)] = √[21 · 8 · 7 · 6].',
        explanation: 'T = √[21 · 8 · 7 · 6] = √[3 · 7 · 8 · 7 · 6] = √[49 · 144] = 7 · 12 = 84 cm².'
      },
      {
        id: 'taq2-17',
        questionTypeBadge: 'Beírt Sugár Kiszámítása',
        question: 'Egy háromszög területe T = 84 cm², kerülete K = 42 cm. Mekkora a beírt körének sugara (r)?',
        options: [
          '4 cm',
          '2 cm',
          '8 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'Félkerület s = 42 / 2 = 21 cm. r = T / s.',
        explanation: 'r = T / s = 84 / 21 = 4 cm.'
      },
      {
        id: 'taq2-18',
        questionTypeBadge: 'Terület Beírt Sugárból',
        question: 'Egy háromszög beírt körének sugara r = 3 cm, a háromszög kerülete K = 30 cm. Mekkora a háromszög területe?',
        options: [
          '45 cm²',
          '90 cm²',
          '30 cm²',
          '15 cm²'
        ],
        correctAnswer: 0,
        hint: 'T = r · s = 3 · (30 / 2) = 3 · 15.',
        explanation: 'A félkerület s = 30 / 2 = 15 cm. A terület T = r · s = 3 · 15 = 45 cm².'
      },
      {
        id: 'taq2-19',
        questionTypeBadge: 'Középvonalak Belső Területe',
        question: 'Egy háromszög területe 64 cm². Mekkora területű háromszöget fognak közre a középvonalai?',
        options: [
          '16 cm²',
          '32 cm²',
          '8 cm²',
          '24 cm²'
        ],
        correctAnswer: 0,
        hint: 'A három középvonal 4 egybevágó kis háromszögre osztja a síkidomot: T_kis = T / 4.',
        explanation: 'T_kis = T / 4 = 64 / 4 = 16 cm².'
      },
      {
        id: 'taq2-20',
        questionTypeBadge: 'Súlypont Területfelosztása',
        question: 'Egy háromszög területe T = 72 cm². A három súlyvonal 6 kis háromszögre osztja a síkidomot. Mekkora egy-egy ilyen kis háromszög területe?',
        options: [
          '12 cm²',
          '24 cm²',
          '18 cm²',
          '9 cm²'
        ],
        correctAnswer: 0,
        hint: 'A 6 kis háromszög mindegyikének területe T / 6.',
        explanation: 'T_kis = T / 6 = 72 / 6 = 12 cm².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Körülírt Sugár és Összetett Feladatok (Nehéz)',
    subtitle: 'R = abc / (4T) képlet, magasságok kiszámítása Hérónból, maximális terület és arányok.',
    range: '21 - 30. feladat',
    focus: 'Kombinált sugaras és területi számítások',
    questions: [
      {
        id: 'taq2-21',
        questionTypeBadge: 'Körülírt Sugár Kiszámítása',
        question: 'Egy háromszög oldalai a = 13 cm, b = 14 cm, c = 15 cm, és a területe T = 84 cm². Mekkora a körülírt körének sugara (R)?',
        figure: <HeronAndCirclesAreaSVG size={200} />,
        options: [
          '8.125 cm (65 / 8 cm)',
          '7.5 cm',
          '9 cm',
          '8.5 cm'
        ],
        correctAnswer: 0,
        hint: 'R = (a · b · c) / (4 · T) = (13 · 14 · 15) / (4 · 84).',
        explanation: 'R = (13 · 14 · 15) / (4 · 84) = 2730 / 336 = 8.125 cm = 65 / 8 cm.'
      },
      {
        id: 'taq2-22',
        questionTypeBadge: 'Magasság Hérón Területéből',
        question: 'A fenti (13, 14, 15) oldalú háromszögben (T = 84 cm²) mekkora a leghosszabb oldalhoz (c = 15 cm) tartozó m_c magasság?',
        options: [
          '11.2 cm',
          '12 cm',
          '10.5 cm',
          '9.8 cm'
        ],
        correctAnswer: 0,
        hint: 'm_c = (2 · T) / c = (2 · 84) / 15 = 168 / 15.',
        explanation: 'm_c = (2 · 84) / 15 = 168 / 15 = 11.2 cm.'
      },
      {
        id: 'taq2-23',
        questionTypeBadge: 'Legrövidebb Oldal Magassága',
        question: 'Ugyanebben a háromszögben (a = 13 cm, b = 14 cm, c = 15 cm, T = 84 cm²) melyik oldalhoz tartozik a leghosszabb magasság, és mekkora az?',
        options: [
          'Az a = 13 cm oldalhoz tartozik, és m_a = 168 / 13 ≈ 12.92 cm',
          'A c = 15 cm oldalhoz tartozik',
          'A b = 14 cm oldalhoz tartozik és 12 cm',
          'Mindhárom magasság egyenlő'
        ],
        correctAnswer: 0,
        hint: 'A legrövidebb oldalhoz tartozik mindig a leghosszabb magasság: m_a = 2T / a.',
        explanation: 'Mivel a = 13 cm a legrövidebb oldal, a hozzá tartozó magasság a legnagyobb: m_a = 2 · 84 / 13 = 168 / 13 ≈ 12.92 cm.'
      },
      {
        id: 'taq2-24',
        questionTypeBadge: 'Átfogóhoz Tartozó Magasság',
        question: 'Egy derékszögű háromszög befogói 15 cm és 20 cm (átfogója 25 cm). Mekkora a területe, és mekkora az átfogóhoz tartozó magassága?',
        options: [
          'T = 150 cm² és m_c = 12 cm',
          'T = 300 cm² és m_c = 12 cm',
          'T = 150 cm² és m_c = 10 cm',
          'T = 125 cm² és m_c = 12.5 cm'
        ],
        correctAnswer: 0,
        hint: 'T = (15 · 20) / 2 = 150 cm². m_c = (2 · T) / c = 300 / 25 = 12 cm.',
        explanation: 'T = (15 · 20) / 2 = 150 cm². Az átfogóhoz tartozó magasság: m_c = (15 · 20) / 25 = 300 / 25 = 12 cm.'
      },
      {
        id: 'taq2-25',
        questionTypeBadge: 'Szabályos Háromszög Oldala Területből',
        question: 'Egy szabályos háromszög területe T = 16√3 cm². Milyen hosszú az oldala (a)?',
        options: [
          '8 cm',
          '4 cm',
          '16 cm',
          '4√3 cm'
        ],
        correctAnswer: 0,
        hint: 'T = (a² · √3) / 4 = 16√3  =>  a² / 4 = 16  =>  a² = 64.',
        explanation: 'a² = 16 · 4 = 64, így az oldalhossz a = √64 = 8 cm.'
      },
      {
        id: 'taq2-26',
        questionTypeBadge: 'Szabályos Háromszög Sugarai Területből',
        question: 'Ha egy szabályos háromszög területe T = 9√3 cm² (oldala a = 6 cm), mekkora a beírt körének sugara (r)?',
        options: [
          '√3 cm ≈ 1.73 cm',
          '2√3 cm',
          '3 cm',
          '1.5 cm'
        ],
        correctAnswer: 0,
        hint: 's = 3 · 6 / 2 = 9 cm. r = T / s = (9√3) / 9 = √3 cm.',
        explanation: 'A félkerület s = 18 / 2 = 9 cm. A beírt kör sugara: r = T / s = (9√3) / 9 = √3 cm ≈ 1.73 cm.'
      },
      {
        id: 'taq2-27',
        questionTypeBadge: 'Maximális Terület Kerületből',
        question: 'Milyen háromszögnek van a legnagyobb területe az azonos kerületű (K) háromszögek közül?',
        options: [
          'A szabályos (egyenlő oldalú) háromszögnek',
          'A derékszögű háromszögnek',
          'A minél laposabb tompaszögű háromszögnek',
          'Bármely egyenlő szárú háromszögnek'
        ],
        correctAnswer: 0,
        hint: 'Az izoperimetrikus tétel szerint a legszimmetrikusabb alakzat zárja körbe a legnagyobb területet.',
        explanation: 'Adott kerület mellett a háromszögek közül a szabályos (egyenlő oldalú) háromszög rendelkezik a legnagyobb területtel.'
      },
      {
        id: 'taq2-28',
        questionTypeBadge: 'Egyenlő Szárú Alap Visszaszámítása',
        question: 'Egy egyenlő szárú háromszög szára b = 10 cm, és a területe T = 48 cm². Ha tudjuk, hogy a magassága m_a = 8 cm, mekkora az alapja (a)?',
        options: [
          '12 cm',
          '16 cm',
          '6 cm',
          '10 cm'
        ],
        correctAnswer: 0,
        hint: 'a = (2 · T) / m_a = 96 / 8 = 12 cm.',
        explanation: 'a = (2 · 48) / 8 = 96 / 8 = 12 cm. (Ellenőrzés Pitagorasszal: (12/2)² + 8² = 36 + 64 = 100 = 10².)'
      },
      {
        id: 'taq2-29',
        questionTypeBadge: 'Területi Összefüggés Bizonyítása',
        question: 'Miért egyenlő a háromszög területe a beírt kör sugarával szorozva a félkerülettel (T = r · s)?',
        options: [
          'Mert a beírt kör középpontját a csúcsokkal összekötve 3 kis háromszög keletkezik, melyek alapjai a, b, c, magasságuk pedig mind r',
          'Mert a beírt kör területe egyenlő a háromszög területével',
          'Mert a beírt kör felezi a háromszög kerületét',
          'Mert ez a Pitagorasz-tétel átrendezése'
        ],
        correctAnswer: 0,
        hint: 'T = (a·r)/2 + (b·r)/2 + (c·r)/2 = r · (a+b+c)/2 = r · s.',
        explanation: 'A beírt kör középpontja (I) az oldalaktól r távolságra van. A csúcsokat I-vel összekötve három olyan háromszöget kapunk, amelyek alapjai az oldalak, magasságuk r. Területük összege: (a·r + b·r + c·r)/2 = r · s = T.'
      },
      {
        id: 'taq2-30',
        questionTypeBadge: 'Hérón és Háromszög-egyenlőtlenség',
        question: 'Mi történik a Hérón-képlettel, ha olyan számokat (pl. 2, 3, 7) helyettesítünk be, amelyekből nem szerkeszthető háromszög?',
        options: [
          'A gyök alatt negatív szám keletkezik (nem értelmezhető valós területként)',
          'Nulla lesz az eredmény',
          'Pontos pozitív területet ad a fiktív síkidomra',
          'Végtelen nagy értéket kapunk'
        ],
        correctAnswer: 0,
        hint: 'Ha a + b < c, akkor s - c negatív lesz, miközben a többi tényező pozitív.',
        explanation: 'Ha a háromszög-egyenlőtlenség nem teljesül (pl. 2 + 3 = 5 < 7, s = 6), akkor (s - c) = 6 - 7 = -1 negatívvá válik, így a gyök alatti kifejezés negatív lesz, ami valós számként nem létezik.'
      }
    ]
  }
};

export const TriangleAreaQuiz: React.FC<TriangleAreaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="12. Háromszögek kerülete és területe"
      subtitle="Alap és magasság, derékszögű és szabályos háromszög, Hérón-képlet és a beírt/körülírt körök sugarai"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-haromszog-kerulet-terulet"
      themeColor="emerald"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA"
      storageKey="grade9-triangle-area-quiz"
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
            <TriangleAreaMatcher
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
            <TriangleAreaSorter
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
            title="Alap & Magasság Képletek"
            icon={<BaseAndHeightAreaSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Általános képlet:</strong> T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2</li>
              <li><strong>Magasság kifejezése:</strong> m_a = (2T) / a</li>
              <li><strong>Derékszögű háromszög:</strong> T = (a · b) / 2 (befogók szorzata felezve)</li>
              <li><strong>Derékszögű átfogó magassága:</strong> m_c = (a · b) / c</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Szabályos Háromszög Képletei"
            icon={<EquilateralTriangleAreaSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Magasság:</strong> m = (a · √3) / 2</li>
              <li><strong>Terület:</strong> T = (a² · √3) / 4</li>
              <li><strong>Beírt kör sugara:</strong> r = (a · √3) / 6 = m / 3</li>
              <li><strong>Körülírt kör sugara:</strong> R = (a · √3) / 3 = 2m / 3 = 2r</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="A Hérón-képlet (3 oldal)"
            icon={<HeronAndCirclesAreaSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Félkerület:</strong> s = (a + b + c) / 2</li>
              <li><strong>Képlet:</strong> T = √[s(s - a)(s - b)(s - c)]</li>
              <li><strong>Feltétel:</strong> a + b &gt; c (háromszög-egyenlőtlenség)</li>
              <li><strong>Előny:</strong> Nem igényel szöget vagy magasságot</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Sugaras Területképletek"
            icon={<Circle className="w-5 h-5 text-emerald-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Beírt kör sugara:</strong> T = r · s  ⇒  r = T / s</li>
              <li><strong>Körülírt kör sugara:</strong> T = (abc) / (4R)  ⇒  R = (abc) / (4T)</li>
              <li><strong>Középvonalak területe:</strong> T_kis = T / 4</li>
              <li><strong>Súlyvonalak területe:</strong> 6 darab T / 6 rész</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

