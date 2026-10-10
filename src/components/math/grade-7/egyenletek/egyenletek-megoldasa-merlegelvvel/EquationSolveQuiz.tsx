import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import {
  Scale,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Layers,
  HelpCircle,
  Equal
} from 'lucide-react';
import EquationSolveMatcher from './EquationSolveMatcher';
import EquationSolveSorter from './EquationSolveSorter';

interface EquationSolveQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A 7 Lépéses Mester-Algoritmus',
    icon: <Layers className="w-4 h-4 text-violet-600" />,
    formula: '1. U \\to 2. / \\cdot \\text{LKKT} \\to 3. \\text{Bontás} \\to 4. \\text{Összevonás} \\to 5. / - cx \\to 6. / : a \\to 7. \\text{Ell.}',
    note: 'Bármilyen bonyolult az egyenlet, ezen a 7 lépésen végighaladva mindig eljutsz a helyes gyökig.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="4" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="80" y="22" textAnchor="middle" className="text-[8px] font-bold fill-violet-900">Törtek -&gt; Zárójelek -&gt; Összevonás</text>
        <text x="80" y="34" textAnchor="middle" className="text-[8px] font-mono fill-violet-700">Rendezés -&gt; Osztás -&gt; Ellenőrzés ✓</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Zárójelfelbontás és Mínuszjel',
    icon: <Calculator className="w-4 h-4 text-purple-600" />,
    formula: '-(ax - b) = -ax + b \\quad • \\quad -c(x - d) = -cx + cd',
    note: 'Ha a zárójel előtt mínuszjel vagy negatív szorzó áll, a zárójelben lévő MINDEN tag előjele megfordul!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="55" height="30" rx="3" fill="#fee2e2" stroke="#ef4444" />
        <text x="42" y="28" textAnchor="middle" className="text-[8px] font-bold fill-rose-900">-2(x - 3)</text>
        <path d="M 75 25 L 95 25" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="100" y="10" width="50" height="30" rx="3" fill="#f0fdf4" stroke="#16a34a" />
        <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-emerald-900">-2x + 6</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Törtek Eltüntetése (LKKT)',
    icon: <Scale className="w-4 h-4 text-indigo-600" />,
    formula: '\\frac{A}{b} = \\frac{C}{d} \\implies / \\cdot \\text{LKKT}(b, d)',
    note: 'A törtek eltüntetésekor az egyenlet MINDEN tagját (az önálló számokat is!) meg kell szorozni a közös nevezővel.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="80" y="18" textAnchor="middle" className="text-[9px] font-mono fill-slate-700">x/2 - x/3 = 5  / · 6</text>
        <text x="80" y="32" textAnchor="middle" className="text-[9px] font-mono fill-indigo-700">3x - 2x = 30</text>
        <text x="80" y="44" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">x = 30 ✓</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Azonosság és Ellentmondás',
    icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    formula: '0x = 0 \\implies M = U \\quad \\text{és} \\quad 0x = c \\; (c \\neq 0) \\implies M = \\emptyset',
    note: 'Azonosságnál minden szám megoldás. Ellentmondásnál nincs megoldás, az egyenletnek nincs gyöke.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="60" height="26" rx="3" fill="#fef3c7" stroke="#d97706" />
        <text x="45" y="28" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">0x = 0  -&gt;  M = Q</text>
        <rect x="85" y="12" width="60" height="26" rx="3" fill="#fee2e2" stroke="#ef4444" />
        <text x="115" y="28" textAnchor="middle" className="text-[8px] font-bold fill-rose-900">0x = 5  -&gt;  M = ∅</text>
      </svg>
    )
  }
];

