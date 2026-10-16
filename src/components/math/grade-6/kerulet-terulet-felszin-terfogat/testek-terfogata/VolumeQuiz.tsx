import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { VolumeMatcher } from './VolumeMatcher';
import { VolumeSorter } from './VolumeSorter';

interface VolumeQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-cube-volume',
    title: '1. Kocka Térfogata',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> V = a · a · a = a³</div>
        <div><strong>Élhossz visszaszámolása:</strong> a = ∛V</div>
        <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
          Példa: a = 4 cm → V = 4³ = 64 cm³
        </div>
      </div>
    )
  },
  {
    id: 'cs-cuboid-volume',
    title: '2. Téglatest Térfogata',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> V = a · b · c = T_alap · m</div>
        <div><strong>Magasság visszaszámolása:</strong> m = V / (a · b)</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Példa: 2 × 3 × 4 cm → V = 2 · 3 · 4 = 24 cm³
        </div>
      </div>
    )
  },
  {
    id: 'cs-capacity-litres',
    title: '3. Űrtartalom & Literek',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Alapszabály:</strong> 1 dm³ = 1 liter</div>
        <div><strong>Átváltások:</strong> 1 m³ = 1000 liter, 1 cm³ = 1 ml = 0,001 liter</div>
        <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
          cm-ből dm-re váltva: dm-ben számolt térfogat azonnal liter!
        </div>
      </div>
    )
  },
  {
    id: 'cs-scaling-tricks',
    title: '4. Skálázás és Bemerítés',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Él k-szorosra nő:</strong> Felület k²-szeres, Térfogat k³-szoros! (duplázáskor 8×).</div>
        <div><strong>Bemerített test térfogata:</strong> V_test = T_alap · Δm (vízszintemelkedés).</div>
        <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
          Kockák összeragasztásakor a térfogat összeadódik!
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // --- 1. SZINT: ALAPVETŐ KOCKA ÉS TÉGLATEST TÉRFOGAT (1-10) ---
  {
    id: 'q1',
    level: 1,
    question: 'Mi a kocka térfogatának (V) kiszámítási képlete, ha egy élének hossza a?',
    options: [
      'V = a³',
      'V = 6 · a²',
      'V = 12 · a',
      'V = a²'
    ],
    correctAnswer: 'V = a³',
    explanation: 'A kocka térfogata az él hosszának harmadik hatványa: V = a · a · a = a³.'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Mennyi az a = 3 cm élhosszúságú kocka térfogata?',
    options: [
      '27 cm³',
      '54 cm³',
      '9 cm³',
      '18 cm³'
    ],
    correctAnswer: '27 cm³',
    explanation: 'V = 3 · 3 · 3 = 27 cm³.'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Egy kocka éle 4 cm. Mekkora a térfogata?',
    options: [
      '64 cm³',
      '16 cm³',
      '96 cm³',
      '48 cm³'
    ],
    correctAnswer: '64 cm³',
    explanation: 'V = 4³ = 4 · 4 · 4 = 64 cm³.'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Mennyi az a = 5 cm élű kocka térfogata?',
    options: [
      '125 cm³',
      '150 cm³',
      '25 cm³',
      '75 cm³'
    ],
    correctAnswer: '125 cm³',
    explanation: 'V = 5 · 5 · 5 = 125 cm³.'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Mekkora az 1 cm élű egységkocka térfogata?',
    options: [
      '1 cm³',
      '6 cm³',
      '3 cm³',
      '12 cm³'
    ],
    correctAnswer: '1 cm³',
    explanation: 'V = 1 · 1 · 1 = 1 cm³.'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Hogyan számítjuk ki az a, b, c élhosszúságú téglatest térfogatát?',
    options: [
      'V = a · b · c',
      'V = 2 · (ab + bc + ac)',
      'V = 4 · (a + b + c)',
      'V = (a + b + c)³'
    ],
    correctAnswer: 'V = a · b · c',
    explanation: 'A téglatest térfogata a három különböző irányú élének szorzata: V = a · b · c = T_alap · m.'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Mekkora a 2 cm, 3 cm és 4 cm élű téglatest térfogata?',
    options: [
      '24 cm³',
      '52 cm³',
      '48 cm³',
      '18 cm³'
    ],
    correctAnswer: '24 cm³',
    explanation: 'V = 2 · 3 · 4 = 24 cm³.'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Egy téglatest élei 1 cm, 5 cm és 10 cm. Mekkora a térfogata?',
    options: [
      '50 cm³',
      '32 cm³',
      '25 cm³',
      '100 cm³'
    ],
    correctAnswer: '50 cm³',
    explanation: 'V = 1 · 5 · 10 = 50 cm³.'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Egy kocka éle 10 cm. Hány cm³ a térfogata?',
    options: [
      '1000 cm³',
      '600 cm³',
      '100 cm³',
      '300 cm³'
    ],
    correctAnswer: '1000 cm³',
    explanation: 'V = 10 · 10 · 10 = 1000 cm³ (ami 1 dm³).'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Melyik az alábbiak közül térfogat (és NEM terület vagy hosszúság) mértékegysége?',
    options: [
      'cm³',
      'cm²',
      'cm',
      'm²'
    ],
    correctAnswer: 'cm³',
    explanation: 'A cm³ (köbcentiméter) térfogat mértékegység, míg a cm² terület, a cm pedig hosszúság mértékegység.'
  },

  // --- 2. SZINT: ŰRTARTALOM, LITE REK ÉS ÉL VISSZASZÁMOLÁS (11-20) ---
  {
    id: 'q11',
    level: 2,
    question: 'Hány liter víz fér pontosan egy 1 dm élű kocka alakú edénybe?',
    options: [
      '1 liter',
      '10 liter',
      '0,1 liter',
      '100 liter'
    ],
    correctAnswer: '1 liter',
    explanation: 'A liter definíció szerint pontosan 1 dm³ folyadéknak felel meg: 1 dm³ = 1 liter.'
  },
  {
    id: 'q12',
    level: 2,
    question: 'Egy kocka élhossza a = 2 dm. Hány liter a térfogata?',
    options: [
      '8 liter',
      '4 liter',
      '6 liter',
      '16 liter'
    ],
    correctAnswer: '8 liter',
    explanation: 'V = 2³ = 8 dm³. Mivel 1 dm³ = 1 liter, így 8 liter.'
  },
  {
    id: 'q13',
    level: 2,
    question: 'Egy kocka térfogata 8 cm³. Milyen hosszú egy éle?',
    options: [
      '2 cm',
      '4 cm',
      '1 cm',
      '3 cm'
    ],
    correctAnswer: '2 cm',
    explanation: 'Mivel 2 · 2 · 2 = 8, ezért az élhossz a = 2 cm.'
  },
  {
    id: 'q14',
    level: 2,
    question: 'Mekkora annak a kockának az éle, amelynek térfogata 27 cm³?',
    options: [
      '3 cm',
      '9 cm',
      '6 cm',
      '4 cm'
    ],
    correctAnswer: '3 cm',
    explanation: 'Mivel 3³ = 27, az élhossz a = 3 cm.'
  },
  {
    id: 'q15',
    level: 2,
    question: 'Egy kocka térfogata 216 cm³. Hány centiméter az éle?',
    options: [
      '6 cm',
      '8 cm',
      '7 cm',
      '9 cm'
    ],
    correctAnswer: '6 cm',
    explanation: '6 · 6 · 6 = 216, így a = 6 cm.'
  },
  {
    id: 'q16',
    level: 2,
    question: 'Egy egyenes hasáb alapterülete T_alap = 20 cm², magassága m = 6 cm. Mekkora a térfogata?',
    options: [
      '120 cm³',
      '60 cm³',
      '80 cm³',
      '240 cm³'
    ],
    correctAnswer: '120 cm³',
    explanation: 'V = T_alap · m = 20 · 6 = 120 cm³.'
  },
  {
    id: 'q17',
    level: 2,
    question: 'Egy téglatest térfogata V = 60 cm³, két éle a = 3 cm és b = 4 cm. Milyen hosszú a harmadik éle (c)?',
    options: [
      '5 cm',
      '6 cm',
      '4 cm',
      '10 cm'
    ],
    correctAnswer: '5 cm',
    explanation: 'V = a · b · c → 60 = 3 · 4 · c → 60 = 12 · c → c = 60 : 12 = 5 cm.'
  },
  {
    id: 'q18',
    level: 2,
    question: 'Egy üvegakvárium méretei: 50 cm × 40 cm × 30 cm. Hány liter víz fér bele tele töltve?',
    options: [
      '60 liter',
      '600 liter',
      '6 liter',
      '120 liter'
    ],
    correctAnswer: '60 liter',
    explanation: 'Deciméterben: 5 dm × 4 dm × 3 dm = 60 dm³ = 60 liter.'
  },
  {
    id: 'q19',
    level: 2,
    question: 'Hány liter víz fér el egy 1 m³ térfogatú tartályban?',
    options: [
      '1000 liter',
      '100 liter',
      '10 000 liter',
      '10 liter'
    ],
    correctAnswer: '1000 liter',
    explanation: '1 m = 10 dm, így 1 m³ = 10 · 10 · 10 dm³ = 1000 dm³ = 1000 liter.'
  },
  {
    id: 'q20',
    level: 2,
    question: 'Melyik test térfogata nagyobb: egy a = 3 cm élű kockáé, vagy egy 2 × 3 × 4 cm-es téglatesté?',
    options: [
      'A kockáé (27 cm³ > 24 cm³)',
      'A téglatesté (24 cm³ > 27 cm³)',
      'Egyenlő a térfogatuk',
      'Nem dönthető el'
    ],
    correctAnswer: 'A kockáé (27 cm³ > 24 cm³)',
    explanation: 'Kocka: 3³ = 27 cm³. Téglatest: 2 · 3 · 4 = 24 cm³. Mivel 27 > 24, a kocka térfogata nagyobb.'
  },

  // --- 3. SZINT: SKÁLÁZÁSI HATÁSOK, ÖSSZETETT ÉS SZÖVEGES FELADVÁNYOK (21-30) ---
  {
    id: 'q21',
    level: 3,
    question: 'Hogyan változik meg a kocka térfogata, ha minden élét a kétszeresére növeljük?',
    options: [
      'A nyolcszorosára nő (2³ = 8)',
      'A kétszeresére nő',
      'A négyszeresére nő',
      'A hatszorosára nő'
    ],
    correctAnswer: 'A nyolcszorosára nő (2³ = 8)',
    explanation: 'Ha az él a-ról 2a-ra nő, az új térfogat (2a)³ = 8a³ lesz, tehát pontosan nyolcszorosára nő.'
  },
  {
    id: 'q22',
    level: 3,
    question: 'Hányszorosára növekszik a kocka térfogata, ha minden élét a háromszorosára növeljük?',
    options: [
      '27-szeresére (3³ = 27)',
      '9-szeresére',
      '3-szorosára',
      '6-szorosára'
    ],
    correctAnswer: '27-szeresére (3³ = 27)',
    explanation: '(3a)³ = 27a³, vagyis a térfogat 27-szeresére nő.'
  },
  {
    id: 'q23',
    level: 3,
    question: 'Egy 60 cm × 30 cm × 40 cm-es akvárium magasságának 3/4-éig van töltve vízzel. Hány liter víz van benne?',
    options: [
      '54 liter',
      '72 liter',
      '36 liter',
      '45 liter'
    ],
    correctAnswer: '54 liter',
    explanation: 'Teljes térfogat: 6 · 3 · 4 = 72 dm³ = 72 liter. Ennek 3/4 része: 72 · (3/4) = 54 liter.'
  },
  {
    id: 'q24',
    level: 3,
    question: 'Egy 4 m × 8 m-es, 1,5 m mély kerti medencébe hány liter víz fér?',
    options: [
      '48 000 liter',
      '4800 liter',
      '480 liter',
      '24 000 liter'
    ],
    correctAnswer: '48 000 liter',
    explanation: 'V = 4 · 8 · 1,5 = 48 m³. Mivel 1 m³ = 1000 liter, így 48 · 1000 = 48 000 liter.'
  },
  {
    id: 'q25',
    level: 3,
    question: 'A fenti 48 000 literes medencébe a kerti csap percenként 20 liter vizet ad. Hány óra alatt telik meg?',
    options: [
      '40 óra',
      '24 óra',
      '48 óra',
      '240 óra'
    ],
    correctAnswer: '40 óra',
    explanation: '48 000 : 20 = 2400 perc. Órában: 2400 : 60 = 40 óra.'
  },
  {
    id: 'q26',
    level: 3,
    question: 'Egy 20 cm × 10 cm alapterületű üvegedényben a vízszint 3 cm-rel megemelkedik, miután egy fémtestet merítünk bele. Mekkora a fémtest térfogata?',
    options: [
      '600 cm³',
      '200 cm³',
      '60 cm³',
      '300 cm³'
    ],
    correctAnswer: '600 cm³',
    explanation: 'V_test = T_alap · Δm = (20 · 10) · 3 = 200 · 3 = 600 cm³.'
  },
  {
    id: 'q27',
    level: 3,
    question: 'Két darab a = 3 cm élű tömör kockát összeragasztunk. Mekkora az összeragasztott test térfogata?',
    options: [
      '54 cm³',
      '27 cm³',
      '108 cm³',
      '90 cm³'
    ],
    correctAnswer: '54 cm³',
    explanation: 'A térfogat összeragasztáskor nem vész el: 1 kocka térfogata 3³ = 27 cm³, a két kocka együtt 2 · 27 = 54 cm³.'
  },
  {
    id: 'q28',
    level: 3,
    question: 'A víz fagyásakor a térfogata kb. 9%-kal nő. Mennyi jég keletkezik 1000 liter vízből?',
    options: [
      '1090 liter (1,09 m³)',
      '1009 liter',
      '1900 liter',
      '910 liter'
    ],
    correctAnswer: '1090 liter (1,09 m³)',
    explanation: '1000 · 1,09 = 1090 liter (1,09 m³). Ezért repeszti szét a jég a zárt edényeket.'
  },
  {
    id: 'q29',
    level: 3,
    question: 'Egy 500 literes víztartály alapja egy 1 m × 1 m-es négyzet. Milyen magas a tartály?',
    options: [
      '0,5 m (50 cm)',
      '1 m',
      '0,25 m',
      '5 m'
    ],
    correctAnswer: '0,5 m (50 cm)',
    explanation: '500 liter = 0,5 m³. Az alapterület 1 m². A magasság: m = V / T_alap = 0,5 / 1 = 0,5 m (50 cm).'
  },
  {
    id: 'q30',
    level: 3,
    question: 'Milyen élhosszúságú kockánál egyezik meg a térfogat mérőszáma (cm³-ben) és a teljes felszín mérőszáma (cm²-ben)?',
    options: [
      'a = 6 cm',
      'a = 1 cm',
      'a = 3 cm',
      'a = 12 cm'
    ],
    correctAnswer: 'a = 6 cm',
    explanation: 'a³ = 6a² → a = 6 cm. Valóban: V = 6³ = 216 cm³, és A = 6 · 6² = 216 cm²!'
  }
];

export const VolumeQuiz: React.FC<VolumeQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Testek térfogata kvíz"
      subtitle="Kocka, téglatest térfogatszámítása, egységkockák, űrtartalom, literek és folyadékok vizsgálata 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="teal"
      topicId="g6-volume-quiz"
      topicTitle="Testek térfogata"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={VolumeMatcher as any}
      sorterComponent={VolumeSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default VolumeQuiz;
