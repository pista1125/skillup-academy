import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ObjectCard } from './MeasExamG2CardFigures';
import { JugsCard } from '../urtartalom-meres/CapacityG2CardFigures';
import { DmBarCard } from '../hosszusag-meres/LengthG2CardFigures';

interface MeasExamG2SorterProps {
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

const MEAS_EXAM_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mérünk vele?',
    description: 'Hosszúság, tömeg vagy űrtartalom? Nézd meg az eszközt vagy a mértékegységet!',
    categories: [
      { id: 'len', name: 'Hosszúság', color: 'sky' },
      { id: 'mass', name: 'Tömeg', color: 'emerald' },
      { id: 'cap', name: 'Űrtartalom', color: 'purple' }
    ],
    items: [
      { id: 'mexs1', text: '', categoryId: 'len', figure: <ObjectCard small kind="ruler" /> },
      { id: 'mexs2', text: '', categoryId: 'len', figure: <ObjectCard small kind="tape" /> },
      { id: 'mexs3', text: '15 cm', categoryId: 'len' },
      { id: 'mexs4', text: '', categoryId: 'mass', figure: <ObjectCard small kind="scale" /> },
      { id: 'mexs5', text: 'kg', categoryId: 'mass' },
      { id: 'mexs6', text: '3 kg', categoryId: 'mass' },
      { id: 'mexs7', text: '', categoryId: 'cap', figure: <ObjectCard small kind="jug" /> },
      { id: 'mexs8', text: 'dl', categoryId: 'cap' },
      { id: 'mexs9', text: '2 l', categoryId: 'cap' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb vagy több, mint 1 liter?',
    description: '1 l = 10 dl. Egy teli mérőedény 1 liter.',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 1 l', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 l', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 1 l', color: 'amber' }
    ],
    items: [
      { id: 'mexs10', text: '', categoryId: 'lt', figure: <JugsCard small full={0} part={6} /> },
      { id: 'mexs11', text: '9 dl', categoryId: 'lt' },
      { id: 'mexs12', text: 'fél liter', categoryId: 'lt' },
      { id: 'mexs13', text: '10 dl', categoryId: 'eq' },
      { id: 'mexs14', text: '', categoryId: 'eq', figure: <JugsCard small full={1} part={0} /> },
      { id: 'mexs15', text: 'fél liter + fél liter', categoryId: 'eq' },
      { id: 'mexs16', text: '12 dl', categoryId: 'gt' },
      { id: 'mexs17', text: '', categoryId: 'gt', figure: <JugsCard small full={2} part={0} /> },
      { id: 'mexs18', text: '', categoryId: 'gt', figure: <JugsCard small full={1} part={5} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Rövidebb vagy hosszabb, mint 1 méter?',
    description: '1 m = 10 dm = 100 cm. Számold meg a deciméteres részeket!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 1 m', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 m', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 1 m', color: 'purple' }
    ],
    items: [
      { id: 'mexs19', text: '', categoryId: 'lt', figure: <DmBarCard n={7} /> },
      { id: 'mexs20', text: '95 cm', categoryId: 'lt' },
      { id: 'mexs21', text: '', categoryId: 'lt', figure: <DmBarCard n={9} /> },
      { id: 'mexs22', text: '', categoryId: 'eq', figure: <DmBarCard n={10} /> },
      { id: 'mexs23', text: '100 cm', categoryId: 'eq' },
      { id: 'mexs24', text: '60 cm + 40 cm', categoryId: 'eq' },
      { id: 'mexs25', text: '', categoryId: 'gt', figure: <DmBarCard n={12} /> },
      { id: 'mexs26', text: '1 m 2 dm', categoryId: 'gt' },
      { id: 'mexs27', text: '11 dm', categoryId: 'gt' }
    ]
  }
];

export const MEAS_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MEAS_EXAM_G2_SORTER_LEVELS_LIST[0],
  2: MEAS_EXAM_G2_SORTER_LEVELS_LIST[1],
  3: MEAS_EXAM_G2_SORTER_LEVELS_LIST[2]
};

export const MeasExamG2Sorter: React.FC<MeasExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-meres-tudasproba-sorter',
  topicTitle = '5. Gyakorlás, tudáspróba – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Válogasd szét a mérőeszközöket és a mennyiségeket!"
      levels={MEAS_EXAM_G2_SORTER_LEVELS}
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

export default MeasExamG2Sorter;
