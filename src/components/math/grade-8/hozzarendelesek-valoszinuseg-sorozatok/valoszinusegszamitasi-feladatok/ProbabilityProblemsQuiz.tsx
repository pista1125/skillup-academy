import React from 'react';
import { QuizTemplate, LevelConfig, DifficultyLevel, CheatSheetCard } from '../QuizTemplate';
import { ProbabilityProblemsMatcher } from './ProbabilityProblemsMatcher';
import { ProbabilityProblemsSorter } from './ProbabilityProblemsSorter';
import { ArrowRightLeft, LayoutGrid, Brain, Dices, Trophy, HelpCircle, Sparkles, Scale, TrendingUp, GitBranch } from 'lucide-react';

interface ProbabilityProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Két Kocka 36 Esetének Mátrixa',
    icon: <Dices className="w-4 h-4 text-rose-600" />,
    formula: 'n = 6 \\times 6 = 36, \\quad P(\\text{Összeg = 7}) = \\frac{6}{36} = \\frac{1}{6}',
    note: 'Az összeg 2 és 12 között változik. A 7 összeg a leggyakoribb (6 pár), a 2 és 12 a legritkább (1-1 pár). Dupla dobás esélye: 6/36 = 1/6.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="130" height="30" rx="4" fill="#fff1f2" stroke="#fecdd3" />
        <text x="80" y="24" className="text-[7px] font-bold fill-rose-900" textAnchor="middle">6 × 6 = 36 elemi kimenetel</text>
        <text x="80" y="34" className="text-[6px] fill-rose-700" textAnchor="middle">Összeg ≥ 10: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) → 6/36</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Fa-diagram & Szorzási Szabály',
    icon: <GitBranch className="w-4 h-4 text-rose-600" />,
    formula: 'P(A \\cap B) = P(A) \\cdot P(B|A), \\quad P(\\text{Ágak összege}) = \\sum P_i',
    note: 'Egy ágon haladva az élekre írt valószínűségeket összeszorozzuk („ÉS”). A kedvező alternatív ágakat pedig összeadjuk („VAGY”).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="25" cy="25" r="4" fill="#f43f5e" />
        <line x1="29" y1="23" x2="65" y2="15" stroke="#fb7185" strokeWidth="1.5" />
        <line x1="29" y1="27" x2="65" y2="35" stroke="#fb7185" strokeWidth="1.5" />
        <circle cx="68" cy="15" r="3" fill="#fda4af" />
        <circle cx="68" cy="35" r="3" fill="#fda4af" />
        <text x="47" y="13" className="text-[5.5px] font-bold fill-rose-800">p₁</text>
        <text x="47" y="39" className="text-[5.5px] font-bold fill-rose-800">p₂</text>
        <text x="110" y="27" className="text-[6.5px] font-black fill-rose-950">Ágon szorzunk!</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Visszatevéssel vs. Visszatevés Nélkül',
    icon: <Brain className="w-4 h-4 text-rose-600" />,
    formula: '\\text{Visszatevés nélkül: } n \\to n-1, \\quad k \\to k-1',
    note: 'Visszatevéssel a kísérletek függetlenek, a nevező nem változik. Visszatevés nélkül a második lépésben a nevező és a golyók száma is 1-gyel kevesebb.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="58" height="30" rx="4" fill="#ecfdf5" stroke="#a7f3d0" />
        <text x="44" y="23" className="text-[6px] font-bold fill-emerald-900" textAnchor="middle">Visszatevéssel</text>
        <text x="44" y="33" className="text-[5.5px] fill-emerald-700" textAnchor="middle">k/n · k/n (Független)</text>

        <rect x="87" y="10" width="58" height="30" rx="4" fill="#fff7ed" stroke="#fed7aa" />
        <text x="116" y="23" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">Visszatevés Nélkül</text>
        <text x="116" y="33" className="text-[5.5px] fill-amber-700" textAnchor="middle">k/n · (k-1)/(n-1)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'A Komplementer („Legalább Egy”) Módszer',
    icon: <Sparkles className="w-4 h-4 text-rose-600" />,
    formula: 'P(\\text{Legalább egy}) = 1 - P(\\text{Egyik sem})',
    note: 'Két kockával legalább egy 6-os: 1 - (5/6 · 5/6) = 1 - 25/36 = 11/36 (30,6%). Három kockával: 1 - 125/216 = 91/216 (42,1%).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="4" fill="#fdf2f8" stroke="#fbcfe8" />
        <text x="80" y="22" className="text-[7px] font-black fill-pink-950" textAnchor="middle">1 - P(Egyik sem)</text>
        <text x="80" y="33" className="text-[6px] font-bold fill-pink-700" textAnchor="middle">Sokkal gyorsabb, mint az összes részeset összeadása!</text>
      </svg>
    )
  }
];

