import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Circle,
  Layers,
  Calculator,
  Compass,
  Award,
  Sparkles,
  HelpCircle,
  Ruler,
  Globe,
  LayoutGrid,
  ArrowRightLeft,
  Scale,
  Flame,
  Droplets
} from 'lucide-react';
import { SphereMatcher } from './SphereMatcher';
import { SphereSorter } from './SphereSorter';

interface SphereQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-surface',
    title: 'Gömb Felszínének Képlete',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    formula: 'A = 4\\pi r^2 = d^2\\pi',
    note: 'A gömb felszíne pontosan négyszerese a főkörének területének: A = 4 · Tf.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
        <ellipse cx="80" cy="25" rx="20" ry="6" fill="none" stroke="#1d4ed8" strokeWidth="0.9" strokeDasharray="2 2" />
        <text x="80" y="27" className="text-[7.5px] font-bold fill-blue-900" textAnchor="middle">4πr²</text>
      </svg>
    )
  },
  {
    id: 'cs-volume',
    title: 'Gömb Térfogatának Képlete',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'V = \\frac{4}{3}\\pi r^3 = \\frac{\\pi d^3}{6}',
    note: 'Sugár a köbön (r³)! Arkhimédész szerint 2/3-a a köré írt henger térfogatának.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <text x="80" y="27" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">(4/3)πr³</text>
      </svg>
    )
  },
  {
    id: 'cs-hemisphere',
    title: 'Tömör Félgömb Képletei',
    icon: <Compass className="w-4 h-4 text-teal-600" />,
    formula: 'A_{\\text{fél}} = 3\\pi r^2, \\quad V_{\\text{fél}} = \\frac{2}{3}\\pi r^3',
    note: 'Teljes felszín: 2πr² (gömbsüveg palást) + πr² (sík körlap alaplap) = 3πr²!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 60,32 A 20,20 0 0,1 100,32 Z" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.2" />
        <ellipse cx="80" cy="32" rx="20" ry="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
        <text x="80" y="22" className="text-[6.5px] font-bold fill-teal-900" textAnchor="middle">3πr²</text>
      </svg>
    )
  },
  {
    id: 'cs-great-circle',
    title: 'Főkör és Síkmetszet',
    icon: <Circle className="w-4 h-4 text-amber-600" />,
    formula: 'T_f = r^2\\pi, \\quad \\rho = \\sqrt{r^2 - x^2}',
    note: 'A gömb középpontján átmenő sík főkör. Kiskör sugara Pitagorasz-tétellel számítható.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        <line x1="80" y1="25" x2="100" y2="25" stroke="#b45309" strokeWidth="1.5" />
        <text x="90" y="22" className="text-[6.5px] font-bold fill-amber-900" textAnchor="middle">r</text>
      </svg>
    )
  }
];

// SVG Figures for Quiz Questions
const SphereRadius5Figure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <defs>
      <radialGradient id="qGrad1" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#bfdbfe" />
        <stop offset="60%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="60" r="45" fill="url(#qGrad1)" opacity="0.9" />
    <ellipse cx="100" cy="60" rx="45" ry="14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="100" cy="60" r="2.5" fill="#ffffff" />
    <line x1="100" y1="60" x2="145" y2="60" stroke="#facc15" strokeWidth="2" />
    <text x="122" y="55" className="text-[9px] font-black fill-amber-300" textAnchor="middle">r = 5 cm</text>
    <rect x="8" y="10" width="60" height="22" rx="4" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
    <text x="38" y="24" className="text-[7.5px] font-bold fill-blue-900" textAnchor="middle">A = 4πr² = ?</text>
  </svg>
);

const SphereVolume3Figure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <defs>
      <radialGradient id="qGrad2" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ddd6fe" />
        <stop offset="60%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#5b21b6" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="60" r="45" fill="url(#qGrad2)" opacity="0.9" />
    <ellipse cx="100" cy="60" rx="45" ry="14" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="100" y1="60" x2="145" y2="60" stroke="#facc15" strokeWidth="2" />
    <text x="122" y="55" className="text-[9px] font-black fill-amber-300" textAnchor="middle">r = 3 cm</text>
    <rect x="8" y="10" width="70" height="22" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
    <text x="43" y="24" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">V = (4/3)πr³ = ?</text>
  </svg>
);

const GreatCircleFigure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <circle cx="100" cy="60" r="45" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
    <ellipse cx="100" cy="60" rx="45" ry="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <circle cx="100" cy="60" r="3" fill="#b45309" />
    <text x="100" y="54" className="text-[9px] font-black fill-amber-900" textAnchor="middle">Főkör Tf = 15 cm²</text>
    <rect x="130" y="85" width="62" height="22" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
    <text x="161" y="99" className="text-[7.5px] font-black fill-blue-900" textAnchor="middle">Gömb A = ?</text>
  </svg>
);