const level1Questions: Question[] = [
  {
    id: 'l1-1',
    question: 'Mi a megoldása az x + 12 = 25 egyenletnek?',
    options: ['x = 13', 'x = 37', 'x = 12', 'x = 15'],
    correctAnswer: 0,
    explanation: 'Mindkét oldalból kivonunk 12-t: x = 25 - 12 = 13. Ellenőrzés: 13 + 12 = 25.',
    hint: 'A mérlegelv szerint mindkét oldalból vonj ki 12-t!'
  },
  {
    id: 'l1-2',
    question: 'Mi a megoldása az x - 18 = 32 egyenletnek?',
    options: ['x = 14', 'x = 50', 'x = 48', 'x = 54'],
    correctAnswer: 1,
    explanation: 'Mindkét oldalhoz hozzáadunk 18-at: x = 32 + 18 = 50. Ellenőrzés: 50 - 18 = 32.',
    hint: 'A kivonás ellentétes művelete az összeadás: adj 18-at mindkét oldalhoz!'
  },
  {
    id: 'l1-3',
    question: 'Oldd meg az egyenletet: 4x = 28!',
    options: ['x = 6', 'x = 8', 'x = 7', 'x = 112'],
    correctAnswer: 2,
    explanation: 'Mindkét oldalt elosztjuk 4-gyel: x = 28 : 4 = 7. Ellenőrzés: 4 · 7 = 28.',
    hint: 'Oszd el mindkét oldalt az ismeretlen együtthatójával (4-gyel)!'
  },
  {
    id: 'l1-4',
    question: 'Mi az x értéke, ha x / 5 = 6?',
    options: ['x = 1,2', 'x = 30', 'x = 11', 'x = 25'],
    correctAnswer: 1,
    explanation: 'Mindkét oldalt megszorozzuk 5-tel: x = 6 · 5 = 30. Ellenőrzés: 30 : 5 = 6.',
    hint: 'Az 5-tel való osztást 5-tel való szorzással küszöböljük ki.'
  },
  {
    id: 'l1-5',
    question: 'Oldd meg a kétlépéses egyenletet: 3x + 7 = 22!',
    options: ['x = 5', 'x = 7', 'x = 3', 'x = 6'],
    correctAnswer: 0,
    explanation: '1. lépés: Mindkét oldalból levonunk 7-et: 3x = 15. 2. lépés: Osztunk 3-mal: x = 5. Ellenőrzés: 3·5 + 7 = 22.',
    hint: 'Előbb a +7-et tüntesd el levonással, majd ossz 3-mal!'
  },
  {
    id: 'l1-6',
    question: 'Oldd meg az egyenletet: 5x - 8 = 32!',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctAnswer: 2,
    explanation: 'Hozzáadunk 8-at mindkét oldalhoz: 5x = 40. Osztunk 5-tel: x = 8. Ellenőrzés: 5·8 - 8 = 32.',
    hint: '5x = 32 + 8 = 40, ezt oszd el 5-tel.'
  },
  {
    id: 'l1-7',
    question: 'Mi a megoldása a 2x + 15 = 7 egyenletnek a racionális számok halmazán?',
    options: ['x = 4', 'x = -4', 'x = -8', 'x = 11'],
    correctAnswer: 1,
    explanation: 'Levonunk 15-öt mindkét oldalból: 2x = 7 - 15 = -8. Osztunk 2-vel: x = -4. Ellenőrzés: 2·(-4) + 15 = -8 + 15 = 7.',
    hint: 'Vigyázz a negatív előjelre: 7 - 15 = -8!'
  },
  {
    id: 'l1-8',
    question: 'Oldd meg az egyenletet: 4x - 5 = -25!',
    options: ['x = -5', 'x = -7,5', 'x = 5', 'x = -4'],
    correctAnswer: 0,
    explanation: 'Hozzáadunk 5-öt: 4x = -25 + 5 = -20. Osztunk 4-gyel: x = -20 : 4 = -5.',
    hint: '-25 + 5 = -20, ezt oszd el 4-gyel.'
  },
  {
    id: 'l1-9',
    question: 'Mi az x értéke, ha -3x = 18?',
    options: ['x = 6', 'x = -6', 'x = -15', 'x = 21'],
    correctAnswer: 1,
    explanation: 'Mindkét oldalt elosztjuk (-3)-mal: x = 18 : (-3) = -6. Pozitív osztva negatívval negatív eredményt ad.',
    hint: 'Oszd el 18-at (-3)-mal!'
  },
  {
    id: 'l1-10',
    question: 'Oldd meg az egyenletet: -5x = -35!',
    options: ['x = -7', 'x = 7', 'x = -30', 'x = 175'],
    correctAnswer: 1,
    explanation: 'Mindkét oldalt elosztjuk (-5)-tel: x = (-35) : (-5) = +7. Két negatív szám hányadosa pozitív.',
    hint: 'Negatív osztva negatívval pozitív számot ad!'
  },
  {
    id: 'l1-11',
    question: 'Oldd meg az egyenletet: 2x + 9 = x + 14!',
    options: ['x = 5', 'x = 9', 'x = 23', 'x = 4'],
    correctAnswer: 0,
    explanation: 'Mindkét oldalból kivonunk x-et: x + 9 = 14. Mindkét oldalból levonunk 9-et: x = 5. Ellenőrzés: 2·5 + 9 = 19 és 5 + 14 = 19.',
    hint: 'Előbb a kisebb ismeretlent (x-et) vond ki mindkét oldalból!'
  },
  {
    id: 'l1-12',
    question: 'Mi a megoldása az 5x - 4 = 3x + 8 egyenletnek?',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
    correctAnswer: 2,
    explanation: 'Kivonunk 3x-et: 2x - 4 = 8. Hozzáadunk 4-et: 2x = 12. Osztunk 2-vel: x = 6. Ellenőrzés: 5·6 - 4 = 26, 3·6 + 8 = 26.',
    hint: '5x - 3x = 2x, majd 2x = 8 + 4 = 12.'
  },
  {
    id: 'l1-13',
    question: 'Oldd meg az egyenletet: 7x + 2 = 4x + 20!',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: 'Levonunk 4x-et: 3x + 2 = 20. Levonunk 2-t: 3x = 18. Osztunk 3-mal: x = 6.',
    hint: '3x = 18 ⟹ x = 6.'
  },
  {
    id: 'l1-14',
    question: 'Mi a gyöke a 6x - 11 = 2x + 13 egyenletnek?',
    options: ['x = 6', 'x = 4', 'x = 5', 'x = 7'],
    correctAnswer: 0,
    explanation: 'Levonunk 2x-et: 4x - 11 = 13. Hozzáadunk 11-et: 4x = 24. Osztunk 4-gyel: x = 6.',
    hint: '4x = 13 + 11 = 24.'
  },
  {
    id: 'l1-15',
    question: 'Oldd meg az egyenletet: 8x - 5 = 5x + 16!',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctAnswer: 1,
    explanation: 'Levonunk 5x-et: 3x - 5 = 16. Hozzáadunk 5-öt: 3x = 21. Osztunk 3-mal: x = 7.',
    hint: '3x = 21 ⟹ x = 7.'
  },
  {
    id: 'l1-16',
    question: 'Mi a megoldása a 3x + 20 = 7x + 4 egyenletnek?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: 'Levonunk 3x-et mindkét oldalból: 20 = 4x + 4. Levonunk 4-et: 16 = 4x. Osztunk 4-gyel: x = 4.',
    hint: 'Célszerű a kisebb együtthatójú x-et (3x-et) levonni: 20 - 4 = 4x.'
  },
  {
    id: 'l1-17',
    question: 'Oldd meg a zárójeles egyenletet: 2(x + 5) = 18!',
    options: ['x = 4', 'x = 7', 'x = 6,5', 'x = 8'],
    correctAnswer: 0,
    explanation: '1. módszer: Zárójel felbontása: 2x + 10 = 18 ⟹ 2x = 8 ⟹ x = 4. 2. módszer: Osztás 2-vel: x + 5 = 9 ⟹ x = 4.',
    hint: 'Vagy bontsd fel a zárójelet (2x + 10), vagy oszd el az egész egyenletet 2-vel!'
  },
  {
    id: 'l1-18',
    question: 'Mi az x értéke: 3(x - 4) = 15?',
    options: ['x = 7', 'x = 8', 'x = 9', 'x = 10'],
    correctAnswer: 2,
    explanation: '3x - 12 = 15 ⟹ 3x = 27 ⟹ x = 9. (Vagy: x - 4 = 5 ⟹ x = 9).',
    hint: 'x - 4 = 5 ⟹ x = 9.'
  },
  {
    id: 'l1-19',
    question: 'Oldd meg az egyenletet: 4(2x + 1) = 36!',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: '8x + 4 = 36 ⟹ 8x = 32 ⟹ x = 4. Ellenőrzés: 4·(2·4 + 1) = 4·9 = 36.',
    hint: '8x + 4 = 36 ⟹ 8x = 32.'
  },
  {
    id: 'l1-20',
    question: 'Oldd meg az egyenletet: 5(x - 2) = 20!',
    options: ['x = 6', 'x = 4', 'x = 8', 'x = 5'],
    correctAnswer: 0,
    explanation: 'x - 2 = 4 ⟹ x = 6. (Vagy: 5x - 10 = 20 ⟹ 5x = 30 ⟹ x = 6).',
    hint: '5-tel osztva: x - 2 = 4.'
  },
  {
    id: 'l1-21',
    question: 'Mi a megoldása a 10 - 2x = 4 egyenletnek?',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctAnswer: 1,
    explanation: 'Hozzáadunk 2x-et mindkét oldalhoz: 10 = 2x + 4. Levonunk 4-et: 6 = 2x ⟹ x = 3. Ellenőrzés: 10 - 2·3 = 4.',
    hint: '10-ből mit kell kivonni, hogy 4-et kapjunk? 6-ot! Tehát 2x = 6.'
  },
  {
    id: 'l1-22',
    question: 'Oldd meg az egyenletet: 15 - 3x = 0!',
    options: ['x = 5', 'x = -5', 'x = 0', 'x = 15'],
    correctAnswer: 0,
    explanation: '15 = 3x ⟹ x = 15 : 3 = 5. Ellenőrzés: 15 - 3·5 = 15 - 15 = 0.',
    hint: '3x = 15 ⟹ x = 5.'
  },
  {
    id: 'l1-23',
    question: 'Mi a megoldása a -2x + 7 = 1 egyenletnek?',
    options: ['x = 4', 'x = -3', 'x = 3', 'x = -4'],
    correctAnswer: 2,
    explanation: '-2x = 1 - 7 = -6 ⟹ x = (-6) : (-2) = +3. Ellenőrzés: -2·3 + 7 = -6 + 7 = 1.',
    hint: '-2x = -6. Két negatív szám hányadosa pozitív!'
  },
  {
    id: 'l1-24',
    question: 'Melyik művelettel rendezzük a 3x + 8 = 20 egyenletet az első lépésben a mérlegelv szerint?',
    options: ['Osztunk 3-mal', 'Levonunk 8-at mindkét oldalból', 'Hozzáadunk 8-at mindkét oldalhoz', 'Megszorozzuk 3-mal'],
    correctAnswer: 1,
    explanation: 'A számtagot kell először átvinni: a +8 ellentétes művelete a -8 (mindkét oldalból kivonunk 8-at).',
    hint: 'A mérlegen a tiszta súlyokat vesszük le először mindkét serpenyőből.'
  },
  {
    id: 'l1-25',
    question: 'Melyik művelet szünteti meg az x előtti szorzót a 4x = 24 egyenletben?',
    options: ['Kivonunk 4-et', 'Osztunk 4-gyel mindkét oldalon', 'Szorzunk 4-gyel', 'Hozzáadunk 4-et'],
    correctAnswer: 1,
    explanation: 'Mivel a 4x szorzást jelent (4 · x), az ellentétes művelet az osztás 4-gyel: x = 24 : 4 = 6.',
    hint: 'A szorzás ellentéte az osztás!'
  },
  {
    id: 'l1-26',
    question: 'Ha 2x + 6 = 20, mennyi az x + 3 értéke?',
    options: ['7', '10', '13', '14'],
    correctAnswer: 1,
    explanation: 'Észrevehetjük, hogy 2x + 6 = 2(x + 3). Ha 2(x + 3) = 20, akkor mindkét oldalt 2-vel osztva x + 3 = 10.',
    hint: 'Vagy számold ki x értékét (x = 7), és add hozzá a 3-at, vagy oszd el az egész egyenletet 2-vel!'
  },
  {
    id: 'l1-27',
    question: 'Oldd meg az egyenletet: 4x + 1 = x + 10!',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctAnswer: 1,
    explanation: 'Levonunk x-et: 3x + 1 = 10. Levonunk 1-et: 3x = 9. Osztunk 3-mal: x = 3.',
    hint: '3x = 9 ⟹ x = 3.'
  },
  {
    id: 'l1-28',
    question: 'Mi az x értéke: 9x - 12 = 3x + 24?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: 'Levonunk 3x-et: 6x - 12 = 24. Hozzáadunk 12-t: 6x = 36. Osztunk 6-tal: x = 6.',
    hint: '6x = 36 ⟹ x = 6.'
  },
  {
    id: 'l1-29',
    question: 'Oldd meg az egyenletet: x / 3 - 2 = 5!',
    options: ['x = 9', 'x = 15', 'x = 21', 'x = 7'],
    correctAnswer: 2,
    explanation: 'Hozzáadunk 2-t: x / 3 = 7. Megszorozzuk 3-mal: x = 21. Ellenőrzés: 21:3 - 2 = 7 - 2 = 5.',
    hint: 'Előbb add hozzá a 2-t (7-et kapsz), majd szorozz 3-mal!'
  },
  {
    id: 'l1-30',
    question: 'Mi a megoldása a 2(3x - 1) = 22 egyenletnek?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: '6x - 2 = 22 ⟹ 6x = 24 ⟹ x = 4. (Vagy: 3x - 1 = 11 ⟹ 3x = 12 ⟹ x = 4).',
    hint: '3x - 1 = 11 ⟹ 3x = 12 ⟹ x = 4.'
  }
];

