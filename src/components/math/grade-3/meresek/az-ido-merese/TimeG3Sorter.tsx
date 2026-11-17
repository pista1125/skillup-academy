import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MiniDigital,
  SortSweep,
  EyeIcon,
  BallIcon,
  ToothbrushIcon,
  EggPotIcon,
  BedMoonIcon,
  MountainIcon,
  SchoolIcon
} from './TimeG3CardFigures';

interface TimeG3SorterProps {
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

const TIME_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi ideig tart?',
    description: 'Másodpercekig, percekig vagy órákig tart?',
    categories: [
      { id: 'mp', name: 'néhány másodperc', color: 'amber' },
      { id: 'perc', name: 'néhány perc', color: 'emerald' },
      { id: 'ora', name: 'néhány óra', color: 'sky' }
    ],
    items: [
      { id: 'tg3s1', text: 'pislogás', figure: <EyeIcon />, categoryId: 'mp' },
      { id: 'tg3s2', text: 'labda elkapása', figure: <BallIcon />, categoryId: 'mp' },
      { id: 'tg3s3', text: 'a nevem leírása', categoryId: 'mp' },
      { id: 'tg3s4', text: 'fogmosás', figure: <ToothbrushIcon />, categoryId: 'perc' },
      { id: 'tg3s5', text: 'tojásfőzés', figure: <EggPotIcon />, categoryId: 'perc' },
      { id: 'tg3s6', text: 'egy rövid vers megtanulása', categoryId: 'perc' },
      { id: 'tg3s7', text: 'éjszakai alvás', figure: <BedMoonIcon />, categoryId: 'ora' },
      { id: 'tg3s8', text: 'kirándulás a hegyre', figure: <MountainIcon />, categoryId: 'ora' },
      { id: 'tg3s9', text: 'egy tanítási nap', figure: <SchoolIcon />, categoryId: 'ora' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik napszak?',
    description: 'Délelőtt: 12 óra előtt. Délután: 12 és 18 óra között. Este: 18 óra után.',
    categories: [
      { id: 'de', name: 'délelőtt', color: 'amber' },
      { id: 'du', name: 'délután', color: 'orange' },
      { id: 'este', name: 'este', color: 'purple' }
    ],
    items: [
      { id: 'tg3s10', text: '', figure: <MiniDigital text="7:30" small />, categoryId: 'de' },
      { id: 'tg3s11', text: '', figure: <MiniDigital text="10:15" small />, categoryId: 'de' },
      { id: 'tg3s12', text: '11 óra 25 perc', categoryId: 'de' },
      { id: 'tg3s13', text: '', figure: <MiniDigital text="13:40" small />, categoryId: 'du' },
      { id: 'tg3s14', text: '', figure: <MiniDigital text="17:10" small />, categoryId: 'du' },
      { id: 'tg3s15', text: '14 óra 5 perc', categoryId: 'du' },
      { id: 'tg3s16', text: '', figure: <MiniDigital text="20:45" small />, categoryId: 'este' },
      { id: 'tg3s17', text: '', figure: <MiniDigital text="19:30" small />, categoryId: 'este' },
      { id: 'tg3s18', text: '21 óra 10 perc', categoryId: 'este' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyit ment a nagymutató?',
    description: 'A szürke volt a kezdés, a kék a vége. Hány perc telt el?',
    categories: [
      { id: 'p15', name: '15 perc', color: 'sky' },
      { id: 'p30', name: '30 perc', color: 'emerald' },
      { id: 'p45', name: '45 perc', color: 'rose' }
    ],
    items: [
      { id: 'tg3s19', text: '', figure: <SortSweep m1={10} m2={25} />, categoryId: 'p15' },
      { id: 'tg3s20', text: '', figure: <SortSweep m1={40} m2={55} />, categoryId: 'p15' },
      { id: 'tg3s21', text: '8:50-től 9:05-ig', categoryId: 'p15' },
      { id: 'tg3s22', text: '', figure: <SortSweep m1={5} m2={35} />, categoryId: 'p30' },
      { id: 'tg3s23', text: '', figure: <SortSweep m1={45} m2={15} />, categoryId: 'p30' },
      { id: 'tg3s24', text: '6:40-től 7:10-ig', categoryId: 'p30' },
      { id: 'tg3s25', text: '', figure: <SortSweep m1={0} m2={45} />, categoryId: 'p45' },
      { id: 'tg3s26', text: '', figure: <SortSweep m1={20} m2={5} />, categoryId: 'p45' },
      { id: 'tg3s27', text: '11:30-tól 12:15-ig', categoryId: 'p45' }
    ]
  }
];

export const TIME_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TIME_G3_SORTER_LEVELS_LIST[0],
  2: TIME_G3_SORTER_LEVELS_LIST[1],
  3: TIME_G3_SORTER_LEVELS_LIST[2]
};

export const TimeG3Sorter: React.FC<TimeG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-ido-sorter',
  topicTitle = '9. Az idő mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-ido-merese"
      title={topicTitle}
      subtitle="Válogasd szét az időtartamokat és az időpontokat!"
      levels={TIME_G3_SORTER_LEVELS}
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

export default TimeG3Sorter;
