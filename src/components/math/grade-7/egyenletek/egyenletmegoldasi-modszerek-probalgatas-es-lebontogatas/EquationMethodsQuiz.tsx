import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import {
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Layers,
  HelpCircle,
  Hash,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import EquationMethodsMatcher from './EquationMethodsMatcher';
import EquationMethodsSorter from './EquationMethodsSorter';

interface EquationMethodsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Lebontogatás Lépései (Visszafelé Műveletek)',
    icon: <RotateCcw className="w-4 h-4 text-indigo-600" />,
    formula: 'x \\xrightarrow{\\text{művelet}} \\dots \\implies \\text{Eredmény} \\xrightarrow{\\text{ellentétes művelet}} x',
    note: 'Mindig a legkésőbb elvégzett műveletet vonjuk vissza legelőször! Osztásból szorzás, kivonásból összeadás lesz.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="10" width="35" height="30" rx="3" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="22" y="28" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">3x - 4</text>
        <path d="M 45 20 L 75 20" stroke="#4f46e5" strokeWidth="2" />
        <text x="60" y="15" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600">+ 4</text>
        <rect x="80" y="10" width="35" height="30" rx="3" fill="#f0fdf4" stroke="#16a34a" />
        <text x="97" y="28" textAnchor="middle" className="text-[9px] font-bold fill-emerald-900">3x</text>
        <path d="M 120 20 L 150 20" stroke="#16a34a" strokeWidth="2" />
        <text x="135" y="15" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600">: 3</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Szisztematikus Próbálgatás',
    icon: <Search className="w-4 h-4 text-sky-600" />,
    formula: 'x \\cdot (12 - x) = 32 \\implies \\text{32 osztópárjai: } 4 \\text{ és } 8',
    note: 'Szorzat alakú egyenleteknél vagy kevés elemű alaphalmaznál osztópárokkal és intervallum-szűkítéssel próbálgatunk.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="40" height="34" rx="4" fill="#f8fafc" stroke="#94a3b8" />
        <text x="30" y="22" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">x=3</text>
        <text x="30" y="34" textAnchor="middle" className="text-[8px] fill-amber-600">27 &lt; 32</text>
        <path d="M 55 25 L 75 25" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="80" y="8" width="40" height="34" rx="4" fill="#ecfdf5" stroke="#10b981" />
        <text x="100" y="22" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">x=4</text>
        <text x="100" y="34" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600">32 ✓</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Alaphalmaz és Igazsághalmaz',
    icon: <Scale className="w-4 h-4 text-violet-600" />,
    formula: 'x \\in U \\implies M = \\{x_0\\} \\text{ vagy } M = \\emptyset',
    note: 'Ha a kiszámított gyök nem eleme a megadott U alaphalmaznak, az egyenletnek nincs megoldása (üres halmaz).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="50" cy="25" r="20" fill="#ede9fe" stroke="#7c3aed" />
        <text x="50" y="20" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">U = N</text>
        <text x="50" y="34" textAnchor="middle" className="text-[8px] fill-purple-700">{'{1; 2; 3...}'}</text>
        <text x="120" y="22" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">-4 ∉ N</text>
        <text x="120" y="36" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">M = ∅</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Zárójelbontás Mínuszjellel',
    icon: <ShieldAlert className="w-4 h-4 text-amber-600" />,
    formula: '-(a - b) = -a + b  •  -(5 - x) = -5 + x',
    note: 'Zárójel előtt álló mínuszjel vagy kivonás esetén minden bent lévő tag előjele az ellentétesre változik!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="10" width="60" height="30" rx="3" fill="#fffbeb" stroke="#d97706" />
        <text x="40" y="28" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">-(5 - x)</text>
        <path d="M 75 25 L 95 25" stroke="#d97706" strokeWidth="2" />
        <rect x="100" y="10" width="55" height="30" rx="3" fill="#fef2f2" stroke="#dc2626" />
        <text x="127" y="28" textAnchor="middle" className="text-[9px] font-bold fill-rose-900">-5 + x</text>
      </svg>
    )
  }
];

const equationMethodsQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Hogyan írható fel betűs kifejezéssel: „Egy szám kétszeresénél 5-tel nagyobb szám”?',
    options: ['2x + 5', '2(x + 5)', '5x + 2', 'x^2 + 5'],
    correctAnswer: '2x + 5',
    explanation: 'Előbb a szám kétszeresét vesszük (2x), majd ehhez adunk 5-öt: 2x + 5.',
    difficulty: 'easy',
    category: 'Betűs kifejezések'
  },
  {
    id: 'q2',
    text: 'Hogyan írható fel betűs kifejezéssel: „Egy számnál 12-vel nagyobb szám háromszorosa”?',
    options: ['3(x + 12)', '3x + 12', 'x + 36', '12x + 3'],
    correctAnswer: '3(x + 12)',
    explanation: 'Előbb növeljük 12-vel a számot (x + 12), és a teljes összeget szorozzuk hárommal, ezért zárójel szükséges: 3(x + 12).',
    difficulty: 'easy',
    category: 'Betűs kifejezések'
  },
  {
    id: 'q3',
    text: 'Mit fejez ki szavakban a 3x + 20 algebrai kifejezés, ha x egy gondolt számot jelent?',
    options: [
      'Egy gondolt szám háromszorosánál 20-szal nagyobb számot',
      'Egy gondolt számnál 20-szal nagyobb szám háromszorosát',
      'Egy gondolt szám és a 20 szorzatának háromszorosát',
      'Egy gondolt szám harmadánál 20-szal nagyobb számot'
    ],
    correctAnswer: 'Egy gondolt szám háromszorosánál 20-szal nagyobb számot',
    explanation: 'A 3x a szám 3-szorosa, a + 20 pedig a 20-szal való növelést jelenti.',
    difficulty: 'easy',
    category: 'Kifejezések értelmezése'
  },
  {
    id: 'q4',
    text: 'Melyik az ELSŐ ellentétes művelet a (5x - 4) / 3 = 7 egyenlet lebontogatása során?',
    options: [
      'Mindkét oldal szorzása 3-mal (· 3)',
      '4 hozzáadása mindkét oldalhoz (+ 4)',
      'Mindkét oldal osztása 5-tel (: 5)',
      '4 kivonása mindkét oldalból (- 4)'
    ],
    correctAnswer: 'Mindkét oldal szorzása 3-mal (· 3)',
    explanation: 'A bal oldalon az utolsó művelet a 3-mal való osztás volt. A lebontogatást az utolsó művelet ellentétével kezdjük: · 3.',
    difficulty: 'easy',
    category: 'Lebontogatási szabály'
  },
  {
    id: 'q5',
    text: 'Oldd meg lebontogatással az (5x - 4) / 3 = 7 egyenletet! Mennyi x értéke?',
    options: ['5', '7', '4', '9'],
    correctAnswer: '5',
    explanation: '1. lépés: 5x - 4 = 7 · 3 = 21. 2. lépés: 5x = 21 + 4 = 25. 3. lépés: x = 25 : 5 = 5. Ellenőrzés: (5·5 - 4) / 3 = 21/3 = 7 ✓',
    difficulty: 'easy',
    category: 'Lebontogatás'
  },
  {
    id: 'q6',
    text: 'Elek ezt mondta: „A gondolt szám háromszorosánál néggyel kisebb szám a 2.” Melyik egyenlet tartozik Elek gondolatához?',
    options: ['3x - 4 = 2', '3(x - 4) = 2', '4x - 3 = 2', '3x + 4 = 2'],
    correctAnswer: '3x - 4 = 2',
    explanation: 'A gondolt szám 3-szorosa 3x, ennél 4-gyel kisebb: 3x - 4 = 2. (Ebből 3x = 6, x = 2).',
    difficulty: 'easy',
    category: 'Egyenlet felírása'
  },
  {
    id: 'q7',
    text: 'Huba ezt mondta: „A gondolt számnál öttel nagyobb szám kétszerese a 12.” Melyik számra gondolt Huba?',
    options: ['1', '2', '3', '6'],
    correctAnswer: '1',
    explanation: 'Egyenlet: 2(x + 5) = 12. Lebontogatva: x + 5 = 12 : 2 = 6, amiből x = 6 - 5 = 1.',
    difficulty: 'easy',
    category: 'Egyenletmegoldás'
  },
  {
    id: 'q8',
    text: 'Van-e megoldása az x · (x - 1) = 6 egyenletnek a 10-nél kisebb prímszámok {2; 3; 5; 7} halmazán?',
    options: [
      'Igen, az x = 3 megoldás',
      'Igen, az x = 2 megoldás',
      'Igen, az x = 5 megoldás',
      'Nincs megoldása a prímszámok között'
    ],
    correctAnswer: 'Igen, az x = 3 megoldás',
    explanation: 'Próbálgatással: x=2 esetén 2·1=2 (nem jó); x=3 esetén 3·(3-1) = 3·2 = 6 (TALÁLAT!). A megoldás x = 3.',
    difficulty: 'easy',
    category: 'Próbálgatás'
  },
  {
    id: 'q9',
    text: 'Oldd meg a munkafüzeti egyenletet: (x / 4 + 10) · 5 = 60! Mennyi x értéke?',
    options: ['8', '12', '4', '16'],
    correctAnswer: '8',
    explanation: '1. lépés: x/4 + 10 = 60 : 5 = 12. 2. lépés: x/4 = 12 - 10 = 2. 3. lépés: x = 2 · 4 = 8. Ellenőrzés: (8/4 + 10) · 5 = 12 · 5 = 60 ✓',
    difficulty: 'easy',
    category: 'Lebontogatás'
  },
  {
    id: 'q10',
    text: 'Mit jelent egy egyenlet alaphalmaza (U)?',
    options: [
      'Azon számok halmazát, amelyek közül a megoldást kereshetjük',
      'Csak az egyenlet helyes megoldásait tartalmazó halmazt',
      'Mindig kizárólag a természetes számok halmazát',
      'Az egyenlet bal oldalán lévő műveletek számát'
    ],
    correctAnswer: 'Azon számok halmazát, amelyek közül a megoldást kereshetjük',
    explanation: 'Az alaphalmaz jelöli ki az értelmezési tartományt. Az egyenlet gyökei csak az alaphalmaz elemei közül kerülhetnek ki.',
    difficulty: 'easy',
    category: 'Alapfogalmak'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Oldd meg lebontogatással a tankönyvi mintapéldát: (3x + 8) · 2 - 5 = 17! Mennyi x?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '1',
    explanation: 'Visszafelé: 17 + 5 = 22 -> 22 : 2 = 11 -> 11 - 8 = 3 -> 3 : 3 = 1. Ellenőrzés: (3·1 + 8)·2 - 5 = 11·2 - 5 = 22 - 5 = 17 ✓',
    difficulty: 'medium',
    category: 'Lebontogatás'
  },
  {
    id: 'q12',
    text: 'Oldd meg a (13 - 2x) / 3 = 7 egyenletet lebontogatással! Mennyi x értéke?',
    options: ['-4', '4', '-7', '3'],
    correctAnswer: '-4',
    explanation: '13 - 2x = 7 · 3 = 21 -> -2x = 21 - 13 = 8 -> x = 8 : (-2) = -4. Ellenőrzés: (13 - 2·(-4)) / 3 = (13 + 8)/3 = 21/3 = 7 ✓',
    difficulty: 'medium',
    category: 'Lebontogatás negatív számmal'
  },
  {
    id: 'q13',
    text: 'Mennyi a gyöke a 4(x / 6 - 9) = -16 munkafüzeti egyenletnek?',
    options: ['30', '24', '36', '-18'],
    correctAnswer: '30',
    explanation: 'x/6 - 9 = -16 : 4 = -4 -> x/6 = -4 + 9 = 5 -> x = 5 · 6 = 30. Ellenőrzés: 4(30/6 - 9) = 4(5 - 9) = 4(-4) = -16 ✓',
    difficulty: 'medium',
    category: 'Lebontogatás'
  },
  {
    id: 'q14',
    text: 'Oldd meg a (4x - 3) / 5 = 5 egyenletet lebontogatással! Mennyi x?',
    options: ['7', '5', '8', '6'],
    correctAnswer: '7',
    explanation: '4x - 3 = 5 · 5 = 25 -> 4x = 25 + 3 = 28 -> x = 28 : 4 = 7.',
    difficulty: 'medium',
    category: 'Lebontogatás'
  },
  {
    id: 'q15',
    text: 'Oldd meg a (9 + 6x) / 3 = -1 egyenletet! Mennyi x értéke?',
    options: ['-2', '2', '-1', '-3'],
    correctAnswer: '-2',
    explanation: '9 + 6x = -1 · 3 = -3 -> 6x = -3 - 9 = -12 -> x = -12 : 6 = -2. Ellenőrzés: (9 + 6·(-2))/3 = (9 - 12)/3 = -3/3 = -1 ✓',
    difficulty: 'medium',
    category: 'Lebontogatás'
  },
  {
    id: 'q16',
    text: 'Egy autóbusz az előre tervezett útjának harmadánál 20 km-rel többet tett meg, ekkor a sofőr szerint 200 km-t utaztak. Hány km volt a tervezett út?',
    options: ['540 km', '600 km', '480 km', '660 km'],
    correctAnswer: '540 km',
    explanation: 'Egyenlet: x/3 + 20 = 200. Lebontogatva: x/3 = 200 - 20 = 180 -> x = 180 · 3 = 540 km.',
    difficulty: 'medium',
    category: 'Szöveges feladat lebontással'
  },
  {
    id: 'q17',
    text: 'Próbálgatással keresd meg a 3 · x · (12 - x) = 96 egyenlet egész megoldásait! Melyik állítás igaz?',
    options: [
      'Két megoldása is van: x = 4 és x = 8',
      'Csak az x = 4 a megoldás',
      'Csak az x = 6 a megoldás',
      'Nincs egész megoldása'
    ],
    correctAnswer: 'Két megoldása is van: x = 4 és x = 8',
    explanation: 'Mindkét oldalt 3-mal osztva: x(12 - x) = 32. A 32 osztópárjai közül 4·8 = 32, így x = 4 és x = 8 is jó, mert 4·8=32 és 8·4=32!',
    difficulty: 'medium',
    category: 'Próbálgatás osztópárokkal'
  },
  {
    id: 'q18',
    text: 'Egy számhoz hozzáadtuk a kétszeresénél 23-mal nagyobb számot, így 47-et kaptunk. Melyik ez a szám?',
    options: ['8', '6', '10', '12'],
    correctAnswer: '8',
    explanation: 'Egyenlet: x + (2x + 23) = 47 -> 3x + 23 = 47 -> 3x = 24 -> x = 8. Ellenőrzés: 8 + (2·8 + 23) = 8 + 39 = 47 ✓',
    difficulty: 'medium',
    category: 'Szöveges egyenlet'
  },
  {
    id: 'q19',
    text: 'Végezd el az összevonást és oldd meg: 3(x + 2) + 2(x - 1) - (5 - x) = 11! Mennyi x?',
    options: ['2', '1', '3', '-1'],
    correctAnswer: '2',
    explanation: 'Zárójelbontás: 3x + 6 + 2x - 2 - 5 + x = 11 -> Összevonva: 6x - 1 = 11 -> 6x = 12 -> x = 2.',
    difficulty: 'medium',
    category: 'Zárójelbontás és összevonás'
  },
  {
    id: 'q20',
    text: 'Oldd meg az egyenletet: 2(x + 3) + 3(x - 2) = 35! Mennyi az ismeretlen értéke?',
    options: ['7', '6', '8', '5'],
    correctAnswer: '7',
    explanation: '2x + 6 + 3x - 6 = 35 -> 5x = 35 -> x = 7. Ellenőrzés: 2(7+3) + 3(7-2) = 20 + 15 = 35 ✓',
    difficulty: 'medium',
    category: 'Zárójelbontás'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Oldd meg a tankönyvi egyenletet: 15 - 2(8 - 4x) = 47! Ügyelj a negatív előjeles szorzásra!',
    options: ['6', '5', '4', '-6'],
    correctAnswer: '6',
    explanation: '15 - 16 + 8x = 47 -> 8x - 1 = 47 -> 8x = 48 -> x = 6. Ellenőrzés: 15 - 2(8 - 24) = 15 - 2(-16) = 15 + 32 = 47 ✓',
    difficulty: 'hard',
    category: 'Negatív előjel kezelése'
  },
  {
    id: 'q22',
    text: 'Oldd meg az egyenletet: 5(10 - 2x) - 4(10 + 2x) = 100! Mennyi x értéke?',
    options: ['-5', '5', '-6', '-4'],
    correctAnswer: '-5',
    explanation: '50 - 10x - 40 - 8x = 100 -> -18x + 10 = 100 -> -18x = 90 -> x = 90 : (-18) = -5.',
    difficulty: 'hard',
    category: 'Zárójelbontás és összevonás'
  },
  {
    id: 'q23',
    text: 'Egy számot elosztva a nyolcadával 8-at kapunk: x / (x / 8) = 8. Mely számokra igaz ez az állítás?',
    options: [
      'Bármely 0-tól különböző valós számra (x ≠ 0)',
      'Csak az x = 8 és x = 64 számokra',
      'Csak az x = 1 számra',
      'Nincs ilyen szám'
    ],
    correctAnswer: 'Bármely 0-tól különböző valós számra (x ≠ 0)',
    explanation: 'Törttel való osztásnál a reciprokával szorzunk: x / (x/8) = x · (8/x) = 8. Mivel x kiesik, az egyenlőség minden x ≠ 0 számra azonosság!',
    difficulty: 'hard',
    category: 'Azonosság és elmélet'
  },
  {
    id: 'q24',
    text: 'Egy téglalap területe 168 cm², egyik oldala 2 cm-rel rövidebb a másiknál: x(x + 2) = 168. Mekkora a téglalap kerülete?',
    options: ['52 cm', '56 cm', '48 cm', '50 cm'],
    correctAnswer: '52 cm',
    explanation: 'Próbálgatással: 12 · 14 = 168. Az oldalak 12 cm és 14 cm. Kerület: K = 2 · (12 + 14) = 2 · 26 = 52 cm.',
    difficulty: 'hard',
    category: 'Geometria próbálgatással'
  },
  {
    id: 'q25',
    text: 'Egy négyzet oldala megegyezik egy téglalap rövidebb oldalával. A téglalap másik oldala 5 cm-rel hosszabb. A téglalap területe 176 cm². Mekkorák a négyzet oldalai?',
    options: ['11 cm', '12 cm', '10 cm', '13 cm'],
    correctAnswer: '11 cm',
    explanation: 'Egyenlet: x · (x + 5) = 176. Mivel 10 · 15 = 150 (kicsi), 11 · 16 = 176 (PONTOS!). A négyzet oldala 11 cm.',
    difficulty: 'hard',
    category: 'Próbálgatás és területszámítás'
  },
  {
    id: 'q26',
    text: 'Oldd meg a munkafüzet 5/a egyenletét: 3(8 - 2x) + 4(-x - 3) = 8! Mennyi x értéke?',
    options: ['0,4', '0,5', '-0,4', '1,2'],
    correctAnswer: '0,4',
    explanation: '24 - 6x - 4x - 12 = 8 -> -10x + 12 = 8 -> -10x = 8 - 12 = -4 -> x = -4 : (-10) = 0,4.',
    difficulty: 'hard',
    category: 'Tizedestört gyök'
  },
  {
    id: 'q27',
    text: 'Olga az írószerboltban elköltött pénzének felét költötte illatszerekre, összesen 1260 Ft-ot költött. Mennyit költött írószerekre?',
    options: ['840 Ft', '420 Ft', '630 Ft', '900 Ft'],
    correctAnswer: '840 Ft',
    explanation: 'Írószer legyen x Ft, ekkor illatszer x/2 Ft. x + 0,5x = 1260 -> 1,5x = 1260 -> x = 1260 / 1,5 = 840 Ft. (Illatszer: 420 Ft).',
    difficulty: 'hard',
    category: 'Szöveges feladat'
  },
  {
    id: 'q28',
    text: 'Egy informatikai üzlet decemberi forgalma a novemberi 3-szorosánál 150 000 Ft-tal nagyobb volt. A két hónap bevétele összesen 10 600 000 Ft. Mennyi volt a novemberi bevétel?',
    options: ['2 612 500 Ft', '7 987 500 Ft', '2 500 000 Ft', '2 800 000 Ft'],
    correctAnswer: '2 612 500 Ft',
    explanation: 'November: x. December: 3x + 150 000. x + 3x + 150 000 = 10 600 000 -> 4x = 10 450 000 -> x = 2 612 500 Ft.',
    difficulty: 'hard',
    category: 'Összetett szöveges egyenlet'
  },
  {
    id: 'q29',
    text: 'Egy kétjegyű szám számjegyeinek összege 11. Ha ebből elvesszük a felcserélt számot, a különbség 45 lesz. Melyik ez a kétjegyű szám?',
    options: ['83', '92', '74', '65'],
    correctAnswer: '83',
    explanation: 'Lehetséges számok (számjegyösszeg 11): 92, 83, 74, 65. Ellenőrzés: 92 - 29 = 63; 83 - 38 = 45 (TALÁLAT!). A keresett szám a 83.',
    difficulty: 'hard',
    category: 'Számelméleti próbálgatás'
  },
  {
    id: 'q30',
    text: 'Egy háromszög egyik belső szöge ötszöröse a másiknak, a harmadik szög pedig a másik kettő összege. Mekkorák a háromszög belső szögei?',
    options: [
      '15°, 75°, 90°',
      '20°, 60°, 100°',
      '10°, 50°, 120°',
      '18°, 72°, 90°'
    ],
    correctAnswer: '15°, 75°, 90°',
    explanation: 'Szögek: x, 5x, és a harmadik x + 5x = 6x. Összegük: x + 5x + 6x = 12x = 180° -> x = 15°. A szögek: 15°, 75°, 90° (derékszögű háromszög!).',
    difficulty: 'hard',
    category: 'Geometriai egyenlet'
  }
];

export const EquationMethodsQuiz: React.FC<EquationMethodsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-eq-methods-quiz"
      topicTitle="Egyenletmegoldási módszerek"
      title="Egyenletmegoldási módszerek - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: betűs kifejezések, lebontogatás, szisztematikus próbálgatás és szöveges feladatok"
      badge="GYAKORLÓ KVÍZ"
      themeColor="indigo"
      questions={equationMethodsQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <EquationMethodsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EquationMethodsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default EquationMethodsQuiz;