const level2Questions: Question[] = [
  {
    id: 'l2-1',
    question: 'Oldd meg az egyenletet: 3(2x - 4) = 4x + 2!',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 2,
    explanation: 'Bontás: 6x - 12 = 4x + 2. Levonunk 4x-et: 2x - 12 = 2. Hozzáadunk 12-t: 2x = 14. Osztunk 2-vel: x = 7.',
    hint: 'Előbb bontsd fel a zárójelet: 3 · 2x = 6x és 3 · (-4) = -12.'
  },
  {
    id: 'l2-2',
    question: 'Mi a gyöke az 5(x + 2) - 3x = 18 egyenletnek?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: '5x + 10 - 3x = 18. Összevonás: 2x + 10 = 18. Levonunk 10-et: 2x = 8 ⟹ x = 4.',
    hint: '5x - 3x = 2x, majd 2x + 10 = 18.'
  },
  {
    id: 'l2-3',
    question: 'Oldd meg az egyenletet: 4(x - 3) + 2(x + 1) = 26!',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: 'Bontás: 4x - 12 + 2x + 2 = 26. Összevonás: 6x - 10 = 26. Hozzáadunk 10-et: 6x = 36 ⟹ x = 6.',
    hint: '4x + 2x = 6x és -12 + 2 = -10. 6x - 10 = 26.'
  },
  {
    id: 'l2-4',
    question: 'Mi a megoldása a 3(x + 4) - 2(2x - 1) = 5 egyenletnek?',
    options: ['x = 7', 'x = 8', 'x = 9', 'x = 10'],
    correctAnswer: 2,
    explanation: 'Bontás: 3x + 12 - 4x + 2 = 5 (vigyázat: -2 · (-1) = +2!). Összevonás: -x + 14 = 5 ⟹ -x = -9 ⟹ x = 9.',
    hint: 'Figyelj a negatív szorzóra: -2 · (2x - 1) = -4x + 2!'
  },
  {
    id: 'l2-5',
    question: 'Oldd meg az egyenletet: -(4x - 5) + 3x = 9!',
    options: ['x = -4', 'x = 4', 'x = -2', 'x = 2'],
    correctAnswer: 0,
    explanation: 'A zárójel előtt mínusz van: -4x + 5 + 3x = 9. Összevonás: -x + 5 = 9 ⟹ -x = 4 ⟹ x = -4.',
    hint: '-(4x - 5) = -4x + 5!'
  },
  {
    id: 'l2-6',
    question: 'Oldd meg a törtes egyenletet: (2x - 1) / 3 = 5!',
    options: ['x = 7', 'x = 8', 'x = 9', 'x = 6'],
    correctAnswer: 1,
    explanation: 'Szorzunk 3-mal: 2x - 1 = 15. Hozzáadunk 1-et: 2x = 16 ⟹ x = 8. Ellenőrzés: (16 - 1) / 3 = 15 / 3 = 5.',
    hint: 'Előbb szorozz 3-mal, hogy eltűnjön a tört!'
  },
  {
    id: 'l2-7',
    question: 'Mi a gyöke a (3x + 2) / 4 = x - 1 egyenletnek?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: 'Szorzunk 4-gyel: 3x + 2 = 4(x - 1) = 4x - 4. Levonunk 3x-et: 2 = x - 4. Hozzáadunk 4-et: x = 6.',
    hint: 'A jobb oldalt is szorozd meg 4-gyel: 4 · (x - 1) = 4x - 4!'
  },
  {
    id: 'l2-8',
    question: 'Oldd meg az egyenletet: x / 2 + x / 3 = 10!',
    options: ['x = 10', 'x = 12', 'x = 15', 'x = 16'],
    correctAnswer: 1,
    explanation: 'LKKT = 6. Szorzunk 6-tal: 3x + 2x = 60 ⟹ 5x = 60 ⟹ x = 12. Ellenőrzés: 12/2 + 12/3 = 6 + 4 = 10.',
    hint: 'Szorozz 6-tal! 6 · (x/2) = 3x, 6 · (x/3) = 2x, és 6 · 10 = 60.'
  },
  {
    id: 'l2-9',
    question: 'Mi a megoldása az x / 4 - x / 6 = 2 egyenletnek?',
    options: ['x = 18', 'x = 24', 'x = 12', 'x = 36'],
    correctAnswer: 1,
    explanation: 'LKKT = 12. Szorzunk 12-vel: 3x - 2x = 24 ⟹ x = 24. Ellenőrzés: 24/4 - 24/6 = 6 - 4 = 2.',
    hint: 'A 4 és a 6 közös többszöröse a 12. Szorozz 12-vel!'
  },
  {
    id: 'l2-10',
    question: 'Oldd meg az egyenletet: 2x / 5 + 3 = 7!',
    options: ['x = 8', 'x = 10', 'x = 12', 'x = 15'],
    correctAnswer: 1,
    explanation: 'Levonunk 3-at: 2x / 5 = 4. Szorzunk 5-tel: 2x = 20 ⟹ x = 10.',
    hint: '2x / 5 = 4 ⟹ 2x = 20.'
  },
  {
    id: 'l2-11',
    question: 'Mi a megoldáshalmaza a 2(3x - 1) = 6x - 2 egyenletnek a racionális számok halmazán?',
    options: ['M = {0}', 'M = ∅ (nincs megoldás)', 'M = Q (minden racionális szám)', 'M = {1}'],
    correctAnswer: 2,
    explanation: 'Bontás: 6x - 2 = 6x - 2. Levonunk 6x-et: -2 = -2 (vagy 0x = 0). Ez egy azonosság, minden x értékre igaz!',
    hint: 'Mivel a bal oldal és a jobb oldal azonos kifejezés, bármilyen szám behelyettesíthető.'
  },
  {
    id: 'l2-12',
    question: 'Mi a megoldása a 4x + 7 = 4x - 2 egyenletnek?',
    options: ['M = {0}', 'M = ∅ (nincs megoldás)', 'M = Q', 'x = -4,5'],
    correctAnswer: 1,
    explanation: 'Levonunk 4x-et mindkét oldalból: 7 = -2. Ez egy lehetetlen ellentmondás, így az egyenletnek nincs megoldása: M = ∅.',
    hint: 'Kivonva 4x-et: 7 = -2 jön ki, ami hamis állítás.'
  },
  {
    id: 'l2-13',
    question: 'Mi az 5(x + 2) = 5x + 8 egyenlet megoldása?',
    options: ['x = 2', 'x = 0', 'M = ∅ (nincs megoldás)', 'M = Q'],
    correctAnswer: 2,
    explanation: '5x + 10 = 5x + 8 ⟹ levonunk 5x-et: 10 = 8. Ellentmondás, nincs megoldás.',
    hint: '5x + 10 sosem lehet egyenlő 5x + 8-cal!'
  },
  {
    id: 'l2-14',
    question: 'Ha az alaphalmaz U = N (természetes számok), mi a megoldása a 2x + 7 = 3 egyenletnek?',
    options: ['M = {-2}', 'M = {2}', 'M = ∅', 'M = {5}'],
    correctAnswer: 2,
    explanation: '2x = 3 - 7 = -4 ⟹ x = -2. Mivel -2 NEM természetes szám (-2 ∉ N), ezen az alaphalmazon nincs megoldás: M = ∅.',
    hint: 'A -2 negatív szám, nem tartozik a természetes számok (0, 1, 2, ...) közé!'
  },
  {
    id: 'l2-15',
    question: 'Ha az alaphalmaz U = Z (egész számok), mi a megoldása a 4x - 1 = 6 egyenletnek?',
    options: ['M = {1,75}', 'M = ∅', 'M = {1}', 'M = {2}'],
    correctAnswer: 1,
    explanation: '4x = 7 ⟹ x = 7/4 = 1,75. Mivel a 7/4 tört (nem egész szám, 7/4 ∉ Z), az alaphalmazon nincs gyöke: M = ∅.',
    hint: 'Az 1,75 nem egész szám!'
  },
  {
    id: 'l2-16',
    question: 'Oldd meg az egyenletet: 7(x - 2) - 3(2x - 5) = 4!',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctAnswer: 1,
    explanation: '7x - 14 - 6x + 15 = 4 ⟹ x + 1 = 4 ⟹ x = 3.',
    hint: '-3 · (-5) = +15! Így 7x - 6x = x és -14 + 15 = +1.'
  },
  {
    id: 'l2-17',
    question: 'Mi a megoldása a 2(x + 3) - 5 = 3(x - 1) + 2 egyenletnek?',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctAnswer: 1,
    explanation: '2x + 6 - 5 = 3x - 3 + 2 ⟹ 2x + 1 = 3x - 1 ⟹ 1 = x - 1 ⟹ x = 2.',
    hint: '2x + 1 = 3x - 1.'
  },
  {
    id: 'l2-18',
    question: 'Oldd meg az egyenletet: 5(2x - 3) = 2(3x - 1) + 1!',
    options: ['x = 3', 'x = 3,5', 'x = 4', 'x = 4,5'],
    correctAnswer: 1,
    explanation: '10x - 15 = 6x - 2 + 1 ⟹ 10x - 15 = 6x - 1 ⟹ 4x = 14 ⟹ x = 14/4 = 3,5.',
    hint: '4x = 14 ⟹ x = 3,5.'
  },
  {
    id: 'l2-19',
    question: 'Oldd meg az aránypárként is felfogható egyenletet: (x + 4) / 2 = (2x - 1) / 3!',
    options: ['x = 12', 'x = 14', 'x = 16', 'x = 10'],
    correctAnswer: 1,
    explanation: 'Keresztbe szorzással (vagy 6-tal szorozva): 3(x + 4) = 2(2x - 1) ⟹ 3x + 12 = 4x - 2 ⟹ x = 14.',
    hint: '3 · (x + 4) = 2 · (2x - 1).'
  },
  {
    id: 'l2-20',
    question: 'Hol történt hiba a levezetésben: 3x - (x - 4) = 10 ⟹ 3x - x - 4 = 10 ⟹ 2x - 4 = 10 ⟹ x = 7?',
    options: ['A 2x - 4 = 10 rendezésénél', 'A zárójel felbontásánál: -(x - 4) helyesen -x + 4', 'Az osztásnál (14 : 2)', 'Nincs benne hiba'],
    correctAnswer: 1,
    explanation: 'A zárójel előtt mínuszjel van, így mindkét tag előjele megfordul: -(x - 4) = -x + 4. A helyes egyenlet 2x + 4 = 10 ⟹ x = 3 lett volna.',
    hint: 'A zárójel előtti mínusz a -4-et +4-re változtatja!'
  },
  {
    id: 'l2-21',
    question: 'Mivel kell megszorozni az x / 4 + x / 6 = 5 egyenletet a törtek leggyorsabb eltüntetéséhez?',
    options: ['24-gyel', '12-vel (LKKT)', '10-zel', '4-gyel'],
    correctAnswer: 1,
    explanation: 'A 4 és a 6 legkisebb közös többszöröse a 12. Bár 24-gyel is eltűnnének a törtek, a 12 a legkisebb és legkényelmesebb szorzó.',
    hint: 'A 4 és 6 legkisebb közös többszöröse 12.'
  },
  {
    id: 'l2-22',
    question: 'Mi a megoldása a 4(x - 1) - (x + 2) = 3(x - 2) egyenletnek?',
    options: ['x = 2', 'x = 0', 'M = Q (azonosság)', 'M = ∅'],
    correctAnswer: 2,
    explanation: '4x - 4 - x - 2 = 3x - 6 ⟹ 3x - 6 = 3x - 6. Mindkét oldal azonos, így azonosság: M = Q.',
    hint: '3x - 6 = 3x - 6.'
  },
  {
    id: 'l2-23',
    question: 'Mi a megoldása a 3(2x + 1) - 6x = 5 egyenletnek?',
    options: ['x = 1', 'M = ∅ (ellentmondás)', 'M = Q', 'x = 0'],
    correctAnswer: 1,
    explanation: '6x + 3 - 6x = 5 ⟹ 3 = 5. Ellentmondás, nincs megoldás.',
    hint: '6x - 6x = 0x, és 3 nem egyenlő 5-tel.'
  },
  {
    id: 'l2-24',
    question: 'Oldd meg az egyenletet: (2x + 5) / 3 - 1 = 4!',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    correctAnswer: 1,
    explanation: '(2x + 5) / 3 = 5 ⟹ 2x + 5 = 15 ⟹ 2x = 10 ⟹ x = 5.',
    hint: 'Előbb adj 1-et mindkét oldalhoz: (2x + 5) / 3 = 5.'
  },
  {
    id: 'l2-25',
    question: 'Mi az x értéke: 6 - (2x - 3) = 15?',
    options: ['x = -3', 'x = 3', 'x = -6', 'x = 6'],
    correctAnswer: 0,
    explanation: '6 - 2x + 3 = 15 ⟹ 9 - 2x = 15 ⟹ -2x = 6 ⟹ x = -3.',
    hint: '6 - 2x + 3 = 9 - 2x = 15.'
  },
  {
    id: 'l2-26',
    question: 'Oldd meg az egyenletet: 3x + 2(x - 5) = 4(x + 1) - 6!',
    options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctAnswer: 2,
    explanation: '3x + 2x - 10 = 4x + 4 - 6 ⟹ 5x - 10 = 4x - 2 ⟹ x = 8.',
    hint: '5x - 10 = 4x - 2.'
  },
  {
    id: 'l2-27',
    question: 'Mi az x értéke: 8 - 2(3x - 1) = 22?',
    options: ['x = -2', 'x = 2', 'x = -1', 'x = 1'],
    correctAnswer: 0,
    explanation: '8 - 6x + 2 = 22 ⟹ 10 - 6x = 22 ⟹ -6x = 12 ⟹ x = -2.',
    hint: '10 - 6x = 22 ⟹ -6x = 12.'
  },
  {
    id: 'l2-28',
    question: 'Oldd meg a (3x - 2) / 5 = (x + 6) / 4 egyenletet!',
    options: ['x = 38/7', 'x = 6', 'x = 32/7', 'x = 5'],
    correctAnswer: 0,
    explanation: '4(3x - 2) = 5(x + 6) ⟹ 12x - 8 = 5x + 30 ⟹ 7x = 38 ⟹ x = 38/7.',
    hint: '12x - 8 = 5x + 30 ⟹ 7x = 38.'
  },
  {
    id: 'l2-29',
    question: 'Ha egyenletmegoldás végén 0x = 0 adódik, mit jelent ez?',
    options: ['Csak a 0 a megoldás', 'Nincs megoldás', 'Bármely alaphalmazbeli szám megoldás', 'Hiba történt a számolásban'],
    correctAnswer: 2,
    explanation: 'A 0 · x = 0 egyenlet bármilyen szám esetén igaz kijelentést ad (pl. 0 · 5 = 0), ezért a megoldáshalmaz az egész alaphalmaz (M = U).',
    hint: 'Bármilyen számot szorzol nullával, nullát kapsz!'
  },
  {
    id: 'l2-30',
    question: 'Miért kötelező az eredeti egyenletbe visszahelyettesíteni az ellenőrzéskor?',
    options: ['Mert a rendezett egyenletben elkövetett számolási hibát csak így vehetjük észre', 'Mert a tanár így kéri', 'Mert az egyszerűbb alakban nem működik a behelyettesítés', 'Csak törtes egyenleteknél kötelező'],
    correctAnswer: 0,
    explanation: 'Ha egy rendezési lépésben hibáztunk (pl. elrontottuk az előjelet), de a hibás egyenletbe helyettesítünk vissza, a hiba rejtve marad. Csak az eredeti egyenlet garantálja a valódi ellenőrzést.',
    hint: 'A köztes lépésekben vétett elszámolásokat csak az eredeti feladat szűri ki.'
  }
];

