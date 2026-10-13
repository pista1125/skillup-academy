import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PolygonAnglesDiagonalsMatcher } from './PolygonAnglesDiagonalsMatcher';
import { PolygonAnglesDiagonalsSorter } from './PolygonAnglesDiagonalsSorter';
import {
  Shapes,
  Maximize2,
  Layers,
  Target,
  Sparkles,
  Calculator,
  Compass,
  Ruler,
  HelpCircle,
  Scale
} from 'lucide-react';

interface PolygonAnglesDiagonalsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Átlók Egy Csúcsból és Háromszögek',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: 'd_1 = n - 3, \\quad h = n - 2',
    note: 'Egy csúcsból n - 3 átló húzható (önmagába és 2 szomszédba nem). Ezek n - 2 darab háromszögre bontják a sokszöget.'
  },
  {
    id: 'c2',
    title: 'Az Összes Átló Száma',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'd_n = \\frac{n \\cdot (n - 3)}{2}',
    note: 'Négyszög: 2, Ötszög: 5, Hatszög: 9, Hétszög: 14, Nyolcszög: 20, Tízszög: 35 átló. Mindig osztani kell 2-vel!'
  },
  {
    id: 'c3',
    title: 'Belső és Külső Szögek Összege',
    icon: <Target className="w-4 h-4 text-teal-600" />,
    formula: 'S_n = (n - 2) \\cdot 180^\\circ, \\quad \\sum \\alpha\' = 360^\\circ',
    note: 'Négyszög: 360°, Ötszög: 540°, Hatszög: 720°, Nyolcszög: 1080°. A külső szögek összege bármely konvex sokszögben mindig 360°!'
  },
  {
    id: 'c4',
    title: 'Szabályos Sokszögek Szögei',
    icon: <Sparkles className="w-4 h-4 text-rose-600" />,
    formula: '\\alpha = \\frac{(n-2)\\cdot 180^\\circ}{n}, \\quad \\alpha\' = \\frac{360^\\circ}{n}',
    note: 'Minden oldala és szöge egyenlő. Ötszög: 108° (külső 72°), Hatszög: 120° (külső 60°), Nyolcszög: 135° (külső 45°). n szimmetriatengelye van.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és egyszerű képletek)
  1: {
    title: '1. Szint: Alapok és Átlók Száma',
    description: 'Konvex sokszögek átlói egy csúcsból, háromszögekre bontás és alap szögösszegek',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hány átló húzható egy konvex n-oldalú sokszög EGYETLEN csúcsából?',
        options: ['n - 3', 'n - 2', 'n(n - 3) / 2', 'n - 1'],
        correctAnswer: 'n - 3',
        hint: 'Gondold át: a kiválasztott csúcsból önmagába és a két közvetlen szomszédos csúcsba nem húzható átló.',
        explanation: 'Egy csúcsból önmagába és a két mellette lévő szomszédos csúcsba nem húzható átló, így pontosan 3 csúcs esik ki: d₁ = n - 3.'
      },
      {
        id: 'q1-2',
        prompt: 'Hány átlója van összesen egy konvex négyszögnek?',
        options: ['2', '1', '4', '0'],
        correctAnswer: '2',
        hint: 'Képlet: 4 · (4 - 3) / 2.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="20,60 100,60 90,15 30,20" fill="none" className="stroke-purple-600 stroke-2" />
            <line x1="20" y1="60" x2="90" y2="15" className="stroke-indigo-500 stroke-1 stroke-dashed" />
            <line x1="100" y1="60" x2="30" y2="20" className="stroke-indigo-500 stroke-1 stroke-dashed" />
          </svg>
        ),
        explanation: 'A négyszögnek két szemközti csúcspárja van, ezek összekötésével pontosan 2 átló keletkezik: d₄ = 4 · 1 / 2 = 2.'
      },
      {
        id: 'q1-3',
        prompt: 'Egy konvex ötszög egyetlen csúcsából kiinduló átlók hány háromszögre bontják a sokszöget?',
        options: ['3', '2', '5', '4'],
        correctAnswer: '3',
        hint: 'Képlet: h = n - 2.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="60,10 105,38 88,68 32,68 15,38" fill="none" className="stroke-purple-600 stroke-2" />
            <line x1="60" y1="10" x2="32" y2="68" className="stroke-rose-500 stroke-[1.5]" />
            <line x1="60" y1="10" x2="88" y2="68" className="stroke-rose-500 stroke-[1.5]" />
            <text x="35" y="42" className="text-[10px] font-bold fill-purple-700">T₁</text>
            <text x="60" y="52" textAnchor="middle" className="text-[10px] font-bold fill-purple-700">T₂</text>
            <text x="85" y="42" className="text-[10px] font-bold fill-purple-700">T₃</text>
          </svg>
        ),
        explanation: 'Az egy csúcsból húzott átlók mindig h = n - 2 darab háromszögre osztják az n-oldalú sokszöget. Ötszögnél: 5 - 2 = 3 háromszög.'
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi bármely konvex négyszög belső szögeinek összege?',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: '360°',
        hint: 'Egy átlóval két háromszögre bontható.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="15,62 105,62 85,18 30,22" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="15" y1="62" x2="85" y2="18" className="stroke-teal-500 stroke-1 stroke-dashed" />
            <text x="60" y="45" textAnchor="middle" className="text-[10px] font-black fill-teal-700">180° + 180°</text>
          </svg>
        ),
        explanation: 'A négyszög egy átlóval 2 darab háromszögre bontható, így belső szögeinek összege 2 · 180° = 360°.'
      },
      {
        id: 'q1-5',
        prompt: 'Hány átlója van összesen egy konvex ötszögnek?',
        options: ['5', '3', '10', '2'],
        correctAnswer: '5',
        hint: 'Képlet: 5 · (5 - 3) / 2.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="60,8 105,38 88,68 32,68 15,38" fill="none" className="stroke-purple-600 stroke-2" />
            <line x1="60" y1="8" x2="88" y2="68" className="stroke-rose-400 stroke-1" />
            <line x1="60" y1="8" x2="32" y2="68" className="stroke-rose-400 stroke-1" />
            <line x1="105" y1="38" x2="32" y2="68" className="stroke-rose-400 stroke-1" />
            <line x1="105" y1="38" x2="15" y2="38" className="stroke-rose-400 stroke-1" />
            <line x1="88" y1="68" x2="15" y2="38" className="stroke-rose-400 stroke-1" />
          </svg>
        ),
        explanation: 'Az összes átló képlete: d₅ = 5 · (5 - 3) / 2 = 5 · 2 / 2 = 5 átló (az átlók egy pentagrammát alkotnak).'
      },
      {
        id: 'q1-6',
        prompt: 'Hány átlója van egy háromszögnek?',
        options: ['0', '1', '3', 'Végtelen'],
        correctAnswer: '0',
        hint: 'Van olyan csúcspárja, amely nem szomszédos?',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="20,62 100,62 60,15" fill="none" className="stroke-amber-600 stroke-2" />
            <text x="60" y="48" textAnchor="middle" className="text-[11px] font-black fill-amber-700">0 átló</text>
          </svg>
        ),
        explanation: 'A háromszög minden csúcsa szomszédos egymással (n - 3 = 3 - 3 = 0), így nincs átlója.'
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi bármely konvex sokszög KÜLSŐ szögeinek összege?',
        options: ['Mindig 360°', 'n · 180°', '(n - 2) · 180°', 'Oldalszámtól függ'],
        correctAnswer: 'Mindig 360°',
        hint: 'Gondolj a körbejárásra: egy teljes fordulat pontosan 360°.',
        explanation: 'A külső szögek összege bármely konvex sokszög esetén állandó, és pontosan 360°-ot tesz ki (egy teljes körbefordulás).'
      },
      {
        id: 'q1-8',
        prompt: 'Hány átló húzható egy konvex hatszög egyetlen csúcsából?',
        options: ['3', '4', '6', '9'],
        correctAnswer: '3',
        hint: 'd₁ = n - 3 hatszög esetén (n = 6).',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="35,12 85,12 108,40 85,68 35,68 12,40" fill="none" className="stroke-purple-600 stroke-2" />
            <circle cx="12" cy="40" r="4" className="fill-rose-500" />
            <line x1="12" y1="40" x2="85" y2="12" className="stroke-rose-400 stroke-[1.5]" />
            <line x1="12" y1="40" x2="108" y2="40" className="stroke-rose-400 stroke-[1.5]" />
            <line x1="12" y1="40" x2="85" y2="68" className="stroke-rose-400 stroke-[1.5]" />
          </svg>
        ),
        explanation: 'Egy csúcsból d₁ = 6 - 3 = 3 átló húzható.'
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi egy konvex ötszög belső szögeinek összege?',
        options: ['540°', '360°', '720°', '450°'],
        correctAnswer: '540°',
        hint: 'Képlet: (5 - 2) · 180° = 3 · 180°.',
        explanation: 'Az ötszög 3 darab háromszögre bontható: S₅ = (5 - 2) · 180° = 3 · 180° = 540°.'
      },
      {
        id: 'q1-10',
        prompt: 'Hány átlója van összesen egy konvex hatszögnek?',
        options: ['9', '6', '12', '18'],
        correctAnswer: '9',
        hint: 'Képlet: 6 · (6 - 3) / 2.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="35,12 85,12 108,40 85,68 35,68 12,40" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[12px] font-black fill-indigo-700">9 átló</text>
          </svg>
        ),
        explanation: 'Az összes átló száma hatszögben: d₆ = 6 · 3 / 2 = 9 átló.'
      }
    ]
  },

  // 2. SZINT: HALADÓ (Számítások, hiányzó szögek és szabályos alakzatok)
  2: {
    title: '2. Szint: Számítások és Szabályos Sokszögek',
    description: 'Hiányzó belső szögek meghatározása, sokszögek szögképletei és több oldalú alakzatok',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy konvex négyszög három szöge 75°, 105° és 80°. Mekkora a negyedik belső szög?',
        options: ['100°', '90°', '110°', '95°'],
        correctAnswer: '100°',
        hint: 'A négyszög belső szögeinek összege 360°.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="20,62 100,62 85,18 35,22" fill="none" className="stroke-purple-600 stroke-2" />
            <text x="32" y="56" className="text-[8px] font-bold fill-slate-700">75°</text>
            <text x="80" y="56" className="text-[8px] font-bold fill-slate-700">105°</text>
            <text x="70" y="30" className="text-[8px] font-bold fill-slate-700">80°</text>
            <text x="42" y="34" className="text-[10px] font-black fill-rose-600">?</text>
          </svg>
        ),
        explanation: 'A négyszög belső szögeinek összege 360°. A három ismert szög összege 75° + 105° + 80° = 260°. A hiányzó szög: 360° - 260° = 100°.'
      },
      {
        id: 'q2-2',
        prompt: 'Hány átlója van összesen egy nyolcszögnek?',
        options: ['20', '16', '24', '28'],
        correctAnswer: '20',
        hint: 'Képlet: 8 · (8 - 3) / 2.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="40,10 80,10 105,35 105,50 80,70 40,70 15,50 15,35" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[11px] font-black fill-teal-700">d₈ = 20</text>
          </svg>
        ),
        explanation: 'Az összes átló képlete nyolcszögre: d₈ = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 20 átló.'
      },
      {
        id: 'q2-3',
        prompt: 'Egy konvex sokszög belső szögeinek összege 720°. Hány oldalú a sokszög?',
        options: ['6 (hatszög)', '5 (ötszög)', '7 (hétszög)', '8 (nyolcszög)'],
        correctAnswer: '6 (hatszög)',
        hint: '(n - 2) · 180° = 720°. Oszd el 180-nal!',
        explanation: 'Mivel (n - 2) · 180° = 720°, így n - 2 = 720° : 180° = 4, amiből n = 4 + 2 = 6, vagyis a sokszög hatszög.'
      },
      {
        id: 'q2-4',
        prompt: 'Egy konvex ötszög négy belső szöge: 110°, 90°, 120° és 130°. Mekkora az ötödik szög?',
        options: ['90°', '100°', '80°', '95°'],
        correctAnswer: '90°',
        hint: 'Az ötszög belső szögeinek összege 540°.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="60,10 105,38 88,68 32,68 15,38" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="60" y="50" textAnchor="middle" className="text-[10px] font-black fill-rose-600">α₅ = ?</text>
          </svg>
        ),
        explanation: 'Az ötszög belső szögeinek összege 540°. Az ismert szögek összege: 110° + 90° + 120° + 130° = 450°. Az ötödik szög: 540° - 450° = 90°.'
      },
      {
        id: 'q2-5',
        prompt: 'Hány háromszögre bontja egy hétszög egyetlen csúcsából kiinduló összes átlója a sokszöget?',
        options: ['5', '4', '7', '6'],
        correctAnswer: '5',
        hint: 'h = n - 2.',
        explanation: 'A felbontott háromszögek száma h = n - 2 = 7 - 2 = 5 darab.'
      },
      {
        id: 'q2-6',
        prompt: 'Mekkora a szabályos ötszög egyetlen belső szöge?',
        options: ['108°', '100°', '120°', '72°'],
        correctAnswer: '108°',
        hint: 'Belső szögek összege 540°, ezt oszd el 5-tel (vagy 180° - 360°/5).',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="60,8 105,38 88,68 32,68 15,38" fill="none" className="stroke-purple-600 stroke-2" />
            <path d="M 40,68 A 10,10 0 0,1 32,58" fill="none" className="stroke-rose-500 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[11px] font-black fill-purple-700">108°</text>
          </svg>
        ),
        explanation: 'A szabályos ötszög belső szögeinek összege 540°. Mivel 5 egyenlő szöge van: α = 540° : 5 = 108° (vagy a külső szög 360° : 5 = 72°, és 180° - 72° = 108°).'
      },
      {
        id: 'q2-7',
        prompt: 'Mekkora a szabályos hatszög egyetlen belső szöge?',
        options: ['120°', '108°', '135°', '60°'],
        correctAnswer: '120°',
        hint: 'Belső szögek összege 720°, ezt oszd el 6-tal.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="35,12 85,12 108,40 85,68 35,68 12,40" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[11px] font-black fill-teal-700">120°</text>
          </svg>
        ),
        explanation: 'A szabályos hatszög belső szögeinek összege 720°. Egy belső szög: α = 720° : 6 = 120°.'
      },
      {
        id: 'q2-8',
        prompt: 'Egy sokszögnek összesen 14 átlója van. Hány oldala van a sokszögnek?',
        options: ['7 (hétszög)', '6 (hatszög)', '8 (nyolcszög)', '9 (kilencszög)'],
        correctAnswer: '7 (hétszög)',
        hint: 'n · (n - 3) / 2 = 14 => n · (n - 3) = 28.',
        explanation: 'Ha n · (n - 3) / 2 = 14, akkor n · (n - 3) = 28. Mivel 7 · 4 = 28, a sokszög oldalszáma n = 7 (hétszög).'
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a belső szögek összege egy konvex nyolcszögben?',
        options: ['1080°', '900°', '1260°', '1440°'],
        correctAnswer: '1080°',
        hint: '(8 - 2) · 180° = 6 · 180°.',
        explanation: 'S₈ = (8 - 2) · 180° = 6 · 180° = 1080°.'
      },
      {
        id: 'q2-10',
        prompt: 'Egy konvex ötszög egyik belső szöge 115°. Mekkora az ehhez a csúcshoz tartozó külső szög?',
        options: ['65°', '75°', '55°', '245°'],
        correctAnswer: '65°',
        hint: 'A belső szög és a mellette fekvő külső szög összege 180° (mellékszögek).',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="50,15 85,35 75,65 30,65 15,35" fill="none" className="stroke-purple-600 stroke-2" />
            <line x1="30" y1="65" x2="110" y2="65" className="stroke-slate-400 stroke-1 stroke-dashed" />
            <text x="60" y="60" className="text-[8px] font-bold fill-purple-700">115°</text>
            <text x="85" y="60" className="text-[9px] font-black fill-rose-600">?</text>
          </svg>
        ),
        explanation: 'A belső és a hozzá tartozó külső szög mellékszögek, összegük 180°. Így a külső szög: 180° - 115° = 65°.'
      }
    ]
  },

  // 3. SZINT: MESTER (Összetett összefüggések, szabályos sokszögek szimmetriái)
  3: {
    title: '3. Szint: Szabályos Sokszögek és Haladó Feladatok',
    description: 'Szabályos sokszögek szögképletei, szimmetriatengelyek, inverz feladatok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mekkora a szabályos nyolcszög egyetlen belső szöge?',
        options: ['135°', '120°', '140°', '144°'],
        correctAnswer: '135°',
        hint: 'Külső szög = 360° : 8 = 45°. Belső szög = 180° - 45°.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="40,10 80,10 105,35 105,50 80,70 40,70 15,50 15,35" fill="none" className="stroke-purple-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[11px] font-black fill-purple-700">135°</text>
          </svg>
        ),
        explanation: 'Szabályos nyolcszögben a külső szög α\' = 360° : 8 = 45°. A belső szög: α = 180° - 45° = 135° (vagy 1080° : 8 = 135°).'
      },
      {
        id: 'q3-2',
        prompt: 'Egy szabályos sokszög egy külső szöge 36°. Hány oldala van a sokszögnek?',
        options: ['10 (szabályos tízszög)', '8', '12', '9'],
        correctAnswer: '10 (szabályos tízszög)',
        hint: 'Mivel α\' = 360° / n, így n = 360° / α\'.',
        explanation: 'A szabályos sokszög külső szöge α\' = 360° / n = 36°, amiből n = 360° : 36° = 10. Tehát tízszög.'
      },
      {
        id: 'q3-3',
        prompt: 'Egy szabályos sokszög egy belső szöge 150°. Hány oldala van a sokszögnek?',
        options: ['12 (tizenkétszög)', '10', '15', '16'],
        correctAnswer: '12 (tizenkétszög)',
        hint: 'Számold ki először a külső szöget: 180° - 150° = 30°!',
        explanation: 'A belső szög 150°, így a külső szög α\' = 180° - 150° = 30°. Az oldalszám: n = 360° : 30° = 12 (tizenkétszög).'
      },
      {
        id: 'q3-4',
        prompt: 'Hány szimmetriatengelye van egy szabályos hatszögnek?',
        options: ['6', '3', '12', '9'],
        correctAnswer: '6',
        hint: 'Szabályos n-szögnek mindig n darab tengelye van.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="35,12 85,12 108,40 85,68 35,68 12,40" fill="none" className="stroke-indigo-600 stroke-2" />
            <line x1="60" y1="5" x2="60" y2="75" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <line x1="12" y1="40" x2="108" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <text x="60" y="44" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">6 tengely</text>
          </svg>
        ),
        explanation: 'Egy szabályos n-szögnek pontosan n darab szimmetriatengelye van. Szabályos hatszög esetén: 3 tengely köti össze a szemközti csúcsokat, 3 pedig a szemközti oldalfelezőket, összesen 6.'
      },
      {
        id: 'q3-5',
        prompt: 'Egy konvex sokszögnek összesen 35 átlója van. Hány oldala van a sokszögnek?',
        options: ['10 (tízszög)', '9 (kilencszög)', '12 (tizenkétszög)', '8 (nyolcszög)'],
        correctAnswer: '10 (tízszög)',
        hint: 'n · (n - 3) / 2 = 35 => n · (n - 3) = 70.',
        explanation: 'n · (n - 3) / 2 = 35 => n · (n - 3) = 70. Mivel 10 · 7 = 70, ezért n = 10 (tízszög).'
      },
      {
        id: 'q3-6',
        prompt: 'Hány fokkal nő egy konvex sokszög belső szögeinek összege, ha az oldalszámát 1-gyel növeljük?',
        options: ['180°-kal', '360°-kal', '90°-kal', 'Oldalszámtól függ'],
        correctAnswer: '180°-kal',
        hint: 'S_n = (n - 2) · 180°, S_(n+1) = (n - 1) · 180°.',
        explanation: 'Minden egyes újabb oldal hozzáadásával 1 újabb háromszög keletkezik az egy csúcsból induló felbontásban, így a belső szögek összege mindig pontosan 180°-kal növekszik.'
      },
      {
        id: 'q3-7',
        prompt: 'Melyik az az egyetlen sokszög, amelynek az összes átlóinak száma megegyezik az oldalainak számával?',
        options: ['Ötszög (n = 5)', 'Négyszög (n = 4)', 'Hatszög (n = 6)', 'Háromszög (n = 3)'],
        correctAnswer: 'Ötszög (n = 5)',
        hint: 'd_n = n => n(n - 3) / 2 = n.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <polygon points="60,8 105,38 88,68 32,68 15,38" fill="none" className="stroke-rose-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[10px] font-black fill-rose-700">5 oldal = 5 átló</text>
          </svg>
        ),
        explanation: 'Ha d_n = n, akkor n(n - 3) / 2 = n => n - 3 = 2 => n = 5. Az ötszögnek 5 oldala és pontosan 5 átlója van.'
      },
      {
        id: 'q3-8',
        prompt: 'Egy szabályos sokszög belső szöge ötszöröse a mellette fekvő külső szögnek (α = 5α\'). Hány oldala van a sokszögnek?',
        options: ['12-oldalú', '10-oldalú', '8-oldalú', '6-oldalú'],
        correctAnswer: '12-oldalú',
        hint: 'α + α\' = 180° => 5α\' + α\' = 6α\' = 180°.',
        explanation: 'Mivel α + α\' = 180°, ezért 5α\' + α\' = 6α\' = 180° => α\' = 30°. Az oldalszám: n = 360° : 30° = 12 (szabályos tizenkétszög).'
      },
      {
        id: 'q3-9',
        prompt: 'Lehet-e egy szabályos sokszög belső szöge pontosan 130°?',
        options: [
          'Nem, mert a külső szög 50° lenne, és 360 nem osztható 50-nel egészre',
          'Igen, ez a szabályos kilencszög',
          'Igen, ez a szabályos hétszög',
          'Igen, ha n tört szám'
        ],
        correctAnswer: 'Nem, mert a külső szög 50° lenne, és 360 nem osztható 50-nel egészre',
        hint: 'A külső szög 180° - 130° = 50° lenne. n = 360° : 50°.',
        explanation: 'Ha a belső szög 130° lenne, akkor a külső szög α\' = 180° - 130° = 50° lenne. De n = 360° : 50° = 7,2, ami nem egész szám. Sokszög oldalszáma csak egész lehet, így ilyen szabályos sokszög nem létezik.'
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi egy konvex tízszög belső szögeinek összege?',
        options: ['1440°', '1260°', '1620°', '1800°'],
        correctAnswer: '1440°',
        hint: 'S₁₀ = (10 - 2) · 180° = 8 · 180°.',
        explanation: 'S₁₀ = (10 - 2) · 180° = 8 · 180° = 1440°.'
      }
    ]
  }
};

export const PolygonAnglesDiagonalsQuiz: React.FC<PolygonAnglesDiagonalsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-polygons"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 3. LECKE"
      title="3. Sokszögek Szögei és Átlói Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: átlók száma, háromszögekre bontás, szögösszegek és szabályos sokszögek"
      cheatSheetTitle="Sokszögek Szögei és Átlói Puskakártyák"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <PolygonAnglesDiagonalsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PolygonAnglesDiagonalsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default PolygonAnglesDiagonalsQuiz;