const HemisphereFigure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <defs>
      <radialGradient id="hemiGradQ" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="70%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </radialGradient>
    </defs>
    <path d="M 55,75 A 45,45 0 0,1 145,75 Z" fill="url(#hemiGradQ)" opacity="0.9" />
    <ellipse cx="100" cy="75" rx="45" ry="14" fill="#d1fae5" stroke="#059669" strokeWidth="1.8" />
    <circle cx="100" cy="75" r="2.5" fill="#065f46" />
    <line x1="100" y1="75" x2="145" y2="75" stroke="#dc2626" strokeWidth="2" />
    <text x="122" y="70" className="text-[8.5px] font-black fill-red-700" textAnchor="middle">r = 2 cm</text>
    <rect x="10" y="10" width="75" height="22" rx="4" fill="#ffffff" stroke="#6ee7b7" strokeWidth="1" />
    <text x="47" y="24" className="text-[7.5px] font-bold fill-emerald-950" textAnchor="middle">Teljes A = 3πr² = ?</text>
  </svg>
);

const CylinderSphereRatioFigure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <rect x="35" y="20" width="50" height="80" rx="3" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="25" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
    <text x="60" y="63" className="text-[8px] font-black fill-blue-900" textAnchor="middle">Gömb</text>
    <text x="110" y="62" className="text-[12px] font-black fill-slate-400" textAnchor="middle">⇒</text>
    <rect x="125" y="38" width="68" height="44" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    <text x="159" y="55" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">Arkhimédész:</text>
    <text x="159" y="70" className="text-[9px] font-black fill-emerald-600" textAnchor="middle">Vgömb = 2/3 · Vh</text>
  </svg>
);

