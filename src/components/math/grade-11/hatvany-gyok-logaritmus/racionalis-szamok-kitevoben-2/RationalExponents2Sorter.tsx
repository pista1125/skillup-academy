import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalExponents2SorterProps {
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

const RATIONAL_EXPONENTS_2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nagyobb vagy kisebb 1-nél?',
    description: 'Pozitív alap racionális kitevőjű hatványa mindig pozitív. Hová esik az értéke?',
    categories: [
      { id: 'gt', name: 'Nagyobb 1-nél', color: 'violet' },
      { id: 'eq', name: 'Pontosan 1', color: 'slate' },
      { id: 'lt', name: '0 és 1 közé esik', color: 'rose' }
    ],
    items: [
      { id: 're2s1', text: '8⁵⁄³', categoryId: 'gt' },
      { id: 're2s2', text: '27²⁄³', categoryId: 'gt' },
      { id: 're2s3', text: '0,25⁻¹⁄²', categoryId: 'gt' },
      { id: 're2s4', text: '5⁵⁄⁷ · 5⁻⁵⁄⁷', categoryId: 'eq' },
      { id: 're2s5', text: '7⁰', categoryId: 'eq' },
      { id: 're2s6', text: '1⁵⁄³', categoryId: 'eq' },
      { id: 're2s7', text: '81⁻¹⁄²', categoryId: 'lt' },
      { id: 're2s8', text: '32⁻³⁄⁵', categoryId: 'lt' },
      { id: 're2s9', text: '0,25³⁄²', categoryId: 'lt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik azonosságot használod?',
    description: 'Sorold be a kifejezést aszerint, melyik azonossággal számolható ki a legegyszerűbben!',
    categories: [
      { id: 'sum', name: 'aᵐ · aⁿ = aᵐ⁺ⁿ (kitevők összege)', color: 'emerald' },
      { id: 'prod', name: '(aᵐ)ⁿ = aᵐⁿ (kitevők szorzata)', color: 'amber' },
      { id: 'base', name: '(ab)ⁿ = aⁿbⁿ vagy (a/b)ⁿ = aⁿ/bⁿ', color: 'blue' }
    ],
    items: [
      { id: 're2s10', text: '28²⁄³ · 28⁴⁄³', categoryId: 'sum' },
      { id: 're2s11', text: '6,25¹⁄³ · 6,25¹⁄⁶', categoryId: 'sum' },
      { id: 're2s12', text: '36^0,4 · 36^0,6', categoryId: 'sum' },
      { id: 're2s13', text: '(2³)⁵⁄³', categoryId: 'prod' },
      { id: 're2s14', text: '(∛10)⁶ = (10¹⁄³)⁶', categoryId: 'prod' },
      { id: 're2s15', text: '(7⁴)¹⁄²', categoryId: 'prod' },
      { id: 're2s16', text: '(225 · 196)¹⁄²', categoryId: 'base' },
      { id: 're2s17', text: '(81/16)¹⁄⁴', categoryId: 'base' },
      { id: 're2s18', text: '(4 · 9)³⁄²', categoryId: 'base' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Milyen szám az eredmény?',
    description: 'Számold ki, és döntsd el, milyen szám a kifejezés értéke!',
    categories: [
      { id: 'int', name: 'Egész szám', color: 'violet' },
      { id: 'rat', name: 'Racionális, de nem egész', color: 'teal' },
      { id: 'irr', name: 'Irracionális', color: 'rose' }
    ],
    items: [
      { id: 're2s19', text: '27⁴⁄³', categoryId: 'int' },
      { id: 're2s20', text: '125⁴⁄³', categoryId: 'int' },
      { id: 're2s21', text: '(1/9)⁻³⁄²', categoryId: 'int' },
      { id: 're2s22', text: '32⁻³⁄⁵', categoryId: 'rat' },
      { id: 're2s23', text: '(81/16)¹⁄⁴', categoryId: 'rat' },
      { id: 're2s24', text: '0,04³⁄²', categoryId: 'rat' },
      { id: 're2s25', text: '2³⁄²', categoryId: 'irr' },
      { id: 're2s26', text: '7²⁄⁵', categoryId: 'irr' },
      { id: 're2s27', text: '²⁰√(3¹⁰)', categoryId: 'irr' }
    ]
  }
];

const RATIONAL_EXPONENTS_2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RATIONAL_EXPONENTS_2_SORTER_LEVELS_LIST[0],
  2: RATIONAL_EXPONENTS_2_SORTER_LEVELS_LIST[1],
  3: RATIONAL_EXPONENTS_2_SORTER_LEVELS_LIST[2]
};

export const RationalExponents2Sorter: React.FC<RationalExponents2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-tortkitevo-masodik-sorter',
  topicTitle = '4. Racionális számok a kitevőben II. – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="racionalis-szamok-kitevoben-2"
      title={topicTitle}
      subtitle="Rendszerezd a törtkitevős hatványokat: hová esik az értékük, melyik azonosság kell, és milyen szám az eredmény!"
      levels={RATIONAL_EXPONENTS_2_SORTER_LEVELS}
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

export default RationalExponents2Sorter;
