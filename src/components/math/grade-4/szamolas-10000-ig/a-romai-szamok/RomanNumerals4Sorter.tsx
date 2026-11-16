import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RomanNumerals4SorterProps {
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

const ROMAN_NUMERALS4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Mekkora a szám?",
    description: "Váltsd át fejben, és tedd a megfelelő csoportba!",
    categories: [
      { id: "lt10", name: "10-nél kisebb", color: "orange" },
      { id: "10to19", name: "10 és 19 között", color: "amber" },
      { id: "ge20", name: "20 vagy nagyobb", color: "rose" }
    ],
    items: [
      { id: "rns1", text: "I", categoryId: "lt10" },
      { id: "rns2", text: "II", categoryId: "lt10" },
      { id: "rns3", text: "III", categoryId: "lt10" },
      { id: "rns4", text: "IV", categoryId: "lt10" },
      { id: "rns5", text: "V", categoryId: "lt10" },
      { id: "rns6", text: "VI", categoryId: "lt10" },
      { id: "rns7", text: "VII", categoryId: "lt10" },
      { id: "rns8", text: "VIII", categoryId: "lt10" },
      { id: "rns9", text: "IX", categoryId: "lt10" },
      { id: "rns10", text: "X", categoryId: "10to19" },
      { id: "rns11", text: "XI", categoryId: "10to19" },
      { id: "rns12", text: "XII", categoryId: "10to19" },
      { id: "rns13", text: "XIV", categoryId: "10to19" },
      { id: "rns14", text: "XV", categoryId: "10to19" },
      { id: "rns15", text: "XVI", categoryId: "10to19" },
      { id: "rns16", text: "XVII", categoryId: "10to19" },
      { id: "rns17", text: "XVIII", categoryId: "10to19" },
      { id: "rns18", text: "XIX", categoryId: "10to19" },
      { id: "rns19", text: "XX", categoryId: "ge20" },
      { id: "rns20", text: "XXI", categoryId: "ge20" },
      { id: "rns21", text: "XXIV", categoryId: "ge20" },
      { id: "rns22", text: "XXV", categoryId: "ge20" },
      { id: "rns23", text: "XXIX", categoryId: "ge20" },
      { id: "rns24", text: "XXX", categoryId: "ge20" },
      { id: "rns25", text: "XXXIII", categoryId: "ge20" },
      { id: "rns26", text: "XXXVI", categoryId: "ge20" },
      { id: "rns27", text: "XXXIX", categoryId: "ge20" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Helyes vagy hibás?",
    description: "Döntsd el, helyesen írták-e le a római számot! Ha hibás, mi a hiba?",
    categories: [
      { id: "ok", name: "Helyes római szám", color: "emerald" },
      { id: "four", name: "Hibás: 4 egyforma jel egymás mellett", color: "rose" },
      { id: "order", name: "Hibás: a V ismétlődik, vagy rossz a sorrend", color: "amber" }
    ],
    items: [
      { id: "rns28", text: "IV", categoryId: "ok" },
      { id: "rns29", text: "IX", categoryId: "ok" },
      { id: "rns30", text: "XIV", categoryId: "ok" },
      { id: "rns31", text: "XIX", categoryId: "ok" },
      { id: "rns32", text: "XXIV", categoryId: "ok" },
      { id: "rns33", text: "XXIX", categoryId: "ok" },
      { id: "rns34", text: "XXXIV", categoryId: "ok" },
      { id: "rns35", text: "XXXIX", categoryId: "ok" },
      { id: "rns36", text: "VIII", categoryId: "ok" },
      { id: "rns37", text: "IIII", categoryId: "four" },
      { id: "rns38", text: "XXXX", categoryId: "four" },
      { id: "rns39", text: "XIIII", categoryId: "four" },
      { id: "rns40", text: "XXIIII", categoryId: "four" },
      { id: "rns41", text: "VIIII", categoryId: "four" },
      { id: "rns42", text: "XVIIII", categoryId: "four" },
      { id: "rns43", text: "XXXXI", categoryId: "four" },
      { id: "rns44", text: "XXXIIII", categoryId: "four" },
      { id: "rns45", text: "XXXXV", categoryId: "four" },
      { id: "rns46", text: "VV", categoryId: "order" },
      { id: "rns47", text: "VVI", categoryId: "order" },
      { id: "rns48", text: "XVV", categoryId: "order" },
      { id: "rns49", text: "IIV", categoryId: "order" },
      { id: "rns50", text: "VX", categoryId: "order" },
      { id: "rns51", text: "IXX", categoryId: "order" },
      { id: "rns52", text: "IIX", categoryId: "order" },
      { id: "rns53", text: "XIIV", categoryId: "order" },
      { id: "rns54", text: "VVV", categoryId: "order" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Számolj római számokkal!",
    description: "Számold ki, és hasonlítsd össze a XV-tel (15)!",
    categories: [
      { id: "lt", name: "Kisebb, mint XV", color: "blue" },
      { id: "eq", name: "Pontosan XV", color: "emerald" },
      { id: "gt", name: "Nagyobb, mint XV", color: "purple" }
    ],
    items: [
      { id: "rns55", text: "X + IV", categoryId: "lt" },
      { id: "rns56", text: "XX − VI", categoryId: "lt" },
      { id: "rns57", text: "VII + VII", categoryId: "lt" },
      { id: "rns58", text: "IX + IV", categoryId: "lt" },
      { id: "rns59", text: "XXX − XX", categoryId: "lt" },
      { id: "rns60", text: "II · VI", categoryId: "lt" },
      { id: "rns61", text: "XI + II", categoryId: "lt" },
      { id: "rns62", text: "XIX − VIII", categoryId: "lt" },
      { id: "rns63", text: "V + V + IV", categoryId: "lt" },
      { id: "rns64", text: "X + V", categoryId: "eq" },
      { id: "rns65", text: "XX − V", categoryId: "eq" },
      { id: "rns66", text: "XXX : II", categoryId: "eq" },
      { id: "rns67", text: "III · V", categoryId: "eq" },
      { id: "rns68", text: "IX + VI", categoryId: "eq" },
      { id: "rns69", text: "XII + III", categoryId: "eq" },
      { id: "rns70", text: "XIX − IV", categoryId: "eq" },
      { id: "rns71", text: "VII + VIII", categoryId: "eq" },
      { id: "rns72", text: "XXV − X", categoryId: "eq" },
      { id: "rns73", text: "X + VI", categoryId: "gt" },
      { id: "rns74", text: "XX − IV", categoryId: "gt" },
      { id: "rns75", text: "VIII + VIII", categoryId: "gt" },
      { id: "rns76", text: "XXX − XIV", categoryId: "gt" },
      { id: "rns77", text: "IV · V", categoryId: "gt" },
      { id: "rns78", text: "XI + IX", categoryId: "gt" },
      { id: "rns79", text: "XIX − III", categoryId: "gt" },
      { id: "rns80", text: "XXV − IX", categoryId: "gt" },
      { id: "rns81", text: "XXXIX − XX", categoryId: "gt" }
    ]
  }
];

const ROMAN_NUMERALS4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROMAN_NUMERALS4_SORTER_LEVELS_LIST[0],
  2: ROMAN_NUMERALS4_SORTER_LEVELS_LIST[1],
  3: ROMAN_NUMERALS4_SORTER_LEVELS_LIST[2]
};

export const RomanNumerals4Sorter: React.FC<RomanNumerals4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-romai-sorter',
  topicTitle = "7. A római számok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="a-romai-szamok"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat értékük és írásmódjuk szerint!"
      levels={ROMAN_NUMERALS4_SORTER_LEVELS}
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

export default RomanNumerals4Sorter;
