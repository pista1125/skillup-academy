import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { AntCard, LadybugCard, PencilCard, SpoonCard, DoorCard, TreeCard, BusCard, BarCard, PathCard } from './LengthG3CardFigures';

interface LengthG3SorterProps {
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

const LENGTH_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik egységgel mérjük?',
    description: 'Kicsi, közepes vagy nagy? Válaszd ki a jó egységet!',
    categories: [
      { id: 'mm', name: 'milliméterrel', color: 'purple' },
      { id: 'cm', name: 'centiméterrel', color: 'sky' },
      { id: 'm', name: 'méterrel', color: 'emerald' }
    ],
    items: [
      { id: 'lens1', text: 'hangya', figure: <AntCard />, categoryId: 'mm' },
      { id: 'lens2', text: 'katica', figure: <LadybugCard />, categoryId: 'mm' },
      { id: 'lens3', text: 'egy rizsszem', categoryId: 'mm' },
      { id: 'lens4', text: 'ceruza', figure: <PencilCard />, categoryId: 'cm' },
      { id: 'lens5', text: 'kanál', figure: <SpoonCard />, categoryId: 'cm' },
      { id: 'lens6', text: 'a füzeted szélessége', categoryId: 'cm' },
      { id: 'lens7', text: 'ajtó', figure: <DoorCard />, categoryId: 'm' },
      { id: 'lens8', text: 'fa', figure: <TreeCard />, categoryId: 'm' },
      { id: 'lens9', text: 'busz', figure: <BusCard />, categoryId: 'm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Rövidebb vagy hosszabb 1 dm-nél?',
    description: 'A szürke csík pont 1 dm. A színes csík rövidebb, ugyanakkora vagy hosszabb?',
    categories: [
      { id: 'kisebb', name: 'rövidebb 1 dm-nél', color: 'amber' },
      { id: 'pont', name: 'pont 1 dm', color: 'teal' },
      { id: 'nagyobb', name: 'hosszabb 1 dm-nél', color: 'rose' }
    ],
    items: [
      { id: 'lens10', text: '', figure: <BarCard len={0.6} />, categoryId: 'kisebb' },
      { id: 'lens11', text: '', figure: <BarCard len={0.8} color="#16a34a" />, categoryId: 'kisebb' },
      { id: 'lens12', text: '95 mm', categoryId: 'kisebb' },
      { id: 'lens13', text: '', figure: <BarCard len={1} color="#db2777" />, categoryId: 'pont' },
      { id: 'lens14', text: '10 cm', categoryId: 'pont' },
      { id: 'lens15', text: '100 mm', categoryId: 'pont' },
      { id: 'lens16', text: '', figure: <BarCard len={1.2} color="#f59e0b" />, categoryId: 'nagyobb' },
      { id: 'lens17', text: '', figure: <BarCard len={1.36} color="#7c3aed" />, categoryId: 'nagyobb' },
      { id: 'lens18', text: '15 cm', categoryId: 'nagyobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Rövidebb vagy hosszabb 1 m-nél?',
    description: 'A rácson 1 kis négyzet oldala 10 cm. Számold meg a szakaszokat, vagy válts cm-re!',
    categories: [
      { id: 'kisebb', name: 'rövidebb 1 m-nél', color: 'amber' },
      { id: 'pont', name: 'pont 1 m', color: 'teal' },
      { id: 'nagyobb', name: 'hosszabb 1 m-nél', color: 'rose' }
    ],
    items: [
      { id: 'lens19', text: '', figure: <PathCard small start={[0, 4]} path={['u', 'u', 'u', 'r', 'r', 'r', 'r', 'r']} />, categoryId: 'kisebb' },
      { id: 'lens20', text: '99 cm', categoryId: 'kisebb' },
      { id: 'lens21', text: '9 dm', categoryId: 'kisebb' },
      { id: 'lens22', text: '', figure: <PathCard small start={[1, 1]} path={['r', 'r', 'r', 'd', 'd', 'l', 'l', 'l', 'u', 'u']} />, categoryId: 'pont' },
      { id: 'lens23', text: '', figure: <PathCard small start={[0, 5]} path={['u', 'r', 'u', 'r', 'u', 'r', 'u', 'r', 'u', 'r']} />, categoryId: 'pont' },
      { id: 'lens24', text: '1000 mm', categoryId: 'pont' },
      { id: 'lens25', text: '', figure: <PathCard small start={[0, 0]} path={['r', 'r', 'r', 'r', 'd', 'd', 'd', 'd', 'l', 'l', 'l', 'l']} />, categoryId: 'nagyobb' },
      { id: 'lens26', text: '1 m 5 cm', categoryId: 'nagyobb' },
      { id: 'lens27', text: '12 dm', categoryId: 'nagyobb' }
    ]
  }
];

export const LENGTH_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LENGTH_G3_SORTER_LEVELS_LIST[0],
  2: LENGTH_G3_SORTER_LEVELS_LIST[1],
  3: LENGTH_G3_SORTER_LEVELS_LIST[2]
};

export const LengthG3Sorter: React.FC<LengthG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-hosszusag-sorter',
  topicTitle = '4. A hosszúság mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-hosszusag-merese"
      title={topicTitle}
      subtitle="Válogasd szét a dolgokat és a hosszúságokat egység és nagyság szerint!"
      levels={LENGTH_G3_SORTER_LEVELS}
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

export default LengthG3Sorter;
