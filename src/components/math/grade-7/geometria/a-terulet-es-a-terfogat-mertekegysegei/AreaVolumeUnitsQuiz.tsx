import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AreaVolumeUnitsMatcher } from './AreaVolumeUnitsMatcher';
import { AreaVolumeUnitsSorter } from './AreaVolumeUnitsSorter';
import {
  Ruler,
  Box,
  Layers,
  Target,
  Sparkles,
  Calculator,
  Compass,
  Droplets,
  Scale
} from 'lucide-react';

interface AreaVolumeUnitsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Területmértékek (Váltószám: 100)',
    icon: <Ruler className="w-4 h-4 text-cyan-600" />,
    formula: '1\\text{ m}^2 = 100\\text{ dm}^2 = 10\\ 000\\text{ cm}^2',
    note: 'Szomszédos egységek között a váltószám 100 (10 × 10). Minden lépésnél 2 tizedesjeggyel toljuk el a vesszőt.'
  },
  {
    id: 'c2',
    title: 'Ár és Hektár (Mezőgazdasági mértékek)',
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    formula: '1\\text{ a} = 100\\text{ m}^2, \\quad 1\\text{ ha} = 100\\text{ a} = 10\\ 000\\text{ m}^2',
    note: '1 ár: 10 m × 10 m-es kert. 1 hektár: 100 m × 100 m-es szántóföld. 1 km² = 100 ha = 1 000 000 m².'
  },
  {
    id: 'c3',
    title: 'Térfogatmértékek (Váltószám: 1000)',
    icon: <Box className="w-4 h-4 text-indigo-600" />,
    formula: '1\\text{ m}^3 = 1000\\text{ dm}^3 = 1\\ 000\\ 000\\text{ cm}^3',
    note: 'Szomszédos egységek között a váltószám 1000 (10 × 10 × 10). Minden lépésnél 3 tizedesjeggyel toljuk el a vesszőt.'
  },
  {
    id: 'c4',
    title: 'Az Űrmérték Aranykapcsa',
    icon: <Droplets className="w-4 h-4 text-blue-600" />,
    formula: '1\\text{ dm}^3 = 1\\text{ l}, \\quad 1\\text{ cm}^3 = 1\\text{ ml}, \\quad 1\\text{ m}^3 = 1000\\text{ l} = 10\\text{ hl}',
    note: '1 dm³ folyadék pontosan 1 liter. 1 cm³ pedig 1 milliliter (ml). 1 hektoliter (hl) = 100 liter.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és váltószámok)
  1: {
    title: '1. Szint: Alapvető Váltószámok és Egységek',
    description: 'Terület- és térfogategységek alapszabályai, 100-as és 1000-es váltószámok',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a területmértékegységek szomszédos váltószáma (pl. dm² és cm² között)?',
        options: ['100', '10', '1000', '60'],
        correctAnswer: '100',
        hint: 'Mivel 1 dm = 10 cm, a terület 10 · 10-szerese.',
        explanation: 'A terület két dimenziós (hosszúság × szélesség), így a váltószám 10 · 10 = 100.'
      },
      {
        id: 'q1-2',
        prompt: 'Hány cm² egy 1 dm² területű négyzet?',
        options: ['100 cm²', '10 cm²', '1000 cm²', '10 000 cm²'],
        correctAnswer: '100 cm²',
        hint: '1 dm = 10 cm, így 10 cm · 10 cm.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="25" y="10" width="70" height="55" fill="none" className="stroke-cyan-600 stroke-2" />
            <line x1="25" y1="37" x2="95" y2="37" className="stroke-cyan-300 stroke-[0.5]" />
            <line x1="60" y1="10" x2="60" y2="65" className="stroke-cyan-300 stroke-[0.5]" />
            <text x="60" y="42" textAnchor="middle" className="text-[10px] font-black fill-cyan-800">1 dm² = 100 cm²</text>
          </svg>
        ),
        explanation: '1 dm² = 1 dm · 1 dm = 10 cm · 10 cm = 100 cm².'
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a térfogatmértékegységek szomszédos váltószáma (pl. dm³ és cm³ között)?',
        options: ['1000', '100', '10', '10 000'],
        correctAnswer: '1000',
        hint: 'A térfogat három dimenziós: 10 · 10 · 10.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <path d="M 35,18 L 60,10 L 85,18 L 60,26 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <path d="M 35,18 L 35,52 L 60,60 L 60,26 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <path d="M 60,26 L 60,60 L 85,52 L 85,18 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <text x="60" y="44" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">1000 db kiskocka</text>
          </svg>
        ),
        explanation: 'A térfogatnál három irányban történik a 10-szeres nyúlás: 10 · 10 · 10 = 1000.'
      },
      {
        id: 'q1-4',
        prompt: '1 dm³ folyadéktérfogat pontosan hány liternek felel meg?',
        options: ['1 liter', '10 liter', '0,1 liter', '100 liter'],
        correctAnswer: '1 liter',
        hint: 'Gondolj a standard tejesdoboz méretére!',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="42" y="15" width="36" height="48" rx="4" fill="none" className="stroke-blue-600 stroke-2" />
            <text x="60" y="44" textAnchor="middle" className="text-[10px] font-black fill-blue-700">1 dm³ = 1 l</text>
          </svg>
        ),
        explanation: 'A liter definíció szerint pontosan 1 köbdeciméter: 1 dm³ = 1 liter.'
      },
      {
        id: 'q1-5',
        prompt: 'Hány négyzetméter (m²) területe 1 ár (a)?',
        options: ['100 m²', '10 m²', '1000 m²', '10 000 m²'],
        correctAnswer: '100 m²',
        hint: 'Egy 10 m × 10 m-es kert területe.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="30" y="12" width="60" height="50" fill="none" className="stroke-emerald-600 stroke-2" />
            <text x="60" y="35" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">10 m × 10 m</text>
            <text x="60" y="48" textAnchor="middle" className="text-[9px] font-black fill-emerald-700">1 ár = 100 m²</text>
          </svg>
        ),
        explanation: '1 ár = 100 m² (egy 10 méter oldalú négyzet területe).'
      },
      {
        id: 'q1-6',
        prompt: 'Hány négyzetméter 1 hektár (ha)?',
        options: ['10 000 m²', '1000 m²', '100 m²', '100 000 m²'],
        correctAnswer: '10 000 m²',
        hint: '1 hektár = 100 ár = 100 m × 100 m.',
        explanation: '1 ha = 100 a = 100 · 100 m² = 10 000 m².'
      },
      {
        id: 'q1-7',
        prompt: 'Hány milliliter (ml) felel meg 1 cm³-nek?',
        options: ['1 ml', '10 ml', '0,1 ml', '100 ml'],
        correctAnswer: '1 ml',
        hint: 'Gondolj egy orvosi fecskendőre vagy kockacukorra!',
        explanation: '1 cm³ = 1 ml (egy ezred liter).'
      },
      {
        id: 'q1-8',
        prompt: 'Hány liter víz fér el 1 m³ térfogatban?',
        options: ['1000 liter', '100 liter', '10 liter', '10 000 liter'],
        correctAnswer: '1000 liter',
        hint: '1 m³ = 1000 dm³, és 1 dm³ = 1 l.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="30" y="12" width="60" height="50" rx="4" fill="none" className="stroke-indigo-600 stroke-2" />
            <text x="60" y="42" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">1 m³ = 1000 l</text>
          </svg>
        ),
        explanation: '1 m³ = 1000 dm³ = 1000 liter (azaz 10 hektoliter).'
      },
      {
        id: 'q1-9',
        prompt: 'Hány hektár egy 1 km² területű falu határa?',
        options: ['100 ha', '10 ha', '1000 ha', '10 000 ha'],
        correctAnswer: '100 ha',
        hint: '1 km² = 1 000 000 m², ezt oszd el 10 000-rel!',
        explanation: '1 km² = 100 hektár (1 000 000 m² : 10 000 = 100).'
      },
      {
        id: 'q1-10',
        prompt: 'Hány deciliter (dl) folyadék tesz ki 1 litert?',
        options: ['10 dl', '100 dl', '1000 dl', '1 dl'],
        correctAnswer: '10 dl',
        hint: 'A deci- előtag tizedrészt jelent.',
        explanation: '1 liter = 10 deciliter (dl) = 100 centiliter (cl) = 1000 milliliter (ml).'
      }
    ]
  },

  // 2. SZINT: HALADÓ (Számítások, tizedesjegyek, ár-hektár)
  2: {
    title: '2. Szint: Átváltások és Mezőgazdasági Egységek',
    description: 'Több lépéses átváltások, tizedesjegyek eltolása, hektár és liter összefüggések',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hány cm² területe van 4 m² padlónak?',
        options: ['40 000 cm²', '400 cm²', '4000 cm²', '400 000 cm²'],
        correctAnswer: '40 000 cm²',
        hint: '1 m² = 100 dm² = 10 000 cm².',
        explanation: '1 m² = 10 000 cm², ezért 4 m² = 4 · 10 000 = 40 000 cm².'
      },
      {
        id: 'q2-2',
        prompt: 'Egy szántóföld 3,5 hektár. Hány négyzetméter a területe?',
        options: ['35 000 m²', '3500 m²', '350 000 m²', '350 m²'],
        correctAnswer: '35 000 m²',
        hint: '1 ha = 10 000 m². Szorozd meg 3,5-tel!',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="20" y="12" width="80" height="50" fill="none" className="stroke-emerald-600 stroke-2" />
            <text x="60" y="42" textAnchor="middle" className="text-[10px] font-black fill-emerald-800">3,5 ha = 35 000 m²</text>
          </svg>
        ),
        explanation: '3,5 ha = 3,5 · 10 000 m² = 35 000 m².'
      },
      {
        id: 'q2-3',
        prompt: 'Hány dm³ térfogatú egy 2500 cm³-es edény?',
        options: ['2,5 dm³', '25 dm³', '0,25 dm³', '250 dm³'],
        correctAnswer: '2,5 dm³',
        hint: 'cm³-ből dm³-be váltva osztunk 1000-rel.',
        explanation: '2500 cm³ = 2500 : 1000 = 2,5 dm³ (ami pontosan 2,5 liter).'
      },
      {
        id: 'q2-4',
        prompt: 'Hány hektoliter (hl) víz van egy 5 m³-es kerti medencében?',
        options: ['50 hl', '5 hl', '500 hl', '0,5 hl'],
        correctAnswer: '50 hl',
        hint: '1 m³ = 1000 l = 10 hl.',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="25" y="15" width="70" height="45" rx="5" fill="none" className="stroke-blue-600 stroke-2" />
            <text x="60" y="42" textAnchor="middle" className="text-[10px] font-black fill-blue-700">5 m³ = 50 hl (5000 l)</text>
          </svg>
        ),
        explanation: '5 m³ = 5000 liter. Mivel 1 hl = 100 liter, így 5000 : 100 = 50 hl.'
      },
      {
        id: 'q2-5',
        prompt: 'Egy építési telek területe 800 m². Hány ár ez a terület?',
        options: ['8 ár', '80 ár', '0,8 ár', '800 ár'],
        correctAnswer: '8 ár',
        hint: '1 ár = 100 m².',
        explanation: '800 m² : 100 = 8 ár.'
      },
      {
        id: 'q2-6',
        prompt: 'Hány dm²-nek felel meg 0,45 m² felület?',
        options: ['45 dm²', '4,5 dm²', '450 dm²', '0,045 dm²'],
        correctAnswer: '45 dm²',
        hint: 'Szorozd meg 100-zal (tolj két hellyel jobbra a vesszőt)!',
        explanation: '0,45 m² · 100 = 45 dm².'
      },
      {
        id: 'q2-7',
        prompt: 'Hány literes egy 7500 cm³ űrtartalmú fazék?',
        options: ['7,5 liter', '75 liter', '0,75 liter', '750 liter'],
        correctAnswer: '7,5 liter',
        hint: '1 liter = 1 dm³ = 1000 cm³.',
        explanation: '7500 cm³ = 7,5 dm³ = 7,5 liter.'
      },
      {
        id: 'q2-8',
        prompt: '0,06 m³ átváltva literbe:',
        options: ['60 liter', '6 liter', '600 liter', '0,6 liter'],
        correctAnswer: '60 liter',
        hint: '1 m³ = 1000 liter. Szorozd meg 1000-rel!',
        explanation: '0,06 m³ · 1000 = 60 dm³ = 60 liter.'
      },
      {
        id: 'q2-9',
        prompt: 'Hány hektár egy 400 ár nagyságú gyümölcsös?',
        options: ['4 ha', '40 ha', '0,4 ha', '400 ha'],
        correctAnswer: '4 ha',
        hint: '1 ha = 100 a.',
        explanation: '400 ár : 100 = 4 hektár.'
      },
      {
        id: 'q2-10',
        prompt: '62 000 mm² átváltva dm²-be:',
        options: ['6,2 dm²', '62 dm²', '0,62 dm²', '620 dm²'],
        correctAnswer: '6,2 dm²',
        hint: 'mm²-ből cm²-be: :100, onnan dm²-be: :100. Összesen :10 000.',
        explanation: '62 000 mm² = 620 cm² = 6,2 dm².'
      }
    ]
  },

  // 3. SZINT: MESTER (Összetett gyakorlati és szöveges feladatok)
  3: {
    title: '3. Szint: Gyakorlati és Szöveges Mértékegység Feladatok',
    description: 'Medencék, telekméretek, térfogatszámítás és több mértékegységes feladatok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy kerti medence téglatest alakú: hossza 5 m, szélessége 4 m, mélysége 1,5 m. Hány liter víz kell a feltöltéséhez?',
        options: ['30 000 liter', '3000 liter', '300 000 liter', '15 000 liter'],
        correctAnswer: '30 000 liter',
        hint: 'V = a · b · c köbméterben, majd váltsd át literbe!',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="25" y="15" width="70" height="45" rx="4" fill="none" className="stroke-cyan-600 stroke-2" />
            <text x="60" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">5m × 4m × 1,5m = 30 m³</text>
            <text x="60" y="50" textAnchor="middle" className="text-[9px] font-black fill-cyan-700">30 000 liter</text>
          </svg>
        ),
        explanation: 'V = 5 m · 4 m · 1,5 m = 30 m³. Mivel 1 m³ = 1000 liter, így 30 · 1000 = 30 000 liter víz szükséges.'
      },
      {
        id: 'q3-2',
        prompt: 'Egy 1,2 hektáros telket 10 egyenlő parcellára osztanak fel. Hány ár egy-egy parcella?',
        options: ['12 ár', '1,2 ár', '120 ár', '6 ár'],
        correctAnswer: '12 ár',
        hint: '1,2 ha = 120 ár. Oszd el 10-zel!',
        explanation: '1,2 ha = 120 ár. 10 parcellára osztva: 120 : 10 = 12 ár parcellánként (1200 m²).'
      },
      {
        id: 'q3-3',
        prompt: 'Egy teherautó platójának térfogata 12 m³. Hány darab 40 dm³-es doboz fér el rajta elméletileg?',
        options: ['300 db', '30 db', '3000 db', '120 db'],
        correctAnswer: '300 db',
        hint: '12 m³ = 12 000 dm³. Oszd el 40-nel!',
        explanation: '12 m³ = 12 000 dm³. A dobozok száma: 12 000 : 40 = 300 darab.'
      },
      {
        id: 'q3-4',
        prompt: 'Hány deciliter (dl) víz fér egy olyan kockába, amelynek éle 2 dm?',
        options: ['80 dl', '8 dl', '800 dl', '20 dl'],
        correctAnswer: '80 dl',
        hint: 'V = a³ = 2 · 2 · 2 = 8 dm³ = 8 liter. 8 liter hány dl?',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <path d="M 35,16 L 60,8 L 85,16 L 60,24 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <path d="M 35,16 L 35,50 L 60,58 L 60,24 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <path d="M 60,24 L 60,58 L 85,50 L 85,16 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <text x="60" y="44" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">8 dm³ = 80 dl</text>
          </svg>
        ),
        explanation: 'V = 2 dm · 2 dm · 2 dm = 8 dm³ = 8 liter. 8 liter = 80 dl.'
      },
      {
        id: 'q3-5',
        prompt: 'Egy orvosi infúziós tasak 500 ml folyadékot tartalmaz. Hány dm³ ez a mennyiség?',
        options: ['0,5 dm³', '5 dm³', '0,05 dm³', '50 dm³'],
        correctAnswer: '0,5 dm³',
        hint: '500 ml = 0,5 liter = 0,5 dm³.',
        explanation: '500 ml = 0,5 liter. Mivel 1 liter = 1 dm³, így pontosan 0,5 dm³.'
      },
      {
        id: 'q3-6',
        prompt: 'Melyik terület a legnagyobb az alábbiak közül?',
        options: ['0,2 ha', '15 ár', '1800 m²', '150 000 dm²'],
        correctAnswer: '0,2 ha',
        hint: 'Váltsd mindet m²-be! 0,2 ha = 2000 m², 15 a = 1500 m², 150 000 dm² = 1500 m².',
        explanation: '0,2 ha = 2000 m². A többi: 15 a = 1500 m², 1800 m², 150 000 dm² = 1500 m². Tehát a 0,2 ha (2000 m²) a legnagyobb.'
      },
      {
        id: 'q3-7',
        prompt: 'Egy akvárium belső méretei: 60 cm × 40 cm × 50 cm. Hány liter víz fér bele maximálisan?',
        options: ['120 liter', '12 liter', '1200 liter', '240 liter'],
        correctAnswer: '120 liter',
        hint: 'Váltsd át deciméterbe: 6 dm × 4 dm × 5 dm!',
        figure: (
          <svg viewBox="0 0 120 75" className="w-28 h-16">
            <rect x="25" y="15" width="70" height="45" rx="3" fill="none" className="stroke-sky-600 stroke-2" />
            <text x="60" y="42" textAnchor="middle" className="text-[10px] font-black fill-sky-700">6dm × 4dm × 5dm = 120 l</text>
          </svg>
        ),
        explanation: 'Kényelmesebb dm-ben számolni: 6 dm · 4 dm · 5 dm = 120 dm³ = 120 liter.'
      },
      {
        id: 'q3-8',
        prompt: 'Egy szántóföld 800 m hosszú és 50 m széles. Hány hektár a területe?',
        options: ['4 hektár', '40 hektár', '0,4 hektár', '400 hektár'],
        correctAnswer: '4 hektár',
        hint: 'Terület = 800 · 50 = 40 000 m². 1 ha = 10 000 m².',
        explanation: 'T = 800 m · 50 m = 40 000 m². Hektárba váltva: 40 000 : 10 000 = 4 hektár.'
      },
      {
        id: 'q3-9',
        prompt: 'Egy csöpögő csapból percenként 50 cm³ víz folyik el. Hány liter víz vész kárba 1 óra (60 perc) alatt?',
        options: ['3 liter', '30 liter', '0,3 liter', '300 liter'],
        correctAnswer: '3 liter',
        hint: '60 · 50 = 3000 cm³. Váltsd át literbe!',
        explanation: '60 perc · 50 cm³ = 3000 cm³ = 3 dm³ = 3 liter víz.'
      },
      {
        id: 'q3-10',
        prompt: 'Hány darab 2,5 dl-es pohár tölthető meg egy 5 literes kancsóból?',
        options: ['20 db', '25 db', '15 db', '10 db'],
        correctAnswer: '20 db',
        hint: '5 liter = 50 dl. 50 : 2,5 = ?',
        explanation: '5 liter = 50 dl. 50 dl : 2,5 dl = 20 darab pohár tölthető meg.'
      }
    ]
  }
};

export const AreaVolumeUnitsQuiz: React.FC<AreaVolumeUnitsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-units"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 4. LECKE"
      title="4. Terület és Térfogat Mértékegységek Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: terület- és térfogat-átváltások, ár, hektár és űrmérték-kapcsolatok"
      cheatSheetTitle="Mértékegység Átváltások Puskakártyák"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <AreaVolumeUnitsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <AreaVolumeUnitsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default AreaVolumeUnitsQuiz;
