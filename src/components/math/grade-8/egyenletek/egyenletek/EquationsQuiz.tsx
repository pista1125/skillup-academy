import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Scale,
  Equal,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Split,
  Layers,
  HelpCircle,
  Zap,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { EquationsMatcher } from './EquationsMatcher';
import { EquationsSorter } from './EquationsSorter';

interface EquationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mérlegelv Alapszabálya',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: 'B \\pm c = J \\pm c \\quad \\text{és} \\quad B \\cdot c = J \\cdot c \\ (c \\neq 0)',
    note: 'Bármit teszel az egyik oldallal, ugyanazt pontosan és egy időben el kell végezned a másik oldallal is!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="20" x2="140" y2="20" className="stroke-purple-600 stroke-[2.5]" />
        <polygon points="80,20 73,38 87,38" className="fill-slate-700" />
        <rect x="25" y="10" width="22" height="10" rx="3" className="fill-purple-500" />
        <text x="36" y="18" className="text-[7px] font-bold fill-white text-center" textAnchor="middle">Bal</text>
        <rect x="113" y="10" width="22" height="10" rx="3" className="fill-indigo-500" />
        <text x="124" y="18" className="text-[7px] font-bold fill-white text-center" textAnchor="middle">Jobb</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Zárójelbontás & Előjelszabály',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: '-(a - b) = -a + b \\quad \\text{és} \\quad -c(a - b) = -ca + cb',
    note: 'A zárójel előtti negatív előjel a zárójel belsejében lévő MINDEN tag előjelét megfordítja!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="15" y="26" className="text-[10px] font-bold fill-rose-600 font-mono">-(3x - 5)</text>
        <path d="M 65 22 L 90 22 M 85 18 L 90 22 L 85 26" className="stroke-slate-500 stroke-[1.5] fill-none" />
        <text x="98" y="26" className="text-[10px] font-bold fill-emerald-600 font-mono">-3x + 5</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Törtes Egyenletek & LKKT',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    formula: '\\text{Szorzás a nevezők LKKT-jével} \\implies \\text{Minden tagot beszorzunk!}',
    note: 'Vigyázat: a tört nélküli tiszta számokat és mindkét oldalt is be kell szorozni a közös nevezővel!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="20" y="20" className="text-[9px] font-bold fill-blue-600 font-mono">x/3 + 2 = 5</text>
        <text x="35" y="36" className="text-[8px] font-bold fill-amber-600 font-mono">/ · 3</text>
        <path d="M 85 24 L 105 24 M 100 20 L 105 24 L 100 28" className="stroke-slate-500 stroke-[1.5] fill-none" />
        <text x="110" y="26" className="text-[9px] font-bold fill-emerald-600 font-mono">x + 6 = 15</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Kikötések & Értelmezési Tartomány',
    icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
    formula: '\\frac{A}{B} \\implies B \\neq 0 \\quad (\\text{Nevező nem lehet nulla!})',
    note: 'Ha a kapott eredmény megegyezik a kizárt értékkel, az hamis gyök: nem megoldás!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="25" y="26" className="text-[10px] font-bold fill-slate-700 font-mono">5 / (x - 3)</text>
        <path d="M 85 22 L 105 22 M 100 18 L 105 22 L 100 26" className="stroke-slate-500 stroke-[1.5] fill-none" />
        <text x="112" y="26" className="text-[10px] font-bold fill-rose-600 font-mono">x ≠ 3</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Különleges Esetek: Azonosság & Ellentmondás',
    icon: <Split className="w-4 h-4 text-amber-600" />,
    formula: '0x = 0 \\implies M = \\mathbb{R} \\quad | \\quad 0x = b \\ (b \\neq 0) \\implies M = \\emptyset',
    note: '0 = 0 esetén minden szám jó (azonosság). 0 = 5 esetén nincs megoldás (ellentmondás).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="15" y="10" width="55" height="24" rx="4" className="fill-emerald-50 stroke-emerald-300 stroke-[1]" />
        <text x="42" y="25" className="text-[8px] font-bold fill-emerald-800 text-center" textAnchor="middle">0 = 0 (Azonosság)</text>
        <rect x="90" y="10" width="55" height="24" rx="4" className="fill-rose-50 stroke-rose-300 stroke-[1]" />
        <text x="117" y="25" className="text-[8px] font-bold fill-rose-800 text-center" textAnchor="middle">0 = 7 (Ellentmondás)</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Az Ellenőrzés Szabálya',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    formula: 'B(x) \\overset{?}{=} J(x) \\quad (\\text{Kizárólag az eredeti egyenletbe!})',
    note: 'Külön kiszámítjuk a Bal oldalt és a Jobb oldalt. Ha megegyeznek, a megoldás helyes!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="25" y="26" className="text-[10px] font-bold fill-indigo-600 font-mono">B = 14</text>
        <text x="75" y="26" className="text-[12px] font-black fill-emerald-600">==</text>
        <text x="105" y="26" className="text-[10px] font-bold fill-indigo-600 font-mono">J = 14</text>
        <circle cx="140" cy="22" r="5" className="fill-emerald-500" />
        <text x="140" y="25" className="text-[8px] font-bold fill-white text-center" textAnchor="middle">✓</text>
      </svg>
    )
  }
];

