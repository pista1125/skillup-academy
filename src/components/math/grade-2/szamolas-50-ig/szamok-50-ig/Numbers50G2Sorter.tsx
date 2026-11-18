import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, CoinsCard, EggsCard } from './Numbers50G2CardFigures';

interface Numbers50G2SorterProps {
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

const NUMBERS50_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány egyes van benne?',
    description: 'Nézd meg az egyeseket! Tedd a jó dobozba!',
    categories: [
      { id: 'e3', name: '3 egyes', color: 'sky' },
      { id: 'e6', name: '6 egyes', color: 'emerald' },
      { id: 'e8', name: '8 egyes', color: 'amber' }
    ],
    items: [
      { id: 'n50s1', text: '', categoryId: 'e3', figure: <BlocksCard tens={2} ones={3} small /> },
      { id: 'n50s2', text: '', categoryId: 'e3', figure: <EggsCard trays={3} eggs={3} small /> },
      { id: 'n50s3', text: '43', categoryId: 'e3' },
      { id: 'n50s4', text: '', categoryId: 'e6', figure: <BlocksCard tens={4} ones={6} small /> },
      { id: 'n50s5', text: '', categoryId: 'e6', figure: <EggsCard trays={2} eggs={6} small /> },
      { id: 'n50s6', text: 'harminchat', categoryId: 'e6' },
      { id: 'n50s7', text: '', categoryId: 'e8', figure: <BlocksCard tens={3} ones={8} small /> },
      { id: 'n50s8', text: '', categoryId: 'e8', figure: <EggsCard trays={4} eggs={8} small /> },
      { id: 'n50s9', text: '28', categoryId: 'e8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint 35?',
    description: 'Hasonlítsd össze a 35-tel!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 35', color: 'blue' },
      { id: 'eq', name: 'Pont 35', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint 35', color: 'rose' }
    ],
    items: [
      { id: 'n50s10', text: '', categoryId: 'lt', figure: <BlocksCard tens={3} ones={2} small /> },
      { id: 'n50s11', text: '29', categoryId: 'lt' },
      { id: 'n50s12', text: '3 tízes + 4 egyes', categoryId: 'lt' },
      { id: 'n50s13', text: '', categoryId: 'eq', figure: <BlocksCard tens={3} ones={5} small /> },
      { id: 'n50s14', text: '', categoryId: 'eq', figure: <CoinsCard coins={[20, 10, 5]} small /> },
      { id: 'n50s15', text: '5 egyes + 3 tízes', categoryId: 'eq' },
      { id: 'n50s16', text: '', categoryId: 'gt', figure: <BlocksCard tens={5} ones={0} small /> },
      { id: 'n50s17', text: '41', categoryId: 'gt' },
      { id: 'n50s18', text: '', categoryId: 'gt', figure: <EggsCard trays={3} eggs={8} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik két kerek tízes között van?',
    description: 'Keresd meg a tízes szomszédokat!',
    categories: [
      { id: 't23', name: '20 és 30 között', color: 'sky' },
      { id: 't34', name: '30 és 40 között', color: 'purple' },
      { id: 't45', name: '40 és 50 között', color: 'amber' }
    ],
    items: [
      { id: 'n50s19', text: '', categoryId: 't23', figure: <BlocksCard tens={2} ones={7} small /> },
      { id: 'n50s20', text: '', categoryId: 't23', figure: <CoinsCard coins={[20, 5]} small /> },
      { id: 'n50s21', text: '29', categoryId: 't23' },
      { id: 'n50s22', text: '', categoryId: 't34', figure: <BlocksCard tens={3} ones={4} small /> },
      { id: 'n50s23', text: '', categoryId: 't34', figure: <CoinsCard coins={[20, 10, 5]} small /> },
      { id: 'n50s24', text: 'harmincegy', categoryId: 't34' },
      { id: 'n50s25', text: '', categoryId: 't45', figure: <EggsCard trays={4} eggs={2} small /> },
      { id: 'n50s26', text: '', categoryId: 't45', figure: <BlocksCard tens={4} ones={9} small /> },
      { id: 'n50s27', text: '46', categoryId: 't45' }
    ]
  }
];

export const NUMBERS50_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS50_G2_SORTER_LEVELS_LIST[0],
  2: NUMBERS50_G2_SORTER_LEVELS_LIST[1],
  3: NUMBERS50_G2_SORTER_LEVELS_LIST[2]
};

export const Numbers50G2Sorter: React.FC<Numbers50G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-szamok-sorter',
  topicTitle = '1. Számok 50-ig – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="szamok-50-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat egyesek, nagyság és tízes szomszédok szerint!"
      levels={NUMBERS50_G2_SORTER_LEVELS}
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

export default Numbers50G2Sorter;
