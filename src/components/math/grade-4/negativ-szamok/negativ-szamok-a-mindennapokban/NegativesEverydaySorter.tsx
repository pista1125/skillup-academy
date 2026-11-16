import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativesEverydaySorterProps {
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

const NEG_EVERYDAY_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Negatív, nulla vagy pozitív?',
    description: 'Nézd meg, áll-e mínusz jel a szám előtt!',
    categories: [
      { id: 'neg', name: 'A 0-nál kisebb (negatív)', color: 'blue' },
      { id: 'zero', name: 'Pontosan 0', color: 'amber' },
      { id: 'pos', name: 'A 0-nál nagyobb (pozitív)', color: 'rose' }
    ],
    items: [
      { id: 'ne1s1', text: '−13', categoryId: 'neg' },
      { id: 'ne1s2', text: '−2005', categoryId: 'neg' },
      { id: 'ne1s3', text: '−37', categoryId: 'neg' },
      { id: 'ne1s4', text: '0 °C', categoryId: 'zero' },
      { id: 'ne1s5', text: 'a földszint', categoryId: 'zero' },
      { id: 'ne1s6', text: 'a tengerszint', categoryId: 'zero' },
      { id: 'ne1s7', text: '50', categoryId: 'pos' },
      { id: 'ne1s8', text: '2400', categoryId: 'pos' },
      { id: 'ne1s9', text: '1250', categoryId: 'pos' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Fagypont alatt vagy felett?',
    description: 'Hová tartozik a helyzet a hőmérőn?',
    categories: [
      { id: 'below', name: 'Fagypont alatt', color: 'blue' },
      { id: 'zero', name: 'Pont fagypont (0 °C)', color: 'teal' },
      { id: 'above', name: 'Fagypont felett', color: 'rose' }
    ],
    items: [
      { id: 'ne1s10', text: 'szánkózás a hóban', categoryId: 'below' },
      { id: 'ne1s11', text: 'mélyhűtő: −18 °C', categoryId: 'below' },
      { id: 'ne1s12', text: 'Zabar reggel: −10 °C', categoryId: 'below' },
      { id: 'ne1s13', text: 'olvad a jégcsap', categoryId: 'zero' },
      { id: 'ne1s14', text: 'Szeged reggel', categoryId: 'zero' },
      { id: 'ne1s15', text: 'Manó grafikonja 10 órakor', categoryId: 'zero' },
      { id: 'ne1s16', text: 'napozás a strandon', categoryId: 'above' },
      { id: 'ne1s17', text: 'tanterem: 20 °C', categoryId: 'above' },
      { id: 'ne1s18', text: 'Pécs reggel: 5 °C', categoryId: 'above' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melegebb vagy hidegebb lett?',
    description: 'Hasonlítsd össze a reggeli és az esti hőmérsékletet!',
    categories: [
      { id: 'warm', name: 'Melegebb lett', color: 'rose' },
      { id: 'cold', name: 'Hidegebb lett', color: 'blue' },
      { id: 'same', name: 'Nem változott', color: 'emerald' }
    ],
    items: [
      { id: 'ne1s19', text: '−10 °C → −8 °C', categoryId: 'warm' },
      { id: 'ne1s20', text: '−17 °C → −7 °C', categoryId: 'warm' },
      { id: 'ne1s21', text: '−4 °C → 0 °C', categoryId: 'warm' },
      { id: 'ne1s22', text: '3 °C → 0 °C', categoryId: 'cold' },
      { id: 'ne1s23', text: '−1 °C → −5 °C', categoryId: 'cold' },
      { id: 'ne1s24', text: '0 °C → −2 °C', categoryId: 'cold' },
      { id: 'ne1s25', text: '−3 °C → −3 °C', categoryId: 'same' },
      { id: 'ne1s26', text: '6 °C reggel és 6 °C este', categoryId: 'same' },
      { id: 'ne1s27', text: '−9 °C, és egész nap ennyi maradt', categoryId: 'same' }
    ]
  }
];

const NEG_EVERYDAY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_EVERYDAY_SORTER_LEVELS_LIST[0],
  2: NEG_EVERYDAY_SORTER_LEVELS_LIST[1],
  3: NEG_EVERYDAY_SORTER_LEVELS_LIST[2]
};

export const NegativesEverydaySorter: React.FC<NegativesEverydaySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-neg-mindennapok-sorter',
  topicTitle = '1. A negatív számok a mindennapokban – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="negativ-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat és a helyzeteket: 0 alatt, 0-n vagy 0 felett?"
      levels={NEG_EVERYDAY_SORTER_LEVELS}
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

export default NegativesEverydaySorter;
