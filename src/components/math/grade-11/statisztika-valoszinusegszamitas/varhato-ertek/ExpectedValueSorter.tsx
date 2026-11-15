import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpectedValueSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const EXPECTED_VALUE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Kinek kedvez a játék?',
    description: 'Számold ki a játékos nyereményének várható értékét (+: kap, −: fizet), és sorold be a játékot!',
    categories: [
      { id: 'pos', name: 'A játékosnak kedvez (E > 0)', color: 'emerald' },
      { id: 'fair', name: 'Méltányos (E = 0)', color: 'blue' },
      { id: 'neg', name: 'A játékos ellen szól (E < 0)', color: 'rose' }
    ],
    items: [
      { id: 'evs1', text: 'érme: fej +20 Ft, írás −10 Ft', categoryId: 'pos' },
      { id: 'evs2', text: 'kocka: hatos +60 Ft, más −10 Ft', categoryId: 'pos' },
      { id: 'evs3', text: 'kocka: páros +10 Ft, páratlan −5 Ft', categoryId: 'pos' },
      { id: 'evs4', text: 'érme: fej +10 Ft, írás −10 Ft', categoryId: 'fair' },
      { id: 'evs5', text: 'kocka: hatos +50 Ft, más −10 Ft', categoryId: 'fair' },
      { id: 'evs6', text: 'kocka: 1 vagy 2 +20 Ft, más −10 Ft', categoryId: 'fair' },
      { id: 'evs7', text: 'kocka: ötös +40 Ft, más −10 Ft', categoryId: 'neg' },
      { id: 'evs8', text: 'érme: fej +10 Ft, írás −15 Ft', categoryId: 'neg' },
      { id: 'evs9', text: 'kocka: páros +5 Ft, páratlan −10 Ft', categoryId: 'neg' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a várható érték?',
    description: 'Határozd meg a várható értéket, és sorold be a kísérletet!',
    categories: [
      { id: 'small', name: 'E < 2', color: 'violet' },
      { id: 'mid', name: '2 ≤ E ≤ 5', color: 'teal' },
      { id: 'big', name: 'E > 5', color: 'amber' }
    ],
    items: [
      { id: 'evs10', text: '3 érme: a fejek száma', categoryId: 'small' },
      { id: 'evs11', text: '1 érme: a fejek száma', categoryId: 'small' },
      { id: 'evs12', text: '2 érme: a fejek száma', categoryId: 'small' },
      { id: 'evs13', text: 'egy kockával dobott szám', categoryId: 'mid' },
      { id: 'evs14', text: 'X: 1, 2, 3 valószínűsége 0,2; 0,5; 0,3', categoryId: 'mid' },
      { id: 'evs15', text: 'pontszám: 0, 1, 2, 3, 4 pont 2, 4, 6, 10, 8 tanulónál', categoryId: 'mid' },
      { id: 'evs16', text: 'két kockával dobott összeg', categoryId: 'big' },
      { id: 'evs17', text: 'három kockával dobott összeg', categoryId: 'big' },
      { id: 'evs18', text: 'tombola: 500 szelvényből 10 nyer 1000 Ft-ot (Ft)', categoryId: 'big' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Összetettebb játékok és sorsjegyek',
    description: 'Számold ki a játékos nettó nyereségének várható értékét, és sorold be!',
    categories: [
      { id: 'pos', name: 'A játékosnak kedvez (E > 0)', color: 'emerald' },
      { id: 'fair', name: 'Méltányos (E = 0)', color: 'blue' },
      { id: 'neg', name: 'A játékos ellen szól (E < 0)', color: 'rose' }
    ],
    items: [
      { id: 'evs19', text: 'két kocka: 7-es összeg +60 Ft, más −10 Ft', categoryId: 'pos' },
      { id: 'evs20', text: 'két érme: 2 fej +40 Ft, 1 fej −10 Ft, 0 fej −10 Ft', categoryId: 'pos' },
      { id: 'evs21', text: '10 Ft-os sorsjegy: 100-ból 5 nyer 1000 Ft-ot', categoryId: 'pos' },
      { id: 'evs22', text: 'két kocka: 7-es összeg +50 Ft, más −10 Ft', categoryId: 'fair' },
      { id: 'evs23', text: 'két érme: 2 fej +40 Ft, 1 fej −10 Ft, 0 fej −20 Ft', categoryId: 'fair' },
      { id: 'evs24', text: '50 Ft-os sorsjegy: 100-ból 5 nyer 1000 Ft-ot', categoryId: 'fair' },
      { id: 'evs25', text: '100 Ft-os sorsjegy: 100-ból 5 nyer 1000 Ft-ot', categoryId: 'neg' },
      { id: 'evs26', text: 'két kocka: dupla +20 Ft, más −5 Ft', categoryId: 'neg' },
      { id: 'evs27', text: 'a kereskedő sorsjegye (E = 13,8 Ft) 20 Ft-ért', categoryId: 'neg' }
    ]
  }
};

export const ExpectedValueSorter: React.FC<ExpectedValueSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-varhato-ertek-sorter',
  topicTitle = '9. Várható érték – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="varhato-ertek"
      title={topicTitle}
      subtitle="Döntsd el, kinek kedvez a játék, és becsüld meg a várható értéket!"
      levels={EXPECTED_VALUE_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default ExpectedValueSorter;
