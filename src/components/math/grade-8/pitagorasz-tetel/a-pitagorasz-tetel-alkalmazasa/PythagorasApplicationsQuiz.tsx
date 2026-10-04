import React from 'react';
import {
  QuizTemplate,
  LevelConfig,
  CheatSheetCard
} from '../QuizTemplate';
import {
  Shapes,
  Maximize2,
  Triangle,
  Award,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { PythagorasApplicationsMatcher } from './PythagorasApplicationsMatcher';
import { PythagorasApplicationsSorter } from './PythagorasApplicationsSorter';

interface PythagorasApplicationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Négyzet és Téglalap Átlója',
    badge: 'Négyszögek',
    badgeColor: 'emerald',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
          <strong>Téglalap:</strong> d² = a² + b² ⟹ <strong>d = √(a² + b²)</strong>
        </div>
        <div className="p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200">
          <strong>Négyzet:</strong> d² = 2a² ⟹ <strong>d = a · √2</strong> (≈ 1,414 · a)<br />
          <em>Oldal az átlóból:</em> a = d / √2 = (d · √2) / 2
        </div>
      </div>
    )
  },
  {
    title: 'Háromszögek Magassága',
    badge: 'Háromszögek',
    badgeColor: 'sky',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200">
          <strong>Egyenlő szárú:</strong> a magasság felezi az alapot:<br />
          m² + (a/2)² = b² ⟹ <strong>m = √(b² - (a/2)²)</strong><br />
          T = (a · m) / 2
        </div>
        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
          <strong>Szabályos:</strong> m = <strong>(a · √3) / 2</strong> (≈ 0,866 · a)<br />
          T = <strong>(a² · √3) / 4</strong> (≈ 0,433 · a²)
        </div>
      </div>
    )
  },
  {
    title: 'Rombusz és Trapéz',
    badge: 'Sokszögek',
    badgeColor: 'amber',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
          <strong>Rombusz:</strong> átlók merőlegesen feleződnek:<br />
          (e/2)² + (f/2)² = a² ⟹ <strong>a = √((e/2)² + (f/2)²)</strong><br />
          T = (e · f) / 2
        </div>
        <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
          <strong>Szimmetrikus trapéz:</strong> x = (a - c) / 2<br />
          m² + x² = b² ⟹ <strong>m = √(b² - x²)</strong><br />
          T = ((a + c) / 2) · m
        </div>
      </div>
    )
  },
  {
    title: 'Kör és Gyakorlati Élet',
    badge: 'Alkalmazások',
    badgeColor: 'rose',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
          <strong>Kör érintője:</strong> sugár merőleges az érintőre:<br />
          e² + r² = d² ⟹ <strong>e = √(d² - r²)</strong>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
          <strong>Létra / Képernyő:</strong> a létra hossza vagy a képátló mindig az <em>átfogó (c)</em>!
        </div>
      </div>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Síkidomok Alapvető Számításai',
    subtitle: '10 alapfeladat a négyzet, téglalap, egyenlő szárú és szabályos háromszög méreteiről',
    badgeText: '1. Szint • Kezdő',
    badgeColor: 'emerald',
    icon: <Maximize2 className="w-4 h-4 text-emerald-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'Téglalap átlójának alapképlete',
        question: 'Egy téglalap oldalai a = 3 cm és b = 4 cm. Milyen hosszú a téglalap átlója (d)?',
        options: [
          '5 cm',
          '7 cm',
          '6 cm',
          '4,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'd = √(a² + b²) = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.'
      },
      {
        id: 'q1-2',
        title: 'Téglalap átlója nagyobb méretekkel',
        question: 'Egy téglalap alakú kiskert oldalai a = 6 m és b = 8 m. Mekkora az átló hossza?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="25" y="15" width="110" height="50" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="65" x2="135" y2="15" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">6 m</text>
            <text x="143" y="42" className="text-[8px] font-bold fill-slate-700">8 m</text>
            <text x="75" y="36" textAnchor="middle" className="text-[8.5px] font-bold fill-emerald-700">d = ?</text>
          </svg>
        ),
        options: [
          '10 m',
          '14 m',
          '12 m',
          '9 m'
        ],
        correctAnswer: 0,
        explanation: 'd = √(6² + 8²) = √(36 + 64) = √100 = 10 m.'
      },
      {
        id: 'q1-3',
        title: 'Négyzet átlójának közvetlen képlete',
        question: 'Ha egy négyzet oldala a, hogyan fejezhető ki az átlója (d) közvetlenül?',
        options: [
          'd = a · √2',
          'd = a · 2',
          'd = a · √3',
          'd = a² / 2'
        ],
        correctAnswer: 0,
        explanation: 'd² = a² + a² = 2a², amiből négyzetgyökvonással d = a · √2 adódik.'
      },
      {
        id: 'q1-4',
        title: 'Négyzet átlójának konkrét értéke',
        question: 'Egy négyzet oldala a = 10 cm. Mennyi az átló pontos értéke?',
        options: [
          '10√2 cm (kb. 14,14 cm)',
          '20 cm',
          '100 cm',
          '15 cm'
        ],
        correctAnswer: 0,
        explanation: 'd = a · √2 = 10 · √2 ≈ 14,14 cm.'
      },
      {
        id: 'q1-5',
        title: 'Egyenlő szárú háromszög magassága',
        question: 'Egy egyenlő szárú háromszög alapja a = 12 cm, szárai b = 10 cm hosszúak. Mekkora az alaphoz tartozó magasság (m)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,68 130,68 80,18" fill="#f8fafc" stroke="#475569" strokeWidth="1.6" />
            <line x1="80" y1="18" x2="80" y2="68" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="80" y="77" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 12 cm</text>
            <text x="115" y="40" className="text-[8px] font-bold fill-slate-700">b = 10</text>
            <text x="73" y="44" textAnchor="end" className="text-[8.5px] font-bold fill-rose-600">m = ?</text>
          </svg>
        ),
        options: [
          '8 cm',
          '6 cm',
          '9 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        explanation: 'A magasság felezi az alapot: a/2 = 6 cm. m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q1-6',
        title: 'Szabályos háromszög magasságképlete',
        question: 'Mekkora az a oldalú szabályos (egyenlő oldalú) háromszög magassága?',
        options: [
          'm = (a · √3) / 2',
          'm = a / 2',
          'm = a · √2',
          'm = (a · 3) / 2'
        ],
        correctAnswer: 0,
        explanation: 'm² + (a/2)² = a² ⟹ m² = a² - a²/4 = 3a²/4 ⟹ m = (a · √3) / 2.'
      },
      {
        id: 'q1-7',
        title: 'Szabályos háromszög magassága számmal',
        question: 'Egy 6 cm oldalú szabályos háromszög magassága pontosan:',
        options: [
          '3√3 cm (kb. 5,2 cm)',
          '3 cm',
          '6 cm',
          '3√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'm = (6 · √3) / 2 = 3√3 cm ≈ 5,196 cm.'
      },
      {
        id: 'q1-8',
        title: 'Rombusz oldala átlókból',
        question: 'Egy rombusz átlói e = 16 cm és f = 12 cm. Milyen hosszú a rombusz oldala (a)?',
        options: [
          '10 cm',
          '14 cm',
          '20 cm',
          '8 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az átlók felei a befogók: 8 cm és 6 cm. a = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.'
      },
      {
        id: 'q1-9',
        title: 'Szimmetrikus trapéz kis befogója',
        question: 'Szimmetrikus trapézban az alapok a és c (a > c). Mekkora a szár alatti kis levágott derékszögű háromszög vízszintes befogója (x)?',
        options: [
          'x = (a - c) / 2',
          'x = a - c',
          'x = (a + c) / 2',
          'x = a / 2'
        ],
        correctAnswer: 0,
        explanation: 'A két szélén lévő egybevágó derékszögű háromszög vízszintes befogóinak összege a - c, így egyenként x = (a - c) / 2.'
      },
      {
        id: 'q1-10',
        title: 'Kör érintője és sugara közötti szög',
        question: 'Mekkora szöget zár be a kör érintője az érintési pontba húzott sugárral?',
        options: [
          'Pontosan 90°-ot (merőlegesek)',
          '45°-ot',
          '60°-ot',
          'Attól függ, mekkora a sugár'
        ],
        correctAnswer: 0,
        explanation: 'A geometria alaptétele szerint a kör érintője szigorúan merőleges (90°) az érintési pontba mutató sugárra.'
      }
    ]
  },
  2: {
    title: '2. Szint: Összetett Geometriai Számítások',
    subtitle: '10 mélyebb feladat területekről, szimmetrikus trapézról, kör érintőjéről és húrjáról',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'sky',
    icon: <Shapes className="w-4 h-4 text-sky-600" />,
    questions: [
      {
        id: 'q2-1',
        title: 'Négyzet oldala adott átlóból',
        question: 'Egy négyzet átlója d = 8√2 cm. Mekkora a négyzet oldala és a területe?',
        options: [
          'a = 8 cm és T = 64 cm²',
          'a = 16 cm és T = 256 cm²',
          'a = 4 cm és T = 16 cm²',
          'a = 8√2 cm és T = 128 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel d = a·√2, ezért a = 8 cm. Területe T = a² = 64 cm² (vagy d²/2 = 128/2 = 64 cm²).'
      },
      {
        id: 'q2-2',
        title: 'Szabályos háromszög területe',
        question: 'Egy szabályos háromszög oldala a = 4 cm. Mekkora a területe?',
        options: [
          '4√3 cm² (kb. 6,93 cm²)',
          '8 cm²',
          '8√3 cm²',
          '16 cm²'
        ],
        correctAnswer: 0,
        explanation: 'T = (a² · √3) / 4 = (16 · √3) / 4 = 4√3 cm² ≈ 6,93 cm².'
      },
      {
        id: 'q2-3',
        title: 'Szimmetrikus trapéz magassága',
        question: 'Egy szimmetrikus trapéz párhuzamos alapjai a = 20 cm és c = 8 cm, szárai b = 10 cm. Mekkora a trapéz magassága (m)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="20,68 140,68 115,22 45,22" fill="#f8fafc" stroke="#475569" strokeWidth="1.6" />
            <line x1="115" y1="22" x2="115" y2="68" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="80" y="18" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c = 8</text>
            <text x="80" y="77" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 20</text>
            <text x="135" y="44" className="text-[8px] font-bold fill-slate-700">b = 10</text>
            <text x="110" y="45" textAnchor="end" className="text-[8.5px] font-bold fill-rose-600">m = ?</text>
          </svg>
        ),
        options: [
          '8 cm',
          '6 cm',
          '9 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: 'x = (20 - 8) / 2 = 6 cm. m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q2-4',
        title: 'Egyenlő szárú háromszög területe',
        question: 'Egy egyenlő szárú háromszög alapja a = 16 cm, szárai b = 10 cm hosszúak. Mekkora a háromszög területe?',
        options: [
          '48 cm²',
          '80 cm²',
          '96 cm²',
          '60 cm²'
        ],
        correctAnswer: 0,
        explanation: 'a/2 = 8 cm. m = √(10² - 8²) = √(100 - 64) = 6 cm. T = (16 · 6) / 2 = 48 cm².'
      },
      {
        id: 'q2-5',
        title: 'Rombusz területe és oldala',
        question: 'Egy rombusz átlói e = 24 cm és f = 10 cm. Mekkora az oldala és a területe?',
        options: [
          'a = 13 cm és T = 120 cm²',
          'a = 15 cm és T = 240 cm²',
          'a = 12 cm és T = 100 cm²',
          'a = 14 cm és T = 120 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Befogók: 12 és 5 cm. a = √(12² + 5²) = √169 = 13 cm. T = (24 · 10) / 2 = 120 cm².'
      },
      {
        id: 'q2-6',
        title: 'Kör érintőszakaszának hossza',
        question: 'Egy r = 6 cm sugarú kör középpontjától egy P pont d = 10 cm távolságra van. Milyen hosszú a P-ből a körhöz húzott érintőszakasz (e)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <circle cx="50" cy="45" r="28" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <circle cx="50" cy="45" r="2" fill="#047857" />
            <circle cx="135" cy="45" r="2" fill="#1e40af" />
            <line x1="50" y1="45" x2="68" y2="23" stroke="#047857" strokeWidth="1.5" />
            <line x1="135" y1="45" x2="68" y2="23" stroke="#dc2626" strokeWidth="1.6" />
            <line x1="50" y1="45" x2="135" y2="45" stroke="#1e40af" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="52" y="32" className="text-[7.5px] font-bold fill-emerald-800">r = 6</text>
            <text x="105" y="30" className="text-[8.5px] font-bold fill-rose-600">e = ?</text>
            <text x="92" y="55" className="text-[7.5px] font-bold fill-blue-800">d = 10</text>
          </svg>
        ),
        options: [
          '8 cm',
          '4 cm',
          '11,6 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az érintési pontban lévő derékszög miatt e² + r² = d² ⟹ e = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'q2-7',
        title: 'Kör húrjának távolsága a középponttól',
        question: 'Egy r = 10 cm sugarú körben egy húr hossza h = 16 cm. Milyen távol van a húr a kör középpontjától (t)?',
        options: [
          '6 cm',
          '8 cm',
          '4 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        explanation: 'A középpontból a húrra bocsátott merőleges felezi a húrt (h/2 = 8 cm). t = √(10² - 8²) = √(100 - 64) = √36 = 6 cm.'
      },
      {
        id: 'q2-8',
        title: 'Szabályos háromszög területe 10 cm oldalból',
        question: 'Egy 10 cm oldalú szabályos háromszög területe pontosan:',
        options: [
          '25√3 cm² (kb. 43,3 cm²)',
          '50 cm²',
          '50√3 cm²',
          '25 cm²'
        ],
        correctAnswer: 0,
        explanation: 'T = (10² · √3) / 4 = (100 · √3) / 4 = 25√3 cm² ≈ 43,3 cm².'
      },
      {
        id: 'q2-9',
        title: 'Négyzet területe közvetlenül az átlóból',
        question: 'Egy négyzet átlója d = 12 cm. Mekkora a területe a befogók külön kiszámítása nélkül?',
        options: [
          '72 cm² (T = d² / 2)',
          '144 cm²',
          '36 cm²',
          '24 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel d² = 2a², ezért T = a² = d² / 2 = 144 / 2 = 72 cm².'
      },
      {
        id: 'q2-10',
        title: 'Szimmetrikus trapéz területe',
        question: 'Egy szimmetrikus trapéz alapjai a = 16 cm és c = 6 cm, szárai b = 13 cm. Mekkora a trapéz területe?',
        options: [
          '132 cm²',
          '143 cm²',
          '110 cm²',
          '66 cm²'
        ],
        correctAnswer: 0,
        explanation: 'x = (16 - 6) / 2 = 5 cm. m = √(13² - 5²) = √(169 - 25) = √144 = 12 cm. T = ((16 + 6) / 2) · 12 = 11 · 12 = 132 cm².'
      }
    ]
  },
  3: {
    title: '3. Szint: Szöveges és Életszerű Gyakorlati Feladatok',
    subtitle: '10 valósághű mérési, építési és fizikai probléma a Pitagorasz-tétel segítségével',
    badgeText: '3. Szint • Mester',
    badgeColor: 'amber',
    icon: <Award className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Létra a ház falánál',
        question: 'Egy 5 méter hosszú létrát támasztunk a függőleges falnak úgy, hogy a létra alja 3 méterre van a faltól. Milyen magasra ér fel a létra teteje?',
        options: [
          '4 méter',
          '4,5 méter',
          '3,5 méter',
          '2 méter'
        ],
        correctAnswer: 0,
        explanation: 'A létra az átfogó (c = 5 m). m = √(5² - 3²) = √(25 - 9) = √16 = 4 méter.'
      },
      {
        id: 'q3-2',
        title: 'Televízió képernyőjének képátlója',
        question: 'Egy televízió képernyője 80 cm széles és 60 cm magas. Mekkora a képernyő átlója centiméterben?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="25" y="15" width="110" height="50" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <line x1="25" y1="65" x2="135" y2="15" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">80 cm</text>
            <text x="144" y="42" className="text-[8px] font-bold fill-slate-700">60 cm</text>
            <text x="75" y="36" textAnchor="middle" className="text-[8.5px] font-bold fill-emerald-600">d = ?</text>
          </svg>
        ),
        options: [
          '100 cm (kb. 39,4 hüvelyk)',
          '140 cm',
          '120 cm',
          '90 cm'
        ],
        correctAnswer: 0,
        explanation: 'd = √(80² + 60²) = √(6400 + 3600) = √10000 = 100 cm.'
      },
      {
        id: 'q3-3',
        title: 'Antennatorony kikötőkábele',
        question: 'Egy 24 méter magas függőleges adótorony tetejétől egy egyenes acélsodronyt feszítenek ki a talajhoz úgy, hogy a rögzítési pont 7 méterre van a torony talpától. Milyen hosszú a sodrony?',
        options: [
          '25 méter',
          '31 méter',
          '26 méter',
          '24,5 méter'
        ],
        correctAnswer: 0,
        explanation: 'c = √(24² + 7²) = √(576 + 49) = √625 = 25 méter.'
      },
      {
        id: 'q3-4',
        title: 'Akadálymentes rámpa vízszintes hossza',
        question: 'Egy akadálymentes rámpa ferde futófelülete 13 méter hosszú, és 5 méter szintkülönbséget hidal át. Mekkora a rámpa vízszintes kiterjedése a talajon?',
        options: [
          '12 méter',
          '14 méter',
          '10 méter',
          '8 méter'
        ],
        correctAnswer: 0,
        explanation: 'b = √(13² - 5²) = √(169 - 25) = √144 = 12 méter.'
      },
      {
        id: 'q3-5',
        title: 'Pálca elhelyezése doboz alján',
        question: 'Egy téglalap alapú doboz aljának méretei a = 40 cm és b = 30 cm. Legfeljebb milyen hosszú egyenes pálca fér el a doboz aljára fektetve?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="25" y="15" width="110" height="50" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <line x1="25" y1="65" x2="135" y2="15" stroke="#d97706" strokeWidth="2.2" />
            <text x="80" y="76" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">40 cm</text>
            <text x="144" y="42" className="text-[8px] font-bold fill-slate-700">30 cm</text>
            <text x="75" y="36" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-700">d = ?</text>
          </svg>
        ),
        options: [
          '50 cm (az alj átlója mentén)',
          '70 cm',
          '40 cm',
          '45 cm'
        ],
        correctAnswer: 0,
        explanation: 'A leghosszabb szakasz az alapon az átló: d = √(40² + 30²) = √(1600 + 900) = √2500 = 50 cm.'
      },
      {
        id: 'q3-6',
        title: 'Két gyalogos távolsága egymástól',
        question: 'Két gyalogos egy kereszteződésből egyszerre indul el egymásra merőleges utcákon. Az egyik 6 km/h, a másik 8 km/h sebességgel halad. Milyen távol lesznek egymástól 1 óra múlva légvonalban?',
        options: [
          '10 km',
          '14 km',
          '12 km',
          '8 km'
        ],
        correctAnswer: 0,
        explanation: '1 óra alatt megtett útjaik 6 km és 8 km, melyek derékszöget zárnak be. d = √(6² + 8²) = √100 = 10 km.'
      },
      {
        id: 'q3-7',
        title: 'Két kör külső érintőszakasza',
        question: 'Két egymást kívülről nem metsző kör sugarai R = 8 cm és r = 3 cm. Középpontjaik távolsága d = 13 cm. Milyen hosszú a közös külső érintőszakaszuk?',
        options: [
          '12 cm',
          '10 cm',
          '11 cm',
          '13 cm'
        ],
        correctAnswer: 0,
        explanation: 'A kisebb kör középpontjából párhuzamost húzva egy derékszögű háromszög keletkezik, melynek átfogója d = 13 cm, egyik befogója R - r = 8 - 3 = 5 cm. Az érintő hossza a másik befogó: √(13² - 5²) = √144 = 12 cm.'
      },
      {
        id: 'q3-8',
        title: 'Tetőszerkezet szarufájának hossza',
        question: 'Egy szimmetrikus nyeregtető épületének szélessége 12 méter. A tető gerincmagassága a padlásszint felett 8 méter. Milyen hosszú egy-egy szarufa a túlnyúlás nélkül?',
        options: [
          '10 méter',
          '12 méter',
          '14 méter',
          '9 méter'
        ],
        correctAnswer: 0,
        explanation: 'A tető szimmetrikus, így a vízszintes befogó az épület szélességének a fele: 12 / 2 = 6 méter. A szarufa az átfogó: c = √(8² + 6²) = √(64 + 36) = √100 = 10 méter.'
      },
      {
        id: 'q3-9',
        title: 'Rombusz alakú térkövezett udvar területe',
        question: 'Egy rombusz alakú kerti pihenő átlói mentén kimért távolságok 8 méter és 6 méter. Hány négyzetméter térkő szükséges a lefedéséhez?',
        options: [
          '24 m²',
          '48 m²',
          '20 m²',
          '25 m²'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz területe: T = (e · f) / 2 = (8 · 6) / 2 = 48 / 2 = 24 m².'
      },
      {
        id: 'q3-10',
        title: 'Viharban derékba tört fa magassága',
        question: 'Egy fa a viharban a talajtól 3 méter magasságban kettétört úgy, hogy a törzse még éppen összekapcsolódik, de a csúcsa a fa tövétől 4 méterre érte el a földet. Milyen magas volt a fa eredetileg?',
        options: [
          '8 méter (3 m + 5 m)',
          '7 méter',
          '9 méter',
          '5 méter'
        ],
        correctAnswer: 0,
        explanation: 'A ledőlt felső rész egy derékszögű háromszög átfogója: c = √(3² + 4²) = √25 = 5 méter. Az eredeti famagasság az állva maradt csonk és a ledőlt rész összege: 3 + 5 = 8 méter.'
      }
    ]
  }
};

