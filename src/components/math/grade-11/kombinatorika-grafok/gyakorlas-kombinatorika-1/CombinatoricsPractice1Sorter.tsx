import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPractice1SorterProps {
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

const COMBINATORICS_PRACTICE1_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik alapeset?',
    description: 'Döntsd el, melyik összeszámlálási alapesethez tartozik a feladat!',
    categories: [
      { id: 'perm', name: 'Mindet sorba rendezzük: n!', color: 'blue' },
      { id: 'var', name: 'Számít a sorrend (variáció)', color: 'amber' },
      { id: 'comb', name: 'Nem számít a sorrend: (n alatt k)', color: 'purple' }
    ],
    items: [
      { id: 'cp1s1', text: '5 vadállat vonulási sorrendje', categoryId: 'perm' },
      { id: 'cp1s2', text: '10 tanuló leül egy tornapadra', categoryId: 'perm' },
      { id: 'cp1s3', text: '12 tanuló egyesével kimegy a teremből', categoryId: 'perm' },
      { id: 'cp1s4', text: '3 karakteres jelszó 5 karakterből', categoryId: 'var' },
      { id: 'cp1s5', text: '6 kérdéses teszt kitöltése A, B, C, D válaszokkal', categoryId: 'var' },
      { id: 'cp1s6', text: '2 különböző jutalom 10 ember között', categoryId: 'var' },
      { id: 'cp1s7', text: 'Ötös lottószelvény kitöltése', categoryId: 'comb' },
      { id: 'cp1s8', text: '6 fős zsűri 13 jelöltből', categoryId: 'comb' },
      { id: 'cp1s9', text: 'Melyik 5 lámpa ég a 7-ből?', categoryId: 'comb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzunk, összeadunk vagy osztunk?',
    description: 'Melyik lépés a döntő a feladat megoldásában?',
    categories: [
      { id: 'mul', name: 'Szorzás („és”)', color: 'emerald' },
      { id: 'add', name: 'Összeadás („vagy”, esetszétválasztás)', color: 'sky' },
      { id: 'div', name: 'Osztás (a többszörös számolás kiszűrése)', color: 'rose' }
    ],
    items: [
      { id: 'cp1s10', text: 'Zsűri 3 tanárral és 3 diákkal', categoryId: 'mul' },
      { id: 'cp1s11', text: '3 találatos lottószelvények: 3 kihúzott és 2 nem kihúzott szám', categoryId: 'mul' },
      { id: 'cp1s12', text: '15 fő egy 4, egy 5 és egy 6 személyes autóba', categoryId: 'mul' },
      { id: 'cp1s13', text: '7 lámpából legalább 5 világít', categoryId: 'add' },
      { id: 'cp1s14', text: '2 egyforma jutalom, egy ember többet is kaphat', categoryId: 'add' },
      { id: 'cp1s15', text: '4 jegyű számok 4 egyesből és 2 kettesből', categoryId: 'add' },
      { id: 'cp1s16', text: '15 fő három EGYFORMA 5 személyes autóba', categoryId: 'div' },
      { id: 'cp1s17', text: '9 elemű halmaz 4 elemű részhalmazai a 9 · 8 · 7 · 6 sorrendből', categoryId: 'div' },
      { id: 'cp1s18', text: '5 vadállat körbe vonul, egyiküket sem tekintjük elsőnek', categoryId: 'div' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora az eredmény?',
    description: 'Becsüld meg vagy számold ki, és sorold be az eredményt!',
    categories: [
      { id: 'small', name: 'Kevesebb, mint 100', color: 'teal' },
      { id: 'mid', name: '100 és 10 000 között', color: 'indigo' },
      { id: 'big', name: 'Több, mint 10 000', color: 'orange' }
    ],
    items: [
      { id: 'cp1s19', text: '7 lámpából legalább 5 világít', categoryId: 'small' },
      { id: 'cp1s20', text: 'A TÉGLALAP szó kiolvasásai', categoryId: 'small' },
      { id: 'cp1s21', text: '2 egyforma jutalom 10 főnek, valaki többet is kaphat', categoryId: 'small' },
      { id: 'cp1s22', text: 'Zsűri: 13 főből 6', categoryId: 'mid' },
      { id: 'cp1s23', text: 'Zsűri: 3 tanár és 3 diák', categoryId: 'mid' },
      { id: 'cp1s24', text: '5 vadállat vonulási sorrendjei', categoryId: 'mid' },
      { id: 'cp1s25', text: '3 találatos ötös lottószelvények', categoryId: 'big' },
      { id: 'cp1s26', text: 'Az összes ötös lottószelvény', categoryId: 'big' },
      { id: 'cp1s27', text: '15 fő a 4, 5 és 6 személyes autóban (ülésrend lényegtelen)', categoryId: 'big' }
    ]
  }
];

const COMBINATORICS_PRACTICE1_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMBINATORICS_PRACTICE1_SORTER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE1_SORTER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE1_SORTER_LEVELS_LIST[2]
};

export const CombinatoricsPractice1Sorter: React.FC<CombinatoricsPractice1SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-gyakorlas-elso-sorter',
  topicTitle = '5. Gyakorlás – kombinatorika – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-kombinatorika-1"
      title={topicTitle}
      subtitle="Rendszerezd a feladatokat: melyik alapeset, melyik művelet, mekkora az eredmény?"
      levels={COMBINATORICS_PRACTICE1_SORTER_LEVELS}
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

export default CombinatoricsPractice1Sorter;
