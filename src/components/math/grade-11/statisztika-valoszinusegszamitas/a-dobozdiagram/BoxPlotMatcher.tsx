import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BoxPlotMatcherProps {
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

const BOX_PLOT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalom ↔ jelentés',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'bpm1', left: 'Q₀', right: 'minimum (a legkisebb adat)' },
      { id: 'bpm2', left: 'Q₁', right: 'alsó kvartilis (az alsó „fél” mediánja)' },
      { id: 'bpm3', left: 'Q₂', right: 'medián' },
      { id: 'bpm4', left: 'Q₃', right: 'felső kvartilis (a felső „fél” mediánja)' },
      { id: 'bpm5', left: 'Q₄', right: 'maximum (a legnagyobb adat)' },
      { id: 'bpm6', left: 'terjedelem', right: 'Q₄ − Q₀' },
      { id: 'bpm7', left: 'félterjedelem', right: 'Q₃ − Q₁' },
      { id: 'bpm8', left: 'felfelé kiugró adat', right: 'legalább Q₃ + 1,5 · (Q₃ − Q₁)' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsokaság ↔ medián',
    description: 'Rendezd sorba az adatokat fejben, és párosítsd a mediánjukkal!',
    pairs: [
      { id: 'bpm9', left: '3; 5; 8', right: '5' },
      { id: 'bpm10', left: '2; 4; 8; 12', right: '6' },
      { id: 'bpm11', left: '1; 1; 2; 9; 9', right: '2' },
      { id: 'bpm12', left: '7; 3; 5; 1', right: '4' },
      { id: 'bpm13', left: '10; 20; 30; 40; 50; 60', right: '35' },
      { id: 'bpm14', left: '4; 4; 5; 7; 9; 12; 13', right: '7' },
      { id: 'bpm15', left: '12; 15; 11; 18; 14', right: '14' },
      { id: 'bpm16', left: '0; 2; 2; 3; 8; 8; 9; 10', right: '5,5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Adatsokaság ↔ (Q₁; medián; Q₃)',
    description: 'Határozd meg a kvartiliseket és a mediánt, és párosítsd!',
    pairs: [
      { id: 'bpm17', left: '1 2 3 3 4 5 6 6', right: 'Q₁ = 2,5; Me = 3,5; Q₃ = 5,5' },
      { id: 'bpm18', left: '1 2 3 3 4 5 5 6 6', right: 'Q₁ = 2,5; Me = 4; Q₃ = 5,5' },
      { id: 'bpm19', left: '1 2 3 3 4 5 5 6 6 7', right: 'Q₁ = 3; Me = 4,5; Q₃ = 6' },
      { id: 'bpm20', left: '1 2 3 3 4 5 5 6 6 7 8', right: 'Q₁ = 3; Me = 5; Q₃ = 6' },
      { id: 'bpm21', left: '4 5 5 7 8 8 8 8 10 10 12', right: 'Q₁ = 5; Me = 8; Q₃ = 10' },
      { id: 'bpm22', left: '3 7 8 12 15 18 20', right: 'Q₁ = 7; Me = 12; Q₃ = 18' },
      { id: 'bpm23', left: '2 10 11 12 13 14 15 16 30', right: 'Q₁ = 10,5; Me = 13; Q₃ = 15,5' },
      { id: 'bpm24', left: '0 2 2 3 8 8 9 10', right: 'Q₁ = 2; Me = 5,5; Q₃ = 8,5' }
    ]
  }
};

export const BoxPlotMatcher: React.FC<BoxPlotMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-dobozdiagram-matcher',
  topicTitle = '3. A dobozdiagram – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="a-dobozdiagram"
      title={topicTitle}
      subtitle="Párosítsd a dobozdiagram fogalmait, az adatsokaságokat a mediánjukkal, majd a kvartiliseikkel!"
      levels={BOX_PLOT_MATCHER_LEVELS}
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

export default BoxPlotMatcher;
