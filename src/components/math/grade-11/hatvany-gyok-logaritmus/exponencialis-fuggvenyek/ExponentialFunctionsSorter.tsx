import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialFunctionsSorterProps {
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

const EXP_FUNCTIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Növekvő, csökkenő vagy nem exponenciális?',
    description: 'Válogasd szét a hozzárendeléseket!',
    categories: [
      { id: 'inc', name: 'Szigorúan monoton növekvő', color: 'emerald' },
      { id: 'dec', name: 'Szigorúan monoton csökkenő', color: 'sky' },
      { id: 'not', name: 'Nem exponenciális függvény', color: 'rose' }
    ],
    items: items('exfs', 1, [
      ['x ↦ 2ˣ', 'inc'],
      ['x ↦ 1,2ˣ', 'inc'],
      ['x ↦ (3/4)⁻ˣ', 'inc'],
      ['x ↦ 0,4ˣ', 'dec'],
      ['x ↦ (1/3)ˣ', 'dec'],
      ['x ↦ 5⁻ˣ', 'dec'],
      ['x ↦ 1ˣ', 'not'],
      ['x ↦ x²', 'not'],
      ['x ↦ x³', 'not']
    ])
  },
  {
    level: 2,
    title: '2. szint: Mekkora a hatvány értéke?',
    description: 'Hová esik a szám? (Használd a monotonitást!)',
    categories: [
      { id: 'lt1', name: '0 és 1 között', color: 'sky' },
      { id: 'b12', name: '1 és 2 között', color: 'violet' },
      { id: 'gt2', name: '2-nél nagyobb', color: 'orange' }
    ],
    items: items('exfs', 10, [
      ['3^{−3/5}', 'lt1'],
      ['0,8³', 'lt1'],
      ['1,5⁻¹', 'lt1'],
      ['1,5^{3/2}', 'b12'],
      ['0,5^{−1/2}', 'b12'],
      ['1,2³', 'b12'],
      ['3^{7/8}', 'gt2'],
      ['0,5^{−5/4}', 'gt2'],
      ['2^{√2}', 'gt2']
    ])
  },
  {
    level: 3,
    title: '3. szint: Melyik grafikonon van a pont?',
    description: 'f(x) = 3ˣ, g(x) = (1/3)ˣ – melyikre illeszkedik a pont?',
    categories: [
      { id: 'f', name: 'Csak f(x) = 3ˣ', color: 'violet' },
      { id: 'g', name: 'Csak g(x) = (1/3)ˣ', color: 'sky' },
      { id: 'none', name: 'Egyikre sem', color: 'rose' }
    ],
    items: items('exfs', 19, [
      ['(1/2; √3)', 'f'],
      ['(−1; 1/3)', 'f'],
      ['(2; 9)', 'f'],
      ['(−2; 9)', 'g'],
      ['(1; 1/3)', 'g'],
      ['(−1/2; √3)', 'g'],
      ['(1; 0)', 'none'],
      ['(0; 0)', 'none'],
      ['(−1/2; 1/3)', 'none']
    ])
  }
];

const EXP_FUNCTIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: EXP_FUNCTIONS_SORTER_LEVELS_LIST[0],
  2: EXP_FUNCTIONS_SORTER_LEVELS_LIST[1],
  3: EXP_FUNCTIONS_SORTER_LEVELS_LIST[2]
};

export const ExponentialFunctionsSorter: React.FC<ExponentialFunctionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-exponencialis-fuggveny-sorter',
  topicTitle = '7. Exponenciális függvények – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-fuggvenyek"
      title={topicTitle}
      subtitle="Rendszerezd az exponenciális függvényeket: monotonitás, a hatványok nagysága és a grafikonra illeszkedő pontok!"
      levels={EXP_FUNCTIONS_SORTER_LEVELS}
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

export default ExponentialFunctionsSorter;
