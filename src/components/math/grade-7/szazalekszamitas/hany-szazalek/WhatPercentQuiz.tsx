import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { WhatPercentMatcher } from './WhatPercentMatcher';
import { WhatPercentSorter } from './WhatPercentSorter';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  HardDrive,
  Clock
} from 'lucide-react';

interface WhatPercentQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Százalékláb Alapképlete',
    icon: <Percent className="w-4 h-4 text-cyan-600" />,
    formula: 'p% = (Érték / Alap) · 100% = (É / A) · 100%',
    note: 'Elosztjuk a vizsgált részértéket az alappal, és a kapott hányadost (tizedestörtet) megszorozzuk 100-zal. Pl. 192 / 256 = 0,75 ➔ 75%.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="22" textAnchor="middle" className="text-[11px] font-mono font-bold fill-slate-700">Érték</text>
        <line x1="15" y1="26" x2="55" y2="26" stroke="#64748b" strokeWidth="1.5" />
        <text x="35" y="38" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600">Alap</text>
        <text x="75" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">· 100</text>
        <text x="110" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">=</text>
        <text x="135" y="30" textAnchor="middle" className="text-[12px] font-mono font-extrabold fill-cyan-600">p%</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Nevezők Bővítése 100-ra',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: 'Bővítés: ·50, ·25, ·20, ·5, ·4, ·2',
    note: 'Ha a nevező 2, 4, 5, 20, 25 vagy 50, fejben bővítsük 100-ra! Pl. 17/20 = 85/100 = 85%, 3/4 = 75/100 = 75%.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-slate-700">17 / 20</text>
        <path d="M 60 25 L 80 25" stroke="#10b981" strokeWidth="2" />
        <text x="70" y="18" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">· 5</text>
        <text x="120" y="30" textAnchor="middle" className="text-[12px] font-mono font-extrabold fill-emerald-700">85%</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Változás Százaléka (Mindig a régi ár az alap!)',
    icon: <TrendingUp className="w-4 h-4 text-indigo-600" />,
    formula: 'Változás % = (Különbség / Régi érték) · 100%',
    note: 'Ha az ár megváltozik, a különbséget (új - régi) a RÉGI (kiinduló) értékhez viszonyítjuk! Pl. 250 ➔ 180 Ft: (70 / 250) · 100% = 28% csökkenés.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="40" y="22" textAnchor="middle" className="text-[10px] font-mono font-bold fill-rose-600">Különbség</text>
        <line x1="15" y1="26" x2="65" y2="26" stroke="#64748b" strokeWidth="1.5" />
        <text x="40" y="38" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600">Régi ár</text>
        <path d="M 80 25 L 100 25" stroke="#6366f1" strokeWidth="2" />
        <text x="130" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-indigo-700">± %</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Az Alapváltási Csapda',
    icon: <TrendingDown className="w-4 h-4 text-amber-500" />,
    formula: '2000 ➔ 1600 (-20%) ≠ 1600 ➔ 2000 (+25%)',
    note: 'A csökkenés és az azt követő visszaemelés százaléka SOHA nem egyezik meg, mert a visszaemelésnél a csökkentett érték (1600 Ft) az új 100%!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="22" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">-20%</text>
        <text x="35" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">400/2000</text>
        <text x="80" y="30" textAnchor="middle" className="text-[13px] font-bold fill-slate-400">≠</text>
        <text x="125" y="22" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">+25%</text>
        <text x="125" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">400/1600</text>
      </svg>
    )
  }
];

const whatPercentQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Hány százaléka 24 a 48-nak?',
    options: ['25%', '50%', '75%', '200%'],
    correctAnswer: '50%',
    explanation: '24 / 48 = 1/2 = 0,5 = 50% (a 24 pontosan a fele a 48-nak).',
    difficulty: 'easy',
    category: 'Alap Fejszámolás'
  },
  {
    id: 'q2',
    text: 'Hány százaléka 12 a 120-nak?',
    options: ['5%', '10%', '12%', '20%'],
    correctAnswer: '10%',
    explanation: '12 / 120 = 1/10 = 0,1 = 10% (tizedrésze).',
    difficulty: 'easy',
    category: 'Alap Fejszámolás'
  },
  {
    id: 'q3',
    text: 'Hány százaléka 10 az 50-nek?',
    options: ['10%', '15%', '20%', '25%'],
    correctAnswer: '20%',
    explanation: '10 / 50 = 1/5 = 0,2 = 20% (ötödrésze).',
    difficulty: 'easy',
    category: 'Alap Fejszámolás'
  },
  {
    id: 'q4',
    text: 'Hány százaléka 15 perc az 1 órának (60 percnek)?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: '25%',
    explanation: '15 perc / 60 perc = 1/4 rész = 25% (negyed óra).',
    difficulty: 'easy',
    category: 'Időmérték'
  },
  {
    id: 'q5',
    text: 'Hány százaléka 15 perc a 2 órának (120 percnek)?',
    options: ['7,5%', '12,5%', '15%', '25%'],
    correctAnswer: '12,5%',
    explanation: '15 perc / 120 perc = 1/8 rész = 0,125 = 12,5%.',
    difficulty: 'easy',
    category: 'Időmérték'
  },
  {
    id: 'q6',
    text: 'Hány százaléka 12 perc az 1 órának (60 percnek)?',
    options: ['12%', '15%', '20%', '24%'],
    correctAnswer: '20%',
    explanation: '12 perc / 60 perc = 1/5 rész = 20%.',
    difficulty: 'easy',
    category: 'Időmérték'
  },
  {
    id: 'q7',
    text: 'Hány százaléka 12 perc a fél órának (30 percnek)?',
    options: ['24%', '30%', '40%', '50%'],
    correctAnswer: '40%',
    explanation: '12 perc / 30 perc = 4/10 = 0,4 = 40%.',
    difficulty: 'easy',
    category: 'Időmérték'
  },
  {
    id: 'q8',
    text: 'Hány százaléka 1 méternek (100 cm-nek) az 58 cm?',
    options: ['5,8%', '58%', '85%', '0,58%'],
    correctAnswer: '58%',
    explanation: 'Mivel 1 m = 100 cm, 58 cm / 100 cm = 58/100 = 58%.',
    difficulty: 'easy',
    category: 'Hosszmérték'
  },
  {
    id: 'q9',
    text: 'Hány százaléka 1 méternek a 8,2 cm?',
    options: ['0,82%', '8,2%', '82%', '820%'],
    correctAnswer: '8,2%',
    explanation: '8,2 cm / 100 cm = 8,2/100 = 8,2%.',
    difficulty: 'easy',
    category: 'Hosszmérték'
  },
  {
    id: 'q10',
    text: 'Egy 50 pontos dolgozaton Dániel 42 pontot ért el. Hány százalékos lett az eredménye?',
    options: ['78%', '82%', '84%', '88%'],
    correctAnswer: '84%',
    explanation: '42 / 50 = (42 · 2) / (50 · 2) = 84 / 100 = 84%.',
    difficulty: 'easy',
    category: 'Dolgozatpontszám'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'Egy 256 GB-os pendrive-on 192 GB adat található. Hány százaléka ez a teljes kapacitásnak?',
    options: ['65%', '70%', '75%', '80%'],
    correctAnswer: '75%',
    explanation: '192 / 256 = 3 / 4 = 0,75 = 75% a foglalt tárhely.',
    difficulty: 'medium',
    category: 'Adattárolás'
  },
  {
    id: 'q12',
    text: 'Az előző (256 GB-os) pendrive-on a teljes kapacitás hány százaléka a még rendelkezésre álló szabad terület?',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: '25%',
    explanation: 'Szabad terület: 100% - 75% = 25% (vagy: 64 GB / 256 GB = 1/4 = 25%).',
    difficulty: 'medium',
    category: 'Adattárolás'
  },
  {
    id: 'q13',
    text: 'Egy vevő 29 440 000 Ft-ra alkudta le a 32 000 000 Ft-os lakást. Az eredeti ár hány százalékáért vette meg az ingatlant?',
    options: ['88%', '90%', '92%', '94%'],
    correctAnswer: '92%',
    explanation: '29 440 000 / 32 000 000 = 23 / 25 = 92 / 100 = 92%.',
    difficulty: 'medium',
    category: 'Ingatlan'
  },
  {
    id: 'q14',
    text: 'Hány százalékos engedményt adott az eladó az előző lakásvásárlásnál (32 000 000 Ft-ról 29 440 000 Ft-ra)?',
    options: ['6%', '8%', '10%', '12%'],
    correctAnswer: '8%',
    explanation: 'Kedvezmény mértéke: 100% - 92% = 8% (vagy: engedmény 2 560 000 Ft / 32 000 000 Ft = 0,08 = 8%).',
    difficulty: 'medium',
    category: 'Ingatlan'
  },
  {
    id: 'q15',
    text: 'Egy 60 kg-os ember testében körülbelül 42 kg víz van. Testtömegének hány százaléka víz?',
    options: ['60%', '65%', '70%', '75%'],
    correctAnswer: '70%',
    explanation: '42 kg / 60 kg = 7 / 10 = 0,7 = 70% víz.',
    difficulty: 'medium',
    category: 'Biológia & Testtömeg'
  },
  {
    id: 'q16',
    text: 'A 3000 megvizsgált háztartás közül 1320-ban volt gépkocsi. A háztartások hány százalékában volt autó?',
    options: ['40%', '44%', '48%', '52%'],
    correctAnswer: '44%',
    explanation: '1320 / 3000 = 44 / 100 = 0,44 = 44%.',
    difficulty: 'medium',
    category: 'Statisztika'
  },
  {
    id: 'q17',
    text: 'Matyi a 140 pontos dolgozatát 119 pontra írta meg. Hány százalékos lett az eredménye?',
    options: ['80%', '82,5%', '85%', '87,5%'],
    correctAnswer: '85%',
    explanation: '119 / 140 = (119 : 7) / (140 : 7) = 17 / 20 = 85 / 100 = 85%.',
    difficulty: 'medium',
    category: 'Dolgozatpontszám'
  },
  {
    id: 'q18',
    text: 'Egy 440 km-es autós utazásból eddig 176 km-t tettünk meg. Az út hány százaléka van MÉG HÁTRA?',
    options: ['40%', '50%', '60%', '65%'],
    correctAnswer: '60%',
    explanation: 'Hátralévő út: 440 - 176 = 264 km. 264 / 440 = 6 / 10 = 60% van még hátra (a megtett út 176 / 440 = 40% volt).',
    difficulty: 'medium',
    category: 'Szöveges feladatok'
  },
  {
    id: 'q19',
    text: 'Egy derékszögű háromszög egyik hegyesszöge 27°. Hány százaléka ez a szög a 90°-os derékszögnek?',
    options: ['25%', '27%', '30%', '33,3%'],
    correctAnswer: '30%',
    explanation: '27° / 90° = 3 / 10 = 0,3 = 30%.',
    difficulty: 'medium',
    category: 'Geometria'
  },
  {
    id: 'q20',
    text: 'Ugyanebben a derékszögű háromszögben a 27°-os szög hány százaléka a másik hegyesszögnek (63°-nak)?',
    options: ['30%', '40%', 'kb. 42,86%', '45%'],
    correctAnswer: 'kb. 42,86%',
    explanation: 'Másik szög: 90° - 27° = 63°. 27 / 63 = 3 / 7 ≈ 0,42857 ➔ kb. 42,86%.',
    difficulty: 'medium',
    category: 'Geometria'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'A 290 Ft-os tej új ára 430 Ft lett. Hány százalékos az áremelkedés mértéke kerekítve?',
    options: ['kb. 38%', 'kb. 44%', 'kb. 48%', 'kb. 148%'],
    correctAnswer: 'kb. 48%',
    explanation: 'Áremelkedés mértéke: 430 - 290 = 140 Ft. Alap a régi ár (290 Ft): 140 / 290 ≈ 0,4828 ➔ kb. 48% (a 148% az új ár aránya, nem az emelkedésé!).',
    difficulty: 'hard',
    category: 'Árváltozás'
  },
  {
    id: 'q22',
    text: 'Lázár a korábbi heti 5 óra helyett heti 7 órát tanul. Hány százalékkal növekedett Lázár tanulási ideje?',
    options: ['20%-kal', '28,6%-kal', '40%-kal', '140%-kal'],
    correctAnswer: '40%-kal',
    explanation: 'Növekedés: 7 - 5 = 2 óra. Alap a korábbi heti 5 óra: 2 / 5 = 40/100 = 40% növekedés.',
    difficulty: 'hard',
    category: 'Relatív növekedés'
  },
  {
    id: 'q23',
    text: 'A büfé délutáni akciójában a 250 Ft-os szendvics 180 Ft-ba kerül. Hány százalékos az árcsökkenés?',
    options: ['25%', '28%', '32%', '72%'],
    correctAnswer: '28%',
    explanation: 'Csökkenés: 250 - 180 = 70 Ft. Alap az eredeti 250 Ft: 70 / 250 = 28 / 100 = 28% árcsökkenés.',
    difficulty: 'hard',
    category: 'Árcsökkenés'
  },
  {
    id: 'q24',
    text: 'Egy könyv árát 2000 Ft-ról 1600 Ft-ra csökkentették, majd később visszemelték 2000 Ft-ra. Hány százalékos volt a leárazás?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: '20%',
    explanation: 'Leárazás összege: 400 Ft. Alap a 2000 Ft: 400 / 2000 = 1/5 = 20% volt a leárazás.',
    difficulty: 'hard',
    category: 'Alapváltási Szabály'
  },
  {
    id: 'q25',
    text: 'Az előző feladatban (2000 Ft ➔ 1600 Ft ➔ 2000 Ft) hány százalékos volt az áremelés az 1600 Ft-os akciós árhoz képest?',
    options: ['20%', '25%', '30%', '40%'],
    correctAnswer: '25%',
    explanation: 'Emelés összege: 400 Ft. Viszont a kiinduló alap most az 1600 Ft: 400 / 1600 = 1/4 = 25% áremelés!',
    difficulty: 'hard',
    category: 'Alapváltási Szabály'
  },
  {
    id: 'q26',
    text: 'Egy 10 cm és 5 cm oldalú téglalap minden oldalát 20%-kal növeljük. Hány százalékkal nő a téglalap területe?',
    options: ['20%-kal', '40%-kal', '44%-kal', '48%-kal'],
    correctAnswer: '44%-kal',
    explanation: 'Eredeti terület: 10 · 5 = 50 cm². Új oldalak: 12 cm és 6 cm, új terület: 72 cm². Gyarapodás: 72 - 50 = 22 cm². Százalék: 22 / 50 = 44% (mivel 1,2 · 1,2 = 1,44!).',
    difficulty: 'hard',
    category: 'Geometria'
  },
  {
    id: 'q27',
    text: 'Hány százaléka 20 perc a 30 másodpercnek?',
    options: ['66,7%', '400%', '600%', '4000%'],
    correctAnswer: '4000%',
    explanation: 'Mértékegység egyeztetés: 20 perc = 1200 másodperc. 1200 : 30 = 40-szerese, azaz 40 · 100% = 4000%!',
    difficulty: 'hard',
    category: 'Mértékegység Átváltás'
  },
  {
    id: 'q28',
    text: 'Hány százaléka 50 gramm a 2,5 kg-nak?',
    options: ['2%', '5%', '20%', '50%'],
    correctAnswer: '2%',
    explanation: '2,5 kg = 2500 g. 50 g / 2500 g = 1 / 50 = 2 / 100 = 2%.',
    difficulty: 'hard',
    category: 'Mértékegység Átváltás'
  },
  {
    id: 'q29',
    text: 'Aladár szobájában a rendetlenségért 28-szor anya, 10-szer apa szól rá, és 2-szer veszi észre ő maga. Az összes eset hány százalékában szól anya?',
    options: ['56%', '65%', '70%', '75%'],
    correctAnswer: '70%',
    explanation: 'Összes figyelmeztetés: 28 + 10 + 2 = 40 eset. Anya aránya: 28 / 40 = 7 / 10 = 70%.',
    difficulty: 'hard',
    category: 'Diagram & Statisztika'
  },
  {
    id: 'q30',
    text: 'Morgós Miska 120 morgásából 27 szólt arról, miért kell iskolába járni. A morgások hány százaléka volt ez?',
    options: ['20%', '22,5%', '25%', '27%'],
    correctAnswer: '22,5%',
    explanation: '27 / 120 = 9 / 40 = 0,225 = 22,5%.',
    difficulty: 'hard',
    category: 'Diagram & Statisztika'
  }
];

export const WhatPercentQuiz: React.FC<WhatPercentQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-what-quiz"
      topicTitle="Hány százalék?"
      title="Hány százalék? - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: százalékláb kiszámítása, tört- és tizedes átváltás, áremelések és árcsökkenések összehasonlítása"
      badge="GYAKORLÓ KVÍZ"
      themeColor="cyan"
      questions={whatPercentQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <WhatPercentMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <WhatPercentSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default WhatPercentQuiz;