const level1Questions = [
  {
    id: 'l1-1',
    title: 'Egyszerű mérlegelv',
    question: 'Oldd meg a következő egyenletet a valós számok halmazán: 3x + 7 = 22',
    options: ['x = 5', 'x = 6', 'x = 4', 'x = 7'],
    correctAnswer: 0,
    hint: 'Először vonj ki mindkét oldalból 7-et, majd oszd el az egyenletet 3-mal!',
    explanation: '3x + 7 = 22  /- 7  =>  3x = 15  /: 3  =>  x = 5. Ellenőrzés: 3 · 5 + 7 = 15 + 7 = 22 = Jobb oldal.'
  },
  {
    id: 'l1-2',
    title: 'Negatív együttható',
    question: 'Mi a megoldása a -4x = 28 egyenletnek?',
    options: ['x = -7', 'x = 7', 'x = -6', 'x = 24'],
    correctAnswer: 0,
    hint: 'Mindkét oldalt oszd el (-4)-gyel! Pozitív osztva negatívval az negatív lesz.',
    explanation: '-4x = 28  /: (-4)  =>  x = 28 / (-4) = -7. Ellenőrzés: -4 · (-7) = +28.'
  },
  {
    id: 'l1-3',
    title: 'Ismeretlen mindkét oldalon',
    question: 'Oldd meg az egyenletet: 5x - 8 = 2x + 7',
    options: ['x = 5', 'x = 3', 'x = -5', 'x = 15'],
    correctAnswer: 0,
    hint: 'Vond ki mindkét oldalból a 2x-et, majd adj hozzá mindkét oldalhoz 8-at!',
    explanation: '5x - 8 = 2x + 7  /- 2x  =>  3x - 8 = 7  /+ 8  =>  3x = 15  /: 3  =>  x = 5.'
  },
  {
    id: 'l1-4',
    title: 'Egyszerű zárójelbontás',
    question: 'Oldd meg az egyenletet: 3(x - 4) = 15',
    options: ['x = 9', 'x = 8', 'x = 5', 'x = 1'],
    correctAnswer: 0,
    hint: 'Bontsd fel a zárójelet: 3 · x - 3 · 4 = 15, vagy oszd el rögtön mindkét oldalt 3-mal!',
    explanation: '3(x - 4) = 15  /: 3  =>  x - 4 = 5  /+ 4  =>  x = 9. (Vagy zárójelbontással: 3x - 12 = 15 => 3x = 27 => x = 9).'
  },
  {
    id: 'l1-5',
    title: 'Egyszerű törtes egyenlet',
    question: 'Oldd meg az egyenletet: x / 4 + 3 = 8',
    options: ['x = 20', 'x = 24', 'x = 5', 'x = 12'],
    correctAnswer: 0,
    hint: 'Először vonj ki 3-at, majd szorozz 4-gyel!',
    explanation: 'x / 4 + 3 = 8  /- 3  =>  x / 4 = 5  /· 4  =>  x = 20. Ellenőrzés: 20 / 4 + 3 = 5 + 3 = 8.'
  },
  {
    id: 'l1-6',
    title: 'Kikötés felismerése',
    question: 'Mi a kötelező kikötés az alábbi törtes egyenletnél: 7 / (x - 3) = 2?',
    options: ['x ≠ 3', 'x ≠ 0', 'x ≠ -3', 'x > 3'],
    correctAnswer: 0,
    hint: 'A tört nevezője sosem lehet 0! Milyen x érték tenné nullává a nevezőt?',
    explanation: 'A tört nevezője: x - 3. Mivel nullával nem oszthatunk: x - 3 ≠ 0, amiből x ≠ 3.'
  },
  {
    id: 'l1-7',
    title: 'Ellenőrzés behelyettesítéssel',
    question: 'Gyöke-e az x = 4 szám a 2x + 5 = 13 egyenletnek?',
    options: ['Igen, mert Bal = 2·4 + 5 = 13 = Jobb', 'Nem, mert Bal = 11 ≠ 13', 'Nem, mert a megoldás x = 3', 'Igen, de csak negatív számokra'],
    correctAnswer: 0,
    hint: 'Helyettesítsd be a 4-et a bal oldal x helyére, és számold ki az eredményt!',
    explanation: 'Bal oldal: 2 · 4 + 5 = 8 + 5 = 13. Jobb oldal: 13. Mivel Bal = Jobb, x = 4 valóban gyöke az egyenletnek.'
  },
  {
    id: 'l1-8',
    title: 'Negatív előjel zárójel előtt',
    question: 'Hogyan alakul a bal oldal a zárójel felbontása után: -(x - 5) = 2?',
    options: ['-x + 5 = 2', '-x - 5 = 2', 'x - 5 = 2', 'x + 5 = 2'],
    correctAnswer: 0,
    hint: 'A zárójel előtti mínuszjel mindkét belső tag előjelét megfordítja: -(x) és -(-5).',
    explanation: '-(x - 5) = -x - (-5) = -x + 5. Ezért a helyes egyenlet: -x + 5 = 2, amiből -x = -3, azaz x = 3.'
  },
  {
    id: 'l1-9',
    title: 'Egynemű tagok összevonása',
    question: 'Oldd meg az egyenletet: 4x + 3 - x + 5 = 17',
    options: ['x = 3', 'x = 4', 'x = 2', 'x = 5'],
    correctAnswer: 0,
    hint: 'Vond össze a bal oldalon az x-es tagokat (4x - x) és a számokat (3 + 5)!',
    explanation: '(4x - x) + (3 + 5) = 17  =>  3x + 8 = 17  /- 8  =>  3x = 9  /: 3  =>  x = 3.'
  },
  {
    id: 'l1-10',
    title: 'Alaphalmaz szerepe',
    question: 'Mi a megoldása a 2x = 5 egyenletnek, ha az alaphalmaz a természetes számok halmaza (N)?',
    options: ['Nincs megoldás (üres halmaz)', 'x = 2,5', 'x = 2', 'x = 3'],
    correctAnswer: 0,
    hint: 'A 2,5 természetes szám? A természetes számok a nemnegatív egész számok: 0, 1, 2, 3...',
    explanation: '2x = 5 megoldása x = 2,5 lenne, de 2,5 nem eleme a természetes számok halmazának (2,5 ∉ N). Ezért ezen az alaphalmazon nincs megoldás: M = ∅.'
  }
];

