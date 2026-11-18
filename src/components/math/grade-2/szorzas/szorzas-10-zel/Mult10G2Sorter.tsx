import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard80, CoinsCard80, EggsCard80, BarrelCard80 } from './Mult10G2CardFigures';

interface Mult10G2SorterProps {
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
      { id: 'p20', name: 'Összesen: 20', color: 'sky' },
      { id: 'p50', name: 'Összesen: 50', color: 'emerald' },
      { id: 'p80', name: 'Összesen: 80', color: 'amber' }
    ],
    items: [
      { id: 'm10s1', text: '', categoryId: 'p20', figure: <RodsCard80 n={2} /> },
      { id: 'm10s2', text: '2 · 10', categoryId: 'p20' },
      { id: 'm10s3', text: '', categoryId: 'p20', figure: <CoinsCard80 n={2} /> },
      { id: 'm10s4', text: '', categoryId: 'p50', figure: <CoinsCard80 n={5} /> },
      { id: 'm10s5', text: '5 · 10', categoryId: 'p50' },
      { id: 'm10s6', text: '10 · 5', categoryId: 'p50' },
      { id: 'm10s7', text: '', categoryId: 'p80', figure: <EggsCard80 n={8} /> },
      { id: 'm10s8', text: '8 · 10', categoryId: 'p80' },
      { id: 'm10s9', text: '', categoryId: 'p80', figure: <RodsCard80 n={8} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik táblában van?',
    description: 'Benne van a szám a 10-es táblában? Vagy csak az 5-ösben?',
    categories: [
      { id: 'ten', name: 'Benne van a 10-es táblában', color: 'blue' },
      { id: 'five', name: 'Csak az 5-ös táblában van', color: 'amber' },
      { id: 'none', name: 'Egyik táblában sincs', color: 'rose' }
    ],
    items: [
      { id: 'm10s10', text: '', categoryId: 'ten', figure: <BarrelCard80 n={70} /> },
      { id: 'm10s11', text: '9 · 10', categoryId: 'ten' },
      { id: 'm10s12', text: '', categoryId: 'ten', figure: <CoinsCard80 n={3} /> },
      { id: 'm10s13', text: '', categoryId: 'five', figure: <BarrelCard80 n={35} /> },
      { id: 'm10s14', text: '7 · 5', categoryId: 'five' },
      { id: 'm10s15', text: '', categoryId: 'five', figure: <CoinsCard80 n={3} value={5} /> },
      { id: 'm10s16', text: '', categoryId: 'none', figure: <BarrelCard80 n={64} /> },
      { id: 'm10s17', text: '44', categoryId: 'none' },
      { id: 'm10s18', text: '', categoryId: 'none', figure: <BarrelCard80 n={51} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kevesebb vagy több, mint 50?',
    description: 'Számold ki, és hasonlítsd össze az 50-nel!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 50', color: 'sky' },
      { id: 'eq', name: 'Pontosan 50', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 50', color: 'purple' }
    ],
    items: [
      { id: 'm10s19', text: '4 · 10', categoryId: 'lt' },
      { id: 'm10s20', text: '', categoryId: 'lt', figure: <CoinsCard80 n={4} /> },
      { id: 'm10s21', text: '3 · 10 + 5', categoryId: 'lt' },
      { id: 'm10s22', text: '10 · 5', categoryId: 'eq' },
      { id: 'm10s23', text: '', categoryId: 'eq', figure: <EggsCard80 n={5} /> },
      { id: 'm10s24', text: '', categoryId: 'eq', figure: <RodsCard80 n={5} /> },
      { id: 'm10s25', text: '6 · 10', categoryId: 'gt' },
      { id: 'm10s26', text: '', categoryId: 'gt', figure: <RodsCard80 n={9} /> },
      { id: 'm10s27', text: '7 · 10 − 10', categoryId: 'gt' }
    ]
  }
];

export const MULT10_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Mult10G2Sorter: React.FC<Mult10G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-10-sorter',
  topicTitle = '9. Szorzás 10-zel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-10-zel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat, rudakat, érméket és hordókat!"
      levels={MULT10_G2_SORTER_LEVELS}
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

export default Mult10G2Sorter;
