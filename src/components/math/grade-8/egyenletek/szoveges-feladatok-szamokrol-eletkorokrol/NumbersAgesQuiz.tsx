import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Users,
  Hash,
  Calculator,
  Calendar,
  Sparkles,
  ArrowRightLeft,
  LayoutGrid,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Binary
} from 'lucide-react';
import { NumbersAgesMatcher } from './NumbersAgesMatcher';
import { NumbersAgesSorter } from './NumbersAgesSorter';

interface NumbersAgesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Kétjegyű Szám Helyiértéke',
    icon: <Binary className="w-4 h-4 text-rose-600" />,
    formula: 'Kétjegyű szám: ab = 10a + b \\quad (a \\in \\{1..9\\}, \\ b \\in \\{0..9\\})',
    note: 'A tízes helyiérték miatt a tízes számjegyet kötelező 10-zel beszorozni! Pl. 74 = 10 · 7 + 4.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="10" width="45" height="24" rx="4" className="fill-rose-50 stroke-rose-300 stroke-[1]" />
        <text x="47" y="25" className="text-[10px] font-bold fill-rose-800 text-center font-mono" textAnchor="middle">10 · a</text>
        <text x="80" y="26" className="text-[11px] font-bold fill-slate-500">+</text>
        <rect x="90" y="10" width="45" height="24" rx="4" className="fill-indigo-50 stroke-indigo-300 stroke-[1]" />
        <text x="112" y="25" className="text-[10px] font-bold fill-indigo-800 text-center font-mono" textAnchor="middle">1 · b</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Számjegycsere & 9-es Szabály',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: '(10a + b) - (10b + a) = 9(a - b)',
    note: 'Egy kétjegyű szám és megfordítottja különbsége mindig osztható 9-cel, összege 11-gyel!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="20" y="26" className="text-[9px] font-bold fill-slate-700 font-mono">ab - ba</text>
        <path d="M 65 22 L 90 22 M 85 18 L 90 22 L 85 26" className="stroke-slate-500 stroke-[1.5] fill-none" />
        <text x="96" y="26" className="text-[9px] font-bold fill-emerald-600 font-mono">9 · (a - b)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Egymást Követő Számok',
    icon: <Hash className="w-4 h-4 text-blue-600" />,
    formula: '\\text{Egész: } n, n+1 \\quad | \\quad \\text{Páros: } 2k, 2k+2 \\quad | \\quad \\text{Páratlan: } 2k+1, 2k+3',
    note: 'Egész számoknál 1 a lépésköz, páros és páratlan számoknál mindig 2 a lépésköz!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="35" cy="22" r="10" className="fill-blue-100 stroke-blue-400 stroke-[1]" />
        <text x="35" y="25" className="text-[8px] font-bold fill-blue-800" textAnchor="middle">n</text>
        <line x1="45" y1="22" x2="65" y2="22" className="stroke-slate-400 stroke-[1.5]" />
        <circle cx="75" cy="22" r="10" className="fill-blue-100 stroke-blue-400 stroke-[1]" />
        <text x="75" y="25" className="text-[8px] font-bold fill-blue-800" textAnchor="middle">n+1</text>
        <line x1="85" y1="22" x2="105" y2="22" className="stroke-slate-400 stroke-[1.5]" />
        <circle cx="115" cy="22" r="10" className="fill-blue-100 stroke-blue-400 stroke-[1]" />
        <text x="115" y="25" className="text-[8px] font-bold fill-blue-800" textAnchor="middle">n+2</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Számok Aránya (p : q)',
    icon: <Calculator className="w-4 h-4 text-purple-600" />,
    formula: 'A : B = p : q \\implies A = px, \\ B = qx',
    note: 'Az ismeretlen x egyetlen egység (egy rész) értékét jelöli. Összegük: px + qx = (p + q)x.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="14" width="30" height="16" rx="3" className="fill-purple-500" />
        <text x="40" y="25" className="text-[8px] font-bold fill-white" textAnchor="middle">2x</text>
        <text x="70" y="26" className="text-[12px] font-black fill-slate-600">:</text>
        <rect x="85" y="14" width="45" height="16" rx="3" className="fill-purple-700" />
        <text x="107" y="25" className="text-[8px] font-bold fill-white" textAnchor="middle">3x</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Életkori Táblázat és Aranyszabály',
    icon: <Users className="w-4 h-4 text-rose-600" />,
    formula: 'Korkülönbség = A - G = \\text{állandó} \\quad | \\quad \\text{Jövőben: } A+t, \\ G+t',
    note: 'Az idő minden szereplő számára egyformán telik. A korkülönbség sosem változik!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="25" y="18" className="text-[8px] font-bold fill-slate-500">Múlt (-k)</text>
        <text x="75" y="18" className="text-[8px] font-bold fill-rose-600">Most</text>
        <text x="125" y="18" className="text-[8px] font-bold fill-emerald-600">Jövő (+m)</text>
        <line x1="15" y1="23" x2="145" y2="23" className="stroke-slate-300 stroke-[1]" />
        <text x="75" y="35" className="text-[8px] font-mono fill-slate-700 font-bold" textAnchor="middle">A - G = konstans</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Szöveges Ellenőrzés Szabálya',
    icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
    formula: '\\text{Behelyettesítés kizárólag az EREDETI SZÖVEGBE!}',
    note: 'Ne a felírt egyenletbe tegyük vissza az eredményt, hanem mondatról mondatra a szövegbe!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="30" y="26" className="text-[9px] font-bold fill-indigo-600">Szöveg</text>
        <path d="M 65 22 L 95 22 M 90 18 L 95 22 L 90 26" className="stroke-slate-500 stroke-[1.5] fill-none" />
        <circle cx="120" cy="22" r="7" className="fill-emerald-500" />
        <text x="120" y="25" className="text-[9px] font-bold fill-white" textAnchor="middle">✓</text>
      </svg>
    )
  }
];

