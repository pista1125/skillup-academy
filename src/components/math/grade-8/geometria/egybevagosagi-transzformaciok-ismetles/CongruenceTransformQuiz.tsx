import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Sparkles,
  RotateCw,
  Target,
  Compass,
  Shapes,
  Maximize2,
  RefreshCw,
  Calculator,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { CongruenceTransformMatcher } from './CongruenceTransformMatcher';
import { CongruenceTransformSorter } from './CongruenceTransformSorter';

interface CongruenceTransformQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egybevágóság (Izometria)',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: "|A'B'| = |AB| (távolságtartó)",
    note: 'Invariáns tulajdonságok: távolságtartás, szögtartás, egyenestartás, párhuzamosságtartás és területtartás.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="60" y2="22" className="stroke-emerald-600 stroke-[2]" />
        <line x1="100" y1="22" x2="140" y2="22" className="stroke-emerald-600 stroke-[2]" />
        <circle cx="20" cy="22" r="2.5" className="fill-emerald-700" />
        <circle cx="60" cy="22" r="2.5" className="fill-emerald-700" />
        <circle cx="100" cy="22" r="2.5" className="fill-emerald-700" />
        <circle cx="140" cy="22" r="2.5" className="fill-emerald-700" />
        <text x="35" y="15" className="text-[8px] font-bold fill-emerald-800">d</text>
        <text x="113" y="15" className="text-[8px] font-bold fill-emerald-800">d' = d</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Körüljárási irány (Orientáció)',
    icon: <RotateCw className="w-4 h-4 text-teal-600" />,
    formula: 'Tengelyes: MEGFORDÍTJA  |  Többi: MEGŐRZI',
    note: 'A tengelyes tükrözés az egyetlen alapvető egybevágóság, amely megfordítja az óramutató járása szerinti körüljárást (indirekt).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="80" y1="5" x2="80" y2="40" className="stroke-slate-400 stroke-[1.5]" />
        <polygon points="50,12 30,32 60,32" fill="none" className="stroke-emerald-600 stroke-[1.8]" />
        <polygon points="110,12 130,32 100,32" fill="none" className="stroke-teal-600 stroke-[1.8]" />
        <text x="38" y="38" className="text-[8px] font-bold fill-emerald-700">↺</text>
        <text x="114" y="38" className="text-[8px] font-bold fill-teal-700">↻</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Koordináta-tükrözések',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'x: (x; -y)  |  y: (-x; y)  |  O: (-x; -y)',
    note: 'x tengelyre tükrözve az y vált előjelet, y tengelyre tükrözve az x vált előjelet, origóra tükrözve mindkettő.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="10" y1="22" x2="150" y2="22" className="stroke-slate-300 stroke-[1]" />
        <line x1="80" y1="5" x2="80" y2="40" className="stroke-slate-300 stroke-[1]" />
        <circle cx="110" cy="12" r="3" className="fill-indigo-600" />
        <circle cx="110" cy="32" r="3" className="fill-rose-600" />
        <text x="115" y="13" className="text-[7px] font-bold fill-indigo-800">P(x; y)</text>
        <text x="115" y="36" className="text-[7px] font-bold fill-rose-800">P'(x; -y)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Háromszögek egybevágósága',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: 'o-o-o, o-sz-o, sz-o-sz, d-o-o',
    note: 'Figyelem: a sz-sz-sz nem egybevágóság, csak hasonlóság (a méret eltérhet)!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="30,35 70,35 50,10" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="90,35 130,35 110,10" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="46" y="27" className="text-[7px] font-bold fill-emerald-800">Δ₁</text>
        <text x="106" y="27" className="text-[7px] font-bold fill-purple-800">Δ₂</text>
        <text x="76" y="25" className="text-[9px] font-bold fill-slate-700">≅</text>
      </svg>
    )
  }
];

