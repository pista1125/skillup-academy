import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { HandsCard80, CoinsCard80, BarrelCard80, TargetCard80 } from './Mult5G2CardFigures';

interface Mult5G2SorterProps {
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
    title: '1. szint: Mennyi összesen?',
    description: 'Számold ki, mennyi, és tedd a jó dobozba!',
    categories: [
      { id: 'p10', name: 'Összesen: 10', color: 'sky' },
      { id: 'p20', name: 'Összesen: 20', color: 'emerald' },
      { id: 'p30', name: 'Összesen: 30', color: 'amber' }
    ],
    items: [
      { id: 'm5s1', text: '', categoryId: 'p10', figure: <HandsCard80 n={2} /> },
      { id: 'm5s2', text: '2 · 5', categoryId: 'p10' },
      { id: 'm5s3', text: '', categoryId: 'p10', figure: <CoinsCard80 n={2} /> },
      { id: 'm5s4', text: '', categoryId: 'p20', figure: <CoinsCard80 n={4} /> },
      { id: 'm5s5', text: '4 · 5', categoryId: 'p20' },
      { id: 'm5s6', text: '2 · 10', categoryId: 'p20' },
      { id: 'm5s7', text: '', categoryId: 'p30', figure: <HandsCard80 n={6} /> },
      { id: 'm5s8', text: '6 · 5', categoryId: 'p30' },
      { id: 'm5s9', text: '3 · 10', categoryId: 'p30' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 5-ös tábla, 10-es tábla?',
    description: 'Benne van a szám az 5-ös táblában? És a 10-esben is?',
    categories: [
      { id: 'ten', name: 'Az 5-ös és a 10-es táblában is', color: 'blue' },
      { id: 'five', name: 'Csak az 5-ös táblában', color: 'amber' },
      { id: 'none', name: 'Az 5-ös táblában sincs', color: 'rose' }
    ],
    items: [
      { id: 'm5s10', text: '', categoryId: 'ten', figure: <BarrelCard80 n={30} /> },
      { id: 'm5s11', text: '8 · 5', categoryId: 'ten' },
      { id: 'm5s12', text: '', categoryId: 'ten', figure: <HandsCard80 n={4} /> },
      { id: 'm5s13', text: '', categoryId: 'five', figure: <BarrelCard80 n={45} /> },
      { id: 'm5s14', text: '7 · 5', categoryId: 'five' },
      { id: 'm5s15', text: '', categoryId: 'five', figure: <CoinsCard80 n={3} /> },
      { id: 'm5s16', text: '', categoryId: 'none', figure: <BarrelCard80 n={23} /> },
      { id: 'm5s17', text: '32', categoryId: 'none' },
      { id: 'm5s18', text: '', categoryId: 'none', figure: <BarrelCard80 n={48} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány ötös kell?',
    description: 'Mennyi a □ vagy a ? értéke? Tedd a jó dobozba!',
    categories: [
      { id: 'n4', name: '□ = 4', color: 'emerald' },
      { id: 'n7', name: '□ = 7', color: 'purple' },
      { id: 'n9', name: '□ = 9', color: 'orange' }
    ],
    items: [
      { id: 'm5s19', text: '□ · 5 = 20', categoryId: 'n4' },
      { id: 'm5s20', text: '', categoryId: 'n4', figure: <TargetCard80 kind="hand" total={20} /> },
      { id: 'm5s21', text: '□ · 10 = 40', categoryId: 'n4' },
      { id: 'm5s22', text: '□ · 5 = 35', categoryId: 'n7' },
      { id: 'm5s23', text: '', categoryId: 'n7', figure: <TargetCard80 kind="coin" total={35} /> },
      { id: 'm5s24', text: '50 − 15 = □ · 5', categoryId: 'n7' },
      { id: 'm5s25', text: '□ · 5 = 45', categoryId: 'n9' },
      { id: 'm5s26', text: '', categoryId: 'n9', figure: <TargetCard80 kind="coin" total={45} /> },
      { id: 'm5s27', text: '', categoryId: 'n9', figure: <TargetCard80 kind="hand" total={45} /> }
    ]
  }
];

export const MULT5_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Mult5G2Sorter: React.FC<Mult5G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-5-sorter',
  topicTitle = '4. Szorzás 5-tel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-5-tel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat, kezeket, érméket és hordókat!"
      levels={MULT5_G2_SORTER_LEVELS}
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

export default Mult5G2Sorter;
