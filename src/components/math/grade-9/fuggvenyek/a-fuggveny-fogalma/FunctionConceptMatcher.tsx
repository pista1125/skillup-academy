import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MappingDiagramSvg,
  VerticalLineTestSvg,
  DomainRangeGraphSvg
} from './FunctionConceptFigures';

interface FunctionConceptMatcherProps {
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
    title: '1. Szint: Függvénytani Alapfogalmak és Jelek',
    subtitle: 'Párosítsd a fogalmakat a matematikai leírásukkal!',
    pairs: [
      {
        id: 'fm1-1',
        prompt: 'x változó',
        value: 'Független változó (bemenet)',
        figure: <MappingDiagramSvg size={70} />
      },
      {
        id: 'fm1-2',
        prompt: 'y vagy f(x)',
        value: 'Függő változó (kimenet)'
      },
      {
        id: 'fm1-3',
        prompt: 'D_f',
        value: 'Értelmezési tartomány (x halmaza)'
      },
      {
        id: 'fm1-4',
        prompt: 'R_f',
        value: 'Értékkészlet (y halmaza)'
      },
      {
        id: 'fm1-5',
        prompt: 'f(x) = 0 megoldása',
        value: 'Zérushely (x_0)'
      },
      {
        id: 'fm1-6',
        prompt: 'Függőleges vonal metszéspontja ≤ 1',
        value: 'Függvény grafikus feltétele'
      }
    ]
  },
  2: {
    title: '2. Szint: Függvények és Értelmezési Tartományaik',
    subtitle: 'Párosítsd a képleteket a hozzájuk tartozó D_f halmazzal!',
    pairs: [
      {
        id: 'fm2-1',
        prompt: 'f(x) = 1 / (x - 4)',
        value: 'D_f = ℝ \\ {4}',
        figure: <DomainRangeGraphSvg size={70} />
      },
      {
        id: 'fm2-2',
        prompt: 'g(x) = √(x - 3)',
        value: 'D_f = [3; ∞['
      },
      {
        id: 'fm2-3',
        prompt: 'h(x) = 5 / (x² - 9)',
        value: 'D_f = ℝ \\ {-3; 3}'
      },
      {
        id: 'fm2-4',
        prompt: 'k(x) = 2x + 7',
        value: 'D_f = ℝ (minden valós szám)'
      },
      {
        id: 'fm2-5',
        prompt: 'm(x) = 1 / √(x - 2)',
        value: 'D_f = ]2; ∞['
      },
      {
        id: 'fm2-6',
        prompt: 'p(x) = x²',
        value: 'R_f = [0; ∞['
      }
    ]
  },
  3: {
    title: '3. Szint: Függvénykapcsolatok és Speciális Tulajdonságok',
    subtitle: 'Párosítsd a kifejezéseket a megfelelő matematikai állítással!',
    pairs: [
      {
        id: 'fm3-1',
        prompt: 'Kör vonala a koordinátasíkon',
        value: 'NEM függvény (2 metszéspont)',
        figure: <VerticalLineTestSvg size={70} />
      },
      {
        id: 'fm3-2',
        prompt: 'f(-x) = f(x) minden x-re',
        value: 'Páros függvény (y-tengelyes szimmetria)'
      },
      {
        id: 'fm3-3',
        prompt: 'f(x) = 2x - 3 ➔ f(a + 1)',
        value: '2a - 1'
      },
      {
        id: 'fm3-4',
        prompt: 'f(x) = 2x + 1 és g(x) = x² ➔ f(g(3))',
        value: '19'
      },
      {
        id: 'fm3-5',
        prompt: 'f(x) = -(x - 2)² + 5 maximuma',
        value: 'R_f = ]-∞; 5]'
      },
      {
        id: 'fm3-6',
        prompt: 'f(x) = 1 / x² értékkészlete',
        value: 'R_f = ]0; ∞['
      }
    ]
  }
};

export const FunctionConceptMatcher: React.FC<FunctionConceptMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-fogalom-matcher',
  topicTitle = '5. A függvény fogalma'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
    />
  );
};

