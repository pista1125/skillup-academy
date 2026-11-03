import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { AboveBelowConceptSvg, IntervalBracketsSvg, AbsDistanceInequalitySvg } from './InequalityFigures';

export interface InequalityMatcherProps {
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
    title: '1. Szint: Alapvető Egyenlőtlenségek és Intervallumok',
    subtitle: 'Párosítsd az egyenlőtlenségeket a helyes intervallumos megoldáshalmazukkal!',
    pairs: [
      {
        id: 'im1-1',
        prompt: 'x² ≤ 9',
        value: 'x ∈ [-3; 3] (a parabola a vízszintes y = 9 alatt halad)',
        figure: <AboveBelowConceptSvg size={70} />
      },
      {
        id: 'im1-2',
        prompt: 'x² > 4',
        value: 'x ∈ ]-∞; -2[ ∪ ]2; ∞[ (két külső nyílt ág)',
        figure: <IntervalBracketsSvg size={70} />
      },
      {
        id: 'im1-3',
        prompt: '|x| ≤ 5',
        value: 'x ∈ [-5; 5] (az origótól vett távolság legfeljebb 5)',
        figure: <AbsDistanceInequalitySvg size={70} />
      },
      {
        id: 'im1-4',
        prompt: '|x| > 2',
        value: 'x ∈ ]-∞; -2[ ∪ ]2; ∞[ (a 2-nél nagyobb távolságra lévő számok)'
      },
      {
        id: 'im1-5',
        prompt: '2x - 4 ≥ 0',
        value: 'x ∈ [2; ∞[ (2x ≥ 4 ⟹ x ≥ 2)'
      },
      {
        id: 'im1-6',
        prompt: '-x + 3 > 0',
        value: 'x ∈ ]-∞; 3[ (3 > x ⟹ x < 3)'
      }
    ]
  },
  2: {
    title: '2. Szint: Eltolt Abszolútértékes és Másodfokú Relációk',
    subtitle: 'Párosítsd az eltolt függvények egyenlőtlenségeit a megoldásukkal!',
    pairs: [
      {
        id: 'im2-1',
        prompt: '|x - 4| ≤ 3',
        value: 'x ∈ [1; 7] (a 4-től vett távolság legfeljebb 3: [4-3; 4+3])'
      },
      {
        id: 'im2-2',
        prompt: '|x + 2| < 5',
        value: 'x ∈ ]-7; 3[ (a -2-től vett távolság kisebb 5-nél: ]-2-5; -2+5[)'
      },
      {
        id: 'im2-3',
        prompt: '|x - 1| ≥ 4',
        value: 'x ∈ ]-∞; -3] ∪ [5; ∞[ (két zárt külső félegyenes)'
      },
      {
        id: 'im2-4',
        prompt: '(x - 2)² ≤ 1',
        value: 'x ∈ [1; 3] (a C(2; 0) csúcsú parabola az y = 1 szint alatt)'
      },
      {
        id: 'im2-5',
        prompt: '(x + 1)² > 9',
        value: 'x ∈ ]-∞; -4[ ∪ ]2; ∞[ (a -1-től több mint 3 egység távolság)'
      },
      {
        id: 'im2-6',
        prompt: '-x² + 9 > 0',
        value: 'x ∈ ]-3; 3[ (lefelé nyíló parabola x-tengely feletti része)'
      }
    ]
  },
  3: {
    title: '3. Szint: Különleges és Szélső Esetek',
    subtitle: 'Párosítsd a speciális és korlátozott értelmezésű egyenlőtlenségeket!',
    pairs: [
      {
        id: 'im3-1',
        prompt: 'x² + 4 > 0',
        value: 'x ∈ ℝ (mindig igaz, a parabola csúcsa y = 4-nél lebeg a tengely felett)'
      },
      {
        id: 'im3-2',
        prompt: 'x² ≤ 0',
        value: 'x = 0 (egyetlen szám: {0}, mert a négyzet sosem negatív)'
      },
      {
        id: 'im3-3',
        prompt: '|x - 3| < -2',
        value: 'M = ∅ (üres halmaz, abszolútérték soha nem lehet negatív)'
      },
      {
        id: 'im3-4',
        prompt: '√x ≤ 3',
        value: 'x ∈ [0; 9] (alulról korlátozza a gyök értelmezési tartománya: x ≥ 0!)'
      },
      {
        id: 'im3-5',
        prompt: 'x² < -5',
        value: 'M = ∅ (négyzet nem lehet kisebb egy negatív számnál)'
      },
      {
        id: 'im3-6',
        prompt: '|x + 5| ≥ 0',
        value: 'x ∈ ℝ (minden valós számra teljesül, mert az abszolútérték nemnegatív)'
      }
    ]
  }
};

export const InequalityMatcher: React.FC<InequalityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'egyenlotlensegek',
  topicTitle = 'Egyenlőtlenségek Grafikus Megoldása'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      title="Egyenlőtlenségek Párosító"
      subtitle="Kapcsold össze az egyenlőtlenségeket a megfelelő intervallumokkal és grafikus jelentésükkel!"
      levels={matcherLevels}
      currentLevel={activeLevel}
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

