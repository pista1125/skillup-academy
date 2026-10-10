import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PercentReviewMatcher } from './PercentReviewMatcher';
import { PercentReviewSorter } from './PercentReviewSorter';
import {
  Percent,
  Calculator,
  Tag,
  TrendingDown,
  TrendingUp,
  Layers,
  Sparkles,
  PieChart
} from 'lucide-react';

interface PercentReviewQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Százalék & Ezrelék Alapfogalmak',
    icon: <Percent className="w-4 h-4 text-rose-600" />,
    formula: 'Érték = Alap · (p / 100) = Alap · 0,0p',
    note: 'Az alap (A) a kiinduló 100%, a százalékláb (p%) az arány, a százalékérték (É) a konkrét rész. 1% = 1/100 = 0,01 rész. 1 ezrelék (1‰) = 1/1000 = 0,001 rész.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="36" height="30" rx="4" className="fill-blue-100 stroke-blue-400" />
        <text x="33" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-800">Alap</text>
        <text x="60" y="30" textAnchor="middle" className="text-[12px] font-mono font-black fill-slate-400">·</text>
        <rect x="70" y="10" width="30" height="30" rx="4" className="fill-rose-100 stroke-rose-400" />
        <text x="85" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-rose-800">p%</text>
        <text x="110" y="30" textAnchor="middle" className="text-[12px] font-mono font-black fill-slate-400">=</text>
        <rect x="120" y="10" width="30" height="30" rx="4" className="fill-emerald-100 stroke-emerald-400" />
        <text x="135" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-800">Érték</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Gyakori Tört-Százalék Párok',
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    formula: '1/2 = 50%  •  1/4 = 25%  •  3/4 = 75%  •  1/5 = 20%',
    note: 'Fejben számoláshoz: 50% = fele, 25% = negyede, 75% = háromnegyede, 20% = ötödrésze (:5), 10% = tizedrésze (:10), 12,5% = nyolcada (:8).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="35" cy="25" r="18" className="fill-slate-100 stroke-slate-300" />
        <path d="M 35 7 A 18 18 0 0 1 35 43 Z" className="fill-rose-400" />
        <text x="35" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">50%</text>
        <circle cx="105" cy="25" r="18" className="fill-slate-100 stroke-slate-300" />
        <path d="M 105 25 L 105 7 A 18 18 0 0 1 123 25 Z" className="fill-amber-400" />
        <text x="105" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">25%</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Árengedmény & Áremelés Szorzói',
    icon: <Tag className="w-4 h-4 text-indigo-600" />,
    formula: 'Új ár = Eredeti · (100 ± p)%',
    note: 'Ha p%-kal olcsóbb, az új ár a (100 - p)%-a (pl. -24% -> ·0,76). Vigyázz: a kedvezmény összege NEM egyenlő a fizetendő árral!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="55" height="26" rx="6" className="fill-slate-100 stroke-slate-300" />
        <text x="42" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">-24% akció</text>
        <path d="M 75 25 L 90 25" stroke="#6366f1" strokeWidth="2" />
        <rect x="95" y="12" width="50" height="26" rx="6" className="fill-indigo-100 stroke-indigo-400" />
        <text x="120" y="28" textAnchor="middle" className="text-[11px] font-mono font-bold fill-indigo-800">· 0,76</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Keverékek és Egymást Követő Változások',
    icon: <Layers className="w-4 h-4 text-teal-600" />,
    formula: 'Töménység = Összes tiszta / Összes folyadék',
    note: 'A százalékok nem adódnak össze! Egymást követő 10% csökkenés: 0,9 · 0,9 = 0,81 (19% csökkenés, nem 20%!). Keveréknél az össztiszta mennyiséget osztjuk az össztérfogattal.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 20 40 L 25 15 L 45 15 L 50 40 Z" className="fill-teal-100 stroke-teal-500" />
        <text x="35" y="32" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">25%</text>
        <text x="60" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">+</text>
        <path d="M 70 40 L 75 15 L 95 15 L 100 40 Z" className="fill-teal-200 stroke-teal-600" />
        <text x="85" y="32" textAnchor="middle" className="text-[9px] font-bold fill-teal-900">40%</text>
        <text x="110" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">=</text>
        <text x="135" y="32" textAnchor="middle" className="text-[11px] font-bold fill-teal-700">34%</text>
      </svg>
    )
  }
];

const percentReviewQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Mit jelent az 1% egy adott szám vagy mennyiség esetén?',
    options: [
      'Az adott mennyiség tizedrészét (0,1)',
      'Az adott mennyiség századrészét (0,01)',
      'Az adott mennyiség ezredrészét (0,001)',
      'A teljes egész mennyiséget (1,0)'
    ],
    correctAnswer: 'Az adott mennyiség századrészét (0,01)',
    explanation: 'A tankönyv meghatározása szerint az 1% egy adott szám vagy mennyiség 1/100 (század) részét jelenti: 1% = 1/100 = 0,01 rész.',
    difficulty: 'easy',
    category: 'Alapfogalmak'
  },
  {
    id: 'q2',
    text: 'Mennyi 560-nak az 1/100 része, vagyis az 1%-a?',
    options: ['56', '5,6', '0,56', '5600'],
    correctAnswer: '5,6',
    explanation: '560 1%-ának kiszámításához elosztjuk a számot 100-zal: 560 : 100 = 5,6.',
    difficulty: 'easy',
    category: '1% Kiszámítása'
  },
  {
    id: 'q3',
    text: 'Mennyi 25 kg liszt 40%-a?',
    options: ['10 kg', '12 kg', '15 kg', '8 kg'],
    correctAnswer: '10 kg',
    explanation: '25 kg 40%-a = 25 · 0,40 = 10 kg (vagy: 1% = 0,25 kg, 0,25 · 40 = 10 kg).',
    difficulty: 'easy',
    category: 'Százalékérték'
  },
  {
    id: 'q4',
    text: 'Hány százaléknak felel meg a 3/5 rész?',
    options: ['30%', '35%', '60%', '75%'],
    correctAnswer: '60%',
    explanation: 'A 3/5 törtet bővíthetjük 20-szal: 3/5 = 60/100 = 0,6 = 60%.',
    difficulty: 'easy',
    category: 'Átváltások'
  },
  {
    id: 'q5',
    text: 'Mit fejez ki az 1 ezrelék (1‰)?',
    options: [
      'Az egész tizedrészét (1/10)',
      'Az 1% tizedrészét, vagyis az egész ezredrészét (1/1000 = 0,001)',
      'Az egész századrészét (1/100)',
      'Tíz egész egységet (10)'
    ],
    correctAnswer: 'Az 1% tizedrészét, vagyis az egész ezredrészét (1/1000 = 0,001)',
    explanation: '0,1% az 1% tizedrésze. 0,1% = 0,1 · (1/100) = 1/1000, ezt 1 ezreléknek nevezzük, jele: ‰.',
    difficulty: 'easy',
    category: 'Alapfogalmak'
  },
  {
    id: 'q6',
    text: 'Melyik tizedes tört alak felel meg a 75%-nak?',
    options: ['7,5', '0,75', '0,075', '0,705'],
    correctAnswer: '0,75',
    explanation: '75% = 75/100 = 0,75 rész.',
    difficulty: 'easy',
    category: 'Átváltások'
  },
  {
    id: 'q7',
    text: 'Mennyi 750-nek a 20%-a?',
    options: ['75', '150', '200', '125'],
    correctAnswer: '150',
    explanation: 'Mivel 20% = 1/5 rész, ezért 750-nek az ötödrészét vesszük: 750 : 5 = 150 (vagy: 750 · 0,2 = 150).',
    difficulty: 'easy',
    category: 'Fejszámolás'
  },
  {
    id: 'q8',
    text: 'Egy osztályba 30 tanuló jár, és az órán a létszám 100%-a jelen van. Hány tanuló hiányzik?',
    options: ['0 tanuló', '3 tanuló', '30 tanuló', '10 tanuló'],
    correctAnswer: '0 tanuló',
    explanation: 'A 100% jelenti a teljes egészet, így ha a 100% jelen van, akkor mindenki ott van, a hiányzók száma 0.',
    difficulty: 'easy',
    category: 'Alapfogalmak'
  },
  {
    id: 'q9',
    text: 'Melyik tört alak egyenlő 150%-kal?',
    options: ['1/2', '3/2', '1/5', '5/2'],
    correctAnswer: '3/2',
    explanation: '150% = 150/100 = 1,5 = 3/2 (vagyis az eredeti mennyiség másfélszerese).',
    difficulty: 'easy',
    category: 'Átváltások'
  },
  {
    id: 'q10',
    text: 'Egy 3400 Ft-os könyvet megvehetünk 50%-kal olcsóbban. Mennyit kell fizetni érte?',
    options: ['1500 Ft', '1700 Ft', '1800 Ft', '680 Ft'],
    correctAnswer: '1700 Ft',
    explanation: 'Az 50% kedvezmény a felét jelenti: 3400 : 2 = 1700 Ft-ot kell fizetni.',
    difficulty: 'easy',
    category: 'Kedvezmények'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Egy 650 férőhelyes színházban a jegyek 40%-a 4900 Ft. Hány darab ilyen jegy van?',
    options: ['240 db', '260 db', '280 db', '325 db'],
    correctAnswer: '260 db',
    explanation: '650 40%-át keressük: 650 · 0,4 = 260 db jegy van.',
    difficulty: 'medium',
    category: 'Százalékérték'
  },
  {
    id: 'q12',
    text: 'A 650 férőhelyes színházban a jegyek 92%-át sikerült eladni. Hány darab jegy maradt meg?',
    options: ['48 db', '52 db', '60 db', '65 db'],
    correctAnswer: '52 db',
    explanation: 'A jegyek 100% - 92% = 8%-a maradt meg. 650 · 0,08 = 52 db jegy maradt meg.',
    difficulty: 'medium',
    category: 'Százalékérték'
  },
  {
    id: 'q13',
    text: 'Egy pohár 150 grammos epres joghurt gyümölcstartalma 24%. Hány gramm epret tartalmaz a joghurt?',
    options: ['32 g', '36 g', '38 g', '42 g'],
    correctAnswer: '36 g',
    explanation: '150 · 0,24 = 36 g tiszta eper van a joghurtban (Paula a munkafüzetben 3800/100 = 38-at számolt, mert 150 · 24-et elszámolta 3600 helyett!).',
    difficulty: 'medium',
    category: 'Százalékérték'
  },
  {
    id: 'q14',
    text: 'Egy almás sütinek a 40%-a alma, 1/4 része vaj és tojás, a többi liszt. A süteménynek hány százaléka liszt?',
    options: ['25%', '30%', '35%', '45%'],
    correctAnswer: '35%',
    explanation: '40% alma + 1/4 (25%) egyéb = 65%. A liszt a maradék: 100% - 65% = 35%.',
    difficulty: 'medium',
    category: 'Százalékrészek'
  },
  {
    id: 'q15',
    text: 'Egy 3400 Ft-os könyv árából 24% kedvezményt kapunk. Mennyit kell fizetni a könyvért?',
    options: ['816 Ft', '2484 Ft', '2584 Ft', '2616 Ft'],
    correctAnswer: '2584 Ft',
    explanation: 'A fizetendő ár az eredeti ár (100 - 24)% = 76%-a: 3400 · 0,76 = 2584 Ft. (816 Ft a kedvezmény mértéke volt!)',
    difficulty: 'medium',
    category: 'Kedvezmények'
  },
  {
    id: 'q16',
    text: 'Egy téglalap alakú kert egyik oldala 25 m, a hosszabb oldala ennek 170%-a. Milyen hosszú a kert másik oldala?',
    options: ['35,5 m', '40 m', '42,5 m', '45 m'],
    correctAnswer: '42,5 m',
    explanation: 'A 25 m 170%-a: 25 · 1,7 = 42,5 m.',
    difficulty: 'medium',
    category: 'Geometria'
  },
  {
    id: 'q17',
    text: 'Mennyi 5,4 kg 70%-a?',
    options: ['3,28 kg', '3,54 kg', '3,78 kg', '4,12 kg'],
    correctAnswer: '3,78 kg',
    explanation: '5,4 · 0,7 = 3,78 kg.',
    difficulty: 'medium',
    category: 'Százalékérték'
  },
  {
    id: 'q18',
    text: 'Egy 3400 Ft-os könyvet megvehetünk 37,5%-kal olcsóbban. Mennyi a kedvezményes ár?',
    options: ['1275 Ft', '2125 Ft', '2215 Ft', '1985 Ft'],
    correctAnswer: '2125 Ft',
    explanation: 'A kedvezmény mértéke 3400 · 0,375 = 1275 Ft. A fizetendő ár: 3400 - 1275 = 2125 Ft (vagy 3400 · 0,625 = 2125 Ft).',
    difficulty: 'medium',
    category: 'Kedvezmények'
  },
  {
    id: 'q19',
    text: 'Mennyi 750-nek a 27,5%-a?',
    options: ['200', '206,25', '212,5', '225'],
    correctAnswer: '206,25',
    explanation: '750 · 0,275 = 206,25.',
    difficulty: 'medium',
    category: 'Százalékérték'
  },
  {
    id: 'q20',
    text: 'Egy 24 500 méteres táv 45%-át tettük meg. Hány métert tettünk meg?',
    options: ['10 025 m', '11 025 m', '12 250 m', '13 475 m'],
    correctAnswer: '11 025 m',
    explanation: '24 500 · 0,45 = 11 025 méter.',
    difficulty: 'medium',
    category: 'Szöveges feladatok'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Összeöntünk 2 liter 25%-os és 3 liter 40%-os narancslevet. Hány százalékos töménységű lesz a keverék?',
    options: ['32,5%', '34%', '35%', '65%'],
    correctAnswer: '34%',
    explanation: 'Tiszta narancslé: 2 · 0,25 + 3 · 0,40 = 0,5 + 1,2 = 1,7 liter. Összes folyadék: 2 + 3 = 5 liter. Töménység: 1,7 : 5 = 0,34 = 34%.',
    difficulty: 'hard',
    category: 'Keverékek'
  },
  {
    id: 'q22',
    text: 'Dávid összeöntött 2 liter 100%-os és 1 liter 40%-os narancslevet. Hány százalékos töménységű lett a keverék?',
    options: ['70%', '80%', '140%', '90%'],
    correctAnswer: '80%',
    explanation: 'A húga tévedett, a százalékok nem adódnak össze! Tiszta narancslé: 2 · 1,0 + 1 · 0,4 = 2,4 liter az összesen 3 literben. Töménység: 2,4 : 3 = 0,8 = 80%.',
    difficulty: 'hard',
    category: 'Keverékek'
  },
  {
    id: 'q23',
    text: 'Digi 120 kg. Az 1. évben leadja a súlyának a 10%-át, a 2. évben ismét lead 10%-ot az akkori súlyából. Hány kg-ot adott le összesen?',
    options: ['20 kg-ot', '22,8 kg-ot', '24 kg-ot', '19,2 kg-ot'],
    correctAnswer: '22,8 kg-ot',
    explanation: '1. év után megmarad 90%: 120 · 0,9 = 108 kg. 2. év után: 108 · 0,9 = 97,2 kg. Összesen leadott súly: 120 - 97,2 = 22,8 kg. (Péter tévedése szerint 10% + 10% = 20% lett volna, ami 24 kg-ot jelentene, de az alap változott!).',
    difficulty: 'hard',
    category: 'Egymást követő változások'
  },
  {
    id: 'q24',
    text: 'A sulibulin a felsősök 3/5 része (60%) táncolt, 70%-a énekelt. 78 gyerek táncolt és énekelt is. Hány tanuló jár a felső tagozatra, ha mindenki részt vett a bulin?',
    options: ['220 fő', '240 fő', '260 fő', '300 fő'],
    correctAnswer: '260 fő',
    explanation: 'Halmazos metszet: 60% + 70% - 100% = 30%. A felsősök 30%-a 78 fő. 1% = 78 : 30 = 2,6 fő. A 100% = 2,6 · 100 = 260 tanuló.',
    difficulty: 'hard',
    category: 'Halmazok & Metszetek'
  },
  {
    id: 'q25',
    text: 'Egy négyzet alakú telek kerülete 14 000 cm. Oldalait 40%-kal megnöveltük. Hány méter lett az új négyzet kerülete?',
    options: ['168 m', '182 m', '196 m', '210 m'],
    correctAnswer: '196 m',
    explanation: '14 000 cm = 140 m. Egy oldal: 140 : 4 = 35 m. Az új oldal: 35 · 1,4 = 49 m. Az új kerület: 4 · 49 = 196 m.',
    difficulty: 'hard',
    category: 'Geometria'
  },
  {
    id: 'q26',
    text: 'Az előző feladatban megnövelt négyzetnek (oldala 49 m) hány m² az új területe?',
    options: ['1960 m²', '2401 m²', '24 010 m²', '240 100 m²'],
    correctAnswer: '2401 m²',
    explanation: 'T = a · a = 49 m · 49 m = 2401 m². (Paula a munkafüzetben 240 100 m²-t kapott, mert elrontotta a cm² -> m² átváltást, mivel 1 m² = 10 000 cm²!).',
    difficulty: 'hard',
    category: 'Geometria'
  },
  {
    id: 'q27',
    text: 'A menzán 240 gyerek tízóraizik, 70%-uk alsós. A felsősök 75%-a 5-6. osztályos. Hány felsős diák jár 5-6. osztályba?',
    options: ['54 fő', '72 fő', '126 fő', '180 fő'],
    correctAnswer: '54 fő',
    explanation: 'Alsósok: 240 · 0,7 = 168 fő. Felsősök: 240 - 168 = 72 fő. A felsősök 75%-a: 72 · 0,75 = 54 fő. (Péter dolgozatában 240 · 0,75 = 180-at számolt, ami hibás alap volt!).',
    difficulty: 'hard',
    category: 'Szöveges feladatok'
  },
  {
    id: 'q28',
    text: 'A kedvenc könyveim 45%-a vicces, 3/4 része (75%) kalandregény. A könyvek hány százalékára igaz biztosan, hogy vicces kalandregény?',
    options: ['15%', '20%', '30%', '35%'],
    correctAnswer: '20%',
    explanation: 'A két tulajdonság összegéből levonjuk a teljes 100%-ot: 75% + 45% - 100% = 20% legalább mindkét kategóriába beletartozik.',
    difficulty: 'hard',
    category: 'Halmazok & Metszetek'
  },
  {
    id: 'q29',
    text: '125 db egybevágó kis kockánk van, melyek 21,6%-a fekete, a többi piros. Építhető-e egy 5×5×5-ös nagy kocka úgy, hogy kívülről csak piros kockák látszódjanak?',
    options: [
      'Nem, mert túl sok fekete kocka van',
      'Igen, mert a 27 fekete kocka pontosan kitölti a belső 3×3×3-as magot',
      'Nem, mert a belső magban csak 8 kocka fér el',
      'Igen, de csak ha a sarkokra is kerül fekete'
    ],
    correctAnswer: 'Igen, mert a 27 fekete kocka pontosan kitölti a belső 3×3×3-as magot',
    explanation: 'Fekete kockák: 125 · 0,216 = 27 db. Egy 5×5×5-ös kocka belső, kívülről nem látható magja pontosan 3×3×3 = 27 db kockából áll, így a fekete kockák mind elrejthetők a belsejében.',
    difficulty: 'hard',
    category: 'Térgeometria'
  },
  {
    id: 'q30',
    text: 'A 8. évfolyamra 124 gyerek jár. Az ide járók pontosan p%-a szeretne gimnáziumba menni. Melyik lehet a p értéke, hogy egész számú diákot kapjunk?',
    options: ['30%', '40%', '60%', '75%'],
    correctAnswer: '75%',
    explanation: '124 · (p / 100) = (31 · p) / 25. Ez a kifejezés csak akkor ad egész számot, ha p osztható 25-tel! A lehetőségek közül csak a 75% osztható 25-tel: 124 · 0,75 = 93 diák.',
    difficulty: 'hard',
    category: 'Oszthatóság & Százalék'
  }
];

export const PercentReviewQuiz: React.FC<PercentReviewQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-review-quiz"
      topicTitle="Mit tanultunk a százalékszámításról?"
      title="Mit tanultunk a százalékszámításról? - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alapfogalmak, százalékérték számítás, árengedmények, keverékek és hibaelemzés"
      badge="GYAKORLÓ KVÍZ"
      themeColor="rose"
      questions={percentReviewQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <PercentReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PercentReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default PercentReviewQuiz;
