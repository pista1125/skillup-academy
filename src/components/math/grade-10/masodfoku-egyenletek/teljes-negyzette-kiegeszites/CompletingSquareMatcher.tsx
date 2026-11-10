import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompletingSquareMatcherProps {
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
    title: 'Hiányos másodfokú egyenletek megoldásai',
    subtitle: 'Párosítsd a hiányos másodfokú egyenleteket a valós gyökeikkel!',
    pairs: [
      {
        id: 'csm1-1',
        prompt: 'x² - 9 = 0',
        value: 'x = ±3'
      },
      {
        id: 'csm1-2',
        prompt: 'x² - 5x = 0',
        value: 'x₁ = 0, x₂ = 5'
      },
      {
        id: 'csm1-3',
        prompt: '2x² - 32 = 0',
        value: 'x = ±4'
      },
      {
        id: 'csm1-4',
        prompt: 'x² + 7x = 0',
        value: 'x₁ = 0, x₂ = -7'
      },
      {
        id: 'csm1-5',
        prompt: '3x² - 12x = 0',
        value: 'x₁ = 0, x₂ = 4'
      },
      {
        id: 'csm1-6',
        prompt: 'x² + 16 = 0',
        value: 'Nincs valós gyök (∅)'
      },
      {
        id: 'csm1-7',
        prompt: '5x² = 0',
        value: 'x = 0 (kettős gyök)'
      },
      {
        id: 'csm1-8',
        prompt: '4x² - 100 = 0',
        value: 'x = ±5'
      }
    ]
  },
  2: {
    title: 'Kifejezések és a hiányzó saroktag (+d²)',
    subtitle: 'Párosítsd az x² + px kifejezést a teljes négyzetté egészítéshez szükséges (+d²) számmal!',
    pairs: [
      {
        id: 'csm2-1',
        prompt: 'x² + 6x',
        value: '+9 kell hozzá  [(x + 3)²]'
      },
      {
        id: 'csm2-2',
        prompt: 'x² - 8x',
        value: '+16 kell hozzá  [(x - 4)²]'
      },
      {
        id: 'csm2-3',
        prompt: 'x² + 10x',
        value: '+25 kell hozzá  [(x + 5)²]'
      },
      {
        id: 'csm2-4',
        prompt: 'x² - 4x',
        value: '+4 kell hozzá  [(x - 2)²]'
      },
      {
        id: 'csm2-5',
        prompt: 'x² + 14x',
        value: '+49 kell hozzá  [(x + 7)²]'
      },
      {
        id: 'csm2-6',
        prompt: 'x² - 12x',
        value: '+36 kell hozzá  [(x - 6)²]'
      },
      {
        id: 'csm2-7',
        prompt: 'x² + 2x',
        value: '+1 kell hozzá  [(x + 1)²]'
      },
      {
        id: 'csm2-8',
        prompt: 'x² - 20x',
        value: '+100 kell hozzá  [(x - 10)²]'
      }
    ]
  },
  3: {
    title: 'Egyenletek és a teljes négyzet alak ((x + d)² = k)',
    subtitle: 'Párosítsd a kifejezést a belőle adódó tiszta négyzetes alakkal és gyökökkel!',
    pairs: [
      {
        id: 'csm3-1',
        prompt: 'x² + 6x + 5 = 0',
        value: '(x + 3)² = 4  ⟹  x₁ = -1, x₂ = -5'
      },
      {
        id: 'csm3-2',
        prompt: 'x² - 4x - 5 = 0',
        value: '(x - 2)² = 9  ⟹  x₁ = 5, x₂ = -1'
      },
      {
        id: 'csm3-3',
        prompt: 'x² - 6x + 9 = 0',
        value: '(x - 3)² = 0  ⟹  x = 3'
      },
      {
        id: 'csm3-4',
        prompt: 'x² + 8x + 16 = 0',
        value: '(x + 4)² = 0  ⟹  x = -4'
      },
      {
        id: 'csm3-5',
        prompt: 'x² + 2x + 5 = 0',
        value: '(x + 1)² = -4  ⟹  Nincs valós gyök'
      },
      {
        id: 'csm3-6',
        prompt: 'x² - 10x + 21 = 0',
        value: '(x - 5)² = 4  ⟹  x₁ = 7, x₂ = 3'
      },
      {
        id: 'csm3-7',
        prompt: 'x² + 4x - 12 = 0',
        value: '(x + 2)² = 16  ⟹  x₁ = 2, x₂ = -6'
      },
      {
        id: 'csm3-8',
        prompt: 'x² - 2x + 10 = 0',
        value: '(x - 1)² = -9  ⟹  Nincs valós gyök'
      }
    ]
  }
};

export const CompletingSquareMatcher: React.FC<CompletingSquareMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-quad-teljes-negyzet-matcher',
  topicTitle = 'Teljes négyzetté kiegészítés'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      level1Pairs={matcherLevels[1].pairs}
      level2Pairs={matcherLevels[2].pairs}
      level3Pairs={matcherLevels[3].pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="amber"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={{
        1: { title: matcherLevels[1].title, subtitle: matcherLevels[1].subtitle },
        2: { title: matcherLevels[2].title, subtitle: matcherLevels[2].subtitle },
        3: { title: matcherLevels[3].title, subtitle: matcherLevels[3].subtitle }
      }}
    />
  );
};

