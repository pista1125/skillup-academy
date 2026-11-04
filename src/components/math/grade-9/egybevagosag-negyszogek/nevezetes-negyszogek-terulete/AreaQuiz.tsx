import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, DifficultyLevel, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AreaMatcher } from './AreaMatcher';
import { AreaSorter } from './AreaSorter';
import { Layers, Square, Sparkles } from 'lucide-react';
import {
  ParallelogramDissectionSvg,
  TrapezoidDissectionSvg,
  RhombusKiteAreaSvg
} from './AreaFigures';

interface AreaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const cheatSheet: CheatSheetItem[] = [
  {
    title: 'Paralelogramma Területe',
    content: 'T = a · m_a = b · m_b. A levágott derékszögű háromszög átrakásával egyenlő alapú és magasságú téglalappá alakítható.'
  },
  {
    title: 'Trapéz Területe',
    content: 'T = ((a + c) / 2) · m = k · m, ahol k a középvonal (középpárhuzamos): k = (a + c) / 2. Két egybevágó trapéz összeillesztve egy (a + c) alapú paralelogrammát ad.'
  },
  {
    title: 'Merőleges Átlójú Négyszögek',
    content: 'T = (e · f) / 2. Érvényes minden rombuszra, deltoidra, négyzetre és bármely négyszögre, amelynek átlói 90°-ot zárnak be.'
  },
  {
    title: 'Húrtrapéz Magassága Pitagorasszal',
    content: 'A szimmetria miatt a magasság levágja az alapról az x = (a − c) / 2 szakaszt. Ekkor a magasság: m = √(b² − x²).'
  }
];

