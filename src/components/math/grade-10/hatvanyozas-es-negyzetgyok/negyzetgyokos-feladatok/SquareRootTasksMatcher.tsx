import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SquareRootTasksMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Tényező kiemelése gyökjel alól',
    subtitle: 'Keresd meg a gyökös kifejezés legegyszerűbb, részlegesen gyökvont alakját!',
    pairs: [
      {
        id: 'srm1-1',
        prompt: '√8',
        value: '2√2'
      },
      {
        id: 'srm1-2',
        prompt: '√12',
        value: '2√3'
      },
      {
        id: 'srm1-3',
        prompt: '√18',
        value: '3√2'
      },
      {
        id: 'srm1-4',
        prompt: '√20',
        value: '2√5'
      },
      {
        id: 'srm1-5',
        prompt: '√27',
        value: '3√3'
      },
      {
        id: 'srm1-6',
        prompt: '√32',
        value: '4√2'
      },
      {
        id: 'srm1-7',
        prompt: '√50',
        value: '5√2'
      },
      {
        id: 'srm1-8',
        prompt: '√75',
        value: '5√3'
      }
    ]
  },
  2: {
    title: 'Tényező bevitele a gyökjel alá',
    subtitle: 'Vidd be a szorzótényezőt a gyökjel alá négyzetre emelve!',
    pairs: [
      {
        id: 'srm2-1',
        prompt: '2√5',
        value: '√20'
      },
      {
        id: 'srm2-2',
        prompt: '3√2',
        value: '√18'
      },
      {
        id: 'srm2-3',
        prompt: '4√3',
        value: '√48'
      },
      {
        id: 'srm2-4',
        prompt: '5√2',
        value: '√50'
      },
      {
        id: 'srm2-5',
        prompt: '6√2',
        value: '√72'
      },
      {
        id: 'srm2-6',
        prompt: '3√5',
        value: '√45'
      },
      {
        id: 'srm2-7',
        prompt: '2√7',
        value: '√28'
      },
      {
        id: 'srm2-8',
        prompt: '10√2',
        value: '√200'
      }
    ]
  },
  3: {
    title: 'Nevező gyöktelenítése és összevonás',
    subtitle: 'Párosítsd a kifejezést a gyöktelenített vagy összevont pontos alakjával!',
    pairs: [
      {
        id: 'srm3-1',
        prompt: '2 / √2',
        value: '√2'
      },
      {
        id: 'srm3-2',
        prompt: '6 / √3',
        value: '2√3'
      },
      {
        id: 'srm3-3',
        prompt: '10 / √5',
        value: '2√5'
      },
      {
        id: 'srm3-4',
        prompt: '12 / √6',
        value: '2√6'
      },
      {
        id: 'srm3-5',
        prompt: '14 / √7',
        value: '2√7'
      },
      {
        id: 'srm3-6',
        prompt: '√8 + √18',
        value: '5√2'
      },
      {
        id: 'srm3-7',
        prompt: '√50 - √8',
        value: '3√2'
      },
      {
        id: 'srm3-8',
        prompt: '√75 - √12',
        value: '3√3'
      }
    ]
  }
};

export const SquareRootTasksMatcher: React.FC<SquareRootTasksMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  allLevels = true
}) => {
  return (
    <MatcherTemplate
      title="Négyzetgyökös feladatok párosító"
      subtitle="Kiemelés a gyökjel alól, bevitel a gyökjel alá és a nevező gyöktelenítése"
      themeColor="amber"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      allLevels={allLevels}
    />
  );
};

export default SquareRootTasksMatcher;

