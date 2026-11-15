import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialProcessesSorterProps {
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

const items = (prefix: string, start: number, list: [string, string][]) =>
  list.map(([text, categoryId], i) => ({ id: `${prefix}${start + i}`, text, categoryId }));

const EXP_PROCESS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Növekvő vagy csökkenő?',
    description: 'Válogasd szét a folyamatokat (vagy azt, ami nem exponenciális)!',
    categories: [
      { id: 'inc', name: 'Exponenciálisan növekvő', color: 'emerald' },
      { id: 'dec', name: 'Exponenciálisan csökkenő', color: 'sky' },
      { id: 'lin', name: 'Nem exponenciális (lineáris)', color: 'amber' }
    ],
    items: items('exps', 1, [
      ['t ↦ 0,38 · 1,22ᵗ', 'inc'],
      ['t ↦ 3,8 · 0,8⁻ᵗ', 'inc'],
      ['t ↦ 6 · 10²³ · 2^{3t}', 'inc'],
      ['t ↦ 5,67 · 0,79ᵗ', 'dec'],
      ['t ↦ 3,8 · 1,25⁻ᵗ', 'dec'],
      ['t ↦ 2,1 · 5^{−1,2t}', 'dec'],
      ['t ↦ 120 + 60t', 'lin'],
      ['t ↦ 20 + 2,4t', 'lin'],
      ['t ↦ 360 000 − 15 000t', 'lin']
    ])
  },
  {
    level: 2,
    title: '2. szint: Mekkora a növekedési tényező?',
    description: 'Írd át N₀ · kᵗ alakba, és döntsd el, hová esik k!',
    categories: [
      { id: 'lt05', name: '0 < k < 0,5', color: 'sky' },
      { id: 'b051', name: '0,5 ≤ k < 1', color: 'teal' },
      { id: 'gt1', name: 'k > 1', color: 'orange' }
    ],
    items: items('exps', 10, [
      ['t ↦ 4⁻ᵗ', 'lt05'],
      ['t ↦ 10²³ · (1/2)^{4t}', 'lt05'],
      ['t ↦ 0,0134 · 0,5^{2t}', 'lt05'],
      ['t ↦ 6,2 · 1,15^{−2t}', 'b051'],
      ['t ↦ 1270 · 0,3^{t/2}', 'b051'],
      ['t ↦ 360 000 · (23/24)ᵗ', 'b051'],
      ['t ↦ 4^{t/2}', 'gt1'],
      ['t ↦ 3 · 10²³ · 0,4⁻ᵗ', 'gt1'],
      ['t ↦ 120 · 1,5ᵗ', 'gt1']
    ])
  },
  {
    level: 3,
    title: '3. szint: Helyes vagy hibás gondolatmenet?',
    description: 'Évente az előző évi népesség 99,8%-a (2001–2011) – és más exponenciális folyamatok.',
    categories: [
      { id: 'ok', name: 'Helyes', color: 'emerald' },
      { id: 'bad', name: 'Hibás', color: 'rose' },
      { id: 'approx', name: 'Csak közelítőleg igaz (elméletileg hibás)', color: 'amber' }
    ],
    items: items('exps', 19, [
      ['2006 = 2001 · 0,998⁵', 'ok'],
      ['2006 = 2011 · 0,998⁻⁵', 'ok'],
      ['N(−3) = 120 / 1,5³', 'ok'],
      ['N(0,5) = (120 + 180) / 2 exponenciális modellben', 'bad'],
      ['1,15^{−2t} növekvő, mert 1,15 > 1', 'bad'],
      ['2006 = 2011 · 0,998⁵', 'bad'],
      ['5 év alatt 5 · 0,2% = 1% a csökkenés', 'approx'],
      ['az előző évi népesség a következő évi 100,2%-a', 'approx'],
      ['2006 = 2011 · 1,002⁵', 'approx']
    ])
  }
];

const EXP_PROCESS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: EXP_PROCESS_SORTER_LEVELS_LIST[0],
  2: EXP_PROCESS_SORTER_LEVELS_LIST[1],
  3: EXP_PROCESS_SORTER_LEVELS_LIST[2]
};

export const ExponentialProcessesSorter: React.FC<ExponentialProcessesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-exponencialis-folyamat-sorter',
  topicTitle = '8. Exponenciális folyamatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-folyamatok"
      title={topicTitle}
      subtitle="Rendszerezd az exponenciális folyamatokat: növekvő vagy csökkenő, mekkora a növekedési tényező, és helyes-e a gondolatmenet?"
      levels={EXP_PROCESS_SORTER_LEVELS}
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

export default ExponentialProcessesSorter;
