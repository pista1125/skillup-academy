import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Triangle,
  Shapes,
  Maximize2,
  Award,
  Sparkles,
  LayoutGrid,
  ArrowRightLeft,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { PythagorasTheoremMatcher } from './PythagorasTheoremMatcher';
import { PythagorasTheoremSorter } from './PythagorasTheoremSorter';

interface PythagorasTheoremQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'pt-c1',
    title: 'A Pitagorasz-tétel Alapképlete',
    icon: <Triangle className="w-4 h-4 text-orange-600" />,
    formula: 'a^2 + b^2 = c^2 \\iff T_a + T_b = T_c',
    note: 'Kizárólag derékszögű háromszögekben érvényes! A két befogóra emelt négyzet területének összege egyenlő az átfogónégyzet területével.',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <polygon points="20,44 70,44 20,14" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
        {/* Magyar derékszög jelölés: negyedkörív és pont */}
        <path d="M 20 34 A 10 10 0 0 1 30 44" fill="none" stroke="#b45309" strokeWidth="1" />
        <circle cx="24" cy="40" r="1.1" fill="#b45309" />
        <text x="12" y="30" className="text-[7px] font-bold fill-amber-800">a</text>
        <text x="44" y="52" className="text-[7px] font-bold fill-orange-800">b</text>
        <text x="50" y="26" className="text-[7.5px] font-black fill-emerald-700">c</text>
        <text x="115" y="24" className="text-[8px] font-black fill-orange-700" textAnchor="middle">a² + b² = c²</text>
        <text x="115" y="38" className="text-[6.5px] fill-slate-600" textAnchor="middle">c = leghosszabb él</text>
      </svg>
    )
  },
  {
    id: 'pt-c2',
    title: 'Átfogó és Befogó Számítása',
    icon: <Shapes className="w-4 h-4 text-amber-600" />,
    formula: 'c = \\sqrt{a^2 + b^2} \\quad \\text{vs.} \\quad a = \\sqrt{c^2 - b^2}',
    note: 'Átfogónál ÖSSZEADUNK a gyök alatt! Befogó számításakor mindig az átfogó négyzetéből VONJUK KI az ismert befogót!',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <text x="80" y="20" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">
          Átfogó: c = √(a² + b²) ➕
        </text>
        <text x="80" y="38" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">
          Befogó: a = √(c² - b²) ➖
        </text>
        <text x="80" y="50" className="text-[6px] fill-rose-600 font-bold" textAnchor="middle">
          Vigyázat: √(a²+b²) ≠ a + b !
        </text>
      </svg>
    )
  },
  {
    id: 'pt-c3',
    title: 'Pitagoraszi Számhármasok',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: '(3, 4, 5) \\implies (6, 8, 10), \\quad (5, 12, 13), \\quad (8, 15, 17)',
    note: 'Olyan pozitív egész számok, amelyek kielégítik az a² + b² = c² egyenletet. Bármely számhármas k-szorosa is érvényes számhármas!',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <rect x="15" y="10" width="130" height="35" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="80" y="24" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">3 - 4 - 5 • 5 - 12 - 13</text>
        <text x="80" y="36" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">8 - 15 - 17 • 7 - 24 - 25</text>
      </svg>
    )
  },
  {
    id: 'pt-c4',
    title: 'Átrendezéses Geometriai Bizonyítás',
    icon: <Maximize2 className="w-4 h-4 text-indigo-600" />,
    formula: '(a + b)^2 = 4 \\cdot \\frac{ab}{2} + c^2 = a^2 + b^2 + 4 \\cdot \\frac{ab}{2}',
    note: 'Két azonos (a+b) oldalú nagy négyzetből 4-4 derékszögű háromszöget elhagyva a megmaradó területek egyenlők: c² = a² + b².',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        {/* Bal oldali négyzet: c^2 ferdén középen */}
        <rect x="25" y="10" width="34" height="34" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <polygon points="25,22 49,10 61,34 37,44" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <text x="43" y="29" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">c²</text>

        <text x="75" y="29" className="text-[9px] font-black fill-slate-700">=</text>

        {/* Jobb oldali négyzet: a^2 és b^2 blokkok */}
        <rect x="90" y="10" width="34" height="34" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <rect x="90" y="24" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <rect x="110" y="10" width="14" height="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <text x="100" y="36" className="text-[6px] font-black fill-amber-900" textAnchor="middle">b²</text>
        <text x="117" y="19" className="text-[5.5px] font-black fill-orange-900" textAnchor="middle">a²</text>
      </svg>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapok és Képletek',
    description: '10 alapozó feladat a tétel felismeréséről, az átfogó és befogó kiszámításáról és a területekről',
    badgeText: '1. Szint • Alapozó',
    badgeColor: 'amber',
    icon: <Triangle className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'A Pitagorasz-tétel algebrai alakja',
        question: 'Mi a Pitagorasz-tétel helyes algebrai alakja derékszögű háromszögben, ahol a és b a befogók, c pedig az átfogó?',
        options: [
          'a² + b² = c²',
          'a + b = c',
          'a² - b² = c²',
          'a² + c² = b²'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel kimondja, hogy a befogók négyzetösszege egyenlő az átfogó négyzetével: a² + b² = c².'
      },
      {
        id: 'q1-2',
        title: 'Az átfogó azonosítása',
        question: 'Melyik oldal felel meg a Pitagorasz-tétel képletében (a² + b² = c²) a \'c\' betűnek?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <polygon points="35,62 125,62 35,20" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 52 A 10 10 0 0 1 45 62" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="39" cy="58" r="1.2" fill="#6366f1" />
            <text x="22" y="45" className="text-[9.5px] font-bold fill-slate-700">a</text>
            <text x="80" y="72" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-700">b</text>
            <text x="85" y="38" className="text-[10px] font-bold fill-indigo-600">c</text>
          </svg>
        ),
        options: [
          'Mindig a 90°-os derékszöggel szemközti leghosszabb oldal (átfogó).',
          'Bármelyik tetszőleges oldal, a betűzés mindegy.',
          'Mindig a vízszintes befogó.',
          'A háromszög legrövidebb oldala.'
        ],
        correctAnswer: 0,
        explanation: 'A képletben a \'c\' jelölés a derékszögű csúccsal szemben lévő leghosszabb oldalt, az átfogót jelenti.'
      },
      {
        id: 'q1-3',
        title: 'Átfogó kifejezése',
        question: 'Hogyan fejezhető ki az átfogó hossza (c) a befogók ismeretében?',
        options: [
          'c = √(a² + b²)',
          'c = a + b',
          'c = √(a² - b²)',
          'c = (a² + b²) / 2'
        ],
        correctAnswer: 0,
        explanation: 'Mivel c² = a² + b², mindkét oldalból négyzetgyököt vonva c = √(a² + b²) adódik.'
      },
      {
        id: 'q1-4',
        title: 'Befogó kifejezése',
        question: 'Hogyan fejezhető ki az \'a\' befogó az átfogó (c) és a másik befogó (b) segítségével?',
        options: [
          'a = √(c² - b²) (kivonással!)',
          'a = √(c² + b²)',
          'a = c - b',
          'a = √(b² - c²)'
        ],
        correctAnswer: 0,
        explanation: 'Az a² = c² - b² egyenletből négyzetgyökvonással kapjuk: a = √(c² - b²). Befogó számításakor mindig kivonást végzünk!'
      },
      {
        id: 'q1-5',
        title: 'Számolás: 3-4-5 háromszög',
        question: 'Egy derékszögű háromszög befogói a = 3 cm és b = 4 cm. Mekkora az átfogó (c)?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <polygon points="35,62 125,62 35,22" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 52 A 10 10 0 0 1 45 62" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="39" cy="58" r="1.2" fill="#64748b" />
            <text x="20" y="45" className="text-[9px] font-bold fill-slate-700">a = 3</text>
            <text x="80" y="72" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">b = 4</text>
            <text x="85" y="38" className="text-[10px] font-bold fill-indigo-600">c = ?</text>
          </svg>
        ),
        options: [
          '5 cm',
          '7 cm',
          '25 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        explanation: 'c² = 3² + 4² = 9 + 16 = 25. c = √25 = 5 cm.'
      },
      {
        id: 'q1-6',
        title: 'Számolás: 6-8-10 háromszög',
        question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogója?',
        options: [
          '10 cm',
          '14 cm',
          '100 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        explanation: 'c² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 cm. (Ez a 3-4-5 kétszerese!)'
      },
      {
        id: 'q1-7',
        title: 'Befogó számítása: 5-12-13',
        question: 'Egy derékszögű háromszög átfogója c = 13 cm, egyik befogója a = 5 cm. Mekkora a másik befogó (b)?',
        options: [
          '12 cm',
          '8 cm',
          '18 cm',
          '144 cm'
        ],
        correctAnswer: 0,
        explanation: 'b² = c² - a² = 13² - 5² = 169 - 25 = 144. b = √144 = 12 cm.'
      },
      {
        id: 'q1-8',
        title: 'Befogó számítása: átfogó 10 cm',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, egyik befogója b = 6 cm. Mekkora a hiányzó \'a\' befogó?',
        options: [
          '8 cm',
          '4 cm',
          '64 cm',
          '16 cm'
        ],
        correctAnswer: 0,
        explanation: 'a² = 10² - 6² = 100 - 36 = 64. a = √64 = 8 cm.'
      },
      {
        id: 'q1-9',
        title: 'Befogónégyzetekből átfogónégyzet',
        question: 'Egy derékszögű háromszög két befogójára emelt négyzetek területe 25 cm² és 144 cm². Mekkora az átfogóra rajzolt négyzet területe?',
        options: [
          '169 cm²',
          '119 cm²',
          '13 cm²',
          '3600 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel szerint Tc = Ta + Tb = 25 + 144 = 169 cm².'
      },
      {
        id: 'q1-10',
        title: 'Hiányzó befogónégyzet területe',
        question: 'Az átfogónégyzet területe 100 cm², az egyik befogónégyzet területe 64 cm². Mekkora a másik befogónégyzet területe?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <rect x="25" y="32" width="28" height="28" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <text x="39" y="48" className="text-[8px] font-bold fill-orange-950" textAnchor="middle">Ta = ?</text>
            <rect x="53" y="60" width="40" height="16" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <text x="73" y="72" className="text-[7.5px] font-bold fill-amber-950" textAnchor="middle">64</text>
            <polygon points="53,60 93,60 53,32" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="80" y="42" className="text-[8px] font-bold fill-emerald-800">Tc = 100</text>
          </svg>
        ),
        options: [
          '36 cm²',
          '164 cm²',
          '6 cm²',
          '8 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Tb = Tc - Ta = 100 cm² - 64 cm² = 36 cm².'
      }
    ]
  },
  2: {
    title: '2. Szint: Számhármasok és Gyökös Értékek',
    description: '10 mélyebb kérdés a pitagoraszi számhármasokról, gyökös eredményekről és tipikus csapdákról',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'orange',
    icon: <Shapes className="w-4 h-4 text-orange-600" />,
    questions: [
      {
        id: 'q2-1',
        title: 'Pitagoraszi számhármas felismerése',
        question: 'Az alábbi számtriókból melyik NEM alkot pitagoraszi számhármast?',
        options: [
          '(4, 5, 6)',
          '(3, 4, 5)',
          '(5, 12, 13)',
          '(8, 15, 17)'
        ],
        correctAnswer: 0,
        explanation: '4² + 5² = 16 + 25 = 41 ≠ 6² = 36. Tehát a (4, 5, 6) nem pitagoraszi számhármas, a háromszög tompaszögű.'
      },
      {
        id: 'q2-2',
        title: 'Számhármas többszöröse',
        question: 'Ha (3, 4, 5) egy pitagoraszi számhármas, és mindegyik számot megszorozzuk 5-tel, milyen számhármast kapunk?',
        options: [
          '(15, 20, 25)',
          '(8, 9, 10)',
          '(15, 20, 30)',
          '(9, 16, 25)'
        ],
        correctAnswer: 0,
        explanation: 'Bármely pitagoraszi számhármas skaláris szorzata k · (a, b, c) is érvényes számhármas: 15² + 20² = 225 + 400 = 625 = 25².'
      },
      {
        id: 'q2-3',
        title: 'Egyenlő szárú derékszögű háromszög átfogója',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 1 cm és 1 cm. Mekkora az átfogó pontos hossza?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="35,68 115,68 35,20" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 56 A 12 12 0 0 1 47 68" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="39" cy="64" r="1.2" fill="#64748b" />
            <text x="22" y="48" className="text-[9px] font-bold fill-slate-700">1</text>
            <text x="75" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">1</text>
            <text x="82" y="42" className="text-[10px] font-bold fill-indigo-600">c = ?</text>
          </svg>
        ),
        options: [
          '√2 cm (kb. 1,414 cm)',
          '2 cm',
          '1 cm',
          '√3 cm'
        ],
        correctAnswer: 0,
        explanation: 'c² = 1² + 1² = 1 + 1 = 2, amiből c = √2 cm.'
      },
      {
        id: 'q2-4',
        title: '5 cm szárú derékszögű háromszög átfogója',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói a = b = 5 cm. Mekkora az átfogó?',
        options: [
          '5√2 cm (azaz √50 cm)',
          '10 cm',
          '25 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: 'c² = 5² + 5² = 25 + 25 = 50. c = √50 = √(25 · 2) = 5√2 cm.'
      },
      {
        id: 'q2-5',
        title: 'Befogó számítása: 25 és 24',
        question: 'Egy derékszögű háromszög átfogója 25 cm, egyik befogója 24 cm. Mekkora a másik befogó?',
        options: [
          '7 cm',
          '1 cm',
          '10 cm',
          '49 cm'
        ],
        correctAnswer: 0,
        explanation: 'a² = 25² - 24² = 625 - 576 = 49. a = √49 = 7 cm. Ez a (7, 24, 25) nevezetes számhármas!'
      },
      {
        id: 'q2-6',
        title: 'A gyökvonás csapdája',
        question: 'Miért hibás az az egyszerűsítés, hogy √(a² + b²) = a + b ?',
        options: [
          'Mert az összegből nem lehet tagonként négyzetgyököt vonni (pl. √(9+16) = √25 = 5 ≠ 3+4 = 7).',
          'Mert ez csak negatív számokra nem érvényes.',
          'Mert csak átfogónál érvényes, befogónál nem.',
          'Nem hibás, mindig pontosan megegyezik a két kifejezés.'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetgyökvonás nem végezhető el tagonként összeadásnál! √(9 + 16) = √25 = 5, míg 3 + 4 = 7. Az 5 ≠ 7!'
      },
      {
        id: 'q2-7',
        title: 'Terület számítása Pitagorasz-tétellel',
        question: 'Egy derékszögű háromszög átfogója c = 15 cm, egyik befogója a = 9 cm. Mekkora a háromszög területe?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="35,68 125,68 35,25" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 56 A 12 12 0 0 1 47 68" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="39" cy="64" r="1.2" fill="#64748b" />
            <text x="18" y="50" className="text-[9px] font-bold fill-slate-700">a = 9</text>
            <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">b = ?</text>
            <text x="88" y="42" className="text-[9px] font-bold fill-slate-700">c = 15</text>
            <text x="55" y="56" className="text-[10px] font-bold fill-indigo-600">T = ?</text>
          </svg>
        ),
        options: [
          '54 cm²',
          '108 cm²',
          '67,5 cm²',
          '135 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A hiányzó befogó: b = √(15² - 9²) = √(225 - 81) = √144 = 12 cm. A terület: T = (a · b) / 2 = (9 · 12) / 2 = 54 cm².'
      },
      {
        id: 'q2-8',
        title: '8-15-17 számhármas átfogója',
        question: 'Egy derékszögű háromszög befogói 8 cm és 15 cm. Mekkora az átfogója?',
        options: [
          '17 cm',
          '23 cm',
          '19 cm',
          '289 cm'
        ],
        correctAnswer: 0,
        explanation: 'c² = 8² + 15² = 64 + 225 = 289. c = √289 = 17 cm.'
      },
      {
        id: 'q2-9',
        title: 'Szögtípus és négyzetösszeg kapcsolata',
        question: 'Ha egy háromszög leghosszabb oldalára a² + b² < c² teljesül, akkor milyen típusú a háromszög?',
        options: [
          'Tompaszögű háromszög (a tompaszög szemben van c-vel)',
          'Hegyesszögű háromszög',
          'Derékszögű háromszög',
          'Nem szerkeszthető háromszög'
        ],
        correctAnswer: 0,
        explanation: 'Ha a² + b² < c², a szöge nagyobb, mint 90°, tehát a háromszög tompaszögű. Egyenlőségnél derékszögű, ha pedig a² + b² > c², hegyesszögű.'
      },
      {
        id: 'q2-10',
        title: '9, 40, 41 oldalhosszak',
        question: 'Egy háromszög három oldala 9 cm, 40 cm és 41 cm. Derékszögű-e a háromszög?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,68 135,68 25,35" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <text x="10" y="54" className="text-[9px] font-bold fill-slate-700">9</text>
            <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">40</text>
            <text x="82" y="46" className="text-[9px] font-bold fill-slate-700">41</text>
            <text x="35" y="60" className="text-[10px] font-bold fill-amber-600">?</text>
          </svg>
        ),
        options: [
          'Igen, mert 9² + 40² = 81 + 1600 = 1681 = 41²',
          'Nem, mert a 41 nem osztható 3-mal',
          'Csak akkor, ha az egyik szög 60°',
          'Nem, mert az oldalak különbsége túl nagy'
        ],
        correctAnswer: 0,
        explanation: '9² + 40² = 81 + 1600 = 1681. Mivel 41² = 1681, az egyenlőség teljesül, így a háromszög derékszögű!'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Szöveges Feladatok',
    description: '10 valós életbeli, geometriai és algebrai levezetéses feladat a Pitagorasz-tétel alkalmazására',
    badgeText: '3. Szint • Mester',
    badgeColor: 'rose',
    icon: <Award className="w-4 h-4 text-rose-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'A falhoz támasztott létra',
        question: 'Egy 5 méter hosszú létrát támasztunk egy függőleges falhoz úgy, hogy a teteje 4 méter magasan éri el a falat. Milyen távol van a létra alja a faltól?',
        figure: (
          <svg viewBox="0 0 160 85" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="40" y1="10" x2="40" y2="72" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="72" x2="130" y2="72" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 40 60 A 12 12 0 0 1 52 72" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="44" cy="68" r="1.2" fill="#64748b" />
            <line x1="40" y1="20" x2="115" y2="72" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <text x="18" y="46" className="text-[9px] font-bold fill-slate-700">4 m</text>
            <text x="80" y="82" textAnchor="middle" className="text-[9px] font-bold fill-indigo-600">b = ?</text>
            <text x="85" y="42" className="text-[9px] font-bold fill-blue-600">5 m</text>
          </svg>
        ),
        options: [
          '3 méter',
          '1 méter',
          '2 méter',
          '9 méter'
        ],
        correctAnswer: 0,
        explanation: 'A létra (c = 5 m) az átfogó, a magasság (a = 4 m) a függőleges befogó. A talajtávolság b = √(5² - 4²) = √(25 - 16) = √9 = 3 m.'
      },
      {
        id: 'q3-2',
        title: 'Téglalap átlójának hossza',
        question: 'Egy téglalap két oldala 12 cm és 16 cm. Mekkora a téglalap átlója?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="30" y="20" width="100" height="48" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <line x1="30" y1="68" x2="130" y2="20" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 30 56 A 12 12 0 0 1 42 68" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="34" cy="64" r="1.2" fill="#64748b" />
            <text x="16" y="48" className="text-[9px] font-bold fill-slate-700">12</text>
            <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">16</text>
            <text x="86" y="42" className="text-[10px] font-bold fill-indigo-600">d = ?</text>
          </svg>
        ),
        options: [
          '20 cm',
          '28 cm',
          '25 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap átlója derékszögű háromszöget képez a két szomszédos oldallal: d² = 12² + 16² = 144 + 256 = 400. d = √400 = 20 cm.'
      },
      {
        id: 'q3-3',
        title: 'Négyzet átlója',
        question: 'Egy 8 cm oldalhosszúságú négyzet átlójának pontos értéke mekkora?',
        options: [
          '8√2 cm (kb. 11,31 cm)',
          '16 cm',
          '12 cm',
          '64 cm'
        ],
        correctAnswer: 0,
        explanation: 'd² = 8² + 8² = 64 + 64 = 128. d = √128 = √(64 · 2) = 8√2 cm.'
      },
      {
        id: 'q3-4',
        title: 'Egyenlő szárú háromszög magassága',
        question: 'Egy egyenlő szárú háromszög alapja 10 cm, szárai 13 cm hosszúak. Mekkora az alaphoz tartozó magassága (ma)?',
        figure: (
          <svg viewBox="0 0 160 85" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,72 135,72 80,18" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <line x1="80" y1="18" x2="80" y2="72" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="3,3" />
            <path d="M 80 62 A 10 10 0 0 1 90 72" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="84" cy="68" r="1.2" fill="#6366f1" />
            <text x="42" y="42" className="text-[9px] font-bold fill-slate-700">13</text>
            <text x="110" y="42" className="text-[9px] font-bold fill-slate-700">13</text>
            <text x="84" y="48" className="text-[9px] font-bold fill-indigo-600">m = ?</text>
            <text x="80" y="82" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">10</text>
          </svg>
        ),
        options: [
          '12 cm',
          '8 cm',
          '11 cm',
          '144 cm'
        ],
        correctAnswer: 0,
        explanation: 'A magasság felezi az alapot: a fél alap 5 cm. A derékszögű háromszög átfogója 13 cm, egyik befogója 5 cm. ma = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.'
      },
      {
        id: 'q3-5',
        title: 'Távolság a koordináta-rácson',
        question: 'Mekkora a távolság az A(1, 2) és B(4, 6) pontok között derékszögű háromszög segítségével számolva?',
        options: [
          '5 egység',
          '7 egység',
          '25 egység',
          '6 egység'
        ],
        correctAnswer: 0,
        explanation: 'A vízszintes elmozdulás Δx = 4 - 1 = 3, a függőleges Δy = 6 - 2 = 4. A távolság az átfogó: d = √(3² + 4²) = √25 = 5 egység.'
      },
      {
        id: 'q3-6',
        title: 'Rombusz oldala az átlókból',
        question: 'Egy rombusz átlói e = 16 cm és f = 12 cm. Mekkora a rombusz oldala (a)?',
        options: [
          '10 cm',
          '14 cm',
          '20 cm',
          '28 cm'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz átlói merőlegesen felezik egymást. A befogók a félátlók: e/2 = 8 cm és f/2 = 6 cm. a = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.'
      },
      {
        id: 'q3-7',
        title: 'Két fa csúcsának légvonalbeli távolsága',
        question: 'Két függőleges fa magassága 11 m és 19 m. A talajon a törzsük távolsága 15 m. Mekkora a lombkoronáik csúcsának távolsága légvonalban?',
        options: [
          '17 m',
          '23 m',
          '20 m',
          '30 m'
        ],
        correctAnswer: 0,
        explanation: 'A függőleges magasságkülönbség: 19 - 11 = 8 m. A vízszintes távolság 15 m. A derékszögű háromszög átfogója: d = √(8² + 15²) = √(64 + 225) = √289 = 17 m.'
      },
      {
        id: 'q3-8',
        title: 'Átrendezéses bizonyítás levezetése',
        question: 'A darabolásos bizonyításban a nagy négyzet területe (a + b)², amely felbontható 4 darab (ab/2) területű háromszögre és egy c² területű belső négyzetre. Milyen egyenlőség igazolja a tételt?',
        options: [
          'a² + 2ab + b² = 2ab + c²  ==> kivonva 2ab-t: a² + b² = c²',
          '(a + b)² = a² + b²  ==> ezért c² = a² + b²',
          '4 · (ab/2) = c²  ==> 2ab = c²',
          'a² - b² = c² - 2ab'
        ],
        correctAnswer: 0,
        explanation: '(a + b)² kifejtve: a² + 2ab + b². A részek összege: 4 · (ab/2) + c² = 2ab + c². Mindkét oldalból kivonva 2ab-t megkapjuk az a² + b² = c² azonosságot.'
      },
      {
        id: 'q3-9',
        title: 'Garfield elnök trapézos bizonyítása',
        question: 'James A. Garfield trapézának területe T = ((a + b)/2) · (a + b) = (a + b)² / 2. Ez három derékszögű háromszög területének összege: 2 · (ab/2) + c²/2. Mi adódik a 2-vel való beszorzás után?',
        options: [
          '(a + b)² = 2ab + c²  ==> a² + 2ab + b² = 2ab + c²  ==> a² + b² = c²',
          'a² + b² = 2c²',
          '(a + b) / 2 = c',
          'ab = c² / 2'
        ],
        correctAnswer: 0,
        explanation: 'Beszorozva 2-vel: (a + b)² = 2ab + c². Felbontva: a² + 2ab + b² = 2ab + c². Mindkét oldalból 2ab-t kivonva adódik a² + b² = c².'
      },
      {
        id: 'q3-10',
        title: 'Szabályos háromszög magassága és területe',
        question: 'Egy 6 cm oldalú szabályos háromszög magassága a Pitagorasz-tétellel m = √(6² - 3²) = √27 = 3√3 cm. Mekkora a szabályos háromszög pontos területe?',
        options: [
          '9√3 cm² (kb. 15,59 cm²)',
          '18 cm²',
          '18√3 cm²',
          '27 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög területe T = (alap · magasság) / 2 = (6 · 3√3) / 2 = 9√3 cm² (kb. 15,588 cm²).'
      }
    ]
  }
};

export const PythagorasTheoremQuiz: React.FC<PythagorasTheoremQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A Pitagorasz-tétel Kvíz"
      subtitle="A Pitagorasz-tétel kimondása, számítási képletek, számhármasok és geometriai bizonyítások"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 2. Lecke • A Pitagorasz-tétel"
      topicTitle="A Pitagorasz-tétel"
      topicId="g8-pyth-theorem"
      chapterId="pitagorasz-tetel"
      grade={8}
      documentId="pythagoras-theorem-quiz-doc"
      pdfFilename="8_osztaly_a_pitagorasz_tetel_kviz.pdf"
      emoji="📐"
      cheatSheetTitle="Pitagorasz-tétel Képlet- és Számítási Segédlet"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az oldalakat, kifejezéseket, számhármasokat és tételelemeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-orange-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapképletek és Számítások',
              subtitle: 'Párosítsd az oldalakat és képleteket a megfelelő értékekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapképletek'
            },
            2: {
              title: '2. Szint: Nevezetes Számhármasok és Gyökös Értékek',
              subtitle: 'Kösd össze a számhármasokat és gyökös átfogókat a helyes oldalakkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számhármasok'
            },
            3: {
              title: '3. Szint: Geometriai Alkalmazások és Bizonyítások',
              subtitle: 'Párosítsd az alakzatokat, téglalapokat és levezetéseket az összefüggésekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alkalmazások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <PythagorasTheoremMatcher
              key={`pt-matcher-${level}`}
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
          subtitle: 'Kategorizáld a feladatokat: átfogó számítás, befogó számítás vagy területi modell szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-orange-500" />,
          levels: {
            1: {
              title: '1. Szint: Számítási Műveletek a Pitagorasz-tételben',
              subtitle: 'Válogasd szét a feladatokat: Átfogó (összeadás) / Befogó (kivonás) / Területek szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Számítási műveletek'
            },
            2: {
              title: '2. Szint: Háromszögtípusok és Számhármasok',
              subtitle: 'Döntsd el: Pitagoraszi egész számhármas / Gyökös (irracionális) / Nem derékszögű!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Számhármas típusok'
            },
            3: {
              title: '3. Szint: Geometriai Állítások és Bizonyítások',
              subtitle: 'Sorold be az állításokat: Mindig igaz / Csak egyenlő szárúra / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Állítások igazsága'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <PythagorasTheoremSorter
              key={`pt-sorter-${level}`}
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

export default PythagorasTheoremQuiz;
