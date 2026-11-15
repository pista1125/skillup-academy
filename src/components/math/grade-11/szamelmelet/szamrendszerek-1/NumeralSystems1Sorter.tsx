import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumeralSystems1SorterProps {
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

const NUMERAL_SYSTEMS1_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik alapszám lehetséges?',
    description: 'A legnagyobb számjegy alapján döntsd el, milyen alapú számrendszerben lehet felírva a szám!',
    categories: [
      { id: 'b2', name: 'Csak 0 és 1 jegyek: már a kettesben is lehet', color: 'emerald' },
      { id: 'b5', name: 'Legnagyobb jegye 4: legalább ötös alap', color: 'sky' },
      { id: 'b8', name: 'Legnagyobb jegye 7: legalább nyolcas alap', color: 'amber' }
    ],
    items: [
      { id: 'ns1s1', text: '1011', categoryId: 'b2' },
      { id: 'ns1s2', text: '110', categoryId: 'b2' },
      { id: 'ns1s3', text: '1001', categoryId: 'b2' },
      { id: 'ns1s4', text: '2043', categoryId: 'b5' },
      { id: 'ns1s5', text: '3410', categoryId: 'b5' },
      { id: 'ns1s6', text: '1234', categoryId: 'b5' },
      { id: 'ns1s7', text: '7051', categoryId: 'b8' },
      { id: 'ns1s8', text: '1777', categoryId: 'b8' },
      { id: 'ns1s9', text: '6720', categoryId: 'b8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint 100?',
    description: 'Írd át fejben a számokat tízes számrendszerbe, és hasonlítsd össze a 100-zal!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 100', color: 'sky' },
      { id: 'eq', name: 'Pontosan 100', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint 100', color: 'rose' }
    ],
    items: [
      { id: 'ns1s10', text: '1111₂', categoryId: 'lt' },
      { id: 'ns1s11', text: '43₇', categoryId: 'lt' },
      { id: 'ns1s12', text: '77₈', categoryId: 'lt' },
      { id: 'ns1s13', text: '144₈', categoryId: 'eq' },
      { id: 'ns1s14', text: '1100100₂', categoryId: 'eq' },
      { id: 'ns1s15', text: '84₁₂', categoryId: 'eq' },
      { id: 'ns1s16', text: '1000₅', categoryId: 'gt' },
      { id: 'ns1s17', text: '65₁₆', categoryId: 'gt' },
      { id: 'ns1s18', text: '10000000₂', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik tízes számmal egyenlő?',
    description: 'Sorold be a különböző számrendszerben felírt számokat az értékük szerint!',
    categories: [
      { id: 'v154', name: '154', color: 'purple' },
      { id: 'v255', name: '255', color: 'indigo' },
      { id: 'v539', name: '539', color: 'orange' }
    ],
    items: [
      { id: 'ns1s19', text: '10011010₂', categoryId: 'v154' },
      { id: 'ns1s20', text: '9A₁₆', categoryId: 'v154' },
      { id: 'ns1s21', text: '232₈', categoryId: 'v154' },
      { id: 'ns1s22', text: '11111111₂', categoryId: 'v255' },
      { id: 'ns1s23', text: 'FF₁₆', categoryId: 'v255' },
      { id: 'ns1s24', text: '377₈', categoryId: 'v255' },
      { id: 'ns1s25', text: '20123₄', categoryId: 'v539' },
      { id: 'ns1s26', text: '1033₈', categoryId: 'v539' },
      { id: 'ns1s27', text: '21B₁₆', categoryId: 'v539' }
    ]
  }
];

const NUMERAL_SYSTEMS1_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMERAL_SYSTEMS1_SORTER_LEVELS_LIST[0],
  2: NUMERAL_SYSTEMS1_SORTER_LEVELS_LIST[1],
  3: NUMERAL_SYSTEMS1_SORTER_LEVELS_LIST[2]
};

export const NumeralSystems1Sorter: React.FC<NumeralSystems1SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-szamrendszer-elso-sorter',
  topicTitle = '7. Számrendszerek I. – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamrendszerek-1"
      title={topicTitle}
      subtitle="Rendszerezd: melyik alapszám lehetséges, mekkora a szám, és melyik tízes értékkel egyenlő!"
      levels={NUMERAL_SYSTEMS1_SORTER_LEVELS}
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

export default NumeralSystems1Sorter;
