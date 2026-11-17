import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RomanReadWriteG3SorterProps {
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

const ROMAN_READ_WRITE_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Hány tízes?",
    description: "Melyik tízesbe tartozik a szám?",
    categories: [
      { id: 't20', name: "20-tól 29-ig", color: 'sky' },
      { id: 't30', name: "30-tól 39-ig", color: 'emerald' },
      { id: 't40', name: "40-től 49-ig", color: 'rose' }
    ],
    items: [
      { id: 'g3-rom-iras-olvasas-s1', text: "XXIV", categoryId: 't20' },
      { id: 'g3-rom-iras-olvasas-s2', text: "XXIX", categoryId: 't20' },
      { id: 'g3-rom-iras-olvasas-s3', text: "XXI", categoryId: 't20' },
      { id: 'g3-rom-iras-olvasas-s4', text: "XXXVI", categoryId: 't30' },
      { id: 'g3-rom-iras-olvasas-s5', text: "XXXIX", categoryId: 't30' },
      { id: 'g3-rom-iras-olvasas-s6', text: "XXXII", categoryId: 't30' },
      { id: 'g3-rom-iras-olvasas-s7', text: "XLI", categoryId: 't40' },
      { id: 'g3-rom-iras-olvasas-s8', text: "XLVIII", categoryId: 't40' },
      { id: 'g3-rom-iras-olvasas-s9', text: "XLV", categoryId: 't40' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Nagyobb tízesek",
    description: "Melyik tízesbe tartozik a szám?",
    categories: [
      { id: 't50', name: "50-től 59-ig", color: 'amber' },
      { id: 't70', name: "70-től 79-ig", color: 'purple' },
      { id: 't90', name: "90-től 99-ig", color: 'teal' }
    ],
    items: [
      { id: 'g3-rom-iras-olvasas-s10', text: "LVII", categoryId: 't50' },
      { id: 'g3-rom-iras-olvasas-s11', text: "LIV", categoryId: 't50' },
      { id: 'g3-rom-iras-olvasas-s12', text: "LIX", categoryId: 't50' },
      { id: 'g3-rom-iras-olvasas-s13', text: "LXXI", categoryId: 't70' },
      { id: 'g3-rom-iras-olvasas-s14', text: "LXXVIII", categoryId: 't70' },
      { id: 'g3-rom-iras-olvasas-s15', text: "LXXIII", categoryId: 't70' },
      { id: 'g3-rom-iras-olvasas-s16', text: "XCII", categoryId: 't90' },
      { id: 'g3-rom-iras-olvasas-s17', text: "XCVI", categoryId: 't90' },
      { id: 'g3-rom-iras-olvasas-s18', text: "XCIX", categoryId: 't90' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Ne a hosszát nézd!",
    description: "Olvasd el a számot, és tedd a helyére!",
    categories: [
      { id: 'lt50', name: "50-nél kisebb", color: 'sky' },
      { id: 'mid', name: "50-től 79-ig", color: 'emerald' },
      { id: 'big', name: "80-tól 100-ig", color: 'rose' }
    ],
    items: [
      { id: 'g3-rom-iras-olvasas-s19', text: "XXXVIII", categoryId: 'lt50' },
      { id: 'g3-rom-iras-olvasas-s20', text: "XLIX", categoryId: 'lt50' },
      { id: 'g3-rom-iras-olvasas-s21', text: "XXXIII", categoryId: 'lt50' },
      { id: 'g3-rom-iras-olvasas-s22', text: "LI", categoryId: 'mid' },
      { id: 'g3-rom-iras-olvasas-s23', text: "LXXIV", categoryId: 'mid' },
      { id: 'g3-rom-iras-olvasas-s24', text: "LXVIII", categoryId: 'mid' },
      { id: 'g3-rom-iras-olvasas-s25', text: "LXXXVIII", categoryId: 'big' },
      { id: 'g3-rom-iras-olvasas-s26', text: "XC", categoryId: 'big' },
      { id: 'g3-rom-iras-olvasas-s27', text: "C", categoryId: 'big' }
    ]
  }
];

const ROMAN_READ_WRITE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROMAN_READ_WRITE_G3_SORTER_LEVELS_LIST[0],
  2: ROMAN_READ_WRITE_G3_SORTER_LEVELS_LIST[1],
  3: ROMAN_READ_WRITE_G3_SORTER_LEVELS_LIST[2]
};

export const RomanReadWriteG3Sorter: React.FC<RomanReadWriteG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-rom-iras-olvasas-sorter',
  topicTitle = "2. Római számok írása és olvasása 100-ig – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="iras-olvasas-100-ig"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat az értékük szerint!"
      levels={ROMAN_READ_WRITE_G3_SORTER_LEVELS}
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

export default RomanReadWriteG3Sorter;
