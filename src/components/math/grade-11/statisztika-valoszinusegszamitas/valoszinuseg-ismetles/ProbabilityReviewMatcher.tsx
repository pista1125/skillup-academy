import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityReviewMatcherProps {
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

const PROBABILITY_REVIEW_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Egy kocka, érmék ↔ valószínűség',
    description: 'Szabályos dobókockával (illetve érmékkel) dobunk. Párosítsd az eseményt a valószínűségével!',
    pairs: [
      { id: 'prrm1', left: 'a dobott szám osztója 6-nak', right: '2/3' },
      { id: 'prrm2', left: 'prímszámot dobunk', right: '1/2' },
      { id: 'prrm3', left: 'a dobott szám osztható 5-tel', right: '1/6' },
      { id: 'prrm4', left: 'a dobott szám osztója 5!-nak', right: '1' },
      { id: 'prrm5', left: 'négyzetszámot dobunk', right: '1/3' },
      { id: 'prrm6', left: 'a dobott szám faktoriálisa páros', right: '5/6' },
      { id: 'prrm7', left: '7-est dobunk', right: '0' },
      { id: 'prrm8', left: 'két érmével mindkettő fej', right: '1/4' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Két kocka ↔ valószínűség',
    description: 'Két kockával dobunk. Számolj a 6 × 6-os táblázattal!',
    pairs: [
      { id: 'prrm9', left: 'az összeg 7', right: '1/6' },
      { id: 'prrm10', left: 'a szorzat nagyobb, mint 10', right: '17/36' },
      { id: 'prrm11', left: 'a szorzat négyzetszám', right: '2/9' },
      { id: 'prrm12', left: 'a szorzat páros', right: '3/4' },
      { id: 'prrm13', left: 'legalább az egyik hatos', right: '11/36' },
      { id: 'prrm14', left: 'a két szám különböző', right: '5/6' },
      { id: 'prrm15', left: 'az összeg 2', right: '1/36' },
      { id: 'prrm16', left: 'a szorzat 12', right: '1/9' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladat ↔ valószínűség',
    description: 'A tankönyvi feladatok eredményei – párosítsd őket!',
    pairs: [
      { id: 'prrm17', left: 'Carlsen világossal játszotta a játszmát', right: '765/1499' },
      { id: 'prrm18', left: 'Carlsen nyerte a játszmát', right: '634/1499' },
      { id: 'prrm19', left: 'Carlsen ellenfele sötéttel nyert', right: '78/1499' },
      { id: 'prrm20', left: '60 egy osztója 56-nak is osztója', right: '1/4' },
      { id: 'prrm21', left: '56 egy osztója 60-nak is osztója', right: '3/8' },
      { id: 'prrm22', left: '56 vagy 60 osztói közül választott szám közös osztó', right: '3/17' },
      { id: 'prrm23', left: '2 fiú, 2 lány: a lányok nem ülnek egymás mellett', right: '1/2' },
      { id: 'prrm24', left: '3 érmével legalább egy fej', right: '7/8' }
    ]
  }
};

export const ProbabilityReviewMatcher: React.FC<ProbabilityReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-valoszinuseg-ismetles-matcher',
  topicTitle = '7. Valószínűség – ismétlés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="valoszinuseg-ismetles"
      title={topicTitle}
      subtitle="Párosítsd a kocka-, érme- és tankönyvi eseményeket a valószínűségükkel!"
      levels={PROBABILITY_REVIEW_MATCHER_LEVELS}
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

export default ProbabilityReviewMatcher;