const levels: LevelConfig[] = [
  // 1. SZINT: ALAPFOGALMAK ÉS TULAJDONSÁGOK
  {
    level: 1,
    title: '1. Szint: Alapfogalmak és Tulajdonságok',
    subtitle: 'Távolságtartás, körüljárási irány, fixpontok és alapvető transzformációk',
    range: '1–10. feladat',
    focus: 'Egybevágóság definíciója, invariáns tulajdonságok, orientáció és fixpontok',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    questions: [
      {
        id: 'ct-l1-q1',
        prompt: 'Mit jelent pontosan, hogy egy geometriai transzformáció távolságtartó?',
        figure: (
          <svg viewBox="0 0 140 40" className="w-36 h-10 mx-auto">
            <line x1="20" y1="20" x2="55" y2="20" className="stroke-emerald-600 stroke-[2]" />
            <line x1="85" y1="20" x2="120" y2="20" className="stroke-emerald-600 stroke-[2]" />
            <text x="32" y="14" className="text-[8px] font-bold fill-emerald-800">|AB|</text>
            <text x="96" y="14" className="text-[8px] font-bold fill-emerald-800">|A\'B\'|</text>
          </svg>
        ),
        options: [
          "Bármely két pont távolsága megegyezik képpontjaik távolságával (|A'B'| = |AB|)",
          'Csak az origótól mért távolságok maradnak változatlanok',
          'Az alakzat területe pontosan a duplájára nő',
          'Minden pont pontosan azonos irányba mozdul el'
        ],
        correctAnswer: "Bármely két pont távolsága megegyezik képpontjaik távolságával (|A'B'| = |AB|)",
        explanation: 'A távolságtartás (izometria) azt jelenti, hogy bármely két tetszőleges pont távolsága egyenlő a leképezett pontjaik távolságával.',
        breakdown: [
          { label: 'Definíció', value: "|A'B'| = |AB|" },
          { label: 'Következmény', value: 'Egyenes képe egyenes, szakasz képe azonos hosszúságú szakasz.' }
        ]
      },
      {
        id: 'ct-l1-q2',
        prompt: 'Melyik síkbeli egybevágósági transzformáció FORDÍTJA MEG az alakzatok körüljárási irányát?',
        figure: (
          <svg viewBox="0 0 140 40" className="w-36 h-10 mx-auto">
            <line x1="70" y1="5" x2="70" y2="35" className="stroke-slate-400 stroke-[1.5]" />
            <text x="25" y="24" className="text-[10px] font-bold fill-emerald-700">↺ A-B-C</text>
            <text x="80" y="24" className="text-[10px] font-bold fill-teal-700">↻ A\'-B\'-C\'</text>
          </svg>
        ),
        options: [
          'Tengelyes tükrözés',
          'Középpontos tükrözés',
          'Párhuzamos eltolás',
          '90°-os elforgatás'
        ],
        correctAnswer: 'Tengelyes tükrözés',
        explanation: 'A tengelyes tükrözés indirekt egybevágóság: megfordítja az orientációt (a balra forgó alakzat képe jobbra forgó lesz). A többi három irányítástartó (direkt).',
        hint: 'Gondolj a tükörképedre: a jobb kezed a tükörben a bal oldalra esik.'
      },
      {
        id: 'ct-l1-q3',
        prompt: 'Egy sokszög területe 48 cm². Mekkora lesz a képének a területe tengelyes tükrözés után?',
        options: ['48 cm²', '24 cm²', '96 cm²', 'Nem határozható meg'],
        correctAnswer: '48 cm²',
        explanation: 'Mivel a tengelyes tükrözés egybevágósági transzformáció, területtartó tulajdonságú, így T\' = T = 48 cm².',
        breakdown: [
          { label: 'Invariancia', value: 'Területtartás (T\' = T)' },
          { label: 'Eredmény', value: '48 cm²' }
        ]
      },
      {
        id: 'ct-l1-q4',
        prompt: 'Hány fixpontja (helyben maradó pontja) van egy nem nulla eltolásvektorral történő párhuzamos eltolásnak?',
        options: ['0', '1', '2', 'Végtelen sok'],
        correctAnswer: '0',
        explanation: 'Ha az eltolásvektor v⃗ ≠ 0⃗, akkor a sík minden egyes pontja elmozdul a v⃗ vektorral, így egyetlen pont sem marad helyben (0 fixpont).',
        hint: 'Fixpont az, amelyre P\' = P. Ha v⃗ hossza nagyobb nullánál, mozdul-e el a pont?'
      },
      {
        id: 'ct-l1-q5',
        prompt: 'Hány fixpontja van a tengelyes tükrözésnek a síkon?',
        options: [
          'Végtelen sok (a tükörtengely minden pontja fixpont)',
          'Pontosan 1 (a tengely felezőpontja)',
          'Pontosan 2',
          '0'
        ],
        correctAnswer: 'Végtelen sok (a tükörtengely minden pontja fixpont)',
        explanation: 'A tükörtengely bármely T pontjának távolsága a tengelytől 0, így önmagába képeződik le (T\' = T). Ezért a tengely minden pontja fixpont.',
        breakdown: [
          { label: 'Fixpontok halmaza', value: 'Maga a t tengely egyenese' }
        ]
      },
      {
        id: 'ct-l1-q6',
        prompt: 'Hány fixpontja van a síkon a középpontos tükrözésnek?',
        options: ['Pontosan 1 (a tükrözés K középpontja)', '0', '2', 'Végtelen sok'],
        correctAnswer: 'Pontosan 1 (a tükrözés K középpontja)',
        explanation: 'Egyedül a K tükörközéppont távolsága önmagától 0, ezért csak K képe önmaga (K\' = K). Minden más pont elmozdul a túloldalra.',
        breakdown: [
          { label: 'Egyetlen fixpont', value: 'K centrum' }
        ]
      },
      {
        id: 'ct-l1-q7',
        prompt: 'Mikor mondjuk azt, hogy két síkidom egybevágó?',
        options: [
          'Ha létezik olyan egybevágósági transzformáció, amely az egyiket a másikba viszi (fedik egymást)',
          'Ha a területük egyenlő, függetlenül az alakjuktól',
          'Ha a kerületük azonos hosszúságú',
          'Ha mindkettő konvex sokszög'
        ],
        correctAnswer: 'Ha létezik olyan egybevágósági transzformáció, amely az egyiket a másikba viszi (fedik egymást)',
        explanation: 'Két síkidom akkor egybevágó, ha alakjuk és méretük megegyezik, azaz egymásra fektetve tökéletesen fedésbe hozhatók egybevágósági transzformációval.'
      },
      {
        id: 'ct-l1-q8',
        prompt: 'Az alábbiak közül melyik NEM invariáns (változatlan) tulajdonsága az egybevágóságnak?',
        options: [
          'A pontok koordinátái a koordináta-rendszerben',
          'A szakaszok hossza (távolságtartás)',
          'A szögek nagysága (szögtartás)',
          'Egyenesek párhuzamossága (párhuzamosságtartás)'
        ],
        correctAnswer: 'A pontok koordinátái a koordináta-rendszerben',
        explanation: 'A transzformáció során a pontok helye és koordinátái megváltoznak! A távolságok, szögek és párhuzamosság viszont invariánsak (állandók).'
      },
      {
        id: 'ct-l1-q9',
        prompt: 'Hány fokos elforgatással egyenértékű a síkon az O pontra vonatkozó középpontos tükrözés?',
        options: ['180°', '90°', '360°', '270°'],
        correctAnswer: '180°',
        explanation: 'Az O pont körüli 180°-os elforgatás pontosan ugyanazt a pontelrendezést eredményezi, mint az O pontra vonatkozó középpontos tükrözés.',
        breakdown: [
          { label: 'Azonosság', value: 'Középpontos tükrözés ≡ 180°-os elforgatás' }
        ]
      },
      {
        id: 'ct-l1-q10',
        prompt: 'Két háromszög mindhárom szöge egyenlő (60°, 60°, 60°). Egybevágóak-e biztosan?',
        options: [
          'Nem feltétlenül, lehetnek különböző méretű szabályos háromszögek is (hasonlóak)',
          'Igen, a sz-sz-sz alapeset miatt biztosan egybevágók',
          'Igen, mert minden szabályos háromszög egybevágó',
          'Csak akkor, ha derékszögűek'
        ],
        correctAnswer: 'Nem feltétlenül, lehetnek különböző méretű szabályos háromszögek is (hasonlóak)',
        explanation: 'A sz-sz-sz nem egybevágósági alapeset! Egy kis szabályos háromszög és egy nagy szabályos háromszög szögei egyaránt 60°-osak, de nem fedik egymást, tehát csak hasonlóak.'
      }
    ]
  },

  // 2. SZINT: KOORDINÁTAGEOMETRIA ÉS ALAKZATOK
  {
    level: 2,
    title: '2. Szint: Koordinátageometria és Alakzatok',
    subtitle: 'Tükrözések koordináta-rendszerben, tengelyek, origó és négyszögek létrehozása',
    range: '11–20. feladat',
    focus: 'Pontok koordinátáinak változása x és y tengelyre, origóra, és konstrukciók',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    questions: [
      {
        id: 'ct-l2-q1',
        prompt: 'A P(4; -5) pontot tükrözzük az x tengelyre. Mik lesznek a P\' képpont koordinátái?',
        options: ['P\'(4; 5)', 'P\'(-4; -5)', 'P\'(-4; 5)', 'P\'(-5; 4)'],
        correctAnswer: 'P\'(4; 5)',
        explanation: 'Az x tengelyre vett tükrözésnél az x koordináta nem változik, az y koordináta pedig az ellentettjére vált: (x; y) ↦ (x; -y), így (4; -5) ↦ (4; 5).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (x; -y)' },
          { label: 'Számolás', value: 'x\' = 4,  y\' = -(-5) = 5' }
        ]
      },
      {
        id: 'ct-l2-q2',
        prompt: 'A Q(-3; 8) pontot tükrözzük az y tengelyre. Mik lesznek a Q\' képpont koordinátái?',
        options: ['Q\'(3; 8)', 'Q\'(-3; -8)', 'Q\'(3; -8)', 'Q\'(8; -3)'],
        correctAnswer: 'Q\'(3; 8)',
        explanation: 'Az y tengelyre vett tükrözésnél az y koordináta marad változatlan, az x koordináta vált az ellentettjére: (-3; 8) ↦ (3; 8).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (-x; y)' },
          { label: 'Számolás', value: 'x\' = -(-3) = 3,  y\' = 8' }
        ]
      },
      {
        id: 'ct-l2-q3',
        prompt: 'Az R(6; -2) pontot tükrözzük az origóra (O(0;0)). Mik lesznek az R\' képpont koordinátái?',
        options: ['R\'(-6; 2)', 'R\'(6; 2)', 'R\'(-6; -2)', 'R\'(-2; 6)'],
        correctAnswer: 'R\'(-6; 2)',
        explanation: 'Az origóra (O pontra) történő középpontos tükrözés során mindkét koordináta az ellentettjére változik: (x; y) ↦ (-x; -y). Tehát (6; -2) ↦ (-6; 2).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (-x; -y)' },
          { label: 'Számolás', value: 'x\' = -6,  y\' = -(-2) = 2' }
        ]
      },
      {
        id: 'ct-l2-q4',
        prompt: 'Milyen négyszöget kapunk, ha egy tetszőleges általános háromszöget tükrözünk az egyik oldalának egyenesére?',
        figure: (
          <svg viewBox="0 0 140 45" className="w-36 h-10 mx-auto">
            <line x1="20" y1="22" x2="120" y2="22" className="stroke-emerald-600 stroke-[1.5]" />
            <polygon points="40,22 100,22 65,5" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2" />
            <polygon points="40,22 100,22 65,39" fill="#0d9488" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        ),
        options: ['Deltoidot', 'Paralelogrammát', 'Téglalapot', 'Trapézt'],
        correctAnswer: 'Deltoidot',
        explanation: 'A tükrözés miatt az oldal két végpontja fixpont marad, a harmadik csúcs túloldali képével pedig két-két szomszédos oldal egyenlő hosszú lesz. Ez a deltoid definíciója!',
        breakdown: [
          { label: 'Két szomszédos oldal', value: 'a = a\' és b = b\'' },
          { label: 'Négyszög típusa', value: 'Deltoid' }
        ]
      },
      {
        id: 'ct-l2-q5',
        prompt: 'Milyen négyszöget kapunk, ha egy tetszőleges háromszöget tükrözünk az egyik oldalának FELEZŐPONTJÁRA?',
        figure: (
          <svg viewBox="0 0 140 45" className="w-36 h-10 mx-auto">
            <polygon points="30,35 110,35 80,10" fill="#0d9488" fillOpacity="0.25" stroke="#0d9488" strokeWidth="1.5" />
            <polygon points="110,35 30,35 60,60" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="70" cy="35" r="3" className="fill-rose-600" />
            <text x="68" y="32" className="text-[7px] font-bold fill-rose-600">F</text>
          </svg>
        ),
        options: ['Paralelogrammát', 'Deltoidot', 'Húrtrapézt', 'Szabályos ötszöget'],
        correctAnswer: 'Paralelogrammát',
        explanation: 'A felezőpontra vett középpontos tükrözés miatt az átlók kölcsönösen felezik egymást, a szemközti oldalak pedig páronként egyenlők és párhuzamosak lesznek. Ez a paralelogramma!',
        breakdown: [
          { label: 'Átlók tulajdonsága', value: 'Kölcsönösen felezik egymást az F pontban' },
          { label: 'Négyszög típusa', value: 'Paralelogramma' }
        ]
      },
      {
        id: 'ct-l2-q6',
        prompt: 'A P(2; 7) pontot tükrözzük az I. és III. negyed szögfelező egyenesére (y = x). Mik lesznek a képpont koordinátái?',
        options: ['P\'(7; 2)', 'P\'(-2; -7)', 'P\'(-7; -2)', 'P\'(2; -7)'],
        correctAnswer: 'P\'(7; 2)',
        explanation: 'Az y = x egyenesre vett tükrözéskor a két koordináta egyszerűen helyet cserél: (x; y) ↦ (y; x), tehát (2; 7) ↦ (7; 2).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (y; x)' }
        ]
      },
      {
        id: 'ct-l2-q7',
        prompt: 'Ha egy egyenes képe önmaga a transzformáció során, de pontjai helyet cserélnek (elmozdulnak), hogyan nevezzük az egyenest?',
        options: [
          'Fixegyenes (de nem pontonként fix)',
          'Pontonként fix egyenes',
          'Invariáns tengely',
          'Irányvektor'
        ],
        correctAnswer: 'Fixegyenes (de nem pontonként fix)',
        explanation: 'Fixegyenes esetén e\' = e, azaz az egyenes egésze önmagába képződik le. Ha a pontjai is mind helyben maradnának, akkor lenne pontonként fix (mint a tengely).',
        hint: 'Példa: középpontos tükrözésnél a centrumon áthaladó egyenesek fixegyenesek.'
      },
      {
        id: 'ct-l2-q8',
        prompt: 'Az S(0; -4) pont az y tengelyen helyezkedik el. Mik lesznek a koordinátái az y tengelyre vett tükrözés után?',
        options: ['S\'(0; -4) (helyben marad, mert fixpont)', 'S\'(0; 4)', 'S\'(-4; 0)', 'S\'(4; 0)'],
        correctAnswer: 'S\'(0; -4) (helyben marad, mert fixpont)',
        explanation: 'Mivel S rajta van az y tengelyen, és a tengelyes tükrözésnél a tengely minden pontja fixpont, ezért S képe önmaga: S\'(0; -4).',
        breakdown: [
          { label: 'Feltétel', value: 'S ∈ y tengely' },
          { label: 'Fixpont tétel', value: 'S\' = S' }
        ]
      },
      {
        id: 'ct-l2-q9',
        prompt: 'Egy szakasz végpontjai A(1; 3) és B(6; 3). Tükrözzük a szakaszt az x tengelyre! Milyen hosszú lesz az A\'B\' képszakasz?',
        options: ['5 egység', '6 egység', '10 egység', '3 egység'],
        correctAnswer: '5 egység',
        explanation: 'Az AB szakasz hossza 6 - 1 = 5 egység. Mivel az egybevágósági transzformáció távolságtartó, az A\'B\' szakasz hossza pontosan megegyezik az eredetivel: 5 egység.',
        breakdown: [
          { label: 'Eredeti hossz', value: '|AB| = 5 egység' },
          { label: 'Képszakasz', value: "|A'B'| = 5 egység" }
        ]
      },
      {
        id: 'ct-l2-q10',
        prompt: 'Az A(2; 3), B(5; 3), C(2; 7) csúcsú derékszögű háromszöget origóra tükrözzük. Milyen háromszög lesz a kapott A\'B\'C\'?',
        options: [
          'Ugyanolyan méretű derékszögű háromszög, az eredetivel egybevágó',
          'Tompaszögű háromszög',
          'Kétszer akkora területű háromszög',
          'Egyenlő oldalú háromszög'
        ],
        correctAnswer: 'Ugyanolyan méretű derékszögű háromszög, az eredetivel egybevágó',
        explanation: 'A pontra vett tükrözés szögtartó és távolságtartó, így a derékszög megmarad, a befogók hossza azonos, a képháromszög tökéletesen egybevágó az eredetivel.'
      }
    ]
  },

  // 3. SZINT: ÖSSZETETT ÉS FELVÉTELI TÍPUSÚ FELADATOK
  {
    level: 3,
    title: '3. Szint: Összetett és Felvételi típusú feladatok',
    subtitle: 'Adott pontra tükrözés, háromszögek egybevágósági esetei és geometriai bizonyítások',
    range: '21–30. feladat',
    focus: 'K(x₀; y₀) pontra tükrözés számítása, alapesetek (o-o-o, o-sz-o stb.) és téves állítások szűrése',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    questions: [
      {
        id: 'ct-l3-q1',
        prompt: 'A P(3; 4) pontot tükrözzük a K(1; 1) pontra. Mik lesznek a P\' képpont koordinátái?',
        options: ['P\'(-1; -2)', 'P\'(-3; -4)', 'P\'(2; 3)', 'P\'(-1; 2)'],
        correctAnswer: 'P\'(-1; -2)',
        explanation: 'A középpontos tükrözésnél K a PP\' szakasz felezőpontja: x_K = (x_P + x_P\')/2  ⟹  x_P\' = 2·x_K - x_P = 2·1 - 3 = -1. Hasonlóan y_P\' = 2·1 - 4 = -2. Tehát P\'(-1; -2).',
        breakdown: [
          { label: 'Felezőpont képlete', value: 'x_P\' = 2·x_K - x_P' },
          { label: 'X számolás', value: '2·1 - 3 = -1' },
          { label: 'Y számolás', value: '2·1 - 4 = -2' }
        ],
        hint: 'A felezőpont képletéből indulj ki: a képpont koordinátája = 2 · centrum - eredeti pont.'
      },
      {
        id: 'ct-l3-q2',
        prompt: 'Egy derékszögű háromszög befogói 6 cm és 8 cm hosszúak. Tükrözzük a háromszöget az átfogójára! Mekkora a kapott deltoid területe?',
        figure: (
          <svg viewBox="0 0 140 45" className="w-36 h-10 mx-auto">
            <polygon points="20,22 120,22 70,5" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2" />
            <polygon points="20,22 120,22 70,39" fill="#0d9488" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        ),
        options: ['48 cm²', '24 cm²', '96 cm²', '36 cm²'],
        correctAnswer: '48 cm²',
        explanation: 'A derékszögű háromszög területe: T_h = (a · b) / 2 = (6 · 8) / 2 = 24 cm². A deltoid két ilyen egybevágó háromszögből áll össze, területe: 2 · 24 cm² = 48 cm².',
        breakdown: [
          { label: 'Háromszög területe', value: '(6 · 8) / 2 = 24 cm²' },
          { label: 'Deltoid területe', value: '2 · 24 cm² = 48 cm²' }
        ]
      },
      {
        id: 'ct-l3-q3',
        prompt: 'Az alábbiak közül melyik alapeset biztosítja, hogy két háromszög egybevágó, ha két oldaluk és a közbezárt szögük páronként megegyezik?',
        options: ['o - sz - o', 'o - o - o', 'sz - o - sz', 'd - o - o'],
        correctAnswer: 'o - sz - o',
        explanation: 'Az oldal-szög-oldal (o-sz-o) alapeset azt jelenti, hogy két-két oldal és a két oldal által bezárt szög egyenlő.',
        breakdown: [
          { label: 'Alapeset', value: 'o-sz-o (Oldal - Szög - Oldal)' }
        ]
      },
      {
        id: 'ct-l3-q4',
        prompt: 'Két háromszögben a = 5 cm, b = 9 cm, és a 9 cm-es oldallal szemközti szög β = 60°. Melyik alapeset igazolja az egybevágóságot?',
        options: [
          'd - o - o (két oldal és a nagyobbikkal szemközti szög megegyezik)',
          'o - sz - o',
          'o - o - o',
          'Ezekből az adatokból nem következik egybevágóság'
        ],
        correctAnswer: 'd - o - o (két oldal és a nagyobbikkal szemközti szög megegyezik)',
        explanation: 'Mivel a két megadott oldal közül a 9 cm-es a nagyobb (9 > 5), és az ezzel szemközti szög adott, a d-o-o (derékszögű / nagyobbik oldallal szemközti szög) eset alapján a háromszög egyértelműen meghatározott.',
        breakdown: [
          { label: 'Nagyobbik oldal', value: 'b = 9 cm > a = 5 cm' },
          { label: 'Szemközti szög', value: 'β = 60°' }
        ]
      },
      {
        id: 'ct-l3-q5',
        prompt: 'Az A(-4; 1) pont képe az ismeretlen K pontra tükrözve A\'(2; 5). Mik a K tükörközéppont koordinátái?',
        options: ['K(-1; 3)', 'K(-2; 6)', 'K(1; 3)', 'K(-6; -4)'],
        correctAnswer: 'K(-1; 3)',
        explanation: 'Mivel K az AA\' szakasz felezőpontja: x_K = (x_A + x_A\')/2 = (-4 + 2)/2 = -2/2 = -1. y_K = (y_A + y_A\')/2 = (1 + 5)/2 = 6/2 = 3. Tehát K(-1; 3).',
        breakdown: [
          { label: 'x_K', value: '(-4 + 2) / 2 = -1' },
          { label: 'y_K', value: '(1 + 5) / 2 = 3' }
        ]
      },
      {
        id: 'ct-l3-q6',
        prompt: 'Egy ABCD négyzetet tükrözünk az AC átlóegyenesére. Mely csúcsok képe lesz önmaga (melyek a fixpontok)?',
        options: ['A és C csúcs', 'B és D csúcs', 'Mind a négy csúcs', 'Egyik csúcs sem'],
        correctAnswer: 'A és C csúcs',
        explanation: 'Mivel a tükörtengely az AC egyenes, az A és C csúcsok rajta vannak a tengelyen, így ők fixpontok (A\' = A, C\' = C). A B csúcs átkerül a D-be, a D pedig a B-be.',
        breakdown: [
          { label: 'Tengelyen lévő pontok', value: 'A és C (fixpontok)' },
          { label: 'Helyet cserélő pontok', value: 'B ↦ D és D ↦ B' }
        ]
      },
      {
        id: 'ct-l3-q7',
        prompt: 'Melyik állítás HAMIS az egybevágósági transzformációkkal kapcsolatban?',
        options: [
          'A párhuzamos eltolás megfordítja az alakzatok körüljárási irányát',
          'Két pontra tükrözés egymás utánja egy párhuzamos eltolással egyenértékű',
          'A középpontos tükrözés egyenestartó és szögtartó',
          'Bármely két egybevágó sokszög kerülete pontosan egyenlő'
        ],
        correctAnswer: 'A párhuzamos eltolás megfordítja az alakzatok körüljárási irányát',
        explanation: 'Ez hamis! A párhuzamos eltolás irányítástartó (direkt) transzformáció, nem fordítja meg a körüljárási irányt. Egyedül a tengelyes tükrözés orientációváltó.',
        hint: 'Gondolj arra, hogy az eltolás során az alakzat csak elcsúszik a síkon, nem fordul át.'
      },
      {
        id: 'ct-l3-q8',
        prompt: 'Egy kör középpontja C(3; -2), sugara r = 5 cm. Tükrözzük a kört az origóra! Mik lesznek a képkör adatai?',
        options: [
          'C\'(-3; 2) és r\' = 5 cm',
          'C\'(-3; 2) és r\' = 10 cm',
          'C\'(3; 2) és r\' = 5 cm',
          'C\'(-2; 3) és r\' = 25 cm'
        ],
        correctAnswer: 'C\'(-3; 2) és r\' = 5 cm',
        explanation: 'A középpont tükörképe az origóra: C\'(-3; 2). Mivel a távolságtartás miatt a sugár nem változik meg, r\' = r = 5 cm marad.',
        breakdown: [
          { label: 'Középpont képe', value: '(3; -2) ↦ (-3; 2)' },
          { label: 'Sugár invariancia', value: 'r\' = 5 cm' }
        ]
      },
      {
        id: 'ct-l3-q9',
        prompt: 'Ha egymás után KÉTSZER tükrözünk UGYANARRA a t egyenesre, milyen eredő transzformációt kapunk?',
        options: [
          'Identitást (helybenhagyást: minden pont visszakerül az eredeti helyére)',
          '90°-os elforgatást',
          'Középpontos tükrözést',
          '2-szeres eltolást'
        ],
        correctAnswer: 'Identitást (helybenhagyást: minden pont visszakerül az eredeti helyére)',
        explanation: 'A tengelyes tükrözés önmaga inverze: ha egy pontot áttükrözünk a tengely túloldalára, majd a kapott pontot újra visszatükrözzük ugyanarra a tengelyre, visszajutunk a kiinduló helyre (P\'\' = P).',
        breakdown: [
          { label: 'Tükrözés inverze', value: 't ∘ t = Identitás (helybenhagyás)' }
        ]
      },
      {
        id: 'ct-l3-q10',
        prompt: 'Két egymással párhuzamos, d = 4 cm távolságra lévő egyenesre tükrözünk egymás után (t₁ majd t₂). Milyen eredő transzformációt kapunk?',
        figure: (
          <svg viewBox="0 0 140 45" className="w-36 h-10 mx-auto">
            <line x1="40" y1="5" x2="40" y2="40" className="stroke-slate-400 stroke-[1.5]" />
            <line x1="90" y1="5" x2="90" y2="40" className="stroke-slate-400 stroke-[1.5]" />
            <text x="35" y="12" className="text-[7px] font-bold fill-slate-600">t₁</text>
            <text x="85" y="12" className="text-[7px] font-bold fill-slate-600">t₂</text>
            <line x1="40" y1="22" x2="90" y2="22" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
            <text x="60" y="18" className="text-[7px] font-bold fill-emerald-700">d = 4</text>
          </svg>
        ),
        options: [
          'A tengelyekre merőleges irányú párhuzamos eltolást 2·d = 8 cm távolsággal',
          'Egyetlen tengelyes tükrözést 4 cm távolságra',
          'Egy 90°-os elforgatást',
          'Helybenhagyást (identitást)'
        ],
        correctAnswer: 'A tengelyes merőleges irányú párhuzamos eltolást 2·d = 8 cm távolsággal',
        explanation: 'Két párhuzamos egyenesre való egymás utáni tükrözés eredője egy párhuzamos eltolás, amelynek hossza a két tengely távolságának kétszerese (2 · 4 cm = 8 cm), iránya pedig t₁-ből t₂ felé mutat.',
        breakdown: [
          { label: 'Transzformáció típusa', value: 'Párhuzamos eltolás' },
          { label: 'Eltolás mértéke', value: '2 · d = 2 · 4 = 8 cm' }
        ]
      }
    ]
  }
];

