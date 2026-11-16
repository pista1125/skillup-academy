import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulRelationsSorterProps {
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

const MUL_RELATIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hogyan változik a szorzat?',
    description: 'Mi történik a szorzattal? Tedd a megfelelő csoportba!',
    categories: [
      { id: 'mrc11', name: 'Kétszeresére nő', color: 'blue' },
      { id: 'mrc12', name: 'Nem változik', color: 'emerald' },
      { id: 'mrc13', name: 'Felére csökken', color: 'amber' }
    ],
    items: [
      { id: 'mrs1', text: 'A szorzandót duplázzuk, a szorzó marad.', categoryId: 'mrc11' },
      { id: 'mrs2', text: 'A szorzót duplázzuk, a szorzandó marad.', categoryId: 'mrc11' },
      { id: 'mrs3', text: '199 · 10 → 199 · 20', categoryId: 'mrc11' },
      { id: 'mrs4', text: 'Az egyiket duplázzuk, a másikat felezzük.', categoryId: 'mrc12' },
      { id: 'mrs5', text: '61 · 80 → 122 · 40', categoryId: 'mrc12' },
      { id: 'mrs6', text: '120 · 21 → 60 · 42', categoryId: 'mrc12' },
      { id: 'mrs7', text: '159 · 44 → 159 · 22', categoryId: 'mrc13' },
      { id: 'mrs8', text: 'A szorzót felezzük, a szorzandó marad.', categoryId: 'mrc13' },
      { id: 'mrs9', text: '244 · 20 → 122 · 20', categoryId: 'mrc13' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenlő szorzatok',
    description: 'Melyik szorzat mennyi? Használd a duplázást és a felezést!',
    categories: [
      { id: 'mrc21', name: '2520', color: 'teal' },
      { id: 'mrc22', name: '4880', color: 'purple' },
      { id: 'mrc23', name: '3600', color: 'rose' }
    ],
    items: [
      { id: 'mrs10', text: '120 · 21', categoryId: 'mrc21' },
      { id: 'mrs11', text: '60 · 42', categoryId: 'mrc21' },
      { id: 'mrs12', text: '30 · 84', categoryId: 'mrc21' },
      { id: 'mrs13', text: '61 · 80', categoryId: 'mrc22' },
      { id: 'mrs14', text: '122 · 40', categoryId: 'mrc22' },
      { id: 'mrs15', text: '244 · 20', categoryId: 'mrc22' },
      { id: 'mrs16', text: '150 · 24', categoryId: 'mrc23' },
      { id: 'mrs17', text: '75 · 48', categoryId: 'mrc23' },
      { id: 'mrs18', text: '40 · 90', categoryId: 'mrc23' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Belépők 320 Ft-ért',
    description: 'A belépő fejenként 320 Ft. Mennyit fizet a csoport?',
    categories: [
      { id: 'mrc31', name: 'Kevesebb, mint 5000 Ft', color: 'blue' },
      { id: 'mrc32', name: '5000 és 8000 Ft között', color: 'amber' },
      { id: 'mrc33', name: 'Több, mint 8000 Ft', color: 'emerald' }
    ],
    items: [
      { id: 'mrs19', text: '10 fő', categoryId: 'mrc31' },
      { id: 'mrs20', text: '12 fő', categoryId: 'mrc31' },
      { id: 'mrs21', text: '15 fő', categoryId: 'mrc31' },
      { id: 'mrs22', text: '18 fő', categoryId: 'mrc32' },
      { id: 'mrs23', text: '20 fő', categoryId: 'mrc32' },
      { id: 'mrs24', text: '24 fő', categoryId: 'mrc32' },
      { id: 'mrs25', text: '27 fő', categoryId: 'mrc33' },
      { id: 'mrs26', text: '30 fő', categoryId: 'mrc33' },
      { id: 'mrs27', text: '31 fő', categoryId: 'mrc33' }
    ]
  }
];

const MUL_RELATIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_RELATIONS_SORTER_LEVELS_LIST[0],
  2: MUL_RELATIONS_SORTER_LEVELS_LIST[1],
  3: MUL_RELATIONS_SORTER_LEVELS_LIST[2]
};

export const MulRelationsSorter: React.FC<MulRelationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wmult-osszefuggesek-sorter',
  topicTitle = '3. Összefüggések, következtetések – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Csoportosítsd a szorzásokat és a változásokat!"
      levels={MUL_RELATIONS_SORTER_LEVELS}
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

export default MulRelationsSorter;
