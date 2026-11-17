import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulDiv100G3SorterProps {
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

const MUL_DIV_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'kicsi', name: '20-nál kisebb', color: 'sky' },
      { id: 'kozep', name: '20 és 50 között', color: 'emerald' },
      { id: 'nagy', name: '50-nél nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'md100s1', text: '3 · 5', categoryId: 'kicsi' },
      { id: 'md100s2', text: '2 · 8', categoryId: 'kicsi' },
      { id: 'md100s3', text: '6 · 3', categoryId: 'kicsi' },
      { id: 'md100s4', text: '4 · 7', categoryId: 'kozep' },
      { id: 'md100s5', text: '5 · 9', categoryId: 'kozep' },
      { id: 'md100s6', text: '6 · 6', categoryId: 'kozep' },
      { id: 'md100s7', text: '8 · 7', categoryId: 'nagy' },
      { id: 'md100s8', text: '9 · 9', categoryId: 'nagy' },
      { id: 'md100s9', text: '10 · 6', categoryId: 'nagy' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a hányados?',
    description: 'Végezd el az osztást, és válogasd szét!',
    categories: [
      { id: 'h5', name: 'A hányados 5', color: 'amber' },
      { id: 'h7', name: 'A hányados 7', color: 'purple' },
      { id: 'h9', name: 'A hányados 9', color: 'teal' }
    ],
    items: [
      { id: 'md100s10', text: '40 : 8', categoryId: 'h5' },
      { id: 'md100s11', text: '30 : 6', categoryId: 'h5' },
      { id: 'md100s12', text: '15 : 3', categoryId: 'h5' },
      { id: 'md100s13', text: '49 : 7', categoryId: 'h7' },
      { id: 'md100s14', text: '28 : 4', categoryId: 'h7' },
      { id: 'md100s15', text: '63 : 9', categoryId: 'h7' },
      { id: 'md100s16', text: '54 : 6', categoryId: 'h9' },
      { id: 'md100s17', text: '81 : 9', categoryId: 'h9' },
      { id: 'md100s18', text: '18 : 2', categoryId: 'h9' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mi a neve?',
    description: 'Hogy hívjuk a kiemelt számot?',
    categories: [
      { id: 'tenyezo', name: 'tényező', color: 'sky' },
      { id: 'szorzat', name: 'szorzat', color: 'rose' },
      { id: 'hanyados', name: 'hányados', color: 'emerald' }
    ],
    items: [
      { id: 'md100s19', text: 'a 6 itt: 6 · 4 = 24', categoryId: 'tenyezo' },
      { id: 'md100s20', text: 'a 9 itt: 3 · 9 = 27', categoryId: 'tenyezo' },
      { id: 'md100s21', text: 'a 7 itt: 7 · 8 = 56', categoryId: 'tenyezo' },
      { id: 'md100s22', text: 'a 24 itt: 6 · 4 = 24', categoryId: 'szorzat' },
      { id: 'md100s23', text: 'a 45 itt: 5 · 9 = 45', categoryId: 'szorzat' },
      { id: 'md100s24', text: 'a 16 itt: 2 · 8 = 16', categoryId: 'szorzat' },
      { id: 'md100s25', text: 'a 4 itt: 24 : 6 = 4', categoryId: 'hanyados' },
      { id: 'md100s26', text: 'a 8 itt: 56 : 7 = 8', categoryId: 'hanyados' },
      { id: 'md100s27', text: 'a 3 itt: 27 : 9 = 3', categoryId: 'hanyados' }
    ]
  }
];

const MUL_DIV_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_DIV_100_G3_SORTER_LEVELS_LIST[0],
  2: MUL_DIV_100_G3_SORTER_LEVELS_LIST[1],
  3: MUL_DIV_100_G3_SORTER_LEVELS_LIST[2]
};

export const MulDiv100G3Sorter: React.FC<MulDiv100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-szorzas-sorter',
  topicTitle = '3. Szorzás és osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Számolj, és válogasd szét a műveleteket!"
      levels={MUL_DIV_100_G3_SORTER_LEVELS}
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

export default MulDiv100G3Sorter;
