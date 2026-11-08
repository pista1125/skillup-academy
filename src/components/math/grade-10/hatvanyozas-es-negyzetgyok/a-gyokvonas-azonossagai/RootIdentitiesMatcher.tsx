import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RootIdentitiesMatcherProps {
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
    title: 'Négyzetszámok és alapvető négyzetgyökök',
    subtitle: 'Párosítsd a négyzetgyökös kifejezéseket a pontos egész számértékükkel!',
    pairs: [
      {
        id: 'rim1-1',
        prompt: '√49',
        value: '7'
      },
      {
        id: 'rim1-2',
        prompt: '√64',
        value: '8'
      },
      {
        id: 'rim1-3',
        prompt: '√81',
        value: '9'
      },
      {
        id: 'rim1-4',
        prompt: '√100',
        value: '10'
      },
      {
        id: 'rim1-5',
        prompt: '√121',
        value: '11'
      },
      {
        id: 'rim1-6',
        prompt: '√144',
        value: '12'
      },
      {
        id: 'rim1-7',
        prompt: '√169',
        value: '13'
      },
      {
        id: 'rim1-8',
        prompt: '√225',
        value: '15'
      }
    ]
  },
  2: {
    title: 'Szorzat és hányados négyzetgyöke',
    subtitle: 'Vond össze a tényezőket közös gyökjel alá, és párosítsd az eredménnyel!',
    pairs: [
      {
        id: 'rim2-1',
        prompt: '√2 · √8',
        value: '4'
      },
      {
        id: 'rim2-2',
        prompt: '√75 : √3',
        value: '5'
      },
      {
        id: 'rim2-3',
        prompt: '√72 : √2',
        value: '6'
      },
      {
        id: 'rim2-4',
        prompt: '√98 : √2',
        value: '7'
      },
      {
        id: 'rim2-5',
        prompt: '√2 · √32',
        value: '8'
      },
      {
        id: 'rim2-6',
        prompt: '√3 · √27',
        value: '9'
      },
      {
        id: 'rim2-7',
        prompt: '√5 · √20',
        value: '10'
      },
      {
        id: 'rim2-8',
        prompt: '√8 · √18',
        value: '12'
      }
    ]
  },
  3: {
    title: 'Abszolút érték és kiemelés gyökjel alól',
    subtitle: 'Párosítsd a négyzetgyökös feladványokat a legegyszerűbb alakjukkal!',
    pairs: [
      {
        id: 'rim3-1',
        prompt: '√((-9)²)',
        value: '9'
      },
      {
        id: 'rim3-2',
        prompt: '√((-14)²)',
        value: '14'
      },
      {
        id: 'rim3-3',
        prompt: '√((-25)²)',
        value: '25'
      },
      {
        id: 'rim3-4',
        prompt: '√12',
        value: '2√3'
      },
      {
        id: 'rim3-5',
        prompt: '√18',
        value: '3√2'
      },
      {
        id: 'rim3-6',
        prompt: '√20',
        value: '2√5'
      },
      {
        id: 'rim3-7',
        prompt: '√27',
        value: '3√3'
      },
      {
        id: 'rim3-8',
        prompt: '√50',
        value: '5√2'
      }
    ]
  }
};

export const RootIdentitiesMatcher: React.FC<RootIdentitiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '5. A gyökvonás azonosságai'
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
      title="A gyökvonás azonosságai párosító játék"
      subtitle="Párosítsd a gyökös kifejezéseket a pontos számértékükkel!"
      themeColor="teal"
    />
  );
};