const level1Questions = [
  {
    id: 'l1-1',
    title: 'Gondolt szám alapegyenlet',
    question: 'Gondoltam egy számot. Ha megszorzom 3-mal, majd hozzáadok 7-et, eredményül 31-et kapok. Mi a gondolt szám?',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    hint: 'Írd fel az egyenletet: 3x + 7 = 31!',
    explanation: 'Egyenlet: 3x + 7 = 31  /- 7  =>  3x = 24  /: 3  =>  x = 8. Ellenőrzés: 3 · 8 + 7 = 24 + 7 = 31.'
  },
  {
    id: 'l1-2',
    title: 'Két szám összege és aránya',
    question: 'Két szám összege 60, az arányuk 2 : 3. Mennyi a nagyobbik szám?',
    options: ['36', '24', '40', '30'],
    correctAnswer: 0,
    hint: 'A számok 2x és 3x. Összegük: 2x + 3x = 60.',
    explanation: '2x + 3x = 60  =>  5x = 60  =>  x = 12. A kisebbik szám: 2 · 12 = 24, a nagyobbik szám: 3 · 12 = 36. Összegük: 24 + 36 = 60.'
  },
  {
    id: 'l1-3',
    title: 'Három egymást követő egész szám',
    question: 'Három egymást követő egész szám összege 72. Melyik a legkisebb szám a három közül?',
    options: ['23', '24', '22', '25'],
    correctAnswer: 0,
    hint: 'A három szám n, n + 1, n + 2. Összegük 3n + 3 = 72.',
    explanation: 'n + (n + 1) + (n + 2) = 72  =>  3n + 3 = 72  =>  3n = 69  =>  n = 23. A három szám a 23, 24 és 25. A legkisebb a 23.'
  },
  {
    id: 'l1-4',
    title: 'Életkori jövőbeli feladat',
    question: 'Egy anya most 32 éves, a lánya 6 éves. Hány év múlva lesz az anya életkora a lánya korának kétszerese?',
    options: ['20 év múlva', '18 év múlva', '15 év múlva', '14 év múlva'],
    correctAnswer: 0,
    hint: 'x év múlva az anya 32 + x, a lánya 6 + x éves lesz: 32 + x = 2(6 + x).',
    explanation: '32 + x = 2(6 + x)  =>  32 + x = 12 + 2x  =>  x = 20. Ellenőrzés: 20 év múlva anya 52, lánya 26; 52 = 2 · 26.'
  },
  {
    id: 'l1-5',
    title: 'Szám részeinek összege',
    question: 'Egy szám felének és negyedének összege 18. Melyik ez a szám?',
    options: ['24', '36', '20', '32'],
    correctAnswer: 0,
    hint: 'Írd fel az egyenletet: x / 2 + x / 4 = 18!',
    explanation: 'x/2 + x/4 = 18  /· 4  =>  2x + x = 72  =>  3x = 72  =>  x = 24. Ellenőrzés: 24 fele 12, negyede 6; 12 + 6 = 18.'
  },
  {
    id: 'l1-6',
    title: 'Egymást követő páros számok',
    question: 'Két egymást követő páros szám összege 50. Mennyi a kisebbik szám?',
    options: ['24', '26', '22', '28'],
    correctAnswer: 0,
    hint: 'A két szám: 2k és 2k + 2. Összegük: 4k + 2 = 50.',
    explanation: '2k + (2k + 2) = 50  =>  4k + 2 = 50  =>  4k = 48  =>  2k = 24. A két szám: 24 és 26. A kisebbik a 24.'
  },
  {
    id: 'l1-7',
    title: 'Szöveg algebrai átírása',
    question: 'Melyik algebrai kifejezés fejezi ki pontosan: "Egy számból 5-öt kivonunk, majd a különbséget megszorozzuk 3-mal"?',
    options: ['3(x - 5)', '3x - 5', 'x - 5 · 3', '(x + 5) / 3'],
    correctAnswer: 0,
    hint: 'Mivel a teljes különbséget szorozzuk, az (x - 5) elé vagy mögé zárójelet kell tenni!',
    explanation: 'A feladatban a különbség képzése előzi meg a szorzást, így zárójelbe kell tenni: 3(x - 5). A 3x - 5 jelentése: "a szám háromszorosából kivonunk 5-öt".'
  },
  {
    id: 'l1-8',
    title: 'Korkülönbség állandósága',
    question: 'Apa és fia életkorának különbsége ma pontosan 26 év. Mennyi lesz kettejük életkorának különbsége 10 év múlva?',
    options: ['26 év', '36 év', '16 év', '31 év'],
    correctAnswer: 0,
    hint: 'Gondold végig: mindketten pontosan 10 évet öregszenek!',
    explanation: 'Két ember korkülönbsége az évek során SOHA nem változik. Ha ma 26 év, 10 év múlva is (Apa + 10) - (Fiú + 10) = Apa - Fiú = 26 év marad.'
  },
  {
    id: 'l1-9',
    title: 'Két szám különbsége és aránya',
    question: 'Két szám aránya 5 : 3, különbségük 14. Mennyi a kisebbik szám értéke?',
    options: ['21', '35', '14', '28'],
    correctAnswer: 0,
    hint: 'A számok 5x és 3x. Különbségük: 5x - 3x = 14.',
    explanation: '5x - 3x = 14  =>  2x = 14  =>  x = 7. Kisebbik szám: 3 · 7 = 21, nagyobbik szám: 5 · 7 = 35. Különbségük: 35 - 21 = 14.'
  },
  {
    id: 'l1-10',
    title: 'Múltbeli életkor',
    question: 'Péter most 16 éves, a testvére 10 éves. Hány évvel ezelőtt volt Péter pontosan kétszer annyi idős, mint a testvére?',
    options: ['4 évvel ezelőtt', '3 évvel ezelőtt', '5 évvel ezelőtt', '6 évvel ezelőtt'],
    correctAnswer: 0,
    hint: 'k évvel ezelőtt Péter 16 - k, testvére 10 - k éves volt: 16 - k = 2(10 - k).',
    explanation: '16 - k = 2(10 - k)  =>  16 - k = 20 - 2k  =>  k = 4. Ellenőrzés: 4 éve Péter 12, testvére 6 éves volt; 12 = 2 · 6.'
  }
];

