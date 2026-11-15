import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CommonLogarithmSorterProps {
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

const items = (prefix: string, list: [string, string][]) => list.map(([text, categoryId], i) => ({ id: `${prefix}${i + 1}`, text, categoryId }));

const COMMON_LOG_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora a tízes alapú logaritmus?',
    description: 'Becsüld meg a 10 hatványai segítségével!',
    categories: [
      { id: 'neg', name: 'lg k < 0', color: 'rose' },
      { id: 'small', name: '0 ≤ lg k < 1', color: 'amber' },
      { id: 'big', name: 'lg k ≥ 1', color: 'emerald' }
    ],
    items: items('clgs1-', [
      ['lg 0,0092', 'neg'],
      ['lg 0,083', 'neg'],
      ['lg 0,836', 'neg'],
      ['lg 1', 'small'],
      ['lg 2', 'small'],
      ['lg 4', 'small'],
      ['lg 10', 'big'],
      ['lg 572', 'big'],
      ['lg 4933', 'big']
    ])
  },
  {
    level: 2,
    title: '2. szint: Kell-e számológép?',
    description: 'Döntsd el, hogy pontosan kiszámolható-e fejben, csak közelítőleg (számológéppel), vagy nincs is értelmezve!',
    categories: [
      { id: 'exact', name: 'Pontos érték fejben', color: 'emerald' },
      { id: 'calc', name: 'Számológép kell (közelítő)', color: 'sky' },
      { id: 'undef', name: 'Nincs értelmezve', color: 'rose' }
    ],
    items: items('clgs2-', [
      ['log₅ 125', 'exact'],
      ['log₂₅ 5', 'exact'],
      ['log_{1/5} 25', 'exact'],
      ['log₂ 5', 'calc'],
      ['log₆ 703', 'calc'],
      ['log₃ 20', 'calc'],
      ['lg (−4)', 'undef'],
      ['log₁ 25', 'undef'],
      ['lg 0', 'undef']
    ])
  },
  {
    level: 3,
    title: '3. szint: Mekkora a megoldás?',
    description: 'Oldd meg (vagy becsüld meg) az egyenletet, és sorold be a megoldását!',
    categories: [
      { id: 'neg', name: 'x < 0', color: 'rose' },
      { id: 'mid', name: '0 < x < 5', color: 'amber' },
      { id: 'big', name: 'x > 5', color: 'emerald' }
    ],
    items: items('clgs3-', [
      ['4,55 · 1,2ˣ = 3,64', 'neg'],
      ['2^(−x) = 17', 'neg'],
      ['6^(x+2) = 30', 'neg'],
      ['8,5 · 10ˣ = 212,5', 'mid'],
      ['10^(3x) = 8,4', 'mid'],
      ['0,83ˣ = 0,5', 'mid'],
      ['1,15ˣ = 3', 'big'],
      ['1,06ˣ = 2', 'big'],
      ['1,1ˣ = 2', 'big']
    ])
  }
];

const COMMON_LOG_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMMON_LOG_SORTER_LEVELS_LIST[0],
  2: COMMON_LOG_SORTER_LEVELS_LIST[1],
  3: COMMON_LOG_SORTER_LEVELS_LIST[2]
};

export const CommonLogarithmSorter: React.FC<CommonLogarithmSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-tizes-logaritmus-sorter',
  topicTitle = '11. A tízes alapú logaritmus használata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="tizes-alapu-logaritmus"
      title={topicTitle}
      subtitle="Rendszerezd: mekkora a logaritmus, kell-e hozzá számológép, és mekkora az egyenlet megoldása!"
      levels={COMMON_LOG_SORTER_LEVELS}
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

export default CommonLogarithmSorter;
