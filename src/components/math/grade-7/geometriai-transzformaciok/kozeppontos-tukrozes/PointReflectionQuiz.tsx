import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PointReflectionMatcher } from './PointReflectionMatcher';
import { PointReflectionSorter } from './PointReflectionSorter';
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

interface PointReflectionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Középpontos Tükrözés Definíciója',
    icon: <Target className="w-4 h-4 text-cyan-600" />,
    formula: '|OP\'| = |OP|, és O felezi a PP\' szakaszt',
    note: 'A sík rögzített O pontjához (centrum) képest P képe P\'. Ha P = O, akkor O\' = O (a centrum önmagába képeződik le).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
        <line x1="30" y1="25" x2="80" y2="25" stroke="#0891b2" strokeWidth="2.5" />
        <line x1="80" y1="25" x2="130" y2="25" stroke="#0891b2" strokeWidth="2.5" />
        <circle cx="30" cy="25" r="3" className="fill-cyan-600" />
        <circle cx="80" cy="25" r="3.5" className="fill-amber-500" />
        <circle cx="130" cy="25" r="3" className="fill-teal-600" />
        <text x="26" y="16" className="text-[8px] font-bold fill-cyan-800">P</text>
        <text x="76" y="16" className="text-[8px] font-bold fill-amber-700">O</text>
        <text x="126" y="16" className="text-[8px] font-bold fill-teal-800">P'</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Fixpont és Fixegyenesek',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: '1 fixpont (O); Fixegyenes ha O ∈ e',
    note: 'Egyetlen fixpontja van: kizárólag a centrum. Minden olyan egyenes fixegyenes, amely áthalad a centrumon, de a pontjai helyet cserélnek.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="25" y1="40" x2="135" y2="10" stroke="#0891b2" strokeWidth="2" />
        <circle cx="80" cy="25" r="3.5" className="fill-amber-500" />
        <text x="85" y="22" className="text-[8px] font-bold fill-amber-700">O</text>
        <text x="135" y="18" className="text-[8px] font-bold fill-cyan-700">e = e'</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Párhuzamosság: e\' ∥ e',
    icon: <MoveHorizontal className="w-4 h-4 text-teal-600" />,
    formula: 'Ha O ∉ e  ⇒  e\' ∥ e',
    note: 'Ha az egyenes nem halad át a centrumon, akkor a tükörképe mindig szigorúan párhuzamos vele.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="15" x2="140" y2="15" stroke="#2563eb" strokeWidth="2" />
        <line x1="20" y1="35" x2="140" y2="35" stroke="#0d9488" strokeWidth="2" />
        <circle cx="80" cy="25" r="3" className="fill-amber-500" />
        <text x="142" y="17" className="text-[8px] font-bold fill-blue-700">e</text>
        <text x="142" y="37" className="text-[8px] font-bold fill-teal-700">e'</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Orientáció (Körüljárási irány)',
    icon: <RotateCw className="w-4 h-4 text-indigo-600" />,
    formula: 'MEGŐRZI a körüljárási irányt (Direkt)',
    note: 'Egy háromszög és középpontos tükörképe azonos körüljárású (pl. óramutatóval ellentétes marad). Ebben különbözik a tengelyes tükrözéstől!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,12 25,38 55,38" fill="none" stroke="#0891b2" strokeWidth="1.5" />
        <polygon points="120,38 135,12 105,12" fill="none" stroke="#0d9488" strokeWidth="1.5" />
        <text x="35" y="30" className="text-[10px] font-bold fill-cyan-700">↺</text>
        <text x="115" y="30" className="text-[10px] font-bold fill-teal-700">↺</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: '180°-os Elforgatás',
    icon: <RefreshCw className="w-4 h-4 text-purple-600" />,
    formula: 'Középpontos tükrözés ≡ Forgatás(O, 180°)',
    note: 'A középpontos tükrözés a síkban tökéletesen egyenértékű az O pont körüli 180 fokos síkbeli elfordítással.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 50 25 A 30 20 0 0 1 110 25" fill="none" stroke="#8b5cf6" strokeWidth="1.8" />
        <polygon points="110,25 105,20 107,28" fill="#8b5cf6" />
        <circle cx="80" cy="25" r="3" className="fill-amber-500" />
        <text x="73" y="18" className="text-[8px] font-bold fill-purple-700">180°</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Origóra Tükrözés Koordinátái',
    icon: <Compass className="w-4 h-4 text-rose-600" />,
    formula: 'P(x, y)  →  P\'(-x, -y)',
    note: 'Ha a koordináta-rendszer origójára tükrözünk egy pontot, mindkét koordinátája az ellentettjére változik.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="80" y1="5" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="105" cy="15" r="2.5" className="fill-cyan-600" />
        <circle cx="55" cy="35" r="2.5" className="fill-teal-600" />
        <text x="108" y="15" className="text-[7px] font-bold fill-cyan-800">(x, y)</text>
        <text x="32" y="42" className="text-[7px] font-bold fill-teal-800">(-x, -y)</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Definíció',
    subtitle: 'Tükörközéppont, felezőpont szerepe, távolságtartás és fixpontok száma',
    range: '1–10. kérdés',
    focus: 'A középpontos tükrözés fogalma és alaptulajdonságai',
    color: 'cyan',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-300 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    questions: [
      {
        id: 1,
        question: 'Mi a középpontos tükrözés alapeleme a síkban?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <circle cx="80" cy="25" r="4.5" className="fill-amber-500 stroke-2 stroke-amber-600" />
            <circle cx="80" cy="25" r="14" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="86" y="22" className="text-[9px] font-bold fill-amber-700 dark:fill-amber-400">O (Centrum)</text>
            <line x1="30" y1="25" x2="130" y2="25" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
          </svg>
        ),
        options: [
          'Egy rögzített pont, az úgynevezett tükörközéppont (centrum)',
          'Egy egyenes, az úgynevezett tükörtengely',
          'Egy eltolási vektor',
          'Egy adott forgatási szög és egy tengely'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés alapeleme a sík egyetlen kijelölt pontja, a centrum ($O$).'
      },
      {
        id: 2,
        question: 'Ha P nem azonos a tükörközépponttal (P ≠ O), mi a definíció szerint az O pont helyzete a P pont és P\' képe viszonylatában?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.5" />
            <line x1="30" y1="25" x2="80" y2="25" stroke="#0891b2" strokeWidth="2.5" />
            <line x1="80" y1="25" x2="130" y2="25" stroke="#0891b2" strokeWidth="2.5" />
            <line x1="55" y1="20" x2="55" y2="30" stroke="#0891b2" strokeWidth="1.5" />
            <line x1="105" y1="20" x2="105" y2="30" stroke="#0891b2" strokeWidth="1.5" />
            <circle cx="30" cy="25" r="3.5" className="fill-cyan-600" />
            <circle cx="80" cy="25" r="4" className="fill-amber-500" />
            <circle cx="130" cy="25" r="3.5" className="fill-teal-600" />
            <text x="26" y="16" className="text-[9px] font-bold fill-cyan-800 dark:fill-cyan-300">P</text>
            <text x="76" y="16" className="text-[9px] font-bold fill-amber-700 dark:fill-amber-400">O</text>
            <text x="126" y="16" className="text-[9px] font-bold fill-teal-800 dark:fill-teal-300">P'</text>
            <text x="65" y="44" className="text-[7.5px] font-bold fill-slate-500">|PO| = |OP'|</text>
          </svg>
        ),
        options: [
          'O a PP\' szakasz felezőpontja',
          'O a PP\' szakasz harmadolópontja P-hez közelebb',
          'O a PP\' szakaszra merőleges egyenesen van',
          'O a PP\' szakasz kezdőpontja'
        ],
        correctAnswer: 0,
        explanation: 'A definíció szerint az O centrum felezi a P pontot és P\' képpontot összekötő PP\' szakaszt, azaz |OP| = |OP\'|.'
      },
      {
        id: 3,
        question: 'Mi a tükörközéppont (centrum, O) képe a középpontos tükrözés során?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <circle cx="80" cy="28" r="4.5" className="fill-amber-500 stroke-2 stroke-amber-600" />
            <path d="M 74 20 A 12 12 0 1 1 86 20" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
            <polygon points="86,20 86,15 81,18" fill="#f59e0b" />
            <text x="56" y="44" className="text-[9px] font-bold fill-amber-700 dark:fill-amber-400">O = O' (Fixpont)</text>
          </svg>
        ),
        options: [
          'Önmaga: O\' = O',
          'A sík végtelen távoli pontja',
          'A centrum képe nem értelmezett',
          'Az origó'
        ],
        correctAnswer: 0,
        explanation: 'A definíció első pontja kimondja: ha P = O, akkor a képe önmaga ($O\' = O$).'
      },
      {
        id: 4,
        question: 'Hány darab fixpontja van a középpontos tükrözésnek a síkban?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="25" y1="15" x2="135" y2="35" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="25" y1="35" x2="135" y2="15" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="80" cy="25" r="4" className="fill-amber-500" />
            <circle cx="35" cy="17" r="2.5" className="fill-cyan-500" />
            <circle cx="125" cy="33" r="2.5" className="fill-teal-500" />
            <text x="60" y="14" className="text-[8.5px] font-bold fill-amber-700 dark:fill-amber-400">1 db fixpont (kizárólag O)</text>
          </svg>
        ),
        options: [
          'Pontosan 1 darab (kizárólag az O centrum)',
          'Végtelen sok (egy egész egyenes)',
          'Nincs egyetlen fixpontja sem',
          'Pontosan 2 darab'
        ],
        correctAnswer: 0,
        explanation: 'Kizárólag az O centrum képe önmaga, így a középpontos tükrözésnek pontosan 1 darab fixpontja van.'
      },
      {
        id: 5,
        question: 'Egy AB szakasz hossza 8 cm. Mennyi a középpontos tükörképe, az A\'B\' szakasz hossza?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="30" y1="14" x2="80" y2="14" stroke="#0891b2" strokeWidth="2.5" />
            <line x1="80" y1="36" x2="130" y2="36" stroke="#0d9488" strokeWidth="2.5" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="42" y="10" className="text-[8px] font-bold fill-cyan-700 dark:fill-cyan-400">AB = 8 cm</text>
            <text x="92" y="47" className="text-[8px] font-bold fill-teal-700 dark:fill-teal-400">A'B' = 8 cm</text>
            <line x1="30" y1="14" x2="130" y2="36" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="80" y1="14" x2="80" y2="36" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
          </svg>
        ),
        options: [
          'Pontosan 8 cm, mert a középpontos tükrözés távolságtartó',
          '16 cm, mert megduplázódik a távolság a centrum miatt',
          '4 cm, mert a felezőpont megfelezi a szakaszt',
          'Függ attól, hogy milyen messze van a centrum'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés egybevágósági transzformáció, azaz távolságtartó: $|A\'B\'| = |AB| = 8\\text{ cm}$.'
      },
      {
        id: 6,
        question: 'Ha a P pont távolsága az O centrumtól 6 cm, milyen messze van a P\' képpont a P ponttól?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="20" x2="140" y2="20" stroke="#0891b2" strokeWidth="2" />
            <circle cx="20" cy="20" r="3" className="fill-cyan-600" />
            <circle cx="80" cy="20" r="3.5" className="fill-amber-500" />
            <circle cx="140" cy="20" r="3" className="fill-teal-600" />
            <text x="42" y="15" className="text-[7.5px] font-bold fill-cyan-700 dark:fill-cyan-400">6 cm</text>
            <text x="102" y="15" className="text-[7.5px] font-bold fill-teal-700 dark:fill-teal-400">6 cm</text>
            <path d="M 20 28 L 20 33 L 80 33 L 80 37 L 80 33 L 140 33 L 140 28" fill="none" stroke="#64748b" strokeWidth="1" />
            <text x="60" y="46" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">PP' = 12 cm</text>
          </svg>
        ),
        options: [
          '12 cm, mert |PP\'| = 2 · |OP| = 2 · 6 cm = 12 cm',
          '6 cm, mert |PP\'| = |OP|',
          '3 cm, mert feleződik a távolság',
          '0 cm, mert egybeesnek'
        ],
        correctAnswer: 0,
        explanation: 'Mivel O felezi a PP\' szakaszt, a teljes PP\' távolság: $|OP| + |OP\'| = 6 + 6 = 12\\text{ cm}$.'
      },
      {
        id: 7,
        question: 'Hogyan szerkesztjük meg egy P pont középpontos tükörképét körzővel és vonalzóval?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="145" y2="25" stroke="#0891b2" strokeWidth="1.8" />
            <polygon points="147,25 141,22 141,28" fill="#0891b2" />
            <circle cx="35" cy="25" r="3" className="fill-cyan-600" />
            <circle cx="80" cy="25" r="3.5" className="fill-amber-500" />
            <circle cx="125" cy="25" r="3" className="fill-teal-600" />
            <path d="M 125 15 A 10 10 0 0 1 125 35" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="32" y="18" className="text-[8px] font-bold fill-cyan-700 dark:fill-cyan-400">P</text>
            <text x="77" y="18" className="text-[8px] font-bold fill-amber-700 dark:fill-amber-400">O</text>
            <text x="122" y="18" className="text-[8px] font-bold fill-teal-700 dark:fill-teal-400">P'</text>
          </svg>
        ),
        options: [
          'Félegyenest húzunk P-ből O-n át, majd O-ból felmérjük az OP távolságot a meghosszabbításra',
          'Merőlegest bocsátunk P-ből O-ra, és felezzük a merőlegest',
          'P köré körívet rajzolunk OP sugárral O érintésével',
          'O pont körül 90 fokos szöget másolunk fel'
        ],
        correctAnswer: 0,
        explanation: 'Vonalzóval félegyenest húzunk P-ből O-n keresztül, majd körzővel kimérve az OP szakaszt, O-ból felmérjük a félegyenesre.'
      },
      {
        id: 8,
        question: 'Mi lesz egy 5 cm sugarú kör középpontos tükörképe?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <circle cx="40" cy="25" r="16" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <circle cx="120" cy="25" r="16" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="40" cy="25" r="2" fill="#0891b2" />
            <circle cx="120" cy="25" r="2" fill="#0d9488" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <line x1="40" y1="25" x2="120" y2="25" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="40" y1="25" x2="56" y2="25" stroke="#0891b2" strokeWidth="1.5" />
            <line x1="120" y1="25" x2="136" y2="25" stroke="#0d9488" strokeWidth="1.5" />
            <text x="44" y="22" className="text-[6.5px] font-bold fill-cyan-700 dark:fill-cyan-400">r = 5</text>
            <text x="124" y="22" className="text-[6.5px] font-bold fill-teal-700 dark:fill-teal-400">r' = 5</text>
          </svg>
        ),
        options: [
          'Egy ugyancsak 5 cm sugarú kör, amelynek középpontja az eredeti kör középpontjának tükörképe',
          'Egy 10 cm sugarú kör',
          'Egy ellipszis, mert a pontok elmozdulnak',
          'Egy egyenes, amely átmegy a centrumon'
        ],
        correctAnswer: 0,
        explanation: 'A távolságtartás miatt a sugár változatlan ($r\' = r = 5\\text{ cm}$), a kör középpontja pedig az eredeti középpont képe.'
      },
      {
        id: 9,
        question: 'Melyik állítás IGAZ a középpontos tükrözés egyenessel alkotott kapcsolatára?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="12" x2="140" y2="12" stroke="#0891b2" strokeWidth="2" />
            <line x1="20" y1="38" x2="140" y2="38" stroke="#0d9488" strokeWidth="2" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="142" y="15" className="text-[8px] font-bold fill-cyan-700 dark:fill-cyan-400">e</text>
            <text x="142" y="41" className="text-[8px] font-bold fill-teal-700 dark:fill-teal-400">e'</text>
            <text x="35" y="28" className="text-[7.5px] fill-slate-500 font-medium">Egyenes képe egyenes</text>
          </svg>
        ),
        options: [
          'Egyenes képe mindig egyenes (egyenestartó)',
          'Egyenes képe csak akkor egyenes, ha átmegy a centrumon',
          'Egyenes képe mindig körívvé hajlik',
          'Egyenes képe ponttá zsugorodik'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés egyenestartó: egyenes képe egyenes, félegyenesé félegyenes, szakaszé szakasz.'
      },
      {
        id: 10,
        question: 'Egy háromszög területe 24 cm². Mennyi lesz a középpontos tükörképének területe?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="40,8 20,38 55,38" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="120,42 140,12 105,12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="25" y="26" className="text-[7px] font-bold fill-sky-800">24 cm²</text>
            <text x="108" y="26" className="text-[7px] font-bold fill-teal-800">24 cm²</text>
            <text x="75" y="16" className="text-[7px] font-bold fill-amber-700">O</text>
          </svg>
        ),
        options: [
          'Pontosan 24 cm², mert a transzformáció területtartó',
          '48 cm²',
          '12 cm²',
          '0 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a középpontos tükrözés egybevágósági transzformáció, területtartó: $T(A\'B\'C\') = T(ABC) = 24\\text{ cm}^2$.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Tulajdonságok és Tételek',
    subtitle: 'Fixegyenesek, képegyenesek párhuzamossága, orientációtartás és forgatás',
    range: '11–20. kérdés',
    focus: 'Invariáns tulajdonságok és mélyebb geometriai összefüggések',
    color: 'teal',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-300 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    questions: [
      {
        id: 11,
        question: 'Mely egyenesek a középpontos tükrözés fixegyenesei?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="42" x2="140" y2="8" stroke="#0891b2" strokeWidth="2.5" />
            <circle cx="80" cy="25" r="4" className="fill-amber-500 stroke-2 stroke-amber-600" />
            <text x="86" y="22" className="text-[8.5px] font-bold fill-amber-700 dark:fill-amber-400">O ∈ e</text>
            <text x="135" y="18" className="text-[9px] font-bold fill-cyan-700 dark:fill-cyan-400">e = e'</text>
          </svg>
        ),
        options: [
          'Minden olyan egyenes, amely átmegy az O tükörközépponton (O ∈ e)',
          'Csak a koordináta-rendszer x és y tengelyei',
          'Minden olyan egyenes, amely elkerüli az O centrumot',
          'Nincsenek fixegyenesei'
        ],
        correctAnswer: 0,
        explanation: 'Ha $O \\in e$, akkor az egyenes bármely $P$ pontjának képe is az $e$ egyenesre esik, így az egyenes önmagába képződik le ($e\' = e$).'
      },
      {
        id: 12,
        question: 'Pontonként fixek-e a középpontos tükrözés fixegyenesei?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#0891b2" strokeWidth="2" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <circle cx="40" cy="25" r="3" fill="#0891b2" />
            <circle cx="120" cy="25" r="3" fill="#0d9488" />
            <path d="M 40 20 C 60 10, 100 10, 120 20" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="2 2" />
            <polygon points="120,20 115,16 117,23" fill="#6366f1" />
            <text x="36" y="38" className="text-[8px] font-bold fill-cyan-800 dark:fill-cyan-300">A</text>
            <text x="77" y="38" className="text-[8px] font-bold fill-amber-700 dark:fill-amber-400">O</text>
            <text x="116" y="38" className="text-[8px] font-bold fill-teal-800 dark:fill-teal-300">A'</text>
          </svg>
        ),
        options: [
          'Nem, mert a pontok helyet cserélnek a centrum túloldalán (kivéve magát az O pontot)',
          'Igen, a fixegyenes minden egyes pontja fixpont',
          'Igen, mert a fixegyenes definíciója ezt követeli meg',
          'Csak akkor, ha az egyenes vízszintes'
        ],
        correctAnswer: 0,
        explanation: 'A fixegyenes egésze képezi le önmagára a ponthalmazt, de az egyes pontjai elmozdulnak: $P \\to P\'$ ($O$ túloldalára vándorolnak).'
      },
      {
        id: 13,
        question: 'Mi a kapcsolat egy e egyenes és e\' középpontos tükörképe között, ha az egyenes NEM megy át az O centrumon (O ∉ e)?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="12" x2="140" y2="12" stroke="#2563eb" strokeWidth="2" />
            <line x1="20" y1="38" x2="140" y2="38" stroke="#0d9488" strokeWidth="2" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <text x="142" y="15" className="text-[8.5px] font-bold fill-blue-700 dark:fill-blue-400">e</text>
            <text x="142" y="41" className="text-[8.5px] font-bold fill-teal-700 dark:fill-teal-400">e'</text>
            <text x="86" y="27" className="text-[8px] font-bold fill-amber-700 dark:fill-amber-400">O ∉ e</text>
            <text x="45" y="28" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300">e' ∥ e</text>
          </svg>
        ),
        options: [
          'A képegyenes szigorúan párhuzamos az eredetivel: e\' ∥ e',
          'A képegyenes merőleges az eredetire: e\' ⊥ e',
          'Metszik egymást az O pontban',
          'Kitérő helyzetűek'
        ],
        correctAnswer: 0,
        explanation: 'Alaptétel: Ha $O \\notin e$, akkor $e\' \\parallel e$. A középpontos tükrözésnél az egyenes képe mindig párhuzamos az eredeti egyenessel.'
      },
      {
        id: 14,
        question: 'Hogyan viselkedik a körüljárási irány (orientáció) a középpontos tükrözés során?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="35,10 20,38 50,38" fill="none" stroke="#0891b2" strokeWidth="1.8" />
            <path d="M 31 28 A 6 6 0 1 1 38 28" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <polygon points="38,28 38,24 34,26" fill="#0891b2" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <polygon points="125,40 140,12 110,12" fill="none" stroke="#0d9488" strokeWidth="1.8" />
            <path d="M 121 24 A 6 6 0 1 1 128 24" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <polygon points="128,24 128,20 124,22" fill="#0d9488" />
            <text x="42" y="47" className="text-[7.5px] font-bold fill-emerald-600 dark:fill-emerald-400">Orientációtartó (↺ → ↺)</text>
          </svg>
        ),
        options: [
          'Megőrzi a körüljárási irányt (pozitív/óramutatóval ellentétes körüljárású marad)',
          'Megfordítja a körüljárási irányt, ahogy a tengelyes tükrözés teszi',
          'Minden háromszögnél más és más, a centrum helyétől függ',
          'Csak derékszögű háromszögeknél fordul meg'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés orientációtartó (direkt egybevágóság): egy óramutatóval ellentétes körüljárású háromszög képe is óramutatóval ellentétes marad.'
      },
      {
        id: 15,
        question: 'Milyen síkbeli elforgatással egyenértékű a középpontos tükrözés?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <path d="M 45 25 A 35 20 0 0 1 115 25" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 2" />
            <polygon points="115,25 111,19 111,29" fill="#8b5cf6" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <circle cx="45" cy="25" r="3" fill="#0891b2" />
            <circle cx="115" cy="25" r="3" fill="#0d9488" />
            <text x="40" y="37" className="text-[8px] font-bold fill-cyan-800 dark:fill-cyan-300">P</text>
            <text x="73" y="15" className="text-[9px] font-bold fill-purple-700 dark:fill-purple-400">180°</text>
            <text x="112" y="37" className="text-[8px] font-bold fill-teal-800 dark:fill-teal-300">P'</text>
          </svg>
        ),
        options: [
          'Az O centrum körüli 180°-os síkbeli forgatással',
          'Az O centrum körüli 90°-os síkbeli forgatással',
          'Az O centrum körüli 360°-os síkbeli forgatással',
          'Nem állítható elő forgatással síkban'
        ],
        correctAnswer: 0,
        explanation: 'Mivel $P, O, P\'$ egy egyenesre esnek és $|OP| = |OP\'|$, az $O$ körüli $180^\\circ$-os forgatás pontosan a középpontos tükörképet adja.'
      },
      {
        id: 16,
        question: 'Mi történik, ha egy alakzatot kétszer egymás után tükrözünk ugyanarra az O pontra?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <path d="M 45 20 C 60 8, 100 8, 115 20" fill="none" stroke="#0891b2" strokeWidth="1.8" />
            <polygon points="115,20 110,16 112,23" fill="#0891b2" />
            <path d="M 115 30 C 100 42, 60 42, 45 30" fill="none" stroke="#0d9488" strokeWidth="1.8" />
            <polygon points="45,30 50,34 48,27" fill="#0d9488" />
            <circle cx="45" cy="25" r="3" fill="#0891b2" />
            <circle cx="115" cy="25" r="3" fill="#0d9488" />
            <text x="56" y="27" className="text-[8px] font-bold fill-emerald-600 dark:fill-emerald-400">T² = Identitás</text>
          </svg>
        ),
        options: [
          'Visszakapjuk az eredeti alakzatot változatlanul (identitás: T_O(T_O(A)) = A)',
          'Az alakzat négyszeresére nő',
          'Az alakzat eltolódik kétszeres távolságra',
          'Az alakzat 90 fokkal elfordul'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés önmaga inverze: kétszer $180^\\circ$-ot forgatva $360^\\circ$-ot kapunk, ami a helybenhagyás (identitás).'
      },
      {
        id: 17,
        question: 'Egy α = 65°-os szög középpontos tükörképe hány fokos lesz?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="35" x2="55" y2="35" stroke="#0891b2" strokeWidth="2" />
            <line x1="20" y1="35" x2="42" y2="12" stroke="#0891b2" strokeWidth="2" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <line x1="140" y1="15" x2="105" y2="15" stroke="#0d9488" strokeWidth="2" />
            <line x1="140" y1="15" x2="118" y2="38" stroke="#0d9488" strokeWidth="2" />
            <text x="32" y="30" className="text-[7.5px] font-bold fill-cyan-700 dark:fill-cyan-400">65°</text>
            <text x="118" y="23" className="text-[7.5px] font-bold fill-teal-700 dark:fill-teal-400">65°</text>
            <text x="73" y="16" className="text-[7px] font-bold fill-amber-700">O</text>
          </svg>
        ),
        options: [
          'Pontosan 65°, mert a leképezés szögtartó',
          '115°, mert kiegészítő szög lesz',
          '130°, mert megduplázódik',
          '245°, mert 180 fokkal növekszik'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés egybevágóság, tehát szögtartó transzformáció: $\\alpha\' = \\alpha = 65^\\circ$.'
      },
      {
        id: 18,
        question: 'Hogyan viszonyul egy AB irányított szakasz (vektor) az A\'B\' képéhez középpontos tükrözésnél?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="25" y1="15" x2="65" y2="15" stroke="#0891b2" strokeWidth="2" />
            <polygon points="69,15 63,11 63,19" fill="#0891b2" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <line x1="135" y1="35" x2="95" y2="35" stroke="#0d9488" strokeWidth="2" />
            <polygon points="91,35 97,31 97,39" fill="#0d9488" />
            <text x="36" y="11" className="text-[7.5px] font-bold fill-cyan-700 dark:fill-cyan-400">AB vektor →</text>
            <text x="96" y="47" className="text-[7.5px] font-bold fill-teal-700 dark:fill-teal-400">← A'B' = -AB</text>
          </svg>
        ),
        options: [
          'Iránya pontosan az ellenkezőjére fordul (A\'B\' vektor = -AB vektor)',
          'Iránya pontosan megegyezik vele',
          'Merőleges lesz rá',
          'Hossza a felére csökken'
        ],
        correctAnswer: 0,
        explanation: 'Mivel $A \\to A\'$ és $B \\to B\'$ a centrum túloldalára kerülnek, az $A$-ból $B$-be mutató vektor tükörképe az ellentett irányú vektor lesz.'
      },
      {
        id: 19,
        question: 'Melyik tulajdonságban KÜLÖNBÖZIK a középpontos tükrözés a tengelyes tükrözéstől?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <circle cx="45" cy="25" r="4" fill="#0891b2" />
            <text x="20" y="42" className="text-[7.5px] font-bold fill-cyan-700 dark:fill-cyan-400">O (1 fixpont, ↺)</text>
            <line x1="80" y1="5" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="125" y1="5" x2="125" y2="45" stroke="#6366f1" strokeWidth="2" />
            <text x="96" y="42" className="text-[7.5px] font-bold fill-indigo-700 dark:fill-indigo-400">t (∞ fixpont, ↻)</text>
          </svg>
        ),
        options: [
          'A körüljárási irány megőrzésében és a fixpontok számában',
          'A távolságtartásban (egyik sem távolságtartó)',
          'A szögtartásban',
          'Az egyenestartásban'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés megőrzi a körüljárást (1 fixpont), míg a tengelyes megfordítja azt (végtelen sok fixpont a tengelyen).'
      },
      {
        id: 20,
        question: 'Ha egy téglalap átlóinak metszéspontjára tükrözzük a téglalapot, mit kapunk?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <rect x="50" y="10" width="60" height="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" rx="1" />
            <line x1="50" y1="10" x2="110" y2="40" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="50" y1="40" x2="110" y2="10" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <text x="84" y="24" className="text-[8px] font-bold fill-amber-700 dark:fill-amber-400">O</text>
          </svg>
        ),
        options: [
          'Önmagát fedi el (a téglalap középpontosan szimmetrikus az átlók metszéspontjára)',
          'Egy rá merőleges téglalapot',
          'Egy négyzetet',
          'Egy trapézt'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap átlói felezik egymást és egyenlő hosszúak, így az átlók metszéspontja szimmetriaközéppont: a tükörkép önmaga.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Koordinátageometria és Alakzatok',
    subtitle: 'Origóra tükrözés, koordináták, négyszögek és összetett geometriai állítások',
    range: '21–30. kérdés',
    focus: 'Számításos koordinátafeladatok, szimmetriák és logikai tesztek',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-300 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    questions: [
      {
        id: 21,
        question: 'Mi lesz a P(3; -5) pont koordinátája, ha a derékszögű koordináta-rendszer origójára (O(0;0)) tükrözzük?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#94a3b8" strokeWidth="1" />
            <line x1="80" y1="5" x2="80" y2="45" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="80" cy="25" r="2.5" fill="#f59e0b" />
            <circle cx="108" cy="38" r="3" fill="#0891b2" />
            <circle cx="52" cy="12" r="3" fill="#0d9488" />
            <line x1="52" y1="12" x2="108" y2="38" stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="1" />
            <text x="110" y="42" className="text-[7px] font-bold fill-cyan-700 dark:fill-cyan-400">P(3; -5)</text>
            <text x="20" y="14" className="text-[7px] font-bold fill-teal-700 dark:fill-teal-400">P'(-3; 5)</text>
          </svg>
        ),
        options: [
          'P\'(-3; 5)',
          'P\'(3; 5)',
          'P\'(-5; 3)',
          'P\'(-3; -5)'
        ],
        correctAnswer: 0,
        explanation: 'Az origóra tükrözés szabálya: $P(x; y) \\to P\'(-x; -y)$. Ezért $P(3; -5) \\to P\'(-3; 5)$.'
      },
      {
        id: 22,
        question: 'Egy szakasz végpontjai A(-4; 2) és B(6; -8). Mennyi a szakasz felezőpontjának (azaz szimmetriaközéppontjának) koordinátája?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="30" y1="12" x2="130" y2="38" stroke="#6366f1" strokeWidth="2" />
            <circle cx="30" cy="12" r="3" fill="#6366f1" />
            <circle cx="130" cy="38" r="3" fill="#6366f1" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <text x="15" y="10" className="text-[7px] font-bold fill-indigo-700 dark:fill-indigo-300">A(-4; 2)</text>
            <text x="115" y="46" className="text-[7px] font-bold fill-indigo-700 dark:fill-indigo-300">B(6; -8)</text>
            <text x="84" y="22" className="text-[7.5px] font-bold fill-amber-700 dark:fill-amber-400">F(1; -3)</text>
          </svg>
        ),
        options: [
          'F(1; -3)',
          'F(2; -6)',
          'F(-5; 5)',
          'F(0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'A felezőpont koordinátái a végpontok számtani közepei: $x_F = \\frac{-4+6}{2} = 1$, $y_F = \\frac{2+(-8)}{2} = -3$, tehát $F(1; -3)$.'
      },
      {
        id: 23,
        question: 'A P(2; 7) pont tükörképe egy ismeretlen O centrumra nézve a P\'(6; 1) pont. Mik az O centrum koordinátái?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="35" y1="12" x2="125" y2="38" stroke="#0891b2" strokeWidth="2" />
            <circle cx="35" cy="12" r="3" fill="#0891b2" />
            <circle cx="125" cy="38" r="3" fill="#0d9488" />
            <circle cx="80" cy="25" r="4" fill="#f59e0b" />
            <text x="18" y="12" className="text-[7.5px] font-bold fill-cyan-800 dark:fill-cyan-300">P(2; 7)</text>
            <text x="118" y="45" className="text-[7.5px] font-bold fill-teal-800 dark:fill-teal-300">P'(6; 1)</text>
            <text x="84" y="22" className="text-[8px] font-bold fill-amber-700 dark:fill-amber-400">O(4; 4) = ?</text>
          </svg>
        ),
        options: [
          'O(4; 4)',
          'O(8; 8)',
          'O(3; 3)',
          'O(2; -3)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel O felezi a PP\' szakaszt: $x_O = \\frac{2+6}{2} = 4$, $y_O = \\frac{7+1}{2} = 4$, vagyis $O(4; 4)$.'
      },
      {
        id: 24,
        question: 'Melyik négyszög NEM rendelkezik középpontos szimmetriával az alábbiak közül?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="45,25 65,8 100,25 65,42" fill="#fed7aa" stroke="#f97316" strokeWidth="1.8" />
            <line x1="45" y1="25" x2="100" y2="25" stroke="#f97316" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="65" y1="8" x2="65" y2="42" stroke="#f97316" strokeDasharray="2 2" strokeWidth="1" />
            <text x="106" y="28" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400">Nincs O centrum!</text>
          </svg>
        ),
        options: [
          'Általános deltoid (amely nem rombusz)',
          'Paralelogramma',
          'Rombusz',
          'Négyzet'
        ],
        correctAnswer: 0,
        explanation: 'A deltoidnak van szimmetriatengelye, de nincs szimmetriaközéppontja (kivéve a speciális esetet, a rombuszt).'
      },
      {
        id: 25,
        question: 'Középpontosan szimmetrikus-e egy szabályos háromszög?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="55,10 35,42 75,42" fill="none" stroke="#6366f1" strokeWidth="1.8" />
            <polygon points="105,42 85,10 125,10" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="46" y="48" className="text-[7px] font-bold fill-indigo-600 dark:fill-indigo-300">Eredeti ▲</text>
            <text x="94" y="48" className="text-[7px] font-bold fill-rose-600 dark:fill-rose-300">180° után ▼</text>
            <text x="76" y="26" className="text-[10px] font-bold fill-rose-600">≠</text>
          </svg>
        ),
        options: [
          'Nem, mert 180 fokos forgatás után a csúcsa lefelé mutatna, nem fedné el önmagát',
          'Igen, a súlypontjára',
          'Igen, bármelyik magasságvonal felezőpontjára',
          'Csak akkor, ha egyenlő oldalú és hegyesszögű'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszögnek 3 szimmetriatengelye van és $120^\\circ$-os forgásszimmetriája, de $180^\\circ$-os forgatásra (középpontos tükrözésre) NEM szimmetrikus.'
      },
      {
        id: 26,
        question: 'Középpontosan szimmetrikus-e egy szabályos hatszög?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="80,7 100,16 100,34 80,43 60,34 60,16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="80" y1="7" x2="80" y2="43" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="60" y1="16" x2="100" y2="34" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="60" y1="34" x2="100" y2="16" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="108" y="28" className="text-[7.5px] font-bold fill-teal-700 dark:fill-teal-300">Szimmetrikus</text>
          </svg>
        ),
        options: [
          'Igen, a köré írt kör középpontjára szimmetrikus',
          'Nem, a hatszögeknek csak tengelyei vannak',
          'Csak a páros számú csúcsok tükröződnek',
          'Csak akkor, ha az oldalai 10 cm-nél kisebbek'
        ],
        correctAnswer: 0,
        explanation: 'Minden páros oldalszámú szabályos sokszög (négyzet, hatszög, nyolcszög stb.) középpontosan szimmetrikus a középpontjára.'
      },
      {
        id: 27,
        question: 'Egy egyenes egyenlete y = 2x + 3. Mi lesz a képe, ha az origóra tükrözzük?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="80" y1="5" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="80" cy="25" r="2.5" fill="#f59e0b" />
            <line x1="45" y1="42" x2="95" y2="6" stroke="#2563eb" strokeWidth="1.8" />
            <line x1="65" y1="44" x2="115" y2="8" stroke="#0d9488" strokeWidth="1.8" />
            <text x="36" y="14" className="text-[6.5px] font-bold fill-blue-700 dark:fill-blue-400">y = 2x + 3</text>
            <text x="106" y="44" className="text-[6.5px] font-bold fill-teal-700 dark:fill-teal-400">y = 2x - 3</text>
          </svg>
        ),
        options: [
          'y = 2x - 3 (párhuzamos az eredetivel, tengelymetszete az ellentettjére vált)',
          'y = -2x - 3',
          'y = -0.5x + 3',
          'y = 2x + 3'
        ],
        correctAnswer: 0,
        explanation: 'Az origóra tükrözésnél $x \\to -x$ és $y \\to -y$, tehát $-y = 2(-x) + 3 \\implies y = 2x - 3$. A meredekség (2) változatlan, a vonalak párhuzamosak!'
      },
      {
        id: 28,
        question: 'Melyik állítás HAMIS a középpontos tükrözésre vonatkozóan?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <path d="M 45 35 L 25 35 L 40 18" fill="none" stroke="#0891b2" strokeWidth="2" />
            <path d="M 115 15 L 135 15 L 120 32" fill="none" stroke="#0d9488" strokeWidth="2" />
            <circle cx="80" cy="25" r="3" fill="#f59e0b" />
            <text x="32" y="32" className="text-[7.5px] font-bold fill-cyan-700 dark:fill-cyan-400">α</text>
            <text x="123" y="24" className="text-[7.5px] font-bold fill-teal-700 dark:fill-teal-400">α' = α</text>
            <text x="56" y="45" className="text-[7.5px] font-bold fill-rose-600 dark:fill-rose-400">Nem mellékszögek!</text>
          </svg>
        ),
        options: [
          'Egy szög és képe mellékszögek egymással',
          'A leképezés távolságtartó és szögtartó',
          'Bármely centrumot nem tartalmazó egyenes párhuzamos a képével',
          'A háromszög körüljárási iránya változatlan marad'
        ],
        correctAnswer: 0,
        explanation: 'A szög és képe egyenlő nagyságúak ($\alpha\' = \alpha$), nem feltétlenül mellékszögek (összegük nem feltétlenül 180°).'
      },
      {
        id: 29,
        question: 'Ha egy ΔABC háromszög csúcsai A(0;0), B(4;0) és C(0;3), hol lesz a képháromszög C\' csúcsa az origóra tükrözve?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="80" y1="5" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="80,25 110,25 80,10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="80,25 50,25 80,40" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="80" cy="10" r="2.5" fill="#0284c7" />
            <circle cx="80" cy="40" r="2.5" fill="#0d9488" />
            <text x="84" y="11" className="text-[7px] font-bold fill-sky-800 dark:fill-sky-300">C(0; 3)</text>
            <text x="84" y="43" className="text-[7px] font-bold fill-teal-800 dark:fill-teal-300">C'(0; -3)</text>
          </svg>
        ),
        options: [
          'C\'(0; -3)',
          'C\'(0; 3)',
          'C\'(-3; 0)',
          'C\'(3; 0)'
        ],
        correctAnswer: 0,
        explanation: '$C(0; 3) \\to C\'(-0; -3) = C\'(0; -3)$.'
      },
      {
        id: 30,
        question: 'Egy alakzat szimmetriaközéppontja az O pont. Mit jelent ez az alakzat pontjaira nézve?',
        figure: (
          <svg viewBox="0 0 160 50" className="w-44 h-14 mx-auto">
            <polygon points="50,38 75,12 110,12 85,38" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.8" />
            <circle cx="80" cy="25" r="3.5" fill="#f59e0b" />
            <circle cx="62" cy="25" r="2.5" fill="#4f46e5" />
            <circle cx="98" cy="25" r="2.5" fill="#4f46e5" />
            <line x1="62" y1="25" x2="98" y2="25" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <text x="54" y="23" className="text-[7px] font-bold fill-indigo-700 dark:fill-indigo-300">P</text>
            <text x="83" y="23" className="text-[7px] font-bold fill-amber-700 dark:fill-amber-400">O</text>
            <text x="98" y="23" className="text-[7px] font-bold fill-indigo-700 dark:fill-indigo-300">P'</text>
            <text x="36" y="47" className="text-[7px] font-bold fill-indigo-600 dark:fill-indigo-400">∀ P ∈ alakzat ⇒ P' ∈ alakzat</text>
          </svg>
        ),
        options: [
          'Az alakzat bármely P pontjának O-ra vonatkozó P\' tükörképe szintén az alakzathoz tartozik',
          'Az alakzat minden pontja az O pontban metszi egymást',
          'Az alakzat területe pontosan 0',
          'Az alakzatnak legalább 4 szimmetriatengellyel kell rendelkeznie'
        ],
        correctAnswer: 0,
        explanation: 'Egy alakzat akkor középpontosan szimmetrikus, ha az O centrumra való tükrözés önmagába viszi át az alakzatot: $\\forall P \\in alakzat \\implies P\' \\in alakzat$.'
      }
    ]
  }
};

