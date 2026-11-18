import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard80, JumpCard, CoinsCard } from './RoundTens100G2CardFigures';

interface RoundTens100G2SorterProps {
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
    title: '1. szint: Mennyi az eredmény?',
    description: 'Számolj, és tedd a kártyát a jó dobozba!',
    categories: [
      { id: 'r40', name: 'Eredmény: 40', color: 'sky' },
      { id: 'r60', name: 'Eredmény: 60', color: 'emerald' },
      { id: 'r80', name: 'Eredmény: 80', color: 'amber' }
    ],
    items: [
      { id: 'rt100s1', text: '', categoryId: 'r40', figure: <RodsCard80 tens={6} cross={2} /> },
      { id: 'rt100s2', text: '10 + 30', categoryId: 'r40' },
      { id: 'rt100s3', text: '', categoryId: 'r40', figure: <CoinsCard coins={[20, 20]} small /> },
      { id: 'rt100s4', text: '', categoryId: 'r60', figure: <RodsCard80 tens={2} add={4} /> },
      { id: 'rt100s5', text: '90 − 30', categoryId: 'r60' },
      { id: 'rt100s6', text: '100 − 40', categoryId: 'r60' },
      { id: 'rt100s7', text: '', categoryId: 'r80', figure: <RodsCard80 tens={5} add={3} /> },
      { id: 'rt100s8', text: '', categoryId: 'r80', figure: <CoinsCard coins={[50, 20, 10]} small /> },
      { id: 'rt100s9', text: '40 + 40', categoryId: 'r80' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mi történt a számmal?',
    description: 'Nézd meg, mennyivel lett több vagy kevesebb!',
    categories: [
      { id: 'p20', name: '+ 20', color: 'blue' },
      { id: 'p40', name: '+ 40', color: 'emerald' },
      { id: 'm30', name: '− 30', color: 'rose' }
    ],
    items: [
      { id: 'rt100s10', text: '35 → 55', categoryId: 'p20' },
      { id: 'rt100s11', text: '', categoryId: 'p20', figure: <JumpCard start={11} hops={2} small /> },
      { id: 'rt100s12', text: '68 → 88', categoryId: 'p20' },
      { id: 'rt100s13', text: '14 → 54', categoryId: 'p40' },
      { id: 'rt100s14', text: '', categoryId: 'p40', figure: <JumpCard start={50} hops={4} small /> },
      { id: 'rt100s15', text: '', categoryId: 'p40', figure: <RodsCard80 tens={2} ones={3} add={4} /> },
      { id: 'rt100s16', text: '97 → 67', categoryId: 'm30' },
      { id: 'rt100s17', text: '', categoryId: 'm30', figure: <JumpCard start={72} hops={3} dir={-1} small /> },
      { id: 'rt100s18', text: '', categoryId: 'm30', figure: <RodsCard80 tens={6} ones={8} cross={3} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kisebb, egyenlő vagy nagyobb, mint 50?',
    description: 'Számold ki, és hasonlítsd össze az 50-nel!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 50', color: 'sky' },
      { id: 'eq', name: 'Pontosan 50', color: 'purple' },
      { id: 'gt', name: 'Nagyobb, mint 50', color: 'amber' }
    ],
    items: [
      { id: 'rt100s19', text: '80 − 50', categoryId: 'lt' },
      { id: 'rt100s20', text: '', categoryId: 'lt', figure: <CoinsCard coins={[20, 20]} small /> },
      { id: 'rt100s21', text: '90 − 20 − 30', categoryId: 'lt' },
      { id: 'rt100s22', text: '20 + 30', categoryId: 'eq' },
      { id: 'rt100s23', text: '', categoryId: 'eq', figure: <CoinsCard coins={[20, 20, 10]} small /> },
      { id: 'rt100s24', text: '', categoryId: 'eq', figure: <RodsCard80 tens={10} cross={5} /> },
      { id: 'rt100s25', text: '45 + 20', categoryId: 'gt' },
      { id: 'rt100s26', text: '', categoryId: 'gt', figure: <RodsCard80 tens={3} ones={6} add={2} /> },
      { id: 'rt100s27', text: '100 − 30 − 10', categoryId: 'gt' }
    ]
  }
];

export const ROUND_TENS100_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RoundTens100G2Sorter: React.FC<RoundTens100G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-kerek-sorter',
  topicTitle = '4. Összeadás, kivonás kerek tízesekkel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      title={topicTitle}
      subtitle="Válogasd szét a kártyákat eredmény, változás és nagyság szerint!"
      levels={ROUND_TENS100_G2_SORTER_LEVELS}
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

export default RoundTens100G2Sorter;
