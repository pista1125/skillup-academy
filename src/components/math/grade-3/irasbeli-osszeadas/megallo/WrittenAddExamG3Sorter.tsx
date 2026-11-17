import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortColumn } from './WrittenAddExamG3CardFigures';

interface WrittenAddExamG3SorterProps {
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

const WRITTEN_ADD_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hányszor marad 1?',
    description: 'Hányszor kell maradékot (1-et) továbbvinni az írásbeli összeadásban?',
    categories: [
      { id: 'b0', name: 'Nincs maradék', color: 'sky' },
      { id: 'b1', name: 'Egyszer marad', color: 'amber' },
      { id: 'b2', name: 'Kétszer marad', color: 'rose' }
    ],
    items: [
      { id: 'waxs1_1', text: '', figure: <SortColumn nums={[214, 143]} />, categoryId: 'b0' },
      { id: 'waxs1_2', text: '', figure: <SortColumn nums={[403, 285]} />, categoryId: 'b0' },
      { id: 'waxs1_3', text: '352 + 136', categoryId: 'b0' },
      { id: 'waxs1_4', text: '', figure: <SortColumn nums={[263, 154]} />, categoryId: 'b1' },
      { id: 'waxs1_5', text: '', figure: <SortColumn nums={[157, 236]} />, categoryId: 'b1' },
      { id: 'waxs1_6', text: '425 + 318', categoryId: 'b1' },
      { id: 'waxs1_7', text: '', figure: <SortColumn nums={[278, 145]} />, categoryId: 'b2' },
      { id: 'waxs1_8', text: '', figure: <SortColumn nums={[369, 257]} />, categoryId: 'b2' },
      { id: 'waxs1_9', text: '547 + 276', categoryId: 'b2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora az összeg?',
    description: 'Számold ki írásban, és tedd a jó helyre!',
    categories: [
      { id: 'k', name: '500-nál kisebb', color: 'sky' },
      { id: 'kozt', name: '500 és 700 között', color: 'emerald' },
      { id: 'n', name: '700-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'waxs2_1', text: '', figure: <SortColumn nums={[146, 238, 115]} />, categoryId: 'k' },
      { id: 'waxs2_2', text: '', figure: <SortColumn nums={[207, 164, 98]} />, categoryId: 'k' },
      { id: 'waxs2_3', text: '278 + 145', categoryId: 'k' },
      { id: 'waxs2_4', text: '', figure: <SortColumn nums={[369, 257]} />, categoryId: 'kozt' },
      { id: 'waxs2_5', text: '', figure: <SortColumn nums={[195, 408]} />, categoryId: 'kozt' },
      { id: 'waxs2_6', text: '486 + 137', categoryId: 'kozt' },
      { id: 'waxs2_7', text: '', figure: <SortColumn nums={[486, 237]} />, categoryId: 'n' },
      { id: 'waxs2_8', text: '', figure: <SortColumn nums={[547, 276]} />, categoryId: 'n' },
      { id: 'waxs2_9', text: '459 + 386', categoryId: 'n' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számjegy-nyomozó',
    description: 'Melyik számjegy bújt el a „?” mögé?',
    categories: [
      { id: 'd1', name: 'A ? = 1', color: 'sky' },
      { id: 'd5', name: 'A ? = 5', color: 'amber' },
      { id: 'd8', name: 'A ? = 8', color: 'emerald' }
    ],
    items: [
      { id: 'waxs3_1', text: '', figure: <SortColumn nums={['2?6', 152]} result={368} />, categoryId: 'd1' },
      { id: 'waxs3_2', text: '', figure: <SortColumn nums={[316, '?25']} result={441} />, categoryId: 'd1' },
      { id: 'waxs3_3', text: '4?2 + 135 = 547', categoryId: 'd1' },
      { id: 'waxs3_4', text: '', figure: <SortColumn nums={[256, '1?9']} result={415} />, categoryId: 'd5' },
      { id: 'waxs3_5', text: '', figure: <SortColumn nums={['?24', 213]} result={737} />, categoryId: 'd5' },
      { id: 'waxs3_6', text: '36? + 128 = 493', categoryId: 'd5' },
      { id: 'waxs3_7', text: '', figure: <SortColumn nums={['3?7', 248]} result={635} />, categoryId: 'd8' },
      { id: 'waxs3_8', text: '', figure: <SortColumn nums={[147, '2?5']} result={432} />, categoryId: 'd8' },
      { id: 'waxs3_9', text: '26? + 315 = 583', categoryId: 'd8' }
    ]
  }
];

export const WRITTEN_ADD_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_ADD_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: WRITTEN_ADD_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: WRITTEN_ADD_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const WrittenAddExamG3Sorter: React.FC<WrittenAddExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-tudasproba-sorter',
  topicTitle = '6. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számolj írásban, és válogasd szét!"
      levels={WRITTEN_ADD_EXAM_G3_SORTER_LEVELS}
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

export default WrittenAddExamG3Sorter;
