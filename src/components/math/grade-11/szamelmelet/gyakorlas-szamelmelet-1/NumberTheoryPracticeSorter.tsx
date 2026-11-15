import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberTheoryPracticeSorterProps {
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

const NUMBER_THEORY_PRACTICE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik a legszűkebb számhalmaz?',
    description: 'Sorold be a számot abba a halmazba, amelyik a legszűkebb, de még tartalmazza!',
    categories: [
      { id: 'nat', name: 'Természetes szám (ℕ)', color: 'emerald' },
      { id: 'int', name: 'Egész, de nem természetes', color: 'sky' },
      { id: 'rat', name: 'Racionális, de nem egész', color: 'purple' }
    ],
    items: [
      { id: 'ntps1', text: '0', categoryId: 'nat' },
      { id: 'ntps2', text: '48 : 4', categoryId: 'nat' },
      { id: 'ntps3', text: '√49', categoryId: 'nat' },
      { id: 'ntps4', text: '−13', categoryId: 'int' },
      { id: 'ntps5', text: '−10 : 5', categoryId: 'int' },
      { id: 'ntps6', text: '−17', categoryId: 'int' },
      { id: 'ntps7', text: '2,3', categoryId: 'rat' },
      { id: 'ntps8', text: '4/9', categoryId: 'rat' },
      { id: 'ntps9', text: '−46,071', categoryId: 'rat' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Osztható-e 12-vel?',
    description: 'Használd az összetett oszthatósági szabályokat: 12 = 3 · 4 és 6 = 2 · 3!',
    categories: [
      { id: 'd12', name: 'Osztható 12-vel', color: 'emerald' },
      { id: 'd6', name: '6-tal osztható, 12-vel nem', color: 'amber' },
      { id: 'none', name: '6-tal sem osztható', color: 'rose' }
    ],
    items: [
      { id: 'ntps10', text: '516', categoryId: 'd12' },
      { id: 'ntps11', text: '732', categoryId: 'd12' },
      { id: 'ntps12', text: '1008', categoryId: 'd12' },
      { id: 'ntps13', text: '534', categoryId: 'd6' },
      { id: 'ntps14', text: '978', categoryId: 'd6' },
      { id: 'ntps15', text: '1290', categoryId: 'd6' },
      { id: 'ntps16', text: '1004', categoryId: 'none' },
      { id: 'ntps17', text: '735', categoryId: 'none' },
      { id: 'ntps18', text: '1018', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz, hamis vagy nem is állítás?',
    description: 'Döntsd el, hogy a mondat igaz állítás, hamis állítás, vagy nem is állítás (logikai értéke nem dönthető el egyértelműen)!',
    categories: [
      { id: 'true', name: 'Igaz állítás', color: 'emerald' },
      { id: 'false', name: 'Hamis állítás (van ellenpélda)', color: 'rose' },
      { id: 'nostat', name: 'Nem állítás', color: 'slate' }
    ],
    items: [
      { id: 'ntps19', text: 'Végtelen sok prímszám van.', categoryId: 'true' },
      { id: 'ntps20', text: 'Ha 29 | b, akkor 29 | 17b.', categoryId: 'true' },
      { id: 'ntps21', text: 'A 20-nál kisebb pozitív prímek összege páratlan.', categoryId: 'true' },
      { id: 'ntps22', text: 'Ha 6 | n és 10 | n, akkor 60 | n.', categoryId: 'false' },
      { id: 'ntps23', text: 'Két különböző pozitív egész lnko-ja nem lehet 1.', categoryId: 'false' },
      { id: 'ntps24', text: 'Ha 3 | b és 7 | b, akkor 10 | b.', categoryId: 'false' },
      { id: 'ntps25', text: 'A 13 szerencsés szám.', categoryId: 'nostat' },
      { id: 'ntps26', text: 'Az oszthatósági szabályok könnyen megjegyezhetők.', categoryId: 'nostat' },
      { id: 'ntps27', text: 'Gondolj egy kétjegyű számra!', categoryId: 'nostat' }
    ]
  }
];

const NUMBER_THEORY_PRACTICE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBER_THEORY_PRACTICE_SORTER_LEVELS_LIST[0],
  2: NUMBER_THEORY_PRACTICE_SORTER_LEVELS_LIST[1],
  3: NUMBER_THEORY_PRACTICE_SORTER_LEVELS_LIST[2]
};

export const NumberTheoryPracticeSorter: React.FC<NumberTheoryPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-gyakorlas-sorter',
  topicTitle = '9. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="gyakorlas-szamelmelet-1"
      title={topicTitle}
      subtitle="Rendszerezd a számokat halmazok és oszthatóság szerint, és döntsd el, mi igaz állítás!"
      levels={NUMBER_THEORY_PRACTICE_SORTER_LEVELS}
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

export default NumberTheoryPracticeSorter;
