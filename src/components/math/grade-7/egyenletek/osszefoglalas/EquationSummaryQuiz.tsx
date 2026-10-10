import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel, LevelConfig } from '../QuizTemplate';
import {
  BookOpen,
  Calculator,
  Scale,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Equal,
  RotateCcw,
  Check,
  Users,
  Target,
  Trophy,
  ArrowUpDown
} from 'lucide-react';
import EquationSummaryMatcher from './EquationSummaryMatcher';
import EquationSummarySorter from './EquationSummarySorter';

interface EquationSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Megoldáshalmaz 3 Esete',
    icon: <Target className="w-4 h-4 text-indigo-600" />,
    formula: '1. \\text{Egyértelmű gyök } (M = \\{x_0\\}) \\quad | \\quad 2. \\text{Ellentmondás } (M = \\emptyset) \\quad | \\quad 3. \\text{Azonosság } (M = A)',
    note: '0x = b (b ≠ 0) esetén nincs megoldás; 0x = 0 esetén minden alaphalmazbeli szám megoldás.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="46" height="34" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
        <text x="28" y="24" textAnchor="middle" className="text-[8px] font-bold fill-indigo-900">1 Gyök</text>
        <text x="28" y="34" textAnchor="middle" className="text-[7px] fill-indigo-600 font-mono">ax = b</text>

        <rect x="57" y="8" width="46" height="34" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
        <text x="80" y="24" textAnchor="middle" className="text-[8px] font-bold fill-rose-900">Nincs</text>
        <text x="80" y="34" textAnchor="middle" className="text-[7px] fill-rose-600 font-mono">0x = b</text>

        <rect x="109" y="8" width="46" height="34" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="132" y="24" textAnchor="middle" className="text-[8px] font-bold fill-emerald-900">Azonos</text>
        <text x="132" y="34" textAnchor="middle" className="text-[7px] fill-emerald-600 font-mono">0x = 0</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A Mérlegelv 7 Lépése',
    icon: <Scale className="w-4 h-4 text-indigo-600" />,
    formula: '1. A \\to 2. \\cdot LKKT \\to 3. () \\to 4. \\text{Összev.} \\to 5. \\text{Rendez} \\to 6. :a \\to 7. \\text{Ell.}',
    note: 'A lépéseket mindig következetesen hajtsuk végre, és az ellenőrzést az EREDETI egyenletbe helyettesítve végezzük!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 15 25 L 145 25" stroke="#6366f1" strokeWidth="2" />
        <circle cx="80" cy="25" r="4" fill="#4f46e5" />
        <rect x="25" y="15" width="20" height="10" rx="2" fill="#818cf8" />
        <rect x="115" y="15" width="20" height="10" rx="2" fill="#818cf8" />
        <text x="80" y="42" textAnchor="middle" className="text-[8px] font-bold fill-indigo-900">Ekvivalens átalakítás</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Szöveges Feladatok 5 Lépése',
    icon: <Users className="w-4 h-4 text-indigo-600" />,
    formula: '1. \\text{Értelmezés} \\to 2. x \\to 3. \\text{Egyenlet} \\to 4. \\text{Megoldás} \\to 5. \\text{Szöv. ell.}',
    note: 'Mindig a legkisebb vagy alap adatot jelöld x-szel, és a végén kerek mondatban válaszolj.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="10" width="140" height="30" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <text x="80" y="28" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Szöveg ⟹ x ⟹ Egyenlet ⟹ Válasz</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Egyenlőtlenség Aranyszabálya',
    icon: <ArrowUpDown className="w-4 h-4 text-indigo-600" />,
    formula: '-a \\cdot x < b \\xrightarrow{/:(-a)} x > -\\frac{b}{a}',
    note: 'Negatív számmal szorozva vagy osztva a relációs jel iránya azonnal és kötelezően megfordul!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="60" height="30" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
        <text x="45" y="28" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">-2x &lt; 6</text>
        <path d="M 80 25 L 95 25" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="100" y="10" width="50" height="30" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <text x="125" y="28" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">x &gt; -3</text>
      </svg>
    )
  }
];