const level3Questions: Question[] = [
  {
    id: 'l3-1',
    question: 'Oldd meg az összetett törtes egyenletet: (3x - 1) / 4 - (x + 2) / 3 = 1!',
    options: ['x = 4,2', 'x = 4,6', 'x = 5', 'x = 4'],
    correctAnswer: 1,
    explanation: 'Szorzunk 12-vel: 3(3x - 1) - 4(x + 2) = 12. Bontás: 9x - 3 - 4x - 8 = 12 ⟹ 5x - 11 = 12 ⟹ 5x = 23 ⟹ x = 23/5 = 4,6.',
    hint: 'Ne felejtsd el a jobb oldali 1-et is megszorozni 12-vel (1 · 12 = 12)!'
  },
  {
    id: 'l3-2',
    question: 'Mi a megoldása a (2x + 3) / 5 - (x - 1) / 2 = 1 / 10 egyenletnek?',
    options: ['x = 8', 'x = 9', 'x = 10', 'x = 11'],
    correctAnswer: 2,
    explanation: 'Szorzunk 10-zel: 2(2x + 3) - 5(x - 1) = 1. Bontás: 4x + 6 - 5x + 5 = 1 ⟹ -x + 11 = 1 ⟹ -x = -10 ⟹ x = 10.',
    hint: '10 · ((2x+3)/5) = 2(2x+3), és -5 · (x - 1) = -5x + 5.'
  },
  {
    id: 'l3-3',
    question: 'Oldd meg az egyenletet: (4x - 3) / 6 - (2x - 1) / 4 = x / 12!',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    correctAnswer: 1,
    explanation: 'Szorzunk 12-vel: 2(4x - 3) - 3(2x - 1) = x. Bontás: 8x - 6 - 6x + 3 = x ⟹ 2x - 3 = x ⟹ x = 3.',
    hint: '8x - 6 - 6x + 3 = x ⟹ 2x - 3 = x.'
  },
  {
    id: 'l3-4',
    question: 'Mi a gyöke az egyenletnek: (x - 1) / 2 - (x - 2) / 3 + (x - 3) / 4 = 2?',
    options: ['x = 6', 'x = 6,2', 'x = 6,5', 'x = 7'],
    correctAnswer: 1,
    explanation: 'LKKT = 12. Szorzunk 12-vel: 6(x - 1) - 4(x - 2) + 3(x - 3) = 24. 6x - 6 - 4x + 8 + 3x - 9 = 24 ⟹ 5x - 7 = 24 ⟹ 5x = 31 ⟹ x = 6,2.',
    hint: '2, 3 és 4 közös nevezője 12. Ügyelj a -4 · (-2) = +8 előjelre!'
  },
  {
    id: 'l3-5',
    question: 'Oldd meg az egyenletet: (5x - 2) / 3 - 2 = (x + 4) / 2!',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: 'Szorzunk 6-tal: 2(5x - 2) - 12 = 3(x + 4). 10x - 4 - 12 = 3x + 12 ⟹ 10x - 16 = 3x + 12 ⟹ 7x = 28 ⟹ x = 4.',
    hint: 'A -2-t is meg kell szorozni 6-tal: -2 · 6 = -12!'
  },
  {
    id: 'l3-6',
    question: 'Mi az x értéke: (3x + 4) / 5 - (2x - 3) / 3 = (x - 1) / 15?',
    options: ['x = 12', 'x = 13', 'x = 14', 'x = 15'],
    correctAnswer: 2,
    explanation: 'Szorzunk 15-tel: 3(3x + 4) - 5(2x - 3) = x - 1. 9x + 12 - 10x + 15 = x - 1 ⟹ -x + 27 = x - 1 ⟹ 2x = 28 ⟹ x = 14.',
    hint: '9x + 12 - 10x + 15 = -x + 27.'
  },
  {
    id: 'l3-7',
    question: 'Mi a megoldása a 2(3x - 1) - 3(2x + 4) = 5(x - 2) - 5x egyenletnek?',
    options: ['x = 0', 'M = ∅ (ellentmondás)', 'M = Q (azonosság)', 'x = 2'],
    correctAnswer: 1,
    explanation: '6x - 2 - 6x - 12 = 5x - 10 - 5x ⟹ -14 = -10. Ez egy lehetetlen ellentmondás, így M = ∅.',
    hint: 'Mindkét oldalon kiesik az x: -14 = -10.'
  },
  {
    id: 'l3-8',
    question: 'Oldd meg az egyenletet: 4(2x - 3) - 2(3x - 4) = 2(x - 2)!',
    options: ['M = Q (azonosság)', 'M = ∅', 'x = 0', 'x = 2'],
    correctAnswer: 0,
    explanation: '8x - 12 - 6x + 8 = 2x - 4 ⟹ 2x - 4 = 2x - 4. Azonosság, minden szám megoldás: M = Q.',
    hint: '2x - 4 = 2x - 4 azonosság.'
  },
  {
    id: 'l3-9',
    question: 'Mi a megoldása a 2(x - 1) / 3 - 3(x + 1) / 4 = (x - 6) / 12 egyenletnek?',
    options: ['x = -5', 'x = -5,5', 'x = -6', 'x = 5,5'],
    correctAnswer: 1,
    explanation: 'Szorzunk 12-vel: 8(x - 1) - 9(x + 1) = x - 6. 8x - 8 - 9x - 9 = x - 6 ⟹ -x - 17 = x - 6 ⟹ 2x = -11 ⟹ x = -5,5.',
    hint: '4 · 2(x - 1) = 8(x - 1) és 3 · 3(x + 1) = 9(x + 1).'
  },
  {
    id: 'l3-10',
    question: 'Ha az alaphalmaz U = Z+ (pozitív egész számok), mi a megoldása a (3x + 1) / 2 - (2x - 5) / 3 = 4 egyenletnek?',
    options: ['M = {2,2}', 'M = {2}', 'M = ∅', 'M = {3}'],
    correctAnswer: 2,
    explanation: 'Szorzunk 6-tal: 3(3x + 1) - 2(2x - 5) = 24. 9x + 3 - 4x + 10 = 24 ⟹ 5x + 13 = 24 ⟹ 5x = 11 ⟹ x = 2,2. Mivel 2,2 ∉ Z+, nincs megoldás: M = ∅.',
    hint: 'A 2,2 tizedestört, nem pozitív egész szám!'
  },
  {
    id: 'l3-11',
    question: 'Oldd meg az egyenletet: (x + 1) / 3 - (x - 1) / 2 = 1 - (x + 3) / 6!',
    options: ['x = 1', 'M = ∅ (ellentmondás)', 'M = Q (azonosság)', 'x = 0'],
    correctAnswer: 1,
    explanation: 'Szorzunk 6-tal: 2(x + 1) - 3(x - 1) = 6 - (x + 3). 2x + 2 - 3x + 3 = 6 - x - 3 ⟹ -x + 5 = -x + 3 ⟹ 5 = 3. Ellentmondás: M = ∅.',
    hint: '-x + 5 = -x + 3 ⟹ 5 = 3 (hamis!).'
  },
  {
    id: 'l3-12',
    question: 'Mi a megoldása az alábbi egyenletnek: 5(2x - 1) - [3x - 2(x - 4)] = 11?',
    options: ['x = 8/3', 'x = 3', 'x = 7/3', 'x = 2'],
    correctAnswer: 0,
    explanation: 'Belső zárójel: 3x - 2x + 8 = x + 8. Egyenlet: 10x - 5 - (x + 8) = 11 ⟹ 9x - 13 = 11 ⟹ 9x = 24 ⟹ x = 24/9 = 8/3 = 2 2/3.',
    hint: 'Előbb a belső zárójelet végezd el: 3x - 2(x - 4) = x + 8.'
  },
  {
    id: 'l3-13',
    question: 'Oldd meg a többszörös zárójeles egyenletet: 3[2x - (x - 1)] = 2[3x - (x + 2)] + 5!',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correctAnswer: 1,
    explanation: 'Bal: 3(x + 1) = 3x + 3. Jobb: 2(2x - 2) + 5 = 4x - 4 + 5 = 4x + 1. Egyenlet: 3x + 3 = 4x + 1 ⟹ x = 2.',
    hint: 'Belső zárójelek: 2x - x + 1 = x + 1 és 3x - x - 2 = 2x - 2.'
  },
  {
    id: 'l3-14',
    question: 'Mi a gyöke az egyenletnek: (x - 2) / 5 - (2x - 3) / 4 = (3 - x) / 2?',
    options: ['x = 5,5', 'x = 5,75', 'x = 6', 'x = 6,25'],
    correctAnswer: 1,
    explanation: 'Szorzunk 20-szal: 4(x - 2) - 5(2x - 3) = 10(3 - x). 4x - 8 - 10x + 15 = 30 - 10x ⟹ -6x + 7 = 30 - 10x ⟹ 4x = 23 ⟹ x = 23/4 = 5,75.',
    hint: 'Közös nevező 20. -6x + 7 = 30 - 10x ⟹ 4x = 23.'
  },
  {
    id: 'l3-15',
    question: 'Oldd meg az egyenletet: (x + 2) / 8 - (x - 1) / 12 = (x + 5) / 24!',
    options: ['M = Q', 'M = ∅', 'x = 3', 'x = 0'],
    correctAnswer: 1,
    explanation: 'Szorzunk 24-gyel: 3(x + 2) - 2(x - 1) = x + 5. 3x + 6 - 2x + 2 = x + 5 ⟹ x + 8 = x + 5 ⟹ 8 = 5. Ellentmondás: M = ∅.',
    hint: 'x + 8 = x + 5 ⟹ 8 = 5 (lehetetlen).'
  },
  {
    id: 'l3-16',
    question: 'Mi a megoldása az egyenletnek: 0,4(x - 3) - 0,2(2x + 1) = 0,1(x - 8)?',
    options: ['x = -6', 'x = 6', 'x = -4', 'x = 4'],
    correctAnswer: 0,
    explanation: 'Szorzunk 10-zel: 4(x - 3) - 2(2x + 1) = x - 8. 4x - 12 - 4x - 2 = x - 8 ⟹ -14 = x - 8 ⟹ x = -6.',
    hint: 'Szorozd be az egész egyenletet 10-zel a tizedesek eltüntetéséhez!'
  },
  {
    id: 'l3-17',
    question: 'Oldd meg az egyenletet: 1,5x - 0,5(4 - 2x) = 2(x + 1) - 5!',
    options: ['x = -1', 'x = -2', 'x = 1', 'x = 2'],
    correctAnswer: 1,
    explanation: '1,5x - 2 + x = 2x + 2 - 5 ⟹ 2,5x - 2 = 2x - 3 ⟹ 0,5x = -1 ⟹ x = -2.',
    hint: '-0,5 · (-2x) = +x. Így a bal oldal 2,5x - 2.'
  },
  {
    id: 'l3-18',
    question: 'Melyik p érték esetén lesz AZONOSSÁG a 3(2x - 4) = 6x + p egyenlet?',
    options: ['p = 12', 'p = -12', 'p = -4', 'p = 0'],
    correctAnswer: 1,
    explanation: 'Bontás: 6x - 12 = 6x + p. Azonosság akkor lesz, ha a két oldal teljesen megegyezik, azaz p = -12.',
    hint: 'A bal oldal 6x - 12. A jobb oldal 6x + p.'
  },
  {
    id: 'l3-19',
    question: 'Melyik k érték esetén NEM LESZ megoldása a 2(kx - 3) = 6x + 5 egyenletnek?',
    options: ['k = 2', 'k = 3', 'k = -3', 'k = 6'],
    correctAnswer: 1,
    explanation: '2kx - 6 = 6x + 5. Ha 2k = 6, azaz k = 3, akkor 6x - 6 = 6x + 5 ⟹ -6 = 5, ami ellentmondás, így nincs megoldás.',
    hint: 'Akkor nincs megoldás, ha az x-ek együtthatója azonos, de a számtagok különbözőek: 2k = 6.'
  },
  {
    id: 'l3-20',
    question: 'Oldd meg a háromtörtes egyenletet: (x + 1) / 2 + (x + 2) / 3 + (x + 3) / 4 = 3!',
    options: ['x = 1', 'x = 2', 'x = 0', 'x = -1'],
    correctAnswer: 0,
    explanation: 'Szorzunk 12-vel: 6(x + 1) + 4(x + 2) + 3(x + 3) = 36. 6x + 6 + 4x + 8 + 3x + 9 = 36 ⟹ 13x + 23 = 36 ⟹ 13x = 13 ⟹ x = 1.',
    hint: '13x + 23 = 36 ⟹ 13x = 13.'
  },
  {
    id: 'l3-21',
    question: 'Mi a megoldása a (2x - 7) / 5 - (3x - 4) / 2 = -(x + 6) / 10 egyenletnek?',
    options: ['x = 1', 'x = 1,2', 'x = 1,5', 'x = 2'],
    correctAnswer: 1,
    explanation: 'Szorzunk 10-zel: 2(2x - 7) - 5(3x - 4) = -(x + 6). 4x - 14 - 15x + 20 = -x - 6 ⟹ -11x + 6 = -x - 6 ⟹ -10x = -12 ⟹ x = 1,2.',
    hint: '-11x + 6 = -x - 6 ⟹ 10x = 12 ⟹ x = 1,2.'
  },
  {
    id: 'l3-22',
    question: 'Oldd meg az egyenletet: 4(x - 2) - 3[x - (2x + 1)] = 2(3x - 1) - 7!',
    options: ['x = -3', 'x = -4', 'x = 4', 'x = 3'],
    correctAnswer: 1,
    explanation: 'Belső: x - 2x - 1 = -x - 1. Bal: 4x - 8 - 3(-x - 1) = 4x - 8 + 3x + 3 = 7x - 5. Jobb: 6x - 2 - 7 = 6x - 9. 7x - 5 = 6x - 9 ⟹ x = -4.',
    hint: '7x - 5 = 6x - 9 ⟹ x = -4.'
  },
  {
    id: 'l3-23',
    question: 'Mi az x értéke: (x - 4) / 3 - (2x - 5) / 6 = 1 / 2 - x / 6?',
    options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    correctAnswer: 1,
    explanation: 'Szorzunk 6-tal: 2(x - 4) - (2x - 5) = 3 - x. 2x - 8 - 2x + 5 = 3 - x ⟹ -3 = 3 - x ⟹ x = 6.',
    hint: '-3 = 3 - x ⟹ x = 6.'
  },
  {
    id: 'l3-24',
    question: 'Ha az (ax + 2) / 3 = 4 egyenlet megoldása x = 5, mennyi az a paraméter értéke?',
    options: ['a = 1', 'a = 2', 'a = 3', 'a = 4'],
    correctAnswer: 1,
    explanation: 'Helyettesítsük be az x = 5-öt: (5a + 2) / 3 = 4 ⟹ 5a + 2 = 12 ⟹ 5a = 10 ⟹ a = 2.',
    hint: 'Helyettesítsd be az x helyére az 5-öt!'
  },
  {
    id: 'l3-25',
    question: 'Mi a megoldása a 3(x - 2) / 2 - 2(x + 3) / 3 = (5x - 30) / 6 egyenletnek?',
    options: ['x = 0', 'M = Q (azonosság)', 'M = ∅', 'x = 6'],
    correctAnswer: 1,
    explanation: 'Szorzunk 6-tal: 9(x - 2) - 4(x + 3) = 5x - 30. 9x - 18 - 4x - 12 = 5x - 30 ⟹ 5x - 30 = 5x - 30. Azonosság: M = Q.',
    hint: '5x - 30 = 5x - 30.'
  },
  {
    id: 'l3-26',
    question: 'Ha U = N, mi a megoldása a (5x - 1) / 4 - (2x + 3) / 3 = (x - 5) / 12 egyenletnek?',
    options: ['M = {5/3}', 'M = {1}', 'M = ∅', 'M = {2}'],
    correctAnswer: 2,
    explanation: 'Szorzunk 12-vel: 3(5x - 1) - 4(2x + 3) = x - 5. 15x - 3 - 8x - 12 = x - 5 ⟹ 7x - 15 = x - 5 ⟹ 6x = 10 ⟹ x = 5/3. Mivel 5/3 ∉ N, nincs megoldás: M = ∅.',
    hint: 'Az 5/3 tört, nem természetes szám!'
  },
  {
    id: 'l3-27',
    question: 'Oldd meg az egyenletet: (4x - 1) / 7 - (2x + 3) / 3 = (x - 5) / 21 - 1!',
    options: ['x = 2/3', 'x = 1/3', 'x = 1', 'x = 3/2'],
    correctAnswer: 0,
    explanation: 'Szorzunk 21-gyel: 3(4x - 1) - 7(2x + 3) = x - 5 - 21. 12x - 3 - 14x - 21 = x - 26 ⟹ -2x - 24 = x - 26 ⟹ 3x = 2 ⟹ x = 2/3.',
    hint: '-2x - 24 = x - 26 ⟹ 3x = 2.'
  },
  {
    id: 'l3-28',
    question: 'Mi a megoldása a 2(x + 1) / 3 - 4 = (x - 2) / 2 - (x - 14) / 6 egyenletnek?',
    options: ['M = Q (azonosság)', 'M = ∅', 'x = 6', 'x = 0'],
    correctAnswer: 0,
    explanation: 'Szorzunk 6-tal: 4(x + 1) - 24 = 3(x - 2) - (x - 14). 4x + 4 - 24 = 3x - 6 - x + 14 ⟹ 4x - 20 = 2x + 8 ⟹ 2x = 28 ⟹ x = 14. Ellenőrzés: 2(15)/3 - 4 = 10 - 4 = 6; (12)/2 - 0 = 6.',
    hint: '4x - 20 = 2x + 8 ⟹ 2x = 28 ⟹ x = 14.'
  },
  {
    id: 'l3-29',
    question: 'Melyik egyenletnek van végtelen sok megoldása a racionális számok halmazán?',
    options: ['3(x - 1) = 3x - 1', '2(2x + 5) = 4x + 10', '5x + 2 = 5x', '4x - 3 = 2(2x - 1)'],
    correctAnswer: 1,
    explanation: 'A 2(2x + 5) = 4x + 10 egyenlet bal oldala felbontva pontosan 4x + 10, így 4x + 10 = 4x + 10 azonosság, aminek végtelen sok megoldása van.',
    hint: 'Keresd azt az egyenletet, amelynek mindkét oldala algebrailag teljesen azonos!'
  },
  {
    id: 'l3-30',
    question: 'Mi a megoldása a 3(x - 2) / 5 - 2 = 2(x + 2) / 3 - (x + 4) / 15 egyenletnek?',
    options: ['x = 0', 'x = 5', 'M = ∅ (ellentmondás)', 'M = Q'],
    correctAnswer: 2,
    explanation: 'Szorzunk 15-tel: 9(x - 2) - 30 = 10(x + 2) - (x + 4). 9x - 18 - 30 = 10x + 20 - x - 4 ⟹ 9x - 48 = 9x + 16 ⟹ -48 = 16. Ellentmondás: M = ∅.',
    hint: '9x - 48 = 9x + 16 ⟹ -48 = 16.'
  }
];

