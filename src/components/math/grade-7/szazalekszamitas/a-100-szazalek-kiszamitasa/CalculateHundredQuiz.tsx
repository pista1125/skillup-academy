import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { CalculateHundredMatcher } from './CalculateHundredMatcher';
import { CalculateHundredSorter } from './CalculateHundredSorter';
import {
  Calculator,
  Percent,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  School,
  Sun
} from 'lucide-react';

interface CalculateHundredQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A 100% Kiszámítása Következtetéssel',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: '1% = Érték : p  •  100% = 1% · 100',
    note: '1. lépés: Az ismert részértéket elosztjuk a százaléklábbal (1%). 2. lépés: A kapott 1%-ot megszorozzuk 100-zal. Az 1% lehet tizedestört is, a 100-szorosa már egész lesz!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="12" width="40" height="26" rx="4" className="fill-emerald-100 stroke-emerald-400" />
        <text x="30" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-800">É : p</text>
        <path d="M 55 25 L 75 25" stroke="#10b981" strokeWidth="2" />
        <rect x="80" y="12" width="30" height="26" rx="4" className="fill-blue-100 stroke-blue-400" />
        <text x="95" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-800">1%</text>
        <path d="M 115 25 L 125 25" stroke="#3b82f6" strokeWidth="2" />
        <text x="142" y="29" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-700">·100</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Képlet és Tizedestörtes Osztás',
    icon: <Percent className="w-4 h-4 text-blue-600" />,
    formula: 'Alap = Érték : (p / 100) = Érték : 0,0p',
    note: 'Az alapot úgy kapjuk meg, hogy a százalékértéket elosztjuk a százalékláb tizedes tört alakjával. Pl. 84 : 0,12 = 700 tanuló.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="45" y="22" textAnchor="middle" className="text-[11px] font-mono font-bold fill-slate-700">Érték</text>
        <line x1="20" y1="26" x2="70" y2="26" stroke="#64748b" strokeWidth="1.5" />
        <text x="45" y="38" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600">0,0p</text>
        <text x="90" y="30" textAnchor="middle" className="text-[13px] font-bold fill-slate-400">=</text>
        <text x="125" y="30" textAnchor="middle" className="text-[12px] font-mono font-extrabold fill-emerald-600">Alap</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Visszaszámolás Drágulásból (+p%)',
    icon: <TrendingUp className="w-4 h-4 text-indigo-600" />,
    formula: 'Eredeti ár = Új ár : (1 + p / 100)',
    note: 'Ha az árat p%-kal emelték, az új ár (100 + p)%-a az eredetinek! Pl. +20% után 4 560 000 Ft ➔ 120% ➔ 4 560 000 : 1,2 = 3 800 000 Ft.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="60" height="26" rx="6" className="fill-indigo-100 stroke-indigo-400" />
        <text x="45" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-800">120% új ár</text>
        <path d="M 80 25 L 95 25" stroke="#6366f1" strokeWidth="2" />
        <rect x="100" y="12" width="50" height="26" rx="6" className="fill-emerald-100 stroke-emerald-400" />
        <text x="125" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-800">: 1,2</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Visszaszámolás Akcióból (-p%)',
    icon: <TrendingDown className="w-4 h-4 text-rose-600" />,
    formula: 'Eredeti ár = Új ár : (1 - p / 100)',
    note: 'Ha az árat p%-kal csökkentették, az akciós ár (100 - p)%-a az eredetinek! Pl. -20% után 196 000 Ft ➔ 80% ➔ 196 000 : 0,8 = 245 000 Ft.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="55" height="26" rx="6" className="fill-rose-100 stroke-rose-400" />
        <text x="42" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-rose-800">80% ár</text>
        <path d="M 75 25 L 90 25" stroke="#e11d48" strokeWidth="2" />
        <rect x="95" y="12" width="50" height="26" rx="6" className="fill-emerald-100 stroke-emerald-400" />
        <text x="120" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-800">: 0,8</text>
      </svg>
    )
  }
];

const calculateHundredQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Egy számnak az 1%-a 29. Mennyi maga a szám (a 100%-a)?',
    options: ['290', '2900', '29 000', '290 000'],
    correctAnswer: '2900',
    explanation: 'Mivel az 1% ismert (29), a 100%-ot úgy kapjuk meg, hogy megszorozzuk 100-zal: 29 · 100 = 2900.',
    difficulty: 'easy',
    category: 'Alap Következtetés'
  },
  {
    id: 'q2',
    text: 'Egy számnak a 2%-a 22. Mennyi maga a szám?',
    options: ['440', '1100', '2200', '110'],
    correctAnswer: '1100',
    explanation: 'Először kiszámoljuk az 1%-ot: 22 : 2 = 11. Ebből a 100%: 11 · 100 = 1100.',
    difficulty: 'easy',
    category: 'Alap Következtetés'
  },
  {
    id: 'q3',
    text: 'Egy számnak a 20%-a 40. Mennyi az egész szám?',
    options: ['80', '160', '200', '400'],
    correctAnswer: '200',
    explanation: 'A 20% az egész szám ötödrésze, így a szám 40 · 5 = 200 (vagy: 1% = 2, 100% = 200).',
    difficulty: 'easy',
    category: 'Fejszámolás'
  },
  {
    id: 'q4',
    text: 'Egy számnak a 10%-a 750. Mennyi az egész szám?',
    options: ['75', '7500', '75 000', '1500'],
    correctAnswer: '7500',
    explanation: 'A 10% a tizedrészt jelenti, ezért a teljes szám tízszerese: 750 · 10 = 7500.',
    difficulty: 'easy',
    category: 'Fejszámolás'
  },
  {
    id: 'q5',
    text: 'Egy számnak az 50%-a 45. Mennyi maga a szám?',
    options: ['22,5', '90', '180', '450'],
    correctAnswer: '90',
    explanation: 'Az 50% a felét jelenti, így az egész szám a duplája: 45 · 2 = 90.',
    difficulty: 'easy',
    category: 'Fejszámolás'
  },
  {
    id: 'q6',
    text: 'Egy számnak a 25%-a 18. Mennyi az egész szám?',
    options: ['36', '54', '72', '90'],
    correctAnswer: '72',
    explanation: 'A 25% a negyedrészt jelenti, így az egész szám a négyszerese: 18 · 4 = 72.',
    difficulty: 'easy',
    category: 'Fejszámolás'
  },
  {
    id: 'q7',
    text: 'Hogyan kapjuk meg az alapot (100%-ot) a következtetéses módszerrel, ha ismerjük a százalékértéket (É) és a százaléklábat (p%)?',
    options: [
      'Elosztjuk az értéket p-vel, majd az eredményt megszorozzuk 100-zal',
      'Megszorozzuk az értéket p-vel, majd elosztjuk 100-zal',
      'Összeadjuk az értéket és p-t',
      'Kivonjuk p-t az értékből'
    ],
    correctAnswer: 'Elosztjuk az értéket p-vel, majd az eredményt megszorozzuk 100-zal',
    explanation: 'Először meghatározzuk az 1%-ot: 1% = É : p, majd ezt megszorozzuk 100-zal a 100% eléréséhez.',
    difficulty: 'easy',
    category: 'Szabályok'
  },
  {
    id: 'q8',
    text: 'Melyik összefüggéssel számítható ki közvetlenül az alap (A), ha ismerjük a százalékértéket (É) és a százalékláb tizedes alakját (p_tizedes)?',
    options: [
      'A = É · p_tizedes',
      'A = É : p_tizedes',
      'A = p_tizedes : É',
      'A = É + p_tizedes'
    ],
    correctAnswer: 'A = É : p_tizedes',
    explanation: 'Mivel É = A · p_tizedes, mindkét oldalt elosztva p_tizedessel kapjuk: A = É : p_tizedes.',
    difficulty: 'easy',
    category: 'Szabályok'
  },
  {
    id: 'q9',
    text: 'Egy számnak a 160%-a 40. Mennyi a szám?',
    options: ['25', '30', '64', '250'],
    correctAnswer: '25',
    explanation: '40 : 1,6 = 25 (vagy: 1% = 40 : 160 = 0,25 ➔ 100% = 0,25 · 100 = 25).',
    difficulty: 'easy',
    category: '100% feletti alap'
  },
  {
    id: 'q10',
    text: 'Ingatlan vásárlásakor a család 7500 euró foglalót fizetett, ami a teljes vételár 10%-a. Mennyibe került a ház?',
    options: ['75 000 euró', '82 500 euró', '150 000 euró', '750 000 euró'],
    correctAnswer: '75 000 euró',
    explanation: 'Mivel 10% = 7500 euró, a 100% a tízszerese: 7500 · 10 = 75 000 euróba került a ház.',
    difficulty: 'easy',
    category: 'Szöveges feladatok'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Egy iskolában 84 diák tanul zenét. Ez az iskola tanulóinak 12%-a. Hányan járnak ebbe az iskolába?',
    options: ['600 tanuló', '700 tanuló', '840 tanuló', '1008 tanuló'],
    correctAnswer: '700 tanuló',
    explanation: '1% kiszámítása: 84 : 12 = 7 tanuló. Az iskola létszáma (100%): 7 · 100 = 700 tanuló.',
    difficulty: 'medium',
    category: 'Iskolai feladatok'
  },
  {
    id: 'q12',
    text: 'A 7. évfolyamosok 32%-a rendszeresen sportol, ez 40 diák. Hány tanuló jár a 7. évfolyamra?',
    options: ['120 diák', '125 diák', '128 diák', '132 diák'],
    correctAnswer: '125 diák',
    explanation: '1% = 40 : 32 = 1,25 tanuló. A teljes évfolyam létszáma (100%): 1,25 · 100 = 125 tanuló.',
    difficulty: 'medium',
    category: 'Iskolai feladatok'
  },
  {
    id: 'q13',
    text: 'Egy tetőre 24 m² napelemet szereltek, amellyel a teljes tető 30%-át fedték le. Mekkora a tető teljes felülete?',
    options: ['72 m²', '80 m²', '84 m²', '96 m²'],
    correctAnswer: '80 m²',
    explanation: '30% = 24 m² ➔ 1% = 24 : 30 = 0,8 m² ➔ 100% = 0,8 · 100 = 80 m².',
    difficulty: 'medium',
    category: 'Gyakorlati feladatok'
  },
  {
    id: 'q14',
    text: 'Egy hat évfolyamos iskola 4 darab hatodik osztályába 24-24 tanuló jár. A hatodikosok az iskola 15%-át teszik ki. Hányan járnak az iskolába?',
    options: ['540 tanuló', '600 tanuló', '640 tanuló', '720 tanuló'],
    correctAnswer: '640 tanuló',
    explanation: 'A 6. évfolyam létszáma: 4 · 24 = 96 tanuló. 1% = 96 : 15 = 6,4 tanuló. Az iskola létszáma: 6,4 · 100 = 640 tanuló.',
    difficulty: 'medium',
    category: 'Iskolai feladatok'
  },
  {
    id: 'q15',
    text: 'A felirat szerint a filmből még 1 óra 12 perc (40%) van hátra. Hány perces a teljes film?',
    options: ['120 perc', '150 perc', '180 perc', '200 perc'],
    correctAnswer: '180 perc',
    explanation: '1 óra 12 perc = 72 perc. 1% = 72 : 40 = 1,8 perc. A teljes film hossza (100%): 1,8 · 100 = 180 perc (azaz 3 óra).',
    difficulty: 'medium',
    category: 'Időmérték'
  },
  {
    id: 'q16',
    text: 'A 250 grammos Maxi Mix ára 30%-kal emelkedett, így 150 Ft-tal drágább lett. Mennyibe került az emelés előtt?',
    options: ['450 Ft', '500 Ft', '550 Ft', '650 Ft'],
    correctAnswer: '500 Ft',
    explanation: 'A 150 Ft-os drágulás pontosan a 30%-nak felel meg. 1% = 150 : 30 = 5 Ft. Az eredeti ár (100%): 5 · 100 = 500 Ft.',
    difficulty: 'medium',
    category: 'Áremelés'
  },
  {
    id: 'q17',
    text: 'Mennyi lett a Maxi Mix új ára a 30%-os (150 Ft-os) áremelkedés után?',
    options: ['500 Ft', '600 Ft', '650 Ft', '750 Ft'],
    correctAnswer: '650 Ft',
    explanation: 'Az eredeti ár 500 Ft volt, a drágulás 150 Ft, így az új ár: 500 + 150 = 650 Ft (vagy: 500 · 1,3 = 650 Ft).',
    difficulty: 'medium',
    category: 'Áremelés'
  },
  {
    id: 'q18',
    text: 'Alvin egy év alatt 9 cm-t nőtt, ami 6%-os növekedésnek felel meg. Hány cm magas volt egy évvel korábban?',
    options: ['144 cm', '150 cm', '154 cm', '159 cm'],
    correctAnswer: '150 cm',
    explanation: '6% = 9 cm ➔ 1% = 9 : 6 = 1,5 cm ➔ 100% = 1,5 · 100 = 150 cm magas volt Alvin.',
    difficulty: 'medium',
    category: 'Növekedés'
  },
  {
    id: 'q19',
    text: 'Hány cm lett Alvin magassága a 6%-os növekedés után?',
    options: ['150 cm', '156 cm', '159 cm', '162 cm'],
    correctAnswer: '159 cm',
    explanation: 'A korábbi 150 cm-es magasságához hozzáadjuk a 9 cm növekedést: 150 + 9 = 159 cm lett.',
    difficulty: 'medium',
    category: 'Növekedés'
  },
  {
    id: 'q20',
    text: 'Peti édesapja 15%-os adókulcs mellett 684 000 Ft jövedelemadót fizetett. Mennyi volt az éves adóköteles bevétele?',
    options: ['3 800 000 Ft', '4 250 000 Ft', '4 560 000 Ft', '5 120 000 Ft'],
    correctAnswer: '4 560 000 Ft',
    explanation: '1% = 684 000 : 15 = 45 600 Ft. A teljes jövedelem (100%): 45 600 · 100 = 4 560 000 Ft (vagy: 684 000 : 0,15 = 4 560 000 Ft).',
    difficulty: 'medium',
    category: 'Pénzügyek'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Egy autó árát 20%-kal megemelték, így most 4 560 000 Ft-ba kerül. Mennyi volt az ára az emelés előtt?',
    options: ['3 648 000 Ft', '3 800 000 Ft', '3 920 000 Ft', '4 000 000 Ft'],
    correctAnswer: '3 800 000 Ft',
    explanation: 'A felemelt ár az eredeti ár 120%-a: 120% = 4 560 000 Ft ➔ 1% = 4 560 000 : 120 = 38 000 Ft ➔ 100% = 3 800 000 Ft. (Nem szabad a 4 560 000 Ft 20%-át levonni!).',
    difficulty: 'hard',
    category: 'Visszaszámolás Drágulásból'
  },
  {
    id: 'q22',
    text: 'Egy számítógépet 20%-kal olcsóbban kínálnak, az ára most 196 000 Ft. Mennyibe került az akció előtt?',
    options: ['235 200 Ft', '245 000 Ft', '250 000 Ft', '256 000 Ft'],
    correctAnswer: '245 000 Ft',
    explanation: 'Az akciós ár az eredeti ár 80%-a: 80% = 196 000 Ft ➔ 1% = 196 000 : 80 = 2450 Ft ➔ 100% = 245 000 Ft.',
    difficulty: 'hard',
    category: 'Visszaszámolás Akcióból'
  },
  {
    id: 'q23',
    text: 'Mennyi pénzt takarít meg a vásárló az előző (196 000 Ft-os akciós árú) számítógép megvásárlásakor?',
    options: ['39 200 Ft', '45 000 Ft', '49 000 Ft', '52 000 Ft'],
    correctAnswer: '49 000 Ft',
    explanation: 'Az eredeti ár 245 000 Ft volt, az akciós ár 196 000 Ft, a különbség: 245 000 - 196 000 = 49 000 Ft (ami megegyezik 245 000 · 0,2-del).',
    difficulty: 'hard',
    category: 'Megtakarítás'
  },
  {
    id: 'q24',
    text: 'Az osztálylétszám idén 25%-kal nőtt, így most 30-an vagyunk. Hányan jártak az osztályba korábban?',
    options: ['22 tanuló', '24 tanuló', '25 tanuló', '26 tanuló'],
    correctAnswer: '24 tanuló',
    explanation: 'Az új létszám az eredeti 125%-a: 125% = 30 fő ➔ 1% = 30 : 125 = 0,24 ➔ 100% = 0,24 · 100 = 24 tanuló.',
    difficulty: 'hard',
    category: 'Létszámnövekedés'
  },
  {
    id: 'q25',
    text: 'Albert azt mondta: a szavak 40%-át elfelejtette éjszaka, azért emlékezett reggelre csak 72 szóra. Hány szót kellett volna tudnia eredetileg?',
    options: ['108 szót', '120 szót', '144 szót', '180 szót'],
    correctAnswer: '120 szót',
    explanation: 'Albert a megmaradt 100% - 40% = 60%-ra emlékezett. 60% = 72 szó ➔ 1% = 72 : 60 = 1,2 szó ➔ 100% = 1,2 · 100 = 120 szót kellett tudnia.',
    difficulty: 'hard',
    category: 'Szöveges feladatok'
  },
  {
    id: 'q26',
    text: 'Egy őstermelő délelőtt eladta a reggeli őszibarackkészletének 60%-át. Délután a maradék 120 kg is elfogyott. Mennyi őszibarackja volt a nap elején?',
    options: ['200 kg', '240 kg', '300 kg', '360 kg'],
    correctAnswer: '300 kg',
    explanation: 'A délután eladott mennyiség a készlet 100% - 60% = 40%-a volt. 40% = 120 kg ➔ 1% = 3 kg ➔ 100% = 300 kg barack volt a nap elején.',
    difficulty: 'hard',
    category: 'Készletszámítás'
  },
  {
    id: 'q27',
    text: 'Az őstermelő a 300 kg barackból délelőtt 180 kg-ot 160 Ft/kg-ért adott el, délután a maradék 120 kg-ra 15% engedményt adott. Mennyi volt az aznapi teljes bevétele?',
    options: ['43 200 Ft', '44 800 Ft', '45 120 Ft', '48 000 Ft'],
    correctAnswer: '45 120 Ft',
    explanation: 'Délelőtt: 180 · 160 = 28 800 Ft. Délutáni ár: 160 · 0,85 = 136 Ft/kg. Délutáni bevétel: 120 · 136 = 16 320 Ft. Összesen: 28 800 + 16 320 = 45 120 Ft.',
    difficulty: 'hard',
    category: 'Összetett feladatok'
  },
  {
    id: 'q28',
    text: 'A család villanyszámlája korábban évi 264 ezer Ft volt. A napelemekkel éves szinten 90%-os csökkenést értek el. Hány Ft-ot takarítanak meg egy év alatt?',
    options: ['26 400 Ft-ot', '237 600 Ft-ot', '240 000 Ft-ot', '250 000 Ft-ot'],
    correctAnswer: '237 600 Ft-ot',
    explanation: 'A megtakarítás az eredeti összeg 90%-a: 264 000 · 0,9 = 237 600 Ft (az új éves számla csak 26 400 Ft lett).',
    difficulty: 'hard',
    category: 'Pénzügyek'
  },
  {
    id: 'q29',
    text: 'A 95-ös benzin árát 1,5%-kal csökkentették. 45 litert tankoltunk, és 297 Ft-ot takarítottunk meg. Mennyibe került literenként a benzin az árcsökkentés előtt?',
    options: ['420 Ft', '435 Ft', '440 Ft', '450 Ft'],
    correctAnswer: '440 Ft',
    explanation: '1 literenkénti megtakarítás: 297 : 45 = 6,6 Ft. Mivel ez az eredeti ár 1,5%-a: 1% = 6,6 : 1,5 = 4,4 Ft ➔ 100% = 4,4 · 100 = 440 Ft volt literenként.',
    difficulty: 'hard',
    category: 'Összetett feladatok'
  },
  {
    id: 'q30',
    text: 'Miért hibás az az eljárás, hogy ha egy autó ára 20%-os áremelés után 4 560 000 Ft lett, akkor a 4 560 000 Ft-ból vonjuk le a 20%-ot?',
    options: [
      'Mert a megemelt ár 20%-a nagyobb összeg, mint az eredeti ár 20%-a volt',
      'Mert áremelésnél mindig hozzáadni kell, sosem kivonni',
      'Mert 20%-ot csak törtekből lehet levonni',
      'Mert a 100% sosem lehet kisebb, mint az új ár'
    ],
    correctAnswer: 'Mert a megemelt ár 20%-a nagyobb összeg, mint az eredeti ár 20%-a volt',
    explanation: 'A 20%-os emelés az eredeti (kisebb) alapra vonatkozott. A megnövelt 4 560 000 Ft 20%-a 912 000 Ft, ami jóval több, mint az eredeti 760 000 Ft-os drágulás!',
    difficulty: 'hard',
    category: 'Típushibák & Csapdák'
  }
];

export const CalculateHundredQuiz: React.FC<CalculateHundredQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-100-quiz"
      topicTitle="A 100% kiszámítása"
      title="A 100% kiszámítása - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alap visszaszámítása, következtetés 1%-kal, áremelés és akció utáni visszafejtés"
      badge="GYAKORLÓ KVÍZ"
      themeColor="emerald"
      questions={calculateHundredQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <CalculateHundredMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <CalculateHundredSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default CalculateHundredQuiz;
