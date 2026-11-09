import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompositeTransformMatcherProps {
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
    title: 'Kanonikus alak és kitüntetett pontok',
    subtitle: 'Párosítsd a hozzárendelési szabályokat a csúcspontjukkal és nyílásirányukkal!',
    pairs: [
      {
        id: 'ctm1-1',
        prompt: 'f(x) = (x - 3)² + 2',
        value: 'Csúcspont: T(3; 2), felfelé nyílik'
      },
      {
        id: 'ctm1-2',
        prompt: 'f(x) = -(x + 4)² + 5',
        value: 'Csúcspont: T(-4; 5), lefelé nyílik'
      },
      {
        id: 'ctm1-3',
        prompt: 'f(x) = 2(x - 1)² - 7',
        value: 'Csúcspont: T(1; -7), soványabb'
      },
      {
        id: 'ctm1-4',
        prompt: 'f(x) = |x - 5| - 3',
        value: 'Töréspont: V(5; -3), Rf = [-3; ∞['
      },
      {
        id: 'ctm1-5',
        prompt: 'f(x) = -|x + 2| + 6',
        value: 'Töréspont: V(-2; 6), Rf = ]-∞; 6]'
      },
      {
        id: 'ctm1-6',
        prompt: 'f(x) = -0,5(x - 6)² + 1',
        value: 'Csúcspont: T(6; 1), kövérebb'
      },
      {
        id: 'ctm1-7',
        prompt: 'f(x) = 3|x + 1| - 4',
        value: 'Töréspont: V(-1; -4), hegyesebb'
      },
      {
        id: 'ctm1-8',
        prompt: 'f(x) = -(x - 5)²',
        value: 'Csúcspont: T(5; 0), érinti a tengelyt'
      }
    ]
  },
  2: {
    title: 'Transzformációk és zérushelyek',
    subtitle: 'Párosítsd a függvényeket a zérushelyeik számával és pontos értékével!',
    pairs: [
      {
        id: 'ctm2-1',
        prompt: 'f(x) = (x - 2)² - 9',
        value: '2 zérushely: x = -1 és x = 5'
      },
      {
        id: 'ctm2-2',
        prompt: 'f(x) = -(x + 1)² + 4',
        value: '2 zérushely: x = -3 és x = 1'
      },
      {
        id: 'ctm2-3',
        prompt: 'f(x) = (x - 4)² + 3',
        value: '0 zérushely (tengely felett lebeg)'
      },
      {
        id: 'ctm2-4',
        prompt: 'f(x) = -(x + 3)² - 2',
        value: '0 zérushely (tengely alatt lefelé)'
      },
      {
        id: 'ctm2-5',
        prompt: 'f(x) = |x - 3| - 4',
        value: '2 zérushely: x = -1 és x = 7'
      },
      {
        id: 'ctm2-6',
        prompt: 'f(x) = -|x + 5| + 2',
        value: '2 zérushely: x = -7 és x = -3'
      },
      {
        id: 'ctm2-7',
        prompt: 'f(x) = |x - 2| + 6',
        value: '0 zérushely (minimuma 6)'
      },
      {
        id: 'ctm2-8',
        prompt: 'f(x) = 2(x - 5)²',
        value: '1 zérushely: x = 5 (csúcsban)'
      }
    ]
  },
  3: {
    title: 'Abszolútérték-felhajtás és összetett alakzatok',
    subtitle: 'Párosítsd az összetett és felhajtott függvényeket jellegzetes tulajdonságaikkal!',
    pairs: [
      {
        id: 'ctm3-1',
        prompt: 'f(x) = |x² - 9|',
        value: 'W-alak, helyi maximum: (0; 9)'
      },
      {
        id: 'ctm3-2',
        prompt: 'f(x) = |x² - 1|',
        value: 'W-alak, helyi maximum: (0; 1)'
      },
      {
        id: 'ctm3-3',
        prompt: 'f(x) = |(x - 2)² - 4|',
        value: 'W-alak, helyi maximum: (2; 4)'
      },
      {
        id: 'ctm3-4',
        prompt: 'f(x) = -|x - 2|',
        value: 'Lefelé néző V, csúcspont: (2; 0)'
      },
      {
        id: 'ctm3-5',
        prompt: 'f(x) = |x² + 4|',
        value: 'x² + 4 normál parabola (nem hajlik)'
      },
      {
        id: 'ctm3-6',
        prompt: 'f(x) = -2|x + 1| + 4',
        value: 'Maximuma 4, zérushelyek: -3 és 1'
      },
      {
        id: 'ctm3-7',
        prompt: 'f(x) = 0,5(x - 2)² - 2',
        value: 'Zérushelyek: x = 0 és x = 4'
      },
      {
        id: 'ctm3-8',
        prompt: 'f(x) = -3(x + 2)² - 1',
        value: 'Maximuma -1, Rf = ]-∞; -1]'
      }
    ]
  }
};

export const CompositeTransformMatcher: React.FC<CompositeTransformMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = 'Összetett függvénytranszformációk'
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

