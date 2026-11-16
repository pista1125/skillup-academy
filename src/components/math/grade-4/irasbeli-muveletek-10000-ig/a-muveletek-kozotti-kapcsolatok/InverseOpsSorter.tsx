import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface InverseOpsSorterProps {
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

const INVERSE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hogyan ellenőrzöd?',
    description: 'Melyik művelettel ellenőrzöd a számolást?',
    categories: [
      { id: 'sub', name: 'Kivonással', color: 'amber' },
      { id: 'add', name: 'Összeadással', color: 'emerald' },
      { id: 'mul', name: 'Szorzással', color: 'blue' }
    ],
    items: [
      { id: 'invs1', text: '1258 + 2425 = 3683', categoryId: 'sub' },
      { id: 'invs2', text: '2682 + 1564 = 4246', categoryId: 'sub' },
      { id: 'invs3', text: '3683 + 3575 = 7258', categoryId: 'sub' },
      { id: 'invs4', text: '4258 − 1425 = 2833', categoryId: 'add' },
      { id: 'invs5', text: '6823 − 1564 = 5259', categoryId: 'add' },
      { id: 'invs6', text: '4135 − 1345 = 2790', categoryId: 'add' },
      { id: 'invs7', text: '8248 : 4 = 2062', categoryId: 'mul' },
      { id: 'invs8', text: '6828 : 3 = 2276', categoryId: 'mul' },
      { id: 'invs9', text: '2492 : 7 = 356', categoryId: 'mul' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mi történt a számmal?',
    description: 'A két lépés után nagyobb, kisebb vagy ugyanannyi lett a szám?',
    categories: [
      { id: 'more', name: 'Nagyobb lett', color: 'emerald' },
      { id: 'less', name: 'Kisebb lett', color: 'rose' },
      { id: 'same', name: 'Ugyanannyi maradt', color: 'purple' }
    ],
    items: [
      { id: 'invs10', text: '+ 2425, majd + 3575', categoryId: 'more' },
      { id: 'invs11', text: '· 2, majd · 4', categoryId: 'more' },
      { id: 'invs12', text: '+ 1348, majd − 348', categoryId: 'more' },
      { id: 'invs13', text: '− 1425, majd − 1275', categoryId: 'less' },
      { id: 'invs14', text: ': 4, majd : 2', categoryId: 'less' },
      { id: 'invs15', text: '+ 2000, majd − 2500', categoryId: 'less' },
      { id: 'invs16', text: '+ 1345, majd − 1345', categoryId: 'same' },
      { id: 'invs17', text: '· 2, majd : 2', categoryId: 'same' },
      { id: 'invs18', text: ': 3, majd · 3', categoryId: 'same' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan kapod meg a hiányzó számot?',
    description: 'Melyik művelettel számolod ki a □ helyére kerülő számot?',
    categories: [
      { id: 'add', name: 'Összeadással', color: 'emerald' },
      { id: 'sub', name: 'Kivonással', color: 'amber' },
      { id: 'div', name: 'Osztással', color: 'blue' }
    ],
    items: [
      { id: 'invs19', text: '□ − 3587 = 3645', categoryId: 'add' },
      { id: 'invs20', text: '□ − 1345 = 1445', categoryId: 'add' },
      { id: 'invs21', text: '□ − 2478 = 3742', categoryId: 'add' },
      { id: 'invs22', text: '□ + 1345 = 4135', categoryId: 'sub' },
      { id: 'invs23', text: '789 + 4789 + □ = 9564', categoryId: 'sub' },
      { id: 'invs24', text: '□ + 2536 = 6782', categoryId: 'sub' },
      { id: 'invs25', text: '□ · 7 = 2492', categoryId: 'div' },
      { id: 'invs26', text: '□ · 2 = 3600', categoryId: 'div' },
      { id: 'invs27', text: '4 · □ = 3912', categoryId: 'div' }
    ]
  }
];

const INVERSE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: INVERSE_SORTER_LEVELS_LIST[0],
  2: INVERSE_SORTER_LEVELS_LIST[1],
  3: INVERSE_SORTER_LEVELS_LIST[2]
};

export const InverseOpsSorter: React.FC<InverseOpsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-kapcsolatok-sorter',
  topicTitle = '6. A műveletek közötti kapcsolatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-kozotti-kapcsolatok"
      title={topicTitle}
      subtitle="Csoportosítsd a műveleteket az ellenőrzés, a változás és a hiányzó szám szerint!"
      levels={INVERSE_SORTER_LEVELS}
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

export default InverseOpsSorter;
