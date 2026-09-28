import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import {
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
import { SimilarityMatcher } from './SimilarityMatcher';
import { SimilaritySorter } from './SimilaritySorter';

interface SimilarityQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Hasonlósági arány (k)',
    icon: <Shapes className="w-4 h-4 text-blue-600" />,
    formula: "|A'B'| = k · |AB| (k > 0)",
    note: 'k > 1 esetén nagyítás, k = 1 esetén egybevágóság, 0 < k < 1 esetén kicsinyítés. A szögek szigorúan változatlanok (α\' = α).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="20,38 45,38 32,15" fill="#dbeafe" className="stroke-blue-600 stroke-[1.5]" />
        <polygon points="80,40 145,40 112,6" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.8]" />
        <text x="52" y="28" className="text-[9px] font-bold fill-blue-900">k-szoros</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Hasonlósági alapesetek',
    icon: <Compass className="w-4 h-4 text-teal-600" />,
    formula: 'sz-sz | o-o-o | o-sz-o | d-o-o',
    note: 'A leggyakoribb a sz-sz (két szög egyenlő). Két derékszögű háromszög hasonló, ha egyetlen hegyesszögük megegyezik!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="15,38 45,38 15,15" fill="none" className="stroke-teal-600 stroke-[1.5]" />
        <path d="M 15 32 L 20 32 L 20 38" fill="none" className="stroke-teal-700 stroke-[1]" />
        <text x="30" y="35" className="text-[7px] font-bold fill-teal-800">α</text>
        <polygon points="85,40 145,40 85,8" fill="none" className="stroke-teal-600 stroke-[1.8]" />
        <path d="M 85 33 L 91 33 L 91 40" fill="none" className="stroke-teal-700 stroke-[1]" />
        <text x="122" y="37" className="text-[8px] font-bold fill-teal-800">α' = α</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Kerület és terület aránya',
    icon: <Maximize2 className="w-4 h-4 text-indigo-600" />,
    formula: "K' / K = k  |  T' / T = k²",
    note: 'A kerületek aránya k, a területek aránya k² (a hasonlósági arány négyzete!). Térfogatok aránya k³.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="20" y="15" width="20" height="20" fill="#ede9fe" className="stroke-indigo-600 stroke-[1.5]" />
        <text x="25" y="28" className="text-[8px] font-bold fill-indigo-900">T</text>
        <rect x="80" y="5" width="40" height="40" fill="#c7d2fe" className="stroke-indigo-700 stroke-[1.8]" />
        <text x="94" y="27" className="text-[9px] font-black fill-indigo-950">T' = 4·T</text>
        <text x="128" y="27" className="text-[7px] font-bold fill-indigo-800">(k=2)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Gyakorlati alkalmazások',
    icon: <Sun className="w-4 h-4 text-amber-600" />,
    formula: 'M / m = Á / á  |  Középvonal: k = 1/2',
    note: 'Árnyékmódszer: magasságok aránya = árnyékok aránya. Háromszög középvonala negyedakkora területű (T/4) háromszöget vág le.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="38" x2="20" y2="22" className="stroke-amber-800 stroke-[2]" />
        <line x1="20" y1="38" x2="35" y2="38" className="stroke-slate-600 stroke-[2]" />
        <text x="14" y="29" className="text-[7px] font-bold fill-amber-900">m</text>
        <line x1="75" y1="38" x2="75" y2="6" className="stroke-emerald-800 stroke-[3]" />
        <line x1="75" y1="38" x2="135" y2="38" className="stroke-slate-600 stroke-[2.5]" />
        <text x="65" y="22" className="text-[8px] font-bold fill-emerald-950">M = k·m</text>
      </svg>
    )
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a Hasonlósági Arány',
    subtitle: 'A hasonlóság definíciója, a k arány értelmezése, szögtartás és alapvető példák',
    range: '1-10. kérdés',
    focus: 'Hasonlósági arány (k), nagyítás, kicsinyítés, egybevágóság, invariánsok',
    questions: [
      {
        id: 'sim-q1',
        level: 1,
        question: 'Mit jelent pontosan az, hogy két síkidom hasonlósági aránya k = 3?',
        figure: (
          <svg viewBox="0 0 250 72" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* PQ segment */}
            <circle cx="28" cy="36" r="3.5" fill="#3b82f6" />
            <circle cx="78" cy="36" r="3.5" fill="#3b82f6" />
            <line x1="28" y1="36" x2="78" y2="36" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <text x="28" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">P</text>
            <text x="78" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">Q</text>
            <text x="53" y="52" textAnchor="middle" className="text-[9px] font-black fill-blue-600 dark:fill-blue-400">|PQ| = 2 cm</text>
            {/* Scale arrow */}
            <path d="M 94 36 L 122 36 M 116 31 L 124 36 L 116 41" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="108" y="26" textAnchor="middle" className="text-[9px] font-black fill-indigo-600 dark:fill-indigo-400">k = 3</text>
            {/* P'Q' segment */}
            <circle cx="138" cy="36" r="3.5" fill="#2563eb" />
            <circle cx="228" cy="36" r="3.5" fill="#2563eb" />
            <line x1="138" y1="36" x2="228" y2="36" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
            <text x="138" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">P'</text>
            <text x="228" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">Q'</text>
            <text x="183" y="52" textAnchor="middle" className="text-[9px] font-black fill-blue-700 dark:fill-blue-300">|P'Q'| = 3 · 2 = 6 cm</text>
          </svg>
        ),
        options: [
          'A képalakzat minden megfelelő szakaszának hossza az eredeti szakasz 3-szorosa.',
          'A képalakzat minden belső szöge 3-szor akkora, mint az eredeti szög.',
          'A képalakzat kerülete 9-szerese az eredetinek.',
          'A képalakzat pontosan 3 pontból áll.'
        ],
        correctAnswer: 0,
        hint: 'A hasonlósági arány a megfelelő szakaszok hosszának hányadosa.',
        explanation: 'A hasonlósági transzformáció definíciója szerint |P\'Q\'| = k · |PQ|. Tehát k = 3 esetén az új alakzat minden oldala és belső szakasza 3-szor hosszabb az eredetinél.',
        breakdown: [
          { label: 'Definíció', value: '|P\'Q\'| = k · |PQ|' },
          { label: 'Szakaszok hossza', value: '3-szorosára nő' }
        ]
      },
      {
        id: 'sim-q2',
        level: 1,
        question: 'A hasonlósági arány (k) mely értéktartománya esetén beszélünk geometriai kicsinyítésről?',
        figure: (
          <svg viewBox="0 0 250 75" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Reduced */}
            <polygon points="25,54 50,54 37.5,34" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
            <text x="37.5" y="67" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400">0 &lt; k &lt; 1</text>
            <text x="37.5" y="27" textAnchor="middle" className="text-[8px] font-extrabold fill-indigo-700 dark:fill-indigo-300">Kicsinyítés</text>
            {/* Congruent */}
            <polygon points="85,54 125,54 105,22" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <text x="105" y="67" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600 dark:fill-emerald-400">k = 1</text>
            <text x="105" y="16" textAnchor="middle" className="text-[8px] font-extrabold fill-emerald-700 dark:fill-emerald-300">Egybevágó</text>
            {/* Enlarged */}
            <polygon points="160,54 220,54 190,8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="190" y="67" textAnchor="middle" className="text-[8px] font-bold fill-blue-600 dark:fill-blue-400">k &gt; 1</text>
            <text x="190" y="6" textAnchor="middle" className="text-[8px] font-extrabold fill-blue-700 dark:fill-blue-300">Nagyítás</text>
          </svg>
        ),
        options: [
          '0 < k < 1',
          'k > 1',
          'k = 1',
          'k < 0'
        ],
        correctAnswer: 0,
        hint: 'Kicsinyítésnél a képszakaszok rövidebbek az eredetinél, de a hosszúság pozitív.',
        explanation: 'Ha 0 < k < 1 (pl. k = 0.5 vagy k = 1/4), akkor a képalakzat méretei kisebbek az eredetinél, ez a geometriai kicsinyítés. A k = 1 az egybevágóság, a k > 1 a nagyítás.',
        breakdown: [
          { label: '0 < k < 1', value: 'Kicsinyítés' },
          { label: 'k = 1', value: 'Egybevágóság' },
          { label: 'k > 1', value: 'Nagyítás' }
        ]
      },
      {
        id: 'sim-q3',
        level: 1,
        question: 'Milyen kapcsolat van az egybevágóság és a hasonlóság között a geometriában?',
        figure: (
          <svg viewBox="0 0 250 75" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="35,55 80,55 55,20" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <text x="57" y="44" textAnchor="middle" className="text-[9px] font-black fill-teal-900 dark:fill-teal-100">F</text>
            <text x="57" y="68" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-400">Eredeti</text>
            <path d="M 95 38 L 125 38 M 120 33 L 128 38 L 120 43" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="110" y="28" textAnchor="middle" className="text-[9px] font-black fill-teal-700 dark:fill-teal-300">k = 1</text>
            <polygon points="145,55 190,55 165,20" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <text x="167" y="44" textAnchor="middle" className="text-[9px] font-black fill-teal-900 dark:fill-teal-100">F' ≅ F</text>
            <text x="167" y="68" textAnchor="middle" className="text-[8px] font-bold fill-teal-700 dark:fill-teal-300">Egybevágó kép</text>
          </svg>
        ),
        options: [
          'Az egybevágóság a hasonlóság speciális esete, amikor a hasonlósági arány pontosan k = 1.',
          'Az egybevágóság és a hasonlóság teljesen kizárják egymást.',
          'Csak a háromszögek lehetnek egybevágóak, a négyszögek csak hasonlók.',
          'A hasonlóság csak tértestekre érvényes, az egybevágóság csak síkidomokra.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, mi történik a képlettel, ha k = 1!',
        explanation: 'Mivel k = 1 esetén |P\'Q\'| = 1 · |PQ| = |PQ|, a távolságok nem változnak meg. Minden egybevágó alakzat egyben hasonló is (k = 1 aránnyal), de nem minden hasonló alakzat egybevágó.',
        breakdown: [
          { label: 'Összefüggés', value: 'Egybevágóság ⊂ Hasonlóság' },
          { label: 'Feltétel', value: 'k = 1 távolságtartó speciális eset' }
        ]
      },
      {
        id: 'sim-q4',
        level: 1,
        question: 'Egy háromszög belső szögei 40°, 60° és 80°. A háromszöget k = 2.5 arányban felnagyítjuk. Mekkorák lesznek az új háromszög belső szögei?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle */}
            <polygon points="20,62 70,62 50,22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="32" y="58" className="text-[7px] font-black fill-amber-900">40°</text>
            <text x="53" y="58" className="text-[7px] font-black fill-amber-900">60°</text>
            <text x="44" y="34" className="text-[7px] font-black fill-amber-900">80°</text>
            {/* Scale arrow */}
            <path d="M 85 42 L 115 42 M 110 37 L 117 42 L 110 47" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="100" y="32" textAnchor="middle" className="text-[8px] font-black fill-amber-700 dark:fill-amber-400">k = 2.5</text>
            {/* Big triangle */}
            <polygon points="135,66 225,66 189,8" fill="#fef3c7" stroke="#d97706" strokeWidth="2.2" />
            <text x="154" y="61" className="text-[8px] font-black fill-amber-900">40°</text>
            <text x="200" y="61" className="text-[8px] font-black fill-amber-900">60°</text>
            <text x="180" y="26" className="text-[8px] font-black fill-amber-900">80°</text>
            <text x="180" y="77" textAnchor="middle" className="text-[8px] font-black fill-amber-700 dark:fill-amber-300">Szögek nem változnak!</text>
          </svg>
        ),
        options: [
          'Pontosan 40°, 60° és 80° (a szögek változatlanok maradnak).',
          '100°, 150° és 200° (a szögek is 2,5-szeresükre nőttek).',
          '20°, 30° és 40° (a szögek a felére csökkentek).',
          'Mindhárom szög 60°-os lesz.'
        ],
        correctAnswer: 0,
        hint: 'A hasonlósági transzformáció egyik legfontosabb tulajdonsága a szögtartás!',
        explanation: 'A hasonlóság szögtartó leképezés: a megfelelő szögek nagysága szigorúan megegyezik (α\' = α). Ha a szögek megváltoznának, az alakzat formája torzulna, és a belső szögek összege sem lenne 180°!',
        breakdown: [
          { label: 'Tulajdonság', value: 'Szögtartás' },
          { label: 'Új szögek', value: '40°, 60°, 80° (változatlan)' }
        ]
      },
      {
        id: 'sim-q5',
        level: 1,
        question: 'Egy háromszög oldalai 4 cm, 6 cm és 8 cm. Egy hozzá hasonló háromszög leghosszabb oldala 24 cm. Mekkora a hasonló háromszög legkisebb oldala?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle: 4, 6, 8 */}
            <polygon points="20,62 76,62 38,26" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" />
            <text x="48" y="72" textAnchor="middle" className="text-[8px] font-black fill-blue-700">c = 8 cm</text>
            <text x="20" y="42" textAnchor="middle" className="text-[8px] font-black fill-rose-600">a = 4</text>
            <text x="64" y="42" textAnchor="middle" className="text-[8px] font-black fill-blue-700">b = 6</text>
            {/* Scale arrow */}
            <path d="M 90 44 L 116 44 M 111 39 L 118 44 L 111 49" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="103" y="34" textAnchor="middle" className="text-[8px] font-black fill-indigo-600 dark:fill-indigo-300">k = 24/8 = 3</text>
            {/* Big triangle: ?, ?, 24 */}
            <polygon points="135,66 235,66 167,8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.2" />
            <text x="185" y="77" textAnchor="middle" className="text-[9px] font-black fill-blue-800">c' = 24 cm</text>
            <text x="136" y="34" textAnchor="middle" className="text-[9px] font-black fill-rose-600 dark:fill-rose-400">a' = 4 · 3 = 12</text>
            <text x="215" y="34" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">b' = 18</text>
          </svg>
        ),
        options: [
          '12 cm',
          '8 cm',
          '16 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        hint: 'Számold ki a leghosszabb oldalak arányát (k = 24 / 8), majd szorozd meg a legkisebb oldalt!',
        explanation: 'A leghosszabb oldalak arányából: k = 24 cm / 8 cm = 3. A legkisebb oldal az eredeti háromszögben 4 cm, így a képháromszögben a legkisebb oldal: 4 cm · 3 = 12 cm.',
        breakdown: [
          { label: 'Hasonlósági arány', value: 'k = 24 / 8 = 3' },
          { label: 'Legkisebb oldal', value: '4 · 3 = 12 cm' }
        ]
      },
      {
        id: 'sim-q6',
        level: 1,
        question: 'Mi a feltétele a két szög egyenlőségén alapuló (sz-sz) hasonlósági alapesetnek?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Triangle 1 */}
            <polygon points="20,62 70,62 48,22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
            <path d="M 33 62 A 13 13 0 0 0 29 49" fill="none" stroke="#ea580c" strokeWidth="2" />
            <path d="M 60 62 A 13 13 0 0 1 57 51" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="36" y="58" className="text-[8px] font-black fill-orange-700">α</text>
            <text x="54" y="58" className="text-[8px] font-black fill-blue-700">β</text>
            <text x="45" y="74" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300">Δ₁</text>
            {/* Similarity symbol */}
            <text x="100" y="46" textAnchor="middle" className="text-[14px] font-black fill-emerald-600 dark:fill-emerald-400">~</text>
            <text x="100" y="30" textAnchor="middle" className="text-[8px] font-black fill-emerald-700 dark:fill-emerald-300">sz-sz</text>
            {/* Triangle 2 */}
            <polygon points="135,66 220,66 185,10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.2" />
            <path d="M 152 66 A 18 18 0 0 0 146 50" fill="none" stroke="#ea580c" strokeWidth="2.2" />
            <path d="M 205 66 A 18 18 0 0 1 200 52" fill="none" stroke="#2563eb" strokeWidth="2.2" />
            <text x="156" y="62" className="text-[9px] font-black fill-orange-700">α' = α</text>
            <text x="190" y="62" className="text-[9px] font-black fill-blue-700">β' = β</text>
            <text x="178" y="77" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300">Δ₂</text>
          </svg>
        ),
        options: [
          'Két-két megfelelő belső szögük egyenlő (a 180°-os szögösszeg miatt a harmadik is azonos).',
          'Mind a 6 adatuknak (3 oldal és 3 szög) egyeznie kell.',
          'Csak derékszögek esetén érvényes.',
          'A két háromszög kerületének egyenlőnek kell lennie.'
        ],
        correctAnswer: 0,
        hint: 'Ha két szög ismert egy háromszögben, a harmadik automatikusan 180° - (α + β).',
        explanation: 'Mivel bármely síkháromszög belső szögeinek összege 180°, ha két-két megfelelő szögük egyenlő (α = α\' és β = β\'), akkor a harmadik szögük is szükségképpen egyenlő (γ = γ\'), tehát a két háromszög hasonló.',
        breakdown: [
          { label: 'Alapeset', value: 'sz-sz (két szög egyenlő)' },
          { label: 'Harmadik szög', value: '180° - (α + β) miatt automatikusan egyezik' }
        ]
      },
      {
        id: 'sim-q7',
        level: 1,
        question: 'Igaz-e az az állítás, hogy bármely két szabályos (egyenlő oldalú) háromszög hasonló egymáshoz?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small equilateral */}
            <polygon points="30,62 70,62 50,27" fill="#fdf4ff" stroke="#c026d3" strokeWidth="2" />
            <text x="50" y="55" textAnchor="middle" className="text-[7px] font-bold fill-fuchsia-900">60°</text>
            <text x="50" y="73" textAnchor="middle" className="text-[8px] font-bold fill-fuchsia-700">oldal: a</text>
            {/* Equal angles text */}
            <text x="110" y="44" textAnchor="middle" className="text-[13px] font-black fill-fuchsia-600 dark:fill-fuchsia-400">~</text>
            <text x="110" y="30" textAnchor="middle" className="text-[8px] font-black fill-fuchsia-700 dark:fill-fuchsia-300">minden szög 60°</text>
            {/* Large equilateral */}
            <polygon points="145,66 215,66 180,6" fill="#fdf4ff" stroke="#c026d3" strokeWidth="2.2" />
            <text x="180" y="55" textAnchor="middle" className="text-[8px] font-bold fill-fuchsia-900">60°</text>
            <text x="180" y="77" textAnchor="middle" className="text-[8px] font-bold fill-fuchsia-700">oldal: b = k · a</text>
          </svg>
        ),
        options: [
          'Igaz, mert minden szabályos háromszög mindhárom belső szöge pontosan 60° (sz-sz alapeset).',
          'Hamis, csak akkor hasonlóak, ha az oldalaik hossza megegyezik.',
          'Hamis, mert a szabályos háromszögek csak egybevágóak lehetnek.',
          'Csak akkor igaz, ha az egyik háromszög a másik belsejében van.'
        ],
        correctAnswer: 0,
        hint: 'Mekkora minden szabályos háromszög belső szöge?',
        explanation: 'Minden szabályos háromszög minden belső szöge 180° / 3 = 60°. Mivel szögeik páronként megegyeznek, a sz-sz alapeset alapján bármely két szabályos háromszög hasonló egymáshoz, méretüktől függetlenül.',
        breakdown: [
          { label: 'Szabályos háromszög szögei', value: '60°, 60°, 60°' },
          { label: 'Kritérium', value: 'sz-sz alapeset mindig teljesül' }
        ]
      },
      {
        id: 'sim-q8',
        level: 1,
        question: 'Miért hasonló egymáshoz a síkban bármely két kör?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small circle */}
            <circle cx="50" cy="40" r="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <circle cx="50" cy="40" r="2" fill="#2563eb" />
            <line x1="50" y1="40" x2="72" y2="40" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="60" y="36" textAnchor="middle" className="text-[8px] font-black fill-blue-700">r</text>
            {/* Formula */}
            <text x="115" y="44" textAnchor="middle" className="text-[10px] font-black fill-indigo-600 dark:fill-indigo-400">k = R / r</text>
            {/* Large circle */}
            <circle cx="180" cy="40" r="34" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.2" />
            <circle cx="180" cy="40" r="2" fill="#2563eb" />
            <line x1="180" y1="40" x2="214" y2="40" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="196" y="36" textAnchor="middle" className="text-[9px] font-black fill-blue-700">R = k·r</text>
          </svg>
        ),
        options: [
          'Mert a kör alakját egyetlen méret, a sugár (r) határozza meg, így a sugarak aránya (k = R/r) egyenletesen skálázza a teljes alakzatot.',
          'Mert a körök kerülete mindig pontosan 100 cm.',
          'Mert minden körnek van átmérője.',
          'A körök valójában nem hasonlók, csak a sokszögek.'
        ],
        correctAnswer: 0,
        hint: 'A kör geometriai formája független a méretétől.',
        explanation: 'A körök alakja tökéletesen azonos: a középponttól azonos távolságra lévő pontok összessége. Két kör között a hasonlóság aránya egyszerűen a sugaraik hányadosa: k = R / r.',
        breakdown: [
          { label: 'Alakzat', value: 'Kör' },
          { label: 'Hasonlósági arány', value: 'k = R / r' }
        ]
      },
      {
        id: 'sim-q9',
        level: 1,
        question: 'Ha egy síkidom minden oldalát k = 4 arányban felnagyítjuk, hányszorosára nő a síkidom kerülete (K)?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small polygon */}
            <polygon points="30,55 55,55 60,35 40,25 25,35" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.8" />
            <text x="42" y="44" textAnchor="middle" className="text-[8px] font-black fill-red-800">K</text>
            <text x="42" y="68" textAnchor="middle" className="text-[8px] font-bold fill-red-600">Kerület: K</text>
            {/* Arrow */}
            <path d="M 80 40 L 110 40 M 105 35 L 112 40 L 105 45" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="95" y="30" textAnchor="middle" className="text-[9px] font-black fill-red-600">k = 4</text>
            {/* Large polygon */}
            <polygon points="140,65 210,65 220,25 170,10 130,25" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.2" />
            <text x="175" y="42" textAnchor="middle" className="text-[11px] font-black fill-red-900">K' = 4 · K</text>
            <text x="175" y="76" textAnchor="middle" className="text-[8px] font-black fill-red-600">Lineáris: K' / K = k</text>
          </svg>
        ),
        options: [
          'Pontosan 4-szeresére (K\' = 4 · K)',
          '16-szorosára (4²)',
          '2-szeresére (√4)',
          '64-szeresére (4³)'
        ],
        correctAnswer: 0,
        hint: 'A kerület oldalhosszak összege: K = a + b + c. Ha minden tag 4-szeres, az összeg is 4-szeres.',
        explanation: 'A kerület az oldalak összege (lineáris mérték). K\' = k·a + k·b + k·c = k·(a + b + c) = k·K. Ezért a kerületek aránya pontosan megegyezik a hasonlóság arányával: K\'/K = k = 4.',
        breakdown: [
          { label: 'Kerületek aránya', value: 'K\' / K = k' },
          { label: 'k = 4 esetén', value: 'K\' = 4 · K' }
        ]
      },
      {
        id: 'sim-q10',
        level: 1,
        question: 'Egy turistatérkép méretaránya 1 : 50 000. Hány kilométer távolságot jelent a valóságban a térképen mért 4 cm-es szakasz?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Map box */}
            <rect x="20" y="20" width="70" height="42" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <line x1="28" y1="42" x2="68" y2="42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="42" r="3" fill="#ef4444" />
            <circle cx="68" cy="42" r="3" fill="#ef4444" />
            <text x="48" y="36" textAnchor="middle" className="text-[8px] font-black fill-red-600">4 cm</text>
            <text x="55" y="56" textAnchor="middle" className="text-[7px] font-bold fill-slate-500">Térkép 1:50 000</text>
            {/* Conversion arrow */}
            <path d="M 100 41 L 130 41 M 125 36 L 132 41 L 125 46" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="115" y="32" textAnchor="middle" className="text-[8px] font-black fill-sky-600">× 50 000</text>
            {/* Real world */}
            <rect x="140" y="20" width="95" height="42" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            <text x="187" y="37" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">200 000 cm = 2000 m</text>
            <text x="187" y="52" textAnchor="middle" className="text-[10px] font-black fill-emerald-700">= 2 km (valóság)</text>
          </svg>
        ),
        options: [
          '2 km',
          '20 km',
          '0.2 km',
          '200 m'
        ],
        correctAnswer: 0,
        hint: '1 cm a térképen = 50 000 cm = 500 m. Mennyi 4 cm?',
        explanation: 'A valóságos távolság: 4 cm · 50 000 = 200 000 cm. Átváltva méterbe: 200 000 / 100 = 2000 m. Átváltva kilométerbe: 2000 m = 2 km.',
        breakdown: [
          { label: 'Számolás cm-ben', value: '4 · 50 000 = 200 000 cm' },
          { label: 'Átváltás km-be', value: '200 000 cm = 2000 m = 2 km' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Területek Aránya és Hasonlósági Számítások',
    subtitle: 'Négyzetes területarány, alapesetek alkalmazása, árnyékmódszer és középvonal',
    range: '11-20. kérdés',
    focus: 'T\'/T = k², o-sz-o és d-o-o alapesetek, magasságmérés, középvonal',
    questions: [
      {
        id: 'sim-q11',
        level: 2,
        question: 'Két hasonló sokszög hasonlósági aránya k = 4. Hányszorosa a nagyobbik sokszög területe a kisebbik területének?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small square */}
            <rect x="25" y="35" width="20" height="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="35" y="48" textAnchor="middle" className="text-[8px] font-black fill-purple-900">T</text>
            <text x="35" y="68" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">k = 1</text>
            {/* Arrow */}
            <path d="M 65 45 L 95 45 M 90 40 L 97 45 L 90 50" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="80" y="36" textAnchor="middle" className="text-[8px] font-black fill-purple-700">k = 4</text>
            {/* 4x4 grid */}
            <g transform="translate(115, 12)">
              <rect x="0" y="0" width="60" height="60" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
              <line x1="15" y1="0" x2="15" y2="60" stroke="#a78bfa" strokeWidth="1" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#a78bfa" strokeWidth="1" />
              <line x1="45" y1="0" x2="45" y2="60" stroke="#a78bfa" strokeWidth="1" />
              <line x1="0" y1="15" x2="60" y2="15" stroke="#a78bfa" strokeWidth="1" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="#a78bfa" strokeWidth="1" />
              <line x1="0" y1="45" x2="60" y2="45" stroke="#a78bfa" strokeWidth="1" />
              <text x="30" y="34" textAnchor="middle" className="text-[10px] font-black fill-purple-950">16 db T</text>
            </g>
            <text x="208" y="45" className="text-[9px] font-black fill-purple-700">T' = 4²·T</text>
            <text x="208" y="58" className="text-[8px] font-bold fill-purple-600">= 16 · T</text>
          </svg>
        ),
        options: [
          '16-szorosa (k² = 4² = 16)',
          '4-szerese',
          '8-szorosa',
          '64-szerese'
        ],
        correctAnswer: 0,
        hint: 'Hasonló síkidomok területe a hasonlósági arány négyzetével arányos!',
        explanation: 'Hasonló síkidomok esetén a területek aránya a hasonlósági arány négyzete: T\' / T = k². Ha k = 4, akkor T\' / T = 4² = 16, tehát a terület 16-szorosára nő.',
        breakdown: [
          { label: 'Képlet', value: 'T\' / T = k²' },
          { label: 'Behelyettesítés', value: '4² = 16-szoros' }
        ]
      },
      {
        id: 'sim-q12',
        level: 2,
        question: 'Két hasonló háromszög területe 25 cm² és 100 cm². Mekkora a kerületeik aránya (K\' / K)?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle: 25 cm2 */}
            <polygon points="25,62 70,62 50,26" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="48" y="50" textAnchor="middle" className="text-[8px] font-black fill-emerald-800">T = 25 cm²</text>
            {/* Arrow with k2 -> k */}
            <path d="M 85 44 L 120 44 M 115 39 L 122 44 L 115 49" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="103" y="32" textAnchor="middle" className="text-[8px] font-black fill-emerald-700">k² = 100/25 = 4</text>
            <text x="103" y="58" textAnchor="middle" className="text-[8px] font-black fill-emerald-600">k = √4 = 2</text>
            {/* Big triangle: 100 cm2 */}
            <polygon points="140,66 225,66 187,8" fill="#ecfdf5" stroke="#059669" strokeWidth="2.2" />
            <text x="184" y="44" textAnchor="middle" className="text-[9px] font-black fill-emerald-900">T' = 100 cm²</text>
            <text x="184" y="76" textAnchor="middle" className="text-[8px] font-black fill-emerald-700">K'/K = k = 2</text>
          </svg>
        ),
        options: [
          '2 (mert k = √(100/25) = √4 = 2)',
          '4',
          '16',
          '1.41'
        ],
        correctAnswer: 0,
        hint: 'Először számold ki a területek arányából k² értékét, majd vonj négyzetgyököt!',
        explanation: 'A területek aránya: k² = T\' / T = 100 / 25 = 4. Ebből a hasonlósági arány: k = √4 = 2. Mivel a kerületek aránya K\' / K = k, a kerületek aránya pontosan 2.',
        breakdown: [
          { label: 'Területek aránya', value: 'k² = 100 / 25 = 4' },
          { label: 'Hasonlósági arány k', value: 'k = √4 = 2' },
          { label: 'Kerületek aránya', value: 'K\' / K = k = 2' }
        ]
      },
      {
        id: 'sim-q13',
        level: 2,
        question: 'Egy derékszögű háromszög egyik hegyesszöge 35°. Egy másik derékszögű háromszög egyik hegyesszöge 55°. Hasonló-e egymáshoz a két háromszög?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Right triangle 1 */}
            <polygon points="25,62 80,62 25,24" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <rect x="25" y="54" width="8" height="8" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="65" y="58" className="text-[7px] font-bold fill-blue-900">35°</text>
            <text x="32" y="36" className="text-[7px] font-bold fill-blue-700">55°</text>
            <text x="50" y="74" textAnchor="middle" className="text-[7px] font-bold fill-slate-500">90° - 35° = 55°</text>
            {/* Sim sign */}
            <text x="110" y="44" textAnchor="middle" className="text-[14px] font-black fill-blue-600">~</text>
            <text x="110" y="30" textAnchor="middle" className="text-[8px] font-black fill-blue-600">sz-sz</text>
            {/* Right triangle 2 */}
            <polygon points="145,64 225,64 145,10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <rect x="145" y="54" width="10" height="10" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="200" y="60" className="text-[8px] font-bold fill-blue-700">35°</text>
            <text x="154" y="26" className="text-[8px] font-bold fill-blue-900">55°</text>
            <text x="185" y="76" textAnchor="middle" className="text-[7px] font-bold fill-slate-500">90° - 55° = 35°</text>
          </svg>
        ),
        options: [
          'Igen, mert a derékszögű háromszögben 90° - 35° = 55°, így mindkét háromszög szögei 90°, 35° és 55° (sz-sz alapeset).',
          'Nem, mert a megadott hegyesszögek (35° és 55°) nem egyeznek meg.',
          'Csak akkor, ha az átfogóik hossza megegyezik.',
          'Nem dönthető el az oldalak ismerete nélkül.'
        ],
        correctAnswer: 0,
        hint: 'Számold ki mindkét háromszög hiányzó harmadik belső szögét!',
        explanation: 'Az első háromszög hegyesszögei: 35° és 90° - 35° = 55°. A második háromszög hegyesszögei: 55° és 90° - 55° = 35°. Mindkét háromszög belső szögei: 35°, 55°, 90°. A sz-sz alapeset alapján a két háromszög hasonló.',
        breakdown: [
          { label: '1. háromszög szögei', value: '35°, 55°, 90°' },
          { label: '2. háromszög szögei', value: '55°, 35°, 90°' },
          { label: 'Megállapítás', value: 'Hasonlóak (sz-sz alapeset)' }
        ]
      },
      {
        id: 'sim-q14',
        level: 2,
        question: 'Egy háromszög két oldala a = 6 cm és b = 10 cm, közbezárt szögük 50°. Egy másik háromszög két oldala a\' = 9 cm és b\' = 15 cm, közbezárt szögük 50°. Hasonló-e a két háromszög?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Triangle 1: a=6, b=10, 50 deg */}
            <polygon points="25,62 85,62 50,25" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.8" />
            <path d="M 39 62 A 14 14 0 0 0 35 50" fill="none" stroke="#db2777" strokeWidth="1.5" />
            <text x="42" y="58" className="text-[7px] font-black fill-pink-900">50°</text>
            <text x="55" y="72" textAnchor="middle" className="text-[8px] font-black fill-pink-800">b = 10</text>
            <text x="28" y="40" textAnchor="middle" className="text-[8px] font-black fill-pink-800">a = 6</text>
            {/* o-sz-o badge */}
            <text x="110" y="42" textAnchor="middle" className="text-[12px] font-black fill-pink-600">~</text>
            <text x="110" y="28" textAnchor="middle" className="text-[8px] font-black fill-pink-600">o-sz-o</text>
            <text x="110" y="54" textAnchor="middle" className="text-[7px] font-bold fill-slate-500">k = 1.5</text>
            {/* Triangle 2: a'=9, b'=15, 50 deg */}
            <polygon points="140,66 230,66 177,10" fill="#fdf2f8" stroke="#db2777" strokeWidth="2.2" />
            <path d="M 161 66 A 21 21 0 0 0 155 49" fill="none" stroke="#db2777" strokeWidth="2" />
            <text x="166" y="61" className="text-[8px] font-black fill-pink-900">50°</text>
            <text x="185" y="77" textAnchor="middle" className="text-[9px] font-black fill-pink-800">b' = 15 (10·1.5)</text>
            <text x="145" y="32" textAnchor="middle" className="text-[9px] font-black fill-pink-800">a' = 9 (6·1.5)</text>
          </svg>
        ),
        options: [
          'Igen, mert az oldalak aránya 9/6 = 15/10 = 1.5, és a közbezárt szögük egyenlő (o-sz-o alapeset).',
          'Nem, mert a harmadik oldalt nem ismerjük.',
          'Nem, mert az oldalak különbsége nem egyenlő.',
          'Csak akkor hasonlóak, ha derékszögűek.'
        ],
        correctAnswer: 0,
        hint: 'Ellenőrizd az oldalak arányát és a közbezárt szög egyezését (o-sz-o)!',
        explanation: 'Az oldalak aránya: a\' / a = 9 / 6 = 1.5, és b\' / b = 15 / 10 = 1.5. Mivel a két-két oldal aránya megegyezik (k = 1.5) és a közbezárt szög mindkettőben 50°, az o-sz-o alapeset szerint a két háromszög hasonló.',
        breakdown: [
          { label: 'Oldalak aránya', value: '9/6 = 15/10 = 1.5 (k = 1.5)' },
          { label: 'Közbezárt szög', value: 'γ\' = γ = 50°' },
          { label: 'Alapeset', value: 'o-sz-o teljesül' }
        ]
      },
      {
        id: 'sim-q15',
        level: 2,
        question: 'Egy napsütéses délutánon egy függőlegesen felállított 1.5 m hosszú bot árnyéka 2 m. Ugyanekkor egy közeli fa árnyéka 12 m hosszú. Milyen magas a fa?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Sun */}
            <circle cx="25" cy="18" r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="25" y1="4" x2="25" y2="0" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="8" y2="8" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="38" y1="12" x2="42" y2="8" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Stick & shadow */}
            <line x1="65" y1="65" x2="65" y2="43" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="65" x2="95" y2="65" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="65" y1="43" x2="95" y2="65" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="56" y="54" textAnchor="middle" className="text-[7px] font-bold fill-amber-900">1.5 m</text>
            <text x="80" y="74" textAnchor="middle" className="text-[7px] font-bold fill-slate-600">2 m</text>
            {/* Tree & shadow */}
            <rect x="135" y="45" width="8" height="20" fill="#78350f" />
            <polygon points="120,48 158,48 139,12" fill="#15803d" />
            <line x1="139" y1="65" x2="225" y2="65" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <line x1="139" y1="12" x2="225" y2="65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="122" y="32" textAnchor="middle" className="text-[9px] font-black fill-emerald-800">M = ? (9 m)</text>
            <text x="180" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">12 m árnyék (6×)</text>
          </svg>
        ),
        options: [
          '9 m (k = 12 / 2 = 6, M = 6 · 1.5 = 9 m)',
          '8 m',
          '16 m',
          '10.5 m'
        ],
        correctAnswer: 0,
        hint: 'A bot és a fa árnyékháromszögei hasonlók. Magasság / Árnyék = állandó!',
        explanation: 'A napsugarak párhuzamossága miatt a derékszögű árnyékháromszögek hasonlók. Az árnyékok aránya: k = 12 m / 2 m = 6. A fa magassága a bot magasságának 6-szorosa: M = 6 · 1.5 m = 9 m.',
        breakdown: [
          { label: 'Hasonlósági arány', value: 'k = 12 / 2 = 6' },
          { label: 'Fa magassága', value: 'M = 6 · 1.5 m = 9 m' }
        ]
      },
      {
        id: 'sim-q16',
        level: 2,
        question: 'Egy háromszög területe 48 cm². A háromszög oldalfelező pontjait összekötve behúzzuk a három középvonalat. Mekkora a középvonalak által határolt belső kis háromszög területe?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="35,68 215,68 125,12" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
            {/* 3 Midlines */}
            <line x1="80" y1="40" x2="170" y2="40" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="80" y1="40" x2="125" y2="68" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="170" y1="40" x2="125" y2="68" stroke="#0284c7" strokeWidth="1.8" />
            {/* Center triangle shaded */}
            <polygon points="80,40 170,40 125,68" fill="#bae6fd" opacity="0.8" />
            <text x="125" y="52" textAnchor="middle" className="text-[8px] font-black fill-sky-950">12 cm²</text>
            <text x="125" y="32" textAnchor="middle" className="text-[7px] font-bold fill-sky-800">12 cm²</text>
            <text x="65" y="60" textAnchor="middle" className="text-[7px] font-bold fill-sky-800">12 cm²</text>
            <text x="185" y="60" textAnchor="middle" className="text-[7px] font-bold fill-sky-800">12 cm²</text>
            <text x="125" y="80" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300">T_összes = 48 cm² ⟹ T_belső = 48 / 4 = 12 cm²</text>
          </svg>
        ),
        options: [
          '12 cm² (a terület negyede: 48 / 4 = 12 cm²)',
          '24 cm² (a fele)',
          '16 cm² (a harmada)',
          '6 cm²'
        ],
        correctAnswer: 0,
        hint: 'A középvonalak hossza az oldalak fele (k = 1/2). Mekkora k²?',
        explanation: 'A háromszög középvonalai k = 1/2 arányú hasonló háromszöget határoznak meg. A terület a hasonlósági arány négyzetével változik: k² = (1/2)² = 1/4. Tehát T\' = 48 cm² / 4 = 12 cm².',
        breakdown: [
          { label: 'Hasonlósági arány', value: 'k = 1/2' },
          { label: 'Területarány', value: 'k² = 1/4' },
          { label: 'Kis háromszög területe', value: '48 / 4 = 12 cm²' }
        ]
      },
      {
        id: 'sim-q17',
        level: 2,
        question: 'Két hasonló háromszögben a = 5 cm, b = 7 cm, a nagyobbik megfelelő oldala a\' = 15 cm. Mekkora a b\' oldal hossza?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle: a=5, b=7 */}
            <polygon points="25,62 75,62 45,25" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
            <text x="25" y="42" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">a = 5</text>
            <text x="65" y="42" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">b = 7</text>
            {/* Scale arrow */}
            <path d="M 88 44 L 115 44 M 110 39 L 117 44 L 110 49" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="102" y="34" textAnchor="middle" className="text-[8px] font-black fill-emerald-700">k = 15/5 = 3</text>
            {/* Large triangle: a'=15, b'=21 */}
            <polygon points="135,66 230,66 175,10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.2" />
            <text x="142" y="35" textAnchor="middle" className="text-[9px] font-black fill-emerald-900">a' = 15</text>
            <text x="215" y="35" textAnchor="middle" className="text-[9px] font-black fill-emerald-900">b' = 3 · 7 = 21</text>
            <text x="182" y="77" textAnchor="middle" className="text-[8px] font-black fill-emerald-700">b' = k · b</text>
          </svg>
        ),
        options: [
          '21 cm',
          '14 cm',
          '17 cm',
          '35 cm'
        ],
        correctAnswer: 0,
        hint: 'Számítsd ki a hasonlósági arányt: k = a\' / a, majd b\' = k · b.',
        explanation: 'A megfelelő oldalak aránya: k = a\' / a = 15 / 5 = 3. Ebből a b oldal párja: b\' = k · b = 3 · 7 cm = 21 cm.',
        breakdown: [
          { label: 'Hasonlósági arány', value: 'k = 15 / 5 = 3' },
          { label: 'b\' oldal hossza', value: '3 · 7 = 21 cm' }
        ]
      },
      {
        id: 'sim-q18',
        level: 2,
        question: 'Egy háromszög minden oldalát a 3-szorosára növeljük (k = 3). Hányszorosára nő a háromszög területe és kerülete?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle */}
            <polygon points="25,62 65,62 45,28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
            <text x="45" y="52" textAnchor="middle" className="text-[8px] font-black fill-amber-900">T, K</text>
            {/* Arrow */}
            <path d="M 75 45 L 105 45 M 100 40 L 107 45 L 100 50" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="90" y="36" textAnchor="middle" className="text-[8px] font-black fill-amber-700">k = 3</text>
            {/* 3x3 big triangle subdivided into 9 */}
            <g transform="translate(120, 10)">
              <polygon points="0,55 90,55 45,0" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <line x1="15" y1="36.6" x2="75" y2="36.6" stroke="#d97706" strokeWidth="1" />
              <line x1="30" y1="18.3" x2="60" y2="18.3" stroke="#d97706" strokeWidth="1" />
              <line x1="30" y1="55" x2="60" y2="18.3" stroke="#d97706" strokeWidth="1" />
              <line x1="60" y1="55" x2="30" y2="18.3" stroke="#d97706" strokeWidth="1" />
              <line x1="15" y1="36.6" x2="45" y2="55" stroke="#d97706" strokeWidth="1" />
              <line x1="75" y1="36.6" x2="45" y2="55" stroke="#d97706" strokeWidth="1" />
            </g>
            <text x="218" y="38" className="text-[9px] font-black fill-amber-800">K' = 3 · K</text>
            <text x="218" y="52" className="text-[9px] font-black fill-amber-900">T' = 9 · T (3²)</text>
          </svg>
        ),
        options: [
          'A kerülete 3-szorosára, a területe 9-szeresére (3² = 9).',
          'Mindkettő 3-szorosára nő.',
          'Mindkettő 9-szeresére nő.',
          'A kerülete 9-szeresére, a területe 27-szeresére nő.'
        ],
        correctAnswer: 0,
        hint: 'Kerület ~ k (lineáris), Terület ~ k² (másodfokú).',
        explanation: 'A kerület elsőfokú (hosszúság jellegű) mérték, így k = 3-szorosára nő. A terület másodfokú (felület) mérték, így k² = 3² = 9-szeresére nő.',
        breakdown: [
          { label: 'Kerület növekedése', value: 'k = 3-szoros' },
          { label: 'Terület növekedése', value: 'k² = 9-szeres' }
        ]
      },
      {
        id: 'sim-q19',
        level: 2,
        question: 'Miért hibás az az érvelés, hogy „két háromszög hasonló, mert két oldaluk aránya megegyezik, és egy szögük egyenlő” anélkül, hogy tisztáznánk a szög helyzetét?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Ray and fixed side b */}
            <line x1="20" y1="65" x2="220" y2="65" stroke="#64748b" strokeWidth="1.5" />
            <line x1="30" y1="65" x2="110" y2="20" stroke="#0284c7" strokeWidth="2.5" />
            <text x="60" y="36" textAnchor="middle" className="text-[9px] font-black fill-sky-800">b</text>
            <text x="45" y="61" className="text-[8px] font-black fill-sky-900">α</text>
            {/* Circle arc from C */}
            <path d="M 125 50 A 42 42 0 0 1 175 68" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Two intersection points B1 and B2 */}
            <line x1="110" y1="20" x2="135" y2="65" stroke="#dc2626" strokeWidth="2" />
            <line x1="110" y1="20" x2="168" y2="65" stroke="#dc2626" strokeWidth="2" />
            <circle cx="135" cy="65" r="3" fill="#dc2626" />
            <circle cx="168" cy="65" r="3" fill="#dc2626" />
            <text x="135" y="76" textAnchor="middle" className="text-[8px] font-black fill-red-600">B₁</text>
            <text x="168" y="76" textAnchor="middle" className="text-[8px] font-black fill-red-600">B₂</text>
            <text x="180" y="32" className="text-[8px] font-bold fill-red-700">2 metszéspont (a &lt; b)</text>
            <text x="180" y="44" className="text-[7px] font-bold fill-slate-500">Nem egyértelmű!</text>
          </svg>
        ),
        options: [
          'Mert ha az adott szög nem a közbezárt szög, és nem a nagyobbik oldallal szemközti szög, akkor két teljesen különböző háromszög is szerkeszthető az adatokból.',
          'Mert háromszögeknél csak a 3 oldal aránya számít.',
          'Mert egy szög egyezése sosem elég a hasonlósághoz.',
          'Mert a szögek összege változhat.'
        ],
        correctAnswer: 0,
        hint: 'A d-o-o alapesetnél a szögnek szigorúan a NAGYOBBIK oldallal kell szemben lennie!',
        explanation: 'Ha a megadott szög a kisebbik oldallal szemben van, a szerkesztés során a körív két metszéspontot adhat a harmadik oldalon (két nem egybevágó háromszög létezik). Ezért a hasonlósághoz a szögnek a nagyobbik oldallal kell szemben állnia (d-o-o).',
        breakdown: [
          { label: 'Hiba oka', value: 'Kétértelmű háromszögszerkesztés' },
          { label: 'Feltétel', value: 'Szög a közbezárt (o-sz-o) VAGY a nagyobbikkal szemközti (d-o-o)' }
        ]
      },
      {
        id: 'sim-q20',
        level: 2,
        question: 'Egy tó valóságos területe 4 km². Egy 1 : 100 000 méretarányú térképen mekkora területű foltként jelenik meg a tó?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Map patch */}
            <rect x="25" y="22" width="40" height="40" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="45" y="38" textAnchor="middle" className="text-[9px] font-black fill-blue-900">4 cm²</text>
            <text x="45" y="52" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">(2 cm × 2 cm)</text>
            <text x="45" y="74" textAnchor="middle" className="text-[8px] font-bold fill-slate-500">Térképen</text>
            {/* Arrow */}
            <path d="M 75 42 L 115 42 M 110 37 L 117 42 L 110 47" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="95" y="32" textAnchor="middle" className="text-[8px] font-black fill-sky-600">1:100 000</text>
            <text x="95" y="56" textAnchor="middle" className="text-[7px] font-bold fill-slate-500">1 cm = 1 km</text>
            {/* Terrain patch */}
            <rect x="135" y="16" width="90" height="48" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="180" y="36" textAnchor="middle" className="text-[10px] font-black fill-emerald-900">4 km²</text>
            <text x="180" y="50" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">(2 km × 2 km)</text>
            <text x="180" y="74" textAnchor="middle" className="text-[8px] font-bold fill-slate-500">Valóságban</text>
          </svg>
        ),
        options: [
          '4 cm² (mert 1 cm a térképen = 1 km a valóságban, így 1 cm² = 1 km²)',
          '40 cm²',
          '0.4 cm²',
          '0.04 cm²'
        ],
        correctAnswer: 0,
        hint: '1 : 100 000 esetén 1 cm a térképen = 100 000 cm = 1 km a valóságban.',
        explanation: 'Az 1 : 100 000 méretarány szerint 1 cm = 100 000 cm = 1000 m = 1 km. Ebből a területi arány: 1 cm² a térképen = (1 km)² = 1 km² a valóságban. Ezért a 4 km²-es tónak pontosan 4 cm² felel meg a térképen.',
        breakdown: [
          { label: 'Lineáris arány', value: '1 cm = 1 km' },
          { label: 'Területi arány', value: '1 cm² = 1 km²' },
          { label: 'Térképi terület', value: '4 km² ➔ 4 cm²' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometriai Hasonlósági Feladatok',
    subtitle: 'Trapéz átlói, magasságtétel, térfogatarányok és összetett arányszámítások',
    range: '21-30. kérdés',
    focus: 'Összetett területi arányok, párhuzamos szelők, tértestek, Euler- és transzitivitás',
    questions: [
      {
        id: 'sim-q21',
        level: 3,
        question: 'Két hasonló háromszög területe 18 cm² és 50 cm². A kisebbik háromszög egyik oldala 6 cm. Mekkora a nagyobbik háromszög megfelelő oldala?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Triangle 1: 18 cm2, side 6 */}
            <polygon points="20,64 70,64 50,26" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.8" />
            <text x="45" y="50" textAnchor="middle" className="text-[8px] font-black fill-blue-900">T₁ = 18 cm²</text>
            <text x="45" y="74" textAnchor="middle" className="text-[8px] font-black fill-blue-700">a = 6 cm</text>
            {/* Arrow */}
            <path d="M 85 45 L 115 45 M 110 40 L 117 45 L 110 50" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="100" y="33" textAnchor="middle" className="text-[8px] font-black fill-indigo-600">k² = 50/18</text>
            <text x="100" y="58" textAnchor="middle" className="text-[8px] font-black fill-indigo-700">k = 5/3</text>
            {/* Triangle 2: 50 cm2, side a' = 10 */}
            <polygon points="135,66 220,66 187,8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.2" />
            <text x="182" y="44" textAnchor="middle" className="text-[9px] font-black fill-blue-900">T₂ = 50 cm²</text>
            <text x="182" y="77" textAnchor="middle" className="text-[9px] font-black fill-blue-800">a' = 6 · (5/3) = 10 cm</text>
          </svg>
        ),
        options: [
          '10 cm (k² = 50/18 = 25/9 ➔ k = 5/3, a\' = 6 · 5/3 = 10 cm)',
          '16.6 cm',
          '12 cm',
          '8.3 cm'
        ],
        correctAnswer: 0,
        hint: 'Egyszerűsítsd a területek arányát: 50 / 18 = 25 / 9, majd vonj gyököt!',
        explanation: 'A területek aránya: k² = 50 / 18 = 25 / 9. Ebből a hasonlósági arány: k = √(25 / 9) = 5 / 3. A nagyobbik oldal hossza: a\' = 6 cm · (5 / 3) = 10 cm.',
        breakdown: [
          { label: 'Területarány', value: 'k² = 50 / 18 = 25 / 9' },
          { label: 'Hasonlósági arány', value: 'k = √(25/9) = 5/3' },
          { label: 'Keresett oldal', value: '6 · (5/3) = 10 cm' }
        ]
      },
      {
        id: 'sim-q22',
        level: 3,
        question: 'Egy háromszög c alapjával párhuzamos egyenessel elmetsszük a szárakat úgy, hogy a levágott kis háromszög szára az eredeti szár 1/3 része legyen (k = 1/3). Hányadrésze a levágott kis háromszög területe az eredeti nagy háromszög területének?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Main triangle */}
            <polygon points="35,68 195,68 115,10" fill="#f8fafc" stroke="#475569" strokeWidth="1.8" />
            {/* Parallel line at 1/3 from top */}
            <polygon points="88,29 142,29 115,10" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <line x1="88" y1="29" x2="142" y2="29" stroke="#2563eb" strokeWidth="2" />
            {/* Trapezoid below */}
            <polygon points="35,68 195,68 142,29 88,29" fill="#f1f5f9" stroke="#475569" strokeWidth="1.8" />
            <text x="115" y="24" textAnchor="middle" className="text-[8px] font-black fill-blue-900">T' = 1/9 · T</text>
            <text x="115" y="52" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">8/9 · T (trapéz)</text>
            <text x="210" y="25" className="text-[8px] font-black fill-blue-700">k = 1/3</text>
            <text x="210" y="38" className="text-[8px] font-bold fill-blue-900">k² = 1/9</text>
          </svg>
        ),
        options: [
          '1/9 része (k² = (1/3)² = 1/9)',
          '1/3 része',
          '1/6 része',
          '2/3 része'
        ],
        correctAnswer: 0,
        hint: 'A területek aránya a hasonlóság négyzete: (1/3)²',
        explanation: 'Mivel a levágott háromszög minden oldala az eredeti 1/3 része (k = 1/3), a területe a hasonlósági arány négyzetével egyenlő arányban csökken: T\' / T = (1/3)² = 1/9.',
        breakdown: [
          { label: 'Hasonlóság', value: 'k = 1/3' },
          { label: 'Területarány', value: 'k² = (1/3)² = 1/9' }
        ]
      },
      {
        id: 'sim-q23',
        level: 3,
        question: 'Egy trapéz párhuzamos alapjai a = 12 cm és c = 4 cm. Az átlók metszéspontja az alapokon fekvő két hasonló háromszöget határoz meg. Hányszorosa a hosszabbik alapon fekvő háromszög területe a rövidebb alapon fekvő háromszög területének?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Top base c=4, Bottom base a=12 */}
            <polygon points="95,18 130,18 112.5,36" fill="#fef3c7" />
            <polygon points="60,65 165,65 112.5,36" fill="#dbeafe" />
            <line x1="95" y1="18" x2="130" y2="18" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="65" x2="165" y2="65" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="65" x2="130" y2="18" stroke="#64748b" strokeWidth="1.5" />
            <line x1="165" y1="65" x2="95" y2="18" stroke="#64748b" strokeWidth="1.5" />
            <line x1="60" y1="65" x2="95" y2="18" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="165" y1="65" x2="130" y2="18" stroke="#94a3b8" strokeWidth="1.2" />
            <text x="112.5" y="13" textAnchor="middle" className="text-[8px] font-black fill-amber-800">c = 4 cm (T₂)</text>
            <text x="112.5" y="77" textAnchor="middle" className="text-[9px] font-black fill-blue-800">a = 12 cm (T₁)</text>
            <text x="195" y="38" className="text-[8px] font-black fill-indigo-700">k = 12/4 = 3</text>
            <text x="195" y="52" className="text-[9px] font-black fill-indigo-900">T₁ / T₂ = 3² = 9</text>
          </svg>
        ),
        options: [
          '9-szerese (k = 12 / 4 = 3, T₁ / T₂ = 3² = 9)',
          '3-szorosa',
          '6-szorosa',
          '16-szorosa'
        ],
        correctAnswer: 0,
        hint: 'A két háromszög csúcsszögei és váltószögei egyenlők (sz-sz). Oldalarány: 12 / 4 = 3.',
        explanation: 'A trapéz átlói által az alapokon létrehozott két háromszög hasonló (sz-sz: a váltószögek egyenlők a párhuzamosság miatt). A hasonlóság aránya k = a / c = 12 / 4 = 3. A területek aránya k² = 3² = 9.',
        breakdown: [
          { label: 'Alapok aránya', value: 'k = 12 / 4 = 3' },
          { label: 'Területek aránya', value: 'k² = 3² = 9' }
        ]
      },
      {
        id: 'sim-q24',
        level: 3,
        question: 'Egy derékszögű háromszög átfogójához tartozó magassága két kisebb háromszögre osztja az eredetit. Miért hasonló mindkét kis háromszög az eredeti háromszöghöz?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="25,65 205,65 80,20" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            <line x1="80" y1="20" x2="80" y2="65" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
            <rect x="80" y="57" width="8" height="8" fill="none" stroke="#dc2626" strokeWidth="1.2" />
            <text x="74" y="44" textAnchor="end" className="text-[8px] font-black fill-red-600">m</text>
            <text x="40" y="60" className="text-[8px] font-black fill-blue-700">α</text>
            <text x="180" y="60" className="text-[8px] font-black fill-emerald-700">β</text>
            <text x="86" y="32" className="text-[7px] font-black fill-blue-700">α</text>
            <text x="70" y="32" className="text-[7px] font-black fill-emerald-700">β</text>
            <text x="115" y="78" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300">α + β = 90° ⟹ mindhárom háromszög hasonló (sz-sz)</text>
          </svg>
        ),
        options: [
          'Mert mindkét kis háromszög derékszögű, és van egy-egy közös hegyesszögük az eredeti háromszöggel (sz-sz alapeset).',
          'Mert a területük pontosan fele az eredetinek.',
          'Mert a magasságvonal felezi az átfogót.',
          'Csak egyenlő szárú derékszögű háromszög esetén hasonlóak.'
        ],
        correctAnswer: 0,
        hint: 'A magasság merőleges (90°), és a kis háromszögek osztoznak a nagy háromszög hegyesszögein.',
        explanation: 'A magasság talppontjánál derékszög keletkezik. Az egyik kis háromszög belső szögei 90°, α és 90°-α; a másiké 90°, β és 90°-β. Mivel α + β = 90°, mindkét kis háromszög szögei megegyeznek a nagy háromszög szögeivel (sz-sz). Ebből vezethető le a befogó- és magasságtétel!',
        breakdown: [
          { label: 'Közös szögek', value: '90° és α (ill. β)' },
          { label: 'Alapeset', value: 'sz-sz' },
          { label: 'Következmény', value: 'Befogótétel és Magasságtétel' }
        ]
      },
      {
        id: 'sim-q25',
        level: 3,
        question: 'Egy cukrászdában egy 3 cm sugarú gömb alakú fagylaltgolyó ára 400 Ft. Egy óriási, 6 cm sugarú fagylaltgömb készítéséhez hányszor annyi fagylalt alapanyag szükséges?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <defs>
              <radialGradient id="sphereGrad1" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="70%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <radialGradient id="sphereGrad2" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="70%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            <circle cx="45" cy="42" r="18" fill="url(#sphereGrad1)" />
            <text x="45" y="46" textAnchor="middle" className="text-[8px] font-black fill-white">r = 3 cm</text>
            <text x="45" y="72" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">V (400 Ft)</text>
            {/* Arrow */}
            <path d="M 80 42 L 115 42 M 110 37 L 117 42 L 110 47" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="98" y="32" textAnchor="middle" className="text-[8px] font-black fill-blue-600">k = 2</text>
            {/* Large sphere */}
            <circle cx="165" cy="42" r="34" fill="url(#sphereGrad2)" />
            <text x="165" y="46" textAnchor="middle" className="text-[10px] font-black fill-white">R = 6 cm</text>
            <text x="215" y="38" className="text-[9px] font-black fill-blue-700">V' = k³ · V</text>
            <text x="215" y="52" className="text-[9px] font-black fill-blue-900">= 2³ = 8× V</text>
          </svg>
        ),
        options: [
          '8-szor annyi (k = 6 / 3 = 2, a térfogatok aránya k³ = 2³ = 8)',
          '2-szer annyi',
          '4-szer annyi (2²)',
          '16-szor annyi'
        ],
        correctAnswer: 0,
        hint: 'A fagylalt mennyisége a térfogattal (V) arányos, a gömbök térfogata a sugaruk köbével arányos!',
        explanation: 'A gömbök hasonlóságának aránya a sugarak hányadosa: k = 6 cm / 3 cm = 2. Tértesteknél a térfogat a hasonlósági arány köbével arányos: V\' / V = k³ = 2³ = 8. Tehát 8-szor annyi fagylalt kell!',
        breakdown: [
          { label: 'Hasonlóság aránya', value: 'k = 6 / 3 = 2' },
          { label: 'Térfogatarány', value: 'k³ = 2³ = 8' }
        ]
      },
      {
        id: 'sim-q26',
        level: 3,
        question: 'Egy háromszög 3 középvonala 4 kisebb háromszögre osztja a síkidomot. Milyen geometriai kapcsolat áll fenn e 4 kis háromszög között?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Outer triangle */}
            <polygon points="35,68 215,68 125,12" fill="none" stroke="#475569" strokeWidth="2" />
            {/* 4 sub-triangles */}
            <polygon points="125,12 80,40 170,40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="35,68 80,40 125,68" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <polygon points="215,68 170,40 125,68" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="80,40 170,40 125,68" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="125" y="30" textAnchor="middle" className="text-[7px] font-bold fill-blue-900">T/4 ≅</text>
            <text x="75" y="60" textAnchor="middle" className="text-[7px] font-bold fill-emerald-900">T/4 ≅</text>
            <text x="175" y="60" textAnchor="middle" className="text-[7px] font-bold fill-amber-900">T/4 ≅</text>
            <text x="125" y="54" textAnchor="middle" className="text-[7px] font-black fill-purple-900">T/4</text>
            <text x="125" y="78" textAnchor="middle" className="text-[8px] font-black fill-slate-700 dark:fill-slate-200">4 egybevágó kis háromszög (k = 1/2 az eredetihez képest)</text>
          </svg>
        ),
        options: [
          'Mind a 4 kis háromszög egybevágó egymással, és mindegyik hasonló az eredeti nagy háromszöghöz k = 1/2 aránnyal.',
          'Csak a középső háromszög szabályos, a szélsők nem hasonlók.',
          'A 4 háromszög területe különböző.',
          'Csak 2 háromszög hasonló az eredetihez.'
        ],
        correctAnswer: 0,
        hint: 'A középvonalak hossza a szemközti oldalak fele (a/2, b/2, c/2).',
        explanation: 'Mind a 4 kis háromszög oldalai a/2, b/2 és c/2 hosszúságúak. Ezért az o-o-o alapeset alapján mind a 4 egybevágó egymással, területeik egyenlők (T/4), és mindegyik hasonló az eredeti háromszöghöz k = 1/2 aránnyal.',
        breakdown: [
          { label: 'Kis háromszögek oldalai', value: 'a/2, b/2, c/2' },
          { label: 'Kapcsolat', value: 'Egymással egybevágók, eredetivel hasonlók (k = 1/2)' },
          { label: 'Területük', value: 'Mindegyik területe T / 4' }
        ]
      },
      {
        id: 'sim-q27',
        level: 3,
        question: 'Hasonló-e egymáshoz bármely két téglalap a síkban?',
        figure: (
          <svg viewBox="0 0 250 80" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Rectangle 1: long & skinny 2x10 */}
            <rect x="20" y="30" width="80" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
            <text x="60" y="24" textAnchor="middle" className="text-[8px] font-bold fill-red-800">10</text>
            <text x="12" y="42" textAnchor="middle" className="text-[8px] font-bold fill-red-800">2</text>
            <text x="60" y="42" textAnchor="middle" className="text-[7px] font-bold fill-red-900">arány: 10/2 = 5</text>
            {/* NOT similar symbol */}
            <text x="125" y="42" textAnchor="middle" className="text-[14px] font-black fill-red-600">≁</text>
            <text x="125" y="26" textAnchor="middle" className="text-[7px] font-bold fill-red-600">Nem hasonló</text>
            {/* Rectangle 2: short & fat 4x5 */}
            <rect x="150" y="20" width="50" height="38" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
            <text x="175" y="15" textAnchor="middle" className="text-[8px] font-bold fill-red-800">5</text>
            <text x="142" y="42" textAnchor="middle" className="text-[8px] font-bold fill-red-800">4</text>
            <text x="175" y="42" textAnchor="middle" className="text-[7px] font-bold fill-red-900">arány: 5/4 = 1.25</text>
            <text x="125" y="70" textAnchor="middle" className="text-[8px] font-black fill-slate-700 dark:fill-slate-300">A szögek mind 90°-osak, de az oldalarányok eltérnek!</text>
          </svg>
        ),
        options: [
          'Nem, mert bár minden szögük 90°, az oldalaik aránya (a / b) nem feltétlenül egyenlő.',
          'Igen, mert minden téglalapnak 4 derékszöge van.',
          'Igen, mert a téglalapok átlói egyenlő hosszúak.',
          'Csak akkor nem, ha az egyik négyzet.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy 2×10-es nagyon vékony téglalapra és egy 5×6-os majdnem négyzet alakúra!',
        explanation: 'Bár a szögeik egyeznek (mind 90°), a hasonlósághoz az oldalak arányának is egyeznie kell (o-sz-o). Egy 2×10-es téglalap aránya 10/2 = 5, míg egy 4×5-ös téglalapé 5/4 = 1.25. Nem hasonlóak!',
        breakdown: [
          { label: 'Szögek', value: 'Mind 90° (szükséges, de nem elégséges)' },
          { label: 'Oldalarány', value: 'a/b = a\'/b\' kellene, ami nem mindig teljesül' }
        ]
      },
      {
        id: 'sim-q28',
        level: 3,
        question: 'Egy háromszög kerülete K = 36 cm, oldalai aránya 2 : 3 : 4. Egy hozzá hasonló háromszög legrövidebb oldala 16 cm. Mekkora a hasonló háromszög kerülete (K\')?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Small triangle: 8, 12, 16, K=36 */}
            <polygon points="20,64 76,64 42,28" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" />
            <text x="24" y="44" textAnchor="middle" className="text-[8px] font-black fill-rose-600">8</text>
            <text x="64" y="44" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">12</text>
            <text x="48" y="74" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">16</text>
            <text x="48" y="52" textAnchor="middle" className="text-[8px] font-black fill-blue-900">K = 36</text>
            {/* Scale arrow */}
            <path d="M 88 44 L 118 44 M 113 39 L 120 44 L 113 49" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="103" y="32" textAnchor="middle" className="text-[8px] font-black fill-blue-600">k = 16/8 = 2</text>
            {/* Large triangle: 16, 24, 32, K'=72 */}
            <polygon points="135,66 235,66 175,10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.2" />
            <text x="145" y="36" textAnchor="middle" className="text-[9px] font-black fill-rose-600">16 cm</text>
            <text x="215" y="36" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">24</text>
            <text x="185" y="77" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">32</text>
            <text x="185" y="46" textAnchor="middle" className="text-[10px] font-black fill-blue-950">K' = 2 · 36 = 72 cm</text>
          </svg>
        ),
        options: [
          '72 cm (az eredeti oldalak: 8, 12, 16 cm; a legkisebb 8 cm ➔ 16 cm miatt k = 2; K\' = 2 · 36 = 72 cm)',
          '54 cm',
          '108 cm',
          '48 cm'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az eredeti háromszög oldalait: 2x + 3x + 4x = 36 cm.',
        explanation: 'Az oldalak aránya: 2x + 3x + 4x = 9x = 36 cm, amiből x = 4 cm. Az eredeti oldalak: a = 8 cm, b = 12 cm, c = 16 cm. A legrövidebb oldal a = 8 cm. Az új háromszögben ez 16 cm, tehát a hasonlósági arány k = 16 / 8 = 2. A kerület K\' = 2 · 36 cm = 72 cm.',
        breakdown: [
          { label: 'Eredeti oldalak', value: '8 cm, 12 cm, 16 cm' },
          { label: 'Hasonlósági arány', value: 'k = 16 / 8 = 2' },
          { label: 'Új kerület', value: 'K\' = 2 · 36 = 72 cm' }
        ]
      },
      {
        id: 'sim-q29',
        level: 3,
        question: 'Ha egy A háromszög hasonló egy B háromszöghöz k₁ = 2 aránnyal, és a B háromszög hasonló egy C háromszöghöz k₂ = 3 aránnyal, mekkora a hasonlóság aránya az A és C háromszögek között?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Triangle A */}
            <polygon points="20,62 42,62 31,44" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="31" y="56" textAnchor="middle" className="text-[8px] font-black fill-purple-900">A</text>
            {/* Arrow A -> B */}
            <path d="M 48 53 L 72 53 M 67 49 L 74 53 L 67 57" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="60" y="46" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">k₁ = 2</text>
            {/* Triangle B */}
            <polygon points="80,62 118,62 99,32" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
            <text x="99" y="52" textAnchor="middle" className="text-[8px] font-black fill-purple-900">B</text>
            {/* Arrow B -> C */}
            <path d="M 126 53 L 152 53 M 147 49 L 154 53 L 147 57" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="139" y="46" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">k₂ = 3</text>
            {/* Triangle C */}
            <polygon points="160,65 240,65 200,6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.2" />
            <text x="200" y="46" textAnchor="middle" className="text-[10px] font-black fill-purple-900">C</text>
            {/* Long curved jump A -> C */}
            <path d="M 31 38 Q 110 2 195 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeDasharray="3 2" />
            <polygon points="195,24 186,21 190,29" fill="#2563eb" />
            <text x="110" y="16" textAnchor="middle" className="text-[9px] font-black fill-blue-700">k_összes = 2 · 3 = 6</text>
          </svg>
        ),
        options: [
          'k = 6 (a hasonlósági arányok összeszorzódnak: k = k₁ · k₂ = 2 · 3 = 6)',
          'k = 5 (összeadódnak)',
          'k = 1.5 (osztódnak)',
          'k = 9'
        ],
        correctAnswer: 0,
        hint: 'A hasonlóság tranzitív: |C| = k₂ · |B| = k₂ · (k₁ · |A|) = (k₁ · k₂) · |A|.',
        explanation: 'A hasonlósági transzformációk egymásutánja (kompozíciója) szintén hasonlóság, melynek aránya a részarányok szorzata: k = k₁ · k₂ = 2 · 3 = 6. A területek aránya ekkor k² = 6² = 36-szoros lenne.',
        breakdown: [
          { label: 'Tranzitivitás', value: 'k_{A➔C} = k₁ · k₂' },
          { label: 'Eredmény', value: '2 · 3 = 6' }
        ]
      },
      {
        id: 'sim-q30',
        level: 3,
        question: 'Egy háromszög S súlypontja a súlyvonalakat 2 : 1 arányban osztja. Ha az oldalfelező pontok alkotta háromszöget hasonlítjuk az eredetihez a súlypontból, mekkora a hasonlósági arány nagysága és iránya?',
        figure: (
          <svg viewBox="0 0 250 85" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            {/* Triangle ABC */}
            <polygon points="30,68 200,68 130,12" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <text x="22" y="72" className="text-[8px] font-bold fill-slate-600">A</text>
            <text x="205" y="72" className="text-[8px] font-bold fill-slate-600">B</text>
            <text x="130" y="8" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">C</text>
            {/* Medians */}
            <line x1="130" y1="12" x2="115" y2="68" stroke="#f59e0b" strokeWidth="1.5" />
            {/* S at x=120, y=49 */}
            <circle cx="120" cy="49" r="3.5" fill="#dc2626" />
            <text x="130" y="51" className="text-[9px] font-black fill-red-600">S</text>
            {/* Medial triangle connected */}
            <polygon points="115,68 80,40 165,40" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" opacity="0.8" />
            <text x="135" y="32" className="text-[7px] font-bold fill-amber-700">2 rész</text>
            <text x="122" y="62" className="text-[7px] font-bold fill-amber-700">1 rész</text>
            <text x="195" y="35" className="text-[8px] font-black fill-red-600">k = -1/2</text>
            <text x="195" y="47" className="text-[7px] font-bold fill-slate-600">feleakkora méret</text>
            <text x="195" y="58" className="text-[7px] font-bold fill-slate-600">180° fordulat</text>
          </svg>
        ),
        options: [
          'k = -1/2 (fele akkora méret, és a súlyponton át 180°-kal átfordul, pontra tükrözötten)',
          'k = +2',
          'k = +1/3',
          'k = -2'
        ],
        correctAnswer: 0,
        hint: 'A csúcs és a szemközti oldalfelező pont a súlypont ellentétes oldalain fekszik, 2:1 távolságaránnyal.',
        explanation: 'A súlypontból nézve az oldalfelező pontok a csúcsokkal ellentétes irányban, feleakkora távolságra vannak (|SF| = 1/2 |SC|). Ez egy középpontos hasonlóság k = -1/2 aránnyal, ami 1/2 arányú kicsinyítést és 180°-os elforgatást jelent.',
        breakdown: [
          { label: 'Centrum', value: 'Súlypont (S)' },
          { label: 'Arány nagysága', value: '|k| = 1/2' },
          { label: 'Irány (előjel)', value: 'Negatív (-1/2, ellentétes oldal / 180° fordulat)' }
        ]
      }
    ]
  }
};

export const SimilarityQuiz: React.FC<SimilarityQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-similarity"
      grade={8}
      chapterId="geometria"
      topicTitle="Hasonlóság"
      emoji="📐"
      topicBadge="8. Osztály • II. Geometria • 4. Témakör"
      badgeText="8. Osztály • Matematika"
      title="Hasonlóság kvíz"
      subtitle="Hasonlósági arány (k), alapesetek, kerületek és területek aránya 3 szinten"
      cheatSheetTitle="Hasonlóság Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Ügyelj a különbségre: a kerületek aránya k, a területek aránya viszont k² (négyzetes)!"
      levels={quizLevels}
      matcherComponent={<SimilarityMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SimilaritySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="blue"
    />
  );
};

export default SimilarityQuiz;
