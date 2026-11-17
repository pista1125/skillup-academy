import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortPile, SortCards } from './Numbers1000G3CardFigures';

interface Numbers1000G3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány százas?',
    description: 'Nézd meg a százasokat! Tedd a jó dobozba!',
    categories: [
      { id: 'sz6', name: '6 százas (600-tól 699-ig)', color: 'sky' },
      { id: 'sz7', name: '7 százas (700-tól 799-ig)', color: 'amber' },
      { id: 'sz8', name: '8 százas (800-tól 899-ig)', color: 'emerald' }
    ],
    items: [
      { id: 'n1000s1', text: '', figure: <SortPile h={6} t={4} e={1} />, categoryId: 'sz6' },
      { id: 'n1000s2', text: '', figure: <SortCards digits={['6', '0', '9']} />, categoryId: 'sz6' },
      { id: 'n1000s3', text: 'hatszázhetven', categoryId: 'sz6' },
      { id: 'n1000s4', text: '', figure: <SortPile h={7} t={0} e={8} />, categoryId: 'sz7' },
      { id: 'n1000s5', text: '', figure: <SortCards digits={['7', '9', '9']} />, categoryId: 'sz7' },
      { id: 'n1000s6', text: 'hétszázegy', categoryId: 'sz7' },
      { id: 'n1000s7', text: '', figure: <SortPile h={8} t={5} e={0} />, categoryId: 'sz8' },
      { id: 'n1000s8', text: '', figure: <SortCards digits={['8', '1', '2']} />, categoryId: 'sz8' },
      { id: 'n1000s9', text: '899', categoryId: 'sz8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyit ér az 5-ös?',
    description: 'Keresd meg az 5-öst! Hol áll? Mennyit ér?',
    categories: [
      { id: 'v500', name: 'Az 5-ös 500-at ér', color: 'rose' },
      { id: 'v50', name: 'Az 5-ös 50-et ér', color: 'sky' },
      { id: 'v5', name: 'Az 5-ös 5-öt ér', color: 'amber' }
    ],
    items: [
      { id: 'n1000s10', text: '', figure: <SortCards digits={['5', '2', '8']} />, categoryId: 'v500' },
      { id: 'n1000s11', text: '', figure: <SortPile h={5} t={1} e={0} />, categoryId: 'v500' },
      { id: 'n1000s12', text: '507', categoryId: 'v500' },
      { id: 'n1000s13', text: '', figure: <SortCards digits={['9', '5', '1']} />, categoryId: 'v50' },
      { id: 'n1000s14', text: '', figure: <SortPile h={2} t={5} e={3} />, categoryId: 'v50' },
      { id: 'n1000s15', text: '650', categoryId: 'v50' },
      { id: 'n1000s16', text: '', figure: <SortCards digits={['3', '6', '5']} />, categoryId: 'v5' },
      { id: 'n1000s17', text: '', figure: <SortPile h={8} t={0} e={5} />, categoryId: 'v5' },
      { id: 'n1000s18', text: '945', categoryId: 'v5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Páros, páratlan, négyjegyű',
    description: 'Háromjegyű? Páros vagy páratlan? Az utolsó jegy dönt!',
    categories: [
      { id: 'even3', name: 'Háromjegyű páros', color: 'teal' },
      { id: 'odd3', name: 'Háromjegyű páratlan', color: 'purple' },
      { id: 'not3', name: 'Nem háromjegyű', color: 'orange' }
    ],
    items: [
      { id: 'n1000s19', text: '', figure: <SortCards digits={['7', '4', '6']} />, categoryId: 'even3' },
      { id: 'n1000s20', text: '', figure: <SortPile h={5} t={0} e={2} />, categoryId: 'even3' },
      { id: 'n1000s21', text: '980', categoryId: 'even3' },
      { id: 'n1000s22', text: '', figure: <SortCards digits={['3', '0', '9']} />, categoryId: 'odd3' },
      { id: 'n1000s23', text: '', figure: <SortPile h={9} t={9} e={9} />, categoryId: 'odd3' },
      { id: 'n1000s24', text: '611', categoryId: 'odd3' },
      { id: 'n1000s25', text: '', figure: <SortCards digits={['1', '0', '0', '0']} />, categoryId: 'not3' },
      { id: 'n1000s26', text: '', figure: <SortPile h={0} t={8} e={5} />, categoryId: 'not3' },
      { id: 'n1000s27', text: '98', categoryId: 'not3' }
    ]
  }
];

export const NUMBERS_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Numbers1000G3Sorter: React.FC<Numbers1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c1000-szamok-sorter',
  topicTitle = '1. Számok 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szamok-1000-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat a százasok, a helyiérték és a páros–páratlan szerint!"
      levels={NUMBERS_1000_G3_SORTER_LEVELS}
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

export default Numbers1000G3Sorter;
