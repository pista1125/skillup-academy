import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GeometryProblemsMatcher } from './GeometryProblemsMatcher';
import { GeometryProblemsSorter } from './GeometryProblemsSorter';
import {
  RectangleAreaPerimeterSvg,
  RightTrianglePythagorasSvg,
  PolygonDiagonalsSvg,
  PathwayBorderProblemSvg
} from './GeometryProblemsFigures';

interface GeometryProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Téglalapok kerülete és területe',
    description: 'Félkerület: a + b = K / 2 ⟹ b = K / 2 - a. Terület: a · (K/2 - a) = T ⟹ a² - (K/2)a + T = 0.',
    note: 'Az egyenlet két gyöke (a₁ és a₂) pontosan a téglalap két oldalának hosszúságát adja.',
    color: 'from-emerald-500 to-teal-600',
    figure: <RectangleAreaPerimeterSvg size={220} />
  },
  {
    title: 'Derékszögű háromszög és Pitagorasz-tétel',
    description: 'a² + b² = c². Ha a befogók különbsége d: x² + (x + d)² = c² ⟹ 2x² + 2dx + (d² - c²) = 0.',
    note: 'A negatív gyököt azonnal kizárjuk, mert szakasz hossza kizárólag pozitív lehet.',
    color: 'from-blue-500 to-indigo-600',
    figure: <RightTrianglePythagorasSvg size={220} />
  },
  {
    title: 'Konvex sokszögek átlóinak száma',
    description: 'Képlet: A = n · (n - 3) / 2. Átrendezve másodfokúvá: n² - 3n - 2A = 0.',
    note: 'Geometriai kikötés: az oldalszámnak pozitív egész számnak kell lennie: n ∈ ℕ és n ≥ 3!',
    color: 'from-purple-500 to-violet-600',
    figure: <PolygonDiagonalsSvg size={220} />
  },
  {
    title: 'Szegélyek és kerti sétányok',
    description: 'Egy a × b méretű téglalap köré vont x széles ösvény: A = a + 2x, B = b + 2x. T_ösvény = (a + 2x)(b + 2x) - ab.',
    note: 'Ne feledd: a szélesség kétszer (2x) adódik hozzá, mert mindkét oldalon megjelenik az ösvény!',
    color: 'from-teal-500 to-cyan-600',
    figure: <PathwayBorderProblemSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Téglalapok és alap derékszögű háromszögek',
    subtitle: 'Kerület, terület, oldalak aránya és alapvető Pitagorasz-modellek.',
    range: '1–10. feladat',
    focus: 'Téglalapok és derékszögű háromszögek másodfokú felírása',
    questions: [
      {
        id: 'gq1-1',
        question: 'Egy téglalap egyik oldala 3 cm-rel hosszabb a másiknál. Területe 40 cm². Mekkora a rövidebb oldal?',
        options: [
          '5 cm',
          '8 cm',
          '4 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet: x(x + 3) = 40 ⟹ x² + 3x - 40 = 0. A gyökök: x₁ = 5, x₂ = -8. Mivel oldal nem lehet negatív, a rövidebb oldal 5 cm (a hosszabb 8 cm).'
      },
      {
        id: 'gq1-2',
        question: 'Egy téglalap kerülete 34 cm, területe 60 cm². Melyik másodfokú egyenlet modellezi helyesen a feladatot?',
        options: [
          'x² - 17x + 60 = 0',
          'x² - 34x + 60 = 0',
          'x² + 17x - 60 = 0',
          '2x² - 17x + 60 = 0'
        ],
        correctAnswer: 0,
        explanation: 'Félkerület: a + b = 34 / 2 = 17 ⟹ b = 17 - x. Terület: x(17 - x) = 60 ⟹ 17x - x² = 60 ⟹ x² - 17x + 60 = 0.'
      },
      {
        id: 'gq1-3',
        question: 'Mekkorák a 34 cm kerületű és 60 cm² területű téglalap oldalai?',
        options: [
          '5 cm és 12 cm',
          '6 cm és 10 cm',
          '4 cm és 15 cm',
          '3 cm és 20 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az x² - 17x + 60 = 0 gyökei: x₁ = 5 és x₂ = 12. Ellenőrzés: K = 2(5 + 12) = 34 cm, T = 5 · 12 = 60 cm².'
      },
      {
        id: 'gq1-4',
        question: 'Egy derékszögű háromszög befogói x és x + 2 cm, átfogója 10 cm. Mekkora a rövidebb befogó?',
        options: [
          '6 cm',
          '8 cm',
          '5 cm',
          '4 cm'
        ],
        correctAnswer: 0,
        explanation: 'Pitagorasz-tétel: x² + (x + 2)² = 10² ⟹ x² + x² + 4x + 4 = 100 ⟹ 2x² + 4x - 96 = 0 ⟹ x² + 2x - 48 = 0. Gyökök: x₁ = 6, x₂ = -8. A rövidebb befogó 6 cm.'
      },
      {
        id: 'gq1-5',
        question: 'Egy négyzet oldalát 4 cm-rel növelve területe 56 cm²-rel nő. Mekkora volt az eredeti négyzet oldala?',
        options: [
          '5 cm',
          '4 cm',
          '6 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: '(x + 4)² - x² = 56 ⟹ x² + 8x + 16 - x² = 56 ⟹ 8x = 40 ⟹ x = 5 cm.'
      },
      {
        id: 'gq1-6',
        question: 'Egy téglalap oldalaránya 3:4, területe 108 cm². Mekkora a téglalap átlója?',
        options: [
          '15 cm',
          '12 cm',
          '20 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        explanation: 'Oldalak: 3x és 4x. Terület: 3x · 4x = 12x² = 108 ⟹ x² = 9 ⟹ x = 3 cm. Az oldalak 9 cm és 12 cm. Átló: d = √(9² + 12²) = √(81 + 144) = √225 = 15 cm.'
      },
      {
        id: 'gq1-7',
        question: 'Egy derékszögű háromszög átfogója 17 cm, egyik befogója 7 cm-rel hosszabb a másiknál. Mekkorák a befogók?',
        options: [
          '8 cm és 15 cm',
          '7 cm és 14 cm',
          '9 cm és 16 cm',
          '6 cm és 13 cm'
        ],
        correctAnswer: 0,
        explanation: 'x² + (x + 7)² = 17² ⟹ 2x² + 14x + 49 = 289 ⟹ 2x² + 14x - 240 = 0 ⟹ x² + 7x - 120 = 0. Gyökök: x₁ = 8, x₂ = -15. A befogók: 8 cm és 15 cm.'
      },
      {
        id: 'gq1-8',
        question: 'Egy téglalap alakú telek területe 300 m², kerülete 70 m. Mekkorák a telek oldalai?',
        options: [
          '15 m és 20 m',
          '10 m és 30 m',
          '12 m és 25 m',
          '5 m és 60 m'
        ],
        correctAnswer: 0,
        explanation: 'Félkerület: 35 m. Egyenlet: x(35 - x) = 300 ⟹ x² - 35x + 300 = 0. Gyökök: x₁ = 15, x₂ = 20 m. Mindkét gyök a telek egy-egy oldalhossza.'
      },
      {
        id: 'gq1-9',
        question: 'Egy derékszögű háromszög területe 24 cm², egyik befogója 2 cm-rel rövidebb a másiknál. Mekkora a hosszabb befogó?',
        options: [
          '8 cm',
          '6 cm',
          '10 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        explanation: 'Terület: a · b / 2 = 24 ⟹ a · b = 48. Ha a hosszabbik x, akkor x(x - 2) = 48 ⟹ x² - 2x - 48 = 0. Gyökök: x₁ = 8, x₂ = -6. A hosszabb befogó 8 cm (a rövidebb 6 cm).'
      },
      {
        id: 'gq1-10',
        question: 'Miért nem lehet egy 30 cm kerületű téglalap területe 60 cm²?',
        options: [
          'Mert a diszkrimináns negatív (D = 225 - 240 = -15 < 0)',
          'Mert a téglalap oldalai nem lehetnek egészek',
          'Mert a kerület páros szám',
          'Mert a kerületnek nagyobbnak kell lennie a területnél'
        ],
        correctAnswer: 0,
        explanation: 'Félkerület: 15 cm. Egyenlet: x(15 - x) = 60 ⟹ x² - 15x + 60 = 0. D = 15² - 4 · 1 · 60 = 225 - 240 = -15 < 0. Mivel D < 0, nincs ilyen valós téglalap (a maximális terület 7,5² = 56,25 cm² lehetne).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Sokszögek átlói, szegélyek és összetett síkidomok',
    subtitle: 'Konvex sokszögek átlóképlete, kerti ösvények és téglalapátlók vizsgálata.',
    range: '11–20. feladat',
    focus: 'Átlószám és kerti sétányok modellezése',
    questions: [
      {
        id: 'gq2-1',
        question: 'Hány átlója van egy konvex nyolcszögnek?',
        options: [
          '20 db',
          '24 db',
          '16 db',
          '28 db'
        ],
        correctAnswer: 0,
        explanation: 'Képlet: A = n(n - 3) / 2 = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 20 db átló.'
      },
      {
        id: 'gq2-2',
        question: 'Hány oldalú az a konvex sokszög, amelynek 35 átlója van?',
        options: [
          '10 oldalú (tízszög)',
          '9 oldalú (kilencszög)',
          '12 oldalú (tizenkétszög)',
          '8 oldalú (nyolcszög)'
        ],
        correctAnswer: 0,
        explanation: 'n(n - 3) / 2 = 35 ⟹ n² - 3n = 70 ⟹ n² - 3n - 70 = 0. Gyökök: n₁ = 10, n₂ = -7. A sokszög 10 oldalú.'
      },
      {
        id: 'gq2-3',
        question: 'Hány oldalú az a sokszög, amelynek 14 átlója van?',
        options: [
          '7 oldalú (hétszög)',
          '6 oldalú (hatszög)',
          '8 oldalú (nyolcszög)',
          '5 oldalú (ötszög)'
        ],
        correctAnswer: 0,
        explanation: 'n(n - 3) / 2 = 14 ⟹ n² - 3n - 28 = 0. Gyökök: (3 ± √(9 + 112))/2 = (3 ± 11)/2 ⟹ n₁ = 7, n₂ = -4. A megoldás: 7 oldalú sokszög.'
      },
      {
        id: 'gq2-4',
        question: 'Egy 8×5 méteres virágágyás köré minden oldalon x méter széles járdát építenek. A virágágyás és a járda együttes területe 70 m². Milyen egyenlet írja le a feladatot?',
        options: [
          '(8 + 2x)(5 + 2x) = 70',
          '(8 + x)(5 + x) = 70',
          '8 · 5 + 4x = 70',
          '2(8 + 2x) + 2(5 + 2x) = 70'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a járda a virágágyás mindkét szélén megjelenik, az új méretek: 8 + 2x és 5 + 2x. A teljes terület: (8 + 2x)(5 + 2x) = 70.'
      },
      {
        id: 'gq2-5',
        question: 'Mekkora az x szélessége a fenti járdának ((8 + 2x)(5 + 2x) = 70)?',
        options: [
          '1 méter',
          '0,5 méter',
          '1,5 méter',
          '2 méter'
        ],
        correctAnswer: 0,
        explanation: '4x² + 26x + 40 = 70 ⟹ 4x² + 26x - 30 = 0 ⟹ 2x² + 13x - 15 = 0. D = 169 + 120 = 289 = 17². x₁,₂ = (-13 ± 17) / 4 ⟹ x₁ = 1 m, x₂ = -7,5 m. A járda szélessége 1 m.'
      },
      {
        id: 'gq2-6',
        question: 'Egy téglalap átlója 25 cm, egyik oldala 17 cm-rel hosszabb a másiknál. Mekkorák a téglalap oldalai?',
        options: [
          '7 cm és 24 cm',
          '8 cm és 25 cm',
          '15 cm és 20 cm',
          '9 cm és 26 cm'
        ],
        correctAnswer: 0,
        explanation: 'x² + (x + 17)² = 25² ⟹ 2x² + 34x + 289 = 625 ⟹ 2x² + 34x - 336 = 0 ⟹ x² + 17x - 168 = 0. Gyökök: x₁ = 7, x₂ = -24. Az oldalak: 7 cm és 24 cm.'
      },
      {
        id: 'gq2-7',
        question: 'Hány átlója van annak a sokszögnek, amelynek kétszer annyi átlója van, mint ahány oldala?',
        options: [
          '14 db átlója (7 oldalú sokszög)',
          '10 db átlója (5 oldalú sokszög)',
          '20 db átlója (8 oldalú sokszög)',
          '9 db átlója (6 oldalú sokszög)'
        ],
        correctAnswer: 0,
        explanation: 'Feltétel: n(n - 3) / 2 = 2n. Mivel n ≥ 3, oszthatunk n-nel: (n - 3) / 2 = 2 ⟹ n - 3 = 4 ⟹ n = 7 oldalú. Az átlók száma: 2 · 7 = 14 db.'
      },
      {
        id: 'gq2-8',
        question: 'Egy derékszögű háromszög átfogója 2 cm-rel hosszabb a hosszabbik befogónál. A rövidebb befogó 10 cm. Mekkora az átfogó?',
        options: [
          '26 cm',
          '24 cm',
          '25 cm',
          '30 cm'
        ],
        correctAnswer: 0,
        explanation: 'Befogók: 10 és x. Átfogó: x + 2. Pitagorasz: 10² + x² = (x + 2)² ⟹ 100 + x² = x² + 4x + 4 ⟹ 4x = 96 ⟹ x = 24 cm. Az átfogó: 24 + 2 = 26 cm.'
      },
      {
        id: 'gq2-9',
        question: 'Egy téglalap alakú kép területe 192 cm². Ha a hosszúságát 4 cm-rel növelnénk, a szélességét 2 cm-rel csökkentenénk, területe nem változna. Mekkorák a kép eredeti méretei?',
        options: [
          '16 cm és 12 cm',
          '24 cm és 8 cm',
          '18 cm és 10 cm',
          '14 cm és 13 cm'
        ],
        correctAnswer: 0,
        explanation: 'a · b = 192 ⟹ b = 192 / a. Új terület: (a + 4)(b - 2) = 192 ⟹ ab - 2a + 4b - 8 = 192 ⟹ -2a + 4(192/a) - 8 = 0 ⟹ -2a² - 8a + 768 = 0 ⟹ a² + 4a - 384 = 0. Gyökök: a = 16 (és a = -24). Méretek: 16 cm és 12 cm.'
      },
      {
        id: 'gq2-10',
        question: 'Létezik-e olyan konvex sokszög, amelynek pontosan 25 darab átlója van?',
        options: [
          'Nem, mert n(n - 3) / 2 = 25 egyenletnek nincs egész megoldása',
          'Igen, a 8 oldalú sokszög',
          'Igen, a 9 oldalú sokszög',
          'Nem, mert a sokszögek átlóinak száma mindig páros'
        ],
        correctAnswer: 0,
        explanation: 'n(n - 3) / 2 = 25 ⟹ n² - 3n - 50 = 0. D = 9 - 4(1)(-50) = 209. Mivel a 209 nem négyzetszám (√209 ≈ 14,46), n nem egész szám. Így nem létezik 25 átlójú sokszög.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű és összetett geometriai feladványok',
    subtitle: 'Trapézok, dobozkészítés kivágással, húrnégyszögek és összetett szélsőértékek.',
    range: '21–30. feladat',
    focus: 'Összetett geometriai modellek és feltételvizsgálat',
    questions: [
      {
        id: 'gq3-1',
        question: 'Egy 20×15 cm-es kartonlap mind a négy sarkából azonos x cm oldalhosszúságú négyzeteket vágunk ki, és a széleket felhajtva felül nyitott dobozt készítünk. Milyen x értékek megengedettek geometriailag?',
        options: [
          '0 < x < 7,5 cm',
          '0 < x < 15 cm',
          '0 < x < 10 cm',
          'x tetszőleges pozitív szám lehet'
        ],
        correctAnswer: 0,
        explanation: 'A doboz alaplapjának méretei: 20 - 2x és 15 - 2x. Mindkettőnek pozitívnak kell lennie: 15 - 2x > 0 ⟹ 2x < 15 ⟹ x < 7,5 cm. Tehát 0 < x < 7,5 cm.'
      },
      {
        id: 'gq3-2',
        question: 'A fenti 20×15 cm-es lapból készített doboz alaplapjának területe 104 cm². Mekkora a kivágott saroknégyzet oldala (x)?',
        options: [
          '3 cm',
          '2 cm',
          '4 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        explanation: '(20 - 2x)(15 - 2x) = 104 ⟹ 300 - 70x + 4x² = 104 ⟹ 4x² - 70x + 196 = 0 ⟹ 2x² - 35x + 98 = 0. D = 1225 - 784 = 441 = 21². x₁,₂ = (35 ± 21) / 4 ⟹ x₁ = 3,5 cm, x₂ = 14 cm. Mivel x < 7,5 cm, a megoldás x = 3,5 cm.'
      },
      {
        id: 'gq3-3',
        question: 'Egy derékszögű trapéz alapjai 18 cm és 10 cm. Ferde szára 2 cm-rel hosszabb a derékszögű száránál (magasságánál). Mekkora a trapéz magassága?',
        options: [
          '15 cm',
          '12 cm',
          '16 cm',
          '14 cm'
        ],
        correctAnswer: 0,
        explanation: 'A magasság behúzásával egy derékszögű háromszög keletkezik, melynek egyik befogója 18 - 10 = 8 cm, másik befogója a magasság (m), átfogója m + 2. Pitagorasz: 8² + m² = (m + 2)² ⟹ 64 + m² = m² + 4m + 4 ⟹ 4m = 60 ⟹ m = 15 cm.'
      },
      {
        id: 'gq3-4',
        question: 'Egy egyenlő szárú háromszög alapja 12 cm. Szára 3 cm-rel hosszabb az alaphoz tartozó magasságánál. Mekkora a magasság?',
        options: [
          '4 cm',
          '5 cm',
          '4,5 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az alap felével (6 cm) és a magassággal (m) derékszögű háromszöget képezünk: 6² + m² = (m + 3)² ⟹ 36 + m² = m² + 6m + 9 ⟹ 6m = 27 ⟹ m = 4,5 cm.'
      },
      {
        id: 'gq3-5',
        question: 'Melyik konvex sokszögnek van pontosan háromszor annyi átlója, mint ahány oldala?',
        options: [
          '9 oldalú (kilencszög)',
          '8 oldalú (nyolcszög)',
          '10 oldalú (tízszög)',
          '12 oldalú (tizenkétszög)'
        ],
        correctAnswer: 0,
        explanation: 'n(n - 3) / 2 = 3n ⟹ n - 3 = 6 ⟹ n = 9 oldalú sokszög. Ellenőrzés: 9 · 6 / 2 = 27 = 3 · 9.'
      },
      {
        id: 'gq3-6',
        question: 'Egy rombusz átlóinak különbsége 4 cm, oldala 10 cm. Mekkorák a rombusz átlói?',
        options: [
          '12 cm és 16 cm',
          '10 cm és 14 cm',
          '8 cm és 12 cm',
          '14 cm és 18 cm'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz átlói felezik egymást és merőlegesek. Legyenek a félátlók x és x + 2. Pitagorasz: x² + (x + 2)² = 10² ⟹ 2x² + 4x + 4 = 100 ⟹ x² + 2x - 48 = 0. Gyökök: x = 6 cm. Félátlók: 6 cm és 8 cm, így az átlók: 12 cm és 16 cm.'
      },
      {
        id: 'gq3-7',
        question: 'Egy derékszögű háromszög területe 60 cm², átfogója 17 cm. Mekkora a befogók összege (a + b)?',
        options: [
          '23 cm',
          '21 cm',
          '25 cm',
          '24 cm'
        ],
        correctAnswer: 0,
        explanation: 'Tudjuk: a² + b² = 17² = 289 és a · b = 120 (mivel ab/2 = 60). Figyeld meg az azonosságot: (a + b)² = a² + 2ab + b² = 289 + 2(120) = 289 + 240 = 529 = 23². Mivel a + b > 0, ezért a + b = 23 cm (a befogók 8 és 15 cm).'
      },
      {
        id: 'gq3-8',
        question: 'Egy téglalap alakú szoba padlóját 200 darab egyforma négyzet alakú járólappal burkolják. Ha a lapok oldalhossza 5 cm-rel nagyobb lenne, 72 darabbal kevesebb lap is elég lenne. Mekkora az eredeti járólap oldala?',
        options: [
          '20 cm',
          '25 cm',
          '15 cm',
          '30 cm'
        ],
        correctAnswer: 0,
        explanation: 'A szoba területe: 200 · x² = (200 - 72) · (x + 5)² ⟹ 200x² = 128(x² + 10x + 25) ⟹ 200x² = 128x² + 1280x + 3200 ⟹ 72x² - 1280x - 3200 = 0 ⟹ 9x² - 160x - 400 = 0. D = 25600 + 14400 = 40000 = 200². x = (160 + 200) / 18 = 360 / 18 = 20 cm.'
      },
      {
        id: 'gq3-9',
        question: 'Egy körbe írt téglalap területe 48 cm², a kör sugara R = 5 cm. Mekkorák a téglalap oldalai?',
        options: [
          '6 cm és 8 cm',
          '5 cm és 9,6 cm',
          '4 cm és 12 cm',
          '3 cm és 16 cm'
        ],
        correctAnswer: 0,
        explanation: 'A körbe írt téglalap átlója megegyezik a kör átmérőjével: d = 2R = 10 cm. Pitagorasz: a² + b² = 100 és a · b = 48. (a + b)² = 100 + 96 = 196 ⟹ a + b = 14. Az x² - 14x + 48 = 0 gyökei: 6 és 8 cm.'
      },
      {
        id: 'gq3-10',
        question: 'Hány oldalú az a konvex sokszög, amelynek oldalszáma és átlóinak száma együtt 66-ot tesz ki?',
        options: [
          '12 oldalú (tizenkétszög)',
          '11 oldalú (tizenegyszög)',
          '10 oldalú (tízszög)',
          '13 oldalú'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet: n + n(n - 3) / 2 = 66 ⟹ 2n + n² - 3n = 132 ⟹ n² - n - 132 = 0. D = 1 - 4(1)(-132) = 1 + 528 = 529 = 23². n = (1 + 23) / 2 = 12 (és n = -11 kiesik). A sokszög 12 oldalú.'
      }
    ]
  }
};

export const GeometryProblemsQuiz: React.FC<GeometryProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Szöveges Feladatok Geometriából"
      subtitle="Téglalapok, derékszögű háromszögek, sokszögek átlói és kerti sétányok másodfokú modellezése"
      topicId="g10-quad-szoveges-geometria"
      topicTitle="Geometriai szöveges feladatok"
      badge="10. Osztály • V. Témakör • 35. Lecke"
      color="emerald"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <GeometryProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
          topicId="g10-quad-szoveges-geometria"
        />
      }
      sorterComponent={
        <GeometryProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
          topicId="g10-quad-szoveges-geometria"
        />
      }
    />
  );
};

