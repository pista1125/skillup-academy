import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TrapezoidAreaMatcher } from './TrapezoidAreaMatcher';
import { TrapezoidAreaSorter } from './TrapezoidAreaSorter';
import {
  Shapes,
  Maximize2,
  Layers,
  Ruler,
  Box,
  Compass,
  Split,
  Calculator
} from 'lucide-react';

interface TrapezoidAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Trapéz Területképlete',
    icon: <Shapes className="w-4 h-4 text-emerald-600" />,
    formula: 'T = \\frac{a + c}{2} \\cdot m = k \\cdot m',
    note: 'Az alapok számtani közepe szorozva a magassággal. A 2-vel való osztás az alapok összegére vonatkozik!'
  },
  {
    id: 'c2',
    title: 'A Középvonal (k)',
    icon: <Ruler className="w-4 h-4 text-teal-600" />,
    formula: 'k = \\frac{a + c}{2} \\quad \\implies \\quad T = k \\cdot m',
    note: 'A szárak felezőpontját köti össze, párhuzamos az alapokkal, és hossza az alapok átlaga.'
  },
  {
    id: 'c3',
    title: 'Derékszögű Trapéz',
    icon: <Compass className="w-4 h-4 text-sky-600" />,
    formula: 'd = m \\quad \\implies \\quad T = \\frac{a + c}{2} \\cdot d',
    note: 'A két alapra merőleges szár (d) maga a trapéz magassága. Magyar jelölése: ív + belső pont.'
  },
  {
    id: 'c4',
    title: 'Húrtrapéz (Szimmetrikus)',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    formula: 'b = d, \\quad K = a + 2b + c',
    note: 'Szárai és alapon fekvő szögei egyenlők. Tengelyesen szimmetrikus az alapok közös felezőmerőlegesére.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és közvetlen számítások)
  1: {
    title: '1. Szint: Alapfogalmak és Közvetlen Területszámítás',
    description: 'A trapéz részei, alapok és magasság, T = ((a + c) / 2) · m képlet alkalmazása',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik négyszöget nevezzük trapéznak a geometriában?',
        options: [
          'Amelynek van legalább egy párhuzamos oldalpárja',
          'Amelynek minden oldala egyenlő hosszú',
          'Amelynek pontosan négy derékszöge van',
          'Amelynek átlói felezik egymást'
        ],
        correctAnswer: 'Amelynek van legalább egy párhuzamos oldalpárja',
        hint: 'A trapéz minimális követelménye egy párhuzamos szemközti oldalpár.',
        explanation: 'A trapéz definíciója szerint olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja (ezek az alapok).'
      },
      {
        id: 'q1-2',
        prompt: 'Egy trapéz alapjai a = 12 cm és c = 8 cm, magassága m = 5 cm. Mennyi a területe?',
        options: ['50 cm²', '100 cm²', '60 cm²', '40 cm²'],
        correctAnswer: '50 cm²',
        hint: 'T = ((a + c) / 2) · m = ((12 + 8) / 2) · 5 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,55 105,55 85,20 35,20" fill="none" className="stroke-emerald-600 stroke-2" />
            <line x1="35" y1="20" x2="35" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            {/* Hungarian right angle marker: arc + dot at (35, 55) */}
            <path d="M 43 55 A 8 8 0 0 0 35 47" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="39" cy="51" r="1" className="fill-rose-500" />
            <text x="60" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = 12 cm</text>
            <text x="60" y="15" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">c = 8 cm</text>
            <text x="24" y="38" className="text-[9px] font-bold fill-rose-600">5 cm</text>
          </svg>
        ),
        explanation: 'T = ((a + c) / 2) · m = ((12 + 8) / 2) · 5 = (20 / 2) · 5 = 10 · 5 = 50 cm².'
      },
      {
        id: 'q1-3',
        prompt: 'Miért szerepel a 2-vel való osztás a trapéz területképletében: T = ((a + c) / 2) · m?',
        options: [
          'Mert két egybevágó trapéz pontosan egy (a + c) alapú paralelogrammát alkot',
          'Mert a trapéznak két alapja van',
          'Mert a trapéznak két szára van',
          'Mert a két átló felezi egymást'
        ],
        correctAnswer: 'Mert két egybevágó trapéz pontosan egy (a + c) alapú paralelogrammát alkot',
        hint: 'Két trapézból egy 180°-os forgatással paralelogrammát illeszthetünk össze.',
        figure: (
          <svg viewBox="0 0 120 60" className="w-28 h-14">
            <polygon points="10,48 70,48 55,15 25,15" fill="rgba(16, 185, 129, 0.2)" className="stroke-emerald-600 stroke-1.5" />
            <polygon points="70,48 100,48 115,15 55,15" fill="rgba(99, 102, 241, 0.15)" className="stroke-indigo-600 stroke-1 stroke-dashed" />
            <text x="40" y="56" className="text-[8px] font-bold fill-emerald-700">a</text>
            <text x="85" y="56" className="text-[8px] font-bold fill-indigo-700">c</text>
          </svg>
        ),
        explanation: 'Két egybevágó trapézt egymás mellé illesztve egy (a + c) alapú, m magasságú paralelogrammát kapunk. Ennek területe (a + c) · m, így egy trapéz területe ennek a fele.'
      },
      {
        id: 'q1-4',
        prompt: 'Egy trapéz alapjai a = 16 cm és c = 4 cm, magassága m = 7 cm. Mekkora a területe?',
        options: ['70 cm²', '140 cm²', '35 cm²', '56 cm²'],
        correctAnswer: '70 cm²',
        hint: '((16 + 4) / 2) · 7 = ?',
        explanation: 'T = ((16 + 4) / 2) · 7 = (20 / 2) · 7 = 10 · 7 = 70 cm².'
      },
      {
        id: 'q1-5',
        prompt: 'Hogyan nevezzük a trapéz két párhuzamos oldalát?',
        options: ['Alapok', 'Szárak', 'Átlók', 'Magasságok'],
        correctAnswer: 'Alapok',
        hint: 'A trapéz párhuzamos oldalai: a és c.',
        explanation: 'A trapéz párhuzamos oldalait alapoknak (alsó és felső alap), a nem párhuzamos oldalait pedig száraknak nevezzük.'
      },
      {
        id: 'q1-6',
        prompt: 'Egy derékszögű trapéz alapjai a = 10 cm és c = 6 cm, merőleges szára d = 4 cm. Mennyi a területe?',
        options: ['32 cm²', '64 cm²', '24 cm²', '40 cm²'],
        correctAnswer: '32 cm²',
        hint: 'Derékszögű trapézban a merőleges szár maga a magasság: m = d = 4 cm.',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="25,55 95,55 65,20 25,20" fill="none" className="stroke-teal-600 stroke-2" />
            {/* Hungarian right angles: arc + dot at (25, 55) and (25, 20) */}
            <path d="M 35 55 A 10 10 0 0 0 25 45" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="29" cy="51" r="1" className="fill-rose-500" />
            <path d="M 35 20 A 10 10 0 0 1 25 30" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="29" cy="24" r="1" className="fill-rose-500" />
            <text x="60" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = 10</text>
            <text x="45" y="15" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">c = 6</text>
            <text x="14" y="38" className="text-[9px] font-bold fill-rose-600">d = 4</text>
          </svg>
        ),
        explanation: 'Derékszögű trapéznál a merőleges szár egybeesik a magassággal (m = 4 cm). T = ((10 + 6) / 2) · 4 = 8 · 4 = 32 cm².'
      },
      {
        id: 'q1-7',
        prompt: 'Egy trapéz alapjai a = 9 cm és c = 5 cm. Mekkora a középvonala (k)?',
        options: ['7 cm', '14 cm', '8 cm', '6 cm'],
        correctAnswer: '7 cm',
        hint: 'A középvonal az alapok számtani közepe: k = (a + c) / 2.',
        explanation: 'k = (a + c) / 2 = (9 + 5) / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'q1-8',
        prompt: 'Ha egy trapéz középvonala k = 9 cm, magassága m = 6 cm, mennyi a területe?',
        options: ['54 cm²', '27 cm²', '108 cm²', '45 cm²'],
        correctAnswer: '54 cm²',
        hint: 'T = k · m = ?',
        explanation: 'Mivel k = (a + c) / 2, a terület közvetlenül: T = k · m = 9 · 6 = 54 cm².'
      },
      {
        id: 'q1-9',
        prompt: 'Egy trapéz alapjai a = 15 cm, c = 5 cm, és a szárai b = 7 cm, d = 8 cm. Mennyi a kerülete?',
        options: ['35 cm', '75 cm²', '40 cm', '25 cm'],
        correctAnswer: '35 cm',
        hint: 'A kerület a négy oldal összege: K = a + b + c + d.',
        explanation: 'K = a + b + c + d = 15 + 7 + 5 + 8 = 35 cm. (Figyelem: kerülethez nincs szükség magasságra!)'
      },
      {
        id: 'q1-10',
        prompt: 'Egy húrtrapéz alapjai a = 11 cm és c = 7 cm, magassága m = 4 cm. Mennyi a területe?',
        options: ['36 cm²', '72 cm²', '18 cm²', '44 cm²'],
        correctAnswer: '36 cm²',
        hint: 'T = ((11 + 7) / 2) · 4 = ?',
        explanation: 'T = ((11 + 7) / 2) · 4 = (18 / 2) · 4 = 9 · 4 = 36 cm².'
      }
    ]
  },

  // 2. SZINT: KÖZÉPHALADÓ (Középvonal, speciális trapézok és visszaszámolás)
  2: {
    title: '2. Szint: Középvonal, Speciális Trapézok és Visszaszámolás',
    description: 'Hiányzó magasság és alap meghatározása területből, szimmetrikus húrtrapéz tulajdonságai',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy trapéz területe T = 60 cm², alapjai a = 14 cm és c = 6 cm. Mekkora a trapéz magassága?',
        options: ['6 cm', '3 cm', '12 cm', '5 cm'],
        correctAnswer: '6 cm',
        hint: 'm = (2 · T) / (a + c) = 120 / 20 = ?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="15,55 105,55 80,20 40,20" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="40" y1="20" x2="40" y2="55" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <path d="M 48 55 A 8 8 0 0 0 40 47" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="44" cy="51" r="1" className="fill-rose-500" />
            <text x="60" y="38" textAnchor="middle" className="text-[9px] font-black fill-teal-800">T = 60 cm²</text>
            <text x="60" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 14</text>
            <text x="60" y="15" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">c = 6</text>
          </svg>
        ),
        explanation: 'Az alapok összege: a + c = 14 + 6 = 20 cm (k = 10 cm). m = T / k = 60 / 10 = 6 cm.'
      },
      {
        id: 'q2-2',
        prompt: 'Egy trapéz területe T = 48 cm², magassága m = 6 cm, alsó alapja a = 10 cm. Mekkora a felső alap (c)?',
        options: ['6 cm', '8 cm', '4 cm', '16 cm'],
        correctAnswer: '6 cm',
        hint: 'Középvonal k = T / m = 48 / 6 = 8 cm. Ha (a + c) / 2 = 8, akkor a + c = 16.',
        explanation: 'k = T / m = 48 / 6 = 8 cm. Mivel k = (a + c) / 2, ezért a + c = 16 cm. c = 16 - 10 = 6 cm.'
      },
      {
        id: 'q2-3',
        prompt: 'Melyik állítás IGAZ minden húrtrapézra (egyenlő szárú trapézra)?',
        options: [
          'Szárai és alapon fekvő szögei egyenlők, átlói egyenlő hosszúak',
          'Minden szöge derékszög',
          'Átlói merőlegesek egymásra és felezik egymást',
          'Két szimmetriatengelye van'
        ],
        correctAnswer: 'Szárai és alapon fekvő szögei egyenlők, átlói egyenlő hosszúak',
        hint: 'A húrtrapéznak 1 szimmetriatengelye van (az alapok felezőmerőlegese).',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <line x1="60" y1="10" x2="60" y2="60" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="20,55 100,55 80,18 40,18" fill="none" className="stroke-emerald-600 stroke-2" />
            <line x1="20" y1="55" x2="80" y2="18" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="100" y1="55" x2="40" y2="18" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        ),
        explanation: 'A húrtrapéz tengelyesen szimmetrikus, szárai egyenlők (b = d), alapon fekvő szögei egyenlők (α = β), és átlói is egyenlő hosszúak.'
      },
      {
        id: 'q2-4',
        prompt: 'Egy derékszögű trapéz alapjai a = 13 cm és c = 7 cm, területe T = 50 cm². Mekkora a merőleges szára?',
        options: ['5 cm', '10 cm', '2,5 cm', '8 cm'],
        correctAnswer: '5 cm',
        hint: 'A merőleges szár megegyezik a magassággal: d = m = T / k.',
        explanation: 'k = (13 + 7) / 2 = 10 cm. d = m = T / k = 50 / 10 = 5 cm.'
      },
      {
        id: 'q2-5',
        prompt: 'Egy trapéz középvonala k = 15 cm, területe T = 120 cm². Mekkora a trapéz magassága?',
        options: ['8 cm', '4 cm', '16 cm', '10 cm'],
        correctAnswer: '8 cm',
        hint: 'm = T / k = 120 / 15 = ?',
        explanation: 'T = k · m ⟹ m = T / k = 120 / 15 = 8 cm.'
      },
      {
        id: 'q2-6',
        prompt: 'Egy húrtrapéz kerülete K = 38 cm, alapjai a = 14 cm és c = 8 cm. Mekkora egy-egy szára (b)?',
        options: ['8 cm', '16 cm', '6 cm', '10 cm'],
        correctAnswer: '8 cm',
        hint: 'K = a + 2b + c ⟹ 38 = 14 + 2b + 8.',
        explanation: 'A két alap összege 14 + 8 = 22 cm. A két szár összege: 38 - 22 = 16 cm. Mivel a szárak egyenlők: b = 16 / 2 = 8 cm.'
      },
      {
        id: 'q2-7',
        prompt: 'Egy trapézt a középvonala mentén két kisebb trapézra vágunk. Hogyan viszonyul a két kis trapéz magassága az eredetihez?',
        options: [
          'Mindkettő magassága fele az eredeti m magasságnak (m / 2)',
          'Mindkettő magassága egyenlő az eredetivel',
          'A felsőé kisebb, az alsóé nagyobb',
          'Nem lehet megállapítani'
        ],
        correctAnswer: 'Mindkettő magassága fele az eredeti m magasságnak (m / 2)',
        hint: 'A középvonal a szárak felezőpontjait köti össze, így a magasságot is felezi.',
        explanation: 'Mivel a középvonal a szárak felezőpontjait köti össze és párhuzamos az alapokkal, a trapéz magasságát pontosan megfelezi: m1 = m2 = m / 2.'
      },
      {
        id: 'q2-8',
        prompt: 'Egy trapéz alapjai a = 18 cm és c = 6 cm, magassága m = 9 cm. Mekkora a területe?',
        options: ['108 cm²', '216 cm²', '54 cm²', '120 cm²'],
        correctAnswer: '108 cm²',
        hint: 'k = (18 + 6) / 2 = 12 cm. T = 12 · 9 = ?',
        explanation: 'T = ((18 + 6) / 2) · 9 = 12 · 9 = 108 cm².'
      },
      {
        id: 'q2-9',
        prompt: 'Hány derékszöge lehet egy nem téglalap trapéznak?',
        options: ['Pontosan 2', 'Pontosan 1', 'Pontosan 3', 'Bármennyi'],
        correctAnswer: 'Pontosan 2',
        hint: 'Ha egy szár merőleges az egyik párhuzamos alapra, a másikra is merőlegesnek kell lennie.',
        explanation: 'Mivel az alapok párhuzamosak, ha az egyik szár merőleges az alsó alapra, merőleges a felsőre is. Így pontosan 2 derékszöge van (ha 4 lenne, téglalap lenne).'
      },
      {
        id: 'q2-10',
        prompt: 'Egy trapéz területe T = 75 cm², magassága m = 5 cm. Mennyi a két alap összege (a + c)?',
        options: ['30 cm', '15 cm', '60 cm', '25 cm'],
        correctAnswer: '30 cm',
        hint: 'k = T / m = 75 / 5 = 15 cm. a + c = 2 · k = ?',
        explanation: 'k = (a + c) / 2 = T / m = 75 / 5 = 15 cm. Ebből az alapok összege: a + c = 2 · 15 = 30 cm.'
      }
    ]
  },

  // 3. SZINT: HALADÓ ÉS ÖSSZETETT FELADATOK
  3: {
    title: '3. Szint: Összetett és Gyakorlati Szöveges Feladatok',
    description: 'Szimmetrikus húrtrapéz felbontása részekre, területi arányok, méretváltozások és gyakorlati példák',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy húrtrapéz alapjai a = 16 cm és c = 8 cm. A felső csúcsokból magasságokat húzunk az alsó alapra. Mekkorák a keletkező szélső szakaszok az alsó alapon?',
        options: ['4 cm mindkettő', '8 cm mindkettő', '2 cm mindkettő', '5 cm mindkettő'],
        correctAnswer: '4 cm mindkettő',
        hint: 'A középső rész egy c = 8 cm-es téglalap. A maradék (16 - 8) feleződik a szimmetria miatt.',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16">
            <polygon points="15,55 125,55 95,18 45,18" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="45" y1="18" x2="45" y2="55" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="95" y1="18" x2="95" y2="55" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 2" />
            {/* Hungarian right angles: arc + dot */}
            <path d="M 51 55 A 6 6 0 0 0 45 49" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="48" cy="52" r="0.8" className="fill-rose-500" />
            <path d="M 95 49 A 6 6 0 0 0 89 55" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="92" cy="52" r="0.8" className="fill-rose-500" />
            <text x="30" y="65" className="text-[7px] font-bold fill-rose-600">x = ?</text>
            <text x="70" y="65" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">c = 8</text>
            <text x="110" y="65" className="text-[7px] font-bold fill-rose-600">x = ?</text>
          </svg>
        ),
        explanation: 'A szimmetria miatt a két szélső derékszögű háromszög alapja egyenlő: x = (a - c) / 2 = (16 - 8) / 2 = 8 / 2 = 4 cm.'
      },
      {
        id: 'q3-2',
        prompt: 'Egy derékszögű trapézt felbontunk egy 8 cm × 6 cm-es téglalapra és egy derékszögű háromszögre, melynek befogói 5 cm és 6 cm. Mennyi a trapéz területe?',
        options: ['63 cm²', '48 cm²', '78 cm²', '58 cm²'],
        correctAnswer: '63 cm²',
        hint: 'T_trapéz = T_téglalap + T_háromszög = (8 · 6) + ((5 · 6) / 2).',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16">
            <polygon points="20,55 95,55 60,18 20,18" fill="none" className="stroke-indigo-600 stroke-2" />
            <line x1="60" y1="18" x2="60" y2="55" stroke="#059669" strokeWidth="1" strokeDasharray="3 2" />
            <text x="40" y="38" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">Téglalap</text>
            <text x="76" y="42" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">Δ</text>
          </svg>
        ),
        explanation: 'T_téglalap = 8 · 6 = 48 cm². T_háromszög = (5 · 6) / 2 = 15 cm². T_trapéz = 48 + 15 = 63 cm². (Vagy képlettel: a = 13, c = 8, m = 6 ⟹ ((13+8)/2)·6 = 21·3 = 63 cm²).'
      },
      {
        id: 'q3-3',
        prompt: 'Hogyan változik a trapéz területe, ha mindkét alapját és a magasságát is a 2-szeresére növeljük?',
        options: [
          'A területe a 4-szeresére nő',
          'A területe a 2-szeresére nő',
          'A területe a 8-szorosára nő',
          'Nem változik'
        ],
        correctAnswer: 'A területe a 4-szeresére nő',
        hint: 'T_új = ((2a + 2c) / 2) · (2m) = 2 · ((a + c) / 2) · 2m = 4 · T.',
        explanation: 'Minden hosszméret megduplázódásakor a 2D-s terület a szorzótényezők négyzetszeresével nő: 2 · 2 = 4-szeresére!'
      },
      {
        id: 'q3-4',
        prompt: 'Egy földgát keresztmetszete trapéz alakú: alsó szélessége 18 m, felső szélessége 6 m, magassága 4 m. Mennyi a keresztmetszet területe?',
        options: ['48 m²', '96 m²', '72 m²', '36 m²'],
        correctAnswer: '48 m²',
        hint: 'T = ((18 + 6) / 2) · 4 = 12 · 4 = ?',
        explanation: 'T = ((18 + 6) / 2) · 4 = (24 / 2) · 4 = 12 · 4 = 48 m².'
      },
      {
        id: 'q3-5',
        prompt: 'Egy trapéz alapjai aránya a : c = 3 : 1. A két alap összege 24 cm, magassága 5 cm. Mekkora a területe?',
        options: ['60 cm²', '120 cm²', '45 cm²', '30 cm²'],
        correctAnswer: '60 cm²',
        hint: 'Ha a + c = 24 cm, a középvonal k = 12 cm. T = k · m.',
        explanation: 'Mivel közvetlenül ismert a két alap összege: a + c = 24 cm, k = 12 cm. T = k · m = 12 · 5 = 60 cm².'
      },
      {
        id: 'q3-6',
        prompt: 'Egy trapéz magassága megegyezik a középvonalával (k = m). Területe T = 64 cm². Mekkora a magassága?',
        options: ['8 cm', '16 cm', '4 cm', '32 cm'],
        correctAnswer: '8 cm',
        hint: 'T = k · m = m · m = m² = 64. m = √64.',
        explanation: 'T = k · m = m² = 64 cm² ⟹ m = √64 = 8 cm.'
      },
      {
        id: 'q3-7',
        prompt: 'Egy trapéz alapjai a = 10 cm és c = 6 cm. Ha a magasságát felére csökkentjük, de a középvonalát megduplázzuk, hogyan változik a területe?',
        options: [
          'Változatlan marad',
          'A felére csökken',
          'Megduplázódik',
          'A négyszeresére nő'
        ],
        correctAnswer: 'Változatlan marad',
        hint: 'T_új = (2 · k) · (m / 2) = k · m = T_eredeti.',
        explanation: 'Mivel a terület T = k · m, az egyik tényező duplázása és a másik felezése kiejti egymást: 2 · (1/2) = 1, a terület változatlan marad.'
      },
      {
        id: 'q3-8',
        prompt: 'Egy egyenlő szárú trapéz területe T = 72 cm², alsó alapja a = 15 cm, felső alapja c = 9 cm. Szárai hossza b = 5 cm. Mekkora a kerülete?',
        options: ['34 cm', '29 cm', '39 cm', '48 cm'],
        correctAnswer: '34 cm',
        hint: 'K = a + 2b + c = 15 + 2·5 + 9 = ?',
        explanation: 'K = a + 2b + c = 15 + 10 + 9 = 34 cm. (A kerülethez nem szükséges a magasság, de ellenőrizhető: m = 72 / 12 = 6 cm).'
      },
      {
        id: 'q3-9',
        prompt: 'Egy húrtrapéz alapjai a = 20 cm, c = 8 cm, szárai b = 10 cm, magassága m = 8 cm. Mekkora a területe és a kerülete?',
        options: [
          'T = 112 cm², K = 48 cm',
          'T = 112 cm², K = 38 cm',
          'T = 224 cm², K = 48 cm',
          'T = 96 cm², K = 40 cm'
        ],
        correctAnswer: 'T = 112 cm², K = 48 cm',
        hint: 'k = (20 + 8) / 2 = 14 cm. T = 14 · 8 = 112 cm². K = 20 + 8 + 10 + 10 = 48 cm.',
        explanation: 'T = ((20 + 8) / 2) · 8 = 14 · 8 = 112 cm². K = 20 + 8 + 2 · 10 = 48 cm.'
      },
      {
        id: 'q3-10',
        prompt: 'Egy telek trapéz alakú: párhuzamos utcai és hátsó frontja 35 m és 25 m, mélysége (magassága) 40 m. Mennyi a telek területe négyzetméterben?',
        options: ['1200 m²', '2400 m²', '600 m²', '1400 m²'],
        correctAnswer: '1200 m²',
        hint: 'T = ((35 + 25) / 2) · 40 = 30 · 40 = ?',
        explanation: 'T = ((35 + 25) / 2) · 40 = 30 · 40 = 1200 m².'
      }
    ]
  }
};

export const TrapezoidAreaQuiz: React.FC<TrapezoidAreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="7. A trapéz területe Kvíz"
      subtitle="Gyakorold a trapéz területképletét, a középvonal számítását és az összetett geometriai feladatokat!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA"
      topicId="g7-geom-trapezoid-area"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <TrapezoidAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <TrapezoidAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <TrapezoidAreaMatcher
          {...props}
          key={`trapezoid-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <TrapezoidAreaSorter
          {...props}
          key={`trapezoid-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
