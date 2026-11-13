import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  RootFactorFormulaSvg,
  MissingLeadingCoeffTrapSvg,
  FractionSimplificationSvg,
  DiscriminantCasesFactorSvg,
  ConstructEquationFromRootsSvg
} from './RootFactorizationFigures';

interface RootFactorizationMatcherProps {
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
    title: 'Alapvető polinomok szorzattá alakítása (a = 1)',
    subtitle: 'Párosítsd a másodfokú polinomokat a helyes gyöktényezős alakjukkal!',
    pairs: [
      {
        id: 'rfm1-1',
        prompt: 'x² - 5x + 6',
        promptFigure: <RootFactorFormulaSvg size={42} />,
        value: '(x - 2)(x - 3) (gyökök: 2 és 3)'
      },
      {
        id: 'rfm1-2',
        prompt: 'x² - 4',
        value: '(x - 2)(x + 2) (két négyzet különbsége)'
      },
      {
        id: 'rfm1-3',
        prompt: 'x² + 2x - 3',
        value: '(x + 3)(x - 1) (gyökök: -3 és 1)'
      },
      {
        id: 'rfm1-4',
        prompt: 'x² - 6x + 9',
        promptFigure: <DiscriminantCasesFactorSvg size={42} />,
        value: '(x - 3)² (D = 0, teljes négyzet)'
      },
      {
        id: 'rfm1-5',
        prompt: 'x² + 7x + 10',
        value: '(x + 2)(x + 5) (gyökök: -2 és -5)'
      },
      {
        id: 'rfm1-6',
        prompt: 'x² - x - 12',
        value: '(x - 4)(x + 3) (gyökök: 4 és -3)'
      },
      {
        id: 'rfm1-7',
        prompt: 'x² - 4x',
        value: 'x(x - 4) (kiemeléssel: zérushelyek 0 és 4)'
      },
      {
        id: 'rfm1-8',
        prompt: 'x² + 9',
        value: 'Nem bontható valós szorzatra (D = -36 < 0)'
      }
    ]
  },
  2: {
    title: 'Főegyütthatós polinomok (a ≠ 1) és tört-egyszerűsítés',
    subtitle: 'Párosítsd a kiemelt főegyütthatós alakokat és az egyszerűsített algebrai törteket!',
    pairs: [
      {
        id: 'rfm2-1',
        prompt: '2x² - 8x + 6',
        promptFigure: <MissingLeadingCoeffTrapSvg size={42} />,
        value: '2 · (x - 1)(x - 3) (kiemelt a = 2 főegyütthatóval)'
      },
      {
        id: 'rfm2-2',
        prompt: '3x² + 6x + 3',
        value: '3 · (x + 1)² (kiemelt 3-assal teljes négyzet)'
      },
      {
        id: 'rfm2-3',
        prompt: '-x² + 4x - 3',
        value: '-(x - 1)(x - 3) (negatív főegyüttható: a = -1)'
      },
      {
        id: 'rfm2-4',
        prompt: '(x² - 4) / (x - 2)',
        promptFigure: <FractionSimplificationSvg size={42} />,
        value: 'x + 2 (kikötés: x ≠ 2)'
      },
      {
        id: 'rfm2-5',
        prompt: '(x² - 5x + 6) / (x - 3)',
        value: 'x - 2 (kikötés: x ≠ 3)'
      },
      {
        id: 'rfm2-6',
        prompt: '2x² + 5x - 3',
        value: '(2x - 1)(x + 3) (gyökök: 1/2 és -3, a = 2)'
      },
      {
        id: 'rfm2-7',
        prompt: '(3x² - 12) / (x + 2)',
        value: '3 · (x - 2) (kikötés: x ≠ -2)'
      },
      {
        id: 'rfm2-8',
        prompt: '4x² - 12x + 9',
        value: '(2x - 3)² (kettős gyök: x = 1,5)'
      }
    ]
  },
  3: {
    title: 'Összetett törtek, egyenletalkotás és speciális esetek',
    subtitle: 'Párosítsd a gyökökből alkotott egyenleteket és összetett törteket!',
    pairs: [
      {
        id: 'rfm3-1',
        prompt: 'Gyökök: x₁ = -2, x₂ = 5',
        promptFigure: <ConstructEquationFromRootsSvg size={42} />,
        value: 'x² - 3x - 10 = 0 ((x + 2)(x - 5) = 0)'
      },
      {
        id: 'rfm3-2',
        prompt: 'Gyökök: x₁ = 3, x₂ = 3',
        value: 'x² - 6x + 9 = 0 ((x - 3)² = 0)'
      },
      {
        id: 'rfm3-3',
        prompt: '(2x² - 4x - 6) / (2x - 6)',
        value: 'x + 1 (kikötés: x ≠ 3, mert 2(x-3)(x+1) / 2(x-3))'
      },
      {
        id: 'rfm3-4',
        prompt: '(x² - 1) / (x² - 2x + 1)',
        value: '(x + 1) / (x - 1) (kikötés: x ≠ 1)'
      },
      {
        id: 'rfm3-5',
        prompt: '2x² + 2x + 5',
        promptFigure: <DiscriminantCasesFactorSvg size={42} />,
        value: 'Nem bontható valós szorzatra (D = -36 < 0)'
      },
      {
        id: 'rfm3-6',
        prompt: 'Gyökök: x₁ = 0, x₂ = -4',
        value: 'x² + 4x = 0 (szorzat: x(x + 4) = 0)'
      },
      {
        id: 'rfm3-7',
        prompt: '(x² - 9) / (2x² - 5x - 3)',
        value: '(x + 3) / (2x + 1) (kikötés: x ≠ 3 és x ≠ -1/2)'
      },
      {
        id: 'rfm3-8',
        prompt: '-2x² + 2x + 12',
        value: '-2 · (x + 2)(x - 3) (gyökök: -2 és 3)'
      }
    ]
  }
};

export const RootFactorizationMatcher: React.FC<RootFactorizationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-polinom-gyoktenyezos-alakja-matcher',
  topicTitle = 'Polinom gyöktényezős alakja – Párosító'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
      level={activeLevel}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

