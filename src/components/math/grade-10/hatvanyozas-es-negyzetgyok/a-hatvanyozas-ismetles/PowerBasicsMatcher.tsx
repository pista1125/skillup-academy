import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerBasicsMatcherProps {
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
    title: 'Alapfogalmak, hatványértékek és előjelek',
    subtitle: 'Párosítsd a hatványkifejezéseket a pontos számértékükkel és előjelükkel!',
    pairs: [
      {
        id: 'pbm1-1',
        prompt: '(-3)⁴',
        value: '+81'
      },
      {
        id: 'pbm1-2',
        prompt: '-3⁴',
        value: '-81'
      },
      {
        id: 'pbm1-3',
        prompt: '2⁶',
        value: '64'
      },
      {
        id: 'pbm1-4',
        prompt: '(-4)³',
        value: '-64'
      },
      {
        id: 'pbm1-5',
        prompt: '(-2)⁵',
        value: '-32'
      },
      {
        id: 'pbm1-6',
        prompt: '5³',
        value: '125'
      },
      {
        id: 'pbm1-7',
        prompt: '(-1)¹⁰⁰',
        value: '+1'
      },
      {
        id: 'pbm1-8',
        prompt: '(-1)⁹⁹',
        value: '-1'
      }
    ]
  },
  2: {
    title: 'Hatványazonosságok alkalmazása számokkal',
    subtitle: 'Keresd meg az azonos értékű kifejezéspárokat az 5 alaptétel segítségével!',
    pairs: [
      {
        id: 'pbm2-1',
        prompt: '2³ · 2⁵',
        value: '2⁸'
      },
      {
        id: 'pbm2-2',
        prompt: '(3²)³',
        value: '3⁶'
      },
      {
        id: 'pbm2-3',
        prompt: '5⁷ : 5⁴',
        value: '5³'
      },
      {
        id: 'pbm2-4',
        prompt: '(2 · 5)³',
        value: '10³'
      },
      {
        id: 'pbm2-5',
        prompt: '6⁴ : 3⁴',
        value: '2⁴'
      },
      {
        id: 'pbm2-6',
        prompt: '(2³)⁴ : 2¹⁰',
        value: '2²'
      },
      {
        id: 'pbm2-7',
        prompt: '2⁴ · 5⁴',
        value: '10⁴'
      },
      {
        id: 'pbm2-8',
        prompt: '7⁵ : 7³',
        value: '7²'
      }
    ]
  },
  3: {
    title: 'Algebrai azonosságok és betűs kifejezések',
    subtitle: 'Párosítsd az összetett betűs hatványkifejezéseket a legegyszerűbb alakjukkal!',
    pairs: [
      {
        id: 'pbm3-1',
        prompt: '(-a²)³',
        value: '-a⁶'
      },
      {
        id: 'pbm3-2',
        prompt: '(-a³)²',
        value: '+a⁶'
      },
      {
        id: 'pbm3-3',
        prompt: '(2a³)²',
        value: '4a⁶'
      },
      {
        id: 'pbm3-4',
        prompt: '(3a²)³',
        value: '27a⁶'
      },
      {
        id: 'pbm3-5',
        prompt: '(a⁵ · a⁷) : a⁸',
        value: 'a⁴'
      },
      {
        id: 'pbm3-6',
        prompt: '(x²y)³ : (x⁴y²)',
        value: 'x²y'
      },
      {
        id: 'pbm3-7',
        prompt: '(-2xy²)³',
        value: '-8x³y⁶'
      },
      {
        id: 'pbm3-8',
        prompt: '(2a² / b)³',
        value: '8a⁶ / b³'
      }
    ]
  }
};

export const PowerBasicsMatcher: React.FC<PowerBasicsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-sec-hatvanyozas-ismetles',
  topicTitle = 'A hatványozás (ismétlés) – Párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="10. OSZTÁLY • III. TÉMAKÖR"
    />
  );
};

