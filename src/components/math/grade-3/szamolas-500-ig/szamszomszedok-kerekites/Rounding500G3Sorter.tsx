import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortHLine, HiddenCard } from './Rounding500G3CardFigures';

interface Rounding500G3SorterProps {
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

const ROUNDING_500_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik százas lesz?',
    description: 'Kerekítsd százasra, és tedd a jó dobozba!',
    categories: [
      { id: 'k200', name: '≈ 200', color: 'sky' },
      { id: 'k300', name: '≈ 300', color: 'amber' },
      { id: 'k400', name: '≈ 400', color: 'emerald' }
    ],
    items: [
      { id: 'r500s1', text: '172', figure: <SortHLine lo={100} v={172} />, categoryId: 'k200' },
      { id: 'r500s2', text: '238', figure: <SortHLine lo={200} v={238} />, categoryId: 'k200' },
      { id: 'r500s3', text: '205', categoryId: 'k200' },
      { id: 'r500s4', text: '251', figure: <SortHLine lo={200} v={251} />, categoryId: 'k300' },
      { id: 'r500s5', text: '316', figure: <SortHLine lo={300} v={316} />, categoryId: 'k300' },
      { id: 'r500s6', text: '349', categoryId: 'k300' },
      { id: 'r500s7', text: '350', figure: <SortHLine lo={300} v={350} />, categoryId: 'k400' },
      { id: 'r500s8', text: '444', figure: <SortHLine lo={400} v={444} />, categoryId: 'k400' },
      { id: 'r500s9', text: '397', categoryId: 'k400' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Le, fel vagy marad?',
    description: 'Kerekítsd százasra! Merre kell menni?',
    categories: [
      { id: 'le', name: 'Lefelé kerekítünk', color: 'sky' },
      { id: 'fel', name: 'Felfelé kerekítünk', color: 'rose' },
      { id: 'marad', name: 'Kerek százas, marad', color: 'emerald' }
    ],
    items: [
      { id: 'r500s10', text: '312', figure: <SortHLine lo={300} v={312} />, categoryId: 'le' },
      { id: 'r500s11', text: '441', figure: <SortHLine lo={400} v={441} />, categoryId: 'le' },
      { id: 'r500s12', text: '128', categoryId: 'le' },
      { id: 'r500s13', text: '167', figure: <SortHLine lo={100} v={167} />, categoryId: 'fel' },
      { id: 'r500s14', text: '250', figure: <SortHLine lo={200} v={250} />, categoryId: 'fel' },
      { id: 'r500s15', text: '389', categoryId: 'fel' },
      { id: 'r500s16', text: '200', figure: <SortHLine lo={200} v={200} />, categoryId: 'marad' },
      { id: 'r500s17', text: '400', categoryId: 'marad' },
      { id: 'r500s18', text: '300', figure: <SortHLine lo={200} v={300} />, categoryId: 'marad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Letakart számjegy',
    description: 'Egy jegyet letakartunk. Százasra kerekítve 300 lesz belőle?',
    categories: [
      { id: 'biztos', name: 'Biztosan ≈ 300', color: 'emerald' },
      { id: 'lehet', name: 'Lehet, de nem biztos', color: 'amber' },
      { id: 'nem', name: 'Biztosan nem ≈ 300', color: 'rose' }
    ],
    items: [
      { id: 'r500s19', text: '', figure: <HiddenCard digits={['3', '1', '?']} />, categoryId: 'biztos' },
      { id: 'r500s20', text: '', figure: <HiddenCard digits={['2', '9', '?']} />, categoryId: 'biztos' },
      { id: 'r500s21', text: '33□', categoryId: 'biztos' },
      { id: 'r500s22', text: '', figure: <HiddenCard digits={['2', '?', '8']} />, categoryId: 'lehet' },
      { id: 'r500s23', text: '', figure: <HiddenCard digits={['3', '?', '1']} />, categoryId: 'lehet' },
      { id: 'r500s24', text: '□75', categoryId: 'lehet' },
      { id: 'r500s25', text: '', figure: <HiddenCard digits={['4', '?', '5']} />, categoryId: 'nem' },
      { id: 'r500s26', text: '', figure: <HiddenCard digits={['1', '?', '9']} />, categoryId: 'nem' },
      { id: 'r500s27', text: '16□', categoryId: 'nem' }
    ]
  }
];

export const ROUNDING_500_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROUNDING_500_G3_SORTER_LEVELS_LIST[0],
  2: ROUNDING_500_G3_SORTER_LEVELS_LIST[1],
  3: ROUNDING_500_G3_SORTER_LEVELS_LIST[2]
};

export const Rounding500G3Sorter: React.FC<Rounding500G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c500-kerekites-sorter',
  topicTitle = '2. Számszomszédok, kerekítés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Kerekítsd a számokat százasra, és válogasd szét őket!"
      levels={ROUNDING_500_G3_SORTER_LEVELS}
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

export default Rounding500G3Sorter;
