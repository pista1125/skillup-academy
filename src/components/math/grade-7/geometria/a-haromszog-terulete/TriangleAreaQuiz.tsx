import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleAreaMatcher } from './TriangleAreaMatcher';
import { TriangleAreaSorter } from './TriangleAreaSorter';
import {
  Triangle,
  Shapes,
  Maximize2,
  Layers,
  Ruler,
  Box,
  Compass,
  Split,
  Calculator
} from 'lucide-react';

interface TriangleAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Háromszög Területképlete',
    icon: <Triangle className="w-4 h-4 text-teal-600" />,
    formula: 'T = \\frac{a \\cdot m_a}{2} = \\frac{b \\cdot m_b}{2} = \\frac{c \\cdot m_c}{2}',
    note: 'Bármely oldal és a hozzá tartozó magasság szorzatának a fele. A 2-vel való osztás KÖTELEZŐ!'
  },
  {
    id: 'c2',
    title: 'Derékszögű Háromszög',
    icon: <Compass className="w-4 h-4 text-emerald-600" />,
    formula: 'T = \\frac{a \\cdot b}{2}, \\quad m_c = \\frac{a \\cdot b}{c}',
    note: 'A két befogó merőleges egymásra, így az egyik a másik magassága. Az átfogóhoz tartozó magasság mc = 2T / c.'
  },
  {
    id: 'c3',
    title: 'A Három Magasság Összefüggése',
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
    formula: 'a \\cdot m_a = b \\cdot m_b = c \\cdot m_c = 2T',
    note: 'Minden oldal-magasság szorzat a kétszeres területtel egyenlő. A hosszabb oldalhoz mindig rövidebb magasság tartozik!'
  },
  {
    id: 'c4',
    title: 'Kerület és Terület Különbsége',
    icon: <Ruler className="w-4 h-4 text-blue-600" />,
    formula: 'K = a + b + c \\quad [\\text{cm}], \\quad T = \\frac{a \\cdot m_a}{2} \\quad [\\text{cm}^2]',
    note: 'A kerület a 3 oldal összhossza (1D), a terület a lefedett belső síkrész nagysága (2D).'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és közvetlen számítások)
  1: {
    title: '1. Szint: Alapvető Képletek és Egyszerű Számítások',
    description: 'Területképlet ((a · ma) / 2), derékszögű háromszög és származtatás a paralelogrammából',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mi a háromszög területének alapvető képlete?',
        options: ['T = (a · ma) / 2', 'T = a · ma', 'T = a + b + c', 'T = (a · b) / 4'],
        correctAnswer: 'T = (a · ma) / 2',
        hint: 'Az oldal és a hozzá tartozó magasság szorzatának a fele.',
        explanation: 'A háromszög területe az alap és a hozzá tartozó magasság szorzatának fele: T = (a · ma) / 2.'
      },
      {
        id: 'q1-2',
        prompt: 'Egy háromszög alapja a = 10 cm, a hozzá tartozó magassága ma = 6 cm. Mennyi a területe?',
        options: ['30 cm²', '60 cm²', '16 cm²', '32 cm²'],
        correctAnswer: '30 cm²',
        hint: '(10 · 6) / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,55 105,55 60,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <path d="M 68 55 A 8 8 0 0 0 60 47" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="63.5" cy="51.5" r="1" className="fill-rose-500" />
            <text x="60" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = 10 cm</text>
            <text x="73" y="36" className="text-[9px] font-bold fill-rose-600">6 cm</text>
          </svg>
        ),
        explanation: 'T = (a · ma) / 2 = (10 cm · 6 cm) / 2 = 60 / 2 = 30 cm².'
      },
      {
        id: 'q1-3',
        prompt: 'Egy derékszögű háromszög befogói a = 8 cm és b = 6 cm. Mennyi a területe?',
        options: ['24 cm²', '48 cm²', '14 cm²', '28 cm²'],
        correctAnswer: '24 cm²',
        hint: 'A két befogó merőleges egymásra: T = (a · b) / 2.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,55 95,55 25,15" fill="none" className="stroke-teal-600 stroke-2" />
            <path d="M 33 55 A 8 8 0 0 0 25 47" fill="none" className="stroke-teal-600 stroke-1" />
            <circle cx="28.5" cy="51.5" r="1" className="fill-teal-600" />
            <text x="60" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = 8 cm</text>
            <text x="14" y="38" className="text-[9px] font-bold fill-teal-600">b = 6</text>
          </svg>
        ),
        explanation: 'Derékszögű háromszögben az egyik befogó az alap, a másik a magasság: T = (8 · 6) / 2 = 48 / 2 = 24 cm².'
      },
      {
        id: 'q1-4',
        prompt: 'Miért szerepel a 2-vel való osztás a háromszög területképletében?',
        options: [
          'Mert két egybevágó háromszög pontosan egy paralelogrammát alkot',
          'Mert a háromszögnek három oldala van',
          'Csak azért, hogy kisebb számot kapjunk',
          'Mert minden háromszög felezhető egy tengellyel'
        ],
        correctAnswer: 'Mert két egybevágó háromszög pontosan egy paralelogrammát alkot',
        hint: 'Két azonos háromszögből paralelogrammát tudunk kirakni.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,55 75,55 45,15" fill="none" className="stroke-teal-600 stroke-2" />
            <polygon points="45,15 100,15 75,55" fill="none" className="stroke-teal-400 stroke-1 stroke-dashed" />
            <text x="60" y="37" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">2 × Δ = Paralelogramma</text>
          </svg>
        ),
        explanation: 'Két egybevágó háromszög összeillesztve egy a alapú és ma magasságú paralelogrammát ad (Tp = a · ma), így egy háromszög területe ennek pontosan a fele.'
      },
      {
        id: 'q1-5',
        prompt: 'Egy háromszög oldalai a = 6 cm, b = 8 cm és c = 10 cm. Mennyi a kerülete?',
        options: ['24 cm', '48 cm', '24 cm²', '12 cm'],
        correctAnswer: '24 cm',
        hint: 'Kerület a 3 oldal összege: K = a + b + c.',
        explanation: 'K = a + b + c = 6 cm + 8 cm + 10 cm = 24 cm.'
      },
      {
        id: 'q1-6',
        prompt: 'Egy háromszög alapja a = 12 cm, területe T = 36 cm². Mekkora a hozzá tartozó ma magasság?',
        options: ['6 cm', '3 cm', '12 cm', '18 cm'],
        correctAnswer: '6 cm',
        hint: 'T = (a · ma) / 2 -> 2T = a · ma -> ma = 2T / a = 72 / 12 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,55 100,55 50,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="50" y1="15" x2="50" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="38" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">T = 36 cm²</text>
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 12 cm</text>
          </svg>
        ),
        explanation: '2 · T = a · ma -> 2 · 36 = 12 · ma -> 72 = 12 · ma -> ma = 72 / 12 = 6 cm.'
      },
      {
        id: 'q1-7',
        prompt: 'Egy derékszögű háromszög befogói a = 5 cm és b = 4 cm. Mennyi a területe?',
        options: ['10 cm²', '20 cm²', '9 cm²', '18 cm²'],
        correctAnswer: '10 cm²',
        hint: '(5 · 4) / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="30,55 90,55 30,20" fill="none" className="stroke-emerald-600 stroke-2" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">5 cm</text>
            <text x="20" y="40" className="text-[8px] font-bold fill-emerald-600">4 cm</text>
          </svg>
        ),
        explanation: 'T = (a · b) / 2 = (5 · 4) / 2 = 20 / 2 = 10 cm².'
      },
      {
        id: 'q1-8',
        prompt: 'Egy egyenlő szárú háromszög alapja a = 10 cm, alaphoz tartozó magassága ma = 8 cm. Mennyi a területe?',
        options: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'],
        correctAnswer: '40 cm²',
        hint: '(10 · 8) / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,55 95,55 60,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">10 cm</text>
            <text x="68" y="38" className="text-[8px] font-bold fill-rose-600">8 cm</text>
          </svg>
        ),
        explanation: 'T = (a · ma) / 2 = (10 · 8) / 2 = 80 / 2 = 40 cm².'
      },
      {
        id: 'q1-9',
        prompt: 'Igaz vagy hamis: A háromszög területét bármelyik oldalából és a hozzá tartozó magasságából kiszámolva ugyanazt az értéket kapjuk.',
        options: ['Igaz', 'Hamis', 'Csak derékszögű háromszögre igaz', 'Csak szabályos háromszögre igaz'],
        correctAnswer: 'Igaz',
        hint: 'A terület a háromszög síkbeli nagysága, ami független a választott oldaltól.',
        explanation: 'A terület állandó: T = (a · ma) / 2 = (b · mb) / 2 = (c · mc) / 2.'
      },
      {
        id: 'q1-10',
        prompt: 'Egy háromszög alapja a = 15 dm, magassága ma = 6 dm. Hány dm² a területe?',
        options: ['45 dm²', '90 dm²', '21 dm²', '30 dm²'],
        correctAnswer: '45 dm²',
        hint: '(15 · 6) / 2 = ?',
        explanation: 'T = (15 · 6) / 2 = 90 / 2 = 45 dm².'
      }
    ]
  },

  // 2. SZINT: KÖZÉPHALADÓ (Mértékegység-váltás és a magasságok kapcsolata)
  2: {
    title: '2. Szint: Mértékegység-egyeztetés és Hiányzó Adatok',
    description: 'Két magasság kapcsolata, derékszögű háromszög átfogó magassága és tompaszögű háromszög',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy háromszög alapja a = 1,4 m, a magassága ma = 50 cm. Mennyi a területe cm²-ben?',
        options: ['3500 cm²', '7000 cm²', '350 cm²', '35 000 cm²'],
        correctAnswer: '3500 cm²',
        hint: '1,4 m = 140 cm. T = (140 · 50) / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,55 105,55 60,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 140 cm</text>
            <text x="74" y="38" className="text-[8px] font-bold fill-rose-600">50 cm</text>
          </svg>
        ),
        explanation: 'a = 1,4 m = 140 cm. T = (140 · 50) / 2 = 7000 / 2 = 3500 cm².'
      },
      {
        id: 'q2-2',
        prompt: 'Egy háromszög területe T = 60 cm², alapja a = 15 cm. Mekkora az ehhez tartozó ma magasság?',
        options: ['8 cm', '4 cm', '16 cm', '12 cm'],
        correctAnswer: '8 cm',
        hint: '2T = a · ma -> 120 = 15 · ma -> ma = 120 / 15.',
        explanation: 'ma = (2 · T) / a = (2 · 60) / 15 = 120 / 15 = 8 cm.'
      },
      {
        id: 'q2-3',
        prompt: 'Egy háromszög oldalai a = 12 cm és b = 8 cm. Az a-hoz tartozó magasság ma = 6 cm. Mekkora az mb magasság?',
        options: ['9 cm', '4 cm', '6 cm', '12 cm'],
        correctAnswer: '9 cm',
        hint: '2T = a · ma = 12 · 6 = 72. Ekkor mb = 72 / 8 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,55 95,55 65,15" fill="none" className="stroke-indigo-600 stroke-2" />
            <line x1="65" y1="15" x2="65" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="50" y="65" className="text-[8px] font-bold fill-slate-700">a=12</text>
            <text x="85" y="35" className="text-[8px] font-bold fill-indigo-700">b=8</text>
            <text x="52" y="38" className="text-[8px] font-bold fill-rose-600">ma=6</text>
          </svg>
        ),
        explanation: 'a · ma = b · mb -> 12 · 6 = 8 · mb -> 72 = 8 · mb -> mb = 9 cm.'
      },
      {
        id: 'q2-4',
        prompt: 'Derékszögű háromszög befogói a = 9 cm és b = 12 cm, átfogója c = 15 cm. Mekkora az átfogóhoz tartozó mc magasság?',
        options: ['7,2 cm', '6 cm', '10,8 cm', '8 cm'],
        correctAnswer: '7,2 cm',
        hint: '2T = a · b = 9 · 12 = 108. mc = 108 / 15 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,55 95,55 25,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="25" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="44" y="36" className="text-[8px] font-bold fill-rose-600">mc</text>
            <text x="75" y="32" className="text-[8px] font-bold fill-slate-500">c=15</text>
          </svg>
        ),
        explanation: 'mc = (a · b) / c = (9 · 12) / 15 = 108 / 15 = 7,2 cm.'
      },
      {
        id: 'q2-5',
        prompt: 'Egy tompaszögű háromszög alapja a = 8 cm, a csúcsából az alap egyenesére húzott külső magasság ma = 5 cm. Mennyi a területe?',
        options: ['20 cm²', '40 cm²', '26 cm²', '13 cm²'],
        correctAnswer: '20 cm²',
        hint: 'Bár a magasság kívül van, a képletben csak a = 8 cm szerepel: (8 · 5) / 2.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="40,55 105,55 15,20" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="15" y1="55" x2="40" y2="55" className="stroke-slate-400 stroke-1 stroke-dashed" />
            <line x1="15" y1="20" x2="15" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="72" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 8</text>
            <text x="8" y="40" className="text-[8px] font-bold fill-rose-600">5</text>
          </svg>
        ),
        explanation: 'Tompaszögű háromszögnél a külső magassággal is pontosan T = (a · ma) / 2 = (8 · 5) / 2 = 20 cm².'
      },
      {
        id: 'q2-6',
        prompt: 'Egy háromszög alapját kétszeresére növeljük, magasságát pedig felére csökkentjük. Hogyan változik a területe?',
        options: ['Változatlan marad', 'Kétszeresére nő', 'Felére csökken', 'Négyszeresére nő'],
        correctAnswer: 'Változatlan marad',
        hint: 'T_új = (2a · (ma / 2)) / 2 = (a · ma) / 2.',
        explanation: 'T_új = ((2 · a) · (ma / 2)) / 2 = (a · ma) / 2 = T_eredeti. A szorzat és a terület nagysága változatlan marad.'
      },
      {
        id: 'q2-7',
        prompt: 'Egy téglalap oldalai a = 10 cm és b = 6 cm. Az átlója két háromszögre bontja. Mekkora az egyik háromszög területe?',
        options: ['30 cm²', '60 cm²', '16 cm²', '15 cm²'],
        correctAnswer: '30 cm²',
        hint: 'A téglalap területe 10 · 6 = 60 cm². Az átló felezi a területet.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <rect x="25" y="15" width="70" height="40" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="25" y1="55" x2="95" y2="15" className="stroke-teal-400 stroke-1 stroke-dashed" />
            <text x="50" y="40" className="text-[8px] font-bold fill-teal-700">T = 30</text>
          </svg>
        ),
        explanation: 'A téglalap területe 60 cm². Az átló két egybevágó derékszögű háromszögre osztja, melyek területe T = (10 · 6) / 2 = 30 cm².'
      },
      {
        id: 'q2-8',
        prompt: 'Egy háromszög területe T = 48 cm², magassága ma = 8 cm. Mekkora az alapja a?',
        options: ['12 cm', '6 cm', '24 cm', '16 cm'],
        correctAnswer: '12 cm',
        hint: 'a = (2 · T) / ma = 96 / 8 = ?',
        explanation: 'a = (2 · T) / ma = (2 · 48) / 8 = 96 / 8 = 12 cm.'
      },
      {
        id: 'q2-9',
        prompt: 'Háromszög oldalai a = 10 cm és b = 16 cm. Magasságai 5 cm és 8 cm. Melyik magasság tartozik az a = 10 cm-es oldalhoz?',
        options: [
          'A 8 cm-es magasság (ma = 8 cm)',
          'Az 5 cm-es magasság (ma = 5 cm)',
          'Bármelyik tartozhat hozzá',
          'Nincs ilyen háromszög'
        ],
        correctAnswer: 'A 8 cm-es magasság (ma = 8 cm)',
        hint: 'A rövidebb oldalhoz tartozik a hosszabb magasság, hogy a szorzat azonos legyen: 10 · 8 = 16 · 5 = 80 = 2T.',
        explanation: 'Mivel a < b (10 < 16), a hozzájuk tartozó magasságokra ma > mb kell teljesüljön: 10 · 8 = 80 és 16 · 5 = 80, így ma = 8 cm.'
      },
      {
        id: 'q2-10',
        prompt: 'Egy szabályos háromszög oldala a = 6 cm, magassága m ≈ 5,2 cm. Mennyi a területe?',
        options: ['kb. 15,6 cm²', 'kb. 31,2 cm²', 'kb. 18 cm²', 'kb. 11,2 cm²'],
        correctAnswer: 'kb. 15,6 cm²',
        hint: '(6 · 5,2) / 2 = 31,2 / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="30,55 90,55 60,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 6</text>
            <text x="68" y="38" className="text-[8px] font-bold fill-rose-600">5,2</text>
          </svg>
        ),
        explanation: 'T = (a · m) / 2 ≈ (6 · 5,2) / 2 = 31,2 / 2 = 15,6 cm².'
      }
    ]
  },

  // 3. SZINT: MESTER (Összetett összefüggések, súlyvonal, hasonlóság és szöveges feladatok)
  3: {
    title: '3. Szint: Összetett és Szöveges Geometriai Feladatok',
    description: 'Súlyvonal területfelezése, 30°-os szög, arányok és összetett síkmértani feladatok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy derékszögű háromszög területe T = 30 cm², egyik befogója a = 5 cm. Mekkora a másik befogó b?',
        options: ['12 cm', '6 cm', '10 cm', '15 cm'],
        correctAnswer: '12 cm',
        hint: 'T = (a · b) / 2 -> 30 = (5 · b) / 2 -> 60 = 5 · b -> b = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="30,55 90,55 30,15" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 5</text>
            <text x="18" y="38" className="text-[8px] font-bold fill-teal-700">b = ?</text>
            <text x="55" y="42" className="text-[8px] font-black fill-teal-800">T = 30</text>
          </svg>
        ),
        explanation: 'b = (2 · T) / a = (2 · 30) / 5 = 60 / 5 = 12 cm.'
      },
      {
        id: 'q3-2',
        prompt: 'Egy háromszög alapja 4-szerese a magasságának (a = 4 · ma). Területe T = 72 cm². Mekkora a magassága?',
        options: ['6 cm', '12 cm', '8 cm', '18 cm'],
        correctAnswer: '6 cm',
        hint: 'T = (4ma · ma) / 2 = 2ma² = 72 -> ma² = 36 -> ma = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="10,55 110,55 70,25" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="60" y="45" textAnchor="middle" className="text-[9px] font-bold fill-indigo-800">a = 4 · ma</text>
          </svg>
        ),
        explanation: 'T = (4 · ma · ma) / 2 = 2 · ma² = 72 -> ma² = 36 -> ma = 6 cm (és az alap a = 24 cm).'
      },
      {
        id: 'q3-3',
        prompt: 'Egy háromszög kerülete K = 36 cm, két oldala a = 15 cm és b = 13 cm. Területe T = 48 cm². Mekkora a harmadik oldalhoz (c) tartozó mc magasság?',
        options: ['12 cm', '6 cm', '8 cm', '9,6 cm'],
        correctAnswer: '12 cm',
        hint: 'c = 36 - 15 - 13 = 8 cm. mc = (2 · 48) / 8 = 96 / 8 = ?',
        explanation: 'c = 36 - (15 + 13) = 8 cm. mc = (2 · T) / c = (2 · 48) / 8 = 96 / 8 = 12 cm.'
      },
      {
        id: 'q3-4',
        prompt: 'Egy derékszögű háromszög mindkét befogóját 20%-kal megnöveljük. Hogyan változik a területe?',
        options: ['44%-kal nő', '20%-kal nő', '40%-kal nő', '24%-kal nő'],
        correctAnswer: '44%-kal nő',
        hint: 'T_új = (1,2a · 1,2b) / 2 = 1,44 · T_eredeti.',
        explanation: 'T_új = (1,2 · a · 1,2 · b) / 2 = 1,44 · ((a · b) / 2) = 1,44 · T, ami pontosan 44%-os növekedést jelent.'
      },
      {
        id: 'q3-5',
        prompt: 'A háromszög egyik súlyvonala a háromszöget két kisebb háromszögre osztja. Mi mondható el ezen két rész területéről?',
        options: [
          'A két terület pontosan egyenlő',
          'A hosszabb oldal felőli rész területe nagyobb',
          'Csak szabályos háromszögnél egyenlő',
          'A súlyvonal arányában oszlik meg a terület'
        ],
        correctAnswer: 'A két terület pontosan egyenlő',
        hint: 'A súlyvonal felezi az alapot, és mindkét keletkező háromszögnek ugyanaz a magassága.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,55 105,55 70,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="70" y1="15" x2="60" y2="55" className="stroke-indigo-600 stroke-1.5" />
            <text x="38" y="45" className="text-[8px] font-bold fill-teal-700">T1</text>
            <text x="80" y="45" className="text-[8px] font-bold fill-teal-700">T2 = T1</text>
          </svg>
        ),
        explanation: 'Mivel a súlyvonal felezi az oldalt (alap1 = alap2 = a/2), és a csúcsból húzott magasságuk közös, ezért T1 = T2 = T / 2.'
      },
      {
        id: 'q3-6',
        prompt: 'Egy háromszög két oldala a = 14 cm és b = 10 cm, és az általuk bezárt szög 30°. Mennyi a területe?',
        options: ['35 cm²', '70 cm²', '17,5 cm²', '40 cm²'],
        correctAnswer: '35 cm²',
        hint: 'A 30°-os derékszögű háromszög miatt ma = b / 2 = 10 / 2 = 5 cm. T = (14 · 5) / 2.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,55 105,55 35,25" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="35" y1="25" x2="35" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="24" y="52" className="text-[7px] font-bold fill-slate-600">30°</text>
            <text x="20" y="36" className="text-[8px] font-bold fill-slate-700">b=10</text>
            <text x="65" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 14</text>
          </svg>
        ),
        explanation: 'A 30°-os szög miatt a magasság ma = b · sin(30°) = 10 / 2 = 5 cm. T = (14 · 5) / 2 = 35 cm².'
      },
      {
        id: 'q3-7',
        prompt: 'Egy háromszög területe T = 84 cm², két magassága ma = 12 cm és mb = 14 cm. Mennyi a két megfelelő oldal összege (a + b)?',
        options: ['26 cm', '28 cm', '30 cm', '24 cm'],
        correctAnswer: '26 cm',
        hint: '2T = 168. a = 168 / 12 = 14 cm, b = 168 / 14 = 12 cm. a + b = ?',
        explanation: 'a = (2 · 84) / 12 = 14 cm, b = (2 · 84) / 14 = 12 cm. a + b = 14 + 12 = 26 cm.'
      },
      {
        id: 'q3-8',
        prompt: 'Egy egyenlő szárú háromszög alapja a = 10 cm, szára b = 13 cm. Az alaphoz tartozó magasság ma = 12 cm. Mennyi a területe?',
        options: ['60 cm²', '120 cm²', '65 cm²', '78 cm²'],
        correctAnswer: '60 cm²',
        hint: 'T = (a · ma) / 2 = (10 · 12) / 2 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,55 95,55 60,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="15" x2="60" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 10</text>
            <text x="75" y="32" className="text-[8px] font-bold fill-slate-600">b = 13</text>
            <text x="68" y="40" className="text-[8px] font-bold fill-rose-600">12</text>
          </svg>
        ),
        explanation: 'T = (a · ma) / 2 = (10 · 12) / 2 = 120 / 2 = 60 cm².'
      },
      {
        id: 'q3-9',
        prompt: 'Egy háromszög alakú telek utcafrontja 40 m, mélysége (magassága) 25 m. Hány ár a területe?',
        options: ['5 ár', '10 ár', '50 ár', '0,5 ár'],
        correctAnswer: '5 ár',
        hint: 'T = (40 · 25) / 2 = 500 m². 1 ár = 100 m².',
        explanation: 'T = (40 · 25) / 2 = 1000 / 2 = 500 m². Mivel 1 ár = 100 m², a telek 500 / 100 = 5 ár.'
      },
      {
        id: 'q3-10',
        prompt: 'Két hasonló háromszög hasonlósági aránya k = 3 (minden oldala 3-szoros). Hányszorosa a nagyobb háromszög területe a kisebbnek?',
        options: ['9-szerese (k²)', '3-szorosa (k)', '6-szorosa', '27-szerese (k³)'],
        correctAnswer: '9-szerese (k²)',
        hint: 'Mivel az alap és a magasság is 3-szorosára nő: 3 · 3 = 9.',
        explanation: 'Ha az oldalak aránya k, a területek aránya k²: T_új = (3a · 3ma) / 2 = 9 · ((a · ma) / 2) = 9 · T_eredeti.'
      }
    ]
  }
};

export const TriangleAreaQuiz: React.FC<TriangleAreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-triangle-area"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 6. LECKE"
      title="6. A Háromszög Területe Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alap × magasság / 2, derékszögű háromszög, három magasság kapcsolata és összetett síkmértan"
      cheatSheetTitle="Háromszög Terület Puskakártyák"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <TriangleAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <TriangleAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default TriangleAreaQuiz;
