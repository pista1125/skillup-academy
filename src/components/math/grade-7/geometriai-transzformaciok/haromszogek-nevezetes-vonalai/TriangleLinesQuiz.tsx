import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleLinesMatcher } from './TriangleLinesMatcher';
import { TriangleLinesSorter } from './TriangleLinesSorter';
import {
  Sparkles,
  Compass,
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  ArrowRightLeft,
  LayoutGrid,
  Ruler,
  Triangle,
  CircleDot,
  Scale
} from 'lucide-react';

interface TriangleLinesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Oldalfelező merőleges (f)',
    icon: <Compass className="w-4 h-4 text-indigo-600" />,
    formula: 'Metszéspont: O (Köré írt kör középpontja)',
    note: 'Hegyesszögűnél belül, derékszögűnél az átfogó felezőpontján (R = c/2), tompaszögűnél kívül van.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="30" r="24" fill="none" className="stroke-indigo-300 stroke-[1]" strokeDasharray="2 2" />
        <polygon points="80,6 60,45 100,45" fill="none" className="stroke-indigo-600 stroke-[2]" />
        <circle cx="80" cy="30" r="2.5" className="fill-indigo-700" />
        <text x="84" y="32" className="text-[8px] font-bold fill-indigo-800">O</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Belső szögfelező (w)',
    icon: <Target className="w-4 h-4 text-teal-600" />,
    formula: 'Metszéspont: K (Beírt kör középpontja)',
    note: 'Egyenlő távol van a 3 oldaltól (sugár: r). Mindig a háromszög belsejében van!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 50,44 110,44" fill="none" className="stroke-teal-600 stroke-[2]" />
        <circle cx="80" cy="32" r="12" fill="none" className="stroke-teal-500 stroke-[1.5]" />
        <circle cx="80" cy="32" r="2.5" className="fill-teal-700" />
        <text x="84" y="34" className="text-[8px] font-bold fill-teal-800">K</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Magasságvonal (m)',
    icon: <Ruler className="w-4 h-4 text-rose-600" />,
    formula: 'Metszéspont: M (Magasságpont)',
    note: 'Csúcsból a szemközti oldalegyenesre bocsátott merőleges. Hegyesszögűnél belül, derékszögűnél a derékszögű csúcsban, tompaszögűnél kívül.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="75,8 45,44 115,44" fill="none" className="stroke-rose-600 stroke-[2]" />
        <line x1="75" y1="8" x2="75" y2="44" className="stroke-rose-500 stroke-[1.5]" />
        <circle cx="75" cy="30" r="2.5" className="fill-rose-700" />
        <text x="79" y="32" className="text-[8px] font-bold fill-rose-800">M</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Súlyvonal (s) és Súlypont (S)',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: 'AS : SF_a = 2 : 1  (Súlypont aranyszabálya)',
    note: 'Csúcsot a szemközti oldal felezőpontjával köti össze. Mindig belül van, a csúcstól számítva 2:1 arányban osztódik.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 45,44 115,44" fill="none" className="stroke-purple-600 stroke-[2]" />
        <line x1="80" y1="6" x2="80" y2="44" className="stroke-purple-400 stroke-[1.5]" />
        <circle cx="80" cy="31" r="3" className="fill-purple-700" />
        <text x="84" y="33" className="text-[8px] font-bold fill-purple-800">S</text>
        <text x="70" y="20" className="text-[7px] font-bold fill-purple-600">2x</text>
        <text x="70" y="40" className="text-[7px] font-bold fill-purple-600">1x</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Középvonal (k)',
    icon: <Shapes className="w-4 h-4 text-amber-600" />,
    formula: 'k_c ∥ c,  k_c = c / 2,  T_kis = T / 4',
    note: 'Két oldal felezőpontját köti össze. 4 egybevágó kis háromszögre bontja az eredetit.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,6 45,44 115,44" fill="none" className="stroke-amber-600 stroke-[2]" />
        <polygon points="62,25 98,25 80,44" fill="none" className="stroke-amber-500 stroke-[1.5]" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Euler-egyenes',
    icon: <CircleDot className="w-4 h-4 text-sky-600" />,
    formula: 'M, S és O egy egyenesre esik;  MS : SO = 2 : 1',
    note: 'Nem szabályos háromszögben a magasságpont, a súlypont és a köré írt kör kp. kollineáris.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" className="stroke-sky-600 stroke-[2]" />
        <circle cx="40" cy="25" r="3" className="fill-rose-600" />
        <circle cx="90" cy="25" r="3" className="fill-purple-600" />
        <circle cx="120" cy="25" r="3" className="fill-indigo-600" />
        <text x="36" y="38" className="text-[8px] font-bold fill-rose-700">M</text>
        <text x="86" y="38" className="text-[8px] font-bold fill-purple-700">S</text>
        <text x="116" y="38" className="text-[8px] font-bold fill-indigo-700">O</text>
      </svg>
    )
  }
];

