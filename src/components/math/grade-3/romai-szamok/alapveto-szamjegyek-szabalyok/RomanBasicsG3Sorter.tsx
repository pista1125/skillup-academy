import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SignChipsCard, SignBarsCard } from './RomanBasicsG3CardFigures';

interface RomanBasicsG3SorterProps {
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

const ROMAN_BASICS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Mekkora a szám?",
    description: "Válogasd szét a római számokat az értékük szerint!",
    categories: [
      { id: 'k10', name: "10-nél kisebb", color: 'sky' },
      { id: 'k20', name: "10-től 19-ig", color: 'emerald' },
      { id: 'k30', name: "20-tól 39-ig", color: 'rose' }
    ],
    items: [
      { id: 'g3-rom-alapok-s1', text: "VII", categoryId: 'k10', figure: <SignChipsCard s="VII" /> },
      { id: 'g3-rom-alapok-s2', text: "IV", categoryId: 'k10', figure: <SignChipsCard s="IV" /> },
      { id: 'g3-rom-alapok-s3', text: "IX", categoryId: 'k10' },
      { id: 'g3-rom-alapok-s4', text: "XII", categoryId: 'k20', figure: <SignChipsCard s="XII" /> },
      { id: 'g3-rom-alapok-s5', text: "XVIII", categoryId: 'k20' },
      { id: 'g3-rom-alapok-s6', text: "X", categoryId: 'k20' },
      { id: 'g3-rom-alapok-s7', text: "XXV", categoryId: 'k30', figure: <SignChipsCard s="XXV" /> },
      { id: 'g3-rom-alapok-s8', text: "XXXIII", categoryId: 'k30' },
      { id: 'g3-rom-alapok-s9', text: "XXIX", categoryId: 'k30' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hozzáadunk, elveszünk vagy hibás?",
    description: "Nézd meg a jeleket! Hova tartozik a szám?",
    categories: [
      { id: 'add', name: "Csak hozzáadunk", color: 'emerald' },
      { id: 'sub', name: "Van benne elvevés", color: 'amber' },
      { id: 'bad', name: "Hibás írás", color: 'rose' }
    ],
    items: [
      { id: 'g3-rom-alapok-s10', text: "XVII", categoryId: 'add', figure: <SignBarsCard s="XVII" /> },
      { id: 'g3-rom-alapok-s11', text: "LX", categoryId: 'add' },
      { id: 'g3-rom-alapok-s12', text: "XXII", categoryId: 'add' },
      { id: 'g3-rom-alapok-s13', text: "XIV", categoryId: 'sub', figure: <SignBarsCard s="XIV" /> },
      { id: 'g3-rom-alapok-s14', text: "XL", categoryId: 'sub', figure: <SignBarsCard s="XL" /> },
      { id: 'g3-rom-alapok-s15', text: "XIX", categoryId: 'sub' },
      { id: 'g3-rom-alapok-s16', text: "IIII", categoryId: 'bad', figure: <SignBarsCard s="IIII" /> },
      { id: 'g3-rom-alapok-s17', text: "VV", categoryId: 'bad' },
      { id: 'g3-rom-alapok-s18', text: "VX", categoryId: 'bad', figure: <SignBarsCard s="VX" /> }
    ]
  },
  {
    level: 3,
    title: "3. szint: Az L és a C is",
    description: "Válogasd szét a számokat az értékük szerint!",
    categories: [
      { id: 's10', name: "10-nél kisebb", color: 'sky' },
      { id: 's50', name: "10-től 49-ig", color: 'purple' },
      { id: 's100', name: "50-től 100-ig", color: 'teal' }
    ],
    items: [
      { id: 'g3-rom-alapok-s19', text: "IV", categoryId: 's10' },
      { id: 'g3-rom-alapok-s20', text: "VIII", categoryId: 's10' },
      { id: 'g3-rom-alapok-s21', text: "IX", categoryId: 's10', figure: <SignChipsCard s="IX" /> },
      { id: 'g3-rom-alapok-s22', text: "XL", categoryId: 's50', figure: <SignChipsCard s="XL" /> },
      { id: 'g3-rom-alapok-s23', text: "XXIX", categoryId: 's50' },
      { id: 'g3-rom-alapok-s24', text: "XIV", categoryId: 's50' },
      { id: 'g3-rom-alapok-s25', text: "L", categoryId: 's100' },
      { id: 'g3-rom-alapok-s26', text: "XC", categoryId: 's100', figure: <SignChipsCard s="XC" /> },
      { id: 'g3-rom-alapok-s27', text: "LV", categoryId: 's100', figure: <SignChipsCard s="LV" /> }
    ]
  }
];

export const ROMAN_BASICS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROMAN_BASICS_G3_SORTER_LEVELS_LIST[0],
  2: ROMAN_BASICS_G3_SORTER_LEVELS_LIST[1],
  3: ROMAN_BASICS_G3_SORTER_LEVELS_LIST[2]
};

export const RomanBasicsG3Sorter: React.FC<RomanBasicsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-rom-alapok-sorter',
  topicTitle = "1. A római számjegyek és alapszabályok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="alapveto-szamjegyek-szabalyok"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat!"
      levels={ROMAN_BASICS_G3_SORTER_LEVELS}
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

export default RomanBasicsG3Sorter;
