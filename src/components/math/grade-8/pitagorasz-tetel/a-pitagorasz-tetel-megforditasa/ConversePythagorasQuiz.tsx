import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  GitCompare,
  Triangle,
  Shapes,
  Maximize2,
  Award,
  Sparkles,
  LayoutGrid,
  ArrowRightLeft,
  Compass,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ConversePythagorasMatcher } from './ConversePythagorasMatcher';
import { ConversePythagorasSorter } from './ConversePythagorasSorter';

interface ConversePythagorasQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cp-c1',
    title: 'A Pitagorasz-tétel Megfordítása',
    icon: <GitCompare className="w-4 h-4 text-amber-600" />,
    formula: 'a^2 + b^2 = c^2 \\implies \\gamma = 90^\\circ',
    note: 'Ha a két rövidebb oldal négyzetösszege egyenlő a leghosszabb oldal (c) négyzetével, a háromszög garantáltan derékszögű!',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <polygon points="20,44 70,44 20,14" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
        <path d="M 20 34 A 10 10 0 0 1 30 44" fill="none" stroke="#b45309" strokeWidth="1" />
        <circle cx="24" cy="40" r="1.1" fill="#b45309" />
        <text x="12" y="30" className="text-[7px] font-bold fill-amber-800">a</text>
        <text x="44" y="52" className="text-[7px] font-bold fill-orange-800">b</text>
        <text x="50" y="26" className="text-[7.5px] font-black fill-emerald-700">c</text>
        <text x="115" y="24" className="text-[7.5px] font-black fill-amber-800" textAnchor="middle">a² + b² = c²</text>
        <text x="115" y="38" className="text-[6.5px] font-bold fill-emerald-700" textAnchor="middle">⇒ Derékszögű!</text>
      </svg>
    )
  },
  {
    id: 'cp-c2',
    title: 'Szögtípusok Oldalak Alapján',
    icon: <Shapes className="w-4 h-4 text-indigo-600" />,
    formula: 'c^2 = a^2+b^2 \\; (90^\\circ), \\quad c^2 < a^2+b^2 \\; (<90^\\circ), \\quad c^2 > a^2+b^2 \\; (>90^\\circ)',
    note: 'Mindig a leghosszabb oldal a c! Ha c² kisebb a négyzetösszegnél: hegyesszögű; ha nagyobb: tompaszögű.',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <text x="80" y="16" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">c² = a² + b² ⇒ Derékszögű (90°)</text>
        <text x="80" y="30" className="text-[7px] font-bold fill-indigo-800" textAnchor="middle">c² &lt; a² + b² ⇒ Hegyesszögű (&lt;90°)</text>
        <text x="80" y="44" className="text-[7px] font-bold fill-rose-800" textAnchor="middle">c² &gt; a² + b² ⇒ Tompaszögű (&gt;90°)</text>
      </svg>
    )
  },
  {
    id: 'cp-c3',
    title: 'Pitagoraszi Számhármasok',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: '(3, 4, 5), \\quad (5, 12, 13), \\quad (8, 15, 17), \\quad (7, 24, 25)',
    note: 'Pozitív egész számok, amelyekre a² + b² = c². Bármely számhármas k-szorosa (pl. 6-8-10) is derékszögű háromszöget ad!',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <rect x="15" y="8" width="130" height="38" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="80" y="22" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">3 - 4 - 5 • 5 - 12 - 13</text>
        <text x="80" y="36" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">k · (a, b, c) is számhármas!</text>
      </svg>
    )
  },
  {
    id: 'cp-c4',
    title: 'Egyiptomi 12 Csomós Zsinór',
    icon: <Compass className="w-4 h-4 text-sky-600" />,
    formula: '3 + 4 + 5 = 12 \\text{ egység} \\implies \\gamma = 90^\\circ',
    note: 'Az ókori egyiptomi földmérők 12 egyenlő részre osztott kötéllel, 3 : 4 : 5 arányban tűzték ki a pontos derékszöget.',
    figure: (
      <svg viewBox="0 0 160 55" className="w-36 h-12">
        <polygon points="25,44 75,44 25,14" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="25" cy="44" r="2" fill="#78350f" />
        <circle cx="75" cy="44" r="2" fill="#78350f" />
        <circle cx="25" cy="14" r="2" fill="#78350f" />
        <text x="50" y="52" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">4 csomóköz</text>
        <text x="14" y="30" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">3</text>
        <text x="56" y="26" className="text-[6.5px] font-black fill-emerald-800">5</text>
        <text x="120" y="28" className="text-[7px] font-black fill-slate-700" textAnchor="middle">12 csomó zártan</text>
      </svg>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapok és Derékszögűség Felismerése',
    description: '10 alapozó feladat a tétel megfordításáról, derékszögű háromszögek azonosításáról és az oldalak négyzetösszegéről',
    badgeText: '1. Szint • Alapozó',
    badgeColor: 'amber',
    icon: <GitCompare className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'A megfordítás lényege',
        question: 'Mit állít a Pitagorasz-tétel megfordítása?',
        options: [
          'Ha egy háromszög két rövidebb oldalának négyzetösszege egyenlő a leghosszabb oldal négyzetével (a² + b² = c²), akkor a háromszög derékszögű.',
          'Minden háromszögben a két befogó összege egyenlő az átfogóval.',
          'Ha egy háromszög derékszögű, akkor az átfogója mindig páros szám.',
          'Csak akkor derékszögű egy háromszög, ha az oldalai 3, 4 és 5 cm hosszúak.'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tétel megfordítása szerint, ha a három oldalra fennáll az a² + b² = c² összefüggés, akkor a háromszög szükségszerűen derékszögű.'
      },
      {
        id: 'q1-2',
        title: '6, 8, 10 cm háromszög',
        question: 'Derékszögű-e az a háromszög, amelynek oldalai 6 cm, 8 cm és 10 cm?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[170px] h-auto max-h-[85px] select-none">
            <polygon points="35,68 125,68 35,24" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 56 A 12 12 0 0 1 47 68" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <text x="46" y="61" className="text-[11px] font-bold fill-indigo-600">?</text>
            <text x="25" y="49" textAnchor="end" className="text-[9px] font-bold fill-slate-700">6 cm</text>
            <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">8 cm</text>
            <text x="85" y="40" className="text-[9.5px] font-bold fill-slate-700">10 cm</text>
          </svg>
        ),
        options: [
          'Igen, mert 6² + 8² = 36 + 64 = 100 = 10²',
          'Nem, mert a leghosszabb oldal páros szám',
          'Csak akkor, ha az egyik szög 45°',
          'Nem, mert 6 + 8 nem egyenlő 10-zel'
        ],
        correctAnswer: 0,
        explanation: '6² + 8² = 36 + 64 = 100. Mivel 10² = 100, az egyenlőség teljesül, a háromszög derékszögű.'
      },
      {
        id: 'q1-3',
        title: '5, 12, 13 cm háromszög',
        question: 'Derékszögű-e az 5 cm, 12 cm és 13 cm oldalhosszúságú háromszög?',
        options: [
          'Igen, mert 5² + 12² = 25 + 144 = 169 = 13²',
          'Nem, mert 13 prímszám',
          'Nem, mert 5 + 12 = 17 > 13',
          'Csak akkor, ha egyenlő szárú'
        ],
        correctAnswer: 0,
        explanation: '5² + 12² = 25 + 144 = 169. Mivel 13² = 169, ez egy érvényes pitagoraszi számhármas, a háromszög derékszögű.'
      },
      {
        id: 'q1-4',
        title: '3, 4, 6 cm háromszög',
        question: 'Derékszögű-e az a háromszög, melynek oldalai 3 cm, 4 cm és 6 cm?',
        options: [
          'Nem derékszögű, mert 3² + 4² = 9 + 16 = 25 ≠ 6² = 36',
          'Igen, mert 3 + 4 > 6',
          'Igen, mert 3 és 4 a klasszikus befogópár',
          'Csak akkor, ha tompaszögű derékszög van benne'
        ],
        correctAnswer: 0,
        explanation: '3² + 4² = 25, míg 6² = 36. Mivel 25 ≠ 36, a háromszög NEM derékszögű (hanem tompaszögű, mert 36 > 25).'
      },
      {
        id: 'q1-5',
        title: 'A leghosszabb oldal szerepe',
        question: 'Melyik oldalt kell a megfordítás vizsgálatakor a \'c\' oldalnak választani a képletben?',
        options: [
          'Mindig a háromszög leghosszabb oldalát',
          'Bármelyik oldalt, a sorrend tetszőleges',
          'Mindig a legkisebb oldalt',
          'A rajzon vízszintesen lévő oldalt'
        ],
        correctAnswer: 0,
        explanation: 'A Pitagorasz-tételben c az átfogó, ami mindig a leghosszabb oldal. Ezért c-nek mindig a legnagyobb értéket kell választani.'
      },
      {
        id: 'q1-6',
        title: '8, 15, 17 cm háromszög',
        question: 'Egy háromszög oldalai 8 cm, 15 cm és 17 cm. Milyen szög van a 17 cm-es oldallal szemben?',
        options: [
          'Pontosan 90°-os derékszög, mert 8² + 15² = 64 + 225 = 289 = 17²',
          'Tompaszög, mert 17 > 15',
          '60°-os hegyesszög',
          'Nem határozható meg a szöge szögmérő nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 8² + 15² = 64 + 225 = 289 és 17² = 289, a háromszög derékszögű, a leghosszabb (17 cm) oldallal szemben pontosan 90°-os derékszög van.'
      },
      {
        id: 'q1-7',
        title: 'Szög a feltétel teljesülésekor',
        question: 'Ha egy háromszögben a² + b² = c² teljesül, hol található a 90°-os szög a háromszögben?',
        options: [
          'Mindig a leghosszabb \'c\' oldallal szemközti csúcsban',
          'Mindig az \'a\' oldallal szemben',
          'Bármelyik két oldal között',
          'A háromszög súlypontjában'
        ],
        correctAnswer: 0,
        explanation: 'Derékszögű háromszögben az átfogóval (a leghosszabb oldallal) szemben van a derékszög.'
      },
      {
        id: 'q1-8',
        title: '7, 24, 25 cm háromszög',
        question: 'Egy háromszög oldalai 7 cm, 24 cm és 25 cm. Derékszögű-e?',
        options: [
          'Igen, mert 7² + 24² = 49 + 576 = 625 = 25²',
          'Nem, mert a 25 túl nagy a 7-hez képest',
          'Csak akkor, ha egyenlő oldalú',
          'Nem, mert 24 + 7 = 31 ≠ 25'
        ],
        correctAnswer: 0,
        explanation: '7² + 24² = 49 + 576 = 625 = 25². Az egyenlőség fennáll, a háromszög derékszögű.'
      },
      {
        id: 'q1-9',
        title: '9, 12, 15 cm háromszög',
        question: 'Egy háromszög oldalai 9 cm, 12 cm és 15 cm. Miért derékszögű?',
        figure: (
          <svg viewBox="0 0 180 75" className="w-full max-w-[170px] h-auto max-h-[85px] select-none">
            <polygon points="18,62 58,62 18,32" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 18 54 A 8 8 0 0 1 26 62" fill="none" stroke="#d97706" strokeWidth="1" />
            <circle cx="21" cy="59" r="0.8" fill="#d97706" />
            <text x="38" y="52" className="text-[7.5px] font-bold fill-amber-900">(3, 4, 5)</text>
            
            <text x="80" y="50" className="text-[11px] font-black fill-emerald-600">×3 →</text>

            <polygon points="108,62 168,62 108,18" fill="#ecfdf5" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
            <text x="100" y="42" textAnchor="end" className="text-[8px] font-bold fill-slate-700">9</text>
            <text x="138" y="72" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">12</text>
            <text x="144" y="36" className="text-[8.5px] font-bold fill-slate-700">15</text>
          </svg>
        ),
        options: [
          'Mert a (3, 4, 5) pitagoraszi számhármas 3-szorosa: 9² + 12² = 81 + 144 = 225 = 15²',
          'Mert a 15 osztható 3-mal és 5-tel is',
          'Mert a 9 és 12 összege 21 > 15',
          'Mert minden derékszögű háromszög oldalai 3-mal oszthatók'
        ],
        correctAnswer: 0,
        explanation: '3 · (3, 4, 5) = (9, 12, 15). Mivel egy derékszögű számhármas k-szorosa is derékszögű, 81 + 144 = 225 = 15².'
      },
      {
        id: 'q1-10',
        title: '10, 24, 26 cm háromszög',
        question: 'Derékszögű-e az a háromszög, amelynek oldalai 10 cm, 24 cm és 26 cm?',
        options: [
          'Igen, mert az (5, 12, 13) számhármas 2-szerese: 100 + 576 = 676 = 26²',
          'Nem, mert 26 nem pitagoraszi szám',
          'Csak hegyesszögű háromszög lehet',
          'Nem, mert a számok túl nagyok'
        ],
        correctAnswer: 0,
        explanation: '2 · (5, 12, 13) = (10, 24, 26). 10² + 24² = 100 + 576 = 676 = 26².'
      }
    ]
  },
  2: {
    title: '2. Szint: Szögtípusok és Számhármasok',
    description: '10 feladat a hegyes-, derék- és tompaszögű háromszögek szétválasztásáról és az egyiptomi zsinórról',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'yellow',
    icon: <Shapes className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q2-1',
        title: '4, 6, 8 cm háromszög szögtípusa',
        question: 'Milyen típusú az a háromszög a szögei szerint, melynek oldalai 4 cm, 6 cm és 8 cm?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <polygon points="35,62 125,62 15,35" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 25 47 A 15 15 0 0 0 44 62" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="36" y="54" className="text-[10px] font-bold fill-rose-600">?</text>
            <text x="14" y="46" textAnchor="end" className="text-[9px] font-bold fill-slate-700">4 cm</text>
            <text x="80" y="72" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">6 cm</text>
            <text x="75" y="42" className="text-[9.5px] font-bold fill-slate-700">8 cm</text>
          </svg>
        ),
        options: [
          'Tompaszögű (mert 4² + 6² = 52 < 64 = 8²)',
          'Hegyesszögű',
          'Derékszögű',
          'Nem háromszög'
        ],
        correctAnswer: 0,
        explanation: '4² + 6² = 16 + 36 = 52. Mivel c² = 8² = 64 > 52, a leghosszabb oldallal szemközti szög tompaszög (> 90°).'
      },
      {
        id: 'q2-2',
        title: '7, 8, 9 cm háromszög szögtípusa',
        question: 'Milyen a háromszög a szögei szerint, ha oldalai 7 cm, 8 cm és 9 cm?',
        options: [
          'Hegyesszögű (mert 7² + 8² = 113 > 81 = 9²)',
          'Tompaszögű',
          'Derékszögű',
          'Egyenlő szárú'
        ],
        correctAnswer: 0,
        explanation: '7² + 8² = 49 + 64 = 113. Mivel c² = 9² = 81 < 113, a háromszög minden szöge hegyesszög (< 90°).'
      },
      {
        id: 'q2-3',
        title: '5, 5, 8 cm egyenlő szárú háromszög',
        question: 'Egy egyenlő szárú háromszög szárai 5 cm, alapja 8 cm. Milyen a háromszög a szögei szerint?',
        options: [
          'Tompaszögű (mert 5² + 5² = 50 < 64 = 8²)',
          'Hegyesszögű',
          'Derékszögű',
          'Szabályos'
        ],
        correctAnswer: 0,
        explanation: 'A leghosszabb oldal a 8 cm. 5² + 5² = 25 + 25 = 50. Mivel 8² = 64 > 50, a háromszög tompaszögű.'
      },
      {
        id: 'q2-4',
        title: '5, 6, 7 cm háromszög szögtípusa',
        question: 'Egy háromszög oldalai 5 cm, 6 cm és 7 cm. Milyen a háromszög a szögei szerint?',
        options: [
          'Hegyesszögű (mert 5² + 6² = 61 > 49 = 7²)',
          'Derékszögű',
          'Tompaszögű',
          'Nem alkot háromszöget'
        ],
        correctAnswer: 0,
        explanation: '5² + 6² = 25 + 36 = 61. Mivel c² = 7² = 49 < 61, a háromszög hegyesszögű.'
      },
      {
        id: 'q2-5',
        title: 'A háromszög-egyenlőtlenség csapdája',
        question: 'Milyen háromszöget alkotnak a 2 cm, 3 cm és 6 cm hosszú szakaszok?',
        figure: (
          <svg viewBox="0 0 160 70" className="w-full max-w-[160px] h-auto max-h-[75px] select-none">
            <line x1="25" y1="55" x2="135" y2="55" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <text x="80" y="67" className="text-[9px] font-bold fill-slate-700" textAnchor="middle">6 cm</text>
            <line x1="25" y1="55" x2="60" y2="40" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
            <text x="38" y="40" className="text-[8.5px] font-bold fill-rose-700">2 cm</text>
            <line x1="135" y1="55" x2="90" y2="35" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
            <text x="117" y="38" className="text-[8.5px] font-bold fill-rose-700">3 cm</text>
            <line x1="60" y1="40" x2="90" y2="35" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="75" y="32" className="text-[8px] font-bold fill-rose-600" textAnchor="middle">hézag?</text>
          </svg>
        ),
        options: [
          'Semmilyet, nem alkotnak háromszöget, mert 2 + 3 = 5 ≤ 6',
          'Tompaszögű háromszöget, mert 2² + 3² < 6²',
          'Derékszögű háromszöget',
          'Egyenlő szárú háromszöget'
        ],
        correctAnswer: 0,
        explanation: 'Bármilyen szögosztályozás előtt kötelező ellenőrizni a háromszög-egyenlőtlenséget: 2 + 3 = 5 ≤ 6, tehát a két rövidebb szakasz nem ér össze, nem létezik háromszög!'
      },
      {
        id: 'q2-6',
        title: 'Az ókori egyiptomi zsinór',
        question: 'Hány egyenlő távolságú csomóra volt osztva az ókori egyiptomi földmérők zárt kötele, és milyen arányban feszítették ki?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <polygon points="40,65 115,65 40,20" fill="#fef3c7" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
            {[
              [40, 65], [65, 65], [90, 65], [115, 65],
              [40, 50], [40, 35], [40, 20],
              [58, 31], [77, 42], [96, 54]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="#78350f" />
            ))}
            <text x="26" y="45" className="text-[8px] font-bold fill-amber-900">3 köz</text>
            <text x="78" y="75" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">4 köz</text>
            <text x="86" y="35" className="text-[8px] font-bold fill-amber-900">5 köz</text>
          </svg>
        ),
        options: [
          '12 csomóra, 3 : 4 : 5 arányban kifeszítve',
          '10 csomóra, 2 : 3 : 5 arányban',
          '16 csomóra, 4 : 5 : 7 arányban',
          '100 csomóra, 30 : 40 : 50 méterenként'
        ],
        correctAnswer: 0,
        explanation: 'A 12 csomós zsinór 12 egyenlő közközre volt osztva. 3, 4 és 5 egységnyi oldalakkal kifeszítve (3+4+5=12) pontos 90°-os derékszöget adott.'
      },
      {
        id: 'q2-7',
        title: 'Primitív pitagoraszi számhármas fogalma',
        question: 'Mit nevezünk a matematikában primitív pitagoraszi számhármasnak?',
        options: [
          'Olyan (a, b, c) pozitív egész számhármast, ahol a² + b² = c², és a számok legnagyobb közös osztója 1 (lnko = 1).',
          'Bármely háromszög három oldalát, ami kisebb 10-nél.',
          'Csak a (3, 4, 5) számhármast, mert az a legrégebbi.',
          'Olyan számhármast, amely tört számokat tartalmaz.'
        ],
        correctAnswer: 0,
        explanation: 'A primitív pitagoraszi számhármas olyan egész számokból áll, amelyek relatív prímek (lnko=1), és kielégítik az a² + b² = c² egyenletet.'
      },
      {
        id: 'q2-8',
        title: '9, 40, 41 cm háromszög',
        question: 'Derékszögű-e a 9 cm, 40 cm és 41 cm oldalhosszúságú háromszög?',
        options: [
          'Igen, mert 9² + 40² = 81 + 1600 = 1681 = 41²',
          'Nem, mert 41² = 1682',
          'Csak tompaszögű lehet',
          'Nem, mert 40 és 41 különbsége csak 1'
        ],
        correctAnswer: 0,
        explanation: '9² + 40² = 81 + 1600 = 1681 = 41². Ez egy nevezetes primitív pitagoraszi számhármas.'
      },
      {
        id: 'q2-9',
        title: '4, 5, 6 oldalak szögtípusa',
        question: 'Milyen a 4 cm, 5 cm és 6 cm oldalú háromszög a szögei szerint?',
        options: [
          'Hegyesszögű (mert 4² + 5² = 16 + 25 = 41 > 36 = 6²)',
          'Tompaszögű (mert 4² + 5² < 6²)',
          'Derékszögű (mert szomszédos egészek)',
          'Nem szerkeszthető'
        ],
        correctAnswer: 0,
        explanation: '4² + 5² = 16 + 25 = 41. Mivel 6² = 36 < 41, a leghosszabb oldal négyzete kisebb a négyzetösszegnél, így a háromszög hegyesszögű.'
      },
      {
        id: 'q2-10',
        title: 'Skálázási szorzó tulajdonsága',
        question: 'Ha egy pitagoraszi számhármas minden tagját megszorozzuk egy k = 0,5 tényezővel, derékszögű háromszöget kapunk-e?',
        options: [
          'Igen, a kapott háromszög hasonló lesz és derékszögű marad (pl. 1,5; 2; 2,5 cm)',
          'Nem, mert a szorzónak egész számnak kell lennie',
          'Nem, mert a törtekre nem érvényes a tétel',
          'Csak akkor, ha k > 1'
        ],
        correctAnswer: 0,
        explanation: 'A hasonlóság miatt bármely pozitív valós k szorzó esetén érvényes marad az egyenlőség: (k·a)² + (k·b)² = (k·c)².'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Gyakorlati Alkalmazások',
    description: '10 életszerű feladat a derékszög kitűzéséről, paralelogrammákról, koordinátákról és algebrai összefüggésekről',
    badgeText: '3. Szint • Mester',
    badgeColor: 'rose',
    icon: <Award className="w-4 h-4 text-rose-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Kerti telek sarkának kitűzése',
        question: 'Egy kiskert sarkánál a kerítés két egyenes szakasza mentén 1,5 métert és 2 métert mérünk ki a saroktól. Mekkorának kell lennie a két pont távolságának légvonalban, hogy a sarok pontosan 90°-os legyen?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <line x1="35" y1="18" x2="35" y2="65" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <line x1="35" y1="65" x2="125" y2="65" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M 35 55 A 10 10 0 0 1 45 65" fill="none" stroke="#d97706" strokeWidth="1.2" />
            <text x="44" y="58" className="text-[9px] font-bold fill-amber-700">?</text>
            <line x1="35" y1="24" x2="120" y2="65" stroke="#059669" strokeWidth="2" strokeDasharray="3,3" />
            <text x="18" y="45" className="text-[8px] font-bold fill-amber-950">1,5 m</text>
            <text x="78" y="75" textAnchor="middle" className="text-[8px] font-bold fill-amber-950">2,0 m</text>
            <text x="85" y="38" className="text-[8.5px] font-bold fill-emerald-700">d = ?</text>
          </svg>
        ),
        options: [
          '2,5 méter (a 3-4-5 számhármas fele)',
          '3,5 méter',
          '2,0 méter',
          '5,0 méter'
        ],
        correctAnswer: 0,
        explanation: 'c = √(1,5² + 2²) = √(2,25 + 4) = √6,25 = 2,5 m. Ez a 3-4-5 számhármas 0,5-szerese.'
      },
      {
        id: 'q3-2',
        title: 'Kőműves derékszög-ellenőrzés',
        question: 'A kőműves ellenőrzi egy szoba sarkának derékszögét. Az egyik falon 60 cm-t, a másikon 80 cm-t jelöl be a saroktól mérve. Hány cm-nek kell lennie a két jel távolságának, ha a falak derékszöget zárnak be?',
        options: [
          '100 cm (1 méter)',
          '140 cm',
          '120 cm',
          '90 cm'
        ],
        correctAnswer: 0,
        explanation: '60² + 80² = 3600 + 6400 = 10000. c = √10000 = 100 cm = 1 méter.'
      },
      {
        id: 'q3-3',
        title: 'Koordináta-geometriai derékszög',
        question: 'A koordináta-rendszerben adott három pont: A(0, 0), B(4, 0) és C(0, 3). Derékszögű-e az ABC háromszög, és mekkora az átfogója?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="30" y1="72" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.2" />
            <polygon points="30,11 27,16 33,16" fill="#94a3b8" />
            <line x1="20" y1="65" x2="135" y2="65" stroke="#94a3b8" strokeWidth="1.2" />
            <polygon points="139,65 134,62 134,68" fill="#94a3b8" />
            <polygon points="30,65 105,65 30,22" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <circle cx="30" cy="65" r="2.5" fill="#059669" />
            <circle cx="105" cy="65" r="2.5" fill="#059669" />
            <circle cx="30" cy="22" r="2.5" fill="#059669" />
            <text x="18" y="74" className="text-[7.5px] font-bold fill-slate-600">A(0,0)</text>
            <text x="105" y="75" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-600">B(4,0)</text>
            <text x="16" y="22" className="text-[7.5px] font-bold fill-slate-600">C(0,3)</text>
            <text x="75" y="38" className="text-[8px] font-bold fill-emerald-700">BC = ?</text>
          </svg>
        ),
        options: [
          'Igen, az origónál derékszögű, az átfogó BC = 5 egység',
          'Nem derékszögű',
          'Derékszögű, de az átfogója 7 egység',
          'Egyenlő szárú tompaszögű'
        ],
        correctAnswer: 0,
        explanation: 'Az AB szakasz hossza 4, az AC hossza 3, mindkettő a tengelyeken fekszik (90°-os szög). A BC távolság √(4² + 3²) = 5 egység.'
      },
      {
        id: 'q3-4',
        title: 'Gyökös oldalhosszúságú háromszög',
        question: 'Egy háromszög három oldala a = √2 cm, b = √3 cm és c = √5 cm. Derékszögű-e a háromszög?',
        options: [
          'Igen, mert (√2)² + (√3)² = 2 + 3 = 5 = (√5)²',
          'Nem, mert a gyökös számok nem adhatnak derékszöget',
          'Tompaszögű, mert √5 > √2 + √3',
          'Nem alkot háromszöget'
        ],
        correctAnswer: 0,
        explanation: '(√2)² + (√3)² = 2 + 3 = 5. Mivel (√5)² = 5, az egyenlőség teljesül, tehát a háromszög derékszögű!'
      },
      {
        id: 'q3-5',
        title: '20, 21, 29 cm háromszög területe',
        question: 'Egy háromszög oldalai 20 cm, 21 cm és 29 cm. Mekkora a háromszög területe?',
        options: [
          '210 cm²',
          '420 cm²',
          '290 cm²',
          '180 cm²'
        ],
        correctAnswer: 0,
        explanation: '20² + 21² = 400 + 441 = 841 = 29², tehát a háromszög derékszögű, befogói 20 és 21 cm. T = (20 · 21) / 2 = 210 cm².'
      },
      {
        id: 'q3-6',
        title: 'Paralelogramma vagy téglalap?',
        question: 'Egy paralelogramma két szomszédos oldala 10 cm és 24 cm, az egyik átlója 26 cm. Téglalap-e ez a paralelogramma?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <rect x="25" y="24" width="105" height="42" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <line x1="25" y1="66" x2="130" y2="24" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 25 56 A 10 10 0 0 1 35 66" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <text x="34" y="60" className="text-[9px] font-bold fill-indigo-600">?</text>
            <text x="15" y="48" className="text-[8px] font-bold fill-slate-700">10 cm</text>
            <text x="78" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">24 cm</text>
            <text x="82" y="40" className="text-[8.5px] font-bold fill-indigo-600">d = 26 cm</text>
          </svg>
        ),
        options: [
          'Igen, téglalap, mert 10² + 24² = 100 + 576 = 676 = 26², így a belső szöge 90°',
          'Nem, csak egy közönséges ferde paralelogramma',
          'Csak akkor téglalap, ha a másik átlója 30 cm',
          'Rombusz, mert az átlója páros szám'
        ],
        correctAnswer: 0,
        explanation: 'A két szomszédos oldal és az átló által alkotott háromszög derékszögű (10² + 24² = 26²), így a paralelogramma belső szöge 90°, ami a téglalap definíciója.'
      },
      {
        id: 'q3-7',
        title: 'Euklideszi generáló képlet számítása',
        question: 'Az euklidészi pitagoraszi számhármas képletben (a = m² - n², b = 2mn, c = m² + n²) legyen m = 4 és n = 1. Melyik számhármast kapjuk?',
        options: [
          '(15, 8, 17)',
          '(16, 8, 17)',
          '(12, 16, 20)',
          '(7, 24, 25)'
        ],
        correctAnswer: 0,
        explanation: 'a = 4² - 1² = 16 - 1 = 15; b = 2 · 4 · 1 = 8; c = 4² + 1² = 16 + 1 = 17. Ez a nevezetes (8, 15, 17) számhármas!'
      },
      {
        id: 'q3-8',
        title: 'Egymást követő egész számok',
        question: 'Létezik-e olyan derékszögű háromszög, amelynek oldalai egymást követő egész számok (x - 1, x, x + 1)?',
        options: [
          'Igen, kizárólag a (3, 4, 5) számhármas (x = 4)',
          'Igen, végtelen sok ilyen létezik',
          'Nem létezik ilyen',
          'Csak a (6, 7, 8)'
        ],
        correctAnswer: 0,
        explanation: '(x-1)² + x² = (x+1)² kifejtve: x² - 2x + 1 + x² = x² + 2x + 1 => x² - 4x = 0 => x = 4. Az oldalak kizárólag a 3, 4, 5 lehetnek!'
      },
      {
        id: 'q3-9',
        title: 'Egyenlő szárú háromszög magassága',
        question: 'Egy egyenlő szárú háromszög alapja 16 cm, szárai 10 cm hosszúak. Mekkora az alaphoz tartozó magasságvonal és milyen szöget zár be az alappal?',
        options: [
          '6 cm, és pontosan 90°-os derékszöget zár be',
          '8 cm, és 60°-os szöget zár be',
          '10 cm, és merőleges',
          '4 cm, és tompaszöget zár be'
        ],
        correctAnswer: 0,
        explanation: 'A magasság felezi az alapot (fél alap = 8 cm). A derékszögű félháromszögben m² + 8² = 10² => m² = 100 - 64 = 36 => m = 6 cm. A magasság mindig merőleges (90°).'
      },
      {
        id: 'q3-10',
        title: 'Körülírt kör és megfordítás kapcsolata',
        question: 'Ha egy háromszög oldalaira teljesül, hogy a² + b² = c², mi mondható el a háromszög köré írt kör sugaráról (R)?',
        options: [
          'R = c / 2 (a leghosszabb oldal pontos fele, Thálész tétele szerint)',
          'R = a + b',
          'R = c',
          'Nem írható köré kör'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a megfordítás szerint a háromszög derékszögű, a Thálész-tétel miatt a körülírt kör középpontja az átfogó felezőpontja, így sugara az átfogó fele: R = c / 2.'
      }
    ]
  }
};

