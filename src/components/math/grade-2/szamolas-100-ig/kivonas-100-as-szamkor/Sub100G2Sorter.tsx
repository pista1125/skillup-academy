import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsSubCard80, JumpCard } from './Sub100G2CardFigures';

interface Sub100G2SorterProps {
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

const SUB100_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a különbség?',
    description: 'Számold ki, mennyi marad, és tedd a jó dobozba!',
    categories: [
      { id: 'd53', name: 'Különbség: 53', color: 'sky' },
      { id: 'd64', name: 'Különbség: 64', color: 'emerald' },
      { id: 'd72', name: 'Különbség: 72', color: 'amber' }
    ],
    items: [
      { id: 's100s1', text: '', categoryId: 'd53', figure: <RodsSubCard80 a={58} b={5} /> },
      { id: 's100s2', text: '57 − 4', categoryId: 'd53' },
      { id: 's100s3', text: '', categoryId: 'd53', figure: <JumpCard start={59} add={6} minus small /> },
      { id: 's100s4', text: '', categoryId: 'd64', figure: <RodsSubCard80 a={69} b={5} /> },
      { id: 's100s5', text: '66 − 2', categoryId: 'd64' },
      { id: 's100s6', text: '', categoryId: 'd64', figure: <JumpCard start={68} add={4} minus small /> },
      { id: 's100s7', text: '', categoryId: 'd72', figure: <RodsSubCard80 a={79} b={7} /> },
      { id: 's100s8', text: '75 − 3', categoryId: 'd72' },
      { id: 's100s9', text: '', categoryId: 'd72', figure: <JumpCard start={77} add={5} minus small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kell bontani?',
    description: 'Elég az egyes? Ha kevés, bontani kell (tízesátlépés). Ha pont annyi, kerek tízes marad.',
    categories: [
      { id: 'no', name: 'Nincs tízesátlépés', color: 'blue' },
      { id: 'yes', name: 'Van tízesátlépés', color: 'rose' },
      { id: 'round', name: 'Kerek tízes marad', color: 'amber' }
    ],
    items: [
      { id: 's100s10', text: '', categoryId: 'no', figure: <JumpCard start={78} add={3} minus small /> },
      { id: 's100s11', text: '', categoryId: 'no', figure: <RodsSubCard80 a={65} b={2} /> },
      { id: 's100s12', text: '97 − 5', categoryId: 'no' },
      { id: 's100s13', text: '', categoryId: 'yes', figure: <JumpCard start={54} add={7} minus small /> },
      { id: 's100s14', text: '', categoryId: 'yes', figure: <RodsSubCard80 a={61} b={4} /> },
      { id: 's100s15', text: '83 − 9', categoryId: 'yes' },
      { id: 's100s16', text: '86 − 6', categoryId: 'round' },
      { id: 's100s17', text: '', categoryId: 'round', figure: <RodsSubCard80 a={73} b={3} /> },
      { id: 's100s18', text: '92 − 2', categoryId: 'round' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű − kétjegyű',
    description: 'Előbb a tízeseket vedd el, aztán az egyeseket! Ellenőrizz összeadással!',
    categories: [
      { id: 'd25', name: 'Különbség: 25', color: 'purple' },
      { id: 'd38', name: 'Különbség: 38', color: 'sky' },
      { id: 'd47', name: 'Különbség: 47', color: 'emerald' }
    ],
    items: [
      { id: 's100s19', text: '', categoryId: 'd25', figure: <RodsSubCard80 a={61} b={36} /> },
      { id: 's100s20', text: '52 − 27', categoryId: 'd25' },
      { id: 's100s21', text: '73 − 48', categoryId: 'd25' },
      { id: 's100s22', text: '', categoryId: 'd38', figure: <RodsSubCard80 a={75} b={37} /> },
      { id: 's100s23', text: '64 − 26', categoryId: 'd38' },
      { id: 's100s24', text: '', categoryId: 'd38', figure: <RodsSubCard80 a={91} b={53} /> },
      { id: 's100s25', text: '', categoryId: 'd47', figure: <RodsSubCard80 a={83} b={36} /> },
      { id: 's100s26', text: '72 − 25', categoryId: 'd47' },
      { id: 's100s27', text: '', categoryId: 'd47', figure: <RodsSubCard80 a={95} b={48} /> }
    ]
  }
];

export const SUB100_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SUB100_G2_SORTER_LEVELS_LIST[0],
  2: SUB100_G2_SORTER_LEVELS_LIST[1],
  3: SUB100_G2_SORTER_LEVELS_LIST[2]
};

export const Sub100G2Sorter: React.FC<Sub100G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-kivonas-sorter',
  topicTitle = '3. Kivonás 100-as számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="kivonas-100-as-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét a kivonásokat különbség és tízesátlépés szerint!"
      levels={SUB100_G2_SORTER_LEVELS}
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

export default Sub100G2Sorter;
