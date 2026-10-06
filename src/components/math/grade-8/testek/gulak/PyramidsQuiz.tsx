import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Triangle,
  Layers,
  Calculator,
  Compass,
  Award,
  Sparkles,
  HelpCircle,
  Ruler,
  Box,
  LayoutGrid,
  ArrowRightLeft
} from 'lucide-react';
import { PyramidsMatcher } from './PyramidsMatcher';
import { PyramidsSorter } from './PyramidsSorter';

interface PyramidsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-anatomy',
    title: 'A Gúla Részei és Jelölései',
    icon: <Triangle className="w-4 h-4 text-amber-600" />,
    formula: 'C = n + 1, \\quad L = n + 1, \\quad É = 2n',
    note: 'n-oldalú gúla esetén: alapél (a), oldalél (b), testmagasság (m), oldallap-magasság (mo). C = L mindig igaz!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 30,42 130,42" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <line x1="80" y1="6" x2="80" y2="42" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="80" y="26" className="text-[6.5px] font-mono font-bold fill-red-700" textAnchor="middle">m</text>
        <circle cx="80" cy="6" r="2.5" fill="#ef4444" />
      </svg>
    )
  },
  {
    id: 'cs-euler',
    title: 'Euler-tétel Gúlákra',
    icon: <Calculator className="w-4 h-4 text-violet-600" />,
    formula: 'C - É + L = 2',
    note: '(n + 1) - 2n + (n + 1) = 2. Minden konvex poliéderre igaz, a gúlákra mindig pontosan 2-t ad!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="10" width="120" height="30" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
        <text x="80" y="28" className="text-[9px] font-mono font-black fill-purple-900" textAnchor="middle">C - É + L = 2</text>
      </svg>
    )
  },
  {
    id: 'cs-pythagoras',
    title: 'Derékszögű Háromszögek Szabályos Gúlában',
    icon: <Ruler className="w-4 h-4 text-emerald-600" />,
    formula: 'm^2 + (a/2)^2 = m_o^2, \\quad m_o^2 + (a/2)^2 = b^2',
    note: 'mo az oldallap-magasság, m a testmagasság, b az oldalél, a az alapél hossza.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="30,40 100,40 100,10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="65" y="47" className="text-[6.5px] font-mono fill-emerald-800" textAnchor="middle">a/2</text>
        <text x="110" y="27" className="text-[6.5px] font-mono fill-red-600" textAnchor="middle">m</text>
        <text x="60" y="22" className="text-[6.5px] font-mono font-bold fill-emerald-700" textAnchor="middle">mo</text>
      </svg>
    )
  }
];

// Visual SVG Figures for Quiz Questions
const SquarePyramidFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <ellipse cx="110" cy="112" rx="70" ry="12" fill="#e2e8f0" opacity="0.6" />
    <line x1="50" y1="95" x2="110" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="110" y1="78" x2="170" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="110" y1="18" x2="110" y2="95" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 3" />
    <circle cx="110" cy="95" r="2" fill="#ef4444" />
    <text x="115" y="60" className="text-[10px] font-mono font-bold fill-red-600" textAnchor="start">m</text>
    <line x1="110" y1="18" x2="110" y2="78" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 3" />
    <polygon points="110,18 50,95 110,112" fill="#fef3c7" fillOpacity="0.8" stroke="#d97706" strokeWidth="1.8" />
    <polygon points="110,18 110,112 170,95" fill="#fed7aa" fillOpacity="0.8" stroke="#ea580c" strokeWidth="1.8" />
    <line x1="50" y1="95" x2="110" y2="112" stroke="#b45309" strokeWidth="2" />
    <line x1="110" y1="112" x2="170" y2="95" stroke="#b45309" strokeWidth="2" />
    <circle cx="110" cy="18" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
    <text x="110" y="12" className="text-[10px] font-black fill-red-600" textAnchor="middle">M (testcsúcs)</text>
    <circle cx="50" cy="95" r="3" fill="#d97706" />
    <text x="42" y="100" className="text-[9px] font-bold fill-amber-800" textAnchor="end">A</text>
    <circle cx="110" cy="112" r="3" fill="#d97706" />
    <text x="110" y="124" className="text-[9px] font-bold fill-amber-800" textAnchor="middle">B</text>
    <circle cx="170" cy="95" r="3" fill="#d97706" />
    <text x="178" y="100" className="text-[9px] font-bold fill-amber-800" textAnchor="start">C</text>
    <circle cx="110" cy="78" r="2.5" fill="#94a3b8" />
    <text x="110" y="74" className="text-[9px] font-bold fill-slate-500" textAnchor="middle">D</text>
    <rect x="145" y="24" width="70" height="28" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <text x="180" y="36" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">C = 5, L = 5</text>
    <text x="180" y="47" className="text-[8.5px] font-black fill-amber-600" textAnchor="middle">É = 8 él</text>
  </svg>
);

const TetrahedronFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <ellipse cx="110" cy="112" rx="60" ry="10" fill="#e2e8f0" opacity="0.6" />
    <line x1="60" y1="105" x2="160" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
    <polygon points="110,20 60,105 110,115" fill="#e0e7ff" fillOpacity="0.8" stroke="#4f46e5" strokeWidth="1.8" />
    <polygon points="110,20 110,115 160,105" fill="#c7d2fe" fillOpacity="0.8" stroke="#4f46e5" strokeWidth="1.8" />
    <line x1="60" y1="105" x2="110" y2="115" stroke="#4338ca" strokeWidth="2" />
    <line x1="110" y1="115" x2="160" y2="105" stroke="#4338ca" strokeWidth="2" />
    <circle cx="110" cy="20" r="3.5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
    <text x="110" y="13" className="text-[9.5px] font-bold fill-red-600" textAnchor="middle">Csúcs</text>
    <circle cx="60" cy="105" r="3" fill="#4f46e5" />
    <circle cx="110" cy="115" r="3" fill="#4f46e5" />
    <circle cx="160" cy="105" r="3" fill="#4f46e5" />
    <rect x="14" y="24" width="76" height="34" rx="6" fill="#ffffff" stroke="#a5b4fc" strokeWidth="1" />
    <text x="52" y="38" className="text-[8.5px] font-bold fill-indigo-950" textAnchor="middle">Szabályos tetraéder</text>
    <text x="52" y="50" className="text-[8px] font-bold fill-indigo-700" textAnchor="middle">4 egybevágó 3-szög</text>
  </svg>
);

const HeightDefinitionFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <ellipse cx="110" cy="108" rx="75" ry="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="110" y1="20" x2="110" y2="108" stroke="#dc2626" strokeWidth="2.2" strokeDasharray="4 3" />
    <rect x="110" y="98" width="10" height="10" fill="none" stroke="#dc2626" strokeWidth="1.2" />
    <circle cx="115" cy="103" r="1" fill="#dc2626" />
    <circle cx="110" cy="20" r="3.5" fill="#ef4444" />
    <text x="110" y="14" className="text-[9.5px] font-black fill-red-600" textAnchor="middle">M (testcsúcs)</text>
    <circle cx="110" cy="108" r="3" fill="#dc2626" />
    <text x="110" y="122" className="text-[8.5px] font-bold fill-slate-700" textAnchor="middle">T (talppont az alapsíkon)</text>
    <text x="122" y="66" className="text-[11px] font-mono font-black fill-red-600">m ⊥ alapsík</text>
  </svg>
);

const PyramidNetFigure = (
  <svg viewBox="0 0 220 140" className="w-52 h-34 select-none">
    <rect x="85" y="45" width="50" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="110" y="71" className="text-[9px] font-black fill-amber-900" textAnchor="middle">Alapnégyzet</text>
    <text x="110" y="83" className="text-[8px] font-mono fill-amber-700" textAnchor="middle">a × a</text>
    <polygon points="85,45 135,45 110,10" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <line x1="110" y1="10" x2="110" y2="45" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
    <text x="114" y="28" className="text-[7.5px] font-mono font-bold fill-red-600">mo</text>
    <polygon points="85,95 135,95 110,130" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <polygon points="85,45 85,95 50,70" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <polygon points="135,45 135,95 170,70" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <line x1="85" y1="45" x2="135" y2="45" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="85" y1="95" x2="135" y2="95" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="85" y1="45" x2="85" y2="95" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="135" y1="45" x2="135" y2="95" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
    <rect x="8" y="10" width="66" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <text x="41" y="25" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">1 négyzet + 4 △</text>
  </svg>
);

const PythagorasInternalFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="65,22 65,95 155,95" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
    <rect x="65" y="83" width="12" height="12" fill="none" stroke="#059669" strokeWidth="1.5" />
    <circle cx="71" cy="89" r="1.5" fill="#059669" />
    <text x="56" y="60" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">m = 4 cm</text>
    <text x="110" y="108" className="text-[9.5px] font-bold fill-amber-700" textAnchor="middle">a/2 = 3 cm</text>
    <text x="120" y="52" className="text-[10px] font-black fill-emerald-700" textAnchor="start">mo = ? (5 cm)</text>
    <rect x="112" y="18" width="86" height="20" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
    <text x="155" y="32" className="text-[7.5px] font-mono font-bold fill-emerald-950" textAnchor="middle">4² + 3² = 16+9 = 25</text>
  </svg>
);

const PythagorasFaceFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="100,20 40,95 160,95" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
    <line x1="100" y1="20" x2="100" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
    <rect x="100" y="85" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.2" />
    <circle cx="105" cy="90" r="1" fill="#ef4444" />
    <text x="94" y="60" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">mo = 8 cm</text>
    <text x="135" y="52" className="text-[10px] font-black fill-purple-700" textAnchor="start">b = ? (10)</text>
    <text x="130" y="107" className="text-[9px] font-bold fill-amber-800" textAnchor="middle">a/2 = 6 cm</text>
    <text x="100" y="12" className="text-[9.5px] font-black fill-red-700" textAnchor="middle">M</text>
    <rect x="15" y="18" width="70" height="20" rx="4" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
    <text x="50" y="32" className="text-[7.5px] font-mono font-bold fill-purple-950" textAnchor="middle">8² + 6² = 100</text>
  </svg>
);

const PythagorasDiagonalFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="65,25 65,95 165,95" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <rect x="65" y="83" width="12" height="12" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <circle cx="71" cy="89" r="1.5" fill="#2563eb" />
    <text x="56" y="62" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">m = 3 cm</text>
    <text x="115" y="108" className="text-[9.5px] font-bold fill-blue-800" textAnchor="middle">d/2 = 4 cm</text>
    <text x="125" y="55" className="text-[10px] font-black fill-indigo-700" textAnchor="start">b = 5 cm</text>
    <text x="65" y="18" className="text-[9px] font-bold fill-slate-700" textAnchor="middle">Csúcs</text>
    <text x="65" y="108" className="text-[8px] font-bold fill-slate-500" textAnchor="middle">O</text>
    <rect x="115" y="18" width="82" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
    <text x="156" y="32" className="text-[7.5px] font-mono font-bold fill-blue-950" textAnchor="middle">3² + 4² = 25</text>
  </svg>
);

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Élszámolás',
    subtitle: 'Gúlák felépítése, testcsúcs, alaplap, palást és lapok száma',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak',
    questions: [
      {
        id: 'pyr-1-1',
        category: 'Gúla alapfogalmai',
        question: 'Hány csúcsa, lapja és éle van egy négyzet alapú gúlának?',
        figure: SquarePyramidFigure,
        options: [
          '5 csúcsa, 5 lapja és 8 éle van',
          '4 csúcsa, 4 lapja és 6 éle van',
          '5 csúcsa, 6 lapja és 10 éle van',
          '6 csúcsa, 5 lapja és 8 éle van'
        ],
        correctAnswer: '5 csúcsa, 5 lapja és 8 éle van',
        correctIndex: 0,
        explanation: 'Egy négyzet alapú gúlának (n = 4) 1 négyzet alakú alaplapja és 4 háromszög alakú oldallapja van (L = 5). Csúcsai: 4 az alaplapon + 1 testcsúcs felül (C = 5). Élei: 4 alapél + 4 oldalél (É = 8).'
      },
      {
        id: 'pyr-1-2',
        category: 'Tetraéder fogalma',
        question: 'Milyen alakú egy háromoldalú gúla (tetraéder) összes határoló lapja?',
        figure: TetrahedronFigure,
        options: [
          'Mindegyik lapja háromszög (összesen 4 háromszöglap)',
          '1 háromszög és 3 négyszög',
          '1 négyzet és 3 háromszög',
          'Mindegyik lapja téglalap'
        ],
        correctAnswer: 'Mindegyik lapja háromszög (összesen 4 háromszöglap)',
        correctIndex: 0,
        explanation: 'A háromoldalú gúla alaplapja egy háromszög, oldallapjai pedig 3 darab háromszög. Tehát mind a 4 lapja háromszög, ezért tetraédernek nevezzük.'
      },
      {
        id: 'pyr-1-3',
        category: 'Testmagasság definíciója',
        question: 'Mi a gúla testmagasságának (m) pontos geometriai definíciója?',
        figure: HeightDefinitionFigure,
        options: [
          'A testcsúcsból az alaplap síkjára bocsátott merőleges szakasz hossza',
          'Az oldalháromszög magassága',
          'Az oldalél hossza',
          'A csúcs távolsága az alapsokszög bármelyik csúcsától'
        ],
        correctAnswer: 'A testcsúcsból az alaplap síkjára bocsátott merőleges szakasz hossza',
        correctIndex: 0,
        explanation: 'A testmagasság (m) a térbeli testcsúcs és az alaplap síkja közötti legrövidebb távolság, azaz a csúcsból az alaplap síkjára bocsátott merőleges szakasz hossza.'
      },
      {
        id: 'pyr-1-4',
        category: 'Élek száma',
        question: 'Hány éle van összesen egy szabályos hatoldalú gúlának?',
        options: [
          '12 él (6 alapél + 6 oldalél)',
          '18 él (3 · 6)',
          '7 él (6 + 1)',
          '8 él'
        ],
        correctAnswer: '12 él (6 alapél + 6 oldalél)',
        correctIndex: 0,
        explanation: 'Egy n-oldalú gúla éleinek száma É = 2 · n. Mivel n = 6 (hatszög alapú), ezért É = 2 · 6 = 12 (6 alapél határolja a hatszöget és 6 oldalél fut a csúcsba).'
      },
      {
        id: 'pyr-1-5',
        category: 'Csúcsok és lapok száma',
        question: 'Egy gúlának 7 csúcsa van. Hány oldala van az alapsokszögnek, és hány lapja van a testnek?',
        options: [
          'Alaplapja 6-oldalú (hatszög), és 7 lapja van',
          'Alaplapja 7-oldalú, és 8 lapja van',
          'Alaplapja 5-oldalú, és 6 lapja van',
          'Alaplapja 6-oldalú, és 12 lapja van'
        ],
        correctAnswer: 'Alaplapja 6-oldalú (hatszög), és 7 lapja van',
        correctIndex: 0,
        explanation: 'A gúla csúcsainak száma C = n + 1. Ha C = 7, akkor n = 7 - 1 = 6 (hatszög alapú). A lapok száma szintén L = n + 1 = 7 (1 hatszög + 6 háromszög).'
      },
      {
        id: 'pyr-1-6',
        category: 'Palást fogalma',
        question: 'Mi alkotja a gúla palástját (Tp)?',
        options: [
          'Az oldallapok (oldalháromszögek) területeinek összessége',
          'Az alaplap és a csúcs távolsága',
          'Az összes él hosszának összege',
          'Az alaplap területe kétszeresen'
        ],
        correctAnswer: 'Az oldallapok (oldalháromszögek) területeinek összessége',
        correctIndex: 0,
        explanation: 'A gúla palástja (Tp) a testcsúcsban találkozó n darab oldalháromszög összességét jelenti (az alaplapot nem számítva bele).'
      },
      {
        id: 'pyr-1-7',
        category: 'Tetraéder tulajdonságai',
        question: 'Hány lapja, csúcsa és éle van egy szabályos tetraédernek?',
        figure: TetrahedronFigure,
        options: [
          '4 lapja, 4 csúcsa és 6 éle van',
          '4 lapja, 6 csúcsa és 4 éle van',
          '3 lapja, 4 csúcsa és 6 éle van',
          '5 lapja, 5 csúcsa és 8 éle van'
        ],
        correctAnswer: '4 lapja, 4 csúcsa és 6 éle van',
        correctIndex: 0,
        explanation: 'A szabályos tetraéder háromoldalú gúla (n = 3): Lapok L = 3 + 1 = 4, Csúcsok C = 3 + 1 = 4, Élek É = 2 · 3 = 6.'
      },
      {
        id: 'pyr-1-8',
        category: 'Magasságok megkülönböztetése',
        question: 'Mi a különbség a testmagasság (m) és az oldallap-magasság (mo) között?',
        options: [
          'm a test belsejében futó merőleges magasság, míg mo az oldalháromszög lapján fekvő magasság',
          'm mindig hosszabb, mint mo',
          'mo a test belsejében van, m a felületen',
          'Nincs különbség, a két fogalom ugyanaz'
        ],
        correctAnswer: 'm a test belsejében futó merőleges magasság, míg mo az oldalháromszög lapján fekvő magasság',
        correctIndex: 0,
        explanation: 'A testmagasság (m) a gúla belsejében fut a csúcstól az alaplapig merőlegesen, míg az oldallap-magasság (mo) az oldalháromszög felületén fekvő magasságvonal. Szabályos gúlában mo mindig hosszabb, mint m!'
      },
      {
        id: 'pyr-1-9',
        category: 'Lapok száma',
        question: 'Hány lap határol egy ötoldalú gúlát összesen?',
        options: [
          '6 lap (1 ötszög alaplap + 5 háromszög oldallap)',
          '5 lap',
          '7 lap',
          '10 lap'
        ],
        correctAnswer: '6 lap (1 ötszög alaplap + 5 háromszög oldallap)',
        correctIndex: 0,
        explanation: 'Egy ötoldalú gúla (n = 5) 1 alaplappal és 5 darab oldallappal rendelkezik, tehát L = 5 + 1 = 6 lapja van.'
      },
      {
        id: 'pyr-1-10',
        category: 'Csúcsok és lapok aránya',
        question: 'Melyik összefüggés igaz MINDEN konvex gúlára a csúcsok (C) és lapok (L) számára nézve?',
        options: [
          'C = L (a csúcsok száma mindig pontosan megegyezik a lapok számával)',
          'C = L + 2',
          'É = C + L + 2',
          'L = C + 1'
        ],
        correctAnswer: 'C = L (a csúcsok száma mindig pontosan megegyezik a lapok számával)',
        correctIndex: 0,
        explanation: 'Mivel egy n-oldalú gúlának n + 1 csúcsa és n + 1 lapja van, ezért minden gúlára kivétel nélkül érvényes, hogy C = L!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szabályos Gúlák, Hálók és Euler-tétel',
    subtitle: 'Szabályos gúlák tulajdonságai, hálók összehajthatósága és az Euler-összefüggés',
    range: '1 - 10. feladat',
    focus: 'Euler & Hálók',
    questions: [
      {
        id: 'pyr-2-1',
        category: 'Szabályos gúla definíciója',
        question: 'Mikor mondjuk egy négyzet alapú gúláról, hogy SZABÁLYOS?',
        options: [
          'Ha alaplapja négyzet, és a testcsúcs merőleges vetülete az alapnégyzet középpontjába esik',
          'Ha minden oldallapja négyzet',
          'Ha alaplapja négyzet, és a magassága egyenlő az alapéllel',
          'Minden négyzet alapú gúla automatikusan szabályos'
        ],
        correctAnswer: 'Ha alaplapja négyzet, és a testcsúcs merőleges vetülete az alapnégyzet középpontjába esik',
        correctIndex: 0,
        explanation: 'Egy gúla akkor szabályos, ha alapsokszöge szabályos (itt négyzet), és a testcsúcs merőleges vetülete pontosan az alapsokszög szimmetriaközéppontjába esik.'
      },
      {
        id: 'pyr-2-2',
        category: 'Oldallapok alakja',
        question: 'Milyen alakú háromszögek alkotják egy szabályos gúla palástját?',
        options: [
          'Egybevágó egyenlő szárú háromszögek',
          'Mindig egyenlő oldalú (szabályos) háromszögek',
          'Derékszögű háromszögek',
          'Tetszőleges, különböző méretű háromszögek'
        ],
        correctAnswer: 'Egybevágó egyenlő szárú háromszögek',
        correctIndex: 0,
        explanation: 'A szabályos gúla csúcsának középponti vetülete miatt az összes oldalél (b) egyenlő hosszúságú, és az összes alapél (a) is egyenlő. Ezért az oldallapok mind egybevágó egyenlő szárú háromszögek.'
      },
      {
        id: 'pyr-2-3',
        category: 'Euler-tétel alkalmazása',
        question: 'Az Euler-féle poliéder-tétel (C - É + L = 2) szerint mennyi egy 10-oldalú gúla éleinek, lapjainak és csúcsainak összefüggése?',
        options: [
          'C = 11, L = 11, É = 20, így 11 - 20 + 11 = 2',
          'C = 10, L = 10, É = 20, így 10 - 20 + 10 = 0',
          'C = 12, L = 10, É = 20, így 12 - 20 + 10 = 2',
          'C = 11, L = 11, É = 22, így 11 - 22 + 11 = 0'
        ],
        correctAnswer: 'C = 11, L = 11, É = 20, így 11 - 20 + 11 = 2',
        correctIndex: 0,
        explanation: 'n = 10 esetén: C = 10 + 1 = 11, L = 10 + 1 = 11, É = 2 · 10 = 20. Ellenőrzés: C - É + L = 11 - 20 + 11 = 2!'
      },
      {
        id: 'pyr-2-4',
        category: 'Gúlaháló szerkezete',
        question: 'Miből áll egy szabályos négyzet alapú gúla kiterített csillag alakú síkbeli hálója?',
        figure: PyramidNetFigure,
        options: [
          'Egy középső négyzetből és 4 hozzá csatlakozó egybevágó egyenlő szárú háromszögből',
          'Két négyzetből és 4 téglalapból',
          '5 egybevágó négyzetből',
          '4 egybevágó háromszögből, alaplap nélkül'
        ],
        correctAnswer: 'Egy középső négyzetből és 4 hozzá csatlakozó egybevágó egyenlő szárú háromszögből',
        correctIndex: 0,
        explanation: 'A csillag alakú háló közepén az 1 darab négyzet alaplap található, és annak 4 éléhez kifelé hajtva csatlakozik a 4 egybevágó egyenlő szárú háromszög.'
      },
      {
        id: 'pyr-2-5',
        category: 'Élszám párossága',
        question: 'Létezhet-e olyan gúla, amelynek pontosan 15 éle van?',
        options: [
          'Nem, mert egy gúla éleinek száma mindig páros: É = 2n',
          'Igen, ha az alaplapja 15-szög',
          'Igen, a ferde gúláknál',
          'Igen, ha a csúcs nem középen van'
        ],
        correctAnswer: 'Nem, mert egy gúla éleinek száma mindig páros: É = 2n',
        correctIndex: 0,
        explanation: 'Minden gúlának n darab alapéle és n darab oldaléle van, így az élek száma É = 2 · n, ami minden egész n-re PÁROS szám. 15 páratlan szám, tehát ilyen gúla nem létezik!'
      },
      {
        id: 'pyr-2-6',
        category: 'Poliéder azonosítása',
        question: 'Egy poliédernek 8 lapja és 8 csúcsa van, oldallapjai pedig háromszögek, melyek egy pontban futnak össze. Milyen test ez?',
        options: [
          'Hétoldalú gúla',
          'Nyolcoldalú gúla',
          'Hatszög alapú hasáb',
          'Szabályos oktaéder'
        ],
        correctAnswer: 'Hétoldalú gúla',
        correctIndex: 0,
        explanation: 'Ha egy gúlának 8 lapja és 8 csúcsa van, akkor L = n + 1 = 8 => n = 7. Tehát az alaplapja hétszög, így a test egy hétoldalú gúla (14 éllel).'
      },
      {
        id: 'pyr-2-7',
        category: 'Háló összehajthatósága',
        question: 'Mi a legfontosabb geometriai feltétele annak, hogy egy papírból kivágott gúlaháló összehajtható legyen gúlává?',
        options: [
          'Az összehajtáskor egymás mellé kerülő szomszédos oldaléleknek pontosan egyenlő hosszúaknak kell lenniük',
          'Minden szögnek derékszögnek kell lennie',
          'Az alaplapnak nagyobbnak kell lennie a palástnál',
          'A háromszögek magasságának legalább a kétszeresének kell lennie az alapélnek'
        ],
        correctAnswer: 'Az összehajtáskor egymás mellé kerülő szomszédos oldaléleknek pontosan egyenlő hosszúaknak kell lenniük',
        correctIndex: 0,
        explanation: 'Az összehajtáskor a szomszédos oldallapok egymáshoz illeszkedő élei a gúla oldaléleit alkotják, ezért hosszuknak feltétlenül meg kell egyeznie!'
      },
      {
        id: 'pyr-2-8',
        category: 'Tetraéder élhossza',
        question: 'Egy szabályos tetraéder minden éle a = 6 cm. Mennyi a tetraéder összes élének összhossza?',
        figure: TetrahedronFigure,
        options: [
          '36 cm (6 él · 6 cm)',
          '24 cm (4 él · 6 cm)',
          '48 cm (8 él · 6 cm)',
          '18 cm (3 él · 6 cm)'
        ],
        correctAnswer: '36 cm (6 él · 6 cm)',
        correctIndex: 0,
        explanation: 'A tetraédernek (háromoldalú gúla) 6 éle van (3 alapél + 3 oldalél). Szabályos tetraédernél minden él egyforma, így: 6 · 6 cm = 36 cm.'
      },
      {
        id: 'pyr-2-9',
        category: 'Élszámból visszakövetkeztetés',
        question: 'Egy gúlának 24 éle van. Hány csúcsa és hány lapja van a testnek?',
        options: [
          '13 csúcsa és 13 lapja van (n = 12)',
          '12 csúcsa és 12 lapja van',
          '14 csúcsa és 12 lapja van',
          '24 csúcsa és 12 lapja van'
        ],
        correctAnswer: '13 csúcsa és 13 lapja van (n = 12)',
        correctIndex: 0,
        explanation: 'É = 2n = 24 => n = 12 (12-oldalú alapsokszög). A csúcsok száma C = n + 1 = 13, a lapok száma L = n + 1 = 13.'
      },
      {
        id: 'pyr-2-10',
        category: 'Oldallap területe',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm, oldallap-magassága mo = 12 cm. Mekkora az egyik oldallap területe?',
        options: [
          '60 cm²',
          '120 cm²',
          '30 cm²',
          '100 cm²'
        ],
        correctAnswer: '60 cm²',
        correctIndex: 0,
        explanation: 'Az oldallap egy háromszög, amelynek alapja a = 10 cm és magassága mo = 12 cm. Területe: T = (a · mo) / 2 = (10 · 12) / 2 = 120 / 2 = 60 cm².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Pitagorasz-kapcsolatok és Számítások',
    subtitle: 'Testmagasság, oldallap-magasság, oldalél kiszámítása és összetett feladatok',
    range: '1 - 10. feladat',
    focus: 'Pitagorasz & Képletek',
    questions: [
      {
        id: 'pyr-3-1',
        category: 'Pitagorasz: Oldallap-magasság mo',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 6 cm, testmagassága m = 4 cm. Mennyi az oldallap-magasság (mo)?',
        figure: PythagorasInternalFigure,
        options: [
          '5 cm',
          '7 cm',
          '4,5 cm',
          '6,2 cm'
        ],
        correctAnswer: '5 cm',
        correctIndex: 0,
        explanation: 'A belső derékszögű háromszög befogói: m = 4 cm és a/2 = 3 cm. Átfogója mo: mo² = m² + (a/2)² = 4² + 3² = 16 + 9 = 25 => mo = √25 = 5 cm.'
      },
      {
        id: 'pyr-3-2',
        category: 'Pitagorasz: Testmagasság m',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 8 cm, oldallap-magassága mo = 5 cm. Mekkora a gúla testmagassága (m)?',
        options: [
          '3 cm',
          '4 cm',
          '2,5 cm',
          '√41 ≈ 6,4 cm'
        ],
        correctAnswer: '3 cm',
        correctIndex: 0,
        explanation: 'Az alapél fele a/2 = 4 cm. A Pitagorasz-tétel: m² + (a/2)² = mo² => m² + 4² = 5² => m² + 16 = 25 => m² = 9 => m = 3 cm.'
      },
      {
        id: 'pyr-3-3',
        category: 'Palástterület számítása',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 6 cm, oldallap-magassága mo = 4 cm. Mekkora a gúla palástjának (Tp) területe?',
        options: [
          '48 cm²',
          '24 cm²',
          '36 cm²',
          '72 cm²'
        ],
        correctAnswer: '48 cm²',
        correctIndex: 0,
        explanation: 'Egy oldallap területe: T1 = (a · mo) / 2 = (6 · 4) / 2 = 12 cm². Mivel a palást 4 ilyen egybevágó háromszögből áll: Tp = 4 · 12 = 48 cm².'
      },
      {
        id: 'pyr-3-4',
        category: 'Pitagorasz: Oldalél b',
        question: 'Egy szabályos négyzet alapú gúlában az alapél a = 12 cm, az oldallap-magasság mo = 8 cm. Mekkora az oldalél (b) hossza?',
        figure: PythagorasFaceFigure,
        options: [
          '10 cm',
          '14 cm',
          '8,5 cm',
          '12 cm'
        ],
        correctAnswer: '10 cm',
        correctIndex: 0,
        explanation: 'Az oldallap derékszögű háromszögében a befogók mo = 8 cm és a/2 = 6 cm. Az átfogó b: b² = mo² + (a/2)² = 8² + 6² = 64 + 36 = 100 => b = √100 = 10 cm.'
      },
      {
        id: 'pyr-3-5',
        category: 'Alaplap középpontjának távolsága',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 14 cm. Mennyi a testmagasság talppontjának távolsága a négyzet alap bármelyik oldalfelező pontjától?',
        options: [
          '7 cm (a/2)',
          '14 cm',
          '7√2 ≈ 9,9 cm',
          '3,5 cm'
        ],
        correctAnswer: '7 cm (a/2)',
        correctIndex: 0,
        explanation: 'A szabályos négyzet középpontjának távolsága az oldalaktól pontosan az alapél felével (a beírt kör sugarával) egyenlő: r = a / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'pyr-3-6',
        category: 'Négyzet lapátlója',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm. Mekkora az alaplap átlójának fele (d/2)?',
        options: [
          '5√2 cm ≈ 7,07 cm',
          '5 cm',
          '10√2 cm ≈ 14,14 cm',
          '7,5 cm'
        ],
        correctAnswer: '5√2 cm ≈ 7,07 cm',
        correctIndex: 0,
        explanation: 'A négyzet átlója d = a · √2 = 10√2 cm. Ennek a fele: d/2 = (10√2) / 2 = 5√2 cm ≈ 7,07 cm.'
      },
      {
        id: 'pyr-3-7',
        category: 'Pitagorasz átlós metszetben',
        question: 'Szabályos négyzet alapú gúla alaplap-átlójának fele d/2 = 4 cm, testmagassága m = 3 cm. Mekkora az oldalél (b) hossza?',
        figure: PythagorasDiagonalFigure,
        options: [
          '5 cm',
          '7 cm',
          '√7 ≈ 2,6 cm',
          '6 cm'
        ],
        correctAnswer: '5 cm',
        correctIndex: 0,
        explanation: 'A csúcs, a középpont és az alapcsúcs által alkotott derékszögű háromszögben: b² = m² + (d/2)² = 3² + 4² = 9 + 16 = 25 => b = √25 = 5 cm.'
      },
      {
        id: 'pyr-3-8',
        category: 'Egyenlő élű gúla oldallap-magassága',
        question: 'Egy szabályos négyzet alapú gúla minden éle (alapélei és oldalélei is) a = 10 cm. Mekkora az oldallap-magasság (mo)?',
        options: [
          '5√3 cm ≈ 8,66 cm',
          '5 cm',
          '10 cm',
          '5√2 cm ≈ 7,07 cm'
        ],
        correctAnswer: '5√3 cm ≈ 8,66 cm',
        correctIndex: 0,
        explanation: 'Mivel minden oldalél is 10 cm, az oldallapok egyenlő oldalú (szabályos) háromszögek! Szabályos háromszög magassága: mo = (a · √3) / 2 = (10 · √3) / 2 = 5√3 cm ≈ 8,66 cm.'
      },
      {
        id: 'pyr-3-9',
        category: 'Összetett csúcs- és lapfeladat',
        question: 'Egy gúlának a csúcsai és lapjai számának összege 18 (C + L = 18). Hány éle van a gúlának?',
        options: [
          '16 él',
          '18 él',
          '8 él',
          '20 él'
        ],
        correctAnswer: '16 él',
        correctIndex: 0,
        explanation: 'Tudjuk, hogy minden gúlára C = L. Ezért C + L = 2L = 18 => L = 9 és C = 9. Mivel L = n + 1 = 9, ezért n = 8 (nyolcoldalú gúla). Az élek száma É = 2 · n = 2 · 8 = 16.'
      },
      {
        id: 'pyr-3-10',
        category: 'Geometriai összefüggések szűrése',
        question: 'Melyik összefüggés HAMIS egy szabályos négyzet alapú gúlára az alábbiak közül?',
        options: [
          'm² = mo² + (a/2)² (HAMIS: a testmagasság befogó, nem átfogó)',
          'mo² = m² + (a/2)² (IGAZ)',
          'b² = mo² + (a/2)² (IGAZ)',
          'b² = m² + (d/2)² (IGAZ)'
        ],
        correctAnswer: 'm² = mo² + (a/2)² (HAMIS: a testmagasság befogó, nem átfogó)',
        correctIndex: 0,
        explanation: 'Az m, a/2 és mo derékszögű háromszögben mo a leghosszabb oldal (az átfogó), míg m az egyik befogó. Ezért helyesen mo² = m² + (a/2)², azaz m² = mo² - (a/2)², így az m² = mo² + (a/2)² állítás hibás.'
      }
    ]
  }
};

export const PyramidsQuiz: React.FC<PyramidsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Gúlák Gyakorló Kvíz"
      subtitle="30 feladat 3 szinten: definíciók, szabályos gúlák, hálók, Euler-tétel és Pitagorasz-kapcsolatok"
      topicId="g8-solids-pyramids"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a gúla fogalmait, élszámait és összefüggéseit!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Gúla Alapfogalmak és Részek',
              subtitle: 'Párosítsd a gúla fogalmait a hozzájuk tartozó geometriai definícióval!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Csúcsok, Lapok, Élek és Euler-tétel',
              subtitle: 'Párosítsd a gúlatípusokat a megfelelő csúcs-, lap- és élszámokkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Euler & Élek'
            },
            3: {
              title: '3. Szint: Pitagorasz-tétel és Képletek a Gúlában',
              subtitle: 'Párosítsd a derékszögű háromszögeket és szabályokat a helyes képlettel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Pitagorasz & Képletek'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <PyramidsMatcher
              key={`pyr-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a gúlatípusokat, állításokat és szakaszokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Gúla Típusok és Tulajdonságok',
              subtitle: 'Csoportosítsd: Tetraéder / Négyzet alapú Gúla / Hatszög alapú Gúla!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Típusok'
            },
            2: {
              title: '2. Szint: Igaz vs. Szabályos vs. Hamis Állítások',
              subtitle: 'Döntsd el: Minden Gúlára Igaz / Csak Szabályosra / Hamis!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Logika'
            },
            3: {
              title: '3. Szint: Szakaszok Szerepe a Szabályos Gúlában',
              subtitle: 'Rendszerezd: Testmagasság (m) / Oldallap-magasság (mo) / Oldalél (b)!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Szakaszok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <PyramidsSorter
              key={`pyr-sorter-${level}`}
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
      matcherComponent={PyramidsMatcher}
      sorterComponent={PyramidsSorter}
    />
  );
};

export default PyramidsQuiz;
