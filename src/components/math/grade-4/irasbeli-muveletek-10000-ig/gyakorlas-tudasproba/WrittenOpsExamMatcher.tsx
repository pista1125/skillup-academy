import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenOpsExamMatcherProps {
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

const EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Írásbeli műveletek',
    description: 'Számold ki írásban, és párosítsd a műveletet az eredményével!',
    pairs: [
      { id: 'exm1', left: '3845 + 2850', right: '6695' },
      { id: 'exm2', left: '7212 − 5410', right: '1802' },
      { id: 'exm3', left: '2346 + 5428', right: '7774' },
      { id: 'exm4', left: '8000 − 2873', right: '5127' },
      { id: 'exm5', left: '1623 · 2', right: '3246' },
      { id: 'exm6', left: '2549 · 3', right: '7647' },
      { id: 'exm7', left: '2872 : 2', right: '1436' },
      { id: 'exm8', left: '3150 : 3', right: '1050' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Ellenőrzés és a műveletek tagjai',
    description: 'Párosítsd a műveletet az ellenőrzésével, a hiányzó tagot az értékével!',
    pairs: [
      { id: 'exm9', left: '6300 − 3649 = 2651', right: '2651 + 3649 = 6300' },
      { id: 'exm10', left: '3693 : 3 = 1231', right: '1231 · 3 = 3693' },
      { id: 'exm11', left: '224 : 3 = 74, marad 2', right: '74 · 3 + 2 = 224' },
      { id: 'exm12', left: '1623 · 2 = 3246', right: '1623 + 1623 = 3246' },
      { id: 'exm13', left: '3845 + 2850 = 6695', right: '2850 + 3845 = 6695' },
      { id: 'exm14', left: 'osztó 7, hányados 528, maradék 2', right: 'osztandó: 3698' },
      { id: 'exm15', left: 'különbség 3645, kivonandó 3587', right: 'kisebbítendő: 7232' },
      { id: 'exm16', left: 'szorzó 7, szorzat 2492', right: 'szorzandó: 356' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Műveletsorok és szöveges feladatok',
    description: 'Figyelj a sorrendre, és keresd meg az eredményt!',
    pairs: [
      { id: 'exm17', left: '3564 − 215 · 2', right: '3134' },
      { id: 'exm18', left: '(1836 + 2364) · 2', right: '8400' },
      { id: 'exm19', left: '9572 − 1416 · 5', right: '2492' },
      { id: 'exm20', left: '1534 · 5 − 7596', right: '74' },
      { id: 'exm21', left: '2225 − 547 · 4', right: '37' },
      { id: 'exm22', left: '(6852 − 6778) · 2', right: '148' },
      { id: 'exm23', left: 'Budapest–Varsó: 200 + 5 · 200 − 326 (km)', right: '874' },
      { id: 'exm24', left: '8055 kitűző 9 fajtából, fajtánként', right: '895' }
    ]
  }
];

const EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: EXAM_MATCHER_LEVELS_LIST[0],
  2: EXAM_MATCHER_LEVELS_LIST[1],
  3: EXAM_MATCHER_LEVELS_LIST[2]
};

export const WrittenOpsExamMatcher: React.FC<WrittenOpsExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-tudasproba-matcher',
  topicTitle = '8. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Írásbeli műveletek, ellenőrzések és műveletsorok párosítása – az egész fejezetből."
      levels={EXAM_MATCHER_LEVELS}
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

export default WrittenOpsExamMatcher;
