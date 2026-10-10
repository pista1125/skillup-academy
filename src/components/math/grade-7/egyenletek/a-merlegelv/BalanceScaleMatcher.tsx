import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BalanceScaleMatcherProps {
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
    title: '1. Szint: Kezdőállapotok és Első Mérlegelv-Lépések',
    subtitle: 'Milyen ekvivalens művelettel célszerű elkezdeni a mérlegelv szerinti rendezést?',
    pairs: [
      {
        id: 'p1',
        prompt: '2x + 2 = x + 5 (Tk. 1. dobozos példa)',
        value: 'Első lépés: / - 2 (2x = x + 3)'
      },
      {
        id: 'p2',
        prompt: '3x + 2 = x + 12 (Tk. 2. példa)',
        value: 'Első lépés: / - 2 (3x = x + 10)'
      },
      {
        id: 'p3',
        prompt: '4x - 7 = 2x + 5 (Tk. 3. példa)',
        value: 'Első lépés: / + 7 (4x = 2x + 12)'
      },
      {
        id: 'p4',
        prompt: '1 - 4x = 10 - x (Tk. 5. példa)',
        value: 'Első lépés: / + x (1 - 3x = 10)'
      },
      {
        id: 'p5',
        prompt: '8x - 2 = 5x + 7 (Mf. 1/a)',
        value: 'Első lépés: / + 2 (8x = 5x + 9)'
      },
      {
        id: 'p6',
        prompt: '24 - 3x = 3x (Mf. 1/b)',
        value: 'Első lépés: / + 3x (24 = 6x)'
      },
      {
        id: 'p7',
        prompt: '4x + 2 = 2x + 10 (Mf. 2/a)',
        value: 'Első lépés: / - 2x (2x + 2 = 10)'
      },
      {
        id: 'p8',
        prompt: '5x + 12 = 9x - 16 (Mf. 2/b)',
        value: 'Első lépés: / - 5x (12 = 4x - 16)'
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenletek és Átrendezett Alakjaik',
    subtitle: 'Párosítsd az egyenletet azzal az egyszerűbb alakkal, amit egy mérlegelv lépéssel kapunk!',
    pairs: [
      {
        id: 'p9',
        prompt: '2x = x + 3 utáni / - x lépés',
        value: 'x = 3'
      },
      {
        id: 'p10',
        prompt: '3x = x + 10 utáni / - x lépés',
        value: '2x = 10'
      },
      {
        id: 'p11',
        prompt: '4x = 2x + 12 utáni / - 2x lépés',
        value: '2x = 12'
      },
      {
        id: 'p12',
        prompt: '-3x = 9 utáni / : (-3) lépés',
        value: 'x = -3'
      },
      {
        id: 'p13',
        prompt: '24 = 6x utáni / : 6 lépés',
        value: 'x = 4'
      },
      {
        id: 'p14',
        prompt: '12 = 4x - 16 utáni / + 16 lépés',
        value: '28 = 4x'
      },
      {
        id: 'p15',
        prompt: '4x - 7 = 29 utáni / + 7 lépés',
        value: '4x = 36'
      },
      {
        id: 'p16',
        prompt: '2x + 2 = 10 utáni / - 2 lépés',
        value: '2x = 8'
      }
    ]
  },
  3: {
    title: '3. Szint: Tankönyvi Egyenletek és Pontos Gyökeik',
    subtitle: 'Párosítsd az egyenleteket a helyes gyökükkel!',
    pairs: [
      {
        id: 'p17',
        prompt: '3x + 2 = x + 12 (Tk. 2. példa)',
        value: 'x = 5'
      },
      {
        id: 'p18',
        prompt: '4x - 7 = 2x + 5 (Tk. 3. példa)',
        value: 'x = 6'
      },
      {
        id: 'p19',
        prompt: '1 - 4x = 10 - x (Tk. 5. példa)',
        value: 'x = -3'
      },
      {
        id: 'p20',
        prompt: '6x - 2 = 5x + 7 (Tk. 2/a)',
        value: 'x = 9'
      },
      {
        id: 'p21',
        prompt: '4x + 2 = 2x + 22 (Tk. 2/b)',
        value: 'x = 10'
      },
      {
        id: 'p22',
        prompt: '5x + 12 = 9x - 16 (Mf. 2/b)',
        value: 'x = 7'
      },
      {
        id: 'p23',
        prompt: '6x + 14 = 9x - 10 (Mf. 2/d)',
        value: 'x = 8'
      },
      {
        id: 'p24',
        prompt: 'Csilla életkora: 5x + 26 = 7x (Mf. 4.)',
        value: 'x = 13 év'
      }
    ]
  }
};

export const BalanceScaleMatcher: React.FC<BalanceScaleMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-balance-matcher',
  topicTitle = 'A mérlegelv'
}) => {
  const activeLvl = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="sky"
    />
  );
};

export default BalanceScaleMatcher;
