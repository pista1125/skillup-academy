import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LineEquationMatcherProps {
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

const LINE_EQUATION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Az egyenletek alakjai',
    description: 'Párosítsd az egyenes leírását az egyenletével!',
    pairs: [
      { id: 'lem1', left: 'Az x tengely', right: 'y = 0' },
      { id: 'lem2', left: 'Az y tengely', right: 'x = 0' },
      { id: 'lem3', left: 'Origón átmenő, nem függőleges egyenes', right: 'y = mx' },
      { id: 'lem4', left: 'Az x tengellyel párhuzamos egyenes', right: 'y = b' },
      { id: 'lem5', left: 'Az y tengellyel párhuzamos egyenes', right: 'x = c' },
      { id: 'lem6', left: 'Az y tengellyel nem párhuzamos egyenes', right: 'y = mx + b' },
      { id: 'lem7', left: 'Lineáris függvény hozzárendelési szabálya', right: 'f(x) = ax + b' },
      { id: 'lem8', left: 'A második koordináta az első háromszorosa', right: 'y = 3x' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Két pontra illeszkedő egyenes',
    description: 'Párosítsd a két pontot a rájuk illeszkedő egyenes egyenletével!',
    pairs: [
      { id: 'lem9', left: '(2; 0) és (4; 6)', right: 'y = 3x − 6' },
      { id: 'lem10', left: '(0; 5) és (0; −1)', right: 'x = 0' },
      { id: 'lem11', left: '(3; −2) és (3; 3,7)', right: 'x = 3' },
      { id: 'lem12', left: '(4; −8) és (−3; 6)', right: 'y = −2x' },
      { id: 'lem13', left: '(5; 13) és (−1; 1)', right: 'y = 2x + 3' },
      { id: 'lem14', left: '(−3; 1) és (4,7; 1)', right: 'y = 1' },
      { id: 'lem15', left: '(4; −7) és (−6; 13)', right: 'y = −2x + 1' },
      { id: 'lem16', left: '(9; 5) és (−2; −6)', right: 'y = x − 4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tengelymetszetek',
    description: 'Párosítsd az egyenest a koordinátatengelyekkel alkotott metszéspontjaival!',
    pairs: [
      { id: 'lem17', left: 'y = −6x + 5', right: '(0; 5) és (5/6; 0)' },
      { id: 'lem18', left: 'y = 2x − 3', right: '(0; −3) és (1,5; 0)' },
      { id: 'lem19', left: 'y = 9,7', right: 'csak (0; 9,7)' },
      { id: 'lem20', left: 'x = 11', right: 'csak (11; 0)' },
      { id: 'lem21', left: 'y = −6x + 1', right: '(0; 1) és (1/6; 0)' },
      { id: 'lem22', left: 'y = −3x', right: 'csak az origó, (0; 0)' },
      { id: 'lem23', left: 'y = 0,5x + 2', right: '(0; 2) és (−4; 0)' },
      { id: 'lem24', left: 'y = −x + 3', right: '(0; 3) és (3; 0)' }
    ]
  }
];

const LINE_EQUATION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LINE_EQUATION_MATCHER_LEVELS_LIST[0],
  2: LINE_EQUATION_MATCHER_LEVELS_LIST[1],
  3: LINE_EQUATION_MATCHER_LEVELS_LIST[2]
};

export const LineEquationMatcher: React.FC<LineEquationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-egyenes-egyenlete-matcher',
  topicTitle = '10. Az egyenes egyenlete – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="az-egyenes-egyenlete"
      title={topicTitle}
      subtitle="Gyakorold az egyenes egyenletének alakjait, a két pontra illeszkedő egyenes felírását és a tengelymetszeteket!"
      levels={LINE_EQUATION_MATCHER_LEVELS}
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

export default LineEquationMatcher;
