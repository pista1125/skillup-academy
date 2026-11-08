import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ScientificNotationMatcherProps {
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
    title: 'Hagyományos számok és normálalakjuk',
    subtitle: 'Párosítsd a tizedes helyiértékes alakban adott számokat a helyes normálalakjukkal!',
    pairs: [
      {
        id: 'snm1-1',
        prompt: '45 000',
        value: '4,5 · 10⁴'
      },
      {
        id: 'snm1-2',
        prompt: '3 800 000',
        value: '3,8 · 10⁶'
      },
      {
        id: 'snm1-3',
        prompt: '0,007',
        value: '7 · 10⁻³'
      },
      {
        id: 'snm1-4',
        prompt: '0,000 25',
        value: '2,5 · 10⁻⁴'
      },
      {
        id: 'snm1-5',
        prompt: '620',
        value: '6,2 · 10²'
      },
      {
        id: 'snm1-6',
        prompt: '0,081',
        value: '8,1 · 10⁻²'
      },
      {
        id: 'snm1-7',
        prompt: '500 000 000',
        value: '5 · 10⁸'
      },
      {
        id: 'snm1-8',
        prompt: '0,000 009',
        value: '9 · 10⁻⁶'
      }
    ]
  },
  2: {
    title: 'Műveletek normálalakban és újraigazítás',
    subtitle: 'Párosítsd a normálalakú műveleteket a szabványos végeredményükkel!',
    pairs: [
      {
        id: 'snm2-1',
        prompt: '(2 · 10⁴) · (3 · 10³)',
        value: '6 · 10⁷'
      },
      {
        id: 'snm2-2',
        prompt: '(4 · 10⁵) · (5 · 10³)',
        value: '2 · 10⁹'
      },
      {
        id: 'snm2-3',
        prompt: '(8 · 10⁶) : (2 · 10²)',
        value: '4 · 10⁴'
      },
      {
        id: 'snm2-4',
        prompt: '(1,5 · 10⁴) : (3 · 10¹)',
        value: '5 · 10²'
      },
      {
        id: 'snm2-5',
        prompt: '(3 · 10⁻⁴) · (2 · 10⁻³)',
        value: '6 · 10⁻⁷'
      },
      {
        id: 'snm2-6',
        prompt: '(6 · 10⁻²) : (3 · 10⁻⁵)',
        value: '2 · 10³'
      },
      {
        id: 'snm2-7',
        prompt: '(5 · 10⁵) + (4 · 10⁵)',
        value: '9 · 10⁵'
      },
      {
        id: 'snm2-8',
        prompt: '(8 · 10⁴) - (5 · 10⁴)',
        value: '3 · 10⁴'
      }
    ]
  },
  3: {
    title: 'SI mértékegység-prefixumok átváltása',
    subtitle: 'Párosítsd a prefixumos fizikai mennyiségeket az alapegységbeli normálalakjukkal!',
    pairs: [
      {
        id: 'snm3-1',
        prompt: '4,5 km méterben',
        value: '4,5 · 10³ m'
      },
      {
        id: 'snm3-2',
        prompt: '3,2 MW wattban',
        value: '3,2 · 10⁶ W'
      },
      {
        id: 'snm3-3',
        prompt: '8 GB bájtban',
        value: '8 · 10⁹ B'
      },
      {
        id: 'snm3-4',
        prompt: '1,5 TB bájtban',
        value: '1,5 · 10¹² B'
      },
      {
        id: 'snm3-5',
        prompt: '2,5 mm méterben',
        value: '2,5 · 10⁻³ m'
      },
      {
        id: 'snm3-6',
        prompt: '7 μm méterben',
        value: '7 · 10⁻⁶ m'
      },
      {
        id: 'snm3-7',
        prompt: '4 nm méterben',
        value: '4 · 10⁻⁹ m'
      },
      {
        id: 'snm3-8',
        prompt: '5 pm méterben',
        value: '5 · 10⁻¹² m'
      }
    ]
  }
};

export const ScientificNotationMatcher: React.FC<ScientificNotationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '4. Számok normálalakja'
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
      title="Számok normálalakja párosító játék"
      subtitle="Párosítsd a kifejezéseket a pontos normálalakjukkal és mértékegységükkel!"
      themeColor="emerald"
    />
  );
};

