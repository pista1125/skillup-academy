import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeTestMatcherProps {
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
    title: 'Transzformációk felismerése és bázispontok',
    subtitle: 'Párosítsd a hozzárendelési szabályokat a transzformációk leírásával és a bázisponttal!',
    pairs: [
      {
        id: 'ptm1-1',
        prompt: 'f(x) = (x - 3)² + 2',
        value: 'Jobbra 3, fel 2, V(3; 2)'
      },
      {
        id: 'ptm1-2',
        prompt: 'f(x) = |x + 4| - 1',
        value: 'Balra 4, le 1, V(-4; -1)'
      },
      {
        id: 'ptm1-3',
        prompt: 'f(x) = -(x - 1)² + 5',
        value: 'Jobbra 1, tükrözve, fel 5'
      },
      {
        id: 'ptm1-4',
        prompt: 'f(x) = 2(x + 2)² - 3',
        value: 'Balra 2, nyújtva 2-vel, le 3'
      },
      {
        id: 'ptm1-5',
        prompt: 'f(x) = 0.5|x - 5|',
        value: 'Jobbra 5, összenyomva 0.5-del'
      },
      {
        id: 'ptm1-6',
        prompt: 'f(x) = -(x + 3)²',
        value: 'Balra 3, tükrözve az x-tengelyre'
      },
      {
        id: 'ptm1-7',
        prompt: 'f(x) = √(x - 4) + 1',
        value: 'Jobbra 4, fel 1, kezdőpont: (4; 1)'
      },
      {
        id: 'ptm1-8',
        prompt: 'f(x) = -|x| + 3',
        value: 'Tükrözve, fel 3, csúcs (0; 3)'
      }
    ]
  },
  2: {
    title: 'Polinom alakból kanonikus alak és csúcspont',
    subtitle: 'Párosítsd a másodfokú polinomokat a megfelelő teljes négyzetes kanonikus alakkal!',
    pairs: [
      {
        id: 'ptm2-1',
        prompt: 'f(x) = x² - 6x + 5',
        value: '(x - 3)² - 4, V(3; -4)'
      },
      {
        id: 'ptm2-2',
        prompt: 'f(x) = x² + 4x + 7',
        value: '(x + 2)² + 3, V(-2; 3)'
      },
      {
        id: 'ptm2-3',
        prompt: 'f(x) = 2x² - 8x + 6',
        value: '2(x - 2)² - 2, V(2; -2)'
      },
      {
        id: 'ptm2-4',
        prompt: 'f(x) = -x² + 6x - 5',
        value: '-(x - 3)² + 4, V(3; 4)'
      },
      {
        id: 'ptm2-5',
        prompt: 'f(x) = x² - 10x + 25',
        value: '(x - 5)², V(5; 0)'
      },
      {
        id: 'ptm2-6',
        prompt: 'f(x) = 2x² + 12x + 19',
        value: '2(x + 3)² + 1, V(-3; 1)'
      },
      {
        id: 'ptm2-7',
        prompt: 'f(x) = -x² - 4x - 1',
        value: '-(x + 2)² + 3, V(-2; 3)'
      },
      {
        id: 'ptm2-8',
        prompt: 'f(x) = 0.5x² - 2x + 4',
        value: '0.5(x - 2)² + 2, V(2; 2)'
      }
    ]
  },
  3: {
    title: 'Függvények korlátos intervallumon',
    subtitle: 'Párosítsd az adott intervallumon értelmezett függvényeket a pontos értékkészletükkel!',
    pairs: [
      {
        id: 'ptm3-1',
        prompt: 'f: [1; 4], f(x) = (x - 2)²',
        value: 'ÉK = [0; 4], minimum x = 2'
      },
      {
        id: 'ptm3-2',
        prompt: 'f: [-1; 2], f(x) = -|x| + 2',
        value: 'ÉK = [0; 2], maximum x = 0'
      },
      {
        id: 'ptm3-3',
        prompt: 'f: ]-2; 2], f(x) = |x - 1|',
        value: 'ÉK = [0; 3[, minimum x = 1'
      },
      {
        id: 'ptm3-4',
        prompt: 'f: [-1; 3], f(x) = x²',
        value: 'ÉK = [0; 9], minimum x = 0'
      },
      {
        id: 'ptm3-5',
        prompt: 'f: [0; 3], f(x) = (x - 2)² + 2',
        value: 'ÉK = [2; 6], minimum x = 2'
      },
      {
        id: 'ptm3-6',
        prompt: 'f: [-3; 2], f(x) = |x + 2|',
        value: 'ÉK = [0; 4], minimum x = -2'
      },
      {
        id: 'ptm3-7',
        prompt: 'f: [2; 5], f(x) = (x - 1)² + 1',
        value: 'ÉK = [2; 17], minimum x = 2'
      },
      {
        id: 'ptm3-8',
        prompt: 'f: [1; 5], f(x) = -(x - 3)² + 4',
        value: 'ÉK = [0; 4], maximum x = 3'
      }
    ]
  }
};

export const PracticeTestMatcher: React.FC<PracticeTestMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-transz-tudasproba-matcher',
  topicTitle = 'Gyakorlás, tudáspróba - Párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

