import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { SurfaceAreaMatcher } from './SurfaceAreaMatcher';
import { SurfaceAreaSorter } from './SurfaceAreaSorter';

interface SurfaceAreaQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-cube-area',
    title: '1. Kocka Felszíne',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> A = 6 · a² (6 egybevágó négyzetlap)</div>
        <div><strong>1 lap területe:</strong> T_lap = a² = A : 6</div>
        <div><strong>Élhossz visszaszámolása:</strong> a = √(A : 6)</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Példa: a = 4 cm → A = 6 · 16 = 96 cm²
        </div>
      </div>
    )
  },
  {
    id: 'cs-cuboid-area',
    title: '2. Téglatest Felszíne',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> A = 2 · (ab + ac + bc) = 2ab + 2ac + 2bc</div>
        <div><strong>Lapok:</strong> 3 pár egybevágó téglalap határolja</div>
        <div><strong>Négyzet alapú hasáb:</strong> A = 2a² + 4am</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Példa: 2 × 3 × 4 cm → 2 · (6 + 8 + 12) = 52 cm²
        </div>
      </div>
    )
  },
  {
    id: 'cs-prism-area',
    title: '3. Egyenes Hasáb Felszíne',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Általános képlet:</strong> A = 2 · T_alap + T_palást</div>
        <div><strong>Palást területe:</strong> T_palást = K_alap · m</div>
        <div><strong>Kiterített palást:</strong> egy nagy téglalap (K_alap × m)</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          T_alap: az alsó és felső sokszög területe
        </div>
      </div>
    )
  },
  {
    id: 'cs-traps-tricks',
    title: '4. Trükkök és Csapdák',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Nyitott (fedél nélküli) doboz:</strong> csak 5 határoló lap!</div>
        <div><strong>Összeragasztott kockák:</strong> a ragasztásnál 2 lap elvész a külső felszínből.</div>
        <div><strong>Mértékegység váltás:</strong> 1 dm² = 100 cm², 1 m² = 100 dm² = 10 000 cm²</div>
        <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
          Él duplázás → Felszín négyszereződik (2² = 4)!
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // --- 1. SZINT: ALAPVETŐ KOCKA ÉS TÉGLATEST FELSZÍNEK (1-10) ---
  {
    id: 'q1',
    level: 1,
    question: 'Mi a kocka felszínének (A) kiszámítási képlete, ha egy élének hossza a?',
    options: [
      'A = 6 · a²',
      'A = a³',
      'A = 4 · a²',
      'A = 12 · a'
    ],
    correctAnswer: 'A = 6 · a²',
    explanation: 'A kockát 6 darab egybevágó négyzet határolja. Egy négyzetlap területe a², így a 6 lap együttes felülete A = 6 · a².'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Mennyi az a = 3 cm élhosszúságú kocka felszíne?',
    options: [
      '54 cm²',
      '27 cm²',
      '36 cm²',
      '18 cm²'
    ],
    correctAnswer: '54 cm²',
    explanation: 'Egy lap területe: 3 · 3 = 9 cm². A hat lap összesen: 6 · 9 = 54 cm².'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Egy kocka éle 5 cm. Mekkora a felszíne?',
    options: [
      '150 cm²',
      '125 cm²',
      '100 cm²',
      '60 cm²'
    ],
    correctAnswer: '150 cm²',
    explanation: 'A = 6 · a² = 6 · 5² = 6 · 25 = 150 cm².'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Mennyi a 10 cm élű kocka felszíne?',
    options: [
      '600 cm²',
      '1000 cm²',
      '300 cm²',
      '60 cm²'
    ],
    correctAnswer: '600 cm²',
    explanation: 'A = 6 · 10² = 6 · 100 = 600 cm².'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Ha egy kocka egyetlen lapjának területe 16 cm², mekkora a kocka teljes felszíne?',
    options: [
      '96 cm²',
      '64 cm²',
      '48 cm²',
      '32 cm²'
    ],
    correctAnswer: '96 cm²',
    explanation: 'A kockának 6 egybevágó lapja van, így a teljes felszín a lap területének hatszorosa: 6 · 16 = 96 cm².'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Hogyan számítjuk ki az a, b, c élhosszúságú téglatest felszínét?',
    options: [
      'A = 2 · (ab + bc + ac)',
      'A = a · b · c',
      'A = 4 · (a + b + c)',
      'A = ab + bc + ac'
    ],
    correctAnswer: 'A = 2 · (ab + bc + ac)',
    explanation: 'A téglatestet 3 pár egybevágó téglalap határolja: 2 db (a·b), 2 db (b·c) és 2 db (a·c) területű lap, azaz A = 2(ab + bc + ac).'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Mekkora a 2 cm, 3 cm és 4 cm élű téglatest felszíne?',
    options: [
      '52 cm²',
      '24 cm²',
      '48 cm²',
      '26 cm²'
    ],
    correctAnswer: '52 cm²',
    explanation: 'A háromféle lap területe: 2·3 = 6 cm², 2·4 = 8 cm², 3·4 = 12 cm². Ezek összege 26 cm², megduplázva: 2 · 26 = 52 cm².'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Egy téglatest élei 1 cm, 2 cm és 5 cm. Mekkora a felszíne?',
    options: [
      '34 cm²',
      '17 cm²',
      '20 cm²',
      '40 cm²'
    ],
    correctAnswer: '34 cm²',
    explanation: 'ab = 2, ac = 5, bc = 10. Összegük: 2 + 5 + 10 = 17 cm². Teljes felszín: 2 · 17 = 34 cm².'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Mekkora az 1 cm élű egységkocka felszíne?',
    options: [
      '6 cm²',
      '1 cm²',
      '12 cm²',
      '3 cm²'
    ],
    correctAnswer: '6 cm²',
    explanation: 'A = 6 · 1² = 6 · 1 = 6 cm².'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Hány határoló síklap területének összegéből áll a téglatest felszíne?',
    options: [
      '6',
      '8',
      '12',
      '4'
    ],
    correctAnswer: '6',
    explanation: 'A téglatestnek 6 lapja (3 pár egybevágó szemközti téglalapja) van.'
  },

  // --- 2. SZINT: ÉL VISSZASZÁMOLÁS, HASÁBOK ÉS MÉRTÉKEGYSÉGEK (11-20) ---
  {
    id: 'q11',
    level: 2,
    question: 'Egy kocka felszíne 24 cm². Milyen hosszú egy éle?',
    options: [
      '2 cm',
      '4 cm',
      '3 cm',
      '6 cm'
    ],
    correctAnswer: '2 cm',
    explanation: 'Egy lap területe: 24 : 6 = 4 cm². Mivel a² = 4, az él hossza a = 2 cm.'
  },
  {
    id: 'q12',
    level: 2,
    question: 'Mennyi annak a kockának az élhossza, amelynek felszíne 150 cm²?',
    options: [
      '5 cm',
      '6 cm',
      '25 cm',
      '10 cm'
    ],
    correctAnswer: '5 cm',
    explanation: 'Egy lap területe: 150 : 6 = 25 cm². Ebből az élhossz a = √25 = 5 cm.'
  },
  {
    id: 'q13',
    level: 2,
    question: 'Mekkora az éle annak a kockának, amelynek felszíne 216 cm²?',
    options: [
      '6 cm',
      '8 cm',
      '7 cm',
      '9 cm'
    ],
    correctAnswer: '6 cm',
    explanation: 'Egy lap területe: 216 : 6 = 36 cm². Ebből az élhossz a = √36 = 6 cm.'
  },
  {
    id: 'q14',
    level: 2,
    question: 'Egy kocka felszíne 294 cm². Hány centiméter az éle?',
    options: [
      '7 cm',
      '6 cm',
      '8 cm',
      '9 cm'
    ],
    correctAnswer: '7 cm',
    explanation: 'Egy lap területe: 294 : 6 = 49 cm², ebből a = √49 = 7 cm.'
  },
  {
    id: 'q15',
    level: 2,
    question: 'Egy négyzet alapú hasáb alapéle 3 cm, magassága 10 cm. Mekkora a felszíne?',
    options: [
      '138 cm²',
      '120 cm²',
      '90 cm²',
      '156 cm²'
    ],
    correctAnswer: '138 cm²',
    explanation: 'A két négyzet alakú alaplap területe: 2 · (3 · 3) = 18 cm². A 4 palástlap területe: 4 · (3 · 10) = 120 cm². A teljes felszín: 18 + 120 = 138 cm².'
  },
  {
    id: 'q16',
    level: 2,
    question: 'Négyzet alapú egyenes hasáb alapéle a = 5 cm, magassága m = 4 cm. Mekkora a felszíne?',
    options: [
      '130 cm²',
      '100 cm²',
      '80 cm²',
      '150 cm²'
    ],
    correctAnswer: '130 cm²',
    explanation: '2 alaplap: 2 · 5² = 50 cm². Palást (4 téglalap): 4 · (5 · 4) = 80 cm². Felszín: 50 + 80 = 130 cm².'
  },
  {
    id: 'q17',
    level: 2,
    question: 'Egy kocka éle a = 1 dm. Hány cm² a felszíne?',
    options: [
      '600 cm²',
      '60 cm²',
      '6 cm²',
      '6000 cm²'
    ],
    correctAnswer: '600 cm²',
    explanation: '1 dm = 10 cm. A felszín: A = 6 · 10² = 6 · 100 = 600 cm² (ami 6 dm²).'
  },
  {
    id: 'q18',
    level: 2,
    question: 'Egy test felszíne 0,5 m². Hány dm²-nek felel ez meg?',
    options: [
      '50 dm²',
      '5 dm²',
      '500 dm²',
      '0,05 dm²'
    ],
    correctAnswer: '50 dm²',
    explanation: 'Mivel 1 m² = 100 dm², ezért 0,5 m² = 0,5 · 100 = 50 dm².'
  },
  {
    id: 'q19',
    level: 2,
    question: 'Mi az egyenes hasáb felszínének általános képlete az alapterület (T_a) és a palástterület (T_p) segítségével?',
    options: [
      'A = 2 · T_a + T_p',
      'A = T_a + T_p',
      'A = T_a · m',
      'A = 2 · T_a + 2 · T_p'
    ],
    correctAnswer: 'A = 2 · T_a + T_p',
    explanation: 'Az egyenes hasábnak 2 egybevágó alaplapja van (alsó és felső lap), valamint a kettő közötti palást, így A = 2 · T_a + T_p.'
  },
  {
    id: 'q20',
    level: 2,
    question: 'Egy háromszög alapú hasáb alapterülete T_a = 6 cm², alapjának kerülete K_a = 12 cm, magassága m = 8 cm. Mekkora a felszíne?',
    options: [
      '108 cm²',
      '96 cm²',
      '102 cm²',
      '120 cm²'
    ],
    correctAnswer: '108 cm²',
    explanation: 'A két alaplap: 2 · 6 = 12 cm². A palást területe: K_a · m = 12 · 8 = 96 cm². A felszín: 12 + 96 = 108 cm².'
  },

  // --- 3. SZINT: ÖSSZETETT ÉS GYAKORLATI FELADATOK (21-30) ---
  {
    id: 'q21',
    level: 3,
    question: 'Egy felül nyitott (fedél nélküli) kocka alakú doboz éle 4 cm. Mekkora a külső felülete?',
    options: [
      '80 cm²',
      '96 cm²',
      '64 cm²',
      '72 cm²'
    ],
    correctAnswer: '80 cm²',
    explanation: 'A fedél nélküli doboznak csak 5 lapja van (1 alsó lap + 4 oldallap). Egy lap 4² = 16 cm², így a felület 5 · 16 = 80 cm².'
  },
  {
    id: 'q22',
    level: 3,
    question: 'Két darab a = 2 cm élű kockát összeragasztunk egy-egy lapjuk mentén. Mekkora az így kapott új test felszíne?',
    options: [
      '40 cm²',
      '48 cm²',
      '36 cm²',
      '44 cm²'
    ],
    correctAnswer: '40 cm²',
    explanation: 'A két kockának külön-külön 6 + 6 = 12 lapja lenne. Összeragasztáskor 2 lap befelé kerül és eltűnik a felületről, így 10 lap marad kívül: 10 · 2² = 10 · 4 = 40 cm².'
  },
  {
    id: 'q23',
    level: 3,
    question: 'Három darab a = 3 cm élű kockát egymás mellé ragasztunk egy sorban. Mekkora az új test felszíne?',
    options: [
      '126 cm²',
      '162 cm²',
      '108 cm²',
      '144 cm²'
    ],
    correctAnswer: '126 cm²',
    explanation: 'A 3 kockának 3 · 6 = 18 lapja lenne. A 2 ragasztásnál 2 · 2 = 4 lap bekerül a test belsejébe, így 14 külső lap marad. Egy lap területe 3² = 9 cm², tehát a felszín 14 · 9 = 126 cm².'
  },
  {
    id: 'q24',
    level: 3,
    question: 'Hogyan változik meg a kocka felszíne, ha minden élének hosszát a kétszeresére növeljük?',
    options: [
      'A négyszeresére nő',
      'A kétszeresére nő',
      'A nyolcszorosára nő',
      'A hatszorosára nő'
    ],
    correctAnswer: 'A négyszeresére nő',
    explanation: 'Ha az él a-ról 2a-ra nő, egy lap területe (2a)² = 4a² lesz. Így az új felszín 6 · 4a² = 4 · (6a²), azaz pontosan négyszeresére nő.'
  },
  {
    id: 'q25',
    level: 3,
    question: 'Egy téglatest két éle a = 2 cm és b = 3 cm, teljes felszíne A = 62 cm². Milyen hosszú a harmadik éle (c)?',
    options: [
      '5 cm',
      '4 cm',
      '6 cm',
      '7 cm'
    ],
    correctAnswer: '5 cm',
    explanation: 'A = 2(ab + ac + bc) = 62 → ab + ac + bc = 31. Mivel ab = 6, így ac + bc = 31 - 6 = 25. Kiemelve: c(a + b) = 25 → c(2 + 3) = 25 → 5c = 25 → c = 5 cm.'
  },
  {
    id: 'q26',
    level: 3,
    question: 'Egy fedél nélküli téglatest doboz alaplapja 4 cm × 5 cm, magassága 3 cm. Mekkora a külső felülete (5 lap)?',
    options: [
      '74 cm²',
      '94 cm²',
      '54 cm²',
      '84 cm²'
    ],
    correctAnswer: '74 cm²',
    explanation: 'Alaplap: 4 · 5 = 20 cm². Négy oldallap: 2 · (4 · 3) + 2 · (5 · 3) = 24 + 30 = 54 cm². Összesen 5 lap: 20 + 54 = 74 cm².'
  },
  {
    id: 'q27',
    level: 3,
    question: 'Egy szoba alapja 4 m × 5 m, belmagassága 3 m. Hány m² a 4 fal együttes felülete (mennyezet és padló nélkül)?',
    options: [
      '54 m²',
      '74 m²',
      '40 m²',
      '94 m²'
    ],
    correctAnswer: '54 m²',
    explanation: 'A 4 fal a hasáb palástját képezi: T_palást = K_alap · m = 2 · (4 + 5) · 3 = 18 · 3 = 54 m².'
  },
  {
    id: 'q28',
    level: 3,
    question: 'Egy kocka összes élének összege 72 cm. Mekkora a kocka felszíne?',
    options: [
      '216 cm²',
      '144 cm²',
      '294 cm²',
      '180 cm²'
    ],
    correctAnswer: '216 cm²',
    explanation: 'A kockának 12 éle van, így egy él hossza: 72 : 12 = 6 cm. A felszín: A = 6 · 6² = 6 · 36 = 216 cm².'
  },
  {
    id: 'q29',
    level: 3,
    question: 'Egy tömör kocka egyik sarkából kivágunk egy kisebb kockát. Hogyan változik meg a test felszíne az eredeti kockához képest?',
    options: [
      'Nem változik (ugyanakkora marad)',
      'Csökken',
      'Növekszik',
      'Feleződik'
    ],
    correctAnswer: 'Nem változik (ugyanakkora marad)',
    explanation: 'A sarok kivágásával elveszítünk 3 db kis négyzetlapot, viszont a vágás mentén a test belsejében pontosan 3 ugyanakkora új lap keletkezik. Így a határoló lapok összterülete nem változik!'
  },
  {
    id: 'q30',
    level: 3,
    question: 'Egy 10 cm × 20 cm × 5 cm-es díszdoboz becsomagolásához a ráhagyások miatt a felszín 120%-ára van szükség papírból. Hány cm² papír kell?',
    options: [
      '840 cm²',
      '700 cm²',
      '720 cm²',
      '900 cm²'
    ],
    correctAnswer: '840 cm²',
    explanation: 'A doboz felszíne: 2 · (10·20 + 10·5 + 20·5) = 2 · (200 + 50 + 100) = 2 · 350 = 700 cm². Ennek 120%-a: 700 · 1,2 = 840 cm².'
  }
];

export const SurfaceAreaQuiz: React.FC<SurfaceAreaQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Testek felszíne kvíz"
      subtitle="Kocka, téglatest és egyenes hasábok felszínszámítása, él visszaszámolás és gyakorlati feladványok 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="amber"
      topicId="g6-surface-area-quiz"
      topicTitle="Testek felszíne"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={SurfaceAreaMatcher as any}
      sorterComponent={SurfaceAreaSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default SurfaceAreaQuiz;
