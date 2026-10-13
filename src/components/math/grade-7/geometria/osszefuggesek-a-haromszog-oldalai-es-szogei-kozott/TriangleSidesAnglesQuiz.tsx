import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleSidesAnglesMatcher } from './TriangleSidesAnglesMatcher';
import { TriangleSidesAnglesSorter } from './TriangleSidesAnglesSorter';
import {
  Ruler,
  Compass,
  Shapes,
  Maximize2,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Scale
} from 'lucide-react';

interface TriangleSidesAnglesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Háromszög-egyenlőtlenség Tétele',
    icon: <Ruler className="w-4 h-4 text-indigo-600" />,
    formula: 'a + b > c, \\quad a + c > b, \\quad b + c > a',
    note: 'Bármely két oldal összege nagyobb a harmadiknál. Két ismert oldal (a, b) esetén a 3. oldal: |a - b| < c < a + b.'
  },
  {
    id: 'c2',
    title: 'Belső Szögek Összege',
    icon: <Target className="w-4 h-4 text-teal-600" />,
    formula: '\\alpha + \\beta + \\gamma = 180^\\circ',
    note: 'Minden síkbeli háromszög belső szögeinek összege pontosan 180° (egyenesszög).'
  },
  {
    id: 'c3',
    title: 'Külső Szögek Tétele',
    icon: <Sparkles className="w-4 h-4 text-purple-600" />,
    formula: '\\alpha\' = \\beta + \\gamma, \\quad \\alpha\' + \\beta\' + \\gamma\' = 360^\\circ',
    note: 'A külső szög egyenlő a két nem mellette fekvő belső szög összegével. A belső és külső szög mellékszögek (összegük 180°).'
  },
  {
    id: 'c4',
    title: 'Oldalak és Szemközti Szögek Kapcsolata',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: 'a > b \\iff \\alpha > \\beta',
    note: 'Nagyobb oldallal szemben nagyobb szög fekszik. Egyenlő szárú: alapon fekvő szögek egyenlők. Szabályos: minden szög 60°.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KÖNNYŰ (Alapszögek, definíciók és szögösszegek)
  1: {
    title: '1. Szint: Alapszögek és Szögösszegek',
    questions: [
      {
        id: 'q1-1',
        title: 'Belső szögek összege',
        prompt: 'Mennyi bármely síkbeli háromszög belső szögeinek összege?',
        questionTypeBadge: 'Alaptétel',
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: '180°',
        explanation: 'Bármely síkbeli háromszög három belső szögének összege pontosan 180° (egyenesszög): α + β + γ = 180°.'
      },
      {
        id: 'q1-2',
        title: 'Harmadik belső szög kiszámítása',
        prompt: 'Egy háromszög két belső szöge 55° és 65°. Mekkora a harmadik belső szöge?',
        questionTypeBadge: 'Szögszámítás',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="20,62 140,62 85,15" className="fill-teal-500/10 stroke-teal-600 stroke-2" />
            <path d="M 36,62 A 16,16 0 0,0 30,50" fill="none" className="stroke-blue-600 stroke-2" />
            <text x="36" y="56" className="text-[9px] font-bold fill-blue-600">55°</text>
            <path d="M 124,62 A 16,16 0 0,1 129,50" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="110" y="56" className="text-[9px] font-bold fill-indigo-600">65°</text>
            <path d="M 76,24 A 14,14 0 0,0 95,24" fill="none" className="stroke-amber-600 stroke-2" />
            <text x="85" y="34" textAnchor="middle" className="text-[10px] font-black fill-amber-600">?</text>
          </svg>
        ),
        options: ['60°', '50°', '70°', '80°'],
        correctAnswer: '60°',
        explanation: 'A harmadik szög: 180° - (55° + 65°) = 180° - 120° = 60°.'
      },
      {
        id: 'q1-3',
        title: 'Szabályos háromszög szögei',
        prompt: 'Mekkorák a szabályos (egyenlő oldalú) háromszög belső szögei?',
        questionTypeBadge: 'Szabályos háromszög',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="35,65 125,65 80,12" className="fill-amber-500/10 stroke-amber-600 stroke-2" />
            <line x1="78" y1="62" x2="82" y2="68" className="stroke-amber-700 stroke-2" />
            <line x1="55" y1="36" x2="60" y2="40" className="stroke-amber-700 stroke-2" />
            <line x1="100" y1="40" x2="105" y2="36" className="stroke-amber-700 stroke-2" />
            <text x="48" y="58" className="text-[9px] font-bold fill-amber-700">60°</text>
            <text x="96" y="58" className="text-[9px] font-bold fill-amber-700">60°</text>
            <text x="80" y="27" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">60°</text>
          </svg>
        ),
        options: ['Mindhárom pontosan 60°', 'Mindhárom 90°', '45°, 45°, 90°', '60°, 60°, 80°'],
        correctAnswer: 'Mindhárom pontosan 60°',
        explanation: 'Mivel mindhárom oldal egyenlő, a három szög is egyenlő: 180° : 3 = 60°.'
      },
      {
        id: 'q1-4',
        title: 'Derékszögű háromszög hegyesszögei',
        prompt: 'Egy derékszögű háromszög egyik hegyesszöge 42°. Mekkora a másik hegyesszög?',
        questionTypeBadge: 'Derékszögű háromszög',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="25,65 135,65 25,15" className="fill-blue-500/10 stroke-blue-600 stroke-2" />
            <path d="M 25,54 L 36,54 L 36,65" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <circle cx="30" cy="59" r="1.5" className="fill-slate-600" />
            <path d="M 115,65 A 20,20 0 0,1 120,58" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="100" y="60" className="text-[9px] font-bold fill-indigo-600">42°</text>
            <path d="M 25,28 A 13,13 0 0,0 34,22" fill="none" className="stroke-rose-600 stroke-2" />
            <text x="32" y="32" className="text-[10px] font-black fill-rose-600">?</text>
          </svg>
        ),
        options: ['48°', '38°', '58°', '138°'],
        correctAnswer: '48°',
        explanation: 'Derékszögű háromszögben a két hegyesszög összege 90° (pótszögek), így a másik hegyesszög: 90° - 42° = 48°.'
      },
      {
        id: 'q1-5',
        title: 'Mellékszög és külső szög',
        prompt: 'Egy háromszög egyik belső szöge 75°. Mekkora az ezzel a csúccsal szomszédos külső szög?',
        questionTypeBadge: 'Külső szög',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <line x1="15" y1="62" x2="60" y2="62" className="stroke-slate-400 stroke-dasharray-[3,3] stroke-1" />
            <line x1="60" y1="62" x2="145" y2="62" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="62" x2="95" y2="15" className="stroke-teal-600 stroke-2" />
            <line x1="145" y1="62" x2="95" y2="15" className="stroke-teal-600 stroke-2" />
            <path d="M 74,62 A 14,14 0 0,0 70,49" fill="none" className="stroke-blue-600 stroke-2" />
            <text x="76" y="56" className="text-[9px] font-bold fill-blue-600">75°</text>
            <path d="M 40,62 A 20,20 0 0,1 74,44" fill="none" className="stroke-rose-600 stroke-2" />
            <text x="42" y="44" textAnchor="middle" className="text-[10px] font-black fill-rose-600">?</text>
          </svg>
        ),
        options: ['105°', '115°', '95°', '180°'],
        correctAnswer: '105°',
        explanation: 'A belső szög és a mellette lévő külső szög mellékszögek, összegük 180°: 180° - 75° = 105°.'
      },
      {
        id: 'q1-6',
        title: 'Külső szög tétele',
        prompt: 'Egy háromszög két belső szöge 40° és 70°. Mekkora a harmadik csúcsnál lévő külső szög?',
        questionTypeBadge: 'Külső szög tétele',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <line x1="15" y1="62" x2="55" y2="62" className="stroke-slate-400 stroke-dasharray-[3,3] stroke-1" />
            <polygon points="55,62 145,62 90,18" className="fill-purple-500/10 stroke-purple-600 stroke-2" />
            <path d="M 130,62 A 15,15 0 0,1 135,53" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="118" y="58" className="text-[9px] font-bold fill-indigo-600">40°</text>
            <path d="M 83,28 A 12,12 0 0,0 99,28" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="91" y="38" textAnchor="middle" className="text-[9px] font-bold fill-teal-600">70°</text>
            <path d="M 36,62 A 19,19 0 0,1 68,45" fill="none" className="stroke-rose-600 stroke-2" />
            <text x="36" y="46" textAnchor="middle" className="text-[10px] font-black fill-rose-600">?</text>
          </svg>
        ),
        options: ['110°', '70°', '140°', '100°'],
        correctAnswer: '110°',
        explanation: 'A külső szög tétele alapján a külső szög egyenlő a két nem mellette fekvő belső szög összegével: 40° + 70° = 110°.'
      },
      {
        id: 'q1-7',
        title: 'Külső szögek összege',
        prompt: 'Mennyi a háromszög csúcsainként felvett külső szögeinek összege (α\' + β\' + γ\')?',
        questionTypeBadge: 'Külső szögek összege',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: '360°',
        explanation: 'Bármely konvex sokszög (így a háromszög) külső szögeinek összege mindig 360°.'
      },
      {
        id: 'q1-8',
        title: 'Egyenlő szárú háromszög szögei',
        prompt: 'Egy egyenlő szárú háromszög alapon fekvő egyik szöge 50°. Mekkora a szárszöge?',
        questionTypeBadge: 'Egyenlő szárú',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="30,65 130,65 80,15" className="fill-indigo-500/10 stroke-indigo-600 stroke-2" />
            <line x1="52" y1="38" x2="57" y2="43" className="stroke-indigo-700 stroke-2" />
            <line x1="102" y1="43" x2="107" y2="38" className="stroke-indigo-700 stroke-2" />
            <text x="42" y="58" className="text-[9px] font-bold fill-indigo-700">50°</text>
            <text x="102" y="58" className="text-[9px] font-bold fill-indigo-700">50°</text>
            <path d="M 72,23 A 10,10 0 0,0 88,23" fill="none" className="stroke-rose-600 stroke-2" />
            <text x="80" y="33" textAnchor="middle" className="text-[10px] font-black fill-rose-600">?</text>
          </svg>
        ),
        options: ['80°', '50°', '65°', '100°'],
        correctAnswer: '80°',
        explanation: 'Az alapon fekvő két szög egyenlő (50° és 50°). A szárszög: 180° - (50° + 50°) = 180° - 100° = 80°.'
      },
      {
        id: 'q1-9',
        title: 'Tompaszögek száma a háromszögben',
        prompt: 'Hány tompaszöge lehet legfeljebb egy háromszögnek?',
        questionTypeBadge: 'Szögtípusok',
        options: ['Legfeljebb 1', 'Legfeljebb 2', 'Legfeljebb 3', 'Nem lehet tompaszöge'],
        correctAnswer: 'Legfeljebb 1',
        explanation: 'Két tompaszög összege már meghaladná a 180°-ot (> 90° + > 90° > 180°), így egy háromszögnek legfeljebb 1 tompaszöge (vagy derékszöge) lehet.'
      },
      {
        id: 'q1-10',
        title: 'Háromszög-egyenlőtlenség felismerése',
        prompt: 'Melyik három oldalhosszból NEM szerkeszthető háromszög?',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <line x1="20" y1="60" x2="140" y2="60" className="stroke-slate-700 stroke-[2.5]" />
            <text x="80" y="72" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">8 cm</text>
            <line x1="20" y1="60" x2="55" y2="38" className="stroke-rose-600 stroke-2" />
            <text x="28" y="44" className="text-[9px] font-bold fill-rose-600">3 cm</text>
            <line x1="140" y1="60" x2="95" y2="38" className="stroke-rose-600 stroke-2" />
            <text x="120" y="44" className="text-[9px] font-bold fill-rose-600">4 cm</text>
            <line x1="55" y1="38" x2="95" y2="38" className="stroke-rose-400 stroke-dasharray-[2,2] stroke-1" />
            <text x="75" y="34" textAnchor="middle" className="text-[9px] font-bold fill-rose-500">rés! (3+4 &lt; 8)</text>
          </svg>
        ),
        options: ['3 cm, 4 cm, 8 cm', '4 cm, 5 cm, 6 cm', '5 cm, 5 cm, 5 cm', '6 cm, 8 cm, 10 cm'],
        correctAnswer: '3 cm, 4 cm, 8 cm',
        explanation: 'A két rövidebb oldal összege (3 + 4 = 7 cm) kisebb, mint a harmadik oldal (8 cm), így a háromszög-egyenlőtlenség nem teljesül.'
      }
    ]
  },

  // 2. SZINT: KÖZEPES (Számítások, egyenlőtlenség, oldalak és szemközti szögek)
  2: {
    title: '2. Szint: Háromszög-egyenlőtlenség és Szemközti Szögek',
    questions: [
      {
        id: 'q2-1',
        title: 'Harmadik oldal lehetséges tartománya',
        prompt: 'Egy háromszög két oldala 6 cm és 9 cm. Milyen határok közé kell esnie a harmadik oldalnak (c)?',
        questionTypeBadge: 'Oldaltartomány',
        options: ['3 cm < c < 15 cm', '6 cm < c < 9 cm', '0 cm < c < 15 cm', '3 cm ≤ c ≤ 15 cm'],
        correctAnswer: '3 cm < c < 15 cm',
        explanation: 'A harmadik oldalnak szigorúan a különbség és összeg közé kell esnie: 9 - 6 < c < 9 + 6, vagyis 3 cm < c < 15 cm.'
      },
      {
        id: 'q2-2',
        title: 'Egyenlő szárú háromszög alapszögei',
        prompt: 'Egy egyenlő szárú háromszög szárszöge 36°. Mekkorák az alapon fekvő szögei?',
        questionTypeBadge: 'Alapszögek',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="35,65 125,65 80,12" className="fill-teal-500/10 stroke-teal-600 stroke-2" />
            <line x1="54" y1="36" x2="59" y2="41" className="stroke-teal-700 stroke-2" />
            <line x1="101" y1="41" x2="106" y2="36" className="stroke-teal-700 stroke-2" />
            <text x="80" y="25" textAnchor="middle" className="text-[9px] font-black fill-purple-700">36°</text>
            <text x="44" y="58" className="text-[9px] font-bold fill-teal-700">α = ?</text>
            <text x="100" y="58" className="text-[9px] font-bold fill-teal-700">α = ?</text>
          </svg>
        ),
        options: ['72° és 72°', '62° és 62°', '54° és 54°', '74° és 74°'],
        correctAnswer: '72° és 72°',
        explanation: 'A két alapszög összege: 180° - 36° = 144°. Mivel egyenlők, mindkettő: 144° : 2 = 72°.'
      },
      {
        id: 'q2-3',
        title: 'Nagyobb oldal - nagyobb szög',
        prompt: 'Egy háromszög oldalai a = 4 cm, b = 6 cm és c = 8 cm. Melyik a háromszög legnagyobb szöge?',
        questionTypeBadge: 'Szemközti szög',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="20,60 140,60 55,18" className="fill-indigo-500/10 stroke-indigo-600 stroke-2" />
            <text x="80" y="70" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">c = 8 cm (leghosszabb)</text>
            <text x="26" y="36" className="text-[9px] font-bold fill-slate-700">b = 6</text>
            <text x="106" y="36" className="text-[9px] font-bold fill-slate-700">a = 4</text>
            <path d="M 50,26 A 10,10 0 0,0 64,24" fill="none" className="stroke-rose-600 stroke-[2.5]" />
            <text x="56" y="37" textAnchor="middle" className="text-[10px] font-black fill-rose-600">γ = ?</text>
          </svg>
        ),
        options: ['A c = 8 cm-es oldallal szemközti γ szög', 'Az a = 4 cm-es oldallal szemközti α szög', 'A b = 6 cm-es oldallal szemközti β szög', 'Mindhárom szög egyenlő'],
        correctAnswer: 'A c = 8 cm-es oldallal szemközti γ szög',
        explanation: 'A tétel kimondja, hogy a legnagyobb oldallal szemben fekszik a legnagyobb belső szög. Mivel c = 8 cm a leghosszabb, a vele szemközti γ a legnagyobb.'
      },
      {
        id: 'q2-4',
        title: 'Elfajuló háromszög csapda',
        prompt: 'Szerkeszthető-e háromszög 5 cm, 7 cm és 12 cm hosszú szakaszokból?',
        questionTypeBadge: 'Határeset csapda',
        options: ['Nem, mert 5 + 7 = 12 cm (a pontok egy egyenesbe esnek)', 'Igen, derékszögű háromszög lesz', 'Igen, egyenlő szárú háromszög lesz', 'Igen, tompaszögű háromszög lesz'],
        correctAnswer: 'Nem, mert 5 + 7 = 12 cm (a pontok egy egyenesbe esnek)',
        explanation: 'A két rövidebb oldal összege pontosan egyenlő a leghosszabbal (5 + 7 = 12), így a csúcsok egy egyenesre esnek, nem alkotnak háromszöget.'
      },
      {
        id: 'q2-5',
        title: 'Belső szögek aránya 1:2:3',
        prompt: 'Egy háromszög belső szögeinek aránya 1 : 2 : 3. Mekkorák a háromszög szögei?',
        questionTypeBadge: 'Arányos szögek',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="25,65 135,65 25,18" className="fill-sky-500/10 stroke-sky-600 stroke-2" />
            <path d="M 25,55 L 35,55 L 35,65" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <text x="32" y="35" className="text-[9px] font-bold fill-sky-700">60°</text>
            <text x="105" y="60" className="text-[9px] font-bold fill-sky-700">30°</text>
            <text x="18" y="60" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">90°</text>
          </svg>
        ),
        options: ['30°, 60°, 90°', '20°, 40°, 60°', '30°, 45°, 105°', '40°, 60°, 80°'],
        correctAnswer: '30°, 60°, 90°',
        explanation: 'Az arányrészek összege: 1 + 2 + 3 = 6 rész. 1 rész: 180° : 6 = 30°. A szögek: 1·30° = 30°, 2·30° = 60°, 3·30° = 90° (derékszögű háromszög).'
      },
      {
        id: 'q2-6',
        title: 'Külső és belső szög kapcsolata',
        prompt: 'Egy háromszög egyik külső szöge 115°, és az egyik nem mellette fekvő belső szöge 45°. Mekkora a másik nem mellette fekvő belső szög?',
        questionTypeBadge: 'Külső szög visszafelé',
        options: ['70°', '65°', '80°', '75°'],
        correctAnswer: '70°',
        explanation: 'Mivel a külső szög egyenlő a két nem mellette fekvő belső szög összegével: 115° = 45° + β ⟹ β = 115° - 45° = 70°.'
      },
      {
        id: 'q2-7',
        title: 'Egyenlő szárú háromszög kerülete',
        prompt: 'Egy egyenlő szárú háromszög kerülete 20 cm, alapja 6 cm. Milyen hosszú egy-egy szára?',
        questionTypeBadge: 'Kerületszámítás',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="30,65 130,65 80,18" className="fill-teal-500/10 stroke-teal-600 stroke-2" />
            <line x1="52" y1="40" x2="57" y2="45" className="stroke-teal-700 stroke-2" />
            <line x1="102" y1="45" x2="107" y2="40" className="stroke-teal-700 stroke-2" />
            <text x="80" y="73" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">alap = 6 cm</text>
            <text x="44" y="38" className="text-[9px] font-bold fill-teal-700">b = ?</text>
            <text x="102" y="38" className="text-[9px] font-bold fill-teal-700">b = ?</text>
            <text x="80" y="30" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">K = 20 cm</text>
          </svg>
        ),
        options: ['7 cm', '6 cm', '8 cm', '14 cm'],
        correctAnswer: '7 cm',
        explanation: 'A két szár összege: 20 cm - 6 cm = 14 cm. Mivel a két szár egyenlő, egy-egy szár hossza: 14 cm : 2 = 7 cm.'
      },
      {
        id: 'q2-8',
        title: 'Harmadik oldal legnagyobb egész értéke',
        prompt: 'Egy háromszög két oldala 5 cm és 8 cm. Legfeljebb mekkora lehet a harmadik oldal hossza egész centiméterben kifejezve?',
        questionTypeBadge: 'Egész szélsőérték',
        options: ['12 cm', '13 cm', '11 cm', '14 cm'],
        correctAnswer: '12 cm',
        explanation: 'A háromszög-egyenlőtlenség szerint: c < 5 + 8 = 13 cm. Mivel c szigorúan kisebb 13-nál, a legnagyobb lehetséges egész érték: 12 cm.'
      },
      {
        id: 'q2-9',
        title: 'Harmadik oldal legkisebb egész értéke',
        prompt: 'Egy háromszög két oldala 5 cm és 8 cm. Legalább mekkora lehet a harmadik oldal hossza egész centiméterben kifejezve?',
        questionTypeBadge: 'Egész szélsőérték',
        options: ['4 cm', '3 cm', '5 cm', '2 cm'],
        correctAnswer: '4 cm',
        explanation: 'A háromszög-egyenlőtlenség szerint: c > 8 - 5 = 3 cm. Mivel c szigorúan nagyobb 3-nál, a legkisebb lehetséges egész érték: 4 cm.'
      },
      {
        id: 'q2-10',
        title: 'Háromszög osztályozása szögei szerint',
        prompt: 'Egy háromszög belső szögei: α = 50° és β = 70°. Milyen típusú a háromszög a szögei és oldalai szerint?',
        questionTypeBadge: 'Osztályozás',
        options: ['Hegyesszögű és általános', 'Derékszögű és általános', 'Tompaszögű és egyenlő szárú', 'Hegyesszögű és egyenlő szárú'],
        correctAnswer: 'Hegyesszögű és általános',
        explanation: 'A harmadik szög: 180° - (50° + 70°) = 60°. Mindhárom szög < 90°, így hegyesszögű; mindhárom szög különböző, így mindhárom oldal is különböző (általános).'
      }
    ]
  },

  // 3. SZINT: NEHÉZ (Összetett összefüggések, algebrai egyenletek, elméleti tételek)
  3: {
    title: '3. Szint: Összetett Geometriai Szögszámítások és Egyenletek',
    questions: [
      {
        id: 'q3-1',
        title: 'Szögek egyenlettel',
        prompt: 'Egy háromszög belső szögei: x, 2x és 3x - 12°. Mekkora a háromszög legnagyobb szöge?',
        questionTypeBadge: 'Algebrikus szög',
        options: ['84°', '96°', '64°', '90°'],
        correctAnswer: '84°',
        explanation: 'Összegük: x + 2x + (3x - 12°) = 180° ⟹ 6x - 12° = 180° ⟹ 6x = 192° ⟹ x = 32°. A szögek: 32°, 64°, és 3·32° - 12° = 84°. A legnagyobb: 84°.'
      },
      {
        id: 'q3-2',
        title: 'Egyenlő szárú külső szög feladvány',
        prompt: 'Egy egyenlő szárú háromszög egyik külső szöge 100°. Melyik lehet a háromszög belső szögeinek egy lehetséges hármasa?',
        questionTypeBadge: 'Több megoldás',
        options: ['80°, 50°, 50°', '100°, 40°, 40°', '80°, 60°, 40°', '90°, 45°, 45°'],
        correctAnswer: '80°, 50°, 50°',
        explanation: 'A 100°-os külső szög melletti belső szög 80°. Ha ez a szárszög, akkor az alapszögek (180° - 80°) : 2 = 50° és 50° (80°, 50°, 50°).'
      },
      {
        id: 'q3-3',
        title: 'Szögarányból derékszögű háromszög',
        prompt: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5. Milyen típusú a háromszög a szögei szerint?',
        questionTypeBadge: 'Arányos típus',
        options: ['Derékszögű', 'Hegyesszögű', 'Tompaszögű', 'Egyenlő szárú'],
        correctAnswer: 'Derékszögű',
        explanation: 'Arányrészek: 2 + 3 + 5 = 10 rész. 1 rész: 180° : 10 = 18°. A szögek: 36°, 54°, 90°. Mivel van 90°-os szöge, a háromszög derékszögű.'
      },
      {
        id: 'q3-4',
        title: 'Harmadik oldal egész lehetséges értékeinek száma',
        prompt: 'Egy háromszög két oldala a = 8 cm és b = 11 cm. Hány különböző egész centiméter értéket vehet fel a harmadik oldal (c)?',
        questionTypeBadge: 'Kombinatorika',
        options: ['15', '14', '16', '19'],
        correctAnswer: '15',
        explanation: 'A határok: 11 - 8 < c < 11 + 8 ⟹ 3 < c < 19. A lehetséges egész számok: 4, 5, ..., 18. Elemek száma: 18 - 4 + 1 = 15.'
      },
      {
        id: 'q3-5',
        title: 'Két szög összege a harmadik',
        prompt: 'Egy háromszögben két belső szög összege egyenlő a harmadik szöggel (α + β = γ). Mit tudunk biztosan erről a háromszögről?',
        questionTypeBadge: 'Elméleti tétel',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="20,62 140,62 80,15" className="fill-purple-500/10 stroke-purple-600 stroke-2" />
            <path d="M 72,21 L 80,27 L 88,21" fill="none" className="stroke-purple-700 stroke-[1.5]" />
            <text x="34" y="56" className="text-[9px] font-bold fill-purple-600">α</text>
            <text x="122" y="56" className="text-[9px] font-bold fill-purple-600">β</text>
            <text x="80" y="38" textAnchor="middle" className="text-[10px] font-black fill-purple-700">γ = 90°</text>
          </svg>
        ),
        options: ['Biztosan derékszögű (γ = 90°)', 'Biztosan szabályos', 'Biztosan egyenlő szárú', 'Biztosan tompaszögű'],
        correctAnswer: 'Biztosan derékszögű (γ = 90°)',
        explanation: 'Mivel α + β + γ = 180°, és α + β = γ, ezért γ + γ = 180° ⟹ 2γ = 180° ⟹ γ = 90°. Tehát a háromszög derékszögű!'
      },
      {
        id: 'q3-6',
        title: 'Derékszögű háromszög hegyesszögeinek aránya',
        prompt: 'Egy derékszögű háromszögben a két hegyesszög aránya 4 : 5. Mekkora a kisebbik hegyesszög?',
        questionTypeBadge: 'Pótszögek aránya',
        options: ['40°', '50°', '36°', '45°'],
        correctAnswer: '40°',
        explanation: 'A két hegyesszög összege 90°. 4 + 5 = 9 rész. 1 rész = 90° : 9 = 10°. A kisebbik hegyesszög: 4 · 10° = 40° (a másik 50°).'
      },
      {
        id: 'q3-7',
        title: 'Külső szögfelező hajlásszöge',
        prompt: 'Egy háromszög egyik belső szöge α = 48°. Mekkora szöget zár be az ennél a csúcsnál lévő külső szögfelező a háromszög oldalegyenesével?',
        questionTypeBadge: 'Szögfelező',
        options: ['66°', '48°', '24°', '132°'],
        correctAnswer: '66°',
        explanation: 'A külső szög: 180° - 48° = 132°. A külső szögfelező ezt felezi: 132° : 2 = 66°.'
      },
      {
        id: 'q3-8',
        title: 'Tompaszögű egyenlő szárú leghosszabb oldala',
        prompt: 'Egy egyenlő szárú háromszög szárszöge 120°. Szárai 6 cm hosszúak. Melyik a háromszög leghosszabb oldala?',
        questionTypeBadge: 'Szemközti oldal',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="15,60 145,60 80,32" className="fill-amber-500/10 stroke-amber-600 stroke-2" />
            <text x="80" y="27" textAnchor="middle" className="text-[10px] font-black fill-rose-600">120°</text>
            <text x="40" y="42" className="text-[9px] font-bold fill-amber-700">szár: 6</text>
            <text x="105" y="42" className="text-[9px] font-bold fill-amber-700">szár: 6</text>
            <text x="80" y="70" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">alap (leghosszabb!)</text>
          </svg>
        ),
        options: ['Az alap, mert a 120°-os tompaszöggel néz szembe', 'Bármelyik szár', 'Mindhárom oldal egyenlő', 'Nem állapítható meg'],
        correctAnswer: 'Az alap, mert a 120°-os tompaszöggel néz szembe',
        explanation: 'A háromszögben a legnagyobb szöggel szemben fekszik a leghosszabb oldal. Mivel a 120° a legnagyobb szög, a vele szemben fekvő alap a leghosszabb oldal.'
      },
      {
        id: 'q3-9',
        title: 'Hamis állítás kiválasztása',
        prompt: 'Ha egy háromszögben az oldalak sorrendje a < b < c, melyik állítás biztosan HAMIS?',
        questionTypeBadge: 'Logikai tétel',
        options: ['γ < 60° (a legnagyobb szög kisebb 60°-nál)', 'α < 60° (a legkisebb szög kisebb 60°-nál)', 'γ > 60° (a legnagyobb szög nagyobb 60°-nál)', 'α < β < γ'],
        correctAnswer: 'γ < 60° (a legnagyobb szög kisebb 60°-nál)',
        explanation: 'A három belső szög átlaga 180° : 3 = 60°. Ha az oldalak és szögek nem egyenlők, a legnagyobb szögnek (γ) szigorúan nagyobbnak kell lennie 60°-nál, így γ < 60° lehetetlen!'
      },
      {
        id: 'q3-10',
        title: 'Összetett lineáris egyenlet',
        prompt: 'Egy háromszög szögei: 2x - 10°, 3x + 15°, és x + 25°. Mekkora a háromszög legkisebb belső szöge?',
        questionTypeBadge: 'Záró feladat',
        options: ['40°', '50°', '35°', '45°'],
        correctAnswer: '40°',
        explanation: 'Összegük: (2x - 10) + (3x + 15) + (x + 25) = 180 ⟹ 6x + 30 = 180 ⟹ 6x = 150 ⟹ x = 25°. A szögek: 2·25 - 10 = 40°, 3·25 + 15 = 90°, és 25 + 25 = 50°. A legkisebb: 40°.'
      }
    ]
  }
};

export const TriangleSidesAnglesQuiz: React.FC<TriangleSidesAnglesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g7-geom-triangle-inequality-quiz"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 2. LECKE"
      title="2. Háromszög Oldalai és Szögei Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: háromszög-egyenlőtlenség, belső és külső szögek, szemközti oldalak"
      cheatSheetTitle="Háromszögek Szög- és Oldalösszefüggései Puskakártyák"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={
        <TriangleSidesAnglesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <TriangleSidesAnglesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default TriangleSidesAnglesQuiz;
