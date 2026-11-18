import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TenPlusCard80, JumpCard, PyramidCard, DiceCard80 } from './Add20G2CardFigures';

interface Add20G2SorterProps {
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

const ADD20_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az összeg?',
    description: 'Számold ki az összeget a képekről és a műveletekből, majd tedd a jó dobozba!',
    categories: [
      { id: 'sum12', name: 'Összeg: 12', color: 'sky' },
      { id: 'sum15', name: 'Összeg: 15', color: 'emerald' },
      { id: 'sum18', name: 'Összeg: 18', color: 'amber' }
    ],
    items: [
      { id: 'a20s1', text: '', categoryId: 'sum12', figure: <TenPlusCard80 ones={2} /> },
      { id: 'a20s2', text: '', categoryId: 'sum12', figure: <DiceCard80 values={[6, 6]} /> },
      { id: 'a20s3', text: '8 + 4', categoryId: 'sum12' },
      { id: 'a20s4', text: '', categoryId: 'sum15', figure: <TenPlusCard80 ones={5} /> },
      { id: 'a20s5', text: '', categoryId: 'sum15', figure: <PyramidCard left="9" right="6" small /> },
      { id: 'a20s6', text: '7 + 8', categoryId: 'sum15' },
      { id: 'a20s7', text: '', categoryId: 'sum18', figure: <TenPlusCard80 ones={8} /> },
      { id: 'a20s8', text: '', categoryId: 'sum18', figure: <DiceCard80 values={[6, 6, 6]} /> },
      { id: 'a20s9', text: '13 + 5', categoryId: 'sum18' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik számolási mód?',
    description: 'Válogasd szét: 10 + egyesek, tízesátlépés nélkül, vagy tízesátlépéssel számoljuk?',
    categories: [
      { id: 'tenplus', name: '10 + egyesek', color: 'blue' },
      { id: 'nocross', name: 'Tízesátlépés nélkül', color: 'emerald' },
      { id: 'cross', name: 'Tízesátlépéssel', color: 'rose' }
    ],
    items: [
      { id: 'a20s10', text: '', categoryId: 'tenplus', figure: <TenPlusCard80 ones={4} /> },
      { id: 'a20s11', text: '', categoryId: 'tenplus', figure: <TenPlusCard80 ones={7} /> },
      { id: 'a20s12', text: '10 + 9', categoryId: 'tenplus' },
      { id: 'a20s13', text: '', categoryId: 'nocross', figure: <JumpCard start={12} add={5} small /> },
      { id: 'a20s14', text: '13 + 4', categoryId: 'nocross' },
      { id: 'a20s15', text: '6 + 11', categoryId: 'nocross' },
      { id: 'a20s16', text: '', categoryId: 'cross', figure: <JumpCard start={8} add={5} small /> },
      { id: 'a20s17', text: '', categoryId: 'cross', figure: <DiceCard80 values={[5, 6]} /> },
      { id: 'a20s18', text: '7 + 9', categoryId: 'cross' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Fejtsd meg, hányas szám hiányzik a ? vagy a □ helyéről!',
    categories: [
      { id: 'miss4', name: 'Hiányzó szám: 4', color: 'sky' },
      { id: 'miss6', name: 'Hiányzó szám: 6', color: 'purple' },
      { id: 'miss8', name: 'Hiányzó szám: 8', color: 'amber' }
    ],
    items: [
      { id: 'a20s19', text: '', categoryId: 'miss4', figure: <PyramidCard left="9" right="?" top="13" small /> },
      { id: 'a20s20', text: '', categoryId: 'miss4', figure: <PyramidCard left="?" right="11" top="15" small /> },
      { id: 'a20s21', text: '14 + □ = 18', categoryId: 'miss4' },
      { id: 'a20s22', text: '', categoryId: 'miss6', figure: <PyramidCard left="8" right="?" top="14" small /> },
      { id: 'a20s23', text: '', categoryId: 'miss6', figure: <PyramidCard left="?" right="7" top="13" small /> },
      { id: 'a20s24', text: '11 + 5 = 10 + □', categoryId: 'miss6' },
      { id: 'a20s25', text: '', categoryId: 'miss8', figure: <PyramidCard left="9" right="?" top="17" small /> },
      { id: 'a20s26', text: '□ + 7 = 15', categoryId: 'miss8' },
      { id: 'a20s27', text: '12 + □ = 20', categoryId: 'miss8' }
    ]
  }
];

export const ADD20_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD20_G2_SORTER_LEVELS_LIST[0],
  2: ADD20_G2_SORTER_LEVELS_LIST[1],
  3: ADD20_G2_SORTER_LEVELS_LIST[2]
};

export const Add20G2Sorter: React.FC<Add20G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-osszeadas20-sorter',
  topicTitle = '4. Összeadás 20-as számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="osszeadas-20-as-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét az összeadásokat összeg, számítási mód és hiányzó szám szerint!"
      levels={ADD20_G2_SORTER_LEVELS}
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

export default Add20G2Sorter;
