import React from 'react';
import { QuizTemplate, LevelConfig, DifficultyLevel, CheatSheetCard } from '../QuizTemplate';
import { ProbabilityBasicsMatcher } from './ProbabilityBasicsMatcher';
import { ProbabilityBasicsSorter } from './ProbabilityBasicsSorter';
import { ArrowRightLeft, LayoutGrid, Percent, Dices, Trophy, HelpCircle, Sparkles, Scale, TrendingUp, CheckCircle2 } from 'lucide-react';

interface ProbabilityBasicsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Klasszikus Valószínűség Képlete',
    icon: <Percent className="w-4 h-4 text-amber-600" />,
    formula: 'P(A) = \\frac{\\text{kedvező esetek}}{\\text{összes esetek}} = \\frac{k}{n}',
    note: 'Csak akkor érvényes, ha a kimenetelek száma véges és egyenlően valószínűek (pl. szabályos kocka, megkevert kártya).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="55" height="34" rx="4" fill="#fef3c7" stroke="#fcd34d" />
        <text x="42" y="22" className="text-[6.5px] font-bold fill-amber-900" textAnchor="middle">Kedvező (k)</text>
        <text x="42" y="32" className="text-[5.5px] fill-amber-700" textAnchor="middle">Pl. Páros: 3</text>

        <text x="80" y="28" className="text-[12px] font-bold fill-slate-400" textAnchor="middle">/</text>

        <rect x="90" y="8" width="55" height="34" rx="4" fill="#e0e7ff" stroke="#a5b4fc" />
        <text x="117" y="22" className="text-[6.5px] font-bold fill-indigo-900" textAnchor="middle">Összes (n)</text>
        <text x="117" y="32" className="text-[5.5px] fill-indigo-700" textAnchor="middle">Pl. Kocka: 6</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Értéktartomány és Szélső Események',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: '0 \\le P(A) \\le 1, \\quad P(\\emptyset) = 0 \\quad (0\\%), \\quad P(I) = 1 \\quad (100\\%)',
    note: 'A valószínűség soha nem lehet negatív, és nem haladhatja meg a 100%-ot (1-et).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="25" r="5" fill="#f43f5e" />
        <text x="25" y="40" className="text-[6px] font-bold fill-rose-700" textAnchor="middle">P=0 (Lehetetlen)</text>

        <circle cx="80" cy="25" r="4" fill="#3b82f6" />
        <text x="80" y="40" className="text-[6px] font-bold fill-blue-700" textAnchor="middle">0 &lt; P &lt; 1 (Véletlen)</text>

        <circle cx="135" cy="25" r="5" fill="#10b981" />
        <text x="135" y="40" className="text-[6px] font-bold fill-emerald-700" textAnchor="middle">P=1 (Biztos)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Ellentett (Komplementer) Esemény',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: 'P(\\bar{A}) = 1 - P(A) \\iff P(A) + P(\\bar{A}) = 1',
    note: '„Annak az esélye, hogy NEM következik be: 1 - P(A)”. Kiválóan használható „legalább egy” típusú kérdéseknél.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="60" height="30" rx="4" fill="#fef3c7" stroke="#fcd34d" />
        <text x="45" y="24" className="text-[7px] font-bold fill-amber-900" textAnchor="middle">A esemény</text>
        <text x="45" y="34" className="text-[6px] fill-amber-700" textAnchor="middle">P(A) = 30%</text>

        <text x="80" y="28" className="text-[10px] font-bold fill-slate-400" textAnchor="middle">+</text>

        <rect x="85" y="10" width="60" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="115" y="24" className="text-[7px] font-bold fill-slate-800" textAnchor="middle">Ellentett (Nem A)</text>
        <text x="115" y="34" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">1 - 0,3 = 70%</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Nagy Számok Törvénye & Függetlenség',
    icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
    formula: 'N \\to \\infty \\implies f = \\frac{k}{N} \\to P(A), \\quad P(\\text{Kocka nem emlékszik})',
    note: 'Sok kísérlet esetén a relatív gyakoriság rásimul az elméleti valószínűségre. A dobások függetlenek, az érme nem kompenzál korábbi szériákat.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="4" fill="#f0fdf4" stroke="#86efac" />
        <text x="80" y="22" className="text-[7px] font-black fill-emerald-900" textAnchor="middle">Relatív gyakoriság → Elméleti P</text>
        <text x="80" y="33" className="text-[6px] font-bold fill-emerald-700" textAnchor="middle">N = 10 (±20%) → N = 10 000 (±0,1%)</text>
      </svg>
    )
  }
];

