import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DiscsCard, DotsPairCard, LineArrowCard } from './Numbers20G2CardFigures';

interface Numbers20G2SorterProps {
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
  [key: string]: unknown;
}

const NUMBERS20_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egyjegyű vagy kétjegyű? Páros vagy páratlan?',
    description: 'Nézd meg a pöttyök párjait vagy a korongokat! Hová tartozik a szám?',
    categories: [
      { id: 'egyjegy_paros', name: 'Egyjegyű páros', color: 'emerald' },
      { id: 'egyjegy_paratlan', name: 'Egyjegyű páratlan', color: 'amber' },
      { id: 'ketjegy', name: 'Kétjegyű szám', color: 'sky' },
    ],
    items: [
      { id: 'n20s1', text: '', categoryId: 'egyjegy_paros', figure: <DotsPairCard count={0} small /> },
      { id: 'n20s2', text: '', categoryId: 'egyjegy_paros', figure: <DotsPairCard count={4} small /> },
      { id: 'n20s3', text: 'hat', categoryId: 'egyjegy_paros' },
      { id: 'n20s4', text: '', categoryId: 'egyjegy_paratlan', figure: <DotsPairCard count={3} small /> },
      { id: 'n20s5', text: '', categoryId: 'egyjegy_paratlan', figure: <DotsPairCard count={7} small /> },
      { id: 'n20s6', text: 'kilenc', categoryId: 'egyjegy_paratlan' },
      { id: 'n20s7', text: '', categoryId: 'ketjegy', figure: <DiscsCard tens={1} ones={2} small /> },
      { id: 'n20s8', text: '', categoryId: 'ketjegy', figure: <DiscsCard tens={1} ones={5} small /> },
      { id: 'n20s9', text: 'húsz', categoryId: 'ketjegy' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint 10?',
    description: 'Hasonlítsd össze a számokat a 10-zel!',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 10', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 10', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 10', color: 'rose' },
    ],
    items: [
      { id: 'n20s10', text: '', categoryId: 'kisebb', figure: <DotsPairCard count={5} small /> },
      { id: 'n20s11', text: '', categoryId: 'kisebb', figure: <LineArrowCard value={9} lo={0} hi={10} small /> },
      { id: 'n20s12', text: 'nyolc', categoryId: 'kisebb' },
      { id: 'n20s13', text: '', categoryId: 'egyenlo', figure: <DiscsCard tens={1} ones={0} small /> },
      { id: 'n20s14', text: '', categoryId: 'egyenlo', figure: <DiscsCard tens={0} ones={10} small /> },
      { id: 'n20s15', text: '1 tízes', categoryId: 'egyenlo' },
      { id: 'n20s16', text: '', categoryId: 'nagyobb', figure: <DiscsCard tens={1} ones={3} small /> },
      { id: 'n20s17', text: '', categoryId: 'nagyobb', figure: <DiscsCard tens={2} ones={0} small /> },
      { id: 'n20s18', text: 'tizenhat', categoryId: 'nagyobb' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű páros, kétjegyű páratlan vagy egyjegyű?',
    description: 'Figyelj a 10-esek és az 1-esek beváltására, majd döntsd el a tulajdonságot!',
    categories: [
      { id: 'ketjegy_paros', name: 'Kétjegyű páros', color: 'purple' },
      { id: 'ketjegy_paratlan', name: 'Kétjegyű páratlan', color: 'rose' },
      { id: 'egyjegy', name: 'Egyjegyű (0–9)', color: 'teal' },
    ],
    items: [
      { id: 'n20s19', text: '', categoryId: 'ketjegy_paros', figure: <DiscsCard tens={1} ones={4} small /> },
      { id: 'n20s20', text: '', categoryId: 'ketjegy_paros', figure: <DiscsCard tens={1} ones={10} small /> },
      { id: 'n20s21', text: 'tizennyolc', categoryId: 'ketjegy_paros' },
      { id: 'n20s22', text: '', categoryId: 'ketjegy_paratlan', figure: <LineArrowCard value={11} lo={10} hi={20} small /> },
      { id: 'n20s23', text: '', categoryId: 'ketjegy_paratlan', figure: <DiscsCard tens={1} ones={7} small /> },
      { id: 'n20s24', text: 'tizenöt', categoryId: 'ketjegy_paratlan' },
      { id: 'n20s25', text: '', categoryId: 'egyjegy', figure: <DotsPairCard count={0} small /> },
      { id: 'n20s26', text: '', categoryId: 'egyjegy', figure: <DotsPairCard count={9} small /> },
      { id: 'n20s27', text: 'négy', categoryId: 'egyjegy' },
    ],
  },
];

export const NUMBERS20_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS20_G2_SORTER_LEVELS_LIST[0],
  2: NUMBERS20_G2_SORTER_LEVELS_LIST[1],
  3: NUMBERS20_G2_SORTER_LEVELS_LIST[2],
};

export const Numbers20G2Sorter: React.FC<Numbers20G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-szamok-sorter',
  topicTitle = '1. Számok 0-tól 20-ig – Csoportosító',
  ...rest
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : 1);
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="szamok-0-tol-20-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat egyjegyű vagy kétjegyű, páros vagy páratlan és nagyság szerint!"
      levels={NUMBERS20_G2_SORTER_LEVELS}
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

export default Numbers20G2Sorter;
