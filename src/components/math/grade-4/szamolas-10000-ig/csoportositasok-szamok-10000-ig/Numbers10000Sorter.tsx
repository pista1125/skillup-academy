import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Numbers10000SorterProps {
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

const NUMBERS_10000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol áll a 7-es?',
    description: 'Válogasd szét a számokat aszerint, hogy a 7-es melyik helyen áll!',
    categories: [
      { id: 'ezres', name: 'Ezresek helyén (7000)', color: 'emerald' },
      { id: 'szazas', name: 'Százasok helyén (700)', color: 'rose' },
      { id: 'tizes', name: 'Tízesek helyén (70)', color: 'blue' }
    ],
    items: [
      { id: 'n10s1', text: '7045', categoryId: 'ezres' },
      { id: 'n10s2', text: '7300', categoryId: 'ezres' },
      { id: 'n10s3', text: '7918', categoryId: 'ezres' },
      { id: 'n10s4', text: '3712', categoryId: 'szazas' },
      { id: 'n10s5', text: '1709', categoryId: 'szazas' },
      { id: 'n10s6', text: '9750', categoryId: 'szazas' },
      { id: 'n10s7', text: '2374', categoryId: 'tizes' },
      { id: 'n10s8', text: '5076', categoryId: 'tizes' },
      { id: 'n10s9', text: '8871', categoryId: 'tizes' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hol van a számegyenesen?',
    description: 'Döntsd el, melyik szakaszra esik a szám!',
    categories: [
      { id: 'kicsi', name: '3000-nél kisebb', color: 'sky' },
      { id: 'kozep', name: '3000 és 7000 között', color: 'amber' },
      { id: 'nagy', name: '7000-nél nagyobb', color: 'purple' }
    ],
    items: [
      { id: 'n10s10', text: '2999', categoryId: 'kicsi' },
      { id: 'n10s11', text: 'ezerötszáz', categoryId: 'kicsi' },
      { id: 'n10s12', text: '28 százas', categoryId: 'kicsi' },
      { id: 'n10s13', text: '4321', categoryId: 'kozep' },
      { id: 'n10s14', text: 'ötezer-tíz', categoryId: 'kozep' },
      { id: 'n10s15', text: '6999', categoryId: 'kozep' },
      { id: 'n10s16', text: '7001', categoryId: 'nagy' },
      { id: 'n10s17', text: '95 százas', categoryId: 'nagy' },
      { id: 'n10s18', text: 'tízezer', categoryId: 'nagy' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan írjuk betűvel?',
    description: 'Válogasd szét a számokat a helyesírási szabály szerint!',
    categories: [
      { id: 'egybe2000', name: '2000-ig: egybeírjuk', color: 'teal' },
      { id: 'kerek', name: 'Kerek ezres: egybeírjuk', color: 'emerald' },
      { id: 'kotojel', name: '2000 fölött: kötőjellel', color: 'rose' }
    ],
    items: [
      { id: 'n10s19', text: '1805', categoryId: 'egybe2000' },
      { id: 'n10s20', text: '1999', categoryId: 'egybe2000' },
      { id: 'n10s21', text: '1450', categoryId: 'egybe2000' },
      { id: 'n10s22', text: '3000', categoryId: 'kerek' },
      { id: 'n10s23', text: '8000', categoryId: 'kerek' },
      { id: 'n10s24', text: '10 000', categoryId: 'kerek' },
      { id: 'n10s25', text: '2001', categoryId: 'kotojel' },
      { id: 'n10s26', text: '5700', categoryId: 'kotojel' },
      { id: 'n10s27', text: '9456', categoryId: 'kotojel' }
    ]
  }
];

const NUMBERS_10000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS_10000_SORTER_LEVELS_LIST[0],
  2: NUMBERS_10000_SORTER_LEVELS_LIST[1],
  3: NUMBERS_10000_SORTER_LEVELS_LIST[2]
};

export const Numbers10000Sorter: React.FC<Numbers10000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-szamok-10000-sorter',
  topicTitle = '9. Csoportosítások, számok 10 000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="csoportositasok-szamok-10000-ig"
      title={topicTitle}
      subtitle="Válogasd szét a négyjegyű számokat helyi érték, nagyság és helyesírás szerint!"
      levels={NUMBERS_10000_SORTER_LEVELS}
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

export default Numbers10000Sorter;
