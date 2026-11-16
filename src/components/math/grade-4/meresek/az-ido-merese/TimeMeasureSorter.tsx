import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TimeMeasureSorterProps {
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

const TIME_MEASURE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik napszakban?',
    description: 'Mikor szoktuk ezt csinálni? Tedd a megfelelő napszakhoz!',
    categories: [
      { id: 'reggel', name: 'reggel', color: 'amber' },
      { id: 'delutan', name: 'délután', color: 'rose' },
      { id: 'este', name: 'este', color: 'purple' }
    ],
    items: [
      { id: 'tms1', text: 'ébredés', categoryId: 'reggel' },
      { id: 'tms2', text: 'reggeli', categoryId: 'reggel' },
      { id: 'tms3', text: 'öltözés az iskolába', categoryId: 'reggel' },
      { id: 'tms4', text: 'uzsonna', categoryId: 'delutan' },
      { id: 'tms5', text: 'fociedzés iskola után', categoryId: 'delutan' },
      { id: 'tms6', text: 'hegedűóra iskola után', categoryId: 'delutan' },
      { id: 'tms7', text: 'vacsora', categoryId: 'este' },
      { id: 'tms8', text: 'esti mese', categoryId: 'este' },
      { id: 'tms9', text: 'lefekvés előtti tusolás', categoryId: 'este' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Időpont, időtartam vagy dátum?',
    description: 'Mikor? Mennyi ideig? Melyik napon? Csoportosítsd a sportnap mondatait!',
    categories: [
      { id: 'pont', name: 'időpont (hány órakor?)', color: 'rose' },
      { id: 'tartam', name: 'időtartam (mennyi ideig?)', color: 'emerald' },
      { id: 'datum', name: 'dátum (melyik napon?)', color: 'sky' }
    ],
    items: [
      { id: 'tms10', text: 'Az első versenyszámot 8 óra 15 perckor indították.', categoryId: 'pont' },
      { id: 'tms11', text: 'Az utolsó versenyző 14 óra 28 perckor ért célba.', categoryId: 'pont' },
      { id: 'tms12', text: 'A frissítőt 14 óra 30 perckor kínálták.', categoryId: 'pont' },
      { id: 'tms13', text: 'A sportnap 8 órán át tartott.', categoryId: 'tartam' },
      { id: 'tms14', text: 'Az eredményhirdetés 25 perc alatt zajlott le.', categoryId: 'tartam' },
      { id: 'tms15', text: 'A lágytojás 3 percig fő.', categoryId: 'tartam' },
      { id: 'tms16', text: 'A sportnapot április 25-én rendezték.', categoryId: 'datum' },
      { id: 'tms17', text: 'A felkészülés január 11-én kezdődött.', categoryId: 'datum' },
      { id: 'tms18', text: 'Az állatkerti nap augusztus 9-én lesz.', categoryId: 'datum' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Rövid vagy hosszú?',
    description: 'Váltsd át, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'lt', name: '1 percnél rövidebb', color: 'emerald' },
      { id: 'mid', name: '1 perc és 1 óra között', color: 'blue' },
      { id: 'gt', name: '1 óránál hosszabb', color: 'rose' }
    ],
    items: [
      { id: 'tms19', text: '45 másodperc', categoryId: 'lt' },
      { id: 'tms20', text: 'negyed perc', categoryId: 'lt' },
      { id: 'tms21', text: '59 másodperc', categoryId: 'lt' },
      { id: 'tms22', text: '120 másodperc', categoryId: 'mid' },
      { id: 'tms23', text: 'negyedóra', categoryId: 'mid' },
      { id: 'tms24', text: '1800 másodperc', categoryId: 'mid' },
      { id: 'tms25', text: '90 perc', categoryId: 'gt' },
      { id: 'tms26', text: '9000 másodperc', categoryId: 'gt' },
      { id: 'tms27', text: '2 nap', categoryId: 'gt' }
    ]
  }
];

const TIME_MEASURE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TIME_MEASURE_SORTER_LEVELS_LIST[0],
  2: TIME_MEASURE_SORTER_LEVELS_LIST[1],
  3: TIME_MEASURE_SORTER_LEVELS_LIST[2]
};

export const TimeMeasureSorter: React.FC<TimeMeasureSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-ido-sorter',
  topicTitle = '6. Az idő mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-ido-merese"
      title={topicTitle}
      subtitle="Csoportosítsd a tevékenységeket napszak szerint, a mondatokat és az időtartamokat!"
      levels={TIME_MEASURE_SORTER_LEVELS}
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

export default TimeMeasureSorter;
