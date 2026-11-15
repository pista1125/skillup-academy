import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LineIntersectionMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const LINE_INTERSECTION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'lim1', left: 'Metszéspont', right: 'Mindkét egyenes egyenletét kielégítő pont' },
      { id: 'lim2', left: 'Illeszkedés', right: 'A koordinátákat behelyettesítve igaz kijelentést kapunk' },
      { id: 'lim3', left: 'Metsző egyenesek', right: 'Az egyenletrendszernek pontosan egy megoldása van' },
      { id: 'lim4', left: 'Párhuzamos egyenesek', right: 'Az egyenletrendszer megoldáshalmaza üres' },
      { id: 'lim5', left: 'Egybeeső egyenesek', right: 'Az egyenletrendszernek végtelen sok megoldása van' },
      { id: 'lim6', left: 'Behelyettesítő módszer', right: 'Az egyik ismeretlent kifejezzük, és beírjuk a másik egyenletbe' },
      { id: 'lim7', left: 'Egyenlő együtthatók módszere', right: 'Az egyenleteket úgy szorozzuk, hogy kivonva egy ismeretlen kiessen' },
      { id: 'lim8', left: 'Súlypont', right: 'A háromszög súlyvonalainak közös pontja' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenletrendszer és megoldása',
    description: 'Párosítsd az egyenespárt a közös pontjukkal!',
    pairs: [
      { id: 'lim9', left: '3x + y = −1 és 2x − 3y = −19', right: '(−2; 5)' },
      { id: 'lim10', left: '5x + 4y = 7 és 4x − y = 14', right: '(3; −2)' },
      { id: 'lim11', left: '3x − 7y = −7 és 6x − 7y = −28', right: '(−7; −2)' },
      { id: 'lim12', left: '3x − y = 16 és 2x + 5y = 5', right: '(5; −1)' },
      { id: 'lim13', left: '4x − 5y = 13 és x + 2y = 0', right: '(2; −1)' },
      { id: 'lim14', left: 'y = 2x − 3 és y = −x + 6', right: '(3; 3)' },
      { id: 'lim15', left: '6x − 10y = 3 és −3x + 5y = 2', right: 'nincs közös pont' },
      { id: 'lim16', left: 'x − y = 4 és 5x − 5y = 20', right: 'végtelen sok közös pont' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Alkalmazások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'lim17', left: 'AB: 7x − 3y = −13, C-ből induló súlyvonal: −6x + 2y = 14', right: 'AB felezőpontja: (−4; −5)' },
      { id: 'lim18', left: 'Súlyvonalak: 2x + 6y = 5 és x − 5y = 6,5', right: 'Súlypont: (4; −0,5)' },
      { id: 'lim19', left: 'e: −3x + 2y = 10 metszése a 2 abszcisszájú pontban, m = −3', right: 'y = −3x + 14' },
      { id: 'lim20', left: 'f: 5x − 3y = 7 metszése az 1 ordinátájú pontban, m = −3', right: 'y = −3x + 7' },
      { id: 'lim21', left: 'Origón át, az 5x − 3y = 7 meredekségének reciprokával', right: 'y = 3/5 x' },
      { id: 'lim22', left: '2x + 3y = 12 és az x tengely', right: '(6; 0)' },
      { id: 'lim23', left: '4x − 5y = 13 és x + 4y = 4', right: '(24/7; 1/7)' },
      { id: 'lim24', left: 'y = x, y = −x + 6 és y = 0 háromszöge', right: 'Terület: 9' }
    ]
  }
];

const LINE_INTERSECTION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LINE_INTERSECTION_MATCHER_LEVELS_LIST[0],
  2: LINE_INTERSECTION_MATCHER_LEVELS_LIST[1],
  3: LINE_INTERSECTION_MATCHER_LEVELS_LIST[2]
};

export const LineIntersectionMatcher: React.FC<LineIntersectionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-metszespont-matcher',
  topicTitle = '14. Egyenesek metszéspontja – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="egyenesek-metszespontja"
      title={topicTitle}
      subtitle="Gyakorold két egyenes metszéspontjának kiszámítását és kölcsönös helyzetük felismerését!"
      levels={LINE_INTERSECTION_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default LineIntersectionMatcher;
