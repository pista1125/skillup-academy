import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard80, RomanCard80, ClockCard80 } from './RomanIntroG2CardFigures';

interface RomanIntroG2SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kicsi, közepes, nagy',
    description: 'Mennyit ér a római szám? Tedd a jó dobozba!',
    categories: [
      { id: 'lt5', name: 'Kisebb, mint 5', color: 'sky' },
      { id: 'mid', name: '5-től 10-ig', color: 'emerald' },
      { id: 'gt10', name: 'Nagyobb, mint 10', color: 'amber' }
    ],
    items: [
      { id: 'ris1', text: '', categoryId: 'lt5', figure: <StickCard80 value="I" /> },
      { id: 'ris2', text: '', categoryId: 'lt5', figure: <StickCard80 value="II" /> },
      { id: 'ris3', text: 'III', categoryId: 'lt5' },
      { id: 'ris4', text: '', categoryId: 'mid', figure: <StickCard80 value="V" /> },
      { id: 'ris5', text: '', categoryId: 'mid', figure: <RomanCard80 value="VII" /> },
      { id: 'ris6', text: 'X', categoryId: 'mid' },
      { id: 'ris7', text: '', categoryId: 'gt10', figure: <RomanCard80 value="XII" /> },
      { id: 'ris8', text: '', categoryId: 'gt10', figure: <StickCard80 value="XV" /> },
      { id: 'ris9', text: 'XX', categoryId: 'gt10' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hozzáad, elvesz vagy hibás?',
    description: 'Nézd meg a jeleket! Csak hozzáadunk, van benne elvevés, vagy hibás az írás?',
    categories: [
      { id: 'add', name: 'Csak hozzáadunk', color: 'emerald' },
      { id: 'sub', name: 'Van benne elvevés', color: 'rose' },
      { id: 'bad', name: 'Hibás írás', color: 'slate' }
    ],
    items: [
      { id: 'ris10', text: '', categoryId: 'add', figure: <StickCard80 value="VI" /> },
      { id: 'ris11', text: '', categoryId: 'add', figure: <RomanCard80 value="XI" /> },
      { id: 'ris12', text: 'VII', categoryId: 'add' },
      { id: 'ris13', text: '', categoryId: 'sub', figure: <StickCard80 value="IV" /> },
      { id: 'ris14', text: '', categoryId: 'sub', figure: <RomanCard80 value="IX" /> },
      { id: 'ris15', text: 'XIV', categoryId: 'sub' },
      { id: 'ris16', text: '', categoryId: 'bad', figure: <StickCard80 value="IIII" /> },
      { id: 'ris17', text: '', categoryId: 'bad', figure: <RomanCard80 value="VV" /> },
      { id: 'ris18', text: 'IIX', categoryId: 'bad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: 4, 9 vagy 11?',
    description: 'Óra, pálcika vagy művelet: melyik számot mutatja?',
    categories: [
      { id: 'n4', name: '4', color: 'sky' },
      { id: 'n9', name: '9', color: 'purple' },
      { id: 'n11', name: '11', color: 'amber' }
    ],
    items: [
      { id: 'ris19', text: '', categoryId: 'n4', figure: <RomanCard80 value="IV" /> },
      { id: 'ris20', text: '', categoryId: 'n4', figure: <ClockCard80 hour={4} /> },
      { id: 'ris21', text: '5 − 1', categoryId: 'n4' },
      { id: 'ris22', text: '', categoryId: 'n9', figure: <StickCard80 value="IX" /> },
      { id: 'ris23', text: '', categoryId: 'n9', figure: <ClockCard80 hour={9} /> },
      { id: 'ris24', text: '10 − 1', categoryId: 'n9' },
      { id: 'ris25', text: '', categoryId: 'n11', figure: <StickCard80 value="XI" /> },
      { id: 'ris26', text: '', categoryId: 'n11', figure: <ClockCard80 hour={11} /> },
      { id: 'ris27', text: '10 + 1', categoryId: 'n11' }
    ]
  }
];

export const ROMAN_INTRO_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const RomanIntroG2Sorter: React.FC<RomanIntroG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-romai-ertelmezes-sorter',
  topicTitle = '1. Római számok értelmezése – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-ertelmezese"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat érték és írásmód szerint!"
      levels={ROMAN_INTRO_G2_SORTER_LEVELS}
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

export default RomanIntroG2Sorter;
