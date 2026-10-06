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
  ArrowRightLeft,
  Scale,
  Flame,
  Droplets
} from 'lucide-react';
import { PyramidSurfaceVolumeMatcher } from './PyramidSurfaceVolumeMatcher';
import { PyramidSurfaceVolumeSorter } from './PyramidSurfaceVolumeSorter';

interface PyramidSurfaceVolumeQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-formulas',
    title: 'Felszín és Térfogat Képletei',
    icon: <Calculator className="w-4 h-4 text-rose-600" />,
    formula: 'A = T_a + T_p, \\qquad V = \\frac{T_a \\cdot m}{3}',
    note: 'Szabályos gúla palástja: Tp = 2 · a · mo. A térfogat harmada a vele azonos hasábénak!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 30,42 130,42" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1" />
        <line x1="80" y1="6" x2="80" y2="42" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="80" y="26" className="text-[6.5px] font-mono font-bold fill-red-700" textAnchor="middle">m</text>
      </svg>
    )
  },
  {
    id: 'cs-pythagoras-mo',
    title: 'Oldallap-magasság (mo)',
    icon: <Ruler className="w-4 h-4 text-emerald-600" />,
    formula: 'm^2 + \\left(\\frac{a}{2}\\right)^2 = m_o^2',
    note: 'Belső derékszögű háromszög: befogók m és a/2, átfogó mo.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="30,40 100,40 100,10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="65" y="47" className="text-[6.5px] font-mono fill-emerald-800" textAnchor="middle">a/2</text>
        <text x="110" y="27" className="text-[6.5px] font-mono fill-red-600" textAnchor="middle">m</text>
        <text x="60" y="22" className="text-[6.5px] font-mono font-bold fill-emerald-700" textAnchor="middle">mo</text>
      </svg>
    )
  },
  {
    id: 'cs-pythagoras-b',
    title: 'Oldalél (b) és Lapátló',
    icon: <Compass className="w-4 h-4 text-purple-600" />,
    formula: 'm_o^2 + \\left(\\frac{a}{2}\\right)^2 = b^2, \\quad m^2 + \\left(\\frac{d}{2}\\right)^2 = b^2',
    note: 'd = a√2 a négyzet lapátlója, fele d/2 = (a√2)/2.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="30,40 100,40 100,10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
        <text x="65" y="47" className="text-[6.5px] font-mono fill-purple-800" textAnchor="middle">d/2</text>
        <text x="110" y="27" className="text-[6.5px] font-mono fill-red-600" textAnchor="middle">m</text>
        <text x="60" y="22" className="text-[6.5px] font-mono font-bold fill-purple-700" textAnchor="middle">b</text>
      </svg>
    )
  }
];

// Visual SVG Figures for Quiz Questions
const SquarePyramidVolumeFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <ellipse cx="110" cy="112" rx="70" ry="12" fill="#e2e8f0" opacity="0.6" />
    <line x1="50" y1="95" x2="110" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="110" y1="78" x2="170" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="110" y1="18" x2="110" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="110" cy="95" r="2.5" fill="#ef4444" />
    <text x="105" y="60" className="text-[10px] font-mono font-bold fill-red-600" textAnchor="end">m = 10 cm</text>
    <polygon points="110,18 50,95 110,112" fill="#fee2e2" fillOpacity="0.8" stroke="#f43f5e" strokeWidth="1.5" />
    <polygon points="110,18 110,112 170,95" fill="#fecdd3" fillOpacity="0.8" stroke="#e11d48" strokeWidth="1.5" />
    <line x1="50" y1="95" x2="110" y2="112" stroke="#be123c" strokeWidth="2" />
    <line x1="110" y1="112" x2="170" y2="95" stroke="#be123c" strokeWidth="2" />
    <circle cx="110" cy="18" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
    <text x="110" y="12" className="text-[9.5px] font-black fill-red-600" textAnchor="middle">M</text>
    <text x="80" y="117" className="text-[9.5px] font-mono font-black fill-rose-950" textAnchor="middle">a = 6 cm</text>
    <rect x="142" y="24" width="72" height="28" rx="5" fill="#ffffff" stroke="#f43f5e" strokeWidth="1" />
    <text x="178" y="36" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">Ta = 36 cm²</text>
    <text x="178" y="47" className="text-[8.5px] font-black fill-rose-600" textAnchor="middle">V = 120 cm³</text>
  </svg>
);

const InternalRightTriangleFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="65,22 65,95 155,95" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
    <rect x="65" y="83" width="12" height="12" fill="none" stroke="#059669" strokeWidth="1.5" />
    <circle cx="71" cy="89" r="1.5" fill="#059669" />
    <text x="56" y="60" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">m = 8 cm</text>
    <text x="110" y="108" className="text-[9.5px] font-bold fill-amber-700" textAnchor="middle">a/2 = 6 cm</text>
    <text x="120" y="52" className="text-[10px] font-black fill-emerald-700" textAnchor="start">mo = ? (10 cm)</text>
    <rect x="112" y="18" width="86" height="20" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
    <text x="155" y="32" className="text-[7.5px] font-mono font-bold fill-emerald-950" textAnchor="middle">8² + 6² = 64+36 = 100</text>
  </svg>
);

const LateralFacePythagorasFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="100,20 40,95 160,95" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
    <line x1="100" y1="20" x2="100" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
    <rect x="100" y="85" width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1.2" />
    <circle cx="105" cy="90" r="1" fill="#ef4444" />
    <text x="94" y="60" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">mo = 3 cm</text>
    <text x="135" y="52" className="text-[10px] font-black fill-purple-700" textAnchor="start">b = ? (5 cm)</text>
    <text x="130" y="107" className="text-[9px] font-bold fill-amber-800" textAnchor="middle">a/2 = 4 cm</text>
    <text x="100" y="12" className="text-[9.5px] font-black fill-red-700" textAnchor="middle">M</text>
    <rect x="15" y="18" width="70" height="20" rx="4" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
    <text x="50" y="32" className="text-[7.5px] font-mono font-bold fill-purple-950" textAnchor="middle">3² + 4² = 25</text>
  </svg>
);

const NetSurfaceFigure = (
  <svg viewBox="0 0 220 140" className="w-52 h-34 select-none">
    <rect x="85" y="45" width="50" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="110" y="71" className="text-[9px] font-black fill-amber-900" textAnchor="middle">Ta = 100</text>
    <text x="110" y="83" className="text-[8px] font-mono fill-amber-700" textAnchor="middle">(10 × 10)</text>
    <polygon points="85,45 135,45 110,10" fill="#fee2e2" stroke="#f43f5e" strokeWidth="1.5" />
    <line x1="110" y1="10" x2="110" y2="45" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
    <text x="114" y="28" className="text-[7.5px] font-mono font-bold fill-red-600">mo=13</text>
    <polygon points="85,95 135,95 110,130" fill="#fee2e2" stroke="#f43f5e" strokeWidth="1.5" />
    <polygon points="85,45 85,95 50,70" fill="#fee2e2" stroke="#f43f5e" strokeWidth="1.5" />
    <polygon points="135,45 135,95 170,70" fill="#fee2e2" stroke="#f43f5e" strokeWidth="1.5" />
    <rect x="8" y="10" width="70" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <text x="43" y="22" className="text-[7.5px] font-bold fill-slate-700" textAnchor="middle">Tp = 4 · 65 = 260</text>
    <text x="43" y="31" className="text-[7px] font-black fill-rose-600" textAnchor="middle">A = 360 cm²</text>
  </svg>
);

const PrismVsPyramidRatioFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    {/* Hasáb */}
    <rect x="30" y="35" width="40" height="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
    <text x="50" y="68" className="text-[9px] font-black fill-indigo-900" textAnchor="middle">Hasáb</text>
    <text x="50" y="80" className="text-[8px] font-bold fill-indigo-700" textAnchor="middle">V = Ta · m</text>
    <text x="85" y="68" className="text-[14px] font-black fill-slate-400" textAnchor="middle">=</text>
    {/* 3 kis gúla */}
    <polygon points="115,40 100,85 130,85" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
    <polygon points="150,40 135,85 165,85" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
    <polygon points="185,40 170,85 200,85" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
    <text x="150" y="105" className="text-[8.5px] font-black fill-rose-700" textAnchor="middle">3 × Gúla Térfogata</text>
  </svg>
);

