import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  FractionSignChartSvg,
  AbsoluteValueInequalityBandSvg,
  DenominatorDangerTrapSvg,
  ComplexIntervalIntersectionSvg,
  AbsoluteQuadraticParabolaSvg
} from './InequalitiesPracticeFigures';

interface InequalitiesPracticeMatcherProps {
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
    title: 'Alapvető törtes és abszolútértékes relációk',
    subtitle: 'Párosítsd a kifejezéseket a megfelelő megoldáshalmazukkal!',
    pairs: [
      {
        id: 'ipm1-1',
        prompt: '|x| < 4',
        promptFigure: <AbsoluteValueInequalityBandSvg size={42} />,
        value: 'x ∈ ]-4; 4[ (az origótól vett távolság kisebb mint 4)'
      },
      {
        id: 'ipm1-2',
        prompt: '|x| ≥ 5',
        value: 'x ∈ ]-∞; -5] ∪ [5; ∞[ (legalább 5 egység távolság kétoldalt)'
      },
      {
        id: 'ipm1-3',
        prompt: '1 / x > 0',
        value: 'x ∈ ]0; ∞[ (a nevezőnek pozitívnak kell lennie, x ≠ 0)'
      },
      {
        id: 'ipm1-4',
        prompt: '1 / x ≤ 0',
        value: 'x ∈ ]-∞; 0[ (a nevező negatív, 0-nál szigorúan nyílt zárójel!)'
      },
      {
        id: 'ipm1-5',
        prompt: '|x - 2| ≤ 3',
        value: 'x ∈ [-1; 5] (a 2-es középpont körül ±3 sugarú sáv: 2 - 3 és 2 + 3)'
      },
      {
        id: 'ipm1-6',
        prompt: '(x - 3) / (x + 1) > 0',
        promptFigure: <FractionSignChartSvg size={42} />,
        value: 'x ∈ ]-∞; -1[ ∪ ]3; ∞[ (a két gyökön KÍVÜL azonos előjelűek)'
      },
      {
        id: 'ipm1-7',
        prompt: '(x - 2) / (x - 5) < 0',
        value: 'x ∈ ]2; 5[ (a két gyök KÖZÖTT ellentétes előjelűek)'
      },
      {
        id: 'ipm1-8',
        prompt: '|x + 1| < -2',
        value: 'M = ∅ (az abszolútérték sohasem lehet negatív szám!)'
      }
    ]
  },
  2: {
    title: 'Közös nevező és másodfokúvá alakuló törtek',
    subtitle: 'Párosítsd a nullára rendezendő törtes és abszolútértékes egyenlőtlenségeket!',
    pairs: [
      {
        id: 'ipm2-1',
        prompt: '(x + 2) / (x - 1) ≤ 0',
        promptFigure: <FractionSignChartSvg size={42} />,
        value: 'x ∈ [-2; 1[ (a -2-nél zárt, de az 1-nél NYÍLT a nevező miatt!)'
      },
      {
        id: 'ipm2-2',
        prompt: '2 / (x - 3) > 1',
        promptFigure: <DenominatorDangerTrapSvg size={42} />,
        value: 'x ∈ ]3; 5[ (rendezve: (5 - x)/(x - 3) > 0, gyökök: 3 és 5)'
      },
      {
        id: 'ipm2-3',
        prompt: '(x² - 4) / (x + 1) > 0',
        value: 'x ∈ ]-2; -1[ ∪ ]2; ∞[ (három kritikus pont: -2, -1 és 2)'
      },
      {
        id: 'ipm2-4',
        prompt: '(x - 5) / (x² + 1) ≥ 0',
        value: 'x ∈ [5; ∞[ (x² + 1 mindig pozitív, így csak x - 5 ≥ 0 kell)'
      },
      {
        id: 'ipm2-5',
        prompt: '|2x - 4| ≤ 6',
        value: 'x ∈ [-1; 5] (-6 ≤ 2x - 4 ≤ 6 ⟹ -2 ≤ 2x ≤ 10)'
      },
      {
        id: 'ipm2-6',
        prompt: '(3 - x) / (x + 4) ≥ 0',
        value: 'x ∈ ]-4; 3] (a -4 a nevező miatt kizárva, a 3 megengedve)'
      },
      {
        id: 'ipm2-7',
        prompt: 'x / (x - 2) < 2',
        value: 'x ∈ ]-∞; 2[ ∪ ]4; ∞[ (rendezve: (4 - x)/(x - 2) < 0)'
      },
      {
        id: 'ipm2-8',
        prompt: '|x - 5| > 3',
        value: 'x ∈ ]-∞; 2[ ∪ ]8; ∞[ (x - 5 < -3 vagy x - 5 > 3)'
      }
    ]
  },
  3: {
    title: 'Összetett feladatok és egyenlőtlenség-rendszerek',
    subtitle: 'Párosítsd az egyenlőtlenség-rendszereket és másodfokú abszolútértékeket!',
    pairs: [
      {
        id: 'ipm3-1',
        prompt: '|x² - 4| < 5',
        promptFigure: <AbsoluteQuadraticParabolaSvg size={42} />,
        value: 'x ∈ ]-3; 3[ (-5 < x² - 4 < 5 ⟹ x² < 9)'
      },
      {
        id: 'ipm3-2',
        prompt: '|x² - 5| ≥ 4',
        value: 'x ∈ ]-∞; -3] ∪ [-1; 1] ∪ [3; ∞[ (x² - 5 ≤ -4 vagy x² - 5 ≥ 4)'
      },
      {
        id: 'ipm3-3',
        prompt: 'Rendszer: x² ≥ 4 és x < 5',
        promptFigure: <ComplexIntervalIntersectionSvg size={42} />,
        value: 'x ∈ ]-∞; -2] ∪ [2; 5[ (a két rész-megoldáshalmaz metszete)'
      },
      {
        id: 'ipm3-4',
        prompt: 'Rendszer: x² - 9 < 0 és x ≥ 0',
        value: 'x ∈ [0; 3[ (a ]-3; 3[ és a [0; ∞[ közös része)'
      },
      {
        id: 'ipm3-5',
        prompt: '|x - 1| + |x - 4| ≤ 5',
        value: 'x ∈ [0; 5] (az 1 és 4 pontoktól mért távolságösszeg legfeljebb 5)'
      },
      {
        id: 'ipm3-6',
        prompt: '(x² - 9) / (x² - 4) ≤ 0',
        value: 'x ∈ [-3; -2[ ∪ ]2; 3] (a ±2 nevezőbeli gyökök kötelezően nyíltak!)'
      },
      {
        id: 'ipm3-7',
        prompt: '|x² + 2x| < 3',
        value: 'x ∈ ]-3; 1[ (-3 < x² + 2x < 3 ⟹ (x + 3)(x - 1) < 0)'
      },
      {
        id: 'ipm3-8',
        prompt: '1 / (x - 2) ≥ 1 / 3',
        value: 'x ∈ ]2; 5] (közös nevező: (5 - x) / (3(x - 2)) ≥ 0)'
      }
    ]
  }
};

export const InequalitiesPracticeMatcher: React.FC<InequalitiesPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-gyakorlas-egyenlotlensegek-matcher',
  topicTitle = 'Törtes és abszolútértékes egyenlőtlenségek – Párosító'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
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