const allQuestions: Question[] = [
  ...level1Questions.map((q) => ({ ...q, level: 1 as const })),
  ...level2Questions.map((q) => ({ ...q, level: 2 as const })),
  ...level3Questions.map((q) => ({ ...q, level: 3 as const }))
];

const levelsConfig = {
  1: {
    level: 1 as const,
    title: '1. Szint: Alapok és 1-2 Lépéses Egyenletek',
    subtitle: 'Egyszerű mérlegelv, összeadás/kivonás, szorzás/osztás',
    range: '1 - 30. feladat',
    focus: 'Alap mérlegelv',
    questions: level1Questions.map((q) => ({ ...q, level: 1 as const }))
  },
  2: {
    level: 2 as const,
    title: '2. Szint: Kétoldali Ismeretlen és Zárójelek',
    subtitle: 'Zárójelfelbontás, negatív szorzók és egyszerű törtek',
    range: '31 - 60. feladat',
    focus: 'Zárójelek & Rendezés',
    questions: level2Questions.map((q) => ({ ...q, level: 2 as const }))
  },
  3: {
    level: 3 as const,
    title: '3. Szint: Összetett Törtes Egyenletek és Speciális Esetek',
    subtitle: 'LKKT közös nevező, azonosságok, ellentmondások és alaphalmaz',
    range: '61 - 90. feladat',
    focus: 'Összetett törtek & Speciális gyökök',
    questions: level3Questions.map((q) => ({ ...q, level: 3 as const }))
  }
};

export const EquationSolveQuiz: React.FC<EquationSolveQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-eq-solve-quiz"
      topicTitle="3. Egyenletek megoldása mérlegelvvel"
      title="Egyenletek megoldása mérlegelvvel - Gyakorló Kvíz"
      subtitle="90 feladat 3 nehézségi szinten: 1-2 lépéses alapok, zárójeles és törtes egyenletek, azonosságok és speciális gyökök"
      badge="GYAKORLÓ KVÍZ"
      themeColor="violet"
      questions={allQuestions}
      levels={levelsConfig}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <EquationSolveMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EquationSolveSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default EquationSolveQuiz;