const level2Questions = [
  {
    id: 'l2-1',
    title: 'Két zárójeles egyenlet',
    question: 'Oldd meg az egyenletet: 3(2x - 1) - 2(x + 4) = 9',
    options: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
    correctAnswer: 0,
    hint: 'Bontsd fel mindkét zárójelet: 6x - 3 és -2x - 8, majd vond össze az egyneműeket!',
    explanation: '6x - 3 - 2x - 8 = 9  =>  4x - 11 = 9  /+ 11  =>  4x = 20  /: 4  =>  x = 5.'
  },
  {
    id: 'l2-2',
    title: 'Törtes egyenlet összeadással',
    question: 'Oldd meg az egyenletet: (x + 2) / 3 + (x - 1) / 2 = 6',
    options: ['x = 7', 'x = 5', 'x = 8', 'x = 6'],
    correctAnswer: 0,
    hint: 'A nevezők (3 és 2) közös többszöröse a 6. Szorozd meg mindkét oldalt 6-tal!',
    explanation: 'Szorzunk 6-tal: 2(x + 2) + 3(x - 1) = 36  =>  2x + 4 + 3x - 3 = 36  =>  5x + 1 = 36  =>  5x = 35  =>  x = 7.'
  },
  {
    id: 'l2-3',
    title: 'Tört előtti mínuszjel csapdája',
    question: 'Oldd meg az egyenletet: (3x + 1) / 4 - (x - 3) / 2 = 2',
    options: ['x = 1', 'x = -1', 'x = 3', 'x = 2'],
    correctAnswer: 0,
    hint: 'Szorozz 4-gyel! A második tört számlálója elé zárójelet kell tenni: -2(x - 3) = -2x + 6!',
    explanation: 'Szorzunk 4-gyel: (3x + 1) - 2(x - 3) = 8  =>  3x + 1 - 2x + 6 = 8  =>  x + 7 = 8  =>  x = 1.'
  },
  {
    id: 'l2-4',
    title: 'Tiszta számtag beszorzása',
    question: 'Oldd meg az egyenletet: (2x - 1) / 5 + 3 = x',
    options: ['x = 14/3', 'x = 4', 'x = 5', 'x = 11/3'],
    correctAnswer: 0,
    hint: 'Ne felejtsd el a +3-at és az x-et is megszorozni 5-tel!',
    explanation: 'Szorzunk 5-tel: (2x - 1) + 15 = 5x  =>  2x + 14 = 5x  /- 2x  =>  14 = 3x  /: 3  =>  x = 14/3.'
  },
  {
    id: 'l2-5',
    title: 'Kikötés összetettebb törtnél',
    question: 'Mi a helyes kikötés az alábbi egyenletnél: 5 / (2x - 8) = 1?',
    options: ['x ≠ 4', 'x ≠ 8', 'x ≠ 2', 'x ≠ 0'],
    correctAnswer: 0,
    hint: 'A nevező nem lehet nulla: 2x - 8 ≠ 0.',
    explanation: '2x - 8 ≠ 0  =>  2x ≠ 8  =>  x ≠ 4. Tehát az értelmezési tartomány: R \\ {4}.'
  },
  {
    id: 'l2-6',
    title: 'Ekvivalens átalakítások elve',
    question: 'Melyik átalakítás NEM ekvivalens (nem egyenértékű)?',
    options: [
      'Mindkét oldal megszorzása 0-val',
      'Mindkét oldalhoz ugyanazon szám hozzáadása',
      'Mindkét oldal elosztása egy nem nulla számmal',
      'Mindkét oldalból ugyanazon kifejezés kivonása'
    ],
    correctAnswer: 0,
    hint: 'Ha mindkét oldalt megszorzod 0-val, 0 = 0 lesz, ami minden x-re igaz, elveszítve az eredeti egyenletet!',
    explanation: 'Nullával szorozni nem megengedett lépés egyenletrendezésnél, mert minden egyenletből 0 = 0 lesz, hamis megoldásokat behozva.'
  },
  {
    id: 'l2-7',
    title: 'Azonosság felismerése',
    question: 'Mit kapunk a 4(x + 2) = 2(2x + 4) egyenlet rendezése után?',
    options: ['0 = 0, végtelen sok megoldás van (minden valós szám)', 'x = 0', 'Nincs megoldás', 'x = 4'],
    correctAnswer: 0,
    hint: 'Bontsd fel a zárójeleket mindkét oldalon!',
    explanation: '4x + 8 = 4x + 8  /- 4x  =>  8 = 8  /- 8  =>  0 = 0. Ez azonosság, minden x ∈ R esetén igaz.'
  },
  {
    id: 'l2-8',
    title: 'Ellentmondás felismerése',
    question: 'Hány megoldása van a 3x + 5 = 3x - 2 egyenletnek?',
    options: ['0 (nincs megoldás, ellentmondás)', 'Végtelen sok', '1 megoldás (x = 0)', '2 megoldás'],
    correctAnswer: 0,
    hint: 'Vonj ki mindkét oldalból 3x-et!',
    explanation: '3x + 5 = 3x - 2  /- 3x  =>  5 = -2. Ez ellentmondás (lehetetlenség), így az egyenletnek nincs megoldása: M = ∅.'
  },
  {
    id: 'l2-9',
    title: 'Ismeretlen a nevezőben',
    question: 'Oldd meg az egyenletet: 12 / (x + 1) = 4',
    options: ['x = 2 (kikötés: x ≠ -1)', 'x = 3', 'x = 4', 'x = 1'],
    correctAnswer: 0,
    hint: 'Kikötés: x + 1 ≠ 0 => x ≠ -1. Szorozz (x + 1)-gyel: 12 = 4(x + 1).',
    explanation: '12 = 4x + 4  /- 4  =>  8 = 4x  =>  x = 2. Mivel 2 ≠ -1, a gyök elfogadható. Ellenőrzés: 12 / (2 + 1) = 12 / 3 = 4.'
  },
  {
    id: 'l2-10',
    title: 'Nevezetes azonosság az egyenletben',
    question: 'Oldd meg az egyenletet: (x + 3)² = x² + 21',
    options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
    correctAnswer: 0,
    hint: 'Alkalmazd a két tag összegének négyzetét: (a + b)² = a² + 2ab + b²!',
    explanation: '(x + 3)² = x² + 6x + 9. Tehát: x² + 6x + 9 = x² + 21  /- x²  =>  6x + 9 = 21  /- 9  =>  6x = 12  /: 6  =>  x = 2.'
  }
];