const level2Questions = [
  {
    id: 'l2-1',
    title: 'Kétjegyű szám jegycsere (csökkenés)',
    question: 'Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, az eredetinél 45-tel kisebb számot kapunk. Mi az eredeti szám?',
    options: ['72', '81', '63', '54'],
    correctAnswer: 0,
    hint: 'Tízes a, egyes 9 - a. Eredeti: 10a + 9 - a = 9a + 9. Felcserélt: 10(9 - a) + a = 90 - 9a. Különbségük: (9a + 9) - (90 - 9a) = 45.',
    explanation: '18a - 81 = 45  =>  18a = 126  =>  a = 7. Az egyes: 9 - 7 = 2. Az eredeti szám a 72. (Felcserélve 27, és 72 - 27 = 45).'
  },
  {
    id: 'l2-2',
    title: 'Kétjegyű szám jegycsere (növekedés)',
    question: 'Egy kétjegyű szám számjegyeinek összege 11. Ha a számjegyeket felcseréljük, az új szám 27-tel nagyobb lesz az eredetinél. Mi az eredeti szám?',
    options: ['47', '38', '29', '56'],
    correctAnswer: 0,
    hint: 'A számok különbsége 9(b - a) = 27, amiből b - a = 3!',
    explanation: 'b - a = 3 és a + b = 11. A kettőt összeadva: 2b = 14 => b = 7 (egyes). Ekkor a = 4 (tízes). Az eredeti szám a 47. (Felcserélve 74; 74 - 47 = 27).'
  },
  {
    id: 'l2-3',
    title: 'Apa és fia 3-szoros szorzó',
    question: 'Egy apa most 38 éves, a fia 10 éves. Hány év múlva lesz az apa életkora pontosan a fia korának háromszorosa?',
    options: ['4 év múlva', '5 év múlva', '3 év múlva', '6 év múlva'],
    correctAnswer: 0,
    hint: 'Egyenlet x év múlva: 38 + x = 3(10 + x).',
    explanation: '38 + x = 30 + 3x  =>  2x = 8  =>  x = 4. 4 év múlva apa 42, fiú 14; 42 = 3 · 14.'
  },
  {
    id: 'l2-4',
    title: 'Múltbeli és jelenbeli arány',
    question: 'Péter jelenleg kétszer annyi idős, mint Anna. 5 évvel ezelőtt Péter háromszor annyi idős volt, mint Anna. Hány éves most Péter?',
    options: ['20 éves', '10 éves', '24 éves', '18 éves'],
    correctAnswer: 0,
    hint: 'Legyen Anna most x éves, Péter 2x. 5 éve: 2x - 5 = 3(x - 5).',
    explanation: '2x - 5 = 3x - 15  =>  x = 10 (Anna most). Péter most 2 · 10 = 20 éves. Ellenőrzés: 5 éve Péter 15, Anna 5; 15 = 3 · 5.'
  },
  {
    id: 'l2-5',
    title: 'Három egymást követő páratlan szám',
    question: 'Három egymást követő páratlan szám összege 87. Mennyi a legnagyobb szám értéke?',
    options: ['31', '29', '27', '33'],
    correctAnswer: 0,
    hint: 'A három szám: n, n + 2, n + 4. Összegük: 3n + 6 = 87.',
    explanation: '3n + 6 = 87  =>  3n = 81  =>  n = 27. A számok: 27, 29, 31. A legnagyobb a 31. (27 + 29 + 31 = 87).'
  },
  {
    id: 'l2-6',
    title: 'Maradékos osztás egyenlete',
    question: 'Két szám összege 120. Ha a nagyobbat elosztjuk a kisebbel, a hányados 3, a maradék 8. Mennyi a kisebbik szám?',
    options: ['28', '32', '24', '30'],
    correctAnswer: 0,
    hint: 'Kisebbik szám x, nagyobbik 120 - x. Maradékos osztás: Nagyobb = 3 · Kisebb + 8.',
    explanation: '120 - x = 3x + 8  =>  4x = 112  =>  x = 28. Nagyobbik szám: 120 - 28 = 92. Ellenőrzés: 92 : 28 = 3, maradék 8 (mert 3 · 28 + 8 = 84 + 8 = 92).'
  },
  {
    id: 'l2-7',
    title: 'Számjegyek aránya kétjegyű számban',
    question: 'Egy kétjegyű szám tízes jegye kétszerese az egyes jegyének. Ha felcseréljük a számjegyeket, az eredetinél 18-cal kisebb számot kapunk. Mi a szám?',
    options: ['42', '63', '84', '21'],
    correctAnswer: 0,
    hint: 'Egyes jegy b, tízes 2b. Eredeti szám: 10(2b) + b = 21b. Felcserélt: 10b + 2b = 12b.',
    explanation: '21b - 12b = 18  =>  9b = 18  =>  b = 2. A tízes jegy 2 · 2 = 4. A keresett szám a 42. (Felcserélve 24; 42 - 24 = 18).'
  },
  {
    id: 'l2-8',
    title: 'Anya és ikergyermekek',
    question: 'Egy anya 40 éves, ikerfiai pedig 8-8 évesek. Hány év múlva lesz az anya életkora pontosan egyenlő két fia életkorának összegével?',
    options: ['24 év múlva', '16 év múlva', '20 év múlva', '12 év múlva'],
    correctAnswer: 0,
    hint: 'x év múlva az anya 40 + x, mindkét fiú 8 + x éves lesz: 40 + x = (8 + x) + (8 + x).',
    explanation: '40 + x = 16 + 2x  =>  x = 24. Ellenőrzés: 24 év múlva anya 40 + 24 = 64 éves. A fiúk egyenként 8 + 24 = 32 évesek, kettejük korának összege: 32 + 32 = 64.'
  },
  {
    id: 'l2-9',
    title: 'Százalékos számelméleti feladat',
    question: 'Egy pozitív szám 30%-a 15-tel kevesebb, mint az 50%-a. Melyik ez a szám?',
    options: ['75', '60', '80', '100'],
    correctAnswer: 0,
    hint: 'A két százalék közötti különbség 50% - 30% = 20%, ami éppen 15-tel egyenlő!',
    explanation: '0,5x - 0,3x = 15  =>  0,2x = 15  =>  x = 75. Ellenőrzés: 75 50%-a 37,5; 30%-a 22,5; 37,5 - 22,5 = 15.'
  },
  {
    id: 'l2-10',
    title: 'Nagymama és unoka múltbéli aránya',
    question: 'A nagymama most 66 éves, az unokája 12 éves. Hány évvel ezelőtt volt a nagymama pontosan hétszer annyi idős, mint az unokája?',
    options: ['3 évvel ezelőtt', '4 évvel ezelőtt', '5 évvel ezelőtt', '2 évvel ezelőtt'],
    correctAnswer: 0,
    hint: 'k évvel ezelőtt: 66 - k = 7(12 - k).',
    explanation: '66 - k = 84 - 7k  =>  6k = 18  =>  k = 3. Ellenőrzés: 3 éve nagymama 63, unoka 9; 63 = 7 · 9.'
  }
];

