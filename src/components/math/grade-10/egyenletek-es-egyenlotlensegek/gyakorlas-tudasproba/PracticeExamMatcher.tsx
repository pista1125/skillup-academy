import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SynthesisConceptMapSvg,
  ExamChecklistTreeSvg,
  InequalityRegionsSvg,
  NonlinearSystemsIntersectionSvg,
  GradingRubricTrophySvg
} from './PracticeExamFigures';

interface PracticeExamMatcherProps {
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
    title: 'Fejezeti alapok: Egyenletek és valós gyökeik',
    subtitle: 'Párosítsd a másodfokú, hiányos és gyökös egyenleteket a pontos gyökeikkel!',
    pairs: [
      {
        id: 'pem1-1',
        prompt: '2x² - 18 = 0',
        promptFigure: <SynthesisConceptMapSvg size={42} />,
        value: 'x₁ = -3, x₂ = 3 (hiányos: x² = 9)'
      },
      {
        id: 'pem1-2',
        prompt: 'x² - 8x + 15 = 0',
        value: 'x₁ = 3, x₂ = 5 (összeg: 8, szorzat: 15)'
      },
      {
        id: 'pem1-3',
        prompt: 'x² + 6x = 0',
        value: 'x₁ = -6, x₂ = 0 (kiemelés: x(x + 6) = 0)'
      },
      {
        id: 'pem1-4',
        prompt: '√(2x + 1) = 3',
        value: 'x = 4 (2x + 1 = 9)'
      },
      {
        id: 'pem1-5',
        prompt: 'x + y = 6  és  xy = 8',
        value: 'M = {(2; 4); (4; 2)}'
      },
      {
        id: 'pem1-6',
        prompt: '(x - 2)(x + 5) = 0',
        value: 'x₁ = -5, x₂ = 2'
      },
      {
        id: 'pem1-7',
        prompt: 'x² + 4 = 0',
        value: 'Nincs valós gyök (M = ∅, x² = -4)'
      },
      {
        id: 'pem1-8',
        prompt: '2x² - 12x + 18 = 0',
        value: 'x = 3 (kétszeres gyök: 2(x - 3)² = 0)'
      }
    ]
  },
  2: {
    title: 'Egyenlőtlenségek, gyöktényezők és rendszerek',
    subtitle: 'Párosítsd az algebrai és geometriai feladványokat a pontos megoldáshalmazukkal!',
    pairs: [
      {
        id: 'pem2-1',
        prompt: '(x - 1)(x - 4) < 0',
        promptFigure: <InequalityRegionsSvg size={42} />,
        value: 'x ∈ ]1; 4[ (nyílt belső szakasz)'
      },
      {
        id: 'pem2-2',
        prompt: 'x² - 9 ≥ 0',
        value: 'x ≤ -3 vagy x ≥ 3 (külső félegyenesek)'
      },
      {
        id: 'pem2-3',
        prompt: '(x + 3)/(x - 2) ≤ 0',
        value: 'x ∈ [-3; 2[ (a 2-nél nyílt a nevező miatt)'
      },
      {
        id: 'pem2-4',
        prompt: 'x² - 6x + 8 gyöktényezős alakja',
        value: '(x - 2)(x - 4)'
      },
      {
        id: 'pem2-5',
        prompt: '2x² - 8 gyöktényezős alakja',
        value: '2(x - 2)(x + 2)'
      },
      {
        id: 'pem2-6',
        prompt: '√(x + 4) = x - 2',
        promptFigure: <ExamChecklistTreeSvg size={42} />,
        value: 'Csak x = 5 (az x = 0 hamis gyök)'
      },
      {
        id: 'pem2-7',
        prompt: 'y = x²  és  y = 4 metszéspontjai',
        value: 'P₁(-2; 4) és P₂(2; 4)'
      },
      {
        id: 'pem2-8',
        prompt: '|x - 3| < 2',
        value: '1 < x < 5 (]-3-tól való távolság < 2)'
      }
    ]
  },
  3: {
    title: 'Érettségi és emelt szintű szintézis',
    subtitle: 'Párosítsd az összetett fejezeti feladványokat a precíz végeredményekkel!',
    pairs: [
      {
        id: 'pem3-1',
        prompt: '(x² - 4)/(x - 2) = 0',
        promptFigure: <GradingRubricTrophySvg size={42} />,
        value: 'Csak x = -2 (x = 2 kizárva a nevező miatt)'
      },
      {
        id: 'pem3-2',
        prompt: 'x + y = 5  és  x² + y² = 13',
        value: 'M = {(2; 3); (3; 2)}'
      },
      {
        id: 'pem3-3',
        prompt: 'x² - 4x + k = 0 pontosan 1 valós gyökkel',
        value: 'k = 4 (D = 16 - 4k = 0)'
      },
      {
        id: 'pem3-4',
        prompt: 'x₁ + x₂ = 7 és x₁x₂ = 12 esetén x₁² + x₂²',
        value: '25 (mert 7² - 2·12 = 49 - 24 = 25)'
      },
      {
        id: 'pem3-5',
        prompt: '(x - 1)²(x + 2) ≤ 0',
        value: 'x ≤ -2 vagy x = 1'
      },
      {
        id: 'pem3-6',
        prompt: '√(2x - 3) = -1',
        value: 'Nincs valós megoldás (M = ∅, gyök ≥ 0)'
      },
      {
        id: 'pem3-7',
        prompt: 'y = x² + 2  és  y = 2x metszéspontjai',
        value: 'Nincs metszéspont (D = 4 - 8 = -4 < 0)'
      },
      {
        id: 'pem3-8',
        prompt: 'x² + y² = 25 és xy = 12 (x, y > 0)',
        promptFigure: <NonlinearSystemsIntersectionSvg size={42} />,
        value: 'M = {(3; 4); (4; 3)}'
      }
    ]
  }
};

export const PracticeExamMatcher: React.FC<PracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-gyakorlas-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, fejezeti tudáspróba'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levelConfigs={matcherLevels}
      themeColor="violet"
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

