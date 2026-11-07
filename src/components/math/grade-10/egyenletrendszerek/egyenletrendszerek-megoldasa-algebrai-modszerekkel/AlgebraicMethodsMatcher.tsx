import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AlgebraicMethodsMatcherProps {
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
    title: 'Egyenletrendszerek és Megoldáspárok',
    subtitle: 'Párosítsd a kétismeretlenes lineáris egyenletrendszereket a helyes (x; y) megoldáspárjukkal!',
    pairs: [
      {
        id: 'amm1-1',
        prompt: 'x + y = 7  és  x − y = 1',
        value: 'x = 4; y = 3 ⟹ (4; 3)'
      },
      {
        id: 'amm1-2',
        prompt: '2x + y = 10  és  3x − y = 5',
        value: 'x = 3; y = 4 ⟹ (3; 4)'
      },
      {
        id: 'amm1-3',
        prompt: 'x + 2y = 8  és  x = 2',
        value: 'x = 2; y = 3 ⟹ (2; 3)'
      },
      {
        id: 'amm1-4',
        prompt: '3x + 2y = 12  és  y = 3',
        value: 'x = 2; y = 3 ⟹ (2; 3)'
      },
      {
        id: 'amm1-5',
        prompt: '2x + 3y = 13  és  x − y = −1',
        value: 'x = 2; y = 3 ⟹ (2; 3)'
      },
      {
        id: 'amm1-6',
        prompt: '5x − 2y = 1  és  2x + y = 4',
        value: 'x = 1; y = 2 ⟹ (1; 2)'
      }
    ]
  },
  2: {
    title: 'Algebrai Lépések és Stratégiák',
    subtitle: 'Párosítsd az egyenletrendszert az egy lépésben leggyorsabban célhoz vezető algebrai művelettel!',
    pairs: [
      {
        id: 'amm2-1',
        prompt: '5x + 7y = 19  és  2x − 7y = −12',
        value: 'Közvetlen összeadás ⟹ y kiesik (7x = 7)'
      },
      {
        id: 'amm2-2',
        prompt: '3x + 4y = 10  és  x − 2y = 5',
        value: 'II-ből x kifejezése: x = 2y + 5'
      },
      {
        id: 'amm2-3',
        prompt: '2x + 3y = 8  és  4x − y = 2',
        value: 'II. beszorzása 3-mal ⟹ +3y és −3y ellentettek'
      },
      {
        id: 'amm2-4',
        prompt: '3x + 5y = 11  és  2x + 3y = 7',
        value: 'I. szorzása 2-vel, II. szorzása 3-mal ⟹ x együtthatója 6'
      },
      {
        id: 'amm2-5',
        prompt: '4x − 6y = 10  és  2x − 3y = 5',
        value: 'II. szorzása 2-vel ⟹ 0 = 0 (Azonosság, végtelen sok mo.)'
      },
      {
        id: 'amm2-6',
        prompt: '2x + y = 6  és  4x + 2y = 10',
        value: 'I. szorzása 2-vel és kivonás ⟹ 0 = 2 (Ellentmondás, ∅)'
      }
    ]
  },
  3: {
    title: 'Törtes és Összetett Rendszerek',
    subtitle: 'Párosítsd a magasabb szintű egyenletrendszereket a bevezetendő új ismeretlennel vagy eredménnyel!',
    pairs: [
      {
        id: 'amm3-1',
        prompt: '1/x + 1/y = 5  és  2/x − 1/y = 1',
        value: 'a = 1/x, b = 1/y ⟹ a=2, b=3 ⟹ (1/2; 1/3)'
      },
      {
        id: 'amm3-2',
        prompt: '3/(x+1) + 2/(y−1) = 5  és  1/(x+1) − 1/(y−1) = 0',
        value: 'u = 1/(x+1), v = 1/(y−1) ⟹ u=1, v=1 ⟹ (0; 2)'
      },
      {
        id: 'amm3-3',
        prompt: 'x + y + z = 6,  x − y = 0,  y + z = 5',
        value: 'x = 1, y = 1, z = 4 ⟹ (1; 1; 4)'
      },
      {
        id: 'amm3-4',
        prompt: 'x + y = 10  és  x · y = 21 (x > y)',
        value: 'Másodfokúvá alakul ⟹ (7; 3)'
      },
      {
        id: 'amm3-5',
        prompt: 'x + 2y + z = 8,  x + y = 3,  z = 3',
        value: 'z beírása: x+2y=5, x+y=3 ⟹ (1; 2; 3)'
      },
      {
        id: 'amm3-6',
        prompt: '2(x − y) = 6  és  (x + y)/2 = 5',
        value: 'x − y = 3 és x + y = 10 ⟹ (6,5; 3,5)'
      }
    ]
  }
};

export const AlgebraicMethodsMatcher: React.FC<AlgebraicMethodsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '2. Egyenletrendszerek megoldása algebrai módszerekkel'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="2. Egyenletrendszerek algebrai megoldása – Párosító Játék"
      subtitle="Párosítsd az egyenletrendszereket, megoldási stratégiákat és a végső számpárokat!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 8. LECKE"
      levels={matcherLevels}
      currentLevel={activeLvl}
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

