import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AddSub10000SorterProps {
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

const ADD_SUB_10000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Mekkora az eredmény?",
    description: "Számold ki fejben, és tedd a megfelelő helyre!",
    categories: [
      { id: 'kicsi', name: "5000-nél kisebb", color: 'sky' },
      { id: 'kozep', name: "5000 és 8000 között", color: 'amber' },
      { id: 'nagy', name: "8000-nél nagyobb", color: 'purple' }
    ],
    items: [
      { id: 'as10s1', text: "2300 + 1200", categoryId: 'kicsi' },
      { id: 'as10s2', text: "9000 − 6500", categoryId: 'kicsi' },
      { id: 'as10s3', text: "8200 − 5300", categoryId: 'kicsi' },
      { id: 'as10s4', text: "3400 + 2300", categoryId: 'kozep' },
      { id: 'as10s5', text: "9800 − 2500", categoryId: 'kozep' },
      { id: 'as10s6', text: "2600 + 4500", categoryId: 'kozep' },
      { id: 'as10s7', text: "3400 + 5700", categoryId: 'nagy' },
      { id: 'as10s8', text: "5900 + 3300", categoryId: 'nagy' },
      { id: 'as10s9', text: "10 000 − 1500", categoryId: 'nagy' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Van-e ezresátlépés?",
    description: "Nézd meg a százasokat! Kell-e átlépni az ezreseken?",
    categories: [
      { id: 'osszat', name: "Összeadás átlépéssel", color: 'rose' },
      { id: 'osszno', name: "Összeadás átlépés nélkül", color: 'emerald' },
      { id: 'kivat', name: "Kivonás átlépéssel", color: 'blue' }
    ],
    items: [
      { id: 'as10s10', text: "3400 + 5700", categoryId: 'osszat' },
      { id: 'as10s11', text: "2600 + 4500", categoryId: 'osszat' },
      { id: 'as10s12', text: "6600 + 2800", categoryId: 'osszat' },
      { id: 'as10s13', text: "4200 + 2300", categoryId: 'osszno' },
      { id: 'as10s14', text: "1500 + 5300", categoryId: 'osszno' },
      { id: 'as10s15', text: "3300 + 3300", categoryId: 'osszno' },
      { id: 'as10s16', text: "8200 − 5300", categoryId: 'kivat' },
      { id: 'as10s17', text: "9100 − 6700", categoryId: 'kivat' },
      { id: 'as10s18', text: "7400 − 4800", categoryId: 'kivat' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik eredményt kapod?",
    description: "Számold ki, és válogasd szét az eredmény szerint!",
    categories: [
      { id: 'e10', name: "= 10 000", color: 'purple' },
      { id: 'e9', name: "= 9000", color: 'teal' },
      { id: 'e8', name: "= 8000", color: 'orange' }
    ],
    items: [
      { id: 'as10s19', text: "3800 + 6200", categoryId: 'e10' },
      { id: 'as10s20', text: "4700 + 5300", categoryId: 'e10' },
      { id: 'as10s21', text: "2500 + 7500", categoryId: 'e10' },
      { id: 'as10s22', text: "3400 + 5600", categoryId: 'e9' },
      { id: 'as10s23', text: "9800 − 800", categoryId: 'e9' },
      { id: 'as10s24', text: "4500 + 4500", categoryId: 'e9' },
      { id: 'as10s25', text: "10 000 − 2000", categoryId: 'e8' },
      { id: 'as10s26', text: "6300 + 1700", categoryId: 'e8' },
      { id: 'as10s27', text: "9500 − 1500", categoryId: 'e8' }
    ]
  }
];

const ADD_SUB_10000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD_SUB_10000_SORTER_LEVELS_LIST[0],
  2: ADD_SUB_10000_SORTER_LEVELS_LIST[1],
  3: ADD_SUB_10000_SORTER_LEVELS_LIST[2]
};

export const AddSub10000Sorter: React.FC<AddSub10000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-osszeadas-10000-sorter',
  topicTitle = "11. Összeadás és kivonás 10 000-ig – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-10000-ig"
      title={topicTitle}
      subtitle="Válogasd szét a műveleteket az eredményük és az átlépés szerint!"
      levels={ADD_SUB_10000_SORTER_LEVELS}
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

export default AddSub10000Sorter;
