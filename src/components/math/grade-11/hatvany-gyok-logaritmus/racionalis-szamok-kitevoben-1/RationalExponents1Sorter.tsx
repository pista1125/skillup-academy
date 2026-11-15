import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalExponents1SorterProps {
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

const RATIONAL_EXPONENTS_1_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen szám az eredmény?',
    description: 'Számold ki fejben, és döntsd el, milyen szám a hatvány értéke!',
    categories: [
      { id: 'int', name: 'Egész szám', color: 'violet' },
      { id: 'dec', name: 'Véges tizedes tört (nem egész)', color: 'emerald' },
      { id: 'irr', name: 'Irracionális (csak közelítő érték)', color: 'rose' }
    ],
    items: [
      { id: 're1s1', text: '16¹⁄²', categoryId: 'int' },
      { id: 're1s2', text: '1000¹⁄³', categoryId: 'int' },
      { id: 're1s3', text: '81¹⁄⁴', categoryId: 'int' },
      { id: 're1s4', text: '6,25¹⁄²', categoryId: 'dec' },
      { id: 're1s5', text: '0,125¹⁄³', categoryId: 'dec' },
      { id: 're1s6', text: '0,0016¹⁄⁴', categoryId: 'dec' },
      { id: 're1s7', text: '2¹⁄²', categoryId: 'irr' },
      { id: 're1s8', text: '2¹⁄¹²', categoryId: 'irr' },
      { id: 're1s9', text: '1,3¹⁄⁷', categoryId: 'irr' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az értéke?',
    description: 'Sorold be a hatványokat az értékük szerint!',
    categories: [
      { id: 'two', name: '= 2', color: 'blue' },
      { id: 'three', name: '= 3', color: 'amber' },
      { id: 'ten', name: '= 10', color: 'teal' }
    ],
    items: [
      { id: 're1s10', text: '8¹⁄³', categoryId: 'two' },
      { id: 're1s11', text: '32¹⁄⁵', categoryId: 'two' },
      { id: 're1s12', text: '1024¹⁄¹⁰', categoryId: 'two' },
      { id: 're1s13', text: '9¹⁄²', categoryId: 'three' },
      { id: 're1s14', text: '81¹⁄⁴', categoryId: 'three' },
      { id: 're1s15', text: '27¹⁄³', categoryId: 'three' },
      { id: 're1s16', text: '100¹⁄²', categoryId: 'ten' },
      { id: 're1s17', text: '1000¹⁄³', categoryId: 'ten' },
      { id: 're1s18', text: '10000¹⁄⁴', categoryId: 'ten' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Értelmezett-e?',
    description: 'A definíció szerint a¹⁄ⁿ = ⁿ√a csak a ≥ 0 esetén. Döntsd el, mi a helyzet!',
    categories: [
      { id: 'zero', name: 'Értelmezett, értéke 0', color: 'slate' },
      { id: 'pos', name: 'Értelmezett, értéke pozitív', color: 'emerald' },
      { id: 'undef', name: 'Nem értelmezzük', color: 'rose' }
    ],
    items: [
      { id: 're1s19', text: '0¹⁄¹⁰', categoryId: 'zero' },
      { id: 're1s20', text: '0¹⁄²', categoryId: 'zero' },
      { id: 're1s21', text: '0¹⁄³', categoryId: 'zero' },
      { id: 're1s22', text: '1¹⁄⁹', categoryId: 'pos' },
      { id: 're1s23', text: '0,0001¹⁄⁴', categoryId: 'pos' },
      { id: 're1s24', text: '1,011¹⁄³', categoryId: 'pos' },
      { id: 're1s25', text: '(−8)¹⁄³', categoryId: 'undef' },
      { id: 're1s26', text: '(−1)¹⁄²', categoryId: 'undef' },
      { id: 're1s27', text: '(−32)¹⁄⁵', categoryId: 'undef' }
    ]
  }
];

const RATIONAL_EXPONENTS_1_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RATIONAL_EXPONENTS_1_SORTER_LEVELS_LIST[0],
  2: RATIONAL_EXPONENTS_1_SORTER_LEVELS_LIST[1],
  3: RATIONAL_EXPONENTS_1_SORTER_LEVELS_LIST[2]
};

export const RationalExponents1Sorter: React.FC<RationalExponents1SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-tortkitevo-elso-sorter',
  topicTitle = '3. Racionális számok a kitevőben I. – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="racionalis-szamok-kitevoben-1"
      title={topicTitle}
      subtitle="Rendszerezd az 1/n kitevős hatványokat: milyen szám az értékük, mennyi pontosan, és értelmezettek-e!"
      levels={RATIONAL_EXPONENTS_1_SORTER_LEVELS}
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

export default RationalExponents1Sorter;