const CrossSectionPythagorasFigure = (
  <svg viewBox="0 0 200 120" className="w-48 h-28 select-none">
    <circle cx="100" cy="60" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
    <circle cx="100" cy="60" r="2.5" fill="#1e293b" />
    {/* Metszősík vonala feljebb */}
    <line x1="60" y1="36" x2="140" y2="36" stroke="#0284c7" strokeWidth="2" />
    {/* Derékszögű háromszög */}
    <polygon points="100,60 100,36 138,36" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
    <text x="94" y="50" className="text-[7.5px] font-bold fill-red-600" textAnchor="end">x = 6</text>
    <text x="122" y="32" className="text-[7.5px] font-bold fill-sky-700" textAnchor="middle">ρ = ?</text>
    <text x="124" y="55" className="text-[7.5px] font-black fill-amber-700" textAnchor="middle">r = 10</text>
  </svg>
);

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Képletek',
    subtitle: 'Felszín, térfogat, főkör és alapvető sugárszámítások',
    range: '1 - 10. feladat',
    focus: 'Képletek & Főkör',
    questions: [
      {
        id: 'sq-1-1',
        category: 'Gömb felszínének képlete',
        question: 'Egy gömb sugara r = 5 cm. Mennyi a gömb felszíne (π ≈ 3,14)?',
        figure: SphereRadius5Figure,
        options: [
          'A = 100π ≈ 314 cm²',
          'A = 25π ≈ 78,5 cm²',
          'A = 500π / 3 ≈ 523,3 cm²',
          'A = 20π ≈ 62,8 cm²'
        ],
        correctAnswer: 'A = 100π ≈ 314 cm²',
        correctIndex: 0,
        explanation: 'A gömb felszíne A = 4 · r² · π. Behelyettesítve: A = 4 · 5² · π = 4 · 25 · π = 100π ≈ 314,16 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 4 · r² · π' },
          { label: 'Behelyettesítés', value: '4 · 25 · π = 100π' },
          { label: 'Közelítő érték', value: '100 · 3,14 = 314 cm²' }
        ]
      },
      {
        id: 'sq-1-2',
        category: 'Gömb térfogatának képlete',
        question: 'Egy gömb sugara r = 3 cm. Mennyi a gömb térfogata (V)?',
        figure: SphereVolume3Figure,
        options: [
          '36π ≈ 113,04 cm³',
          '12π ≈ 37,68 cm³',
          '108π cm³',
          '27π cm³'
        ],
        correctAnswer: '36π ≈ 113,04 cm³',
        correctIndex: 0,
        explanation: 'A térfogat V = (4/3) · π · r³. Mivel 3³ = 27, V = (4/3) · π · 27 = 4 · 9 · π = 36π ≈ 113,04 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = (4/3) · π · r³' },
          { label: 'Sugár köbe', value: 'r³ = 3³ = 27' },
          { label: 'Számítás', value: '(4 · 27 / 3) · π = 36π cm³' }
        ]
      },
      {
        id: 'sq-1-3',
        category: 'Főkör és felszín kapcsolata',
        question: 'Egy gömb főkörének területe 15 cm². Mennyi a teljes gömb felületének területe (felszíne)?',
        figure: GreatCircleFigure,
        options: [
          '60 cm²',
          '30 cm²',
          '45 cm²',
          '15 cm²'
        ],
        correctAnswer: '60 cm²',
        correctIndex: 0,
        explanation: 'A főkör területe Tf = r²π. A gömb felszíne A = 4r²π = 4 · Tf. Így A = 4 · 15 = 60 cm².',
        breakdown: [
          { label: 'Főkör', value: 'Tf = r²π = 15 cm²' },
          { label: 'Felszín', value: 'A = 4 · Tf' },
          { label: 'Eredmény', value: '4 · 15 = 60 cm²' }
        ]
      },
      {
        id: 'sq-1-4',
        category: 'Átmérő és főkör',
        question: 'Egy gömb átmérője d = 10 cm. Mennyi a gömb főkörének területe?',
        options: [
          '25π ≈ 78,5 cm²',
          '100π ≈ 314 cm²',
          '50π ≈ 157 cm²',
          '10π ≈ 31,4 cm²'
        ],
        correctAnswer: '25π ≈ 78,5 cm²',
        correctIndex: 0,
        explanation: 'Az átmérő fele a sugár: r = d / 2 = 10 / 2 = 5 cm. A főkör területe T = r²π = 5² · π = 25π ≈ 78,5 cm².',
        breakdown: [
          { label: 'Sugár', value: 'r = d / 2 = 5 cm' },
          { label: 'Főkör területe', value: 'Tf = 5² · π = 25π cm²' }
        ]
      },
      {
        id: 'sq-1-5',
        category: 'Gömbfelület definíciója',
        question: 'Mi a gömbfelület szabatos térgeometriai definíciója?',
        options: [
          'A tér azon pontjai, amelyek a középponttól pontosan r távolságra vannak',
          'A tér azon pontjai, amelyek a középponttól legfeljebb r távolságra vannak',
          'A tér azon pontjai, amelyek egy egyenestől r távolságra vannak',
          'Egy körlap belső pontjainak összessége'
        ],
        correctAnswer: 'A tér azon pontjai, amelyek a középponttól pontosan r távolságra vannak',
        correctIndex: 0,
        explanation: 'A gömbfelület egy zárt felület (burok), a pontjai mind egyenlő r távolságra vannak O-tól. A legfeljebb r távolságra lévők a gömbtestet alkotják.',
        breakdown: [
          { label: 'Gömbfelület', value: '|OP| = r (felületi pontok)' },
          { label: 'Gömbtest', value: '|OP| ≤ r (tömör test)' }
        ]
      },
      {
        id: 'sq-1-6',
        category: 'Egységgömb méretei',
        question: 'Mekkora az r = 1 cm sugarú gömb felszíne és térfogata?',
        options: [
          'A = 4π cm², V = (4/3)π cm³',
          'A = 2π cm², V = π cm³',
          'A = π cm², V = (1/3)π cm³',
          'A = 4 cm², V = 4/3 cm³'
        ],
        correctAnswer: 'A = 4π cm², V = (4/3)π cm³',
        correctIndex: 0,
        explanation: 'Mivel 1² = 1 és 1³ = 1: A = 4 · 1² · π = 4π cm², és V = (4/3) · 1³ · π = (4/3)π cm³.',
        breakdown: [
          { label: 'Felszín', value: 'A = 4π · 1² = 4π cm²' },
          { label: 'Térfogat', value: 'V = (4/3)π · 1³ = (4/3)π cm³' }
        ]
      },
      {
        id: 'sq-1-7',
        category: 'Főkör kerülete',
        question: 'Egy gömb főkörének kerülete K = 20π cm. Mekkora a gömb sugara (r)?',
        options: [
          'r = 10 cm',
          'r = 20 cm',
          'r = 5 cm',
          'r = 4 cm'
        ],
        correctAnswer: 'r = 10 cm',
        correctIndex: 0,
        explanation: 'A kör kerülete K = 2πr. Ha 2πr = 20π, akkor mindkét oldalt 2π-vel osztva: r = 10 cm.',
        breakdown: [
          { label: 'Kerületképlet', value: 'K = 2πr = 20π' },
          { label: 'Sugár', value: 'r = 20π / (2π) = 10 cm' }
        ]
      },
      {
        id: 'sq-1-8',
        category: 'Főkörök száma',
        question: 'Hány főkör rajzolható meg egy gömbön?',
        options: [
          'Végtelen sok',
          'Pontosan 1 darab (az Egyenlítő)',
          'Pontosan 2 darab',
          'Pontosan 3 darab egymásra merőleges'
        ],
        correctAnswer: 'Végtelen sok',
        correctIndex: 0,
        explanation: 'A gömb középpontján végtelen sok sík fektethető át tetszőleges térbeli irányban, és mindegyik síkmetszet egy-egy főkört alkot.',
        breakdown: [
          { label: 'Főkör definíció', value: 'Középponton átmenő síkmetszet' },
          { label: 'Középponti síkok száma', value: 'Végtelen sok' }
        ]
      },
      {
        id: 'sq-1-9',
        category: 'Gömb síkmetszete',
        question: 'Milyen alakú alakzat keletkezik, ha egy gömböt elmetszünk egy tetszőleges síkkal?',
        options: [
          'Mindig kör (ha a sík metszi a gömböt)',
          'Ellipszis',
          'Parabola',
          'Attól függ, milyen szögben vágjuk'
        ],
        correctAnswer: 'Mindig kör (ha a sík metszi a gömböt)',
        correctIndex: 0,
        explanation: 'A gömb tökéletes gömbszimmetriája miatt bármely metszősíkja kört metsz ki a felületből és a testből.',
        breakdown: [
          { label: 'Síkmetszet alakja', value: 'Minden irányban kör' }
        ]
      },
      {
        id: 'sq-1-10',
        category: 'Átmérő fogalma',
        question: 'Egy gömb sugara r = 6 cm. Mekkora a gömb átmérője (d)?',
        options: [
          '12 cm',
          '3 cm',
          '36 cm',
          '6 cm'
        ],
        correctAnswer: '12 cm',
        correctIndex: 0,
        explanation: 'Az átmérő a gömb két legtávolabbi pontját összekötő szakasz, amely átmegy a középponton: d = 2r = 2 · 6 = 12 cm.',
        breakdown: [
          { label: 'Képlet', value: 'd = 2r = 2 · 6 = 12 cm' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, Félgömb és Síkmetszet',
    subtitle: 'Félgömb felszín és térfogat, átmérőből liter, síkmetszet Pitagorasszal',
    range: '11 - 20. feladat',
    focus: 'Félgömb & Pitagorasz',
    questions: [
      {
        id: 'sq-2-1',
        category: 'Átmérőből térfogat (liter)',
        question: 'Egy gömb alakú labda átmérője d = 20 cm (r = 10 cm). Mennyi a térfogata literben kifejezve (π ≈ 3,14)?',
        options: [
          'kb. 4,19 liter',
          'kb. 8,38 liter',
          'kb. 12,56 liter',
          'kb. 1,25 liter'
        ],
        correctAnswer: 'kb. 4,19 liter',
        correctIndex: 0,
        explanation: 'V = (4/3) · π · r³ = (4/3) · 3,14 · 10³ = (4/3) · 3140 ≈ 4187 cm³. Mivel 1 dm³ = 1000 cm³ = 1 liter, V ≈ 4,19 liter.',
        breakdown: [
          { label: 'Sugár', value: 'r = 10 cm' },
          { label: 'Térfogat (cm³)', value: 'V ≈ 4187 cm³' },
          { label: 'Literbe váltás', value: '4187 / 1000 ≈ 4,19 liter' }
        ]
      },
      {
        id: 'sq-2-2',
        category: 'Félgömb teljes felszíne',
        question: 'Mekkora az r = 2 cm sugarú tömör félgömb TELJES felszíne (palást + sík körlap)?',
        figure: HemisphereFigure,
        options: [
          '12π ≈ 37,7 cm²',
          '8π ≈ 25,1 cm²',
          '16π ≈ 50,3 cm²',
          '4π ≈ 12,6 cm²'
        ],
        correctAnswer: '12π ≈ 37,7 cm²',
        correctIndex: 0,
        explanation: 'Tömör félgömb teljes felszíne A = 2πr² (süveg) + πr² (alaplap) = 3πr². Itt r = 2 cm: A = 3 · 2² · π = 3 · 4 · π = 12π ≈ 37,7 cm².',
        breakdown: [
          { label: 'Gömbsüveg', value: '2πr² = 2 · 4π = 8π cm²' },
          { label: 'Alapkörlap', value: 'πr² = 4π cm²' },
          { label: 'Teljes felszín', value: '8π + 4π = 12π ≈ 37,7 cm²' }
        ]
      },
      {
        id: 'sq-2-3',
        category: 'Félgömb térfogata',
        question: 'Egy r = 6 cm sugarú félgömb alakú levesestál térfogata hány cm³ (pontos értékkel)?',
        options: [
          '144π cm³',
          '288π cm³',
          '72π cm³',
          '216π cm³'
        ],
        correctAnswer: '144π cm³',
        correctIndex: 0,
        explanation: 'A félgömb térfogata V = (2/3) · π · r³. Mivel r³ = 6³ = 216, V = (2/3) · 216 · π = 2 · 72 · π = 144π cm³.',
        breakdown: [
          { label: 'Sugár köbe', value: '6³ = 216' },
          { label: 'Szorzás 2/3-dal', value: '(2 · 216 / 3) · π = 144π cm³' }
        ]
      },
      {
        id: 'sq-2-4',
        category: 'Felszínből sugár meghatározása',
        question: 'Egy gömb felszíne A = 144π cm². Mekkora a gömb sugara (r)?',
        options: [
          'r = 6 cm',
          'r = 12 cm',
          'r = 36 cm',
          'r = 4 cm'
        ],
        correctAnswer: 'r = 6 cm',
        correctIndex: 0,
        explanation: 'A = 4πr² = 144π. Osztunk 4π-vel: r² = 144 / 4 = 36. Négyzetgyököt vonva: r = 6 cm.',
        breakdown: [
          { label: 'Egyenlet', value: '4πr² = 144π' },
          { label: 'r négyzete', value: 'r² = 36' },
          { label: 'Sugár', value: 'r = √36 = 6 cm' }
        ]
      },
      {
        id: 'sq-2-5',
        category: 'Térfogatból sugár visszaszámolása',
        question: 'Egy gömb térfogata V = 288π cm³. Mekkora a gömb sugara (r)?',
        options: [
          'r = 6 cm',
          'r = 8 cm',
          'r = 12 cm',
          'r = 4 cm'
        ],
        correctAnswer: 'r = 6 cm',
        correctIndex: 0,
        explanation: 'V = (4/3)πr³ = 288π. Osztunk π-vel, szorzunk 3/4-gyel: r³ = 288 · 3 / 4 = 72 · 3 = 216. Mivel 6³ = 216, r = 6 cm.',
        breakdown: [
          { label: 'Egyenlet', value: '(4/3)πr³ = 288π' },
          { label: 'r köbe', value: 'r³ = 216' },
          { label: 'Sugár', value: 'r = ∛216 = 6 cm' }
        ]
      },
      {
        id: 'sq-2-6',
        category: 'Síkmetszet sugara (Pitagorasz)',
        question: 'Egy r = 10 cm sugarú gömböt a középponttól x = 6 cm távolságra metszünk el egy síkkal. Mekkora a kapott kiskör sugara (ρ)?',
        figure: CrossSectionPythagorasFigure,
        options: [
          '8 cm',
          '4 cm',
          '6 cm',
          '√136 cm'
        ],
        correctAnswer: '8 cm',
        correctIndex: 0,
        explanation: 'A metszet derékszögű háromszögében az átfogó a gömbsugár (r = 10), egyik befogó a távolság (x = 6), másik befogó a kiskör sugara (ρ). ρ = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.',
        breakdown: [
          { label: 'Pitagorasz-tétel', value: 'x² + ρ² = r²' },
          { label: 'Behelyettesítés', value: '6² + ρ² = 10² ⇒ 36 + ρ² = 100' },
          { label: 'Kiskör sugara', value: 'ρ = √64 = 8 cm' }
        ]
      },
      {
        id: 'sq-2-7',
        category: 'Kiskör területe',
        question: 'Egy r = 13 cm sugarú gömböt a középponttól x = 5 cm távolságra lévő sík metsz. Mekkora a keletkező metszetkör területe?',
        options: [
          '144π cm²',
          '169π cm²',
          '25π cm²',
          '120π cm²'
        ],
        correctAnswer: '144π cm²',
        correctIndex: 0,
        explanation: 'A metszetkör sugara: ρ = √(13² - 5²) = √(169 - 25) = √144 = 12 cm. A kör területe: T = ρ²π = 12² · π = 144π cm².',
        breakdown: [
          { label: 'Kiskör sugara', value: 'ρ = √(169 - 25) = 12 cm' },
          { label: 'Kör területe', value: 'T = 12² · π = 144π cm²' }
        ]
      },
      {
        id: 'sq-2-8',
        category: 'Gyakorlati feladat: Labda bőrfelülete',
        question: 'Egy hivatalos futball-labda átmérője d = 22 cm (r = 11 cm). Mennyi bőr szükséges a bevonásához (π ≈ 3,14)?',
        options: [
          'kb. 1520 cm² (≈ 0,152 m²)',
          'kb. 760 cm²',
          'kb. 3040 cm²',
          'kb. 484 cm²'
        ],
        correctAnswer: 'kb. 1520 cm² (≈ 0,152 m²)',
        correctIndex: 0,
        explanation: 'A = 4πr² = 4 · 3,14 · 11² = 4 · 3,14 · 121 ≈ 1519,76 cm² ≈ 0,152 m².',
        breakdown: [
          { label: 'Sugár négyzete', value: '11² = 121' },
          { label: 'Felszín', value: '4 · 121 · 3,14 ≈ 1520 cm²' }
        ]
      },
      {
        id: 'sq-2-9',
        category: 'Félgömb palástjából teljes felszín',
        question: 'Egy tömör félgömb görbe süvegének (palástjának) területe 50π cm². Mekkora a félgömb TELJES felszíne?',
        options: [
          '75π cm²',
          '100π cm²',
          '50π cm²',
          '125π cm²'
        ],
        correctAnswer: '75π cm²',
        correctIndex: 0,
        explanation: 'A palást területe 2πr² = 50π, tehát az alapkörlap területe ennek a fele: πr² = 25π. A teljes felszín: 50π + 25π = 75π cm².',
        breakdown: [
          { label: 'Palást', value: '2πr² = 50π cm²' },
          { label: 'Alapkörlap', value: 'πr² = 25π cm²' },
          { label: 'Teljes felszín', value: '50π + 25π = 75π cm²' }
        ]
      },
      {
        id: 'sq-2-10',
        category: 'Köré írt henger palástja',
        question: 'Mekkora az r = 4 cm sugarú gömb köré írt henger palástjának területe (a henger magassága m = 2r = 8 cm)?',
        figure: CylinderSphereRatioFigure,
        options: [
          '64π cm² (pontosan egyenlő a gömbfelszínnel)',
          '32π cm²',
          '128π cm²',
          '16π cm²'
        ],
        correctAnswer: '64π cm² (pontosan egyenlő a gömbfelszínnel)',
        correctIndex: 0,
        explanation: 'Arkhimédész tétele: a köré írt henger palástja Tp = 2πr · m = 2πr · 2r = 4πr² = A_gömb. Itt 4 · 4² · π = 64π cm².',
        breakdown: [
          { label: 'Henger palást', value: 'Tp = 2πr · (2r) = 4πr²' },
          { label: 'Gömb felszín', value: 'A = 4π · 16 = 64π cm²' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Arányok, Sűrűség és Összetett Feladatok',
    subtitle: 'Méretek skálázódása, Arkhimédész-tétel, vízkiszorítás és fizikai tömegszámítás',
    range: '21 - 30. feladat',
    focus: 'Arányok & Sűrűség',
    questions: [
      {
        id: 'sq-3-1',
        category: 'Sugár duplázásának hatása',
        question: 'Hogyan változik egy gömb felszíne és térfogata, ha a sugarát a KÉTSZERESÉRE növeljük?',
        options: [
          'A felszíne 4-szeresére (2²), a térfogata 8-szorosára (2³) nő.',
          'A felszíne és a térfogata is 2-szeresére nő.',
          'A felszíne 2-szeresére, a térfogata 4-szeresére nő.',
          'A felszíne 8-szorosára, térfogata 16-szorosára nő.'
        ],
        correctAnswer: 'A felszíne 4-szeresére (2²), a térfogata 8-szorosára (2³) nő.',
        correctIndex: 0,
        explanation: 'A hasonlóság aránya k = 2. A felületek aránya k² = 2² = 4, a térfogatok aránya pedig k³ = 2³ = 8.',
        breakdown: [
          { label: 'Hasonlóság aránya', value: 'k = 2' },
          { label: 'Felszín szorzója', value: 'k² = 4' },
          { label: 'Térfogat szorzója', value: 'k³ = 8' }
        ]
      },
      {
        id: 'sq-3-2',
        category: 'Sugár háromszorozása',
        question: 'Hogyan változik a gömb térfogata, ha a sugarát a HÁROMSZOROSÁRA növeljük?',
        options: [
          '27-szeresére nő (3³ = 27)',
          '9-szeresére nő (3² = 9)',
          '3-szorosára nő',
          '81-szeresére nő'
        ],
        correctAnswer: '27-szeresére nő (3³ = 27)',
        correctIndex: 0,
        explanation: 'Mivel a térfogat a sugár harmadik hatványával arányos, háromszoros sugár esetén a térfogat 3³ = 27-szeresére növekszik.',
        breakdown: [
          { label: 'Skálafaktor', value: 'k = 3' },
          { label: 'Térfogat arány', value: 'k³ = 3³ = 27' }
        ]
      },
      {
        id: 'sq-3-3',
        category: 'Gömbök térfogataránya',
        question: 'Két gömb sugarának aránya 1 : 2. Mennyi a térfogataik aránya?',
        options: [
          '1 : 8',
          '1 : 4',
          '1 : 2',
          '1 : 16'
        ],
        correctAnswer: '1 : 8',
        correctIndex: 0,
        explanation: 'A hasonlósági tétel szerint a térfogatok aránya a lineáris méretek arányának köbével egyenlő: (1/2)³ = 1/8.',
        breakdown: [
          { label: 'Sugarak aránya', value: 'r₁ / r₂ = 1 / 2' },
          { label: 'Térfogatok aránya', value: 'V₁ / V₂ = (1/2)³ = 1 / 8' }
        ]
      },
      {
        id: 'sq-3-4',
        category: 'Fizika: Aranygolyó tömege',
        question: 'Mekkora a tömege egy r = 3 cm sugarú tömör aranygolyónak, ha az arany sűrűsége ρ = 19,3 g/cm³ (π ≈ 3,14)?',
        options: [
          'kb. 2,18 kg (2183 g)',
          'kb. 1,09 kg',
          'kb. 4,36 kg',
          'kb. 0,55 kg'
        ],
        correctAnswer: 'kb. 2,18 kg (2183 g)',
        correctIndex: 0,
        explanation: 'V = 36π ≈ 113,04 cm³. Tömeg: m = ρ · V = 19,3 · 113,04 ≈ 2181,7 g ≈ 2,18 kg.',
        breakdown: [
          { label: 'Térfogat', value: 'V = 36π ≈ 113,04 cm³' },
          { label: 'Sűrűség', value: 'ρ = 19,3 g/cm³' },
          { label: 'Tömeg', value: 'm = ρ · V ≈ 2182 g ≈ 2,18 kg' }
        ]
      },
      {
        id: 'sq-3-5',
        category: 'Arkhimédész: Henger és gömb különbsége',
        question: 'Egy r = 5 cm sugarú gömböt egy r = 5 cm alapsugarú és m = 10 cm magasságú hengerbe zárunk. Mennyi a henger és a gömb térfogatának különbsége?',
        figure: CylinderSphereRatioFigure,
        options: [
          'kb. 262 cm³ ((250/3)π)',
          'kb. 524 cm³ ((500/3)π)',
          'kb. 785 cm³ (250π)',
          'kb. 131 cm³'
        ],
        correctAnswer: 'kb. 262 cm³ ((250/3)π)',
        correctIndex: 0,
        explanation: 'V_henger = 5² · π · 10 = 250π cm³. V_gömb = (4/3)π · 125 = (500/3)π. Különbség = 250π - 500π/3 = (250/3)π ≈ 261,8 cm³ (a henger térfogatának pontosan 1/3-a!).',
        breakdown: [
          { label: 'Henger térfogat', value: 'V_h = 250π = 750π/3' },
          { label: 'Gömb térfogat', value: 'V_g = 500π/3' },
          { label: 'Különbség', value: '250π/3 ≈ 261,8 cm³' }
        ]
      },
      {
        id: 'sq-3-6',
        category: 'Fagylaltgombócok térfogata',
        question: 'Egy kehelyben 3 darab r = 2 cm sugarú fagylaltgombóc található. Mennyi a 3 gombóc összes térfogata?',
        options: [
          '32π ≈ 100,5 cm³',
          '16π ≈ 50,3 cm³',
          '48π ≈ 150,8 cm³',
          '24π ≈ 75,4 cm³'
        ],
        correctAnswer: '32π ≈ 100,5 cm³',
        correctIndex: 0,
        explanation: 'Egy gombóc: V = (4/3)π · 2³ = 32π / 3. Három gombóc: 3 · (32π / 3) = 32π ≈ 100,53 cm³.',
        breakdown: [
          { label: '1 gombóc térfogata', value: '(4/3) · 8 · π = 32π / 3 cm³' },
          { label: '3 gombóc összesen', value: '3 · (32π / 3) = 32π ≈ 100,5 cm³' }
        ]
      },
      {
        id: 'sq-3-7',
        category: 'Félgömb kupola festése',
        question: 'Egy épület félgömb alakú kupolájának átmérője d = 12 m (r = 6 m). Hány m² külső felületet kell lefesteni (csak a gömbsüveg külső oldala)?',
        options: [
          '72π ≈ 226,2 m²',
          '144π ≈ 452,4 m²',
          '108π ≈ 339,3 m²',
          '36π ≈ 113,1 m²'
        ],
        correctAnswer: '72π ≈ 226,2 m²',
        correctIndex: 0,
        explanation: 'A kupola külső burkolata egy gömbsüveg, amelynek területe 2πr² (nem számolunk az alaplappal, hiszen az a tető alatt van). A = 2 · π · 6² = 2 · 36 · π = 72π ≈ 226,2 m².',
        breakdown: [
          { label: 'Sugár', value: 'r = 12 / 2 = 6 m' },
          { label: 'Gömbsüveg', value: '2π · 6² = 72π ≈ 226,2 m²' }
        ]
      },
      {
        id: 'sq-3-8',
        category: 'Vízkiszorítás hengeres edényben',
        question: 'Egy r = 10 cm sugarú henger alakú edénybe egy r = 5 cm sugarú fémgömböt merítünk teljesen. Hány cm-rel emelkedik meg a víz szintje?',
        options: [
          '5/3 cm ≈ 1,67 cm',
          '2,5 cm',
          '3,33 cm',
          '1,25 cm'
        ],
        correctAnswer: '5/3 cm ≈ 1,67 cm',
        correctIndex: 0,
        explanation: 'A gömb térfogata V = (4/3)π · 5³ = 500π / 3 cm³. A hengerben a kiszorított víz V = r_h²π · h = 100π · h. 100π · h = 500π / 3 ⇒ h = (500 / 300) = 5/3 ≈ 1,67 cm.',
        breakdown: [
          { label: 'Gömb térfogata', value: 'V = 500π / 3 cm³' },
          { label: 'Henger alapterülete', value: 'Ta = 10²π = 100π cm²' },
          { label: 'Vízszintemelkedés (h)', value: 'h = V / Ta = (500π/3) / (100π) = 5/3 cm' }
        ]
      },
      {
        id: 'sq-3-9',
        category: 'Felszín és térfogat aránya',
        question: 'Mennyi egy r sugarú gömb felületének és térfogatának hányadosa (A / V)?',
        options: [
          '3 / r',
          'r / 3',
          '4 / (3r)',
          '3 / (4r)'
        ],
        correctAnswer: '3 / r',
        correctIndex: 0,
        explanation: 'A / V = (4πr²) / ((4/3)πr³) = 4 / (4/3 · r) = 3 / r. Minél nagyobb a gömb sugara, annál kisebb a térfogatára jutó felület!',
        breakdown: [
          { label: 'Felszín', value: '4πr²' },
          { label: 'Térfogat', value: '(4/3)πr³' },
          { label: 'Egyszerűsítés', value: '(4πr²) / ((4/3)πr³) = 3 / r' }
        ]
      },
      {
        id: 'sq-3-10',
        category: 'Felszínből térfogatváltozás',
        question: 'Ha egy gömb felszíne 9-szeresére nőtt, akkor hányszorosára nőtt a térfogata?',
        options: [
          '27-szeresére nőtt (k = 3 ⇒ 3³ = 27)',
          '18-szorosára nőtt',
          '81-szeresére nőtt',
          '9-szeresére nőtt'
        ],
        correctAnswer: '27-szeresére nőtt (k = 3 ⇒ 3³ = 27)',
        correctIndex: 0,
        explanation: 'A felületarány k² = 9, amiből a méretarány k = √9 = 3 (a sugár 3-szorosára nőtt). A térfogatarány így k³ = 3³ = 27.',
        breakdown: [
          { label: 'Felületarány', value: 'k² = 9' },
          { label: 'Méretszorzó', value: 'k = 3' },
          { label: 'Térfogatarány', value: 'k³ = 3³ = 27' }
        ]
      }
    ]
  }
};

export const SphereQuiz: React.FC<SphereQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="A Gömb Kvíz (8. osztály)"
      subtitle="Felszín- és térfogatszámítás, főkörök, félgömb és Arkhimédész összefüggései 30 feladatban"
      badgeText="8. OSZTÁLY • VII. TESTEK • 🎯 KVÍZ"
      themeColor="blue"
      levelConfigs={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a gömb méreteit, képleteit és tulajdonságait!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapképletek és Definíciók',
              subtitle: 'Párosítsd a gömb és félgömb képleteit!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Számítások és Numerikus Értékek',
              subtitle: 'Számítások, főkör és síkmetszetek',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számítások'
            },
            3: {
              title: '3. Szint: Arányok, Sűrűség és Összetett Tételek',
              subtitle: 'Arkhimédész-tételek és hasonlósági törvények',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <SphereMatcher
              key={`sphere-matcher-${level}`}
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
          subtitle: 'Kategorizáld a képleteket, alakzatokat és dimenziókat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Felszín vs. Térfogat vs. Mindkettő',
              subtitle: 'Csoportosítsd a fogalmakat és mértékegységeket!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Gömb vs. Félgömb vs. Köré Írt Henger',
              subtitle: 'Rendszerezd az összefüggéseket a megfelelő alakzathoz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alakzatok'
            },
            3: {
              title: '3. Szint: Dimenziók és Mértékegységek',
              subtitle: 'Válogasd szét 1D, 2D és 3D szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Dimenziók'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <SphereSorter
              key={`sphere-sorter-${level}`}
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
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={SphereMatcher}
      sorterComponent={SphereSorter}
    />
  );
};

export default SphereQuiz;
