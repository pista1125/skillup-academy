import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { GeometrySummaryMatcher } from './GeometrySummaryMatcher';
import { GeometrySummarySorter } from './GeometrySummarySorter';

interface GeometrySummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const quizLevels: QuizLevelConfig[] = [
  // 1. SZINT: Alapfogalmak és közvetlen képletalkalmazás
  {
    level: 1,
    title: '1. szint: Alapfogalmak és alapképletek',
    subtitle: 'Szögösszeg, háromszög-egyenlőtlenség, alap terület- és térfogatképletek',
    description: '10 alapozó feladat szemléltető ábrákkal a 7. osztályos geometria törzsanyagából.',
    questions: [
      {
        id: 'q1-1',
        title: 'Háromszög belső szögösszege',
        question: 'Egy háromszög két belső szöge 50° és 70°. Mekkora a harmadik belső szöge?',
        options: ['60°', '70°', '50°', '80°'],
        correctAnswer: '60°',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 45,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="28" y="50" className="text-[7.5px] font-bold fill-amber-800">50°</text>
            <text x="70" y="50" className="text-[7.5px] font-bold fill-amber-800">70°</text>
            <text x="45" y="28" textAnchor="middle" className="text-[8px] font-bold fill-red-600">γ = ?</text>
          </svg>
        ),
        explanation: 'A háromszög belső szögeinek összege mindig 180°: 180° - 50° - 70° = 60°.',
        hint: 'A három belső szög összege pontosan 180°!'
      },
      {
        id: 'q1-2',
        title: 'Háromszög-egyenlőtlenség',
        question: 'Melyik oldalhossz-hármasból szerkeszthető valódi háromszög?',
        options: [
          '3 cm, 4 cm, 5 cm',
          '2 cm, 3 cm, 6 cm',
          '4 cm, 4 cm, 8 cm',
          '1 cm, 2 cm, 5 cm'
        ],
        correctAnswer: '3 cm, 4 cm, 5 cm',
        explanation: 'A háromszög-egyenlőtlenség szerint a két rövidebb oldal összege szigorúan nagyobb kell legyen a leghosszabbnál: 3 + 4 = 7 > 5. A többi esetben (2+3 < 6, 4+4 = 8, 1+2 < 5) nem alkotható háromszög.',
        hint: 'Ellenőrizd: a két rövidebb oldal összege nagyobb-e a leghosszabbnál?'
      },
      {
        id: 'q1-3',
        title: 'Paralelogramma területe',
        question: 'Egy paralelogramma alapja 8 cm, a hozzá tartozó magassága 5 cm. Mekkora a területe?',
        options: ['40 cm²', '20 cm²', '26 cm²', '80 cm²'],
        correctAnswer: '40 cm²',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,50 65,50 80,18 30,18" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <line x1="30" y1="18" x2="30" y2="50" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Hungarian right angle notation: arc + dot */}
            <path d="M 30 42 A 8 8 0 0 1 38 50" fill="none" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="33.5" cy="46.5" r="1.1" fill="#dc2626" />
            <text x="33" y="36" className="text-[7.5px] font-bold fill-red-600">m = 5</text>
            <text x="40" y="60" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 8 cm</text>
          </svg>
        ),
        explanation: 'A paralelogramma területe T = a · m_a = 8 · 5 = 40 cm².',
        hint: 'Használd a T = a · m_a képletet!'
      },
      {
        id: 'q1-4',
        title: 'Háromszög területe',
        question: 'Egy háromszög alapja 12 cm, magassága 6 cm. Mekkora a területe?',
        options: ['36 cm²', '72 cm²', '18 cm²', '24 cm²'],
        correctAnswer: '36 cm²',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 45,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="45" y1="15" x2="45" y2="55" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 45 47 A 8 8 0 0 1 53 55" fill="none" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="48.5" cy="51.5" r="1.1" fill="#dc2626" />
            <text x="48" y="38" className="text-[7.5px] font-bold fill-red-600">m = 6</text>
            <text x="50" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 12 cm</text>
          </svg>
        ),
        explanation: 'A háromszög területe a paralelogramma fele: T = (a · m_a) / 2 = (12 · 6) / 2 = 72 / 2 = 36 cm².',
        hint: 'Ne felejts el osztani 2-vel: T = (a · m) / 2!'
      },
      {
        id: 'q1-5',
        title: 'Trapéz területe',
        question: 'Egy trapéz alapjai a = 10 cm és c = 4 cm, magassága m = 6 cm. Mekkora a területe?',
        options: ['42 cm²', '84 cm²', '60 cm²', '24 cm²'],
        correctAnswer: '42 cm²',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,52 85,52 65,18 35,18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="35" y1="18" x2="35" y2="52" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="14" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c = 4 cm</text>
            <text x="50" y="62" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 10 cm</text>
            <text x="38" y="38" className="text-[7.5px] font-bold fill-red-600">m = 6</text>
          </svg>
        ),
        explanation: 'Középvonal: k = (10 + 4) / 2 = 7 cm. Terület: T = k · m = 7 · 6 = 42 cm².',
        hint: 'A két párhuzamos alap átlagát szorozd a magassággal!'
      },
      {
        id: 'q1-6',
        title: 'Deltoid területe',
        question: 'Egy deltoid átlói 8 cm és 5 cm hosszúak. Mekkora a területe?',
        options: ['20 cm²', '40 cm²', '13 cm²', '26 cm²'],
        correctAnswer: '20 cm²',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="45,10 75,32 45,60 15,32" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <line x1="45" y1="10" x2="45" y2="60" stroke="#9d174d" strokeWidth="1.2" />
            <line x1="15" y1="32" x2="75" y2="32" stroke="#9d174d" strokeWidth="1.2" />
            <text x="48" y="24" className="text-[7.5px] font-bold fill-pink-800">e=8</text>
            <text x="60" y="30" className="text-[7.5px] font-bold fill-pink-800">f=5</text>
          </svg>
        ),
        explanation: 'Mivel a deltoid átlói merőlegesek egymásra: T = (e · f) / 2 = (8 · 5) / 2 = 40 / 2 = 20 cm².',
        hint: 'Merőleges átlók esetén T = (e · f) / 2.'
      },
      {
        id: 'q1-7',
        title: 'Négyszög belső szögösszege',
        question: 'Mennyi bármely konvex négyszög belső szögeinek összege?',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: '360°',
        explanation: 'A négyszög egy átlóval két háromszögre bontható: 2 · 180° = 360°. Képletből: (4 - 2) · 180° = 360°.',
        hint: 'Egy négyszög 2 háromszögre bontható egyetlen csúcsból.'
      },
      {
        id: 'q1-8',
        title: 'Területmérték átváltása',
        question: 'Hány dm²-rel egyenlő 5 m²?',
        options: ['500 dm²', '50 dm²', '5000 dm²', '0,05 dm²'],
        correctAnswer: '500 dm²',
        explanation: 'A területnél 100 a váltószám a szomszédos mértékegységek között: 1 m² = 100 dm², így 5 m² = 5 · 100 = 500 dm².',
        hint: '1 m = 10 dm, ezért 1 m² = 10² = 100 dm².'
      },
      {
        id: 'q1-9',
        title: 'Kocka térfogata',
        question: 'Egy kocka éle 4 cm. Mekkora a térfogata?',
        options: ['64 cm³', '16 cm³', '96 cm³', '48 cm³'],
        correctAnswer: '64 cm³',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <line x1="20" y1="65" x2="40" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <line x1="40" y1="50" x2="75" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <line x1="40" y1="50" x2="40" y2="15" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <polygon points="20,30 40,15 75,15 55,30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="55,30 75,15 75,50 55,65" fill="#93c5fd" fillOpacity="0.7" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="20,30 55,30 55,65 20,65" fill="#bfdbfe" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="50" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 4 cm</text>
          </svg>
        ),
        explanation: 'A kocka térfogata V = a³ = 4³ = 4 · 4 · 4 = 64 cm³.',
        hint: 'Használd a V = a³ képletet!'
      },
      {
        id: 'q1-10',
        title: 'Kocka felszíne',
        question: 'Egy kocka éle 3 cm. Mekkora a felszíne?',
        options: ['54 cm²', '27 cm²', '36 cm²', '18 cm²'],
        correctAnswer: '54 cm²',
        explanation: 'Egy lap területe 3² = 9 cm². A kockának 6 egybevágó lapja van: A = 6 · a² = 6 · 9 = 54 cm².',
        hint: '6 darab 3×3-as négyzetlap alkotja a felszínét: A = 6a².'
      }
    ]
  },

  // 2. SZINT: Összetettebb feladatok és kombinált számítások
  {
    level: 2,
    title: '2. szint: Összetettebb feladatok és alkalmazások',
    subtitle: 'Sokszögek átlói, derékszögű magasságok, hasábok és vetületek',
    description: '10 közepes nehézségű feladat több lépésből álló számításokkal és ábrákkal.',
    questions: [
      {
        id: 'q2-1',
        title: 'Derékszögű háromszög magassága',
        question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm, átfogója 10 cm. Mekkora az átfogóhoz tartozó m_c magasság?',
        options: ['4,8 cm', '5 cm', '4 cm', '3,6 cm'],
        correctAnswer: '4,8 cm',
        figure: (
          <svg viewBox="0 0 100 75" className="w-28 h-20">
            <polygon points="15,55 85,55 15,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <path d="M 15 47 A 8 8 0 0 1 23 55" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <circle cx="19" cy="51" r="1.1" fill="#7c3aed" />
            {/* m_c height line to hypotenuse */}
            <line x1="15" y1="55" x2="43.5" y2="38.7" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="8" y="35" className="text-[7.5px] font-bold fill-slate-700">a=8</text>
            <text x="50" y="65" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">b=6</text>
            <text x="60" y="32" className="text-[7.5px] font-bold fill-slate-700">c=10</text>
            <text x="32" y="44" className="text-[7.5px] font-bold fill-red-600">m_c</text>
          </svg>
        ),
        explanation: 'A terület a befogókból: T = (6 · 8) / 2 = 24 cm². Ugyanez az átfogóból: T = (c · m_c) / 2 ⟹ 24 = (10 · m_c) / 2 ⟹ 48 = 10 · m_c ⟹ m_c = 4,8 cm.',
        hint: 'Számold ki a területet kétféleképpen: a befogókból és az átfogóból!'
      },
      {
        id: 'q2-2',
        title: 'Ötszög átlói',
        question: 'Hány átlója van egy konvex ötszögnek összesen?',
        options: ['5 átló', '10 átló', '2 átló', '8 átló'],
        correctAnswer: '5 átló',
        figure: (
          <svg viewBox="0 0 90 80" className="w-28 h-20">
            {/* Pentagon with star diagonals */}
            <polygon points="45,10 80,35 67,72 23,72 10,35" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="45" y1="10" x2="67" y2="72" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="45" y1="10" x2="23" y2="72" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="80" y1="35" x2="23" y2="72" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="80" y1="35" x2="10" y2="35" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="67" y1="72" x2="10" y2="35" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
            <text x="45" y="45" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">5 átló</text>
          </svg>
        ),
        explanation: 'Az átlók képlete: d = n · (n - 3) / 2 = 5 · (5 - 3) / 2 = 5 · 2 / 2 = 5 átló. (Az ötszög az egyetlen sokszög, amelynek az oldalainak és átlóinak száma megegyezik!)',
        hint: 'Használd a d = n(n-3)/2 képletet!'
      },
      {
        id: 'q2-3',
        title: 'Hatszög belső szögösszege',
        question: 'Mennyi egy konvex hatszög (n = 6) belső szögeinek összege?',
        options: ['720°', '540°', '900°', '1080°'],
        correctAnswer: '720°',
        explanation: 'A belső szögek összege S_n = (n - 2) · 180° = (6 - 2) · 180° = 4 · 180° = 720°.',
        hint: 'Egy hatszög 4 háromszögre bontható: 4 · 180°.'
      },
      {
        id: 'q2-4',
        title: 'Hektár és ár átváltása',
        question: 'Egy 3 hektáros (ha) szántóföld hány ár (a) területű?',
        options: ['300 a', '30 a', '3000 a', '0,03 a'],
        correctAnswer: '300 a',
        explanation: 'A mezőgazdasági területmértékek között a váltószám 100: 1 ha = 100 a, ezért 3 ha = 3 · 100 = 300 a (és ez 30 000 m²).',
        hint: '1 ha = 100 a.'
      },
      {
        id: 'q2-5',
        title: 'Háromoldalú hasáb térfogata',
        question: 'Egy háromoldalú egyenes hasáb alapja derékszögű háromszög, melynek befogói 3 cm és 4 cm. A hasáb testmagassága 10 cm. Mekkora a térfogata?',
        options: ['60 cm³', '120 cm³', '30 cm³', '70 cm³'],
        correctAnswer: '60 cm³',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            {/* Triangular prism 3D */}
            <polygon points="20,25 50,20 30,35" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <polygon points="20,65 50,60 30,75" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.2" />
            <line x1="20" y1="25" x2="20" y2="65" stroke="#2563eb" strokeWidth="1.2" />
            <line x1="50" y1="20" x2="50" y2="60" stroke="#2563eb" strokeWidth="1.2" />
            <line x1="30" y1="35" x2="30" y2="75" stroke="#2563eb" strokeWidth="1.5" />
            <text x="60" y="45" className="text-[7.5px] font-bold fill-slate-700">M = 10</text>
            <text x="32" y="24" className="text-[7px] font-bold fill-blue-700">T_a = 6</text>
          </svg>
        ),
        explanation: 'Az alaplap területe: T_a = (3 · 4) / 2 = 6 cm². A hasáb térfogata: V = T_a · M = 6 · 10 = 60 cm³.',
        hint: 'Először számold ki a derékszögű háromszög területét (T_a = a·b/2), majd szorozd M-mel!'
      },
      {
        id: 'q2-6',
        title: 'Kocka testhálóinak száma',
        question: 'Hány különböző síkbeli hálója létezik a kockának?',
        options: ['11 darab', '6 darab', '8 darab', '16 darab'],
        correctAnswer: '11 darab',
        explanation: 'A kockának pontosan 11 különböző síkba kiteríthető testhálója van.',
        hint: 'A matematika bizonyította: pontosan 11 különböző háló létezik.'
      },
      {
        id: 'q2-7',
        title: 'Rombusz területe átlókból',
        question: 'Egy rombusz átlói 10 cm és 14 cm hosszúak. Mekkora a területe?',
        options: ['70 cm²', '140 cm²', '48 cm²', '35 cm²'],
        correctAnswer: '70 cm²',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="45,8 75,35 45,62 15,35" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <line x1="45" y1="8" x2="45" y2="62" stroke="#047857" strokeWidth="1.2" />
            <line x1="15" y1="35" x2="75" y2="35" stroke="#047857" strokeWidth="1.2" />
            <text x="47" y="22" className="text-[7px] font-bold fill-emerald-800">e=14</text>
            <text x="60" y="32" className="text-[7px] font-bold fill-emerald-800">f=10</text>
          </svg>
        ),
        explanation: 'Mivel a rombusz átlói merőlegesen felezik egymást, területe: T = (e · f) / 2 = (14 · 10) / 2 = 140 / 2 = 70 cm².',
        hint: 'A rombuszra is érvényes a T = (e · f) / 2 átlóképlet!'
      },
      {
        id: 'q2-8',
        title: 'Egyenes henger vetületei',
        question: 'Milyen alakzatokat kapunk egy függőleges tengelyű egyenes körhenger elöl- és felülnézeteként?',
        options: [
          'Elölnézet: téglalap, Felülnézet: kör',
          'Elölnézet: kör, Felülnézet: négyzet',
          'Mindkettő kör',
          'Elölnézet: háromszög, Felülnézet: kör'
        ],
        correctAnswer: 'Elölnézet: téglalap, Felülnézet: kör',
        figure: (
          <svg viewBox="0 0 110 65" className="w-32 h-18">
            <rect x="15" y="12" width="24" height="34" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="27" y="55" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">Elöl: téglalap</text>
            <circle cx="80" cy="29" r="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="80" y="55" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">Felül: kör</text>
          </svg>
        ),
        explanation: 'A hengert szemből nézve téglalap kontúrt látunk, fentről ránézve pedig a kör alakú alapot/fedőlapot.',
        hint: 'Képzelj el egy konzervdobozt szemből és fentről nézve!'
      },
      {
        id: 'q2-9',
        title: 'Trapéz középvonala',
        question: 'Egy trapéz alapjai a = 14 cm és c = 6 cm. Mekkora a trapéz k középvonalának hossza?',
        options: ['10 cm', '8 cm', '12 cm', '20 cm'],
        correctAnswer: '10 cm',
        explanation: 'A középvonal a két párhuzamos alap számtani közepe: k = (a + c) / 2 = (14 + 6) / 2 = 20 / 2 = 10 cm.',
        hint: 'A középvonal a két alap átlaga: k = (a + c) / 2.'
      },
      {
        id: 'q2-10',
        title: 'Köbméter és liter átváltása',
        question: 'Hány liter víz fér el egy 2,5 m³ térfogatú tartályban?',
        options: ['2500 liter', '250 liter', '25 000 liter', '25 liter'],
        correctAnswer: '2500 liter',
        explanation: 'Mivel 1 m³ = 1000 dm³ = 1000 liter, ezért 2,5 m³ = 2,5 · 1000 = 2500 liter.',
        hint: '1 m³ = 1000 dm³ = 1000 liter.'
      }
    ]
  },

  // 3. SZINT: Emelt szintű összefüggések, térszemlélet és az Euler-tétel
  {
    level: 3,
    title: '3. szint: Térszemlélet, Euler-tétel és összetett feladatok',
    subtitle: 'Kocka kifestése, Euler-képlet, hiányzó adatok és valós problémák',
    description: '10 emelt szintű feladat az összefoglaló tudásszint mérésére.',
    questions: [
      {
        id: 'q3-1',
        title: 'Euler-tétel alkalmazása',
        question: 'Egy poliédernek 8 csúcsa és 6 lapja van (kocka). Hány éle van az Euler-tétel alapján?',
        options: ['12 él', '14 él', '10 él', '16 él'],
        correctAnswer: '12 él',
        figure: (
          <svg viewBox="0 0 110 50" className="w-32 h-14">
            <rect x="5" y="5" width="100" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="55" y="24" textAnchor="middle" className="text-[11px] font-black fill-indigo-600">C + L = E + 2</text>
            <text x="55" y="37" textAnchor="middle" className="text-[7px] font-bold fill-slate-600">8 + 6 = E + 2 ⟹ E = 12</text>
          </svg>
        ),
        explanation: 'Euler-tételből: C + L = E + 2 ⟹ 8 + 6 = E + 2 ⟹ 14 = E + 2 ⟹ E = 12 él.',
        hint: '8 + 6 = 14, ebből vonj ki 2-t!'
      },
      {
        id: 'q3-2',
        title: 'Oktaéder adatai',
        question: 'Egy szabályos oktaédernek 6 csúcsa és 8 háromszöglapja van. Hány éle van az oktaédernek?',
        options: ['12 él', '14 él', '10 él', '16 él'],
        correctAnswer: '12 él',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <line x1="45" y1="10" x2="45" y2="30" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <polygon points="45,10 20,38 45,46" fill="#c7d2fe" fillOpacity="0.6" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,10 70,38 45,46" fill="#a5b4fc" fillOpacity="0.7" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,64 20,38 45,46" fill="#818cf8" fillOpacity="0.6" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,64 70,38 45,46" fill="#6366f1" fillOpacity="0.7" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="45" y="72" textAnchor="middle" className="text-[7px] font-bold fill-indigo-900">Oktaéder: C=6, L=8</text>
          </svg>
        ),
        explanation: 'C + L = E + 2 ⟹ 6 + 8 = E + 2 ⟹ 14 = E + 2 ⟹ E = 12 él.',
        hint: '6 csúcs + 8 lap = 14 = E + 2 ⟹ E = 12.'
      },
      {
        id: 'q3-3',
        title: 'Akvárium vízszintemelkedése',
        question: 'Egy téglatest alakú akvárium alaplapja 50 cm × 30 cm. Ha 6 liter vizet öntünk bele, hány cm-rel emelkedik meg a vízszint?',
        options: ['4 cm', '2 cm', '6 cm', '5 cm'],
        correctAnswer: '4 cm',
        figure: (
          <svg viewBox="0 0 100 75" className="w-28 h-20">
            <rect x="20" y="25" width="50" height="35" fill="#eff6ff" fillOpacity="0.6" stroke="#3b82f6" strokeWidth="1.2" />
            <rect x="20" y="45" width="50" height="15" fill="#93c5fd" fillOpacity="0.8" stroke="#1d4ed8" strokeWidth="1.2" />
            <text x="45" y="70" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">50 × 30 cm</text>
            <text x="75" y="53" className="text-[7px] font-bold fill-blue-700">Δm = 4 cm</text>
          </svg>
        ),
        explanation: '6 liter = 6 dm³ = 6000 cm³. Az alapterület: T_a = 50 · 30 = 1500 cm². A vízszint emelkedése: Δm = V / T_a = 6000 / 1500 = 4 cm.',
        hint: 'Váltsd át a 6 litert cm³-be (6000 cm³), és oszd el az alapterülettel (1500 cm²)!'
      },
      {
        id: 'q3-4',
        title: '3×3×3-as kifestett kocka',
        question: 'Egy 3×3×3-as méretű kockát kívülről pirosra festünk, majd 27 darab 1×1×1-es kiskockára vágunk. Hány kiskockának lesz pontosan 2 lapja piros?',
        options: ['12 darabnak', '8 darabnak', '6 darabnak', '1 darabnak'],
        correctAnswer: '12 darabnak',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="15,45 45,45 60,30 30,30" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <polygon points="15,20 45,20 60,5 30,5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <polygon points="15,20 45,20 45,45 15,45" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
            <polygon points="45,20 60,5 60,30 45,45" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
            <line x1="25" y1="20" x2="25" y2="45" stroke="#2563eb" strokeWidth="0.8" />
            <line x1="35" y1="20" x2="35" y2="45" stroke="#2563eb" strokeWidth="0.8" />
            <text x="37" y="58" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">12 élközép</text>
          </svg>
        ),
        explanation: 'Pontosan 2 lapja a kocka élein lévő (de nem sarok!) kockáknak van festve. Mivel a kockának 12 éle van, és mindegyik él közepén 1 ilyen kiskocka található: 12 · 1 = 12 darab.',
        hint: 'Gondolj a kocka 12 élére! Az élek közepén lévő kockáknak 2 lapja érintkezik a külvilággal.'
      },
      {
        id: 'q3-5',
        title: 'Átlók számából oldalszám',
        question: 'Egy konvex sokszögnek 20 átlója van. Hány oldala van ennek a sokszögnek?',
        options: ['8 oldal (nyolcszög)', '6 oldal', '10 oldal', '7 oldal'],
        correctAnswer: '8 oldal (nyolcszög)',
        explanation: 'Képletből: n · (n - 3) / 2 = 20 ⟹ n · (n - 3) = 40. Mivel 8 · 5 = 40, így n = 8 (nyolcszög).',
        hint: 'n · (n - 3) = 40. Két olyan szám, melyek különbsége 3, szorzatuk 40!'
      },
      {
        id: 'q3-6',
        title: 'Szabályos tízszög belső szöge',
        question: 'Mekkora egy szabályos tízszög (n = 10) egyetlen belső szöge?',
        options: ['144°', '135°', '150°', '120°'],
        correctAnswer: '144°',
        explanation: 'A belső szögek összege: (10 - 2) · 180° = 8 · 180° = 1440°. Egy belső szög: 1440° / 10 = 144°. (Vagy külső szögből: 360° / 10 = 36°, így belső szög: 180° - 36° = 144°).',
        hint: 'Külső szög = 360° / 10 = 36°, belső szög = 180° - 36° = 144°.'
      },
      {
        id: 'q3-7',
        title: 'Négyzetes hasáb teljes felszíne',
        question: 'Egy négyzet alapú egyenes hasáb alapéle a = 5 cm, testmagassága M = 12 cm. Mekkora a teljes felszíne?',
        options: ['290 cm²', '240 cm²', '300 cm²', '50 cm²'],
        correctAnswer: '290 cm²',
        figure: (
          <svg viewBox="0 0 90 80" className="w-28 h-20">
            <polygon points="20,15 45,15 55,5 30,5" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="20,65 45,65 55,55 30,55" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <line x1="20" y1="15" x2="20" y2="65" stroke="#d97706" strokeWidth="1.2" />
            <line x1="45" y1="15" x2="45" y2="65" stroke="#d97706" strokeWidth="1.2" />
            <line x1="55" y1="5" x2="55" y2="55" stroke="#d97706" strokeWidth="1.2" />
            <text x="60" y="40" className="text-[7.5px] font-bold fill-slate-700">M = 12</text>
            <text x="32" y="73" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 5</text>
          </svg>
        ),
        explanation: 'Alaplapok: 2 · T_a = 2 · 5² = 2 · 25 = 50 cm². Palást: 4 egyforma téglalap: T_p = 4 · (5 · 12) = 240 cm². Felszín: A = 50 + 240 = 290 cm².',
        hint: 'A = 2 · T_a + T_p = 2 · 25 + 4 · (5 · 12)!'
      },
      {
        id: 'q3-8',
        title: 'Tetraéder és Euler-tétel',
        question: 'Szabályos tetraéderre (C = 4, L = 4, E = 6) mennyi a C + L összege?',
        options: ['8', '6', '10', '12'],
        correctAnswer: '8',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="45,12 18,55 50,65" fill="#fed7aa" fillOpacity="0.6" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="45,12 50,65 72,50" fill="#f97316" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="18" y1="55" x2="72" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="45" cy="12" r="2" fill="#c2410c" />
            <text x="45" y="72" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">C=4, L=4, E=6</text>
          </svg>
        ),
        explanation: 'C + L = 4 + 4 = 8. És az élek száma plusz 2: E + 2 = 6 + 2 = 8. Az Euler-tétel tökéletesen teljesül.',
        hint: 'Csúcsok száma 4, lapok száma 4: 4 + 4 = 8.'
      },
      {
        id: 'q3-9',
        title: 'Kocka élének kétszerezése',
        question: 'Ha egy kocka élét a 2-szeresére növeljük (a ⟶ 2a), hányszorosára növekszik a térfogata?',
        options: ['8-szorosára', '4-szeresére', '2-szeresére', '16-szorosára'],
        correctAnswer: '8-szorosára',
        explanation: 'A térfogat a harmadik hatvánnyal arányos: V = (2a)³ = 8 · a³ = 8 · V. Tehát a térfogat 8-szorosára nő!',
        hint: 'Térfogatnál a harmadik hatványra emeljük a méretarányt: 2³ = 8.'
      },
      {
        id: 'q3-10',
        title: 'Ötoldalú hasáb élei',
        question: 'Hány éle van egy ötoldalú egyenes hasábnak összesen?',
        options: ['15 él', '10 él', '12 él', '20 él'],
        correctAnswer: '15 él',
        explanation: 'Hasábnál az élek száma E = 3 · n: 5 alsó alapél + 5 felső alapél + 5 összekötő oldalél = 3 · 5 = 15 él.',
        hint: '5 alul, 5 felül, 5 függőlegesen: 3 · 5 = 15 él.'
      }
    ]
  }
];

