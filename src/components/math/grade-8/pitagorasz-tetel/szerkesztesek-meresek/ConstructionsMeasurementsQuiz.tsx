import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Ruler,
  Compass,
  Triangle,
  Shapes,
  Maximize2,
  Award,
  Sparkles,
  LayoutGrid,
  ArrowRightLeft
} from 'lucide-react';
import { ConstructionsMeasurementsMatcher } from './ConstructionsMeasurementsMatcher';
import { ConstructionsMeasurementsSorter } from './ConstructionsMeasurementsSorter';

interface ConstructionsMeasurementsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Derékszögű Háromszög Elemei',
    icon: <Triangle className="w-4 h-4 text-amber-600" />,
    formula: 'T = \\frac{a \\cdot b}{2}, \\quad \\alpha + \\beta = 90^\\circ, \\quad c > a, \\; c > b',
    note: 'A 90°-ot bezáró oldalak a befogók (a, b), a derékszöggel szemközti leghosszabb oldal az átfogó (c).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="20,10 20,42 75,42" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M 20 33 A 9 9 0 0 1 29 42" fill="none" stroke="#d97706" strokeWidth="1.2" />
        <circle cx="23.5" cy="38.5" r="1.1" fill="#d97706" />
        <text x="14" y="28" className="text-[7px] font-bold fill-amber-800">b</text>
        <text x="46" y="48" className="text-[7px] font-bold fill-amber-800">a</text>
        <text x="52" y="24" className="text-[7.5px] font-black fill-emerald-700">c</text>
        <text x="115" y="24" className="text-[7px] font-bold fill-slate-700" textAnchor="middle">α + β = 90°</text>
        <text x="115" y="36" className="text-[6.5px] fill-amber-700" textAnchor="middle">T = (a·b)/2</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Thálész-tétel és Körülírt Kör',
    icon: <Compass className="w-4 h-4 text-indigo-600" />,
    formula: 'R = \\frac{c}{2}, \\quad s_c = \\frac{c}{2}, \\quad \\angle ACB = 90^\\circ',
    note: 'Bármely átmérő fölé rajzolt körív pontjaiból az átmérő végpontjai derékszögben látszanak. Az átfogó felezőpontja a kör középpontja.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 20 40 A 35 35 0 0 1 90 40 Z" fill="#e0e7ff" fillOpacity="0.5" stroke="#4f46e5" strokeWidth="1.2" />
        <polygon points="20,40 50,12 90,40" fill="#fef3c7" fillOpacity="0.6" stroke="#d97706" strokeWidth="1.2" />
        <path d="M 44 17 A 8 8 0 0 0 57 17" fill="none" stroke="#d97706" strokeWidth="1.2" />
        <circle cx="50" cy="18" r="1" fill="#d97706" />
        <circle cx="55" cy="40" r="1.5" fill="#4338ca" />
        <text x="50" y="9" className="text-[6.5px] font-black fill-amber-900" textAnchor="middle">C (90°)</text>
        <text x="125" y="24" className="text-[7px] font-bold fill-indigo-800" textAnchor="middle">O = c felezője</text>
        <text x="125" y="36" className="text-[6.5px] fill-indigo-600" textAnchor="middle">R = sc = c/2</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Szerkesztési Alapesetek',
    icon: <Ruler className="w-4 h-4 text-sky-600" />,
    formula: '\\text{Két befogó: } a, b \\implies c; \\quad \\text{Átfogó és befogó: } c, a \\; (c > a)',
    note: 'Két befogóból: derékszög szerkesztése C-ben. Átfogóból és befogóból: körívvel metszés a derékszögű szárra.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="42" x2="60" y2="42" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="20" y2="42" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M 20 34 A 8 8 0 0 1 28 42" fill="none" stroke="#0284c7" strokeWidth="1.2" />
        <circle cx="23" cy="39" r="1" fill="#0284c7" />
        <path d="M 60 10 A 35 35 0 0 0 20 22" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 1" />
        <text x="40" y="48" className="text-[6px] fill-sky-800" textAnchor="middle">a felmérése</text>
        <text x="120" y="25" className="text-[6.5px] font-bold fill-sky-900" textAnchor="middle">Körív: r = c</text>
        <text x="120" y="37" className="text-[6px] fill-slate-600" textAnchor="middle">Feltétel: c &gt; a</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Négyzetek Területe és Összege',
    icon: <Shapes className="w-4 h-4 text-emerald-600" />,
    formula: 'T_a = a^2, \\quad T_b = b^2, \\quad T_c = c^2 \\implies T_a + T_b = T_c',
    note: 'A befogókra kifelé rajzolt négyzetek területeinek összege pontosan megegyezik az átfogóra emelt négyzet területével!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="26" width="16" height="16" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <rect x="41" y="30" width="22" height="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <text x="33" y="37" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">a²</text>
        <text x="52" y="38" className="text-[6px] font-bold fill-orange-900" textAnchor="middle">b²</text>
        <text x="110" y="24" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">a² + b² = c²</text>
        <text x="110" y="36" className="text-[6px] fill-emerald-700" textAnchor="middle">Ta + Tb = Tc</text>
      </svg>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Tulajdonságok',
    description: '10 alapozó feladat a derékszögű háromszög elemeiről, szögeiről és az oldalak négyzeteiről',
    badgeText: '1. Szint • Alapozó',
    badgeColor: 'amber',
    icon: <Triangle className="w-4 h-4 text-amber-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'Befogók és átfogó elnevezése',
        question: 'Hogyan nevezzük a derékszögű háromszög derékszögét (90°) bezáró két oldalt, illetve a derékszöggel szemközti leghosszabb oldalt?',
        options: [
          'A derékszöget bezáró két oldal a befogó (a, b), a szemközti leghosszabb oldal az átfogó (c).',
          'A derékszöget bezáró két oldal az átfogó, a szemközti leghosszabb oldal a befogó.',
          'Szárak a derékszöget bezáró oldalak, és alap a szemközti oldal.',
          'Két húr és a hozzájuk tartozó átmérő.'
        ],
        correctAnswer: 0,
        explanation: 'A derékszöget közrefogó két oldal a befogó (a és b), míg a derékszögű csúccsal (C) szemben fekvő leghosszabb oldal az átfogó (c).'
      },
      {
        id: 'q1-2',
        title: 'Hegyesszögek összege',
        question: 'Mennyi egy derékszögű háromszög két hegyesszögének összege (α + β)?',
        options: [
          '90° (egymás pótszögei)',
          '180°',
          '60°',
          '45°'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a háromszög belső szögeinek összege 180° és a derékszög γ = 90°, ezért a két hegyesszög összege mindig: α + β = 180° - 90° = 90°.'
      },
      {
        id: 'q1-3',
        title: 'Négyzetek területe a befogókon és átfogón',
        question: 'Egy derékszögű háromszög befogóira 9 cm² és 16 cm² területű négyzeteket rajzoltunk. Mekkora az átfogóra rajzolt négyzet területe?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <rect x="25" y="32" width="28" height="28" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <text x="39" y="48" className="text-[8px] font-bold fill-orange-950" textAnchor="middle">9 cm²</text>
            <rect x="53" y="60" width="40" height="16" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <text x="73" y="72" className="text-[7.5px] font-bold fill-amber-950" textAnchor="middle">16 cm²</text>
            <polygon points="53,60 93,60 53,32" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="80" y="42" className="text-[8px] font-bold fill-emerald-800">Tc = ?</text>
          </svg>
        ),
        options: [
          '25 cm²',
          '7 cm²',
          '144 cm²',
          '20 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A kísérleti megfigyelés és a Pitagorasz-tétel szerint a befogókra emelt négyzetek területének összege megegyezik az átfogóra emelt négyzet területével: 9 cm² + 16 cm² = 25 cm².'
      },
      {
        id: 'q1-4',
        title: 'Körülírt kör középpontja',
        question: 'Hol található egy derékszögű háromszög körülírt körének középpontja?',
        options: [
          'Az átfogó (c) pontos felezőpontjában',
          'A derékszögű csúcsban (C)',
          'A háromszög súlypontjában',
          'A hosszabbik befogó harmadolópontjában'
        ],
        correctAnswer: 0,
        explanation: 'A Thálész-tétel megfordítása miatt a derékszögű háromszög köré írt kör középpontja mindig az átfogó felezőpontja.'
      },
      {
        id: 'q1-5',
        title: 'Körülírt kör sugara',
        question: 'Egy derékszögű háromszög átfogója c = 12 cm. Mekkora a háromszög köré írható kör sugara (R)?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <circle cx="80" cy="46" r="30" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="50" y1="46" x2="110" y2="46" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <polygon points="50,46 110,46 80,16" fill="none" stroke="#059669" strokeWidth="1.5" />
            <circle cx="80" cy="46" r="2" fill="#059669" />
            <text x="80" y="58" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">c = 12 cm</text>
            <text x="64" y="42" className="text-[8.5px] font-bold fill-emerald-700">R = ?</text>
          </svg>
        ),
        options: [
          '6 cm (az átfogó fele: R = c / 2)',
          '12 cm',
          '24 cm',
          '3 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az átfogó a körülírt kör átmérője, a sugár pontosan az átfogó fele: R = 12 / 2 = 6 cm.'
      },
      {
        id: 'q1-6',
        title: 'Derékszögű háromszög területe',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm. Mekkora a háromszög területe?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <polygon points="35,62 125,62 35,22" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 35 52 A 10 10 0 0 1 45 62" fill="none" stroke="#2563eb" strokeWidth="1.2" />
            <circle cx="39" cy="58" r="1.2" fill="#2563eb" />
            <text x="18" y="45" className="text-[9px] font-bold fill-blue-900">a = 6</text>
            <text x="80" y="72" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">b = 8</text>
            <text x="70" y="46" className="text-[9.5px] font-bold fill-indigo-600">T = ?</text>
          </svg>
        ),
        options: [
          '24 cm²',
          '48 cm²',
          '14 cm²',
          '28 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A derékszögű háromszög területe a két befogó szorzatának fele: T = (a · b) / 2 = (6 · 8) / 2 = 48 / 2 = 24 cm².'
      },
      {
        id: 'q1-7',
        title: 'A Thálész-tétel lényege',
        question: 'Mit mond ki a Thálész-tétel?',
        options: [
          'Ha egy kör átmérőjének két végpontját összekötjük a körvonal bármely más pontjával, a kapott háromszög mindig derékszögű.',
          'Ha egy háromszög minden oldala egyenlő, akkor szögei 60°-osak.',
          'A háromszög magasságvonalai egy pontban metszik egymást.',
          'A kör területe egyenlő a sugár négyzetének kétszeresével.'
        ],
        correctAnswer: 0,
        explanation: 'A Thálész-tétel szerint a kör átmérőjéből a körvonal bármely pontja derékszögben látszik (∠ACB = 90°).'
      },
      {
        id: 'q1-8',
        title: 'Leghosszabb oldal felismerése',
        question: 'Lehet-e egy derékszögű háromszögben bármelyik befogó hosszabb az átfogónál?',
        options: [
          'Nem, az átfogó mindig szigorúan a leghosszabb oldal a háromszögben.',
          'Igen, ha a befogó függőlegesen áll.',
          'Igen, egyenlő szárú derékszögű háromszögben.',
          'Csak akkor, ha a háromszög tompaszögű.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a háromszögben a legnagyobb szöggel (90°) szemben fekszik a leghosszabb oldal, az átfogó (c) mindig hosszabb mindkét befogónál (c > a és c > b).'
      },
      {
        id: 'q1-9',
        title: 'Befogó négyzetének visszaszámolása',
        question: 'Egy derékszögű háromszög átfogójára emelt négyzet területe Tc = 100 cm², az egyik befogóra emelté pedig Ta = 36 cm². Mekkora a másik befogóra emelt négyzet területe (Tb)?',
        options: [
          '64 cm²',
          '136 cm²',
          '8 cm²',
          '48 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel Ta + Tb = Tc, ezért Tb = Tc - Ta = 100 - 36 = 64 cm² (a befogó hossza így b = √64 = 8 cm).'
      },
      {
        id: 'q1-10',
        title: 'Két derékszög kizárása',
        question: 'Miért nem lehet egy háromszögnek két derékszöge (két 90°-os szöge)?',
        options: [
          'Mert a két derékszög összege már önmagában 180°, így a harmadik szögnek 0°-nak kellene lennie, ami nem alkot háromszöget.',
          'Mert a körzővel nem lehet kétszer 90°-ot kimérni.',
          'Mert az átfogó túl hosszú lenne.',
          'Lehet két derékszöge, ha nagyon nagy a háromszög.'
        ],
        correctAnswer: 0,
        explanation: 'A háromszög három belső szögének összege pontosan 180°. Ha kettő 90°-os lenne, összegük már 180° lenne, így a harmadik szög nem létezhet.'
      }
    ]
  },
  2: {
    title: '2. Szint: Szerkesztések és Thálész-kör Alkalmazása',
    subtitle: '10 gyakorló feladat szerkesztési lépésekről, méretekről és geometriai feltételekről',
    badgeText: '2. Szint • Gyakorló',
    badgeColor: 'sky',
    icon: <Compass className="w-4 h-4 text-sky-600" />,
    questions: [
      {
        id: 'q2-1',
        title: 'Szerkesztés két befogóból',
        question: 'Hogyan szerkesztünk derékszögű háromszöget, ha adott a két befogó: a = 4 cm és b = 3 cm?',
        options: [
          'A C csúcsban merőleges egyenespárt szerkesztünk, a szárakra felmérjük a 4 cm és 3 cm szakaszokat, majd végpontjaikat összekötjük.',
          'Felmérünk egy 7 cm-es szakaszt, és a közepén 90°-os szöget állítunk.',
          'Csak Thálész-körrel lehet két befogóból szerkeszteni.',
          'Körzővel 4 cm sugarú kört rajzolunk, és beleillesztünk egy 3 cm-es húrt.'
        ],
        correctAnswer: 0,
        explanation: 'A derékszögű C csúcsból induló két merőleges félegyenesre felmérve a és b befogókat, a kapott A és B pontok összekötésével azonnal megkapjuk az átfogót.',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="45" y1="72" x2="45" y2="15" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="30" y1="68" x2="135" y2="68" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="45,68 115,68 45,28" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <circle cx="45" cy="68" r="2" fill="#d97706" />
            <circle cx="115" cy="68" r="2" fill="#d97706" />
            <circle cx="45" cy="28" r="2" fill="#d97706" />
            <text x="35" y="75" className="text-[8px] font-bold fill-amber-900">C</text>
            <text x="120" y="75" className="text-[8px] font-bold fill-amber-900">B</text>
            <text x="35" y="28" className="text-[8px] font-bold fill-amber-900">A</text>
            <text x="33" y="50" className="text-[8.5px] font-bold fill-slate-700">3 cm</text>
            <text x="80" y="78" textAnchor="middle" className="text-[8.5px] font-bold fill-slate-700">4 cm</text>
          </svg>
        )
      },
      {
        id: 'q2-2',
        title: 'Szerkesztés átfogóból és befogóból',
        question: 'Adott a = 6 cm befogó és c = 10 cm átfogó. Miután felmértük a BC = 6 cm szakaszt és C-ben merőlegest állítottunk, hogyan kapjuk meg az A csúcsot?',
        options: [
          'A B csúcsból 10 cm sugarú körívet húzunk, amely kimetszi az A csúcsot a C-ből indított merőlegesből.',
          'A C csúcsból 10 cm sugarú körívet húzunk a merőlegesre.',
          'A BC szakasz felezőpontjából húzunk 5 cm-es körívet.',
          'Összekötjük B-t egy tetszőleges ponttal.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az átfogó a B és A pont közötti távolság (c = 10 cm), a B pontból húzott 10 cm sugarú körív és a C-ből állított merőleges metszéspontja pontosan kijelöli az A csúcsot.'
      },
      {
        id: 'q2-3',
        title: 'Szerkeszthetőség feltétele (c és a)',
        question: 'Szerkeszthető-e derékszögű háromszög, ha az átfogó c = 5 cm és az egyik befogó a = 7 cm?',
        options: [
          'Nem, mert az átfogónak szigorúan hosszabbnak kell lennie a befogónál (c > a), különben a körív nem metszi a merőlegest.',
          'Igen, a = 7 cm és c = 5 cm mindig szerkeszthető.',
          'Csak akkor, ha a másik befogó negatív szám.',
          'Igen, de csak tompaszögű háromszög lesz.'
        ],
        correctAnswer: 0,
        explanation: 'A derékszögű háromszögben az átfogó a leghosszabb oldal (c > a). Ha c ≤ a, a B-ből indított c sugarú körív el sem éri a merőleges egyenest, így nincs metszéspont.'
      },
      {
        id: 'q2-4',
        title: 'Thálész-kör és az átfogó magassága',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm. Legfeljebb mekkora lehet az átfogóhoz tartozó magasság (mc)?',
        figure: (
          <svg viewBox="0 0 160 75" className="w-full max-w-[160px] h-auto max-h-[80px] select-none">
            <path d="M 35 60 A 45 45 0 0 1 125 60 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <line x1="80" y1="15" x2="80" y2="60" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="80" cy="15" r="2" fill="#dc2626" />
            <circle cx="80" cy="60" r="2" fill="#059669" />
            <text x="80" y="72" className="text-[8px] font-bold fill-slate-700" textAnchor="middle">c = 10 cm</text>
            <text x="85" y="38" className="text-[8.5px] font-bold fill-rose-600">mc = ?</text>
          </svg>
        ),
        options: [
          'Legfeljebb 5 cm (a Thálész-kör sugara: mc ≤ c / 2)',
          'Legfeljebb 10 cm',
          'Bármilyen nagy lehet, nincs felső határa',
          'Legfeljebb 2,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'A Thálész-kör sugara R = c / 2 = 5 cm. A körív pontjainak az átmérőtől mért legnagyobb távolsága a sugár, ezért mc ≤ 5 cm.'
      },
      {
        id: 'q2-5',
        title: 'Egyenlő szárú derékszögű háromszög szögei',
        question: 'Mekkorák egy egyenlő szárú derékszögű háromszög hegyesszögei?',
        options: [
          'Mindkettő 45° (α = β = 45°)',
          '30° és 60°',
          'Mindkettő 60°',
          '20° és 70°'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a háromszög egyenlő szárú, a két hegyesszög egyenlő: α = β. Mivel összegük 90°, ezért α = β = 90° / 2 = 45°.'
      },
      {
        id: 'q2-6',
        title: 'Ferde szakasz hossza négyzethálón',
        question: 'A négyzethálón egy szakasz végpontjai között vízszintesen 3 rácsegység, függőlegesen 4 rácsegység a távolság. Mekkora a szakasz hossza?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="45" y1="68" x2="115" y2="68" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="115" y1="68" x2="115" y2="20" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="45" y1="68" x2="115" y2="20" stroke="#059669" strokeWidth="2.5" />
            <circle cx="45" cy="68" r="2.5" fill="#059669" />
            <circle cx="115" cy="20" r="2.5" fill="#059669" />
            <text x="80" y="78" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Δx = 3</text>
            <text x="123" y="46" className="text-[8px] font-bold fill-slate-700">Δy = 4</text>
            <text x="75" y="40" className="text-[9px] font-bold fill-emerald-700">d = ?</text>
          </svg>
        ),
        options: [
          '5 rácsegység (mert 3² + 4² = 9 + 16 = 25 = 5²)',
          '7 rácsegység (mert 3 + 4 = 7)',
          '12 rácsegység (mert 3 · 4 = 12)',
          '6 rácsegység'
        ],
        correctAnswer: 0,
        explanation: 'A vízszintes és függőleges elmozdulás egy derékszögű háromszög befogóit adja (3 és 4). A ferde szakasz az átfogó: c = √(3² + 4²) = √25 = 5 rácsegység.'
      },
      {
        id: 'q2-7',
        title: 'Befogó kiszámítása területekből',
        question: 'Ha a = 5 cm és c = 13 cm egy derékszögű háromszögben, mekkora a b befogóra emelt négyzet területe (Tb) és a b oldal hossza?',
        options: [
          'Tb = 144 cm², b = 12 cm',
          'Tb = 194 cm², b = 14 cm',
          'Tb = 64 cm², b = 8 cm',
          'Tb = 169 cm², b = 13 cm'
        ],
        correctAnswer: 0,
        explanation: 'Ta = 5² = 25, Tc = 13² = 169. Ekkor Tb = Tc - Ta = 169 - 25 = 144 cm², amelyből b = √144 = 12 cm.'
      },
      {
        id: 'q2-8',
        title: 'Átfogóhoz tartozó súlyvonal',
        question: 'Egy derékszögű háromszög átfogója c = 14 cm. Milyen hosszú a derékszögű csúcsból az átfogó felezőpontjába húzott súlyvonal (sc)?',
        options: [
          '7 cm (sc = c / 2)',
          '14 cm',
          '9,9 cm',
          '3,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az átfogó felezőpontja a körülírt kör középpontja, a derékszögű csúcs és a felezőpont távolsága éppen a körülírt kör sugara: sc = R = c / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'q2-9',
        title: 'Átfogóhoz tartozó magasság kiszámítása',
        question: 'Egy derékszögű háromszög oldalai a = 6 cm, b = 8 cm és c = 10 cm. Mekkora az átfogóhoz tartozó magasság (mc)?',
        options: [
          '4,8 cm (mert T = 24 cm², és mc = 2T / c = 48 / 10 = 4,8 cm)',
          '5 cm',
          '7 cm',
          '2,4 cm'
        ],
        correctAnswer: 0,
        explanation: 'A terület kétféleképpen írható fel: T = (a · b) / 2 = (6 · 8) / 2 = 24 cm². Ugyanakkor T = (c · mc) / 2 = 5 · mc = 24, amiből mc = 24 / 5 = 4,8 cm.'
      },
      {
        id: 'q2-10',
        title: 'Darabolásos modell lényege',
        question: 'Az (a + b) oldalhosszúságú nagy négyzetből 4 darab egybevágó derékszögű háromszöget elvéve miért bizonyított, hogy a² + b² = c²?',
        options: [
          'Mert az egyik elrendezésben megmaradó a² és b² területek egyenlők a másikban megmaradó c² területtel.',
          'Mert a nagy négyzet területe mindig 100 cm².',
          'Mert a háromszögek átfedik egymást a papíron.',
          'Mert a szögek összege 360°.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mindkét azonos területű (a+b)² négyzetből pontosan ugyanazt a 4 darab (a·b)/2 területű háromszöget távolítjuk el, a maradék területeknek szigorúan egyenlőknek kell lenniük: a² + b² = c².'
      }
    ]
  },
  3: {
    title: '3. Szint: Területi Mérések és Összetett Geometria',
    subtitle: '10 emelt szintű feladat a területek kapcsolatáról, szerkesztési határokról és bizonyításokról',
    badgeText: '3. Szint • Mester',
    badgeColor: 'emerald',
    icon: <Award className="w-4 h-4 text-emerald-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Háromszög területe a négyzethálón mért területekből',
        question: 'Egy derékszögű háromszög befogóira emelt négyzetek területe Ta = 25 cm² és Tc = 169 cm² az átfogón. Mekkora a háromszög területe?',
        figure: (
          <svg viewBox="0 0 160 85" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="25" y="28" width="28" height="28" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="3 2" rx="2" />
            <text x="39" y="44" textAnchor="middle" fontSize="7.5" fill="#4338ca" fontWeight="bold">Ta = 25</text>
            <polygon points="53,56 53,28 113,56" fill="#818cf8" fillOpacity="0.25" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 53 48 A 8 8 0 0 1 61 56" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
            <circle cx="56.5" cy="52.5" r="1" fill="#4f46e5" />
            <rect x="105" y="16" width="48" height="24" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.2" />
            <text x="129" y="31" textAnchor="middle" fontSize="7.5" fill="#047857" fontWeight="bold">Tc = 169</text>
            <text x="80" y="46" textAnchor="middle" fontSize="9" fill="#4f46e5" fontWeight="bold">T = ?</text>
          </svg>
        ),
        options: [
          '30 cm²',
          '60 cm²',
          '65 cm²',
          '144 cm²'
        ],
        correctAnswer: 0,
        explanation: 'a = √25 = 5 cm. Tb = 169 - 25 = 144 cm², amiből b = √144 = 12 cm. A háromszög területe: T = (a · b) / 2 = (5 · 12) / 2 = 60 / 2 = 30 cm².'
      },
      {
        id: 'q3-2',
        title: 'Négyzethálóra rajzolt ferde négyzet területe',
        question: 'Egy négyzethálón ferdén elhelyezkedő négyzet csúcsai (0,3), (4,0), (7,4), (3,7). Hogyan határozhatjuk meg a legegyszerűbben a területét?',
        figure: (
          <svg viewBox="0 0 160 85" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <rect x="45" y="8" width="70" height="70" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            {[1, 2, 3, 4, 5, 6].map(i => (
              <g key={i}>
                <line x1={45 + i * 10} y1="8" x2={45 + i * 10} y2="78" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="1 1" />
                <line x1="45" y1={8 + i * 10} x2="115" y2={8 + i * 10} stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="1 1" />
              </g>
            ))}
            <rect x="45" y="8" width="70" height="70" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="45,48 85,78 115,38 75,8" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
            <text x="80" y="46" textAnchor="middle" fontSize="10" fill="#047857" fontWeight="bold">T = ?</text>
            <text x="24" y="46" textAnchor="middle" fontSize="8" fill="#b45309" fontWeight="bold">7 × 7</text>
          </svg>
        ),
        options: [
          'Köré rajzolunk egy 7×7-es téglalapot (49), és levonjuk a 4 darab 3×4-es sarokháromszög területét (4 · 6 = 24): 49 - 24 = 25.',
          'Megmérjük vonalzóval a monitoron.',
          'Összeszorozzuk a koordinátákat.',
          'Nem lehet meghatározni, mert nem párhuzamos a rácsvonalakkal.'
        ],
        correctAnswer: 0,
        explanation: 'A körülvevő rácstéglalap területe 7 · 7 = 49 egység². A 4 levágott sarok derékszögű háromszög mindegyikének területe (3 · 4) / 2 = 6. Így a terület: 49 - 4 · 6 = 49 - 24 = 25 egység² (az oldal hossza 5).'
      },
      {
        id: 'q3-3',
        title: 'Hippokratész-holdacskák alapelve',
        question: 'Ha egy derékszögű háromszög a és b befogóira, valamint c átfogójára kifelé félköröket rajzolunk, mi az összefüggés a félkörök területei (T1, T2, T3) között?',
        options: [
          'T1 + T2 = T3 (a befogók félköreinek területe megegyezik az átfogó félkörének területével)',
          'T1 + T2 > T3',
          'T1 + T2 = 2 · T3',
          'A félkörök területe nem függ a Pitagorasz-tételtől'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a félkör területe T = (π · r²) / 2 = (π · (oldal/2)²) / 2, azaz a terület egyenesen arányos az oldal négyzetével: T1 + T2 = k·a² + k·b² = k·(a² + b²) = k·c² = T3.'
      },
      {
        id: 'q3-4',
        title: 'Háromszög-egyenlőtlenség vs. Pitagorasz',
        question: 'Miért állíthatjuk biztosan, hogy derékszögű háromszögben a + b > c, miközben a² + b² = c²?',
        options: [
          'Mert (a + b)² = a² + 2ab + b² = c² + 2ab > c², amiből négyzetgyökvonással a + b > c következik.',
          'Mert az átfogó mindig rövidebb a befogóknál.',
          'Mert a negatív gyököket elhagyjuk.',
          'Ez csak hegyesszögű háromszögre igaz, derékszögűre a + b = c.'
        ],
        correctAnswer: 0,
        explanation: '(a + b)² = a² + b² + 2ab. Mivel a² + b² = c² és 2ab > 0 (pozitív hosszak), ezért (a+b)² > c², így a + b > c. Ez a háromszög-egyenlőtlenség algebrai bizonyítása.'
      },
      {
        id: 'q3-5',
        title: 'Körülírt kör területe adott befogókból',
        question: 'Egy derékszögű háromszög befogói a = 5 cm és b = 12 cm. Mekkora a háromszög köré írt kör területe?',
        options: [
          '42,25π cm² (kb. 132,7 cm²)',
          '169π cm²',
          '25π cm²',
          '84,5π cm²'
        ],
        correctAnswer: 0,
        explanation: 'Az átfogó négyzete: c² = 5² + 12² = 25 + 144 = 169, tehát c = 13 cm. A körülírt kör sugara R = c / 2 = 6,5 cm. A kör területe: T = R² · π = 6,5² · π = 42,25π cm².'
      },
      {
        id: 'q3-6',
        title: 'Szerkesztési megoldások száma (c és mc)',
        question: 'Hány egymással nem egybevágó derékszögű háromszög szerkeszthető, ha adott az átfogó c = 10 cm és a hozzá tartozó magasság mc = 3 cm?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="20" y1="65" x2="140" y2="65" stroke="#334155" strokeWidth="1.5" />
            <path d="M 30 65 A 50 50 0 0 1 130 65" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="1.8" />
            <circle cx="80" cy="65" r="2" fill="#1e40af" />
            <text x="80" y="75" textAnchor="middle" fontSize="7.5" fill="#1e40af" fontWeight="bold">c = 10 cm</text>
            <line x1="15" y1="40" x2="145" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="18" y="35" fontSize="7.5" fill="#d97706" fontWeight="bold">mc = 3 cm</text>
            <circle cx="43" cy="40" r="2.5" fill="#2563eb" />
            <text x="41" y="34" textAnchor="middle" fontSize="7" fill="#1d4ed8" fontWeight="bold">C1</text>
            <circle cx="117" cy="40" r="2.5" fill="#6366f1" />
            <text x="119" y="34" textAnchor="middle" fontSize="7" fill="#4338ca" fontWeight="bold">C2</text>
          </svg>
        ),
        options: [
          'Pontosan 1 darab (a szimmetrikus tükörképek egybevágónak számítanak)',
          '2 darab különböző háromszög',
          'Végtelen sok különböző háromszög',
          '0 darab, mert nem szerkeszthető'
        ],
        correctAnswer: 0,
        explanation: 'Az átfogóval párhuzamos egyenes a Thálész-félkört 2 pontban metszi. A kapott két háromszög tengelyesen tükrös egymásra (a és b befogók csak helyet cserélnek), így geometriailag egybevágóak: pontosan 1 háromszög van.'
      },
      {
        id: 'q3-7',
        title: 'Befogó hossza nagy számokkal',
        question: 'Egy derékszögű háromszög átfogójára emelt négyzet területe 289 cm², az egyik befogójára emelt négyzeté 64 cm². Milyen hosszú a másik befogó?',
        options: [
          '15 cm',
          '17 cm',
          '8 cm',
          '225 cm'
        ],
        correctAnswer: 0,
        explanation: 'Tb = Tc - Ta = 289 - 64 = 225 cm². A befogó hossza a terület négyzetgyöke: b = √225 = 15 cm. (Ez a 8 - 15 - 17 pitagoraszi számhármas).'
      },
      {
        id: 'q3-8',
        title: 'Terület és kerület kapcsolata (7, 24, 25)',
        question: 'Egy derékszögű háromszög oldalai a = 7 cm, b = 24 cm és c = 25 cm. Mekkora a háromszög területe és beírt körének sugara (r)?',
        options: [
          'T = 84 cm² és r = 3 cm (r = (a + b - c) / 2 = (7 + 24 - 25) / 2 = 3 cm)',
          'T = 168 cm² és r = 6 cm',
          'T = 84 cm² és r = 5 cm',
          'T = 175 cm² és r = 3,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'T = (7 · 24) / 2 = 84 cm². Derékszögű háromszög beírt körének sugara: r = (a + b - c) / 2 = (31 - 25) / 2 = 6 / 2 = 3 cm (vagy r = T / s = 84 / 28 = 3 cm).'
      },
      {
        id: 'q3-9',
        title: 'Egyenlő szárú derékszögű háromszög területe átfogóból',
        question: 'Egy egyenlő szárú derékszögű háromszög átfogója c = 10 cm. Hogyan számítható ki a területe közvetlenül az átfogóból?',
        options: [
          'T = c² / 4 = 100 / 4 = 25 cm²',
          'T = c² / 2 = 50 cm²',
          'T = c · 2 = 20 cm²',
          'Nem számítható ki a befogók nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlő szárú derékszögű háromszögben mc = c / 2. Ezért T = (c · mc) / 2 = (c · (c/2)) / 2 = c² / 4 = 100 / 4 = 25 cm².'
      },
      {
        id: 'q3-10',
        title: 'Szerkesztés átfogóból és a befogók összegéből',
        question: 'Hogyan szerkeszthető derékszögű háromszög, ha ismerjük az átfogót (c) és a két befogó összegét (a + b)?',
        options: [
          'Felmérjük az (a + b) szakaszt, az egyik végpontjában 45°-os szöget szerkesztünk, majd a másikból c sugarú körívvel metszünk.',
          'Egyszerűen elfelezzük az összeget és egyenlő szárú háromszöget rajzolunk.',
          'Csak Thálész-körrel és koordinátákkal lehetséges.',
          'Ez a feladat körzővel és vonalzóval elméletileg nem szerkeszthető.'
        ],
        correctAnswer: 0,
        explanation: 'A derékszög szárát meghosszabbítva a + b szakaszt kapunk, amelynek végpontját a másik csúccsal összekötve egy 45°-os hegyesszögű segédháromszög keletkezik. Ennek szárát c sugarú körívvel metszve a feladat megoldható.'
      }
    ]
  }
};

export const ConstructionsMeasurementsQuiz: React.FC<ConstructionsMeasurementsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Szerkesztések és Mérések Kvíz"
      subtitle="Derékszögű háromszögek szerkesztése, Thálész-tétel és a területek tapasztalati mérése"
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 1. Lecke • Szerkesztések, Mérések"
      topicTitle="Szerkesztések és Mérések"
      topicId="g8-pyth-constructions"
      chapterId="pitagorasz-tetel"
      grade={8}
      documentId="constructions-measurements-quiz-doc"
      pdfFilename="8_osztaly_szerkesztesek_meresek_kviz.pdf"
      emoji="📐"
      cheatSheetTitle="Szerkesztési és Mérési Segédlet"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a geometriai fogalmakat, szerkesztési lépéseket és területeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Tulajdonságok',
              subtitle: 'Párosítsd a derékszögű háromszög elemeit a nevükkel és tulajdonságaikkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Szerkesztési Eljárások és Thálész-kör',
              subtitle: 'Kösd össze a szerkesztési feladatokat a helyes geometriai lépésekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Szerkesztési lépések'
            },
            3: {
              title: '3. Szint: Területek Mérése és Pitagoraszi Számítások',
              subtitle: 'Párosítsd a befogók és átfogók négyzeteit a kísérleti területekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Területi összefüggések'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <ConstructionsMeasurementsMatcher
              key={`cm-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a háromszög elemeit, szerkesztési eseteit és a geometriai állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Derékszögű Háromszög Elemei',
              subtitle: 'Sorold be a tulajdonságokat: Befogók / Átfogó / Szögek és magasságok szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Háromszög elemei'
            },
            2: {
              title: '2. Szint: Szerkesztési Esetek és Eljárások',
              subtitle: 'Csoportosítsd: Két befogóból / Átfogóból és befogóból / Thálész-körös szerkesztés!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Szerkesztési módszerek'
            },
            3: {
              title: '3. Szint: Területi és Geometriai Állítások',
              subtitle: 'Döntsd el: Mindig igaz / Csak egyenlő szárúra igaz / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Állítások igazsága'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ConstructionsMeasurementsSorter
              key={`cm-sorter-${level}`}
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
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ConstructionsMeasurementsQuiz;
