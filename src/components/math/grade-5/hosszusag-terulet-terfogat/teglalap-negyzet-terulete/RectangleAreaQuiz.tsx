import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { RectangleAreaMatcher } from './RectangleAreaMatcher';
import { RectangleAreaSorter } from './RectangleAreaSorter';

export interface RectangleAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const RECTANGLE_AREA_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: KÖZVETLEN KÉPLETEK ÉS RÁCSSZÁMLÁLÁS (1-10)
  // =========================================================================
  {
    id: 'raq1-1',
    level: 1,
    prompt: 'Mi a téglalap területének képlete, ha szomszédos oldalai „a” és „b”?',
    options: [
      'T = a · b',
      'T = 2 · (a + b)',
      'T = a + b',
      'T = 4 · a'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap területe a két szomszédos oldal szorzata: T = a · b. A 2 · (a + b) a kerületének a képlete!',
    hint: 'Gondolj a sorok és oszlopok szorzására a négyzethálón!',
    breakdown: [
      { label: 'Terület képlete', value: 'T = a · b' },
      { label: 'Kerület képlete (másik fogalom!)', value: 'K = 2 · (a + b)' },
      { label: 'Mértékegység', value: 'Négyzetes egység (pl. cm²)' }
    ]
  },
  {
    id: 'raq1-2',
    level: 1,
    prompt: 'Mi a négyzet területének képlete, ha oldala „a”?',
    options: [
      'T = a · a (vagy a²)',
      'T = 4 · a',
      'T = 2 · a',
      'T = a + a'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldala egyenlő, ezért a területe az oldal szorozva önmagával: T = a · a = a². A 4 · a a kerület képlete!',
    hint: 'A téglalap T = a · b képletében b helyére is a-t írunk.',
    breakdown: [
      { label: 'Négyzet területe', value: 'T = a · a = a²' },
      { label: 'Négyzet kerülete', value: 'K = 4 · a' }
    ]
  },
  {
    id: 'raq1-3',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 7 cm és b = 3 cm. Mekkora a területe?',
    options: [
      '21 cm²',
      '20 cm²',
      '10 cm²',
      '42 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-48 h-24 mx-auto" viewBox="0 0 160 80">
        <rect x="10" y="10" width="140" height="60" rx="3" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v-${i}`} x1={10 + (i + 1) * 20} y1="10" x2={10 + (i + 1) * 20} y2="70" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="2,2" />
        ))}
        {Array.from({ length: 2 }).map((_, i) => (
          <line key={`h-${i}`} x1="10" y1={10 + (i + 1) * 20} x2="150" y2={10 + (i + 1) * 20} stroke="#fb923c" strokeWidth="0.8" strokeDasharray="2,2" />
        ))}
        <text x="80" y="8" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">a = 7 cm</text>
        <text x="5" y="44" textAnchor="middle" className="text-[9px] font-bold fill-slate-700" transform="rotate(-90 5 44)">b = 3 cm</text>
        <text x="80" y="44" textAnchor="middle" className="text-xs font-black fill-orange-950">3 sor · 7 oszlop = 21 cm²</text>
      </svg>
    ),
    explanation: 'A téglalap területe T = a · b = 7 cm · 3 cm = 21 cm².',
    hint: 'Szorozd össze a két oldal hosszát: 7 · 3 = ?',
    breakdown: [
      { label: 'Képlet', value: 'T = a · b' },
      { label: 'Behelyettesítés', value: 'T = 7 cm · 3 cm' },
      { label: 'Eredmény', value: '21 cm²' }
    ]
  },
  {
    id: 'raq1-4',
    level: 1,
    prompt: 'Egy négyzet oldala a = 6 cm. Mekkora a területe?',
    options: [
      '36 cm²',
      '24 cm²',
      '12 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet területe T = a · a = 6 cm · 6 cm = 36 cm². A 24 cm a kerülete lenne (4 · 6 = 24 cm)!',
    hint: 'Oldal szorozva önmagával: 6 · 6 = ?',
    breakdown: [
      { label: 'Oldalhossz', value: 'a = 6 cm' },
      { label: 'Terület számítása', value: 'T = 6 · 6 = 36 cm²' },
      { label: 'Kerület (figyelem!)', value: 'K = 4 · 6 = 24 cm' }
    ]
  },
  {
    id: 'raq1-5',
    level: 1,
    prompt: 'Egy téglalap hossza 10 dm, szélessége 4 dm. Mekkora a területe?',
    options: [
      '40 dm²',
      '28 dm²',
      '14 dm²',
      '80 dm²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b = 10 dm · 4 dm = 40 dm².',
    hint: 'Szorozd össze a hosszúságot és a szélességet: 10 · 4.',
    breakdown: [
      { label: 'Hosszúság', value: 'a = 10 dm' },
      { label: 'Szélesség', value: 'b = 4 dm' },
      { label: 'Terület', value: '10 · 4 = 40 dm²' }
    ]
  },
  {
    id: 'raq1-6',
    level: 1,
    prompt: 'Egy négyzet alakú ablak oldala 1 méter. Mekkora az üvegfelület területe?',
    options: [
      '1 m²',
      '4 m²',
      '2 m²',
      '10 m²'
    ],
    correctAnswer: 0,
    explanation: '1 m · 1 m = 1 m². Pontosan ez a négyzetméter alapegységének a meghatározása.',
    hint: '1 szorozva 1-gyel: mennyi az?',
    breakdown: [
      { label: 'Oldal', value: 'a = 1 m' },
      { label: 'Terület', value: '1 m · 1 m = 1 m²' }
    ]
  },
  {
    id: 'raq1-7',
    level: 1,
    prompt: 'Egy téglalapot egységnégyzetekre osztottunk: 5 sorban és 8 oszlopban helyezkednek el 1 cm²-es kockák. Mekkora a téglalap területe?',
    options: [
      '40 cm²',
      '13 cm²',
      '26 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Ha 5 sorban 8 oszlop van, összesen 5 · 8 = 40 darab 1 cm²-es kocka fedi le a téglalapot, így területe 40 cm².',
    hint: 'Hány kocka van összesen, ha 5 sor van és mindegyikben 8 kocka?',
    breakdown: [
      { label: 'Sorok száma', value: '5 sor' },
      { label: 'Kockák egy sorban', value: '8 db' },
      { label: 'Összes kocka területe', value: '5 · 8 = 40 cm²' }
    ]
  },
  {
    id: 'raq1-8',
    level: 1,
    prompt: 'Egy apró négyzet lapka oldala a = 8 mm. Mekkora a területe?',
    options: [
      '64 mm²',
      '32 mm²',
      '16 mm²',
      '80 mm²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · a = 8 mm · 8 mm = 64 mm².',
    hint: 'Mennyi 8 · 8?',
    breakdown: [
      { label: 'Oldal', value: 'a = 8 mm' },
      { label: 'Terület', value: '8 · 8 = 64 mm²' }
    ]
  },
  {
    id: 'raq1-9',
    level: 1,
    prompt: 'Egy szoba téglalap alakú, oldalai 6 m és 5 m hosszúak. Mekkora a padló területe?',
    options: [
      '30 m²',
      '22 m²',
      '11 m²',
      '60 m²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b = 6 m · 5 m = 30 m².',
    hint: 'Hosszúság szorozva szélességgel: 6 · 5 = ?',
    breakdown: [
      { label: 'Szoba méretei', value: '6 m × 5 m' },
      { label: 'Padló területe', value: '6 · 5 = 30 m²' }
    ]
  },
  {
    id: 'raq1-10',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 12 cm és b = 2 cm. Mekkora a területe?',
    options: [
      '24 cm²',
      '14 cm²',
      '28 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'T = 12 cm · 2 cm = 24 cm².',
    hint: '12 szorozva 2-vel: mennyi az?',
    breakdown: [
      { label: 'Képlet', value: 'T = a · b' },
      { label: 'Számítás', value: '12 · 2 = 24 cm²' }
    ]
  },

  // =========================================================================
  // 2. SZINT: HIÁNYZÓ OLDALAK ÉS MÉRTÉKEGYSÉG-EGYEZTETÉS (11-20)
  // =========================================================================
  {
    id: 'raq2-1',
    level: 2,
    prompt: 'Egy téglalap területe T = 48 cm², egyik oldala b = 6 cm. Milyen hosszú a másik oldala (a)?',
    options: [
      'a = 8 cm',
      'a = 7 cm',
      'a = 42 cm',
      'a = 9 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hiányzó oldalt a terület osztásával kapjuk: a = T : b = 48 cm² : 6 cm = 8 cm. Ellenőrzés: 8 · 6 = 48 cm².',
    hint: 'Melyik számot kell megszorozni 6-tal, hogy 48-at kapjunk? 48 : 6 = ?',
    breakdown: [
      { label: 'Képlet', value: 'a = T : b' },
      { label: 'Behelyettesítés', value: '48 : 6' },
      { label: 'Eredmény', value: 'a = 8 cm' }
    ]
  },
  {
    id: 'raq2-2',
    level: 2,
    prompt: 'Egy négyzet területe T = 49 cm². Milyen hosszú a négyzet egy oldala (a)?',
    options: [
      'a = 7 cm',
      'a = 12,25 cm',
      'a = 14 cm',
      'a = 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel T = a · a, meg kell keresnünk azt a számot, amit önmagával szorozva 49-et kapunk: 7 · 7 = 49, tehát a = 7 cm.',
    hint: 'Melyik számnak a négyzete 49? ? · ? = 49.',
    breakdown: [
      { label: 'Négyzet területe', value: 'T = a · a = 49 cm²' },
      { label: 'Keresett szorzat', value: '7 · 7 = 49' },
      { label: 'Oldalhossz', value: 'a = 7 cm' }
    ]
  },
  {
    id: 'raq2-3',
    level: 2,
    prompt: 'Egy téglalap alakú kert területe 60 m², a hossza a = 12 m. Mekkora a szélessége (b)?',
    options: [
      'b = 5 m',
      'b = 48 m',
      'b = 6 m',
      'b = 4 m'
    ],
    correctAnswer: 0,
    explanation: 'b = T : a = 60 m² : 12 m = 5 m.',
    hint: 'Oszd el a területet a hosszúsággal: 60 : 12 = ?',
    breakdown: [
      { label: 'Képlet', value: 'b = T : a' },
      { label: 'Számítás', value: '60 : 12 = 5 m' }
    ]
  },
  {
    id: 'raq2-4',
    level: 2,
    prompt: 'Egy téglalap oldalai a = 3 m és b = 40 dm. Mekkora a területe négyzetméterben (m²)?',
    options: [
      '12 m²',
      '120 m²',
      '1,2 m²',
      '7 m²'
    ],
    correctAnswer: 0,
    explanation: 'Először azonos mértékegységre kell váltani! 40 dm = 4 m. Ezután: T = a · b = 3 m · 4 m = 12 m².',
    hint: 'Váltsd át a 40 dm-t méterbe (40 dm = 4 m), majd szorozd össze a 3-mal!',
    breakdown: [
      { label: '1. lépés (átváltás)', value: 'b = 40 dm = 4 m' },
      { label: '2. lépés (terület)', value: 'T = 3 m · 4 m' },
      { label: 'Végeredmény', value: '12 m²' }
    ]
  },
  {
    id: 'raq2-5',
    level: 2,
    prompt: 'Egy négyzet területe T = 100 dm². Hány méter hosszú egy oldala?',
    options: [
      '1 m',
      '10 m',
      '0,1 m',
      '25 m'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 10 · 10 = 100, az oldala a = 10 dm. Átváltva méterbe: 10 dm = 1 m.',
    hint: 'A négyzet oldala 10 dm. Hány méter van 10 deciméterben?',
    breakdown: [
      { label: 'Oldal dm-ben', value: 'a = 10 dm (mert 10 · 10 = 100)' },
      { label: 'Átváltás méterbe', value: '10 dm = 1 m' }
    ]
  },
  {
    id: 'raq2-6',
    level: 2,
    prompt: 'Egy konyha méretei: a = 4 m és b = 250 cm. Mekkora a területe négyzetméterben?',
    options: [
      '10 m²',
      '1000 m²',
      '1 m²',
      '16 m²'
    ],
    correctAnswer: 0,
    explanation: '250 cm = 2,5 m. Így a terület: T = 4 m · 2,5 m = 10 m².',
    hint: '250 cm = 2,5 m. Mennyi 4 · 2,5?',
    breakdown: [
      { label: 'Mértékegység egyeztetés', value: '250 cm = 2,5 m' },
      { label: 'Területszámítás', value: 'T = 4 · 2,5 = 10 m²' }
    ]
  },
  {
    id: 'raq2-7',
    level: 2,
    prompt: 'Melyik síkidom területe a nagyobb: egy 6 cm oldalú négyzet vagy egy 8 cm × 4 cm-es téglalap?',
    options: [
      'A négyzet területe a nagyobb',
      'A téglalap területe a nagyobb',
      'Pontosan egyenlő a területük',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Négyzet területe: 6 · 6 = 36 cm². Téglalap területe: 8 · 4 = 32 cm². Mivel 36 cm² > 32 cm², a négyzet a nagyobb.',
    hint: 'Számold ki mindkét területet külön-külön: 6 · 6 és 8 · 4!',
    breakdown: [
      { label: 'Négyzet területe', value: 'T₁ = 6 · 6 = 36 cm²' },
      { label: 'Téglalap területe', value: 'T₂ = 8 · 4 = 32 cm²' },
      { label: 'Összehasonlítás', value: '36 cm² > 32 cm² (a négyzet a nagyobb)' }
    ]
  },
  {
    id: 'raq2-8',
    level: 2,
    prompt: 'Egy téglalap területe T = 72 cm², az egyik oldala a = 9 cm. Mennyi a téglalap kerülete (K)?',
    options: [
      'K = 34 cm',
      'K = 17 cm',
      'K = 36 cm',
      'K = 18 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hiányzó oldal: b = 72 : 9 = 8 cm. A kerület: K = 2 · (a + b) = 2 · (9 + 8) = 2 · 17 = 34 cm.',
    hint: 'Először számold ki a másik oldalt (72 : 9 = 8 cm), majd számold ki a kerületet: 2 · (9 + 8)!',
    breakdown: [
      { label: 'Másik oldal', value: 'b = 72 : 9 = 8 cm' },
      { label: 'Félkerület', value: 'a + b = 9 + 8 = 17 cm' },
      { label: 'Kerület', value: 'K = 2 · 17 = 34 cm' }
    ]
  },
  {
    id: 'raq2-9',
    level: 2,
    prompt: 'Egy négyzet területe T = 25 cm². Mennyi a kerülete (K)?',
    options: [
      'K = 20 cm',
      'K = 10 cm',
      'K = 25 cm',
      'K = 100 cm'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet oldala a = 5 cm (mert 5 · 5 = 25). A kerülete K = 4 · a = 4 · 5 cm = 20 cm.',
    hint: 'Ha T = 25 cm², akkor az oldal a = 5 cm. Mennyi 4 · 5?',
    breakdown: [
      { label: 'Oldalhossz', value: 'a = 5 cm (5 · 5 = 25)' },
      { label: 'Kerület képlete', value: 'K = 4 · a = 4 · 5' },
      { label: 'Eredmény', value: 'K = 20 cm' }
    ]
  },
  {
    id: 'raq2-10',
    level: 2,
    prompt: 'Egy négyzet kerülete K = 24 cm. Mekkora a területe (T)?',
    options: [
      'T = 36 cm²',
      'T = 24 cm²',
      'T = 48 cm²',
      'T = 16 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet kerületéből az oldal: a = 24 : 4 = 6 cm. A területe: T = a · a = 6 · 6 = 36 cm².',
    hint: 'Előbb számold ki az oldalt: a = K : 4 = 24 : 4 = 6 cm. Majd a területet: 6 · 6.',
    breakdown: [
      { label: 'Oldalhossz kerületből', value: 'a = 24 : 4 = 6 cm' },
      { label: 'Terület számítása', value: 'T = 6 · 6 = 36 cm²' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT BURKOLÁSI ÉS MEZŐGAZDASÁGI FELADATOK (21-30)
  // =========================================================================
  {
    id: 'raq3-1',
    level: 3,
    prompt: 'Egy 5 m × 4 m alapterületű szoba padlóját 1 dm² méretű járólapokkal burkolják le. Hány darab járólap szükséges a teljes lefedéshez?',
    options: [
      '2000 darab',
      '200 darab',
      '20 darab',
      '20 000 darab'
    ],
    correctAnswer: 0,
    explanation: 'A szoba területe T = 5 m · 4 m = 20 m². Mivel 1 m² = 100 dm², 20 m² = 20 · 100 = 2000 dm². Egy lap 1 dm², így pontosan 2000 darab lapra van szükség.',
    hint: 'Számold ki a szoba területét (20 m²), váltsd át dm²-be (szorozd 100-zal), az adja a lapok számát!',
    breakdown: [
      { label: 'Szoba területe', value: '5 m · 4 m = 20 m²' },
      { label: 'Átváltás dm²-be', value: '20 · 100 = 2000 dm²' },
      { label: 'Szükséges lapok száma', value: '2000 db' }
    ]
  },
  {
    id: 'raq3-2',
    level: 3,
    prompt: 'Egy építési telek mérete 40 méter × 25 méter. Hány ár (a) a telek területe?',
    options: [
      '10 ár',
      '100 ár',
      '1 ár',
      '65 ár'
    ],
    correctAnswer: 0,
    explanation: 'A telek területe négyzetméterben: 40 m · 25 m = 1000 m². Mivel 1 ár = 100 m², ezért 1000 : 100 = 10 ár.',
    hint: '40 · 25 = 1000 m². Hány százas van az 1000-ben? 1000 : 100 = ?',
    breakdown: [
      { label: 'Terület m²-ben', value: '40 · 25 = 1000 m²' },
      { label: 'Átváltás árba (: 100)', value: '1000 : 100 = 10 ár' }
    ]
  },
  {
    id: 'raq3-3',
    level: 3,
    prompt: 'Egy négyzet alakú szántóföld területe 1 hektár (10 000 m²). Hány méter hosszú kerítés szükséges a körbekerítéséhez?',
    options: [
      '400 méter',
      '100 méter',
      '200 méter',
      '1000 méter'
    ],
    correctAnswer: 0,
    explanation: 'A szántóföld területe T = 10 000 m², így az oldala a = 100 m (mert 100 · 100 = 10 000). A kerítés a kerületet jelenti: K = 4 · a = 4 · 100 m = 400 m.',
    hint: 'Milyen hosszú a 10 000 m²-es négyzet oldala? 100 m. Mennyi 4 · 100?',
    breakdown: [
      { label: 'Oldalhossz', value: 'a = 100 m (100 · 100 = 10 000)' },
      { label: 'Kerítés hossza (kerület)', value: 'K = 4 · 100 = 400 m' }
    ]
  },
  {
    id: 'raq3-4',
    level: 3,
    prompt: 'Egy téglalap alakú szobafal 6 méter hosszú és 3 méter magas. Van rajta egy 2 méter magas és 1 méter széles ajtó. Hány négyzetmétert kell lefesteni?',
    options: [
      '16 m²',
      '18 m²',
      '15 m²',
      '20 m²'
    ],
    correctAnswer: 0,
    explanation: 'A teljes fal területe: 6 m · 3 m = 18 m². Az ajtó területe: 2 m · 1 m = 2 m². A festendő felület a kettő különbsége: 18 m² - 2 m² = 16 m².',
    hint: 'A fal területéből (6 · 3 = 18) vond ki az ajtó területét (2 · 1 = 2)!',
    breakdown: [
      { label: 'Teljes fal felülete', value: '6 · 3 = 18 m²' },
      { label: 'Ajtó felülete', value: '2 · 1 = 2 m²' },
      { label: 'Festendő felület', value: '18 - 2 = 16 m²' }
    ]
  },
  {
    id: 'raq3-5',
    level: 3,
    prompt: 'Egy téglalap kerülete K = 28 cm, és az egyik oldala 4 cm-rel hosszabb a másiknál. Mekkora a területe?',
    options: [
      '45 cm²',
      '40 cm²',
      '48 cm²',
      '36 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Félkerület: a + b = 28 : 2 = 14 cm. Mivel a különbségük 4 cm: b = (14 - 4) : 2 = 5 cm, és a = 5 + 4 = 9 cm. A terület: T = 9 · 5 = 45 cm².',
    hint: 'Két oldal összege 14 cm, a különbségük 4 cm. Melyik két szám ez? 9 és 5! Területük: 9 · 5.',
    breakdown: [
      { label: 'Félkerület', value: 'a + b = 14 cm' },
      { label: 'Oldalak megkeresése', value: 'a = 9 cm, b = 5 cm (összeg 14, különbség 4)' },
      { label: 'Terület számítása', value: 'T = 9 · 5 = 45 cm²' }
    ]
  },
  {
    id: 'raq3-6',
    level: 3,
    prompt: 'Két darab egybevágó, 5 cm oldalú négyzetet egymás mellé illesztünk úgy, hogy téglalapot alkossanak. Mekkora a keletkezett téglalap területe?',
    options: [
      '50 cm²',
      '25 cm²',
      '100 cm²',
      '40 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Egy négyzet területe 5 · 5 = 25 cm². Két ilyen négyzet területe együtt: 2 · 25 = 50 cm² (vagy a téglalap oldalai 10 cm és 5 cm, T = 10 · 5 = 50 cm²).',
    hint: 'Egy négyzet 25 cm². Mennyi két ilyen négyzet együtt?',
    breakdown: [
      { label: '1 négyzet területe', value: '5 · 5 = 25 cm²' },
      { label: '2 négyzet együtt', value: '2 · 25 = 50 cm²' }
    ]
  },
  {
    id: 'raq3-7',
    level: 3,
    prompt: 'Egy 8 m × 6 m méretű teraszt 2 m² fedőképességű térkőcsomagokkal raknak le. Hány csomag térkövet kell vásárolni?',
    options: [
      '24 csomagot',
      '48 csomagot',
      '14 csomagot',
      '12 csomagot'
    ],
    correctAnswer: 0,
    explanation: 'A terasz területe: 8 m · 6 m = 48 m². Mivel 1 csomag 2 m²-re elég: 48 : 2 = 24 csomag szükséges.',
    hint: 'Terasz területe = 8 · 6 = 48 m². Ezt oszd el 2-vel!',
    breakdown: [
      { label: 'Terasz területe', value: '8 · 6 = 48 m²' },
      { label: 'Csomagok száma', value: '48 : 2 = 24 csomag' }
    ]
  },
  {
    id: 'raq3-8',
    level: 3,
    prompt: 'Ha egy négyzet minden oldalát a kétszeresére növeljük (megduplázzuk), hányszorosára nő a területe?',
    options: [
      'Négyszeresére (4-szeresére)',
      'Kétszeresére (2-szeresére)',
      'Nyolcszorosára (8-szorosára)',
      'Nem változik'
    ],
    correctAnswer: 0,
    explanation: 'Ha az oldal a-ról 2a-ra nő, az új terület: (2a) · (2a) = 4 · (a · a) = 4 · T. Tehát a terület négyszeresére nő! (Pl. a = 3 ⟹ T = 9; a = 6 ⟹ T = 36 = 4 · 9).',
    hint: 'Próbáld ki számpéldával: 3 cm oldalnál T = 9 cm², 6 cm oldalnál T = 36 cm². Hányszorosa a 36 a 9-nek?',
    breakdown: [
      { label: 'Eredeti terület', value: 'T = a · a' },
      { label: 'Új terület duplázott oldallal', value: '(2a) · (2a) = 4 · a²' },
      { label: 'Következtetés', value: 'A terület 4-szeresére nő' }
    ]
  },
  {
    id: 'raq3-9',
    level: 3,
    prompt: 'Egy téglalap területe 72 cm², és az egyik oldala kétszer olyan hosszú, mint a másik (a = 2 · b). Milyen hosszúak a téglalap oldalai?',
    options: [
      'a = 12 cm és b = 6 cm',
      'a = 18 cm és b = 4 cm',
      'a = 16 cm és b = 8 cm',
      'a = 24 cm és b = 3 cm'
    ],
    correctAnswer: 0,
    explanation: 'A feltételek szerint a = 2b, és a · b = 72. Behelyettesítve: 2b · b = 72 ⟹ b · b = 36 ⟹ b = 6 cm. Ekkor a = 2 · 6 = 12 cm. Ellenőrzés: 12 · 6 = 72 cm² és 12 = 2 · 6.',
    hint: 'Keresd meg azt az opciót, ahol az egyik oldal pontosan kétszerese a másiknak és szorzatuk 72: 12 · 6 = ?',
    breakdown: [
      { label: 'Feltétel 1 (dupla hosszúság)', value: '12 cm = 2 · 6 cm ✓' },
      { label: 'Feltétel 2 (terület)', value: '12 cm · 6 cm = 72 cm² ✓' },
      { label: 'Oldalak hossza', value: '12 cm és 6 cm' }
    ]
  },
  {
    id: 'raq3-10',
    level: 3,
    prompt: 'Egy négyzet területe T = 144 cm². Mekkora a kerülete (K)?',
    options: [
      'K = 48 cm',
      'K = 24 cm',
      'K = 36 cm',
      'K = 72 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 12 · 12 = 144, a négyzet oldala a = 12 cm. A kerülete: K = 4 · a = 4 · 12 cm = 48 cm.',
    hint: 'Melyik szám négyzete 144? A 12. Mennyi 4 · 12?',
    breakdown: [
      { label: 'Oldal területe alapján', value: 'a = 12 cm (12 · 12 = 144)' },
      { label: 'Kerület számítása', value: 'K = 4 · 12 = 48 cm' }
    ]
  }
];

export const RectangleAreaQuiz: React.FC<RectangleAreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Téglalap, négyzet területe kvíz"
      subtitle="Gyakorold a területszámítást, a hiányzó oldalhosszak visszaszámolását és a szöveges burkolási feladatokat 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 4. KVÍZ"
      storageKey="g5-meas-rectangle-area-quiz"
      questions={RECTANGLE_AREA_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <RectangleAreaMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <RectangleAreaSorter
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
            <div className="font-bold text-orange-700 dark:text-orange-400">1. Szint Puskája: Alapvető képletek</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                <strong>Téglalap területe:</strong><br />
                T = a · b<br />
                (két szomszédos oldal szorzata)
              </div>
              <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                <strong>Négyzet területe:</strong><br />
                T = a · a = a²<br />
                (oldal szorozva önmagával)
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Vigyázz! A kerület a körvonal hossza (K = 2·(a+b) és 4·a), a terület a belső felület!
            </p>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-orange-700 dark:text-orange-400">2. Szint Puskája: Visszafelé számolás és mértékegységek</div>
            <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 space-y-1">
              <div>• <strong>Hiányzó oldal téglalapnál:</strong> a = T : b vagy b = T : a</div>
              <div>• <strong>Hiányzó oldal négyzetnél:</strong> keresd meg, melyik szám önmagával vett szorzata adja a területet! (? · ? = T)</div>
              <div>• <strong>Mértékegység egyeztetés:</strong> szorzás előtt az oldalakat mindig <strong>azonos mértékegységre</strong> kell hozni!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-orange-700 dark:text-orange-400">3. Szint Puskája: Burkolás és összetett alakzatok</div>
            <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 space-y-1">
              <div>• <strong>Burkolólapok száma:</strong> Szoba területe (pl. dm²-ben) osztva 1 lap területével (dm²).</div>
              <div>• <strong>Oldal duplázása:</strong> A terület <strong>négyszeresére</strong> (2 · 2 = 4) nő!</div>
              <div>• <strong>Ajtók, ablakok:</strong> A fal teljes területéből ki kell vonni a nyílászárók felületét.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
