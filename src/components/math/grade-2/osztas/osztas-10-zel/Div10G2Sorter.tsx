import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TargetCard80, RodsCubesCard80, EggNumCard80 } from './Div10G2CardFigures';

interface Div10G2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Oszd el 10-zel, és tedd a jó dobozba!',
    categories: [
      { id: 'r3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'r6', name: 'Eredmény: 6', color: 'emerald' },
      { id: 'r9', name: 'Eredmény: 9', color: 'amber' }
    ],
    items: [
      { id: 'd10s1', text: '', categoryId: 'r3', figure: <TargetCard80 kind="rod" total={30} /> },
      { id: 'd10s2', text: '30 : 10', categoryId: 'r3' },
      { id: 'd10s3', text: 'A 30 tizede', categoryId: 'r3' },
      { id: 'd10s4', text: '', categoryId: 'r6', figure: <TargetCard80 kind="coin" total={60} /> },
      { id: 'd10s5', text: '60 : 10', categoryId: 'r6' },
      { id: 'd10s6', text: '', categoryId: 'r6', figure: <TargetCard80 kind="egg" total={60} /> },
      { id: 'd10s7', text: '', categoryId: 'r9', figure: <TargetCard80 kind="egg" total={90} /> },
      { id: 'd10s8', text: '90 : 10', categoryId: 'r9' },
      { id: 'd10s9', text: '', categoryId: 'r9', figure: <TargetCard80 kind="rod" total={90} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosíts tízesével! Mennyi marad?',
    categories: [
      { id: 'm0', name: 'Maradt 0', color: 'blue' },
      { id: 'm3', name: 'Maradt 3', color: 'amber' },
      { id: 'm7', name: 'Maradt 7', color: 'rose' }
    ],
    items: [
      { id: 'd10s10', text: '40', categoryId: 'm0' },
      { id: 'd10s11', text: '', categoryId: 'm0', figure: <RodsCubesCard80 tens={5} ones={0} /> },
      { id: 'd10s12', text: '80', categoryId: 'm0' },
      { id: 'd10s13', text: '43', categoryId: 'm3' },
      { id: 'd10s14', text: '', categoryId: 'm3', figure: <RodsCubesCard80 tens={2} ones={3} /> },
      { id: 'd10s15', text: '', categoryId: 'm3', figure: <RodsCubesCard80 tens={7} ones={3} /> },
      { id: 'd10s16', text: '17', categoryId: 'm7' },
      { id: 'd10s17', text: '', categoryId: 'm7', figure: <RodsCubesCard80 tens={6} ones={7} /> },
      { id: 'd10s18', text: '57', categoryId: 'm7' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány tartó kell?',
    description: 'Egy tartóba 10 tojás fér. Hány tartó kell, hogy minden tojás beférjen?',
    categories: [
      { id: 't3', name: '3 tartó kell', color: 'sky' },
      { id: 't5', name: '5 tartó kell', color: 'emerald' },
      { id: 't8', name: '8 tartó kell', color: 'purple' }
    ],
    items: [
      { id: 'd10s19', text: '30 tojás', categoryId: 't3' },
      { id: 'd10s20', text: '', categoryId: 't3', figure: <EggNumCard80 n={25} /> },
      { id: 'd10s21', text: '21 tojás', categoryId: 't3' },
      { id: 'd10s22', text: '50 tojás', categoryId: 't5' },
      { id: 'd10s23', text: '', categoryId: 't5', figure: <EggNumCard80 n={41} /> },
      { id: 'd10s24', text: '49 tojás', categoryId: 't5' },
      { id: 'd10s25', text: '80 tojás', categoryId: 't8' },
      { id: 'd10s26', text: '', categoryId: 't8', figure: <EggNumCard80 n={72} /> },
      { id: 'd10s27', text: '', categoryId: 't8', figure: <EggNumCard80 n={78} /> }
    ]
  }
];

export const DIV10_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Div10G2Sorter: React.FC<Div10G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-10-sorter',
  topicTitle = '9. Osztás 10-zel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-10-zel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat, rudakat és tojásokat!"
      levels={DIV10_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default Div10G2Sorter;
