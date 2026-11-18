import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SectorCard, SpanCard, MonthCard, WeeksCard } from './TimeG2CardFigures';

interface TimeG2SorterProps {
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
}

const TIME_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Rövidebb vagy hosszabb, mint 1 óra?',
    description: '1 óra = 60 perc. A sárga rész az eltelt idő az órán.',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 1 óra', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 óra', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 1 óra', color: 'amber' }
    ],
    items: [
      { id: 'tims1', text: 'fél óra', categoryId: 'lt' },
      { id: 'tims2', text: '', categoryId: 'lt', figure: <SectorCard small minutes={15} /> },
      { id: 'tims3', text: '', categoryId: 'lt', figure: <SectorCard small minutes={40} /> },
      { id: 'tims4', text: '60 perc', categoryId: 'eq' },
      { id: 'tims5', text: '', categoryId: 'eq', figure: <SectorCard small minutes={60} /> },
      { id: 'tims6', text: '30 perc + 30 perc', categoryId: 'eq' },
      { id: 'tims7', text: '65 perc', categoryId: 'gt' },
      { id: 'tims8', text: '2 óra', categoryId: 'gt' },
      { id: 'tims9', text: '', categoryId: 'gt', figure: <SpanCard small from="8:00" to="9:20" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik évszakban van?',
    description: 'A naptárlapon a hónap sorszáma áll római számmal. Tedd a hónapot a jó évszakhoz!',
    categories: [
      { id: 'spring', name: 'Tavasz', color: 'rose' },
      { id: 'summer', name: 'Nyár', color: 'amber' },
      { id: 'autumn', name: 'Ősz', color: 'orange' }
    ],
    items: [
      { id: 'tims10', text: 'március', categoryId: 'spring' },
      { id: 'tims11', text: 'május', categoryId: 'spring' },
      { id: 'tims12', text: '', categoryId: 'spring', figure: <MonthCard roman="IV" /> },
      { id: 'tims13', text: 'június', categoryId: 'summer' },
      { id: 'tims14', text: 'augusztus', categoryId: 'summer' },
      { id: 'tims15', text: '', categoryId: 'summer', figure: <MonthCard roman="VII" /> },
      { id: 'tims16', text: 'október', categoryId: 'autumn' },
      { id: 'tims17', text: '', categoryId: 'autumn', figure: <MonthCard roman="IX" /> },
      { id: 'tims18', text: '', categoryId: 'autumn', figure: <MonthCard roman="XI" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány hét?',
    description: '1 hét = 7 nap. Egy sorban 7 kocka van: az 1 hét. Számold meg a heteket!',
    categories: [
      { id: 'w2', name: '2 hét', color: 'sky' },
      { id: 'w3', name: '3 hét', color: 'emerald' },
      { id: 'w4', name: '4 hét', color: 'purple' }
    ],
    items: [
      { id: 'tims19', text: '14 nap', categoryId: 'w2' },
      { id: 'tims20', text: '7 nap + 7 nap', categoryId: 'w2' },
      { id: 'tims21', text: '', categoryId: 'w2', figure: <WeeksCard days={14} /> },
      { id: 'tims22', text: '21 nap', categoryId: 'w3' },
      { id: 'tims23', text: '', categoryId: 'w3', figure: <WeeksCard days={21} /> },
      { id: 'tims24', text: '', categoryId: 'w3', figure: <WeeksCard days={21} split={14} /> },
      { id: 'tims25', text: '28 nap', categoryId: 'w4' },
      { id: 'tims26', text: '', categoryId: 'w4', figure: <WeeksCard days={28} /> },
      { id: 'tims27', text: 'egy február (nem szökőév)', categoryId: 'w4' }
    ]
  }
];

export const TIME_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TIME_G2_SORTER_LEVELS_LIST[0],
  2: TIME_G2_SORTER_LEVELS_LIST[1],
  3: TIME_G2_SORTER_LEVELS_LIST[2]
};

export const TimeG2Sorter: React.FC<TimeG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-meres-ido-sorter',
  topicTitle = '4. Az idő mérése – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="ido-meres"
      title={topicTitle}
      subtitle="Válogasd szét az időtartamokat, a hónapokat és a heteket!"
      levels={TIME_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default TimeG2Sorter;
