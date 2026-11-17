import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortSub } from './WrittenSub1000G3CardFigures';

interface WrittenSub1000G3SorterProps {
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
    title: '1. szint: Hányszor marad 1?',
    description: 'Nézd meg oszloponként: hol kell 10-zel többig pótolni?',
    categories: [
      { id: 'egy', name: 'Egyszer marad 1', color: 'emerald' },
      { id: 'ket', name: 'Kétszer marad 1', color: 'amber' },
      { id: 'harom', name: 'Háromszor marad 1', color: 'rose' }
    ],
    items: [
      { id: 'ws1ks1', text: '', figure: <SortSub a={540} b={236} />, categoryId: 'egy' },
      { id: 'ws1ks2', text: '', figure: <SortSub a={905} b={362} />, categoryId: 'egy' },
      { id: 'ws1ks3', text: '852 − 417', categoryId: 'egy' },
      { id: 'ws1ks4', text: '', figure: <SortSub a={832} b={467} />, categoryId: 'ket' },
      { id: 'ws1ks5', text: '', figure: <SortSub a={704} b={258} />, categoryId: 'ket' },
      { id: 'ws1ks6', text: '1000 − 450', categoryId: 'ket' },
      { id: 'ws1ks7', text: '', figure: <SortSub a={1000} b={347} />, categoryId: 'harom' },
      { id: 'ws1ks8', text: '', figure: <SortSub a={1000} b={509} />, categoryId: 'harom' },
      { id: 'ws1ks9', text: '1000 − 726', categoryId: 'harom' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a különbség?',
    description: 'Számold ki írásban, és tedd a jó dobozba!',
    categories: [
      { id: 'k300', name: '300-nál kevesebb', color: 'sky' },
      { id: 'k36', name: '300 és 600 között', color: 'amber' },
      { id: 'k600', name: '600-nál több', color: 'rose' }
    ],
    items: [
      { id: 'ws1ks10', text: '', figure: <SortSub a={502} b={286} />, categoryId: 'k300' },
      { id: 'ws1ks11', text: '', figure: <SortSub a={613} b={357} />, categoryId: 'k300' },
      { id: 'ws1ks12', text: '920 − 684', categoryId: 'k300' },
      { id: 'ws1ks13', text: '', figure: <SortSub a={804} b={329} />, categoryId: 'k36' },
      { id: 'ws1ks14', text: '', figure: <SortSub a={700} b={265} />, categoryId: 'k36' },
      { id: 'ws1ks15', text: '951 − 478', categoryId: 'k36' },
      { id: 'ws1ks16', text: '', figure: <SortSub a={1000} b={163} />, categoryId: 'k600' },
      { id: 'ws1ks17', text: '', figure: <SortSub a={903} b={175} />, categoryId: 'k600' },
      { id: 'ws1ks18', text: '1000 − 238', categoryId: 'k600' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibavadász',
    description: 'Ellenőrizd összeadással! Jó, vagy mi volt a hiba?',
    categories: [
      { id: 'jo', name: 'Jó eredmény', color: 'emerald' },
      { id: 'felejt', name: 'Elfelejtette a maradékot', color: 'amber' },
      { id: 'fordit', name: 'Fordítva pótolt', color: 'rose' }
    ],
    items: [
      { id: 'ws1ks19', text: '', figure: <SortSub a={832} b={467} r={365} />, categoryId: 'jo' },
      { id: 'ws1ks20', text: '', figure: <SortSub a={603} b={258} r={345} />, categoryId: 'jo' },
      { id: 'ws1ks21', text: '905 − 362 = 543', categoryId: 'jo' },
      { id: 'ws1ks22', text: '', figure: <SortSub a={700} b={254} r={556} />, categoryId: 'felejt' },
      { id: 'ws1ks23', text: '', figure: <SortSub a={1000} b={347} r={763} />, categoryId: 'felejt' },
      { id: 'ws1ks24', text: '804 − 329 = 585', categoryId: 'felejt' },
      { id: 'ws1ks25', text: '', figure: <SortSub a={613} b={357} r={344} />, categoryId: 'fordit' },
      { id: 'ws1ks26', text: '', figure: <SortSub a={920} b={684} r={364} />, categoryId: 'fordit' },
      { id: 'ws1ks27', text: '951 − 478 = 527', categoryId: 'fordit' }
    ]
  }
];

export const WRITTEN_SUB_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenSub1000G3Sorter: React.FC<WrittenSub1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wops-kivonas-sorter',
  topicTitle = '2. Írásbeli kivonás 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="irasbeli-kivonas-1000-ig"
      title={topicTitle}
      subtitle="Számolj írásban, és válogasd szét a kivonásokat!"
      levels={WRITTEN_SUB_1000_G3_SORTER_LEVELS}
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

export default WrittenSub1000G3Sorter;
