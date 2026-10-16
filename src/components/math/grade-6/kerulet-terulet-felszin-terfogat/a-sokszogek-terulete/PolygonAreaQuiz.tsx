import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PolygonAreaMatcher } from './PolygonAreaMatcher';
import { PolygonAreaSorter } from './PolygonAreaSorter';

interface PolygonAreaQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-sq-rect',
    title: '1. Négyzet és Téglalap',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Négyzet:</strong> T = a · a = a² (visszafelé: a = √T)</div>
        <div><strong>Téglalap:</strong> T = a · b (visszafelé: a = T : b)</div>
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          Mértékegység: mm², cm², dm², m²
        </div>
      </div>
    )
  },
  {
    id: 'cs-triangles',
    title: '2. Háromszögek',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Általános △:</strong> T = (a · mₐ) : 2 = (b · m_b) : 2</div>
        <div><strong>Derékszögű △:</strong> T = (a · b) : 2 (befogók szorzatának fele)</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Aranyszabály: A háromszög a paralelogramma fele, sose felejts el 2-vel osztani!
        </div>
      </div>
    )
  },
  {
    id: 'cs-parallelograms',
    title: '3. Paralelogramma és Rombusz',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Paralelogramma:</strong> T = a · mₐ = b · m_b</div>
        <div><strong>Rombusz:</strong> T = a · m vagy T = (e · f) : 2 (átlók)</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Figyelem: Mindig a merőleges magassággal szorozz, soha ne a ferde oldallal!
        </div>
      </div>
    )
  },
  {
    id: 'cs-trapezoid-deltoid',
    title: '4. Trapéz és Deltoid',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Trapéz:</strong> T = [(a + c) · m] : 2 (alapok összege szorozva a magassággal, felezve)</div>
        <div><strong>Deltoid:</strong> T = (e · f) : 2 (merőleges átlók szorzatának fele)</div>
        <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
          Összetett alakzatoknál: bontsd téglalapokra/háromszögekre!
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // ==========================================
  // 1. SZINT: KEZDŐ (1-10. KÉRDÉS - ALAPOK)
  // ==========================================
  {
    id: 'pa-q1',
    level: 1,
    question: 'Mi a négyzet területének képlete, ha az oldala a?',
    options: ['T = a · a = a²', 'T = 4 · a', 'T = (a · a) : 2', 'T = 2 · a'],
    correctAnswer: 'T = a · a = a²',
    explanation: 'A négyzet területe az oldalának négyzete (T = a²). A 4 · a a négyzet kerülete!'
  },
  {
    id: 'pa-q2',
    level: 1,
    question: 'Egy téglalap oldalai a = 7 cm és b = 5 cm. Mekkora a területe?',
    options: ['35 cm²', '24 cm²', '12 cm²', '70 cm²'],
    correctAnswer: '35 cm²',
    explanation: 'A téglalap területe: T = a · b = 7 cm · 5 cm = 35 cm².'
  },
  {
    id: 'pa-q3',
    level: 1,
    question: 'Egy négyzet oldala a = 8 cm. Mekkora a területe?',
    options: ['64 cm²', '32 cm²', '16 cm²', '64 cm'],
    correctAnswer: '64 cm²',
    explanation: 'T = a² = 8 cm · 8 cm = 64 cm² (a terület mértékegysége négyzetcentiméter).'
  },
  {
    id: 'pa-q4',
    level: 1,
    question: 'Egy derékszögű háromszög befogói 6 cm és 4 cm hosszúak. Mekkora a területe?',
    options: ['12 cm²', '24 cm²', '10 cm²', '48 cm²'],
    correctAnswer: '12 cm²',
    explanation: 'A derékszögű háromszög területe a befogók szorzatának fele: T = (6 · 4) : 2 = 24 : 2 = 12 cm².'
  },
  {
    id: 'pa-q5',
    level: 1,
    question: 'Egy téglalap területe T = 48 cm², egyik oldala a = 8 cm. Mekkora a b oldal?',
    options: ['6 cm', '8 cm', '12 cm', '4 cm'],
    correctAnswer: '6 cm',
    explanation: 'Mivel T = a · b, ezért b = T : a = 48 cm² : 8 cm = 6 cm.'
  },
  {
    id: 'pa-q6',
    level: 1,
    question: 'Egy négyzet alakú kert területe 81 m². Milyen hosszú a kert egy oldala?',
    options: ['9 m', '18 m', '8,1 m', '40,5 m'],
    correctAnswer: '9 m',
    explanation: 'Mivel T = a², olyan számot keresünk, amelynek négyzete 81: 9 · 9 = 81, tehát a = 9 m.'
  },
  {
    id: 'pa-q7',
    level: 1,
    question: 'Egy téglalap oldalai a = 3 dm és b = 20 cm. Mekkora a területe cm²-ben?',
    options: ['600 cm²', '60 cm²', '6000 cm²', '6 dm²'],
    correctAnswer: '600 cm²',
    explanation: 'Először egységes mértékegységre váltunk: 3 dm = 30 cm. Ekkor T = 30 cm · 20 cm = 600 cm² (ami 6 dm²-nek felel meg).'
  },
  {
    id: 'pa-q8',
    level: 1,
    question: 'Melyik állítás IGAZ a kerület és a terület kapcsolatáról?',
    options: [
      'A kerület 1 dimenziós vonalhosszúság (cm), a terület 2 dimenziós síkfelület (cm²)',
      'A kerület és terület mértékegysége mindig megegyezik',
      'Ha két alakzat kerülete egyenlő, területük is mindig pontosan egyenlő',
      'A területet mérőszalaggal mérjük, a kerületet négyzethálóval fedjük le'
    ],
    correctAnswer: 'A kerület 1 dimenziós vonalhosszúság (cm), a terület 2 dimenziós síkfelület (cm²)',
    explanation: 'A kerület a határoló vonalak összhossza (cm, m), míg a terület a lefedett felület nagysága egységnégyzetekben (cm², m²).'
  },
  {
    id: 'pa-q9',
    level: 1,
    question: 'Egyenlő szárú derékszögű háromszög befogói 10 cm hosszúak. Mekkora a területe?',
    options: ['50 cm²', '100 cm²', '20 cm²', '25 cm²'],
    correctAnswer: '50 cm²',
    explanation: 'T = (a · b) : 2 = (10 · 10) : 2 = 100 : 2 = 50 cm².'
  },
  {
    id: 'pa-q10',
    level: 1,
    question: 'Egy 4 cm oldalú négyzet kerülete (K) és területe (T):',
    options: [
      'K = 16 cm és T = 16 cm² (mérőszámuk megegyezik, de a mértékegység és jelentés más)',
      'K = 8 cm és T = 16 cm²',
      'K = 16 cm² és T = 16 cm',
      'K = 12 cm és T = 16 cm²'
    ],
    correctAnswer: 'K = 16 cm és T = 16 cm² (mérőszámuk megegyezik, de a mértékegység és jelentés más)',
    explanation: 'K = 4 · 4 = 16 cm (kerület, hosszúság), T = 4 · 4 = 16 cm² (terület, felület). A szám 16 mindkettőnél, de a mértékegység és tartalom teljesen eltérő!'
  },

  // ==========================================
  // 2. SZINT: KÖZEPES (11-20. KÉRDÉS - GYAKORLAT)
  // ==========================================
  {
    id: 'pa-q11',
    level: 2,
    question: 'Egy általános háromszög egyik oldala a = 12 cm, a hozzá tartozó magasság mₐ = 7 cm. Mekkora a területe?',
    options: ['42 cm²', '84 cm²', '19 cm²', '38 cm²'],
    correctAnswer: '42 cm²',
    explanation: 'T = (a · mₐ) : 2 = (12 · 7) : 2 = 84 : 2 = 42 cm².'
  },
  {
    id: 'pa-q12',
    level: 2,
    question: 'Egy paralelogramma alapja a = 9 cm, a hozzá tartozó magasság mₐ = 6 cm. Mekkora a területe?',
    options: ['54 cm²', '27 cm²', '30 cm²', '108 cm²'],
    correctAnswer: '54 cm²',
    explanation: 'A paralelogramma területe T = a · mₐ = 9 cm · 6 cm = 54 cm². Itt nem osztunk kettővel!'
  },
  {
    id: 'pa-q13',
    level: 2,
    question: 'Miért kell osztani kettővel a háromszög területképletében: T = (a · mₐ) : 2?',
    options: [
      'Mert minden háromszög egy azonos alapú és magasságú paralelogramma fele',
      'Mert a háromszögnek két oldala van',
      'Mert a magasság mindig felezi az alapot',
      'Mert a háromszög szögeinek összege 180°'
    ],
    correctAnswer: 'Mert minden háromszög egy azonos alapú és magasságú paralelogramma fele',
    explanation: 'Bármely háromszög mellé rajzolva egy vele egybevágó háromszöget (180°-kal elforgatva), pontosan egy a alapú és mₐ magasságú paralelogrammát kapunk.'
  },
  {
    id: 'pa-q14',
    level: 2,
    question: 'Egy rombusz átlói e = 8 cm és f = 10 cm. Mekkora a rombusz területe?',
    options: ['40 cm²', '80 cm²', '36 cm²', '18 cm²'],
    correctAnswer: '40 cm²',
    explanation: 'A rombusz átlói merőlegesen felezik egymást, területe: T = (e · f) : 2 = (8 · 10) : 2 = 80 : 2 = 40 cm².'
  },
  {
    id: 'pa-q15',
    level: 2,
    question: 'Egy háromszög területe T = 30 cm², alapja a = 10 cm. Mekkora a hozzá tartozó mₐ magasság?',
    options: ['6 cm', '3 cm', '15 cm', '5 cm'],
    correctAnswer: '6 cm',
    explanation: 'Mivel T = (a · mₐ) : 2, ezért a · mₐ = 2 · T = 60. Ebből mₐ = 60 : 10 = 6 cm.'
  },
  {
    id: 'pa-q16',
    level: 2,
    question: 'Egy paralelogramma oldalai a = 14 cm és b = 10 cm, az "a" oldalhoz tartozó magasság mₐ = 8 cm. Mekkora a területe?',
    options: ['112 cm²', '140 cm²', '80 cm²', '56 cm²'],
    correctAnswer: '112 cm²',
    explanation: 'T = a · mₐ = 14 cm · 8 cm = 112 cm². A b = 10 cm ferde oldal zavaró adat, a területhez a magasság kell!'
  },
  {
    id: 'pa-q17',
    level: 2,
    question: 'Egy derékszögű háromszög oldalai 3 cm, 4 cm és 5 cm. Mekkora a területe?',
    options: ['6 cm²', '12 cm²', '10 cm²', '7,5 cm²'],
    correctAnswer: '6 cm²',
    explanation: 'A derékszögű háromszögben a leghosszabb oldal (5 cm) az átfogó, a két befogó pedig 3 cm és 4 cm. T = (3 · 4) : 2 = 12 : 2 = 6 cm².'
  },
  {
    id: 'pa-q18',
    level: 2,
    question: 'Egy rombusz oldala a = 6 cm, magassága m = 4,5 cm. Mekkora a területe?',
    options: ['27 cm²', '21 cm²', '13,5 cm²', '54 cm²'],
    correctAnswer: '27 cm²',
    explanation: 'Mivel a rombusz olyan paralelogramma, amelynek minden oldala egyenlő, T = a · m = 6 · 4,5 = 27 cm².'
  },
  {
    id: 'pa-q19',
    level: 2,
    question: 'Két különböző háromszög alapja egyaránt 8 cm, és a hozzájuk tartozó magasságuk is mindkettőnél 5 cm. Mit mondhatunk a területükről?',
    options: [
      'Területük pontosan egyenlő (mindkettőé 20 cm²), még ha az alakjuk el is tér',
      'Csak akkor egyenlő a területük, ha teljesen egybevágók',
      'A tompaszögű háromszög területe mindig kisebb',
      'Nem határozható meg a többi oldal ismerete nélkül'
    ],
    correctAnswer: 'Területük pontosan egyenlő (mindkettőé 20 cm²), még ha az alakjuk el is tér',
    explanation: 'A háromszög területe kizárólag az alap és a hozzá tartozó magasság szorzatának felétől függ: (8 · 5) : 2 = 20 cm².'
  },
  {
    id: 'pa-q20',
    level: 2,
    question: 'Egy háromszög alapja a = 2 dm, magassága mₐ = 15 cm. Mekkora a területe cm²-ben?',
    options: ['150 cm²', '300 cm²', '15 cm²', '1500 cm²'],
    correctAnswer: '150 cm²',
    explanation: 'Átváltás: 2 dm = 20 cm. Terület: T = (20 · 15) : 2 = 300 : 2 = 150 cm² (ami 1,5 dm²).'
  },

  // ==========================================
  // 3. SZINT: HALADÓ (21-30. KÉRDÉS - MESTERFOK)
  // ==========================================
  {
    id: 'pa-q21',
    level: 3,
    question: 'Egy trapéz párhuzamos alapjai a = 10 cm és c = 6 cm, magassága m = 5 cm. Mekkora a területe?',
    options: ['40 cm²', '80 cm²', '50 cm²', '30 cm²'],
    correctAnswer: '40 cm²',
    explanation: 'T = [(a + c) · m] : 2 = [(10 + 6) · 5] : 2 = [16 · 5] : 2 = 80 : 2 = 40 cm².'
  },
  {
    id: 'pa-q22',
    level: 3,
    question: 'Egy deltoid alakú papírsárkány két átlója e = 14 cm és f = 9 cm. Mekkora a sárkány felülete?',
    options: ['63 cm²', '126 cm²', '46 cm²', '31,5 cm²'],
    correctAnswer: '63 cm²',
    explanation: 'A deltoid átlói merőlegesek egymásra, ezért T = (e · f) : 2 = (14 · 9) : 2 = 126 : 2 = 63 cm².'
  },
  {
    id: 'pa-q23',
    level: 3,
    question: 'Egy trapéz területe T = 60 cm², alapjai a = 8 cm és c = 4 cm. Milyen magas a trapéz?',
    options: ['10 cm', '5 cm', '12 cm', '8 cm'],
    correctAnswer: '10 cm',
    explanation: 'T = [(a + c) · m] : 2 => 60 = [(8 + 4) · m] : 2 => 60 = (12 · m) : 2 => 60 = 6 · m => m = 10 cm.'
  },
  {
    id: 'pa-q24',
    level: 3,
    question: 'Ha egy négyzet oldalhosszát a duplájára (2-szeresére) növeljük, hányszorosára nő a területe?',
    options: ['4-szeresére', '2-szeresére', '8-szorosára', 'Nem változik'],
    correctAnswer: '4-szeresére',
    explanation: 'Ha az új oldal 2a, az új terület T\' = (2a)² = 4a² = 4 · T. Tehát a terület 4-szeresére nő!'
  },
  {
    id: 'pa-q25',
    level: 3,
    question: 'Egy 15 m × 12 m méretű téglalap alakú kert közepén egy 4 m × 4 m-es négyzet alakú medence található. Mekkora a füvesíthető terület?',
    options: ['164 m²', '180 m²', '196 m²', '160 m²'],
    correctAnswer: '164 m²',
    explanation: 'Kiegészítési/kivonási módszer: T_kert = 15 · 12 = 180 m². T_medence = 4 · 4 = 16 m². T_fű = 180 - 16 = 164 m².'
  },
  {
    id: 'pa-q26',
    level: 3,
    question: 'Egy derékszögű trapéz párhuzamos oldalai 9 cm és 5 cm. A derékszögű szára 4 cm. Mekkora a trapéz területe?',
    options: ['28 cm²', '36 cm²', '56 cm²', '20 cm²'],
    correctAnswer: '28 cm²',
    explanation: 'A derékszögű trapézban a derékszögű szár merőleges az alapokra, vagyis pontosan megegyezik a magassággal (m = 4 cm)! T = [(9 + 5) · 4] : 2 = [14 · 4] : 2 = 28 cm².'
  },
  {
    id: 'pa-q27',
    level: 3,
    question: 'Egy deltoid területe T = 48 cm², egyik átlója e = 12 cm. Mennyi a másik átló (f) hossza?',
    options: ['8 cm', '4 cm', '16 cm', '6 cm'],
    correctAnswer: '8 cm',
    explanation: 'T = (e · f) : 2 => 48 = (12 · f) : 2 => 48 = 6 · f => f = 48 : 6 = 8 cm.'
  },
  {
    id: 'pa-q28',
    level: 3,
    question: 'Egy fürdőszoba padlója 2 m × 3 m méretű. Hány darab 20 cm × 20 cm-es négyzet alakú járólap fedi le?',
    options: ['150 db', '15 db', '300 db', '75 db'],
    correctAnswer: '150 db',
    explanation: 'T_szoba = 2 m · 3 m = 6 m² = 60 000 cm². Egy járólap területe: 20 · 20 = 400 cm². Járólapok száma: 60 000 : 400 = 150 db.'
  },
  {
    id: 'pa-q29',
    level: 3,
    question: 'Egy L-alakú szoba felbontható egy 5 m × 4 m-es és egy 3 m × 2 m-es téglalapra. Mekkora a teljes alapterülete?',
    options: ['26 m²', '34 m²', '20 m²', '30 m²'],
    correctAnswer: '26 m²',
    explanation: 'Felbontási módszer: T₁ = 5 · 4 = 20 m², T₂ = 3 · 2 = 6 m². T_összes = 20 + 6 = 26 m².'
  },
  {
    id: 'pa-q30',
    level: 3,
    question: 'Egy ház homlokzata egy 8 m széles és 4 m magas téglalapból, rajta egy 8 m alapú és 3 m magasságú háromszög alakú oromfalból áll. Mekkora a homlokzat teljes területe?',
    options: ['44 m²', '56 m²', '32 m²', '68 m²'],
    correctAnswer: '44 m²',
    explanation: 'T_téglalap = 8 · 4 = 32 m². T_háromszög = (8 · 3) : 2 = 24 : 2 = 12 m². T_teljes = 32 + 12 = 44 m².'
  }
];

export const PolygonAreaQuiz: React.FC<PolygonAreaQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A sokszögek területe kvíz"
      subtitle="Gyakorold a négyzet, téglalap, háromszög, paralelogramma, trapéz és deltoid területszámítását 3 szinten!"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="emerald"
      topicId="g6-polygon-area-quiz"
      topicTitle="A sokszögek területe"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={PolygonAreaMatcher as any}
      sorterComponent={PolygonAreaSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PolygonAreaQuiz;
