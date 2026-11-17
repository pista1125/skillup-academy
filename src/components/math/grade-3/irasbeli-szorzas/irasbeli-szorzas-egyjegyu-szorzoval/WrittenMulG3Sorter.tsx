import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StripSmall } from './WrittenMulG3CardFigures';

interface WrittenMulG3SorterProps {
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
    title: '1. szint: Hol kell váltani?',
    description: 'Szorozd meg fejben a jegyeket! Hol lesz 10 vagy több?',
    categories: [
      { id: 'nincs', name: 'Nincs váltás', color: 'emerald' },
      { id: 'egyes', name: 'Csak az egyeseknél', color: 'amber' },
      { id: 'tizes', name: 'Csak a tízeseknél', color: 'sky' }
    ],
    items: [
      { id: 'wms1', text: '312 · 3', categoryId: 'nincs', figure: <StripSmall a={312} m={3} /> },
      { id: 'wms2', text: '221 · 4', categoryId: 'nincs' },
      { id: 'wms3', text: '401 · 2', categoryId: 'nincs', figure: <StripSmall a={401} m={2} /> },
      { id: 'wms4', text: '125 · 3', categoryId: 'egyes', figure: <StripSmall a={125} m={3} /> },
      { id: 'wms5', text: '216 · 4', categoryId: 'egyes' },
      { id: 'wms6', text: '307 · 3', categoryId: 'egyes', figure: <StripSmall a={307} m={3} /> },
      { id: 'wms7', text: '152 · 3', categoryId: 'tizes', figure: <StripSmall a={152} m={3} /> },
      { id: 'wms8', text: '241 · 4', categoryId: 'tizes' },
      { id: 'wms9', text: '181 · 5', categoryId: 'tizes', figure: <StripSmall a={181} m={5} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi maradt?',
    description: 'Szorozd meg az egyeseket! Mennyi marad a tízeseknek?',
    categories: [
      { id: 'm1', name: 'Maradt 1', color: 'emerald' },
      { id: 'm2', name: 'Maradt 2', color: 'orange' },
      { id: 'm3', name: 'Maradt 3', color: 'purple' }
    ],
    items: [
      { id: 'wms10', text: '134 · 3', categoryId: 'm1', figure: <StripSmall a={134} m={3} /> },
      { id: 'wms11', text: '117 · 2', categoryId: 'm1' },
      { id: 'wms12', text: '123 · 4', categoryId: 'm1', figure: <StripSmall a={123} m={4} /> },
      { id: 'wms13', text: '128 · 3', categoryId: 'm2', figure: <StripSmall a={128} m={3} /> },
      { id: 'wms14', text: '105 · 4', categoryId: 'm2' },
      { id: 'wms15', text: '136 · 4', categoryId: 'm2', figure: <StripSmall a={136} m={4} /> },
      { id: 'wms16', text: '109 · 4', categoryId: 'm3', figure: <StripSmall a={109} m={4} /> },
      { id: 'wms17', text: '136 · 5', categoryId: 'm3' },
      { id: 'wms18', text: '118 · 4', categoryId: 'm3', figure: <StripSmall a={118} m={4} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik kerek százashoz van közel?',
    description: 'Számold ki a szorzatot! Melyik kerek százashoz van a legközelebb?',
    categories: [
      { id: 'k400', name: 'kb. 400', color: 'sky' },
      { id: 'k600', name: 'kb. 600', color: 'amber' },
      { id: 'k800', name: 'kb. 800', color: 'rose' }
    ],
    items: [
      { id: 'wms19', text: '198 · 2', categoryId: 'k400', figure: <StripSmall a={198} m={2} /> },
      { id: 'wms20', text: '102 · 4', categoryId: 'k400' },
      { id: 'wms21', text: '133 · 3', categoryId: 'k400', figure: <StripSmall a={133} m={3} /> },
      { id: 'wms22', text: '149 · 4', categoryId: 'k600', figure: <StripSmall a={149} m={4} /> },
      { id: 'wms23', text: '302 · 2', categoryId: 'k600' },
      { id: 'wms24', text: '121 · 5', categoryId: 'k600', figure: <StripSmall a={121} m={5} /> },
      { id: 'wms25', text: '199 · 4', categoryId: 'k800', figure: <StripSmall a={199} m={4} /> },
      { id: 'wms26', text: '268 · 3', categoryId: 'k800' },
      { id: 'wms27', text: '162 · 5', categoryId: 'k800' }
    ]
  }
];

export const WRITTEN_MUL_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const WrittenMulG3Sorter: React.FC<WrittenMulG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-irasbeli-sorter',
  topicTitle = '3. Írásbeli szorzás egyjegyű szorzóval – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="irasbeli-szorzas-egyjegyu-szorzoval"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat!"
      levels={WRITTEN_MUL_G3_SORTER_LEVELS}
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

export default WrittenMulG3Sorter;