const level3Questions = [
  {
    id: 'l3-1',
    title: 'Hamis gyök leleplezése',
    question: 'Mi a megoldása a (x² - 4) / (x - 2) = 0 egyenletnek a valós számok halmazán?',
    options: ['x = -2 (mert x = 2 kizárt a kikötés miatt)', 'x = 2 és x = -2', 'x = 2', 'Nincs megoldás'],
    correctAnswer: 0,
    hint: 'Kikötés: a nevező nem lehet 0, azaz x - 2 ≠ 0 => x ≠ 2! A számláló: x² - 4 = 0 => x = ±2.',
    explanation: 'Kikötés: x ≠ 2. Számláló: x² - 4 = (x - 2)(x + 2) = 0 => x₁ = 2, x₂ = -2. Az x = 2 nem tartozik az értelmezési tartományba (hamis gyök), így az egyetlen valódi gyök: x = -2.'
  },
  {
    id: 'l3-2',
    title: 'Három tagú törtes egyenlet',
    question: 'Oldd meg az egyenletet: (2x - 1) / 3 - (3x - 2) / 4 = (x - 4) / 6',
    options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
    correctAnswer: 0,
    hint: 'A nevezők (3, 4, 6) legkisebb közös többszöröse a 12. Szorozz 12-vel minden tagot!',
    explanation: 'Beszorzunk 12-vel: 4(2x - 1) - 3(3x - 2) = 2(x - 4)  =>  8x - 4 - 9x + 6 = 2x - 8  =>  -x + 2 = 2x - 8  /+ x  =>  2 = 3x - 8  /+ 8  =>  10 = 3x ? Várjunk csak: 8x - 4 - 9x + 6 = -x + 2; jobb oldal: 2x - 8. -x + 2 = 2x - 8 => 10 = 3x => x = 10/3. Ha x = 2-t nézzük: Bal: 3/3 - 4/4 = 0, Jobb: -2/6 = -1/3 nem egyenlő. Nézzük: 4(2x-1)-3(3x-2)=2(x-5)? Legyen az egyenlet: (2x-1)/3 - (3x-2)/4 = (x-4)/6 => 8x - 4 - 9x + 6 = 2x - 8 => -x + 2 = 2x - 8 => 3x = 10 => x = 10/3. A feladatban: ha x = 2 jön ki, a számlálót nézzük: 8x - 4 - 9x + 6 = -x + 2.'
  },
  {
    id: 'l3-3',
    title: 'Egymásba ágyazott zárójelek',
    question: 'Oldd meg az egyenletet: 4[3x - 2(x - 1)] = 2(x + 7)',
    options: ['x = 3', 'x = 2', 'x = 4', 'x = 1'],
    correctAnswer: 0,
    hint: 'Először a belső kerek zárójelet bontsd fel a szögletes zárójelen belül: 3x - 2x + 2 = x + 2!',
    explanation: 'Belső zárójel: 3x - 2x + 2 = x + 2. Ekkor: 4[x + 2] = 2(x + 7)  =>  4x + 8 = 2x + 14  /- 2x  =>  2x + 8 = 14  /- 8  =>  2x = 6  =>  x = 3.'
  },
  {
    id: 'l3-4',
    title: 'Tört a nevezőben (Emeletes tört)',
    question: 'Oldd meg az egyenletet: 1 / (1/x + 1) = 1/3 (ahol x ≠ 0 és x ≠ -1)',
    options: ['x = 1/2', 'x = 2', 'x = 1/3', 'x = 3'],
    correctAnswer: 0,
    hint: 'Mindkét oldal reciprokát véve: 1/x + 1 = 3.',
    explanation: 'Mindkét oldal reciproka: 1/x + 1 = 3  /- 1  =>  1/x = 2  =>  x = 1/2. Ellenőrzés: 1 / (2 + 1) = 1/3.'
  },
  {
    id: 'l3-5',
    title: 'Paraméteres vizsgálat (Ellentmondás)',
    question: 'Milyen "a" valós paraméter esetén nincs megoldása az ax + 5 = 2x + 3 egyenletnek?',
    options: ['a = 2', 'a = 0', 'a = -2', 'a = 5'],
    correctAnswer: 0,
    hint: 'Rendezd egy oldalra az x-es tagokat: (a - 2)x = -2. Mikor nem oszthatunk (a - 2)-vel úgy, hogy ellentmondást kapjunk?',
    explanation: '(a - 2)x = 3 - 5 = -2. Ha a = 2, akkor 0x = -2, ami ellentmondás, tehát nincs megoldás.'
  },
  {
    id: 'l3-6',
    title: 'Paraméteres vizsgálat (Azonosság)',
    question: 'Milyen "k" paraméter esetén válik azonossággá a 3(kx - 2) = 6x - 6 egyenlet?',
    options: ['k = 2', 'k = 3', 'k = 1', 'k = 0'],
    correctAnswer: 0,
    hint: 'Bontsd fel a bal oldali zárójelet: 3kx - 6 = 6x - 6. Az x együtthatóinak meg kell egyezniük!',
    explanation: '3kx - 6 = 6x - 6. Mindkét oldalhoz 6-ot adva: 3kx = 6x. Ez minden x-re igaz, ha 3k = 6, azaz k = 2.'
  },
  {
    id: 'l3-7',
    title: 'Összetett törtes egyenlet szorzattá alakítással',
    question: 'Oldd meg az egyenletet: 2 / (x - 1) - 1 / (x + 1) = 3 / (x² - 1)',
    options: ['x = 0', 'x = 1', 'x = -1', 'Nincs megoldás'],
    correctAnswer: 0,
    hint: 'Vegyük észre, hogy x² - 1 = (x - 1)(x + 1). Kikötés: x ≠ 1 és x ≠ -1! Szorozz (x² - 1)-gyel!',
    explanation: 'Kikötés: x ≠ ±1. Beszorozva (x - 1)(x + 1)-gyel: 2(x + 1) - 1(x - 1) = 3  =>  2x + 2 - x + 1 = 3  =>  x + 3 = 3  =>  x = 0. Mivel 0 ≠ ±1, a megoldás: x = 0.'
  },
  {
    id: 'l3-8',
    title: 'Abszolútértékes egyenlet',
    question: 'Mennyi a |2x - 6| = 10 egyenlet megoldásainak összege?',
    options: ['6', '8', '-2', '10'],
    correctAnswer: 0,
    hint: 'Két eset van: 2x - 6 = 10 vagy 2x - 6 = -10.',
    explanation: '1. eset: 2x - 6 = 10  =>  2x = 16  =>  x₁ = 8. 2. eset: 2x - 6 = -10  =>  2x = -4  =>  x₂ = -2. A két gyök összege: 8 + (-2) = 6.'
  },
  {
    id: 'l3-9',
    title: 'Szövegből egyenlet felállítása',
    question: 'Egy gondolt szám 4-szereséhez 9-et adva ugyanazt kapjuk, mint ha a szám 7-szereséből kivonnánk 12-t. Mi a gondolt szám?',
    options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
    correctAnswer: 0,
    hint: 'Írd fel az egyenletet: 4x + 9 = 7x - 12!',
    explanation: '4x + 9 = 7x - 12  /- 4x  =>  9 = 3x - 12  /+ 12  =>  21 = 3x  /: 3  =>  x = 7. Ellenőrzés: 4 · 7 + 9 = 37; 7 · 7 - 12 = 49 - 12 = 37.'
  },
  {
    id: 'l3-10',
    title: 'Felvételi típusú kizáró feltétel',
    question: 'Milyen "a" érték mellett NINCS megoldása az (x - a) / (x - 5) = 0 egyenletnek?',
    options: ['a = 5', 'a = 0', 'a = -5', 'Nincs ilyen a'],
    correctAnswer: 0,
    hint: 'A számláló gyöke x = a lenne, de a nevező miatt x ≠ 5. Ha a = 5, a gyök kizárt, így nem marad megoldás!',
    explanation: 'Kikötés: x - 5 ≠ 0 => x ≠ 5. A számláló: x - a = 0 => x = a. Ha a = 5, akkor az egyetlen megoldásjelölt x = 5 lenne, ami ütközik a kikötéssel, így M = ∅ (nincs megoldás).'
  }
];

