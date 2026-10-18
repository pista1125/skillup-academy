import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PracticalProblemsMatcher } from './PracticalProblemsMatcher';
import { PracticalProblemsSorter } from './PracticalProblemsSorter';

export interface PracticalProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const PRACTICAL_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPVETŐ VALÓSÁGBELI SZÁMÍTÁSOK (1-10)
  // =========================================================================
  {
    id: 'ppq1-1',
    level: 1,
    prompt: 'Egy téglalap alakú kert 15 m hosszú és 10 m széles. Hány méter drótháló kell a teljes körbekerítéséhez, ha nem hagyunk kaput?',
    options: [
      '50 méter',
      '150 méter',
      '25 méter',
      '100 méter'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-24 mx-auto" viewBox="0 0 160 80">
        <rect x="25" y="15" width="110" height="50" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,2" />
        <text x="80" y="44" textAnchor="middle" className="text-[11px] font-bold fill-emerald-900">K = 2 · (15 + 10) = 50 m</text>
        <text x="80" y="12" textAnchor="middle" className="text-[9px] fill-slate-500">15 m</text>
        <text x="14" y="44" textAnchor="middle" className="text-[9px] fill-slate-500">10 m</text>
      </svg>
    ),
    explanation: 'A körbekerítéshez a kerületet számoljuk: K = 2 · (a + b) = 2 · (15 + 10) = 2 · 25 = 50 méter.',
    hint: 'A kertnek 2 darab 15 m-es és 2 darab 10 m-es oldala van. Add össze mind a négyet!',
    breakdown: [
      { label: 'Hosszúság és szélesség összege', value: '15 m + 10 m = 25 m' },
      { label: 'Kerület képlete', value: '2 · 25 m' },
      { label: 'Szükséges drótháló', value: '50 méter' }
    ]
  },
  {
    id: 'ppq1-2',
    level: 1,
    prompt: 'Egy nappali szoba 5 m hosszú és 4 m széles. Hány m² laminált padlót kell vásárolni a lefedéséhez?',
    options: [
      '20 m²',
      '18 m²',
      '40 m²',
      '9 m²'
    ],
    correctAnswer: 0,
    explanation: 'A padló burkolásához a területet számoljuk ki: T = a · b = 5 · 4 = 20 m².',
    hint: 'A lefedés felületszámítást (területet) jelent: szorozd össze a hosszt és a szélességet!',
    breakdown: [
      { label: 'Szoba hossza', value: '5 m' },
      { label: 'Szoba szélessége', value: '4 m' },
      { label: 'Padló területe (5 · 4)', value: '20 m²' }
    ]
  },
  {
    id: 'ppq1-3',
    level: 1,
    prompt: 'Egy kocka alakú ajándékdoboz éle a = 10 cm. Hány cm² csomagolópapír fedi be pontosan a 6 külső lapját hézagok nélkül?',
    options: [
      '600 cm²',
      '100 cm²',
      '1000 cm²',
      '400 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Egy négyzetlap területe: 10 · 10 = 100 cm². A kockának 6 lapja van, így a felszíne A = 6 · 100 = 600 cm².',
    hint: 'A doboz felszínét számoljuk: 6 darab egyforma négyzet területe.',
    breakdown: [
      { label: 'Egy négyzet területe', value: '10 · 10 = 100 cm²' },
      { label: '6 lap felszíne', value: '6 · 100 = 600 cm²' }
    ]
  },
  {
    id: 'ppq1-4',
    level: 1,
    prompt: 'Egy kerti kismedence méretei: 3 m hosszú, 2 m széles és 1 m mély. Hány liter víz fér el benne teljesen feltöltve?',
    options: [
      '6000 liter',
      '600 liter',
      '60 liter',
      '12 000 liter'
    ],
    correctAnswer: 0,
    explanation: 'A medence térfogata: V = 3 · 2 · 1 = 6 m³. Mivel 1 m³ = 1000 liter, a medencébe 6 · 1000 = 6000 liter víz fér.',
    hint: 'Számold ki a köbmétert (3 · 2 · 1 = 6 m³), majd szorozd meg 1000-rel a literekhez!',
    breakdown: [
      { label: 'Térfogat m³-ben', value: '3 · 2 · 1 = 6 m³' },
      { label: 'Átváltás literbe (1 m³ = 1000 l)', value: '6 · 1000 = 6000 liter' }
    ]
  },
  {
    id: 'ppq1-5',
    level: 1,
    prompt: 'Egy fénykép mérete 30 cm × 20 cm. Hány centiméter hosszú faléc szükséges a kép körbekeretezéséhez?',
    options: [
      '100 cm',
      '50 cm',
      '600 cm',
      '120 cm'
    ],
    correctAnswer: 0,
    explanation: 'A keret hossza a kép kerületével egyenlő: K = 2 · (30 + 20) = 2 · 50 = 100 cm (azaz kereken 1 méter).',
    hint: 'A kép szélét keretezzük körbe, így a kerületét kell kiszámítani: 2 · (30 + 20).',
    breakdown: [
      { label: 'Hossz és szélesség összege', value: '30 + 20 = 50 cm' },
      { label: 'Kerület (2 · 50)', value: '100 cm = 1 m' }
    ]
  },
  {
    id: 'ppq1-6',
    level: 1,
    prompt: 'Fűmagot vetünk egy 12 m hosszú és 8 m széles udvarrészre. Hány m² felületet kell beszórnunk fűmaggal?',
    options: [
      '96 m²',
      '40 m²',
      '80 m²',
      '192 m²'
    ],
    correctAnswer: 0,
    explanation: 'A bevetendő felület nagysága a telek területe: T = 12 · 8 = 96 m².',
    hint: 'Fűmaggal a sík felületet fedjük le, tehát területet számolunk: 12 · 8.',
    breakdown: [
      { label: 'Képlet', value: 'T = a · b' },
      { label: 'Számítás', value: '12 · 8 = 96 m²' }
    ]
  },
  {
    id: 'ppq1-7',
    level: 1,
    prompt: 'Egy zárt láda méretei: a = 4 dm, b = 3 dm, c = 2 dm. Mennyi a teljes külső felszíne?',
    options: [
      '52 dm²',
      '26 dm²',
      '24 dm²',
      '48 dm²'
    ],
    correctAnswer: 0,
    explanation: 'Lapok területe: 4 · 3 = 12 dm², 4 · 2 = 8 dm², 3 · 2 = 6 dm². Összegük: 12 + 8 + 6 = 26 dm². Felszín: A = 2 · 26 = 52 dm².',
    hint: 'Számold ki a 3 különböző lapot, add össze, és szorozd meg 2-vel!',
    breakdown: [
      { label: '3 lap összege', value: '12 + 8 + 6 = 26 dm²' },
      { label: 'Felszín (2-szerese)', value: '2 · 26 = 52 dm²' }
    ]
  },
  {
    id: 'ppq1-8',
    level: 1,
    prompt: 'Egy téglatest alakú akvárium méretei: a = 5 dm, b = 3 dm, magassága c = 2 dm. Hány liter víz fér bele tele töltve?',
    options: [
      '30 liter',
      '10 liter',
      '60 liter',
      '300 liter'
    ],
    correctAnswer: 0,
    explanation: 'V = 5 dm · 3 dm · 2 dm = 30 dm³. Mivel 1 dm³ = 1 liter, pontosan 30 liter víz fér el benne.',
    hint: 'Szorozd össze a dm-ben megadott éleket, a kapott szám azonnal litert ad!',
    breakdown: [
      { label: 'Térfogat', value: '5 · 3 · 2 = 30 dm³' },
      { label: 'Literben', value: '30 liter' }
    ]
  },
  {
    id: 'ppq1-9',
    level: 1,
    prompt: 'Egy futópálya téglalap alakú, hossza 100 m, szélessége 50 m. Hány métert fut az, aki pontosan 1 kört tesz meg a pálya szélén?',
    options: [
      '300 métert',
      '150 métert',
      '5000 métert',
      '600 métert'
    ],
    correctAnswer: 0,
    explanation: '1 kör hossza a pálya kerülete: K = 2 · (100 + 50) = 2 · 150 = 300 méter.',
    hint: 'A pálya szélén fut körbe, tehát a kerületét futja le.',
    breakdown: [
      { label: 'Egyenes szakaszok és kanyarok', value: '100 + 50 + 100 + 50' },
      { label: 'Futott táv (kerület)', value: '300 méter' }
    ]
  },
  {
    id: 'ppq1-10',
    level: 1,
    prompt: 'Egy 2 literes kancsóba 15 dl vizet töltünk. Hány deciliter víz fér még bele, hogy teljesen tele legyen?',
    options: [
      '5 dl',
      '13 dl',
      '10 dl',
      '0,5 dl'
    ],
    correctAnswer: 0,
    explanation: '2 liter = 20 dl. Mivel 15 dl már benne van, még 20 - 15 = 5 dl víz fér bele.',
    hint: 'Váltsd át a 2 litert deciliterre (20 dl), majd vond ki belőle a 15 dl-t!',
    breakdown: [
      { label: 'Kancsó mérete dl-ben', value: '2 liter = 20 dl' },
      { label: 'Benne lévő víz', value: '15 dl' },
      { label: 'Hiányzó mennyiség', value: '20 - 15 = 5 dl' }
    ]
  },

  // =========================================================================
  // 2. SZINT: KORREKCIÓK, LEVONÁSOK ÉS BURKOLÁSI DARABSZÁMOK (11-20)
  // =========================================================================
  {
    id: 'ppq2-1',
    level: 2,
    prompt: 'Egy telek 25 m hosszú és 16 m széles. Körbekerítjük, de a kocsibejárónak kihagyunk egy 3 m-es kapunyílást. Hány méter kerítés kell?',
    options: [
      '79 méter',
      '82 méter',
      '85 méter',
      '76 méter'
    ],
    correctAnswer: 0,
    explanation: 'Teljes kerület: K = 2 · (25 + 16) = 2 · 41 = 82 m. A 3 m-es kapu levonásával: 82 - 3 = 79 méter kerítés szükséges.',
    hint: 'Számold ki a teljes kerületet (82 m), majd vond le belőle a 3 méteres kaput!',
    breakdown: [
      { label: 'Teljes kerület', value: '2 · (25 + 16) = 82 m' },
      { label: 'Kapu levonása', value: '82 - 3 = 79 m' }
    ]
  },
  {
    id: 'ppq2-2',
    level: 2,
    prompt: 'Egy szoba 4 m széles és 5 m hosszú. A falak tövében szegélylécet teszünk le, de az 1 m széles ajtónyílás helyét kihagyjuk. Hány méter szegélyléc kell?',
    options: [
      '17 méter',
      '18 méter',
      '19 méter',
      '20 méter'
    ],
    correctAnswer: 0,
    explanation: 'A szoba kerülete K = 2 · (4 + 5) = 18 m. Az 1 méteres ajtó levonásával: 18 - 1 = 17 méter szegőléc kell.',
    hint: 'Kerület mínusz ajtónyílás: 18 - 1 = 17 méter.',
    breakdown: [
      { label: 'Szoba kerülete', value: '2 · (4 + 5) = 18 m' },
      { label: 'Ajtó levonása', value: '18 - 1 = 17 m' }
    ]
  },
  {
    id: 'ppq2-3',
    level: 2,
    prompt: 'Egy fürdőszobafal 3 m széles és 2 m magas (T = 6 m² = 60 000 cm²). 20 cm × 20 cm-es csempékkel burkoljuk. Hány darab csempe kell pontosan?',
    options: [
      '150 darab',
      '120 darab',
      '300 darab',
      '60 darab'
    ],
    correctAnswer: 0,
    explanation: '1 csempe területe = 20 · 20 = 400 cm². Csempék száma = 60 000 cm² : 400 cm² = 150 darab.',
    hint: 'Oszd el a fal területét (60 000 cm²) egy csempe területével (400 cm²)!',
    breakdown: [
      { label: 'Fal területe', value: '300 cm · 200 cm = 60 000 cm²' },
      { label: 'Egy csempe területe', value: '20 cm · 20 cm = 400 cm²' },
      { label: 'Csempék száma (60 000 : 400)', value: '150 db' }
    ]
  },
  {
    id: 'ppq2-4',
    level: 2,
    prompt: 'Egy 4 m × 6 m-es szobát laminált parkettával burkolunk. Egy dobozban 2 m² parketta van. Hány doboz parkettát kell venni?',
    options: [
      '12 doboz',
      '24 doboz',
      '10 doboz',
      '14 doboz'
    ],
    correctAnswer: 0,
    explanation: 'Szoba területe: 4 · 6 = 24 m². Mivel 1 dobozban 2 m² van: 24 : 2 = 12 doboz parketta szükséges.',
    hint: 'Számold ki a szoba területét (4 · 6 = 24 m²), majd oszd el 2-vel!',
    breakdown: [
      { label: 'Szoba területe', value: '4 m · 6 m = 24 m²' },
      { label: 'Egy doboz tartalma', value: '2 m²' },
      { label: 'Szükséges dobozok száma', value: '24 : 2 = 12 doboz' }
    ]
  },
  {
    id: 'ppq2-5',
    level: 2,
    prompt: 'Egy szoba 4 falának együttes felülete 48 m². Egy doboz falfesték 12 m² lefestésére elegendő. Hány doboz festéket kell vásárolni az 1 rétegű festéshez?',
    options: [
      '4 doboz',
      '3 doboz',
      '5 doboz',
      '6 doboz'
    ],
    correctAnswer: 0,
    explanation: 'Festékdobozok száma = Falak felülete : 1 doboz kiadóssága = 48 : 12 = 4 doboz.',
    hint: 'Oszd el a 48 m²-t 12-vel!',
    breakdown: [
      { label: 'Festendő felület', value: '48 m²' },
      { label: 'Kiadósság dobozonként', value: '12 m²' },
      { label: 'Dobozok száma (48 : 12)', value: '4 doboz' }
    ]
  },
  {
    id: 'ppq2-6',
    level: 2,
    prompt: 'Egy felül nyitott akvárium méretei: a = 50 cm, b = 30 cm, c = 40 cm. Hány cm² üvegből készült (nincs fedőlap, csak 5 lap)?',
    options: [
      '7900 cm²',
      '9400 cm²',
      '6400 cm²',
      '1500 cm²'
    ],
    correctAnswer: 0,
    explanation: '1 db fenéklap: 50 · 30 = 1500 cm². 2 db elülső-hátsó: 2 · (50 · 40) = 4000 cm². 2 db oldalsó: 2 · (30 · 40) = 2400 cm². Összesen: 1500 + 4000 + 2400 = 7900 cm².',
    hint: 'Az alsó lapot (50 · 30) csak egyszer számold, mert felül nyitott!',
    breakdown: [
      { label: 'Alaplap (1 db)', value: '1500 cm²' },
      { label: '4 oldallap', value: '4000 + 2400 = 6400 cm²' },
      { label: 'Összes üveg (5 lap)', value: '7900 cm²' }
    ]
  },
  {
    id: 'ppq2-7',
    level: 2,
    prompt: 'Egy kocka alakú fadoboz éle a = 2 m. Kívülről minden oldalát lefestjük. Hány m² felületet festünk be összesen?',
    options: [
      '24 m²',
      '8 m²',
      '16 m²',
      '12 m²'
    ],
    correctAnswer: 0,
    explanation: 'Egy lap területe = 2 · 2 = 4 m². A 6 lap együttes felülete: A = 6 · 4 = 24 m².',
    hint: 'Kocka felszíne = 6 · a² = 6 · 2 · 2.',
    breakdown: [
      { label: 'Egy négyzet területe', value: '2 · 2 = 4 m²' },
      { label: '6 lap felszíne', value: '6 · 4 = 24 m²' }
    ]
  },
  {
    id: 'ppq2-8',
    level: 2,
    prompt: 'Egy 12 m³-es kerti medencét kerti csapról töltünk fel, amely percenként 20 liter vizet ad. Hány perc alatt telik meg a medence?',
    options: [
      '600 perc (= 10 óra)',
      '60 perc (= 1 óra)',
      '120 perc (= 2 óra)',
      '300 perc (= 5 óra)'
    ],
    correctAnswer: 0,
    explanation: '12 m³ = 12 000 liter. Idő = 12 000 liter : 20 liter/perc = 600 perc = 10 óra.',
    hint: 'Előbb váltsd át a 12 m³-t literre (12 000 l), majd oszd el 20-szal!',
    breakdown: [
      { label: 'Vízmennyiség literben', value: '12 000 liter' },
      { label: 'Vízhozam percenként', value: '20 liter/perc' },
      { label: 'Szükséges idő', value: '12 000 : 20 = 600 perc (10 óra)' }
    ]
  },
  {
    id: 'ppq2-9',
    level: 2,
    prompt: 'Egy homokozó belső méretei: 2 m hosszú, 1,5 m széles és 0,4 m mély. Hány köbméter (m³) homok kell a pereméig való feltöltéséhez?',
    options: [
      '1,2 m³',
      '3,9 m³',
      '0,8 m³',
      '2,4 m³'
    ],
    correctAnswer: 0,
    explanation: 'V = 2 · 1,5 · 0,4 = 3 · 0,4 = 1,2 m³.',
    hint: 'Szorozd össze a három méretet: 2 · 1,5 = 3, majd 3 · 0,4 = ?',
    breakdown: [
      { label: 'Alapterület', value: '2 · 1,5 = 3 m²' },
      { label: 'Mélység', value: '0,4 m' },
      { label: 'Térfogat (3 · 0,4)', value: '1,2 m³' }
    ]
  },
  {
    id: 'ppq2-10',
    level: 2,
    prompt: 'Az "A" doboz méretei 20 × 15 × 10 cm, a "B" dobozé 25 × 12 × 10 cm. Melyik dobozba fér több cucc (melyiknek nagyobb a térfogata)?',
    options: [
      'Egyenlő a térfogatuk (mindkettő 3000 cm³ = 3 liter)',
      'Az A dobozé nagyobb',
      'A B dobozé nagyobb',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'A doboz: 20 · 15 · 10 = 3000 cm³. B doboz: 25 · 12 · 10 = 300 · 10 = 3000 cm³. Pontosan egyenlő a térfogatuk!',
    hint: 'Számold ki mindkét doboz térfogatát: 20·15·10 és 25·12·10.',
    breakdown: [
      { label: 'A doboz térfogata', value: '3000 cm³' },
      { label: 'B doboz térfogata', value: '3000 cm³' },
      { label: 'Összehasonlítás', value: 'Egyenlőek' }
    ]
  },

  // =========================================================================
  // 3. SZINT: TÖBBLÉPÉSES SZÖVEGES ÉS KÖLTSÉGBECSLÉSI FELADATOK (21-30)
  // =========================================================================
  {
    id: 'ppq3-1',
    level: 3,
    prompt: 'Kifestünk egy szobát (hossza 5 m, szélessége 4 m, belmagassága 3 m). A mennyezetet és a 4 falat festjük. Az ajtó és ablakok együttes felülete 6 m², amit levonunk. Hány m² a ténylegesen festendő felület?',
    options: [
      '68 m²',
      '74 m²',
      '88 m²',
      '60 m²'
    ],
    correctAnswer: 0,
    explanation: 'Mennyezet: 5 · 4 = 20 m². 4 fal: 2 · (5 · 3 + 4 · 3) = 2 · (15 + 12) = 54 m². Bruttó felület: 20 + 54 = 74 m². Levonás: 74 - 6 = 68 m².',
    hint: 'Plafon (20 m²) + Falak (54 m²) = 74 m². Ebből vond le a 6 m² nyílászárót!',
    breakdown: [
      { label: 'Mennyezet', value: '5 · 4 = 20 m²' },
      { label: '4 fal felülete', value: '54 m²' },
      { label: 'Nyílások levonása', value: '74 - 6 = 68 m²' }
    ]
  },
  {
    id: 'ppq3-2',
    level: 3,
    prompt: 'Egy terasz mérete 6 m × 4 m = 24 m². A vágási hulladék és leeső darabok miatt 10% többlet járólapot rendelünk. Hány m² járólapot kell rendelni?',
    options: [
      '26,4 m²',
      '25 m²',
      '27 m²',
      '24,1 m²'
    ],
    correctAnswer: 0,
    explanation: 'A 24 m² 10%-a: 24 · 0,1 = 2,4 m². Rendelendő mennyiség: 24 + 2,4 = 26,4 m².',
    hint: 'Számold ki a 24 m² 10%-át (2,4 m²), és add hozzá az eredeti felülethez!',
    breakdown: [
      { label: 'Terasz felülete', value: '24 m²' },
      { label: '10% ráhagyás', value: '2,4 m²' },
      { label: 'Összes rendelés', value: '26,4 m²' }
    ]
  },
  {
    id: 'ppq3-3',
    level: 3,
    prompt: 'Egy csepegő csapból percenként 10 ml víz csöpög el. Hány liter ivóvíz vész kárba egy egész hét (7 nap) alatt?',
    options: [
      '100,8 liter',
      '14,4 liter',
      '70 liter',
      '10,8 liter'
    ],
    correctAnswer: 0,
    explanation: '1 óra alatt: 60 · 10 ml = 600 ml. 1 nap (24 óra) alatt: 24 · 600 ml = 14 400 ml = 14,4 liter. 7 nap alatt: 7 · 14,4 = 100,8 liter víz vész kárba.',
    hint: 'Előbb számold ki 1 napra (60 · 10 · 24 ml = 14,4 liter), majd szorozd meg 7-tel!',
    breakdown: [
      { label: '1 nap alatt elfolyó víz', value: '14,4 liter' },
      { label: '7 nap alatt (egy hét)', value: '7 · 14,4 = 100,8 liter' }
    ]
  },
  {
    id: 'ppq3-4',
    level: 3,
    prompt: 'Egy 30 cm × 20 cm × 10 cm-es dobozt keresztben kétszer körbekötünk szalaggal, és a masnira 40 cm-t hagyunk. Hány cm szalag kell?',
    options: [
      '180 cm',
      '140 cm',
      '200 cm',
      '160 cm'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-28 mx-auto" viewBox="0 0 120 90">
        <rect x="25" y="25" width="60" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <line x1="55" y1="25" x2="55" y2="65" stroke="#dc2626" strokeWidth="2" />
        <line x1="25" y1="45" x2="85" y2="45" stroke="#dc2626" strokeWidth="2" />
        <text x="55" y="18" textAnchor="middle" className="text-[10px] font-bold fill-red-600">🎀 Masni = 40 cm</text>
      </svg>
    ),
    explanation: '1. kör a doboz körül: 2 · (30 + 10) = 80 cm. 2. kör keresztben: 2 · (20 + 10) = 60 cm. Masni: 40 cm. Összesen: 80 + 60 + 40 = 180 cm szalag kell.',
    hint: 'Két különböző kerület mentén fut a szalag: (2·(30+10) = 80 cm) és (2·(20+10) = 60 cm), plusz a 40 cm-es masni.',
    breakdown: [
      { label: '1. hurok (30 cm-es oldal körül)', value: '2 · (30 + 10) = 80 cm' },
      { label: '2. hurok (20 cm-es oldal körül)', value: '2 · (20 + 10) = 60 cm' },
      { label: 'Masni', value: '40 cm' },
      { label: 'Teljes szalaghossz', value: '80 + 60 + 40 = 180 cm' }
    ]
  },
  {
    id: 'ppq3-5',
    level: 3,
    prompt: 'Egy fenyőfa gerenda méretei: 4 m × 0,2 m × 0,1 m. Térfogata 0,08 m³ = 80 dm³. Ha 1 dm³ fenyőfa tömege 0,6 kg, hány kg a gerenda?',
    options: [
      '48 kg',
      '80 kg',
      '4,8 kg',
      '133 kg'
    ],
    correctAnswer: 0,
    explanation: 'Tömeg = Térfogat · Sűrűség = 80 dm³ · 0,6 kg/dm³ = 48 kg.',
    hint: 'Szorozd össze a köbdeciméterek számát (80) a deciméterenkénti tömeggel (0,6 kg)!',
    breakdown: [
      { label: 'Gerenda térfogata', value: '80 dm³' },
      { label: '1 dm³ tömege', value: '0,6 kg' },
      { label: 'Össztömeg (80 · 0,6)', value: '48 kg' }
    ]
  },
  {
    id: 'ppq3-6',
    level: 3,
    prompt: 'Egy 8 dm × 5 dm × 4 dm-es akvárium (160 liter) feltöltéséhez 12 literes vödröket használunk. Legalább hány vödör vizet kell hordanunk, hogy tele legyen?',
    options: [
      '14 vödör (a 14. vödörből nem öntünk bele mindet)',
      '13 vödör',
      '12 vödör',
      '15 vödör'
    ],
    correctAnswer: 0,
    explanation: '160 : 12 = 13,33. 13 vödörrel csak 13 · 12 = 156 liter lenne benne, ami még nem elég. Ezért legalább 14 vödröt kell vinni a tele töltéshez.',
    hint: 'Oszd el a 160-at 12-vel, és kerekíts felfelé a következő egész vödörre!',
    breakdown: [
      { label: 'Akvárium űrtartalma', value: '160 liter' },
      { label: '13 vödör tartalma', value: '13 · 12 = 156 l (kevés)' },
      { label: 'Szükséges vödrök', value: '14 vödör' }
    ]
  },
  {
    id: 'ppq3-7',
    level: 3,
    prompt: 'Egy 14 m²-es szoba padlóját burkoljuk. A járólap 1,2 m²-es dobozokban kapható (bontatlanul). Hány egész dobozt kell megvennünk?',
    options: [
      '12 doboz',
      '11 doboz',
      '14 doboz',
      '10 doboz'
    ],
    correctAnswer: 0,
    explanation: '14 : 1,2 = 11,66. Mivel nem bonthatunk meg dobozt, felfelé kerekítünk: 12 dobozt kell venni (ebben 12 · 1,2 = 14,4 m² van).',
    hint: '11 dobozban csak 11 · 1,2 = 13,2 m² van, ami nem fedi le a 14 m²-t. Így 12 doboz kell!',
    breakdown: [
      { label: 'Szoba felülete', value: '14 m²' },
      { label: 'Dobozok száma (14 : 1,2)', value: '11,66 doboz' },
      { label: 'Megvásárolandó egész doboz', value: '12 doboz' }
    ]
  },
  {
    id: 'ppq3-8',
    level: 3,
    prompt: 'Egy vihar alatt a tetőről lezúduló esővízből percenként 50 liter érkezik a csatornán. Mennyi idő alatt telik meg az üres 1 m³-es tartály?',
    options: [
      '20 perc alatt',
      '50 perc alatt',
      '10 perc alatt',
      '2 perc alatt'
    ],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 liter. Idő = 1000 liter : 50 liter/perc = 20 perc alatt teljesen megtelik.',
    hint: '1 m³ = 1000 liter. Oszd el az 1000 litert a percenkénti 50 literrel!',
    breakdown: [
      { label: 'Tartály mérete', value: '1 m³ = 1000 liter' },
      { label: 'Befolyási sebesség', value: '50 l/perc' },
      { label: 'Megtelési idő (1000 : 50)', value: '20 perc' }
    ]
  },
  {
    id: 'ppq3-9',
    level: 3,
    prompt: 'Öt darab 1 m élű tömör beton kockából építünk emelvényt. Mennyi az emelvény össztérfogata és tömege, ha 1 m³ beton 2400 kg?',
    options: [
      'V = 5 m³, tömege: 12 000 kg (12 tonna)',
      'V = 5 m³, tömege: 2400 kg',
      'V = 1 m³, tömege: 12 000 kg',
      'V = 10 m³, tömege: 24 000 kg'
    ],
    correctAnswer: 0,
    explanation: '1 kocka térfogata = 1 m³. 5 kocka együtt = 5 m³. Tömege = 5 · 2400 kg = 12 000 kg = 12 tonna.',
    hint: '5 darab 1 m³-es kocka az 5 m³. Ezt szorozd meg 2400 kg-mal!',
    breakdown: [
      { label: 'Össztérfogat', value: '5 · 1 m³ = 5 m³' },
      { label: 'Össztömeg (5 · 2400 kg)', value: '12 000 kg (12 t)' }
    ]
  },
  {
    id: 'ppq3-10',
    level: 3,
    prompt: 'Egy 40 cm élű kocka alakú akvárium félig van töltve vízzel. Hány liter víz van benne?',
    options: [
      '32 liter',
      '64 liter',
      '16 liter',
      '40 liter'
    ],
    correctAnswer: 0,
    explanation: 'A kocka éle 40 cm = 4 dm. Teljes térfogata: V = 4 · 4 · 4 = 64 dm³ = 64 liter. Mivel félig van töltve: 64 : 2 = 32 liter víz van benne.',
    hint: '4 dm élű kocka teljes térfogata 4·4·4 = 64 liter. Ennek a fele van feltöltve.',
    breakdown: [
      { label: 'Akvárium teljes kapacitása', value: '4 · 4 · 4 = 64 liter' },
      { label: 'Félig töltve (64 : 2)', value: '32 liter' }
    ]
  }
];

export const PracticalProblemsQuiz: React.FC<PracticalProblemsQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="Gyakorlati feladatok kvíz"
      subtitle="Teszteld tudásodat a kerület, terület, felszín és térfogat életszerű alkalmazásaiban 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 9. KVÍZ"
      storageKey="g5-meas-practical-quiz"
      questions={PRACTICAL_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <PracticalProblemsMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <PracticalProblemsSorter
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
            <div className="font-bold text-teal-700 dark:text-teal-400">1. Szint Puskája: A 4 Fogalom</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong>Kerület (K):</strong> körbekerítés, szegély, keret (m, cm)
              </div>
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong>Terület (T):</strong> parketta, csempe, fűmag (m², cm²)
              </div>
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong>Felszín (A):</strong> doboz csomagolás, festés (6 lap)
              </div>
              <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong>Térfogat (V):</strong> medence, akvárium, liter (dm³ = l)
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">2. Szint Puskája: Levonások és Kerekítések</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Kerítés kapuval:</strong> K = 2(a+b) - kapu szélessége.</div>
              <div>• <strong>Szegőléc ajtóval:</strong> K = 2(a+b) - ajtó szélessége.</div>
              <div>• <strong>Anyagszükséglet:</strong> Mindig egész dobozra/darabra kerekítünk fel!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">3. Szint Puskája: Szobafestés és Ráhagyás</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Szobafestés:</strong> Mennyezet (ab) + 4 fal [2(ac+bc)] - ablakok/ajtók. A padlót nem festjük!</div>
              <div>• <strong>Ráhagyás:</strong> Terület + 10% (T · 1,1).</div>
              <div>• <strong>1 m³ = 1000 liter = 10 hl</strong></div>
            </div>
          </div>
        )
      }}
    />
  );
};