export const PointReflectionQuiz: React.FC<PointReflectionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={7}
      chapterId="g7-geom-trans"
      topicId="g7-geom-point-reflection"
      topicTitle="5. Középpontos tükrözés"
      badge="7. Osztály • III. Fejezet"
      topicBadge="Középpontos Tükrözés"
      emoji="🎯"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Találd meg a fogalom-párhuzam párokat!',
          icon: <Shapes className="w-4 h-4 text-cyan-600" />,
          badgeText: 'Ranglistás',
          render: props => (
            <PointReflectionMatcher
              level={props.level}
              onNextLevel={props.onNextLevel}
              onOpenRules={props.onOpenRules}
              onSwitchToTheory={props.onSwitchToTheory}
              onSwitchToQuiz={props.onSwitchToQuiz}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Sorold be a geometriai kártyákat a kategóriákba!',
          icon: <Maximize2 className="w-4 h-4 text-teal-600" />,
          badgeText: '3 Kategória',
          render: props => (
            <PointReflectionSorter
              level={props.level}
              onNextLevel={props.onNextLevel}
              onOpenRules={props.onOpenRules}
              onSwitchToTheory={props.onSwitchToTheory}
              onSwitchToQuiz={props.onSwitchToQuiz}
              onSwitchToMatcher={props.onSwitchToMatcher}
            />
          )
        }
      ]}
    />
  );
};

export default PointReflectionQuiz;
