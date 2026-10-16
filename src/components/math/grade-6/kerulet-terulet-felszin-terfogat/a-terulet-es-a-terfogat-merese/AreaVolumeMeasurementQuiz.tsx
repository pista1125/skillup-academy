import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { AreaVolumeMeasurementMatcher } from './AreaVolumeMeasurementMatcher';
import { AreaVolumeMeasurementSorter } from './AreaVolumeMeasurementSorter';

interface AreaVolumeMeasurementQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-area',
    title: '1. Területmértékek (100-as váltószám)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><span className="font-bold">Alapmértékegység:</span> négyzetméter (m²)</div>
        <div>1 km² = 100 ha = 1 000 000 m²</div>
        <div>1 ha (hektár) = 100 a (ár) = 10 000 m²</div>
        <div>1 a (ár) = 100 m²</div>
        <div>1 m² = 100 dm² = 10 000 cm² = 1 000 000 mm²</div>
        <div>1 dm² = 100 cm² • 1 cm² = 100 mm²</div>
      </div>
    )
  },
  {
    id: 'cs-volume',
    title: '2. Térfogatmértékek (1000-es váltószám)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><span className="font-bold">Alapmértékegység:</span> köbméter (m³)</div>
        <div>1 m³ = 1000 dm³ = 1 000 000 cm³</div>
        <div>1 dm³ = 1000 cm³ = 1 000 000 mm³</div>
        <div>1 cm³ = 1000 mm³</div>
      </div>
    )
  },
  {
    id: 'cs-capacity',
    title: '3. Űrmérték és Térfogat (Aranyhíd)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div className="font-semibold text-teal-600 dark:text-teal-400">1 dm³ = 1 liter (l)</div>
        <div className="font-semibold text-teal-600 dark:text-teal-400">1 cm³ = 1 milliliter (ml)</div>
        <div>1 m³ = 1000 liter = 10 hektoliter (hl)</div>
        <div>1 hl = 100 liter = 100 dm³</div>
        <div>1 liter = 10 dl = 100 cl = 1000 ml</div>
      </div>
    )
  },
  {
    id: 'cs-conversion-rule',
    title: '4. Átváltási aranyszabály',
    content: (
      <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
        <div><span className="font-bold text-emerald-600 dark:text-emerald-400">Nagyobbról kisebbre:</span> SZORZUNK a váltószámmal (pl. 2 m² = 2 · 100 = 200 dm²)</div>
        <div><span className="font-bold text-amber-600 dark:text-amber-400">Kisebbről nagyobbra:</span> OSZTUNK a váltószámmal (pl. 500 dm³ = 500 : 1000 = 0,5 m³)</div>
      </div>
    )
  }
];

