import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpLogPracticeExamSorterProps {
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

const EXP_LOG_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik témakörhöz tartozik?',
    description: 'Sorold be a kifejezéseket a fejezet három nagy témaköre szerint!',
    categories: [
      { id: 'pow', name: 'Hatvány, gyök, törtkitevő', color: 'violet' },
      { id: 'exp', name: 'Exponenciális folyamat', color: 'amber' },
      { id: 'log', name: 'Logaritmus', color: 'teal' }
    ],
    items: [
      { id: 'elxs1', text: '2³ · (2⁻²)⁻⁵', categoryId: 'pow' },
      { id: 'elxs2', text: '⁴√81', categoryId: 'pow' },
      { id: 'elxs3', text: '27^{4/3}', categoryId: 'pow' },
      { id: 'elxs4', text: '200 000 · 1,1² (kamatos kamat)', categoryId: 'exp' },
      { id: 'elxs5', text: 'N₀ · (1/2)^{t/T} (felezés)', categoryId: 'exp' },
      { id: 'elxs6', text: 'F(t) = 5,67 · 0,79ᵗ', categoryId: 'exp' },
      { id: 'elxs7', text: 'log₂ 8', categoryId: 'log' },
      { id: 'elxs8', text: 'lg 1000', categoryId: 'log' },
      { id: 'elxs9', text: '6^{log₆ 5}', categoryId: 'log' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Milyen folyamat?',
    description: 'Exponenciális növekedés, csökkenés, vagy nem is exponenciális?',
    categories: [
      { id: 'grow', name: 'Exponenciális növekedés', color: 'emerald' },
      { id: 'decay', name: 'Exponenciális csökkenés', color: 'rose' },
      { id: 'lin', name: 'Lineáris (nem exponenciális)', color: 'slate' }
    ],
    items: [
      { id: 'elxs10', text: 't ↦ 10 · 1,08ᵗ', categoryId: 'grow' },
      { id: 'elxs11', text: 't ↦ 4^{2t}', categoryId: 'grow' },
      { id: 'elxs12', text: 't ↦ 3,8 · 0,8⁻ᵗ', categoryId: 'grow' },
      { id: 'elxs13', text: 't ↦ 3,8 · 1,25⁻ᵗ', categoryId: 'decay' },
      { id: 'elxs14', text: 't ↦ 4,2 · 10²⁴ · 0,97ᵗ', categoryId: 'decay' },
      { id: 'elxs15', text: 't ↦ 28,9 · 2^{−t/8}', categoryId: 'decay' },
      { id: 'elxs16', text: 't ↦ 130 300 + 425t', categoryId: 'lin' },
      { id: 'elxs17', text: 't ↦ 60 − 2t', categoryId: 'lin' },
      { id: 'elxs18', text: 't ↦ 0,5t + 3', categoryId: 'lin' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Milyen a megoldáshalmaz?',
    description: 'Oldd meg az egyenlőtlenséget, és sorold be a megoldáshalmaz alakja szerint!',
    categories: [
      { id: 'lower', name: 'x > c vagy x ≥ c alakú', color: 'violet' },
      { id: 'upper', name: 'x < c vagy x ≤ c alakú', color: 'amber' },
      { id: 'both', name: 'Két korlát között', color: 'teal' }
    ],
    items: [
      { id: 'elxs19', text: '(1/2)ˣ < 8', categoryId: 'lower' },
      { id: 'elxs20', text: '2ˣ > 8', categoryId: 'lower' },
      { id: 'elxs21', text: '(2/3)ˣ ≤ 4/9', categoryId: 'lower' },
      { id: 'elxs22', text: '0,64 < 0,8ˣ', categoryId: 'upper' },
      { id: 'elxs23', text: '3ˣ ≤ 2187', categoryId: 'upper' },
      { id: 'elxs24', text: '0,87ᵗ > 0,5', categoryId: 'upper' },
      { id: 'elxs25', text: '0,06 < 0,6ˣ < 6', categoryId: 'both' },
      { id: 'elxs26', text: '1,15 < 1,002ˣ < 1,2', categoryId: 'both' },
      { id: 'elxs27', text: '1 ≤ 1,5ˣ ≤ 10', categoryId: 'both' }
    ]
  }
};

export const ExpLogPracticeExamSorter: React.FC<ExpLogPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-tudasproba-sorter',
  topicTitle = '16. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezet kifejezéseit, folyamatait és egyenlőtlenségeit!"
      levels={EXP_LOG_EXAM_SORTER_LEVELS}
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

export default ExpLogPracticeExamSorter;
