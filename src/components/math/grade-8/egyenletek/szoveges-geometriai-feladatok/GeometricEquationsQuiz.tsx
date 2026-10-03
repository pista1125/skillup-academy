import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Shapes,
  Maximize2,
  Triangle,
  Square,
  Compass,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { GeometricEquationsMatcher } from './GeometricEquationsMatcher';
import { GeometricEquationsSorter } from './GeometricEquationsSorter';

interface GeometricEquationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Háromszög Belső és Külső Szögei',
    icon: <Triangle className="w-4 h-4 text-emerald-600" />,
    formula: '\\alpha + \\beta + \\gamma = 180^\\circ \\quad | \\quad \\alpha\' = \\beta + \\gamma',
    note: 'Bármely háromszög belső szögösszege 180°. Derékszögűben a hegyesszögek pótszögek: α + β = 90°.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="20,38 135,38 75,10" className="fill-emerald-50 stroke-emerald-500 stroke-[1.5]" />
        <path d="M 32 38 A 12 12 0 0 0 28 32" className="stroke-emerald-600 stroke-[1.5] fill-none" />
        <text x="36" y="34" className="text-[8px] font-bold fill-emerald-800">α</text>
        <path d="M 123 38 A 12 12 0 0 1 125 32" className="stroke-emerald-600 stroke-[1.5] fill-none" />
        <text x="114" y="34" className="text-[8px] font-bold fill-emerald-800">β</text>
        <text x="75" y="24" className="text-[8px] font-bold fill-emerald-800" textAnchor="middle">γ</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Téglalap Kerülete és Területe',
    icon: <Square className="w-4 h-4 text-blue-600" />,
    formula: 'K = 2(a + b) \\quad | \\quad T = a \\cdot b',
    note: 'Ha az egyik oldal x, a d-vel hosszabb oldal x + d. Kerület felírása: 2(x + x + d) = K.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="30" y="10" width="100" height="26" rx="2" className="fill-blue-50 stroke-blue-500 stroke-[1.5]" />
        <text x="80" y="8" className="text-[8px] font-bold fill-blue-700" textAnchor="middle">a (x + d)</text>
        <text x="80" y="44" className="text-[8px] font-bold fill-blue-700" textAnchor="middle">T = a · b</text>
        <text x="135" y="26" className="text-[8px] font-bold fill-blue-700">b (x)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Konvex n-szög Belső Szögösszege',
    icon: <Shapes className="w-4 h-4 text-indigo-600" />,
    formula: 'S_n = (n - 2) \\cdot 180^\\circ',
    note: 'Egy csúcsból n - 3 átló húzható, ami n - 2 darab háromszögre bontja a sokszöget.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="55,10 105,10 125,36 35,36" className="fill-indigo-50 stroke-indigo-500 stroke-[1.5]" />
        <line x1="35" y1="36" x2="105" y2="10" className="stroke-indigo-400 stroke-dasharray-[2,2]" />
        <text x="80" y="27" className="text-[8px] font-bold fill-indigo-800" textAnchor="middle">Δ₁ + Δ₂</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Konvex Sokszög Átlóinak Száma',
    icon: <Compass className="w-4 h-4 text-amber-600" />,
    formula: '\\text{Á} = \\frac{n(n - 3)}{2}',
    note: 'Minden csúcsból n - 3 átló indul, és minden átlónak két végpontja van, ezért osztunk 2-vel.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="80,8 115,22 100,40 60,40 45,22" className="fill-amber-50 stroke-amber-500 stroke-[1.5]" />
        <line x1="80" y1="8" x2="100" y2="40" className="stroke-amber-400 stroke-[1]" />
        <line x1="80" y1="8" x2="60" y2="40" className="stroke-amber-400 stroke-[1]" />
        <text x="80" y="27" className="text-[8px] font-bold fill-amber-800" textAnchor="middle">5 átló</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Trapéz Területe',
    icon: <Maximize2 className="w-4 h-4 text-rose-600" />,
    formula: 'T = \\frac{a + c}{2} \\cdot m',
    note: 'A két párhuzamos alap számtani közepe szorozva a magassággal.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="50,10 110,10 135,38 25,38" className="fill-rose-50 stroke-rose-500 stroke-[1.5]" />
        <line x1="50" y1="10" x2="50" y2="38" className="stroke-rose-600 stroke-[1.2] stroke-dasharray-[2,2]" />
        <text x="80" y="8" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">c (fedőlap)</text>
        <text x="80" y="44" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">a (alap)</text>
        <text x="54" y="26" className="text-[7.5px] font-bold fill-rose-700">m</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Területváltozási Modell (x² kiesése)',
    icon: <Sparkles className="w-4 h-4 text-cyan-600" />,
    formula: '(a + d_1)(b + d_2) - a \\cdot b = \\Delta T',
    note: 'Zárójelbontáskor az x² tag mindig kiesik a két oldalon, így tiszta elsőfokú egyenletet kapunk!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="70" height="24" className="fill-cyan-100 stroke-cyan-600 stroke-[1]" />
        <rect x="95" y="12" width="40" height="24" className="fill-cyan-200 stroke-cyan-600 stroke-[1] stroke-dasharray-[2,2]" />
        <text x="60" y="27" className="text-[8px] font-bold fill-cyan-800" textAnchor="middle">T_eredeti</text>
        <text x="115" y="27" className="text-[8px] font-bold fill-cyan-900" textAnchor="middle">+ΔT</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapozó Geometriai Egyenletek',
    subtitle: 'Szögek összege, pótszögek, téglalap és négyzet alaptulajdonságai',
    questions: [
      {
        id: 'g8-eq-geo-l1-q1',
        title: 'Háromszög szögeinek aránya',
        question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5. Mekkora a háromszög legnagyobb szöge?',
        options: ['90°', '80°', '100°', '75°'],
        correctAnswer: '90°',
        explanation: 'A belső szögek összege 180°: 2x + 3x + 5x = 180° => 10x = 180° => x = 18°. A legnagyobb szög: 5 · 18° = 90° (derékszögű háromszög!).'
      },
      {
        id: 'g8-eq-geo-l1-q2',
        title: 'Derékszögű háromszög hegyesszöge',
        question: 'Egy derékszögű háromszög egyik hegyesszöge 28°. Mekkora a másik hegyesszöge?',
        options: ['62°', '72°', '52°', '68°'],
        correctAnswer: '62°',
        explanation: 'A derékszögű háromszög két hegyesszöge pótszög, összegük 90°: 90° - 28° = 62°.'
      },
      {
        id: 'g8-eq-geo-l1-q3',
        title: 'Téglalap oldalai a kerületből',
        question: 'Egy téglalap kerülete 48 cm. Az egyik oldala 6 cm-rel hosszabb a másiknál. Mekkora a rövidebbik oldal?',
        options: ['9 cm', '12 cm', '15 cm', '8 cm'],
        correctAnswer: '9 cm',
        explanation: 'K = 2(a + b) => 2(x + x + 6) = 48 => 2(2x + 6) = 48 => 4x + 12 = 48 => 4x = 36 => x = 9 cm (oldalak: 9 cm és 15 cm).'
      },
      {
        id: 'g8-eq-geo-l1-q4',
        title: 'Egyenlő szárú háromszög szárszöge',
        question: 'Egy egyenlő szárú háromszög alapon fekvő szögei 55°-osak. Mekkora a szárszöge?',
        options: ['70°', '80°', '65°', '75°'],
        correctAnswer: '70°',
        explanation: 'Az alapon fekvő két szög egyenlő: 55° + 55° = 110°. A szárszög: 180° - 110° = 70°.'
      },
      {
        id: 'g8-eq-geo-l1-q5',
        title: 'Négyzet területe a kerületből',
        question: 'Egy négyzet kerülete 52 cm. Mekkora a területe?',
        options: ['169 cm²', '144 cm²', '196 cm²', '121 cm²'],
        correctAnswer: '169 cm²',
        explanation: 'K = 4a => 4a = 52 => a = 13 cm. Terület: T = a² = 13² = 169 cm².'
      },
      {
        id: 'g8-eq-geo-l1-q6',
        title: 'Konvex hatszög belső szögei',
        question: 'Hány fok a konvex hatszög belső szögeinek összege?',
        options: ['720°', '540°', '900°', '1080°'],
        correctAnswer: '720°',
        explanation: 'S_n = (n - 2) · 180°. Hatszög esetén (6 - 2) · 180° = 4 · 180° = 720°.'
      },
      {
        id: 'g8-eq-geo-l1-q7',
        title: 'Konvex ötszög átlói',
        question: 'Hány átlója van összesen egy konvex ötszögnek?',
        options: ['5', '8', '10', '4'],
        correctAnswer: '5',
        explanation: 'Á = (n · (n - 3)) / 2 => (5 · (5 - 3)) / 2 = (5 · 2) / 2 = 5 átló.'
      },
      {
        id: 'g8-eq-geo-l1-q8',
        title: 'Háromszög szögei adott szög mellett',
        question: 'Egy háromszög egyik szöge 40°, a másik két szögének aránya 3 : 4. Mekkora a legnagyobb szög?',
        options: ['80°', '70°', '90°', '60°'],
        correctAnswer: '80°',
        explanation: 'A két maradék szög összege: 180° - 40° = 140°. 3x + 4x = 140° => 7x = 140° => x = 20°. Szögek: 3 · 20° = 60° és 4 · 20° = 80°.'
      },
      {
        id: 'g8-eq-geo-l1-q9',
        title: 'Téglalap arányos oldalai',
        question: 'Egy téglalap kerülete 36 cm, oldalainak aránya 1 : 2. Mekkorák az oldalai?',
        options: ['6 cm és 12 cm', '4 cm és 8 cm', '5 cm és 10 cm', '8 cm és 16 cm'],
        correctAnswer: '6 cm és 12 cm',
        explanation: 'Oldalak x és 2x. Kerület: 2(x + 2x) = 36 => 2 · 3x = 36 => 6x = 36 => x = 6 cm. Másik oldal: 2 · 6 = 12 cm.'
      },
      {
        id: 'g8-eq-geo-l1-q10',
        title: 'Háromszög külső és belső szöge',
        question: 'Egy háromszög egyik külső szöge 125°. Mekkora a vele szomszédos belső szög?',
        options: ['55°', '65°', '45°', '35°'],
        correctAnswer: '55°',
        explanation: 'A belső szög és a mellette fekvő külső szög mellékszögek, összegük 180°: 180° - 125° = 55°.'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorló Geometriai Feladatok',
    subtitle: 'Oldalváltoztatások, trapéz területe, egyenlő szárú háromszög és sokszögek',
    questions: [
      {
        id: 'g8-eq-geo-l2-q1',
        title: 'Téglalap területnövelése',
        question: 'Egy téglalap egyik oldala 4 cm-rel hosszabb a másiknál. Ha mindkét oldalt 2 cm-rel megnöveljük, területe 40 cm²-rel nő. Mekkora volt az eredeti rövidebb oldal?',
        options: ['7 cm', '6 cm', '8 cm', '9 cm'],
        correctAnswer: '7 cm',
        explanation: 'Eredeti oldalak: x és x + 4. Új oldalak: x + 2 és x + 6. (x + 2)(x + 6) - x(x + 4) = 40 => x² + 8x + 12 - x² - 4x = 40 => 4x + 12 = 40 => 4x = 28 => x = 7 cm.'
      },
      {
        id: 'g8-eq-geo-l2-q2',
        title: 'Egyenlő szárú háromszög kerülete',
        question: 'Egy egyenlő szárú háromszög kerülete 34 cm. A szára 5 cm-rel hosszabb az alapjánál. Mekkora az alapja?',
        options: ['8 cm', '13 cm', '10 cm', '6 cm'],
        correctAnswer: '8 cm',
        explanation: 'Alap: x, szárak: x + 5. Kerület: x + 2(x + 5) = 34 => 3x + 10 = 34 => 3x = 24 => x = 8 cm. (A szárak 13 cm-esek).'
      },
      {
        id: 'g8-eq-geo-l2-q3',
        title: 'Négyzet oldalának növelése',
        question: 'Egy négyzet oldalát 3 cm-rel megnöveljük, így a területe 39 cm²-rel lesz nagyobb. Mekkora volt az eredeti négyzet oldala?',
        options: ['5 cm', '6 cm', '4 cm', '7 cm'],
        correctAnswer: '5 cm',
        explanation: '(x + 3)² - x² = 39 => x² + 6x + 9 - x² = 39 => 6x + 9 = 39 => 6x = 30 => x = 5 cm.'
      },
      {
        id: 'g8-eq-geo-l2-q4',
        title: 'Trapéz alapjainak meghatározása',
        question: 'Egy trapéz területe 60 cm², magassága 6 cm. Az egyik párhuzamos alapja kétszerese a másiknak. Mekkora a hosszabbik alap?',
        options: ['13,33 cm (40/3 cm)', '15 cm', '12 cm', '16 cm'],
        correctAnswer: '13,33 cm (40/3 cm)',
        explanation: 'T = ((a + c) · m) / 2 => 60 = ((x + 2x) · 6) / 2 => 60 = 3x · 3 = 9x => x = 60 / 9 = 20 / 3 cm. A hosszabb alap: 2 · (20/3) = 40/3 ≈ 13,33 cm.'
      },
      {
        id: 'g8-eq-geo-l2-q5',
        title: 'Sokszög belső szögösszegből',
        question: 'Melyik az a konvex sokszög, amelynek belső szögeinek összege 1440°?',
        options: ['Tízszög (n = 10)', 'Nyolcszög (n = 8)', 'Kilencszög (n = 9)', 'Tizenkétszög (n = 12)'],
        correctAnswer: 'Tízszög (n = 10)',
        explanation: '(n - 2) · 180° = 1440° => n - 2 = 1440 / 180 = 8 => n = 10 (tízszög).'
      },
      {
        id: 'g8-eq-geo-l2-q6',
        title: 'Sokszög oldalszáma átlókból',
        question: 'Hány oldalú az a konvex sokszög, amelynek összesen 14 átlója van?',
        options: ['7 oldalú (hétszög)', '6 oldalú (hatszög)', '8 oldalú (nyolcszög)', '9 oldalú (kilencszög)'],
        correctAnswer: '7 oldalú (hétszög)',
        explanation: 'n(n - 3) / 2 = 14 => n(n - 3) = 28. Mivel 7 · 4 = 28, ezért n = 7.'
      },
      {
        id: 'g8-eq-geo-l2-q7',
        title: 'Derékszögű háromszög hegyesszögei különbséggel',
        question: 'Egy derékszögű háromszög egyik hegyesszöge 24°-kal nagyobb a másiknál. Mekkora a kisebbik hegyesszög?',
        options: ['33°', '57°', '38°', '28°'],
        correctAnswer: '33°',
        explanation: 'x + (x + 24°) = 90° => 2x + 24° = 90° => 2x = 66° => x = 33°. (A másik szög 57°).'
      },
      {
        id: 'g8-eq-geo-l2-q8',
        title: 'Téglalap arányos oldalai és területe',
        question: 'Egy téglalap hossza 3-szorosa a szélességének. Kerülete 64 cm. Mekkora a területe?',
        options: ['192 cm²', '144 cm²', '216 cm²', '256 cm²'],
        correctAnswer: '192 cm²',
        explanation: '2(x + 3x) = 64 => 8x = 64 => x = 8 cm. Oldalak: 8 cm és 24 cm. Terület: 8 · 24 = 192 cm².'
      },
      {
        id: 'g8-eq-geo-l2-q9',
        title: 'Szimmetrikus trapéz szárai',
        question: 'Egy szimmetrikus trapéz kerülete 38 cm, párhuzamos alapjai 15 cm és 7 cm. Mekkorák a szárai?',
        options: ['8 cm', '7 cm', '9 cm', '6 cm'],
        correctAnswer: '8 cm',
        explanation: 'K = a + c + 2b => 38 = 15 + 7 + 2b => 38 = 22 + 2b => 2b = 16 => b = 8 cm.'
      },
      {
        id: 'g8-eq-geo-l2-q10',
        title: 'Háromszög szögei különbséggel',
        question: 'Egy háromszög egyik szöge 20°-kal, a harmadik 40°-kal nagyobb a legkisebb szögnél. Mekkora a legkisebb szög?',
        options: ['40°', '35°', '50°', '45°'],
        correctAnswer: '40°',
        explanation: 'x + (x + 20°) + (x + 40°) = 180° => 3x + 60° = 180° => 3x = 120° => x = 40°. (Szögek: 40°, 60°, 80°).'
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó és Összetett Geometriai Feladatok',
    subtitle: 'Állandó területű telek, Pitagorasz-tétel, átlószám egyenletek és trapéz magasság',
    questions: [
      {
        id: 'g8-eq-geo-l3-q1',
        title: 'Változatlan területű telek hossza',
        question: 'Egy téglalap hossza eredetileg 10 méterrel nagyobb volt a szélességénél. Ha a szélességét 4 méterrel csökkentjük, a hosszát 5 méterrel növeljük, a terület nem változik. Mekkora volt az eredeti szélesség?',
        options: ['20 m', '25 m', '15 m', '30 m'],
        correctAnswer: '20 m',
        explanation: 'Eredeti: x és x + 10, terület x(x + 10) = x² + 10x. Új méretek: x - 4 és x + 15. Új terület: (x - 4)(x + 15) = x² + 11x - 60. x² + 10x = x² + 11x - 60 => 10x = 11x - 60 => x = 20 m.'
      },
      {
        id: 'g8-eq-geo-l3-q2',
        title: 'Derékszögű háromszög oldalai aránnyal',
        question: 'Egy derékszögű háromszög átfogója 25 cm, befogóinak aránya 3 : 4. Mekkorák a befogói?',
        options: ['15 cm és 20 cm', '12 cm és 16 cm', '10 cm és 15 cm', '18 cm és 24 cm'],
        correctAnswer: '15 cm és 20 cm',
        explanation: 'Befogók 3x és 4x. Pitagorasz: (3x)² + (4x)² = 25² => 9x² + 16x² = 625 => 25x² = 625 => x² = 25 => x = 5. Befogók: 3 · 5 = 15 cm és 4 · 5 = 20 cm.'
      },
      {
        id: 'g8-eq-geo-l3-q3',
        title: 'Szimmetrikus trapéz területe Pitagorasszal',
        question: 'Egy szimmetrikus trapéz alapjai 16 cm és 6 cm, szárai 13 cm-esek. Mekkora a trapéz területe?',
        options: ['132 cm²', '144 cm²', '120 cm²', '156 cm²'],
        correctAnswer: '132 cm²',
        explanation: 'Az alap levonása: (16 - 6) / 2 = 5 cm. A derékszögű háromszögben a magasság: m² + 5² = 13² => m² + 25 = 169 => m² = 144 => m = 12 cm. Terület: T = ((16 + 6) · 12) / 2 = (22 · 12) / 2 = 132 cm².'
      },
      {
        id: 'g8-eq-geo-l3-q4',
        title: 'Konvex tízszög átlóinak száma',
        question: 'Hány oldalú az a konvex sokszög, amelynek pontosan 35 átlója van?',
        options: ['10 oldalú (tízszög)', '9 oldalú (kilencszög)', '12 oldalú (tizenkétszög)', '8 oldalú (nyolcszög)'],
        correctAnswer: '10 oldalú (tízszög)',
        explanation: 'n(n - 3) / 2 = 35 => n(n - 3) = 70. Két szám szorzata 70, különbségük 3: 10 · 7 = 70, tehát n = 10.'
      },
      {
        id: 'g8-eq-geo-l3-q5',
        title: 'Négyzet eredeti kerülete területnövekedésből',
        question: 'Egy négyzet oldalát 4 cm-rel növelve a területe 112 cm²-rel nő. Mekkora volt az eredeti négyzet kerülete?',
        options: ['48 cm', '40 cm', '56 cm', '36 cm'],
        correctAnswer: '48 cm',
        explanation: '(x + 4)² - x² = 112 => x² + 8x + 16 - x² = 112 => 8x + 16 = 112 => 8x = 96 => x = 12 cm. Eredeti kerület: K = 4 · 12 = 48 cm.'
      },
      {
        id: 'g8-eq-geo-l3-q6',
        title: 'Háromszög belső szögei külső szögből',
        question: 'Egy háromszög egyik külső szöge 110°. A nem mellette fekvő két belső szög különbsége 30°. Mekkora a legkisebb belső szög?',
        options: ['40°', '35°', '45°', '30°'],
        correctAnswer: '40°',
        explanation: 'A két nem mellette fekvő szög összege egyenlő a külső szöggel: α + β = 110°. Különbségük: α - β = 30°. Összeadva: 2α = 140° => α = 70°. A kisebbik szög: β = 110° - 70° = 40°. A harmadik belső szög 180° - 110° = 70°.'
      },
      {
        id: 'g8-eq-geo-l3-q7',
        title: 'Járólapozott helyiség méretei',
        question: 'Egy téglalap alakú szoba hossza 2 m-rel nagyobb a szélességénél. Ha mindkét méretét 1 m-rel megnöveljük, a terület 5 m²-rel lesz nagyobb. Mekkora az eredeti szélesség?',
        options: ['1 m', '2 m', '1,5 m', '2,5 m'],
        correctAnswer: '1 m',
        explanation: '(x + 1)(x + 3) - x(x + 2) = 5 => x² + 4x + 3 - x² - 2x = 5 => 2x + 3 = 5 => 2x = 2 => x = 1 m. (Eredeti méretek: 1 m és 3 m, T = 3 m²; új: 2 m és 4 m, T = 8 m²; 8 - 3 = 5 m²).'
      },
      {
        id: 'g8-eq-geo-l3-q8',
        title: 'Szabályos sokszög oldalszáma belső szögből',
        question: 'Egy szabályos sokszög minden egyes belső szöge 150°. Hány oldala van a sokszögnek?',
        options: ['12', '10', '15', '16'],
        correctAnswer: '12',
        explanation: 'Minden külső szög 180° - 150° = 30°. A konvex sokszögek külső szögeinek összege mindig 360°: n = 360° / 30° = 12.'
      },
      {
        id: 'g8-eq-geo-l3-q9',
        title: 'Derékszögű háromszög átfogója',
        question: 'Egy derékszögű háromszög egyik befogója 12 cm. Az átfogó 4 cm-rel hosszabb a másik befogónál. Mekkora az átfogó?',
        options: ['20 cm', '16 cm', '25 cm', '18 cm'],
        correctAnswer: '20 cm',
        explanation: 'Pitagorasz: 12² + x² = (x + 4)² => 144 + x² = x² + 8x + 16 => 144 = 8x + 16 => 8x = 128 => x = 16 cm (másik befogó). Átfogó: 16 + 4 = 20 cm.'
      },
      {
        id: 'g8-eq-geo-l3-q10',
        title: 'Trapéz alapjai és magassága',
        question: 'Egy trapéz alapjainak összege 28 cm, magassága a rövidebb alap fele. Ha területe 70 cm², mekkora a rövidebb alap?',
        options: ['10 cm', '8 cm', '12 cm', '14 cm'],
        correctAnswer: '10 cm',
        explanation: 'T = ((a + c) · m) / 2 => 70 = (28 · m) / 2 => 70 = 14m => m = 5 cm. Mivel a magasság a rövidebb alap fele: c / 2 = 5 => c = 10 cm.'
      }
    ]
  }
};

export const GeometricEquationsQuiz: React.FC<GeometricEquationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Szöveges Geometriai Feladatok Kvíz"
      topicId="g8-eq-geometry"
      topicTitle="Szöveges geometriai feladatok"
      subtitle="Gyakorold a háromszögek, sokszögek, négyszögek és területek egyenleteit 3 nehézségi szinten!"
      badge="8. OSZTÁLY • III. EGYENLETEK"
      badgeColor="emerald"
      themeColor="emerald"
      emoji="📐"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Párosítsd a geometriai fogalmakat, képleteket és szöveges modelleket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapképletek és Szabályok',
              subtitle: 'Párosítsd a fogalmat a helyes képlettel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapképletek',
              focus: 'Szögösszeg & Kerület'
            },
            2: {
              title: '2. Szint: Szöveges Modellek és Egyenletek',
              subtitle: 'Kösd össze a feladat leírását az egyenlettel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Algebrai modellek',
              focus: 'Egyenlet-felírás'
            },
            3: {
              title: '3. Szint: Összetett és Haladó Összefüggések',
              subtitle: 'Párosítsd a feladatokat a pontos végeredménnyel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Számítások',
              focus: 'Pitagorasz & Eredmények'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <GeometricEquationsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld az alakzatokat, egyenletmodelleket és feladattípusokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Alakzatok és Fő Kategóriák',
              subtitle: 'Sorold be: Háromszögek / Téglalapok / Trapézok & Sokszögek szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Fogalmak és alakzatok'
            },
            2: {
              title: '2. Szint: Geometriai Egyenletmodellek',
              subtitle: 'Csoportosítsd: Szögarány / Területváltozás / Trapéz & Pitagorasz szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Algebrai modellek'
            },
            3: {
              title: '3. Szint: Szöveges Feladattípusok',
              subtitle: 'Kategorizáld a szöveges feladatokat téma szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Feladattípusok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <GeometricEquationsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default GeometricEquationsQuiz;
