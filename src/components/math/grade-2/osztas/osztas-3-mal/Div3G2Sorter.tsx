import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlatesCard, RingsCard, ThirdArrowCard, JumpBackCard, DotsBy3Card, PileCard } from './Div3G2CardFigures';

interface Div3G2SorterProps {
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

const DIV3_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Oszd el 3-mal, és tedd a jó dobozba!',
    categories: [
      { id: 'e3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'e5', name: 'Eredmény: 5', color: 'emerald' },
      { id: 'e7', name: 'Eredmény: 7', color: 'amber' }
    ],
    items: [
      { id: 'd3s1', text: '9 : 3', categoryId: 'e3' },
      { id: 'd3s2', text: '', categoryId: 'e3', figure: <PlatesCard each={3} small /> },
      { id: 'd3s3', text: '', categoryId: 'e3', figure: <ThirdArrowCard from="9" to="?" small /> },
      { id: 'd3s4', text: '15 : 3', categoryId: 'e5' },
      { id: 'd3s5', text: '', categoryId: 'e5', figure: <RingsCard groups={5} small /> },
      { id: 'd3s6', text: 'A 15 harmada', categoryId: 'e5' },
      { id: 'd3s7', text: '21 : 3', categoryId: 'e7' },
      { id: 'd3s8', text: '', categoryId: 'e7', figure: <PlatesCard each={7} small /> },
      { id: 'd3s9', text: '', categoryId: 'e7', figure: <JumpBackCard start={21} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosítsd hármasával a számot! Mennyi marad?',
    categories: [
      { id: 'm0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'm1', name: '1 marad', color: 'sky' },
      { id: 'm2', name: '2 marad', color: 'rose' }
    ],
    items: [
      { id: 'd3s10', text: '27', categoryId: 'm0' },
      { id: 'd3s11', text: '', categoryId: 'm0', figure: <DotsBy3Card n={12} small /> },
      { id: 'd3s12', text: '', categoryId: 'm0', figure: <DotsBy3Card n={18} small /> },
      { id: 'd3s13', text: '10', categoryId: 'm1' },
      { id: 'd3s14', text: '22', categoryId: 'm1' },
      { id: 'd3s15', text: '', categoryId: 'm1', figure: <DotsBy3Card n={16} small /> },
      { id: 'd3s16', text: '8', categoryId: 'm2' },
      { id: 'd3s17', text: '29', categoryId: 'm2' },
      { id: 'd3s18', text: '', categoryId: 'm2', figure: <DotsBy3Card n={20} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi jut egynek?',
    description: '3 felé osztunk egyenlően. Ha marad, azt tedd félre! Mennyi jut egynek?',
    categories: [
      { id: 'j4', name: 'Egynek 4 jut', color: 'sky' },
      { id: 'j6', name: 'Egynek 6 jut', color: 'purple' },
      { id: 'j8', name: 'Egynek 8 jut', color: 'amber' }
    ],
    items: [
      { id: 'd3s19', text: '12 : 3', categoryId: 'j4' },
      { id: 'd3s20', text: '', categoryId: 'j4', figure: <PileCard n={13} small /> },
      { id: 'd3s21', text: '', categoryId: 'j4', figure: <ThirdArrowCard from="12" to="?" small /> },
      { id: 'd3s22', text: '18 : 3', categoryId: 'j6' },
      { id: 'd3s23', text: '', categoryId: 'j6', figure: <PileCard n={20} small /> },
      { id: 'd3s24', text: '19 süti, 3 gyerek', categoryId: 'j6' },
      { id: 'd3s25', text: '', categoryId: 'j8', figure: <PileCard n={24} small /> },
      { id: 'd3s26', text: '25 süti, 3 gyerek', categoryId: 'j8' },
      { id: 'd3s27', text: 'A 24 harmada', categoryId: 'j8' }
    ]
  }
];

export const DIV3_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV3_G2_SORTER_LEVELS_LIST[0],
  2: DIV3_G2_SORTER_LEVELS_LIST[1],
  3: DIV3_G2_SORTER_LEVELS_LIST[2]
};

export const Div3G2Sorter: React.FC<Div3G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-3-sorter',
  topicTitle = '2. Osztás 3-mal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-3-mal"
      title={topicTitle}
      subtitle="Válogasd szét eredmény, maradék és szétosztás szerint!"
      levels={DIV3_G2_SORTER_LEVELS}
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

export default Div3G2Sorter;