const cheatSheetCards = [
  {
    title: 'Síkidomok területe',
    formula: 'T_△ = (a·m)/2 • T_paral = a·m',
    explanation: 'Trapéz: T = ((a+c)/2)·m = k·m. Deltoid & rombusz: T = (e·f)/2.'
  },
  {
    title: 'Sokszögek képletei',
    formula: 'S_n = (n-2)·180° • d_n = n(n-3)/2',
    explanation: 'Belső szögek összege és összes átló száma n-oldalú sokszögben. Külső szögek: 360°.'
  },
  {
    title: 'Hasábok & Euler-tétel',
    formula: 'V = T_a·M • C + L = E + 2',
    explanation: 'Felszín: A = 2T_a + K_a·M. Poliéderekre: Csúcsok + Lapok = Élek + 2.'
  }
];

export const GeometrySummaryQuiz: React.FC<GeometrySummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="12. Geometria Összefoglaló Kvíz"
      subtitle="Teszteld tudásodat a 7. osztályos geometria teljes tananyagából 3 nehézségi szinten, ábrákkal és részletes magyarázatokkal!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA"
      topicId="g7-geom-summary"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <GeometrySummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <GeometrySummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <GeometrySummaryMatcher
          {...props}
          key={`geom-summary-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <GeometrySummarySorter
          {...props}
          key={`geom-summary-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
