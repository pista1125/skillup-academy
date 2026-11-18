import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard80, RomanCard80, ClockCard80, PlainSignCard80 } from './RomanExamG2CardFigures';

interface RomanExamG2SorterProps {
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
    title: '1. szint: Kisebb, egyenlő vagy nagyobb, mint X?',
    description: 'Hasonlítsd össze a 10-zel!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint X', color: 'sky' },
      { id: 'eq', name: 'Pont X', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint X', color: 'rose' }
    ],
    items: [
      { id: 'rexs1', text: '', categoryId: 'lt', figure: <StickCard80 value="VII" /> },
      { id: 'rexs2', text: '', categoryId: 'lt', figure: <RomanCard80 value="IV" /> },
      { id: 'rexs3', text: 'IX', categoryId: 'lt' },
      { id: 'rexs4', text: '', categoryId: 'eq', figure: <StickCard80 value="X" /> },
      { id: 'rexs5', text: '', categoryId: 'eq', figure: <ClockCard80 hour={10} /> },
      { id: 'rexs6', text: 'tíz', categoryId: 'eq' },
      { id: 'rexs7', text: '', categoryId: 'gt', figure: <RomanCard80 value="XI" /> },
      { id: 'rexs8', text: '', categoryId: 'gt', figure: <StickCard80 value="XIV" /> },
      { id: 'rexs9', text: 'XX', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hozzáad, elvesz vagy hibás?',
    description: 'Csak hozzáadunk, van benne elvevés, vagy hibás az írás?',
    categories: [
      { id: 'add', name: 'Csak hozzáadunk', color: 'emerald' },
      { id: 'sub', name: 'Van benne elvevés', color: 'rose' },
      { id: 'bad', name: 'Hibás írás', color: 'slate' }
    ],
    items: [
      { id: 'rexs10', text: '', categoryId: 'add', figure: <StickCard80 value="XVI" /> },
      { id: 'rexs11', text: '', categoryId: 'add', figure: <PlainSignCard80 value="XII" /> },
      { id: 'rexs12', text: 'VIII', categoryId: 'add' },
      { id: 'rexs13', text: '', categoryId: 'sub', figure: <StickCard80 value="XIX" /> },
      { id: 'rexs14', text: '', categoryId: 'sub', figure: <PlainSignCard80 value="IV" /> },
      { id: 'rexs15', text: 'XIV', categoryId: 'sub' },
      { id: 'rexs16', text: '', categoryId: 'bad', figure: <StickCard80 value="VV" /> },
      { id: 'rexs17', text: '', categoryId: 'bad', figure: <PlainSignCard80 value="XIIII" /> },
      { id: 'rexs18', text: 'IIX', categoryId: 'bad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi az eredmény?',
    description: 'Írd át arab számmá, számolj, és tedd a jó dobozba!',
    categories: [
      { id: 'e12', name: '12', color: 'sky' },
      { id: 'e15', name: '15', color: 'purple' },
      { id: 'e18', name: '18', color: 'amber' }
    ],
    items: [
      { id: 'rexs19', text: '', categoryId: 'e12', figure: <RomanCard80 value="VII+V" /> },
      { id: 'rexs20', text: 'XX − VIII', categoryId: 'e12' },
      { id: 'rexs21', text: '', categoryId: 'e12', figure: <ClockCard80 hour={12} /> },
      { id: 'rexs22', text: '', categoryId: 'e15', figure: <RomanCard80 value="X+V" /> },
      { id: 'rexs23', text: 'XIX − IV', categoryId: 'e15' },
      { id: 'rexs24', text: 'VIII + VII', categoryId: 'e15' },
      { id: 'rexs25', text: '', categoryId: 'e18', figure: <RomanCard80 value="IX+IX" /> },
      { id: 'rexs26', text: 'XX − II', categoryId: 'e18' },
      { id: 'rexs27', text: '', categoryId: 'e18', figure: <StickCard80 value="XVIII" /> }
    ]
  }
];

export const ROMAN_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const RomanExamG2Sorter: React.FC<RomanExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-romai-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="A VI. témakör összefoglalása: válogasd szét a római számokat!"
      levels={ROMAN_EXAM_G2_SORTER_LEVELS}
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

export default RomanExamG2Sorter;