// --- 1. SZINT: KÉT KOCKA ÉS KÉTLÉPÉSES ALAPOK (10 KÉRDÉS) ---
const level1Questions: LevelConfig['questions'] = [
  {
    id: 'pr-l1-q1',
    title: 'Két kocka összege legalább 10',
    prompt: 'Két szabályos dobókockával dobunk egyszerre. Mekkora a valószínűsége, hogy a dobott pontok összege LEGALÁBB 10 (azaz 10, 11 vagy 12)?',
    options: [
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '3 / 36 = 1 / 12 ≈ 8,3%',
      '10 / 36 ≈ 27,8%',
      '4 / 36 = 1 / 9 ≈ 11,1%'
    ],
    correctAnswer: 0,
    explanation: 'A kedvező számpárok a 36-ból: Összeg 10: (4,6), (5,5), (6,4) [3 db]; Összeg 11: (5,6), (6,5) [2 db]; Összeg 12: (6,6) [1 db]. Összesen 3 + 2 + 1 = 6 kedvező eset. P = 6 / 36 = 1 / 6.',
    highlightValue: '6 / 36 = 1 / 6'
  },
  {
    id: 'pr-l1-q2',
    title: 'Két kocka: Dupla dobása',
    prompt: 'Két szabályos dobókockával dobunk. Mekkora az esélye annak, hogy mindkét kockán AZONOS szám szerepel (duplát dobunk)?',
    options: [
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '1 / 36 ≈ 2,8%',
      '2 / 36 = 1 / 18 ≈ 5,6%',
      '12 / 36 = 1 / 3 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'A lehetséges duplák a főátlóban vannak: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) – pontosan 6 db a 36-ból. P = 6 / 36 = 1 / 6.',
    highlightValue: '1 / 6'
  },
  {
    id: 'pr-l1-q3',
    title: 'Golyóhúzás visszatevéssel',
    prompt: 'Egy dobozban 4 piros és 6 fehér golyó van. Kihúzunk egyet, VISSZATESSZÜK, majd újra húzunk egyet. Mekkora az esélye, hogy mindkét golyó piros lesz?',
    options: [
      '16 / 100 = 4 / 25 = 16%',
      '12 / 90 = 2 / 15 ≈ 13,3%',
      '8 / 20 = 40%',
      '4 / 10 = 40%'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevéssel mindkét húzásnál azonosak az esélyek: P(1. piros) = 4/10, P(2. piros) = 4/10. A szorzási szabály szerint: (4/10) · (4/10) = 16/100 = 16%.',
    highlightValue: '16%'
  },
  {
    id: 'pr-l1-q4',
    title: 'Golyóhúzás visszatevés nélkül',
    prompt: 'Egy dobozban 4 piros és 6 fehér golyó van. Egymás után kihúzunk 2 golyót VISSZATEVÉS NÉLKÜL. Mekkora a valószínűsége, hogy mindkét golyó piros lesz?',
    options: [
      '12 / 90 = 2 / 15 ≈ 13,3%',
      '16 / 100 = 16%',
      '8 / 90 ≈ 8,9%',
      '4 / 19 ≈ 21,1%'
    ],
    correctAnswer: 0,
    explanation: '1. húzásnál: 4 piros a 10-ből (4/10). A 2. húzásnál már csak 3 piros és 9 összes golyó van (3/9). P = (4/10) · (3/9) = 12/90 = 2/15 ≈ 13,3%.',
    highlightValue: '2 / 15 (≈ 13,3%)'
  },
  {
    id: 'pr-l1-q5',
    title: 'Háromszori pénzfeldobás',
    prompt: 'Háromszor feldobunk egy szabályos pénzérmét. Mekkora a valószínűsége, hogy PONTOSAN KÉT FEJET kapunk?',
    options: [
      '3 / 8 = 37,5%',
      '2 / 3 ≈ 66,7%',
      '1 / 8 = 12,5%',
      '2 / 8 = 1 / 4 = 25%'
    ],
    correctAnswer: 0,
    explanation: 'Összes kimenetel száma 2³ = 8. A pontosan két fej esetei: (F,F,Í), (F,Í,F), (Í,F,F) – összesen 3 db kedvező sorozat. P = 3 / 8 = 37,5%.',
    highlightValue: '3 / 8 (37,5%)'
  },
  {
    id: 'pr-l1-q6',
    title: 'Magyar kártya: Piros vagy Király',
    prompt: 'Egy 32 lapos magyar kártyacsomagból kihúzunk egy lapot. Mennyi a valószínűsége, hogy a húzott lap PIROS SZÍNŰ VAGY KIRÁLY?',
    options: [
      '11 / 32 ≈ 34,4%',
      '12 / 32 = 3 / 8 = 37,5%',
      '8 / 32 = 25%',
      '4 / 32 = 12,5%'
    ],
    correctAnswer: 0,
    explanation: 'Piros lapok száma: 8 db (köztük a piros király). Nem piros királyok: 3 db (tök, zöld, makk király). Kedvező esetek összege: 8 + 3 = 11 db. P = 11 / 32 ≈ 34,4%.',
    highlightValue: '11 / 32'
  },
  {
    id: 'pr-l1-q7',
    title: 'Legalább egy 6-os két kockával',
    prompt: 'Két szabályos dobókockával dobva mekkora az esélye annak, hogy LEGALÁBB EGYETLEN 6-ost dobunk?',
    options: [
      '11 / 36 ≈ 30,6%',
      '1 / 6 ≈ 16,7%',
      '2 / 6 = 1 / 3 ≈ 33,3%',
      '12 / 36 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett esemény: egyik kockával sem dobunk 6-ost (5 · 5 = 25 eset). P = 1 - 25/36 = 11/36 ≈ 30,6%.',
    highlightValue: '11 / 36'
  },
  {
    id: 'pr-l1-q8',
    title: 'Két kocka összege pontosan 7',
    prompt: 'Két dobókockával dobva mekkora annak a valószínűsége, hogy a dobott számok összege PONTOSAN 7 lesz?',
    options: [
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '1 / 11 ≈ 9,1%',
      '7 / 36 ≈ 19,4%',
      '5 / 36 ≈ 13,9%'
    ],
    correctAnswer: 0,
    explanation: 'A 7 összeghez vezető párok: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) – pontosan 6 db a 36-ból. P = 6 / 36 = 1 / 6.',
    highlightValue: '1 / 6'
  },
  {
    id: 'pr-l1-q9',
    title: 'Fa-diagram alapelve',
    prompt: 'Mit kell tenni a fa-diagram egyetlen ágán lévő egymást követő valószínűségekkel a végső kimenetel esélyének kiszámításához?',
    options: [
      'Össze kell szorozni őket (szorzási szabály)',
      'Össze kell adni őket (összeadási szabály)',
      'Ki kell vonni a másodikat az elsőből',
      'El kell osztani az elsőt a másodikkal'
    ],
    correctAnswer: 0,
    explanation: 'Az egymást követő lépések valószínűségeit egy ágon haladva össze kell szorozni: P(A és B) = P(A) · P(B|A).',
    highlightValue: 'Összeszorozni'
  },
  {
    id: 'pr-l1-q10',
    title: 'PIN-kód generálás',
    prompt: 'Egy bankkártya 4 jegyű PIN-kódját véletlenszerűen generálják a számjegyekből (0-9). Hány különböző PIN-kód létezik összesen?',
    options: [
      '10 000 (10 · 10 · 10 · 10 = 10⁴)',
      '40 (4 · 10)',
      '5 040 (10 · 9 · 8 · 7)',
      '1 000 (10³)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a számjegyek ismétlődhetnek (visszatevéses modell), mind a 4 pozícióra 10-féle számjegy kerülhet: 10⁴ = 10 000.',
    highlightValue: '10 000'
  }
];

// --- 2. SZINT: ÖSSZETETT FELADATOK ÉS FELTÉTELES ESEMÉNYEK (10 KÉRDÉS) ---
const level2Questions: LevelConfig['questions'] = [
  {
    id: 'pr-l2-q1',
    title: 'Két kocka összege prím',
    prompt: 'Két szabályos dobókockával dobunk. Mekkora az esélye, hogy a dobott számok összege PRÍMSZÁM lesz (2, 3, 5, 7 vagy 11)?',
    options: [
      '15 / 36 = 5 / 12 ≈ 41,7%',
      '12 / 36 = 1 / 3 ≈ 33,3%',
      '18 / 36 = 1 / 2 = 50%',
      '5 / 36 ≈ 13,9%'
    ],
    correctAnswer: 0,
    explanation: 'A prím összegek kedvező esetei: Összeg 2: (1,1) [1]; Összeg 3: (1,2),(2,1) [2]; Összeg 5: (1,4),(2,3),(3,2),(4,1) [4]; Összeg 7: (1,6)..(6,1) [6]; Összeg 11: (5,6),(6,5) [2]. Összesen: 1 + 2 + 4 + 6 + 2 = 15 eset. P = 15 / 36 = 5 / 12.',
    highlightValue: '5 / 12 (≈ 41,7%)'
  },
  {
    id: 'pr-l2-q2',
    title: 'Két kocka szorzata páratlan',
    prompt: 'Két kockával dobva mekkora a valószínűsége, hogy a dobott számok SZORZATA PÁRATLAN szám lesz?',
    options: [
      '9 / 36 = 1 / 4 = 25%',
      '18 / 36 = 1 / 2 = 50%',
      '27 / 36 = 3 / 4 = 75%',
      '1 / 6 ≈ 16,7%'
    ],
    correctAnswer: 0,
    explanation: 'A szorzat csak akkor páratlan, ha mindkét dobás páratlan (1, 3 vagy 5). 3 · 3 = 9 ilyen pár létezik a 36-ból. P = 9 / 36 = 1 / 4 = 25%.',
    highlightValue: '1 / 4 (25%)'
  },
  {
    id: 'pr-l2-q3',
    title: 'Két kocka szorzata páros',
    prompt: 'Két kockával dobva mekkora a valószínűsége, hogy a dobott számok SZORZATA PÁROS szám lesz?',
    options: [
      '27 / 36 = 3 / 4 = 75%',
      '18 / 36 = 1 / 2 = 50%',
      '9 / 36 = 1 / 4 = 25%',
      '30 / 36 = 5 / 6 ≈ 83,3%'
    ],
    correctAnswer: 0,
    explanation: 'Használjuk az ellentett eseményt! A páros szorzat ellentettje a páratlan szorzat (aminek az esélye 1/4). P = 1 - 1/4 = 3/4 = 27/36 = 75%.',
    highlightValue: '3 / 4 (75%)'
  },
  {
    id: 'pr-l2-q4',
    title: 'Urna: Különböző színű golyók visszatevés nélkül',
    prompt: 'Egy urnában 5 piros és 5 kék golyó található. Visszatevés nélkül kihúzunk 2 golyót. Mekkora a valószínűsége, hogy KÜLÖNBÖZŐ színűek lesznek?',
    options: [
      '50 / 90 = 5 / 9 ≈ 55,6%',
      '25 / 100 = 25%',
      '1 / 2 = 50%',
      '40 / 90 = 4 / 9 ≈ 44,4%'
    ],
    correctAnswer: 0,
    explanation: 'Két ág kedvez: Piros-Kék (5/10 · 5/9 = 25/90) vagy Kék-Piros (5/10 · 5/9 = 25/90). Összeadva: 25/90 + 25/90 = 50/90 = 5/9 ≈ 55,6%.',
    highlightValue: '5 / 9 (≈ 55,6%)'
  },
  {
    id: 'pr-l2-q5',
    title: 'Urna: Azonos színű golyók visszatevés nélkül',
    prompt: 'Egy urnában 5 piros és 5 kék golyó található. Visszatevés nélkül kihúzunk 2 golyót. Mekkora az esélye, hogy AZONOS színűek lesznek (mindkettő piros vagy mindkettő kék)?',
    options: [
      '40 / 90 = 4 / 9 ≈ 44,4%',
      '50 / 90 = 5 / 9 ≈ 55,6%',
      '20 / 100 = 20%',
      '1 / 2 = 50%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett eseménnyel: 1 - P(különböző) = 1 - 5/9 = 4/9. Vagy közvetlenül: P(PP) + P(KK) = (5/10 · 4/9) + (5/10 · 4/9) = 20/90 + 20/90 = 40/90 = 4/9.',
    highlightValue: '4 / 9 (≈ 44,4%)'
  },
  {
    id: 'pr-l2-q6',
    title: 'Magyar kártya: Két lap visszatevés nélkül',
    prompt: 'A 32 lapos magyar kártyából kihúzunk egymás után 2 lapot visszatevés nélkül. Mekkora az esélye, hogy MINDKÉT lap ÁSZ lesz?',
    options: [
      '12 / 992 = 3 / 248 ≈ 1,21%',
      '16 / 1024 ≈ 1,56%',
      '4 / 32 = 12,5%',
      '2 / 32 = 6,25%'
    ],
    correctAnswer: 0,
    explanation: '1. húzás: 4 ász a 32-ből (4/32). 2. húzás: már csak 3 ász van 31 lapból (3/31). P = (4/32) · (3/31) = 12 / 992 = 3 / 248 ≈ 1,21%.',
    highlightValue: '3 / 248 (≈ 1,21%)'
  },
  {
    id: 'pr-l2-q7',
    title: 'Három érmével legalább egy fej',
    prompt: 'Háromszor feldobunk egy pénzérmét. Mekkora az esélye annak, hogy LEGALÁBB EGY fejet kapunk?',
    options: [
      '7 / 8 = 87,5%',
      '1 / 8 = 12,5%',
      '3 / 8 = 37,5%',
      '1 / 2 = 50%'
    ],
    correctAnswer: 0,
    explanation: 'A legalább egy fej ellentettje az, hogy egyetlen fejet sem dobunk, azaz mind a három írás (Í,Í,Í). Ennek esélye 1/8. P = 1 - 1/8 = 7/8 = 87,5%.',
    highlightValue: '7 / 8 (87,5%)'
  },
  {
    id: 'pr-l2-q8',
    title: 'Két kocka különbsége',
    prompt: 'Két kockával dobva mekkora annak az esélye, hogy a nagyobb és kisebb dobott szám KÜLÖNBSÉGE 0 lesz?',
    options: [
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '0% (lehetetlen)',
      '1 / 36 ≈ 2,8%',
      '12 / 36 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'A különbség akkor 0, ha a két dobott szám egyenlő (duplát dobunk). Ez a 6 dupla pár: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). P = 6 / 36 = 1 / 6.',
    highlightValue: '1 / 6'
  },
  {
    id: 'pr-l2-q9',
    title: 'Három kockával dobva: Legalább egy 6-os',
    prompt: 'Három szabályos dobókockával egyszerre dobunk. Mekkora az esélye, hogy LEGALÁBB egy 6-ost dobunk?',
    options: [
      '91 / 216 ≈ 42,1%',
      '1 / 2 = 50%',
      '3 / 6 = 50%',
      '125 / 216 ≈ 57,9%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett esemény: egyik kockával sem dobunk 6-ost (mindegyiknél 5 lehetőség van a 6-ból). P(egyik sem 6) = (5/6)³ = 125 / 216. P(legalább egy 6) = 1 - 125/216 = 91 / 216 ≈ 42,1%.',
    highlightValue: '91 / 216 (≈ 42,1%)'
  },
  {
    id: 'pr-l2-q10',
    title: 'Céllövészet egymást követő lövésekkel',
    prompt: 'Egy sportlövő 80%-os (0,8) biztonsággal találja el a céltáblát. Két független lövést ad le. Mekkora a valószínűsége, hogy MINDKÉT lövésével talál?',
    options: [
      '0,64 (64%)',
      '0,80 (80%)',
      '1,60 (160%)',
      '0,16 (16%)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a lövések függetlenek, szorzási szabály érvényes: P(mindkettő talál) = 0,8 · 0,8 = 0,64 = 64%.',
    highlightValue: '64%'
  }
];

// --- 3. SZINT: HALADÓ VALÓSZÍNŰSÉGI PROBLÉMÁK ÉS KOMBINATORIKA (10 KÉRDÉS) ---
const level3Questions: LevelConfig['questions'] = [
  {
    id: 'pr-l3-q1',
    title: 'Négy érme: Pontosan 2 fej és 2 írás',
    prompt: 'Négy szabályos pénzérmét feldobunk. Mekkora a valószínűsége, hogy PONTOSAN 2 fej és 2 írás lesz az eredmény?',
    options: [
      '6 / 16 = 3 / 8 = 37,5%',
      '2 / 4 = 50%',
      '4 / 16 = 25%',
      '8 / 16 = 50%'
    ],
    correctAnswer: 0,
    explanation: 'Összes lehetséges kimenetel 2⁴ = 16. A két fej elhelyezésének száma 4 helyre: 4 alatt a 2 = (4 · 3) / 2 = 6 eset. P = 6 / 16 = 3 / 8 = 37,5%.',
    highlightValue: '3 / 8 (37,5%)'
  },
  {
    id: 'pr-l3-q2',
    title: 'Négy érme: Legalább egy fej',
    prompt: 'Négy szabályos pénzérmét dobva mekkora annak az esélye, hogy LEGALÁBB EGY fejet dobunk?',
    options: [
      '15 / 16 = 93,75%',
      '4 / 16 = 25%',
      '1 / 16 = 6,25%',
      '7 / 8 = 87,5%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett: mind a 4 érmével írást dobunk (1/16). P(legalább egy fej) = 1 - 1/16 = 15/16 = 93,75%.',
    highlightValue: '15 / 16 (93,75%)'
  },
  {
    id: 'pr-l3-q3',
    title: 'Születési sorrend családban',
    prompt: 'Egy 3 gyermekes családban feltételezzük, hogy a fiú és lány születési esélye egyenlő (1/2). Mekkora az esélye, hogy a családban VAN fiú ÉS lány is?',
    options: [
      '6 / 8 = 3 / 4 = 75%',
      '1 / 2 = 50%',
      '2 / 3 ≈ 66,7%',
      '7 / 8 = 87,5%'
    ],
    correctAnswer: 0,
    explanation: 'A 2³ = 8 esetből csak két olyan kimenetel van, ahol nincs mindkét nem: (FFF) és (LLL). A vegyes esetek száma 8 - 2 = 6 db. P = 6 / 8 = 3 / 4 = 75%.',
    highlightValue: '3 / 4 (75%)'
  },
  {
    id: 'pr-l3-q4',
    title: 'Két kocka összege legalább 11',
    prompt: 'Két szabályos dobókockával dobva mekkora az esélye, hogy a pontok összege LEGALÁBB 11?',
    options: [
      '3 / 36 = 1 / 12 ≈ 8,3%',
      '2 / 36 = 1 / 18 ≈ 5,6%',
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '4 / 36 = 1 / 9 ≈ 11,1%'
    ],
    correctAnswer: 0,
    explanation: 'A legalább 11 összeg azt jelenti, hogy 11 vagy 12. Párok: 11 összeg: (5,6), (6,5) [2 db]; 12 összeg: (6,6) [1 db]. Összesen 3 eset. P = 3 / 36 = 1 / 12.',
    highlightValue: '1 / 12'
  },
  {
    id: 'pr-l3-q5',
    title: 'Golyóhúzás 3 színnel visszatevés nélkül',
    prompt: 'Egy dobozban 3 piros, 2 fehér és 1 zöld golyó van (összesen 6). Kihúzunk egymás után 2 golyót visszatevés nélkül. Mekkora az esélye, hogy az ELSŐ piros, a MÁSODIK zöld lesz?',
    options: [
      '3 / 30 = 1 / 10 = 10%',
      '4 / 36 = 1 / 9 ≈ 11,1%',
      '3 / 36 ≈ 8,3%',
      '1 / 6 ≈ 16,7%'
    ],
    correctAnswer: 0,
    explanation: 'P(1. piros) = 3/6. Ezután 5 golyó marad, amiből 1 zöld. P(2. zöld | 1. piros) = 1/5. P = (3/6) · (1/5) = 3 / 30 = 1 / 10 = 10%.',
    highlightValue: '1 / 10 (10%)'
  },
  {
    id: 'pr-l3-q6',
    title: 'Két vizsga sikere',
    prompt: 'Egy diák 70% eséllyel megy át a matek vizsgán, és 80% eséllyel a történelem vizsgán. Feltételezve a függetlenséget, mekkora az esélye, hogy LEGALÁBB AZ EGYIK vizsgája sikerül?',
    options: [
      '0,94 (94%)',
      '0,75 (75%)',
      '0,56 (56%)',
      '1,50 (150%)'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett esemény: mindkét vizsga megbukik. P(bukás matek) = 0,3; P(bukás töri) = 0,2. P(mindkettő bukik) = 0,3 · 0,2 = 0,06 (6%). P(legalább egy siker) = 1 - 0,06 = 0,94 = 94%.',
    highlightValue: '94%'
  },
  {
    id: 'pr-l3-q7',
    title: 'Kártyapakli: Két azonos színű lap visszatevés nélkül',
    prompt: 'A 32 lapos magyar kártyából kihúzunk 2 lapot visszatevés nélkül. Mekkora a valószínűsége, hogy a két kihúzott lap AZONOS SZÍNŰ lesz (mindkettő piros, vagy mindkettő tök, stb.)?',
    options: [
      '7 / 31 ≈ 22,6%',
      '8 / 32 = 1 / 4 = 25%',
      '1 / 8 = 12,5%',
      '4 / 31 ≈ 12,9%'
    ],
    correctAnswer: 0,
    explanation: 'Az 1. kihúzott lap színe bármi lehet (valószínűsége 1). A maradék 31 lap között abból az adott színből pontosan 7 lap maradt. Így annak esélye, hogy a 2. lap is ugyanolyan színű: 7 / 31 ≈ 22,6%.',
    highlightValue: '7 / 31 (≈ 22,6%)'
  },
  {
    id: 'pr-l3-q8',
    title: 'Két kocka: A nagyobb szám legfeljebb 4',
    prompt: 'Két dobókockával dobva mekkora a valószínűsége, hogy a két dobott szám közül a NAGYOBB legfeljebb 4 (azaz egyik dobás sem haladja meg a 4-et)?',
    options: [
      '16 / 36 = 4 / 9 ≈ 44,4%',
      '4 / 36 = 1 / 9 ≈ 11,1%',
      '12 / 36 = 1 / 3 ≈ 33,3%',
      '20 / 36 = 5 / 9 ≈ 55,6%'
    ],
    correctAnswer: 0,
    explanation: 'Ez pontosan azt jelenti, hogy mindkét kockával az {1, 2, 3, 4} halmazból dobunk. A lehetséges párok száma 4 · 4 = 16. P = 16 / 36 = 4 / 9 ≈ 44,4%.',
    highlightValue: '4 / 9'
  },
  {
    id: 'pr-l3-q9',
    title: 'Négy kockával dobva legalább egy 1-es',
    prompt: 'Négy dobókockával dobunk egyszerre. Mennyi a valószínűsége, hogy LEGALÁBB egy 1-est kapunk?',
    options: [
      '1 - (5/6)⁴ = 671 / 1296 ≈ 51,8%',
      '4 / 6 = 2 / 3 ≈ 66,7%',
      '1 / 6 ≈ 16,7%',
      '(1/6)⁴ ≈ 0,08%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett esemény: egyik kockával sem dobunk 1-est. Ennek esélye (5/6)⁴ = 625 / 1296. P = 1 - 625/1296 = 671 / 1296 ≈ 51,8% (ez a híres Chevalier de Méré paradoxon első alapkérdése!).',
    highlightValue: '671 / 1296 (≈ 51,8%)'
  },
  {
    id: 'pr-l3-q10',
    title: 'Selejtes termékek ellenőrzése',
    prompt: 'Egy dobozban 10 termék közül 2 hibás és 8 hibátlan. Véletlenszerűen kiválasztunk 2 terméket visszatevés nélkül. Mekkora az esélye, hogy a kiválasztott 2 termék között VAN legalább egy hibás?',
    options: [
      '1 - 28/45 = 17 / 45 ≈ 37,8%',
      '2 / 10 = 20%',
      '16 / 90 ≈ 17,8%',
      '1 / 5 = 20%'
    ],
    correctAnswer: 0,
    explanation: 'Ellentett: mindkét kiválasztott termék hibátlan. P(mindkettő hibátlan) = (8/10) · (7/9) = 56 / 90 = 28 / 45. P(legalább egy hibás) = 1 - 28/45 = 17 / 45 ≈ 37,8%.',
    highlightValue: '17 / 45 (≈ 37,8%)'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Két Kocka és Kétlépéses Alapok',
    subtitle: 'Két kocka összegei, visszatevéses és visszatevés nélküli mintavétel, érmesorozatok',
    range: '1-10. feladat • Összetett alapok',
    focus: 'Két kocka és mintavétel',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett Feladatok és Fa-diagramok',
    subtitle: 'Prím összegek, szorzatok paritása, azonos és különböző színű golyók, 3 kocka',
    range: '11-20. feladat • Fa-diagramok',
    focus: 'Feltételes esélyek és ágak',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Valószínűségi Problémák és Kombinatorika',
    subtitle: 'Négy érme és négy kocka dobása, de Méré paradoxon, selejtarány és kártyakombinációk',
    range: '21-30. feladat • Haladó modellezés',
    focus: 'Komplementer módszer és szorzatok',
    questions: level3Questions
  }
};

export const ProbabilityProblemsQuiz: React.FC<ProbabilityProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="probability-problems"
      topicTitle="Valószínűségszámítási Feladatok"
      badge="VI. FEJEZET • 8. OSZTÁLY"
      documentId="probability-problems-quiz-doc"
      pdfFilename="8_osztaly_valoszinusegszamitasi_feladatok_kviz.pdf"
      title="Valószínűségszámítási Feladatok Kvíz"
      subtitle="Összetett kísérletek, két kocka 36 esete, fa-diagramok és útvonal-szabályok, mintavétel és komplementer események"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Kösd össze az összetett kísérleteket, fa-diagram szabályokat és valószínűségeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Két Kocka és Fa-diagram Alapok',
              subtitle: 'Kösd össze az összetett kísérletek alapfogalmait és képleteit!',
              rangeLabel: 'Párok:',
              range: '8 pár • Két kocka és fa-diagram',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Visszatevéses és Visszatevés Nélküli Számítások',
              subtitle: 'Párosítsd a golyóhúzások, érmesorozatok és kártyák valószínűségeit!',
              rangeLabel: 'Párok:',
              range: '8 pár • Mintavételek',
              focus: 'Kombinációk'
            },
            3: {
              title: '3. Szint: Haladó Valószínűségi Feladatok és Szorzatok',
              subtitle: 'Találd meg a több lépéses kísérletek és komplementer események párjait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Haladó Számítások',
              focus: 'Szorzatszabály'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <ProbabilityProblemsMatcher
              key={`pr-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Válogasd szét a szituációkat kocka-összegek, mintavételi típusok és állítások szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Két Kocka Dobása Összegek Szerint',
              subtitle: 'Csoportosítsd a két kockával dobott összegeket gyakoriság szerint!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Összegek',
              focus: 'Kockamátrix'
            },
            2: {
              title: '2. Szint: Kísérlettípusok és Mintavétel',
              subtitle: 'Válogasd szét: Visszatevéssel, Visszatevés nélkül vagy Egy lépés!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Mintavétel',
              focus: 'Függőség'
            },
            3: {
              title: '3. Szint: Igaz, Hamis és Tévhitek',
              subtitle: 'Döntsd el a több lépéses valószínűségszámítási állításokról, hogy igazak vagy tévhitek!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Állítások',
              focus: 'Kritikai gondolkodás'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ProbabilityProblemsSorter
              key={`pr-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default ProbabilityProblemsQuiz;
