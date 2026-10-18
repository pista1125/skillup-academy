import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { CuboidCubeMatcher } from './CuboidCubeMatcher';
import { CuboidCubeSorter } from './CuboidCubeSorter';

export interface CuboidCubeQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CUBOID_CUBE_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, CSÚCSOK, ÉLEK, LAPOK SZÁMA ÉS ALAKJA (1-10)
  // =========================================================================
  {
    id: 'ccq1-1',
    level: 1,
    prompt: 'Hány csúcsa van egy téglatestnek?',
    options: [
      '8 csúcsa',
      '6 csúcsa',
      '12 csúcsa',
      '4 csúcsa'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-36 mx-auto" viewBox="0 0 140 110">
        <rect x="20" y="45" width="70" height="40" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
        <polygon points="20,45 40,25 110,25 90,45" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
        <polygon points="90,45 110,25 110,65 90,85" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5" />
        {/* 8 csúcs piros pontként */}
        {[
          [20, 45], [90, 45], [90, 85], [20, 85],
          [40, 25], [110, 25], [110, 65], [40, 65]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#dc2626" />
        ))}
        <text x="70" y="105" textAnchor="middle" className="text-[9px] font-black fill-purple-950">4 alsó + 4 felső sarok = 8 csúcs</text>
      </svg>
    ),
    explanation: 'A téglatestnek 8 csúcsa (sarka) van: 4 csúcs az alsó lapon és 4 csúcs a felső lapon.',
    hint: 'Számold meg a sarkokat: alul 4 sarok, felül 4 sarok!',
    breakdown: [
      { label: 'Alsó lap sarkai', value: '4 csúcs' },
      { label: 'Felső lap sarkai', value: '4 csúcs' },
      { label: 'Összes csúcs száma', value: '8 db' }
    ]
  },
  {
    id: 'ccq1-2',
    level: 1,
    prompt: 'Hány éle van egy kockának?',
    options: [
      '12 éle',
      '8 éle',
      '6 éle',
      '16 éle'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 12 éle van: 4 él határolja az alsó lapot, 4 él a felső lapot, és 4 függőleges él köti össze őket.',
    hint: 'Gondolj a drótvázra: 4 alul, 4 felül, és 4 oszlop.',
    breakdown: [
      { label: 'Alaplap élei', value: '4 él' },
      { label: 'Fedőlap élei', value: '4 él' },
      { label: 'Oldalélek (oszlopok)', value: '4 él' },
      { label: 'Összes él', value: '12 db' }
    ]
  },
  {
    id: 'ccq1-3',
    level: 1,
    prompt: 'Hány határoló lapja van egy téglatestnek?',
    options: [
      '6 lapja',
      '8 lapja',
      '12 lapja',
      '4 lapja'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestet pontosan 6 darab síklap (téglalap) határolja: alaplap, fedőlap, és 4 oldallap (mint a játékkockán 1-től 6-ig).',
    hint: 'Gondolj a dobókockára: hány számozott oldala van?',
    breakdown: [
      { label: 'Alap- és fedőlap', value: '2 lap' },
      { label: 'Oldallapok', value: '4 lap' },
      { label: 'Összes lap', value: '6 db' }
    ]
  },
  {
    id: 'ccq1-4',
    level: 1,
    prompt: 'Milyen síkidomok határolják a kockát?',
    options: [
      '6 darab egybevágó négyzet',
      '6 darab különböző téglalap',
      '8 darab háromszög',
      '4 darab négyzet és 2 darab téglalap'
    ],
    correctAnswer: 0,
    explanation: 'A kocka szabályos test, minden határoló lapja pontosan egyforma (egybevágó) négyzet.',
    hint: 'A játékkocka minden oldala szabályos négyzet.',
    breakdown: [
      { label: 'Határoló lapok száma', value: '6 db' },
      { label: 'Lapok alakja', value: 'Egybevágó négyzetek' }
    ]
  },
  {
    id: 'ccq1-5',
    level: 1,
    prompt: 'Milyen síkidomok határolják a téglatestet?',
    options: [
      '6 darab téglalap (páronként egybevágók)',
      '6 darab szabályos hatszög',
      '12 darab háromszög',
      '8 darab négyzet'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestet 6 téglalaplap határolja, amelyek szemközti lapjai páronként egybevágók és párhuzamosak.',
    hint: 'Egy gyufásdoboz felülete téglalapokból áll.',
    breakdown: [
      { label: 'Lapok száma', value: '6 db' },
      { label: 'Lapok típusa', value: 'Téglalapok (3 pár egybevágó lap)' }
    ]
  },
  {
    id: 'ccq1-6',
    level: 1,
    prompt: 'Hány él találkozik a téglatest egyetlen csúcsában?',
    options: [
      '3 él',
      '4 él',
      '2 él',
      '6 él'
    ],
    correctAnswer: 0,
    explanation: 'Minden csúcsból 3 él indul ki a 3 térbeli dimenzió mentén: hosszúság (a), szélesség (b) és magasság (c).',
    hint: 'Nézd meg a szobád egyik sarkát: hány él fut össze benne (2 fal találkozása és a padló)?',
    breakdown: [
      { label: 'Csúcsból kiinduló élek', value: '3 db (a, b, c)' },
      { label: 'Élek hajlásszöge', value: 'Páronként 90° (derékszög)' }
    ]
  },
  {
    id: 'ccq1-7',
    level: 1,
    prompt: 'Igaz vagy hamis az alábbi állítás: „Minden kocka téglatest.”?',
    options: [
      'IGAZ',
      'HAMIS'
    ],
    correctAnswer: 0,
    explanation: 'IGAZ, mert a kocka olyan speciális téglatest, melynek minden éle egyenlő hosszúságú (a négyzet is speciális téglalap).',
    hint: 'Gondolj a síkbeli párjára: minden négyzet téglalap!',
    breakdown: [
      { label: 'Téglatest definíciója', value: '6 téglalappal határolt derékszögű test' },
      { label: 'Kocka lapjai', value: 'Négyzetek (amelyek szintén téglalapok)' },
      { label: 'Következtetés', value: 'A kocka valóban téglatest' }
    ]
  },
  {
    id: 'ccq1-8',
    level: 1,
    prompt: 'Igaz vagy hamis az alábbi állítás: „Minden téglatest kocka.”?',
    options: [
      'HAMIS',
      'IGAZ'
    ],
    correctAnswer: 0,
    explanation: 'HAMIS! Egy átlagos téglatest (pl. cipősdoboz) élei különböző hosszúságúak, lapjai pedig téglalapok, így nem kocka.',
    hint: 'Vajon egy cipősdoboz vagy könyv kocka alakú?',
    breakdown: [
      { label: 'Ellentmondás', value: 'A cipősdoboz élei eltérőek (a ≠ b ≠ c)' },
      { label: 'Eredmény', value: 'Nem minden téglatest kocka' }
    ]
  },
  {
    id: 'ccq1-9',
    level: 1,
    prompt: 'Hány négyzetből áll a kocka síkbeli hálója?',
    options: [
      '6 négyzetből',
      '8 négyzetből',
      '12 négyzetből',
      '4 négyzetből'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a kockának 6 határoló lapja van, a kiterített síkbeli hálója pontosan 6 darab egybevágó négyzetből áll.',
    hint: 'Hány lapja van a kockának?',
    breakdown: [
      { label: 'Kocka lapjai', value: '6 db négyzet' },
      { label: 'Háló elemei', value: 'Pontosan 6 db négyzet' }
    ]
  },
  {
    id: 'ccq1-10',
    level: 1,
    prompt: 'Milyen vonallal rajzoljuk a téglatest axonometrikus ábráján a takart (nem látható) éleket?',
    options: [
      'Szaggatott vonallal',
      'Vastag folytonos vonallal',
      'Hullámos vonallal',
      'Piros nyíllal'
    ],
    correctAnswer: 0,
    explanation: 'A térbeli rajzokon a test hátsó, takarásban lévő éleit szaggatott vonallal jelöljük, a láthatóakat pedig folytonos vonallal.',
    hint: 'Hogyan jelölöd a füzetben azt, ami a doboz mögött / alatt van?',
    breakdown: [
      { label: 'Látható élek', value: 'Folytonos vonal' },
      { label: 'Takart élek', value: 'Szaggatott vonal' }
    ]
  },

  // =========================================================================
  // 2. SZINT: ÉLEK ÖSSZHOSSZA ÉS GEOMETRIAI KAPCSOLATOK (11-20)
  // =========================================================================
  {
    id: 'ccq2-1',
    level: 2,
    prompt: 'Mennyi egy a = 5 cm élű kocka éleinek összhossza?',
    options: [
      '60 cm',
      '30 cm',
      '20 cm',
      '125 cm'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 12 egyenlő éle van. Így az élek összhossza: Ö_é = 12 · a = 12 · 5 cm = 60 cm.',
    hint: 'Hány éle van a kockának? 12. Mennyi 12 · 5?',
    breakdown: [
      { label: 'Élek száma', value: '12 db' },
      { label: 'Egy él hossza', value: 'a = 5 cm' },
      { label: 'Élek összhossza', value: '12 · 5 = 60 cm' }
    ]
  },
  {
    id: 'ccq2-2',
    level: 2,
    prompt: 'Egy téglatest élei a = 6 cm, b = 4 cm és c = 2 cm. Mennyi az éleinek összhossza?',
    options: [
      '48 cm',
      '12 cm',
      '24 cm',
      '96 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mindhárom élből 4 darab van a téglatestben: Ö_é = 4 · (a + b + c) = 4 · (6 + 4 + 2) = 4 · 12 = 48 cm.',
    hint: 'Add össze a három különböző élet (6 + 4 + 2 = 12), majd szorozd meg 4-gyel!',
    breakdown: [
      { label: 'Három él összege', value: '6 + 4 + 2 = 12 cm' },
      { label: 'Szorzás 4-gyel', value: '4 · 12 = 48 cm' }
    ]
  },
  {
    id: 'ccq2-3',
    level: 2,
    prompt: 'Egy kocka éleinek összhossza 84 cm. Milyen hosszú egyetlen éle (a)?',
    options: [
      'a = 7 cm',
      'a = 14 cm',
      'a = 8 cm',
      'a = 6 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a kockának 12 egyenlő éle van: a = Ö_é : 12 = 84 cm : 12 = 7 cm.',
    hint: 'Oszd el a 84-et 12-vel: 84 : 12 = ?',
    breakdown: [
      { label: 'Élek összhossza', value: '84 cm' },
      { label: 'Élek száma', value: '12 db' },
      { label: 'Egy él hossza', value: '84 : 12 = 7 cm' }
    ]
  },
  {
    id: 'ccq2-4',
    level: 2,
    prompt: 'Egy téglatest alakú díszdoboz élvázát drótból forrasztják össze. Élei: 10 cm, 5 cm és 3 cm. Hány cm drót kell a teljes vázhoz?',
    options: [
      '72 cm',
      '18 cm',
      '36 cm',
      '150 cm'
    ],
    correctAnswer: 0,
    explanation: 'A drótvázhoz az élek összhossza szükséges: 4 · (10 + 5 + 3) = 4 · 18 = 72 cm.',
    hint: '4 · (a + b + c) = 4 · 18 = ?',
    breakdown: [
      { label: 'a + b + c', value: '10 + 5 + 3 = 18 cm' },
      { label: '4-szeres szorzat', value: '4 · 18 = 72 cm' }
    ]
  },
  {
    id: 'ccq2-5',
    level: 2,
    prompt: 'Hány pár egymással szemközti, párhuzamos lapja van a téglatestnek?',
    options: [
      '3 pár lap',
      '6 pár lap',
      '2 pár lap',
      '4 pár lap'
    ],
    correctAnswer: 0,
    explanation: 'A 6 lap 3 párt alkot: alsó-felső lap, jobb-bal oldallap, elülső-hátsó lap. Ezek a párok egymással párhuzamosak és egybevágók.',
    hint: '6 lap hány párt jelent? 6 : 2 = ?',
    breakdown: [
      { label: '1. pár', value: 'Alaplap és fedőlap' },
      { label: '2. pár', value: 'Jobb és bal oldallap' },
      { label: '3. pár', value: 'Elülső és hátsó lap' }
    ]
  },
  {
    id: 'ccq2-6',
    level: 2,
    prompt: 'Egy kocka egyetlen határoló lapjának területe 36 cm². Mennyi a kocka éleinek összhossza?',
    options: [
      '72 cm',
      '36 cm',
      '48 cm',
      '24 cm'
    ],
    correctAnswer: 0,
    explanation: 'A lap egy négyzet: T = a · a = 36 cm² ⟹ a = 6 cm. A 12 él összhossza: 12 · 6 cm = 72 cm.',
    hint: 'Ha a négyzet területe 36, az oldala 6 cm. Mennyi 12 · 6?',
    breakdown: [
      { label: 'Egy lap területe', value: 'a · a = 36 cm² ⟹ a = 6 cm' },
      { label: 'Élek összhossza', value: '12 · 6 = 72 cm' }
    ]
  },
  {
    id: 'ccq2-7',
    level: 2,
    prompt: 'Egy téglatest két éle a = 8 cm és b = 5 cm. Az élek összhossza 68 cm. Milyen hosszú a harmadik él (c)?',
    options: [
      'c = 4 cm',
      'c = 17 cm',
      'c = 6 cm',
      'c = 3 cm'
    ],
    correctAnswer: 0,
    explanation: 'Négy darab (a + b + c) összege 68, így a + b + c = 68 : 4 = 17 cm. Ebből c = 17 - (8 + 5) = 17 - 13 = 4 cm.',
    hint: 'Oszd el a 68-at 4-gyel (17), majd vond ki belőle a 8-at és az 5-öt!',
    breakdown: [
      { label: 'a + b + c összege', value: '68 : 4 = 17 cm' },
      { label: 'Ismert élek összege', value: '8 + 5 = 13 cm' },
      { label: 'Harmadik él (c)', value: '17 - 13 = 4 cm' }
    ]
  },
  {
    id: 'ccq2-8',
    level: 2,
    prompt: 'Hány fokos szöget zár be egymással a kocka két szomszédos éle, amelyek egy csúcsban találkoznak?',
    options: [
      '90° (derékszög)',
      '60°',
      '45°',
      '180°'
    ],
    correctAnswer: 0,
    explanation: 'A kocka lapjai négyzetek, ezért a szomszédos élek mindig pontosan 90 fokos derékszöget zárnak be egymással.',
    hint: 'A négyzet minden sarka derékszög.',
    breakdown: [
      { label: 'Négyzet szögei', value: 'Mind 90°-osak' },
      { label: 'Élek hajlásszöge', value: 'Derékszög (90°)' }
    ]
  },
  {
    id: 'ccq2-9',
    level: 2,
    prompt: 'Egy kocka éle a = 10 dm. Hány méter az éleinek összhossza?',
    options: [
      '12 méter',
      '120 méter',
      '1,2 méter',
      '10 méter'
    ],
    correctAnswer: 0,
    explanation: 'Élek összhossza deciméterben: 12 · 10 dm = 120 dm. Átváltva méterbe: 120 dm = 12 m.',
    hint: '10 dm = 1 méter. Hány méter a 12 darab 1 méteres él együtt?',
    breakdown: [
      { label: 'Oldalél méterben', value: '10 dm = 1 m' },
      { label: '12 él összhossza', value: '12 · 1 m = 12 m' }
    ]
  },
  {
    id: 'ccq2-10',
    level: 2,
    prompt: 'Hány darab lap találkozik pontosan egyetlen él mentén a téglatestnél?',
    options: [
      '2 lap',
      '3 lap',
      '4 lap',
      '1 lap'
    ],
    correctAnswer: 0,
    explanation: 'Bármelyik él pontosan két szomszédos lap közös metszésvonala.',
    hint: 'Gondolj a könyv gerincére: két oldal találkozik benne.',
    breakdown: [
      { label: 'Él fogalma', value: 'Két lap közös határa' },
      { label: 'Találkozó lapok száma', value: 'Mindig 2 db' }
    ]
  },

  // =========================================================================
  // 3. SZINT: SÍKBELI HÁLÓK, ÖSSZETETT VÁZAK ÉS TÉRBELI LOGIKA (21-30)
  // =========================================================================
  {
    id: 'ccq3-1',
    level: 3,
    prompt: 'Egy kocka síkbeli hálójában egyetlen sorban legfeljebb hány négyzet állhat egymás mellett ahhoz, hogy összehajtható legyen?',
    options: [
      'Legfeljebb 4 négyzet',
      'Legfeljebb 5 négyzet',
      'Legfeljebb 3 négyzet',
      'Mind a 6 négyzet egymás mellett lehet'
    ],
    correctAnswer: 0,
    explanation: 'A kocka 4 oldallapja körbeér, az 5. és 6. lap pedig alul és felül zárja a dobozt. Ha 5 négyzet lenne egy sorban, átfedés keletkezne!',
    hint: 'Hány oldallapja van a kockának a palástján körben? Pontosan 4!',
    breakdown: [
      { label: 'Körbefutó lapok', value: '4 db oldallap' },
      { label: 'Alsó és felső lap', value: '1-1 db a sor mellett' },
      { label: 'Maximum egy sorban', value: '4 db négyzet' }
    ]
  },
  {
    id: 'ccq3-2',
    level: 3,
    prompt: 'Egy 6 cm × 4 cm × 3 cm méretű téglatestnek mekkora a legkisebb területű lapja?',
    options: [
      '12 cm²',
      '18 cm²',
      '24 cm²',
      '7 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A 3 lehetséges lapméret: 6 · 4 = 24 cm², 6 · 3 = 18 cm², és 4 · 3 = 12 cm². A legkisebb terület a két legrövidebb él szorzata: 4 · 3 = 12 cm².',
    hint: 'Szorozd össze a két legrövidebb élet: 4 cm és 3 cm.',
    breakdown: [
      { label: '1. lap területe', value: '6 · 4 = 24 cm²' },
      { label: '2. lap területe', value: '6 · 3 = 18 cm²' },
      { label: '3. lap (legkisebb)', value: '4 · 3 = 12 cm²' }
    ]
  },
  {
    id: 'ccq3-3',
    level: 3,
    prompt: 'Egy téglatest alakú akvárium méretei: hossza 80 cm, szélessége 40 cm, magassága 50 cm. Mind a 12 élét fém díszléccel szeretnénk megerősíteni. Hány méter fémkeret szükséges?',
    options: [
      '6,8 méter',
      '1,7 méter',
      '3,4 méter',
      '13,6 méter'
    ],
    correctAnswer: 0,
    explanation: 'Élek összhossza: 4 · (80 + 40 + 50) = 4 · 170 cm = 680 cm. Átváltva méterbe: 680 : 100 = 6,8 méter.',
    hint: 'Számold ki az élhossz-összeget (4 · 170 = 680 cm), majd váltsd át méterbe!',
    breakdown: [
      { label: 'Három él összege', value: '80 + 40 + 50 = 170 cm' },
      { label: 'Élek összhossza cm-ben', value: '4 · 170 = 680 cm' },
      { label: 'Átváltás méterbe', value: '680 cm = 6,8 m' }
    ]
  },
  {
    id: 'ccq3-4',
    level: 3,
    prompt: 'Egy kocka éleinek összhossza 96 cm. Mekkora a kocka egyetlen határoló lapjának a kerülete (K)?',
    options: [
      'K = 32 cm',
      'K = 64 cm',
      'K = 8 cm',
      'K = 16 cm'
    ],
    correctAnswer: 0,
    explanation: 'A kocka oldaléle: a = 96 : 12 = 8 cm. A lap egy négyzet, amelynek kerülete: K = 4 · a = 4 · 8 cm = 32 cm.',
    hint: 'Előbb számold ki egy él hosszát (96 : 12 = 8 cm), majd a négyzetlap kerületét (4 · 8)!',
    breakdown: [
      { label: 'Oldalél hossza', value: 'a = 96 : 12 = 8 cm' },
      { label: 'Egy lap kerülete', value: 'K = 4 · a = 4 · 8 = 32 cm' }
    ]
  },
  {
    id: 'ccq3-5',
    level: 3,
    prompt: 'Melyik állítás HAMIS az alábbiak közül?',
    options: [
      'A téglatestnek 12 csúcsa és 8 éle van',
      'A kocka minden lapja egybevágó négyzet',
      'A téglatest szemközti lapjai egybevágók és párhuzamosak',
      'A téglatest bármely csúcsában 3 él találkozik'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestnek 8 csúcsa és 12 éle van, nem fordítva! Ezért az első állítás hamis.',
    hint: 'Emlékezz vissza: csúcsok száma 8, élek száma 12.',
    breakdown: [
      { label: 'Helyes csúcsszám', value: '8 db csúcs' },
      { label: 'Helyes élszám', value: '12 db él' },
      { label: 'Hibás állítás', value: '12 csúcs és 8 él (felcserélve!)' }
    ]
  },
  {
    id: 'ccq3-6',
    level: 3,
    prompt: 'Egy fa díszdoboz méretei: a = 10 cm, b = 8 cm és c = 6 cm. Mekkora a legnagyobb határoló lapjának területe?',
    options: [
      '80 cm²',
      '60 cm²',
      '48 cm²',
      '188 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A legnagyobb lapot a két leghosszabb él határolja: 10 cm · 8 cm = 80 cm².',
    hint: 'Szorozd össze a két legnagyobb élt: 10 cm és 8 cm!',
    breakdown: [
      { label: 'Oldalélek', value: '10 cm, 8 cm, 6 cm' },
      { label: 'Két legnagyobb él szorzata', value: '10 · 8 = 80 cm²' }
    ]
  },
  {
    id: 'ccq3-7',
    level: 3,
    prompt: 'Ha egy kocka minden élét a kétszeresére növeljük, hányszorosára nő az éleinek összhossza?',
    options: [
      'Kétszeresére (2-szeresére)',
      'Négyszeresére (4-szeresére)',
      'Nyolcszorosára (8-szorosára)',
      '12-szeresére'
    ],
    correctAnswer: 0,
    explanation: 'Az élek összhossza egyszerű hosszúság: Ö_é = 12 · (2a) = 2 · (12a). Tehát pontosan a kétszeresére nő!',
    hint: 'Az élhosszúság egyenes arányban változik: kétszeres él ⟹ kétszeres összhossz.',
    breakdown: [
      { label: 'Eredeti összhossz', value: '12 · a' },
      { label: 'Új összhossz', value: '12 · (2a) = 24a' },
      { label: 'Változás mértéke', value: '24a : 12a = 2-szeres' }
    ]
  },
  {
    id: 'ccq3-8',
    level: 3,
    prompt: 'Összesen hány különböző (egymásba forgatással át nem vihető) síkbeli hálója létezik a kockának?',
    options: [
      '11 különböző háló',
      '6 különböző háló',
      '8 különböző háló',
      '12 különböző háló'
    ],
    correctAnswer: 0,
    explanation: 'A geometriában bizonyított tény, hogy a kockának pontosan 11 különböző síkbeli hálózata létezik.',
    hint: 'Több mint 10, pontosan 11!',
    breakdown: [
      { label: 'Kockahálók száma', value: '11 db' },
      { label: 'Leghíresebb', value: 'Latin kereszt forma (1-4-1)' }
    ]
  },
  {
    id: 'ccq3-9',
    level: 3,
    prompt: 'Egy kocka egyetlen lapjának kerülete K = 20 cm. Mennyi a kocka mind a 12 élének összhossza?',
    options: [
      '60 cm',
      '240 cm',
      '120 cm',
      '40 cm'
    ],
    correctAnswer: 0,
    explanation: 'A lap négyzet, így a kerületéből: a = 20 : 4 = 5 cm. A 12 él összhossza: 12 · 5 cm = 60 cm.',
    hint: 'Négyzet kerülete K = 4 · a = 20 ⟹ a = 5 cm. Mennyi 12 · 5?',
    breakdown: [
      { label: 'Négyzet éle', value: 'a = 20 : 4 = 5 cm' },
      { label: '12 él összhossza', value: '12 · 5 = 60 cm' }
    ]
  },
  {
    id: 'ccq3-10',
    level: 3,
    prompt: 'Az Euler-féle poliéder-tétel szerint mennyi a Csúcsok (C) - Élek (É) + Lapok (L) értéke a téglatestnél és a kockánál?',
    options: [
      '2',
      '0',
      '1',
      '4'
    ],
    correctAnswer: 0,
    explanation: 'C - É + L = 8 - 12 + 6 = 2. Ez az összefüggés minden egyszerű konvex térbeli testre igaz!',
    hint: 'Számold ki: 8 - 12 + 6 = ?',
    breakdown: [
      { label: 'Csúcsok száma (C)', value: '8' },
      { label: 'Élek száma (É)', value: '12' },
      { label: 'Lapok száma (L)', value: '6' },
      { label: 'Kiszámítás', value: '8 - 12 + 6 = 2' }
    ]
  }
];

export const CuboidCubeQuiz: React.FC<CuboidCubeQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Téglatest, kocka kvíz"
      subtitle="Teszteld a tudásodat a térbeli testek felépítéséről, csúcsairól, éleiről, lapjairól és síkbeli hálóiról 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 5. KVÍZ"
      storageKey="g5-meas-cuboid-cube-quiz"
      questions={CUBOID_CUBE_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <CuboidCubeMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <CuboidCubeSorter
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
            <div className="font-bold text-purple-700 dark:text-purple-400">1. Szint Puskája: Alapadatok</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <strong>8 csúcs</strong><br />(sarkok)
              </div>
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <strong>12 él</strong><br />(drótok)
              </div>
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <strong>6 lap</strong><br />(felületek)
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Kocka: 6 egybevágó négyzet. Téglatest: 6 téglalap (3 pár egybevágó lap).
            </p>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">2. Szint Puskája: Élek összhossza</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Kocka élei:</strong> Ö_é = 12 · a</div>
              <div>• <strong>Téglatest élei:</strong> Ö_é = 4 · (a + b + c)</div>
              <div>• <strong>Egy él visszaszámolása kockánál:</strong> a = Ö_é : 12</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">3. Szint Puskája: Hálók és tételek</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Kockaháló:</strong> 6 négyzet, egy sorban max. 4 darab. (Összesen 11 különböző háló létezik).</div>
              <div>• <strong>Euler-tétel:</strong> Csúcsok - Élek + Lapok = 8 - 12 + 6 = 2.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
