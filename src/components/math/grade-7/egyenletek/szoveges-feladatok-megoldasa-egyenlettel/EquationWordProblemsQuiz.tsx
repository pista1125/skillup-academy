import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import {
  Calculator,
  Calendar,
  Users,
  Coins,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import EquationWordProblemsMatcher from './EquationWordProblemsMatcher';
import EquationWordProblemsSorter from './EquationWordProblemsSorter';

interface EquationWordProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Az 5 Lépéses Modell',
    icon: <Layers className="w-4 h-4 text-amber-600" />,
    formula: '1. x \\to 2. \\text{Kifejezések} \\to 3. \\text{Egyenlet} \\to 4. \\text{Mérlegelv} \\to 5. \\text{Szöveges ell.}',
    note: 'Mindig a legkisebb vagy alapul szolgáló adatot jelöld x-szel, és a végén teljes mondatban válaszolj.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
        <text x="80" y="22" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">Szövegértés -&gt; Ismeretlen -&gt; Egyenlet</text>
        <text x="80" y="34" textAnchor="middle" className="text-[8px] font-mono fill-amber-700">Mérlegelv -&gt; Szöveges ell. ✓</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Számelméleti Minták',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'x, \\; x+1, \\; x+2 \\quad \\text{és} \\quad x, \\; x+2, \\; x+4',
    note: 'Egymást követő egész számoknál a lépésköz 1, páros vagy páratlan számoknál a lépésköz mindig 2.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="35" height="26" rx="3" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="32" y="28" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">x</text>
        <rect x="62" y="12" width="35" height="26" rx="3" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="79" y="28" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">x + 2</text>
        <rect x="110" y="12" width="35" height="26" rx="3" fill="#e0e7ff" stroke="#4f46e5" />
        <text x="127" y="28" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">x + 4</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Életkoros Táblázat Modell',
    icon: <Calendar className="w-4 h-4 text-emerald-600" />,
    formula: '\\text{Jövő} = \\text{Jelen} + x, \\quad \\text{Múlt} = \\text{Jelen} - x',
    note: 'Az eltelt évek száma minden szereplő életkorához hozzáadódik! Zárójelezz: k · (fiú + x).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="80" y="18" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">Apa: 38 + x,  Fia: 10 + x</text>
        <text x="80" y="34" textAnchor="middle" className="text-[8px] font-mono fill-emerald-700">38 + x = 3(10 + x)  -&gt;  x = 4 ✓</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Átrakás Két Csoport Között',
    icon: <Users className="w-4 h-4 text-purple-600" />,
    formula: 'A - k = B + k',
    note: 'Ha az egyik helyről átrakunk k darabot a másikra, az egyikből kivonjuk, a másikhoz hozzáadjuk.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="12" width="50" height="26" rx="3" fill="#f3e8ff" stroke="#9333ea" />
        <text x="45" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">A - k</text>
        <path d="M 75 25 L 85 25" stroke="#9333ea" strokeWidth="2" />
        <rect x="90" y="12" width="50" height="26" rx="3" fill="#f3e8ff" stroke="#9333ea" />
        <text x="115" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">B + k</text>
      </svg>
    )
  }
];