const quizLevels: LevelConfig[] = [
  // 1. SZINT: Alapfogalmak és Nevezetes Pontok (10 kérdés)
  {
    level: 1,
    title: "1. Szint: Alapfogalmak és Nevezetes Pontok",
    subtitle: 'Oldalfelező merőleges, szögfelező, magasság, súlyvonal, középvonal és a nevezetes pontok (O, K, M, S)',
    questions: [
      {
        id: 'q1-1',
        title: 'Oldalfelező merőleges fogalma',
        prompt: 'Mi a háromszög oldalfelező merőlegese?',
        questionTypeBadge: 'Alapfogalom',
        figure: (
          <svg viewBox="0 0 150 60" className="w-36 h-14 mx-auto">
            <line x1="20" y1="42" x2="130" y2="42" className="stroke-indigo-600 stroke-[2.5]" />
            <line x1="75" y1="10" x2="75" y2="52" className="stroke-indigo-500 stroke-[1.5]" strokeDasharray="3 2" />
            <circle cx="20" cy="42" r="3" className="fill-indigo-700" />
            <circle cx="130" cy="42" r="3" className="fill-indigo-700" />
            <circle cx="75" cy="42" r="3" className="fill-rose-600" />
            <rect x="75" y="34" width="8" height="8" fill="none" className="stroke-slate-500 stroke-[1]" />
            <text x="18" y="55" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">A</text>
            <text x="128" y="55" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">B</text>
            <text x="71" y="55" className="text-[9px] font-bold fill-rose-600">F</text>
            <text x="80" y="20" className="text-[9px] font-bold fill-indigo-600">f_AB</text>
          </svg>
        ),
        options: [
          'A háromszög oldalának felezőpontjára állított merőleges egyenes',
          'A csúcsból a szemközti oldalra bocsátott merőleges szakasz',
          'A csúcsot az oldal felezőpontjával összekötő szakasz',
          'A háromszög belső szögét felező félegyenes'
        ],
        correctAnswer: 'A háromszög oldalának felezőpontjára állított merőleges egyenes',
        explanation: 'Az oldalfelező merőleges (f) a szakasz felezőpontjára merőleges egyenes. Minden pontja egyenlő távol van a szakasz két végpontjától.',
        breakdown: [
          { label: 'Definíció', value: 'Oldal felezőpontjára állított merőleges egyenes' },
          { label: 'Tulajdonság', value: '|PA| = |PB|' }
        ]
      },
      {
        id: 'q1-2',
        title: 'Köré írható kör középpontja',
        prompt: 'Mely nevezetes vonalak metszéspontja határozza meg a köré írható kör középpontját (O)?',
        questionTypeBadge: 'Köré írt kör',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <circle cx="75" cy="38" r="32" fill="none" className="stroke-sky-400 stroke-[1]" strokeDasharray="2 2" />
            <polygon points="75,6 45,55 105,55" fill="none" className="stroke-sky-600 stroke-[2]" />
            <circle cx="75" cy="38" r="3" className="fill-rose-600" />
            <text x="80" y="38" className="text-[10px] font-bold fill-rose-600">O</text>
            <line x1="75" y1="38" x2="75" y2="6" className="stroke-rose-400 stroke-[1]" strokeDasharray="1 1" />
            <text x="77" y="22" className="text-[8px] font-bold fill-rose-500">R</text>
          </svg>
        ),
        options: [
          'Az oldalfelező merőlegesek',
          'A belső szögfelezők',
          'A magasságvonalak',
          'A súlyvonalak'
        ],
        correctAnswer: 'Az oldalfelező merőlegesek',
        explanation: 'A három oldalfelező merőleges egy pontban metszi egymást, ez az O pont, amely mindhárom csúcstól egyenlő távolságra van (OA = OB = OC = R).',
        breakdown: [
          { label: 'Vonalak', value: '3 oldalfelező merőleges metszéspontja' },
          { label: 'Pont', value: 'O (Köré írható kör kp.)' }
        ]
      },
      {
        id: 'q1-3',
        title: 'Beírható kör középpontja',
        prompt: 'Mely nevezetes vonalak metszéspontja adja a beírható kör középpontját (K)?',
        questionTypeBadge: 'Beírt kör',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="75,8 25,62 125,62" fill="none" className="stroke-emerald-600 stroke-[2]" />
            <circle cx="75" cy="42" r="20" fill="none" className="stroke-emerald-400 stroke-[1]" />
            <circle cx="75" cy="42" r="3" className="fill-emerald-700" />
            <text x="80" y="42" className="text-[10px] font-bold fill-emerald-800 dark:fill-emerald-200">K</text>
            <line x1="75" y1="42" x2="75" y2="62" className="stroke-emerald-500 stroke-[1]" strokeDasharray="2 2" />
            <text x="78" y="55" className="text-[8px] font-bold fill-emerald-600">r</text>
          </svg>
        ),
        options: [
          'A belső szögfelezők',
          'Az oldalfelező merőlegesek',
          'A súlyvonalak',
          'A középvonalak'
        ],
        correctAnswer: 'A belső szögfelezők',
        explanation: 'A 3 belső szögfelező (w_α, w_β, w_γ) metszéspontja a beírható kör középpontja (K), mely egyenlő távol van a háromszög oldalaitól.',
        breakdown: [
          { label: 'Vonalak', value: '3 belső szögfelező metszéspontja' },
          { label: 'Pont', value: 'K (Beírt kör kp.)' }
        ]
      },
      {
        id: 'q1-4',
        title: 'Magasságvonal definíciója',
        prompt: 'Mi a háromszög magasságvonala?',
        questionTypeBadge: 'Magasság',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="65,10 20,60 130,60" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="65" y1="10" x2="65" y2="60" className="stroke-rose-600 stroke-[2]" strokeDasharray="2 2" />
            <rect x="65" y="52" width="8" height="8" fill="none" className="stroke-slate-500 stroke-[1]" />
            <text x="70" y="38" className="text-[10px] font-bold fill-rose-600">m_c</text>
          </svg>
        ),
        options: [
          'A csúcsból a szemközti oldal egyenesére bocsátott merőleges egyenes',
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'Az oldal felezőpontjára állított merőleges',
          'Két oldal felezőpontját összekötő szakasz'
        ],
        correctAnswer: 'A csúcsból a szemközti oldal egyenesére bocsátott merőleges egyenes',
        explanation: 'A magasságvonal a csúcsból a szemközti oldalegyenesre bocsátott merőleges egyenes, hossza pedig a magasság (m).',
        breakdown: [
          { label: 'Kiindulás', value: 'Csúcsból a szemközti oldalra' },
          { label: 'Irány', value: 'Merőleges (90°)' }
        ]
      },
      {
        id: 'q1-5',
        title: 'Súlyvonal definíciója',
        prompt: 'Mi a háromszög súlyvonala (s)?',
        questionTypeBadge: 'Súlyvonal',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="65,10 20,60 130,60" fill="none" className="stroke-blue-600 stroke-[2]" />
            <line x1="65" y1="10" x2="75" y2="60" className="stroke-blue-500 stroke-[2]" />
            <circle cx="75" cy="60" r="3" className="fill-rose-600" />
            <text x="72" y="68" className="text-[9px] font-bold fill-rose-600">F_c</text>
            <text x="72" y="35" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">s_c</text>
            <line x1="45" y1="57" x2="45" y2="63" className="stroke-slate-500 stroke-[1]" />
            <line x1="100" y1="57" x2="100" y2="63" className="stroke-slate-500 stroke-[1]" />
          </svg>
        ),
        options: [
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'A csúcsból az oldalra bocsátott merőleges szakasz',
          'A belső szög felezője',
          'A két oldal felezőpontját összekötő szakasz'
        ],
        correctAnswer: 'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
        explanation: 'A súlyvonal a csúcs és a szemközti oldal felezőpontja közötti szakasz.',
        breakdown: [
          { label: 'Kezdőpont', value: 'Csúcs' },
          { label: 'Végpont', value: 'Szemközti oldal felezőpontja' }
        ]
      },
      {
        id: 'q1-6',
        title: 'Magasságpont jelölése',
        prompt: 'Hogyan jelöljük a háromszög magasságvonalainak metszéspontját?',
        questionTypeBadge: 'Magasságpont',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="60,8 18,60 132,60" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="60" y1="8" x2="60" y2="60" className="stroke-purple-400 stroke-[1]" strokeDasharray="2 2" />
            <line x1="18" y1="60" x2="90" y2="28" className="stroke-purple-400 stroke-[1]" strokeDasharray="2 2" />
            <line x1="132" y1="60" x2="42" y2="30" className="stroke-purple-400 stroke-[1]" strokeDasharray="2 2" />
            <circle cx="60" cy="45" r="3.5" className="fill-rose-600" />
            <text x="66" y="47" className="text-[11px] font-bold fill-rose-600">M</text>
          </svg>
        ),
        options: [
          'M (Magasságpont)',
          'S (Súlypont)',
          'O (Köré írt kör középpontja)',
          'K (Beírt kör középpontja)'
        ],
        correctAnswer: 'M (Magasságpont)',
        explanation: 'A magasságvonalak metszéspontját hagyományosan nagy M-mel (magasságpont) jelöljük.',
        breakdown: [
          { label: 'Metszéspont', value: '3 magasságvonal metszéspontja' },
          { label: 'Jelölés', value: 'M' }
        ]
      },
      {
        id: 'q1-7',
        title: 'Súlypont jelölése',
        prompt: 'Hogyan jelöljük a háromszög súlyvonalainak metszéspontját?',
        questionTypeBadge: 'Súlypont',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="65,10 20,60 130,60" fill="none" className="stroke-teal-600 stroke-[2]" />
            <line x1="65" y1="10" x2="75" y2="60" className="stroke-teal-400 stroke-[1]" />
            <line x1="20" y1="60" x2="97" y2="35" className="stroke-teal-400 stroke-[1]" />
            <line x1="130" y1="60" x2="42" y2="35" className="stroke-teal-400 stroke-[1]" />
            <circle cx="71" cy="43" r="3.5" className="fill-amber-600" />
            <text x="77" y="44" className="text-[11px] font-bold fill-amber-600">S (2:1)</text>
          </svg>
        ),
        options: [
          'S (Súlypont)',
          'M (Magasságpont)',
          'K (Beírt kör kp.)',
          'F (Felezőpont)'
        ],
        correctAnswer: 'S (Súlypont)',
        explanation: 'A súlyvonalak metszéspontja a súlypont (S).',
        breakdown: [
          { label: 'Metszéspont', value: '3 súlyvonal metszéspontja' },
          { label: 'Jelölés', value: 'S (Súlypont)' }
        ]
      },
      {
        id: 'q1-8',
        title: 'Középvonal definíciója',
        prompt: 'Mi a háromszög középvonala (k)?',
        questionTypeBadge: 'Középvonal',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="75,8 20,62 130,62" fill="none" className="stroke-amber-600 stroke-[2]" />
            <line x1="47" y1="35" x2="102" y2="35" className="stroke-rose-600 stroke-[2.5]" />
            <circle cx="47" cy="35" r="3" className="fill-rose-700" />
            <circle cx="102" cy="35" r="3" className="fill-rose-700" />
            <text x="70" y="30" className="text-[9px] font-bold fill-rose-600">k = c/2</text>
            <text x="70" y="58" className="text-[9px] font-bold fill-amber-700">c</text>
          </svg>
        ),
        options: [
          'A háromszög két oldalának felezőpontját összekötő szakasz',
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'A háromszög leghosszabb magassága',
          'Az oldalfelező merőleges háromszögön belüli része'
        ],
        correctAnswer: 'A háromszög két oldalának felezőpontját összekötő szakasz',
        explanation: 'A középvonal két oldal felezőpontját köti össze. Párhuzamos a 3. oldallal és hossza annak pontosan a fele.',
        breakdown: [
          { label: 'Összeköti', value: 'Két oldal felezőpontját' },
          { label: 'Tulajdonság', value: 'k ∥ c és k = c/2' }
        ]
      },
      {
        id: 'q1-9',
        title: 'Belső szögfelező tulajdonsága',
        prompt: 'Milyen mértani helyet határoz meg a belső szögfelező pontjainak halmaza?',
        questionTypeBadge: 'Szögfelező',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <line x1="20" y1="50" x2="115" y2="50" className="stroke-teal-600 stroke-[2]" />
            <line x1="20" y1="50" x2="95" y2="12" className="stroke-teal-600 stroke-[2]" />
            <line x1="20" y1="50" x2="110" y2="28" className="stroke-rose-600 stroke-[2]" strokeDasharray="3 2" />
            <circle cx="20" cy="50" r="3" className="fill-teal-700" />
            <text x="115" y="32" className="text-[9px] font-bold fill-rose-600">w_α</text>
            <text x="45" y="45" className="text-[8px] font-bold fill-teal-600">α/2</text>
            <text x="48" y="32" className="text-[8px] font-bold fill-teal-600">α/2</text>
          </svg>
        ),
        options: [
          'Egyenlő távol van a szöget bezáró két szögszártól (oldaltól)',
          'Egyenlő távol van a háromszög csúcsaitól',
          'Felezi a szemközti oldalt',
          'Merőleges a szemközti oldalra'
        ],
        correctAnswer: 'Egyenlő távol van a szöget bezáró két szögszártól (oldaltól)',
        explanation: 'A szögfelező minden pontja egyenlő távol van a szögszáraktól, ezért a 3 szögfelező metszéspontja (K) mindhárom oldaltól r távolságra van.',
        breakdown: [
          { label: 'Mértani hely', value: 'Két szögszártól egyenlő távol lévő pontok' }
        ]
      },
      {
        id: 'q1-10',
        title: 'Szabályos háromszög nevezetes pontjai',
        prompt: 'Mi mondható el a szabályos (egyenlő oldalú) háromszög nevezetes pontjairól (O, K, M, S)?',
        questionTypeBadge: 'Szabályos háromszög',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,8 20,62 120,62" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="70" cy="44" r="4" className="fill-rose-600" />
            <text x="32" y="47" className="text-[10px] font-bold fill-rose-600">O = K = M = S</text>
          </svg>
        ),
        options: [
          'Mind a négy pont egybeesik egyetlen közös ponttá',
          'Négy különböző pontot alkotnak egy négyzet csúcsaiban',
          'Csak a súlypont és a magasságpont esik egybe',
          'Mind a négy pont a háromszögön kívül található'
        ],
        correctAnswer: 'Mind a négy pont egybeesik egyetlen közös ponttá',
        explanation: 'Szabályos háromszögben a szimmetria miatt a 4 nevezetes pont (O, K, M, S) teljesen egybeesik!',
        breakdown: [
          { label: 'Háromszög fajtája', value: 'Szabályos (a = b = c)' },
          { label: 'Nevezetes pontok', value: 'O = K = M = S (egybeesnek)' }
        ]
      }
    ]
  },

  // 2. SZINT: Tulajdonságok és Háromszögtípusok (10 kérdés)
  {
    level: 2,
    title: "2. Szint: Tulajdonságok és Háromszögtípusok",
    subtitle: 'Nevezetes pontok helyzete derékszögű és tompaszögű háromszögben, középvonalak területe és hossza, Euler-egyenes',
    questions: [
      {
        id: 'q2-1',
        title: 'Derékszögű háromszög köré írt köre',
        prompt: 'Hol található a derékszögű háromszög köré írható körének középpontja (O)?',
        questionTypeBadge: 'Thalész-tétel',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <path d="M 20 55 A 55 55 0 0 1 130 55 Z" fill="none" className="stroke-sky-400 stroke-[1]" strokeDasharray="2 2" />
            <polygon points="50,15 20,55 130,55" fill="none" className="stroke-sky-600 stroke-[2]" />
            <circle cx="75" cy="55" r="3.5" className="fill-rose-600" />
            <text x="71" y="66" className="text-[10px] font-bold fill-rose-600">O (c/2)</text>
          </svg>
        ),
        options: [
          'Az átfogó felezőpontján',
          'A derékszögű csúcsban',
          'A háromszögön kívül',
          'A hosszabbik befogó harmadolópontján'
        ],
        correctAnswer: 'Az átfogó felezőpontján',
        explanation: 'A Thalész-tétel értelmében derékszögű háromszögben a köré írt kör középpontja pontosan az átfogó felezőpontja, így sugara R = c / 2.',
        breakdown: [
          { label: 'Tétel', value: 'Thalész-tétel' },
          { label: 'Helyzet', value: 'Átfogó felezőpontja (O)' }
        ]
      },
      {
        id: 'q2-2',
        title: 'Derékszögű háromszög magasságpontja',
        prompt: 'Hol helyezkedik el a derékszögű háromszög magasságpontja (M)?',
        questionTypeBadge: 'Magasságpont',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="35,15 35,55 115,55" fill="none" className="stroke-purple-600 stroke-[2]" />
            <rect x="35" y="45" width="10" height="10" fill="none" className="stroke-purple-400 stroke-[1]" />
            <circle cx="35" cy="55" r="4" className="fill-rose-600" />
            <text x="18" y="58" className="text-[11px] font-bold fill-rose-600">M</text>
          </svg>
        ),
        options: [
          'A derékszögű csúcsban',
          'Az átfogó felezőpontján',
          'A háromszög belső súlypontjában',
          'A háromszögön kívül'
        ],
        correctAnswer: 'A derékszögű csúcsban',
        explanation: 'Mivel a két befogó merőleges egymásra, azok magasságvonalak is egyben, így a magasságpont éppen a derékszögű csúcs.',
        breakdown: [
          { label: 'Befogók', value: 'Egymásra merőleges magasságvonalak' },
          { label: 'Magasságpont M', value: 'A derékszögű csúcs' }
        ]
      },
      {
        id: 'q2-3',
        title: 'Tompaszögű háromszög magasságpontja',
        prompt: 'Hol helyezkedik el a tompaszögű háromszög magasságpontja (M)?',
        questionTypeBadge: 'Tompaszögű háromszög',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="70,30 20,55 135,55" fill="none" className="stroke-amber-600 stroke-[2]" />
            <line x1="70" y1="30" x2="70" y2="8" className="stroke-rose-400 stroke-[1]" strokeDasharray="2 2" />
            <circle cx="70" cy="8" r="3.5" className="fill-rose-600" />
            <text x="76" y="12" className="text-[10px] font-bold fill-rose-600">M (kívül)</text>
          </svg>
        ),
        options: [
          'A háromszögön kívül, a tompaszögű csúcs mögött',
          'A háromszög belsejében',
          'A tompaszöggel szemközti oldal felezőpontján',
          'A leghosszabb oldal egyenesén'
        ],
        correctAnswer: 'A háromszögön kívül, a tompaszögű csúcs mögött',
        explanation: 'Tompaszögű háromszögnél a hegyesszögekből induló magasságok a tompaszög melletti oldalak meghosszabbításaira esnek, így M kívülre esik.',
        breakdown: [
          { label: 'Háromszög típusa', value: 'Tompaszögű (>90°)' },
          { label: 'M elhelyezkedése', value: 'A háromszögön KÍVÜL' }
        ]
      },
      {
        id: 'q2-4',
        title: 'Mindig a háromszög belsejében lévő pontok',
        prompt: 'Mely nevezetes pontok helyezkednek el BÁRMELY háromszög esetén (hegyes-, derék-, tompaszögű) biztosan a háromszög belsejében?',
        questionTypeBadge: 'Nevezetes pontok',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="65,10 20,55 125,55" fill="none" className="stroke-teal-600 stroke-[2]" />
            <circle cx="65" cy="40" r="3" className="fill-teal-700" />
            <circle cx="75" cy="32" r="3" className="fill-amber-600" />
            <text x="46" y="43" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">K (beírt)</text>
            <text x="80" y="34" className="text-[9px] font-bold fill-amber-600">S (súly)</text>
          </svg>
        ),
        options: [
          'A súlypont (S) és a beírható kör középpontja (K)',
          'A magasságpont (M) és a köré írt kör középpontja (O)',
          'Csak a magasságpont (M)',
          'Mind a négy nevezetes pont'
        ],
        correctAnswer: 'A súlypont (S) és a beírható kör középpontja (K)',
        explanation: 'A súlypont (S) és a beírható kör középpontja (K) kivétel nélkül mindig a belső pontja a háromszögnek. M és O tompaszög esetén kívülre vándorol.',
        breakdown: [
          { label: 'Mindig belül', value: 'S (súlypont) és K (beírt kör kp.)' },
          { label: 'Kívülre kerülhet', value: 'M (magasságpont) és O (köré írt kör kp.)' }
        ]
      },
      {
        id: 'q2-5',
        title: 'Középvonal hossza',
        prompt: 'Ha a háromszög egyik oldala c = 16 cm, mekkora a vele párhuzamos k_c középvonal hossza?',
        questionTypeBadge: 'Középvonal számítás',
        figure: (
          <svg viewBox="0 0 150 65" className="w-36 h-15 mx-auto">
            <polygon points="70,10 20,55 130,55" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <line x1="45" y1="32" x2="100" y2="32" className="stroke-rose-600 stroke-[2.5]" />
            <text x="60" y="28" className="text-[9px] font-bold fill-rose-600">k_c = ?</text>
            <text x="60" y="52" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">c = 16 cm</text>
          </svg>
        ),
        options: ['8 cm', '16 cm', '4 cm', '32 cm'],
        correctAnswer: '8 cm',
        explanation: 'A középvonal hossza mindig a párhuzamos oldal felével egyenlő: k_c = c / 2 = 16 / 2 = 8 cm.',
        breakdown: [
          { label: 'Képlet', value: 'k_c = c / 2' },
          { label: 'Számolás', value: '16 / 2 = 8 cm' }
        ]
      },
      {
        id: 'q2-6',
        title: 'Középvonalak által alkotott háromszögek területe',
        prompt: 'A 3 középvonal behúzásával 4 kis háromszöget kapunk. Ha az eredeti háromszög területe T = 48 cm², mekkora egy kis háromszög területe?',
        questionTypeBadge: 'Területbontás',
        figure: (
          <svg viewBox="0 0 150 70" className="w-36 h-16 mx-auto">
            <polygon points="75,8 20,62 130,62" fill="none" className="stroke-teal-600 stroke-[2]" />
            <polygon points="47,35 102,35 75,62" fill="none" className="stroke-rose-500 stroke-[1.5]" />
            <text x="70" y="26" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">T/4</text>
            <text x="42" y="54" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">T/4</text>
            <text x="70" y="52" className="text-[9px] font-bold fill-rose-600">T/4</text>
            <text x="98" y="54" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">T/4</text>
          </svg>
        ),
        options: ['12 cm²', '24 cm²', '16 cm²', '6 cm²'],
        correctAnswer: '12 cm²',
        explanation: 'A három középvonal 4 darab egybevágó kis háromszögre bontja az eredetit, ezért területe T_kis = T / 4 = 48 / 4 = 12 cm².',
        breakdown: [
          { label: 'Részterület', value: 'T_kis = T / 4' },
          { label: 'Számolás', value: '48 / 4 = 12 cm²' }
        ]
      },
      {
        id: 'q2-7',
        title: 'Derékszögű háromszög köré írt kör sugara',
        prompt: 'Egy derékszögű háromszög átfogója c = 14 cm. Mekkora a köré írható kör sugara (R)?',
        questionTypeBadge: 'Thalész-tétel',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="35,15 35,55 115,55" fill="none" className="stroke-blue-600 stroke-[2]" />
            <circle cx="75" cy="35" r="3" className="fill-rose-600" />
            <text x="65" y="28" className="text-[9px] font-bold fill-rose-600">R = c/2</text>
            <text x="80" y="48" className="text-[9px] font-bold fill-blue-700 dark:fill-blue-300">c = 14 cm</text>
          </svg>
        ),
        options: ['7 cm', '14 cm', '3.5 cm', '28 cm'],
        correctAnswer: '7 cm',
        explanation: 'Derékszögű háromszögben a köré írt kör átmérője az átfogó (c = 2R), így R = c / 2 = 14 / 2 = 7 cm.',
        breakdown: [
          { label: 'Képlet', value: 'R = c / 2' },
          { label: 'Eredmény', value: '14 / 2 = 7 cm' }
        ]
      },
      {
        id: 'q2-8',
        title: 'Euler-egyenes tagjai',
        prompt: 'Mely három nevezetes pont esik egy egyenesre (Euler-egyenes) nem szabályos háromszögben?',
        questionTypeBadge: 'Euler-egyenes',
        figure: (
          <svg viewBox="0 0 160 50" className="w-36 h-12 mx-auto">
            <line x1="20" y1="25" x2="140" y2="25" className="stroke-sky-600 stroke-[2]" />
            <circle cx="35" cy="25" r="3.5" className="fill-rose-600" />
            <circle cx="95" cy="25" r="3.5" className="fill-purple-600" />
            <circle cx="125" cy="25" r="3.5" className="fill-indigo-600" />
            <text x="32" y="38" className="text-[9px] font-bold fill-rose-700">M</text>
            <text x="92" y="38" className="text-[9px] font-bold fill-purple-700">S</text>
            <text x="122" y="38" className="text-[9px] font-bold fill-indigo-700">O</text>
            <text x="58" y="18" className="text-[8px] font-bold fill-slate-500">2 rész</text>
            <text x="105" y="18" className="text-[8px] font-bold fill-slate-500">1 r.</text>
          </svg>
        ),
        options: [
          'M (Magasságpont), S (Súlypont), O (Köré írt kör kp.)',
          'K (Beírt kör kp.), S (Súlypont), O (Köré írt kör kp.)',
          'M (Magasságpont), K (Beírt kör kp.), S (Súlypont)',
          'A három oldalfelező pont'
        ],
        correctAnswer: 'M (Magasságpont), S (Súlypont), O (Köré írt kör kp.)',
        explanation: 'Az Euler-egyenes az M (magasságpont), S (súlypont) és O (köré írható kör középpontja) pontokon halad át.',
        breakdown: [
          { label: 'Euler-egyenes tagjai', value: 'M, S és O kollineáris' },
          { label: 'Arány', value: 'MS : SO = 2 : 1' }
        ]
      },
      {
        id: 'q2-9',
        title: 'Egyenlő szárú háromszög tengelye',
        prompt: 'Mi igaz az egyenlő szárú háromszög alaphoz tartozó magasságvonalára?',
        questionTypeBadge: 'Szimmetriatengely',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="70,10 25,55 115,55" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <line x1="70" y1="10" x2="70" y2="55" className="stroke-rose-600 stroke-[2]" strokeDasharray="3 2" />
            <text x="74" y="35" className="text-[8px] font-bold fill-rose-600">m = s = f = w</text>
          </svg>
        ),
        options: [
          'Egybeesik az alap oldalfelező merőlegesével, a szárszög szögfelezőjével és a súlyvonallal',
          'Csak a súlyvonallal esik egybe, a szögfelezővel nem',
          'Kívül esik a háromszögön',
          'Merőleges az Euler-egyenesre'
        ],
        correctAnswer: 'Egybeesik az alap oldalfelező merőlegesével, a szárszög szögfelezőjével és a súlyvonallal',
        explanation: 'Az egyenlő szárú háromszög szimmetriatengelye egyszerre oldalfelező merőleges, belső szögfelező, magasságvonal és súlyvonal.',
        breakdown: [
          { label: 'Szimmetriatengely', value: 'Alaphoz tartozó egyenes' },
          { label: 'Egybeeső vonalak', value: 'm_a = s_a = f_a = w_α' }
        ]
      },
      {
        id: 'q2-10',
        title: 'Súlyvonalak területi tulajdonsága',
        prompt: 'Egy súlyvonal hány egyenlő területű részre osztja a háromszöget?',
        questionTypeBadge: 'Területfelezés',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="65,10 20,55 125,55" fill="none" className="stroke-teal-600 stroke-[2]" />
            <line x1="65" y1="10" x2="72" y2="55" className="stroke-rose-600 stroke-[2]" />
            <text x="42" y="38" className="text-[10px] font-bold fill-teal-700 dark:fill-teal-300">T/2</text>
            <text x="88" y="38" className="text-[10px] font-bold fill-teal-700 dark:fill-teal-300">T/2</text>
          </svg>
        ),
        options: [
          '2 egyenlő területű részre',
          '3 egyenlő területű részre',
          '4 egyenlő területű részre',
          'Nem felezi a területet'
        ],
        correctAnswer: '2 egyenlő területű részre',
        explanation: 'Mivel az alap felét veszi alapul és a magasságuk közös, bármely súlyvonal pontosan 2 egyenlő területű háromszögre osztja az eredetit (T/2).',
        breakdown: [
          { label: 'Alap és magasság', value: 'Felezve az alap, azonos a magasság' },
          { label: 'Területarány', value: 'T_1 = T_2 = T / 2' }
        ]
      }
    ]
  },

  // 3. SZINT: Számítások, Arányok (2:1) és Mester Feladatok (10 kérdés)
  {
    level: 3,
    title: "3. Szint: Számítások, Arányok (2:1) és Mester Feladatok",
    subtitle: 'Súlypont harmadolása (2:1), Euler-egyenes számítások, Thalész-tételes összefüggések és összetett feladatok',
    questions: [
      {
        id: 'q3-1',
        title: 'Súlypont 2:1 osztása (1)',
        prompt: 'A háromszög egyik súlyvonalának hossza s_a = 18 cm. Milyen hosszú a csúcstól a súlypontig tartó szakasz (AS)?',
        questionTypeBadge: 'Súlypont 2:1 aránya',
        figure: (
          <svg viewBox="0 0 140 60" className="w-32 h-14 mx-auto">
            <line x1="20" y1="30" x2="120" y2="30" className="stroke-indigo-600 stroke-[2.5]" />
            <circle cx="20" cy="30" r="3" className="fill-indigo-700" />
            <circle cx="86" cy="30" r="3.5" className="fill-rose-600" />
            <circle cx="120" cy="30" r="3" className="fill-indigo-700" />
            <text x="17" y="20" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">A</text>
            <text x="83" y="20" className="text-[9px] font-bold fill-rose-600">S</text>
            <text x="115" y="20" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">F_a</text>
            <text x="46" y="44" className="text-[9px] font-bold fill-rose-600">AS = 2x</text>
            <text x="96" y="44" className="text-[9px] font-bold fill-indigo-600">1x</text>
          </svg>
        ),
        options: ['12 cm', '6 cm', '9 cm', '14 cm'],
        correctAnswer: '12 cm',
        explanation: 'A súlypont a csúcstól 2:1 arányban osztja a súlyvonalat: 18 / 3 = 6 cm (1 rész). A csúcs felőli hosszabb szakasz: 2 · 6 = 12 cm.',
        breakdown: [
          { label: '1 rész (SF_a)', value: '18 / 3 = 6 cm' },
          { label: '2 rész (AS)', value: '2 · 6 = 12 cm' }
        ]
      },
      {
        id: 'q3-2',
        title: 'Súlypont 2:1 osztása (2)',
        prompt: 'Ha a súlypont és az oldal felezőpontja közötti távolság SF_b = 5 cm, mekkora a teljes s_b súlyvonal hossza?',
        questionTypeBadge: 'Súlypont aránya',
        figure: (
          <svg viewBox="0 0 140 60" className="w-32 h-14 mx-auto">
            <line x1="20" y1="30" x2="120" y2="30" className="stroke-indigo-600 stroke-[2.5]" />
            <circle cx="20" cy="30" r="3" className="fill-indigo-700" />
            <circle cx="86" cy="30" r="3.5" className="fill-rose-600" />
            <circle cx="120" cy="30" r="3" className="fill-indigo-700" />
            <text x="17" y="20" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">B</text>
            <text x="83" y="20" className="text-[9px] font-bold fill-rose-600">S</text>
            <text x="115" y="20" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">F_b</text>
            <text x="46" y="44" className="text-[9px] font-bold fill-indigo-600">10 cm</text>
            <text x="96" y="44" className="text-[9px] font-bold fill-rose-600">5 cm</text>
          </svg>
        ),
        options: ['15 cm', '10 cm', '7.5 cm', '20 cm'],
        correctAnswer: '15 cm',
        explanation: 'SF_b az 1/3-ad rész (5 cm). A csúcs felőli rész BS = 2 · 5 = 10 cm, így a teljes súlyvonal s_b = 5 + 10 = 15 cm (vagy 3 · 5 = 15 cm).',
        breakdown: [
          { label: 'Teljes hossz', value: '3 · 5 = 15 cm' }
        ]
      },
      {
        id: 'q3-3',
        title: 'Súlypont csúcstávolságából felezőpont',
        prompt: 'Ha a csúcs és a súlypont távolsága CS = 16 cm, mekkora az SF_c szakasz?',
        questionTypeBadge: 'Súlypont aránya',
        figure: (
          <svg viewBox="0 0 140 60" className="w-32 h-14 mx-auto">
            <line x1="20" y1="30" x2="120" y2="30" className="stroke-teal-600 stroke-[2.5]" />
            <circle cx="20" cy="30" r="3" className="fill-teal-700" />
            <circle cx="86" cy="30" r="3.5" className="fill-rose-600" />
            <circle cx="120" cy="30" r="3" className="fill-teal-700" />
            <text x="17" y="20" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">C</text>
            <text x="83" y="20" className="text-[9px] font-bold fill-rose-600">S</text>
            <text x="115" y="20" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">F_c</text>
            <text x="42" y="44" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">16 cm (2x)</text>
            <text x="96" y="44" className="text-[9px] font-bold fill-rose-600">? (1x)</text>
          </svg>
        ),
        options: ['8 cm', '16 cm', '4 cm', '24 cm'],
        correctAnswer: '8 cm',
        explanation: 'A CS szakasz 2 egységnek felel meg (16 cm), így 1 egység = 16 / 2 = 8 cm. Az SF_c szakasz 8 cm hosszú.',
        breakdown: [
          { label: '2 egység', value: '16 cm' },
          { label: '1 egység (SF_c)', value: '16 / 2 = 8 cm' }
        ]
      },
      {
        id: 'q3-4',
        title: 'Középvonal-háromszög kerülete',
        prompt: 'Egy háromszög oldalai a = 10 cm, b = 12 cm, c = 14 cm (Kerülete K = 36 cm). Mekkora a három középvonal által alkotott háromszög kerülete?',
        questionTypeBadge: 'Középvonal kerület',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="70,8 20,58 120,58" fill="none" className="stroke-indigo-600 stroke-[2]" />
            <polygon points="45,33 95,33 70,58" fill="none" className="stroke-rose-600 stroke-[2]" />
            <text x="60" y="48" className="text-[9px] font-bold fill-rose-600">K/2</text>
          </svg>
        ),
        options: ['18 cm', '36 cm', '9 cm', '12 cm'],
        correctAnswer: '18 cm',
        explanation: 'A középvonalak hossza 5 cm, 6 cm és 7 cm. A kerület K_közép = 5 + 6 + 7 = 18 cm, ami pontosan a fele az eredeti kerületnek (36 / 2 = 18).',
        breakdown: [
          { label: 'Középvonalak', value: '5 cm, 6 cm, 7 cm' },
          { label: 'K_közép', value: '36 / 2 = 18 cm' }
        ]
      },
      {
        id: 'q3-5',
        title: 'Euler-egyenes szakaszarány',
        prompt: 'Az Euler-egyenesen az M (magasságpont), S (súlypont) és O (köré írt kör kp.) fekszik. Ha az SO távolság 4 cm, mekkora az MS szakasz hossza?',
        questionTypeBadge: 'Euler-egyenes arány',
        figure: (
          <svg viewBox="0 0 150 50" className="w-36 h-12 mx-auto">
            <line x1="20" y1="25" x2="135" y2="25" className="stroke-sky-600 stroke-[2]" />
            <circle cx="35" cy="25" r="3.5" className="fill-rose-600" />
            <circle cx="95" cy="25" r="3.5" className="fill-purple-600" />
            <circle cx="125" cy="25" r="3.5" className="fill-indigo-600" />
            <text x="32" y="38" className="text-[9px] font-bold fill-rose-700">M</text>
            <text x="92" y="38" className="text-[9px] font-bold fill-purple-700">S</text>
            <text x="122" y="38" className="text-[9px] font-bold fill-indigo-700">O</text>
            <text x="56" y="16" className="text-[8px] font-bold fill-rose-600">MS = ?</text>
            <text x="104" y="16" className="text-[8px] font-bold fill-indigo-600">4 cm</text>
          </svg>
        ),
        options: ['8 cm', '4 cm', '2 cm', '12 cm'],
        correctAnswer: '8 cm',
        explanation: 'Az Euler-egyenesen az MS : SO arány mindig 2 : 1. Ha SO = 4 cm, akkor MS = 2 · 4 = 8 cm.',
        breakdown: [
          { label: 'Arány', value: 'MS : SO = 2 : 1' },
          { label: 'MS', value: '2 · 4 = 8 cm' }
        ]
      },
      {
        id: 'q3-6',
        title: 'Euler-egyenes teljes távolság',
        prompt: 'Ha az Euler-egyenesen a magasságpont és a köré írt kör középpontjának távolsága MO = 18 cm, milyen messze van a súlypont (S) az O ponttól?',
        questionTypeBadge: 'Euler-egyenes arány',
        figure: (
          <svg viewBox="0 0 150 50" className="w-36 h-12 mx-auto">
            <line x1="20" y1="25" x2="135" y2="25" className="stroke-sky-600 stroke-[2]" />
            <circle cx="35" cy="25" r="3.5" className="fill-rose-600" />
            <circle cx="95" cy="25" r="3.5" className="fill-purple-600" />
            <circle cx="125" cy="25" r="3.5" className="fill-indigo-600" />
            <text x="32" y="38" className="text-[9px] font-bold fill-rose-700">M</text>
            <text x="92" y="38" className="text-[9px] font-bold fill-purple-700">S</text>
            <text x="122" y="38" className="text-[9px] font-bold fill-indigo-700">O</text>
            <text x="68" y="16" className="text-[9px] font-bold fill-slate-600">MO = 18 cm (3x)</text>
          </svg>
        ),
        options: ['6 cm', '12 cm', '9 cm', '3 cm'],
        correctAnswer: '6 cm',
        explanation: 'MO = MS + SO = 2x + 1x = 3x = 18 cm. Ebből x = 18 / 3 = 6 cm. Tehát SO = 6 cm (és MS = 12 cm).',
        breakdown: [
          { label: '3 rész (MO)', value: '18 cm' },
          { label: '1 rész (SO)', value: '18 / 3 = 6 cm' }
        ]
      },
      {
        id: 'q3-7',
        title: 'Derékszögű háromszög átfogóhoz tartozó súlyvonala',
        prompt: 'Egy derékszögű háromszög átfogója c = 26 cm. Milyen hosszú az átfogóhoz tartozó s_c súlyvonal?',
        questionTypeBadge: 'Thalész-tétel & Súlyvonal',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="35,15 35,55 115,55" fill="none" className="stroke-blue-600 stroke-[2]" />
            <line x1="35" y1="15" x2="75" y2="55" className="stroke-rose-600 stroke-[2]" />
            <circle cx="75" cy="55" r="3" className="fill-rose-600" />
            <text x="60" y="32" className="text-[9px] font-bold fill-rose-600">s_c = R</text>
            <text x="65" y="65" className="text-[8px] font-bold fill-blue-700 dark:fill-blue-300">c = 26 cm</text>
          </svg>
        ),
        options: ['13 cm', '26 cm', '6.5 cm', '18 cm'],
        correctAnswer: '13 cm',
        explanation: 'Mivel az átfogó felezőpontja a köré írt kör középpontja (O), az F_c pontból a csúcsokba húzott szakaszok a kör sugarai: s_c = R = c / 2 = 26 / 2 = 13 cm!',
        breakdown: [
          { label: 'Összefüggés', value: 's_c = R = c / 2' },
          { label: 'Számolás', value: '26 / 2 = 13 cm' }
        ]
      },
      {
        id: 'q3-8',
        title: '6 egyenlő területű rész',
        prompt: 'A háromszög 3 súlyvonala a háromszöget hány darab egyenlő területű kis háromszögre osztja fel?',
        questionTypeBadge: 'Területfelosztás',
        figure: (
          <svg viewBox="0 0 140 70" className="w-32 h-16 mx-auto">
            <polygon points="70,8 20,62 120,62" fill="none" className="stroke-purple-600 stroke-[2]" />
            <line x1="70" y1="8" x2="70" y2="62" className="stroke-purple-400 stroke-[1]" />
            <line x1="20" y1="62" x2="95" y2="35" className="stroke-purple-400 stroke-[1]" />
            <line x1="120" y1="62" x2="45" y2="35" className="stroke-purple-400 stroke-[1]" />
            <circle cx="70" cy="44" r="3" className="fill-amber-600" />
            <text x="58" y="48" className="text-[9px] font-bold fill-rose-600">6 db T/6</text>
          </svg>
        ),
        options: [
          '6 db egyenlő területű háromszögre',
          '3 db egyenlő területű háromszögre',
          '4 db egyenlő területű háromszögre',
          '8 db egyenlő területű háromszögre'
        ],
        correctAnswer: '6 db egyenlő területű háromszögre',
        explanation: 'A 3 súlyvonal metszéspontja (S) a háromszöget 6 darab azonos területű (T / 6) kis háromszögre bontja.',
        breakdown: [
          { label: 'Súlyvonalak száma', value: '3 db' },
          { label: 'Részek száma', value: '6 db egyenlő területű (T/6)' }
        ]
      },
      {
        id: 'q3-9',
        title: 'Tompaszögű háromszög köré írt köre',
        prompt: 'Egy háromszög szögei 110°, 40° és 30°. Mely állítás IGAZ a nevezetes pontjaira?',
        questionTypeBadge: 'Tompaszögű háromszög pontjai',
        figure: (
          <svg viewBox="0 0 150 65" className="w-36 h-15 mx-auto">
            <polygon points="75,25 20,55 135,55" fill="none" className="stroke-amber-600 stroke-[2]" />
            <circle cx="75" cy="6" r="3" className="fill-rose-600" />
            <circle cx="75" cy="72" r="3" className="fill-sky-600" />
            <text x="82" y="10" className="text-[8px] font-bold fill-rose-600">M kívül</text>
            <text x="82" y="62" className="text-[8px] font-bold fill-sky-600">O kívül</text>
            <text x="68" y="38" className="text-[8px] font-bold fill-amber-700">110°</text>
          </svg>
        ),
        options: [
          'Az O (köré írt kör kp.) és az M (magasságpont) a háromszögön kívül van',
          'Mind a négy nevezetes pont a háromszög belsejében van',
          'Csak a súlypont van kívül',
          'Az O pont az egyik oldal felezőpontja'
        ],
        correctAnswer: 'Az O (köré írt kör kp.) és az M (magasságpont) a háromszögön kívül van',
        explanation: 'Mivel a háromszög tompaszögű (110° > 90°), az O pont és az M pont is a háromszög területén kívül helyezkedik el.',
        breakdown: [
          { label: 'Háromszög típusa', value: 'Tompaszögű (110°)' },
          { label: 'Kívül lévő pontok', value: 'O és M a háromszögön kívül van' }
        ]
      },
      {
        id: 'q3-10',
        title: 'Nevezetes vonalak kombinált tulajdonsága',
        prompt: 'Egy háromszögben a = 12 cm, és a hozzá tartozó magasság m_a = 8 cm. Mekkora a középvonalak által bezárt belső kis háromszög területe?',
        questionTypeBadge: 'Középvonal & Magasság',
        figure: (
          <svg viewBox="0 0 140 65" className="w-32 h-15 mx-auto">
            <polygon points="65,10 20,55 125,55" fill="none" className="stroke-teal-600 stroke-[2]" />
            <line x1="65" y1="10" x2="65" y2="55" className="stroke-slate-400 stroke-[1]" strokeDasharray="2 2" />
            <polygon points="42,32 95,32 72,55" fill="none" className="stroke-rose-600 stroke-[1.5]" />
            <text x="68" y="25" className="text-[8px] font-bold fill-slate-500">m=8</text>
            <text x="65" y="46" className="text-[8px] font-bold fill-rose-600">T/4=?</text>
            <text x="65" y="63" className="text-[8px] font-bold fill-teal-700 dark:fill-teal-300">a=12</text>
          </svg>
        ),
        options: ['12 cm²', '48 cm²', '24 cm²', '6 cm²'],
        correctAnswer: '12 cm²',
        explanation: 'Az eredeti háromszög területe T = (a · m_a) / 2 = (12 · 8) / 2 = 48 cm². A középvonalak által bezárt háromszög területe ennek a negyede: 48 / 4 = 12 cm².',
        breakdown: [
          { label: 'Eredeti terület', value: '(12 · 8) / 2 = 48 cm²' },
          { label: 'Kis háromszög', value: '48 / 4 = 12 cm²' }
        ]
      }
    ]
  }
];

export const TriangleLinesQuiz: React.FC<TriangleLinesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g7-geom-triangle-lines"
      chapterId="g7-geom-trans"
      grade={7}
      badgeText="7. Osztály • Matematika III. Témakör"
      title="2. Háromszögek nevezetes vonalai Kvíz"
      subtitle="Gyakorold az oldalfelezőket, szögfelezőket, magasságokat, súlyvonalakat (2:1 arány), középvonalakat és az Euler-egyenest 30 válogatott feladattal és ábrákkal!"
      cheatSheetTitle="Nevezetes Vonalak Puska & Képtár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="indigo"
      hintText="💡 Figyelj a pontok elhelyezkedésére tompaszögű háromszögben (O és M kívül!), valamint a súlypont 2:1-es felosztására!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a vonalakat, pontokat, ábrákat és arányokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <TriangleLinesMatcher
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
          subtitle: 'Kategorizáld a nevezetes pontokat és tulajdonságokat!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-purple-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <TriangleLinesSorter
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

export default TriangleLinesQuiz;
