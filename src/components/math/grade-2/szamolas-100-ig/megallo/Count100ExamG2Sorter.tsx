import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard80, JumpCard, CoinsCard, BarCard80, CompareCard80, PyramidCard, WindowCard } from './Count100ExamG2CardFigures';

interface Count100ExamG2SorterProps {
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
    title: '1. szint: Kerek tízes, páros vagy páratlan?',
    description: 'Nézd meg a szám utolsó számjegyét!',
    categories: [
      { id: 'round', name: 'Kerek tízes', color: 'amber' },
      { id: 'even', name: 'Páros, de nem kerek tízes', color: 'sky' },
      { id: 'odd', name: 'Páratlan', color: 'rose' }
    ],
    items: [
      { id: 'c100xs1', text: '', categoryId: 'round', figure: <RodsCard80 tens={7} /> },
      { id: 'c100xs2', text: '40', categoryId: 'round' },
      { id: 'c100xs3', text: '', categoryId: 'round', figure: <CoinsCard coins={[50, 10]} small /> },
      { id: 'c100xs4', text: '36', categoryId: 'even' },
      { id: 'c100xs5', text: '', categoryId: 'even', figure: <RodsCard80 tens={5} ones={8} /> },
      { id: 'c100xs6', text: '92', categoryId: 'even' },
      { id: 'c100xs7', text: '', categoryId: 'odd', figure: <RodsCard80 tens={3} ones={7} /> },
      { id: 'c100xs8', text: '81', categoryId: 'odd' },
      { id: 'c100xs9', text: '', categoryId: 'odd', figure: <WindowCard center={44} ask="right" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számolj, és tedd a kártyát a jó dobozba!',
    categories: [
      { id: 'r45', name: 'Eredmény: 45', color: 'emerald' },
      { id: 'r62', name: 'Eredmény: 62', color: 'purple' },
      { id: 'r84', name: 'Eredmény: 84', color: 'amber' }
    ],
    items: [
      { id: 'c100xs10', text: '38 + 7', categoryId: 'r45' },
      { id: 'c100xs11', text: '', categoryId: 'r45', figure: <BarCard80 segs={[{ label: '27', v: 27 }, { label: '18', v: 18 }]} total="?" /> },
      { id: 'c100xs12', text: '', categoryId: 'r45', figure: <CompareCard80 top={['63', 63]} bottom={['?', 45]} diff="18" /> },
      { id: 'c100xs13', text: '70 − 8', categoryId: 'r62' },
      { id: 'c100xs14', text: '', categoryId: 'r62', figure: <PyramidCard rows={[['?'], ['27', '35']]} small /> },
      { id: 'c100xs15', text: '34 + 28', categoryId: 'r62' },
      { id: 'c100xs16', text: '56 + 28', categoryId: 'r84' },
      { id: 'c100xs17', text: '', categoryId: 'r84', figure: <RodsCard80 tens={5} ones={4} add={3} /> },
      { id: 'c100xs18', text: '', categoryId: 'r84', figure: <JumpCard start={44} hops={4} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kisebb, mint 50? Nagyobb, mint 80?',
    description: 'Számold ki, és hasonlítsd össze!',
    categories: [
      { id: 'lt50', name: 'Kisebb, mint 50', color: 'sky' },
      { id: 'mid', name: '50 és 80 között', color: 'emerald' },
      { id: 'gt80', name: 'Nagyobb, mint 80', color: 'rose' }
    ],
    items: [
      { id: 'c100xs19', text: '92 − 57', categoryId: 'lt50' },
      { id: 'c100xs20', text: '', categoryId: 'lt50', figure: <CompareCard80 top={['72', 72]} bottom={['?', 47]} diff="25" /> },
      { id: 'c100xs21', text: '100 − 36 − 24', categoryId: 'lt50' },
      { id: 'c100xs22', text: '', categoryId: 'mid', figure: <PyramidCard rows={[['?'], ['', ''], ['18', '9', '27']]} small /> },
      { id: 'c100xs23', text: '26 + 41', categoryId: 'mid' },
      { id: 'c100xs24', text: '', categoryId: 'mid', figure: <CoinsCard coins={[50, 20]} small /> },
      { id: 'c100xs25', text: '48 + 37', categoryId: 'gt80' },
      { id: 'c100xs26', text: '', categoryId: 'gt80', figure: <BarCard80 segs={[{ label: '52', v: 52 }, { label: '33', v: 33 }]} total="?" /> },
      { id: 'c100xs27', text: '30 + 25 + 40', categoryId: 'gt80' }
    ]
  }
];

export const COUNT100_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const Count100ExamG2Sorter: React.FC<Count100ExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-tudasproba-sorter',
  topicTitle = '6. Megálló – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Válogasd szét a számokat és a műveleteket!"
      levels={COUNT100_EXAM_G2_SORTER_LEVELS}
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

export default Count100ExamG2Sorter;
