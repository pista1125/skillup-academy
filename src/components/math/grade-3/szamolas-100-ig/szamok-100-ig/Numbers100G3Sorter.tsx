import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard } from './Numbers100G3CardFigures';

interface Numbers100G3SorterProps {
  level?: DifficultyLevel;
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
  [key: string]: any;
}

const NUMBERS_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Páros vagy páratlan?',
    description: 'Nézd meg a szám utolsó jegyét! A képen számold meg a kockákat!',
    categories: [
      { id: 'kerek', name: 'Kerek tízes', color: 'sky' },
      { id: 'paros', name: 'Más páros szám', color: 'emerald' },
      { id: 'paratlan', name: 'Páratlan szám', color: 'rose' }
    ],
    items: [
      { id: 'n100s1', text: '', categoryId: 'kerek', figure: <BlocksCard tens={3} ones={0} small /> },
      { id: 'n100s2', text: '70', categoryId: 'kerek' },
      { id: 'n100s3', text: '100', categoryId: 'kerek' },
      { id: 'n100s4', text: '', categoryId: 'paros', figure: <BlocksCard tens={2} ones={4} small /> },
      { id: 'n100s5', text: '58', categoryId: 'paros' },
      { id: 'n100s6', text: '', categoryId: 'paros', figure: <BlocksCard tens={5} ones={2} small /> },
      { id: 'n100s7', text: '', categoryId: 'paratlan', figure: <BlocksCard tens={1} ones={7} small /> },
      { id: 'n100s8', text: '63', categoryId: 'paratlan' },
      { id: 'n100s9', text: '99', categoryId: 'paratlan' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány tízes van benne?',
    description: 'Tedd a számot oda, ahány tízes van benne! A képen a rudakat számold!',
    categories: [
      { id: 't4', name: '4 tízes', color: 'amber' },
      { id: 't5', name: '5 tízes', color: 'purple' },
      { id: 't6', name: '6 tízes', color: 'teal' }
    ],
    items: [
      { id: 'n100s10', text: '', categoryId: 't4', figure: <BlocksCard tens={4} ones={7} small /> },
      { id: 'n100s11', text: 'negyvenkilenc', categoryId: 't4' },
      { id: 'n100s12', text: '', categoryId: 't4', figure: <BlocksCard tens={4} ones={0} small /> },
      { id: 'n100s13', text: '57', categoryId: 't5' },
      { id: 'n100s14', text: 'ötvenegy', categoryId: 't5' },
      { id: 'n100s15', text: '', categoryId: 't5', figure: <BlocksCard tens={5} ones={8} small /> },
      { id: 'n100s16', text: '', categoryId: 't6', figure: <BlocksCard tens={6} ones={2} small /> },
      { id: 'n100s17', text: 'hatvanhat', categoryId: 't6' },
      { id: 'n100s18', text: '6 t + 3 e', categoryId: 't6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kisebb, egyenlő vagy nagyobb?',
    description: 'Hasonlítsd össze az 50-nel! Ha sok az egyes, válts be!',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 50', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 50', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 50', color: 'rose' }
    ],
    items: [
      { id: 'n100s19', text: '', categoryId: 'kisebb', figure: <BlocksCard tens={3} ones={19} small /> },
      { id: 'n100s20', text: '', categoryId: 'kisebb', figure: <BlocksCard tens={4} ones={8} small /> },
      { id: 'n100s21', text: 'negyvenhat', categoryId: 'kisebb' },
      { id: 'n100s22', text: '', categoryId: 'egyenlo', figure: <BlocksCard tens={4} ones={10} small /> },
      { id: 'n100s23', text: '5 t + 0 e', categoryId: 'egyenlo' },
      { id: 'n100s24', text: 'ötven', categoryId: 'egyenlo' },
      { id: 'n100s25', text: '2 t + 31 e', categoryId: 'nagyobb' },
      { id: 'n100s26', text: '', categoryId: 'nagyobb', figure: <BlocksCard tens={4} ones={13} small /> },
      { id: 'n100s27', text: 'hatvanegy', categoryId: 'nagyobb' }
    ]
  }
];

export const NUMBERS_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS_100_G3_SORTER_LEVELS_LIST[0],
  2: NUMBERS_100_G3_SORTER_LEVELS_LIST[1],
  3: NUMBERS_100_G3_SORTER_LEVELS_LIST[2]
};

export const Numbers100G3Sorter: React.FC<Numbers100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-szamok-sorter',
  topicTitle = '1. Számok 100-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szamok-100-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat: páros-páratlan, tízesek száma, nagyság!"
      levels={NUMBERS_100_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Numbers100G3Sorter;
