import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { SurfaceAreaMatcher } from './SurfaceAreaMatcher';
import { SurfaceAreaSorter } from './SurfaceAreaSorter';

export interface SurfaceAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SURFACE_AREA_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, KÉPLETEK ÉS KÖZVETLEN SZÁMÍTÁSOK (1-10)
  // =========================================================================
  {
    id: 'saq1-1',
    level: 1,
    prompt: 'Mi az "a" élhosszúságú kocka felszínének kiszámítási képlete?',
    options: [
      'A = 6 · a · a (vagy 6 · a²)',
      'A = 4 · a · a (vagy 4 · a²)',
      'A = 12 · a',
      'A = a · a · a (vagy a³)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-32 mx-auto" viewBox="0 0 130 100">
        <rect x="25" y="35" width="50" height="50" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <polygon points="25,35 45,15 95,15 75,35" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="75,35 95,15 95,65 75,85" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <text x="50" y="65" textAnchor="middle" className="text-[12px] font-bold fill-pink-900">a²</text>
        <text x="60" y="27" textAnchor="middle" className="text-[10px] fill-pink-800">a²</text>
        <text x="85" y="52" textAnchor="middle" className="text-[10px] fill-pink-800">a²</text>
        <text x="65" y="96" textAnchor="middle" className="text-[9px] font-bold fill-pink-950">6 db egybevágó lap: A = 6 · a²</text>
      </svg>
    ),
    explanation: 'A kockát 6 darab egybevágó négyzet határolja. Egy lap területe a · a (a²), így a teljes felszín: A = 6 · a².',
    hint: 'A kockának 6 lapja van, mindegyik egy "a" oldalú négyzet!',
    breakdown: [
      { label: 'Egy négyzetlap területe', value: 'T = a · a = a²' },
      { label: 'Lapok száma', value: '6 darab' },
      { label: 'Teljes felszín képlete', value: 'A = 6 · a²' }
    ]
  },
  {
    id: 'saq1-2',
    level: 1,
    prompt: 'Mennyi a felszíne annak a kockának, amelynek éle a = 3 cm?',
    options: [
      '54 cm²',
      '36 cm²',
      '27 cm²',
      '18 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-28 mx-auto" viewBox="0 0 120 90">
        <rect x="20" y="30" width="45" height="45" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <polygon points="20,30 40,12 85,12 65,30" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="65,30 85,12 85,57 65,75" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <text x="42" y="56" textAnchor="middle" className="text-[11px] font-black fill-pink-900">9 cm²</text>
        <text x="42" y="87" textAnchor="middle" className="text-[9px] font-medium fill-slate-600">a = 3 cm</text>
      </svg>
    ),
    explanation: 'Egy lap területe: 3 · 3 = 9 cm². A kockának 6 lapja van, tehát: A = 6 · 9 = 54 cm².',
    hint: 'Először számold ki egy lap területét (3 · 3), majd szorozd meg 6-tal!',
    breakdown: [
      { label: 'Egy négyzetlap területe', value: '3 cm · 3 cm = 9 cm²' },
      { label: '6 lap összessége', value: '6 · 9 cm²' },
      { label: 'Kocka felszíne', value: '54 cm²' }
    ]
  },
  {
    id: 'saq1-3',
    level: 1,
    prompt: 'Egy kocka egyetlen lapjának a területe 25 cm². Mennyi a kocka teljes felszíne?',
    options: [
      '150 cm²',
      '100 cm²',
      '125 cm²',
      '300 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a kockának 6 egybevágó lapja van, és egy lap területe 25 cm², a teljes felszín: A = 6 · 25 cm² = 150 cm².',
    hint: 'Itt még a négyzet oldalát sem kell megkeresned, hiszen közvetlenül tudod egy lap területét!',
    breakdown: [
      { label: 'Egy lap területe (T_lap)', value: '25 cm²' },
      { label: 'Lapok száma', value: '6 db' },
      { label: 'Felszín (A = 6 · T_lap)', value: '6 · 25 = 150 cm²' }
    ]
  },
  {
    id: 'saq1-4',
    level: 1,
    prompt: 'Mi a téglatest felszínének kiszámítási képlete, ha élei a, b és c?',
    options: [
      'A = 2 · (a·b + a·c + b·c)',
      'A = 4 · (a + b + c)',
      'A = a · b · c',
      'A = a·b + a·c + b·c'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-28 mx-auto" viewBox="0 0 150 90">
        <rect x="20" y="30" width="70" height="40" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <polygon points="20,30 40,12 110,12 90,30" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="90,30 110,12 110,52 90,70" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <text x="55" y="55" textAnchor="middle" className="text-[11px] font-bold fill-pink-900">a · c</text>
        <text x="65" y="23" textAnchor="middle" className="text-[10px] fill-pink-800">a · b</text>
        <text x="100" y="44" textAnchor="middle" className="text-[10px] fill-pink-800">b · c</text>
      </svg>
    ),
    explanation: 'A téglatest 6 lapja 3 pár egybevágó téglalapból áll (alap-fedél: 2 db a·b, első-hátsó: 2 db a·c, két oldalsó: 2 db b·c). Ezért A = 2·(ab + ac + bc).',
    hint: '3 különböző típusú lap van, és mindegyikből pontosan kettő: egy pár!',
    breakdown: [
      { label: 'Alap és fedőlap', value: '2 · (a · b)' },
      { label: 'Előlap és hátlap', value: '2 · (a · c)' },
      { label: 'Két oldallap', value: '2 · (b · c)' },
      { label: 'Összesen kiemeléssel', value: 'A = 2 · (ab + ac + bc)' }
    ]
  },
  {
    id: 'saq1-5',
    level: 1,
    prompt: 'Hány határoló téglalaplapja van egy általános téglatestnek, és hány pár egybevágó lapot alkotnak?',
    options: [
      '6 lapja van, és 3 pár egybevágó lapot alkotnak',
      '6 lapja van, és mind a 6 egybevágó',
      '8 lapja van, és 4 pár egybevágó lapot alkotnak',
      '12 lapja van, és 6 pár egybevágó lapot alkotnak'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestnek 6 lapja van. A szemközti lapok páronként egybevágók, így pontosan 3 lap-párt alkotnak.',
    hint: 'Gondolj a cipősdobozra: az alja és a teteje egyforma, az eleje és hátulja egyforma, a két vége egyforma.',
    breakdown: [
      { label: 'Összes lap száma', value: '6 darab' },
      { label: 'Szemközti párok száma', value: '3 pár' },
      { label: 'Párok tulajdonsága', value: 'Egybevágó téglalapok' }
    ]
  },
  {
    id: 'saq1-6',
    level: 1,
    prompt: 'Mennyi a téglatest felszíne, ha élei: a = 2 cm, b = 3 cm, c = 4 cm?',
    options: [
      '52 cm²',
      '26 cm²',
      '24 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Lapok területe: a·b = 6 cm², a·c = 8 cm², b·c = 12 cm². Összegük: 6 + 8 + 12 = 26 cm². Kétszeresük: A = 2 · 26 = 52 cm².',
    hint: 'Számold ki a 3 különböző lap területét: 2·3, 2·4 és 3·4, add össze őket, majd szorozd meg 2-vel!',
    breakdown: [
      { label: '1. lap pár (2 · 3)', value: '6 cm²' },
      { label: '2. lap pár (2 · 4)', value: '8 cm²' },
      { label: '3. lap pár (3 · 4)', value: '12 cm²' },
      { label: '3 lap összege', value: '6 + 8 + 12 = 26 cm²' },
      { label: 'Teljes felszín (2-szerese)', value: '2 · 26 = 52 cm²' }
    ]
  },
  {
    id: 'saq1-7',
    level: 1,
    prompt: 'Mennyi a felszíne annak a kockának, amelynek éle a = 5 dm?',
    options: [
      '150 dm²',
      '125 dm²',
      '100 dm²',
      '60 dm²'
    ],
    correctAnswer: 0,
    explanation: 'Egy lap területe: 5 · 5 = 25 dm². A 6 lap együtt: A = 6 · 25 = 150 dm².',
    hint: 'A képlet: A = 6 · a² = 6 · 5 · 5.',
    breakdown: [
      { label: 'Egy lap területe', value: '5 dm · 5 dm = 25 dm²' },
      { label: '6 lap összessége', value: '6 · 25 dm²' },
      { label: 'Felszín', value: '150 dm²' }
    ]
  },
  {
    id: 'saq1-8',
    level: 1,
    prompt: 'Egy kocka éle a = 10 cm. Mennyi a felszíne négyzetdeciméterben (dm²)?',
    options: [
      '6 dm² (= 600 cm²)',
      '60 dm²',
      '1 dm²',
      '600 dm²'
    ],
    correctAnswer: 0,
    explanation: 'a = 10 cm = 1 dm. A = 6 · a² = 6 · (1 dm)² = 6 dm². (Centiméterben: 6 · 100 cm² = 600 cm² = 6 dm²).',
    hint: 'Váltsd át az élet rögtön deciméterre: 10 cm = 1 dm!',
    breakdown: [
      { label: 'Kocka éle dm-ben', value: '10 cm = 1 dm' },
      { label: 'Egy lap területe', value: '1 dm · 1 dm = 1 dm²' },
      { label: 'Felszín dm²-ben', value: '6 · 1 dm² = 6 dm²' }
    ]
  },
  {
    id: 'saq1-9',
    level: 1,
    prompt: 'Egy téglatest alaplapja 15 cm², előlapja 20 cm², oldallapja 12 cm². Mennyi a teljes felszíne?',
    options: [
      '94 cm²',
      '47 cm²',
      '188 cm²',
      '74 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A téglatest mindegyik lapjából kettő van: A = 2 · (15 + 20 + 12) = 2 · 47 = 94 cm².',
    hint: 'Add össze a 3 megadott lap területét, majd szorozd meg kettővel!',
    breakdown: [
      { label: 'A 3 lap területe együtt', value: '15 + 20 + 12 = 47 cm²' },
      { label: 'Szemközti lapokkal együtt', value: '2 · 47 cm²' },
      { label: 'Teljes felszín', value: '94 cm²' }
    ]
  },
  {
    id: 'saq1-10',
    level: 1,
    prompt: 'Milyen mértékegységben fejezzük ki a felszínt?',
    options: [
      'Terület-mértékegységben (pl. mm², cm², dm², m²)',
      'Hosszúság-mértékegységben (pl. mm, cm, m)',
      'Térfogat-mértékegységben (pl. cm³, dm³, liter)',
      'Tömeg-mértékegységben (pl. gramm, kg)'
    ],
    correctAnswer: 0,
    explanation: 'A felszín a határoló lapok területeinek összege, ezért mindig terület-mértékegységben (négyzetmértékben) mérjük.',
    hint: 'Mivel lapok (síkidomok) felületét adjuk össze, négyzetes mértékegység kell.',
    breakdown: [
      { label: 'Felszín fogalma', value: 'A testet határoló lapok területe' },
      { label: 'Mértékegység jellege', value: 'Terület-mértékegység (²)' },
      { label: 'Gyakori egységek', value: 'cm², dm², m²' }
    ]
  },

  // =========================================================================
  // 2. SZINT: VISSZASZÁMOLÁSOK, ÉLHOSSZAK, ÖSSZETETTEBB SZÁMÍTÁSOK (11-20)
  // =========================================================================
  {
    id: 'saq2-1',
    level: 2,
    prompt: 'Egy kocka felszíne 96 cm². Mennyi egyetlen lapjának a területe?',
    options: [
      '16 cm²',
      '24 cm²',
      '12 cm²',
      '8 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 6 egyenlő területe van. Egy lap területe: T_lap = A : 6 = 96 : 6 = 16 cm².',
    hint: 'Oszd el a felszínt a lapok számával (6-tal)!',
    breakdown: [
      { label: 'Kocka felszíne (A)', value: '96 cm²' },
      { label: 'Lapok száma', value: '6 db' },
      { label: 'Egy lap területe (A : 6)', value: '96 : 6 = 16 cm²' }
    ]
  },
  {
    id: 'saq2-2',
    level: 2,
    prompt: 'Egy kocka felszíne 96 cm². Milyen hosszú a kocka egy éle?',
    options: [
      '4 cm',
      '6 cm',
      '8 cm',
      '16 cm'
    ],
    correctAnswer: 0,
    explanation: 'Egy lap területe: 96 : 6 = 16 cm². Mivel a lap egy négyzet (a · a = 16), így az él hossza a = 4 cm (mert 4 · 4 = 16).',
    hint: 'Előbb keresd meg egy lap területét (96 : 6), majd azt, hogy melyik szám négyzete adja azt a számot!',
    breakdown: [
      { label: 'Egy lap területe', value: '96 : 6 = 16 cm²' },
      { label: 'Négyzet oldala (a · a = 16)', value: 'a = 4 cm' },
      { label: 'Kocka éle', value: '4 cm' }
    ]
  },
  {
    id: 'saq2-3',
    level: 2,
    prompt: 'Egy kocka felszíne 150 dm². Hány deciméter hosszú egy éle?',
    options: [
      '5 dm',
      '6 dm',
      '25 dm',
      '10 dm'
    ],
    correctAnswer: 0,
    explanation: 'Egy lap területe: 150 : 6 = 25 dm². Mivel 5 · 5 = 25, a kocka éle 5 dm.',
    hint: '150 : 6 = 25. Melyik szám szorozva önmagával ad 25-öt?',
    breakdown: [
      { label: 'Egy lap területe', value: '150 : 6 = 25 dm²' },
      { label: 'Melyik szám négyzete 25?', value: '5 · 5 = 25' },
      { label: 'Él hossza', value: '5 dm' }
    ]
  },
  {
    id: 'saq2-4',
    level: 2,
    prompt: 'Egy kocka éle 1 m. Hány dm² a felszíne?',
    options: [
      '600 dm²',
      '60 dm²',
      '6 dm²',
      '6000 dm²'
    ],
    correctAnswer: 0,
    explanation: '1 m = 10 dm. Egy lap területe: 10 dm · 10 dm = 100 dm². A kocka felszíne: 6 · 100 dm² = 600 dm² (vagy 6 m² = 600 dm²).',
    hint: '1 m² = 100 dm². A kocka felszíne 6 m², ezt kell átváltani dm²-be.',
    breakdown: [
      { label: 'Élhossz átváltása', value: '1 m = 10 dm' },
      { label: 'Egy lap területe', value: '10 dm · 10 dm = 100 dm²' },
      { label: 'Felszín', value: '6 · 100 dm² = 600 dm²' }
    ]
  },
  {
    id: 'saq2-5',
    level: 2,
    prompt: 'Egy téglatest élei: a = 5 cm, b = 20 mm, c = 3 cm. Mennyi a felszíne cm²-ben?',
    options: [
      '62 cm²',
      '31 cm²',
      '70 cm²',
      '300 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Először egyeztetjük a mértékegységeket: b = 20 mm = 2 cm. Így a lapok: a·b = 10 cm², a·c = 15 cm², b·c = 6 cm². A = 2 · (10 + 15 + 6) = 2 · 31 = 62 cm².',
    hint: 'Vigyázz a mértékegységekre! 20 mm hány centiméter?',
    breakdown: [
      { label: 'Élek cm-ben', value: 'a = 5 cm, b = 2 cm, c = 3 cm' },
      { label: 'Lapok területei', value: '10 cm², 15 cm², 6 cm²' },
      { label: 'Összegük', value: '10 + 15 + 6 = 31 cm²' },
      { label: 'Felszín (A = 2 · 31)', value: '62 cm²' }
    ]
  },
  {
    id: 'saq2-6',
    level: 2,
    prompt: 'Egy négyzet alapú téglatest alapéle a = 3 cm, magassága m = 10 cm. Mennyi a felszíne?',
    options: [
      '138 cm²',
      '120 cm²',
      '156 cm²',
      '90 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-32 h-36 mx-auto" viewBox="0 0 100 120">
        <rect x="25" y="25" width="40" height="70" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <polygon points="25,25 40,10 80,10 65,25" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="65,25 80,10 80,80 65,95" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <text x="45" y="60" textAnchor="middle" className="text-[10px] font-bold fill-pink-900">m = 10</text>
        <text x="45" y="108" textAnchor="middle" className="text-[10px] font-bold fill-pink-900">a = 3</text>
      </svg>
    ),
    explanation: '2 db négyzet alakú alaplap: 2 · (3 · 3) = 18 cm². 4 db téglalap alakú oldallap (palást): 4 · (3 · 10) = 120 cm². A = 18 + 120 = 138 cm².',
    hint: 'Az alja és teteje négyzet (3×3), a négy oldallapja pedig mind 3×10 cm-es téglalap!',
    breakdown: [
      { label: 'Két négyzet alaplap', value: '2 · (3 · 3) = 18 cm²' },
      { label: 'Négy oldallap (palást)', value: '4 · (3 · 10) = 120 cm²' },
      { label: 'Teljes felszín', value: '18 + 120 = 138 cm²' }
    ]
  },
  {
    id: 'saq2-7',
    level: 2,
    prompt: 'Ha egy kocka minden élét a kétszeresére növeljük, hányszorosára nő a felszíne?',
    options: [
      '4-szeresére (mert 2² = 4)',
      '2-szeresére',
      '6-szorosára',
      '8-szorosára'
    ],
    correctAnswer: 0,
    explanation: 'Ha az él 2-szeresére nő, egy négyzetlap területe 2 · 2 = 4-szeresére nő. Mivel mind a 6 lap területe 4-szeres lesz, a felszín is négyszeresére nő: A_új = 6 · (2a)² = 6 · 4a² = 4 · A_régi.',
    hint: 'A felszín terület jellegű mennyiség: ha a hosszúság 2-szeres, a terület 2² = 4-szeresére változik.',
    breakdown: [
      { label: 'Eredeti lap területe', value: 'a²' },
      { label: 'Új lap területe', value: '(2a) · (2a) = 4a²' },
      { label: 'Felszín növekedése', value: 'Pontosan 4-szeres' }
    ]
  },
  {
    id: 'saq2-8',
    level: 2,
    prompt: 'Egy kocka összes élének hossza 36 cm. Mennyi a kocka felszíne?',
    options: [
      '54 cm²',
      '27 cm²',
      '108 cm²',
      '36 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 12 éle van. Egy él hossza: a = 36 : 12 = 3 cm. A felszín: A = 6 · a² = 6 · 3² = 6 · 9 = 54 cm².',
    hint: 'A kockának 12 egyforma éle van. Először számold ki egy élét: 36 : 12.',
    breakdown: [
      { label: 'Élek száma', value: '12 db' },
      { label: 'Egy él hossza', value: '36 cm : 12 = 3 cm' },
      { label: 'Egy lap területe', value: '3 · 3 = 9 cm²' },
      { label: 'Kocka felszíne', value: '6 · 9 = 54 cm²' }
    ]
  },
  {
    id: 'saq2-9',
    level: 2,
    prompt: 'Egy kocka 12 élének összege 24 cm. Mennyi a felszíne?',
    options: [
      '24 cm²',
      '16 cm²',
      '48 cm²',
      '12 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Egy él hossza: 24 : 12 = 2 cm. Egy lap területe: 2 · 2 = 4 cm². A felszín: A = 6 · 4 = 24 cm².',
    hint: 'Él = 24 : 12 = 2 cm. Ezután A = 6 · 2 · 2.',
    breakdown: [
      { label: 'Egy él hossza', value: '24 : 12 = 2 cm' },
      { label: 'Egy lap területe', value: '2 · 2 = 4 cm²' },
      { label: 'Felszíne', value: '6 · 4 = 24 cm²' }
    ]
  },
  {
    id: 'saq2-10',
    level: 2,
    prompt: 'Egy téglatest két éle: a = 4 cm, b = 6 cm. Felszíne 88 cm². Mennyi a harmadik él (c) hossza?',
    options: [
      '2 cm',
      '3 cm',
      '4 cm',
      '1 cm'
    ],
    correctAnswer: 0,
    explanation: 'A = 2 · (ab + ac + bc) = 88 cm² -> ab + ac + bc = 44 cm². Tudjuk: ab = 4 · 6 = 24 cm². Így ac + bc = 44 - 24 = 20 cm². Mivel ac + bc = c · (4 + 6) = 10 · c = 20 cm², ezért c = 2 cm.',
    hint: 'A 3 lap összege a felszín fele: 88 : 2 = 44 cm². Ebből az alaplap 4·6 = 24 cm².',
    breakdown: [
      { label: 'Három különböző lap összege', value: '88 : 2 = 44 cm²' },
      { label: 'Ismert alaplap területe (a · b)', value: '4 · 6 = 24 cm²' },
      { label: 'A maradék két lap összege', value: '44 - 24 = 20 cm²' },
      { label: 'Harmadik él (20 : (4 + 6))', value: '20 : 10 = 2 cm' }
    ]
  },

  // =========================================================================
  // 3. SZINT: NYITOTT DOBOZOK, ÖSSZETETT TESTEK, SZÖVEGES FELADATOK (21-30)
  // =========================================================================
  {
    id: 'saq3-1',
    level: 3,
    prompt: 'Egy felül nyitott téglatest alakú akvárium méretei: a = 40 cm, b = 25 cm, magassága c = 20 cm. Hány cm² üvegre van szükség az elkészítéséhez?',
    options: [
      '3600 cm²',
      '4600 cm²',
      '2600 cm²',
      '1800 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-32 mx-auto" viewBox="0 0 150 100">
        {/* Nyitott tetejű akvárium vizuálisan */}
        <rect x="25" y="40" width="70" height="40" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeDasharray="none" />
        <polygon points="25,40 45,20 115,20 95,40" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />
        <polygon points="95,40 115,20 115,60 95,80" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
        <text x="60" y="32" textAnchor="middle" className="text-[10px] font-bold fill-sky-800">NYITOTT TETŐ</text>
        <text x="60" y="65" textAnchor="middle" className="text-[11px] font-bold fill-sky-950">5 LAP!</text>
      </svg>
    ),
    explanation: 'Az akvárium felül nyitott, így csak 1 fenéklapja és 4 oldallapja van (összesen 5 lap). Alaplap: 40 · 25 = 1000 cm². Két elülső-hátsó: 2 · (40 · 20) = 1600 cm². Két oldalsó: 2 · (25 · 20) = 1000 cm². Összesen: 1000 + 1600 + 1000 = 3600 cm².',
    hint: 'Gondold át: a nyitott akváriumnak nincs fedele, így az alaplapot (a · b) csak egyszer számoljuk!',
    breakdown: [
      { label: '1 db alaplap (40 · 25)', value: '1000 cm²' },
      { label: '2 db elülső-hátsó lap (2 · 40 · 20)', value: '1600 cm²' },
      { label: '2 db oldallap (2 · 25 · 20)', value: '1000 cm²' },
      { label: 'Összes üvegfelület (5 lap)', value: '3600 cm²' }
    ]
  },
  {
    id: 'saq3-2',
    level: 3,
    prompt: 'Kocka alakú, felül nyitott (fedél nélküli) papírdobozt készítünk. Éle a = 10 cm. Hány cm² kartonpapír kell hozzá?',
    options: [
      '500 cm²',
      '600 cm²',
      '400 cm²',
      '1000 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a doboz felül nyitott, 6 helyett csak 5 darab négyzetlapja van. Egy lap területe: 10 · 10 = 100 cm². Felszín: 5 · 100 = 500 cm².',
    hint: 'A zárt kocka felszíne 6 · a², de ha nincs teteje, csak 5 lap kell!',
    breakdown: [
      { label: 'Lapok száma tető nélkül', value: '5 db' },
      { label: 'Egy négyzet területe', value: '10 · 10 = 100 cm²' },
      { label: 'Szükséges papír (5 · 100)', value: '500 cm²' }
    ]
  },
  {
    id: 'saq3-3',
    level: 3,
    prompt: 'Két darab egybevágó, 2 cm élű kockát összeragasztunk egy lapjuk mentén egy téglatestté. Mennyi a keletkezett téglatest felszíne?',
    options: [
      '40 cm²',
      '48 cm²',
      '44 cm²',
      '36 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-48 h-28 mx-auto" viewBox="0 0 160 80">
        <rect x="20" y="30" width="40" height="35" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.5" />
        <rect x="60" y="30" width="40" height="35" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="20,30 35,15 115,15 100,30" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="100,30 115,15 115,50 100,65" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
        <line x1="60" y1="30" x2="75" y2="15" stroke="#db2777" strokeWidth="1.5" strokeDasharray="2,2" />
        <line x1="60" y1="30" x2="60" y2="65" stroke="#db2777" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="80" y="75" textAnchor="middle" className="text-[9px] font-bold fill-pink-950">2 ragasztott belső lap eltűnik!</text>
      </svg>
    ),
    explanation: 'Két külön kocka: 2 · 6 = 12 lap. Az összeragasztáskor 2 lap érintkezik egymással és a test belsejébe kerül, így a felszínen 12 - 2 = 10 darab 2×2-es lap marad: 10 · 4 cm² = 40 cm². (Vagy méretek: 4×2×2 cm -> 2·(8 + 8 + 4) = 40 cm²).',
    hint: 'Gondold át: hány négyzetlap marad kívül? Két külön kockánál 12, de összeragasztáskor 2 lap elvész!',
    breakdown: [
      { label: 'Két különálló kocka lapjai', value: '2 · 6 = 12 db lap' },
      { label: 'Összeragasztásnál eltűnő lapok', value: '2 db belső lap' },
      { label: 'Kívül maradó lapok száma', value: '10 db lap' },
      { label: 'Egy lap területe (2 · 2)', value: '4 cm²' },
      { label: 'Új test felszíne', value: '10 · 4 = 40 cm²' }
    ]
  },
  {
    id: 'saq3-4',
    level: 3,
    prompt: 'Három darab 3 cm élű kockát egymás mellé ragasztunk egy sorban egy téglatestté. Mennyi lesz az új téglatest felszíne?',
    options: [
      '126 cm²',
      '162 cm²',
      '144 cm²',
      '108 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A 3 kockának összesen 3 · 6 = 18 lapja van. Két ragasztási felület van, mindkettőnél 2 lap válik belsővé (összesen 4 belső lap). Így kívül 18 - 4 = 14 darab négyzetlap marad. Egy lap területe 3 · 3 = 9 cm². A felszín: 14 · 9 = 126 cm².',
    hint: 'A keletkező téglatest élei: 9 cm, 3 cm és 3 cm. Vagy számolj a kívül maradó 14 négyzetlappal!',
    breakdown: [
      { label: 'Keletkező téglatest élei', value: 'a = 9 cm, b = 3 cm, c = 3 cm' },
      { label: 'Felszíne képlettel', value: '2 · (9·3 + 9·3 + 3·3)' },
      { label: 'Részszámítás', value: '2 · (27 + 27 + 9) = 2 · 63' },
      { label: 'Teljes felszín', value: '126 cm²' }
    ]
  },
  {
    id: 'saq3-5',
    level: 3,
    prompt: 'Egy szoba hossza 5 m, szélessége 4 m, magassága 3 m. Kifestjük a 4 falat és a mennyezetet (a padlót nem!). Hány m² a festendő felület?',
    options: [
      '74 m²',
      '94 m²',
      '54 m²',
      '60 m²'
    ],
    correctAnswer: 0,
    explanation: 'Mennyezet (alaplap): 5 · 4 = 20 m². A 4 fal (palást): 2 · (5 · 3 + 4 · 3) = 2 · (15 + 12) = 54 m². Összesen festendő: 20 + 54 = 74 m².',
    hint: 'A mennyezet 1 db téglalap (5×4), a négy fal pedig 2 db (5×3) és 2 db (4×3). A padlót ne számold hozzá!',
    breakdown: [
      { label: 'Mennyezet területe (5 · 4)', value: '20 m²' },
      { label: '2 hosszanti fal (2 · 5 · 3)', value: '30 m²' },
      { label: '2 rövid fal (2 · 4 · 3)', value: '24 m²' },
      { label: 'Összes festendő felület', value: '20 + 30 + 24 = 74 m²' }
    ]
  },
  {
    id: 'saq3-6',
    level: 3,
    prompt: 'Egy kocka éleit a 3-szorosára növeljük. Hányszorosára növekszik meg a kocka felszíne?',
    options: [
      '9-szeresére (mert 3² = 9)',
      '3-szorosára',
      '6-szorosára',
      '27-szeresére'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a lapok négyzetek, ha az él 3-szorosára nő, a lapok területe 3² = 9-szeresére nő. Így a teljes felszín is 9-szeresére nő: A_új = 6 · (3a)² = 6 · 9a² = 9 · (6a²).',
    hint: 'A felszín a hosszak négyzetével arányos!',
    breakdown: [
      { label: 'Eredeti felszín', value: 'A = 6 · a²' },
      { label: 'Új élhossz', value: '3 · a' },
      { label: 'Új felszín', value: '6 · (3a)² = 6 · 9a² = 54a²' },
      { label: 'Arány (54a² : 6a²)', value: '9-szeres' }
    ]
  },
  {
    id: 'saq3-7',
    level: 3,
    prompt: 'Egy 20 cm × 15 cm × 10 cm-es díszdobozt csomagolópapírral vonunk be. Ráhajtásra 10% többletet számolunk. Hány cm² papír szükséges?',
    options: [
      '1430 cm²',
      '1300 cm²',
      '1500 cm²',
      '1200 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A doboz felszíne: A = 2 · (20·15 + 20·10 + 15·10) = 2 · (300 + 200 + 150) = 2 · 650 = 1300 cm². A 10% ráhagyás: 1300 · 0,1 = 130 cm². Összes papír: 1300 + 130 = 1430 cm².',
    hint: 'Először számold ki a doboz pontos felszínét, majd add hozzá a tizedét (10%-át)!',
    breakdown: [
      { label: 'Doboz felszíne', value: '2 · (300 + 200 + 150) = 1300 cm²' },
      { label: '10% ráhagyás', value: '130 cm²' },
      { label: 'Szükséges papírmennyiség', value: '1300 + 130 = 1430 cm²' }
    ]
  },
  {
    id: 'saq3-8',
    level: 3,
    prompt: 'Egy 3 cm élű nagy kocka minden lapját pirosra festjük, majd szétvágjuk 1 cm élű kis kockákra (27 db). Hány olyan kis kocka keletkezik, amelynek PONTOSAN 3 LAPJA piros?',
    options: [
      '8 darab (a nagy kocka 8 csúcsánál lévők)',
      '12 darab',
      '6 darab',
      '4 darab'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 110 110">
        {/* 3x3x3 grid visualization with colored corners */}
        <rect x="25" y="35" width="45" height="45" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <polygon points="25,35 45,15 90,15 70,35" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
        <polygon points="70,35 90,15 90,60 70,80" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
        {/* highlight corner vertices */}
        {[
          [25, 35], [70, 35], [70, 80], [25, 80],
          [45, 15], [90, 15], [90, 60], [45, 60]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#991b1b" />
        ))}
        <text x="55" y="102" textAnchor="middle" className="text-[9px] font-bold fill-red-950">A 8 sarok-kockának 3 lapja piros</text>
      </svg>
    ),
    explanation: 'Pontosan a nagy kocka 8 csúcsánál lévő kis kockák érintkeznek 3 határoló lappal. Ezért pontosan 8 db olyan kis kocka lesz, aminek 3 lapja piros.',
    hint: 'Gondold át, a test melyik része érintkezik egyszerre három külső síkkal: a sarkok (csúcsok)!',
    breakdown: [
      { label: '3 festett lapú kiskockák helye', value: 'A csúcsoknál (sarkoknál)' },
      { label: 'Csúcsok száma a kockánál', value: '8 darab' },
      { label: '3 festett lapú kiskockák', value: '8 db' }
    ]
  },
  {
    id: 'saq3-9',
    level: 3,
    prompt: 'Ugyanebből a szétvágott festett kockából (3×3×3) hány olyan kis kocka lesz, amelynek EGYETLEN LAPJA SINCS befestve?',
    options: [
      '1 darab (a legbelső kocka)',
      '0 darab',
      '3 darab',
      '6 darab'
    ],
    correctAnswer: 0,
    explanation: 'A 3×3×3-as kocka belsejében pontosan (3 - 2) · (3 - 2) · (3 - 2) = 1 · 1 · 1 = 1 darab kiskocka rejtőzik, amelyet minden oldalról másik kiskockák vesznek körül, így nem érintkezett festékkel.',
    hint: 'A külső réteget ha lehántod, mi marad legbelül?',
    breakdown: [
      { label: 'Összes kis kocka', value: '3 · 3 · 3 = 27 db' },
      { label: 'Külső réteg vastagsága', value: '1-1 kocka minden oldalon' },
      { label: 'Belső festetlen mag mérete', value: '(3-2) · (3-2) · (3-2) = 1 db' }
    ]
  },
  {
    id: 'saq3-10',
    level: 3,
    prompt: 'Egy 5 cm élű tömör fa kocka egyik sarkából kivágunk egy 1 cm élű kis kockát. Hogyan változik a fa test felszíne?',
    options: [
      'Nem változik (pontosan ugyanannyi marad)',
      'Csökken 3 cm²-rel',
      'Nő 3 cm²-rel',
      'Csökken 6 cm²-rel'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 120 120">
        <rect x="25" y="35" width="50" height="50" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
        <polygon points="25,35 45,15 95,15 75,35" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="75,35 95,15 95,65 75,85" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        {/* sarok kivágás jobb felső elülső */}
        <rect x="63" y="35" width="12" height="12" fill="#fff" stroke="#db2777" strokeWidth="1.5" />
        <polygon points="63,35 69,29 81,29 75,35" fill="#fff" stroke="#db2777" strokeWidth="1" />
        <polygon points="75,35 81,29 81,41 75,47" fill="#fff" stroke="#db2777" strokeWidth="1" />
        <text x="60" y="105" textAnchor="middle" className="text-[9px] font-bold fill-pink-950">3 kieső lap = 3 új belső lap!</text>
      </svg>
    ),
    explanation: 'A sarok kivágásával elveszítünk 3 db 1 cm²-es külső négyzetlapot, viszont a kivágás helyén pontosan 3 db ugyanolyan 1 cm²-es új belső lap keletkezik. Így a teljes felszín változatlan marad!',
    hint: 'Számold meg: hány lap esett ki a sarokból, és hány új felület jött létre a bemetszés helyén?',
    breakdown: [
      { label: 'Elveszített felület', value: '3 db 1 cm²-es lap (-3 cm²)' },
      { label: 'Újonnan létrejött felület', value: '3 db 1 cm²-es lap (+3 cm²)' },
      { label: 'Eredmény', value: 'A felszín NEM változik (+0 cm²)' }
    ]
  }
];

export const SurfaceAreaQuiz: React.FC<SurfaceAreaQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="Téglatest és kocka felszíne kvíz"
      subtitle="Teszteld tudásodat a téglatest és a kocka felszínének kiszámításáról, nyitott dobozokról és hálókról 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 6. KVÍZ"
      storageKey="g5-meas-surface-area-quiz"
      questions={SURFACE_AREA_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <SurfaceAreaMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <SurfaceAreaSorter
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheets={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-pink-700 dark:text-pink-400">1. Szint Puskája: Képletek</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
                <strong>Kocka felszíne:</strong><br />
                <code className="text-pink-600 font-bold">A = 6 · a²</code>
              </div>
              <div className="p-2 rounded bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
                <strong>Téglatest felszíne:</strong><br />
                <code className="text-pink-600 font-bold">A = 2·(ab + ac + bc)</code>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              A felszín a határoló lapok területeinek összege. Mértékegysége négyzetes (pl. cm², dm², m²).
            </p>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-pink-700 dark:text-pink-400">2. Szint Puskája: Visszaszámolás és négyzetes oszlop</div>
            <div className="p-2 rounded bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
              <div>• <strong>Kocka lapja felszínből:</strong> T_lap = A : 6</div>
              <div>• <strong>Kocka éle:</strong> a = √T_lap (melyik szám négyzete adja a lap területét)</div>
              <div>• <strong>Négyzetes oszlop (a, a, m):</strong> A = 2 · a² + 4 · (a · m)</div>
              <div>• <strong>Élek megduplázása:</strong> A felszín 4-szeresére (2² = 4) nő!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-pink-700 dark:text-pink-400">3. Szint Puskája: Nyitott dobozok és összetett testek</div>
            <div className="p-2 rounded bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 space-y-1">
              <div>• <strong>Nyitott akvárium (5 lap):</strong> A = a·b + 2·(a·c + b·c) (nincs tető!)</div>
              <div>• <strong>Nyitott kockadoboz (5 lap):</strong> A = 5 · a²</div>
              <div>• <strong>Kockák összeragasztásakor:</strong> minden ragasztásnál 2 lap a test belsejébe kerül!</div>
              <div>• <strong>Sarok kivágása:</strong> A keletkező 3 belső lap pont pótolja a 3 kiesőt, így a felszín változatlan!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
