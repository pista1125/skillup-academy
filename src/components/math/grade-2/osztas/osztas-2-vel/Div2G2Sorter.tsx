import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PackCard, ShareCard, HalfCard } from './Div2G2CardFigures';

interface Div2G2SorterProps {
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

const DIV2_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Oszd el 2-vel, és tedd a jó dobozba!',
    categories: [
      { id: 'r3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'r5', name: 'Eredmény: 5', color: 'emerald' },
      { id: 'r8', name: 'Eredmény: 8', color: 'amber' }
    ],
    items: [
      { id: 'd2s1', text: '6 : 2', categoryId: 'r3' },
      { id: 'd2s2', text: '', categoryId: 'r3', figure: <ShareCard each={3} q total={6} small /> },
      { id: 'd2s3', text: '', categoryId: 'r3', figure: <PackCard n={6} small /> },
      { id: 'd2s4', text: '10 : 2', categoryId: 'r5' },
      { id: 'd2s5', text: '', categoryId: 'r5', figure: <ShareCard each={5} q total={10} small /> },
      { id: 'd2s6', text: 'a 10 fele', categoryId: 'r5' },
      { id: 'd2s7', text: '16 : 2', categoryId: 'r8' },
      { id: 'd2s8', text: '', categoryId: 'r8', figure: <PackCard n={16} small /> },
      { id: 'd2s9', text: '', categoryId: 'r8', figure: <HalfCard big="16" half="?" small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen művelet?',
    description: 'Csomagolunk kettesével, szétosztunk 2 részre, vagy szorzunk?',
    categories: [
      { id: 'pack', name: 'Csomagolás kettesével', color: 'emerald' },
      { id: 'share', name: 'Szétosztás 2 részre', color: 'blue' },
      { id: 'mult', name: 'Szorzás', color: 'rose' }
    ],
    items: [
      { id: 'd2s10', text: '', categoryId: 'pack', figure: <PackCard n={10} small /> },
      { id: 'd2s11', text: '12 alma, 2-esével zacskóba', categoryId: 'pack' },
      { id: 'd2s12', text: '', categoryId: 'pack', figure: <PackCard n={8} small /> },
      { id: 'd2s13', text: '', categoryId: 'share', figure: <ShareCard each={6} small /> },
      { id: 'd2s14', text: '14 cukor 2 gyereknek', categoryId: 'share' },
      { id: 'd2s15', text: '', categoryId: 'share', figure: <ShareCard each={4} q total={8} small /> },
      { id: 'd2s16', text: '5 zacskó, mindben 2', categoryId: 'mult' },
      { id: 'd2s17', text: '7 · 2', categoryId: 'mult' },
      { id: 'd2s18', text: '3 pár zokni: hány darab?', categoryId: 'mult' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány teli csomag?',
    description: 'Csomagolj kettesével fejben! Hány teli csomag lesz? (Ami kimarad, az a maradék.)',
    categories: [
      { id: 'c4', name: '4 csomag', color: 'sky' },
      { id: 'c5', name: '5 csomag', color: 'purple' },
      { id: 'c6', name: '6 csomag', color: 'amber' }
    ],
    items: [
      { id: 'd2s19', text: '', categoryId: 'c4', figure: <PackCard n={8} small grouped={false} /> },
      { id: 'd2s20', text: '', categoryId: 'c4', figure: <PackCard n={9} small grouped={false} /> },
      { id: 'd2s21', text: '8 : 2', categoryId: 'c4' },
      { id: 'd2s22', text: '', categoryId: 'c5', figure: <PackCard n={10} small grouped={false} /> },
      { id: 'd2s23', text: '', categoryId: 'c5', figure: <PackCard n={11} small grouped={false} /> },
      { id: 'd2s24', text: '11 dió, 2-esével', categoryId: 'c5' },
      { id: 'd2s25', text: '', categoryId: 'c6', figure: <PackCard n={12} small grouped={false} /> },
      { id: 'd2s26', text: '', categoryId: 'c6', figure: <PackCard n={13} small grouped={false} /> },
      { id: 'd2s27', text: '13 korong, 2-esével', categoryId: 'c6' }
    ]
  }
];

export const DIV2_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV2_G2_SORTER_LEVELS_LIST[0],
  2: DIV2_G2_SORTER_LEVELS_LIST[1],
  3: DIV2_G2_SORTER_LEVELS_LIST[2]
};

export const Div2G2Sorter: React.FC<Div2G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-2-sorter',
  topicTitle = '1. Osztás 2-vel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-2-vel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat eredmény, művelet és csomagszám szerint!"
      levels={DIV2_G2_SORTER_LEVELS}
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

export default Div2G2Sorter;
