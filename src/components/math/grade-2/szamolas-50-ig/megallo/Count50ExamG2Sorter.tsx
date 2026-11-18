import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard, DotsCard, BarCard, CompareCard, JumpTensCard } from './Count50ExamG2CardFigures';

interface Count50ExamG2SorterProps {
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

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora a szám?',
    description: 'Olvasd le a számot, és tedd a jó dobozba!',
    categories: [
      { id: 'kis', name: 'Kisebb, mint 30', color: 'sky' },
      { id: 'kozep', name: '30 és 40 között', color: 'emerald' },
      { id: 'nagy', name: 'Nagyobb, mint 40', color: 'amber' }
    ],
    items: [
      { id: 'c50xs1', text: '27', categoryId: 'kis' },
      { id: 'c50xs2', text: '', categoryId: 'kis', figure: <RodsCard tens={2} ones={3} small /> },
      { id: 'c50xs3', text: '', categoryId: 'kis', figure: <DotsCard a={19} small /> },
      { id: 'c50xs4', text: '36', categoryId: 'kozep' },
      { id: 'c50xs5', text: '', categoryId: 'kozep', figure: <RodsCard tens={3} ones={5} small /> },
      { id: 'c50xs6', text: '3 tízes 8 egyes', categoryId: 'kozep' },
      { id: 'c50xs7', text: '47', categoryId: 'nagy' },
      { id: 'c50xs8', text: '', categoryId: 'nagy', figure: <RodsCard tens={4} ones={4} small /> },
      { id: 'c50xs9', text: '', categoryId: 'nagy', figure: <DotsCard a={42} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki! Vigyázz a tízesátlépésre!',
    categories: [
      { id: 'e32', name: 'Eredmény: 32', color: 'blue' },
      { id: 'e37', name: 'Eredmény: 37', color: 'emerald' },
      { id: 'e43', name: 'Eredmény: 43', color: 'rose' }
    ],
    items: [
      { id: 'c50xs10', text: '25 + 7', categoryId: 'e32' },
      {
        id: 'c50xs11',
        text: '',
        categoryId: 'e32',
        figure: <BarCard parts={[{ v: 18, size: 18 }, { v: 14, size: 14, color: 'green' }]} total="?" small />
      },
      { id: 'c50xs12', text: '', categoryId: 'e32', figure: <DotsCard a={40} crossed={8} small /> },
      { id: 'c50xs13', text: '43 − 6', categoryId: 'e37' },
      { id: 'c50xs14', text: '', categoryId: 'e37', figure: <RodsCard tens={2} ones={7} add={1} small /> },
      { id: 'c50xs15', text: '28 + 9', categoryId: 'e37' },
      { id: 'c50xs16', text: '50 − 7', categoryId: 'e43' },
      {
        id: 'c50xs17',
        text: '',
        categoryId: 'e43',
        figure: <BarCard parts={[{ v: 29, size: 29 }, { v: 14, size: 14, color: 'green' }]} total="?" small />
      },
      { id: 'c50xs18', text: '', categoryId: 'e43', figure: <RodsCard tens={3} ones={3} add={1} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány tízes lesz?',
    description: 'Számolj két lépésben, és nézd meg, hány tízes van az eredményben!',
    categories: [
      { id: 't2', name: '2 tízes (20-tól 29-ig)', color: 'sky' },
      { id: 't3', name: '3 tízes (30-tól 39-ig)', color: 'purple' },
      { id: 't4', name: '4 tízes (40-től 49-ig)', color: 'amber' }
    ],
    items: [
      { id: 'c50xs19', text: '50 − 18 − 9', categoryId: 't2' },
      {
        id: 'c50xs20',
        text: '',
        categoryId: 't2',
        figure: (
          <BarCard
            parts={[{ v: 12, size: 12 }, { v: 13, size: 13, color: 'green' }, { v: '?', size: 25 }]}
            total={50}
            small
          />
        )
      },
      {
        id: 'c50xs21',
        text: '',
        categoryId: 't2',
        figure: <CompareCard rows={[{ size: 31, text: 31 }, { size: 22, text: '?' }]} diff="9" small />
      },
      { id: 'c50xs22', text: '16 + 9 + 8', categoryId: 't3' },
      { id: 'c50xs23', text: '', categoryId: 't3', figure: <DotsCard a={45} crossed={9} small /> },
      {
        id: 'c50xs24',
        text: '',
        categoryId: 't3',
        figure: <BarCard parts={[{ v: '?', size: 34 }, { v: 14, size: 14, color: 'green' }]} total={48} small />
      },
      { id: 'c50xs25', text: '19 + 19 + 3', categoryId: 't4' },
      {
        id: 'c50xs26',
        text: '',
        categoryId: 't4',
        figure: <CompareCard rows={[{ size: 29, text: 29 }, { size: 44, text: '?' }]} diff="15" small />
      },
      { id: 'c50xs27', text: '', categoryId: 't4', figure: <JumpTensCard start={17} count={3} dir="+" small /> }
    ]
  }
];

export const COUNT50_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const Count50ExamG2Sorter: React.FC<Count50ExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-tudasproba-sorter',
  topicTitle = '6. Megálló – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Válogasd szét a számokat és a műveleteket nagyság, eredmény és tízesek szerint!"
      levels={COUNT50_EXAM_G2_SORTER_LEVELS}
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

export default Count50ExamG2Sorter;
