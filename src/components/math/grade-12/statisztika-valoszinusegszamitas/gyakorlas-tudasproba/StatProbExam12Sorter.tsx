import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbExam12SorterProps {
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

const STAT_PROB_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Középérték, szóródás vagy valószínűség?',
    description: 'Csoportosítsd a fejezet fogalmait!',
    categories: [
      { id: 'kozep', name: 'középérték', color: 'blue' },
      { id: 'szor', name: 'szóródási mutató', color: 'amber' },
      { id: 'val', name: 'valószínűségszámítási fogalom', color: 'emerald' }
    ],
    items: [
      { id: 'spes1', text: 'átlag', categoryId: 'kozep' },
      { id: 'spes2', text: 'medián (Q2)', categoryId: 'kozep' },
      { id: 'spes3', text: 'módusz', categoryId: 'kozep' },
      { id: 'spes4', text: 'terjedelem', categoryId: 'szor' },
      { id: 'spes5', text: 'szórás', categoryId: 'szor' },
      { id: 'spes6', text: 'félterjedelem (Q3 − Q1)', categoryId: 'szor' },
      { id: 'spes7', text: 'eseménytér', categoryId: 'val' },
      { id: 'spes8', text: 'komplementer esemény', categoryId: 'val' },
      { id: 'spes9', text: 'egymást kizáró események', categoryId: 'val' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Két kockával dobunk',
    description: 'Mekkora az esemény valószínűsége?',
    categories: [
      { id: 'p12', name: 'P = 1/12', color: 'purple' },
      { id: 'p9', name: 'P = 1/9', color: 'blue' },
      { id: 'p6', name: 'P = 1/6', color: 'rose' }
    ],
    items: [
      { id: 'spes10', text: 'a dobott számok szorzata 4', categoryId: 'p12' },
      { id: 'spes11', text: 'a dobott számok összege 4', categoryId: 'p12' },
      { id: 'spes12', text: 'a dobott számok összege 10', categoryId: 'p12' },
      { id: 'spes13', text: 'a dobott számok összege 5', categoryId: 'p9' },
      { id: 'spes14', text: 'a dobott számok összege 9', categoryId: 'p9' },
      { id: 'spes15', text: 'a dobott számok szorzata 6', categoryId: 'p9' },
      { id: 'spes16', text: 'a dobott számok összege 7', categoryId: 'p6' },
      { id: 'spes17', text: 'a két dobás egyenlő', categoryId: 'p6' },
      { id: 'spes18', text: 'az első kockával hármast dobunk', categoryId: 'p6' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik modellel számolunk?',
    description: 'Válaszd ki a feladathoz illő valószínűségi modellt!',
    categories: [
      { id: 'geo', name: 'geometriai valószínűség', color: 'teal' },
      { id: 'hyp', name: 'visszatevés nélküli mintavétel', color: 'blue' },
      { id: 'bin', name: 'visszatevéses mintavétel (binomiális)', color: 'amber' }
    ],
    items: [
      { id: 'spes19', text: 'a lövés a céltábla belső körlapját találja el', categoryId: 'geo' },
      { id: 'spes20', text: 'a hangya a méterrúd 20 cm-es pontjához van közelebb', categoryId: 'geo' },
      { id: 'spes21', text: 'a papírlap pontja minden csúcstól 10 cm-nél távolabb van', categoryId: 'geo' },
      { id: 'spes22', text: 'hatoslottó: pontosan 2 kihúzott szám osztható 6-tal', categoryId: 'hyp' },
      { id: 'spes23', text: '6 vizsgázó húz tételt, pontosan 2 XX. századi', categoryId: 'hyp' },
      { id: 'spes24', text: '6 tanulót választunk, pontosan 3 kollégista', categoryId: 'hyp' },
      { id: 'spes25', text: '12 adat visszatevéssel, pontosan 3 kisebb Q1-nél', categoryId: 'bin' },
      { id: 'spes26', text: '5 alkalomból legfeljebb egyszer csíp meg a pók', categoryId: 'bin' },
      { id: 'spes27', text: '1200 ügyfélből pontosan 3-nak lesz káreseménye', categoryId: 'bin' }
    ]
  }
};

export const StatProbExam12Sorter: React.FC<StatProbExam12SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-tudasproba-sorter',
  topicTitle = '11. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezet fogalmait, valószínűségeit és modelljeit!"
      levels={STAT_PROB_EXAM_SORTER_LEVELS}
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

export default StatProbExam12Sorter;
