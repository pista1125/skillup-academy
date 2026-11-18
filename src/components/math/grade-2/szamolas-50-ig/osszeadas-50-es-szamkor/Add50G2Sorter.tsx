import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksAddCard, JumpCard, PyramidCard, BalanceCard } from './Add50G2CardFigures';
import { CoinsCard } from '../szamok-50-ig/Numbers50G2CardFigures';

interface Add50G2SorterProps {
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

const ADD50_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az összeg?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 's30', name: 'Összeg: 30', color: 'sky' },
      { id: 's40', name: 'Összeg: 40', color: 'emerald' },
      { id: 's50', name: 'Összeg: 50', color: 'amber' }
    ],
    items: [
      { id: 'a50s1', text: '23 + 7', categoryId: 's30' },
      { id: 'a50s2', text: '', categoryId: 's30', figure: <BlocksAddCard a={26} b={4} small /> },
      { id: 'a50s3', text: '', categoryId: 's30', figure: <JumpCard start={25} hops={[5]} small /> },
      { id: 'a50s4', text: '34 + 6', categoryId: 's40' },
      { id: 'a50s5', text: '', categoryId: 's40', figure: <BlocksAddCard a={35} b={5} small /> },
      { id: 'a50s6', text: '', categoryId: 's40', figure: <CoinsCard coins={[20, 10, 5, 5]} small /> },
      { id: 'a50s7', text: '45 + 5', categoryId: 's50' },
      { id: 'a50s8', text: '', categoryId: 's50', figure: <CoinsCard coins={[20, 20, 5, 5]} small /> },
      { id: 'a50s9', text: '27 + 23', categoryId: 's50' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átlépjük a tízest?',
    description: 'Nézd az egyeseket! Kevesebb lesz 10-nél, pont 10, vagy több?',
    categories: [
      { id: 'no', name: 'Nem lépjük át', color: 'blue' },
      { id: 'exact', name: 'Pont kerek tízes', color: 'emerald' },
      { id: 'over', name: 'Átlépjük', color: 'rose' }
    ],
    items: [
      { id: 'a50s10', text: '32 + 5', categoryId: 'no' },
      { id: 'a50s11', text: '', categoryId: 'no', figure: <JumpCard start={41} hops={[6]} small /> },
      { id: 'a50s12', text: '', categoryId: 'no', figure: <BlocksAddCard a={23} b={4} small /> },
      { id: 'a50s13', text: '26 + 4', categoryId: 'exact' },
      { id: 'a50s14', text: '', categoryId: 'exact', figure: <JumpCard start={37} hops={[3]} small /> },
      { id: 'a50s15', text: '', categoryId: 'exact', figure: <BlocksAddCard a={35} b={5} small /> },
      { id: 'a50s16', text: '28 + 5', categoryId: 'over' },
      { id: 'a50s17', text: '', categoryId: 'over', figure: <JumpCard start={19} hops={[4]} small /> },
      { id: 'a50s18', text: '', categoryId: 'over', figure: <BlocksAddCard a={38} b={5} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Keresd meg a □ vagy a ? értékét!',
    categories: [
      { id: 'm3', name: 'Hiányzó szám: 3', color: 'sky' },
      { id: 'm5', name: 'Hiányzó szám: 5', color: 'purple' },
      { id: 'm8', name: 'Hiányzó szám: 8', color: 'amber' }
    ],
    items: [
      { id: 'a50s19', text: '27 + □ = 30', categoryId: 'm3' },
      { id: 'a50s20', text: '', categoryId: 'm3', figure: <PyramidCard left="18" right="?" top="21" small /> },
      { id: 'a50s21', text: '', categoryId: 'm3', figure: <BalanceCard left="20+7" right="24+?" small /> },
      { id: 'a50s22', text: '35 + □ = 40', categoryId: 'm5' },
      { id: 'a50s23', text: '', categoryId: 'm5', figure: <PyramidCard left="?" right="26" top="31" small /> },
      { id: 'a50s24', text: '', categoryId: 'm5', figure: <BalanceCard left="28+7" right="30+?" small /> },
      { id: 'a50s25', text: '□ + 32 = 40', categoryId: 'm8' },
      { id: 'a50s26', text: '', categoryId: 'm8', figure: <PyramidCard left="14" right="?" top="22" small /> },
      { id: 'a50s27', text: '', categoryId: 'm8', figure: <BalanceCard left="25+9" right="26+?" small /> }
    ]
  }
];

export const ADD50_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD50_G2_SORTER_LEVELS_LIST[0],
  2: ADD50_G2_SORTER_LEVELS_LIST[1],
  3: ADD50_G2_SORTER_LEVELS_LIST[2]
};

export const Add50G2Sorter: React.FC<Add50G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-osszeadas-sorter',
  topicTitle = '2. Összeadás 50-es számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="osszeadas-50-es-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét az összeadásokat összeg, tízesátlépés és hiányzó szám szerint!"
      levels={ADD50_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToQuiz={onSwitchToQuiz}
      onComplete={onComplete}
    />
  );
};

export default Add50G2Sorter;
