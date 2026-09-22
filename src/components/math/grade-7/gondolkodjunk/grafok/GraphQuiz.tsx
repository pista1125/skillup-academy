import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GraphMatcher } from './GraphMatcher';
import { GraphSorter } from './GraphSorter';
import { GraphSolverFigure } from './GraphDiagrams';
import {
  Network,
  Share2,
  GitBranch,
  CircleDot,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

interface GraphQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Gráfelmélet Alaptétele',
    icon: <Network className="w-4 h-4 text-emerald-600" />,
    formula: 'Σ d(v) = 2 · |E|',
    note: 'A csúcsok fokszámának összege egyenlő az élek számának kétszeresével (mindig páros szám!).'
  },
  {
    id: 'c2',
    title: 'Páratlan Csúcsok Szabálya',
    icon: <Sparkles className="w-4 h-4 text-teal-600" />,
    formula: 'Páratlan fokú csúcsok száma = PÁROS',
    note: 'Egy gráfban a páratlan fokszámú csúcsok darabszáma mindig páros (0, 2, 4, 6...); sosem lehet páratlan!'
  },
  {
    id: 'c3',
    title: 'Teljes Gráf (Kₙ) Élei',
    icon: <Share2 className="w-4 h-4 text-indigo-600" />,
    formula: '|E| = n · (n - 1) / 2',
    note: 'Minden csúcs össze van kötve minden másikkal (pl. K₄: 6 él, K₅: 10 él, K₆: 15 él).'
  },
  {
    id: 'c4',
    title: 'Fa Gráf (Tₙ) Élei',
    icon: <GitBranch className="w-4 h-4 text-amber-600" />,
    formula: '|E| = n - 1',
    note: 'Összefüggő és nem tartalmaz kört. Egy n csúcsú fának pontosan n - 1 éle van.'
  },
  {
    id: 'c5',
    title: 'Kör Gráf (Cₙ)',
    icon: <CircleDot className="w-4 h-4 text-blue-600" />,
    formula: '|E| = n,   minden d(v) = 2',
    note: 'Zárt kört alkotó n csúcsú gráf, pontosan n éllel, ahol minden csúcs fokszáma 2.'
  },
  {
    id: 'c6',
    title: 'Kézfogások egy Csoportban',
    icon: <Layers className="w-4 h-4 text-rose-600" />,
    formula: 'n · (n - 1) / 2',
    note: 'Ha egy n fős társaságban mindenki mindenkivel kezet fog egyszer (teljes gráf modellje).'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Gráf Alapfogalmak és Fokszámok',
    subtitle: 'Csúcsok, élek, fokszámok, izolált csúcs és a kézfogási alaptétel',
    range: '1 - 10. feladat',
    focus: 'Fokszámok & Alaptétel',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Mit nevezünk egy gráfban egy csúcs FOKSZÁMÁNAK (d(v))?',
        questionTypeBadge: 'Alapfogalom',
        figure: <GraphSolverFigure type="degrees" />,
        options: [
          'Az adott csúcsból kiinduló élek számát',
          'A gráfban lévő összes csúcs számát',
          'A csúcs sorszámát',
          'A leghosszabb út hosszát'
        ],
        correctAnswer: 'Az adott csúcsból kiinduló élek számát',
        explanation: 'Egy csúcs fokszáma megmutatja, hogy hány él csatlakozik hozzá (hány szomszédos csúcsa van).',
        breakdown: [
          { label: 'Definíció', value: 'd(v) = a csúcshoz illeszkedő élek száma' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Egy gráfban 6 él található. Mennyi a gráf csúcsainak fokszámösszege?',
        questionTypeBadge: 'Fokszámösszeg',
        figure: <GraphSolverFigure type="handshake" />,
        options: ['12', '6', '18', '3'],
        correctAnswer: '12',
        explanation: 'A gráfelmélet alaptétele szerint a fokszámok összege egyenlő az élek számának kétszeresével: 2 · |E| = 2 · 6 = 12.',
        breakdown: [
          { label: 'Képlet', value: 'Σ d(v) = 2 · |E|' },
          { label: 'Élek száma', value: '|E| = 6' },
          { label: 'Fokszámösszeg', value: '2 · 6 = 12' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Mit jelent az, ha egy gráfban egy csúcs IZOLÁLT csúcs?',
        questionTypeBadge: 'Izolált csúcs',
        figure: <GraphSolverFigure type="isolated" />,
        options: [
          'Fokszáma 0, vagyis nem csatlakozik hozzá egyetlen él sem',
          'Minden másik csúccsal össze van kötve',
          'Csak 1 éle van',
          'Páratlan a fokszáma'
        ],
        correctAnswer: 'Fokszáma 0, vagyis nem csatlakozik hozzá egyetlen él sem',
        explanation: 'Az izolált csúcs fokszáma 0 (különálló pont a gráfban).',
        breakdown: [
          { label: 'Izolált csúcs', value: 'd(v) = 0' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Egy gráf csúcsainak fokszámai: 2, 3, 3, 4. Hány él van a gráfban?',
        questionTypeBadge: 'Élszámítás',
        figure: <GraphSolverFigure type="degrees" />,
        options: ['6', '12', '4', '8'],
        correctAnswer: '6',
        explanation: 'A fokszámok összege: 2 + 3 + 3 + 4 = 12. Mivel a fokszámösszeg az élszám kétszerese, az élek száma: 12 / 2 = 6 él.',
        breakdown: [
          { label: 'Fokszámösszeg', value: '2 + 3 + 3 + 4 = 12' },
          { label: 'Élek száma', value: '12 / 2 = 6 él' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Egy egyszerű gráfban 4 csúcs van. Legfeljebb mekkora lehet egyetlen csúcs maximális fokszáma?',
        questionTypeBadge: 'Maximális fokszám',
        figure: <GraphSolverFigure type="complete_k4" />,
        options: ['3', '4', '2', '6'],
        correctAnswer: '3',
        explanation: 'Egyszerű gráfban nincs hurokél (egy csúcs nem köthető össze önmagával) és nincs többszörös él sem. Így egy csúcs legfeljebb a maradék 3 másik csúccsal lehet összekötve, max foka 4 - 1 = 3.',
        breakdown: [
          { label: 'Csúcsok száma', value: 'n = 4' },
          { label: 'Maximális fokszám', value: 'n - 1 = 3' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Egy négyzet alakú zárt kör gráfban (C₄) hány él van, és mennyi minden csúcs fokszáma?',
        questionTypeBadge: 'Kör gráf',
        figure: <GraphSolverFigure type="cycle" />,
        options: [
          '4 él, és minden csúcs foka 2',
          '4 él, és minden csúcs foka 3',
          '6 él, és minden csúcs foka 2',
          '3 él, és minden csúcs foka 1'
        ],
        correctAnswer: '4 él, és minden csúcs foka 2',
        explanation: 'A négyzet csúcsai egymáshoz körben kapcsolódnak: 4 él alkotja a kerületet, és minden sarokból 2 él fut a szomszédokhoz.',
        breakdown: [
          { label: 'Élek száma', value: '4 él' },
          { label: 'Csúcsok foka', value: 'Mindegyik fokszáma 2' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Egy 5 fős társaságban mindenki pontosan 2 másik emberrel fogott kezet. Mennyi a kézfogások összege és hány kézfogás történt összesen?',
        questionTypeBadge: 'Kézfogás alaptétel',
        figure: <GraphSolverFigure type="handshake" />,
        options: [
          'Fokszámösszeg: 10, kézfogások száma: 5',
          'Fokszámösszeg: 5, kézfogások száma: 10',
          'Fokszámösszeg: 10, kézfogások száma: 10',
          'Fokszámösszeg: 20, kézfogások száma: 10'
        ],
        correctAnswer: 'Fokszámösszeg: 10, kézfogások száma: 5',
        explanation: '5 ember mindegyike 2 kezet fogott: fokszámösszeg = 5 · 2 = 10. A kézfogások (élek) száma: 10 / 2 = 5 kézfogás.',
        breakdown: [
          { label: 'Fokszámösszeg', value: '5 · 2 = 10' },
          { label: 'Kézfogások száma', value: '10 / 2 = 5' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Melyik állítás IGAZ bármely gráfra a páratlan fokszámú csúcsokról?',
        questionTypeBadge: 'Páratlan csúcs tétel',
        figure: <GraphSolverFigure type="handshake" />,
        options: [
          'A páratlan fokszámú csúcsok darabszáma mindig páros',
          'A páratlan fokszámú csúcsok darabszáma mindig páratlan',
          'Nem lehet egyetlen páratlan csúcs sem egy gráfban',
          'Bármennyi páratlan csúcs lehet, nincs megkötés'
        ],
        correctAnswer: 'A páratlan fokszámú csúcsok darabszáma mindig páros',
        explanation: 'Mivel a fokszámok összege mindig páros (2 · |E|), páratlan fokszámú csúcsból csak páros darab (0, 2, 4, 6...) szerepelhet a gráfban.',
        breakdown: [
          { label: 'Tétel', value: 'Páratlan fokú csúcsok száma mindig páros' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Egy gráfban 3 csúcs van, fokszámaik: 2, 2, 2. Milyen gráf ez?',
        questionTypeBadge: 'Háromszög gráf',
        figure: <GraphSolverFigure type="complete_k4" />,
        options: [
          'K₃ teljes gráf (háromszög gráf)',
          'Fa gráf',
          'Izolált pontok halmaza',
          'Nem létező gráf'
        ],
        correctAnswer: 'K₃ teljes gráf (háromszög gráf)',
        explanation: '3 csúcs esetén, ha minden csúcs foka 2, az egy zárt háromszöget (K₃ teljes gráfot) alkot 3 éllel.',
        breakdown: [
          { label: 'Csúcsok', value: '3 db' },
          { label: 'Élek száma', value: '(2+2+2)/2 = 3 él (K₃)' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Egy gráfban a csúcsok fokszámai: 1, 1, 2, 2, 2. Hány él van a gráfban?',
        questionTypeBadge: 'Fokszámösszeg osztás',
        figure: <GraphSolverFigure type="degrees" />,
        options: ['4', '8', '5', '3'],
        correctAnswer: '4',
        explanation: 'Fokszámok összege: 1 + 1 + 2 + 2 + 2 = 8. Élek száma: 8 / 2 = 4 él.',
        breakdown: [
          { label: 'Összeg', value: '8' },
          { label: 'Élek', value: '8 / 2 = 4 él' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Teljes Gráfok és Fa Gráfok',
    subtitle: 'Teljes gráfok (K_n) képlete, fa gráfok (n - 1 él) és megvalósíthatóság',
    range: '11 - 20. feladat',
    focus: 'Teljes Gráfok & Fák',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Hány éle van a K₄ (4 csúcsú teljes gráf) egyszerű gráfnak?',
        questionTypeBadge: 'K4 teljes gráf',
        figure: <GraphSolverFigure type="complete_k4" />,
        options: ['6', '4', '8', '12'],
        correctAnswer: '6',
        explanation: 'A teljes gráf élszám képlete: n · (n - 1) / 2. Itt n = 4, tehát (4 · 3) / 2 = 6 él.',
        breakdown: [
          { label: 'Képlet', value: 'n · (n - 1) / 2' },
          { label: 'Kiszámítás', value: '(4 · 3) / 2 = 6 él' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Hány éle van a K₅ (5 csúcsú teljes gráf) egyszerű gráfnak?',
        questionTypeBadge: 'K5 teljes gráf',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['10', '15', '20', '8'],
        correctAnswer: '10',
        explanation: 'K₅ éleinek száma: (5 · 4) / 2 = 10 él.',
        breakdown: [
          { label: 'Képlet', value: '(5 · 4) / 2' },
          { label: 'Eredmény', value: '10 él' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Egy FA GRÁFNAK 7 csúcsa van. Hány éle van pontosan ennek a gráfnak?',
        questionTypeBadge: 'Fa gráf élei',
        figure: <GraphSolverFigure type="tree" />,
        options: ['6', '7', '8', '21'],
        correctAnswer: '6',
        explanation: 'Bármely n csúcsú fa gráf (összefüggő körmentes gráf) éleinek száma pontosan n - 1. Itt 7 - 1 = 6 él.',
        breakdown: [
          { label: 'Fa tétel', value: '|E| = n - 1' },
          { label: 'Kiszámítás', value: '7 - 1 = 6 él' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Létezhet-e olyan egyszerű gráf, amelynek fokszámai: 1, 2, 3, 3, 3?',
        questionTypeBadge: 'Létezési vizsgálat',
        figure: <GraphSolverFigure type="handshake" />,
        options: [
          'NEM, mert a páratlan fokszámú csúcsok száma 4 db helyett 4 db',
          'NEM, mert a fokszámok összege (12) páros',
          'NEM, mert 4 darab páratlan fokszám van: 1, 3, 3, 3',
          'NEM, mert a fokszámok összege 1 + 2 + 3 + 3 + 3 = 12, de 4 páratlan van'
        ],
        correctAnswer: 'NEM, mert a fokszámok összege (12) páros',
        explanation: 'Vigyázat: 1 + 2 + 3 + 3 + 3 = 12 (összeg páros), 4 db páratlan van (1, 3, 3, 3), de 5 csúcsú egyszerű gráfban 3-as fokszámú csúcsok és 1-es fokszám eloszlása ellenőrizendő.',
        breakdown: [
          { label: 'Fokszámok', value: '1, 2, 3, 3, 3' },
          { label: 'Összeg', value: '12 (páros)' },
          { label: 'Páratlanok száma', value: '4 db (1, 3, 3, 3)' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Hány kézfogás történik egy 6 fős baráti társaságban, ha mindenki mindenkivel pontosan egyszer fog kezet?',
        questionTypeBadge: 'Kézfogás 6 fő',
        figure: <GraphSolverFigure type="complete_k4" />,
        options: ['15', '30', '12', '18'],
        correctAnswer: '15',
        explanation: '6 ember kézfogásai a K₆ teljes gráf éleinek felelnek meg: (6 · 5) / 2 = 15 kézfogás.',
        breakdown: [
          { label: 'Képlet', value: '(6 · 5) / 2' },
          { label: 'Eredmény', value: '15 kézfogás' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Egy fa gráfnak 10 csúcsa van. Mennyi a csúcsok fokszámának összege?',
        questionTypeBadge: 'Fa fokszámösszeg',
        figure: <GraphSolverFigure type="tree" />,
        options: ['18', '20', '9', '19'],
        correctAnswer: '18',
        explanation: '10 csúcsú fa gráfnak 10 - 1 = 9 éle van. A fokszámok összege az élszám kétszerese: 2 · 9 = 18.',
        breakdown: [
          { label: 'Élek száma', value: '10 - 1 = 9 él' },
          { label: 'Fokszámösszeg', value: '2 · 9 = 18' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Létezhet-e olyan 4 csúcsú EGYSZERŰ gráf, amelyben a csúcsok fokszámai: 4, 3, 2, 1?',
        questionTypeBadge: 'Egyszerű gráf korlát',
        figure: <GraphSolverFigure type="isolated" />,
        options: [
          'NEM, mert 4 csúcsú egyszerű gráfban a maximális fokszám legfeljebb 3 lehet',
          'IGEN, mert a fokszámok összege 10 (páros)',
          'IGEN, mert 2 db páratlan csúcs van',
          'IGEN, ez a K₄ gráf'
        ],
        correctAnswer: 'NEM, mert 4 csúcsú egyszerű gráfban a maximális fokszám legfeljebb 3 lehet',
        explanation: '4 csúcsú egyszerű gráfban egyetlen csúcs legfeljebb 3 másikkal köthető össze. A 4-es fokszám csak hurokéllel vagy többszörös éllel létezhetne, ami egyszerű gráfban tilos!',
        breakdown: [
          { label: 'Csúcsok száma', value: 'n = 4' },
          { label: 'Max lehetséges fok', value: 'n - 1 = 3' },
          { label: 'Következtetés', value: 'Nem létezik 4-es fokszám' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Egy összefüggő gráfban 5 csúcs és 4 él van. Biztosan fa gráf ez?',
        questionTypeBadge: 'Fa felismerés',
        figure: <GraphSolverFigure type="tree" />,
        options: [
          'IGEN, mert összefüggő és éleinek száma pontosan n - 1',
          'NEM, tartalmazhat kört',
          'Csak akkor, ha minden csúcs foka 1',
          'NEM, a fának több éle van'
        ],
        correctAnswer: 'IGEN, mert összefüggő és éleinek száma pontosan n - 1',
        explanation: 'Ha egy n csúcsú gráf összefüggő és pontosan n - 1 éle van, akkor az definíció szerint körmentes, vagyis fa gráf!',
        breakdown: [
          { label: 'Feltételek', value: 'Összefüggő ÉS |E| = n - 1' },
          { label: 'Eredmény', value: 'Biztosan fa gráf' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Hány éle van a K₆ (6 csúcsú teljes gráf) gráfnak?',
        questionTypeBadge: 'K6 élszám',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['15', '12', '30', '20'],
        correctAnswer: '15',
        explanation: '(6 · 5) / 2 = 15 él.',
        breakdown: [
          { label: 'Kiszámítás', value: '(6 · 5) / 2 = 15' }
        ]
      },
      {
        id: 'q20',
        prompt: 'Egy fa gráfban legalább hány darab 1-es fokszámú csúcsnak (levélnek) kell lennie, ha n ≥ 2?',
        questionTypeBadge: 'Fa levelek',
        figure: <GraphSolverFigure type="tree" />,
        options: ['Legalább 2', 'Pontosan 1', '0', 'Legalább 4'],
        correctAnswer: 'Legalább 2',
        explanation: 'Minden legalább 2 csúcsú fában van legalább 2 darab 1-es fokszámú csúcs (ezek a fa „levelei” / végpontjai).',
        breakdown: [
          { label: 'Tétel', value: 'Minden fában van legalább 2 levél (d=1)' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Bajnokságok, Hálózatok és Mesterfeladványok',
    subtitle: 'Körmérkőzések, fokszám-megvalósíthatóság, Euler-vonal és összetett hálózatok',
    range: '21 - 30. feladat',
    focus: 'Összetett Gráfelméleti Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Egy sakktornán 8 versenyző indult. Mindenki mindenkivel pontosan 1 partit játszik. Hány mérkőzést játszanak le a tornán összesen?',
        questionTypeBadge: 'Sakktorna körmérkőzés',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['28', '56', '36', '24'],
        correctAnswer: '28',
        explanation: 'A körmérkőzés a K₈ teljes gráf modellje: (8 · 7) / 2 = 28 mérkőzés.',
        breakdown: [
          { label: 'Résztvevők', value: 'n = 8 fő' },
          { label: 'Partik száma', value: '(8 · 7) / 2 = 28 parti' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Létezhet-e olyan társaság 5 fővel, ahol mindenkinek pontosan 3 ismerőse van a csoportban?',
        questionTypeBadge: 'Kézfogási lehetetlenség',
        figure: <GraphSolverFigure type="handshake" />,
        options: [
          'NEM, mert a fokszámösszeg 5 · 3 = 15 lenne (páratlan szám)',
          'IGEN, ez a K₅ gráf',
          'IGEN, ha van 1 izolált tag',
          'IGEN, 5 · 3 / 2 = 7,5 mérkőzés lehetséges'
        ],
        correctAnswer: 'NEM, mert a fokszámösszeg 5 · 3 = 15 lenne (páratlan szám)',
        explanation: 'Ha mind az 5 ember foka 3 lenne, a fokszámok összege 5 · 3 = 15 lenne. Mivel a fokszámösszegnek párosnak kell lennie (2 · |E|), ilyen ismeretségi gráf NEM létezhet!',
        breakdown: [
          { label: 'Fokszámösszeg', value: '5 · 3 = 15 (PÁRATLAN)' },
          { label: 'Szabály', value: 'Σ d(v) = 2 · |E| (PÁROS kell legyen)' },
          { label: 'Eredmény', value: 'Lehetetlen!' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Egy 5 csúcsú összefüggő gráfban a csúcsok fokszámai: 4, 3, 2, 2, 1. Hány éle van a gráfnak?',
        questionTypeBadge: 'Fokszám összeadás',
        figure: <GraphSolverFigure type="degrees" />,
        options: ['6', '12', '5', '8'],
        correctAnswer: '6',
        explanation: 'Fokszámok összege: 4 + 3 + 2 + 2 + 1 = 12. Élek száma: 12 / 2 = 6 él.',
        breakdown: [
          { label: 'Összeg', value: '4 + 3 + 2 + 2 + 1 = 12' },
          { label: 'Élek', value: '12 / 2 = 6 él' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Egy 6 csúcsú gráfban a fokszámok: 2, 2, 2, 2, 2, 2. Milyen gráf lehet ez?',
        questionTypeBadge: '2-reguláris gráf',
        figure: <GraphSolverFigure type="cycle" />,
        options: [
          'Egy C₆ kör gráf (vagy két külön C₃ háromszög)',
          'K₆ teljes gráf',
          'Egy fa gráf',
          'Nem létező gráf'
        ],
        correctAnswer: 'Egy C₆ kör gráf (vagy két külön C₃ háromszög)',
        explanation: 'Minden csúcs foka 2, tehát a gráf 2-reguláris. Ez lehet egyetlen 6-csúcsú kör (C₆) vagy két diszjunkt háromszög (2 db C₃).',
        breakdown: [
          { label: 'Fokszámok', value: 'Minden csúcs foka 2' },
          { label: 'Élek száma', value: '(6 · 2) / 2 = 6 él' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Egy 7 fős társaságban mindenki kezet fogott mindenkivel, KIVÉVE Annát és Bélát, akik nem fogtak kezet egymással. Hány kézfogás történt?',
        questionTypeBadge: 'Hiányos teljes gráf',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['20', '21', '19', '15'],
        correctAnswer: '20',
        explanation: '1. A 7 fős teljes társaság kézfogásai: (7 · 6) / 2 = 21 kézfogás.\n2. Ebből levonjuk az egyetlen elmaradt kézfogást: 21 - 1 = 20 kézfogás.',
        breakdown: [
          { label: 'Teljes K₇', value: '(7 · 6) / 2 = 21' },
          { label: 'Elmaradt', value: '- 1' },
          { label: 'Összesen', value: '20 kézfogás' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Egy fa gráfnak 8 csúcsa van, és pontosan egy darab 3-as fokszámú csúcsa van, a többi csúcs foka 1 vagy 2. Hány darab 1-es fokszámú csúcsa (levele) van?',
        questionTypeBadge: 'Fa fokszám egyenlet',
        figure: <GraphSolverFigure type="tree" />,
        options: ['3', '2', '4', '1'],
        correctAnswer: '3',
        explanation: '1. A 8 csúcsú fa éleinek száma: 8 - 1 = 7 él ⟹ fokszámösszeg = 2 · 7 = 14.\n2. Legyen x db 1-es és y db 2-es csúcs: x + y + 1 = 8 ⟹ x + y = 7.\n3. Fokszámösszeg: 1·x + 2·y + 3·1 = 14 ⟹ x + 2y = 11.\n4. Kivonva a két egyenletet: y = 4, így x = 3 db 1-es fokszámú csúcs.',
        breakdown: [
          { label: 'Fokszámösszeg', value: '2 · 7 = 14' },
          { label: 'x + 2y + 3 = 14', value: 'x = 3 levél' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Egy labdarúgó bajnokságban 10 csapat ODA-VISSZAVÁGÓS rendszerben játszik (mindenki játszik mindenkivel otthon és idegenben is). Hány mérkőzést játszanak le összesen?',
        questionTypeBadge: 'Oda-visszavágó',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['90', '45', '100', '80'],
        correctAnswer: '90',
        explanation: 'Egyirányú meccsek száma: (10 · 9) / 2 = 45. Oda-visszavágó esetén ennek a duplája: 45 · 2 = 90 mérkőzés (vagy 10 · 9 = 90).',
        breakdown: [
          { label: 'Csapatok', value: 'n = 10' },
          { label: 'Oda-vissza meccsek', value: '10 · 9 = 90 mérkőzés' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Létezhet-e olyan összefüggő gráf 6 csúccsal, amelynek pontosan 4 éle van?',
        questionTypeBadge: 'Összefüggőség alsó korlát',
        figure: <GraphSolverFigure type="tree" />,
        options: [
          'NEM, mert egy n csúcsú összefüggő gráfnak legalább n - 1 (itt 5) éle kell legyen',
          'IGEN, ez egy fa gráf',
          'IGEN, ha van benne egy izolált csúcs',
          'IGEN, ha körmentes'
        ],
        correctAnswer: 'NEM, mert egy n csúcsú összefüggő gráfnak legalább n - 1 (itt 5) éle kell legyen',
        explanation: 'Egy összefüggő gráf minimális élszámát a fa gráf éri el: |E| ≥ n - 1. 6 csúcs esetén legalább 6 - 1 = 5 él szükséges az összefüggőséghez. 4 éllel a gráf biztosan nem lehet összefüggő!',
        breakdown: [
          { label: 'Minimális élszám', value: 'n - 1 = 5 él' },
          { label: 'Megadott élek', value: '4 él < 5 él' },
          { label: 'Eredmény', value: 'Nem lehet összefüggő' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Egy 5 csúcsú egyszerű gráfban a csúcsok fokszámai: 4, 4, 4, 4, 4. Hány éle van a gráfnak?',
        questionTypeBadge: 'K5 reguláris',
        figure: <GraphSolverFigure type="complete_k5" />,
        options: ['10', '20', '5', '8'],
        correctAnswer: '10',
        explanation: 'Fokszámok összege: 5 · 4 = 20. Élek száma: 20 / 2 = 10 él. Ez a K₅ teljes gráf!',
        breakdown: [
          { label: 'Fokszámösszeg', value: '5 · 4 = 20' },
          { label: 'Élek száma', value: '20 / 2 = 10 él (K₅)' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Egy házibuliban 6 barát vesz részt. Lehetséges-e, hogy az ismeretségek száma a csoportban rendre: 5, 5, 4, 3, 2, 1?',
        questionTypeBadge: 'Fokszám-összeg paritás',
        figure: <GraphSolverFigure type="handshake" />,
        options: [
          'NEM, mert a fokszámok összege 5+5+4+3+2+1 = 20 (páros), de a páratlan csúcsok száma 3 db (5, 5, 3, 1 = 4 db helyett 4 db?)',
          'NEM, mert 4 db páratlan van, de az 5-ös fokszámúak mindenkit ismernek',
          'IGEN, mert a fokszámok összege 20 (páros) és 4 db páratlan fokszám van',
          'NEM, mert az 5-ös csúcsok kizárják az 1-es fokszámot'
        ],
        correctAnswer: 'IGEN, mert a fokszámok összege 20 (páros) és 4 db páratlan fokszám van',
        explanation: 'A fokszámok összege 5+5+4+3+2+1 = 20 (páros). A páratlanok száma 4 db (5, 5, 3, 1), ami páros. Az 5-ös fokszámú csúcsok a másik 5 csúccsal vannak összekötve.',
        breakdown: [
          { label: 'Fokszámösszeg', value: '20 (páros)' },
          { label: 'Páratlan csúcsok', value: '4 db (páros darabszám)' },
          { label: 'Eredmény', value: 'Megvalósítható gráf' }
        ]
      }
    ]
  }
};

export const GraphQuiz: React.FC<GraphQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="grafok"
      topicId="g7-logic-graphs"
      topicTitle="4. Gráfok"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="4. Gráfok Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: csúcsok és élek, fokszámok összege, teljes gráfok, fa gráfok és kézfogások"
      cheatSheetTitle="Gráfelméleti Szabályok és Képletek"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<GraphMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GraphSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="emerald"
    />
  );
};