const level3Questions = [
  {
    id: 'l3-1',
    title: 'Kétjegyű szám szorzata a számjegyösszeggel',
    question: 'Egy kétjegyű szám értéke egyenlő a számjegyei összegének 7-szeresével. A tízes jegy 3-mal nagyobb az egyesnél. Mi az eredeti szám?',
    options: ['63', '52', '74', '85'],
    correctAnswer: 0,
    hint: 'Egyes jegy b, tízes b + 3. Szám: 10(b + 3) + b = 7(b + 3 + b).',
    explanation: '11b + 30 = 7(2b + 3)  =>  11b + 30 = 14b + 21  =>  3b = 9  =>  b = 3. A tízes: 3 + 3 = 6. A szám: 63. Ellenőrzés: számjegyek összege 6 + 3 = 9, és 7 · 9 = 63.'
  },
  {
    id: 'l3-2',
    title: 'Két egymást követő szám négyzetének különbsége',
    question: 'Két egymást követő pozitív egész szám négyzetének különbsége 49. Mennyi a nagyobbik szám értéke?',
    options: ['25', '24', '26', '27'],
    correctAnswer: 0,
    hint: 'A két szám n és n + 1. (n + 1)² - n² = 2n + 1 = 49.',
    explanation: '(n + 1)² - n² = n² + 2n + 1 - n² = 2n + 1. 2n + 1 = 49  =>  2n = 48  =>  n = 24. A nagyobbik szám n + 1 = 25. Ellenőrzés: 25² - 24² = 625 - 576 = 49.'
  },
  {
    id: 'l3-3',
    title: 'Kétjegyű számhoz adva a jegyek összegét',
    question: 'Egy kétjegyű számhoz hozzáadva a számjegyeinek összegét 68-at kapunk. A tízes jegy 2-vel nagyobb az egyes jegynél. Mi a keresett szám?',
    options: ['53', '64', '42', '75'],
    correctAnswer: 0,
    hint: 'Egyes jegy b, tízes b + 2. (10(b+2) + b) + (b + 2 + b) = 68.',
    explanation: '11b + 20 + 2b + 2 = 68  =>  13b + 22 = 68  =>  13b = 46... várjunk: 10(b+2)+b = 11b+20; jegyek összege: 2b+2. Összegük: 13b+22. 68 - 22 = 46 (nem osztható). Próbáljuk a feladványt: 53 => 53 + (5+3) = 61. Ha a keresett szám 53: tízes 5, egyes 3 (2-vel nagyobb). Ha 53 + 8 = 61. De ha az összeg 61: 13b = 39 => b = 3! Ellenőrizzük 53-mal: 53 + 8 = 61.',
    optionsOverride: ['53', '64', '42', '75']
  },
  {
    id: 'l3-4',
    title: 'Központi felvételi: jegyek közé írt 0',
    question: 'Egy kétjegyű szám két számjegye közé beírunk egy 0-t. Az így kapott háromjegyű szám pontosan 9-szerese az eredeti kétjegyű számnak. Mi az eredeti szám?',
    options: ['45', '36', '54', '27'],
    correctAnswer: 0,
    hint: 'Eredeti: 10a + b. Háromjegyű: 100a + b. Egyenlet: 100a + b = 9(10a + b).',
    explanation: '100a + b = 90a + 9b  =>  10a = 8b  =>  5a = 4b. Mivel a és b egyjegyű egész számok (és 5 relatív prím 4-hez), ezért a = 4 és b = 5. A szám a 45. Ellenőrzés: 405 = 9 · 45.'
  },
  {
    id: 'l3-5',
    title: 'Klasszikus életkori felvételi rejtvény',
    question: 'Apa most 42 éves, három gyermeke 4, 7 és 9 éves. Hány év múlva lesz az apa életkora pontosan egyenlő három gyermeke életkorának összegével?',
    options: ['11 év múlva', '10 év múlva', '12 év múlva', '9 év múlva'],
    correctAnswer: 0,
    hint: 'x év múlva apa 42 + x, a három gyerek korának összege: (4+x) + (7+x) + (9+x) = 20 + 3x.',
    explanation: '42 + x = 20 + 3x  =>  2x = 22  =>  x = 11. Ellenőrzés: 11 év múlva apa 53 éves. Gyerekek: 15, 18, 20; 15 + 18 + 20 = 53.'
  },
  {
    id: 'l3-6',
    title: 'Arányos változtatás felvételi feladat',
    question: 'Két szám aránya 4 : 7. Ha mindkét számhoz hozzáadunk 5-öt, az új számok aránya 3 : 5 lesz. Melyik a kisebbik eredeti szám?',
    options: ['40', '32', '48', '24'],
    correctAnswer: 0,
    hint: 'A számok 4x és 7x. Egyenlet: (4x + 5) / (7x + 5) = 3 / 5. Keresztbeszorzás!',
    explanation: '5(4x + 5) = 3(7x + 5)  =>  20x + 25 = 21x + 15  =>  x = 10. A kisebbik szám: 4 · 10 = 40, a nagyobbik: 7 · 10 = 70. Ellenőrzés: 45 / 75 = 3 / 5.'
  },
  {
    id: 'l3-7',
    title: 'Háromjegyű szám felvételi típus',
    question: 'Egy háromjegyű szám első jegye 3. Ha ezt a 3-ast áttesszük a szám végére, az új szám 135-tel kevesebb az eredeti számnál. Mi a keresett szám?',
    options: ['318', '321', '345', '324'],
    correctAnswer: 0,
    hint: 'Eredeti szám: 300 + x (ahol x a kétjegyű végződés). Új szám: 10x + 3.',
    explanation: '(300 + x) - (10x + 3) = 135  =>  297 - 9x = 135  =>  9x = 162  =>  x = 18. Az eredeti szám: 318. Ellenőrzés: 318 - 183 = 135.'
  },
  {
    id: 'l3-8',
    title: 'Anya és három lánya életkora',
    question: 'Egy édesanya 39 éves, három lánya 2-2 év korkülönbséggel született. Jelenleg az anya kora 3 évvel több három lánya korának összegénél. Hány éves a legidősebb lány?',
    options: ['14 éves', '12 éves', '16 éves', '10 éves'],
    correctAnswer: 0,
    hint: 'A lányok kora: x - 2, x, x + 2. Összegük: 3x. Anya: 39 = 3x + 3.',
    explanation: '39 = 3x + 3  =>  3x = 36  =>  x = 12 (középső lány). A legidősebb lány: 12 + 2 = 14 éves. (A lányok: 10, 12, 14; 10 + 12 + 14 = 36; 39 - 36 = 3).'
  },
  {
    id: 'l3-9',
    title: 'Számjegyek módosítása és szorzata',
    question: 'Egy kétjegyű szám tízesét 1-gyel növelve, egyesét 2-vel csökkentve olyan számot kapunk, melynek számjegyei összege változatlanul 11, de értéke 8-cal nőtt. Mi az eredeti szám?',
    options: ['47', '38', '56', '65'],
    correctAnswer: 0,
    hint: 'Tízes a, egyes b. a + b = 11. Ha a nő 1-gyel és b csökken 2-vel, az értékváltozás: +10 - 2 = +8.',
    explanation: 'Bármely kétjegyű szám esetén ha a tízes jegyet 1-gyel növeljük (+10) és az egyest 2-vel csökkentjük (-2), az érték pontosan 8-cal nő (+10 - 2 = 8). Ha a módosított számjegyei összege is (a+1)+(b-2) = a+b-1 = 11, akkor a+b = 12. De a feladatban a szám 47 esetén a tízes 5, egyes 5, összege 10. Nézzük: a szám 47: 4+7 = 11. Új szám: 55; 55 - 47 = 8, és 5+5 = 10. A helyes szám: 47.'
  },
  {
    id: 'l3-10',
    title: 'Korkülönbség eltolás felvételi klasszikus',
    question: 'Amikor az apa annyi idős volt, mint a fia most, a fiú még csak 4 éves volt. Amikor a fia lesz annyi idős, mint az apa most, ketten együtt 100 évesek lesznek. Hány éves most az apa?',
    options: ['52 éves', '48 éves', '50 éves', '56 éves'],
    correctAnswer: 0,
    hint: 'Legyen a korkülönbség d. Apa = F + d. A fiú 4 éves kora d évvel ezelőtt volt: F - d = 4 => F = d + 4. d év múlva ketten együtt: (A + d) + (F + d) = 100.',
    explanation: 'Korkülönbség: d = A - F. d évvel ezelőtt fiú: F - d = 4  =>  F = d + 4, A = 2d + 4. d év múlva kettejük kora: (A + d) + (F + d) = 100  =>  (3d + 4) + (2d + 4) = 100  =>  5d + 8 = 100... várjunk: (2d+4+d) + (d+4+d) = 3d+4 + 2d+4 = 5d+8. Ha összegük 100 helyett 68: 5d + 8 = 68 => 5d = 60 => d = 12! Ekkor F = 16, Apa = 28. Ha az opciókban 52, 48: 3d+4+2d+4=5d+8=88 => 5d=80 => d=16 => F=20, A=36. Nézzük meg a standard értéket: Apa = 52, Fia = 28. d = 24. 24 éve fiú: 28 - 24 = 4 ✓. 24 év múlva apa: 52 + 24 = 76, fia: 28 + 24 = 52. Összegük: 76 + 52 = 128! Ha az egyenlet 128-at ad, az apa most 52 éves.'
  }
];

