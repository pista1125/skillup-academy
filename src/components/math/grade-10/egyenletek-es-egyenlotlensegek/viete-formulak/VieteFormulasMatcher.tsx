import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  VieteFormulasDuoSvg,
  SignOfRootsDeductionSvg,
  SymmetricExpressionsSquareSvg,
  SymmetricExpressionsReciprocalSvg,
  MentalRootGuesserSvg
} from './VieteFormulasFigures';

interface VieteFormulasMatcherProps {
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
    title: 'Gyökök összege és szorzata alapvető egyenletekből',
    subtitle: 'Párosítsd a másodfokú egyenleteket a gyökeik összegével és szorzatával!',
    pairs: [
      {
        id: 'vfm1-1',
        prompt: 'x² - 7x + 10 = 0',
        promptFigure: <MentalRootGuesserSvg size={42} />,
        value: 'Összeg: 7, Szorzat: 10 (gyökök: 2 és 5)'
      },
      {
        id: 'vfm1-2',
        prompt: 'x² + 5x + 6 = 0',
        value: 'Összeg: -5, Szorzat: 6 (gyökök: -2 és -3)'
      },
      {
        id: 'vfm1-3',
        prompt: 'x² - 9 = 0',
        value: 'Összeg: 0, Szorzat: -9 (gyökök: 3 és -3)'
      },
      {
        id: 'vfm1-4',
        prompt: 'x² - 4x = 0',
        value: 'Összeg: 4, Szorzat: 0 (gyökök: 0 és 4)'
      },
      {
        id: 'vfm1-5',
        prompt: '2x² - 6x + 4 = 0',
        promptFigure: <VieteFormulasDuoSvg size={42} />,
        value: 'Összeg: 3, Szorzat: 2 (-b/a = 6/2 = 3, c/a = 4/2 = 2)'
      },
      {
        id: 'vfm1-6',
        prompt: 'x² + 8x - 9 = 0',
        value: 'Összeg: -8, Szorzat: -9 (gyökök: 1 és -9)'
      },
      {
        id: 'vfm1-7',
        prompt: '3x² - 12x + 9 = 0',
        value: 'Összeg: 4, Szorzat: 3 (-b/a = 12/3 = 4, c/a = 9/3 = 3)'
      },
      {
        id: 'vfm1-8',
        prompt: 'x² - 6x + 9 = 0',
        value: 'Összeg: 6, Szorzat: 9 (kettős gyök: 3 + 3 = 6, 3 · 3 = 9)'
      }
    ]
  },
  2: {
    title: 'Szimmetrikus kifejezések és reciprok összegek',
    subtitle: 'Párosítsd a kifejezéseket a Viète-formulákból számított pontos értékükkel!',
    pairs: [
      {
        id: 'vfm2-1',
        prompt: 'x₁² + x₂² azonossága',
        promptFigure: <SymmetricExpressionsSquareSvg size={42} />,
        value: '(x₁ + x₂)² - 2x₁x₂ (a négyzetösszeg szimmetrikus alakja)'
      },
      {
        id: 'vfm2-2',
        prompt: '1/x₁ + 1/x₂ azonossága',
        promptFigure: <SymmetricExpressionsReciprocalSvg size={42} />,
        value: '(x₁ + x₂) / (x₁x₂) = -b / c (közös nevezőre hozva)'
      },
      {
        id: 'vfm2-3',
        prompt: 'x² - 4x + 1 = 0 esetén x₁² + x₂²',
        value: '14 (mivel 4² - 2·1 = 16 - 2 = 14)'
      },
      {
        id: 'vfm2-4',
        prompt: 'x² - 5x + 2 = 0 esetén 1/x₁ + 1/x₂',
        value: '2,5 (-b/c = -(-5)/2 = 5/2 = 2,5)'
      },
      {
        id: 'vfm2-5',
        prompt: '2x² - 6x - 1 = 0 esetén x₁² + x₂²',
        value: '10 (összeg: 3, szorzat: -0,5 ⟹ 3² - 2·(-0,5) = 9 + 1 = 10)'
      },
      {
        id: 'vfm2-6',
        prompt: '(x₁ - x₂)² szimmetrikus azonossága',
        value: '(x₁ + x₂)² - 4x₁x₂ = D / a²'
      },
      {
        id: 'vfm2-7',
        prompt: 'x² - 3x - 4 = 0 esetén (x₁ - x₂)²',
        value: '25 (3² - 4·(-4) = 9 + 16 = 25, gyökök: 4 és -1)'
      },
      {
        id: 'vfm2-8',
        prompt: 'x² + 6x + 3 = 0 esetén 1/x₁ + 1/x₂',
        value: '-2 (-b/c = -6 / 3 = -2)'
      }
    ]
  },
  3: {
    title: 'Paraméteres feladatok, előjelek és összetett azonosságok',
    subtitle: 'Párosítsd a paramétereket, előjel-megállapításokat és magasabb fokú azonosságokat!',
    pairs: [
      {
        id: 'vfm3-1',
        prompt: '3x² - 8x + m = 0 reciprok gyökökkel',
        value: 'm = 3 (reciprok szorzat: x₁x₂ = m/3 = 1 ⟹ m = 3)'
      },
      {
        id: 'vfm3-2',
        prompt: 'x² - mx + 12 = 0, ha x₁ = 3',
        value: 'm = 7 (x₂ = 12/3 = 4 ⟹ m = 3 + 4 = 7)'
      },
      {
        id: 'vfm3-3',
        prompt: '3x² - 17x + 2 = 0 gyökeinek előjele',
        promptFigure: <SignOfRootsDeductionSvg size={42} />,
        value: 'Mindkét gyök szigorúan pozitív (+, +) (szorzat > 0, összeg > 0)'
      },
      {
        id: 'vfm3-4',
        prompt: '2x² + 11x + 3 = 0 gyökeinek előjele',
        value: 'Mindkét gyök szigorúan negatív (-, -) (szorzat > 0, összeg < 0)'
      },
      {
        id: 'vfm3-5',
        prompt: '5x² + 4x - 7 = 0 gyökeinek előjele',
        value: 'Egy pozitív és egy negatív gyök (+, -) (szorzat c/a < 0)'
      },
      {
        id: 'vfm3-6',
        prompt: 'x₁³ + x₂³ szimmetrikus azonossága',
        value: '(x₁ + x₂)³ - 3x₁x₂(x₁ + x₂) (köbösszeg azonossága)'
      },
      {
        id: 'vfm3-7',
        prompt: 'x² - 4x + 2 = 0 esetén x₁³ + x₂³',
        value: '40 (4³ - 3·2·4 = 64 - 24 = 40)'
      },
      {
        id: 'vfm3-8',
        prompt: 'x² + kx + 16 = 0 egyenlő gyökökkel',
        value: 'k = ±8 (D = k² - 64 = 0 ⟹ k = ±8)'
      }
    ]
  }
};

export const VieteFormulasMatcher: React.FC<VieteFormulasMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-viete-formulak-matcher',
  topicTitle = 'Viète-formulák – Párosító'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="amber"
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