const questions: Question[] = [
  // ==========================================
  // 1. SZINT: KEZDŐ (10 KÉRDÉS - ALAPOK)
  // ==========================================
  {
    id: 'av-q1',
    level: 1,
    question: 'Hány négyzetcentiméter (cm²) van 1 dm²-ben?',
    options: ['10 cm²', '100 cm²', '1000 cm²', '50 cm²'],
    correctAnswer: '100 cm²',
    explanation: 'A területnél a váltószám 100, mert 1 dm = 10 cm, így 1 dm² = 10 cm · 10 cm = 100 cm².'
  },
  {
    id: 'av-q2',
    level: 1,
    question: 'Hány négyzetdeciméter (dm²) van 1 m²-ben?',
    options: ['10 dm²', '100 dm²', '1000 dm²', '10 000 dm²'],
    correctAnswer: '100 dm²',
    explanation: '1 m = 10 dm, ezért a terület váltószáma 10 · 10 = 100: 1 m² = 100 dm².'
  },
  {
    id: 'av-q3',
    level: 1,
    question: 'Mekkora 1 dm³ térfogat űrtartalomban kifejezve?',
    options: ['1 liter', '10 liter', '1 dl', '100 liter'],
    correctAnswer: '1 liter',
    explanation: 'Az aranyhíd szabály szerint pontosan 1 dm³ = 1 liter (l).'
  },
  {
    id: 'av-q4',
    level: 1,
    question: 'Hány köbcentiméter (cm³) van 1 dm³-ben?',
    options: ['10 cm³', '100 cm³', '1000 cm³', '10 000 cm³'],
    correctAnswer: '1000 cm³',
    explanation: 'A térfogat váltószáma 1000, mivel 1 dm = 10 cm, így 10 · 10 · 10 = 1000 cm³.'
  },
  {
    id: 'av-q5',
    level: 1,
    question: 'Hány négyzetmilliméter (mm²) van 1 cm²-ben?',
    options: ['10 mm²', '100 mm²', '1000 mm²', '10 000 mm²'],
    correctAnswer: '100 mm²',
    explanation: '1 cm = 10 mm, így 1 cm² = 10 mm · 10 mm = 100 mm².'
  },
  {
    id: 'av-q6',
    level: 1,
    question: 'Hány milliliter (ml) felel meg 1 köbcentiméternek (1 cm³)?',
    options: ['1 ml', '10 ml', '100 ml', '0,1 ml'],
    correctAnswer: '1 ml',
    explanation: 'Mivel 1 dm³ = 1000 cm³ és 1 liter = 1000 ml, ezért 1 cm³ = 1 ml.'
  },
  {
    id: 'av-q7',
    level: 1,
    question: 'Hány deciliter (dl) van 1 literben?',
    options: ['10 dl', '100 dl', '1000 dl', '2 dl'],
    correctAnswer: '10 dl',
    explanation: '1 liter = 10 deciliter (dl).'
  },
  {
    id: 'av-q8',
    level: 1,
    question: 'Hány négyzetméter egy 1 ár (a) területű kert?',
    options: ['10 m²', '100 m²', '1000 m²', '10 000 m²'],
    correctAnswer: '100 m²',
    explanation: '1 ár (a) a mezőgazdasági területmérésben pontosan 100 m² (például egy 10 m × 10 m-es négyzet).'
  },
  {
    id: 'av-q9',
    level: 1,
    question: 'Hány liter fér el egy 1 hektoliteres (1 hl) hordóban?',
    options: ['10 liter', '50 liter', '100 liter', '1000 liter'],
    correctAnswer: '100 liter',
    explanation: 'A hekto- előtag százszorost jelent, ezért 1 hektoliter = 100 liter.'
  },
  {
    id: 'av-q10',
    level: 1,
    question: 'Mekkora a váltószám a szomszédos térfogatmértékek (m³, dm³, cm³, mm³) között?',
    options: ['10', '100', '1000', '10 000'],
    correctAnswer: '1000',
    explanation: 'Mivel a térfogat háromdimenziós, az élhosszúság 10-es szorzója háromszor jelenik meg: 10 · 10 · 10 = 1000.'
  },

  // ==========================================
  // 2. SZINT: GYAKORLÓ (10 KÉRDÉS - KÖZEPES)
  // ==========================================
  {
    id: 'av-q11',
    level: 2,
    question: 'Hány négyzetcentiméter (cm²) van 1 m²-ben?',
    options: ['100 cm²', '1000 cm²', '10 000 cm²', '1 000 000 cm²'],
    correctAnswer: '10 000 cm²',
    explanation: '1 m² = 100 dm² = 100 · 100 cm² = 10 000 cm².'
  },
  {
    id: 'av-q12',
    level: 2,
    question: 'Hány négyzetméter pontosan 1 hektár (ha)?',
    options: ['100 m²', '1000 m²', '10 000 m²', '100 000 m²'],
    correctAnswer: '10 000 m²',
    explanation: '1 ha = 100 ár, és 1 ár = 100 m², így 100 · 100 = 10 000 m².'
  },
  {
    id: 'av-q13',
    level: 2,
    question: 'Hány liter víz fér bele egy 1 m³-es tartályba?',
    options: ['10 liter', '100 liter', '1000 liter', '10 000 liter'],
    correctAnswer: '1000 liter',
    explanation: '1 m³ = 1000 dm³, és 1 dm³ = 1 liter, tehát 1 m³ = 1000 liter.'
  },
  {
    id: 'av-q14',
    level: 2,
    question: 'Váltsd át: 2,5 m² = ? dm²',
    options: ['25 dm²', '250 dm²', '2500 dm²', '25 000 dm²'],
    correctAnswer: '250 dm²',
    explanation: 'Nagyobb egységről kisebbre váltunk, ezért szorzunk 100-zal: 2,5 · 100 = 250 dm².'
  },
  {
    id: 'av-q15',
    level: 2,
    question: 'Váltsd át: 450 cm² = ? dm²',
    options: ['4,5 dm²', '45 dm²', '0,45 dm²', '4500 dm²'],
    correctAnswer: '4,5 dm²',
    explanation: 'Kisebb egységről nagyobbra váltunk, ezért osztunk 100-zal: 450 : 100 = 4,5 dm².'
  },
  {
    id: 'av-q16',
    level: 2,
    question: 'Hány hektoliter (hl) van 1 m³-ben?',
    options: ['1 hl', '10 hl', '100 hl', '1000 hl'],
    correctAnswer: '10 hl',
    explanation: '1 m³ = 1000 liter, és 1 hl = 100 liter. 1000 : 100 = 10 hl.'
  },
  {
    id: 'av-q17',
    level: 2,
    question: 'Váltsd át: 0,4 m³ = ? dm³',
    options: ['4 dm³', '40 dm³', '400 dm³', '4000 dm³'],
    correctAnswer: '400 dm³',
    explanation: 'A térfogat váltószáma 1000, így 0,4 · 1000 = 400 dm³ (ami 400 liter víz).'
  },
  {
    id: 'av-q18',
    level: 2,
    question: 'Hány hektár (ha) egy 1 km² területű birtok?',
    options: ['10 ha', '100 ha', '1000 ha', '10 000 ha'],
    correctAnswer: '100 ha',
    explanation: '1 km² = 1 000 000 m², és 1 ha = 10 000 m². 1 000 000 : 10 000 = 100 ha.'
  },
  {
    id: 'av-q19',
    level: 2,
    question: 'Egy 750 milliliteres kulacs hány köbcentiméter (cm³)?',
    options: ['75 cm³', '750 cm³', '7,5 cm³', '7500 cm³'],
    correctAnswer: '750 cm³',
    explanation: 'Mivel 1 ml = 1 cm³, ezért 750 ml pontosan 750 cm³.'
  },
  {
    id: 'av-q20',
    level: 2,
    question: 'Váltsd át: 3 ha = ? m²',
    options: ['300 m²', '3000 m²', '30 000 m²', '300 000 m²'],
    correctAnswer: '30 000 m²',
    explanation: '1 ha = 10 000 m², ezért 3 ha = 3 · 10 000 = 30 000 m².'
  },

  // ==========================================
  // 3. SZINT: MESTER (10 KÉRDÉS - ÖSSZETETT)
  // ==========================================
  {
    id: 'av-q21',
    level: 3,
    question: 'Egy akvárium belső méretei: 50 cm hosszú, 30 cm széles és 40 cm magas. Hány liter víz fér bele?',
    options: ['6 liter', '60 liter', '600 liter', '6000 liter'],
    correctAnswer: '60 liter',
    explanation: 'Deciméterben számolva: 5 dm · 3 dm · 4 dm = 60 dm³. Mivel 1 dm³ = 1 liter, így pontosan 60 liter.'
  },
  {
    id: 'av-q22',
    level: 3,
    question: 'Egy szoba területe 18 m². Hány darab 10 dm² területű járólap fedi le pontosan?',
    options: ['18 darab', '180 darab', '1800 darab', '90 darab'],
    correctAnswer: '180 darab',
    explanation: '18 m² = 1800 dm². 1800 : 10 = 180 darab járólap szükséges.'
  },
  {
    id: 'av-q23',
    level: 3,
    question: 'Egy 3000 literes medencét 5 hektoliteres hordókkal töltünk. Hány teli hordó vízre van szükség?',
    options: ['6 darab', '15 darab', '30 darab', '60 darab'],
    correctAnswer: '6 darab',
    explanation: '5 hl = 500 liter. 3000 : 500 = 6 darab hordó.'
  },
  {
    id: 'av-q24',
    level: 3,
    question: 'Hány ár (a) területű egy 2500 m²-es konyhakert?',
    options: ['2,5 a', '25 a', '250 a', '0,25 a'],
    correctAnswer: '25 a',
    explanation: '1 ár = 100 m². Ezért 2500 : 100 = 25 ár.'
  },
  {
    id: 'av-q25',
    level: 3,
    question: 'Melyik a nagyobb: 0,05 m³ vagy 45 liter?',
    options: ['0,05 m³ a nagyobb', '45 liter a nagyobb', 'Pontosan egyenlők', 'Nem összehasonlíthatók'],
    correctAnswer: '0,05 m³ a nagyobb',
    explanation: '0,05 m³ = 0,05 · 1000 dm³ = 50 dm³ = 50 liter. 50 liter > 45 liter.'
  },
  {
    id: 'av-q26',
    level: 3,
    question: 'Egy 2 dl-es pohárba hány cm³ víz fér?',
    options: ['20 cm³', '200 cm³', '2000 cm³', '2 cm³'],
    correctAnswer: '200 cm³',
    explanation: '2 dl = 200 ml. Mivel 1 ml = 1 cm³, ezért 200 cm³.'
  },
  {
    id: 'av-q27',
    level: 3,
    question: 'Mennyi a különbség: 1 m² - 35 dm² = ?',
    options: ['65 dm²', '965 dm²', '65 cm²', '6,5 dm²'],
    correctAnswer: '65 dm²',
    explanation: '1 m² = 100 dm². 100 dm² - 35 dm² = 65 dm².'
  },
  {
    id: 'av-q28',
    level: 3,
    question: 'Egy gazdálkodó 0,35 hektáros földjéből 1200 m²-t bevetett. Hány m² maradt szabadon?',
    options: ['2300 m²', '1500 m²', '3380 m²', '230 m²'],
    correctAnswer: '2300 m²',
    explanation: '0,35 ha = 0,35 · 10 000 = 3500 m². 3500 - 1200 = 2300 m² maradt.'
  },
  {
    id: 'av-q29',
    level: 3,
    question: 'Egy tartályból kifolyt 150 dm³ víz. Hány hektoliter (hl) víz veszett el?',
    options: ['15 hl', '1,5 hl', '0,15 hl', '150 hl'],
    correctAnswer: '1,5 hl',
    explanation: '150 dm³ = 150 liter. Mivel 1 hl = 100 liter, ezért 150 : 100 = 1,5 hl.'
  },
  {
    id: 'av-q30',
    level: 3,
    question: 'Melyik állítás IGAZ az alábbiak közül?',
    options: [
      '1 m² = 10 000 cm²',
      '1 liter víz térfogata 1 m³',
      '1 hektár pontosan 100 m²',
      '1 cm³ = 10 mm³'
    ],
    correctAnswer: '1 m² = 10 000 cm²',
    explanation: '1 m² = 100 dm² = 10 000 cm² az egyetlen helyes állítás (1 l = 1 dm³, 1 ha = 10 000 m², 1 cm³ = 1000 mm³).'
  }
];

export const AreaVolumeMeasurementQuiz: React.FC<AreaVolumeMeasurementQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A terület és a térfogat mérése kvíz"
      subtitle="Gyakorold a 100-as és 1000-es váltószámokat, űrtartalmat és szöveges feladatokat 3 szinten!"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="indigo"
      topicId="g6-area-volume-measurement-quiz"
      topicTitle="A terület és a térfogat mérése"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={AreaVolumeMeasurementMatcher as any}
      sorterComponent={AreaVolumeMeasurementSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default AreaVolumeMeasurementQuiz;
