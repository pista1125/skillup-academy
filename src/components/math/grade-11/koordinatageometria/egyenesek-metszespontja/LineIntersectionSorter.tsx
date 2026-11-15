import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LineIntersectionSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const LINE_INTERSECTION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik pályán van a pont?',
    description: 'e: 5x + 4y = 7 (NewSea), f: 4x − y = 14 (DrunkenSailor). Hová tartozik a pont?',
    categories: [
      { id: 'onlyE', name: 'Csak az e egyenesen', color: 'blue' },
      { id: 'onlyF', name: 'Csak az f egyenesen', color: 'rose' },
      { id: 'both', name: 'Mindkettőn (metszéspont)', color: 'purple' }
    ],
    items: [
      { id: 'lis1', text: 'A(−1; 3)', categoryId: 'onlyE' },
      { id: 'lis2', text: '(7; −7)', categoryId: 'onlyE' },
      { id: 'lis3', text: '(−5; 8)', categoryId: 'onlyE' },
      { id: 'lis4', text: 'C(4; 2)', categoryId: 'onlyF' },
      { id: 'lis5', text: '(0; −14)', categoryId: 'onlyF' },
      { id: 'lis6', text: '(5; 6)', categoryId: 'onlyF' },
      { id: 'lis7', text: 'B(3; −2)', categoryId: 'both' },
      { id: 'lis8', text: 'Az 5x + 4y = 7, 4x − y = 14 egyenletrendszer megoldása', categoryId: 'both' },
      { id: 'lis9', text: 'A két pálya közös pontja', categoryId: 'both' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány közös pont?',
    description: 'Csoportosítsd az egyenespárokat a közös pontjaik száma szerint!',
    categories: [
      { id: 'one', name: 'Pontosan egy (metsző)', color: 'emerald' },
      { id: 'zero', name: 'Nincs (párhuzamos)', color: 'rose' },
      { id: 'inf', name: 'Végtelen sok (egybeeső)', color: 'amber' }
    ],
    items: [
      { id: 'lis10', text: '3x + y = −1 és 2x − 3y = −19', categoryId: 'one' },
      { id: 'lis11', text: 'y = 2x és y = 6', categoryId: 'one' },
      { id: 'lis12', text: 'x = 3 és y = 2x − 4', categoryId: 'one' },
      { id: 'lis13', text: '5x + 3y = 43 és 15x + 9y = 7', categoryId: 'zero' },
      { id: 'lis14', text: '6x − 10y = 3 és −3x + 5y = 2', categoryId: 'zero' },
      { id: 'lis15', text: 'y = 2x + 1 és y = 2x − 3', categoryId: 'zero' },
      { id: 'lis16', text: 'x − y = 4 és 5x − 5y = 20', categoryId: 'inf' },
      { id: 'lis17', text: '−3x + 2y = 10 és y = 1,5x + 5', categoryId: 'inf' },
      { id: 'lis18', text: '2x + 3y = 12 és 4x + 6y = 24', categoryId: 'inf' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hol a metszéspont?',
    description: 'Melyik síknegyedben (vagy tengelyen) van a két egyenes metszéspontja?',
    categories: [
      { id: 'q1', name: 'I. síknegyed (x > 0, y > 0)', color: 'blue' },
      { id: 'q4', name: 'IV. síknegyed (x > 0, y < 0)', color: 'purple' },
      { id: 'axis', name: 'Valamelyik tengelyen', color: 'slate' }
    ],
    items: [
      { id: 'lis19', text: 'y = 2x − 3 és y = −x + 6', categoryId: 'q1' },
      { id: 'lis20', text: 'x + y = 5 és x − y = 1', categoryId: 'q1' },
      { id: 'lis21', text: '4x − 5y = 13 és x + 4y = 4', categoryId: 'q1' },
      { id: 'lis22', text: '5x + 4y = 7 és 4x − y = 14', categoryId: 'q4' },
      { id: 'lis23', text: '3x − y = 16 és 2x + 5y = 5', categoryId: 'q4' },
      { id: 'lis24', text: '2x + 6y = 5 és x − 5y = 6,5', categoryId: 'q4' },
      { id: 'lis25', text: '2x + 3y = 12 és y = 0', categoryId: 'axis' },
      { id: 'lis26', text: 'y = x és y = −x', categoryId: 'axis' },
      { id: 'lis27', text: 'y = 3x + 6 és y = −x + 6', categoryId: 'axis' }
    ]
  }
];

const LINE_INTERSECTION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LINE_INTERSECTION_SORTER_LEVELS_LIST[0],
  2: LINE_INTERSECTION_SORTER_LEVELS_LIST[1],
  3: LINE_INTERSECTION_SORTER_LEVELS_LIST[2]
};

export const LineIntersectionSorter: React.FC<LineIntersectionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-metszespont-sorter',
  topicTitle = '14. Egyenesek metszéspontja – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="egyenesek-metszespontja"
      title={topicTitle}
      subtitle="Rendszerezd a pontokat és az egyenespárokat a közös pontjaik szerint!"
      levels={LINE_INTERSECTION_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default LineIntersectionSorter;