export const CongruenceTransformQuiz: React.FC<CongruenceTransformQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={8}
      chapterId="g8-geometry"
      topicId="g8-geom-congruence"
      topicTitle="1. Egybevágósági transzformációk (ismétlés)"
      documentId="grade-8-geometria-egybevagosagi-transzformaciok"
      pdfFilename="8_osztaly_geometria_egybevagosagi_transzformaciok_kviz.pdf"
      title="1. Egybevágósági transzformációk Kvíz"
      subtitle="Teszteld és mélyítsd el a tudásod a sík egybevágósági transzformációiról, koordinátageometriai szabályairól és a háromszögek egybevágóságáról!"
      badge="8. Osztály - II. Témakör: Geometria"
      badgeColor="emerald"
      themeColor="emerald"
      cheatSheetCards={cheatSheetCards}
      levels={levels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a transzformációkat, tulajdonságaikat és szabályaikat!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Tulajdonságok',
              subtitle: 'Párosítsd a transzformációk fogalmait és alapvető tulajdonságait!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Alaptulajdonságok'
            },
            2: {
              title: '2. Szint: Koordinátageometria és Szabályok',
              subtitle: 'Párosítsd a pontok koordinátáit és az algebrai szabályokat!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Koordináta-szabályok'
            },
            3: {
              title: '3. Szint: Összetett és Felvételi Feladatok',
              subtitle: 'Párosítsd az összetett összefüggéseket és a geometriai bizonyításokat!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Bizonyítások és esetek'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <CongruenceTransformMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a transzformációkat, koordináta-tükrözéseket és alapeseteket!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-500" />,
          levels: {
            1: {
              title: '1. Szint: A 4 Alapvető Egybevágóság',
              subtitle: 'Sorold be a tulajdonságokat és ábrákat a megfelelő transzformációhoz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 4 csoport',
              focus: '4 Transzformáció'
            },
            2: {
              title: '2. Szint: Tükrözések a Koordináta-rendszerben',
              subtitle: 'Kategorizáld a pontok koordinátáit és a tükrözési szabályokat ábrákkal!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'x, y és origó tükrözés'
            },
            3: {
              title: '3. Szint: Alapesetek és Konstrukciók',
              subtitle: 'Döntsd el ábrák alapján, hogy mi egybevágóság, konstrukció, vagy téves feltétel!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alapesetek & konstrukció'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <CongruenceTransformSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default CongruenceTransformQuiz;
