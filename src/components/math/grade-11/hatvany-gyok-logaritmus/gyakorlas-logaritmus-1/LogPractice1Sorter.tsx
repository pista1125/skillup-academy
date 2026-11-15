import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogPractice1SorterProps {
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

const LOG_PRACTICE_1_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik módszerrel oldod meg?',
    description: 'Döntsd el, melyik a legegyszerűbb megoldási módszer!',
    categories: [
      { id: 'def', name: 'A logaritmus definíciója', color: 'violet' },
      { id: 'base', name: 'Közös alapra hozás', color: 'emerald' },
      { id: 'lg', name: 'lg-vel, számológéppel', color: 'sky' }
    ],
    items: [
      { id: 'lp1s1', text: 'log₁₆ x = −1/2', categoryId: 'def' },
      { id: 'lp1s2', text: 'log₂ x² = 4', categoryId: 'def' },
      { id: 'lp1s3', text: 'log₂ (3 − x) = 0', categoryId: 'def' },
      { id: 'lp1s4', text: '4ˣ = 8', categoryId: 'base' },
      { id: 'lp1s5', text: '9ˣ = 27', categoryId: 'base' },
      { id: 'lp1s6', text: '3 · 5ˣ = 75', categoryId: 'base' },
      { id: 'lp1s7', text: '2ˣ = 10', categoryId: 'lg' },
      { id: 'lp1s8', text: '1,056ᵗ = 6', categoryId: 'lg' },
      { id: 'lp1s9', text: '3ˣ = 20', categoryId: 'lg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A logaritmus előjele',
    description: 'Számolás nélkül döntsd el, pozitív, nulla vagy negatív a logaritmus értéke!',
    categories: [
      { id: 'pos', name: 'Pozitív', color: 'emerald' },
      { id: 'zero', name: 'Nulla', color: 'slate' },
      { id: 'neg', name: 'Negatív', color: 'rose' }
    ],
    items: [
      { id: 'lp1s10', text: 'log₃ 81', categoryId: 'pos' },
      { id: 'lp1s11', text: 'lg 50', categoryId: 'pos' },
      { id: 'lp1s12', text: 'log₀,₅ 0,25', categoryId: 'pos' },
      { id: 'lp1s13', text: 'log₅ 1', categoryId: 'zero' },
      { id: 'lp1s14', text: 'lg 1', categoryId: 'zero' },
      { id: 'lp1s15', text: 'log₀,₅ 1', categoryId: 'zero' },
      { id: 'lp1s16', text: 'lg 0,01', categoryId: 'neg' },
      { id: 'lp1s17', text: 'log₂ (1/8)', categoryId: 'neg' },
      { id: 'lp1s18', text: 'log₀,₅ 4', categoryId: 'neg' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány valós megoldás van?',
    description: 'Gondold végig az értelmezési tartományt és az aˣ > 0 tulajdonságot!',
    categories: [
      { id: 'none', name: 'Nincs megoldás', color: 'rose' },
      { id: 'one', name: 'Egy megoldás', color: 'violet' },
      { id: 'two', name: 'Két megoldás', color: 'amber' }
    ],
    items: [
      { id: 'lp1s19', text: '2ˣ = −4', categoryId: 'none' },
      { id: 'lp1s20', text: '3ˣ = 0', categoryId: 'none' },
      { id: 'lp1s21', text: '0,5ˣ = −1', categoryId: 'none' },
      { id: 'lp1s22', text: '4ˣ = 8', categoryId: 'one' },
      { id: 'lp1s23', text: 'log₁₆ x = −1/2', categoryId: 'one' },
      { id: 'lp1s24', text: 'lg (x − 1) = 1', categoryId: 'one' },
      { id: 'lp1s25', text: 'log₂ x² = 4', categoryId: 'two' },
      { id: 'lp1s26', text: 'lg x² = 2', categoryId: 'two' },
      { id: 'lp1s27', text: 'log₃ x² = 0', categoryId: 'two' }
    ]
  }
];

const LOG_PRACTICE_1_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LOG_PRACTICE_1_SORTER_LEVELS_LIST[0],
  2: LOG_PRACTICE_1_SORTER_LEVELS_LIST[1],
  3: LOG_PRACTICE_1_SORTER_LEVELS_LIST[2]
};

export const LogPractice1Sorter: React.FC<LogPractice1SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-log-gyakorlas-elso-sorter',
  topicTitle = '13. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-logaritmus-1"
      title={topicTitle}
      subtitle="Rendszerezd az egyenleteket megoldási módszer és megoldásszám szerint, a logaritmusokat pedig előjel szerint!"
      levels={LOG_PRACTICE_1_SORTER_LEVELS}
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

export default LogPractice1Sorter;
