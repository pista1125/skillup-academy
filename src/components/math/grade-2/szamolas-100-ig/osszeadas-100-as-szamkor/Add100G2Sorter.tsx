import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsAddCard80, JumpCard } from './Add100G2CardFigures';

interface Add100G2SorterProps {
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

const ADD100_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az összeg?',
    description: 'Számold ki az összeget, és tedd a jó dobozba!',
    categories: [
      { id: 's68', name: 'Összeg: 68', color: 'sky' },
      { id: 's75', name: 'Összeg: 75', color: 'emerald' },
      { id: 's89', name: 'Összeg: 89', color: 'amber' }
    ],
    items: [
      { id: 'a100s1', text: '', categoryId: 's68', figure: <RodsAddCard80 a={63} b={5} /> },
      { id: 'a100s2', text: '60 + 8', categoryId: 's68' },
      { id: 'a100s3', text: '', categoryId: 's68', figure: <JumpCard start={64} add={4} small /> },
      { id: 'a100s4', text: '', categoryId: 's75', figure: <RodsAddCard80 a={71} b={4} /> },
      { id: 'a100s5', text: '72 + 3', categoryId: 's75' },
      { id: 'a100s6', text: '', categoryId: 's75', figure: <JumpCard start={70} add={5} small /> },
      { id: 'a100s7', text: '', categoryId: 's89', figure: <RodsAddCard80 a={85} b={4} /> },
      { id: 'a100s8', text: '9 + 80', categoryId: 's89' },
      { id: 'a100s9', text: '', categoryId: 's89', figure: <JumpCard start={83} add={6} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Van tízesátlépés?',
    description: 'Add össze az egyeseket! Kevesebb, mint 10? Több, mint 10? Vagy pont 10?',
    categories: [
      { id: 'no', name: 'Nincs tízesátlépés', color: 'blue' },
      { id: 'yes', name: 'Van tízesátlépés', color: 'rose' },
      { id: 'round', name: 'Kerek tízes lesz', color: 'amber' }
    ],
    items: [
      { id: 'a100s10', text: '', categoryId: 'no', figure: <JumpCard start={72} add={6} small /> },
      { id: 'a100s11', text: '', categoryId: 'no', figure: <RodsAddCard80 a={54} b={3} /> },
      { id: 'a100s12', text: '43 + 25', categoryId: 'no' },
      { id: 'a100s13', text: '', categoryId: 'yes', figure: <JumpCard start={68} add={7} small /> },
      { id: 'a100s14', text: '', categoryId: 'yes', figure: <RodsAddCard80 a={57} b={6} /> },
      { id: 'a100s15', text: '39 + 45', categoryId: 'yes' },
      { id: 'a100s16', text: '86 + 4', categoryId: 'round' },
      { id: 'a100s17', text: '', categoryId: 'round', figure: <RodsAddCard80 a={63} b={7} /> },
      { id: 'a100s18', text: '45 + 25', categoryId: 'round' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű + kétjegyű',
    description: 'Előbb a tízeseket add össze, aztán az egyeseket! Vigyázz a cserére!',
    categories: [
      { id: 's64', name: 'Összeg: 64', color: 'purple' },
      { id: 's81', name: 'Összeg: 81', color: 'sky' },
      { id: 's93', name: 'Összeg: 93', color: 'emerald' }
    ],
    items: [
      { id: 'a100s19', text: '', categoryId: 's64', figure: <RodsAddCard80 a={37} b={27} /> },
      { id: 'a100s20', text: '45 + 19', categoryId: 's64' },
      { id: 'a100s21', text: '28 + 36', categoryId: 's64' },
      { id: 'a100s22', text: '', categoryId: 's81', figure: <RodsAddCard80 a={56} b={25} /> },
      { id: 'a100s23', text: '47 + 34', categoryId: 's81' },
      { id: 'a100s24', text: '', categoryId: 's81', figure: <RodsAddCard80 a={29} b={52} /> },
      { id: 'a100s25', text: '', categoryId: 's93', figure: <RodsAddCard80 a={48} b={45} /> },
      { id: 'a100s26', text: '66 + 27', categoryId: 's93' },
      { id: 'a100s27', text: '', categoryId: 's93', figure: <RodsAddCard80 a={75} b={18} /> }
    ]
  }
];

export const ADD100_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD100_G2_SORTER_LEVELS_LIST[0],
  2: ADD100_G2_SORTER_LEVELS_LIST[1],
  3: ADD100_G2_SORTER_LEVELS_LIST[2]
};

export const Add100G2Sorter: React.FC<Add100G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-osszeadas-sorter',
  topicTitle = '2. Összeadás 100-as számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-100-as-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét az összeadásokat összeg és tízesátlépés szerint!"
      levels={ADD100_G2_SORTER_LEVELS}
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

export default Add100G2Sorter;
