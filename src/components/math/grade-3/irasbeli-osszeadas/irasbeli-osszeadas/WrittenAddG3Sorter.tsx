import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortCol } from './WrittenAddG3CardFigures';

interface WrittenAddG3SorterProps {
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
    title: '1. szint: Hol kell beváltani?',
    description: 'Nézd meg az oszlopokat! Hol lesz 10 vagy több?',
    categories: [
      { id: 'nincs', name: 'Nincs beváltás', color: 'emerald' },
      { id: 'egyes', name: 'Az egyeseknél', color: 'amber' },
      { id: 'tizes', name: 'A tízeseknél', color: 'sky' }
    ],
    items: [
      { id: 'wadds1', text: '', figure: <SortCol a={213} b={154} />, categoryId: 'nincs' },
      { id: 'wadds2', text: '', figure: <SortCol a={341} b={126} />, categoryId: 'nincs' },
      { id: 'wadds3', text: '132 + 205', categoryId: 'nincs' },
      { id: 'wadds4', text: '', figure: <SortCol a={157} b={226} />, categoryId: 'egyes' },
      { id: 'wadds5', text: '', figure: <SortCol a={249} b={136} />, categoryId: 'egyes' },
      { id: 'wadds6', text: '128 + 345', categoryId: 'egyes' },
      { id: 'wadds7', text: '', figure: <SortCol a={163} b={254} />, categoryId: 'tizes' },
      { id: 'wadds8', text: '', figure: <SortCol a={182} b={135} />, categoryId: 'tizes' },
      { id: 'wadds9', text: '274 + 153', categoryId: 'tizes' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora az összeg?',
    description: 'Számold ki írásban, és tedd a jó dobozba!',
    categories: [
      { id: 'k400', name: 'Kevesebb, mint 400', color: 'sky' },
      { id: 'k450', name: '400 és 450 között', color: 'amber' },
      { id: 't450', name: 'Több, mint 450', color: 'rose' }
    ],
    items: [
      { id: 'wadds10', text: '', figure: <SortCol a={157} b={226} />, categoryId: 'k400' },
      { id: 'wadds11', text: '', figure: <SortCol a={138} b={237} />, categoryId: 'k400' },
      { id: 'wadds12', text: '249 + 136', categoryId: 'k400' },
      { id: 'wadds13', text: '', figure: <SortCol a={168} b={275} />, categoryId: 'k450' },
      { id: 'wadds14', text: '', figure: <SortCol a={186} b={237} />, categoryId: 'k450' },
      { id: 'wadds15', text: '274 + 153', categoryId: 'k450' },
      { id: 'wadds16', text: '', figure: <SortCol a={294} b={158} />, categoryId: 't450' },
      { id: 'wadds17', text: '', figure: <SortCol a={128} b={345} />, categoryId: 't450' },
      { id: 'wadds18', text: '319 + 148', categoryId: 't450' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibavadász',
    description: 'Jó a számolás? Ha nem, mi a hiba?',
    categories: [
      { id: 'jo', name: 'Jó', color: 'emerald' },
      { id: 'maradek', name: 'Elfelejtette a maradékot', color: 'amber' },
      { id: 'hely', name: 'Rossz helyre írta a számot', color: 'rose' }
    ],
    items: [
      { id: 'wadds19', text: '', figure: <SortCol a={157} b={226} s={383} />, categoryId: 'jo' },
      { id: 'wadds20', text: '', figure: <SortCol a={168} b={275} s={443} />, categoryId: 'jo' },
      { id: 'wadds21', text: '249 + 136 = 385', categoryId: 'jo' },
      { id: 'wadds22', text: '', figure: <SortCol a={157} b={226} s={373} />, categoryId: 'maradek' },
      { id: 'wadds23', text: '', figure: <SortCol a={163} b={254} s={317} />, categoryId: 'maradek' },
      { id: 'wadds24', text: '186 + 237 = 313', categoryId: 'maradek' },
      { id: 'wadds25', text: '', figure: <SortCol a={124} b="35 " s={474} />, categoryId: 'hely' },
      { id: 'wadds26', text: '', figure: <SortCol a={131} b="26 " s={391} />, categoryId: 'hely' },
      { id: 'wadds27', text: '', figure: <SortCol a={112} b="34 " s={452} />, categoryId: 'hely' }
    ]
  }
];

export const WRITTEN_ADD_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenAddG3Sorter: React.FC<WrittenAddG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-irasbeli-sorter',
  topicTitle = '3. Írásbeli összeadás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas"
      title={topicTitle}
      subtitle="Számold ki írásban, és válogasd szét!"
      levels={WRITTEN_ADD_G3_SORTER_LEVELS}
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

export default WrittenAddG3Sorter;
