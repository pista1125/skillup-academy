import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  OpenIntervalSvg,
  ClosedIntervalSvg,
  HalfOpenIntervalSvg,
  InfiniteIntervalSvg,
  IntervalIntersectionSvg,
  IntervalUnionSvg,
  IntervalDifferenceSvg,
  DiscreteVsContinuousSvg
} from './IntervalsFigures';

interface IntervalsMatcherProps {
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
    title: '1. Szint: Egyenlőtlenségek és Intervallum Alakok',
    subtitle: 'Párosítsd az algebrai egyenlőtlenségeket a helyes intervallum jelöléssel és ábrával!',
    pairs: [
      {
        id: 'inm1-1',
        prompt: '-2 ≤ x ≤ 4 (mindkét végpont zárt)',
        value: '[-2, 4]',
        figure: <ClosedIntervalSvg a={-2} b={4} size={70} label="[-2, 4]" />
      },
      {
        id: 'inm1-2',
        prompt: '-3 < x < 1 (mindkét végpont nyílt)',
        value: '(-3, 1) vagy ]-3, 1[',
        figure: <OpenIntervalSvg a={-3} b={1} size={70} label="(-3, 1)" />
      },
      {
        id: 'inm1-3',
        prompt: '0 ≤ x < 5 (balról zárt, jobbról nyílt)',
        value: '[0, 5) vagy [0, 5[',
        figure: <HalfOpenIntervalSvg a={0} b={5} leftClosed={true} size={70} label="[0, 5)" />
      },
      {
        id: 'inm1-4',
        prompt: '-1 < x ≤ 3 (balról nyílt, jobbról zárt)',
        value: '(-1, 3] vagy ]-1, 3]',
        figure: <HalfOpenIntervalSvg a={-1} b={3} leftClosed={false} size={70} label="(-1, 3]" />
      },
      {
        id: 'inm1-5',
        prompt: 'x ≥ 2 (alulról korlátos félegyenes)',
        value: '[2, +∞)',
        figure: <InfiniteIntervalSvg bound={2} direction="right" isClosed={true} size={70} label="[2, +∞)" />
      },
      {
        id: 'inm1-6',
        prompt: 'x < -1 (felülről korlátos félegyenes)',
        value: '(-∞, -1)',
        figure: <InfiniteIntervalSvg bound={-1} direction="left" isClosed={false} size={70} label="(-∞, -1)" />
      },
      {
        id: 'inm1-7',
        prompt: 'x ≤ 4 (4-nél zárt félegyenes)',
        value: '(-∞, 4]',
        figure: <InfiniteIntervalSvg bound={4} direction="left" isClosed={true} size={70} label="(-∞, 4]" />
      },
      {
        id: 'inm1-8',
        prompt: 'Összes valós szám feltétel nélkül',
        value: '(-∞, +∞) = R'
      }
    ]
  },
  2: {
    title: '2. Szint: Intervallumok Metszete és Uniója',
    subtitle: 'Párosítsd a műveleteket a számegyenesen adódó pontos eredménnyel!',
    pairs: [
      {
        id: 'inm2-1',
        prompt: '[-2, 3] ∩ [0, 5] (közös metszet)',
        value: '[0, 3]',
        figure: <IntervalIntersectionSvg a1={-2} b1={3} a2={0} b2={5} size={75} />
      },
      {
        id: 'inm2-2',
        prompt: '[-2, 2] ∪ [1, 5] (egyesített unió)',
        value: '[-2, 5]',
        figure: <IntervalUnionSvg a1={-2} b1={2} a2={1} b2={5} size={75} />
      },
      {
        id: 'inm2-3',
        prompt: '[-4, -1] ∩ [2, 6] (diszjunkt szakaszok)',
        value: '∅ (üres halmaz)'
      },
      {
        id: 'inm2-4',
        prompt: '(-∞, 3] ∩ [0, +∞) (két félegyenes metszete)',
        value: '[0, 3]',
        figure: <ClosedIntervalSvg a={0} b={3} size={70} label="[0, 3]" />
      },
      {
        id: 'inm2-5',
        prompt: '(-∞, 2] ∪ [1, +∞) (átfedő félegyenesek uniója)',
        value: '(-∞, +∞) = R'
      },
      {
        id: 'inm2-6',
        prompt: '[-1, 2) ∩ [2, 5] (2-nél balról nyílt)',
        value: '∅ (a 2 nem közös pont!)'
      },
      {
        id: 'inm2-7',
        prompt: '[-1, 2] ∩ [2, 5] (2-nél mindkettő zárt)',
        value: '{2} (egyetlen pont)'
      },
      {
        id: 'inm2-8',
        prompt: '(-3, 1) ∪ [1, 4] (1-nél folytonossá válik)',
        value: '(-3, 4]'
      }
    ]
  },
  3: {
    title: '3. Szint: Különbségképzés és Komplementerek',
    subtitle: 'Párosítsd az elvonási műveleteket a határpontok helyes viselkedésével!',
    pairs: [
      {
        id: 'inm3-1',
        prompt: '[1, 5] \\ [3, 7] (a 3 zárt volt a kivontban)',
        value: '[1, 3) (a 3 kiesik)',
        figure: <IntervalDifferenceSvg size={75} />
      },
      {
        id: 'inm3-2',
        prompt: '[1, 5] \\ (3, 7] (a 3 nyílt volt a kivontban)',
        value: '[1, 3] (a 3 bent marad)',
        figure: <ClosedIntervalSvg a={1} b={3} size={70} label="[1, 3]" />
      },
      {
        id: 'inm3-3',
        prompt: '[0, +∞) \\ [3, +∞) (félegyenes elvonása)',
        value: '[0, 3)'
      },
      {
        id: 'inm3-4',
        prompt: 'R \\ [1, 4] (zárt szakasz valós komplementere)',
        value: '(-∞, 1) ∪ (4, +∞)'
      },
      {
        id: 'inm3-5',
        prompt: 'R \\ (-2, 5) (nyílt szakasz valós komplementere)',
        value: '(-∞, -2] ∪ [5, +∞)'
      },
      {
        id: 'inm3-6',
        prompt: '[-3, 4] \\ [-3, 4] (önmagából kivonva)',
        value: '∅ (üres halmaz)'
      },
      {
        id: 'inm3-7',
        prompt: '[-2, 5] \\ [0, 3] (középső zárt rész kivágása)',
        value: '[-2, 0) ∪ (3, 5]'
      },
      {
        id: 'inm3-8',
        prompt: '[1, 4] \\ [5, 8] (diszjunkt halmaz kivonása)',
        value: '[1, 4] (változatlan marad)'
      }
    ]
  }
};

export const IntervalsMatcher: React.FC<IntervalsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="cyan"
      topicId={topicId || 'g9-komb-intervallumok-matcher'}
      topicTitle={topicTitle || '9. Osztály - Intervallumok Gyakorló Párosító'}
    />
  );
};

export default IntervalsMatcher;