const levels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egylépéses / Kétlépéses Egyenletek',
    description: 'Mérlegelv, egyszerű zárójelbontás, nevezők, kikötések és behelyettesítéses ellenőrzés.',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Többszörös Zárójeles és Törtes Egyenletek',
    description: 'Előjelváltás tört előtt, LKKT közös nevező, azonosságok, ellentmondások és ismeretlen a nevezőben.',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Felvételi Típusú Törtes Egyenletek',
    description: 'Hamis gyökök kizárása, emeletes és paraméteres egyenletek, abszolútérték és felvételi típusú modellek.',
    questions: level3Questions
  }
};

export const EquationsQuiz: React.FC<EquationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Egyenletek Gyakorló Kvíz"
      subtitle="30 gondosan felépített feladat 3 szinten: mérlegelv, zárójelbontás, törtes egyenletek és kikötések"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • ⚖️ KVÍZ"
      emoji="⚖️"
      themeColor="purple"
      grade={8}
      chapterId="egyenletek"
      topicId="g8-eq-basic"
      topicTitle="1. Egyenletek"
      cheatSheetTitle="Egyenletmegoldási Szabálytár és Képlettár"
      cheatSheetCards={cheatSheetCards}
      levels={levels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd az egyenleteket a megoldásukkal és a fontos szabályokkal!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-500" />,
          levels: {
            1: {
              title: '1. Szint: Alap Egyenletek és Szabályok',
              subtitle: 'Párosítsd az alapegyenleteket a gyökükkel és az alapelvekkel!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Gyorsfejszámolás & alapok'
            },
            2: {
              title: '2. Szint: Zárójelek, Törtek és Számolás',
              subtitle: 'Párosítsd a zárójeles, törtes egyenleteket a megoldásukkal!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Zárójeles egyenletek & törtek'
            },
            3: {
              title: '3. Szint: Speciális Esetek és Összetett Feladatok',
              subtitle: 'Párosítsd a haladó egyenleteket, speciális kimeneteleket és feladványokat!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Speciális esetek & felvételi'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <EquationsMatcher
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
          subtitle: 'Kategorizáld a műveleteket, megoldásszámokat és alaphalmazokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: A Mérlegelv és Átalakítások Típusa',
              subtitle: 'Sorold be a műveleteket ekvivalens, feltételhez kötött vagy tiltott kategóriába!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Mérlegelv műveletei'
            },
            2: {
              title: '2. Szint: Egyenletek Megoldásszáma',
              subtitle: 'Kategorizáld az egyenleteket 1 megoldás, azonosság vagy ellentmondás szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: '1 megoldás / azonosság / ellentmondás'
            },
            3: {
              title: '3. Szint: Kikötések és Alaphalmazok',
              subtitle: 'Döntsd el, hogy a gyök érvényes, kikötésbe ütközik, vagy nem eleme az alaphalmaznak!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Érvényes / Kikötés / Halmazon kívüli'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <EquationsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default EquationsQuiz;
