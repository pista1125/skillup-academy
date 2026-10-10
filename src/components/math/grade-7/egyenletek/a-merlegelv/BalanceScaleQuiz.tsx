import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import {
  Scale,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Package,
  Layers,
  HelpCircle
} from 'lucide-react';
import BalanceScaleMatcher from './BalanceScaleMatcher';
import BalanceScaleSorter from './BalanceScaleSorter';

interface BalanceScaleQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Kétkarú Mérleg Alaptörvénye',
    icon: <Scale className="w-4 h-4 text-sky-600" />,
    formula: 'A = B \\iff A \\pm c = B \\pm c  •  A \\cdot c = B \\cdot c \\; (c \\neq 0)',
    note: 'A mérleg egyensúlyban marad, ha mindkét serpenyővel pontosan ugyanazt a műveletet hajtjuk végre.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#0284c7" strokeWidth="3" />
        <polygon points="75,45 85,45 80,25" fill="#64748b" />
        <rect x="25" y="10" width="25" height="15" rx="2" fill="#e0f2fe" stroke="#0284c7" />
        <text x="37" y="21" textAnchor="middle" className="text-[8px] font-bold fill-sky-900">2x + 2</text>
        <rect x="110" y="10" width="25" height="15" rx="2" fill="#e0f2fe" stroke="#0284c7" />
        <text x="122" y="21" textAnchor="middle" className="text-[8px] font-bold fill-sky-900">x + 5</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A 4 Lépéses Rendezési Algoritmus',
    icon: <ArrowRight className="w-4 h-4 text-emerald-600" />,
    formula: '1. \\text{Bontás} \\to 2. \\text{Összevonás} \\to 3. \\text{Ismeretlen egy oldalra} \\to 4. \\text{Osztás}',
    note: 'Előbb a kisebb együtthatójú x-et vonjuk ki mindkét oldalból, majd a számot tereljük a túloldalra.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="80" y="16" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">3x + 2 = x + 12</text>
        <text x="80" y="30" textAnchor="middle" className="text-[8px] font-mono fill-sky-700">/- x  -&gt;  2x = 10</text>
        <text x="80" y="44" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">/: 2  -&gt;  x = 5 ✓</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Negatív Együtthatóval Való Osztás',
    icon: <RotateCcw className="w-4 h-4 text-amber-600" />,
    formula: '-3x = 9 \\quad /: (-3) \\implies x = -3',
    note: 'Ügyelj a műveleti előjelre: pozitív osztva negatívval az negatív! (+ : - = -).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="45" height="26" rx="3" fill="#fef3c7" stroke="#d97706" />
        <text x="37" y="28" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">-3x = 9</text>
        <path d="M 65 25 L 90 25" stroke="#d97706" strokeWidth="2" />
        <text x="78" y="20" textAnchor="middle" className="text-[8px] font-mono fill-amber-700">/: (-3)</text>
        <rect x="95" y="12" width="45" height="26" rx="3" fill="#f0fdf4" stroke="#16a34a" />
        <text x="117" y="28" textAnchor="middle" className="text-[9px] font-bold fill-emerald-900">x = -3</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Tiltott Műveletek a Mérlegnél',
    icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
    formula: '/ \\cdot 0 \\; \\text{és} \\; /: 0 \\implies \\text{TILOS!}',
    note: 'Nullával szorozva minden egyenlet 0 = 0-vá válna, nullával osztani pedig nem szabad!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="18" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <line x1="68" y1="13" x2="92" y2="37" stroke="#ef4444" strokeWidth="3" />
        <text x="80" y="28" textAnchor="middle" className="text-[10px] font-bold fill-rose-900">: 0</text>
      </svg>
    )
  }
];

const balanceScaleQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'A mérleg bal serpenyőjében 2 egyforma doboz és egy 2 kg-os súly van, a jobb serpenyőjében 1 ilyen doboz és 5 kg súly van egyensúlyban: 2x + 2 = x + 5. Mennyi egy doboz tömege?',
    options: ['3 kg', '2 kg', '4 kg', '5 kg'],
    correctAnswer: '3 kg',
    explanation: 'Mindkét oldalból elveszünk 2 kg-ot (2x = x + 3), majd elveszünk 1 dobozt: x = 3 kg.',
    difficulty: 'easy',
    category: 'Mérleg modell'
  },
  {
    id: 'q2',
    text: 'Mit jelképez az egyenlőségjel (=) a kétkarú mérleg modelljében?',
    options: [
      'A mérleg egyensúlyi állapotát, ahol a két serpenyő tömege megegyezik',
      'Hogy a bal oldali serpenyő mindig nehezebb',
      'Hogy csak számokat tartalmazhat az egyenlet',
      'A mérlegrúd hosszát méterben'
    ],
    correctAnswer: 'A mérleg egyensúlyi állapotát, ahol a két serpenyő tömege megegyezik',
    explanation: 'Az egyenlőségjel azt fejezi ki, hogy a bal oldal és a jobb oldal értéke (tömege) azonos.',
    difficulty: 'easy',
    category: 'Alapfogalmak'
  },
  {
    id: 'q3',
    text: 'Megváltozik-e egy egyenlet egyenlősége (igazsághalmaza), ha mindkét oldalához ugyanazt a számot adjuk hozzá?',
    options: [
      'Nem, az egyensúly fennmarad (ekvivalens átalakítás)',
      'Igen, a bal oldal nehezebb lesz',
      'Csak akkor nem változik, ha a hozzáadott szám 0',
      'Igen, minden megoldás a kétszeresére nő'
    ],
    correctAnswer: 'Nem, az egyensúly fennmarad (ekvivalens átalakítás)',
    explanation: 'Ha mindkét serpenyőbe azonos tömeget teszünk, a mérleg egyensúlyban marad: A = B <==> A + c = B + c.',
    difficulty: 'easy',
    category: 'Ekvivalencia'
  },
  {
    id: 'q4',
    text: 'A 3x + 2 = x + 12 egyenlet megoldásakor mi a célszerű első lépés a +2 konstans eltüntetésére?',
    options: [
      'Mindkét oldalból kivonunk 2-t (/- 2)',
      'Mindkét oldalhoz hozzáadunk 2-t (/+ 2)',
      'Csak a bal oldalból vonunk ki 2-t',
      'Mindkét oldalt elosztjuk 2-vel (/: 2)'
    ],
    correctAnswer: 'Mindkét oldalból kivonunk 2-t (/- 2)',
    explanation: 'A +2 ellentettje a -2: 3x + 2 - 2 = x + 12 - 2, amiből 3x = x + 10.',
    difficulty: 'easy',
    category: 'Mérlegelv lépés'
  },
  {
    id: 'q5',
    text: 'Oldd meg mérlegelvvel a tankönyv 2. példáját: 3x + 2 = x + 12! Mennyi x értéke?',
    options: ['5', '6', '4', '7'],
    correctAnswer: '5',
    explanation: '3x + 2 = x + 12 /- 2 -> 3x = x + 10 /- x -> 2x = 10 /: 2 -> x = 5. Ellenőrzés: 3·5 + 2 = 17 és 5 + 12 = 17 ✓',
    difficulty: 'easy',
    category: 'Egyenletmegoldás'
  },
  {
    id: 'q6',
    text: 'A 24 - 3x = 3x munkafüzeti egyenletnél hogyan gyűjthetjük egy oldalra az ismeretlent egyetlen lépésben?',
    options: [
      'Mindkét oldalhoz hozzáadunk 3x-et (/+ 3x)',
      'Mindkét oldalból kivonunk 3x-et (/- 3x)',
      'Mindkét oldalt elosztjuk 3-mal (/: 3)',
      'Mindkét oldalból kivonunk 24-et (/- 24)'
    ],
    correctAnswer: 'Mindkét oldalhoz hozzáadunk 3x-et (/+ 3x)',
    explanation: '-3x + 3x = 0, így 24 = 6x lesz, amiből x = 4.',
    difficulty: 'easy',
    category: 'Mérlegelv lépés'
  },
  {
    id: 'q7',
    text: 'Oldd meg mérlegelvvel a 4x + 2 = 2x + 10 egyenletet! Mennyi x?',
    options: ['4', '5', '3', '6'],
    correctAnswer: '4',
    explanation: '4x + 2 = 2x + 10 /- 2x -> 2x + 2 = 10 /- 2 -> 2x = 8 /: 2 -> x = 4.',
    difficulty: 'easy',
    category: 'Egyenletmegoldás'
  },
  {
    id: 'q8',
    text: 'Miért NEM lehet a 4x - 7 = 2x + 5 egyenletet lebontogatással megoldani?',
    options: [
      'Mert az ismeretlen az egyenlet mindkét oldalán szerepel',
      'Mert negatív szám (-7) szerepel benne',
      'Mert az x együtthatója páros',
      'Mert a mérleg serpenyői túl nehezek'
    ],
    correctAnswer: 'Mert az ismeretlen az egyenlet mindkét oldalán szerepel',
    explanation: 'A lebontogatás csak akkor működik, ha az ismeretlen egyetlen kifejezésláncban van, és a másik oldalon egyetlen szám áll.',
    difficulty: 'easy',
    category: 'Módszerek összehasonlítása'
  },
  {
    id: 'q9',
    text: 'Mit jelent a ferde vonal mögötti „/- 5x” jelölés a 8x - 2 = 5x + 7 egyenlet mellett?',
    options: [
      'Mindkét oldalból kivonunk 5x-et',
      'Csak a jobb oldalból vonunk ki 5x-et',
      'Elosztjuk mindkét oldalt 5x-szel',
      'Megszorozzuk az egyenletet (-5x)-szel'
    ],
    correctAnswer: 'Mindkét oldalból kivonunk 5x-et',
    explanation: 'A mérlegelv szerint a műveletet mindig MINDKÉT OLDALON el kell végezni: 8x - 5x - 2 = 5x - 5x + 7 -> 3x - 2 = 7.',
    difficulty: 'easy',
    category: 'Jelölésrendszer'
  },
  {
    id: 'q10',
    text: 'Miért TILTOTT átalakítás az egyenlet mindkét oldalát megszorozni nullával (/ · 0)?',
    options: [
      'Mert 0 = 0 azonossággá válik, így elveszítjük az egyenlet eredeti megoldáshalmazát',
      'Mert a 0 nem valós szám',
      'Mert a nulla mindig negatív számot eredményez',
      'Mert nullával szorozva a számok megduplázódnak'
    ],
    correctAnswer: 'Mert 0 = 0 azonossággá válik, így elveszítjük az egyenlet eredeti megoldáshalmazát',
    explanation: 'Ha 0-val szorzunk, a bal oldal is 0, a jobb oldal is 0 lesz, így minden szám gyökké válna, ami hamis.',
    difficulty: 'easy',
    category: 'Tiltott műveletek'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Oldd meg mérlegelvvel a tankönyvi 3. példát: 4x - 7 = 2x + 5! Mennyi x értéke?',
    options: ['6', '5', '7', '8'],
    correctAnswer: '6',
    explanation: '4x - 7 = 2x + 5 /+ 7 -> 4x = 2x + 12 /- 2x -> 2x = 12 /: 2 -> x = 6. Ellenőrzés: 4·6 - 7 = 17; 2·6 + 5 = 17 ✓',
    difficulty: 'medium',
    category: 'Mérlegelv megoldás'
  },
  {
    id: 'q12',
    text: 'Oldd meg az 1 - 4x = 10 - x egyenletet mérlegelvvel! Ügyelj a negatív számokra!',
    options: ['-3', '3', '-2', '2'],
    correctAnswer: '-3',
    explanation: '1 - 4x = 10 - x /+ x -> 1 - 3x = 10 /- 1 -> -3x = 9 /: (-3) -> x = -3. Ellenőrzés: 1 - 4·(-3) = 13; 10 - (-3) = 13 ✓',
    difficulty: 'medium',
    category: 'Negatív gyökök'
  },
  {
    id: 'q13',
    text: 'Oldd meg az egyenletet: 6x - 2 = 5x + 7! Mennyi az ismeretlen értéke?',
    options: ['9', '8', '10', '5'],
    correctAnswer: '9',
    explanation: '6x - 2 = 5x + 7 /- 5x -> x - 2 = 7 /+ 2 -> x = 9.',
    difficulty: 'medium',
    category: 'Egyenletrendezés'
  },
  {
    id: 'q14',
    text: 'Oldd meg a tankönyvi egyenletet: 4x + 2 = 2x + 22! Mennyi x értéke?',
    options: ['10', '12', '8', '11'],
    correctAnswer: '10',
    explanation: '4x + 2 = 2x + 22 /- 2x -> 2x + 2 = 22 /- 2 -> 2x = 20 /: 2 -> x = 10.',
    difficulty: 'medium',
    category: 'Egyenletrendezés'
  },
  {
    id: 'q15',
    text: 'Mennyi a gyöke az 5x + 12 = 9x - 16 munkafüzeti egyenletnek?',
    options: ['7', '6', '8', '5'],
    correctAnswer: '7',
    explanation: '5x + 12 = 9x - 16 /- 5x -> 12 = 4x - 16 /+ 16 -> 28 = 4x /: 4 -> x = 7.',
    difficulty: 'medium',
    category: 'Egyenletrendezés'
  },
  {
    id: 'q16',
    text: 'Oldd meg a 8x - 7 = 4x + 29 egyenletet mérlegelvvel! Mennyi x?',
    options: ['9', '8', '7', '10'],
    correctAnswer: '9',
    explanation: '8x - 7 = 4x + 29 /- 4x -> 4x - 7 = 29 /+ 7 -> 4x = 36 /: 4 -> x = 9.',
    difficulty: 'medium',
    category: 'Egyenletrendezés'
  },
  {
    id: 'q17',
    text: 'Oldd meg a 6x + 14 = 9x - 10 egyenletet! Mennyi az ismeretlen értéke?',
    options: ['8', '7', '9', '6'],
    correctAnswer: '8',
    explanation: '6x + 14 = 9x - 10 /- 6x -> 14 = 3x - 10 /+ 10 -> 24 = 3x /: 3 -> x = 8.',
    difficulty: 'medium',
    category: 'Egyenletrendezés'
  },
  {
    id: 'q18',
    text: 'Csilla életkorának ötszöröse 26-tal kevesebb a hétszeresénél: 5x + 26 = 7x. Hány éves Csilla?',
    options: ['13 éves', '12 éves', '14 éves', '15 éves'],
    correctAnswer: '13 éves',
    explanation: '5x + 26 = 7x /- 5x -> 26 = 2x /: 2 -> x = 13. Ellenőrzés: 5·13 = 65, 7·13 = 91, 91 - 65 = 26 ✓',
    difficulty: 'medium',
    category: 'Szöveges feladat'
  },
  {
    id: 'q19',
    text: 'Egy szám ötszöröséhez 120-at adva a szám hétszeresét kapjuk: 5x + 120 = 7x. Melyik ez a szám?',
    options: ['60', '50', '70', '40'],
    correctAnswer: '60',
    explanation: '5x + 120 = 7x /- 5x -> 120 = 2x /: 2 -> x = 60.',
    difficulty: 'medium',
    category: 'Szöveges feladat'
  },
  {
    id: 'q20',
    text: 'Bontsd fel a zárójeleket és oldd meg: 2(x + 1) = 3(x - 1)! Mennyi x?',
    options: ['5', '4', '6', '3'],
    correctAnswer: '5',
    explanation: '2x + 2 = 3x - 3 /- 2x -> 2 = x - 3 /+ 3 -> x = 5. Ellenőrzés: 2(5+1) = 12, 3(5-1) = 12 ✓',
    difficulty: 'medium',
    category: 'Zárójeles egyenlet'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Oldd meg mérlegelvvel a tankönyvi egyenletet: 8x - 1 = 4x + 29! Mennyi x értéke?',
    options: ['7,5', '7', '8', '8,5'],
    correctAnswer: '7,5',
    explanation: '8x - 1 = 4x + 29 /- 4x -> 4x - 1 = 29 /+ 1 -> 4x = 30 /: 4 -> x = 7,5.',
    difficulty: 'hard',
    category: 'Tizedestört gyök'
  },
  {
    id: 'q22',
    text: 'Oldd meg a -7 + 8x = 8 - 7x egyenletet! Mennyi x értéke?',
    options: ['1', '0', '-1', '2'],
    correctAnswer: '1',
    explanation: '-7 + 8x = 8 - 7x /+ 7x -> -7 + 15x = 8 /+ 7 -> 15x = 15 /: 15 -> x = 1.',
    difficulty: 'hard',
    category: 'Negatív együtthatók'
  },
  {
    id: 'q23',
    text: 'Oldd meg a zárójeles egyenletet: 9(2x - 1) = 9(1 - 2x)! Mennyi x?',
    options: ['0,5', '1', '0', '-0,5'],
    correctAnswer: '0,5',
    explanation: '18x - 9 = 9 - 18x /+ 18x -> 36x - 9 = 9 /+ 9 -> 36x = 18 /: 36 -> x = 18/36 = 0,5.',
    difficulty: 'hard',
    category: 'Zárójeles egyenlet'
  },
  {
    id: 'q24',
    text: 'Oldd meg a 6(x + 7) = 3(10 - x) egyenletet! Mennyi x értéke közönséges tört alakban?',
    options: ['-4/3', '-3/4', '4/3', '-2'],
    correctAnswer: '-4/3',
    explanation: '6x + 42 = 30 - 3x /+ 3x -> 9x + 42 = 30 /- 42 -> 9x = -12 /: 9 -> x = -12/9 = -4/3 = -1 egész 1/3.',
    difficulty: 'hard',
    category: 'Tört gyök'
  },
  {
    id: 'q25',
    text: 'Oldd meg a 4(3x - 7) = 4(7x - 3) egyenletet mérlegelvvel! Mennyi x?',
    options: ['-1', '1', '-2', '0'],
    correctAnswer: '-1',
    explanation: '12x - 28 = 28x - 12 /- 12x -> -28 = 16x - 12 /+ 12 -> -16 = 16x /: 16 -> x = -1.',
    difficulty: 'hard',
    category: 'Negatív egész gyök'
  },
  {
    id: 'q26',
    text: 'Egy szám négyszereséből 29-et kivonva a szám nyolcszorosánál 1-gyel nagyobb számot kapunk: 4x - 29 = 8x + 1. Melyik ez a szám?',
    options: ['-7,5', '7,5', '-7', '-8'],
    correctAnswer: '-7,5',
    explanation: '4x - 29 = 8x + 1 /- 4x -> -29 = 4x + 1 /- 1 -> -30 = 4x /: 4 -> x = -7,5.',
    difficulty: 'hard',
    category: 'Szöveges egyenlet'
  },
  {
    id: 'q27',
    text: 'Egy számnál 8-cal nagyobb szám tízszerese egyenlő a számnál 2-vel kisebb szám hatszorosával: 10(x + 8) = 6(x - 2). Melyik ez a szám?',
    options: ['-23', '23', '-20', '-25'],
    correctAnswer: '-23',
    explanation: '10x + 80 = 6x - 12 /- 6x -> 4x + 80 = -12 /- 80 -> 4x = -92 /: 4 -> x = -23. Ellenőrzés: 10(-15) = -150; 6(-25) = -150 ✓',
    difficulty: 'hard',
    category: 'Összetett szöveges'
  },
  {
    id: 'q28',
    text: 'Végezd el az összevonásokat és oldd meg: 6x + 4 - 7x - 2 = 6x + 1 + 2x - 3! Mennyi x?',
    options: ['4/9', '9/4', '-4/9', '1/2'],
    correctAnswer: '4/9',
    explanation: 'Bal oldal: -x + 2. Jobb oldal: 8x - 2. -x + 2 = 8x - 2 /+ x -> 2 = 9x - 2 /+ 2 -> 4 = 9x /: 9 -> x = 4/9.',
    difficulty: 'hard',
    category: 'Összevonás és mérlegelv'
  },
  {
    id: 'q29',
    text: 'Oldd meg a 21(x - 1) + 9 = 9(x - 1) + 9 egyenletet! Figyeld meg az okos egyszerűsítést!',
    options: ['1', '0', '2', '3'],
    correctAnswer: '1',
    explanation: 'Mindkét oldalból levonva 9-et: 21(x - 1) = 9(x - 1) /- 9(x - 1) -> 12(x - 1) = 0 /: 12 -> x - 1 = 0 -> x = 1.',
    difficulty: 'hard',
    category: 'Okos egyenletrendezés'
  },
  {
    id: 'q30',
    text: 'Döntsd el a munkafüzeti összevonást: 7x - 9 - 4x - 8 - 2x - 5 = 8 - 3x + 7 + 5x + 1 + 3x! Melyik az összevont alak és a gyök?',
    options: [
      'x - 22 = 5x + 16, a megoldás: x = -9,5',
      'x - 22 = 5x + 16, a megoldás: x = 9,5',
      '3x - 22 = 5x + 16, a megoldás: x = -19',
      'x - 17 = 5x + 15, a megoldás: x = -8'
    ],
    correctAnswer: 'x - 22 = 5x + 16, a megoldás: x = -9,5',
    explanation: 'Bal: (7-4-2)x + (-9-8-5) = x - 22. Jobb: (-3+5+3)x + (8+7+1) = 5x + 16. x - 22 = 5x + 16 /- x -> -22 = 4x + 16 /- 16 -> -38 = 4x -> x = -9,5.',
    difficulty: 'hard',
    category: 'Hosszú összevonás'
  }
];

export const BalanceScaleQuiz: React.FC<BalanceScaleQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-balance-quiz"
      topicTitle="A mérlegelv"
      title="A mérlegelv - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: kétkarú mérleg modell, ekvivalens átalakítások, egyenletrendezés és szöveges problémák"
      badge="GYAKORLÓ KVÍZ"
      themeColor="sky"
      questions={balanceScaleQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <BalanceScaleMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <BalanceScaleSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default BalanceScaleQuiz;
