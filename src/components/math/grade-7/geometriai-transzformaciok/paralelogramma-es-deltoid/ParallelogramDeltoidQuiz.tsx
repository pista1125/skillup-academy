import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ParallelogramDeltoidMatcher } from './ParallelogramDeltoidMatcher';
import { ParallelogramDeltoidSorter } from './ParallelogramDeltoidSorter';
import {
  Shapes,
  Maximize2,
  Split,
  Scale
} from 'lucide-react';

interface ParallelogramDeltoidQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Paralelogramma Alaptulajdonságok',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: 'a ∥ c, b ∥ d | α = γ, β = δ | α + β = 180° | Átlók felezik egymást (O centrum)',
    note: 'Szemközti oldalai és szögei egyenlők, szomszédos szögei 180°-ra egészítik ki egymást. Mindig középpontosan szimmetrikus!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="25,40 100,40 135,10 60,10" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="135" y2="10" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="60" y1="10" x2="100" y2="40" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="80" cy="25" r="2.5" fill="#7e22ce" />
        <text x="84" y="24" className="text-[7px] font-bold fill-purple-900">O</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Deltoid Szimmetriája és Átlói',
    icon: <Maximize2 className="w-4 h-4 text-pink-600" />,
    formula: 'e ⊥ f (merőlegesek) | Főátló (e) felezi a mellékátlót (f) | β = δ (két egyenlő szög)',
    note: 'Két-két szomszédos oldala egyenlő. 1 szimmetriatengelye van (főátló). Mindig érintőnégyszög (van beírt köre)!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="80,5 120,20 80,45 40,20" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <line x1="80" y1="5" x2="80" y2="45" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="#0284c7" strokeWidth="1" />
        <circle cx="40" cy="20" r="2" fill="#db2777" />
        <circle cx="120" cy="20" r="2" fill="#db2777" />
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Rombusz és Négyzet Kapcsolat',
    icon: <Split className="w-4 h-4 text-indigo-600" />,
    formula: 'Rombusz: minden oldal egyenlő ⟹ e ⊥ f és felezik a szögeket | Négyzet: rombusz + téglalap',
    note: 'A rombusz egyszerre paralelogramma és deltoid! A négyzet szabályos: 4 tengelye és 1 centruma van.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="45,8 75,25 45,42 15,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
        <rect x="105" y="10" width="30" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Kerület és Terület Képletek',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: 'K = 2(a + b) | T_para = a · ma = b · mb | T_deltoid/rombusz = (e · f) / 2',
    note: 'Bármely merőleges átlójú négyszög területe a két átló szorzatának a fele!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,40 70,40 85,15 35,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        <line x1="35" y1="15" x2="35" y2="40" stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="2 1" />
        <text x="38" y="30" className="text-[7px] font-bold fill-red-700">ma</text>
        <text x="45" y="47" className="text-[7px] font-bold fill-amber-800">a</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Tulajdonságok',
    subtitle: 'Paralelogramma és deltoid definíciók, oldalak és szögek alaptulajdonságai',
    range: '1–10. kérdés',
    focus: 'Definíciók, szomszédos és szemközti szögek, alapvető szimmetriák',
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    questions: [
      {
        id: 'q1',
        question: 'Milyen négyszöget nevezünk paralelogrammának a definíció szerint?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 170,20 60,20" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <line x1="90" y1="20" x2="95" y2="20" stroke="#7e22ce" strokeWidth="2" />
            <line x1="85" y1="70" x2="90" y2="70" stroke="#7e22ce" strokeWidth="2" />
            <line x1="45" y1="43" x2="49" y2="47" stroke="#7e22ce" strokeWidth="2" />
            <line x1="155" y1="43" x2="159" y2="47" stroke="#7e22ce" strokeWidth="2" />
          </svg>
        ),
        options: [
          'Olyan négyszöget, amelynek szemközti oldalai párhuzamosak (két párhuzamos oldalpár)',
          'Olyan négyszöget, amelynek minden oldala egyenlő hosszúságú',
          'Olyan négyszöget, amelynek átlói merőlegesek egymásra',
          'Olyan négyszöget, amelynek legalább egy derékszöge van'
        ],
        correctAnswer: 0,
        explanation: 'A paralelogramma definíciója: olyan négyszög, amelynek mindkét szemközti oldalpárja párhuzamos egymással (a ∥ c és b ∥ d).',
        hint: 'Gondolj a nevére: „paralel” = párhuzamos.'
      },
      {
        id: 'q2',
        question: 'Hány egyenlő oldalpárja van a deltoidnak, és ezek hogyan helyezkednek el?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,38 100,82 50,38" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <text x="68" y="22" className="text-[11px] font-bold fill-pink-600">a</text>
            <text x="126" y="22" className="text-[11px] font-bold fill-pink-600">a</text>
            <text x="68" y="65" className="text-[11px] font-bold fill-rose-700">b</text>
            <text x="126" y="65" className="text-[11px] font-bold fill-rose-700">b</text>
          </svg>
        ),
        options: [
          'Két-két szomszédos oldala egyenlő hosszúságú (a = a és b = b)',
          'Két-két szemközti oldala egyenlő hosszúságú',
          'Mind a négy oldala különböző hosszúságú',
          'Mind a négy oldala szükségképpen egyenlő hosszú'
        ],
        correctAnswer: 0,
        explanation: 'A deltoid olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszúságú. Ez biztosítja az egytengelyes szimmetriát a főátlóra.',
        hint: 'A deltoid alakja olyan, mint a sárkány: a felső két oldala egymással, az alsó két oldala egymással egyenlő.'
      },
      {
        id: 'q3',
        question: 'Milyen kapcsolat áll fenn egy paralelogramma szemközti belső szögei (α és γ) között?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 165,22 55,22" fill="#fdf4ff" stroke="#a855f7" strokeWidth="2" />
            <path d="M 55 70 A 20 20 0 0 1 42 53" fill="none" stroke="#a855f7" strokeWidth="2" />
            <text x="50" y="62" className="text-[11px] font-bold fill-purple-700">α</text>
            <path d="M 145 22 A 20 20 0 0 1 158 39" fill="none" stroke="#a855f7" strokeWidth="2" />
            <text x="145" y="36" className="text-[11px] font-bold fill-purple-700">γ</text>
          </svg>
        ),
        options: [
          'Mindig egyenlők egymással (α = γ és β = δ)',
          'Összegük mindig pontosan 180°',
          'Összegük mindig pontosan 90°',
          'Mindig eltérő nagyságúak'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a paralelogramma középpontosan szimmetrikus az átlók metszéspontjára, a szemközti szögek egymás tükörképei, így nagyságuk megegyezik: α = γ és β = δ.',
        hint: 'A középpontos tükrözés szögtartó transzformáció.'
      },
      {
        id: 'q4',
        question: 'Mennyi egy paralelogramma bármely két szomszédos belső szögének összege (α + β)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 165,22 55,22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <path d="M 55 70 A 20 20 0 0 1 42 53" fill="none" stroke="#d97706" strokeWidth="2" />
            <text x="50" y="62" className="text-[11px] font-bold fill-amber-700">α</text>
            <path d="M 125 70 A 20 20 0 0 1 149 53" fill="none" stroke="#b45309" strokeWidth="2" />
            <text x="127" y="62" className="text-[11px] font-bold fill-amber-800">β</text>
          </svg>
        ),
        options: [
          'Mindig pontosan 180° (egymás kiegészítő szögei)',
          'Mindig pontosan 90°',
          'Mindig pontosan 360°',
          'Az oldalak arányától függően bármekkora lehet'
        ],
        correctAnswer: 0,
        explanation: 'A két párhuzamos oldalt metsző egyenes belső szögei társszögek, amelyek összege mindig 180° (α + β = 180°).',
        hint: 'Két párhuzamos egyenes közötti egyoldalú belső szögek összege 180°.'
      },
      {
        id: 'q5',
        question: 'Hány szimmetriatengelye van egy általános (nem rombusz) deltoidnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,8 145,35 100,82 55,35" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <line x1="100" y1="2" x2="100" y2="88" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
            <text x="105" y="18" className="text-[11px] font-bold fill-rose-600">t</text>
          </svg>
        ),
        options: [
          'Pontosan 1 szimmetriatengelye van (a főátló egyenese)',
          '2 szimmetriatengelye van (mindkét átlója)',
          '4 szimmetriatengelye van',
          'Nincs egyetlen szimmetriatengelye sem'
        ],
        correctAnswer: 0,
        explanation: 'Az általános deltoidnak pontosan egy szimmetriatengelye van: a két eltérő csúcsot összekötő főátló egyenese. Ha a másik átló is tengely lenne, akkor minden oldala egyenlő lenne (rombusz).',
        hint: 'Csak a függőleges főátló mentén tudod úgy összehajtani, hogy a két fele fedje egymást.'
      },
      {
        id: 'q6',
        question: 'Mi a rombusz definíciója a paralelogrammához viszonyítva?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,12 155,45 100,78 45,45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="70" y="24" className="text-[10px] font-bold fill-purple-700">a</text>
            <text x="125" y="24" className="text-[10px] font-bold fill-purple-700">a</text>
            <text x="125" y="68" className="text-[10px] font-bold fill-purple-700">a</text>
            <text x="70" y="68" className="text-[10px] font-bold fill-purple-700">a</text>
          </svg>
        ),
        options: [
          'Minden oldala egyenlő hosszúságú paralelogramma',
          'Minden belső szöge derékszögű paralelogramma',
          'Olyan trapéz, amelynek átlói párhuzamosak',
          'Olyan deltoid, amelynek nincsenek szimmetriái'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz egyenlő oldalú paralelogramma: minden olyan tulajdonsággal bír, mint a paralelogramma, kiegészülve azzal, hogy mind a 4 oldala egyenlő hosszú (a = b = c = d).',
        hint: 'Nézd meg az oldalhosszakat: mindegyik azonos „a”.'
      },
      {
        id: 'q7',
        question: 'Mennyi bármely konvex négyszög (így a paralelogramma és deltoid) belső szögeinek összege?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="40,70 150,75 165,20 60,15" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
            <text x="90" y="50" className="text-[14px] font-black fill-slate-700">Σ = ?</text>
          </svg>
        ),
        options: [
          'Mindig pontosan 360° ((4 - 2) · 180°)',
          'Mindig pontosan 180°',
          'Mindig pontosan 540°',
          'Attól függ, mekkora a kerülete és területe'
        ],
        correctAnswer: 0,
        explanation: 'Bármely négyszög egy átlójával két háromszögre vágható, így a belső szögek összege: (4 - 2) · 180° = 2 · 180° = 360°.',
        hint: 'Egy négyszög két darab 180°-os háromszögre bontható.'
      },
      {
        id: 'q8',
        question: 'Milyen belső szögei vannak a téglalapnak a definíció szerint?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="40" y="20" width="120" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <path d="M 40 32 L 52 32 L 52 20" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 148 20 L 148 32 L 160 32" fill="none" stroke="#0284c7" strokeWidth="1.5" />
          </svg>
        ),
        options: [
          'Mind a négy belső szöge pontosan 90° (derékszögű paralelogramma)',
          'Két hegyesszöge és két tompaszöge van',
          'Szögei tetszőlegesek, csak a szemköztiek egyenlők',
          'Csak két szöge derékszög, a másik kettő 45°-os'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap definíciója: olyan négyszög (egyben paralelogramma), amelynek minden belső szöge derékszög (90°).',
        hint: 'A neve is mutatja: téglalap = egyenes szögű négyszög.'
      },
      {
        id: 'q9',
        question: 'Melyik két belső szöge egyenlő biztosan egy konvex deltoidnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,38 100,82 50,38" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <circle cx="50" cy="38" r="4" fill="#db2777" />
            <text x="35" y="42" className="text-[12px] font-bold fill-pink-700">β</text>
            <circle cx="150" cy="38" r="4" fill="#db2777" />
            <text x="157" y="42" className="text-[12px] font-bold fill-pink-700">δ</text>
          </svg>
        ),
        options: [
          'A mellékátló végpontjainál lévő két szemközti szög (β = δ)',
          'A főátló két végpontjánál lévő csúcsszögek (α = γ)',
          'Mind a négy belső szöge mindig egyenlő',
          'A deltoidnak soha nincsenek egyenlő szögei'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a főátló a deltoid szimmetriatengelye, a két oldalcsúcs tükörképe egymásnak, így a mellékátló végpontjainál fekvő két szög mindig egyenlő: β = δ.',
        hint: 'A szimmetriatengelyre tükrös két szög mérete pontosan megegyezik.'
      },
      {
        id: 'q10',
        question: 'Rendelkezik-e egy általános (ferde) paralelogramma szimmetriaközépponttal?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 165,22 55,22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <circle cx="100" cy="46" r="4" fill="#d97706" />
            <text x="106" y="49" className="text-[12px] font-black fill-amber-900">O</text>
          </svg>
        ),
        options: [
          'Igen, az átlók metszéspontja szimmetriaközéppont',
          'Nem, a paralelogrammának nincs semmilyen szimmetriája',
          'Csak akkor, ha négyzet vagy rombusz',
          'Csak akkor, ha az egyik oldala kétszerese a másiknak'
        ],
        correctAnswer: 0,
        explanation: 'Minden paralelogramma középpontosan szimmetrikus! A szimmetria középpontja az átlók közös felezőpontja (O metszéspont).',
        hint: 'Ha a paralelogrammát 180°-kal elforgatod az átlók metszéspontja körül, önmagába megy át.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Átlók, Szimmetriák és Speciális Négyszögek',
    subtitle: 'Átlók felezése és merőlegessége, rombusz és négyzet tulajdonságai, szögkeresések',
    range: '11–20. kérdés',
    focus: 'Átlótulajdonságok, merőleges átlók, rombusz, téglalap, érintőnégyszög',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-300 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    questions: [
      {
        id: 'q11',
        question: 'Hogyan metszik egymást egy tetszőleges paralelogramma átlói?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,70 140,70 170,20 60,20" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
            <line x1="30" y1="70" x2="170" y2="20" stroke="#dc2626" strokeWidth="1.8" />
            <line x1="60" y1="20" x2="140" y2="70" stroke="#2563eb" strokeWidth="1.8" />
            <circle cx="100" cy="45" r="3.5" fill="#7c3aed" />
          </svg>
        ),
        options: [
          'Kölcsönösen felezik egymást a metszéspontban',
          'Mindig merőlegesek egymásra és egyenlő hosszúak',
          'Csak az egyik átló felezi a másikat, a másik nem',
          'Soha nem felezik egymást'
        ],
        correctAnswer: 0,
        explanation: 'A paralelogramma alaptétele: az átlók kölcsönösen felezik egymást. A metszéspont mindkét átló felezőpontja, ami egyben a szimmetriaközéppont.',
        hint: 'A szimmetriaközéppont az átlók felezőpontja.'
      },
      {
        id: 'q12',
        question: 'Milyen szöget zárnak be egymással egy deltoid átlói (e és f)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,38 100,82 50,38" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="82" stroke="#e11d48" strokeWidth="2" />
            <line x1="50" y1="38" x2="150" y2="38" stroke="#0284c7" strokeWidth="2" />
            <path d="M 100 46 L 108 46 L 108 38" fill="none" stroke="#475569" strokeWidth="1.5" />
          </svg>
        ),
        options: [
          'Mindig pontosan 90°-ot (merőlegesek egymásra: e ⊥ f)',
          'Mindig 60°-os hegyesszöget zárnak be',
          'Mindig 45°-os szöget zárnak be',
          'Általában ferdén metszik egymást, csak négyzetnél merőlegesek'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a főátló a deltoid szimmetriatengelye, a két oldalcsúcsot összekötő mellékátló szakaszfelező merőlegese, tehát e ⊥ f.',
        hint: 'A szimmetriatengely mindig merőleges a tükörképi pontpárokat összekötő szakaszra.'
      },
      {
        id: 'q13',
        question: 'Hogyan viszonyul a deltoid főátlója a mellékátlóhoz felezés szempontjából?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,38 100,82 50,38" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" />
            <line x1="50" y1="38" x2="100" y2="38" stroke="#0d9488" strokeWidth="2" />
            <line x1="100" y1="38" x2="150" y2="38" stroke="#0d9488" strokeWidth="2" />
            <circle cx="75" cy="38" r="2" fill="#0d9488" />
            <circle cx="125" cy="38" r="2" fill="#0d9488" />
          </svg>
        ),
        options: [
          'A főátló merőlegesen felezi a mellékátlót (de a mellékátló nem felezi a főátlót)',
          'A mellékátló felezi a főátlót',
          'Kölcsönösen felezik egymást',
          'Egyik átló sem felezi a másikat'
        ],
        correctAnswer: 0,
        explanation: 'A főátló szimmetriatengely, ezért felezi a rá merőleges mellékátlót. Azonban az általános deltoidban a mellékátló nem felezi a főátlót (a felső és alsó rész különböző hosszú).',
        hint: 'A vízszintes átló két fele egyenlő hosszú a tengely két oldalán.'
      },
      {
        id: 'q14',
        question: 'Milyen különleges szerepet töltenek be a rombusz átlói a belső szögekre nézve?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 160,45 100,80 40,45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="40" y1="45" x2="160" y2="45" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="100" cy="22" r="1.5" fill="#7c3aed" />
            <circle cx="100" cy="26" r="1.5" fill="#7c3aed" />
          </svg>
        ),
        options: [
          'Az átlók felezik a rombusz belső szögeit (szögfelezők)',
          'Az átlók három egyenlő harmadra osztják a szögeket',
          'Nem felezik a szögeket, csak merőlegesek',
          'Csak a tompaszögeket felezik meg, a hegyesszögeket nem'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz átlói szimmetriatengelyek, ezért mind a négy belső szögét pontosan megfelezik.',
        hint: 'Mivel a rombusz átlói tengelyek, a csúcsszögeket is tükrösen felezik.'
      },
      {
        id: 'q15',
        question: 'Melyik állítás igaz MINDEN téglalap átlóira?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="35" y="20" width="130" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <line x1="35" y1="20" x2="165" y2="70" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="35" y1="70" x2="165" y2="20" stroke="#0284c7" strokeWidth="1.8" />
            <text x="90" y="38" className="text-[10px] font-bold fill-sky-800">d₁ = d₂</text>
          </svg>
        ),
        options: [
          'Egyenlő hosszúságúak és felezik egymást (d₁ = d₂)',
          'Merőlegesek egymásra és különböző hosszúságúak',
          'Csak az egyik átló feleződik',
          'Minden téglalapban 90°-ot zárnak be egymással'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap átlói mindig egyenlő hosszúságúak és felezik egymást. Csak akkor merőlegesek egymásra, ha a téglalap négyzet!',
        hint: 'A téglalap sarkait összekötő átlók egyforma hosszúak.'
      },
      {
        id: 'q16',
        question: 'Rendelkezik-e minden konvex deltoid beírt körrel (érintőnégyszög)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,8 150,38 100,82 50,38" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <circle cx="100" cy="42" r="23" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
        ),
        options: [
          'Igen, minden deltoid érintőnégyszög: a szemközti oldalak összege egyenlő (a + b = a + b)',
          'Nem, a deltoidnak soha nem lehet beírt köre',
          'Csak akkor, ha négyzet',
          'Csak akkor, ha konkáv'
        ],
        correctAnswer: 0,
        explanation: 'Egy négyszögbe akkor és csak akkor írható kör (érintőnégyszög), ha a szemközti oldalpárok összege egyenlő. A deltoidban a szemközti oldalak: a + b és b + a, amelyek mindig egyenlők!',
        hint: 'Érintőnégyszög tétele: a + c = b + d. A deltoidban ez: a + b = a + b.'
      },
      {
        id: 'q17',
        question: 'Egy paralelogramma egyik belső szöge 50°. Mekkora a mellette fekvő tompaszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 165,22 55,22" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
            <text x="50" y="62" className="text-[12px] font-bold fill-pink-600">50°</text>
            <text x="125" y="62" className="text-[12px] font-bold fill-pink-800">β = ?</text>
          </svg>
        ),
        options: [
          '130° (mivel α + β = 180°, így β = 180° - 50° = 130°)',
          '50°',
          '140°',
          '90°'
        ],
        correctAnswer: 0,
        explanation: 'A szomszédos belső szögek összege 180°. Ezért: β = 180° - 50° = 130°.',
        hint: '180°-ból vond ki az 50°-ot.'
      },
      {
        id: 'q18',
        question: 'Hány szimmetriatengelye van egy rombusznak (ami nem négyzet)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 160,45 100,80 40,45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="2" x2="100" y2="88" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="30" y1="45" x2="170" y2="45" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: [
          'Pontosan 2 szimmetriatengelye van (a két átló egyenese)',
          '1 szimmetriatengelye van',
          '4 szimmetriatengelye van',
          'Nincs szimmetriatengelye, csak középpontja'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz két átlója szimmetriatengely. Oldalfelező merőlegesei viszont csak akkor tengelyek, ha a belső szögei derékszögek (vagyis négyzet). Így általános rombusznak 2 szimmetriatengelye van.',
        hint: 'A két átló mentén félbehajtható.'
      },
      {
        id: 'q19',
        question: 'Hány szimmetriatengellyel és szimmetriaközépponttal rendelkezik a négyzet?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="65" y="10" width="70" height="70" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <circle cx="100" cy="45" r="3.5" fill="#16a34a" />
          </svg>
        ),
        options: [
          '4 szimmetriatengellyel és 1 szimmetriaközépponttal',
          '2 szimmetriatengellyel és 1 szimmetriaközépponttal',
          '4 szimmetriatengellyel, de nincs középpontja',
          'Végtelen sok tengellyel'
        ],
        correctAnswer: 0,
        explanation: 'A négyzet szabályos négyszög: 2 átlós tengelye és 2 oldalfelező tengelye van (összesen 4 tengely), metszéspontjuk pedig a szimmetriaközéppont.',
        hint: 'A két átló és a két oldalfelező merőleges adja a 4 tengelyt.'
      },
      {
        id: 'q20',
        question: 'Mi a konkáv deltoid (nyílhegy) geometriai jellegzetessége?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 160,80 100,55 40,80" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <line x1="40" y1="80" x2="160" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: [
          'Egyik belső szöge nagyobb 180°-nál, mellékátlója a síkidomon kívül fut',
          'Minden belső szöge hegyesszög',
          'Nincs szimmetriatengelye',
          'Minden oldala párhuzamos egymással'
        ],
        correctAnswer: 0,
        explanation: 'A konkáv deltoidban (más néven nyílhegy) az egyik belső szög tompább az egyenesszögnél (> 180°), és a két szárnyat összekötő mellékátló az alakzaton kívül fut, miközben a főátló továbbra is szimmetriatengely.',
        hint: 'Nézd meg a „behúzódó” belső csúcsot: a belső szöge meghaladja a 180°-ot.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Számítások és Négyszöghierarchia',
    subtitle: 'Szög- és oldalszámítások, magasságok, rombusz háromszögei és kapcsolatok',
    range: '21–30. kérdés',
    focus: 'Összetett számítások, szögkeresés, terület-összefüggések, logikai következtetések',
    color: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-300 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    questions: [
      {
        id: 'q21',
        question: 'Egy konvex deltoid főátlójának két végpontjánál lévő csúcsszöge 80° és 40°. Mekkorák a mellékátló végpontjainál lévő egyenlő oldalszögek (β és δ)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,42 100,80 50,42" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
            <text x="92" y="24" className="text-[10px] font-bold fill-slate-700">80°</text>
            <text x="92" y="74" className="text-[10px] font-bold fill-slate-700">40°</text>
            <text x="35" y="46" className="text-[10px] font-bold fill-blue-700">β=?</text>
            <text x="155" y="46" className="text-[10px] font-bold fill-blue-700">δ=?</text>
          </svg>
        ),
        options: [
          'β = δ = 120° (mivel (360° - 120°) / 2 = 120°)',
          'β = δ = 100°',
          'β = δ = 130°',
          'β = δ = 110°'
        ],
        correctAnswer: 0,
        explanation: 'A négyszög belső szögeinek összege 360°. A két ismert szög összege: 80° + 40° = 120°. A fennmaradó két szög összege: 360° - 120° = 240°. Mivel β = δ, így mindkettő: 240° / 2 = 120°.',
        hint: '360°-ból vond ki a 80°-ot és 40°-ot, majd felezd el a maradékot.'
      },
      {
        id: 'q22',
        question: 'Hány darab és milyen háromszögre bontja a rombuszt a két átlója?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 160,45 100,80 40,45" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#9333ea" strokeWidth="1.5" />
            <line x1="40" y1="45" x2="160" y2="45" stroke="#9333ea" strokeWidth="1.5" />
            <text x="80" y="35" className="text-[9px] font-bold fill-purple-700">T₁</text>
            <text x="115" y="35" className="text-[9px] font-bold fill-purple-700">T₂</text>
            <text x="80" y="60" className="text-[9px] font-bold fill-purple-700">T₃</text>
            <text x="115" y="60" className="text-[9px] font-bold fill-purple-700">T₄</text>
          </svg>
        ),
        options: [
          '4 darab egybevágó derékszögű háromszögre',
          '4 darab szabályos (egyenlő oldalú) háromszögre',
          '2 derékszögű és 2 tompaszögű háromszögre',
          '2 egyenlő szárú és 2 derékszögű háromszögre'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a rombusz átlói merőlegesen felezik egymást és minden oldala egyenlő, a 4 létrejövő derékszögű háromszög befogói e/2 és f/2, átfogójuk az a oldal, így mind a 4 egybevágó.',
        hint: 'Az átlók derékszöget zárnak be, és mindegyik átlót felezi a metszéspont.'
      },
      {
        id: 'q23',
        question: 'Egy paralelogramma oldalai a = 10 cm és b = 6 cm. Az a oldalhoz tartozó magasság ma = 3 cm. Mekkora a b oldalhoz tartozó mb magasság?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 175,25 65,25" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
            <line x1="65" y1="25" x2="65" y2="70" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="68" y="52" className="text-[10px] font-bold fill-red-700">ma=3</text>
            <text x="90" y="82" className="text-[10px] font-bold fill-emerald-800">a=10</text>
            <text x="165" y="48" className="text-[10px] font-bold fill-emerald-800">b=6</text>
          </svg>
        ),
        options: [
          '5 cm (mivel T = a · ma = b · mb = 30 cm², így mb = 30 / 6 = 5 cm)',
          '4 cm',
          '6 cm',
          '2 cm'
        ],
        correctAnswer: 0,
        explanation: 'A paralelogramma területe kétféleképpen is kiszámítható: T = a · ma = 10 · 3 = 30 cm². Ugyanez a terület a b oldallal: T = b · mb ⟹ 30 = 6 · mb ⟹ mb = 5 cm.',
        hint: 'Számold ki először a területet az a oldalból (10 · 3), majd oszd el a 6-tal.'
      },
      {
        id: 'q24',
        question: 'Melyik összefüggés fejezi ki helyesen a rombusz és a deltoid viszonyát a négyszögek hierarchiájában?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="90" cy="45" r="38" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <circle cx="105" cy="45" r="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="62" y="30" className="text-[10px] font-bold fill-pink-700">Deltoid</text>
            <text x="95" y="48" className="text-[9px] font-bold fill-purple-800">Rombusz</text>
          </svg>
        ),
        options: [
          'Minden rombusz egyben deltoid is (a rombusz a deltoid speciális esete)',
          'Minden deltoid egyben rombusz is',
          'A rombusz és a deltoid halmazának nincs közös metszete',
          'Egy négyszög sosem lehet egyszerre deltoid és rombusz'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz minden oldala egyenlő, ezért teljesíti a deltoid definícióját (két-két szomszédos oldala egyenlő). Tehát minden rombusz deltoid is, de megfordítva nem igaz!',
        hint: 'A rombusz olyan deltoid, amelynek mind a 4 oldala egyforma.'
      },
      {
        id: 'q25',
        question: 'Ha egy paralelogramma egyik belső szögfelezője metszi a szemközti oldalt, milyen típusú háromszöget vág le?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 155,70 175,25 55,25" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <line x1="35" y1="70" x2="100" y2="25" stroke="#2563eb" strokeWidth="1.8" />
            <circle cx="48" cy="62" r="1.5" fill="#2563eb" />
            <circle cx="56" cy="52" r="1.5" fill="#2563eb" />
            <circle cx="85" cy="35" r="1.5" fill="#2563eb" />
          </svg>
        ),
        options: [
          'Egyenlő szárú háromszöget (a párhuzamosok és szögfelező miatti váltószögek egyenlősége okán)',
          'Szabályos (egyenlő oldalú) háromszöget minden esetben',
          'Minden esetben derékszögű háromszöget',
          'Nem határozható meg a háromszög típusa'
        ],
        correctAnswer: 0,
        explanation: 'A szögfelező a sarokszöget α/2 -re bontja. Mivel a szemközti oldalak párhuzamosak, a szögfelező és a szemközti oldal találkozásánál fellépő belső váltószög szintén α/2. Így a levágott háromszög két szöge egyenlő (α/2 és α/2), ami egyenlő szárú háromszöget jelent!',
        hint: 'Két szög egybeesése a háromszögben azt jelenti, hogy két szára egyenlő hosszú.'
      },
      {
        id: 'q26',
        question: 'Egy rombusz egyik belső szöge 60°, oldala 8 cm. Milyen hosszú a rövidebbik átlója?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 155,45 100,75 45,45" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <line x1="45" y1="45" x2="155" y2="45" stroke="#ca8a04" strokeWidth="1.8" />
            <text x="65" y="42" className="text-[10px] font-bold fill-amber-700">60°</text>
            <text x="90" y="24" className="text-[10px] font-bold fill-amber-800">a = 8</text>
          </svg>
        ),
        options: [
          '8 cm (a rövidebbik átló két szabályos, egyenlő oldalú háromszögre bontja)',
          '4 cm',
          '16 cm',
          '8 · √3 cm'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz két szomszédos oldala 8 cm, és a közbezárt szögük 60°. Az ezek végpontjait összekötő átlóval keletkező háromszög egyenlő szárú, melynek csúcsszöge 60°, így alapszögei is (180° - 60°)/2 = 60°-osak, tehát szabályos háromszög! Így az átló hossza pontosan 8 cm.',
        hint: 'Egy 60°-os csúcsszögű egyenlő szárú háromszög minden szöge 60°, vagyis egyenlő oldalú.'
      },
      {
        id: 'q27',
        question: 'Egy konvex deltoid két különböző oldala 7 cm és 12 cm. Mekkora a deltoid kerülete?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 145,35 100,82 55,35" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <text x="68" y="22" className="text-[10px] font-bold fill-pink-600">7 cm</text>
            <text x="65" y="65" className="text-[10px] font-bold fill-rose-700">12 cm</text>
          </svg>
        ),
        options: [
          'K = 2 · (7 + 12) = 38 cm',
          'K = 19 cm',
          'K = 84 cm',
          'K = 28 cm'
        ],
        correctAnswer: 0,
        explanation: 'A deltoidnak két 7 cm-es és két 12 cm-es oldala van. Kerülete: K = 2 · a + 2 · b = 2 · (7 + 12) = 2 · 19 = 38 cm.',
        hint: 'A kerület a 4 oldal összege: 7 + 7 + 12 + 12.'
      },
      {
        id: 'q28',
        question: 'Egy síkidomnak van két egymásra merőleges szimmetriatengelye (t₁ ⊥ t₂). Mi következik ebből geometriailag?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="100" y1="10" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="40" y1="45" x2="160" y2="45" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="100" cy="45" r="4" fill="#d97706" />
            <text x="106" y="42" className="text-[11px] font-bold fill-amber-700">O</text>
          </svg>
        ),
        options: [
          'A két tengely metszéspontja biztosan szimmetriaközéppont (pl. rombusz, téglalap)',
          'A síkidom csak és kizárólag szabályos négyzet lehet',
          'A síkidomnak nem lehet szimmetriaközéppontja',
          'A belső szögei mind hegyesszögek kell hogy legyenek'
        ],
        correctAnswer: 0,
        explanation: 'Két egymásra merőleges tengelyre való egymás utáni tükrözés egy 180°-os elforgatásnak (középpontos tükrözésnek) felel meg a metszéspont körül. Ezért a metszéspont mindig szimmetriaközéppont.',
        hint: 'Gondolj a derékszögű koordináta-rendszerre: x és y tengelyes tükrözés együtt origóra való középpontos tükrözést ad.'
      },
      {
        id: 'q29',
        question: 'Miben tér el a húrtrapéz (szimmetrikus trapéz) szimmetriatengelye a deltoid szimmetriatengelyétől?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="25,70 85,70 70,25 40,25" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.8" />
            <line x1="55" y1="15" x2="55" y2="80" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points="150,15 180,45 150,75 120,45" fill="#fce7f3" stroke="#db2777" strokeWidth="1.8" />
            <line x1="150" y1="8" x2="150" y2="82" stroke="#db2777" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: [
          'A húrtrapéz tengelye az alapok oldalfelező merőlegese (nem csúcsokon halad át), míg a deltoidé csúcsokon átmenő átló',
          'A húrtrapéznak nincs tengelye, csak centruma',
          'A deltoid tengelye sosem érint csúcsokat',
          'A két négyszög tengelye geometriailag semmiben nem különbözik'
        ],
        correctAnswer: 0,
        explanation: 'A húrtrapéz tengelye a két párhuzamos alap közös felezőmerőlegese (oldalfelező), nem halad át csúcsokon. A deltoid szimmetriatengelye viszont a főátló egyenese, ami két szemközti csúcson halad át.',
        hint: 'A trapéznál az oldalak közepét köti össze a tengely, a deltoidnál a csúcsokat.'
      },
      {
        id: 'q30',
        question: 'Melyik állítás HIBÁS a négyzetre vonatkozóan a négyszögek rendszertanában?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="70" y="15" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <line x1="70" y1="15" x2="130" y2="75" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="70" y1="75" x2="130" y2="15" stroke="#16a34a" strokeWidth="1.2" />
          </svg>
        ),
        options: [
          '„A négyzet nem deltoid, mert minden szöge egyenlő” (ez a hibás állítás!)',
          '„A négyzet olyan téglalap, amelynek minden oldala egyenlő”',
          '„A négyzet olyan rombusz, amelynek minden belső szöge derékszög”',
          '„A négyzet átlói egyenlő hosszúak és merőlegesen felezik egymást”'
        ],
        correctAnswer: 0,
        explanation: 'A négyzet DELTOID IS! Két-két szomszédos oldala egyenlő (sőt mind a 4 egyenlő), átlói merőlegesek, és van szimmetriatengelye csúcsokon keresztül. Ezért az az állítás, hogy „a négyzet nem deltoid”, hamis.',
        hint: 'Keresd a hibás állítást: a négyzet az összes speciális négyszögtípus tulajdonságát magában foglalja.'
      }
    ]
  }
};

export const ParallelogramDeltoidQuiz: React.FC<ParallelogramDeltoidQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-parallelogram-quiz"
      documentId="7_osztaly_paralelogramma_es_deltoid_kviz"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      title="Paralelogramma és Deltoid Kvíz"
      topicTitle="9. Paralelogramma és deltoid"
      subtitle="30 feladat (3 szinten 10-10 kérdés): Definíciók, átlók, rombusz, téglalap, deltoid és négyszöghierarchia"
      themeColor="purple"
      pdfFilename="7_osztaly_paralelogramma_es_deltoid_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetCards={cheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={<ParallelogramDeltoidMatcher onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ParallelogramDeltoidSorter onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
};

export default ParallelogramDeltoidQuiz;
