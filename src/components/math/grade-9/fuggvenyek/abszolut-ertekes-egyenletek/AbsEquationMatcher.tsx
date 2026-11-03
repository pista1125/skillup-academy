import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DistanceOnNumberLineSvg, TwoAbsMidpointSvg, CaseSeparationSvg } from './AbsEquationFigures';

export interface AbsEquationMatcherProps {
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
    title: '1. Szint: Geometriai Jelentés (|x - a| = b)',
    subtitle: 'Párosítsd a távolság alapú egyenleteket a megoldáshalmazukkal!',
    pairs: [
      {
        id: 'am1-1',
        prompt: '|x| = 7',
        value: 'x ∈ {-7; 7} (az origótól vett távolság pontosan 7)',
        figure: <DistanceOnNumberLineSvg size={70} />
      },
      {
        id: 'am1-2',
        prompt: '|x - 3| = 5',
        value: 'x ∈ {-2; 8} (a 3-tól vett távolság 5: 3 - 5 = -2 és 3 + 5 = 8)',
        figure: <DistanceOnNumberLineSvg size={70} />
      },
      {
        id: 'am1-3',
        prompt: '|x + 2| = 4',
        value: 'x ∈ {-6; 2} (|x - (-2)| = 4: -2 - 4 = -6 és -2 + 4 = 2)',
        figure: <DistanceOnNumberLineSvg size={70} />
      },
      {
        id: 'am1-4',
        prompt: '|x - 5| = 0',
        value: 'x ∈ {5} (a távolság 0, egyetlen megoldás: x = 5)'
      },
      {
        id: 'am1-5',
        prompt: '|x - 4| = -3',
        value: 'x ∈ ∅ (a távolság sohasem lehet negatív!)'
      },
      {
        id: 'am1-6',
        prompt: '|2x| = 10',
        value: 'x ∈ {-5; 5} (|x| = 5 ⟹ x = ±5)'
      }
    ]
  },
  2: {
    title: '2. Szint: Két Ponttól Egyenlő Távolságra (|x - a| = |x - b|)',
    subtitle: 'Keresd meg a megfelelő felezőpontokat és szimmetria-megoldásokat!',
    pairs: [
      {
        id: 'am2-1',
        prompt: '|x - 2| = |x - 8|',
        value: 'x = 5 (a 2 és 8 szakasz felezőpontja: (2 + 8) / 2 = 5)',
        figure: <TwoAbsMidpointSvg size={70} />
      },
      {
        id: 'am2-2',
        prompt: '|x + 4| = |x - 6|',
        value: 'x = 1 (a -4 és 6 felezőpontja: (-4 + 6) / 2 = 1)',
        figure: <TwoAbsMidpointSvg size={70} />
      },
      {
        id: 'am2-3',
        prompt: '|x + 1| = |x + 9|',
        value: 'x = -5 (a -1 és -9 felezőpontja: (-1 - 9) / 2 = -5)'
      },
      {
        id: 'am2-4',
        prompt: '|x - 3| = |3 - x|',
        value: 'x ∈ ℝ (azonosság, mindkét oldal pontosan ugyanaz a távolság)'
      },
      {
        id: 'am2-5',
        prompt: '|x - 1| = -|x + 2|',
        value: 'x ∈ ∅ (nem-negatív nem lehet egyenlő negatív nem-nullával, nincs közös zéróhely)'
      },
      {
        id: 'am2-6',
        prompt: '|2x - 4| = 2|x - 2|',
        value: 'x ∈ ℝ (2 kiemelhető: 2|x - 2| = 2|x - 2|, minden valós x megoldás)'
      }
    ]
  },
  3: {
    title: '3. Szint: Esetszétválasztás és Ismeretlen a Jobb Oldalon',
    subtitle: 'Párosítsd a kifejezést tartalmazó egyenleteket a valós gyökeikkel!',
    pairs: [
      {
        id: 'am3-1',
        prompt: '|x - 2| = 2x - 5',
        value: 'x = 3 (feltétel: 2x - 5 ≥ 0; x - 2 = 2x - 5 ⟹ x = 3; a másik ág kiesik)',
        figure: <CaseSeparationSvg size={70} />
      },
      {
        id: 'am3-2',
        prompt: '|2x - 4| = x + 1',
        value: 'x ∈ {1; 5} (2x - 4 = x + 1 ⟹ x = 5; -(2x - 4) = x + 1 ⟹ x = 1)',
        figure: <CaseSeparationSvg size={70} />
      },
      {
        id: 'am3-3',
        prompt: '|x + 3| = -2x',
        value: 'x = -1 (feltétel: -2x ≥ 0 ⟹ x ≤ 0; x + 3 = -2x ⟹ x = -1, megfelel)',
        figure: <CaseSeparationSvg size={70} />
      },
      {
        id: 'am3-4',
        prompt: '|x| + x = 6',
        value: 'x = 3 (ha x ≥ 0: x + x = 6 ⟹ x = 3; ha x < 0: -x + x = 0 ≠ 6)'
      },
      {
        id: 'am3-5',
        prompt: '|x - 1| + |x - 4| = 3',
        value: 'x ∈ [1; 4] (a szakasz belső pontjai: az 1-től és 4-től mért távolságok összege állandó 3)'
      },
      {
        id: 'am3-6',
        prompt: '|x - 1| + |x - 4| = 1',
        value: 'x ∈ ∅ (háromszög-egyenlőtlenség: a távolságok összege legalább 3, nem lehet 1)'
      }
    ]
  }
};

export const AbsEquationMatcher: React.FC<AbsEquationMatcherProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-abszolut-egyenletek-matcher',
  topicTitle = 'Abszolút Értékes Egyenletek Párosító'
}) => {
  const activeLevel = level ?? currentLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={currentLevel}
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

