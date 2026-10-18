import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PerimeterMatcher } from './PerimeterMatcher';
import { PerimeterSorter } from './PerimeterSorter';

export interface PerimeterQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const PERIMETER_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK ÉS KÖZVETLEN KÉPLETEK (1-10)
  // =========================================================================
  {
    id: 'pq1-1',
    level: 1,
    prompt: 'Mit jelent egy síkidom kerülete (K) a geometriában?',
    options: [
      'A síkidomot határoló oldalak hosszának összegét.',
      'A síkidom által lefedett belső felület nagyságát.',
      'A síkidom leghosszabb oldalának hosszát.',
      'A síkidom csúcsainak számát megszorozva néggyel.'
    ],
    correctAnswer: 0,
    explanation: 'A kerület a síkidom körvonalának, azaz a határoló szakaszok együttes hossza. Képzeld el úgy, mintha körbesétálnád a telket!',
    hint: 'Gondolj a „kerítés” szóra: a kerület a telek körbekerítésének teljes hossza!',
    breakdown: [
      { label: 'Kerület fogalma', value: 'Körvonal teljes hossza' },
      { label: 'Jele', value: 'K' },
      { label: 'Mértékegysége', value: 'mm, cm, dm, m, km (hosszúságmérték)' }
    ]
  },
  {
    id: 'pq1-2',
    level: 1,
    prompt: 'Mi a négyzet kerületének kiszámítási képlete, ha az oldala „a”?',
    options: [
      'K = 4 · a',
      'K = a · a',
      'K = 2 · a',
      'K = a + 4'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a négyzet mind a 4 oldala egyenlő hosszú, a kerülete a négy oldal összege: K = a + a + a + a = 4 · a.',
    hint: 'Hány egyenlő oldala van a négyzetnek?',
    breakdown: [
      { label: 'Négyzet oldalai', value: '4 darab egyenlő „a” oldal' },
      { label: 'Összeg', value: 'a + a + a + a' },
      { label: 'Képlet', value: 'K = 4 · a' }
    ]
  },
  {
    id: 'pq1-3',
    level: 1,
    prompt: 'Mi a téglalap kerületének képlete, ha a szomszédos oldalai „a” és „b”?',
    options: [
      'K = 2 · (a + b)',
      'K = a · b',
      'K = 4 · (a + b)',
      'K = a + b'
    ],
    correctAnswer: 0,
    explanation: 'A téglalapnak 2 darab „a” és 2 darab „b” oldala van: K = 2 · a + 2 · b = 2 · (a + b).',
    hint: 'A szemközti oldalak egyenlőek: van két darab „a” és két darab „b” oldal!',
    breakdown: [
      { label: 'Oldalak', value: 'a, b, a, b' },
      { label: 'Kifejezve', value: '2 · a + 2 · b' },
      { label: 'Kiemeléssel', value: 'K = 2 · (a + b)' }
    ]
  },
  {
    id: 'pq1-4',
    level: 1,
    prompt: 'Egy négyzet oldala a = 6 cm. Mennyi a kerülete?',
    options: [
      '24 cm',
      '36 cm',
      '12 cm',
      '18 cm'
    ],
    correctAnswer: 0,
    explanation: 'K = 4 · a = 4 · 6 cm = 24 cm. (A 36 a területe lenne: 6 · 6).',
    hint: 'Szorozd meg az oldalhosszt néggyel: 4 · 6!',
    breakdown: [
      { label: 'Oldalhossz (a)', value: '6 cm' },
      { label: 'Képlet', value: 'K = 4 · a' },
      { label: 'Számolás', value: '4 · 6 = 24 cm' }
    ]
  },
  {
    id: 'pq1-5',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 5 cm és b = 3 cm. Mennyi a kerülete?',
    options: [
      '16 cm',
      '15 cm',
      '8 cm',
      '30 cm'
    ],
    correctAnswer: 0,
    explanation: 'K = 2 · (a + b) = 2 · (5 + 3) = 2 · 8 = 16 cm.',
    hint: 'Add össze a két szomszédos oldalt (5 + 3 = 8), majd duplázd meg!',
    breakdown: [
      { label: 'Oldalak összege (félkerület)', value: '5 + 3 = 8 cm' },
      { label: 'Kerület', value: '2 · 8 = 16 cm' }
    ]
  },
  {
    id: 'pq1-6',
    level: 1,
    prompt: 'Egy négyzet alakú virágágyás oldala 9 méter. Hány méter szegély kell a körbekerítéséhez?',
    options: [
      '36 méter',
      '81 méter',
      '18 méter',
      '27 méter'
    ],
    correctAnswer: 0,
    explanation: 'A körbekerítéshez a kerületre van szükség: K = 4 · 9 m = 36 m.',
    hint: 'Négyzet esetén: 4 · oldalhossz!',
    breakdown: [
      { label: 'Ágyás oldala', value: '9 m' },
      { label: 'Képlet', value: '4 · a' },
      { label: 'Eredmény', value: '4 · 9 = 36 m' }
    ]
  },
  {
    id: 'pq1-7',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 8 dm és b = 4 dm. Mennyi a kerülete?',
    options: [
      '24 dm',
      '32 dm',
      '12 dm',
      '48 dm'
    ],
    correctAnswer: 0,
    explanation: 'K = 2 · (8 + 4) = 2 · 12 = 24 dm.',
    hint: 'K = 2 · (a + b) = 2 · (8 + 4).',
    breakdown: [
      { label: 'a + b', value: '8 + 4 = 12 dm' },
      { label: '2 · (a + b)', value: '2 · 12 = 24 dm' }
    ]
  },
  {
    id: 'pq1-8',
    level: 1,
    prompt: 'Egy négyzet kerülete K = 28 cm. Milyen hosszú egy oldala?',
    options: [
      '7 cm',
      '14 cm',
      '8 cm',
      '4 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel K = 4 · a, visszafelé osztanunk kell: a = K : 4 = 28 : 4 = 7 cm.',
    hint: 'Oszd el a kerületet néggyel: 28 : 4 = ?',
    breakdown: [
      { label: 'Kerület (K)', value: '28 cm' },
      { label: 'Oldal (a)', value: '28 : 4 = 7 cm' }
    ]
  },
  {
    id: 'pq1-9',
    level: 1,
    prompt: 'Egy téglalap kerülete K = 20 cm. Mennyi a két szomszédos oldal összege (a félkerület, a + b)?',
    options: [
      '10 cm',
      '5 cm',
      '40 cm',
      '15 cm'
    ],
    correctAnswer: 0,
    explanation: 'A félkerület a teljes kerület fele: a + b = K : 2 = 20 : 2 = 10 cm.',
    hint: 'A kerület a félkerület kétszerese, tehát most osztanod kell kettővel!',
    breakdown: [
      { label: 'Teljes kerület', value: '20 cm' },
      { label: 'Félkerület (a + b)', value: '20 : 2 = 10 cm' }
    ]
  },
  {
    id: 'pq1-10',
    level: 1,
    prompt: 'Egy téglalap hosszabb oldala 7 cm, rövidebb oldala 2 cm. Mennyi a kerülete?',
    options: [
      '18 cm',
      '14 cm',
      '9 cm',
      '28 cm'
    ],
    correctAnswer: 0,
    explanation: 'K = 2 · (7 + 2) = 2 · 9 = 18 cm.',
    hint: '7 + 2 = 9, ezt szorozd meg kettővel!',
    breakdown: [
      { label: 'Félkerület', value: '7 + 2 = 9 cm' },
      { label: 'Kerület', value: '2 · 9 = 18 cm' }
    ]
  },

  // =========================================================================
  // 2. SZINT: VISSZAFELÉ SZÁMOLÁS ÉS MÉRTÉKEGYSÉG-ÁTVÁLTÁS (11-20)
  // =========================================================================
  {
    id: 'pq2-1',
    level: 2,
    prompt: 'Egy téglalap kerülete 26 cm, az egyik oldala a = 6 cm. Milyen hosszú a másik oldala (b)?',
    options: [
      '7 cm',
      '20 cm',
      '10 cm',
      '8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A félkerület a + b = 26 : 2 = 13 cm. Mivel a = 6 cm, a hiányzó oldal: b = 13 - 6 = 7 cm.',
    hint: 'Először felezd meg a kerületet (félkerület: 26 : 2 = 13), majd vond ki belőle a 6-ot!',
    breakdown: [
      { label: 'Félkerület (a + b)', value: '26 : 2 = 13 cm' },
      { label: 'Ismert oldal (a)', value: '6 cm' },
      { label: 'Hiányzó oldal (b)', value: '13 - 6 = 7 cm' }
    ]
  },
  {
    id: 'pq2-2',
    level: 2,
    prompt: 'Egy téglalap oldalai a = 4 dm és b = 15 cm. Mennyi a kerülete centiméterben?',
    options: [
      '110 cm',
      '38 cm',
      '55 cm',
      '76 cm'
    ],
    correctAnswer: 0,
    explanation: 'Először közös mértékegységre váltunk: a = 4 dm = 40 cm. K = 2 · (40 + 15) = 2 · 55 = 110 cm (azaz 11 dm).',
    hint: 'Váltsd át a decimétert centiméterre (4 dm = 40 cm), mielőtt összeadod őket!',
    breakdown: [
      { label: 'Mértékegység egyeztetés', value: '4 dm = 40 cm' },
      { label: 'a + b', value: '40 + 15 = 55 cm' },
      { label: 'K = 2 · (a + b)', value: '2 · 55 = 110 cm' }
    ]
  },
  {
    id: 'pq2-3',
    level: 2,
    prompt: 'Egy téglalap egyik oldala a = 12 méter, a másik oldala feleakkora. Mennyi a kerülete?',
    options: [
      '36 méter',
      '24 méter',
      '18 méter',
      '72 méter'
    ],
    correctAnswer: 0,
    explanation: 'A másik oldal feleakkora: b = 12 : 2 = 6 m. A kerület: K = 2 · (12 + 6) = 2 · 18 = 36 méter.',
    hint: 'Számold ki először a b oldalt: 12 fele az 6! Majd K = 2 · (12 + 6).',
    breakdown: [
      { label: 'a oldal', value: '12 m' },
      { label: 'b oldal', value: '12 : 2 = 6 m' },
      { label: 'Kerület', value: '2 · (12 + 6) = 36 m' }
    ]
  },
  {
    id: 'pq2-4',
    level: 2,
    prompt: 'Egy négyzet kerülete pontosan 1 méter. Milyen hosszú egy oldala centiméterben?',
    options: [
      '25 cm',
      '50 cm',
      '20 cm',
      '10 cm'
    ],
    correctAnswer: 0,
    explanation: '1 méter = 100 cm. A négyzet oldala: a = 100 cm : 4 = 25 cm.',
    hint: 'Váltsd át az 1 métert centiméterre (100 cm), és oszd el 4-gyel!',
    breakdown: [
      { label: 'Kerület cm-ben', value: '1 m = 100 cm' },
      { label: 'Oldalhossz', value: '100 : 4 = 25 cm' }
    ]
  },
  {
    id: 'pq2-5',
    level: 2,
    prompt: 'Egy 20 m × 15 m-es téglalap telket körbekerítenek, de a 3 méteres kapunak nem kell kerítés. Hány méter kerítés kell?',
    options: [
      '67 méter',
      '70 méter',
      '64 méter',
      '73 méter'
    ],
    correctAnswer: 0,
    explanation: 'A telek teljes kerülete K = 2 · (20 + 15) = 2 · 35 = 70 méter. A kapu helyét levonva: 70 - 3 = 67 méter.',
    hint: 'Számold ki a teljes kerületet, majd vond le belőle a kapu 3 méterét!',
    breakdown: [
      { label: 'Teljes kerület', value: '2 · (20 + 15) = 70 m' },
      { label: 'Kapu levonása', value: '70 - 3 = 67 m' }
    ]
  },
  {
    id: 'pq2-6',
    level: 2,
    prompt: 'Két darab 5 cm-es négyzetet egymás mellé tolunk úgy, hogy egy téglalapot alkossanak. Mennyi lesz az új téglalap kerülete?',
    options: [
      '30 cm',
      '40 cm',
      '25 cm',
      '35 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az új téglalap oldalai: a = 5 + 5 = 10 cm, és b = 5 cm. Kerülete: K = 2 · (10 + 5) = 30 cm. (A belső illeszkedő oldalak már nem tartoznak a körvonalhoz!)',
    hint: 'A két négyzet 10 cm hosszú és 5 cm széles téglalapot alkot: 2 · (10 + 5) = ?',
    breakdown: [
      { label: 'Téglalap hossza', value: '5 + 5 = 10 cm' },
      { label: 'Téglalap szélessége', value: '5 cm' },
      { label: 'Új kerület', value: '2 · (10 + 5) = 30 cm' }
    ]
  },
  {
    id: 'pq2-7',
    level: 2,
    prompt: 'Egy téglalap oldalai a = 35 mm és b = 2,5 cm. Mennyi a téglalap kerülete milliméterben?',
    options: [
      '120 mm',
      '60 mm',
      '75 mm',
      '140 mm'
    ],
    correctAnswer: 0,
    explanation: '2,5 cm = 25 mm. K = 2 · (35 mm + 25 mm) = 2 · 60 mm = 120 mm (azaz 12 cm).',
    hint: '2,5 cm az 25 mm. Add össze: 35 + 25 = 60, majd duplázd meg!',
    breakdown: [
      { label: 'Átváltás', value: '2,5 cm = 25 mm' },
      { label: 'Félkerület', value: '35 + 25 = 60 mm' },
      { label: 'Kerület', value: '2 · 60 = 120 mm' }
    ]
  },
  {
    id: 'pq2-8',
    level: 2,
    prompt: 'Ha egy négyzet minden oldalát megduplázzuk (2-szeresére növeljük), hányszorosára nő a kerülete?',
    options: [
      '2-szeresére',
      '4-szeresére',
      '8-szorosára',
      'Nem változik'
    ],
    correctAnswer: 0,
    explanation: 'Ha az új oldal 2 · a, akkor az új kerület: K\' = 4 · (2 · a) = 2 · (4 · a) = 2 · K. A kerület pontosan a 2-szeresére nő.',
    hint: 'Próbáld ki számmal: ha az oldal 3 cm volt (K = 12), duplázva 6 cm lesz (K = 24). 24 a 12-nek a duplája!',
    breakdown: [
      { label: 'Eredeti kerület', value: '4 · a' },
      { label: 'Duplázott oldal', value: '2 · a' },
      { label: 'Új kerület', value: '4 · (2 · a) = 2 · (4a)' }
    ]
  },
  {
    id: 'pq2-9',
    level: 2,
    prompt: 'Egy téglalap félkerülete 18 cm. Ha az egyik oldala 11 cm, mekkora a másik oldal és a teljes kerület?',
    options: [
      'b = 7 cm és K = 36 cm',
      'b = 7 cm és K = 18 cm',
      'b = 9 cm és K = 36 cm',
      'b = 11 cm és K = 22 cm'
    ],
    correctAnswer: 0,
    explanation: 'Félkerület a + b = 18 cm. Ha a = 11 cm, akkor b = 18 - 11 = 7 cm. A teljes kerület pedig a félkerület kétszerese: 2 · 18 = 36 cm.',
    hint: 'Másik oldal: 18 - 11 = 7 cm. Teljes kerület: 18 · 2 = 36 cm.',
    breakdown: [
      { label: 'Másik oldal (b)', value: '18 - 11 = 7 cm' },
      { label: 'Teljes kerület (K)', value: '2 · 18 = 36 cm' }
    ]
  },
  {
    id: 'pq2-10',
    level: 2,
    prompt: 'Egy 140 cm × 90 cm-es téglalap terítő szélére körben csipkeszalagot varrunk. Hány méter szalag kell legalább?',
    options: [
      '4,6 méter',
      '2,3 méter',
      '46 méter',
      '3,8 méter'
    ],
    correctAnswer: 0,
    explanation: 'K = 2 · (140 cm + 90 cm) = 2 · 230 cm = 460 cm = 4,6 méter.',
    hint: '140 + 90 = 230 cm. Duplája 460 cm, amit válts át méterre (100-zal osztva)!',
    breakdown: [
      { label: 'Félkerület', value: '140 + 90 = 230 cm' },
      { label: 'Kerület cm-ben', value: '2 · 230 = 460 cm' },
      { label: 'Méterben', value: '460 cm = 4,6 m' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT FELADATOK ÉS ÉLETSZERŰ HELYZETEK (21-30)
  // =========================================================================
  {
    id: 'pq3-1',
    level: 3,
    prompt: 'Egy téglalap hosszabb oldala háromszorosa a rövidebb oldalnak (a = 3 · b). Ha a rövidebb oldal b = 4 cm, mennyi a kerület?',
    options: [
      '32 cm',
      '16 cm',
      '48 cm',
      '24 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hosszabb oldal: a = 3 · 4 = 12 cm. A kerület: K = 2 · (12 + 4) = 2 · 16 = 32 cm.',
    hint: 'Számold ki az „a” oldalt: 3 · 4 = 12 cm. A kerület: 2 · (12 + 4).',
    breakdown: [
      { label: 'Rövidebb oldal (b)', value: '4 cm' },
      { label: 'Hosszabb oldal (a)', value: '3 · 4 = 12 cm' },
      { label: 'Kerület', value: '2 · (12 + 4) = 32 cm' }
    ]
  },
  {
    id: 'pq3-2',
    level: 3,
    prompt: 'Egy téglalap kerülete 48 cm. A hosszabb oldala kétszer akkora, mint a rövidebb (a = 2 · b). Mekkorák az oldalak?',
    options: [
      'a = 16 cm és b = 8 cm',
      'a = 12 cm és b = 6 cm',
      'a = 20 cm és b = 10 cm',
      'a = 14 cm és b = 7 cm'
    ],
    correctAnswer: 0,
    explanation: 'A félkerület a + b = 48 : 2 = 24 cm. Mivel a = 2b, ezért 2b + b = 3b = 24 cm, amiből b = 8 cm és a = 16 cm.',
    hint: 'A félkerület 24 cm. Ezt kell elosztani 1 + 2 = 3 egyenlő részre!',
    breakdown: [
      { label: 'Félkerület', value: '48 : 2 = 24 cm' },
      { label: 'Részek száma', value: '2 rész + 1 rész = 3 rész' },
      { label: '1 rész (b oldal)', value: '24 : 3 = 8 cm' },
      { label: '2 rész (a oldal)', value: '2 · 8 = 16 cm' }
    ]
  },
  {
    id: 'pq3-3',
    level: 3,
    prompt: 'Egy 36 cm hosszú drótot kiegyenesítünk, majd 10 cm hosszú téglalapot hajlítunk belőle. Milyen széles lesz a téglalap?',
    options: [
      '8 cm',
      '16 cm',
      '13 cm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A drót teljes hossza a kerület: K = 36 cm. A félkerület a + b = 36 : 2 = 18 cm. Mivel a = 10 cm, a szélesség b = 18 - 10 = 8 cm.',
    hint: 'A drót a kerület (36 cm). A félkerület 18 cm. Mennyi hiányzik a 10-hez, hogy 18 legyen?',
    breakdown: [
      { label: 'Drót hossza (K)', value: '36 cm' },
      { label: 'Félkerület (a + b)', value: '36 : 2 = 18 cm' },
      { label: 'Szélesség (b)', value: '18 - 10 = 8 cm' }
    ]
  },
  {
    id: 'pq3-4',
    level: 3,
    prompt: 'Négy darab egyforma 3 cm-es négyzetből egy nagyobb négyzetet rakunk össze (2 × 2-es elrendezésben). Mennyi a nagy négyzet kerülete?',
    options: [
      '24 cm',
      '48 cm',
      '36 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'A nagy négyzet oldala 2 darab kis négyzet oldala: a_nagy = 3 + 3 = 6 cm. Kerülete: K = 4 · 6 = 24 cm. (Nem 4 · 12, mert a belső oldalak nincsenek a kerületben!)',
    hint: 'A nagy négyzet oldala 3 + 3 = 6 cm. Kerülete 4 · 6 cm.',
    breakdown: [
      { label: 'Nagy négyzet oldala', value: '3 + 3 = 6 cm' },
      { label: 'Nagy négyzet kerülete', value: '4 · 6 = 24 cm' }
    ]
  },
  {
    id: 'pq3-5',
    level: 3,
    prompt: 'Egy futballpálya mérete 105 m × 68 m. Hány métert fut az a játékos, aki 3-szor körbefutja a pálya vonalát?',
    options: [
      '1038 méter',
      '346 méter',
      '692 méter',
      '519 méter'
    ],
    correctAnswer: 0,
    explanation: 'Egy kör hossza a kerület: K = 2 · (105 + 68) = 2 · 173 = 346 méter. Három kör: 3 · 346 = 1038 méter.',
    hint: 'Egy kör a kerület: 2 · (105 + 68) = 346 m. Ezt szorozd meg 3-mal!',
    breakdown: [
      { label: '1 kör (kerület)', value: '2 · 173 = 346 m' },
      { label: '3 kör hossza', value: '3 · 346 = 1038 m' }
    ]
  },
  {
    id: 'pq3-6',
    level: 3,
    prompt: 'Egy 5 m × 4 m-es szobát körben szegélyléceznek. A bejárati ajtó 90 cm széles, oda nem kerül léc. Hány méter szegélyléc szükséges?',
    options: [
      '17,1 méter',
      '18 méter',
      '16,2 méter',
      '17,9 méter'
    ],
    correctAnswer: 0,
    explanation: 'A szoba teljes kerülete K = 2 · (5 + 4) = 18 méter. Az ajtó szélessége 90 cm = 0,9 m. Szükséges léc: 18 - 0,9 = 17,1 méter.',
    hint: 'Kerület 18 méter, ebből vonj ki 0,9 métert!',
    breakdown: [
      { label: 'Szoba kerülete', value: '2 · (5 + 4) = 18 m' },
      { label: 'Ajtónyílás', value: '90 cm = 0,9 m' },
      { label: 'Szükséges léc', value: '18 - 0,9 = 17,1 m' }
    ]
  },
  {
    id: 'pq3-7',
    level: 3,
    prompt: 'Egy 6 m × 4 m-es téglalap egyik sarkából kivágunk egy 2 m × 1 m-es kis téglalapot (L-alak keletkezik). Hogyan változik a kerülete az eredetihez képest?',
    options: [
      'Nem változik, pontosan ugyanannyi marad (20 méter).',
      'Csökken 3 méterrel.',
      'Nő 2 méterrel.',
      'Csökken a felére.'
    ],
    correctAnswer: 0,
    explanation: 'Zseniális geometriai tulajdonság: a sarok kivágásakor kieső két szakasz helyett pontosan ugyanakkora két belső szakasz keletkezik! Ezért a kerület változatlanul 2 · (6 + 4) = 20 méter marad.',
    hint: 'Gondold végig: a kieső vízszintes és függőleges szakaszt pontosan pótolja a két új belső vágásvonal!',
    breakdown: [
      { label: 'Eredeti kerület', value: '2 · (6 + 4) = 20 m' },
      { label: 'Kivágás hatása', value: 'A kieső éleket az új belső élek pótolják' },
      { label: 'Új kerület', value: '20 m (változatlan)' }
    ]
  },
  {
    id: 'pq3-8',
    level: 3,
    prompt: 'Egy „A” téglalap oldalai 6 cm és 4 cm. Egy „B” négyzet oldala 5 cm. Melyik állítás igaz a kerületükre?',
    options: [
      'A két síkidom kerülete egyenlő (mindkettő 20 cm).',
      'Az „A” téglalap kerülete nagyobb.',
      'A „B” négyzet kerülete nagyobb.',
      'Nem lehet összehasonlítani a kerületüket.'
    ],
    correctAnswer: 0,
    explanation: 'Téglalap: K_A = 2 · (6 + 4) = 20 cm. Négyzet: K_B = 4 · 5 = 20 cm. A két kerület pontosan megegyezik!',
    hint: 'Számold ki mindkettőt: 2 · (6 + 4) = ? és 4 · 5 = ?',
    breakdown: [
      { label: 'Téglalap kerülete', value: '2 · (6 + 4) = 20 cm' },
      { label: 'Négyzet kerülete', value: '4 · 5 = 20 cm' },
      { label: 'Összehasonlítás', value: 'Egyenlőek' }
    ]
  },
  {
    id: 'pq3-9',
    level: 3,
    prompt: 'Egy 25 m × 15 m-es telket szeretnénk bekeríteni. A kerítésépítés ára méterenként 4000 Ft. Mennyi a teljes költség?',
    options: [
      '320 000 Ft',
      '160 000 Ft',
      '1 500 000 Ft',
      '640 000 Ft'
    ],
    correctAnswer: 0,
    explanation: 'A telek kerülete K = 2 · (25 + 15) = 2 · 40 = 80 méter. Az összköltség: 80 m · 4000 Ft/m = 320 000 Ft.',
    hint: 'Telek kerülete: 2 · (25 + 15) = 80 m. Ezt szorozd meg a 4000 Ft-os méterárral!',
    breakdown: [
      { label: 'Telek kerülete', value: '2 · 40 = 80 m' },
      { label: 'Egységár', value: '4000 Ft / m' },
      { label: 'Összes költség', value: '80 · 4000 = 320 000 Ft' }
    ]
  },
  {
    id: 'pq3-10',
    level: 3,
    prompt: 'Egy 20 m × 20 m-es négyzet alakú kert kerítése mentén 5 méterenként oszlopokat állítanak (a sarkokra is). Hány oszlop kell összesen?',
    options: [
      '16 oszlop',
      '20 oszlop',
      '12 oszlop',
      '17 oszlop'
    ],
    correctAnswer: 0,
    explanation: 'Zárt sokszög kerülete mentén a szakaszok száma megegyezik a pontok (oszlopok) számával! A kert kerülete K = 4 · 20 = 80 méter. Oszlopok száma: 80 : 5 = 16 darab.',
    hint: 'Zárt körvonal esetén az oszlopok száma pontosan a kerület osztva a távolsággal: 80 : 5 = ?',
    breakdown: [
      { label: 'Kert kerülete', value: '4 · 20 = 80 m' },
      { label: 'Oszloptávolság', value: '5 m' },
      { label: 'Oszlopok száma', value: '80 : 5 = 16 darab' }
    ]
  }
];

export const PerimeterQuiz: React.FC<PerimeterQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      chapterId="hosszusag-terulet-terfogat"
      topicId="g5-meas-perimeter-quiz"
      topicTitle="2. Téglalap, négyzet kerülete"
      title="Téglalap, négyzet kerülete Kvíz"
      subtitle="5. osztály • IV. Hosszúság, terület, térfogat • 3 szinten 30 feladat"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG • 2. KVÍZ"
      topicBadge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT"
      documentId="grade-5-perimeter-quiz"
      pdfFilename="5_osztaly_IV_2_teglalap_negyzet_kerulete_kviz.pdf"
      emoji="📐"
      questions={PERIMETER_QUESTIONS}
      cheatSheetTitle="Kerületszámítási Kisokos"
      cheatSheetCards={[
        {
          title: 'A négyzet kerülete (K)',
          content: (
            <div className="space-y-1.5 text-xs">
              <p>• <strong>Képlet:</strong> <span className="font-bold text-teal-600 dark:text-teal-400">K = 4 · a</span></p>
              <p>• <strong>Jelentése:</strong> mind a 4 oldala egyenlő hosszú.</p>
              <p>• <strong>Visszafelé számolás:</strong> <span className="font-bold text-teal-600 dark:text-teal-400">a = K : 4</span></p>
              <p>• <em>Példa:</em> a = 7 cm → K = 4 · 7 = 28 cm.</p>
            </div>
          )
        },
        {
          title: 'A téglalap kerülete (K)',
          content: (
            <div className="space-y-1.5 text-xs">
              <p>• <strong>Képlet:</strong> <span className="font-bold text-emerald-600 dark:text-emerald-400">K = 2 · (a + b)</span> vagy <span className="font-bold">K = 2a + 2b</span></p>
              <p>• <strong>Félkerület:</strong> <span className="font-bold">a + b = K : 2</span></p>
              <p>• <strong>Hiányzó oldal számítása:</strong> <span className="font-bold">b = (K : 2) - a</span></p>
              <p>• <em>Példa:</em> a = 8 cm, b = 5 cm → K = 2 · (8 + 5) = 26 cm.</p>
            </div>
          )
        },
        {
          title: 'Aranyszabályok és tipikus hibák',
          content: (
            <div className="space-y-1 text-xs">
              <p>• <strong>Mértékegység-egyeztetés:</strong> Mindkét oldal azonos egységben legyen (pl. dm-ből cm-be váltani), mielőtt összeadod őket!</p>
              <p>• <strong>Ne keverd a területtel:</strong> A kerület hosszúság (cm, m), nem négyzetcentiméter (cm²)!</p>
              <p>• <strong>Zárójel fontossága:</strong> 2 · (a + b), nem pedig 2 · a + b!</p>
            </div>
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Kösd össze az összetartozó oldalakat, kerületeket és képleteket!',
          description: 'Párosítsd a kerületképleteket, az oldalhosszakat és a valós helyzeteket 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <PerimeterMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Rendezd a kerületeket és alakzatokat a megfelelő dobozba!',
          description: 'Húzd a kártyákat a helyes kategóriákba kerületnagyság, alaktulajdonság és életszerű méretek szerint.',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <PerimeterSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default PerimeterQuiz;