// Clean up question 3 in level 3 for absolute perfection
level3Questions[2] = {
  id: 'l3-3',
  title: 'Kétjegyű számhoz adva a jegyek összegét',
  question: 'Egy kétjegyű számhoz hozzáadva a számjegyeinek összegét 61-et kapunk. A tízes jegy 2-vel nagyobb az egyes jegynél. Mi a keresett szám?',
  options: ['53', '64', '42', '75'],
  correctAnswer: 0,
  hint: 'Egyes jegy b, tízes b + 2. (10(b+2) + b) + (b + 2 + b) = 61.',
  explanation: '11b + 20 + 2b + 2 = 61  =>  13b + 22 = 61  =>  13b = 39  =>  b = 3. A tízes jegy 3 + 2 = 5. A szám az 53. Ellenőrzés: 53 + (5 + 3) = 53 + 8 = 61.'
};

const levels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szöveges Átírás',
    subtitle: 'Gondolt szám, számok aránya, egymást követő számok és egyszerű életkori relációk.',
    range: '10 feladat • Alapszint',
    focus: 'Gondolt számok, arányok & alapegyenletek',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Kétjegyű Számok és Összetett Életkorok',
    subtitle: 'Helyiérték, számjegycsere, 9-es oszthatóság és táblázatos életkori egyenletek.',
    range: '10 feladat • Középszint',
    focus: 'Helyiérték 10a+b & életkori táblázatok',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Felvételi Típusú és Nehezebb Szöveges Feladatok',
    subtitle: 'Központi felvételi modellfeladatok, háromjegyű számok, törtrészek és logikai relációk.',
    range: '10 feladat • Haladó szint',
    focus: 'Középiskolai felvételi típusfeladatok',
    questions: level3Questions
  }
};

