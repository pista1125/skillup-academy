import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialProcessesMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const pairs = (prefix: string, start: number, list: [string, string][]) =>
  list.map(([left, right], i) => ({ id: `${prefix}${start + i}`, left, right }));

const EXP_PROCESS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Növekedési tényező',
    description: 'Párosítsd a hozzárendelést a növekedési tényezőjével!',
    pairs: pairs('expm', 1, [
      ['t ↦ 4ᵗ', 'k = 4'],
      ['t ↦ 4⁻ᵗ', 'k = 1/4'],
      ['t ↦ 4^{2t}', 'k = 16'],
      ['t ↦ 4^{t/2}', 'k = 2'],
      ['E(t) = 0,38 · 1,22ᵗ', 'k = 1,22'],
      ['F(t) = 5,67 · 0,79ᵗ', 'k = 0,79'],
      ['G(t) = 3,8 · 1,25⁻ᵗ', 'k = 0,8'],
      ['t ↦ 250 · 1,04ᵗ', 'k = 1,04']
    ])
  },
  {
    level: 2,
    title: '2. szint: Átírás N₀ · kᵗ alakba',
    description: 'Párosítsd a hozzárendelést az átírt alakjával!',
    pairs: pairs('expm', 9, [
      ['6,2 · 1,15^{−2t}', '≈ 6,2 · 0,756ᵗ'],
      ['10²³ · (1/2)^{4t}', '10²³ · (1/16)ᵗ'],
      ['6 · 10²³ · 2^{3t}', '6 · 10²³ · 8ᵗ'],
      ['3,8 · 0,8⁻ᵗ', '3,8 · 1,25ᵗ'],
      ['2,25 · 5⁻ᵗ', '2,25 · 0,2ᵗ'],
      ['3 · 10²³ · 0,4⁻ᵗ', '3 · 10²³ · 2,5ᵗ'],
      ['0,0134 · 0,5^{2t}', '0,0134 · 0,25ᵗ'],
      ['1270 · 0,3^{t/2}', '≈ 1270 · 0,548ᵗ']
    ])
  },
  {
    level: 3,
    title: '3. szint: Alkalmazások',
    description: 'Párosítsd a kérdést az eredményével!',
    pairs: pairs('expm', 17, [
      ['baktériumok: 120 millió → 180 millió 1 óra alatt – a modell', 'N(t) = 120 · 1,5ᵗ'],
      ['baktériumok 3 óra múlva', '405 millió'],
      ['baktériumok fél óra múlva', '≈ 147 millió'],
      ['baktériumok 3 órával korábban', '≈ 35,6 millió'],
      ['360 000 → 345 000 1 óra alatt – érték 3,5 óra múlva', '≈ 310 178'],
      ['20 · 1,026ᵗ ezer fő – 2000-ben (t = 100)', '≈ 260,5 ezer'],
      ['ugyanez lineárisan – 1940-ben', '≈ 116,2 ezer'],
      ['2011-ből 2006 (évi −0,2%) – szorzó', '0,998⁻⁵']
    ])
  }
];

const EXP_PROCESS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: EXP_PROCESS_MATCHER_LEVELS_LIST[0],
  2: EXP_PROCESS_MATCHER_LEVELS_LIST[1],
  3: EXP_PROCESS_MATCHER_LEVELS_LIST[2]
};

export const ExponentialProcessesMatcher: React.FC<ExponentialProcessesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-exponencialis-folyamat-matcher',
  topicTitle = '8. Exponenciális folyamatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-folyamatok"
      title={topicTitle}
      subtitle="Párosítsd a folyamatokat a növekedési tényezőjükkel, az átírt alakjukkal és az alkalmazások eredményeivel!"
      levels={EXP_PROCESS_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default ExponentialProcessesMatcher;
