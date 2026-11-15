import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialInequalitiesSorterProps {
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

const EXPONENTIAL_INEQUALITIES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Marad vagy fordul a relációjel?',
    description: 'Nézd meg az alapot! Ha a jobb oldal nem pozitív, nem is kell számolni.',
    categories: [
      { id: 'keep', name: 'Marad (a > 1)', color: 'violet' },
      { id: 'flip', name: 'Megfordul (0 < a < 1)', color: 'rose' },
      { id: 'trivial', name: 'Nem kell számolni (aˣ > 0)', color: 'slate' }
    ],
    items: [
      { id: 'eis1', text: '2ˣ > 8', categoryId: 'keep' },
      { id: 'eis2', text: '1,08ˣ > 10', categoryId: 'keep' },
      { id: 'eis3', text: '1,002ˣ < 1,2', categoryId: 'keep' },
      { id: 'eis4', text: '0,5ˣ ≥ 4', categoryId: 'flip' },
      { id: 'eis5', text: '0,94ˣ > 0,02', categoryId: 'flip' },
      { id: 'eis6', text: '(1/3)ˣ ≤ 27', categoryId: 'flip' },
      { id: 'eis7', text: '2ˣ < −3', categoryId: 'trivial' },
      { id: 'eis8', text: '5ˣ > 0', categoryId: 'trivial' },
      { id: 'eis9', text: '0,7ˣ > −1', categoryId: 'trivial' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen alakú a megoldáshalmaz?',
    description: 'Jobbra vagy balra végtelen félegyenes, vagy korlátos intervallum?',
    categories: [
      { id: 'right', name: 'x > … (jobbra végtelen)', color: 'emerald' },
      { id: 'left', name: 'x < … (balra végtelen)', color: 'amber' },
      { id: 'bounded', name: 'Korlátos intervallum', color: 'sky' }
    ],
    items: [
      { id: 'eis10', text: '2ˣ > 8', categoryId: 'right' },
      { id: 'eis11', text: '0,8ˣ < 0,5', categoryId: 'right' },
      { id: 'eis12', text: '(1/2)ˣ < 8', categoryId: 'right' },
      { id: 'eis13', text: '3ˣ ≤ 2187', categoryId: 'left' },
      { id: 'eis14', text: '0,5ˣ ≥ 4', categoryId: 'left' },
      { id: 'eis15', text: '0,94ˣ > 0,02', categoryId: 'left' },
      { id: 'eis16', text: '1 ≤ 1,5ˣ ≤ 10', categoryId: 'bounded' },
      { id: 'eis17', text: '0,06 < 0,6ˣ < 6', categoryId: 'bounded' },
      { id: 'eis18', text: '125 < 1,08ˣ < 175', categoryId: 'bounded' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mi a megoldáshalmaz?',
    description: 'Minden valós szám, üres halmaz, vagy csak bizonyos x-ek?',
    categories: [
      { id: 'all', name: 'Minden valós szám', color: 'emerald' },
      { id: 'none', name: 'Üres halmaz', color: 'rose' },
      { id: 'part', name: 'Csak bizonyos x-ek', color: 'violet' }
    ],
    items: [
      { id: 'eis19', text: '5ˣ > 0', categoryId: 'all' },
      { id: 'eis20', text: '0,3ˣ > −2', categoryId: 'all' },
      { id: 'eis21', text: '2ˣ + 1 > 1', categoryId: 'all' },
      { id: 'eis22', text: '2ˣ < −3', categoryId: 'none' },
      { id: 'eis23', text: '3ˣ ≤ 0', categoryId: 'none' },
      { id: 'eis24', text: '0,5ˣ + 2 < 2', categoryId: 'none' },
      { id: 'eis25', text: '2ˣ > 8', categoryId: 'part' },
      { id: 'eis26', text: '0,8ˣ < 0,5', categoryId: 'part' },
      { id: 'eis27', text: '4ˣ < 8', categoryId: 'part' }
    ]
  }
];

const EXPONENTIAL_INEQUALITIES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: EXPONENTIAL_INEQUALITIES_SORTER_LEVELS_LIST[0],
  2: EXPONENTIAL_INEQUALITIES_SORTER_LEVELS_LIST[1],
  3: EXPONENTIAL_INEQUALITIES_SORTER_LEVELS_LIST[2]
};

export const ExponentialInequalitiesSorter: React.FC<ExponentialInequalitiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-exponencialis-egyenlotlenseg-sorter',
  topicTitle = '14. Exponenciális egyenlőtlenségek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-egyenlotlensegek"
      title={topicTitle}
      subtitle="Rendszerezd az egyenlőtlenségeket: marad vagy fordul a relációjel, milyen alakú a megoldáshalmaz, és van-e egyáltalán megoldás!"
      levels={EXPONENTIAL_INEQUALITIES_SORTER_LEVELS}
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

export default ExponentialInequalitiesSorter;
