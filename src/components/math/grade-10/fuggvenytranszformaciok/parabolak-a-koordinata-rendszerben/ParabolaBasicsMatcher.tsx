import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParabolaBasicsMatcherProps {
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
    title: 'Parabolák és csúcspontok',
    subtitle: 'Párosítsd a másodfokú hozzárendelési szabályokat a csúcspontjuk (tengelypontjuk) koordinátáival!',
    pairs: [
      {
        id: 'pbm1-1',
        prompt: 'f(x) = x²',
        value: 'T(0; 0)'
      },
      {
        id: 'pbm1-2',
        prompt: 'f(x) = x² + 3',
        value: 'T(0; 3)'
      },
      {
        id: 'pbm1-3',
        prompt: 'f(x) = x² - 5',
        value: 'T(0; -5)'
      },
      {
        id: 'pbm1-4',
        prompt: 'f(x) = (x - 2)²',
        value: 'T(2; 0)'
      },
      {
        id: 'pbm1-5',
        prompt: 'f(x) = (x + 4)²',
        value: 'T(-4; 0)'
      },
      {
        id: 'pbm1-6',
        prompt: 'f(x) = (x - 1)² + 6',
        value: 'T(1; 6)'
      },
      {
        id: 'pbm1-7',
        prompt: 'f(x) = (x + 3)² - 2',
        value: 'T(-3; -2)'
      },
      {
        id: 'pbm1-8',
        prompt: 'f(x) = x² + 10',
        value: 'T(0; 10)'
      }
    ]
  },
  2: {
    title: 'Eltolások iránya és mértéke',
    subtitle: 'Párosítsd a képleteket a geometriai transzformáció pontos irányával!',
    pairs: [
      {
        id: 'pbm2-1',
        prompt: 'f(x) = x² + 4',
        value: 'Felfelé 4 egységgel'
      },
      {
        id: 'pbm2-2',
        prompt: 'f(x) = x² - 7',
        value: 'Lefelé 7 egységgel'
      },
      {
        id: 'pbm2-3',
        prompt: 'f(x) = (x - 5)²',
        value: 'Jobbra 5 egységgel'
      },
      {
        id: 'pbm2-4',
        prompt: 'f(x) = (x + 6)²',
        value: 'Balra 6 egységgel'
      },
      {
        id: 'pbm2-5',
        prompt: 'f(x) = (x - 2)² + 3',
        value: 'Jobbra 2, majd fel 3'
      },
      {
        id: 'pbm2-6',
        prompt: 'f(x) = (x + 1)² - 5',
        value: 'Balra 1, majd le 5'
      },
      {
        id: 'pbm2-7',
        prompt: 'f(x) = (x - 4)² - 1',
        value: 'Jobbra 4, majd le 1'
      },
      {
        id: 'pbm2-8',
        prompt: 'f(x) = (x + 5)² + 2',
        value: 'Balra 5, majd fel 2'
      }
    ]
  },
  3: {
    title: 'Zérushelyek és értékkészletek',
    subtitle: 'Párosítsd a függvényeket a zérushelyeikkel és értékkészletükkel!',
    pairs: [
      {
        id: 'pbm3-1',
        prompt: 'f(x) = x² - 9 zérushelyei',
        value: 'x₁ = -3 és x₂ = 3'
      },
      {
        id: 'pbm3-2',
        prompt: 'f(x) = (x - 4)² zérushelye',
        value: 'Egyetlen zérushely: x = 4'
      },
      {
        id: 'pbm3-3',
        prompt: 'f(x) = x² + 5 zérushelyei',
        value: 'Nincs zérushely (lebeg)'
      },
      {
        id: 'pbm3-4',
        prompt: 'f(x) = (x + 7)² zérushelye',
        value: 'Egyetlen zérushely: x = -7'
      },
      {
        id: 'pbm3-5',
        prompt: 'f(x) = (x - 2)² - 1 zérushelyei',
        value: 'x₁ = 1 és x₂ = 3'
      },
      {
        id: 'pbm3-6',
        prompt: 'f(x) = x² - 2 értékkészlete',
        value: 'Rf = [-2; ∞['
      },
      {
        id: 'pbm3-7',
        prompt: 'f(x) = x² + 3 értékkészlete',
        value: 'Rf = [3; ∞['
      },
      {
        id: 'pbm3-8',
        prompt: 'f : [-1; 2] → ℝ, f(x) = x²',
        value: 'Rf = [0; 4]'
      }
    ]
  }
};

export const ParabolaBasicsMatcher: React.FC<ParabolaBasicsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'parabolak-a-koordinata-rendszerben',
  topicTitle = 'Parabolák a koordináta-rendszerben'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levelsConfig={matcherLevels}
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

