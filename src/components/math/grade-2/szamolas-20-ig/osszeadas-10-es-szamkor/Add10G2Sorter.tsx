import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DiscAddCard,
  TenFrameCard,
  DicePairCard,
  NumberBondCard,
} from './Add10G2CardFigures';

interface Add10G2SorterProps {
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
  [key: string]: unknown;
}

const ADD10_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb, mint 6?',
    description: 'Számold ki az összeget, és tedd a kártyát a megfelelő dobozba!',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 6', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 6', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 6', color: 'rose' },
    ],
    items: [
      { id: 'a10s1', text: '', categoryId: 'kisebb', figure: <DiscAddCard a={2} b={2} small /> },
      { id: 'a10s2', text: '5 + 0', categoryId: 'kisebb' },
      { id: 'a10s3', text: '', categoryId: 'kisebb', figure: <DicePairCard a={1} b={2} small /> },
      { id: 'a10s4', text: '', categoryId: 'egyenlo', figure: <TenFrameCard a={4} b={2} small /> },
      { id: 'a10s5', text: '0 + 6', categoryId: 'egyenlo' },
      { id: 'a10s6', text: '1 + 2 + 3', categoryId: 'egyenlo' },
      { id: 'a10s7', text: '', categoryId: 'nagyobb', figure: <DiscAddCard a={4} b={5} small /> },
      { id: 'a10s8', text: '', categoryId: 'nagyobb', figure: <DicePairCard a={3} b={4} small /> },
      { id: 'a10s9', text: '5 + 5', categoryId: 'nagyobb' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Páros, páratlan vagy pontosan 10?',
    description: 'Nézd meg az összeget: 10, 10-nél kisebb páros, vagy 10-nél kisebb páratlan?',
    categories: [
      { id: 'paros', name: 'Páros (10 alatt)', color: 'sky' },
      { id: 'paratlan', name: 'Páratlan (10 alatt)', color: 'amber' },
      { id: 'tiz', name: 'Pontosan 10', color: 'emerald' },
    ],
    items: [
      { id: 'a10s10', text: '', categoryId: 'paros', figure: <DiscAddCard a={3} b={5} small /> },
      { id: 'a10s11', text: '0 + 4', categoryId: 'paros' },
      { id: 'a10s12', text: '', categoryId: 'paros', figure: <DicePairCard a={2} b={4} small /> },
      { id: 'a10s13', text: '', categoryId: 'paratlan', figure: <TenFrameCard a={5} b={2} small /> },
      { id: 'a10s14', text: '4 + 5', categoryId: 'paratlan' },
      { id: 'a10s15', text: '2 + 0 + 3', categoryId: 'paratlan' },
      { id: 'a10s16', text: '', categoryId: 'tiz', figure: <TenFrameCard a={6} b={4} small /> },
      { id: 'a10s17', text: '', categoryId: 'tiz', figure: <DicePairCard a={5} b={5} small /> },
      { id: 'a10s18', text: '3 + 7', categoryId: 'tiz' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Mennyi hiányzik?',
    description: 'Találd meg a hiányzó tagot a bontásban vagy az egyenletben!',
    categories: [
      { id: 'h2', name: '2 hiányzik', color: 'sky' },
      { id: 'h4', name: '4 hiányzik', color: 'purple' },
      { id: 'h5', name: '5 hiányzik', color: 'emerald' },
    ],
    items: [
      { id: 'a10s19', text: '8 + □ = 10', categoryId: 'h2', figure: <TenFrameCard a={8} askMissing small /> },
      { id: 'a10s20', text: '', categoryId: 'h2', figure: <NumberBondCard total={5} part={3} small /> },
      { id: 'a10s21', text: '□ + 7 = 9', categoryId: 'h2' },
      { id: 'a10s22', text: '6 + □ = 10', categoryId: 'h4', figure: <TenFrameCard a={6} askMissing small /> },
      { id: 'a10s23', text: '', categoryId: 'h4', figure: <NumberBondCard total={7} part={3} small /> },
      { id: 'a10s24', text: '2 + □ + 2 = 8', categoryId: 'h4' },
      { id: 'a10s25', text: '5 + □ = 10', categoryId: 'h5', figure: <TenFrameCard a={5} askMissing small /> },
      { id: 'a10s26', text: '0 + □ = 5', categoryId: 'h5' },
      { id: 'a10s27', text: '', categoryId: 'h5', figure: <NumberBondCard total={9} part={4} small /> },
    ],
  },
];

export const ADD10_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD10_G2_SORTER_LEVELS_LIST[0],
  2: ADD10_G2_SORTER_LEVELS_LIST[1],
  3: ADD10_G2_SORTER_LEVELS_LIST[2],
};

function resolveSorterLevel(
  level: DifficultyLevel | { level?: DifficultyLevel } | undefined,
  currentLevel: DifficultyLevel | undefined
): DifficultyLevel {
  if (currentLevel !== undefined) return currentLevel;
  if (typeof level === 'number') return level;
  if (level && typeof level === 'object' && level.level !== undefined) return level.level;
  return 1;
}

export const Add10G2Sorter: React.FC<Add10G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-osszeadas10-sorter',
  topicTitle = '2. Összeadás 10-es számkör – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = resolveSorterLevel(level, currentLevel);
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="osszeadas-10-es-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét az összeadásokat összeg, párosság és hiányzó tag szerint!"
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG"
      levels={ADD10_G2_SORTER_LEVELS}
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

export default Add10G2Sorter;
