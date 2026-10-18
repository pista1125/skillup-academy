import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { CuboidCubeVolumeMatcher } from './CuboidCubeVolumeMatcher';
import { CuboidCubeVolumeSorter } from './CuboidCubeVolumeSorter';

export interface VolumeQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const VOLUME_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: KÖZVETLEN KÉPLETEK ÉS ALAPSZÁMÍTÁSOK (1-10)
  // =========================================================================
  {
    id: 'vq1-1',
    level: 1,
    prompt: 'Mi az "a" élhosszúságú kocka térfogatának kiszámítási képlete?',
    options: [
      'V = a · a · a (vagy a³)',
      'V = 6 · a²',
      'V = 12 · a',
      'V = 4 · a'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-32 mx-auto" viewBox="0 0 120 100">
        <rect x="25" y="35" width="45" height="45" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <polygon points="25,35 45,15 90,15 70,35" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1.5" />
        <polygon points="70,35 90,15 90,60 70,80" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
        <text x="47" y="60" textAnchor="middle" className="text-[11px] font-black fill-indigo-950">V = a³</text>
        <text x="60" y="96" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">a · a · a = a³</text>
      </svg>
    ),
    explanation: 'A kocka mindhárom éle (hosszúság, szélesség, magasság) egyenlő: a. Ezért V = a · a · a = a³ (a köbön).',
    hint: 'Gondolj a három dimenzióra: mindegyik hossza „a”.',
    breakdown: [
      { label: 'Alaplap területe', value: 'a · a = a²' },
      { label: 'Magasság', value: 'a' },
      { label: 'Kocka térfogata', value: 'V = a · a · a = a³' }
    ]
  },
  {
    id: 'vq1-2',
    level: 1,
    prompt: 'Mennyi a térfogata annak a kockának, amelynek éle a = 3 cm?',
    options: [
      '27 cm³',
      '9 cm³',
      '54 cm³',
      '18 cm³'
    ],
    correctAnswer: 0,
    explanation: 'V = a · a · a = 3 · 3 · 3 = 27 cm³.',
    hint: 'Háromszor szorozd össze a hármat: 3 · 3 = 9, majd 9 · 3 = ?',
    breakdown: [
      { label: 'Él hossza', value: 'a = 3 cm' },
      { label: 'Képlet', value: 'V = 3 · 3 · 3' },
      { label: 'Eredmény', value: '27 cm³' }
    ]
  },
  {
    id: 'vq1-3',
    level: 1,
    prompt: 'Mi a téglatest térfogatának kiszámítási képlete, ha élei a, b és c?',
    options: [
      'V = a · b · c (vagy T_alap · m)',
      'V = 2 · (ab + ac + bc)',
      'V = 4 · (a + b + c)',
      'V = a + b + c'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-28 mx-auto" viewBox="0 0 150 90">
        <rect x="20" y="30" width="70" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <polygon points="20,30 40,12 110,12 90,30" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1.5" />
        <polygon points="90,30 110,12 110,52 90,70" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
        <text x="55" y="55" textAnchor="middle" className="text-[11px] font-bold fill-indigo-950">V = a · b · c</text>
      </svg>
    ),
    explanation: 'A téglatest térfogata a három egymásra merőleges él szorzata: V = a · b · c. Másképp: alapterület szorozva a magassággal (T_alap · m).',
    hint: 'Hosszúság szorozva szélességgel, szorozva magassággal.',
    breakdown: [
      { label: 'Alapterület (T_alap)', value: 'a · b' },
      { label: 'Magasság (m)', value: 'c' },
      { label: 'Térfogat', value: 'V = a · b · c = T_alap · m' }
    ]
  },
  {
    id: 'vq1-4',
    level: 1,
    prompt: 'Mennyi a téglatest térfogata, ha élei: a = 2 cm, b = 3 cm, c = 5 cm?',
    options: [
      '30 cm³',
      '62 cm³',
      '10 cm³',
      '25 cm³'
    ],
    correctAnswer: 0,
    explanation: 'V = a · b · c = 2 · 3 · 5 = 6 · 5 = 30 cm³.',
    hint: 'Szorozd össze a három számot: 2 · 3 · 5.',
    breakdown: [
      { label: 'Szorzás', value: '2 · 3 · 5' },
      { label: 'Részeredmény', value: '6 · 5' },
      { label: 'Térfogat', value: '30 cm³' }
    ]
  },
  {
    id: 'vq1-5',
    level: 1,
    prompt: 'Egy kocka éle a = 4 dm. Mennyi a térfogata?',
    options: [
      '64 dm³',
      '16 dm³',
      '96 dm³',
      '12 dm³'
    ],
    correctAnswer: 0,
    explanation: 'V = 4 · 4 · 4 = 16 · 4 = 64 dm³ (ez 64 liter víznek felel meg!).',
    hint: '4 · 4 = 16, és 16 · 4 = ?',
    breakdown: [
      { label: 'Él hossza', value: 'a = 4 dm' },
      { label: 'Képlet', value: 'V = 4 · 4 · 4' },
      { label: 'Térfogat', value: '64 dm³ (= 64 liter)' }
    ]
  },
  {
    id: 'vq1-6',
    level: 1,
    prompt: 'Egy téglatest alapterülete T_alap = 15 cm², magassága m = 4 cm. Mennyi a térfogata?',
    options: [
      '60 cm³',
      '19 cm³',
      '30 cm³',
      '120 cm³'
    ],
    correctAnswer: 0,
    explanation: 'A térfogat az alapterület és a magasság szorzata: V = T_alap · m = 15 · 4 = 60 cm³.',
    hint: 'Itt közvetlenül megvan az alapterület, csak meg kell szoroznod a magassággal: 15 · 4.',
    breakdown: [
      { label: 'Alapterület (T_alap)', value: '15 cm²' },
      { label: 'Magasság (m)', value: '4 cm' },
      { label: 'Térfogat (15 · 4)', value: '60 cm³' }
    ]
  },
  {
    id: 'vq1-7',
    level: 1,
    prompt: 'Egy kocka éle a = 10 cm = 1 dm. Hány liter víz fér bele pontosan?',
    options: [
      '1 liter',
      '10 liter',
      '100 liter',
      '0,1 liter'
    ],
    correctAnswer: 0,
    explanation: 'V = 1 dm · 1 dm · 1 dm = 1 dm³. Mivel 1 dm³ = 1 liter, a kockába pontosan 1 liter víz fér.',
    hint: '10 cm = 1 dm. 1 dm³ térfogat hány liter?',
    breakdown: [
      { label: 'Élhossz dm-ben', value: '1 dm' },
      { label: 'Térfogat', value: '1 dm³' },
      { label: 'Vízmennyiség', value: '1 liter' }
    ]
  },
  {
    id: 'vq1-8',
    level: 1,
    prompt: 'Egy doboz méretei: a = 1 dm, b = 2 dm, c = 3 dm. Mennyi a térfogata literben?',
    options: [
      '6 liter',
      '12 liter',
      '60 liter',
      '5 liter'
    ],
    correctAnswer: 0,
    explanation: 'V = 1 · 2 · 3 = 6 dm³. Mivel 1 dm³ = 1 liter, ez pontosan 6 liter.',
    hint: 'Szorozd össze az éleket dm-ben, és azonnal megkapod a literek számát!',
    breakdown: [
      { label: 'Élek szorzata', value: '1 · 2 · 3 = 6 dm³' },
      { label: 'Literben kifejezve', value: '6 liter' }
    ]
  },
  {
    id: 'vq1-9',
    level: 1,
    prompt: 'Egy kartondoboz 5 cm hosszú, 2 cm széles és 4 cm magas. Hány darab 1 cm³-es kiskocka fér bele?',
    options: [
      '40 darab',
      '20 darab',
      '11 darab',
      '30 darab'
    ],
    correctAnswer: 0,
    explanation: 'A térfogata V = 5 · 2 · 4 = 40 cm³, tehát pontosan 40 darab 1 cm³-es kiskocka fér bele.',
    hint: 'A doboz térfogata egyenlő a beleférő egységkockák számával: 5 · 2 · 4.',
    breakdown: [
      { label: 'Alsó réteg', value: '5 · 2 = 10 db' },
      { label: '4 réteg együtt', value: '10 · 4 = 40 db' }
    ]
  },
  {
    id: 'vq1-10',
    level: 1,
    prompt: 'Miben különbözik a felszín és a térfogat mértékegysége?',
    options: [
      'A felszínt négyzetes (pl. cm²), a térfogatot köbös (pl. cm³) mértékegységben mérjük',
      'A felszínt cm³-ben, a térfogatot cm²-ben mérjük',
      'Nincs különbség, mindkettőt cm-ben mérjük',
      'A felszínt literben, a térfogatot méterben mérjük'
    ],
    correctAnswer: 0,
    explanation: 'A felszín síklapok területe (2 dimenzió, négyzetmérték pl. cm²), míg a térfogat a test által elfoglalt tér (3 dimenzió, köbmérték pl. cm³ vagy űrmérték pl. liter).',
    hint: 'Gondolj a kitevőre: a területnél ², a térfogatnál ³.',
    breakdown: [
      { label: 'Felszín (felület)', value: '2 dimenzió (²: cm², dm², m²)' },
      { label: 'Térfogat (belső tér)', value: '3 dimenzió (³: cm³, dm³, m³, liter)' }
    ]
  },

  // =========================================================================
  // 2. SZINT: VISSZASZÁMOLÁSOK, HIÁNYZÓ ÉLEK, DUPLÁZÁS ÉS EGYEZTETÉS (11-20)
  // =========================================================================
  {
    id: 'vq2-1',
    level: 2,
    prompt: 'Egy kocka térfogata V = 125 cm³. Milyen hosszú a kocka egy éle?',
    options: [
      '5 cm',
      '25 cm',
      '15 cm',
      '50 cm'
    ],
    correctAnswer: 0,
    explanation: 'Olyan számot keresünk, amelynek köbe (a · a · a) 125. Mivel 5 · 5 · 5 = 25 · 5 = 125, az él hossza a = 5 cm.',
    hint: 'Melyik egyjegyű számot szorozva háromszor önmagával kapunk 125-öt?',
    breakdown: [
      { label: 'Kocka térfogata', value: 'a³ = 125 cm³' },
      { label: 'Próbálgatás', value: '5 · 5 · 5 = 125' },
      { label: 'Él hossza', value: 'a = 5 cm' }
    ]
  },
  {
    id: 'vq2-2',
    level: 2,
    prompt: 'Egy téglatest térfogata V = 72 cm³. Két ismert éle a = 3 cm és b = 4 cm. Mennyi a harmadik él (c)?',
    options: [
      '6 cm',
      '8 cm',
      '12 cm',
      '4 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az alapterület T_alap = 3 · 4 = 12 cm². A magasság: c = V : T_alap = 72 : 12 = 6 cm.',
    hint: 'Számold ki az alapterületet (3 · 4 = 12), majd oszd el a 72-t 12-vel!',
    breakdown: [
      { label: 'Alapterület', value: '3 · 4 = 12 cm²' },
      { label: 'Harmadik él (magasság)', value: '72 : 12 = 6 cm' }
    ]
  },
  {
    id: 'vq2-3',
    level: 2,
    prompt: 'Egy akvárium élei: a = 40 cm, b = 2 dm, c = 3 dm. Mennyi a térfogata literben?',
    options: [
      '24 liter',
      '240 liter',
      '2,4 liter',
      '12 liter'
    ],
    correctAnswer: 0,
    explanation: 'Először egyeztetjük a mértékegységeket: a = 40 cm = 4 dm. Ekkor V = 4 dm · 2 dm · 3 dm = 24 dm³ = 24 liter.',
    hint: 'Váltsd át a 40 cm-t deciméterre: 4 dm! Ezután szorozz: 4 · 2 · 3.',
    breakdown: [
      { label: 'Élek dm-ben', value: 'a = 4 dm, b = 2 dm, c = 3 dm' },
      { label: 'Térfogat dm³-ben', value: '4 · 2 · 3 = 24 dm³' },
      { label: 'Vízmennyiség', value: '24 liter' }
    ]
  },
  {
    id: 'vq2-4',
    level: 2,
    prompt: 'Egy négyzet alapú téglatest alapéle a = 5 cm, magassága m = 8 cm. Mennyi a térfogata?',
    options: [
      '200 cm³',
      '40 cm³',
      '100 cm³',
      '160 cm³'
    ],
    correctAnswer: 0,
    explanation: 'Az alaplap négyzet, területe T_alap = 5 · 5 = 25 cm². A térfogat: V = 25 · 8 = 200 cm³.',
    hint: 'Az alaplap egy 5×5-ös négyzet, ennek a területe 25 cm². Ezt szorozd meg 8-cal!',
    breakdown: [
      { label: 'Négyzet alaplap területe', value: '5 · 5 = 25 cm²' },
      { label: 'Magasság', value: '8 cm' },
      { label: 'Térfogat (25 · 8)', value: '200 cm³' }
    ]
  },
  {
    id: 'vq2-5',
    level: 2,
    prompt: 'Egy kocka térfogata V = 1000 dm³. Hány méter hosszú a kocka egy éle?',
    options: [
      '1 méter',
      '10 méter',
      '0,1 méter',
      '100 méter'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 10 · 10 · 10 = 1000, az él hossza a = 10 dm. 10 dm pedig pontosan 1 méter!',
    hint: 'Előbb számold ki dm-ben az élet: melyik szám köbe 1000? Aztán váltsd át méterre!',
    breakdown: [
      { label: 'Élhossz dm-ben (a³ = 1000)', value: 'a = 10 dm' },
      { label: 'Átváltás méterbe', value: '10 dm = 1 m' }
    ]
  },
  {
    id: 'vq2-6',
    level: 2,
    prompt: 'Egy tartály alapterülete T_alap = 45 dm², térfogata V = 180 dm³. Milyen magas a tartály?',
    options: [
      '4 dm',
      '5 dm',
      '3 dm',
      '40 dm'
    ],
    correctAnswer: 0,
    explanation: 'Magasság = Térfogat : Alapterület = 180 : 45 = 4 dm.',
    hint: 'Oszd el a 180-at 45-tel!',
    breakdown: [
      { label: 'Képlet', value: 'm = V : T_alap' },
      { label: 'Számítás', value: '180 : 45' },
      { label: 'Magasság', value: '4 dm' }
    ]
  },
  {
    id: 'vq2-7',
    level: 2,
    prompt: 'Ha egy kocka minden élét a 2-szeresére növeljük, hányszorosára nő a térfogata?',
    options: [
      '8-szorosára (mert 2³ = 8)',
      '2-szeresére',
      '4-szeresére',
      '6-szorosára'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-24 mx-auto" viewBox="0 0 140 70">
        <rect x="15" y="30" width="15" height="15" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
        <text x="22" y="58" textAnchor="middle" className="text-[8px] font-bold fill-indigo-900">1x</text>
        <rect x="65" y="15" width="30" height="30" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
        <line x1="65" y1="30" x2="95" y2="30" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="80" y1="15" x2="80" y2="45" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,2" />
        <text x="110" y="35" textAnchor="middle" className="text-[10px] font-bold fill-indigo-950">→ 8 db</text>
      </svg>
    ),
    explanation: 'V_új = (2a) · (2a) · (2a) = 8 · a³. Tehát a térfogat 2 · 2 · 2 = 8-szorosára nő.',
    hint: 'A térfogatban a hosszúság, a szélesség és a magasság is megduplázódik: 2 · 2 · 2 = ?',
    breakdown: [
      { label: 'Eredeti térfogat', value: 'a³' },
      { label: 'Új térfogat', value: '(2a)³ = 8a³' },
      { label: 'Növekedés', value: '8-szoros' }
    ]
  },
  {
    id: 'vq2-8',
    level: 2,
    prompt: 'Egy téglatest élei: a = 5 cm, b = 6 cm, c = 10 cm. Hány milliliter (ml) a térfogata?',
    options: [
      '300 ml',
      '30 ml',
      '3000 ml',
      '3 liter'
    ],
    correctAnswer: 0,
    explanation: 'V = 5 · 6 · 10 = 300 cm³. Mivel 1 cm³ = 1 ml, a térfogat pontosan 300 ml.',
    hint: 'Számold ki a térfogatot cm³-ben: 5 · 6 · 10 = 300 cm³. Emlékezz: 1 cm³ = 1 ml!',
    breakdown: [
      { label: 'Térfogat cm³-ben', value: '5 · 6 · 10 = 300 cm³' },
      { label: 'Aranyszabály (1 cm³ = 1 ml)', value: '300 ml' }
    ]
  },
  {
    id: 'vq2-9',
    level: 2,
    prompt: 'Egy kocka összes élének összege 36 cm. Mennyi a térfogata?',
    options: [
      '27 cm³',
      '54 cm³',
      '9 cm³',
      '108 cm³'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 12 egyenlő éle van. Egy él hossza: a = 36 : 12 = 3 cm. Térfogat: V = 3³ = 3 · 3 · 3 = 27 cm³.',
    hint: 'Először keresd meg egy él hosszát: 36 : 12 = 3 cm. Majd emeld köbre: 3 · 3 · 3.',
    breakdown: [
      { label: 'Élek száma', value: '12 db' },
      { label: 'Egy él hossza', value: '36 : 12 = 3 cm' },
      { label: 'Térfogat (3 · 3 · 3)', value: '27 cm³' }
    ]
  },
  {
    id: 'vq2-10',
    level: 2,
    prompt: 'Egy kocka teljes felszíne A = 96 cm². Mennyi a kocka térfogata?',
    options: [
      '64 cm³',
      '16 cm³',
      '96 cm³',
      '36 cm³'
    ],
    correctAnswer: 0,
    explanation: 'A felszín 6 lapból áll: 1 lap területe = 96 : 6 = 16 cm². Mivel a · a = 16, az él hossza a = 4 cm. A térfogat: V = 4 · 4 · 4 = 64 cm³.',
    hint: 'Felszínből 1 lap = 96 : 6 = 16 cm². Melyik szám négyzete 16? Az él 4 cm. Ebből a térfogat 4 · 4 · 4.',
    breakdown: [
      { label: 'Egy lap területe (96 : 6)', value: '16 cm²' },
      { label: 'Él hossza (a · a = 16)', value: 'a = 4 cm' },
      { label: 'Térfogat (4 · 4 · 4)', value: '64 cm³' }
    ]
  },

  // =========================================================================
  // 3. SZINT: VALÓS ÉLETBELI TARTÁLYOK, AKVÁRIUMOK ÉS ÖSSZETETT TESTEK (21-30)
  // =========================================================================
  {
    id: 'vq3-1',
    level: 3,
    prompt: 'Egy akvárium méretei: a = 60 cm, b = 40 cm, magassága 50 cm. Hány liter víz van benne, ha a víz szintje csak 35 cm magasságig ér?',
    options: [
      '84 liter',
      '120 liter',
      '70 liter',
      '840 liter'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-32 mx-auto" viewBox="0 0 130 100">
        <rect x="20" y="35" width="65" height="50" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <rect x="20" y="55" width="65" height="30" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" opacity="0.6" />
        <text x="52" y="73" textAnchor="middle" className="text-[9px] font-bold fill-sky-950">Víz = 35 cm</text>
        <text x="52" y="27" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">m = 50 cm</text>
      </svg>
    ),
    explanation: 'Váltsunk dm-re: a = 6 dm, b = 4 dm, víz magassága m_víz = 3,5 dm. V_víz = 6 · 4 · 3,5 = 24 · 3,5 = 84 dm³ = 84 liter víz.',
    hint: 'A víz magasságával (35 cm = 3,5 dm) számolj, ne a tartály teljes magasságával!',
    breakdown: [
      { label: 'Alapterület (6 dm · 4 dm)', value: '24 dm²' },
      { label: 'Víz magassága dm-ben', value: '35 cm = 3,5 dm' },
      { label: 'Víz térfogata (24 · 3,5)', value: '84 dm³ = 84 liter' }
    ]
  },
  {
    id: 'vq3-2',
    level: 3,
    prompt: 'Két darab egybevágó, 3 cm élű kockát összeragasztunk egy téglatestté. Mennyi lesz a keletkezett test térfogata?',
    options: [
      '54 cm³',
      '27 cm³',
      '48 cm³',
      '81 cm³'
    ],
    correctAnswer: 0,
    explanation: 'A térfogatok egyszerűen összeadódnak (ellentétben a felszínnel!): 1 kocka térfogata = 3³ = 27 cm³. Két kocka együtt: 2 · 27 = 54 cm³.',
    hint: 'A térfogat az anyag mennyisége: ha két testet összeraksz, a térfogatuk összeadódik!',
    breakdown: [
      { label: 'Egy kocka térfogata', value: '3 · 3 · 3 = 27 cm³' },
      { label: 'Két kocka összege', value: '27 + 27 = 54 cm³' }
    ]
  },
  {
    id: 'vq3-3',
    level: 3,
    prompt: 'Egy 4 cm élű tömör fa kocka egyik sarkából kivágunk egy 2 cm élű kis kockát. Mennyi a megmaradt test térfogata?',
    options: [
      '56 cm³',
      '60 cm³',
      '48 cm³',
      '32 cm³'
    ],
    correctAnswer: 0,
    explanation: 'A nagy kocka térfogata: 4 · 4 · 4 = 64 cm³. A kivágott kis kocka: 2 · 2 · 2 = 8 cm³. Maradék: 64 - 8 = 56 cm³.',
    hint: 'Számold ki a nagy kocka térfogatát (4³), és vond ki belőle a kivágott kis kocka térfogatát (2³)!',
    breakdown: [
      { label: 'Eredeti nagy kocka', value: '4 · 4 · 4 = 64 cm³' },
      { label: 'Kivágott kis kocka', value: '2 · 2 · 2 = 8 cm³' },
      { label: 'Megmaradt térfogat', value: '64 - 8 = 56 cm³' }
    ]
  },
  {
    id: 'vq3-4',
    level: 3,
    prompt: 'Egy kerti medence méretei: 6 m hosszú, 4 m széles és 1,5 m mély. Hány hektoliter (hl) víz fér bele?',
    options: [
      '360 hl',
      '36 hl',
      '3600 hl',
      '180 hl'
    ],
    correctAnswer: 0,
    explanation: 'V = 6 · 4 · 1,5 = 24 · 1,5 = 36 m³. Mivel 1 m³ = 10 hl (mert 1 m³ = 1000 liter), ezért 36 · 10 = 360 hl víz (36 000 liter).',
    hint: 'Számold ki a köbmétert (6 · 4 · 1,5 = 36 m³). 1 m³ = 10 hl, így szorozz 10-zel!',
    breakdown: [
      { label: 'Térfogat m³-ben', value: '6 · 4 · 1,5 = 36 m³' },
      { label: 'Váltás hektoliterbe (· 10)', value: '36 · 10 = 360 hl' },
      { label: 'Literben kifejezve', value: '36 000 liter' }
    ]
  },
  {
    id: 'vq3-5',
    level: 3,
    prompt: 'Egy kocka minden élét a 3-szorosára növeljük. Hányszorosára növekszik a kocka térfogata?',
    options: [
      '27-szeresére (mert 3³ = 27)',
      '9-szeresére',
      '3-szorosára',
      '81-szeresére'
    ],
    correctAnswer: 0,
    explanation: 'V_új = (3a) · (3a) · (3a) = 27 · a³. A térfogat pontosan 3 · 3 · 3 = 27-szeresére nő.',
    hint: '3 · 3 · 3 = ? (Ne téveszd össze a felszínnel, ami 9-szeresére nőne!)',
    breakdown: [
      { label: 'Hosszúság aránya', value: '3-szoros' },
      { label: 'Felszín aránya (3²)', value: '9-szeres' },
      { label: 'Térfogat aránya (3³)', value: '27-szeres' }
    ]
  },
  {
    id: 'vq3-6',
    level: 3,
    prompt: 'Egy téglatest alakú tartály alapélei a = 8 dm és b = 5 dm. 200 liter vizet öntünk bele. Milyen magasan áll a víz a tartályban?',
    options: [
      '5 dm',
      '4 dm',
      '6 dm',
      '2,5 dm'
    ],
    correctAnswer: 0,
    explanation: 'Alapterület: T_alap = 8 · 5 = 40 dm². A 200 liter = 200 dm³. Víz magassága: m = V : T_alap = 200 : 40 = 5 dm.',
    hint: 'Az alapterület 8 · 5 = 40 dm². Oszd el a 200 litert (200 dm³-t) 40-nel!',
    breakdown: [
      { label: 'Alapterület', value: '8 dm · 5 dm = 40 dm²' },
      { label: 'Víz térfogata', value: '200 liter = 200 dm³' },
      { label: 'Vízmagasság (200 : 40)', value: '5 dm (= 50 cm)' }
    ]
  },
  {
    id: 'vq3-7',
    level: 3,
    prompt: 'Egy teli, 150 literes fürdőkádba egy 20 cm × 15 cm × 10 cm-es tömör fémtéglát teljesen a víz alá merítünk. Hány liter víz folyik ki a teli kádból?',
    options: [
      '3 liter',
      '30 liter',
      '0,3 liter',
      '15 liter'
    ],
    correctAnswer: 0,
    explanation: 'Arkhimédész törvénye alapján a test pontosan annyi vizet szorít ki, amennyi a saját térfogata. V_fém = 20 · 15 · 10 = 3000 cm³ = 3 dm³ = 3 liter víz folyik ki.',
    hint: 'Pontosan a fémtégla térfogatának megfelelő víz folyik ki! Számold ki a tégla térfogatát, és váltsd át literbe!',
    breakdown: [
      { label: 'Fémtégla térfogata', value: '20 · 15 · 10 = 3000 cm³' },
      { label: 'Átváltás dm³-be', value: '3000 cm³ = 3 dm³' },
      { label: 'Kifolyó víz mennyisége', value: '3 liter' }
    ]
  },
  {
    id: 'vq3-8',
    level: 3,
    prompt: 'Egy teherautó platója 3 m hosszú és 2 m széles. 6 m³ kavicsot szállítanak rajta. Milyen vastag a kavicsréteg a platón egyenletesen elterítve?',
    options: [
      '1 méter',
      '0,5 méter',
      '2 méter',
      '1,5 méter'
    ],
    correctAnswer: 0,
    explanation: 'Plató alapterülete: T_alap = 3 · 2 = 6 m². Magasság = V : T_alap = 6 : 6 = 1 méter.',
    hint: 'Alapterület = 3 · 2 = 6 m². Magasság = Térfogat : Alapterület.',
    breakdown: [
      { label: 'Plató felülete', value: '3 m · 2 m = 6 m²' },
      { label: 'Kavicsréteg vastagsága', value: '6 m³ : 6 m² = 1 m' }
    ]
  },
  {
    id: 'vq3-9',
    level: 3,
    prompt: 'Egy 10 cm (= 1 dm) élű kocka alakú edénybe 8 dl vizet öntünk. Hány centiméter magasan fog állni a víz az edényben?',
    options: [
      '8 cm',
      '6 cm',
      '4 cm',
      '5 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az edény alapterülete: 1 dm · 1 dm = 1 dm² = 100 cm². 8 dl víz = 0,8 liter = 800 cm³. Víz magassága: 800 : 100 = 8 cm (vagy dm-ben: 0,8 dm³ : 1 dm² = 0,8 dm = 8 cm).',
    hint: 'Mivel a teljes kocka 10 cm magas és 10 dl (1 liter) fér bele, 8 dl víz pontosan 8 cm magasan áll!',
    breakdown: [
      { label: 'Edény alapterülete', value: '10 cm · 10 cm = 100 cm²' },
      { label: '8 dl víz cm³-ben', value: '800 ml = 800 cm³' },
      { label: 'Víz magassága (800 : 100)', value: '8 cm' }
    ]
  },
  {
    id: 'vq3-10',
    level: 3,
    prompt: 'Egy kocka térfogata V = 64 cm³. Mennyi a kocka TELJES FELSZÍNE (A)?',
    options: [
      '96 cm²',
      '64 cm²',
      '24 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Térfogatból élhossz: a³ = 64 cm³ → a = 4 cm (mert 4 · 4 · 4 = 64). Egy lap területe: 4 · 4 = 16 cm². Felszín: A = 6 · 16 = 96 cm².',
    hint: 'Először a térfogatból határozd meg a kocka élét (melyik szám köbe 64?). Majd számold ki a 6 lap területét: 6 · a²!',
    breakdown: [
      { label: 'Él hossza (a³ = 64)', value: 'a = 4 cm' },
      { label: 'Egy négyzetlap területe', value: '4 · 4 = 16 cm²' },
      { label: 'Teljes felszín (A = 6 · 16)', value: '96 cm²' }
    ]
  }
];

export const VolumeQuiz: React.FC<VolumeQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="Téglatest és kocka térfogata kvíz"
      subtitle="Teszteld tudásodat a térfogatképletekről, hiányzó élek visszaszámolásáról és tartályokról 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 8. KVÍZ"
      storageKey="g5-meas-volume-quiz"
      questions={VOLUME_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <CuboidCubeVolumeMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <CuboidCubeVolumeSorter
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
            <div className="font-bold text-indigo-700 dark:text-indigo-400">1. Szint Puskája: Képletek</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <strong>Kocka térfogata:</strong><br />
                <code className="text-indigo-600 font-bold">V = a³ = a · a · a</code>
              </div>
              <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <strong>Téglatest térfogata:</strong><br />
                <code className="text-indigo-600 font-bold">V = a · b · c = T_alap · m</code>
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">2. Szint Puskája: Visszaszámolás & Duplázás</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Magasság alapterületből:</strong> m = V : T_alap = V : (a · b)</div>
              <div>• <strong>Kocka éle:</strong> megkeressük, melyik számnak a harmadik hatványa V.</div>
              <div>• <strong>Élek megkettőzése:</strong> a térfogat 2³ = 8-szorosára nő!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">3. Szint Puskája: Víz és tartályok</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>dm³ = liter:</strong> ha az éleket dm-ben szorzod össze, a kapott szám azonnal litert ad!</div>
              <div>• <strong>1 m³ = 1000 liter = 10 hl</strong></div>
              <div>• <strong>Összetett testeknél:</strong> a térfogatok összeadódnak vagy kivonódnak.</div>
            </div>
          </div>
        )
      }}
    />
  );
};

export const CuboidCubeVolumeQuiz = VolumeQuiz;
