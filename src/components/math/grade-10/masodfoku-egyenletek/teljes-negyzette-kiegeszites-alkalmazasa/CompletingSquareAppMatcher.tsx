import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompletingSquareAppMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Nem normált egyenlet ➔ Normált alak',
    subtitle: 'Párosítsd a nem normált másodfokú egyenletet az a-val való végigosztás utáni alakkal!',
    pairs: [
      {
        id: 'csam1-1',
        prompt: '2x² - 8x - 24 = 0',
        value: 'x² - 4x - 12 = 0  (/ : 2)'
      },
      {
        id: 'csam1-2',
        prompt: '3x² + 18x - 21 = 0',
        value: 'x² + 6x - 7 = 0  (/ : 3)'
      },
      {
        id: 'csam1-3',
        prompt: '5x² - 10x - 40 = 0',
        value: 'x² - 2x - 8 = 0  (/ : 5)'
      },
      {
        id: 'csam1-4',
        prompt: '-x² + 6x - 8 = 0',
        value: 'x² - 6x + 8 = 0  (/ · (-1))'
      },
      {
        id: 'csam1-5',
        prompt: '4x² + 16x + 12 = 0',
        value: 'x² + 4x + 3 = 0  (/ : 4)'
      },
      {
        id: 'csam1-6',
        prompt: '2x² + 10x + 12 = 0',
        value: 'x² + 5x + 6 = 0  (/ : 2)'
      },
      {
        id: 'csam1-7',
        prompt: '-2x² + 14x - 20 = 0',
        value: 'x² - 7x + 10 = 0  (/ : (-2))'
      },
      {
        id: 'csam1-8',
        prompt: '6x² - 18x = 0',
        value: 'x² - 3x = 0  (/ : 6)'
      }
    ]
  },
  2: {
    title: 'Kifejezések és Szélsőértékeik',
    subtitle: 'Párosítsd a négyzetes alakot a hozzá tartozó minimum vagy maximum értékkel és hellyel!',
    pairs: [
      {
        id: 'csam2-1',
        prompt: '2(x - 3)² + 5',
        value: 'Minimum = 5, helye: x = 3'
      },
      {
        id: 'csam2-2',
        prompt: '-(x + 4)² + 10',
        value: 'Maximum = 10, helye: x = -4'
      },
      {
        id: 'csam2-3',
        prompt: '3(x + 1)² - 8',
        value: 'Minimum = -8, helye: x = -1'
      },
      {
        id: 'csam2-4',
        prompt: '-2(x - 5)² + 7',
        value: 'Maximum = 7, helye: x = 5'
      },
      {
        id: 'csam2-5',
        prompt: '(x - 2)²',
        value: 'Minimum = 0, helye: x = 2'
      },
      {
        id: 'csam2-6',
        prompt: '-(x - 6)²',
        value: 'Maximum = 0, helye: x = 6'
      },
      {
        id: 'csam2-7',
        prompt: '4(x + 2)² + 1',
        value: 'Minimum = 1, helye: x = -2'
      },
      {
        id: 'csam2-8',
        prompt: '-5(x + 3)² - 2',
        value: 'Maximum = -2, helye: x = -3'
      }
    ]
  },
  3: {
    title: 'Főegyütthatós egyenletek megoldásai',
    subtitle: 'Párosítsd a nem normált másodfokú egyenletet a valós megoldásaival!',
    pairs: [
      {
        id: 'csam3-1',
        prompt: '2x² - 8x - 10 = 0',
        value: 'x₁ = 5, x₂ = -1'
      },
      {
        id: 'csam3-2',
        prompt: '3x² - 12x + 9 = 0',
        value: 'x₁ = 3, x₂ = 1'
      },
      {
        id: 'csam3-3',
        prompt: '-x² + 4x + 5 = 0',
        value: 'x₁ = 5, x₂ = -1'
      },
      {
        id: 'csam3-4',
        prompt: '2x² + 6x - 20 = 0',
        value: 'x₁ = 2, x₂ = -5'
      },
      {
        id: 'csam3-5',
        prompt: '4x² - 16 = 0',
        value: 'x = ±2'
      },
      {
        id: 'csam3-6',
        prompt: '2x² - 12x + 18 = 0',
        value: 'x = 3 (kettős gyök)'
      },
      {
        id: 'csam3-7',
        prompt: '3x² + 6x + 9 = 0',
        value: 'Nincs valós gyök (∅)'
      },
      {
        id: 'csam3-8',
        prompt: '-2x² + 8x - 10 = 0',
        value: 'Nincs valós gyök (∅)'
      }
    ]
  }
};

export const CompletingSquareAppMatcher: React.FC<CompletingSquareAppMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-quad-teljes-negyzet-alkalmazasa-matcher',
  topicTitle = 'Teljes négyzetté kiegészítés alkalmazása'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      level1Pairs={matcherLevels[1].pairs}
      level2Pairs={matcherLevels[2].pairs}
      level3Pairs={matcherLevels[3].pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="orange"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={{
        1: { title: matcherLevels[1].title, subtitle: matcherLevels[1].subtitle },
        2: { title: matcherLevels[2].title, subtitle: matcherLevels[2].subtitle },
        3: { title: matcherLevels[3].title, subtitle: matcherLevels[3].subtitle }
      }}
    />
  );
};