export const PythagorasApplicationsQuiz: React.FC<PythagorasApplicationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A Pitagorasz-tétel Alkalmazásai Kvíz"
      subtitle="Négyzet, téglalap, háromszögek, rombusz, trapéz, kör és valós életszerű feladatok"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🔷 4. Lecke • Alkalmazások"
      topicTitle="A Pitagorasz-tétel alkalmazása"
      topicId="g8-pyth-applications"
      chapterId="pitagorasz-tetel"
      grade={8}
      documentId="pythagoras-applications-quiz-doc"
      pdfFilename="8_osztaly_pitagorasz_alkalmazasai_kviz.pdf"
      emoji="🔷"
      cheatSheetTitle="Síkbeli Képletek és Alkalmazási Segédlet"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az alakzatok adatait a kiszámított eredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Négyzetek és Téglalapok Átlói',
              subtitle: 'Párosítsd a négyszögek oldalait az átlóikkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Átlók'
            },
            2: {
              title: '2. Szint: Háromszögek Magassága és Területe',
              subtitle: 'Kösd össze a háromszögek adatait a magasságukkal vagy területükkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Háromszög méretek'
            },
            3: {
              title: '3. Szint: Rombusz, Trapéz és Gyakorlati Számítások',
              subtitle: 'Párosítsd a sokoldalú síkidomokat és hétköznapi problémákat a megoldással!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Összetett alkalmazások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <PythagorasApplicationsMatcher
              key={`pa-matcher-${level}`}
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
          subtitle: 'Kategorizáld a képleteket, kiszámított méreteket és geometriai összefüggéseket!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Képletek és Alakzatok Besorolása',
              subtitle: 'Sorold be: Négyzet és Téglalap / Háromszögek / Rombusz és Trapéz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alakzatok'
            },
            2: {
              title: '2. Szint: Számított Méretek Nagysága',
              subtitle: 'Döntsd el fejben: Kisebb mint 10 cm / Pontosan 10 cm / Nagyobb mint 10 cm!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Méretek becslése'
            },
            3: {
              title: '3. Szint: Geometriai Állítások Igazságtartalma',
              subtitle: 'Csoportosítsd: Mindig igaz / Csak szimmetrikusra igaz / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Állítások igazsága'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <PythagorasApplicationsSorter
              key={`pa-sorter-${level}`}
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

export default PythagorasApplicationsQuiz;
