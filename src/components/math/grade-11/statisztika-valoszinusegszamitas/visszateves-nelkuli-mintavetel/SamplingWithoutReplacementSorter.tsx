import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SamplingWithoutReplacementSorterProps {
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

const SAMPLING_WITHOUT_REPLACEMENT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen kiválasztás ez?',
    description: 'Döntsd el, hogy a kísérlet visszatevés nélküli vagy visszatevéses mintavétel, vagy csak egyetlen elemet választunk!',
    categories: [
      { id: 'without', name: 'Visszatevés nélküli mintavétel', color: 'blue' },
      { id: 'with', name: 'Visszatevéses (ismételt) kiválasztás', color: 'amber' },
      { id: 'single', name: 'Egyetlen elem kiválasztása', color: 'slate' }
    ],
    items: [
      { id: 'swrs1', text: 'ötös lottó sorsolása', categoryId: 'without' },
      { id: 'swrs2', text: '3 lap osztása a pakliból', categoryId: 'without' },
      { id: 'swrs3', text: '4 diák kiválasztása az osztályból', categoryId: 'without' },
      { id: 'swrs4', text: 'golyót húzunk, visszatesszük, majd újra húzunk', categoryId: 'with' },
      { id: 'swrs5', text: 'egy kockával háromszor dobunk', categoryId: 'with' },
      { id: 'swrs6', text: 'egy érmét ötször feldobunk', categoryId: 'with' },
      { id: 'swrs7', text: 'egy tombolaszelvény kihúzása', categoryId: 'single' },
      { id: 'swrs8', text: 'egyetlen golyó kihúzása az urnából', categoryId: 'single' },
      { id: 'swrs9', text: 'egy diák kisorsolása felelőnek', categoryId: 'single' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Szorzás, összeadás vagy komplementer?',
    description: 'Melyik művelettel kapjuk meg a keresett számot vagy valószínűséget?',
    categories: [
      { id: 'mul', name: 'Szorzás („és”, egy ág mentén)', color: 'emerald' },
      { id: 'add', name: 'Összeadás (kizáró esetek, több út)', color: 'violet' },
      { id: 'comp', name: 'Komplementer: 1 − P(egyik sem)', color: 'rose' }
    ],
    items: [
      { id: 'swrs10', text: '3 sárga és 2 piros golyó kiválasztásainak száma', categoryId: 'mul' },
      { id: 'swrs11', text: 'a fa egy ága: 4/10, majd 3/9', categoryId: 'mul' },
      { id: 'swrs12', text: '1 brácsás és 1 hegedűs párok száma', categoryId: 'mul' },
      { id: 'swrs13', text: 'P(PS) és P(SP) együtt: pontosan 1 piros', categoryId: 'add' },
      { id: 'swrs14', text: 'mind a 412-es vagy mind a 413-as kocsiban', categoryId: 'add' },
      { id: 'swrs15', text: 'pontosan 0 vagy pontosan 1 gólszerző', categoryId: 'add' },
      { id: 'swrs16', text: 'legalább egy csorba pohár a 4 között', categoryId: 'comp' },
      { id: 'swrs17', text: 'legalább egy találat a lottón', categoryId: 'comp' },
      { id: 'swrs18', text: 'van gólszerző a 3 kiválasztott között', categoryId: 'comp' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a valószínűség?',
    description: 'Számold ki a valószínűséget (visszatevés nélkül), és sorold be!',
    categories: [
      { id: 'low', name: 'p < 0,1', color: 'rose' },
      { id: 'mid', name: '0,1 ≤ p < 0,5', color: 'teal' },
      { id: 'high', name: 'p ≥ 0,5', color: 'violet' }
    ],
    items: [
      { id: 'swrs19', text: '4 piros, 6 sárga, 5 húzás: mind sárga', categoryId: 'low' },
      { id: 'swrs20', text: '36 diák (5 gitáros), 4 kiválasztott: pontosan 2 gitáros', categoryId: 'low' },
      { id: 'swrs21', text: '50 pohár (3 csorba), 4 kiválasztott: 2 csorba és 2 ép', categoryId: 'low' },
      { id: 'swrs22', text: '4 piros, 6 sárga, 5 húzás: pontosan 3 sárga', categoryId: 'mid' },
      { id: 'swrs23', text: '12 játékos (3 gólszerző), 3 kiválasztott: egyik sem gólszerző', categoryId: 'mid' },
      { id: 'swrs24', text: 'zenekar (14 hegedűs a 24-ből), 2 zenész: mindkettő hegedűs', categoryId: 'mid' },
      { id: 'swrs25', text: 'zenekar (14 hegedűs a 24-ből), 2 zenész: pontosan 1 hegedűs', categoryId: 'high' },
      { id: 'swrs26', text: '50 pohár (3 csorba), 4 kiválasztott: mind ép', categoryId: 'high' },
      { id: 'swrs27', text: '4 piros, 6 sárga, 2 húzás: pontosan 1 piros', categoryId: 'high' }
    ]
  }
};

export const SamplingWithoutReplacementSorter: React.FC<SamplingWithoutReplacementSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-visszateves-nelkul-sorter',
  topicTitle = '11. Visszatevés nélküli mintavétel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszateves-nelkuli-mintavetel"
      title={topicTitle}
      subtitle="Ismerd fel a mintavétel fajtáját, a szükséges műveletet, és becsüld meg a valószínűséget!"
      levels={SAMPLING_WITHOUT_REPLACEMENT_SORTER_LEVELS}
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

export default SamplingWithoutReplacementSorter;
