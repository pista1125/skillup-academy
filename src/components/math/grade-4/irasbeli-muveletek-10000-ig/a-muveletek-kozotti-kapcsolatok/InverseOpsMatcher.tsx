import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface InverseOpsMatcherProps {
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

const INVERSE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Ki csinálja vissza?',
    description: 'Párosítsd a lépést azzal a lépéssel, amelyik visszacsinálja!',
    pairs: [
      { id: 'invm1', left: '+ 1345', right: '− 1345' },
      { id: 'invm2', left: '− 2700', right: '+ 2700' },
      { id: 'invm3', left: '· 2', right: ': 2' },
      { id: 'invm4', left: ': 3', right: '· 3' },
      { id: 'invm5', left: '· 8', right: ': 8' },
      { id: 'invm6', left: ': 6', right: '· 6' },
      { id: 'invm7', left: '+ 4956', right: '− 4956' },
      { id: 'invm8', left: '− 6284', right: '+ 6284' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Két nyíl helyett egy',
    description: 'Melyik egyetlen lépés helyettesíti a két egymás utáni lépést?',
    pairs: [
      { id: 'invm9', left: '+ 2425, majd + 3575', right: '+ 6000' },
      { id: 'invm10', left: '+ 1564, majd + 2536', right: '+ 4100' },
      { id: 'invm11', left: '− 1425, majd − 1275', right: '− 2700' },
      { id: 'invm12', left: '− 1564, majd − 1436', right: '− 3000' },
      { id: 'invm13', left: ': 4, majd : 2', right: ': 8' },
      { id: 'invm14', left: ': 3, majd : 2', right: ': 6' },
      { id: 'invm15', left: '· 2, majd · 3', right: '· 6' },
      { id: 'invm16', left: '· 2, majd · 4', right: '· 8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik számra gondoltam?',
    description: 'Számolj visszafelé, és párosítsd a feladványt a gondolt számmal!',
    pairs: [
      { id: 'invm17', left: '□ + 1345 = 4135', right: '2790' },
      { id: 'invm18', left: '□ · 2 = 3600', right: '1800' },
      { id: 'invm19', left: '(□ + 2400) · 2 = 7200', right: '1200' },
      { id: 'invm20', left: '□ + 2 · 2400 = 7200', right: '2400' },
      { id: 'invm21', left: '□ : 7 = 528, maradék 2', right: '3698' },
      { id: 'invm22', left: '□ − 3587 = 3645', right: '7232' },
      { id: 'invm23', left: '789 + 4789 + □ = 9564', right: '3986' },
      { id: 'invm24', left: '□ · 7 = 2492', right: '356' }
    ]
  }
];

const INVERSE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: INVERSE_MATCHER_LEVELS_LIST[0],
  2: INVERSE_MATCHER_LEVELS_LIST[1],
  3: INVERSE_MATCHER_LEVELS_LIST[2]
};

export const InverseOpsMatcher: React.FC<InverseOpsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-kapcsolatok-matcher',
  topicTitle = '6. A műveletek közötti kapcsolatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-kozotti-kapcsolatok"
      title={topicTitle}
      subtitle="Ellentett műveletek, összevont nyilak és gondolt számok párosítása."
      levels={INVERSE_MATCHER_LEVELS}
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

export default InverseOpsMatcher;