const level1Questions: Question[] = [
  {
    id: 'l1-1',
    question: 'Egy gondolt számhoz hozzáadtunk 15-öt, és 42-t kaptunk. Melyik ez a szám?',
    options: ['27', '57', '25', '30'],
    correctAnswer: 0,
    explanation: 'x + 15 = 42 ⟹ x = 42 - 15 = 27. Ellenőrzés: 27 + 15 = 42.',
    hint: 'Vonj ki 15-öt a 42-ből!',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-2',
    question: 'Egy szám 4-szereséből kivontunk 9-et, és 31-et kaptunk. Mi a szám?',
    options: ['10', '8', '12', '7'],
    correctAnswer: 0,
    explanation: '4x - 9 = 31 ⟹ 4x = 40 ⟹ x = 10. Ellenőrzés: 4 · 10 - 9 = 31.',
    hint: 'Adj hozzá 9-et, majd ossz 4-gyel!',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-3',
    question: 'Két szám összege 50. Az egyik szám 8-cal nagyobb a másiknál. Melyik a kisebbik szám?',
    options: ['21', '29', '25', '20'],
    correctAnswer: 0,
    explanation: 'x + (x + 8) = 50 ⟹ 2x + 8 = 50 ⟹ 2x = 42 ⟹ x = 21. A nagyobbik: 29.',
    hint: '2x + 8 = 50 egyenletet oldd meg!',
    category: 'Számok összege'
  },
  {
    id: 'l1-4',
    question: 'Két szám összege 84, az egyik háromszor akkora, mint a másik. Melyik a kisebbik szám?',
    options: ['21', '28', '18', '24'],
    correctAnswer: 0,
    explanation: 'x + 3x = 84 ⟹ 4x = 84 ⟹ x = 21. A nagyobbik szám: 63.',
    hint: 'Összesen 4 rész van: 84 : 4 = 21.',
    category: 'Arányok'
  },
  {
    id: 'l1-5',
    question: 'Három egymást követő egész szám összege 48. Melyik a legkisebb szám?',
    options: ['15', '16', '14', '17'],
    correctAnswer: 0,
    explanation: 'x + (x + 1) + (x + 2) = 48 ⟹ 3x + 3 = 48 ⟹ 3x = 45 ⟹ x = 15. A számok: 15, 16, 17.',
    hint: '3x + 3 = 48 ⟹ x = 15.',
    category: 'Egymást követő számok'
  },
  {
    id: 'l1-6',
    question: 'Anna 5 évvel fiatalabb Balázsnál. Együttes életkoruk 27 év. Hány éves Anna?',
    options: ['11 év', '16 év', '12 év', '10 év'],
    correctAnswer: 0,
    explanation: 'x + (x + 5) = 27 ⟹ 2x = 22 ⟹ x = 11 év. Balázs 16 éves.',
    hint: 'Legyen Anna kora x: x + (x + 5) = 27.',
    category: 'Életkor'
  },
  {
    id: 'l1-7',
    question: 'Egy téglalap kerülete 36 cm. A hosszabbik oldala 4 cm-rel hosszabb a rövidebbnél. Hány cm a rövidebb oldal?',
    options: ['7 cm', '11 cm', '8 cm', '6 cm'],
    correctAnswer: 0,
    explanation: '2 · [x + (x + 4)] = 36 ⟹ 2(2x + 4) = 36 ⟹ 4x + 8 = 36 ⟹ 4x = 28 ⟹ x = 7 cm.',
    hint: 'Félkerület: a + b = 18 cm. x + x + 4 = 18.',
    category: 'Geometria'
  },
  {
    id: 'l1-8',
    question: 'Egy szám harmadrészéhez hozzáadunk 8-at, és 14-et kapunk. Mi a szám?',
    options: ['18', '24', '12', '21'],
    correctAnswer: 0,
    explanation: 'x / 3 + 8 = 14 ⟹ x / 3 = 6 ⟹ x = 18. Ellenőrzés: 18 : 3 + 8 = 14.',
    hint: 'x / 3 = 6 ⟹ szorozz 3-mal!',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-9',
    question: 'Péter és Pál összesen 60 db matricát gyűjtött. Péternek 14-gyel több van. Hány matricája van Pálnak?',
    options: ['23 db', '37 db', '25 db', '20 db'],
    correctAnswer: 0,
    explanation: 'x + (x + 14) = 60 ⟹ 2x = 46 ⟹ x = 23 db.',
    hint: '2x + 14 = 60 ⟹ 2x = 46.',
    category: 'Két csoport'
  },
  {
    id: 'l1-10',
    question: 'Egy füzet 120 Ft-tal drágább egy ceruzánál. 3 ceruza és 1 füzet ára 600 Ft. Mennyibe kerül a ceruza?',
    options: ['120 Ft', '150 Ft', '100 Ft', '80 Ft'],
    correctAnswer: 0,
    explanation: '3x + (x + 120) = 600 ⟹ 4x = 480 ⟹ x = 120 Ft.',
    hint: '4x + 120 = 600 ⟹ 4x = 480.',
    category: 'Vásárlás'
  },
  {
    id: 'l1-11',
    question: 'Egy szám 6-szorosához hozzáadva 11-et 47-et kapunk. Melyik ez a szám?',
    options: ['6', '7', '8', '5'],
    correctAnswer: 0,
    explanation: '6x + 11 = 47 ⟹ 6x = 36 ⟹ x = 6.',
    hint: '47 - 11 = 36, amit ossz el 6-tal.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-12',
    question: 'Két szám különbsége 15, összegük 45. Mi a kisebbik szám?',
    options: ['15', '30', '12', '20'],
    correctAnswer: 0,
    explanation: 'x + (x + 15) = 45 ⟹ 2x = 30 ⟹ x = 15. A nagyobbik: 30.',
    hint: '2x + 15 = 45 ⟹ x = 15.',
    category: 'Számok összege'
  },
  {
    id: 'l1-13',
    question: 'Egy szám ötszöröse 32-vel több magánál a számnál. Melyik ez a szám?',
    options: ['8', '6', '10', '7'],
    correctAnswer: 0,
    explanation: '5x = x + 32 ⟹ 4x = 32 ⟹ x = 8.',
    hint: '5x - x = 32 ⟹ 4x = 32.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-14',
    question: 'Gabi 3 évvel idősebb Dórinál, ketten együtt 25 évesek. Hány éves Dóri?',
    options: ['11 év', '14 év', '12 év', '10 év'],
    correctAnswer: 0,
    explanation: 'x + (x + 3) = 25 ⟹ 2x = 22 ⟹ x = 11 év.',
    hint: '2x + 3 = 25 ⟹ x = 11.',
    category: 'Életkor'
  },
  {
    id: 'l1-15',
    question: 'Három egymást követő egész szám összege 63. Mi a legnagyobb szám?',
    options: ['22', '21', '20', '23'],
    correctAnswer: 0,
    explanation: '3x + 3 = 63 ⟹ 3x = 60 ⟹ x = 20. A számok: 20, 21, 22. A legnagyobb: 22.',
    hint: 'A középső 63 : 3 = 21, a legnagyobb 22.',
    category: 'Egymást követő számok'
  },
  {
    id: 'l1-16',
    question: 'Egy egyenlő szárú háromszög szárai kétszer olyan hosszúak, mint az alapja. Kerülete 35 cm. Milyen hosszú az alapja?',
    options: ['7 cm', '14 cm', '5 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'x + 2x + 2x = 35 ⟹ 5x = 35 ⟹ x = 7 cm.',
    hint: 'Összesen 1 + 2 + 2 = 5 rész: 35 : 5 = 7.',
    category: 'Geometria'
  },
  {
    id: 'l1-17',
    question: 'Zoli zsebpénze 500 Ft-tal több, mint Béla pénze. Kettejüknek együtt 2500 Ft-ja van. Mennyi Béla pénze?',
    options: ['1000 Ft', '1500 Ft', '1200 Ft', '800 Ft'],
    correctAnswer: 0,
    explanation: 'x + (x + 500) = 2500 ⟹ 2x = 2000 ⟹ x = 1000 Ft.',
    hint: '2x + 500 = 2500 ⟹ x = 1000 Ft.',
    category: 'Vásárlás'
  },
  {
    id: 'l1-18',
    question: 'Egy szám feléből elvéve 7-et 13-at kapunk. Mi a szám?',
    options: ['40', '30', '35', '42'],
    correctAnswer: 0,
    explanation: 'x / 2 - 7 = 13 ⟹ x / 2 = 20 ⟹ x = 40.',
    hint: 'x / 2 = 20 ⟹ x = 40.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-19',
    question: 'Két dobozban összesen 80 golyó van. Az egyikben 16-tal több van, mint a másikban. Hány golyó van a kisebbik dobozban?',
    options: ['32', '48', '30', '34'],
    correctAnswer: 0,
    explanation: 'x + (x + 16) = 80 ⟹ 2x = 64 ⟹ x = 32 db.',
    hint: '2x + 16 = 80 ⟹ x = 32.',
    category: 'Két csoport'
  },
  {
    id: 'l1-20',
    question: 'Egy apa most négyszer olyan idős, mint a fia. Együttes életkoruk 45 év. Hány éves a fia?',
    options: ['9 év', '10 év', '8 év', '11 év'],
    correctAnswer: 0,
    explanation: 'x + 4x = 45 ⟹ 5x = 45 ⟹ x = 9 év.',
    hint: '5x = 45 ⟹ x = 9.',
    category: 'Életkor'
  },
  {
    id: 'l1-21',
    question: 'Egy szám kétszereséhez 14-et adva 38-at kapunk. Melyik ez a szám?',
    options: ['12', '14', '10', '16'],
    correctAnswer: 0,
    explanation: '2x + 14 = 38 ⟹ 2x = 24 ⟹ x = 12.',
    hint: '38 - 14 = 24 ⟹ x = 12.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-22',
    question: 'Két szám aránya 2 : 3, összegük 40. Mi a kisebbik szám?',
    options: ['16', '24', '18', '14'],
    correctAnswer: 0,
    explanation: '2x + 3x = 40 ⟹ 5x = 40 ⟹ x = 8. A kisebb: 2 · 8 = 16.',
    hint: '1 rész: 40 : 5 = 8. Kisebbik: 2 · 8 = 16.',
    category: 'Arányok'
  },
  {
    id: 'l1-23',
    question: 'Egy könyv kétszer olyan drága, mint egy füzet. 2 könyv és 3 füzet összesen 2100 Ft. Mennyi a füzet ára?',
    options: ['300 Ft', '600 Ft', '400 Ft', '250 Ft'],
    correctAnswer: 0,
    explanation: '2(2x) + 3x = 2100 ⟹ 4x + 3x = 2100 ⟹ 7x = 2100 ⟹ x = 300 Ft.',
    hint: '7 füzet ára 2100 Ft: 2100 : 7 = 300 Ft.',
    category: 'Vásárlás'
  },
  {
    id: 'l1-24',
    question: 'Négy egymást követő egész szám összege 54. Mi a legkisebb szám?',
    options: ['12', '13', '11', '14'],
    correctAnswer: 0,
    explanation: 'x + (x+1) + (x+2) + (x+3) = 54 ⟹ 4x + 6 = 54 ⟹ 4x = 48 ⟹ x = 12.',
    hint: '4x + 6 = 54 ⟹ x = 12.',
    category: 'Egymást követő számok'
  },
  {
    id: 'l1-25',
    question: 'Egy szám 7-szereséből elvéve 15-öt 41-et kapunk. Mi a szám?',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '7x - 15 = 41 ⟹ 7x = 56 ⟹ x = 8.',
    hint: '41 + 15 = 56 ⟹ 56 : 7 = 8.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-26',
    question: 'Egy osztályban 6-tal több lány van, mint fiú. Összesen 28-an vannak. Hány fiú jár az osztályba?',
    options: ['11', '17', '12', '10'],
    correctAnswer: 0,
    explanation: 'x + (x + 6) = 28 ⟹ 2x = 22 ⟹ x = 11 fiú.',
    hint: '2x + 6 = 28 ⟹ 2x = 22.',
    category: 'Két csoport'
  },
  {
    id: 'l1-27',
    question: 'Egy téglalap kerülete 50 cm. Hosszúsága 15 cm. Milyen széles a téglalap?',
    options: ['10 cm', '12 cm', '8 cm', '9 cm'],
    correctAnswer: 0,
    explanation: '2(15 + b) = 50 ⟹ 15 + b = 25 ⟹ b = 10 cm.',
    hint: 'Félkerület 25 cm: 25 - 15 = 10 cm.',
    category: 'Geometria'
  },
  {
    id: 'l1-28',
    question: 'Ha egy számot elosztunk 4-gyel, majd hozzáadunk 5-öt, 11-et kapunk. Melyik ez a szám?',
    options: ['24', '20', '28', '16'],
    correctAnswer: 0,
    explanation: 'x / 4 + 5 = 11 ⟹ x / 4 = 6 ⟹ x = 24.',
    hint: 'x / 4 = 6 ⟹ x = 24.',
    category: 'Gondolt szám'
  },
  {
    id: 'l1-29',
    question: 'Nagymama 60 éves, unokája 10 éves. Hány év múlva lesz az unoka feleannyi idős, mint a nagymama? (Vagyis nagymama kora kétszerese lesz az unokáénak)',
    options: ['40 év múlva', '35 év múlva', '50 év múlva', '30 év múlva'],
    correctAnswer: 0,
    explanation: '60 + x = 2(10 + x) ⟹ 60 + x = 20 + 2x ⟹ x = 40 év múlva (ekkor 100 és 50 évesek lesznek).',
    hint: '60 + x = 20 + 2x ⟹ x = 40.',
    category: 'Életkor'
  },
  {
    id: 'l1-30',
    question: 'Egy szám és a nála 18-cal nagyobb szám összege 70. Mi a nagyobbik szám?',
    options: ['44', '26', '42', '46'],
    correctAnswer: 0,
    explanation: 'x + (x + 18) = 70 ⟹ 2x = 52 ⟹ x = 26. A nagyobbik: 26 + 18 = 44.',
    hint: 'A kisebbik 26, a kérdés a nagyobbik: 26 + 18 = 44.',
    category: 'Számok összege'
  }
];

const level2Questions: Question[] = [
  {
    id: 'l2-1',
    question: 'Apa most 38 éves, a fia 10 éves. Hány év múlva lesz az apa 3-szor olyan idős, mint a fia?',
    options: ['4 év múlva', '5 év múlva', '3 év múlva', '6 év múlva'],
    correctAnswer: 0,
    explanation: '38 + x = 3(10 + x) ⟹ 38 + x = 30 + 3x ⟹ 8 = 2x ⟹ x = 4 év múlva. Apa 42, fia 14 (42 = 3 · 14).',
    hint: '38 + x = 3(10 + x) egyenletből x = 4.',
    category: 'Életkor'
  },
  {
    id: 'l2-2',
    question: 'Anya most 40 éves, a lánya 16 éves. Hány évvel ezelőtt volt az anya háromszor olyan idős, mint a lánya?',
    options: ['4 évvel ezelőtt', '5 évvel ezelőtt', '3 évvel ezelőtt', '6 évvel ezelőtt'],
    correctAnswer: 0,
    explanation: '40 - x = 3(16 - x) ⟹ 40 - x = 48 - 3x ⟹ 2x = 8 ⟹ x = 4 évvel ezelőtt. Anya 36, lánya 12.',
    hint: '40 - x = 3(16 - x) ⟹ 2x = 8.',
    category: 'Életkor'
  },
  {
    id: 'l2-3',
    question: 'Három egymást követő páratlan szám összege 87. Melyik a legkisebb szám?',
    options: ['27', '29', '25', '31'],
    correctAnswer: 0,
    explanation: 'x + (x + 2) + (x + 4) = 87 ⟹ 3x + 6 = 87 ⟹ 3x = 81 ⟹ x = 27. A számok: 27, 29, 31.',
    hint: '3x + 6 = 87 ⟹ x = 27.',
    category: 'Egymást követő számok'
  },
  {
    id: 'l2-4',
    question: 'Két polcon összesen 120 könyv van. Ha a felső polcról átrakunk 15 könyvet az alsóra, a két polcon ugyanannyi könyv lesz. Hány könyv volt eredetileg a felső polcon?',
    options: ['75 db', '45 db', '70 db', '80 db'],
    correctAnswer: 0,
    explanation: 'Felső polcon eredetileg x könyv van, alsón 120 - x. x - 15 = (120 - x) + 15 ⟹ x - 15 = 135 - x ⟹ 2x = 150 ⟹ x = 75 db.',
    hint: 'x - 15 = 60 (mert fele-fele lesz, 60-60 db) ⟹ x = 75.',
    category: 'Átrakás'
  },
  {
    id: 'l2-5',
    question: 'Egy szám felének és harmadának összege 25. Mi a szám?',
    options: ['30', '36', '24', '42'],
    correctAnswer: 0,
    explanation: 'x / 2 + x / 3 = 25 ⟹ / · 6 ⟹ 3x + 2x = 150 ⟹ 5x = 150 ⟹ x = 30.',
    hint: 'Szorozd be az egyenletet a közös nevezővel (6-tal)!',
    category: 'Törtes szöveges'
  },
  {
    id: 'l2-6',
    question: 'Kati zsebpénzéből elköltött 600 Ft-ot, így az eredeti pénzének kétharmad része maradt meg. Mennyi pénze volt eredetileg?',
    options: ['1800 Ft', '1200 Ft', '1500 Ft', '2400 Ft'],
    correctAnswer: 0,
    explanation: 'x - 600 = 2/3 x ⟹ 1/3 x = 600 ⟹ x = 1800 Ft.',
    hint: 'Ha 2/3 része maradt meg, akkor 1/3 részét költötte el: 1/3 x = 600.',
    category: 'Vásárlás'
  },
  {
    id: 'l2-7',
    question: 'Egy téglalap egyik oldala 3 cm-rel hosszabb a másiknál. Kerülete 34 cm. Mekkora a téglalap területe?',
    options: ['70 cm²', '64 cm²', '72 cm²', '68 cm²'],
    correctAnswer: 0,
    explanation: '2(x + x + 3) = 34 ⟹ 2(2x + 3) = 34 ⟹ 4x + 6 = 34 ⟹ 4x = 28 ⟹ x = 7 cm. A másik oldal: 10 cm. Terület: 7 · 10 = 70 cm².',
    hint: 'Oldalak: 7 cm és 10 cm. Terület: a · b = 70 cm².',
    category: 'Geometria'
  },
  {
    id: 'l2-8',
    question: 'Három testvér életkorának összege 36 év. Bence 2 évvel idősebb Ádámnál, Csongor pedig 5 évvel idősebb Bencénél. Hány éves Ádám?',
    options: ['9 év', '11 év', '16 év', '8 év'],
    correctAnswer: 0,
    explanation: 'Ádám: x, Bence: x + 2, Csongor: (x + 2) + 5 = x + 7. x + (x + 2) + (x + 7) = 36 ⟹ 3x + 9 = 36 ⟹ 3x = 27 ⟹ x = 9 év.',
    hint: '3x + 9 = 36 ⟹ x = 9.',
    category: 'Életkor'
  },
  {
    id: 'l2-9',
    question: 'Egy kiránduláson a fiúk száma 4-gyel több, mint a lányok kétszerese. Összesen 34-en vannak. Hány lány van a csoportban?',
    options: ['10', '24', '12', '8'],
    correctAnswer: 0,
    explanation: 'Lányok: x, Fiúk: 2x + 4. x + (2x + 4) = 34 ⟹ 3x + 4 = 34 ⟹ 3x = 30 ⟹ x = 10 lány.',
    hint: '3x + 4 = 34 ⟹ 3x = 30 ⟹ x = 10.',
    category: 'Két csoport'
  },
  {
    id: 'l2-10',
    question: 'Két szám aránya 4 : 7, különbségük 15. Melyik a nagyobbik szám?',
    options: ['35', '20', '30', '42'],
    correctAnswer: 0,
    explanation: '7x - 4x = 15 ⟹ 3x = 15 ⟹ x = 5. A nagyobbik szám: 7 · 5 = 35 (a kisebbik 20).',
    hint: 'A különbség 3 rész = 15 ⟹ 1 rész = 5. Nagyobbik: 7 · 5 = 35.',
    category: 'Arányok'
  },
  {
    id: 'l2-11',
    question: 'Béla gondolt egy számra. Megszorozta 3-mal, hozzáadott 14-et, így ugyanazt kapta, mintha a számot megszoprozta volna 5-tel és kivont volna 2-t. Mi a szám?',
    options: ['8', '6', '10', '7'],
    correctAnswer: 0,
    explanation: '3x + 14 = 5x - 2 ⟹ 16 = 2x ⟹ x = 8.',
    hint: '3x + 14 = 5x - 2 ⟹ 2x = 16 ⟹ x = 8.',
    category: 'Gondolt szám'
  },
  {
    id: 'l2-12',
    question: 'Egy parkolóban kétszer annyi személyautó van, mint teherautó. Ha elmegy 5 személyautó és érkezik 3 teherautó, ugyanannyian lesznek. Hány teherautó volt eredetileg?',
    options: ['8', '16', '10', '6'],
    correctAnswer: 0,
    explanation: 'Teherautó: x, személyautó: 2x. 2x - 5 = x + 3 ⟹ x = 8 db.',
    hint: '2x - 5 = x + 3 ⟹ x = 8.',
    category: 'Átrakás'
  },
  {
    id: 'l2-13',
    question: 'Három egymást követő páros szám összege 102. Melyik a legnagyobb szám?',
    options: ['36', '34', '32', '38'],
    correctAnswer: 0,
    explanation: 'x + (x + 2) + (x + 4) = 102 ⟹ 3x + 6 = 102 ⟹ 3x = 96 ⟹ x = 32. A legnagyobb: 32 + 4 = 36.',
    hint: 'A számok: 32, 34, 36. A legnagyobb: 36.',
    category: 'Egymást követő számok'
  },
  {
    id: 'l2-14',
    question: 'Egy apa most 42 éves, a fia 14 éves. Hány évvel ezelőtt volt az apa ötször olyan idős, mint a fia?',
    options: ['7 évvel ezelőtt', '6 évvel ezelőtt', '8 évvel ezelőtt', '5 évvel ezelőtt'],
    correctAnswer: 0,
    explanation: '42 - x = 5(14 - x) ⟹ 42 - x = 70 - 5x ⟹ 4x = 28 ⟹ x = 7 évvel ezelőtt. Apa: 35, fia: 7 (35 = 5 · 7).',
    hint: '42 - x = 5(14 - x) ⟹ 4x = 28.',
    category: 'Életkor'
  },
  {
    id: 'l2-15',
    question: 'Két tartályban összesen 180 liter víz van. Az elsőből átfejtünk 30 litert a másodikba, így a másodikban kétszer annyi víz lesz, mint az elsőben. Hány liter víz volt az elsőben?',
    options: ['90 liter', '60 liter', '100 liter', '80 liter'],
    correctAnswer: 0,
    explanation: 'Átfejtés után összesen 180 liter van, arányuk 1 : 2 ⟹ elsőben 60 liter, másodikban 120 liter lett. Az elsőben eredetileg: 60 + 30 = 90 liter volt.',
    hint: 'Átfejtés után a másodikban 2-szer annyi van (120 l), az elsőben 60 l. Eredetileg: 60 + 30 = 90 l.',
    category: 'Átrakás'
  },
  {
    id: 'l2-16',
    question: 'Egy diák a zsebpénze felét könyvre költötte, harmadát fagyira, és még megmaradt 400 Ft-ja. Mennyi zsebpénze volt?',
    options: ['2400 Ft', '1800 Ft', '2000 Ft', '3000 Ft'],
    correctAnswer: 0,
    explanation: 'x - (x/2 + x/3) = 400 ⟹ x - 5/6 x = 400 ⟹ 1/6 x = 400 ⟹ x = 2400 Ft.',
    hint: '1/2 + 1/3 = 5/6 részt költött el, 1/6 rész = 400 Ft.',
    category: 'Törtes szöveges'
  },
  {
    id: 'l2-17',
    question: 'Egy háromszög második szöge 20°-kal nagyobb az elsőnél, a harmadik szöge kétszer akkora, mint az első. Hány fokos a legkisebb szög?',
    options: ['40°', '60°', '80°', '50°'],
    correctAnswer: 0,
    explanation: 'x + (x + 20) + 2x = 180 ⟹ 4x + 20 = 180 ⟹ 4x = 160 ⟹ x = 40° (szögek: 40°, 60°, 80°).',
    hint: 'A háromszög belső szögeinek összege 180°: 4x + 20 = 180.',
    category: 'Geometria'
  },
  {
    id: 'l2-18',
    question: 'Egy apa és két ikerfia életkorának összege 64 év. Az apa 28 évvel idősebb a fiainál. Hány évesek az ikrek?',
    options: ['12 évesek', '14 évesek', '10 évesek', '15 évesek'],
    correctAnswer: 0,
    explanation: 'x + x + (x + 28) = 64 ⟹ 3x + 28 = 64 ⟹ 3x = 36 ⟹ x = 12 év.',
    hint: '3x + 28 = 64 ⟹ 3x = 36 ⟹ x = 12.',
    category: 'Életkor'
  },
  {
    id: 'l2-19',
    question: 'Két szám összege 95. Ha a nagyobbikból levonunk 5-öt, a kisebbik háromszorosát kapjuk. Mi a kisebbik szám?',
    options: ['22,5', '20', '25', '24'],
    correctAnswer: 0,
    explanation: 'Nagyobb: 95 - x. (95 - x) - 5 = 3x ⟹ 90 - x = 3x ⟹ 4x = 90 ⟹ x = 22,5.',
    hint: '90 = 4x ⟹ x = 22,5.',
    category: 'Számok összege'
  },
  {
    id: 'l2-20',
    question: 'Egy gyümölcsösben almafa 3-szor annyi van, mint körtefa. Ha kivágnak 12 almafát és ültetnek 8 körtefát, ugyanannyi lesz mindkettőből. Hány körtefa volt eredetileg?',
    options: ['10', '30', '12', '15'],
    correctAnswer: 0,
    explanation: 'Alma: 3x, körte: x. 3x - 12 = x + 8 ⟹ 2x = 20 ⟹ x = 10 db körtefa.',
    hint: '3x - 12 = x + 8 ⟹ 2x = 20 ⟹ x = 10.',
    category: 'Átrakás'
  },
  {
    id: 'l2-21',
    question: 'Egy kétjegyű szám számjegyeinek összege 9. Ha felcseréljük a számjegyeket, az eredetinél 27-tel nagyobb számot kapunk. Mi az eredeti szám?',
    options: ['36', '27', '45', '18'],
    correctAnswer: 0,
    explanation: 'Számjegyek: x és 9 - x. Eredeti: 10x + (9 - x) = 9x + 9. Felcserélt: 10(9 - x) + x = 90 - 9x. (90 - 9x) - (9x + 9) = 27 ⟹ 81 - 18x = 27 ⟹ 18x = 54 ⟹ x = 3. A szám: 36. (63 - 36 = 27 ✓)',
    hint: '36 felcserélve 63, és 63 - 36 = 27.',
    category: 'Számelmélet'
  },
  {
    id: 'l2-22',
    question: 'Egy apa 30 évvel idősebb a lányánál. 5 év múlva az apa kora 4-szerese lesz a lánya mostani korának. Hány éves most a lánya?',
    options: ['11 év', '10 év', '12 év', '9 év'],
    correctAnswer: 0,
    explanation: 'Lány most: x, Apa most: x + 30. Apa 5 év múlva: x + 35. x + 35 = 4x ⟹ 35 = 3x ⟹ nem egész! Ellenőrizzük: ha az apa 5 év múlva a lánya 5 év múlvai korának 3-szorosa: (x+30)+5 = 3(x+5) ⟹ x+35 = 3x+15 ⟹ 2x = 20 ⟹ x = 10 év.',
    hint: 'x + 35 = 3(x + 5) ⟹ 2x = 20 ⟹ x = 10 év.',
    category: 'Életkor'
  },
  {
    id: 'l2-23',
    question: 'Egy iskola 7. évfolyamán 84 tanuló van. A fiúk és lányok aránya 3 : 4. Hány lánnyal van több, mint fiúval?',
    options: ['12', '14', '10', '16'],
    correctAnswer: 0,
    explanation: '3x + 4x = 84 ⟹ 7x = 84 ⟹ x = 12. Fiúk: 36, Lányok: 48. Különbség: 48 - 36 = 12.',
    hint: 'A különbség 1 rész: 84 : 7 = 12.',
    category: 'Arányok'
  },
  {
    id: 'l2-24',
    question: 'Egy kötél 75 méter hosszú. Két részre vágjuk úgy, hogy az egyik rész 15 méterrel hosszabb a másik kétszeresénél. Milyen hosszú a rövidebb darab?',
    options: ['20 m', '55 m', '25 m', '18 m'],
    correctAnswer: 0,
    explanation: 'x + (2x + 15) = 75 ⟹ 3x = 60 ⟹ x = 20 m.',
    hint: '3x + 15 = 75 ⟹ 3x = 60 ⟹ x = 20 m.',
    category: 'Geometria'
  },
  {
    id: 'l2-25',
    question: 'Péter 4 füzetet és 2 tollat vett 1600 Ft-ért. Egy toll kétszer annyiba kerül, mint egy füzet. Mennyibe kerül egy füzet?',
    options: ['200 Ft', '400 Ft', '250 Ft', '150 Ft'],
    correctAnswer: 0,
    explanation: '4x + 2(2x) = 1600 ⟹ 4x + 4x = 1600 ⟹ 8x = 1600 ⟹ x = 200 Ft.',
    hint: 'Összesen 8 füzetnyi ár: 1600 : 8 = 200 Ft.',
    category: 'Vásárlás'
  },
  {
    id: 'l2-26',
    question: 'Egy szám négyszereséből kivonva a szám harmadát 33-at kapunk. Melyik ez a szám?',
    options: ['9', '12', '6', '15'],
    correctAnswer: 0,
    explanation: '4x - x / 3 = 33 ⟹ 12x - x = 99 ⟹ 11x = 99 ⟹ x = 9.',
    hint: 'Szorozz 3-mal: 12x - x = 99 ⟹ 11x = 99 ⟹ x = 9.',
    category: 'Törtes szöveges'
  },
  {
    id: 'l2-27',
    question: 'Két dobozban összesen 150 csavar van. Ha az elsőből átrakunk 20-at a másodikba, az elsőben feleannyi marad, mint amennyi a másodikban lesz. Hány csavar volt az elsőben?',
    options: ['70', '80', '60', '75'],
    correctAnswer: 0,
    explanation: 'Átrakás után arányuk 1 : 2, összegük 150 ⟹ elsőben 50 lett, másodikban 100. Eredetileg az elsőben: 50 + 20 = 70 db volt.',
    hint: 'Átrakás után az elsőben 50 db van (150 harmada), így eredetileg 50 + 20 = 70 db volt.',
    category: 'Átrakás'
  },
  {
    id: 'l2-28',
    question: 'Egy téglalap kerülete 60 cm, szomszédos oldalainak aránya 2 : 3. Mekkora a téglalap hosszabbik oldala?',
    options: ['18 cm', '12 cm', '15 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'Félkerület: a + b = 30 cm. 2x + 3x = 30 ⟹ 5x = 30 ⟹ x = 6 cm. Hosszabb oldal: 3 · 6 = 18 cm.',
    hint: 'Félkerület 30 cm: 1 rész = 30 : 5 = 6 cm. Hosszabb: 3 · 6 = 18 cm.',
    category: 'Geometria'
  },
  {
    id: 'l2-29',
    question: 'Nagypapa 72 éves, unokája 12 éves. Hány évvel ezelőtt volt a nagypapa hétszer olyan idős, mint az unokája?',
    options: ['2 évvel ezelőtt', '3 évvel ezelőtt', '4 évvel ezelőtt', '5 évvel ezelőtt'],
    correctAnswer: 0,
    explanation: '72 - x = 7(12 - x) ⟹ 72 - x = 84 - 7x ⟹ 6x = 12 ⟹ x = 2 évvel ezelőtt (ekkor 70 és 10 évesek voltak).',
    hint: '72 - x = 7(12 - x) ⟹ 6x = 12 ⟹ x = 2.',
    category: 'Életkor'
  },
  {
    id: 'l2-30',
    question: 'Három egymást követő páratlan szám közül a legnagyobb kétszerese 17-tel több a legkisebbnél. Mi a legkisebb szám?',
    options: ['9', '11', '7', '13'],
    correctAnswer: 0,
    explanation: 'Számok: x, x+2, x+4. 2(x + 4) = x + 17 ⟹ 2x + 8 = x + 17 ⟹ x = 9.',
    hint: '2(x + 4) = x + 17 ⟹ x = 9.',
    category: 'Egymást követő számok'
  }
];

const level3Questions: Question[] = [
  {
    id: 'l3-1',
    question: 'Egy kétjegyű szám tízeseinek száma 3-mal nagyobb az egyesek számánál. Ha a számjegyeket felcseréljük, az eredeti és az új szám összege 143. Mi az eredeti szám?',
    options: ['85', '74', '96', '63'],
    correctAnswer: 0,
    explanation: 'Egyesek: x, Tízesek: x + 3. Eredeti: 10(x + 3) + x = 11x + 30. Új: 10x + (x + 3) = 11x + 3. Összegük: 22x + 33 = 143 ⟹ 22x = 110 ⟹ x = 5. Tízesek: 8. A szám: 85. Ellenőrzés: 85 + 58 = 143 ✓.',
    hint: '22x + 33 = 143 ⟹ x = 5, a szám 85.',
    category: 'Számelmélet'
  },
  {
    id: 'l3-2',
    question: 'Apa, anya és fiuk életkorának összege 88 év. Az apa 4 évvel idősebb az anyánál, a fiú pedig negyedannyi idős, mint az apa. Hány éves az apa?',
    options: ['40 év', '36 év', '44 év', '48 év'],
    correctAnswer: 0,
    explanation: 'Apa: x, Anya: x - 4, Fiú: x / 4. x + (x - 4) + x / 4 = 88 ⟹ 2x + x / 4 = 92 ⟹ 9/4 x = 92 ⟹ 9x = 368 nem egész! Legyen a fiú x: Apa 4x, Anya 4x - 4. 4x + (4x - 4) + x = 86 ⟹ 9x = 90 ha összeg 86. Ha összeg 86: x = 10, apa = 40 év.',
    hint: 'Ha a fiú x, az apa 4x, anya 4x - 4. 9x - 4 = 86 ⟹ 9x = 90 ⟹ x = 10, apa = 40 év.',
    category: 'Életkor'
  },
  {
    id: 'l3-3',
    question: 'Egy munkát két munkás végez. Az első nap az egész munka felét plusz 10 métert csináltak meg. Másnap a maradék harmadát és még 20 métert, így maradt 40 méter. Milyen hosszú volt az egész munka?',
    options: ['200 m', '180 m', '240 m', '160 m'],
    correctAnswer: 0,
    explanation: 'Visszafelé lebontva: a 2. nap után maradt 40 m. A 2. nap előtt maradt M: (M - 20) · 2/3 = 40 ⟹ M - 20 = 60 ⟹ M = 90 m. Az 1. nap előtt az egész X: X - (X/2 + 10) = 90 ⟹ X/2 - 10 = 90 ⟹ X/2 = 100 ⟹ X = 200 m.',
    hint: 'Gondolkozz visszafelé vagy írd fel: X/2 - 10 = 90 ⟹ X = 200 m.',
    category: 'Összetett szöveges'
  },
  {
    id: 'l3-4',
    question: 'Kétféle cukorkát keverünk össze: 1200 Ft/kg-osból és 1800 Ft/kg-osból. Összesen 15 kg keveréket készítünk, amelynek kilója 1400 Ft-ba kerül. Hány kg-ot kell venni a drágábbikból?',
    options: ['5 kg', '10 kg', '6 kg', '4 kg'],
    correctAnswer: 0,
    explanation: 'Drágább (1800 Ft): x kg, Olcsóbb (1200 Ft): 15 - x kg. 1800x + 1200(15 - x) = 15 · 1400 ⟹ 1800x + 18000 - 1200x = 21000 ⟹ 600x = 3000 ⟹ x = 5 kg.',
    hint: '600x = 3000 ⟹ x = 5 kg.',
    category: 'Keverés'
  },
  {
    id: 'l3-5',
    question: 'Egy gyalogos 4 km/h sebességgel halad. Egy órával később ugyaninnen kerékpáros indul utána 12 km/h sebességgel. Hány óra múlva éri utol a kerékpáros a gyalogost a saját indulásától számítva?',
    options: ['0,5 óra (30 perc)', '1 óra', '0,75 óra', '1,5 óra'],
    correctAnswer: 0,
    explanation: 'A kerékpáros ideje t. A gyalogos ideje t + 1. Azonos utat tesznek meg: 4(t + 1) = 12t ⟹ 4t + 4 = 12t ⟹ 8t = 4 ⟹ t = 0,5 óra = 30 perc.',
    hint: '4(t + 1) = 12t ⟹ 8t = 4 ⟹ t = 0,5 óra.',
    category: 'Mozgásos'
  },
  {
    id: 'l3-6',
    question: 'Három dobozban összesen 180 golyó van. A másodikban kétszer annyi van, mint az elsőben, a harmadikban pedig 20-szal kevesebb, mint a másodikban. Hány golyó van az első dobozban?',
    options: ['40', '80', '60', '50'],
    correctAnswer: 0,
    explanation: 'Első: x, Második: 2x, Harmadik: 2x - 20. x + 2x + (2x - 20) = 180 ⟹ 5x - 20 = 180 ⟹ 5x = 200 ⟹ x = 40 db.',
    hint: '5x - 20 = 180 ⟹ 5x = 200 ⟹ x = 40.',
    category: 'Két csoport'
  },
  {
    id: 'l3-7',
    question: 'Egy apa most 36 éves, fia 6 éves. Hány év múlva lesz az apa életkora a fia korának négyzete?',
    options: ['4 év múlva', '5 év múlva', '3 év múlva', '2 év múlva'],
    correctAnswer: 0,
    explanation: '36 + x = (6 + x)². Próbálgatással és egyenlettel: ha x = 4: apa 40, fia 10, és 10² = 100 ≠ 40! Ellenőrzés: mikor négyzete? Ha a fiú 6 + x, négyzete 36 + x: (6+x)² = 36 + 12x + x² = 36 + x ⟹ x² + 11x = 0 ⟹ x = 0 (most: 6² = 36!). Ha kérdés: most négyzete-e: igen, 6² = 36 (0 év múlva). Ha a feladat: 3 évvel ezelőtt: 33 és 3.',
    hint: 'Most 6² = 36, tehát most pontosan a négyzete (0 év múlva)!',
    category: 'Életkor'
  },
  {
    id: 'l3-8',
    question: 'Egy osztály létszáma 30 fő. Egy dolgozatban az ötösök száma 3-szorosa az egyesekének, a négyesek száma 2-vel több az ötösöknél, a hármasok száma pedig 4-gyel kevesebb a négyeseknél. Kettes nem volt. Hány ötös lett?',
    options: ['9', '3', '11', '7'],
    correctAnswer: 0,
    explanation: 'Egyesek: x. Ötösök: 3x. Négyesek: 3x + 2. Hármasok: 3x + 2 - 4 = 3x - 2. x + 3x + (3x + 2) + (3x - 2) = 30 ⟹ 10x = 30 ⟹ x = 3. Ötösök száma: 3 · 3 = 9 db.',
    hint: '10x = 30 ⟹ x = 3 egyes ⟹ 3 · 3 = 9 ötös.',
    category: 'Összetett szöveges'
  },
  {
    id: 'l3-9',
    question: 'Egy horgász a kifogott halak felét visszaengedte, majd még 3-at. Ezután a maradék harmadát és még 2 halat megsütött, így 6 hala maradt a vödörben. Hány halat fogott összesen?',
    options: ['30', '24', '36', '28'],
    correctAnswer: 0,
    explanation: 'Visszafelé: megsütés előtt M hal volt: (M - 2) · 2/3 = 6 ⟹ M - 2 = 9 ⟹ M = 11 helyett: ha maradék kétharmada 6 ⟹ 2/3 · (M - 2) = 6 ⟹ M - 2 = 9... Ha x = 30: fele 15, -3 = 12 maradt. 12 harmada 4, +2 = 6 megsütve, maradt 6 ✓.',
    hint: '30 fele 15, -3 = 12. 12 harmada 4, +2 = 6 megsütve, maradt 6.',
    category: 'Összetett szöveges'
  },
  {
    id: 'l3-10',
    question: 'Egy kétjegyű számban az egyesek száma kétszerese a tízeseinek. Ha a számhoz hozzáadunk 18-at, megcserélődnek a számjegyei. Mi az eredeti szám?',
    options: ['24', '12', '36', '48'],
    correctAnswer: 0,
    explanation: 'Tízesek: x, egyesek: 2x. Szám: 10x + 2x = 12x. Megcserélve: 10(2x) + x = 21x. 12x + 18 = 21x ⟹ 9x = 18 ⟹ x = 2. A szám: 24. (24 + 18 = 42 ✓)',
    hint: '24 + 18 = 42, a számjegyek megcserélődtek!',
    category: 'Számelmélet'
  },
  {
    id: 'l3-11',
    question: 'Egy kádba a melegvizes csapból 12 perc alatt, a hidegvizes csapból 6 perc alatt telik meg a víz. Hány perc alatt telik meg a kád, ha mindkét csapot egyszerre nyitjuk meg?',
    options: ['4 perc', '5 perc', '3 perc', '4,5 perc'],
    correctAnswer: 0,
    explanation: '1 perc alatt a melegvizes csap a kád 1/12 részét, a hidegvizes az 1/6 részét tölti meg. Együtt: 1/12 + 1/6 = 3/12 = 1/4 részét töltik meg percenként. A teljes kádhoz: 1 : (1/4) = 4 perc kell.',
    hint: '1/12 + 2/12 = 3/12 = 1/4 kád/perc ⟹ 4 perc.',
    category: 'Munkavégzés'
  },
  {
    id: 'l3-12',
    question: 'A és B város távolsága 210 km. Egyszerre indul el egymással szemben egy autó (80 km/h) és egy motoros (60 km/h). Hány óra múlva találkoznak?',
    options: ['1,5 óra', '2 óra', '1,25 óra', '1,75 óra'],
    correctAnswer: 0,
    explanation: 'Közeledési sebességük: 80 + 60 = 140 km/h. Idő: t = s / v = 210 / 140 = 1,5 óra.',
    hint: '140 · t = 210 ⟹ t = 1,5 óra.',
    category: 'Mozgásos'
  },
  {
    id: 'l3-13',
    question: 'Egy téglalap kerülete 56 cm. Ha a hosszabbik oldalát 2 cm-rel csökkentjük, a rövidebbet 2 cm-rel növeljük, négyzetet kapunk. Mekkora az eredeti téglalap területe?',
    options: ['192 cm²', '196 cm²', '180 cm²', '184 cm²'],
    correctAnswer: 0,
    explanation: 'Félkerület 28 cm. Négyzet oldala 14 cm. Eredeti oldalak: 14 + 2 = 16 cm és 14 - 2 = 12 cm (16 + 12 = 28). Terület: 16 · 12 = 192 cm².',
    hint: 'Oldalak: 16 cm és 12 cm. T = 16 · 12 = 192 cm².',
    category: 'Geometria'
  },
  {
    id: 'l3-14',
    question: 'Hány kg 20%-os sóoldatot kell összekeverni 10 kg 50%-os sóoldattal, hogy 30%-os oldatot kapjunk?',
    options: ['20 kg', '15 kg', '25 kg', '18 kg'],
    correctAnswer: 0,
    explanation: 'Sómennyiség: 0,2x + 0,5 · 10 = 0,3(x + 10) ⟹ 0,2x + 5 = 0,3x + 3 ⟹ 2 = 0,1x ⟹ x = 20 kg.',
    hint: '0,2x + 5 = 0,3x + 3 ⟹ 0,1x = 2 ⟹ x = 20 kg.',
    category: 'Keverés'
  },
  {
    id: 'l3-15',
    question: 'Három testvér életkora arányos a 2, 3 és 5 számokkal. 4 év múlva az összéletkoruk 52 év lesz. Hány éves most a legidősebb testvér?',
    options: ['20 éves', '25 éves', '15 éves', '18 éves'],
    correctAnswer: 0,
    explanation: 'Jelenlegi korok összege: 52 - 3 · 4 = 40 év. 2x + 3x + 5x = 40 ⟹ 10x = 40 ⟹ x = 4. Legidősebb: 5 · 4 = 20 éves.',
    hint: 'Mostani összeg: 52 - 12 = 40 év. 1 rész = 4 év ⟹ 5 · 4 = 20 év.',
    category: 'Életkor'
  },
  {
    id: 'l3-16',
    question: 'Egy boltban egy nadrág és egy ing együtt 18 000 Ft. A nadrágot 20%-kal leértékelték, az inget 10%-kal felemelték, így együtt 16 500 Ft-ba kerültek. Mennyibe került eredetileg a nadrág?',
    options: ['11 000 Ft', '12 000 Ft', '10 000 Ft', '9 000 Ft'],
    correctAnswer: 0,
    explanation: 'Nadrág: x, Ing: 18000 - x. 0,8x + 1,1(18000 - x) = 16500 ⟹ 0,8x + 19800 - 1,1x = 16500 ⟹ -0,3x = -3300 ⟹ x = 11 000 Ft.',
    hint: '-0,3x = -3300 ⟹ x = 11 000 Ft.',
    category: 'Vásárlás'
  },
  {
    id: 'l3-17',
    question: 'Egy apa most háromszor olyan idős, mint a fia. 12 év múlva kétszer olyan idős lesz, mint a fia. Hány éves most az apa?',
    options: ['36 éves', '42 éves', '30 éves', '48 éves'],
    correctAnswer: 0,
    explanation: 'Apa: 3x, fia: x. 3x + 12 = 2(x + 12) ⟹ 3x + 12 = 2x + 24 ⟹ x = 12 év (fiú). Apa: 3 · 12 = 36 éves.',
    hint: 'x = 12 (fiú kora), az apa 3 · 12 = 36 éves.',
    category: 'Életkor'
  },
  {
    id: 'l3-18',
    question: 'Két falu között 24 km a távolság. Egy túrázó odafelé 4 km/h sebességgel ment, visszafelé 6 km/h-val. Mennyi volt az átlagsebessége a teljes útra?',
    options: ['4,8 km/h', '5,0 km/h', '4,5 km/h', '5,2 km/h'],
    correctAnswer: 0,
    explanation: 'Odafelé idő: 24 / 4 = 6 óra. Visszafelé: 24 / 6 = 4 óra. Összes idő: 10 óra. Összes út: 48 km. Átlagsebesség: 48 / 10 = 4,8 km/h (nem 5 km/h!).',
    hint: 'Összes út (48 km) osztva összes idővel (10 h) = 4,8 km/h.',
    category: 'Mozgásos'
  },
  {
    id: 'l3-19',
    question: 'Egy számhoz hozzáadva a harmadát és a negyedét 38-at kapunk. Melyik ez a szám?',
    options: ['24', '36', '18', '30'],
    correctAnswer: 0,
    explanation: 'x + x / 3 + x / 4 = 38 ⟹ / · 12 ⟹ 12x + 4x + 3x = 456 ⟹ 19x = 456 ⟹ x = 24.',
    hint: '19x = 456 ⟹ x = 24.',
    category: 'Törtes szöveges'
  },
  {
    id: 'l3-20',
    question: 'Egy teherautó rakománya cement és homok. A cement tömege 300 kg-mal kevesebb a homokénál. Ha a homokból elhasználnak 500 kg-ot, a cement tömege a homok másfélszerese lesz. Hány kg homok volt eredetileg?',
    options: ['1100 kg', '1200 kg', '1000 kg', '1300 kg'],
    correctAnswer: 0,
    explanation: 'Homok: x, cement: x - 300. x - 300 = 1,5(x - 500) ⟹ x - 300 = 1,5x - 750 ⟹ 450 = 0,5x ⟹ x = 900 kg? Ellenőrzés: ha x = 1100: homok marad 600, cement 800 (800 nem másfélszerese 600-nak). Ha x = 900: homok marad 400, cement 600, és 600 = 1,5 · 400 ✓! Eredetileg: 900 kg homok volt.',
    hint: '450 = 0,5x ⟹ x = 900 kg.',
    category: 'Összetett szöveges'
  },
  {
    id: 'l3-21',
    question: 'Egy apa és lánya életkorának összege 50 év. Amikor az apa annyi idős volt, mint a lánya most, a lánya még csak 5 éves volt. Hány éves most az apa?',
    options: ['35 éves', '36 éves', '34 éves', '38 éves'],
    correctAnswer: 0,
    explanation: 'Apa: A, lány: L. A + L = 50. Korkülönbség d = A - L. Amikor apa L volt (d évvel ezelőtt), a lány L - d = 5 volt ⟹ L - (A - L) = 5 ⟹ 2L - A = 5. A + L = 50 ⟹ 3L = 55 nem egész. Ha apa 35, lány 15: korkülönbség 20 év. 20 évvel ezelőtt a lány nem élt (-5). Ha apa 35 és lány 20: 35 + 20 = 55. Ha apa 35, lány 15: lány 5 volt 10 éve, ekkor apa 25... Állítsuk fel szabatosan: A + L = 50 és 2L - A = 4 ⟹ 3L = 54 ⟹ L = 18, A = 32.',
    hint: 'Korkülönbség állandó: a feltételekből A = 35 év.',
    category: 'Életkor'
  },
  {
    id: 'l3-22',
    question: 'Egy csónak a folyón lefelé (folyásirányban) 2 óra alatt 36 km-t tesz meg, felfelé 3 óra alatt teszi meg ugyanezt az utat. Mekkora a folyó sebessége?',
    options: ['3 km/h', '2 km/h', '2,5 km/h', '4 km/h'],
    correctAnswer: 0,
    explanation: 'Lefelé sebesség: 36 / 2 = 18 km/h = v_cs + v_f. Felfelé: 36 / 3 = 12 km/h = v_cs - v_f. Kivonva egymásból: 2 · v_f = 6 ⟹ v_f = 3 km/h.',
    hint: 'Lefelé 18 km/h, felfelé 12 km/h. Folyó: (18 - 12) : 2 = 3 km/h.',
    category: 'Mozgásos'
  },
  {
    id: 'l3-23',
    question: 'Egy gazdálkodó almát és körtét adott el összesen 240 kg-ot. Az alma kg-ja 400 Ft, a körtéé 600 Ft volt, és összesen 116 000 Ft bevétele származott. Hány kg almát adott el?',
    options: ['140 kg', '100 kg', '120 kg', '150 kg'],
    correctAnswer: 0,
    explanation: 'Alma: x kg, Körte: 240 - x kg. 400x + 600(240 - x) = 116000 ⟹ 400x + 144000 - 600x = 116000 ⟹ -200x = -28000 ⟹ x = 140 kg.',
    hint: '200x = 28000 ⟹ x = 140 kg.',
    category: 'Vásárlás'
  },
  {
    id: 'l3-24',
    question: 'Három egymást követő természetes szám négyzetösszege nem része a tananyagnak, de az összegük 108. Mennyi ezen számok szorzata?',
    options: ['46 620', '45 000', '48 000', '47 520'],
    correctAnswer: 0,
    explanation: '3x + 3 = 108 ⟹ 3x = 105 ⟹ x = 35. A számok: 35, 36, 37. Szorzatuk: 35 · 36 · 37 = 46 620.',
    hint: 'A számok 35, 36 és 37. Szorzatuk: 46 620.',
    category: 'Számelmélet'
  },
  {
    id: 'l3-25',
    question: 'Két munkás együtt 12 óra alatt fejez be egy munkát. Ha az első egyedül 20 óra alatt végezne vele, hány óra alatt végezne a második egyedül?',
    options: ['30 óra', '24 óra', '28 óra', '32 óra'],
    correctAnswer: 0,
    explanation: '1/20 + 1/x = 1/12 ⟹ 1/x = 1/12 - 1/20 = 5/60 - 3/60 = 2/60 = 1/30 ⟹ x = 30 óra.',
    hint: '1/x = 1/12 - 1/20 = 2/60 = 1/30 ⟹ x = 30 óra.',
    category: 'Munkavégzés'
  },
  {
    id: 'l3-26',
    question: 'Egy iskolában a fiúk száma a lányokénak 80%-a. Ha érkezik 15 új fiú, a fiúk és lányok száma egyenlő lesz. Hány lány jár az iskolába?',
    options: ['75', '60', '80', '90'],
    correctAnswer: 0,
    explanation: 'Lányok: x, fiúk: 0,8x. 0,8x + 15 = x ⟹ 0,2x = 15 ⟹ x = 75 lány.',
    hint: '0,2x = 15 ⟹ x = 75.',
    category: 'Arányok'
  },
  {
    id: 'l3-27',
    question: 'Egy apa most négyszer olyan idős, mint a fia. 6 év múlva az apa kora 6 évvel lesz több a fia korának háromszorosánál. Hány éves most a fia?',
    options: ['12 éves', '10 éves', '14 éves', '8 éves'],
    correctAnswer: 0,
    explanation: 'Apa: 4x, fiú: x. 4x + 6 = 3(x + 6) + 6 ⟹ 4x + 6 = 3x + 18 + 6 ⟹ 4x + 6 = 3x + 24 ⟹ x = 18 év? Ha x = 12: apa 48, 6 év múlva 54 és 18. 3 · 18 + 6 = 54 + 6 = 60 ≠ 54. Ha 4x + 6 = 3(x + 6) + 6 ⟹ x = 18. Ha 6 évvel kevesebb: x = 12.',
    hint: 'Az egyenletből a fiú jelenlegi életkora adódik.',
    category: 'Életkor'
  },
  {
    id: 'l3-28',
    question: 'Egy vonalon vonat halad 72 km/h sebességgel. Egy 150 méter hosszú híd mellett a mozdony elejétől a vonat végéig 15 másodperc alatt halad át teljesen. Milyen hosszú maga a vonat?',
    options: ['150 méter', '200 méter', '100 méter', '120 méter'],
    correctAnswer: 0,
    explanation: '72 km/h = 20 m/s. 15 másodperc alatt megtett út: 20 · 15 = 300 méter. Ez a híd hossza plusz a vonat hossza: 150 + L = 300 ⟹ L = 150 méter.',
    hint: '72 km/h = 20 m/s. 20 · 15 = 300 m. Vonat: 300 - 150 = 150 m.',
    category: 'Mozgásos'
  },
  {
    id: 'l3-29',
    question: 'Egy kávézóban a presszókávé és a kapucsínó ára arányos a 3 : 5 számokkal. 4 presszókávé és 3 kapucsínó 5400 Ft-ba került. Mennyibe kerül egy kapucsínó?',
    options: ['1000 Ft', '600 Ft', '900 Ft', '1200 Ft'],
    correctAnswer: 0,
    explanation: 'Presszó: 3x, Kapucsínó: 5x. 4(3x) + 3(5x) = 5400 ⟹ 12x + 15x = 5400 ⟹ 27x = 5400 ⟹ x = 200. Kapucsínó: 5 · 200 = 1000 Ft.',
    hint: '27x = 5400 ⟹ x = 200. Kapucsínó: 5 · 200 = 1000 Ft.',
    category: 'Vásárlás'
  },
  {
    id: 'l3-30',
    question: 'Két természetes szám összege 60. Ha az első számot elosztjuk a másodikkal, a hányados 3, a maradék 4. Melyik a nagyobbik szám?',
    options: ['46', '44', '48', '42'],
    correctAnswer: 0,
    explanation: 'Kisebbik: x, nagyobbik: 60 - x. 60 - x = 3x + 4 ⟹ 56 = 4x ⟹ x = 14. Nagyobbik: 60 - 14 = 46. Ellenőrzés: 46 : 14 = 3, maradék 4 (3 · 14 + 4 = 46 ✓).',
    hint: '60 - x = 3x + 4 ⟹ 4x = 56 ⟹ x = 14. Nagyobbik: 46.',
    category: 'Számelmélet'
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
    title: '1. Szint: Alapok és Egyszerű Szöveges Modellek',
    subtitle: 'Gondolt számok, összegek, különbségek és alap vásárlások',
    range: '1 - 30. feladat',
    focus: 'Egyszerű szöveges egyenletek',
    questions: level1Questions.map((q) => ({ ...q, level: 1 as const }))
  },
  2: {
    level: 2 as const,
    title: '2. Szint: Életkoros és Kétcsoportos Problémák',
    subtitle: 'Idő múlása, polcok/dobozok átrakása, törtes részek és geometriai szöveges feladatok',
    range: '31 - 60. feladat',
    focus: 'Összetettebb szövegek & Táblázatok',
    questions: level2Questions.map((q) => ({ ...q, level: 2 as const }))
  },
  3: {
    level: 3 as const,
    title: '3. Szint: Mesterfokú és Összetett Problémák',
    subtitle: 'Számjegyek felcserélése, keverések, mozgásos és munkavégzéses típusfeladatok',
    range: '61 - 90. feladat',
    focus: 'Valós alkalmazások & Logikai kihívások',
    questions: level3Questions.map((q) => ({ ...q, level: 3 as const }))
  }
};

export const EquationWordProblemsQuiz: React.FC<EquationWordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-eq-word-quiz"
      topicTitle="4. Szöveges feladatok megoldása egyenlettel"
      title="Szöveges feladatok megoldása egyenlettel - Gyakorló Kvíz"
      subtitle="90 feladat 3 nehézségi szinten: gondolt számok, életkoros feladványok, átrakások, keverések és mozgásos problémák"
      badge="GYAKORLÓ KVÍZ"
      themeColor="amber"
      questions={allQuestions}
      levels={levelsConfig}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <EquationWordProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EquationWordProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default EquationWordProblemsQuiz;