const questions: Question[] = [
  // --- 1. SZINT: Alapképletek és Fogalmak (10 kérdés) ---
  {
    id: 'aq1-1',
    level: 1,
    question: 'Mi a paralelogramma területképlete az a oldal és a hozzá tartozó m_a magasság ismeretében?',
    figure: <ParallelogramDissectionSvg size={200} />,
    options: ['T = a · m_a', 'T = (a · m_a) / 2', 'T = a + m_a', 'T = a² · m_a'],
    correctAnswer: 0,
    explanation: 'A paralelogramma területe az alap és a hozzá tartozó magasság szorzata: T = a · m_a.'
  },
  {
    id: 'aq1-2',
    level: 1,
    question: 'Mi a trapéz területképlete az a, c párhuzamos alapok és az m magasság segítségével?',
    figure: <TrapezoidDissectionSvg size={200} />,
    options: [
      'T = ((a + c) / 2) · m',
      'T = (a · c) · m',
      'T = (a + c + m) / 2',
      'T = (a · m) / 2 + c'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz területe a párhuzamos alapok számtani közepe szorozva a magassággal: T = ((a + c) / 2) · m.'
  },
  {
    id: 'aq1-3',
    level: 1,
    question: 'Hogyan számítjuk ki egy rombusz vagy deltoid területét az e és f átlók ismeretében?',
    figure: <RhombusKiteAreaSvg size={200} />,
    options: [
      'T = (e · f) / 2',
      'T = e · f',
      'T = (e + f) · 2',
      'T = √(e · f)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a rombusz és a deltoid átlói merőlegesek egymásra, területük a köréjük írt téglalap területének a fele: T = (e · f) / 2.'
  },
  {
    id: 'aq1-4',
    level: 1,
    question: 'Egy négyzet átlója d. Hogyan fejezhető ki a területe közvetlenül a d átlóból?',
    options: ['T = d² / 2', 'T = d²', 'T = 2d²', 'T = d / √2'],
    correctAnswer: 0,
    explanation: 'A négyzet átlói egyenlők és merőlegesek egymásra: T = (d · d) / 2 = d² / 2.'
  },
  {
    id: 'aq1-5',
    level: 1,
    question: 'Mit nevezünk a trapéz középvonalának (középpárhuzamosának), és mennyi a hossza?',
    figure: <TrapezoidDissectionSvg size={200} />,
    options: [
      'A két szár felezőpontját összekötő szakasz, hossza k = (a + c) / 2',
      'A két átló metszéspontját a csúccsal összekötő szakasz, hossza (a − c) / 2',
      'A magasságvonal felezője, hossza m / 2',
      'A hosszabbik alap felét, hossza a / 2'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz középvonala a két szár felezőpontját köti össze, párhuzamos az alapokkal, és hossza a két alap számtani közepe: k = (a + c) / 2.'
  },
  {
    id: 'aq1-6',
    level: 1,
    question: 'Egy deltoid átlói e = 10 cm és f = 6 cm. Mekkora a területe?',
    options: ['30 cm²', '60 cm²', '16 cm²', '32 cm²'],
    correctAnswer: 0,
    explanation: 'T = (e · f) / 2 = (10 · 6) / 2 = 60 / 2 = 30 cm².'
  },
  {
    id: 'aq1-7',
    level: 1,
    question: 'Egy téglalap oldalai a = 8 cm és b = 5 cm. Mekkora a területe és a kerülete?',
    options: [
      'T = 40 cm², K = 26 cm',
      'T = 26 cm², K = 40 cm',
      'T = 40 cm², K = 13 cm',
      'T = 80 cm², K = 26 cm'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b = 8 · 5 = 40 cm², K = 2 · (a + b) = 2 · (8 + 5) = 26 cm.'
  },
  {
    id: 'aq1-8',
    level: 1,
    question: 'Miért NEM egyenlő egy általános paralelogramma területe egyszerűen a két szomszédos oldal szorzatával (a · b)?',
    figure: <ParallelogramDissectionSvg size={200} />,
    options: [
      'Mert a szár (b) ferde, így a merőleges magasság (m_a) szigorúan rövidebb, mint b',
      'Mert a paralelogramma területe mindig nulla',
      'Mert a két oldal összeadódik, nem szorzódik',
      'Mert az átlók miatt el kell osztani kettővel'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszögben a befogó rövidebb az átfogónál (m_a < b ha a szög nem 90°), így a · m_a < a · b. Csak téglalapnál egyezik meg a kettő.'
  },
  {
    id: 'aq1-9',
    level: 1,
    question: 'Egy rombusz oldala a = 6 cm, a hozzá tartozó magassága m = 4 cm. Mekkora a területe?',
    options: ['24 cm²', '12 cm²', '48 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'Mivel a rombusz is paralelogramma, a területe T = a · m = 6 · 4 = 24 cm².'
  },
  {
    id: 'aq1-10',
    level: 1,
    question: 'Egy négyzet területe 64 cm². Mekkora az oldala és az átlója?',
    options: [
      'Oldala a = 8 cm, átlója d = 8√2 cm',
      'Oldala a = 16 cm, átlója d = 32 cm',
      'Oldala a = 8 cm, átlója d = 16 cm',
      'Oldala a = 4 cm, átlója d = 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'T = a² = 64 → a = √64 = 8 cm. Az átló Pitagorasz-tétellel: d = a√2 = 8√2 cm.'
  },

  // --- 2. SZINT: Számítások és Képletalkalmazások (10 kérdés) ---
  {
    id: 'aq2-1',
    level: 2,
    question: 'Egy paralelogramma oldalai a = 12 cm és b = 8 cm. Az a oldalhoz tartozó magasság m_a = 6 cm. Mekkora a b oldalhoz tartozó m_b magasság?',
    options: [
      '9 cm (mert a · m_a = b · m_b → 12 · 6 = 8 · m_b → 72 = 8 · m_b)',
      '4 cm',
      '8 cm',
      '7,5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A terület állandó: T = a · m_a = 12 · 6 = 72 cm². Másfelől T = b · m_b → 72 = 8 · m_b → m_b = 72 / 8 = 9 cm.'
  },
  {
    id: 'aq2-2',
    level: 2,
    question: 'Egy trapéz alapjai a = 14 cm és c = 6 cm, magassága m = 7 cm. Mekkora a területe?',
    options: ['70 cm²', '140 cm²', '98 cm²', '48 cm²'],
    correctAnswer: 0,
    explanation: 'T = ((a + c) / 2) · m = ((14 + 6) / 2) · 7 = (20 / 2) · 7 = 10 · 7 = 70 cm².'
  },
  {
    id: 'aq2-3',
    level: 2,
    question: 'Egy rombusz átlói e = 12 cm és f = 16 cm. Mekkora a rombusz oldala (a)?',
    options: [
      '10 cm (Pitagorasz-tétel a félozásból: 6² + 8² = 36 + 64 = 100 = 10²)',
      '14 cm',
      '20 cm',
      '9,6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz átlói merőlegesen felezik egymást, a félátlók: e/2 = 6 cm és f/2 = 8 cm. A derékszögű háromszögből: a = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.'
  },
  {
    id: 'aq2-4',
    level: 2,
    question: 'Az előző rombusz területe T = (12 · 16) / 2 = 96 cm², oldala a = 10 cm. Mekkora a rombusz magassága (m)?',
    options: ['9,6 cm', '8 cm', '10 cm', '4,8 cm'],
    correctAnswer: 0,
    explanation: 'T = a · m → 96 = 10 · m → m = 96 / 10 = 9,6 cm.'
  },
  {
    id: 'aq2-5',
    level: 2,
    question: 'Egy húrtrapéz hosszabbik alapja a = 16 cm, rövidebbik alapja c = 6 cm, a szára b = 13 cm. Mekkora a trapéz területe?',
    options: [
      '132 cm² (x = (16−6)/2 = 5 cm, m = √(13²−5²) = 12 cm, T = 11 · 12 = 132 cm²)',
      '143 cm²',
      '120 cm²',
      '96 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetria miatt az alapon levágott darab x = (16 − 6) / 2 = 5 cm. A magasság Pitagorasz-tétellel: m = √(13² − 5²) = √(169 − 25) = √144 = 12 cm. A terület: T = ((16 + 6) / 2) · 12 = 11 · 12 = 132 cm².'
  },
  {
    id: 'aq2-6',
    level: 2,
    question: 'Egy négyzet átlója d = 10 cm. Mekkora a területe?',
    options: ['50 cm²', '100 cm²', '25 cm²', '70,7 cm²'],
    correctAnswer: 0,
    explanation: 'T = d² / 2 = 10² / 2 = 100 / 2 = 50 cm².'
  },
  {
    id: 'aq2-7',
    level: 2,
    question: 'Egy deltoid területe 48 cm², az egyik átlója e = 8 cm. Mekkora a másik átlója (f)?',
    options: ['12 cm', '6 cm', '16 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'T = (e · f) / 2 → 48 = (8 · f) / 2 → 48 = 4 · f → f = 12 cm.'
  },
  {
    id: 'aq2-8',
    level: 2,
    question: 'Egy derékszögű trapéz alapjai a = 9 cm és c = 5 cm, a merőleges szára (ami egyben a magassága) m = 6 cm. Mekkora a területe?',
    options: ['42 cm²', '84 cm²', '54 cm²', '30 cm²'],
    correctAnswer: 0,
    explanation: 'T = ((a + c) / 2) · m = ((9 + 5) / 2) · 6 = (14 / 2) · 6 = 7 · 6 = 42 cm².'
  },
  {
    id: 'aq2-9',
    level: 2,
    question: 'Egy trapéz középvonala k = 15 cm, magassága m = 8 cm. Mekkora a területe?',
    figure: <TrapezoidDissectionSvg size={200} />,
    options: ['120 cm²', '60 cm²', '240 cm²', '90 cm²'],
    correctAnswer: 0,
    explanation: 'Mivel a középvonal k = (a + c) / 2, a trapéz területe közvetlenül: T = k · m = 15 · 8 = 120 cm².'
  },
  {
    id: 'aq2-10',
    level: 2,
    question: 'Egy paralelogramma területe 96 cm², magassága m_a = 8 cm. Mekkora az a alap hossza?',
    figure: <ParallelogramDissectionSvg size={200} />,
    options: ['12 cm', '16 cm', '10 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'T = a · m_a → 96 = a · 8 → a = 96 / 8 = 12 cm.'
  },

  // --- 3. SZINT: Összetett Feladatok, Arányok és Tételek (10 kérdés) ---
  {
    id: 'aq3-1',
    level: 3,
    question: 'Hogyan aránylik a tetszőleges négyszög oldalfelező pontjai által alkotott Varignon-paralelogramma területe (T_V) az eredeti négyszög teljes területéhez (T)?',
    options: [
      'T_V = T / 2 (pontosan a fele az eredeti négyszög területének)',
      'T_V = T / 4 (a negyede)',
      'T_V = (2/3) · T',
      'Függ a négyszög alakjától'
    ],
    correctAnswer: 0,
    explanation: 'Varignon tétele szerint az oldalfelezők összekötésével kapott paralelogramma területe BÁRMELY konvex négyszög esetén szigorúan a teljes terület fele (T_V = T/2)!'
  },
  {
    id: 'aq3-2',
    level: 3,
    question: 'Egy rombusz oldala a = 10 cm, és egyik belső szöge 30°. Mekkora a területe (felhasználva, hogy sin 30° = 0,5)?',
    options: [
      '50 cm² (m = 10 · sin 30° = 5 cm, T = 10 · 5 = 50 cm²)',
      '100 cm²',
      '25 cm²',
      '86,6 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszögből a magasság m = a · sin(30°) = 10 · 0,5 = 5 cm. A terület T = a · m = 10 · 5 = 50 cm² (vagy T = a² · sin α = 100 · 0,5 = 50 cm²).'
  },
  {
    id: 'aq3-3',
    level: 3,
    question: 'Egy trapézt az átlói 4 háromszögre bontanak. A szárakon fekvő két háromszög területe T₁ és T₂. Mi mondható el róluk?',
    options: [
      'Mindig egyenlő a területük: T₁ = T₂',
      'T₁ mindig kétszerese T₂-nek',
      'Csak akkor egyenlők, ha a trapéz húrtrapéz',
      'A területek összege egyenlő a trapéz kerületével'
    ],
    correctAnswer: 0,
    explanation: 'Az alapokon nyugvó teljes háromszögek területe megegyezik (azonos alap és magasság miatt). Levonva a közös alapú háromszöget, a szárakon fekvő két háromszög területe BÁRMILYEN trapéznál szigorúan megegyezik (T₁ = T₂).'
  },
  {
    id: 'aq3-4',
    level: 3,
    question: 'Egy húrtrapéz alapjai a = 20 cm és c = 8 cm, a körülírt köre érinti a csúcsokat. Ha a magassága m = 8 cm, mekkora a trapéz átlójának (e) hossza?',
    options: [
      '√(14² + 8²) = √(196 + 64) = √260 ≈ 16,12 cm',
      '18 cm',
      '20 cm',
      '14 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az átló, a magasság (m = 8) és az átló vetülete derékszögű háromszöget alkot. Az átló vetülete az alsó alapon: a − x = 20 − ((20−8)/2) = 20 − 6 = 14 cm. Pitagorasszal: e = √(14² + 8²) = √(196 + 64) = √260 cm.'
  },
  {
    id: 'aq3-5',
    level: 3,
    question: 'Ha egy paralelogramma minden oldalát és magasságát 3-szorosára növeljük, hányszorosára nő a területe?',
    options: ['9-szeresére (λ² = 3² = 9)', '3-szorosára', '6-szorosára', '27-szeresére'],
    correctAnswer: 0,
    explanation: 'Hasonló síkidomok esetén a területek aránya a hasonlósági arány négyzete: T\' / T = λ² = 3² = 9.'
  },
  {
    id: 'aq3-6',
    level: 3,
    question: 'Egy telek területe trapéz alakú: a = 50 m, c = 30 m, m = 20 m. A telek négyzetméterenkénti ára 15 000 Ft. Mennyibe kerül a telek?',
    options: [
      '12 000 000 Ft (T = 40 · 20 = 800 m², 800 · 15 000 = 12 000 000 Ft)',
      '15 000 000 Ft',
      '9 000 000 Ft',
      '24 000 000 Ft'
    ],
    correctAnswer: 0,
    explanation: 'T = ((50 + 30) / 2) · 20 = 40 · 20 = 800 m². Ár = 800 · 15 000 = 12 000 000 Ft.'
  },
  {
    id: 'aq3-7',
    level: 3,
    question: 'Egy deltoid szimmetriaátlója e = 14 cm, amelyet a másik f átló 3 cm és 11 cm hosszú részekre oszt. Ha a másik átló f = 8 cm, mekkora a deltoid területe?',
    figure: <RhombusKiteAreaSvg size={200} />,
    options: [
      '56 cm² (T = (e · f) / 2 = (14 · 8) / 2 = 56 cm²)',
      '112 cm²',
      '48 cm²',
      '44 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid területe csak az átlók hosszától és merőlegességétől függ: T = (e · f) / 2 = (14 · 8) / 2 = 56 cm². Az osztópont aránya a terület nagyságát nem befolyásolja.'
  },
  {
    id: 'aq3-8',
    level: 3,
    question: 'Egy négyzet és egy szabályos rombusz oldala egyaránt 10 cm. Melyik alakzatnak nagyobb a területe, ha a rombusz nem négyzet?',
    options: [
      'A négyzet területe nagyobb (100 cm² > 100 · sin α)',
      'A rombusz területe nagyobb',
      'Mindig pontosan egyenlő a területük',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet területe 10² = 100 cm². A rombusz területe 10² · sin(α). Mivel 0° < α < 90° vagy 90° < α < 180° esetén sin(α) < 1, a rombusz területe mindig szigorúan kisebb a négyzeténél.'
  },
  {
    id: 'aq3-9',
    level: 3,
    question: 'Egy húrtrapéz alapjai a = 25 cm és c = 7 cm, a szára b = 15 cm. Mennyi a trapéz kerületének és területének az aránya (K : T)?',
    options: [
      'K = 62 cm, T = 192 cm² (m = √(15²−9²) = 12 cm, T = 16 · 12 = 192 cm²)',
      'K = 62 cm, T = 240 cm²',
      'K = 54 cm, T = 180 cm²',
      'K = 70 cm, T = 200 cm²'
    ],
    correctAnswer: 0,
    explanation: 'K = a + c + 2b = 25 + 7 + 30 = 62 cm. x = (25 − 7) / 2 = 9 cm. m = √(15² − 9²) = √(225 − 81) = √144 = 12 cm. T = ((25 + 7) / 2) · 12 = 16 · 12 = 192 cm².'
  },
  {
    id: 'aq3-10',
    level: 3,
    question: 'Egy konvex négyszög átlói e = 10 cm és f = 14 cm, és 90°-os szöget zárnak be egymással, de a négyszög nem szimmetrikus. Alkalmazható-e a T = (e · f) / 2 képlet?',
    figure: <RhombusKiteAreaSvg size={200} />,
    options: [
      'Igen, minden merőleges átlójú konvex négyszög területe (e · f) / 2',
      'Nem, kizárólag deltoidra és rombuszra érvényes',
      'Csak akkor, ha legalább az egyik átló felezi a másikat',
      'Nem, mert a trapéz képletét kell használni'
    ],
    correctAnswer: 0,
    explanation: 'A 4 derékszögű részháromszög területének összege: (e₁·f₁ + e₁·f₂ + e₂·f₁ + e₂·f₂) / 2 = (e₁ + e₂)(f₁ + f₂) / 2 = (e · f) / 2. Ezért BÁRMELY merőleges átlójú négyszögre maradéktalanul érvényes!'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapképletek és Fogalmak',
    subtitle: 'Téglalap, négyzet, paralelogramma, trapéz és deltoid alapképletei behelyettesítéssel.',
    range: '1 - 10. feladat',
    focus: 'Alapképletek & Fogalmak',
    badgeText: '10 Kérdés',
    questions: questions.slice(0, 10)
  },
  2: {
    level: 2,
    title: '2. Szint: Gyakorlati Számítások és Pitagorasz',
    subtitle: 'Trapéz magassága, rombusz átlói, fordított feladatok és mértékegység-váltás.',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Pitagorasz',
    badgeText: '10 Kérdés',
    questions: questions.slice(10, 20)
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Szöveges Geometriai Feladatok',
    subtitle: 'Varignon-tétel, trapéz átlói által bontott részháromszögek, arányok és bizonyítások.',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeText: '10 Kérdés',
    questions: questions.slice(20, 30)
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Paralelogramma és Trapéz',
    badge: 'Alap × Magasság',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Paralelogramma: T = a · m_a. Trapéz: T = ((a + c) / 2) · m = k · m.',
    formula: 'k = (a + c) / 2 (középvonal hossza)',
    note: 'Két egybevágó trapéz összeillesztve (a + c) alapú paralelogrammát ad.',
    icon: <Layers className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Merőleges Átlójú Négyszögek',
    badge: 'T = (e · f) / 2',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Minden deltoidra, rombuszra és négyzetre érvényes átlóképlet.',
    formula: 'T = (e · f) / 2 | Rombusz: m = (e · f) / (2a)',
    note: 'Bármely négyszögre igaz, ha átlói derékszöget zárnak be.',
    icon: <Square className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Varignon-tétel és Átdarabolás',
    badge: 'T_varignon = T / 2',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Bármely négyszög oldalfelezőiből alkotott paralelogramma területe fele az eredetinek.',
    formula: 'T_belső = T_eredeti / 2',
    note: 'Trapéz szárain fekvő két háromszög területe mindig egyenlő: T₁ = T₂.',
    icon: <Sparkles className="w-5 h-5 text-indigo-600" />
  }
];

export const AreaQuiz: React.FC<AreaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  topicId = 'g9-trans-terulet',
  topicTitle = '7. Nevezetes négyszögek területe'
}) => {
  return (
    <QuizTemplate
      title="7. Nevezetes négyszögek területe kvíz"
      subtitle="30 válogatott feladat 3 szinten: téglalap, paralelogramma, trapéz, rombusz és deltoid területe, Varignon-tétel"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG, NÉGYSZÖGEK"
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      questions={questions}
      levels={quizLevels}
      cheatSheet={cheatSheet}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Geometria Segédlet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <AreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

