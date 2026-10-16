import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { PolygonPerimeterMatcher } from './PolygonPerimeterMatcher';
import { PolygonPerimeterSorter } from './PolygonPerimeterSorter';

interface PolygonPerimeterQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetContent: CheatSheetContent = {
  title: 'Szabálytár: A sokszögek kerülete',
  sections: [
    {
      title: '1. A kerület alapszabálya',
      content:
        'A kerület (K) a síkidomot határoló oldalak hosszának az összege: K = a + b + c + ... + n.\nMértékegységek egyeztetése: Számolás előtt minden oldalhosszt azonos mértékegységre (pl. cm-re) kell váltani!'
    },
    {
      title: '2. Háromszögek kerülete',
      content:
        '• Általános háromszög: K = a + b + c\n• Egyenlő szárú háromszög: K = a + 2 · b (alap + 2 szár)\n• Szabályos háromszög: K = 3 · a (3 egyenlő oldal)'
    },
    {
      title: '3. Négyszögek és sokszögek kerülete',
      content:
        '• Négyzet: K = 4 · a (visszafelé: a = K : 4)\n• Téglalap: K = 2 · (a + b) (visszafelé: b = K : 2 - a)\n• Rombusz: K = 4 · a\n• Paralelogramma és deltoid: K = 2 · (a + b)\n• Szabályos n-szög: K = n · a'
    },
    {
      title: '4. Visszafelé számolások és trükkök',
      content:
        '• Téglalapnál először felezd meg a kerületet (félkerület = a + b), ebből vond ki az ismert oldalt!\n• Egyenlő szárú háromszögnél a kerületből vond ki az alapot, majd a maradékot oszd el 2-vel a szár hosszához!'
    }
  ]
};

// Sematikus ábrák (NEM árulják el az eredményt)
const RectangleSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 200 100" className="w-full max-w-[180px] h-auto drop-shadow-xs">
      <rect x="25" y="20" width="150" height="60" rx="4" fill="#3b82f615" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="100" y="14" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#2563eb">a</text>
      <text x="100" y="94" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#2563eb">a</text>
      <text x="12" y="55" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#2563eb">b</text>
      <text x="188" y="55" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#2563eb">b</text>
    </svg>
  </div>
);

const SquareSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 120 120" className="w-full max-w-[130px] h-auto drop-shadow-xs">
      <rect x="20" y="20" width="80" height="80" rx="4" fill="#10b98115" stroke="#10b981" strokeWidth="2.5" />
      <text x="60" y="14" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#059669">a</text>
      <text x="108" y="65" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#059669">a</text>
      <text x="60" y="114" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#059669">a</text>
      <text x="12" y="65" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#059669">a</text>
    </svg>
  </div>
);

const TriangleSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 160 110" className="w-full max-w-[150px] h-auto drop-shadow-xs">
      <polygon points="80,15 15,95 145,95" fill="#f59e0b15" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="80" y="107" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#d97706">a</text>
      <text x="40" y="50" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#d97706">b</text>
      <text x="120" y="50" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#d97706">c</text>
    </svg>
  </div>
);

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'pp-q1',
    level: 1,
    question: 'Mit nevezünk egy síkidom (sokszög) kerületének?',
    options: [
      'A síkidomot határoló összes oldal hosszának összegét',
      'A síkidom által lefedett felület nagyságát',
      'A leghosszabb és legrövidebb oldalának szorzatát',
      'A csúcsok számának és a magasságnak a szorzatát'
    ],
    correctAnswer: 0,
    hint: 'Gondolj a körbejárásra: mintha végigmennél a síkidom kerítése mentén.',
    explanation: 'A kerület a sokszöget határoló élek (oldalak) együttes hossza, azaz az oldalhosszak összege.'
  },
  {
    id: 'pp-q2',
    level: 1,
    figure: <SquareSvg />,
    question: 'Mekkora a négyzet kerülete, ha egy oldalának hossza a = 8 cm?',
    options: ['32 cm', '64 cm', '16 cm', '24 cm'],
    correctAnswer: 0,
    hint: 'A négyzetnek 4 darab egyenlő oldala van: K = 4 · a.',
    explanation: 'K = 4 · a = 4 · 8 cm = 32 cm. (A 64 cm² a területe lenne, nem a kerülete).'
  },
  {
    id: 'pp-q3',
    level: 1,
    figure: <RectangleSvg />,
    question: 'Egy téglalap oldalai a = 7 cm és b = 4 cm. Mennyi a kerülete?',
    options: ['22 cm', '28 cm', '11 cm', '44 cm'],
    correctAnswer: 0,
    hint: 'A téglalap szemközti oldalai egyenlők: K = 2 · (a + b).',
    explanation: 'K = 2 · (a + b) = 2 · (7 + 4) = 2 · 11 = 22 cm.'
  },
  {
    id: 'pp-q4',
    level: 1,
    figure: <TriangleSvg />,
    question: 'Mekkora a szabályos (egyenlő oldalú) háromszög kerülete, ha oldala a = 12 cm?',
    options: ['36 cm', '24 cm', '48 cm', '144 cm'],
    correctAnswer: 0,
    hint: 'A szabályos háromszög mindhárom oldala egyenlő: K = 3 · a.',
    explanation: 'K = 3 · a = 3 · 12 cm = 36 cm.'
  },
  {
    id: 'pp-q5',
    level: 1,
    question: 'Egy egyenlő szárú háromszög alapja 10 cm, szárainak hossza egyenként 6 cm. Mekkora a kerülete?',
    options: ['22 cm', '16 cm', '26 cm', '32 cm'],
    correctAnswer: 0,
    hint: 'Két szára van és egy alapja: K = a + 2 · b.',
    explanation: 'K = alap + 2 · szár = 10 + 2 · 6 = 10 + 12 = 22 cm.'
  },
  {
    id: 'pp-q6',
    level: 1,
    question: 'Mekkora a rombusz kerülete, ha oldala a = 15 cm?',
    options: ['60 cm', '30 cm', '45 cm', '225 cm'],
    correctAnswer: 0,
    hint: 'A rombusz minden oldala egyenlő hosszúságú, pontosan úgy, mint a négyzeté: K = 4 · a.',
    explanation: 'K = 4 · a = 4 · 15 cm = 60 cm.'
  },
  {
    id: 'pp-q7',
    level: 1,
    question: 'Egy paralelogramma két szomszédos oldala a = 9 cm és b = 5 cm. Mekkora a kerülete?',
    options: ['28 cm', '45 cm', '14 cm', '19 cm'],
    correctAnswer: 0,
    hint: 'A paralelogramma szemközti oldalai egyenlő hosszúak: K = 2 · (a + b).',
    explanation: 'K = 2 · (9 + 5) = 2 · 14 = 28 cm.'
  },
  {
    id: 'pp-q8',
    level: 1,
    question: 'Mekkora a szabályos hatszög kerülete, ha egy oldala a = 5 cm?',
    options: ['30 cm', '25 cm', '35 cm', '20 cm'],
    correctAnswer: 0,
    hint: 'A szabályos hatszögnek 6 egyenlő oldala van: K = 6 · a.',
    explanation: 'K = 6 · a = 6 · 5 cm = 30 cm.'
  },
  {
    id: 'pp-q9',
    level: 1,
    question: 'Egy általános háromszög oldalai 4 cm, 7 cm és 9 cm. Mekkora a kerülete?',
    options: ['20 cm', '18 cm', '22 cm', '25 cm'],
    correctAnswer: 0,
    hint: 'Add össze mind a három oldalt: K = a + b + c.',
    explanation: 'K = 4 + 7 + 9 = 20 cm.'
  },
  {
    id: 'pp-q10',
    level: 1,
    question: 'Egy szabályos nyolcszög oldala 6 cm. Mennyi a kerülete?',
    options: ['48 cm', '40 cm', '56 cm', '64 cm'],
    correctAnswer: 0,
    hint: '8 egyenlő oldal: K = 8 · a.',
    explanation: 'K = 8 · 6 cm = 48 cm.'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ==========================================
  {
    id: 'pp-q11',
    level: 2,
    question: 'Egy téglalap egyik oldala 35 cm, a másik oldala 2 dm. Mekkora a téglalap kerülete cm-ben?',
    options: ['110 cm', '74 cm', '55 cm', '140 cm'],
    correctAnswer: 0,
    hint: 'Váltsd át a 2 dm-t centiméterre (2 dm = 20 cm), majd számítsd ki a kerületet: K = 2 · (a + b)!',
    explanation: '2 dm = 20 cm. K = 2 · (35 + 20) = 2 · 55 = 110 cm.'
  },
  {
    id: 'pp-q12',
    level: 2,
    figure: <SquareSvg />,
    question: 'Egy négyzet kerülete K = 36 cm. Hány centiméter a négyzet egy oldala (a)?',
    options: ['9 cm', '6 cm', '12 cm', '18 cm'],
    correctAnswer: 0,
    hint: 'Mivel a négyzet 4 oldala egyenlő, a kerületet el kell osztani 4-gyel: a = K : 4.',
    explanation: 'a = K : 4 = 36 : 4 = 9 cm.'
  },
  {
    id: 'pp-q13',
    level: 2,
    figure: <RectangleSvg />,
    question: 'Egy téglalap kerülete K = 26 cm, és az egyik oldala a = 8 cm. Mekkora a másik oldala (b)?',
    options: ['5 cm', '9 cm', '10 cm', '18 cm'],
    correctAnswer: 0,
    hint: 'Először számold ki a félkerületet: a + b = 26 : 2 = 13 cm. Ebből vond ki a-t!',
    explanation: 'a + b = K : 2 = 13 cm. Így b = 13 - 8 = 5 cm. Ellenőrzés: 2 · (8 + 5) = 2 · 13 = 26 cm.'
  },
  {
    id: 'pp-q14',
    level: 2,
    question: 'Egy szabályos háromszög kerülete K = 42 cm. Mekkora az egyik oldala?',
    options: ['14 cm', '12 cm', '21 cm', '7 cm'],
    correctAnswer: 0,
    hint: 'A három egyenlő oldal miatt oszd el a kerületet 3-mal: a = K : 3.',
    explanation: 'a = K : 3 = 42 : 3 = 14 cm.'
  },
  {
    id: 'pp-q15',
    level: 2,
    question: 'Egy egyenlő szárú háromszög kerülete 30 cm, az alapja pedig 12 cm. Mekkora egy szár hossza?',
    options: ['9 cm', '18 cm', '6 cm', '10 cm'],
    correctAnswer: 0,
    hint: 'A kerületből vond ki az alapot (30 - 12 = 18 cm). A két egyenlő szár összege 18 cm, ezt felezd meg!',
    explanation: 'A két szár összege: 30 - 12 = 18 cm. Egy szár hossza: 18 : 2 = 9 cm.'
  },
  {
    id: 'pp-q16',
    level: 2,
    question: 'Egy egyenlő szárú háromszög kerülete 40 cm, a szárai pedig 14 cm hosszúak. Mekkora az alapja?',
    options: ['12 cm', '14 cm', '26 cm', '13 cm'],
    correctAnswer: 0,
    hint: 'A két szár összesen 2 · 14 = 28 cm. Ezt vond ki a 40 cm-ből!',
    explanation: 'Alap = K - 2 · szár = 40 - 2 · 14 = 40 - 28 = 12 cm.'
  },
  {
    id: 'pp-q17',
    level: 2,
    question: 'Egy rombusz kerülete K = 52 cm. Hány centiméter egy oldala?',
    options: ['13 cm', '26 cm', '17 cm', '10 cm'],
    correctAnswer: 0,
    hint: 'A rombusz négy oldala egyenlő: a = K : 4.',
    explanation: 'a = K : 4 = 52 : 4 = 13 cm.'
  },
  {
    id: 'pp-q18',
    level: 2,
    question: 'Egy négyzet oldala a = 250 cm. Hány méter a négyzet kerülete?',
    options: ['10 m', '1 m', '5 m', '25 m'],
    correctAnswer: 0,
    hint: 'Számold ki a kerületet cm-ben (4 · 250 cm = 1000 cm), majd váltsd át méterbe (1 m = 100 cm)!',
    explanation: 'K = 4 · 250 cm = 1000 cm = 10 m (vagy 250 cm = 2,5 m, és K = 4 · 2,5 m = 10 m).'
  },
  {
    id: 'pp-q19',
    level: 2,
    question: 'Egy deltoid oldalai a = 8 cm és b = 13 cm. Mekkora a kerülete?',
    options: ['42 cm', '21 cm', '29 cm', '52 cm'],
    correctAnswer: 0,
    hint: 'A deltoidnak két-két szomszédos oldala egyenlő: K = 2 · (a + b).',
    explanation: 'K = 2 · (a + b) = 2 · (8 + 13) = 2 · 21 = 42 cm.'
  },
  {
    id: 'pp-q20',
    level: 2,
    question: 'Egy trapéz oldalai a = 12 cm, b = 6 cm, c = 8 cm és d = 5 cm. Mekkora a kerülete?',
    options: ['31 cm', '28 cm', '35 cm', '26 cm'],
    correctAnswer: 0,
    hint: 'Add össze a négy oldal hosszát: K = a + b + c + d.',
    explanation: 'K = 12 + 6 + 8 + 5 = 31 cm.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'pp-q21',
    level: 3,
    question: 'Egy négyzet oldala 5 cm volt. Ha az oldalát a 3-szorosára növeljük (15 cm-re), hányszorosára nő a kerülete?',
    options: ['3-szorosára', '9-szeresére', '6-szorosára', '4-szeresére'],
    correctAnswer: 0,
    hint: 'Számold ki az eredeti kerületet (4 · 5 = 20 cm) és az újat (4 · 15 = 60 cm). Oszd el őket!',
    explanation: 'A kerület K = 4 · a egyenesen arányos az oldalhosszal: ha az oldal 3-szorosára nő, a kerület is pontosan 3-szorosára nő (20 cm-ről 60 cm-re).'
  },
  {
    id: 'pp-q22',
    level: 3,
    question: 'Egy téglalap alakú kiskert hossza 24 m, szélessége 16 m. 1 méter drótkerítés ára 2500 Ft. Mennyibe kerül a teljes kertet körbekeríteni?',
    options: ['200 000 Ft', '100 000 Ft', '960 000 Ft', '160 000 Ft'],
    correctAnswer: 0,
    hint: 'Először számold ki a kerületet méterben: K = 2 · (24 + 16). Utána szorozd be a méterenkénti árral!',
    explanation: 'K = 2 · (24 + 16) = 2 · 40 = 80 m kerítés kell. Ár: 80 · 2500 Ft = 200 000 Ft.'
  },
  {
    id: 'pp-q23',
    level: 3,
    question: 'Egy téglalap egyik oldala a = 6 cm, a másik oldala 3-szor akkora (b = 18 cm). Mekkora a téglalap kerülete?',
    options: ['48 cm', '24 cm', '36 cm', '72 cm'],
    correctAnswer: 0,
    hint: 'A másik oldal b = 3 · 6 = 18 cm. Használd a téglalap kerületképletét: K = 2 · (a + b)!',
    explanation: 'b = 18 cm. K = 2 · (6 + 18) = 2 · 24 = 48 cm.'
  },
  {
    id: 'pp-q24',
    level: 3,
    question: 'Egy szabályos tízszög (dekagon) egy oldala a = 3,4 cm. Mekkora a kerülete?',
    options: ['34 cm', '30,4 cm', '340 cm', '17 cm'],
    correctAnswer: 0,
    hint: 'A tízszögnek 10 egyenlő oldala van: K = 10 · 3,4 cm.',
    explanation: 'K = 10 · 3,4 cm = 34 cm.'
  },
  {
    id: 'pp-q25',
    level: 3,
    question: 'Két darab 6 cm oldalhosszúságú négyzetet egymás mellé illesztünk egyetlen téglalappá. Mekkora a keletkező téglalap kerülete?',
    options: ['36 cm', '48 cm', '24 cm', '30 cm'],
    correctAnswer: 0,
    hint: 'A keletkező téglalap egyik oldala 6 + 6 = 12 cm, a másik oldala 6 cm marad. K = 2 · (12 + 6)!',
    explanation: 'A téglalap oldalai 12 cm és 6 cm. K = 2 · (12 + 6) = 2 · 18 = 36 cm. (Vigyázat: a két négyzet kerületének összege 48 cm lenne, de a közös belső oldal nem része a kerületnek: 48 - 2 · 6 = 36 cm).'
  },
  {
    id: 'pp-q26',
    level: 3,
    question: 'Egy négyzet oldala 9 cm. Egy szabályos háromszög kerülete pontosan ugyanekkora, mint ennek a négyzetnek a kerülete. Mekkora a szabályos háromszög egy oldala?',
    options: ['12 cm', '10 cm', '9 cm', '15 cm'],
    correctAnswer: 0,
    hint: 'A négyzet kerülete: K = 4 · 9 = 36 cm. A szabályos háromszögnek 3 egyenlő oldala van, amelyek összege 36 cm: a = 36 : 3.',
    explanation: 'Négyzet kerülete: K = 4 · 9 = 36 cm. Szabályos háromszög oldala: 36 : 3 = 12 cm.'
  },
  {
    id: 'pp-q27',
    level: 3,
    question: 'Egy futó 5 kört fut egy téglalap alakú pálya körül, amelynek méretei 70 m és 30 m. Hány kilométert futott összesen?',
    options: ['1 km', '0,5 km', '1,5 km', '2 km'],
    correctAnswer: 0,
    hint: 'Számold ki 1 kör hosszát (a pálya kerületét): K = 2 · (70 + 30). Szorozd meg 5-tel, majd váltsd át km-be!',
    explanation: '1 kör = K = 2 · (70 + 30) = 2 · 100 = 200 m. 5 kör = 5 · 200 m = 1000 m = 1 km.'
  },
  {
    id: 'pp-q28',
    level: 3,
    question: 'Egy háromszög oldalai 4,8 cm; 6,5 cm és 7,7 cm. Mekkora a kerülete?',
    options: ['19 cm', '18 cm', '19,5 cm', '20 cm'],
    correctAnswer: 0,
    hint: 'Add össze a tizedestörteket: 4,8 + 6,5 + 7,7.',
    explanation: 'K = 4,8 + 6,5 + 7,7 = 11,3 + 7,7 = 19,0 cm.'
  },
  {
    id: 'pp-q29',
    level: 3,
    question: 'Egy képkeret méretei 45 cm és 30 cm. Körben díszszalagot teszünk a szélére, és a csomózáshoz még további 10 cm szalag szükséges. Legalább hány méter szalagot kell vennünk?',
    options: ['1,6 m', '1,5 m', '1,4 m', '1,8 m'],
    correctAnswer: 0,
    hint: 'Számítsd ki a téglalap kerületét (2 · (45 + 30)), adj hozzá 10 cm-t, és váltsd át méterbe!',
    explanation: 'K = 2 · (45 + 30) = 2 · 75 = 150 cm. Plusz a ráhagyás: 150 + 10 = 160 cm = 1,6 méter.'
  },
  {
    id: 'pp-q30',
    level: 3,
    question: 'Egy rombusz kerülete K = 38 cm. Hány centiméter egy oldala tizedestört alakban?',
    options: ['9,5 cm', '9,2 cm', '8,5 cm', '9,75 cm'],
    correctAnswer: 0,
    hint: 'Oszd el a 38-at 4-gyel: 38 : 4 = 19 : 2.',
    explanation: 'a = K : 4 = 38 : 4 = 9,5 cm.'
  }
];

export const PolygonPerimeterQuiz: React.FC<PolygonPerimeterQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A sokszögek kerülete Kvíz"
      subtitle="Háromszögek, négyszögek és szabályos sokszögek kerületszámítása, hiányzó oldalak meghatározása 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      topicId="g6-polygon-perimeter-quiz"
      topicTitle="A sokszögek kerülete"
      questions={questions}
      cheatSheet={cheatSheetContent}
      matcherComponent={PolygonPerimeterMatcher}
      sorterComponent={PolygonPerimeterSorter}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PolygonPerimeterQuiz;
