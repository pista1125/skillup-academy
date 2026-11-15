import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityLogicSorterProps {
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

const DIVISIBILITY_LOGIC_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kijelentés-e?',
    description: 'Döntsd el, kijelentés-e a mondat, és ha igen, igaz vagy hamis!',
    categories: [
      { id: 'true', name: 'Kijelentés – igaz', color: 'emerald' },
      { id: 'false', name: 'Kijelentés – hamis', color: 'rose' },
      { id: 'none', name: 'Nem kijelentés', color: 'slate' }
    ],
    items: [
      { id: 'dls1', text: 'A 11 páratlan szám.', categoryId: 'true' },
      { id: 'dls2', text: 'Az 5 relatív prím a 6-hoz.', categoryId: 'true' },
      { id: 'dls3', text: 'A 12-nek legalább 5 osztója van.', categoryId: 'true' },
      { id: 'dls4', text: 'A 9571 többszöröse a 3-nak.', categoryId: 'false' },
      { id: 'dls5', text: 'Minden prímszám páratlan.', categoryId: 'false' },
      { id: 'dls6', text: 'Az 1 prímszám.', categoryId: 'false' },
      { id: 'dls7', text: 'Az oszthatósági szabályok könnyen megjegyezhetők.', categoryId: 'none' },
      { id: 'dls8', text: 'A 13 szerencsés szám.', categoryId: 'none' },
      { id: 'dls9', text: 'Írd fel a 30 osztóit!', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 4 és 6 többszörösei (40 alatt)',
    description: 'Hová kerül a szám a 4 és a 6 többszöröseinek halmazábráján?',
    categories: [
      { id: 'both', name: '4-gyel ÉS 6-tal is osztható', color: 'purple' },
      { id: 'one', name: 'Pontosan az egyikkel osztható (vagy-vagy)', color: 'amber' },
      { id: 'none', name: 'Egyikkel sem osztható', color: 'slate' }
    ],
    items: [
      { id: 'dls10', text: '12', categoryId: 'both' },
      { id: 'dls11', text: '24', categoryId: 'both' },
      { id: 'dls12', text: '36', categoryId: 'both' },
      { id: 'dls13', text: '8', categoryId: 'one' },
      { id: 'dls14', text: '18', categoryId: 'one' },
      { id: 'dls15', text: '30', categoryId: 'one' },
      { id: 'dls16', text: '10', categoryId: 'none' },
      { id: 'dls17', text: '22', categoryId: 'none' },
      { id: 'dls18', text: '35', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítás és megfordítása',
    description: 'Igaz-e az állítás, és igaz-e a megfordítása?',
    categories: [
      { id: 'tt', name: 'Igaz, és a megfordítása is igaz', color: 'emerald' },
      { id: 'tf', name: 'Igaz, de a megfordítása hamis', color: 'amber' },
      { id: 'f', name: 'Az állítás hamis', color: 'rose' }
    ],
    items: [
      { id: 'dls19', text: 'Ha 3 | n, akkor számjegyeinek összege osztható 3-mal.', categoryId: 'tt' },
      { id: 'dls20', text: 'Ha 12 | n, akkor 3 | n és 4 | n.', categoryId: 'tt' },
      { id: 'dls21', text: 'Ha n prímszám, akkor pontosan 2 osztója van.', categoryId: 'tt' },
      { id: 'dls22', text: 'Ha 4 | n, akkor n páros.', categoryId: 'tf' },
      { id: 'dls23', text: 'Ha 24 | n, akkor 12 | n.', categoryId: 'tf' },
      { id: 'dls24', text: 'Ha 12 | n, akkor 6 | n.', categoryId: 'tf' },
      { id: 'dls25', text: 'Ha 4 | n és 6 | n, akkor 24 | n.', categoryId: 'f' },
      { id: 'dls26', text: 'Ha n osztója 24-nek, akkor osztója 12-nek.', categoryId: 'f' },
      { id: 'dls27', text: 'Ha 2 | n és 4 | n, akkor 8 | n.', categoryId: 'f' }
    ]
  }
];

const DIVISIBILITY_LOGIC_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIVISIBILITY_LOGIC_SORTER_LEVELS_LIST[0],
  2: DIVISIBILITY_LOGIC_SORTER_LEVELS_LIST[1],
  3: DIVISIBILITY_LOGIC_SORTER_LEVELS_LIST[2]
};

export const DivisibilityLogicSorter: React.FC<DivisibilityLogicSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-oszthatosag-logika-sorter',
  topicTitle = '5. Oszthatóság és logika – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosag-es-logika"
      title={topicTitle}
      subtitle="Rendszerezd: kijelentés-e, melyik halmazrészbe esik, és igaz-e az állítás és a megfordítása!"
      levels={DIVISIBILITY_LOGIC_SORTER_LEVELS}
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

export default DivisibilityLogicSorter;
