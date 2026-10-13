import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ParallelogramAreaMatcher } from './ParallelogramAreaMatcher';
import { ParallelogramAreaSorter } from './ParallelogramAreaSorter';
import {
  Square,
  Shapes,
  Maximize2,
  Layers,
  Ruler,
  Box,
  Compass,
  Scissors,
  Calculator
} from 'lucide-react';

interface ParallelogramAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Paralelogramma Területképlete',
    icon: <Square className="w-4 h-4 text-emerald-600" />,
    formula: 'T = a \\cdot m_a = b \\cdot m_b',
    note: 'Bármelyik oldalt megszorozva a hozzá tartozó belső vagy külső magassággal megkapjuk a területet.'
  },
  {
    id: 'c2',
    title: 'A Két Magasság Kapcsolata',
    icon: <Layers className="w-4 h-4 text-teal-600" />,
    formula: 'a \\cdot m_a = b \\cdot m_b',
    note: 'Mivel a terület állandó: a hosszabb oldalhoz rövidebb magasság, a rövidebb oldalhoz hosszabb magasság tartozik.'
  },
  {
    id: 'c3',
    title: 'Rombusz Területe Átlókból',
    icon: <Shapes className="w-4 h-4 text-cyan-600" />,
    formula: 'T_{\\text{rombusz}} = \\frac{e \\cdot f}{2} = a \\cdot m',
    note: 'Mivel az átlók merőlegesen felezik egymást, a 4 egybevágó derékszögű háromszög területe összeadódik.'
  },
  {
    id: 'c4',
    title: 'Kerület és Terület Nem Tévesztendő!',
    icon: <Ruler className="w-4 h-4 text-blue-600" />,
    formula: 'K = 2(a + b), \\quad T = a \\cdot m_a',
    note: 'A kerület a határoló vonalak összhossza (cm, m). A terület a lefedett síkrész nagysága (cm², m²).'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és közvetlen számítások)
  1: {
    title: '1. Szint: Alapvető Képletek és Egyszerű Számítások',
    description: 'Területképlet (a · ma), téglalap, négyzet és rombusz alapfeladatai',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mi a paralelogramma területének alapvető képlete?',
        options: ['T = a · ma', 'T = 2 · (a + b)', 'T = (a · b) / 2', 'T = a + ma'],
        correctAnswer: 'T = a · ma',
        hint: 'Az egyik oldal és a hozzá tartozó merőleges magasság szorzata.',
        explanation: 'A paralelogramma területe az alap (oldal) és a hozzá tartozó magasság szorzata: T = a · ma = b · mb.'
      },
      {
        id: 'q1-2',
        prompt: 'Egy paralelogramma alapja a = 8 cm, a hozzá tartozó magassága ma = 5 cm. Mennyi a területe?',
        options: ['40 cm²', '26 cm²', '20 cm²', '13 cm²'],
        correctAnswer: '40 cm²',
        hint: 'Szorozd össze az alapot a magassággal: 8 · 5 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,12 95,12 75,55 5,55" fill="none" className="stroke-emerald-600 stroke-2" />
            <line x1="25" y1="12" x2="25" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <path d="M 33 55 A 8 8 0 0 0 25 47" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="28.5" cy="51.5" r="1" className="fill-rose-500" />
            <text x="40" y="65" className="text-[9px] font-bold fill-slate-700">a = 8 cm</text>
            <text x="12" y="36" className="text-[9px] font-bold fill-rose-600">5 cm</text>
          </svg>
        ),
        explanation: 'T = a · ma = 8 cm · 5 cm = 40 cm².'
      },
      {
        id: 'q1-3',
        prompt: 'Miért alkalmazható a téglalapra is a paralelogramma T = a · m képlete?',
        options: [
          'Mert a téglalapban a magasság pont egybeesik a szomszédos oldallal (m = b)',
          'Mert a téglalapnak nincsenek magasságai',
          'Csak akkor, ha a téglalap négyzet is egyben',
          'Nem alkalmazható rá ez a képlet'
        ],
        correctAnswer: 'Mert a téglalapban a magasság pont egybeesik a szomszédos oldallal (m = b)',
        hint: 'A téglalap szomszédos oldalai derékszöget zárnak be egymással.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <rect x="25" y="15" width="70" height="40" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a</text>
            <text x="15" y="38" className="text-[9px] font-bold fill-teal-600">b = m</text>
          </svg>
        ),
        explanation: 'A téglalap derékszögű paralelogramma, így a magassága pontosan a másik oldal hosszával egyezik meg: T = a · b.'
      },
      {
        id: 'q1-4',
        prompt: 'Egy rombusz átlói e = 6 cm és f = 10 cm. Mennyi a területe?',
        options: ['30 cm²', '60 cm²', '16 cm²', '32 cm²'],
        correctAnswer: '30 cm²',
        hint: 'A merőleges átlójú négyszögeknél T = (e · f) / 2.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="60,8 100,35 60,62 20,35" fill="none" className="stroke-cyan-600 stroke-2" />
            <line x1="60" y1="8" x2="60" y2="62" className="stroke-slate-400 stroke-1 stroke-dashed" />
            <line x1="20" y1="35" x2="100" y2="35" className="stroke-slate-400 stroke-1 stroke-dashed" />
            <text x="60" y="40" textAnchor="middle" className="text-[9px] font-black fill-cyan-800">30 cm²</text>
          </svg>
        ),
        explanation: 'Rombusz területe átlókból: T = (e · f) / 2 = (6 · 10) / 2 = 60 / 2 = 30 cm².'
      },
      {
        id: 'q1-5',
        prompt: 'Egy paralelogramma két oldala a = 10 cm és b = 6 cm. Mennyi a kerülete?',
        options: ['32 cm', '60 cm', '16 cm', '60 cm²'],
        correctAnswer: '32 cm',
        hint: 'Kerület: K = 2 · (a + b).',
        explanation: 'K = 2 · (a + b) = 2 · (10 cm + 6 cm) = 2 · 16 cm = 32 cm.'
      },
      {
        id: 'q1-6',
        prompt: 'Egy paralelogramma területe T = 72 cm², alapja a = 12 cm. Mekkora az ehhez tartozó magasság?',
        options: ['6 cm', '8 cm', '60 cm', '12 cm'],
        correctAnswer: '6 cm',
        hint: 'Ha T = a · ma, akkor ma = T / a.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,15 88,15 72,55 4,55" fill="none" className="stroke-emerald-600 stroke-2" />
            <line x1="20" y1="15" x2="20" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="46" y="38" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">T = 72 cm²</text>
            <text x="46" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 12 cm</text>
          </svg>
        ),
        explanation: 'ma = T / a = 72 cm² / 12 cm = 6 cm.'
      },
      {
        id: 'q1-7',
        prompt: 'Lehet-e a paralelogramma magassága hosszabb, mint a szomszédos ferde oldala?',
        options: [
          'Nem, mert a magasság derékszögű háromszög befogója, ami rövidebb az átfogónál',
          'Igen, bármelyik paralelogrammánál',
          'Csak akkor, ha a szögek tompaszögek',
          'Igen, ha a kerület elég nagy'
        ],
        correctAnswer: 'Nem, mert a magasság derékszögű háromszög befogója, ami rövidebb az átfogónál',
        hint: 'A magasság merőleges, így derékszögű háromszöget zár be az oldallal.',
        explanation: 'A magasság, a ferde oldal és a lemetszett szakasz egy derékszögű háromszöget alkot, amelyben a ferde oldal az átfogó, így a magasság mindig m ≤ b.'
      },
      {
        id: 'q1-8',
        prompt: 'Egy négyzet oldala a = 9 cm. Mennyi a területe?',
        options: ['81 cm²', '36 cm²', '18 cm²', '72 cm²'],
        correctAnswer: '81 cm²',
        hint: 'Négyzetnél T = a · a = a².',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <rect x="35" y="10" width="50" height="50" fill="none" className="stroke-emerald-600 stroke-2" />
            <text x="60" y="38" textAnchor="middle" className="text-[10px] font-black fill-emerald-800">81 cm²</text>
          </svg>
        ),
        explanation: 'T = a² = 9 cm · 9 cm = 81 cm².'
      },
      {
        id: 'q1-9',
        prompt: 'Mi történik a területtel, ha a paralelogrammát az egyik magassága mentén levágott derékszögű háromszöggel téglalappá rendezzük át?',
        options: [
          'A terület pontosan ugyanannyi marad',
          'A terület a felére csökken',
          'A terület megduplázódik',
          'Csak a kerülete marad ugyanannyi'
        ],
        correctAnswer: 'A terület pontosan ugyanannyi marad',
        hint: 'Darabolás és átrendezés során a síkrész felülete nem változik.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <rect x="30" y="15" width="60" height="38" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="30" y1="15" x2="15" y2="53" className="stroke-slate-400 stroke-1 stroke-dashed" />
            <text x="60" y="37" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">Átdarabolás</text>
          </svg>
        ),
        explanation: 'Az átdarabolás bizonyítja a képletet: a levágott háromszög átrakásával egy a széles és ma magas téglalapot kapunk, területe T = a · ma.'
      },
      {
        id: 'q1-10',
        prompt: 'Egy paralelogramma alapja a = 15 dm, magassága ma = 4 dm. Hány dm² a területe?',
        options: ['60 dm²', '38 dm²', '30 dm²', '19 dm²'],
        correctAnswer: '60 dm²',
        hint: '15 · 4 = ?',
        explanation: 'T = 15 dm · 4 dm = 60 dm².'
      }
    ]
  },

  // 2. SZINT: KÖZÉPHALADÓ (Mértékegység-váltás és a két magasság)
  2: {
    title: '2. Szint: Mértékegység-egyeztetés és Hiányzó Adatok',
    description: 'Két magasság kapcsolata (a · ma = b · mb), mértékegységek és rombusz számítások',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy paralelogramma alapja a = 1,2 m, a magassága ma = 50 cm. Mennyi a területe cm²-ben?',
        options: ['6000 cm²', '600 cm²', '60 cm²', '60 000 cm²'],
        correctAnswer: '6000 cm²',
        hint: 'Váltsd át az 1,2 métert centiméterre: 1,2 m = 120 cm. Ezután 120 · 50 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,15 95,15 75,55 0,55" fill="none" className="stroke-emerald-600 stroke-2" />
            <line x1="20" y1="15" x2="20" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="45" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 120 cm</text>
            <text x="14" y="38" className="text-[8px] font-bold fill-rose-600">50 cm</text>
          </svg>
        ),
        explanation: 'a = 1,2 m = 120 cm. T = 120 cm · 50 cm = 6000 cm².'
      },
      {
        id: 'q2-2',
        prompt: 'Egy paralelogramma területe T = 48 cm², oldala a = 8 cm. Mekkora a hozzá tartozó ma magasság?',
        options: ['6 cm', '12 cm', '8 cm', '384 cm'],
        correctAnswer: '6 cm',
        hint: 'ma = T / a = 48 / 8 = ?',
        explanation: 'ma = T / a = 48 cm² / 8 cm = 6 cm.'
      },
      {
        id: 'q2-3',
        prompt: 'Egy rombusz oldala a = 10 cm, magassága m = 7 cm. Mennyi a területe?',
        options: ['70 cm²', '35 cm²', '140 cm²', '34 cm²'],
        correctAnswer: '70 cm²',
        hint: 'A rombusz is paralelogramma, így T = a · m közvetlenül használható!',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="50,12 95,12 75,52 30,52" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="50" y1="12" x2="50" y2="52" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="36" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">T = 70 cm²</text>
          </svg>
        ),
        explanation: 'Mivel a rombusz olyan paralelogramma, aminek minden oldala egyenlő, T = a · m = 10 cm · 7 cm = 70 cm².'
      },
      {
        id: 'q2-4',
        prompt: 'Paralelogramma két oldala a = 12 cm és b = 8 cm. Az a-hoz tartozó magasság ma = 4 cm. Mekkora az mb magasság?',
        options: ['6 cm', '4 cm', '8 cm', '3 cm'],
        correctAnswer: '6 cm',
        hint: 'A terület mindkét magassággal ugyanaz: T = 12 · 4 = 48. mb = 48 / 8 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,12 85,12 65,52 5,52" fill="none" className="stroke-indigo-600 stroke-2" />
            <line x1="25" y1="12" x2="25" y2="52" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <line x1="25" y1="12" x2="52" y2="30" className="stroke-blue-500 stroke-1 stroke-dashed" />
            <text x="17" y="34" className="text-[8px] font-bold fill-rose-600">ma=4</text>
            <text x="45" y="63" className="text-[8px] font-bold fill-slate-700">a=12</text>
            <text x="80" y="34" className="text-[8px] font-bold fill-indigo-700">b=8</text>
          </svg>
        ),
        explanation: 'T = a · ma = 12 · 4 = 48 cm². Ekkor mb = T / b = 48 / 8 = 6 cm.'
      },
      {
        id: 'q2-5',
        prompt: 'Két különböző formájú paralelogrammának megegyezik az alapja és a magassága. Mi mondható el a területükről?',
        options: [
          'A területük pontosan egyenlő',
          'A dőltebb paralelogramma területe mindig kisebb',
          'A dőltebb paralelogramma területe mindig nagyobb',
          'Csak akkor egyenlő, ha az oldalaik hossza is megegyezik'
        ],
        correctAnswer: 'A területük pontosan egyenlő',
        hint: 'A képlet csak a-tól és ma-tól függ (Cavalieri-elv).',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,15 55,15 45,55 5,55" fill="none" className="stroke-emerald-600 stroke-1" />
            <polygon points="65,15 105,15 85,55 45,55" fill="none" className="stroke-blue-600 stroke-1 stroke-dashed" />
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Azonos alap és magasság</text>
          </svg>
        ),
        explanation: 'Mivel T = a · ma, ha a és ma egyenlő, a területük az elcsúszás mértékétől függetlenül pontosan megegyezik.'
      },
      {
        id: 'q2-6',
        prompt: 'Egy rombusz területe T = 48 cm², egyik átlója e = 8 cm. Mekkora a másik átló f?',
        options: ['12 cm', '6 cm', '24 cm', '16 cm'],
        correctAnswer: '12 cm',
        hint: 'T = (e · f) / 2 -> 48 = (8 · f) / 2 -> 48 = 4 · f.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="60,8 100,35 60,62 20,35" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="38" textAnchor="middle" className="text-[9px] font-black fill-teal-800">T = 48 cm²</text>
          </svg>
        ),
        explanation: 'f = (2 · T) / e = (2 · 48) / 8 = 96 / 8 = 12 cm.'
      },
      {
        id: 'q2-7',
        prompt: 'Egy paralelogramma alapját kétszeresére növeljük, de a magasságát felére csökkentjük. Hogyan változik a területe?',
        options: [
          'Változatlan marad',
          'Kétszeresére nő',
          'Felére csökken',
          'Négyszeresére nő'
        ],
        correctAnswer: 'Változatlan marad',
        hint: 'Új terület: (2a) · (ma / 2) = ?',
        explanation: 'T_új = (2 · a) · (ma / 2) = a · ma = T_eredeti. A szorzat értéke változatlan marad.'
      },
      {
        id: 'q2-8',
        prompt: 'Egy telek paralelogramma alakú: utcafrontja 25 m, merőleges mélysége 20 m. Hány ár a területe?',
        options: ['5 ár', '50 ár', '0,5 ár', '500 ár'],
        correctAnswer: '5 ár',
        hint: '1 ár = 100 m². Előbb számold ki m²-ben: 25 · 20 = ?',
        explanation: 'T = 25 m · 20 m = 500 m². Mivel 1 ár = 100 m², ez 500 / 100 = 5 ár.'
      },
      {
        id: 'q2-9',
        prompt: 'Paralelogramma oldalai a = 10 cm, b = 15 cm. Magasságai 6 cm és 9 cm. Melyik magasság tartozik az a = 10 cm-es oldalhoz?',
        options: [
          'A 9 cm-es magasság (ma = 9 cm)',
          'A 6 cm-es magasság (ma = 6 cm)',
          'Bármelyik tartozhat hozzá',
          'Egyik sem, nincs ilyen paralelogramma'
        ],
        correctAnswer: 'A 9 cm-es magasság (ma = 9 cm)',
        hint: 'A rövidebb oldalhoz a hosszabb magasság tartozik, hogy a szorzat egyenlő legyen: 10 · 9 = 15 · 6 = 90.',
        explanation: 'Mivel a < b (10 < 15), a hozzájuk tartozó magasságokra ma > mb kell teljesüljön: 10 · 9 = 90 és 15 · 6 = 90 cm².'
      },
      {
        id: 'q2-10',
        prompt: 'Egy rombusz kerülete K = 40 cm, területe T = 60 cm². Mekkora a magassága?',
        options: ['6 cm', '10 cm', '1,5 cm', '15 cm'],
        correctAnswer: '6 cm',
        hint: 'Rombusznál 4 egyenlő oldal van: a = 40 / 4 = 10 cm. m = T / a.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="50,15 90,15 70,55 30,55" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="38" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">a = 10 cm</text>
          </svg>
        ),
        explanation: 'a = K / 4 = 40 / 4 = 10 cm. m = T / a = 60 cm² / 10 cm = 6 cm.'
      }
    ]
  },

  // 3. SZINT: MESTER (Összetett összefüggések, arányok és szöveges feladatok)
  3: {
    title: '3. Szint: Összetett és Szöveges Geometriai Feladatok',
    description: 'Szögkapcsolatok, arányok, átlók és összetett síkgeometriai feladatok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy paralelogramma két oldala a = 15 cm és b = 10 cm. Lehet-e az a oldalhoz tartozó magasság ma = 12 cm?',
        options: [
          'Nem, mert a magasság sosem lehet hosszabb a ferde oldalnál (ma ≤ b)',
          'Igen, a magasság bármilyen hosszú lehet',
          'Igen, ha a tompaszöge elég nagy',
          'Csak akkor, ha a területe 180 cm²'
        ],
        correctAnswer: 'Nem, mert a magasság sosem lehet hosszabb a ferde oldalnál (ma ≤ b)',
        hint: 'A magasság egy derékszögű háromszög befogója, ahol b az átfogó!',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="30,15 95,15 75,55 10,55" fill="none" className="stroke-rose-600 stroke-2" />
            <line x1="30" y1="15" x2="30" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="15" y="32" className="text-[8px] font-bold fill-rose-600">b=10</text>
            <text x="35" y="38" className="text-[8px] font-bold fill-rose-700">m=12?!</text>
          </svg>
        ),
        explanation: 'A magasságot és a szomszédos b oldalt tartalmazó derékszögű háromszögben b az átfogó. Mivel az átfogó mindig a leghosszabb oldal, ma ≤ b, így 12 cm nem lehet nagyobb 10 cm-nél!'
      },
      {
        id: 'q3-2',
        prompt: 'Egy rombusz átlói e = 12 cm és f = 16 cm, oldala a = 10 cm. Mekkora a magassága m?',
        options: ['9,6 cm', '8 cm', '10 cm', '19,2 cm'],
        correctAnswer: '9,6 cm',
        hint: 'T = (e · f) / 2 = 96 cm². Másrészt T = a · m -> m = 96 / 10 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="60,8 100,35 60,62 20,35" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="37" textAnchor="middle" className="text-[8px] font-bold fill-teal-800">T = 96 cm²</text>
            <text x="60" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-600">a = 10 cm</text>
          </svg>
        ),
        explanation: 'T = (12 · 16) / 2 = 96 cm². Ugyanakkor T = a · m, így m = 96 / 10 = 9,6 cm.'
      },
      {
        id: 'q3-3',
        prompt: 'Egy paralelogramma alapja 3-szorosa a hozzá tartozó magasságának (a = 3 · ma). Területe T = 75 cm². Mekkora a magassága?',
        options: ['5 cm', '15 cm', '25 cm', '7,5 cm'],
        correctAnswer: '5 cm',
        hint: 'T = a · ma = (3 · ma) · ma = 3 · ma² = 75. ma² = 25.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,20 100,20 85,50 5,50" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="52" y="38" textAnchor="middle" className="text-[9px] font-bold fill-indigo-800">a = 3 · ma</text>
          </svg>
        ),
        explanation: '3 · ma² = 75 cm² -> ma² = 25 cm² -> ma = 5 cm (és az alap a = 15 cm).'
      },
      {
        id: 'q3-4',
        prompt: 'Egy paralelogramma kerülete K = 44 cm, egyik oldala a = 14 cm. Területe T = 70 cm². Mekkora a b oldalhoz tartozó mb magasság?',
        options: ['8,75 cm', '5 cm', '7 cm', '10 cm'],
        correctAnswer: '8,75 cm',
        hint: 'K = 2(a + b) -> a + b = 22 -> b = 22 - 14 = 8 cm. mb = T / b = 70 / 8.',
        explanation: 'a + b = 22 cm, így b = 22 - 14 = 8 cm. mb = T / b = 70 cm² / 8 cm = 8,75 cm.'
      },
      {
        id: 'q3-5',
        prompt: 'Egy paralelogramma területe T = 120 cm², magasságai ma = 8 cm és mb = 10 cm. Mennyi a kerülete?',
        options: ['54 cm', '27 cm', '48 cm', '60 cm'],
        correctAnswer: '54 cm',
        hint: 'a = 120 / 8 = 15 cm, b = 120 / 10 = 12 cm. K = 2 · (15 + 12) = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,12 85,12 65,52 5,52" fill="none" className="stroke-emerald-600 stroke-2" />
            <text x="45" y="35" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">T = 120 cm²</text>
            <text x="45" y="62" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">K = ?</text>
          </svg>
        ),
        explanation: 'a = 120 / 8 = 15 cm, b = 120 / 10 = 12 cm. K = 2 · (15 + 12) = 2 · 27 = 54 cm.'
      },
      {
        id: 'q3-6',
        prompt: 'Egy rombusz területe T = 120 cm², átlóinak aránya e : f = 3 : 5. Mekkora a rövidebb átló (e)?',
        options: ['12 cm', '20 cm', '6 cm', '15 cm'],
        correctAnswer: '12 cm',
        hint: 'T = (3x · 5x) / 2 = 120 -> 15x² = 240 -> x² = 16 -> x = 4.',
        explanation: 'T = (3x · 5x) / 2 = 7,5x² = 120 -> x² = 16 -> x = 4. A rövidebb átló: e = 3 · 4 = 12 cm (a hosszabb f = 20 cm).'
      },
      {
        id: 'q3-7',
        prompt: 'Két egybevágó háromszög alapja 8 cm, magassága 5 cm. Ha paralelogrammává illesztjük össze őket, mekkora lesz a paralelogramma területe?',
        options: ['40 cm²', '20 cm²', '80 cm²', '26 cm²'],
        correctAnswer: '40 cm²',
        hint: 'Egy háromszög területe (8 · 5) / 2 = 20 cm². Két ilyen háromszög együtt mennyi?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,15 85,15 65,55 0,55" fill="none" className="stroke-blue-600 stroke-2" />
            <line x1="20" y1="15" x2="65" y2="55" className="stroke-blue-400 stroke-1 stroke-dashed" />
            <text x="35" y="32" className="text-[8px] font-bold fill-blue-700">Δ1</text>
            <text x="50" y="42" className="text-[8px] font-bold fill-blue-700">Δ2</text>
          </svg>
        ),
        explanation: 'Egy háromszög területe (a · m) / 2 = 20 cm². Két egybevágó háromszög együtt éppen a · m = 40 cm² területű paralelogrammát alkot.'
      },
      {
        id: 'q3-8',
        prompt: 'Egy paralelogramma hegyesszöge 30°, oldalai a = 10 cm és b = 8 cm. Mennyi a területe?',
        options: ['40 cm²', '80 cm²', '20 cm²', '48 cm²'],
        correctAnswer: '40 cm²',
        hint: '30°-os derékszögű háromszögben a 30°-os szöggel szemközti befogó (a magasság) az átfogó fele: ma = 8 / 2 = 4 cm.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="30,18 95,18 70,54 5,54" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="30" y1="18" x2="30" y2="54" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="14" y="50" className="text-[8px] font-bold fill-slate-700">30°</text>
            <text x="12" y="32" className="text-[8px] font-bold fill-rose-600">b=8</text>
            <text x="33" y="38" className="text-[8px] font-bold fill-rose-700">m=4</text>
          </svg>
        ),
        explanation: 'A 30°-os szög miatt a magasság a ferde oldal fele: ma = 8 cm / 2 = 4 cm. Ekkor T = a · ma = 10 cm · 4 cm = 40 cm².'
      },
      {
        id: 'q3-9',
        prompt: 'Egy négyzet kerete 10 cm-es oldalakból áll (T = 100 cm²). Ha oldalait elforgatva rombusszá lapítjuk úgy, hogy hegyesszöge 60° lesz, hogyan változik a területe?',
        options: [
          'Csökken (kb. 86,6 cm² lesz), mert a magassága kisebb lesz mint az oldal',
          'Változatlan marad, mert a 4 oldal hossza nem változott',
          'Megnő, mert a rombusz átlói hosszabbak',
          'A felére csökken pontosan'
        ],
        correctAnswer: 'Csökken (kb. 86,6 cm² lesz), mert a magassága kisebb lesz mint az oldal',
        hint: 'Ahogy ferdül az alakzat, a két párhuzamos oldal közelebb kerül egymáshoz (a magasság csökken).',
        explanation: 'Bár az oldalak hossza azonos marad, a magasság m = a · sin(60°) ≈ 8,66 cm lesz, így a terület 100 cm²-ről 86,6 cm²-re csökken.'
      },
      {
        id: 'q3-10',
        prompt: 'Egy paralelogramma alapját 20%-kal növeljük, magasságát 20%-kal csökkentjük. Hogyan változik a területe?',
        options: [
          '4%-kal csökken',
          'Változatlan marad',
          '4%-kal nő',
          '2%-kal csökken'
        ],
        correctAnswer: '4%-kal csökken',
        hint: 'Új terület: (1,2 · a) · (0,8 · ma) = ?',
        explanation: 'T_új = 1,2 · a · 0,8 · ma = (1,2 · 0,8) · (a · ma) = 0,96 · T, ami pontosan 4%-os csökkenést jelent.'
      }
    ]
  }
};

export const ParallelogramAreaQuiz: React.FC<ParallelogramAreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-parallelogram-area"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 5. LECKE"
      title="5. A Paralelogramma Területe Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alap × magasság, átlók képlete rombusznál, két magasság összefüggése és kerületszámítás"
      cheatSheetTitle="Paralelogramma Terület Puskakártyák"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <ParallelogramAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ParallelogramAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default ParallelogramAreaQuiz;
