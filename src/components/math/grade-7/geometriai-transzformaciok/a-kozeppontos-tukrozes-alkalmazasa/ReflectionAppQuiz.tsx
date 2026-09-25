import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ReflectionAppMatcher } from './ReflectionAppMatcher';
import { ReflectionAppSorter } from './ReflectionAppSorter';
import {
  Target,
  RotateCw,
  Sparkles,
  Compass,
  MoveHorizontal,
  RefreshCw,
  Shapes,
  Maximize2
} from 'lucide-react';

interface ReflectionAppQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Háromszög Középvonal-tétele',
    icon: <Target className="w-4 h-4 text-sky-600" />,
    formula: 'k ∥ c  és  k = c / 2',
    note: 'A háromszög két oldalának felezőpontját összekötő szakasz párhuzamos a harmadik oldallal és feleakkora hosszúságú.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,40 140,40 80,10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="25" x2="110" y2="25" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="50" cy="25" r="2.5" fill="#0284c7" />
        <circle cx="110" cy="25" r="2.5" fill="#0284c7" />
        <text x="73" y="21" className="text-[8px] font-bold fill-sky-700">k = c/2</text>
        <text x="74" y="47" className="text-[8px] font-bold fill-slate-600">c</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: '4 Egybevágó Kis Háromszög',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'T_kis = T / 4  és  K_kis = K / 2',
    note: 'A három középvonal 4 darab egymással egybevágó kis háromszögre bontja az eredetit.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,42 140,42 80,8" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="50,25 110,25 80,42" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
        <text x="74" y="34" className="text-[8px] font-bold fill-emerald-800">T/4</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Paralelogramma Átlói',
    icon: <MoveHorizontal className="w-4 h-4 text-blue-600" />,
    formula: 'Átlók felezik egymást ⟺ Paralelogramma',
    note: 'Egy négyszög akkor és csak akkor paralelogramma, ha az átlói kölcsönösen felezik egymást az O metszéspontban.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="30,38 70,12 140,12 100,38" fill="none" stroke="#2563eb" strokeWidth="1.8" />
        <line x1="30" y1="38" x2="140" y2="12" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
        <line x1="70" y1="12" x2="100" y2="38" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
        <circle cx="85" cy="25" r="3" fill="#f59e0b" />
        <text x="88" y="24" className="text-[8px] font-bold fill-amber-700">O</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Szakaszfelezőre Tükrözés (APBP\')',
    icon: <RotateCw className="w-4 h-4 text-teal-600" />,
    formula: 'F felezi AB-t és PP\'-t ⇒ APBP\' paralelogramma',
    note: 'Ha bármely P pontot tükrözünk az AB szakasz F felezőpontjára, az APBP\' négyszög mindig paralelogramma.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="30,35 80,10 130,20 80,45" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="30" y1="35" x2="130" y2="20" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
        <line x1="80" y1="10" x2="80" y2="45" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
        <circle cx="80" cy="27.5" r="2.5" fill="#f59e0b" />
        <text x="83" y="30" className="text-[7px] font-bold fill-amber-700">F</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Trapéz Középvonala',
    icon: <RefreshCw className="w-4 h-4 text-indigo-600" />,
    formula: 'k = (a + c) / 2',
    note: 'A trapéz szárainak felezőpontját összekötő középvonal a két párhuzamos alap számtani közepe.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,40 140,40 110,12 50,12" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="35" y1="26" x2="125" y2="26" stroke="#f59e0b" strokeWidth="2" />
        <text x="73" y="23" className="text-[7.5px] font-bold fill-amber-700">k=(a+c)/2</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Súlyvonal és Súlypont',
    icon: <Compass className="w-4 h-4 text-rose-600" />,
    formula: 'S 2:1 arányban oszt (csúcstól mérve)',
    note: 'A súlyvonal csúcsból a szemközti oldal felezőjébe tart. A 3 súlyvonal az S súlypontban metszi egymást.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,40 140,40 90,10" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="90" y1="10" x2="80" y2="40" stroke="#e11d48" strokeWidth="1.8" />
        <circle cx="83.3" cy="30" r="2.5" fill="#e11d48" />
        <text x="88" y="32" className="text-[7.5px] font-bold fill-rose-700">S (2:1)</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szakaszfelezők',
    subtitle: 'Középvonal definíciója, hossza, 4 kis háromszög és szakaszfelező tükrözés',
    range: '1–10. kérdés',
    focus: 'A háromszög középvonalának és szakaszfelezőinek alapösszefüggései',
    color: 'sky',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeBorder: 'border-sky-300 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-300',
    questions: [
      {
        id: 1,
        question: 'Mi a háromszög középvonala a síkban?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,42 130,42 80,10" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="55" y1="26" x2="105" y2="26" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="55" cy="26" r="3" fill="#0284c7" />
            <circle cx="105" cy="26" r="3" fill="#0284c7" />
            <text x="73" y="22" className="text-[8px] font-bold fill-sky-800">k</text>
          </svg>
        ),
        options: [
          'A háromszög két oldalának felezőpontját összekötő szakasz',
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'A csúcsból az oldalra bocsátott merőleges szakasz',
          'A háromszög belső szögét felező félegyenes'
        ],
        correctAnswer: 0,
        explanation: 'A definíció szerint a középvonal a háromszög tetszőleges két oldalának felezőpontját összekötő szakasz.'
      },
      {
        id: 2,
        question: 'Hogyan viszonyul a háromszög középvonala a harmadik oldalhoz?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="45" y1="18" x2="115" y2="18" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="36" x2="140" y2="36" stroke="#16a34a" strokeWidth="2" />
            <text x="72" y="14" className="text-[8px] font-bold fill-sky-700">k = c/2</text>
            <text x="75" y="46" className="text-[8px] font-bold fill-emerald-700">c</text>
          </svg>
        ),
        options: [
          'Párhuzamos vele, és hossza pontosan annak a fele (k ∥ c és k = c/2)',
          'Merőleges rá, és hossza megegyezik vele',
          'Párhuzamos vele, de kétszer olyan hosszú',
          'Metszi azt a súlypontban'
        ],
        correctAnswer: 0,
        explanation: 'A középvonal-tétel kimondja: a középvonal párhuzamos a harmadik oldallal ($k \\parallel c$), és hossza annak fele ($k = c/2$).'
      },
      {
        id: 3,
        question: 'Hány darab középvonala van egy háromszögnek?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,42 130,42 80,10" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="55" y1="26" x2="105" y2="26" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="55" y1="26" x2="80" y2="42" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="105" y1="26" x2="80" y2="42" stroke="#0284c7" strokeWidth="1.8" />
            <text x="75" y="32" className="text-[7.5px] font-bold fill-sky-800">3 db</text>
          </svg>
        ),
        options: [
          'Pontosan 3 darab (minden oldalpárhoz egy-egy)',
          'Csak 1 darab',
          '2 darab',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a háromszögnek 3 oldala és így 3 oldalfelező pontja van, ezekből páronként pontosan 3 darab középvonal húzható.'
      },
      {
        id: 4,
        question: 'Egy háromszög alapja c = 14 cm. Milyen hosszú az ezzel párhuzamos középvonal (k)?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="50" y1="18" x2="110" y2="18" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="20" y1="36" x2="140" y2="36" stroke="#16a34a" strokeWidth="2.5" />
            <text x="70" y="14" className="text-[8px] font-bold fill-sky-700">k = ?</text>
            <text x="68" y="46" className="text-[8px] font-bold fill-emerald-700">c = 14 cm</text>
          </svg>
        ),
        options: [
          '7 cm, mert k = c / 2 = 14 / 2 = 7 cm',
          '14 cm',
          '28 cm',
          '4.67 cm'
        ],
        correctAnswer: 0,
        explanation: '$k = \\frac{c}{2} = \\frac{14}{2} = 7\\text{ cm}$.'
      },
      {
        id: 5,
        question: 'Ha egy AB szakaszt a saját F felezőpontjára tükrözünk, mi lesz az A végpont képe?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="20" cy="25" r="3.5" fill="#0284c7" />
            <circle cx="80" cy="25" r="4" fill="#f59e0b" />
            <circle cx="140" cy="25" r="3.5" fill="#0d9488" />
            <path d="M 25 18 C 50 8, 110 8, 135 18" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="135,18 130,13 131,21" fill="#0284c7" />
            <text x="16" y="38" className="text-[8px] font-bold fill-sky-700">A</text>
            <text x="77" y="38" className="text-[8px] font-bold fill-amber-700">F</text>
            <text x="136" y="38" className="text-[8px] font-bold fill-teal-700">B</text>
          </svg>
        ),
        options: [
          'A B végpont (A\' = B és B\' = A)',
          'Önmaga: A\' = A',
          'Az F felezőpont',
          'A sík végtelen távoli pontja'
        ],
        correctAnswer: 0,
        explanation: 'Mivel $F$ felezi az $AB$ szakaszt, $|FA| = |FB|$, és a pontok egy egyenesen vannak, így $A$ tükörképe pontosan $B$.'
      },
      {
        id: 6,
        question: 'A háromszög mindhárom középvonalát behúzva hány darab kis háromszöget kapunk, és milyenek ezek?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,44 135,44 80,8" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="52.5,26 107.5,26 80,44" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="73" y="33" className="text-[8px] font-bold fill-sky-800">4 db ≅</text>
          </svg>
        ),
        options: [
          '4 darab egymással egybevágó kis háromszöget',
          '3 darab egyenlő szárú háromszöget',
          '6 darab derékszögű háromszöget',
          '2 darab trapézt'
        ],
        correctAnswer: 0,
        explanation: 'A 3 középvonal 4 darab egymással páronként egybevágó kis háromszögre osztja fel a kiindulási háromszöget.'
      },
      {
        id: 7,
        question: 'Egy háromszög területe T = 40 cm². Mennyi a középvonalai által határolt belső kis háromszög területe?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,44 135,44 80,8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
            <polygon points="52.5,26 107.5,26 80,44" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <text x="70" y="34" className="text-[7.5px] font-bold fill-sky-900">T' = ?</text>
            <text x="70" y="18" className="text-[7px] font-bold fill-slate-500">T=40</text>
          </svg>
        ),
        options: [
          '10 cm², mert T_kis = T / 4 = 40 / 4 = 10 cm²',
          '20 cm²',
          '13.3 cm²',
          '5 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A 4 egybevágó rész miatt a belső kis háromszög területe az eredeti negyede: $T_{\\text{kis}} = \\frac{40}{4} = 10\\text{ cm}^2$.'
      },
      {
        id: 8,
        question: 'Egy trapéz párhuzamos alapjai a = 12 cm és c = 8 cm. Mennyi a trapéz középvonalának (k) hossza?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="20,40 140,40 110,12 50,12" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="35" y1="26" x2="125" y2="26" stroke="#f59e0b" strokeWidth="2" />
            <text x="70" y="10" className="text-[7px] font-bold fill-indigo-700">c = 8</text>
            <text x="70" y="24" className="text-[7px] font-bold fill-amber-700">k = ?</text>
            <text x="70" y="47" className="text-[7px] font-bold fill-indigo-700">a = 12</text>
          </svg>
        ),
        options: [
          '10 cm, mert k = (12 + 8) / 2 = 20 / 2 = 10 cm',
          '4 cm',
          '20 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        explanation: 'A trapéz középvonala az alapok számtani közepe: $k = \\frac{a+c}{2} = \\frac{12+8}{2} = 10\\text{ cm}$.'
      },
      {
        id: 9,
        question: 'Miben különbözik alapvetően a középvonal a súlyvonaltól a háromszögben?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,42 135,42 80,10" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="52.5" y1="26" x2="107.5" y2="26" stroke="#0284c7" strokeWidth="2" />
            <line x1="80" y1="10" x2="80" y2="42" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
            <text x="65" y="23" className="text-[6.5px] font-bold fill-sky-700">középvonal</text>
            <text x="83" y="32" className="text-[6.5px] font-bold fill-rose-600">súlyvonal</text>
          </svg>
        ),
        options: [
          'A középvonal két oldalfelezőt köt össze, a súlyvonal csúcsból indul a szemközti oldalfelezőbe',
          'A középvonal mindig hosszabb a súlyvonalnál',
          'A súlyvonal merőleges az oldalra, a középvonal nem',
          'Nincs különbség, a két fogalom ugyanazt a szakaszt jelöli'
        ],
        correctAnswer: 0,
        explanation: 'A középvonal két oldal felezőpontját köti össze ($F_a F_b$), míg a súlyvonal egy csúcsból indul a szemközti oldal felezőpontjába ($C F_c$).'
      },
      {
        id: 10,
        question: 'Egy háromszög kerülete K = 30 cm. Mennyi a középvonalai által alkotott belső háromszög kerülete?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,42 135,42 80,10" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            <polygon points="52.5,26 107.5,26 80,42" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            <text x="65" y="34" className="text-[7.5px] font-bold fill-sky-800">K' = ?</text>
            <text x="65" y="18" className="text-[7px] font-bold fill-slate-500">K = 30</text>
          </svg>
        ),
        options: [
          '15 cm, mert a belső háromszög minden oldala fele az eredetinek (K\' = K / 2)',
          '7.5 cm',
          '30 cm',
          '10 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a belső háromszög oldalai $a/2$, $b/2$, $c/2$, a kerülete: $K\' = \\frac{a+b+c}{2} = \\frac{30}{2} = 15\\text{ cm}$.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Bizonyítások és Tételek',
    subtitle: 'Középvonal-tétel bizonyítása, paralelogramma átlótulajdonságok és megfordítások',
    range: '11–20. kérdés',
    focus: 'Ekvivalenciák, geometriai bizonyítások tükrözéssel és négyszögek rendszere',
    color: 'teal',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-300 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    questions: [
      {
        id: 11,
        question: 'Hogyan bizonyítjuk a háromszög középvonal-tételét középpontos tükrözéssel?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,40 100,40 65,10" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="40" x2="135" y2="10" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="100" y1="40" x2="135" y2="10" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="82.5" cy="25" r="2.5" fill="#f59e0b" />
            <text x="138" y="12" className="text-[7px] font-bold fill-emerald-700">A'</text>
          </svg>
        ),
        options: [
          'Az A csúcsot a BC oldal felezőpontjára tükrözve paralelogrammát hozunk létre',
          'Merőlegest bocsátunk a magasságpontból a középvonalra',
          'Köré írható kört rajzolunk a háromszög köré',
          'Elforgatjuk a háromszöget 90 fokkal a súlypont körül'
        ],
        correctAnswer: 0,
        explanation: 'Ha $A$-t tükrözzük $F_{BC}$-re, az $ABA\'C$ négyszög átlói felezik egymást, így paralelogramma keletkezik, amiből következik a párhuzamosság és a feleakkora hossz.'
      },
      {
        id: 12,
        question: 'Melyik állítás fogalmazza meg a paralelogramma átlóira vonatkozó alaptételt?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,38 70,12 130,12 90,38" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="38" x2="130" y2="12" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="70" y1="12" x2="90" y2="38" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="83" y="23" className="text-[7.5px] font-bold fill-amber-700">O</text>
          </svg>
        ),
        options: [
          'Egy négyszög akkor és csak akkor paralelogramma, ha átlói kölcsönösen felezik egymást',
          'Egy négyszög akkor és csak akkor paralelogramma, ha átlói egyenlő hosszúak',
          'Egy négyszög akkor és csak akkor paralelogramma, ha átlói merőlegesek',
          'Minden négyszög átlói felezik egymást'
        ],
        correctAnswer: 0,
        explanation: 'Ez kétirányú tétel (ekvivalencia): ha paralelogramma, akkor felezik egymást; és ha felezik egymást, akkor biztosan paralelogramma.'
      },
      {
        id: 13,
        question: 'Ha egy külső P pontot tükrözünk az AB szakasz F felezőpontjára, milyen négyszög lesz az APBP\'?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,35 80,10 130,20 80,45" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="80" cy="27.5" r="3" fill="#f59e0b" />
            <text x="83" y="29" className="text-[7px] font-bold fill-amber-700">F</text>
          </svg>
        ),
        options: [
          'Mindig paralelogramma, mert átlói (AB és PP\') felezik egymást F-ben',
          'Mindig téglalap',
          'Mindig deltoid',
          'Csak akkor paralelogramma, ha P az AB felezőmerőlegesén van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mindkét szakasz ($AB$ és $PP\'$) felezőpontja az $F$ pont, az átlók felezik egymást, ami a paralelogramma definíciójával egyenértékű.'
      },
      {
        id: 14,
        question: 'Mely négyszögekre igaz, hogy átlóik MERŐLEGESEN felezik egymást?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="80,8 115,25 80,42 45,25" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="80" y1="8" x2="80" y2="42" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="45" y1="25" x2="115" y2="25" stroke="#16a34a" strokeWidth="1.2" />
            <rect x="80" y="22" width="3" height="3" fill="none" stroke="#16a34a" strokeWidth="0.8" />
          </svg>
        ),
        options: [
          'A rombuszra és a négyzetre',
          'Csak a téglalapra',
          'Minden paralelogrammára',
          'Csak a húrtrapézra'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz (és speciális esete, a négyzet) az egyetlen paralelogramma, amelynek átlói merőlegesek egymásra.'
      },
      {
        id: 15,
        question: 'Mely négyszögekre igaz, hogy átlóik EGYENLŐ HOSSZÚAK és felezik egymást?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <rect x="45" y="12" width="70" height="26" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="45" y1="12" x2="115" y2="38" stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="45" y1="38" x2="115" y2="12" stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1" />
            <text x="68" y="28" className="text-[7px] font-bold fill-sky-800">|e| = |f|</text>
          </svg>
        ),
        options: [
          'A téglalapra és a négyzetre',
          'Csak a rombuszra',
          'Minden paralelogrammára',
          'Csak az általános deltoidra'
        ],
        correctAnswer: 0,
        explanation: 'A téglalapban és a négyzetben az átlók egyenlő hosszúak ($|e| = |f|$) és felezik egymást.'
      },
      {
        id: 16,
        question: 'Igaz-e, hogy egy általános deltoid átlói kölcsönösen felezik egymást?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="40,25 70,10 120,25 70,40" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="40" y1="25" x2="120" y2="25" stroke="#f43f5e" strokeWidth="1" />
            <line x1="70" y1="10" x2="70" y2="40" stroke="#f43f5e" strokeWidth="1" />
            <text x="62" y="28" className="text-[10px] font-bold fill-rose-600">≠</text>
          </svg>
        ),
        options: [
          'Nem, a deltoidnak csak a szimmetriaátlója felezi a másikat',
          'Igen, minden deltoid átlói felezik egymást',
          'Csak akkor, ha a szögei tompaszögek',
          'Igen, mert merőlegesek'
        ],
        correctAnswer: 0,
        explanation: 'A deltoidban csak az egyik átló (a szimmetriatengely) felezi a másikat, kölcsönösen csak a rombuszban felezik egymást.'
      },
      {
        id: 17,
        question: 'Ha egy egyenes felezi a háromszög egyik oldalát és párhuzamos az alappal, mit állíthatunk a másik oldalról?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,42 135,42 80,10" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="15" y1="26" x2="145" y2="26" stroke="#16a34a" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="52.5" cy="26" r="3" fill="#16a34a" />
            <circle cx="107.5" cy="26" r="3" fill="#16a34a" />
          </svg>
        ),
        options: [
          'A másik oldalt is pontosan a felezőpontjában metszi (középvonal-tétel megfordítása)',
          'A másik oldalt a harmadolópontjában metszi',
          'Merőleges lesz a másik oldalra',
          'Nem metszi a másik oldalt'
        ],
        correctAnswer: 0,
        explanation: 'Ez a középvonal-tétel megfordítása: az oldalfelezőből az alappal párhuzamosan húzott egyenes a harmadik oldalt is felezi.'
      },
      {
        id: 18,
        question: 'Mi a szimmetriaközéppontja egy tetszőleges paralelogrammának?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,38 70,12 130,12 90,38" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <text x="84" y="24" className="text-[8px] font-bold fill-amber-700">O</text>
          </svg>
        ),
        options: [
          'Az átlók O metszéspontja',
          'A leghosszabb oldal felezőpontja',
          'A hegyesszögű csúcsa',
          'Nincs szimmetriaközéppontja'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az átlók kölcsönösen felezik egymást, metszéspontjukra vett középpontos tükrözés a paralelogrammát önmagába viszi át.'
      },
      {
        id: 19,
        question: 'Ha egy háromszög középvonala k = 6 cm, milyen hosszú a vele párhuzamos oldal (c)?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="50" y1="18" x2="110" y2="18" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="20" y1="36" x2="140" y2="36" stroke="#16a34a" strokeWidth="2.5" />
            <text x="70" y="14" className="text-[8px] font-bold fill-sky-700">k = 6 cm</text>
            <text x="70" y="46" className="text-[8px] font-bold fill-emerald-700">c = ?</text>
          </svg>
        ),
        options: [
          '12 cm, mert c = 2 · k = 2 · 6 = 12 cm',
          '3 cm',
          '6 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        explanation: '$c = 2 \\cdot k = 2 \\cdot 6 = 12\\text{ cm}$.'
      },
      {
        id: 20,
        question: 'Miért NEM lehet egy általános deltoid középpontosan szimmetrikus?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="40,25 65,10 115,25 65,40" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <path d="M 65 25 A 15 15 0 0 1 95 25" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="70" y="23" className="text-[7.5px] font-bold fill-rose-600">180°</text>
          </svg>
        ),
        options: [
          'Mert 180 fokos forgatás után a hosszabb és rövidebb oldalai helyet cserélnének, nem fedné el önmagát',
          'Mert az oldalai egyenlő hosszúak',
          'Mert belső szögeinek összege nem 360 fok',
          'Mert van szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'A deltoid szomszédos oldalai egyenlők (két párban), így 180°-os forgatás után a rövid és hosszú oldalak helyet cserélnek, nem fedik el önmagukat.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Számításos és Koordináta Feladatok',
    subtitle: 'Trapéz középvonala, Varignon-tétel, koordináták és összetett szimmetriák',
    range: '21–30. kérdés',
    focus: 'Összetett feladatmegoldási stratégiák, koordinátageometria és tételek alkalmazása',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-300 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    questions: [
      {
        id: 21,
        question: 'Egy trapéz középvonala k = 13 cm, a hosszabbik alapja a = 18 cm. Milyen hosszú a rövidebbik c alap?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="20,40 140,40 110,12 50,12" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="35" y1="26" x2="125" y2="26" stroke="#f59e0b" strokeWidth="2" />
            <text x="70" y="10" className="text-[7px] font-bold fill-indigo-700">c = ?</text>
            <text x="68" y="24" className="text-[7px] font-bold fill-amber-700">k = 13</text>
            <text x="68" y="47" className="text-[7px] font-bold fill-indigo-700">a = 18</text>
          </svg>
        ),
        options: [
          '8 cm, mert c = 2 · k - a = 2 · 13 - 18 = 26 - 18 = 8 cm',
          '5 cm',
          '10 cm',
          '15.5 cm'
        ],
        correctAnswer: 0,
        explanation: '$k = \\frac{a+c}{2} \\implies 13 = \\frac{18+c}{2} \\implies 26 = 18 + c \\implies c = 8\\text{ cm}$.'
      },
      {
        id: 22,
        question: 'Egy derékszögű háromszög átfogója c = 10 cm. Milyen hosszú az átfogóval párhuzamos középvonal?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,40 130,40 30,12" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="26" x2="80" y2="40" stroke="#16a34a" strokeWidth="2" />
            <rect x="30" y="34" width="6" height="6" fill="none" stroke="#0284c7" strokeWidth="1" />
            <text x="80" y="22" className="text-[7px] font-bold fill-emerald-700">átfogó = 10</text>
          </svg>
        ),
        options: [
          '5 cm, mert k = c / 2 = 10 / 2 = 5 cm',
          '10 cm',
          '2.5 cm',
          '7.07 cm'
        ],
        correctAnswer: 0,
        explanation: 'A középvonal-tétel tetszőleges háromszögre igaz, így derékszögű háromszögben is: $k = \\frac{c}{2} = \\frac{10}{2} = 5\\text{ cm}$.'
      },
      {
        id: 23,
        question: 'Egy paralelogramma átlóinak metszéspontja O(3; 2). Egyik csúcsa A(1; -1). Mik a szemközti C csúcs koordinátái?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="30" y1="36" x2="130" y2="14" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.5" />
            <circle cx="30" cy="36" r="3" fill="#0284c7" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <circle cx="130" cy="14" r="3" fill="#0d9488" />
            <text x="18" y="42" className="text-[7px] font-bold fill-sky-700">A(1;-1)</text>
            <text x="76" y="20" className="text-[7px] font-bold fill-amber-700">O(3;2)</text>
            <text x="126" y="26" className="text-[7px] font-bold fill-teal-700">C=?</text>
          </svg>
        ),
        options: [
          'C(5; 5), mert x = 2 · 3 - 1 = 5 és y = 2 · 2 - (-1) = 5',
          'C(2; 3)',
          'C(4; 1)',
          'C(6; 4)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel $O$ felezi az $AC$ átlót: $x_O = \\frac{x_A+x_C}{2} \\implies x_C = 2\\cdot 3 - 1 = 5$, $y_C = 2\\cdot 2 - (-1) = 5$.'
      },
      {
        id: 24,
        question: 'Egy szakasz végpontjai A(-2; 4) és B(6; 0). Mik az F felezőpont koordinátái?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="30" y1="16" x2="130" y2="34" stroke="#6366f1" strokeWidth="2" />
            <circle cx="30" cy="16" r="3" fill="#6366f1" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <circle cx="130" cy="34" r="3" fill="#6366f1" />
            <text x="14" y="14" className="text-[7px] font-bold fill-indigo-700">A(-2;4)</text>
            <text x="76" y="18" className="text-[7.5px] font-bold fill-amber-700">F=?</text>
            <text x="120" y="44" className="text-[7px] font-bold fill-indigo-700">B(6;0)</text>
          </svg>
        ),
        options: [
          'F(2; 2), mert x = (-2 + 6) / 2 = 2 és y = (4 + 0) / 2 = 2',
          'F(4; 4)',
          'F(2; 4)',
          'F(4; 2)'
        ],
        correctAnswer: 0,
        explanation: 'A felezőpont koordinátái a végpontok számtani közepei: $x_F = \\frac{-2+6}{2} = 2$, $y_F = \\frac{4+0}{2} = 2$.'
      },
      {
        id: 25,
        question: 'Egy háromszög oldalai 6 cm, 8 cm és 10 cm. Mennyi a három középvonal által alkotott belső háromszög kerülete?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="30,40 130,40 30,12" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="30,26 80,40 80,26" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="65" y="32" className="text-[7px] font-bold fill-sky-800">K' = ?</text>
          </svg>
        ),
        options: [
          '12 cm, mert K = 6 + 8 + 10 = 24 cm, és K\' = K / 2 = 12 cm',
          '24 cm',
          '6 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        explanation: 'A belső háromszög oldalai 3 cm, 4 cm és 5 cm, így kerülete: $K\' = 3 + 4 + 5 = 12\\text{ cm}$ (pontosan a fele az eredeti 24 cm-nek).'
      },
      {
        id: 26,
        question: 'Egy háromszög területe T = 72 cm². A középvonalak által levágott 3 külső sarokháromszög együttes területe mennyi?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,44 135,44 80,8" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.2" />
            <polygon points="52.5,26 107.5,26 80,44" fill="#ffffff" stroke="#4338ca" strokeWidth="1.2" />
            <text x="68" y="34" className="text-[7px] font-bold fill-indigo-700">3 db kis Δ</text>
          </svg>
        ),
        options: [
          '54 cm², mert egyenként 18 cm², és 3 · 18 = 54 cm²',
          '36 cm²',
          '18 cm²',
          '60 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A 4 egybevágó kis háromszögből egyenként $72 / 4 = 18\\text{ cm}^2$. A három külső együtt: $3 \\cdot 18 = 54\\text{ cm}^2$.'
      },
      {
        id: 27,
        question: 'Egy tetszőleges négyszög egymást követő oldalfelező pontjait összekötve (Varignon-tétel) milyen négyszöget kapunk MINDIG?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,35 60,8 135,16 110,44" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="42.5,21.5 97.5,12 122.5,30 67.5,39.5" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.8" />
            <text x="68" y="28" className="text-[7.5px] font-bold fill-teal-800">Paralelogramma!</text>
          </svg>
        ),
        options: [
          'Mindig paralelogrammát kapunk (Varignon-paralelogramma)',
          'Csak akkor paralelogramma, ha az eredeti négyszög téglalap volt',
          'Mindig rombuszt kapunk',
          'Mindig trapézt kapunk'
        ],
        correctAnswer: 0,
        explanation: 'Pierre Varignon tétele: bármely síknégyszög oldalfelező pontjai egy paralelogramma csúcsait alkotják.'
      },
      {
        id: 28,
        question: 'Miért paralelogramma bármely négyszög oldalfelezőit összekötő négyszög?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,35 60,8 135,16 110,44" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="25" y1="35" x2="135" y2="16" stroke="#2563eb" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="42.5" y1="21.5" x2="97.5" y2="12" stroke="#16a34a" strokeWidth="1.8" />
            <line x1="67.5" y1="39.5" x2="122.5" y2="30" stroke="#16a34a" strokeWidth="1.8" />
          </svg>
        ),
        options: [
          'Mert szemközti oldalai az eredeti négyszög átlóinak középvonalai, így párhuzamosak velük és egymással',
          'Mert az eredeti négyszög szögei kiegészítik egymást',
          'Mert a négyszög átlói merőlegesek',
          'Mert a csúcsok távolsága egyenlő'
        ],
        correctAnswer: 0,
        explanation: 'A négyszög átlója két háromszögre vágja a négyszöget. Az oldalfelezőket összekötő szakaszok ezen háromszögek középvonalai, így mindketten párhuzamosak az átlóval, tehát egymással is!'
      },
      {
        id: 29,
        question: 'Ha egy trapéz középvonala k = 14 cm és magassága m = 6 cm, mennyi a trapéz területe?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="20,40 140,40 110,12 50,12" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="35" y1="26" x2="125" y2="26" stroke="#f59e0b" strokeWidth="2" />
            <line x1="50" y1="12" x2="50" y2="40" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />
            <text x="70" y="24" className="text-[7px] font-bold fill-amber-700">k = 14</text>
            <text x="38" y="28" className="text-[7px] font-bold fill-slate-600">m=6</text>
          </svg>
        ),
        options: [
          '84 cm², mert T = k · m = 14 · 6 = 84 cm²',
          '42 cm²',
          '168 cm²',
          '20 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A trapéz területe $T = \\frac{a+c}{2} \\cdot m = k \\cdot m = 14 \\cdot 6 = 84\\text{ cm}^2$.'
      },
      {
        id: 30,
        question: 'Egy háromszög súlyvonala 9 cm. A súlypont (S) milyen hosszúságú szakaszokra osztja ezt a csúcs felől nézve?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="25,42 135,42 80,10" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="80" y1="10" x2="80" y2="42" stroke="#e11d48" strokeWidth="2" />
            <circle cx="80" cy="31.3" r="2.5" fill="#e11d48" />
            <text x="84" y="22" className="text-[7px] font-bold fill-rose-600">6 cm</text>
            <text x="84" y="38" className="text-[7px] font-bold fill-rose-600">3 cm</text>
          </svg>
        ),
        options: [
          '6 cm és 3 cm, mert a súlypont 2:1 arányban osztja a súlyvonalat a csúcs felől',
          '4.5 cm és 4.5 cm (felezi)',
          '7 cm és 2 cm',
          '3 cm és 6 cm (az oldal felől a hosszabb)'
        ],
        correctAnswer: 0,
        explanation: 'A súlypont a súlyvonalakat 2:1 arányban osztja a csúcstól mérve: $2/3 \\cdot 9 = 6\\text{ cm}$, és $1/3 \\cdot 9 = 3\\text{ cm}$.'
      }
    ]
  }
};

export const ReflectionAppQuiz: React.FC<ReflectionAppQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={7}
      chapterId="g7-geom-trans"
      topicId="g7-geom-reflection-app"
      topicTitle="6. A középpontos tükrözés alkalmazása"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<ReflectionAppMatcher onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ReflectionAppSorter onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
};

export default ReflectionAppQuiz;