// --- 90 QUESTIONS (30 per level) ---
const allQuestions: Question[] = [
  // ==========================================
  // LEVEL 1: Alapfogalmak és Egyszerű Mérlegelv (1 - 30)
  // ==========================================
  {
    id: 'q1',
    level: 1,
    question: 'Mi a matematikai egyenlet definíciója?',
    options: [
      'Két algebrai kifejezés egyenlőségét állító nyitott mondat',
      'Bármilyen műveletsor, amelyben betűk szerepelnek',
      'Olyan képlet, amelynek mindig van pozitív egész megoldása',
      'Két szám közötti egyenlőtlenségi reláció'
    ],
    correctAnswer: 'Két algebrai kifejezés egyenlőségét állító nyitott mondat',
    explanation: 'Az egyenlet olyan nyitott mondat, amelyben két kifejezés közé egyenlőségjelet teszünk (Bal oldal = Jobb oldal).',
    hint: 'Gondolj a "Bal oldal = Jobb oldal" szerkezetre!'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Mit nevezünk nyitott mondatnak?',
    options: [
      'Olyan állítást, amely változót tartalmaz, és igazsága a változó értékétől függ',
      'Minden olyan mondatot, amelynek a végén nincs pont',
      'Olyan állítást, amely mindig hamis',
      'Csak olyan képletet, amelyben nincs egyenlőségjel'
    ],
    correctAnswer: 'Olyan állítást, amely változót tartalmaz, és igazsága a változó értékétől függ',
    explanation: 'A nyitott mondat igazságtartalma attól függ, hogy milyen értéket helyettesítünk be a változó (betű) helyére.',
    hint: 'A betűbe helyettesített számtól függ az igazsága.'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Mit jelent az egyenlet alaphalmaza (A)?',
    options: [
      'Azon számok halmazát, amelyek közül a megoldást egyáltalán kereshetjük',
      'A helyes megoldások halmazát',
      'Csak a pozitív egész számok halmazát',
      'A bal oldal konstans számainak összegét'
    ],
    correctAnswer: 'Azon számok halmazát, amelyek közül a megoldást egyáltalán kereshetjük',
    explanation: 'Az alaphalmaz jelöli ki a számok azon körét (pl. N, Z, Q), amelyből az ismeretlen értékeit választhatjuk.',
    hint: 'Ez a keret, amelyből meríthetünk.'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Mit nevezünk az egyenlet megoldáshalmazának (M)?',
    options: [
      'Az alaphalmaz azon elemeinek halmazát, amelyeket behelyettesítve az egyenlőség igazzá válik',
      'Az alaphalmaz összes elemét',
      'Az egyenletben szereplő összes konstans szám összegét',
      'Az ismeretlen együtthatóját'
    ],
    correctAnswer: 'Az alaphalmaz azon elemeinek halmazát, amelyeket behelyettesítve az egyenlőség igazzá válik',
    explanation: 'A megoldáshalmaz (M ⊆ A) pontosan azokat a számokat tartalmazza, amelyek kielégítik az egyenletet.',
    hint: 'Azok a számok alkotják, amelyek tényleg jók.'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Mi az x + 7 = 15 egyenlet megoldása az egész számok (Z) halmazán?',
    options: ['x = 8', 'x = 22', 'x = 7', 'x = 9'],
    correctAnswer: 'x = 8',
    explanation: 'Mindkét oldalból kivonva 7-et: x = 15 - 7 = 8.',
    hint: 'Vonj ki 7-et mindkét oldalból!'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Oldd meg az x - 9 = 4 egyenletet!',
    options: ['x = 13', 'x = -5', 'x = 5', 'x = 36'],
    correctAnswer: 'x = 13',
    explanation: 'Mindkét oldalhoz 9-et adva: x = 4 + 9 = 13.',
    hint: 'Adj hozzá 9-et mindkét oldalhoz!'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Mennyi az ismeretlen értéke a 3x = 21 egyenletben?',
    options: ['x = 7', 'x = 18', 'x = 63', 'x = 9'],
    correctAnswer: 'x = 7',
    explanation: 'Mindkét oldalt 3-mal osztva: x = 21 / 3 = 7.',
    hint: 'Oszd el mindkét oldalt 3-mal!'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Mi a megoldása az x / 4 = 6 egyenletnek?',
    options: ['x = 24', 'x = 1,5', 'x = 10', 'x = 2'],
    correctAnswer: 'x = 24',
    explanation: 'Mindkét oldalt 4-gyel megszorozva: x = 6 · 4 = 24.',
    hint: 'Szorozd be mindkét oldalt 4-gyel!'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Oldd meg a 2x + 5 = 17 egyenletet!',
    options: ['x = 6', 'x = 11', 'x = 8', 'x = 5'],
    correctAnswer: 'x = 6',
    explanation: '2x + 5 = 17  ⟹  2x = 12  ⟹  x = 6.',
    hint: 'Először vonj ki 5-öt, majd ossz 2-vel!'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Mennyi a 4x - 8 = 12 egyenlet gyöke?',
    options: ['x = 5', 'x = 1', 'x = 4', 'x = 6'],
    correctAnswer: 'x = 5',
    explanation: '4x - 8 = 12  ⟹  4x = 20  ⟹  x = 5.',
    hint: 'Adj hozzá 8-at, majd ossz 4-gyel!'
  },
  {
    id: 'q11',
    level: 1,
    question: 'Oldd meg a 10 - x = 3 egyenletet!',
    options: ['x = 7', 'x = 13', 'x = -7', 'x = -13'],
    correctAnswer: 'x = 7',
    explanation: '10 - x = 3  ⟹  10 = 3 + x  ⟹  x = 7.',
    hint: '10-ből mit kell kivonni, hogy 3 maradjon?'
  },
  {
    id: 'q12',
    level: 1,
    question: 'Mi az 5x = 0 egyenlet gyöke a racionális számok (Q) halmazán?',
    options: ['x = 0', 'Nincs megoldás', 'x = 5', 'Végtelen sok megoldás'],
    correctAnswer: 'x = 0',
    explanation: 'Mindkét oldalt 5-tel osztva: x = 0 / 5 = 0. A 0 egy teljesen szabályos racionális szám.',
    hint: 'Nullát osztva 5-tel mit kapunk?'
  },
  {
    id: 'q13',
    level: 1,
    question: 'Milyen megoldása van a 0 · x = 5 egyenletnek?',
    options: [
      'Nincs megoldás (M = ∅, ellentmondás)',
      'x = 0',
      'x = 5',
      'Minden szám megoldás (azonosság)'
    ],
    correctAnswer: 'Nincs megoldás (M = ∅, ellentmondás)',
    explanation: 'Bármilyen x-re 0 · x = 0, de 0 soha nem egyenlő 5-tel. Ez ellentmondás, így M = ∅.',
    hint: 'Lehet a nulla szorzat egyenlő öttel?'
  },
  {
    id: 'q14',
    level: 1,
    question: 'Milyen megoldása van a 0 · x = 0 egyenletnek?',
    options: [
      'Végtelen sok megoldás (Azonosság, M = A)',
      'Csak az x = 0 a megoldás',
      'Nincs megoldás (M = ∅)',
      'x = 1'
    ],
    correctAnswer: 'Végtelen sok megoldás (Azonosság, M = A)',
    explanation: 'Bármilyen számot írunk x helyére, 0 · x = 0 mindig teljesül (0 = 0). Ez egy azonosság.',
    hint: 'Minden behelyettesített számmal igaz az egyenlőség.'
  },
  {
    id: 'q15',
    level: 1,
    question: 'Mit nevezünk ekvivalens átalakításnak az egyenletmegoldás során?',
    options: [
      'Olyan lépést, amely nem változtatja meg az egyenlet megoldáshalmazát',
      'Olyan lépést, amelytől az egyenlet mindkét oldala pozitív lesz',
      'Csak az ismeretlennel való osztást',
      'Bármilyen szorzást vagy hatványozást'
    ],
    correctAnswer: 'Olyan lépést, amely nem változtatja meg az egyenlet megoldáshalmazát',
    explanation: 'Az ekvivalens átalakítás lényege, hogy sem új gyök nem keletkezik, sem meglévő gyök nem vész el.',
    hint: 'A megoldáshalmaz érintetlen marad.'
  },
  {
    id: 'q16',
    level: 1,
    question: 'Az alábbi lépések közül melyik minősül ekvivalens átalakításnak?',
    options: [
      'Mindkét oldalhoz ugyanannak a számnak a hozzáadása',
      'Mindkét oldal elosztása 0-val',
      'A bal oldal megszorzása 3-mal a jobb oldal változatlanul hagyásával',
      'Az ismeretlen elhagyása mindkét oldalon'
    ],
    correctAnswer: 'Mindkét oldalhoz ugyanannak a számnak a hozzáadása',
    explanation: 'A mérleg elve alapján ha mindkét serpenyőbe ugyanazt a súlyt tesszük, az egyensúly megmarad.',
    hint: 'Mindkét oldalon ugyanazt a műveletet kell elvégezni.'
  },
  {
    id: 'q17',
    level: 1,
    question: 'Melyik művelet SZIGORÚAN TILOS a mérlegelv alkalmazásakor?',
    options: [
      'Nullával való osztás',
      'Negatív számmal való szorzás',
      'Törttel való osztás',
      'Nagy szám hozzáadása'
    ],
    correctAnswer: 'Nullával való osztás',
    explanation: 'A nullával való osztás matematikailag értelmetlen művelet, ezért soha nem végezhető el.',
    hint: 'Melyik műveletet nem értelmezzük a matematikában?'
  },
  {
    id: 'q18',
    level: 1,
    question: 'Mi a helyes eljárás az egyenlet ellenőrzésekor?',
    options: [
      'A kapott gyököt behelyettesítjük az EREDETI egyenlet bal és jobb oldalába külön-külön',
      'Csak a bal oldalba helyettesítünk be',
      'A kapott gyököt a legutolsó rendezett sorba helyettesítjük be',
      'Ha egész szám jött ki, nem kell ellenőrizni'
    ],
    correctAnswer: 'A kapott gyököt behelyettesítjük az EREDETI egyenlet bal és jobb oldalába külön-külön',
    explanation: 'Az ellenőrzés csak akkor tárja fel a rendezési hibákat, ha a legelső, eredeti egyenletbe helyettesítünk.',
    hint: 'Mindig a feladat legelső sorába helyettesíts!'
  },
  {
    id: 'q19',
    level: 1,
    question: 'Oldd meg az x + 4 = 1 egyenletet, ha az alaphalmaz a természetes számok halmaza (A = N)!',
    options: [
      'Nincs megoldás (M = ∅)',
      'x = -3',
      'x = 3',
      'x = 5'
    ],
    correctAnswer: 'Nincs megoldás (M = ∅)',
    explanation: 'x = 1 - 4 = -3. Mivel -3 nem természetes szám (-3 ∉ N), az alaphalmazon nincs megoldás: M = ∅.',
    hint: 'A -3 benne van a természetes számokban?'
  },
  {
    id: 'q20',
    level: 1,
    question: 'Oldd meg a 2x = 3 egyenletet, ha az alaphalmaz az egész számok halmaza (A = Z)!',
    options: [
      'Nincs megoldás (M = ∅)',
      'x = 1,5',
      'x = 3/2',
      'x = 1'
    ],
    correctAnswer: 'Nincs megoldás (M = ∅)',
    explanation: 'x = 3 / 2 = 1,5. Mivel 1,5 nem egész szám (1,5 ∉ Z), az alaphalmazon M = ∅.',
    hint: 'A másfél egész szám?'
  },
  {
    id: 'q21',
    level: 1,
    question: 'Gondoltam egy számot, hozzáadtam 6-ot, és 19-et kaptam. Melyik számra gondoltam?',
    options: ['13', '25', '12', '14'],
    correctAnswer: '13',
    explanation: 'x + 6 = 19  ⟹  x = 19 - 6 = 13.',
    hint: '19-ből vonj ki 6-ot!'
  },
  {
    id: 'q22',
    level: 1,
    question: 'Egy szám 3-szorosa 36. Mennyi a szám fele?',
    options: ['6', '12', '18', '24'],
    correctAnswer: '6',
    explanation: '3x = 36  ⟹  x = 12. A szám fele: 12 / 2 = 6.',
    hint: 'Először találd meg a számot (36 / 3), majd felezd meg!'
  },
  {
    id: 'q23',
    level: 1,
    question: 'A 2x + 3 = 11 egyenletet lebontogatással oldjuk meg. Mi a helyes első lépés?',
    options: [
      'Mindkét oldalból kivonunk 3-at',
      'Mindkét oldalt elosztjuk 2-vel',
      'Mindkét oldalhoz hozzáadunk 3-at',
      'Összeadjuk a 2-t és a 3-at 5-té'
    ],
    correctAnswer: 'Mindkét oldalból kivonunk 3-at',
    explanation: 'A műveleti sorrend: először szorzás 2-vel, majd +3. Ennek megfordítása: először -3, majd osztás 2-vel.',
    hint: 'A külső műveletet csináljuk vissza legelőször!'
  },
  {
    id: 'q24',
    level: 1,
    question: 'Az (x - 2) / 5 = 4 egyenlet lebontogatásakor mi az első lépés?',
    options: [
      'Mindkét oldalt megszorozzuk 5-tel',
      'Mindkét oldalhoz hozzáadunk 2-t',
      'Kivonunk 5-öt mindkét oldalból',
      'Elosztjuk a 4-et 5-tel'
    ],
    correctAnswer: 'Mindkét oldalt megszorozzuk 5-tel',
    explanation: 'A legkülső művelet az 5-tel való osztás, így először 5-tel szorozzuk mindkét oldalt: x - 2 = 20.',
    hint: 'Az osztás ellentétes művelete a szorzás.'
  },
  {
    id: 'q25',
    level: 1,
    question: 'Melyik matematikai relációs jel fejezi ki a „legfeljebb” kifejezést?',
    options: ['≤ (kisebb vagy egyenlő)', '≥ (nagyobb vagy egyenlő)', '< (szigorúan kisebb)', '> (szigorúan nagyobb)'],
    correctAnswer: '≤ (kisebb vagy egyenlő)',
    explanation: 'A "legfeljebb 5" azt jelenti, hogy 5 vagy annál kisebb, azaz ≤ 5.',
    hint: 'Nem lehet nagyobb nála, de egyenlő még lehet.'
  },
  {
    id: 'q26',
    level: 1,
    question: 'Melyik matematikai relációs jel fejezi ki a „legalább” kifejezést?',
    options: ['≥ (nagyobb vagy egyenlő)', '≤ (kisebb vagy egyenlő)', '> (szigorúan nagyobb)', '= (pontosan egyenlő)'],
    correctAnswer: '≥ (nagyobb vagy egyenlő)',
    explanation: 'A "legalább 10" azt jelenti, hogy 10 vagy annál nagyobb, azaz ≥ 10.',
    hint: 'Nem lehet kisebb nála, de egyenlő még lehet.'
  },
  {
    id: 'q27',
    level: 1,
    question: 'Oldd meg az x + 3 > 7 egyenlőtlenséget a racionális számok (Q) halmazán!',
    options: ['x > 4', 'x < 4', 'x > 10', 'x ≥ 4'],
    correctAnswer: 'x > 4',
    explanation: 'Mindkét oldalból kivonva 3-at: x > 7 - 3  ⟹  x > 4. A relációs jel iránya nem változik.',
    hint: 'Vonj ki 3-at mindkét oldalból!'
  },
  {
    id: 'q28',
    level: 1,
    question: 'Oldd meg a 2x ≤ 10 egyenlőtlenséget a racionális számok halmazán!',
    options: ['x ≤ 5', 'x ≥ 5', 'x < 5', 'x ≤ 20'],
    correctAnswer: 'x ≤ 5',
    explanation: 'Pozitív 2-vel osztunk, így a relációs jel nem fordul meg: x ≤ 10 / 2 = 5.',
    hint: 'Pozitív számmal osztva megmarad az irány.'
  },
  {
    id: 'q29',
    level: 1,
    question: 'A számegyenesen a 3 számnál TELI karika van, és a nyíl jobbra mutat. Melyik relációt ábrázolja?',
    options: ['x ≥ 3', 'x > 3', 'x ≤ 3', 'x < 3'],
    correctAnswer: 'x ≥ 3',
    explanation: 'A teli karika azt jelenti, hogy a 3 is megoldás (≥), a jobbra mutató nyíl pedig a nagyobb számokat jelöli.',
    hint: 'Teli karika = megengedő (egyenlő is lehet), jobbra = nagyobb.'
  },
  {
    id: 'q30',
    level: 1,
    question: 'A számegyenesen a -2 számnál ÜRES karika van, és a nyíl balra mutat. Melyik relációt ábrázolja?',
    options: ['x < -2', 'x ≤ -2', 'x > -2', 'x ≥ -2'],
    correctAnswer: 'x < -2',
    explanation: 'Az üres karika azt jelenti, hogy a -2 nem tartozik a megoldások közé (<), a balra mutató nyíl a kisebb számokat mutatja.',
    hint: 'Üres karika = szigorú egyenlőtlenség, balra = kisebb.'
  },

  // ==========================================
  // LEVEL 2: Zárójelek, Törtek, Mindkét oldali ismeretlen, Egyenlőtlenségek (31 - 60)
  // ==========================================
  {
    id: 'q31',
    level: 2,
    question: 'Oldd meg az 5x - 3 = 2x + 9 egyenletet!',
    options: ['x = 4', 'x = 2', 'x = 6', 'x = 3'],
    correctAnswer: 'x = 4',
    explanation: '5x - 3 = 2x + 9  ⟹  3x - 3 = 9  ⟹  3x = 12  ⟹  x = 4.',
    hint: 'Vonj ki 2x-et mindkét oldalból, majd adj hozzá 3-at!'
  },
  {
    id: 'q32',
    level: 2,
    question: 'Mennyi a 7x + 4 = 3x - 8 egyenlet gyöke?',
    options: ['x = -3', 'x = 3', 'x = -1', 'x = -4'],
    correctAnswer: 'x = -3',
    explanation: '7x + 4 = 3x - 8  ⟹  4x + 4 = -8  ⟹  4x = -12  ⟹  x = -3.',
    hint: 'Gyűjtsd az x-eket a bal oldalra, a számokat a jobb oldalra!'
  },
  {
    id: 'q33',
    level: 2,
    question: 'Oldd meg a 2(x + 5) = 16 egyenletet!',
    options: ['x = 3', 'x = 6', 'x = 8', 'x = 5,5'],
    correctAnswer: 'x = 3',
    explanation: '2x + 10 = 16  ⟹  2x = 6  ⟹  x = 3 (vagy lebontva: x + 5 = 8  ⟹  x = 3).',
    hint: 'Bontsd fel a zárójelet: 2x + 10 = 16.'
  },
  {
    id: 'q34',
    level: 2,
    question: 'Mennyi a 3(2x - 1) = 21 egyenlet megoldása?',
    options: ['x = 4', 'x = 3,5', 'x = 5', 'x = 3'],
    correctAnswer: 'x = 4',
    explanation: '6x - 3 = 21  ⟹  6x = 24  ⟹  x = 4.',
    hint: 'Bontsd fel a zárójelet: 6x - 3 = 21.'
  },
  {
    id: 'q35',
    level: 2,
    question: 'Oldd meg a 4(x - 2) = 2(x + 3) egyenletet!',
    options: ['x = 7', 'x = 5', 'x = 2', 'x = 14'],
    correctAnswer: 'x = 7',
    explanation: '4x - 8 = 2x + 6  ⟹  2x - 8 = 6  ⟹  2x = 14  ⟹  x = 7.',
    hint: 'Bontsd fel mindkét zárójelet: 4x - 8 = 2x + 6.'
  },
  {
    id: 'q36',
    level: 2,
    question: 'Oldd meg az 5 - (x - 4) = 12 egyenletet!',
    options: ['x = -3', 'x = 3', 'x = 11', 'x = -11'],
    correctAnswer: 'x = -3',
    explanation: '5 - x + 4 = 12  ⟹  9 - x = 12  ⟹  -x = 3  ⟹  x = -3.',
    hint: 'A zárójel előtti mínuszjel megfordítja a belső előjeleket: 5 - x + 4!'
  },
  {
    id: 'q37',
    level: 2,
    question: 'Mennyi a gyöke a 2(3x - 1) - 4x = 10 egyenletnek?',
    options: ['x = 6', 'x = 5', 'x = 4', 'x = 7'],
    correctAnswer: 'x = 6',
    explanation: '6x - 2 - 4x = 10  ⟹  2x - 2 = 10  ⟹  2x = 12  ⟹  x = 6.',
    hint: 'Bontsd fel a zárójelet, majd vond össze az egynemű tagokat a bal oldalon!'
  },
  {
    id: 'q38',
    level: 2,
    question: 'Mi a megoldása a 3(x + 4) = 3x + 12 egyenletnek?',
    options: [
      'Azonosság (Minden racionális szám megoldás, M = Q)',
      'Nincs megoldás (M = ∅)',
      'x = 0',
      'x = 4'
    ],
    correctAnswer: 'Azonosság (Minden racionális szám megoldás, M = Q)',
    explanation: '3x + 12 = 3x + 12  ⟹  0x = 0  ⟹  0 = 0. Ez azonosság, minden szám kielégíti.',
    hint: 'A bal oldal felbontva pontosan megegyezik a jobb oldallal.'
  },
  {
    id: 'q39',
    level: 2,
    question: 'Milyen megoldása van a 2x + 5 = 2x - 1 egyenletnek?',
    options: [
      'Nincs megoldás (Ellentmondás, M = ∅)',
      'Azonosság (M = Q)',
      'x = 0',
      'x = 3'
    ],
    correctAnswer: 'Nincs megoldás (Ellentmondás, M = ∅)',
    explanation: '2x-et kivonva mindkét oldalból: 5 = -1 marad, ami lehetetlen. Tehát M = ∅.',
    hint: 'Mindkét oldalból vonj ki 2x-et: 5 = -1!'
  },
  {
    id: 'q40',
    level: 2,
    question: 'Oldd meg az x / 2 + x / 3 = 5 törtes egyenletet!',
    options: ['x = 6', 'x = 5', 'x = 10', 'x = 15'],
    correctAnswer: 'x = 6',
    explanation: 'Szorozzunk be 6-tal (a 2 és 3 LKKT-jával): 3x + 2x = 30  ⟹  5x = 30  ⟹  x = 6.',
    hint: 'Szorozd be a teljes egyenletet a közös nevezővel, azaz 6-tal!'
  },
  {
    id: 'q41',
    level: 2,
    question: 'Mennyi az ismeretlen értéke a (2x - 1) / 3 = 5 egyenletben?',
    options: ['x = 8', 'x = 7', 'x = 9', 'x = 16'],
    correctAnswer: 'x = 8',
    explanation: 'Mindkét oldalt 3-mal szorozva: 2x - 1 = 15  ⟹  2x = 16  ⟹  x = 8.',
    hint: 'Szorozz 3-mal, majd adj hozzá 1-et!'
  },
  {
    id: 'q42',
    level: 2,
    question: 'Oldd meg az (x + 3) / 4 = (x - 1) / 2 egyenletet!',
    options: ['x = 5', 'x = 7', 'x = 4', 'x = 2'],
    correctAnswer: 'x = 5',
    explanation: 'Szorozzunk 4-gyel: x + 3 = 2(x - 1)  ⟹  x + 3 = 2x - 2  ⟹  x = 5.',
    hint: 'Szorozz be a közös nevezővel, ami 4!'
  },
  {
    id: 'q43',
    level: 2,
    question: 'Oldd meg a -2x < 6 egyenlőtlenséget a racionális számok halmazán!',
    options: ['x > -3', 'x < -3', 'x > 3', 'x < 3'],
    correctAnswer: 'x > -3',
    explanation: 'Negatív számmal (-2) osztunk, ezért a < jelből > lesz: x > 6 / (-2) = -3.',
    hint: 'Negatívval való osztáskor a relációs jel megfordul!'
  },
  {
    id: 'q44',
    level: 2,
    question: 'Oldd meg a -5x ≥ 20 egyenlőtlenséget!',
    options: ['x ≤ -4', 'x ≥ -4', 'x ≤ 4', 'x ≥ 4'],
    correctAnswer: 'x ≤ -4',
    explanation: 'Mindkét oldalt (-5)-tel osztva a ≥ jel megfordul: x ≤ 20 / (-5) = -4.',
    hint: 'A ≥ jelből ≤ lesz a negatívval való osztás miatt!'
  },
  {
    id: 'q45',
    level: 2,
    question: 'Oldd meg a 3 - x > 7 egyenlőtlenséget!',
    options: ['x < -4', 'x > -4', 'x < 4', 'x > 4'],
    correctAnswer: 'x < -4',
    explanation: '3 - x > 7  ⟹  -x > 4  ⟹  x < -4 (szorzás -1-gyel, jel fordul).',
    hint: 'Vonj ki 3-at, majd szorozz (-1)-gyel!'
  },
  {
    id: 'q46',
    level: 2,
    question: 'Mennyi a 4x - 5 ≤ 2x + 3 egyenlőtlenség megoldása?',
    options: ['x ≤ 4', 'x ≥ 4', 'x ≤ 8', 'x ≥ 2'],
    correctAnswer: 'x ≤ 4',
    explanation: '4x - 5 ≤ 2x + 3  ⟹  2x - 5 ≤ 3  ⟹  2x ≤ 8  ⟹  x ≤ 4.',
    hint: 'Gyűjtsd az x-eket a bal oldalra: 2x ≤ 8.'
  },
  {
    id: 'q47',
    level: 2,
    question: 'Egy szám 2-szereséhez 7-et adva 25-öt kapunk. Melyik ez a szám?',
    options: ['9', '8', '11', '16'],
    correctAnswer: '9',
    explanation: '2x + 7 = 25  ⟹  2x = 18  ⟹  x = 9.',
    hint: '25-ből vonj ki 7-et, majd felezd meg!'
  },
  {
    id: 'q48',
    level: 2,
    question: 'Gondoltam egy számot, poroztam 4-gyel, levontam 5-öt, az eredmény 27 lett. Mi a gondolt szám?',
    options: ['8', '7', '9', '6'],
    correctAnswer: '8',
    explanation: '4x - 5 = 27  ⟹  4x = 32  ⟹  x = 8.',
    hint: '27-hez adj 5-öt, majd oszd el 4-gyel!'
  },
  {
    id: 'q49',
    level: 2,
    question: 'Két szám összege 40, a különbségük 12. Mennyi a nagyobbik szám?',
    options: ['26', '28', '14', '24'],
    correctAnswer: '26',
    explanation: 'x + (x - 12) = 40  ⟹  2x - 12 = 40  ⟹  2x = 52  ⟹  x = 26. A kisebbik 14.',
    hint: 'x + y = 40 és x - y = 12. Add össze a két egyenletet!'
  },
  {
    id: 'q50',
    level: 2,
    question: 'Apa 36 éves, fia 10. Hány év múlva lesz apa 3-szor annyi idős, mint a fia?',
    options: ['3 év múlva', '2 év múlva', '4 év múlva', '5 év múlva'],
    correctAnswer: '3 év múlva',
    explanation: '36 + x = 3(10 + x)  ⟹  36 + x = 30 + 3x  ⟹  2x = 6  ⟹  x = 3 év múlva (apa 39, fia 13).',
    hint: 'Állíts fel egyenletet: 36 + x = 3(10 + x)!'
  },
  {
    id: 'q51',
    level: 2,
    question: 'Anya 32, lánya 8 éves. Hány év múlva lesz anya 2-szer annyi idős, mint a lánya?',
    options: ['16 év múlva', '12 év múlva', '14 év múlva', '18 év múlva'],
    correctAnswer: '16 év múlva',
    explanation: '32 + x = 2(8 + x)  ⟹  32 + x = 16 + 2x  ⟹  x = 16 (anya 48, lánya 24).',
    hint: '32 + x = 2(8 + x)  ⟹  x = 16.'
  },
  {
    id: 'q52',
    level: 2,
    question: 'Három egymást követő egész szám összege 66. Mennyi a középső szám?',
    options: ['22', '21', '23', '20'],
    correctAnswer: '22',
    explanation: '(x - 1) + x + (x + 1) = 3x = 66  ⟹  x = 22. A számok: 21, 22, 23.',
    hint: 'Három egymást követő szám összege mindig a középső 3-szorosa!'
  },
  {
    id: 'q53',
    level: 2,
    question: 'Két raktárban összesen 120 tonna gabona van. Az elsőben kétszer annyi van, mint a másodikban. Mennyi van a második raktárban?',
    options: ['40 tonna', '60 tonna', '80 tonna', '30 tonna'],
    correctAnswer: '40 tonna',
    explanation: 'Második: x, első: 2x. 2x + x = 120  ⟹  3x = 120  ⟹  x = 40 tonna.',
    hint: '3 egyenlő részre kell osztani a 120-at.'
  },
  {
    id: 'q54',
    level: 2,
    question: 'Oldd meg az x / 3 - (x - 1) / 2 = 1 egyenletet!',
    options: ['x = -3', 'x = 3', 'x = -5', 'x = 9'],
    correctAnswer: 'x = -3',
    explanation: 'Szorozzuk 6-tal: 2x - 3(x - 1) = 6  ⟹  2x - 3x + 3 = 6  ⟹  -x + 3 = 6  ⟹  -x = 3  ⟹  x = -3.',
    hint: 'Vigyázz a -3(x - 1) felbontására: 2x - 3x + 3!'
  },
  {
    id: 'q55',
    level: 2,
    question: 'Melyik a helyes zárójelfelbontás a 4 - 3(x - 2) = 1 kifejezés bal oldalára?',
    options: ['4 - 3x + 6', '4 - 3x - 6', '1 - 3x', '4 - 3x - 2'],
    correctAnswer: '4 - 3x + 6',
    explanation: '-3-mal szorozzuk mindkét tagot: (-3) · x = -3x és (-3) · (-2) = +6.',
    hint: 'Mínusz szorozva mínusszal plusz!'
  },
  {
    id: 'q56',
    level: 2,
    question: 'Mennyi az 5(x - 1) - 2(x + 3) = 1 egyenlet megoldása?',
    options: ['x = 4', 'x = 3', 'x = 5', 'x = 2'],
    correctAnswer: 'x = 4',
    explanation: '5x - 5 - 2x - 6 = 1  ⟹  3x - 11 = 1  ⟹  3x = 12  ⟹  x = 4.',
    hint: 'Bontsd fel a zárójeleket: 5x - 5 - 2x - 6 = 1.'
  },
  {
    id: 'q57',
    level: 2,
    question: 'Oldd meg az x + 2 = x / 2 + 5 egyenletet!',
    options: ['x = 6', 'x = 3', 'x = 8', 'x = 14'],
    correctAnswer: 'x = 6',
    explanation: 'x - x/2 = 5 - 2  ⟹  x/2 = 3  ⟹  x = 6.',
    hint: 'x-ből vonj ki fél x-et: marad fél x = 3.'
  },
  {
    id: 'q58',
    level: 2,
    question: 'Mennyi a 4 és 6 nevezők legkisebb közös többszöröse (LKKT), amellyel a törtes egyenletet beszorozzuk?',
    options: ['12', '24', '10', '6'],
    correctAnswer: '12',
    explanation: 'A 4 és 6 legkisebb közös többszöröse a 12 (4 · 3 = 12 és 6 · 2 = 12).',
    hint: 'A 12 a legkisebb pozitív szám, ami osztható 4-gyel is és 6-tal is.'
  },
  {
    id: 'q59',
    level: 2,
    question: 'Milyen egyenlet a 2x + 1 = 2(x + 1) - 1?',
    options: [
      'Azonosság (Minden valós szám kielégíti)',
      'Nincs megoldása',
      'Csak az x = 0 a megoldása',
      'Csak az x = 1 a megoldása'
    ],
    correctAnswer: 'Azonosság (Minden valós szám kielégíti)',
    explanation: '2x + 1 = 2x + 2 - 1 = 2x + 1  ⟹  0 = 0. Mindkét oldal teljesen azonos, tehát azonosság.',
    hint: 'Bontsd fel a jobb oldalt: 2x + 2 - 1 = 2x + 1.'
  },
  {
    id: 'q60',
    level: 2,
    question: 'Hány egész megoldása van a -1 ≤ x < 3 egyenlőtlenségnek az egész számok (Z) halmazán?',
    options: ['4 darab (-1, 0, 1, 2)', '5 darab', '3 darab', 'Végtelen sok'],
    correctAnswer: '4 darab (-1, 0, 1, 2)',
    explanation: 'A feltételnek megfelelő egész számok: -1 (mert ≤), 0, 1, 2 (a 3 már nem, mert < 3). Ez összesen 4 db.',
    hint: 'Számold össze az egészeket: -1, 0, 1, 2.'
  },

  // ==========================================
  // LEVEL 3: Összetett és Nehéz Feladatok, Átrakás, Paraméterek, Hibakeresés (61 - 90)
  // ==========================================
  {
    id: 'q61',
    level: 3,
    question: 'Oldd meg a (2x - 3) / 4 - (x - 1) / 3 = 1 / 6 egyenletet a racionális számok halmazán!',
    options: ['x = 3,5', 'x = 4', 'x = 2,5', 'x = 5'],
    correctAnswer: 'x = 3,5',
    explanation: 'Szorzunk 12-vel: 3(2x - 3) - 4(x - 1) = 2  ⟹  6x - 9 - 4x + 4 = 2  ⟹  2x - 5 = 2  ⟹  2x = 7  ⟹  x = 3,5.',
    hint: 'Szorozz be 12-vel, és ügyelj a mínuszos zárójelfelbontásra!'
  },
  {
    id: 'q62',
    level: 3,
    question: 'Mennyi a gyöke a (3x + 1) / 2 - (2x - 3) / 5 = x + 2 egyenletnek?',
    options: ['x = 9', 'x = 8', 'x = 7', 'x = 11'],
    correctAnswer: 'x = 9',
    explanation: 'Szorzunk 10-zel: 5(3x + 1) - 2(2x - 3) = 10(x + 2)  ⟹  15x + 5 - 4x + 6 = 10x + 20  ⟹  11x + 11 = 10x + 20  ⟹  x = 9.',
    hint: 'Szorozz 10-zel: ne felejtsd el az x + 2 jobb oldalt is 10-zel szorozni!'
  },
  {
    id: 'q63',
    level: 3,
    question: 'Oldd meg a 2[3(x - 1) - (x + 2)] = 16 többszörös zárójeles egyenletet!',
    options: ['x = 6,5', 'x = 7', 'x = 5,5', 'x = 8'],
    correctAnswer: 'x = 6,5',
    explanation: 'Belső zárójelek: 3x - 3 - x - 2 = 2x - 5. Kívül: 2(2x - 5) = 4x - 10 = 16  ⟹  4x = 26  ⟹  x = 6,5.',
    hint: 'Belülről kifelé haladva bontsd fel a zárójeleket!'
  },
  {
    id: 'q64',
    level: 3,
    question: 'Mi a megoldása a 3(x - 4) - 2(2x + 1) = 5 - (x + 19) egyenletnek?',
    options: [
      'Azonosság (Minden racionális szám megoldás, M = Q)',
      'Nincs megoldás (M = ∅)',
      'x = 0',
      'x = -14'
    ],
    correctAnswer: 'Azonosság (Minden racionális szám megoldás, M = Q)',
    explanation: 'Bal: 3x - 12 - 4x - 2 = -x - 14. Jobb: 5 - x - 19 = -x - 14. Mindkét oldal azonos (-x - 14 = -x - 14), azonosság.',
    hint: 'Vond össze mindkét oldalt külön-külön!'
  },
  {
    id: 'q65',
    level: 3,
    question: 'Milyen megoldáshalmaza van a 4(x + 1) - 2(2x - 3) = 15 egyenletnek?',
    options: [
      'Nincs megoldás (Ellentmondás, M = ∅)',
      'Azonosság (M = Q)',
      'x = 1',
      'x = 0'
    ],
    correctAnswer: 'Nincs megoldás (Ellentmondás, M = ∅)',
    explanation: '4x + 4 - 4x + 6 = 15  ⟹  10 = 15. Ez ellentmondás, így M = ∅.',
    hint: '4x - 4x = 0, mi marad a számokból?'
  },
  {
    id: 'q66',
    level: 3,
    question: 'Oldd meg az (1 - 2x) / 3 > 3 egyenlőtlenséget a racionális számok halmazán!',
    options: ['x < -4', 'x > -4', 'x < 4', 'x > 4'],
    correctAnswer: 'x < -4',
    explanation: '1 - 2x > 9  ⟹  -2x > 8  ⟹  x < -4 (relációs jel megfordul a -2-vel való osztás miatt!).',
    hint: 'Szorozz 3-mal: 1 - 2x > 9, majd ossz (-2)-vel!'
  },
  {
    id: 'q67',
    level: 3,
    question: 'Mennyi a (3x - 2) / 4 - x / 2 ≤ 1 egyenlőtlenség megoldása?',
    options: ['x ≤ 6', 'x ≥ 6', 'x ≤ 4', 'x ≥ 4'],
    correctAnswer: 'x ≤ 6',
    explanation: 'Szorzás 4-gyel: 3x - 2 - 2x ≤ 4  ⟹  x - 2 ≤ 4  ⟹  x ≤ 6.',
    hint: 'Szorozz 4-gyel: 3x - 2 - 2x ≤ 4.'
  },
  {
    id: 'q68',
    level: 3,
    question: 'Két polcon összesen 90 könyv van. Ha az elsőről átrakunk 10 könyvet a másodikra, a másodikon kétszer annyi lesz, mint az elsőn. Hány könyv volt eredetileg az első polcon?',
    options: ['40 könyv', '50 könyv', '30 könyv', '45 könyv'],
    correctAnswer: '40 könyv',
    explanation: 'Első polc: x, második: 90 - x. Átrakás után: (90 - x) + 10 = 2(x - 10)  ⟹  100 - x = 2x - 20  ⟹  3x = 120  ⟹  x = 40 könyv.',
    hint: 'Átrakás után az első polcon x - 10, a másodikon (90 - x) + 10 van.'
  },
  {
    id: 'q69',
    level: 3,
    question: 'Két zsebben összesen 5000 Ft van. Ha a jobb zsebből átrakunk 1000 Ft-ot a balba, egyenlő összeg lesz mindkettőben. Mennyi volt eredetileg a jobb zsebben?',
    options: ['3500 Ft', '3000 Ft', '4000 Ft', '2500 Ft'],
    correctAnswer: '3500 Ft',
    explanation: 'Jobb zseb: x, bal zseb: 5000 - x. x - 1000 = (5000 - x) + 1000  ⟹  x - 1000 = 6000 - x  ⟹  2x = 7000  ⟹  x = 3500 Ft.',
    hint: 'Az egyenlő állapotban 2500-2500 Ft van, így a jobb zsebben előtte 2500 + 1000 Ft volt.'
  },
  {
    id: 'q70',
    level: 3,
    question: 'Egy 84 cm hosszú lécet két darabra vágunk 3 : 4 arányban. Milyen hosszú a hosszabbik darab?',
    options: ['48 cm', '36 cm', '42 cm', '56 cm'],
    correctAnswer: '48 cm',
    explanation: 'Összesen 3 + 4 = 7 rész. Egy rész: 84 / 7 = 12 cm. A hosszabb darab: 4 · 12 = 48 cm (a rövidebb 36 cm).',
    hint: '3x + 4x = 84 cm  ⟹  7x = 84.'
  },
  {
    id: 'q71',
    level: 3,
    question: 'Összesen 20 darab érménk van, 50 és 100 Ft-osok. Az összértékük 1600 Ft. Hány darab 100 Ft-osunk van?',
    options: ['12 darab', '8 darab', '10 darab', '14 darab'],
    correctAnswer: '12 darab',
    explanation: '100-asok száma: x, 50-esek: 20 - x. 100x + 50(20 - x) = 1600  ⟹  50x + 1000 = 1600  ⟹  50x = 600  ⟹  x = 12 db.',
    hint: 'Ha mind az 20 db 50-es lenne, az 1000 Ft lenne. A hiányzó 600 Ft-ot az 50 Ft-os különbségek adják ki.'
  },
  {
    id: 'q72',
    level: 3,
    question: 'Apa most 4-szer annyi idős, mint a fia. 6 év múlva már csak 2,5-szer annyi idős lesz. Hány éves most a fiú?',
    options: ['6 éves', '8 éves', '5 éves', '7 éves'],
    correctAnswer: '6 éves',
    explanation: 'Fiú: x, apa: 4x. 6 év múlva: 4x + 6 = 2,5(x + 6)  ⟹  4x + 6 = 2,5x + 15  ⟹  1,5x = 9  ⟹  x = 6 éves.',
    hint: 'Állíts fel egyenletet: 4x + 6 = 2,5(x + 6).'
  },
  {
    id: 'q73',
    level: 3,
    question: 'Egy túrázó az 1. nap megtette a teljes táv felét, a 2. nap a maradék harmadát, a 3. napra pedig még 16 km maradt. Milyen hosszú a teljes túra?',
    options: ['48 km', '40 km', '60 km', '36 km'],
    correctAnswer: '48 km',
    explanation: '1. nap: x/2. Marad: x/2. 2. nap: (x/2) / 3 = x/6. Összesen megtett: x/2 + x/6 = 4x/6 = 2x/3. Marad: x/3 = 16 km  ⟹  x = 48 km.',
    hint: 'A megmaradt fél táv kétharmada 16 km.'
  },
  {
    id: 'q74',
    level: 3,
    question: 'Oldd meg a 3x - 7 = 2 egyenletet, ha az alaphalmaz A = {1, 2, 3, 4}!',
    options: ['M = {3}', 'M = ∅', 'M = {1, 2, 3, 4}', 'M = {9}'],
    correctAnswer: 'M = {3}',
    explanation: '3x = 9  ⟹  x = 3. Mivel 3 ∈ A, a megoldáshalmaz M = {3}.',
    hint: 'A kapott gyök benne van a megadott 4 elemű halmazban?'
  },
  {
    id: 'q75',
    level: 3,
    question: 'Oldd meg a 4x + 5 = 1 egyenletet a természetes számok (A = N) halmazán!',
    options: ['M = ∅ (üres halmaz)', 'x = -1', 'x = 1', 'x = 0'],
    correctAnswer: 'M = ∅ (üres halmaz)',
    explanation: '4x = -4  ⟹  x = -1. Mivel -1 ∉ N (nem természetes szám), az alaphalmazon nincs megoldás: M = ∅.',
    hint: 'A negatív számok nem természetes számok.'
  },
  {
    id: 'q76',
    level: 3,
    question: 'Hány eleme van a 2x + 1 ≤ 7 egyenlőtlenség megoldáshalmazának a pozitív egész számok (N+) halmazán?',
    options: ['3 elem ({1, 2, 3})', '4 elem ({0, 1, 2, 3})', '2 elem ({1, 2})', 'Végtelen sok'],
    correctAnswer: '3 elem ({1, 2, 3})',
    explanation: '2x ≤ 6  ⟹  x ≤ 3. A pozitív egészek: {1, 2, 3}. A 0 nem pozitív, így pontosan 3 elem van.',
    hint: 'A pozitív egészek 1-től indulnak!'
  },
  {
    id: 'q77',
    level: 3,
    question: 'Melyik sorban történt hiba az alábbi levezetésben?\n(1) 6 - 2(x + 1) = 8\n(2) 6 - 2x - 2 = 8\n(3) 4 - 2x = 8\n(4) -2x = 4  ⟹  x = 2',
    options: [
      'A 4. sorban (-2x = 4 esetén x = -2)',
      'A 2. sorban (a zárójel felbontásakor)',
      'A 3. sorban (az összevonáskor)',
      'Nincs hiba a levezetésben'
    ],
    correctAnswer: 'A 4. sorban (-2x = 4 esetén x = -2)',
    explanation: 'A 4. sorban a 4-et (-2)-vel kellett volna osztani: 4 / (-2) = -2, nem pedig +2.',
    hint: 'Pozitív számot osztva negatívval negatív eredményt kapunk!'
  },
  {
    id: 'q78',
    level: 3,
    question: 'Melyik sorban történt hiba?\n(1) (x - 1) / 2 - (x - 2) / 3 = 1\n(2) 3(x - 1) - 2x - 4 = 6\n(3) 3x - 3 - 2x - 4 = 6',
    options: [
      'A 2. sorban (a -(x - 2) szorzásakor +4 lett volna)',
      'A 3. sorban',
      'Az 1. sorban (rossz a közös nevező)',
      'Nincs hiba a levezetésben'
    ],
    correctAnswer: 'A 2. sorban (a -(x - 2) szorzásakor +4 lett volna)',
    explanation: 'A 6-tal való szorzáskor a második tag: -2 · (x - 2) = -2x + 4. A felírásban hibásan -4 szerepelt.',
    hint: 'A törtvonal előtti mínuszjel zárójelként funkcionál: -2 · (-2) = +4!'
  },
  {
    id: 'q79',
    level: 3,
    question: 'Egy diák a -3x < 15 egyenlőtlenséget úgy oldotta meg, hogy mindkét oldalt elosztotta (-3)-mal, és x < -5-öt kapott. Mi a hibája?',
    options: [
      'Elfelejtette megfordítani a relációs jelet: a helyes válasz x > -5',
      '15 / (-3) nem -5, hanem +5',
      'Nem szabad negatív számmal osztani',
      'Helyesen oldotta meg, nincs hiba'
    ],
    correctAnswer: 'Elfelejtette megfordítani a relációs jelet: a helyes válasz x > -5',
    explanation: 'Negatív számmal való osztáskor kötelező a relációs jel megfordítása: < -ból > lesz!',
    hint: 'Negatív együtthatóval való osztás = jelcsere.'
  },
  {
    id: 'q80',
    level: 3,
    question: 'Milyen p érték esetén lesz a 2x + p = 10 egyenlet gyöke x = 3?',
    options: ['p = 4', 'p = 6', 'p = 2', 'p = 8'],
    correctAnswer: 'p = 4',
    explanation: 'Behelyettesítve az x = 3-at: 2 · 3 + p = 10  ⟹  6 + p = 10  ⟹  p = 4.',
    hint: 'Helyettesítsd be az x helyére a 3-at!'
  },
  {
    id: 'q81',
    level: 3,
    question: 'Milyen k paraméter esetén NEM lesz megoldása a kx + 5 = 3x + 8 egyenletnek?',
    options: ['k = 3', 'k = 0', 'k = -3', 'k = 5'],
    correctAnswer: 'k = 3',
    explanation: 'Ha k = 3, akkor 3x + 5 = 3x + 8  ⟹  5 = 8 (ellentmondás, 0x = 3), így nincs megoldás.',
    hint: 'Az ismeretlenek essenek ki, de a számok ne egyezzenek!'
  },
  {
    id: 'q82',
    level: 3,
    question: 'Milyen c érték esetén válik azonossággá a 2(x - 3) = 2x - c egyenlet?',
    options: ['c = 6', 'c = -6', 'c = 3', 'c = 0'],
    correctAnswer: 'c = 6',
    explanation: 'Bal oldal: 2x - 6. Jobb oldal: 2x - c. Akkor azonosság, ha a két oldal azonos: -6 = -c  ⟹  c = 6.',
    hint: 'A két oldalnak teljesen azonosnak kell lennie.'
  },
  {
    id: 'q83',
    level: 3,
    question: 'Oldd meg az 5 - 3x ≥ 2(4 - x) egyenlőtlenséget a racionális számok halmazán!',
    options: ['x ≤ -3', 'x ≥ -3', 'x ≤ 3', 'x ≥ 3'],
    correctAnswer: 'x ≤ -3',
    explanation: '5 - 3x ≥ 8 - 2x  ⟹  -x ≥ 3  ⟹  x ≤ -3 (relációjel fordul a -1-gyel szorzáskor).',
    hint: '5 - 3x ≥ 8 - 2x  ⟹  -x ≥ 3  ⟹  x ≤ -3.'
  },
  {
    id: 'q84',
    level: 3,
    question: 'Egy kétjegyű szám tízes helyi értékén lévő számjegye 3-mal nagyobb az egyeseknél. A számjegyek összege 11. Mi ez a kétjegyű szám?',
    options: ['74', '83', '65', '92'],
    correctAnswer: '74',
    explanation: 'Egyesek: x, tízesek: x + 3. x + (x + 3) = 11  ⟹  2x = 8  ⟹  x = 4. A tízes: 7. A szám: 74.',
    hint: 'A számjegyek összege 7 + 4 = 11, és 7 - 4 = 3.'
  },
  {
    id: 'q85',
    level: 3,
    question: 'Egy téglalap kerülete 48 cm. Az egyik oldala 4 cm-rel hosszabb a másiknál. Milyen hosszú a rövidebb oldal?',
    options: ['10 cm', '14 cm', '8 cm', '12 cm'],
    correctAnswer: '10 cm',
    explanation: 'K = 2(a + b) = 2(x + x + 4) = 4x + 8 = 48  ⟹  4x = 40  ⟹  x = 10 cm. A hosszabbik 14 cm.',
    hint: 'A félkerület a + b = 24 cm. x + (x + 4) = 24.'
  },
  {
    id: 'q86',
    level: 3,
    question: 'Egy egyenlő szárú háromszög kerülete 40 cm. Az alapja 5 cm-rel rövidebb a szárainál. Milyen hosszú egy szár?',
    options: ['15 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswer: '15 cm',
    explanation: 'Szárak: x és x, alap: x - 5. K = x + x + (x - 5) = 3x - 5 = 40  ⟹  3x = 45  ⟹  x = 15 cm. Az alap: 10 cm.',
    hint: 'A három oldal: x, x és x - 5. Összegük 40.'
  },
  {
    id: 'q87',
    level: 3,
    question: 'Oldd meg az (x + 1) / 3 - (x - 2) / 4 = (x + 3) / 6 egyenletet!',
    options: ['x = 4', 'x = 2', 'x = 6', 'x = 5'],
    correctAnswer: 'x = 4',
    explanation: 'Szorzunk 12-vel: 4(x + 1) - 3(x - 2) = 2(x + 3)  ⟹  4x + 4 - 3x + 6 = 2x + 6  ⟹  x + 10 = 2x + 6  ⟹  x = 4.',
    hint: 'Szorozz be 12-vel mindent: 4(x + 1) - 3(x - 2) = 2(x + 3).'
  },
  {
    id: 'q88',
    level: 3,
    question: 'Hány NEMNEGATÍV egész megoldása van a 4 - x > 0 egyenlőtlenségnek?',
    options: ['4 darab (0, 1, 2, 3)', '3 darab (1, 2, 3)', '5 darab', 'Végtelen sok'],
    correctAnswer: '4 darab (0, 1, 2, 3)',
    explanation: '4 - x > 0  ⟹  x < 4. A nemnegatív egész számok a 0 és a pozitív egészek: {0, 1, 2, 3}. Ez 4 darab.',
    hint: 'A 0 is nemnegatív szám!'
  },
  {
    id: 'q89',
    level: 3,
    question: 'Milyen egyenlet a 3(x - 1) = 2(x + 2) + x - 7?',
    options: [
      'Azonosság (Minden racionális szám megoldás, M = Q)',
      'Nincs megoldása (M = ∅)',
      'x = 0',
      'x = 1'
    ],
    correctAnswer: 'Azonosság (Minden racionális szám megoldás, M = Q)',
    explanation: 'Bal oldal: 3x - 3. Jobb oldal: 2x + 4 + x - 7 = 3x - 3. Mivel 3x - 3 = 3x - 3, ez azonosság.',
    hint: 'Bontsd fel a zárójeleket és vonj össze mindkét oldalon!'
  },
  {
    id: 'q90',
    level: 3,
    question: 'Van-e közös megoldása a 0 · x = 0 és a 0 · x = 7 egyenleteknek?',
    options: [
      'Nincs, a közös megoldáshalmaz üres (M₁ ∩ M₂ = ∅)',
      'Igen, minden szám közös megoldás',
      'Igen, a 0 a közös megoldás',
      'Igen, a 7 a közös megoldás'
    ],
    correctAnswer: 'Nincs, a közös megoldáshalmaz üres (M₁ ∩ M₂ = ∅)',
    explanation: 'Az első egyenletnek minden szám megoldása (M₁ = Q), a másodiknak semmi sem megoldása (M₂ = ∅). Metszetük: Q ∩ ∅ = ∅.',
    hint: 'Ha a másodiknak egyetlen megoldása sincs, lehet közös megoldásuk?'
  }
];

const levelsConfig: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Mérlegelv',
    subtitle: 'Fogalmak, 1-2 lépéses egyenletek és egyenlőtlenségek, alaphalmaz és lebontogatás',
    range: '1 - 30. feladat',
    focus: 'Alapfogalmak & 1-2 lépéses mérlegelv',
    badgeText: '1. SZINT • ALAPOK',
    questions: allQuestions.filter((q) => q.level === 1)
  },
  2: {
    level: 2,
    title: '2. Szint: Zárójelek, Törtek és Szöveges Problémák',
    subtitle: 'Zárójelfelbontás, közös nevező, relációjel-fordítás és életszerű modellek',
    range: '31 - 60. feladat',
    focus: 'Zárójelek, törtek & Szöveges feladatok',
    badgeText: '2. SZINT • GYAKORLÁS',
    questions: allQuestions.filter((q) => q.level === 2)
  },
  3: {
    level: 3,
    title: '3. Szint: Mesterkurzus és Hibaelemzés',
    subtitle: 'Összetett törtes egyenletek, átrakások, paraméterek és dolgozathibák elemzése',
    range: '61 - 90. feladat',
    focus: 'Összetett törtes egyenletek & Hibakeresés',
    badgeText: '3. SZINT • MESTER',
    questions: allQuestions.filter((q) => q.level === 3)
  }
};

export const EquationSummaryQuiz: React.FC<EquationSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-eq-summary-quiz"
      topicTitle="5. Összefoglalás"
      title="Egyenletek – Fejezeti Összefoglaló Kvíz"
      subtitle="90 feladat 3 nehézségi szinten: a fejezet teljes átfogó tesztje és gyakorlása"
      badge="VI. FEJEZET • ÖSSZEFOGLALÁS"
      themeColor="indigo"
      questions={allQuestions}
      levels={levelsConfig}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <EquationSummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EquationSummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default EquationSummaryQuiz;
