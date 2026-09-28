import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import {
  Target,
  Maximize2,
  Minimize2,
  Compass,
  Shapes,
  Sparkles,
  Sun,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { CentralSimilarityMatcher } from './CentralSimilarityMatcher';
import { CentralSimilaritySorter } from './CentralSimilaritySorter';

interface CentralSimilarityQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-c1',
    title: 'Középpontos Hasonlóság Definíciója',
    icon: <Target className="w-4 h-4 text-indigo-600" />,
    formula: "OP' = |λ| · OP   (λ ≠ 0)",
    note: "P' illeszkedik az OP egyenesre. Ha λ > 0: azonos félegyenes (egy oldalon). Ha λ < 0: ellentétes félegyenes (O a pontok között van). O fixpont.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="10" y1="22" x2="150" y2="22" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1" />
        <circle cx="50" cy="22" r="3.5" fill="#4f46e5" />
        <text x="50" y="14" textAnchor="middle" className="text-[8px] font-black fill-indigo-700">O</text>
        <circle cx="85" cy="22" r="3" fill="#0284c7" />
        <text x="85" y="14" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">P</text>
        <circle cx="135" cy="22" r="3" fill="#10b981" />
        <text x="135" y="14" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">P'</text>
      </svg>
    )
  },
  {
    id: 'cs-c2',
    title: 'Speciális Arányok: λ Hatása',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: "λ = -1 ⟹ Középpontos tükrözés | λ = 1 ⟹ Identitás",
    note: "|λ| > 1 esetén nagyítás, 0 < |λ| < 1 esetén kicsinyítés. λ = -1 esetén egybevágóság: távolságtartó és 180°-os átfordulás.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="30" cy="22" r="3" fill="#f59e0b" />
        <text x="30" y="36" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">P'</text>
        <circle cx="80" cy="22" r="3.5" fill="#4f46e5" />
        <text x="80" y="14" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">O (felező)</text>
        <circle cx="130" cy="22" r="3" fill="#0284c7" />
        <text x="130" y="36" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">P</text>
      </svg>
    )
  },
  {
    id: 'cs-c3',
    title: 'Párhuzamos Egyenesek & Területarány',
    icon: <Compass className="w-4 h-4 text-teal-600" />,
    formula: "e' ∥ e  (ha O ∉ e)   |   T' = λ² · T",
    note: "Ha az egyenes nem megy át az O-n, a képe vele párhuzamos. A centrumon átmenő egyenes invariáns (e' = e). A területarány λ² (mindig pozitív!).",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="12" x2="145" y2="12" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="15" y1="32" x2="145" y2="32" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="80" cy="22" r="2.5" fill="#4f46e5" />
        <text x="130" y="10" className="text-[7px] font-bold fill-blue-600">e</text>
        <text x="130" y="42" className="text-[7px] font-bold fill-purple-600">e' ∥ e</text>
      </svg>
    )
  },
  {
    id: 'cs-c4',
    title: 'Párhuzamos Szelők Tétele',
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    formula: "OA' / OA = OB' / OB = A'B' / AB = |λ|",
    note: "A szögszárakat metsző párhuzamos egyenesek szelőszakaszainak aránya megegyezik a hasonlóság arányával. Alkalmazás: magasságmérés, távolságmérés.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="22" x2="145" y2="6" stroke="#64748b" strokeWidth="1" />
        <line x1="15" y1="22" x2="145" y2="38" stroke="#64748b" strokeWidth="1" />
        <line x1="60" y1="17" x2="60" y2="28" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="120" y1="10" x2="120" y2="34" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="15" cy="22" r="2.5" fill="#4f46e5" />
      </svg>
    )
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a λ Arányszám',
    subtitle: 'A középpontos hasonlóság fogalma, centrum (O), előjelek és speciális arányok',
    range: '1-10. kérdés',
    focus: 'Centrum, λ előjele, nagyítás, kicsinyítés, identitás, középpontos tükrözés',
    questions: [
      {
        id: 'cs-q1',
        level: 1,
        question: 'Mi a középpontos hasonlóság definíciója szerint a P pont P\' képpontjának helyzete az O centrumhoz képest?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <circle cx="50" cy="35" r="4.5" fill="#4f46e5" />
            <text x="50" y="22" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>
            <circle cx="110" cy="35" r="3.5" fill="#0284c7" />
            <text x="110" y="22" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">P</text>
            <circle cx="200" cy="35" r="4" fill="#10b981" />
            <text x="200" y="22" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">P'</text>
            <text x="155" y="52" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600 dark:fill-emerald-400">OP' = |λ| · OP</text>
          </svg>
        ),
        options: [
          'P\' az OP egyenesen van, és távolsága a centrumtól OP\' = |λ| · OP.',
          'P\' mindig az OP szakaszra merőleges egyenesre esik.',
          'P\' egy olyan körön mozog, amelynek sugara OP.',
          'P\' távolsága az O-tól független a λ értékétől.'
        ],
        correctAnswer: 0,
        hint: 'A középpontos hasonlóság a centrumból induló sugarak mentén mozgatja a pontokat.',
        explanation: 'A középpontos hasonlóság definíciója szerint a P\' képpont az OP egyenesen helyezkedik el, és az O centrumtól mért távolsága az eredeti távolság |λ|-szorosa: OP\' = |λ| · OP.',
        breakdown: [
          { label: 'Egyenes', value: 'P\' illeszkedik az OP egyenesre' },
          { label: 'Távolság', value: 'OP\' = |λ| · OP' }
        ]
      },
      {
        id: 'cs-q2',
        level: 1,
        question: 'Mi történik a sík pontjaival, ha a középpontos hasonlóság aránya pontosan λ = -1?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="35" x2="230" y2="35" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="50" cy="35" r="4" fill="#f59e0b" />
            <text x="50" y="22" textAnchor="middle" className="text-[10px] font-bold fill-amber-700 dark:fill-amber-300">P'</text>
            <circle cx="130" cy="35" r="4.5" fill="#4f46e5" />
            <text x="130" y="22" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">O (felező)</text>
            <circle cx="210" cy="35" r="4" fill="#0284c7" />
            <text x="210" y="22" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">P</text>
            <text x="90" y="52" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">d</text>
            <text x="170" y="52" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">d</text>
          </svg>
        ),
        options: [
          'A transzformáció pontosan az O pontra vonatkozó középpontos tükrözés.',
          'Minden pont távolsága a felére csökken.',
          'Minden pont az O azonos oldalán marad változatlan távolságra.',
          'A sík minden pontja önmagába megy át (identitás).'
        ],
        correctAnswer: 0,
        hint: 'Ha λ = -1, akkor OP\' = |-1| · OP = OP, és P\' az ellenkező irányba esik.',
        explanation: 'Ha λ = -1, akkor a képpont távolsága pontosan megegyezik az eredetivel (OP\' = OP), és a negatív előjel miatt P\' az ellentétes félegyenesre esik, tehát az O az eredeti pont és a képpont felezőpontja. Ez pontosan a középpontos tükrözés definíciója.',
        breakdown: [
          { label: 'Távolság', value: 'OP\' = |-1| · OP = OP' },
          { label: 'Elhelyezkedés', value: 'O a PP\' szakasz felezőpontja' },
          { label: 'Eredmény', value: 'Középpontos tükrözés O-ra' }
        ]
      },
      {
        id: 'cs-q3',
        level: 1,
        question: 'Mi a geometriai hatása annak, ha a középpontos hasonlóság aránya λ = 1?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="100,52 160,52 130,18" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <text x="130" y="40" textAnchor="middle" className="text-[10px] font-black fill-emerald-800 dark:fill-emerald-200">P' = P</text>
            <text x="130" y="65" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600 dark:fill-emerald-400">Identitás (λ = 1)</text>
          </svg>
        ),
        options: [
          'Identitás: a sík minden pontja helyben marad, képe önmaga (P\' = P).',
          'Minden pont 1 cm-rel távolodik a centrumtól.',
          'Az alakzat 90°-kal elfordul a síkban.',
          'A pontok a centrumra tükröződnek.'
        ],
        correctAnswer: 0,
        hint: 'Ha OP\' = 1 · OP és az irány azonos, a pont elmozdul-e?',
        explanation: 'Ha λ = 1, akkor minden P pontra OP\' = 1 · OP = OP és azonos félegyenesre esik, tehát minden pont képe önmaga (P\' = P). Ezt identitásnak (helybenhagyásnak) nevezzük.',
        breakdown: [
          { label: 'Arány', value: 'λ = 1' },
          { label: 'Hatás', value: 'Identitás (minden pont fixpont)' }
        ]
      },
      {
        id: 'cs-q4',
        level: 1,
        question: 'A λ mely értéktartománya esetén beszélünk geometriai kicsinyítésről?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,55 90,55 60,15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="60" y="42" textAnchor="middle" className="text-[9px] font-bold fill-blue-700 dark:fill-blue-300">Eredeti</text>
            <path d="M 105 35 L 140 35 M 134 30 L 142 35 L 134 40" stroke="#6366f1" strokeWidth="2" fill="none" />
            <polygon points="170,50 206,50 188,26" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="188" y="42" textAnchor="middle" className="text-[8px] font-extrabold fill-purple-700 dark:fill-purple-300">Kép</text>
            <text x="188" y="65" textAnchor="middle" className="text-[9px] font-bold fill-purple-600 dark:fill-purple-400">0 &lt; |λ| &lt; 1</text>
          </svg>
        ),
        options: [
          '0 < |λ| < 1 (azaz -1 < λ < 1 és λ ≠ 0)',
          'Csak ha λ negatív szám',
          'Ha |λ| > 1',
          'Ha λ = 0'
        ],
        correctAnswer: 0,
        hint: 'Kicsinyítéskor a távolságok és a szakaszok rövidebbek lesznek, tehát az arány nagysága 1-nél kisebb.',
        explanation: 'Kicsinyítésről akkor beszélünk, ha a hasonlósági arány abszolútértéke 0 és 1 közé esik: 0 < |λ| < 1 (például λ = 0,5 vagy λ = -0,75). Ilyenkor a képalakzat minden szakasza rövidebb az eredetinél.',
        breakdown: [
          { label: 'Feltétel', value: '0 < |λ| < 1' },
          { label: 'Eredmény', value: 'Kicsinyítés (szakaszok és távolságok csökkennek)' }
        ]
      },
      {
        id: 'cs-q5',
        level: 1,
        question: 'Melyik állítás igaz a középpontos hasonlóságra, ha az arányszám |λ| > 1?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,50 65,50 47.5,25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="47.5" y="42" textAnchor="middle" className="text-[8px] font-bold fill-blue-700 dark:fill-blue-300">Eredeti</text>
            <polygon points="120,58 220,58 170,8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="170" y="40" textAnchor="middle" className="text-[10px] font-black fill-purple-800 dark:fill-purple-200">Nagyított kép</text>
            <text x="170" y="66" textAnchor="middle" className="text-[9px] font-bold fill-purple-600 dark:fill-purple-400">|λ| &gt; 1</text>
          </svg>
        ),
        options: [
          'A transzformáció nagyítás: minden szakasz és a kerület is hosszabb lesz.',
          'A képalakzat területe kisebb lesz az eredetinél.',
          'Minden szakasz hossza megegyezik az eredetivel.',
          'A transzformáció csak négyszögekre alkalmazható.'
        ],
        correctAnswer: 0,
        hint: 'Ha |λ| > 1, az új távolság OP\' = |λ| · OP nagyobb lesz az eredeti OP távolságnál.',
        explanation: 'Ha |λ| > 1 (pl. λ = 2 vagy λ = -2,5), akkor minden pont távolabb kerül a centrumtól, a képszakaszok hosszabbak lesznek az eredetieknél, így geometriai nagyítás valósul meg.',
        breakdown: [
          { label: 'Arány nagysága', value: '|λ| > 1' },
          { label: 'Jelleg', value: 'Nagyítás (OP\' > OP, |A\'B\'| > |AB|)' }
        ]
      },
      {
        id: 'cs-q6',
        level: 1,
        question: 'Hol helyezkedik el a P\' képpont az O centrumhoz képest, ha a hasonlóság aránya pozitív (λ > 0)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#10b981" strokeWidth="2" />
            <circle cx="40" cy="35" r="4.5" fill="#4f46e5" />
            <text x="40" y="22" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>
            <circle cx="110" cy="35" r="3.5" fill="#0284c7" />
            <text x="110" y="22" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">P</text>
            <circle cx="190" cy="35" r="4" fill="#10b981" />
            <text x="190" y="22" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">P' (λ &gt; 0)</text>
            <text x="150" y="55" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 dark:fill-emerald-400">Azonos félegyenesen állnak</text>
          </svg>
        ),
        options: [
          'Az O-ból kiinduló OP félegyenesen (P és P\' a centrum azonos oldalán fekszik).',
          'Az OP ellentétes félegyenesén, átfordulva az O ponton.',
          'Az OP-re merőleges egyenesen.',
          'Mindig pontosan az OP szakasz felezőpontjában.'
        ],
        correctAnswer: 0,
        hint: 'Pozitív számmal szorozva a kezdőpontból kiinduló irány nem fordul meg.',
        explanation: 'Ha λ > 0, akkor a P\' pont az O pontból induló OP félegyenesre esik, tehát a kiinduló P pont és a képpont a centrum azonos oldalán helyezkedik el.',
        breakdown: [
          { label: 'λ > 0', value: 'Azonos irányú félegyenes' },
          { label: 'Elhelyezkedés', value: 'P és P\' a centrum ugyanazon oldalán van' }
        ]
      },
      {
        id: 'cs-q7',
        level: 1,
        question: 'Hol helyezkedik el a P\' képpont az O centrumhoz képest, ha a hasonlóság aránya negatív (λ < 0)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#ef4444" strokeWidth="2" />
            <circle cx="50" cy="35" r="4" fill="#ef4444" />
            <text x="50" y="22" textAnchor="middle" className="text-[10px] font-bold fill-rose-700 dark:fill-rose-300">P' (λ &lt; 0)</text>
            <circle cx="140" cy="35" r="4.5" fill="#4f46e5" />
            <text x="140" y="22" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">O (középen)</text>
            <circle cx="210" cy="35" r="3.5" fill="#0284c7" />
            <text x="210" y="22" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">P</text>
            <text x="95" y="55" textAnchor="middle" className="text-[9px] font-bold fill-rose-700 dark:fill-rose-400">Ellentétes félegyenes (180° átfordulás)</text>
          </svg>
        ),
        options: [
          'Az OP ellentétes irányú félegyenesén (az O pont a P és P\' között fekszik).',
          'Mindig az OP szakasz belsejében.',
          'Az O centrum azonos oldalán, csak feleakkora távolságra.',
          'Egy negatív koordinátájú körön.'
        ],
        correctAnswer: 0,
        hint: 'A negatív előjel geometriailag az ellentétes irányba mutatást, 180°-os átfordulást jelenti.',
        explanation: 'Ha λ < 0, a képpont az OP egyenesnek az O-ból kiinduló, de a P-vel ellentétes irányú félegyenesére esik. Ez azt jelenti, hogy az O centrum a P és P\' pontok közé esik (180°-os átfordulás).',
        breakdown: [
          { label: 'λ < 0', value: 'Ellentétes félegyenes' },
          { label: 'Elrendezés', value: 'P\' — O — P (az O a két pont között van)' }
        ]
      },
      {
        id: 'cs-q8',
        level: 1,
        question: 'Hány fixpontja (önmagába leképeződő pontja) van egy λ ≠ 1 arányú középpontos hasonlóságnak a síkban?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <circle cx="130" cy="35" r="7" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
            <text x="130" y="20" textAnchor="middle" className="text-[11px] font-black fill-indigo-700 dark:fill-indigo-300">O' = O</text>
            <text x="130" y="58" textAnchor="middle" className="text-[9px] font-bold fill-slate-600 dark:fill-slate-300">Egyetlen fixpont a síkban (ha λ ≠ 1)</text>
          </svg>
        ),
        options: [
          'Pontosan 1 fixpontja van: a hasonlóság O középpontja (centruma).',
          'Nincs egyetlen fixpontja sem.',
          'Végtelen sok fixpontja van egy egyenes mentén.',
          'Pontosan 2 fixpontja van.'
        ],
        correctAnswer: 0,
        hint: 'Melyik pont nem mozdul el a centrumból induló sugarak mentén történő arányos szorzáskor?',
        explanation: 'Az O centrum távolsága önmagától 0, így OO\' = |λ| · 0 = 0, azaz O\' = O mindig fixpont. Ha λ ≠ 1, bármely más P pont távolsága változik vagy átfordul, így nem maradhat helyben. Ezért pontosan 1 fixpont létezik: az O.',
        breakdown: [
          { label: 'Centrum', value: 'O\' = O (mindig fixpont)' },
          { label: 'Többi pont', value: 'OP\' ≠ OP vagy ellentétes oldalra kerül' },
          { label: 'Fixpontok száma', value: 'Pontosan 1 (ha λ ≠ 1)' }
        ]
      },
      {
        id: 'cs-q9',
        level: 1,
        question: 'Egy pont távolsága a hasonlóság középpontjától OP = 6 cm. Ha a hasonlósági arány λ = 2, mekkora az OP\' távolság?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="40" cy="35" r="4" fill="#4f46e5" />
            <text x="40" y="22" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">O</text>
            <circle cx="100" cy="35" r="3.5" fill="#0284c7" />
            <text x="100" y="22" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">P</text>
            <circle cx="220" cy="35" r="4" fill="#2563eb" />
            <text x="220" y="22" textAnchor="middle" className="text-[9px] font-bold fill-blue-700">P'</text>
            <text x="70" y="52" textAnchor="middle" className="text-[9px] font-semibold fill-slate-500">6 cm</text>
            <text x="160" y="52" textAnchor="middle" className="text-[9px] font-bold fill-blue-600">OP' = ?</text>
          </svg>
        ),
        options: [
          '12 cm (OP\' = |2| · 6 = 12 cm)',
          '8 cm',
          '3 cm',
          '36 cm'
        ],
        correctAnswer: 0,
        hint: 'Alkalmazd az alapkifejezést: OP\' = |λ| · OP!',
        explanation: 'Az alapképlet szerint OP\' = |λ| · OP = 2 · 6 cm = 12 cm. Mivel λ = 2 > 0, P\' a P-vel megegyező félegyenesen van.',
        breakdown: [
          { label: 'Képlet', value: 'OP\' = |λ| · OP' },
          { label: 'Behelyettesítés', value: '2 · 6 cm = 12 cm' }
        ]
      },
      {
        id: 'cs-q10',
        level: 1,
        question: 'Egy pont távolsága a centrumtól OP = 8 cm, a hasonlósági arány pedig λ = -0,5. Mekkora a P\' pont távolsága az O centrumtól?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="60" cy="35" r="4" fill="#f59e0b" />
            <text x="60" y="22" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">P'</text>
            <circle cx="120" cy="35" r="4.5" fill="#4f46e5" />
            <text x="120" y="22" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">O</text>
            <circle cx="220" cy="35" r="3.5" fill="#0284c7" />
            <text x="220" y="22" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">P</text>
            <text x="170" y="52" textAnchor="middle" className="text-[9px] font-semibold fill-slate-500">OP = 8 cm</text>
            <text x="90" y="52" textAnchor="middle" className="text-[9px] font-bold fill-amber-600">OP' = ?</text>
          </svg>
        ),
        options: [
          '4 cm (OP\' = |-0,5| · 8 = 4 cm az O ellenkező oldalán)',
          '-4 cm',
          '16 cm',
          '-16 cm'
        ],
        correctAnswer: 0,
        hint: 'A távolság geometriai mennyiség, nem lehet negatív! Használd a |λ| abszolútértéket!',
        explanation: 'A távolság soha nem negatív szám: OP\' = |-0,5| · 8 cm = 0,5 · 8 cm = 4 cm. A negatív előjel azt határozza meg, hogy a P\' pont az O ellentétes oldalára esik.',
        breakdown: [
          { label: 'Képlet', value: 'OP\' = |λ| · OP' },
          { label: 'Számítás', value: '|-0,5| · 8 cm = 0,5 · 8 cm = 4 cm' },
          { label: 'Irány', value: 'O ellentétes oldala' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szakaszok, Egyenesek és Tulajdonságok',
    subtitle: 'Párhuzamos egyenesek, szögtartás, kerület- és területarányok, számítási feladatok',
    range: '11-20. kérdés',
    focus: 'e\' ∥ e, invariáns egyenesek, szögtartás, |A\'B\'| = |λ|·|AB|, K\' = |λ|·K, T\' = λ²·T',
    questions: [
      {
        id: 'cs-q11',
        level: 2,
        question: 'Milyen egyenest kapunk eredményül, ha olyan e egyenest transzformálunk középpontos hasonlósággal, amely NEM halad át az O centrumon?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="20" x2="240" y2="20" stroke="#2563eb" strokeWidth="2" />
            <text x="235" y="16" className="text-[9px] font-bold fill-blue-700 dark:fill-blue-300">e</text>
            <circle cx="130" cy="35" r="4" fill="#4f46e5" />
            <text x="130" y="48" textAnchor="middle" className="text-[9px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>
            <line x1="20" y1="52" x2="240" y2="52" stroke="#7c3aed" strokeWidth="2" />
            <text x="235" y="64" className="text-[9px] font-bold fill-purple-700 dark:fill-purple-300">e'</text>
            <text x="60" y="40" className="text-[9px] font-bold fill-indigo-600 dark:fill-indigo-400">e' ∥ e</text>
          </svg>
        ),
        options: [
          'Egy az eredeti e egyenessel PÁRHUZAMOS e\' egyenest (e\' ∥ e).',
          'Egy az eredeti e egyenesre merőleges egyenest.',
          'Egy kört, amelynek sugara megegyezik a hasonlósági aránnyal.',
          'Egy metsző egyenest, amely 45°-os szöget zár be az eredetivel.'
        ],
        correctAnswer: 0,
        hint: 'A középpontos hasonlóság egyik legalapvetőbb tétele az egyenesek párhuzamossága.',
        explanation: 'A középpontos hasonlóság egyik alaptulajdonsága, hogy a sík bármely, a centrumot elkerülő egyenesének képe vele párhuzamos egyenes: e\' ∥ e.',
        breakdown: [
          { label: 'Feltétel', value: 'O ∉ e (az egyenes nem megy át a centrumon)' },
          { label: 'Kép', value: 'e\' ∥ e (vele párhuzamos egyenes)' }
        ]
      },
      {
        id: 'cs-q12',
        level: 2,
        question: 'Mi történik az olyan egyenessel, amely ÁTMEGY a hasonlóság O centrumán?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="130" cy="35" r="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
            <text x="130" y="24" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">O ∈ e</text>
            <text x="210" y="28" className="text-[9px] font-bold fill-indigo-600 dark:fill-indigo-300">e' = e (invariáns)</text>
          </svg>
        ),
        options: [
          'Képe önmaga: e\' = e (invariáns egyenes, bár a pontjai elmozdulnak rajta).',
          'Az egyenes ponttá zsugorodik az O-ban.',
          'Az egyenes 90°-kal elfordul az O körül.',
          'Az egyenes képe két metsző félegyenes lesz.'
        ],
        correctAnswer: 0,
        hint: 'Minden pont képe a centrummal összekötő egyenesre esik. Ha a pont már rajta van ezen az egyenesen, hova kerül a képe?',
        explanation: 'Mivel bármely P pont képe az OP egyenesre esik, ha az egyenes átmegy az O-n, akkor minden pontjának képe is erre az egyenesre kerül. Így az egyenes képe önmaga: e\' = e. Az ilyen egyenest invariáns egyenesnek hívjuk.',
        breakdown: [
          { label: 'Feltétel', value: 'O ∈ e' },
          { label: 'Tulajdonság', value: 'Invariáns egyenes (e\' = e)' }
        ]
      },
      {
        id: 'cs-q13',
        level: 2,
        question: 'Hogyan viselkednek a szögek a középpontos hasonlósági transzformáció során?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <path d="M 30 55 L 75 55 L 60 20" fill="none" stroke="#0d9488" strokeWidth="2" />
            <text x="60" y="48" textAnchor="middle" className="text-[9px] font-bold fill-teal-800 dark:fill-teal-200">α = 40°</text>
            <path d="M 140 55 L 230 55 L 200 10" fill="none" stroke="#0d9488" strokeWidth="2" />
            <text x="195" y="48" textAnchor="middle" className="text-[10px] font-bold fill-teal-800 dark:fill-teal-200">α' = 40°</text>
            <text x="130" y="66" textAnchor="middle" className="text-[9px] font-bold fill-teal-600 dark:fill-teal-400">Szögtartó: α' = α</text>
          </svg>
        ),
        options: [
          'Szögtartó: minden szög képe vele megegyező nagyságú szög (α\' = α).',
          'A szögek nagysága |λ|-szorosára változik.',
          'Minden szög kiegészítő szögévé (180° - α) változik.',
          'Csak a derékszögek maradnak meg, az éles szögek torzulnak.'
        ],
        correctAnswer: 0,
        hint: 'A hasonlóság az alakot megőrzi, csak a méretet változtatja.',
        explanation: 'A középpontos hasonlóság szigorúan szögtartó és irányítástartó transzformáció. Bármely szög képe vele egyenlő nagyságú szög: α\' = α.',
        breakdown: [
          { label: 'Tulajdonság', value: 'Szögtartás' },
          { label: 'Képlet', value: 'α\' = α minden szögre' }
        ]
      },
      {
        id: 'cs-q14',
        level: 2,
        question: 'Egy háromszög AB oldala 7 cm hosszú. Mekkora lesz az A\'B\' képszakasz hossza, ha a hasonlósági arány λ = -3?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="35" x2="80" y2="35" stroke="#2563eb" strokeWidth="2.5" />
            <text x="55" y="25" textAnchor="middle" className="text-[9px] font-bold fill-blue-700 dark:fill-blue-300">AB = 7 cm</text>
            <line x1="120" y1="35" x2="235" y2="35" stroke="#7c3aed" strokeWidth="3" />
            <text x="177" y="25" textAnchor="middle" className="text-[9px] font-bold fill-purple-700 dark:fill-purple-300">A'B' = ? (λ = -3)</text>
            <text x="177" y="55" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">|A'B'| = |-3| · 7 cm</text>
          </svg>
        ),
        options: [
          '21 cm (|A\'B\'| = |-3| · 7 = 21 cm)',
          '-21 cm',
          '4 cm',
          '10 cm'
        ],
        correctAnswer: 0,
        hint: 'A szakasz hossza a hasonlósági arány abszolútértékével szorzódik: |A\'B\'| = |λ| · |AB|.',
        explanation: 'Szakaszok hosszára érvényes: |A\'B\'| = |λ| · |AB| = |-3| · 7 cm = 3 · 7 cm = 21 cm. A szakaszhossz soha nem lehet negatív.',
        breakdown: [
          { label: 'Képlet', value: '|A\'B\'| = |λ| · |AB|' },
          { label: 'Számítás', value: '3 · 7 cm = 21 cm' }
        ]
      },
      {
        id: 'cs-q15',
        level: 2,
        question: 'Egy sokszög kerülete K = 24 cm. Mekkora lesz a képsokszög K\' kerülete, ha a középpontos hasonlóság aránya λ = 2,5?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,52 65,52 55,25 35,25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="47.5" y="42" textAnchor="middle" className="text-[8px] font-bold fill-blue-700 dark:fill-blue-300">K = 24 cm</text>
            <polygon points="120,58 205,58 180,12 135,12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="162" y="40" textAnchor="middle" className="text-[10px] font-bold fill-purple-700 dark:fill-purple-300">K' = 2,5 · 24</text>
            <text x="162" y="66" textAnchor="middle" className="text-[9px] font-bold fill-purple-600 dark:fill-purple-400">K' = 60 cm</text>
          </svg>
        ),
        options: [
          '60 cm (K\' = 2,5 · 24 = 60 cm)',
          '48 cm',
          '150 cm',
          '9,6 cm'
        ],
        correctAnswer: 0,
        hint: 'A kerület oldalhosszak összege, így egyenesen arányos |λ|-val: K\' = |λ| · K.',
        explanation: 'A kerület az oldalak összege. Mivel minden oldal |λ|-szorosára változik, a teljes kerület is |λ|-szoros lesz: K\' = |2,5| · 24 cm = 60 cm.',
        breakdown: [
          { label: 'Kerületarány', value: 'K\' = |λ| · K' },
          { label: 'Számítás', value: '2,5 · 24 cm = 60 cm' }
        ]
      },
      {
        id: 'cs-q16',
        level: 2,
        question: 'Egy háromszög területe T = 10 cm². Mekkora lesz a képháromszög T\' területe, ha a hasonlóság aránya λ = 3?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,52 65,52 47.5,25" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="47.5" y="42" textAnchor="middle" className="text-[8px] font-bold fill-purple-700 dark:fill-purple-300">T = 10</text>
            <polygon points="120,58 220,58 170,8" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
            <text x="170" y="40" textAnchor="middle" className="text-[10px] font-black fill-purple-950 dark:fill-purple-100">T' = 3² · 10 = 90 cm²</text>
          </svg>
        ),
        options: [
          '90 cm² (T\' = 3² · 10 = 9 · 10 = 90 cm²)',
          '30 cm²',
          '60 cm²',
          '100 cm²'
        ],
        correctAnswer: 0,
        hint: 'A területek aránya a hasonlósági arány négyzete: T\' / T = λ²!',
        explanation: 'A területek aránya λ², mivel az alap és a magasság is 3-szorosára nő: T\' = λ² · T = 3² · 10 cm² = 9 · 10 = 90 cm².',
        breakdown: [
          { label: 'Területarány', value: 'T\' = λ² · T' },
          { label: 'Számítás', value: '9 · 10 cm² = 90 cm²' }
        ]
      },
      {
        id: 'cs-q17',
        level: 2,
        question: 'Egy síkidom területe T = 8 cm², a középpontos hasonlóság aránya λ = -2. Mekkora a T\' terület?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <rect x="35" y="25" width="25" height="25" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
            <text x="47.5" y="40" textAnchor="middle" className="text-[8px] font-bold fill-rose-900">T = 8</text>
            <rect x="130" y="10" width="50" height="50" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
            <text x="155" y="38" textAnchor="middle" className="text-[9px] font-black fill-rose-950">T' = (-2)² · 8</text>
            <text x="155" y="52" textAnchor="middle" className="text-[9px] font-black fill-rose-950">= 32 cm²</text>
          </svg>
        ),
        options: [
          '32 cm² (T\' = (-2)² · 8 = 4 · 8 = 32 cm²)',
          '-16 cm²',
          '16 cm²',
          '-32 cm²'
        ],
        correctAnswer: 0,
        hint: 'Negatív szám négyzete pozitív: (-2)² = +4!',
        explanation: 'A terület mindig pozitív mennyiség. A képlet T\' = λ² · T = (-2)² · 8 = 4 · 8 = 32 cm². A területarány a negatív arány ellenére is pozitív (négyszeres).',
        breakdown: [
          { label: 'Területarány', value: 'λ² = (-2)² = 4' },
          { label: 'Számítás', value: '4 · 8 cm² = 32 cm²' }
        ]
      },
      {
        id: 'cs-q18',
        level: 2,
        question: 'Egy pont centrumtól mért távolsága OP = 12 cm, és a képpont az O azonos oldalán OP\' = 3 cm távolságra fekszik. Mennyi a hasonlósági arány (λ)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="40" cy="35" r="4" fill="#4f46e5" />
            <text x="40" y="22" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">O</text>
            <circle cx="85" cy="35" r="3.5" fill="#10b981" />
            <text x="85" y="22" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">P' (3 cm)</text>
            <circle cx="220" cy="35" r="3.5" fill="#0284c7" />
            <text x="220" y="22" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">P (12 cm)</text>
          </svg>
        ),
        options: [
          'λ = +0,25 = 1/4 (OP\' / OP = 3 / 12 = 0,25 azonos oldalon)',
          'λ = +4',
          'λ = -0,25',
          'λ = +9'
        ],
        correctAnswer: 0,
        hint: 'A képlet: |λ| = OP\' / OP. Mivel azonos oldalon van, az előjel pozitív.',
        explanation: 'A hasonlósági arány nagysága |λ| = OP\' / OP = 3 / 12 = 1/4 = 0,25. Mivel a feladat szerint a pontok az O azonos oldalán fekszenek, a λ előjele pozitív: λ = +0,25.',
        breakdown: [
          { label: 'Hányados', value: '3 cm / 12 cm = 0,25' },
          { label: 'Előjel', value: 'Azonos oldal ⟹ λ = +0,25' }
        ]
      },
      {
        id: 'cs-q19',
        level: 2,
        question: 'Megőrzi-e a középpontos hasonlóság a síkidomok körüljárási irányát?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="35,52 65,52 50,22" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <path d="M 45 42 A 8 8 0 1 1 55 42" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <text x="50" y="65" textAnchor="middle" className="text-[8px] font-bold fill-blue-700 dark:fill-blue-300">A → B → C (óramutatóval ellentétes)</text>
            <polygon points="150,56 220,56 185,10" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <path d="M 175 42 A 12 12 0 1 1 195 42" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="185" y="66" textAnchor="middle" className="text-[8px] font-bold fill-purple-700 dark:fill-purple-300">A' → B' → C' (azonos irány)</text>
          </svg>
        ),
        options: [
          'Igen, a középpontos hasonlóság mindig irányítástartó transzformáció.',
          'Nem, negatív arány esetén megfordul a körüljárási irány.',
          'Csak háromszögeknél őrzi meg, köröknél és sokszögeknél nem.',
          'Csak akkor őrzi meg, ha λ > 1.'
        ],
        correctAnswer: 0,
        hint: 'A tengelyes tükrözés megfordítja a körüljárást, de vajon a középpontos hasonlóság is?',
        explanation: 'A középpontos hasonlóság szigorúan irányítástartó: még negatív arány (pl. λ = -1 vagy λ = -2) esetén sem fordul meg a csúcsok körüljárási iránya, mert a leképezés egy középpontos forgatással (180°) egyenértékű, ami irányítástartó.',
        breakdown: [
          { label: 'Tulajdonság', value: 'Irányítástartó' },
          { label: 'Érvényesség', value: 'Bármely λ ≠ 0 esetén változatlan' }
        ]
      },
      {
        id: 'cs-q20',
        level: 2,
        question: 'Egy háromszög középvonala mekkora hasonlósági arányú háromszöget vág le a szemközti csúcsból nézve?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="40,58 180,58 110,12" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <polygon points="75,35 145,35 110,12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="110" y="28" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">k = 1/2</text>
            <text x="110" y="50" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">T' = T / 4</text>
          </svg>
        ),
        options: [
          'λ = 1/2 = 0,5 arányút, és a levágott háromszög területe negyede (T/4) az eredetinek.',
          'λ = 2 arányút, és a területe kétszer akkora.',
          'λ = 1/3 arányút, és területe kilencede.',
          'Nem hasonló az eredeti háromszöghöz.'
        ],
        correctAnswer: 0,
        hint: 'A középvonal az oldalak felezőpontjait köti össze.',
        explanation: 'A csúcsból kiindulva az oldalfelező pontokig mért távolság az egész oldal fele (λ = 1/2). A levágott kis háromszög hasonló az egészhez λ = 0,5 aránnyal, területe pedig (1/2)² = 1/4 része az eredetinek.',
        breakdown: [
          { label: 'Arány', value: 'λ = 1/2' },
          { label: 'Területarány', value: 'T\' = (1/2)² · T = T / 4' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Párhuzamos Szelők Tétele és Összetett Feladatok',
    subtitle: 'Szelőszakaszok aránya, súlypont geometriája, koordinátageometria és életszerű feladatok',
    range: '21-30. kérdés',
    focus: 'Párhuzamos szelők és sugarak tétele, koordináták (λx, λy), súlypont λ = -1/2, kompozíció',
    questions: [
      {
        id: 'cs-q21',
        level: 3,
        question: 'Egy O csúcsú szög száraira OA = 4 cm és OA\' = 10 cm pontokat mérünk. Ha AB = 6 cm és A\'B\' ∥ AB, mekkora az A\'B\' szakasz hossza?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="40" x2="240" y2="10" stroke="#64748b" strokeWidth="1.5" />
            <line x1="20" y1="40" x2="240" y2="65" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="32" x2="80" y2="48" stroke="#3b82f6" strokeWidth="2" />
            <line x1="180" y1="18" x2="180" y2="60" stroke="#8b5cf6" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="3" fill="#4f46e5" />
            <text x="15" y="44" className="text-[8px] font-bold fill-indigo-700">O</text>
            <text x="80" y="27" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">6 cm</text>
            <text x="180" y="14" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">A'B' = ?</text>
            <text x="50" y="48" className="text-[7px] fill-slate-500">4 cm</text>
            <text x="130" y="48" className="text-[7px] fill-slate-500">10 cm</text>
          </svg>
        ),
        options: [
          '15 cm (A\'B\' / 6 = 10 / 4 ⟹ A\'B\' = 6 · 2,5 = 15 cm)',
          '12 cm',
          '20 cm',
          '24 cm'
        ],
        correctAnswer: 0,
        hint: 'Párhuzamos szelőszakaszok tétele: A\'B\' / AB = OA\' / OA.',
        explanation: 'A párhuzamos szelőszakaszok tétele alapján A\'B\' / AB = OA\' / OA. Behelyettesítve: A\'B\' / 6 = 10 / 4 = 2,5, amiből A\'B\' = 6 · 2,5 = 15 cm.',
        breakdown: [
          { label: 'Aránypár', value: 'A\'B\' / AB = OA\' / OA' },
          { label: 'Számítás', value: 'A\'B\' / 6 = 10 / 4 = 2,5' },
          { label: 'Eredmény', value: 'A\'B\' = 15 cm' }
        ]
      },
      {
        id: 'cs-q22',
        level: 3,
        question: 'Egy szög szárait metsző párhuzamosok esetén OA = 3 cm, AA\' = 6 cm és OB = 5 cm. Mekkora a BB\' szakasz hossza a másik száron?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="10" stroke="#64748b" strokeWidth="1.5" />
            <line x1="20" y1="35" x2="240" y2="60" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="28" x2="80" y2="44" stroke="#3b82f6" strokeWidth="2" />
            <line x1="180" y1="17" x2="180" y2="54" stroke="#8b5cf6" strokeWidth="2" />
            <text x="45" y="24" className="text-[7px] font-bold fill-blue-700">3 cm</text>
            <text x="125" y="16" className="text-[7px] font-bold fill-purple-700">6 cm</text>
            <text x="45" y="50" className="text-[7px] font-bold fill-blue-700">5 cm</text>
            <text x="125" y="50" className="text-[7px] font-bold fill-purple-700">BB' = ?</text>
          </svg>
        ),
        options: [
          '10 cm (AA\' / OA = BB\' / OB ⟹ 6 / 3 = BB\' / 5 ⟹ BB\' = 10 cm)',
          '8 cm',
          '15 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamosok a szárakon egymással arányos darabokat vágnak le: AA\' / OA = BB\' / OB.',
        explanation: 'A szárakon levő szakaszok aránya: AA\' / OA = BB\' / OB. Behelyettesítve: 6 / 3 = BB\' / 5 ⟹ 2 = BB\' / 5 ⟹ BB\' = 10 cm.',
        breakdown: [
          { label: 'Képlet', value: 'AA\' / OA = BB\' / OB' },
          { label: 'Számítás', value: '6 / 3 = 2 ⟹ BB\' = 2 · 5 = 10 cm' }
        ]
      },
      {
        id: 'cs-q23',
        level: 3,
        question: 'Milyen arányú középpontos hasonlóság köti össze a háromszög csúcsait a szemközti oldalfelező pontokkal a háromszög S súlypontjára vonatkoztatva?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="40,60 200,60 120,12" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <polygon points="120,60 160,36 80,36" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="120" cy="44" r="3" fill="#ef4444" />
            <text x="120" y="40" textAnchor="middle" className="text-[8px] font-black fill-rose-700">S</text>
            <text x="120" y="68" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">λ = -1/2</text>
          </svg>
        ),
        options: [
          'λ = -1/2 (az oldalfelező pont az S ellentétes oldalán van feleakkora távolságra)',
          'λ = +1/2',
          'λ = -2',
          'λ = +2/3'
        ],
        correctAnswer: 0,
        hint: 'A súlypont 2:1 arányban osztja a súlyvonalat úgy, hogy a hosszabb rész a csúcs felé esik.',
        explanation: 'A súlypont a súlyvonalakat 2:1 arányban osztja, tehát |SF| = (1/2) · |SC|. Mivel az oldalfelező pont és a csúcs a súlypont ellentétes oldalán fekszik, a hasonlósági arány negatív: λ = -1/2.',
        breakdown: [
          { label: 'Arány nagysága', value: '|λ| = 1/2' },
          { label: 'Irány', value: 'Ellentétes oldal (S a pontok között) ⟹ negatív' },
          { label: 'Eredmény', value: 'λ = -1/2' }
        ]
      },
      {
        id: 'cs-q24',
        level: 3,
        question: 'A derékszögű koordinátasíkon az origó O(0,0) a centrum. Hova képződik a P(3, -4) pont λ = -2 arányú középpontos hasonlósággal?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#94a3b8" strokeWidth="1" />
            <line x1="130" y1="5" x2="130" y2="65" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="160" cy="50" r="3.5" fill="#0284c7" />
            <text x="175" y="55" className="text-[7px] font-bold fill-sky-700">P(3, -4)</text>
            <circle cx="70" cy="15" r="3.5" fill="#ef4444" />
            <text x="50" y="12" className="text-[7px] font-bold fill-rose-700">P'(-6, 8)</text>
            <circle cx="130" cy="35" r="3" fill="#4f46e5" />
          </svg>
        ),
        options: [
          'P\'(-6, 8) — mivel mindkét koordinátát megszorozzuk λ-val: (λx, λy)',
          'P\'(6, -8)',
          'P\'(-1, -6)',
          'P\'(1,5, -2)'
        ],
        correctAnswer: 0,
        hint: 'Origó középpontú nyújtásnál a pont mindkét koordinátája λ-szorosára változik: (x, y) ↦ (λx, λy).',
        explanation: 'Az origó centrumú leképezés képlete: P\'(λ · x, λ · y). Behelyettesítve: P\'((-2) · 3, (-2) · (-4)) = P\'(-6, 8).',
        breakdown: [
          { label: 'Képlet', value: '(x\', y\') = (λx, λy)' },
          { label: 'Számítás', value: '(-2 · 3, -2 · (-4)) = (-6, 8)' }
        ]
      },
      {
        id: 'cs-q25',
        level: 3,
        question: 'Két hasonló téglalap területe T = 18 cm² és T\' = 72 cm². Mekkora a hasonlósági arány nagysága (|λ|)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <rect x="40" y="25" width="30" height="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="55" y="38" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">18 cm²</text>
            <rect x="130" y="15" width="60" height="40" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
            <text x="160" y="38" textAnchor="middle" className="text-[9px] font-black fill-purple-950">72 cm²</text>
            <text x="160" y="62" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">λ² = 72 / 18 = 4 ⟹ |λ| = 2</text>
          </svg>
        ),
        options: [
          '|λ| = 2 (mivel λ² = 72 / 18 = 4 ⟹ |λ| = √4 = 2)',
          '|λ| = 4',
          '|λ| = 16',
          '|λ| = 0,5'
        ],
        correctAnswer: 0,
        hint: 'A területek aránya λ², tehát a hasonlósági arány ennek a négyzetgyöke.',
        explanation: 'A területek hányadosa megadja λ²-et: T\' / T = 72 / 18 = 4. Ebből négyzetgyökvonással |λ| = √4 = 2.',
        breakdown: [
          { label: 'Területarány', value: 'λ² = T\' / T = 72 / 18 = 4' },
          { label: 'Arány', value: '|λ| = √4 = 2' }
        ]
      },
      {
        id: 'cs-q26',
        level: 3,
        question: 'Egy függőlegesen felállított 1 m magas bot árnyéka a vízszintes talajon 1,5 m. Ezzel egy időben egy fa árnyéka 9 m hosszú. Milyen magas a fa?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="55" x2="30" y2="35" stroke="#92400e" strokeWidth="2" />
            <line x1="30" y1="55" x2="60" y2="55" stroke="#64748b" strokeWidth="2" />
            <text x="22" y="47" className="text-[7px] font-bold fill-amber-900">1 m</text>
            <text x="45" y="63" className="text-[7px] font-bold fill-slate-600">1,5 m</text>
            <line x1="120" y1="55" x2="120" y2="10" stroke="#166534" strokeWidth="3" />
            <line x1="120" y1="55" x2="220" y2="55" stroke="#64748b" strokeWidth="2.5" />
            <text x="110" y="35" className="text-[8px] font-bold fill-emerald-900">M = ?</text>
            <text x="170" y="64" className="text-[8px] font-bold fill-slate-700">9 m</text>
          </svg>
        ),
        options: [
          '6 m (M / 1 = 9 / 1,5 ⟹ M = 6 m)',
          '13,5 m',
          '8 m',
          '12 m'
        ],
        correctAnswer: 0,
        hint: 'A nap sugarai párhuzamosak, így a magasságok és az árnyékok aránya megegyezik: M / m = Á / á.',
        explanation: 'A párhuzamos napsugarak miatt a keletkező derékszögű háromszögek hasonlók. A hasonlósági arány: k = 9 / 1,5 = 6. Tehát a fa magassága M = 6 · 1 m = 6 m.',
        breakdown: [
          { label: 'Aránypár', value: 'M / 1 = 9 / 1,5' },
          { label: 'Számítás', value: 'M = 6 m' }
        ]
      },
      {
        id: 'cs-q27',
        level: 3,
        question: 'Camera obscura (lyukkamera) elvén egy 180 cm magas emberről a kamera hátsó lapján egy 6 cm magas fordított kép keletkezik. Mennyi a leképezés λ aránya?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="15" x2="30" y2="55" stroke="#0284c7" strokeWidth="2.5" />
            <text x="20" y="37" textAnchor="end" className="text-[7px] font-bold fill-sky-800">180 cm</text>
            <line x1="30" y1="15" x2="210" y2="55" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="30" y1="55" x2="210" y2="15" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="140" cy="35" r="3" fill="#000000" />
            <text x="140" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-800">Lyuk (O)</text>
            <line x1="210" y1="28" x2="210" y2="42" stroke="#ef4444" strokeWidth="2.5" />
            <text x="218" y="37" className="text-[7px] font-bold fill-rose-800">6 cm</text>
          </svg>
        ),
        options: [
          'λ = -1/30 (mivel fordított a kép és nagysága 6 / 180 = 1/30)',
          'λ = +1/30',
          'λ = -30',
          'λ = -6'
        ],
        correctAnswer: 0,
        hint: 'A fordított állás negatív arányt jelent, a nagyság pedig a képméret és tárgyméret hányadosa.',
        explanation: 'A lyukkamerában a fénysugarak egy ponton haladnak át, így a kép fejjel lefelé keletkezik (ellentétes félegyenesek, λ < 0). Az arány nagysága |λ| = 6 / 180 = 1/30. Tehát λ = -1/30.',
        breakdown: [
          { label: 'Arány nagysága', value: '|λ| = 6 / 180 = 1/30' },
          { label: 'Előjel', value: 'Fordított kép ⟹ λ = -1/30' }
        ]
      },
      {
        id: 'cs-q28',
        level: 3,
        question: 'Egy r = 4 cm sugarú körön középpontos hasonlóságot hajtunk végre λ = -1,5 aránnyal. Mekkora lesz a képkör sugara (r\') és a területek aránya (T\' / T)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <circle cx="60" cy="35" r="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="60" y="38" textAnchor="middle" className="text-[8px] font-bold fill-blue-800">r = 4</text>
            <circle cx="170" cy="35" r="24" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
            <text x="170" y="38" textAnchor="middle" className="text-[8px] font-bold fill-rose-900">r' = 6</text>
          </svg>
        ),
        options: [
          'r\' = 6 cm és T\' / T = 2,25 (mivel r\' = |-1,5| · 4 = 6 cm, és (-1,5)² = 2,25)',
          'r\' = -6 cm és T\' / T = -2,25',
          'r\' = 6 cm és T\' / T = 1,5',
          'r\' = 2 cm és T\' / T = 4'
        ],
        correctAnswer: 0,
        hint: 'A kör sugara szakaszként |λ|-szorosára nő, területe pedig λ²-szeresére.',
        explanation: 'A kör sugara r\' = |-1,5| · 4 cm = 6 cm. A területek aránya T\' / T = λ² = (-1,5)² = 2,25 (az új kör területe 2,25-szöröse a réginek).',
        breakdown: [
          { label: 'Új sugár', value: 'r\' = |-1,5| · 4 = 6 cm' },
          { label: 'Területarány', value: 'T\' / T = (-1,5)² = 2,25' }
        ]
      },
      {
        id: 'cs-q29',
        level: 3,
        question: 'A számegyenesen az origó O(0) a centrum. A P(4) pont képe P\'(-8). Mennyi a hasonlósági arány (λ)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#64748b" strokeWidth="2" />
            <circle cx="60" cy="35" r="4" fill="#ef4444" />
            <text x="60" y="24" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">P'(-8)</text>
            <circle cx="120" cy="35" r="4.5" fill="#4f46e5" />
            <text x="120" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">O(0)</text>
            <circle cx="180" cy="35" r="4" fill="#0284c7" />
            <text x="180" y="24" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">P(4)</text>
          </svg>
        ),
        options: [
          'λ = -2 (mivel P\' / P = -8 / 4 = -2)',
          'λ = +2',
          'λ = -0,5',
          'λ = -12'
        ],
        correctAnswer: 0,
        hint: 'A számegyenesen a koordináták hányadosa közvetlenül megadja a λ-t.',
        explanation: 'Az origóból nézve a P(4) pont távolsága 4, a P\'(-8) ponté 8, és a másik oldalon fekszik. Ezért |λ| = 8 / 4 = 2, és a negativitás miatt λ = -2.',
        breakdown: [
          { label: 'Számítás', value: 'λ = -8 / 4 = -2' },
          { label: 'Jelentés', value: 'Kétszeres távolság az ellenkező oldalon' }
        ]
      },
      {
        id: 'cs-q30',
        level: 3,
        question: 'Egymás után alkalmazunk két azonos centrumú középpontos hasonlóságot: először λ₁ = 2 aránnyal, majd az eredményre λ₂ = -1,5 aránnyal. Mi az eredő transzformáció?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="35" x2="240" y2="35" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <circle cx="100" cy="35" r="4.5" fill="#4f46e5" />
            <text x="100" y="22" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">O</text>
            <circle cx="130" cy="35" r="3.5" fill="#0284c7" />
            <text x="130" y="22" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">P</text>
            <circle cx="160" cy="35" r="3.5" fill="#10b981" />
            <text x="160" y="22" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">P₁</text>
            <circle cx="40" cy="35" r="4" fill="#ef4444" />
            <text x="40" y="22" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">P₂</text>
            <text x="130" y="55" textAnchor="middle" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-300">λ = 2 · (-1,5) = -3</text>
          </svg>
        ),
        options: [
          'Egyetlen középpontos hasonlóság ugyanezzel az O centrummal és λ = -3 aránnyal.',
          'Egy λ = +0,5 arányú hasonlóság.',
          'Egy 0,5 cm-es eltolás.',
          'A két transzformáció kioltja egymást.'
        ],
        correctAnswer: 0,
        hint: 'A hasonlósági arányok összeszorzódnak: λ = λ₁ · λ₂.',
        explanation: 'Közös középpont esetén két középpontos hasonlóság egymásutánja is középpontos hasonlóság, amelynek aránya az egyes arányok szorzata: λ = λ₁ · λ₂ = 2 · (-1,5) = -3.',
        breakdown: [
          { label: 'Kompozíció', value: 'λ = λ₁ · λ₂' },
          { label: 'Számítás', value: '2 · (-1,5) = -3' },
          { label: 'Eredmény', value: '3-szoros nagyítás 180°-os átfordulással' }
        ]
      }
    ]
  }
};

export const CentralSimilarityQuiz: React.FC<CentralSimilarityQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-central-similarity"
      grade={8}
      chapterId="geometria"
      topicTitle="A középpontos hasonlóság"
      emoji="🎯"
      topicBadge="8. Osztály • II. Geometria • 5. Témakör"
      badgeText="8. Osztály • Matematika"
      title="Középpontos Hasonlóság Kvíz"
      subtitle="Centrum, λ arányszám, párhuzamos egyenesek és szelők tétele 3 szinten"
      cheatSheetTitle="Középpontos Hasonlóság Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Figyelj a távolságokra: OP' = |λ| · OP mindig nemnegatív, a területarány pedig λ² (négyzetes)!"
      levels={quizLevels}
      matcherComponent={<CentralSimilarityMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<CentralSimilaritySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="indigo"
    />
  );
};

export default CentralSimilarityQuiz;