export const ConversePythagorasQuiz: React.FC<ConversePythagorasQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A Pitagorasz-tétel Megfordítása Kvíz"
      subtitle="Háromszögek derékszögűségének eldöntése oldalhosszakból, pitagoraszi számhármasok és az egyiptomi zsinór"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 3. Lecke • A Pitagorasz-tétel Megfordítása"
      topicTitle="A Pitagorasz-tétel Megfordítása"
      topicId="g8-pyth-converse"
      chapterId="pitagorasz-tetel"
      grade={8}
      documentId="converse-pythagoras-quiz-doc"
      pdfFilename="8_osztaly_a_pitagorasz_tetel_megforditasa_kviz.pdf"
      emoji="🔄"
      cheatSheetTitle="Megfordítási és Számhármas Segédlet"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az oldalhosszakat a háromszögtípusokkal és számhármasokkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Háromszögek Szögtípusának Meghatározása',
              subtitle: 'Párosítsd az oldalhosszakat a háromszög szögek szerinti típusával!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Szögtípusok'
            },
            2: {
              title: '2. Szint: Pitagoraszi Számhármasok és Skálázás',
              subtitle: 'Kösd össze az alap számhármasokat a többszöröseikkel és összefüggéseikkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számhármasok'
            },
            3: {
              title: '3. Szint: Szabályok, Feltételek és Geometriai Állítások',
              subtitle: 'Párosítsd a matematikai feltételeket a pontos geometriai jelentésükkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Geometriai szabályok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <ConversePythagorasMatcher
              key={`cp-matcher-${level}`}
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
          subtitle: 'Kategorizáld a háromszögeket: derékszögű, hegyesszögű vagy tompaszögű!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Háromszögek Szögtípus Szerinti Osztályozása',
              subtitle: 'Sorold be a megadott oldalhosszúságú háromszögeket a szögeik szerinti csoportba!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Szögtípusok'
            },
            2: {
              title: '2. Szint: Számhármasok Természete',
              subtitle: 'Különböztesd meg a primitív számhármasokat, többszöröseiket és a nem derékszögű hármasokat!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Számhármas típusok'
            },
            3: {
              title: '3. Szint: Geometriai Állítások Igazságtartalma',
              subtitle: 'Döntsd el: Mindig igaz / Csak derékszögűre igaz / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Állítások igazsága'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ConversePythagorasSorter
              key={`cp-sorter-${level}`}
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

export default ConversePythagorasQuiz;
