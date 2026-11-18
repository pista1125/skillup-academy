import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JumpsCard } from '../../szorzas/gyakorlas-tudasproba/MultExamG2CardFigures';
import { PlatesCard, RemainderCard, BoatsCard } from './DivExamG2CardFigures';

interface DivExamG2SorterProps {
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

const DIV_EXAM_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Ossz! 3, 5 vagy 7 az eredmény? A tányéroknál: mennyi jut egyre?',
    categories: [
      { id: 'r3', name: '= 3', color: 'sky' },
      { id: 'r5', name: '= 5', color: 'emerald' },
      { id: 'r7', name: '= 7', color: 'amber' },
    ],
    items: [
      { id: 'g2dxs1', text: '15 : 5', categoryId: 'r3' },
      { id: 'g2dxs2', text: '21 : 7', categoryId: 'r3' },
      { id: 'g2dxs3', text: '', categoryId: 'r3', figure: <PlatesCard pile={9} plates={3} small /> },
      { id: 'g2dxs4', text: '25 : 5', categoryId: 'r5' },
      { id: 'g2dxs5', text: '', categoryId: 'r5', figure: <JumpsCard step={4} jumps={5} endLabel="20" askJumps small /> },
      { id: 'g2dxs6', text: '', categoryId: 'r5', figure: <PlatesCard pile={10} plates={2} small /> },
      { id: 'g2dxs7', text: '49 : 7', categoryId: 'r7' },
      { id: 'g2dxs8', text: '', categoryId: 'r7', figure: <JumpsCard step={3} jumps={7} endLabel="21" askJumps small /> },
      { id: 'g2dxs9', text: '', categoryId: 'r7', figure: <PlatesCard pile={14} plates={2} small /> },
    ],
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosíts! Nem marad semmi, 1 marad vagy 2 marad?',
    categories: [
      { id: 'm0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'm1', name: '1 marad', color: 'sky' },
      { id: 'm2', name: '2 marad', color: 'rose' },
    ],
    items: [
      { id: 'g2dxs10', text: '24 korong, 6-osával', categoryId: 'm0' },
      { id: 'g2dxs11', text: '', categoryId: 'm0', figure: <RemainderCard n={14} d={7} small /> },
      { id: 'g2dxs12', text: '', categoryId: 'm0', figure: <RemainderCard n={16} d={4} small /> },
      { id: 'g2dxs13', text: '25 korong, 6-osával', categoryId: 'm1' },
      { id: 'g2dxs14', text: '', categoryId: 'm1', figure: <RemainderCard n={11} d={5} small /> },
      { id: 'g2dxs15', text: '', categoryId: 'm1', figure: <RemainderCard n={13} d={4} small /> },
      { id: 'g2dxs16', text: '17 korong, 5-ösével', categoryId: 'm2' },
      { id: 'g2dxs17', text: '38 korong, 4-esével', categoryId: 'm2' },
      { id: 'g2dxs18', text: '', categoryId: 'm2', figure: <RemainderCard n={20} d={6} small /> },
    ],
  },
  {
    level: 3,
    title: '3. szint: Hány kell?',
    description: 'Mindenkinek legyen helye! 4, 5 vagy 6 kell?',
    categories: [
      { id: 'k4', name: '4 kell', color: 'sky' },
      { id: 'k5', name: '5 kell', color: 'purple' },
      { id: 'k6', name: '6 kell', color: 'amber' },
    ],
    items: [
      { id: 'g2dxs19', text: '', categoryId: 'k4', figure: <BoatsCard total={15} each={4} small /> },
      { id: 'g2dxs20', text: '22 gyerek, egy csónakba 6 fér', categoryId: 'k4' },
      { id: 'g2dxs21', text: '32 könyv, egy polcra 8 fér', categoryId: 'k4' },
      { id: 'g2dxs22', text: '', categoryId: 'k5', figure: <BoatsCard total={21} each={5} small /> },
      { id: 'g2dxs23', text: '', categoryId: 'k5', figure: <BoatsCard total={33} each={7} small /> },
      { id: 'g2dxs24', text: '40 tojás, egy dobozba 8 fér', categoryId: 'k5' },
      { id: 'g2dxs25', text: '', categoryId: 'k6', figure: <BoatsCard total={26} each={5} small /> },
      { id: 'g2dxs26', text: '50 gyerek, egy csónakba 9 fér', categoryId: 'k6' },
      { id: 'g2dxs27', text: '', categoryId: 'k6', figure: <BoatsCard total={41} each={8} small /> },
    ],
  },
];

export const DIV_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV_EXAM_G2_SORTER_LEVELS_LIST[0],
  2: DIV_EXAM_G2_SORTER_LEVELS_LIST[1],
  3: DIV_EXAM_G2_SORTER_LEVELS_LIST[2],
};

export const DivExamG2Sorter: React.FC<DivExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, tudáspróba – Csoportosító Játék',
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Az V. témakör összefoglalása: válogasd szét az osztásokat, a maradékokat és a „hány kell” feladatokat!"
      levels={DIV_EXAM_G2_SORTER_LEVELS}
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

export default DivExamG2Sorter;