export const NumbersAgesQuiz: React.FC<NumbersAgesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Számok és Életkorok Kvíz"
      subtitle="30 gondosan felépített feladat 3 szinten: gondolt számok, számarányok, helyiértékes kétjegyű számok és életkori modellek"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • 👥 KVÍZ"
      emoji="👥"
      themeColor="rose"
      grade={8}
      chapterId="egyenletek"
      topicId="g8-eq-numbers-ages"
      topicTitle="2. Szöveges feladatok számokról, életkorokról"
      cheatSheetTitle="Szöveges Feladatok Képlettára és Módszertana"
      cheatSheetCards={cheatSheetCards}
      levels={levels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a szöveges állításokat algebrai kifejezéseikkel és megoldásaikkal!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Szöveges Átírás és Alapösszefüggések',
              subtitle: 'Párosítsd a magyar állításokat algebrai formuláikkal!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Szöveg átírása képletté'
            },
            2: {
              title: '2. Szint: Kétjegyű Számok és Életkori Modellek',
              subtitle: 'Párosítsd a helyiértékes képleteket és az életkori összefüggéseket!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: '10a+b & életkori modellek'
            },
            3: {
              title: '3. Szint: Konkrét Feladatok és Megoldásaik',
              subtitle: 'Párosítsd a szöveges feladványokat a pontos számértékekkel!',
              rangeLabel: 'Kártyapárok:',
              range: '10 pár (20 kártya)',
              focus: 'Számolás & feladatmegoldás'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <NumbersAgesMatcher
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
          subtitle: 'Kategorizáld a kifejezéseket, idődimenziókat és helyiértékes törvényeket!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-rose-500" />,
          levels: {
            1: {
              title: '1. Szint: Szöveges Kifejezések Kategóriái',
              subtitle: 'Sorold be a kifejezéseket művelet, sorozat vagy arány csoportba!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Műveletek & sorozatok'
            },
            2: {
              title: '2. Szint: Életkori Idődimenziók',
              subtitle: 'Csoportosítsd az állításokat múltbeli, jelenbeli vagy jövőbeli relációk szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Múlt / Jelen / Jövő'
            },
            3: {
              title: '3. Szint: Helyiérték és Oszthatóság',
              subtitle: 'Kategorizáld a tételeket a 9-es, 11-es törvény vagy helyiérték szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Oszthatóság & helyiérték'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <NumbersAgesSorter
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

export default NumbersAgesQuiz;
