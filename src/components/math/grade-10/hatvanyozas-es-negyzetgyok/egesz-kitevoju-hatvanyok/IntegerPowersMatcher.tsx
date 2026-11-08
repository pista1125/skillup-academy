import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface IntegerPowersMatcherProps {
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
    title: 'Alapvető negatív és nulla kitevők',
    subtitle: 'Párosítsd az egyszerű egész kitevős hatványokat a pontos számértékükkel!',
    pairs: [
      {
        id: 'ipm1-1',
        prompt: '2⁻¹',
        value: '0,5'
      },
      {
        id: 'ipm1-2',
        prompt: '2⁻³',
        value: '1/8'
      },
      {
        id: 'ipm1-3',
        prompt: '3⁻²',
        value: '1/9'
      },
      {
        id: 'ipm1-4',
        prompt: '5⁰',
        value: '1'
      },
      {
        id: 'ipm1-5',
        prompt: '10⁻²',
        value: '0,01'
      },
      {
        id: 'ipm1-6',
        prompt: '(-2)⁻¹',
        value: '-0,5'
      },
      {
        id: 'ipm1-7',
        prompt: '4⁻¹',
        value: '0,25'
      },
      {
        id: 'ipm1-8',
        prompt: '10⁻¹',
        value: '0,1'
      }
    ]
  },
  2: {
    title: 'Törtek negatív hatványai és előjelek',
    subtitle: 'Párosítsd a reciprok szabállyal és előjellel ellátott kifejezéseket az értékükkel!',
    pairs: [
      {
        id: 'ipm2-1',
        prompt: '(½)⁻³',
        value: '8'
      },
      {
        id: 'ipm2-2',
        prompt: '(⅔)⁻¹',
        value: '3/2'
      },
      {
        id: 'ipm2-3',
        prompt: '(¾)⁻²',
        value: '16/9'
      },
      {
        id: 'ipm2-4',
        prompt: '(-2)⁻³',
        value: '-1/8'
      },
      {
        id: 'ipm2-5',
        prompt: '(-2)⁻⁴',
        value: '+1/16'
      },
      {
        id: 'ipm2-6',
        prompt: '-2⁻⁴',
        value: '-1/16'
      },
      {
        id: 'ipm2-7',
        prompt: '(⅕)⁻²',
        value: '25'
      },
      {
        id: 'ipm2-8',
        prompt: '(0,1)⁻²',
        value: '100'
      }
    ]
  },
  3: {
    title: 'Egész kitevőjű hatványok műveletei és azonosságai',
    subtitle: 'Párosítsd a hatványkifejezések szorzatát, hányadosát a legegyszerűbb végeredménnyel!',
    pairs: [
      {
        id: 'ipm3-1',
        prompt: '2³ · 2⁻⁵',
        value: '1/4'
      },
      {
        id: 'ipm3-2',
        prompt: '3⁻⁴ : 3⁻²',
        value: '1/9'
      },
      {
        id: 'ipm3-3',
        prompt: '(2⁻²)⁻³',
        value: '64'
      },
      {
        id: 'ipm3-4',
        prompt: '5⁻³ · 2⁻³',
        value: '0,001'
      },
      {
        id: 'ipm3-5',
        prompt: '10⁻⁴ : 10⁻²',
        value: '0,01'
      },
      {
        id: 'ipm3-6',
        prompt: '8⁻² · 4³',
        value: '1'
      },
      {
        id: 'ipm3-7',
        prompt: '(⅓)⁻³ : 3²',
        value: '3'
      },
      {
        id: 'ipm3-8',
        prompt: '6⁻¹ · 3',
        value: '1/2'
      }
    ]
  }
};

export const IntegerPowersMatcher: React.FC<IntegerPowersMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '2. Egész kitevőjű hatványok'
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
      title="Egész kitevőjű hatványok párosító játék"
      subtitle="Párosítsd a negatív és nulla kitevős kifejezéseket a pontos számértékükkel!"
      themeColor="indigo"
    />
  );
};

