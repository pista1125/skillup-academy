import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard80, ChartCard } from './Numbers100G2CardFigures';

interface Numbers100G2SorterProps {
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

const NUMBERS100_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány tízes van benne?',
    description: 'Számold meg a rudakat, vagy nézd az első számjegyet!',
    categories: [
      { id: 't6', name: '6 tízes', color: 'sky' },
      { id: 't7', name: '7 tízes', color: 'emerald' },
      { id: 't8', name: '8 tízes', color: 'amber' }
    ],
    items: [
      { id: 'n100s1', text: '', categoryId: 't6', figure: <RodsCard80 tens={6} ones={4} /> },
      { id: 'n100s2', text: '', categoryId: 't6', figure: <RodsCard80 tens={6} ones={0} /> },
      { id: 'n100s3', text: '69', categoryId: 't6' },
      { id: 'n100s4', text: '', categoryId: 't7', figure: <RodsCard80 tens={7} ones={2} /> },
      { id: 'n100s5', text: '', categoryId: 't7', figure: <RodsCard80 tens={7} ones={9} /> },
      { id: 'n100s6', text: '73', categoryId: 't7' },
      { id: 'n100s7', text: '', categoryId: 't8', figure: <RodsCard80 tens={8} ones={1} /> },
      { id: 'n100s8', text: '86', categoryId: 't8' },
      { id: 'n100s9', text: '', categoryId: 't8', figure: <RodsCard80 tens={8} ones={5} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, közte vagy nagyobb?',
    description: 'Hasonlítsd össze a 60-nal és a 80-nal! A táblás képen a ? számát nézd!',
    categories: [
      { id: 'lt60', name: '60-nál kisebb', color: 'blue' },
      { id: 'mid', name: '60 és 80 között', color: 'emerald' },
      { id: 'gt80', name: '80-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'n100s10', text: '', categoryId: 'lt60', figure: <RodsCard80 tens={5} ones={7} /> },
      { id: 'n100s11', text: '52', categoryId: 'lt60' },
      { id: 'n100s12', text: '', categoryId: 'lt60', figure: <ChartCard known={48} dr={1} dc={0} small /> },
      { id: 'n100s13', text: '', categoryId: 'mid', figure: <RodsCard80 tens={7} ones={4} /> },
      { id: 'n100s14', text: '66', categoryId: 'mid' },
      { id: 'n100s15', text: '', categoryId: 'mid', figure: <RodsCard80 tens={6} ones={8} /> },
      { id: 'n100s16', text: '', categoryId: 'gt80', figure: <RodsCard80 tens={9} ones={9} /> },
      { id: 'n100s17', text: '85', categoryId: 'gt80' },
      { id: 'n100s18', text: '', categoryId: 'gt80', figure: <ChartCard known={82} dr={1} dc={0} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Páros, páratlan vagy kerek tízes?',
    description: 'Nézd az egyeseket! A kerek tízesnél 0 egyes van.',
    categories: [
      { id: 'odd', name: 'Páratlan', color: 'purple' },
      { id: 'even', name: 'Páros, de nem kerek tízes', color: 'sky' },
      { id: 'round', name: 'Kerek tízes', color: 'amber' }
    ],
    items: [
      { id: 'n100s19', text: '', categoryId: 'odd', figure: <RodsCard80 tens={6} ones={7} /> },
      { id: 'n100s20', text: '91', categoryId: 'odd' },
      { id: 'n100s21', text: '', categoryId: 'odd', figure: <RodsCard80 tens={7} ones={5} /> },
      { id: 'n100s22', text: '', categoryId: 'even', figure: <RodsCard80 tens={8} ones={4} /> },
      { id: 'n100s23', text: '58', categoryId: 'even' },
      { id: 'n100s24', text: '', categoryId: 'even', figure: <RodsCard80 tens={5} ones={6} /> },
      { id: 'n100s25', text: '', categoryId: 'round', figure: <RodsCard80 tens={9} ones={0} /> },
      { id: 'n100s26', text: '100', categoryId: 'round' },
      { id: 'n100s27', text: '', categoryId: 'round', figure: <RodsCard80 tens={7} ones={0} /> }
    ]
  }
];

export const NUMBERS100_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS100_G2_SORTER_LEVELS_LIST[0],
  2: NUMBERS100_G2_SORTER_LEVELS_LIST[1],
  3: NUMBERS100_G2_SORTER_LEVELS_LIST[2]
};

export const Numbers100G2Sorter: React.FC<Numbers100G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-szamok-sorter',
  topicTitle = '1. Számok 100-ig – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szamok-100-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat tízesek, nagyság és párosság szerint!"
      levels={NUMBERS100_G2_SORTER_LEVELS}
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

export default Numbers100G2Sorter;
