import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MulSmall } from './WrittenMulExamG3CardFigures';

interface WrittenMulExamG3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'lt500', name: '500-nál kisebb', color: 'sky' },
      { id: 'mid', name: '500 és 800 között', color: 'amber' },
      { id: 'gt800', name: '800-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'wms1', text: '123 · 2', categoryId: 'lt500', figure: <MulSmall a={123} d={2} /> },
      { id: 'wms2', text: '157 · 2', categoryId: 'lt500', figure: <MulSmall a={157} d={2} /> },
      { id: 'wms3', text: '129 · 3', categoryId: 'lt500' },
      { id: 'wms4', text: '214 · 3', categoryId: 'mid', figure: <MulSmall a={214} d={3} /> },
      { id: 'wms5', text: '118 · 5', categoryId: 'mid', figure: <MulSmall a={118} d={5} /> },
      { id: 'wms6', text: '243 · 3', categoryId: 'mid' },
      { id: 'wms7', text: '216 · 4', categoryId: 'gt800', figure: <MulSmall a={216} d={4} /> },
      { id: 'wms8', text: '312 · 3', categoryId: 'gt800', figure: <MulSmall a={312} d={3} /> },
      { id: 'wms9', text: '189 · 5', categoryId: 'gt800' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hol marad valami?',
    description: 'Szorozz írásban! Hol kell a maradékot továbbvinni?',
    categories: [
      { id: 'none', name: 'Nincs maradék', color: 'emerald' },
      { id: 'ones', name: 'Az egyeseknél marad', color: 'amber' },
      { id: 'tens', name: 'A tízeseknél marad', color: 'purple' }
    ],
    items: [
      { id: 'wms10', text: '232 · 3', categoryId: 'none', figure: <MulSmall a={232} d={3} /> },
      { id: 'wms11', text: '312 · 3', categoryId: 'none', figure: <MulSmall a={312} d={3} /> },
      { id: 'wms12', text: '201 · 4', categoryId: 'none' },
      { id: 'wms13', text: '214 · 3', categoryId: 'ones', figure: <MulSmall a={214} d={3} /> },
      { id: 'wms14', text: '129 · 3', categoryId: 'ones', figure: <MulSmall a={129} d={3} /> },
      { id: 'wms15', text: '216 · 4', categoryId: 'ones' },
      { id: 'wms16', text: '243 · 3', categoryId: 'tens', figure: <MulSmall a={243} d={3} /> },
      { id: 'wms17', text: '152 · 4', categoryId: 'tens', figure: <MulSmall a={152} d={4} /> },
      { id: 'wms18', text: '162 · 3', categoryId: 'tens' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becslés – több vagy kevesebb?',
    description: 'Kerekíts tízesre! A pontos szorzat nagyobb vagy kisebb a becslésnél?',
    categories: [
      { id: 'more', name: 'Nagyobb a becslésnél', color: 'emerald' },
      { id: 'less', name: 'Kisebb a becslésnél', color: 'rose' },
      { id: 'same', name: 'Ugyanannyi', color: 'sky' }
    ],
    items: [
      { id: 'wms19', text: '214 · 3', categoryId: 'more', figure: <MulSmall a={214} d={3} /> },
      { id: 'wms20', text: '332 · 2', categoryId: 'more', figure: <MulSmall a={332} d={2} /> },
      { id: 'wms21', text: '121 · 4', categoryId: 'more' },
      { id: 'wms22', text: '157 · 2', categoryId: 'less', figure: <MulSmall a={157} d={2} /> },
      { id: 'wms23', text: '296 · 3', categoryId: 'less', figure: <MulSmall a={296} d={3} /> },
      { id: 'wms24', text: '188 · 4', categoryId: 'less' },
      { id: 'wms25', text: '230 · 3', categoryId: 'same', figure: <MulSmall a={230} d={3} /> },
      { id: 'wms26', text: '140 · 5', categoryId: 'same' },
      { id: 'wms27', text: '310 · 2', categoryId: 'same' }
    ]
  }
];

export const WRITTEN_MUL_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const WrittenMulExamG3Sorter: React.FC<WrittenMulExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-tudasproba-sorter',
  topicTitle = '6. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat!"
      levels={WRITTEN_MUL_EXAM_G3_SORTER_LEVELS}
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

export default WrittenMulExamG3Sorter;
