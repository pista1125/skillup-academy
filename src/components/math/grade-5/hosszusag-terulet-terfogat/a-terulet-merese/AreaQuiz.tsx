import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { AreaMatcher } from './AreaMatcher';
import { AreaSorter } from './AreaSorter';

export interface AreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const AREA_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK ÉS KÖZVETLEN SZOMSZÉDOS ÁTVÁLTÁSOK (1-10)
  // =========================================================================
  {
    id: 'aq1-1',
    level: 1,
    prompt: 'Mi a terület alapvető mértékegysége a nemzetközi metrikus (SI) rendszerben?',
    options: [
      'A négyzetméter (m²)',
      'A négyzetcentiméter (cm²)',
      'A hektár (ha)',
      'A méter (m)'
    ],
    correctAnswer: 0,
    explanation: 'A terület alapegysége a négyzetméter (m²), ami egy 1 méter oldalú négyzet területének felel meg. A sima méter (m) hosszúságegység, nem területegység.',
    hint: 'Gondolj a méterből képzett felszínegységre (² kiteszővel)!',
    breakdown: [
      { label: 'Terület alapegysége', value: 'Négyzetméter (m²)' },
      { label: 'Hosszúság alapegysége', value: 'Méter (m)' },
      { label: 'Különbség', value: 'A terület 2 dimenziós felület (²)' }
    ]
  },
  {
    id: 'aq1-2',
    level: 1,
    prompt: 'Hány négyzetcentiméter (cm²) van 1 négyzetdeciméterben (dm²)?',
    options: [
      '100 cm²',
      '10 cm²',
      '1000 cm²',
      '50 cm²'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
        <rect x="5" y="5" width="90" height="90" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        {Array.from({ length: 9 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={5 + (i + 1) * 9} y1="5" x2={5 + (i + 1) * 9} y2="95" stroke="#f59e0b" strokeWidth="0.8" opacity="0.6" />
            <line x1="5" y1={5 + (i + 1) * 9} x2="95" y2={5 + (i + 1) * 9} stroke="#f59e0b" strokeWidth="0.8" opacity="0.6" />
          </React.Fragment>
        ))}
        <rect x="5" y="5" width="9" height="9" fill="#d97706" />
        <text x="50" y="53" textAnchor="middle" className="text-[10px] font-black fill-amber-950">10 sor × 10 oszlop = 100 db</text>
        <text x="50" y="66" textAnchor="middle" className="text-[7px] font-bold fill-amber-800">1 dm² = 100 cm²</text>
      </svg>
    ),
    explanation: 'Mivel 1 dm = 10 cm, egy 1 dm × 1 dm-es négyzetbe 10 sorban és 10 oszlopban összesen 10 · 10 = 100 darab 1 cm²-es kis négyzet fér bele.',
    hint: 'A szélessége 10 cm, a magassága 10 cm. Mennyi 10 · 10?',
    breakdown: [
      { label: 'Oldalhossz', value: '1 dm = 10 cm' },
      { label: 'Terület számítása', value: '10 cm · 10 cm = 100 cm²' },
      { label: 'Váltószám dm² → cm²', value: '· 100' }
    ]
  },
  {
    id: 'aq1-3',
    level: 1,
    prompt: 'Hány négyzetdeciméter (dm²) van 1 négyzetméterben (m²)?',
    options: [
      '100 dm²',
      '10 dm²',
      '1000 dm²',
      '10 000 dm²'
    ],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, így az 1 m² területű négyzetbe 10 · 10 = 100 darab 1 dm² területű négyzetlap illeszkedik.',
    hint: 'Ugyanaz a logika: 1 m = 10 dm, tehát a területi váltószám 10 · 10.',
    breakdown: [
      { label: 'Oldalméret', value: '1 m = 10 dm' },
      { label: 'Négyzet felülete', value: '10 dm · 10 dm = 100 dm²' },
      { label: 'Szabály', value: '1 m² = 100 dm²' }
    ]
  },
  {
    id: 'aq1-4',
    level: 1,
    prompt: 'Hány négyzetmilliméter (mm²) van 1 négyzetcentiméterben (cm²)?',
    options: [
      '100 mm²',
      '10 mm²',
      '1000 mm²',
      '20 mm²'
    ],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm, ezért 1 cm² = 10 mm · 10 mm = 100 mm².',
    hint: 'Gondolj a vonalzóra: 1 cm-ben 10 mm van. Két dimenzióban: 10 · 10.',
    breakdown: [
      { label: 'Kiindulás', value: '1 cm = 10 mm' },
      { label: 'Négyzet területe', value: '10 · 10 = 100' },
      { label: 'Eredmény', value: '1 cm² = 100 mm²' }
    ]
  },
  {
    id: 'aq1-5',
    level: 1,
    prompt: 'Hány négyzetméter (m²) az 1 ár (a) területe?',
    options: [
      '100 m²',
      '10 m²',
      '1000 m²',
      '10 000 m²'
    ],
    correctAnswer: 0,
    explanation: 'Az ár (jele: a) a mezőgazdaságban használt mértékegység, pontosan egy 10 m × 10 m oldalú négyzet területe: 10 · 10 = 100 m².',
    hint: 'Egy 10 méterszer 10 méteres kerti telek területe pontosan 1 ár.',
    breakdown: [
      { label: 'Ár definíciója', value: '10 m × 10 m alapterület' },
      { label: 'Képlet', value: '10 m · 10 m = 100 m²' },
      { label: 'Váltószám', value: '1 a = 100 m²' }
    ]
  },
  {
    id: 'aq1-6',
    level: 1,
    prompt: 'Hány ár (a) alkot 1 hektárt (ha)?',
    options: [
      '100 a',
      '10 a',
      '1000 a',
      '10 000 a'
    ],
    correctAnswer: 0,
    explanation: 'A hektár nevében a „hekt-” előtag a százszorost jelenti: 1 hektár pontosan 100 ár (100 · 100 m² = 10 000 m²).',
    hint: 'A hekto- előtag (mint a hektoliter) százszorost jelent!',
    breakdown: [
      { label: 'Hektár előtagja', value: 'hekt- = százszoros' },
      { label: 'Kapcsolat', value: '1 ha = 100 a' },
      { label: 'Négyzetméterben', value: '100 · 100 m² = 10 000 m²' }
    ]
  },
  {
    id: 'aq1-7',
    level: 1,
    prompt: 'Hány hektár (ha) van 1 négyzetkilométerben (km²)?',
    options: [
      '100 ha',
      '10 ha',
      '1000 ha',
      '10 000 ha'
    ],
    correctAnswer: 0,
    explanation: '1 km² = 1000 m · 1000 m = 1 000 000 m². Mivel 1 ha = 10 000 m², ezért 1 000 000 : 10 000 = 100 hektár.',
    hint: 'A metrikus létrán a km² közvetlenül a ha felett helyezkedik el, a váltószám itt is 100!',
    breakdown: [
      { label: '1 km² méterben', value: '1 000 000 m²' },
      { label: '1 ha méterben', value: '10 000 m²' },
      { label: 'Osztás', value: '1 000 000 : 10 000 = 100 ha' }
    ]
  },
  {
    id: 'aq1-8',
    level: 1,
    prompt: 'Mekkora a területe egy olyan négyzetnek, amelynek minden oldala 1 méter hosszú?',
    options: [
      '1 m²',
      '4 m²',
      '2 m²',
      '100 m²'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet területe az oldal szorozva önmagával: 1 m · 1 m = 1 m². A 4 méter a kerülete lenne (4 · 1 m = 4 m)!',
    hint: 'Vigyázz! Ne a kerületét számold (K = 4 · a), hanem a felületét (T = a · a)!',
    breakdown: [
      { label: 'Négyzet oldala', value: 'a = 1 m' },
      { label: 'Terület képlete', value: 'T = a · a = 1 · 1 = 1 m²' },
      { label: 'Kerület (nem ez volt a kérdés)', value: 'K = 4 · 1 = 4 m' }
    ]
  },
  {
    id: 'aq1-9',
    level: 1,
    prompt: 'Váltsd át: 4 dm² = ? cm²',
    options: [
      '400 cm²',
      '40 cm²',
      '4000 cm²',
      '44 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 dm² = 100 cm², a 4 dm² átváltásához 4-et megszorozzuk 100-zal: 4 · 100 = 400 cm².',
    hint: 'Nagyobb egységből váltunk kisebbe: szorozni kell 100-zal!',
    breakdown: [
      { label: 'Kezdő érték', value: '4 dm²' },
      { label: 'Váltószám dm² → cm²', value: '· 100' },
      { label: 'Eredmény', value: '4 · 100 = 400 cm²' }
    ]
  },
  {
    id: 'aq1-10',
    level: 1,
    prompt: 'Váltsd át: 800 mm² = ? cm²',
    options: [
      '8 cm²',
      '80 cm²',
      '0,8 cm²',
      '8000 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Kisebb mértékegységből váltunk nagyobba, ezért osztunk 100-zal: 800 : 100 = 8 cm².',
    hint: '1 cm² = 100 mm². Hány százas van a 800-ban?',
    breakdown: [
      { label: 'Kezdő érték', value: '800 mm²' },
      { label: 'Váltószám mm² → cm²', value: ': 100' },
      { label: 'Eredmény', value: '800 : 100 = 8 cm²' }
    ]
  },

  // =========================================================================
  // 2. SZINT: KÉTLÉPCSŐS ÁTVÁLTÁSOK ÉS MEZŐGAZDASÁGI SZÁMÍTÁSOK (11-20)
  // =========================================================================
  {
    id: 'aq2-1',
    level: 2,
    prompt: 'Hány négyzetcentiméter (cm²) van 1 négyzetméterben (m²)? Figyelj: 2 lépcsőfok!',
    options: [
      '10 000 cm²',
      '1000 cm²',
      '100 cm²',
      '200 cm²'
    ],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. Ezért az 1 m² felülete: 100 cm · 100 cm = 10 000 cm². Két lépcsőfok: 100 · 100 = 10 000!',
    hint: '1 m² = 100 dm² = 100 · 100 cm² = 10 000 cm².',
    breakdown: [
      { label: '1. lépés (m² → dm²)', value: '· 100' },
      { label: '2. lépés (dm² → cm²)', value: '· 100' },
      { label: 'Összesített szorzó', value: '100 · 100 = 10 000' }
    ]
  },
  {
    id: 'aq2-2',
    level: 2,
    prompt: 'Hány négyzetméter (m²) van 1 hektárban (ha)?',
    options: [
      '10 000 m²',
      '1000 m²',
      '100 m²',
      '100 000 m²'
    ],
    correctAnswer: 0,
    explanation: '1 ha = 100 a, és 1 a = 100 m². Így 1 ha = 100 · 100 m² = 10 000 m². Egy 100 m × 100 m-es négyzet területe.',
    hint: '100 méterszer 100 méteres földterület: 100 · 100.',
    breakdown: [
      { label: 'Hektár árban', value: '1 ha = 100 a' },
      { label: 'Ár négyzetméterben', value: '1 a = 100 m²' },
      { label: 'Hektár négyzetméterben', value: '100 · 100 = 10 000 m²' }
    ]
  },
  {
    id: 'aq2-3',
    level: 2,
    prompt: 'Váltsd át: 5 m² = ? cm²',
    options: [
      '50 000 cm²',
      '500 cm²',
      '5000 cm²',
      '500 000 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 m² = 10 000 cm², ezért 5 m² = 5 · 10 000 = 50 000 cm².',
    hint: 'Két lépcsőfok lefelé: 5 · 100 · 100 = ?',
    breakdown: [
      { label: 'Kezdő érték', value: '5 m²' },
      { label: 'Váltószám m² → cm²', value: '· 10 000' },
      { label: 'Eredmény', value: '5 · 10 000 = 50 000 cm²' }
    ]
  },
  {
    id: 'aq2-4',
    level: 2,
    prompt: 'Váltsd át: 300 dm² = ? m²',
    options: [
      '3 m²',
      '30 m²',
      '0,3 m²',
      '3000 m²'
    ],
    correctAnswer: 0,
    explanation: 'Kisebb egységből váltunk nagyobba, ezért osztunk 100-zal: 300 : 100 = 3 m².',
    hint: '1 m² = 100 dm². Hány százas van a 300-ban?',
    breakdown: [
      { label: 'Kezdő érték', value: '300 dm²' },
      { label: 'Váltószám dm² → m²', value: ': 100' },
      { label: 'Eredmény', value: '300 : 100 = 3 m²' }
    ]
  },
  {
    id: 'aq2-5',
    level: 2,
    prompt: 'Váltsd át: 6 ha = ? m²',
    options: [
      '60 000 m²',
      '600 m²',
      '6000 m²',
      '600 000 m²'
    ],
    correctAnswer: 0,
    explanation: '1 ha = 10 000 m², így 6 ha = 6 · 10 000 = 60 000 m².',
    hint: '1 hektár 10 000 m². Mennyi 6 darab tízezres?',
    breakdown: [
      { label: 'Kezdő érték', value: '6 ha' },
      { label: 'Váltószám ha → m²', value: '· 10 000' },
      { label: 'Eredmény', value: '6 · 10 000 = 60 000 m²' }
    ]
  },
  {
    id: 'aq2-6',
    level: 2,
    prompt: 'Váltsd át: 2 km² = ? ha',
    options: [
      '200 ha',
      '20 ha',
      '2000 ha',
      '20 000 ha'
    ],
    correctAnswer: 0,
    explanation: '1 km² = 100 ha, ezért 2 km² = 2 · 100 = 200 ha.',
    hint: 'A váltószám km² és ha között pontosan 100.',
    breakdown: [
      { label: 'Kezdő érték', value: '2 km²' },
      { label: 'Váltószám km² → ha', value: '· 100' },
      { label: 'Eredmény', value: '2 · 100 = 200 ha' }
    ]
  },
  {
    id: 'aq2-7',
    level: 2,
    prompt: 'Melyik terület a nagyobb: 3 m² vagy 280 dm²?',
    options: [
      'A 3 m² a nagyobb',
      'A 280 dm² a nagyobb',
      'Pontosan egyenlőek',
      'Nem hasonlíthatóak össze'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk közös mértékegységre! 3 m² = 3 · 100 dm² = 300 dm². Mivel 300 dm² > 280 dm², a 3 m² a nagyobb.',
    hint: 'Váltsd át a 3 m²-t deciméterre: 3 · 100 = ? dm².',
    breakdown: [
      { label: '3 m² átváltva', value: '3 · 100 = 300 dm²' },
      { label: 'Másik adat', value: '280 dm²' },
      { label: 'Összehasonlítás', value: '300 dm² > 280 dm² → 3 m² a nagyobb' }
    ]
  },
  {
    id: 'aq2-8',
    level: 2,
    prompt: 'Egy építési telek alapterülete 8 ár (a). Hány négyzetméter (m²) ez?',
    options: [
      '800 m²',
      '80 m²',
      '8000 m²',
      '80 000 m²'
    ],
    correctAnswer: 0,
    explanation: '1 a = 100 m², ezért 8 a = 8 · 100 = 800 m².',
    hint: '1 ár = 100 m². Szorozz 100-zal!',
    breakdown: [
      { label: 'Telek mérete', value: '8 a' },
      { label: 'Átváltás m²-be', value: '8 · 100 m²' },
      { label: 'Eredmény', value: '800 m²' }
    ]
  },
  {
    id: 'aq2-9',
    level: 2,
    prompt: 'Váltsd át: 450 a = ? ha',
    options: [
      '4,5 ha',
      '45 ha',
      '0,45 ha',
      '4500 ha'
    ],
    correctAnswer: 0,
    explanation: '1 ha = 100 a, ezért az árból hektárba váltáshoz 100-zal osztunk: 450 : 100 = 4,5 ha (4 egész és fél hektár).',
    hint: 'Kisebből nagyobba: ossz 100-zal!',
    breakdown: [
      { label: 'Kezdő érték', value: '450 a' },
      { label: 'Váltószám a → ha', value: ': 100' },
      { label: 'Eredmény', value: '450 : 100 = 4,5 ha' }
    ]
  },
  {
    id: 'aq2-10',
    level: 2,
    prompt: 'Hány négyzetmilliméter (mm²) van 1 négyzetdeciméterben (dm²)?',
    options: [
      '10 000 mm²',
      '1000 mm²',
      '100 mm²',
      '100 000 mm²'
    ],
    correctAnswer: 0,
    explanation: 'dm² → cm² (·100), majd cm² → mm² (·100). Összesen 100 · 100 = 10 000 mm².',
    hint: 'Két lépcsőfok lefelé a létrán: 100 · 100.',
    breakdown: [
      { label: '1 dm hossza', value: '100 mm' },
      { label: '1 dm² területe', value: '100 mm · 100 mm = 10 000 mm²' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT ÁTVÁLTÁSOK ÉS SZÖVEGES FELADATOK (21-30)
  // =========================================================================
  {
    id: 'aq3-1',
    level: 3,
    prompt: 'Mennyi a 2 m² + 45 dm² művelet eredménye négyzetdeciméterben kifejezve?',
    options: [
      '245 dm²',
      '65 dm²',
      '2045 dm²',
      '2450 dm²'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk át a 2 m²-t négyzetdeciméterre: 2 m² = 2 · 100 dm² = 200 dm². Ehhez hozzáadva a 45 dm²-t: 200 dm² + 45 dm² = 245 dm².',
    hint: 'Először váltsd át a 2 m²-t dm²-be, majd add hozzá a 45-öt!',
    breakdown: [
      { label: '2 m² átváltva', value: '2 · 100 = 200 dm²' },
      { label: 'Összeadás', value: '200 dm² + 45 dm²' },
      { label: 'Végeredmény', value: '245 dm²' }
    ]
  },
  {
    id: 'aq3-2',
    level: 3,
    prompt: 'Hány négyzetméter (m²) van 1 négyzetkilométerben (km²)?',
    options: [
      '1 000 000 m²',
      '10 000 m²',
      '100 000 m²',
      '1000 m²'
    ],
    correctAnswer: 0,
    explanation: '1 km = 1000 m, így a terület: 1000 m · 1000 m = 1 000 000 m² (egymillió négyzetméter). Három lépcsőfok: 100 · 100 · 100 = 1 000 000.',
    hint: 'Egy 1000 méterszer 1000 méteres négyzet területe: hány nulla van benne?',
    breakdown: [
      { label: '1 km méterben', value: '1000 m' },
      { label: '1 km² számítása', value: '1000 m · 1000 m = 1 000 000 m²' }
    ]
  },
  {
    id: 'aq3-3',
    level: 3,
    prompt: 'Egy 2 hektáros mezőgazdasági területből eladtak 50 árt. Hány ár (a) terület maradt meg?',
    options: [
      '150 a',
      '1950 a',
      '50 a',
      '250 a'
    ],
    correctAnswer: 0,
    explanation: '2 hektár = 2 · 100 a = 200 ár. Ha ebből eladtak 50 árt, akkor 200 - 50 = 150 ár maradt.',
    hint: 'Váltsd át a 2 hektárt árba (1 ha = 100 a), majd vond ki az 50 árt!',
    breakdown: [
      { label: 'Kezdő terület', value: '2 ha = 200 a' },
      { label: 'Eladott terület', value: '50 a' },
      { label: 'Maradék', value: '200 - 50 = 150 a' }
    ]
  },
  {
    id: 'aq3-4',
    level: 3,
    prompt: 'Egy szoba alapterülete 18 m². Hány darab 1 dm² méretű járólapra van szükség a padló teljes lefedéséhez?',
    options: [
      '1800 darab',
      '180 darab',
      '18 darab',
      '18 000 darab'
    ],
    correctAnswer: 0,
    explanation: '1 m² = 100 dm². Ezért a 18 m² = 18 · 100 = 1800 dm². Mivel egy járólap 1 dm², pontosan 1800 lapra van szükség.',
    hint: 'Hány darab 1 dm²-es lap fed le 1 négyzetmétert? Száz! Mennyi fedi le a 18 négyzetmétert?',
    breakdown: [
      { label: 'Szoba alapterülete', value: '18 m²' },
      { label: 'Átváltás dm²-be', value: '18 · 100 = 1800 dm²' },
      { label: 'Szükséges lapok száma', value: '1800 : 1 = 1800 db' }
    ]
  },
  {
    id: 'aq3-5',
    level: 3,
    prompt: 'Melyik egyenlőség IGAZ az alábbiak közül?',
    options: [
      '1 ha = 10 000 m²',
      '1 a = 1000 m²',
      '1 m² = 10 dm²',
      '1 km² = 10 ha'
    ],
    correctAnswer: 0,
    explanation: 'Az 1 ha = 10 000 m² helyes egyenlőség (100 m × 100 m). A többi hibás: 1 a = 100 m², 1 m² = 100 dm², 1 km² = 100 ha.',
    hint: 'A hektár 100 méterszer 100 méteres földterület: 100 · 100 = 10 000.',
    breakdown: [
      { label: 'Helyes állítás', value: '1 ha = 10 000 m²' },
      { label: 'Hibás: 1 a = 1000 m²', value: 'Helyesen: 100 m²' },
      { label: 'Hibás: 1 m² = 10 dm²', value: 'Helyesen: 100 dm²' },
      { label: 'Hibás: 1 km² = 10 ha', value: 'Helyesen: 100 ha' }
    ]
  },
  {
    id: 'aq3-6',
    level: 3,
    prompt: 'Váltsd át: 1,5 ha = ? m²',
    options: [
      '15 000 m²',
      '1500 m²',
      '150 m²',
      '150 000 m²'
    ],
    correctAnswer: 0,
    explanation: '1 ha = 10 000 m². Fél hektár = 5000 m². Így 1,5 ha = 10 000 + 5000 = 15 000 m² (vagy 1,5 · 10 000 = 15 000).',
    hint: '1 egész hektár az 10 000 m², a fél hektár még 5000 m².',
    breakdown: [
      { label: '1 ha', value: '10 000 m²' },
      { label: '0,5 ha', value: '5 000 m²' },
      { label: '1,5 ha összege', value: '15 000 m²' }
    ]
  },
  {
    id: 'aq3-7',
    level: 3,
    prompt: 'Bontsd fel: 75 000 m² hány hektár és hány ár?',
    options: [
      '7 ha és 50 a',
      '75 ha és 0 a',
      '7 ha és 5 a',
      '70 ha és 5 a'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 ha = 10 000 m², 70 000 m² = 7 ha. A maradék 5000 m² átváltva árba: 5000 : 100 = 50 ár. Tehát 7 ha 50 a.',
    hint: 'Hány tízezer van a 75 000-ben? 7 darab (7 ha). A maradék 5000 m² hány százas?',
    breakdown: [
      { label: 'Hektárok (tízezresek)', value: '70 000 m² = 7 ha' },
      { label: 'Maradék (százasok)', value: '5 000 m² = 50 a' },
      { label: 'Összesen', value: '7 ha 50 a' }
    ]
  },
  {
    id: 'aq3-8',
    level: 3,
    prompt: 'Egy szabványos focipálya zöld felülete 70 ár (a). Hány négyzetméter és hány hektár ez?',
    options: [
      '7000 m² és 0,7 ha',
      '700 m² és 7 ha',
      '70 000 m² és 7 ha',
      '7000 m² és 7 ha'
    ],
    correctAnswer: 0,
    explanation: '70 a = 70 · 100 m² = 7000 m². Hektárban kifejezve: 70 : 100 = 0,7 ha.',
    hint: '1 a = 100 m², így szorozz 100-zal a m²-hez, és ossz 100-zal a ha-hoz!',
    breakdown: [
      { label: 'Terület árban', value: '70 a' },
      { label: 'Négyzetméterben', value: '70 · 100 = 7000 m²' },
      { label: 'Hektárban', value: '70 : 100 = 0,7 ha' }
    ]
  },
  {
    id: 'aq3-9',
    level: 3,
    prompt: 'Számítsd ki az eredményt: 5 dm² - 200 cm² = ? cm²',
    options: [
      '300 cm²',
      '480 cm²',
      '30 cm²',
      '250 cm²'
    ],
    correctAnswer: 0,
    explanation: '5 dm² = 5 · 100 cm² = 500 cm². Ebből kivonva a 200 cm²-t: 500 cm² - 200 cm² = 300 cm².',
    hint: 'Váltsd át az 5 dm²-t cm²-re (5 · 100), majd vond ki belőle a 200-at!',
    breakdown: [
      { label: '5 dm² átváltva', value: '5 · 100 = 500 cm²' },
      { label: 'Kivonás', value: '500 cm² - 200 cm²' },
      { label: 'Eredmény', value: '300 cm²' }
    ]
  },
  {
    id: 'aq3-10',
    level: 3,
    prompt: 'Egy természetvédelmi erdő területe 4 km² és 20 ha. Hány hektár (ha) ez összesen?',
    options: [
      '420 ha',
      '60 ha',
      '4020 ha',
      '240 ha'
    ],
    correctAnswer: 0,
    explanation: '1 km² = 100 ha, ezért 4 km² = 4 · 100 = 400 ha. Ehhez hozzáadva a 20 ha-t: 400 + 20 = 420 ha.',
    hint: '4 km² = 4 · 100 ha = 400 ha. Adj hozzá még 20 ha-t!',
    breakdown: [
      { label: '4 km² átváltva', value: '4 · 100 = 400 ha' },
      { label: 'Hozzáadás', value: '400 ha + 20 ha' },
      { label: 'Végeredmény', value: '420 ha' }
    ]
  }
];

export const AreaQuiz: React.FC<AreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A terület mérése kvíz"
      subtitle="Gyakorold a területmértékek átváltását és a mértékegységek közötti összefüggéseket 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 3. KVÍZ"
      storageKey="g5-meas-area-quiz"
      questions={AREA_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <AreaMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <AreaSorter
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
            <div className="font-bold text-amber-700 dark:text-amber-400">1. Szint Puskája: Alapvető váltószámok (minden szomszédos lépésben 100)</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                • 1 cm² = 100 mm²<br />
                • 1 dm² = 100 cm²<br />
                • 1 m² = 100 dm²
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                • 1 a = 100 m²<br />
                • 1 ha = 100 a<br />
                • 1 km² = 100 ha
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Nagyobból kisebb felé: <strong>szorzunk 100-zal</strong>. Kisebből nagyobb felé: <strong>osztunk 100-zal</strong>.
            </p>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400">2. Szint Puskája: Kétlépcsős ugrások (10 000-es váltószám)</div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <div>• <strong>1 m² = 10 000 cm²</strong> (100 · 100)</div>
              <div>• <strong>1 ha = 10 000 m²</strong> (100 · 100)</div>
              <div>• <strong>1 dm² = 10 000 mm²</strong> (100 · 100)</div>
              <div>• <strong>1 km² = 10 000 a</strong> (100 · 100)</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Összehasonlításnál mindig váltsd mindkét mennyiséget ugyanabba a mértékegységbe!
            </p>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400">3. Szint Puskája: Nagy egységek és vegyes számítások</div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <div>• <strong>1 km² = 1 000 000 m²</strong> (egymillió m²)</div>
              <div>• <strong>0,5 ha = 5000 m² = 50 a</strong></div>
              <div>• Műveleteknél először <strong>azonos mértékegységre</strong> váltunk, majd összeadunk/kivonunk.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
