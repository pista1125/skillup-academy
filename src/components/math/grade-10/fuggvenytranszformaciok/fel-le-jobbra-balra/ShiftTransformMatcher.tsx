import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ShiftTransformMatcherProps {
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
    title: 'Alapfüggvények és egyirányú eltolások',
    subtitle: 'Párosítsd a hozzárendelési szabályokat a transzformáció pontos irányával és mértékével!',
    pairs: [
      {
        id: 'stm1-1',
        prompt: 'f(x) = |x| + 4',
        value: 'Abszolútérték fel 4-gyel'
      },
      {
        id: 'stm1-2',
        prompt: 'f(x) = |x - 5|',
        value: 'Abszolútérték jobbra 5-tel'
      },
      {
        id: 'stm1-3',
        prompt: 'f(x) = |x + 3|',
        value: 'Abszolútérték balra 3-mal'
      },
      {
        id: 'stm1-4',
        prompt: 'f(x) = |x| - 6',
        value: 'Abszolútérték le 6-tal'
      },
      {
        id: 'stm1-5',
        prompt: 'f(x) = √x + 2',
        value: 'Négyzetgyök fel 2-vel'
      },
      {
        id: 'stm1-6',
        prompt: 'f(x) = √(x - 7)',
        value: 'Négyzetgyök jobbra 7-tel'
      },
      {
        id: 'stm1-7',
        prompt: 'f(x) = √(x + 1)',
        value: 'Négyzetgyök balra 1-gyel'
      },
      {
        id: 'stm1-8',
        prompt: 'f(x) = 1/x - 3',
        value: 'Hiperbola le 3-mal'
      }
    ]
  },
  2: {
    title: 'Képletek és eltolásvektorok',
    subtitle: 'Párosítsd az együttes transzformációkat az eltolásvektoruk pontos koordinátáival!',
    pairs: [
      {
        id: 'stm2-1',
        prompt: 'f(x) = (x - 4)² + 3',
        value: 'v(4; 3) vektor'
      },
      {
        id: 'stm2-2',
        prompt: 'f(x) = |x + 2| - 5',
        value: 'v(-2; -5) vektor'
      },
      {
        id: 'stm2-3',
        prompt: 'f(x) = √(x - 6) - 1',
        value: 'v(6; -1) vektor'
      },
      {
        id: 'stm2-4',
        prompt: 'f(x) = |x - 1| + 8',
        value: 'v(1; 8) vektor'
      },
      {
        id: 'stm2-5',
        prompt: 'f(x) = (x + 7)² + 2',
        value: 'v(-7; 2) vektor'
      },
      {
        id: 'stm2-6',
        prompt: 'f(x) = √(x + 3) + 4',
        value: 'v(-3; 4) vektor'
      },
      {
        id: 'stm2-7',
        prompt: 'f(x) = 1/(x - 5) - 2',
        value: 'v(5; -2) vektor'
      },
      {
        id: 'stm2-8',
        prompt: 'f(x) = (x - 9)² - 6',
        value: 'v(9; -6) vektor'
      }
    ]
  },
  3: {
    title: 'Transzformációk, kitüntetett pontok és tartományok',
    subtitle: 'Párosítsd a függvényeket a helyes kitüntetett pontjukkal vagy értékkészletükkel!',
    pairs: [
      {
        id: 'stm3-1',
        prompt: 'f(x) = |x - 3| + 2',
        value: 'Töréspont: V(3; 2), Rf = [2; ∞['
      },
      {
        id: 'stm3-2',
        prompt: 'f(x) = √(x - 4) + 1',
        value: 'Kezdőpont: K(4; 1), Df = [4; ∞['
      },
      {
        id: 'stm3-3',
        prompt: 'f(x) = (x + 5)² - 3',
        value: 'Csúcspont: T(-5; -3), Rf = [-3; ∞['
      },
      {
        id: 'stm3-4',
        prompt: 'f(x) = |x + 6| - 1',
        value: 'Töréspont: V(-6; -1), Zérushelyek: 2 db'
      },
      {
        id: 'stm3-5',
        prompt: 'f(x) = √(x + 2) - 3',
        value: 'Kezdőpont: K(-2; -3), Df = [-2; ∞['
      },
      {
        id: 'stm3-6',
        prompt: 'f(x) = 1/(x - 2) + 4',
        value: 'Aszimptoták: x = 2 és y = 4'
      },
      {
        id: 'stm3-7',
        prompt: 'f(x) = |x - 7| + 5',
        value: 'Töréspont: V(7; 5), Nincs zérushelye'
      },
      {
        id: 'stm3-8',
        prompt: 'f(x) = (x - 1)² + 10',
        value: 'Minimum helye x = 1, értéke 10'
      }
    ]
  }
};

export const ShiftTransformMatcher: React.FC<ShiftTransformMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = '„Fel”-, „le”, „jobbra”-, „balra”'
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
    />
  );
};

