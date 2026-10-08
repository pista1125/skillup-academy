import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityReviewSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Melyik Szabály Alapján Osztható a Szám?',
    subtitle: 'Válogasd szét a számokat az ellenőrzésükhöz szükséges szabály típusa szerint!',
    categories: [
      {
        id: 'cat-last1',
        name: 'Utolsó számjegy alapján',
        description: 'Páros, 0-ra vagy 5-re végződő számok vizsgálata',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-digitsum',
        name: 'Számjegyösszeg alapján',
        description: 'A számjegyek összeadásával ellenőrizhető szabályok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-last2',
        name: 'Utolsó két számjegy alapján',
        description: 'A tízes és egyes helyiérték együttes vizsgálata',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '1 438 osztható 2-vel', category: 'cat-last1' },
      { id: 's1-2', label: '3 765 osztható 5-tel', category: 'cat-last1' },
      { id: 's1-3', label: '9 240 osztható 10-zel', category: 'cat-last1' },
      { id: 's1-4', label: '7 850 osztható 5-tel és 2-vel is', category: 'cat-last1' },
      { id: 's1-5', label: '5 241 osztható 3-mal', category: 'cat-digitsum' },
      { id: 's1-6', label: '8 532 osztható 9-cel', category: 'cat-digitsum' },
      { id: 's1-7', label: '4 107 osztható 3-mal', category: 'cat-digitsum' },
      { id: 's1-8', label: '2 889 osztható 9-cel', category: 'cat-digitsum' },
      { id: 's1-9', label: '4 524 osztható 4-gyel', category: 'cat-last2' },
      { id: 's1-10', label: '2 875 osztható 25-tel', category: 'cat-last2' },
      { id: 's1-11', label: '12 800 osztható 100-zal', category: 'cat-last2' },
      { id: 's1-12', label: '6 348 osztható 4-gyel', category: 'cat-last2' }
    ]
  },
  2: {
    title: '2. Szint: Oszthatósági Állítások Igazságértéke',
    subtitle: 'Döntsd el a matematikai állításokról, hogy mindig igazak, hibás tévhitek vagy csak speciális esetben teljesülnek!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig Igaz (Tétel)',
        description: 'Minden esetben érvényes matematikai alaptörvény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-always-false',
        name: 'Mindig Hamis (Csapda)',
        description: 'Téves elmélet vagy matematikai hiba',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak Bizonyos Esetekben Igaz',
        description: 'Nem általános szabály, de létezik olyan szám, amire teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Az 1 minden egész számnak osztója', category: 'cat-always-true' },
      { id: 's2-2', label: 'Ha 9 | a, akkor 3 | a is igaz', category: 'cat-always-true' },
      { id: 's2-3', label: 'Ha c | a és c | b, akkor c | (a + b)', category: 'cat-always-true' },
      { id: 's2-4', label: 'Három egymást követő szám összege osztható 3-mal', category: 'cat-always-true' },
      { id: 's2-5', label: 'A 0-val minden számot el lehet osztani', category: 'cat-always-false' },
      { id: 's2-6', label: 'Ha egy szám páros, akkor osztható 4-gyel is', category: 'cat-always-false' },
      { id: 's2-7', label: 'Ha egy szám 5-re végződik, akkor páros', category: 'cat-always-false' },
      { id: 's2-8', label: 'Ha c ∤ a és c ∤ b, akkor az összeg sosem osztható c-vel', category: 'cat-always-false' },
      { id: 's2-9', label: 'Ha egy szám osztható 3-mal, akkor 9-cel is', category: 'cat-conditional' },
      { id: 's2-10', label: 'Két páratlan szám összege osztható 4-gyel', category: 'cat-conditional' },
      { id: 's2-11', label: 'Egy 5-tel osztható szám osztható 10-zel is', category: 'cat-conditional' },
      { id: 's2-12', label: 'Két nem 3-mal osztható szám összege osztható 3-mal', category: 'cat-conditional' }
    ]
  },
  3: {
    title: '3. Szint: Összetett Oszthatóság Szerinti Besorolás',
    subtitle: 'Válogasd szét a számokat az összetett osztóik szerint (6-tal, 12-vel vagy 15-tel osztható)!',
    categories: [
      {
        id: 'cat-div6',
        name: 'Osztható 6-tal',
        description: '2-vel ÉS 3-mal osztható számok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-div12',
        name: 'Osztható 12-vel',
        description: '3-mal ÉS 4-gyel osztható számok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-div15',
        name: 'Osztható 15-tel',
        description: '3-mal ÉS 5-tel osztható számok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: '534', category: 'cat-div6' },
      { id: 's3-2', label: '1 242', category: 'cat-div6' },
      { id: 's3-3', label: '4 326', category: 'cat-div6' },
      { id: 's3-4', label: '7 518', category: 'cat-div6' },
      { id: 's3-5', label: '432', category: 'cat-div12' },
      { id: 's3-6', label: '1 416', category: 'cat-div12' },
      { id: 's3-7', label: '2 544', category: 'cat-div12' },
      { id: 's3-8', label: '7 512', category: 'cat-div12' },
      { id: 's3-9', label: '645', category: 'cat-div15' },
      { id: 's3-10', label: '1 425', category: 'cat-div15' },
      { id: 's3-11', label: '2 835', category: 'cat-div15' },
      { id: 's3-12', label: '3 405', category: 'cat-div15' }
    ]
  }
};

export const DivisibilityReviewSorter: React.FC<DivisibilityReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-divisibility-review',
  topicTitle = '3. Mit tanultunk az oszthatóságról? (Ismétlés)'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Oszthatósági Csoportosító Játék"
      subtitle="Húzd vagy kattintsd a számokat és állításokat a megfelelő oszthatósági kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default DivisibilityReviewSorter;
