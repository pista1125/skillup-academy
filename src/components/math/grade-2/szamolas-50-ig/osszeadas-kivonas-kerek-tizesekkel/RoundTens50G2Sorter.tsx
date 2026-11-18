import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard, CoinsCard, JumpTensCard, JumpGapCard80 } from './RoundTens50G2CardFigures';

interface RoundTens50G2SorterProps {
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
    description: 'Számold ki, és tedd a jó dobozba! Az áthúzott rudat elvesszük.',
    categories: [
      { id: 'r20', name: 'Eredmény: 20', color: 'sky' },
      { id: 'r30', name: 'Eredmény: 30', color: 'emerald' },
      { id: 'r40', name: 'Eredmény: 40', color: 'amber' }
    ],
    items: [
      { id: 'rt50s1', text: '', categoryId: 'r20', figure: <RodsCard tens={3} cross={1} small /> },
      { id: 'rt50s2', text: '50 − 30', categoryId: 'r20' },
      { id: 'rt50s3', text: '', categoryId: 'r20', figure: <CoinsCard coins={[10, 10]} small /> },
      { id: 'rt50s4', text: '', categoryId: 'r30', figure: <RodsCard tens={1} add={2} small /> },
      { id: 'rt50s5', text: '40 − 10', categoryId: 'r30' },
      { id: 'rt50s6', text: '', categoryId: 'r30', figure: <CoinsCard coins={[20, 10]} small /> },
      { id: 'rt50s7', text: '', categoryId: 'r40', figure: <RodsCard tens={2} add={2} small /> },
      { id: 'rt50s8', text: '50 − 10', categoryId: 'r40' },
      { id: 'rt50s9', text: '', categoryId: 'r40', figure: <CoinsCard coins={[20, 10, 10]} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová esik az eredmény?',
    description: 'Számold ki, és nézd meg: melyik két kerek tízes közé esik?',
    categories: [
      { id: 'd20', name: '20 és 30 között', color: 'blue' },
      { id: 'd30', name: '30 és 40 között', color: 'emerald' },
      { id: 'd40', name: '40 és 50 között', color: 'rose' }
    ],
    items: [
      { id: 'rt50s10', text: '45 − 20', categoryId: 'd20' },
      { id: 'rt50s11', text: '', categoryId: 'd20', figure: <RodsCard tens={4} ones={7} cross={2} small /> },
      { id: 'rt50s12', text: '', categoryId: 'd20', figure: <JumpTensCard start={3} count={2} dir="+" small /> },
      { id: 'rt50s13', text: '16 + 20', categoryId: 'd30' },
      { id: 'rt50s14', text: '', categoryId: 'd30', figure: <RodsCard tens={1} ones={4} add={2} small /> },
      { id: 'rt50s15', text: '48 − 10', categoryId: 'd30' },
      { id: 'rt50s16', text: '21 + 20', categoryId: 'd40' },
      { id: 'rt50s17', text: '', categoryId: 'd40', figure: <JumpTensCard start={19} count={3} dir="+" small /> },
      { id: 'rt50s18', text: '', categoryId: 'd40', figure: <RodsCard tens={2} ones={2} add={2} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyit ugrottunk?',
    description: 'Mennyit adtunk hozzá? 10-et, 20-at vagy 30-at?',
    categories: [
      { id: 'p10', name: '+ 10', color: 'sky' },
      { id: 'p20', name: '+ 20', color: 'purple' },
      { id: 'p30', name: '+ 30', color: 'amber' }
    ],
    items: [
      { id: 'rt50s19', text: '14 + □ = 24', categoryId: 'p10' },
      { id: 'rt50s20', text: '', categoryId: 'p10', figure: <JumpGapCard80 from={31} to={41} /> },
      { id: 'rt50s21', text: '□ + 26 = 36', categoryId: 'p10' },
      { id: 'rt50s22', text: '25 + □ = 45', categoryId: 'p20' },
      { id: 'rt50s23', text: '', categoryId: 'p20', figure: <JumpGapCard80 from={8} to={28} /> },
      { id: 'rt50s24', text: '', categoryId: 'p20', figure: <JumpGapCard80 from={19} to={39} /> },
      { id: 'rt50s25', text: '12 + □ = 42', categoryId: 'p30' },
      { id: 'rt50s26', text: '', categoryId: 'p30', figure: <JumpGapCard80 from={17} to={47} /> },
      { id: 'rt50s27', text: '', categoryId: 'p30', figure: <JumpGapCard80 from={20} to={50} /> }
    ]
  }
];

export const ROUND_TENS50_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RoundTens50G2Sorter: React.FC<RoundTens50G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-kerek-sorter',
  topicTitle = '4. Összeadás, kivonás kerek tízesekkel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      title={topicTitle}
      subtitle="Válogasd szét a műveleteket eredmény és tízes ugrás szerint!"
      levels={ROUND_TENS50_G2_SORTER_LEVELS}
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

export default RoundTens50G2Sorter;
