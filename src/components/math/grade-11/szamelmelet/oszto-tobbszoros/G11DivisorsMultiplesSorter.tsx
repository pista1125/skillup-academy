import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11DivisorsMultiplesSorterProps {
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

const G11_DIVISORS_MULTIPLES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Prím, összetett, négyzetszám',
    description: 'Sorold be a számokat az osztóik alapján!',
    categories: [
      { id: 'prime', name: 'Prímszám (pontosan 2 osztó)', color: 'emerald' },
      { id: 'comp', name: 'Összetett, páros sok osztóval', color: 'amber' },
      { id: 'square', name: 'Négyzetszám (páratlan sok osztó)', color: 'blue' }
    ],
    items: [
      { id: 'dms1', text: '37', categoryId: 'prime' },
      { id: 'dms2', text: '211', categoryId: 'prime' },
      { id: 'dms3', text: '349', categoryId: 'prime' },
      { id: 'dms4', text: '91', categoryId: 'comp' },
      { id: 'dms5', text: '143', categoryId: 'comp' },
      { id: 'dms6', text: '455', categoryId: 'comp' },
      { id: 'dms7', text: '81', categoryId: 'square' },
      { id: 'dms8', text: '196', categoryId: 'square' },
      { id: 'dms9', text: '144', categoryId: 'square' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány osztója van?',
    description: 'Számold meg a pozitív osztókat (osztópárokkal vagy a kitevőkből)!',
    categories: [
      { id: 'd4', name: 'Pontosan 4 osztó', color: 'teal' },
      { id: 'd6', name: 'Pontosan 6 osztó', color: 'purple' },
      { id: 'd8', name: 'Pontosan 8 osztó', color: 'rose' }
    ],
    items: [
      { id: 'dms10', text: '143 = 11 · 13', categoryId: 'd4' },
      { id: 'dms11', text: '91', categoryId: 'd4' },
      { id: 'dms12', text: '27 = 3³', categoryId: 'd4' },
      { id: 'dms13', text: '20', categoryId: 'd6' },
      { id: 'dms14', text: '12', categoryId: 'd6' },
      { id: 'dms15', text: '98 = 2 · 7²', categoryId: 'd6' },
      { id: 'dms16', text: '30', categoryId: 'd8' },
      { id: 'dms17', text: '455 = 5 · 7 · 13', categoryId: 'd8' },
      { id: 'dms18', text: '231', categoryId: 'd8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Az ismeretlen p prím',
    description: 'p a szorzat többi tényezőjétől különböző prímszám. Mit tudunk biztosan?',
    categories: [
      { id: 'true', name: 'Biztosan igaz', color: 'emerald' },
      { id: 'maybe', name: 'Lehet igaz, lehet hamis', color: 'amber' },
      { id: 'false', name: 'Biztosan hamis', color: 'rose' }
    ],
    items: [
      { id: 'dms19', text: '2 · p · 5 · 7 0-ra végződik', categoryId: 'true' },
      { id: 'dms20', text: '2 · p · 7 legalább 30', categoryId: 'true' },
      { id: 'dms21', text: '3 · 5 · p osztható 15-tel', categoryId: 'true' },
      { id: 'dms22', text: '3² · 5 · p páratlan', categoryId: 'maybe' },
      { id: 'dms23', text: '3 · 7 · p páros', categoryId: 'maybe' },
      { id: 'dms24', text: '5 · 7 · p osztható 3-mal', categoryId: 'maybe' },
      { id: 'dms25', text: 'p² · 5 · 3 négyzetszám', categoryId: 'false' },
      { id: 'dms26', text: '2³ · 5 · 11 · p a 32 többszöröse', categoryId: 'false' },
      { id: 'dms27', text: '2 · 3 · p prímszám', categoryId: 'false' }
    ]
  }
];

const G11_DIVISORS_MULTIPLES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: G11_DIVISORS_MULTIPLES_SORTER_LEVELS_LIST[0],
  2: G11_DIVISORS_MULTIPLES_SORTER_LEVELS_LIST[1],
  3: G11_DIVISORS_MULTIPLES_SORTER_LEVELS_LIST[2]
};

export const G11DivisorsMultiplesSorter: React.FC<G11DivisorsMultiplesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-oszto-tobbszoros-sorter',
  topicTitle = '2. Osztó, többszörös – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszto-tobbszoros"
      title={topicTitle}
      subtitle="Rendszerezd a számokat osztóik szerint, és döntsd el, mit tudunk biztosan az ismeretlen prímről!"
      levels={G11_DIVISORS_MULTIPLES_SORTER_LEVELS}
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

export default G11DivisorsMultiplesSorter;
