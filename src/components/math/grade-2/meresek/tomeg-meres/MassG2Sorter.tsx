import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BalanceCard, CratesCard, WeightsCard } from './MassG2CardFigures';

interface MassG2SorterProps {
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

const w = (kg: number) => ({ kind: 'w' as const, kg });

const MASS_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik oldal nehezebb?',
    description: 'A nehezebb oldal lent van. Nézd meg a mérleget vagy a számokat!',
    categories: [
      { id: 'left', name: 'A bal oldal nehezebb', color: 'sky' },
      { id: 'eq', name: 'Egyensúly', color: 'emerald' },
      { id: 'right', name: 'A jobb oldal nehezebb', color: 'amber' }
    ],
    items: [
      { id: 'mass1', text: '', categoryId: 'left', figure: <BalanceCard small tilt={-12} left={[{ kind: 'melon' }]} right={[{ kind: 'apple' }]} /> },
      { id: 'mass2', text: '', categoryId: 'left', figure: <BalanceCard small tilt={-12} left={[w(5)]} right={[w(2)]} /> },
      { id: 'mass3', text: 'bal: 8 kg, jobb: 6 kg', categoryId: 'left' },
      { id: 'mass4', text: '', categoryId: 'eq', figure: <BalanceCard small left={[{ kind: 'box' }]} right={[{ kind: 'box' }]} /> },
      { id: 'mass5', text: 'bal: 4 kg, jobb: 4 kg', categoryId: 'eq' },
      { id: 'mass6', text: 'bal: 5 kg, jobb: 2 kg + 3 kg', categoryId: 'eq' },
      { id: 'mass7', text: '', categoryId: 'right', figure: <BalanceCard small tilt={12} left={[{ kind: 'pencil' }]} right={[{ kind: 'book' }]} /> },
      { id: 'mass8', text: '', categoryId: 'right', figure: <BalanceCard small tilt={12} left={[w(1)]} right={[w(10)]} /> },
      { id: 'mass9', text: 'bal: 2 kg, jobb: 9 kg', categoryId: 'right' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Könnyebb vagy nehezebb, mint 1 kg?',
    description: 'A mérlegen az 1 kg-os súly van a jobb oldalon. Gondold végig a többit is!',
    categories: [
      { id: 'lt', name: 'Könnyebb, mint 1 kg', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 kg', color: 'emerald' },
      { id: 'gt', name: 'Nehezebb, mint 1 kg', color: 'purple' }
    ],
    items: [
      { id: 'mass10', text: '', categoryId: 'lt', figure: <BalanceCard small tilt={12} left={[{ kind: 'feather' }]} right={[w(1)]} /> },
      { id: 'mass11', text: '', categoryId: 'lt', figure: <BalanceCard small tilt={12} left={[{ kind: 'apple' }]} right={[w(1)]} /> },
      { id: 'mass12', text: 'egy radír', categoryId: 'lt' },
      { id: 'mass13', text: '', categoryId: 'eq', figure: <BalanceCard small left={[{ kind: 'bag', label: 'liszt', color: '#fef3c7' }]} right={[w(1)]} /> },
      { id: 'mass14', text: '1 kg cukor', categoryId: 'eq' },
      { id: 'mass15', text: '1 kg alma', categoryId: 'eq' },
      { id: 'mass16', text: '', categoryId: 'gt', figure: <BalanceCard small tilt={-12} left={[{ kind: 'melon' }]} right={[w(1)]} /> },
      { id: 'mass17', text: 'egy zsák krumpli', categoryId: 'gt' },
      { id: 'mass18', text: 'egy bicikli', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: 10 kg, 15 kg vagy 20 kg?',
    description: 'Add össze a súlyokat, vagy végezd el a műveletet!',
    categories: [
      { id: 'k10', name: '10 kg', color: 'blue' },
      { id: 'k15', name: '15 kg', color: 'amber' },
      { id: 'k20', name: '20 kg', color: 'rose' }
    ],
    items: [
      { id: 'mass19', text: '', categoryId: 'k10', figure: <WeightsCard ws={[5, 5]} /> },
      { id: 'mass20', text: '', categoryId: 'k10', figure: <WeightsCard ws={[5, 2, 2, 1]} /> },
      { id: 'mass21', text: '7 kg + 3 kg', categoryId: 'k10' },
      { id: 'mass22', text: '', categoryId: 'k15', figure: <WeightsCard ws={[10, 5]} /> },
      { id: 'mass23', text: '', categoryId: 'k15', figure: <CratesCard n={3} each={5} small /> },
      { id: 'mass24', text: '30 kg − 15 kg', categoryId: 'k15' },
      { id: 'mass25', text: '', categoryId: 'k20', figure: <WeightsCard ws={[10, 10]} /> },
      { id: 'mass26', text: '25 kg − 5 kg', categoryId: 'k20' },
      { id: 'mass27', text: '12 kg + 8 kg', categoryId: 'k20' }
    ]
  }
];

export const MASS_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MASS_G2_SORTER_LEVELS_LIST[0],
  2: MASS_G2_SORTER_LEVELS_LIST[1],
  3: MASS_G2_SORTER_LEVELS_LIST[2]
};

export const MassG2Sorter: React.FC<MassG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-meres-tomeg-sorter',
  topicTitle = '2. A tömeg mérése – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="tomeg-meres"
      title={topicTitle}
      subtitle="Válogasd szét: melyik nehezebb, melyik könnyebb, mennyi a tömege?"
      levels={MASS_G2_SORTER_LEVELS}
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

export default MassG2Sorter;
