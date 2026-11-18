import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TakeCard, BackJumpCard } from './Sub50G2CardFigures';
import { PyramidCard, BalanceCard } from '../osszeadas-50-es-szamkor/Add50G2CardFigures';

interface Sub50G2SorterProps {
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

const SUB50_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a különbség?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'd20', name: 'Különbség: 20', color: 'sky' },
      { id: 'd30', name: 'Különbség: 30', color: 'emerald' },
      { id: 'd40', name: 'Különbség: 40', color: 'amber' }
    ],
    items: [
      { id: 's50s1', text: '27 − 7', categoryId: 'd20' },
      { id: 's50s2', text: '', categoryId: 'd20', figure: <TakeCard a={25} takeOnes={5} small /> },
      { id: 's50s3', text: '', categoryId: 'd20', figure: <BackJumpCard start={24} hops={[4]} small /> },
      { id: 's50s4', text: '36 − 6', categoryId: 'd30' },
      { id: 's50s5', text: '', categoryId: 'd30', figure: <TakeCard a={40} takeTens={1} small /> },
      { id: 's50s6', text: '', categoryId: 'd30', figure: <TakeCard a={38} takeOnes={8} small /> },
      { id: 's50s7', text: '48 − 8', categoryId: 'd40' },
      { id: 's50s8', text: '', categoryId: 'd40', figure: <TakeCard a={50} takeTens={1} small /> },
      { id: 's50s9', text: '', categoryId: 'd40', figure: <BackJumpCard start={43} hops={[3]} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átlépjük a tízest?',
    description: 'Elég az egyes, pont kerek tízes marad, vagy át kell lépni?',
    categories: [
      { id: 'no', name: 'Tízesátlépés nélkül', color: 'blue' },
      { id: 'exact', name: 'Pont kerek tízes marad', color: 'emerald' },
      { id: 'over', name: 'Tízesátlépéssel', color: 'rose' }
    ],
    items: [
      { id: 's50s10', text: '37 − 4', categoryId: 'no' },
      { id: 's50s11', text: '', categoryId: 'no', figure: <BackJumpCard start={29} hops={[5]} small /> },
      { id: 's50s12', text: '', categoryId: 'no', figure: <TakeCard a={46} takeOnes={3} small /> },
      { id: 's50s13', text: '45 − 5', categoryId: 'exact' },
      { id: 's50s14', text: '', categoryId: 'exact', figure: <BackJumpCard start={32} hops={[2]} small /> },
      { id: 's50s15', text: '', categoryId: 'exact', figure: <TakeCard a={28} takeOnes={8} small /> },
      { id: 's50s16', text: '31 − 6', categoryId: 'over' },
      { id: 's50s17', text: '', categoryId: 'over', figure: <BackJumpCard start={42} hops={[5]} small /> },
      { id: 's50s18', text: '', categoryId: 'over', figure: <TakeCard a={23} breakRod takeOnes={6} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Keresd meg a □ vagy a ? értékét!',
    categories: [
      { id: 'm6', name: 'Hiányzó szám: 6', color: 'sky' },
      { id: 'm9', name: 'Hiányzó szám: 9', color: 'purple' },
      { id: 'm12', name: 'Hiányzó szám: 12', color: 'amber' }
    ],
    items: [
      { id: 's50s19', text: '30 − □ = 24', categoryId: 'm6' },
      { id: 's50s20', text: '', categoryId: 'm6', figure: <PyramidCard left="18" right="?" top="24" small /> },
      { id: 's50s21', text: '', categoryId: 'm6', figure: <BalanceCard left="40−6" right="28+?" small /> },
      { id: 's50s22', text: '41 − □ = 32', categoryId: 'm9' },
      { id: 's50s23', text: '', categoryId: 'm9', figure: <PyramidCard left="?" right="25" top="34" small /> },
      { id: 's50s24', text: '', categoryId: 'm9', figure: <BalanceCard left="50−9" right="32+?" small /> },
      { id: 's50s25', text: '45 − □ = 33', categoryId: 'm12' },
      { id: 's50s26', text: '', categoryId: 'm12', figure: <PyramidCard left="?" right="26" top="38" small /> },
      { id: 's50s27', text: '', categoryId: 'm12', figure: <BalanceCard left="39−7" right="20+?" small /> }
    ]
  }
];

export const SUB50_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SUB50_G2_SORTER_LEVELS_LIST[0],
  2: SUB50_G2_SORTER_LEVELS_LIST[1],
  3: SUB50_G2_SORTER_LEVELS_LIST[2]
};

export const Sub50G2Sorter: React.FC<Sub50G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-kivonas-sorter',
  topicTitle = '3. Kivonás 50-es számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="kivonas-50-es-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét a kivonásokat különbség, tízesátlépés és hiányzó szám szerint!"
      levels={SUB50_G2_SORTER_LEVELS}
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

export default Sub50G2Sorter;
