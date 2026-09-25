import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SymmetryComparisonMatcher } from './SymmetryComparisonMatcher';
import { SymmetryComparisonSorter } from './SymmetryComparisonSorter';
import {
  FlipHorizontal,
  RotateCw,
  Shapes,
  Scale
} from 'lucide-react';

interface SymmetryComparisonQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Tengelyes vs. Középpontos Tükrözés',
    icon: <Scale className="w-4 h-4 text-violet-600" />,
    formula: 'Tengelyes: t (vonal), ↺ ➔ ↻ | Középpontos: O (pont), e ∥ e\', ↺ ➔ ↺',
    note: 'Tengelyesnél a tengely összes pontja fix, az orientáció megfordul. Középpontosnál 1 fixpont van (O), az orientáció megmarad.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="40" y1="5" x2="40" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="120" cy="25" r="3" fill="#0d9488" />
        <text x="25" y="45" className="text-[7px] font-bold fill-rose-600">t tengely</text>
        <text x="110" y="45" className="text-[7px] font-bold fill-teal-700">O centrum</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Négyszögek Szimmetriatáblázata',
    icon: <Shapes className="w-4 h-4 text-purple-600" />,
    formula: 'Paralelogramma: 0t, 1O | Téglalap: 2t, 1O | Rombusz: 2t, 1O | Négyzet: 4t, 1O',
    note: 'Deltoid és húrtrapéz: 1t, 0O! Általános paralelogrammának nincs tengelye, de van centruma!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="15" width="45" height="22" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="120,10 145,25 120,40 95,25" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Háromszögek és Sokszögek',
    icon: <RotateCw className="w-4 h-4 text-teal-600" />,
    formula: 'Háromszög: SOSEM KÖZÉPPONTOS! | Páros sokszög: van centruma',
    note: 'Szabályos háromszög 3 tengellyel bír, de nem középpontos! Páros sokszög (pl. hatszög, nyolcszög) középpontos.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,10 60,40 20,40" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <polygon points="120,10 138,20 138,36 120,44 102,36 102,20" fill="#f0fdf4" stroke="#15803d" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Kettős Szimmetria és Koordináták',
    icon: <FlipHorizontal className="w-4 h-4 text-amber-600" />,
    formula: 't₁ ⊥ t₂ ⟹ metszéspont = O! | P(x; y) ➔ P\'(-x; -y) [origó]',
    note: 'Két egymásra merőleges szimmetriatengely metszéspontja szükségszerűen szimmetriaközéppont.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="80" y1="5" x2="80" y2="45" stroke="#ef4444" strokeWidth="1.2" />
        <line x1="50" y1="25" x2="110" y2="25" stroke="#0284c7" strokeWidth="1.2" />
        <circle cx="80" cy="25" r="2.5" fill="#d97706" />
        <text x="85" y="22" className="text-[7px] font-bold fill-amber-700">O</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szimmetriatípusok',
    subtitle: 'Tengelyes és középpontos tükrözés tulajdonságai, fix elemek és az orientáció megváltozása',
    range: '1–10. kérdés',
    focus: 'Fixpontok, fixegyenesek, körüljárási irány és egyenesek párhuzamossága',
    color: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-300 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    questions: [
      {
        id: 'q1',
        question: 'Tengelyes tükrözésnél mely pontok esnek egybe a saját tükörképükkel (fixpontok)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
            <circle cx="60" cy="45" r="3.5" fill="#ef4444" />
            <circle cx="100" cy="45" r="3.5" fill="#ef4444" />
            <circle cx="140" cy="45" r="3.5" fill="#ef4444" />
            <text x="185" y="48" className="text-[10px] font-bold fill-rose-600">t</text>
          </svg>
        ),
        options: [
          'A tükörtengely (t) összes pontja (végtelen sok fixpont)',
          'Egyetlenegy pont a tengely közepén',
          'Nincs egyetlen fixpontja sem',
          'A sík összes pontja'
        ],
        correctAnswer: 0,
        explanation: 'A tengelyes tükrözés definíciója szerint a tükörtengely bármely pontjának képe önmaga, így a tengely pontonként fix (végtelen sok fixpont van).',
        hint: 'Gondolj a tükör felületére: ami a tükör síkján van, az nem mozdul el.'
      },
      {
        id: 'q2',
        question: 'Hány fixpontja van a sík egy pontra vonatkozó középpontos tükrözésének?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="5" fill="#0d9488" />
            <text x="110" y="48" className="text-[12px] font-black fill-teal-800">O</text>
            <path d="M 75 45 A 25 25 0 0 1 125 45" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: ['Pontosan 1 fixpontja van (az O centrum)', '0 (nincs fixpontja)', '2 fixpontja van', 'Végtelen sok'],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözésnél kizárólag a tükörközéppont (centrum) megy át önmagába, minden más pont elmozdul a túloldalra.',
        hint: 'Csak a forgatás/tükrözés középpontja nem mozdul el a síkban.'
      },
      {
        id: 'q3',
        question: 'Mi történik egy síkidom körüljárási irányával (orientációjával) a sík tengelyes tükrözése során?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="100" y1="10" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="40,25 75,25 40,70" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
            <polygon points="160,25 125,25 160,70" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
            <text x="45" y="85" className="text-[9px] font-bold fill-amber-700">A ➔ B ➔ C (↺)</text>
            <text x="125" y="85" className="text-[9px] font-bold fill-rose-700">A' ➔ B' ➔ C' (↻)</text>
          </svg>
        ),
        options: [
          'Megfordul (pl. óramutató járásával ellentétesből egyezővé válik)',
          'Változatlanul megmarad',
          '90°-kal elfordul',
          'Attól függ, mekkora a síkidom'
        ],
        correctAnswer: 0,
        explanation: 'A tengelyes tükrözés irányításváltó (orientációt megfordító) transzformáció: ami balra volt, az a tükörképben jobbra kerül.',
        hint: 'Nézz a tükörbe: a jobb kezed a tükörképed bal kezének látszik!'
      },
      {
        id: 'q4',
        question: 'Mi történik a körüljárási iránnyal középpontos tükrözés esetén?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="4" fill="#0d9488" />
            <polygon points="40,25 75,25 40,65" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.8" />
            <polygon points="160,65 125,65 160,25" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
            <text x="40" y="80" className="text-[9px] font-bold fill-teal-700">↺ balra forog</text>
            <text x="125" y="80" className="text-[9px] font-bold fill-emerald-700">↺ balra forog</text>
          </svg>
        ),
        options: [
          'Megmarad (irányítástartó transzformáció)',
          'Megfordul',
          'Mindig óramutatóval egyező lesz',
          'Eltűnik a körüljárás'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a középpontos tükrözés egyenértékű egy síkbeli 180°-os elforgatással, a körüljárási irány megmarad.',
        hint: 'Ha egy papírlapot elforgatsz 180°-kal az asztalon anélkül, hogy megfordítanád, a körüljárás változatlan marad.'
      },
      {
        id: 'q5',
        question: 'Milyen helyzetű egy egyenes és a képe középpontos tükrözésnél, ha az egyenes nem megy át a centrumon?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="25" x2="180" y2="25" stroke="#0284c7" strokeWidth="2" />
            <circle cx="100" cy="45" r="4" fill="#0d9488" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <text x="185" y="28" className="text-[9px] font-bold fill-sky-700">e</text>
            <text x="185" y="68" className="text-[9px] font-bold fill-sky-700">e'</text>
            <text x="105" y="42" className="text-[9px] font-bold fill-teal-800">O</text>
          </svg>
        ),
        options: [
          'Mindig párhuzamosak egymással (e ∥ e\')',
          'Mindig merőlegesek egymásra',
          '45°-os szögben metszik egymást',
          'Egybeesnek egymással'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos tükrözés egyik legfontosabb alaptétele, hogy bármely centrumon át nem menő egyenes képe szigorúan párhuzamos az eredeti egyenessel.',
        hint: 'A 180°-os forgatás pontosan az ellenkező irányba, de párhuzamosan viszi az egyenest.'
      },
      {
        id: 'q6',
        question: 'Milyen geometriai mozgással modellezhető síkban a középpontos tükrözés?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="50" r="3.5" fill="#7c3aed" />
            <path d="M 60 50 A 40 40 0 0 1 140 50" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <polyline points="138,45 142,52 135,53" fill="#7c3aed" />
            <text x="90" y="35" className="text-[12px] font-black fill-purple-700">180°</text>
          </svg>
        ),
        options: ['180°-os síkbeli elforgatással a centrum körül', '90°-os elforgatással', '360°-os elforgatással', 'Párhuzamos eltolással'],
        correctAnswer: 0,
        explanation: 'A síkban a középpontos tükrözés teljesen azonos a pont körüli 180°-os elforgatással.',
        hint: 'Félfordulat: hány fokos szögnek felel meg az egyenesszög?'
      },
      {
        id: 'q7',
        question: 'Igaz-e, hogy a tengelyes és a középpontos tükrözés is távolságtartó és szögtartó transzformáció?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,65 75,65 55,25" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <polygon points="125,65 165,65 145,25" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="80" y="50" className="text-[14px] font-black fill-slate-700">≅</text>
          </svg>
        ),
        options: [
          'Igen, mindkettő egybevágósági transzformáció (izometria)',
          'Nem, csak a tengelyes tartja a távolságot',
          'Nem, csak a középpontos tartja a szögeket',
          'Egyik sem távolságtartó'
        ],
        correctAnswer: 0,
        explanation: 'Mindkét transzformáció egybevágóság: a szakaszok hossza és a szögek nagysága pontosan megegyezik a tükörképükkel.',
        hint: 'A tükrözés nem torzítja el az alakzat méreteit vagy formáját.'
      },
      {
        id: 'q8',
        question: 'Melyek a tengelyes tükrözés fixegyenesei (olyan egyenesek, amelyek önmagukba képződnek le)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="75" stroke="#0284c7" strokeWidth="2" />
            <rect x="100" y="45" width="8" height="8" fill="none" stroke="#64748b" strokeWidth="1" />
            <text x="185" y="48" className="text-[9px] font-bold fill-rose-600">t</text>
            <text x="105" y="25" className="text-[9px] font-bold fill-sky-700">e ⊥ t</text>
          </svg>
        ),
        options: [
          'A t tengely és minden olyan egyenes, amely merőleges a t tengelyre',
          'Csak maga a t tengely',
          'Minden egyenes, ami párhuzamos a t tengellyel',
          'A tengelyes tükrözésnek nincs fixegyenese'
        ],
        correctAnswer: 0,
        explanation: 'A t tengely pontonként fix, a rá merőleges egyenesek pedig átfordulnak önmagukba (a pontjaik helyet cserélnek, de a vonal maga fixegyenes marad).',
        hint: 'A merőleges egyenesen lévő pontok képe ugyanazon az egyenesen, a tengely túloldalán lesz.'
      },
      {
        id: 'q9',
        question: 'Melyek a középpontos tükrözés fixegyenesei?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="4" fill="#0d9488" />
            <line x1="25" y1="75" x2="175" y2="15" stroke="#16a34a" strokeWidth="2" />
            <line x1="30" y1="15" x2="170" y2="75" stroke="#16a34a" strokeWidth="2" />
            <text x="106" y="42" className="text-[10px] font-bold fill-teal-800">O</text>
          </svg>
        ),
        options: [
          'Minden olyan egyenes, amely átmegy az O centrumon',
          'Csak a vízszintes egyenesek',
          'Csak az O-ra merőleges egyenesek',
          'Nincs fixegyenese'
        ],
        correctAnswer: 0,
        explanation: 'Ha egy egyenes áthalad az O ponton, bármely pontjának képe szintén ezen az egyenesen lesz (az O túlsó oldalán), így az egyenes önmagába képződik le.',
        hint: 'Bármely egyenes, amely átmegy a tükörközépponton, önmagába fordul át.'
      },
      {
        id: 'q10',
        question: 'Ha egy síkidomnak van szimmetriatengelye, az mit jelent az alakzat szempontjából?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 150,75 50,75" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        ),
        options: [
          'A tengelyre tükrözve az alakzat pontosan önmagát fedi le',
          'Az alakzat fele akkora lesz',
          'Az alakzat elfordul 90 fokkal',
          'Az alakzat területe megduplázódik'
        ],
        correctAnswer: 0,
        explanation: 'Egy alakzat akkor tengelyesen szimmetrikus, ha létezik olyan egyenes, amelyre tükrözve a síkidom pontjainak összessége önmagával egybeesik.',
        hint: 'A tengely mentén félbehajtva a két fél pontosan fedi egymást.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Síkidomok és Négyszögek Szimmetriái',
    subtitle: 'Háromszögek, négyszögek, sokszögek szimmetriái és a kettős szimmetria tétele',
    range: '11–20. kérdés',
    focus: 'Paralelogramma, téglalap, rombusz, négyzet, deltoid, trapéz szimmetriái',
    color: 'teal',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-300 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    questions: [
      {
        id: 'q11',
        question: 'Hány szimmetriatengelye van az általános paralelogrammának?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,68 135,68 165,22 65,22" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <circle cx="100" cy="45" r="4" fill="#d97706" />
            <line x1="35" y1="68" x2="165" y2="22" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="65" y1="22" x2="135" y2="68" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        ),
        options: [
          '0 szimmetriatengelye van (viszont KÖZÉPPONTOSAN szimmetrikus!)',
          '2 szimmetriatengelye van (az átlói)',
          '4 szimmetriatengelye van',
          '1 szimmetriatengelye van'
        ],
        correctAnswer: 0,
        explanation: 'Gyakori tévhit! Az általános paralelogrammának egyetlen szimmetriatengelye sincs (az átlók mentén félbehajtva a csúcsok kilógnak). Viszont az átlók metszéspontjára középpontosan szimmetrikus!',
        hint: 'Hajts félbe egy ferde paralelogrammát az átlója mentén: fedik egymást a csúcsok?'
      },
      {
        id: 'q12',
        question: 'Hány szimmetriatengelye van a téglalapnak és mely egyenesek azok?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="35" y="25" width="130" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
            <line x1="20" y1="50" x2="180" y2="50" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
            <circle cx="100" cy="50" r="3" fill="#0284c7" />
          </svg>
        ),
        options: [
          '2 tengelye van: a szemközti oldalak felezőmerőlegesei',
          '2 tengelye van: az átlói',
          '4 tengelye van: az oldalfelezők és az átlók',
          'Nincs szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap szimmetriatengelyei a szemközti oldalak felezőmerőlegesei. Az átlói NEM szimmetriatengelyek (kivéve ha négyzet)!',
        hint: 'Egy A4-es papírlapot az oldalfelezők mentén hajtva pontosan fedik egymást a felek.'
      },
      {
        id: 'q13',
        question: 'Hány szimmetriatengelye van a rombusznak és mely egyenesek azok?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 165,45 100,75 35,45" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="5" x2="100" y2="85" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
            <circle cx="100" cy="45" r="3" fill="#7c3aed" />
          </svg>
        ),
        options: [
          '2 tengelye van: a két átlójának az egyenesei',
          '2 tengelye van: az oldalfelezők',
          '0 szimmetriatengelye van',
          '4 szimmetriatengelye van'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz átlói merőlegesen felezik egymást, és ezek mentén félbehajtva a csúcsok pontosan fedik egymást, így az átlók egyenesei a szimmetriatengelyek.',
        hint: 'A rombusznál az átlók felezik a belső szögeket is.'
      },
      {
        id: 'q14',
        question: 'Hány szimmetriatengelye és hány szimmetriaközéppontja van a négyzetnek?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="70" y="15" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <line x1="55" y1="45" x2="145" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="100" y1="5" x2="100" y2="85" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="60" y1="5" x2="140" y2="85" stroke="#f97316" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="60" y1="85" x2="140" y2="5" stroke="#f97316" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="100" cy="45" r="3" fill="#16a34a" />
          </svg>
        ),
        options: [
          '4 szimmetriatengelye és 1 szimmetriaközéppontja van',
          '2 szimmetriatengelye és 0 középpontja van',
          '8 szimmetriatengelye és 2 középpontja van',
          '2 szimmetriatengelye és 1 középpontja van'
        ],
        correctAnswer: 0,
        explanation: 'A négyzet egyszerre téglalap és rombusz is: rendelkezik a 2 oldalfelező tengellyel és a 2 átlós tengellyel is (összesen 4), metszéspontjuk pedig a szimmetriaközéppont.',
        hint: 'Egy négyzetes papírt 4 különböző módon lehet élre hajtani.'
      },
      {
        id: 'q15',
        question: 'Lehet-e egy háromszög középpontosan szimmetrikus?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="60,20 90,75 30,75" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="100" cy="45" r="3" fill="#ef4444" />
            <polygon points="140,70 110,15 170,15" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="75" y="85" className="text-[10px] font-bold fill-rose-600">Sosem fedhetik egymást!</text>
          </svg>
        ),
        options: [
          'Nem, egyetlen háromszög sem lehet középpontosan szimmetrikus',
          'Igen, a szabályos háromszög középpontos a súlypontjára',
          'Igen, a derékszögű háromszög az átfogó felezőpontjára',
          'Igen, minden egyenlő szárú háromszög középpontos'
        ],
        correctAnswer: 0,
        explanation: 'Egyetlen háromszög sem lehet középpontosan szimmetrikus! Bármely pontra tükrözve a háromszög csúcsa a túloldalra kerül, így a kép mindig ellenkező irányba mutat ("fejjel lefelé" áll), sosem eshet egybe az eredetivel.',
        hint: 'Középpontos tükrözésnél a csúcs átellenes párjának is a háromszög csúcsának kellene lennie, de a háromszögnek csak 3 csúcsa van!'
      },
      {
        id: 'q16',
        question: 'Hány szimmetriatengelye van a konvex deltoidnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 150,45 100,80 50,45" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
            <line x1="100" y1="5" x2="100" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <text x="105" y="20" className="text-[9px] font-bold fill-rose-600">főátló (t)</text>
          </svg>
        ),
        options: [
          'Pontosan 1 (a különböző hosszúságú oldalakat elválasztó főátló egyenese)',
          '2 (mindkét átlója tengely)',
          '0 (nem szimmetrikus)',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'A deltoidnak pontosan 1 szimmetriatengelye van: a szimmetriaátlója (főátlója). A másik átlója NEM szimmetriatengely (kivéve ha rombusz).',
        hint: 'A deltoid papírsárkány formájú, csak hossztengelye mentén hajtható félbe.'
      },
      {
        id: 'q17',
        question: 'Hány szimmetriatengelye van a szimmetrikus (húr)trapéznak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="65,25 135,25 160,70 40,70" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <text x="105" y="20" className="text-[9px] font-bold fill-rose-600">t</text>
          </svg>
        ),
        options: [
          'Pontosan 1 (a párhuzamos alapok közös felezőmerőlegese)',
          '2 szimmetriatengelye van',
          '0 szimmetriatengelye van',
          'Attól függ, mekkora a szárak hossza'
        ],
        correctAnswer: 0,
        explanation: 'A szimmetrikus trapéz egyetlen szimmetriatengellyel rendelkezik: ez a két párhuzamos alap közös felezőmerőlegese. Nincs szimmetriaközéppontja.',
        hint: 'Az alapok felezőpontjait összekötő egyenes merőleges az alapokra.'
      },
      {
        id: 'q18',
        question: 'Mit mond ki a kettős szimmetria alaptétele?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="45" x2="170" y2="45" stroke="#ef4444" strokeWidth="1.8" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#0284c7" strokeWidth="1.8" />
            <rect x="100" y="45" width="8" height="8" fill="none" stroke="#64748b" strokeWidth="1" />
            <circle cx="100" cy="45" r="4" fill="#d97706" />
            <text x="108" y="40" className="text-[10px] font-black fill-amber-700">O (centrum!)</text>
          </svg>
        ),
        options: [
          'Ha egy alakzatnak van 2 egymásra merőleges tengelye, akkor a metszéspontjuk szimmetriaközéppont',
          'Minden tengelyesen szimmetrikus alakzat középpontos is',
          'Ha 2 tengely van, azok sosem lehetnek merőlegesek',
          'Két tengely esetén a síkidom szabályos sokszög'
        ],
        correctAnswer: 0,
        explanation: 'Két egymásra merőleges egyenesre vett egymás utáni tengelyes tükrözés (90° + 90° = 180°) elforgatásnak felel meg a metszéspont körül, így a metszéspont szimmetriaközéppont!',
        hint: 'Ezért középpontosan szimmetrikus a téglalap, a rombusz és a négyzet is!'
      },
      {
        id: 'q19',
        question: 'Hány szimmetriatengelye van a szabályos háromszögnek?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 155,75 45,75" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="40" y1="78" x2="135" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="160" y1="78" x2="65" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: ['3 szimmetriatengelye van (a 3 oldalfelező merőleges)', '1 szimmetriatengelye van', '6 szimmetriatengelye van', '0'],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög mindhárom oldala és szöge egyenlő, így mindhárom oldalfelező merőlegese (amelyek egyben a csúcsokból induló szögfelezők és magasságok) szimmetriatengely.',
        hint: 'Minden csúcsból húzható egy szimmetriatengely a szemközti oldal felé.'
      },
      {
        id: 'q20',
        question: 'Miért NEM középpontosan szimmetrikus a szabályos háromszög a középpontjára?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 155,75 45,75" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="100" cy="55" r="3.5" fill="#7c3aed" />
            <text x="65" y="85" className="text-[9px] font-bold fill-slate-600">120°-ra fedi, de 180°-ra fejre áll!</text>
          </svg>
        ),
        options: [
          'Mert 180°-os forgatásra fejjel lefelé áll (csak 120°-os forgásszimmetriája van)',
          'Mert a csúcsai nem egyenlő távol vannak',
          'Mert nincs belső pontja',
          'Középpontosan szimmetrikus'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög 120°-os forgatásra önmagába megy át, de a középpontos tükrözés 180°-os forgatást jelent, amelyre a háromszög fejjel lefelé fordul!',
        hint: 'A középpontos szimmetria szigorúan 180°-os forgást jelent.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kettős Szimmetria, Koordináták és Logika',
    subtitle: 'Koordinátatranszformációk, betűk szimmetriái és összetett szimmetriafeladatok',
    range: '21–30. kérdés',
    focus: 'Koordináták tükrözése, betűk és sokszögek szimmetriái, logikai következtetések',
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    questions: [
      {
        id: 'q21',
        question: 'A P(4; -3) pontot tükrözzük az x-tengelyre. Mik lesznek a P\' tükörkép koordinátái?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="45" x2="180" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="140" cy="70" r="3.5" fill="#0284c7" />
            <circle cx="140" cy="20" r="3.5" fill="#ef4444" />
            <text x="145" y="75" className="text-[9px] font-bold fill-sky-700">P(4; -3)</text>
            <text x="145" y="20" className="text-[9px] font-bold fill-rose-700">P' = ?</text>
          </svg>
        ),
        options: ['P\'(4; 3)', 'P\'(-4; -3)', 'P\'(-4; 3)', 'P\'(3; -4)'],
        correctAnswer: 0,
        explanation: 'Az x-tengelyre tükrözve az x-koordináta változatlan marad, az y-koordináta pedig az ellentettjére változik: P\'(4; -(-3)) = P\'(4; 3).',
        hint: 'Az x tengelyre vett tükrözésnél csak a függőleges (y) előjel váltódik.'
      },
      {
        id: 'q22',
        question: 'A Q(-5; 2) pontot tükrözzük a derékszögű koordinátarendszer origójára (0; 0). Mik a Q\' koordinátái?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="45" x2="180" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="50" cy="25" r="3.5" fill="#0284c7" />
            <circle cx="150" cy="65" r="3.5" fill="#16a34a" />
            <circle cx="100" cy="45" r="2.5" fill="#64748b" />
            <text x="35" y="20" className="text-[9px] font-bold fill-sky-700">Q(-5; 2)</text>
            <text x="155" y="70" className="text-[9px] font-bold fill-emerald-700">Q' = ?</text>
          </svg>
        ),
        options: ['Q\'(5; -2)', 'Q\'(-5; -2)', 'Q\'(5; 2)', 'Q\'(2; -5)'],
        correctAnswer: 0,
        explanation: 'Az origóra vett középpontos tükrözésnél mindkét koordináta az ellentettjére változik: (-5) ➔ 5, és 2 ➔ -2, így Q\'(5; -2).',
        hint: 'Középpontos tükrözés origóra: (x; y) ➔ (-x; -y).'
      },
      {
        id: 'q23',
        question: 'Egy A pontot először tükrözünk az x-tengelyre, majd a kapott képet az y-tengelyre. Milyen egyetlen transzformációval kaphatjuk meg közvetlenül a végeredményt?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="100" cy="45" r="4" fill="#d97706" />
            <text x="105" y="40" className="text-[9px] font-bold fill-amber-700">Origó</text>
            <text x="25" y="85" className="text-[8px] font-bold fill-slate-700">Rx ∘ Ry = So</text>
          </svg>
        ),
        options: [
          'Az origóra vett középpontos tükrözéssel',
          'Egy 90°-os elforgatással',
          'Egy eltolással',
          'Az y = x egyenesre vett tükrözéssel'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az x és y tengelyek egymásra merőlegesek, a két tengelyes tükrözés egymásutánja (kompozíciója) megegyezik a metszéspontjukra (az origóra) vett középpontos tükrözéssel.',
        hint: '(x; y) ➔ (x; -y) ➔ (-x; -y), ami pontosan az origóra vett tükörkép.'
      },
      {
        id: 'q24',
        question: 'Melyik nyomtatott nagybetű rendelkezik CSAK középpontos szimmetriával (tengelyes szimmetriája nincs)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <text x="35" y="55" className="text-[28px] font-black fill-teal-700">S</text>
            <text x="80" y="55" className="text-[28px] font-black fill-slate-700">A</text>
            <text x="125" y="55" className="text-[28px] font-black fill-slate-700">E</text>
            <text x="165" y="55" className="text-[28px] font-black fill-slate-700">M</text>
          </svg>
        ),
        options: ['S (és N, Z)', 'A', 'E', 'M'],
        correctAnswer: 0,
        explanation: 'Az S, N, Z betűk 180°-kal elforgatva önmagukba mennek át (középpontosak), de egyetlen szimmetriatengelyük sincs.',
        hint: 'Fordítsd fejjel lefelé a képernyőt: az S betű újra rendes S betűként olvasható!'
      },
      {
        id: 'q25',
        question: 'Melyik nyomtatott nagybetű rendelkezik KÉT szimmetriatengellyel ÉS szimmetriaközépponttal is?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <text x="40" y="55" className="text-[28px] font-black fill-purple-700">H</text>
            <line x1="30" y1="42" x2="65" y2="42" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="47.5" y1="20" x2="47.5" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
            <text x="90" y="55" className="text-[28px] font-black fill-slate-700">T</text>
            <text x="135" y="55" className="text-[28px] font-black fill-slate-700">C</text>
          </svg>
        ),
        options: ['H (és I, O, X)', 'T', 'C', 'V'],
        correctAnswer: 0,
        explanation: 'A H betűnek van egy függőleges és egy vízszintes szimmetriatengelye is. Mivel ezek merőlegesek, metszéspontjuk szimmetriaközéppont.',
        hint: 'A T betűnek csak 1 függőleges, a C-nek csak 1 vízszintes tengelye van.'
      },
      {
        id: 'q26',
        question: 'Hány szimmetriatengelye és van-e szimmetriaközéppontja egy szabályos 8-szögnek (oktogonnak)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,12 125,22 135,47 125,72 100,82 75,72 65,47 75,22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
            <circle cx="100" cy="47" r="3.5" fill="#16a34a" />
          </svg>
        ),
        options: [
          '8 szimmetriatengelye van és KÖZÉPPONTOSAN is szimmetrikus',
          '4 szimmetriatengelye van és nem középpontos',
          '8 szimmetriatengelye van, de nincs centruma',
          '16 szimmetriatengelye van'
        ],
        correctAnswer: 0,
        explanation: 'Egy szabályos n-szögnek n darab szimmetriatengelye van. Mivel n = 8 PÁROS szám, a szemközti csúcsok és oldalfelezők egymás tükörképei, így van szimmetriaközéppontja is!',
        hint: 'Minden páros oldalszámú szabályos sokszögnek van szimmetriaközéppontja.'
      },
      {
        id: 'q27',
        question: 'Van-e szimmetriaközéppontja egy szabályos 5-szögnek (pentagonnak)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 140,45 125,80 75,80 60,45" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="100" cy="53" r="3" fill="#ef4444" />
            <text x="65" y="88" className="text-[8px] font-bold fill-rose-600">Páratlan oldalszám: nincs centrum!</text>
          </svg>
        ),
        options: [
          'Nincs, mert páratlan az oldalszáma (csúcs szemközti csúcsba kéne menjen)',
          'Igen, a köré írt kör középpontja a centrum',
          'Igen, minden szabályos sokszög középpontos',
          'Csak akkor, ha az oldalai 5 cm-nél nagyobbak'
        ],
        correctAnswer: 0,
        explanation: 'A páratlan oldalszámú szabályos sokszögek (3-szög, 5-szög, 7-szög stb.) egyike sem rendelkezik szimmetriaközépponttal, mert egy csúcs átellenes párja mindig egy oldal felezőpontja, nem pedig egy másik csúcs!',
        hint: 'Páratlan csúcsszám esetén nincs mindenkinek átellenes csúcspárja.'
      },
      {
        id: 'q28',
        question: 'Egy konvex négyszögnek mindkét átlója szimmetriatengely. Milyen négyszög lehet ez biztosan?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 160,45 100,75 40,45" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="8" x2="100" y2="82" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="30" y1="45" x2="170" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: ['Rombusz (vagy négyzet)', 'Téglalap', 'Általános trapéz', 'Deltoid'],
        correctAnswer: 0,
        explanation: 'Ha egy négyszögnek mindkét átlója szimmetriatengely, akkor mind a 4 oldala egyenlő hosszúságú kell legyen, tehát a négyszög szükségképpen rombusz (speciális esetben négyzet).',
        hint: 'A téglalapnak nem tengelyei az átlók, a deltoidnak pedig csak egy átlója az.'
      },
      {
        id: 'q29',
        question: 'Egy konvex négyszögnek a szemközti oldalak felezőmerőlegesei a szimmetriatengelyei. Milyen négyszög ez?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="40" y="25" width="120" height="45" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <line x1="100" y1="12" x2="100" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="25" y1="47.5" x2="175" y2="47.5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        options: ['Téglalap (vagy négyzet)', 'Rombusz', 'Deltoid', 'Általános paralelogramma'],
        correctAnswer: 0,
        explanation: 'Ha a szemközti oldalak felezőmerőlegesei szimmetriatengelyek, akkor a négyszög minden szöge egyenlő (90°), tehát téglalap (vagy speciálisan négyzet).',
        hint: 'A téglalap oldalfelezői merőlegesek az oldalakra.'
      },
      {
        id: 'q30',
        question: 'Hány szimmetriatengelye és hány szimmetriaközéppontja van egy körlapnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="32" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
            <line x1="68" y1="45" x2="132" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="100" y1="13" x2="100" y2="77" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="77" y1="22" x2="123" y2="68" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 1" />
            <circle cx="100" cy="45" r="3" fill="#a21caf" />
            <text x="105" y="42" className="text-[9px] font-bold fill-fuchsia-900">O</text>
          </svg>
        ),
        options: [
          'Végtelen sok szimmetriatengelye (minden átmérő) és 1 szimmetriaközéppontja van',
          '4 szimmetriatengelye és 1 középpontja van',
          'Végtelen sok középpontja és 1 tengelye van',
          'Nincs szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'A kör a legszimmetrikusabb síkidom: a középpontján átmenő bármely egyenes (átmérő) szimmetriatengely (végtelen sok), és a kör középpontja szimmetriaközéppont.',
        hint: 'A kör bármely átmérője mentén félbehajtható.'
      }
    ]
  }
};

export const SymmetryComparisonQuiz: React.FC<SymmetryComparisonQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-symmetry-quiz"
      documentId="7_osztaly_kozeppontos_es_tengelyes_szimmetria_kviz"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      title="Középpontos és tengelyes szimmetria Kvíz"
      topicTitle="8. Középpontos és tengelyes szimmetria"
      subtitle="30 feladat (3 szinten 10-10 kérdés): Szimmetriatípusok, fix elemek, alakzatok és síkidomok szimmetriái"
      themeColor="violet"
      pdfFilename="7_osztaly_kozeppontos_es_tengelyes_szimmetria_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetCards={cheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={<SymmetryComparisonMatcher onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SymmetryComparisonSorter onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
};

export default SymmetryComparisonQuiz;
