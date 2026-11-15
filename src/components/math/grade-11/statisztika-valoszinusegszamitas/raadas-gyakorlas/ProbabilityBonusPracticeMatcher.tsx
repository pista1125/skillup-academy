import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityBonusPracticeMatcherProps {
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

const PROBABILITY_BONUS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Védekező erő ↔ valószínűség',
    description: 'Két kockával dobunk, a védekező erő a nagyobbik dobás. Párosítsd az eseményt a valószínűségével!',
    pairs: [
      { id: 'pbpm1', left: 'az erő 1', right: '1/36' },
      { id: 'pbpm2', left: 'az erő 2', right: '1/12' },
      { id: 'pbpm3', left: 'az erő 3', right: '5/36' },
      { id: 'pbpm4', left: 'az erő 4', right: '7/36' },
      { id: 'pbpm5', left: 'az erő 5', right: '1/4' },
      { id: 'pbpm6', left: 'az erő 6', right: '11/36' },
      { id: 'pbpm7', left: 'az erő legalább 5', right: '5/9' },
      { id: 'pbpm8', left: 'az erő kisebb, mint 3', right: '1/9' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Sorban állás és kifejezések ↔ valószínűség',
    description: '6 gyerek (köztük Sári és Dóri) áll sorba; illetve n ∈ {1, 2, …, 9} véletlenszerű.',
    pairs: [
      { id: 'pbpm9', left: 'Sári áll legelöl', right: '1/6' },
      { id: 'pbpm10', left: 'nem Dóri áll leghátul', right: '5/6' },
      { id: 'pbpm11', left: 'Sári az első, Dóri a második', right: '1/30' },
      { id: 'pbpm12', left: 'Sári és Dóri egymás mögött áll', right: '1/3' },
      { id: 'pbpm13', left: '2ⁿ természetes szám', right: '1' },
      { id: 'pbpm14', left: '(1/2)ⁿ természetes szám', right: '0' },
      { id: 'pbpm15', left: 'log₂ n természetes szám', right: '4/9' },
      { id: 'pbpm16', left: 'log₀,₅ n természetes szám', right: '1/9' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladat ↔ valószínűség',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pbpm17', left: 'a kiborult almák közül jonatánt választunk', right: '5/9' },
      { id: 'pbpm18', left: 'a dominó illeszthető az 1–5-ös kőhöz', right: '4/9' },
      { id: 'pbpm19', left: 'Molnár úr másodszorra nyitja ki a kaput', right: '1/4' },
      { id: 'pbpm20', left: 'a 9 kockaösszegből A relatív gyakorisága', right: '1/3' },
      { id: 'pbpm21', left: 'a kiválasztott vívó nő', right: '8/13' },
      { id: 'pbpm22', left: 'a kiválasztott vívó érmes', right: '5/13' },
      { id: 'pbpm23', left: 'a lövés a középső (r = 1) körbe talál (R = 5)', right: '1/25' },
      { id: 'pbpm24', left: 'a dominó illeszthető a 6–6-os kőhöz', right: '2/9' }
    ]
  }
};

export const ProbabilityBonusPracticeMatcher: React.FC<ProbabilityBonusPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-raadas-gyakorlas-matcher',
  topicTitle = '8. Ráadás – Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="raadas-gyakorlas"
      title={topicTitle}
      subtitle="Párosítsd a kockás, sorrendes és tankönyvi eseményeket a valószínűségükkel!"
      levels={PROBABILITY_BONUS_MATCHER_LEVELS}
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

export default ProbabilityBonusPracticeMatcher;