const DiagonalSectionFigure = (
  <svg viewBox="0 0 220 130" className="w-52 h-32 select-none">
    <rect x="15" y="10" width="190" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <polygon points="65,25 65,95 165,95" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <rect x="65" y="83" width="12" height="12" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <circle cx="71" cy="89" r="1.5" fill="#2563eb" />
    <text x="56" y="62" className="text-[9.5px] font-bold fill-red-600" textAnchor="end">m = 3 cm</text>
    <text x="115" y="108" className="text-[9.5px] font-bold fill-blue-800" textAnchor="middle">d/2 = 4 cm</text>
    <text x="125" y="55" className="text-[10px] font-black fill-indigo-700" textAnchor="start">b = 5 cm</text>
    <rect x="115" y="18" width="82" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
    <text x="156" y="32" className="text-[7.5px] font-mono font-bold fill-blue-950" textAnchor="middle">3² + 4² = 25</text>
  </svg>
);

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfeladatok, Képletek és Térfogat',
    subtitle: 'Felszín- és térfogatképletek alkalmazása, alapterület, hasáb és gúla kapcsolata',
    range: '1 - 10. feladat',
    focus: 'Képletek & Térfogat',
    questions: [
      {
        id: 'psvq-1-1',
        category: 'Gúla térfogatának képlete',
        question: 'Egy négyzet alapú gúla alapéle a = 6 cm, testmagassága m = 10 cm. Mennyi a gúla térfogata (V)?',
        figure: SquarePyramidVolumeFigure,
        options: [
          '120 cm³',
          '360 cm³',
          '60 cm³',
          '180 cm³'
        ],
        correctAnswer: '120 cm³',
        correctIndex: 0,
        explanation: 'Alapterület: Ta = 6² = 36 cm². Térfogat: V = (Ta · m) / 3 = (36 · 10) / 3 = 360 / 3 = 120 cm³.',
        breakdown: [
          { label: 'Alapterület', value: 'Ta = 6² = 36 cm²' },
          { label: 'Térfogat', value: 'V = (36 · 10) / 3 = 120 cm³' }
        ]
      },
      {
        id: 'psvq-1-2',
        category: 'Gúla és hasáb kapcsolata',
        question: 'Egy egyenes hasáb és egy gúla alapterülete és testmagassága megegyezik. Hányszorosa a hasáb térfogata a gúla térfogatának?',
        figure: PrismVsPyramidRatioFigure,
        options: [
          'Pontosan 3-szorosa (V_hasáb = 3 · V_gúla)',
          '2-szerese',
          '4-szerese',
          'Ugyanannyi (egyenlő)'
        ],
        correctAnswer: 'Pontosan 3-szorosa (V_hasáb = 3 · V_gúla)',
        correctIndex: 0,
        explanation: 'A hasáb térfogata V = Ta · m, míg a gúláé V = (Ta · m) / 3. Ezért a hasáb térfogata pontosan háromszorosa a gúla térfogatának.',
        breakdown: [
          { label: 'Hasáb', value: 'V = Ta · m' },
          { label: 'Gúla', value: 'V = (Ta · m) / 3' },
          { label: 'Arány', value: 'V_hasáb / V_gúla = 3' }
        ]
      },
      {
        id: 'psvq-1-3',
        category: 'Gúla felszínének felépítése',
        question: 'Melyik képlet fejezi ki helyesen egy tetszőleges gúla teljes felszínét (A)?',
        options: [
          'A = Ta + Tp (az alapterület és a palástterület összege)',
          'A = 2 · Ta + Tp',
          'A = Ta · m / 3',
          'A = 4 · Ta'
        ],
        correctAnswer: 'A = Ta + Tp (az alapterület és a palástterület összege)',
        correctIndex: 0,
        explanation: 'A gúlának csak 1 darab alaplapja van (nem úgy, mint a hasábnak, aminek kettő), így felszíne A = Ta + Tp.',
        breakdown: [
          { label: 'Alaplap', value: '1 darab (Ta)' },
          { label: 'Palást', value: 'Oldallapok összege (Tp)' },
          { label: 'Felszín', value: 'A = Ta + Tp' }
        ]
      },
      {
        id: 'psvq-1-4',
        category: 'Térfogatból magasság visszaszámítása',
        question: 'Egy négyzet alapú gúla alapterülete Ta = 50 cm², térfogata V = 250 cm³. Milyen magas a gúla (m)?',
        options: [
          '15 cm',
          '5 cm',
          '10 cm',
          '25 cm'
        ],
        correctAnswer: '15 cm',
        correctIndex: 0,
        explanation: 'V = (Ta · m) / 3 => 250 = (50 · m) / 3 => 750 = 50 · m => m = 750 / 50 = 15 cm.',
        breakdown: [
          { label: 'Képlet', value: '250 = (50 · m) / 3' },
          { label: 'Szorzás 3-mal', value: '750 = 50 · m' },
          { label: 'Eredmény', value: 'm = 15 cm' }
        ]
      },
      {
        id: 'psvq-1-5',
        category: 'Szabályos gúla palástja',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 8 cm, oldallap-magassága mo = 10 cm. Mekkora a palástterülete (Tp)?',
        options: [
          '160 cm²',
          '80 cm²',
          '320 cm²',
          '40 cm²'
        ],
        correctAnswer: '160 cm²',
        correctIndex: 0,
        explanation: 'Egy oldallap területe: (8 · 10) / 2 = 40 cm². A 4 oldallap összege: Tp = 4 · 40 = 160 cm² (vagy Tp = 2 · a · mo = 2 · 8 · 10 = 160 cm²).',
        breakdown: [
          { label: '1 oldallap', value: '(8 · 10) / 2 = 40 cm²' },
          { label: '4 oldallap', value: '4 · 40 = 160 cm²' }
        ]
      },
      {
        id: 'psvq-1-6',
        category: 'Szabályos tetraéder felszíne',
        question: 'Egy szabályos tetraéder minden éle a = 4 cm. Milyen képlettel számítjuk ki a teljes felszínét?',
        options: [
          'A = a² · √3 = 16√3 cm² ≈ 27,71 cm²',
          'A = a³ = 64 cm²',
          'A = 6 · a² = 96 cm²',
          'A = a² / 2 = 8 cm²'
        ],
        correctAnswer: 'A = a² · √3 = 16√3 cm² ≈ 27,71 cm²',
        correctIndex: 0,
        explanation: 'A szabályos tetraéder 4 egybevágó szabályos háromszögből áll. 1 háromszög területe Ta = a²√3 / 4, így a 4 lap: A = 4 · (a²√3 / 4) = a²√3 = 16√3 cm².',
        breakdown: [
          { label: '1 lap', value: 'a²√3 / 4' },
          { label: '4 lap', value: 'A = a²√3' },
          { label: 'Érték', value: '16√3 ≈ 27,71 cm²' }
        ]
      },
      {
        id: 'psvq-1-7',
        category: 'Térfogat mértékegység átváltás',
        question: 'Egy gúla térfogata V = 3000 cm³. Hány liter víz fér el benne pontosan?',
        options: [
          '3 liter (3 dm³)',
          '30 liter',
          '0,3 liter',
          '300 liter'
        ],
        correctAnswer: '3 liter (3 dm³)',
        correctIndex: 0,
        explanation: '1000 cm³ = 1 dm³ = 1 liter. Ezért 3000 cm³ = 3 dm³ = 3 liter.',
        breakdown: [
          { label: 'Váltószám', value: '1 liter = 1000 cm³' },
          { label: 'Átváltás', value: '3000 / 1000 = 3 liter' }
        ]
      },
      {
        id: 'psvq-1-8',
        category: 'Téglalap alapú gúla alapterülete',
        question: 'Egy téglalap alapú gúla alapélei a = 8 cm és b = 5 cm, testmagassága m = 9 cm. Mennyi a gúla térfogata?',
        options: [
          '120 cm³',
          '360 cm³',
          '40 cm³',
          '180 cm³'
        ],
        correctAnswer: '120 cm³',
        correctIndex: 0,
        explanation: 'Alapterület: Ta = 8 · 5 = 40 cm². Térfogat: V = (40 · 9) / 3 = 360 / 3 = 120 cm³.',
        breakdown: [
          { label: 'Ta', value: '8 · 5 = 40 cm²' },
          { label: 'V', value: '(40 · 9) / 3 = 120 cm³' }
        ]
      },
      {
        id: 'psvq-1-9',
        category: 'Háló kiterítése és felszín',
        question: 'Egy szabályos négyzet alapú gúla hálóját kivágva mekkora a síkbeli papírterület, ha Ta = 36 cm² és egy oldalháromszög területe 20 cm²?',
        options: [
          '116 cm²',
          '56 cm²',
          '80 cm²',
          '96 cm²'
        ],
        correctAnswer: '116 cm²',
        correctIndex: 0,
        explanation: 'A háló az alaplapból és a 4 oldallapból áll: A = Ta + 4 · T_háromszög = 36 + 4 · 20 = 36 + 80 = 116 cm².',
        breakdown: [
          { label: 'Alap', value: '36 cm²' },
          { label: 'Palást', value: '4 · 20 = 80 cm²' },
          { label: 'Összeg', value: '36 + 80 = 116 cm²' }
        ]
      },
      {
        id: 'psvq-1-10',
        category: 'Térfogat alapfogalma',
        question: 'Melyik magasságra van szükség közvetlenül a gúla térfogatának (V) kiszámításához?',
        options: [
          'A testmagasságra (m), amely merőleges az alaplap síkjára',
          'Az oldallap-magasságra (mo)',
          'Az oldalélre (b)',
          'Bármelyik magasság megfelel'
        ],
        correctAnswer: 'A testmagasságra (m), amely merőleges az alaplap síkjára',
        correctIndex: 0,
        explanation: 'A térfogat V = (Ta · m) / 3, amiben mindig a test belsejében futó függőleges testmagasság (m) szerepel.',
        breakdown: [
          { label: 'Szükséges magasság', value: 'Testmagasság (m)' },
          { label: 'mo szerepe', value: 'Csak a felszínnél (palástnál)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Felszínszámítás & Pitagorasz az Oldallapon',
    subtitle: 'Oldallap-magasság és oldalél kiszámítása Pitagorasz-tétellel, teljes felszín',
    range: '11 - 20. feladat',
    focus: 'Pitagorasz & Felszín',
    questions: [
      {
        id: 'psvq-2-1',
        category: 'Oldallap-magasság Pitagorasszal',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 12 cm, testmagassága m = 8 cm. Mennyi az oldallap-magasság (mo)?',
        figure: InternalRightTriangleFigure,
        options: [
          '10 cm',
          '14 cm',
          '12 cm',
          '6 cm'
        ],
        correctAnswer: '10 cm',
        correctIndex: 0,
        explanation: 'A derékszögű háromszög befogói: m = 8 cm és a/2 = 6 cm. mo = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.',
        breakdown: [
          { label: 'a / 2', value: '12 / 2 = 6 cm' },
          { label: 'Pitagorasz', value: 'mo² = 8² + 6² = 100' },
          { label: 'Eredmény', value: 'mo = 10 cm' }
        ]
      },
      {
        id: 'psvq-2-2',
        category: 'Szabályos gúla teljes felszíne',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm, oldallap-magassága mo = 13 cm. Mennyi a gúla teljes felszíne (A)?',
        figure: NetSurfaceFigure,
        options: [
          '360 cm²',
          '260 cm²',
          '100 cm²',
          '460 cm²'
        ],
        correctAnswer: '360 cm²',
        correctIndex: 0,
        explanation: 'Ta = 10² = 100 cm². Tp = 4 · (10 · 13 / 2) = 4 · 65 = 260 cm². Teljes felszín: A = 100 + 260 = 360 cm².',
        breakdown: [
          { label: 'Ta', value: '10² = 100 cm²' },
          { label: 'Tp', value: '2 · 10 · 13 = 260 cm²' },
          { label: 'A', value: '100 + 260 = 360 cm²' }
        ]
      },
      {
        id: 'psvq-2-3',
        category: 'Oldalél kiszámítása',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 8 cm, oldallap-magassága mo = 3 cm. Mennyi az oldalél (b) hossza?',
        figure: LateralFacePythagorasFigure,
        options: [
          '5 cm',
          '7 cm',
          '6 cm',
          '8 cm'
        ],
        correctAnswer: '5 cm',
        correctIndex: 0,
        explanation: 'Az oldallap derékszögű háromszögében mo = 3 cm és a/2 = 4 cm a befogók: b = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.',
        breakdown: [
          { label: 'a / 2', value: '8 / 2 = 4 cm' },
          { label: 'Pitagorasz', value: 'b² = 3² + 4² = 25' },
          { label: 'Eredmény', value: 'b = 5 cm' }
        ]
      },
      {
        id: 'psvq-2-4',
        category: 'Testmagasság visszaszámolása',
        question: 'Szabályos négyzet alapú gúlában a = 8 cm, oldallap-magasság mo = 5 cm. Mekkora a gúla testmagassága (m)?',
        options: [
          '3 cm',
          '4 cm',
          '2,5 cm',
          '√41 ≈ 6,4 cm'
        ],
        correctAnswer: '3 cm',
        correctIndex: 0,
        explanation: 'A fél alapél a/2 = 4 cm. m² + (a/2)² = mo² => m² + 16 = 25 => m² = 9 => m = 3 cm.',
        breakdown: [
          { label: 'a / 2', value: '4 cm' },
          { label: 'm²', value: '5² - 4² = 9' },
          { label: 'm', value: '3 cm' }
        ]
      },
      {
        id: 'psvq-2-5',
        category: 'Kétlépéses felszínszámítás',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 6 cm, testmagassága m = 4 cm. Mekkora a gúla teljes felszíne (A)?',
        options: [
          '96 cm²',
          '60 cm²',
          '36 cm²',
          '84 cm²'
        ],
        correctAnswer: '96 cm²',
        correctIndex: 0,
        explanation: 'a/2 = 3 cm => mo = √(4² + 3²) = 5 cm. Ta = 6² = 36 cm². Tp = 4 · (6 · 5 / 2) = 60 cm². A = 36 + 60 = 96 cm².',
        breakdown: [
          { label: '1. mo', value: '√(16 + 9) = 5 cm' },
          { label: '2. Ta, Tp', value: 'Ta = 36, Tp = 60' },
          { label: '3. A', value: '36 + 60 = 96 cm²' }
        ]
      },
      {
        id: 'psvq-2-6',
        category: 'Gúla alakú sátor ponyvája',
        question: 'Négyzet alapú sátor alapéle a = 4 m, oldallapjainak magassága mo = 3 m. Hány m² ponyva szükséges a sátor felállításához (aljzat nélkül)?',
        options: [
          '24 m²',
          '40 m²',
          '16 m²',
          '12 m²'
        ],
        correctAnswer: '24 m²',
        correctIndex: 0,
        explanation: 'Aljzat nélkül csak a palást területe kell: Tp = 4 · (4 · 3 / 2) = 4 · 6 = 24 m².',
        breakdown: [
          { label: 'Aljzat', value: 'Nem kell (sátorponyva)' },
          { label: 'Tp', value: '4 · (4 · 3 / 2) = 24 m²' }
        ]
      },
      {
        id: 'psvq-2-7',
        category: 'Alapél fele mint befogó',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 14 cm. Mennyi a testmagasság talppontjának távolsága az alapnégyzet bármelyik oldalától?',
        options: [
          '7 cm (a / 2)',
          '14 cm',
          '7√2 ≈ 9,9 cm',
          '3,5 cm'
        ],
        correctAnswer: '7 cm (a / 2)',
        correctIndex: 0,
        explanation: 'A négyzet középpontjának távolsága a négyzet oldalaitól pontosan a beírt kör sugara, azaz az oldal fele: r = a / 2 = 14 / 2 = 7 cm.',
        breakdown: [
          { label: 'Középpont távolsága', value: 'r = a / 2' },
          { label: 'Érték', value: '14 / 2 = 7 cm' }
        ]
      },
      {
        id: 'psvq-2-8',
        category: 'Oldallap területe oldalélből',
        question: 'Egy szabályos négyzet alapú gúlában az alapél a = 12 cm, az oldalél b = 10 cm. Mennyi egyetlen oldallap területe?',
        options: [
          '48 cm²',
          '60 cm²',
          '96 cm²',
          '36 cm²'
        ],
        correctAnswer: '48 cm²',
        correctIndex: 0,
        explanation: 'Az oldallapban a/2 = 6 cm. mo = √(10² - 6²) = √(100 - 36) = √64 = 8 cm. Terület: (12 · 8) / 2 = 48 cm².',
        breakdown: [
          { label: 'mo', value: '√(100 - 36) = 8 cm' },
          { label: 'Oldallap területe', value: '(12 · 8) / 2 = 48 cm²' }
        ]
      },
      {
        id: 'psvq-2-9',
        category: 'Négyzet alap lapátlója',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm. Mekkora az alaplap átlójának hossza (d)?',
        options: [
          '10√2 cm ≈ 14,14 cm',
          '10 cm',
          '20 cm',
          '5√2 cm'
        ],
        correctAnswer: '10√2 cm ≈ 14,14 cm',
        correctIndex: 0,
        explanation: 'A négyzet átlója Pitagorasz-tétellel: d = √(a² + a²) = √(2a²) = a√2 = 10√2 cm ≈ 14,14 cm.',
        breakdown: [
          { label: 'Képlet', value: 'd = a · √2' },
          { label: 'Érték', value: '10√2 ≈ 14,14 cm' }
        ]
      },
      {
        id: 'psvq-2-10',
        category: 'Felszín és térfogat egybeesése',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 12 cm, testmagassága m = 8 cm (mo = 10 cm). Mi az érdekessége a felszín (A) és a térfogat (V) mérőszámának?',
        options: [
          'A mérőszámuk megegyezik: A = 384 cm² és V = 384 cm³',
          'A térfogat a kétszerese a felszínnek',
          'A felszín a háromszorosa a térfogatnak',
          'Nincs köztük semmilyen kapcsolat'
        ],
        correctAnswer: 'A mérőszámuk megegyezik: A = 384 cm² és V = 384 cm³',
        correctIndex: 0,
        explanation: 'Ta = 144, Tp = 240 => A = 384 cm². V = (144 · 8) / 3 = 48 · 8 = 384 cm³. Bár mértékegységük eltér (cm² vs cm³), a numerikus értékük pontosan azonos!',
        breakdown: [
          { label: 'A', value: '144 + 240 = 384 cm²' },
          { label: 'V', value: '(144 · 8) / 3 = 384 cm³' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Számítások, Átlós Metszet & Gyakorlat',
    subtitle: 'Átlós síkmetszet, tömegszámítás anyagi sűrűséggel, skálázás és gyakorlati feladatok',
    range: '21 - 30. feladat',
    focus: 'Összetett & Gyakorlat',
    questions: [
      {
        id: 'psvq-3-1',
        category: 'Átlós síkmetszet Pitagorasza',
        question: 'Szabályos négyzet alapú gúlában az alapátló fele d/2 = 4 cm, a testmagasság m = 3 cm. Mekkora az oldalél (b) hossza?',
        figure: DiagonalSectionFigure,
        options: [
          '5 cm',
          '7 cm',
          '√7 ≈ 2,6 cm',
          '6 cm'
        ],
        correctAnswer: '5 cm',
        correctIndex: 0,
        explanation: 'A csúcs, a középpont és az alapsokszög csúcsa által alkotott derékszögű háromszögben: b = √(m² + (d/2)²) = √(3² + 4²) = √25 = 5 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'b² = 3² + 4² = 25' },
          { label: 'Oldalél b', value: '5 cm' }
        ]
      },
      {
        id: 'psvq-3-2',
        category: 'Anyagi sűrűség és tömeg',
        question: 'Egy tömör gránit gúladísz alapterülete Ta = 200 cm², magassága m = 15 cm. Mennyi a tömege, ha a gránit sűrűsége ρ = 2,7 g/cm³?',
        options: [
          '2,7 kg (2700 g)',
          '8,1 kg',
          '0,9 kg',
          '5,4 kg'
        ],
        correctAnswer: '2,7 kg (2700 g)',
        correctIndex: 0,
        explanation: 'Térfogat: V = (200 · 15) / 3 = 1000 cm³. Tömeg: m_tömeg = ρ · V = 2,7 · 1000 = 2700 g = 2,7 kg.',
        breakdown: [
          { label: 'V', value: '(200 · 15) / 3 = 1000 cm³' },
          { label: 'm_tömeg', value: '2,7 · 1000 = 2700 g = 2,7 kg' }
        ]
      },
      {
        id: 'psvq-3-3',
        category: 'Térfogat skálázódása (k³)',
        question: 'Egy gúla minden élét a kétszeresére növeljük (k = 2). Hányszorosára nő a gúla térfogata (V)?',
        options: [
          '8-szorosára (2³ = 8)',
          '4-szeresére (2² = 4)',
          '2-szeresére',
          '6-szorosára'
        ],
        correctAnswer: '8-szorosára (2³ = 8)',
        correctIndex: 0,
        explanation: 'A térfogat 3-dimenziós mennyiség: Ta 4-szeresére nő (2²), m 2-szeresére nő (2¹), így a térfogat 4 · 2 = 8-szorosára (k³ = 2³ = 8) növekszik!',
        breakdown: [
          { label: 'Alapterület', value: 'k² = 2² = 4-szeres' },
          { label: 'Magasság', value: 'k = 2-szeres' },
          { label: 'Térfogat', value: 'k³ = 2³ = 8-szoros' }
        ]
      },
      {
        id: 'psvq-3-4',
        category: 'Felszín skálázódása (k²)',
        question: 'Egy gúla minden élét a 3-szorosára növeljük (k = 3). Hányszorosára nő a gúla teljes felszíne (A)?',
        options: [
          '9-szeresére (3² = 9)',
          '27-szeresére (3³ = 27)',
          '3-szorosára',
          '6-szorosára'
        ],
        correctAnswer: '9-szeresére (3² = 9)',
        correctIndex: 0,
        explanation: 'A felszín 2-dimenziós felület: minden lap területe k² = 3² = 9-szeresére növekszik, így az összegük is pontosan 9-szeres lesz.',
        breakdown: [
          { label: 'Skálázási faktor', value: 'k = 3' },
          { label: 'Terület / Felszín', value: 'k² = 3² = 9-szeres' }
        ]
      },
      {
        id: 'psvq-3-5',
        category: 'Bádogtető lemezszükséglet hulladékkal',
        question: 'Egy templomtorony szabályos négyzet alapú gúla sisakjának alapéle a = 6 m, oldallap-magassága mo = 10 m. Mennyi lemez kell, ha a szabási hulladék 10%?',
        options: [
          '132 m²',
          '120 m²',
          '156 m²',
          '144 m²'
        ],
        correctAnswer: '132 m²',
        correctIndex: 0,
        explanation: 'Palástterület: Tp = 4 · (6 · 10 / 2) = 120 m². 10% hulladékkal: 120 · 1,10 = 132 m².',
        breakdown: [
          { label: 'Tp', value: '4 · 30 = 120 m²' },
          { label: '+10% hulladék', value: '120 · 1,1 = 132 m²' }
        ]
      },
      {
        id: 'psvq-3-6',
        category: 'Téglalap alapú gúla palástja',
        question: 'Egy téglalap alapú gúla alapélei a = 8 cm és b = 6 cm. Az a élhez mo_a = 5 cm, a b élhez mo_b = 6 cm tartozik. Mennyi a palástterület (Tp)?',
        options: [
          '76 cm²',
          '80 cm²',
          '120 cm²',
          '88 cm²'
        ],
        correctAnswer: '76 cm²',
        correctIndex: 0,
        explanation: 'Tp = 2 · (a · mo_a / 2) + 2 · (b · mo_b / 2) = a · mo_a + b · mo_b = 8 · 5 + 6 · 6 = 40 + 36 = 76 cm².',
        breakdown: [
          { label: '2 lap (a élre)', value: '8 · 5 = 40 cm²' },
          { label: '2 lap (b élre)', value: '6 · 6 = 36 cm²' },
          { label: 'Tp', value: '40 + 36 = 76 cm²' }
        ]
      },
      {
        id: 'psvq-3-7',
        category: 'Egyenlő élű gúla testmagassága',
        question: 'Egy szabályos négyzet alapú gúla minden éle (alapélei és oldalélei is) a = 10 cm. Mekkora a gúla testmagassága (m)?',
        options: [
          '5√2 cm ≈ 7,07 cm',
          '5 cm',
          '5√3 cm ≈ 8,66 cm',
          '10 cm'
        ],
        correctAnswer: '5√2 cm ≈ 7,07 cm',
        correctIndex: 0,
        explanation: 'Az alapátló fele d/2 = 5√2 cm. Az átlós háromszögben m² + (d/2)² = b² => m² + 50 = 100 => m² = 50 => m = √50 = 5√2 cm ≈ 7,07 cm.',
        breakdown: [
          { label: 'd / 2', value: '5√2 cm' },
          { label: 'm²', value: '100 - 50 = 50' },
          { label: 'm', value: '√50 = 5√2 ≈ 7,07 cm' }
        ]
      },
      {
        id: 'psvq-3-8',
        category: 'Szabályos tetraéder térfogata',
        question: 'Milyen képlettel adható meg az a élű szabályos tetraéder térfogata?',
        options: [
          'V = (a³ · √2) / 12',
          'V = a³ / 6',
          'V = (a³ · √3) / 4',
          'V = a³ / 3'
        ],
        correctAnswer: 'V = (a³ · √2) / 12',
        correctIndex: 0,
        explanation: 'Ta = a²√3 / 4 és m = a√6 / 3. V = (Ta · m) / 3 = ((a²√3 / 4) · (a√6 / 3)) / 3 = (a³ · 3√2) / 36 = (a³√2) / 12.',
        breakdown: [
          { label: 'Ta', value: 'a²√3 / 4' },
          { label: 'm', value: 'a√6 / 3' },
          { label: 'V', value: '(a³√2) / 12' }
        ]
      },
      {
        id: 'psvq-3-9',
        category: 'Oktaéder mint dupla gúla',
        question: 'Egy szabályos oktaéder két darab közös négyzet alapú gúlából áll. Ha egy gúla térfogata 50 cm³, mennyi az oktaéder térfogata?',
        options: [
          '100 cm³',
          '150 cm³',
          '50 cm³',
          '200 cm³'
        ],
        correctAnswer: '100 cm³',
        correctIndex: 0,
        explanation: 'A szabályos oktaéder pontosan 2 darab egymással szembe fordított egybevágó szabályos négyzet alapú gúlára bontható: V_oktaéder = 2 · 50 = 100 cm³.',
        breakdown: [
          { label: 'Szerkezet', value: '2 db egybevágó gúla' },
          { label: 'Térfogat', value: '2 · 50 = 100 cm³' }
        ]
      },
      {
        id: 'psvq-3-10',
        category: 'Komplex Pitagorasz és térfogat',
        question: 'Egy szabályos négyzet alapú gúla alapéle a = 12 cm, oldaléle b = 10 cm. Mennyi a gúla térfogata (V)?',
        options: [
          '96√7 cm³ ≈ 253,99 cm³',
          '384 cm³',
          '288 cm³',
          '144 cm³'
        ],
        correctAnswer: '96√7 cm³ ≈ 253,99 cm³',
        correctIndex: 0,
        explanation: 'mo = √(10² - 6²) = 8 cm. m = √(mo² - (a/2)²) = √(8² - 6²) = √(64 - 36) = √28 = 2√7 cm. Ta = 144 cm². V = (144 · 2√7) / 3 = 48 · 2√7 = 96√7 cm³ ≈ 254 cm³.',
        breakdown: [
          { label: '1. mo', value: '√(100 - 36) = 8 cm' },
          { label: '2. m', value: '√(64 - 36) = √28 = 2√7 cm' },
          { label: '3. V', value: '(144 · 2√7) / 3 = 96√7 ≈ 254 cm³' }
        ]
      }
    ]
  }
};

export const PyramidSurfaceVolumeQuiz: React.FC<PyramidSurfaceVolumeQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Gúla Felszín és Térfogat Gyakorló Kvíz"
      subtitle="30 feladat 3 szinten: felszínképletek, harmadoló térfogatszámítás, Pitagorasz-levezetések és gyakorlati feladatok"
      topicId="g8-solids-pyramids-calc"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a képleteket, Pitagorasz-kapcsolatokat és számításokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Képletek és Alapösszefüggések',
              subtitle: 'Párosítsd a fogalmakat és feladványokat képleteikkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Pitagorasz-kapcsolatok és Szakaszok',
              subtitle: 'Párosítsd a háromszögeket és szakaszokat a Pitagorasz-egyenletekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Pitagorasz'
            },
            3: {
              title: '3. Szint: Eredmények és Gyakorlati Számítások',
              subtitle: 'Párosítsd a numerikus feladványokat a pontos számított értékekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számítások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <PyramidSurfaceVolumeMatcher
              key={`psv-matcher-${level}`}
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
          subtitle: 'Kategorizáld a képletek szereplőit, a szakaszokat és állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Felszín (A) vs. Térfogat (V) vs. Mindkettő',
              subtitle: 'Csoportosítsd: Csak Felszín / Csak Térfogat / Mindkettő!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Szakaszok Szerepe a Derékszögű Háromszögekben',
              subtitle: 'Rendszerezd: Testmagasság (m) / Oldallap-magasság (mo) / Oldalél (b)!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Szakaszok'
            },
            3: {
              title: '3. Szint: Matematikai Állítások Igazságértéke',
              subtitle: 'Döntsd el: Minden Gúlára Igaz / Csak Szabályosra / Hamis!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Logika'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <PyramidSurfaceVolumeSorter
              key={`psv-sorter-${level}`}
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
      matcherComponent={PyramidSurfaceVolumeMatcher}
      sorterComponent={PyramidSurfaceVolumeSorter}
    />
  );
};

export default PyramidSurfaceVolumeQuiz;
