import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RatioIntroMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Egész Számok Arányának Egyszerűsítése',
    subtitle: 'Keresd meg minden arány legegyszerűbb, relatív prím alakú párját!',
    pairs: [
      { id: 'rm1_1', prompt: '15 : 30', value: '1 : 2' },
      { id: 'rm1_2', prompt: '9 : 27', value: '1 : 3' },
      { id: 'rm1_3', prompt: '25 : 100', value: '1 : 4' },
      { id: 'rm1_4', prompt: '8 : 40', value: '1 : 5' },
      { id: 'rm1_5', prompt: '12 : 18', value: '2 : 3' },
      { id: 'rm1_6', prompt: '14 : 35', value: '2 : 5' },
      { id: 'rm1_7', prompt: '15 : 20', value: '3 : 4' },
      { id: 'rm1_8', prompt: '24 : 30', value: '4 : 5' }
    ]
  },
  2: {
    title: '2. Szint: Arányok Mértékegységek Átváltásával',
    subtitle: 'Váltsd közös mértékegységre a tagokat, majd egyszerűsítsd az arányt!',
    pairs: [
      { id: 'rm2_1', prompt: '50 cm : 1 m', value: '1 : 2' },
      { id: 'rm2_2', prompt: '20 perc : 1 óra', value: '1 : 3' },
      { id: 'rm2_3', prompt: '250 g : 1 kg', value: '1 : 4' },
      { id: 'rm2_4', prompt: '200 m : 1 km', value: '1 : 5' },
      { id: 'rm2_5', prompt: '10 perc : 1 óra', value: '1 : 6' },
      { id: 'rm2_6', prompt: '40 perc : 1 óra', value: '2 : 3' },
      { id: 'rm2_7', prompt: '400 g : 1 kg', value: '2 : 5' },
      { id: 'rm2_8', prompt: '45 perc : 1 óra', value: '3 : 4' }
    ]
  },
  3: {
    title: '3. Szint: Törtek és Tizedesek Egész Számaránya',
    subtitle: 'Bővítsd a törteket és tizedestörteket úgy, hogy legkisebb egész arányt kapj!',
    pairs: [
      { id: 'rm3_1', prompt: '0,4 : 1,2', value: '1 : 3' },
      { id: 'rm3_2', prompt: '1/2 : 1/4', value: '2 : 1' },
      { id: 'rm3_3', prompt: '1,5 : 0,5', value: '3 : 1' },
      { id: 'rm3_4', prompt: '3/4 : 1/2', value: '3 : 2' },
      { id: 'rm3_5', prompt: '0,2 : 1', value: '1 : 5' },
      { id: 'rm3_6', prompt: '2 : 0,5', value: '4 : 1' },
      { id: 'rm3_7', prompt: '2,5 : 1', value: '5 : 2' },
      { id: 'rm3_8', prompt: '0,6 : 1', value: '3 : 5' }
    ]
  }
};

export const RatioIntroMatcher: React.FC<RatioIntroMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-ratio-intro-matcher',
  topicTitle = 'Az arány fogalma (Párosító)'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      themeColor="orange"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
export default RatioIntroMatcher;