// --- 1. SZINT: ALAPFOGALMAK ÉS EGYETLEN KÍSÉRLET (10 KÉRDÉS) ---
const level1Questions: LevelConfig['questions'] = [
  {
    id: 'pb-l1-q1',
    title: 'Klasszikus valószínűség definíciója',
    prompt: 'Hogyan számítjuk ki egy esemény klasszikus valószínűségét, ha a kísérlet kimenetelei egyenlően valószínűek?',
    options: [
      'P = kedvező esetek száma / összes lehetséges eset száma (k / n)',
      'P = összes esetek száma / kedvező esetek száma (n / k)',
      'P = kedvező esetek száma · összes esetek száma (k · n)',
      'P = kedvező esetek száma - összes esetek száma (k - n)'
    ],
    correctAnswer: 0,
    explanation: 'A klasszikus valószínűség alapképlete a kedvező esetek és az összes lehetséges eset hányadosa: P(A) = k / n.',
    highlightValue: 'P(A) = k / n'
  },
  {
    id: 'pb-l1-q2',
    title: 'Kockadobás: Páros szám dobása',
    prompt: 'Egy szabályos hatoldalú dobókockával dobva mekkora a valószínűsége annak, hogy PÁROS számot dobunk?',
    options: [
      '3 / 6 = 1 / 2 = 50%',
      '1 / 6 ≈ 16,7%',
      '2 / 6 = 1 / 3 ≈ 33,3%',
      '4 / 6 = 2 / 3 ≈ 66,7%'
    ],
    correctAnswer: 0,
    explanation: 'Az összes lehetséges kimenetel n = 6 (1, 2, 3, 4, 5, 6). A páros számok a 2, 4, 6, tehát k = 3 db kedvező eset van. P = 3/6 = 1/2 = 50%.',
    highlightValue: '1 / 2 (50%)'
  },
  {
    id: 'pb-l1-q3',
    title: 'Kockadobás: 5-nél nagyobb szám',
    prompt: 'Egy dobókockával dobunk. Mekkora az esélye annak, hogy 5-nél NAGYOBB számot dobunk?',
    options: [
      '1 / 6 ≈ 16,7%',
      '2 / 6 = 1 / 3 ≈ 33,3%',
      '5 / 6 ≈ 83,3%',
      '0% (lehetetlen)'
    ],
    correctAnswer: 0,
    explanation: 'Az 5-nél nagyobb szám a dobókockán egyedül a 6-os (1 kedvező eset). Összesen 6 oldal van, így P = 1 / 6.',
    highlightValue: '1 / 6'
  },
  {
    id: 'pb-l1-q4',
    title: 'Valószínűség értéktartománya',
    prompt: 'Milyen értékeket vehet fel egy esemény valószínűsége?',
    options: [
      'Mindig 0 és 1 közötti valós szám (0% és 100% között)',
      'Bármilyen pozitív valós szám lehet, akár 5 vagy 10 is',
      'Negatív számoktól kezdve 1-ig terjedhet',
      'Csak egész szám lehet: kizárólag 0 vagy 1'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a kedvező esetek száma (k) nem lehet negatív és nem haladhatja meg az összes esetek számát (n), ezért 0 ≤ k ≤ n, vagyis 0 ≤ P(A) ≤ 1.',
    highlightValue: '0 ≤ P(A) ≤ 1'
  },
  {
    id: 'pb-l1-q5',
    title: 'Biztos esemény valószínűsége',
    prompt: 'Mekkora értéket vesz fel a BIZTOS esemény valószínűsége?',
    options: [
      'P = 1 (pontosan 100%)',
      'P = 0 (pontosan 0%)',
      'P = 0,5 (50%)',
      'P = végtelen (∞)'
    ],
    correctAnswer: 0,
    explanation: 'A biztos esemény minden kísérlet során garantáltan bekövetkezik (k = n), ezért P = n / n = 1, azaz 100%.',
    highlightValue: 'P = 1'
  },
  {
    id: 'pb-l1-q6',
    title: 'Lehetetlen esemény valószínűsége',
    prompt: 'Mekkora értéket vesz fel a LEHETETLEN esemény valószínűsége?',
    options: [
      'P = 0 (pontosan 0%)',
      'P = -1',
      'P = 0,01 (1%)',
      'P = 1'
    ],
    correctAnswer: 0,
    explanation: 'A lehetetlen esemény soha nem következhet be, 0 db kedvező kimenetele van (k = 0), így P = 0 / n = 0 (0%).',
    highlightValue: 'P = 0'
  },
  {
    id: 'pb-l1-q7',
    title: 'Szabályos érme feldobása',
    prompt: 'Egy szabályos pénzérmét feldobva mekkora a valószínűsége, hogy FEJ lesz az eredmény?',
    options: [
      '1 / 2 = 0,5 = 50%',
      '1 / 1 = 100%',
      '1 / 4 = 25%',
      '2 / 1 = 200%'
    ],
    correctAnswer: 0,
    explanation: 'Két lehetséges kimenetel van: Fej vagy Írás (n = 2). Ebből a Fej 1 eset (k = 1), tehát P = 1 / 2 = 50%.',
    highlightValue: '50%'
  },
  {
    id: 'pb-l1-q8',
    title: 'Golyóhúzás urnából',
    prompt: 'Egy dobozban 4 piros és 6 kék golyó található. Egy golyót véletlenül kihúzva mekkora az esélye annak, hogy KÉK golyót húzunk?',
    options: [
      '6 / 10 = 3 / 5 = 60%',
      '4 / 10 = 2 / 5 = 40%',
      '6 / 4 = 150%',
      '1 / 6 ≈ 16,7%'
    ],
    correctAnswer: 0,
    explanation: 'Összes golyó: n = 4 + 6 = 10 db. Kedvező kék golyók száma: k = 6 db. P = 6 / 10 = 3 / 5 = 0,6 = 60%.',
    highlightValue: '6 / 10 (60%)'
  },
  {
    id: 'pb-l1-q9',
    title: 'Magyar kártya: Ász húzása',
    prompt: 'Egy 32 lapos magyar kártyacsomagból véletlenszerűen kihúzunk egy lapot. Mekkora az esélye annak, hogy ÁSZ-t húzunk?',
    options: [
      '4 / 32 = 1 / 8 = 12,5%',
      '1 / 32 ≈ 3,1%',
      '8 / 32 = 1 / 4 = 25%',
      '4 / 100 = 4%'
    ],
    correctAnswer: 0,
    explanation: 'A magyar kártyában 4 szín van (piros, tök, zöld, makk), mindegyikben 1 ász van, tehát összesen k = 4 db ász létezik 32 lapból. P = 4 / 32 = 1 / 8 = 12,5%.',
    highlightValue: '1 / 8 (12,5%)'
  },
  {
    id: 'pb-l1-q10',
    title: 'Ellentett esemény egyszerű számítása',
    prompt: 'Annak a valószínűsége, hogy ma megnyerünk egy játékot, 0,35 (35%). Mennyi az esélye annak, hogy NEM nyerünk?',
    options: [
      '0,65 (65%)',
      '0,35 (35%)',
      '1,35 (135%)',
      '0,00 (0%)'
    ],
    correctAnswer: 0,
    explanation: 'Az ellentett esemény valószínűsége: P(Nem A) = 1 - P(A) = 1 - 0,35 = 0,65 (65%).',
    highlightValue: '0,65 (65%)'
  }
];

// --- 2. SZINT: ÖSSZETETT ESEMÉNYEK ÉS SZÁZALÉKOK (10 KÉRDÉS) ---
const level2Questions: LevelConfig['questions'] = [
  {
    id: 'pb-l2-q1',
    title: 'Kockadobás: Prímszám dobása',
    prompt: 'Szabályos dobókockával dobva mekkora a valószínűsége, hogy PRÍMSZÁMOT kapunk?',
    options: [
      '3 / 6 = 1 / 2 = 50%',
      '4 / 6 = 2 / 3 ≈ 66,7%',
      '2 / 6 = 1 / 3 ≈ 33,3%',
      '1 / 6 ≈ 16,7%'
    ],
    correctAnswer: 0,
    explanation: 'A kocka számai 1-től 6-ig: {1, 2, 3, 4, 5, 6}. Prímszámok közülük: 2, 3, 5 (összesen 3 db). Fontos: az 1 NEM prímszám! Így P = 3/6 = 1/2 = 50%.',
    highlightValue: '1 / 2 (50%)'
  },
  {
    id: 'pb-l2-q2',
    title: 'Kockadobás: Legalább 3-as dobása',
    prompt: 'Dobókockával dobva mekkora annak az esélye, hogy LEGALÁBB 3-ast dobunk?',
    options: [
      '4 / 6 = 2 / 3 ≈ 66,7%',
      '3 / 6 = 1 / 2 = 50%',
      '5 / 6 ≈ 83,3%',
      '2 / 6 = 1 / 3 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'A „legalább 3” azt jelenti, hogy 3, 4, 5 vagy 6. Ez 4 db kedvező eset a 6-ból. P = 4 / 6 = 2 / 3 ≈ 66,7%.',
    highlightValue: '2 / 3'
  },
  {
    id: 'pb-l2-q3',
    title: 'Magyar kártya: Piros (szív) lap húzása',
    prompt: 'Egy 32 lapos magyar kártyacsomagból mekkora eséllyel húzunk PIROS színű lapot?',
    options: [
      '8 / 32 = 1 / 4 = 25%',
      '4 / 32 = 1 / 8 = 12,5%',
      '16 / 32 = 1 / 2 = 50%',
      '1 / 32 ≈ 3,1%'
    ],
    correctAnswer: 0,
    explanation: 'A 32 lap 4 egyenlő részre oszlik színek szerint (piros, tök, zöld, makk). Mindegyik színből 8 lap van: 32 / 4 = 8. Így P = 8 / 32 = 1 / 4 = 25%.',
    highlightValue: '1 / 4 (25%)'
  },
  {
    id: 'pb-l2-q4',
    title: 'Magyar kártya: Számozott lap húzása',
    prompt: 'A 32 lapos magyar kártyában a lapok értéke: VII, VIII, IX, X, Alsó, Felső, Király, Ász. Mekkora az esélye, hogy SZÁMOZOTT lapot húzunk (VII, VIII, IX vagy X)?',
    options: [
      '16 / 32 = 1 / 2 = 50%',
      '4 / 32 = 1 / 8 = 12,5%',
      '12 / 32 = 3 / 8 = 37,5%',
      '20 / 32 = 5 / 8 = 62,5%'
    ],
    correctAnswer: 0,
    explanation: 'Minden színből 4 db számozott lap van (VII, VIII, IX, X). 4 szín esetén ez 4 · 4 = 16 db számozott lap. P = 16 / 32 = 1 / 2 = 50%.',
    highlightValue: '1 / 2 (50%)'
  },
  {
    id: 'pb-l2-q5',
    title: 'Urnamodell: Nem zöld golyó húzása',
    prompt: 'Egy dobozban 3 piros, 5 zöld és 2 kék golyó található. Egy golyót kihúzva mekkora az esélye, hogy NEM zöldet húzunk?',
    options: [
      '5 / 10 = 1 / 2 = 50%',
      '3 / 10 = 30%',
      '2 / 10 = 20%',
      '8 / 10 = 80%'
    ],
    correctAnswer: 0,
    explanation: 'Összes golyó: 3 + 5 + 2 = 10. Nem zöld golyók (piros és kék): 3 + 2 = 5 db. P = 5 / 10 = 1 / 2 = 50%. Ellentettel is: 1 - 5/10 = 5/10 = 50%.',
    highlightValue: '50%'
  },
  {
    id: 'pb-l2-q6',
    title: 'Trükkös érme: Cinkelt kétfejű pénzérme',
    prompt: 'Egy bűvész olyan speciális pénzérmét használ, amelynek mindkét oldalán fej van. Mekkora az esélye, hogy fejet dobunk vele?',
    options: [
      'P = 1 (100%, biztos esemény)',
      'P = 0,5 (50%)',
      'P = 2 (200%)',
      'P = 0 (lehetetlen)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét oldal fej, bármelyik oldalára esik az érme, fej lesz az eredmény. Ez egy biztos esemény, amelynek valószínűsége pontosan 1 (100%).',
    highlightValue: 'P = 1'
  },
  {
    id: 'pb-l2-q7',
    title: 'Kísérleti relatív gyakoriság kiszámítása',
    prompt: 'Egy diák 200 alkalommal feldobott egy érmét, és 106 alkalommal fejet kapott. Mennyi a fej RELATÍV GYAKORISÁGA ebben a kísérletsorozatban?',
    options: [
      '106 / 200 = 0,53 = 53%',
      '106 darab',
      '94 / 200 = 0,47 = 47%',
      '200 / 106 ≈ 1,89'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság a gyakoriság és az összes kísérlet hányadosa: f = k / N = 106 / 200 = 0,53 = 53%.',
    highlightValue: '53%'
  },
  {
    id: 'pb-l2-q8',
    title: 'A nagy számok törvényének lényege',
    prompt: 'Mit mond ki Jakob Bernoulli nagy számok törvénye a véletlen kísérletekről?',
    options: [
      'A kísérletek számának növelésével a relatív gyakoriság egyre közelebb kerül az elméleti valószínűséghez',
      'Minél többet dobunk egy kockával, annál nagyobb számok jönnek ki',
      'Ha sokszor egymás után írást dobunk, a kísérlet megváltoztatja az elméleti valószínűséget',
      'Pontosan 100 kísérlet után a relatív gyakoriság kivétel nélkül megegyezik a valószínűséggel'
    ],
    correctAnswer: 0,
    explanation: 'A nagy számok törvénye szerint ha a kísérletek száma (N) nagyon nagyra nő, a tapasztalati relatív gyakoriság (k/N) rásimul az elméleti valószínűségre (P).',
    highlightValue: 'Relatív gyakoriság → Valószínűség'
  },
  {
    id: 'pb-l2-q9',
    title: 'Tombola nyerési esélye',
    prompt: 'Egy iskolai bálon 500 tombolajegyet adtak el. Összesen 25 nyereményt sorsolnak ki. Mekkora az esélye, hogy 1 db megvásárolt jeggyel nyerünk?',
    options: [
      '25 / 500 = 1 / 20 = 0,05 = 5%',
      '25 / 100 = 25%',
      '1 / 500 = 0,2%',
      '500 / 25 = 20%'
    ],
    correctAnswer: 0,
    explanation: 'Összes lehetséges eset: n = 500 jegy. Kedvező nyertes jegyek: k = 25. P = 25 / 500 = 1 / 20 = 5%.',
    highlightValue: '1 / 20 (5%)'
  },
  {
    id: 'pb-l2-q10',
    title: 'Érmedobások függetlensége',
    prompt: 'Egy szabályos érmével már 5 alkalommal egymás után FEJET dobtunk. Mekkora az esélye, hogy a 6. dobásnál ÍRÁST dobunk?',
    options: [
      'Pontosan 1 / 2 = 50%',
      'Sokkal nagyobb, mint 50%, mert ki kell egyenlítődnie a sornak',
      'Sokkal kisebb, mint 50%, mert a fej most „be van melegedve”',
      'Majdnem 100%'
    ],
    correctAnswer: 0,
    explanation: 'A független kísérletek során az érmének nincs memóriája: a korábbi dobások semmilyen módon nem befolyásolják a következő dobást. A 6. dobásnál is pontosan 50% az írás esélye.',
    highlightValue: '50% (Függetlenség)'
  }
];

// --- 3. SZINT: KÉT KÍSÉRLET, HALADÓ FELADATOK ÉS PARADOXONOK (10 KÉRDÉS) ---
const level3Questions: LevelConfig['questions'] = [
  {
    id: 'pb-l3-q1',
    title: 'Két kocka összege: Pontosan 7',
    prompt: 'Két szabályos dobókockával egyszerre dobunk. Mekkora a valószínűsége, hogy a dobott számok összege PONTOSAN 7 lesz?',
    options: [
      '6 / 36 = 1 / 6 ≈ 16,7%',
      '1 / 11 ≈ 9,1%',
      '7 / 36 ≈ 19,4%',
      '3 / 36 = 1 / 12 ≈ 8,3%'
    ],
    correctAnswer: 0,
    explanation: 'Két kocka esetén 6 · 6 = 36 egyenlő kimenetel van. A 7 összeg kedvező párjai: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) – összesen 6 eset. P = 6 / 36 = 1 / 6.',
    highlightValue: '6 / 36 = 1 / 6'
  },
  {
    id: 'pb-l3-q2',
    title: 'Két kocka: Mindkettővel 6-os',
    prompt: 'Két szabályos dobókockával dobva mekkora az esélye annak, hogy MIND KÉT kockával 6-ost dobunk?',
    options: [
      '1 / 36 ≈ 2,78%',
      '2 / 36 = 1 / 18 ≈ 5,56%',
      '1 / 12 ≈ 8,33%',
      '1 / 6 ≈ 16,67%'
    ],
    correctAnswer: 0,
    explanation: 'Összesen 36 kimenetel létezik. A mindkét kockán 6-os eset egyetlen egy párt jelent: (6, 6). Így P = 1 / 36 ≈ 2,78%.',
    highlightValue: '1 / 36'
  },
  {
    id: 'pb-l3-q3',
    title: 'Két kocka összege: Páros szám',
    prompt: 'Két kockával dobva mekkora a valószínűsége annak, hogy a dobott számok összege PÁROS lesz?',
    options: [
      '18 / 36 = 1 / 2 = 50%',
      '12 / 36 = 1 / 3 ≈ 33,3%',
      '20 / 36 = 5 / 9 ≈ 55,6%',
      '1 / 6 ≈ 16,7%'
    ],
    correctAnswer: 0,
    explanation: 'Páros összeg akkor keletkezik, ha mindkét dobás páros (3 · 3 = 9 eset), vagy mindkét dobás páratlan (3 · 3 = 9 eset). 9 + 9 = 18 kedvező eset a 36-ból: P = 18 / 36 = 1 / 2 = 50%.',
    highlightValue: '1 / 2 (50%)'
  },
  {
    id: 'pb-l3-q4',
    title: 'Két érme: Pontosan egy fej és egy írás',
    prompt: 'Két szabályos pénzérmét feldobunk. Mekkora az esélye, hogy PONTOSAN egy fej és egy írás lesz az eredmény?',
    options: [
      '2 / 4 = 1 / 2 = 50%',
      '1 / 3 ≈ 33,3%',
      '1 / 4 = 25%',
      '3 / 4 = 75%'
    ],
    correctAnswer: 0,
    explanation: 'Az eseménytér 4 elemből áll: (F, F), (F, I), (I, F), (I, I). A vegyes kimenetelek (F, I) és (I, F) száma k = 2. P = 2 / 4 = 1 / 2 = 50%.',
    highlightValue: '2 / 4 (50%)'
  },
  {
    id: 'pb-l3-q5',
    title: 'Két érme: Legalább egy fej',
    prompt: 'Két szabályos érmét dobva mekkora annak az esélye, hogy LEGALÁBB EGY fejet dobunk?',
    options: [
      '3 / 4 = 75%',
      '1 / 2 = 50%',
      '1 / 4 = 25%',
      '2 / 3 ≈ 66,7%'
    ],
    correctAnswer: 0,
    explanation: 'Használjuk az ellentett eseményt! A „legalább egy fej” ellentettje az, hogy „egyetlen fej sincs”, azaz mindkettő írás (I, I). Ennek esélye 1/4. P = 1 - 1/4 = 3/4 = 75%.',
    highlightValue: '3 / 4 (75%)'
  },
  {
    id: 'pb-l3-q6',
    title: 'Golyóhúzás visszatevés nélkül',
    prompt: 'Egy dobozban 2 fehér és 3 fekete golyó van. Kihúzunk egy fehér golyót, és NEM tesszük vissza. Mekkora a valószínűsége, hogy a második húzásra is fehér golyót húzunk?',
    options: [
      '1 / 4 = 25%',
      '2 / 5 = 40%',
      '1 / 5 = 20%',
      '2 / 4 = 50%'
    ],
    correctAnswer: 0,
    explanation: 'Az első fehér golyó kihúzása után az urnában maradt: 1 fehér és 3 fekete golyó, tehát összesen 4 golyó. A kedvező fehér golyók száma ekkor 1 db. P = 1 / 4 = 25%.',
    highlightValue: '1 / 4 (25%)'
  },
  {
    id: 'pb-l3-q7',
    title: 'Geometriai valószínűség céltáblán',
    prompt: 'Egy 10 cm × 10 cm-es négyzet alakú céltábla közepén egy 5 cm × 5 cm-es piros négyzet található. Ha egy nyíl biztosan a céltáblába fúródik véletlenszerűen, mekkora az esélye, hogy a piros részbe talál?',
    options: [
      '25 / 100 = 1 / 4 = 25%',
      '5 / 10 = 50%',
      '5 / 100 = 5%',
      '25 / 75 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'Geometriai valószínűségnél a területek arányát vizsgáljuk. A belső kedvező négyzet területe: 5 · 5 = 25 cm². A teljes céltábla területe: 10 · 10 = 100 cm². P = 25 / 100 = 1 / 4 = 25%.',
    highlightValue: '1 / 4 (25%)'
  },
  {
    id: 'pb-l3-q8',
    title: 'Három érme lehetséges kimenetelei',
    prompt: 'Három szabályos pénzérmét egyszerre feldobva hány különböző elemi kimenetele van a kísérletnek?',
    options: [
      '8 kimenetel (2 · 2 · 2 = 2³)',
      '6 kimenetel (2 + 2 + 2)',
      '4 kimenetel (0, 1, 2 vagy 3 fej)',
      '9 kimenetel (3²)'
    ],
    correctAnswer: 0,
    explanation: 'Minden egyes érmének 2 lehetséges oldala van (Fej vagy Írás). A kimenetelek száma az egymást követő választások szorzata: 2 · 2 · 2 = 8 db elemi esemény.',
    highlightValue: '8 kimenetel'
  },
  {
    id: 'pb-l3-q9',
    title: 'Három érme: Három fej dobása',
    prompt: 'Három szabályos pénzérmét feldobva mekkora annak az esélye, hogy MINDEGYIK érmével fejet kapunk?',
    options: [
      '1 / 8 = 0,125 = 12,5%',
      '3 / 8 = 37,5%',
      '1 / 6 ≈ 16,7%',
      '1 / 3 ≈ 33,3%'
    ],
    correctAnswer: 0,
    explanation: 'A 8 egyenlően valószínű kimenetelből egyedül a (Fej, Fej, Fej) kedvező. P = 1 / 8 = 12,5%.',
    highlightValue: '1 / 8 (12,5%)'
  },
  {
    id: 'pb-l3-q10',
    title: 'Monte Carlo paradoxon (Rulett)',
    prompt: 'Egy európai rulettasztalon (18 piros, 18 fekete, 1 zöld nulla) 10 alkalommal egymás után fekete szín jött ki. Mekkora az esélye, hogy a következő pörgetésnél PIROS jön ki?',
    options: [
      'Pontosan 18 / 37 ≈ 48,6% (a golyónak nincs emlékezete)',
      'Közel 100%, mert ennyi fekete után elkerülhetetlen a piros',
      'Körülbelül 10%, mert a fekete széria lendületben van',
      'Pontosan 50%'
    ],
    correctAnswer: 0,
    explanation: 'A klasszikus szerencsejátékos-tévedés: a rulettkerék fizikai mechanizmusa nem emlékszik az előző pörgetésekre. A következő pörgetésnél a piros esélye pontosan ugyanannyi, mint bármikor máskor: 18 / 37 ≈ 48,6%.',
    highlightValue: '18 / 37 (Függetlenség)'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyetlen Kísérlet',
    subtitle: 'Klasszikus valószínűség képlete (P = k/n), biztos és lehetetlen események, kockák és érmék',
    range: '1-10. feladat • Alapfogalmak',
    focus: 'Klasszikus definíció és alapok',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett Események és Százalékok',
    subtitle: 'Prímszámok a kockán, magyar kártya húzások, urnamodellek és a nagy számok törvénye',
    range: '11-20. feladat • Összetett események',
    focus: 'Törtek, százalékok és kísérletek',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Két Kísérlet, Haladó Feladatok és Tévhitek',
    subtitle: 'Két kocka és érme kimenetelei, visszatevés nélküli húzások és a játékosok tévedése',
    range: '21-30. feladat • Haladó valószínűség',
    focus: 'Eseményterek és függetlenség',
    questions: level3Questions
  }
};

export const ProbabilityBasicsQuiz: React.FC<ProbabilityBasicsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="probability-basics"
      topicTitle="Klasszikus Valószínűség"
      badge="VI. FEJEZET • 8. OSZTÁLY"
      documentId="probability-basics-quiz-doc"
      pdfFilename="8_osztaly_klasszikus_valoszinuseg_kviz.pdf"
      title="Klasszikus Valószínűség Kvíz"
      subtitle="Véletlen kísérletek, eseményterek, a valószínűség klasszikus képlete (P = k/n), biztos és lehetetlen események, relatív gyakoriság"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Kösd össze az eseményeket, definíciókat és a kiszámított valószínűségeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Szélső Események',
              subtitle: 'Kösd össze az alapvető definíciókat és egyszerű események valószínűségeit!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapfogalmak',
              focus: 'Definíciók'
            },
            2: {
              title: '2. Szint: Kockák, Kártyák és Urnamodell',
              subtitle: 'Találd meg a dobókockák, magyar kártyák és golyóhúzások párjait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Kockák és Kártyák',
              focus: 'Kombinációk'
            },
            3: {
              title: '3. Szint: Haladó Számítások és Nagy Számok Törvénye',
              subtitle: 'Párosítsd a két kockás dobásokat, geometriai esélyeket és statisztikákat!',
              rangeLabel: 'Párok:',
              range: '8 pár • Haladó Számítások',
              focus: 'Statisztika'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <ProbabilityBasicsMatcher
              key={`pb-matcher-${level}`}
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
          subtitle: 'Válogasd szét a szituációkat lehetetlen, véletlen vagy biztos események szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Lehetetlen, Véletlen vagy Biztos Esemény',
              subtitle: 'Csoportosítsd a kísérleteket: P = 0, 0 < P < 1, vagy P = 1!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Eseménytípusok',
              focus: 'Kategorizálás'
            },
            2: {
              title: '2. Szint: Valószínűségi Értékek Nagysága',
              subtitle: 'Kategorizáld a feladványokat kis, közepes vagy nagy valószínűség szerint!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Értéktartomány',
              focus: 'Nagyságrendek'
            },
            3: {
              title: '3. Szint: Igaz, Hamis és Tévhitek',
              subtitle: 'Döntsd el a valószínűségszámítási kijelentésekről, hogy igazak vagy tévhitek!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Paradoxonok',
              focus: 'Állítások megítélése'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ProbabilityBasicsSorter
              key={`pb-sorter-${level}`}
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

export default ProbabilityBasicsQuiz;
