import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { ComplexPercentMatcher } from './ComplexPercentMatcher';
import { ComplexPercentSorter } from './ComplexPercentSorter';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Box,
  Scale
} from 'lucide-react';

interface ComplexPercentQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Összetett Szorzótényező Szabálya',
    icon: <Zap className="w-4 h-4 text-purple-600" />,
    formula: 'q_össz = q₁ · q₂ = (1 ± p₁/100) · (1 ± p₂/100)',
    note: 'Egymást követő változásoknál a szorzótényezőket összeszorozzuk! Pl. +10% majd +6% növekedés: 1,10 · 1,06 = 1,166 ➔ +16,6% egyszeri növekedés.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="25" y="30" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600">1,10</text>
        <text x="45" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">·</text>
        <text x="65" y="30" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-600">1,06</text>
        <text x="90" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">=</text>
        <text x="125" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-purple-600">1,166</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A +p% majd -p% Csapda',
    icon: <TrendingDown className="w-4 h-4 text-rose-600" />,
    formula: '1,20 · 0,80 = 0,96 ➔ -4% csökkenés!',
    note: 'Ha egyenlő mértékben emelünk, majd csökkentünk, az ár MINDIG kevesebb lesz az eredetinél, mert a második lépésben a nagyobb érték a 100%!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="22" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">+20%</text>
        <text x="35" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">· 1,20</text>
        <text x="80" y="30" textAnchor="middle" className="text-[13px] font-bold fill-slate-400">➔</text>
        <text x="125" y="22" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">-20%</text>
        <text x="125" y="38" textAnchor="middle" className="text-[9px] font-mono font-bold fill-rose-600">q = 0,96</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A Semleges Pár: +25% majd -20%',
    icon: <Scale className="w-4 h-4 text-emerald-600" />,
    formula: '1,25 · 0,80 = 1,00 ➔ Pontosan 100%!',
    note: 'Egy termék ára akkor marad pontosan változatlan, ha a 25%-os drágítás után 20%-os leértékelést alkalmazunk: 1,25 · 0,80 = 1,00.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="35" height="30" rx="3" fill="#dcfce7" stroke="#16a34a" />
        <text x="32" y="29" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">+25%</text>
        <text x="65" y="30" textAnchor="middle" className="text-[11px] font-bold fill-slate-400">és</text>
        <rect x="80" y="10" width="35" height="30" rx="3" fill="#fee2e2" stroke="#dc2626" />
        <text x="97" y="29" textAnchor="middle" className="text-[9px] font-bold fill-rose-800">-20%</text>
        <text x="135" y="30" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600">= 1,0</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Geometriai Területszorzók',
    icon: <Box className="w-4 h-4 text-indigo-600" />,
    formula: 'T_új = q_a · q_b · T_régi',
    note: 'Ha mindkét oldalt 45%-kal növeljük: 1,45 · 1,45 = 2,1025 ➔ +110,25% terület! Ha +40% és -40%: 1,4 · 0,6 = 0,84 ➔ -16% terület.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="12" width="25" height="25" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
        <text x="80" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">➔</text>
        <rect x="105" y="8" width="40" height="34" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      </svg>
    )
  }
];

const complexPercentQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Egy üdítőspalack-töltő gép óránként 2500 palackot tölt meg. Egy új gép teljesítménye 10%-kal nagyobb ennél. Hány palackot tölt meg az új gép 1 óra alatt?',
    options: ['2600', '2700', '2750', '2800'],
    correctAnswer: '2750',
    explanation: '2500 · 1,10 = 2750 palack/óra (vagy 2500 + 250 = 2750).',
    difficulty: 'easy',
    category: 'Többlépéses növekedés'
  },
  {
    id: 'q2',
    text: 'Egy 12 500 000 Ft-ért vásárolt új gép az első évben a használata során 12%-ot veszít az értékéből. Mennyi a gép értéke 1 év elteltével?',
    options: ['10 500 000 Ft', '11 000 000 Ft', '11 200 000 Ft', '11 500 000 Ft'],
    correctAnswer: '11 000 000 Ft',
    explanation: '12 500 000 · 0,88 = 11 000 000 Ft (az értékvesztés 1 500 000 Ft).',
    difficulty: 'easy',
    category: 'Amortizáció'
  },
  {
    id: 'q3',
    text: 'A Molnár család havi internet előfizetési díja 6500 Ft volt. Csomagváltáskor a díjat 12%-kal emelték. Mennyi lett az új havidíj?',
    options: ['7150 Ft', '7280 Ft', '7350 Ft', '7420 Ft'],
    correctAnswer: '7280 Ft',
    explanation: '6500 · 1,12 = 7280 Ft.',
    difficulty: 'easy',
    category: 'Árváltozás'
  },
  {
    id: 'q4',
    text: 'Melyik szorzótényezővel kapjuk meg közvetlenül egy érték 15%-kal megnövelt értékét?',
    options: ['0,15', '0,85', '1,15', '15'],
    correctAnswer: '1,15',
    explanation: '100% + 15% = 115% = 1,15.',
    difficulty: 'easy',
    category: 'Szorzótényezők'
  },
  {
    id: 'q5',
    text: 'Melyik szorzótényezővel kapjuk meg közvetlenül egy érték 20%-kal csökkentett értékét?',
    options: ['0,20', '0,80', '1,20', '0,08'],
    correctAnswer: '0,80',
    explanation: '100% - 20% = 80% = 0,80.',
    difficulty: 'easy',
    category: 'Szorzótényezők'
  },
  {
    id: 'q6',
    text: 'Egy termék ára 10 000 Ft. Előbb 25%-kal felemelik az árát, majd az új árat 20%-kal leértékelik. Mennyi a termék végső ára?',
    options: ['9500 Ft', '10 000 Ft', '10 500 Ft', '10 800 Ft'],
    correctAnswer: '10 000 Ft',
    explanation: '10 000 · 1,25 = 12 500 Ft. Majd: 12 500 · 0,80 = 10 000 Ft. A szorzó 1,25 · 0,80 = 1,00!',
    difficulty: 'easy',
    category: 'A semleges pár'
  },
  {
    id: 'q7',
    text: 'Egy edzésre 14 lány jár. A sportoló gyerekek 72%-a fiú. Hány gyerek jár összesen az edzésre?',
    options: ['40', '48', '50', '60'],
    correctAnswer: '50',
    explanation: 'A lányok aránya: 100% - 72% = 28%. Összes gyerek: 14 / 0,28 = 50 fő (36 fiú és 14 lány).',
    difficulty: 'easy',
    category: 'Részek és alap'
  },
  {
    id: 'q8',
    text: 'A nyári angoltábor díja most 10%-kal olcsóbb, így 7830 Ft-ba kerül. Mennyi volt az eredeti tábori díj?',
    options: ['8500 Ft', '8613 Ft', '8700 Ft', '8900 Ft'],
    correctAnswer: '8700 Ft',
    explanation: '7830 / 0,90 = 8700 Ft.',
    difficulty: 'easy',
    category: 'Alap visszaszámolása'
  },
  {
    id: 'q9',
    text: 'Egy hipermarketben 500 csomag nápolyi volt kedd reggel. Kedd estére elfogyott a készlet 12%-a. Hány csomag nápolyi maradt a polcon kedd este?',
    options: ['420 db', '440 db', '450 db', '460 db'],
    correctAnswer: '440 db',
    explanation: '500 · (1 - 0,12) = 500 · 0,88 = 440 csomag maradt.',
    difficulty: 'easy',
    category: 'Készletfogyás'
  },
  {
    id: 'q10',
    text: 'Mennyi 1,2 óra időtartamnak a 25%-a percekben kifejezve?',
    options: ['15 perc', '18 perc', '20 perc', '30 perc'],
    correctAnswer: '18 perc',
    explanation: '1,2 óra = 1,2 · 60 = 72 perc. Ennek 25%-a (negyedrésze): 72 · 0,25 = 18 perc.',
    difficulty: 'easy',
    category: 'Mértékegység és arány'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Az üdítőspalackozó új gépe 2750 palackot tölt óránként. Szoftverfrissítés után a teljesítménye további 6%-kal növekszik. Hány palackot tölt meg 1 óra alatt a frissített gép?',
    options: ['2850', '2900', '2915', '2925'],
    correctAnswer: '2915',
    explanation: '2750 · 1,06 = 2915 palack/óra.',
    difficulty: 'medium',
    category: 'Többlépéses növekedés'
  },
  {
    id: 'q12',
    text: 'Egy üzem termelése egymás után előbb 10%-kal, majd további 6%-kal növekedett. Hány százalékos egyszeri növekedésnek felel meg ez összesen az eredeti termeléshez képest?',
    options: ['16%', '16,6%', '17%', '17,2%'],
    correctAnswer: '16,6%',
    explanation: 'Összesített szorzó: 1,10 · 1,06 = 1,166, ami pontosan 16,6%-os egyszeri növekedésnek felel meg!',
    difficulty: 'medium',
    category: 'Láncolt szorzók'
  },
  {
    id: 'q13',
    text: 'A 12 500 000 Ft-ért vásárolt gép 1 év után 11 000 000 Ft-ot ér. A második évben az értéke további 8%-kal csökken. Mennyi lesz a gép értéke két év múlva?',
    options: ['9 800 000 Ft', '10 000 000 Ft', '10 120 000 Ft', '10 250 000 Ft'],
    correctAnswer: '10 120 000 Ft',
    explanation: '11 000 000 · 0,92 = 10 120 000 Ft.',
    difficulty: 'medium',
    category: 'Amortizáció'
  },
  {
    id: 'q14',
    text: 'Egy gép az első évben 12%-ot, a második évben 8%-ot veszít az értékéből. Összesen hány százalékos értékcsökkenés történik két év alatt a kiinduló újkori árhoz képest?',
    options: ['18,5%', '19,04%', '20%', '20,96%'],
    correctAnswer: '19,04%',
    explanation: '0,88 · 0,92 = 0,8096. A két év utáni érték a kiinduló 80,96%-a, így a csökkenés: 100% - 80,96% = 19,04%.',
    difficulty: 'medium',
    category: 'Amortizáció'
  },
  {
    id: 'q15',
    text: 'A Molnár család havidíja 6500 Ft-ról 12%-os emeléssel 7280 Ft lett. Később a 7280 Ft-ot csökkentették 12%-kal egy hűségakcióban. Mennyi lett a fizetendő összeg kerekítve?',
    options: ['6350 Ft', '6406 Ft', '6500 Ft', '6620 Ft'],
    correctAnswer: '6406 Ft',
    explanation: '7280 · 0,88 = 6406,4 Ft ≈ 6406 Ft (94 Ft-tal kevesebb az eredeti 6500 Ft-nál!).',
    difficulty: 'medium',
    category: 'A +p% majd -p% csapda'
  },
  {
    id: 'q16',
    text: 'Egy 30 000 Ft-os téli csizma árát tavasszal 15%-kal, majd áprilisban újabb 10%-kal csökkentették. Mennyibe került a csizma a kétszeri leárazás után?',
    options: ['22 500 Ft', '22 950 Ft', '23 500 Ft', '24 000 Ft'],
    correctAnswer: '22 950 Ft',
    explanation: '30 000 · 0,85 = 25 500 Ft, majd 25 500 · 0,90 = 22 950 Ft (30 000 · 0,765 = 22 950 Ft).',
    difficulty: 'medium',
    category: 'Kétszeri leárazás'
  },
  {
    id: 'q17',
    text: 'A 30 000 Ft-os csizma előbb 15%-kal, majd 10%-kal lett olcsóbb. Hány százalékos lett volna az árengedmény, ha egyetlen lépésben csökkentik az árat?',
    options: ['23,5%', '24%', '25%', '26,5%'],
    correctAnswer: '23,5%',
    explanation: 'Szorzó: 0,85 · 0,90 = 0,765. 100% - 76,5% = 23,5% egyszeri leárazás.',
    difficulty: 'medium',
    category: 'Kétszeri leárazás'
  },
  {
    id: 'q18',
    text: 'Kedd reggel 500 csomag nápolyi volt a polcon. Kedden elfogyott 12%, majd szerdán a megmaradt készlet további 15%-a is elfogyott. Hány csomag nápolyi fogyott el összesen a két nap alatt?',
    options: ['120 db', '126 db', '135 db', '140 db'],
    correctAnswer: '126 db',
    explanation: 'Kedd este maradt: 500 · 0,88 = 440 db. Szerda este maradt: 440 · 0,85 = 374 db. Elfogyott: 500 - 374 = 126 db.',
    difficulty: 'medium',
    category: 'Készletfogyás'
  },
  {
    id: 'q19',
    text: 'Egy jótékonysági koncerten másfél millió Ft (1 500 000 Ft) bevétel gyűlt össze. Ebből 1 275 000 Ft-ot készpénzben osztottak szét az árvízkárosultak között. A bevétel hány százaléka került készpénzben kiosztásra?',
    options: ['80%', '82,5%', '85%', '88%'],
    correctAnswer: '85%',
    explanation: '1 275 000 / 1 500 000 = 0,85 = 85%.',
    difficulty: 'medium',
    category: 'Költségvetési megosztás'
  },
  {
    id: 'q20',
    text: 'Egy 25 000 Ft-os cipő árát előbb felemelték 30%-kal, majd az új árat csökkentették 20%-kal. Mennyi lett a cipő végső ára?',
    options: ['24 000 Ft', '25 000 Ft', '26 000 Ft', '27 500 Ft'],
    correctAnswer: '26 000 Ft',
    explanation: '25 000 · 1,30 · 0,80 = 25 000 · 1,04 = 26 000 Ft (4%-kal drágább az eredetinél).',
    difficulty: 'medium',
    category: 'Áremelés és leárazás'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Egy 10 cm oldalú négyzet egyik oldalát 40%-kal megnöveltük, másik oldalát 40%-kal csökkentettük. Hány százalékkal változott a kapott téglalap területe a négyzetéhez képest?',
    options: ['Változatlan maradt (0%)', '16%-kal nőtt', '16%-kal csökkent', '20%-kal csökkent'],
    correctAnswer: '16%-kal csökkent',
    explanation: 'Oldalak: 14 cm és 6 cm. T_új = 14 · 6 = 84 cm². Eredeti: 100 cm². Területszorzó: 1,40 · 0,60 = 0,84, vagyis 16%-kal csökkent.',
    difficulty: 'hard',
    category: 'Geometriai transzformáció'
  },
  {
    id: 'q22',
    text: 'Egy 10 cm oldalú négyzet egyik oldalát 40%-kal növeljük, másik oldalát 40%-kal csökkentjük. Hogyan változik a kapott téglalap kerülete a négyzet kerületéhez képest?',
    options: ['Változatlan marad (0%)', '8%-kal csökken', '16%-kal csökken', '8%-kal nő'],
    correctAnswer: 'Változatlan marad (0%)',
    explanation: 'K_eredeti = 4 · 10 = 40 cm. K_új = 2 · (14 + 6) = 2 · 20 = 40 cm, tehát a kerület pontosan változatlan marad!',
    difficulty: 'hard',
    category: 'Geometriai transzformáció'
  },
  {
    id: 'q23',
    text: 'Egy téglalap mindkét oldalának hosszát 45%-kal megnöveljük. Hány százalékkal növekszik meg a téglalap területe?',
    options: ['45%-kal', '90%-kal', '100%-kal', '110,25%-kal'],
    correctAnswer: '110,25%-kal',
    explanation: 'T_új = (1,45 · a) · (1,45 · b) = 1,45² · (a · b) = 2,1025 · T_régi. A területnövekedés: 2,1025 - 1 = 1,1025 = 110,25%!',
    difficulty: 'hard',
    category: 'Geometriai transzformáció'
  },
  {
    id: 'q24',
    text: 'A Toldi-tanya iskola nyert egy pályázaton. A támogatás 1/4 részét labdákra (25%), 15%-át szőnyegekre, a megmaradt összeg harmadát korcsolyákra fordították. A legvégén megmaradt 180 000 Ft-ért síléceket vettek. Hány Ft-ot nyert az iskola a pályázaton?',
    options: ['360 000 Ft', '400 000 Ft', '450 000 Ft', '500 000 Ft'],
    correctAnswer: '450 000 Ft',
    explanation: 'Labda + szőnyeg: 25% + 15% = 40%. Maradék: 60%. Korcsolya: 60% / 3 = 20%. Maradék sílécre: 60% - 20% = 40% = 180 000 Ft. Teljes összeg: 180 000 / 0,40 = 450 000 Ft.',
    difficulty: 'hard',
    category: 'Költségvetési megosztás'
  },
  {
    id: 'q25',
    text: 'A Toldi-tanya iskola 450 000 Ft-os támogatásából mennyi pénzt költöttek labdákra, ha arra az összeg negyedrésze jutott?',
    options: ['90 000 Ft', '112 500 Ft', '125 000 Ft', '150 000 Ft'],
    correctAnswer: '112 500 Ft',
    explanation: '450 000 · 0,25 = 112 500 Ft.',
    difficulty: 'hard',
    category: 'Költségvetési megosztás'
  },
  {
    id: 'q26',
    text: 'Egy 1 500 000 Ft-os koncertbevétel 85%-át készpénzben adták át. A megmaradt 15% felét élelmiszerre és vízre fordították. A teljes koncertbevétel hány százaléka jutott élelmiszerre és vízre?',
    options: ['6,5%', '7,5%', '8,5%', '10%'],
    correctAnswer: '7,5%',
    explanation: 'A megmaradt pénz 15%, ennek a fele: 15% · 0,5 = 7,5% (ami 112 500 Ft).',
    difficulty: 'hard',
    category: 'Láncolt arányok'
  },
  {
    id: 'q27',
    text: 'Egy 24 cm oldalú négyzet egyik oldalát 40%-kal csökkentjük (14,4 cm). Hány százalékkal kell megnövelni a másik oldalát ahhoz, hogy a kapott téglalap területe egyenlő legyen a négyzet területével?',
    options: ['40%-kal', '50%-kal', '60%-kal', '66,7%-kal'],
    correctAnswer: '66,7%-kal',
    explanation: 'Négyzet területe: 24² = 576 cm². b = 576 / 14,4 = 40 cm. Növekedés: 40 / 24 = 5/3 ≈ 1,667, vagyis 66,7%-kal kell növelni!',
    difficulty: 'hard',
    category: 'Geometria és területtartás'
  },
  {
    id: 'q28',
    text: 'Egy 200 000 Ft-os laptop vásárlásához 140 000 Ft készpénz áll rendelkezésre. A hiányzó 60 000 Ft-ra féléves részletfizetési hitelt vesznek fel 15% kamattal. Hány forint lesz a havi törlesztőrészlet, ha 6 egyenlő havi részletben fizetik vissza?',
    options: ['10 000 Ft', '11 000 Ft', '11 500 Ft', '12 000 Ft'],
    correctAnswer: '11 500 Ft',
    explanation: 'Kamat: 60 000 · 0,15 = 9000 Ft. Visszafizetendő: 60 000 + 9000 = 69 000 Ft. Havi részlet: 69 000 / 6 = 11 500 Ft.',
    difficulty: 'hard',
    category: 'Kamatszámítás és hitel'
  },
  {
    id: 'q29',
    text: 'Egy műszaki boltban a páratlan napokon 20%-kal drágábban, a páros napokon 20%-kal olcsóbban adják a termékeket az előző napi árhoz képest. Ha hétfőn (1. nap) 20%-os drágítással indul az 1 000 000 Ft-os rendszer, mennyiért vehető meg kedden (2. nap)?',
    options: ['960 000 Ft', '980 000 Ft', '1 000 000 Ft', '1 040 000 Ft'],
    correctAnswer: '960 000 Ft',
    explanation: 'Hétfő (páratlan): 1 000 000 · 1,20 = 1 200 000 Ft. Kedd (páros): 1 200 000 · 0,80 = 960 000 Ft (1 000 000 · 0,96 = 960 000 Ft).',
    difficulty: 'hard',
    category: 'Láncolt árváltozás'
  },
  {
    id: 'q30',
    text: 'Egy diák tengerimalac-állománya félévente 20%-kal növekszik. Jelenleg 100 tengerimalaca van. Hány tengerimalaca lesz pontosan 1 év (két egymást követő félév) múlva?',
    options: ['140 db', '144 db', '150 db', '160 db'],
    correctAnswer: '144 db',
    explanation: '100 · 1,20 · 1,20 = 100 · 1,44 = 144 tengerimalac.',
    difficulty: 'hard',
    category: 'Kamatos kamat modell'
  }
];

export const ComplexPercentQuiz: React.FC<ComplexPercentQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-complex-quiz"
      topicTitle="Összetett százalékszámítási feladatok"
      title="Összetett százalékszámítás - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: szorzótényezők, amortizáció, láncolt árváltozások, költségvetések és geometriai felületek"
      badge="GYAKORLÓ KVÍZ"
      themeColor="purple"
      questions={complexPercentQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <ComplexPercentMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ComplexPercentSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default ComplexPercentQuiz;
