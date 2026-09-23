import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TrianglesAndQuadrilateralsMatcher } from './TrianglesAndQuadrilateralsMatcher';
import { TrianglesAndQuadrilateralsSorter } from './TrianglesAndQuadrilateralsSorter';
import {
  Triangle,
  Square,
  Shapes,
  Maximize2,
  Box,
  Target,
  ArrowRightLeft,
  LayoutGrid,
  Ruler
} from 'lucide-react';

interface TrianglesAndQuadrilateralsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Háromszög belső és külső szögei',
    icon: <Triangle className="w-4 h-4 text-emerald-600" />,
    formula: 'α + β + γ = 180°,  α\' = β + γ,  külső szögek: 360°',
    note: 'Bármely külső szög egyenlő a két nem mellette fekvő belső szög összegével. A belső és külső szög mellékszögek (összegük 180°).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="60,8 20,44 110,44" fill="none" className="stroke-emerald-600 stroke-[2]" />
        <line x1="110" y1="44" x2="150" y2="44" className="stroke-slate-500 stroke-[1.5]" strokeDasharray="2 2" />
        <path d="M 125 44 A 15 15 0 0 0 102 36" fill="none" className="stroke-rose-500 stroke-[1.5]" />
        <text x="120" y="38" className="text-[9px] font-bold fill-rose-600">γ'</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Háromszög-egyenlőtlenség',
    icon: <Ruler className="w-4 h-4 text-teal-600" />,
    formula: 'a + b > c,  a + c > b,  b + c > a',
    note: 'Háromszög csak akkor szerkeszthető, ha bármely két oldal összege nagyobb a harmadiknál (két rövidebb összege > leghosszabb oldal).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="140" y2="40" className="stroke-blue-600 stroke-[2.5]" />
        <line x1="20" y1="40" x2="75" y2="12" className="stroke-emerald-600 stroke-[2]" />
        <line x1="75" y1="12" x2="140" y2="40" className="stroke-teal-600 stroke-[2]" />
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Derékszögű háromszög',
    icon: <Target className="w-4 h-4 text-blue-600" />,
    formula: 'α + β = 90°,  átfogó c, befogók a, b',
    note: 'A két hegyesszög pótszög (összegük 90°). Az átfogó a leghosszabb oldal, és felezőpontja a köré írt kör középpontja (Thalész-tétel).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="35,10 35,44 125,44" fill="none" className="stroke-blue-600 stroke-[2]" />
        <rect x="35" y="34" width="10" height="10" fill="none" className="stroke-blue-500 stroke-[1.5]" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Négyszögek belső szögei',
    icon: <Square className="w-4 h-4 text-indigo-600" />,
    formula: 'α + β + γ + δ = 360°',
    note: 'Bármely négyszög egy átlóval két darab 180°-os háromszögre bontható, így a belső szögek összege mindig 360°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,12 110,8 135,44 25,44" fill="none" className="stroke-indigo-600 stroke-[2]" />
        <line x1="40" y1="12" x2="135" y2="44" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Paralelogramma és Rombusz',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: 'Paralelogramma: átlók felezik egymást | Rombusz: e ⊥ f és feleznek',
    note: 'A paralelogramma szemközti szögei egyenlők, szomszédos szögei 180°-ot adnak. A rombusz átlói merőlegesek és szögfelezők.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="50,10 120,10 95,44 25,44" fill="none" className="stroke-purple-600 stroke-[2]" />
        <line x1="50" y1="10" x2="95" y2="44" className="stroke-purple-400 stroke-[1]" strokeDasharray="2 2" />
        <line x1="120" y1="10" x2="25" y2="44" className="stroke-purple-400 stroke-[1]" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Deltoid és Trapéz',
    icon: <Box className="w-4 h-4 text-rose-600" />,
    formula: 'Deltoid: e ⊥ f, 1 szimmetriaátló | Trapéz: a ∥ c (alapok)',
    note: 'A deltoidban 2-2 szomszédos oldal egyenlő, főátlója a szimmetriatengely. A trapézban a szárakon fekvő szögek összege 180°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 120,24 80,46 40,24" fill="none" className="stroke-rose-600 stroke-[2]" />
        <line x1="80" y1="6" x2="80" y2="46" className="stroke-rose-500 stroke-[1.5]" />
        <line x1="40" y1="24" x2="120" y2="24" className="stroke-rose-400 stroke-[1]" strokeDasharray="2 2" />
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Háromszögek Fajtái és Alapszögei',
    subtitle: 'Háromszögfajták oldalak és szögek szerint, 180°-os szögösszeg, háromszög-egyenlőtlenség',
    range: '1 - 10. feladat',
    focus: 'Háromszögek Alapjai',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Mennyi bármely síkbeli háromszög belső szögeinek összege?',
        questionTypeBadge: 'Alaptétel',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="75,10 20,60 130,60" fill="none" className="stroke-emerald-600 stroke-[2.5]" />
            <path d="M 35 60 A 15 15 0 0 0 30 50" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
            <path d="M 115 60 A 15 15 0 0 1 120 50" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
            <path d="M 68 20 A 12 12 0 0 0 82 20" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
            <text x="35" y="55" className="text-[10px] font-bold fill-emerald-700">α</text>
            <text x="108" y="55" className="text-[10px] font-bold fill-emerald-700">β</text>
            <text x="71" y="32" className="text-[10px] font-bold fill-emerald-700">γ</text>
          </svg>
        ),
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: '180°',
        explanation: 'Minden síkbeli háromszög belső szögeinek összege pontosan 180° (egyenesszög): α + β + γ = 180°.',
        breakdown: [
          { label: 'Tétel', value: 'Belső szögek összege síkháromszögben' },
          { label: 'Összeg', value: '180°' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Egy háromszög két belső szöge 55° és 65°. Mekkora a harmadik belső szöge?',
        questionTypeBadge: 'Szögszámítás',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="70,12 18,60 132,60" fill="none" className="stroke-teal-600 stroke-[2.5]" />
            <path d="M 33 60 A 15 15 0 0 0 28 50" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <path d="M 117 60 A 15 15 0 0 1 122 50" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <text x="35" y="56" className="text-[10px] font-mono font-bold fill-teal-700">55°</text>
            <text x="104" y="56" className="text-[10px] font-mono font-bold fill-teal-700">65°</text>
            <text x="66" y="30" className="text-[12px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['60°', '70°', '50°', '80°'],
        correctAnswer: '60°',
        explanation: 'γ = 180° - (55° + 65°) = 180° - 120° = 60°.',
        breakdown: [
          { label: 'Két szög összege', value: '55° + 65° = 120°' },
          { label: 'Kivonás 180°-ból', value: '180° - 120° = 60°' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Hány fokosak a szabályos (egyenlő oldalú) háromszög belső szögei?',
        questionTypeBadge: 'Háromszögfajta',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,8 20,62 120,62" fill="none" className="stroke-purple-600 stroke-[2.5]" />
            <line x1="42" y1="34" x2="48" y2="36" className="stroke-purple-500 stroke-[2]" />
            <line x1="92" y1="34" x2="98" y2="36" className="stroke-purple-500 stroke-[2]" />
            <line x1="68" y1="59" x2="72" y2="65" className="stroke-purple-500 stroke-[2]" />
            <text x="64" y="32" className="text-[9px] font-bold fill-purple-700">60°</text>
          </svg>
        ),
        options: ['60°', '90°', '45°', '120°'],
        correctAnswer: '60°',
        explanation: 'Mivel a szabályos háromszög mindhárom oldala és mindhárom szöge egyenlő, ezért 180° / 3 = 60°.',
        breakdown: [
          { label: 'Tulajdonság', value: '3 egyenlő belső szög' },
          { label: 'Számítás', value: '180° / 3 = 60°' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Egy derékszögű háromszög egyik hegyesszöge 38°. Mekkora a másik hegyesszöge?',
        questionTypeBadge: 'Derékszögű háromszög',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="25,12 25,60 120,60" fill="none" className="stroke-blue-600 stroke-[2.5]" />
            <rect x="25" y="50" width="10" height="10" fill="none" className="stroke-blue-500 stroke-[1.5]" />
            <path d="M 105 60 A 15 15 0 0 1 110 50" fill="none" className="stroke-blue-500 stroke-[1.5]" />
            <text x="92" y="56" className="text-[9px] font-mono font-bold fill-blue-700">38°</text>
            <text x="32" y="26" className="text-[11px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['52°', '62°', '42°', '142°'],
        correctAnswer: '52°',
        explanation: 'A derékszögű háromszögben a két hegyesszög összege 90°: 90° - 38° = 52°.',
        breakdown: [
          { label: 'Szabály', value: 'A két hegyesszög összege: α + β = 90°' },
          { label: 'Számítás', value: '90° - 38° = 52°' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Szerkeszthető-e háromszög az a = 4 cm, b = 5 cm és c = 10 cm hosszúságú szakaszokból?',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        figure: (
          <svg viewBox="0 0 150 65" className="w-36 h-16 mx-auto">
            <line x1="15" y1="52" x2="135" y2="52" className="stroke-slate-700 stroke-[2.5]" />
            <line x1="15" y1="52" x2="55" y2="30" className="stroke-rose-600 stroke-[2]" />
            <line x1="135" y1="52" x2="85" y2="30" className="stroke-rose-600 stroke-[2]" />
            <text x="65" y="59" className="text-[9px] font-mono font-bold fill-slate-700">c = 10</text>
            <text x="24" y="36" className="text-[9px] font-mono font-bold fill-rose-600">4</text>
            <text x="112" y="36" className="text-[9px] font-mono font-bold fill-rose-600">5</text>
            <text x="66" y="28" className="text-[10px] font-bold fill-rose-600">Rés!</text>
          </svg>
        ),
        options: [
          'Nem, mert a két rövidebb oldal összege kisebb a harmadiknál (4 + 5 = 9 < 10)',
          'Igen, mert mindhárom oldal pozitív',
          'Igen, mert tompaszögű háromszög lesz',
          'Nem, mert nincs derékszöge'
        ],
        correctAnswer: 'Nem, mert a két rövidebb oldal összege kisebb a harmadiknál (4 + 5 = 9 < 10)',
        explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összege nagyobb kell legyen a harmadiknál. Mivel 4 + 5 = 9, ami kisebb mint 10, a két szakasz nem éri el egymást, így nem szerkeszthető háromszög.',
        breakdown: [
          { label: 'Feltétel', value: 'a + b > c' },
          { label: 'Ellenőrzés', value: '4 + 5 = 9 < 10 (NEM teljesül)' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Egy egyenlő szárú háromszög szárszöge (a két szár által bezárt szög) 40°. Mekkorák az alapon fekvő szögei?',
        questionTypeBadge: 'Egyenlő szárú háromszög',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,10 25,62 115,62" fill="none" className="stroke-indigo-600 stroke-[2.5]" />
            <line x1="45" y1="34" x2="49" y2="38" className="stroke-indigo-500 stroke-[2]" />
            <line x1="91" y1="34" x2="95" y2="38" className="stroke-indigo-500 stroke-[2]" />
            <text x="64" y="26" className="text-[9px] font-mono font-bold fill-indigo-700">40°</text>
            <text x="35" y="58" className="text-[11px] font-bold fill-rose-600">?</text>
            <text x="96" y="58" className="text-[11px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['70° és 70°', '40° és 40°', '60° és 60°', '80° és 80°'],
        correctAnswer: '70° és 70°',
        explanation: 'Az alapon fekvő két szög egyenlő. Összegük: 180° - 40° = 140°. Így egy-egy alapon fekvő szög: 140° / 2 = 70°.',
        breakdown: [
          { label: 'Alapszögek összege', value: '180° - 40° = 140°' },
          { label: 'Egy-egy alapszög', value: '140° / 2 = 70°' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Milyen típusú az a háromszög, amelynek belső szögei 25°, 35° és 120°?',
        questionTypeBadge: 'Háromszögfajta',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="35,16 10,54 130,54" fill="none" className="stroke-amber-600 stroke-[2.5]" />
            <path d="M 45 28 A 12 12 0 0 1 28 32" fill="none" className="stroke-amber-500 stroke-[1.5]" />
            <text x="40" y="32" className="text-[9px] font-mono font-bold fill-amber-700">120°</text>
            <text x="18" y="50" className="text-[8px] font-mono font-bold fill-amber-700">35°</text>
            <text x="108" y="50" className="text-[8px] font-mono font-bold fill-amber-700">25°</text>
          </svg>
        ),
        options: ['Tompaszögű és általános', 'Hegyesszögű és egyenlő szárú', 'Derékszögű', 'Szabályos'],
        correctAnswer: 'Tompaszögű és általános',
        explanation: 'Mivel a 120°-os szög nagyobb 90°-nál, a háromszög tompaszögű. Mivel mindhárom szöge különböző nagyságú, az oldalai is különböznek, tehát általános háromszög.',
        breakdown: [
          { label: 'Legnagyobb szög', value: '120° > 90° → Tompaszögű' },
          { label: 'Szögek viszonya', value: 'Minden szög különböző → Általános' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Egy egyenlő szárú háromszög egyik alapon fekvő szöge 50°. Mekkora a szárszöge?',
        questionTypeBadge: 'Egyenlő szárú háromszög',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,12 25,62 115,62" fill="none" className="stroke-teal-600 stroke-[2.5]" />
            <text x="66" y="30" className="text-[12px] font-bold fill-rose-600">?</text>
            <text x="36" y="58" className="text-[9px] font-mono font-bold fill-teal-700">50°</text>
            <text x="94" y="58" className="text-[9px] font-mono font-bold fill-teal-700">50°</text>
          </svg>
        ),
        options: ['80°', '50°', '65°', '100°'],
        correctAnswer: '80°',
        explanation: 'Mindkét alapon fekvő szög 50°, így összegük 50° + 50° = 100°. A szárszög: 180° - 100° = 80°.',
        breakdown: [
          { label: 'Két alapszög összege', value: '50° + 50° = 100°' },
          { label: 'Szárszög', value: '180° - 100° = 80°' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Melyik oldalpár szerkeszthető az alábbiak közül harmadikként a 7 cm és 9 cm mellé?',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="65,12 20,54 125,54" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <text x="32" y="32" className="text-[9px] font-mono font-bold fill-indigo-700">a = 7</text>
            <text x="96" y="32" className="text-[9px] font-mono font-bold fill-indigo-700">b = 9</text>
            <text x="68" y="62" className="text-[10px] font-bold fill-rose-600">c = ?</text>
          </svg>
        ),
        options: ['5 cm', '16 cm', '2 cm', '18 cm'],
        correctAnswer: '5 cm',
        explanation: 'A harmadik oldalnak nagyobbnak kell lennie a két oldal különbségénél (9 - 7 = 2 cm) és kisebbnek az összegüknél (9 + 7 = 16 cm): 2 < c < 16. Az egyetlen megengedett érték az 5 cm.',
        breakdown: [
          { label: 'Alsó korlát', value: '|b - a| = 9 - 7 = 2 cm' },
          { label: 'Felső korlát', value: 'a + b = 7 + 9 = 16 cm' },
          { label: 'Megfelelő oldal', value: '5 cm (2 < 5 < 16)' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Hogyan nevezzük a derékszögű háromszög derékszöggel szemközti leghosszabb oldalát?',
        questionTypeBadge: 'Elnevezések',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="25,12 25,60 120,60" fill="none" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="25" y1="12" x2="120" y2="60" className="stroke-rose-600 stroke-[3]" />
            <rect x="25" y="50" width="10" height="10" fill="none" className="stroke-slate-400 stroke-[1]" />
            <text x="75" y="32" className="text-[11px] font-bold fill-rose-600">c = ?</text>
            <text x="14" y="38" className="text-[9px] font-mono font-bold fill-slate-500">a</text>
            <text x="70" y="68" className="text-[9px] font-mono font-bold fill-slate-500">b</text>
          </svg>
        ),
        options: ['Átfogó', 'Befogó', 'Alap', 'Szár'],
        correctAnswer: 'Átfogó',
        explanation: 'A derékszögű háromszög derékszöggel szemközti oldala az átfogó (hagyományosan c), a derékszöget bezáró két oldal pedig a befogó (a és b).',
        breakdown: [
          { label: 'Derékszöggel szemben', value: 'Átfogó (leghosszabb oldal)' },
          { label: 'Derékszög szárai', value: 'Befogók' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Négyszögek Fajtái, Tulajdonságai és Szögei',
    subtitle: 'Belső szögek összege (360°), trapéz, paralelogramma, téglalap, rombusz, négyzet és deltoid',
    range: '11 - 20. feladat',
    focus: 'Négyszögek Tulajdonságai',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    iconBg: 'bg-teal-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Mennyi bármely konvex négyszög belső szögeinek összege?',
        questionTypeBadge: 'Négyszög alaptétel',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="35,14 115,10 135,58 20,58" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <line x1="35" y1="14" x2="135" y2="58" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="3 3" />
            <text x="45" y="44" className="text-[10px] font-bold fill-indigo-600">180°</text>
            <text x="85" y="28" className="text-[10px] font-bold fill-indigo-600">180°</text>
          </svg>
        ),
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: '360°',
        explanation: 'Egy átló behúzásával a négyszög két háromszögre bontható. Mindkét háromszög szögeinek összege 180°, így a négyszög belső szögeinek összege 2 · 180° = 360°.',
        breakdown: [
          { label: 'Háromszögekre bontás', value: '2 db háromszög' },
          { label: 'Összeg', value: '2 · 180° = 360°' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Egy négyszög három belső szöge 70°, 110° és 85°. Mekkora a negyedik belső szöge?',
        questionTypeBadge: 'Szögszámítás',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="40,12 110,12 135,58 15,58" fill="none" className="stroke-teal-600 stroke-[2]" />
            <text x="25" y="52" className="text-[9px] font-mono font-bold fill-teal-700">70°</text>
            <text x="110" y="52" className="text-[9px] font-mono font-bold fill-teal-700">85°</text>
            <text x="90" y="24" className="text-[9px] font-mono font-bold fill-teal-700">110°</text>
            <text x="44" y="24" className="text-[11px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['95°', '105°', '85°', '75°'],
        correctAnswer: '95°',
        explanation: 'δ = 360° - (70° + 110° + 85°) = 360° - 265° = 95°.',
        breakdown: [
          { label: 'Ismert 3 szög összege', value: '70° + 110° + 85° = 265°' },
          { label: 'Negyedik szög', value: '360° - 265° = 95°' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Melyik négyszög definíciója a következő: „Két pár párhuzamos oldallal rendelkező négyszög”?',
        questionTypeBadge: 'Négyszögfajta',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="35,12 115,12 90,52 10,52" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <line x1="60" y1="9" x2="65" y2="12" className="stroke-indigo-500 stroke-[1.5]" />
            <line x1="45" y1="49" x2="50" y2="52" className="stroke-indigo-500 stroke-[1.5]" />
            <text x="60" y="36" className="text-[10px] font-bold fill-indigo-700">a ∥ c, b ∥ d</text>
          </svg>
        ),
        options: ['Paralelogramma', 'Trapéz', 'Deltoid', 'Általános négyszög'],
        correctAnswer: 'Paralelogramma',
        explanation: 'A paralelogramma olyan négyszög, amelynek szemközti oldalai párban párhuzamosak (két pár párhuzamos oldalpárja van).',
        breakdown: [
          { label: 'Feltétel', value: '2 pár párhuzamos oldal' },
          { label: 'Négyszög', value: 'Paralelogramma' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Egy paralelogramma egyik belső szöge 65°. Mekkorák a többi belső szögei?',
        questionTypeBadge: 'Paralelogramma szögei',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="35,12 115,12 90,52 10,52" fill="none" className="stroke-blue-600 stroke-[2]" />
            <text x="20" y="48" className="text-[9px] font-mono font-bold fill-blue-700">65°</text>
            <text x="90" y="24" className="text-[9px] font-mono font-bold fill-blue-700">65°</text>
            <text x="35" y="24" className="text-[10px] font-bold fill-rose-600">?</text>
            <text x="75" y="48" className="text-[10px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: [
          '65°, 115°, 115°',
          '65°, 65°, 65°',
          '115°, 115°, 115°',
          '25°, 65°, 25°'
        ],
        correctAnswer: '65°, 115°, 115°',
        explanation: 'A paralelogramma szemközti szögei egyenlők (65° és 65°), a szomszédos szögek összege pedig 180°: 180° - 65° = 115°. Így a szögek: 65°, 115°, 65°, 115°.',
        breakdown: [
          { label: 'Szemközti szög', value: '65°' },
          { label: 'Szomszédos szög', value: '180° - 65° = 115°' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Melyik négyszögnek merőlegesek egymásra az átlói ÉS egyenlő hosszú mind a 4 oldala?',
        questionTypeBadge: 'Átlótulajdonság',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <polygon points="65,6 115,32 65,58 15,32" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="65" y1="6" x2="65" y2="58" className="stroke-purple-500 stroke-[1.5]" />
            <line x1="15" y1="32" x2="115" y2="32" className="stroke-purple-500 stroke-[1.5]" />
            <rect x="65" y="26" width="6" height="6" fill="none" className="stroke-purple-400 stroke-[1]" />
          </svg>
        ),
        options: ['Rombusz (és négyzet)', 'Téglalap', 'Trapéz', 'Általános paralelogramma'],
        correctAnswer: 'Rombusz (és négyzet)',
        explanation: 'A rombusz mind a 4 oldala egyenlő, és átlói merőlegesen felezik egymást (e ⊥ f). Ennek speciális derékszögű esete a négyzet.',
        breakdown: [
          { label: '4 egyenlő oldal', value: 'Rombusz' },
          { label: 'Átlók', value: 'Merőlegesen felezik egymást' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Mi igaz a téglalap átlóira?',
        questionTypeBadge: 'Téglalap tulajdonságai',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <rect x="15" y="12" width="110" height="42" fill="none" className="stroke-blue-600 stroke-[2]" />
            <line x1="15" y1="12" x2="125" y2="54" className="stroke-blue-400 stroke-[1.5]" />
            <line x1="125" y1="12" x2="15" y2="54" className="stroke-blue-400 stroke-[1.5]" />
            <circle cx="70" cy="33" r="2.5" className="fill-blue-700" />
            <text x="73" y="32" className="text-[9px] font-bold fill-blue-700">O</text>
          </svg>
        ),
        options: [
          'Egyenlő hosszúak és felezik egymást',
          'Merőlegesek egymásra és különböző hosszúak',
          'Nem felezik egymást',
          'Csak akkor egyenlők, ha négyzet'
        ],
        correctAnswer: 'Egyenlő hosszúak és felezik egymást',
        explanation: 'A téglalap átlói mindig egyenlő hosszúak (e = f), és mivel paralelogramma, felezik egymást. Metszéspontjuk a téglalap köré írt kör középpontja.',
        breakdown: [
          { label: 'Hossz', value: 'e = f (egyenlő hosszúak)' },
          { label: 'Metszéspont', value: 'Kölcsönösen felezik egymást' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Hány szimmetriatengellyel rendelkezik a négyzet?',
        questionTypeBadge: 'Szimmetria',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <rect x="35" y="10" width="50" height="50" fill="none" className="stroke-emerald-600 stroke-[2]" />
            <line x1="60" y1="4" x2="60" y2="66" className="stroke-emerald-400 stroke-[1]" strokeDasharray="2 2" />
            <line x1="29" y1="35" x2="91" y2="35" className="stroke-emerald-400 stroke-[1]" strokeDasharray="2 2" />
            <line x1="31" y1="6" x2="89" y2="64" className="stroke-emerald-400 stroke-[1]" strokeDasharray="2 2" />
            <line x1="89" y1="6" x2="31" y2="64" className="stroke-emerald-400 stroke-[1]" strokeDasharray="2 2" />
          </svg>
        ),
        options: ['4 db', '2 db', '1 db', 'Végtelen sok'],
        correctAnswer: '4 db',
        explanation: 'A négyzetnek 4 szimmetriatengelye van: 2 oldalfelező merőleges és 2 átlóegyenes.',
        breakdown: [
          { label: 'Oldalfelezők', value: '2 db' },
          { label: 'Átlók', value: '2 db' },
          { label: 'Összesen', value: '4 db szimmetriatengely' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Milyen alakzat a deltoid?',
        questionTypeBadge: 'Deltoid fogalma',
        figure: (
          <svg viewBox="0 0 120 65" className="w-28 h-16 mx-auto">
            <polygon points="60,6 95,25 60,58 25,25" fill="none" className="stroke-rose-600 stroke-[2]" />
            <line x1="60" y1="6" x2="60" y2="58" className="stroke-rose-500 stroke-[1.5]" />
            <line x1="25" y1="25" x2="95" y2="25" className="stroke-rose-400 stroke-[1.5]" strokeDasharray="2 2" />
          </svg>
        ),
        options: [
          'Olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszú',
          'Olyan négyszög, amelynek szemközti oldalai párhuzamosak',
          'Olyan trapéz, amelynek szárai párhuzamosak',
          'Szabályos négyszög'
        ],
        correctAnswer: 'Olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszú',
        explanation: 'A deltoid olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszúságú (a = b és c = d). Átlói merőlegesek egymásra, és a szimmetriaátló felezi a másik átlót.',
        breakdown: [
          { label: 'Oldalpárok', value: 'Két-két szomszédos oldal egyenlő' },
          { label: 'Átlók', value: 'Merőlegesek egymásra (e ⊥ f)' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Egy trapéz párhuzamos alapjai közötti száron fekvő szögei közül az egyik 75°. Mekkora a száron lévő másik szög?',
        questionTypeBadge: 'Trapéz szögei',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="35,12 95,12 120,52 15,52" fill="none" className="stroke-teal-600 stroke-[2]" />
            <text x="24" y="48" className="text-[9px] font-mono font-bold fill-teal-700">75°</text>
            <text x="44" y="24" className="text-[11px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['105°', '75°', '95°', '115°'],
        correctAnswer: '105°',
        explanation: 'Mivel a trapéz alapjai párhuzamosak, az ugyanazon a száron fekvő belső szögek társszögek, összegük mindig 180°: 180° - 75° = 105°.',
        breakdown: [
          { label: 'Összefüggés', value: 'Száron fekvő szögek összege: 180°' },
          { label: 'Számítás', value: '180° - 75° = 105°' }
        ]
      },
      {
        id: 'q20',
        prompt: 'Melyik állítás HAMIS az alábbiak közül?',
        questionTypeBadge: 'Családfa logika',
        figure: (
          <svg viewBox="0 0 160 65" className="w-36 h-16 mx-auto">
            <rect x="15" y="8" width="130" height="50" rx="8" className="fill-slate-50 stroke-slate-400 stroke-[1]" />
            <rect x="25" y="16" width="110" height="34" rx="6" className="fill-indigo-50 stroke-indigo-400 stroke-[1]" />
            <text x="35" y="14" className="text-[8px] font-bold fill-slate-600">Trapézok</text>
            <text x="45" y="32" className="text-[8px] font-bold fill-indigo-700">Paralelogrammák</text>
          </svg>
        ),
        options: [
          'Minden trapéz paralelogramma',
          'Minden négyzet rombusz',
          'Minden négyzet téglalap',
          'Minden rombusz paralelogramma'
        ],
        correctAnswer: 'Minden trapéz paralelogramma',
        explanation: 'Ez az állítás hamis! Fordítva igaz: minden paralelogramma trapéz (mert van párhuzamos oldalpárja), de nem minden trapéz paralelogramma (egy általános trapéznak csak 1 pár párhuzamos oldala van, nem 2).',
        breakdown: [
          { label: 'Hamis állítás', value: '„Minden trapéz paralelogramma”' },
          { label: 'Helyes szabály', value: 'A paralelogramma a trapéz speciális esete' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Szögszámítások, Külső Szögek és Mester Feladatok',
    subtitle: 'Külső szög tétele, szimmetriák, rombusz és deltoid átlói, húrnégyszögek',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Bizonyítások',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Egy háromszög két belső szöge 42° és 68°. Mekkora a harmadik csúcsnál lévő KÜLSŐ szög?',
        questionTypeBadge: 'Külső szög tétele',
        figure: (
          <svg viewBox="0 0 150 65" className="w-36 h-16 mx-auto">
            <polygon points="60,10 18,52 105,52" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="105" y1="52" x2="140" y2="52" className="stroke-slate-500 stroke-[1.5]" strokeDasharray="2 2" />
            <path d="M 120 52 A 15 15 0 0 0 98 44" fill="none" className="stroke-rose-500 stroke-[1.5]" />
            <text x="28" y="48" className="text-[9px] font-mono font-bold fill-purple-700">42°</text>
            <text x="56" y="28" className="text-[9px] font-mono font-bold fill-purple-700">68°</text>
            <text x="114" y="44" className="text-[11px] font-bold fill-rose-600">γ' = ?</text>
          </svg>
        ),
        options: ['110°', '70°', '138°', '112°'],
        correctAnswer: '110°',
        explanation: 'A külső szög tétele szerint bármely külső szög egyenlő a két nem mellette fekvő belső szög összegével: γ\' = α + β = 42° + 68° = 110°.',
        breakdown: [
          { label: 'Tétel', value: 'γ\' = α + β' },
          { label: 'Számítás', value: '42° + 68° = 110°' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Egy háromszög egyik külső szöge 130°, az egyik nem mellette fekvő belső szöge 45°. Mekkora a másik nem mellette fekvő belső szög?',
        questionTypeBadge: 'Külső szög alkalmazása',
        figure: (
          <svg viewBox="0 0 150 65" className="w-36 h-16 mx-auto">
            <polygon points="65,10 20,52 105,52" fill="none" className="stroke-teal-600 stroke-[2]" />
            <line x1="105" y1="52" x2="140" y2="52" className="stroke-slate-500 stroke-[1.5]" strokeDasharray="2 2" />
            <text x="32" y="48" className="text-[9px] font-mono font-bold fill-teal-700">45°</text>
            <text x="64" y="28" className="text-[11px] font-bold fill-rose-600">?</text>
            <text x="112" y="45" className="text-[9px] font-mono font-bold fill-rose-600">130°</text>
          </svg>
        ),
        options: ['85°', '95°', '50°', '135°'],
        correctAnswer: '85°',
        explanation: 'Mivel a külső szög a két belső szög összege (130° = 45° + β), ezért a hiányzó belső szög: 130° - 45° = 85°.',
        breakdown: [
          { label: 'Összefüggés', value: 'α\' = β + γ' },
          { label: 'Számítás', value: '130° - 45° = 85°' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Mennyi bármely konvex sokszög (pl. háromszög, négyszög, ötszög) KÜLSŐ szögeinek összege?',
        questionTypeBadge: 'Sokszögek tétele',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,10 115,35 90,62 50,62 25,35" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="70" cy="38" r="16" fill="none" className="stroke-rose-400 stroke-[1.5]" strokeDasharray="3 3" />
            <text x="58" y="42" className="text-[10px] font-bold fill-rose-600">360°</text>
          </svg>
        ),
        options: ['360°', '180°', '540°', 'Változó, az oldalszámtól függ'],
        correctAnswer: '360°',
        explanation: 'Bármely síkbeli konvex sokszög külső szögeinek összege mindig állandó: pontosan 360° (egy teljes körülfordulás).',
        breakdown: [
          { label: 'Szabály', value: 'Minden konvex sokszögre érvényes' },
          { label: 'Érték', value: '360°' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Egy rombusz egyik belső szöge 50°. Mekkora szögeket zárnak be az átlói az oldalakkal?',
        questionTypeBadge: 'Rombusz átlók',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <polygon points="65,6 115,32 65,58 15,32" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="65" y1="6" x2="65" y2="58" className="stroke-purple-500 stroke-[1.5]" />
            <line x1="15" y1="32" x2="115" y2="32" className="stroke-purple-500 stroke-[1.5]" />
            <text x="24" y="30" className="text-[8px] font-bold fill-purple-700">25°</text>
            <text x="54" y="16" className="text-[8px] font-bold fill-purple-700">65°</text>
          </svg>
        ),
        options: ['25° és 65°', '50° és 130°', '45° és 45°', '25° és 90°'],
        correctAnswer: '25° és 65°',
        explanation: 'A rombusz átlói felezik a belső szögeket: az 50°-os szöget 25°-25°-ra osztja. Mivel az átlók derékszögben (90°) metszik egymást, a keletkező derékszögű háromszög másik hegyesszöge: 90° - 25° = 65°.',
        breakdown: [
          { label: 'Szögfelezés', value: '50° / 2 = 25°' },
          { label: 'Derékszögű háromszög másik szöge', value: '90° - 25° = 65°' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Egy húrtrapéz (szimmetrikus trapéz) egyik tompaszöge 124°. Mekkorák a többi belső szögei?',
        questionTypeBadge: 'Szimmetrikus trapéz',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="35,12 105,12 125,52 15,52" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <text x="32" y="24" className="text-[9px] font-mono font-bold fill-indigo-700">124°</text>
            <text x="86" y="24" className="text-[9px] font-mono font-bold fill-indigo-700">124°</text>
            <text x="24" y="48" className="text-[10px] font-bold fill-rose-600">?</text>
            <text x="108" y="48" className="text-[10px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: [
          '124°, 56°, 56°',
          '124°, 124°, 56°',
          '56°, 56°, 56°',
          '90°, 90°, 56°'
        ],
        correctAnswer: '124°, 56°, 56°',
        explanation: 'A húrtrapéz szimmetriája miatt az azonos alapon fekvő szögek egyenlők: a két tompaszög 124° és 124°. A száron fekvő hegyesszög: 180° - 124° = 56°. Így a szögek: 124°, 124°, 56°, 56°.',
        breakdown: [
          { label: 'Azonos alapon', value: 'Két tompaszög: 124° és 124°' },
          { label: 'Száron fekvő szög', value: '180° - 124° = 56° (mindkét hegyesszög 56°)' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Mikor nevezünk egy négyszöget HÚRNÉGYSZÖGNEK?',
        questionTypeBadge: 'Húrnégyszög tétel',
        figure: (
          <svg viewBox="0 0 130 70" className="w-32 h-16 mx-auto">
            <circle cx="65" cy="35" r="28" fill="none" className="stroke-teal-400 stroke-[1.5]" />
            <polygon points="65,7 93,30 75,62 38,42" fill="none" className="stroke-teal-700 stroke-[2]" />
            <text x="60" y="22" className="text-[8px] font-bold fill-teal-800">α</text>
            <text x="68" y="54" className="text-[8px] font-bold fill-teal-800">γ</text>
          </svg>
        ),
        options: [
          'Ha írható köré kör (szemközti szögeinek összege 180°)',
          'Ha írható bele kör (szemközti oldalainak összege egyenlő)',
          'Ha mind a 4 oldala húr alakú',
          'Ha átlói merőlegesek'
        ],
        correctAnswer: 'Ha írható köré kör (szemközti szögeinek összege 180°)',
        explanation: 'A húrnégyszög olyan négyszög, amely köré kör írható (minden csúcsa egy körön fekszik). Szükséges és elégséges feltétele, hogy szemközti szögeinek összege 180° legyen (α + γ = 180° és β + δ = 180°).',
        breakdown: [
          { label: 'Definíció', value: 'Köré írható kör' },
          { label: 'Tétel', value: 'Szemközti szögek összege = 180°' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Egy húrnégyszög három egymást követő szöge 82°, 105° és γ. Mekkora a γ szög?',
        questionTypeBadge: 'Húrnégyszög számítás',
        figure: (
          <svg viewBox="0 0 130 70" className="w-32 h-16 mx-auto">
            <circle cx="65" cy="35" r="28" fill="none" className="stroke-indigo-400 stroke-[1.5]" />
            <polygon points="65,7 93,30 75,62 38,42" fill="none" className="stroke-indigo-700 stroke-[2]" />
            <text x="56" y="22" className="text-[8px] font-mono font-bold fill-indigo-800">82°</text>
            <text x="70" y="54" className="text-[10px] font-bold fill-rose-600">γ = ?</text>
          </svg>
        ),
        options: ['98°', '75°', '82°', '115°'],
        correctAnswer: '98°',
        explanation: 'Húrnégyszögben a szemközti szögek összege 180°. Az α (82°) szöggel szemben a γ szög áll: γ = 180° - 82° = 98°.',
        breakdown: [
          { label: 'Tétel', value: 'α + γ = 180°' },
          { label: 'Számítás', value: '180° - 82° = 98°' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Egy deltoid szimmetriaátlója a deltoidot két háromszögre bontja. Milyenek ezek a háromszögek?',
        questionTypeBadge: 'Deltoid szimmetria',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <polygon points="65,6 100,26 65,58 30,26" fill="none" className="stroke-rose-600 stroke-[2]" />
            <line x1="65" y1="6" x2="65" y2="58" className="stroke-rose-500 stroke-[2]" />
            <text x="42" y="32" className="text-[8px] font-bold fill-rose-700">T1</text>
            <text x="78" y="32" className="text-[8px] font-bold fill-rose-700">T2</text>
          </svg>
        ),
        options: [
          'Két egybevágó háromszögre',
          'Két különböző területű háromszögre',
          'Két szabályos háromszögre',
          'Két tompaszögű háromszögre'
        ],
        correctAnswer: 'Két egybevágó háromszögre',
        explanation: 'A deltoid szimmetriaátlója (a két különböző csúcsot összekötő főátló) tengelyes szimmetriatengely, így a deltoidot két egymással tükrös, egybevágó háromszögre osztja.',
        breakdown: [
          { label: 'Szimmetriaátló', value: 'Tengelyes szimmetriát biztosít' },
          { label: 'Rész háromszögek', value: 'Egybevágóak' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Egy derékszögű háromszög átfogója 20 cm. Mekkora a köré írt kör sugara (R)?',
        questionTypeBadge: 'Thalész-tétel',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <path d="M 20 52 A 50 50 0 0 1 120 52" fill="none" className="stroke-blue-400 stroke-[1.5]" strokeDasharray="3 3" />
            <polygon points="50,14 20,52 120,52" fill="none" className="stroke-blue-600 stroke-[2]" />
            <circle cx="70" cy="52" r="2.5" className="fill-blue-700" />
            <text x="67" y="64" className="text-[8px] font-bold fill-blue-700">O</text>
            <text x="56" y="46" className="text-[8px] font-mono font-bold fill-blue-700">c = 20</text>
          </svg>
        ),
        options: ['10 cm', '20 cm', '5 cm', '15 cm'],
        correctAnswer: '10 cm',
        explanation: 'A Thalész-tétel szerint a derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja. Az átmérő maga az átfogó (c = 2R), így a sugár R = 20 / 2 = 10 cm.',
        breakdown: [
          { label: 'Köré írt kör átmérője', value: '2R = c = 20 cm' },
          { label: 'Sugár', value: 'R = 10 cm' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Egy derékszögű trapéz egyik szöge 48°. Hány fokos a trapéz negyedik (nem derékszögű) szöge?',
        questionTypeBadge: 'Derékszögű trapéz',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-16 mx-auto">
            <polygon points="25,12 80,12 115,52 25,52" fill="none" className="stroke-teal-600 stroke-[2]" />
            <rect x="25" y="44" width="8" height="8" fill="none" className="stroke-teal-500 stroke-[1]" />
            <rect x="25" y="12" width="8" height="8" fill="none" className="stroke-teal-500 stroke-[1]" />
            <text x="86" y="48" className="text-[9px] font-mono font-bold fill-teal-700">48°</text>
            <text x="75" y="24" className="text-[10px] font-bold fill-rose-600">?</text>
          </svg>
        ),
        options: ['132°', '142°', '48°', '90°'],
        correctAnswer: '132°',
        explanation: 'A derékszögű trapéz két szöge 90° (a merőleges száron). A ferde száron lévő két szög összege szintén 180° (társszögek). Így a negyedik szög: 180° - 48° = 132°.',
        breakdown: [
          { label: 'Derékszögek', value: '90° és 90°' },
          { label: 'Ferde szár szögei', value: '48° + x = 180° → x = 132°' }
        ]
      }
    ]
  }
};

export const TrianglesAndQuadrilateralsQuiz: React.FC<TrianglesAndQuadrilateralsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-geom-trans"
      topicId="g7-geom-triangles-quads"
      topicTitle="3. Háromszögek és négyszögek"
      subtopicId="haromszogek-es-negyszogek"
      documentId="grade-7-geometriai-transzformaciok-haromszogek-es-negyszogek-quiz"
      emoji="📐"
      topicBadge="7. Osztály • Matematika III. Témakör"
      badgeText="7. Osztály • Matematika III. Témakör"
      title="3. Háromszögek és négyszögek Kvíz"
      subtitle="Gyakorold a háromszögek és négyszögek fajtáit, belső és külső szögeit, a háromszög-egyenlőtlenséget és az átlók tulajdonságait 30 válogatott feladattal és ábrákkal!"
      cheatSheetTitle="Háromszögek és Négyszögek Puska & Képtár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="emerald"
      hintText="💡 Ügyelj a belső szögek összegére (háromszög: 180°, négyszög: 360°), a külső szög tételére és az átlók szimmetriáira!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a síkidomokat ábráikkal és definícióikkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <TrianglesAndQuadrilateralsMatcher
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
          subtitle: 'Kategorizáld a háromszögeket és négyszögeket tulajdonságaik szerint!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <TrianglesAndQuadrilateralsSorter
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

export default TrianglesAndQuadrilateralsQuiz;
