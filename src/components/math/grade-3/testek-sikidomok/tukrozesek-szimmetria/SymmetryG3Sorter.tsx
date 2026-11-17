import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortObj, SortLetter, SortShape } from './SymmetryG3CardFigures';

interface SymmetryG3SorterProps {
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

const SYMMETRY_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Merre áll a tükörtengely?',
    description: 'Hol hajthatod félbe az ábrát? Álló vonal mentén, fekvő vonal mentén, vagy sehogy?',
    categories: [
      { id: 'fugg', name: 'Függőleges tengely', color: 'sky' },
      { id: 'viz', name: 'Vízszintes tengely', color: 'amber' },
      { id: 'nincs', name: 'Nincs tükörtengelye', color: 'rose' }
    ],
    items: [
      { id: 'syms1_1', text: 'szív', figure: <SortObj kind="heart" />, categoryId: 'fugg' },
      { id: 'syms1_2', text: 'fenyőfa', figure: <SortObj kind="tree" />, categoryId: 'fugg' },
      { id: 'syms1_3', text: 'házikó', figure: <SortObj kind="house" />, categoryId: 'fugg' },
      { id: 'syms1_4', text: 'nyíl', figure: <SortObj kind="arrowRight" />, categoryId: 'viz' },
      { id: 'syms1_5', text: 'háromszög', figure: <SortObj kind="triRight" />, categoryId: 'viz' },
      { id: 'syms1_6', text: 'félkör', figure: <SortObj kind="halfDisc" />, categoryId: 'viz' },
      { id: 'syms1_7', text: 'zászló', figure: <SortObj kind="flag" />, categoryId: 'nincs' },
      { id: 'syms1_8', text: 'háromszög', figure: <SortObj kind="scalene" />, categoryId: 'nincs' },
      { id: 'syms1_9', text: 'villám', figure: <SortObj kind="bolt" />, categoryId: 'nincs' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Betűk',
    description: 'Melyik betűt hajthatod félbe, és merre? Válogasd szét!',
    categories: [
      { id: 'fugg', name: 'Függőleges tengely', color: 'sky' },
      { id: 'viz', name: 'Vízszintes tengely', color: 'amber' },
      { id: 'nincs', name: 'Nincs tükörtengelye', color: 'rose' }
    ],
    items: [
      { id: 'syms2_1', text: '', figure: <SortLetter ch="A" />, categoryId: 'fugg' },
      { id: 'syms2_2', text: '', figure: <SortLetter ch="T" />, categoryId: 'fugg' },
      { id: 'syms2_3', text: '', figure: <SortLetter ch="V" />, categoryId: 'fugg' },
      { id: 'syms2_4', text: '', figure: <SortLetter ch="B" />, categoryId: 'viz' },
      { id: 'syms2_5', text: '', figure: <SortLetter ch="E" />, categoryId: 'viz' },
      { id: 'syms2_6', text: '', figure: <SortLetter ch="K" />, categoryId: 'viz' },
      { id: 'syms2_7', text: '', figure: <SortLetter ch="F" />, categoryId: 'nincs' },
      { id: 'syms2_8', text: '', figure: <SortLetter ch="N" />, categoryId: 'nincs' },
      { id: 'syms2_9', text: '', figure: <SortLetter ch="S" />, categoryId: 'nincs' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány tükörtengely?',
    description: 'Számold meg a síkidom tükörtengelyeit! Nincs, pontosan 1, vagy több is?',
    categories: [
      { id: 't0', name: 'Nincs tükörtengelye', color: 'rose' },
      { id: 't1', name: 'Pontosan 1', color: 'sky' },
      { id: 'tt', name: 'Több is van', color: 'emerald' }
    ],
    items: [
      { id: 'syms3_1', text: 'ferde négyszög', figure: <SortShape kind="para" />, categoryId: 't0' },
      { id: 'syms3_2', text: 'háromszög', figure: <SortShape kind="scalene" />, categoryId: 't0' },
      { id: 'syms3_3', text: 'négyszög', figure: <SortShape kind="trapRight" />, categoryId: 't0' },
      { id: 'syms3_4', text: 'háromszög', figure: <SortShape kind="iso" />, categoryId: 't1' },
      { id: 'syms3_5', text: 'sárkány alakú', figure: <SortShape kind="kite" />, categoryId: 't1' },
      { id: 'syms3_6', text: 'négyszög', figure: <SortShape kind="trapIso" />, categoryId: 't1' },
      { id: 'syms3_7', text: 'téglalap', figure: <SortShape kind="rect" />, categoryId: 'tt' },
      { id: 'syms3_8', text: 'négyzet', figure: <SortShape kind="square" />, categoryId: 'tt' },
      { id: 'syms3_9', text: 'kör', figure: <SortShape kind="circle" />, categoryId: 'tt' }
    ]
  }
];

export const SYMMETRY_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SYMMETRY_G3_SORTER_LEVELS_LIST[0],
  2: SYMMETRY_G3_SORTER_LEVELS_LIST[1],
  3: SYMMETRY_G3_SORTER_LEVELS_LIST[2]
};

export const SymmetryG3Sorter: React.FC<SymmetryG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-geom-tukrozes-sorter',
  topicTitle = '4. Tükrözések, szimmetria – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="tukrozesek-szimmetria"
      title={topicTitle}
      subtitle="Hol a tükörtengely? Válogasd szét!"
      levels={SYMMETRY_G3_SORTER_LEVELS}
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

export default SymmetryG3Sorter;
