import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortAdd } from './WrittenAdd1000G3CardFigures';

interface WrittenAdd1000G3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi marad az egyeseknél?',
    description: 'Add össze csak az egyeseket! 10–19: maradt 1. 20 vagy több: maradt 2.',
    categories: [
      { id: 'm0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'm1', name: 'Maradt 1', color: 'amber' },
      { id: 'm2', name: 'Maradt 2', color: 'rose' }
    ],
    items: [
      { id: 'wa1ks1', text: '', figure: <SortAdd xs={[134, 252, 311]} />, categoryId: 'm0' },
      { id: 'wa1ks2', text: '', figure: <SortAdd xs={[205, 342, 121]} />, categoryId: 'm0' },
      { id: 'wa1ks3', text: '163 + 421 + 214', categoryId: 'm0' },
      { id: 'wa1ks4', text: '', figure: <SortAdd xs={[248, 175, 396]} />, categoryId: 'm1' },
      { id: 'wa1ks5', text: '', figure: <SortAdd xs={[367, 214, 105]} />, categoryId: 'm1' },
      { id: 'wa1ks6', text: '143 + 226 + 318', categoryId: 'm1' },
      { id: 'wa1ks7', text: '', figure: <SortAdd xs={[159, 217, 346]} />, categoryId: 'm2' },
      { id: 'wa1ks8', text: '', figure: <SortAdd xs={[278, 165, 319]} />, categoryId: 'm2' },
      { id: 'wa1ks9', text: '186 + 357 + 279', categoryId: 'm2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora az összeg?',
    description: 'Számold ki írásban, és tedd a jó dobozba!',
    categories: [
      { id: 'k600', name: '600-nál kevesebb', color: 'sky' },
      { id: 'k68', name: '600 és 800 között', color: 'amber' },
      { id: 'k800', name: '800-nál több', color: 'rose' }
    ],
    items: [
      { id: 'wa1ks10', text: '', figure: <SortAdd xs={[245, 318]} />, categoryId: 'k600' },
      { id: 'wa1ks11', text: '', figure: <SortAdd xs={[163, 274, 108]} />, categoryId: 'k600' },
      { id: 'wa1ks12', text: '205 + 342', categoryId: 'k600' },
      { id: 'wa1ks13', text: '', figure: <SortAdd xs={[356, 267]} />, categoryId: 'k68' },
      { id: 'wa1ks14', text: '', figure: <SortAdd xs={[284, 195, 236]} />, categoryId: 'k68' },
      { id: 'wa1ks15', text: '408 + 297', categoryId: 'k68' },
      { id: 'wa1ks16', text: '', figure: <SortAdd xs={[372, 186, 245]} />, categoryId: 'k800' },
      { id: 'wa1ks17', text: '', figure: <SortAdd xs={[459, 348]} />, categoryId: 'k800' },
      { id: 'wa1ks18', text: '263 + 184 + 357', categoryId: 'k800' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibavadász',
    description: 'Számold újra! Jó az eredmény, vagy mennyivel kevesebb a jónál?',
    categories: [
      { id: 'jo', name: 'Jó eredmény', color: 'emerald' },
      { id: 'm10', name: '10-zel kevesebb a jónál', color: 'amber' },
      { id: 'm100', name: '100-zal kevesebb a jónál', color: 'rose' }
    ],
    items: [
      { id: 'wa1ks19', text: '', figure: <SortAdd xs={[476, 358]} res={834} />, categoryId: 'jo' },
      { id: 'wa1ks20', text: '', figure: <SortAdd xs={[298, 437]} res={735} />, categoryId: 'jo' },
      { id: 'wa1ks21', text: '567 + 286 = 853', categoryId: 'jo' },
      { id: 'wa1ks22', text: '', figure: <SortAdd xs={[659, 184]} res={833} />, categoryId: 'm10' },
      { id: 'wa1ks23', text: '', figure: <SortAdd xs={[375, 447]} res={812} />, categoryId: 'm10' },
      { id: 'wa1ks24', text: '188 + 535 = 713', categoryId: 'm10' },
      { id: 'wa1ks25', text: '', figure: <SortAdd xs={[469, 278]} res={647} />, categoryId: 'm100' },
      { id: 'wa1ks26', text: '', figure: <SortAdd xs={[593, 219]} res={712} />, categoryId: 'm100' },
      { id: 'wa1ks27', text: '356 + 267 = 523', categoryId: 'm100' }
    ]
  }
];

export const WRITTEN_ADD_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenAdd1000G3Sorter: React.FC<WrittenAdd1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wops-osszeadas-sorter',
  topicTitle = '1. Írásbeli összeadás 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas-1000-ig"
      title={topicTitle}
      subtitle="Számolj írásban, és válogasd szét az összeadásokat!"
      levels={WRITTEN_ADD_1000_G3_SORTER_LEVELS}
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

export default WrittenAdd1000G3Sorter;
