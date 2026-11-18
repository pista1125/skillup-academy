import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { LooseCard, PackedCard, PlatesCard, JumpsCard, SixthCard } from './Div6G2CardFigures';

interface Div6G2SorterProps {
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

const DIV6_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'r3', name: 'Az eredmény 3', color: 'sky' },
      { id: 'r4', name: 'Az eredmény 4', color: 'emerald' },
      { id: 'r5', name: 'Az eredmény 5', color: 'amber' }
    ],
    items: [
      { id: 'd6s1', text: '18 : 6', categoryId: 'r3' },
      { id: 'd6s2', text: '', categoryId: 'r3', figure: <PackedCard boxes={3} small /> },
      { id: 'd6s3', text: '', categoryId: 'r3', figure: <PlatesCard each={3} small /> },
      { id: 'd6s4', text: '24 : 6', categoryId: 'r4' },
      { id: 'd6s5', text: '', categoryId: 'r4', figure: <PackedCard boxes={4} small /> },
      { id: 'd6s6', text: '', categoryId: 'r4', figure: <JumpsCard jumps={4} small endLabel="24" /> },
      { id: 'd6s7', text: '30 : 6', categoryId: 'r5' },
      { id: 'd6s8', text: '', categoryId: 'r5', figure: <PlatesCard each={5} small /> },
      { id: 'd6s9', text: '', categoryId: 'r5', figure: <SixthCard big="30" small="?" mini /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Marad-e valami?',
    description: '6-osával dobozolunk. Mennyi marad kint?',
    categories: [
      { id: 'm0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'm1', name: 'Marad 1', color: 'blue' },
      { id: 'm3', name: 'Marad 3', color: 'rose' }
    ],
    items: [
      { id: 'd6s10', text: '36 tojás', categoryId: 'm0' },
      { id: 'd6s11', text: '', categoryId: 'm0', figure: <PackedCard boxes={4} small /> },
      { id: 'd6s12', text: '', categoryId: 'm0', figure: <LooseCard n={12} small /> },
      { id: 'd6s13', text: '13 tojás', categoryId: 'm1' },
      { id: 'd6s14', text: '', categoryId: 'm1', figure: <PackedCard boxes={3} rest={1} small /> },
      { id: 'd6s15', text: '', categoryId: 'm1', figure: <LooseCard n={19} small /> },
      { id: 'd6s16', text: '45 tojás', categoryId: 'm3' },
      { id: 'd6s17', text: '', categoryId: 'm3', figure: <PackedCard boxes={1} rest={3} small /> },
      { id: 'd6s18', text: '27 tojás', categoryId: 'm3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Keresd meg, mi hiányzik a □ vagy a ? helyéről!',
    categories: [
      { id: 'h6', name: 'Hiányzó szám: 6', color: 'sky' },
      { id: 'h8', name: 'Hiányzó szám: 8', color: 'purple' },
      { id: 'h42', name: 'Hiányzó szám: 42', color: 'amber' }
    ],
    items: [
      { id: 'd6s19', text: '□ : 6 = 1', categoryId: 'h6' },
      { id: 'd6s20', text: '36 : □ = 6', categoryId: 'h6' },
      { id: 'd6s21', text: '', categoryId: 'h6', figure: <SixthCard big="36" small="?" mini /> },
      { id: 'd6s22', text: '48 : 6 = □', categoryId: 'h8' },
      { id: 'd6s23', text: '', categoryId: 'h8', figure: <JumpsCard jumps={8} small endLabel="48" /> },
      { id: 'd6s24', text: '', categoryId: 'h8', figure: <SixthCard big="48" small="?" mini /> },
      { id: 'd6s25', text: '□ : 6 = 7', categoryId: 'h42' },
      { id: 'd6s26', text: '', categoryId: 'h42', figure: <SixthCard big="?" small="7" mini /> },
      { id: 'd6s27', text: '', categoryId: 'h42', figure: <JumpsCard jumps={7} small endLabel="?" /> }
    ]
  }
];

export const DIV6_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV6_G2_SORTER_LEVELS_LIST[0],
  2: DIV6_G2_SORTER_LEVELS_LIST[1],
  3: DIV6_G2_SORTER_LEVELS_LIST[2]
};

export const Div6G2Sorter: React.FC<Div6G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-6-sorter',
  topicTitle = '5. Osztás 6-tal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-6-tal"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat, a képeket és a maradékokat!"
      levels={DIV6_G2_SORTER_LEVELS}
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

export default Div6G2Sorter;
